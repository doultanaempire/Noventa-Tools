import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { CALCULATORS } from '../data/calculators';
import { CurrencySymbol, RouteView, ToolCategory } from '../types';
import { CURRENCIES } from '../utils/loanMath';
import { CalculatorTile } from './CalculatorTile';

interface ToolsHubPageProps {
  currency: CurrencySymbol;
  onCurrencyChange: (cur: CurrencySymbol) => void;
  onNavigate: (route: RouteView) => void;
}

const CATEGORIES: ToolCategory[] = [
  ToolCategory.All,
  ToolCategory.Home,
  ToolCategory.PersonalCar,
  ToolCategory.DebtCredit,
  ToolCategory.BudgetCompare,
];

export const ToolsHubPage: React.FC<ToolsHubPageProps> = ({
  currency,
  onCurrencyChange,
  onNavigate,
}) => {
  const [category, setCategory] = useState<ToolCategory>(ToolCategory.All);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CALCULATORS.filter((c) => {
      const catOk = category === ToolCategory.All || c.filterCategory === category;
      const qOk =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.shortDescription.toLowerCase().includes(q) ||
        c.tag.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [category, query]);

  return (
    <section className="pt-14 pb-20">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-[0.88rem] font-display font-bold text-[#2447ff] mb-2">
          Calculators directory · 12 browser tools
        </div>
        <h1
          style={{ textWrap: 'balance' }}
          className="font-display font-extrabold text-[clamp(2.4rem,5vw,3.9rem)] leading-[1.05] text-[#0c1233] mb-3"
        >
          Every loan calculator in one place
        </h1>
        <p className="text-[1.18rem] text-[#46507a] max-w-2xl m-0">
          Free, private, and transparent. Pick a tool below to test monthly payments,
          total interest, escrow taxes, upfront fees, or accelerated payoff plans.
        </p>

        {/* Toolbar: Category Filter + Currency + Search */}
        <div className="mt-8 bg-white rounded-[22px] p-5 slg-border slg-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => {
              const active = cat === category;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl font-display font-extrabold text-[0.88rem] border-2 border-[#0c1233] cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'bg-[#0c1233] text-[#c9f23f]'
                      : 'bg-[#f3f5ff] text-[#0c1233] hover:bg-[#c9f23f]'
                  }`}
                >
                  {cat === ToolCategory.All ? `All (${CALCULATORS.length})` : cat}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <select
              aria-label="Preferred currency symbol"
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value as CurrencySymbol)}
              className="px-3.5 py-2 rounded-xl border-2 border-[#0c1233] bg-[#f3f5ff] font-display font-extrabold text-[0.88rem] text-[#0c1233] cursor-pointer"
            >
              {CURRENCIES.map((c) => (
                <option key={c.symbol} value={c.symbol}>
                  Currency: {c.label}
                </option>
              ))}
            </select>

            <div className="relative sm:w-64">
              <Search className="w-4 h-4 text-[#46507a] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter by keyword..."
                aria-label="Filter calculators by keyword"
                className="w-full pl-9 pr-3.5 py-2 rounded-xl border-2 border-[#0c1233] bg-white font-bold text-[0.92rem] text-[#0c1233] focus:outline-none focus:shadow-[3px_3px_0_#2447ff]"
              />
            </div>
          </div>
        </div>

        {/* Tiles Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-9">
            {filtered.map((calc) => (
              <CalculatorTile
                key={calc.slug}
                calculator={calc}
                onOpen={(slug) => onNavigate({ page: 'calculator', slug })}
              />
            ))}
          </div>
        ) : (
          <div className="mt-9 bg-white rounded-[22px] p-10 text-center slg-border slg-shadow">
            <h2 className="font-display font-extrabold text-xl text-[#0c1233] mb-2">
              No calculators match "{query}"
            </h2>
            <button
              type="button"
              onClick={() => {
                setCategory(ToolCategory.All);
                setQuery('');
              }}
              className="mt-3 slg-btn-sm bg-[#c9f23f] text-[#0c1233] px-5 py-2.5"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Quick Decision Table */}
        <div className="mt-16 bg-white rounded-[22px] p-6 sm:p-8 slg-border slg-shadow">
          <h2 className="font-display font-extrabold text-[1.75rem] text-[#0c1233] m-0 mb-2">
            Not sure which calculator to open?
          </h2>
          <p className="text-[#46507a] mb-6">
            Match the question on your mind to the right formula in one click.
          </p>

          <div className="overflow-x-auto border-2 border-[#0c1233] rounded-xl">
            <table className="w-full text-left border-collapse text-[0.96rem]">
              <thead className="bg-[#0c1233] text-white">
                <tr>
                  <th className="py-3 px-4 font-display font-extrabold">
                    Your question
                  </th>
                  <th className="py-3 px-4 font-display font-extrabold">
                    Best calculator
                  </th>
                  <th className="py-3 px-4 font-display font-extrabold text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6eaff]">
                {[
                  [
                    'What will my full monthly house bill be with tax and insurance?',
                    'Mortgage Payment Calculator',
                    'mortgage-payment-calculator',
                  ],
                  [
                    'How much does an upfront origination fee raise my real APR?',
                    'APR With Fees Calculator',
                    'apr-with-fees-calculator',
                  ],
                  [
                    'Offer A has a lower rate, Offer B has no fee — which is cheaper?',
                    'Loan Comparison Calculator',
                    'loan-comparison-calculator',
                  ],
                  [
                    'Will rolling my 22% credit cards into one loan actually save money?',
                    'Debt Consolidation Calculator',
                    'debt-consolidation-calculator',
                  ],
                  [
                    'How many months faster will I finish if I add $100 a month?',
                    'Early Loan Payoff Calculator',
                    'early-loan-payoff-calculator',
                  ],
                ].map(([qText, toolName, slug]) => (
                  <tr key={slug} className="hover:bg-[#f3f5ff]">
                    <td className="py-3.5 px-4 text-[#0c1233] font-medium">{qText}</td>
                    <td className="py-3.5 px-4 font-display font-bold text-[#2447ff]">
                      {toolName}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onNavigate({ page: 'calculator', slug })}
                        className="font-display font-extrabold text-[#0c1233] hover:text-[#2447ff] cursor-pointer"
                      >
                        Open →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
