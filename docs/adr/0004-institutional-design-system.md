# ADR 0004 — Institutional design system: the Sherpa academy identity

**Status:** Accepted  
**Date:** 2026-11-04  
**Supersedes:** none (extends the v3 token layer in `01a_head.html` and `01n_design_system.css`)

## Context

The master goal requires Sherpa to communicate academic excellence, credibility, intellectual ambition, professional development, global relevance, organisational maturity and innovation — to feel like a serious academy, not a generic LMS template. Every screen must feel intentional, cohesive and professionally art-directed, on desktop, tablet and mobile, meeting accessibility and usability standards.

The repository already carries a v3 design system: a warm-neutral canvas, white paper surfaces, one jade accent (`#0f6e5c`), a dark navigation rail that reads as furniture in both themes, serif reading type for long prose, a spacing scale (`--space-1`…`--space-8`), border radius tokens, and three curriculum altitudes (Foundation / Practitioner / Executive) each with its own colour. `01n_design_system.css` adds the institutional layer (`inst-card`, `inst-title`, `inst-eyebrow`, `inst-btn`, `inst-badge`, `inst-grid`, `inst-read`) and the reusable component shapes were just extracted into `src/ui/01_render_helpers.js` and `src/ui/02_components.js`.

What is missing is consistent application: several pages still hand-roll cards, stats, notes and pills, which is where visual drift and inconsistent hierarchy enter.

## Decision

**Establish the existing v3 token layer as the single source of truth for the institutional design system and apply it to every major screen.**

- Tokens are declared once in `src/base/01a_head.html`; `01n_design_system.css` extends them (never redeclares). No third token source.
- One accent (jade) plus semantic state colours (ok/warn/danger/info) and one colour per curriculum altitude. Colour marks meaning, never decoration.
- Typography: sans-serif system stack for UI chrome; serif reading face (`--font-read`) for lesson prose and headlines; a capped reading measure (`--measure: 74ch`) and a page max width (`--page-max: 1440px`).
- Components: `card`, `cardHead`, `stat`, `statGrid`, `note`, `btnRow`, `sectionHead`, `tierPill`, `startPill`, `empty`, `tile`, `badge` live in `src/ui/` and return markup. Every screen builds through them.
- Buttons min-height 44px, visible focus outlines (`--focus-outline`), theme-aware hover states — WCAG 2.1 keyboard focus and contrast respected in both themes.
- Responsive: the sidebar collapses to a scrollable rail on mobile; grids use `auto-fit`/`minmax`; the reading measure caps line length on wide screens.
- Light and dark themes are first-class: every token has a dark equivalent, charts resolve palettes from the theme at render time, and no inline colour escapes the theme tokens (asserted by G29).

## Options considered

**A. Adopt a component library (e.g. Radix, Headless UI).** Rejected: adds runtime dependencies and a bundler, breaks the zero-runtime-dependency and offline-single-file premises, and imports styling decisions that conflict with the institutional voice.

**B. Invent a second design system alongside the v3 tokens.** Rejected: two sources of truth for one token is how a design system stops being one (the rule already enforced in `01n_design_system.css`).

**C. Apply the v3 system only to new screens.** Rejected: that leaves the old screens drifting and the product feeling inconsistent. Existing screens are migrated incrementally, one journey at a time, with QA after each.

## Consequences

- Every screen shares one heading style, one card shape, one stat layout, one button family — the platform reads as a single institution.
- Visual changes land in one place (`src/ui/` + tokens) and propagate to all screens.
- Accessibility (focus outline, colour contrast, theme parity) is asserted by the existing `a11y_audit.mjs` gate (G29) and runs on every build.
