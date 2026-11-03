/* ==========================================================
   Procure Sherpa v3.0 - Academy Module 26: Services Should-Cost
   and Negotiation Analytics - Rates, Risk and the Price Arc.
   Module 3 builds a should-cost and Module 9 buys professional
   services; the two were never joined up, which is exactly where
   the money moves on a services portfolio. Three lessons and five
   concepts, written to the tighter Module 24 pattern because the
   emblem re-encode returned 18.9 KB and this tranche spends it.
   Written with no apostrophes, since these strings are single
   quoted and the build reads them literally.
   ========================================================== */

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-service-rate-pyramid-should-cost',
  title: 'Building a Should-Cost for a Service from the Rate Pyramid Up',
  module: 'Module 26: Services Should-Cost and Negotiation Analytics - Rates, Risk and the Price Arc',
  kicker: 'Function 26.1',
  tier: 'practitioner',
  tagline: 'A service price is hours by grade multiplied by rates that carry on-costs and margin. Model that and you can argue about the delivery team instead of the discount.',
  desc: "This function covers how to construct a defensible cost model for effort-based services: reading a proposal as a pyramid of grades rather than a blended rate, what a day rate actually has to cover once utilisation and bench time are counted, where overhead and margin hide inside rate cards, how to price the difference between the team proposed and the team the work needs, and how to keep the model usable at renewal rather than a one-off document built for a negotiation.",
  duration: '21 mins',
  lifecycleStage: 'Stage 10: Cost Modeling & Should-Cost',
  lifecycleDesc: 'Built before the commercial evaluation and re-run at every price event, because a dated model is a claim about a market rather than a fact.',

  what: "Goods have bills of materials. Services have a pyramid of people, and almost every argument about a services price happens because the buyer is comparing prices while the supplier is setting them from a mix the buyer has never seen. Start by converting a proposal into the only form that makes it comparable: hours by grade, rate by grade, and a total. A blended rate is a summary of that structure and it is the summary that hides the money. Two suppliers quoting 1,150 a day can differ by a third in price for the same deliverable, because one is selling partner time and the other is selling analyst time under the same label. Once the pyramid is visible, three questions do most of the work. What does the work actually need? A strategy study needs senior judgement at the points where the direction is set and a great deal of junior execution in between; a pitch team that turns into a delivery team is the commonest expensive pattern in the category, and the tell is a partner ratio that matches the sales meeting rather than the task list. What does each grade cost the supplier? You will not be told, but you can bound it: published market salary data for the role, a standard on-cost band for employment taxes and benefits, an overhead multiple that the industry carries openly, and a utilisation assumption that says how much of a paid week is billable. Multiply and you have a range, and the range is enough to argue with. What is left is margin, and margin is not a scandal - it is the line you negotiate when everything above it is defensible. Utilisation is the part buyers miss and suppliers rely on. A consultant who bills 62 percent of paid time carries roughly four months of bench a year, and that bench is funded by the 62 percent that is billed to someone. So a rate is not wage plus profit; it is wage plus on-costs plus a share of overhead plus the funding of unbillable time plus margin. When utilisation assumptions move, the rate should move with them, which is why an increase explained by wage inflation deserves a second question about what the model assumed last time and what it assumes now. This is where a rate card negotiation usually goes wrong: both sides argue the rate while the utilisation and the mix stay unexamined, and the settlement moves the least important number. Overhead and margin deserve to be visible lines rather than folded into rates, because folded costs cannot be tested. A supplier that will not disclose the structure can still be tested against a model you built yourself, and the honest form of that argument is a range with named assumptions: if your model says a grade costs 480 to 560 fully loaded and the card says 900, the question is not whether the supplier is dishonest but which assumption in your model is wrong - the overhead multiple, the utilisation, or the seniority of the people actually doing the work. Sometimes the answer is that the delivery model you asked for cannot be bought at the price you had in mind, and that is worth knowing before the contract rather than during it. The practical output is a should-cost for the service with four visible blocks: hours by grade from the delivery model you specified, rates by grade bounded by market data, an overhead and utilisation assumption you can name, and the resulting margin. State the date and the assumptions on the face of it, because a model without a date becomes an argument about decimals. Then use it three times, not once: as the commercial evaluation standard at award, as the test applied to any increase before renewal, and as the baseline against which realised savings are measured - because a saving against a price you never modelled is a number in a report rather than a change in the cost of the service.",
  why: [
    'A blended rate is a summary that hides the pyramid, and the pyramid is where the price comes from.',
    'A day rate funds on-costs, overhead and unbillable bench time before it funds margin.',
    'Utilisation assumptions move silently, and a wage-inflation story does not explain an occupancy increase.',
    'A model with named assumptions and a date is an argument; a single point estimate is a hostage to decimals.',
    'The same should-cost serves award, price increases and savings validation - building it once and using it three times is the point.'
  ],
  'when': [
    'Before the commercial evaluation of any effort-based bid.',
    'When two bids for the same scope differ by more than the market explains.',
    'At any rate-card renewal or above-index increase request.',
    'When a proposal looks senior-heavy relative to the work described.',
    'Before publishing a savings figure that came from a services renegotiation.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Owns the model, its assumptions and its date, and decides which parts of the pyramid are negotiable.' },
    { role: 'Finance Analyst', resp: 'Bounds grade costs from market salary data and on-costs, and tests the utilisation assumption against the rate.' },
    { role: 'Requesting Business Owner', resp: 'Defines the delivery mix the work actually needs rather than the mix that feels reassuring.' },
    { role: 'Supplier', resp: 'Prices a proposed team and defends the mix, not only the rate.' },
    { role: 'Savings Validator', resp: 'Measures realised change against the modelled baseline rather than against the last invoice.' }
  ],
  inputs: [
    'The proposal with hours by grade, or the request that produces them.',
    'Market salary and on-cost data for each grade, with the geography stated.',
    'The specification: what the work needs, at which grade, and what evidence requires senior involvement.',
    'Historical invoices showing actual mix and utilisation on comparable work.'
  ],
  outputs: [
    'A should-cost with four visible blocks: hours by grade, bounded rates by grade, overhead and utilisation assumption, resulting margin.',
    'A named list of assumptions with dates, and the sensitivity of the total to each.',
    'A priced gap between the proposed pyramid and the defensible one, which is the negotiation target.',
    'A baseline that later increases and claimed savings can be measured against.'
  ],
  controls: [
    'No effort-based award is recommended without a should-cost range attached to the commercial evaluation.',
    'Rates are compared grade to grade; a blended rate may not be the unit of comparison.',
    'Every model states its date, geography and utilisation assumption on the face of it.',
    'An above-index increase is tested against the model rather than accepted on a wage story.',
    'Claimed savings on services are validated against the modelled baseline before they are reported.'
  ],
  bestPractices: [
    'Ask for hours by grade in the bid template, before the proposals arrive, since the structure is easier to request than to reconstruct.',
    'Bound rather than seek: a range with named assumptions wins more arguments than a point estimate does.',
    'Compare the proposed pyramid against the work described, and price the difference.',
    'Re-run the model annually so a price arc is measured against something real.'
  ],
  mistakes: [
    'Negotiating the blended rate while the grade mix and the utilisation assumption stay untouched.',
    'Accepting a senior-heavy pyramid because seniority feels like accountability.',
    'Treating the supplier refusal to disclose as the end of the analysis rather than the start of a bounded model.',
    'Reporting a saving measured against an invoice rather than against a model.'
  ],
  terms: [
    { term: 'Rate pyramid', def: 'The distribution of hours across grades in a proposed team, which drives cost far more than the headline blended rate.' },
    { term: 'Fully loaded rate', def: 'A rate carrying wage, on-costs, a share of overhead, funding for unbillable time and margin.' },
    { term: 'Utilisation', def: 'The share of paid time a billable person spends on client work, which sets how much bench each billable hour funds.' },
    { term: 'Should-cost range', def: 'A cost model expressed as a band with named assumptions and a date, rather than a single figure.' }
  ],

  thinkingPoints: [
    {
      quote: 'The two bids that were not the same purchase.',
      explanation: 'Two consultancies quoted within 3 percent of each other on a blended day rate for a strategy study. Reconstructed into hours by grade, one proposed 380 partner days and 240 analyst days, the other 90 partner days and 620 analyst days. The second was 31 percent cheaper for the same deliverable, and the first had priced a selling exercise as though it were delivery.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: similar blended rates can conceal very different pyramids, and the pyramid is the purchase.',
      reflectionPrompt: 'On the last services award you recommended, could you produce hours by grade for the winning bid, and did anyone compare them with the work described?',
    },
    {
      quote: 'The wage story that was really occupancy.',
      explanation: 'A supplier defended an 8 percent rate rise as wage inflation. The bottom-up model already carried 62 percent utilisation, which funds roughly four months of bench per consultant a year. The wage case was about 4 percent; the rest was occupancy risk the buyer had been funding through volume commitments that were priced as loyalty.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a rate increase can be a change in who carries unbillable time, wearing the clothes of a cost increase.',
      reflectionPrompt: 'What utilisation does your largest services rate card assume, and has that assumption moved since the card was agreed?',
    }
  ],

  sopSteps: [
    { title: 'Convert the proposal into hours by grade', role: 'Category Manager',
      desc: 'Rebuild every bid, including the incumbent, as hours by grade against rates by grade. Where a proposal gives only a blended figure, request the split as a clarification before scoring.',
      control: 'No effort-based bid is scored on a blended rate; the grade structure is in the file or the gap is recorded.',
      record: 'Normalised pyramid per bidder with the clarification request where data was missing.',
      pitfall: 'Scoring two different purchases as if they were comparable because the headline rates matched.'
    },
    { title: 'Bound the cost of each grade', role: 'Finance Analyst',
      desc: 'Use published salary data for the role and geography, a stated on-cost band, an overhead multiple the sector carries, and a utilisation assumption, to produce a range per grade rather than a single figure.',
      control: 'Each grade carries a bounded cost with its four assumptions named and dated.',
      record: 'Grade cost table with salary source, on-cost band, overhead multiple, utilisation and date.',
      pitfall: 'Waiting for supplier disclosure instead of building a bounded model that can be argued with.'
    },
    { title: 'Test the pyramid against the work described', role: 'Requesting Business Owner',
      desc: 'Ask where senior judgement is genuinely required and where the deliverable needs execution, then compare that with the proposed mix. Price the difference between the two as the negotiation target.',
      control: 'The award recommendation states whether the proposed mix matches the work, and what the mismatch is worth.',
      record: 'Mix assessment with the priced gap between proposed and defensible pyramids.',
      pitfall: 'Accepting a partner-heavy team because seniority reads like accountability while the deliverables are documents that a grade below could produce.'
    },
    { title: 'State the utilisation assumption on the face of the model', role: 'Finance Analyst',
      desc: 'Record what share of paid time the rates assume is billable, since that is what funds bench time. Any later rate movement is read against this line before it is read against wages.',
      control: 'The model carries a utilisation figure with its source, and increase requests must address it.',
      record: 'Utilisation note with assumption, source and the movement observed at each price event.',
      pitfall: 'Settling an increase on a wage story while occupancy quietly moved into the rate.'
    },
    { title: 'Keep overhead and margin as visible lines', role: 'Category Manager',
      desc: 'Model overhead and margin separately rather than accepting them folded into rates. A visible margin line is negotiable; a margin buried in a blended rate is not.',
      control: 'The model shows a margin estimate per grade band, and negotiation objectives reference it explicitly.',
      record: 'Cost build-up with overhead and margin separated, and the negotiation objective attached.',
      pitfall: 'Arguing about price while the two largest movable components of the price stay unnamed.'
    },
    { title: 'Use the same model at every price event', role: 'Category Manager',
      desc: 'Re-run the should-cost at award, at any increase request and at renewal. The comparison across those runs is the evidence of whether the service got cheaper or more expensive on its own terms.',
      control: 'Each price event has a dated model attached, and increases are approved against the movement shown.',
      record: 'Model series by date with the delta explained line by line.',
      pitfall: 'Building a model for the negotiation and never producing it again at renewal, when the money actually is.'
    },
    { title: 'Validate savings against the model, not the invoice', role: 'Savings Validator',
      desc: 'Measure the change between the modelled cost of the delivery you asked for and the modelled cost after the negotiation, with the mix held constant. A rate cut that came with a senior mix change is not a saving.',
      control: 'Services savings are reported only where the baseline is a modelled cost with the mix held comparable.',
      record: 'Validation note with baseline model, post-negotiation model and the mix comparison.',
      pitfall: 'Reporting a saving measured against last year invoice while the team delivered changed in both directions.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'Two bids for a nine-month operating-model study quote blended rates of 1,180 and 1,205 a day. Reconstructed, Bid A proposes 340 partner days, 420 manager days and 260 analyst days; Bid B proposes 80 partner days, 500 manager days and 940 analyst days. The deliverables are identical.',
      q: 'What should the commercial evaluation do?',
      options: [
        { text: 'Compare on the blended rates, since the scope is identical and the rates are close.', isCorrect: false, rationale: 'The rates are close precisely because they average away the difference; the totals are not close.' },
        { text: 'Score the pyramids against the work: compute each total, test where senior judgement is actually needed, and treat a partner-heavy mix that does not match the deliverables as a priced assumption rather than as quality.', isCorrect: true, rationale: 'Correct. Bid B is materially cheaper for the same outputs, and the real question is whether 80 partner days is enough - which is a specification question the buyer can answer, not a rate question.' },
        { text: 'Ask both to lower the blended rate by 10 percent.', isCorrect: false, rationale: 'That moves the summary number and leaves the structure, which is the part worth money.' },
        { text: 'Prefer Bid A because senior people carry the risk.', isCorrect: false, rationale: 'Seniority carries risk only where senior judgement is required; elsewhere it is a rate.' }
      ],
      calcWork: 'Bid A total is 340P + 420M + 260A against Bid B 80P + 500M + 940A; at a typical 2.4x partner-to-analyst rate ratio the difference is roughly a third of the engagement value.',
      principle: 'The pyramid is the purchase; the blended rate is the receipt.',
    },
    {
      type: 'scenario',
      context: 'A managed services supplier requests a 7 percent uplift, citing wage inflation of 4.5 percent. The rate card is three years old. Delivery reports show the same scope staffed two grades more junior than at the start of the term.',
      q: 'What is the correct response?',
      options: [
        { text: 'Accept, since wage inflation is an external fact and 7 percent is close enough.', isCorrect: false, rationale: 'It is not close: the mix moved in your favour while the rate moved against you, and both facts belong in the same calculation.' },
        { text: 'Re-run the should-cost with the current mix and the wage movement, and negotiate the difference - a wage case of 4.5 percent does not survive a delivery mix that shifted two grades junior.', isCorrect: true, rationale: 'Correct. The model is the instrument that turns two separate claims into one arithmetic answer, and it is the same model that will be needed at the next price event.' },
        { text: 'Reject the increase outright and hold the old card.', isCorrect: false, rationale: 'That ignores the genuine input movement and costs relationship and delivery goodwill for a position the model does not support.' },
        { text: 'Ask for a five-year extension in exchange for the uplift.', isCorrect: false, rationale: 'That trades your largest remaining lever, renewal, for a number the model already disputes.' }
      ],
      principle: 'An increase request is a claim about inputs; test it against the model, including the mix you are actually being staffed.',
    },
    {
      type: 'knowledge',
      q: 'A consultant bills 62 percent of paid time. What does the rate have to cover beyond wages and on-costs?',
      options: [
        { text: 'Only overhead, since bench time is the suppliers problem to solve.', isCorrect: false, rationale: 'It is funded by the billable hours, which is why it appears in the rate.' },
        { text: 'The unbillable 38 percent, a share of overhead, and margin - which is why a movement in utilisation changes the rate with no change in wages.', isCorrect: true, rationale: 'Correct. That structure is the reason utilisation belongs on the face of the model rather than in a footnote.' },
        { text: 'Nothing further if the supplier reports good profitability.', isCorrect: false, rationale: 'Profitability is the result of these components, not an alternative to them.' },
        { text: 'Only margin, because overhead is recovered elsewhere.', isCorrect: false, rationale: 'Overhead recovery in a services business is largely inside the rate.' }
      ],
      principle: 'A rate funds the bench before it funds profit, so occupancy moves can masquerade as cost increases.',
    },
    {
      type: 'knowledge',
      q: 'Why should a services should-cost be expressed as a range with named assumptions?',
      options: [
        { text: 'Because suppliers will not accept a single figure.', isCorrect: false, rationale: 'They will argue with any number; the reason is evidential rather than procedural.' },
        { text: 'Because the inputs are estimates, and a range with dates and assumptions tells the reader which movement would change the answer - which is what makes it usable at a price event years later.', isCorrect: true, rationale: 'Correct. A point estimate invites an argument about decimals; a dated model with named assumptions invites an argument about the assumption that matters.' },
        { text: 'Because ranges are easier to build than point estimates.', isCorrect: false, rationale: 'The opposite is true, and ease is not the reason.' },
        { text: 'Because the savings methodology requires it.', isCorrect: false, rationale: 'The methodology requires a baseline; the range is what makes the baseline defensible.' }
      ],
      principle: 'The value of a cost model is that it can be re-run and argued, which a single number cannot do.',
    },
    {
      type: 'scenario',
      context: 'A category team reports 1.4 million in savings after renegotiating a services contract: rates fell 9 percent and the term extended by two years. Delivery later reports response times worsened and the team on the work is now a grade more senior than before.',
      q: 'What is the correct treatment of the reported saving?',
      options: [
        { text: 'It stands; the rates fell and the report is against the previous price.', isCorrect: false, rationale: 'Against the invoice, yes - and the invoice measured a different team.' },
        { text: 'Re-validate against the modelled cost of the delivery actually being received, holding the mix constant, and restate the saving with the term extension counted as a cost of the rate reduction.', isCorrect: true, rationale: 'Correct. A rate cut bought with a longer term and a changed mix is a different transaction than the number reported, and validation is where that gets said out loud.' },
        { text: 'Withdraw the saving entirely, since the mix changed.', isCorrect: false, rationale: 'That over-corrects; some of the reduction is real and the model is what separates it.' },
        { text: 'Ask finance to accept it, since the negotiation is closed.', isCorrect: false, rationale: 'That is the reporting failure the validation step exists to catch.' }
      ],
      principle: 'A saving measured against an invoice rather than a model can be a change in what was bought wearing the clothes of a price cut.',
    }
  ],
  relSop: 'sop-savings-calculation',
  rel: {
    concepts: ['service-should-cost-anatomy', 'labour-rate-pyramid', 'bench-utilisation-economics', 'should-cost', 'cost-breakdown', 'savings-baseline'],
    sops: ['sop-savings-calculation', 'sop-savings-validation', 'sop-supplier-price-increase-review', 'sop-negotiation-preparation'],
    checklists: ['cl-commercial-evaluation', 'cl-savings-validation', 'cl-quote-comparison'],
    templates: ['tpl-commercial-evaluation', 'tpl-savings-calculation', 'tpl-cost-avoidance'],
    calcs: ['calc-should-cost', 'calc-compare-quotes', 'calc-price-escalation', 'calc-negotiation-savings'],
    decisions: ['unit-or-tco', 'accept-price-increase', 'negotiate-or-accept'],
    kpis: ['kpi-ppv', 'kpi-savings-realization', 'kpi-savings'],
    glossary: ['gloss-should-cost', 'gloss-rate-card', 'gloss-run-rate']
  },
  labMission: {
    title: 'Mission 26.1: Turn a Blended Rate into a Pyramid',
    desc: 'Take one services bid or invoice you can reach and rebuild it as hours by grade.',
    tasks: [
      'Reconstruct one current services engagement as hours by grade and rates by grade. If the split is unavailable, draft the clarification request you would send.',
      'Build a bounded cost per grade from salary data, on-costs, an overhead multiple and a utilisation assumption, and write the four assumptions on one line.',
      'Compare the proposed mix with where the work needs senior judgement, and price the difference.'
    ],
    ctaLabel: 'Open Should-Cost',
    ctaHref: '#/calc/calc-should-cost',
    secondaryLabel: 'Open the Commercial Evaluation Checklist',
    secondaryHref: '#/cl/cl-commercial-evaluation'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-service-risk-and-pricing-structures',
  title: 'Fixed Price, Time and Materials, Retainer and Gainshare: Who Carries Effort Risk',
  module: 'Module 26: Services Should-Cost and Negotiation Analytics - Rates, Risk and the Price Arc',
  kicker: 'Function 26.2',
  tier: 'practitioner',
  tagline: 'Every commercial structure is a risk transfer with a price attached. Negotiate the transfer and the price together, or you will pay twice.',
  desc: "This function covers the choice of commercial structure for a service and the consequences that follow it into delivery: what fixed price actually buys and what it costs in scope rigidity, when time and materials is the honest answer and how to stop it becoming an open cheque, what a retainer is really paying for, how to design a gainshare that can be measured, and how hybrid structures end up placing risk with the buyer and flexibility with the supplier.",
  duration: '22 mins',
  lifecycleStage: 'Stage 15: Contract Formulation & Legal Review',
  lifecycleDesc: 'Decided during structuring, because the choice shapes the change-order behaviour, the reporting and the dispute route of the whole term.',

  what: "Ask a supplier why a fixed price costs more than the same work on time and materials and the honest answer is that they are selling you certainty. That answer is the whole subject of this lesson, because certainty is a product with a price, and most services contracts pay it without deciding to. Fixed price transfers effort risk to the supplier: if the work takes longer, they absorb it. The consequence is not that the buyer stops caring about effort, it is that the supplier manages the risk by controlling scope, and every ambiguity in your specification becomes a negotiation later. This is why a fixed price on a scope written as outcomes rather than outputs is not cheaper - it is paid for later, in change orders, at prices set by the party holding the interpretation. The route that makes fixed price work is a definition of done specific enough to price, an acceptance test someone can fail, and a change mechanism that is priced as routine rather than as a favour. Time and materials transfers effort risk back to you and buys something genuinely valuable: the ability to change direction without a commercial event. It is the right structure for discovery, for work whose scope cannot be known yet, and for needs where speed of redirection matters more than predictability of cost. The failure mode is an open cheque, and it is prevented by structures that are cheap to write: an effort cap by phase with a decision point at the cap, named roles and rates, a weekly burn report against a plan, and a rule that continuing past the cap is a written decision rather than an email nobody sent. A retainer sells availability rather than work. That is a legitimate thing to buy - priority access, a named team that holds capacity for you, a response commitment - and it is usually over-bought, because the buyer values the certainty of having someone and pays for it as though it were delivery. The test is arithmetic: how many days of the retained capacity did you actually use across a year, at what effective rate does that put the work, and what would the same access have cost on call-off rates with a response commitment written down. Most retainers that fail that test survive because the alternative was never priced. Gainshare and painshare tie reward to a measured outcome, and they are the most seductive and most often badly drafted of the structures. The reason is simple: the incentive is easy to agree and the measurement is hard. A gainshare on savings achieved needs a baseline that both sides accept before the work starts, a definition of what counts as a saving rather than a change in volume, a measurement method, a named party who measures, and a cap. Without those five, the parties do not have an incentive - they have a dispute with a payment attached. The commonest failure is a baseline that was never agreed, because agreeing it would have required the business to say what it actually spends. Hybrid structures deserve a warning of their own: fixed price for the parts that are well understood, time and materials for the rest, a retainer on top for access, and an incentive on a measure nobody owns. Each component is defensible and together they can produce the worst arrangement available, where the buyer carries effort risk on the flexible part, the supplier carries scope risk they will recover through change orders on the fixed part, and the retainer funds neither. The way to see this coming is to write, on one page, who bears the cost of being wrong about effort under each clause, and to check that the answer matches what you intended. That page is also where the price of the transfer becomes visible: a supplier taking effort risk needs a contingency, and a buyer accepting variability needs a reporting discipline. Both are real costs, and the negotiation is about which one you would rather pay, informed by which risk the delivery model can actually absorb - because a fixed price on work you will change twice a quarter is not certainty, it is a schedule of disputes.",
  why: [
    'A commercial structure is a risk transfer with a price, and paying it unconsciously is the default.',
    'Fixed price buys certainty and costs scope rigidity; its real cost appears in change orders.',
    'Time and materials is honest for unknown scope and needs a cap, a decision point and a burn report to stay honest.',
    'A retainer buys availability, and availability should be priced against call-off rates before it is bought again.',
    'A gainshare without an agreed baseline, a measurement method and a named measurer is a dispute with a payment attached.'
  ],
  when: [
    'Structuring any services contract, before the commercial schedule is drafted.',
    'When change orders have become routine on a fixed-price engagement.',
    'At renewal of a retainer whose usage has never been measured.',
    'When a supplier proposes an outcome-based incentive on a measure nobody owns.',
    'When a hybrid structure has grown clause by clause rather than been designed.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Decides which risk transfer the business is buying and prices it against the alternatives.' },
    { role: 'Requesting Business Owner', resp: 'States how much scope variability the work genuinely carries, which decides the honest structure.' },
    { role: 'Legal', resp: 'Drafts the definition of done, acceptance, change pricing and the cap, and names who measures an incentive.' },
    { role: 'Finance', resp: 'Tests retainer usage against call-off economics and holds the baseline for any gainshare.' },
    { role: 'Supplier', resp: 'Prices the risk carried and states what it needs in return to carry it.' }
  ],
  inputs: [
    'A scope statement with the expected variability named, not hidden.',
    'Effort estimate by grade from the should-cost model.',
    'Historical change-order and utilisation data for comparable engagements.',
    'For any incentive: a candidate baseline, a measurement method and a party able to measure.'
  ],
  outputs: [
    'A one-page statement of who bears effort risk under each commercial clause.',
    'A priced comparison of the structures considered, including the cost of the risk transfer.',
    'The mechanism that makes the chosen structure work: acceptance and change pricing, or cap and burn report, or usage review.',
    'For incentives, the five elements - baseline, definition, method, measurer, cap - or a decision not to use one.'
  ],
  controls: [
    'The structure choice carries a written reason tied to scope variability, not to preference for certainty.',
    'Fixed-price engagements have a definition of done, an acceptance test and a routine change price.',
    'Time and materials work has an effort cap with a named decision point at the cap.',
    'Retainers are reviewed annually against actual usage and effective rate.',
    'No incentive clause is signed without an agreed baseline and a named party who measures.'
  ],
  bestPractices: [
    'Write the risk-transfer page before drafting the schedule; it is where the argument should happen.',
    'Price the flexibility you are buying under time and materials rather than treating it as free.',
    'Put change orders on a published rate card so they become routine arithmetic instead of negotiation.',
    'Treat a supplier proposal for gainshare as a request to define the baseline now, not later.'
  ],
  mistakes: [
    'Choosing fixed price to feel safe on work that will change twice a quarter.',
    'Renewing a retainer because it exists, without ever measuring used capacity.',
    'Signing an incentive whose baseline was never agreed because agreeing it was awkward.',
    'Building a hybrid clause by clause until the buyer holds the risk and the supplier holds the flexibility.'
  ],
  terms: [
    { term: 'Effort risk', def: 'The exposure that the work takes more time than planned, and the party the structure makes absorb it.' },
    { term: 'Definition of done', def: 'The specific, testable description of the deliverable that makes a fixed price meaningful.' },
    { term: 'Gainshare', def: 'A reward tied to a measured outcome against an agreed baseline, capped and independently assessed.' },
    { term: 'Effective rate', def: 'What retained capacity actually costs per day of work used, once unused availability is counted.' }
  ],

  thinkingPoints: [
    {
      quote: 'The fixed price that arrived as 41 change orders.',
      explanation: 'A digital programme was sold fixed price on a scope written as outcomes rather than outputs. Two quarters in, the change-order log held 41 items, each priced by the supplier as a surprise, each one genuinely ambiguous in the original document. The settlement landed close to a time and materials cost with a year of argument attached, and the internal sponsor concluded that fixed price had failed, when the structure had worked exactly as priced: the ambiguity was the product.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a fixed price on an imprecise scope does not remove effort risk, it relocates the negotiation into the change-order route.',
      reflectionPrompt: 'On your largest fixed-price engagement, how many change orders were raised last year, and were they priced from a card or argued case by case?',
    },
    {
      quote: 'The retainer nobody had used.',
      explanation: 'A specialist advisory retainer of 40 days a year was renewed for four years because the business wanted access on demand. Usage across those years averaged nine days. The effective cost per day used was more than four times the call-off rate the same supplier charged on the framework, and the response commitment that justified the retainer had never been written into the contract.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: availability is a real product, but it should be priced against the alternative and the commitment should be contractual.',
      reflectionPrompt: 'For each retainer you hold, what was the effective rate per day actually used last year, and is the response commitment written down?',
    }
  ],

  sopSteps: [
    { title: 'State the scope variability before choosing the structure', role: 'Requesting Business Owner',
      desc: 'Describe how much the work is expected to change during delivery and what would trigger that change. This is the input that decides between certainty and flexibility, and it is usually left unstated so the supplier decides for you.',
      control: 'The structuring note records expected variability with its triggers, agreed by the business owner rather than assumed by procurement.',
      record: 'Variability statement with triggers and the expected frequency of change.',
      pitfall: 'Choosing fixed price because it sounds disciplined on work everyone knows will move.'
    },
    { title: 'Write the one-page risk-transfer map', role: 'Category Manager',
      desc: 'For each commercial clause, name who bears the cost of being wrong about effort, and check the whole against what you intended to buy. The map is where a hybrid structure reveals itself as unfunded risk on one side and free flexibility on the other.',
      control: 'No services contract is recommended without the risk-transfer map attached to the recommendation.',
      record: 'Risk-transfer map with the intended and actual position per clause.',
      pitfall: 'Reviewing clauses individually and never reading the combined allocation of risk.'
    },
    { title: 'Price the certainty you are buying', role: 'Category Manager',
      desc: 'Compare the fixed price against the modelled cost of the same work on time and materials with a cap, and treat the difference as the price of the transfer. Decide whether that price is worth it given the variability stated at the start.',
      control: 'The premium over the modelled effort cost is recorded and justified in the recommendation.',
      record: 'Structure comparison with the priced risk transfer and the decision reason.',
      pitfall: 'Accepting a fixed-price premium as protection while the change-order route quietly spends it back.'
    },
    { title: 'Make the fixed-price route real or abandon it', role: 'Legal',
      desc: 'If fixed price is chosen, write a definition of done specific enough to price, an acceptance test that can fail, and a change mechanism with published rates. If the scope cannot support that, the structure is wrong and should be changed before the schedule is drafted.',
      control: 'Every fixed-price engagement has a testable definition of done and a rate card for changes.',
      record: 'Definition of done, acceptance criteria and the change price card.',
      pitfall: 'Drafting outcomes as though they were outputs because outcomes read better in a business case.'
    },
    { title: 'Cap and instrument time and materials', role: 'Finance',
      desc: 'Set an effort cap by phase with a named decision point at the cap, require a weekly burn report against plan, and make continuation past the cap a written decision. This is the discipline that keeps the flexibility honest rather than open-ended.',
      control: 'No time and materials engagement runs beyond its cap without a dated decision naming the approver and the revised forecast.',
      record: 'Cap register, burn reports and the decision record at each crossing.',
      pitfall: 'Discovering the overrun at invoice time because the burn report was requested once and never read.'
    },
    { title: 'Review retainers against used capacity', role: 'Finance',
      desc: 'Each year, compute days used against days retained and the effective rate per day used, and compare with call-off economics including any response commitment actually contracted. Renew, resize or exit on that arithmetic.',
      control: 'Retainer renewal requires the usage arithmetic and a written response commitment, or the retainer is resized.',
      record: 'Retainer review with usage, effective rate, comparison and decision.',
      pitfall: 'Renewing availability because cancelling it feels like losing access in an emergency.'
    },
    { title: 'Build the five elements or drop the incentive', role: 'Legal',
      desc: 'For any gainshare or painshare, agree the baseline before work starts, define what counts as the outcome rather than a volume change, name the measurement method and the party who measures, and cap the payment. If any element is missing, remove the clause.',
      control: 'Incentive clauses are signed only with all five elements present, and the baseline is dated before mobilisation.',
      record: 'Incentive schedule with baseline, definition, method, measurer and cap.',
      pitfall: 'Signing an incentive whose baseline was never agreed, then discovering the parties hold different numbers years later.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A transformation programme will run for eighteen months. The sponsor expects the scope to change at least quarterly. The supplier proposes a fixed price with a change-control procedure, priced 22 percent above the modelled effort cost.',
      q: 'What is the strongest commercial advice?',
      options: [
        { text: 'Accept it; fixed price with change control is the disciplined answer to a changing scope.', isCorrect: false, rationale: 'The 22 percent is the price of certainty you have just said you do not want, and the change route will spend it again.' },
        { text: 'Challenge the structure rather than the premium: on a scope expected to move quarterly, time and materials with phase caps, a burn report and a decision point buys the flexibility you will actually use, and the fixed price is worth its premium only if the scope can be held.', isCorrect: true, rationale: 'Correct. The variability statement and the risk-transfer map lead to this answer; the premium is not a negotiation failure, it is a mismatch.' },
        { text: 'Negotiate the premium down to 12 percent and keep the structure.', isCorrect: false, rationale: 'That is a better price for the wrong product.' },
        { text: 'Split into fixed price for phase one and time and materials later.', isCorrect: false, rationale: 'Reasonable only if phase one scope is genuinely firm, which the sponsor has already contradicted.' }
      ],
      principle: 'Buy certainty where the scope holds and flexibility where it does not; the premium is the tell of a mismatch.',
    },
    {
      type: 'scenario',
      context: 'A legal advisory retainer of 60 days a year has run three terms at 340,000. Usage was 14, 11 and 17 days. Call-off rates on the same panel cost 2,900 a day with a 48-hour response commitment.',
      q: 'What does the arithmetic support?',
      options: [
        { text: 'Renew, since the retainer guarantees access the business may need.', isCorrect: false, rationale: 'The guarantee was never priced against usage or written as a commitment.' },
        { text: 'Resize or exit: at 17 days used, the effective rate is roughly double the call-off rate, and a written response commitment plus call-off buys the same access for less.', isCorrect: true, rationale: 'Correct. Availability is real and worth paying for, but the payment should match the amount actually consumed and the commitment should be contracted.' },
        { text: 'Keep the retainer and negotiate the annual fee down 10 percent.', isCorrect: false, rationale: 'That still funds 43 days of capacity nobody used.' },
        { text: 'Convert the retainer into a gainshare on avoided external spend.', isCorrect: false, rationale: 'That adds an incentive with no agreed baseline to a structure that already does not fit.' }
      ],
      calcWork: '340,000 divided by 17 days used is roughly 20,000 a day against a 2,900 call-off rate; even a 30-day year is 11,300 a day used.',
      principle: 'A retainer is bought for availability and should be measured on days used, with the commitment written down.',
    },
    {
      type: 'knowledge',
      q: 'Which five elements make a gainshare clause workable?',
      options: [
        { text: 'Baseline, definition of the outcome, measurement method, a named party who measures, and a cap.', isCorrect: true, rationale: 'Correct. Missing any one turns an incentive into an argument, and the baseline has to be agreed before the work starts.' },
        { text: 'Percentage, target, review date, sponsor approval and a bonus pool.', isCorrect: false, rationale: 'Those describe a payment, not a measurable incentive.' },
        { text: 'Only a target and a percentage, since the rest is implied.', isCorrect: false, rationale: 'Everything else is exactly what is disputed later.' },
        { text: 'Baseline and percentage; the method can be settled at first review.', isCorrect: false, rationale: 'Settling the method after the fact is how both sides claim a measurement that favours them.' }
      ],
      principle: 'An incentive is only as good as the measurement agreed before the work begins.',
    },
    {
      type: 'knowledge',
      q: 'What is the practical purpose of an effort cap with a decision point on time and materials work?',
      options: [
        { text: 'To limit the suppliers freedom to staff the engagement.', isCorrect: false, rationale: 'Staffing is governed by the mix and rates, not the cap.' },
        { text: 'To convert an open-ended exposure into a scheduled choice: at the cap someone with authority decides whether to fund more, change scope or stop, with a revised forecast in front of them.', isCorrect: true, rationale: 'Correct. The cap is not a price control, it is a governance event that keeps flexibility honest.' },
        { text: 'To guarantee the final cost of the engagement.', isCorrect: false, rationale: 'It guarantees a decision, not a total.' },
        { text: 'To replace the need for burn reporting.', isCorrect: false, rationale: 'The cap depends on the burn report to mean anything.' }
      ],
      principle: 'Flexibility without a decision point is not a commercial structure, it is an unreviewed commitment.',
    },
    {
      type: 'scenario',
      context: 'A services contract combines fixed price for a defined module, time and materials for advisory work, a retainer for access, and a gainshare on process savings. Reviewing it, procurement finds the buyer bears effort risk on the advisory part, the supplier bears scope risk on the fixed part, and the gainshare baseline is disputed.',
      q: 'What is the correct diagnosis?',
      options: [
        { text: 'The contract is comprehensive and covers all cases.', isCorrect: false, rationale: 'Comprehensive coverage of clauses is not an allocation of risk anyone chose.' },
        { text: 'A hybrid assembled clause by clause has placed risk with the buyer and flexibility with the supplier; rewrite the risk-transfer map, then remove or convert the components the map cannot justify.', isCorrect: true, rationale: 'Correct. The map is the diagnostic instrument, and the remedy is structural rather than a rate discussion.' },
        { text: 'Renegotiate the gainshare percentage.', isCorrect: false, rationale: 'That adjusts a clause nobody can measure.' },
        { text: 'Terminate and re-tender the whole scope.', isCorrect: false, rationale: 'That is a large instrument for a design fault that can be corrected at the next renewal or by variation.' }
      ],
      principle: 'Read the combined risk allocation, not the clauses; a hybrid can transfer risk to nobody and cost to you.',
    }
  ],
  relSop: 'sop-contract-review',
  rel: {
    concepts: ['service-risk-pricing-models', 'statement-of-work', 'service-level-agreement', 'change-control', 'multiyear-price-arc', 'liability-indemnity'],
    sops: ['sop-contract-review', 'sop-contract-change-control', 'sop-negotiation-preparation', 'sop-contract-renewal'],
    checklists: ['cl-contract-review', 'cl-negotiation', 'cl-exception-approval'],
    templates: ['tpl-rfp', 'tpl-contract-change-request', 'tpl-exception-request', 'tpl-negotiation-planner'],
    calcs: ['calc-multi-year-contract-cost', 'calc-should-cost', 'calc-payment-terms'],
    decisions: ['negotiate-or-accept', 'approve-exception', 'rfq-or-rfp'],
    kpis: ['kpi-contract-compliance', 'kpi-cost-avoidance', 'kpi-roi'],
    glossary: ['gloss-sow', 'gloss-sla', 'gloss-change-order']
  },
  labMission: {
    title: 'Mission 26.2: Draw the Risk Transfer You Actually Signed',
    desc: 'Take one live services contract and put its commercial clauses on one page.',
    tasks: [
      'For one contract you can read today, list every commercial clause and write who bears the cost of being wrong about effort. Compare the result with what the business believes it bought.',
      'Compute the effective rate per day used for one retainer you hold, and check whether a response commitment is actually contracted.',
      'Find one incentive clause and test it against the five elements. If any are missing, write the decision to remove or fix it.'
    ],
    ctaLabel: 'Open Multi-Year Contract Cost',
    ctaHref: '#/calc/calc-multi-year-contract-cost',
    secondaryLabel: 'Open the Contract Review Checklist',
    secondaryHref: '#/cl/cl-contract-review'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-service-negotiation-analytics',
  title: 'Negotiation Analytics for Services: Concession Value, Leverage on the Mix, and the Price Arc',
  module: 'Module 26: Services Should-Cost and Negotiation Analytics - Rates, Risk and the Price Arc',
  kicker: 'Function 26.3',
  tier: 'executive',
  tagline: 'On a five-year services contract most of the money is spent after the negotiation that set the tone. Negotiate the arc, the mix and the evidence - not the entry rate.',
  desc: "This function covers how a board should read a services negotiation: what a concession is worth when it is priced rather than described, where leverage actually sits in a rate pyramid and a utilisation assumption, how indexation clauses and step-ups compound into a price arc, what a term extension really buys and what it costs in future market access, and the reporting discipline that lets an executive tell a real saving from a re-badged one.",
  duration: '20 mins',
  lifecycleStage: 'Stage 13: Commercial Negotiation',
  lifecycleDesc: 'Set at mandate approval, because the objectives that go into a services negotiation decide what the reported saving will mean afterwards.',

  what: "Services negotiations are reported as rate reductions and are won or lost on three other things: the mix, the arc and the evidence. An executive who understands those three can read a negotiation paper in two minutes and know whether to sign it. Start with concessions, because the discipline changes the conversation. A concession has a value only when it is priced: an extended term is worth the supplier certainty of future revenue and is worth you the ability to walk away later; a volume commitment is worth their occupancy planning and costs you the flexibility to move; a payment-terms change is worth working capital to one side and cash to the other; a case study right or a reference is worth marketing and costs nothing unless you asked for it. Write them as a ledger with an estimated value on both sides, and the negotiation stops being a contest of insistence and becomes a trade, which is where the value is. Leverage in services rarely comes from threatening to leave; it comes from knowing the cost structure better than the other party expects. The rate pyramid is the first place: a supplier defending a blended rate while you quote the partner-to-analyst ratio in their own proposal has been put on the defensive about a number they cannot argue. Utilisation is the second: a rate rise explained by wages is a different proposition when the assumed utilisation has moved from 68 percent to 62 percent, because the increase is then about who funds the bench rather than about pay. The third is pipeline: a supplier carrying a contract at low margin often values continuity more than price, and a well-timed statement of your re-tender date can buy a term concession rather than a rate one. None of this requires inside knowledge; it requires a should-cost and a delivery report. The price arc is where boards are routinely misled. A five-year contract signed 6 percent below the incumbent rate and stepped up 4 percent a year against a loosely defined index is not a 6 percent saving; it is a discount in year one and a compounding increase in years three to five. Model the arc across the term before signing, insist that any indexation names its basket, is capped, and is evidenced by the input actually moving, and require the modelled should-cost to be re-run annually so the arc is measured against something rather than against the last invoice. Term extensions deserve the same arithmetic, because they are the concession most often given for nothing: a longer term is real value to a supplier and it costs you the ability to test the market at a moment of your choosing. The honest form is to price it - what does the third year cost you in option value, and what does it buy in rate, in transition avoidance and in delivery investment - and to keep at least one genuine break point that is cheap to exercise. A ceremonial termination-for-convenience clause with ninety days notice and no transition support is not a break point; it is a paragraph. Finally, the reporting question an executive should ask of any services saving, and it takes one sentence: measured against what, and did the delivery change? A rate cut accepted alongside a team that moved two grades junior is a different purchase, not a cheaper one. A saving claimed against a budget rather than a baseline is a forecast revision. A renegotiation that extended the term in exchange for a rate reduction has bought the reduction with your own future optionality, and the report should say so. The discipline that fixes all three is the same one that fixes the negotiation: a modelled baseline with named assumptions and a date, a concession ledger, and a rule that reported savings name the delivery they compare. It is worth insisting on because the alternative is a portfolio of services contracts whose prices rose every year while the reports showed savings, and nobody in the room has seen the arithmetic.",
  why: [
    'A concession has a value on both sides or it is not a concession; unpriced gives are how leverage is donated.',
    'Leverage in services sits in the mix, the utilisation assumption and the re-tender date, not in the threat to leave.',
    'The price arc, not the entry rate, decides the outcome of a multi-year contract.',
    'A term extension buys the supplier certainty and costs you optionality, so it should be paid for.',
    'A reported saving must name its baseline and whether the delivery changed, or it is a re-badged purchase.'
  ],
  when: [
    'Approving the mandate for any services negotiation above the delegated threshold.',
    'Before agreeing a term extension, a volume commitment or an indexation clause.',
    'When a savings report claims a services reduction you cannot trace to a model.',
    'At the annual review of the largest services contracts in the portfolio.',
    'When a supplier argues wage inflation and no one has asked about utilisation.'
  ],

  raci: [
    { role: 'Executive Sponsor', resp: 'Approves the mandate, the priced concession ledger and the walk-away position.' },
    { role: 'Head of Procurement', resp: 'Owns the negotiation plan, the leverage analysis and the decision to extend or re-tender.' },
    { role: 'Finance', resp: 'Models the price arc across the term, values the concessions and holds the savings baseline.' },
    { role: 'Category Manager', resp: 'Brings the should-cost, the delivery mix evidence and the re-tender readiness.' },
    { role: 'Legal', resp: 'Drafts indexation with a named basket and cap, and a break point that can actually be exercised.' }
  ],
  inputs: [
    'The should-cost model with its assumptions and date.',
    'Delivery reporting showing the actual grade mix against the proposed one.',
    'The contract schedule: indexation, step-ups, volume bands, break points, exit costs.',
    'A concession ledger with an estimated value on each side.'
  ],
  outputs: [
    'A mandate that names the objective, the walk-away, and the concessions available with their prices.',
    'A modelled price arc across the term with the indexation assumptions stated.',
    'A decision on extension versus re-tender with option value priced rather than assumed.',
    'A savings statement naming its baseline and confirming whether the delivery changed.'
  ],
  controls: [
    'No services settlement is approved without the total modelled across the whole term.',
    'Indexation names its basket, carries a cap, and requires evidence of the input moving.',
    'Term extensions and volume commitments are approved at the level that owns the optionality given up.',
    'Every reported services saving states its baseline and its mix comparison.',
    'At least one break point per long contract is priced and exercisable without a transition cliff.'
  ],
  bestPractices: [
    'Negotiate the arc and the mix in the same session; separating them lets each side concede the cheap one.',
    'Put the re-tender date on the table early - it is often worth more than the rate argument.',
    'Ask what utilisation the rate assumes before discussing any increase.',
    'Require the savings report to carry one line of arithmetic, and it will be honest.'
  ],
  mistakes: [
    'Approving a headline rate cut that came with uncapped indexation.',
    'Granting a two-year extension for a rate reduction and calling the reduction the saving.',
    'Accepting a wage-inflation story without testing occupancy assumptions.',
    'Reporting savings against budget, which measures forecast rather than cost.'
  ],
  terms: [
    { term: 'Concession ledger', def: 'The list of what each side gives with an estimated value on both sides, used to trade rather than to insist.' },
    { term: 'Price arc', def: 'The path of price across the life of a contract, including indexation and step-ups, rather than the entry rate.' },
    { term: 'Option value', def: 'What a term extension costs you in ability to test the market later, priced rather than assumed.' },
    { term: 'Break point', def: 'A dated, priced and exercisable right to end a long contract without a transition cliff.' }
  ],

  thinkingPoints: [
    {
      quote: 'The 6 percent saving that became 11 percent above market.',
      explanation: 'A five-year facilities contract was signed 6 percent under the incumbent rate with annual step-ups against an index clause that never named its basket. By year four the price sat 11 percent above what the market would now quote, and the exit required requalification of a specialist service that should have begun in year three. Every annual report in between had shown the original saving.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: an entry-rate win and an unexamined arc produce a contract that gets worse while the report stays positive.',
      reflectionPrompt: 'For your longest services contract, do you know the modelled price in its final year, and has anything re-run the should-cost since award?',
    },
    {
      quote: 'The extension that paid for the reduction.',
      explanation: 'A managed services rate fell 9 percent at renewal and the term extended by two years. The delivery team moved a grade more junior in year one of the new term and response times worsened. The rate reduction was real, the saving was not, and the optionality to test the market had been spent on the transaction.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a term extension is a concession with a value, and if it is not priced the supplier has been paid without a decision being taken.',
      reflectionPrompt: 'Who in your organisation can approve a two-year extension, and does the paper they sign carry the value of the optionality given up?',
    }
  ],

  sopSteps: [
    { title: 'Set the mandate on the arc, not the entry rate', role: 'Head of Procurement',
      desc: 'State the objective as the modelled total cost across the term, with the walk-away position and the concessions available. A mandate written as a percentage off rates invites exactly the trade that loses the money.',
      control: 'Negotiation mandates express the objective as a term-total and name the walk-away.',
      record: 'Approved mandate with term-total objective, walk-away and concession list.',
      pitfall: 'Authorising a rate target and discovering later that the indexation clause was the larger number.'
    },
    { title: 'Price both sides of every concession', role: 'Finance',
      desc: 'Build the ledger: term extension, volume commitment, payment terms, publicity rights, reporting cadence, each with an estimated value to the supplier and a cost to you. Trade from the ledger rather than conceding under pressure.',
      control: 'No concession is granted without a value on both sides recorded in the ledger.',
      record: 'Concession ledger with values, the trades made and the approver of each give.',
      pitfall: 'Giving the two most valuable concessions - term and volume - in exchange for the least valuable one, a rate line.'
    },
    { title: 'Locate leverage in the mix and the bench', role: 'Category Manager',
      desc: 'Bring the should-cost, the proposed pyramid and the utilisation assumption to the table, and use the re-tender date as a live fact rather than a threat. Leverage in services is evidential, and evidence the supplier cannot rebut is worth more than insistence.',
      control: 'The negotiation pack carries the model, the mix comparison and the readiness position with dates.',
      record: 'Negotiation pack with model, mix evidence, utilisation assumption and re-tender readiness.',
      pitfall: 'Negotiating a rate while the two numbers that set it - the mix and the bench funding - stay unexamined.'
    },
    {
      title: 'Model the price arc before signing', role: 'Finance',
      desc: 'Project year-one rates, indexation, step-ups, volume bands and the renewal year into one total per year, and show the final-year position against the market as it stands today. If the arc is not acceptable, the structure is not acceptable.',
      control: 'A term-total projection accompanies every multi-year services approval, including the final-year comparison.',
      record: 'Price arc projection with index assumptions and the final-year market comparison.',
      pitfall: 'Reading a five-year deal as a one-year price with four years of silence attached.'
    },
    { title: 'Constrain indexation with a basket, a cap and evidence', role: 'Legal',
      desc: 'Name what the index measures, cap the movement, and require the supplier to show the input actually changed before the clause operates. A formula without a basket is a licence to increase.',
      control: 'Indexation clauses state basket, cap and evidence requirement, and are tested at first use.',
      record: 'Indexation clause with basket definition, cap and the evidence supplied at each application.',
      pitfall: 'Accepting an index reference on the assumption it moves with wages when it tracks something else entirely.'
    },
    { title: 'Price the optionality in any extension', role: 'Executive Sponsor',
      desc: 'Before granting a longer term, state what it costs in ability to re-test the market and what it buys in rate, transition avoidance and delivery investment. Keep one break point dated, priced and exercisable without a transition cliff.',
      control: 'Extensions above a stated length are approved at the level owning the optionality, and every long contract carries an exercisable break point.',
      record: 'Extension decision with the option value priced and the break point dated.',
      pitfall: 'Treating a termination-for-convenience paragraph as a break point when exit costs make it unusable.'
    },
    { title: 'Report savings with their baseline and their mix', role: 'Finance',
      desc: 'Every reported services saving states what it was measured against and whether the delivery changed. Where the mix moved, the comparison is restated on a like-for-like basis before the number reaches a board.',
      control: 'Savings reporting is rejected without a named baseline and a mix comparison, and restatements are logged.',
      record: 'Savings statement with baseline, mix comparison and any restatement history.',
      pitfall: 'A portfolio where prices rose every year while the reports showed savings, because nobody asked measured against what.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A renewal paper asks approval for a 9 percent rate reduction on a managed service, a two-year term extension, and indexation to a named published index from year two. Delivery reports show the team moved a grade more junior in the last term.',
      q: 'What should the approver require before signing?',
      options: [
        { text: 'Approval, since the rate reduction is larger than anything achieved last cycle.', isCorrect: false, rationale: 'A rate line is the least informative number in the paper.' },
        { text: 'A term-total projection across the extended arc, the value of the optionality given by the extension, and a like-for-like cost comparison holding the delivery mix constant.', isCorrect: true, rationale: 'Correct. Those three turn a headline into a decision: the arc may exceed the rate cut, the extension has a cost, and the mix change may already account for the reduction.' },
        { text: 'A further 3 percent off rates in exchange for the extension.', isCorrect: false, rationale: 'That trades more optionality for a number that has not been defined against a baseline.' },
        { text: 'Reject the indexation and keep everything else.', isCorrect: false, rationale: 'Indexation with a named basket may be reasonable; the problem is the unmodelled whole.' }
      ],
      principle: 'Approve the arc, the option value and the mix comparison - the entry rate is one line in a decision that is not about rates.',
    },
    {
      type: 'scenario',
      context: 'In a negotiation the supplier argues that rates must rise 6 percent because wage inflation is 5 percent. Your model assumes 68 percent utilisation; their last three invoices imply the team is now staffed at 61 percent utilisation and one grade more junior.',
      q: 'Where is the leverage?',
      options: [
        { text: 'In the threat to re-tender, which should be made early and loudly.', isCorrect: false, rationale: 'The date matters, but the argument is already won on evidence, and threats cost relationship you will need next year.' },
        { text: 'In the utilisation and mix numbers: the wage case explains part of the movement, and the occupancy change plus the junior shift point the other direction, so the rate conversation becomes arithmetic rather than insistence.', isCorrect: true, rationale: 'Correct. Leverage in services comes from a model the supplier cannot rebut, and here two of the three drivers argue against the increase.' },
        { text: 'In comparing their rate to another suppliers blended rate.', isCorrect: false, rationale: 'Blended comparisons hide the mix, which is exactly the ground being argued.' },
        { text: 'In asking for a longer term at a lower rate.', isCorrect: false, rationale: 'That is a trade to make once the numbers are settled, not a source of leverage.' }
      ],
      calcWork: 'Utilisation 68 to 61 percent raises funded bench per billable day by roughly a tenth, which alone exceeds the wage case - so the increase is occupancy, not pay.',
      principle: 'The strongest services leverage is a cost model with the two numbers the rate story forgot to mention.',
    },
    {
      type: 'knowledge',
      q: 'What makes a break point in a long contract real rather than ceremonial?',
      options: [
        { text: 'A termination-for-convenience paragraph with ninety days notice.', isCorrect: false, rationale: 'That is available on paper and often unusable in practice.' },
        { text: 'A dated right to exit that is priced, exercisable without a transition cliff, and matched by re-tender readiness such as a current specification and market tested alternatives.', isCorrect: true, rationale: 'Correct. A break point is real when using it is possible in the year it falls, which requires preparation rather than drafting.' },
        { text: 'A penalty the supplier pays for early exit.', isCorrect: false, rationale: 'That prices the exit rather than enabling it.' },
        { text: 'An annual review meeting written into the governance schedule.', isCorrect: false, rationale: 'Review is not exit.' }
      ],
      principle: 'Optionality is worth what it costs to exercise, and a break point without readiness is a date in a document.',
    },
    {
      type: 'knowledge',
      q: 'A services saving is reported as 1.2 million measured against the previous budget. What is the correct executive response?',
      options: [
        { text: 'Accept it, since budget is the standard baseline for savings.', isCorrect: false, rationale: 'Budget is a forecast; a change against it measures planning, not cost.' },
        { text: 'Ask what the baseline was in actual cost terms, whether the delivery mix changed, and what concessions were given for the reduction - then restate on a like-for-like basis.', isCorrect: true, rationale: 'Correct. Those three questions are what separate a saving from a re-badged purchase, a forecast revision or a trade of optionality.' },
        { text: 'Convert it to a percentage for comparability.', isCorrect: false, rationale: 'That refines the presentation of an unverified number.' },
        { text: 'Have finance validate the arithmetic in the spreadsheet.', isCorrect: false, rationale: 'The arithmetic may be correct; the baseline and the mix are the question.' }
      ],
      principle: 'A saving against budget measures a forecast change, and a saving without a mix comparison may measure a different purchase.',
    },
    {
      type: 'scenario',
      context: 'Two suppliers on similar contracts ask for relief in the same quarter: one wants a rate rise citing wages, the other wants a volume commitment waived because your demand fell. Your concession ledger is empty for both.',
      q: 'What is the disciplined response?',
      options: [
        { text: 'Grant both, since relationships matter more than small amounts.', isCorrect: false, rationale: 'Two unpriced gives are a precedent and a lost trade.' },
        { text: 'Build the ledger for each: value what they are asking, value what you could ask back - term, reporting, transition cooperation, rate discipline at renewal - and settle the wage claim against the model before conceding anything on it.', isCorrect: true, rationale: 'Correct. A ledger converts two pressures into two trades, and the model decides whether the wage claim is even real.' },
        { text: 'Refuse both and revisit at renewal.', isCorrect: false, rationale: 'Reflexive refusal spends leverage that a priced trade could have converted into something useful.' },
        { text: 'Escalate both to the executive for a decision.', isCorrect: false, rationale: 'That hands up a negotiation that has not been analysed yet.' }
      ],
      principle: 'Concessions are traded from a ledger with values on both sides; without one, you give rather than exchange.',
    }
  ],
  relSop: 'sop-negotiation-preparation',
  rel: {
    concepts: ['multiyear-price-arc', 'bench-utilisation-economics', 'labour-rate-pyramid', 'negotiation-leverage', 'concession-management', 'savings-baseline'],
    sops: ['sop-negotiation-preparation', 'sop-contract-renewal', 'sop-supplier-price-increase-review', 'sop-savings-validation'],
    checklists: ['cl-negotiation', 'cl-contract-renewal', 'cl-savings-validation'],
    templates: ['tpl-negotiation-planner', 'tpl-negotiation-concession-log', 'tpl-contract-renewal-assessment'],
    calcs: ['calc-negotiation-savings', 'calc-multi-year-contract-cost', 'calc-price-escalation', 'calc-should-cost'],
    decisions: ['negotiate-or-accept', 'renew-vs-resource', 'accept-price-increase'],
    kpis: ['kpi-savings-realization', 'kpi-ppv', 'kpi-cost-avoidance'],
    glossary: ['gloss-batna', 'gloss-ppv', 'gloss-rate-card']
  },
  labMission: {
    title: 'Mission 26.3: Read a Renewal Paper the Way a Board Should',
    desc: 'Take one services contract renewal or increase request and interrogate the arc, the mix and the baseline.',
    tasks: [
      'Project the price arc of your longest services contract to its final year and compare that year with what the market would quote today.',
      'Build a concession ledger for one live negotiation, with a value on both sides for every item, including the ones you have already given.',
      'Find one reported services saving and answer two questions about it: measured against what, and did the delivery change?'
    ],
    ctaLabel: 'Open Negotiation Savings',
    ctaHref: '#/calc/calc-negotiation-savings',
    secondaryLabel: 'Open the Concession Log template',
    secondaryHref: '#/tpl/tpl-negotiation-concession-log'
  }
});
