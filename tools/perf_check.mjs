/* ==========================================================
   Performance budget checker
   Tracks the single-file bundle against hard budgets and
   reports parse-sensitive metrics:
     - raw HTML size (KB) vs budget
     - script payload size (after stripping markup) vs budget
     - estimated first-parse cost (characters of JS)
     - payload breakdown: CSS / JS / markup
   Fails (exit 1) when a HARD budget is exceeded.
   ========================================================== */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const HTML = path.join(ROOT, 'ProcureSherpa-v2.0.html');

/* Budgets - single-file app: HTML bytes are the load cost. */
const BUDGET = {
  htmlKB: 1600,   // hard ceiling (current ~1252 KB)
  scriptKB: 1300, // JS payload ceiling
  cssKB: 300,     // CSS payload ceiling
  warnHtmlKB: 1400
};

const html = fs.readFileSync(HTML, 'utf8');

/* split out <style> and <script> payloads */
const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/g) || [];
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/g) || [];
const cssBytes = cssMatch.join('').replace(/<\/?style>/g, '').length;
const scriptBytes = scriptMatch.join('').replace(/<\/?script>/g, '').length;

const kb = (n) => (n / 1024).toFixed(1) + ' KB';
const report = {
  htmlKB: html.length / 1024,
  scriptKB: scriptBytes / 1024,
  cssKB: cssBytes / 1024,
  markupKB: (html.length - cssBytes - scriptBytes) / 1024,
  bootScriptChars: scriptBytes,
};

console.log('--- performance budget: ' + path.basename(HTML) + ' ---');
console.log('total HTML:        ' + kb(html.length) + ' (budget ' + BUDGET.htmlKB + ' KB)');
console.log('  script payload:  ' + kb(scriptBytes) + ' (budget ' + BUDGET.scriptKB + ' KB)');
console.log('  css payload:     ' + kb(cssBytes) + ' (budget ' + BUDGET.cssKB + ' KB)');
console.log('  markup:          ' + kb(html.length - cssBytes - scriptBytes));
console.log('  JS parse chars:  ' + scriptBytes.toLocaleString());

let fail = 0;
if (report.htmlKB > BUDGET.htmlKB) { console.log('  FAIL html budget'); fail = 1; }
if (report.scriptKB > BUDGET.scriptKB) { console.log('  FAIL script budget'); fail = 1; }
if (report.cssKB > BUDGET.cssKB) { console.log('  FAIL css budget'); fail = 1; }
if (report.htmlKB > BUDGET.warnHtmlKB) console.log('  WARN approaching html budget (' + BUDGET.warnHtmlKB + ' KB)');

console.log(fail ? '\nPERF BUDGET: FAIL' : '\nPERF BUDGET: PASS');
process.exit(fail);