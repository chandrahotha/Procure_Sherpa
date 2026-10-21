/* ==========================================================
   Workflow file gate.

   This exists because of a failure that ran for months without
   anybody noticing what it was.

   The Deploy workflow had a job-level condition:

       jobs:
         deploy:
           if: ${{ secrets.VERCEL_TOKEN != '' }}

   `secrets` is not an allowed context in `jobs.<job_id>.if`. The
   allowed contexts there are `github`, `needs`, `vars` and `inputs`.
   A workflow that uses `secrets` in that position fails to compile
   before a job is ever created, and GitHub reports it as a run that
   "likely failed because of a workflow file issue" with zero jobs.

   The reason it was invisible is that the run carried an annotation
   about failed account payments, which is a real and well-known
   problem on this account, so everybody - including me - read the
   red X as the billing block rather than as a workflow that could not
   parse. It failed on every single push and had never once succeeded.

   So this checks the construct directly, without needing a YAML
   parser: it finds the job-level `if:` lines by their indentation and
   looks for a context that is not allowed there. It also checks that
   a workflow named in a `workflow_run` trigger actually exists, which
   is the other way a workflow can silently never run.

   Usage: node tools/check_workflows.mjs
   ========================================================== */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DIR = path.join(ROOT, '.github', 'workflows');

let failures = 0;
const fail = (msg) => { console.log('  FAIL  ' + msg); failures++; };
const ok = (msg) => console.log('  PASS  ' + msg);

if (!fs.existsSync(DIR)) {
  console.log('no .github/workflows directory - nothing to check');
  process.exit(0);
}

const files = fs.readdirSync(DIR).filter((f) => /\.ya?ml$/.test(f));
console.log('--- workflow file gate ---');
console.log('workflows: ' + files.length + '\n');

/* The contexts GitHub allows in `jobs.<job_id>.if`. */
const ALLOWED_JOB_IF = ['github', 'needs', 'vars', 'inputs'];
/* The contexts allowed in `steps.<step_id>.if`, which is a wider set
   because it runs inside the job. */
const ALLOWED_STEP_IF = ['github', 'needs', 'strategy', 'matrix', 'job', 'runner', 'env', 'steps', 'vars', 'inputs', 'hashFiles'];

/* The root context of every expression reference in a condition.
   `steps.path.outputs.mode` is ONE reference to the `steps` context, not
   three references to `steps`, `path` and `outputs`. Splitting on every
   dot would report `path` and `outputs` as contexts, which they are not,
   so the whole check would cry wolf. */
const rootContexts = (expr) => {
  /* String literals are values, not contexts: in
     `steps.path.outputs.mode == 'publish'` the word publish is a
     literal and the only context is `steps`. */
  const stripped = String(expr).replace(/'[^']*'/g, "''").replace(/"[^"]*"/g, '""');
  /* A context reference is always `word.something`. A bare word is a
     function (`success`, `always`, `contains`), a keyword (`and`, `or`),
     or a literal, and none of those is a context. The dotted chain is
     consumed whole, so `steps.path.outputs.mode` is one reference to
     `steps` and not four references. */
  const chains = stripped.match(/\b([a-zA-Z_][a-zA-Z0-9_]*)((?:\.[a-zA-Z0-9_-]+)+)/g) || [];
  const roots = new Set();
  for (const c of chains) roots.add(c.split('.')[0]);
  return Array.from(roots);
};

const names = new Set();

for (const file of files) {
  const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
  const lines = raw.split(/\r?\n/);
  const problems = [];

  /* A tab anywhere in a YAML file is illegal. */
  lines.forEach((l, i) => {
    if (l.indexOf('\t') >= 0) problems.push('line ' + (i + 1) + ': a tab character; YAML forbids tabs for indentation');
  });

  /* The workflow's own name, for the workflow_run cross-check. */
  const nameMatch = /^name:\s*(.+)$/m.exec(raw);
  const wfName = nameMatch ? nameMatch[1].trim() : null;
  if (wfName) names.add(wfName);

  let inJobs = false;
  let jobsIndent = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^jobs:\s*$/.test(line)) { inJobs = true; jobsIndent = 0; continue; }
    if (!inJobs) continue;
    /* A top-level key ends the jobs block. */
    if (/^[a-zA-Z]/.test(line) && line.indexOf('jobs:') !== 0) { inJobs = false; continue; }

    const indent = line.length - line.trimStart().length;
    const m = /^\s*if:\s*(.+)$/.exec(line);
    if (!m) continue;
    const expr = m[1];
    const isJobLevel = indent === jobsIndent + 4;
    const isStepLevel = indent >= jobsIndent + 6;

    if (isJobLevel) {
      /* Extract every context.root used in the expression. */
      const used = rootContexts(expr);
      for (const ctx of used) {
        if (ctx === 'secrets' || ctx === 'env' || ctx === 'steps' || ctx === 'runner' || ctx === 'jobs') {
          problems.push('line ' + (i + 1) + ': a job-level `if` uses the `' + ctx +
            '` context, which GitHub does not allow there (allowed: ' + ALLOWED_JOB_IF.join(', ') +
            '). The workflow will fail to compile and the run will show as a workflow file issue with no jobs.');
        }
      }
    } else if (isStepLevel) {
      const used = rootContexts(expr);
      for (const ctx of used) {
        if (ctx === 'secrets') continue; /* secrets ARE allowed at step level */
        if (!ALLOWED_STEP_IF.includes(ctx)) {
          problems.push('line ' + (i + 1) + ': a step-level `if` uses the `' + ctx + '` context, which is not in the allowed set');
        }
      }
    }
  }

  /* Every workflow needs at least one trigger and one job. */
  if (!/^on:\s*$/m.test(raw) && !/^on:\s*\S/m.test(raw)) {
    problems.push('no `on:` trigger block');
  }
  if (!/^jobs:\s*$/m.test(raw)) {
    problems.push('no `jobs:` block');
  }
  if (/\bruns-on:\s*\[/.test(raw)) {
    problems.push('a matrix `runs-on: [ ... ]` is used; a job-level `if` cannot be used to choose between them here');
  }

  if (problems.length) {
    problems.forEach((p) => fail(file + ': ' + p));
  } else {
    ok(file + (wfName ? ' (' + wfName + ')' : '') + ' has no forbidden contexts in its conditions');
  }
}

/* A workflow_run trigger that names a workflow which does not exist
   means the trigger never fires, and the workflow never runs, and
   nothing says so. */
const allRaw = files.map((f) => fs.readFileSync(path.join(DIR, f), 'utf8')).join('\n');
const referenced = [];
const wrRe = /workflows:\s*\[([^\]]*)\]/g;
let m;
while ((m = wrRe.exec(allRaw))) {
  m[1].split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean).forEach((n) => referenced.push(n));
}
const missing = referenced.filter((n) => !names.has(n));
if (referenced.length) {
  if (missing.length) missing.forEach((n) => fail('a workflow_run trigger names "' + n + '", which does not exist; the trigger would never fire'));
  else ok('every workflow_run trigger names a workflow that exists (' + referenced.join(', ') + ')');
}

console.log('');
console.log(failures ? 'WORKFLOW GATE: FAIL (' + failures + ')' : 'WORKFLOW GATE: PASS');
process.exit(failures ? 1 : 0);
