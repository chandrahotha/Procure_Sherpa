/* ==========================================================
   Storage suite: the records have to survive the browser.

   Master §76 names fourteen checks under "Storage": save, load, delete,
   duplicate, rename, restore, corrupt backup, quota, favourites, recent
   items, checklist state, template state, the audit cap and "features that
   fail after refreshing the page". Before this file, `npm run qa` asserted
   almost none of them. test_interactive.mjs built a backup object and
   looked for section keys in it - which proves the exporter runs, not that
   a record can be written, read back, survived a reload, or refused when
   the file is hostile.

   So this suite is built around the two things only a storage test can do:

   1. Boot the artifact, write through the real API, and boot AGAIN from the
      bytes the first boot left in localStorage. A record that is gone after
      a refresh is not a record.
   2. Feed the restore path a file the user did not write. Procure Sherpa
      imports JSON from disk; that makes every object below a parser's
      output, and a parser's output merged into live state with `target[k]`
      is where a "__proto__" key stops being data and becomes the object's
      prototype.

   The quota case is real too: jsdom supports a storageQuota, so the
   QuotaExceededError branch of PS.store.set - the one that decides whether
   a user loses a calculation or gets told storage is full - is finally
   executed rather than assumed.
   ========================================================== */
import path from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';

const HTML = path.resolve('ProcureSherpa-v2.0.html');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let bad = 0;
let ran = 0;
const errors = [];

function bootOptions(seed, quota) {
  const vc = new VirtualConsole();
  vc.on('jsdomError', (e) => errors.push('jsdom: ' + (e.detail?.message || e.message)));
  vc.on('error', (...a) => errors.push('console.error: ' + a.map(String).join(' ')));
  const opts = {
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
    virtualConsole: vc,
    /* An https origin, not the file:// default. JSDOM.fromFile gives the
       window an opaque origin, at which window.localStorage throws
       SecurityError - so PS.storageOK comes back false, every write lands in
       the app's in-memory fallback, and a "persistence across a reload" test
       silently measures nothing. */
    url: 'https://localhost/',
    storageQuota: quota || 10485760,
    beforeParse(window) {
      window.matchMedia = window.matchMedia || (() => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }));
      window.scrollTo = () => {};
      window.HTMLElement.prototype.scrollIntoView = function () {};
      if (!window.print) window.print = () => {};
      window.URL.createObjectURL = () => 'blob:mock';
      window.URL.revokeObjectURL = () => {};
      for (const [k, v] of Object.entries(seed || {})) window.localStorage.setItem(k, JSON.stringify(v));
    }
  };
  return opts;
}

async function boot(seed, quota) {
  const dom = await JSDOM.fromFile(HTML, bootOptions(seed, quota));
  await sleep(1100);
  return dom;
}

/* Everything the first boot wrote, as the second boot must find it. */
function dumpStorage(dom) {
  const ls = dom.window.localStorage;
  const out = {};
  for (let i = 0; i < ls.length; i++) {
    const k = ls.key(i);
    if (k && k.startsWith('ps_')) out[k] = JSON.parse(ls.getItem(k));
  }
  return out;
}

async function check(name, fn) {
  ran++;
  const before = errors.length;
  try {
    const res = await fn();
    const newErrors = errors.slice(before);
    if (res === false || newErrors.length) {
      bad++;
      console.log('FAIL', name, newErrors.length ? '| ' + newErrors.slice(0, 2).join(' | ').slice(0, 200) : '');
    } else {
      console.log('ok  ', name);
    }
  } catch (e) {
    bad++;
    console.log('FAIL', name, '| throw:', String((e && e.message) || e).slice(0, 200));
  }
}

console.log('storage suite: ' + path.basename(HTML));

/* ---------- 1. saved work: the CRUD the UI offers ---------- */
const first = await boot();
const w = first.window;
const PS = w.PS;

await check('saved: add returns a record with an id and a type', () => {
  PS.store.set(PS.K.saved, []);
  const rec = PS.saved.add({ type: 'calc-tco', title: 'Pump tender TCO', notes: 'Supplier B cheaper over 5 years', data: { npv: 12400 } });
  return !!(rec && rec.id && rec.type === 'calc-tco' && rec.title === 'Pump tender TCO');
});
await check('saved: get reads the record back by id', () => {
  const id = PS.saved.list()[0].id;
  const rec = PS.saved.get(id);
  return !!rec && rec.data.npv === 12400;
});
await check('saved: rename changes the title and stamps modified', () => {
  const id = PS.saved.list()[0].id;
  const before = PS.saved.get(id).modified;
  const rec = PS.saved.rename(id, 'Pump tender TCO - final');
  return !!rec && rec.title === 'Pump tender TCO - final' && rec.id === id && rec.modified >= before;
});
await check('saved: update patches notes without touching the title', () => {
  const id = PS.saved.list()[0].id;
  const rec = PS.saved.update(id, { notes: 'Validated against the should-cost model' });
  return rec.title === 'Pump tender TCO - final' && rec.notes === 'Validated against the should-cost model';
});
await check('saved: duplicate makes a new id and keeps the data', () => {
  const id = PS.saved.list()[0].id;
  const copy = PS.saved.duplicate(id);
  return !!copy && copy.id !== id && copy.data.npv === 12400 && /\(copy\)$/.test(copy.title) && PS.saved.list().length === 2;
});
await check('saved: delete removes exactly one record', () => {
  const id = PS.saved.list()[0].id;
  PS.saved.remove(id);
  const list = PS.saved.list();
  return list.length === 1 && !PS.saved.get(id);
});
await check('saved: deleting an unknown id is a no-op, not a wipe', () => {
  PS.saved.remove('sv-nope');
  return PS.saved.list().length === 1;
});

/* ---------- 2. limits ---------- */
await check('saved: the 250-item cap refuses rather than silently dropping', () => {
  const filler = [];
  for (let i = 0; i < PS.MAX_SAVED; i++) filler.push({ id: 'sv_fill' + i, type: 'note', title: 'Filler ' + i, created: '', modified: '', tags: [], notes: '', data: {}, v: 1 });
  PS.store.set(PS.K.saved, filler);
  const rec = PS.saved.add({ type: 'note', title: 'One too many' });
  return rec === null && PS.saved.list().length === PS.MAX_SAVED;
});
await check('saved: the quote-comparison sub-cap counts only that type', () => {
  const quotes = [];
  for (let i = 0; i < PS.MAX_QUOTE_SAVED; i++) quotes.push({ id: 'sv_q' + i, type: 'quote-comparison', title: 'Quote ' + i, tags: [], notes: '', data: {}, v: 1 });
  PS.store.set(PS.K.saved, quotes);
  const blocked = PS.saved.add({ type: 'quote-comparison', title: '51st comparison' });
  const otherStillFits = PS.saved.add({ type: 'calc-tco', title: 'A TCO run is still allowed' });
  return blocked === null && !!otherStillFits;
});

/* ---------- 3. favourites and recent items ---------- */
await check('favourites: toggle adds, then removes', () => {
  PS.store.set(PS.K.fav, []);
  PS.fav.toggle('kb', 'tco', 'Total cost of ownership');
  const added = PS.fav.has('kb', 'tco') && PS.fav.list().length === 1;
  PS.fav.toggle('kb', 'tco', 'Total cost of ownership');
  return added && !PS.fav.has('kb', 'tco') && PS.fav.list().length === 0;
});
await check('favourites: the same id under two types is two favourites', () => {
  PS.store.set(PS.K.fav, []);
  PS.fav.toggle('calc', 'x', 'One');
  PS.fav.toggle('sop', 'x', 'Two');
  return PS.fav.list().length === 2;
});
await check('recents: newest first, and a repeat moves rather than duplicates', () => {
  PS.store.set(PS.K.recent, []);
  PS.recent.add('calc', 'a', 'Alpha');
  PS.recent.add('calc', 'b', 'Beta');
  PS.recent.add('calc', 'a', 'Alpha again');
  const list = PS.recent.list();
  return list.length === 2 && list[0].id === 'a' && list[1].id === 'b';
});

/* ---------- 4. checklist and template state ---------- */
await check('checklist state: save, read, reset', () => {
  PS.store.set(PS.K.cl, {});
  PS.clState.save('cl-rfq-preparation', { checked: { a: true, b: false }, notes: 'Sent to four suppliers' });
  const got = PS.clState.get('cl-rfq-preparation');
  const saved = got.notes === 'Sent to four suppliers' && got.checked.a === true && PS.clState.openCount() === 1;
  PS.clState.reset('cl-rfq-preparation');
  return saved && PS.clState.get('cl-rfq-preparation').notes === '';
});
await check('template state: save and read back a filled template', () => {
  PS.store.set(PS.K.tpl, {});
  PS.tplState.save('tpl-rfq', { values: { title: 'RFQ 88' }, notes: 'Draft' });
  const t = PS.tplState.get('tpl-rfq');
  return !!t && t.values.title === 'RFQ 88' && t.notes === 'Draft';
});

/* ---------- 5. the audit trail ---------- */
await check('audit: records events newest first', () => {
  PS.store.set(PS.K.audit, []);
  PS.audit('one', 'first');
  PS.audit('two', 'second');
  const log = PS.auditList();
  return log.length === 2 && log[0].e === 'two';
});
await check('audit: the 100-event cap holds under 250 writes', () => {
  PS.store.set(PS.K.audit, []);
  for (let i = 0; i < 250; i++) PS.audit('ev' + i, 'detail ' + i);
  const log = PS.auditList();
  return log.length === PS.AUDIT_MAX && log[0].e === 'ev249';
});
await check('audit: detail is truncated, not rejected', () => {
  PS.audit('long', 'x'.repeat(900));
  return PS.auditList()[0].d.length <= 240;
});

/* ---------- 6. workbench records ---------- */
await check('workbench: upsert into a collection that does not exist yet', () => {
  PS.store.set(PS.wb.KEY, {});
  PS.wb.load();
  const rec = PS.wb.upsert('suppliers', { id: 'sup-1', name: 'Kestrel Bearings', category: 'MRO' });
  const stored = PS.store.get(PS.wb.KEY, {});
  return !!rec && Array.isArray(stored.suppliers) && stored.suppliers.length === 1;
});
await check('workbench: upsert with an existing id updates in place', () => {
  PS.wb.upsert('suppliers', { id: 'sup-1', name: 'Kestrel Bearings Ltd', category: 'MRO' });
  PS.wb.upsert('suppliers', { id: 'sup-2', name: 'Delta Fasteners' });
  const list = PS.wb.list('suppliers');
  return list.length === 2 && PS.wb.get('suppliers', 'sup-1').name === 'Kestrel Bearings Ltd';
});
await check('workbench: remove takes one record', () => {
  PS.wb.remove('suppliers', 'sup-2');
  return PS.wb.list('suppliers').length === 1 && !PS.wb.get('suppliers', 'sup-2');
});

/* ---------- 7. a backup of everything, then the reload ---------- */
const backupOfFirst = PS.backupObject();
await check('backup: the exporter carries every section the store holds', () => {
  const needed = ['app', 'version', 'schema', 'exported', 'prefs', 'saved', 'favorites', 'recent',
    'checklists', 'templates', 'academy', 'audit', 'workbench', 'counts'];
  return needed.every((k) => backupOfFirst[k] !== undefined);
});

const seedForReload = dumpStorage(first);
await check('reload: the second boot is seeded only with what the first wrote', () => {
  return Object.keys(seedForReload).length > 0 && !!seedForReload[PS.K.saved];
});
await first.window.close();

const second = await boot(seedForReload);
const PS2 = second.window.PS;
await check('reload: saved work survives a refresh', () => {
  const list = PS2.saved.list();
  return list.length >= 2 && list.some((x) => x.title === 'A TCO run is still allowed');
});
await check('reload: workbench records survive a refresh', () => {
  const sup = PS2.wb.list('suppliers');
  return sup.length === 1 && sup[0].name === 'Kestrel Bearings Ltd';
});
await check('reload: the audit cap survives a refresh', () => {
  return PS2.auditList().length === PS.AUDIT_MAX;
});
await check('reload: the #/saved page renders the restored records', () => {
  second.window.location.hash = '#/saved';
  PS2.renderRoute();
  const main = second.window.document.querySelector('#main');
  return /TCO run is still allowed/.test(main.textContent);
});

/* ---------- 8. hostile and broken input ---------- */
await check('restore: a non-object is refused', () => {
  const v = PS2.validateBackup('just a string');
  return v.ok === false && !!v.error;
});
await check('restore: a file from another application is refused', () => {
  const v = PS2.validateBackup({ someOtherApp: true, data: [1, 2, 3] });
  return v.ok === false;
});
await check('restore: a newer schema than this build is refused', () => {
  const v = PS2.validateBackup({ app: PS2.APP, schema: PS2.SCHEMA + 5, saved: [] });
  return v.ok === false && /newer version/i.test(v.error);
});
await check('restore: corrupt JSON is refused by the parser before validation runs', () => {
  const res = PS2.safeJSON('{"app": "Procure Sherpa", "saved": [', 1024 * 1024);
  return res.ok === false && /not valid JSON/i.test(res.error);
});
await check('restore: an empty file is refused', () => {
  return PS2.safeJSON('   ', 1024 * 1024).ok === false;
});
await check('restore: an oversized file is refused before parsing', () => {
  const big = '{"app":"Procure Sherpa","saved":[' + '1'.repeat(200) + ']}';
  return PS2.safeJSON(big, 64).ok === false;
});

/* The one that matters: a backup file is the only JSON this app merges into
   live state, and JSON.parse makes "__proto__" an own property. Copying it
   with target[k] = v reaches the prototype setter.

   The prototype comparisons are against the *window's* Object.prototype, not
   the test's: jsdom runs the artifact in its own realm, and two realms have
   two distinct Object.prototype objects, so comparing across them fails a
   build that is perfectly safe. */
const realmObjectProto = second.window.Object.prototype;
await check('restore: a "__proto__" key in prefs does not become the object prototype', () => {
  const hostile = {
    app: PS2.APP,
    schema: 1,
    saved: [],
    prefs: JSON.parse('{"__proto__":{"taxRate":999,"injected":true},"theme":"dark"}'),
    checklists: JSON.parse('{"__proto__":{"pwned":1}}'),
    templates: {},
    favorites: [],
    recent: [],
    audit: [],
    academy: JSON.parse('{"__proto__":{"earned":true},"completed":{}}')
  };
  PS2.applyRestore(PS2.validateBackup(hostile).clean, 'merge', 'hostile.json');
  const p = PS2.prefs();
  const storedRaw = second.window.localStorage.getItem(PS2.K.prefs) || '';
  const cl = PS2.clState.all();
  return Object.getPrototypeOf(p) === realmObjectProto &&
    Object.getPrototypeOf(cl) === realmObjectProto &&
    p.taxRate !== 999 &&
    p.injected === undefined &&
    p.theme === 'dark' &&
    !Object.prototype.hasOwnProperty.call(realmObjectProto, 'injected') &&
    !Object.prototype.hasOwnProperty.call(realmObjectProto, 'pwned') &&
    storedRaw.indexOf('__proto__') < 0;
});
await check('restore: a "__proto__" key in a workbench collection is dropped', () => {
  const hostile = {
    app: PS2.APP, schema: 1, saved: [], favorites: [], recent: [], audit: [],
    prefs: {}, checklists: {}, templates: {},
    workbench: JSON.parse('{"__proto__":{"polluted":1},"suppliers":[{"id":"sup-9","name":"From file"}]}')
  };
  PS2.applyRestore(PS2.validateBackup(hostile).clean, 'merge', 'hostile.json');
  const data = PS2.wb.load();
  return Object.getPrototypeOf(data) === realmObjectProto &&
    !!PS2.wb.get('suppliers', 'sup-9') &&
    PS2.wb.get('suppliers', 'sup-9').polluted === undefined &&
    (second.window.localStorage.getItem(PS2.wb.KEY) || '').indexOf('__proto__') < 0;
});

await check('restore: the sanitizer returns plain objects, not re-prototyped ones', () => {
  /* Dropping the unsafe name is one thing; the copy step itself has to be
     the thing that drops it. PS.untrustedClone assigns with `out[k] = v`, so
     without the key test a hostile "__proto__" would replace the prototype of
     the object it was building - and the object would then look clean to
     Object.keys() while carrying the attacker's inheritance. Reading the
     prototype back is the only way to see that. */
  const hostile = {
    app: PS2.APP, schema: 1, saved: [], favorites: [], recent: [], audit: [],
    checklists: {}, templates: {},
    prefs: JSON.parse('{"__proto__":{"injected":true},"theme":"dark"}'),
    workbench: JSON.parse('{"__proto__":{"polluted":true},"suppliers":[]}')
  };
  const clean = PS2.validateBackup(hostile).clean;
  /* Array.isArray rather than a prototype comparison: the hostile value was
     parsed by this test's realm, and Array.prototype.slice hands the copy
     back to the prototype the source carried, so the two realms both answer
     "an array" while disagreeing about which Object.prototype is which. */
  return Object.getPrototypeOf(clean.prefs) === realmObjectProto &&
    Object.getPrototypeOf(clean.workbench) === realmObjectProto &&
    Array.isArray(clean.workbench.suppliers) &&
    !Object.prototype.hasOwnProperty.call(clean.prefs, 'injected');
});
await check('storage: a prefs object already poisoned on disk is not trusted', () => {
  /* The second vector, and the one the exporter cannot prevent: a
     localStorage written by an older build, a hand-edited profile or a
     different tool. PS.store.get parses it, PS.prefs() merges it, and the
     merge is `p[k] = stored[k]`. The sink guard has to hold even when the
     choke point never saw the value. */
  second.window.localStorage.setItem(PS2.K.prefs, '{"__proto__":{"injected":9,"taxRate":999},"theme":"dark"}');
  PS2._prefsCache = null;
  const p = PS2.prefs();
  /* The safe defaults still apply, so the guard is not "drop the whole
     object": the theme the file carried is kept and only the hostile key is
     refused. */
  return Object.getPrototypeOf(p) === realmObjectProto &&
    p.injected === undefined && p.taxRate !== 999 && p.theme === 'dark' && p.currency === 'USD';
});
await check('storage: a poisoned checklist map is not trusted either', () => {
  second.window.localStorage.setItem(PS2.K.cl, '{"__proto__":{"pwned":1},"cl-rfq-preparation":{"checked":{"a":true},"notes":"kept"}}');
  const all = PS2.clState.all();
  const state = PS2.clState.get('cl-rfq-preparation');
  return Object.getPrototypeOf(all) === realmObjectProto && state.checked.a === true && all.pwned === undefined;
});

/* ---------- 9. the round-trip: export, mutate, wipe, restore, read back ---------- */
await check('round-trip: merge restore brings back records that were deleted', () => {
  const snapshot = PS2.backupObject();
  PS2.store.set(PS.K.saved, []);
  PS2.store.set(PS.wb.KEY, {});
  PS2.wb.load();
  const v = PS2.validateBackup(snapshot);
  if (!v.ok) return false;
  PS2.applyRestore(v.clean, 'replace', 'roundtrip.json');
  const savedBack = PS2.saved.list().some((x) => x.title === 'A TCO run is still allowed');
  const supplierBack = PS2.wb.list('suppliers').length >= 1;
  const auditBack = PS2.auditList().length > 0;
  return savedBack && supplierBack && auditBack;
});
await check('round-trip: replace mode leaves nothing of the old state', () => {
  PS2.store.set(PS.wb.KEY, { suppliers: [{ id: 'sup-local', name: 'Local only' }] });
  PS2.wb.load();
  const snapshot = { app: PS2.APP, schema: PS2.SCHEMA, saved: [], favorites: [], recent: [], audit: [],
    checklists: {}, templates: {}, prefs: {}, academy: { completed: {}, badges: {}, scores: {} },
    workbench: { suppliers: [{ id: 'sup-file', name: 'From file' }] } };
  const v = PS2.validateBackup(snapshot);
  if (!v.ok) return false;
  PS2.applyRestore(v.clean, 'replace', 'replace.json');
  const ids = PS2.wb.list('suppliers').map((r) => r.id);
  return ids.length === 1 && ids[0] === 'sup-file';
});
await check('round-trip: merge mode keeps a local record and adds a file record', () => {
  PS2.store.set(PS.wb.KEY, { suppliers: [{ id: 'sup-local', name: 'Local only' }] });
  PS2.wb.load();
  const v = PS2.validateBackup({ app: PS2.APP, schema: PS2.SCHEMA, saved: [], favorites: [], recent: [],
    audit: [], checklists: {}, templates: {}, prefs: {},
    workbench: { suppliers: [{ id: 'sup-file', name: 'From file' }] } });
  PS2.applyRestore(v.clean, 'merge', 'merge.json');
  const ids = PS2.wb.list('suppliers').map((r) => r.id).sort();
  return ids.length === 2 && ids[0] === 'sup-file' && ids[1] === 'sup-local';
});
await check('round-trip: the restore is written to the audit trail', () => {
  const last = PS2.auditList().filter((e) => e.e === 'backup-restored')[0];
  return !!last && /merge from merge\.json/.test(last.d);
});

/* ---------- 10. storage that is full, and storage that is gone ---------- */
await second.window.close();

const tight = await boot({}, 4096);
const PST = tight.window.PS;
await check('quota: a write that will not fit returns false and warns instead of throwing', () => {
  PST.store.set(PST.K.saved, []);
  const huge = { type: 'note', title: 'Big', notes: 'x'.repeat(200000), data: {} };
  const rec = PST.saved.add(huge);
  return rec === null && !PST.saved.list().length;
});
await check('quota: the app still renders a page after the failed write', () => {
  tight.window.location.hash = '#/home';
  PST.renderRoute();
  return tight.window.document.querySelector('#main').textContent.length > 200;
});
await tight.window.close();

const noStore = await boot();
const PSN = noStore.window.PS;
await check('no storage: a session-only fallback still keeps the record in memory', () => {
  PSN.storageOK = false;
  PSN._mem = {};
  const rec = PSN.saved.add({ type: 'note', title: 'Session only' });
  const kept = PSN.saved.get(rec.id);
  PSN.storageOK = true;
  return !!kept && kept.title === 'Session only';
});

await check('recents: the list is capped at 24 entries', () => {
  PSN.store.set(PSN.K.recent, []);
  for (let i = 0; i < 40; i++) PSN.recent.add('kb', 'k' + i, 'Term ' + i);
  return PSN.recent.list().length === 24;
});
await check('storage: every key the app writes is one the usage panel counts', () => {
  PSN.store.set(PSN.K.saved, [{ id: 'sv_x', type: 'note', title: 'T', tags: [], notes: '', data: {}, v: 1 }]);
  PSN.store.set(PSN.K.academy, { completed: {}, scores: {}, badges: {} });
  PSN.store.set(PSN.K.labs, { lab1: { done: true } });
  PSN.store.set(PSN.K.assessment, { score: 80 });
  PSN.store.set(PSN.K.community, []);
  PSN.store.set(PSN.wb.KEY, { suppliers: [] });
  const counted = PSN.store.rawKeys();
  const owned = [PSN.K.saved, PSN.K.academy, PSN.K.labs, PSN.K.assessment, PSN.K.community, PSN.wb.KEY];
  const missing = owned.filter((k) => counted.indexOf(k) < 0);
  const bytes = PSN.store.bytes();
  /* bytes() walks rawKeys(), so a key that is not listed is also not
     measured - the Academy progress alone is a few kilobytes. */
  return missing.length === 0 && bytes > JSON.stringify({ a: 1 }).length;
});

await noStore.window.close();

/* ---------- summary ---------- */
const realErrors = errors.filter((e) => !/Not implemented|Could not parse CSS|jsdom: Error: Not implemented/i.test(e));
console.log('\n--- storage suite ---');
console.log('checks: ' + ran + ' run, ' + bad + ' failed');
if (realErrors.length) {
  console.log('runtime errors observed: ' + realErrors.length);
  realErrors.slice(0, 4).forEach((e) => console.log('  ' + e.slice(0, 180)));
  bad += 1;
}
console.log(bad ? '\nSTORAGE SUITE: FAIL (' + bad + ')' : '\nSTORAGE SUITE: PASS');
process.exit(bad ? 1 : 0);
