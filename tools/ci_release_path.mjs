/* ==========================================================
   Decide the release path, without depending on a shell.

   The Deploy workflow needs to know one thing: is there a Vercel token
   in this environment, so that it publishes, or is there not, so that
   the Vercel Git integration published on its own and this workflow
   only verifies it?

   That used to be a bash conditional, and a bash conditional is a
   problem, because the two runners do not agree on what a shell is. A
   hosted Linux runner runs bash. A self-hosted Windows runner runs
   PowerShell. Asking for `shell: bash` on the Windows runner finds
   the WSL shim in System32, and if WSL is not installed the step
   fails with "execvpe(/bin/bash) failed" - which looks like a broken
   script and is actually a shell mismatch.

   So the decision is made here, in Node, which every runner has. The
   answer is written to the file the runner reads step outputs from.
   ========================================================== */
import fs from 'node:fs';

const token = process.env.VERCEL_TOKEN || '';
const mode = token ? 'publish' : 'verify';

const outputFile = process.env.GITHUB_OUTPUT;
if (outputFile) {
  fs.appendFileSync(outputFile, 'mode=' + mode + '\n');
}

console.log(token
  ? 'A Vercel token is configured: this workflow will publish and verify.'
  : 'No Vercel token is configured: the Vercel Git integration publishes main, '
    + 'and this workflow will verify that it published the build from this commit.');

if (!token && !process.env.VERCEL_ORG_ID) {
  console.log('');
  console.log('Note: VERCEL_ORG_ID and VERCEL_PROJECT_ID are repository variables, '
    + 'not secrets. They are read from the variables context by the workflow.');
}
