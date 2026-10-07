# Procure Sherpa v2.0

**An enterprise procurement learning and operations platform, compiled into a single offline HTML file.**

Competency curriculum, digital SOPs, compliance checklists, operational templates, financial calculators, decision frameworks, and inline visual analytics — no server, no database, no build step for end users, no telemetry.

[![License: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
[![Dependencies: zero runtime](https://img.shields.io/badge/runtime%20dependencies-zero-brightgreen.svg)](#repository-structure--source-code)
[![Offline-first](https://img.shields.io/badge/offline-first-informational.svg)](#data-privacy--security-architecture)
[![Single file](https://img.shields.io/badge/deploy-single%20HTML%20file-lightgrey.svg)](#operating-instructions)
[![QA](https://github.com/chandrahotha/Procure_Sherpa/actions/workflows/qa.yml/badge.svg)](.github/workflows/qa.yml)

> These badges describe static, verifiable facts about this repository (license file present, an empty `dependencies` block in `package.json`, no network calls at runtime). The QA badge reflects `.github/workflows/qa.yml`, which runs the full `npm run qa` gate **on every push and pull request to `main`**, plus a weekly scheduled run to catch environment drift. Earlier releases ran it weekly only and this note said so; that gap is now closed.

---

## Quick Start

**Just want to use it?** Download [`ProcureSherpa-v2.0.html`](ProcureSherpa-v2.0.html) and double-click it. That's the whole install — see [Operating Instructions](#operating-instructions) for a couple of other ways to open it.

**Want to change it?**
```bash
git clone https://github.com/chandrahotha/Procure_Sherpa.git
cd Procure_Sherpa
npm install        # dev-only: jsdom (tests), eslint (lint), terser (deploy build).
                   # `dependencies` is empty - nothing ships to a user.
                   # Also wires the pre-push safety hook.
npm run qa         # build + lint + the full test/audit suite - run this before every PR
```
Then see [Repository Structure & Source Code](#repository-structure--source-code) and [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Table of Contents

- [Quick Start](#quick-start)
- [Screenshots](#screenshots)
- [Architecture Overview](#architecture-overview)
- [Core Capabilities](#core-capabilities)
- [Operating Instructions](#operating-instructions)
- [Repository Structure & Source Code](#repository-structure--source-code)
- [Build & Verification Commands](#build--verification-commands)
- [Governance & Standards Alignment](#governance--standards-alignment)
- [Data Privacy & Security Architecture](#data-privacy--security-architecture)
- [Known Limitations](#known-limitations)
- [Contributing & Security](#contributing--security)

---

## Screenshots

| Command Center | Operations Hub |
|---|---|
| ![Command Center home](_shot/home_new.png) | ![Operations Hub](_shot/operations.png) |

| Academy | Calculator |
|---|---|
| ![Procurement Academy](_shot/academy.png) | ![Financial calculator](_shot/calc_fixed.png) |

| SOP detail | Mobile home |
|---|---|
| ![Procurement Lifecycle SOP](_shot/sop_fixed.png) | ![Command Center on mobile](_shot/home_mobile.png) |

![Academy function walkthrough](_shot/function.png)

---

## Architecture Overview

Procure Sherpa v2.0 separates strategic competency acquisition from day-to-day operational execution, while keeping navigation consistent everywhere through one unified sidebar.

```
                    ┌──────────────────────────────────────────────┐
                    │      Executive Command Center (#/home)       │
                    │  Clean Full-Width Portal & Account Hub        │
                    │        (distraction-free, no sidebar)         │
                    └──────────────────────┬───────────────────────┘
                                           │
             ┌─────────────────────────────┴─────────────────────────────┐
             ▼                                                           ▼
┌─────────────────────────────────────────┐ ┌─────────────────────────────────────────┐
│     Procurement Academy (#/academy)     │ │        Operations Hub (#/operations)    │
│  8 Modules · 19 Functions · 5-Tab       │ │  19 Financial Calculators · 13 SOPs     │
│  Pedagogy · Digital SOPs · Crisis       │ │  27 Compliance Checklists · 33 Templates│
│  Sandboxes · Progress Transcript        │ │  20 Decision Guides · 18 KPIs           │
│  (Certificates: future feature)         │ │                                          │
└─────────────────────────────────────────┘ └─────────────────────────────────────────┘
             │                                                           │
             └─────────────────────────────┬─────────────────────────────┘
                                            ▼
                    One persistent sidebar everywhere else:
                    Overview · Learn · Execute · Reference · Workspace
```

---

## Core Capabilities

| # | Capability | Summary |
|---|---|---|
| 1 | Command Center & Unified Navigation | Distraction-free home, one 5-section sidebar everywhere else |
| 2 | Procurement Academy | 8 modules, 19 functions, 5-tab pedagogy, certification exams |
| 3 | Visual Analytics Engine | Waterfall, Kraljic matrix, Pareto curve, Altman Z-Score, all inline SVG |
| 4 | Crisis Simulation Sandboxes | 10 hands-on commercial scenarios with live calculation models |
| 5 | Credential Transcript | Deliberately disabled — see below |
| 6 | Spotlight Command Palette | `Ctrl+K` search across the whole platform |
| 7 | Intelligence & Automation | Offline copilot, spend data model, doc pack builder |
| 8 | Analysis Workbench | What-if branching, static share pages |

### 1. Command Center & Unified Navigation

* **Distraction-Free Command Center (`#/home`)**: A clean, full-width executive dashboard providing direct gateway access to the Academy and Operations Hub, active draft summaries, and account-level status tracking, with no sidebar.
* **One Sidebar, Five Sections, Everywhere Else**: Every other route shares a single persistent sidebar — **Overview**, **Learn** (Academy), **Execute** (SOPs/Calculators/Checklists/Templates/Copilot/Docpack), **Reference** (Knowledge Hub/KPIs/Decision Guides/Scenarios/Glossary), **Workspace** (Saved/Favorites/Settings/Backup). No hub-switching, no per-section identity changes, no per-module accordion clutter — deep Academy module/function browsing lives on the `#/academy` hub page itself.
* **Unified Account Profile & Session Management**: Manages user focus tracks, organizational roles, and mastery milestones, with a sidebar footer that shows Academy mastery progress or saved-draft count depending on where you are.

### 2. Procurement Academy & Competency Curriculum

* **8 Modules, 19 Functions**: Foundations/Strategy/Spend Intelligence, Requirement Definition & Market Engagement, Commercial Analysis & Cost Engineering, Supplier Evaluation & Risk Management, Negotiation Strategy & Commercial Terms, Contracting & Governance, Operational Purchasing & Order Execution (P2P), and Supplier Management & Value Realization.
* **Disciplined 5-Tab Learning Pedagogy** per function:
  1. **Core Concept**: Theoretical foundation, commercial relevance, process walkthroughs, common failure modes, and governance rules.
  2. **Procurement Mindset**: Executive perspective, commercial thinking points, and enterprise case studies.
  3. **Digital SOP**: Controlled procedural workflows detailing step roles, mandatory controls, records generated, and common pitfalls.
  4. **Interactive Practice**: Scenario-based knowledge evaluations featuring escalating difficulty tiers and automated tactical advisor tips triggered on mistakes.
  5. **Apply in Laboratory**: Interactive commercial crisis simulation sandboxes paired with hands-on laboratory missions.
* **Certification Exams (`#/exams`)**: Timed, randomised exams assembled from the Academy question bank (a full exam plus one per module), with a 70% pass mark, per-question timer, answer review, and local retake history.

### 3. Zero-Dependency Inline SVG Visual Analytics Engine

The platform incorporates a pure inline SVG data visualization engine that executes 100% offline with zero external charting dependencies:

* **Should-Cost Waterfall Buildup (`PS.chart.waterfall`)**: Unbundles cost components (Raw Materials, Direct Labor, Machine Overhead, SG&A Overhead, Fair Supplier Margin) against quoted vendor prices.
* **Kraljic 2x2 Portfolio Matrix (`PS.chart.kraljic`)**: Segments category expenditure by commercial profit impact and supply market risk into Strategic, Leverage, Bottleneck, and Non-Critical quadrants.
* **Pareto 80/20 Spend Distribution Curve (`PS.chart.pareto`)**: Combines ranked supplier spend columns with cumulative spend percentage spline curves and an 80% Class A cutoff threshold.
* **Altman Z-Score Solvency Dial (`PS.chart.zscoreGauge`)**: Calibrated semi-circular radial gauge indicating Distress (< 1.23), Grey Zone (1.23 to 2.90), and Safe Zone (> 2.90) supplier balance sheet liquidity health.

### 4. Interactive Commercial Crisis Simulation Sandboxes

Embedded within the Academy laboratory, each competency features live financial calculation models:

* **Spend Fragmentation & Tail Dissipation**: Pareto spend concentration analysis with Class A isolation and tail supplier consolidation rebate modeling.
* **Kraljic Portfolio Segmentation**: Category placement across supply risk and profit impact axes with strategic playbook alignment.
* **Bottom-Up Should-Cost Modeling**: Unbundles material and labor rates to expose supplier margin padding and construct formula-anchored counter-offers.
* **Critical Supplier Solvency Audit**: Altman Z-Score stress testing evaluating working capital, retained earnings, EBIT, equity, liabilities, and revenue.
* **Contract Clause Redline Auditing**: Interactive legal risk exposure metering across Limitation of Liability, Dispute Withholding, Warranty/SLA, and IP Rights.
* **Multi-Criteria Supplier Evaluation (MCDA)**: Weighted scoring comparison across Technical Quality, Landed Price, Delivery Resilience, ESG, and Solvency.
* **Global Incoterms TLC Normalization**: Equalizes overseas EXW terms against domestic DDP quotes including freight, duties, port drayage, and demurrage buffers.
* **Capex vs Opex Life-Cycle TCO**: Models 5-year operating equipment trade-offs, energy efficiencies, and capital payback horizons.
* **Three-Way Match Forensic Audit**: Resolves PO, GRN, and invoice variance discrepancies to enforce SOX 404 payment holds.
* **Monopoly Renewal Concessions**: Multi-variable commercial concession trading against sole-source vendors.
* **Emergency Price Increase Defense**: PPI commodity index and labor wage formula counter-offer calculations.

### 5. Credential Transcript (`#/certificate`) — disabled, future feature

Procure Sherpa is not a legally authorized issuer of procurement credentials, so certificate generation is turned off; `#/certificate` shows an honest "not available yet" notice instead of a certificate. Academy progress and exam scores are still tracked and visible on `#/academy-progress` and `#/exams`. The original tiered-transcript design is preserved in `IMPROVEMENT_ROADMAP.md` ("Certificates (deferred)") as a reference for a possible future release if a real verification/accreditation path exists.

### 6. Spotlight Command Palette (Ctrl+K / Cmd+K / `/`)

* Instant modal search accessible from any route.
* Multi-attribute weighted scoring across Academy competencies, SOPs, checklists, templates, calculators, and system actions.
* Keyboard navigation (`ArrowUp`, `ArrowDown`, `Enter`, `Escape`) with category filter chips.

### 7. Intelligence & Automation (`#/copilot`, `#/exams`, `#/spend-model`, `#/docpack`)

* **Offline Procurement Copilot (`#/copilot`)**: Local retrieval assistant that answers procurement questions from the bundled KB, glossary, SOPs, scenarios and calculators, with inline citations. Zero network, zero telemetry.
* **Spend Data Model (`#/spend-model`)**: Drag-drop category &gt; supplier hierarchy that feeds the Pareto and Kraljic charts from a single editable source, with impact/risk sliders.
* **Document Pack Builder (`#/docpack`)**: Assembles templates, checklists, decision guides and scenarios into a print-ready package with a cover sheet and table of contents, exportable to HTML or PDF.

### 8. Analysis Workbench Features

* **What-If Branching**: From any calculator, vary one input by a percentage and compare base vs scenario results side-by-side, saving branches as audit-ready workspace records.
* **Static Share Pages**: Export any route as a self-contained, read-only HTML snapshot for wikis, SharePoint, Confluence or email, with a single "Static share page" button.

---

## Operating Instructions

### Option 1: Direct File Launch (Simplest)
1. Locate `ProcureSherpa-v2.0.html` in the repository root.
2. Double-click the file to launch in any modern web browser (Chrome, Edge, Firefox, Safari).
3. The platform executes entirely within client memory with zero server dependencies.

### Option 2: Local HTTP Server (Recommended)
```bash
# Using Node.js
npx serve .

# Using Python
python -m http.server 8080
```
Open `http://localhost:8080/ProcureSherpa-v2.0.html` in your browser.

### Option 3: Use the hosted deployment

<https://procuresherpa.vercel.app> runs the current `main`. It behaves
identically to the downloaded file - still no server-side state, no accounts
and no telemetry - but it serves the **minified** build (~1.05 MB instead of
~1.26 MB) and adds transport-level hardening: HSTS, `X-Frame-Options: DENY`,
`X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer` and a
restrictive `Permissions-Policy`.

Only the build output is served. `vercel.json` sets `outputDirectory` to
`dist`, so `src/`, `package.json` and everything else in the repository
return 404 - the deployment cannot serve source even by accident.

### Option 4: Host it yourself

`ProcureSherpa-v2.0.html` is a static file with no build step and no server
requirement, so any static host works - GitHub Pages (**Settings -> Pages ->
Branch: main**), S3, nginx, or a network share. Rename it to `index.html` if
the host expects one. For a smaller payload, run `npm run build:min` and
serve `dist/` instead.

### How the deployment is built

The hosted site is not the committed artifact copied into place. Vercel runs:

```bash
npm ci --include=dev                        # terser lives in devDependencies
node build.mjs && node tools/build_min.mjs  # readable artifact, then dist/
```

`--include=dev` is explicit because a build agent may set
`NODE_ENV=production`, under which a bare `npm ci` would omit the dev
dependencies the build needs. Minification is verified rather than trusted:
`npm run verify:min` re-runs the route smoke, both calculator suites and the
accessibility audit against `dist/index.html` before it is considered
shippable.

---

## Repository Structure & Source Code

`ProcureSherpa-v2.0.html` is a compiled release artifact generated from modular fragments in `src/`. Source modifications must be made within `src/` and recompiled — **never edit the root HTML file directly.**

```
ProcureSherpa-v2.0.html          # Compiled release artifact - readable, committed, downloadable
dist/                            # Minified deploy build (generated, gitignored, never committed)
build.mjs                        # Assembly + syntax + validation + performance budget gate
validate.mjs                     # Structural and syntax integrity validator
eslint.config.mjs                # Two lint configs: ES5 browser fragments, modern Node tooling
robots.txt                       # Crawl policy (see SEO note below)
LICENSE                          # ISC license
CONTRIBUTING.md                  # Dev setup, PR checklist, the rules that exist for a reason
SECURITY.md                      # Threat model, what's audited, how to report an issue
docs/adr/                        # Architecture decision records
  0001-single-file-architecture.md   # Why one file, and the triggers for revisiting it
.github/workflows/qa.yml         # CI: full gate on every push and PR, plus weekly
.githooks/pre-push               # Local safety net: drift check + fast tests before every push
src/
  manifest.txt                   # Linear assembly sequence (155 fragments)
  base/                          # Design tokens, CSS stylesheets, shell markup
  core/                          # Runtime engine, state stores, charts, router, search, i18n
  pages/                         # Page view renderers and interactive controllers
  content/                       # Controlled content libraries, SOPs, checklists, templates
  calcs/                         # Calculator definitions and implementation algorithms
tools/
  build_min.mjs                  # Minified deploy build -> dist/ (see ADR 0001)
  check_drift.mjs                # Asserts the committed artifact still matches src/
  smoke.mjs                      # Headless route test suite covering all 63 paths
  check_rels.mjs                 # Cross-reference referential integrity validator
  test_calcs.mjs                 # Calculator correctness harness (all 19 calculators)
  test_calc_values.mjs           # Expected-value fixtures: hand-computed math assertions
  test_interactive.mjs           # Click-through checks: search, palette, backup, prefs
  test_quiz_tips.mjs             # Content integrity gate + Academy quiz engine assertions
  security_audit.mjs             # CSP / eval / inline-handler / credential scan
  a11y_audit.mjs                 # WCAG 2.1 AA structural audit across 38 routes (visibility-aware)
  perf_check.mjs                 # Single-file payload budget checker (hard + soft thresholds)
  i18n_audit.mjs                 # Catalog-keys-vs-DOM-usage coverage count (informational)
  setup_hooks.mjs                # Wires .githooks/ on `npm install` via the "prepare" script
  print_ids.mjs                  # Content registration ID inspector
  convert_v1.mjs, debug_calc.mjs, dump_index.mjs, inventory.mjs, probe_v1.mjs, lib.mjs
                                  # Internal dev/debug scratch scripts, not part of the QA gate
```

See [`src/README.md`](src/README.md) for the fragment-level architecture and execution-order rules.

## Build & Verification Commands

```powershell
# Compile single-file HTML bundle and validate syntax + performance budget
node build.mjs

# Full production QA gate (build + lint + all tests and audits, see below)
npm run qa

# What CI runs: the drift gate first, then the full suite
npm run qa:ci

# Lint. src/ is checked as ES5 browser script sharing one global scope;
# tools/ as modern Node ESM. Both configs live in eslint.config.mjs.
npm run lint

# Assert the committed artifact still matches src/ (no rebuild, no writes)
npm run check:drift

# Minified deploy build -> dist/, then the same tests against it
npm run verify:min

# Calculator correctness: asserts every calcImpl produces well-formed, finite output
node tools/test_calcs.mjs

# Run full route smoke tests across all 63 routes
node tools/smoke.mjs

# Validate cross-reference referential integrity
node tools/check_rels.mjs

# Security audit: eval/new Function/inline handlers/javascript: URLs/CSP hygiene
node tools/security_audit.mjs

# Accessibility audit: labels, ARIA, heading hierarchy, duplicate IDs across 38 routes
node tools/a11y_audit.mjs

# Responsive layout & dynamic UI structure verification
node tools/test_layout.mjs

# Performance budget check (HTML/JS/CSS payload ceilings)
node tools/perf_check.mjs
```

`npm run qa` runs, in order: build, lint, referential integrity, calculator correctness (1013 structural assertions), calculator expected-value fixtures (51 hand-computed math assertions), interactive click-through checks, the content and quiz-engine gate (18 assertions), route smoke (63 routes), responsive layout & dynamic UI verification (15 assertions), AST-based security scan (Espree traversal), accessibility scan (38 routes), performance budget, the i18n coverage audit (100% shell catalog keys wired across English and Spanish), and finally the minified deploy build re-verified with the smoke, calculator, accessibility, and layout suites.

`npm run qa:ci` is what CI actually runs. It prefixes the suite with `npm run check:drift`, which must happen *before* anything rebuilds: `npm run qa` starts with `node build.mjs`, so running the drift check after it would regenerate the artifact and erase the very mismatch the check exists to find.

**A GitHub Actions workflow runs `qa:ci` on every push and pull request to `main`** (`.github/workflows/qa.yml`), plus weekly to catch environment drift. A **local pre-push git hook** runs the drift check and the fast test subset first, so the common mistakes fail in seconds on your machine rather than minutes later in Actions.

### Why the generated artifact is committed, and how it stays honest

`ProcureSherpa-v2.0.html` is both a build output *and* the product — "download one file and double-click it" only works if the file is in the tree. That creates exactly one failure mode: editing `src/` and committing without rebuilding, which would leave every test in this repo asserting against an artifact that is no longer the source of truth, and passing.

`tools/check_drift.mjs` closes it. It re-assembles the fragments in memory exactly as `build.mjs` does, byte-compares the result with the committed file, and on a mismatch names the first fragment that diverged. It writes nothing. It runs first in CI and in the pre-push hook.

### Expected-Value Calculator Fixtures

`tools/test_calc_values.mjs` goes beyond "does it run" and proves the calculators compute *correct* answers. Every one of the 19 calculators is run with its documented example (or a synthetic case) and the numeric output payload is asserted against a figure **computed independently by hand** in the test file — covering landed cost, TCO, negotiation savings, should-cost, price increase, price escalation, payment terms, PO value check, MOQ, make-vs-buy, supplier scorecard, concentration/HHI, budget-vs-actual, savings analysis, multi-year contract cost, GST, FX and KPI calculators. These fixtures catch silent formula regressions, inverted signs and broken rounding that finite-output tests cannot.

---

## Governance & Standards Alignment

Procure Sherpa v2.0 content and calculation models are aligned with international procurement standards:

* **Chartered Institute of Procurement & Supply (CIPS)**: Procurement lifecycle stages, sourcing ethics, and supplier relationship management.
* **Institute for Supply Management (ISM)**: Category management, cost modeling, and strategic sourcing methodologies.
* **Sarbanes-Oxley Act (SOX 404)**: Segregation of duties, 3-way matching controls, and formal delegation of authority (DOA) financial thresholds ($10,000, $100,000, $250,000).
* **International Commercial Terms (Incoterms 2020)**: Total landed cost risk and obligation allocation standards.
* **ISO 20400**: Sustainable procurement and ESG evaluation criteria.

CIPS/ISM/Incoterms/ISO references describe the frameworks the *content* is written against. Procure Sherpa itself is not accredited by, registered with, or endorsed by any of these bodies — see [Section 5](#5-credential-transcript-certificate--disabled-future-feature) on the disabled certificate feature.

---

## Data Privacy & Security Architecture

* **Single-Tenant Client Session**: All data, inputs, notes, and checklist progress reside strictly within the client browser's local storage.
* **Zero Network Egress**: The application issues zero outbound HTTP requests, trackers, cookies, or telemetry after initial load.
* **Audit-Compliant Archives**: Full platform state can be exported as structured, human-readable JSON archives via the Data Management center for local backup and migration across workstations.

---

## Known Limitations

Documented here deliberately, rather than left for someone to discover:

* **Multi-locale UI chrome is fully wired across English and Spanish (100% of shell catalog keys wired).** `PS.i18n` (`t()`, plural-safe substitution, locale persistence via preferences, and a working Settings language switcher) translates the persistent application shell, navigation sections, topbar search, modal dialogs, and calculator action bars across English (`en`) and Spanish (`es`) (`npm run audit:i18n` confirms 100% catalog key coverage). Detailed curriculum text, SOP long-form steps, and operational templates remain authored in English.
* **The i18n audit tracks catalog key and locale coverage.** It reports live statistics (`npm run audit:i18n`) to prevent catalog key drift. Every other check in `npm run qa` is a hard gate: lint, build drift, referential integrity, calculator correctness, content integrity, the quiz engine, route smoke, layout verification, AST security, accessibility and the performance budget all exit non-zero on failure.
* **Search engines see almost nothing.** The served markup is ~8 KB of shell; every page is rendered client-side behind a hash route (`#/academy`, `#/calc/...`), and fragments are never sent to the server, so there are no distinct indexable URLs. `sitemap.xml` therefore lists exactly one entry, and the canonical/Open Graph/JSON-LD tags describe the app as a whole rather than its pages. This is a straightforward consequence of the single-file architecture; making the content indexable would mean prerendering each route as a real URL, which is a different product. A `<noscript>` block gives crawlers and JS-disabled visitors a real description instead of a blank page, but it is a floor, not an SEO strategy.
* **No `og:image`.** Facebook, LinkedIn and Twitter require a real raster asset for a large link preview. Generating a 1200×630 PNG honestly would mean adding a rasterizer dependency for one image, which is not a trade this project wants to make. The exact tags to add, once such an asset exists, are written out in a comment in `src/base/01a_head.html`.
* **Certificates are intentionally disabled** (see [Section 5](#5-credential-transcript-certificate--disabled-future-feature)). This is a product decision, not a bug: the platform has no legal authority to issue procurement credentials, so it says so instead of pretending otherwise.
* **This is a single-user tool, not an enterprise system.** There is no server, no database, no account, no authentication and no multi-user state. Everything you enter lives in one browser's `localStorage` and disappears if that storage is cleared — use `#/backup` to export. The audit trail is a local convenience log, not a tamper-evident record, and nothing here is a system of record.
* **This is not an ERP.** Approval thresholds, tax treatment, and legal/compliance requirements vary by organization and jurisdiction. Configure `#/settings` and verify locally before relying on any output operationally.
* **The single-file design has a ceiling, and it is visible.** The readable artifact is ~1.26 MB against a hard 1.6 MB build budget, all parsed before first paint, with no code-splitting escape hatch — that constraint is the product, not an oversight. The deployment serves a minified variant (~1.05 MB) that buys headroom without making the committed artifact unreviewable. [`docs/adr/0001-single-file-architecture.md`](docs/adr/0001-single-file-architecture.md) records the decision, the trigger conditions for revisiting it, and what the alternatives would actually cost.

---

## Contributing & Security

* **Contributing:** see [CONTRIBUTING.md](CONTRIBUTING.md) — dev setup, the PR checklist (`npm run qa`), the local pre-push hook, and the small set of rules (no invented accreditation claims, no new runtime dependencies, stay inside the performance budget) that exist for reasons documented elsewhere in this README.
* **Security:** see [SECURITY.md](SECURITY.md) — threat model for a client-only offline app, what `npm run qa`'s security audit actually checks, and how to report an issue.
* **Original product spec:** [`Procure_Sherpa_v2_Master_Requirements.md`](Procure_Sherpa_v2_Master_Requirements.md) is the founding requirements document this build was implemented against.
