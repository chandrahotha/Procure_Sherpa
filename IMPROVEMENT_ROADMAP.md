# Procure Sherpa v2.0 - Improvement Roadmap

**Current Version:** 2.0 (post-UX improvements)  
**Baseline Tag:** `HUBCHANGED`  
**Last Updated:** 2026-09-18

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

Everything in **Phase 11** is ✅ shipped (it was added after the original
10 phases and built out immediately — see the Decision Log). Everything
in **Phases 1-10** is 📋 proposed unless called out otherwise inline.
Two items already have partial infrastructure worth knowing about:

* 🚧 **i18n architecture** (Phase 6.2) — `PS.i18n` (`t()`, plural-safe
  substitution, locale persistence, live DOM re-apply) is real and
  working, but only 1 locale (`en`) is registered and only the
  persistent shell chrome (~20% of catalog keys) is actually wired to
  it — run `npm run audit:i18n` for the live count. Route/page content
  (calculators, Academy, SOPs, checklists, templates, KB) is still
  hardcoded English throughout.
* 🚧 **CI** (not in the original 10 phases, added later) — a weekly
  GitHub Actions run of the full `npm run qa` gate exists
  (`.github/workflows/qa.yml`) plus a local pre-push hook for the fast
  test subset. It is not a per-commit/per-PR gate.

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
- **Context awareness** - uses current route, open calculator inputs, and saved workspace for answers
- **Transcript log** - session history saved to the workspace, exportable to JSON/Markdown

### 11.2 Static Share Pages
- **Any-route export** - generate a self-contained static HTML fragment for a calculation, chart, checklist, or certificate
- **Copy-to-Clipboard** - paste directly into Confluence/SharePoint/email
- **Read-only snapshot** - values baked in, no dependencies on the live app
- **Branded header/footer** - org name, date, confidentiality notice

### 11.3 What-If Branching
- **Scenario branching** on any calculator - vary one input, see the delta
- **Decision trees** - saveable multi-branch explorations with labels and timestamps
- **Comparison table** - side-by-side scenario rows with winner highlighting
- **Export** - scenario trees export as JSON/Markdown for audit trails

### 11.4 Certification Exams
- **Random question banks** - timed, proctored-style exams assembled from competency question pools
- **Adaptive length** - question count scales with competency depth
- **Pass/fail thresholds** - configurable per exam, linked to certificate issuance
- **Answer review** - post-exam breakdown with explanations and lab links
- **Attempt history** - retake tracking with best-score persistence

### 11.5 Spend Data Model
- **Drag-drop hierarchy editor** - build category > sub-category > supplier tree
- **Auto-populates charts** - Pareto, Kraljic, and dashboards derive from the same model
- **Period snapshots** - monthly spend captures with time-travel comparison
- **Import/export** - CSV/JSON round-trip for bulk population

### 11.6 Doc Pack Builder
- **RFI/RFP/contract pack assembly** - select templates + data, compose a package
- **Offline PDF** - print-ready paginated output (single-file, no server)
- **Cover sheet** - auto-generated executive summary page
- **Package manifest** - document list, version, and status check

---

## Implementation Guidelines

### Certification Credibility Plan (added 2026-09-19)

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
1. **Create feature branch** from `main`
2. **Modify source fragments** in `src/`
3. **Run `node build.mjs`** to compile
4. **Run `node tools/smoke.mjs`** - all 63 routes must pass
5. **Run `node tools/check_rels.mjs`** - zero broken cross-refs
6. **Run `node validate.mjs`** - syntax + skeleton check
7. **PR with screenshots** - desktop + mobile
8. **Tag release** - `v2.1.0`, `v2.2.0`, etc.

### Prioritization Framework
```
Score = (User Impact × 0.4) + (Strategic Alignment × 0.3) + (Effort⁻¹ × 0.2) + (Risk⁻¹ × 0.1)
```
- **User Impact**: How many users benefit, how much time saved
- **Strategic Alignment**: Supports "Question → Concept → Process → SOP → Calculator → Decision → Template → Report"
- **Effort**: Dev days (inverse = easier scores higher)
- **Risk**: Regression potential, complexity

---

## Quick Wins (Can Ship in v2.1)

| Feature | Effort | Impact | Files |
|---------|--------|--------|-------|
| Keyboard shortcuts cheat sheet (printable) | 1 day | High | `01g_print.css`, `03c_ui.js` |
| Calculator "Copy as Markdown" | 1 day | High | `05c_calcresult.js` |
| Search "Did you mean?" | 2 days | Medium | `03g_search.js` |
| Dark mode scheduler (sunset/sunrise) | 1 day | Medium | `03d2_prefs.js` |
| Export chart as SVG button | 1 day | High | `03j_charts.js` |
| Saved items bulk actions (delete, tag) | 2 days | Medium | `08d1_pages_saved.js` |
| Academy "Mark all complete" for testing | 0.5 day | Low | `03h_academy_store.js` |

---

## Version Targets

| Version | Target Date | Theme |
|---------|-------------|-------|
| v2.1 | Q4 2026 | Quick wins + Academy polish |
| v2.2 | Q1 2027 | Calculator power features |
| v2.3 | Q2 2027 | Search intelligence + Dashboard builder |
| v3.0 | Q4 2027 | Collaboration + i18n + PWA maturity |
| v3.1 | Q1 2028 | Phase 11: Offline AI copilot, static share pages, what-if branching |
| v3.2 | Q2 2028 | Phase 11: Certification exams, spend data model, doc pack builder |

---

## Success Metrics

| Metric | Current | Target (v3.0) |
|--------|---------|---------------|
| Routes passing smoke test | 63/63 | 80+/80+ |
| Cross-ref integrity | 0 broken | 0 broken |
| HTML size | 1.23 MB (1261 KB, 79% of the 1600 KB build budget) | <2 MB |
| Load time (offline) | ~800ms | <500ms |
| Accessibility score (`npm run audit:a11y`) | 0 issues / 38 routes | 0 issues, all routes |
| PWA score (Lighthouse) | not yet measured | 100 |
| Supported languages | 1 (EN); i18n scaffolding covers ~20% of catalog keys - see status legend above | 7+ |
| Calculator count | 19 | 25+ |
| Academy functions | 19 | 24+ |

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