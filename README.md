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

The app is assembled from small source fragments in `build/`, concatenated in filename order:

```powershell
# Windows PowerShell - assembles and validates in one step:
.\assemble.ps1
# -> writes ProcureSherpa-v2.0.html and runs syntax + content validation

# validate an existing build only:
node validate.mjs ProcureSherpa-v2.0.html
```

### Repository layout

```
ProcureSherpa-v2.0.html     <- the app (the only file you need to distribute)
Procure_Sherpa_v2_Master_Requirements.md   <- functional requirements / spec
assemble.ps1                <- build: concatenate build/* -> single HTML, then validate
validate.mjs                <- checks: JS syntax, page skeleton, route/action counts
build/                      <- source fragments, concatenated in filename order
  01*-02*                   <- head, CSS, shell markup
  03*-07*                   <- utils, storage, search, router, nav, calc engine, boot
  08*                       <- page renderers (home, lists, help, settings, ...)
  09*-18*                   <- content: concepts, SOPs, checklists, templates,
                               decisions, KPIs, glossary, scenarios, help
  20*-28*                   <- calculators (definition + implementation pairs)
tools/                      <- development utilities
  convert_v1.mjs            <- converts the v1.1.0 content libraries into v2 fragments
  check_rels.mjs            <- verifies every cross-reference (rel) resolves
```

### Editing content

- Add or edit entries with the registration helpers (`PS.SKB(`, `PS.SSOP(`, `PS.SCL(`, `PS.STPL(`, `PS.SDEC(`, `PS.SKPI(`, `PS.SGLS(`, `PS.SSCN(`) in the matching `build/1x_*.js` fragment, then re-run `assemble.ps1`.
- After content changes, run `node tools/check_rels.mjs` - it lists any cross-reference that points at an id that does not exist.

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| Saved work disappeared | Browser data was cleared, or you switched browser/machine. Restore from your Backup JSON. |
| "Storage full" or saves fail | `localStorage` is ~5 MB. Remove old saved analyses in Workspace, or export a backup then clear. |
| App looks unstyled / blank | Old browser (needs a 2018+ evergreen browser) or the file was truncated in transfer - re-download it. |
| Opened on another machine, nothing saved | That is by design - storage is per browser. Export backup, import on the other machine. |
| Double-click does nothing on a locked-down PC | Use Option 2 (local server) or Option 3 (GitHub Pages). |

## Status / roadmap

Working today: shell + navigation + search, 9 calculators (quotes, landed cost, should-cost, TCO, negotiation savings, price increase, escalation, payment terms, PO value check), knowledge base, SOPs, checklists, templates, KPIs, glossary, scenario guides, decision-center routing, backup/restore, print/PDF reports.

In progress (see `Procure_Sherpa_v2_Master_Requirements.md`): remaining calculators (MOQ, make-vs-buy, supplier scorecard, concentration, budget-vs-actual, savings analysis, multi-year contract, FX, tax), decision guides, maturity model, lifecycle map.

---

*Procure Sherpa is a guidance and analysis tool. Numbers it produces are only as good as the inputs - validate before you commit spend. It does not replace your organisation's procurement policy.*
