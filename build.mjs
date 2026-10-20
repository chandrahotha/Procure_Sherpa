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
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'ProcureSherpa-v2.0.html');
const CHECK = path.join(ROOT, '_check.js');

const manifest = fs.readFileSync(path.join(SRC, 'manifest.txt'), 'utf8')
  .split(/\r?\n/)
  .map((s) => s.trim())
  .filter((s) => s && !s.startsWith('#'));

/* Fragments are normalised to CRLF before joining.

   Without this the artifact is not reproducible across machines. Source
   fragments are committed with LF (git normalises them on `git add`) but
   check out as CRLF on Windows and LF on Linux, so a build on a developer
   laptop and a build in CI produced byte-different files from identical
   source - and tools/check_drift.mjs, which byte-compares the two, would
   fail on every CI run for a reason that has nothing to do with the code.

   Normalising here makes the output depend only on fragment content, on
   any platform and under any core.autocrlf setting. CRLF specifically,
   because the committed artifact is marked -text in .gitattributes and is
   already stored with CRLF. */
const toCRLF = (s) => s.replace(/\r\n/g, '\n').replace(/\n/g, '\r\n');

const parts = manifest.map((rel) => {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) {
    console.error('FAIL manifest entry not found: ' + rel);
    process.exit(1);
  }
  return toCRLF(fs.readFileSync(p, 'utf8'));
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

/* Hard performance budget gate.

   The bundle is the entire load cost, and the constraint that matters is
   a transfer time, not a byte count. ADR 0001 names "first-paint time on
   a mid-range phone on 4G" as the trigger, so the gate is stated in
   those units: the compressed artifact has to arrive within three
   seconds at a conservative 3 Mbps effective 4G rate, which is 1152 KB
   of compressed payload.

   The uncompressed size is reported but not gated, because the committed
   artifact is deliberately unminified so that a procurement team can
   read every line of the thing they are about to trust. Counting
   uncompressed source was counting bytes nobody receives.

   See docs/adr/0002. */
const GZIP_CEILING_KB = Math.round(3 * 3 / 8 * 1024);
const gzipKB = zlib.gzipSync(fs.readFileSync(OUT), { level: 9 }).length / 1024;
const sizeKB = fs.statSync(OUT).size / 1024;
if (gzipKB > GZIP_CEILING_KB) {
  console.error('FAIL: compressed bundle ' + gzipKB.toFixed(0) + ' KB exceeds the ' +
    GZIP_CEILING_KB + ' KB ceiling (3 s at 3 Mbps 4G)');
  process.exit(1);
}
if (gzipKB > GZIP_CEILING_KB * 0.85) {
  console.warn('WARN: compressed bundle ' + gzipKB.toFixed(0) + ' KB is past the ' +
    Math.round(GZIP_CEILING_KB * 0.85) + ' KB soft threshold (85% of the ' + GZIP_CEILING_KB +
    ' KB ceiling). Still passing, but worth planning ahead for what happens when this hits the hard limit.');
}
console.log('perf budget: ' + gzipKB.toFixed(0) + ' KB compressed (ceiling ' + GZIP_CEILING_KB + ' KB, 3 s at 3 Mbps 4G); ' + sizeKB.toFixed(0) + ' KB uncompressed - ok');
