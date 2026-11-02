import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { RouteView } from '../types';
import { Logo } from './Logo';

interface HeaderProps {
  currentRoute: RouteView;
  onNavigate: (route: RouteView) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? Math.min(100, Math.max(0, (doc.scrollTop / max) * 100)) : 0;
      setScrollProgress(pct);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const go = (route: RouteView) => {
    setMobileOpen(false);
    onNavigate(route);
  };

  const isToolsActive =
    currentRoute.page === 'tools' || currentRoute.page === 'calculator';
  const isBlogActive =
    currentRoute.page === 'blog' || currentRoute.page === 'guide';

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 z-50 h-1.5 bg-[#ff7a2f] border-r-[3px] border-[#0c1233] transition-[width] duration-75"
        style={{ width: `${scrollProgress}%`, opacity: scrollProgress > 0.5 ? 1 : 0 }}
      />

      {/* Sticky 74px Header — Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white border-b-[3px] border-[#0c1233]">
        <div className="max-w-[1180px] mx-auto px-6 h-[74px] flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <Logo onClick={() => go({ page: 'home' })} />

          {/* Zone 2: 4 Clean Single-Line Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 font-display text-[0.98rem] font-bold text-[#0c1233]"
          >
            <button
              type="button"
              onClick={() => go({ page: 'tools' })}
              className={`whitespace-nowrap shrink-0 cursor-pointer py-1 border-b-2 transition-colors ${
                isToolsActive
                  ? 'border-[#2447ff] text-[#2447ff]'
                  : 'border-transparent hover:border-[#0c1233]'
              }`}
            >
              Calculators
            </button>
            <button
              type="button"
              onClick={() => go({ page: 'blog' })}
              className={`whitespace-nowrap shrink-0 cursor-pointer py-1 border-b-2 transition-colors ${
                isBlogActive
                  ? 'border-[#2447ff] text-[#2447ff]'
                  : 'border-transparent hover:border-[#0c1233]'
              }`}
            >
              Guides
            </button>
            <button
              type="button"
              onClick={() => go({ page: 'about' })}
              className={`whitespace-nowrap shrink-0 cursor-pointer py-1 border-b-2 transition-colors ${
                currentRoute.page === 'about'
                  ? 'border-[#2447ff] text-[#2447ff]'
                  : 'border-transparent hover:border-[#0c1233]'
              }`}
            >
              About
            </button>
            <button
              type="button"
              onClick={() => go({ page: 'contact' })}
              className={`whitespace-nowrap shrink-0 cursor-pointer py-1 border-b-2 transition-colors ${
                currentRoute.page === 'contact'
                  ? 'border-[#2447ff] text-[#2447ff]'
                  : 'border-transparent hover:border-[#0c1233]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() =>
                go({ page: 'calculator', slug: 'personal-loan-calculator' })
              }
              className="hidden md:inline-flex slg-btn-sm bg-[#c9f23f] text-[#0c1233] px-4 py-2 text-[0.95rem] whitespace-nowrap shrink-0"
            >
              Calculate a loan
            </button>

            <button
              type="button"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-[10px] bg-[#c9f23f] text-[#0c1233] border-[3px] border-[#0c1233] cursor-pointer"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t-[3px] border-[#0c1233] px-6 py-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => go({ page: 'tools' })}
              className="text-left font-display font-extrabold text-lg py-2.5 px-3 rounded-lg hover:bg-[#c9f23f] text-[#0c1233] cursor-pointer"
            >
              Calculators
            </button>
            <button
              type="button"
              onClick={() => go({ page: 'blog' })}
              className="text-left font-display font-extrabold text-lg py-2.5 px-3 rounded-lg hover:bg-[#c9f23f] text-[#0c1233] cursor-pointer"
            >
              Guides
            </button>
            <button
              type="button"
              onClick={() => go({ page: 'about' })}
              className="text-left font-display font-extrabold text-lg py-2.5 px-3 rounded-lg hover:bg-[#c9f23f] text-[#0c1233] cursor-pointer"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => go({ page: 'contact' })}
              className="text-left font-display font-extrabold text-lg py-2.5 px-3 rounded-lg hover:bg-[#c9f23f] text-[#0c1233] cursor-pointer"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={() =>
                go({ page: 'calculator', slug: 'personal-loan-calculator' })
              }
              className="mt-2 slg-btn bg-[#c9f23f] text-[#0c1233] py-3 px-5 text-base whitespace-nowrap"
            >
              Calculate a loan
            </button>
          </div>
        )}
      </header>
    </>
  );
};
