/* ==========================================================
   Procure Sherpa v3.0 - Knowledge additions: Public and
   Regulated Tendering. The library taught evaluation criteria
   (Module 4), sourcing method selection (Module 2) and contract
   governance (Module 6), but never the mechanics that a regulated
   buyer has to get right before a bid is even readable: how lots
   and call-off architecture decide who can compete, how award
   criteria are disclosed and defended, what an implausibly cheap
   bid actually requires, and what happens after the decision when
   someone who lost decides to ask why. Added with Academy Module 25.
   ========================================================== */

PS.SKB({ i: "lotting-and-lot-design", t: "Lotting and how a tender is divided", c: "Public and Regulated Tendering",
  d: "The deliberate division of one requirement into several awardable lots, each competed and awarded separately, so that a supplier can bid on all, some or one - and the accompanying rules about bid-by-lot, award-by-lot, and the maximum number of lots one bidder may win.",
  w: "Sets who can realistically compete before anyone reads a specification;Keeps a single large contract from being reachable only by the largest incumbents;Limits how much of a service can fail at once if one supplier does",
  n: "Structuring any tender above the regime threshold;Refreshing a contract that has been awarded as one package for years;When market testing shows no mid-sized supplier can carry the whole scope",
  h: "Size lots by what a credible supplier can actually absorb, not by the internal budget lines;State whether lots are combined-awardable and publish the rule before bids arrive;Test each lot for standalone viability - a lot nobody can serve alone is a lot that will be won by whoever wants the rest;Watch aggregate exposure when one supplier wins most of them",
  e: "A facilities tender issued as one package attracted four bidders, all national incumbents. Split into six lots by region, with a rule that no bidder could win more than three, it attracted eleven bidders and two new entrants, and the price of the two largest lots fell further than the savings estimate.",
  r: "More lots means more evaluations, more award decisions and more contracts to manage;Combination rules can be gamed by coordinated bidding across a group of linked companies",
  m: "Splitting on organisation charts rather than on market reality;Publishing lot sizes so large that only the incumbent can bid and calling it competition;Forgetting to state whether lots may be awarded together",
  rel: { concepts: ["public-procurement-rules", "sourcing-strategy", "supplier-market-analysis", "concentration-risk", "framework-agreement"],
         sops: ["sop-rfp", "sop-rfq", "sop-procurement-intake"],
         checklists: ["cl-rfp-preparation", "cl-sourcing-strategy", "cl-supplier-identification"],
         templates: ["tpl-rfp", "tpl-bid-instructions"],
         calcs: ["calc-compare-quotes", "calc-supplier-concentration"],
         decisions: ["sourcing-method", "rfq-or-rfp", "consolidate-suppliers"],
         kpis: ["kpi-bid-rate", "kpi-supplier-concentration"],
         glossary: ["gloss-rfp", "gloss-bid", "gloss-rft"] } });

PS.SKB({ i: "call-off-architecture", t: "Framework, dynamic system and open call-off", c: "Public and Regulated Tendering",
  d: "The choice between competing a requirement once into a contract, competing it into a framework where later call-offs are decided by reopen, mini-competition or automatic rotation, and running a system that stays open to new suppliers throughout its life.",
  w: "Buys speed on repeat requirements without abandoning competition;Makes the second competition cheaper than the first, which is where the real saving sits;An open system keeps the door ajar for entrants a closed framework locks out",
  n: "Repeated, well-specified requirements arriving on a predictable rhythm;When cycle time is the binding constraint rather than price;When the supplier market is thin and a closed list would freeze it",
  h: "Decide and publish how call-offs are decided before the framework is awarded;Cap the framework population where the market can absorb it and keep the door open where it cannot;Set the mini-competition rules so a supplier who improves service does not lose on price alone;Review the economics of a framework every cycle - a framework nobody competes inside becomes a subscription",
  e: "A laboratory consumables framework of nine suppliers ran automatic rotation for two years and drifted 14 percent above the market index. Introducing a mini-competition above a value threshold brought prices back and cut call-off cycle time by six days on average.",
  r: "Frameworks reward the suppliers who were already good enough to qualify and can calcify a market;Mini-competitions reintroduce the administrative cost the framework was meant to remove",
  m: "Awarding a framework and then never competing inside it;Choosing rotation for fairness when the requirement actually needs a quality difference;Populating a framework so widely that call-off competition is nominal",
  rel: { concepts: ["framework-agreement", "public-procurement-rules", "competitive-tension", "sourcing-strategy", "supplier-segmentation"],
         sops: ["sop-rfp", "sop-rfq", "sop-supplier-performance-management"],
         checklists: ["cl-sourcing-strategy", "cl-rfp-preparation", "cl-supplier-selection"],
         templates: ["tpl-rfp", "tpl-supplier-invitation", "tpl-bid-instructions"],
         calcs: ["calc-multi-year-contract-cost", "calc-compare-quotes"],
         decisions: ["framework-agreement", "rfq-or-rfp", "renew-vs-resource"],
         kpis: ["kpi-rfq-cycle", "kpi-cycle-time", "kpi-bid-rate"],
         glossary: ["gloss-rft", "gloss-blanket-po", "gloss-rate-card"] } });

PS.SKB({ i: "award-criteria-weighting", t: "Award criteria, weightings and the disclosure line", c: "Public and Regulated Tendering",
  d: "The published standard by which the winning bid is chosen: the criteria, their relative weights or sub-weights, the minimum scores, and the condition that what was scored is what was told to bidders - and never a criterion that only measures the incumbent.",
  w: "Turns an award from an opinion into a decision that can be shown;Forces the buyer to decide in advance what value actually means in this category;The published weighting is the contract with every bidder about how they will be judged",
  n: "Any competed award where price is not the whole answer;Designing a scorecard for a service, a build or a concession;When a decision is close enough that a challenger could argue the criteria chose the winner",
  h: "Write criteria so two reasonable assessors reach the same score without talking;Set weights from what the business case says matters, then check they do not secretly select a known supplier;Disclose sub-weights where they change bidder behaviour;Keep scoring matrices and rationale as one artefact, because a score without a reason is the first thing challenged",
  e: "A transport award weighted 60 percent on price and 40 percent on service with five undisclosed sub-criteria. A losing bidder read the scoring sheets, found one sub-criterion applied only to the incumbent fleet type, and the decision had to be retaken.",
  r: "Publishing every sub-weight lets sophisticated bidders reverse-engineer the market position of the incumbent;Criteria that are too easy to score objectively push judgement into the unweighted areas",
  m: "Renaming the incumbent distinctive strength as a requirement;Leaving weights unpublished and then defending them after the award;Scoring to a total without a written rationale per line",
  rel: { concepts: ["evaluation-criteria", "public-procurement-rules", "total-cost-of-ownership", "social-value-in-awarding", "audit-trail"],
         sops: ["sop-supplier-evaluation", "sop-rfp"],
         checklists: ["cl-technical-evaluation", "cl-commercial-evaluation", "cl-award-recommendation"],
         templates: ["tpl-weighted-scoring", "tpl-technical-evaluation", "tpl-award-recommendation"],
         calcs: ["calc-supplier-scorecard", "calc-tco"],
         decisions: ["unit-or-tco", "rfq-or-rfp"],
         kpis: ["kpi-bid-rate", "kpi-contract-compliance"],
         glossary: ["gloss-bid", "gloss-sla", "gloss-should-cost"] } });

PS.SKB({ i: "abnormally-low-tender", t: "The bid that is too cheap to believe", c: "Public and Regulated Tendering",
  d: "An offer whose price is implausible against the buyer own cost estimate, and the mandatory enquiry that follows: asking the bidder to explain the assumption that produces the number before it is accepted, clarified or rejected.",
  w: "Protects the service from a bid that was priced to win and will be recovered through claims;Protects the market from a bidder subsidising one contract to displace rivals;It is a check on the buyer estimate as much as on the bidder price",
  n: "Any bid materially below the should-cost model or below the other responses;Where a new entrant prices far under an established supplier;Where the low bid is attached to an unusually favourable assumption about scope, risk or finance cost",
  h: "Set the trigger as a rule before bids open, not after a surprising number appears;Ask for the specific assumptions - labour rates, subcontractor terms, margins, finance cost, site overhead allocation, provisional sums;Compare the explanation to the estimate and record both;Reject only against a stated ground, and record the reasoning a challenger could test",
  e: "A cleaning tender came in 23 percent under the should-cost model. The enquiry showed the bidder had priced 42 hours per week where the specification required 60, and the shortfall became a claim dispute in month three rather than a rejected bid at week three.",
  r: "A low bid can be genuinely low because of a real efficiency, an unallocated risk, or a loss leader;The enquiry must not become a second negotiation round available only to the cheapest bidder",
  m: "Accepting the low price because it beats the savings target;Rejecting a low bid without asking, which is the version most often overturned;Treating the should-cost model as infallible when it may be the stale number",
  rel: { concepts: ["should-cost", "evaluation-criteria", "price-vs-cost", "cost-breakdown", "competitive-tension"],
         sops: ["sop-supplier-evaluation", "sop-rfp", "sop-savings-validation"],
         checklists: ["cl-commercial-evaluation", "cl-award-recommendation", "cl-procurement-audit"],
         templates: ["tpl-commercial-evaluation", "tpl-bid-comparison", "tpl-cost-avoidance"],
         calcs: ["calc-should-cost", "calc-compare-quotes", "calc-tco"],
         decisions: ["unit-or-tco", "negotiate-or-accept", "rfq-or-rfp"],
         kpis: ["kpi-ppv", "kpi-savings", "kpi-contract-compliance"],
         glossary: ["gloss-should-cost", "gloss-bid", "gloss-cost-avoidance"] } });

PS.SKB({ i: "standstill-and-challenge", t: "Standstill, debrief and the risk of being challenged", c: "Public and Regulated Tendering",
  d: "The pause and the disclosure between an award decision and a signed contract: notifying those who lost, giving enough of the reasons and the winning characteristics that a loser can judge whether the decision was wrong, and holding the signature until that window has passed.",
  w: "Converts an argument after the fact into a correction before the contract exists;A file that explains itself is far cheaper than a decision retaken under review;The reasons given at debrief are the quality test of the evaluation, not a courtesy",
  n: "Before signing any award above threshold in a regulated regime;When a losing bidder asks why;When an internal reviewer or auditor reads the award file;When the margin between first and second is small enough to be argued",
  h: "Write the award rationale as if a hostile reader will get it, because eventually one does;Disclose the characteristics that decided it, not the total score of the winner;Keep clarification logs, scoring sheets and the recommendation as one retrievable set;Never shorten a standstill to hit a service start date on a large award - that is the trade that turns a delay into an ineffectiveness risk",
  e: "A security services award was signed on the day of decision to protect a start date. The second-ranked bidder asked for the scoring sheets, found a maths error worth four points, and the contract had to be terminated and re-competed - eleven weeks lost against three days saved.",
  r: "Debrief detail can hand a losing bidder the grounds for a challenge;Long publication duties slow the response to an urgent requirement, which is why emergency routes exist and are narrow",
  m: "Giving a debrief that names scores but not reasons;Re-scoring a losing bid during a challenge without re-opening to everyone;Assuming the file is complete because the decision was fair in the room",
  rel: { concepts: ["public-procurement-rules", "audit-trail", "evaluation-criteria", "conflict-of-interest", "delegation-of-authority"],
         sops: ["sop-procurement-audit", "sop-supplier-evaluation", "sop-rfp"],
         checklists: ["cl-procurement-file-completeness", "cl-award-recommendation", "cl-procurement-audit"],
         templates: ["tpl-award-recommendation", "tpl-bid-waiver", "tpl-exception-request"],
         calcs: ["calc-compare-quotes"],
         decisions: ["approve-exception", "competitive-or-single"],
         kpis: ["kpi-cycle-time", "kpi-contract-compliance", "kpi-maverick-spend"],
         glossary: ["gloss-bid", "gloss-segregation-of-duties", "gloss-doa"] } });
