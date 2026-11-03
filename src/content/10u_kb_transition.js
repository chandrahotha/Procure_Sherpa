/* ==========================================================
   Procure Sherpa v3.0 - Knowledge additions: Service Transition
   and Exit. Module 27 taught the continuity obligation and the
   exit plan that must exist before it is needed; neither the
   library nor the curriculum covered the execution - what has to
   be proven before the old provider stops, what the tail period
   costs, and who pays for cooperation. Added with Academy
   Module 29. The library still has no transition or exit SOP;
   that gap is recorded rather than papered over.
   ========================================================== */

PS.SKB({ i: "service-transition-design", t: "Designing a service transition", c: "Service Transition and Exit",
  d: "The planned movement of an in-life service between providers, or back in house: the scope of what moves (people, process, data, configuration, contracts, relationships), the evidence that the receiving side can run it, and the acceptance tests that let the outgoing service stop.",
  w: "A transition is the highest-risk moment in a service relationship and the least contracted;Most transition failures are not technical, they are the undocumented exception handling that nobody owned;A plan that ends at go-live has no definition of done for the service itself",
  n: "Awarding a replacement provider for a live service;Bringing an outsourced function back in house;Merging two contracts into one provider;Any change of provider in a regulated or essential service",
  h: "Inventory what moves by category, including the undocumented workarounds;Define the receiving side evidence: run-book, exception catalogue, escalation map, staffed rota;Set acceptance as measured service behaviour over a defined window, not a go-live event;Plan the overlap explicitly and price it once",
  e: "A facilities transition went live on the planned date and the new provider inherited 41 site-specific workarounds that had never been written down - the access codes, the local supplier relationships, the exceptions the previous team handled informally. Service levels were missed for five months, and the recovery cost exceeded the transition budget the tender had saved.",
  r: "Deep knowledge sits with people, not documents, and the people usually stay with the outgoing provider;A transition that is too smooth is usually one where the hard parts have not started yet",
  m: "Treating cutover day as the end of the transition;Accepting a run-book written by the party with the incentive to keep the service dependent;Measuring acceptance as project milestones rather than service behaviour",
  rel: { concepts: ["essential-service-continuity-duty", "step-in-and-contingency", "service-level-agreement", "vendor-lockin-and-portability", "supplier-performance"],
         sops: ["sop-contract-renewal", "sop-supplier-performance-management", "sop-contract-review"],
         checklists: ["cl-contract-renewal", "cl-supplier-performance-review", "cl-procurement-file-completeness"],
         templates: ["tpl-contract-renewal-assessment", "tpl-supplier-business-review", "tpl-bid-instructions"],
         calcs: ["calc-multi-year-contract-cost", "calc-payment-terms"],
         decisions: ["renew-vs-resource", "re-source", "dual-source"],
         kpis: ["kpi-otif", "kpi-defect-rate", "kpi-contract-compliance"],
         glossary: ["gloss-sla", "gloss-run-rate", "gloss-cost-to-serve"] } });

PS.SKB({ i: "tail-period-economics", t: "The tail period and what it costs", c: "Service Transition and Exit",
  d: "The interval after the decision to move and before the new service is stable, during which the outgoing provider still runs the work - priced, contractual, and the point at which most exit cooperation is either bought or lost.",
  w: "It is the window where the buyers leverage is lowest and the suppliers incentive is weakest;Most exit disputes are tail-period disputes that were never priced;Agreeing the tail before the relationship is stressed costs a fraction of agreeing it afterwards",
  n: "Any contract with a real prospect of replacement;Writing the exit and termination clauses at award;Approving a transition schedule;Reviewing a service where the incumbent knows the renewal is contested",
  h: "Price the tail at award, in the schedule, at a defined rate card rather than at large;Bound it with a maximum duration and a defined extension mechanism;Attach obligations that survive termination - data extracts, configuration, access, cooperation with the incoming provider;Make early cooperation worth more than late obstruction",
  e: "A contract required cooperation on exit at reasonable cost, with no rate and no cap. When the incumbent learned the renewal was contested it quoted 14 weeks of tail support at a day rate twice the contract rate, and the incoming provider was not yet able to absorb the work. The buyer paid, and the price of the saving the tender had produced was largely spent on the tail.",
  r: "A long tail protects the service and gives the incumbent time to make transition difficult;A short tail protects the buyer from the rate game and transfers schedule risk onto the incoming provider",
  m: "Leaving exit cooperation to good faith because the relationship is good now;Pricing the tail after the decision to leave is public;Assuming a termination-for-convenience clause is an exit plan",
  rel: { concepts: ["payment-terms", "vendor-lockin-and-portability", "essential-service-continuity-duty", "price-vs-cost", "contract-structure"],
         sops: ["sop-contract-review", "sop-contract-renewal", "sop-negotiation-preparation"],
         checklists: ["cl-contract-review", "cl-contract-renewal", "cl-negotiation"],
         templates: ["tpl-contract-review-checklist", "tpl-negotiation-planner", "tpl-exception-request"],
         calcs: ["calc-payment-terms", "calc-multi-year-contract-cost", "calc-negotiation-savings"],
         decisions: ["renew-vs-resource", "negotiate-or-accept", "approve-exception"],
         kpis: ["kpi-contract-coverage", "kpi-cost-avoidance", "kpi-cycle-time"],
         glossary: ["gloss-run-rate", "gloss-change-order", "gloss-doa"] } });

PS.SKB({ i: "parallel-running-and-dual-changeover", t: "Parallel running and the cost of overlap", c: "Service Transition and Exit",
  d: "Deliberately running the old and the new service together for a defined window, so that the new one is proven against live demand before the old one stops - and the honest accounting of what that overlap costs and what it buys.",
  w: "It converts a service risk into a known budget line;It is the only mechanism that proves capability under real load rather than in a test;It shortens the argument about who caused a failure during changeover",
  n: "Essential or regulated services where a break is a reportable event;Transitions where the incoming provider has never carried this volume;Any changeover where the acceptance evidence cannot be produced without live demand",
  h: "Define the overlap window, the measured criteria for ending it, and who pays for it before the transition starts;Run the new service on real work with the old service as fallback, not as a shadow of paperwork;Set the decision-maker for ending overlap, because the temptation is to end it on schedule rather than on evidence;Price the overlap against the cost of a failed cutover, which is the comparison that settles the argument",
  e: "A payments-adjacent service ran eleven weeks of parallel operation. The new provider met every documented acceptance test in week two and failed on a reconciliation exception that only appears at month end. The overlap cost 6 percent of annual contract value; a cutover failure on the original date would have been a reportable incident with a remediation programme behind it.",
  r: "Overlap is expensive and easy to criticise from a project budget;Some services cannot be safely parallel-run, and then the fallback must be a step-in rather than a second live provider",
  m: "Calling a pilot a parallel run when the pilot never carried peak load;Ending overlap on the planned date rather than on the measured criteria;Forgetting that the outgoing provider must be paid to stay during the overlap",
  rel: { concepts: ["service-transition-design", "business-continuity", "step-in-and-contingency", "essential-service-continuity-duty", "savings-baseline"],
         sops: ["sop-contract-renewal", "sop-emergency-procurement", "sop-supplier-performance-management"],
         checklists: ["cl-contract-renewal", "cl-emergency-procurement", "cl-savings-validation"],
         templates: ["tpl-contract-renewal-assessment", "tpl-emergency-justification", "tpl-business-case"],
         calcs: ["calc-multi-year-contract-cost", "calc-budget-vs-actual"],
         decisions: ["dual-source", "renew-vs-resource", "supplier-concentration"],
         kpis: ["kpi-otif", "kpi-defect-rate", "kpi-roi"],
         glossary: ["gloss-sla", "gloss-capex", "gloss-run-rate"] } });

PS.SKB({ i: "knowledge-transfer-evidence", t: "Evidence that knowledge actually moved", c: "Service Transition and Exit",
  d: "The artefacts that show the receiving side can run the service without the outgoing one: a run-book that has been exercised, an exception catalogue with owners, an escalation map with names, and staff who have handled live work rather than read a handover pack.",
  w: "Documentation is the weak form of the evidence and is easy to fake;The failure mode is a complete handover pack and no one who has actually done the job;Exercised evidence is also what a regulator or auditor accepts",
  n: "Accepting a transition stage;Signing off the end of the overlap window;Approving go-live on a critical service;Reviewing a providers transition methodology at tender",
  h: "Require the exception catalogue, not only the standard operating procedure, and check it against the incident history;Have the new team run a defined scenario without help and record what they needed;Compare the handover pack against the last twelve months of escalations to find what was never written down;Treat staff who leave mid-transition as a risk item with a named mitigation",
  e: "A transition pack was delivered complete and on time. The acceptance review compared it with the incident log and found that nine of the fourteen recurring exceptions - the ones that generated most escalations - were absent, because they had been handled by one individual who was not in the handover plan. The pack was accurate about the process and silent about the work.",
  r: "Evidence of transfer costs time from both sides during a period when both are already loaded;A perfectly documented service is sometimes a service that has changed so much the documents describe something else",
  m: "Accepting a document list as proof of capability;Handing over the standard cases and losing the exceptions;Assuming the outgoing teams people will stay for the transition because the contract says cooperate",
  rel: { concepts: ["service-transition-design", "supplier-development", "audit-trail", "specification", "supplier-performance"],
         sops: ["sop-supplier-performance-management", "sop-contract-review", "sop-procurement-audit"],
         checklists: ["cl-procurement-file-completeness", "cl-supplier-performance-review", "cl-contract-review"],
         templates: ["tpl-supplier-business-review", "tpl-contract-review-checklist", "tpl-technical-evaluation"],
         calcs: ["calc-supplier-scorecard"],
         decisions: ["renew-vs-resource", "competitive-or-single"],
         kpis: ["kpi-defect-rate", "kpi-otif", "kpi-contract-compliance"],
         glossary: ["gloss-sla", "gloss-segregation-of-duties", "gloss-run-rate"] } });
