# Source layout

This is a **multi-file project**. The single `ProcureSherpa-v2.0.html` at the
repo root is a **generated release artifact** — never edit it directly.
Edit files here, then run `npm run build` (or `.\assemble.ps1`).

```
src/
  manifest.txt   <- explicit build order (one fragment path per line).
                    The builder concatenates exactly these files, in this
                    order. To add a fragment: create the file in the right
                    folder, then insert one line in manifest.txt.
  base/          <- document shell + design system
                    01a_head.html      design tokens (:root variables)
                    01b..01g_*.css    reset, layout, components, forms,
                                       results, responsive/print
                    02_shell.html      sidebar / topbar / footer markup
                    99_tail.html       closing tags
  core/          <- application engine (no content)
                    03*  utils, safe I/O, store, prefs, saved work,
                         registry, search
                    04*  router, navigation, render helpers, list pages
                    05*  calculator engine (forms, validation, results)
                    06*  actions (calc, UI, templates, decisions,
                         saved work, backup/restore, settings)
                    07*  boot + event wiring
                    90_normalize.js    content normalisation at load
  pages/         <- page renderers (08*): home, knowledge, SOP,
                    checklists, templates, decisions, KPIs, scenarios,
                    search, "what should I do", dashboards, saved work,
                    backup, settings, help, maturity
  content/       <- knowledge libraries (09*..18*): concepts, SOPs,
                    checklists, templates, decisions, glossary,
                    scenarios, KPIs, help topics
  calcs/         <- calculators (20*..28*): definition + implementation
                    pairs, e.g. 20a_calc_compare_quotes.js (metadata)
                    + 20b_calcimpl_compare_quotes.js (math)
```

## Rules

1. **Order matters.** Fragments share one global (`PS.*`) and one
   `<script>` scope — a file can only use what earlier files defined.
   `manifest.txt` is the order; filename prefixes (`01a`, `03d1`, …)
   are just a human aid, not the mechanism.
2. **Keep fragments small and single-purpose.** One concern per file,
   matching the existing naming.
3. **After any change:** `npm run build` (assembles + syntax-checks +
   validates). Optionally `npm run smoke` for a headless route test
   and `npm run check:rels` after content edits.
