import React, { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { CALCULATORS } from '../data/calculators';
import { GUIDES, HOME_FAQS, MATH_SHOWCASE_TABS } from '../data/guides';
import { CurrencySymbol, RouteView, ToolCategory } from '../types';
import { CalculatorTile } from './CalculatorTile';
import { QuickLoanMachine } from './QuickLoanMachine';

interface HomePageProps {
  currency: CurrencySymbol;
  onCurrencyChange: (cur: CurrencySymbol) => void;
  onNavigate: (route: RouteView) => void;
}

const MARQUEE_ITEMS = [
  'Personal loans',
  'Auto loans',
  'Mortgage PITI',
  'Debt consolidation',
  'Early payoff',
  'APR and fees',
  'DTI ratio',
  'Credit card payoff',
  'Student loans',
  'Refinance break-even',
  'Compare offers',
  'Affordability',
];

const CATEGORY_TABS: ToolCategory[] = [
  ToolCategory.All,
  ToolCategory.Home,
  ToolCategory.PersonalCar,
  ToolCategory.DebtCredit,
  ToolCategory.BudgetCompare,
];

export const HomePage: React.FC<HomePageProps> = ({
  currency,
  onCurrencyChange,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>(ToolCategory.All);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMathTab, setActiveMathTab] = useState<string>(MATH_SHOWCASE_TABS[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredCalculators = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return CALCULATORS.filter((calc) => {
      const catMatch =
        selectedCategory === ToolCategory.All ||
        calc.filterCategory === selectedCategory;
      const searchMatch =
        !q ||
        calc.title.toLowerCase().includes(q) ||
        calc.shortDescription.toLowerCase().includes(q) ||
        calc.tag.toLowerCase().includes(q);
      return catMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  const currentMathExample =
    MATH_SHOWCASE_TABS.find((t) => t.id === activeMathTab) || MATH_SHOWCASE_TABS[0];

  const latestGuides = GUIDES.slice(0, 6);

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="pt-12 pb-12 sm:pt-16 sm:pb-14 overflow-hidden">
        <div className="max-w-[1180px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.06fr_0.94fr] gap-11 items-center">
          <div>
            <div className="text-[0.9rem] font-display font-extrabold text-[#2447ff] mb-4">
              Free · No sign-up · Independent education
            </div>

            <h1
              style={{ textWrap: 'balance' }}
              className="font-display font-extrabold text-[clamp(2.5rem,5.4vw,4.5rem)] leading-[1.04] text-[#0c1233] mb-5"
            >
              Borrow smarter. Know the{' '}
              <span className="inline-block bg-[#c9f23f] px-2.5 py-0.5 rounded-[0.18em] slg-border shadow-[5px_5px_0_#0c1233] -rotate-2">
                true cost
              </span>{' '}
              first.
            </h1>

            <p className="text-[1.2rem] text-[#46507a] max-w-[580px] leading-relaxed m-0">
              Twelve free loan calculators and plain-English guides that show the
              monthly payment, the lifetime interest and the hidden fees before you
              talk to any lender.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-7">
              <button
                type="button"
                onClick={() =>
                  onNavigate({
                    page: 'calculator',
                    slug: 'personal-loan-calculator',
                  })
                }
                className="slg-btn bg-[#c9f23f] text-[#0c1233] px-7 py-3.5 text-[1.02rem] whitespace-nowrap shrink-0"
              >
                Calculate my loan
              </button>
              <a
                href="#calculators-grid"
                className="slg-btn bg-white text-[#0c1233] px-6 py-3.5 text-[1.02rem] no-underline whitespace-nowrap shrink-0"
              >
                See all 12 calculators
              </a>
            </div>
          </div>

          <QuickLoanMachine
            currency={currency}
            onCurrencyChange={onCurrencyChange}
            onNavigate={onNavigate}
          />
        </div>
      </section>

      {/* 2. TILTED VOLT-LIME MARQUEE STRIP */}
      <div
        aria-hidden="true"
        className="bg-[#c9f23f] border-y-[3px] border-[#0c1233] overflow-hidden -rotate-[1.3deg] -mx-5 my-3 py-3.5 whitespace-nowrap select-none"
      >
        <div className="animate-slg-marquee gap-8 items-center">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <span
              key={`${item}-${idx}`}
              className="font-display font-extrabold text-[1.22rem] text-[#0c1233] inline-flex items-center gap-8"
            >
              <span>{item}</span>
              <span className="text-[#2447ff]">✱</span>
            </span>
          ))}
        </div>
      </div>

      {/* 3. PICK YOUR CALCULATOR SECTION (ALL 12 TILES + FILTER + SEARCH) */}
      <section id="calculators-grid" className="py-20">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h2 className="font-display font-extrabold text-[clamp(1.9rem,3.6vw,2.8rem)] text-[#0c1233] m-0">
                Pick your calculator
              </h2>
              <p className="text-[1.05rem] text-[#46507a] mt-1.5 m-0">
                Every tool runs locally in your browser with the formula explained below.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'tools' })}
              className="font-display font-extrabold text-[1.02rem] text-[#2447ff] hover:underline cursor-pointer whitespace-nowrap shrink-0"
            >
              View full directory →
            </button>
          </div>

          {/* Interactive Filter Tabs + Instant Search */}
          <div className="mt-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div
              role="tablist"
              aria-label="Filter calculators by category"
              className="flex items-center gap-2 flex-wrap"
            >
              {CATEGORY_TABS.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl font-display font-extrabold text-[0.9rem] border-[3px] border-[#0c1233] transition-transform duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#0c1233] text-[#c9f23f]'
                        : 'bg-white text-[#0c1233] hover:-translate-y-0.5'
                    }`}
                  >
                    {cat === ToolCategory.All ? `All (${CALCULATORS.length})` : cat}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#46507a] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search calculators..."
                aria-label="Search calculators"
                className="w-full pl-10 pr-4 py-2 rounded-xl border-[3px] border-[#0c1233] bg-white font-bold text-[0.94rem] text-[#0c1233] focus:outline-none focus:shadow-[3px_3px_0_#2447ff]"
              />
            </div>
          </div>

          {/* 4-Column Calculator Tiles Grid */}
          {filteredCalculators.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {filteredCalculators.map((calc) => (
                <CalculatorTile
                  key={calc.slug}
                  calculator={calc}
                  onOpen={(slug) => onNavigate({ page: 'calculator', slug })}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 bg-white rounded-[22px] p-10 text-center slg-border slg-shadow">
              <p className="font-display font-extrabold text-xl text-[#0c1233] mb-2">
                No calculator matched "{searchQuery}"
              </p>
              <p className="text-[#46507a] mb-5">
                Reset filters to view all twelve loan, mortgage, and debt calculators.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(ToolCategory.All);
                  setSearchQuery('');
                }}
                className="slg-btn-sm bg-[#c9f23f] text-[#0c1233] px-5 py-2.5"
              >
                Show all calculators
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. WHAT DOES THE MATHS LOOK LIKE? (INTERACTIVE TABS) */}
      <section className="py-20 bg-[#e6eaff] border-y-[3px] border-[#0c1233]">
        <div className="max-w-[1180px] mx-auto px-6">
          <h2 className="font-display font-extrabold text-[clamp(1.9rem,3.6vw,2.8rem)] text-[#0c1233] m-0">
            What does the maths look like?
          </h2>

          <div className="mt-7">
            <div
              role="tablist"
              aria-label="Loan math examples"
              className="flex items-center gap-2.5 flex-wrap"
            >
              {MATH_SHOWCASE_TABS.map((tab) => {
                const isOn = tab.id === currentMathExample.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isOn}
                    onClick={() => setActiveMathTab(tab.id)}
                    className={`px-5 py-2.5 rounded-xl font-display font-extrabold text-[0.98rem] slg-border transition-transform duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                      isOn
                        ? 'bg-[#0c1233] text-[#c9f23f]'
                        : 'bg-white text-[#0c1233] hover:-translate-y-0.5'
                    }`}
                  >
                    {tab.tabLabel}
                  </button>
                );
              })}
            </div>

            <div
              role="tabpanel"
              className="mt-6 bg-white rounded-[24px] p-7 sm:p-9 slg-border slg-shadow grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-8 items-center"
            >
              <div>
                <h3 className="font-display font-extrabold text-[1.55rem] text-[#0c1233] m-0 mb-3">
                  {currentMathExample.heading}
                </h3>
                <p className="text-[1.06rem] text-[#46507a] leading-relaxed mb-6">
                  {currentMathExample.description}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    onNavigate({
                      page: 'calculator',
                      slug: currentMathExample.calculatorSlug,
                    })
                  }
                  className="slg-btn bg-white text-[#0c1233] px-6 py-3 text-[0.98rem] whitespace-nowrap shrink-0"
                >
                  Open the calculator
                </button>
              </div>

              <div className="bg-[#f3f5ff] rounded-[20px] p-6 slg-border">
                <div className="font-display font-extrabold text-[clamp(2.4rem,5vw,3.6rem)] leading-none text-[#2447ff] tabular-nums">
                  {currentMathExample.bigFigure}
                </div>
                <p className="mt-2.5 mb-0 font-extrabold text-[#0c1233] text-[1.02rem]">
                  {currentMathExample.caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY PEOPLE TRUST THE NUMBERS */}
      <section className="py-20">
        <div className="max-w-[1180px] mx-auto px-6">
          <h2 className="font-display font-extrabold text-[clamp(1.9rem,3.6vw,2.8rem)] text-[#0c1233] m-0">
            Why people trust the numbers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-8">
            <div className="bg-white rounded-[22px] p-7 slg-border slg-shadow -rotate-1 hover:rotate-0 hover:-translate-y-1 transition-transform duration-200">
              <div className="font-display font-extrabold text-[clamp(2.6rem,5vw,3.6rem)] leading-none text-[#2447ff] tabular-nums">
                12
              </div>
              <div className="mt-2 font-extrabold text-[#0c1233] text-[1.06rem]">
                free calculators with the exact mathematical formula shown
              </div>
            </div>

            <div className="bg-[#c9f23f] rounded-[22px] p-7 slg-border slg-shadow rotate-1 hover:rotate-0 hover:-translate-y-1 transition-transform duration-200">
              <div className="font-display font-extrabold text-[clamp(2.6rem,5vw,3.6rem)] leading-none text-[#0c1233] tabular-nums">
                11
              </div>
              <div className="mt-2 font-extrabold text-[#0c1233] text-[1.06rem]">
                in-depth plain-English guides, each paired with a live tool
              </div>
            </div>

            <div className="bg-white rounded-[22px] p-7 slg-border slg-shadow -rotate-[0.6deg] hover:rotate-0 hover:-translate-y-1 transition-transform duration-200">
              <div className="font-display font-extrabold text-[clamp(2.6rem,5vw,3.6rem)] leading-none text-[#2447ff] tabular-nums">
                0
              </div>
              <div className="mt-2 font-extrabold text-[#0c1233] text-[1.06rem]">
                loan applications taken or personal financial numbers stored
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LATEST GUIDES SECTION */}
      <section className="py-20 bg-[#e6eaff] border-y-[3px] border-[#0c1233]">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display font-extrabold text-[clamp(1.9rem,3.6vw,2.8rem)] text-[#0c1233] m-0">
              Latest guides
            </h2>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'blog' })}
              className="font-display font-extrabold text-[1.02rem] text-[#2447ff] hover:underline cursor-pointer whitespace-nowrap shrink-0"
            >
              All 11 guides →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {latestGuides.map((guide) => (
              <button
                key={guide.slug}
                type="button"
                onClick={() => onNavigate({ page: 'guide', slug: guide.slug })}
                className="text-left bg-white rounded-[22px] p-6 slg-card-hover flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="text-[0.82rem] font-display font-bold text-[#2447ff]">
                    {guide.category} · {guide.readTime}
                  </div>
                  <h3 className="font-display font-extrabold text-[1.28rem] leading-[1.18] text-[#0c1233] mt-2.5 mb-2.5">
                    {guide.title}
                  </h3>
                  <p className="text-[0.97rem] text-[#46507a] leading-relaxed m-0">
                    {guide.summary}
                  </p>
                </div>

                <div className="mt-5 font-display font-extrabold text-[0.96rem] text-[#2447ff]">
                  Read guide →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 7. QUICK ANSWERS ACCORDION */}
      <section className="py-20">
        <div className="max-w-[790px] mx-auto px-6">
          <h2 className="font-display font-extrabold text-[clamp(1.9rem,3.6vw,2.8rem)] text-[#0c1233] m-0 mb-6">
            Quick answers
          </h2>

          <div className="space-y-3.5">
            {HOME_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.question}
                  className="bg-white rounded-[16px] slg-border slg-shadow-sm overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left font-display font-extrabold text-[1.08rem] text-[#0c1233] cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <Plus
                      className={`w-6 h-6 text-[#2447ff] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-3 border-t border-[#e6eaff] text-[#46507a] text-[1.02rem] leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. BOTTOM ROYAL-BLUE CTA BANNER */}
      <section className="pb-16">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="relative overflow-hidden bg-[#2447ff] text-white rounded-[30px] py-16 px-7 text-center slg-border slg-shadow-lg">
            {/* Floating Geometric Neo-Brutalist Shapes */}
            <div
              aria-hidden="true"
              className="hidden sm:block absolute left-[6%] top-[18%] w-[88px] h-[88px] rounded-full bg-[#c9f23f] slg-border animate-slg-float pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="hidden sm:block absolute right-[7%] bottom-[16%] w-[70px] h-[70px] rounded-[16px] bg-[#ff7a2f] slg-border animate-slg-float-delayed pointer-events-none"
            />

            <div className="relative z-10 max-w-xl mx-auto">
              <h2
                style={{ textWrap: 'balance' }}
                className="font-display font-extrabold text-[clamp(2rem,4vw,3rem)] text-white m-0 mb-3"
              >
                See the real price of your loan
              </h2>
              <p className="text-[1.12rem] text-[#d7e0ff] mb-7">
                One minute, no sign-up, nothing leaves your device.
              </p>
              <button
                type="button"
                onClick={() =>
                  onNavigate({
                    page: 'calculator',
                    slug: 'personal-loan-calculator',
                  })
                }
                className="slg-btn bg-[#c9f23f] text-[#0c1233] px-8 py-4 text-[1.05rem] whitespace-nowrap shrink-0"
              >
                Start calculating
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
