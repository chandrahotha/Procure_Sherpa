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
