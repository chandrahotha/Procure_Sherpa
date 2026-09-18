# Procure Sherpa v2.0 - Improvement Roadmap

**Current Version:** 2.0 (post-UX improvements)  
**Baseline Tag:** `HUBCHANGED`  
**Last Updated:** 2026-09-17

---

## Executive Summary

Procure Sherpa v2.0 is a production-grade, offline-first procurement toolkit. This roadmap outlines 10 phases of improvements across learning, calculation, discovery, visualization, collaboration, accessibility, performance, data management, onboarding, and advanced procurement features.

**Philosophy:** Every enhancement must preserve the core constraints: single-file HTML, zero dependencies, offline-first, no telemetry, enterprise-grade security.

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
4. **Run `node tools/smoke.mjs`** - all 59 routes must pass
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
| Routes passing smoke test | 59/59 | 80+/80+ |
| Cross-ref integrity | 0 broken | 0 broken |
| HTML size | 1.15 MB | <2 MB |
| Load time (offline) | ~800ms | <500ms |
| Accessibility score (Lighthouse) | ~92 | 100 |
| PWA score (Lighthouse) | ~70 | 100 |
| Supported languages | 1 (EN) | 7+ |
| Calculator count | 19 | 25+ |
| Academy functions | 16 | 24+ |

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

---

*This roadmap is a living document. Update after each release based on user feedback and usage analytics (local, opt-in).*