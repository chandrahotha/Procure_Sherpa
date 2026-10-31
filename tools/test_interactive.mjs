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
/* Several checks below are asynchronous. This used to be a synchronous
   function that compared the returned Promise object against `false` -
   never equal - so every asynchronous check passed no matter what it
   resolved to. It is now async, and every call site awaits it. */
async function check(name, fn) {
  const before = errors.length;
  try {
    const ok = await fn();
    const newErrors = errors.slice(before);
    if (ok === false || newErrors.length) { bad++; console.log('FAIL', name, newErrors.length ? '| ' + newErrors.slice(0, 2).join(' | ').slice(0, 200) : ''); }
    else console.log('ok  ', name);
  } catch (e) {
    bad++; console.log('FAIL', name, '| throw:', String(e && e.message || e).slice(0, 200));
  }
}

/* 1. PS.search with real queries (was TypeError: self.getShortcut) */
await check('search: PS.search("TCO") returns results', () => {
  const r = window.PS.search('TCO');
  return r.results.length > 0;
});
await check('search: PS.search("supplier risk") returns results', () => {
  const r = window.PS.search('supplier risk');
  return r.results.length > 0;
});
await check('search: every result has shortcut string (no undefined)', () => {
  const r = window.PS.search('cost');
  return r.results.every((x) => typeof x.shortcut === 'string');
});
await check('search: suggestions for misspelled query', () => {
  const r = window.PS.search('suplier risk');
  return Array.isArray(r.suggestions);
});

/* 2. Search page with a query (route render) */
await check('route: #/search renders results for q=TCO', () => {
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
await check('palette: open with query renders results', () => {
  window.PS.cmdPalette.open('tco');
  const modal = doc.getElementById('cmdPaletteModal');
  const items = modal ? doc.querySelectorAll('#cmdPaletteModal .cmd-item, #cmdPaletteModal [data-route]') : [];
  const hasResults = modal && !modal.hasAttribute('hidden') && (modal.textContent || '').trim().length > 50;
  window.PS.cmdPalette.close();
  return !!hasResults && items.length >= 0;
});

/* 4. Calculator: open TCO, load example, calculate */
await check('calc: TCO example + calculate produces output', () => {
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
await check('sop: flow renders >= 5 separate chips', () => {
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
await check('sop: all 13 flows have >= 3 steps, none contain "|"', () => {
  return window.PS.data.sop.every((s) => s.flow.length >= 3 && s.flow.every((f) => !f.includes('|')));
});

/* 7. Academy route render + quiz option navigation */
await check('academy: function page renders learn tab', () => {
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
await check('prefs: savePrefs + read back', () => {
  window.PS.savePrefs({ currency: 'EUR' }, true);
  const ok = window.PS.prefs().currency === 'EUR';
  window.PS.savePrefs({ currency: 'USD' }, true);
  return ok;
});

/* 9. Backup content (Section 27 saved workspace, Section 28 backup and restore).

   This check read:
       const r = window.PS.buildBackup ? window.PS.buildBackup() : null;
       if (!r) return true;              // builder may live behind UI; skip
       return typeof r === 'object';
   `PS.buildBackup` has never existed - the builder is PS.backupObject() in
   src/core/06d2_actions_backup.js - so the first branch was always false,
   the second always returned true, and the check passed on every build
   from the day it was written. It was also only a `typeof` test, so a
   backup with every section missing would have passed it.

   Now: the absence of a builder is a failure, and the sections master §28
   names (saved work, preferences, favourites, recent items, checklist
   states, user-created notes) plus the §27 workbench records are seeded
   with one real record each and read back out of the backup object. A
   section that stops being written, or stops carrying what was written
   into it, fails the gate. */
await check('backup: the builder exists (not a hook hidden behind the UI)', () => typeof window.PS.backupObject === 'function');

await check('backup: carries the §27 and §28 collections, with the records inside them', () => {
  const P = window.PS;
  if (typeof P.backupObject !== 'function') return false;
  /* Seed one record per collection the requirements name. */
  const rec = P.saved.add({ type: 'calculation', title: 'Interactive backup probe', tags: ['probe'], notes: 'written by tools/test_interactive.mjs', data: { probe: 1 } });
  P.fav.toggle('calc', 'calc-tco');
  P.recent.add('calc', 'calc-tco', 'Total Cost of Ownership');
  P.clState.save('cl-procurement-intake', { checked: { step1: true }, notes: 'checklist note from the backup probe' });
  P.tplState.save('tpl-rfq', { values: { title: 'RFQ from the backup probe' }, notes: 'template note from the backup probe' });
  P.wb.upsert('suppliers', { id: 'wb-probe-supplier', name: 'Backup Probe Supplier' });
  P.wb.upsert('contracts', { id: 'wb-probe-contract', name: 'Backup Probe Contract' });

  const bk = P.backupObject();
  const want = {
    app: () => bk.app === P.APP,
    schema: () => bk.schema === P.SCHEMA,
    version: () => !!bk.version,
    exported: () => !!bk.exported,
    prefs: () => bk.prefs && typeof bk.prefs === 'object' && bk.prefs.currency === P.prefs().currency,
    saved: () => Array.isArray(bk.saved) && bk.saved.some((x) => x && x.id === (rec && rec.id) && x.type === 'calculation' && x.title === 'Interactive backup probe'),
    favorites: () => Array.isArray(bk.favorites) && bk.favorites.some((x) => x && x.id === 'calc-tco'),
    recent: () => Array.isArray(bk.recent) && bk.recent.some((x) => x && x.id === 'calc-tco'),
    checklists: () => bk.checklists && bk.checklists['cl-procurement-intake'] && /backup probe/.test(bk.checklists['cl-procurement-intake'].notes || ''),
    templates: () => bk.templates && bk.templates['tpl-rfq'] && /backup probe/.test(bk.templates['tpl-rfq'].notes || ''),
    audit: () => Array.isArray(bk.audit),
    workbench: () => bk.workbench && Array.isArray(bk.workbench.suppliers) && bk.workbench.suppliers.some((r) => r && r.id === 'wb-probe-supplier') &&
      Array.isArray(bk.workbench.contracts) && bk.workbench.contracts.some((r) => r && r.id === 'wb-probe-contract')
  };
  const missing = Object.keys(want).filter((k) => {
    let pass = false;
    try { pass = !!want[k](); } catch (e) { pass = false; }
    if (!pass) console.log('     backup section missing or empty:', k);
    return !pass;
  });
  /* Clean up so the rest of this file, and the routes it renders, still
     start from an empty workspace. This goes through PS.store rather than
     window.localStorage because the harnesses differ: a file:// jsdom
     window has an opaque origin and no localStorage at all (the app then
     falls back to its in-memory store), and clearing it throws. */
  [P.K.saved, P.K.fav, P.K.recent].forEach((k) => P.store.set(k, []));
  [P.K.cl, P.K.tpl].forEach((k) => P.store.set(k, {}));
  P.wb.data = {};
  P.wb.save();
  return missing.length === 0;
});

/* 10. Regression: routes that assign PS.pageInit must actually reach it.
   A PS.route() handler builds a string and returns it; the router resets
   PS.pageInit to null before each render and calls it afterwards. On the
   Copilot and Spend model pages the assignment sat AFTER the `return`, so
   it was unreachable: PS.pageInit stayed null, the Copilot input never
   bound its Enter-to-ask handler, and the Spend model's drag-to-reorder -
   which its own on-screen text promises - was never wired. Both are one
   stray `return` away from regressing silently, so assert them. */
await check('copilot: page wires pageInit (Enter-to-ask handler)', async () => {
  window.location.hash = '#/copilot';
  await new Promise((r) => setTimeout(r, 200));
  return typeof window.PS.pageInit === 'function' && !!doc.querySelector('#copilotInput');
});

await check('spend-model: page wires pageInit (drag-to-reorder)', async () => {
  window.location.hash = '#/spend-model';
  await new Promise((r) => setTimeout(r, 200));
  return typeof window.PS.pageInit === 'function' && !!doc.querySelector('#spendEditor');
});

await new Promise((r) => setTimeout(r, 300));
console.log('--- summary ---');
console.log('checks failed:', bad);
console.log('total runtime errors captured:', errors.length);
if (errors.length) console.log('first errors:\n' + errors.slice(0, 8).join('\n'));
/* This used to exit 0 unconditionally: it printed "checks failed: 3" and
   still passed the QA gate. */
if (bad) {
  console.log('INTERACTIVE TESTS: FAIL');
  process.exit(1);
}
console.log('INTERACTIVE TESTS: PASS');
process.exit(0);
