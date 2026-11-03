/* ==========================================================
   Procure Sherpa v3.0 - SOP addition: Sustainable Sourcing
   Verification and Supplier Impact. The library had supplier
   due diligence and performance review, and nothing that
   governs an environmental or social claim: what evidence
   makes it acceptable, who checks the boundary, what happens
   when a figure arrives without a method, and how an impact
   commitment is tracked after award.
   Step format: Title|instruction|role=,out=,ctrl= separated
   by ';', so no semicolon, no pipe and no apostrophe may
   appear inside a step.
   ========================================================== */

PS.SSOP({
  i: "sop-sustainable-sourcing-verification",
  t: "Sustainable Sourcing Verification and Supplier Impact SOP",
  c: "Governance and controls",
  v: "1.0",
  ow: "Head of Procurement, jointly with the Sustainability Lead and Category Managers",
  rv: "Annual, and immediately after a failed verification, a withdrawn claim or a labour finding",
  p: "Ensure that every environmental or social claim relied on in a sourcing decision is checked against evidence with a stated boundary, method and year, and that commitments made at award are tracked, evidenced and remediated rather than filed.",
  s: "Any award, specification or renewal where a carbon, recycled content, circular, labour, living wage or social value claim affects scoring, and any supplier impact commitment written into a contract.",
  os: "Claims made in a supplier marketing document that no buyer relies on. Corporate sustainability reporting, which belongs to the sustainability function. Regulated product claims verified by the market authority rather than by procurement.",
  g: "A bid, specification change or renewal that cites an environmental or social attribute as a reason to prefer it.",
  ro: "Category Manager, Sustainability Lead, Supplier, Contract Manager, Internal Audit, Requirement Owner",
  ra: "Category Manager: raises the verification request and owns the decision to accept or reject a claim;Sustainability Lead: sets the evidence standard and reviews boundary and method;Supplier: provides figures with scope, year and assurance level;Contract Manager: writes the commitment into obligations with a clock and a remedy;Internal Audit: samples accepted claims against the evidence held;Requirement Owner: defines the outcome and the units so two bids are comparable",
  fq: "Every claim relied on in scoring, and every impact commitment at award, which in an active category is a steady weekly flow rather than an exception.",
  du: "Three working days to a verification decision for a figure already held, and five for a claim needing new evidence from the supplier.",
  fl: "Capture the claim and the decision it affects|Name the boundary and the standard|Request the figure with method and year|Score only against verified evidence|Write the commitment with a clock and a remedy|Track delivery and let the score decay|Remediate a finding with a plan and a date|Sample the file and report the pass rate",
  st: "Capture the claim and the decision it affects|Record the exact wording of the claim, the category, the award or renewal it supports and who is relying on it. A claim that is not attached to a decision is marketing and is handled as marketing.|role=Category Manager,out=Claim register entry naming the decision,ctrl=No claim enters an evaluation record without a named relying decision and a source document;Name the boundary and the standard before asking for data|State which of the four questions the evidence must answer: which site, which product, which year and which standard. A certificate covering a group is not evidence about a plant, and a facility certificate is not evidence about a product.|role=Sustainability Lead,out=Boundary statement with the accepted standard named,ctrl=Claims that cannot state a boundary are recorded as unverified rather than discounted at the evaluators discretion;Request the figure with method, year and assurance level|Ask for the number, the method behind it, whether it is measured, estimated or proxy, the reporting year and whether any third party attested it. Where a figure is a spend-based proxy, record that it is a proxy and what would move it to physical data.|role=Supplier,out=Evidence pack with figure, method, year and assurance level,ctrl=A figure without a method and a year cannot carry scoring weight regardless of how credible the supplier is;Score only against verified evidence in the published rubric|Apply the rubric as published before bids opened. A band is earned by evidence and the reason for the band is written down, so a challenge can be answered with the record rather than with opinion.|role=Category Manager,out=Score sheet with the reason for each band,ctrl=Weighting is never changed after bids open, and an unevidenced promise scores in the lowest band;Convert the award into obligations with a clock|Write each commitment into the contract with a unit, a period, an evidence requirement and a named owner on both sides, and define what a missed delivery triggers. A promise with no clock is a paragraph, not an obligation.|role=Contract Manager,out=Contract schedule with units, evidence and remedies,ctrl=No impact commitment is accepted into performance management without a defined evidence format and remedy;Track delivery and let an unrefreshed score decay|Collect evidence on the agreed cycle and mark every figure with its year. A stale or absent return decays the sustainability element of the scorecard on a published rule rather than leaving last years number standing.|role=Supplier,out=Periodic impact return with dated figures,ctrl=A score that has not refreshed within the defined window cannot be presented as current in any report;Remediate a finding with a plan and a date|Where a claim fails or a labour finding appears, define the corrective action, the owner, the verification method and the date, and keep the relationship long enough to prove the fix. Withdrawal is a remedy of last resort and is recorded with the reason.|role=Category Manager,out=Corrective action plan with verification date and outcome,ctrl=Remediation is verified by evidence rather than by a renewed assurance letter;Sample the accepted claims and report the pass rate|Audit a fixed sample of accepted claims each period, checking the evidence file rather than the summary, and publish the pass rate with the failures named by category. A file without the underlying evidence counts as a failure.|role=Internal Audit,out=Sample result with pass rate and named exceptions,ctrl=A missing evidence pack is treated as a control failure even where the claim later proved true, because the record is the only proof the check ran",
  ip: "Bid or renewal citing a claim, Existing supplier figures, Certification scope documents, Contract schedules, Performance scorecard data, Prior remediation notes",
  ot: "Verified claim record with boundary and method, Scored evaluation sheet with band reasons, Contract obligation schedule, Periodic impact returns, Remediation plans with outcomes, Audit sample result and pass rate",
  dc: "Boundary|The site, product and year a figure actually covers, Method|Measured, estimated or proxy, and recorded as such, Clock|Every commitment carries a period and an evidence date, Decay|An unrefreshed score cannot be presented as current",
  ct: "Claim recorded against a named decision, Evidence pack with method and year on file, Published rubric applied without adjustment, Obligation schedule carrying units and remedies, Remediation verified by evidence, Periodic audit sample with a reported pass rate",
  kp: ["kpi-contract-compliance", "kpi-supplier-performance"],
  rc: "Claim register entry, Boundary statement, Supplier evidence pack, Scored evaluation sheet, Contract obligation schedule, Impact returns, Remediation plan, Audit sample result",
  rt: "Verification records, evidence packs and remediation files are retained for the life of the contract plus the period in which claims can be challenged, and labour findings for the full retention period applied to compliance investigations.",
  rk: "A claim accepted into scoring with no boundary statement, A commitment written without a clock or remedy, A score presented as current on an unrefreshed figure, A finding closed by an assurance letter rather than by evidence, Group certificates used to answer a plant-level question",
  exc: "A time-critical award may proceed on a claim still under verification where the category cannot be re-tendered, provided the reliance is recorded, the score band is capped at the unverified level, and the evidence is delivered within the defined follow-up window with a remedy attached to the contract.",
  mt: ["Accepting a certificate because the brand on it is familiar", "Scoring an intention rather than a delivery mechanism", "Reporting a spend-based proxy as a measured reduction"],
  rf: ["Supplier Code of Conduct", "Sustainability and Climate Policy", "Contract Management Policy", "Modern Slavery Statement and Due Diligence Policy"],
  rh: ["1.0: First controlled procedure for environmental and social claim verification, written with Academy Module 21"],
  cl: "cl-supplier-due-diligence",
  rel: {
    concepts: ["scope3-supplier-emissions", "circular-economy-levers", "modern-slavery-due-diligence", "social-value-in-awarding", "environmental-claim-verification", "esg-data-quality", "supplier-qualification", "supplier-performance"],
    sops: ["sop-rfq", "sop-supplier-due-diligence", "sop-supplier-onboarding", "sop-commercial-evaluation", "sop-supplier-performance-management"],
    checklists: ["cl-supplier-due-diligence", "cl-commercial-evaluation", "cl-supplier-performance-review", "cl-procurement-file-completeness"],
    templates: ["tpl-supplier-due-diligence", "tpl-commercial-evaluation", "tpl-supplier-scorecard", "tpl-rfq"],
    calcs: ["calc-supplier-scorecard", "calc-tco", "calc-multi-year-contract-cost"],
    decisions: ["dec-rfq-or-rfp", "dec-unit-or-tco", "dec-competitive-or-single"],
    kpis: ["kpi-contract-compliance", "kpi-supplier-performance"],
    glossary: ["gloss-sla", "gloss-tco", "gloss-kpi"]
  }
});
