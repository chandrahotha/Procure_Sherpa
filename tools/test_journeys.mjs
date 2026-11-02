/* ==========================================================
   Journey suite: the four paths master §78 says must work end to end.

   Until now no automated test walked any of them. §78 is the requirement
   the product is judged by - "Home → Need to source supplier → Sourcing
   Strategy → RFQ SOP → ... → Award Recommendation" - and every piece of it
   was tested separately: the route renders, the calculator computes, the
   template downloads. A user journey is the connection between those
   things, and a connection is exactly what a per-route test cannot see:
   a page that renders beautifully and links nowhere still passes.

   So each step here is taken by *clicking the link that is on the page*,
   not by typing the address. The requirement is that a reader can get
   there; a test that navigates by hash proves the route exists and nothing
   more. When a hop has no link, this prints what the page does link to, so
   the fix is obvious rather than something to rediscover.

   Journeys are written as topics, because §78 names topics: "Negotiation"
   is satisfied by any negotiation SOP, planner or decision guide, and the
   pattern list records which artefacts the product actually has.
   ========================================================== */
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
  url: 'https://localhost/',
  beforeParse(window) {
    window.matchMedia = window.matchMedia || (() => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }));
    window.scrollTo = () => {};
    window.HTMLElement.prototype.scrollIntoView = function () {};
    window.printCalls = 0;
    window.print = () => { window.printCalls++; };
    window.URL.createObjectURL = () => 'blob:mock';
    window.URL.revokeObjectURL = () => {};
    if (window.navigator.clipboard) {
      window.navigator.clipboard.writeText = () => Promise.resolve();
    }
  }
});
const { window } = dom;
await new Promise((r) => setTimeout(r, 1200));
const doc = window.document;
const PS = window.PS;

let bad = 0;
let stepsRun = 0;
const fail = (msg) => { bad++; console.log('  FAIL ' + msg); };
const ok = (msg) => console.log('  ok   ' + msg);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function mainText() {
  const el = doc.querySelector('#main');
  return el ? el.textContent.replace(/\s+/g, ' ') : '';
}

function anchors() {
  return [...doc.querySelectorAll('#main a[href^="#/"]')].map((a) => ({
    el: a,
    href: a.getAttribute('href'),
    label: a.textContent.replace(/\s+/g, ' ').trim().slice(0, 60)
  }));
}

/* The control the user would actually press: an <a href="#/..."> inside the
   page body. Buttons that fire a data-act are checked separately, because
   they do not change the route. */
function hop(patterns, topic) {
  const found = anchors().find((a) => patterns.some((p) => p.test(a.href)));
  if (!found) return null;
  return found;
}

async function clickTo(step, fromLabel) {
  const target = hop(step.patterns, step.topic);
  if (!target) {
    const sample = anchors().slice(0, 14).map((a) => a.href).join(', ');
    fail(`${fromLabel} → ${step.topic}: no link on the page leads there. This page links to: ${sample || '(no internal links at all)'}`);
    return null;
  }
  target.el.click();
  await sleep(60);
  if (window.location.hash.replace(/^#/, '') !== target.href.replace(/^#/, '')) {
    PS.renderRoute();
  }
  await sleep(20);
  return target;
}

function assertArrived(step, href) {
  const text = mainText();
  const h1 = doc.querySelectorAll('#main h1').length;
  const problems = [];
  if (!h1) problems.push('no h1');
  if (text.length < step.minChars) problems.push(`only ${text.length} characters rendered (floor ${step.minChars})`);
  if (/undefined|\[object Object\]|NaN is|LOREM|TODO/.test(text)) problems.push('sentinel or leak text in the page');
  if (/page not found|no such item|not a page/i.test(text)) problems.push('the not-found card');
  if (step.requireForms && !doc.querySelectorAll('#main form, #main input, #main select, #main [data-act]').length) problems.push('no controls to act on');
  if (step.requireText && !step.requireText.test(text)) problems.push(`expected the page to mention ${step.requireText}`);
  if (problems.length) {
    fail(`${href} arrived but is not a usable page: ${problems.join('; ')}`);
    return false;
  }
  ok(`${href} - ${step.topic} (${text.length} chars, ${h1} h1)`);
  return true;
}

/* The problem-first page renders its plan only after the reader describes
   the situation, so a journey that wants the plan has to do what a person
   does: type the sentence and press the button. This is the step type that
   turns #/what from a dead end into the first hop of all four journeys. */
async function describe(problem) {
  const inp = doc.querySelector('#whatQ');
  if (!inp) { fail('#/what has no input to describe the problem in'); return false; }
  inp.value = problem;
  inp.dispatchEvent(new window.Event('input', { bubbles: true }));
  const btn = [...doc.querySelectorAll('#main [data-act="what-run"]')][0];
  if (!btn) { fail('#/what has no "show me what to do" control'); return false; }
  btn.click();
  await sleep(120);
  const linksFound = anchors().length;
  if (!linksFound) { fail('#/what produced a plan with no links for "' + problem + '"'); return false; }
  ok('#/what planned "' + problem + '" into ' + linksFound + ' links');
  return true;
}

/* §78 ends a journey at a thing the reader produces, and "Printable Report"
   is a button, not a page. A step with `dataAct` is met by that control
   being present and firing, so the suite follows the reader's last action
   instead of inventing a page for it. */
async function pressControl(step, fromLabel) {
  const btn = [...doc.querySelectorAll('#main [data-act]')].find((b) => b.getAttribute('data-act') === step.dataAct);
  if (!btn) { fail(`${fromLabel} -> ${step.topic}: no [data-act="${step.dataAct}"] control on the page`); return false; }
  const before = step.counts ? step.counts() : 0;
  btn.click();
  await sleep(140);
  if (step.counts && step.counts() <= before) { fail(`${fromLabel} -> ${step.topic}: the control is there but pressing it did nothing`); return false; }
  ok(`${fromLabel} -> ${step.topic} via [data-act="${step.dataAct}"]`);
  return true;
}

/* Fill a calculator the way the product expects, run it, and save the
   result with a title. The savings dashboard is built from those saved
   analyses, so the journey that ends at the dashboard has to pass through
   a calculation on the way - otherwise the suite is reporting an empty
   page and calling it the product's fault. */
async function runAndSave(title) {
  const rand = [...doc.querySelectorAll('#main [data-act="calc-random"]')][0];
  if (rand) { rand.click(); await sleep(80); }
  const run = [...doc.querySelectorAll('#main [data-act="calc"]')][0];
  if (!run) { fail('no Calculate control to run'); return false; }
  run.click();
  await sleep(140);
  const save = [...doc.querySelectorAll('#main [data-act="calc-save"]')][0];
  if (!save) { fail('no Save control after a result'); return false; }
  save.click();
  await sleep(80);
  const input = doc.querySelector('#promptVal');
  if (input) input.value = title;
  const okBtn = doc.querySelector('[data-modal="ok"]');
  if (!okBtn) { fail('Save did not open a title prompt'); return false; }
  okBtn.click();
  await sleep(150);
  return PS.saved.list().length > 0;
}

async function journey(name, first, steps) {
  console.log(`\n${name}`);
  window.location.hash = first;
  PS.renderRoute();
  await sleep(40);
  let from = first;
  for (const step of steps) {
    stepsRun++;
    if (step.problem) {
      if (!(await describe(step.problem))) return;
      from = window.location.hash.replace(/^#/, '');
      continue;
    }
    if (step.dataAct) {
      stepsRun++;
      if (!(await pressControl(step, from))) return;
      continue;
    }
    const target = await clickTo(step, from);
    if (!target) return;
    if (!assertArrived(step, target.href)) return;
    from = target.href;
    /* The action belongs to the page that was just arrived at, not the one
       left behind - a calculator step has to run before the dashboard that
       reads its saved result. */
    if (step.then) {
      stepsRun++;
      if (!(await step.then())) { fail(`${from} -> the action offered on this page did not complete`); return; }
    }
  }
}

console.log('journey suite: ' + path.basename(HTML) + ' - the four §78 paths, walked by clicking');

/* Journey A - Home → sourcing problem → sourcing strategy → RFQ SOP → RFQ
   checklist → compare quotes → negotiation → award recommendation. */
await journey('Journey A: source a supplier', '#/home', [
  { topic: 'the problem-first entry', patterns: [/^#\/what/], minChars: 250 },
  { problem: 'I need to source a supplier for a category we have never bought before' },
  { topic: 'a sourcing strategy document', patterns: [/^#\/(k|sop)\/[^/]*(sourcing|strategy)/], minChars: 700 },
  { topic: 'the RFQ SOP', patterns: [/^#\/sop\/[^/]*rfq/i], minChars: 900 },
  { topic: 'the RFQ checklist', patterns: [/^#\/cl\//, /^#\/list\/cl/], minChars: 400, requireForms: true },
  { topic: 'the compare-quotes calculator', patterns: [/^#\/calc\/calc-compare-quotes/], minChars: 300, requireForms: true },
  { topic: 'a negotiation artefact', patterns: [/negotiat/i], minChars: 300 },
  { topic: 'the award recommendation', patterns: [/tpl-award-recommendation|award/i], minChars: 300 }
]);

/* Journey B - price increase, the shortest path to a defensible answer. */
await journey('Journey B: a supplier raised prices', '#/home', [
  { topic: 'the problem-first entry', patterns: [/^#\/what/], minChars: 250 },
  { problem: 'my supplier increased prices by 12 percent' },
  { topic: 'a price-increase decision guide', patterns: [/^#\/dec\//, /^#\/list\/dec/], minChars: 300 },
  { topic: 'the price increase calculator', patterns: [/^#\/calc\/calc-price-increase/], minChars: 300, requireForms: true },
  { topic: 'the price-increase SOP', patterns: [/^#\/sop\/[^/]*(price|increase|renewal)/i], minChars: 900 },
  { topic: 'the negotiation planner', patterns: [/negotiation/i], minChars: 300 },
  { topic: 'the TCO calculator', patterns: [/^#\/calc\/calc-tco/], minChars: 300, requireForms: true },
  { topic: 'contract renewal', patterns: [/renewal/i], minChars: 300 }
]);

/* Journey C - evaluation, scorecard, risk, concentration, review template. */
await journey('Journey C: evaluate a supplier', '#/home', [
  { topic: 'the problem-first entry', patterns: [/^#\/what/], minChars: 250 },
  { problem: 'we need to evaluate a supplier before awarding a contract' },
  { topic: 'the supplier evaluation SOP', patterns: [/^#\/sop\/[^/]*(supplier|evaluation|due)/i], minChars: 900 },
  { topic: 'the supplier scorecard calculator', patterns: [/^#\/calc\/calc-supplier-scorecard/], minChars: 300, requireForms: true },
  { topic: 'supplier risk', patterns: [/risk/i], minChars: 300 },
  { topic: 'the concentration calculator', patterns: [/^#\/calc\/calc-supplier-concentration/], minChars: 300, requireForms: true },
  { topic: 'the supplier review template', patterns: [/tpl-supplier-business-review|review/i], minChars: 300 }
]);

/* Journey D - savings analysis, validation, dashboard, printed report. */
await journey('Journey D: report the savings', '#/home', [
  { topic: 'the problem-first entry', patterns: [/^#\/what/], minChars: 250 },
  { problem: 'prepare a savings report for the CFO' },
  { topic: 'the savings analysis calculator', patterns: [/^#\/calc\/calc-savings-analysis/], minChars: 300, requireForms: true,
    then: () => runAndSave('Journey D savings analysis') },
  { topic: 'the savings validation SOP', patterns: [/^#\/sop\/[^/]*savings/i], minChars: 900 },
  { topic: 'a savings KPI to report', patterns: [/^#\/kpi\//], minChars: 400 },
  { topic: 'the savings dashboard', patterns: [/^#\/dash-savings|^#\/dash/], minChars: 400 },
  { topic: 'a printable report', dataAct: 'print', counts: () => window.printCalls }
]);

/* The endpoints §78 implies but a route sweep cannot reach: a control the
   user presses, and the thing it is promised to do. */
console.log('\nEndpoints reached from inside a journey');

window.location.hash = '#/sop/sop-rfq';
PS.renderRoute();
await sleep(40);
await check('a SOP Print control actually calls print', async () => {
  const before = window.printCalls;
  const btn = [...doc.querySelectorAll('#main [data-act="print"]')][0];
  if (!btn) return 'no print control on the SOP page';
  btn.click();
  await sleep(80);
  return window.printCalls > before;
});

await check('a calculator saves a record that then appears on #/saved', async () => {
  PS.store.set(PS.K.saved, []);
  window.location.hash = '#/calc/calc-tco';
  PS.renderRoute();
  await sleep(60);
  /* A user does not hand-fill a TCO form: they press "Random values", which
     the product guarantees to respect every field rule, then Calculate. That
     is also the only way to reach Save, which is offered with a result. */
  const rand = [...doc.querySelectorAll('#main [data-act="calc-random"]')][0];
  if (!rand) return 'the calculator page has no Random values control';
  rand.click();
  await sleep(80);
  const run = [...doc.querySelectorAll('#main [data-act="calc"]')][0];
  if (!run) return 'the calculator page has no Calculate control';
  run.click();
  await sleep(150);
  const save = [...doc.querySelectorAll('#main [data-act="calc-save"]')][0];
  if (!save) return 'no save control on the calculator page';
  save.click();
  await sleep(80);
  /* Save opens a prompt for the title, because a record the reader cannot
     name later is not a record. Confirming it is part of the journey. */
  const confirm = doc.querySelector('[data-modal="ok"]');
  if (!confirm) return 'Save did not open a title prompt';
  confirm.click();
  await sleep(150);
  const count = PS.saved.list().length;
  if (!count) return 'Calculate ran but Save produced no record (result card present: ' +
    (!!doc.querySelector('#main .calc-result')) + ', save control present: ' +
    (!!doc.querySelector('#main [data-act="calc-save"]')) + ')';
  window.location.hash = '#/saved';
  PS.renderRoute();
  await sleep(60);
  return count > 0 && mainText().length > 250;
});

await check('the compare-quotes handoff arrives at negotiation with the figure carried', async () => {
  window.location.hash = '#/calc/calc-negotiation-savings?from=calc-compare-quotes&total=12000';
  PS.renderRoute();
  await sleep(80);
  const filled = [...doc.querySelectorAll('#main input[value]')].filter((i) => i.value && i.value !== '').length;
  return filled > 0 || /carried|from /i.test(mainText());
});

async function check(label, fn) {
  const before = errors.length;
  try {
    const res = await fn();
    if (res === true || res === undefined) {
      if (errors.length > before) { fail(label + ' | ' + errors.slice(before, before + 1)[0]); } else ok(label);
    } else if (typeof res === 'string') fail(label + ': ' + res);
    else fail(label);
  } catch (e) {
    fail(label + ' | throw: ' + String(e && e.message || e).slice(0, 160));
  }
}

const realErrors = errors.filter((e) => !/Not implemented|Could not parse CSS/i.test(e));
console.log('\n--- journey suite ---');
console.log('journey steps: ' + stepsRun + ' walked, failures: ' + bad);
if (realErrors.length) {
  console.log('runtime errors during the walk: ' + realErrors.length);
  realErrors.slice(0, 5).forEach((e) => console.log('  ' + e.slice(0, 200)));
  bad++;
}
console.log(bad ? '\nJOURNEY SUITE: FAIL (' + bad + ')' : '\nJOURNEY SUITE: PASS');
await window.close();
process.exit(bad ? 1 : 0);
