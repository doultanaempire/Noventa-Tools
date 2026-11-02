import React, { useMemo, useState } from 'react';
import { Calculator, Search } from 'lucide-react';
import { GUIDES } from '../data/guides';
import { GuideArticle, RouteView } from '../types';

interface BlogHubPageProps {
  onNavigate: (route: RouteView) => void;
}

export const BlogHubPage: React.FC<BlogHubPageProps> = ({ onNavigate }) => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [query, setQuery] = useState('');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(GUIDES.map((g) => g.category)));
    return ['All', ...unique];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GUIDES.filter((g) => {
      const catOk = selectedCat === 'All' || g.category === selectedCat;
      const qOk =
        !q ||
        g.title.toLowerCase().includes(q) ||
        g.summary.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [selectedCat, query]);

  return (
    <section className="pt-14 pb-20">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-[0.88rem] font-display font-bold text-[#2447ff] mb-2">
          Guides · Plain-English borrowing education
        </div>
        <h1
          style={{ textWrap: 'balance' }}
          className="font-display font-extrabold text-[clamp(2.4rem,5vw,3.9rem)] leading-[1.05] text-[#0c1233] mb-3"
        >
          Loans, explained clearly
        </h1>
        <p className="text-[1.18rem] text-[#46507a] max-w-2xl m-0">
          Eleven in-depth reads without banking jargon — each directly paired with a
          browser calculator so you can test your own figures immediately.
        </p>

        {/* Filter & Search Bar */}
        <div className="mt-8 bg-white rounded-[22px] p-5 slg-border slg-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => {
              const active = cat === selectedCat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCat(cat)}
                  className={`px-3.5 py-1.5 rounded-xl font-display font-extrabold text-[0.86rem] border-2 border-[#0c1233] cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'bg-[#0c1233] text-[#c9f23f]'
                      : 'bg-[#f3f5ff] text-[#0c1233] hover:bg-[#c9f23f]'
                  }`}
                >
                  {cat === 'All' ? `All (${GUIDES.length})` : cat}
                </button>
              );
            })}
          </div>

          <div className="relative lg:w-72">
            <Search className="w-4 h-4 text-[#46507a] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search guides..."
              aria-label="Search guides"
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border-2 border-[#0c1233] bg-white font-bold text-[0.92rem] text-[#0c1233] focus:outline-none focus:shadow-[3px_3px_0_#2447ff]"
            />
          </div>
        </div>

        {/* Guides Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-9">
            {filtered.map((guide) => (
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
                  <h2 className="font-display font-extrabold text-[1.3rem] leading-[1.18] text-[#0c1233] mt-2.5 mb-2.5">
                    {guide.title}
                  </h2>
                  <p className="text-[0.97rem] text-[#46507a] leading-relaxed m-0">
                    {guide.summary}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#e6eaff] flex items-center justify-between text-[0.92rem] font-display font-extrabold text-[#2447ff]">
                  <span>Read guide →</span>
                  <span className="text-[#46507a] text-[0.8rem] font-bold">
                    {guide.linkedCalculatorTitle}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-9 bg-white rounded-[22px] p-10 text-center slg-border slg-shadow">
            <p className="font-display font-extrabold text-xl text-[#0c1233] mb-3">
              No guides matched "{query}"
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCat('All');
                setQuery('');
              }}
              className="slg-btn-sm bg-[#c9f23f] text-[#0c1233] px-5 py-2.5"
            >
              Show all guides
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

interface GuideDetailPageProps {
  guide: GuideArticle;
  onNavigate: (route: RouteView) => void;
}

export const GuideDetailPage: React.FC<GuideDetailPageProps> = ({
  guide,
  onNavigate,
}) => {
  const relatedGuides = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <section className="pt-11 pb-20">
      <div className="max-w-[790px] mx-auto px-6">
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
            onClick={() => onNavigate({ page: 'blog' })}
            className="text-[#2447ff] hover:underline cursor-pointer"
          >
            Guides
          </button>
        </nav>

        {/* Clean Unboxed Metadata */}
        <div className="flex items-center gap-2 text-[0.88rem] font-bold text-[#2447ff] flex-wrap mb-3">
          <span>{guide.category}</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#46507a]">By The Smart Loans Guide team</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#46507a]">{guide.readTime}</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#46507a]">Updated {guide.updatedDate}</span>
        </div>

        <h1
          style={{ textWrap: 'balance' }}
          className="font-display font-extrabold text-[clamp(2.1rem,4.6vw,3.3rem)] leading-[1.08] text-[#0c1233] mb-5"
        >
          {guide.title}
        </h1>

        <p className="text-[1.15rem] font-bold text-[#0c1233] leading-relaxed mb-7">
          {guide.standfirst}
        </p>

        {/* Key Takeaways Card */}
        <div className="bg-white rounded-[20px] p-6 slg-border slg-shadow-sm mb-8">
          <div className="font-display font-extrabold text-[1.05rem] text-[#0c1233] mb-3">
            Key takeaways
          </div>
          <ul className="space-y-2 m-0 pl-5 list-disc text-[#2a3466] text-[1rem]">
            {guide.keyTakeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Article Body */}
        <article className="space-y-7">
          {guide.sections.map((sec) => (
            <div key={sec.heading}>
              <h2 className="slg-article-h2 mb-3">{sec.heading}</h2>
              {sec.paragraphs.map((p, idx) => (
                <p key={idx} className="text-[#2a3466] text-[1.06rem] leading-[1.78] mb-3.5">
                  {p}
                </p>
              ))}
            </div>
          ))}

          {/* Interactive Matching Calculator Callout */}
          <div className="bg-[#2447ff] text-white rounded-[22px] p-6 sm:p-7 slg-border slg-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <div className="text-[0.84rem] font-display font-bold text-[#c9f23f]">
                Try the matching calculator
              </div>
              <h3 className="font-display font-extrabold text-[1.35rem] text-white mt-1 mb-1">
                {guide.linkedCalculatorTitle}
              </h3>
              <p className="text-[#d7e0ff] text-[0.96rem] m-0">
                Plug in your own loan amount, rate, and term directly in your browser.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                onNavigate({
                  page: 'calculator',
                  slug: guide.linkedCalculatorSlug,
                })
              }
              className="slg-btn-sm bg-[#c9f23f] text-[#0c1233] px-5 py-3 text-[0.95rem] whitespace-nowrap shrink-0"
            >
              <Calculator className="w-4 h-4" />
              Open calculator →
            </button>
          </div>

          <p className="text-[0.92rem] bg-white border-[3px] border-dashed border-[#0c1233] px-4 py-3 rounded-[12px] text-[#0c1233] font-medium">
            General information only, not financial, credit or legal advice. We do not
            offer or arrange loans. Rules and rates differ by country and lender.
          </p>

          {/* Editorial Team Box */}
          <div className="flex items-center gap-4 bg-[#c9f23f] rounded-[18px] p-5 slg-border slg-shadow">
            <div
              aria-hidden="true"
              className="w-12 h-12 rounded-full bg-white slg-border grid place-items-center font-display font-extrabold text-[#0c1233] shrink-0"
            >
              SL
            </div>
            <div className="text-[0.98rem] text-[#0c1233]">
              Written by <strong>The Smart Loans Guide team</strong>. Read our{' '}
              <button
                type="button"
                onClick={() => onNavigate({ page: 'editorial-policy' })}
                className="font-extrabold text-[#2447ff] underline cursor-pointer"
              >
                editorial policy
              </button>{' '}
              or write to{' '}
              <a
                href="mailto:contact@smartloansguide.com"
                className="font-extrabold text-[#2447ff] underline"
              >
                contact@smartloansguide.com
              </a>
              .
            </div>
          </div>
        </article>
      </div>

      {/* Keep Reading Related Guides */}
      <div className="max-w-[1180px] mx-auto px-6 mt-16">
        <h2 className="font-display font-extrabold text-[2rem] text-[#0c1233] mb-6">
          Keep reading
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedGuides.map((rel) => (
            <button
              key={rel.slug}
              type="button"
              onClick={() => onNavigate({ page: 'guide', slug: rel.slug })}
              className="text-left bg-white rounded-[22px] p-6 slg-card-hover flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="text-[0.82rem] font-display font-bold text-[#2447ff]">
                  {rel.category} · {rel.readTime}
                </div>
                <h3 className="font-display font-extrabold text-[1.25rem] leading-[1.18] text-[#0c1233] mt-2 mb-2">
                  {rel.title}
                </h3>
                <p className="text-[0.95rem] text-[#46507a] m-0">{rel.summary}</p>
              </div>
              <div className="mt-5 font-display font-extrabold text-[0.95rem] text-[#2447ff]">
                Read guide →
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
