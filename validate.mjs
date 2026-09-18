/* Procure Sherpa build validator
   Usage: node validate.mjs "path\to\ProcureSherpa-v2.0.html"
   Compiles the inline script (syntax only, safe: no execution),
   reports registrations and checks the document skeleton.        */
import fs from 'node:fs';
import vm from 'node:vm';

const file = process.argv[2];
if (!file) { console.error('usage: node validate.mjs <html file>'); process.exit(2); }
const src = fs.readFileSync(file, 'utf8');
let fail = 0;

const m = src.match(/<script>([\s\S]*?)<\/script>/);
if (!m) { console.error('FAIL: no inline <script> block found'); process.exit(1); }
const js = m[1];

try { new vm.Script(js, { filename: 'inline.js' }); console.log('OK   JS syntax compiles (' + js.length + ' chars)'); }
catch (e) { console.error('FAIL JS syntax: ' + e.message); fail = 1; }

const need = ['<!DOCTYPE html>', '<html lang="en"', '<title>', '</style>', '<body>', 'id="navRoot"',
  'id="main"', 'id="toastContainer"', 'id="modalRoot"', '</script>', '</body>', '</html>'];
need.forEach(function (s) { if (src.indexOf(s) < 0) { console.error('FAIL missing document part: ' + s); fail = 1; } });
console.log('OK   document skeleton present (' + (src.length / 1024).toFixed(1) + ' KB)');

const counts = {};
['PS_KB', 'PS_SOPS', 'PS_CL', 'PS_TPL', 'PS_DEC', 'PS_KPI', 'PS_GLOSS', 'PS_SCEN', 'PS_CALC', 'PS_HELP']
  .forEach(function (t) {
    counts[t] = (js.match(new RegExp('\\b' + t + '\\.push\\(', 'g')) || []).length;
  });
console.log('INFO content registrations: ' + JSON.stringify(counts));

const routes = js.match(/PS\.route\('([a-z0-9\-]+)'/g) || [];
const seen = {}, dupes = [];
routes.forEach(function (r) {
  const name = r.replace(/PS\.route\('/, '').replace(/'$/, '');
  if (seen[name]) dupes.push(name);
  seen[name] = 1;
});
console.log('INFO routes defined: ' + Object.keys(seen).sort().join(', '));
if (dupes.length) { console.error('FAIL duplicate route definitions: ' + dupes.join(', ')); fail = 1; }

const acts = js.match(/PS\.acts\['([a-zA-Z0-9\-]+)'\]/g) || [];
console.log('INFO action handlers: ' + acts.length);

['localStorage', 'document.createElement', 'JSON.parse', 'navigator.clipboard'].forEach(function (api) {
  if (js.indexOf(api) < 0) console.log('INFO api not referenced: ' + api);
});

if (fail) { console.error('\nVALIDATION FAILED'); process.exit(1); }
console.log('\nVALIDATION PASSED');
