/* ==========================================================
   Minified deploy build.

   WHY THIS EXISTS

   The readable artifact (ProcureSherpa-v2.0.html) is the product: one
   file you download, double-click and read the source of. It is
   committed to the repository, diffs line by line, and must stay that
   way - minifying the committed file would make every content change an
   unreviewable blob.

   But that same file is also what the hosted deployment serves, and
   there it is pure load cost: ~1.26 MB, all of it parsed before first
   paint, against a hard 1.6 MB build budget that is already ~79% spent.
   The single-file constraint has no code-splitting escape hatch - that
   is the whole point of it - so the only lever that buys real headroom
   without breaking the premise is to serve a compressed variant.

   So: two outputs from one source.

     npm run build      -> ProcureSherpa-v2.0.html   readable, committed,
                           what the tests and audits run against, what a
                           user downloads for offline use.
     npm run build:min  -> dist/index.html            byte-identical in
                           behaviour, minified, generated at deploy time
                           and never committed.

   The deployment (vercel.json) builds the minified variant. Nothing else
   depends on it, so if terser is ever unavailable the readable artifact
   still deploys and works - this degrades, it does not block.

   Usage: node tools/build_min.mjs   (or: npm run build:min)
   ========================================================== */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { minify } from 'terser';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(ROOT, 'ProcureSherpa-v2.0.html');
const DIST = path.join(ROOT, 'dist');
const OUT = path.join(DIST, 'index.html');

if (!fs.existsSync(SRC)) {
  console.error('FAIL: ' + path.basename(SRC) + ' is missing. Run `npm run build` first.');
  process.exit(1);
}

const html = fs.readFileSync(SRC, 'utf8');

/* The build guarantees exactly one inline <script> block (build.mjs and
   validate.mjs both assert it), so a single non-greedy match is safe. */
const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (!m) {
  console.error('FAIL: no inline <script> block found in ' + path.basename(SRC));
  process.exit(1);
}

const originalJs = m[1];

const result = await minify(originalJs, {
  /* ES5 output: the readable artifact is ES5 by policy (see
     eslint.config.mjs) and the minified one must not quietly raise the
     browser floor. */
  ecma: 5,
  compress: {
    passes: 2,
    /* Keep the console output: the app reports content QA and link
       hygiene to the console at boot, and that is a deliberate
       diagnostic, not debug litter. */
    drop_console: false,
    drop_debugger: true
  },
  mangle: {
    /* PS is the application's single global and the fragments reach each
       other through it. Mangling top-level names would break that, so
       top level is left alone and only function-local names shrink. */
    toplevel: false
  },
  format: { comments: false }
});

if (result.error) {
  console.error('FAIL: terser could not minify the bundle:', result.error);
  process.exit(1);
}

const minJs = result.code;
/* Replacer FUNCTION, not a replacement string: minified JS is full of
   `$` sequences, and in a string replacement `$&`, `$'` and `` $` `` are
   substitution patterns. Passing the code as a string silently splices
   copies of the original bundle back into the output - it inflated this
   file from 1.26 MB to 2.2 MB before this was a function. */
const minHtml0 = html.replace(m[0], () => '<script>' + minJs + '</script>');

/* CSS and HTML comments are minified in the deploy build too, for the same
   reason the script is: this file is what a browser is sent, and the
   explanatory prose that makes the committed artifact auditable is worth
   nothing to a renderer. It is deliberately NOT applied to
   ProcureSherpa-v2.0.html, which stays fully commented - the readable file
   is the one a person reads to decide what to trust.

   The transform is quote- and url()-aware, because CSS is not regular text:
   collapsing whitespace inside a font-family string, a content string or a
   data URI changes what the browser sees. And it never touches the spaces
   around + and -, so calc(100% - 8px) stays valid. */
function minifyCss(css) {
  let out = '';
  let i = 0;
  while (i < css.length) {
    const two = css.slice(i, i + 2);
    if (two === '/*') {                       // comment: dropped entirely
      const end = css.indexOf('*/', i + 2);
      i = end < 0 ? css.length : end + 2;
      continue;
    }
    if (two === '\u0022\u0022' || two === "''") { // empty string literal
      out += two; i += 2; continue;
    }
    const q = css[i];
    if (q === '"' || q === "'") {             // string: copied verbatim
      let j = i + 1;
      while (j < css.length) {
        if (css[j] === '\\') { j += 2; continue; }
        if (css[j] === q) { j++; break; }
        j++;
      }
      out += css.slice(i, j); i = j; continue;
    }
    if (/\s/.test(q)) {                       // whitespace: collapse to one
      let j = i;
      while (j < css.length && /\s/.test(css[j])) j++;
      const next = css[j], prev = out[out.length - 1] || '';
      if (!out || next === '}' || prev === '{' || prev === ';') { i = j; continue; }
      out += ' '; i = j; continue;
    }
    out += q; i++;
  }
  return out
    .replace(/\s*([{};:])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

/* Only the CSS and the HTML comments are touched; the script block is put
   back untouched after the pass so nothing inside a string literal in the
   application code can be reached. */
const styleMatches = [...minHtml0.matchAll(/<style[^>]*>[\s\S]*?<\/style>/g)];
let minHtml = minHtml0;
for (const st of styleMatches) {
  const body = st[0].replace(/^<style[^>]*>/, '').replace(/<\/style>$/, '');
  const stripped = minifyCss(body);
  minHtml = minHtml.replace(st[0], () => st[0].slice(0, st[0].indexOf('>') + 1) + stripped + '</style>');
}
minHtml = minHtml.replace(/<script>[\s\S]*?<\/script>/g, () => '<script>' + minJs + '</script>');
/* HTML comments outside the script: the shell and the head carry the same
   kind of authorship notes as the CSS. */
minHtml = minHtml.replace(/<!--[\s\S]*?-->/g, '');

/* Equivalence guard. A minifier that silently eats a rule is worse than no
   minifier, and the six suites that run against dist would only notice the
   ones that change behaviour, not the one that changes a rarely-used
   selector. So the structure is counted before and after: the number of
   declaration blocks, the number of calc() expressions and the number of
   url() references must be identical. */
{
  const count = (s2, re) => (s2.match(re) || []).length;
  const beforeBlocks = count(html.match(/<style[^>]*>[\s\S]*?<\/style>/g).join(''), /\{/g);
  const afterBlocks = count(styleMatches.map(() => '').join('') + minHtml.match(/<style[^>]*>[\s\S]*?<\/style>/g).join(''), /\{/g);
  const beforeCalc = count(html, /calc\(/g), afterCalc = count(minHtml, /calc\(/g);
  const beforeUrl = count(html, /url\(/g), afterUrl = count(minHtml, /url\(/g);
  if (beforeBlocks !== afterBlocks) {
    console.error('FAIL: CSS minification changed the declaration-block count (' + beforeBlocks + ' -> ' + afterBlocks + ').');
    process.exit(1);
  }
  /* And the script must be exactly what terser produced. The CSS pass finds
     <style> text inside the application own strings, so the script block is
     restored after it - this is the assertion that proves the restore
     happened, rather than trusting the order of three replaces. */
  const scriptOut = minHtml.match(/<script>([\s\S]*?)<\/script>/);
  if (!scriptOut || scriptOut[1] !== minJs) {
    console.error('FAIL: the deployed script block is not the minified bundle (it was altered by the CSS or comment pass).');
    process.exit(1);
  }
  if (beforeCalc !== afterCalc || beforeUrl !== afterUrl) {
    console.error('FAIL: CSS minification changed the calc()/url() count (' + beforeCalc + '->' + afterCalc + ', ' + beforeUrl + '->' + afterUrl + ').');
    process.exit(1);
  }
}

fs.mkdirSync(DIST, { recursive: true });
fs.writeFileSync(OUT, minHtml);

/* Copy the static SEO files next to it so dist/ is a complete deployable. */
for (const f of ['robots.txt', 'sitemap.xml']) {
  const from = path.join(ROOT, f);
  if (fs.existsSync(from)) fs.copyFileSync(from, path.join(DIST, f));
}

const beforeKB = html.length / 1024;
const afterKB = minHtml.length / 1024;
const jsBeforeKB = originalJs.length / 1024;
const jsAfterKB = minJs.length / 1024;
const saved = (1 - afterKB / beforeKB) * 100;

console.log('--- minified deploy build ---');
console.log('source:     ' + path.basename(SRC) + '  ' + beforeKB.toFixed(0) + ' KB (script ' + jsBeforeKB.toFixed(0) + ' KB)');
console.log('output:     dist/index.html  ' + afterKB.toFixed(0) + ' KB (script ' + jsAfterKB.toFixed(0) + ' KB)');
console.log('reduction:  ' + saved.toFixed(1) + '%');
const cssRawKB = html.match(/<style[^>]*>[\s\S]*?<\/style>/g).join('').length / 1024;
console.log('css:        ' + cssRawKB.toFixed(0) + ' KB of comments and whitespace minified for the deploy build only');

/* Report headroom against the same ceiling build.mjs enforces. The
   ceiling is a transfer time, not a byte count: 3 seconds at a
   conservative 3 Mbps effective 4G rate, which is 1152 KB of
   compressed payload. See docs/adr/0002. */
const GZIP_CEILING_KB = Math.round(3 * 3 / 8 * 1024);
const gzipKB = zlib.gzipSync(fs.readFileSync(OUT), { level: 9 }).length / 1024;
console.log('gzip:       ' + gzipKB.toFixed(0) + ' KB compressed (ceiling ' + GZIP_CEILING_KB +
  ' KB, 3 s at 3 Mbps 4G; ' + (gzipKB * 8 / 3 / 1000).toFixed(2) + ' s to transfer)');
console.log('headroom:   ' + (GZIP_CEILING_KB - gzipKB).toFixed(0) + ' KB of the ' + GZIP_CEILING_KB + ' KB compressed ceiling');
console.log('MINIFIED BUILD: ok');
