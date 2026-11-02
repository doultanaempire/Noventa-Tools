import React, { useState } from 'react';
import { CurrencySymbol, RouteView } from '../types';
import { CURRENCIES, formatMoney, pmt } from '../utils/loanMath';

interface QuickLoanMachineProps {
  currency: CurrencySymbol;
  onCurrencyChange: (cur: CurrencySymbol) => void;
  onNavigate: (route: RouteView) => void;
}

export const QuickLoanMachine: React.FC<QuickLoanMachineProps> = ({
  currency,
  onCurrencyChange,
  onNavigate,
}) => {
  const [amount, setAmount] = useState<number>(15000);
  const [apr, setApr] = useState<number>(10);
  const [term, setTerm] = useState<number>(48);

  const monthly = pmt(amount, apr, term);
  const totalRepaid = monthly * term;
  const totalInterest = Math.max(0, totalRepaid - amount);
  const principalPct = totalRepaid > 0 ? (amount / totalRepaid) * 100 : 100;
  const interestPct = totalRepaid > 0 ? (totalInterest / totalRepaid) * 100 : 0;

  return (
    <div className="relative bg-white rounded-[28px] p-6 sm:p-7 slg-border slg-shadow-lg">
      {/* Rotating Neo-Brutalist Stamp Badge */}
      <div
        aria-hidden="true"
        className="absolute -right-2 sm:-right-5 -top-7 sm:-top-8 w-[86px] h-[86px] sm:w-[104px] sm:h-[104px] animate-slg-spin pointer-events-none select-none"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <path
              id="slg-stamp-circle"
              d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1-74 0"
            />
          </defs>
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="#c9f23f"
            stroke="#0c1233"
            strokeWidth="3"
          />
          <text
            fill="#0c1233"
            className="font-display font-extrabold text-[11.2px] tracking-[0.13em]"
          >
            <textPath href="#slg-stamp-circle">
              FREE ✱ NO SIGN-UP ✱ FREE ✱ NO SIGN-UP ✱
            </textPath>
          </text>
          <text
            x="50"
            y="58"
            textAnchor="middle"
            fill="#0c1233"
            className="font-display font-extrabold text-[22px]"
          >
            {currency.trim()}
          </text>
        </svg>
      </div>

      <div className="pr-16">
        <h2 className="font-display font-extrabold text-[1.25rem] text-[#0c1233] m-0">
          Quick loan check
        </h2>
        <p className="text-[0.92rem] font-bold text-[#46507a] m-0 mt-0.5">
          Slide to see your monthly payment &amp; interest split
        </p>
      </div>

      {/* Compact Currency Switcher */}
      <div className="mt-4 flex items-center gap-1.5 flex-wrap">
        <span className="text-[0.8rem] font-bold text-[#46507a] mr-1">Currency:</span>
        {CURRENCIES.map((c) => {
          const active = c.symbol === currency;
          return (
            <button
              key={c.symbol}
              type="button"
              onClick={() => onCurrencyChange(c.symbol)}
              className={`px-2.5 py-1 rounded-lg text-[0.8rem] font-display font-extrabold border-2 border-[#0c1233] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                active
                  ? 'bg-[#0c1233] text-[#c9f23f]'
                  : 'bg-[#f3f5ff] text-[#0c1233] hover:bg-[#c9f23f]'
              }`}
            >
              {c.symbol.trim()}
            </button>
          );
        })}
      </div>

      {/* Sliders */}
      <div className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="quick-amt"
            className="flex items-center justify-between font-display font-extrabold text-[0.96rem] text-[#0c1233]"
          >
            <span>Loan amount</span>
            <span className="text-[#2447ff] tabular-nums">
              {formatMoney(amount, currency)}
            </span>
          </label>
          <input
            id="quick-amt"
            type="range"
            min={1000}
            max={100000}
            step={500}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="slg-range"
          />
        </div>

        <div>
          <label
            htmlFor="quick-apr"
            className="flex items-center justify-between font-display font-extrabold text-[0.96rem] text-[#0c1233]"
          >
            <span>APR</span>
            <span className="text-[#2447ff] tabular-nums">{apr}%</span>
          </label>
          <input
            id="quick-apr"
            type="range"
            min={3}
            max={36}
            step={0.5}
            value={apr}
            onChange={(e) => setApr(Number(e.target.value))}
            className="slg-range"
          />
        </div>

        <div>
          <label
            htmlFor="quick-term"
            className="flex items-center justify-between font-display font-extrabold text-[0.96rem] text-[#0c1233]"
          >
            <span>Term</span>
            <span className="text-[#2447ff] tabular-nums">{term} months</span>
          </label>
          <input
            id="quick-term"
            type="range"
            min={12}
            max={84}
            step={6}
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
            className="slg-range"
          />
        </div>
      </div>

      {/* Royal Blue Output Box */}
      <div
        aria-live="polite"
        className="mt-6 bg-[#2447ff] text-white rounded-[20px] p-5 slg-border"
      >
        <div className="text-[0.82rem] font-display font-bold text-[#cbd6ff]">
          Estimated monthly payment
        </div>
        <div className="font-display font-extrabold text-[2.75rem] sm:text-[3rem] leading-[1.05] text-[#c9f23f] tabular-nums mt-0.5">
          {formatMoney(monthly, currency, 2)}
        </div>

        {/* Stacked Principal vs Interest Bar */}
        <div className="flex h-[22px] slg-border rounded-full overflow-hidden bg-white mt-3.5">
          <div
            style={{ width: `${principalPct}%` }}
            className="h-full bg-[#c9f23f] transition-all duration-300"
            title={`Principal: ${formatMoney(amount, currency)}`}
          />
          <div
            style={{ width: `${interestPct}%` }}
            className="h-full bg-[#ff7a2f] transition-all duration-300"
            title={`Interest: ${formatMoney(totalInterest, currency)}`}
          />
        </div>

        <div className="flex items-center justify-between gap-2 text-[0.84rem] font-extrabold text-[#e5ebff] mt-2 tabular-nums">
          <span>Borrowed {formatMoney(amount, currency)}</span>
          <span>Interest {formatMoney(totalInterest, currency)}</span>
        </div>

        <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between gap-3 text-[0.86rem]">
          <span className="text-[#cbd6ff] font-bold tabular-nums">
            Total repaid: <strong className="text-white">{formatMoney(totalRepaid, currency)}</strong>
          </span>
          <button
            type="button"
            onClick={() =>
              onNavigate({
                page: 'calculator',
                slug: 'personal-loan-calculator',
                preset: { amt: amount, apr, mo: term },
              })
            }
            className="font-display font-extrabold text-[#c9f23f] hover:underline cursor-pointer whitespace-nowrap shrink-0"
          >
            Full breakdown →
          </button>
        </div>
      </div>
    </div>
  );
};
