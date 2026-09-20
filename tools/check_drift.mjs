/* ==========================================================
   Build-drift gate.

   This repository commits BOTH the source fragments in src/ and the
   single-file artifact they assemble into. That is deliberate - the
   artifact is the product, and "download one HTML file and double-click
   it" only works if the file is actually in the tree - but it creates
   exactly one failure mode worth guarding: someone edits src/, forgets
   to run `npm run build`, and commits source that no longer matches the
   artifact everyone downloads. Every test in this repo runs against the
   artifact, so a stale artifact means the whole suite is testing code
   that is no longer the source of truth, and passing.

   This check assembles the fragments in memory, exactly the way
   build.mjs does, and byte-compares the result with the committed file.
   It never writes anything.

   It runs FIRST in CI, before `npm run qa` (which rebuilds the artifact
   and would therefore mask the drift it is meant to catch), and in the
   pre-push hook.

   Usage: node tools/check_drift.mjs   (or: npm run check:drift)
   ========================================================== */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.join(ROOT, 'ProcureSherpa-v2.0.html');

if (!fs.existsSync(OUT)) {
  console.error('FAIL: ' + path.basename(OUT) + ' is missing. Run `npm run build`.');
  process.exit(1);
}

/* Same manifest read, same CRLF normalisation and same join as build.mjs.
   If build.mjs ever changes how it assembles, this must change with it -
   that coupling is the point.

   The normalisation is what makes this check usable in CI at all. Source
   fragments are stored with LF and check out as CRLF on Windows and LF on
   Linux, so without normalising, a Linux checkout could never reproduce an
   artifact built on Windows and this would fail on every CI run for a
   reason unrelated to the code. */
const toCRLF = (s) => s.replace(/\r\n/g, '\n').replace(/\n/g, '\r\n');
const manifest = fs.readFileSync(path.join(ROOT, 'src', 'manifest.txt'), 'utf8')
  .split(/\r?\n/)
  .map((s) => s.trim())
  .filter((s) => s && !s.startsWith('#'));

const missing = manifest.filter((rel) => !fs.existsSync(path.join(ROOT, rel)));
if (missing.length) {
  console.error('FAIL: manifest lists files that do not exist:\n  ' + missing.join('\n  '));
  process.exit(1);
}

const fresh = manifest.map((rel) => toCRLF(fs.readFileSync(path.join(ROOT, rel), 'utf8'))).join('\r\n') + '\r\n';
const committed = fs.readFileSync(OUT, 'utf8');

const sha = (s) => crypto.createHash('sha256').update(s, 'utf8').digest('hex').slice(0, 12);

if (fresh === committed) {
  console.log('--- build drift check ---');
  console.log('fragments:        ' + manifest.length);
  console.log('committed sha256: ' + sha(committed) + ' (' + (committed.length / 1024).toFixed(0) + ' KB)');
  console.log('BUILD DRIFT: none - the committed artifact matches src/');
  process.exit(0);
}

/* Drift. Say which fragment diverged first, so the message is actionable
   rather than just "the files differ". */
let firstDiff = 0;
const max = Math.min(fresh.length, committed.length);
while (firstDiff < max && fresh[firstDiff] === committed[firstDiff]) firstDiff++;

let offset = 0, culprit = null;
for (const rel of manifest) {
  const len = toCRLF(fs.readFileSync(path.join(ROOT, rel), 'utf8')).length + 2; /* + the \r\n join */
  if (firstDiff < offset + len) { culprit = rel; break; }
  offset += len;
}
/* No fragment covers that offset, so the difference is trailing content
   appended after the last fragment - i.e. the artifact was edited by
   hand rather than regenerated. */
if (!culprit) culprit = '(trailing content past the last fragment - the artifact was edited directly)';

console.error('--- build drift check ---');
console.error('FAIL: ProcureSherpa-v2.0.html does not match the fragments in src/.');
console.error('');
console.error('  committed: ' + sha(committed) + ' (' + committed.length + ' bytes)');
console.error('  from src:  ' + sha(fresh) + ' (' + fresh.length + ' bytes)');
console.error('  diverges at byte ' + firstDiff + ', inside: ' + culprit);
console.error('');
console.error('The artifact is generated - never edit it directly. Run:');
console.error('');
console.error('    npm run build');
console.error('');
console.error('then commit the regenerated ProcureSherpa-v2.0.html alongside your');
console.error('src/ changes. Both belong in the same commit.');
process.exit(1);
