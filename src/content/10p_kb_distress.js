/* ==========================================================
   Procure Sherpa v3.0 - Knowledge additions: Supplier Distress
   and Recovery. The library assessed a supplier financially at
   onboarding (Module 4) and covered payment economics (Module
   19), but nothing covered the period after the assessment while
   the contract is live: the signals, the ladder of response, and
   what an insolvency will and will not give back. Added with
   Academy Module 24.
   ========================================================== */

PS.SKB({ i: "supplier-distress-signals", t: "Financial distress signals a buyer can see", c: "Supplier Distress and Recovery",
  d: "The observable changes in a supplier conduct that precede a financial failure: delivery drift without cause, stale quotations, stretched lead times, requests to move payment terms in the supplier favour, and complaints from businesses further down the tier.",
  w: "Arrives months before filed accounts or credit grades can show anything;Is information the buyer already generates for other reasons, so it costs nothing to collect",
  n: "Reviewing any single-source or concentrated line;Interpreting a request to change terms;Before extending a term or increasing exposure;When two unrelated suppliers in one category drift in the same quarter",
  h: "Track the series rather than the incident;Ask for documents against plan, backlog cover and facility expiry;Treat an confident answer with no evidence as a signal;Escalate a cluster of two or more as one risk item",
  e: "A supplier OTIF slipped, two quotations went unanswered and it asked for payment on delivery within one quarter; the credit grade, derived from accounts ten months old, still read sound when it ceased trading six weeks later.",
  r: "Each signal has an innocent explanation on its own, which is why clusters matter;Acting on a single signal can damage a healthy supplier relationship",
  m: "Handling each symptom with a different colleague so no pattern forms;Waiting for financial confirmation before doing readiness work, when the financial data is the slowest source available",
  rel: { concepts: ["supplier-financial-risk", "early-warning-ladder", "supplier-performance", "concentration-risk"],
         sops: ["sop-supplier-performance-management", "sop-supplier-due-diligence"],
         checklists: ["cl-supplier-risk-review", "cl-supplier-performance-review"],
         templates: ["tpl-supplier-risk-assessment"],
         calcs: ["calc-supplier-concentration"],
         decisions: ["dec-supplier-financial-risk"],
         kpis: ["kpi-otif", "kpi-supplier-concentration"],
         glossary: ["gloss-sla", "gloss-run-rate"] } });

PS.SKB({ i: "early-warning-ladder", t: "The ladder of contingency response", c: "Supplier Distress and Recovery",
  d: "A pre-agreed sequence of responses to a warning - factual enquiry, scheduled evidence, asset protection, commercial measures, activation of the alternative, and finally exit - each with named actions and dates.",
  w: "Converts a soft signal into a dated action, so the option exists before the failure;Removes the improvisation that turns a warning into an eleven-month surprise",
  n: "Designing supplier risk process for a category;When a signal cluster appears;At the annual review of a line whose substitution path exceeds the notice period;Before a launch or peak where a break would be customer-visible",
  h: "Define what counts as a cluster and what it opens automatically;Attach an action, an owner and a date to every rung;Record who deferred a step and why;Fund the first step of the alternative at signal stage on long-path lines",
  e: "A category with a nine-month requalification path set a rule that two concurrent signals open a numbered risk and authorise a trial order at a second source; the rule paid for itself at the third use.",
  r: "A ladder that ends in exit without a viability test wastes recoverable suppliers;Preparation looks like waste while nothing is wrong, which is exactly when it must be funded",
  m: "Replacing the ladder with one informal enquiry;Starting with the commercial lever you know best, usually terms, without deciding whether it helps or harms",
  rel: { concepts: ["business-continuity", "supply-chain-risk", "step-in-and-contingency", "supplier-distress-signals"],
         sops: ["sop-supplier-corrective-action", "sop-supplier-performance-management"],
         checklists: ["cl-supplier-risk-review", "cl-supplier-performance-review"],
         templates: ["tpl-supplier-risk-assessment", "tpl-business-case"],
         calcs: ["calc-supplier-concentration", "calc-multi-year-contract-cost"],
         decisions: ["dec-dual-source", "dec-supplier-financial-risk"],
         kpis: ["kpi-otif", "kpi-contract-compliance"],
         glossary: ["gloss-sla", "gloss-single-source"] } });

PS.SKB({ i: "step-in-and-contingency", t: "Step-in rights, tooling and the assets on another site", c: "Supplier Distress and Recovery",
  d: "The contractual and practical means of taking over production or recovering assets from a supplier site: step-in rights, tooling ownership records, consigned stock, work in progress made from buyer materials, and access arrangements.",
  w: "Continuity in a failure is usually decided by access to physical things rather than by the contract termination clause;A step-in right without a trained team, a data route and a logistically possible transfer is text, not an option",
  n: "Any line with buyer-funded tooling or fixtures;Where a supplier holds your consigned stock or materials;Before agreeing to place assets with a supplier of thin substance;Designing continuity for a single-source line",
  h: "Document ownership, mark and inventory the assets;Agree access, insurance and a recovery route and test one of them;Keep the step-in mechanics realistic: who goes, with what authority, to recover what;Register security where an advance funds assets",
  e: "A buyer recovered tooling within nine days because the asset register, markings and a site access agreement existed and had been tested once; the parallel recovery on an undocumented line took a year and a legal process.",
  r: "Assets without an ownership record may be treated as part of the estate;A step-in exercised without capability can convert a supplier failure into an operator failure",
  m: "Assuming paid-for means owned once the supplier has maintained the tool;Negotiating a step-in clause and never writing the operational plan that makes it usable",
  rel: { concepts: ["insolvency-claims-ranking", "early-warning-ladder", "audit-trail", "supplier-development"],
         sops: ["sop-contract-review", "sop-supplier-exit", "sop-documentation"],
         checklists: ["cl-contract-review", "cl-procurement-file-completeness"],
         templates: ["tpl-contract-review-checklist", "tpl-supplier-risk-assessment"],
         calcs: [],
         decisions: ["dec-make-or-buy", "dec-re-source"],
         kpis: ["kpi-contract-compliance"],
         glossary: ["gloss-change-order", "gloss-capex"] } });

PS.SKB({ i: "insolvency-claims-ranking", t: "What an insolvency returns to a buyer", c: "Supplier Distress and Recovery",
  d: "The statutory order in which an estate pays: process costs, defined employee claims, secured and preferential classes, then ordinary unsecured claims such as most buyer advances - and the evidential requirements for recovering goods rather than money.",
  w: "Determines whether an advance is a loss or a claim, and whether consigned goods are recoverable;Sets the deadline discipline, because a missed claims date converts a position into a write-off",
  n: "When a supplier enters any formal process;Before making an advance or placing assets;When deciding whether to buy insurance or require a bond;Reporting a supply failure exposure to a board",
  h: "Ask counsel about ranking and process dates in week one;Identify and document your goods;Register security at the time of the advance;Model recovery as percentages arriving on dates, not as a face value",
  e: "An advance written off at full value produced a small distribution two years later; the claims deadline had been missed, no security was registered, and the goods identification file could not be assembled.",
  r: "Ranking and identification, not fairness, decide the outcome;A retention of title clause fails where the goods cannot be separated from stock",
  m: "Believing termination cancels exposure;Netting an optimistic dividend against a loss for reporting purposes",
  rel: { concepts: ["liability-indemnity", "step-in-and-contingency", "rescue-or-replace", "audit-trail"],
         sops: ["sop-supplier-exit", "sop-contract-review"],
         checklists: ["cl-contract-review", "cl-supplier-due-diligence"],
         templates: ["tpl-contract-review-checklist", "tpl-supplier-due-diligence"],
         calcs: ["calc-payment-terms"],
         decisions: ["dec-supplier-financial-risk"],
         kpis: ["kpi-contract-compliance"],
         glossary: ["gloss-ppv", "gloss-change-order"] } });

PS.SKB({ i: "rescue-or-replace", t: "The rescue or replace decision", c: "Supplier Distress and Recovery",
  d: "The deliberate executive choice between supporting a distressed supplier - bounded, secured, evidenced - and moving the line, taken against the substitution path and the viability of the supplier core rather than by default.",
  w: "Both answers are defensible and an unowned drift between them is not;The choice determines whether the organisation funds readiness or absorbs a failure",
  n: "On disclosure of a financing problem;Before a distress discount and an advance are accepted;When a change of control may follow insolvency;At the review of any line where switching takes more than a quarter",
  h: "Compare substitution cost and elapsed time against the recovery prospects;Bound the exposure and secure it before supporting anything;Maintain the second-source work even when the term looks fixed;Minute the decision, the approver and the revisit date",
  e: "A 9 percent exclusive term offered by a distressed supplier was accepted with security and staged funding while the second-source qualification continued; the supplier recovered in eighteen months and the alternative stayed at trial volume.",
  r: "Support can escalate exposure into a sinking position; replacement can be more expensive than the failure it avoids on a long-path line",
  m: "Buying a distress discount with unsecured credit exposure;Deciding by default through a sequence of operational steps nobody owned",
  rel: { concepts: ["insolvency-claims-ranking", "early-warning-ladder", "supply-chain-risk", "concentration-risk", "framework-agreement"],
         sops: ["sop-supplier-exit", "sop-sourcing-strategy", "sop-supplier-performance-management"],
         checklists: ["cl-supplier-risk-review", "cl-sourcing-strategy", "cl-single-source-justification"],
         templates: ["tpl-business-case", "tpl-single-source"],
         calcs: ["calc-supplier-concentration", "calc-make-vs-buy"],
         decisions: ["dec-dual-source", "dec-supplier-financial-risk"],
         kpis: ["kpi-supplier-concentration", "kpi-cost-avoidance"],
         glossary: ["gloss-hhi", "gloss-sole-source"] } });
