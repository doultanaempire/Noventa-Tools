import { AmortizationParams, AmortizationRow, CurrencySymbol } from '../types';

export const CURRENCIES: Array<{ symbol: CurrencySymbol; label: string }> = [
  { symbol: '$', label: '$ (USD)' },
  { symbol: '£', label: '£ (GBP)' },
  { symbol: '€', label: '€ (EUR)' },
  { symbol: 'C$', label: 'C$ (CAD)' },
  { symbol: 'A$', label: 'A$ (AUD)' },
  { symbol: 'Rs ', label: 'Rs (PKR)' },
];

export function formatMoney(
  amount: number,
  currency: CurrencySymbol,
  decimals = 0
): string {
  if (!Number.isFinite(amount)) return '-';
  const sign = amount < 0 ? '-' : '';
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${sign}${currency}${formatted}`;
}

export function pmt(loanAmount: number, aprPercent: number, months: number): number {
  if (months <= 0 || loanAmount <= 0) return 0;
  const r = aprPercent / 1200;
  if (r === 0) return loanAmount / months;
  return (loanAmount * r) / (1 - Math.pow(1 + r, -months));
}

export function nper(balance: number, aprPercent: number, monthlyPayment: number): number {
  if (balance <= 0 || monthlyPayment <= 0) return 0;
  const r = aprPercent / 1200;
  if (r === 0) return balance / monthlyPayment;
  if (monthlyPayment <= balance * r) return Infinity;
  return -Math.log(1 - (balance * r) / monthlyPayment) / Math.log(1 + r);
}

export function formatDuration(monthsRaw: number): string {
  if (!Number.isFinite(monthsRaw) || monthsRaw <= 0) return '0 mo';
  const totalMonths = Math.ceil(monthsRaw);
  const years = Math.floor(totalMonths / 12);
  const remMonths = totalMonths % 12;
  const yrPart = years > 0 ? `${years} yr${years > 1 ? 's' : ''}` : '';
  const moPart = remMonths > 0 ? `${remMonths} mo` : '';
  if (yrPart && moPart) return `${yrPart} ${moPart}`;
  return yrPart || moPart || '0 mo';
}

export function solveEffectiveApr(
  amount: number,
  statedRatePercent: number,
  months: number,
  feePercent: number
): number {
  if (amount <= 0 || months <= 0) return 0;
  const monthlyPmt = pmt(amount, statedRatePercent, months);
  const cashReceived = amount * (1 - Math.min(99, Math.max(0, feePercent)) / 100);
  if (cashReceived <= 0) return 0;

  let lo = 0;
  let hi = 250;
  let mid = 0;
  for (let i = 0; i < 120; i++) {
    mid = (lo + hi) / 2;
    const r = mid / 1200;
    const pv = r > 0 ? (monthlyPmt * (1 - Math.pow(1 + r, -months))) / r : monthlyPmt * months;
    if (pv > cashReceived) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return mid;
}

export function generateAmortizationSchedule(params: AmortizationParams): AmortizationRow[] {
  const { principal, annualRate, months, extraMonthly = 0 } = params;
  if (principal <= 0 || months <= 0) return [];

  const basePayment = pmt(principal, annualRate, months);
  const scheduledPayment = basePayment + Math.max(0, extraMonthly);
  const monthlyRate = annualRate / 1200;

  const rows: AmortizationRow[] = [];
  let balance = principal;
  let cumulativeInterest = 0;
  const maxMonths = Math.min(600, Math.ceil(months) + 12);

  for (let m = 1; m <= maxMonths && balance > 0.005; m++) {
    const interestPaid = balance * monthlyRate;
    let payment = scheduledPayment;
    let principalPaid = payment - interestPaid;

    if (principalPaid <= 0) {
      break;
    }

    if (principalPaid >= balance) {
      principalPaid = balance;
      payment = principalPaid + interestPaid;
      balance = 0;
    } else {
      balance -= principalPaid;
    }

    cumulativeInterest += interestPaid;

    rows.push({
      period: m,
      payment,
      principalPaid,
      interestPaid,
      endingBalance: Math.max(0, balance),
      cumulativeInterest,
    });
  }

  return rows;
}

export function aggregateYearlySchedule(monthlyRows: AmortizationRow[]): AmortizationRow[] {
  const years: AmortizationRow[] = [];
  for (let i = 0; i < monthlyRows.length; i += 12) {
    const slice = monthlyRows.slice(i, i + 12);
    const yrNum = Math.floor(i / 12) + 1;
    const payment = slice.reduce((acc, r) => acc + r.payment, 0);
    const principalPaid = slice.reduce((acc, r) => acc + r.principalPaid, 0);
    const interestPaid = slice.reduce((acc, r) => acc + r.interestPaid, 0);
    const last = slice[slice.length - 1];
    years.push({
      period: yrNum,
      payment,
      principalPaid,
      interestPaid,
      endingBalance: last.endingBalance,
      cumulativeInterest: last.cumulativeInterest,
    });
  }
  return years;
}

export function exportScheduleCsv(
  rows: AmortizationRow[],
  mode: 'monthly' | 'yearly',
  toolSlug: string
): void {
  const periodHeader = mode === 'yearly' ? 'Year' : 'Month';
  const header = [
    periodHeader,
    'Payment',
    'Principal Paid',
    'Interest Paid',
    'Cumulative Interest',
    'Ending Balance',
  ].join(',');

  const lines = rows.map((r) =>
    [
      r.period,
      r.payment.toFixed(2),
      r.principalPaid.toFixed(2),
      r.interestPaid.toFixed(2),
      r.cumulativeInterest.toFixed(2),
      r.endingBalance.toFixed(2),
    ].join(',')
  );

  const csvContent = [header, ...lines].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${toolSlug}-${mode}-schedule.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
