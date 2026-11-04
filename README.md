<div align="center">

# Procure Sherpa

**A complete procurement learning platform and operations toolkit, compiled into one HTML file that runs offline.**

[29 Academy modules](#procurement-academy) · [86 lessons](#procurement-academy) · [311 library records](#the-reference-library) · [19 calculators](#calculators-that-show-themselves-working) · [8 workbenches](#workbenches-your-own-records-held-locally) · **no server, no accounts, no telemetry**

[**Open the live site**](https://procuresherpa.vercel.app) · [**Download the file**](ProcureSherpa-v2.0.html) · [Documentation](#documentation) · [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md)

[![License: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
[![Runtime dependencies: zero](https://img.shields.io/badge/runtime%20dependencies-zero-brightgreen.svg)](#built-like-production-software)
[![Offline-first](https://img.shields.io/badge/offline--first-yes-informational.svg)](#privacy--security)
[![Deploy: single HTML file](https://img.shields.io/badge/deploy-single%20HTML%20file-lightgrey.svg)](#deployment)
[![QA gate](https://github.com/chandrahotha/Procure_Sherpa/actions/workflows/qa.yml/badge.svg)](.github/workflows/qa.yml)

</div>

---

Procure Sherpa is for people who buy things for a living — and for everyone who wants to learn how professional procurement actually works. It teaches the discipline end to end, then gives you the tools to practise it on your own numbers: a structured curriculum with quizzes and exams, a controlled-procedure library, financial calculators with worked examples, and local workbenches for your own suppliers, contracts and spend.

Everything ships in a single self-contained HTML file. Open it and it works — no install, no build step, no account, no network. Your data lives in your browser and never leaves it. The whole product is gated by an automated QA suite (build, lint, 149 integrity assertions, 1,021 calculator assertions, security scan, accessibility audit, performance budget) that runs on every push.

The QA badge reports a workflow that runs on GitHub-hosted runners: every push and pull request to `main`, plus a weekly scheduled run that catches environment drift. The gate that guards your own push is the pre-push hook, which runs the same suite locally before the commit is allowed through. [CONTRIBUTING.md](CONTRIBUTING.md#ci-is-green-because-nothing-ran) records why CI used to report nothing (an offline self-hosted runner, since replaced) and what to check if runs start queueing again.

---

## Quick Start

**Use it** — download [`ProcureSherpa-v2.0.html`](ProcureSherpa-v2.0.html) and double-click it. That is the whole install. (The filename says v2.0 because it is the product's fixed name, not its version — the release is 3.0 and every tool reads the version from the file.)

**Or open the hosted deployment** — <https://procuresherpa.vercel.app> serves the minified build of `main` (~1,004 KB gzipped, 2.67 s to transfer at 3 Mbps) with the same hardening as the file itself: no server-side state, no accounts, no telemetry.

**Change it** —

```bash
git clone https://github.com/chandrahotha/Procure_Sherpa.git
cd Procure_Sherpa
nvm use 22                  # Node 22+; .nvmrc pins it and preflight enforces it
npm ci                      # dev-only tooling: jsdom, eslint, terser — zero runtime deps
npm run qa                  # build + lint + the full test/audit suite
```

Then edit `src/` (never the compiled HTML), run `node build.mjs`, and keep `npm run qa` green. See [CONTRIBUTING.md](CONTRIBUTING.md) for the rules that exist for a reason.

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

## What is inside

Procure Sherpa separates **learning** (the Academy) from **doing** (the Operations Hub), with one sidebar that scopes itself to the track you choose and the full reference library shared between both.

```
                 ┌──────────────────────────────────────────────┐
                 │       Executive Command Center (#/home)      │
                 │  personal start point · today · smart resume │
                 └──────────────────────┬───────────────────────┘
                                        │
          ┌─────────────────────────────┴─────────────────────────────┐
          ▼                                                           ▼
┌───────────────────────────────────────┐ ┌───────────────────────────────────────┐
│    Procurement Academy (#/academy)    │ │      Operations Hub (#/operations)    │
│  30 modules · 88 lessons · 5-tab      │ │  19 calculators · 21 SOPs (167 steps) │
│  pedagogy · 545 SOP-step sequences    │ │  27 checklists · 33 templates         │
│  339 questions · practice exams       │ │  17 decision guides · 18 KPIs         │
│  25 learning paths · labs · badges    │ │  8 workbenches for your own records   │
└───────────────────────────────────────┘ └───────────────────────────────────────┘
          │                                                           │
          └─────────────────────────────┬─────────────────────────────┘
                                        ▼
              One persistent sidebar on every route:
              Start · Learn · Do the Work · Look It Up · My Work
```

### Procurement Academy

Twenty-four modules take you from first principles to board level: Foundations & Spend Intelligence, Requirement Definition & Market Engagement, Commercial Analysis & Cost Engineering, Supplier Evaluation & Risk, Negotiation Strategy & Commercial Terms, Contracting & Governance, Operational Purchasing (P2P), Supplier Management & Value Realization, Services/Software/Indirect, Risk & Compliance & Ethics & Sustainability, Digital Procurement & Analytics, Advanced Category & Portfolio Strategy, Executive & Board-Level Procurement, Stakeholder Influence & Change, Specialised Markets, Contract Risk & Claims & Disputes, Global Sourcing Operations, Disruption & Emergency Buying, The Finance of Procurement, Procurement Fraud & Collusion & the Controls That Catch It, Sustainable & Responsible Sourcing — Carbon, Circularity and Social Value, Category Depth II — Energy, Works and Creative Markets, Artificial Intelligence, Model Services and Data Licensing, and Supplier Financial Distress, Turnaround and Exit.

Every lesson follows the same five-tab pedagogy:

1. **Learn Concept** — theory, commercial relevance, RACI, controls, key terms, and a worked example that opens the matching calculator pre-filled (`?example=1`), so you arrive at a finished calculation instead of an empty form.
2. **Think & Reflect** — executive-perspective thinking points with reflection prompts, and the mindset behind the mechanics. The home page features one of the curriculum's authored thinking points each day, linked to the lesson it came from.
3. **Digital SOP** — the procedure as a controlled document: steps with roles, controls, records and pitfalls.
4. **Practice & Test** — scenario-based quizzes where every option carries a rationale and every question names its principle; mistakes trigger tactical tips.
5. **Apply in Lab** — an interactive sandbox with live calculation models, plus a laboratory mission you can run on your own data.

The curriculum is always in module order — the role you pick in your profile recommends *which* modules matter for your job (25 learning paths, from Foundations to Fraud & Assurance, Responsible Sourcing, Category Depth, AI & Data Markets, Supplier Distress, Regulated Tendering, Services Cost Analytics, Regulated Markets, Supplier Innovation, Service Transition, Inventory Economics and Demand Forecasting), it never rearranges the sequence. Lessons track their own reading progress; completion, quiz scores and exams persist locally with badges and a transcript; a **review queue** (`#/revise`) puts a dated interval on every lesson you have studied, **reflection** (`#/reflection`) reads your recorded quiz answers back as the principles you have not yet settled - separating what you got right first time, what you only got after the coaching tip, and what is still wrong - and the hub itself carries a **readiness panel** splitting mastery across the three altitudes alongside what is due and unsettled. Practice exams are timed and randomised, drawn from the 429-question bank, with answer review and retake history - and an attempt opens on its own full-screen page, with a question rail and a button to move it into a separate window.

Certificates are deliberately disabled: Procure Sherpa is not an accredited issuer of credentials, so `#/certificate` says so honestly instead of minting a PDF that means nothing.

### The reference library

315 authored records, all cross-linked and searchable offline: **129 concepts** (each answering what / why / when / how / example / risks / mistakes), **21 controlled SOPs** (167 procedure steps with RACI, controls, outputs and KPIs), **27 checklists**, **33 templates**, **17 interactive decision guides**, **18 KPI definitions with formulas**, **45 glossary terms**, **6 guided scenarios**, and **19 calculators**.

### Calculators that show themselves working

Every calculator ships with curated example data and a **Load example** button; **Random values** perturbs the example within the field's own declared rules. Landed cost, TCO, should-cost, compare quotes, negotiation savings, price increase & escalation, payment terms, PO value check, MOQ, make-vs-buy, supplier scorecard, supplier concentration, budget vs actual, savings analysis, multi-year contract cost, GST/tax, FX, KPI builder — each with formula, assumptions and interpretation rendered next to the result.

### Workbenches: your own records, held locally

Eight local workbenches compute real answers from your own data: RFx & Evaluation (landed cost per bid, weighted scoring, written award recommendation), Supplier Register, Contract Register (notice-deadline and auto-renewal exposure), Catalogue & Price Book, Receipts & Invoicing (three-way-match variances, duplicates), Budget & Spend, Approvals & Policy (the delegation-of-authority ladder), and Analytics (spend, risk, pipeline, expiries across all of them).

They are workpapers, not a system of record: the receipt workbench finds the variance and does not release a payment; approvals records your delegation thresholds and does not route an approval; an award recommendation does not constitute a tender.

### Visual analytics, inline SVG, zero chart libraries

Should-cost waterfall build-ups, the Kraljic 2×2 portfolio matrix, Pareto 80/20 spend concentration with the Class-A cutoff, and an Altman Z-Score solvency gauge — all theme-aware, all generated from your data at render time.

### Also on board

- **Offline Copilot** (`#/copilot`) — a local answer engine over every library record with inline citations. No network, ever.
- **What-if branching** — on every calculator, a **What-if analysis** panel varies one input by a chosen percentage and compares base vs scenario side by side; branches save as local workspace records.
- **Document Pack Builder** (`#/docpack`) — assemble templates, checklists and decision guides into a print-ready pack with cover sheet and contents.
- **Command palette** (`Ctrl+K`) — weighted search across every content type and system action.
- **Static share pages** — export any route as a self-contained read-only HTML snapshot.
- **Backup & restore** (`#/backup`) — the full workspace as human-readable JSON, including a hostile-file test in the QA suite.
- **English/Spanish shell** (`#/settings`) — the application chrome is translated; the content itself is English (see limitations).

---

## Privacy & Security

- **Everything is local.** Inputs, notes, progress, workbench records — all in your browser's `localStorage`. Clearing site data clears your work; `#/backup` exists for a reason.
- **Zero network egress.** The application makes no outbound requests after load: no trackers, no cookies, no CDNs, no fonts. A CSP with `connect-src 'none'` and an AST-level security audit enforce it in the build, not just in prose.
- **Single-tenant by design.** No server, no database, no authentication. Nothing here is a system of record and nothing is tamper-evident — it is a local tool for one professional.

Full threat model and reporting process: [SECURITY.md](SECURITY.md).

---

## Built like production software

The single file is a compiled artifact, and the repo treats it that way:

- **`npm run qa` is the gate** — preflight, build & validate, lint, drift check, cross-reference integrity, the minified build, 22 unit tests, calculator correctness (1,021 assertions), 51 hand-computed expected-value fixtures, interactive click-throughs, the quiz/content gate, 88 route renders, 45 layout checks, the integrity gate (**31 gates / 149 assertions**), 46 storage checks, 32 journey steps, an AST security scan, accessibility over 66 rendered routes, the measured performance budget, i18n coverage, and the minified build re-verified end to end. Every step is a hard gate.
- **Drift is impossible to commit silently** — the build is re-assembled from `src/` and byte-compared with the committed artifact on every CI run and pre-push; the documents are checked against the tools the same way.
- **The build carries a stamp** — `PS.BUILD` is a hash of the source fragments; `npm run verify:deploy` fetches the live site and asserts it serves the build from your tree.
- **Performance is budgeted, not hoped for** — 1,116.1 KB gzipped against a 1,152 KB transfer ceiling (3 s at 3 Mbps 4G), 2.96 s transfer, measured on every build. The minified build actually served is 1,004.1 KB against a deployed warning ceiling of 1,014 KB. The download figure is at 96.9% of its budget.
- **Zero runtime dependencies** — devDependencies are three (eslint, jsdom, terser) and none of it ships to a user. `npm audit` reports 0 vulnerabilities; how is documented in [SECURITY.md](SECURITY.md).

Governance alignment: content and models are written against CIPS lifecycle and ethics frameworks, ISM category and sourcing methodology, SOX 404 segregation-of-duties and three-way-match controls, Incoterms 2020 and ISO 20400. Procure Sherpa is not accredited by or endorsed by any of these bodies, and it says so on the page.

---

## Deployment

`main` deploys automatically: Vercel's GitHub integration builds the site on every push (`npm ci --include=dev`, `node build.mjs`, `node tools/build_min.mjs`) and serves **only** `dist/` — the source tree returns 404, so the deployment cannot leak source. `npm run verify:deploy` loads the served bytes and asserts the same checks the local gate asserts.

```bash
npm run verify:deploy       # assert the live site is the build you expect
npm run build:min           # minified deploy build -> dist/
npm run deploy -- --dry     # full gate + staging, no publish
```

Self-hosting is a copy: the file is static, so GitHub Pages, S3, nginx or a network share all work (`npm run build:min` first if you want the smaller payload).

---

## Known limitations

Documented on purpose rather than left for discovery — full detail in the [completion ledger](docs/completion-ledger.md):

- **Not an ERP.** Thresholds, tax and compliance vary by organisation and jurisdiction; configure `#/settings` and verify locally before relying on anything operationally.
- **No accounts, no sync.** One browser profile per person; storage clearing loses your work; the backup file is the migration path.
- **English content, translated shell.** The en/es i18n covers the application chrome (43 keys, 100% wired); all 311 content records and 86 lessons are English-only.
- **Not SEO-indexable.** Pages render client-side behind hash routes; the served markup is an ~8 KB shell. Search-engine visibility would mean a different, prerendered product.
- **Single-file ceiling.** Everything parses before first paint and there is no code-splitting escape hatch — that constraint is the product. [ADR 0001](docs/adr/0001-single-file-architecture.md) records the decision and its revisit triggers; [ADR 0002](docs/adr/0002-measured-performance-budget.md) records the measured budgets.
- **No certificate issuance**, by policy — see above.

---

## Documentation

| Document | What it holds |
|---|---|
| [CONTRIBUTING.md](CONTRIBUTING.md) | Dev setup, the Node pin, the real state of CI, the rules that exist for a reason |
| [SECURITY.md](SECURITY.md) | Threat model, dependency status, what the security audit checks, how to report |
| [docs/completion-ledger.md](docs/completion-ledger.md) | Every requirement and roadmap item rated GREEN/YELLOW/RED against the code |
| [IMPROVEMENT_ROADMAP.md](IMPROVEMENT_ROADMAP.md) | The product roadmap, with what shipped and what remains |
| [docs/adr/](docs/adr) | Architecture decision records: the single-file decision, the measured budgets |
| [src/README.md](src/README.md) | Fragment-level architecture and execution-order rules |
| [Procure_Sherpa_v2_Master_Requirements.md](Procure_Sherpa_v2_Master_Requirements.md) | The founding requirements document this build implements |

---

## Contributing

The repository works on `main` — there is no feature-branch flow in practice. Fork it, change `src/`, keep `npm run qa` green, and open a PR. The non-negotiables: no invented accreditation claims, no new runtime dependencies, stay inside the transfer budget, and every verification gate must be able to fail. Details in [CONTRIBUTING.md](CONTRIBUTING.md).

Security issues: [SECURITY.md](SECURITY.md) has the reporting process. Please do not open public issues for anything exploitable.

---

## License

[ISC](LICENSE) — © 2026 Procure Sherpa contributors
