/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { BlogHubPage, GuideDetailPage } from './components/BlogPages';
import { CalculatorView } from './components/CalculatorView';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ContactPage, StaticInfoPage } from './components/InfoPages';
import { ToolsHubPage } from './components/ToolsHubPage';
import { CALCULATORS, getCalculatorBySlug } from './data/calculators';
import { getGuideBySlug, GUIDES } from './data/guides';
import { STATIC_PAGES } from './data/staticPages';
import { CurrencySymbol, RouteView } from './types';

function routeToHash(route: RouteView): string {
  switch (route.page) {
    case 'home':
      return '#/';
    case 'tools':
      return '#/tools';
    case 'calculator':
      return `#/tools/${route.slug}`;
    case 'blog':
      return '#/blog';
    case 'guide':
      return `#/blog/${route.slug}`;
    default:
      return `#/${route.page}`;
  }
}

function parseHashToRoute(hash: string): RouteView {
  const clean = hash.replace(/^#\/?/, '').replace(/\/$/, '');
  if (!clean) return { page: 'home' };

  if (clean === 'tools') return { page: 'tools' };
  if (clean.startsWith('tools/')) {
    const slug = clean.slice('tools/'.length);
    if (getCalculatorBySlug(slug)) {
      return { page: 'calculator', slug };
    }
    return { page: 'tools' };
  }

  if (clean === 'blog') return { page: 'blog' };
  if (clean.startsWith('blog/')) {
    const slug = clean.slice('blog/'.length);
    if (getGuideBySlug(slug)) {
      return { page: 'guide', slug };
    }
    return { page: 'blog' };
  }

  if (
    clean === 'about' ||
    clean === 'editorial-policy' ||
    clean === 'contact' ||
    clean === 'privacy-policy' ||
    clean === 'terms' ||
    clean === 'disclaimer'
  ) {
    return { page: clean };
  }

  return { page: 'home' };
}

export default function App() {
  const [route, setRoute] = useState<RouteView>(() =>
    parseHashToRoute(window.location.hash)
  );

  const [currency, setCurrency] = useState<CurrencySymbol>(() => {
    try {
      const saved = localStorage.getItem('slg-currency') as CurrencySymbol | null;
      if (saved && ['$', '£', '€', 'C$', 'A$', 'Rs '].includes(saved)) {
        return saved;
      }
    } catch {
      // Ignore storage access errors in restricted frames
    }
    return '$';
  });

  useEffect(() => {
    const onHashChange = () => {
      setRoute((prev) => {
        const parsed = parseHashToRoute(window.location.hash);
        if (
          prev.page === 'calculator' &&
          parsed.page === 'calculator' &&
          prev.slug === parsed.slug &&
          prev.preset
        ) {
          return prev;
        }
        return parsed;
      });
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleCurrencyChange = (next: CurrencySymbol) => {
    setCurrency(next);
    try {
      localStorage.setItem('slg-currency', next);
    } catch {
      // Ignore storage errors
    }
  };

  const navigate = (nextRoute: RouteView) => {
    setRoute(nextRoute);
    const targetHash = routeToHash(nextRoute);
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderMain = () => {
    switch (route.page) {
      case 'home':
        return (
          <HomePage
            currency={currency}
            onCurrencyChange={handleCurrencyChange}
            onNavigate={navigate}
          />
        );
      case 'tools':
        return (
          <ToolsHubPage
            currency={currency}
            onCurrencyChange={handleCurrencyChange}
            onNavigate={navigate}
          />
        );
      case 'calculator': {
        const calc = getCalculatorBySlug(route.slug) || CALCULATORS[0];
        return (
          <CalculatorView
            calculator={calc}
            preset={route.preset}
            currency={currency}
            onCurrencyChange={handleCurrencyChange}
            onNavigate={navigate}
          />
        );
      }
      case 'blog':
        return <BlogHubPage onNavigate={navigate} />;
      case 'guide': {
        const guide = getGuideBySlug(route.slug) || GUIDES[0];
        return <GuideDetailPage guide={guide} onNavigate={navigate} />;
      }
      case 'contact':
        return <ContactPage onNavigate={navigate} />;
      case 'about':
      case 'editorial-policy':
      case 'privacy-policy':
      case 'terms':
      case 'disclaimer': {
        const pageData = STATIC_PAGES[route.page];
        return <StaticInfoPage content={pageData} onNavigate={navigate} />;
      }
      default:
        return (
          <HomePage
            currency={currency}
            onCurrencyChange={handleCurrencyChange}
            onNavigate={navigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f5ff] text-[#0c1233]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[#c9f23f] focus:text-[#0c1233] focus:px-4 focus:py-2 focus:rounded-lg focus:font-extrabold"
      >
        Skip to main content
      </a>

      <Header currentRoute={route} onNavigate={navigate} />

      <main id="main-content" className="flex-1">
        {renderMain()}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
