# Security

Procure Sherpa is a single-file, offline-first, client-only application.
There is no server, no backend, no database, and no telemetry — the
threat model is therefore almost entirely about the file itself: what it
does in the browser it's opened in, and what happens to data a user
stores in `localStorage`.

## Reporting a vulnerability

Open a issue at
[github.com/chandrahotha/Procure_Sherpa/issues](https://github.com/chandrahotha/Procure_Sherpa/issues)
marked `security`. Because this is a static client-side file with no
user accounts, no server, and no shared data between users, there is no
private disclosure inbox at this time — please still avoid posting a
working exploit for anything that could be used to trick a user (e.g. a
crafted backup/import file) into leaking their own saved data. A short
description and reproduction steps are enough.

## What's already enforced (checked on every `npm run qa`)

`tools/security_audit.mjs` scans the built `ProcureSherpa-v2.0.html` and
fails the build on:

* `eval()` or `new Function()` usage
* `javascript:` URLs
* inline event-handler attributes (`onclick=`, etc.)

It also reports (informationally) every dynamic `innerHTML` assignment
and `document.write` call so they can be spot-checked for escaping. In
practice, every dynamic string reaching `innerHTML` in this codebase is
run through `PS.esc()`/`PS.escAttr()` first — this was hand-verified
across the profile, copilot, spend-model, doc-pack, and exam modules and
should hold as a hard rule for any new code.

## Data handling

* **No network calls at runtime.** The Content-Security-Policy in
  `src/base/01a_head.html` sets `connect-src 'none'`, so even if a bug
  tried to phone home, the browser would block it.
* **Storage is local only.** All user data (saved calculations,
  checklists, exam history, profile) lives in `localStorage` in the
  user's own browser. `PS.store` ([src/core/03d1_store.js](src/core/03d1_store.js))
  handles quota-exceeded and storage-disabled (private browsing)
  gracefully, falling back to an in-memory session store rather than
  crashing.
* **Imports are validated, not trusted.** Backup/restore JSON goes
  through `PS.safeJSON()` ([src/core/03b_safeio.js](src/core/03b_safeio.js)),
  which rejects anything that isn't a JSON object before it touches
  application state.
* **CSV export is injection-safe.** `PS.csvCell()` neutralizes leading
  `=`, `+`, `-`, `@` characters that spreadsheet software would
  otherwise interpret as formulas.

## Known limitations

* The security audit is pattern-based (regex over the built file), not
  a full static analysis tool or a third-party pen test. It catches the
  specific classes of bug listed above; it does not guarantee the
  absence of all XSS vectors.
* There is no automated dependency vulnerability scanning configured
  yet. `dependencies` in `package.json` is empty, so nothing reaches a
  user's browser: `jsdom` (tests), `eslint` (lint) and `terser` (the
  minified deploy build) are all dev-only and run on a build machine.
  A compromised dev dependency could still affect the deploy build,
  which is why `npm run verify:min` re-runs the route, calculator and
  accessibility suites against the minified output rather than trusting
  the minifier.
