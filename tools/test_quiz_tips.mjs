import { JSDOM } from 'jsdom';

const dom = await JSDOM.fromFile('ProcureSherpa-v2.0.html', { runScripts: 'dangerously', resources: 'usable' });
await new Promise(r => setTimeout(r, 800));
const win = dom.window;
const PS = win.PS;

console.log('--- Testing Escalating Difficulty & 1-Mistake Tip Engine ---');
win.location.hash = '#/academy/func-mission-value?tab=practice';
await new Promise(r => setTimeout(r, 200));

const card0 = win.document.querySelector('.quiz-card');
console.log('Q0 Difficulty Attribute:', card0.getAttribute('data-diff'));
const diffTag = card0.querySelector('.quiz-diff-tag');
console.log('Q0 Diff Badge:', diffTag ? diffTag.textContent : 'none');

// Select option 0 (incorrect: Refuse flatly)
const optRadios = card0.querySelectorAll('input[type="radio"]');
console.log('Available options count:', optRadios.length);
optRadios[0].checked = true;
console.log('Selected option 0 (incorrect choice)');

// Click submit
const submitBtn = card0.querySelector('button[data-act="academy-quiz-submit"]');
submitBtn.click();
await new Promise(r => setTimeout(r, 150));

// Check if tip box rendered on 1st mistake
const tipBox = win.document.querySelector('.quiz-tip-box');
console.log('Tip Box Present after 1st mistake:', !!tipBox);
if (tipBox) {
  console.log('Tip Title:', tipBox.querySelector('.quiz-tip-title').textContent);
  console.log('Tip Content:', tipBox.querySelector('.quiz-tip-text').textContent.substring(0, 100));
}

const flawedOpt = win.document.querySelector('.is-flawed-attempt');
console.log('Flawed choice marked:', !!flawedOpt);

// Now select option 2 (correct choice: Engage the Director constructively)
const cardAfterTip = win.document.getElementById(card0.id);
const newRadios = cardAfterTip.querySelectorAll('input[type="radio"]');
newRadios[2].checked = true;
console.log('Selected option 2 (correct choice)');

const submitAttempt2 = cardAfterTip.querySelector('button[data-act="academy-quiz-submit"]');
console.log('Attempt 2 button label:', submitAttempt2 ? submitAttempt2.textContent : 'none');
submitAttempt2.click();
await new Promise(r => setTimeout(r, 150));

// Verify recovery feedback
const cardRecovered = win.document.getElementById(card0.id);
const feedback = cardRecovered.querySelector('.feedback-headline');
console.log('Final Feedback Headline:', feedback ? feedback.textContent : 'none');
process.exit(0);
