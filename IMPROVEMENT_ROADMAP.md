# Procure Sherpa - Improvement Roadmap

**Current Version:** 3.0 (`package.json` carries `3.0.0`, `PS.VERSION` carries `3.0`, and the application prints `Procure Sherpa v3.0` when it loads)  
**Baseline Tag:** `HUBCHANGED`  
**Last Updated:** 2026-11-02

The committed artifact keeps the name `ProcureSherpa-v2.0.html`. That
filename is fixed by the master requirements (sections 4.1 and 81) and by
every download link in the README; it is a product name, not the version,
and `tools/check_drift.mjs` reads the version out of `package.json` and
`PS.VERSION` rather than out of the file name.

---

## Shipped in the v2.4 revamp (2026-10-20)

The phases below are the original plan. This section records what was
actually built, because a large part of it was not in the plan at all:
it came out of an audit that found the application was telling the
truth badly in a dozen places.

### The application was lying, and that was fixed

| Defect | Was | Now |
|---|---|---|
| Procurement Maturity Check | Rendered **zero** rating fields, then threw an uncaught `TypeError` on submit | 9 assessed areas, a scored profile, a weakest-area focus list |
| Procurement Lifecycle | Promised "twenty-one stages" and rendered **none** | 21 stages, each linked to its concept, SOP and calculator |
| Academy function lookup | `PS.byId('academy', id)` always returned null, so Portfolio, Learning Paths and two of six "What to Learn Next" cards rendered **empty** | Resolves; all four surfaces work |
| Skill assessment result | Stored `lastScore`, read `.score` - every consumer showed **"undefined%"** and "Level 1" for a score of 80 | Stores and reads both; recommendations are persisted and shown |
| Select-field defaults | Six fields across five calculators matched no option, so **Reset blanked them** and the KPI tool **inverted its RAG band** (Amber 96.4% became Green 103.7%) and the tax tool flipped exclusive to inclusive | Defaults resolve by index; the RAG and the tax split are correct |
| What-If analysis | 100% dead: the numeric test could never match, so the button always said "no numeric inputs to vary" | Works on all 19 calculators |
| Saved work reopen | `PS.pendingSaved` was written in three places and **read in none** - a saved calculation reopened as defaults, a saved decision guide as "not sure" everywhere | Values and answers are restored and recalculated |
| Spend data model | Restored under the wrong storage key, so a restored backup **silently reverted to the example data**; unsaved edits were lost on every add, remove and drag | Restores correctly, edits are collected before every mutation |
| "Clear local data" | Left the spend model, copilot transcript, exam results and document packs **behind** | Clears every key the app writes |
| Cross-tool handoff | 27 of 41 links carried **no data**; 11 more could never | 30 links, every one carries values on a shared commercial vocabulary |
| Markdown export | An SOP export dropped RACI, gates, controls, records, KPIs, risks, exceptions, mistakes, references and revision history; a checklist export **erased every tick** | Full-fidelity export for all nine content types, with live workspace state |
| Document pack | Rendered every template field blank and every checklist unticked - a pack with no evidence in it | Carries the values, ticks, notes and decision outcome |
| Copilot | Indexed 5 of 9 content types, so "which template do I use for an award recommendation" returned nothing | Indexes all nine types plus the 28-function Academy |
| Search | The app's **own documented example** ("supplier increased price by 12%") returned zero results | 14 of 14 realistic queries return results, 10 with the right top hit |
| Relationship checker | The runtime and the static checker had **different id maps**, so three live links were being pruned at boot while the gate reported "broken refs: 0" | One shared map; the gate is a hard failure |

### The navigation was rebuilt

The sidebar was hiding itself on the landing page, failing to light up on
8 of its 37 items, and pointing at a page that said "not available yet".
It is now **scoped by the profile's track, plus a permanent footer
strip**. A learner sees 5 sections and 26 items: Start, Learn, Library,
Look It Up, My Work. A practitioner sees 6 sections and 30 items: Start,
Workbench, Toolkit, Library, Look It Up, My Work. The reference library
- SOPs, checklists, templates, calculators, decision guides - is shared,
because the Academy is taught through it and every Academy function
links into it. A **Learn / Work** switch in the sidebar changes the
track, writing the same profile field the profile modal writes, so there
is one source of truth. The current route always wins: a page whose
section your track hides has that section shown for that visit, so the
menu is never a dead end. Four orphan routes were
rescued (`#/operations`, `#/dash`, `#/audit`, `#/career-paths`), four
dead ends were removed with a stated reason, and every one of the
previous 37 items is accounted for in a ledger in `04b1_navdata.js`. The
Command Center gained a state-aware "where to start" block and a Today
strip, and the layout no longer overflows on a phone.

### The curriculum grew, and it grew connected

| | Before | After |
|---|---|---|
| Academy modules | 8 | **11** |
| Academy functions | 19 | **28** |
| Functions with a library link | 0 | **28** |
| Content items with no inbound link | 201 | **0** |
| Learning paths | 3, covering 8 functions | 4, covering all 40 |
| Skill portfolio areas | 6, covering 8 functions | 7, covering all 40 |
| Badges | 8, with 7 of 19 functions earning none | 19 badges, and every one of the 40 functions appears in at least one earning rule - asserted by G24, which is what makes the claim checkable rather than remembered |
| SOP steps | 96 | **140** |
| Knowledge-check questions | 76 | **112** |
| Question options | 274 | **411** |

The three new modules are **Services, Software and Indirect Procurement**
(indirect and MRO, software and SaaS licensing, professional services)
and **Risk, Compliance, Ethics and Sustainability** (sustainable
procurement, anti-bribery and third-party due diligence, supplier
resilience). They are grounded in ISO 20400:2017, the CIPS Procurement
and Supply Cycle, the OECD Guidelines for Multinational Enterprises, the
UK Bribery Act 2010 section 7, the FCPA books-and-records provisions
and the GHG Protocol Scope 3 standard.

### Eight workbenches, so the toolkit can hold your own records

The library was a reference. Everything a procurement professional
actually has to keep - their suppliers, their contracts, their
catalogue, their bids, their receipts, their budget - lived in a
spreadsheet they had to keep, or nowhere at all. Eight workbenches now
hold it, all local, all connected to the library that teaches you what
to do with it.

| Workbench | What it holds | What it computes |
|---|---|---|
| RFx and Evaluation | Events, criteria, weights, bids | Landed cost per bid, weighted score, written award recommendation, and the tension between the lowest cost and the highest score |
| Supplier Register | Contacts, qualification score, risk tier, approval state | Spend, risk distribution, high-risk count |
| Contract Register | Value, key dates, notice deadline, obligations | Notice deadlines inside 180 days, auto-renewal exposure |
| Catalogue and Price Book | Items with specification, unit of measure, pack size, price | Price against a dated benchmark, items with no specification |
| Receipts and Invoicing | Order, receipt and invoice as three numbers | Price variance, quantity variance at the invoiced price, uncontracted charges, duplicate invoices |
| Budget and Spend | Budget lines, committed, actual | Available, percentage used, against the spend model |
| Approvals and Policy | Thresholds, chains, policy rules | The approval ladder, lowest limit first |
| Analytics | Everything above | Spend by category, supplier risk, pipeline, match exposure, expiring contracts |

What they do not do is the thing only a system of record can do. The
receipt workpaper finds the variance and does not release a payment.
The approvals workbench records a delegation of authority and does not
route an approval or block a purchase. The RFx workbench produces an
award recommendation and does not constitute a tender. A sign-off is
evidence that a named person took a decision, and it is worth exactly as
much as that person is.

### The role and the track finally do something

The profile has carried a role and a track since the beginning. Twenty
two places read them and every one of them was rendering the label:
"Procurement Beginner & Enthusiast" next to "Academy Learner" in a
pill, and nothing else. The promises in the track descriptions -
"prioritize structured learning modules" and "prioritize daily
execution tools" - were not implemented anywhere.

They are now. The role decides the order the curriculum is presented in,
because a role is a job and a job has a sequence of work in it. A
compliance officer meets Module 4 (supplier evaluation and risk) and
Module 10 (risk, compliance, ethics and sustainability) before Module 1.
A buyer meets Module 7 (P2P order execution) and Module 9 (services,
software and indirect) first. A category manager meets Module 11
(digital, analytics and category strategy) early, because that is where
their work lives. A beginner gets the natural order, because that is the
order it is meant to be taught in.

The track decides where the product starts you. An operational
practitioner lands on the Operations Hub rather than on the Academy.
The track deliberately does not override the role: a compliance officer
wants the risk and contracting modules first whether they came here to
learn or to work.

### The second review found three things the first one missed

All three were wrong in ways that had passed a full review, which is
the part worth recording.

- **The curriculum was scattered.** The Academy reordered its modules
  by the profile role, so a buyer saw Module 7, 9, 2, 1, 3... while
  every badge still read its own number. Only the default profile got
  1 to 11, and the default is what every screenshot had used. The
  cause was the method rather than the code: gate G13 had been written
  from the feature instead of from the requirement, so it asserted
  that the role reordered the curriculum and protected the defect. It
  now states the requirement in the requirement's words, and the role
  recommends modules rather than moving them.
- **The menu had a two-option field and ignored it.** The profile's
  track changed one line of text while the sidebar showed the same
  flat 39 items to everybody. The menu is now scoped by the track: 26
  items for a learner, 30 for a practitioner, with the reference
  library shared between them and a Learn / Work switch in the
  sidebar that writes the same profile field the profile modal does.
  This changed the rule in src/README that forbade a hub-switcher,
  and the reason it changed is now recorded there rather than
  quietly overwritten.
- **The explanation did not carry its example.** The worked example
  lived in the Think tab, so a reader never met an example of the
  function working. It is in the Learn tab now, and it links to the
  calculator with the example already loaded. The calculators also
  gained a Random values button, so the numbers can be varied rather
  than only read.

### The CI was failing for a different reason than it said

The Actions tab was red on every push, carrying an annotation about
failed account payments. That annotation was true, and it is what
everybody expected to see, so nobody looked past it. The Deploy
workflow had in fact never compiled: it used `secrets` in a
job-level `if`, which is not an allowed context there, so the
workflow failed before a job was created and reported itself as a
workflow file issue. The job that never existed was the reason the
run showed a billing message.

The token check moved to a step, there is a new gate
(`npm run check:workflows`) so it cannot happen again, the deploy
now runs only after the gate has passed, and the build carries a
hash of its own sources so that a deployment can be checked for
identity rather than merely for correctness.

The account's block on hosted minutes proved intermittent rather than
permanent. It came back two minutes after it cleared once, which is why
the suite had moved to a **self-hosted runner** - the workstation that
developed the project, registered against this repository only. The trade
was availability, and it was paid in full: the runner went **offline**,
the scheduled run of 2026-10-26 sat queued and was cancelled by GitHub's
own 24-hour limit at 24h0m2s without starting, the Deploy run of
2026-10-27 was skipped because the QA run it waits for never completed,
and the last green push run was 2026-10-21.

**Resolved 2026-11-03.** A canary run on this exact suite executed on
`ubuntu-latest` and passed in under two minutes (run 41547617809),
proving the allocation block was gone, and both workflows moved to
GitHub-hosted runners the same day. CI now depends on no workstation
being awake; the gate itself did not change. The full incident and the
regression checklist are in CONTRIBUTING.md, "CI is green because
nothing ran".

### Two engineering decisions were written down

- **ADR 0002** replaces the guessed byte ceilings with measured ones.
  The gate now measures three things: the compressed download against a
  ceiling derived from "3 seconds at 3 Mbps" (1152 KB), the script's full
  V8 compile against a 400 ms budget, and the application boot to a
  rendered first page against a 500 ms budget. `npm run perf` prints the
  live figures - the size is a fact about the file (834 KB gzipped,
  2.22 s at 3 Mbps), the two timings are wall-clock and belong to the
  machine that took them, which is why ADR 0002 keeps its measurement
  dated instead of asserting it as a property of the build. The previous
  1300 KB "JS payload ceiling" was never derived from anything and had
  quietly become the rule instead of the reason. Deriving the ceiling
  from seconds and a rate means it cannot drift away from the reason it
  exists the way a hand-picked number can.
- **The integrity gate** (`npm run test:integrity`) asserts what the
  other tests could not: that no route leaks `undefined`, that every
  internal link resolves, that every control has a handler, that every
  content item has an inbound link, that every handoff can carry a
  value, and that the Academy links into the library. It exists because
  the suite was green while the application was broken in a dozen places.

---

## Certificates (deferred)

**Status: disabled, 2026-09-18.** Procure Sherpa is not a legally authorized
issuer of procurement credentials, so the Academy's tiered certificate/
transcript feature (Tier 1 Learning Transcript, Tier 2 Program Completion,
Tier 3 Exam-Verified) has been switched off. `#/certificate` now shows an
honest "not available yet" placeholder instead. Academy progress and exam
scores are still tracked and visible on `#/academy-progress` and `#/exams`.

This is free, non-commercial software with no accreditation body behind it,
so there was never a real verification story: the previous "tamper-evident"
checksum was a client-side FNV hash with a hardcoded salt shipped in the same
JS anyone can view-source — it could be reverse-engineered and forged for any
name/tier/score. Turning the feature off is more honest than shipping a
credential that only *looks* verifiable.

**Possible future re-enable, only if a real authorization/verification path
exists** (e.g. server-side signing with a secret key, or an actual
partnership with an accrediting body such as CIPS/ISM). The original
tiered-transcript implementation is preserved below as a reference — it was
functionally correct, just not something we're allowed to represent as a
credential today.

<details>
<summary>Reference implementation (was <code>src/pages/08g3_pages_certificate.js</code>)</summary>

```js
PS.cert = {
  // Deterministic, tamper-evident checksum generator.
  // Includes the tier key + exam score so a lower-tier or forged
  // credential does not verify against a higher tier.
  generateChecksum: function (name, role, company, completedCount, avgScore, tierKey, examScore, dateStr) {
    var raw = (name || 'Procurement Specialist') + '|' +
              (role || 'buyer') + '|' +
              (company || 'Enterprise') + '|' +
              String(completedCount || 0) + '|' +
              String(Math.round(avgScore || 0)) + '|' +
              (tierKey || 'transcript') + '|' +
              String(Math.round(examScore || 0)) + '|' +
              (dateStr || PS.dateStr());

    var h1 = 0x811c9dc5;
    for (var i = 0; i < raw.length; i++) {
      h1 ^= raw.charCodeAt(i);
      h1 = Math.imul(h1, 0x01000193);
    }

    var h2 = 0x5a3f129c;
    var salted = raw + 'procure_sherpa_local_v2';
    for (var j = 0; j < salted.length; j++) {
      h2 ^= salted.charCodeAt(j);
      h2 = Math.imul(h2, 0x01000193);
    }

    var hex1 = ('00000000' + (h1 >>> 0).toString(16).toUpperCase()).slice(-8);
    var hex2 = ('00000000' + (h2 >>> 0).toString(16).toUpperCase()).slice(-8);

    return 'PS-CERT-' + hex1.substring(0, 4) + '-' + hex1.substring(4, 8) + '-' + hex2.substring(0, 4);
  },

  // Resolve the current credential tier from live progress + exam history.
  tier: function (stats, examBestPct) {
    var allDone = stats.totalCount > 0 && stats.completedCount >= stats.totalCount;
    if (allDone && examBestPct >= 70) {
      return { key: 'certified', level: 3, label: 'Certified Procurement Professional', sub: 'Exam-Verified' };
    }
    if (allDone) {
      return { key: 'completion', level: 2, label: 'Certificate of Program Completion', sub: 'Self-directed curriculum' };
    }
    return { key: 'transcript', level: 1, label: 'Procurement Learning Transcript', sub: 'Progress record' };
  },

  // Best exam score across the full certification exam, or 0.
  bestExamScore: function () {
    var best = 0;
    (PS.exams ? PS.exams.history() : []).forEach(function (a) {
      if (a.bank === 'cert-full' && a.pct > best) best = a.pct;
    });
    return best;
  },

  // Honest statement of exactly what was done - no invented honors.
  statementFor: function (tier, stats, avgScore, examBest) {
    if (tier.key === 'transcript') {
      return 'This record shows learning activity in the Procure Sherpa Academy: functions completed, assessment scores and laboratory practice. It is a progress transcript, not a certification.';
    }
    if (tier.key === 'completion') {
      return 'has completed the self-directed Procure Sherpa Academy curriculum, covering ' + stats.completedCount +
        ' procurement functions with an average assessment score of ' + (avgScore > 0 ? avgScore + '%' : 'n/a') +
        '. This confirms completion of the course material; it is not an independently accredited qualification.';
    }
    return 'has completed the Procure Sherpa Academy curriculum (' + stats.completedCount +
      ' functions, average assessment ' + (avgScore > 0 ? avgScore + '%' : 'n/a') +
      ') AND passed the timed certification examination with a score of ' + examBest +
      '%. This is a platform-issued, exam-verified record; it is not an externally accredited qualification.';
  }
};

// The full-page render (header, tier ladder, cert document, competency
// transcript table, verification bar) previously lived in a
// PS.route('certificate', ...) handler here, driven by PS.cert above and
// PS.certTierStep (a small tier-ladder visual helper). Recover it from git
// history (commit e8ac5a1 or later, before this file was replaced with the
// disabled placeholder) if re-implementing with real verification.
```

</details>

---

## Executive Summary

Procure Sherpa v2.0 is a production-grade, offline-first procurement toolkit. This roadmap outlines 10 phases of improvements across learning, calculation, discovery, visualization, collaboration, accessibility, performance, data management, onboarding, and advanced procurement features.

**Philosophy:** Every enhancement must preserve the core constraints: single-file HTML, zero dependencies, offline-first, no telemetry, enterprise-grade security.

### Status legend (read this before Phases 1-10 below)

**Phases 1-10 are a proposal, not a commitment or a progress log.** They
describe a large surface of *possible* future work and were written in
one pass; almost none of it has been started. Only what's explicitly
marked is actually shipped:

| Status | Meaning |
|---|---|
| ✅ Shipped | In the current build, exercised by `npm run qa` |
| 🚧 Partial / scaffolding | Real infrastructure exists but coverage is narrow (see the item's note) |
| 📋 Proposed | Not started — an idea, not a plan with a date |

Everything in **Phase 11** was built out immediately after it was
proposed, and most of it is real. An audit of all 26 Phase 11 bullets
against the code and the gate output
(`docs/completion-ledger.md`, Part 3) found **20 present but asserted by
nothing and 6 absent outright** — 11.1d context awareness, 11.3d scenario
-tree export, 11.4b adaptive question length, 11.4c configurable pass
threshold wired to certificates, 11.5c spend period snapshots, and 11.5d
the CSV/JSON round trip. "Shipped" and "verified" are different claims,
and only the first was ever checked. Everything in **Phases 1-10** is
📋 proposed unless called out otherwise inline; 105 of its 149
capabilities are buildable inside the product's constraints, and 44 need
a decision from the owner because they collide with the single-file,
zero-dependency, offline and transfer-budget rules — the ledger names
each one and the constraint it breaks.
Two items already have partial infrastructure worth knowing about:

* 🚧 **i18n architecture** (Phase 6.2) — `PS.i18n` (`t()`, plural-safe
  substitution, locale persistence, live DOM re-apply) is real and
  working. `PS.i18n.CATALOG` registers **2 locales** (`en`, `es`) and
  **every key in it is wired**: `npm run audit:i18n` reports 44 keys
  defined, 44 reaching the screen (100%), 0 unused, and it fails the gate
  if either catalog is missing a key the other has. So the complaint
  about this item is **not** about wiring percentage — it is about
  breadth. The catalog carries 44 short strings, roughly 1 KB of English
  text, and it covers the persistent shell: navigation sections, the
  topbar and its search field, modal dialogs, and the calculator action
  bars. Everything a user actually reads is outside it: the 255 records
  the content libraries register (72 concepts, 18 SOPs, 27 checklists,
  33 templates, 17 decision guides, 18 KPIs, 45 glossary terms, 6
  scenarios, 19 calculators — `node tools/inventory.mjs` prints them),
  plus the 69 Academy functions and their 324 quiz questions. Counting
  quoted string literals, `src/content` alone holds about 0.8 MB of
  English against the catalog's 1 KB. **The honest limit is one translated
  shell around an English product**, and the Spanish half is real but
  thin. Phase 6.2 as written (seven locale files, RTL, `Intl` formatting)
  is still 📋 proposed; what shipped is the mechanism and the shell.
* 🚧 **CI** (not in the original 10 phases, added later) — the full
  `npm run qa` gate runs on **every push and every pull request to
  `main`**, plus a weekly scheduled run and a manual dispatch
  (`.github/workflows/qa.yml`), and a local pre-push hook runs the drift
  check and the fast subset first. It is a per-commit gate now; it used
  to be weekly-only. Availability is solved as of 2026-11-03: both
  workflows run on GitHub-hosted `ubuntu-latest` runners (free for
  public repositories), so CI no longer depends on any workstation
  being awake. The self-hosted era and its failure mode - a run on a
  sleeping runner queues rather than fails, and the badge does not
  distinguish the two - are recorded in CONTRIBUTING.md, "CI is green
  because nothing ran", along with what to check if runs queue again.

If you're deciding what to build next, treat this document as a menu,
not a schedule.

---

## Phase 1: Academy & Learning Enhancements (High Priority)

### 1.1 Spaced Repetition & Adaptive Learning
- **SM-2 Algorithm** for quiz scheduling per user
- **Forgetting curve** visualization in Progress page
- **Adaptive difficulty** - quiz questions adjust based on performance
- **Mastery decay** - badges fade if not reinforced (configurable)

### 1.2 Learning Path Recommendations
- **Role-based tracks**: Buyer → Category Manager → Procurement Leader
- **Gap analysis** - "You're missing these 3 competencies for your role"
- **Prerequisite mapping** - visual dependency graph between functions
- **Time-to-completion estimates** per track

### 1.3 Enhanced Practice & Lab
- **Scenario variants** - same crisis, different parameters (supplier size, market conditions)
- **Peer comparison** (anonymized, local-only) - "78% of users chose TCO over unit price"
- **Reflection prompts** after each lab - "What would you do differently?"
- **Export learning journal** as markdown/PDF

### 1.4 Certificate Enhancements
- **Blockchain-style verification** - anchor hash to local file + optional public timestamp
- **Competency badges** with Open Badges 2.0 compliance
- **Shareable certificate page** (static HTML fragment)
- **Expiration/renewal tracking** for compliance roles

---

## Phase 2: Calculator Power Features (High Priority)

### 2.1 Comparison & Sensitivity
- **Side-by-side comparison mode** - 2-4 calculators simultaneously
- **Tornado charts** - sensitivity analysis on key variables
- **Monte Carlo simulation** (lightweight) - run 1000 iterations with distributions
- **Break-even analysis** - "At what volume does Supplier A beat B?"

### 2.2 Batch & Automation
- **CSV import** - bulk calculate from spreadsheet
- **Template calculations** - save parameter sets as reusable scenarios
- **Scheduled recalculation** - "Re-run when FX rate changes" (manual trigger)
- **API-style handoff** - `calc.run(values)` returns structured object for chaining

### 2.3 Advanced Output
- **Excel export** with formulas (not just values) - `.xlsx` via SheetJS (embedded)
- **PowerPoint-ready charts** - export SVG with editable layers
- **Executive summary generator** - one-page narrative from results
- **Audit trail per calculation** - who, when, inputs, version, assumptions

### 2.4 Calculator Builder (No-Code)
- **Visual formula builder** - drag-drop inputs, operators, outputs
- **Custom calculator registry** - user-created tools stored in localStorage
- **Validation rules** - required, ranges, cross-field logic
- **Share custom calculators** via import/export JSON

---

## Phase 3: Search & Discovery Intelligence (Medium Priority)

### 3.1 Semantic Search (Local)
- **MiniLM embedding** (quantized, ~20MB) via Transformers.js
- **Vector similarity** for "conceptually similar" results
- **Hybrid scoring** - BM25 + semantic + recency + usage frequency
- **Query expansion** - "price increase" → "escalation", "indexation", "variation"

### 3.2 Recommendation Engine
- **"People also viewed"** - collaborative filtering (local, privacy-preserving)
- **Contextual suggestions** - on calculator page: "Related: TCO, Should-Cost, Negotiation Savings"
- **Learning nuggets** - "Based on your searches, read: Supplier Risk Assessment"
- **Serendipity slider** - control exploration vs. relevance

### 3.3 Search Analytics (Local)
- **Search heatmap** - what you search, when, success rate
- **Zero-result queries** - "You searched X 3 times, no results. Try Y."
- **Trending in your workspace** - your most-used tools this week
- **Export search log** for self-analysis

---

## Phase 4: Visualization & Dashboard Builder (Medium Priority)

### 4.1 Chart Library Expansion
| Chart | Use Case | Status |
|-------|----------|--------|
| Sankey | Spend flow (category → supplier → region) | Planned |
| Gantt | Project timeline (sourcing events) | Planned |
| Radar | Supplier scorecard multi-dimension | Planned |
| Sunburst | Spend hierarchy (category > sub-category > supplier) | Planned |
| Heatmap | Risk matrix (likelihood × impact) | Planned |
| Bullet | KPI actual vs target vs benchmark | Planned |

### 4.2 Custom Dashboard Builder
- **Grid layout** - drag-drop widgets (charts, KPIs, saved calcs, checklists)
- **Parameterized widgets** - "Show savings for Category X, last 12 months"
- **Dashboard templates** - "Category Review", "Supplier QBR", "Audit Prep"
- **Export dashboard** as standalone HTML fragment
- **Auto-refresh** - recalc widgets on data change

### 4.3 Interactive Features
- **Drill-down** - click Pareto bar → supplier detail → contract → risk
- **Cross-filtering** - select category in one chart → filters all others
- **Annotations** - add notes to data points, persist in saved workspace
- **Time-travel** - slider for historical snapshots

---

## Phase 5: Collaboration & Sharing (Offline-First) (Medium Priority)

### 5.1 Shareable Artifacts
| Artifact | Format | Mechanism |
|----------|--------|-----------|
| Calculation | URL with encoded state | `?calc=tco&v=eyJx...` |
| Dashboard | HTML fragment | Copy-paste into Confluence/SharePoint |
| Checklist | Markdown/CSV | Export → email/Teams |
| Certificate | HTML + JSON | Self-contained verification |
| Workspace | `.psbackup` JSON | Import/export |

### 5.2 Team Workspace (Local Sync)
- **Workspace profiles** - "Team A", "Project X" - switch contexts
- **Merge strategy** - import colleague's backup, resolve conflicts visually
- **Shared templates** - org-level template library (import once)
- **Read-only view** - generate static HTML for stakeholders

### 5.3 Comment & Review Threads
- **Inline comments** on saved calculations/checklists
- **@mentions** (local usernames) - "Review this assumption @jane"
- **Resolution tracking** - open/in-progress/resolved
- **Export thread** as PDF for audit

---

## Phase 6: Accessibility & Internationalization (Medium Priority)

### 6.1 WCAG 2.1 AA Compliance
- **Color contrast** - all combinations ≥4.5:1 (already close)
- **Focus indicators** - 3px solid, visible in all themes
- **Screen reader** - ARIA labels, live regions, heading hierarchy
- **Keyboard-only** - every action reachable, no keyboard traps
- **Reduced motion** - `prefers-reduced-motion` respected everywhere
- **High contrast mode** - forced colors support

### 6.2 Internationalization (i18n)
- **Translation keys** - extract all strings to `PS.i18n` namespace
- **Locale files** - JSON per language (en, es, fr, de, zh, ar, pt)
- **RTL support** - CSS logical properties, `dir="auto"` detection
- **Number/currency/date** - `Intl` API throughout
- **Locale switcher** - in Settings, persists locally

### 6.3 Assistive Features
- **Text-to-speech** - "Read this SOP" button (Web Speech API)
- **Dyslexia font** - OpenDyslexic option
- **Magnifier** - hover zoom for charts/tables
- **Voice commands** - "Open TCO calculator" (optional, opt-in)

---

## Phase 7: PWA & Performance (Low Priority)

### 7.1 Service Worker Strategy
- **Cache-first** for static assets (HTML, CSS, JS, images)
- **Stale-while-revalidate** for content (SOPs, KB articles)
- **Offline fallback** - custom "You're offline" page with cached data
- **Background sync** - queue audit events, flush when online
- **Update notification** - "New version available, click to refresh"

### 7.2 Performance Optimization
- **Code splitting** - lazy-load Academy/Operations hubs
- **Virtual scrolling** - large lists (saved items, search results)
- **Web Workers** - heavy calculations (Monte Carlo, embeddings)
- **IndexedDB** - migrate from localStorage for >5MB data
- **Bundle analysis** - track HTML size, set budget (<2MB)

### 7.3 Install Experience
- **BeforeInstallPrompt** - custom install banner
- **Shortcuts** - "New Calculation", "Academy", "What should I do?"
- **Screenshots** - for app store / PWA manifest
- **File handling** - register `.psbackup` as file handler

---

## Phase 8: Data Management & Migration (Low Priority)

### 8.1 Advanced Backup
- **Scheduled auto-backup** - daily/weekly to Downloads folder
- **Incremental backup** - only changed records
- **Encryption** - optional AES-GCM password protection
- **Cloud sync (opt-in)** - Google Drive / OneDrive / Dropbox via File System Access API

### 8.2 Selective Restore
- **Preview backup** - tree view of contents before restore
- **Cherry-pick** - restore only "Saved Calculations" or "Checklists"
- **Merge preview** - diff current vs backup, resolve conflicts
- **Rollback** - one-click undo last restore

### 8.3 Migration & Upgrade
- **Version migration** - v1.x → v2.x → v3.x automatic
- **Schema validation** - JSON Schema for all stored objects
- **Data health check** - "Found 3 orphaned checklists, fix?"
- **Export for BI** - structured CSV/Parquet for Power BI/Tableau

### 8.4 Storage Dashboard
- **Usage breakdown** - localStorage/IndexedDB by category
- **Quota warning** - "80% full, consider cleanup"
- **Cleanup suggestions** - "12 calculations >1 year old, archive?"
- **Compression** - LZ-string for large text fields

---

## Phase 9: Onboarding & Contextual Help (High Priority)

### 9.1 Interactive Guided Tour
- **First-run flow** - 5-step: Profile → Hub choice → Quick calc → Save → Certificate
- **Feature callouts** - "This is the Command Palette (Ctrl+K)" with spotlight
- **Progressive disclosure** - show advanced features after basics mastered
- **Skip/replay** - always accessible from Help menu

### 9.2 Contextual Help System
- **Help button** on every page - opens relevant help article
- **Tooltips** - hover any field/term for definition
- **Glossary inline** - dotted underline on terms, click for definition
- **Video embeds** - 60-sec micro-tutorials (stored as base64 or external links)

### 9.3 Just-in-Time Learning
- **Empty states** - "No saved calculations. Try: Compare Quotes →"
- **Error recovery** - "Calculation failed. Common fix: check duty %"
- **Success coaching** - "Great! Now send to Negotiation Savings →"
- **Habit formation** - "You've used 3 calculators this week. Try a checklist?"

### 9.4 Help Center Overhaul
- **Search-first** - Command Palette searches help too
- **Troubleshooting tree** - "My result looks wrong → Check inputs → Check assumptions"
- **FAQ with voting** - "Was this helpful?" (local storage)
- **Contact template** - "Report issue" pre-fills version, route, error

---

## Phase 10: Advanced Procurement Features (Medium Priority)

### 10.1 Maturity & Benchmarking
- **Maturity model** - 5 levels across 8 dimensions (CIPS/ISM aligned)
- **Self-assessment wizard** - 40 questions, radar chart output
- **Peer benchmark** (anonymized) - "Your cycle time: 23 days. Top quartile: 14 days"
- **Improvement roadmap** - "Focus on: Supplier Segmentation, Contract Compliance"

### 10.2 Supplier Portal Simulation
- **Supplier self-assessment** - send link, they fill PQQ offline, return JSON
- **Bid collection** - receive quotes via file upload, auto-parse to Compare Quotes
- **Evaluation workspace** - side-by-side supplier profiles with scores
- **Communication log** - timestamped notes, emails, meetings per supplier

### 10.3 Contract Intelligence
- **Clause library** - 100+ standard clauses with risk ratings
- **Redline analyzer** - paste contract, highlights risky deviations
- **Obligation tracker** - extract deliverables, dates, penalties → calendar
- **Renewal cockpit** - 90/60/30 day alerts, leverage analysis

### 10.4 Risk & Compliance
- **Risk heat map** - suppliers × categories × risk types
- **Sanctions screening** - offline list (updated via backup), highlight matches
- **ESG scorecard** - carbon, diversity, modern slavery, governance
- **Business continuity** - single-source mapping, alternative suppliers

---

## Phase 11: New Capability Expansion (Added 2026-09-18)

### 11.1 Offline AI Copilot
- **Local answer engine** - rule-based/retrieval assistant answering procurement questions from the bundled KB, SOPs, and glossary (no network)
- **Intent router** - maps natural-language questions to calculators, checklists, or decision guides
- **Inline citations** - every answer links back to the source competency/KB fragment
- **Context awareness** - 📋 **not built.** Nothing in `06e3_copilot.js` reads `PS.routeMeta`, `PS.calcState` or the saved workspace: the copilot answers from the question text and the index alone
- **Transcript log** - session history saved to the workspace, exportable to JSON/Markdown

### 11.2 Static Share Pages
- **Any-route export** - generate a self-contained static HTML fragment for a calculation, chart, checklist, or certificate
- **Copy-to-Clipboard** - paste directly into Confluence/SharePoint/email
- **Read-only snapshot** - values baked in, no dependencies on the live app
- **Branded header/footer** - org name, date, confidentiality notice

### 11.3 What-If Branching
- **Scenario branching** on any calculator - vary one input, see the delta
- **Decision trees** - saveable multi-branch explorations with labels and timestamps
- **Comparison table** - ✅ the rows ship (`PS.whatif` builds a base-vs-scenario table per varied result); 📋 **winner highlighting is not built** - nothing marks the better branch, `winner` appears nowhere in `06e2_whatif.js`
- **Export** - 📋 **not built.** `06e2_whatif.js` calls neither `PS.download` nor `PS.toMarkdown`: a scenario tree exists only in this browser and cannot leave it

### 11.4 Practice Exams
- **Random question banks** - timed, proctored-style exams assembled from competency question pools
- **Adaptive length** - 📋 **not built.** The count is a `Questions per exam` select (3/5/8/12) the reader sets; nothing scales it from demonstrated competency
- **Pass/fail thresholds** - 📋 **not built as described.** One 70% pass mark is fixed for every bank, and it links to nothing, because certificate issuance is disabled (`#/certificate`)
- **Answer review** - post-exam breakdown with explanations and lab links
- **Attempt history** - retake tracking with best-score persistence

### 11.5 Spend Data Model
- **Drag-drop hierarchy editor** - build category > sub-category > supplier tree
- **Auto-populates charts** - Pareto, Kraljic, and dashboards derive from the same model
- **Period snapshots** - 📋 **not built.** `06e5_spend.js` keeps one current model; `snapshot` and `period` appear nowhere in it, so there is nothing to compare a month against
- **Import/export** - 📋 **not built.** The spend model exports; no CSV or JSON path reads it back in, so a thousand rows have to be typed

### 11.6 Doc Pack Builder
- **RFI/RFP/contract pack assembly** - select templates + data, compose a package
- **Offline PDF** - print-ready paginated output (single-file, no server)
- **Cover sheet** - auto-generated executive summary page
- **Package manifest** - document list, version, and status check

---

## Implementation Guidelines

### Certification Credibility Plan (added 2026-09-19)

> **Status correction (2026-11-01):** the certificate feature is
> **disabled** - see "Certificates (deferred)" near the top of this file.
> `#/certificate` renders an honest "not available yet" placeholder, so
> the rules below describe the reference design preserved in that section,
> not behaviour running in the shipped artifact. Rule 4 in particular
> ("the verification hash ... so a forged certificate does not verify")
> cannot be claimed as enforced: the disable note records that the hash
> was a client-side FNV with a salt shipped in the same file, which is
> forgeable by design. What *is* enforced in code today is rule 1 and
> rule 3 - no invented authority appears anywhere in the product.

**Problem:** The v2.0 certificate printed invented honors ("Executive Certificate",
"accredited transcript", "Examination Board", "Master of Strategic Procurement").
As a new LMS we have no accreditation authority, so those titles read as fake to
recruiters and HR and damage the product's credibility.

**Principle:** A credential must state *exactly what happened, who issued it, and
what it does not claim*. No invented authority, no borrowed accreditation.

**Three-tier model:**

| Tier | Earned by | Issued title | Claims |
|------|-----------|-------------|--------|
| 1 · Transcript | Always available | Procurement Learning Transcript | "Records learning activity only — not a certification" |
| 2 · Completion | All curriculum functions completed | Certificate of Program Completion | "Completed the self-directed Academy curriculum (N functions)" |
| 3 · Exam-verified | Completion + pass timed certification exam ≥ 70% | Certified Procurement Professional (Exam-Verified) | "Completed the curriculum AND passed a timed certification exam at X%" |

**Honesty rules enforced in code:**
1. Never use "accredited", "Executive Certificate", "Board", "Master of" or
   "certifies" — replace with exact, verifiable statements.
2. Issuer is always "Procure Sherpa Academy" (the platform), never an invented body.
3. "Aligned with CIPS/ISM frameworks" is allowed as a *content reference* note,
   never as "accredited by CIPS/ISM".
4. The verification hash includes the tier key + exam score, so a forged or
   older-tier certificate does not verify against a higher tier.
5. A "How to verify" note explains the hash is self-generated on-device and that
   the credential is not an externally accredited qualification.
6. Tier-3 requires the exam module (roadmap 11.4) — completion alone can never
   mint the top tier.

---

## Implementation Guidelines

### Technical Constraints
| Constraint | Requirement |
|------------|-------------|
| Single file | All code in `ProcureSherpa-v2.0.html` |
| No build step | Source fragments → build.mjs → single HTML |
| Zero deps | No npm packages in runtime (dev only) |
| Offline-first | All features work without network |
| Privacy | No external requests, no telemetry |
| Security | CSP-compatible, no eval, sanitized inputs |

### Development Workflow

This is the workflow the repository actually runs today; the
authoritative version is CONTRIBUTING.md, and where this list and that
file disagree, that file is the one CI and the git hook enforce.

1. **Work on `main`.** There is no feature-branch flow and no PR queue in
   practice; the branch-and-PR workflow this list used to describe was
   never enforced by anything in the repo.
2. **Install on Node 22+** - `nvm use 22` (`.nvmrc`) then `npm ci`, which
   refuses on an older Node because `.npmrc` sets `engine-strict=true`.
   `node tools/preflight.mjs` says plainly if the toolchain is wrong.
3. **Modify source fragments** in `src/`, then rebuild with
   `npm run build` - the committed `ProcureSherpa-v2.0.html` must land in
   the same commit as the fragments that produced it.
4. **Run `npm run qa`** before pushing. That is the real bar, and it runs
   the smoke test (all 72 routes in `tools/smoke.mjs`), the relationship
   checker (zero broken cross-refs), `validate.mjs`, the layout,
   integrity, security, accessibility and performance gates, and finally
   re-runs the suite against the minified deploy build.
   `npm run qa:ci` is the same plus the drift check first, which is what
   CI runs and what the pre-push hook runs.
5. **Tag a release** with the version in `package.json`; `PS.VERSION` and
   the newest `PS.whatsNew.CHANGES` entry have to name the same release,
   or the drift check fails.

### Prioritization Framework
```
Score = (User Impact × 0.4) + (Strategic Alignment × 0.3) + (Effort⁻¹ × 0.2) + (Risk⁻¹ × 0.1)
```
- **User Impact**: How many users benefit, how much time saved
- **Strategic Alignment**: Supports "Question → Concept → Process → SOP → Calculator → Decision → Template → Report"
- **Effort**: Dev days (inverse = easier scores higher)
- **Risk**: Regression potential, complexity

---

## Quick Wins (proposed for v2.1 - status checked against the build on 2026-11-01)

The heading said "Can Ship in v2.1", and v2.1 is long past: the build is
2.4. Five of the seven shipped, so they are marked as such rather than
left sitting in a backlog nobody re-reads.

| Feature | Effort | Impact | Files | Status |
|---------|--------|--------|-------|--------|
| Keyboard shortcuts cheat sheet (printable) | 1 day | High | `01g_print.css`, `03c_ui.js` | ✅ shipped - `03c_ui.js` carries the printable cheat sheet |
| Calculator "Copy as Markdown" | 1 day | High | `05c_calcresult.js` | ✅ shipped - `PS.calcMarkdown()` in `05c_calcresult.js`, and the KB/SOP/checklist pages carry the same button |
| Search "Did you mean?" | 2 days | Medium | `03g_search.js` | ✅ shipped - the suggestion label is in `03g_search.js` |
| Dark mode scheduler (sunset/sunrise) | 0 days | Medium | `04b2_navbuild.js`, `03d2_prefs.js` | ✅ shipped, in a different file than this row named - `PS.getScheduledTheme` compares the clock to `themeAutoStart`/`themeAutoEnd` and `PS.startThemeScheduler` re-checks every 60 s from boot, with the times editable in Settings. What is still owed is the assertion: §43 only checks the dark tokens exist, and the jsdom harness stubs `matchMedia` to `matches:false`, so the `system` branch has never been executed under test |
| Export chart as SVG button | 1 day | High | `03j_charts.js` | ✅ shipped - every chart renders an "Export SVG" button |
| Saved items bulk actions (delete, tag) | 2 days | Medium | `08d2_pages_savedlist.js` | ✅ shipped for export and delete; tagging is not part of the bulk bar |
| Academy "Mark all complete" for testing | 0.5 day | Low | `03h_academy_store.js` | 📋 not built - "Mark all" exists on checklists, not in the Academy store |

---

## Version Targets

The dates below were the plan written in September 2026, and they did not
survive contact with the build. The releases that actually shipped, taken
from `PS.whatsNew.CHANGES` (the list the What's New page renders, and the
one `tools/check_drift.mjs` compares against `package.json` and
`PS.VERSION`):

| Version | Shipped | What it was |
|---------|---------|-------------|
| 2.0 | 2026-09-16 | The single-file platform baseline |
| 2.1 | 2026-09-20 | Quick wins, and the Phase 11 capabilities below |
| 2.2 | 2026-09-28 | - |
| 2.3 | 2026-10-08 | - |
| 2.4 | 2026-10-20 | The revamp recorded in `docs/v2.4-delivery-report.md` |
| 2.5 | 2026-11-02 | Academy Modules 12 and 13 shipped and integrated, the storage suite written, the hostile-backup path closed, CI least privilege added, and 25 integrity gates |
| 2.6 | 2026-11-02 | Module 14 (influence, the executive ask, adoption) - 37 functions in 14 modules; practice-exam integrity fixed; footer and sidebar rebuilt; 26 integrity gates |
| 2.7 | 2026-11-02 | Module 15 (freight and customs, regulated buying, people-time categories) plus 6 new concepts, 2 new SOPs and 6 glossary terms - 40 functions in 15 modules, 248 library records, 19 badges |
| 3.0 | 2026-11-02 | The reading edition: new design system (jade accent, dark navigation rail, 16px base, serif lesson prose, 1,440px content column), theme-aware charts, Module 16 (obligation register, change control, claims and remedies) - 54 functions in 18 modules, 244 step sequences, 194 questions; glossary relations complete (45 terms, 252 records); 30 integrity gates / 130 assertions |

The original target table said v2.1 in Q4 2026, v2.2 in Q1 2027 and v2.3
in Q2 2027. All three shipped inside four weeks of being planned, in
September and October 2026. It also parked the Phase 11 items at v3.1
(Q1 2028) and v3.2 (Q2 2028); the offline copilot, static share pages,
what-if branching, practice exams, spend data model and doc pack
builder are all **shipped today** - the status legend at the top of this
file marks all of Phase 11 as shipped. Anything still numbered v3.x here
is a placeholder for work that has not been scoped, not a promise with a
date attached.

---

## Success Metrics

Re-measured against the build on 2026-11-01. Every "Current" figure below
is one a tool prints; where the tool disagrees with this table, the tool
is right and this table is the thing to fix.

| Metric | Current | Target |
|--------|---------|--------|
| Routes passing smoke test | 87 of 87 (`node tools/smoke.mjs` - "routes: 87 failing: 0") | 80+ - met |
| Cross-ref integrity | 0 broken (`node tools/check_rels.mjs` - "checked 261 rel objects; broken refs: 0") | 0 broken |
| Payload | 2,149 KB readable, 1,768 KB minified, 528 KB gzipped as deployed (594 KB gzipped as the readable file). Re-measure with `npm run perf` - these move with every content commit, which is why the gate below is a time and not a byte count | the gate is a transfer time, not a byte count: under 1,152 KB compressed (3 s at 3 Mbps), warning at 85% of it |
| Boot and compile | gated, not asserted: `npm run perf` holds app boot to a rendered first page under 500 ms and full V8 script compile under 400 ms, and prints the live figures. They are wall-clock, so they belong to the machine that took them | under budget on every build |
| Accessibility (`npm run audit:a11y`) | 0 issues, across the 64 routes the audit enumerates (52 registered routes, so the sweep is wider than the registry) | 0 issues, keyboard focus visible in both themes |
| PWA score (Lighthouse) | **not measurable as things stand** - the artifact has no web manifest and no service worker (`serviceWorker` appears nowhere in `src/` or the built file), so there is no install surface for Lighthouse to score. This is Phase 7 work, not a missing measurement | decide first whether the product wants to be installable at all |
| Supported languages | 2 registered (`en`, `es`), 43 of 43 shell catalog keys wired - `npm run audit:i18n`. The authored content is English-only; see the i18n entry in the status legend | 7+ |
| Calculator count | 19 | 25+ |
| Academy functions | 28 (the original 24+ target is already exceeded) | re-baseline the target |

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-09-17 | Tag `HUBCHANGED` before UX push | Preserve pre-improvement baseline |
| 2026-09-17 | Prioritize mobile calc bottom sheet | 40%+ users on mobile/tablet |
| 2026-09-17 | Add toast container + stacking | Multiple simultaneous toasts were lost |
| 2026-09-17 | Modal focus trap | Accessibility compliance |
| 2026-09-17 | Command palette scores + shortcuts | Power user efficiency |
| 2026-09-18 | Added Phase 11 (6 new capabilities) | Requested expansion beyond original 10 phases |
| 2026-09-18 | Phase 11 shipped in v2.1 dev | Copilot, static share, what-if, exams, spend model, doc pack all implemented |
| 2026-09-20 | Added weekly-only GitHub Actions QA workflow + local pre-push hook | Repo had zero CI; weekly keeps the full audit suite honest without gating every commit, pre-push hook catches most regressions before they leave a contributor's machine |
| 2026-09-20 | Fixed exam auto-submit-on-timeout bug | Timer expiry routed through a confirmation modal the candidate could miss entirely, leaving the attempt ungraded |
| 2026-09-20 | Tracked `package-lock.json`; added i18n/perf soft-budget audits; added CONTRIBUTING.md + SECURITY.md; added this status legend; removed dead/duplicate screenshots and a stale disabled-feature screenshot | Repo hygiene and honesty pass - see git log for full detail |

---

*This roadmap is a living document. Update after each release based on user feedback and usage analytics (local, opt-in).*