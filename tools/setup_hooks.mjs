/* Wires the repo's local git hooks (.githooks/) on `npm ci` / `npm install`,
   via the "prepare" script. This gives contributors a fast pre-push safety
   net (preflight + drift + the fast gate) next to the CI gate, which now runs
   on every push and pull request to main - it fails in seconds, on your own
   machine, before the push ever leaves it.

   Two things are needed for a hook to run, and only one of them used to
   happen here. `core.hooksPath` tells git where to look; the file also has to
   carry the executable bit, or git skips it and says so in one line of a hint
   that nobody reads. The hook was committed as 100644, so every push from a
   POSIX machine ran no local check at all while CONTRIBUTING.md described the
   safety net as if it were working. Setting the bit here is what a fresh clone
   needs, because the mode comes from the index and a Windows checkout cannot
   represent it.

   Silently no-ops outside a git checkout (e.g. if this package were ever
   installed as a dependency) or if git is unavailable. */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const HOOKS_DIR = path.join(ROOT, '.githooks');

try {
  if (!fs.existsSync(path.join(ROOT, '.git'))) {
    process.exit(0); // not a git checkout - nothing to wire
  }
  execSync('git config core.hooksPath .githooks', { cwd: ROOT, stdio: 'ignore' });

  /* POSIX only: NTFS has no executable bit, and git-for-Windows runs hook
     scripts through its own sh regardless of mode. */
  const warns = [];
  if (process.platform !== 'win32' && fs.existsSync(HOOKS_DIR)) {
    for (const name of fs.readdirSync(HOOKS_DIR)) {
      const file = path.join(HOOKS_DIR, name);
      if (!fs.statSync(file).isFile()) continue;
      const mode = fs.statSync(file).mode;
      if (!(mode & 0o111)) {
        try {
          fs.chmodSync(file, mode | 0o755);
        } catch {
          warns.push(name);
        }
      }
    }
  }

  console.log('git hooks: core.hooksPath -> .githooks (pre-push runs preflight, the drift check and `npm run test`)');
  if (warns.length) {
    console.log('git hooks: could not set the executable bit on ' + warns.join(', ') +
      '. Those hooks will be SKIPPED. Fix with: chmod +x .githooks/*');
  }
} catch (e) {
  // git not on PATH, or config write failed - do not fail npm install over this.
}
