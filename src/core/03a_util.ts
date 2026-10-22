import { PS } from '../core/ps.ts';

PS.APP = 'Procure Sherpa';
PS.VERSION = '2.0';
PS.SCHEMA = 2;
PS.BUILD = '2026-09-16';
PS.NS = 'ps_';
PS.MAX_SAVED = 250;
PS.MAX_QUOTE_SAVED = 50;
PS.AUDIT_MAX = 100;

/* ---------- tiny DOM helpers ---------- */
PS.$ = function (s, r) { return (r || document).querySelector(s); };
PS.$$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

/* ---------- text safety (Section 34: input security) ---------- */
PS.esc = function (v) {
  if (v === null || v === undefined) return '';
  return String(v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
};
PS.clean = function (v, max) {
  if (v === null || v === undefined) return '';
  var s = String(v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim();
  if (max && s.length > max) s = s.slice(0, max);
  return s;
};
PS.escAttr = PS.esc;

/* ---------- numbers ---------- */
PS.num = function (v) {
  if (v === null || v === undefined || v === '') return NaN;
  if (typeof v === 'number') return isFinite(v) ? v : NaN;
  var s = String(v).replace(/[\s,\u00A0]/g, '').replace(/[$€£¥₹]/g, '');
  if (/^\(.*\)$/.test(s)) s = '-' + s.slice(1, -1);
  if (s.slice(-1) === '%') s = s.slice(0, -1);
  var n = Number(s);
  return isFinite(n) ? n : NaN;
};
PS.isNum = function (v) { return isFinite(PS.num(v)); };
PS.clamp = function (n, lo, hi) { return Math.min(hi, Math.max(lo, n)); };
PS.round = function (n, d) {
  var f = Math.pow(10, d === undefined ? 2 : d);
  return isFinite(n) ? Math.round((n + Number.EPSILON) * f) / f : NaN;
};

/* ---------- formatting (Section 60: no false precision) ---------- */
PS.CURRENCIES = [
  { c: 'USD', s: '$' }, { c: 'EUR', s: '\u20AC' }, { c: 'GBP', s: '\u00A3' },
  { c: 'INR', s: '\u20B9' }, { c: 'AED', s: 'AED ' }, { c: 'AUD', s: 'A$' },
  { c: 'CAD', s: 'C$' }, { c: 'SGD', s: 'S$' }, { c: 'ZAR', s: 'R' },
  { c: 'JPY', s: '\u00A5' }, { c: 'CNY', s: 'CN\u00A5' }, { c: 'CHF', s: 'CHF ' },
  { c: 'SEK', s: 'kr ' }, { c: 'BRL', s: 'R$' }, { c: 'MXN', s: 'MX$' },
  { c: 'NZD', s: 'NZ$' }, { c: 'HKD', s: 'HK$' }, { c: 'SAR', s: 'SAR ' },
  { c: 'MYR', s: 'RM' }, { c: 'PLN', s: 'z\u0142 ' }, { c: 'NONE', s: '' }
];
PS.curSymbol = function (code) {
  var f = PS.CURRENCIES.filter(function (x) { return x.c === code; })[0];
  return f ? f.s : (code ? code + ' ' : '');
};
PS.group = function (n, d) {
  if (!isFinite(n)) return '\u2014';
  var neg = n < 0; n = Math.abs(n);
  var parts = PS.round(n, d).toFixed(d).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (neg ? '-' : '') + parts.join('.');
};
PS.fmt = function (n, d) { return PS.group(n, d === undefined ? 2 : d); };
PS.money = function (n, d) {
  if (!isFinite(n)) return '\u2014';
  var p = PS.prefs();
  return PS.curSymbol(p.currency) + PS.group(n, d === undefined ? p.decimals : d);
};
/* headline money: no false precision on large numbers */
PS.moneyR = function (n) {
  if (!isFinite(n)) return '\u2014';
  var a = Math.abs(n);
  return PS.money(n, a >= 10000 ? 0 : (a >= 100 ? 0 : 2));
};
PS.pct = function (n, d) { return isFinite(n) ? PS.group(n, d === undefined ? 1 : d) + '%' : '\u2014'; };
PS.qty = function (n) { return isFinite(n) ? PS.group(n, Math.abs(n) < 1000 ? 2 : 0) : '\u2014'; };
PS.ratio = function (n) { return isFinite(n) ? PS.group(n, 2) : '\u2014'; };
PS.dateStr = function (d) {
  d = d ? new Date(d) : new Date();
  if (isNaN(d.getTime())) return '\u2014';
  var p = PS.prefs(), m = String(d.getMonth() + 1), day = String(d.getDate()), y = d.getFullYear();
  m = m.length < 2 ? '0' + m : m; day = day.length < 2 ? '0' + day : day;
  var h = d.getHours(), mi = String(d.getMinutes());
  if (mi.length < 2) mi = '0' + mi;
  var t = (h % 12 === 0 ? 12 : h % 12) + ':' + mi + ' ' + (h < 12 ? 'am' : 'pm');
  if (p.dateFormat === 'us') return m + '/' + day + '/' + y;
  if (p.dateFormat === 'eu') return day + '/' + m + '/' + y;
  return y + '-' + m + '-' + day;
};
PS.dateTime = function (d) { return PS.dateStr(d) + ' ' + PS.timeStr(d); };
PS.timeStr = function (d) {
  d = d ? new Date(d) : new Date();
  var h = d.getHours(), mi = String(d.getMinutes());
  if (mi.length < 2) mi = '0' + mi;
  return (h % 12 === 0 ? 12 : h % 12) + ':' + mi + ' ' + (h < 12 ? 'am' : 'pm');
};
PS.iso = function (d) {
  d = d ? new Date(d) : new Date();
  var m = String(d.getMonth() + 1), day = String(d.getDate());
  if (m.length < 2) m = '0' + m; if (day.length < 2) day = '0' + day;
  return d.getFullYear() + '-' + m + '-' + day;
};
PS.uid = function (p) {
  return (p || 'id') + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
};
PS.debounce = function (fn, ms) {
  var t;
  return function () { var a = arguments, s = this; clearTimeout(t); t = setTimeout(function () { fn.apply(s, a); }, ms || 150); };
};
