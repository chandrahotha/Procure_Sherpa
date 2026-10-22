/* ==========================================================
   Procurement 360 — Storage & Preferences
   Local-first: everything the user enters stays in their browser.
   ========================================================== */
import { PS } from './ps.ts';
import type { PSPreferences } from './types.ts';

/* Storage keys */
PS.K = {
  prefs: 'ps_prefs',
  saved: 'ps_saved_work',
  fav: 'ps_favorites',
  recent: 'ps_recent',
  cl: 'ps_checklists',
  tpl: 'ps_templates',
  audit: 'ps_audit',
  schema: 'ps_schema_version',
  nav: 'ps_nav_state',
  draft: 'ps_draft',
  maturity: 'ps_maturity',
  exams: 'ps_exams',
  spend: 'ps_spend_model',
  copilot: 'ps_copilot',
  docpacks: 'ps_docpacks',
  rates: 'ps_rates'
};
/* legacy v1.1.0 keys inspected for migration */
PS.LEGACY = ['ps_saved', 'ps_savedQuotes', 'ps_savedCalculations', 'ps_calculations',
  'ps_quoteComparison', 'ps_savedComparisons', 'ps_settings', 'ps_preferences', 'ps_savedChecklists'];

PS._mem = {};
PS.storageOK = (function () {
  try {
    var k = PS.NS + '__test';
    var store = (globalThis as any).localStorage;
    if (!store) return false;
    store.setItem(k, '1');
    store.removeItem(k);
    return true;
  } catch (e) { return false; }
})();

PS.store = {
  get: function <T>(key: string, fallback: T): T {
    try {
      var raw = PS.storageOK ? window.localStorage.getItem(key) : PS._mem[key];
      if (raw === null || raw === undefined) return fallback;
      var v = JSON.parse(raw);
      return (v === null || v === undefined) ? fallback : v;
    } catch (e) {
      PS.warnOnce('storage-read', 'Some saved local data could not be read. Procurement 360 continued with safe defaults.');
      return fallback;
    }
  },
  set: function (key: string, value: unknown): boolean {
    var raw: string;
    try { raw = JSON.stringify(value); }
    catch (e) { PS.toast('This item could not be saved.', 'danger'); return false; }
    try {
      if (PS.storageOK) window.localStorage.setItem(key, raw);
      else PS._mem[key] = raw;
      return true;
    } catch (e) {
      var quota = e && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED' || e.code === 22);
      PS.toast(quota
        ? 'Local storage is full. Export a backup, delete some saved items, then try again.'
        : 'Local storage is unavailable in this browser, so this item was kept for this session only.', 'danger');
      PS._mem[key] = raw;
      return false;
    }
  },
  remove: function (key: string): void {
    try { if (PS.storageOK) window.localStorage.removeItem(key); } catch (e) { }
    delete PS._mem[key];
  },
  rawKeys: function (): string[] {
    var out: string[] = [];
    try {
      for (var i = 0; i < window.localStorage.length; i++) {
        var k = window.localStorage.key(i);
        if (k && k.indexOf(PS.NS) === 0) out.push(k);
      }
    } catch (e) { }
    return out;
  },
  bytes: function (): number {
    var n = 0;
    PS.store.rawKeys().forEach(function (k) { try { n += (window.localStorage.getItem(k) || '').length; } catch (e) { } });
    return n;
  }
};

PS.warnOnce = function (tag: string, msg: string): void {
  PS._warned = PS._warned || {};
  if (PS._warned[tag]) return;
  PS._warned[tag] = 1;
  PS.toast(msg, 'danger');
};

/* ---------- preferences ---------- */
var DEFAULT_PREFS: PSPreferences = { currency: 'USD', decimals: 2, dateFormat: 'iso', theme: 'light' };

PS.prefs = function (): PSPreferences {
  return Object.assign({}, DEFAULT_PREFS, PS.store.get(PS.K.prefs, {}));
};
PS.setPrefs = function (p: Partial<PSPreferences>): void {
  var cur = PS.prefs();
  PS.store.set(PS.K.prefs, Object.assign({}, cur, p));
};
