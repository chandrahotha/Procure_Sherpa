import fs from 'node:fs';
import path from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';
const HTML = path.resolve('ProcureSherpa-v2.0.html');
const vc = new VirtualConsole();
vc.on('jsdomError', (e) => console.log('JSDOM ERR:', e.detail?.message || e.message));
const dom = await JSDOM.fromFile(HTML, {
  runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: vc,
  beforeParse(w) {
    w.matchMedia = w.matchMedia || (() => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
    w.scrollTo = () => {};
    w.HTMLElement.prototype.scrollIntoView = function () {};
  }
});
await new Promise((r) => setTimeout(r, 1200));
const w = dom.window;
console.log('PS_CALC:', (w.PS_CALC || []).length);
console.log('PS.data.calc:', (w.PS && w.PS.data ? w.PS.data.calc.length : 'n/a'));
console.log('byId calc-tco:', w.PS ? !!w.PS.byId('calc', 'calc-tco') : 'n/a');
console.log('PS.calcState?', typeof w.PS?.calcState);
console.log('route registered for calc?', Object.keys(w.PS?.routes || {}));
w.location.hash = '#/calc/calc-tco';
await new Promise((r) => setTimeout(r, 200));
const main = w.document.querySelector('#main, main') || w.document.body;
console.log('calc page text (200):', main.textContent.trim().slice(0, 200));
process.exit(0);
