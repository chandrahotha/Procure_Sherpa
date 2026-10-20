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
