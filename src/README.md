# Source Architecture & Modular Fragments

This repository utilizes a modular multi-file architecture. The standalone `ProcureSherpa-v2.0.html` file at the repository root is a compiled production artifact. Never edit the root HTML file directly. Edit the source fragments in `src/`, then compile via `node build.mjs` (or `npm run build`).

```
src/
  manifest.txt          Linear assembly sequence (177 fragments).
                        The build compiler concatenates files in this exact order.
                        To add a fragment: create the file in the designated folder,
                        then insert its path in manifest.txt.

  base/                 Document Shell & Design System
                        01a_head.html       Design tokens, CSS variables, typography
                        01b..01g_*.css      Reset, layout, components, forms, print styles
                        01h_academy.css     Academy curriculum, quiz cards, crisis sandboxes
                        01i_portal_user.css Command Center portal, user badge
                        01j_global_extras   Responsive breakpoints, mobile nav, toasts
                        02_shell.html       Application topbar, one persistent sidebar, layout shell
                        99_tail.html        Closing body and html tags

  core/                 Application Runtime Engine
                        03a..03g_*          Utilities, safe I/O, local store, search palette
                        03h_academy_store   Academy mastery tracking, badges, quiz scoring
                        03i_user_profile    Account state, profile modal, role switcher
                        03j_charts          Zero-dependency inline SVG visual analytics
                                            (Waterfall, Kraljic, Pareto, Altman Z-Score)
                        04a_router          Hash router, active-link marking, breadcrumb dispatch
                        04b1_navdata        PS.NAV_UNIFIED + PS.NAV_FOOTER: the sidebar data
                        04b2_navbuild       Builds/refreshes the sidebar and its footer per route
                        04c..04d_*          Render helpers, list pages
                        05a..05d_*          Calculator forms, validation, result formatters
                        06a..06e_*          Action controllers, templates, backup archives,
                                            i18n, exams, copilot, spend model, docpack
                        06f1_workbench      The workbench framework: one local record
                                            store, one form language, one table
                                            renderer, one export path, one sign-off
                                            mechanism, shared by all eight workbenches
                        06f2_workbench_specs The field specification for every workbench
                                            record, declared once so the form, the
                                            table, the validation and the export
                                            read the same definition
                        07a..07b_*          Boot lifecycle and global event wiring
                         06b1_actions_markdown Full-fidelity Markdown export for every content type
                         08g1a_sandbox_models  The eleven crisis sandboxes as data, plus the
                                              generic renderer that draws them
                         90a_idmap.js        The one legacy id map, shared with tools/check_rels
                         90b_link_completion.js The declared inbound links, shared with the checker
                        90_normalize.js     Content normalization and alias resolution

  pages/                Page View Controllers & Renderers
                        08a1..08a3_*        Command Center landing page
                        08b1..08b7_*        KB, SOP, checklist, template, decision, KPI, scenario pages
                        08c1..08c6_*        Search, dashboards, lifecycle map, Operations Hub gateway
                        08e1_pages_backup   Workspace Data Footprint and JSON archive manager
                        08f1_pages_help     Architecture, IT compliance, and user guides
                        08g1_pages_academy  Academy curriculum, 5-tab pedagogy, sandboxes
                        08g2_pages_quiz_engine Adaptive assessments and tactical advisor tips
                        08g3_pages_certificate Certificate feature - disabled, honest placeholder
                                            (not a legally authorized credential issuer; see root README)
                        08h1..08h4_*        Copilot, exams, spend model, doc pack builder
                        08i1..08i7_*        Learning paths, assessment, portfolio, career
                                            paths, next lesson, daily tip
                        08j1_pages_wb_registry The supplier, contract, catalogue and
                                            approval workbenches
                        08j2_pages_wb_rfx   The RFx and evaluation workbench: events,
                                            criteria, weights, bids, award
                        08j3_pages_wb_ops   The receipts, budget and analytics
                                            workbenches

  content/              Controlled Knowledge Libraries
                        09*..18*            Concepts, SOPs, checklists, templates, KPIs
                        19a..19e_*          11 modules / 28 Academy digital procurement functions

  calcs/                Financial & Operational Calculators
                        20*..38*            19 paired calculator definitions and math algorithms
                                            (TCO, Should-Cost, Incoterms, Altman Z-Score, etc.)
```

## Architectural Rules

1. **Strict Execution Order**: Fragments execute in a shared single-script scope (`PS.*`). An individual fragment can only consume abstractions defined in preceding files. The sequence defined in `src/manifest.txt` governs the compilation order.
2. **Single-Purpose Fragments**: Maintain small, focused files corresponding to distinct components, libraries, or action controllers.
3. **Zero Dash Compliance**: Never introduce em dashes or en dashes into copy or source code. Use standard hyphens, colons, or commas.
4. **One sidebar, one nav data source, scoped by the track**: The sidebar is defined once in `PS.NAV_UNIFIED` (`04b1_navdata.js`) and rendered by `PS.buildNav` (`04b2_navbuild.js`) for **every** route, including `#/home`. The system pages live in a separate permanent footer strip, `PS.NAV_FOOTER`, outside the collapsible tree. Each section declares which views it belongs to (`academy`, `operations`, `both`), and the menu follows the profile's `track`: a learner sees 5 sections and 26 items, a practitioner sees 6 sections and 30 items, and the reference library is shared so the Academy is still taught through the SOPs, templates and calculators. The current route always wins: a page whose section the current view hides has that section shown for that visit, so the navigation is never a dead end. The Learn / Work switch in the sidebar writes the same `profile.track` field the profile modal writes, so there is one source of truth. **This rule changed deliberately.** The previous version said "do not reintroduce per-hub sidebars or a hub-switcher", and that was correct about the implementation and wrong about the idea: the hub-switcher that was removed had broken in two specific ways (the Academy accordion overflowed with no scroll affordance, and a CSS specificity bug leaked mobile-only nav toggles onto desktop), and neither of those is an argument against two views. The user asked for the two-option choice they had made in the first place, and it was implemented as a scoped view of an existing profile field rather than as a second identity system. Two things must not come back: a second source of truth for the view, and a per-section identity that changes what the pages are called.
5. **Validation Protocol**: After editing source fragments, run:
   * `node build.mjs` to assemble and perform AST syntax validation.
   * `npm run qa` for the full gate: rels, calculators, interactive checks,
     content QA, smoke (52 routes), the 14-gate integrity suite, security, a11y, and
     the measured performance budget.
   * `node tools/check_rels.mjs` on its own to verify cross-reference relational integrity quickly.
