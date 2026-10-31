/* i18n coverage audit (Section 6.2 of the roadmap; the honest capability
   claim in README).

   Counts catalog keys against the places that actually use them in src/ -
   `PS.i18n.t('…')`, the `data-i18n*` attributes and the `i18n:` field on a
   navigation item - and reports how many locales the catalog registers, so
   that documents describing i18n coverage can be checked against the source
   instead of drifting.

   This used to be an information tool that printed its findings and exited
   0 whatever it saw, and the documents leaned on that: "only 1 locale is
   registered, ~20% of the catalog is wired" stayed in the roadmap long after
   the catalog registered two locales and wired every key. Printing a number
   nobody can fail on is not a check. It is now a gate, over the two things
   that are actually promises the product makes:

     1. every key in the catalog is wired to something on screen, and
     2. every registered locale defines every key the reference locale does,
        so switching language cannot silently fall back to English
        mid-sentence.

   What it deliberately does NOT enforce: how many locales exist, or that
   route and page *content* is translated. The content is English-authored
   and says so; requiring a locale count would just invite a stub catalog.

   Usage: node tools/i18n_audit.mjs   (or: npm run audit:i18n)
   ========================================================== */
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

/* Which keys each locale actually defines. The catalog is one object per
   locale, so the top-level locale blocks are split on their own headers and
   counted key by key. */
const keysPerLocale = {};
if (localeMatch) {
  const blocks = localeMatch[1].split(/^ {2}([a-z]{2}): \{$/m).filter((s) => s !== undefined);
  /* split with a capture group yields [pre, locale, body, locale, body, ...] */
  for (let i = 1; i < blocks.length - 1; i += 2) {
    const locale = blocks[i];
    const body = String(blocks[i + 1] || '');
    keysPerLocale[locale] = new Set((body.match(/'[a-z][a-zA-Z0-9]*\.[a-zA-Z0-9.]+'\s*:/g) || [])
      .map((s) => s.slice(1, s.indexOf("'", 1))));
  }
}

const usedKeys = new Set();
const tCallPattern = /PS\.i18n\.t\(\s*['"]([a-zA-Z0-9.]+)['"]/g;
const dataAttrPattern = /data-i18n(?:-placeholder|-title)?="([a-zA-Z0-9.]+)"/g;
const navPropPattern = /\bi18n:\s*['"]([a-zA-Z0-9.]+)['"]/g;

for (const f of files) {
  const text = fs.readFileSync(f, 'utf8');
  let m;
  while ((m = tCallPattern.exec(text))) usedKeys.add(m[1]);
  while ((m = dataAttrPattern.exec(text))) usedKeys.add(m[1]);
  while ((m = navPropPattern.exec(text))) usedKeys.add(m[1]);
}

const wiredCatalogKeys = [...catalogKeys].filter((k) => usedKeys.has(k));
const unusedCatalogKeys = [...catalogKeys].filter((k) => !usedKeys.has(k));
/* Keys referenced from the UI that the catalog does not define render as the
   literal key text - the sentinel leak this file exists to catch. */
const undefinedUsedKeys = [...usedKeys].filter((k) => !catalogKeys.has(k));
const pct = catalogKeys.size ? Math.round((wiredCatalogKeys.length / catalogKeys.size) * 100) : 0;

console.log('--- i18n coverage audit ---');
console.log('locales registered:      ' + localeCount + (localeCount ? ' (' + Object.keys(keysPerLocale).join(', ') + ')' : ''));
console.log('catalog keys defined:    ' + catalogKeys.size);
console.log('catalog keys wired to DOM/t():  ' + wiredCatalogKeys.length + ' (' + pct + '%)');
console.log('catalog keys unused:     ' + unusedCatalogKeys.length);
if (unusedCatalogKeys.length) console.log('  ' + unusedCatalogKeys.join(', '));

const failures = [];

if (unusedCatalogKeys.length) {
  failures.push(unusedCatalogKeys.length + ' catalog key(s) are defined but never reach the screen: '
    + unusedCatalogKeys.join(', '));
}
if (undefinedUsedKeys.length) {
  failures.push(undefinedUsedKeys.length + ' key(s) are referenced by the UI but not defined in the catalog, so they render as the key: '
    + undefinedUsedKeys.join(', '));
}
const refLocale = keysPerLocale.en ? 'en' : Object.keys(keysPerLocale)[0];
if (refLocale) {
  const incomplete = Object.keys(keysPerLocale)
    .filter((l) => l !== refLocale)
    .map((l) => {
      const missing = [...keysPerLocale[refLocale]].filter((k) => !keysPerLocale[l].has(k));
      return missing.length ? l + ' is missing ' + missing.length + ' key(s): ' + missing.slice(0, 8).join(', ') : null;
    })
    .filter(Boolean);
  if (incomplete.length) failures.push(...incomplete);
}

if (localeCount <= 1) {
  console.log('');
  console.log('STATUS: scaffolding only - single locale. Documents must not describe this as multi-locale.');
} else {
  console.log('');
  console.log('STATUS: multi-locale. Route and page content is English-authored and says so on the Help page.');
}

console.log('');
if (failures.length) {
  failures.forEach((f) => console.error('FAIL: ' + f));
  console.error('I18N AUDIT: FAIL');
  process.exit(1);
}
console.log('I18N AUDIT: PASS');
process.exit(0);
