# ADR 0006 — Layout, navigation and component system

**Status:** Accepted  
**Date:** 2026-11-04  
**Supersedes:** part of ADR 0004 (institucional visual identity)

## Context

The Procure Sherpa UI reads as an institutional portal, not a modern procurement intelligence platform. The home page mixes emoji decorations, inconsistent pill styles, and mixed heading grammars. Pages hand-roll cards, stats, notes and pills with inline styles so hierarchy drifts screen to screen.

Sherpa already has:
- A token system in `src/base/01a_head.html` (single source of truth).
- An institutional layer in `src/base/01n_design_system.css`.
- Reusable component shapes in `src/ui/01_render_helpers.js` and `src/ui/02_components.js`.
- One sidebar, one nav data source (`PS.NAV_UNIFIED`), scoped by the profile track.
- Real Procure Sherpa content: Academy curriculum, SOPs, checklists, templates, calculators, KPIs, glossary, workbenches, saved work.

The design direction for the revamp follows Project360-style enterprise learning products (information density over atmosphere, rectangular "control" geometry, borders-first separation, system type stack, tabular numerals, single nav registry, breadcrumb shell) implemented entirely in Sherpa's own code.

## Decision

**Adopt the Project360-style enterprise grammar inside Sherpa's fragment architecture and tokens: control geometry, flat panels, border-first separation, tabular numerals, stroke icons, and a consistent shell.**

Concretely:

- **Radius / geometry:** menus, cards, chips, buttons use 2–6px flat terminals ("control" geometry). `border-radius: 6px` for cards, `4px` menus, `0` sharp corners. Borders and spacing separate; shadows do not (minimal `var(--sh)` only).
- **Typography:** system-ui stack (already). Tabular numerals by default in every numeric cell / stat. Type scale stays token-driven (`--scale-1`…`--scale-7`).
- **Components (in `src/ui/`):** `panel`, `pageHeader`, `toneBadge`, `icon` (inline stroke SVGs built in code so nothing is fetched), `stat`, `statGrid`, `note`, `btnRow`, `empty`, `tile`, `badge`, `card`, `cardHead`. These replace hand-rolled markup screen by screen.
- **Navigation:** keep the single sidebar + single nav data source. Group labels ("Start / Learn / Workbench / Toolkit / Library / Look It Up / My Work") already exist. Adopt the shell grammar: brand mark, filter, section tree, Learn/Work track switch, footer system strip. Breadcrumb under the topbar, profile + theme + favorites in the topbar, search in the topbar.
- **Colours:** jade accent (`#0f6e5c`) remains the brand. Amber = warning, emerald/green = success, tone badges for status, tinted backgrounds at 12% over the surface. Both themes first-class; no inline colour escapes tokens (G29).
- **Icons:** small inline SVG glyphs in `PS.TYPE_META` / `PS.ui.icon` — small 24px strokes, `1.9` or `1.7` width, built with `<path>` elements. No emoji on UI chrome (kept only where real content already contains them).
- **Density:** compact paddings, tight `space-2`/`space-3` gaps inside panels, generous page padding. Tables use numeric alignment + tabular-nums.

## What does NOT change

- All text content (every label, description, stat, hint, disclaimer) is preserved verbatim. Rewording is a content change, not a design change, and is out of scope.
- All routes, data, calculators, workbench logic, quiz/exam logic and storage keys are unchanged.
- No new runtime dependencies. No external fonts, CDNs, or fetch calls (CSP `connect-src 'none'`).

## Options considered

**A. Adopt Project360's Next.js/Tailwind/shadcn stack wholesale.** Rejected: breaks offline single-file distribution, adds a server and runtime dependencies, and contradicts ADR 0003/0005.

**B. Adopt a component library (Radix, Headless UI).** Rejected: same runtime dependency cost, and its styling fights the institutional voice.

**C. Incremental adoption in Sherpa's own code (chosen).** The fragment build already provides separation; the tokens already exist. This ADR adds grammar + components on top, page by page, with QA after each.

## Consequences

- One visual language across every screen: rectangular control geometry, border-first separation, tabular numerals, stroke icons.
- Every screen builds through `src/ui/`; a design change lands once.
- Light + dark parity is asserted by G29 and the a11y gate.
