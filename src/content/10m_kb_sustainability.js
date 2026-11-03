/* ==========================================================
   Procure Sherpa v3.0 - Knowledge additions: Sustainable and
   Responsible Sourcing. Module 10 covers sustainability as one
   of four subjects in a governance module, and one lesson
   (func-sustainability) carries the whole topic. A reader
   preparing for category work in 2026 meets carbon accounting
   bases, circular economics, due diligence law and social
   value claims - none of which existed as concepts here.
   ========================================================== */

PS.SKB({ i: "scope3-supplier-emissions", t: "Scope 3 and the purchasing baseline", c: "Sustainable and Responsible Sourcing",
  d: "The greenhouse gas emissions that sit in a buyer value chain rather than in its own operations: purchased goods and services, upstream transport, used products, waste. For most organisations Scope 3 is the largest number and the one the buyer influences.",
  w: "Converts a corporate climate target into a set of sourcing decisions that can actually deliver it;Locates the reduction where the money is, instead of in the office lighting",
  n: "Building a first emissions baseline;Setting supplier requirements for a category;Deciding whether a low-carbon substitute is worth a price premium;Responding to a customer or investor disclosure request",
  h: "Start with a spend-based screen to find the hotspots, then move the biggest categories to physically-based data;Ask suppliers for product-level figures rather than corporate averages;Track the intensity per unit of what you buy, not only the total",
  e: "A manufacturer finds 78 percent of its footprint sits in purchased goods, and three categories carry two thirds of that. Setting supplier data requirements on those three moves more carbon than switching the whole fleet to electric.",
  r: "Spend-based estimates are proxies and improve or worsen as prices move;Supplier averages hide the best and worst plants, so awarding on an average is awarding on the wrong number",
  m: "Publishing a baseline built entirely on spend multipliers and treating it as measured;Chasing a small Scope 1 and 2 win while the buying decisions move the large number;Accepting a supplier certificate in place of a figure with a boundary and a year",
  rel: { concepts: ["total-cost-of-ownership", "supplier-performance", "spend-analysis", "should-cost"],
         sops: ["sop-sustainable-sourcing-verification", "sop-supplier-performance-management"],
         checklists: ["cl-supplier-due-diligence", "cl-supplier-performance-review"],
         calcs: ["calc-multi-year-contract-cost", "calc-tco"],
         decisions: ["dec-unit-or-tco"],
         kpis: ["kpi-supplier-performance", "kpi-contract-compliance"],
         glossary: ["gloss-tco", "gloss-kpi"] } });

PS.SKB({ i: "circular-economy-levers", t: "Circular sourcing: reuse, remanufacture and take-back", c: "Sustainable and Responsible Sourcing",
  d: "Buying arrangements that keep material in use: remanufactured components, refill and returnable packaging, leased rather than purchased equipment, designs that can be disassembled, and contracts that make the supplier responsible for end-of-life.",
  w: "Turns disposal cost and material volatility into a commercial term rather than an annual surprise;Cuts lifetime cost where the purchased item is expensive to make and cheap to rebuild",
  n: "Specifying equipment, packaging or consumables;Renewing a category where the incumbent owns the asset at end of life;Writing a contract where residual value or disposal cost matters;Testing whether a remanufactured part carries the same warranty",
  h: "Price the whole cycle including take-back, refurbishment and disposal, not only the purchase;Require warranty and liability parity for remanufactured items before claiming a saving;Put returnability, refill and disassembly in the specification as outcomes rather than as design rules",
  e: "A packaging switch from single-use cartons to a returnable pool costs more per unit and less per cycle: the pool survives 40 trips and disposal and raw material costs fall together.",
  r: "Circular schemes shift cost and risk to whoever holds the asset at end of life, which is usually the buyer unless the contract says otherwise;Remanufactured goods without equivalent warranty move risk into the operating line",
  m: "Booking a saving against a remanufactured price without checking warranty and failure rates;Buying a lease that removes disposal duty but adds a residual value exposure;Writing green specifications that mandate a material instead of the outcome it delivers",
  rel: { concepts: ["total-cost-of-ownership", "make-or-buy", "specification", "cost-breakdown"],
         sops: ["sop-sustainable-sourcing-verification", "sop-requirement-definition"],
         checklists: ["cl-requirement-definition", "cl-commercial-evaluation"],
         calcs: ["calc-tco", "calc-make-vs-buy"],
         decisions: ["dec-make-or-buy", "dec-unit-or-tco"],
         kpis: ["kpi-cost-avoidance", "kpi-savings"],
         glossary: ["gloss-tco", "gloss-capex", "gloss-opex"] } });

PS.SKB({ i: "modern-slavery-due-diligence", t: "Modern slavery and labour due diligence in supply", c: "Sustainable and Responsible Sourcing",
  d: "The practical steps a buying organisation takes to find, prevent and remediate forced and deceptive labour in its supply base: transparency in the tier structure, wage and fee evidence, grievance access, and action when something is found.",
  w: "Most labour risk sits below tier one, where nobody is looking and no contract runs;It replaces a certificate in a file with evidence that could survive a challenge",
  n: "Onboarding suppliers in agriculture, construction, logistics, cleaning or electronics assembly;Entering a jurisdiction with weak enforcement;Designing an audit programme that is worth the money it costs;Responding when a finding appears at a site",
  h: "Map the actual layers including labour agencies and recruitment fees;Require evidence of who paid the recruitment fee rather than a promise;Test grievance access by asking workers how they would raise a problem;Remediate with a defined clock rather than a renewed pledge",
  e: "A food packaging category traces one resin back to a converter using an agency that charged workers a placement fee. The contract remedy is a fee-transfer clause and a published remediation timeline, not a further audit year.",
  r: "Announced audits measure what a site prepared for;Certification schemes vary widely in what they actually verify;Penalising the supplier alone often pushes the practice into a smaller subcontractor nobody sees",
  m: "Treating a signed code of conduct as evidence of anything;Auditing tier one forever while the risk lives at tier three;Ending a relationship at first finding, which removes the buyer influence that fixes the worker problem",
  rel: { concepts: ["supplier-qualification", "supplier-development", "procurement-ethics", "supply-chain-risk"],
         sops: ["sop-sustainable-sourcing-verification", "sop-supplier-onboarding", "sop-supplier-evaluation"],
         checklists: ["cl-supplier-due-diligence", "cl-supplier-onboarding", "cl-supplier-risk-review"],
         templates: ["tpl-supplier-due-diligence"],
         calcs: ["calc-supplier-scorecard"],
         decisions: ["dec-competitive-or-single"],
         kpis: ["kpi-contract-compliance", "kpi-supplier-performance"],
         glossary: ["gloss-co-employment", "gloss-sla"] } });

PS.SKB({ i: "social-value-in-awarding", t: "Social value and award weighting", c: "Sustainable and Responsible Sourcing",
  d: "The measurable non-financial benefit an award is expected to produce in a community or workforce - apprenticeships, local employment, skills, health outcomes, environmental regeneration - and the scoring design that makes a claim comparable.",
  w: "Turns a narrative section in a bid into something that can be scored, challenged and audited;Gives smaller and local firms a route to win on contribution rather than only on price",
  n: "Designing a tender where the requirement permits social criteria;Evaluating a bid where every supplier promised something;Writing the award record when a lower-price bidder loses on social value;Deciding how much weight a criterion can carry",
  h: "Define outcomes with units and a time period so two bids are comparable;Ask for delivery mechanism and evidence rather than intent;Score against a published rubric and record the reason for every band;Keep the weight proportionate to the requirement so the evaluation survives a challenge",
  e: "A cleaning tender asks for 200 hours of accredited training for local residents over the contract term, evidenced monthly. One bid offers 20 hours and generic wording, the other 210 hours with named partners and a delivery plan.",
  r: "Unweighted narrative sections become a discretion trap and an appeal risk;Social criteria must be tied to the subject of the contract in most public regimes;Local preference written too broadly becomes unlawful discrimination against outside bidders",
  m: "Scoring social value on enthusiasm rather than on evidence;Adding a criterion with no weight so it changes nothing and costs evaluation time anyway;Allowing a promise with no delivery mechanism to beat a delivered plan",
  rel: { concepts: ["evaluation-criteria", "rfi-rfq-rfp", "competitive-tension", "public-procurement-rules"],
         sops: ["sop-sustainable-sourcing-verification", "sop-commercial-evaluation", "sop-contract-award"],
         checklists: ["cl-commercial-evaluation", "cl-rfp-preparation", "cl-award-recommendation"],
         templates: ["tpl-rfq", "tpl-commercial-evaluation"],
         calcs: ["calc-supplier-scorecard"],
         decisions: ["dec-rfq-or-rfp", "dec-competitive-or-single"],
         kpis: ["kpi-bid-rate", "kpi-contract-compliance"],
         glossary: ["gloss-rfp", "gloss-rfq", "gloss-sla"] } });

PS.SKB({ i: "environmental-claim-verification", t: "Verifying green claims before you buy them", c: "Sustainable and Responsible Sourcing",
  d: "The evidence standard a buyer applies to an environmental claim - recycled content, carbon neutral, compostable, renewable - before it is written into an award, a specification or a marketing reference.",
  w: "A buyer who repeats an unverified claim becomes the publisher of it, and in several regimes the liability follows the copy;Most greenwashing comes from a boundary error rather than from an intention to deceive",
  n: "Evaluating bids that quote certifications;Writing a specification that names a material property;Approving a supplier statement for joint communications;Comparing two products on an environmental basis",
  h: "Ask for the standard name, the scope of certification, the site covered and the year;Distinguish a facility, a product, an offset claim and an absolute reduction;Require recycled content as a percentage of mass with a chain-of-custody method;Reject carbon neutral unless the offsets, vintage and additionality are shown",
  e: "A recycled-content claim fails verification because the certificate covers one plant and the supply ships from another. The remedy is a site-specific certificate, not a re-tender.",
  r: "A vague label can be technically true within a boundary nobody reads;Offsets can be real and still not neutralise the emissions being sold as neutral;Certification bodies differ in rigour and the brand on the letterhead does not show it",
  m: "Copying supplier marketing wording into a public statement without verifying the boundary;Accepting a corporate certificate for a specific site;Treating compostable as a property rather than as a condition that requires an industrial facility",
  rel: { concepts: ["supplier-qualification", "specification", "supplier-performance", "concentration-risk"],
         sops: ["sop-sustainable-sourcing-verification", "sop-supplier-evaluation"],
         checklists: ["cl-supplier-due-diligence", "cl-technical-evaluation", "cl-commercial-evaluation"],
         templates: ["tpl-supplier-due-diligence"],
         calcs: ["calc-compare-quotes"],
         decisions: ["dec-unit-or-tco"],
         kpis: ["kpi-contract-compliance", "kpi-defect-rate"],
         glossary: ["gloss-rfq", "gloss-sla"] } });

PS.SKB({ i: "esg-data-quality", t: "Supplier ESG data quality and its commercial use", c: "Sustainable and Responsible Sourcing",
  d: "The difference between an ESG figure that arrived and an ESG figure that is usable: the reporting boundary, the year, the estimation method, the assurance level and the comparability across suppliers.",
  w: "Aggregated scores drive category decisions, and an unexamined score is an unexamined decision;Knowing which cells are estimates changes what a comparison can support",
  n: "Building a supplier scorecard with sustainability criteria;Comparing ratings from different agencies;Setting a requirement in a contract;Responding to an internal request for portfolio emissions",
  h: "Record the method, the year and whether a figure is measured, estimated or proxy;Set an acceptance rule for staleness, and let the score decay if data stops arriving;Compare within a category, never across categories with different boundaries;Keep third-party ratings as a screen and evidence as the decision",
  e: "Two suppliers show equal scores. One reports facility-level energy for the site serving the buyer, the other an undisclosed group average from three years ago. The award conversation is a different conversation once the method is visible.",
  r: "Ratings agencies disagree often and their disagreement is informative rather than noise;A high score on disclosed topics hides undisclosed topics;Assurance over management information is not assurance over the underlying records",
  m: "Averaging incomparable boundaries into one number;Treating the absence of data as a good score;Buying a subscription to a rating and never asking what it measures",
  rel: { concepts: ["supplier-performance", "spend-analysis", "supplier-segmentation", "audit-trail"],
         sops: ["sop-sustainable-sourcing-verification", "sop-supplier-performance-management"],
         checklists: ["cl-supplier-performance-review", "cl-procurement-file-completeness"],
         templates: ["tpl-supplier-scorecard"],
         calcs: ["calc-supplier-scorecard", "calc-kpi-calculator"],
         decisions: ["dec-supplier-financial-risk"],
         kpis: ["kpi-supplier-performance", "kpi-contract-compliance"],
         glossary: ["gloss-kpi", "gloss-sla"] } });
