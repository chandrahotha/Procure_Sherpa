/* ==========================================================
   Procure Sherpa v2.4 - Academy Content Part 6
   Module 12: Advanced Category & Portfolio Strategy
   Tail spend, supply market structure, and demand leverage.
   These three functions are written at practitioner and executive
   altitude: they assume the reader already runs sourcing events and is
   now accountable for the shape of the portfolio, not one line in it.
   ========================================================== */
PS.ACADEMY_FUNCTIONS = PS.ACADEMY_FUNCTIONS || [];

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-tail-spend-program',
  title: 'Tail Spend Programmes & Consumption Control',
  module: 'Module 12: Advanced Category & Portfolio Strategy',
  kicker: 'Function 12.1',
  tier: 'practitioner',
  tagline: 'Turning the long, low-value tail into a managed channel instead of an unmanaged leak.',
  desc: 'The tail is 70 to 80 percent of suppliers and 10 to 20 percent of spend. It cannot be run like a strategic category, and leaving it alone is what makes the number grow. This function covers the three levers that actually work on it: channel control, catalogue enablement, and consumption discipline.',
  duration: '22 mins',
  lifecycleStage: 'Performance management and value assurance',
  lifecycleDesc: 'Runs across the whole lifecycle downstream of the strategic categories, because the tail is bought continuously by people who are not buyers.',

  what: 'Tail spend is the large population of low-value, high-frequency purchases spread across many suppliers and many buying locations: maintenance consumables, small services, subscriptions under threshold, one-off equipment. A tail programme is not a sourcing campaign repeated many times; it is a change to how the organisation buys. The three levers, in the order they usually pay: first the channel (make the compliant route the easiest route), then the catalogue (put the agreed offer where the buyer already is), then consumption (reduce what is used, not just what it costs). Price negotiation on the tail is real but small; the money is usually in volume, duplication and unmanaged demand.',
  why: [
    'The tail is where maverick spend lives: nobody reviews a purchase that is below every approval threshold, so the leakage is structural rather than behavioural.',
    'Administrative cost is invisible in unit price. A purchase order under USD 500 can cost more to process than the goods are worth, so tail reduction pays twice: in price and in cost-to-serve.',
    'Supplier count is a risk surface in itself. Every unmanaged vendor is an un-run due-diligence check, an unused contract and an unmeasured exposure, and the tail usually holds most of them.'
  ],
  when: [
    'When spend analysis shows a supplier population far larger than the number of active contracts.',
    'When requisition volumes show many small orders against the same supplier at different sites or departments.',
    'Before a consolidation or e-procurement rollout, because a tail programme is the cheapest phase of either and the easiest to fail at.'
  ],
  raci: [
    { role: 'Head of Procurement', resp: 'Accountable for the tail target, the channel policy and the threshold structure that makes compliance the default.' },
    { role: 'Indirect Category Manager', resp: 'Responsible for the consolidation design, catalogue content and supplier rationalisation plan.' },
    { role: 'Finance / Controller', resp: 'Consulted on purchasing-card limits, expense-policy design and the cost-to-serve baseline the programme is measured against.' },
    { role: 'Budget holders and requesters', resp: 'Responsible for using the agreed channel; they are the actual population a tail programme changes, not an audience for it.' }
  ],
  inputs: [
    'Clean supplier and spend data: count of suppliers, orders per supplier, spend per supplier, orders per cost centre, and the value distribution across them.',
    'The current approval thresholds, purchasing-card limits and expense policy, and evidence of how often they are worked around.',
    'Cost-to-serve estimate per transaction, including requisition, approval, receipt, invoice matching and dispute handling.'
  ],
  outputs: [
    'A tail segmentation that names which slices get a catalogue, which get a managed service provider, and which are deliberately left alone with a stated reason.',
    'A channel design: preferred route, purchasing-card rules, exception path, and what happens to a requisition that goes around it.',
    'A rationalisation plan with a supplier-count target, a consumption baseline and a measurement method that Finance will accept.'
  ],
  controls: [
    'Supplier onboarding requires a business reason and a named owner; a tail vendor cannot be created by an unmanaged request.',
    'Thresholds are set on the value the organisation can actually absorb, not on what makes the approval queue look short.',
    'Every catalogue deviation is logged, so the leakage is visible by department rather than argued about in aggregate.'
  ],
  mistakes: [
    'Running the tail as one giant category with one consolidated supplier, then discovering the delivery lead time and the service level cost more than the discount earned.',
    'Treating catalogue coverage as the goal: a catalogue nobody uses produces coverage numbers and no savings, because the buyer found it easier to keep doing what they did.',
    'Cutting supplier count without cutting demand. The orders return inside a quarter through a different vendor and the measured saving reverses.'
  ],
  bestPractices: [
    'Fix the channel before the price. Making the compliant route the fastest route earns more than any tail discount, and it is the only intervention that scales with headcount.',
    'Segment the tail by behaviour, not only by value: a low-value item bought weekly by one department is a different problem from a low-value item bought once by forty.',
    'Publish the consumption metric, not just the price metric. The tail moves when the business can see its own volume next to a peer.'
  ],
  terms: [
    { term: 'Cost-to-serve', def: 'The full internal cost of processing a purchase, from requisition to paid invoice, usually measured per transaction and rarely visible in the unit price.' },
    { term: 'Catalogue enablement', def: 'Placing agreed offers, prices and terms inside the system the requester already uses, so the compliant choice is the easy choice.' },
    { term: 'Consumption control', def: 'Managing how much is used rather than what is paid: standardisation, reuse, returnable packaging, and rightsizing the specification.' }
  ],
  thinkingPoints: [
    {
      quote: 'A tail programme is a change management project with a procurement budget line, not a negotiation with many small suppliers.',
      explanation: 'The people whose behaviour has to change are not buyers, and they do not experience the programme as savings. They experience it as a new screen, a new card rule, and a supplier they liked being replaced by one they do not know. A programme that ignores that gets compliance reports and no consumption change.',
      realWorldExample: 'An industrial group consolidated 1,400 tail vendors to 90 and reported a 9 percent price saving in year one. In year two, spend returned to 1,100 vendors because plants raised the same demand through small capital orders that fell under the new threshold. The consolidation had been a purchasing decision, not an operating design.',
      reflectionPrompt: 'In your organisation, which route is faster for a requester: the approved channel or the workaround? If the answer is the workaround, the control is not a control.'
    },
    {
      quote: 'The tail is the only part of the portfolio where reducing the number of transactions is usually worth more than reducing the price per transaction.',
      explanation: 'Price leverage on a tail item is limited by the item itself. Transaction leverage is not, because the internal cost is fixed per order and the order count is entirely within the organisation control.',
      realWorldExample: 'A services firm found that 31 percent of its purchase orders were under USD 300 against an estimated processing cost of USD 180 per order. Releasing a pre-approved catalogue and moving small recurring buys to card with automatic reconciliation removed 5,600 orders a year, worth more than the entire negotiated discount on the same categories.',
      reflectionPrompt: 'Estimate your own cost per transaction and multiply it by the number of orders under the approval threshold. That number is the size of the tail problem, before any price is considered.'
    }
  ],
  sopSteps: [
    {
      title: 'Establish the tail baseline and its shape',
      role: 'Indirect Category Manager',
      desc: 'Build the distribution rather than the total: supplier count, order count, spend bands, orders per cost centre, and the share of the population that produces half the transactions.',
      control: 'The baseline is agreed with Finance on a stated period and exclusion list before any target is set against it.',
      record: 'Tail baseline pack with the value distribution, supplier population and cost-to-serve assumption, dated and sourced.',
      pitfall: 'Reporting an average tail value that hides a bimodal distribution, so the programme is designed for a spend shape that does not exist.'
    },
    {
      title: 'Segment the tail into deliberately different treatments',
      role: 'Indirect Category Manager',
      desc: 'Split by behaviour and risk: catalogue-eligible recurring goods, one-off low-risk services, managed-service candidates, and items that stay unmanaged because control costs more than the exposure.',
      control: 'Every segment has a named treatment and an owner; nothing is left in a residual bucket by default.',
      record: 'Tail segmentation matrix showing spend, transaction count, treatment, owner and the stated reason for anything left unmanaged.',
      pitfall: 'Applying one solution to the whole tail, which produces a catalogue for goods that were never the problem and a contract for services that need a specification nobody will write.'
    },
    {
      title: 'Design the channel before negotiating the price',
      role: 'Head of Procurement',
      desc: 'Define the compliant route for each segment, the card rules, the exception path, and the threshold structure; then test whether the compliant route is genuinely the fastest one.',
      control: 'Threshold changes are approved with Finance and reviewed against actual bypass data, not against assumption.',
      record: 'Channel design document with policy references, card limits, exception handling and the measured approval time for each route.',
      pitfall: 'Publishing a policy that makes the approved path slower than the workaround, then measuring non-compliance as a behavioural failure instead of a design failure.'
    },
    {
      title: 'Build catalogue coverage against real demand',
      role: 'Indirect Category Manager',
      desc: 'Load the agreed offers into the route requesters already use, starting from the highest-frequency items in the baseline rather than from whichever supplier is easiest to sign.',
      control: 'Coverage is measured as share of actual transactions served, and content is refreshed on a stated cadence.',
      record: 'Catalogue coverage report by department, the refresh cadence, and the deviation log showing what still bypasses it.',
      pitfall: 'Launching with a coverage target and no consumption view, so the catalogue is judged complete while the same items keep being bought off-catalogue.'
    },
    {
      title: 'Run consumption review with the business, not at it',
      role: 'Budget Holder',
      desc: 'Put each department volume in front of the people who generate it, compare it against peers, and agree the two or three items worth standardising, reusing or specifying down.',
      control: 'Consumption actions are owned by the requesting department and tracked as their number, not procurement number.',
      record: 'Consumption review pack per department with agreed actions, owners and the re-measure date.',
      pitfall: 'Reporting procurement savings that are actually demand reductions achieved by a business unit, which then has no incentive to keep doing it.'
    },
    {
      title: 'Rationalise the supplier population with an exit path',
      role: 'Indirect Category Manager',
      desc: 'For each supplier being removed, confirm the demand is genuinely covered, close out contracts and balances, and disable the vendor record so it cannot be reopened by a requisition.',
      control: 'A vendor is only deactivated when the replacement is live and a residual spend check shows no unmet demand.',
      record: 'Vendor rationalisation log with the replacement, contract closure status, outstanding balances and residual-spend evidence.',
      pitfall: 'Deleting vendors as a count reduction while leaving the demand uncovered, which returns as emergency spend at a worse price within a quarter.'
    },
    {
      title: 'Prove the result and re-baseline',
      role: 'Head of Procurement',
      desc: 'Report the three measured outcomes separately: transaction count removed, supplier population reduced, and price or consumption saving validated by Finance; then reset the baseline so next year is measured honestly.',
      control: 'Savings and cost-to-serve claims are validated through the same savings-assurance route as any other category, with the method stated.',
      record: 'Tail programme close report with validated saving, transaction and vendor counts, and the re-baselined starting position.',
      pitfall: 'Banking the first year improvement as a permanent run rate, so year two shows a miss against a baseline that was already achieved.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'Your indirect portfolio holds 2,300 active suppliers. 78 percent of them account for 11 percent of spend, and 41 percent of all purchase orders are below the approval threshold. Finance wants a tail programme and expects a price saving.',
      q: 'What should the programme be designed around first?',
      options: [
        { text: 'A consolidated tail supplier with a negotiated discount across the whole population.', isCorrect: false, rationale: 'This is the intuitive answer and usually the wrong one. A single tail vendor optimises price on 11 percent of spend while destroying service on the items that made them numerous, and it does nothing about the 41 percent of orders that cost money to process whatever their price.' },
        { text: 'Transaction count and channel design: make the compliant route the fastest route, then manage consumption.', isCorrect: true, rationale: 'Correct. On the tail, the internal cost per transaction is fixed and the order count is entirely within your control, so removing 5,600 orders is worth more than a discount on them. Price is real here but it is the third lever, not the first.' },
        { text: 'A catalogue covering as many items as possible, measured by coverage percentage.', isCorrect: false, rationale: 'Coverage is a proxy metric. A catalogue that requesters route around produces a compliance report and no consumption change, and it will be judged complete while the transactions keep happening elsewhere.' },
        { text: 'Raising the approval threshold so fewer orders need approving.', isCorrect: false, rationale: 'This reduces the approval workload, which is one component of cost-to-serve, while removing the control that made the leakage visible. Done without a channel design it converts managed spend into unmanaged spend at a faster rate.' }
      ],
      principle: 'On the tail, leverage comes from the number of transactions and the demand behind them, not from unit price. Fix the channel, then the catalogue, then consumption, and only then negotiate.'
    },
    {
      type: 'scenario',
      context: 'A plant manager refuses the new catalogue and keeps ordering from a local supplier he has used for nine years. The catalogue price is 6 percent lower for the same specification.',
      q: 'What is the strongest response?',
      options: [
        { text: 'Escalate the non-compliance to his management as a policy breach.', isCorrect: false, rationale: 'This defends the control and loses the programme. It tells every other requester that the catalogue is an audit instrument rather than a service, and it makes the next bypass harder to see, not easier.' },
        { text: 'Find out what the local supplier provides that the catalogue does not, and treat that as a design requirement.', isCorrect: true, rationale: 'Correct. Long-standing local supply usually buys something real: same-day delivery, a returnable container, an invoice the plant can settle locally, a person who answers. If the compliant route does not provide it, the route is incomplete, and the 6 percent price gap is the cost of the missing service rather than a saving.' },
        { text: 'Report the saving as realised at the catalogue price and let the difference fall into variance.', isCorrect: false, rationale: 'This is a false claim. Saving is measured against what was actually bought, and banking a price the organisation did not pay is exactly the kind of number that destroys the credibility of the rest of the report.' },
        { text: 'Add the local supplier to the catalogue at his price.', isCorrect: false, rationale: 'Sometimes the right answer eventually, but not as a reflex. It surrenders the consolidation logic, multiplies the managed population, and rewards the loudest requester rather than solving the service gap for everyone.' }
      ],
      principle: 'Non-compliance is data. Before enforcing a channel, establish what the workaround is buying, because the answer is usually a service requirement the design missed.'
    },
    {
      type: 'scenario',
      context: 'Year one of a tail programme: 1,400 vendors rationalised to 90, 9 percent price saving reported. In year two the vendor population climbs back to 1,100 and the saving reverses.',
      q: 'What is the most likely cause?',
      options: [
        { text: 'Suppliers became less competitive after consolidation.', isCorrect: false, rationale: 'Possible, and worth checking, but it does not explain the vendor count rising back to 1,100. Consolidation reduces the population; it does not make new vendors appear by itself.' },
        { text: 'The demand was never reduced, so it re-expressed itself through other routes once the original ones were closed.', isCorrect: true, rationale: 'Correct. Cutting supplier count without cutting consumption removes the path, not the need. The demand returns through capital orders, expense claims, or a different vendor, and because nothing measured consumption the reversal is only visible a year later.' },
        { text: 'The savings target was set too high for the category.', isCorrect: false, rationale: 'A target being ambitious does not create new vendors. This explanation shifts the cause onto forecasting rather than onto the design of the programme.' },
        { text: 'Category management lacked the resource to police the tail continuously.', isCorrect: false, rationale: 'Resourcing matters, but policing is not how a tail programme holds. Programmes that depend on watching every transaction have already failed by design; the control has to be the channel.' }
      ],
      principle: 'A supplier-count reduction that is not backed by a demand reduction is temporary. Measure consumption, or the saving comes back as spend.'
    },
    {
      type: 'scenario',
      context: 'You estimate internal cost-to-serve at USD 165 per purchase order. One department places 3,900 orders a year; 2,400 of them are under USD 250 and cover 60 repeated item lines.',
      q: 'What is the highest-value first intervention?',
      options: [
        { text: 'Negotiate a 10 percent discount across all 3,900 orders.', isCorrect: false, rationale: 'A 10 percent discount on small orders earns little and costs negotiation time. Compare it with the option that removes the transactions themselves.' },
        { text: 'Move the 60 repeated lines to a stocked catalogue or call-off arrangement so the 2,400 sub-USD 250 orders stop existing as individual transactions.', isCorrect: true, rationale: 'Correct. 2,400 orders at USD 165 each is roughly USD 396,000 of internal processing cost against 60 repeated item lines. One catalogue or blanket call-off per line removes most of that cost permanently, and the price benefit arrives on top rather than instead.' },
        { text: 'Require departmental approval above USD 250.', isCorrect: false, rationale: 'This adds cost to the transactions it was designed to control and leaves the 2,400 orders in place. Approval friction is the opposite of channel design.' },
        { text: 'Consolidate the 60 lines onto one supplier.', isCorrect: false, rationale: 'A reasonable second step. Consolidating suppliers does not reduce the order count if the department still raises a purchase order for every need, which is the cost being measured here.' }
      ],
      calcWork: '2,400 orders x USD 165 cost-to-serve = USD 396,000 a year of internal processing on 60 repeated lines. Price leverage on those lines is capped by their value; transaction leverage is capped only by how many can be removed.',
      principle: 'When cost-to-serve is known, the order count becomes a business case. Twenty-four hundred small orders are not a procurement problem; they are a design problem worth a quarter of a million dollars.'
    },
    {
      type: 'scenario',
      context: 'The CFO asks why the tail programme reports a 9 percent saving while the departmental expense lines have not moved.',
      q: 'What is the most credible answer?',
      options: [
        { text: 'Explain that tail savings are small and hard to see at total-cost level.', isCorrect: false, rationale: 'This is an admission without evidence. If the saving is real it lands somewhere measurable; if it cannot be found, the number needs re-examination.' },
        { text: 'Reconcile the saving against consumption and volume, and show which part is price, which is volume reduction, and which has been eroded by demand growth.', isCorrect: true, rationale: 'Correct. A tail saving that does not appear in the expense line is almost always being consumed by higher volume, new items, or a mix shift. Separating price effect from volume effect is the only answer that survives scrutiny, and it is also the answer that tells the CFO where to look next.' },
        { text: 'Restate the saving as cost avoidance, since the tail is mostly demand-driven.', isCorrect: false, rationale: 'Reclassifying to avoid an uncomfortable question damages every future claim. Cost avoidance is a legitimate category with its own evidence standard; it is not a place to park a number that does not reconcile.' },
        { text: 'Show the percentage saving per item against the previous supplier price.', isCorrect: false, rationale: 'This proves the unit price moved. It does not answer the question, which is about the total, and answering a different question is how credibility is lost twice.' }
      ],
      principle: 'A saving claim must reconcile to a place in the accounts. Price effect and volume effect separated is an answer; a percentage against a prior invoice is not.'
    },
    {
      type: 'scenario',
      context: 'A tail vendor is being deactivated. It still has two open orders and an unreconciled credit, and the replacement catalogue goes live next week.',
      q: 'What is the correct sequence?',
      options: [
        { text: 'Deactivate now so the count reduction is captured in this quarter, and let the exceptions be handled afterwards.', isCorrect: false, rationale: 'This creates the emergency spend the programme exists to prevent. An open order against a blocked vendor becomes a manual workaround, an exception approval and a worse price, and the credit becomes a reconciliation problem for Finance.' },
        { text: 'Confirm replacement coverage, close out the open orders and the credit, then disable the vendor record so it cannot be reopened.', isCorrect: true, rationale: 'Correct. The vendor is only genuinely gone when demand is covered elsewhere, the balances are settled and the record cannot be resurrected by a requisition. Doing it in that order is what separates a rationalisation from a re-shuffle.' },
        { text: 'Keep the vendor active but set a spend block above the tail threshold.', isCorrect: false, rationale: 'A spend block that leaves the vendor creatable keeps the population alive and the risk register open. It is a partial control presented as a completed one.' },
        { text: 'Transfer the open orders to the new supplier and deactivate with the credit noted in the report.', isCorrect: false, rationale: 'Better than blocking, but it leaves the credit unreconciled and assumes the replacement can serve those specific orders. Confirm coverage first, and close the balance before the record is shut.' }
      ],
      principle: 'A vendor reduction counts only when the demand is covered, the balances are clean, and the record cannot be reopened by the people who used it.'
    }
  ],
  relSop: 'sop-procurement-lifecycle',
  rel: {
    concepts: ['direct-indirect-spend', 'demand-management', 'spend-analysis', 'supplier-segmentation', 'cost-avoidance'],
    sops: ['sop-procurement-lifecycle', 'sop-contract-renewal'],
    checklists: ['cl-sourcing-strategy', 'cl-supplier-identification'],
    templates: ['tpl-business-case', 'tpl-savings-calculation'],
    calcs: ['calc-savings-analysis', 'calc-kpi-calculator'],
    decisions: ['consolidate-suppliers', 'sourcing-method'],
    kpis: ['kpi-maverick-spend', 'kpi-sum', 'kpi-contract-coverage'],
    glossary: ['gloss-cost-to-serve', 'gloss-run-rate']
  },
  labMission: {
    title: 'Mission 12.1: Size the Tail Before Touching It',
    desc: 'Use the savings analysis and KPI tools to separate price effect from transaction effect on a tail population, and decide which lever moves first.',
    tasks: [
      'Open the KPI Calculator and set the tail spend share, supplier count and order volume so the transaction cost becomes visible.',
      'Use the Savings Analysis tool to split the benefit into price effect and volume effect, and state the assumption behind each.',
      'Write the one-line channel change you would make before negotiating anything, and what it is worth in removed transactions.'
    ],
    ctaLabel: 'Open KPI Calculator',
    ctaHref: '#/calc/calc-kpi-calculator',
    secondaryLabel: 'Open Savings Analysis',
    secondaryHref: '#/calc/calc-savings-analysis'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-market-structure',
  title: 'Supply Market Structure & Competitive Tension',
  module: 'Module 12: Advanced Category & Portfolio Strategy',
  kicker: 'Function 12.2',
  tier: 'executive',
  tagline: 'Knowing when a market can be made competitive, and when the answer has to be something other than a tender.',
  desc: 'Concentrated markets, capacity constraints, vertical integration and switching costs decide what is possible before any strategy is written. This function teaches the structural read that separates a real competitive process from a ritual one.',
  duration: '26 mins',
  lifecycleStage: 'Market analysis and supplier identification',
  lifecycleDesc: 'Front-loads the sourcing decision: the market read determines the method, and choosing the method first is how three bids get collected from two economic entities.',

  what: 'Market structure is the economic shape of the supply side: how many genuine competitors exist, whether they are independent or related, how concentrated the market is, what capacity is available, what the switching cost is for a buyer and for a supplier, and whether the market is currently consolidating or expanding. Concentration is measured with tools like the four-firm concentration ratio and the Herfindahl-Hirschman Index, but the numbers are only useful when read alongside structure: three bidders owned by one parent, or two national distributors of one global manufacturer, are not a competitive market however the count looks. Where structure blocks competition, the professional answers change: long-term agreements with index-linked pricing, capacity reservation, dual-sourcing with a qualified second, inventory buffering, specification change, vertical integration, or a documented single-source justification with a monitored exit.',
  why: [
    'A tender in a structurally concentrated market produces the appearance of competition and none of its benefits, while consuming the time and goodwill of every participant.',
    'Concentration is also supplier-side leverage: a market where one supplier holds 45 percent of your spend and you hold 2 percent of their revenue is not a negotiation, whatever the contract says.',
    'Market structure changes slower than price and faster than strategy. A capacity crunch, a plant closure or a merger rewrites what your options are, and only an explicit read makes that visible before it becomes an emergency.'
  ],
  when: [
    'Before selecting a sourcing method for any category where fewer than four credible suppliers can be named.',
    'When a category shows price movement that cannot be explained by input costs, which often signals consolidation or capacity withdrawal.',
    'During portfolio review, to decide which categories are genuinely competitive and which need structural intervention rather than an event.'
  ],
  raci: [
    { role: 'Category Manager', resp: 'Accountable for the market read: participants, capacity, ownership, switching cost and the conclusion about achievable tension.' },
    { role: 'Head of Procurement', resp: 'Responsible for accepting the read and authorising the non-obvious route when competition is not available, with the justification documented.' },
    { role: 'Supplier / Market Analyst', resp: 'Consulted on upstream inputs, capacity data, ownership structures and market direction.' },
    { role: 'Legal & Risk', resp: 'Consulted on exclusivity, long-term agreement terms, and competition-law boundaries around information sharing and joint bidding.' }
  ],
  inputs: [
    'Supplier population by category with ownership: parent companies, subsidiaries, distributors of the same manufacturer, and joint ventures.',
    'Capacity and demand data: utilisation, lead times, order books, announced expansions or closures, and where the category sits in the cycle.',
    'Your own share of each supplier revenue and theirs of your spend, plus switching cost in both directions: requalification, tooling, validation, downtime.'
  ],
  outputs: [
    'A market structure assessment stating the number of genuinely independent competitors, the concentration measure with its limits, and the direction of travel.',
    'A sourcing method chosen on that evidence, with a written reason when the method is not competitive tender.',
    'A structural action list where competition cannot be created: qualification of a second source, capacity reservation, index-linked long-term agreement, buffer policy, or specification change.'
  ],
  controls: [
    'A competitive method requires evidence of independent competitors; three related bids are documented as one and treated as a single-source case.',
    'Long-term agreements in concentrated markets carry pricing mechanics, term limits and an exit review, so a structural fact does not become a permanent arrangement.',
    'Market reads are dated and revisited on a stated cadence, because a concentration conclusion from three years ago is an assumption today.'
  ],
  mistakes: [
    'Counting bidders instead of competitors, then describing a market as competitive because four responses arrived from two economic entities and their distributors.',
    'Responding to concentration with an aggressive tender that wins a short-term price and loses the relationship, capacity priority and service level in a market you cannot leave.',
    'Treating dual-sourcing as a strategy without qualifying the second source, which produces a second name on a list and no real alternative when the first fails.'
  ],
  bestPractices: [
    'State the market read out loud in the sourcing strategy, including the number of independent competitors and what that means for expected tension.',
    'Where competition is unavailable, buy structure rather than price: capacity rights, qualified alternates, transparency on cost mechanics, and an exit that gets cheaper over time.',
    'Track your share of supplier revenue. The leverage in a concentrated relationship is usually asymmetric, and the direction of that asymmetry decides how a negotiation will go.'
  ],
  terms: [
    { term: 'Herfindahl-Hirschman Index (HHI)', def: 'The sum of the squared market shares of participants, used as a concentration measure; it counts shares, not independence, so ownership must be read separately.' },
    { term: 'Four-firm concentration ratio (CR4)', def: 'The combined share of the four largest participants, a coarse but legible indicator of whether a market is competitive or oligopolistic.' },
    { term: 'Qualification of a second source', def: 'The funded work of making a real alternative technically and commercially usable before it is needed, which is what turns dual-sourcing from a phrase into a control.' }
  ],
  thinkingPoints: [
    {
      quote: 'The sourcing method is a consequence of market structure, not a preference of the buyer.',
      explanation: 'Most procurement process failure is a mismatch between method and reality. A competitive event in a market with two independent suppliers forces a price signal that cannot be honoured, and a long-term agreement in a fragmenting market locks in a premium that competition would have removed. The read comes first because it constrains everything after it.',
      realWorldExample: 'A packaging buyer ran a five-bidder tender for a specialty film and won 11 percent. Two suppliers withdrew from the category the following year, the remaining two raised price 30 percent inside eighteen months, and the organisation discovered it had converted four options into two for a one-off discount.',
      reflectionPrompt: 'For the last three sourcing events you ran, could you name the number of economically independent competitors before the bids arrived? If not, the method was assumed rather than chosen.'
    },
    {
      quote: 'In a concentrated market, the most valuable thing you can buy is not a lower price; it is information and optionality.',
      explanation: 'Cost transparency, index-linked pricing, capacity commitments, notice periods and a qualified alternate are worth more than a discount, because they change the shape of the relationship rather than its current level. A discount on an unmanaged dependency is a payment to keep the dependency.',
      realWorldExample: 'A manufacturer holding 60 percent of its resin spend with one producer stopped negotiating price and instead negotiated a formula tied to a published feedstock index with a quarterly review, a reserved volume band, and funded qualification of a second producer. When the incumbent had an unplanned outage two years later, the reserved volume and the qualified alternate were what protected the production line.',
      reflectionPrompt: 'List what your top three concentrated relationships give you besides supply: cost visibility, capacity rights, notice periods, alternates already qualified. If the list is short, that is the negotiation objective.'
    }
  ],
  sopSteps: [
    {
      title: 'Map the supply side as an economic structure',
      role: 'Category Manager',
      desc: 'List every participant with ownership: parents, subsidiaries, exclusive distributors, joint ventures and contract manufacturers, so the count of names is converted into a count of independent competitors.',
      control: 'Ownership is verified from registration, annual reporting or direct confirmation, not from the logo on a quotation.',
      record: 'Market map showing participants, ownership chain, approximate share, and the stated number of independent competitors.',
      pitfall: 'Reading four quotations from the same manufacturer distribution network as four competitive bids, then reporting a competitive process that produced no tension.'
    },
    {
      title: 'Measure concentration and state its limits',
      role: 'Category Manager',
      desc: 'Calculate CR4 and HHI for the relevant geography, then write what the numbers do not capture: captive capacity, vertical integration, and whether your demand is material to any participant.',
      control: 'The geography and product scope are stated, since concentration measured globally can hide a regional monopoly.',
      record: 'Concentration analysis with scope, method, figures and the explicit limits of the measure.',
      pitfall: 'Publishing an index without scope. A market that is competitive globally and monopolised within a delivery radius needs the second fact, not the first.'
    },
    {
      title: 'Test whether tension can be created at all',
      role: 'Category Manager',
      desc: 'Assess whether an alternate can be qualified, whether a distributor relationship can be replaced by direct supply, whether specification change opens a new market, and what each of those would cost and take in time.',
      control: 'Each route is stated with cost, lead time and qualification effort, so the conclusion is comparable rather than rhetorical.',
      record: 'Tension feasibility assessment listing each option, its cost, its lead time and whether it is worth funding.',
      pitfall: 'Concluding a market is uncompetitive and stopping there. The professional output is a set of structural options with prices, not a finding.'
    },
    {
      title: 'Choose the method against the read and write the reason',
      role: 'Head of Procurement',
      desc: 'Select competitive tender, limited competition, long-term agreement with pricing mechanics, capacity reservation, or documented single source, and record why the selected method matches the structure.',
      control: 'A non-competitive method requires the same approval rigour as a single-source justification, with a stated exit review date.',
      record: 'Sourcing strategy with the market read, the chosen method, the reason, and the review or exit trigger.',
      pitfall: 'Choosing a non-competitive route to avoid scrutiny rather than because the market makes it correct, which converts a legitimate method into a governance exception.'
    },
    {
      title: 'Negotiate structure where price leverage is absent',
      role: 'Category Manager',
      desc: 'Trade term for certainty: index-linked pricing with a defined review, reserved volume, notice periods, cost transparency on the major inputs, and jointly funded qualification of an alternate.',
      control: 'Pricing formulas reference a published, verifiable index and cap what can be passed through, with the calculation worked in the agreement.',
      record: 'Agreement terms showing the pricing mechanic, capacity commitment, notice period and the funded alternate-qualification plan.',
      pitfall: 'Accepting a price increase with no mechanism attached, which leaves every future increase to be fought one at a time with no reference point.'
    },
    {
      title: 'Monitor the structure and re-read on a cadence',
      role: 'Category Manager',
      desc: 'Track announced capacity changes, mergers, withdrawals, lead time drift and your own share of supplier revenue, and re-issue the market read at a stated interval or on a trigger event.',
      control: 'Triggers are defined in advance: a merger in the category, a lead time more than double baseline, or the loss of an independent competitor.',
      record: 'Market watch log with trigger events, the date of the last full re-read, and the action taken on each.',
      pitfall: 'Running a strategy built on a three-year-old structure, where consolidation has already removed the option the plan assumed.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'A specialty chemical category receives four responses to its tender. Ownership checks show two are subsidiaries of the same producer and one is its exclusive national distributor.',
      q: 'What is the correct read of the market?',
      options: [
        { text: 'Competitive: four responses, so competitive tension exists and the tender should proceed as planned.', isCorrect: false, rationale: 'This counts documents rather than competitors. Two subsidiaries and the distributor of the same producer submit prices that move together because they come from one economic entity, and the resulting "competition" is a distribution exercise.' },
        { text: 'One dominant producer plus at most one independent source: treat this as a concentrated market and change the method.', isCorrect: true, rationale: 'Correct. Stripping ownership leaves one producer holding three of the four positions. The method should then reflect reality: a long-term agreement with pricing mechanics, funded qualification of the independent producer, or documented single-source justification with an exit plan.' },
        { text: 'Non-competitive, so award immediately to the lowest bid and move on.', isCorrect: false, rationale: 'The read is right and the action is wrong. Accepting a lowest bid from a dominant supplier in a concentrated market buys a number and forfeits the leverage that a term, capacity right or qualified alternate would have bought.' },
        { text: 'Cancel the tender and rebid next quarter with a wider invitation list.', isCorrect: false, rationale: 'Rebidding a market that has three names in it produces the same three names. Widening the list is only useful if a genuinely independent producer exists, which is a qualification question rather than an invitation question.' }
      ],
      principle: 'Count independent competitors, not responses. Ownership structure decides whether a tender is a competition or a formality.'
    },
    {
      type: 'scenario',
      context: 'HHI for your packaging market is 2,650 on a national basis. Your delivery radius is 300 kilometres, and within it two plants supply 84 percent of regional volume.',
      q: 'Which conclusion should shape your strategy?',
      options: [
        { text: 'Use the national HHI; regional data is too small to be representative.', isCorrect: false, rationale: 'The measure is only valid at the scope it is calculated for. If supply must physically travel to you, the national figure describes a market you cannot buy in.' },
        { text: 'Treat the market as regionally concentrated, because goods, capacity and lead time are bound to geography even when the national index looks dispersed.', isCorrect: true, rationale: 'Correct. Concentration must be measured in the market the buyer can actually access. A 300-kilometre radius with 84 percent supplied by two plants is a concentrated market whatever the national index says, and the strategy has to be built on the constraint that can stop production.' },
        { text: 'Diversify nationally immediately, since HHI above 2,500 always signals a problem.', isCorrect: false, rationale: 'A threshold with no scope or cost attached is not a decision. National diversification may be irrelevant for a heavy low-value good where freight dominates, and it takes years to qualify capacity anywhere.' },
        { text: 'Commission a more precise index calculation before drawing any conclusion.', isCorrect: false, rationale: 'Precision is not the issue; scope is. More exact arithmetic on the wrong market will not change the regional fact that two plants can disrupt you.' }
      ],
      calcWork: 'HHI 2,650 nationally reads as concentrated, but the operative market is regional: two plants at 84 percent of a 300 km radius is far more binding than the national number. Always state the geography before the index.',
      principle: 'Measure concentration where supply can physically and commercially reach you, not where the data is most convenient.'
    },
    {
      type: 'scenario',
      context: 'A single supplier holds 58 percent of your spend in a component category. Your volume is 1.5 percent of their revenue. Price has risen 22 percent in two years, in line with their published cost increases.',
      q: 'What is the realistic source of leverage here?',
      options: [
        { text: 'Threaten to move the volume, since 58 percent of your spend is significant to any supplier.', isCorrect: false, rationale: 'The asymmetry is the other way round. Your 1.5 percent of their revenue is not a threat they will price, and a failed threat in a market you cannot leave costs you the relationship and the service level as well as the price.' },
        { text: 'Reduce the dependency structurally: qualify an alternate, change the specification, or make the volume more attractive so your share of their revenue rises.', isCorrect: true, rationale: 'Correct. Where share asymmetry is against you, leverage comes from changing the shape of the relationship over time, not from a negotiation round. Each of those three moves raises your position in the next conversation, and the qualification also reduces the risk you are exposed to.' },
        { text: 'Accept the increase since it tracks published costs.', isCorrect: false, rationale: 'A cost movement that is pass-through in a competitive market is not automatically a fair price in a concentrated one. Accepting it with nothing gained, no mechanism agreed and no alternate funded is not a decision, it is a default.' },
        { text: 'Run a competitive tender to force the price down.', isCorrect: false, rationale: 'With no qualified alternate, the tender produces one bid and a damaged relationship. The event is not the constraint; the absence of an option is.' }
      ],
      principle: 'When the asymmetry is against you, buy structure over term: alternates, specification options and a more interesting share of the supplier revenue.'
    },
    {
      type: 'scenario',
      context: 'Two producers dominate a market you depend on. A third has technology that could substitute but has never supplied your industry and would need eighteen months of qualification costing USD 400,000.',
      q: 'What is the soundest decision?',
      options: [
        { text: 'Decline: the qualification cost exceeds any likely saving.', isCorrect: false, rationale: 'This values optionality at zero. The comparison is not qualification cost against price saving; it is qualification cost against the exposure of having no alternative when two producers control capacity, or one of them fails.' },
        { text: 'Fund the qualification as an option purchase, and use its progress as a pricing lever in the existing relationships.', isCorrect: true, rationale: 'Correct. A qualified alternate is the only thing that converts a concentrated market into a negotiable one, and its value increases precisely at the moment of supply failure or price escalation. Running it transparently also changes the tone of the incumbent conversations, because the option becomes real to them as well.' },
        { text: 'Ask one of the two incumbents to expand into the substitute technology.', isCorrect: false, rationale: 'That asks the concentrated market to solve its own concentration. The incumbent has no reason to fund the capability that weakens its position, and waiting for it costs the eighteen months anyway.' },
        { text: 'Start the qualification only if prices rise again.', isCorrect: false, rationale: 'By then the lead time is the binding constraint. A qualification begun during a price move is a negotiation casualty rather than a strategy, because you will be forced to conclude the expensive phase while depending on the supplier you are challenging.' }
      ],
      principle: 'Qualification of an alternate is bought as an option, before it is needed. Its value is highest at the moment you cannot use it.'
    },
    {
      type: 'scenario',
      context: 'The board asks why procurement approved a five-year sole-source agreement with no competitive event.',
      q: 'What makes that approval defensible?',
      options: [
        { text: 'A documented market read, a pricing mechanic tied to a published index, a term limit shorter than the market cycle, funded alternate qualification with a review date, and formal approval at the right delegation level.', isCorrect: true, rationale: 'Correct. Sole source is defensible when the absence of competition is evidenced, the price is constrained by something other than negotiation, the arrangement expires rather than persists, and an exit is being built meanwhile. Each of those five is a document a reviewer can test.' },
        { text: 'The supplier accepted a 3 percent annual increase, which is below inflation.', isCorrect: false, rationale: 'A price outcome is not a governance answer. It says nothing about whether the market was checked, whether the mechanic survives an input shock, or whether an alternative exists in five years.' },
        { text: 'Three suppliers were invited and only one responded.', isCorrect: false, rationale: 'A non-response is not a market read. It is evidence that the invitation was wrong, and it leaves the question unanswered: were there three real competitors, and if so why is the market now single-sourced?' },
        { text: 'The category manager has managed the supplier well for six years.', isCorrect: false, rationale: 'Relationship history is comfort, not control. It is also exactly how a concentration risk becomes invisible to the people with the authority to fund an alternative.' }
      ],
      principle: 'A non-competitive award stands on evidence and mechanism: market read, indexed pricing, bounded term, funded exit and correct approval.'
    },
    {
      type: 'scenario',
      context: 'A category is supplied by many small regional firms with a low concentration index. Prices are nonetheless rising together with a three-month lag across the region.',
      q: 'What is the most likely explanation?',
      options: [
        { text: 'The index is wrong or the scope is too wide.', isCorrect: false, rationale: 'Worth checking, but low concentration plus correlated lagged pricing is a recognised pattern rather than an anomaly. Discarding the data avoids the real question.' },
        { text: 'A common upstream input, or coordinated behaviour, is transmitting cost across a fragmented market; test both before acting.', isCorrect: true, rationale: 'Correct. Fragmented markets can still price in parallel because they share an input, a logistics constraint, or a list-price source. The distinction matters enormously: an upstream cost movement is handled with index analysis and specification change, while parallel behaviour without a cost cause is a competition-law matter to escalate to Legal rather than negotiate.' },
        { text: 'Small suppliers always follow the market leader on price.', isCorrect: false, rationale: 'Plausible, and it may even be true. But treating it as a law closes off the investigation, and the two possible causes lead to opposite actions.' },
        { text: 'Consolidate the category to gain leverage.', isCorrect: false, rationale: 'Consolidating into one regional firm removes the fragmentation that gave you the option in the first place, and it solves a pricing question by creating a dependency.' }
      ],
      principle: 'Correlated pricing in a fragmented market has either a common cost cause or a coordination problem. Establish which before choosing between an index argument and a Legal referral.'
    }
  ],
  relSop: 'sop-rfp',
  rel: {
    concepts: ['supplier-market-analysis', 'concentration-risk', 'sourcing-strategy', 'competitive-tension', 'supply-chain-risk'],
    sops: ['sop-rfp', 'sop-supplier-evaluation'],
    checklists: ['cl-sourcing-strategy', 'cl-supplier-identification'],
    templates: ['tpl-rfi', 'tpl-business-case'],
    calcs: ['calc-supplier-concentration', 'calc-make-vs-buy'],
    decisions: ['competitive-or-single', 'sourcing-method', 'dual-source', 'supplier-concentration'],
    kpis: ['kpi-supplier-concentration', 'kpi-sourcing-coverage']
  },
  labMission: {
    title: 'Mission 12.2: Read the Market Before Choosing the Method',
    desc: 'Use the supplier concentration tool to measure a category, then decide whether a competitive event is honest or ceremonial.',
    tasks: [
      'Open the Supplier Concentration Calculator and enter the category shares, marking which suppliers are economically independent.',
      'State the number of genuine competitors and what that implies for achievable price tension.',
      'Choose a method, write the reason in one paragraph, and name the structural option you would fund over the next twelve months.'
    ],
    ctaLabel: 'Open Supplier Concentration',
    ctaHref: '#/calc/calc-supplier-concentration',
    secondaryLabel: 'Open Sourcing Method Guide',
    secondaryHref: '#/dec/sourcing-method'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-demand-management',
  title: 'Demand Management & Specification Leverage',
  module: 'Module 12: Advanced Category & Portfolio Strategy',
  kicker: 'Function 12.3',
  tier: 'executive',
  tagline: 'The largest procurement lever is the decision to buy less, buy it once, or buy a different thing entirely.',
  desc: 'Price negotiation acts on the last 10 percent of the chain. Demand management acts on the specification, the volume and the design, where five to thirty percent of a category can be removed without a supplier conversation.',
  duration: '24 mins',
  lifecycleStage: 'Requirement definition and specification',
  lifecycleDesc: 'Sits upstream of every sourcing activity: the requirement is where cost is committed, and by the time a quotation exists, most of it is already decided.',

  what: 'Demand management is the discipline of questioning the requirement before optimising its price. It operates on four layers: whether the need exists at all, whether the specification is over-scoped for its function, whether the volume is right-sized, and whether the same demand can be met by an asset already held or an existing agreement. In most categories the cost is committed at specification, not at purchase order, so the buying organisation is negotiating an amount its internal customers already fixed. This is the function that turns procurement from a price function into a value function, and it is also the one procurement most often loses, because the requester owns the requirement and the saving lands in someone else budget.',
  why: [
    'The theoretical ceiling on price negotiation in a mature category is a few percent. Specification and scope decisions routinely move 10 to 30 percent, and they are made by the business before procurement is involved.',
    'Over-specification is invisible in a purchase order and obvious in a should-cost model: a tolerance nobody measures, a grade designed for a duty the part never sees, a service frequency nobody scheduled.',
    'Demand reduction is the only lever that improves cost, carbon and working capital at once. Buying less of a thing is the one argument no supplier, no auditor and no sustainability report can dispute.'
  ],
  when: [
    'When a category price is rising while volumes are flat, which usually means the specification drifted rather than the market moved.',
    'For high-value repeat demand where a small scope decision is multiplied by volume: packaging, energy, consumables, facilities service frequencies, IT endpoints.',
    'In capital projects and new product introduction, where design choices commit most of the lifetime cost before procurement is asked to compete anything.'
  ],
  raci: [
    { role: 'Business function / requester', resp: 'Accountable for the requirement itself, and for the consumption outcome when a demand action is agreed.' },
    { role: 'Category Manager', resp: 'Responsible for testing specification and volume against function and for bringing the cost of each scope choice into the conversation.' },
    { role: 'Engineering / Technical owner', resp: 'Responsible for confirming that a proposed reduction preserves the function, and for owning the revised specification.' },
    { role: 'Finance', resp: 'Consulted on how demand-based benefit is recognised, since it is not a price variance and must not be claimed as one.' }
  ],
  inputs: [
    'Usage and consumption data per site, department or product, not just purchase value.',
    'The written specification with each requirement traced to a functional need, a regulation, or nothing.',
    'A should-cost or cost-model view showing which specification choices carry the money.',
    'An inventory of what the organisation already holds or already has contracted, including idle capacity and unused entitlements.'
  ],
  outputs: [
    'A demand plan naming the levers in order: eliminate, reduce, standardise, reuse, then price.',
    'Specification changes agreed and owned by the technical function, with the functional justification recorded.',
    'A benefit statement that Finance can place in the accounts, split between avoided demand, avoided scope and avoided volume, separate from any price effect.'
  ],
  controls: [
    'Requirements above a stated value pass a documented need and scope test before sourcing begins, with the technical owner signing the specification.',
    'A specification relaxation requires a written functional justification; a tightening requires the same, so drift in either direction is visible.',
    'Demand benefits are recognised on consumption measured after the change, never on the price of units avoided.'
  ],
  mistakes: [
    'Running a negotiation on a category where the specification was the problem, taking the price credit and leaving the structural cost untouched for another year.',
    'Imposing reductions on a business function without owning the functional risk, which produces a reversal, a re-tightening and a loss of standing for every future argument.',
    'Claiming demand reduction as savings at the negotiated price, which over-reports the benefit and fails the first time Finance reconciles the ledger.'
  ],
  bestPractices: [
    'Bring a cost-of-requirement view to the specification conversation: show what each grade, tolerance, frequency or delivery window costs, and let the business choose the trade.',
    'Work through the hierarchy in order, because the cheapest unit is the one never bought.',
    'Put the consumption metric with the people who generate it and let them own the reduction. Procurement-owned demand targets are almost always met by a smaller purchase of the same wrong thing.'
  ],
  terms: [
    { term: 'Demand management', def: 'Questioning and shaping the requirement before optimising its price, operating on need, scope, volume and reuse.' },
    { term: 'Over-specification', def: 'A requirement that exceeds its function: tolerances never measured, grades beyond duty, frequencies nobody scheduled, warranties nobody claims.' },
    { term: 'Cost of a requirement', def: 'The price attached to a specific specification choice, made visible so the business can trade function against cost instead of accepting both at once.' }
  ],
  thinkingPoints: [
    {
      quote: 'Procurement does not control the requirement; it controls whether the requirement is ever questioned.',
      explanation: 'The buyer who accepts a specification as given is a processing function. The buyer who asks what the tolerance is for, and what it costs, becomes a commercial advisor, and that is where the money in most categories is. The ask is cheap. The refusal to accept an unexamined requirement is the discipline.',
      realWorldExample: 'A facilities team negotiated 8 percent on a janitorial contract. The category manager asked how the cleaning frequency had been set: it had been copied from a 2009 specification. Re-scoping frequency by area use, with the business owning the standard, removed 19 percent of the contract value and improved the areas people actually noticed.',
      reflectionPrompt: 'Name a specification you have recently priced without questioning. What is the function of the tightest requirement in it, and who could answer that question?'
    },
    {
      quote: 'A demand reduction reported as a price saving is a lie that gets caught in the accounts.',
      explanation: 'Different levers land in different places. Price effect shows as a lower unit cost against a prior baseline. Demand effect shows as lower consumption at an unchanged price. Mixing them double-counts and destroys the credibility of the reporting, which matters more than any single quarter number.',
      realWorldExample: 'A group reported USD 3.1 million saved on packaging. Reconciliation showed 40 percent of that was reduced volume from a product-line change that Finance had already booked as a cost reduction elsewhere. The corrected figure was reported openly, the credibility of the remaining programme survived, and the double count became a documented recognition rule.',
      reflectionPrompt: 'Could you separate, for your biggest claim this year, how much came from price, how much from consumption and how much from mix? If not, the number is not defensible.'
    }
  ],
  sopSteps: [
    {
      title: 'Separate the requirement from the purchase',
      role: 'Category Manager',
      desc: 'Take the category back to the business need it serves and state it without the current specification, so the existing solution is one option rather than the premise.',
      control: 'The need statement is agreed with the requester before any supplier or price discussion begins.',
      record: 'Need statement per category segment, dated, with the requester named as agreeing party.',
      pitfall: 'Starting from the current bill of materials, which guarantees the answer will be a cheaper version of the thing already being bought.'
    },
    {
      title: 'Trace every specification line to a function, a regulation, or nothing',
      role: 'Category Manager',
      desc: 'List each requirement with its reason: functional need, legal or safety obligation, or habit. Mark anything with no traceable cause as a candidate for change.',
      control: 'The technical owner confirms or corrects each reason, so the classification is theirs and not procurement opinion.',
      record: 'Requirement trace matrix showing each specification line, its stated reason, its owner, and whether it is unexplained.',
      pitfall: 'Reclassifying a safety-critical requirement as habit to reach a number, which is how a demand programme loses its licence to question anything.'
    },
    {
      title: 'Cost the requirement, not just the item',
      role: 'Category Manager',
      desc: 'Use a should-cost or modelled view to attach money to each specification choice so the business can see what a tolerance, grade, frequency or delivery window costs.',
      control: 'Model assumptions are written down and shared with the technical owner before the trade-off conversation.',
      record: 'Cost-of-requirement table showing the price impact of each option, with the model assumptions stated.',
      pitfall: 'Presenting a total price with no breakdown, which invites a negotiation instead of a decision and leaves every choice at its original setting.'
    },
    {
      title: 'Run the hierarchy in order',
      role: 'Business function',
      desc: 'Test in sequence: eliminate the need, reduce its scope, standardise variants, reuse what is already held or contracted, and only then optimise the price of what remains.',
      control: 'Each layer is answered explicitly, including where a layer was considered and rejected with a reason.',
      record: 'Demand option sheet listing the five layers with the decision and rationale at each.',
      pitfall: 'Skipping to standardisation because it is comfortable, while the larger prize was the need itself or the idle capacity already paid for elsewhere.'
    },
    {
      title: 'Hand the reduction to its owner',
      role: 'Technical / Budget owner',
      desc: 'Record the revised specification or consumption standard with the business function as owner, including the functional justification and the review date.',
      control: 'A change is not banked until the owning function has signed the revised requirement and its risk is accepted at the right level.',
      record: 'Revised specification with the owning function, the functional justification, and the review trigger.',
      pitfall: 'Procurement owning the reduction, which means nobody defends it when operations push back and it quietly reverts inside two quarters.'
    },
    {
      title: 'Measure consumption and report the effect honestly',
      role: 'Category Manager',
      desc: 'Re-measure usage after the change and report the benefit as a demand effect at unchanged price, separately from any price effect on the units still bought.',
      control: 'Finance validates the method before the number is published, and the split is stated in the report.',
      record: 'Benefit statement separating price, volume and mix effects, with the consumption evidence attached.',
      pitfall: 'Claiming a price saving on units no longer purchased, which over-reports and is found the first time the ledger is reconciled.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'A logistics category shows flat unit prices and 14 percent growth in spend over two years. Volume grew 4 percent. The rest is heavier packaging and a new delivery-window requirement added by one distribution centre.',
      q: 'What is the correct first action?',
      options: [
        { text: 'Open a price negotiation, since prices are flat and there is room.', isCorrect: false, rationale: 'Prices are already flat and the growth is not price-driven. A negotiation would spend credibility on a few percent while leaving a 10 percent structural increase untouched.' },
        { text: 'Examine the requirement: test the new delivery window and the packaging change against function, with the originating site owning the decision.', isCorrect: true, rationale: 'Correct. Spend grew because the requirement grew. The lever is the specification and the standard, and the site that introduced the change is the party that can justify or relax it. That is a demand conversation, not a supplier one.' },
        { text: 'Re-tender the category to reset the baseline.', isCorrect: false, rationale: 'A re-tender reproduces the current specification at the new heavier level and may lock it in for years. The market is not the variable here.' },
        { text: 'Set a spend cap for the category next year.', isCorrect: false, rationale: 'A cap without a root cause converts a scope question into a service dispute, and the growth simply reappears as an exception or as a stock-out.' }
      ],
      calcWork: 'Spend +14 percent, volume +4 percent, so roughly 10 percent of growth is carried by specification and scope rather than by price or demand quantity.',
      principle: 'When spend grows faster than volume, the requirement changed. Negotiating price against a moving specification treats the symptom.'
    },
    {
      type: 'scenario',
      context: 'You find that a fastener category is specified at a grade rated for marine exposure. The parts are used indoors on equipment that never sees salt, and the grade was copied from an original 1998 drawing.',
      q: 'What do you do?',
      options: [
        { text: 'Change the grade and report the saving.', isCorrect: false, rationale: 'The saving may be real, but procurement changing an engineering specification and claiming the result is how demand programmes get reversed and how the function loses standing with engineering.' },
        { text: 'Put the grade and its cost in front of the engineering owner, ask what exposure the part actually sees, and let them revise and sign the specification.', isCorrect: true, rationale: 'Correct. The cost of a requirement must be shown, and the functional decision must be owned by the people accountable for the equipment. A signed relaxation holds; a procurement-imposed one does not.' },
        { text: 'Tender the category to obtain the best price for the marine grade.', isCorrect: false, rationale: 'This is a legitimate action with a known cost. You would compete an unneeded specification, and every future buyer would inherit it as a requirement.' },
        { text: 'Relax it only if the supplier agrees to warrant the lower grade.', isCorrect: false, rationale: 'A warranty is not an engineering justification. The decision rests on exposure and function, and the answer needs to be in the drawing, not in a supplier concession.' }
      ],
      principle: 'Procurement costs the requirement; the business owns it. A reduction the owning function signs is durable; one it never agreed to is a reversal in waiting.'
    },
    {
      type: 'scenario',
      context: 'A facilities service contract cleans every area six times a week. A usage review shows four of the areas are used twice a week by three people.',
      q: 'What is the strongest way to make this change stick?',
      options: [
        { text: 'Instruct the supplier to reduce frequency and claim the saving.', isCorrect: false, rationale: 'The saving is booked by procurement and the consequence is felt by the building users. The first complaint reverses the change, and the report has to be withdrawn.' },
        { text: 'Have the facilities owner set cleaning frequency by area use against a stated standard, then change the contract scope with that standard attached.', isCorrect: true, rationale: 'Correct. The frequency decision belongs to the party accountable for the environment, and a scope change justified by a published standard survives scrutiny and re-tender. It also improves the areas people notice, which is what makes the reduction defensible rather than merely cheaper.' },
        { text: 'Benchmark against other sites and match the lowest frequency.', isCorrect: false, rationale: 'Benchmarks are useful provocation and poor justification. Copying another site cleaning routine ignores how this building is actually used and invites a reversal.' },
        { text: 'Reduce frequency by one day a week and review in six months.', isCorrect: false, rationale: 'Cautious, and it leaves four areas at a frequency still untied to use. Half-measures keep most of the cost and none of the standard.' }
      ],
      principle: 'Service levels must be derived from use and owned by the accountable function, or the reduction is temporary and the credibility cost is permanent.'
    },
    {
      type: 'scenario',
      context: 'An engineering team requests a new instrument. A portfolio review finds two identical units at another site used eleven times last year, both past calibration but serviceable.',
      q: 'Which lever should be pulled first?',
      options: [
        { text: 'Negotiate the new unit price, since capital requests are procurement job.', isCorrect: false, rationale: 'It assumes the purchase. The highest return here is on the asset already owned and idle.' },
        { text: 'Standardise on the installed base before considering the new purchase.', isCorrect: true, rationale: 'Correct. Reuse and standardisation sit above purchase in the hierarchy: two under-used assets exist, transfer and calibration are cheaper than a new unit, and standardising on the installed base reduces future variants as a side effect. The buy request is answered without a purchase.' },
        { text: 'Reject the request as unnecessary.', isCorrect: false, rationale: 'The conclusion may be right and the action wrong. Rejecting a request without offering the alternative spends the relationship and leaves the underlying need unmet.' },
        { text: 'Rental the instrument for the project duration.', isCorrect: false, rationale: 'Rental can be sensible for short, spiky need, but here the organisation already owns the asset. It adds cost to solve a problem the portfolio can already answer.' }
      ],
      principle: 'Before buying anything, check what is already paid for and idle. Reuse is the cheapest unit in the portfolio and the least examined.'
    },
    {
      type: 'scenario',
      context: 'You remove 18 percent of units from an energy category through a demand programme and want to report the benefit.',
      q: 'How should it be recognised?',
      options: [
        { text: 'At the current unit price times the units avoided, reported as a price saving.', isCorrect: false, rationale: 'The first half is right and the label is wrong. Calling a demand reduction a price saving double-counts once consumption is also reflected in the accounts, and it is the claim Finance finds first.' },
        { text: 'As a volume or demand effect at unchanged price, shown separately from any price effect on the units still bought, with the method agreed with Finance before publication.', isCorrect: true, rationale: 'Correct. Separating price, volume and mix keeps each claim traceable to a place in the accounts, and agreeing the method before publishing means the number survives the reconciliation instead of being withdrawn at the next review.' },
        { text: 'As cost avoidance, since the spend never occurred.', isCorrect: false, rationale: 'Cost avoidance is a legitimate category for a price rise never accepted. Demand reduction that changes the consumption baseline is usually a real cost reduction, and calling it avoidance understates it while making it untraceable.' },
        { text: 'Do not report it, since the budget owner took the benefit.', isCorrect: false, rationale: 'This loses the value of the work and the evidence for the next programme. The answer is attribution and method, not silence.' }
      ],
      principle: 'Report demand benefit as a demand effect, separately from price, with the method agreed before publication. Mixed claims get caught.'
    },
    {
      type: 'scenario',
      context: 'A new product design specifies a coated component. The coating adds 9 percent of unit cost and exists because an earlier version corroded in one coastal installation, which represents 3 percent of deployments.',
      q: 'What is the right commercial decision?',
      options: [
        { text: 'Remove the coating across the board and take the 9 percent.', isCorrect: false, rationale: 'This is the number the model produces and the risk the business did not accept. Removing protection for 97 percent of users to serve the 3 percent case the coating was designed for inverts the actual exposure.' },
        { text: 'Price the risk both ways: coating on everything versus a coastal variant, and let engineering and the asset owner choose the option with the lower total expected cost.', isCorrect: true, rationale: 'Correct. Two variants may cost more in complexity and inventory than the coating saves, or far less. Making the trade visible with a total-cost view is the demand-management answer, and the decision belongs to the party accountable for the field failure.' },
        { text: 'Negotiate the coating price down and keep one specification.', isCorrect: false, rationale: 'A reasonable fallback if the variant route fails on complexity cost, but it never asks whether the requirement should apply everywhere, which is where the 9 percent sits.' },
        { text: 'Ask suppliers to propose a cheaper coating.', isCorrect: false, rationale: 'Value engineering with suppliers can help, and it is a later step. First establish whether the requirement is universal or only for one deployment class.' }
      ],
      calcWork: 'Coating = 9 percent of unit cost, protecting 3 percent of installations. Whether a coastal variant beats coating everything depends on variant complexity cost, which must be estimated before the decision is made.',
      principle: 'A specification set for a rare condition applied to every unit is a demand decision disguised as a design one. Price both ways and let the risk owner choose.'
    }
  ],
  relSop: 'sop-procurement-intake',
  rel: {
    concepts: ['demand-management', 'specification', 'should-cost', 'total-cost-of-ownership', 'cost-avoidance', 'savings-types'],
    sops: ['sop-procurement-intake', 'sop-savings-calculation'],
    checklists: ['cl-requirement-definition', 'cl-savings-validation'],
    templates: ['tpl-business-case', 'tpl-cost-avoidance', 'tpl-savings-validation'],
    calcs: ['calc-should-cost', 'calc-tco', 'calc-savings-analysis'],
    decisions: ['make-or-buy', 'unit-or-tco'],
    kpis: ['kpi-cost-avoidance', 'kpi-savings', 'kpi-sum']
  },
  labMission: {
    title: 'Mission 12.3: Cost the Requirement Before Buying the Item',
    desc: 'Use the should-cost model to attach money to specification choices, then build the trade-off case for the owning function.',
    tasks: [
      'Open the Should-Cost Calculator and break one item into its cost drivers, isolating what the tightest specification element contributes.',
      'Write the requirement trace for that element: function, regulation, or unexplained.',
      'Draft the one-page trade-off for the engineering owner showing cost of the requirement against the functional exposure it buys.'
    ],
    ctaLabel: 'Open Should-Cost Calculator',
    ctaHref: '#/calc/calc-should-cost',
    secondaryLabel: 'Open TCO Calculator',
    secondaryHref: '#/calc/calc-tco'
  }
});
