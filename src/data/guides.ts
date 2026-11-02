import { FAQItem, GuideArticle } from '../types';

export interface MathTabExample {
  id: string;
  tabLabel: string;
  heading: string;
  description: string;
  bigFigure: string;
  caption: string;
  calculatorSlug: string;
}

export const MATH_SHOWCASE_TABS: MathTabExample[] = [
  {
    id: 'tp0',
    tabLabel: 'Personal',
    heading: 'Personal loan maths',
    description:
      'Fixed payments, no collateral, and interest that adds up to about $3,434 in this example. Compare the total cost, not just the monthly payment.',
    bigFigure: '$384',
    caption: 'a month on $15,000 over 48 months at 10.5% APR',
    calculatorSlug: 'personal-loan-calculator',
  },
  {
    id: 'tp1',
    tabLabel: 'Car',
    heading: 'Car loan maths',
    description:
      'Tax, down payment and trade-in all change what you borrow. Shorter terms usually save the most interest.',
    bigFigure: '$592',
    caption: 'a month on a $29,920 car loan at 7% over 60 months',
    calculatorSlug: 'auto-loan-calculator',
  },
  {
    id: 'tp2',
    tabLabel: 'Consolidation',
    heading: 'Consolidation loan maths',
    description:
      'A lower rate can cut costs sharply, but only if fees stay low and the credit cards are not run up again.',
    bigFigure: '$10,400',
    caption: 'estimated saving moving $18,000 from 22% cards to an 11% loan',
    calculatorSlug: 'debt-consolidation-calculator',
  },
  {
    id: 'tp3',
    tabLabel: 'Early payoff',
    heading: 'Early payoff loan maths',
    description:
      'Small extra payments shorten the loan and cut interest, as long as there is no prepayment penalty.',
    bigFigure: '$1,040',
    caption: 'interest saved by adding $100 a month to a $20,000 loan at 8%',
    calculatorSlug: 'early-loan-payoff-calculator',
  },
  {
    id: 'tp4',
    tabLabel: 'Mortgage PITI',
    heading: 'Mortgage PITI maths',
    description:
      'Principal and interest are only part of your bill. Property taxes and home insurance collected into escrow add $550 a month here.',
    bigFigure: '$2,573',
    caption: 'real monthly bill on a $400,000 home (20% down, 6.5% rate, tax & insurance)',
    calculatorSlug: 'mortgage-payment-calculator',
  },
];

export const HOME_FAQS: FAQItem[] = [
  {
    question: 'Are your calculators free?',
    answer:
      'Yes. Every calculator is 100% free, requires no account or email, and runs directly in your browser so the figures you enter stay on your device.',
  },
  {
    question: 'Do you offer or arrange loans?',
    answer:
      'No. SmartLoansGuide is an independent education site. We are not a lender or broker, and we never take loan applications or collect personal financial details.',
  },
  {
    question: 'How accurate are the results?',
    answer:
      'Every calculator uses standard published amortisation and present-value formulas and shows the working clearly. Real offers vary by lender, fees, credit profile and local rules, so treat figures as educational estimates.',
  },
  {
    question: 'Can I use other currencies?',
    answer:
      'Yes. Every calculator lets you switch the currency symbol between US dollars ($), pounds (£), euros (€), Canadian dollars (C$), Australian dollars (A$), and rupees (Rs).',
  },
  {
    question: 'Does testing numbers here affect my credit score?',
    answer:
      'Never. Nothing is transmitted to any credit bureau or lender — all calculations happen locally inside your web browser.',
  },
];

export const GUIDES: GuideArticle[] = [
  {
    slug: 'how-personal-loans-work',
    category: 'Basics',
    title: 'How Personal Loans Work: A Plain-English Guide',
    summary:
      'What a personal loan is, how interest and fees work and how to decide if one is the right tool.',
    readTime: '6 min read',
    updatedDate: 'October 2026',
    standfirst:
      'What a personal loan is, how interest and fees work, and how to decide whether fixed-rate borrowing fits your budget before speaking with any lender.',
    linkedCalculatorSlug: 'personal-loan-calculator',
    linkedCalculatorTitle: 'Personal Loan Calculator',
    keyTakeaways: [
      'Most personal loans are unsecured and repaid in fixed monthly instalments over 12 to 84 months.',
      'Your real cost includes both the interest rate and any upfront origination fee.',
      'Choosing the shortest term whose payment fits comfortably in your budget saves the most interest.',
    ],
    sections: [
      {
        heading: 'The basics',
        paragraphs: [
          'A personal loan gives you a single lump sum that you repay in equal monthly instalments over an agreed term. Most personal loans are unsecured, meaning no physical asset such as your house or car is pledged as collateral.',
          'Because the lender takes on more risk without collateral, your interest rate depends heavily on your credit history, income stability, and existing debt-to-income ratio.',
        ],
      },
      {
        heading: 'Where the cost comes from',
        paragraphs: [
          'The primary cost is interest, expressed alongside mandatory fees as an Annual Percentage Rate (APR). Some lenders also deduct an origination fee — typically 1% to 8% — straight from the cash disbursed to your bank account.',
          'For example, borrowing $15,000 at 10.5% APR over 48 months produces a fixed payment of $384.05 a month and costs roughly $3,434 in total interest.',
        ],
      },
      {
        heading: 'When a personal loan makes sense',
        paragraphs: [
          'People commonly use personal loans to consolidate 22%+ credit card balances into a lower fixed rate, fund urgent home repairs, or spread an unavoidable medical bill cleanly.',
          'They are a poor fit for discretionary holidays, everyday living expenses, or investments whose returns are uncertain.',
        ],
      },
      {
        heading: 'How to compare offers safely',
        paragraphs: [
          'Compare at least three lenders using total repaid plus fees — never monthly payment alone. Check whether soft-credit prequalification is offered, confirm the rate is fixed, and verify there is zero prepayment penalty if you pay early.',
        ],
      },
    ],
  },
  {
    slug: 'apr-vs-interest-rate-explained',
    category: 'Basics',
    title: 'APR vs Interest Rate: What Is the Difference?',
    summary:
      'Interest rate and APR sound alike but measure different things. Learn how fees change the true cost of a loan.',
    readTime: '5 min read',
    updatedDate: 'October 2026',
    standfirst:
      'Interest rate and APR sound interchangeable, yet one hides upfront fees while the other exposes them. Here is how both numbers work in plain English.',
    linkedCalculatorSlug: 'apr-with-fees-calculator',
    linkedCalculatorTitle: 'APR With Fees Calculator',
    keyTakeaways: [
      'The interest rate determines your monthly payment on the face amount borrowed.',
      'APR folds mandatory upfront origination and admin fees into an annualised true-cost rate.',
      'When two loans have the same term, the lower APR is almost always the cheaper loan.',
    ],
    sections: [
      {
        heading: 'What the interest rate measures',
        paragraphs: [
          'The stated interest rate is simply the annual percentage charged on your loan principal. It tells you how your monthly instalment is calculated, ignoring any administrative or origination fees.',
        ],
      },
      {
        heading: 'What APR adds to the picture',
        paragraphs: [
          'Annual Percentage Rate (APR) accounts for both interest and mandatory upfront fees deducted from your loan proceeds. If you borrow $10,000 at a 6% interest rate over 36 months with a 5% origination fee, you receive only $9,500 in cash while making payments on the full $10,000.',
          'Solving for the real rate on the $9,500 you actually received lifts the effective APR from 6.00% to 9.51%.',
        ],
      },
      {
        heading: 'Why loan length changes fee impact',
        paragraphs: [
          'An upfront fee hits hardest on short loans. Paying a 5% fee on a 12-month loan adds nearly 10 percentage points to the APR, whereas spreading that same fee across 60 months adds roughly 1.8 points.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-compare-loan-offers',
    category: 'Shopping',
    title: 'How to Compare Loan Offers Like a Pro',
    summary:
      'A step-by-step method for comparing lenders by total cost, not just the monthly payment.',
    readTime: '6 min read',
    updatedDate: 'October 2026',
    standfirst:
      'Lenders love spotlighting a low monthly figure while stretching the repayment clock. Use this four-step comparison method to find the genuinely cheapest offer.',
    linkedCalculatorSlug: 'loan-comparison-calculator',
    linkedCalculatorTitle: 'Loan Comparison Calculator',
    keyTakeaways: [
      'Keep the net cash you need identical across every quote you request.',
      'Multiply monthly payment by months and add upfront fees to see true total cost.',
      'Never stretch a 36-month expense into a 72-month loan just to shave $80 off the monthly bill.',
    ],
    sections: [
      {
        heading: 'Step 1: Match the net cash received',
        paragraphs: [
          'If you need $12,000 for a roof repair and Lender B deducts a 4% origination fee, you would actually have to borrow $12,500 from Lender B to receive $12,000 in hand. Always compare apples to apples.',
        ],
      },
      {
        heading: 'Step 2: Look past the monthly payment trap',
        paragraphs: [
          'A $12,000 loan at 9% for 36 months costs $382 a month ($13,738 total). Another $12,000 loan at 7.5% for 60 months with a 3% fee costs $240 a month — yet totals $14,787. The lower-rate, lower-payment offer actually costs $1,050 more.',
        ],
      },
      {
        heading: 'Step 3: Check contract fine print',
        paragraphs: [
          'Before signing any agreement, confirm three contract rules: Is the interest rate fixed for the entire term? Are there zero prepayment penalties? How are extra principal payments applied?',
        ],
      },
    ],
  },
  {
    slug: 'car-loan-tips-to-save-money',
    category: 'Car',
    title: 'Car Loan Tips: How to Pay Less for Your Next Vehicle',
    summary:
      'Practical ways to cut the cost of an auto loan, from term length to down payments and pre-approval.',
    readTime: '5 min read',
    updatedDate: 'October 2026',
    standfirst:
      'Most car buyers negotiate on the showroom floor and overpay in the finance office. Walk in with pre-approved numbers and save thousands.',
    linkedCalculatorSlug: 'auto-loan-calculator',
    linkedCalculatorTitle: 'Auto Loan Calculator',
    keyTakeaways: [
      'Secure a bank or credit-union pre-approval before stepping onto a dealer lot.',
      'Negotiate the out-the-door vehicle price separately from financing and trade-in.',
      'Stick to 48 or 60 months — 72- and 84-month auto loans trap buyers in negative equity.',
    ],
    sections: [
      {
        heading: 'Get pre-approved before visiting a dealer',
        paragraphs: [
          'Checking auto rates with your bank or local credit union gives you a firm ceiling APR. Dealerships are welcome to beat that rate, but they can no longer mark up your financing without you noticing.',
        ],
      },
      {
        heading: 'Negotiate out-the-door price, never monthly payment',
        paragraphs: [
          'When a salesperson asks "What monthly payment are you looking for?", they can hit almost any target simply by stretching the loan to 72 or 84 months. Keep the conversation strictly on total out-the-door price including taxes and documentation fees.',
        ],
      },
      {
        heading: 'Put at least 15% to 20% down',
        paragraphs: [
          'Cars lose value fastest in the first two years. A solid down payment keeps your loan balance safely below the car’s resale value and saves interest from month one.',
        ],
      },
    ],
  },
  {
    slug: 'debt-consolidation-pros-and-cons',
    category: 'Debt',
    title: 'Debt Consolidation Loans: Pros and Cons',
    summary:
      'When consolidating debts saves money, when it does not and how to avoid common traps.',
    readTime: '6 min read',
    updatedDate: 'October 2026',
    standfirst:
      'Rolling four credit card bills into one fixed payment sounds like instant relief — and when the maths works, it saves thousands. Here is when it helps and when it backfires.',
    linkedCalculatorSlug: 'debt-consolidation-calculator',
    linkedCalculatorTitle: 'Debt Consolidation Calculator',
    keyTakeaways: [
      'Consolidation saves real money only when the new APR (including fees) is meaningfully lower.',
      'Swapping variable revolving credit for a fixed payoff date creates clear momentum.',
      'Running cleared credit cards back up is the #1 reason consolidation fails.',
    ],
    sections: [
      {
        heading: 'How consolidation saves money',
        paragraphs: [
          'Carrying $18,000 across credit cards at 22% APR while paying $450 a month takes roughly six years and $14,740 in interest. Replacing those balances with an 11% fixed 48-month loan keeps the payment around $465 while cutting total interest to $4,330 — saving over $10,400.',
        ],
      },
      {
        heading: 'When consolidation backfires',
        paragraphs: [
          'If your credit score only qualifies you for a 21% loan with a 6% origination fee, or if you stretch moderate debt over seven years, you can end up paying more than staying put and using the debt avalanche method.',
        ],
      },
      {
        heading: 'Protecting yourself after consolidating',
        paragraphs: [
          'Unlink paid-off cards from one-click shopping sites, set autopay on the new instalment loan, and build a small cash buffer so an unexpected car repair does not push you back onto plastic.',
        ],
      },
    ],
  },
  {
    slug: 'what-is-debt-to-income-ratio',
    category: 'Eligibility',
    title: 'What Is a Debt-to-Income Ratio and Why Do Lenders Care?',
    summary:
      'How DTI is calculated, what lenders look for and how to improve yours before applying.',
    readTime: '4 min read',
    updatedDate: 'October 2026',
    standfirst:
      'Even an 800 credit score cannot rescue an overloaded monthly budget. Learn how lenders compute your DTI ratio in 60 seconds.',
    linkedCalculatorSlug: 'debt-to-income-calculator',
    linkedCalculatorTitle: 'Debt-to-Income Ratio Calculator',
    keyTakeaways: [
      'DTI = Total Recurring Monthly Debt Payments ÷ Gross Monthly Income.',
      'Under 36% is broadly preferred; above 43% restricts mortgage and prime loan options.',
      'Paying off a small instalment balance right before applying immediately drops your DTI.',
    ],
    sections: [
      {
        heading: 'How the formula works',
        paragraphs: [
          'Add up your rent or mortgage payment, auto loans, student loans, personal loans, and minimum required credit card payments. Divide that sum by your gross (before-tax) monthly income.',
          'If you earn $5,000 a month before tax and pay $1,200 toward housing and debts, your DTI is 24%. Adding a $400 loan lifts it to 32%.',
        ],
      },
      {
        heading: 'What counts and what does not',
        paragraphs: [
          'Lenders include contractual debts reported on your credit file plus housing and court-ordered obligations. Everyday costs like groceries, utilities, fuel, and streaming subscriptions are excluded — which is why you should still check your net take-home budget separately.',
        ],
      },
      {
        heading: 'Three quick ways to lower DTI',
        paragraphs: [
          'Clear small tail-end balances to eliminate their entire monthly minimum, avoid opening any new financing within six months of a major application, and document all regular bonus or side income.',
        ],
      },
    ],
  },
  {
    slug: 'mortgage-payment-breakdown-piti',
    category: 'Home',
    title: 'Mortgage Payments Explained: What PITI Means and What You Will Really Pay',
    summary:
      'PITI — principal, interest, tax and insurance — is your real monthly mortgage bill.',
    readTime: '6 min read',
    updatedDate: 'October 2026',
    standfirst:
      'Your mortgage payment is four bills bundled into one: principal, interest, property tax, and home insurance. Estimate all four before making an offer on a home.',
    linkedCalculatorSlug: 'mortgage-payment-calculator',
    linkedCalculatorTitle: 'Mortgage Payment Calculator',
    keyTakeaways: [
      'Headline mortgage ads show principal and interest only — leaving out hundreds in escrow bills.',
      'Property taxes and homeowners insurance rise over time even when your interest rate is fixed.',
      'Aim to keep total PITI + HOA below 28% of gross monthly household income.',
    ],
    sections: [
      {
        heading: 'The four parts: PITI',
        paragraphs: [
          'Lenders advertise principal and interest, but the money that leaves your checking account every month is PITI — Principal, Interest, Tax, and Insurance. Tax and insurance are normally collected into an escrow account so the lender can pay annual bills on time.',
        ],
      },
      {
        heading: 'A complete worked example',
        paragraphs: [
          'On a $400,000 home with 20% down ($320,000 loan) at 6.5% over 30 years, principal and interest equal $2,023 a month. Add $4,800 yearly property tax ($400/mo) and $1,800 yearly home insurance ($150/mo), and your true monthly housing bill is $2,573.',
        ],
      },
      {
        heading: 'The 28% affordability rule',
        paragraphs: [
          'Keeping total monthly housing costs under 28% of gross monthly income leaves breathing room for maintenance, retirement savings, and rising insurance renewals.',
        ],
      },
    ],
  },
  {
    slug: 'pay-off-credit-card-debt-fast',
    category: 'Debt',
    title: 'How to Pay Off Credit Card Debt Fast: A Practical Plan That Works',
    summary:
      'A step-by-step plan to clear card debt fast: avalanche or snowball, automation and traps to avoid.',
    readTime: '5 min read',
    updatedDate: 'October 2026',
    standfirst:
      'Credit card minimum payments are engineered to stretch balances for decades. Lock in a fixed payoff plan and cut your interest bill in half.',
    linkedCalculatorSlug: 'credit-card-payoff-calculator',
    linkedCalculatorTitle: 'Credit Card Payoff Calculator',
    keyTakeaways: [
      'Freeze new card purchases first so every dollar paid actually reduces principal.',
      'Fix a constant monthly dollar payment rather than letting your payment shrink with the minimum.',
      'Target the highest-APR card first (avalanche) for maximum mathematical savings.',
    ],
    sections: [
      {
        heading: 'Stop the balance from refilling',
        paragraphs: [
          'Switch everyday groceries and bills to a debit card or cash budget while clearing revolving balances. Paying $400 toward a card while charging $300 in new purchases leaves you treading water at 22% interest.',
        ],
      },
      {
        heading: 'Avalanche vs Snowball',
        paragraphs: [
          'Pay minimums on every card, then direct every spare dollar at a single target card. Picking the highest APR first (Avalanche) saves the most interest; picking the smallest balance first (Snowball) clears whole accounts faster if you need quick motivation.',
        ],
      },
      {
        heading: 'Roll each cleared payment forward',
        paragraphs: [
          'The moment Card #1 hits $0, roll its entire monthly payment straight onto Card #2. Your total monthly outlay stays identical while your payoff speed snowballs.',
        ],
      },
    ],
  },
  {
    slug: 'should-you-refinance-mortgage',
    category: 'Home',
    title: 'Should You Refinance Your Mortgage? The Break-Even Test Decides',
    summary:
      'Refinancing only pays if you break even before you sell. Learn the test.',
    readTime: '5 min read',
    updatedDate: 'October 2026',
    standfirst:
      'A lower mortgage rate looks irresistible on paper, yet closing fees and clock resets can quietly erase the win. Run the two-minute break-even test first.',
    linkedCalculatorSlug: 'refinance-break-even-calculator',
    linkedCalculatorTitle: 'Refinance Break-Even Calculator',
    keyTakeaways: [
      'Break-Even Months = Total Closing Costs ÷ Monthly Payment Savings.',
      'Moving or selling before your break-even month means losing money on the refinance.',
      'Refinancing into a matching or shorter term protects you from paying higher lifetime interest.',
    ],
    sections: [
      {
        heading: 'Calculate your exact break-even month',
        paragraphs: [
          'Suppose refinancing a $280,000 balance from 7.5% to 6.0% trims your monthly payment by $390, and appraisal, title, and origination fees total $6,000. Divide $6,000 by $390: it takes 15.4 months just to earn back the upfront cost.',
        ],
      },
      {
        heading: 'Avoid resetting the 30-year clock blindly',
        paragraphs: [
          'If you have already paid down 8 years of a 30-year loan, starting a brand-new 30-year mortgage stretches your debt to 38 years total. Ask the lender to quote a 20-year or 15-year term alongside the 30-year option.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-pay-off-a-loan-early',
    category: 'Savings',
    title: 'How to Pay Off a Loan Early (and Whether You Should)',
    summary:
      'Extra payments can save serious interest. Learn how to do it safely and when other priorities come first.',
    readTime: '5 min read',
    updatedDate: 'October 2026',
    standfirst:
      'Adding even $75 or $100 a month to an instalment loan shaves over a year off repayment — provided you check three essentials first.',
    linkedCalculatorSlug: 'early-loan-payoff-calculator',
    linkedCalculatorTitle: 'Early Loan Payoff Calculator',
    keyTakeaways: [
      'Confirm zero prepayment penalties and ensure extra payments hit principal immediately.',
      'Keep a basic emergency fund before locking spare cash into illiquid loan prepayments.',
      'Prioritise loans above 7%–8% APR ahead of ultra-low fixed-rate debt.',
    ],
    sections: [
      {
        heading: 'How principal-only payments work',
        paragraphs: [
          'Interest each month is calculated on your remaining balance. Every extra dollar applied directly to principal reduces next month’s interest charge — and every month after that.',
        ],
      },
      {
        heading: 'Check servicer rules first',
        paragraphs: [
          'Some loan portals treat an extra transfer as an early payment toward next month’s bill rather than an immediate principal reduction. Tick "Apply to principal only" in your online account settings.',
        ],
      },
    ],
  },
  {
    slug: 'improve-credit-before-applying-for-a-loan',
    category: 'Credit',
    title: 'How to Improve Your Credit Before Applying for a Loan',
    summary:
      'Practical steps to strengthen your credit profile and qualify for a better rate.',
    readTime: '6 min read',
    updatedDate: 'October 2026',
    standfirst:
      'Trimming 3 percentage points off your APR by preparing your credit profile 60 days ahead of applying can save thousands without changing anything else.',
    linkedCalculatorSlug: 'personal-loan-calculator',
    linkedCalculatorTitle: 'Personal Loan Calculator',
    keyTakeaways: [
      'Pull free credit reports and dispute factual reporting errors at least 60 days early.',
      'Pay revolving credit card balances below 10%–30% of their credit limits before statement closing dates.',
      'Pause all new credit applications in the months leading up to a major loan.',
    ],
    sections: [
      {
        heading: 'Lower your credit card utilisation fast',
        paragraphs: [
          'Unlike payment history, which takes years to build, credit utilisation has no memory in most scoring models. Paying a $4,000 balance on a $5,000-limit card down below $500 before the statement closing date can lift your score within a single billing cycle.',
        ],
      },
      {
        heading: 'Check reports for errors early',
        paragraphs: [
          'Review every account on your credit files for duplicate collections, misreported late marks, or balances that were already settled. Disputing genuine inaccuracies well ahead of your application prevents last-minute underwriting surprises.',
        ],
      },
    ],
  },
];

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
