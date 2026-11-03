/* ==========================================================
   Procure Sherpa v3.0 - Academy Module 30: Inventory and Stock
   Economics - How Much to Hold and Who Owns It. Carrying cost,
   EOQ, obsolescence and consignment appear in four earlier
   lessons, always as a term inside a freight, landed-cost or
   distress discussion and never as the decision itself. Two
   lessons and four concepts: the tranche is two lessons because
   the deployed margin was 14.5 KB. Written with no apostrophes,
   since these strings are single quoted and the build reads them
   literally.
   ========================================================== */

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-order-quantity-and-reorder-point',
  title: 'Order Quantity and Reorder Point: How Much to Buy, and When to Ask',
  module: 'Module 30: Inventory and Stock Economics - How Much to Hold and Who Owns It',
  kicker: 'Function 30.1',
  tier: 'practitioner',
  tagline: 'Nobody argues about how much stock to hold. They inherit a reorder quantity from the last person who thought about it, and the number survives every change in demand, lead time and cost since.',
  desc: "This function covers the two quantities that decide most inventory spend - how much to order at a time and how much buffer to hold against variation - with the arithmetic, the assumptions each model makes, the constraints that override the formula, and the way to tell whether the current numbers are still answering the current question.",
  duration: '21 mins',
  lifecycleStage: 'Stage 17: Purchase Order Issuance',
  lifecycleDesc: 'Owned where replenishment is decided, which is usually an operational habit and rarely a reviewed position.',

  what: "Two numbers decide most of the inventory on a site. One is how much to buy at a time; the other is when to place the order. Both were probably set years ago, and both are still working - silently - against demand, prices and lead times that have moved. Start with the order quantity, because its logic is a simple fight between two costs. Every order costs something to raise, place, receive, inspect, match and pay. Holding the resulting stock costs something for every unit for every period: the capital tied up, the space, the insurance, the handling, the shrinkage, and the risk that nobody wants it later. Order more and the transaction cost per unit falls while the holding cost rises; order less and the reverse. The quantity where the two stop fighting is the economic order quantity, and the formula is easy. The useful part is not the answer - it is the shape of the curve around it. Near the optimum the total cost is flat, so being 20 percent off the computed quantity costs almost nothing; away from it, the curve is steep, so a weekly order on a line that should be ordered quarterly is a real and recurring leak. That is why the practical finding in this area is rarely a clever calculation and usually a habit: a maintenance consumables review found 1,100 lines ordered weekly with an assumed 40 cost per order. Measured properly - goods-in time, inspection, three-way match, payment handling - the cost per order line was 96. Moving 300 low-value lines to a monthly quantity saved 31,000 a year in transaction cost and cut the goods-in queue by a third. Nothing about the supplier changed. So measure the order cost rather than assume it, and be honest that a rough measured figure beats a precise invented one. Then check the constraints before optimising, because the formula assumes steady demand, no quantity breaks, one item and unlimited space, and reality has none of those. The pack the supplier can ship, the pallet the transport unit requires, the shelf life, the storage space that actually exists, the minimum order quantity, and the lead time all bind the answer. Where a constraint binds, the constraint is the answer and the calculation is the explanation. The reorder point is the second number and the one people get wrong more often. It is the stock level that triggers an order, and it has to cover demand during the lead time plus a buffer for the two things that vary: how much you use, and how long the supply takes. Most buffers are set from average lead time, which is not protection - it is a mean with a label. The dispersion is what breaks you. A plant held six weeks of an imported seal because the average lead time was four weeks, and still had two stock-outs that year because two deliveries in the sample had taken eleven weeks. Re-based on the observed tail, and combined with a bonded stock position agreed with the supplier, held inventory fell by a third while the stock-outs stopped. That is the general result: the buffer is a service level with a price, so state the target per item class first - what probability of not running out is worth what cost - and let the arithmetic follow, rather than setting a stock level and reverse-engineering a promise afterwards. Two consequences worth carrying into the conversation. First, variability is usually cheaper to fix than to buffer: a supplier whose lead time swings between three and eleven weeks can often be pinned with a booked capacity slot, a shorter-lead backup, or a consignment position at your site - all of which beat holding six weeks of the same part. Second, the classification matters more than the calculation. A high service level on every line is the expensive way to be safe; the point of ABC or criticality work is to decide which lines deserve protection and which deserve cheap, fast replacement. Finally, this is a reviewable position, not a one-off study. Demand drifts, prices move, suppliers change lead times, and the optimum walks. Put the re-run on a calendar with the item classes, the measured order cost, the dispersion figures and the service targets on one page - and when someone proposes a volume discount or a forward buy, they will be arguing against a number that exists rather than a habit that does not.",
  why: [
    'Order quantity is a fight between transaction cost and holding cost, and the habit usually wins because neither is measured.',
    'The cost curve is flat near the optimum and steep at the extremes, so big habitual errors matter more than precise ones.',
    'Constraints - pack size, shelf life, space, minimum order quantity - override the formula and are often the real answer.',
    'The reorder point must cover lead-time dispersion, not the average; a buffer set on the mean is not protection.',
    'A service level is a decision with a price, so state the target first and let the calculation follow.',
    'Fixing variability at source is usually cheaper than buffering against it, and the item class decides which is worth it.'
  ],
  when: [
    'Reviewing a catalogue where every line is replenished on the same cadence.',
    'Before accepting or refusing a quantity price break.',
    'When stock has grown without demand changing.',
    'When a supplier quotes a longer lead time and the buffer has not moved.',
    'At the periodic review of service targets for critical spares.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Owns the order-cost measurement, the item classes and the service targets.' },
    { role: 'Demand or Planning', resp: 'Provides usage and dispersion figures, and flags where the forecast is a hope.' },
    { role: 'Operations or Goods-In', resp: 'Measures the real cost per order line and the effort the cadence creates.' },
    { role: 'Supplier', resp: 'States lead-time dispersion honestly and offers capacity or stock positions that reduce it.' },
    { role: 'Finance', resp: 'Sets the capital charge and the write-down policy that make holding cost real.' }
  ],
  inputs: [
    'Usage history per item with the variability, not only the average.',
    'Measured cost per order line, including receipt, inspection, matching and payment.',
    'Lead time distribution per supplier, with the tail observed.',
    'Constraints: minimum order quantity, pack and pallet size, shelf life, storage capacity, engineering change dates.'
  ],
  outputs: [
    'An order quantity and reorder point per item class, with the binding constraint named.',
    'A stated service target per class and the holding cost it implies.',
    'A list of variability fixes cheaper than the buffer they would replace.',
    'A dated review cycle with the inputs that move the numbers.'
  ],
  controls: [
    'Order cost is measured at least annually, including the internal handling it creates.',
    'Service targets are set per item class and approved, not inherited per line.',
    'Buffers are calculated from observed lead-time dispersion, with the tail stated.',
    'Any quantity break or forward buy is tested against shelf life and the change roadmap before it is claimed as a saving.',
    'Reorder parameters are re-run on a calendar, and the review date is recorded per class.'
  ],
  bestPractices: [
    'Report the flat region of the cost curve, not just the optimum - it is where the argument actually is.',
    'Ask the supplier for their worst recent lead time, not their quoted one.',
    'Classify first: the calculation only matters on the lines worth protecting.',
    'Put the measured order cost on one page; it changes behaviour in finance, not just in procurement.'
  ],
  mistakes: [
    'Optimising quantity while ignoring the pack size the supplier can ship.',
    'Setting a buffer from the average lead time and calling it risk management.',
    'Treating a longer quoted lead time as a supplier failing rather than as information about the tail.',
    'Running the calculation once and never re-running it as demand and prices move.'
  ],
  terms: [
    { term: 'Economic order quantity', def: 'The order size where the cost of ordering and the cost of holding stop fighting each other.' },
    { term: 'Reorder point', def: 'The stock level that triggers a new order, covering demand during lead time plus a buffer for variability.' },
    { term: 'Service level', def: 'The stated probability of not running out, which sets how large the buffer has to be.' },
    { term: 'Lead-time dispersion', def: 'The spread of actual delivery times around the average, whose tail is what the buffer must cover.' }
  ],

  thinkingPoints: [
    {
      quote: 'One thousand lines ordered weekly because someone once did.',
      explanation: 'A maintenance consumables catalogue had 1,100 lines on a weekly replenishment cycle. The assumed cost per order was 40; measuring goods-in, inspection, matching and payment put it at 96. Moving 300 low-value lines to a monthly quantity saved 31,000 a year in transaction cost and cut goods-in queue time by a third, with no supplier change and no price renegotiation.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: the leak is in the cadence, and the cadence is invisible because nobody measures the cost of placing an order.',
      reflectionPrompt: 'What does one order line actually cost you to process end to end, and how many lines are on a cycle shorter than their usage justifies?',
    },
    {
      quote: 'Six weeks of stock and two stock-outs.',
      explanation: 'A plant held six weeks of an imported seal because the average lead time was four weeks. Two deliveries in the preceding year had taken eleven weeks, and those were the stock-outs. Re-basing the buffer on the observed tail and agreeing a bonded position with the supplier cut held inventory by a third and removed the stock-outs, because the buffer was finally sized against the risk rather than against the mean.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: an average is not a distribution, and stock set against an average buys the illusion of protection.',
      reflectionPrompt: 'For your most critical imported item, what is the worst lead time you have actually experienced, and what buffer would that imply?',
    }
  ],

  sopSteps: [
    { title: 'Measure the cost of one order line', role: 'Operations or Goods-In',
      desc: 'Time and cost the full path a line creates: raising, placing, following up, receiving, inspecting, matching and paying. Use a measured figure with its basis, not a finance assumption.',
      control: 'The cost per order line is measured at least annually with its components shown, and it is the same figure used in every quantity decision.',
      record: 'Order cost note with components, sample size, date and the reviewer.',
      pitfall: 'Using a generic administrative rate that excludes goods-in effort, which is where the volume actually lands.'
    },
    { title: 'Classify items before calculating anything', role: 'Category Manager',
      desc: 'Group by criticality and value: what stops the operation if it runs out, how often it is used, how long replacement takes. The service target is a class decision, and the calculation only matters on protected lines.',
      control: 'Every stocked item carries a class with a service target, and the class list is approved rather than derived silently.',
      record: 'Item class register with service targets and the approval date.',
      pitfall: 'Optimising 1,000 cheap lines while the three that stop production have no stated target at all.'
    },
    { title: 'Compute the quantity and read the curve, not the point', role: 'Category Manager',
      desc: 'Calculate the economic order quantity from measured order and holding costs, then report the flat region around it. Where a constraint binds - pack size, pallet, shelf life, space, minimum order quantity - state the constraint as the answer.',
      control: 'Each protected line shows its computed quantity, its binding constraint and the cost of the constraint being wrong.',
      record: 'Quantity sheet per class with computation, constraint and the cost of deviation.',
      pitfall: 'Defending a calculated quantity that the supplier cannot physically ship, and calling the supplier unreasonable.'
    },
    { title: 'Size the buffer on dispersion', role: 'Demand or Planning',
      desc: 'Use the observed lead-time distribution and usage variability, not the averages, and state which percentile the service target implies. Ask the supplier for their worst recent delivery, because the quoted figure is a promise and the tail is the risk.',
      control: 'Buffers are recalculated when the dispersion changes, and the tail used is recorded with its source.',
      record: 'Buffer calculation with distribution, percentile, source and review date.',
      pitfall: 'Setting stock against a four-week average and being surprised by an eleven-week delivery.'
    },
    { title: 'Compare buffering against fixing the variability', role: 'Supplier',
      desc: 'For each protected line, price the buffer against at least one variability fix: a booked capacity slot, a consignment or bonded position, a shorter-lead backup source, or a specification that widens the eligible suppliers.',
      control: 'Where the buffer exceeds the cost of a fix, the fix is proposed and the buffer reduced only after it is in place.',
      record: 'Variability options sheet per line with the buffer cost, the fix cost and the decision.',
      pitfall: 'Carrying six weeks of stock forever because nobody asked why the lead time swings.'
    },
    { title: 'Test forward buys and price breaks against the real cost', role: 'Finance',
      desc: 'Evaluate a volume discount or a last-time buy against shelf life, the engineering change roadmap, storage capacity and the write-down policy - not only against annual usage and unit price.',
      control: 'No forward buy above a stated value is approved without a change-roadmap check and a named owner for the residual risk.',
      record: 'Forward-buy assessment with usage cover, change dates, write-down owner and approval.',
      pitfall: 'Booking the unit-price saving and letting the write-down land in someone else budget two quarters later.'
    },
    { title: 'Re-run on a calendar', role: 'Category Manager',
      desc: 'Put the parameters on one page per class - order cost, usage and dispersion, service target, binding constraints - and re-run them on a stated interval, because the optimum moves with demand, prices and lead times.',
      control: 'Each class has a review date, and lines whose review has lapsed are reported rather than left running.',
      record: 'Parameter sheet per class with the review date and the changes since the last run.',
      pitfall: 'Treating a one-off study as a permanent setting in a category where everything drifts.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A catalogue of 900 lines is replenished weekly. Finance quotes an order cost of 35; goods-in reports that a line takes eleven minutes to receive and check, and the site processes 2,400 lines a week.',
      q: 'What is the correct first move?',
      options: [
        { text: 'Reduce the line count by deleting slow movers.', isCorrect: false, rationale: 'Reasonable eventually, but it is not what the arithmetic says first.' },
        { text: 'Measure the true cost per order line end to end, then compute the quantity where holding cost and transaction cost cross, and report the flat region so the decision is about the extremes rather than decimals.', isCorrect: true, rationale: 'Correct. The visible cost is the weekly cadence, and it can only be argued with a measured order cost rather than an assumed one.' },
        { text: 'Ask suppliers for a discount for larger orders.', isCorrect: false, rationale: 'That presumes the quantity should rise, which the measurement decides.' },
        { text: 'Move every line to monthly ordering.', isCorrect: false, rationale: 'A blanket change ignores shelf life, usage variability and the lines that genuinely need weekly cover.' }
      ],
      calcWork: 'Eleven minutes at 2,400 lines a week is roughly 440 hours of goods-in effort per week - the transaction cost is a staffing decision disguised as a purchasing habit.',
      principle: 'Measure the cost of ordering before arguing about the cost of goods.',
    },
    {
      type: 'scenario',
      context: 'A critical bearing has an average lead time of five weeks and a worst observed lead time of thirteen. Current stock covers six weeks of usage, and the item has stocked out twice in a year.',
      q: 'What does the evidence support?',
      options: [
        { text: 'Increase the buffer to nine weeks, since six has clearly failed.', isCorrect: false, rationale: 'That is a guess at the percentile and it may cost more than the fix.' },
        { text: 'State the service target the business will accept, size the buffer on the observed distribution rather than the mean, and price at least one variability fix - booked capacity, bonded position, a second approved source - against the holding cost.', isCorrect: true, rationale: 'Correct. The buffer is a service level with a price, and dispersion plus a fix comparison is what makes the number defensible.' },
        { text: 'Hold the supplier to the five-week average contractually.', isCorrect: false, rationale: 'The average was never the risk; the tail is.' },
        { text: 'Accept the stock-outs as the cost of working capital discipline.', isCorrect: false, rationale: 'That may be the decision, but it should be a stated target rather than an accident.' }
      ],
      principle: 'A buffer sized on the mean is a mean with a label; size it on the tail and compare it to fixing the tail.',
    },
    {
      type: 'knowledge',
      q: 'Why is the flat region of the order-cost curve more useful than the optimum?',
      options: [
        { text: 'Because the optimum cannot be calculated accurately.', isCorrect: false, rationale: 'It can be calculated; it just is not where the decision lives.' },
        { text: 'Because small deviations near the optimum cost almost nothing while habitual deviations far from it cost a great deal, so the flat region shows which lines are worth changing and which are noise.', isCorrect: true, rationale: 'Correct. It turns the argument into the size of the error rather than the precision of the formula.' },
        { text: 'Because suppliers prefer round numbers.', isCorrect: false, rationale: 'Irrelevant to the shape.' },
        { text: 'Because holding cost is fixed.', isCorrect: false, rationale: 'It is the variable term by definition.' }
      ],
      principle: 'Report the region where being wrong is cheap, and the outliers where it is not.',
    },
    {
      type: 'knowledge',
      q: 'Which constraint most often overrides a computed order quantity?',
      options: [
        { text: 'The storage capacity, which is rarely measured.', isCorrect: false, rationale: 'It binds sometimes; it is not the common case.' },
        { text: 'The shipping unit the supplier can actually send - pack, case or pallet - which sets a floor the calculation cannot go below.', isCorrect: true, rationale: 'Correct. Where it binds, the unit is the answer and the calculation becomes the explanation for why the extra stock is acceptable.' },
        { text: 'The finance year end.', isCorrect: false, rationale: 'That affects timing, not quantity.' },
        { text: 'The approval threshold on the purchase order.', isCorrect: false, rationale: 'That affects routing, not the optimum.' }
      ],
      principle: 'Name the binding constraint; a formula that ignores physics is a report, not a decision.',
    },
    {
      type: 'scenario',
      context: 'A supplier offers 22 percent off a controller board on a 18-month forward buy. Engineering has a design change scheduled that supersedes that board, and the change is in the roadmap but was not mentioned in the buying paper.',
      q: 'What is the correct handling?',
      options: [
        { text: 'Take it; 22 percent on 18 months of usage is a large, immediate saving.', isCorrect: false, rationale: 'The saving is real only if the boards are consumed, which the roadmap says they will not be.' },
        { text: 'Test the buy against the change date and the write-down policy, quantify the exposure if the change lands as scheduled, and require a named owner for the residual risk before approving - or decline and record why.', isCorrect: true, rationale: 'Correct. A forward buy is a bet on the forecast and the design; both belong in the paper that claims the saving.' },
        { text: 'Ask for 15 percent on a six-month buy instead.', isCorrect: false, rationale: 'A smaller bet is still an unpriced one.' },
        { text: 'Take it and resell the surplus.', isCorrect: false, rationale: 'That is a hope, not a control.' }
      ],
      principle: 'A volume saving is only a saving after shelf life and the change roadmap have been read.',
    }
  ],
  relSop: 'sop-procurement-lifecycle',
  rel: {
    concepts: ['order-quantity-economics', 'safety-stock-and-service-level', 'obsolescence-and-carrying-risk', 'demand-management', 'working-capital', 'price-vs-cost'],
    sops: ['sop-procurement-lifecycle', 'sop-savings-calculation', 'sop-supplier-price-increase-review'],
    checklists: ['cl-requirement-definition', 'cl-savings-validation', 'cl-supplier-risk-review'],
    templates: ['tpl-cost-avoidance', 'tpl-business-case', 'tpl-savings-calculation'],
    calcs: ['calc-moq', 'calc-landed-cost', 'calc-tco', 'calc-should-cost'],
    decisions: ['unit-or-tco', 'consolidate-suppliers', 'accept-price-increase'],
    kpis: ['kpi-working-capital-impact', 'kpi-cycle-time', 'kpi-otif'],
    glossary: ['gloss-eoq', 'gloss-moq', 'gloss-run-rate']
  },
  labMission: {
    title: 'Mission 30.1: Measure What an Order Costs You',
    desc: 'Find the two numbers that decide most of your stock, and check whether anyone has ever measured them.',
    tasks: [
      'Time one order line end to end - raising, placing, follow-up, receipt, inspection, matching, payment - and turn it into a cost per line.',
      'For your three most critical stocked items, write the average and the worst observed lead time, then the buffer each implies at a service level you state out loud.',
      'Find one forward buy or price break on the table and test it against shelf life and the engineering change roadmap before it is claimed as a saving.'
    ],
    ctaLabel: 'Open Minimum Order Quantity',
    ctaHref: '#/calc/calc-moq',
    secondaryLabel: 'Open Landed Cost',
    secondaryHref: '#/calc/calc-landed-cost'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-who-owns-the-stock',
  title: 'Who Owns the Stock, and Who Carries the Loss',
  module: 'Module 30: Inventory and Stock Economics - How Much to Hold and Who Owns It',
  kicker: 'Function 30.2',
  tier: 'executive',
  tagline: 'The working-capital conversation is usually about how much stock you hold. The better question is how much of it is yours - and what happens to the part that is not when someone else fails.',
  desc: "This function covers the governance of stock ownership: the difference between holding stock and owning it, what consignment, supplier-managed inventory and bonded positions really trade, the retention-of-title limits that surface in an insolvency, and the reporting that makes a write-down exposure visible before it lands.",
  duration: '19 mins',
  lifecycleStage: 'Category strategy and supplier management',
  lifecycleDesc: 'Held at category and board level, because the trade is between cash, control and counterparty risk rather than between prices.',

  what: "A warehouse can hold three kinds of stock: yours, somebody elses, and a quantity that is legally yours but economically someone elses decision. Most organisations can only count the first, which is why the working-capital conversation in this area is usually the wrong conversation. Start with what each arrangement actually trades. Consignment moves the ownership date to consumption: the supplier finances the stock, you pay as you use it, and the balance sheet improves without availability falling. The price is rarely zero - the supplier carries a float and will charge for it, usually in unit price, sometimes in a minimum usage commitment that turns into a volume obligation. Supplier-managed inventory goes further: the supplier decides when to replenish against agreed levels, which usually improves availability and service and quietly transfers your control over the reorder decision to someone whose optimisation is theirs, not yours. Bonded stock defers duty and therefore cash, and constrains release speed, because the goods cannot simply be moved until the customs position is settled. Pipeline or in-transit stock is the one most often double-counted: whether it is yours depends on the Incoterm, and the same pallet can appear on two balance sheets if nobody checked who held the risk at the moment of loss. Then the question that only appears when it is expensive: what happens in a supplier insolvency. Retention of title is the standard answer and it is narrower than it sounds. It generally protects identifiable goods in their original state - unopened packs, marked and segregated. It does not comfortably protect stock that has been opened, commingled, consumed into a kit, or transformed. A manufacturer running consignment consumables across three sites found that 40 percent of what was on site fell into those categories when the supplier went into administration, and the liquidator treated it as an asset available to sell. The operation kept running; the settlement cost more than the two years of consignment discount that had been earned. The board-level point is that this is a counterparty risk in disguise. Consignment and supplier-held stock concentrate your exposure on the financial health of the party that owns the goods, and the exposure is invisible in normal reporting because it sits in your warehouse as a line you do not pay for until use. So the position needs three things. First, a register: what stock on your sites is not yours, who owns it, on what terms title passes, and what your own records would show a liquidator. Records matter more than intentions here - an accurate consignment ledger, countersigned by the supplier, is the difference between a claim and a loss. Second, the insurance and access questions answered in the contract rather than assumed: who insures goods they do not own but hold, what happens on termination, and what right of entry exists to identify or recover stock. Third, an agreed answer to the concentration question: is the consignment supplier also the only source, and if so, does the arrangement improve resilience or merely improve working capital while making the failure larger? Finally, the write-down discipline, which is where the executive conversation usually starts. Forward buys, seasonal stock and last-time-buys create exposure that is real but diffuse: it lands as an obsolescence provision two or three quarters later, in a different budget line than the saving was claimed in, and nobody connects the two. The fix is procedural and cheap. Require any buy ahead of forecast to name an owner for the residual risk, an expiry review date, and the change or demand assumption it rests on; report ageing and write-downs back into the category that created them; and put the total value of stock bought ahead of a forecast on the same paper as the savings claim, so the trade is visible at the moment of decision. A provision is an accounting answer to an operational question. Boards should be interested in the operational one: whether the organisation knows what it holds, who owns it, and what it would lose if the wrong person failed.",
  why: [
    'Holding stock and owning stock are different balance sheets, and the gap is where the surprise lives.',
    'Every ownership model trades control, cash and speed - consignment trades price for float, VMI trades control for availability, bonded trades release speed for cash.',
    'Retention of title protects identifiable goods; opened, commingled or transformed stock is usually lost to a liquidator.',
    'Consignment concentrates counterparty risk in a way normal reporting cannot see.',
    'Write-down exposure lands in a different budget than the saving was claimed in, which is why forward buys are systematically over-approved.',
    'Records decide claims: an accurate, countersigned stock ledger is the difference between recovering and writing off.'
  ],
  when: [
    'Setting up or renewing a consignment or supplier-managed arrangement.',
    'At the annual working-capital review of held stock.',
    'When a supplier with stock on your site shows financial distress.',
    'Before approving a forward buy, last-time-buy or seasonal build.',
    'When duty or tax timing makes a bonded position attractive.'
  ],

  raci: [
    { role: 'Board or Executive Sponsor', resp: 'Decides the working-capital position and accepts the counterparty risk it creates.' },
    { role: 'Head of Procurement', resp: 'Owns the ownership register, the terms negotiated and the concentration question.' },
    { role: 'Finance', resp: 'Sets the capital charge, the write-down policy and the reporting of stock bought ahead of forecast.' },
    { role: 'Legal', resp: 'Drafts title transfer, insurance, access, termination and recovery terms, and states the retention limits honestly.' },
    { role: 'Operations', resp: 'Keeps the records a third party would have to accept, and segregates and marks stock that is not owned.' }
  ],
  inputs: [
    'The stock position by ownership model, with value, sites and usage rates.',
    'Contract terms: title transfer point, insurance, access, termination, recovery and reporting duties.',
    'Counterparty standing for every supplier owning stock on your sites.',
    'The forward-buy register with the forecast, the change dates and the claimed saving.'
  ],
  outputs: [
    'An ownership register showing what is held, who owns it and what the records would prove.',
    'Contract terms with title, insurance, access and recovery addressed, and retention limits stated.',
    'A concentration view where consignment or supplier-held stock overlaps with single sourcing.',
    'A write-down report that connects each provision to the decision that created it.'
  ],
  controls: [
    'Stock not owned is recorded, marked and reconciled with the owner on a stated cycle.',
    'Title transfer, insurance, access and termination recovery are contractual and tested against a scenario.',
    'Any forward buy above a threshold names an owner, an expiry review date and the assumption it rests on.',
    'Write-downs are reported back into the category that created them, alongside the saving claimed.',
    'The concentration question is answered where supplier-owned stock sits with a sole source.'
  ],
  bestPractices: [
    'Ask what a liquidator would see in your records, not what the contract says you intended.',
    'Price the consignment discount against the float cost and the concentration it adds.',
    'Put the value of stock bought ahead of forecast on the same page as the savings claim.',
    'Review the ownership register when a supplier shows distress, not when it fails.'
  ],
  mistakes: [
    'Assuming retention of title covers opened or commingled stock.',
    'Leaving the insurance obligation for supplier-owned goods unstated.',
    'Treating a bonded position purely as a cash lever without checking release speed.',
    'Counting in-transit stock on your side of the ledger because the goods are on your order.'
  ],
  terms: [
    { term: 'Consignment', def: 'Stock held at your site and owned by the supplier until it is used or drawn down.' },
    { term: 'Supplier-managed inventory', def: 'An arrangement where the supplier decides replenishment against agreed minimum and maximum levels.' },
    { term: 'Retention of title', def: 'A clause keeping ownership with the supplier until paid, which protects identifiable goods and little else.' },
    { term: 'Write-down', def: 'The accounting recognition that held stock is worth less than its cost, usually because it is no longer wanted.' }
  ],

  thinkingPoints: [
    {
      quote: 'Forty percent of the stock was not recoverable.',
      explanation: 'A manufacturer ran consignment consumables across three sites, reconciled monthly, and held a retention-of-title clause. When the supplier entered administration, 40 percent of the stock on site had been opened, commingled into kits or consumed into work in progress, and the liquidator treated it as an asset available for sale. Operations continued; the settlement cost more than two years of the consignment discount that had made the arrangement attractive.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: title clauses protect identifiable goods, and the identifiability is a records and physical-segregation question, not a drafting one.',
      reflectionPrompt: 'If the supplier owning stock on your site failed this month, what would your records prove - and how much of that stock is opened or mixed?',
    },
    {
      quote: 'The saving and the provision never met.',
      explanation: 'A category claimed a 22 percent saving on a last-time-buy and booked it in the current year. The design change superseded the item in month seven; the write-down landed eighteen months later in an operations budget, in a different reporting line, and the two numbers were never presented together. The next forward buy was approved with the same arithmetic.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: when the saving and the write-down are reported apart, the organisation learns nothing and repeats the trade.',
      reflectionPrompt: 'Where does an obsolescence write-down land in your reporting, and does it ever appear next to the decision that caused it?',
    }
  ],

  sopSteps: [
    { title: 'Register stock by owner, not by location', role: 'Head of Procurement',
      desc: 'List what is held on your sites by ownership model, with value, usage rate, the owner, the title terms and the last reconciliation date. The register is the artefact a third party would read.',
      control: 'The register is maintained on a stated cycle and reconciled with each owner, with exceptions escalated.',
      record: 'Ownership register with values, terms, reconciliation dates and exceptions.',
      pitfall: 'A stock report that shows everything in the warehouse as one number, because location was mistaken for ownership.'
    },
    { title: 'State the title terms and their limits honestly', role: 'Legal',
      desc: 'Define when title and risk pass, what retention of title actually covers, and how opened, commingled or transformed goods are treated. Write the limits in the advice rather than leaving them to be discovered in a dispute.',
      control: 'Every supplier-owned stock arrangement has a written position on opened and commingled goods, and it is reviewed with the terms.',
      record: 'Title position note with the pass point, retention scope and the commingling treatment.',
      pitfall: 'Relying on a clause that protects unopened packs while 40 percent of the stock is in kits.'
    },
    { title: 'Answer insurance, access and recovery in the contract', role: 'Operations',
      desc: 'Set who insures goods they own but you hold, who may enter to identify or recover stock, what must be delivered on termination, and what records each side must keep to prove the position.',
      control: 'Insurance, access, termination recovery and record-keeping duties are explicit and tested against a scenario before signature.',
      record: 'Stock terms schedule with insurance, access, recovery and record obligations.',
      pitfall: 'Discovering on the day of an insolvency that nobody has a right of entry to identify their own goods.'
    },
    { title: 'Price the model against what it trades', role: 'Finance',
      desc: 'Compare the consignment discount with the float cost the supplier is charging, the VMI service gain with the control given up, and the bonded cash deferral with the release-speed constraint. State the trade rather than the saving.',
      control: 'Each ownership model is approved with its trade-off written down and reviewed at renewal.',
      record: 'Model trade-off note per arrangement with the price, the control given up and the decision.',
      pitfall: 'Adopting supplier-managed inventory for availability and then disputing the quantities the supplier chooses.'
    },
    { title: 'Check the concentration behind the cash improvement', role: 'Head of Procurement',
      desc: 'Where supplier-owned stock sits with a sole or dominant source, name it as counterparty risk and pair it with the readiness position - a second source, a buffer, or an ownership change - rather than leaving it invisible in a working-capital gain.',
      control: 'No consignment or supplier-held position with a sole source is approved without a named resilience mitigation.',
      record: 'Concentration note with the ownership position, the mitigation and the review date.',
      pitfall: 'Improving working capital and enlarging the failure at the same time, with only one of the two on the report.'
    },
    { title: 'Put the write-down next to the saving', role: 'Finance',
      desc: 'Report obsolescence and write-downs against the category and the decision that created them, alongside the saving originally claimed, so the net position is visible in one place.',
      control: 'Write-down reporting names the originating decision, and the net position is shown against the saving.',
      record: 'Write-down report with originating decision, category, net position and date.',
      pitfall: 'Two budgets and two reporting periods apart, so the organisation never connects the trade.'
    },
    { title: 'Review the position when a supplier wobbles', role: 'Board or Executive Sponsor',
      desc: 'Treat early-warning signals from a supplier owning stock on your sites as a stock action: reconcile the ledger, verify segregation and marking, confirm access rights, and decide whether to buy the stock out before the position degrades.',
      control: 'A distress signal on an owning supplier triggers a stock reconciliation and a documented buy-out or protection decision.',
      record: 'Distress stock action note with reconciliation, protection steps and the decision taken.',
      pitfall: 'Learning the ownership position from a liquidator rather than from your own review.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A proposal moves 400 consumable lines to consignment, improving working capital by 2.1 million. The supplier offering it is the sole approved source for 60 of those lines and has asked for a five-year commitment to usage levels.',
      q: 'What should the board decide on?',
      options: [
        { text: 'Accept; the working-capital gain is immediate and measurable.', isCorrect: false, rationale: 'It is measurable, and so is the risk that has just been enlarged - the second number is missing.' },
        { text: 'Weigh the cash gain against the counterparty concentration, price the float in the unit rate, and require a resilience mitigation for the sole-sourced lines before the commitment is signed.', isCorrect: true, rationale: 'Correct. Consignment converts a balance-sheet improvement into a larger single-failure exposure, and a usage commitment compounds it.' },
        { text: 'Accept with a shorter three-year term.', isCorrect: false, rationale: 'That reduces the duration without addressing the concentration or the float price.' },
        { text: 'Reject consignment entirely.', isCorrect: false, rationale: 'That may be right on some lines, but the decision is a trade-off, not a rule.' }
      ],
      principle: 'A working-capital improvement that concentrates counterparty risk is a trade, and both sides of it belong in the paper.',
    },
    {
      type: 'scenario',
      context: 'A supplier enters administration. Your contract has a retention-of-title clause and monthly reconciliations. On site, some of their stock is in sealed marked packs, some is opened, and some has been built into sub-assemblies.',
      q: 'What is the realistic position?',
      options: [
        { text: 'All of it is recoverable, because the clause and the records are clear.', isCorrect: false, rationale: 'That is the assumption this scenario exists to break.' },
        { text: 'The identifiable, segregated, reconciled stock is the strong claim; opened and commingled goods are usually weaker, and transformed sub-assemblies weakest - which is why marking, segregation and record quality were the real protections.', isCorrect: true, rationale: 'Correct. Retention of title is about identifiability, and identifiability is an operations discipline long before it is a legal one.' },
        { text: 'Nothing is recoverable without a court order.', isCorrect: false, rationale: 'That overstates the opposite error.' },
        { text: 'The reconciliations are irrelevant if the clause is well drafted.', isCorrect: false, rationale: 'Records are what make the clause usable.' }
      ],
      principle: 'What a liquidator can identify is what you own; the rest is a negotiation.',
    },
    {
      type: 'knowledge',
      q: 'What does a bonded stock position trade?',
      options: [
        { text: 'Cash timing against release speed and administrative burden.', isCorrect: true, rationale: 'Correct. Duty is deferred, so cash improves; the goods cannot be moved freely until the customs position is settled.' },
        { text: 'Unit price against order quantity.', isCorrect: false, rationale: 'That is the order-quantity trade.' },
        { text: 'Ownership against insurance.', isCorrect: false, rationale: 'That is the consignment trade.' },
        { text: 'Lead time against minimum order quantity.', isCorrect: false, rationale: 'Unrelated to the duty position.' }
      ],
      principle: 'Bonding is a cash decision with a customs constraint attached; both belong in the approval.'
    },
    {
      type: 'knowledge',
      q: 'Why do forward buys systematically look better than they are?',
      options: [
        { text: 'Because suppliers overstate the discount.', isCorrect: false, rationale: 'The discount is usually real; the cost is what moves.' },
        { text: 'Because the saving is booked now and the write-down lands later, in a different budget line, so the two numbers are never presented together and the organisation cannot learn from the pair.', isCorrect: true, rationale: 'Correct. Reporting separation is the mechanism; connecting the two is the control.' },
        { text: 'Because forecasts are always optimistic.', isCorrect: false, rationale: 'True but partial; optimism alone does not hide the write-down.' },
        { text: 'Because inventory accounting uses standard costs.', isCorrect: false, rationale: 'Not the reason.' }
      ],
      principle: 'Report the provision next to the decision, and the arithmetic becomes honest by itself.',
    },
    {
      type: 'scenario',
      context: 'Early-warning signals appear on a supplier that owns 3.4 million of consignment stock across four sites. The transition to an alternative would take five months.',
      q: 'What is the correct first action?',
      options: [
        { text: 'Wait for confirmation before doing anything, to avoid damaging the relationship.', isCorrect: false, rationale: 'The stock position degrades while waiting, and the records get worse, not better.' },
        { text: 'Reconcile the consignment ledger now, verify marking and segregation at each site, confirm the access and recovery rights, and decide whether to buy out or protect the stock - with the decision documented and dated.', isCorrect: true, rationale: 'Correct. Distress is a stock action as well as a supply action, and identifiability is the asset worth protecting early.' },
        { text: 'Stop drawing down their stock immediately.', isCorrect: false, rationale: 'That strands the operation while doing nothing for the ownership position.' },
        { text: 'Start the five-month transition at once.', isCorrect: false, rationale: 'Probably needed, but it is not the first action on the stock itself.' }
      ],
      principle: 'When an owning supplier wobbles, protect the records and the identifiability before you argue about the law.',
    }
  ],
  relSop: 'sop-contract-review',
  rel: {
    concepts: ['stock-ownership-models', 'obsolescence-and-carrying-risk', 'working-capital', 'insolvency-claims-ranking', 'customs-and-duty', 'concentration-risk'],
    sops: ['sop-contract-review', 'sop-freight-and-customs', 'sop-supplier-performance-management'],
    checklists: ['cl-contract-review', 'cl-supplier-risk-review', 'cl-procurement-file-completeness'],
    templates: ['tpl-contract-review-checklist', 'tpl-supplier-risk-assessment', 'tpl-business-case'],
    calcs: ['calc-payment-terms', 'calc-landed-cost', 'calc-multi-year-contract-cost'],
    decisions: ['negotiate-or-accept', 'supplier-concentration', 'dual-source'],
    kpis: ['kpi-working-capital-impact', 'kpi-contract-compliance', 'kpi-cost-avoidance'],
    glossary: ['gloss-working-capital', 'gloss-ddp', 'gloss-blanket-po']
  },
  labMission: {
    title: 'Mission 30.2: Count What Is Not Yours',
    desc: 'Find the stock on your sites that you do not own, and ask what your records would prove.',
    tasks: [
      'List the consignment, supplier-managed and bonded positions you hold, with value, owner and the date of the last reconciliation.',
      'For the largest, answer three questions in writing: when does title pass, who insures it, and what would a liquidator be able to identify?',
      'Find the last forward buy or last-time-buy, and locate the saving that was claimed and the write-down that followed - or state that no one tracks the second number.'
    ],
    ctaLabel: 'Open the Supplier Risk Review Checklist',
    ctaHref: '#/cl/cl-supplier-risk-review',
    secondaryLabel: 'Open the Supplier Risk Assessment template',
    secondaryHref: '#/tpl/tpl-supplier-risk-assessment'
  }
});
