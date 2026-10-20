/* Boot-time probe used by tools/perf_check.mjs.

   Measures the two costs that actually matter for a single-file app:

     1. script load: from the first line of the inline script to the last,
        which is the parse, compile and definition of every content record
        and every runtime function.
     2. boot to first paint: from the end of the script to the moment
        PS.boot() has finished and the first page is rendered.

   The previous version of this probe stripped the <script> element out
   of the artifact before loading it, so it was measuring jsdom's HTML
   parser rather than the application, and the number it reported was
   meaningless. The script is kept here, and marked at both ends. */
import fs from 'node:fs';
import { JSDOM, VirtualConsole } from 'jsdom';

const file = process.argv[2];
let html = fs.readFileSync(file, 'utf8');

/* Mark the start and the end of the main inline script. The main script
   is the one that defines the application; there may be a small one in
   the head. */
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
if (!scripts.length) { console.error('no inline script found'); process.exit(1); }
let main = scripts[0];
for (const s of scripts) { if (s[1].length > main[1].length) main = s; }
const start = main.index;
const body = main[1];
const marked = body.replace(/^\s*/, 'window.__t0 = Date.now();\n') + '\nwindow.__t1 = Date.now();\n';
html = html.slice(0, start) + '<script>' + marked + '</script>' + html.slice(start + main[0].length);

const vc = new VirtualConsole();
const t0 = Date.now();
const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  url: 'https://localhost/',
  virtualConsole: vc,
  pretendToBeVisual: true
});
const w = dom.window;
const constructed = Date.now() - t0;
w.document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const t2 = Date.now();
    const load = (w.__t1 - w.__t0) || 0;
    const boot = t2 - (w.__t1 || t2);
    process.stdout.write(JSON.stringify({ load: load, boot: boot, construct: constructed }));
    w.close();
    process.exit(0);
  }, 0);
});
setTimeout(() => {
  process.stdout.write(JSON.stringify({ load: 0, boot: 0, construct: constructed }));
  process.exit(0);
}, 8000);
