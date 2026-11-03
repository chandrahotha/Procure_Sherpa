/* ==========================================================
   Procure Sherpa v3.0 - Knowledge additions: Inventory and Stock
   Economics. Carrying cost, EOQ, obsolescence and consignment
   appear across four lessons - always as a term inside a freight,
   landed-cost or distress discussion, never as the decision itself.
   These four records make it a decision that can be taught and
   argued. Added with Academy Module 30.
   ========================================================== */

PS.SKB({ i: "order-quantity-economics", t: "Order quantity: what EOQ assumes and when it is wrong", c: "Inventory and Stock Economics",
  d: "The trade-off that sets how much to buy at once: the fixed cost of raising an order and receiving it against the cost of holding the resulting stock, expressed as the quantity where the two curves stop fighting - and the assumptions that make that quantity the wrong answer in practice.",
  w: "It turns a habitual buying pattern into a number someone can defend;Its value is in the sensitivity, not the optimum - the curve is flat near the bottom and steep at the extremes;It exposes order-processing cost as a real per-transaction cost for the first time",
  n: "Setting reorder quantities for repeat-purchased items;Reviewing a catalogue where every line is ordered weekly;Deciding whether to buy a full pallet or a case;Justifying a price break that requires volume",
  h: "Measure the true cost per order line rather than assuming it: receipt, inspection, matching, payment, and the buyer time;Use demand and holding cost as ranges, not point figures, and report the flat region;Check the constraints before optimising - shelf life, minimum order quantity, transport unit, storage capacity, supplier lead time;Re-run on the calendar rather than on complaint, because the inputs drift",
  e: "A maintenance consumables review found 1,100 lines ordered weekly with an assumed order cost of 40 each. The measured cost per order line, including goods-in and three-way match effort, was 96; moving 300 low-value lines to a monthly quantity bought 31,000 a year of avoided transaction cost and cut goods-in queue time by a third.",
  r: "The classical formula assumes steady demand, a single item, no quantity discounts and unlimited storage - rarely true;Order cost is genuinely hard to measure, and a bad estimate is still better than an unexamined habit",
  m: "Treating the computed quantity as an instruction rather than a starting point;Optimising quantity while ignoring the pack size the supplier can actually ship;Assuming holding cost equals the interest rate",
  rel: { concepts: ["working-capital", "price-vs-cost", "cost-breakdown", "demand-management", "should-cost"],
         sops: ["sop-procurement-lifecycle", "sop-savings-calculation"],
         checklists: ["cl-requirement-definition", "cl-sourcing-strategy", "cl-quote-comparison"],
         templates: ["tpl-cost-avoidance", "tpl-business-case"],
         calcs: ["calc-moq", "calc-landed-cost", "calc-tco"],
         decisions: ["unit-or-tco", "make-or-buy", "consolidate-suppliers"],
         kpis: ["kpi-working-capital-impact", "kpi-cycle-time", "kpi-sum"],
         glossary: ["gloss-eoq", "gloss-moq", "gloss-run-rate"] } });

PS.SKB({ i: "safety-stock-and-service-level", t: "Safety stock is a service level with a price", c: "Inventory and Stock Economics",
  d: "The buffer held against variation in demand and in supply, expressed as the probability of not running out: how much is needed depends on how variable the demand is, how variable the lead time is, and what a stock-out costs - not on what feels safe.",
  w: "It converts an emotional argument about buffer into an arithmetic one about risk;Lead-time variability usually matters more than demand variability, and it is the cheaper thing to fix;It makes the cost of a service level explicit instead of burying it in stock",
  n: "Setting stock levels for critical spares, production inputs or seasonal goods;Deciding between holding stock and holding a faster re-supply route;Reviewing stock that has grown without demand changing;Designing a continuity position for a single-source item",
  h: "State the target service level per item class and let the calculation follow it, rather than setting stock and reverse-engineering a promise;Measure lead-time dispersion, not just the average - the tail is what breaks the buffer;Compare the cost of holding against the cost of a stock-out per event before choosing the level;Fix variability at source where it is cheaper than buffering against it",
  e: "A plant held six weeks of a imported seal because the average lead time was four weeks. The dispersion was the problem: two deliveries in a year had taken eleven weeks. Re-basing the buffer on the observed tail and agreeing a bonded stock position with the supplier cut held inventory by a third while removing the two stock-outs a year the old level had still not prevented.",
  r: "A high service level on every line is the expensive way to be safe; the classification is the point;Safety stock set on average lead time is not protection - it is a mean with a label",
  m: "Setting buffers from the last stock-out rather than from dispersion;Treating a longer quoted lead time as a supplier failing rather than as information;Holding stock instead of fixing a supply route that varies",
  rel: { concepts: ["business-continuity", "supply-chain-risk", "concentration-risk", "demand-management", "working-capital"],
         sops: ["sop-supplier-performance-management", "sop-emergency-procurement", "sop-procurement-lifecycle"],
         checklists: ["cl-supplier-risk-review", "cl-emergency-procurement", "cl-sourcing-strategy"],
         templates: ["tpl-supplier-risk-assessment", "tpl-emergency-justification"],
         calcs: ["calc-supplier-concentration", "calc-moq", "calc-multi-year-contract-cost"],
         decisions: ["dual-source", "supplier-concentration", "re-source"],
         kpis: ["kpi-otif", "kpi-otd", "kpi-working-capital-impact"],
         glossary: ["gloss-sla", "gloss-run-rate", "gloss-hhi"] } });

PS.SKB({ i: "obsolescence-and-carrying-risk", t: "What holding stock really costs, including being wrong", c: "Inventory and Stock Economics",
  d: "The full carrying cost - capital, storage, insurance, handling, shrinkage and, most under-weighted, the risk that the item is no longer wanted - and the write-down exposure that turns a volume saving into a loss.",
  w: "The unit-price saving is visible and immediate while the carrying and obsolescence cost is delayed and diffuse, which is why the trade is usually mis-decided;Obsolescence is the component that can exceed the entire saving;Naming the write-down owner is what makes the risk visible in time",
  n: "Evaluating a price break or a last-time-buy;Buying ahead of a price increase or a suspected disruption;Stocking items tied to a product with a short life or a pending engineering change;Reviewing slow-moving inventory",
  h: "Build carrying cost as components with a rate each, and state the rate;Test any volume saving against the shelf life and the planned engineering change, not only against the annual usage;Require a named owner and a review date for stock bought ahead of a forecast;Report ageing and write-downs back into the category so the pattern is learned",
  e: "A last-time-buy of a controller board was justified by a 22 percent unit-price saving and 18 months of forecast usage. The board was superseded in month seven by a design change the engineering team had already scheduled. The write-down exceeded the saving, and the person who approved the buy had not been told the change was coming because nobody had asked the design roadmap.",
  r: "A forecast that is wrong is not dishonesty, and the risk is symmetric: under-buying also costs;Obsolescence provisions are an accounting answer to an operational question, and the provision is not the fix",
  m: "Counting carrying cost as the interest rate alone;Approving a forward buy without checking the engineering change roadmap;Letting the write-down land in a different budget than the saving was claimed in",
  rel: { concepts: ["working-capital", "cost-avoidance", "price-vs-cost", "should-cost", "savings-baseline"],
         sops: ["sop-savings-validation", "sop-savings-calculation", "sop-supplier-price-increase-review"],
         checklists: ["cl-savings-validation", "cl-commercial-evaluation", "cl-exception-approval"],
         templates: ["tpl-savings-validation", "tpl-cost-avoidance", "tpl-exception-request"],
         calcs: ["calc-should-cost", "calc-tco", "calc-price-escalation"],
         decisions: ["accept-price-increase", "negotiate-or-accept", "approve-exception"],
         kpis: ["kpi-working-capital-impact", "kpi-cost-avoidance", "kpi-savings-realization"],
         glossary: ["gloss-cost-avoidance", "gloss-run-rate", "gloss-capex"] } });

PS.SKB({ i: "stock-ownership-models", t: "Who owns the stock: consignment, VMI, bonded and supplier-held", c: "Inventory and Stock Economics",
  d: "The arrangements that decide when title and risk pass - buying and owning, holding on consignment until use, supplier-managed inventory against agreed levels, bonded stock before duty, and pipeline stock held by a freight party - and what each one costs in control, cash and exposure.",
  w: "It moves the working-capital question from how much stock to how much of it is yours;Each model trades control for cash or for speed, and the trade should be deliberate;It changes what happens in a supplier insolvency, which is where an unexamined model becomes a loss",
  n: "Setting up a stocking arrangement with a critical supplier;Reducing working capital without reducing availability;Holding imported stock before duty is due;Placing stock at a customer or a third-party site;Deciding who carries insurance on goods held for another party",
  h: "State in the contract when title passes, who insures, who may count it, and what happens on termination or insolvency;Use consignment where usage is predictable and the supplier can afford the float - and expect to pay for that in price;Record supplier-owned stock accurately, because an audit or a liquidator will;Check the duty and tax consequences before choosing bonded or in-transit positions",
  e: "A manufacturer ran consignment consumables across three sites and reconciled usage monthly. When the supplier went into administration, the buyer found that retention-of-title wording covered only identifiable unopened packs: 40 percent of the stock on site had been opened, commingled or consumed into kits, and the liquidator treated it as available to sell. Availability continued; the settlement cost more than two years of the consignment discount.",
  r: "Consignment usually carries a price premium because the supplier is financing you;VMI improves availability and can quietly reduce your control over the reorder decision",
  m: "Assuming retention of title works once goods are opened or mixed;Leaving the insurance obligation unstated for stock held at your site but owned by someone else;Choosing bonded stock purely for cash and forgetting it constrains how fast goods can be released",
  rel: { concepts: ["working-capital", "payment-terms", "insolvency-claims-ranking", "customs-and-duty", "supply-chain-risk"],
         sops: ["sop-contract-review", "sop-freight-and-customs", "sop-supplier-onboarding"],
         checklists: ["cl-contract-review", "cl-supplier-risk-review", "cl-procurement-file-completeness"],
         templates: ["tpl-contract-review-checklist", "tpl-supplier-risk-assessment", "tpl-business-case"],
         calcs: ["calc-payment-terms", "calc-landed-cost", "calc-multi-year-contract-cost"],
         decisions: ["negotiate-or-accept", "supplier-concentration", "make-or-buy"],
         kpis: ["kpi-working-capital-impact", "kpi-contract-compliance", "kpi-otif"],
         glossary: ["gloss-working-capital", "gloss-ddp", "gloss-blanket-po"] } });
