/* ==========================================================
   Procure Sherpa v2.6 - SOP additions for the markets Module 15
   teaches. Two controlled procedures that did not exist: freight
   and customs, and contingent labour. Steps are written in the
   compact seed format - Title|instruction|role=,out=,ctrl= -
   separated by ';' so no semicolon may appear inside a step.
   ========================================================== */

PS.SSOP({
  i: "sop-freight-and-customs",
  t: "Freight, Duty and Customs Clearance SOP",
  c: "Logistics",
  v: "1.0",
  ow: "Head of Indirect and Logistics",
  rv: "Annual",
  p: "Control how goods move across borders and who carries the customs obligation, so that landed cost is decided rather than discovered and duty exposure is documented before the shipment moves.",
  s: "All inbound and outbound movements of physical goods where a border is crossed, including samples, spares, returns, tooling transfers and direct shipments from a supplier to a customer site.",
  os: "Domestic movements within a single customs territory. Digital goods and services, which carry no import declaration. Accounts payable settlement of duty statements already raised by a broker.",
  g: "A purchase order is raised on a supplier located outside the destination customs territory, or an existing domestic source is replaced by an overseas origin.",
  ro: "Category Manager, Logistics Coordinator, Customs Broker of Record, Finance Controller, Legal Counsel, Receiving Site Manager",
  ra: "Category Manager: Owns the landed-cost model and the incoterm position and signs the sourcing route before the order is placed;Logistics Coordinator: Books the movement, consolidates lanes and records actual cost against the model;Customs Broker of Record: Prepares and lodges the declaration, applies the classification and holds the working papers;Finance Controller: Confirms who is importer of record, funds the duty account and books the VAT and duty treatment;Legal Counsel: Reviews licence, sanctions and restricted-party requirements and the contract clause allocating customs obligations;Receiving Site Manager: Confirms delivery window, documentation set and non-conformance at the gate",
  fq: "Every cross-border purchase order and every origin change on an existing item.",
  du: "Three to five working days to model a new lane, then the normal transit time of the mode selected.",
  fl: "Origin and route decision|Landed-cost model|Incoterm and IOR agreement|Classification and licensing|Booking and documentation|Clearance and release|Actual-versus-model review",
  st: "Confirm the origin and the route before the order is placed|Record the country of origin, the tariff classification proposed for the goods, the mode and the transit days, and check whether a licence, inspection or restricted-party screening applies to that combination. An origin change is a new decision rather than a supplier detail.|role=Category Manager,out=Approved route and origin note,ctrl=Origin and classification confirmed before order release;Build the landed-cost model per unit and per lane|Price the ex-works or quoted figure, freight, insurance, duty, clearance and brokerage, handling, packaging non-conformance and the carrying cost of the pipeline days the route creates. Model small orders separately because minimum charges make them expensive.|role=Category Manager,out=Landed-cost model with assumptions listed,ctrl=Model reviewed by Finance before it is used to compare sources;Fix the incoterm and name the importer of record|Agree in writing which party clears the goods, who holds the bond or deferment account, and who carries duty, penalties and delay. Record the incoterm on the purchase order and in the contract, not only in the email chain.|role=Legal Counsel,out=Contract clause naming incoterm and importer of record,ctrl=Importer of record named before first shipment;Classify the goods and document the basis|Have the broker assign the tariff code with a written basis and check the duty rate and any preferential claim against the origin. A classification applied to a line is a standing decision affecting every future shipment of it.|role=Customs Broker of Record,out=Classification working paper with duty rate and origin rule,ctrl=Classification basis retained as a working paper;Book the movement against a documented instruction|Issue the booking with the commercial invoice, packing list, origin certificate and any licence reference, and state the delivery window the site can actually receive. Undocumented instructions become clearance delays.|role=Logistics Coordinator,out=Booking instruction and document set,ctrl=Document completeness checked before collection;Clear, release and reconcile at the gate|Lodge the declaration, settle duty and taxes, release the goods and record actual charges against the model line by line. Discrepancies are raised as a variance rather than absorbed into freight.|role=Logistics Coordinator,out=Clearance record and actual-cost reconciliation,ctrl=Variance above the model threshold is reported to the Category Manager;Review actual against model and re-baseline|Compare modelled and actual landed cost per lane each quarter and update the model where the gap repeats. Fuel indices, exchange rates and tariff changes are re-tested against the lanes they affect.|role=Category Manager,out=Quarterly lane review with updated model,ctrl=Model version and change reason recorded;Close the audit file|Retain the declaration, classification basis, origin evidence, invoices and the reconciliation for the statutory period in the destination jurisdiction.|role=Finance Controller,out=Closed customs file per shipment batch,ctrl=Retention period confirmed against local statute",
  ip: "Supplier quotation with incoterm stated;Country of origin and bill of materials;Proposed tariff classification;Freight quotation for the selected mode;Licence or permit requirements;Landed-cost model with assumptions",
  ot: "Approved landed-cost model;Named importer of record and contract clause;Lodged customs declaration and duty settlement;Lane cost reconciliation;Quarterly lane review",
  dc: "Mode Selection|Cheapest compliant mode for the demand segment, with expedite reserved for a named exception and its cost reported;Buy or Toll|Import directly under a named importer of record, or buy delivered-duty-paid from the supplier and pay for the risk transfer",
  ct: "No cross-border order released before incoterm and importer of record are agreed in writing;Classification basis retained as a working paper;Duty and VAT settlement reconciled to the landed-cost model each quarter;Expedite spend reported separately so a planning failure is not absorbed as freight cost;Restricted-party screening completed before collection",
  kp: ["kpi-otd", "kpi-cycle-time", "kpi-cost-avoidance"],
  rc: "Landed-cost model with version and assumptions;Incoterm and importer-of-record clause;Commercial invoice, packing list and transport document;Certificate of origin and any licence;Customs declaration and duty receipt;Actual-versus-model reconciliation;Lane review note",
  rt: "Retain customs declarations, origin evidence and duty receipts for the statutory retention period in the destination jurisdiction, commonly five to ten years, or seven years where longer.",
  rk: "Assuming a preferential duty claim is valid because the supplier holds a certificate of origin;Booking freight against a modelled percentage rather than a per-lane figure;Allowing the forwarder to become importer of record by default;Repeating a classification without re-testing it against a design change",
  exc: "Emergency or spot movements may be booked before the model is complete provided the variance is reconciled within ten working days;Samples and warranty returns below the local de-minimis follow the simplified declaration route with the same record retained.",
  mt: ["Comparing overseas and domestic suppliers on invoice price without a landed-cost model", "Leaving duty and clearance responsibility undefined in the contract", "Treating expedite freight as a normal operating cost", "Applying one flat percentage for freight and duty across a whole category"],
  rf: ["Incoterms 2020", "Local customs statute and retention schedule", "Corporate Trade Compliance Policy", "Delegation of Authority Policy"],
  rh: ["1.0: First controlled procedure for cross-border movement, written with Academy Module 15"],
  cl: "cl-procurement-file-completeness",
  rel: {
    concepts: ["freight-modes", "customs-and-duty", "landed-cost-model", "incoterms", "total-cost-of-ownership"],
    checklists: ["cl-procurement-file-completeness", "cl-supplier-onboarding"],
    templates: ["tpl-rfq", "tpl-bid-comparison", "tpl-business-case"],
    calcs: ["calc-landed-cost", "calc-fx-currency", "calc-gst-tax", "calc-tco"],
    kpis: ["kpi-otd", "kpi-cycle-time"],
    decisions: ["sourcing-method", "unit-or-tco"],
    sops: ["sop-procurement-lifecycle"],
    glossary: ["gloss-hs-code", "gloss-ddp", "gloss-incoterms", "gloss-landed-cost"]
  }
});

PS.SSOP({
  i: "sop-contingent-labour",
  t: "Contingent Workforce and Managed Services SOP",
  c: "Indirect",
  v: "1.0",
  ow: "Head of Indirect Procurement",
  rv: "Annual",
  p: "Bring contractor, staff-augmentation and managed-team spend under one controlled route so the engagement model is chosen deliberately, rates come from a negotiated card, and worker-status and insurance exposure are assessed before a person starts.",
  s: "All engagements of individuals or embedded teams supplied on a time basis, including contractors, interim specialists, staff augmentation, managed service pods and agency-placed personnel.",
  os: "Permanent recruitment, which follows the HR hiring process. Deliverable-based outsourcing where the supplier directs its own people and owns the outcome. Equipment and licence purchases.",
  g: "A hiring manager requests resource that procurement or HR will not employ permanently, or an existing engagement is proposed for extension.",
  ro: "Hiring Manager, Contingent Workforce Programme Manager, Procurement Category Manager, HR Compliance, Finance Business Partner, Legal Counsel",
  ra: "Hiring Manager: Defines the need, the supervision model and the deliverables or skills required, and owns the budget line;Contingent Workforce Programme Manager: Runs the intake gate, maintains the rate card and reports utilisation and extension rate;Category Manager: Negotiates the provider panel and the rate card and manages supplier performance;HR Compliance: Assesses worker-status risk and the background-check and insurance requirements;Finance Business Partner: Confirms budget, accrual treatment and the cost per engagement;Legal Counsel: Reviews the contract model, intellectual property assignment and termination terms",
  fq: "Every new contingent engagement and every extension beyond its original end date.",
  du: "Five to ten working days from intake to a compliant start for a panel supplier, longer for an off-panel exception.",
  fl: "Need and model decision|Intake gate|Rate card pricing|Provider selection|Compliance screening|Contract and start|Extension control|Exit and record",
  st: "Decide the engagement model before sourcing the person|State whether the supplier delivers an outcome under its own direction or supplies labour under day-to-day direction by the hiring manager. The answer sets the contract type, the supervision rules and the status risk, and it is recorded at intake.|role=Hiring Manager,out=Engagement model statement with supervision basis,ctrl=Model approved by HR Compliance where direction is by the hiring manager;Run the intake gate on every request|Log the request centrally with role, seniority, location, duration, budget line and the reason a permanent hire is not the answer. An engagement that starts outside the gate is unmanaged regardless of how it was priced.|role=Contingent Workforce Programme Manager,out=Registered intake record,ctrl=No start date confirmed without an intake record;Price against the published rate card|Apply the card rate for the role, seniority and location and negotiate the card itself periodically. Off-card rates require a written reason and an approval above the standard delegation.|role=Category Manager,out=Rate card price line with any approved deviation,ctrl=Deviation from card approved in writing;Select from the approved provider panel|Choose the provider from the panel for the discipline and location, using the agreed service criteria. Direct engagement of a supplier outside the panel follows the exception route with the same compliance checks.|role=Category Manager,out=Provider selection note,ctrl=Panel selection evidenced or exception approved;Complete status, insurance and screening checks|Confirm right-to-work, background screening, insurance certificates and any site or security requirement before the start date, and record the status assessment for the chosen engagement model.|role=HR Compliance,out=Compliance clearance pack per engagement,ctrl=No start without all clearances recorded;Issue the contract and start the engagement|Issue the contract matching the engagement model, with the rate, duration, notice terms, intellectual property assignment and the termination route stated. Confirm the reporting line so direction is exercised by the supplier where the model says so.|role=Legal Counsel,out=Executed engagement contract,ctrl=Contract type matches the approved engagement model;Control extensions as a priced decision|Review every extension before the current end date, with the cumulative cost, the original duration and the reason the need persists. Extensions beyond the stated threshold require a fresh approval and a permanent-hire test.|role=Contingent Workforce Programme Manager,out=Extension decision record with cumulative cost,ctrl=Extension approval above the threshold sits outside the hiring manager;Close out and report the population|End the access, confirm final timesheets and invoices, and record the engagement in the population report showing headcount, spend, utilisation and extension rate by department.|role=Contingent Workforce Programme Manager,out=Closed engagement and updated population report,ctrl=Population report reviewed monthly with Finance and HR",
  ip: "Approved intake request with budget line;Role, seniority and location definition;Published rate card;Provider panel agreements;Insurance and screening requirements;Existing contingent population data",
  ot: "Registered engagement;Rate-card-priced contract;Compliance clearance pack;Extension decision records;Monthly population report",
  dc: "Engagement Model|Deliverables-based statement of work where the supplier directs the work, or labour supply where the hiring manager directs, with the status consequences accepted;Panel versus off-panel|Panel provider by default, off-panel only where the discipline or location is not covered and the exception is approved",
  ct: "No engagement starts without an intake record and completed clearances;Rates are drawn from a negotiated card and any deviation is approved in writing;Extensions above the stated threshold require approval outside the requesting line;Worker-status assessment recorded for every directed engagement;Population report reconciled to finance accruals monthly",
  kp: ["kpi-maverick-spend", "kpi-contract-coverage", "kpi-cycle-time"],
  rc: "Intake record and budget confirmation;Engagement model statement;Rate card and deviation approval;Provider selection or exception note;Screening and insurance evidence;Executed contract;Extension decisions;Exit confirmation and final invoice",
  rt: "Retain engagement contracts, screening evidence and extension approvals for the statutory employment and tax record period in the country of engagement, commonly six years.",
  exc: "Critical-need engagements may start against a panel supplier at card rate with the compliance pack completed within five working days;Interim management cover for a vacant permanent role follows the same gate with HR sign-off recorded.",
  mt: ["Contracting directly with an individual rather than a supplier, which transfers employment exposure to the hiring organisation", "Negotiating the person instead of the rate card", "Allowing rolling extensions to become a permanent cost without a permanent-hire test", "Reporting contingent spend from invoices only, which misses off-panel and expense-claimed work", "Writing a deliverables contract and then supervising the individual daily"],
  rf: ["Corporate Contingent Workforce Policy", "Worker-status guidance for each country of engagement", "Delegation of Authority Policy", "Records Retention Schedule"],
  rh: ["1.0: First controlled procedure for contingent labour, written with Academy Module 15"],
  cl: "cl-supplier-due-diligence",
  rel: {
    concepts: ["contingent-workforce", "agency-scope-brief", "statement-of-work", "c-maverick-spend", "segregation-of-duties"],
    checklists: ["cl-supplier-due-diligence", "cl-supplier-onboarding", "cl-exception-approval"],
    templates: ["tpl-supplier-onboarding", "tpl-contract-review-checklist", "tpl-exception-request"],
    calcs: ["calc-make-vs-buy", "calc-budget-vs-actual"],
    kpis: ["kpi-maverick-spend", "kpi-contract-coverage"],
    decisions: ["make-or-buy", "approve-exception"],
    sops: ["sop-procurement-intake", "sop-supplier-evaluation"],
    glossary: ["gloss-rate-card", "gloss-co-employment", "gloss-change-order"]
  }
});
