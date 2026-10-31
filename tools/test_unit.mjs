/* ==========================================================
   Unit tests for the pure utility functions of the shipped artifact.

   This file used to declare its own local copies of PS.esc, PS.num,
   PS.csvCell, PS.safeJSON and the rest, and assert against those. That
   made it unable to fail: a change to src/core/03a_util.js or
   src/core/03b_safeio.js was invisible here, and the copies had already
   drifted - PS.safeJSON returns a user-facing sentence in the app and
   returned the bare word 'too large' here, and the test asserted the
   word. It is also not in `npm run qa`, so the only CSV-injection
   assertion in the repo, the one behind requirement Section 34 and the
   Section 76 "test malicious input and CSV formulas" line, was never
   run by the gate at all.

   It now loads the built artifact and tests the PS.* a user actually
   runs, and it is wired into `npm run qa` and `npm run test`.

   Usage: node tools/test_unit.mjs [path/to/artifact.html]
   ========================================================== */
import path from 'node:path';
import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM, VirtualConsole } from 'jsdom';

const HTML = path.resolve(process.argv[2] || 'ProcureSherpa-v2.0.html');
const vc = new VirtualConsole();
/* The artifact logs its content load on boot; noise here is not a finding. */
vc.on('error', () => {});
vc.on('jsdomError', () => {});

const dom = await JSDOM.fromFile(HTML, {
  runScripts: 'dangerously',
  pretendToBeVisual: true,
  virtualConsole: vc,
  beforeParse(window) {
    window.matchMedia = window.matchMedia || (() => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }));
    window.scrollTo = () => {};
  }
});
const PS = dom.window.PS;

if (!PS) {
  console.error('FAIL: ' + HTML + ' did not expose PS, so nothing below can be asserted.');
  process.exit(1);
}

/* The guard against the mistake that made this file useless. If PS is
   ever shadowed by a local copy again, these tests would pass while the
   application fails, so the first assertion is that the functions under
   test come from the artifact at all. */
const REQUIRED = ['esc', 'escAttr', 'clean', 'num', 'clamp', 'round', 'group', 'csvCell', 'toCSV', 'safeJSON', 'levenshtein'];
const absent = REQUIRED.filter((k) => typeof PS[k] !== 'function');

test('the artifact defines every function under test', () => {
  assert.deepEqual(absent, [], 'missing from the built PS: ' + absent.join(', '));
});

/* ---------- escaping and cleaning (Section 34: input security) ---------- */

test('esc: escapes HTML entities', () => {
  assert.equal(PS.esc('<script>alert("x")</script>'),
    '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
  assert.equal(PS.esc("it's"), 'it&#39;s');
  assert.equal(PS.esc(''), '');
  assert.equal(PS.esc(null), '');
  assert.equal(PS.esc(undefined), '');
  assert.equal(PS.esc(42), '42');
});

test('escAttr cannot escape differently from esc', () => {
  const probe = '<a onmouseover="x">';
  assert.equal(PS.escAttr(probe), PS.esc(probe));
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

/* ---------- number parsing (Section 25: calculator quality) ---------- */

test('num: parses the formats a procurement user actually types', () => {
  assert.equal(PS.num('42'), 42);
  assert.equal(PS.num('3.14'), 3.14);
  assert.equal(PS.num('$1,234.56'), 1234.56);
  assert.equal(PS.num('(500)'), -500);
  assert.equal(PS.num('45%'), 45);
  assert.equal(PS.num('  100  '), 100);
  assert.equal(PS.num(42), 42);
  assert.equal(PS.num(-3.14), -3.14);
});

test('num: returns NaN rather than a plausible 0 for input it cannot trust', () => {
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

/* ---------- formatting (Section 60: no false precision) ---------- */

test('round: rounds to the requested decimals', () => {
  assert.equal(PS.round(3.14159), 3.14);
  assert.equal(PS.round(3.14159, 3), 3.142);
  assert.equal(PS.round(3.14159, 0), 3);
});

test('round: refuses to invent a number out of a non-finite one', () => {
  assert.ok(Number.isNaN(PS.round(Infinity)));
  assert.ok(Number.isNaN(PS.round(NaN)));
});

test('group: formats with thousands separators', () => {
  assert.equal(PS.group(1234.5, 2), '1,234.50');
  assert.equal(PS.group(-1234.5, 2), '-1,234.50');
  assert.equal(PS.group(0, 2), '0.00');
  assert.equal(PS.group(1000000, 2), '1,000,000.00');
  assert.equal(PS.group(999, 2), '999.00');
});

test('group: shows an em dash, not a fake zero, for a value that does not exist', () => {
  assert.equal(PS.group(Infinity, 2), '\u2014');
  assert.equal(PS.group(NaN, 2), '\u2014');
  assert.equal(PS.group(undefined, 2), '\u2014');
});

test('group: respects decimal places', () => {
  assert.equal(PS.group(1234.5, 0), '1,235');
  assert.equal(PS.group(1234.5, 1), '1,234.5');
  assert.equal(PS.group(1234.5, 3), '1,234.500');
});

/* ---------- CSV safety (Section 34: CSV injection protection) ---------- */

test('csvCell: prevents spreadsheet formula injection', () => {
  assert.equal(PS.csvCell('=SUM(A1:A2)'), "'=SUM(A1:A2)");
  assert.equal(PS.csvCell('+1234'), "'+1234");
  assert.equal(PS.csvCell('-cmd'), "'-cmd");
  assert.equal(PS.csvCell('@import'), "'@import");
  assert.equal(PS.csvCell('\tcmd'), "'\tcmd");
  assert.equal(PS.csvCell('normal'), 'normal');
  assert.equal(PS.csvCell(42), '42');
  assert.equal(PS.csvCell(null), '');
});

test('csvCell: escapes quotes and commas so a cell cannot split into two', () => {
  assert.equal(PS.csvCell('hello, world'), '"hello, world"');
  assert.equal(PS.csvCell('say "hi"'), '"say ""hi"""');
});

test('toCSV: builds valid CSV with CRLF line endings', () => {
  assert.equal(PS.toCSV(['Name', 'Value'], [['Alice', 42], ['Bob', 'hello, world']]),
    'Name,Value\r\nAlice,42\r\nBob,"hello, world"');
});

test('toCSV: keeps an injected cell neutralised once it reaches a row', () => {
  /* A prefix quote is only protection if the quoting rules around it do
     not undo it. This is the cell that would open a formula in Excel if
     the leading apostrophe were dropped or the field were re-quoted
     wrongly. */
  const row = PS.toCSV(['Note'], [['=HYPERLINK("http://x","y")']]);
  assert.ok(row.indexOf("'=HYPERLINK") > -1, 'injected formula lost its guard: ' + row);
  assert.ok(!/^=/.test(row.split('\r\n')[1]), 'cell starts with = : ' + row);
});

/* ---------- safe import (Section 28 and Section 34: validate before writing) ---------- */

test('safeJSON: parses a valid object', () => {
  const result = PS.safeJSON('{"key":"value"}');
  assert.ok(result.ok);
  assert.equal(result.value.key, 'value');
});

test('safeJSON: rejects anything it should not write to storage, without throwing', () => {
  assert.ok(!PS.safeJSON('').ok);
  assert.ok(!PS.safeJSON(null).ok);
  assert.ok(!PS.safeJSON('not json').ok);
  assert.ok(!PS.safeJSON('42').ok);
});

test('safeJSON: every rejection carries a sentence the user can act on', () => {
  /* This assertion is the drift this file used to hide: the shipped
     function returns user-facing text, the old local copy returned bare
     machine codes, and the test asserted the codes. */
  [PS.safeJSON(''), PS.safeJSON('not json'), PS.safeJSON('42')].forEach((r) => {
    assert.equal(typeof r.error, 'string');
    assert.ok(r.error.length > 10, 'error is not a sentence: ' + r.error);
  });
});

test('safeJSON: enforces the size limit', () => {
  const result = PS.safeJSON('{"key":"value"}', 5);
  assert.ok(!result.ok);
  assert.match(result.error, /large/i);
});

/* ---------- search tolerance (Section 9: partial words, common terms) ---------- */

test('levenshtein: computes edit distance', () => {
  assert.equal(PS.levenshtein('', ''), 0);
  assert.equal(PS.levenshtein('abc', ''), 3);
  assert.equal(PS.levenshtein('', 'abc'), 3);
  assert.equal(PS.levenshtein('kitten', 'sitting'), 3);
  assert.equal(PS.levenshtein('saturday', 'sunday'), 3);
  assert.equal(PS.levenshtein('abc', 'abc'), 0);
  assert.equal(PS.levenshtein('abc', 'def'), 3);
});

after(() => {
  /* jsdom keeps timers alive; closing the window is what lets the test
     process exit. Deliberately NOT process.exit() here: a call to
     process.exit from this hook reported exit 0 even when an assertion
     had failed, because it truncated node:test's own bookkeeping. The
     gate has to be able to fail. */
  try { dom.window.close(); } catch { /* already closing */ }
});
