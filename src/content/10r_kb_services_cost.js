/* ==========================================================
   Procure Sherpa v3.0 - Knowledge additions: Services Cost and
   Negotiation Analytics. Module 3 models a should-cost for goods
   and Module 9 buys professional services; neither put the two
   together, which is where the money actually moves - the rate
   pyramid, the bench, who carries effort risk, and what a
   multi-year price arc is really promising. Added with Academy
   Module 26.
   ========================================================== */

PS.SKB({ i: "labour-rate-pyramid", t: "The labour rate pyramid", c: "Services Cost and Negotiation Analytics",
  d: "The structure of blended rates across grades in a service team: how many partners, managers and delivery staff a proposal implies, what each grade costs the supplier, and why a blended rate hides the margin until the mix is exposed.",
  w: "The pyramid, not the headline rate, is where a service price comes from;A small change in senior mix moves total cost further than a rate cut;Exposing the mix turns an argument about trust into an argument about arithmetic",
  n: "Pricing any proposal billed by effort;Comparing two suppliers whose blended rates look similar;Negotiating a rate card before renewal;Reviewing a claim that extra senior time was needed",
  h: "Require rates by grade with hours by grade, not a blended figure;Ask what the delivery team actually looks like on comparable engagements;Test the partner-to-junior ratio against the work described;Price the difference between the proposed pyramid and a defensible one",
  e: "Two consultancies quoted similar blended day rates on a strategy study. One proposed 380 partner days and 240 analyst days across the engagement, the other 90 partner days and 620 analyst days; the second was 31 percent cheaper for the same deliverable and the first had priced a selling exercise as delivery.",
  r: "A junior-heavy pyramid is cheap on paper and expensive if quality escapes reach you;Grade titles are not standardised between suppliers, so compare definitions before comparing rates",
  m: "Negotiating the blended rate and leaving the mix untouched;Accepting a pyramid that matches the pitch team rather than the delivery team;Assuming a senior rate buys senior accountability",
  rel: { concepts: ["should-cost", "service-should-cost-anatomy", "price-vs-cost", "bench-utilisation-economics", "total-cost-of-ownership"],
         sops: ["sop-negotiation-preparation", "sop-supplier-price-increase-review"],
         checklists: ["cl-commercial-evaluation", "cl-quote-comparison", "cl-negotiation"],
         templates: ["tpl-negotiation-planner", "tpl-bid-comparison", "tpl-commercial-evaluation"],
         calcs: ["calc-should-cost", "calc-compare-quotes", "calc-negotiation-savings"],
         decisions: ["unit-or-tco", "negotiate-or-accept", "rfq-or-rfp"],
         kpis: ["kpi-ppv", "kpi-savings", "kpi-bid-rate"],
         glossary: ["gloss-rate-card", "gloss-should-cost", "gloss-sla"] } });

PS.SKB({ i: "service-should-cost-anatomy", t: "What a should-cost for a service is made of", c: "Services Cost and Negotiation Analytics",
  d: "A cost model built from the inside of a service: hours by grade, the rate that pays for them, the on-costs and overhead the supplier carries, the tooling and travel recharged, and the margin left - as opposed to a price benchmarked against the last invoice.",
  w: "Turns a price conversation into a cost conversation you can win on evidence;Shows which part of a rate increase is a real input change and which is margin;It is the reference a claim, a variation and a renewal are all measured against",
  n: "Before negotiating any effort-based contract;When a supplier asks for an above-index increase;When two bids for the same scope differ by more than the market can explain;At renewal of a multi-year service",
  h: "Build it bottom-up from the delivery model you actually asked for;State your assumptions and their dates, since a model without a date is a mood;Keep the overhead and margin lines visible rather than folded into rates;Re-run it at renewal so the arc is measurable",
  e: "A managed IT services renewal asked for 7 percent on wage inflation. The bottom-up model showed the delivery mix had shifted two grades junior over three years while rates rose every year, and the settlement was 1 percent with a fixed pyramid for the term.",
  r: "A should-cost is a range rather than a number, and quoting it as one point invites arguments about decimals;Suppliers will not confirm the model, so it is tested by questions rather than agreed",
  m: "Benchmarking against the previous price and calling it a cost model;Dropping the overhead line because the supplier would not disclose it;Treating a stale model as a verdict at renewal",
  rel: { concepts: ["should-cost", "labour-rate-pyramid", "cost-breakdown", "price-vs-cost", "savings-baseline"],
         sops: ["sop-negotiation-preparation", "sop-savings-calculation", "sop-supplier-price-increase-review"],
         checklists: ["cl-commercial-evaluation", "cl-savings-validation", "cl-quote-comparison"],
         templates: ["tpl-commercial-evaluation", "tpl-cost-avoidance", "tpl-savings-calculation"],
         calcs: ["calc-should-cost", "calc-price-escalation", "calc-compare-quotes"],
         decisions: ["unit-or-tco", "negotiate-or-accept", "accept-price-increase"],
         kpis: ["kpi-ppv", "kpi-savings-realization", "kpi-cost-avoidance"],
         glossary: ["gloss-should-cost", "gloss-rate-card", "gloss-run-rate"] } });

PS.SKB({ i: "bench-utilisation-economics", t: "Utilisation, the bench and what a rate must cover", c: "Services Cost and Negotiation Analytics",
  d: "The economics behind a day rate: the share of paid time a consultant actually bills, the bench time that has to be funded from billable work, and how a supplier revenue target translates into a utilisation assumption that either is or is not visible in your price.",
  w: "Explains why a rate is the size it is without accepting the suppliers confidentiality as an argument;Makes a rate cut and a utilisation rise two different things, which is where negotiations go wrong;Shows when you are paying for bench time you never asked for",
  n: "Interpreting a rate card;Judging whether a rate increase is justified;Deciding between a retainer and ad-hoc calls;Assessing a supplier that keeps asking for volume commitments",
  h: "Ask what utilisation the rate assumes and what bench it funds;Compare a volume commitment against the discount it buys, since you are selling guaranteed occupancy;Watch for idle-time clauses that bill availability rather than work;Re-run the arithmetic when the market utilisation moves",
  e: "A supplier defended an 8 percent rate rise as wage inflation. At 62 percent assumed utilisation their model already carried four months of bench per consultant a year; the wage case was 4 percent and the rest was occupancy risk the buyer had been funding through volume commitments.",
  r: "Utilisation is genuinely hard for a supplier to forecast, and pushing it too far transfers risk you may not want to own;Higher utilisation can mean thinner teams and slower response on your own work",
  m: "Accepting a rate rise explained by wages while utilisation assumptions quietly changed;Buying a discount in exchange for volume you cannot forecast;Paying availability and work under one line",
  rel: { concepts: ["labour-rate-pyramid", "service-should-cost-anatomy", "payment-terms", "working-capital", "supplier-segmentation"],
         sops: ["sop-negotiation-preparation", "sop-supplier-price-increase-review", "sop-contract-renewal"],
         checklists: ["cl-negotiation", "cl-contract-renewal", "cl-commercial-evaluation"],
         templates: ["tpl-negotiation-planner", "tpl-contract-renewal-assessment", "tpl-commercial-evaluation"],
         calcs: ["calc-should-cost", "calc-price-escalation", "calc-multi-year-contract-cost"],
         decisions: ["framework-agreement", "negotiate-or-accept", "accept-price-increase"],
         kpis: ["kpi-ppv", "kpi-savings" , "kpi-contract-coverage"],
         glossary: ["gloss-rate-card", "gloss-run-rate", "gloss-ebitda"] } });

PS.SKB({ i: "service-risk-pricing-models", t: "Fixed price, time and materials, retainer and gainshare", c: "Services Cost and Negotiation Analytics",
  d: "The commercial structures a service can be sold on and, more usefully, who carries effort risk under each: fixed price moves it to the supplier and buys it back in scope rigidity, time and materials leaves it with the buyer and buys flexibility, a retainer sells availability, and gainshare or painshare ties reward to a measured outcome.",
  w: "Every structure is a risk transfer with a price attached, which is the thing actually being negotiated;It makes a vague argument about fairness into a question about who bears the cost of being wrong;It exposes hybrid structures that transfer risk to nobody, which is where the worst contracts sit",
  n: "Choosing how to buy a defined deliverable versus an open-ended need;Writing the commercial schedule of a services contract;Deciding whether an outcome-based deal is measurable enough to sign;Reviewing a contract where change orders are the norm",
  h: "Match the structure to how well the scope is understood, not to how much certainty you would like;Price the flexibility you are buying under time and materials, since it is not free;On gainshare, agree the measurement before the incentive, and name who measures;Cap and review the change-order route rather than pretending scope will hold",
  e: "A digital programme was sold fixed price on a scope written as outcomes rather than outputs. The first change-order log ran to 41 items in two quarters, the supplier priced each one as a surprise, and the settlement landed close to a time and materials cost with a year of argument attached.",
  r: "Fixed price on a poorly understood scope is not cheaper, it is paid for later and less transparently;Gainshare needs a measurement both sides trust, and often it does not exist",
  m: "Choosing fixed price to feel safe and then fighting over every change;Writing gainshare without a baseline, a measurement method or an auditor;Mixing structures so that risk sits with the buyer and flexibility sits with the supplier",
  rel: { concepts: ["statement-of-work", "service-level-agreement", "change-control", "liability-indemnity", "should-cost"],
         sops: ["sop-contract-review", "sop-contract-change-control", "sop-negotiation-preparation"],
         checklists: ["cl-contract-review", "cl-negotiation", "cl-exception-approval"],
         templates: ["tpl-rfp", "tpl-contract-change-request", "tpl-exception-request"],
         calcs: ["calc-multi-year-contract-cost", "calc-payment-terms", "calc-should-cost"],
         decisions: ["rfq-or-rfp", "negotiate-or-accept", "approve-exception"],
         kpis: ["kpi-contract-compliance", "kpi-cost-avoidance", "kpi-roi"],
         glossary: ["gloss-sow", "gloss-sla", "gloss-change-order"] } });

PS.SKB({ i: "multiyear-price-arc", t: "What a multi-year price arc promises", c: "Services Cost and Negotiation Analytics",
  d: "The shape of price across the life of a service contract - year-one rates, indexation, step-ups, volume bands and the renewal year - and the fact that most of the money in a long contract is spent after the negotiation that set the tone.",
  w: "Negotiating the arc rather than the entry price changes the outcome of a five-year deal more than a rate cut does;It shows where a contract silently becomes more expensive without any decision being taken;Renewal leverage is created or destroyed years before the renewal",
  n: "Signing any contract longer than a year;Reviewing index-linked increases;Deciding between a longer term for price certainty and a shorter term for market access;Preparing a re-tender that should not be surprised by its own exit costs",
  h: "Model total spend across the term, not year one, before agreeing a step-up;Cap indexation, define the index, and require evidence for the input it claims;Keep one genuine break option priced rather than a ceremonial termination-for-convenience clause;Re-run the should-cost annually so the arc is measured against something",
  e: "A five-year facilities deal was signed 6 percent under the incumbent rate and stepped up 4 percent a year against an unclosed index definition. By year four it was 11 percent above the market, and the exit involved requalification of a specialist service that should have started in year three.",
  r: "A long term is worth real money to a supplier and should cost them something in exchange;Indexation is legitimate when the input actually moved, which needs evidence rather than a formula",
  m: "Celebrating the entry rate and signing the step-ups unread;Accepting an index clause with no basket definition or cap;Treating renewal as a negotiation rather than a re-test of the market",
  rel: { concepts: ["cost-breakdown", "payment-terms", "service-should-cost-anatomy", "framework-agreement", "contract-structure"],
         sops: ["sop-contract-renewal", "sop-contract-review", "sop-supplier-price-increase-review"],
         checklists: ["cl-contract-renewal", "cl-contract-review", "cl-savings-validation"],
         templates: ["tpl-contract-renewal-assessment", "tpl-negotiation-planner", "tpl-cost-avoidance"],
         calcs: ["calc-multi-year-contract-cost", "calc-price-escalation", "calc-payment-terms"],
         decisions: ["renew-vs-resource", "accept-price-increase", "framework-agreement"],
         kpis: ["kpi-ppv", "kpi-contract-coverage", "kpi-cost-avoidance"],
         glossary: ["gloss-run-rate", "gloss-ppv", "gloss-change-order"] } });
