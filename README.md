# Procure Sherpa v2.0

A complete, **offline, single-file procurement toolkit** — knowledge base, SOPs, checklists, templates, calculators, decision guides, KPIs and scenario guides in one HTML file. No install, no server, no internet connection, no account. Your data never leaves your browser.

---

## 🚀 How to start the application

### Option 1 — Just open it (simplest)
1. Download or locate **`ProcureSherpa-v2.0.html`** (the built app, in the repo root).
2. **Double-click it.** It opens in your default browser (Chrome, Edge, Firefox — desktop or mobile) and works immediately.

That's it. The file is the application. Everything — logic, styling, content — is inside that one file.

### Option 2 — Serve it locally (recommended for daily use)
```bash
# from the repo root — pick whichever you have:
python -m http.server 8080
#   then open  http://localhost:8080/ProcureSherpa-v2.0.html

npx serve .
```

Serving instead of double-clicking gives you a stable URL, and avoids any browser
restrictions on `file://` pages (see Troubleshooting).

### Option 3 — GitHub Pages (share it with your team)
1. In the GitHub repo: **Settings → Pages → Branch: `main` → Save.**
2. After ~1 minute the app is live at `https://chandrahotha.github.io/Procure_Sherpa/ProcureSherpa-v2.0.html`.
3. Anyone with the link can use it; they can also save the page itself for offline use.

### Option 4 — Carry it with you
Copy `ProcureSherpa-v2.0.html` to a USB stick. It runs from any machine with a browser — useful on shop-floor PCs or locked-down laptops with no internet.

> **First visit?** Open the in-app **Quick Start** page (sidebar → Quick Start). It walks you through the eight steps from "I have a problem" to "I have a documented decision".

---

## What's inside

| Area | What you get |
|---|---|
| **Knowledge Hub** | ~70 procurement concepts — definition, why it matters, when used, process, example, risks, common mistakes |
| **SOP Center** | Standard operating procedures with purpose, steps, decision points, controls, records, KPIs and an embedded working checklist |
| **Decision Center** | "What should I do?" — describe your situation, get routed to the right SOP, checklist, calculator and template; plus structured decision guides |
| **Toolkit** | Calculators: quote comparison, landed cost, should-cost, TCO, negotiation savings, price increase/escalation, payment terms, PO approval check, and more. Every one shows its formula, assumptions and interpretation |
| **Checklists** | Operational checklists with saved progress and per-item notes |
| **Templates** | Fill-in forms for RFQ, RFP, evaluation, negotiation plan, award recommendation, business case and more — printable |
| **KPI Center** | KPI definitions, formulas, worked examples, interpretation guidance |
| **Workspace** | Saved analyses, favorites, recently used, full backup/restore — all local |

## How your data works (privacy)

- **Everything is stored in your browser's `localStorage`** on your machine. Nothing is sent anywhere - the app makes **zero network requests** after it is loaded.
- Saved work is keyed to **this browser + this machine**. Clearing browser data deletes it.
- Use **Backup / Restore** (sidebar) to export a JSON file and move your work between machines or browsers. Do this regularly if you rely on saved work.

## Rebuilding / developing

This is a **multi-file source project**. The app is assembled from small
source fragments in `src/` (see `src/README.md` for the folder guide and
`src/manifest.txt` for the exact build order) into the single-file app:

```powershell
# Windows PowerShell - assembles and validates in one step:
.\assemble.ps1
# (identical to: npm run build)

# validate an existing build only:
node validate.mjs ProcureSherpa-v2.0.html
# or: npm run validate

# headless route smoke test (requires jsdom):
npm run smoke
```

`ProcureSherpa-v2.0.html` is a **generated release artifact** — never edit
it directly. Always edit the fragment in `src/` and rebuild.

### Repository layout

```
ProcureSherpa-v2.0.html     <- the app (generated; the only file you need to distribute)
Procure_Sherpa_v2_Master_Requirements.md   <- functional requirements / spec
assemble.ps1                <- thin wrapper around the Node builder
build.mjs                   <- the builder: src/manifest.txt -> single HTML, then validate
validate.mjs                <- checks: JS syntax, page skeleton, route/action counts
src/                        <- Source of truth (multi-file project)
  manifest.txt              <- explicit build order, one fragment path per line
  base/                     <- document shell + design system (tokens, CSS, shell markup)
  core/                     <- application engine (utils, storage, search, router,
                               nav, calc engine, actions, boot)
  pages/                    <- page renderers (home, lists, help, settings, ...)
  content/                  <- knowledge libraries (concepts, SOPs, checklists,
                               templates, decisions, KPIs, glossary, scenarios, help)
  calcs/                    <- calculators (definition + implementation pairs)
tools/                      <- development utilities
  lib.mjs                   <- shared repo-path helpers (no hardcoded paths)
  convert_v1.mjs            <- converts the v1.1.0 content libraries into v2 fragments
  check_rels.mjs            <- verifies every cross-reference (rel) resolves (npm run check:rels)
  smoke.mjs                 <- headless route test over the built app (npm run smoke)
```

### Editing content

- Add or edit entries with the registration helpers (`PS.SKB(`, `PS.SSOP(`, `PS.SCL(`, `PS.STPL(`, `PS.SDEC(`, `PS.SKPI(`, `PS.SGLS(`, `PS.SSCN(`) in the matching `src/content/*.js` fragment, then re-run `npm run build`.
- To add a new fragment: create it in the right `src/` subfolder, add one line to `src/manifest.txt` at the correct position (order matters — fragments share one scope), then rebuild.
- After content changes, run `npm run check:rels` - it lists any cross-reference that points at an id that does not exist.

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| Saved work disappeared | Browser data was cleared, or you switched browser/machine. Restore from your Backup JSON. |
| "Storage full" or saves fail | `localStorage` is ~5 MB. Remove old saved analyses in Workspace, or export a backup then clear. |
| App looks unstyled / blank | Old browser (needs a 2018+ evergreen browser) or the file was truncated in transfer - re-download it. |
| Opened on another machine, nothing saved | That is by design - storage is per browser. Export backup, import on the other machine. |
| Double-click does nothing on a locked-down PC | Use Option 2 (local server) or Option 3 (GitHub Pages). |

## Status / roadmap

Working today: shell + navigation + search, 19 calculators (quotes, landed cost, should-cost, TCO, negotiation savings, price increase, escalation, payment terms, PO value check, MOQ, make-vs-buy, supplier scorecard, concentration/HHI, budget-vs-actual, savings analysis, multi-year contract, tax, FX, KPI quick calc), knowledge base, SOPs, checklists, templates, KPIs, glossary, scenario guides, decision-center routing, backup/restore, print/PDF reports.

In progress (see `Procure_Sherpa_v2_Master_Requirements.md`): extended SOP library (13 of ~50 written to controlled-document standard), knowledge-base depth review, template confirmation prompts on older forms (done), decision-guide descriptions.

---

*Procure Sherpa is a guidance and analysis tool. Numbers it produces are only as good as the inputs - validate before you commit spend. It does not replace your organisation's procurement policy.*
