import {
  CalculatorConfig,
  TileColor,
  ToolCategory,
} from '../types';
import {
  formatDuration,
  formatMoney,
  nper,
  pmt,
  solveEffectiveApr,
} from '../utils/loanMath';

export const CALCULATORS: CalculatorConfig[] = [
  {
    id: 8,
    slug: 'mortgage-payment-calculator',
    tag: 'Home',
    filterCategory: ToolCategory.Home,
    color: TileColor.Blue,
    title: 'Mortgage Payment Calculator',
    shortDescription:
      'Work out your full monthly payment — principal, interest, tax, insurance and HOA.',
    formulaText:
      'M = P × [r(1 + r)^n] / [(1 + r)^n − 1] + (Property Tax / 12) + (Home Insurance / 12) + HOA',
    relatedGuideSlug: 'mortgage-payment-breakdown-piti',
    fields: [
      {
        key: 'price',
        label: 'Home price',
        defaultValue: 400000,
        step: 5000,
        min: 50000,
        max: 2000000,
        unit: 'currency',
      },
      {
        key: 'down',
        label: 'Down payment (%)',
        defaultValue: 20,
        step: 1,
        min: 0,
        max: 80,
        unit: 'percent',
      },
      {
        key: 'rate',
        label: 'Interest rate (%)',
        defaultValue: 6.5,
        step: 0.05,
        min: 1,
        max: 15,
        unit: 'percent',
      },
      {
        key: 'yrs',
        label: 'Loan term (years)',
        defaultValue: 30,
        step: 1,
        min: 5,
        max: 40,
        unit: 'years',
      },
      {
        key: 'tax',
        label: 'Property tax (per year)',
        defaultValue: 4800,
        step: 100,
        min: 0,
        max: 30000,
        unit: 'currency',
      },
      {
        key: 'ins',
        label: 'Home insurance (per year)',
        defaultValue: 1800,
        step: 50,
        min: 0,
        max: 12000,
        unit: 'currency',
      },
      {
        key: 'hoa',
        label: 'HOA dues (per month)',
        defaultValue: 0,
        step: 25,
        min: 0,
        max: 1500,
        unit: 'currency',
      },
    ],
    calculate: (v, cur) => {
      const loan = Math.max(0, v.price * (1 - v.down / 100));
      const months = Math.max(1, v.yrs * 12);
      const pi = pmt(loan, v.rate, months);
      const tx = v.tax / 12;
      const inm = v.ins / 12;
      const tot = pi + tx + inm + v.hoa;
      const lifetimeInterest = Math.max(0, pi * months - loan);

      return {
        headlineLabel: 'Total monthly payment',
        headlineValue: formatMoney(tot, cur, 2),
        rows: [
          ['Loan amount', formatMoney(loan, cur)],
          ['Down payment cash', formatMoney(v.price - loan, cur)],
          ['Principal & interest', formatMoney(pi, cur, 2)],
          ['Property tax (monthly)', formatMoney(tx, cur, 2)],
          ['Home insurance (monthly)', formatMoney(inm, cur, 2)],
          ['HOA dues', formatMoney(v.hoa, cur, 2)],
          ['Total lifetime interest', formatMoney(lifetimeInterest, cur)],
        ],
        segments: [
          { label: 'Principal & Interest', value: pi, color: 'lime' },
          { label: 'Tax & Insurance', value: tx + inm, color: 'orange' },
          ...(v.hoa > 0 ? [{ label: 'HOA', value: v.hoa, color: 'white' as const }] : []),
        ],
        amortization: {
          principal: loan,
          annualRate: v.rate,
          months,
        },
        note:
          v.down < 20
            ? 'With less than 20% down, many lenders require Private Mortgage Insurance (PMI) — budget roughly 0.5% to 1% of the loan per year extra.'
            : 'PITI plus HOA shown above. Property taxes and insurance premiums can rise over time even on a fixed-rate mortgage.',
      };
    },
    articleSections: [
      {
        heading: 'What PITI means',
        paragraphs: [
          'Lenders quote principal and interest, but your actual monthly bill is PITI: principal, interest, property tax and home insurance, plus HOA dues if any. Tax and insurance are usually collected monthly into escrow, so the number that leaves your bank account is significantly larger than the loan payment alone.',
        ],
      },
      {
        heading: 'Worked example',
        paragraphs: [
          'A $400,000 home with 20% down at 6.5% over 30 years means a $320,000 loan. Principal and interest come to about $2,023 a month; add $400 property tax, $150 insurance and no HOA, and the real monthly bill is about $2,573.',
        ],
      },
      {
        heading: 'What the calculator leaves out',
        paragraphs: [
          'Private mortgage insurance (PMI) is not added automatically — with less than 20% down, budget roughly 0.5% to 1% of the loan per year extra until your equity reaches 20%. Property tax and insurance also rise over time, so revisit the numbers yearly. Keeping housing costs under 28% of gross income is a classic sanity check.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why is my actual mortgage bill higher than the lender quote?',
        answer:
          'Headline mortgage quotes usually show principal and interest only. Property taxes, homeowners insurance, and HOA fees add hundreds each month.',
      },
      {
        question: 'Should I choose a 15-year or 30-year mortgage?',
        answer:
          'A 15-year term has a noticeably higher monthly payment, but a lower interest rate and less than half the lifetime interest of a 30-year mortgage.',
      },
      {
        question: 'How much down payment avoids PMI?',
        answer:
          'Putting at least 20% down on a conventional mortgage typically avoids Private Mortgage Insurance.',
      },
    ],
  },
  {
    id: 9,
    slug: 'credit-card-payoff-calculator',
    tag: 'Debt',
    filterCategory: ToolCategory.DebtCredit,
    color: TileColor.White,
    title: 'Credit Card Payoff Calculator',
    shortDescription:
      'How long your balance takes to clear and what interest really costs.',
    formulaText: 'n = −ln(1 − (Balance × r / Monthly Payment)) / ln(1 + r), where r = APR / 1200',
    relatedGuideSlug: 'pay-off-credit-card-debt-fast',
    fields: [
      {
        key: 'bal',
        label: 'Card balance',
        defaultValue: 8000,
        step: 100,
        min: 100,
        max: 100000,
        unit: 'currency',
      },
      {
        key: 'apr',
        label: 'APR (%)',
        defaultValue: 22,
        step: 0.1,
        min: 0,
        max: 39.9,
        unit: 'percent',
      },
      {
        key: 'pay',
        label: 'Monthly payment',
        defaultValue: 250,
        step: 10,
        min: 20,
        max: 5000,
        unit: 'currency',
      },
    ],
    calculate: (v, cur) => {
      const r = v.apr / 1200;
      const monthlyInterest = v.bal * r;

      if (v.pay <= monthlyInterest && r > 0) {
        return {
          headlineLabel: 'Time to be debt-free',
          headlineValue: 'Never paid off',
          rows: [
            ['Interest charged in month 1', formatMoney(monthlyInterest, cur, 2)],
            ['Your planned payment', formatMoney(v.pay, cur, 2)],
            ['Minimum to shrink balance', formatMoney(Math.ceil(monthlyInterest + 10), cur)],
          ],
          note: `Your payment does not cover the monthly interest. Pay more than ${formatMoney(
            monthlyInterest,
            cur,
            2
          )} a month or the balance grows.`,
        };
      }

      const n = nper(v.bal, v.apr, v.pay);
      const totalInterest = Math.max(0, v.pay * n - v.bal);
      const totalRepaid = v.bal + totalInterest;

      return {
        headlineLabel: 'Time to be debt-free',
        headlineValue: formatDuration(n),
        rows: [
          ['Total months', `${Math.ceil(n)} months`],
          ['Total interest paid', formatMoney(totalInterest, cur)],
          ['Total repaid', formatMoney(totalRepaid, cur)],
          ['First month interest', formatMoney(monthlyInterest, cur, 2)],
        ],
        segments: [
          { label: 'Original Balance', value: v.bal, color: 'lime' },
          { label: 'Interest Cost', value: totalInterest, color: 'orange' },
        ],
        note: 'Assumes no new spending on the card and a fixed monthly payment until cleared.',
      };
    },
    articleSections: [
      {
        heading: 'Why the minimum keeps you in debt',
        paragraphs: [
          'Card interest compounds at steep rates. Paying only the minimum covers mostly interest, so the balance barely moves. Fixing a higher monthly dollar amount — and never lowering it as your minimum drops — dramatically shortens your payoff timeline.',
        ],
      },
      {
        heading: 'Worked example',
        paragraphs: [
          'An $8,000 balance at 22% APR with $250 a month takes about 49 months — just over 4 years — and costs about $4,158 in interest. Raise the payment to $400 and it falls to about 26 months with roughly $2,065 interest. Same debt, half the cost.',
        ],
      },
      {
        heading: 'Two ways to attack multiple cards',
        paragraphs: [
          'With several cards, the avalanche method (highest APR first) costs the least total interest, while the snowball method (smallest balance first) gives quicker psychological wins. Both beat spreading small extra amounts randomly, as long as you stop adding new purchases.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Should I pay off credit cards or build savings first?',
        answer:
          'Most households keep a starter buffer for emergencies and then attack 20%+ APR card debt aggressively, because no safe savings account earns 22%.',
      },
      {
        question: 'Does a 0% balance transfer help?',
        answer:
          'Yes, if the transfer fee (typically 3% to 5%) is much smaller than the interest you would otherwise pay and you clear the balance before the promo rate ends.',
      },
    ],
  },
  {
    id: 10,
    slug: 'student-loan-repayment-calculator',
    tag: 'Education',
    filterCategory: ToolCategory.PersonalCar,
    color: TileColor.Lime,
    title: 'Student Loan Repayment Calculator',
    shortDescription:
      'Compare standard vs extended terms — payment, interest and true cost.',
    formulaText: 'Compares M_std (n = Standard Years × 12) vs M_ext (n = Extended Years × 12)',
    relatedGuideSlug: 'how-to-pay-off-a-loan-early',
    fields: [
      {
        key: 'bal',
        label: 'Loan balance',
        defaultValue: 35000,
        step: 500,
        min: 1000,
        max: 300000,
        unit: 'currency',
      },
      {
        key: 'rate',
        label: 'Interest rate (%)',
        defaultValue: 5.5,
        step: 0.05,
        min: 0.5,
        max: 16,
        unit: 'percent',
      },
      {
        key: 'std',
        label: 'Standard term (years)',
        defaultValue: 10,
        step: 1,
        min: 3,
        max: 20,
        unit: 'years',
      },
      {
        key: 'ext',
        label: 'Extended term (years)',
        defaultValue: 25,
        step: 1,
        min: 10,
        max: 30,
        unit: 'years',
      },
    ],
    calculate: (v, cur) => {
      const m1 = Math.max(1, v.std * 12);
      const m2 = Math.max(1, v.ext * 12);
      const p1 = pmt(v.bal, v.rate, m1);
      const p2 = pmt(v.bal, v.rate, m2);
      const i1 = Math.max(0, p1 * m1 - v.bal);
      const i2 = Math.max(0, p2 * m2 - v.bal);
      const extraInterest = Math.max(0, i2 - i1);

      return {
        headlineLabel: 'Standard monthly payment',
        headlineValue: formatMoney(p1, cur, 2),
        rows: [
          ['Standard term', `${v.std} years (${m1} mos)`],
          ['Standard total interest', formatMoney(i1, cur)],
          ['Extended monthly payment', formatMoney(p2, cur, 2)],
          ['Extended total interest', formatMoney(i2, cur)],
          ['Extra interest for going longer', formatMoney(extraInterest, cur)],
        ],
        segments: [
          { label: 'Principal', value: v.bal, color: 'lime' },
          { label: 'Standard Interest', value: i1, color: 'sky' },
          { label: 'Added Extended Interest', value: extraInterest, color: 'orange' },
        ],
        amortization: {
          principal: v.bal,
          annualRate: v.rate,
          months: m1,
        },
        note: 'Longer terms cut the monthly bill early in your career, but can double or triple total interest if you never pay extra.',
      };
    },
    articleSections: [
      {
        heading: 'Standard versus extended',
        paragraphs: [
          'Federal student loans typically default to a 10-year standard plan, while extended plans stretch up to 25 years. The longer plan can nearly halve your monthly payment — and more than double total interest. Seeing both options side by side makes the trade-off unmistakable.',
        ],
      },
      {
        heading: 'Worked example',
        paragraphs: [
          'A $35,000 loan at 5.5% costs about $380 a month over 10 years with roughly $10,581 total interest. Stretch it to 25 years and the payment drops to about $215, but total interest climbs to roughly $29,479 — nearly triple.',
        ],
      },
      {
        heading: 'When longer still makes sense',
        paragraphs: [
          'Choosing an extended plan for breathing room early in your career can be sensible if freed cash clears 22% credit card debt. Because student loans have no prepayment penalty, you can always enroll in the lower required payment and voluntarily pay the 10-year amount whenever your budget allows.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I make extra payments on an extended student loan plan?',
        answer:
          'Yes. Neither federal nor private student loans charge prepayment penalties. Instruct your servicer to apply extra payments directly to principal.',
      },
      {
        question: 'Should I refinance federal student loans into a private loan?',
        answer:
          'Be cautious: private refinancing permanently gives up federal income-driven repayment plans and forgiveness protections.',
      },
    ],
  },
  {
    id: 11,
    slug: 'refinance-break-even-calculator',
    tag: 'Home',
    filterCategory: ToolCategory.Home,
    color: TileColor.Orange,
    title: 'Refinance Break-Even Calculator',
    shortDescription:
      'How many months until refinancing pays for itself.',
    formulaText: 'Break-Even Months = Closing Costs / (Current Monthly Payment − New Monthly Payment)',
    relatedGuideSlug: 'should-you-refinance-mortgage',
    fields: [
      {
        key: 'bal',
        label: 'Remaining loan balance',
        defaultValue: 280000,
        step: 5000,
        min: 10000,
        max: 1500000,
        unit: 'currency',
      },
      {
        key: 'cur',
        label: 'Current rate (%)',
        defaultValue: 7.5,
        step: 0.05,
        min: 1,
        max: 15,
        unit: 'percent',
      },
      {
        key: 'rem',
        label: 'Years left on current loan',
        defaultValue: 25,
        step: 1,
        min: 1,
        max: 35,
        unit: 'years',
      },
      {
        key: 'nr',
        label: 'New rate (%)',
        defaultValue: 6.0,
        step: 0.05,
        min: 1,
        max: 15,
        unit: 'percent',
      },
      {
        key: 'nt',
        label: 'New loan term (years)',
        defaultValue: 30,
        step: 1,
        min: 5,
        max: 35,
        unit: 'years',
      },
      {
        key: 'close',
        label: 'Closing costs',
        defaultValue: 6000,
        step: 250,
        min: 0,
        max: 30000,
        unit: 'currency',
      },
    ],
    calculate: (v, cur) => {
      const m1 = Math.max(1, v.rem * 12);
      const m2 = Math.max(1, v.nt * 12);
      const p1 = pmt(v.bal, v.cur, m1);
      const p2 = pmt(v.bal, v.nr, m2);
      const monthlySaving = p1 - p2;
      const breakEven = monthlySaving > 0 ? v.close / monthlySaving : 0;
      const remTotalInterest = Math.max(0, p1 * m1 - v.bal);
      const newTotalInterest = Math.max(0, p2 * m2 - v.bal);

      let note = 'The new loan does not lower your monthly payment.';
      if (monthlySaving > 0) {
        if (breakEven > m1) {
          note = 'You would not recoup the closing costs before your current loan ends.';
        } else if (newTotalInterest + v.close > remTotalInterest) {
          note =
            'Monthly payment drops, but restarting a longer term increases total lifetime interest plus fees. Consider a shorter new term.';
        } else {
          note = 'If you sell or move before the break-even month, refinancing loses money.';
        }
      }

      return {
        headlineLabel: 'Months to break even',
        headlineValue:
          monthlySaving > 0
            ? `${Math.ceil(breakEven)} mos (${(breakEven / 12).toFixed(1)} yrs)`
            : 'No monthly saving',
        rows: [
          ['Current monthly payment', formatMoney(p1, cur, 2)],
          ['New monthly payment', formatMoney(p2, cur, 2)],
          ['Monthly cash-flow saving', formatMoney(Math.max(0, monthlySaving), cur, 2)],
          ['Closing costs', formatMoney(v.close, cur)],
          ['Remaining interest (current)', formatMoney(remTotalInterest, cur)],
          ['Total interest (new loan)', formatMoney(newTotalInterest, cur)],
        ],
        segments: [
          { label: 'New Principal', value: v.bal, color: 'lime' },
          { label: 'New Interest + Fees', value: newTotalInterest + v.close, color: 'orange' },
        ],
        amortization: {
          principal: v.bal,
          annualRate: v.nr,
          months: m2,
        },
        note,
      };
    },
    articleSections: [
      {
        heading: 'The break-even rule',
        paragraphs: [
          'Refinancing spends thousands in closing costs upfront to save hundreds each month. Divide closing costs by your monthly payment reduction: that is your break-even point. If you sell or move before that month arrives, refinancing loses money — even at an attractive rate.',
        ],
      },
      {
        heading: 'Worked example',
        paragraphs: [
          'A $280,000 balance at 7.5% with 25 years left costs about $2,069 a month. Refinancing to 6% over 30 years drops the payment to about $1,679 — a $390 monthly saving. With $6,000 closing costs, break-even takes about 16 months.',
        ],
      },
      {
        heading: 'Watch the term reset trap',
        paragraphs: [
          'Resetting a mortgage with 22 years left back to a fresh 30-year clock lowers your payment partly by stretching the debt over 8 extra years. Always check total remaining interest on both loans, or test a 20-year or 15-year new term.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Are "no-closing-cost" refinances really free?',
        answer:
          'No. Lenders either roll the closing costs into your loan balance or charge a slightly higher interest rate in exchange for lender credits.',
      },
      {
        question: 'How much rate drop makes refinancing worthwhile?',
        answer:
          'A drop of 0.75% to 1% or more often works well if you plan to keep the home well past the break-even mark.',
      },
    ],
  },
  {
    id: 0,
    slug: 'personal-loan-calculator',
    tag: 'Personal',
    filterCategory: ToolCategory.PersonalCar,
    color: TileColor.Blue,
    title: 'Personal Loan Calculator',
    shortDescription:
      'See your monthly payment and total interest before you apply.',
    formulaText: 'Payment = Amount × r / (1 − (1 + r)^−n), where r = APR / 1200 and n = months',
    relatedGuideSlug: 'how-personal-loans-work',
    fields: [
      {
        key: 'amt',
        label: 'Loan amount',
        defaultValue: 15000,
        step: 500,
        min: 500,
        max: 100000,
        unit: 'currency',
      },
      {
        key: 'apr',
        label: 'APR (%)',
        defaultValue: 10.5,
        step: 0.05,
        min: 1,
        max: 36,
        unit: 'percent',
      },
      {
        key: 'mo',
        label: 'Term (months)',
        defaultValue: 48,
        step: 1,
        min: 6,
        max: 120,
        unit: 'months',
      },
    ],
    calculate: (v, cur) => {
      const months = Math.max(1, v.mo);
      const p = pmt(v.amt, v.apr, months);
      const totalRepaid = p * months;
      const totalInterest = Math.max(0, totalRepaid - v.amt);
      const per100 = v.amt > 0 ? (totalInterest / v.amt) * 100 : 0;

      return {
        headlineLabel: 'Monthly payment',
        headlineValue: formatMoney(p, cur, 2),
        rows: [
          ['Total repaid', formatMoney(totalRepaid, cur)],
          ['Total interest', formatMoney(totalInterest, cur)],
          ['Amount borrowed', formatMoney(v.amt, cur)],
          [`Interest per ${cur}100 borrowed`, formatMoney(per100, cur, 2)],
        ],
        segments: [
          { label: 'Borrowed Principal', value: v.amt, color: 'lime' },
          { label: 'Total Interest', value: totalInterest, color: 'orange' },
        ],
        amortization: {
          principal: v.amt,
          annualRate: v.apr,
          months,
        },
      };
    },
    articleSections: [
      {
        heading: 'What it tells you',
        paragraphs: [
          'Enter how much you want to borrow, the APR and the number of months. You get the monthly payment, the total you will repay and the interest you will pay, which is the real price of the loan.',
        ],
      },
      {
        heading: 'How the payment is worked out',
        paragraphs: [
          'Fixed-rate loans use the standard amortisation formula: payment = amount × r / (1 − (1 + r)^−n). Here r is the APR divided by 12 and n is the number of monthly payments. Total interest is total payments made minus the amount borrowed.',
        ],
      },
      {
        heading: 'A worked example',
        paragraphs: [
          'Borrowing $15,000 at 10.5% APR over 48 months gives a payment of about $384 a month. You would repay roughly $18,434 in total, so the loan costs about $3,434 in interest. Stretch the same loan to 60 months and the payment drops, but total interest climbs.',
        ],
      },
      {
        heading: 'Using the result well',
        paragraphs: [
          'Compare the payment with your monthly budget first, then compare total interest across several lenders. A slightly higher payment over a shorter term usually saves the most money. If a lender charges an upfront origination fee, test it in our APR With Fees Calculator.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is this a loan offer?',
        answer:
          'No. It is an independent educational estimate. Lenders set their own rates, fees, and underwriting rules.',
      },
      {
        question: 'What is a good personal loan term?',
        answer:
          'Choose the shortest term whose monthly payment fits comfortably inside your budget with room to spare.',
      },
      {
        question: 'Does the loan have a fixed rate?',
        answer:
          'This calculator assumes a fixed rate for the full term. Variable-rate loans can change your monthly payment over time.',
      },
    ],
  },
  {
    id: 1,
    slug: 'auto-loan-calculator',
    tag: 'Car',
    filterCategory: ToolCategory.PersonalCar,
    color: TileColor.Lime,
    title: 'Auto Loan Calculator',
    shortDescription:
      'Estimate the real cost of a car loan, tax and down payment included.',
    formulaText:
      'Amount Financed = Vehicle Price × (1 + Sales Tax %) − Down Payment − Trade-In Value',
    relatedGuideSlug: 'car-loan-tips-to-save-money',
    fields: [
      {
        key: 'price',
        label: 'Vehicle price',
        defaultValue: 32000,
        step: 500,
        min: 2000,
        max: 150000,
        unit: 'currency',
      },
      {
        key: 'tax',
        label: 'Sales tax (%)',
        defaultValue: 6,
        step: 0.1,
        min: 0,
        max: 15,
        unit: 'percent',
      },
      {
        key: 'down',
        label: 'Down payment',
        defaultValue: 4000,
        step: 250,
        min: 0,
        max: 100000,
        unit: 'currency',
      },
      {
        key: 'trade',
        label: 'Trade-in value',
        defaultValue: 0,
        step: 250,
        min: 0,
        max: 80000,
        unit: 'currency',
      },
      {
        key: 'apr',
        label: 'APR (%)',
        defaultValue: 7,
        step: 0.05,
        min: 0,
        max: 28,
        unit: 'percent',
      },
      {
        key: 'mo',
        label: 'Term (months)',
        defaultValue: 60,
        step: 1,
        min: 12,
        max: 96,
        unit: 'months',
      },
    ],
    calculate: (v, cur) => {
      const salesTaxAmt = v.price * (v.tax / 100);
      const financed = Math.max(0, v.price + salesTaxAmt - v.down - v.trade);
      const months = Math.max(1, v.mo);
      const p = pmt(financed, v.apr, months);
      const totalPayments = p * months;
      const totalInterest = Math.max(0, totalPayments - financed);
      const totalOutOfPocket = totalPayments + v.down + v.trade;

      return {
        headlineLabel: 'Monthly payment',
        headlineValue: formatMoney(p, cur, 2),
        rows: [
          ['Amount financed', formatMoney(financed, cur)],
          ['Sales tax added', formatMoney(salesTaxAmt, cur)],
          ['Total interest', formatMoney(totalInterest, cur)],
          ['Total of loan payments', formatMoney(totalPayments, cur)],
          ['Full vehicle cost (incl. down & trade)', formatMoney(totalOutOfPocket, cur)],
        ],
        segments: [
          { label: 'Amount Financed', value: financed, color: 'lime' },
          { label: 'Loan Interest', value: totalInterest, color: 'orange' },
        ],
        amortization: {
          principal: financed,
          annualRate: v.apr,
          months,
        },
        note:
          months >= 72
            ? '72- and 84-month car loans keep payments lower, but sharply increase interest and the risk of owing more than the car is worth.'
            : undefined,
      };
    },
    articleSections: [
      {
        heading: 'Beyond the sticker price',
        paragraphs: [
          'A car loan is shaped by the vehicle price, sales tax, your down payment, any trade-in value, the APR and the term. Combining all six figures shows your true monthly payment and full ownership cost before you enter the finance office.',
        ],
      },
      {
        heading: 'Worked example',
        paragraphs: [
          'A $32,000 car with 6% sales tax and $4,000 down needs a loan of $29,920. At 7% APR over 60 months the payment is about $592 a month and total interest is roughly $5,630. Including the down payment, the car costs about $39,550 overall.',
        ],
      },
      {
        heading: 'Ways to pay less',
        paragraphs: [
          'Get pre-approved at a bank or credit union before visiting a dealership, negotiate the out-the-door car price rather than the monthly payment, keep terms to 48 or 60 months when possible, and skip overpriced add-ons.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How much down payment should I put on a car?',
        answer:
          'Putting 15% to 20% down helps cover initial depreciation so you do not end up upside-down on the loan.',
      },
      {
        question: 'Is 0% dealer financing always the best deal?',
        answer:
          'Not always. Sometimes 0% financing requires giving up a cash rebate. Compare both options using total cost.',
      },
    ],
  },
  {
    id: 2,
    slug: 'early-loan-payoff-calculator',
    tag: 'Savings',
    filterCategory: ToolCategory.DebtCredit,
    color: TileColor.White,
    title: 'Early Loan Payoff Calculator',
    shortDescription:
      'Find out how much interest extra payments could save.',
    formulaText:
      'Compares standard schedule vs accelerated payoff n_new = −ln(1 − B·r / (P + Extra)) / ln(1 + r)',
    relatedGuideSlug: 'how-to-pay-off-a-loan-early',
    fields: [
      {
        key: 'bal',
        label: 'Loan balance',
        defaultValue: 20000,
        step: 500,
        min: 500,
        max: 500000,
        unit: 'currency',
      },
      {
        key: 'apr',
        label: 'APR (%)',
        defaultValue: 8,
        step: 0.05,
        min: 0.5,
        max: 35,
        unit: 'percent',
      },
      {
        key: 'mo',
        label: 'Remaining term (months)',
        defaultValue: 60,
        step: 1,
        min: 6,
        max: 360,
        unit: 'months',
      },
      {
        key: 'ex',
        label: 'Extra payment each month',
        defaultValue: 100,
        step: 10,
        min: 0,
        max: 5000,
        unit: 'currency',
      },
    ],
    calculate: (v, cur) => {
      const months = Math.max(1, v.mo);
      const basePmt = pmt(v.bal, v.apr, months);
      const i0 = Math.max(0, basePmt * months - v.bal);
      const newMonths = nper(v.bal, v.apr, basePmt + v.ex);
      const i1 = Math.max(0, (basePmt + v.ex) * newMonths - v.bal);
      const savedInterest = Math.max(0, i0 - i1);
      const savedMonths = Math.max(0, months - Math.ceil(newMonths));

      return {
        headlineLabel: 'Interest you could save',
        headlineValue: formatMoney(savedInterest, cur),
        rows: [
          ['Regular monthly payment', formatMoney(basePmt, cur, 2)],
          ['New payment with extra', formatMoney(basePmt + v.ex, cur, 2)],
          ['New payoff time', formatDuration(newMonths)],
          ['Time saved', formatDuration(savedMonths)],
          ['Interest without extra', formatMoney(i0, cur)],
          ['Interest with extra', formatMoney(i1, cur)],
        ],
        segments: [
          { label: 'Remaining Interest', value: i1, color: 'orange' },
          { label: 'Interest Saved', value: savedInterest, color: 'lime' },
        ],
        amortization: {
          principal: v.bal,
          annualRate: v.apr,
          months,
          extraMonthly: v.ex,
        },
        note: 'Confirm your lender charges no prepayment penalty and applies extra amounts directly to principal.',
      };
    },
    articleSections: [
      {
        heading: 'Small extras add up',
        paragraphs: [
          'Every extra dollar sent to principal immediately stops generating interest for the rest of the loan. Even modest monthly top-ups shave months off your schedule and cut hundreds or thousands from your total interest bill.',
        ],
      },
      {
        heading: 'Worked example',
        paragraphs: [
          'On a $20,000 loan at 8% over 60 months, the regular payment is about $406 and total interest is roughly $4,332. Adding $100 a month clears the loan in about 46 months and cuts interest to roughly $3,292 — saving around $1,040 and 14 months.',
        ],
      },
      {
        heading: 'Before you pay extra',
        paragraphs: [
          'Verify two things with your lender: first, that there is no prepayment penalty; second, that extra payments reduce principal immediately rather than merely advancing next month’s due date.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does paying bi-weekly work the same way?',
        answer:
          'Paying half your monthly bill every two weeks results in 26 half-payments (13 full payments) a year — equivalent to adding one extra monthly payment annually.',
      },
      {
        question: 'Should I pay off a 4% loan early?',
        answer:
          'Always clear high-APR credit cards and keep an emergency fund first before accelerating a low-rate loan.',
      },
    ],
  },
  {
    id: 3,
    slug: 'debt-consolidation-calculator',
    tag: 'Debt',
    filterCategory: ToolCategory.DebtCredit,
    color: TileColor.Orange,
    title: 'Debt Consolidation Calculator',
    shortDescription:
      'Compare your current debts with one consolidation loan.',
    formulaText: 'Interest Saved = Current Remaining Interest − (New Loan Total Payments − Balance)',
    relatedGuideSlug: 'debt-consolidation-pros-and-cons',
    fields: [
      {
        key: 'bal',
        label: 'Total debt balance',
        defaultValue: 18000,
        step: 500,
        min: 500,
        max: 150000,
        unit: 'currency',
      },
      {
        key: 'apr',
        label: 'Current average APR (%)',
        defaultValue: 22,
        step: 0.1,
        min: 1,
        max: 39.9,
        unit: 'percent',
      },
      {
        key: 'pay',
        label: 'Current monthly payment',
        defaultValue: 450,
        step: 10,
        min: 25,
        max: 10000,
        unit: 'currency',
      },
      {
        key: 'na',
        label: 'New loan APR (%)',
        defaultValue: 11,
        step: 0.05,
        min: 1,
        max: 35,
        unit: 'percent',
      },
      {
        key: 'nm',
        label: 'New loan term (months)',
        defaultValue: 48,
        step: 1,
        min: 6,
        max: 120,
        unit: 'months',
      },
      {
        key: 'fee',
        label: 'Origination fee (%)',
        defaultValue: 0,
        step: 0.5,
        min: 0,
        max: 10,
        unit: 'percent',
      },
    ],
    calculate: (v, cur) => {
      const r = v.apr / 1200;
      const monthlyInterestNow = v.bal * r;
      const newLoanAmt = v.bal * (1 + v.fee / 100);
      const newMonths = Math.max(1, v.nm);
      const p2 = pmt(newLoanAmt, v.na, newMonths);
      const c2 = Math.max(0, p2 * newMonths - v.bal);

      if (v.pay <= monthlyInterestNow && r > 0) {
        return {
          headlineLabel: 'Current path status',
          headlineValue: 'Never paid off',
          rows: [
            ['Interest each month now', formatMoney(monthlyInterestNow, cur, 2)],
            ['New loan monthly payment', formatMoney(p2, cur, 2)],
            ['New loan cost above balance', formatMoney(c2, cur)],
          ],
          amortization: {
            principal: newLoanAmt,
            annualRate: v.na,
            months: newMonths,
          },
          note: 'Your current payment does not cover monthly interest, so consolidating at a lower fixed rate prevents the debt from growing.',
        };
      }

      const n1 = nper(v.bal, v.apr, v.pay);
      const c1 = Math.max(0, v.pay * n1 - v.bal);
      const diff = c1 - c2;

      return {
        headlineLabel: diff >= 0 ? 'Estimated interest saved' : 'Extra cost of new loan',
        headlineValue: formatMoney(Math.abs(diff), cur),
        rows: [
          ['Current payoff time', formatDuration(n1)],
          ['Current interest cost', formatMoney(c1, cur)],
          ['New monthly payment', formatMoney(p2, cur, 2)],
          ['New payoff time', formatDuration(newMonths)],
          ['New loan cost (incl. fee)', formatMoney(c2, cur)],
        ],
        segments: [
          { label: 'New Loan Cost', value: c2, color: 'orange' },
          ...(diff > 0 ? [{ label: 'Savings vs Current', value: diff, color: 'lime' as const }] : []),
        ],
        amortization: {
          principal: newLoanAmt,
          annualRate: v.na,
          months: newMonths,
        },
        note:
          diff < 0
            ? 'Warning: The new loan costs more overall due to fees or a longer term.'
            : 'Consolidation only works if paid-off credit cards are not run back up again.',
      };
    },
    articleSections: [
      {
        heading: 'Is consolidating worth it?',
        paragraphs: [
          'Consolidation replaces multiple high-rate balances with a single fixed-rate installment loan. It saves money only when the total interest plus any origination fee is lower than your current path.',
        ],
      },
      {
        heading: 'Worked example',
        paragraphs: [
          'Take $18,000 of card debt at 22% APR paid at $450 a month: it takes about 73 months and costs roughly $14,740 in interest. A 48-month consolidation loan at 11% APR with no fee costs about $465 a month and $4,330 in interest — saving roughly $10,400.',
        ],
      },
      {
        heading: 'What to watch',
        paragraphs: [
          'Include origination fees in your calculation, keep the repayment term reasonably short, and remove saved cards from online checkouts so cleared credit lines do not turn into double debt.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does debt consolidation hurt my credit score?',
        answer:
          'A hard inquiry may dip your score by a few points briefly, but paying down revolving card utilization often helps your score recover and rise.',
      },
      {
        question: 'What origination fee is normal?',
        answer:
          'Many top credit unions and online lenders charge 0%, while others charge 1% to 8%. Always include the fee before signing.',
      },
    ],
  },
  {
    id: 4,
    slug: 'loan-affordability-calculator',
    tag: 'Budget',
    filterCategory: ToolCategory.BudgetCompare,
    color: TileColor.Blue,
    title: 'Loan Affordability Calculator',
    shortDescription:
      'Turn the monthly payment you can afford into a loan amount.',
    formulaText: 'Max Loan = Payment × (1 − (1 + r)^−n) / r, where r = APR / 1200',
    relatedGuideSlug: 'what-is-debt-to-income-ratio',
    fields: [
      {
        key: 'pay',
        label: 'Monthly payment you can afford',
        defaultValue: 400,
        step: 10,
        min: 25,
        max: 10000,
        unit: 'currency',
      },
      {
        key: 'apr',
        label: 'APR (%)',
        defaultValue: 9,
        step: 0.05,
        min: 0.5,
        max: 36,
        unit: 'percent',
      },
      {
        key: 'mo',
        label: 'Term (months)',
        defaultValue: 60,
        step: 1,
        min: 6,
        max: 120,
        unit: 'months',
      },
    ],
    calculate: (v, cur) => {
      const months = Math.max(1, v.mo);
      const r = v.apr / 1200;
      const maxLoan = r > 0 ? (v.pay * (1 - Math.pow(1 + r, -months))) / r : v.pay * months;
      const totalRepaid = v.pay * months;
      const totalInterest = Math.max(0, totalRepaid - maxLoan);

      return {
        headlineLabel: 'Loan you can afford',
        headlineValue: formatMoney(maxLoan, cur),
        rows: [
          ['Total you would repay', formatMoney(totalRepaid, cur)],
          ['Total interest cost', formatMoney(totalInterest, cur)],
          ['Planned monthly payment', formatMoney(v.pay, cur, 2)],
        ],
        segments: [
          { label: 'Borrowing Power', value: maxLoan, color: 'lime' },
          { label: 'Interest Portion', value: totalInterest, color: 'orange' },
        ],
        amortization: {
          principal: maxLoan,
          annualRate: v.apr,
          months,
        },
      };
    },
    articleSections: [
      {
        heading: 'Start from your budget',
        paragraphs: [
          'Instead of asking what a lender will approve, start with the monthly figure your household budget can comfortably spare. Working backward reveals your safe borrowing ceiling.',
        ],
      },
      {
        heading: 'Worked example',
        paragraphs: [
          'A $400 monthly payment at 9% APR over 60 months supports a loan of about $19,270, with $4,730 going to interest over five years.',
        ],
      },
      {
        heading: 'Pair with your DTI ratio',
        paragraphs: [
          'Even if a payment feels manageable, lenders check your overall debt-to-income (DTI) ratio. Test your chosen payment inside our Debt-to-Income Ratio Calculator next.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why does a longer term raise the loan amount?',
        answer:
          'Spreading the same monthly payment over more months supports a larger upfront balance, though a bigger share goes to interest.',
      },
    ],
  },
  {
    id: 5,
    slug: 'apr-with-fees-calculator',
    tag: 'True cost',
    filterCategory: ToolCategory.BudgetCompare,
    color: TileColor.Lime,
    title: 'APR With Fees Calculator',
    shortDescription:
      'Reveal the true APR once an origination fee is included.',
    formulaText:
      'Solves for Effective APR where Present Value of Monthly Payments equals Net Cash Received',
    relatedGuideSlug: 'apr-vs-interest-rate-explained',
    fields: [
      {
        key: 'amt',
        label: 'Loan amount',
        defaultValue: 10000,
        step: 500,
        min: 500,
        max: 100000,
        unit: 'currency',
      },
      {
        key: 'rate',
        label: 'Stated interest rate (%)',
        defaultValue: 6,
        step: 0.05,
        min: 0.5,
        max: 35,
        unit: 'percent',
      },
      {
        key: 'mo',
        label: 'Term (months)',
        defaultValue: 36,
        step: 1,
        min: 6,
        max: 120,
        unit: 'months',
      },
      {
        key: 'fee',
        label: 'Origination fee (%)',
        defaultValue: 5,
        step: 0.25,
        min: 0,
        max: 12,
        unit: 'percent',
      },
    ],
    calculate: (v, cur) => {
      const months = Math.max(1, v.mo);
      const monthlyPmt = pmt(v.amt, v.rate, months);
      const feeCash = v.amt * (v.fee / 100);
      const cashReceived = Math.max(0, v.amt - feeCash);
      const effApr = solveEffectiveApr(v.amt, v.rate, months, v.fee);
      const totalRepaid = monthlyPmt * months;
      const totalCost = Math.max(0, totalRepaid - cashReceived);

      return {
        headlineLabel: 'Effective APR',
        headlineValue: `${effApr.toFixed(2)}%`,
        rows: [
          ['Stated interest rate', `${v.rate.toFixed(2)}%`],
          ['Cash you actually receive', formatMoney(cashReceived, cur)],
          ['Origination fee deducted', formatMoney(feeCash, cur)],
          ['Monthly payment', formatMoney(monthlyPmt, cur, 2)],
          ['Total repaid', formatMoney(totalRepaid, cur)],
          ['Fee plus interest cost', formatMoney(totalCost, cur)],
        ],
        segments: [
          { label: 'Net Cash Received', value: cashReceived, color: 'lime' },
          { label: 'Interest + Fee', value: totalCost, color: 'orange' },
        ],
        amortization: {
          principal: v.amt,
          annualRate: v.rate,
          months,
        },
        note:
          v.fee > 0
            ? `A ${v.fee}% upfront fee adds ${(effApr - v.rate).toFixed(
                2
              )} percentage points to your real borrowing rate.`
            : 'With 0% origination fees, your effective APR matches the stated interest rate.',
      };
    },
    articleSections: [
      {
        heading: 'Why the advertised rate is not the whole story',
        paragraphs: [
          'Many personal loans deduct an origination fee from the cash sent to your bank account while still charging interest on the full face amount. That makes your real cost meaningfully higher than the headline rate.',
        ],
      },
      {
        heading: 'Worked example',
        paragraphs: [
          'Borrow $10,000 over 36 months at a 6% interest rate with a 5% origination fee. You receive $9,500 in cash, yet repay about $304.22 a month ($10,952 total). Your effective APR jumps to 9.51%.',
        ],
      },
      {
        heading: 'Why shorter terms amplify fees',
        paragraphs: [
          'Because an upfront fee is paid on day one, spreading a 5% fee over 12 or 24 months pushes the APR much higher than spreading the same fee over 60 months.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Are lenders required to show APR?',
        answer:
          'In the US, UK, EU, Canada, and Australia, regulated consumer lenders must disclose APR including mandatory upfront fees.',
      },
    ],
  },
  {
    id: 6,
    slug: 'debt-to-income-calculator',
    tag: 'Eligibility',
    filterCategory: ToolCategory.BudgetCompare,
    color: TileColor.Orange,
    title: 'Debt-to-Income Ratio Calculator',
    shortDescription:
      'Check how a new loan would change your DTI ratio.',
    formulaText:
      'DTI (%) = ((Current Monthly Debts + New Loan Payment) / Gross Monthly Income) × 100',
    relatedGuideSlug: 'what-is-debt-to-income-ratio',
    fields: [
      {
        key: 'inc',
        label: 'Gross monthly income',
        defaultValue: 5000,
        step: 100,
        min: 500,
        max: 50000,
        unit: 'currency',
      },
      {
        key: 'debt',
        label: 'Current monthly debt payments',
        defaultValue: 1200,
        step: 25,
        min: 0,
        max: 25000,
        unit: 'currency',
      },
      {
        key: 'np',
        label: 'New loan payment',
        defaultValue: 400,
        step: 10,
        min: 0,
        max: 10000,
        unit: 'currency',
      },
    ],
    calculate: (v, cur) => {
      const dtiNow = v.inc > 0 ? (v.debt / v.inc) * 100 : 0;
      const totalDebtAfter = v.debt + v.np;
      const dtiAfter = v.inc > 0 ? (totalDebtAfter / v.inc) * 100 : 0;
      const remainingIncome = Math.max(0, v.inc - totalDebtAfter);

      let note = 'Comfortably within the <=36% range preferred by most mainstream lenders.';
      if (dtiAfter > 43) {
        note = 'Above 43% — higher than the threshold many mortgage and personal loan lenders accept.';
      } else if (dtiAfter > 36) {
        note = 'Between 36% and 43% — workable with strong credit, though above the 36% guideline many lenders prefer.';
      }

      return {
        headlineLabel: 'DTI after the new loan',
        headlineValue: `${dtiAfter.toFixed(1)}%`,
        rows: [
          ['DTI today', `${dtiNow.toFixed(1)}%`],
          ['Total monthly debt after', formatMoney(totalDebtAfter, cur)],
          ['Gross income remaining', formatMoney(remainingIncome, cur)],
        ],
        segments: [
          { label: 'Existing Debt', value: v.debt, color: 'orange' },
          { label: 'New Payment', value: v.np, color: 'sky' },
          { label: 'Remaining Gross Income', value: remainingIncome, color: 'lime' },
        ],
        note,
      };
    },
    articleSections: [
      {
        heading: 'What DTI means',
        paragraphs: [
          'Your debt-to-income ratio measures the percentage of your before-tax monthly income already committed to recurring debt obligations such as rent or mortgage, car loans, student loans, and minimum credit card payments.',
        ],
      },
      {
        heading: 'Worked example',
        paragraphs: [
          'With $5,000 gross monthly income and $1,200 in existing debt payments, your current DTI is 24.0%. Adding a $400 personal loan payment brings total monthly debt to $1,600, or 32.0% DTI.',
        ],
      },
      {
        heading: 'Common lender benchmarks',
        paragraphs: [
          'Under 36% is widely viewed as healthy; 36% to 43% is manageable with solid credit reserves; above 43% narrows lender choices and often leads to higher quoted rates.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do groceries, utilities, or car insurance count in DTI?',
        answer:
          'No. Lenders include contractual debt obligations, rent/mortgage, alimony, and credit report minimums — not everyday living expenses.',
      },
      {
        question: 'Do lenders use gross or take-home pay?',
        answer:
          'Lenders calculate DTI from gross (pre-tax) income, though you should always build your personal budget from net take-home pay.',
      },
    ],
  },
  {
    id: 7,
    slug: 'loan-comparison-calculator',
    tag: 'Compare',
    filterCategory: ToolCategory.BudgetCompare,
    color: TileColor.White,
    title: 'Loan Comparison Calculator',
    shortDescription:
      'Put two loan offers side by side and see which costs less.',
    formulaText: 'Total Cost = (Monthly Payment × Months) + (Loan Amount × Origination Fee %)',
    relatedGuideSlug: 'how-to-compare-loan-offers',
    fields: [
      {
        key: 'amt',
        label: 'Loan amount (both offers)',
        defaultValue: 12000,
        step: 500,
        min: 500,
        max: 250000,
        unit: 'currency',
      },
      {
        key: 'aa',
        label: 'Offer A: APR (%)',
        defaultValue: 9,
        step: 0.05,
        min: 0.5,
        max: 36,
        unit: 'percent',
      },
      {
        key: 'am',
        label: 'Offer A: Term (months)',
        defaultValue: 36,
        step: 1,
        min: 6,
        max: 120,
        unit: 'months',
      },
      {
        key: 'af',
        label: 'Offer A: Fee (%)',
        defaultValue: 0,
        step: 0.25,
        min: 0,
        max: 10,
        unit: 'percent',
      },
      {
        key: 'ba',
        label: 'Offer B: APR (%)',
        defaultValue: 7.5,
        step: 0.05,
        min: 0.5,
        max: 36,
        unit: 'percent',
      },
      {
        key: 'bm',
        label: 'Offer B: Term (months)',
        defaultValue: 60,
        step: 1,
        min: 6,
        max: 120,
        unit: 'months',
      },
      {
        key: 'bf',
        label: 'Offer B: Fee (%)',
        defaultValue: 3,
        step: 0.25,
        min: 0,
        max: 10,
        unit: 'percent',
      },
    ],
    calculate: (v, cur) => {
      const am = Math.max(1, v.am);
      const bm = Math.max(1, v.bm);
      const pa = pmt(v.amt, v.aa, am);
      const pb = pmt(v.amt, v.ba, bm);
      const fa = (v.amt * v.af) / 100;
      const fb = (v.amt * v.bf) / 100;
      const ta = pa * am + fa;
      const tb = pb * bm + fb;
      const diff = Math.abs(ta - tb);
      const cheaper = ta === tb ? 'Same total cost' : `Cheaper overall: Offer ${ta < tb ? 'A' : 'B'}`;

      const mismatch =
        ta !== tb && (ta < tb) !== (pa < pb)
          ? 'Notice: The cheaper loan overall has the higher monthly payment because it clears the debt sooner.'
          : undefined;

      return {
        headlineLabel: cheaper,
        headlineValue: ta === tb ? formatMoney(0, cur) : `Saves ${formatMoney(diff, cur)}`,
        rows: [
          ['Offer A monthly payment', formatMoney(pa, cur, 2)],
          ['Offer A total cost (incl. fee)', formatMoney(ta, cur)],
          ['Offer B monthly payment', formatMoney(pb, cur, 2)],
          ['Offer B total cost (incl. fee)', formatMoney(tb, cur)],
        ],
        segments: [
          { label: 'Offer A Total Cost', value: ta, color: 'lime' },
          { label: 'Offer B Total Cost', value: tb, color: 'orange' },
        ],
        note: mismatch,
      };
    },
    articleSections: [
      {
        heading: 'Compare like with like',
        paragraphs: [
          'Lenders structure offers with different combinations of rate, term length, and upfront fees. Comparing monthly payments alone hides thousands in extra cost.',
        ],
      },
      {
        heading: 'Worked example',
        paragraphs: [
          'Offer A is $12,000 at 9% over 36 months with 0% fee ($381.60/mo, $13,738 total). Offer B is $12,000 at 7.5% over 60 months with a 3% fee ($240.46/mo, $14,787 total). Offer B feels $141 lighter each month, yet costs $1,050 more overall.',
        ],
      },
      {
        heading: 'How to choose',
        paragraphs: [
          'Pick the offer with the lowest total cost whose monthly payment still fits comfortably inside your monthly budget.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does shopping multiple lenders hurt my credit score?',
        answer:
          'Soft-pull prequalification does not affect your score, and credit scoring models group multiple auto or mortgage hard inquiries within a 14-to-45-day window as a single shopping event.',
      },
    ],
  },
];

export function getCalculatorBySlug(slug: string): CalculatorConfig | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}
