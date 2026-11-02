import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { RouteView } from '../types';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (route: RouteView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 450);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <footer className="bg-[#0c1233] text-[#c3cdf5] border-t-[3px] border-[#0c1233] pt-16 pb-8 mt-14">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-9">
            <div>
              <Logo variant="footer" onClick={() => onNavigate({ page: 'home' })} />
              <p className="mt-4 text-[0.97rem] leading-relaxed text-[#97a4d8] max-w-sm">
                Free loan calculators and plain-English guides. We are not a lender,
                broker or advisor, and we never take loan applications.
              </p>
              <a
                href="mailto:contact@smartloansguide.com"
                className="inline-block mt-3 font-bold text-white hover:text-[#c9f23f] transition-colors"
              >
                contact@smartloansguide.com
              </a>
            </div>

            <div>
              <h3 className="font-display font-extrabold text-[0.92rem] text-[#c9f23f] mb-3">
                Calculators
              </h3>
              <ul className="space-y-2 text-[0.96rem] font-bold">
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate({ page: 'calculator', slug: 'personal-loan-calculator' })
                    }
                    className="text-white hover:text-[#c9f23f] transition-colors cursor-pointer text-left"
                  >
                    Personal Loan Calculator
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate({ page: 'calculator', slug: 'mortgage-payment-calculator' })
                    }
                    className="text-white hover:text-[#c9f23f] transition-colors cursor-pointer text-left"
                  >
                    Mortgage Payment Calculator
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate({ page: 'calculator', slug: 'auto-loan-calculator' })
                    }
                    className="text-white hover:text-[#c9f23f] transition-colors cursor-pointer text-left"
                  >
                    Auto Loan Calculator
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate({ page: 'calculator', slug: 'early-loan-payoff-calculator' })
                    }
                    className="text-white hover:text-[#c9f23f] transition-colors cursor-pointer text-left"
                  >
                    Early Loan Payoff Calculator
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate({ page: 'calculator', slug: 'debt-consolidation-calculator' })
                    }
                    className="text-white hover:text-[#c9f23f] transition-colors cursor-pointer text-left"
                  >
                    Debt Consolidation Calculator
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'tools' })}
                    className="text-[#c9f23f] hover:underline transition-colors cursor-pointer text-left"
                  >
                    All twelve calculators →
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-extrabold text-[0.92rem] text-[#c9f23f] mb-3">
                Site
              </h3>
              <ul className="space-y-2 text-[0.96rem] font-bold">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'blog' })}
                    className="text-white hover:text-[#c9f23f] transition-colors cursor-pointer"
                  >
                    Guides &amp; Blog
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'about' })}
                    className="text-white hover:text-[#c9f23f] transition-colors cursor-pointer"
                  >
                    About us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'editorial-policy' })}
                    className="text-white hover:text-[#c9f23f] transition-colors cursor-pointer"
                  >
                    Editorial policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'contact' })}
                    className="text-white hover:text-[#c9f23f] transition-colors cursor-pointer"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-extrabold text-[0.92rem] text-[#c9f23f] mb-3">
                Legal
              </h3>
              <ul className="space-y-2 text-[0.96rem] font-bold">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'privacy-policy' })}
                    className="text-white hover:text-[#c9f23f] transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'terms' })}
                    className="text-white hover:text-[#c9f23f] transition-colors cursor-pointer"
                  >
                    Terms of Use
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'disclaimer' })}
                    className="text-white hover:text-[#c9f23f] transition-colors cursor-pointer"
                  >
                    Disclaimer
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t-2 border-white/15 mt-10 pt-5 text-[0.88rem] text-[#8391c9]">
            © 2026 SmartLoansGuide. For information and education only. Not financial,
            credit or legal advice. We do not offer or arrange loans.
          </div>
        </div>
      </footer>

      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-30 w-12 h-12 rounded-xl bg-[#c9f23f] text-[#0c1233] slg-btn-sm flex items-center justify-center"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.75]" />
        </button>
      )}
    </>
  );
};
