/* ==========================================================
   Unit tests for pure utility functions.
   Runs with `node --test` (built into Node 22+, zero new deps).
   Tests individual functions in isolation — no jsdom required.
   ========================================================== */
import { test } from 'node:test';
import assert from 'node:assert/strict';

const PS = {};

PS.esc = function (v) {
  if (v === null || v === undefined) return '';
  return String(v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
};

PS.clean = function (v, max) {
  if (v === null || v === undefined) return '';
  /* eslint-disable-next-line no-control-regex --
     matching control characters mirrors the source function under test */
  var s = String(v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim();
  if (max && s.length > max) s = s.slice(0, max);
  return s;
};

PS.num = function (v) {
  if (v === null || v === undefined || v === '') return NaN;
  if (typeof v === 'number') return isFinite(v) ? v : NaN;
  var s = String(v).replace(/[\s,\u00A0]/g, '').replace(/[$€£¥₹]/g, '');
  if (/^\(.*\)$/.test(s)) s = '-' + s.slice(1, -1);
  if (s.slice(-1) === '%') s = s.slice(0, -1);
  var n = Number(s);
  return isFinite(n) ? n : NaN;
};

PS.clamp = function (n, lo, hi) { return Math.min(hi, Math.max(lo, n)); };

PS.round = function (n, d) {
  var f = Math.pow(10, d === undefined ? 2 : d);
  return isFinite(n) ? Math.round((n + Number.EPSILON) * f) / f : NaN;
};

PS.group = function (n, d) {
  if (!isFinite(n)) return '\u2014';
  var neg = n < 0; n = Math.abs(n);
  var parts = PS.round(n, d).toFixed(d).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (neg ? '-' : '') + parts.join('.');
};

PS.csvCell = function (v) {
  var s = v === null || v === undefined ? '' : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  if (/[",\r\n]/.test(s)) s = '"' + s.replace(/"/g, '""') + '"';
  return s;
};

PS.toCSV = function (headers, rows) {
  var out = [headers.map(PS.csvCell).join(',')];
  (rows || []).forEach(function (r) { out.push(r.map(PS.csvCell).join(',')); });
  return out.join('\r\n');
};

PS.safeJSON = function (text, maxBytes) {
  if (typeof text !== 'string' || !/\S/.test(text)) return { ok: false, error: 'empty' };
  if (maxBytes && text.length > maxBytes) return { ok: false, error: 'too large' };
  try {
    var v = JSON.parse(text);
    if (v === null || typeof v !== 'object') return { ok: false, error: 'not object' };
    return { ok: true, value: v };
  } catch (e) {
    return { ok: false, error: 'invalid' };
  }
};

PS.levenshtein = function (a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  var matrix = [], i, j;
  for (i = 0; i <= b.length; i++) { matrix[i] = [i]; }
  for (j = 0; j <= a.length; j++) { matrix[0][j] = j; }
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
};

/* ---------- Tests ---------- */

test('esc: escapes HTML entities', () => {
  assert.equal(PS.esc('<script>alert("x")</script>'),
    '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
  assert.equal(PS.esc("it's"), 'it&#39;s');
  assert.equal(PS.esc(''), '');
  assert.equal(PS.esc(null), '');
  assert.equal(PS.esc(undefined), '');
  assert.equal(PS.esc(42), '42');
});

test('clean: strips control characters and trims', () => {
  assert.equal(PS.clean('  hello world  '), 'hello world');
  assert.equal(PS.clean('hello\u0000world'), 'helloworld');
  assert.equal(PS.clean('hello\u001Fworld'), 'helloworld');
  assert.equal(PS.clean('', 10), '');
  assert.equal(PS.clean(null), '');
});

test('clean: respects max length', () => {
  assert.equal(PS.clean('abcdefghijklmnop', 5), 'abcde');
  assert.equal(PS.clean('abc', 5), 'abc');
});

test('num: parses various formats', () => {
  assert.equal(PS.num('42'), 42);
  assert.equal(PS.num('3.14'), 3.14);
  assert.equal(PS.num('$1,234.56'), 1234.56);
  assert.equal(PS.num('(500)'), -500);
  assert.equal(PS.num('45%'), 45);
  assert.equal(PS.num('  100  '), 100);
  assert.equal(PS.num(42), 42);
  assert.equal(PS.num(-3.14), -3.14);
});

test('num: returns NaN for invalid input', () => {
  assert.ok(Number.isNaN(PS.num('')));
  assert.ok(Number.isNaN(PS.num(null)));
  assert.ok(Number.isNaN(PS.num(undefined)));
  assert.ok(Number.isNaN(PS.num('abc')));
  assert.ok(Number.isNaN(PS.num(Infinity)));
  assert.ok(Number.isNaN(PS.num(NaN)));
});

test('clamp: constrains values', () => {
  assert.equal(PS.clamp(5, 0, 10), 5);
  assert.equal(PS.clamp(-5, 0, 10), 0);
  assert.equal(PS.clamp(15, 0, 10), 10);
  assert.equal(PS.clamp(0, 0, 10), 0);
  assert.equal(PS.clamp(10, 0, 10), 10);
});

test('round: rounds to specified decimals', () => {
  assert.equal(PS.round(3.14159), 3.14);
  assert.equal(PS.round(3.14159, 3), 3.142);
  assert.equal(PS.round(3.14159, 0), 3);
  assert.equal(PS.round(-2.555, 2), -2.55);
  assert.equal(PS.round(0), 0);
});

test('round: returns NaN for non-finite', () => {
  assert.ok(Number.isNaN(PS.round(Infinity)));
  assert.ok(Number.isNaN(PS.round(NaN)));
  assert.equal(PS.round(null), 0);
});

test('group: formats with thousands separators', () => {
  assert.equal(PS.group(1234.5, 2), '1,234.50');
  assert.equal(PS.group(-1234.5, 2), '-1,234.50');
  assert.equal(PS.group(0, 2), '0.00');
  assert.equal(PS.group(1000000, 2), '1,000,000.00');
  assert.equal(PS.group(999, 2), '999.00');
});

test('group: handles non-finite gracefully', () => {
  assert.equal(PS.group(Infinity, 2), '\u2014');
  assert.equal(PS.group(NaN, 2), '\u2014');
  assert.equal(PS.group(null, 2), '0.00');
});

test('group: respects decimal places', () => {
  assert.equal(PS.group(1234.5, 0), '1,235');
  assert.equal(PS.group(1234.5, 1), '1,234.5');
  assert.equal(PS.group(1234.5, 3), '1,234.500');
});

test('csvCell: prevents formula injection', () => {
  assert.equal(PS.csvCell('=SUM(A1:A2)'), "'=SUM(A1:A2)");
  assert.equal(PS.csvCell('+1234'), "'+1234");
  assert.equal(PS.csvCell('-cmd'), "'-cmd");
  assert.equal(PS.csvCell('@import'), "'@import");
  assert.equal(PS.csvCell('normal'), 'normal');
  assert.equal(PS.csvCell(42), '42');
  assert.equal(PS.csvCell(null), '');
});

test('csvCell: escapes quotes and commas', () => {
  assert.equal(PS.csvCell('hello, world'), '"hello, world"');
  assert.equal(PS.csvCell('say "hi"'), '"say ""hi"""');
});

test('toCSV: builds valid CSV', () => {
  var csv = PS.toCSV(['Name', 'Value'], [['Alice', 42], ['Bob', 'hello, world']]);
  assert.equal(csv, 'Name,Value\r\nAlice,42\r\nBob,"hello, world"');
});

test('safeJSON: parses valid JSON', () => {
  var result = PS.safeJSON('{"key":"value"}');
  assert.ok(result.ok);
  assert.equal(result.value.key, 'value');
});

test('safeJSON: rejects invalid input', () => {
  assert.ok(!PS.safeJSON('').ok);
  assert.ok(!PS.safeJSON(null).ok);
  assert.ok(!PS.safeJSON('not json').ok);
  assert.ok(PS.safeJSON('[1,2,3]').ok);
  assert.ok(!PS.safeJSON('42').ok);
});

test('safeJSON: enforces size limit', () => {
  var result = PS.safeJSON('{"key":"value"}', 5);
  assert.ok(!result.ok);
  assert.equal(result.error, 'too large');
});

test('levenshtein: computes edit distance', () => {
  assert.equal(PS.levenshtein('', ''), 0);
  assert.equal(PS.levenshtein('abc', ''), 3);
  assert.equal(PS.levenshtein('', 'abc'), 3);
  assert.equal(PS.levenshtein('kitten', 'sitting'), 3);
  assert.equal(PS.levenshtein('saturday', 'sunday'), 3);
  assert.equal(PS.levenshtein('abc', 'abc'), 0);
  assert.equal(PS.levenshtein('abc', 'def'), 3);
});
