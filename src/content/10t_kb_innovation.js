/* ==========================================================
   Procure Sherpa v3.0 - Knowledge additions: Supplier Innovation
   and Early Engagement. Module 2 engages the market to define a
   requirement and Module 8 manages an existing supplier, but the
   library never taught the deliberate middle: involving a supplier
   before the requirement is fixed, buying an innovation without
   buying a prototype, and keeping the rights that decide who owns
   the result. Added with Academy Module 28.
   ========================================================== */

PS.SKB({ i: "early-supplier-involvement", t: "Early supplier involvement", c: "Supplier Innovation and Early Engagement",
  d: "Deliberate engagement with suppliers before a requirement is fixed, so that market knowledge shapes what is asked for - managed with a defined stage, a stated purpose, confidentiality terms, and rules that keep the process open to suppliers who were not in the room.",
  w: "Most of the achievable cost and value in a buy is decided before the specification is written, and only the market knows what is achievable;A well-run engagement improves the competition, a badly run one pre-decides it;The knowledge gained is cheap when it is asked for as information and expensive when it becomes a design",
  n: "New-build or engineered categories;Any requirement where the internal team has not bought this before;Where a specification has been unchanged for years;Before a category strategy is approved;When a supplier says the specification cannot be met",
  h: "State the stage and the purpose in writing: consultation, not design partnership;Give every engaged supplier the same information and record what was told to whom;Keep the eventual evaluation able to be run against a supplier that was never involved;Convert the learning into a changed requirement, not into a named preferred supplier",
  e: "A packaging category ran market sessions with four suppliers before writing the specification. Two of them said the material thickness the team had assumed was needed could be reduced if the pallet geometry changed, which was an internal engineering change rather than a supplier one. The revised requirement cut unit weight 14 percent; the eventual tender was won by a supplier that had not been in any session.",
  r: "Engagement creates a real advantage for the engaged supplier, and the value of that advantage must be small compared with the value of the better requirement;Suppliers will share what is interesting to them, which is not always what is true",
  m: "Letting one supplier write the specification;Running engagement sessions without recording what was said;Assuming the supplier who advised is the supplier who must win;Treating early involvement as a relationship gesture rather than a controlled process",
  rel: { concepts: ["specification", "demand-management", "sourcing-strategy", "supplier-market-analysis", "conflict-of-interest"],
         sops: ["sop-procurement-intake", "sop-rfq", "sop-rfp"],
         checklists: ["cl-requirement-definition", "cl-sourcing-strategy", "cl-supplier-identification"],
         templates: ["tpl-rfi", "tpl-bid-instructions", "tpl-supplier-invitation"],
         calcs: ["calc-make-vs-buy", "calc-should-cost"],
         decisions: ["rfi-or-rfq", "sourcing-method", "make-or-buy"],
         kpis: ["kpi-bid-rate", "kpi-sourcing-coverage", "kpi-cycle-time"],
         glossary: ["gloss-rfi", "gloss-sow", "gloss-should-cost"] } });

PS.SKB({ i: "innovation-deal-structure", t: "Structuring an innovation purchase", c: "Supplier Innovation and Early Engagement",
  d: "The commercial shape of buying something that does not yet work reliably: staged funding with a decision at each gate, defined evidence for each stage, kill criteria written before the money is committed, and a scale-up price agreed while there is still something to trade.",
  w: "It separates a genuine advance from a demo tour;It puts a price on the option rather than paying the full price for an unproven thing;It makes stopping a planned event instead of an admission",
  n: "Purchasing new technology, new materials or a new delivery model;When a supplier proposes innovation as a differentiator;Where a pilot is offered free or cheap;Any category where the incumbent is selling a transformation",
  h: "Fund in stages with a written decision test at each gate;Define what evidence would end the experiment, and who judges it;Agree the scale-up price and terms before the pilot, not after;Keep the incumbent in the room during the trial so the comparison is live",
  e: "A warehouse automation pilot was signed free of charge with the price to be agreed after successful testing. The test succeeded, the site had by then been redesigned around the equipment, and the price offered at scale-up was 2.6 times the modelled cost. There was no agreed scale-up price and no alternative that could still be qualified inside the operating plan.",
  r: "Staged funding slows the whole thing and some genuine advances fail a rational gate;A free pilot is not free - it buys the supplier a design lock-in and costs you the negotiation",
  m: "Paying for the prototype at production prices;Agreeing the price after the dependency exists;Running a pilot with no kill criteria and no independent judge;Letting the vendor define what counts as success",
  rel: { concepts: ["make-or-buy", "should-cost", "savings-types", "vendor-lockin-and-portability", "supplier-development"],
         sops: ["sop-negotiation-preparation", "sop-contract-review", "sop-rfp"],
         checklists: ["cl-negotiation", "cl-contract-review", "cl-exception-approval"],
         templates: ["tpl-business-case", "tpl-exception-request", "tpl-negotiation-planner"],
         calcs: ["calc-make-vs-buy", "calc-multi-year-contract-cost", "calc-should-cost"],
         decisions: ["make-or-buy", "negotiate-or-accept", "approve-exception"],
         kpis: ["kpi-roi", "kpi-savings-realization", "kpi-cost-avoidance"],
         glossary: ["gloss-capex", "gloss-opex", "gloss-run-rate"] } });

PS.SKB({ i: "background-and-foreground-rights", t: "Background and foreground rights in joint work", c: "Supplier Innovation and Early Engagement",
  d: "The distinction between what each party brought before the work started and what is created during it, and the terms that decide who may use, license, improve and take away the result - including the data produced while the trial ran.",
  w: "Most innovation disputes are not about the idea, they are about who can use what came out of it;Rights decided after the work is done are negotiated from a weaker position;Data generated by your process on someone else equipment is the least protected asset in the arrangement",
  n: "Any joint development, pilot, proof of concept or co-designed service;Where supplier improvements will be applied to your own assets or data;Before sharing internal models, datasets or process knowledge;When a supplier offers to fund part of the development",
  h: "List the background of both sides before starting, not after;Decide foreground ownership, licensing scope and field-of-use explicitly;Claim the data your own process generates as yours, in a usable format, with a retention right;Check that a supplier-funded development does not quietly sell your learning to your competitors",
  e: "A co-developed scheduling model was funded partly by the supplier, which retained the right to reuse the improvements. Two years later the same model was in production at the buyers two largest competitors, lawfully, and the buyer had no field-of-use restriction to point at - the clause had been read once, at signature, by nobody in procurement.",
  r: "Exclusive field-of-use rights cost money and suppliers will price them;Over-claiming ownership of supplier improvements can stop the market engaging with you at all",
  m: "Signing a joint development agreement that says nothing about improvements;Assuming you own data produced by your operations on a suppliers system;Leaving rights questions to the technical teams because they are moving faster",
  rel: { concepts: ["vendor-lockin-and-portability", "dataset-provenance-and-rights", "data-licence-scope", "contract-structure", "conflict-of-interest"],
         sops: ["sop-contract-review", "sop-contract-change-control", "sop-supplier-onboarding"],
         checklists: ["cl-contract-review", "cl-exception-approval", "cl-procurement-file-completeness"],
         templates: ["tpl-contract-review-checklist", "tpl-contract-change-request", "tpl-exception-request"],
         calcs: ["calc-multi-year-contract-cost"],
         decisions: ["approve-exception", "negotiate-or-accept"],
         kpis: ["kpi-contract-compliance", "kpi-contract-coverage"],
         glossary: ["gloss-doa", "gloss-segregation-of-duties", "gloss-sow"] } });

PS.SKB({ i: "pilot-to-scale-gap", t: "The gap between a successful pilot and a scaled service", c: "Supplier Innovation and Early Engagement",
  d: "The reason good pilots fail to become operations: the trial conditions were not the operating conditions, the economics were never tested at volume, the site-specific effort was invisible, and nobody owned the decision to proceed - so the pilot repeats instead of ending.",
  w: "It names the actual risk, which is not that the idea fails but that it succeeds narrowly and stalls;It forces the evidence standard to be set before the trial rather than argued afterwards;It converts a demonstration into a decision with a date",
  n: "Before authorising any pilot;When a trial has run twice already;Where a supplier proposes further testing before commitment;At the review of an innovation portfolio;When a pilot success is being reported as a benefit",
  h: "Define the scale conditions before the trial: volume, sites, staffing, seasonality, integration;Require the pilot to produce a costed operating model, not only a performance result;Set a maximum number of trials and an expiry date for the decision;Report pilot results as evidence about a decision, never as savings",
  e: "A route-optimisation trial ran twice, each time on one depot in a single season, with strong results both times. The business could not approve scale-up because no one had costed the driver behaviour change across the other eleven depots or the winter conditions the trial had missed. The third trial was authorised with those conditions written in, and the scaled decision followed within a quarter.",
  r: "Tight trial conditions are what make a result look good, and they are also what make it uninformative;A pilot that never ends costs the supplier very little and costs you the market alternatives",
  m: "Counting pilot benefits in the savings report;Approving another trial without naming what extra evidence it produces;Scaling on the strength of a demonstration rather than an operating model",
  rel: { concepts: ["innovation-deal-structure", "savings-baseline", "savings-measurement", "should-cost", "business-continuity"],
         sops: ["sop-savings-validation", "sop-savings-calculation", "sop-negotiation-preparation"],
         checklists: ["cl-savings-validation", "cl-requirement-definition", "cl-negotiation"],
         templates: ["tpl-savings-validation", "tpl-business-case", "tpl-cost-avoidance"],
         calcs: ["calc-savings-analysis", "calc-should-cost", "calc-multi-year-contract-cost"],
         decisions: ["negotiate-or-accept", "renew-vs-resource", "approve-exception"],
         kpis: ["kpi-savings-realization", "kpi-roi", "kpi-cost-avoidance"],
         glossary: ["gloss-cost-avoidance", "gloss-run-rate", "gloss-should-cost"] } });

PS.SKB({ i: "supplier-led-requirement-risk", t: "Requirement capture by the supplier who wants the work", c: "Supplier Innovation and Early Engagement",
  d: "The risk that a specification, a standard or a roadmap is written around one suppliers solution - usually in good faith, because that supplier is the one who answered the questions - and the controls that keep the requirement owned by the buyer.",
  w: "A captured requirement looks exactly like a well-researched one;It is the most common way a competitive process becomes a confirmation exercise;Owning the requirement is what makes every later lever real",
  n: "After any intensive supplier engagement;When a supplier offers a free assessment, benchmark or maturity review;Where the internal team lacks category knowledge and welcomes the help;Before approving a multi-year roadmap written with supplier input",
  h: "Separate the problem definition from the solution description and own the first;Require any supplier-supplied content to be re-derived before it is relied on;Test the draft specification against a solution you do not want, and see whether it excludes it;Give competitors a fair route to be heard before the requirement freezes",
  e: "A maturity assessment offered free by a services firm produced a report recommending exactly the firms own framework, and the buyers category plan adopted three of its stages as requirements. A challenger pointed out that a different architecture met the same objective at half the run cost; the specification had named the framework components rather than the outcome, so no alternative could have complied.",
  r: "Supplier expertise genuinely improves weak requirements, and refusing all help is not the answer;Capture is usually the by-product of helpfulness, not of manipulation",
  m: "Mistaking a free assessment for independent advice;Writing the outcome as the mechanism because the mechanism is what you were shown;Never giving a challenger the chance to describe the problem back",
  rel: { concepts: ["specification", "conflict-of-interest", "evaluation-criteria", "competitive-tension", "early-supplier-involvement"],
         sops: ["sop-procurement-intake", "sop-rfp", "sop-supplier-evaluation"],
         checklists: ["cl-requirement-definition", "cl-sourcing-strategy", "cl-supplier-evaluation"],
         templates: ["tpl-rfp", "tpl-rfi", "tpl-bid-instructions"],
         calcs: ["calc-should-cost", "calc-compare-quotes"],
         decisions: ["rfq-or-rfp", "competitive-or-single", "sourcing-method"],
         kpis: ["kpi-bid-rate", "kpi-maverick-spend", "kpi-sourcing-coverage"],
         glossary: ["gloss-rfp", "gloss-sow", "gloss-single-source"] } });
