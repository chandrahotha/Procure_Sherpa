/* ==========================================================
   Procure Sherpa v3.0 - Knowledge additions: Fraud and
   Assurance. Six concepts in a domain the library only touched
   sideways: Module 10 covers ethics and anti-bribery, which is
   the behaviour, and nothing covered the detection side - the
   patterns, the master-data control, and the reporting route
   that finds most of it.
   ========================================================== */

PS.SKB({ i: "fraud-triangle", t: "The fraud triangle in purchasing", c: "Fraud and Assurance",
  d: "The three conditions that have to be present for a dishonest act in a purchasing role: pressure, opportunity and rationalisation. Only one of them is a control variable.",
  w: "Explains why an honest person does a dishonest thing once, and why the same process lets it continue;Points the control effort at the one condition the organisation actually owns",
  n: "Designing approval thresholds and access;Reading a case where a trusted colleague is suspected;Deciding why a control exists when someone argues it implies distrust",
  h: "Reduce opportunity through segregation and visibility;Make pressure visible through channels that do not require confession;Design for the rationalisation rather than assuming it away",
  e: "A buyer under a personal debt problem does not start by inventing a vendor. They use a route that already exists and that no one reviews, because reviewing it would mean admitting the route could be used.",
  r: "Control design assumes bad intent in strangers and good intent in colleagues;Opportunity is usually inherited from a process that was simplified for a different reason",
  m: "Treating a control as an accusation rather than as protection for the honest majority;Testing the control on the day it ships and never again",
  rel: { concepts: ["segregation-of-duties", "delegation-of-authority", "procurement-ethics", "audit-trail"],
         sops: ["sop-vendor-master-integrity", "sop-procurement-audit"],
         checklists: ["cl-procurement-audit", "cl-exception-approval"],
         decisions: ["approve-exception"],
         kpis: ["kpi-maverick-spend", "kpi-contract-compliance"],
         glossary: ["gloss-segregation-of-duties", "gloss-doa"] } });

PS.SKB({ i: "red-flag-indicators", t: "Procurement red flags", c: "Fraud and Assurance",
  d: "Observable patterns in purchasing data that are consistent with manipulation: threshold behaviour, vendor-record adjacency, unusual preference and payment routing that does not match the delivery.",
  w: "Makes the unusual visible without reading anyone's intentions;Buys detection time, which is the variable that limits total loss",
  n: "Reviewing a category's spend data;Running a periodic procurement audit;Assessing a supplier added in a hurry;Investigating why one vendor keeps winning narrow evaluations",
  h: "Watch value distributions against approval thresholds rather than averages;Compare vendor attributes to each other, not only to the requirement;Treat repeated exception requests as one pattern rather than several incidents",
  e: "A requisition series clusters just below the level that needs a second signature. Individually each one is unremarkable, and the distribution is the finding.",
  r: "Flags produce false positives and must be triaged, not acted upon directly;A flagged pattern can be a legitimate efficiency that simply looks odd",
  m: "Investigating a single flag as proof;Turning the flag list into a compliance exercise nobody reads;Deleting a flag once explained, instead of keeping the explanation",
  rel: { concepts: ["c-maverick-spend", "spend-analysis", "audit-trail", "concentration-risk"],
         sops: ["sop-procurement-audit", "sop-vendor-master-integrity"],
         checklists: ["cl-procurement-audit", "cl-procurement-file-completeness"],
         calcs: ["calc-po-value-check", "calc-budget-vs-actual"],
         kpis: ["kpi-maverick-spend", "kpi-supplier-concentration"],
         glossary: ["gloss-maverick-spend", "gloss-gpo"] } });

PS.SKB({ i: "bid-rigging-patterns", t: "Collusive tendering patterns", c: "Fraud and Assurance",
  d: "The shapes a rigged competition takes: cover bids, rotation, bid suppression, market allocation by territory or customer, and subcontracting between the firms that did not win.",
  w: "A competition that is formally complete can still produce no competitive tension;The patterns are visible in the bid data long before anyone can prove intent",
  n: "Designing and evaluating any tender;Reviewing repeat awards in a small market;Assessing whether a bid list was genuinely contested;Building an evaluation record that survives a challenge",
  h: "Record bid spreads and the pattern of who loses and by how much across events;Look for the same firms losing consistently by similar margins;Test whether the losing bids contain the same errors or the same formatting;Ask the market who is absent and why",
  e: "Across four tenders the same three suppliers alternate the win, and the two that lost each time were within a percentile of each other on price and well above the winner's.",
  r: "Small markets genuinely do produce repeat contestants;Suspicion without evidence can damage a supplier that simply priced badly",
  m: "Assuming a low bid count means a weak specification only, and never asking about the bid relationships;Announcing a suspicion to the bidders before the record is assembled",
  rel: { concepts: ["competitive-tension", "evaluation-criteria", "sourcing-strategy", "supplier-market-analysis"],
         sops: ["sop-rfp", "sop-rfq", "sop-supplier-evaluation"],
         checklists: ["cl-rfp-preparation", "cl-quote-comparison", "cl-supplier-evaluation"],
         templates: ["tpl-bid-comparison", "tpl-weighted-scoring"],
         calcs: ["calc-compare-quotes"],
         decisions: ["sourcing-method", "competitive-or-single"],
         kpis: ["kpi-bid-rate", "kpi-sourcing-coverage"],
         glossary: ["gloss-rfp", "gloss-rfq", "gloss-hhi"] } });

PS.SKB({ i: "vendor-master-integrity", t: "Vendor master integrity", c: "Fraud and Assurance",
  d: "The discipline that keeps the supplier record trustworthy: one vendor one record, changes made through the record with verification, and no bank detail altered by request alone.",
  w: "The vendor master is the payment instruction, and it is edited far more casually than a bank account;Duplicates break spend visibility, compliance reporting and cost control before anyone suspects fraud",
  n: "Onboarding any supplier;Handling a change of entity or banking;Reactivating a dormant vendor;Cleaning spend data that will not reconcile",
  h: "Search on tax identifier, bank account and address rather than trading name;Require out-of-band verification before a payment becomes possible;Report aged and dormant records on a schedule and give someone the job of closing them",
  e: "A spend review finds five records for one supplier, three of them with different bank details, because each project team created the vendor it needed and nobody looked sideways.",
  r: "Master data work is invisible until it is wrong;Emergency onboarding is where the discipline is waived, and emergencies are not rare",
  m: "Accepting a document forwarded by the requester as verification;Merging records without checking whether either has open commitments;Letting one person both raise and approve a vendor change",
  rel: { concepts: ["supplier-qualification", "spend-analysis", "segregation-of-duties", "c-three-way-match"],
         sops: ["sop-vendor-master-integrity", "sop-supplier-onboarding", "sop-procurement-intake"],
         checklists: ["cl-supplier-onboarding", "cl-supplier-due-diligence", "cl-procurement-file-completeness"],
         templates: ["tpl-supplier-onboarding", "tpl-supplier-due-diligence"],
         calcs: ["calc-po-value-check"],
         kpis: ["kpi-contract-coverage", "kpi-maverick-spend"],
         glossary: ["gloss-spend-under-management", "gloss-source-to-contract"] } });

PS.SKB({ i: "payment-diversion", t: "Payment diversion", c: "Fraud and Assurance",
  d: "A fraud in which the beneficiary of a genuine invoice is changed rather than the invoice itself: usually a bank detail update issued during a real, monitored commercial conversation.",
  w: "The paperwork is authentic because the transaction is authentic, which is why invoice checks do not catch it;The loss is immediate, unrecoverable and lands on the payment run rather than on the process owner",
  n: "Any banking change;Any supplier-reported emergency in billing;Onboarding a vendor whose account details arrive by email;Designing the payment freeze before first use",
  h: "Verify a banking change by calling a number already held or independently obtained, never one supplied in the request;Hold the first payment to a changed account for a set window;Write the callback, the name and the date into the record so the control is provable",
  e: "An accounts payable team receives a letterhead-accurate notice of a new account in the same week the supplier chases a genuine overdue invoice. The callback to the published number finds nothing wrong, and the change is rejected on the strength of it being unverifiable.",
  r: "Attackers read the correspondence and time the request to a real exchange;A control that delays payment is under pressure from exactly the people who are being protected",
  m: "Confirming with the person who requested the change;Treating a document with correct logos as identity evidence;Skipping the freeze window for a supplier who is inconvenient to delay",
  rel: { concepts: ["audit-trail", "segregation-of-duties", "payment-terms", "supplier-financial-risk"],
         sops: ["sop-vendor-master-integrity", "sop-supplier-onboarding"],
         checklists: ["cl-supplier-due-diligence", "cl-procurement-audit"],
         templates: ["tpl-supplier-onboarding"],
         calcs: ["calc-po-value-check", "calc-payment-terms"],
         kpis: ["kpi-contract-compliance"],
         glossary: ["gloss-segregation-of-duties", "gloss-procure-to-pay"] } });

PS.SKB({ i: "whistleblower-channel", t: "Reporting channel and triage", c: "Fraud and Assurance",
  d: "A route by which concern about a procurement act reaches someone able to act, with anonymity available, retaliation prohibited, and a defined path from a report to a decision.",
  w: "Most reported cases surface through a person rather than a control, so the channel is a detection control with the widest coverage in the business;A channel without triage teaches people that reporting changes nothing",
  n: "Setting up procurement integrity arrangements;Handling a concern that names a colleague;Deciding what happens to an anonymous report;Closing the loop after an investigation without breaching confidentiality",
  h: "Publish the route to people outside procurement as well as inside;Triage on the substance rather than on the seniority of the person named;Keep the case record separate from the personnel record;Report the aggregate outcome so the channel keeps credibility",
  e: "A supplier mentions to a category manager that a competitor was seen at the buyer's site before a tender closed. Nothing comes of it because there is no obvious place for the category manager to put the sentence.",
  r: "Fear of retaliation suppresses exactly the reports that are hardest to detect otherwise;A channel that produces no visible result becomes a formality within a year",
  m: "Routing reports to the line manager of the person implicated;Investigating the reporter rather than the report;Confusing anonymity with unaccountability and discarding reports without triage",
  rel: { concepts: ["procurement-ethics", "conflict-of-interest", "audit-trail", "supplier-performance"],
         sops: ["sop-procurement-audit", "sop-vendor-master-integrity"],
         checklists: ["cl-procurement-audit", "cl-exception-approval"],
         templates: ["tpl-exception-request"],
         decisions: ["approve-exception", "supplier-financial-risk"],
         kpis: ["kpi-contract-compliance"],
         glossary: ["gloss-delegation-of-authority", "gloss-segregation-of-duties"] } });
