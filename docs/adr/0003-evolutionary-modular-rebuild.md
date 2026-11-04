# ADR 0003 — Evolutionary modular rebuild, not a framework rewrite

**Status:** Accepted  
**Date:** 2026-11-04  
**Supersedes:** none (extends ADR 0001 and ADR 0002)

## Context

The Sherpa academy transformation (master goal) asks for a maintainable, scalable architecture with clear separation between the frontend application, reusable UI components, the design system, application logic, data models, configuration, testing and deployment.

The current repository already ships as a compiled single HTML file assembled from 227 source fragments in `src/` (layout, design system, runtime engine, page view controllers, content libraries, calculators). The build (`build.mjs`) concatenates fragments in manifest order, validates JS syntax, enforces a compressed performance budget, and is guarded by a 31-gate / 149-assertion QA suite plus pre-push and pre-flight hooks.

Two constraints make a wholesale rewrite the wrong answer:

1. **Offline-first, zero runtime dependencies, single-file distribution is the product.** The README and SECURITY.md describe a tool with no server, no database, no accounts, no telemetry, and a CSP of `default-src 'none'; connect-src 'none'`. Introducing a frontend framework, a bundler at runtime, a backend service, or an authentication layer would break the "double-click the HTML file and it works" premise and add supply-chain risk the product explicitly avoids.

2. **Working functionality must survive the revamp.** Every existing route, calculator, workbench, quiz, exam and storage key must keep behaving the same or better. A rewrite invites regressions in precisely the business rules the master goal requires preserving.

## Decision

**Evolve the existing fragment architecture into clearly separated domains; keep the single-file readable artifact and the minified deploy build as the two release options.**

- **Frontend application / page view controllers:** stay in `src/pages/` (one file per route), each rendering through the shared runtime.
- **Reusable UI components:** live in `src/ui/` (started with `01_render_helpers.js` and `02_components.js`), returning markup strings so one design change lands on every screen.
- **Design system:** owned by `src/base/01a_head.html` (tokens) and `src/base/01n_design_system.css` (institutional layering), extended but never redeclared in two places.
- **Application logic / data models:** stay in `src/core/` (store, router, search, academy store, charts, actions) and `src/content/` / `src/calcs/` (content and calculator registries).
- **Backend services / authentication / API:** not introduced. The product is single-tenant, client-side, localStorage-only. If a server-backed requirement ever arrives, ADR 0001 trigger 4 applies and this decision is reopened.
- **Configuration:** `src/manifest.txt` (assembly order), `package.json` (tooling), `vercel.json` (deployment).
- **Testing / deployment:** the existing `tools/*` QA suite and Vercel deployment remain the gates; no new test runner or CI system is added without a measured reason.

The build stays a concatenation pass because it is reproducible, auditable line-by-line, and needs no transpiler. Fragments remain in a single `PS.*` execution scope; introducing ES modules would break the cross-fragment references that rely on the `PS` global and would add a build step users never see.

## Options considered

**A. Rewrite in React/Vite with an API backend.** Rejected: breaks offline single-file distribution, adds runtime dependencies and supply-chain surface, and contradicts the documented security model.

**B. Two distributions (offline single file + code-split web app).** The honest long-term answer if growth continues (ADR 0001 option D), but it doubles build and test surface and is not justified yet. Revisit under ADR 0001 trigger 2.

**C. Keep the single undifferentiated file as-is.** Rejected: the master goal requires maintainable separation, and the fragment build already provides it — the source just needs clearer domain boundaries and documentation.

## Consequences

- Source remains auditable end to end; a non-developer can still read every line of the committed artifact.
- `npm run build` still produces the committed readable artifact; `npm run build:min` still produces `dist/index.html`.
- No new runtime dependencies; `dependencies` stays empty.
- All existing QA gates continue to run unchanged against both artifacts.
