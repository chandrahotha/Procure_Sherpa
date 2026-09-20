/* ==========================================================
   Content integrity gate + Academy quiz engine test.

   This file used to print what it observed and then exit 0 no matter
   what it found, which meant "content QA" appeared in the QA suite
   without ever being able to fail it. Every observation below is now an
   assertion, and the process exits non-zero if any of them fail.

   Two things are checked:

   1. CONTENT INTEGRITY - PS.contentQA() over every registered item:
      titles, descriptions (per type - see PS.DESC_FIELDS) and
      relationship targets that resolve. Any finding fails the build.

   2. QUIZ ENGINE - the escalating-difficulty / one-mistake coaching
      flow, driven end to end: wrong answer -> tip appears and the
      flawed choice is marked -> second attempt -> recovery feedback.

   Usage: node tools/test_quiz_tips.mjs   (or: npm run test:content)
   ========================================================== */
import { JSDOM } from 'jsdom';

const HTML = process.argv[2] || 'ProcureSherpa-v2.0.html';

let pass = 0;
const failures = [];

function check(label, condition, detail) {
  if (condition) { pass++; return true; }
  failures.push(label + (detail ? ' - ' + detail : ''));
  return false;
}

const dom = await JSDOM.fromFile(HTML, { runScripts: 'dangerously', resources: 'usable' });
await new Promise((r) => setTimeout(r, 800));
const win = dom.window;
const PS = win.PS;

/* ---------- 1. content integrity ---------- */
console.log('--- content integrity ---');

if (!check('PS is available on the page', !!PS)) {
  console.error('FAIL: the bundle did not initialise; nothing else can be checked.');
  process.exit(1);
}

const problems = PS.contentQA();
check('content QA reports no problems', problems.length === 0,
  problems.length + ' problem(s):\n    ' + problems.slice(0, 20).join('\n    '));

/* Every registered type must be covered by the description map, or items
   of that type are silently never checked. */
const types = Object.keys(PS.data).filter((t) => (PS.data[t] || []).length);
const uncovered = types.filter((t) => !PS.DESC_FIELDS[t]);
check('every content type is covered by PS.DESC_FIELDS', uncovered.length === 0,
  'uncovered: ' + uncovered.join(', '));

const counts = types.map((t) => t + '=' + PS.data[t].length).join(' ');
console.log('registered: ' + counts);
console.log('forward references pruned from view: ' + (PS.PRUNED_REFS || 0));

/* ---------- 2. quiz engine ---------- */
console.log('--- academy quiz engine: escalating difficulty + 1-mistake tip ---');

win.location.hash = '#/academy/func-mission-value?tab=practice';
await new Promise((r) => setTimeout(r, 200));

const card0 = win.document.querySelector('.quiz-card');
if (!check('practice tab renders a quiz card', !!card0)) {
  report();
}

const diff = card0.getAttribute('data-diff');
check('quiz card carries a difficulty level', !!diff, 'data-diff=' + diff);

const diffTag = card0.querySelector('.quiz-diff-tag');
check('difficulty badge is rendered', !!diffTag && diffTag.textContent.trim().length > 0);

const optRadios = card0.querySelectorAll('input[type="radio"]');
check('question offers at least 3 options', optRadios.length >= 3, optRadios.length + ' options');

/* Answer incorrectly (option 0 is the flawed "refuse flatly" choice). */
optRadios[0].checked = true;
const submitBtn = card0.querySelector('button[data-act="academy-quiz-submit"]');
check('submit button is present', !!submitBtn);
submitBtn.click();
await new Promise((r) => setTimeout(r, 150));

const tipBox = win.document.querySelector('.quiz-tip-box');
check('a coaching tip appears after the first mistake', !!tipBox);
if (tipBox) {
  const title = tipBox.querySelector('.quiz-tip-title');
  const text = tipBox.querySelector('.quiz-tip-text');
  check('tip has a title', !!title && title.textContent.trim().length > 0);
  check('tip has substantive body text', !!text && text.textContent.trim().length > 40,
    'length ' + (text ? text.textContent.trim().length : 0));
}

check('the flawed choice is marked on the card', !!win.document.querySelector('.is-flawed-attempt'));

/* Second attempt with the correct answer. */
const cardAfterTip = win.document.getElementById(card0.id);
if (check('the quiz card survives re-render after a wrong answer', !!cardAfterTip)) {
  const newRadios = cardAfterTip.querySelectorAll('input[type="radio"]');
  check('options are still selectable on attempt 2', newRadios.length >= 3);
  newRadios[2].checked = true;

  const submit2 = cardAfterTip.querySelector('button[data-act="academy-quiz-submit"]');
  if (check('attempt-2 submit button is present', !!submit2)) {
    check('attempt-2 button tells the user it is attempt 2',
      /attempt 2/i.test(submit2.textContent), 'label: ' + submit2.textContent.trim());
    submit2.click();
    await new Promise((r) => setTimeout(r, 150));

    const feedback = win.document.getElementById(card0.id).querySelector('.feedback-headline');
    check('recovery feedback is shown after the corrected answer', !!feedback);
    if (feedback) {
      check('recovery feedback acknowledges the correction',
        /recovery|correct|great/i.test(feedback.textContent),
        'headline: ' + feedback.textContent.trim());
    }
  }
}

report();

function report() {
  console.log('--- summary ---');
  console.log('assertions passed: ' + pass);
  console.log('assertions failed: ' + failures.length);
  if (failures.length) {
    console.log('');
    failures.forEach((f) => console.log('  FAIL ' + f));
    console.log('');
    console.log('CONTENT/QUIZ GATE: FAIL');
    process.exit(1);
  }
  console.log('CONTENT/QUIZ GATE: PASS');
  process.exit(0);
}
