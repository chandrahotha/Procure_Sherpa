/* Procure Sherpa builder — the single source of truth for assembly.
   Reads src/manifest.txt (explicit fragment order), concatenates the
   fragments into ProcureSherpa-v2.0.html, then runs the JS syntax check
   and validate.mjs.

   Usage:  node build.mjs      (or: npm run build, or: .\assemble.ps1)

   Source lives ONLY in src/ (multi-file project). The single HTML file
   at the repo root is a generated release artifact — never edit it. */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'ProcureSherpa-v2.0.html');
const CHECK = path.join(ROOT, '_check.js');

const manifest = fs.readFileSync(path.join(SRC, 'manifest.txt'), 'utf8')
  .split(/\r?\n/)
  .map((s) => s.trim())
  .filter((s) => s && !s.startsWith('#'));

const parts = manifest.map((rel) => {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) {
    console.error('FAIL manifest entry not found: ' + rel);
    process.exit(1);
  }
  return fs.readFileSync(p, 'utf8');
});
fs.writeFileSync(OUT, parts.join('\r\n') + '\r\n');
console.log('assembled ' + parts.length + ' fragments -> ' + path.basename(OUT));

const html = fs.readFileSync(OUT, 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (!m) {
  console.error('FAIL: no inline <script> block found');
  process.exit(1);
}
fs.writeFileSync(CHECK, m[1]);
execFileSync(process.execPath, ['--check', CHECK], { stdio: 'inherit' });
execFileSync(process.execPath, [path.join(ROOT, 'validate.mjs'), OUT], { stdio: 'inherit' });

/* Hard performance budget gate: fail the build if the single-file
   bundle exceeds the ceiling. The bundle is the entire load cost.
   A soft warning fires earlier (85% of budget) so growth toward the
   wall is visible for several releases before it becomes a build
   failure, rather than the first sign being a blocked build. This
   is also the earliest, cheapest point to start a real conversation
   about code-splitting / lazy-loading if the single-file constraint
   is going to be outgrown. */
const BUDGET_KB = 1600;
const WARN_AT_KB = Math.round(BUDGET_KB * 0.85);
const sizeKB = fs.statSync(OUT).size / 1024;
if (sizeKB > BUDGET_KB) {
  console.error('FAIL: bundle size ' + sizeKB.toFixed(0) + ' KB exceeds budget ' + BUDGET_KB + ' KB');
  process.exit(1);
}
if (sizeKB > WARN_AT_KB) {
  console.warn('WARN: bundle size ' + sizeKB.toFixed(0) + ' KB is past the ' + WARN_AT_KB +
    ' KB soft threshold (85% of the ' + BUDGET_KB + ' KB budget). Still passing, but worth' +
    ' planning ahead for what happens when this hits the hard limit.');
}
console.log('perf budget: ' + sizeKB.toFixed(0) + ' KB (budget ' + BUDGET_KB + ' KB, warn at ' + WARN_AT_KB + ' KB) - ok');
