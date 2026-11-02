/* ==========================================================
   Procure Sherpa v2.6 - Academy Content Part 9
   Module 15: Specialised Markets and Category Depth
   Freight and customs, regulated buying, and the people-time
   categories. These are the places where a general procurement
   method is not enough, and where the cost that matters is set by
   paperwork, rules or supervision rather than by price.
   ========================================================== */
PS.ACADEMY_FUNCTIONS = PS.ACADEMY_FUNCTIONS || [];

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-freight-and-landed-cost',
  title: 'Freight, Duty and the True Landed Cost',
  module: 'Module 15: Specialised Markets and Category Depth',
  kicker: 'Function 15.1',
  tier: 'practitioner',
  tagline: 'Comparing an overseas source against a domestic one honestly, which means pricing the border, the journey and the inventory.',
  desc: 'A unit price is not a cost. The moment goods cross a border, duty, clearance, brokerage, insurance, handling, packaging non-conformance and the days of pipeline stock the route creates all attach to it - and most sourcing comparisons never count them. This function covers the landed-cost model, the incoterm decision, who becomes importer of record, and the classification that fixes the duty rate for years.',
  duration: '24 mins',
  lifecycleStage: 'Commercial analysis and cost engineering',
  lifecycleDesc: 'Sits with should-cost and TCO in the analysis stage, but it is the part that has to be re-run at the border rather than once in the office.',

  what: 'Landed cost is the whole cost of getting a unit into the warehouse and usable: ex-works price, inland transport to the port, freight and insurance, duty and any VAT or GST timing effect, brokerage and clearance fees, port and handling charges, packaging and marking compliance, quality holds, and the carrying cost of the extra inventory days the transit creates. The model has to be built per unit and per lane, because the fixed elements - one clearance entry, one brokerage minimum, one inspection - behave differently at 300 units than at 30,000. Two decisions dominate the arithmetic and both are made before any carrier is tendered. The first is the incoterm, which is really a risk-transfer and control decision: EX-Works gives you maximum control of the route and maximum exposure at the border; DDP hands the seller everything and usually costs more than the convenience is worth once you own the customs record anyway. The second is who is importer of record - the party that lodges the declaration, pays duty and carries the compliance liability. If that is you, you need a classification basis, an origin position, a bond or deferment account and a broker you supervise; if it is the supplier, you have bought certainty at a premium and you must still verify their claim survives your own audit. Duty is set by the tariff classification and the origin, not by negotiation. A code is applied to a line of goods and it then governs every future shipment of it, which makes a classification decision a standing one. Origin matters twice: it decides the rate, and it decides whether a preferential agreement can be claimed at all - and a certificate of origin from a supplier is not the same as satisfying the rule of origin for the product. Finally, the inventory effect. Twenty-six extra transit days on a fast-moving line is not a logistics detail; at a stated cost of capital it is money, and it is also the reason a cheaper source can quietly create stock-outs, expedite freight and a second supplier held as insurance. The comparison that ignores those is not a saving, it is a transfer of cost into a line nobody owns.',
  why: [
    'Cross-border comparisons made on invoice price systematically favour the wrong source, because the omitted elements - duty, clearance, handling, pipeline inventory - are routinely 8 to 20 percent of the invoice value and land in somebody else\'s budget line.',
    'Duty and classification are paperwork decisions rather than commercial negotiations. No amount of tendering changes a tariff rate, so the leverage in this category sits in the classification basis, the origin position and the incoterm, all of which are decided before the freight market is touched.',
    'Importer-of-record status carries legal liability, not just cost. The party named is the one that faces assessment, penalty and a retrospective review across every shipment that used the disputed code.',
    'The route creates inventory. Longer transit days convert into working capital, into expedite spend when the plan slips, and into a second source held as insurance - three costs that appear in finance and operations rather than in procurement\'s saving claim.'
  ],
  when: [
    'When comparing a domestic source against an overseas one, or comparing two overseas origins against each other.',
    'When an existing supplier moves production to a different country - the origin change is a new decision, not a supplier notification.',
    'When freight, duty or fuel indices move materially, or when a tariff line changes, which re-prices lanes rather than items.',
    'Before agreeing an incoterm in a new contract, and before signing any document that names the importer of record.',
    'When small-value orders are being served internationally, because minimum charges make per-unit landed cost behave very differently at low volumes.'
  ],
  raci: [
    { role: 'Category Manager', resp: 'Accountable for the landed-cost model and the route decision: the incoterm, the mode, the origin position and the assumptions the comparison rests on.' },
    { role: 'Logistics Coordinator', resp: 'Responsible for booking the movement, consolidating lanes, and reconciling actual charges against the model line by line.' },
    { role: 'Customs Broker of Record', resp: 'Responsible for the classification with a written basis, the declaration lodged, and the working papers retained as evidence.' },
    { role: 'Finance Controller', resp: 'Accountable for who is named importer of record, for funding the duty account, and for the VAT or GST timing treatment the model assumes.' }
  ],
  inputs: [
    'Supplier quotation with the incoterm stated explicitly, plus the country of origin and, where relevant, the bill of materials.',
    'The proposed tariff classification with its basis, and the duty rate and any preference available for that origin.',
    'Freight quotations for at least two modes on the same lane, with transit days, and the local charges at both ends.',
    'Demand profile: order quantity, frequency, service level required and the cost of a stock-out for the item.',
    'The cost of capital used for inventory carrying, and the packaging, marking and inspection requirements of the destination.'
  ],
  outputs: [
    'A landed-cost model per unit and per lane with every assumption named, version-dated and re-runnable when an index moves.',
    'A written incoterm and importer-of-record position reflected in the contract clause, not only in the order.',
    'A comparison of sources on total landed cost including pipeline inventory, with the risk of each route stated.',
    'A quarterly lane review showing modelled against actual cost, with the model corrected where the gap repeats.'
  ],
  controls: [
    'No cross-border order is released before the incoterm and the importer of record are agreed in writing.',
    'The tariff classification is documented with its basis and retained as a working paper, because it governs every future shipment of that line.',
    'Landed cost is compared per unit and per lane, and any flat-percentage freight or duty assumption is treated as a defect in the model.',
    'Expedite freight is reported separately from planned freight, so a planning failure is visible rather than absorbed as a logistics cost.'
  ],
  mistakes: [
    'Tendering carriers before deciding who controls the freight. If the supplier books it, your rate negotiation is with the wrong party and your cost is inside their price.',
    'Assuming a preferential duty claim is available because the supplier holds a certificate of origin. The rule of origin applies to the product, and a certificate that does not satisfy it is a document with no effect.',
    'Using one percentage uplift for freight and duty across a category. It under-prices small orders and over-prices full containers, and it reverses the sourcing decision at exactly the volumes that matter.',
    'Ignoring the working-capital effect of transit days, then treating the extra inventory as a planning success because the stock-out did not happen.',
    'Letting the forwarder become importer of record by default. It transfers a liability you did not decide to take and makes the audit trail somebody else\'s file.'
  ],
  terms: ['landed cost', 'incoterm', 'importer of record', 'tariff classification', 'pipeline inventory'],
  thinkingPoints: [
    {
      quote: 'The cheaper quote is usually the one whose costs land in a different budget.',
      explanation: 'An overseas price advantage of 15 to 20 percent is common in headline quotations, and it is also where the omitted elements live: duty at 6 percent, clearance and brokerage as a fixed charge per entry, packaging rework to meet marking rules, and 20 to 30 extra days of inventory. None of these appear on the supplier invoice, and each lands in a line that procurement does not control - which is exactly why the comparison has to be built before the decision rather than defended afterwards.',
      realWorldExample: 'A components buyer switched to an overseas source 18 percent cheaper. Freight, duty, clearance and packaging non-conformance consumed 14 points, and the 26 extra transit days required a safety stock that cost more than the remaining 4 percent saved. Within a year the group paid for a second source to cover the risk, and the total cost was above the original domestic arrangement.',
      reflectionPrompt: 'Take your last international price comparison and list every cost that appeared somewhere other than the supplier invoice. What is the unit landed cost, and does the decision still hold?'
    },
    {
      quote: 'A tariff classification is a decision with a long tail. You make it once and pay for it on every shipment.',
      explanation: 'Codes are applied to descriptions of goods, and small changes in material, function or assembly state can move a line to a different code with a different rate and a different licence requirement. Because the classification is inherited by every future movement, the review that matters is at the point of design or specification change, not at the border.',
      realWorldExample: 'An electronics importer re-classified a subassembly from a finished-device code to a component code after a design change removed one function. Duty fell from 9 percent to zero on that line, worth more across a year of shipments than three rounds of price negotiation on the same supplier.',
      reflectionPrompt: 'Which of your imported lines have changed materially in specification since their classification was first set, and who checked whether the code still follows?'
    }
  ],
  sopSteps: [
    {
      title: 'Fix the origin and classification before pricing',
      role: 'Category Manager',
      desc: 'Record the country of origin, the proposed tariff code with its written basis, and whether a preference or licence applies to that combination, before any freight or price comparison is built.',
      control: 'No cross-border comparison is used for a sourcing decision unless origin and classification are documented and reviewed by the broker.',
      record: 'Route note with origin, classification basis, duty rate, preference claim and licence requirement.',
      pitfall: 'Treating origin as a supplier attribute that changes silently when production moves, and discovering the new duty position in a customs assessment.'
    },
    {
      title: 'Build the model per unit and per lane',
      role: 'Category Manager',
      desc: 'Add inland transport, freight, insurance, duty, clearance and brokerage, port and handling charges, packaging compliance, and the carrying cost of the transit days - each stated with its assumption and its unit basis.',
      control: 'Fixed charges are modelled per entry and per order, so small orders are priced as they actually behave rather than by a percentage uplift.',
      record: 'Versioned landed-cost model with assumptions, and the two or three lanes compared on the same basis.',
      pitfall: 'Applying one flat percentage for freight and duty across a category, which reverses the decision at low volumes and hides the real cost at high ones.'
    },
    {
      title: 'Decide the incoterm as a control question',
      role: 'Legal Counsel',
      desc: 'Choose the term on the basis of who needs to control the route and who should carry the border risk, and reflect that choice in the contract clause and on the purchase order rather than in correspondence.',
      control: 'The incoterm and importer of record are agreed in writing before the first shipment is released.',
      record: 'Contract clause naming incoterm, importer of record, and the party responsible for the declaration.',
      pitfall: 'Defaulting to EX-Works because it looks cheapest, then absorbing the cost and liability of being importer of record without deciding to.'
    },
    {
      title: 'Price at least two modes on total cost',
      role: 'Logistics Coordinator',
      desc: 'Quote the same flow through two credible modes with transit days, and test the difference against the service requirement and the inventory effect rather than against the freight rate alone.',
      control: 'Mode selection is recorded with the demand segment it serves and the exception route for urgency, with expedite cost reported separately.',
      record: 'Mode comparison per lane with rate, transit days and inventory carrying cost.',
      pitfall: 'Booking air freight for a whole category because one launch needed it, and letting expedite become the planned route.'
    },
    {
      title: 'Complete the compliance set before collection',
      role: 'Customs Broker of Record',
      desc: 'Confirm restricted-party screening, licences, marking and packaging rules, and the documents the destination requires, and hold the set complete before goods are collected.',
      control: 'No collection is authorised until the document set and screening are recorded as complete.',
      record: 'Clearance pack: invoice, packing list, origin evidence, licence reference and screening result.',
      pitfall: 'Arriving at the border with an incomplete set, which converts a planned lead time into a storage charge and an expedite.'
    },
    {
      title: 'Reconcile actual against model every quarter',
      role: 'Logistics Coordinator',
      desc: 'Compare the charges actually incurred per lane against the model line by line, raise the variance rather than absorbing it, and correct the model where the gap repeats.',
      control: 'Variances above the stated threshold are reported to the category owner with the cause, and the model is re-versioned.',
      record: 'Quarterly lane review with modelled versus actual cost and the corrected model.',
      pitfall: 'Reporting a saving measured against the quotation while the actual landed cost is only discovered in the freight and duty accounts.'
    },
    {
      title: 'Retain the working papers for the statutory period',
      role: 'Finance Controller',
      desc: 'Keep declarations, classification bases, origin evidence and duty receipts for the period required in the destination jurisdiction, in a form that answers a retrospective query without rebuilding the file.',
      control: 'Retention is set by statute rather than by internal policy, and the file is closed per shipment batch.',
      record: 'Closed customs file per batch with retention period and location stated.',
      pitfall: 'Holding the broker\'s file as the only copy, then finding the working paper unavailable when the authority asks two years later.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'An overseas supplier quotes 17 percent below your domestic incumbent, EX-Works Shenzhen. You would be importer of record, transit is 31 days by sea, and the item turns 5.2 times a year today at 12 days of cover.',
      q: 'What must the comparison include before a decision is defensible?',
      options: [
        { text: 'Freight, duty, clearance and brokerage, plus the carrying cost of the additional pipeline inventory the 31-day transit creates.', isCorrect: true, rationale: 'Correct. Those are the elements that sit outside the invoice and inside the decision. At 5.2 turns a year, 31 days of transit plus 12 days of cover is roughly 43 days of inventory against 12 today - about 31 days of working capital on an item you did not plan to hold, and it is the number most often missing.' },
        { text: 'Freight and duty only, since inventory is a planning matter rather than a sourcing one.', isCorrect: false, rationale: 'This is the omission that produces the reversed decision. Transit days are created by the sourcing choice, so the inventory they require belongs in the comparison.' },
        { text: 'The domestic supplier\'s price concession first, to see whether the gap closes.', isCorrect: false, rationale: 'A reasonable commercial step, but it is not a comparison. Negotiating the incumbent down without knowing the true landed cost of the alternative means settling for the wrong number.' },
        { text: 'A three-carrier tender on the lane to get the freight rate as low as possible.', isCorrect: false, rationale: 'Tendering the freight before fixing incoterm, importer of record and mode leaves you negotiating the smallest element of the cost and taking on the largest liability.' }
      ],
      calcWork: 'Roughly 31 extra days of cover on an item turning 5.2 times a year is about 8 percent of annual item value tied up; at a 9 percent cost of capital that is ~0.7 percent of annual item cost per year - small next to a 6 percent duty and a fixed clearance charge per entry on low-volume lines.',
      principle: 'Compare on landed cost per unit and per lane. The invoice price is one line in that model, not the answer.'
    },
    {
      type: 'scenario',
      context: 'The supplier offers DDP to your warehouse and says duty and clearance are their problem. Your team has never filed a customs declaration.',
      q: 'What is the right reading of that offer?',
      options: [
        { text: 'Accept it: it removes risk and complexity from a team with no filing experience.', isCorrect: false, rationale: 'Tempting and often wrong. The seller\'s price now contains their estimate of your duty and their choice of classification, and you inherit the compliance record of a party whose incentives differ from yours. It also removes the visibility you would need to challenge a cost you cannot see.' },
        { text: 'Accept only after confirming who is named importer of record, whose classification is applied, and whether you can audit the duty paid.', isCorrect: true, rationale: 'Correct. DDP can be the right answer for low-volume or low-complexity flows, but only when the paperwork position is understood: the importer of record carries the liability, and the classification drives the rate for every future shipment. Buy the convenience deliberately rather than by default.' },
        { text: 'Reject it and insist on EX-Works so you control the freight.', isCorrect: false, rationale: 'Control has a cost: brokerage, a bond or deferment account, classification working papers and someone to run them. For a small flow, EX-Works can be the more expensive and riskier choice.' },
        { text: 'Counter at FOB so you control the main carriage and they handle export clearance.', isCorrect: false, rationale: 'A sensible middle position on many lanes, but it is a different question from the one asked. Choose it after deciding who should own the import record, not as a reflex against DDP.' }
      ],
      principle: 'Incoterms allocate cost, risk and paperwork. Decide the paperwork position first and the term follows.'
    },
    {
      type: 'scenario',
      context: 'A supplier sends a certificate of origin stating the goods qualify for zero duty under a free-trade agreement your legal team is not sure applies.',
      q: 'What should you verify?',
      options: [
        { text: 'Nothing further - the certificate is the document the authority accepts.', isCorrect: false, rationale: 'A certificate is a claim, not a determination. Where the rule of origin is not met, the preference fails and the assessment lands on the importer, usually years later with interest.' },
        { text: 'Whether the product satisfies the rule of origin for that agreement - the specific processing or value-content test for that tariff line.', isCorrect: true, rationale: 'Correct. Preferences are granted against product-specific rules: a change in tariff classification, a regional value content threshold, or specified processing. Origin of the parts and the work done determines the claim, and the importer carries the risk of the assessment.' },
        { text: 'Whether the supplier has issued certificates to other customers.', isCorrect: false, rationale: 'Common practice, not evidence. Other buyers\' files do not answer your rule-of-origin question.' },
        { text: 'Whether the duty rate is zero anyway, in which case the certificate is unnecessary.', isCorrect: false, rationale: 'Sometimes true and worth checking, but it is a different argument: if the standard rate is zero, the paperwork still matters for licences, statistics and any future rate change.' }
      ],
      principle: 'A certificate proves somebody wrote it. The rule of origin proves the claim.'
    },
    {
      type: 'knowledge',
      q: 'Which change most often moves the duty paid on an imported line?',
      options: [
        { text: 'A different freight carrier on the same lane.', isCorrect: false, rationale: 'Carriers affect freight and transit, not the tariff rate.' },
        { text: 'A change in the goods\' classification, which follows material, function or assembly state.', isCorrect: true, rationale: 'Correct. The code applied to the goods sets the rate and the licence position. Design and specification changes move the code, which is why classification review belongs with engineering change rather than with the customs file.' },
        { text: 'A shift in the incoterm from CIF to DAP.', isCorrect: false, rationale: 'The term changes who pays freight and insurance, and can change the customs value slightly through the treatment of transport costs - but it does not change the rate applied.' },
        { text: 'Paying the broker a higher service fee.', isCorrect: false, rationale: 'Brokerage is a service cost, not a duty element, though it is often the most visible line on the invoice.' }
      ],
      principle: 'Duty follows classification and origin. Both are engineering and sourcing decisions, not customs-administration ones.'
    },
    {
      type: 'scenario',
      context: 'Small spare-part orders are being imported individually: 1,400 entries a year, average invoice USD 260, each with a clearance and brokerage minimum.',
      q: 'What is the highest-value intervention?',
      options: [
        { text: 'Negotiate a lower unit price on the parts.', isCorrect: false, rationale: 'The price is not the problem. Fixed clearance and brokerage charges on a USD 260 entry can exceed the value of the goods, so a price cut does not touch the dominant cost.' },
        { text: 'Consolidate: hold a buffer stock locally, or use a supplier-managed stocking arrangement, so the number of entries falls.', isCorrect: true, rationale: 'Correct. When cost is dominated by per-entry fixed charges, the lever is the number of entries. Stocking locally, consolidating shipments or a call-off arrangement changes the cost structure rather than the rate.' },
        { text: 'Move the parts to the purchasing card and skip the import process.', isCorrect: false, rationale: 'This does not remove the customs obligation; it removes the visibility of it and usually creates a compliance finding as well as an unmanaged cost.' },
        { text: 'Ask the supplier to quote DDP so the charges disappear from your accounts.', isCorrect: false, rationale: 'The charges do not disappear, they move into the unit price - where you lose the ability to see that 1,400 entries were the problem in the first place.' }
      ],
      calcWork: '1,400 entries with, say, USD 85 of clearance and brokerage minimum each is about USD 119,000 a year against USD 364,000 of goods - roughly a 33 percent uplift on invoice value, entirely structural.',
      principle: 'Where fixed per-entry costs dominate, reduce the number of entries. Price negotiation cannot reach that cost.'
    }
  ],
  relSop: 'sop-freight-and-customs',
  rel: {
    concepts: ['freight-modes', 'customs-and-duty', 'landed-cost-model', 'total-cost-of-ownership', 'incoterms', 'working-capital'],
    sops: ['sop-freight-and-customs', 'sop-procurement-lifecycle'],
    checklists: ['cl-procurement-file-completeness', 'cl-supplier-onboarding'],
    templates: ['tpl-rfq', 'tpl-bid-comparison', 'tpl-business-case'],
    calcs: ['calc-landed-cost', 'calc-tco', 'calc-fx-currency', 'calc-multi-year-contract-cost'],
    decisions: ['unit-or-tco', 'sourcing-method'],
    kpis: ['kpi-otd', 'kpi-cycle-time', 'kpi-working-capital-impact'],
    glossary: ['gloss-landed-cost', 'gloss-hs-code', 'gloss-ddp', 'gloss-incoterms']
  },
  labMission: {
    title: 'Mission 15.1: Price One Line Honestly',
    desc: 'Take a real imported item and rebuild its comparison as a landed cost per unit, then decide whether the source choice still holds.',
    tasks: [
      'Open the Landed Cost calculator and enter the invoice price, freight, insurance, duty and the clearance or brokerage charges you can actually evidence.',
      'Add the transit days and value the extra inventory at your cost of capital, and state the assumption next to the number.',
      'Write the one line you would change first: the incoterm, the mode, the consolidation of entries, or the classification.'
    ],
    ctaLabel: 'Open Landed Cost',
    ctaHref: '#/calc/calc-landed-cost',
    secondaryLabel: 'Open the Freight and Customs SOP',
    secondaryHref: '#/sop/sop-freight-and-customs'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-regulated-procurement',
  title: 'Regulated and Public Procurement',
  module: 'Module 15: Specialised Markets and Category Depth',
  kicker: 'Function 15.2',
  tier: 'practitioner',
  tagline: 'Buying where the process is itself auditable, and a defensible procedure protects the outcome as much as the analysis does.',
  desc: 'Public bodies, utilities, grant-funded programmes and corporates mirroring public rules all buy under a regime of thresholds, mandated procedures, advertising, equal treatment and challenge rights. The commercial skill is the same; the discipline is different. This function covers how to design an event that survives review, how to write specifications that do not exclude by wording, and where the common findings actually come from.',
  duration: '23 mins',
  lifecycleStage: 'Sourcing strategy and market engagement',
  lifecycleDesc: 'Governs the whole lifecycle for regulated buyers: the procedure is chosen at strategy, and every later step is judged against it.',

  what: 'Regulated procurement differs from commercial procurement in one structural way: the process is an object of review, not only a means to an outcome. Four principles carry most of it. Equal treatment - every bidder gets the same information and the same opportunity. Transparency - the criteria and weights are published before bids are received and applied exactly as published. Proportionality - the depth of process is matched to the value and risk, not applied identically to everything. And documentation - the file must show, to a person who was not there, why the decision was reasonable. Thresholds decide the procedure, and the estimated value that sets the threshold includes options, renewals, and the total over the contract period, not the first year\'s invoice. Under-estimating value to sit below a threshold is one of the most common findings, and it is treated as an offence rather than an optimisation. Specifications are where regulated buying most often fails: describing a solution rather than a requirement excludes every supplier who would solve it differently, and naming a proprietary standard without "or approved equivalent" wording has set aside awards where the price and the analysis were unimpeachable. Evaluation is the third exposure. Criteria must relate to the subject matter of the contract, be weighted as published, and be scored by an individual then moderated - because a scoring sheet with identical patterns across every criterion and every bidder is not evidence of analysis. Clarifications must go to all bidders simultaneously; a private answer that gives one party an advantage contaminates the whole event regardless of intent. Finally, the award file: the advert, the questions and answers, the individual and moderated scores, the award notice, the standstill period and the debrief. A losing bidder who asks why is entitled to a useful answer, and a file that can give one is a file that rarely gets challenged.',
  why: [
    'A procedurally unsound award can be set aside even when it was the best value. The remedy is not a price adjustment; it is re-tendering, which costs months and re-opens a decision the market has already priced.',
    'Thresholds and procedures are determined by estimated value including options and renewals. Getting that estimate wrong is not a rounding error - it selects the wrong procedure and invalidates everything downstream.',
    'Specification wording excludes silently. A requirement written around one incumbent\'s product eliminates competition before a single bid is received, and the file will show no evidence that anyone considered it.',
    'The audit trail is the only defence available to a person who was not in the room. Where the rationale is reconstructed after challenge rather than recorded at the time, the reconstruction is read as invention.'
  ],
  when: [
    'Buying for a public authority, a utility, a university, a hospital group or any grant-funded programme with procurement conditions attached.',
    'Where a corporate policy mirrors public rules above an internal threshold, or where a joint venture requires documented competition.',
    'Whenever a losing bidder could realistically challenge - high value, an incumbent displaced, or a specification that reads as written for one supplier.',
    'When joining a framework or a group purchasing organisation whose award was made under a regime your own audit will test.'
  ],
  raci: [
    { role: 'Contracting Authority / Procurement Lead', resp: 'Accountable for the procedure chosen, the published documents, and the award decision being defensible on the file alone.' },
    { role: 'Requisitioning Department', resp: 'Responsible for the functional and performance requirements, the estimated value including options and renewals, and any technical evaluation they perform.' },
    { role: 'Legal or Compliance Advisor', resp: 'Responsible for confirming the applicable regime and thresholds, the standstill and debrief obligations, and the treatment of any challenge.' },
    { role: 'Approving Officer / Delegated Authority', resp: 'Accountable for approving the award within the delegation, and for refusing to sign where the evaluation does not match the published criteria.' }
  ],
  inputs: [
    'The applicable regime, its thresholds and the procedures available at that estimated value, including options, renewals and the full contract period.',
    'Functional and performance requirements, with any technical standard referenced stated as "or approved equivalent".',
    'Award criteria with weights published before bids are received, and a scoring methodology each evaluator can apply consistently.',
    'The market: who is capable, whether the lotting strategy keeps the market open, and whether the contract terms make it biddable.',
    'A communications plan for clarifications that reaches every bidder identically, and a schedule that leaves time for a documented standstill period.'
  ],
  outputs: [
    'A published notice and tender pack whose criteria, weights and requirements match what will actually be scored.',
    'Individual and moderated evaluation records with a written rationale per criterion, completed at the time of scoring.',
    'An award report showing the value estimate, the procedure chosen and why, the evaluation outcome, and the reasoning a reviewer can follow.',
    'A complete file: advert, clarifications, scoring, award notice, standstill, contract and debrief records - retained for the statutory period.'
  ],
  controls: [
    'The estimated value is documented with its basis, including options and renewals, and approved before the procedure is selected.',
    'Criteria and weights are published before bids are received and cannot be changed afterwards; any change re-opens the tender.',
    'Technical scoring is completed and moderated before commercial envelopes are opened where the regime or policy requires it.',
    'Clarifications are issued to all bidders simultaneously in writing, with the question log retained.',
    'The standstill period and the debrief obligation are respected, and the award rationale is written at the time rather than reconstructed.'
  ],
  mistakes: [
    'Splitting a requirement into several smaller awards to sit below a threshold. Regulators read this as one requirement with one estimated value, and the finding attaches to the buyer rather than the process.',
    'Writing the specification around the incumbent\'s product, brand or platform name. Even where that product is the best answer, the wording must be functional and the equivalence route must be real.',
    'Publishing weights then scoring on a different basis, or applying a criterion the advert never mentioned. This is the single most common ground on which awards are overturned.',
    'Answering one bidder\'s question privately because it seemed trivial. The information advantage alone is enough to taint the event.',
    'Scoring by consensus in a room instead of individually then moderated, which leaves no record of what each evaluator actually thought.'
  ],
  terms: ['equal treatment', 'proportionality', 'standstill period', 'framework agreement', 'debrief'],
  thinkingPoints: [
    {
      quote: 'In regulated buying the file is the product. The contract is only its outcome.',
      explanation: 'A commercial buyer can defend a decision with the result: it was cheap, it worked, the supplier delivered. A regulated buyer cannot, because the reviewer tests whether the process could have produced a different answer. Every control therefore produces a document, and the quality of the decision is judged on the quality of the record made while it was being taken.',
      realWorldExample: 'An authority awarded a facilities contract at 11 percent below its own budget estimate and defeated a challenge on value. It lost on process: the published award matrix weighted social value at 10 percent, the evaluation panel scored it at 25 percent of the total, and no document explained the change. The contract was re-tendered and the second award landed 4 percent above the first.',
      reflectionPrompt: 'Open your last award file and check whether the weights published in the advert match the weights in the scoring sheet, line for line. If they do not, the gap is the finding.'
    },
    {
      quote: 'A specification that only one supplier can meet is not a technical requirement. It is an award decision made without an evaluation.',
      explanation: 'Requirements written as solutions rather than outcomes close the market before it opens. The remedy is procedural discipline: state the function and the performance needed, reference standards with an equivalence route, and test the draft specification against a market list to see who is excluded and why.',
      realWorldExample: 'A transport body specified a maintenance platform by name for a fleet contract. A market test found two capable providers who could not bid to that wording. Rewritten as performance and availability requirements with an equivalence clause, the same scope attracted seven bids and the price fell 19 percent with no change to the service.',
      reflectionPrompt: 'Name one requirement you wrote in the last year that a competent alternative supplier could not meet. Was that a real technical need, or a description of the incumbent?'
    }
  ],
  sopSteps: [
    {
      title: 'Determine the regime and the true estimated value',
      role: 'Procurement Lead',
      desc: 'Identify the applicable rules, then calculate the estimated value across the full contract period including options, renewals and any repeat orders, and record the basis of the estimate.',
      control: 'The value estimate is approved by the requisitioning owner before the procedure is selected, and re-tested if scope changes.',
      record: 'Value calculation note with period, options included, assumptions and approver.',
      pitfall: 'Estimating on year-one spend, which puts a multi-year contract with renewals below the threshold and selects the wrong procedure from the start.'
    },
    {
      title: 'Select and justify the procedure',
      role: 'Legal or Compliance Advisor',
      desc: 'Choose the procedure the regime allows at that value and record why it is appropriate to the subject matter and the risk, including any decision to divide into lots.',
      control: 'A written procedure rationale sits at the front of the file, and lotting decisions state the access-to-market effect.',
      record: 'Procedure selection note with the legal basis and the lotting rationale.',
      pitfall: 'Choosing a direct award because it is faster, without the exception test being documented - the finding then lands on the approver rather than the process.'
    },
    {
      title: 'Write functional specifications with an equivalence route',
      role: 'Requisitioning Department',
      desc: 'State what the requirement must do rather than what product it must be, reference standards with approved-equivalent wording, and market-test the draft to see who the wording excludes.',
      control: 'Any brand or platform reference carries a written justification and an equivalence clause, and the market test is recorded.',
      record: 'Specification with the market-test note naming who could and could not comply.',
      pitfall: 'Copying the incumbent\'s scope document, which carries their architecture into the requirement and quietly closes the competition.'
    },
    {
      title: 'Publish criteria and weights that will actually be used',
      role: 'Procurement Lead',
      desc: 'Set award criteria relevant to the subject matter, define what each criterion means and how it will be scored, and publish the weights before bids are invited.',
      control: 'The published matrix and the evaluation sheet are checked to be identical before the tender opens, and any change re-opens the event.',
      record: 'Published criteria and weights with the scoring methodology and evaluator guidance.',
      pitfall: 'Defining a criterion so loosely that every evaluator scores it differently, which produces a result no reviewer can follow.'
    },
    {
      title: 'Run clarifications to everyone at once',
      role: 'Procurement Lead',
      desc: 'Log every bidder question, prepare the written answer with the technical owner, and issue the bulletin to all bidders simultaneously inside the stated window.',
      control: 'No substantive answer is given to one bidder, and the question log is retained with the issue dates.',
      record: 'Clarification log with questions, answers, issue date and distribution list.',
      pitfall: 'Answering a trivial-seeming query privately, which creates an information advantage regardless of the intent behind it.'
    },
    {
      title: 'Score individually, then moderate before price',
      role: 'Evaluation Panel Chair',
      desc: 'Have each evaluator score the technical envelopes independently against the published matrix, then moderate the differences in a recorded session, and only then open commercial bids.',
      control: 'Individual sheets are retained, moderation minutes record the reasons for changed scores, and technical scoring is complete before price is visible.',
      record: 'Individual and moderated scoring sheets, moderation minutes, and the combined result.',
      pitfall: 'Panel consensus reached in the room with no individual sheets, which leaves no evidence that the evaluation was an assessment rather than a discussion.'
    },
    {
      title: 'Award, notify, stand still, debrief',
      role: 'Approving Officer',
      desc: 'Approve the award within delegation on the documented result, issue the award notice, observe the standstill period, and give unsuccessful bidders a reasoned debrief when asked.',
      control: 'The award report states the value, procedure, evaluation outcome and reasoning, and no contract is signed before the standstill period ends.',
      record: 'Award report, award notice, standstill record and debrief correspondence.',
      pitfall: 'Signing during the standstill period, which is itself a breach even where the underlying evaluation was sound.'
    },
    {
      title: 'Close and retain the file',
      role: 'Procurement Lead',
      desc: 'Assemble the complete record - notice, pack, questions and answers, scores, moderation, award, contract and debrief - and retain it for the statutory period.',
      control: 'The file is checked against a completeness checklist before closure, and retention follows the statutory rather than internal period.',
      record: 'Closed award file with the completeness checklist signed.',
      pitfall: 'Closing the file when the contract starts, so the working papers held by evaluators and advisers are never collected and cannot be produced later.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'A three-year IT services contract is worth USD 2.4m with two one-year extension options at USD 800,000 each. The open-procedure threshold in your regime is USD 2m.',
      q: 'What is the correct estimated value?',
      options: [
        { text: 'USD 2.4m, since the extensions are not certain to be called.', isCorrect: false, rationale: 'This is the most common error and the one that changes the procedure. Options and renewals that the authority may exercise are counted in the estimate even though they are not guaranteed.' },
        { text: 'USD 4m - the base term plus both extension options - and therefore the full regulated procedure applies.', isCorrect: true, rationale: 'Correct. The estimate covers the maximum exposure the contract can create, including options and renewals, so the threshold test is applied to USD 4m and the more rigorous procedure is required.' },
        { text: 'USD 800,000 per year, since the threshold applies to annual spend.', isCorrect: false, rationale: 'Annualising the value understates the commitment and would select the lightest procedure for the largest exposure.' },
        { text: 'USD 2.4m, but advertise the extensions as a separate future tender.', isCorrect: false, rationale: 'This looks compliant and is usually treated as artificial splitting. If the extensions are options within one contract, they belong in one estimate.' }
      ],
      calcWork: 'Base 2.4m + option 1 0.8m + option 2 0.8m = 4.0m against a 2m threshold - the estimate decides the procedure, so the arithmetic is a compliance step rather than a budget one.',
      principle: 'Estimate the maximum the contract can oblige you to pay. The threshold test is made on that number.'
    },
    {
      type: 'scenario',
      context: 'The tender document names a specific software platform in the technical requirement. A supplier writes to say they cannot comply but can meet the same outcome on another platform.',
      q: 'What is the correct response?',
      options: [
        { text: 'Reject them - the specification is the requirement and compliance is binary.', isCorrect: false, rationale: 'This is specification capture. Where a named product is required without an equivalence route and without justification, the requirement excludes competition on wording rather than on merit, which is the ground on which awards are set aside.' },
        { text: 'Issue a clarification to all bidders rewriting the requirement as performance-based with an approved-equivalent route, and extend the deadline.', isCorrect: true, rationale: 'Correct. The requirement is the outcome, not the platform. Fixing it by bulletin to everyone simultaneously preserves equal treatment, and extending the deadline gives bidders the chance to respond to the changed terms.' },
        { text: 'Allow this supplier to bid their own platform as an alternative while keeping the named requirement for others.', isCorrect: false, rationale: 'A private accommodation for one bidder is unequal treatment, however reasonable the underlying product. The change must apply to everybody.' },
        { text: 'Cancel the tender and start again.', isCorrect: false, rationale: 'Possible if the change is fundamental, but a clarification and extension is usually the proportionate answer. Cancelling costs months and must itself be justified.' }
      ],
      principle: 'Specify the outcome, reference standards with equivalence, and fix exclusion in the open rather than case by case.'
    },
    {
      type: 'scenario',
      context: 'The advert published price 60 percent and quality 40 percent. The panel scores price 50 and quality 50 because the quality differences were small.',
      q: 'What does the file need to show?',
      options: [
        { text: 'A note explaining that the panel applied the published weighting, and that the outcome was the same either way.', isCorrect: true, rationale: 'Correct - and if the weighting was actually changed, the event must be re-opened or the award cannot stand. The test is not whether the result was sensible; it is whether the criteria published before bidding were the criteria applied. A scoring sheet that does not match the advert is the finding.' },
        { text: 'Nothing, since the panel has discretion to weigh its own scoring.', isCorrect: false, rationale: 'There is no discretion to re-weight after bids are known. Doing so means the bidders priced and prepared to a different competition than the one judged.' },
        { text: 'Re-issue the advert with the new weights and give bidders two more days.', isCorrect: false, rationale: 'Re-opening to all bidders on the new basis is the only lawful route if the weighting genuinely must change - two days is not a fair re-bid window and the change still favours whoever reacted fastest.' },
        { text: 'Record the change in the award report as an evaluation refinement.', isCorrect: false, rationale: 'Documentation of a breach is not a cure. The report will show the mismatch between published and applied weights, which is exactly the evidence a challenge needs.' }
      ],
      principle: 'Publish what you will score and score what you published. There is no third option that survives review.'
    },
    {
      type: 'knowledge',
      q: 'Which practice most directly protects an award from being set aside on challenge?',
      options: [
        { text: 'Selecting the lowest-priced compliant bid, since price is objective.', isCorrect: false, rationale: 'Lowest price is defensible only where it was the published criterion. Applying it when quality was weighted is itself a deviation from the published basis.' },
        { text: 'A contemporaneous file: published criteria, individual and moderated scores with written rationale per criterion, simultaneous clarifications, and the observed standstill period.', isCorrect: true, rationale: 'Correct. Challenges are decided on the record made at the time. A file that shows what each evaluator scored, why, and that every bidder held the same information, answers the reviewer without needing anyone to reconstruct events.' },
        { text: 'Getting legal sign-off on the award before notification.', isCorrect: false, rationale: 'Useful, and no substitute. Legal review tests the file; it does not create one.' },
        { text: 'Debriefing unsuccessful bidders only if they ask.', isCorrect: false, rationale: 'Often a minimum obligation rather than good practice. A proactive reasoned debrief reduces the number of challenges that get filed, because bidders understand the gap they had to close.' }
      ],
      principle: 'The defence is written during the process, not after the letter arrives.'
    },
    {
      type: 'scenario',
      context: 'Your hospital group can join a national framework for infusion pumps, or run its own tender. The framework price is 6 percent above your last internal benchmark.',
      q: 'What is the right way to decide?',
      options: [
        { text: 'Join the framework, because it is compliant by construction and faster.', isCorrect: false, rationale: 'Speed and reduced process risk are real benefits, and for a low-capacity team they may be decisive. Deciding on them without testing value is the error - a framework award was made under its own rules, not yours.' },
        { text: 'Test both: check the framework award was made under a regime your audit accepts, price its terms against your demand profile, and record why you chose it or why you ran your own event.', isCorrect: true, rationale: 'Correct. Joining a framework is a decision with its own compliance question - whether the underlying award met your regime - and its own value question, since call-off volumes, terms and the market test differ from yours. Recording the comparison is what makes either answer defensible.' },
        { text: 'Run your own tender, because a 6 percent gap is worth more than the effort.', isCorrect: false, rationale: 'The gap may be illusory once your own event\'s legal, evaluation and delay costs are counted, and your demand may not carry the volume the framework aggregates. Decide after costing both.' },
        { text: 'Negotiate the framework price down before joining.', isCorrect: false, rationale: 'Frequently not permitted - framework terms are usually fixed for members, and a private variation can breach the framework\'s own award basis. Check before assuming the lever exists.' }
      ],
      principle: 'A framework transfers the process risk and inherits the compliance question. Test both before trading them.'
    }
  ],
  relSop: 'sop-rfp',
  rel: {
    concepts: ['public-procurement-rules', 'evaluation-criteria', 'sourcing-strategy', 'audit-trail', 'conflict-of-interest', 'framework-agreement'],
    sops: ['sop-rfp', 'sop-procurement-audit', 'sop-procurement-lifecycle'],
    checklists: ['cl-rfp-preparation', 'cl-procurement-audit', 'cl-award-recommendation'],
    templates: ['tpl-rfp', 'tpl-weighted-scoring', 'tpl-award-recommendation'],
    calcs: ['calc-compare-quotes', 'calc-multi-year-contract-cost', 'calc-tco'],
    decisions: ['rfq-or-rfp', 'competitive-or-single', 'approve-exception'],
    kpis: ['kpi-cycle-time', 'kpi-sourcing-coverage', 'kpi-contract-compliance'],
    glossary: ['gloss-gpo', 'gloss-rfp']
  },
  labMission: {
    title: 'Mission 15.2: Audit One of Your Own Award Files',
    desc: 'Take a live or recent regulated award and test the file against the four things a reviewer looks at first.',
    tasks: [
      'Recalculate the estimated value including options and renewals, and check the procedure chosen was the one your regime requires at that number.',
      'Compare the published criteria and weights against the scoring sheet line by line and note any mismatch.',
      'Use the Weighted Scoring template to rebuild the moderation record, and write the one paragraph a reviewer would need to follow the decision.'
    ],
    ctaLabel: 'Open Weighted Scoring',
    ctaHref: '#/tpl/tpl-weighted-scoring',
    secondaryLabel: 'Open the Procurement Audit SOP',
    secondaryHref: '#/sop/sop-procurement-audit'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-people-time-categories',
  title: 'Contingent Workforce, Agencies and Professional Services',
  module: 'Module 15: Specialised Markets and Category Depth',
  kicker: 'Function 15.3',
  tier: 'practitioner',
  tagline: 'Buying people-time, where the rate card matters less than the engagement model and the supervision rules.',
  desc: 'Contractors, agency teams and professional services are often the largest indirect category a function does not manage. The money is lost in change orders, extensions and off-panel hiring rather than in rates, and the risk is legal rather than commercial: co-employment and worker-status exposure created by how people are directed, not what they are paid for.',
  duration: '25 mins',
  lifecycleStage: 'Category strategy and supplier management',
  lifecycleDesc: 'A category-management function rather than a single event: the controls are the intake route, the card and the extension gate, exercised thousands of times a year.',

  what: 'People-time spend behaves differently from goods spend in three ways. First, the unit price is not the lever. Rates are set by market discipline already, and the money leaks through the number of engagements, the duration, the seniority mix and the change orders that follow an undefined scope. Negotiating a card and then controlling access to it beats negotiating each requisition. Second, the legal question is about direction rather than payment: whether the hiring organisation supervises the person day to day decides whether this is a supply of services or a de facto employment relationship, and that exposure - tax, benefits, employment rights, insurance - is far larger than any rate saving that caused it. So the first decision in every engagement is the model: a deliverables-based statement of work where the supplier directs the work and owns the outcome, or labour supply where the client directs and the contract must say so honestly. Third, the buying route is behavioural. Hiring managers go around procurement because procurement is slower than the agency they already know. The answer is not a stricter approval; it is an intake route faster than the workaround, a panel that covers the disciplines actually used, and rate visibility at the point of request. Managed services add a fourth dimension: when you buy a team rather than individuals, the commercial conversation moves to what the service commits to deliver, how it is measured, and what happens when it fails - which is contract and performance work rather than rate work. Utilisation, extension rate and the ratio of contractors to permanent staff are the three numbers that show whether the category is managed at all, and all three are usually invisible until someone asks.',
  why: [
    'Contingent spend is frequently a company\'s third or fourth largest indirect category and the least governed, because it is requested by hiring managers, approved from departmental budgets and invoiced through project codes rather than purchase orders.',
    'Worker-status and co-employment exposure is asymmetric. A 15 percent rate saving is worth nothing against a reclassification finding covering years of tax, benefits and employer liability across hundreds of people.',
    'The rate card is the durable lever; the individual requisition is not. Card negotiation changes the price of every future engagement and every change order, while per-engagement negotiation is consumed again the next month.',
    'Extensions are where the premium compounds. A three-month engagement rolled four times becomes a permanent cost with contractor pricing and no permanent-hire test, and it is almost never reported as a decision.'
  ],
  when: [
    'When contractor, agency or professional-services spend is material and there is no single intake route or published card.',
    'Before any engagement where the hiring manager will direct the person day to day - that is the status question, and it must be answered before sourcing.',
    'When extension rates are high, or when the same roles recur quarter after quarter, which is a resourcing decision being made by default.',
    'When buying a managed team or embedded service, where the deliverable, the measure and the remedy matter more than the day rate.'
  ],
  raci: [
    { role: 'Hiring Manager', resp: 'Responsible for the need, the supervision model, the budget line and the deliverables or skills requested; the person who creates status risk by how they direct the work.' },
    { role: 'Contingent Workforce Programme Manager', resp: 'Accountable for the intake gate, the rate card, the panel, and the monthly population report of headcount, spend, utilisation and extension rate.' },
    { role: 'Category Manager', resp: 'Responsible for negotiating the card and the panel, and for supplier performance on service rather than price.' },
    { role: 'HR Compliance and Legal', resp: 'Accountable for the engagement-model decision, the status assessment per country, background and insurance requirements, and the contract type that matches the model.' }
  ],
  inputs: [
    'The population: every current engagement with role, seniority, location, supplier, rate, start date, end date, extension history and who directs the work.',
    'The engagement model decision for each request, recorded before sourcing: deliverables under supplier direction, or labour supply under client direction.',
    'A rate card by role, seniority and location, benchmarked to the market you actually buy in rather than to a national average.',
    'The panel: which suppliers cover which disciplines and locations, their service levels, and the route for an off-panel need.',
    'Compliance requirements per country: right-to-work, screening, insurance, and any sector-specific registration or licence.'
  ],
  outputs: [
    'A single intake route that is faster than the direct call to a supplier, with the engagement model captured as the first field.',
    'A negotiated rate card and a panel with service commitments, priced by discipline and location rather than by individual requisition.',
    'A monthly population report: contingent headcount and spend by department, utilisation, extension rate, and the ratio against permanent staff.',
    'A permanent-hire test at a stated duration, so a rolling engagement becomes a decision rather than an accident.'
  ],
  controls: [
    'No engagement starts without an intake record, an approved engagement model and completed clearances.',
    'Rates come from the card; any deviation is approved in writing above the standard delegation and reported.',
    'Extensions beyond the stated threshold are approved outside the requesting line and include a permanent-hire test.',
    'Off-panel engagement follows an exception route with the same compliance checks, and the exception is reported monthly.',
    'The population report is reconciled to finance accruals each month, so invoice-based reporting cannot miss off-route work.'
  ],
  mistakes: [
    'Contracting directly with an individual rather than through a supplier or an umbrella structure, which moves employment exposure onto the hiring organisation.',
    'Writing a deliverables-based contract and then supervising the person daily. The document does not change the facts, and the facts are what a review tests.',
    'Negotiating the rate for each engagement instead of the card, which leaves the same premium to be paid on the next thousand requests.',
    'Reporting contingent spend from purchase orders only, which misses expense-claimed and project-coded work and understates the category by a third or more.',
    'Setting a panel that covers the disciplines procurement expects rather than the ones the business actually requests, which guarantees off-panel spend.'
  ],
  terms: ['rate card', 'statement of work', 'co-employment', 'utilisation', 'extension rate'],
  thinkingPoints: [
    {
      quote: 'You do not control contingent spend by approving it. You control it by being faster than the phone call.',
      explanation: 'The hiring manager has a deadline, a colleague who used an agency last quarter, and a budget line. Procurement\'s approval step is not a control in that situation - it is a delay that produces workarounds, off-panel suppliers and spend that never appears in a report. The control that works is an intake route that turns a request around in days, with a panel that already covers what people ask for.',
      realWorldExample: 'A technology company with 1,400 contingent engagements across 40 suppliers moved to three managed inventory vendors against a published card and a four-day intake. Direct-supplier requests fell not because they were blocked but because the panel route was faster and the card was visible at request time. Nine percent of the category came back without a single rate reduction.',
      reflectionPrompt: 'How long does your compliant route take from request to start, and how long does the workaround? If the workaround is faster, that is the finding - not the compliance rate.'
    },
    {
      quote: 'The contract type is a description of reality. If the supervision does not match it, the document is the evidence against you.',
      explanation: 'A statement of work implies the supplier directs how the outcome is achieved. If your manager sets the hours, the methods, the tools and the daily priorities, then the arrangement is labour supply whatever the paper says, and the reclassification exposure sits with you. The honest question at intake is who directs the work, and the answer must drive the contract, the rate basis and the checks.',
      realWorldExample: 'A professional-services firm engaged analysts under a deliverables contract while a client-side manager allocated their day. A tax review reclassified forty engagements across two years. The cost was not the rate difference - it was employer contributions, penalties and the redesign of how every future engagement was contracted.',
      reflectionPrompt: 'Pick three current engagements and ask who actually directs the work day to day. Does the contract type match the answer for each one?'
    }
  ],
  sopSteps: [
    {
      title: 'Decide the engagement model before sourcing anyone',
      role: 'Hiring Manager',
      desc: 'State whether the supplier delivers an outcome under its own direction or supplies labour under the hiring manager\'s direction, and record who sets the day-to-day priorities.',
      control: 'HR Compliance reviews the model where the client directs the work, and the contract type must match the recorded answer.',
      record: 'Engagement model statement with the supervision basis and the approver.',
      pitfall: 'Choosing a deliverables contract because it looks cleaner, then supervising the person daily - which is the exact pattern a status review tests.'
    },
    {
      title: 'Register the request through one intake route',
      role: 'Contingent Workforce Programme Manager',
      desc: 'Log role, seniority, location, duration, budget line and the reason a permanent hire is not the answer, and do not confirm a start date without the record.',
      control: 'The intake route turns requests around faster than a direct supplier call, which is what makes it the route people choose.',
      record: 'Intake register entry with the approved budget line.',
      pitfall: 'Allowing a start date to be agreed first and the paperwork to follow, which removes the only gate that actually exists.'
    },
    {
      title: 'Price from the card, not the conversation',
      role: 'Category Manager',
      desc: 'Apply the published rate for the role, seniority and location, and require written approval above standard delegation for any deviation, with the reason recorded.',
      control: 'Deviations are reported monthly by department, so a pattern of exceptions becomes visible rather than accumulating quietly.',
      record: 'Rate line with the card reference and any approved deviation.',
      pitfall: 'Negotiating each requisition individually, which spends effort on the visible rate while the card - the price of every future change order - stays unmanaged.'
    },
    {
      title: 'Select from the panel or record the exception',
      role: 'Category Manager',
      desc: 'Choose a panel provider covering the discipline and location, and where none does, route the off-panel need through a written exception with the same compliance checks.',
      control: 'Panel coverage is reviewed against actual demand by discipline and location each quarter, since coverage gaps are what create off-panel spend.',
      record: 'Provider selection note or approved exception with the coverage gap that caused it.',
      pitfall: 'Treating off-panel work as a discipline failure rather than as evidence that the panel does not cover what the business asks for.'
    },
    {
      title: 'Complete clearances before the start date',
      role: 'HR Compliance',
      desc: 'Confirm right-to-work, background screening, insurance certificates, site or security requirements and any sector registration, and hold the start until all are recorded.',
      control: 'No engagement starts on a promise that paperwork will follow.',
      record: 'Compliance clearance pack per engagement with dates.',
      pitfall: 'Running checks after the person starts because the business needed them yesterday, which converts a control into a retrospective finding.'
    },
    {
      title: 'Treat every extension as a priced decision',
      role: 'Contingent Workforce Programme Manager',
      desc: 'Review each extension before the current end date with cumulative cost, original duration and the reason the need persists, and apply a permanent-hire test beyond the stated threshold.',
      control: 'Approval above the threshold sits outside the requesting line, and the cumulative position is shown at the point of decision.',
      record: 'Extension decision record with cumulative cost and the permanent-hire test result.',
      pitfall: 'Allowing rolling three-month extensions to become a permanent capability priced as a temporary one.'
    },
    {
      title: 'Report the population, not the invoices',
      role: 'Contingent Workforce Programme Manager',
      desc: 'Publish monthly headcount, spend, utilisation and extension rate by department, reconciled to finance accruals so off-route work is included rather than assumed away.',
      control: 'Reconciliation to accruals is the control that catches expense-claimed and project-coded engagements.',
      record: 'Monthly population report with the accrual reconciliation and the trend.',
      pitfall: 'Reporting only purchase-order spend, which understates the category and reassures everyone about a number nobody can act on.'
    },
    {
      title: 'Close out access and the record together',
      role: 'Hiring Manager',
      desc: 'End system access, confirm final timesheets and invoices, return equipment and badges, and record the closure against the engagement in the population report.',
      control: 'Closure is evidenced rather than assumed from the contract end date.',
      record: 'Exit confirmation with final invoice and access revocation.',
      pitfall: 'Leaving access and a supplier contact active after the engagement ends, which is where unauthorised spend and status exposure both appear.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'A data team needs three analysts for six months. The hiring manager will assign their daily work and set priorities. Procurement offers a deliverables-based statement of work or a labour-supply contract.',
      q: 'Which is correct?',
      options: [
        { text: 'The statement of work, because it transfers risk to the supplier and reads better on file.', isCorrect: false, rationale: 'It describes an arrangement that is not the one being made. The contract type has to match who directs the work; when it does not, the document becomes evidence of misclassification rather than protection against it.' },
        { text: 'The labour-supply contract, because the client is directing the work day to day, with the status, insurance and supervision rules that follow.', isCorrect: true, rationale: 'Correct. Direction is the test. Naming the arrangement honestly sets the right contract, the right checks, the right rate basis and the right supervision model - and it lets you decide deliberately whether you want to direct at all.' },
        { text: 'Either, provided the rate is the same and the supplier issues the invoice.', isCorrect: false, rationale: 'The invoice flow and the rate do not determine status. This is the assumption behind most reclassification findings.' },
        { text: 'A statement of work with a daily stand-up attendance clause to keep it flexible.', isCorrect: false, rationale: 'This makes the mismatch explicit and documented: a deliverables contract with client-directed routines is the clearest possible pattern for a reviewer to test.' }
      ],
      principle: 'Contract type follows who directs the work. Everything else is a description you cannot defend.'
    },
    {
      type: 'scenario',
      context: 'You can cut every contingent rate by 4 percent, or take 30 percent out of the change-order and extension premium by controlling scope and duration. The category is USD 26m.',
      q: 'Where should the effort go?',
      options: [
        { text: 'The 4 percent rate reduction, because it is measurable and lands in this financial year.', isCorrect: false, rationale: 'It is real money - about USD 1.04m - and it is the easy number to report. It is also the part of the cost already set by market discipline, so it is the hardest value to repeat next year.' },
        { text: 'The change-order and extension premium, because it is a governance gain that repeats and does not depend on supplier agreement.', isCorrect: true, rationale: 'Correct. Roughly USD 7.8m sits in scope creep and unexamined extensions. Controlling it needs an intake gate, a card, an extension approval outside the requesting line and a permanent-hire test - all internal, all durable, and none of them requiring a supplier to concede anything.' },
        { text: 'Both are equal, so split the team evenly.', isCorrect: false, rationale: 'Not really. The rate lever is a negotiation with a ceiling; the governance lever changes the price of every future request. Splitting effort evenly is how the harder but larger prize goes unmanaged.' },
        { text: 'Neither yet - consolidate 40 suppliers to three first.', isCorrect: false, rationale: 'Consolidation is often the enabler rather than the prize, and it can be the third step. Doing it without the card and the gate simply gives three suppliers the same unmanaged demand at slightly better rates.' }
      ],
      calcWork: 'USD 26m at 4 percent is USD 1.04m. The 30 percent of premium on change orders and extensions is roughly USD 7.8m - and it is removed by internal control rather than by concession.',
      principle: 'In people-time categories, governance beats negotiation. The premium is created by your own process, not by the supplier\'s price.'
    },
    {
      type: 'knowledge',
      q: 'Which three measures tell you whether a contingent-workforce category is actually managed?',
      options: [
        { text: 'Total spend, number of suppliers, and average rate.', isCorrect: false, rationale: 'All three describe size rather than control, and all three can look good while the category is entirely unmanaged.' },
        { text: 'Utilisation, extension rate, and off-panel share of engagements.', isCorrect: true, rationale: 'Correct. Utilisation shows whether you are paying for capacity you use; extension rate shows whether temporary need has become permanent by default; off-panel share shows whether the compliant route is the one people actually use. Together they describe behaviour rather than budget.' },
        { text: 'Purchase-order compliance, invoice accuracy, and cycle time.', isCorrect: false, rationale: 'Useful operational hygiene, and blind to the category: much contingent work is claimed through expenses or project codes and never appears in a purchase-order metric.' },
        { text: 'Spend under management, savings delivered, and cost avoidance.', isCorrect: false, rationale: 'Standard category reporting that measures the claim rather than the control, and it can be reported without anyone knowing how many people are actually engaged.' }
      ],
      principle: 'Manage people-time categories by the behaviour metrics: utilisation, extensions and off-panel share.'
    },
    {
      type: 'scenario',
      context: 'Your contingent spend report shows USD 14m. Finance accruals for the same period show USD 21m of contractor and agency cost.',
      q: 'What does the gap most likely mean?',
      options: [
        { text: 'Finance is double-counting overheads.', isCorrect: false, rationale: 'Possible and worth ruling out, but a 50 percent gap is far more likely to be visibility than an accounting error.' },
        { text: 'A material part of the category is being bought outside the purchase-order route - expenses, project codes, direct supplier contact - and is therefore outside every control you have.', isCorrect: true, rationale: 'Correct. This is the normal finding in an unmanaged category. It means the panel, the card, the clearances and the extension gate are not reaching a third of the spend, and it is the number to fix before negotiating anything.' },
        { text: 'The panel suppliers are invoicing late.', isCorrect: false, rationale: 'Timing explains a period difference, not a persistent structural gap of this size.' },
        { text: 'Rates have risen faster than the report assumed.', isCorrect: false, rationale: 'Rate movement changes value, not population. A gap of this shape is about engagements you cannot see.' }
      ],
      principle: 'Reconcile the population to accruals first. You cannot manage a category you can only see two-thirds of.'
    },
    {
      type: 'scenario',
      context: 'A marketing agency\'s retainer is 12 percent below market, and 31 percent of it is given back in change orders within two quarters.',
      q: 'What is the correct commercial response?',
      options: [
        { text: 'Re-tender the retainer to capture the market gap properly.', isCorrect: false, rationale: 'The retainer is already below market. Re-tendering the wrong object repeats the problem with a new supplier and costs continuity on the way.' },
        { text: 'Fix the scope definition: deliverables, quantities, revision rounds, approval gates, usage rights and a priced change-control route.', isCorrect: true, rationale: 'Correct. The loss is in what the brief never defined - what counts as a revision, who approves creative, what usage you own and what a change costs. That work is unglamorous and it is where the 31 percent lives.' },
        { text: 'Cap change orders at 10 percent of the retainer by contract.', isCorrect: false, rationale: 'A cap without a scope definition does not stop the work; it moves it into a second brief, a new project number or a supplier relationship your finance team never sees.' },
        { text: 'Move to project-based pricing so every piece of work is quoted.', isCorrect: false, rationale: 'Often worse: it removes the retainer\'s capacity economics and multiplies transaction cost across hundreds of small quotes.' }
      ],
      calcWork: 'A 12 percent retainer advantage on USD 3m is about USD 360,000. The 31 percent change-order give-back on the same base is roughly USD 930,000 - nearly three times the prize being negotiated.',
      principle: 'In creative and agency spend, scope definition is the commercial lever. The rate is a rounding error next to it.'
    }
  ],
  relSop: 'sop-contingent-labour',
  rel: {
    concepts: ['contingent-workforce', 'agency-scope-brief', 'statement-of-work', 'c-maverick-spend', 'demand-management'],
    sops: ['sop-contingent-labour', 'sop-supplier-evaluation'],
    checklists: ['cl-supplier-due-diligence', 'cl-supplier-onboarding', 'cl-exception-approval'],
    templates: ['tpl-supplier-onboarding', 'tpl-contract-change-request', 'tpl-business-case'],
    calcs: ['calc-make-vs-buy', 'calc-budget-vs-actual', 'calc-kpi-calculator'],
    decisions: ['make-or-buy', 'approve-exception'],
    kpis: ['kpi-maverick-spend', 'kpi-contract-coverage', 'kpi-cycle-time'],
    glossary: ['gloss-rate-card', 'gloss-co-employment', 'gloss-change-order', 'gloss-sow']
  },
  labMission: {
    title: 'Mission 15.3: Find the Invisible Third',
    desc: 'Reconcile your own contingent or agency spend against finance data, then decide which of the three real levers to pull first.',
    tasks: [
      'List every engagement you can see in procurement systems, then compare the total against what Finance accrues for the same period.',
      'Open the Make-or-Buy calculator on one recurring role and test whether the temporary arrangement is actually cheaper than the permanent alternative.',
      'Write the one control you would install first: the intake gate, the rate card, or the extension approval outside the requesting line.'
    ],
    ctaLabel: 'Open Make-or-Buy',
    ctaHref: '#/calc/calc-make-vs-buy',
    secondaryLabel: 'Open the Contingent Labour SOP',
    secondaryHref: '#/sop/sop-contingent-labour'
  }
});
