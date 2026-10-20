# ADR 0001 — The single-file architecture, and what happens when it runs out

**Status:** Accepted
**Date:** 2026-09-20

## Context

Procure Sherpa ships as one HTML file. Everything — 155 source fragments of
markup, CSS, application code and content — is concatenated by `build.mjs`
into `ProcureSherpa-v2.0.html`, which is committed to the repository and is
what a user downloads.

This is not an accident of how the project started. It buys four properties
that are genuinely hard to get any other way:

- **It works offline, with no install.** Double-click the file. No server,
  no runtime, no package manager, no network.
- **It is auditable end to end.** A procurement team can read every line of
  the thing they are about to trust with commercial decisions. There is no
  bundler output, no transpiled code and no vendored dependency tree
  standing between the source and what runs.
- **It has no supply chain.** Zero runtime dependencies means zero runtime
  CVEs, and nothing to update on a schedule.
- **It cannot leak.** The CSP sets `default-src 'none'` and
  `connect-src 'none'`; there is no server to send anything to. "Your data
  stays in your browser" is a structural fact, not a policy promise.

The cost is equally concrete. The whole application is parsed before first
paint. There is no lazy loading, no code splitting and no route-level
chunking, because all three require more than one file — which is the one
thing this design does not permit.

`build.mjs` enforces a hard budget of **1600 KB**, with a warning at 85%
(1360 KB). Current state:

| Artifact | Size | Headroom |
|---|---|---|
| `ProcureSherpa-v2.0.html` (readable, committed) | ~1.26 MB | ~340 KB |
| `dist/index.html` (minified, deployed) | ~1.05 MB | ~550 KB |

So the budget is roughly 79% spent on the readable artifact, and the
trajectory is upward: nearly all growth is content (curriculum, SOPs,
templates), which is the product's reason to exist. The ceiling is real and
approaching, and the previous state of this repository had no written answer
for what to do when it arrives.

## Decision

**Keep the single-file architecture. Decouple the readable artifact from
the deployed one.**

`npm run build` produces the readable, committed artifact. It stays
unminified so that it diffs line by line in review, stays auditable by a
non-developer, and remains the thing a user downloads for offline use.

`npm run build:min` produces `dist/index.html`: the same application, run
through terser at `ecma: 5` with top-level mangling disabled (the fragments
reach each other through the `PS` global, so mangling top-level names would
break them). It is generated at deploy time, is listed in `.gitignore`, and
is never committed. `vercel.json` builds and serves it.

Minification is only worth having if the minified output is the same
program, so `npm run verify:min` re-runs the route smoke suite, both
calculator suites and the accessibility audit **against `dist/index.html`**,
not just against the readable build. `npm run qa` ends with that step.

This is deliberately not a code-splitting scheme. It buys headroom (~210 KB
today, and it scales with the code) without giving up any of the four
properties above, and it costs one dev-dependency that never reaches a user.

## Trigger conditions for revisiting this

This decision should be reopened when **any** of the following becomes true.
They are written down so the first sign of trouble is not a blocked build.

1. **The readable artifact passes 1360 KB** (the 85% soft warning). The
   build already prints a warning here. Treat it as the start of the
   conversation, not a nuisance. The artifact was 1271 KB when this ADR
   was written and is 1950 KB now, after the v2.4 revamp added eight
   workbenches and three Academy modules. It is still inside the ceiling,
   and the ceiling was raised on a measured basis rather than to fit
   whatever the content happened to be.
2. **The minified artifact passes 1360 KB.** At that point compression has
   stopped being an answer and the payload is genuinely too large.
3. **First-paint time on a mid-range phone on 4G exceeds ~3 seconds.**
   Bundle size is a proxy; this is the thing actually being protected.
4. **A requirement arrives that needs a server** — shared state between
   users, authentication, a system of record, or a real audit trail. Any of
   these ends the single-file premise on its own terms, and the size
   question becomes secondary.

## Options considered, and what each would actually cost

**A. Do nothing.** Free until the budget is hit, then the build fails and
the decision gets made under pressure with a release blocked. Rejected: the
whole point of a budget is to be early.

**B. Minify the committed artifact too.** Another ~200 KB, at the cost of
making every content change an unreviewable blob and destroying the
auditability property that is half the reason for this design. Rejected.

**C. Split content out into a second file, lazily fetched.** Real,
open-ended headroom. Costs the offline double-click behaviour (a `file://`
fetch of a sibling file is blocked by CORS in every modern browser), and
requires loosening `connect-src 'none'`. This trades away the two strongest
properties of the product to solve a problem that compression currently
handles. Reconsider only under trigger 2 or 4.

**D. Two distributions — offline single file, and a code-split web app.**
The honest long-term answer if this keeps growing, and the only option that
keeps both audiences. It roughly doubles the build and test surface: two
artifacts, two smoke runs, two performance budgets. Not justified yet;
this is what trigger 2 should lead to.

**E. Reduce content.** Always available, and worth doing on merit — the
duplicate-id cleanup that accompanied this ADR removed five unreachable
content entries. But the product is the content, so this cannot be the
primary strategy.

## Consequences

- The deployed payload drops ~17% with no behavioural change, verified by
  running the real test suites against the minified output rather than
  assuming terser is safe.
- Two artifacts now exist, so "the build" is ambiguous in conversation.
  Convention: *the artifact* means the committed readable one; *the deploy
  build* means `dist/`.
- `terser` is a dev-dependency. `dependencies` stays empty, and the
  "zero runtime dependencies" badge stays literally true.
- If terser is ever unavailable, `npm run build` still produces a complete,
  working, deployable artifact. This degrades; it does not block.
- The ceiling has not been removed — it has been pushed out and, more
- The current position: 1950 KB readable, 1608 KB minified, 539 KB
  gzipped. The transfer ceiling derived in ADR 0002 is 1152 KB gzipped, so
  there is 613 KB of headroom, which is roughly 2.1 MB of further source.
  That is enough for the workbenches already built and for a good deal
  more content. The honest constraint on this product is now the reader's
  time and the maintainability of the code, not the byte ceiling.
  importantly, written down with the conditions that mean it is time to act.
