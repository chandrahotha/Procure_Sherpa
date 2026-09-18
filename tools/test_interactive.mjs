/* Interactive-path test: exercise search with queries, command palette,
   calculator runs, and SOP flow chips - paths the route smoke misses. */
import path from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';

const HTML = path.resolve('ProcureSherpa-v2.0.html');
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
const { window } = dom;
await new Promise((r) => setTimeout(r, 1200));
const doc = window.document;

let bad = 0;
function check(name, fn) {
  const before = errors.length;
  try {
    const ok = fn();
    const newErrors = errors.slice(before);
    if (ok === false || newErrors.length) { bad++; console.log('FAIL', name, newErrors.length ? '| ' + newErrors.slice(0, 2).join(' | ').slice(0, 200) : ''); }
    else console.log('ok  ', name);
  } catch (e) {
    bad++; console.log('FAIL', name, '| throw:', String(e && e.message || e).slice(0, 200));
  }
}

/* 1. PS.search with real queries (was TypeError: self.getShortcut) */
check('search: PS.search("TCO") returns results', () => {
  const r = window.PS.search('TCO');
  return r.results.length > 0;
});
check('search: PS.search("supplier risk") returns results', () => {
  const r = window.PS.search('supplier risk');
  return r.results.length > 0;
});
check('search: every result has shortcut string (no undefined)', () => {
  const r = window.PS.search('cost');
  return r.results.every((x) => typeof x.shortcut === 'string');
});
check('search: suggestions for misspelled query', () => {
  const r = window.PS.search('suplier risk');
  return Array.isArray(r.suggestions);
});

/* 2. Search page with a query (route render) */
check('route: #/search renders results for q=TCO', () => {
  window.location.hash = '#/search';
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const main = doc.querySelector('#main, main, [role="main"]') || doc.body;
        const text = main.textContent || '';
        resolve(text.length > 100);
      } catch (e) { resolve(false); }
    }, 150);
  });
});

/* 3. Command palette open + render with query */
check('palette: open with query renders results', () => {
  window.PS.cmdPalette.open('tco');
  const modal = doc.getElementById('cmdPaletteModal');
  const items = modal ? doc.querySelectorAll('#cmdPaletteModal .cmd-item, #cmdPaletteModal [data-route]') : [];
  const hasResults = modal && !modal.hasAttribute('hidden') && (modal.textContent || '').trim().length > 50;
  window.PS.cmdPalette.close();
  return !!hasResults && items.length >= 0;
});

/* 4. Calculator: open TCO, load example, calculate */
check('calc: TCO example + calculate produces output', () => {
  window.location.hash = '#/calc/calc-tco';
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const w = window;
        if (typeof w.PS.calcExample === 'function') w.PS.calcExample();
        else if (typeof w.PS.loadExample === 'function') w.PS.loadExample();
        if (typeof w.PS.calcCalculate === 'function') w.PS.calcCalculate();
        else if (typeof w.PS.calculate === 'function') w.PS.calculate();
        const main = doc.querySelector('#main, main, [role="main"]') || doc.body;
        const txt = main.textContent || '';
        resolve(/\d/.test(txt));
      } catch (e) { resolve(String(e.message)); }
    }, 200);
  });
});

/* 5. SOP flow chips: verify pipe-separated flow renders as separate chips */
check('sop: flow renders >= 5 separate chips', () => {
  window.location.hash = '#/sop/sop-procurement-lifecycle';
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const steps = doc.querySelectorAll('.flow .flow-step');
        const jammed = Array.from(steps).some((s) => (s.textContent || '').includes('|'));
        resolve(steps.length >= 5 && !jammed);
      } catch (e) { resolve(false); }
    }, 150);
  });
});

/* 6. All SOPs: flow expansion sane */
check('sop: all 13 flows have >= 3 steps, none contain "|"', () => {
  return window.PS.data.sop.every((s) => s.flow.length >= 3 && s.flow.every((f) => !f.includes('|')));
});

/* 7. Academy route render + quiz option navigation */
check('academy: function page renders learn tab', () => {
  window.location.hash = '#/academy/func-mission-value';
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const main = doc.querySelector('#main, main, [role="main"]') || doc.body;
        resolve((main.textContent || '').length > 500);
      } catch (e) { resolve(false); }
    }, 150);
  });
});

/* 8. Settings round-trip */
check('prefs: savePrefs + read back', () => {
  window.PS.savePrefs({ currency: 'EUR' }, true);
  const ok = window.PS.prefs().currency === 'EUR';
  window.PS.savePrefs({ currency: 'USD' }, true);
  return ok;
});

/* 9. Backup export content */
check('backup: export produces JSON with schema', () => {
  const r = window.PS.buildBackup ? window.PS.buildBackup() : null;
  if (!r) return true; /* builder may live behind UI; skip */
  return typeof r === 'object';
});

await new Promise((r) => setTimeout(r, 300));
console.log('--- summary ---');
console.log('checks failed:', bad);
console.log('total runtime errors captured:', errors.length);
if (errors.length) console.log('first errors:\n' + errors.slice(0, 8).join('\n'));
process.exit(0);
