export type CurrencySymbol = '$' | '£' | '€' | 'C$' | 'A$' | 'Rs ';

export enum TileColor {
  Blue = 'b',
  White = 'w',
  Lime = 'l',
  Orange = 'o',
}

export enum ToolCategory {
  All = 'All',
  Home = 'Home',
  PersonalCar = 'Personal & Car',
  DebtCredit = 'Debt & Credit',
  BudgetCompare = 'Budget & Compare',
}

export interface CalculatorField {
  key: string;
  label: string;
  defaultValue: number;
  step: number;
  min: number;
  max: number;
  unit?: 'currency' | 'percent' | 'months' | 'years';
  helper?: string;
}

export interface BreakdownSegment {
  label: string;
  value: number;
  color: 'lime' | 'orange' | 'white' | 'sky';
}

export interface AmortizationParams {
  principal: number;
  annualRate: number;
  months: number;
  extraMonthly?: number;
}

export interface CalculatorOutput {
  headlineLabel: string;
  headlineValue: string;
  rows: Array<[string, string]>;
  note?: string;
  segments?: BreakdownSegment[];
  amortization?: AmortizationParams;
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CalculatorConfig {
  id: number;
  slug: string;
  tag: string;
  filterCategory: ToolCategory;
  color: TileColor;
  title: string;
  shortDescription: string;
  formulaText: string;
  fields: CalculatorField[];
  calculate: (values: Record<string, number>, currency: CurrencySymbol) => CalculatorOutput;
  articleSections: ArticleSection[];
  faqs: FAQItem[];
  relatedGuideSlug: string;
}

export interface GuideArticle {
  slug: string;
  category: string;
  title: string;
  summary: string;
  readTime: string;
  updatedDate: string;
  standfirst: string;
  linkedCalculatorSlug: string;
  linkedCalculatorTitle: string;
  sections: ArticleSection[];
  keyTakeaways: string[];
}

export interface StaticPageContent {
  slug: string;
  title: string;
  lead: string;
  sections: ArticleSection[];
  showAuthorBadge?: boolean;
}

export interface AmortizationRow {
  period: number;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  endingBalance: number;
  cumulativeInterest: number;
}

export type RouteView =
  | { page: 'home' }
  | { page: 'tools' }
  | { page: 'calculator'; slug: string; preset?: Record<string, number> }
  | { page: 'blog' }
  | { page: 'guide'; slug: string }
  | { page: 'about' }
  | { page: 'editorial-policy' }
  | { page: 'contact' }
  | { page: 'privacy-policy' }
  | { page: 'terms' }
  | { page: 'disclaimer' };
