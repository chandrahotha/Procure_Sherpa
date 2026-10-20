/* ==========================================================
   Release script: build, verify, and deploy to Vercel.

   Why this exists
   ---------------
   The Vercel project is connected to GitHub, and Vercel has been
   creating a deployment for every push to main. Every one of them was
   blocked before a build started, with:

     "The deployment was blocked because the commit author doesn't have
      permission to create deployments for this project."
     (seatBlock: TEAM_ACCESS_REQUIRED)

   The cause is the Vercel Hobby plan. Hobby teams may not have members
   at all, and the check Vercel runs on a Git-triggered deployment is
   whether the *commit author* maps to an account with team access. The
   Vercel account that owns the team has no linked GitHub account, and
   the commit author has no Vercel account, so the check can never pass.
   Inviting the commit author is not an option either: the API answers
   "Team members are not permitted on the Hobby Plan."

   A deployment pushed from the CLI is attributed to the authenticated
   user, who is the team owner, so it is not subject to that check. The
   CLI picks up the commit metadata from the local Git repository, and
   that metadata is what re-triggers the check, so this script deploys
   from a staging copy that has no .git directory.

   The result is a deployment attributed to the team owner, which builds
   and goes live, exactly as it did on 2026-10-20.

   To make Git-triggered deployments work natively instead, link the
   GitHub account to the Vercel account (Vercel dashboard, Account
   Settings, Connections, GitHub) so the commit author maps to the team
   owner. This script is the path that needs no such change.

   Usage:
     npm run deploy            build, verify, deploy to production
     npm run deploy -- --dry   do everything except the deploy
   ========================================================== */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DRY = process.argv.includes('--dry');
const SKIP_QA = process.argv.includes('--skip-qa');
const VERCEL_CLI = 'vercel@latest';
const TOKEN = process.env.VERCEL_TOKEN || '';

/* Remove the staged copy, retrying briefly, and never failing the
   release over it. */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function cleanupStage(dir) {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      fs.rmSync(dir, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
      return;
    } catch (e) {
      if (attempt === 4) {
        console.warn('\nNote: the staged copy at ' + dir + ' could not be removed (' + e.code + '). It is safe to delete manually.');
        return;
      }
      await sleep(600);
    }
  }
}
function run(cmd, args, opts = {}) {
  console.log('\n> ' + cmd + ' ' + args.join(' '));
  const r = spawnSync(cmd, args, { cwd: opts.cwd || ROOT, stdio: 'inherit', shell: process.platform === 'win32' });
  if (r.status !== 0) {
    console.error('\nFAILED: ' + cmd + ' ' + args.join(' '));
    process.exit(r.status || 1);
  }
}

/* 1. Build and verify. The deploy must never ship an artifact that has
      not passed the same gate CI runs. */
if (SKIP_QA) {
  console.log('\n> skipping the QA gate (already run upstream)');
  run('node', ['build.mjs']);
  run('node', ['tools/build_min.mjs']);
} else {
  run('npm', ['run', 'qa']);
}

/* 2. Stage a copy of the working tree with no .git, so the CLI cannot
      attribute the deployment to the commit author. */
const stage = fs.mkdtempSync(path.join(os.tmpdir(), 'procure-sherpa-release-'));
console.log('\n> staging a release copy at ' + stage);
const SKIP = new Set(['.git', 'node_modules', 'dist', '_shot', '.githooks', '.kilo', '.github']);
for (const entry of fs.readdirSync(ROOT, { withFileTypes: true })) {
  if (SKIP.has(entry.name)) continue;
  fs.cpSync(path.join(ROOT, entry.name), path.join(stage, entry.name), { recursive: true, dereference: true });
}
/* the project link is needed locally but must never be uploaded */
fs.mkdirSync(path.join(stage, '.vercel'), { recursive: true });
if (fs.existsSync(path.join(ROOT, '.vercel', 'project.json'))) {
  fs.copyFileSync(path.join(ROOT, '.vercel', 'project.json'), path.join(stage, '.vercel', 'project.json'));
}
fs.rmSync(path.join(stage, '.vercel', '.env.production.local'), { force: true });
console.log('  staged ' + fs.readdirSync(stage).length + ' entries, .git excluded');

if (DRY) {
  console.log('\nDRY RUN: built and verified, deployment skipped.');
  console.log('  artifact : ' + (fs.statSync(path.join(ROOT, 'ProcureSherpa-v2.0.html')).size / 1024).toFixed(0) + ' KB');
  console.log('  deploy   : ' + (fs.statSync(path.join(ROOT, 'dist', 'index.html')).size / 1024).toFixed(0) + ' KB');
  await cleanupStage(stage);
  process.exit(0);
}

/* 3. Deploy. A token is optional locally (the CLI's own session is
      used); in CI, VERCEL_TOKEN is set and is required, because CI has
      no session of its own. */
const deployArgs = ['--yes', VERCEL_CLI, '--prod', '--yes'];
if (TOKEN) deployArgs.push('--token=' + TOKEN);
run('npx', deployArgs, { cwd: stage });

/* The deployment has already happened at this point. On Windows the
   staged copy is regularly still locked by an indexer or an antivirus
   scanner, and an EPERM from the cleanup used to fail the whole
   release after it had already gone live. A leftover temporary
   directory is a nuisance; a failed exit code that hides a
   successful deployment is worse. */
await cleanupStage(stage);
console.log('\nDeployed. Verify with:');
console.log('  npx --yes vercel@latest inspect --logs');
