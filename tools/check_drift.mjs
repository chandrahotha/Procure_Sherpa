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

   It also checks the documentation against the source, because that is
   the drift this file did NOT catch for months. Its name is accurate for
   what it has always covered - the *build* - and the second half is new:
   a version of record, a toolchain pin, and a small number of claims in
   the prose that can be measured without running anything. What it
   cannot catch is a number that only exists at run time (assertion
   counts, timings); those are printed by the tools that produce them,
   and the docs are expected to quote the tool.

   It runs FIRST in CI, before `npm run qa` (which rebuilds the artifact
   and would therefore mask the drift it is meant to catch), and in the
   pre-push hook.

   Usage: node tools/check_drift.mjs   (or: npm run check:drift)
   ========================================================== */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { stampFor, applyStamp } from './build_stamp.mjs';

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

const parts = manifest.map((rel) => toCRLF(fs.readFileSync(path.join(ROOT, rel), 'utf8')));
/* The same stamp the build applies, so the comparison is between two
   identically stamped artifacts rather than between a stamped one and
   an unstamped one. This is the coupling that matters: build.mjs and
   this file agree because they call one function, not because two
   copies of the same idea happen to match. */
const fresh = applyStamp(parts.join('\r\n') + '\r\n', stampFor(parts));
const committed = fs.readFileSync(OUT, 'utf8');

const sha = (s) => crypto.createHash('sha256').update(s, 'utf8').digest('hex').slice(0, 12);

if (fresh === committed) {
  console.log('--- build drift check ---');
  console.log('fragments:        ' + manifest.length);
  console.log('committed sha256: ' + sha(committed) + ' (' + (committed.length / 1024).toFixed(0) + ' KB)');
  console.log('BUILD DRIFT: none - the committed artifact matches src/');
} else {

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
}

/* ==========================================================
   Documentation drift.

   Added because this file checked the artifact and nothing checked the
   prose, so the documents drifted from the code in ways that were each
   individually trivial to see:

     * `package.json` said 2.2.0, the application announced itself as
       v2.0 (which is what the What's New page highlighted as "Your
       version"), and the release notes described the v2.4 revamp.
     * `IMPROVEMENT_ROADMAP.md` said i18n registers one locale and wires
       ~20% of the catalog; the catalog registered two and the shell was
       fully wired.
     * `docs/v2.4-delivery-report.md` said `terser` was the only
       dev-dependency; there were three.
     * README and CONTRIBUTING quoted a 63-route smoke test while the
       smoke table had grown to 72.

   Each rule measures one thing from the source and greps the documents
   for the claim that must agree with it. A rule that cannot be measured
   statically is not encoded here; it stays a line in
   docs/completion-ledger.md with the command that prints it.
   ========================================================== */

const DOCFILES = ['README.md', 'CONTRIBUTING.md', 'SECURITY.md', 'src/README.md',
  'IMPROVEMENT_ROADMAP.md', 'docs/v2.4-delivery-report.md', 'docs/completion-ledger.md'];

const read = (rel) => {
  try { return fs.readFileSync(path.join(ROOT, rel), 'utf8'); } catch { return ''; }
};
const docs = DOCFILES.map((f) => ({ file: f, text: read(f) })).filter((d) => d.text);

/* A line that describes a previous state is allowed to name the previous
   number: "the pool went 106 -> 102" is evidence, not a live claim. */
const HISTORICAL = /\bwas\b|\bused to\b|->|→|\bwent\b|\bpreviously\b|\bno longer\b/i;

const docProblems = [];
/**
 * Fail if any document's current-state line matches `claim`. Matching is
 * line-wise and skips a line that HISTORICAL recognises, because a document
 * quoting a stale claim in order to refute it ("the roadmap is wrong: it
 * marks the scheduler not built") is not itself making the claim - and if it
 * were punished for the quotation, the honest document would learn to stop
 * quoting anything checkable.
 * @param {string} label what is being checked
 * @param {RegExp} claim the stale wording
 * @param {string} measure what the source actually says
 * @param {string} fix what to do about it
 */
function forbid(label, claim, measure, fix) {
  const hits = [];
  for (const d of docs) {
    for (const line of d.text.split(/\r?\n/)) {
      if (HISTORICAL.test(line)) continue;
      if (claim.test(line)) {
        hits.push(d.file + ': ' + line.trim().slice(0, 110));
        break;
      }
    }
  }
  if (hits.length) docProblems.push({ label, detail: hits.join('\n      '), measure, fix });
}

/* ---------- the version of record ---------- */
const pkgVersion = (JSON.parse(read('package.json') || '{}').version) || '';
const utilSrc = read(path.join('src', 'core', '03a_util.js'));
const psVersion = (utilSrc.match(/^PS\.VERSION\s*=\s*'([^']*)'/m) || [])[1] || '';
const changedSrc = read(path.join('src', 'pages', '08i6_pages_whatsnew.js'));
const topChange = (changedSrc.match(/version:\s*'([^']*)'/) || [])[1] || '';
/* 'a.b.c' and 'a.b' name the same release; that is the whole convention,
   and the comparison is the major and minor of each. */
const mm = (v) => {
  const m = String(v).match(/^(\d+)\.(\d+)/);
  return m ? m[1] + '.' + m[2] : '';
};

if (!mm(pkgVersion) || !mm(psVersion)) {
  docProblems.push({
    label: 'the version of record cannot be read',
    detail: 'package.json version=' + JSON.stringify(pkgVersion) + ', PS.VERSION=' + JSON.stringify(psVersion),
    measure: 'package.json "version" and PS.VERSION in src/core/03a_util.js',
    fix: 'package.json carries "a.b.c" and PS.VERSION carries "a.b" for the same release'
  });
} else if (mm(pkgVersion) !== mm(psVersion)) {
  docProblems.push({
    label: 'package.json and the application disagree about the version',
    detail: 'package.json says ' + pkgVersion + ', PS.VERSION says ' + psVersion,
    measure: 'one release number',
    fix: 'PS.VERSION is what the running app tells the user and writes into a backup; package.json is the version of record. Make them name the same release.'
  });
} else if (mm(topChange) !== mm(psVersion)) {
  docProblems.push({
    label: 'the changelog does not contain the release the app claims to be',
    detail: 'PS.VERSION=' + psVersion + ' but the newest entry in PS.whatsNew.CHANGES is ' + topChange,
    measure: 'the What\'s New page marks the entry whose version equals PS.VERSION as "Your version"',
    fix: 'add a PS.whatsNew.CHANGES entry for ' + psVersion + ' at the top of src/pages/08i6_pages_whatsnew.js'
  });
}

/* ---------- the toolchain pin ---------- */
const pkgEngines = ((JSON.parse(read('package.json') || '{}').engines || {}).node) || '';
const nvmrc = read('.nvmrc').trim();
const nodeVersion = read('.node-version').trim();
const engineMajor = (pkgEngines.match(/\d+/) || [])[0];
if (!nvmrc) {
  docProblems.push({ label: '.nvmrc is missing', detail: 'engines.node says ' + pkgEngines, measure: 'nothing pins the version nvm should use', fix: 'write the major Node version into .nvmrc' });
} else if (nvmrc.replace(/^v/, '') !== engineMajor) {
  docProblems.push({ label: '.nvmrc disagrees with engines.node', detail: '.nvmrc=' + nvmrc + ', engines.node=' + pkgEngines, measure: 'one version', fix: 'make .nvmrc and engines.node name the same major' });
} else if (nodeVersion && nodeVersion !== nvmrc) {
  docProblems.push({ label: '.node-version disagrees with .nvmrc', detail: '.node-version=' + nodeVersion + ', .nvmrc=' + nvmrc, measure: 'the same pin', fix: 'the two files name the same major or only .nvmrc should exist' });
}

/* ---------- claims that are measurable from the source ---------- */
const i18nSrc = read(path.join('src', 'core', '06a1_i18n.js'));
const localeBlock = (i18nSrc.match(/PS\.i18n\.CATALOG\s*=\s*\{([\s\S]*?)\n\};/) || [])[1] || '';
const locales = (localeBlock.match(/^\s*[a-z]{2}:\s*\{/gm) || []).map((s) => s.trim().slice(0, 2));
const devCount = Object.keys((JSON.parse(read('package.json') || '{}').devDependencies) || {}).length;
const smokeSrc = read(path.join('tools', 'smoke.mjs'));
const smokeRoutes = ((smokeSrc.match(/const ROUTES = \[([\s\S]*?)\n\];/) || [])[1] || '').match(/'#\/[^']*'/g) || [];

if (locales.length > 1) {
  forbid('the roadmap still describes i18n as a single locale',
    /only 1 locale|1 locale \(`en`\)|single locale \(en\)/i,
    'PS.i18n.CATALOG registers ' + locales.length + ' locales: ' + locales.join(', '),
    'update the status legend and the Success Metrics row in IMPROVEMENT_ROADMAP.md to what the catalog registers');
  forbid('a document still calls i18n coverage ~20% of the catalog',
    /~?20% of (the )?catalog keys/i,
    'the shell catalog is fully wired (npm run audit:i18n prints the live count)',
    'quote `npm run audit:i18n` instead of a remembered percentage');
}
if (devCount > 1) {
  forbid('a document claims terser is the only dev-dependency',
    /`?terser`? is the only dev-dependency|only dev-dependency is `?terser`?/i,
    'package.json declares ' + devCount + ' dev-dependencies',
    'name every dev-dependency, and keep the claim that none of them ship to a user');
}
/* Route counts in prose. A number is only checked when the sentence
   around it claims to be counting the smoke table; a correct 72 is not a
   finding, an 63 left over from before the workbenches arrived is. */
{
  const claimed = docs
    /* The lookbehind is not decoration: "§78 paths" is a section number
       followed by a noun, and without it the rule read it as a claim that
       the smoke table has 78 routes. */
    .map((d) => ({ file: d.file, m: d.text.match(/(?<![§\d])(\d{2,3})(?:-route smoke| route renders| paths)/g) }))
    .filter((x) => x.m);
  claimed.forEach((c) => c.m.forEach((phrase) => {
    const n = Number(phrase.match(/\d{2,3}/)[0]);
    if (n !== smokeRoutes.length) {
      docProblems.push({
        label: 'a route count in the docs no longer matches the smoke table',
        detail: c.file + ' says "' + phrase + '"',
        measure: 'tools/smoke.mjs has ' + smokeRoutes.length + ' routes',
        fix: 'update the document, or add the route to tools/smoke.mjs if a new page is missing from it'
      });
    }
  }));
}

/* ---------- the curriculum counts the documents quote ----------
   Modules 12 and 13 arrived, the registry went from 28 functions in 11
   modules to 34 in 13, and every document that had counted the curriculum
   kept counting the old one - including the UI copy on the Command Center.
   The numbers exist once, in tools/content_pins.mjs, and G1 fails the build
   when the artifact disagrees with them; these rules make the prose agree
   with the pin. A document that wants a different number has to change the
   pin, which changes the gate, which means the claim was decided rather than
   remembered.

   A line that describes a previous state is allowed to name the previous
   number: "the pool went 106 -> 102" is evidence, and refusing it would
   teach the documents to stop saying anything checkable. */
const { PINS } = await import('./content_pins.mjs');
const COUNT_CLAIMS = [
  { re: /(\d{2,3}) Academy functions/gi, want: () => PINS.academyFunctions, what: 'academy functions' },
  { re: /(\d{2,3}) functions, (\d{2,3}) (?:SOP steps|steps)/g, want: () => PINS.academyFunctions, at: 1, what: 'academy functions' },
  { re: /(\d{2}) modules, (\d{2,3}) functions/g, want: () => PINS.academyModules, at: 1, what: 'academy modules' },
  { re: /(\d{2,3}) quiz questions/g, want: () => PINS.academyQuizQuestions, what: 'academy quiz questions' },
  { re: /(\d{2,3}) (?:academy )?SOP steps/g, want: () => PINS.academySopSteps, what: 'academy step sequences' },
  { re: /(\d{2,3}) procedure steps/g, want: () => PINS.sopLibrarySteps, what: 'SOP library procedure steps' }
];
for (const d of docs) {
  for (const line of d.text.split(/\r?\n/)) {
    if (HISTORICAL.test(line)) continue;
    for (const claim of COUNT_CLAIMS) {
      claim.re.lastIndex = 0;
      let m;
      while ((m = claim.re.exec(line))) {
        const idx = m.length > 2 ? (claim.at || 1) : 1;
        const got = Number(m[idx]);
        const pin = claim.want();
        if (got !== pin) {
          docProblems.push({
            label: 'a ' + claim.what + ' count in the documents no longer matches the pin',
            detail: d.file + ': ' + line.trim().slice(0, 110),
            measure: 'tools/content_pins.mjs pins ' + claim.what + ' at ' + pin + ', and G1 fails the build on the artifact disagreeing',
            fix: 'update the document, or change the pin in the same commit as the content and update every document that quotes it'
          });
        }
      }
    }
  }
}

/* ---------- claims about what is built ---------- */
const themeSrc = read(path.join('src', 'core', '04b2_navbuild.js'));
const hasScheduler = /_themeSchedulerInterval\s*=\s*setInterval/.test(themeSrc);
if (hasScheduler) {
  forbid('a document says the theme-from-clock scheduler is not built',
    /dark mode scheduler[^|]*not built|nothing derives the theme from the clock/i,
    'src/core/04b2_navbuild.js runs PS._themeSchedulerInterval on a 60 s timer, and 03d2_prefs.js carries themeSchedule',
    'the roadmap row has to describe the scheduler that exists, or name what is missing from it');
}
const headSrc = read(path.join('src', 'base', '01a_head.html'));
const hasManifestLink = /rel=["']manifest["']/.test(headSrc);
if (!hasManifestLink) {
  forbid('a document claims a web app manifest ships',
    /blob manifest ships|inline blob manifest|manifest ships at/i,
    'src/base/01a_head.html links no manifest, and src/core/07b_boot.js documents why the blob manifest was removed as dead code',
    'the honest claim is that the artifact is not installable, and say what installability would cost the CSP');
}

/* The roadmap's own success-metrics table quotes the smoke count in a form
   the phrase rule above does not see ("Routes passing smoke test | 72 of
   72"). A target the project prints a number for is a number the drift check
   can measure, so it gets its own rule. */
{
  const smokeRow = /Routes passing smoke test\s*\|\s*(\d+) of (\d+)/;
  for (const d of docs) {
    for (const line of d.text.split(/\r?\n/)) {
      if (HISTORICAL.test(line)) continue;
      const m = smokeRow.exec(line);
      if (m && Number(m[1]) !== smokeRoutes.length) {
        docProblems.push({
          label: 'the smoke route count in a document no longer matches the smoke table',
          detail: d.file + ': ' + line.trim().slice(0, 110),
          measure: 'tools/smoke.mjs has ' + smokeRoutes.length + ' routes',
          fix: 'run `node tools/smoke.mjs` and quote what it prints, or add the missing route to the table'
        });
      }
    }
  }
}

/* Phase 11 statuses, read against the source.
   The roadmap carries a status word per capability bullet, and six bullets
   claimed work that is not in the build. The prose audit above catches numbers;
   this catches the other direction - a document saying a thing ships when the
   file that would ship it has no such code, and (because the rule runs both
   ways) a document still calling it not built the day somebody implements it.

   A capability is treated as present when any probe file contains its
   signature. Absence is only ever an absence of code, never of a word: these
   are the constructs the feature would have to use to exist at all. */
const CAPABILITIES = [
  { bullet: 'Context awareness', probes: ['src/core/06e3_copilot.js'], sig: /routeMeta|PS\.calcState|saved\.list\(/, what: 'the copilot reading the current route, calculator inputs or saved work' },
  { bullet: 'Comparison table', probes: ['src/core/06e2_whatif.js'], sig: /winner/i, what: 'winner highlighting in the what-if comparison table' },
  { bullet: 'Export', probes: ['src/core/06e2_whatif.js'], sig: /PS\.download|toMarkdown|toCSV/, what: 'a scenario tree leaving the browser as JSON or Markdown' },
  { bullet: 'Period snapshots', probes: ['src/core/06e5_spend.js'], sig: /snapshot|period/i, what: 'spend period captures to compare against' },
  { bullet: 'Import/export', probes: ['src/core/06e5_spend.js'], sig: /parseCSV|fromCSV|readCsv|text\.split\(.\\n/i, what: 'a CSV or JSON path reading the spend model back in' }
];
const roadmap = read('IMPROVEMENT_ROADMAP.md');
for (const cap of CAPABILITIES) {
  const present = cap.probes.some((f) => cap.sig.test(read(f)));
  const line = roadmap.split(/\r?\n/).find((l) => l.startsWith('- **(' + cap.bullet + ')**') || l.startsWith('- **' + cap.bullet + '**'));
  if (!line) {
    docProblems.push({ label: 'a gated capability bullet is gone from the roadmap', detail: 'no line begins "- **' + cap.bullet + '**"', measure: cap.probes.join(', ') + ' is still probed', fix: 'keep the bullet, or drop the capability from tools/check_drift.mjs as well' });
    continue;
  }
  const saysNotBuilt = /not built/i.test(line);
  if (!present && !saysNotBuilt) {
    docProblems.push({ label: 'the roadmap claims a capability the source does not have', detail: line.trim().slice(0, 120), measure: 'nothing in ' + cap.probes.join(' or ') + ' implements ' + cap.what, fix: 'mark the bullet 📋 not built, or build ' + cap.what });
  } else if (present && saysNotBuilt) {
    docProblems.push({ label: 'the roadmap still calls a shipped capability not built', detail: line.trim().slice(0, 120), measure: cap.what + ' is now present in ' + cap.probes.join(', '), fix: 'the feature exists - update the bullet and assert it somewhere' });
  }
}

if (docProblems.length) {
  console.error('--- documentation drift ---');
  console.error('FAIL: ' + docProblems.length + ' claim(s) in the documents no longer match the source.');
  console.error('');
  docProblems.forEach((p) => {
    console.error('  * ' + p.label);
    console.error('      ' + p.detail);
    console.error('      measured: ' + p.measure);
    console.error('      fix: ' + p.fix);
    console.error('');
  });
  console.error('The documents in this project are expected to describe what shipped.');
  console.error('Correct the document, or the code, whichever is the one that is wrong.');
  process.exit(1);
}

console.log('--- documentation drift ---');
console.log('version of record:  package.json ' + pkgVersion + ' / PS.VERSION ' + psVersion + ' / changelog top ' + topChange);
console.log('toolchain pin:      engines.node "' + pkgEngines + '", .nvmrc ' + nvmrc);
console.log('locales registered: ' + locales.length + ' (' + locales.join(', ') + ')');
console.log('dev-dependencies:   ' + devCount);
console.log('smoke routes:       ' + smokeRoutes.length);
console.log('curriculum pin:     ' + PINS.academyFunctions + ' functions in ' + PINS.academyModules + ' modules, ' + PINS.academyQuizQuestions + ' questions, ' + PINS.academySopSteps + ' step sequences');
console.log('DOCUMENTATION DRIFT: none');
process.exit(0);
