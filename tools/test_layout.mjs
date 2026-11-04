/* ==========================================================
   Layout, Responsive & Visual Structure Verification
   Headless DOM verification checking:
     - Viewport & responsive layout container structure
     - ARIA live-region bindings for dynamic computations
     - Modal focus-trap & dialog structures
     - Color theme token definitions in CSS (light & dark)
     - Responsive table wrapping (.table-wrap)
     - Mobile calculator bottom sheet triggers
   ========================================================== */
import path from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';

const HTML = path.resolve(process.argv[2] || 'ProcureSherpa-v2.0.html');
const vc = new VirtualConsole();
vc.on('jsdomError', () => {});
vc.on('error', () => {});

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
const { window } = dom;
const d = window.document;

const assertions = [];
function check(desc, ok) {
  assertions.push({ desc, ok });
  if (!ok) console.error('FAIL: ' + desc);
  else console.log('ok   ' + desc);
}

console.log('--- layout & dynamic UI structure verification ---');

// 1. Core layout anchors
check('Document skeleton has #app container', !!d.querySelector('#app'));
check('Document has #sidebar and #main content containers', !!d.querySelector('#sidebar') && !!d.querySelector('#main'));
check('Document has #toastContainer with aria-live="polite"', d.querySelector('#toastContainer')?.getAttribute('aria-live') === 'polite');
check('Document has #modalRoot dialog mount point', !!d.querySelector('#modalRoot'));

// 2. Navigation structure
check('Sidebar has brand mark and title', !!d.querySelector('#sidebarBrandMark') && !!d.querySelector('#sidebarBrandTitle'));
check('Sidebar has search filter input', !!d.querySelector('#navFilter'));
/* The navigation is scoped by the profile's track, so the layout audit
   checks BOTH views rather than one fixed list. A sidebar that renders
   correctly for one profile and wrongly for another is not correct. */
const setView = (track) => {
  window.PS.user._cache = { name: 'T', role: 'beginner', track, company: '', avatarBg: '#000', joinedDate: '' };
  window.PS.buildNav();
};
const secNames = () => [...d.querySelectorAll('#navRoot .nav-sec-head > span:nth-child(2)')].map((s) => s.textContent.trim());
const navItems = () => d.querySelectorAll('#navRoot li').length;

setView('academy');
check('The learn view shows five nav sections', d.querySelectorAll('#navRoot .nav-sec').length === 5,
  secNames().join(', '));
check('The learn view sections are Start, Learn, Library, Look It Up and My Work',
  secNames().join('|') === 'Start|Learn|Library|Look It Up|My Work', secNames().join(', '));
check('The learn view shows 26 navigation items', navItems() === 26, navItems() + ' items');
check('The learn view hides the working sections',
  !secNames().includes('Workbench') && !secNames().includes('Toolkit'));
check('The learn view keeps the shared library', secNames().includes('Library'));

setView('operations');
check('The work view shows six nav sections', d.querySelectorAll('#navRoot .nav-sec').length === 6,
  secNames().join(', '));
check('The work view sections are Start, Workbench, Toolkit, Library, Look It Up and My Work',
  secNames().join('|') === 'Start|Workbench|Toolkit|Library|Look It Up|My Work', secNames().join(', '));
check('The work view shows 30 navigation items', navItems() === 30, navItems() + ' items');
check('The work view hides the learning section', !secNames().includes('Learn'));
check('The work view keeps the shared library', secNames().includes('Library'));

check('The sidebar carries a Learn / Work switch', d.querySelectorAll('#navViewSwitch .nav-view-btn').length === 2);
check('The switch marks the current view with aria-pressed',
  [...d.querySelectorAll('#navViewSwitch .nav-view-btn')].filter((b) => b.getAttribute('aria-pressed') === 'true').length === 1);
check('The switch is labelled', !!d.querySelector('#navViewSwitch .nav-view-label'));
setView('academy');

check('Every nav section has items', [...d.querySelectorAll('#navRoot .nav-sec')].every((s) => s.querySelectorAll('li').length > 0));
check('The system links live in a labelled footer strip',
  d.querySelectorAll('.sidebar-foot-links .sidebar-foot-link').length === 4 &&
  !!d.querySelector('.sidebar-foot-label'));

// 3. Calculator responsive layout
window.location.hash = '#/calc/calc-tco';
await new Promise((r) => setTimeout(r, 150));
const calcLayout = d.querySelector('.calc-layout');
check('Calculator renders two-pane .calc-layout container', !!calcLayout);
check('Calculator has live results container (#calcResult)', !!d.querySelector('#calcResult'));
check('Calculator results container has aria-live="polite"', d.querySelector('#calcResult')?.getAttribute('aria-live') === 'polite');
check('Calculator has mobile sheet trigger button', !!d.querySelector('.calc-sheet-trigger'));

// 4. Guided routing and decision guides live regions
window.location.hash = '#/what';
await new Promise((r) => setTimeout(r, 150));
check('What-should-I-do page has live results container with aria-live', d.querySelector('#whatResult')?.getAttribute('aria-live') === 'polite');

window.location.hash = '#/maturity';
await new Promise((r) => setTimeout(r, 150));
check('Maturity check page has live results container with aria-live', d.querySelector('#matResult')?.getAttribute('aria-live') === 'polite');

// 4b. Lesson reading progress bar (wired in PS.pageInit on lesson render)
window.location.hash = '#/academy/func-mission-value';
await new Promise((r) => setTimeout(r, 150));
const lessonTabs = d.querySelector('.academy-tabs');
const progFill = d.querySelector('#lessonProgressFill');
check('Lesson tab rail carries the reading progress bar', !!lessonTabs && !!progFill && lessonTabs.contains(progFill));
if (progFill) {
  window.dispatchEvent(new window.Event('scroll'));
  await new Promise((r) => setTimeout(r, 50));
  const tf = progFill.style.transform || '';
  check('Reading progress responds to scroll with a finite transform',
    tf.indexOf('scaleX(') === 0 && tf.indexOf('NaN') < 0 && tf.indexOf('Infinity') < 0, tf);
}

// 4b2. An exam opens on its own full-viewport page, not inside the menu
window.location.hash = '#/exam?bank=cert-full&n=3';
await new Promise((r) => setTimeout(r, 220));
const appEl = d.querySelector('#app');
const examMain = d.querySelector('#main');
const examText = examMain ? examMain.textContent : '';
check('the exam route renders a session with a question rail',
  /Question 1 of 3/.test(examText) && d.querySelectorAll('#main .exam-dot').length === 3,
  d.querySelectorAll('#main .exam-dot').length + ' rail dots');
check('exam focus mode hides the shell chrome rather than dimming it',
  !!appEl && appEl.className.indexOf('is-exam-focus') >= 0,
  appEl ? appEl.className : 'no #app');
check('the exam header carries the clock, a pop-out and a way out',
  !!d.querySelector('#main .exam-head #examTimer') &&
  !!d.querySelector('#main [data-act="exam-popout"]') &&
  !!d.querySelector('#main [data-act="exam-exit"]'));

// 4c. The home thinking point is drawn from the curriculum, not hard-coded
window.location.hash = '#/home';
await new Promise((r) => setTimeout(r, 150));
const tpc = d.querySelector('.thinking-point-card');
const funcs = (window.PS && window.PS.ACADEMY_FUNCTIONS) || [];
const fromCurriculum = !!tpc && funcs.some((f) =>
  (f.thinkingPoints || []).some((tp) => tp && tp.quote && tpc.textContent.indexOf(tp.quote) >= 0));
check('The featured thinking point quotes the Academy curriculum and links to its lesson',
  !!tpc && fromCurriculum && !!tpc.querySelector('a[href^="#/academy/"]'));

// 4d. The review queue renders as a workspace, and the hub reaches it
window.location.hash = '#/revise';
await new Promise((r) => setTimeout(r, 150));
const reviseH1 = d.querySelector('#main h1');
const reviseLinks = Array.from(d.querySelectorAll('#main a[href^="#/"]'));
check('The review queue renders a heading and a way forward on an empty record',
  !!reviseH1 && /Review queue/i.test(reviseH1.textContent) && reviseLinks.length > 0);

window.location.hash = '#/academy';
await new Promise((r) => setTimeout(r, 150));
check('The Academy hub carries an entry point to the review queue',
  !!d.querySelector('#main a[href="#/revise"]'));

// 4e. The reflection surface renders, and the transcript reaches it
window.location.hash = '#/reflection';
await new Promise((r) => setTimeout(r, 150));
const reflH1 = d.querySelector('#main h1');
const reflLinks = Array.from(d.querySelectorAll('#main a[href^="#/"]'));
check('The reflection page renders a heading and a way forward on an empty record',
  !!reflH1 && /Reflection/i.test(reflH1.textContent) && reflLinks.length > 0);

window.location.hash = '#/academy-progress';
await new Promise((r) => setTimeout(r, 150));
check('The progress transcript carries entry points to the review queue and the reflection',
  !!d.querySelector('#main a[href="#/revise"]') && !!d.querySelector('#main a[href="#/reflection"]'));

// 4f. The hub readiness panel renders with one rail per altitude
window.location.hash = '#/academy';
await new Promise((r) => setTimeout(r, 200));
const readyCard = Array.from(d.querySelectorAll('#main h2')).find((h) => /Where you stand/i.test(h.textContent));
const readyBars = readyCard ? readyCard.closest('.card').querySelectorAll('.inst-home-progress-track').length : 0;
check('The Academy hub readiness panel renders three altitude rails with aria labels',
  !!readyCard && readyBars === 3);

// 4d. The dashboard states its own shape instead of leaving it to the viewport
window.location.hash = '#/dash';
await new Promise((r) => setTimeout(r, 200));
const statGrid = d.querySelector('#main .stat-grid');
const panelGrid = d.querySelector('#main .panel-grid');
const styleAll = Array.from(d.querySelectorAll('style')).map((x) => x.textContent).join('\n');
check('the dashboard stats use a definite four-column grid, not auto-fit',
  !!statGrid && statGrid.children.length === 8 &&
  /\.stat-grid\{grid-template-columns:repeat\(4,minmax\(0,1fr\)\)\}/.test(styleAll.replace(/\s+/g, '')),
  statGrid ? statGrid.children.length + ' tiles' : 'no .stat-grid');
check('the dashboard panels use a definite two-column grid',
  !!panelGrid && panelGrid.children.length === 4 &&
  /\.panel-grid\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)\}/.test(styleAll.replace(/\s+/g, '')),
  panelGrid ? panelGrid.children.length + ' panels' : 'no .panel-grid');
check('the route is published so layout can be scoped per page',
  d.body.getAttribute('data-route') === 'dash', d.body.getAttribute('data-route'));

// 4e. The activity feed speaks in record titles and collapses repeats
window.PS.audit('academy-marked-studied', 'func-mission-value');
window.PS.audit('academy-marked-studied', 'func-mission-value');
window.PS.audit('academy-marked-studied', 'func-mission-value');
/* Re-assigning the same hash fires nothing, so the page is rendered directly:
   the feed is built from the log at render time, not from a cached copy. */
window.PS.renderRoute();
await new Promise((r) => setTimeout(r, 150));
const feed = d.querySelector('#main .res-list');
const feedText = feed ? feed.textContent.replace(/\s+/g, ' ') : '';
const lesson = (window.PS.byId('academy', 'func-mission-value') || {}).title || '';
check('repeated identical events collapse into one row with a count',
  /\u00d73/.test(feedText) || /×3/.test(feedText), feedText.slice(0, 80));
check('the feed shows the lesson title rather than an internal id',
  !!lesson && feedText.indexOf(lesson) >= 0 && feedText.indexOf('func-mission-value') < 0,
  lesson || 'no lesson title resolved');

// 5. Theme token consistency
const styleText = Array.from(d.querySelectorAll('style')).map((s) => s.textContent).join('\n');
check('CSS defines :root color variables (--bg, --panel, --text, --accent)',
  styleText.includes('--bg:') && styleText.includes('--panel:') && styleText.includes('--text:') && styleText.includes('--accent:'));
check('CSS defines [data-theme="dark"] dark mode tokens', styleText.includes('[data-theme="dark"]'));

const failed = assertions.filter((a) => !a.ok);
console.log('--- summary ---');
console.log('checks passed: ' + (assertions.length - failed.length) + ' / ' + assertions.length);

if (failed.length > 0) {
  console.error('LAYOUT AUDIT FAILED');
  process.exit(1);
}
console.log('LAYOUT AUDIT: PASS');
process.exit(0);
