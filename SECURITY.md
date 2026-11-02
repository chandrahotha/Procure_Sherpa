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

`tools/security_audit.mjs` parses the inline script of the built
`ProcureSherpa-v2.0.html` into an ECMAScript AST with Espree, walks it,
and combines that with a structural scan of the markup. It fails the
build on:

* `eval()` calls
* `new Function()` dynamic evaluation
* `setTimeout`/`setInterval` called with a string literal (eval-equivalent)
* `document.write` / `document.writeln`
* runtime network client instantiation: `fetch()`, `new WebSocket`,
  `new XMLHttpRequest`, `new EventSource`
* `javascript:` URLs in markup
* inline event-handler attributes (`onclick=`, etc.) in markup
* a missing Content-Security-Policy, or one that has dropped
  `default-src 'none'` or `connect-src 'none'`
* a script that will not parse at all
* untrusted-JSON guards (`PS.isSafeKey`, `PS.untrustedClone`,
  `PS.safeAssign`) that have been deleted or left unused, with the
  `JSON.parse` call-site count reported next to them

It also reports (informationally, not blocking) every dynamic `innerHTML`
assignment it finds, so they can be spot-checked for escaping; the audit
prints the count on its own line. In practice, every dynamic string
reaching `innerHTML` in this codebase is run through
`PS.esc()`/`PS.escAttr()` first - this was hand-verified across the
profile, copilot, spend-model, doc-pack, and exam modules and should hold
as a hard rule for any new code.

## Browser compatibility floor

The source is written in ES5 syntax for auditability, but the runtime
uses ES2015+ built-ins (`Set`, `Map`, `Promise`, `Object.keys`,
`Array.isArray`, `Number.EPSILON`). The supported browser floor is
**evergreen browsers** (Chrome, Edge, Firefox, Safari — latest 2
versions). Internet Explorer is not supported.

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
* **Imports are validated, and then treated as hostile data.** Backup and
  restore JSON goes through `PS.safeJSON()`
  ([src/core/03b_safeio.js](src/core/03b_safeio.js)), which rejects anything
  that is not a JSON object before it touches application state, and then
  through `PS.validateBackup()`
  ([src/core/06d2_actions_backup.js](src/core/06d2_actions_backup.js)), which
  rebuilds every section with `PS.untrustedClone()`.
* **`__proto__` cannot reach a live object.** `JSON.parse` makes `__proto__`
  an *own* property, so a plain `target[k] = v` copy of a parsed file runs the
  prototype setter instead of adding a property, and the poisoned object is
  then written back to `localStorage` and re-applied on every load. For a
  costing tool that is not code execution, it is quieter and worse to
  discover: a file someone else wrote decides which tax rate and which
  calculator defaults the reader's numbers use. `PS.isSafeKey()`,
  `PS.untrustedClone()` and `PS.safeAssign()`
  ([src/core/03a_util.js](src/core/03a_util.js)) refuse `__proto__`,
  `constructor` and `prototype` at both ends - the choke point where the file
  is cleaned, and the sinks in `PS.prefs()`, `PS.savePrefs()`,
  `PS.user.saveProfile()` and `PS.applyRestore()` - so a value that reached
  storage by an older build, a hand-edited profile or any future caller that
  forgot the filter is still refused. `tools/test_storage.mjs` proves the
  behaviour in both directions, and `tools/security_audit.mjs` fails the build
  if the guards are deleted.
* **CSV export is injection-safe.** `PS.csvCell()` neutralizes leading
  `=`, `+`, `-`, `@` characters that spreadsheet software would
  otherwise interpret as formulas.

## Build and release pipeline

The CI runner for this project is the owner's own workstation
(`runs-on: [self-hosted, Windows, X64, procure-sherpa]`), chosen because the
account cannot allocate hosted minutes. That is a real trade, and it is
controlled by three rules `tools/check_workflows.mjs` enforces on every
`npm run qa`:

* **Least privilege.** Every workflow declares `permissions: contents: read`.
  A build job that pushes nothing should not hold a token that can.
* **Fork pull requests never reach the workstation.** A `pull_request` job
  runs the contributor's code - `npm ci`, the build, every test tool - and on
  a self-hosted runner that machine is not ephemeral and not sandboxed. The QA
  job is therefore skipped unless the PR's head repo is this repository. Pull
  requests from outside the repository get no CI; a maintainer who wants to
  review one pulls it down and runs `npm run qa` locally, on a machine they
  chose.
* **A skipped gate is not a passing gate.** Publishing is triggered by
  `workflow_run` on QA's completion, and a run whose only job was *skipped*
  also concludes `success`. So the deploy condition additionally requires the
  finishing run to have been a push (or dispatch) whose head branch is `main`,
  and the trigger filters `branches: [main]`. Without both halves, "we stopped
  running strangers' code in CI" would have become "we publish what they
  proposed without testing it".

Deployment itself is the Vercel Git integration on `main`, with
`workflow_dispatch` as the manual re-publish path; `tools/verify_deploy.mjs`
re-runs the content gates against the bytes the site actually serves and
compares the build stamp to this source tree's.

## Dependency status

Nothing in this project reaches a user's browser from npm. `dependencies`
in `package.json` is **empty and stays empty**; the three dev packages are
`eslint` (lint), `jsdom` (the headless tests) and `terser` (the minified
deploy build), and all three run on a build machine.

The supply-chain question that is still real is the build machine:
`terser` produces the artifact that is actually deployed, and `jsdom`
runs the suite that decides whether a change ships.

* **`npm audit` reports 0 vulnerabilities.** That is the current state;
  it was reached in two steps. `GHSA-g3hv-75wg-m249` sits in
  `minimatch`, which arrives through the eslint chain, and eslint does not
  depend on a fixed enough version to exclude it, so `package.json` now
  carries an `overrides: { "minimatch": "^11.0.1" }` entry that resolves
  the advisory outright. The undici advisory went the same way once the
  lockfile was re-resolved rather than inherited.
* **`node tools/preflight.mjs` guards the mitigation.** It is the first
  step of `npm run qa`, `npm run test` and `npm run qa:ci`, and it fails
  if `minimatch` resolves to a vulnerable version while no override is
  declared. Without that, the fix could quietly disappear from a future
  lockfile and nobody would notice until `npm audit` rediscovered it and
  "fixed" it by downgrading eslint.
* **Do not run `npm audit fix --force`.** It proposes installing
  `eslint@4.0.0`, which cannot read `eslint.config.mjs` (flat config), so
  the lint step would stop being a check.
* **Updates are automated and every one is gated.**
  `.github/dependabot.yml` raises monthly PRs for the three dev packages
  and for the pinned GitHub Actions, and each has to pass the full QA
  gate before it can merge.
* **The install is pinned and the runtime is pinned to it.**
  `npm ci` installs exactly what `package-lock.json` declares, and
  `.npmrc` sets `engine-strict=true` so an install on a Node older than
  the `>=22.0.0` the toolchain genuinely needs refuses on the spot instead
  of failing later from inside `node_modules/undici`.
* **A compromised dev dependency is still assumed possible**, which is
  why `npm run verify:min` re-runs the unit, route, both calculator,
  accessibility and layout suites against the minified output rather than
  trusting the minifier, and why the deployed build is checked by
  `npm run verify:deploy` against the bytes the site actually serves.

## Known limitations

* The security audit is an AST traversal (Espree) plus a structural scan
  of the markup, not a full static-analysis tool, a symbolic executor or
  a third-party penetration test. It proves the specific classes of bug
  listed above are absent - an `eval()` at any depth in the bundle, a
  string timer, a live network client, a `javascript:` URL, an inline
  handler, a weakened CSP - and it cannot prove the absence of every XSS
  vector. Escaping of `innerHTML` writes is a convention this project
  holds and the audit reports the sinks for a human to check; it does not
  verify the escaping.
* There is no runtime dependency to patch, but there is also no runtime
  isolation: the CSP, the browser's same-origin rules and `localStorage`
  segregation are the whole defence, because there is no server to hold
  anything back. A user who opens a tampered copy of the file gets
  whatever that file does; nothing in the product can tell them it is not
  the published one, which is why `PS.BUILD` stamps the build with a hash
  of its sources.
