import React, { useEffect, useMemo, useState } from 'react';
import { Check, Copy, Download, Plus, RotateCcw, Table } from 'lucide-react';
import { CALCULATORS } from '../data/calculators';
import { getGuideBySlug } from '../data/guides';
import { CalculatorConfig, CurrencySymbol, RouteView } from '../types';
import {
  aggregateYearlySchedule,
  CURRENCIES,
  exportScheduleCsv,
  formatMoney,
  generateAmortizationSchedule,
} from '../utils/loanMath';
import { CalculatorTile } from './CalculatorTile';

interface CalculatorViewProps {
  calculator: CalculatorConfig;
  preset?: Record<string, number>;
  currency: CurrencySymbol;
  onCurrencyChange: (cur: CurrencySymbol) => void;
  onNavigate: (route: RouteView) => void;
}

const SEGMENT_COLORS: Record<'lime' | 'orange' | 'white' | 'sky', string> = {
  lime: 'bg-[#c9f23f]',
  orange: 'bg-[#ff7a2f]',
  white: 'bg-white',
  sky: 'bg-[#7aa2ff]',
};

export const CalculatorView: React.FC<CalculatorViewProps> = ({
  calculator,
  preset,
  currency,
  onCurrencyChange,
  onNavigate,
}) => {
  const buildInitialValues = () => {
    const map: Record<string, number> = {};
    calculator.fields.forEach((f) => {
      map[f.key] = preset && preset[f.key] !== undefined ? preset[f.key] : f.defaultValue;
    });
    return map;
  };

  const [values, setValues] = useState<Record<string, number>>(buildInitialValues);
  const [copied, setCopied] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleMode, setScheduleMode] = useState<'yearly' | 'monthly'>('yearly');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  useEffect(() => {
    setValues(buildInitialValues());
    setShowSchedule(false);
    setOpenFaqIdx(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculator.slug, preset]);

  const output = useMemo(
    () => calculator.calculate(values, currency),
    [calculator, values, currency]
  );

  const monthlySchedule = useMemo(() => {
    if (!output.amortization) return [];
    return generateAmortizationSchedule(output.amortization);
  }, [output.amortization]);

  const displayedSchedule = useMemo(() => {
    if (scheduleMode === 'yearly') {
      return aggregateYearlySchedule(monthlySchedule);
    }
    return monthlySchedule;
  }, [monthlySchedule, scheduleMode]);

  const relatedCalculators = useMemo(
    () => CALCULATORS.filter((c) => c.slug !== calculator.slug).slice(0, 3),
    [calculator.slug]
  );

  const relatedGuide = useMemo(
    () => getGuideBySlug(calculator.relatedGuideSlug),
    [calculator.relatedGuideSlug]
  );

  const handleFieldChange = (key: string, raw: string) => {
    const parsed = parseFloat(raw);
    setValues((prev) => ({
      ...prev,
      [key]: Number.isNaN(parsed) ? 0 : Math.max(0, parsed),
    }));
  };

  const handleReset = () => {
    const defaults: Record<string, number> = {};
    calculator.fields.forEach((f) => {
      defaults[f.key] = f.defaultValue;
    });
    setValues(defaults);
  };

  const handleCopySummary = async () => {
    const lines = [
      `${calculator.title} — SmartLoansGuide`,
      `${output.headlineLabel}: ${output.headlineValue}`,
      ...output.rows.map(([k, val]) => `${k}: ${val}`),
    ];
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const totalSegmentSum =
    output.segments?.reduce((acc, s) => acc + Math.max(0, s.value), 0) || 0;

  return (
    <section className="pt-11 pb-20">
      <div className="max-w-[1060px] mx-auto px-6">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="text-[0.92rem] font-bold text-[#46507a] mb-3 flex items-center gap-2 flex-wrap"
        >
          <button
            type="button"
            onClick={() => onNavigate({ page: 'home' })}
            className="text-[#2447ff] hover:underline cursor-pointer"
          >
            Home
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            onClick={() => onNavigate({ page: 'tools' })}
            className="text-[#2447ff] hover:underline cursor-pointer"
          >
            Calculators
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-[#0c1233]">{calculator.title}</span>
        </nav>

        {/* Page Title & Lead */}
        <div className="text-[0.86rem] font-display font-bold text-[#2447ff] mb-2">
          {calculator.tag} · Free browser calculator · Formula shown
        </div>
        <h1
          style={{ textWrap: 'balance' }}
          className="font-display font-extrabold text-[clamp(2.2rem,4.8vw,3.5rem)] leading-[1.06] text-[#0c1233] mb-3"
        >
          {calculator.title}
        </h1>
        <p className="text-[1.2rem] text-[#46507a] max-w-2xl m-0">
          {calculator.shortDescription}
        </p>

        {/* 2-Column Calculator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 my-8 items-start">
          {/* Left Panel: Inputs & Sliders */}
          <div className="bg-white rounded-[22px] p-6 sm:p-7 slg-border slg-shadow space-y-5">
            <div className="flex items-center justify-between gap-3 pb-3 border-b-2 border-[#e6eaff]">
              <span className="font-display font-extrabold text-[1.05rem] text-[#0c1233]">
                Your numbers
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-[0.85rem] font-display font-bold text-[#46507a] hover:text-[#2447ff] cursor-pointer whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset defaults
              </button>
            </div>

            {calculator.fields.map((field) => {
              const val = values[field.key] ?? field.defaultValue;
              const sliderVal = Math.min(field.max, Math.max(field.min, val));
              return (
                <div key={field.key} className="space-y-1.5">
                  <label
                    htmlFor={`field-${field.key}`}
                    className="flex items-center justify-between gap-2 font-display font-extrabold text-[0.95rem] text-[#0c1233]"
                  >
                    <span>{field.label}</span>
                    <span className="text-[0.85rem] font-mono-num text-[#2447ff]">
                      {field.unit === 'currency'
                        ? formatMoney(val, currency)
                        : field.unit === 'percent'
                        ? `${val}%`
                        : field.unit === 'years'
                        ? `${val} yrs`
                        : `${val} mos`}
                    </span>
                  </label>
                  <input
                    id={`field-${field.key}`}
                    type="number"
                    min={0}
                    step={field.step}
                    inputMode="decimal"
                    value={val}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    className="slg-input"
                  />
                  <input
                    type="range"
                    aria-label={`${field.label} slider`}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={sliderVal}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    className="slg-range"
                  />
                </div>
              );
            })}

            {/* Currency Symbol Selector */}
            <div className="pt-2 border-t-2 border-[#e6eaff]">
              <label
                htmlFor="calc-currency"
                className="block font-display font-extrabold text-[0.95rem] text-[#0c1233] mb-1.5"
              >
                Currency symbol
              </label>
              <select
                id="calc-currency"
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencySymbol)}
                className="slg-input cursor-pointer"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.symbol} value={c.symbol}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right Panel: Sticky Live Results Card */}
          <div
            aria-live="polite"
            className="bg-[#0c1233] text-white rounded-[22px] p-6 sm:p-7 slg-border slg-shadow-blue lg:sticky lg:top-[96px]"
          >
            <div className="text-[0.84rem] font-display font-bold text-[#a9b6e8]">
              {output.headlineLabel}
            </div>
            <div className="font-display font-extrabold text-[2.6rem] sm:text-[3.1rem] leading-[1.08] text-[#c9f23f] tabular-nums mt-1 mb-4 break-words">
              {output.headlineValue}
            </div>

            {/* Visual Cost Split Bar */}
            {output.segments && totalSegmentSum > 0 && (
              <div className="mb-5">
                <div className="flex h-5 rounded-full overflow-hidden border-2 border-white/80 bg-white/10">
                  {output.segments.map((seg) => {
                    const widthPct = Math.max(0, (seg.value / totalSegmentSum) * 100);
                    return (
                      <div
                        key={seg.label}
                        style={{ width: `${widthPct}%` }}
                        className={`h-full transition-all duration-300 ${SEGMENT_COLORS[seg.color]}`}
                        title={`${seg.label}: ${formatMoney(seg.value, currency)}`}
                      />
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[0.8rem] text-[#c3cdf5] font-bold">
                  {output.segments.map((seg) => (
                    <span key={seg.label} className="inline-flex items-center gap-1.5">
                      <span
                        aria-hidden="true"
                        className={`w-2.5 h-2.5 rounded-sm border border-[#0c1233] ${SEGMENT_COLORS[seg.color]}`}
                      />
                      <span>
                        {seg.label} ({Math.round((seg.value / totalSegmentSum) * 100)}%)
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Breakdown Rows */}
            <div className="divide-y-2 divide-white/15 border-t-2 border-white/20">
              {output.rows.map(([label, val]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-3 py-2.5 text-[0.98rem]"
                >
                  <span className="text-[#c3cdf5]">{label}</span>
                  <strong className="font-mono-num font-bold text-white text-right">
                    {val}
                  </strong>
                </div>
              ))}
            </div>

            {/* Contextual Insight / Warning Note */}
            {output.note && (
              <div className="mt-4 bg-[#ff7a2f] text-[#0c1233] font-extrabold rounded-[12px] px-3.5 py-2.5 text-[0.92rem] leading-snug">
                {output.note}
              </div>
            )}

            {/* Utility Action Buttons */}
            <div className="mt-5 pt-4 border-t-2 border-white/15 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#0c1233] font-display font-extrabold text-[0.86rem] hover:bg-[#c9f23f] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied summary' : 'Copy results'}
              </button>

              {monthlySchedule.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowSchedule((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2447ff] text-white border-2 border-white/30 font-display font-extrabold text-[0.86rem] hover:bg-[#c9f23f] hover:text-[#0c1233] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Table className="w-4 h-4" />
                  {showSchedule ? 'Hide schedule' : 'Amortization schedule'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Expandable Amortization Schedule Table */}
        {showSchedule && monthlySchedule.length > 0 && (
          <div className="my-8 bg-white rounded-[22px] p-6 sm:p-7 slg-border slg-shadow">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <div>
                <h2 className="font-display font-extrabold text-[1.45rem] text-[#0c1233] m-0">
                  Payment amortization schedule
                </h2>
                <p className="text-[0.95rem] text-[#46507a] m-0 mt-0.5">
                  See how each payment splits between principal and interest over{' '}
                  {monthlySchedule.length} months.
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="inline-flex p-1 bg-[#e6eaff] rounded-xl border-2 border-[#0c1233]">
                  <button
                    type="button"
                    onClick={() => setScheduleMode('yearly')}
                    className={`px-3 py-1.5 rounded-lg text-[0.85rem] font-display font-extrabold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                      scheduleMode === 'yearly'
                        ? 'bg-[#0c1233] text-[#c9f23f]'
                        : 'text-[#0c1233] hover:bg-white'
                    }`}
                  >
                    Yearly
                  </button>
                  <button
                    type="button"
                    onClick={() => setScheduleMode('monthly')}
                    className={`px-3 py-1.5 rounded-lg text-[0.85rem] font-display font-extrabold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                      scheduleMode === 'monthly'
                        ? 'bg-[#0c1233] text-[#c9f23f]'
                        : 'text-[#0c1233] hover:bg-white'
                    }`}
                  >
                    Monthly
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    exportScheduleCsv(displayedSchedule, scheduleMode, calculator.slug)
                  }
                  className="slg-btn-sm bg-[#c9f23f] text-[#0c1233] px-3.5 py-2 text-[0.85rem] whitespace-nowrap shrink-0"
                >
                  <Download className="w-4 h-4" />
                  Download CSV
                </button>
              </div>
            </div>

            <div className="overflow-x-auto max-h-[420px] overflow-y-auto border-2 border-[#0c1233] rounded-xl">
              <table className="w-full text-left border-collapse text-[0.92rem] tabular-nums">
                <thead className="bg-[#0c1233] text-white sticky top-0">
                  <tr>
                    <th className="py-3 px-4 font-display font-extrabold">
                      {scheduleMode === 'yearly' ? 'Year' : 'Month'}
                    </th>
                    <th className="py-3 px-4 font-display font-extrabold text-right">
                      Payment
                    </th>
                    <th className="py-3 px-4 font-display font-extrabold text-right">
                      Principal
                    </th>
                    <th className="py-3 px-4 font-display font-extrabold text-right">
                      Interest
                    </th>
                    <th className="py-3 px-4 font-display font-extrabold text-right">
                      Total Interest
                    </th>
                    <th className="py-3 px-4 font-display font-extrabold text-right">
                      Balance Left
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e6eaff]">
                  {displayedSchedule.map((row) => (
                    <tr
                      key={row.period}
                      className="hover:bg-[#f3f5ff] transition-colors font-mono-num"
                    >
                      <td className="py-2.5 px-4 font-bold text-[#0c1233]">
                        {scheduleMode === 'yearly' ? `Year ${row.period}` : `#${row.period}`}
                      </td>
                      <td className="py-2.5 px-4 text-right text-[#0c1233]">
                        {formatMoney(row.payment, currency, 2)}
                      </td>
                      <td className="py-2.5 px-4 text-right text-[#15603a] font-semibold">
                        {formatMoney(row.principalPaid, currency, 2)}
                      </td>
                      <td className="py-2.5 px-4 text-right text-[#b93800]">
                        {formatMoney(row.interestPaid, currency, 2)}
                      </td>
                      <td className="py-2.5 px-4 text-right text-[#46507a]">
                        {formatMoney(row.cumulativeInterest, currency, 2)}
                      </td>
                      <td className="py-2.5 px-4 text-right font-bold text-[#0c1233]">
                        {formatMoney(row.endingBalance, currency, 2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Formula Box + Dashed Educational Disclaimer */}
        <div className="my-6 bg-[#e6eaff] rounded-[16px] p-4 sm:p-5 slg-border">
          <div className="text-[0.82rem] font-display font-bold text-[#2447ff]">
            Published mathematical formula
          </div>
          <code className="block mt-1 font-mono-num text-[0.95rem] font-semibold text-[#0c1233] break-words">
            {calculator.formulaText}
          </code>
        </div>

        <p className="text-[0.92rem] bg-white border-[3px] border-dashed border-[#0c1233] px-4 py-3 rounded-[12px] text-[#0c1233] font-medium">
          Educational estimate only. We are not a lender or advisor, and this is not
          financial or credit advice.
        </p>

        {/* Full Plain-English Educational Article */}
        <article className="max-w-[790px] mt-10 space-y-7">
          {calculator.articleSections.map((sec) => (
            <div key={sec.heading}>
              <h2 className="slg-article-h2 mb-3">{sec.heading}</h2>
              {sec.paragraphs.map((p, idx) => (
                <p key={idx} className="text-[#2a3466] text-[1.06rem] leading-[1.75] mb-3">
                  {p}
                </p>
              ))}
            </div>
          ))}

          {/* Related Plain-English Guide Callout */}
          {relatedGuide && (
            <div className="bg-white rounded-[18px] p-5 sm:p-6 slg-border slg-shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-[0.82rem] font-display font-bold text-[#2447ff]">
                  Matching plain-English guide · {relatedGuide.readTime}
                </div>
                <h3 className="font-display font-extrabold text-[1.2rem] text-[#0c1233] mt-1">
                  {relatedGuide.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigate({ page: 'guide', slug: relatedGuide.slug })}
                className="slg-btn-sm bg-[#c9f23f] text-[#0c1233] px-4 py-2.5 text-[0.92rem] whitespace-nowrap shrink-0"
              >
                Read guide →
              </button>
            </div>
          )}

          {/* Calculator FAQs */}
          {calculator.faqs.length > 0 && (
            <div className="pt-2">
              <h2 className="slg-article-h2 mb-4">Frequently asked questions</h2>
              <div className="space-y-3">
                {calculator.faqs.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div
                      key={faq.question}
                      className="bg-white rounded-[16px] slg-border slg-shadow-sm overflow-hidden"
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left font-display font-extrabold text-[1.05rem] text-[#0c1233] cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <Plus
                          className={`w-5 h-5 text-[#2447ff] shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-45' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-[#2a3466] text-[1rem] leading-relaxed border-t border-[#e6eaff] pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Editorial Team Review Box */}
          <div className="flex items-center gap-4 bg-[#c9f23f] rounded-[18px] p-5 slg-border slg-shadow">
            <div
              aria-hidden="true"
              className="w-12 h-12 rounded-full bg-white slg-border grid place-items-center font-display font-extrabold text-[#0c1233] shrink-0"
            >
              SL
            </div>
            <div className="text-[0.98rem] text-[#0c1233]">
              Built and reviewed by <strong>The Smart Loans Guide team</strong>. Last
              updated October 2026.{' '}
              <button
                type="button"
                onClick={() => onNavigate({ page: 'editorial-policy' })}
                className="font-extrabold text-[#2447ff] underline cursor-pointer"
              >
                How we write
              </button>
              .
            </div>
          </div>
        </article>

        {/* More Calculators Grid */}
        <div className="mt-16">
          <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
            <h2 className="font-display font-extrabold text-[2rem] text-[#0c1233] m-0">
              More calculators
            </h2>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'tools' })}
              className="font-display font-extrabold text-[#2447ff] hover:underline cursor-pointer whitespace-nowrap"
            >
              View all 12 calculators →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCalculators.map((rel) => (
              <CalculatorTile
                key={rel.slug}
                calculator={rel}
                onOpen={(slug) => onNavigate({ page: 'calculator', slug })}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
