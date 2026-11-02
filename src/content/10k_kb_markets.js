/* ==========================================================
   Procure Sherpa v2.6 - Knowledge: Markets & Categories
   Six concepts for the categories and regimes that generic
   procurement teaching skips: freight and customs, regulated
   tendering, agency and contingent work, and construction
   commercials. Taught by Academy Module 15.
   ========================================================== */

PS.SKB({ i: "freight-modes", t: "Freight modes and network design", c: "Markets & Categories",
  d: "Choosing how goods physically move - road, rail, sea, air, courier, parcel - as a cost-service decision made against the demand profile, not as a rate negotiation after the fact.",
  w: "Mode choice moves landed cost far more than carrier rate does;A mode decision taken once is invisible in the price line and shows up in every shipment after it",
  n: "Setting up a distribution or import lane;Reviewing a category where freight is a material share of landed cost",
  h: "Segment demand by weight, volume, urgency, value density and fragility;Price the same flow through at least two modes on a landed-cost basis;Fix the incoterm and who books the freight before tendering carriers;Design the consolidation and hub structure before tendering lanes",
  e: "A components importer moving 40 containers a quarter pays USD 1,900 per FEU ocean plus 21 days of pipeline stock, or USD 7,400 air with two days. At a 9 percent cost of capital and USD 2.1m of pipeline inventory, ocean wins on total cost only if the supply plan can absorb the lead time - which is a network decision, not a freight negotiation.",
  r: "Rate-only tendering locks in the wrong mode;Urgency spend becomes the norm once the emergency route is easy to book",
  m: "Tendering carriers before deciding who controls the freight;Comparing transport rates without duty, insurance, handling and inventory carrying cost in the same number;Treating expedite spend as a logistics cost when it is really a planning failure with a price attached",
  rel: { concepts: ["customs-and-duty", "total-cost-of-ownership", "landed-cost-model"], calcs: ["calc-landed-cost", "calc-multi-year-contract-cost"], sops: ["sop-freight-and-customs"] } });

PS.SKB({ i: "customs-and-duty", t: "Customs, duty and trade compliance", c: "Markets & Categories",
  d: "The obligations and cost that attach when goods cross a border: classification, valuation, origin, licences, duty and VAT treatment, and the commercial terms that decide who carries them.",
  w: "Duty and VAT are usually larger than the freight bill and are set by paperwork rather than negotiation;A classification error is a retrospective liability across every shipment that used it",
  n: "Any import or export programme;Selecting a supplier's country of origin for tariff reasons;Deciding who acts as importer of record",
  h: "Classify the goods to the tariff code before pricing landed cost, with the basis documented;Agree the customs value method - transaction value, additions for tooling, royalties and assists;Fix origin using the correct rule for the trade agreement claimed;Name the importer of record and who holds the bond or deferment account in the contract, not in the email chain",
  e: "A buyer switches a subassembly supplier to a lower-cost origin and the landed cost rises: the new country has no preferential agreement for that code, so 6 percent duty applies where the previous origin paid zero. The 11 percent unit-price saving becomes a 5 percent net gain after duty, and the change also breaks the origin claim on the finished export.",
  r: "Retro assessments and penalties on misclassification;Duty paid at import that could have been deferred or reclaimed",
  m: "Quoting ex-works prices without duty, clearance and brokerage in the comparison;Assuming a free-trade agreement applies because the supplier holds a certificate of origin;Letting the freight forwarder choose the importer of record by default",
  rel: { concepts: ["freight-modes", "incoterms", "price-vs-cost"], calcs: ["calc-landed-cost", "calc-gst-tax"], sops: ["sop-freight-and-customs"], glossary: ["gloss-ddp", "gloss-hs-code"] } });

PS.SKB({ i: "public-procurement-rules", t: "Public and regulated procurement", c: "Markets & Categories",
  d: "Procurement run under a published legal regime - thresholds, mandated procedures, advertising, equal treatment, transparency and challenge rights - where the process is itself an auditable object.",
  w: "In regulated buying, a defensible process protects the outcome as much as the analysis does;Documented proportionality is what survives a challenge, not a good price",
  n: "Buying for a public body, utility or grant-funded programme;Any award that must be advertised, or that a losing bidder can contest;Working under a group's compliance policy that mirrors public rules",
  h: "Determine the applicable regime and threshold before designing the event, using the estimated value including options and renewals;Choose the procedure the rules allow for that value and justify the choice in writing;Write specifications on performance and functional requirements, with any technical standard referenced accompanied by or-equivalent wording;Score against the published criteria and weights only, and record the rationale per criterion at the time of scoring;Keep the audit trail: advert, clarifications, scoring sheets, award notice and the standstill or debrief period",
  e: "An authority specifies a proprietary platform by name in the requirement. The award is set aside not because the price was wrong but because equal treatment could not be demonstrated: a bidder who could not offer that platform was excluded by the wording rather than by the criteria.",
  r: "Challenge, suspension and re-tender costs months of delivery time;Findings against the process even where the value for money was good",
  m: "Splitting requirements to stay under a threshold, which is a regulated-procurement offence rather than a shortcut;Writing criteria that describe the incumbent;Publishing weights then scoring on a different basis;Treating a clarification given to one bidder as internal information",
  rel: { concepts: ["evaluation-criteria", "sourcing-strategy", "audit-trail", "conflict-of-interest"], sops: ["sop-rfp", "sop-procurement-audit"], checklists: ["cl-rfp-preparation", "cl-procurement-audit"], decisions: ["rfq-or-rfp", "approve-exception"], glossary: ["gloss-gpo"] } });

PS.SKB({ i: "agency-scope-brief", t: "Agency and creative services scope", c: "Markets & Categories",
  d: "Defining marketing, creative and media work so that it can be evaluated and controlled: the objective, the deliverables, the decision rights on creative, the usage and term of the work, and what happens when the brief changes.",
  w: "Unbounded creative scope is the largest single cost driver in agency spend;Work product that can be reused without further payment is worth more than the discount usually negotiated for it",
  n: "Appointing or retendering a marketing, communications or media agency;Commissioning a campaign or a content programme",
  h: "State the business objective and the measure of success, not a list of deliverables;Specify deliverables with quantities, formats, rounds of revision and approval gates;Fix usage rights, territory, media type and duration for everything created;Set the change-control route and its rate card before work starts;Require transparent pass-through of third-party costs with the margin disclosed",
  e: "A campaign retender keeps scope identical and cuts the retainer 12 percent, then pays 31 percent of it back in change orders within two quarters. The previous partner's rates were not the problem; the brief had never defined what a revision was.",
  r: "Scope creep priced at rate-card premium;Usage claims and re-buy costs on work already paid for",
  m: "Evaluating agencies on show reel and chemistry rather than on a paid or simulated brief;Accepting an hour estimate without a stated assumption base;Leaving ownership of raw files and source formats unstated",
  rel: { concepts: ["statement-of-work", "change-control", "contingent-workforce"], templates: ["tpl-contract-change-request", "tpl-business-case"], sops: ["sop-contract-review"], decisions: ["make-or-buy"] } });

PS.SKB({ i: "contingent-workforce", t: "Contingent workforce and managed services", c: "Markets & Categories",
  d: "Buying people-time on a flexible basis - contractors, staff augmentation, managed service teams - and the classification, rate and accountability decisions that make it either a capability or a liability.",
  w: "Contingent spend is often the third or fourth largest indirect category and the least governed;Worker-status exposure is a legal risk priced at far more than the rate saving that caused it",
  n: "Engaging contractors, project staff or embedded service teams;Cleaning up an unmanaged tail of staffing suppliers",
  h: "Decide the model first: statement of work against deliverables, or labour supply against time; where supervision is day-to-day, treat it as labour supply and route it through a compliant provider;Publish rate cards by role, seniority and location, and negotiate the card rather than the requisition;Control the engagement route through one intake so status, insurance and background checks are consistent;Measure utilisation and extension rate, since extensions are where the premium compounds",
  e: "A technology group holds 1,400 contingent engagements across 40 suppliers at an average 21 percent premium over its own rate card, with line managers contracting directly. Consolidating the route to three suppliers against a published card and an intake gate returns 9 percent of the spend without touching a single rate.",
  r: "Worker-status and co-employment claims;Shadow spend contracted outside any framework",
  m: "Managing contingent labour as a purchasing problem when the driver is hiring behaviour;Signing a deliverables-based contract that is supervised like an employee;Benchmarking rates without adjusting for seniority or location mix",
  rel: { concepts: ["agency-scope-brief", "statement-of-work", "c-maverick-spend", "segregation-of-duties"], calcs: ["calc-make-vs-buy", "calc-budget-vs-actual"], sops: ["sop-contingent-labour", "sop-procurement-intake"], checklists: ["cl-supplier-due-diligence"], kpis: ["kpi-contract-coverage", "kpi-maverick-spend"] } });

PS.SKB({ i: "landed-cost-model", t: "Landed cost modelling", c: "Markets & Categories",
  d: "The full cost of getting goods into the warehouse and usable: ex-works price, freight, insurance, duty, clearance, brokerage, handling, packaging, compliance and the carrying cost of the pipeline the route creates.",
  w: "Comparing suppliers internationally on invoice price systematically misprices the cheaper-looking option;The model is also the place where incoterm and mode choices become visible in money",
  n: "Comparing domestic and overseas sources;Selecting an origin or a shipping route;Pricing a new item into a catalogue",
  h: "Build the model per unit and per lane, not as a percentage uplift;Take the incoterm as the boundary of what the price includes and add everything above it;Include fixed clearance and brokerage costs and let volume dilute them, since that is what makes small orders expensive;Add inventory carrying cost for the pipeline days the route creates;Re-run the model when fuel indices, exchange rates or tariff lines move, with the trigger stated",
  e: "An overseas quote 18 percent below the domestic incumbent looks decisive. Freight, duty, clearance, packaging non-conformance and 26 extra pipeline days on a 9 percent cost of capital consume 14 points of it, and the remaining 4 percent is smaller than the risk of a single missed season.",
  r: "Decisions reversed after the switch when the true cost appears in operations;Duty exposure from an inaccurate model applied at the border",
  m: "Using a flat percentage for freight and duty;Forgetting that minimum charges make small orders disproportionately expensive;Omitting the working-capital effect of a longer lead time",
  rel: { concepts: ["freight-modes", "customs-and-duty", "total-cost-of-ownership", "working-capital", "currency-fx"], calcs: ["calc-landed-cost", "calc-tco", "calc-fx-currency"], sops: ["sop-freight-and-customs"], glossary: ["gloss-landed-cost"] } });
