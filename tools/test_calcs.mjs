/* ==========================================================
   Calculator correctness test harness
   Loads the built app headlessly, then for EVERY registered
   calculator:
     - runs the documented example through validation
     - executes the impl with example values
     - asserts the output envelope is well-formed
     - asserts every result value is finite / not NaN
     - asserts the impl does not throw for empty (default) inputs
   Fails loudly with per-calculator diagnostics.
   ========================================================== */
import { JSDOM, VirtualConsole } from 'jsdom';

const HTML = process.argv[2] || 'ProcureSherpa-v2.0.html';
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', (e) => errors.push('jsdom: ' + (e.detail?.message || e.message)));
vc.on('error', (...a) => errors.push('console.error: ' + a.map(String).join(' ')));

const dom = await JSDOM.fromFile(HTML, {
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true,
  virtualConsole: vc,
  beforeParse(window) {
    window.matchMedia = window.matchMedia || (() => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }));
    window.scrollTo = () => {};
    window.HTMLElement.prototype.scrollIntoView = function () {};
    if (!window.print) window.print = () => {};
  }
});
await new Promise((r) => setTimeout(r, 1200));
const PS = dom.window.PS;

const results = [];
let pass = 0, fail = 0;

function badDisplay(v) {
  if (v === null || v === undefined) return false;   // em-dash / blank rendering is allowed
  if (typeof v === 'number') return !isFinite(v);
  const s = String(v);
  if (s === '') return false;
  return /(^|\s)(NaN|Infinity|-Infinity|undefined|null)(\s|$)/i.test(s)
    || /\[object\s+\w+\]/i.test(s)
    || /^\s*\.\s*$/.test(s);
}

function check(cond, msg) {
  if (cond) pass++; else { fail++; results.push('  FAIL ' + msg); }
}

const calcs = (PS.data.calc || []).slice();
console.log('testing ' + calcs.length + ' calculators\n');

calcs.forEach(function (calc) {
  const tag = calc.id;
  results.push('== ' + tag + ' :: ' + calc.title);

  /* 1. Every field has a label, key, and sane flags. */
  (calc.fields || []).forEach(function (f, i) {
    check(f && f.k, tag + ' field[' + i + '] missing key');
    check(f && f.label && String(f.label).length > 0, tag + ' field "' + (f && f.k) + '" missing label');
    if (f.req && f.type === 'number' && f.unit !== 'percent' && f.unit !== 'currency' && f.unit !== 'qty' && f.unit !== 'years' && f.unit !== 'units' && !f.unit) {
      // number required fields without any unit are suspicious but not fatal
    }
  });

  /* 2. Example data, if present, must satisfy validation. */
  if (calc.example) {
    const errs = PS.validateCalc(calc, calc.example);
    const keys = Object.keys(errs || {});
    check(keys.length === 0, tag + ' example data fails validation: ' + keys.join(', '));
  } else {
    results.push('  note: no example data supplied for ' + tag);
  }

  /* 3. Example run must produce a well-formed, finite output. */
  if (calc.example) {
    let out = null, threw = null;
    try { out = calc.run(calc.example); }
    catch (e) { threw = e; }
    check(!threw, tag + ' example run THREW: ' + (threw && threw.message));
    if (!threw) {
      check(out && typeof out === 'object', tag + ' example run returned non-object');
      if (out) {
        const res = Array.isArray(out.results) ? out.results : [];
        check(res.length > 0, tag + ' example run returned zero result rows');
        check(res.some((r) => r.primary), tag + ' example run has no primary result');
        res.forEach((r, i) => {
          check(r && r.label && String(r.label).length, tag + ' result[' + i + '] missing label');
          check(!badDisplay(r && r.value), tag + ' result "' + (r && r.label) + '" corrupted value: ' + (r && r.value));
        });
        if (out.table) {
          check(Array.isArray(out.table.headers) && out.table.headers.length, tag + ' table missing headers');
          check(Array.isArray(out.table.rows), tag + ' table rows not an array');
          (out.table.rows || []).forEach((row, i) => {
            check(Array.isArray(row.cells) && row.cells.length === out.table.headers.length,
              tag + ' table row[' + i + '] has ' + (Array.isArray(row.cells) ? row.cells.length : '?') + ' cells, expected ' + out.table.headers.length);
            (row.cells || []).forEach((cell) => check(!badDisplay(cell), tag + ' table row[' + i + '] corrupted cell: ' + cell));
          });
        }
        (out.warnings || []).forEach((w, i) => check(typeof w === 'string' && w.length, tag + ' warning[' + i + '] not a string'));
      }
    }
  }

  /* 4. Running with defaults / empty input must not throw. */
  const defs = PS.calcDefaults(calc);
  let threwDefault = null;
  try { calc.run(defs); } catch (e) { threwDefault = e; }
  check(!threwDefault, tag + ' default-input run THREW: ' + (threwDefault && threwDefault.message));

  /* 5. Required-field enforcement: strip a required field and expect errors. */
  const req = (calc.fields || []).filter((f) => f.req);
  if (req.length) {
    const v = {};
    (calc.fields || []).forEach((f) => { v[f.k] = calc.example ? calc.example[f.k] : (f.type === 'check' ? true : (f.type === 'select' ? (f.options ? f.options[0] : '') : (f.type === 'text' ? 'x' : 1))); });
    delete v[req[0].k];
    if (req[0].type !== 'check') {
      const errs2 = PS.validateCalc(calc, v);
      check(Object.keys(errs2).indexOf(req[0].k) >= 0, tag + ' missing required field "' + req[0].k + '" not flagged');
    }
  }
});

console.log(results.join('\n'));
console.log('\n--- summary ---');
console.log('calculators tested:', calcs.length);
console.log('assertions passed: ' + pass);
console.log('assertions failed: ' + fail);
console.log('runtime errors:', errors.length);
if (errors.length) console.log('first runtime errors:\n' + errors.slice(0, 6).join('\n'));
process.exit(fail ? 1 : 0);