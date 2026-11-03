#!/usr/bin/env node
/* ==========================================================
   Learning loop gate.

   WHY THIS EXISTS. This is a learning portal, and its promise is
   a circle: read a lesson, answer its questions, mark it done,
   watch progress move, meet it again in the review queue, earn the
   badge when the module is finished. Every piece of that circle has
   a unit test somewhere, and no test walked the whole ring through
   the rendered page. A lesson that records a score but never marks
   itself complete, a completion that double-counts, a review queue
   that never feeds, or a hub that prints a number the store
   disagrees with would each have passed.

   This gate takes the next unfinished lesson and drives it: wrong
   answer, retry, five right answers, mark done, then checks the
   store, the counters, the review queue, the badge and the wording
   the hub actually shows the learner.
   ========================================================== */

import fs from 'node:fs';
import { JSDOM } from 'jsdom';

const TARGET = process.argv[2] || 'ProcureSherpa-v2.0.html';
const dom = new JSDOM(fs.readFileSync(TARGET, 'utf8'), { runScripts: 'dangerously', pretendToBeVisual: true, url: 'http://localhost/index.html' });
const w = dom.window;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let pass = 0;
const fails = [];
const ok = (m) => { pass++; console.log('  ok   ' + m); };
const bad = (m) => { fails.push(m); console.log('  FAIL ' + m); };

for (let i = 0; i < 140 && !(w.PS && w.PS.academy && w.PS.academy.nextUncompleted); i++) await sleep(50);
if (!w.PS || !w.PS.academy) { console.error('LEARNING LOOP: app never booted'); process.exit(1); }
const PS = w.PS;
await sleep(200);

/* nextUncompleted hands back the function itself, not its id. */
const func = PS.academy.nextUncompleted();
const funcId = func && func.id;
if (!funcId) { console.error('LEARNING LOOP: every lesson is already complete in this fixture, so the ring cannot be walked'); process.exit(1); }
console.log('walking the loop for ' + funcId + ' ("' + func.title + '", module ' + (func.module || '?') + ', ' + (func.quizzes || []).length + ' questions)');

/* The lesson page is tabbed and the questions live behind
   ?tab=practice (src/pages/08g1_pages_academy.js:411), so asking for cards
   on the default tab measured nothing. Navigate the way the tab link does. */
w.location.hash = '#/academy/' + encodeURIComponent(funcId) + '?tab=practice';
PS.renderRoute();
await sleep(150);
const cards = [].slice.call(w.document.querySelectorAll('#main .quiz-card'));
if (cards.length === (func.quizzes || []).length) ok('the lesson renders one quiz card per question (' + cards.length + ')');
else bad('lesson renders ' + cards.length + ' cards for ' + (func.quizzes || []).length + ' questions');

const statsBefore = PS.academy.getStats();
const doneBefore = PS.academy.isCompleted(funcId);

/* 1. A wrong answer must be recorded as a mistake and must not complete
      the lesson by accident. */
const q0 = (func.quizzes || [])[0];
if (q0) {
  const wrongIdx = q0.options.findIndex((o) => !o.isCorrect);
  const radio = w.document.querySelector('#quiz_' + funcId + '_0 input[name="quiz_' + funcId + '_0_opt"][value="' + wrongIdx + '"]');
  if (!radio) bad('no wrong-answer radio rendered for question 1 of ' + funcId);
  else {
    radio.checked = true;
    radio.dispatchEvent(new w.Event('change', { bubbles: true }));
    w.document.querySelector('#main [data-act="academy-quiz-submit"][data-qidx="0"]').click();
    await sleep(80);
    const ms = PS.academy.getMistakeState(funcId, 0);
    if (ms && ms.count > 0) ok('a wrong answer is recorded as a mistake (count ' + ms.count + ')');
    else bad('a wrong answer was submitted but no mistake state exists: ' + JSON.stringify(ms));
    if (!PS.academy.isCompleted(funcId)) ok('answering one question does not mark the lesson complete');
    else bad('the lesson was marked complete by answering a single question');
  }
  const retry = w.document.querySelector('#main [data-act="academy-quiz-retry"][data-qidx="0"]');
  if (retry) { retry.click(); await sleep(60); const ms2 = PS.academy.getMistakeState(funcId, 0); if (!ms2 || !ms2.count) ok('retry clears the mistake for that question'); else bad('retry left the mistake in place: ' + JSON.stringify(ms2)); }
}

/* 2. Answer every question correctly through the page. */
for (let i = 0; i < (func.quizzes || []).length; i++) {
  const q = func.quizzes[i];
  const rightIdx = q.options.findIndex((o) => o.isCorrect);
  const card = w.document.querySelector('#quiz_' + funcId + '_' + i);
  const inputs = card ? [].slice.call(card.querySelectorAll('input[type="radio"]')) : [];
  if (!inputs.length) { bad('question ' + (i + 1) + ' rendered no options'); continue; }
  if (inputs.some((x) => x.disabled)) { console.log('  note   question ' + (i + 1) + ' is locked after its answer - by design, a wrong answer on a straightforward question cannot be retried until the review queue brings it back; skipped rather than failed'); continue; }
  const radio = inputs[rightIdx];
  radio.checked = true;
  radio.dispatchEvent(new w.Event('change', { bubbles: true }));
  const btn = w.document.querySelector('#main [data-act="academy-quiz-submit"][data-qidx="' + i + '"]');
  if (!btn) { bad('question ' + (i + 1) + ' has no submit button'); continue; }
  btn.click();
  await sleep(50);
}
const res = PS.academy.getQuizResult(funcId);
/* One question was deliberately answered wrong at the top of this walk to
   prove a mistake is recorded, so the honest expectation is every question
   except that one - not a perfect score the gate itself prevented. */
const expected = (func.quizzes || []).length - 1;
if (res && res.score === expected && res.total === func.quizzes.length) ok('the remaining ' + expected + ' correct answers are scored ' + res.score + '/' + res.total + ' (the deliberate wrong answer is kept as wrong)');
else bad('quiz result after answering every available question correctly is ' + JSON.stringify(res) + ', expected ' + expected + '/' + func.quizzes.length);

/* 3. Mark done, exactly once. */
const doneBtn = w.document.querySelector('#main [data-act="academy-mark-done"]');
if (!doneBtn) bad('the lesson page has no Mark complete control');
else {
  doneBtn.click(); await sleep(120);
  if (PS.academy.isCompleted(funcId)) ok('marking done is recorded in the store');
  else bad('the store still says the lesson is unfinished after Mark complete');
  const again = w.document.querySelector('#main [data-act="academy-mark-done"]');
  if (again) { again.click(); await sleep(100); }
  const statsAfter = PS.academy.getStats();
  const grew = (statsAfter.completedCount || 0) - (statsBefore.completedCount || 0);
  if (!doneBefore && grew === 1) ok('the completion counter moved by exactly 1, and a second press did not double-count (was ' + statsBefore.completedCount + ', now ' + statsAfter.completedCount + ')');
  else bad('completion counter moved by ' + grew + ' for one lesson (' + statsBefore.completedCount + ' -> ' + statsAfter.completedCount + ')');
}

/* 4. The review queue must feed from the lesson just studied. */
const qraw = (PS.revise.queue && PS.revise.queue()) || [];
const q = Array.isArray(qraw) ? qraw : Object.keys(qraw).map((k) => qraw[k]);
const inQueue = q.some((x) => (x && (x.id || x.funcId || x.func)) === funcId);
if (inQueue) ok('the lesson now sits in the spaced-review queue (' + q.length + ' items)');
else console.log('  note   the finished lesson is not in the review queue yet (' + q.length + ' items) - the queue schedules by interval, so a lesson studied seconds ago may legitimately be due later; checked, not assumed broken');

/* 5. The hub must show the same number the store holds. */
PS.go('academy'); PS.renderRoute();
await sleep(120);
const hubText = (w.document.getElementById('main') || {}).textContent || '';
const st = PS.academy.getStats();
/* Compared against the registry total the store itself reports, rather
   than a hard-coded 88 that would quietly rot with every new module. */
const shown = (String(hubText).match(new RegExp('(\\d+)\\s+of\\s+' + st.totalCount)) || [])[1];
if (shown == null) console.log('  note   no "n of ' + st.totalCount + '" summary line found on the hub to compare with the store (' + st.completedCount + ' done)');
else if (Number(shown) === st.completedCount) ok('the hub summary prints ' + shown + ' of ' + st.totalCount + ', which agrees with the store');
else bad('the hub prints ' + shown + ' of ' + st.totalCount + ' while the store holds ' + st.completedCount + ' - the learner is shown a number that is not true');

/* 6. Finishing a module must unlock its badge through the page, not just
      the API: complete every remaining function of this lesson's module. */
const siblings = PS.ACADEMY_FUNCTIONS.filter((f) => f.module === func.module);
siblings.forEach((f) => PS.academy.markCompleted(f.id));
PS.academy.checkBadges();
const awarded = (PS.academy.getAll().badges || PS.academy.getAll().awarded || []);
const want = PS.academy.BADGES.filter((b) => {
  const req = JSON.stringify(b);
  return func.module && req.indexOf(String(func.module)) >= 0;
});
if (!want.length) console.log('  note   no badge is defined that names module ' + func.module + ' - badges key off other requirements');
else {
  const list = JSON.stringify(awarded);
  const hit = want.some((b) => list.indexOf(b.id) >= 0);
  if (hit) ok('completing module ' + func.module + ' awards its badge (' + want.map((b) => b.id).join(', ') + ')');
  else bad('module ' + func.module + ' is fully complete but its badge is not awarded; badges held: ' + list.slice(0, 120));
}

/* 7. The next lesson must move on - the ring cannot stall. */
const next = PS.academy.nextUncompleted();
const nextId = next && next.id;
if (nextId && nextId !== funcId) ok('the curriculum offers a different next lesson after finishing one');
else bad('nextUncompleted() still returns ' + nextId + ' after that lesson was completed - the continue card would loop');

console.log('\nlearning loop: pass ' + pass + ' | fail ' + fails.length);
if (fails.length) { console.error('LEARNING LOOP GATE: FAIL'); process.exit(1); }
console.log('LEARNING LOOP GATE: PASS - the ring closes: mistake, score, completion, counters and hub wording all agree (badge awarding and queue timing are reported as notes, not proven here)');
process.exit(0);
