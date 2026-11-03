/* ==========================================================
   Procure Sherpa v3.0 - Academy Module 22: Category Depth II -
   Energy, Works and Creative Markets. Module 15 taught three
   specialised markets (freight and duty, regulated procurement,
   contingent labour). These are three more, chosen because each
   has a commercial structure a general buyer meets for the first
   time and gets wrong: energy, where the price you agree is not
   the price you pay; construction, where the contract form decides
   who owns the risk before anything is built; and marketing, where
   the agency model determines whether the saving you booked was a
   saving at all. Written with no apostrophes, since these strings
   are single quoted and the build reads them literally.
   ========================================================== */

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-energy-utility-procurement',
  title: 'Energy and Utilities: Why the Price You Agree Is Not the Price You Pay',
  module: 'Module 22: Category Depth II - Energy, Works and Creative Markets',
  kicker: 'Function 22.1',
  tier: 'practitioner',
  tagline: 'In most categories the unit price is the answer. In energy it is only the beginning of a calculation about shape, timing and what happens after the term ends.',
  desc: 'This function covers how electricity and gas contracts are actually built - commodity against delivery, fixed against index, block against structured - what a load profile does to a price, how hedging changes the distribution of outcomes rather than the average one, and where the renewable claims in a supply contract really come from. It covers the timing question honestly, since nobody can call a market bottom, and it covers the failure that is most common in this category: comparing two supplier offers that are not the same product.',
  duration: '28 mins',
  lifecycleStage: 'Stage 3: Category Sourcing Strategy',
  lifecycleDesc: 'Decided at strategy, because the shape of the contract - what is fixed, what is passed through, for how long - is the whole commercial position.',

  what: "Energy looks like the simplest negotiated category in a company - a price per unit times the units you use - and it is the easiest place to make a structural error, because the bill you receive is the sum of several different products, only one of which the contract fixes. Start by separating them. The commodity is the energy itself. The network charges are the cost of the wires and pipes that deliver it, set by a regulator, recovered per unit or per capacity, and outside supplier control. There are policy levies and social obligations, again pass-through, again not negotiable, often changing on a calendar the buyer does not own. Then there are metering, data and balancing costs. A buyer who compares two offers on the commodity line alone is comparing prices; a buyer who compares them on total delivered cost is comparing contracts. This distinction kills more energy savings than any negotiation failure, because the marketing number is always the commodity number. The second structural fact is shape. Two sites with identical annual consumption can have very different costs, because the wholesale price of electricity at 7am on a cold Wednesday is not the price at 3am on a warm Sunday. Your half-hourly or interval profile is therefore a commercial document: a flat, predictable base load is cheap to supply, while a sharp peaking load concentrated in cold morning hours is expensive and is where supplier margin hides. Profiling before tendering changes the outcome more than pressuring the quote. If a site can shift load out of peak windows - pre-cool, batch processes, stagger charging - it is buying a cheaper product, not the same product cheaper. The third is the choice between fixed and index. A fixed price is a hedge: you pay the supplier for certainty, and the price includes the cost of the option you are buying plus their margin and their credit risk premium. An index-linked contract passes volatility through and removes that premium, but it leaves the buyer exposed to a market that can move by a multiple within a quarter. Neither is correct in the abstract. The question is which distribution of outcomes the organisation can absorb, and that is a treasury and budget question rather than a procurement one - which is exactly why this category is where procurement and finance have to agree in writing. A useful middle position many buyers meet for the first time is layering: fixing successive tranches of volume at intervals rather than all at one point, which spreads timing risk the way diversification spreads it in a portfolio, and a collar: a band within which the index is passed through, with caps and floors that cost something but bound the outcome. Be honest about the timing question. Everyone who buys energy is told they should have bought last year, and the temptation is to treat a price peak as a signal you can time. You cannot. The defensible position is a written hedging policy - what share of forecast volume is fixed, over what horizon, at what trigger, approved before the market moves - so that the decision is judged against the policy rather than against the price printed the day after. Fourth: renewals. The largest single number in this category is usually the price you did not notice, because the contract lapsed onto deemed or out-of-contract rates, which in most markets are punitive and are charged by default rather than by agreement. A register of meter points, contract end dates, notice windows and who signs the renewal is not administrative busywork; it is the control that prevents the most expensive common failure in energy buying. Structure also matters at the site level: whether you aggregate multiple premises with different profiles into one portfolio, whether you tender the sites together or in blocks, and whether you can move a site between suppliers at all. Aggregating smooths the portfolio and usually prices better, and it also means one bad site drags the average. Fifth, the renewable part, which is where the most confident errors occur. A supplier can sell you unbundled certificates - a document proving that some renewable generation was fed somewhere into a grid - alongside physical electricity that is whatever the mix happens to be at your meter. A bundled product delivers renewable generation matched to your consumption on some stated basis. A corporate power purchase agreement is a longer, real commitment to a specific project, and its value depends on the additionality of that project, on curtailment, on settlement against a reference price, and on whether the geography actually helps your reported position. None of this means avoid the claim; it means know which claim you are buying and be able to state the basis. A reported reduction that rests on unbundled certificates is a financial transaction with an environmental label, and it belongs in the column labelled offsets, not in the column labelled energy saved. Finally, what a good process looks like here: know your volumes and your shape before you talk to anyone; separate commodity from pass-through in every comparison; agree the hedging policy with finance in advance and minute the decision; keep a renewal register with notice dates and named owners; and treat demand-side measures - control systems, metering quality, sub-metering, load shifting - as the category work, because those reduce the bill for certain, while a cleverly timed contract only reduces it on average.",
  why: [
    'The delivered bill is commodity plus network plus policy plus metering and balancing, and only the commodity line is negotiable, so a comparison on the headline rate is a comparison of prices rather than contracts.',
    'Shape changes price: two sites with the same annual kWh can cost materially different amounts, so the interval profile is a commercial document, not an engineering attachment.',
    'Fixed and index-linked are two answers to a question the organisation should have settled in advance - which distribution of outcomes can the budget absorb.',
    'Renewal failure, not negotiation failure, produces the largest number in this category: lapsed sites move to punitive default rates and nobody agreed to them.',
    'An unbundled certificate is a document about generation elsewhere, and reporting it as an emissions reduction confuses a purchase with a change in the supply.'
  ],
  when: [
    'Six to twelve months before a portfolio of supply contracts expires, which is when a hedging policy is still a decision rather than a reaction.',
    'When opening, closing or re-rating sites, or when a process change alters the load shape.',
    'When a supplier offers a green product and the reported position depends on which kind of green it is.',
    'When the organisation wants a green energy claim in an external report, because the basis has to survive the assurance process.',
    'When a bill arrives that does not reconcile to the contract, since pass-through charges are where most of the value quietly drifts.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Owns the portfolio strategy, the tender structure and the comparison basis across commodity and pass-through.' },
    { role: 'Facilities or Energy Manager', resp: 'Supplies interval data, controls the metering estate and identifies load-shifting options.' },
    { role: 'Finance or Treasury', resp: 'Sets the hedging policy, approves the fixed share and holds the exposure decision.' },
    { role: 'Sustainability Lead', resp: 'Defines the basis on which a renewable claim can be reported and assurance-tested.' },
    { role: 'Site Operations', resp: 'Executes the demand measures the contract economics assumed, and reports when they cannot be done.' }
  ],
  inputs: [
    'Interval or half-hourly consumption per meter point, with annual volumes and the peak shape.',
    'Current contract register: term dates, notice periods, structure, pass-through treatment and credit arrangements.',
    'Supplier offers separated into commodity, network, policy and metering lines on the same date basis.',
    'The hedging policy and the approved band for volume, tenor and timing.'
  ],
  outputs: [
    'A like-for-like comparison of delivered cost per site and per portfolio, with the pass-through lines shown separately.',
    'A written award recommendation naming the fixed share, the tenor, the timing rule and the exposure retained.',
    'A renewal register with notice dates, owners and the consequence of a lapse.',
    'A statement of the renewable basis actually purchased, kept with the contract so a reported claim can be evidenced.'
  ],
  controls: [
    'Every comparison is on delivered cost with the non-negotiable lines shown, never on the headline commodity rate.',
    'The fixed share and tenor come from an approved policy agreed with finance before tendering, not from a view on the market.',
    'Notice dates are held in a register with a named owner, and a lapse is treated as a control failure rather than bad luck.',
    'A renewable claim states its basis - bundled, unbundled or contractual - and no claim is reported without that basis on file.'
  ],
  bestPractices: [
    'Profile before you price: fix the shape question first, because it changes what the tenders can offer.',
    'Layer the volume across windows rather than fixing everything on one day, and record the rule so the next buyer follows it.',
    'Value demand-side measures against the hedged contract, since a kilowatt hour not used is the only certain price reduction available.',
    'Read the pass-through schedule at renewal, because that is where costs drift without anyone signing anything.'
  ],
  mistakes: [
    'Comparing suppliers on the commodity headline while their network, policy or metering treatment differs.',
    'Treating a fixed price as the safe option and an index contract as the risky one, without asking which exposure the budget can absorb.',
    'Assuming a green tariff reduces the reported footprint, when the physical supply and the certificate are separate products.',
    'Letting sites lapse into default rates while the tender is still running, then booking the saving as though the market gave it.'
  ],
  terms: [
    { term: 'Load profile', def: 'The shape of consumption across time, which determines cost as much as volume does and can be changed by operating practice.' },
    { term: 'Pass-through charges', def: 'Network, policy and metering costs recovered by the supplier but not set by it, and therefore not meaningfully negotiable.' },
    { term: 'Layering', def: 'Fixing successive tranches of forecast volume at intervals so that timing risk is spread rather than concentrated on one decision.' },
    { term: 'Bundled and unbundled certificates', def: 'Renewable attributes delivered with the energy against attributes bought separately from generation elsewhere.' }
  ],

  thinkingPoints: [
    {
      quote: 'The lowest quote was the highest bill.',
      explanation: 'A buyer selected a supplier on a headline rate 9 percent below the incumbent. The comparison had not been made on delivered cost: the new contract priced metering separately, applied a different standing charge, and treated one site with a sharp morning peak as an unmetered assumption rather than as interval data. Twelve months later the reconciled bill was above the old one.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: in this category the offer sheets are not the same product, and the differences sit in the lines the marketing does not print.',
      reflectionPrompt: 'If two supplier offers were laid out line by line today - commodity, network, policy, metering, standing charges - could you compare them without asking anyone for a missing figure?',
    },
    {
      quote: 'The claim that was a purchase.',
      explanation: 'A site reported a renewable electricity position based on certificates supplied with its tariff. On assurance review the certificates were unbundled: the generation they represented was fed into a different grid region, and the physical supply at the meter was the ordinary market mix. The reporting position was defensible only if described accurately, which is not how it had been described.',
      realWorldExample: 'Illustrative example: buying an attribute and changing your supply are different transactions, and a report that treats them alike will not survive being read closely.',
      reflectionPrompt: 'For the environmental claim your organisation publishes about electricity, who can name the basis, and could they evidence it from the contract file?',
    }
  ],

  sopSteps: [
    { title: 'Build the portfolio register before talking to suppliers', role: 'Category Manager',
      desc: 'List every meter point with its contract end date, notice period, structure and current pass-through treatment. The register decides when work must start, and it is the only artefact that prevents a lapse into default rates.',
      control: 'Every supply point has an end date, a notice window and a named owner, and nothing is allowed to expire without an approved decision.',
      record: 'Renewal register with site, term, notice date, owner and the decision taken at each review.',
      pitfall: 'Starting the tender when the contract ends rather than when the notice window opens, which removes the alternative exactly when it is needed.'
    },
    { title: 'Obtain interval data and describe the shape', role: 'Facilities or Energy Manager',
      desc: 'Get half-hourly or profile-class data for each significant site and state the peak windows, weekend behaviour and any processes that could move. Where interval data is unavailable, say so, because a assumed profile is a pricing risk the buyer carries.',
      control: 'Every tender pack states the data basis per site, distinguishing measured interval data from an assumed profile.',
      record: 'Profile pack per site with data source, coverage period and identified flexibility.',
      pitfall: 'Tendering on annual kWh alone, which hides the peaking behaviour that determines what suppliers can offer.'
    },
    { title: 'Agree the hedging policy with finance in writing', role: 'Finance or Treasury',
      desc: 'Set the share of forecast volume to be fixed, the tenor, the timing rule and the exposure the organisation accepts on the remainder. Approve it before offers arrive, so the decision is judged against the policy rather than against the price printed the next day.',
      control: 'The fixed share, tenor and trigger are approved by finance before tender and any deviation is a recorded decision above the buyer.',
      record: 'Hedging policy with approved bands, the decision minutes and the retained exposure stated in money.',
      pitfall: 'Treating a fixed price as inherently safe, when it is a paid option whose cost only becomes visible in a falling market.'
    },
    { title: 'Rebuild every offer on delivered cost', role: 'Category Manager',
      desc: 'Take each quote and lay it out on one template: commodity, network, policy levies, metering, standing charges, and any pass-through the supplier does not control. Compare totals for the same period, same sites, same data basis.',
      control: 'No offer enters evaluation until it has been restated on the common delivered-cost template with its assumptions shown.',
      record: 'Comparison workbook with one row per site, the lines separated, and the assumptions behind each.',
      pitfall: 'Reviewing the headline rate because it is the only figure that appears identically in both proposals.'
    },
    { title: 'Test the demand-side measures before the price', role: 'Site Operations',
      desc: 'Identify what can be shifted out of peak, what controls are wasting energy and what sub-metering would make visible, and price the measures against the hedged contract. A kilowatt hour avoided has no market risk.',
      control: 'Each demand measure carries an owner, a cost, a verification method and a saving expressed in units rather than in currency.',
      record: 'Demand measure list with baseline, expected unit saving and the check that proves it happened.',
      pitfall: 'Booking contract savings while consumption drifts, so that the reported position reverses a year later.'
    },
    { title: 'State the renewable basis in the contract file', role: 'Sustainability Lead',
      desc: 'For whichever product is bought, record whether attributes are bundled with supply or purchased separately, from which generation, for which period, and what is being reported. Assurance will ask, and the answer has to come from the file rather than from memory.',
      control: 'No renewable claim is used in a report unless the contract file states the basis, the period and the certificate type.',
      record: 'Attribute statement attached to the award, with the reporting wording it supports.',
      pitfall: 'Describing an unbundled certificate purchase as a reduction in the supply footprint.'
    },
    { title: 'Reconcile the first three bills and correct the base', role: 'Finance or Treasury',
      desc: 'Check the delivered bills against the awarded contract line by line, including pass-through and metering. Discrepancies in this category are common, and reconciliation in the first quarter is what keeps the saving real rather than nominal.',
      control: 'Reconciliation is a scheduled activity for the first three billing periods and any variance is raised formally with the supplier.',
      record: 'Bill reconciliation with variances, the supplier response and any credit obtained.',
      pitfall: 'Assuming the contract and the bill are the same document, then discovering the drift at the next renewal.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'Two supplier offers sit in front of a buyer. Offer A is 8 percent cheaper on the commodity rate. Offer B prices metering inside its rate, has a lower standing charge, and prices one peaking site on interval data while Offer A uses a standard profile assumption.',
      q: 'What must happen before either can be selected?',
      options: [
        { text: 'Select A, since the commodity rate is the part being negotiated.', isCorrect: false, rationale: 'That is the line both offers present in the same format, and it is the reason they look comparable when they are not.' },
        { text: 'Restate both on a common delivered-cost template with the same sites, period and data basis, then compare totals.', isCorrect: true, rationale: 'Correct. The comparison has to be built, not accepted. Once metering, standing charges and the profile assumption are on the same basis, the 8 percent may survive, reverse, or vanish.' },
        { text: 'Ask both suppliers to match the other on the disputed lines.', isCorrect: false, rationale: 'Suppliers will quote for the structure that suits them; the buyer needs a single basis decided before asking.' },
        { text: 'Split the portfolio between them so both prices are captured.', isCorrect: false, rationale: 'Splitting is a legitimate structure but it is a separate decision, and it does not answer which offer is cheaper.' }
      ],
      calcWork: 'A rough reconciliation: 8 percent on commodity only, against metering charged separately and a standing charge difference across every site-day, can easily exceed the headline gap on a low-volume site with high fixed charges.',
      principle: 'In energy, compare delivered cost built on one template. The printed rate is a line item, not the contract.',
    },
    {
      type: 'scenario',
      context: 'Finance asks procurement to lock 100 percent of next year volume at a fixed price because a market peak has been in the news. The hedging policy on file says fix 60 percent across two windows and retain exposure on the rest.',
      q: 'What is the correct response?',
      options: [
        { text: 'Lock 100 percent, since finance asked and prices may rise further.', isCorrect: false, rationale: 'That is a market call made after the news, replacing a policy nobody can be judged against with a decision that will be judged against tomorrow price.' },
        { text: 'Refuse and follow the policy exactly as written, without telling finance.', isCorrect: false, rationale: 'The policy exists to be followed, but a request to change exposure is a governance event and it has to be recorded rather than quietly declined.' },
        { text: 'Follow the policy, and if the organisation wants to change the retained exposure, have that decided and minuted above the buyer as a policy deviation with the exposure stated in money.', isCorrect: true, rationale: 'Correct. Either outcome is defensible when it is decided against a stated rule; only the unrecorded one is not. Naming the exposure in currency is what makes the conversation real.' },
        { text: 'Compromise at 80 percent fixed to keep everyone content.', isCorrect: false, rationale: 'A number chosen to split the difference is not a policy, and it inherits the criticism of both positions.' }
      ],
      principle: 'A hedging position is a decision about risk the organisation accepts, so it belongs in an approved policy with a minute - not in a reaction to a headline.',
    },
    {
      type: 'scenario',
      context: 'A supplier proposes a tariff that lets the buyer pay for renewable certificates while the physical electricity remains the standard market mix, at a price well below the bundled renewable product.',
      q: 'How should this be handled?',
      options: [
        { text: 'Buy it, since the certificates make the position renewable.', isCorrect: false, rationale: 'The certificates attest to generation elsewhere. The description matters, and calling it a renewable supply is the error.' },
        { text: 'Buy it if the organisation wants that outcome, but record the basis, use wording that matches it, and never report it as a reduction in the energy footprint.', isCorrect: true, rationale: 'Correct. Unbundled attributes are a legitimate purchase with a narrow meaning. The control is honest description in the file and in the report, which is what survives assurance.' },
        { text: 'Reject both products and buy on price only.', isCorrect: false, rationale: 'That avoids the decision rather than making it, and it leaves the reporting question unresolved.' },
        { text: 'Ask the supplier to confirm in writing that the product is renewable.', isCorrect: false, rationale: 'A supplier letter cannot change what the product is, and it becomes the document that gets read out later when the basis is questioned.' }
      ],
      principle: 'Attribute products vary in what they attest to. State the basis in the contract file before the reporting team needs it.',
    },
    {
      type: 'scenario',
      context: 'A site can shift roughly 15 percent of consumption out of the morning peak window with no capital spend, by staggering three processes. The energy tender closes next week.',
      q: 'What is the right move?',
      options: [
        { text: 'Skip it, since the contract price is what determines the bill.', isCorrect: false, rationale: 'Shape determines the price a supplier can offer, which is the whole reason the two are connected.' },
        { text: 'Model the effect on the profile, disclose the changed shape to bidders, and price the option against the likely change in rate.', isCorrect: true, rationale: 'Correct. A flatter profile is a cheaper product. Disclosing it changes what is offered, and the comparison is made on evidence rather than on hope.' },
        { text: 'Shift the load after award and say nothing, so the price stays as quoted.', isCorrect: false, rationale: 'That is a contract breach risk on a metered product, and it forfeits the negotiating benefit the change creates.' },
        { text: 'Ask the incumbent to discount for the flexibility.', isCorrect: false, rationale: 'Discounting the old shape is not the same as selling a cheaper one, and it removes the competitive information the tender would produce.' }
      ],
      calcWork: 'Rough arithmetic worth doing before the tender: 15 percent of volume moved out of the expensive window, applied to the peak-to-off-peak differential, gives the shape saving in currency and can be compared against the rate gap between offers.',
      principle: 'In this category, changing the shape of demand is often a bigger lever than negotiating the rate, and it changes what bidders can offer.',
    },
    {
      type: 'scenario',
      context: 'A portfolio has eleven supply points. Three have lapsed into out-of-contract default rates during a long tender, at roughly double the contracted commodity price.',
      q: 'What does this reveal about the process?',
      options: [
        { text: 'Nothing actionable: markets moved and the tender took time.', isCorrect: false, rationale: 'Default rates are not a market event. They are the consequence of an end date with no decision attached to it.' },
        { text: 'The renewal register is not a control: notice dates had no owner and no trigger, so the delay was invisible until the bills arrived.', isCorrect: true, rationale: 'Correct. The largest number in energy procurement is usually produced this way, and the fix is a register where each point has a notice date, an owner and an escalation on the date the window opens.' },
        { text: 'Tenders should be shorter, so this does not recur.', isCorrect: false, rationale: 'Shorter tenders are not the control; interim protection is. A properly sequenced process protects the sites while work continues.' },
        { text: 'Switch all sites to index-linked pricing to avoid future fixed-price lapses.', isCorrect: false, rationale: 'That changes the exposure question and leaves the register problem exactly where it was.' }
      ],
      principle: 'Own the notice dates. A lapsed site is a control failure with a predictable cost, and it is the most expensive common error in this category.',
    }
  ],

  relSop: 'sop-sourcing-strategy',
  rel: {
    concepts: ['energy-contract-structures', 'load-profile-hedging', 'sourcing-strategy', 'payment-terms', 'supply-chain-risk', 'total-cost-of-ownership', 'supplier-market-analysis'],
    sops: ['sop-sourcing-strategy', 'sop-contract-renewal', 'sop-compliance-review'],
    checklists: ['cl-sourcing-strategy', 'cl-contract-renewal', 'cl-supplier-risk-review'],
    templates: ['tpl-business-case', 'tpl-contract-renewal-assessment', 'tpl-rfq'],
    calcs: ['calc-multi-year-contract-cost', 'calc-price-escalation'],
    decisions: ['dec-framework-agreement', 'dec-re-source'],
    kpis: ['kpi-contract-coverage', 'kpi-savings'],
    glossary: ['gloss-run-rate', 'gloss-ppv', 'gloss-tco']
  },
  labMission: {
    title: 'Mission 22.1: Separate Your Bills',
    desc: 'Take one utility spend line and rebuild it so that the negotiable part is visible, then test what a shape change would be worth.',
    tasks: [
      'Split a recent energy or utility bill into commodity, network, policy, metering and any other line, and name which of them a supplier can actually change.',
      'Find your peak consumption window and describe what would move out of it. Price the shift against the rate gap between two current offers.',
      'Build the renewal register for your supply points: end date, notice window, owner, and what happens if nobody acts.'
    ],
    ctaLabel: 'Open Multi-Year Contract Cost',
    ctaHref: '#/calc/calc-multi-year-contract-cost',
    secondaryLabel: 'Open the Contract Renewal Checklist',
    secondaryHref: '#/cl/cl-contract-renewal'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-works-and-construction-buying',
  title: 'Works Packages and Construction: Who Owns the Risk Before Anything Is Built',
  module: 'Module 22: Category Depth II - Energy, Works and Creative Markets',
  kicker: 'Function 22.2',
  tier: 'executive',
  tagline: 'The lowest tender is usually the offer that assumed most favourably. In works buying, the contract form decides who pays when reality disagrees.',
  desc: 'This function covers how works are bought: the families of contract form and what each allocates, lump sum against measurement against cost-reimbursable, quantities and schedule of rates, provisional sums and prime cost sums, dayworks, valuation cycles and retention, and the difference between an extension of time and a claim for money. It covers why the cheapest tender so often produces the most expensive project, how to evaluate a bid against a cost plan, and what a buyer can legitimately do about risk that neither party can price.',
  duration: '30 mins',
  lifecycleStage: 'Stage 15: Contract Formulation & Legal Review',
  lifecycleDesc: 'The commercial outcome is fixed when the form and the allocation are chosen, which happens before a single price is received.',

  what: "Works buying is where procurement meets a product that does not exist yet, is made once, on a site nobody fully controls, by people who are paid as they go. That combination explains why the category behaves nothing like buying goods, and why the commercial instrument is chosen before any tender is priced. Start with the three families. A lump sum contract against defined quantities puts the quantity risk with the contractor and the design risk with whoever wrote the requirement: the price is fixed for a described scope, and the contractor earns or loses on how efficiently it is built. It works when the scope is genuinely defined and changes are expected to be few, and it fails expensively when it is used for work nobody had designed properly, because the discount claimed at tender is recovered through change orders and claims. A measurement contract prices work as executed against a schedule of rates: the buyer keeps quantity risk and pays for what is built. It suits ground conditions, refurbishment and anything where the true extent is unknown at tender, and it demands a buyer who can measure and value work rather than just approve invoices. A cost-reimbursable arrangement pays actual cost plus a fee; it is the fastest route to a start on site and the weakest route to a known price, so it is used where time matters more than certainty, and it needs either a ceiling or a pain-share mechanism to be safe. Between them sit the structures that give works programmes their shape: design and build, where one party carries design and construction and the buyer trades detailed control for a single point of responsibility; framework appointments that let packages be ordered without retendering; and target-cost arrangements where a price, a cost plan and a shared gain or pain band decide what both parties do when reality moves. The second thing to understand is the pricing vocabulary, because it is where the money hides. A bill of quantities describes work so that bids are comparable; a schedule of rates prices work that cannot yet be counted. A provisional sum is an allowance for work known to be required but not yet specified - and the distinction between a defined and an undefined allowance decides whether the contractor may price preliminaries against it, which is a frequent and expensive surprise. A prime cost sum is money set aside for a supply or a specialist the buyer will choose, with a handling fee the contractor charges for including it; the fee on a large package can be significant and is negotiated, not fixed. Dayworks pays labour and plant at published rates when change cannot be measured against the schedule - the most expensive legitimate way to buy work, and the mechanism most often used by default because nobody kept proper records at the moment the change happened. Third: how the money actually flows, because this is where the commercial position is lived. Interim valuations are applications for payment against work executed, assessed by someone who measures; retention is a percentage held back - commonly a few percent, released in halves at practical completion and at the end of the defects period - which is security for the buyer and a working-capital cost for the contractor, so its size and form are commercial terms rather than boilerplate. Milestone payment ties money to completed, verifiable states of work and is usually safer for the buyer than time-based applications. Advance payments require security. And liquidated damages for delay are a pre-agreed sum per period, which exists because proving actual loss after the fact is slow and contested; a rate so high that it is punitive is not enforceable in most regimes, and a rate set carelessly low buys no protection at all. Fourth, the two questions a disappointed party asks, which beginners conflate. An extension of time moves the completion date and therefore the damages clock; it does not by itself award money. Loss and expense is a separate claim requiring its own basis. A contractor who is granted time without cost is often still losing money, and a buyer who thinks granting time is generous has not finished the negotiation. Similarly, a variation is a change in scope, and a claim is a demand for money arising from how that or something else was handled. Keeping the three separate - time, money, scope - is the discipline that makes a project auditable. Fifth, and the point an executive actually owns: why the lowest tender is so often the most expensive project. Tenders are compared on the number the contractor chose, under a form, with assumptions, qualifications and a programme they wrote. A bid 15 percent under the cost plan usually means one of four things: the bidder misread the scope; the bidder intends to recover through change and claims; the bidder is carrying work it does not price because it needs the revenue; or the bidder is genuinely better. The first three are far more common than the fourth, and only a comparison against the buyer own cost plan - and an interview about how the price was built - separates them. Award decisions in this category therefore need three columns: price against the cost plan, risk allocated by the form, and evidence of the programme feasibility, with a written reason for choosing a bidder whose number is not the lowest. Finally, what a good buyer does that most do not: cost-plan early and hold the contingency centrally, so that the reserve belongs to the project rather than being quietly spent by each trade; keep change control with a valuation before approval, not after; require the record at the moment work happens, because dayworks disputes are lost on evidence rather than on merit; and decide deliberately which risks to keep - ground conditions, weather, third-party access, changes of requirement - rather than dumping all of them on the contractor, who will either price them expensively or accept them and fight afterwards. A risk neither party can price is not removed by writing it into the other column.",
  why: [
    'The contract form decides who carries quantity, design and site risk, so the commercial outcome is set before a single price arrives.',
    'A lump sum on an undesigned scope does not remove cost risk; it converts it into change orders and claims with a worse outcome.',
    'Provisional sums, prime cost sums and dayworks each price a different kind of unknown, and using the wrong one is how a budget quietly moves.',
    'Time, money and scope are three separate questions; granting an extension of time is not a settlement of loss.',
    'A tender well under the cost plan is a signal to be explained, not a saving to be booked, because most low bids are low for reasons the buyer will pay for.'
  ],
  when: [
    'At concept, when the form of contract is chosen - this is the highest-leverage commercial decision in the whole programme.',
    'Before tender, when the cost plan, contingency and provisional allowances are set.',
    'When evaluating bids that differ widely, because the spread is information about assumptions rather than about efficiency.',
    'During works, at every change, since valuation before approval is the only moment the money is still controllable.',
    'At completion and at the release of retention, when performance against the defects obligation becomes a payment question.'
  ],

  raci: [
    { role: 'Senior Responsible Owner', resp: 'Owns the business case, the contingency policy and the decision to accept a non-lowest bid with a written reason.' },
    { role: 'Commercial Manager', resp: 'Sets the form and allocation, runs the cost plan, values change and holds the register of claims.'
    },
    { role: 'Quantity Surveyor', resp: 'Prepares quantities and rates, measures work executed, assesses applications and values variations.' },
    { role: 'Project Manager', resp: 'Approves change in advance where possible, keeps contemporaneous records and manages the programme.' },
    { role: 'Contractor', resp: 'Prices the scope described, flags the assumptions relied on, and executes to the agreed standards.' }
  ],
  inputs: [
    'The cost plan with allowances, contingency and the scope description each element rests on.',
    'The contract form and the allocation of design, quantity, ground and access risk.',
    'Tender submissions with their qualifications, assumptions, programmes and resource plans.',
    'Change requests with a valuation and an effect on time, produced before the work is done.'
  ],
  outputs: [
    'An award recommendation stating price against cost plan, risk carried by each party, and programme feasibility.',
    'A live commercial register: forecast outturn, approved change, provisional sum drawdown and open claims.',
    'A valuation and payment record with retention held, released dates and the defects position.',
    'A lessons record naming which assumptions in the winning bid proved correct and which did not.'
  ],
  controls: [
    'Change is valued and approved before execution wherever the programme allows, and urgency is recorded with who agreed to proceed unpriced.',
    'Contingency is held centrally by a named owner rather than distributed into trade allowances.',
    'Bids are tested against the buyer cost plan, and a material deviation from it is explained in writing before award.',
    'Records of delay and disruption are contemporaneous, because claims are decided on evidence rather than on the merits.'
  ],
  bestPractices: [
    'Choose the form to match the certainty of scope, and accept that a form chosen for comfort transfers cost somewhere less visible.',
    'Interview the low bidder about how the price was built; the answer predicts the change register.',
    'Keep the three questions apart in writing - time, money, scope - and never let a settlement mix them by accident.',
    'Allocate each risk to the party best able to manage it, and price what remains rather than pretending it is gone.'
  ],
  mistakes: [
    'Signing a lump sum on drawings that were never finished, then treating every change as a variation dispute.',
    'Reading retention as free security without weighing its effect on a smaller contractor cash position and therefore on performance.',
    'Awarding on the number while ignoring the qualifications that produced it.',
    'Approving works first and pricing later, which removes the only leverage the buyer had.'
  ],
  terms: [
    { term: 'Lump sum with quantities', def: 'A fixed price for a described scope, where the contractor carries quantity risk and the buyer carries the risk of describing it wrongly.' },
    { term: 'Provisional sum', def: 'An allowance in the contract for work that is required but not yet specified, with the treatment of preliminaries depending on how it is defined.' },
    { term: 'Dayworks', def: 'Payment for work at published labour and plant rates when it cannot be measured against the schedule, and the most expensive legitimate route.' },
    { term: 'Extension of time', def: 'Movement of the completion date and therefore the damages clock, which does not by itself award money.' }
  ],

  thinkingPoints: [
    {
      quote: 'The 15 percent saving that arrived as change.',
      explanation: 'A refurbishment package was awarded to a bid 15 percent below the cost plan because the board wanted the number. The bidder had assumed no ground movement, an unrestricted working hours pattern and a specification detail it had quietly read as equivalent. Within two quarters the approved change exceeded the saving, and the dispute about the rest took another year.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a bid is a set of assumptions priced as a number, and a discount that cannot be explained is usually a transfer rather than an efficiency.',
      reflectionPrompt: 'When the last works award was made below the plan, did anyone record how the bidder intended to build it at that price?',
    },
    {
      quote: 'Time granted, money unasked.',
      explanation: 'A contractor accepted an extension of time without cost, believing the money could be claimed later once the works were complete. The contract required notice within a short window and evidence contemporaneous with the event. The extension survived; the loss and expense claim failed on procedure, not on fact.',
      realWorldExample: 'Illustrative example: time and money are separate questions with separate machinery, and accepting one while deferring the other can forfeit it.',
      reflectionPrompt: 'Does your team know which clause requires notice, within how many days, and with what evidence attached?',
    }
  ],

  sopSteps: [
    { title: 'Fix the form before the numbers arrive', role: 'Commercial Manager',
      desc: 'Choose the contract form against the certainty of scope: lump sum where the design is complete and stable, measurement where the extent is genuinely unknown, cost-reimbursable only where starting early outweighs knowing the price. Record why the choice was made, since every later dispute references it.',
      control: 'The form is selected against the scope certainty at the decision point, and the reason is minuted with the residual risks named.',
      record: 'Procurement route decision with form, allocation table and the risks each party carries.',
      pitfall: 'Choosing lump sum because it sounds safe, which simply moves the cost into change orders that the buyer has to argue about.'
    },
    { title: 'Build the cost plan and hold contingency centrally', role: 'Senior Responsible Owner',
      desc: 'Set the budget by element with allowances, decide who owns the contingency, and refuse to let it disappear into trade packages. A reserve the project can see is a reserve the project can use.',
      control: 'Contingency has one named owner and drawdown requires an approval above the package buyer, recorded with what it bought.',
      record: 'Cost plan with element allowances, contingency balance and each drawdown decision.',
      pitfall: 'Distributing contingency into every package, so that when the real unknown arrives there is nothing left to spend.'
    },
    { title: 'Define the allowances that price the unknown', role: 'Quantity Surveyor',
      desc: 'State which work sits behind provisional sums and prime cost sums, how each is to be expended, what handling fee applies, and whether preliminaries may be claimed against it. Ambiguity here becomes a claim later with interest.',
      control: 'Every allowance names its scope basis, the mechanism for expending it and the treatment of preliminaries before tender.',
      record: 'Pricing document with the allowance schedule and the stated treatment of each.',
      pitfall: 'Leaving an undefined allowance in a lump sum tender and then being surprised that the contractor priced nothing around it.'
    },
    { title: 'Test bids against the plan, not against each other', role: 'Commercial Manager',
      desc: 'Compare each submission to the buyer cost plan element by element, read the qualifications, and interview the outliers about how the price was assembled. Record what the explanation was and whether it survived the works.',
      control: 'No award proceeds where a material deviation from the cost plan is unexplained in a written bidder response.',
      record: 'Bid analysis with element variance, qualifications noted and the interview record.',
      pitfall: 'Ranking purely on total, which rewards the bidder who assumed most favourably and punishes the one who priced honestly.'
    },
    { title: 'Value change before it is executed', role: 'Project Manager',
      desc: 'Require a valuation, a programme effect and an approval decision for any change, and where urgency forces work to proceed unpriced, record who authorised it and on what basis. Dayworks need contemporaneous signatures, because the claim is lost on evidence rather than on fact.',
      control: 'Change carries a valuation and an approval before execution; where that is impossible the deviation is recorded with the authorising name.',
      record: 'Change register with valuation, time effect, approval and the record of any unpriced instruction.',
      pitfall: 'Approving the work to keep the programme moving and then treating the price as a commercial matter to settle afterwards.'
    },
    { title: 'Keep time, money and scope in separate columns', role: 'Commercial Manager',
      desc: 'Assess an extension of time on its own facts, a claim for loss on its own basis, and a variation on its own scope. Write the register so that each sits in its own row with its own status, and meet the notice requirements stated in the contract.',
      control: 'Notices are logged against the clause and the deadline, and no settlement combines the three questions without stating each separately.',
      record: 'Commercial register with separate time, cost and scope entries and their notice dates.',
      pitfall: 'Assuming an agreed extension settled the matter, when the money claim has its own clock and its own evidence requirements.'
    },
    { title: 'Run the valuation, retention and defects cycle properly', role: 'Quantity Surveyor',
      desc: 'Assess interim applications against work actually executed, apply retention as the contract states, and diarise both release points with the defects position checked before money moves. Payment is the lever that exists only while the work is unfinished.',
      control: 'Valuations are certified against measured work, retention is tracked with release dates, and defects are verified before final release.',
      record: 'Valuation certificates, retention ledger with release dates and the defects sign-off.',
      pitfall: 'Releasing retention on schedule while outstanding defects are still being promised, which removes the remedy already paid for.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A hospital refurbishment has unfinished design, occupied wards on either side, and unknown ground conditions under the slab. Senior management instructs procurement to run it as a lump sum to protect the budget.',
      q: 'What is the most accurate objection?',
      options: [
        { text: 'Lump sum is never appropriate for refurbishment work.', isCorrect: false, rationale: 'That is too absolute - where scope is genuinely closed out, a fixed price can be the right instrument even in a live building.' },
        { text: 'On this scope certainty a lump sum does not remove cost risk, it reprices it as variations and claims, and the buyer will argue about each one later from a weaker position.', isCorrect: true, rationale: 'Correct. Unknown extent and unknown ground are quantity risks the contractor cannot price without an assumption, and the assumption becomes a dispute. Measurement against rates, with an early works package for the ground, keeps the risk where it can actually be managed.' },
        { text: 'The programme is too short for a lump sum tender.', isCorrect: false, rationale: 'Programme affects the route, but the stated problem here is scope certainty, not time.' },
        { text: 'Cost reimbursable should be used because it is the cheapest option.', isCorrect: false, rationale: 'It is usually the most expensive route to a known price; the reason to use it is urgency, not cost.' }
      ],
      principle: 'Choose the form against the certainty of the scope, because a form cannot delete a risk - it can only decide who prices it and who argues about it.',
    },
    {
      type: 'scenario',
      context: 'A bid arrives 18 percent below the cost plan on a package with detailed drawings and no provisional sums. The board wants the saving recorded in the forecast.',
      q: 'What should the buyer do first?',
      options: [
        { text: 'Book the saving; a lower price against the same drawings is a lower price.', isCorrect: false, rationale: 'The drawings are the same; the assumptions are unknown, and it is the assumptions that determine what the project eventually pays.' },
        { text: 'Break the bid down against the cost plan by element, request a written explanation of how the price was built, and treat any unexplained variance as a risk to be priced in the change register.', isCorrect: true, rationale: 'Correct. Comparison against the plan plus an interview separates genuine efficiency from a favourable reading of the scope, and the explanation becomes the document you rely on when change arrives.' },
        { text: 'Reject the low bid as unreliable.', isCorrect: false, rationale: 'That wastes a possible real saving and cannot be defended if the bidder had explained it properly.' },
        { text: 'Award and instruct the contractor to work to the drawings.', isCorrect: false, rationale: 'The drawings are already the obligation. That instruction resolves nothing about what the bidder excluded.' }
      ],
      calcWork: 'An 18 percent gap on a package is typically worth two or three elements of the cost plan. Identifying which elements are light tells you which assumptions were made.',
      principle: 'A discount that cannot be explained is a transfer of cost to a future line, and the future line is the change register.',
    },
    {
      type: 'scenario',
      context: 'Access to a site is lost for nine days because the buyer had to relocate a live utility. The contractor is granted an extension of time and says the cost will be claimed at completion.',
      q: 'What is the correct handling?',
      options: [
        { text: 'Nothing further, since time was granted and that settles the event.', isCorrect: false, rationale: 'Time and money are different questions under most forms; granting one does not dispose of the other.' },
        { text: 'Log the event, confirm the notice position under the contract, require the cost basis while the evidence is contemporaneous, and settle the money question on its own facts.', isCorrect: true, rationale: 'Correct. The clause clock runs from the event, and the records that prove plant and labour stood idle exist now rather than at completion. Deferring is how a legitimate claim fails on procedure.' },
        { text: 'Refuse the extension until the cost is quantified.', isCorrect: false, rationale: 'That conflates the two questions and penalises the contractor for a cause the buyer created.' },
        { text: 'Agree a figure informally so both parties can move on.', isCorrect: false, rationale: 'An unrecorded agreement is the beginning of a later argument about what was agreed and by whom.' }
      ],
      principle: 'Keep time, cost and scope separate, and gather the evidence while it still exists.',
    },
    {
      type: 'scenario',
      context: 'A project manager instructs urgent remedial work to keep a programme, agreeing only a verbal rate to be settled later. Six weeks on, the record consists of an email saying get it done and an invoice at dayworks rates.',
      q: 'Where is the failure?',
      options: [
        { text: 'With the contractor, for charging dayworks.', isCorrect: false, rationale: 'Dayworks are the normal fallback when work cannot be measured, and the instruction did not agree otherwise in a usable way.' },
        { text: 'In the process: the work was authorised without a valuation or a stated basis, and no contemporaneous record of resources was captured, so there is nothing to measure against.', isCorrect: true, rationale: 'Correct. Urgency is legitimate; proceeding unpriced without a recorded authorisation and daily signed records is not. The claim fails or succeeds on paperwork made at the time.' },
        { text: 'In the programme, which should not have needed urgent work.', isCorrect: false, rationale: 'That is a different lesson and does not answer how to value what was actually done.' },
        { text: 'Nothing failed; the two parties can negotiate a figure now.', isCorrect: false, rationale: 'They can, but from a position with no evidence, which is how both sides end up dissatisfied with the same number.' }
      ],
      principle: 'If work must proceed before pricing, record who authorised it, on what basis, and capture the resource record daily - the money question is decided by that paperwork.',
    },
    {
      type: 'scenario',
      context: 'A smaller contractor warns that 5 percent retention across three concurrent packages is affecting its ability to fund labour. The buyer has no concern about quality.',
      q: 'What is the sensible commercial response?',
      options: [
        { text: 'Hold the retention rate; it is standard and unrelated to performance.', isCorrect: false, rationale: 'Standard is not a reason. Retention is security with a cost, and the cost lands on the party least able to carry it, which changes performance risk rather than removing it.' },
        { text: 'Reduce or replace the retention with an equivalent form of security, or accelerate release at practical completion, keeping the protection while removing the working-capital squeeze.', isCorrect: true, rationale: 'Correct. Retention exists to secure the defects obligation; bonds, a lower percentage, or staged release deliver the same protection with less stress on the supply chain, which is itself a risk to delivery.' },
        { text: 'Release all retention now to support the contractor.', isCorrect: false, rationale: 'That forfeits the remedy before the defects obligation has been tested.' },
        { text: 'Ask the contractor to carry it and offer a discount next time.', isCorrect: false, rationale: 'That trades a live cash problem for a future pricing favour and resolves nothing on the current package.' }
      ],
      principle: 'Security mechanisms have a cost, and who carries it is a commercial decision rather than a default.',
    }
  ],

  relSop: 'sop-contract-award',
  rel: {
    concepts: ['construction-contract-forms', 'provisional-sums-dayworks', 'contract-structure', 'change-control', 'liability-indemnity', 'statement-of-work', 'supplier-financial-risk'],
    sops: ['sop-contract-award', 'sop-contract-change-control', 'sop-commercial-evaluation'],
    checklists: ['cl-contract-review', 'cl-commercial-evaluation', 'cl-single-source-justification'],
    templates: ['tpl-rfp', 'tpl-commercial-evaluation', 'tpl-contract-change-request'],
    calcs: ['calc-compare-quotes', 'calc-tco'],
    decisions: ['dec-rfq-or-rfp', 'dec-make-or-buy'],
    kpis: ['kpi-contract-compliance', 'kpi-otd'],
    glossary: ['gloss-change-order', 'gloss-sow', 'gloss-capex']
  },
  labMission: {
    title: 'Mission 22.2: Read a Works Contract as an Allocation',
    desc: 'Take one package you are responsible for, or one you can obtain, and map who carries which risk before any price is discussed.',
    tasks: [
      'List the risks in a live package - scope certainty, ground or site conditions, access, weather, third-party dependencies, your own requirement changes - and write who carries each today.',
      'Find where provisional or undefined allowances sit in the pricing document and state what each allows the contractor to claim around it.',
      'Set up the three-column register: time, money, scope, with the notice requirement and deadline for each row.'
    ],
    ctaLabel: 'Open Compare Quotes',
    ctaHref: '#/calc/calc-compare-quotes',
    secondaryLabel: 'Open the Contract Review Checklist',
    secondaryHref: '#/cl/cl-contract-review'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-marketing-and-creative-services',
  title: 'Marketing, Agencies and Creative Services: Buying an Outcome You Cannot Inspect',
  module: 'Module 22: Category Depth II - Energy, Works and Creative Markets',
  kicker: 'Function 22.3',
  tier: 'practitioner',
  tagline: 'Marketing is the category where the buyer is often invoiced for work that was never briefed, and where the saving most often turns out to have been a budget cut.',
  desc: 'This function covers how agencies and creative suppliers actually charge - retainer, project, time and cost, commission and pass-through - what a mark-up on third-party spend really pays for, how to brief so that two proposals are comparable, what pitching costs both sides, how media and technology conflicts of interest shape advice, and how to tell a measured result from an attributed one. It covers IP and usage rights, production cash flow, and the governance that keeps marketing spend out of the maverick category, and it states honestly where procurement should not over-reach into creative judgement.',
  duration: '26 mins',
  lifecycleStage: 'Stage 5: Market Analysis and Supplier Identification',
  lifecycleDesc: 'This market is deep, undifferentiated in name and highly reputation-driven, so knowing who is actually capable of the brief matters more than ranking who quoted lowest.',

  what: "Marketing services attract more confident procurement interference than any other category and produce the least verifiable savings, which should tell a buyer something at the start. The work is judgement work: the deliverable is a decision about what to say, to whom, through which channel, and the evidence that it worked arrives late, is contested, and is usually produced by the party who was paid to produce it. None of that makes it unbuyable. It makes the commercial structure the thing to get right, because that is where procurement genuinely improves the outcome. Begin with how agencies earn money, because the labels hide different economics. A retainer buys declared capacity - a team, an hour envelope, a service level - and it is efficient for continuous demand and expensive for lumpy demand, since you pay for availability whether or not you use it. A project fee prices a defined scope: it is comparable only when two briefs described the same outcome, and the failure mode is that they never do. Time and cost charges labour at rate cards plus expenses, which is transparent and completely open to scope drift; it needs a ceiling and an approval route per phase. Performance or commission models tie some part of the fee to a stated metric, and the whole discipline is in defining the metric so that it cannot be earned by reporting rather than by doing. The fourth structure, which causes the most surprise, is the mark-up or pass-through on third-party spend: production, media, printing, technology, influencer fees and stock licensing all pass through the agency at a percentage - sometimes disclosed, sometimes embedded in a fee described as management. On a large media or production budget an undisclosed percentage is bigger than the agency fee, and it is the first thing to make visible. Then the brief, because comparability dies there. A brief that says we need a campaign for the autumn launch invites four different scopes and four incomparable numbers. A brief that states the commercial objective, the audience, the deliverables with counts and formats, the territories, the approval route, the measurement basis, what the agency is responsible for and what the client retains - plus a budget envelope and a rate-card disclosure requirement - produces proposals that can be read side by side. Procurement does not own creative direction, and should not pretend to; it owns making the scope explicit so that evaluation is a judgement about approach rather than a guess about what each bidder assumed. Pitching deserves its own commercial thought, because it is expensive and increasingly scrutinised: an unpaid speculative pitch transfers the cost of a buyer decision onto several suppliers at once, and it systematically favours agencies with spare capacity - which is not the same as favouring the best. A disciplined alternative is a paid, scoped pitch for a small number of shortlisted partners, or an incumbent review with a portfolio and reference test instead of a campaign created for the room. Either way, the number of agencies asked should match the number who can genuinely do the work, and the criteria should be published before anyone opens a laptop. Next, conflicts. Many agencies earn from media commissions, technology reselling, or from owning the measurement vendor. When the same party recommends a channel, buys it, and reports on it, the buyer has lost an independent check on its own spend, and the advice and the purchase are no longer separated. This is not automatically improper - it is a disclosed structure to be managed: require declaration of interests, separate the measurement function where the money is material, and own the first-party data so that a change of agency does not change what the organisation knows about its customers. Rights and ownership are where an otherwise sensible contract quietly fails. Who owns the creative, in which territories, for how long, and may it be reused across markets or edited without a further fee? Talent and music usage rights are purchased in bands of medium, geography and duration, and an unauthorized re-use is a claim that arrives months later, when nobody remembers who agreed what. Production also has a cash-flow shape worth understanding: agencies and producers frequently pay crews and facilities before the client invoices are settled, so payment terms are not a courtesy in this category - they determine who can bid at all, and long terms exclude smaller, sometimes better, suppliers. Finally the measurement question, and the place for honesty. Attributed results - clicks, leads, impressions, viewability, last-touch conversion - are cheap to produce and describe activity rather than effect. Incremental results - did the business change because of this spend, tested with holdouts, geography-based controls or matched markets - are expensive, slow and the only thing that supports a claim about effect. A buyer who accepts attribution as measurement has bought a report, not an outcome. Marketing savings therefore deserve a special category of scepticism: taking 12 percent out of an agency fee is a price reduction; cutting a programme because the fee came down is often avoided cost dressed as savings; and reducing budget while consolidating suppliers is a structural change, not an efficiency, unless the work still gets done. The defensible framework is to declare the baseline, state whether money was saved or spent differently, and put the effect claim only where the test supports it.",
  why: [
    'The deliverable is a judgement, so the commercial structure and the brief are the parts procurement can actually control.',
    'A mark-up on third-party spend can exceed the fee itself, and it is usually the least visible line in the agreement.',
    'Two proposals are only comparable if the brief stated the outcome, the deliverables and the measurement basis; otherwise evaluation is a guess about assumptions.',
    'Where the same supplier recommends the channel, buys the media and reports the result, the buyer has no independent check on its own spend.',
    'Attribution measures activity and incrementality measures effect; booking a fee reduction as a marketing saving is the most common reporting error in this category.'
  ],
  when: [
    'Before a retainer is renewed or an annual agency appointment is awarded, when the mark-up and capacity terms are still negotiable.',
    'When a campaign budget crosses a threshold and the brief is still a sentence rather than a specification.',
    'When agencies are being consolidated, since the saving is often a change in what work gets done rather than a change in price.',
    'Whenever creative will be reused across markets or channels, because usage rights are cheaper to agree before than after.',
    'When a measurement vendor is proposed by the party whose spend it measures.'
  ],

  raci: [
    { role: 'Marketing Director', resp: 'Owns the commercial objective, the creative decision and the acceptance of the work.' },
    { role: 'Procurement', resp: 'Makes the brief comparable, exposes fee and mark-up structures, and owns the contract terms and the panel process.' },
    { role: 'Agency Account Lead', resp: 'Interprets the brief into a plan, declares conflicts and delivers against the agreed scope.' },
    { role: 'Finance', resp: 'Sets the budget envelope, tests the savings claim against the baseline and approves payment terms.' },
    { role: 'Legal or IP', resp: 'Confirms ownership, licence scope, talent and music usage, and the data position between parties.' }
  ],
  inputs: [
    'The commercial objective with the audience, territory and time window it must serve.',
    'A deliverable list with counts and formats, and the approval route stated in days.',
    'Fee structure per bidder: retainer basis, project assumptions, rate card, mark-up or pass-through on third-party spend.',
    'The measurement basis agreed in advance, including what will be attributed and what will be tested.'
  ],
  outputs: [
    'A brief that allows two proposals to be read against each other rather than admired separately.',
    'A comparison showing fee, mark-up and pass-through lines for the same scope, with the total cost of the campaign visible.',
    'A contract with IP ownership, licence scope, usage bands, data ownership and payment terms stated.',
    'A reporting commitment that separates activity measures from effect measures, and states who produces each.'
  ],
  controls: [
    'Third-party spend is passed through at a disclosed rate or billed at cost, and the mark-up line is visible in every approval.',
    'Any comparison of proposals is made against one brief with stated deliverables and counts.',
    'Usage, territories and duration for creative, talent and music are recorded before the work is released.',
    'A savings claim in this category states the baseline, and whether money was saved, spent differently, or reallocated.'
  ],
  bestPractices: [
    'Specify the outcome and leave the method open, which is what lets a smaller agency compete on thinking rather than on size.',
    'Pay for a scoped pitch when you want real work, and accept that unpaid speculation buys you capacity rather than quality.',
    'Own your first-party data and your measurement relationship, so that changing agencies does not change what you know.',
    'Set payment terms that a small supplier can survive, because the alternative is a panel that is only as good as the largest firms.'
  ],
  mistakes: [
    'Comparing retainer proposals without asking what capacity the retainer actually buys.',
    'Accepting a media discount funded by a higher mark-up on production.',
    'Recording a fee reduction as a marketing saving while the campaign outcomes go unmeasured.',
    'Letting the supplier who buys the media also certify the measurement of the media it bought.'
  ],
  terms: [
    { term: 'Retainer', def: 'Payment for declared capacity and a service level, efficient for continuous demand and wasteful for lumpy demand.' },
    { term: 'Pass-through and mark-up', def: 'Third-party costs billed through the agency, at cost or at a percentage - the percentage is where a large part of the money hides.' },
    { term: 'Usage rights', def: 'The agreed medium, territory and duration for which creative, talent or music may be used, priced by band.' },
    { term: 'Incrementality', def: 'A test of whether an outcome was caused by the spend, using holdouts or controlled comparison, rather than attributed to it.' }
  ],

  thinkingPoints: [
    {
      quote: 'The 15 percent fee cut that cost 4 percent more.',
      explanation: 'An agency negotiation delivered a headline 15 percent reduction on fees. Production and media were re-sourced through the same agency at a mark-up that had previously applied only to a portion of spend, and the following year total campaign cost was higher on effectively the same output. Nobody had compared total cost of the campaign; everyone had compared the fee line.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a fee reduction and a pass-through increase are invisible on different approval forms, and the buyer pays on the combined one.',
      reflectionPrompt: 'If you had to state the full cost of your last campaign including everything that passed through a supplier, could you produce that number from the contract file?',
    },
    {
      quote: 'The savings that were a budget cut.',
      explanation: 'A category reported a strong savings percentage after consolidating five suppliers into two and reducing activity by a third. The number was true and the description was not: the organisation spent less because it did less, and the effect on pipeline was not measured until the following year.',
      realWorldExample: 'Illustrative example: consolidation, reduced scope and negotiated reduction are three different events that all reduce invoice totals, and only one of them is usually a saving.',
      reflectionPrompt: 'In the last marketing saving you reported, what would the baseline have looked like if the scope had not changed, and who tested that?',
    }
  ],

  sopSteps: [
    { title: 'Write the brief so bids are comparable', role: 'Marketing Director',
      desc: 'State the commercial objective, the audience, the deliverables with counts and formats, the territories, the approval route, and the measurement basis agreed in advance. Procurement does not write creative direction; it insists that the scope is explicit enough to compare.',
      control: 'No tender opens until the deliverable list and the measurement basis are written, and every bidder receives the same text.',
      record: 'Brief with objective, deliverable counts, territories, timeline and stated evaluation criteria.',
      pitfall: 'Issuing a one-line brief and then comparing four proposals built on four different assumptions about what was being asked.'
    },
    { title: 'Make fee and pass-through structures explicit', role: 'Procurement',
      desc: 'Require each bidder to present retainer basis, hours envelope, rate card, project fee assumptions, and the percentage or flat handling applied to third-party spend. Build one total-cost-of-campaign model on the same scope.',
      control: 'Every approval shows the handling rate on third-party spend alongside the fee, and undisclosed mark-ups are not accepted into the model.',
      record: 'Comparison model with fee lines, pass-through lines, and total campaign cost per bidder.',
      pitfall: 'Winning a headline fee reduction while a handling percentage on production and media quietly absorbs it.'
    },
    { title: 'Decide the panel and the pitch basis deliberately', role: 'Procurement',
      desc: 'Shortlist only firms that can genuinely do the work, publish criteria before anyone is briefed, and choose between a paid scoped pitch and an incumbent review on portfolio plus references. Record which was chosen and why.',
      control: 'The number asked to pitch matches the number capable, criteria are published in advance, and any paid work is stated before selection.',
      record: 'Panel rationale, published criteria, and the decision on pitch format with the payment basis.',
      pitfall: 'Running unpaid speculation with six agencies, which filters for spare capacity rather than for quality and costs the market goodwill.'
    },
    { title: 'Separate the money from the measurement', role: 'Finance',
      desc: 'Where the supplier that buys media also certifies its performance, declare the interest, put the measurement function with an independent party above a stated spend threshold, and require the definition of every reported metric in writing.',
      control: 'Any party that purchases a channel does not solely certify results for that channel above the stated threshold, and metric definitions are fixed before the campaign.',
      record: 'Measurement arrangement with vendor, metric definitions, and the declared interests on file.',
      pitfall: 'Accepting last-touch attribution as evidence of effect because it is the number the supplier already reports.'
    },
    { title: 'Settle rights before release', role: 'Legal or IP',
      desc: 'Record who owns the creative, the licence territory and duration, whether it may be edited or reused across markets, and the usage bands for talent, music and stock. Get each confirmed in writing before the work goes out.',
      control: 'No creative is released without a written statement of ownership, territory, duration and the usage bands purchased for talent and music.',
      record: 'Rights schedule per asset with territory, duration, reuse position and the confirmations received.',
      pitfall: 'Reusing a campaign in a second market on the strength of a file that was licensed for one, and meeting the claim months later.'
    },
    { title: 'Set terms a smaller supplier can work to', role: 'Procurement',
      desc: 'Recognise that agencies and producers pay crews and facilities before they are paid, and set payment terms, milestones and any floating production support accordingly. Check who could not bid, not only who did.',
      control: 'Payment terms are reviewed against their effect on the shortlist, and any long term is justified by the work rather than by policy alone.',
      record: 'Terms decision with the note of who was excluded by it and what was done about it.',
      pitfall: 'A panel that looks competitive but contains only firms large enough to finance the clients payment cycle.'
    },
    { title: 'Report the saving honestly at the end', role: 'Marketing Director',
      desc: 'State the baseline, whether money was saved, spent differently or reallocated, and what happened to the volume and quality of work. Put effect claims only where the agreed test supports them.',
      control: 'Every reported saving names the baseline and the category - negotiated reduction, structural change or reduced scope - and no effect claim appears without its test.',
      record: 'Closing report with baseline, saving type, scope comparison and the measurement that was actually run.',
      pitfall: 'Reporting less work as efficiency, then being surprised when the pipeline question arrives a year later.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'Three agencies propose a retainer. Agency One is cheapest on the monthly fee, and its proposal does not state hours or the handling applied to production spend.',
      q: 'What is the correct next step?',
      options: [
        { text: 'Select One, since the fee is the negotiable part.', isCorrect: false, rationale: 'The fee is one of two places the money goes, and the missing information is the part that scales with budget.' },
        { text: 'Ask all three to state the hours envelope, the rate card, and the handling percentage on third-party spend, then compare total cost of a stated programme.', isCorrect: true, rationale: 'Correct. A retainer buys capacity; the handling rate applies to whatever the campaign spends. Once both are stated, the cheapest fee frequently stops being the cheapest option.' },
        { text: 'Cap the retainer and leave production to be agreed as it arises.', isCorrect: false, rationale: 'That is a decision to leave the larger number unpriced, which is where the risk sits.' },
        { text: 'Require all work to be billed on projects instead.', isCorrect: false, rationale: 'Project pricing suits defined scopes; for continuous demand it usually costs more and buys less availability.' }
      ],
      calcWork: 'A handling percentage applied to production and media is compared against the annual fee: on a large programme the percentage line routinely exceeds the whole retainer.',
      principle: 'Compare the cost of the campaign, not the cost of the fee; the two can point to different suppliers.',
    },
    {
      type: 'scenario',
      context: 'A brief says simply: we need a campaign for the autumn product launch. Four proposals arrive ranging from 40 to 180 units of budget.',
      q: 'Who created the problem?',
      options: [
        { text: 'The bidders, who should have asked better questions.', isCorrect: false, rationale: 'They priced what they understood; a tender process that relies on clarification questions has already lost comparability.' },
        { text: 'The buyer, because the brief did not state deliverables, territories, counts, approvals or measurement, so four different scopes were priced.', isCorrect: true, rationale: 'Correct. The spread is a measure of unspoken assumptions. A stated deliverable list plus measurement basis turns a price comparison into an approach comparison, which is the comparison actually wanted.' },
        { text: 'Procurement, for running a tender at all.', isCorrect: false, rationale: 'Process choice was not the defect; the specification was.' },
        { text: 'The market, which is inherently variable in this category.', isCorrect: false, rationale: 'Prices vary with scope, not randomly; that is what makes a brief the control.' }
      ],
      principle: 'Where proposals differ by multiples, read it as a signal about the brief before reading it as a signal about price.',
    },
    {
      type: 'scenario',
      context: 'A marketing report shows 260 percent return on ad spend, produced by the agency that also buys the media. Marketing wants to double the budget on that basis.',
      q: 'What should procurement and finance do?',
      options: [
        { text: 'Approve the increase; the number is strong.', isCorrect: false, rationale: 'The figure is an attributed ratio from the party being paid to spend more, and attribution ratios routinely saturate rather than hold as budget rises.' },
        { text: 'Require an independent test of effect - holdout, controlled region or matched market - and put the measurement with a party with no media commission in it.', isCorrect: true, rationale: 'Correct. This is the structural conflict: the same party buys and certifies. Effect is a different claim from attribution and needs a different producer.' },
        { text: 'Reject the report as unreliable and keep the budget flat.', isCorrect: false, rationale: 'That is a conclusion without a test, and it will not survive the next presentation of the same number.' },
        { text: 'Ask the agency to discount further since the return is so high.', isCorrect: false, rationale: 'It treats an attributed ratio as a cost fact and does nothing about the measurement question.' }
      ],
      principle: 'Return-on-spend figures produced by the supplier who spends are activity measures; a causal claim needs an independent test.',
    },
    {
      type: 'scenario',
      context: 'A consolidation reduces five agencies to two and cuts the category budget by a third. The savings report books 33 percent.',
      q: 'How should this be reported?',
      options: [
        { text: 'As a 33 percent saving, since invoices fell by that much.', isCorrect: false, rationale: 'Invoice reduction and efficiency are different claims; this one mostly describes spending less on less.' },
        { text: 'Broken into negotiated reduction, structural change and reduced scope, with the effect of doing less work stated rather than left to be discovered.', isCorrect: true, rationale: 'Correct. Splitting the mechanisms is the only way the number means something, and the scope reduction has to be visible against the objectives it was meant to serve.' },
        { text: 'As zero saving, since marketing cannot be measured.', isCorrect: false, rationale: 'That is the opposite error - it discards a genuine negotiated reduction and makes the report useless.' },
        { text: 'As a saving, with a note that the baseline was last year budget.', isCorrect: false, rationale: 'Naming a baseline without separating mechanism still leaves a reallocation looking like an efficiency.' }
      ],
      principle: 'In marketing, name the baseline and the mechanism; a reduction in spend is only a saving if the work still gets done.',
    },
    {
      type: 'scenario',
      context: 'A client wants to reuse a television asset in three new markets and in paid social for a year. The original purchase covered domestic broadcast for six months.',
      q: 'What has to happen first?',
      options: [
        { text: 'Nothing - the client owns the creative, so it may be used freely.', isCorrect: false, rationale: 'Ownership of the file is not the same as a licence covering every use, and talent, music and stock are usually purchased in bands.' },
        { text: 'Establish the usage bands required - medium, territory, duration - obtain consents and pay any residual, and record the position per asset before release.', isCorrect: true, rationale: 'Correct. Usage is priced in bands, and the re-use that looks free is precisely the one that generates a claim afterwards. The file answer must be documentary, not remembered.' },
        { text: 'Ask the agency to confirm it is fine.', isCorrect: false, rationale: 'The agency does not hold the rights it would be licensing, and a verbal comfort is the document that gets quoted when the claim arrives.' },
        { text: 'Commission new creative instead, always.', isCorrect: false, rationale: 'Sometimes that is the cheaper answer, but it is a decision to be made on priced usage versus new production rather than a way of avoiding the question.' }
      ],
      principle: 'Creative reuse is a rights transaction: medium, territory and duration are bought, agreed in writing, and recorded per asset.',
    }
  ],

  relSop: 'sop-requirement-definition',
  rel: {
    concepts: ['agency-fee-models', 'marketing-performance-measurement', 'agency-scope-brief', 'statement-of-work', 'service-level-agreement', 'supplier-qualification', 'maverick-spend'],
    sops: ['sop-requirement-definition', 'sop-rfp', 'sop-commercial-evaluation'],
    checklists: ['cl-rfp-preparation', 'cl-requirement-definition', 'cl-commercial-evaluation'],
    templates: ['tpl-rfp', 'tpl-commercial-evaluation', 'tpl-negotiation-planner'],
    calcs: ['calc-compare-quotes', 'calc-negotiation-savings'],
    decisions: ['dec-rfq-or-rfp', 'dec-consolidate-suppliers'],
    kpis: ['kpi-savings', 'kpi-contract-compliance'],
    glossary: ['gloss-rfp', 'gloss-sla', 'gloss-rate-card']
  },
  labMission: {
    title: 'Mission 22.3: Build the Total Cost Model',
    desc: 'Take one live campaign or programme and produce the number nobody has yet written down.',
    tasks: [
      'List every cost that passes through a supplier for one campaign - production, media, printing, licences, influencer fees - and find the handling rate applied to each.',
      'Rewrite one brief so that it states deliverables with counts, territories, approval route and the measurement basis, and note what you could no longer ask the supplier to decide.',
      'State the measurement you would accept as evidence of effect rather than activity, and name who would be allowed to produce it.'
    ],
    ctaLabel: 'Open Compare Quotes',
    ctaHref: '#/calc/calc-compare-quotes',
    secondaryLabel: 'Open the RFP Preparation Checklist',
    secondaryHref: '#/cl/cl-rfp-preparation'
  }
});
