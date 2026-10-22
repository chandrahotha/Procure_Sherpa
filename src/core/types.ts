/* ==========================================================
   Procurement 360 — Core Type Definitions
   The PS namespace: a typed contract for the entire runtime.
   Every module augments this interface.
   ========================================================== */

export interface PSGlobal {
  // App identity
  APP: string;
  VERSION: string;
  SCHEMA: number;
  BUILD: string;
  NS: string;
  MAX_SAVED: number;
  MAX_QUOTE_SAVED: number;
  AUDIT_MAX: number;

  // DOM helpers
  $<T extends Element = Element>(selector: string, root?: ParentNode): T | null;
  $$<T extends Element = Element>(selector: string, root?: ParentNode): T[];

  // Text safety
  esc(v: unknown): string;
  clean(v: unknown, max?: number): string;
  escAttr(v: unknown): string;

  // Numbers
  num(v: unknown): number;
  isNum(v: unknown): boolean;
  clamp(n: number, lo: number, hi: number): number;
  round(n: number, d?: number): number;

  // Formatting
  CURRENCIES: Array<{ c: string; s: string }>;
  curSymbol(code: string): string;
  group(n: number, d?: number): string;
  fmt(n: number, d?: number): string;
  money(n: number, d?: number): string;
  moneyR(n: number): string;
  pct(n: number, d?: number): string;
  qty(n: number): string;
  ratio(n: number): string;
  dateStr(d?: Date | string): string;
  dateTime(d?: Date | string): string;
  timeStr(d?: Date | string): string;
  iso(d?: Date | string): string;
  uid(prefix?: string): string;
  debounce<A extends unknown[]>(fn: (...args: A) => void, ms?: number): (...args: A) => void;

  // Preferences
  prefs(): PSPreferences;
  setPrefs(p: Partial<PSPreferences>): void;

  // Storage
  K: Record<string, string>;
  LEGACY: string[];
  _mem: Record<string, string>;
  storageOK: boolean;
  store: {
    get<T>(key: string, fallback: T): T;
    set(key: string, value: unknown): boolean;
    remove(key: string): void;
    rawKeys(): string[];
    bytes(): number;
  };
  warnOnce(tag: string, msg: string): void;

  // Toast
  toast(msg: string, kind?: 'ok' | 'danger' | 'info'): void;

  // Audit
  audit(event: string, detail?: string): void;

  // UI helpers
  byId(id: string): HTMLElement | null;
  alert(kind: string, title: string, msg: string): void;

  // Router
  route(path: string, params?: Record<string, string>): void;
  currentRoute(): string;

  // Academy
  ACADEMY_FUNCTIONS: PSAcademyFunction[];
  academyProgress(): Record<string, unknown>;

  // Calculators
  CALC: PSCalcDef[];
  calcImpl: Record<string, (v: Record<string, unknown>) => PSCalcResult>;
  runCalc(id: string, values: Record<string, unknown>): PSCalcResult | null;
  calcPageInit(calc: PSCalcDef, params?: Record<string, string>): void;

  // Registry
  _registry: Record<string, unknown[]>;
  register(type: string, item: unknown): void;
  byType(type: string): unknown[];

  // Search
  search(query: string, types?: string[]): PSSearchResult[];

  // Charts
  chart: Record<string, unknown>;

  // i18n
  i18n: Record<string, string>;
  t(key: string): string;
}

export interface PSPreferences {
  currency: string;
  decimals: number;
  dateFormat: 'iso' | 'us' | 'eu';
  theme: 'light';
}

export interface PSAcademyFunction {
  id: string;
  slug: string;
  title: string;
  module: string;
  stage: string;
  summary: string;
  minutes: number;
  difficulty: 'foundation' | 'intermediate' | 'advanced';
  concepts: string[];
  sops: string[];
  checklists: string[];
  calcs: string[];
  templates: string[];
  quiz: PSAcademyQuiz | null;
  lab: PSAcademyLab | null;
  questionBank: PSAcademyQuestion[];
  status: 'published' | 'draft';
  rel: Record<string, string[]>;
}

export interface PSAcademyQuiz {
  passPct: number;
  timeLimitMin: number;
  questions: PSAcademyQuestion[];
}

export interface PSAcademyQuestion {
  q: string;
  options: string[];
  answer: number;
  why: string;
  concept: string;
}

export interface PSAcademyLab {
  title: string;
  scenario: string;
  mission: string[];
  inputs: Record<string, number>;
  checks: Array<{ label: string; expr: string; hint: string }>;
}

export interface PSCalcDef {
  id: string;
  title: string;
  cat: string;
  tags: string[];
  purpose: string;
  desc: string;
  disclaimerKind?: string;
  assumptions?: string[];
  formula?: string[];
  groups?: string[];
  fields: PSCalcField[];
  example?: Record<string, unknown>;
  handoffTo?: string[];
  rel?: Record<string, string[]>;
  run: (v: Record<string, unknown>) => PSCalcResult;
}

export interface PSCalcField {
  k: string;
  label: string;
  type: 'curr' | 'num' | 'pct' | 'sel' | 'txt' | 'check' | 'date';
  opts?: string;
  def?: string;
  req?: boolean;
  min?: number;
  max?: number;
  unit?: string;
  hint?: string;
  rateRef?: string;
}

export interface PSCalcResult {
  r: Array<{ label: string; value: string; note: string; pp?: boolean }>;
  t?: {
    headers: string[];
    numCols?: number;
    rows: Array<{ cells: string[] }>;
    footer?: string[];
  };
  a: string;
  f?: string[];
  as?: string[];
  w?: string[];
  k?: string[];
  s: string;
  d: Record<string, number>;
}

export interface PSSearchResult {
  type: string;
  title: string;
  desc: string;
  href: string;
  score: number;
}

export interface PSSavedItem {
  id: string;
  type: string;
  title: string;
  data: unknown;
  ts: number;
}

declare global {
  interface Window {
    PS: PSGlobal;
  }
}
