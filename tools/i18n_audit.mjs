/* i18n coverage audit (informational - Section: honest capability claims).
   Counts catalog keys vs. actual data-i18n* usages in src/, and how many
   locales are registered, so README/comments describing i18n coverage
   can be checked against reality instead of drifting silently.
   Exits 0 always - this is a visibility tool, not a release gate,
   matching the same "informational, not blocking" pattern as
   test_quiz_tips.mjs / PS.contentQA(). */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(ROOT, 'src');

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else out.push(p);
  }
}

const files = [];
walk(SRC, files);

const i18nSrc = fs.readFileSync(path.join(SRC, 'core', '06a1_i18n.js'), 'utf8');
const catalogKeys = new Set((i18nSrc.match(/'[a-z][a-zA-Z0-9]*\.[a-zA-Z0-9.]+'\s*:/g) || [])
  .map((s) => s.slice(1, s.indexOf("'", 1))));
const localeMatch = i18nSrc.match(/PS\.i18n\.CATALOG\s*=\s*\{([\s\S]*?)\n\};/);
const localeCount = localeMatch ? (localeMatch[1].match(/^\s*[a-z]{2}:\s*\{/gm) || []).length : 0;

const usedKeys = new Set();
const tCallPattern = /PS\.i18n\.t\(\s*['"]([a-zA-Z0-9.]+)['"]/g;
const dataAttrPattern = /data-i18n(?:-placeholder|-title)?="([a-zA-Z0-9.]+)"/g;

for (const f of files) {
  const text = fs.readFileSync(f, 'utf8');
  let m;
  while ((m = tCallPattern.exec(text))) usedKeys.add(m[1]);
  while ((m = dataAttrPattern.exec(text))) usedKeys.add(m[1]);
}

const wiredCatalogKeys = [...catalogKeys].filter((k) => usedKeys.has(k));
const unusedCatalogKeys = [...catalogKeys].filter((k) => !usedKeys.has(k));
const pct = catalogKeys.size ? Math.round((wiredCatalogKeys.length / catalogKeys.size) * 100) : 0;

console.log('--- i18n coverage audit ---');
console.log('locales registered:      ' + localeCount);
console.log('catalog keys defined:    ' + catalogKeys.size);
console.log('catalog keys wired to DOM/t():  ' + wiredCatalogKeys.length + ' (' + pct + '%)');
console.log('catalog keys unused:     ' + unusedCatalogKeys.length);
if (unusedCatalogKeys.length) console.log('  ' + unusedCatalogKeys.join(', '));
console.log('');
console.log(localeCount <= 1
  ? 'STATUS: scaffolding only - single locale, chrome-only coverage. Do not describe as "i18n-ready" without expanding this.'
  : 'STATUS: multi-locale.');
process.exit(0);
