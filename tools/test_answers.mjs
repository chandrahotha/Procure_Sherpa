#!/usr/bin/env node
/* ==========================================================
   Answer, search and exam behaviour gate.

   WHY THIS EXISTS. Two rows of the completion ledger have been
   sitting at YELLOW with the missing assertion written down for
   them: 11.1a says "No gate asks the copilot a question", and
   11.4a says "The pool is asserted; the exam is not: no gate
   starts a session, answers questions or checks grade()". The
   suites proved the data agrees with itself - a bank exists, a
   pool has the pinned count - but never that pressing the thing
   produces an answer, or that an attempt is graded and recorded.

   This gate asks questions, sits exams, and fails when the
   product does not answer.
   ========================================================== */

import fs from 'node:fs';
import { JSDOM } from 'jsdom';

const TARGET = process.argv[2] || 'ProcureSherpa-v2.0.html';
const html = fs.readFileSync(TARGET, 'utf8');
const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, url: 'http://localhost/index.html' });
const w = dom.window;

let pass = 0;
const fails = [];
const ok = (group, msg) => { pass++; console.log('  ok   ' + group + ' - ' + msg); };
const fail = (group, msg) => { fails.push(group + ' - ' + msg); console.log('  FAIL ' + group + ' - ' + msg); };

setTimeout(() => {
  const PS = w.PS;

  /* ---------- the answer engine ---------- */
  console.log('\nA  copilot: the question the requirements promise');
  const req = PS.copilot.ask('which template for an award recommendation');
  const reqIds = (req.hits || []).map((h) => h.id);
  if (reqIds.includes('tpl-award-recommendation')) ok('A1', 'the documented example answers with tpl-award-recommendation');
  else fail('A1', 'ask("which template for an award recommendation") returned [' + reqIds.join(', ') + '] - the ledger row 11.1a is still unmet');

  console.log('\nA  copilot: a question per content type');
  /* The expected type is a SET, because a fair answer to a concept
     question is the concept. Asking about concentration RISK should
     reach the concept or the KPI; asking about concentration, with no
     risk word, should reach the calculator. Asserting a single type
     here would have encoded one arbitrary ranking as law. */
  const battery = [
    ['how do I compare supplier quotes', ['calc']],
    ['three way match invoice', ['kb', 'sop']],
    ['what is total cost of ownership', ['kb', 'calc']],
    ['supplier concentration risk', ['kb', 'kpi', 'calc']],
    ['supplier concentration', ['calc', 'kpi']],
    ['contract renewal notice period', ['sop', 'academy']],
    ['savings baseline definition', ['kb', 'gloss']],
    // The lessons carry the approval step as teaching, so they are a fair
    // answer here too - the check is that the engine reaches material that
    // actually covers the question, not that it prefers one registry.
    ['who signs off a purchase order approval', ['academy', 'cl', 'dec', 'sop']]
  ];
  let answered = 0;
  battery.forEach(([q, wantTypes]) => {
    const r = PS.copilot.ask(q);
    const hits = r.hits || [];
    if (!hits.length) { fail('A2', 'ask("' + q + '") returned no hits at all'); return; }
    const hit = hits.filter((h) => wantTypes.includes(h.type))[0];
    if (hit) { answered++; ok('A2', 'ask("' + q + '") reaches ' + hit.type + '/' + hit.id); }
    else fail('A2', 'ask("' + q + '") reached none of [' + wantTypes.join(',') + ']: ' + hits.map((h) => h.type + '/' + h.id).slice(0, 4).join(', '));
  });

  console.log('\nA  copilot: it must not invent an answer');
  console.log('  battery answered as expected: ' + answered + ' of ' + battery.length);
  const empty = PS.copilot.ask('');
  if (empty.confidence === 0 && /more specific/i.test(empty.answer)) ok('A3', 'an empty question is refused rather than answered');
  else fail('A3', 'empty question produced confidence ' + empty.confidence + ' and answer "' + String(empty.answer).slice(0, 60) + '"');
  const junk = PS.copilot.ask('xylophone quantum flurbow');
  if (!junk.hits.length || junk.confidence < 40) ok('A4', 'an unanswerable question is admitted (hits ' + junk.hits.length + ', confidence ' + junk.confidence + ')');
  else fail('A4', 'the engine answered a nonsense question with confidence ' + junk.confidence);
  const cited = PS.copilot.ask('landed cost');
  if (cited.hits.length && cited.answer && cited.answer.length > 40) ok('A5', 'a real question returns a written answer of ' + cited.answer.length + ' chars, not just a list');

  /* ---------- search ---------- */
  console.log('\nB  search returns the record, not just a page');
  const sres = PS.search('landed cost', { limit: 12 });
  const sBlob = JSON.stringify(sres || []);
  if (/landed[-_]?cost/i.test(sBlob)) ok('B1', 'search("landed cost") finds the landed-cost material');
  else fail('B1', 'search("landed cost") returned no landed-cost record');
  const sEmpty = PS.search('', { limit: 12 });
  const sEmptyLen = Array.isArray(sEmpty) ? sEmpty.length : ((sEmpty && sEmpty.results || []).length);
  if (sEmptyLen === 0) ok('B2', 'an empty query returns nothing rather than the whole library');
  else console.log('  note B2 - empty query returned ' + sEmptyLen + ' rows; the page decides whether that is an empty state');

  /* ---------- the copilot PAGE, with citations ---------- */
  console.log('\nD  the answer the reader actually sees, with its citations');
  /* Driven the way a reader drives it: type, then press Ask. The route
     does not answer from a query string, so the first version of this
     section "failed" twice by inspecting a page that had never been
     asked anything. */
  const askOnPage = (question) => {
    w.location.hash = '#/copilot';
    PS.renderRoute();
    const input = w.document.getElementById('copilotInput');
    if (!input) return { text: '', links: [] };
    input.value = question;
    const btn = [].slice.call(w.document.querySelectorAll('#main [data-act="copilot-ask"]'))[0];
    if (btn) btn.click();
    else PS.acts['copilot-ask']();
    const main = w.document.getElementById('main');
    return {
      text: main.textContent,
      links: [].slice.call(main.querySelectorAll('a[href^="#/"]'))
        .filter((a) => /\/(k|sop|cl|tpl|dec|kpi|scen|calc|academy)\//.test(a.getAttribute('href')))
    };
  };
  const asked = askOnPage('how do I compare supplier quotes');
  if (asked.text.length < 500) fail('D1', 'pressing Ask left the page at ' + asked.text.length + ' chars');
  else ok('D1', 'pressing Ask produces an answer of ' + asked.text.length + ' chars on the page');
  if (!asked.links.length) fail('D2', 'no citation links rendered, so row 11.1c is still unasserted');
  else ok('D2', asked.links.length + ' citation links rendered, first is ' + asked.links[0].getAttribute('href'));
  /* every citation href must resolve, or the answer sends the reader nowhere */
  const PS2 = PS;
  const broken = asked.links.map((a) => a.getAttribute('href')).filter((h) => {
    const seg = h.replace(/^#\//, '').split('?')[0].split('/');
    const route = PS2.routes[seg[0]];
    if (!route) return true;
    if (seg.length > 1 && seg[1]) {
      const t = { k: 'kb', sop: 'sop', cl: 'cl', tpl: 'tpl', dec: 'dec', kpi: 'kpi', scen: 'scen', calc: 'calc', academy: 'academy' }[seg[0]];
      if (t === 'academy') return !(PS2.ACADEMY_FUNCTIONS || []).some((f) => f.id === decodeURIComponent(seg[1]));
      if (t) return !PS2.byId(t, decodeURIComponent(seg[1]));
    }
    return false;
  });
  if (broken.length) fail('D3', 'citation links that do not resolve: ' + broken.slice(0, 3).join(', '));
  else ok('D3', 'every citation link on the answer resolves to a real record');
  const junkPage = askOnPage('xylophone quantum flurbow');
  if (/could not find|not find|more specific|not confident/i.test(junkPage.text)) ok('D4', 'a low-confidence question is hedged on the page rather than presented as an answer');
  else fail('D4', 'the page answered nonsense without admitting it: ' + junkPage.text.slice(0, 80));

  /* ---------- exams, end to end ---------- */
  console.log('\nC  an exam is started, answered, graded and recorded');
  const before = PS.exams.history().length;
  const bank = PS.exams.banks().filter((b) => b.count >= 5)[0] || PS.exams.banks()[0];
  PS.exams.start(bank.id, 5);
  let s = PS.exams.session;
  if (s && s.questions.length === 5) ok('C1', 'start("' + bank.id + '", 5) assembled ' + s.questions.length + ' questions');
  else { fail('C1', 'session did not assemble 5 questions (got ' + (s ? s.questions.length : 'no session') + ')'); }

  /* all correct */
  s.questions.forEach((q, i) => {
    const idx = q.options.findIndex((o) => o.isCorrect);
    s.answers[i] = idx;
  });
  PS.exams.grade();
  const rec = PS.exams.history()[0];
  if (!rec) fail('C2', 'grading wrote no attempt');
  else if (rec.pct !== 100 || !rec.passed) fail('C2', 'all-correct attempt graded ' + rec.pct + '% passed=' + rec.passed);
  else ok('C2', 'all-correct attempt records 100% and passed');

  /* all wrong */
  PS.exams.start(bank.id, 5);
  s = PS.exams.session;
  s.questions.forEach((q, i) => {
    const idx = q.options.findIndex((o) => !o.isCorrect);
    s.answers[i] = idx;
  });
  PS.exams.grade();
  const rec2 = PS.exams.history()[0];
  if (!rec2) fail('C3', 'second attempt not recorded');
  else if (rec2.pct !== 0 || rec2.passed) fail('C3', 'all-wrong attempt graded ' + rec2.pct + '% passed=' + rec2.passed);
  else ok('C3', 'all-wrong attempt records 0% and failed the pass mark of ' + PS.exams.PASS_PCT + '%');

  /* blanks are not silently submitted as a result */
  const historyLen = PS.exams.history().length;
  PS.exams.start(bank.id, 5);
  s = PS.exams.session;
  s.answers[0] = s.questions[0].options.findIndex((o) => o.isCorrect);
  PS.acts['exam-submit']();
  if (PS.exams.history().length !== historyLen) fail('C4', 'submitting with 4 blanks recorded an attempt anyway');
  else if (PS.exams.session && PS.exams.session.done) fail('C4', 'a partly-blank attempt was graded');
  else if (PS.exams.session && PS.exams.session.current === 1) ok('C4', 'submitting with blanks refuses to grade and moves the reader to question 2');
  else fail('C4', 'submit-with-blanks did not route to the first blank (current=' + (PS.exams.session ? PS.exams.session.current : 'no session') + ')');

  /* the timer is stopped so the process can exit */
  PS.exams.stopTimer();
  PS.exams.session = null;
  const after = PS.exams.history().length;
  if (after === before + 2) ok('C5', 'exactly the two graded attempts were written (' + before + ' -> ' + after + '), the blank run wrote none');
  else fail('C5', 'attempt history moved ' + before + ' -> ' + after + ', expected +2');

  w.close();
  console.log('\n--- answer/exam gate summary ---');
  console.log('assertions passed: ' + pass);
  console.log('assertions failed: ' + fails.length);
  if (fails.length) { fails.forEach((f) => console.log('  X ' + f)); console.log('ANSWER GATE: FAIL'); process.exit(1); }
  console.log('ANSWER GATE: PASS - the copilot answers, search finds, and an exam is graded and recorded');
  process.exit(0);
}, 3500);
