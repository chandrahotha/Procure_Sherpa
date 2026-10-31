/* ==========================================================
   Preflight: fail here, loudly, instead of downstream, misleadingly.

   Two failure modes in this repo produce error messages that describe
   something other than the actual problem:

   1. `node_modules` does not exist. `npm run qa` then runs the bare
      `eslint` on PATH. On a machine with a system ESLint 6.4.0
      installed, that is what gets picked up, and it reports:

          "ESLint couldn't find a configuration file"

      which reads like the flat config is broken. It is not broken; the
      wrong eslint is running. The real problem is that the dev
      toolchain was never installed.

   2. Node is too old. `package.json` declares `engines.node
      >=22.0.0`, and jsdom 30 needs it (undici 8.12 resolves
      `zlib.ZstdDecompress`, which does not exist below Node 22, and
      throws `Cannot read properties of undefined (reading 'bind')`
      from inside node_modules while jsdom is loading). The engines
      field was a statement of intent that nothing enforced.

   So this file checks both, before any other step, and prints what to
   run. Nothing here imports from node_modules: it has to work on
   exactly the Node it is reporting on, and on a clone with no install.

   It is the first step of `npm run qa`, of `npm run test` (which the
   local pre-push hook runs) and of `npm run qa:ci`, so a fresh clone
   cannot get as far as a misleading error.
   ========================================================== */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const problems = [];
const notes = [];

const readJSON = (rel) => {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
  } catch {
    return null;
  }
};

/* ---------- 1. Node version ---------- */
const pkg = readJSON('package.json');
const engines = (pkg && pkg.engines && pkg.engines.node) || '>=22.0.0';
const minMajor = Number((engines.match(/\d+/) || ['22'])[0]);
const current = process.versions.node;
const currentMajor = Number(current.split('.')[0]);

if (currentMajor < minMajor) {
  problems.push(
    'Node ' + current + ' is running, and this project declares engines.node "' + engines + '".\n' +
    '  The test tooling will fail in a way that looks like a bug in the code:\n' +
    "  jsdom 30 pulls undici 8.12, which throws Cannot read properties of undefined\n" +
    "  (reading 'bind') below Node 22.\n" +
    '  Fix it with whichever of these your machine uses:\n' +
    '    nvm use 22                    # nvm reads .nvmrc in this directory\n' +
    '    nvm install 22 && nvm use 22  # if 22 is not installed yet\n' +
    '    fnm use | volta pin 22        # other version managers\n' +
    '  Check with: node -v             (must report v22.x or newer)'
  );
} else {
  notes.push('node ' + current + ' (declared minimum major: ' + minMajor + ')');
}

/* ---------- 2. the dev toolchain is actually installed ---------- */
if (!fs.existsSync(path.join(ROOT, 'node_modules'))) {
  problems.push(
    'node_modules does not exist, so the dev toolchain is not installed.\n' +
    '  Run:  npm ci     (installs exactly what package-lock.json pins)\n' +
    '  Without it, a bare `eslint` resolves to whatever is on PATH. A system\n' +
    "  ESLint 6 cannot read eslint.config.mjs and reports \"ESLint couldn't find a\n" +
    '  configuration file", which is a symptom of the missing install and not a\n' +
    '  problem with the config.\n' +
    '  Note: npm ci itself needs Node 22 here. Switch first, then install.'
  );
} else {
  /* Check the resolved versions, not just the directory: a half-installed
     or stale node_modules produces the same nonsense as none at all. */
  const declared = Object.keys((pkg && pkg.devDependencies) || {});
  const missing = declared.filter((name) => !fs.existsSync(path.join(ROOT, 'node_modules', name, 'package.json')));
  if (missing.length) {
    problems.push(
      'node_modules exists but is missing declared dev tooling: ' + missing.join(', ') + '\n' +
      '  Run:  npm ci'
    );
  } else {
    const eslintVersion = (readJSON(path.join('node_modules', 'eslint', 'package.json')) || {}).version || '0';
    if (Number(String(eslintVersion).split('.')[0]) < 9) {
      problems.push(
        'The resolved eslint is ' + eslintVersion + ', but eslint.config.mjs is a flat config,\n' +
        '  which needs eslint 9 or newer. Something older was picked up during the install.\n' +
        '  Run:  npm ci     then confirm with:  npm ls eslint'
      );
    } else {
      notes.push('eslint ' + eslintVersion + ' and ' + declared.length + ' declared dev packages resolved');
    }

    /* The minimatch mitigation. package.json overrides minimatch to a
       version that does not carry GHSA-g3hv-75wg-m249, because eslint's
       own chain (config-array, eslintrc) still pins an older one. If the
       override is gone AND the resolved minimatch is still vulnerable,
       the mitigation was dropped: say so here rather than letting a later
       `npm audit` rediscover it and "fix" it by downgrading eslint to 4. */
    const mm = readJSON(path.join('node_modules', 'minimatch', 'package.json'));
    const overridden = pkg && pkg.overrides && pkg.overrides.minimatch;
    if (mm) {
      const parts = String(mm.version).split('.').map(Number);
      const patched = parts[0] > 11 || (parts[0] === 11 && (parts[1] > 0 || parts[2] >= 1));
      if (!patched && !overridden) {
        problems.push(
          'minimatch ' + mm.version + ' is resolved and no override is declared in package.json.\n' +
          '  GHSA-g3hv-75wg-m249 is fixed in minimatch 11.0.1, and the eslint chain still\n' +
          '  asks for an older one, so this repo overrides it. Restore the override, or drop\n' +
          '  it only once eslint itself depends on minimatch >= 11.0.1.\n' +
          '  Do not run `npm audit fix --force`: it installs eslint@4, which cannot read the\n' +
          '  flat config, and the lint step stops being a check.'
        );
      } else {
        notes.push('minimatch ' + mm.version + (overridden ? ' (pinned by overrides: ' + overridden + ')' : ''));
      }
    }
  }
}

/* ---------- 3. the local pre-push hook: does it actually run? ----------
   A hook that git silently skips is worse than no hook, because the
   documentation describes a safety net that is not there. `core.hooksPath`
   is only half of it: on a POSIX filesystem the file also needs the
   executable bit, and if it does not have one git prints a hint about
   being "ignored because it's not set as executable" and carries on. The
   hook in this repo was committed 100644, so every push from Linux ran
   zero local checks while the pre-push gate was being credited for them.
   Windows is exempt: NTFS has no executable bit and git-for-Windows runs
   hooks through its own sh either way, so asserting it there would be
   asserting a thing that cannot be true. */
try {
  const gitDir = path.join(ROOT, '.git');
  if (fs.existsSync(gitDir)) {
    let configPath = path.join(gitDir, 'config');
    if (fs.statSync(gitDir).isFile()) {
      /* A worktree or a CI checkout keeps its config elsewhere; follow the
         pointer instead of assuming the path. */
      const pointer = fs.readFileSync(gitDir, 'utf8').match(/^gitdir:\s*(.+)$/m);
      if (pointer) configPath = path.join(path.resolve(ROOT, pointer[1].trim()), 'config');
    }
    const gitConfig = fs.existsSync(configPath) ? fs.readFileSync(configPath, 'utf8') : '';
    const wired = /hooksPath\s*=\s*\.githooks/.test(gitConfig);
    if (!wired) {
      notes.push('the pre-push hook is not wired on this clone: run `npm ci`, or\n' +
        '       git config core.hooksPath .githooks');
    } else if (process.platform !== 'win32') {
      const hooksDir = path.join(ROOT, '.githooks');
      const unrunnable = fs.readdirSync(hooksDir).filter((name) => {
        const file = path.join(hooksDir, name);
        if (!fs.statSync(file).isFile()) return false;
        return !(fs.statSync(file).mode & 0o111);
      });
      if (unrunnable.length) {
        problems.push(
          'core.hooksPath is set, but ' + unrunnable.map((n) => '.githooks/' + n).join(', ') +
            ' is not executable,\n' +
          '  so git SKIPS it and the local pre-push gate has never run on this machine.\n' +
          '  The symptom is a line nobody reads, on push:\n' +
          '    hint: The \'.githooks/pre-push\' hook was ignored because it\'s not set as executable.\n' +
          '  Fix: chmod +x .githooks/*   (npm ci does this too, via tools/setup_hooks.mjs)'
        );
      } else {
        notes.push('pre-push hook wired and executable');
      }
    } else {
      notes.push('pre-push hook wired (executability is not checkable on Windows)');
    }
  }
} catch {
  /* Reading git configuration is a convenience. Nothing in the shipped
     artifact depends on it. */
}

/* ---------- report ---------- */
if (problems.length) {
  console.error('--- preflight ---');
  console.error('');
  problems.forEach((p, i) => {
    console.error((i + 1) + '. ' + p);
    console.error('');
  });
  console.error('PREFLIGHT: FAIL - fix the above before running the gate.');
  console.error('Nothing downstream has run, so whatever you were about to blame');
  console.error('(eslint.config.mjs, a page, a calculator) is not what failed here.');
  process.exit(1);
}

console.log('--- preflight ---');
notes.forEach((n) => console.log('  ok  ' + n));
console.log('PREFLIGHT: PASS');
process.exit(0);
