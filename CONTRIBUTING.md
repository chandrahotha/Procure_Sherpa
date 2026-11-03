# Contributing

Procure Sherpa is a single-file, zero-runtime-dependency, offline-first
app. The source of truth is `src/`; `ProcureSherpa-v2.0.html` at the
repo root is a **generated release artifact** — never edit it directly,
your changes will be overwritten by the next build.

## Setup

The toolchain needs **Node 22 or newer**. The application does not - it
runs in any evergreen browser from a local file - but the build and test
tooling does, because jsdom 30 loads undici 8.12, which reads
`zlib.ZstdDecompress` at import time and that symbol does not exist
before Node 22.

Three files say the same thing about it, on purpose, and
`tools/check_drift.mjs` fails the build if they diverge:

| File | Says |
|---|---|
| `package.json` -> `engines.node` | `>=22.0.0`, the declared requirement |
| `.npmrc` -> `engine-strict=true` | makes `npm ci` refuse instead of warn |
| `.nvmrc` / `.node-version` | `22`, the version a version manager should pick |

```bash
git clone https://github.com/chandrahotha/Procure_Sherpa.git
cd Procure_Sherpa

nvm use 22          # or fnm use / volta pin 22; check with `node -v`
npm ci              # refuses on Node 20 with a clear notsup error
node tools/preflight.mjs
```

`npm ci` installs exactly what `package-lock.json` pins and then runs
`tools/setup_hooks.mjs`, which points git at `.githooks/`. `dependencies`
is empty: the three dev packages are `eslint` (lint), `jsdom` (the
headless tests) and `terser` (the deploy build), and none of them ships
to a user.

Do **not** run `npm audit fix --force`. It proposes installing
`eslint@4.0.0`, which cannot read `eslint.config.mjs`, so the lint step
would stop being a check. What `npm audit` says today, and why, is in
[SECURITY.md](SECURITY.md#dependency-status).

### If the gate fails and the message looks wrong, it is the toolchain

`node tools/preflight.mjs` is the first step of `npm run qa`, of
`npm run test` (which the pre-push hook runs) and of `npm run qa:ci`, so
this is mostly impossible now. It exists because the two most common
setup failures produce messages that blame the code:

* **No `node_modules`.** A bare `eslint` then resolves to whatever is on
  `PATH`. A system ESLint 6 reports `ESLint couldn't find a configuration
  file`, which is a symptom of the missing install, not a problem with the
  flat config. Fix: `npm ci`.
* **Node too old.** The first symptom is a stack trace from inside
  `node_modules/undici`, which reads like a bug in the test harness. Fix:
  `nvm use 22`.

## Making a change

This repository works on `main`. There is no feature-branch flow and no
PR queue in practice; a change is committed to `main` once `npm run qa`
passes locally, and CI re-runs the same gate on the push. (`CONTRIBUTING`
used to describe a branch-and-PR workflow that nothing in the repo
enforced. The PULL_REQUEST_TEMPLATE still exists for the occasional
outside contribution.)

1. Edit fragments under `src/` (see [src/README.md](src/README.md) and
   `src/manifest.txt` for the assembly order).
2. Rebuild: `npm run build` (or `npm run qa` for the full gate, which
   rebuilds first anyway).
3. Commit both your `src/` changes **and** the regenerated
   `ProcureSherpa-v2.0.html` in the same commit, so the built file never
   drifts from source.

## Before pushing

Run the full QA gate locally — this is the actual release bar, not a
suggestion:

```bash
npm run qa
```

This runs, in order: preflight → build and validate → lint → workflow
file gate → cross-reference integrity → utility unit tests against the
shipped artifact → 19 calculators → calculator expected-value fixtures →
interactive route/UI checks → content integrity and quiz-engine gate →
route smoke → layout audit → the integrity gate → security audit →
accessibility audit → performance budget → i18n coverage → minified
deploy build, re-verified with the unit, smoke, calculator, accessibility
and layout suites.

The counts are printed by the tools that produce them, and `npm run qa`
is the only trustworthy source for them: 1,021 calculator assertions over
19 calculators, 51 expected-value fixtures, 22 utility unit tests, 18
content/quiz assertions, 88 route renders, 40 layout checks and the
integrity gate's own `gates exercised / assertions` summary line. They move
when the suite grows, which is why documents here quote them as of the
date they were written and the gate prints them live.

**Every step is a hard gate.** That changed in this pass: the i18n audit
used to print its coverage and exit `0` whatever it saw, which is how the
roadmap could claim one locale and 20% coverage while the catalog
registered two locales and had every key wired. It now fails if a catalog
key is defined but never reaches the screen, if a key is used but not
defined, or if a registered locale is missing a key the English catalog
has.

The content gate used to print what it found and exit `0` regardless,
which meant it could never fail a build. It now asserts, and it caught
five duplicate content ids and eight broken cross-references that had
been invisible. If you add a content type, add its description field to
`PS.DESC_FIELDS` in `src/core/90_normalize.js` or items of that type will
never be checked — the gate fails if a registered type is missing there.

The same pass fixed two more gates that could not fail:

* `tools/test_unit.mjs` tested **copies** of `PS.esc`, `PS.csvCell`,
  `PS.safeJSON` and the rest that the file kept next to its own
  assertions. It now loads the built artifact and tests the functions the
  user runs, and it is wired into `npm run qa` - it is the only assertion
  behind requirement Section 34's CSV-injection rule, and the gate had
  never once run it.
* `tools/test_calcs.mjs` and `tools/test_calc_values.mjs` printed
  `runtime errors: N` and then exited on the assertion count alone, so a
  calculator throwing on every route passed. Runtime errors now fail
  them, the same way they already fail the smoke test.

## The version of record

`package.json`'s `version` is the version of record, and
`PS.VERSION` in `src/core/03a_util.js` is what the running application
tells the user: the What's New page marks the entry equal to it as "Your
version", the audit log writes it, a backup envelope carries it, and the
Markdown export footer prints it. `tools/check_drift.mjs` fails the build
when `package.json`, `PS.VERSION` and the newest `PS.whatsNew.CHANGES`
entry do not name the same release.

The artifact is still named `ProcureSherpa-v2.0.html`. That filename is
fixed by the master requirements (sections 4.1 and 81) and by every
download link in the README; it is a product name, not the version, and
the tools read the version out of the file rather than out of its name.

## Local safety net (pre-push hook)

CI (`.github/workflows/qa.yml`) runs `npm run qa:ci` — the drift check
followed by the full gate — on **every push and pull request to `main`**,
plus weekly to catch environment drift.

The hook is still worth having: it fails in seconds locally instead of
minutes later in Actions. `npm ci` runs `tools/setup_hooks.mjs`, which
points git at `.githooks/` so `git push` first runs
`node tools/preflight.mjs`, then `node tools/check_drift.mjs` (did you
rebuild the artifact after editing `src/`, and does every document still
agree with the source?), and then the fast subset (`npm run test`:
preflight + build + the workflow-file gate + unit + calculator tests +
smoke + layout + integrity). If any of it
fails the push is aborted with a message telling you what to run. Skip
deliberately (not recommended) with `git push --no-verify`.

Pointing git at the directory is only half of what a hook needs. On a POSIX
filesystem the file also has to carry the executable bit, and when it does not,
git skips it and says so in one line of a hint that nobody reads:

```
hint: The '.githooks/pre-push' hook was ignored because it's not set as executable.
```

That is what had actually been happening. The hook was committed as mode
`100644`, so every push from Linux or macOS ran **no** local check while this
file described the safety net as though it did. It is now committed `100755`,
`tools/setup_hooks.mjs` sets the bit during `npm ci` (which matters for a
Windows checkout, where the mode cannot come from the index), and
`tools/preflight.mjs` fails the gate when `core.hooksPath` is wired but the
hook is not executable — because a silently skipped check is the same class of
defect as a missing one. Windows is exempt from that assertion: NTFS has no
executable bit, and git-for-Windows runs hooks through its own `sh` either way.

## CI is green because nothing ran

That title was literally true for twelve days, and this section keeps the
name so the next reader who hits the same failure mode finds it.

The QA workflow used to run on a **self-hosted runner**
(`procure-sherpa-workstation`, Windows, the machine that developed this
project). That was chosen because hosted minutes on this account were
believed to be blocked by the spending limit, and a blocked job shows up
as a red run nobody can read. The trade was availability: a job whose
runner is asleep does not fail, it **queues**, and it can queue until
GitHub's own 24-hour limit cancels it. The scheduled run of 2026-10-26
was cancelled after 24h0m2s having run nothing, and the Deploy run after
it was `skipped` because the QA run it waits for never completed. A run
that never started is neither a pass nor a fail, and the badge does not
distinguish it.

### The fix, as measured on 2026-11-03

The spending limit that blocked hosted allocation is gone. Verified
empirically before touching `main`: a canary branch ran this exact suite
on `ubuntu-latest`, and it executed and passed in under two minutes
(run 41547617809). Both workflows now declare `runs-on: ubuntu-latest` -
free for public repositories, ephemeral, and always allocated, so CI no
longer depends on any workstation being awake. Nothing about the gate
itself changed: the same `qa:ci` chain runs, the same fork-PR skip holds
(now as defense in depth), and every job is still bounded by
`timeout-minutes`.

| Fact | Value |
|---|---|
| Runners used | GitHub-hosted (`ubuntu-latest`), no self-hosted runner required |
| First full hosted run | run 41547617809, `success`, 2026-11-03, ~2 minutes |
| Old self-hosted runner | `procure-sherpa-workstation` remains registered but offline and unused; it can be removed in Settings → Actions → Runners |
| Deploy mode | `verify` (no `VERCEL_TOKEN` secret): the Vercel Git integration publishes `main`, and the Deploy workflow asserts the served bytes are the build from the tested commit |

### If runs start queueing again

The failure mode to recognise: a run that sits in **Queued** with
`run_started_at` never set. That means no runner was allocated - a
billing/spending-limit change on the account, or a GitHub incident. It
is not a code fault and no workflow edit fixes it:

1. Check whether it is one run or all of them: open any recent run and
   look at whether the job ever left Queued. The Actions status page
   (githubstatus.com) rules out an outage.
2. Check Settings → Billing and plans → Spending limit on the account -
   that is what blocked hosted allocation here once before.
3. Meanwhile the local gate is still the source of truth: `npm run qa`
   runs the identical chain, and the pre-push hook runs a fast version
   of it on every push whether CI is alive or not.
4. A self-hosted runner remains a legitimate fallback (register one,
   add its labels to `runs-on` in both workflows); everything in the
   suite is Node-based and shell-independent, so any OS works.
5. **The `production` environment.** If it is configured with required
   reviewers, the Deploy job waits for a human *before it starts*, and
   `timeout-minutes` does not apply to that wait. Check
   Settings → Environments → production if a deploy sits at "waiting".
   (Currently it has no protection rules, so the Deploy job starts
   immediately after QA concludes.)

## Rules that exist for a reason

* **Every dynamic string reaching `innerHTML` goes through `PS.esc()` /
  `PS.escAttr()`.** This has been true everywhere in the codebase; keep
  it that way. `tools/security_audit.mjs` flags raw `innerHTML` sinks
  informationally so they can be spot-checked, but it does not verify
  escaping for you.
* **No invented authority or accreditation claims.** See
  [README § Procurement Academy](README.md#procurement-academy)
  for why the certificate feature was disabled — this project states
  exactly what happened and who issued it, never more.
* **No new runtime dependencies.** Zero-dependency, offline-first and
  no telemetry are the whole point. `dependencies` in `package.json` must
  stay empty; `jsdom`, `eslint` and `terser` are dev-only and never ship.
* **`src/` is ES5, and the linter enforces it.** The fragments are
  concatenated into one `<script>` and must run in any browser that can
  open a local file, with no transpiler in the chain. `eslint.config.mjs`
  pins `ecmaVersion: 5` for `src/`, so an arrow function, `const` or
  template literal there is a build failure, not a review comment.
  `tools/` is modern Node ESM and has no such restriction.
* **Nothing new in the global scope.** Every fragment shares one scope;
  hang exports off `PS`. `no-implicit-globals` enforces this.
* **Stay inside the performance budget.** `build.mjs` fails the build
  past the transfer ceiling derived from "3 seconds on 4G" and warns at
  85% of it. If a change pushes the bundle toward that ceiling, say so in
  the commit message rather than letting the budget warning be the first
  anyone hears of it.
* **A gate must be able to fail.** Before adding an assertion, ask what
  change to the product would turn it red. If the answer is "none", the
  check is decoration. Three checks in this repo were recently found in
  exactly that state, and they are listed above.

## Reporting a bug or security issue

Open a GitHub issue. For anything security-relevant, see
[SECURITY.md](SECURITY.md) first.
