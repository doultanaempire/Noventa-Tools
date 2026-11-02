import { StaticPageContent } from '../types';

export const STATIC_PAGES: Record<string, StaticPageContent> = {
  about: {
    slug: 'about',
    title: 'About SmartLoansGuide',
    lead: 'We help people see the true cost of borrowing before they sign.',
    showAuthorBadge: true,
    sections: [
      {
        heading: 'Why we built this site',
        paragraphs: [
          'Loan adverts shout about low monthly payments and whisper about everything else. We started SmartLoansGuide to flip that: put the formula on the page, let you test your own numbers in seconds, and explain the result without banking jargon.',
        ],
      },
      {
        heading: 'What you will find',
        paragraphs: [
          'Twelve free browser-based calculators covering personal loans, mortgages (PITI), car loans, credit card payoff, student loan repayment, refinance break-even, early payoff, debt consolidation, affordability, APR with fees, debt-to-income ratio, and side-by-side offer comparison — plus eleven plain-English guides tied directly to those tools.',
        ],
      },
      {
        heading: 'How we work',
        paragraphs: [
          'Every calculator is checked against hand calculations and standard financial amortisation equations, and every worked example in our guides is verified. We avoid quoting fleeting promotional rates and instead give you transparent tools to test any quote a lender puts in front of you.',
        ],
      },
      {
        heading: 'What we are not',
        paragraphs: [
          'We are not a lender, broker, or financial advisor. We do not take loan applications, collect personal financial details, or rank lenders for pay. Our sole goal is clear financial education so you can ask sharper questions before borrowing.',
        ],
      },
    ],
  },
  'editorial-policy': {
    slug: 'editorial-policy',
    title: 'Editorial policy',
    lead: 'How we write, check and maintain every calculator and guide.',
    showAuthorBadge: true,
    sections: [
      {
        heading: 'Accuracy',
        paragraphs: [
          'Each calculator uses a published mathematical formula explained right on its page, and every worked example in our articles is verified by independent calculation. Because interest rates and local lending rules shift over time, we show you how to verify figures using your own lender disclosures.',
        ],
      },
      {
        heading: 'Independence',
        paragraphs: [
          'We do not accept payment to rank or recommend lenders, and we never take loan applications. Content and formulas are built strictly for readers.',
        ],
      },
      {
        heading: 'Corrections and updates',
        paragraphs: [
          'We review our calculators and guides regularly and display the latest review date on each page. If you ever spot an error or unclear explanation, contact us at contact@smartloansguide.com and we will investigate and update promptly.',
        ],
      },
      {
        heading: 'Educational limits',
        paragraphs: [
          'We are not licensed financial, tax, or legal advisors. Everything on SmartLoansGuide is general education; always consult a qualified professional regarding your personal circumstances.',
        ],
      },
    ],
  },
  'privacy-policy': {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    lead: 'Last updated October 2026.',
    sections: [
      {
        heading: 'Information we collect',
        paragraphs: [
          'All twelve calculators run locally inside your web browser. The loan balances, incomes, interest rates, and payments you type are never transmitted to or stored on any server. We store only your preferred currency symbol in your browser localStorage for convenience.',
        ],
      },
      {
        heading: 'Messages you send us',
        paragraphs: [
          'If you write to us via email or use our feedback form, we use your contact details solely to read and reply to your enquiry.',
        ],
      },
      {
        heading: 'Cookies and local preferences',
        paragraphs: [
          'Standard browser storage is used strictly to remember interface preferences such as your chosen currency symbol ($, £, €, C$, A$, or Rs).',
        ],
      },
      {
        heading: 'Your privacy rights',
        paragraphs: [
          'Depending on your jurisdiction (including GDPR, UK GDPR, and CCPA), you have rights regarding any personal correspondence you send us. Write to contact@smartloansguide.com with any privacy request.',
        ],
      },
    ],
  },
  terms: {
    slug: 'terms',
    title: 'Terms of Use',
    lead: 'Please read these terms before using SmartLoansGuide.',
    sections: [
      {
        heading: 'Using the site',
        paragraphs: [
          'SmartLoansGuide provides free educational calculators and plain-English guides for personal, non-commercial learning and budgeting.',
        ],
      },
      {
        heading: 'No professional advice',
        paragraphs: [
          'All content and calculator outputs are general educational estimates — not financial, credit, mortgage, tax, or legal advice. SmartLoansGuide is not a bank, lender, or broker.',
        ],
      },
      {
        heading: 'Accuracy and availability',
        paragraphs: [
          'While every formula is carefully tested, real lender calculations can vary due to daily compounding conventions, leap years, escrow adjustments, and local regulations. Always verify final numbers on official loan disclosures before signing.',
        ],
      },
      {
        heading: 'Limitation of liability',
        paragraphs: [
          'To the fullest extent permitted by law, SmartLoansGuide is not liable for financial decisions or losses arising from reliance on estimates shown on this website.',
        ],
      },
    ],
  },
  disclaimer: {
    slug: 'disclaimer',
    title: 'Disclaimer',
    lead: 'What this site is, and what it is not.',
    sections: [
      {
        heading: 'Education, not advice',
        paragraphs: [
          'SmartLoansGuide offers general financial literacy articles and mathematical calculators. Nothing on this site constitutes personalised financial, credit, legal, or tax advice.',
        ],
      },
      {
        heading: 'No loans offered or arranged',
        paragraphs: [
          'We do not lend money, broker credit, prequalify borrowers, or accept loan applications. Any bank, credit union, or lender you approach operates completely independently of SmartLoansGuide.',
        ],
      },
      {
        heading: 'Estimates only',
        paragraphs: [
          'Calculator outputs depend entirely on the inputs you enter and assume fixed interest rates unless noted otherwise. Actual APRs, fees, taxes, insurance, and approval rules depend on your lender, credit profile, and country.',
        ],
      },
      {
        heading: 'Check official sources',
        paragraphs: [
          'Before committing to any credit agreement, read the lender’s official Truth in Lending or consumer credit disclosure and consult a qualified advisor if unsure.',
        ],
      },
    ],
  },
};
