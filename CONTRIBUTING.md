# Contributing

Procure Sherpa is a single-file, zero-runtime-dependency, offline-first
app. The source of truth is `src/`; `ProcureSherpa-v2.0.html` at the
repo root is a **generated release artifact** — never edit it directly,
your changes will be overwritten by the next build.

## Setup

```bash
npm install     # dev-only tooling: jsdom (tests in Node), eslint (lint), terser (deploy build).
                # `dependencies` is empty; none of this ships to a user.
                # also wires a local pre-push git hook - see "Local safety net" below
```

## Making a change

1. Create a feature branch from `main`.
2. Edit fragments under `src/` (see [src/README.md](src/README.md) and
   `src/manifest.txt` for the assembly order).
3. Rebuild: `npm run build` (or `npm run qa` for the full gate — see below).
4. Commit both your `src/` changes **and** the regenerated
   `ProcureSherpa-v2.0.html` in the same commit, so the built file never
   drifts from source.

## Before opening a PR

Run the full QA gate locally — this is the actual release bar, not a
suggestion:

```bash
npm run qa
```

This runs, in order: build → lint → cross-reference integrity → 19
calculators (1013 assertions) → calculator expected-value fixtures (51
hand-computed) → interactive route/UI checks → content integrity and
quiz-engine gate → 63-route smoke test → security audit (no
`eval`/`new Function`/inline handlers/`javascript:` URLs) →
accessibility audit (38 routes) → performance budget (bundle size
ceiling) → i18n coverage audit → minified deploy build, re-verified with
the smoke, calculator and accessibility suites.

**All of it must pass except the i18n audit**, which reports coverage and
exits `0` because there is nothing to enforce against a single locale
(see [README § Known Limitations](README.md#known-limitations)) — read
its output anyway.

The content gate used to print what it found and exit `0` regardless,
which meant it could never fail a build. It now asserts, and it caught
five duplicate content ids and eight broken cross-references that had
been invisible. If you add a content type, add its description field to
`PS.DESC_FIELDS` in `src/core/90_normalize.js` or items of that type will
never be checked — the gate fails if a registered type is missing there.

## Local safety net (pre-push hook)

CI (`.github/workflows/qa.yml`) runs `npm run qa:ci` — the drift check
followed by the full gate — on **every push and pull request to `main`**,
plus weekly to catch environment drift.

The hook is still worth having: it fails in seconds locally instead of
minutes later in Actions. `npm install` runs `tools/setup_hooks.mjs`,
which points git at `.githooks/` so `git push` first runs
`node tools/check_drift.mjs` (did you rebuild the artifact after editing
`src/`?) and then the fast subset (`npm run test`: build + calculator
tests + smoke). If either fails the push is aborted with a message
telling you what to run. Skip deliberately (not recommended) with
`git push --no-verify`.

## Rules that exist for a reason

* **Every dynamic string reaching `innerHTML` goes through `PS.esc()` /
  `PS.escAttr()`.** This has been true everywhere in the codebase; keep
  it that way. `tools/security_audit.mjs` flags raw `innerHTML` sinks
  informationally so they can be spot-checked, but it does not verify
  escaping for you.
* **No invented authority or accreditation claims.** See
  [README § Credential Transcript](README.md#5-credential-transcript-certificate--disabled-future-feature)
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
  past 1600 KB and warns past 1360 KB (85%). If a change pushes the
  bundle toward that ceiling, say so in the PR description rather than
  letting the budget warning be the first anyone hears of it.

## Reporting a bug or security issue

Open a GitHub issue. For anything security-relevant, see
[SECURITY.md](SECURITY.md) first.
