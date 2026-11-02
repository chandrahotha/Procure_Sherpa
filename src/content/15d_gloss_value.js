/* ==========================================================
   Procure Sherpa v2.7 - Glossary additions: the financial
   vocabulary the Academy lessons assume. EBITDA, working
   capital, cost-to-serve and run-rate were named in the
   lessons and the KPI library but had no entry, so a learner
   meeting them in a board-level module had nowhere to look.
   These carry relations, so they render the full
   "Where to use it" column.
   ========================================================== */

PS.SGLS({ i: "gloss-ebitda", t: "EBITDA", d: "Earnings Before Interest, Taxes, Depreciation and Amortisation. The operating profit measure a business is most often valued and managed on, and therefore the number a procurement case travels in: a price cut lands in it directly, a working-capital change usually does not.",
  rel: { concepts: ["procurement-value", "savings-types", "price-vs-cost"], calcs: ["calc-savings-analysis"], kpis: ["kpi-savings", "kpi-roi"] } });
PS.SGLS({ i: "gloss-working-capital", t: "Working capital", d: "Current assets less current liabilities - the cash tied up in inventory, receivables and prepayments against what is owed to suppliers. Payment terms, consignment stock and fewer emergency buys move it without touching unit price, which is why a saving claim expressed only in EBITDA understates what procurement did.",
  rel: { concepts: ["working-capital", "procurement-value"], calcs: ["calc-payment-terms"], kpis: ["kpi-working-capital-impact"], templates: ["tpl-business-case"] } });
PS.SGLS({ i: "gloss-cost-to-serve", t: "Cost-to-serve", d: "The internal cost of processing a transaction, independent of what the goods cost: requisition handling, approval, PO issue, receipt, matching, dispute and payment. Estimating it per purchase order is what turns a high-volume tail into a business case for a catalogue or a call-off.",
  rel: { concepts: ["c-procurement-savings", "savings-types"], calcs: ["calc-kpi-calculator", "calc-po-value-check"], kpis: ["kpi-cycle-time", "kpi-maverick-spend"], sops: ["sop-procurement-lifecycle"] } });
PS.SGLS({ i: "gloss-run-rate", t: "Run-rate vs one-off saving", d: "A run-rate saving repeats every period at the new price or the new consumption level; a one-off saves once and disappears from the comparison. Banking a one-off as a run rate is the most common way a savings report becomes impossible to reproduce the following year.",
  rel: { concepts: ["savings-baseline", "savings-realization", "cost-avoidance"], calcs: ["calc-multi-year-contract-cost", "calc-savings-analysis"], kpis: ["kpi-savings-realization"], sops: ["sop-savings-calculation"] } });
