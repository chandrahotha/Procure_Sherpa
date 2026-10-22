/* Procurement 360 builder — esbuild-based.
   Bundles TypeScript source into a single offline HTML file.
   Same deployment model as before: one file, no server, no login.

   Usage:  node build.mjs      (or: npm run build) */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'Procurement360.html');
const CHECK = path.join(ROOT, '_check.js');

/* 1. Bundle all TypeScript into a single JS file */
const result = await esbuild.build({
  entryPoints: [path.join(SRC, 'main.ts')],
  bundle: true,
  format: 'iife',
  target: ['es2022'],
  minify: false,
  write: false,
  logLevel: 'info',
});

const jsCode = result.outputFiles[0].text;

/* 2. Inline all CSS */
const cssDir = path.join(SRC, 'styles');
const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css')).sort();
const cssCode = cssFiles.map(f => fs.readFileSync(path.join(cssDir, f), 'utf8')).join('\n');

/* 3. Assemble the HTML shell */
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="description" content="Procurement 360: the in-house bookshelf and data library for procurement professionals.">
<meta name="application-name" content="Procurement 360">
<meta name="theme-color" content="#1d3a31">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'self'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'">
<title>Procurement 360 | The Procurement Bookshelf & Data Library</title>
<style>
${cssCode}
</style>
</head>
<body>
<div id="app"></div>
<script>
${jsCode}
</script>
</body>
</html>`;

fs.writeFileSync(OUT, html);
console.log(`assembled ${cssFiles.length} CSS files + TypeScript bundle -> ${path.basename(OUT)}`);

/* 4. Syntax check */
const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (!m) {
  console.error('FAIL: no inline <script> block found');
  process.exit(1);
}
fs.writeFileSync(CHECK, m[1]);
execFileSync(process.execPath, ['--check', CHECK], { stdio: 'inherit' });
execFileSync(process.execPath, [path.join(ROOT, 'validate.mjs'), OUT], { stdio: 'inherit' });

/* 5. Performance budget */
const BUDGET_KB = 1600;
const sizeKB = fs.statSync(OUT).size / 1024;
if (sizeKB > BUDGET_KB) {
  console.error(`FAIL: bundle size ${sizeKB.toFixed(0)} KB exceeds budget ${BUDGET_KB} KB`);
  process.exit(1);
}
console.log(`perf budget: ${sizeKB.toFixed(0)} KB (budget ${BUDGET_KB} KB) - ok`);

/* 6. WCAG contrast gate */
execFileSync(process.execPath, [path.join(ROOT, 'tools', 'contrast_check.mjs'), OUT], { stdio: 'inherit' });
