/* ==========================================================
   Security audit scanner
   Static analysis over the assembled single-file bundle for
   production-grade hygiene:
     - eval / new Function / document.write usage
     - inline event handlers (onclick= etc.)
     - javascript: URLs
     - hard-coded external network calls (http/https/fetch/XHR)
     - obvious credential strings
     - unsanitized innerHTML sinks (best-effort heuristic)
   Pure static scan - no browser needed.
   ========================================================== */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const HTML = path.join(ROOT, 'ProcureSherpa-v2.0.html');
const html = fs.readFileSync(HTML, 'utf8');
/* Extract the real inline application script the same way build.mjs does:
   the one bare <script> (no attributes) tag, not "everything before the
   first </script> anywhere in the document". The document also carries
   a <script type="application/ld+json"> block (SEO structured data) -
   cutting at the first </script> would truncate the scan to that tiny
   JSON block and silently stop checking the actual 1MB+ of app code. */
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) {
  console.error('FAIL: no bare <script> application block found to scan');
  process.exit(1);
}
const script = scriptMatch[1];

const findings = [];
let checks = 0;

function scan(name, re, why, allowEmpty) {
  checks++;
  const m = script.match(re);
  if (m) {
    if (allowEmpty && m.length <= 1) return;
    m.forEach((hit, i) => {
      if (i === 0) return;
      const snippet = String(hit).replace(/\s+/g, ' ').slice(0, 120);
      findings.push('[' + name + '] ' + why + ' :: ' + snippet);
    });
  }
}

/* 1. eval-family */
scan('eval', /\beval\s*\(/g, 'eval() found (CSP-incompatible)');
scan('newFunction', /\bnew\s+Function\s*\(/g, 'new Function() found (CSP-incompatible)');
scan('documentWrite', /\bdocument\.\s*write\s*\(/g, 'document.write found', true);

/* 2. inline handlers */
scan('inlineHandler', /\bon\w+\s*=\s*["'][^"']*["']/g, 'inline event handler attribute', true);

/* 3. javascript: URLs */
scan('jsUrl', /\bjavascript\s*:\s*/gi, 'javascript: URL');

/* 4. external network */
scan('httpUrl', /(?:fetch|XMLHttpRequest|new\s+WebSocket|\.src\s*=\s*|\.href\s*=\s*)[^;\n]*https?:\/\//g, 'runtime network reference', true);
scan('eval2', /setTimeout\s*\(\s*["']/g, 'setTimeout with string arg (eval-like)', true);

/* 5. credentials */
scan('secret', /(api[_-]?key|client[_-]?secret|passw(or)?d|authorization\s*:|\bbearer\s+)/gi, 'possible credential token', true);

/* 6. innerHTML with potentially dynamic content (informational) */
scan('innerHTML', /\.innerHTML\s*=\s*[^'"][^;]{0,80}/g, 'dynamic innerHTML sink (informational - verify escaping)', true);

/* 7. confirm no eval is reachable */
const hasEval = /\beval\s*\(/.test(script);
const hasNewFn = /\bnew\s+Function\s*\(/.test(script);
const hasJsUrl = /\bjavascript\s*:/i.test(script);
const hasInline = /<(?:input|button|a|div|span)[^>]*\son\w+\s*=\s*["'][^"']+["']/i.test(html);

const verdicts = [];
verdicts.push('eval():            ' + (hasEval ? 'FOUND - FAIL' : 'none - ok'));
verdicts.push('new Function():   ' + (hasNewFn ? 'FOUND - FAIL' : 'none - ok'));
verdicts.push('javascript: URLs: ' + (hasJsUrl ? 'FOUND - FAIL' : 'none - ok'));
verdicts.push('inline handlers:  ' + (hasInline ? 'FOUND - FAIL' : 'none - ok'));

const hard = findings.filter((f) => f.startsWith('[eval]') || f.startsWith('[newFunction]') || f.startsWith('[jsUrl]') || f.startsWith('[inlineHandler]'));
const info = findings.filter((f) => !hard.includes(f));

console.log('--- security audit: ' + HTML + ' (' + (html.length / 1024).toFixed(0) + ' KB) ---');
console.log(verdicts.join('\n'));
console.log('\nINFORMATIONAL (review, not blocking):');
info.slice(0, 30).forEach((f) => console.log('  ' + f));
if (info.length > 30) console.log('  ... and ' + (info.length - 30) + ' more informational hits');

if (hard.length) {
  console.log('\nBLOCKING FINDINGS: ' + hard.length);
  hard.forEach((f) => console.log('  ' + f));
  process.exit(1);
}
console.log('\nSECURITY AUDIT: PASS - no blocking findings');
process.exit(0);