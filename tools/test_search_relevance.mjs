#!/usr/bin/env node
/* ==========================================================
   Search relevance gate.

   WHY THIS EXISTS. §76's Search block was the last one this
   ledger still called untested, and the answer gate only asked
   search one question. Search is how a reader finds anything in a
   315-record library, so a ranking that quietly degrades - a type
   dropping out of the index, a stop-word query returning the whole
   library, a result linking to a record that no longer exists - is
   invisible to every other check, because each of those still
   renders a page.

   The expectations are deliberately about the top few results, not
   the single first one: this product documents that it ranks by
   reach and recency, and pinning position zero would encode one
   arbitrary ordering as law.
   ========================================================== */

import fs from 'node:fs';
import { JSDOM } from 'jsdom';

const TARGET = process.argv[2] || 'ProcureSherpa-v2.0.html';
const dom = new JSDOM(fs.readFileSync(TARGET, 'utf8'), { runScripts: 'dangerously', pretendToBeVisual: true, url: 'http://localhost/index.html' });
const w = dom.window;
let pass = 0;
const fails = [];
const ok = (m) => { pass++; console.log('  ok   ' + m); };
const bad = (m) => { fails.push(m); console.log('  FAIL ' + m); };

setTimeout(() => {
  const PS = w.PS;
  const search = (q, o) => PS.search(q, o || { limit: 20 });
  const ids = (r) => (r.results || []).map((x) => x.type + '/' + x.id);

  console.log('\nS  a term that names a record finds that record');
  const EXACT = [
    ['total cost of ownership', ['calc/calc-tco', 'kb/c-total-cost-of-ownership', 'kb/total-cost-of-ownership']],
    ['landed cost', ['calc/calc-landed-cost']],
    ['supplier concentration', ['calc/calc-supplier-concentration', 'kpi/kpi-supplier-concentration']],
    ['three way match', ['kb/c-three-way-match']],
    ['make or buy', ['dec/make-or-buy']],
    ['savings baseline', ['kb/savings-baseline']],
    ['economic order quantity', ['gloss/gloss-eoq']]
  ];
  EXACT.forEach(([q, want]) => {
    const r = search(q);
    const got = ids(r);
    const hit = want.find((want1) => got.indexOf(want1) >= 0);
    if (hit) ok('"' + q + '" reaches ' + hit + ' (position ' + (got.indexOf(hit) + 1) + ' of ' + got.length + ')');
    else bad('"' + q + '" did not reach any of [' + want.join(', ') + ']; top results: ' + got.slice(0, 4).join(', ') + ' (total ' + r.total + ')');
  });

  console.log('\nS  every registry is searchable');
  const TYPES = [
    ['kb', 'spend analysis'],
    ['sop', 'rfq'],
    ['cl', 'checklist'],
    ['tpl', 'template'],
    ['dec', 'decision'],
    ['kpi', 'kpi'],
    ['calc', 'calculator'],
    ['scen', 'scenario'],
    ['gloss', 'glossary'],
    ['academy', 'negotiation']
  ];
  TYPES.forEach(([type, q]) => {
    const r = search(q);
    const found = (r.results || []).some((x) => x.type === type);
    if (found) ok('searching "' + q + '" returns a ' + type + ' record');
    else bad('searching "' + q + '" returned no ' + type + ' record at all: ' + ids(r).slice(0, 5).join(', '));
  });

  console.log('\nS  the query is treated as text, not as a typed key');
  const upper = search('TCO');
  const lower = search('tco');
  if (ids(upper).slice(0, 5).join(',') === ids(lower).slice(0, 5).join(',') && ids(upper).length) ok('case does not change the answer (TCO / tco)');
  else bad('case changes the results: TCO -> ' + ids(upper).slice(0, 3).join(',') + ' | tco -> ' + ids(lower).slice(0, 3).join(','));
  const padded = search('  landed   cost  ');
  if (ids(padded).length && ids(padded).slice(0, 3).join(',').indexOf(ids(search('landed cost')).slice(0, 3).join(',')) === 0) ok('strange spacing does not lose the answer');
  else bad('whitespace changes the answer: "  landed   cost  " -> ' + ids(padded).slice(0, 3).join(', '));

  console.log('\nS  nothing sensible is returned for nothing sensible');
  const empty = search('');
  if (empty.total === 0 && empty.results.length === 0) ok('an empty query returns nothing rather than the library');
  else bad('an empty query returned ' + empty.total + ' results');
  const stops = search('the and of a to in');
  if (stops.total < PS.buildIndex().length * 0.5) ok('a stop-word-only query does not dump the whole library (' + stops.total + ' results)');
  else bad('a stop-word-only query returned ' + stops.total + ' of ' + PS.buildIndex().length + ' records');
  const nonsense = search('qqzzxxy plorb');
  if (nonsense.total <= 3) ok('a nonsense query returns ' + nonsense.total + ' results rather than pretending');
  else bad('a nonsense query returned ' + nonsense.total + ' results: ' + ids(nonsense).slice(0, 5).join(', '));

  console.log('\nS  every result leads somewhere real');
  const broad = ['contract', 'risk', 'price', 'supplier', 'savings', 'budget', 'forecast', 'inventory'];
  const seen = new Set();
  const broken = [];
  broad.forEach((q) => {
    search(q).results.forEach((x) => {
      const key = x.type + '/' + x.id;
      if (seen.has(key)) return;
      seen.add(key);
      if (x.type === 'academy') { if (!(PS.ACADEMY_FUNCTIONS || []).some((f) => f.id === x.id)) broken.push(key); return; }
      /* A command is a real result with a real route, not a registry
         record - PS.byId cannot resolve it and the search page links it
         by route instead, so the honest check is that the route exists. */
      if (x.type === 'command') { if (!x.route || !PS.routes[x.route.replace(/^#\//, '').split('/')[0]]) broken.push(key + ' (route)'); return; }
      if (!PS.byId(x.type, x.id)) broken.push(key);
    });
  });
  if (broken.length) bad(broken.length + ' search result(s) point at records that do not exist: ' + broken.slice(0, 5).join(', '));
  else ok(seen.size + ' distinct results across eight queries, every one resolving to a real record');

  const limited = search('supplier', { limit: 5 });
  if ((limited.results || []).length <= 5) ok('the limit option is respected (' + limited.results.length + ' of ' + limited.total + ' matches for "supplier")');
  else bad('limit 5 returned ' + limited.results.length + ' results');

  console.log('\n--- search relevance gate summary ---');
  console.log('assertions passed: ' + pass);
  console.log('assertions failed: ' + fails.length);
  if (fails.length) { console.log('SEARCH RELEVANCE GATE: FAIL'); w.close(); process.exit(1); }
  console.log('SEARCH RELEVANCE GATE: PASS - named records are findable, every registry answers, and every result resolves');
  w.close();
  process.exit(0);
}, 3500);
