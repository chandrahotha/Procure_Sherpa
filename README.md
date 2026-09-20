# Procure Sherpa v2.0

**An enterprise procurement learning and operations platform, compiled into a single offline HTML file.**

Competency curriculum, digital SOPs, compliance checklists, operational templates, financial calculators, decision frameworks, and inline visual analytics — no server, no database, no build step for end users, no telemetry.

[![License: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
[![Dependencies: zero runtime](https://img.shields.io/badge/runtime%20dependencies-zero-brightgreen.svg)](#repository-structure--source-code)
[![Offline-first](https://img.shields.io/badge/offline-first-informational.svg)](#data-privacy--security-architecture)
[![Single file](https://img.shields.io/badge/deploy-single%20HTML%20file-lightgrey.svg)](#operating-instructions)
[![QA (weekly)](https://github.com/chandrahotha/Procure_Sherpa/actions/workflows/qa.yml/badge.svg)](.github/workflows/qa.yml)

> These badges describe static, verifiable facts about this repository (license file present, zero runtime `dependencies` in `package.json`, no network calls at runtime). The QA badge reflects a workflow that runs `npm run qa` **weekly plus on manual dispatch, not on every commit** — see [Known Limitations](#known-limitations). It is a real, verifiable signal, but not a per-commit "build passing" guarantee; a badge implying otherwise would be exactly the kind of false signal this project deliberately removed from its certificate feature (Section 5).

---

## Quick Start

**Just want to use it?** Download [`ProcureSherpa-v2.0.html`](ProcureSherpa-v2.0.html) and double-click it. That's the whole install — see [Operating Instructions](#operating-instructions) for a couple of other ways to open it.

**Want to change it?**
```bash
git clone https://github.com/chandrahotha/Procure_Sherpa.git
cd Procure_Sherpa
npm install        # only dev dependency: jsdom, for running tests. Also wires a pre-push safety hook.
npm run qa         # build + the full test/audit suite - run this before every PR
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

### Option 3: GitHub Pages Hosting
1. In repository settings: **Settings -> Pages -> Branch: main -> Save**.
2. Platform serves directly via GitHub Pages over HTTPS.

---

## Repository Structure & Source Code

`ProcureSherpa-v2.0.html` is a compiled release artifact generated from modular fragments in `src/`. Source modifications must be made within `src/` and recompiled — **never edit the root HTML file directly.**

```
ProcureSherpa-v2.0.html          # Compiled production artifact (single file)
build.mjs                        # Assembly + syntax + validation + performance budget gate
validate.mjs                     # Structural and syntax integrity validator
robots.txt                       # Crawl policy (see SEO note below)
LICENSE                          # ISC license
CONTRIBUTING.md                  # Dev setup, PR checklist, the rules that exist for a reason
SECURITY.md                      # Threat model, what's audited, how to report an issue
.github/workflows/qa.yml         # Weekly (+ manual) CI run of the full npm run qa gate
.githooks/pre-push                # Local safety net: fast test subset before every git push
src/
  manifest.txt                   # Linear assembly sequence (155 fragments)
  base/                          # Design tokens, CSS stylesheets, shell markup
  core/                          # Runtime engine, state stores, charts, router, search, i18n
  pages/                         # Page view renderers and interactive controllers
  content/                       # Controlled content libraries, SOPs, checklists, templates
  calcs/                         # Calculator definitions and implementation algorithms
tools/
  smoke.mjs                      # Headless route test suite covering all 63 paths
  check_rels.mjs                 # Cross-reference referential integrity validator
  test_calcs.mjs                 # Calculator correctness harness (all 19 calculators)
  test_calc_values.mjs           # Expected-value fixtures: hand-computed math assertions
  test_interactive.mjs           # Click-through checks: search, palette, backup, prefs
  test_quiz_tips.mjs             # Content QA (missing descriptions, forward refs) + tip engine
  security_audit.mjs             # CSP / eval / inline-handler / credential scan
  a11y_audit.mjs                 # WCAG 2.1 AA structural audit across 38 routes
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

# Full production QA gate (build + all audits, see below)
npm run qa

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

# Performance budget check (HTML/JS/CSS payload ceilings)
node tools/perf_check.mjs
```

`npm run qa` runs, in order: build, referential integrity, calculator correctness (1013+ structural assertions), calculator expected-value fixtures (51 hand-computed math assertions), interactive click-through checks, content QA (missing descriptions / forward references), route smoke (63 routes), security scan, accessibility scan, performance budget, and i18n coverage audit. Any failure exits non-zero except the content and i18n audits, which are informational by design. **A GitHub Actions workflow runs this weekly** (`.github/workflows/qa.yml`) plus a **local pre-push git hook** runs the fast subset on every `git push` — see [Known Limitations](#known-limitations) for exactly what that does and does not cover, and run `npm run qa` by hand before any non-trivial merge.

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

* **CI runs weekly, not per-commit.** `.github/workflows/qa.yml` runs the full `npm run qa` gate (build, cross-ref checks, calculator/content/smoke tests, security/a11y/perf audits) on a weekly schedule plus manual dispatch — it is not wired to `push`/`pull_request`. This catches drift between releases, but a broken commit can still land on `main` between runs; run `npm run qa` locally before merging anything non-trivial.
* **Content QA is informational, not a hard gate.** `tools/test_quiz_tips.mjs` (now part of `npm run qa`) currently reports content gaps — missing descriptions on several decision guides and forward references not yet fully populated — but it exits `0` regardless, so it will not fail a build. Treat its output as a checklist, not a pass/fail signal.
* **i18n is scaffolding, not a shipped feature.** `PS.i18n` (`t()`, plural-safe substitution, locale persistence, a working Settings locale switcher) is real infrastructure, but only 1 locale (`en`) is registered and only the persistent shell chrome — nav filter, topbar search, footer, account label — is actually wired to it (~20% of catalog keys; run `npm run audit:i18n` for the live count). All route/page content (calculators, Academy, SOPs, checklists, templates, KB) is hardcoded English. Do not describe this as "multi-language" or "i18n-ready" until that changes.
* **Certificates are intentionally disabled** (see [Section 5](#5-credential-transcript-certificate--disabled-future-feature)). This is a product decision, not a bug: the platform has no legal authority to issue procurement credentials, so it says so instead of pretending otherwise.
* **This is not an ERP.** Approval thresholds, tax treatment, and legal/compliance requirements vary by organization and jurisdiction. Configure `#/settings` and verify locally before relying on any output operationally.
* **No SEO-final metadata yet.** `src/base/01a_head.html` ships title/description/Open Graph/Twitter/JSON-LD tags, but there is intentionally no `og:image`, `<link rel="canonical">`, or `sitemap.xml` — this file has no fixed hosted URL yet. Fill those in once it has a deployed domain (see `robots.txt` for the exact TODO).

---

## Contributing & Security

* **Contributing:** see [CONTRIBUTING.md](CONTRIBUTING.md) — dev setup, the PR checklist (`npm run qa`), the local pre-push hook, and the small set of rules (no invented accreditation claims, no new runtime dependencies, stay inside the performance budget) that exist for reasons documented elsewhere in this README.
* **Security:** see [SECURITY.md](SECURITY.md) — threat model for a client-only offline app, what `npm run qa`'s security audit actually checks, and how to report an issue.
* **Original product spec:** [`Procure_Sherpa_v2_Master_Requirements.md`](Procure_Sherpa_v2_Master_Requirements.md) is the founding requirements document this build was implemented against.
