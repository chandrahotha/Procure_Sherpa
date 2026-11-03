/* ==========================================================
   Procure Sherpa v3.0 - Knowledge additions: Regulated and
   Constrained Markets. Module 4 qualifies a supplier on general
   grounds, Module 17 covers global sourcing quality and Module 18
   covers disruption; none covers buying where a third authority -
   a product regulator, an export-control office, a security
   vetting regime or a licence condition - has standing in the
   transaction. Added with Academy Module 27.
   ========================================================== */

PS.SKB({ i: "regulated-supplier-qualification", t: "Qualifying a supplier when a regulator has standing", c: "Regulated and Constrained Markets",
  d: "Supplier approval performed to the standard a sector regulator expects rather than to a general commercial one: an approved-supplier list with a defined scope, a quality agreement, an audit on the suppliers site against the process that makes your part, and change notification duties that let you re-qualify before a change reaches your product.",
  w: "Approval is evidence, and a regulator or an inspector reads it years later;A general commercial due diligence question and a sector qualification question have different answers;The expensive failure is the change nobody told you about, not the supplier that was never good",
  n: "Approving any source for a regulated product or service;When a supplier proposes moving a line, a site or a subcontractor;At periodic requalification of an approved list;When a supplier is also the only approved source",
  h: "Define the scope of approval narrowly and honestly - what a supplier is approved to make, not what it is a good company;Require notification of specified changes with a lead time that allows requalification;Audit the process and the quality system, not only the finished goods;Keep the approved-supplier list and the reason for each entry retrievable",
  e: "A contract manufacturer changed a raw-material vendor under a new sub-supplier and told the buyer in the shipment paperwork. The buyers own change-notification clause required notice sixty days earlier, and the requalification, stability testing and filing update took eleven weeks of unplanned work on a product already in release.",
  r: "A long approved-supplier list with no requalification looks like diligence and behaves like fiction;Regulated qualification is slow, so commercial pressure and regulatory pressure arrive at the same table with different clocks",
  m: "Treating a certificate as the qualification rather than as one input to it;Approving a company when the approval belongs to a site and a process;Accepting a suppliers internal judgement that a change does not affect the product",
  rel: { concepts: ["supplier-qualification", "supplier-development", "audit-trail", "change-control", "supplier-performance"],
         sops: ["sop-supplier-onboarding", "sop-supplier-evaluation", "sop-supplier-performance-management"],
         checklists: ["cl-supplier-due-diligence", "cl-supplier-onboarding", "cl-procurement-audit"],
         templates: ["tpl-supplier-onboarding", "tpl-supplier-due-diligence", "tpl-supplier-risk-assessment"],
         calcs: ["calc-supplier-scorecard", "calc-supplier-concentration"],
         decisions: ["supplier-financial-risk", "competitive-or-single"],
         kpis: ["kpi-contract-compliance", "kpi-defect-rate", "kpi-otif"],
         glossary: ["gloss-sla", "gloss-segregation-of-duties", "gloss-doa"] } });

PS.SKB({ i: "process-validation-and-traceability", t: "Validating the process, not inspecting the goods", c: "Regulated and Constrained Markets",
  d: "The principle that for some goods the quality cannot be fully verified by testing the output, so the manufacturing process itself is qualified and documented, and every unit carries identity and history - batch, serial, storage conditions and the chain it travelled.",
  w: "Explains why a regulated supplier charges more and takes longer, and what you are actually paying for;Turns a recall from an unbounded problem into a defined population;Makes the difference between a defect and a compliance event legible",
  n: "Buying pharmaceuticals, sterile or temperature-sensitive goods, safety-critical components, or anything whose failure is not visible on arrival;Designing specification and acceptance for such goods;Planning what happens when a batch must be recalled",
  h: "Specify the qualification and the records you need, not only the outcome;Require batch or serial identity on every delivery and a retention period that matches the product life;Define deviation handling before it happens, including who may release a non-conforming batch;Test the recall path on paper before an incident needs it",
  e: "A cold-chain consumable arrived with a temperature excursion the carrier recorded and the supplier did not check, because the contract specified product condition on arrival but no data review. Two hundred units were quarantined, the release decision had no named owner, and the buyer wrote the deviation route afterwards under pressure.",
  r: "Validation and traceability are documentation-heavy and the cost lands before any failure, which makes them easy to compress in a negotiation and expensive to compress in fact;A recall population is only as small as the identity you kept",
  m: "Accepting a certificate of analysis as the whole evidence trail;Specifying storage conditions without specifying who reads the data logger;Assuming a supplier can reconstruct batch history on request years later",
  rel: { concepts: ["regulated-supplier-qualification", "specification", "supplier-performance", "change-control", "business-continuity"],
         sops: ["sop-supplier-onboarding", "sop-contract-review", "sop-procurement-audit"],
         checklists: ["cl-requirement-definition", "cl-supplier-due-diligence", "cl-procurement-file-completeness"],
         templates: ["tpl-rfi", "tpl-bid-instructions", "tpl-supplier-onboarding"],
         calcs: ["calc-tco", "calc-landed-cost"],
         decisions: ["rfi-or-rfq", "competitive-or-single"],
         kpis: ["kpi-defect-rate", "kpi-otif", "kpi-contract-compliance"],
         glossary: ["gloss-sow", "gloss-incoterms", "gloss-hs-code"] } });

PS.SKB({ i: "export-control-and-dual-use", t: "Export control and dual-use classification", c: "Regulated and Constrained Markets",
  d: "The rules that restrict what may be supplied to whom and where, based on the nature of the item or technology rather than on the price: classification of goods and software as controlled or dual-use, licence requirements, restricted-party screening, and the obligations that attach to transferring technology as well as shipping hardware.",
  w: "It is a compliance duty with personal and corporate liability, not a paperwork step;A technology transfer can be a controlled event even when no goods move;Screening catches the counterparty, classification catches the item - most failures are one of the two",
  n: "Buying or supplying software, tooling, test equipment, components or technical data that may be controlled;Onboarding a supplier or customer with affiliates in restricted destinations;Supporting a project that moves engineers or data across borders;Choosing a supplier because they are cheaper in a controlled category",
  h: "Classify before contracting, and record who classified it and on what basis;Screen every counterparty and beneficial owner against the applicable lists at onboarding and on a schedule;Understand that sending technical data to a foreign affiliate can be an export;Put the obligation in the contract so a supplier cannot create it for you",
  e: "A buyer sourced test equipment 18 percent under market, and the licence requirement appeared only when the freight forwarder asked for the classification. The item needed an export authorisation for the destination, the supplier had quoted as if it did not, and delivery slipped by fifteen weeks while the authorisation was obtained.",
  r: "Classification is a judgement and reasonable people differ, which is why the record matters;A compliance hold cannot be negotiated with, so the schedule consequence lands entirely on the buyer",
  m: "Assuming the supplier handles classification and therefore the risk is theirs;Screening only the contracting entity and not the owners or the end user;Treating an email of technical data to an overseas colleague as no event",
  rel: { concepts: ["public-procurement-rules", "customs-and-duty", "red-flag-indicators", "audit-trail", "supply-chain-risk"],
         sops: ["sop-supplier-onboarding", "sop-freight-and-customs", "sop-procurement-audit"],
         checklists: ["cl-supplier-due-diligence", "cl-procurement-audit", "cl-exception-approval"],
         templates: ["tpl-supplier-due-diligence", "tpl-exception-request", "tpl-bid-instructions"],
         calcs: ["calc-landed-cost", "calc-gst-tax"],
         decisions: ["approve-exception", "competitive-or-single"],
         kpis: ["kpi-contract-compliance", "kpi-cycle-time", "kpi-maverick-spend"],
         glossary: ["gloss-hs-code", "gloss-incoterms", "gloss-ddp"] } });

PS.SKB({ i: "clearance-and-sovereignty-requirements", t: "Clearance, domestic content and security of supply", c: "Regulated and Constrained Markets",
  d: "Requirements that constrain who may perform the work or where it may be done, independent of price or capability: personnel vetting levels, site or facility approvals, domestic-content and sovereign-capability rules, and obligations to keep a capability inside a jurisdiction for security-of-supply reasons.",
  w: "These rules decide the size of the addressable market before competition starts;They explain why a compliant bid can be structurally more expensive and still be the correct award;They are the requirements most often discovered after a specification is written",
  n: "Buying anything defence, security or critical-infrastructure related;Writing requirements where personnel or data access is restricted;Assessing a market with only two compliant suppliers;Deciding whether to pay for a domestic capability that is more expensive",
  h: "Establish the exact vetting or content requirement and who certifies it, then test the market against that before writing the specification;Distinguish a legal obligation from a preference and price the preference honestly;Plan for the thin-market consequence: multi-year terms, guaranteed capacity, or developing a second source",
  e: "A support contract was specified with a data-access requirement that only personnel with an elevated vetting level could hold. Fourteen suppliers could have delivered the service; three could deliver it compliantly, and the eventual award was 22 percent above the general market rate with no bidder able to be meaningfully cheaper.",
  r: "Sovereignty and clearance rules can be used protectively, and a requirement that is not legally necessary is a price paid for a preference;Vetting and certification lead times are outside supplier control and routinely dominate a schedule",
  m: "Writing the requirement after the market test instead of before it;Assuming a global supplier can staff a restricted requirement from anywhere;Treating a thin compliant market as evidence of collusion",
  rel: { concepts: ["regulated-supplier-qualification", "public-procurement-rules", "supplier-market-analysis", "concentration-risk", "business-continuity"],
         sops: ["sop-supplier-onboarding", "sop-rfp", "sop-supplier-evaluation"],
         checklists: ["cl-supplier-identification", "cl-sourcing-strategy", "cl-rfp-preparation"],
         templates: ["tpl-rfp", "tpl-supplier-invitation", "tpl-single-source"],
         calcs: ["calc-supplier-concentration", "calc-compare-quotes"],
         decisions: ["competitive-or-single", "dual-source", "sourcing-method"],
         kpis: ["kpi-bid-rate", "kpi-supplier-concentration", "kpi-contract-coverage"],
         glossary: ["gloss-single-source", "gloss-sole-source", "gloss-hhi"] } });

PS.SKB({ i: "essential-service-continuity-duty", t: "Continuity as a duty in essential services", c: "Regulated and Constrained Markets",
  d: "The position where a supplier failure is not only a commercial loss but a regulated event, because the buying organisation holds a licence or an obligation to keep a service running: continuity plans that a regulator may require, defined resilience costs that can be recovered, and exit plans that must be credible while the incumbent is still the incumbent.",
  w: "It changes the objective of the buy from lowest cost to demonstrable continuity;It makes resilience a number that can be justified rather than a feeling;It forces the exit plan to be written before the relationship is under stress",
  n: "Buying utilities, telecoms, payment or cloud services under sector obligations;Designing sourcing strategy for a licensed operation;Justifying a more expensive or dual-sourced option to a board or a regulator;Preparing an exit plan for a critical supplier",
  h: "State the continuity obligation and the consequence of breach before pricing options;Model resilience as a cost with a named owner, and test it annually;Require an exit plan with data portability, transition periods and a tested fallback;Keep the decision record showing that resilience was weighed against price deliberately",
  e: "A licensed operation moved a critical processing service to the cheapest compliant bidder and kept no tested fallback. When that supplier failed, the regulator required the continuity plan and the buyer produced a document naming a recovery route that had never been exercised, and the remediation programme cost more than the annual saving in the first quarter.",
  r: "Continuity spending is invisible while nothing happens, which makes it politically hard to defend;A regulator can require a plan the market cannot cheaply provide, and then the obligation has to be renegotiated or funded",
  m: "Treating a dual-source decision as a procurement preference rather than a compliance position;Writing an exit plan that assumes cooperation from a failing supplier;Assuming insurance is a continuity plan",
  rel: { concepts: ["business-continuity", "supply-chain-risk", "step-in-and-contingency", "vendor-lockin-and-portability", "concentration-risk"],
         sops: ["sop-emergency-procurement", "sop-contract-renewal", "sop-supplier-performance-management"],
         checklists: ["cl-emergency-procurement", "cl-contract-renewal", "cl-supplier-risk-review"],
         templates: ["tpl-emergency-justification", "tpl-contract-renewal-assessment", "tpl-supplier-risk-assessment"],
         calcs: ["calc-multi-year-contract-cost", "calc-supplier-concentration"],
         decisions: ["dual-source", "renew-vs-resource", "supplier-concentration"],
         kpis: ["kpi-otd", "kpi-otif", "kpi-contract-compliance"],
         glossary: ["gloss-sla", "gloss-run-rate", "gloss-cost-to-serve"] } });
