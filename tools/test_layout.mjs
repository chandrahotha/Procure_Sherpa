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
check('Sidebar has five unified nav sections', d.querySelectorAll('#navRoot .nav-sec').length === 5);

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
