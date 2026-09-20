/* Wires the repo's local git hooks (.githooks/) on `npm install`, via the
   "prepare" script. This gives contributors a fast pre-push safety net
   (build + calculator tests + smoke) without adding a CI dependency or
   changing the weekly-only GitHub Actions cadence - it runs on the
   contributor's machine, before the push ever leaves it.
   Silently no-ops outside a git checkout (e.g. if this package were ever
   installed as a dependency) or if git is unavailable. */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

try {
  if (!fs.existsSync(path.join(ROOT, '.git'))) {
    process.exit(0); // not a git checkout - nothing to wire
  }
  execSync('git config core.hooksPath .githooks', { cwd: ROOT, stdio: 'ignore' });
  console.log('git hooks: core.hooksPath -> .githooks (pre-push runs `npm run test`)');
} catch (e) {
  // git not on PATH, or config write failed - do not fail npm install over this.
}
