/* Boot-time probe used by tools/perf_check.mjs.
   Loads the single-file artifact in jsdom and reports the wall time from
   just before the document is constructed to just after PS.boot() has
   finished. That covers HTML parsing, executing the inline script
   (building 234 content records, registering 43 routes) and rendering
   the first page, which is the application-side share of first paint.
   It does not include network transfer, which the byte budget covers. */
import fs from 'node:fs';
import { JSDOM, VirtualConsole } from 'jsdom';

const file = process.argv[2];
const html = fs.readFileSync(file, 'utf8');
const vc = new VirtualConsole();
const t0 = process.hrtime.bigint();
const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  url: 'https://localhost/',
  virtualConsole: vc,
  pretendToBeVisual: true
});
const w = dom.window;
let done = false;
function finish() {
  if (done) return;
  done = true;
  const t1 = process.hrtime.bigint();
  process.stdout.write(String(Number(t1 - t0) / 1e6));
  try { w.close(); } catch (e) { }
  process.exit(0);
}
w.document.addEventListener('DOMContentLoaded', () => { setTimeout(finish, 0); });
setTimeout(finish, 5000);
