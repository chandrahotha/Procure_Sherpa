# Contributing

Procure Sherpa is a single-file, zero-runtime-dependency, offline-first
app. The source of truth is `src/`; `ProcureSherpa-v2.0.html` at the
repo root is a **generated release artifact** — never edit it directly,
your changes will be overwritten by the next build.

## Setup

```bash
npm install     # installs jsdom (the only dependency, dev-only, used to run tests in Node)
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

This runs, in order: build → cross-reference integrity → 19 calculators
(1000+ assertions) → calculator expected-value fixtures → interactive
route/UI smoke checks → content QA → 63-route smoke test → security
audit (no `eval`/`new Function`/inline handlers/`javascript:` URLs) →
accessibility audit (38 routes) → performance budget (bundle size
ceiling) → i18n coverage audit. All of it must pass except the content
and i18n audits, which are informational by design (see
[README § Known Limitations](README.md#known-limitations)) — read their
output anyway.

## Local safety net (pre-push hook)

CI (`.github/workflows/qa.yml`) runs the same `npm run qa` gate, but
**weekly**, not on every push — see the README for why. To catch
problems before they ever leave your machine, `npm install` runs
`tools/setup_hooks.mjs`, which points git at `.githooks/` so `git push`
runs the fast subset (`npm run test`: build + calculator tests + smoke)
automatically. If it fails, the push is aborted with a message telling
you to run `npm run qa` for the full picture. Skip deliberately (not
recommended) with `git push --no-verify`.

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
* **No new runtime dependencies.** Zero-dependency, offline-first, and
  no telemetry are the whole point. `jsdom` is dev-only and never ships.
* **Stay inside the performance budget.** `build.mjs` fails the build
  past 1600 KB and warns past 1360 KB (85%). If a change pushes the
  bundle toward that ceiling, say so in the PR description rather than
  letting the budget warning be the first anyone hears of it.

## Reporting a bug or security issue

Open a GitHub issue. For anything security-relevant, see
[SECURITY.md](SECURITY.md) first.
