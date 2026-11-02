/* ==========================================================
   Procure Sherpa v3.0 - Academy Content Part 13
   Module 18: Disruption, Emergency Buying and Allocation.
   The curriculum teaches the process working as intended. It
   taught nothing about the period when it is not: the shortage,
   the allocation queue, the spot market, the force majeure
   notice, and the recovery that has to be re-baselined rather
   than celebrated.
   Written without apostrophes inside the content strings on
   purpose: three builds have failed on an unescaped one.
   ========================================================== */
PS.ACADEMY_FUNCTIONS = PS.ACADEMY_FUNCTIONS || [];

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-emergency-procurement',
  title: 'Emergency Buying: Moving Fast Without Losing Control',
  module: 'Module 18: Disruption, Emergency Buying and Allocation',
  kicker: 'Function 18.1',
  tier: 'practitioner',
  tagline: 'A pre-agreed fast route that trades competition for time deliberately, and closes the loop afterwards so the exception stays an exception.',
  desc: 'Emergency procurement fails in the same two ways everywhere: either the control applies and the business stops, or the control is bypassed and nobody can say afterwards what was paid or why. This function covers the pre-authorised route, the price ceiling logic, the documentation that is possible during a crisis, and the retrospective review that turns a series of urgent purchases back into a managed category.',
  duration: '20 mins',
  lifecycleStage: 'Stage 17: Purchase Order Issuance',
  lifecycleDesc: 'An exception route inside order execution: it exists so that the normal control is not abandoned, and it is bounded by time, value and a review.',

  what: 'An emergency route is not the absence of a control; it is a different control, agreed in advance, that substitutes speed for competition and accepts a higher price as the cost of that trade. Writing it down before it is needed is the whole discipline, because the version invented during the incident will be whatever the loudest requestor needs and will have no boundary at all. Four elements make it work. Scope: what counts as an emergency, stated as a condition the business can test rather than a feeling - a safety or regulatory stop, a production line down, a service continuity risk, a customer contractual deadline at risk, a disaster response. Everything outside that list uses the normal route, and the list is agreed with operations rather than written by procurement alone. Authority: who may invoke it, and the level above them, so the decision has an owner who is senior to the need. A route that anyone can invoke is a route that will always be invoked. Limits: a value ceiling per event and a cumulative ceiling per period, plus a hard expiry. Time is the boundary that matters most - a route valid for a stated number of days forces either a proper award or a documented extension, and it prevents the emergency becoming the procurement method for a whole category. Price: the ceiling is not a market rate, it is a decision about how much certainty is worth. Spot pricing during a shortage is real, and the correct response is to accept it knowingly, record the reference price and the premium paid, and treat that premium as the cost of the disruption rather than as a supplier failure. Where a contract already exists, the contract price applies and the emergency is about availability rather than about price. Documentation is the part people believe is impossible during an incident. It is possible if it is short: one page, five fields - what was needed, why the normal route could not be used, who authorised it, what was paid against what reference, and what the plan is to exit the arrangement. That page is what makes the retrospective review a learning exercise rather than an investigation, and it is what protects the person who made the call. The retrospective review is where the value is created. Every emergency purchase is a symptom: a demand that was not forecast, a supplier base too thin, a specification too narrow, a buffer set too low, a framework that expired. Reviewing them as a population - count, value, premium paid, category, cause - produces a category strategy argument no amount of normal-route analysis will surface. And the honest number: if emergency spend in a category exceeds a small share of that category total, the normal route is not a control, it is an obstacle, and the fix is to redesign it rather than to remind people to avoid it.',
  why: [
    'A route invented during an incident has no boundary, no price reference and no owner. A route agreed beforehand has all three and can be used without an argument.',
    'Time is the boundary that works. Value ceilings get negotiated; an expiry date forces either a proper award or a visible extension.',
    'The premium paid in a spot market is the cost of the disruption, not a supplier failure. Recording it against a reference price is what makes that distinction visible to finance.',
    'Emergency purchases are the most reliable signal of a design gap: thin supply base, missing buffer, expired framework, over-narrow specification.',
    'Short documentation is documentation that happens. Five fields on one page survive a crisis; a twelve-field form does not, and the absence of the record is what turns a good decision into an audit finding.'
  ],
  when: [
    'When a safety, regulatory, continuity or contractual-deadline condition is met and the normal route cannot respond within the time available.',
    'When an existing contract cannot deliver the quantity needed and the gap must be filled from elsewhere.',
    'When a supplier fails without notice and replacement must be sourced in days rather than weeks.',
    'At the scheduled review after any use of the route, and at the quarterly review of emergency spend as a population.'
  ],

  raci: [
    { role: 'Requesting Business Owner', resp: 'States the condition met, the time available and the consequence of not acting, and signs the one-page record.' },
    { role: 'Head of Procurement', resp: 'Invokes or authorises the route, sets the value and time boundary, and approves any extension.' },
    { role: 'Category Manager', resp: 'Prices against a reference, sources the alternative, and owns the exit plan back to the normal route.' },
    { role: 'Finance', resp: 'Approves the premium against budget, records the cost of disruption separately from the category saving.' }
  ],
  inputs: [
    'The written definition of what qualifies, agreed with operations and tested against the last two real incidents.',
    'The current framework and contract positions: who is already approved, at what price, with what capacity left.',
    'A reference price for the item or service, from the last contract, a published index or a market check.',
    'The one-page emergency record template, issued in advance rather than created during the event.'
  ],
  outputs: [
    'Signed emergency purchase record with the condition, authoriser, price paid, reference price and premium.',
    'An exit plan: the date the arrangement ends, the route that will replace it, and the work needed to get there.',
    'A disruption cost entry, separated from category performance so the premium is not counted as a failure elsewhere.',
    'A quarterly emergency-spend review naming the causes and the design changes they justify.'
  ],
  controls: [
    'The route is invoked by a named authoriser senior to the requester, against a written qualifying condition.',
    'Every use produces the one-page record within five working days, and the record is a condition of payment rather than a formality after it.',
    'The route expires automatically after the stated period; an extension is approved at a higher level and is counted.',
    'Price paid is recorded against a stated reference, and the premium is reported as a disruption cost.'
  ],
  bestPractices: [
    'Pre-qualify a standing panel for the categories that always break. An approved second source in the panel turns an emergency into a call-off.',
    'Keep the record to five fields. The value is in having it, and a longer form is the reason it does not exist.',
    'Publish the emergency spend by category each quarter. The categories with the most exceptions are the ones where the process is wrong.',
    'Debrief within a week while the people involved still remember why they chose what they chose. The cause is the finding, and it fades fast.'
  ],
  mistakes: [
    'Treating the emergency route as a shortcut for a normal need, which is why so many organisations quietly stop using theirs.',
    'Paying a spot premium and reporting it as a category cost overrun, which punishes the wrong thing and hides the real one.',
    'Extending an emergency arrangement without a decision, so a temporary source becomes the permanent one.',
    'Reviewing emergencies one at a time rather than as a population, which produces five apologies and no design change.'
  ],
  terms: [
    { term: 'Emergency procurement', def: 'A pre-authorised route that substitutes speed for competition against a written qualifying condition, within a value and time boundary.' },
    { term: 'Reference price', def: 'The price a purchase is compared against during a disruption - the contract rate, a published index or a documented market check.' },
    { term: 'Cost of disruption', def: 'The premium paid to secure supply during an emergency, recorded separately so it is not mistaken for category underperformance.' },
    { term: 'Exit plan', def: 'The stated date and route by which a temporary emergency arrangement returns to the normal procurement channel.' }
  ],

  thinkingPoints: [
    {
      quote: 'The emergency process was never used because it took four days to approve.',
      explanation: 'A company had a well-drafted emergency procedure requiring a signed business case, a market check and a director approval. During a line stoppage the site used a purchase card instead, because the card took twenty minutes. Over a year the card route carried more emergency volume than the procedure did, at prices nobody had recorded against any reference, and the procedure itself showed a clean sheet in the compliance report.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a control slower than the need it governs does not produce compliance. It produces an unmeasured alternative that reports as compliance.',
      reflectionPrompt: 'Which need at your organisation currently has a compliant route slower than the workaround, and what does the workaround cost?',
    },
    {
      quote: 'We paid the premium and blamed the category manager.',
      explanation: 'During a resin shortage a buyer paid roughly double the contract rate for two truckloads. The premium landed in the category variance, the category manager spent a quarter defending a decision made under a line-stoppage deadline, and nobody recorded that the shortage had a cause: a single approved source in a market with two producers and a framework that had expired four months earlier.',
      realWorldExample: 'Illustrative example: when the cost of a disruption is booked as a performance failure, the design fault that caused it survives the incident untouched.',
      reflectionPrompt: 'Where does a disruption premium land in your accounts, and does anyone see the cause alongside it?',
    }
  ],

  sopSteps: [
    { title: 'Define the qualifying condition in writing', role: 'Head of Procurement',
      desc: 'State, with operations, the circumstances that count as an emergency: safety or regulatory stop, production down, service continuity at risk, a customer contractual deadline, disaster response. Write what does not qualify as well, because the list of exclusions is what stops the route becoming the default.',
      control: 'The definition is agreed with the business, dated, and tested against the last two real incidents before it is published.',
      record: 'Emergency procurement policy section with qualifying and excluded conditions.',
      pitfall: 'Defining an emergency as urgency, which is a feeling. A deadline created by poor planning is not a qualifying condition, and treating it as one removes the boundary.'
    },
    { title: 'Name who may invoke it, and one level above', role: 'Head of Procurement',
      desc: 'Give the route an authoriser who is senior to the requester and a deputy who can act out of hours. An emergency route that anyone can open will be opened constantly, and one that depends on a single named person will be bypassed the first time that person is unavailable.',
      control: 'Authority to invoke is documented with a named deputy and an out-of-hours contact route.',
      record: 'Authority schedule with deputies and contact arrangements.',
      pitfall: 'Leaving the authoriser as a role that is only ever held by one individual, which guarantees the route is bypassed at the worst moment.'
    },
    { title: 'Set the value ceiling and the clock', role: 'Category Manager',
      desc: 'Bound each event with a value limit and, more importantly, a duration limit. The clock is the control that works: it forces either a proper award or a documented extension approved one level higher, and it prevents a temporary source becoming a permanent one by default.',
      control: 'The route expires automatically. Extensions are approved above the original authoriser and counted in the quarterly review.',
      record: 'Emergency event register with start date, expiry, value and extension history.',
      pitfall: 'Setting a value ceiling only. Three extensions of a two-week arrangement is a six-week sole source with no competition and no record.'
    },
    { title: 'Check what is already approved before shopping the market', role: 'Category Manager',
      desc: 'Look first at the existing framework and contract positions: an approved second source at contract price is faster and cheaper than any spot purchase, and it needs no emergency route at all. This check is the reason pre-qualified panels pay for themselves.',
      control: 'The record states which existing positions were considered and why they could not serve.',
      record: 'Panel and framework check note attached to the emergency record.',
      pitfall: 'Going straight to the market during a shortage, when the emergency is a quantity gap rather than a supplier gap.'
    },
    { title: 'Price against a stated reference and record the premium', role: 'Finance',
      desc: 'Note the contract rate, index or market check used as the reference, the price actually paid, and the difference. Book the premium as a cost of disruption rather than as category underperformance, so the incident does not become a distorted performance story for the wrong person.',
      control: 'Every emergency purchase record carries a reference price and its source.',
      record: 'Price comparison note and the disruption cost entry in the management accounts.',
      pitfall: 'Recording only the amount paid, which makes the purchase look like a normal transaction at a bad price rather than a deliberate purchase of speed.'
    },
    { title: 'Complete the one-page record within five days', role: 'Requesting Business Owner',
      desc: 'Five fields, no more: what was needed, why the normal route could not be used, who authorised it, what was paid against what reference, and the exit plan. Make the record a condition of payment rather than paperwork after the fact, because that is the only version that reliably exists.',
      control: 'Payment is released against a completed record, and the exception list of unpaid emergency invoices is reviewed monthly.',
      record: 'Signed emergency purchase record.',
      pitfall: 'Designing a form that assumes a normal working week. A record that takes twenty minutes to complete during an incident will not be completed.'
    },
    { title: 'Review the population, not the incident', role: 'Head of Procurement',
      desc: 'Quarterly, put every emergency purchase on one page: count, value, premium, category, authoriser and cause. The pattern is the finding. A category with repeated emergencies has a design problem - thin base, expired framework, missing buffer, over-narrow specification - and that is the argument for changing it.',
      control: 'Each cluster of causes produces a named design action with an owner and a date, and the following quarter reports whether it was done.',
      record: 'Emergency spend review with causes, design actions and closure status.',
      pitfall: 'Closing each incident with a debrief and an apology. Five separate explanations is the absence of a review.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A plant is down. The compliant route takes three days; the site uses a purchase card and buys locally at roughly double the contract rate.',
      q: 'What is the correct response?',
      options: [
        { text: 'Discipline the site for using the card outside authority.', isCorrect: false, rationale: 'This defends the rule and guarantees the same outcome next time. The site made the right operational choice against a process that could not serve it, and punishing that choice teaches the organisation to hide the next one.' },
        { text: 'Accept the purchase, record the price against the contract reference as a disruption cost, and fix the route so it can act within hours.', isCorrect: true, rationale: 'Correct. Two things are true: the plant needed to restart, and the control failed to be usable. Recording the premium honestly and building a fast route addresses both; the discipline route addresses neither.' },
        { text: 'Cancel the order and run the compliant route to keep the process clean.', isCorrect: false, rationale: 'This trades real downtime cost for procedural purity, and no business would accept it twice. It also leaves the emergency unsourced.' },
        { text: 'Raise the card limit so sites can act faster.', isCorrect: false, rationale: 'This removes the control without adding one. The answer is a bounded emergency route with an authoriser, a clock and a record, not a larger unattended channel.' }
      ],
      principle: 'When the compliant route is slower than the need, the finding is about the route. Record the cost honestly and redesign it.',
    },
    {
      type: 'scenario',
      context: 'Your emergency procurement policy requires a full business case, a market check and two approvals. It has been used once in eighteen months, while spot buying has grown.',
      q: 'What does that pattern indicate?',
      options: [
        { text: 'The organisation has good compliance with a strict policy.', isCorrect: false, rationale: 'It has compliance with the wrong process. Spot buying growing while the emergency route sits unused is the signature of a route nobody can use, and the clean report is the evidence of the measurement problem.' },
        { text: 'The policy is not an emergency route at all - it is the normal route with a different name, and demand has gone elsewhere.', isCorrect: true, rationale: 'Correct. An emergency route exists to trade competition for time. Requiring a market check inside it defeats its purpose, and the growth of unmeasured spot buying is where the real emergency spend lives.' },
        { text: 'Emergency spend must be prohibited outright.', isCorrect: false, rationale: 'Prohibiting it does not remove the need; it removes the record. That is the current position already.' },
        { text: 'The route needs a lower value ceiling so more purchases qualify.', isCorrect: false, rationale: 'Ceiling height is not the obstacle. The obstacle is a process that requires the same work as a normal award.' }
      ],
      principle: 'An emergency route that demands a market check is not an emergency route. Measure it by how often it is used, not by how clean the report looks.',
    },
    {
      type: 'scenario',
      context: 'A temporary source was engaged for six weeks during a shortage. Eleven months later it still holds the volume, at a rate above the original contract.',
      q: 'What control would have prevented this?',
      options: [
        { text: 'A requirement to report emergency purchases monthly to the board.', isCorrect: false, rationale: 'Reporting raises visibility and does not force a decision. The arrangement continued while being reported, which is the point.' },
        { text: 'An expiry date on the route, with automatic lapse and any extension approved one level higher and counted.', isCorrect: true, rationale: 'Correct. Time is the boundary that actually works. A dated expiry forces either a proper award or a visible, senior decision to extend - and the count of extensions is what tells you the route is being used as a method rather than an exception.' },
        { text: 'A rule that emergency prices must not exceed contract rates.', isCorrect: false, rationale: 'Unenforceable in a shortage and it would simply move the transaction outside the process. The premium is the price of speed; the control is on how long you keep paying it.' },
        { text: 'Requiring a second quote before any emergency purchase.', isCorrect: false, rationale: 'This reintroduces the competition the route exists to skip, and it is the reason the first option produced no usable policy.' }
      ],
      principle: 'Bound the emergency in time, not in price. Expiry is what turns an exception back into a decision.',
    },
    {
      type: 'scenario',
      context: 'Four emergency purchases in one quarter, in four different categories, all traced to the same root cause: a framework that expired and was not renewed.',
      q: 'What is the correct action?',
      options: [
        { text: 'Debrief each incident with the respective requester.', isCorrect: false, rationale: 'Four debriefs about one cause is four conversations that will each conclude the situation was unavoidable. The population review is what found the cause, and the same review must produce the fix.' },
        { text: 'Fix the renewal control, and treat the four premiums as the cost of that gap when arguing for the calendar and the owner.', isCorrect: true, rationale: 'Correct. The emergencies are the evidence. Total the premium and put it against the effort of a proper renewal process - that is a business case rather than a complaint, and it is the argument that gets the control funded.' },
        { text: 'Increase the emergency budget line so next time is easier.', isCorrect: false, rationale: 'This accepts the cause and budgets for its consequences. It is the answer that guarantees a fifth and sixth incident.' },
        { text: 'Require operations to forecast demand better.', isCorrect: false, rationale: 'Not the cause here. Attributing a renewal failure to demand forecasting loses credibility with the function that has to fix it.' }
      ],
      principle: 'Emergency spend reviewed as a population produces a design argument. Reviewed one incident at a time, it produces apologies.',
    },
    {
      type: 'scenario',
      context: 'A supplier declares force majeure and stops delivering a contracted volume for eight weeks.',
      q: 'What is the first procurement action?',
      options: [
        { text: 'Place an emergency order at spot to cover the gap.', isCorrect: false, rationale: 'Possibly necessary and it is the second step. Doing it first accepts the supplier claim without testing it, and forfeits the contractual position you may need for the costs involved.' },
        { text: 'Serve notice under the contract, require the evidence the clause demands, and start the emergency route in parallel with the claim position recorded.', isCorrect: true, rationale: 'Correct. The two run together: secure supply now under the emergency route with the premium recorded as a disruption cost, while the contractual position is preserved in writing. Losing the second while protecting the first is the common and expensive outcome.' },
        { text: 'Wait for the supplier to confirm when deliveries resume.', isCorrect: false, rationale: 'This hands the timetable to the party that caused the problem and leaves the business without cover for eight weeks.' },
        { text: 'Terminate for breach and re-tender the category.', isCorrect: false, rationale: 'A genuine force majeure event is usually not a breach, and terminating on that basis may be a wrongful termination. The route to either outcome runs through the clause and the evidence.' }
      ],
      principle: 'Cover the need now and preserve the contractual position in the same week. Doing only one of them is the expensive choice.',
    }
  ],

  relSop: 'sop-emergency-procurement',
  rel: {
    concepts: ['business-continuity', 'supply-chain-risk', 'concentration-risk', 'delegation-of-authority', 'price-vs-cost', 'savings-baseline'],
    sops: ['sop-emergency-procurement', 'sop-procurement-lifecycle', 'sop-supplier-price-increase-review'],
    checklists: ['cl-emergency-procurement', 'cl-exception-approval', 'cl-single-source-justification'],
    templates: ['tpl-emergency-justification', 'tpl-exception-request', 'tpl-business-case'],
    calcs: ['calc-price-increase', 'calc-compare-quotes', 'calc-po-value-check'],
    decisions: ['approve-exception', 'competitive-or-single', 'dual-source'],
    kpis: ['kpi-maverick-spend', 'kpi-cycle-time', 'kpi-contract-coverage'],
    glossary: ['gloss-cost-to-serve', 'gloss-maverick-spend', 'gloss-single-source']
  },
  labMission: {
    title: 'Mission 18.1: Test Your Emergency Route Against the Last Real Incident',
    desc: 'Take the last disruption your organisation actually had and walk it through your written route, then count what happened outside it.',
    tasks: [
      'Read your emergency policy against the last real incident and state how long the documented route would have taken.',
      'Find the spot buying, card spend and direct invoices in that category over the last year, and total the premium against contract rates.',
      'Write the five-field emergency record and use it once, on the next event, before anyone asks for it.'
    ],
    ctaLabel: 'Open Emergency Justification Template',
    ctaHref: '#/tpl/tpl-emergency-justification',
    secondaryLabel: 'Open Price Increase Calculator',
    secondaryHref: '#/calc/calc-price-increase'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-allocation-and-shortage',
  title: 'Allocation, Shortage and the Market That No Longer Serves You',
  module: 'Module 18: Disruption, Emergency Buying and Allocation',
  kicker: 'Function 18.2',
  tier: 'practitioner',
  tagline: 'When demand exceeds supply across a whole market, the lever is not price. It is standing, relationship, design and honesty about what you need.',
  desc: 'Shortage management is the part of procurement that cannot be done with a tender. This function covers how allocation actually works, what improves your position in the queue, when to pay a premium and when paying one makes it worse, and the design and specification moves that are usually the only real lever available.',
  duration: '22 mins',
  lifecycleStage: 'Stage 12: Supplier Risk & Due Diligence',
  lifecycleDesc: 'Runs when the market, not the supplier, is the constraint: the point at which commercial method stops working and preparation, design and standing decide the outcome.',

  what: 'In a shortage the supplier decides who gets the material, and the mechanism is called allocation: available volume distributed across customers by a rule the supplier owns. Understanding the rule is the beginning of influencing it. Suppliers allocate on a mixture of criteria that are rarely written down - strategic customer status, historical share, contract commitments and the consequences of breaking them, payment behaviour, forecast quality, technical dependence, and the practical cost of serving each account. Some of those are within your control before the shortage, none of them are within it during. Which is the central point of this function: allocation is won in the calm market and merely collected in the tight one. Four moves work in advance. Standing is the least discussed and the most effective: a customer who pays on time, forecasts honestly, does not cancel at the last moment, and does not treat the supplier as a commodity vendor gets served first, because the supplier is allocating to reduce their own risk as much as their cost. Contract position matters - a committed volume with a remedy is stronger than an uncommitted framework, and a supplier who can be sued for non-delivery behaves differently from one who cannot, though the remedy rarely restores the material. Forecast quality is a real lever: a supplier who can plan prefers a customer whose numbers hold. And structural position - being a large enough share of their business that losing you hurts - is the quiet determinant of everything else. In the shortage itself the options narrow. Paying a premium buys volume from someone, but it can also mark you as inelastic, which invites the next shortage to be priced against you rather than against the market, and it may simply move your position in a queue where everyone is doing the same. The stronger in-crisis moves are operational: shorten your own demand by relaxing a non-critical specification, substitute a grade that is available, reduce packaging or variant count, take a longer shelf life item instead. Reallocate internally against a stated business priority, which is a decision the business must make rather than one procurement can absorb quietly. And buy forward deliberately, accepting inventory and cash cost against a stated horizon, rather than buying forward in panic at whatever the spot market asks. The failure mode to name is the quiet one: procurement absorbing the shortage as its own problem, spreading reduced volume across every requester so nobody notices, and taking the blame when a line stops. A shortage is a business allocation decision with a supply constraint underneath it. Procurement supplies the constraint, the options and the cost of each; the business chooses. Making that choice visible early is the most valuable thing a category manager can do in a tight market, and it is also the only thing that protects them afterwards.',
  why: [
    'Allocation rules are set by the supplier and are mostly behavioural. The levers that move them - standing, forecast quality, contract position - are built in a calm market and cannot be created during a shortage.',
    'Paying a premium can make the position worse rather than better, by marking the account as one that will pay anything. The premium is a price for volume, not for reliability.',
    'Specification relaxation, substitution and variant reduction are usually the only genuine levers a buyer holds in a market-wide shortage, and they are business decisions rather than procurement ones.',
    'Absorbing the shortage silently converts a business allocation problem into a procurement failure, and removes the evidence needed to fix the structure afterwards.',
    'A shortage is the most expensive moment to discover your supply base was thin, and the cheapest moment to start fixing it, because the business will finally fund what it refuses to fund in normal times.'
  ],
  when: [
    'Before the shortage, when the market is loose: standing, contract position and second sources are built then.',
    'When suppliers announce allocation, force majeure or extended lead times, or when quoted lead times move sharply.',
    'When internal demand exceeds available volume and someone must decide which product line or customer is served.',
    'Afterwards, to convert the lesson into a supply-base, specification or buffer change while the memory is fresh.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Reads the market, states the constraint and the options with their costs, and runs the supplier conversations.' },
    { role: 'Business Owner / Operations', resp: 'Decides which demand is served when supply is short, and owns the specification relaxations.' },
    { role: 'Technical / R&D', resp: 'Qualifies substitutes, alternative grades and relaxed tolerances, and owns the risk of the change.' },
    { role: 'Finance', resp: 'Prices forward buying and premium purchases against working capital and margin, and approves the trade-off.' }
  ],
  inputs: [
    'The market position: lead time trend, allocation notices, capacity announcements, and what competitors are being told.',
    'Your own standing with each supplier: volume share, payment record, forecast accuracy and contract commitment.',
    'The demand list with business value per unit, so allocation can be decided against revenue or margin rather than against whoever shouts loudest.',
    'The technical envelope: which grades, tolerances, packaging or variants can be substituted, and who can approve that.'
  ],
  outputs: [
    'A stated supply position: what is available, from whom, on what terms, and what is genuinely short.',
    'An agreed internal allocation against business priority, recorded as a decision with the value traded.',
    'A mitigation list with owners: specification relaxation, substitution, forward buy, second source qualification, customer communication.',
    'A post-event note converting the shortage into structural change, with the cost of the event as the business case.'
  ],
  controls: [
    'Shortage status is reported to the business on a stated cadence with the constraint, the options and their costs, rather than absorbed silently.',
    'Internal allocation decisions are taken by the business owner against a stated priority, and recorded.',
    'Any specification relaxation or substitution is approved by the function that owns the technical risk, in writing.',
    'Forward buying is decided against a stated horizon and reviewed for obsolescence, not done in response to a single quote.'
  ],
  bestPractices: [
    'Visit the supplier in the good market. Standing is built when neither side needs anything, and it is spent when both do.',
    'Give the business the arithmetic early: what is short, what it costs, what the options are. A shortage nobody could see is a failure of reporting more often than a failure of supply.',
    'Keep a substitution register per critical item, pre-approved where possible, so the decision takes a day rather than a quarter.',
    'Do not hide the queue. When every customer is short, telling your own business the real position is more useful than negotiating a slightly better one.'
  ],
  mistakes: [
    'Tendering during a shortage, which produces either no bids or bids at a price that reveals you have no alternative.',
    'Absorbing reduced volume across all requesters so nobody escalates, and being blamed when the wrong line stops.',
    'Paying a premium and not recording it, which loses both the cost of the event and the argument for fixing the structure.',
    'Believing an allocation notice is a fact rather than a negotiating position, and failing to ask what would change it.'
  ],
  terms: [
    { term: 'Allocation', def: 'A supplier distribution of scarce volume across customers under a rule the supplier sets, typically announced during a market shortage.' },
    { term: 'Customer standing', def: 'The position an account holds with a supplier, built from share of business, payment behaviour, forecast quality and relationship, which determines queue order.' },
    { term: 'Forward buy', def: 'Purchasing beyond current demand deliberately, at a stated horizon, accepting inventory and cash cost against an expected shortage or price rise.' },
    { term: 'Substitution register', def: 'A pre-assessed list of approved alternatives for critical items, with who may authorise each change and under what condition.' }
  ],

  thinkingPoints: [
    {
      quote: 'We were the difficult small customer in a market that had stopped needing us.',
      explanation: 'A category had been tendered aggressively for years, with volume moved to the lowest bidder at each event and payment terms stretched to the maximum the supplier would accept. When the market tightened, two of those suppliers declined to quote at all and the third quoted at a large premium with a long lead time. The position had been built over a decade of treating the supplier as interchangeable, and it could not be repaired inside the shortage.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a supply base managed only on price has no standing to draw on when price stops being the binding constraint.',
      reflectionPrompt: 'Which of your suppliers would go out of their way for you in a shortage, and what have you done recently to earn that?',
    },
    {
      quote: 'The shortage was solved in engineering, not in negotiation.',
      explanation: 'A resin grade went into allocation across the whole market. Negotiation moved the allocation by a small percentage. The category manager brought the technical function and the business owner together, and they found that a lower grade used in two product families was available and met the actual requirement, and that one variant with the smallest volume accounted for a disproportionate share of the changeover cost. The change removed most of the shortage in a fortnight.',
      realWorldExample: 'Illustrative example: in a market-wide constraint the buyer cannot out-negotiate the market, but they can often change what they are asking it for.',
      reflectionPrompt: 'For your most exposed item, who owns the decision to relax the specification, and has anyone asked them?',
    }
  ],

  sopSteps: [
    { title: 'Establish whether the constraint is real and how wide', role: 'Category Manager',
      desc: 'Check the allocation notice against the market: is every customer affected, is capacity genuinely reduced, and is this a position in a negotiation rather than a fact. Ask directly what would change the allocation, because that answer usually contains the real lever.',
      control: 'The position is corroborated with at least one source outside the supplier before it is reported to the business.',
      record: 'Market position note with sources, lead time trend and the stated constraint.',
      pitfall: 'Accepting an allocation notice as a fact, or assuming it is a bluff. Both are wrong often enough to require checking.'
    },
    { title: 'Report the constraint to the business with numbers', role: 'Category Manager',
      desc: 'State what is available, what is short, over what period, and what each option costs. Do not spread the shortfall quietly across requesters to keep the peace, because that removes the decision from the people who own the business consequence and leaves procurement holding the blame for an outcome it never chose.',
      control: 'Shortage reporting happens on a stated cadence and reaches the function that owns the demand.',
      record: 'Shortage report with volume, duration, options and costs.',
      pitfall: 'Managing the shortage inside procurement. It looks like competence for a quarter and is discovered as a stopped line.'
    },
    { title: 'Force an explicit internal allocation decision', role: 'Business Owner / Operations',
      desc: 'Put the demand list in front of the business with value per unit, and have the priority decided and recorded. Which product families, customers or projects are served first is a commercial judgement the business owns, and making it explicit is what stops the decision being made by whoever escalates best.',
      control: 'Allocation is decided by the business owner against stated value, and the record shows what was deliberately not served.',
      record: 'Allocation decision with the value traded and the owner named.',
      pitfall: 'Letting allocation default to history, which serves the loudest account rather than the most valuable one.'
    },
    { title: 'Test the technical envelope before paying for volume', role: 'Technical / R&D',
      desc: 'Ask what can change: an alternative grade, a relaxed tolerance, different packaging, a longer shelf-life item, a reduced variant count. Substitution is frequently the only lever that moves a market-wide constraint, and it is faster and cheaper than any premium purchase.',
      control: 'Each relaxation is approved by the function owning the technical risk, with the condition and duration stated.',
      record: 'Substitution assessment with approver, scope and expiry.',
      pitfall: 'Treating the specification as fixed because it was written years ago. Most long-standing requirements have never been revalidated against the product they serve.'
    },
    { title: 'Decide forward buying against a horizon, not a headline', role: 'Finance',
      desc: 'If buying ahead, state the cover in weeks, the cash and storage cost, the obsolescence risk and the review date that will reduce it. A forward buy decided with those numbers is a strategy; one decided in response to a scary quote is an inventory problem with a story attached.',
      control: 'Forward positions carry a cover figure, a review date and an owner who can reduce them.',
      record: 'Forward buy decision note with cover, cost, risk and review date.',
      pitfall: 'Buying twelve months of a fast-moving item because the market is loud, then owning the obsolescence when the specification changes in month five.'
    },
    { title: 'Choose deliberately whether to pay a premium', role: 'Category Manager',
      desc: 'Weigh the value of the volume secured against the signal it sends about your price behaviour, and record the decision either way. In some markets paying once is cheap insurance; in others it establishes that this account will pay anything, and that price follows you for years.',
      control: 'Premium purchases are approved with the reference price and the strategic effect stated, not just the amount.',
      record: 'Premium decision with reference price, value secured and the signalling assessment.',
      pitfall: 'Paying the spot price without recording it, so the cost of the event disappears and the structural fix never gets funded.'
    },
    { title: 'Convert the event into structure while it is remembered', role: 'Head of Procurement',
      desc: 'Total the cost of the shortage - premium, downtime, expedite, management time - and use it to fund what would not be approved in normal times: a second qualified source, a substitution register, a buffer policy, a longer contract with a real remedy, a standing agreement to share forecasts.',
      control: 'Each event produces at least one structural change with an owner and a date, and the following year reports whether it survived.',
      record: 'Post-event note with the cost of the shortage and the structural changes funded by it.',
      pitfall: 'Letting the memory fade. Six months after a shortage the business will not fund a second source, and the next event will be a surprise again.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A supplier announces allocation and offers you sixty percent of your committed volume. Your two competitors are reportedly getting seventy percent.',
      q: 'What is the most useful first question?',
      options: [
        { text: 'Can we get the full volume if we pay a premium?', isCorrect: false, rationale: 'It answers a smaller question and may damage the position. In allocation, price usually is not the binding variable, and revealing that you will pay anything changes how you are treated in every future tight market.' },
        { text: 'What is the allocation rule, and what would move our position within it?', isCorrect: true, rationale: 'Correct. Allocation follows criteria the supplier holds - share, contract, forecast quality, payment behaviour, technical dependence. Asking what would change the position surfaces the actual lever, and it is frequently something you control that has nothing to do with price.' },
        { text: 'Can we invoke the contract remedy for short delivery?', isCorrect: false, rationale: 'Worth knowing, and rarely useful as a first move. A remedy compensates after the fact and does not deliver material, and asserting it during allocation usually reduces your standing in the queue.' },
        { text: 'Can another supplier cover the gap this month?', isCorrect: false, rationale: 'A necessary parallel question, and in a market-wide shortage the answer is usually no or at a large premium. Establishing the rule first tells you whether the gap is real or negotiable.' }
      ],
      principle: 'In allocation, ask what the rule is before asking what the price is. The rule is where the leverage usually sits.',
    },
    {
      type: 'scenario',
      context: 'To avoid escalation, procurement spreads a twenty percent shortfall evenly across all product families. A key customer contract is missed two months later.',
      q: 'Who owned that failure?',
      options: [
        { text: 'Procurement, for not securing enough volume.', isCorrect: false, rationale: 'This is the story everyone tells afterwards, and it is not the decision point. Volume was short across the market; what was missing was an explicit choice about which demand to serve.' },
        { text: 'The business, for not making an allocation decision it was never asked to make - and the reporting process that let procurement absorb the choice.', isCorrect: true, rationale: 'Correct. The constraint belonged to procurement; the priority decision belonged to the business. Spreading the shortfall silently removed the decision from its owner, and the absence of a visible trade-off is the finding.' },
        { text: 'The supplier, for allocating unfairly.', isCorrect: false, rationale: 'The supplier allocated under a rule they were entitled to set. Blaming them explains the shortage and not the outcome, which was a distribution decision made invisibly on your side.' },
        { text: 'The customer team, for not escalating sooner.', isCorrect: false, rationale: 'They had no information to escalate with, because the shortfall had been smoothed. That is a consequence of the reporting design rather than a cause.' }
      ],
      principle: 'A shortage is a business allocation decision with a supply constraint underneath. Procurement owns the constraint and the options, not the priority.',
    },
    {
      type: 'scenario',
      context: 'A market-wide shortage has lasted four months. Negotiation has moved your allocation slightly. Engineering has not been involved.',
      q: 'What is the most promising next move?',
      options: [
        { text: 'Escalate to the supplier executive level for a better allocation.', isCorrect: false, rationale: 'Escalation raises the temperature and rarely the volume, and it costs standing in a market where you will need the relationship afterwards.' },
        { text: 'Bring engineering and the business together to change what is being asked for: alternative grade, relaxed tolerance, fewer variants.', isCorrect: true, rationale: 'Correct. When the whole market is short, you cannot out-negotiate it. You can usually change the requirement, and that is the only lever that moves a constraint of that type - plus it is faster than qualifying a new source.' },
        { text: 'Tender the category to find a supplier with stock.', isCorrect: false, rationale: 'A tender in a shortage produces no bids or a price that reveals you have nowhere else to go, and it takes longer than the event.' },
        { text: 'Accept the position and wait for the market to loosen.', isCorrect: false, rationale: 'Sometimes correct on the arithmetic, and it should be a stated decision with a cost attached rather than a default. As an unexamined posture it is the one that produces the surprise when the shortage persists.' }
      ],
      principle: 'In a market-wide shortage the buyer who cannot change the supply can often change the demand. That conversation belongs to engineering and the business, not to negotiation.',
    },
    {
      type: 'scenario',
      context: 'A supplier tells you they have allocated you a lower share because your forecast accuracy has been poor and two orders were cancelled at short notice.',
      q: 'How should that be treated?',
      options: [
        { text: 'As a fair criticism, and the basis for a demand-planning fix that is worth more than any price negotiation.', isCorrect: true, rationale: 'Correct. The supplier is describing a risk-based rule they can change. Improving forecast reliability and cancellation behaviour is cheap, permanent, and improves your position in every future shortage across every supplier.' },
        { text: 'As an excuse for favouring a larger customer.', isCorrect: false, rationale: 'Possible, and it costs nothing to test. Dismissing a stated reason as an excuse removes the only lever you were actually offered.' },
        { text: 'As evidence the contract needs stricter delivery remedies.', isCorrect: false, rationale: 'The contract did not fail here; your own behaviour did. Remedies compensate for a shortfall and do not improve your standing.' },
        { text: 'As a matter for the sales team to smooth over.', isCorrect: false, rationale: 'This makes the relationship a personal favour rather than an operational improvement, and it will not survive either team changing.' }
      ],
      principle: 'When a supplier explains your position in their queue, they are usually handing you the lever. Forecast quality is a procurement asset.',
    },
    {
      type: 'scenario',
      context: 'The shortage ends. Your team proposes a second source, a substitution register and a buffer policy. All three were rejected twice in the previous two years.',
      q: 'What is the right action?',
      options: [
        { text: 'Wait until the next review cycle to avoid looking reactive.', isCorrect: false, rationale: 'This is how the memory dies. Within two quarters the cost of the event stops being a number anyone quotes and the proposals become optional again.' },
        { text: 'Cost the event now - premium, downtime, expedite, management time - and use that number to fund the structural changes while the business still remembers paying for their absence.', isCorrect: true, rationale: 'Correct. A shortage is the only moment the business will fund resilience it has refused before. Converting the event cost into a funded change is the highest-value act of the whole cycle, and it has a short shelf life.' },
        { text: 'Report the outcome and close the incident.', isCorrect: false, rationale: 'Closing the incident without the structural change guarantees the next one is handled the same way, at the same cost, with the same lesson.' },
        { text: 'Hold the buffer permanently so the next shortage is covered.', isCorrect: false, rationale: 'A buffer without a stated cover, owner and review date becomes an inventory problem. The policy matters more than the stock.' }
      ],
      principle: 'The window in which resilience is fundable opens during the shortage and closes within a quarter of it ending.',
    }
  ],

  relSop: 'sop-supplier-price-increase-review',
  rel: {
    concepts: ['supply-chain-risk', 'business-continuity', 'demand-management', 'specification', 'concentration-risk', 'working-capital'],
    sops: ['sop-supplier-price-increase-review', 'sop-emergency-procurement', 'sop-procurement-lifecycle'],
    checklists: ['cl-supplier-risk-review', 'cl-emergency-procurement', 'cl-requirement-definition'],
    templates: ['tpl-supplier-risk-assessment', 'tpl-business-case', 'tpl-exception-request'],
    calcs: ['calc-price-increase', 'calc-price-escalation', 'calc-multi-year-contract-cost'],
    decisions: ['dual-source', 'accept-price-increase', 'competitive-or-single', 'framework-agreement'],
    kpis: ['kpi-otif', 'kpi-otd', 'kpi-working-capital-impact'],
    glossary: ['gloss-eoq', 'gloss-moq', 'gloss-sole-source']
  },
  labMission: {
    title: 'Mission 18.2: Find the Lever in the Rule',
    desc: 'Take one exposed item, establish what would actually change your position with its supplier, and identify the substitution nobody has asked engineering about.',
    tasks: [
      'List your three most exposed items and, for each, write what you believe the supplier allocation rule is and what evidence you have.',
      'Ask one supplier directly what would improve your position, and record the answer without interpreting it.',
      'For one critical item, find who owns the decision to relax the specification and what an approved substitute would be.'
    ],
    ctaLabel: 'Open Supplier Risk Assessment',
    ctaHref: '#/tpl/tpl-supplier-risk-assessment',
    secondaryLabel: 'Open Concentration Calculator',
    secondaryHref: '#/calc/calc-supplier-concentration'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-disruption-recovery',
  title: 'After the Disruption: Re-baselining, Claims and the Honest Debrief',
  module: 'Module 18: Disruption, Emergency Buying and Allocation',
  kicker: 'Function 18.3',
  tier: 'executive',
  tagline: 'Closing the event properly: what the new baseline is, who owes what, and what actually changes so this does not repeat.',
  desc: 'Most disruptions end without a close. The temporary price becomes the baseline, the emergency source stays, the claim is never made or never settled, and the debrief produces agreement that the process needs work and no work. This function covers the three closures that matter - commercial, contractual and structural - and how an executive should hold the team to them.',
  duration: '24 mins',
  lifecycleStage: 'Stage 21: Savings Realization & Value Audit',
  lifecycleDesc: 'The close of the disruption cycle, and the input to the next planning cycle: what the baseline is, what was spent, and what has been changed.',

  what: 'A disruption ends three times, and only the first one is automatic. The supply position normalises; that is the part that happens by itself. The commercial position has to be closed deliberately, because a spot price agreed under pressure tends to persist into the next normal period simply because nobody re-opened it. Re-baselining means deciding, in writing, what the reference price and volume are now, and it has to be done with the same rigour as any baseline, because every future saving claim in that category will be measured against it. Leaving an emergency rate in place and calling it the new normal is the quietest and most expensive way to destroy a savings programme. The contractual position has to be closed too. During the event, both sides made statements: notices served, reservations of rights, promises to discuss costs later, perhaps a force majeure claim accepted or rejected. Closing means deciding whether to pursue, settle or waive, with the same arithmetic as any other commercial decision - what is recoverable, what is provable from the contemporaneous record, what the process costs, and what the relationship is worth going forward. Waiving is legitimate; waiving silently is not, because it forfeits a position nobody decided to give up. The structural close is the one that is supposed to matter and usually does not. A debrief that produces agreement in principle changes nothing. Three things make it real: the cause is named at the level where it can actually be fixed, which is usually a design or planning decision rather than a supplier behaviour; the change has an owner, a date and a measure; and the following year reports whether it happened. Executives should hold the team to the third of these specifically, because the first two are routinely written down and quietly abandoned. The honest debrief also has to say who was slow and why, and that is where organisations fail. The version that survives is usually a story about an external event, and the useful version is a story about the internal decisions that made the external event expensive: a framework that expired, a second source that was never qualified because it was not worth the effort in a quiet market, a forecast nobody trusted, a buffer that was cut for a working-capital target without anyone modelling the outage. Those are the findings, and they are uncomfortable because they belong to the organisation rather than to the market. Finally, the reporting close. A disruption should produce one number that leadership sees: the total cost of the event, in premium, downtime, expedite, management time and lost margin, set against the annual cost of the prevention that was declined. That comparison is the only language in which resilience gets funded, and it needs to be assembled while the records exist. Six months later the expedite invoices have been absorbed into a general ledger line and the management time was never recorded at all, and the argument is lost to a memory.',
  why: [
    'An emergency price that is never re-baselined becomes the reference for every future saving claim in the category, which makes all of them false.',
    'Contractual positions decay. Notices have windows, evidence has a shelf life, and a claim nobody decided to pursue is a claim nobody can make later.',
    'A debrief without an owner, a date and a measure is a conversation, and the following disruption will be met by the same gap.',
    'Naming the internal decisions that made an external event expensive is the only part of the debrief that changes anything, and it is the part most organisations omit.',
    'Resilience is funded by a comparison, not by a warning: the cost of this event against the annual cost of the prevention that was declined.'
  ],
  when: [
    'Within weeks of supply normalising, while the records and the people are still available.',
    'Before the next planning cycle, so the re-baselined figures are the ones the budget is built on.',
    'When a contractual notice window or a claim limitation period approaches, which cannot be deferred.',
    'At the annual review, when the previous year structural actions are reported as done or not done.'
  ],

  raci: [
    { role: 'Head of Procurement', resp: 'Owns the three closures, signs the re-baselined reference, and presents the cost of the event against the declined prevention.' },
    { role: 'Finance', resp: 'Assembles the total cost of the disruption, sets the new baseline in the planning system, and validates every future claim against it.' },
    { role: 'Operations / Business Owner', resp: 'Owns the internal causes named in the debrief and the planning, buffer or specification changes they imply.' },
    { role: 'Legal', resp: 'Advises on the claim position, notice windows and limitation periods, and on the enforceability of any remedy pursued.' }
  ],
  inputs: [
    'The contemporaneous record: emergency purchase records, notices, correspondence, allocation positions and premium paid.',
    'The pre-event baseline and the current market position, so the new reference is chosen rather than inherited.',
    'The contractual position: notices served and received, reservations of right, force majeure claims and their status.',
    'The cost of the event assembled from all functions, including management time and lost margin, not only invoice premium.'
  ],
  outputs: [
    'A re-baselined reference price and volume, dated, with the method stated and the change from the pre-event baseline visible.',
    'A claim decision: pursue, settle, or waive, with the arithmetic and the approver recorded.',
    'A structural action list with owners, dates and measures, and a scheduled report on whether each was done.',
    'A single number for leadership: total cost of the disruption against the annual cost of the prevention that was declined.'
  ],
  controls: [
    'No category returns to normal planning without a stated baseline and the method behind it, signed by finance.',
    'Every contractual position is closed with a recorded decision before the earlier of the notice window and the review date.',
    'Structural actions from a disruption are reported on at the next annual review as done or not done, by name.',
    'The cost of the event is assembled within sixty days of normalisation, while the records still exist.'
  ],
  bestPractices: [
    'Re-baseline in the same meeting that closes the event. A separate exercise later is where the emergency rate survives.',
    'Put the internal causes first in the debrief. The external event is the least actionable part of the story and everyone already knows about it.',
    'Report the declined prevention by name and cost. Resilience arguments lose because nobody kept the receipt for the saving that was made.',
    'Have someone in the debrief whose job is to ask what we would have done differently if this had been our own fault, and to write down the answer.'
  ],
  mistakes: [
    'Closing the supply position and leaving the commercial one open, so a temporary arrangement becomes the permanent baseline by silence.',
    'Recording structural actions without a measure, which makes next year report impossible to write honestly.',
    'Framing the event entirely as external, which protects everyone and changes nothing.',
    'Pursuing a claim for the principle after the arithmetic says otherwise, or waiving it without deciding at all.'
  ],
  terms: [
    { term: 'Re-baselining', def: 'Setting a new reference price and volume after a disruption, with a stated method, so future claims are measured against a real position.' },
    { term: 'Reservation of rights', def: 'A written statement that a party does not give up a contractual claim by continuing to perform, used to preserve a position while supply continues.' },
    { term: 'Cost of disruption', def: 'The total effect of an event including premium, downtime, expedite, management time and lost margin, not only the invoice difference.' },
    { term: 'Structural action', def: 'A change to supply base, specification, buffer or process arising from a disruption, with an owner, a date and a measure.' }
  ],

  thinkingPoints: [
    {
      quote: 'The emergency rate became the baseline, and the savings were measured against it.',
      explanation: 'After a shortage, a category carried a spot-inflated rate for fourteen months because nobody re-opened the price. When the market normalised, the next award was reported as a strong saving against the emergency rate rather than against the pre-event baseline. The number reached the board, the category was credited, and the following year the same comparison was attempted against a rate that no longer existed.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a baseline is a decision, and an undisturbed inherited number will flatter whoever reports it.',
      reflectionPrompt: 'Which of your current baselines was set during an exceptional period, and has anyone re-tested it?',
    },
    {
      quote: 'The debrief found four causes and assigned none of them.',
      explanation: 'A well-run review after a supply failure produced a clear list: an expired framework, a buffer cut for a working-capital target, a forecast accuracy problem, and a specification that had never been revalidated. The minutes recorded agreement to address all four. Nothing had an owner, a date or a measure. The following year the same categories failed the same way, and the earlier minutes were the only evidence that anyone had thought about it.',
      realWorldExample: 'Illustrative example: analysis without assignment is how an organisation buys the feeling of having fixed something.',
      reflectionPrompt: 'If you pulled last year disruption actions today, could you report done or not done against each one?',
    }
  ],

  sopSteps: [
    { title: 'Close the commercial position before anything else', role: 'Head of Procurement',
      desc: 'Decide in writing what the reference price and volume are now, with the method stated and the change from the pre-event baseline visible. Do it while the event is being closed rather than at the next award, because an inherited emergency rate silently rewrites every future saving claim in the category.',
      control: 'No category returns to normal planning without a signed baseline and its method.',
      record: 'Re-baselined reference with date, method and the comparison to the pre-event position.',
      pitfall: 'Leaving the baseline decision to the next tender, by which time the emergency rate is the only number anyone has.'
    },
    { title: 'Take a decision on every contractual position', role: 'Legal',
      desc: 'List the notices served and received, the reservations of right, the claims and counter-claims, and close each one as pursue, settle or waive with the arithmetic in front of the decision. Check the window and the limitation period first, because those set the deadline and cannot be extended by wanting more time.',
      control: 'Each position closes before the earlier of its notice window and the review date, and the decision is recorded with an approver.',
      record: 'Claim register with the decision, the arithmetic and the approver for each position.',
      pitfall: 'Waiving by silence. A position nobody decided to give up is the one that surprises you a year later.'
    },
    { title: 'Assemble the total cost of the event', role: 'Finance',
      desc: 'Bring together premium paid, expedite freight, downtime, rework, management time and lost margin, and set the total against the annual cost of the prevention that had been declined. One number, in one page, is what makes the resilience argument in a way that a list of warnings never does.',
      control: 'The cost is assembled within sixty days of normalisation, while records and people are still available.',
      record: 'Cost of disruption statement with the prevention comparison attached.',
      pitfall: 'Counting only the invoice difference. The larger costs are in the ledgers nobody attributes to the event and in the time nobody recorded.'
    },
    { title: 'Run a debrief that starts with your own decisions', role: 'Head of Procurement',
      desc: 'Ask what internal choices made the external event expensive: the framework that expired, the second source never qualified, the buffer cut for a working-capital target, the forecast nobody trusted, the specification never revalidated. Name them, and put the external event last, because it is the least actionable part of the story.',
      control: 'Each internal cause is stated with the decision that created it and the function that owns the fix.',
      record: 'Debrief note with internal causes, owners, dates and measures.',
      pitfall: 'A version of events in which everything was outside the organisation control. It protects everyone and guarantees a repeat.'
    },
    { title: 'Assign structural actions with a measure', role: 'Operations / Business Owner',
      desc: 'For each cause, write the change, the owner, the date and how it will be measured - not completed. A second source is measured by a placed order, a buffer policy by a cover figure and a review date, a substitution register by the number of critical items with an approved alternative.',
      control: 'Every action carries a measure that can be answered done or not done by someone other than the owner.',
      record: 'Structural action list with owner, date and measure.',
      pitfall: 'Actions described as process improvements, which cannot be tested and therefore cannot be reported on honestly a year later.'
    },
    { title: 'Report back at the next annual review', role: 'Head of Procurement',
      desc: 'Take the previous year list and state, against each item, whether it was done. This is the step that makes the debrief mean something, and it is the one almost nobody runs. An unreported action list teaches the organisation that disruption reviews are a formality.',
      control: 'The annual review includes last year disruption actions by name, with a done or not done status.',
      record: 'Annual follow-up report against the prior structural action list.',
      pitfall: 'Reporting the new year risks without the old year actions, which is how a list of good intentions accumulates year after year.'
    },
    { title: 'Feed the event into the next planning cycle', role: 'Finance',
      desc: 'Carry the re-baselined references, the cost of the disruption and the funded prevention into the next budget, and state the resilience line explicitly rather than absorbing it into general category cost. What is not visible in the plan is what gets cut first when targets tighten.',
      control: 'The prevention cost appears as a named line in the next planning cycle, with the event cost as its justification.',
      record: 'Planning submission with the resilience line and its evidence.',
      pitfall: 'Funding prevention from a discretionary budget, which is the first thing withdrawn when the market turns and the memory fades.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'Supply has normalised. The category is still buying at the emergency rate, and the next award will be reported against it.',
      q: 'What must happen first?',
      options: [
        { text: 'Run the next award, since competition will correct the price.', isCorrect: false, rationale: 'The award will produce a real reduction from an inflated reference and a saving that is not a saving. Competition corrects the price; it does not correct the baseline, and the reported number will be wrong either way.' },
        { text: 'Re-baseline explicitly, with the method stated and the change from the pre-event reference visible, before any claim is calculated.', isCorrect: true, rationale: 'Correct. The baseline is a decision and it has to be taken deliberately. Doing it before the next award is what keeps the savings programme honest, and it is the step that is skipped almost everywhere.' },
        { text: 'Ask finance to average the last four quarters as the baseline.', isCorrect: false, rationale: 'An average of a normal period and a disrupted period is a number that describes nothing, and it will embed the premium rather than remove it.' },
        { text: 'Leave the baseline and disclose the exception in a footnote.', isCorrect: false, rationale: 'Footnotes do not repair measurement. The claim will still be booked and still be wrong, and the footnote will not be read by the person relying on the number.' }
      ],
      principle: 'Re-baseline before you claim. An inherited emergency rate makes every subsequent saving figure false, however accurate the arithmetic.',
    },
    {
      type: 'scenario',
      context: 'During the shortage you accepted a supplier force majeure notice and continued buying at spot. The market has now calmed and nothing has been said about the period.',
      q: 'What is the correct close?',
      options: [
        { text: 'Nothing - accepting the notice ended the position.', isCorrect: false, rationale: 'Accepting a notice about the event is not the same as giving up any claim on the consequences, and it is certainly not the same as deciding to. Silence forfeits a position nobody chose to forfeit.' },
        { text: 'Decide explicitly whether to pursue, settle or waive, with the recoverable amount, the provable evidence, the process cost and the relationship value in front of the decision.', isCorrect: true, rationale: 'Correct. Any of the three outcomes is defensible. What is not defensible is having none of them taken. The arithmetic is the same one used for any commercial decision, and the window may already be closing.' },
        { text: 'Pursue the claim, because the principle matters with a supplier who invoked it.', isCorrect: false, rationale: 'Principle is a reason, not an analysis. Pursuit has a cost, and against a small recoverable amount with thin contemporaneous evidence it can be the worse commercial outcome.' },
        { text: 'Put it on the agenda for the next quarterly review.', isCorrect: false, rationale: 'Notice windows and limitation periods do not wait for agendas. Deferral is a decision with a cost, and it should be taken knowingly.' }
      ],
      principle: 'Every contractual position closes with a recorded decision. Waiving is legitimate; waiving by silence is not.',
    },
    {
      type: 'scenario',
      context: 'A post-event review lists four causes: expired framework, thin supply base, buffer cut, unvalidated specification. The actions are written as process improvements.',
      q: 'What is wrong with that?',
      options: [
        { text: 'The causes are correct, so the actions will follow.', isCorrect: false, rationale: 'This is the assumption that produces the same list next year. Actions that cannot be tested cannot be reported on, and unreported actions do not happen.' },
        { text: 'The actions have no measures, so next year cannot report done or not done - and the causes belong to different functions than procurement.', isCorrect: true, rationale: 'Correct. A second source is measured by a placed order, a buffer by a cover figure and a review date, a specification register by the count of critical items with an approved substitute. Each also needs the owning function named.' },
        { text: 'The causes should be consolidated into one.', isCorrect: false, rationale: 'They may share a root, but merging them removes the specific owners and makes the report even less testable.' },
        { text: 'Procurement should own all four.', isCorrect: false, rationale: 'The buffer and the specification belong to the business and to engineering. Assigning them to procurement is how the action list comes to look closed while nothing changes.' }
      ],
      principle: 'An action without a measure is a sentence. The annual follow-up has to be answerable by someone other than the owner.',
    },
    {
      type: 'scenario',
      context: 'The event cost the business a substantial amount in premium and downtime. Last year a second source was declined because it cost a modest annual amount to qualify and maintain.',
      q: 'What is the most persuasive report to leadership?',
      options: [
        { text: 'A summary of how well the team responded.', isCorrect: false, rationale: 'Deserved recognition, and it will not fund anything. Recovery quality is not the same as exposure, and the exposure is the decision in front of them.' },
        { text: 'The cost of this event set against the annual cost of the prevention that was declined, in one figure, with the same choice presented again.', isCorrect: true, rationale: 'Correct. That comparison is the only language in which resilience gets funded, and it needs the records assembled now. Presenting the declined option again with the evidence attached turns a complaint into a decision.' },
        { text: 'A request for a resilience budget line.', isCorrect: false, rationale: 'A budget request without the event cost is a number in search of a justification, and it will be cut at the first target squeeze.' },
        { text: 'A recommendation to review the buffer policy.', isCorrect: false, rationale: 'Too small and too soft. It accepts the framing of the original refusal rather than challenging it with the outcome.' }
      ],
      principle: 'Resilience is funded by a comparison, not a warning. Assemble the cost while the records still exist.',
    },
    {
      type: 'scenario',
      context: 'The debrief attributes the entire event to a global shortage and an unforeseeable supplier failure.',
      q: 'What should an executive conclude?',
      options: [
        { text: 'The team handled an uncontrollable event well and no action is needed.', isCorrect: false, rationale: 'The external event is true and it is also the least actionable part of the story. A debrief that stops there has removed every internal lever from view.' },
        { text: 'The review is incomplete: an external shock explains the trigger, and the internal decisions - expired framework, thin base, cut buffer - explain the cost.', isCorrect: true, rationale: 'Correct. That is the distinction that produces change. Ask what would have been different if the same shock had hit a year earlier or a year later, and the answer is a set of internal choices.' },
        { text: 'The supplier should be replaced.', isCorrect: false, rationale: 'Possibly, and it is a decision rather than a conclusion from this debrief. Replacing a supplier does not address a framework that expired or a buffer that was cut.' },
        { text: 'Procurement needs more authority to act quickly.', isCorrect: false, rationale: 'A common request and rarely the cause. Speed was usually available; the constraint was standing, preparation or the absence of an approved alternative.' }
      ],
      principle: 'The external event is the trigger. The internal decisions are the reason it was expensive. A debrief that omits the second teaches nothing.',
    }
  ],

  relSop: 'sop-savings-calculation',
  rel: {
    concepts: ['savings-baseline', 'savings-measurement', 'savings-realization', 'business-continuity', 'supply-chain-risk', 'audit-trail'],
    sops: ['sop-savings-calculation', 'sop-procurement-audit', 'sop-contract-review', 'sop-emergency-procurement'],
    checklists: ['cl-savings-validation', 'cl-procurement-audit', 'cl-contract-review'],
    templates: ['tpl-savings-validation', 'tpl-savings-calculation', 'tpl-business-case'],
    calcs: ['calc-savings-analysis', 'calc-multi-year-contract-cost', 'calc-budget-vs-actual'],
    decisions: ['re-source', 'dual-source', 'approve-exception'],
    kpis: ['kpi-savings-realization', 'kpi-cost-avoidance', 'kpi-roi'],
    glossary: ['gloss-run-rate', 'gloss-cost-avoidance', 'gloss-ebitda']
  },
  labMission: {
    title: 'Mission 18.3: Close One Disruption Properly',
    desc: 'Take the last supply event your organisation had and run the three closures against it, then find the annual review that never happened.',
    tasks: [
      'State the current baseline for one affected category and whether it was set during the event. Write the method or the absence of one.',
      'List the contractual positions from that event and mark each as pursued, settled, waived or simply never decided.',
      'Find last year improvement actions from any disruption review and report each as done or not done, with the evidence.'
    ],
    ctaLabel: 'Open Savings Validation Template',
    ctaHref: '#/tpl/tpl-savings-validation',
    secondaryLabel: 'Open Procurement Audit SOP',
    secondaryHref: '#/sop/sop-procurement-audit'
  }
});
