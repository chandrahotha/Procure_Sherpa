# Source Architecture & Modular Fragments

This repository utilizes a modular multi-file architecture. The standalone `ProcureSherpa-v2.0.html` file at the repository root is a compiled production artifact. Never edit the root HTML file directly. Edit the source fragments in `src/`, then compile via `node build.mjs` (or `npm run build`).

```
src/
  manifest.txt          Linear assembly sequence (142 fragments).
                        The build compiler concatenates files in this exact order.
                        To add a fragment: create the file in the designated folder,
                        then insert its path in manifest.txt.

  base/                 Document Shell & Design System
                        01a_head.html       Design tokens, CSS variables, typography
                        01b..01g_*.css      Reset, layout, components, forms, print styles
                        01h_academy.css     Academy curriculum, quiz cards, crisis sandboxes
                        01i_portal_user.css Command Center, dual-hub switcher, user badge
                        02_shell.html       Application topbar, sidebar, and layout shell
                        99_tail.html        Closing body and html tags

  core/                 Application Runtime Engine
                        03a..03g_*          Utilities, safe I/O, local store, search palette
                        03h_academy_store   Academy mastery tracking, badges, quiz scoring
                        03i_user_profile    Account state, profile modal, role switcher
                        03j_charts          Zero-dependency inline SVG visual analytics
                                            (Waterfall, Kraljic, Pareto, Altman Z-Score)
                        04a..04d_*          Router, navigation trees, render helpers
                        05a..05d_*          Calculator forms, validation, result formatters
                        06a..06d_*          Action controllers, templates, backup archives
                        07a..07b_*          Boot lifecycle and global event wiring
                        90_normalize.js     Content normalization and alias resolution

  pages/                Page View Controllers & Renderers
                        08a1..08a3_*        Command Center landing page and dual-hub portal
                        08b1..08b6_*        SOP, checklist, template, decision, and KPI pages
                        08c1..08c6_*        Dashboards, lifecycle map, Operations Hub gateway
                        08e1_pages_backup   Workspace Data Footprint and JSON archive manager
                        08f1_pages_help     Architecture, IT compliance, and user guides
                        08g1_pages_academy  Academy curriculum, 5-tab pedagogy, sandboxes
                        08g2_pages_quiz_engine Adaptive assessments and tactical advisor tips
                        08g3_pages_certificate Tamper-evident completion certificates

  content/              Controlled Knowledge Libraries
                        09*..18*            Concepts, SOPs, checklists, templates, KPIs
                        19a..19c_*          16 Academy digital procurement competency modules

  calcs/                Financial & Operational Calculators
                        20*..38*            19 paired calculator definitions and math algorithms
                                            (TCO, Should-Cost, Incoterms, Altman Z-Score, etc.)
```

## Architectural Rules

1. **Strict Execution Order**: Fragments execute in a shared single-script scope (`PS.*`). An individual fragment can only consume abstractions defined in preceding files. The sequence defined in `src/manifest.txt` governs the compilation order.
2. **Single-Purpose Fragments**: Maintain small, focused files corresponding to distinct components, libraries, or action controllers.
3. **Zero Dash Compliance**: Never introduce em dashes or en dashes into copy or source code. Use standard hyphens, colons, or commas.
4. **Validation Protocol**: After editing source fragments, run:
   * `node build.mjs` to assemble and perform AST syntax validation.
   * `node tools/smoke.mjs` to execute headless DOM tests across all 59 application routes.
   * `node tools/check_rels.mjs` to verify cross-reference relational integrity.
