/* ==========================================================
   Procure Sherpa v3.0 - Academy Content Part 14
   Module 19: The Finance of Procurement - Cash, Terms and Value.
   The library holds the concepts (payment terms, working
   capital, currency exposure) and the tools (payment terms, FX,
   multi-year cost), but no module taught the partnership itself:
   how procurement money is classified, what a term change is
   actually worth, and where the buyer and the finance function
   routinely talk past each other.
   No apostrophes inside content strings - three builds have
   failed on one.
   ========================================================== */
PS.ACADEMY_FUNCTIONS = PS.ACADEMY_FUNCTIONS || [];

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-payment-terms-value',
  title: 'Payment Terms as a Financial Instrument',
  module: 'Module 19: The Finance of Procurement - Cash, Terms and Value',
  kicker: 'Function 19.1',
  tier: 'practitioner',
  tagline: 'Net 30 is a price. Converting a term change into cash, and cash into a comparable number, is the work almost nobody does.',
  desc: 'Payment terms are the most negotiated and least valued clause in procurement. This function covers what a day of terms is worth in cash and in cost of capital, how to compare a discount for early payment against the value of holding the money, the difference between improving your own position and damaging your supplier\'s, and the reporting trap where a term extension is booked as a saving.',
  duration: '21 mins',
  lifecycleStage: 'Stage 14: Commercial Terms Optimization',
  lifecycleDesc: 'Decided during commercial terms and re-tested at every renewal, because the value of a term moves with the interest rate environment rather than with the contract.',

  what: "A payment term is a financing decision dressed as an administrative one. Net 60 instead of Net 30 on a category with a defined annual spend releases a one-off cash movement and changes the average balance held, and both have a price. The arithmetic is not complicated and is almost never done: the cash released equals spend multiplied by the days gained divided by 365, and the value of that cash equals the balance multiplied by the organisation cost of capital for the period held. On a large indirect category, three extra days can release more cash than the annual price saving, and it releases it once - which is exactly why it must never be reported as a recurring saving. The permanent effect on cost is different: paying later is a form of borrowing, and if the implicit rate on supplier credit is above the borrowing rate, extending terms is a real cost reduction rather than a cash timing trick. That comparison is the whole analysis, and it requires finance to state a cost of capital rather than leaving procurement to guess. Early payment discounts are the mirror image. A one percent for ten days discount on a net 30 invoice is an annualised return of roughly thirty-six percent on the money accelerated, which is almost always worth taking when cash is not constrained - and almost never worth taking when the supplier is the one financing you cheaply. The correct decision is a comparison against the cost of short-term funds, made once and encoded as a policy, not re-argued invoice by invoice. The second-order effect is the one procurement usually misses: terms are a transfer of financing capacity. Stretching a small supplier from 30 to 90 days does not reduce cost, it moves the working capital burden to the party least able to carry it, and the supplier pays for it either in price, in quality of attention, in the willingness to quote at all, or in failure. A supply base of stretched small vendors is a resilience liability bought with a cash gain, and the two need to be weighed together rather than in different departments. That is why payment behaviour is a procurement metric: days payable outstanding per supplier, invoice dispute rate, and the share of suppliers paid outside their own agreed terms are leading indicators of both cost and risk. Finally, the reporting trap. Term extensions booked as savings are the most common way a procurement total becomes indefensible in front of a CFO, because the finance reader knows exactly what the number is. The honest classification is: a price reduction is a saving, a term extension is a cash action with a one-off balance-sheet effect and a permanent financing-cost effect that can be annualised, and an early payment discount taken is a cost reduction against the invoice. Three lines, three treatments, stated in the report rather than discovered in the reconciliation.",
  why: [
    'A term change has a cash effect and a cost effect, and they are different numbers with different durations. Reporting one as the other is how a savings total stops surviving scrutiny.',
    'Early payment discount arithmetic is a rate comparison, not a judgement call, and once the cost of funds is known the decision can be encoded as policy rather than re-argued per invoice.',
    'Terms transfer financing capacity. Stretching a supplier who cannot carry the balance converts a cash gain into a price increase, a service decline, or a failure - all of which arrive later and cost more.',
    'Payment behaviour is measurable and predictive: days payable against agreed terms, dispute rate and payment lag are leading indicators of both category cost and supply risk.',
    'The value of a term moves with the interest rate environment, so a term agreed in a cheap-money cycle should be re-tested rather than inherited at renewal.'
  ],
  when: [
    'During commercial terms negotiation, alongside price rather than after it.',
    'At renewal, when the rate environment has moved since the terms were set.',
    'When a category is large enough that a few days of terms materially changes the balance sheet.',
    'Whenever a term change is proposed as a saving, which is the moment to classify it correctly.',
    'When a supplier signals distress, because payment behaviour is often the cause rather than the symptom.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Values the term options, negotiates them alongside price, and classifies the outcome correctly in the report.' },
    { role: 'Finance Business Partner', resp: 'Supplies the cost of capital, agrees the classification, and books the cash effect where it belongs.' },
    { role: 'Accounts Payable Lead', resp: 'Owns payment run behaviour, dispute handling and the measured days payable against agreed terms.' },
    { role: 'Treasury', resp: 'Decides whether supplier credit or external borrowing is the cheaper source of working capital.' }
  ],
  inputs: [
    'Annual spend and invoice profile for the category, including seasonality.',
    'The organisation cost of capital and the short-term borrowing rate, stated rather than assumed.',
    'Current agreed terms and measured actual payment behaviour, per supplier.',
    'Supplier financial position for the smaller and more exposed vendors in the base.'
  ],
  outputs: [
    'A term valuation: cash released, one-off versus permanent effect, and the implicit financing rate compared against the cost of funds.',
    'An early payment discount policy with the arithmetic and the threshold at which taking a discount stops being rational.',
    'A classification note: which part is a saving, which is a cash action, which is a cost of doing business.',
    'A payment behaviour report per critical supplier, with the actions arising from measured gaps.'
  ],
  controls: [
    'No term change is reported as a saving; it is reported as a cash action with its one-off and permanent parts separated.',
    'The cost of capital used in the valuation is supplied by finance and dated, because it changes.',
    'Payment outside agreed terms is measured and reported, and systematic delay is treated as a control failure rather than a working capital improvement.',
    'Early payment discount decisions follow the stated policy rather than per-invoice judgement.'
  ],
  bestPractices: [
    'Negotiate terms and price in the same conversation, and be willing to trade one for the other explicitly rather than pretending both are fixed.',
    'Model the supplier side of the term. If the answer is that they are financing you, decide whether that is a good deal rather than a free one.',
    'Report days payable outstanding against agreed terms, not in isolation, because the gap is the finding.',
    'Re-test the term at renewal. A Net 90 agreed in a high-rate world may be an expensive decision in a low-rate one.'
  ],
  mistakes: [
    'Booking a term extension as a recurring saving, which is the fastest route to losing the argument about every other number in the report.',
    'Taking every early payment discount without comparing it to the cost of short-term funds.',
    'Assuming a long term is always better for the buyer, when the supplier prices the financing into the quote whether or not you asked.',
    'Treating payment behaviour as an accounts payable matter, when it is one of the strongest signals of category and supplier health available.'
  ],
  terms: [
    { term: 'Cash released', def: 'The one-off working capital movement produced by extending payment terms, equal to spend multiplied by days gained divided by 365.' },
    { term: 'Implicit financing rate', def: 'The annualised rate a supplier is effectively charging by holding your credit, compared against the cost of external funds.' },
    { term: 'Early payment discount', def: 'A price reduction offered for settling sooner, which is a rate decision rather than a procurement preference.' },
    { term: 'Days payable outstanding', def: 'The measured average time to pay, meaningful only when compared against the terms actually agreed.' }
  ],

  thinkingPoints: [
    {
      quote: 'The saving that was a balance sheet.',
      explanation: 'A programme extended standard terms from Net 30 to Net 60 across a large indirect base and reported a substantial annual saving. Finance reconciled it in the second quarter: the cash had arrived once, the price per unit had not moved, and the accounts payable team had been paying late before the policy change anyway. The number was withdrawn, and the credibility cost fell on every other claim the team had made that year, including several that were entirely sound.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a cash action misclassified as a saving does not just overstate itself, it devalues the accurate claims sitting next to it.',
      reflectionPrompt: 'Which numbers in your current savings report would survive being described to a finance reader in one sentence?',
    },
    {
      quote: 'We saved the discount and lost the supplier.',
      explanation: 'A category took every early payment discount available and simultaneously stretched terms on the smaller vendors who had no discount offer. The larger suppliers were paid faster than agreed and the smaller ones later than agreed. Over a year, two of the small vendors exited the market they had been serving, one quote simply never arrived, and the price on the remaining source rose enough to exceed the value of all the discounts taken.',
      realWorldExample: 'Illustrative example: payment behaviour is a portfolio decision, and optimising each invoice separately produces an outcome nobody chose.',
      reflectionPrompt: 'Do you know which of your suppliers you pay early, which you pay late, and what that is doing to your supply base?',
    }
  ],

  sopSteps: [
    { title: 'Get the cost of capital stated before valuing anything', role: 'Finance Business Partner',
      desc: 'Ask treasury or finance for the organisation cost of capital and the short-term borrowing rate, dated, and record them in the valuation. Every term number depends on these two figures, and an assumed rate produces a defensible-looking calculation that cannot be reproduced by anyone else.',
      control: 'The valuation cites a dated rate supplied by finance, and is re-run when the rate environment changes.',
      record: 'Term valuation sheet with the rates, their source and their date.',
      pitfall: 'Using a generic market rate that suits the argument, which makes the whole analysis unauditable.'
    },
    { title: 'Separate the cash effect from the cost effect', role: 'Category Manager',
      desc: 'Compute the one-off working capital movement and the permanent financing cost change as two numbers with two durations. The first lands once on the balance sheet; the second repeats and can be annualised. Reporting them together is the error that produces a withdrawn saving.',
      control: 'The report states which part is a cash action and which part is a cost change, and books them differently.',
      record: 'Split valuation with the one-off and the recurring components shown separately.',
      pitfall: 'Annualising the cash release as though it repeated every year, which is arithmetic that flatters the number and fails the first review.'
    },
    { title: 'Compare the implicit rate against the cost of funds', role: 'Treasury',
      desc: 'Convert the term into the annualised rate the supplier is effectively charging and compare it with external borrowing. Where supplier credit is cheaper, holding the balance is a genuine cost reduction; where it is dearer, the term is a hidden price increase and should be shortened.',
      control: 'The decision to hold or shorten a balance is made against a stated rate comparison rather than as a default.',
      record: 'Rate comparison with the decision and the owner named.',
      pitfall: 'Assuming longer is always better for the buyer. Suppliers price the financing into the quote whether or not you asked for it.'
    },
    { title: 'Turn early payment discounts into a policy', role: 'Finance Business Partner',
      desc: 'Compute the annualised return each discount offer represents and set a rule: take it when the return exceeds the cost of short-term funds, decline it when it does not, and record the threshold. A per-invoice judgement produces inconsistent behaviour and no audit trail.',
      control: 'Discount decisions follow the written threshold, and exceptions are approved rather than absorbed.',
      record: 'Early payment discount policy with the arithmetic and the threshold.',
      pitfall: 'Taking every discount as good practice, which can be an expensive use of cash when funds are not free.'
    },
    { title: 'Test the supplier side of the term', role: 'Category Manager',
      desc: 'For smaller and financially exposed vendors, ask what the term costs them and whether it affects their willingness to quote, their quality of attention or their survival. A supply base financed by its customers is a resilience exposure carried on your own balance sheet.',
      control: 'Terms on exposed suppliers are set with the supplier financial position in view, not by default from the standard template.',
      record: 'Supplier payment position note per critical or exposed vendor.',
      pitfall: 'Applying the longest term the template allows to a supplier who cannot carry it, then treating their failure as unforeseeable.'
    },
    { title: 'Measure actual payment behaviour against agreed terms', role: 'Accounts Payable Lead',
      desc: 'Report days payable outstanding per critical supplier against the terms actually agreed, along with dispute rate and payment lag. The gap is the finding in both directions: paying late quietly finances you at a relationship cost, and paying early gives away working capital nobody decided to give.',
      control: 'Systematic payment outside agreed terms is treated as a control failure and reported, not as an efficiency.',
      record: 'Payment behaviour report with gaps, causes and actions.',
      pitfall: 'Reporting days payable in isolation, which makes a broken payment run look like good cash management.'
    },
    { title: 'Re-test the term at every renewal', role: 'Category Manager',
      desc: 'Terms agreed in one rate environment are not automatically correct in the next. Re-run the valuation at renewal, and be willing to trade a term for price explicitly rather than allowing both to be treated as fixed points.',
      control: 'Renewal packs carry the term valuation alongside the price comparison.',
      record: 'Renewal assessment with the term decision and its arithmetic.',
      pitfall: 'Inheriting a Net 90 because it was in the contract, when the financing it represents is now the dearer source of funds.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A category with USD 12M annual spend moves from Net 30 to Net 60. The team reports a saving of the full year of that cash movement.',
      q: 'What is wrong with that?',
      options: [
        { text: 'Nothing, provided the change is documented in the contract.', isCorrect: false, rationale: 'Documentation makes the change real, not the classification correct. The release happens once; the reported figure implies it repeats.' },
        { text: 'The cash release is one-off. The permanent effect is the change in financing cost, which may be positive, negative or small, and must be valued separately.', isCorrect: true, rationale: 'Correct. Twelve million at thirty extra days releases about one million of cash once. Whether that is a benefit depends on the cost of funds versus supplier credit, and none of it is a recurring saving.' },
        { text: 'The saving should be netted against inflation.', isCorrect: false, rationale: 'That treats the figure as a real saving with a timing adjustment, which is the original error in a more sophisticated costume.' },
        { text: 'It should be reported as cost avoidance.', isCorrect: false, rationale: 'Cost avoidance is a legitimate category with its own evidence standard. Using it as a place to park a number that does not reconcile damages every other claim.' }
      ],
      calcWork: 'USD 12,000,000 x 30 / 365 = about USD 986,000 of cash released, once. Annualised against a cost of funds, the recurring effect is the interest difference, not the balance.',
      principle: 'A term change produces one cash number and one cost number with different durations. Confusing them is how a savings total stops being believable.',
    },
    {
      type: 'scenario',
      context: 'A supplier offers 1.5 percent for payment within ten days, terms otherwise Net 45. Short-term borrowing costs the business 6 percent a year.',
      q: 'What is the correct decision?',
      options: [
        { text: 'Decline it, because paying early gives away working capital.', isCorrect: false, rationale: 'That is the reflex and it is wrong here. The discount is a return on the accelerated money, and it has to be compared with the cost of obtaining that money, not judged as a principle.' },
        { text: 'Take it: accelerating by 35 days to earn 1.5 percent is an annualised return far above the 6 percent cost of funds.', isCorrect: true, rationale: 'Correct. Roughly 1.5 percent for 35 days annualises to about 15 percent, which against a 6 percent borrowing cost is a clear gain, and the decision should be encoded as policy rather than re-made per invoice.' },
        { text: 'Negotiate it to 2 percent before taking it.', isCorrect: false, rationale: 'Worth trying, and it is not the decision. The economics already favour taking the offer as it stands.' },
        { text: 'Take it only where the supplier is financially weak.', isCorrect: false, rationale: 'This confuses a rate decision with a relationship one. Paying a struggling supplier faster may be deliberate support, but that is a separate and explicit choice.' }
      ],
      calcWork: '1.5 percent over 35 days accelerated = 0.015 x (365 / 35) = about 15.6 percent annualised, against a 6 percent cost of funds.',
      principle: 'An early payment discount is an interest rate. Compare it with your cost of funds and write the rule down once.',
    },
    {
      type: 'scenario',
      context: 'Standard terms were set at Net 90 for all new suppliers, including small specialist vendors with thin reserves.',
      q: 'What is the most likely consequence?',
      options: [
        { text: 'Improved working capital with no other effect.', isCorrect: false, rationale: 'The cash effect is real and immediate, and it is the only one the decision measured. Everything else arrives later and is attributed to something else.' },
        { text: 'The financing burden has moved to the party least able to carry it, and it will return as higher prices, fewer quotes, degraded service or supplier failure.', isCorrect: true, rationale: 'Correct. Small suppliers either price the financing into the quote, reduce what they will do for you, or fail. Each of those costs more than the term gained, and none of them appears in the working capital report.' },
        { text: 'Suppliers will negotiate shorter terms individually.', isCorrect: false, rationale: 'Some will, and the ones who matter most often cannot. The exposed vendors are typically the ones with the least leverage to ask.' },
        { text: 'Risk is unchanged because the terms are contractual.', isCorrect: false, rationale: 'Contractual terms describe an intention. Payment behaviour and supplier solvency describe the exposure.' }
      ],
      principle: 'Terms transfer financing capacity. Where the receiving party cannot carry it, you have not removed the cost, you have postponed and relocated it.',
    },
    {
      type: 'scenario',
      context: 'Days payable outstanding for a category is 104 days against agreed Net 60 terms. Finance is pleased.',
      q: 'What should procurement conclude?',
      options: [
        { text: 'The category is performing well on cash.', isCorrect: false, rationale: 'It is performing outside its own contract. The 44-day gap is a breach of terms happening at scale, and it will be priced, escalated or lost when the supplier decides.' },
        { text: 'There is a control failure: payment behaviour does not match the agreement, and the supplier is financing the business without being asked or credited for it.', isCorrect: true, rationale: 'Correct. The gap is the finding in both directions. It may also indicate a dispute backlog, an invoice quality problem, or a supplier who has stopped chasing - each of which is worth knowing before it becomes a supply event.' },
        { text: 'The contract terms should be renegotiated to Net 104.', isCorrect: false, rationale: 'Formalising an accident rather than fixing it, and it invites the supplier to price the extra forty-four days.' },
        { text: 'Accounts payable should be measured on DPO reduction targets.', isCorrect: false, rationale: 'That metric would make the problem worse and reward it. The measure needed is the gap to agreed terms, not the level.' }
      ],
      principle: 'Days payable is only meaningful against the terms agreed. A favourable number produced by a breach is a liability with a good report.',
    },
    {
      type: 'scenario',
      context: 'A renewal is due. The terms were set three years ago when interest rates were near zero; they are now materially higher.',
      q: 'What has to change in the analysis?',
      options: [
        { text: 'Nothing: terms are contractual and stay until renegotiated.', isCorrect: false, rationale: 'True as a legal statement and false as an economic one. The value of the term has moved, so the decision to keep it is being made again whether or not anyone makes it explicitly.' },
        { text: 'The term must be re-valued against the new cost of funds, and may now be worth trading for price rather than holding.', isCorrect: true, rationale: 'Correct. Expensive money changes which source of working capital is cheaper. A term that was a good deal when funds were free can be the dearer option now, and that is a live commercial decision at renewal.' },
        { text: 'Ask the supplier to extend terms further to match the rate move.', isCorrect: false, rationale: 'Possible, and it transfers cost rather than creating it. The analysis comes first.' },
        { text: 'Convert the term into a discount for early payment.', isCorrect: false, rationale: 'One of several trades worth modelling, and it is a conclusion from the valuation rather than a substitute for it.' }
      ],
      principle: 'The value of a term moves with the price of money. Re-test it at renewal rather than inheriting a decision made in a different world.',
    }
  ],

  relSop: 'sop-contract-review',
  rel: {
    concepts: ['payment-terms', 'working-capital', 'price-vs-cost', 'total-cost-of-ownership', 'contract-structure', 'supplier-financial-risk'],
    sops: ['sop-contract-review', 'sop-contract-renewal', 'sop-savings-validation', 'sop-procurement-lifecycle'],
    checklists: ['cl-contract-review', 'cl-contract-renewal', 'cl-savings-validation', 'cl-supplier-risk-review'],
    templates: ['tpl-contract-renewal-assessment', 'tpl-business-case', 'tpl-savings-validation', 'tpl-contract-review-checklist'],
    calcs: ['calc-payment-terms', 'calc-multi-year-contract-cost', 'calc-tco', 'calc-budget-vs-actual'],
    decisions: ['negotiate-or-accept', 'renew-vs-resource', 'unit-or-tco', 'supplier-financial-risk'],
    kpis: ['kpi-working-capital-impact', 'kpi-roi', 'kpi-savings', 'kpi-ppv'],
    glossary: ['gloss-working-capital', 'gloss-ebitda', 'gloss-run-rate', 'gloss-ppv']
  },
  labMission: {
    title: 'Mission 19.1: Value a Term You Actually Have',
    desc: 'Take one real category, convert its payment terms into cash and cost using the payment terms tool, and classify each part honestly.',
    tasks: [
      'Open the Payment Terms tool and compute the cash released by thirty extra days on one category, then state the annualised financing effect separately.',
      'Find the annualised return on one early payment discount offer and compare it with your cost of short-term funds.',
      'Check measured days payable against agreed terms for your three largest suppliers and name the gap.'
    ],
    ctaLabel: 'Open Payment Terms Calculator',
    ctaHref: '#/calc/calc-payment-terms',
    secondaryLabel: 'Open Budget vs Actual Tool',
    secondaryHref: '#/calc/calc-budget-vs-actual'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-cash-conversion-cycle',
  title: 'The Cash Conversion Cycle and What Procurement Actually Controls',
  module: 'Module 19: The Finance of Procurement - Cash, Terms and Value',
  kicker: 'Function 19.2',
  tier: 'executive',
  tagline: 'Inventory days, receivable days, payable days: the three levers procurement touches, and the number that tells you whether the trade was worth it.',
  desc: 'Procurement is routinely credited or blamed for cash effects it only partly controls. This function covers the cash conversion cycle as a management object, which components procurement actually moves, the standing conflict between cost-down and cash-out, and how to make the trade explicitly with the CFO rather than losing it inside two separate budgets.',
  duration: '24 mins',
  lifecycleStage: 'Stage 20: Performance Management and Value Assurance',
  lifecycleDesc: 'A portfolio-level view that sits above category performance: the measure by which procurement decisions show up in the balance sheet rather than only in the price line.',

  what: "The cash conversion cycle is the number of days between paying for something and being paid for it. It is inventory days plus receivable days minus payable days, and it is the measure that turns procurement decisions into a cash consequence. Understanding which of the three terms procurement actually controls is the first discipline, because the answer is narrower than most claims assume. Payable days are directly controlled through terms and payment behaviour. Inventory days are controlled indirectly but powerfully through ordering policy, minimum order quantities, lead time, packaging, delivery frequency and specification breadth - the classic trap being a price-per-unit improvement bought with a minimum order quantity that triples holding days, where the cash and storage cost exceeds the discount and neither budget shows the loss. Receivable days are almost never a procurement lever, except where procurement buys the goods that determine how fast the business can invoice a customer, or where a supplier failure stops a delivery that would have triggered billing. The executive value of the cycle is that it makes the trade visible. Cost reduction and cash release frequently point in opposite directions: buying in fewer, larger orders reduces unit price and purchase-order handling cost while increasing inventory days; shortening supplier terms improves supplier resilience and reduces the risk of failure while consuming cash; holding a buffer protects a delivery date and ties up working capital. None of these is wrong. All of them are decisions, and a decision taken implicitly inside a category plan is a decision nobody has priced. The CFO conversation therefore has a specific shape. Bring the cycle, not the saving: show what a proposed action does to unit cost, to purchase-order volume, to inventory days and to the cash position, and let the business choose which of the two currencies it prefers this year. Where a target has been set on one component - a working capital reduction of a stated number of days - say plainly which category actions support it and which ones fight it, because otherwise the same organisation will simultaneously fund a bulk-buying programme and demand a lower inventory balance and be surprised when both cannot be true. The second executive duty is to stop the credit and blame asymmetry. Procurement is often credited for a cash release produced by stretching terms on suppliers who cannot object, and blamed for an inventory build produced by a demand forecast the business owns. Both are measurement failures, and the fix is a shared metric with named owners on each component rather than a procurement target that quietly absorbs the consequences of other functions decisions. Finally, the resilience cost of cash optimisation deserves an explicit line. A supply base financed by its customers and an inventory policy tuned to the minimum are efficient in a stable market and fragile in a disrupted one. The honest executive position is not that cash is wrong; it is that the cycle is a lever with a risk attached, and the risk should be priced and recorded when the lever is pulled rather than discovered during the event that follows.",
  why: [
    'The cycle is the place where procurement decisions become visible in the balance sheet, which is the language the executive actually uses to allocate capital.',
    'Unit cost and cash frequently move in opposite directions, and the only way to choose deliberately rather than by accident is to price both in the same conversation.',
    'Procurement controls payable days directly, inventory days indirectly through ordering policy, and receivable days almost not at all - so claims on all three need the same precision.',
    'A single-function target on one component of the cycle produces contradictions elsewhere: the same organisation cannot fund bulk purchasing and demand a lower inventory balance without deciding which it wants.',
    'Cash optimisation has a resilience price. It should be recorded when the lever is pulled, not discovered during the disruption that follows.'
  ],
  when: [
    'When a working capital target is set and category actions need to be aligned to it, or the conflict needs naming.',
    'At any proposal that changes order size, delivery frequency, minimum order quantity, buffer level or payment terms.',
    'During the annual planning cycle, as a shared metric with named owners on each component.',
    'After a disruption, when the resilience cost of the previous optimisation becomes measurable.'
  ],

  raci: [
    { role: 'Head of Procurement', resp: 'Explains the cycle effect of each category action and makes the cost-versus-cash trade explicit to the business.' },
    { role: 'CFO / Finance Director', resp: 'Sets the working capital position, arbitrates between cost and cash objectives, and owns the receivable component.' },
    { role: 'Operations / Supply Chain', resp: 'Owns inventory days, ordering policy and buffer levels, and the demand forecast behind them.' },
    { role: 'Category Manager', resp: 'Prices the cycle consequence of minimum order quantities, delivery frequency and term decisions in each plan.' }
  ],
  inputs: [
    'The current cycle: inventory days, receivable days, payable days, and the trend.',
    'Category ordering data: order size, minimum order quantities, lead times, delivery frequency, holding cost per unit per year.',
    'The stated working capital or cost objective for the period, with the number attached.',
    'The resilience position: which lines are single-sourced, which carry buffer, and what the last disruption actually cost.'
  ],
  outputs: [
    'A cycle view per category: what each proposed action does to unit cost, order volume, inventory days and cash.',
    'A named trade-off decision where cost and cash conflict, with the reason and the owner.',
    'A shared metric set with owners per component, so procurement is not measured on effects it does not control.',
    'A recorded resilience price where the cycle is optimised, stated alongside the cash benefit.'
  ],
  controls: [
    'Any action that changes order size, minimum order quantity or delivery frequency carries a holding-cost calculation before approval.',
    'Working capital targets name the owner of each component, and procurement is not measured on receivables.',
    'Term extensions and buffer reductions are recorded with their resilience consequence, not only their cash benefit.',
    'Cost and cash objectives that conflict are escalated for a decision rather than being pursued in parallel by different functions.'
  ],
  bestPractices: [
    'Bring the cycle to the CFO conversation rather than the saving. It is the same decision expressed in the currency the business allocates capital in.',
    'Price the minimum order quantity properly. A unit discount bought with three extra months of stock is usually a loss, and it is invisible when the two costs sit in different budgets.',
    'State the trade you are refusing. A category plan that optimises cost and says nothing about cash has made the choice without telling anyone.',
    'Keep a resilience line in the cycle discussion, so the next working capital push has a documented price rather than a surprise.'
  ],
  mistakes: [
    'Claiming credit for the whole cycle improvement, including the receivable work of another function.',
    'Reducing inventory days across the board without distinguishing the lines that were carrying a genuine single-source exposure.',
    'Negotiating a lower unit price with a higher minimum order quantity and reporting the discount without the holding cost.',
    'Treating cash and cost as one scoreboard, which produces a plan that cannot be executed without contradiction.'
  ],
  terms: [
    { term: 'Cash conversion cycle', def: 'Inventory days plus receivable days minus payable days: the time between paying for inputs and collecting for outputs.' },
    { term: 'Holding cost', def: 'The annual cost of carrying inventory, including capital, space, insurance, shrinkage and obsolescence, applied per unit held.' },
    { term: 'Working capital target', def: 'A stated reduction in the cash tied up in operations, which allocates consequences across several functions.' },
    { term: 'Resilience price', def: 'The measured cost of protection - buffer, second source, longer terms for a supplier - recorded against the cash it consumes.' }
  ],

  thinkingPoints: [
    {
      quote: 'The discount and the pallet.',
      explanation: 'A packaging category won a strong unit price by accepting a minimum order quantity that required a full pallet rather than a case, and a delivery cycle that moved from fortnightly to quarterly. The unit price saving was reported. The inventory days, the storage space hired for the first time, the write-off from a specification change eleven months later, and the cash tied up were reported in three different places and in none of them against the saving.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a decision that is profitable in one budget and costly in another will always be reported as profitable, because nobody sees both halves.',
      reflectionPrompt: 'Which of your recent price wins were funded by an order-size or delivery-frequency change nobody priced?',
    },
    {
      quote: 'Two targets, one organisation, no decision.',
      explanation: 'A business set a working capital reduction target and, in the same cycle, a category cost-down target. Procurement responded by reducing inventory cover on most lines and negotiating longer terms across the base. The following year a supply event hit a category that had lost its buffer, expedite cost consumed a large part of the cash gain, and the review found that no one had ever been asked to choose between the two objectives.',
      realWorldExample: 'Illustrative example: parallel targets without an arbiter produce an organisation doing both things and being surprised by the interaction.',
      reflectionPrompt: 'Who in your business is responsible for deciding when cost and cash objectives conflict, and has that decision ever been recorded?',
    }
  ],

  sopSteps: [
    { title: 'Establish the cycle and its components before claiming anything', role: 'CFO / Finance Director',
      desc: 'Set out inventory days, receivable days and payable days with their owners, and show the trend. The purpose of writing the three components separately is to make it impossible to claim an improvement in one that was produced by a change in another, or by a function procurement does not control.',
      control: 'Each component has a named owner outside procurement, and the metric is reported by component as well as in total.',
      record: 'Cycle statement with components, owners, trend and the period covered.',
      pitfall: 'Reporting the total to procurement as a target while the largest movement in it came from a receivables initiative owned by someone else.'
    },
    { title: 'Price every ordering change on both axes', role: 'Category Manager',
      desc: 'Where a proposal changes unit price through order size, minimum order quantity, packaging or delivery frequency, compute the holding cost consequence in the same paper: extra days of cover, capital tied up, space, obsolescence risk. A discount that requires a pallet instead of a case is a different decision than it looks.',
      control: 'No minimum order quantity or delivery-frequency change is approved without a holding cost calculation attached.',
      record: 'Ordering decision note showing unit cost and cycle effect together.',
      pitfall: 'Reporting the unit saving and leaving the holding cost to appear in another budget, where it is invisible to the person who approved the trade.'
    },
    { title: 'Separate the cash lever from the resilience lever', role: 'Operations / Supply Chain',
      desc: 'Identify which inventory cover is protecting a genuine exposure - single source, long lead time, a volatile input - and which is simply habit. Reduce the second category and be explicit about the first. Blanket cover reduction is a single decision disguised as many small ones, and it is usually reversed in a crisis at a higher cost.',
      control: 'Buffer changes on exposed lines require a documented resilience assessment, not a percentage target.',
      record: 'Buffer register showing cover, cause, exposure and the decision on each change.',
      pitfall: 'Applying a uniform reduction across a category, which cuts the protective cover and preserves the habitual cover.'
    },
    { title: 'Name the conflict between objectives early', role: 'Head of Procurement',
      desc: 'Where a cost-down target and a working capital target pull in opposite directions for a specific category, put both numbers in front of the owner of the objectives and ask for a decision. Doing both quietly produces the interaction as a surprise rather than as a choice.',
      control: 'Conflicting objectives are escalated with the two numbers and a recommendation, and the decision is recorded.',
      record: 'Decision note naming the category, the two objectives, the trade and the arbiter.',
      pitfall: 'Assuming the business wants the cash and quietly optimising for it, then being held responsible for the cost of the disruption that follows.'
    },
    { title: 'Bring the cycle into the executive conversation', role: 'Head of Procurement',
      desc: 'Present category plans as effects on unit cost, order volume, inventory days and cash rather than as savings alone. This is the same argument in the currency in which capital is allocated, and it changes who can say no and on what basis.',
      control: 'Portfolio reporting shows the cycle effect of major actions alongside the cost effect.',
      record: 'Portfolio report with cost and cash columns and a stated trade-off per major action.',
      pitfall: 'Reporting only savings while claiming credit for a cash position the same report does not describe.'
    },
    { title: 'Record the resilience price when the lever is pulled', role: 'CFO / Finance Director',
      desc: 'Where the business chooses cash over protection, write down what was given up, what it would cost if the exposure materialises, and who accepted that. The entry is worth little in a quiet year and is the entire record of the decision in the year that follows.',
      control: 'Each accepted reduction in protection carries a stated exposure, a cost if realised and a named acceptor.',
      record: 'Accepted exposure register with the cash benefit and the risk held.',
      pitfall: 'Treating a working capital gain as free, then meeting the cost during an event with no record that anyone chose it.'
    },
    { title: 'Re-measure and attribute honestly', role: 'Finance Business Partner',
      desc: 'At the review, attribute the movement in each component to the action that caused it, including the actions that went the wrong way. Honest attribution is what makes the cycle a management tool rather than a scoring exercise, and it is the only defence against the next target being set on the wrong component.',
      control: 'Attribution is reviewed by someone who does not own the metric being reported.',
      record: 'Cycle review with component attribution and the actions arising.',
      pitfall: 'Claiming the total improvement and letting the component that got worse disappear into the aggregate.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A business sets a working capital reduction target and a category cost-down target for the same year.',
      q: 'What is the first thing procurement should do?',
      options: [
        { text: 'Pursue both, since they are both board objectives.', isCorrect: false, rationale: 'This is how the contradiction gets discovered during a disruption. The two targets pull in opposite directions on several categories, and pursuing both silently means the trade is made by whoever acts first.' },
        { text: 'Identify where the two objectives conflict by category, put both numbers in front of their owners, and get a recorded decision.', isCorrect: true, rationale: 'Correct. Cost-down often wants larger orders and more cover; cash release wants the opposite. Naming the conflict early converts two targets into one decision, and the record protects everyone afterwards.' },
        { text: 'Prioritise the working capital target, since cash is the harder constraint.', isCorrect: false, rationale: 'A defensible position and not procurements to take alone. Choosing between two board objectives is an arbitration, and doing it quietly transfers the decision to a function that does not own either.' },
        { text: 'Ask finance to remove one target.', isCorrect: false, rationale: 'The targets may both be right for different parts of the portfolio. The work is to find where they collide, not to assume they are globally inconsistent.' }
      ],
      principle: 'Two objectives that pull opposite ways are one decision waiting to be made. Make it explicitly, and write it down.',
    },
    {
      type: 'scenario',
      context: 'A category report claims a strong unit price saving. The minimum order quantity rose from a case to a pallet and delivery moved from fortnightly to quarterly.',
      q: 'What is missing from the report?',
      options: [
        { text: 'Nothing, provided the price evidence is attached.', isCorrect: false, rationale: 'The price evidence is genuine and the decision is still misreported. The change in ordering policy is the other half of the same trade.' },
        { text: 'The holding cost consequence: extra days of cover, capital tied up, space, and obsolescence exposure, presented against the discount that bought them.', isCorrect: true, rationale: 'Correct. A pallet instead of a case converts a unit discount into a cash and risk position, and the two halves land in different budgets. Only the combined number is a decision.' },
        { text: 'A note that the supplier delivery performance improved.', isCorrect: false, rationale: 'Possibly true and beside the point. Less frequent delivery usually worsens responsiveness, which is another cost of the same trade.' },
        { text: 'A re-baselined saving figure net of inflation.', isCorrect: false, rationale: 'A different correction entirely, and it does not touch the effect the ordering change had on the balance sheet.' }
      ],
      calcWork: 'Quarterly instead of fortnightly delivery raises average cover from roughly a fortnight to about six weeks. On a category with a stated holding cost, that is a recurring annual cost set against a one-off unit discount.',
      principle: 'A discount bought with inventory is a trade between two budgets. Report it as one number or report it honestly as two.',
    },
    {
      type: 'scenario',
      context: 'Procurement is given a target on the total cash conversion cycle, including receivable days owned by another function.',
      q: 'What is the correct response?',
      options: [
        { text: 'Accept it, since the cycle is a single measure.', isCorrect: false, rationale: 'It is a single measure of three things owned by three functions. Accepting the total means being judged on work you cannot direct and letting the actual owner of the largest component off the record.' },
        { text: 'Report the cycle by component with named owners, and take a target only on the components procurement directs.', isCorrect: true, rationale: 'Correct. That is the version of the metric that changes behaviour, because each owner sees their own number. It also prevents the pattern where a receivables initiative is credited to a procurement plan.' },
        { text: 'Refuse any cycle metric as outside procurement scope.', isCorrect: false, rationale: 'Payable days and inventory policy are squarely inside it. Refusing the whole measure forfeits the argument procurement most needs to make.' },
        { text: 'Move the target to days payable outstanding only.', isCorrect: false, rationale: 'A narrower measure and a worse one in isolation, because days payable without reference to agreed terms rewards breach rather than design.' }
      ],
      principle: 'A composite metric needs component owners. Otherwise one function is measured on another work and nobody is accountable for the whole.',
    },
    {
      type: 'scenario',
      context: 'A working capital programme reduces inventory cover by a uniform percentage across every category.',
      q: 'What will that almost certainly do?',
      options: [
        { text: 'Free cash with a manageable risk.', isCorrect: false, rationale: 'It will free cash from the lines that had habitual cover and free it from the lines that had protective cover too, and those two are not the same decision.' },
        { text: 'Cut protective cover on single-sourced and long-lead lines alongside habitual cover on the rest, and reverse the former expensively during the next disruption.', isCorrect: true, rationale: 'Correct. Uniform targets cannot distinguish cover that exists because the supply is fragile from cover that exists because nobody has looked at it. The buffer register and the exposure map are what make the reduction a decision rather than a percentage.' },
        { text: 'Improve forecast accuracy as a side effect.', isCorrect: false, rationale: 'It may force a conversation about forecasts, but it does not improve them, and it removes the protection that forecast error was being absorbed by.' },
        { text: 'Reduce obsolescence without affecting availability.', isCorrect: false, rationale: 'True for the specific lines where cover exceeded the specification change risk, which is exactly the subset a uniform cut does not identify.' }
      ],
      principle: 'A uniform reduction is a decision to stop distinguishing protection from habit. The exposure map is what makes a cover reduction selective.',
    },
    {
      type: 'scenario',
      context: 'The CFO asks procurement to explain how a stated cash release was produced.',
      q: 'What is a complete answer?',
      options: [
        { text: 'Terms were extended across the supply base.', isCorrect: false, rationale: 'That names one lever and omits the two questions that matter: which part of the release is one-off, and who carried the financing.' },
        { text: 'The split between one-off release and recurring effect, which component of the cycle moved, which suppliers carried it, and what resilience was given up.', isCorrect: true, rationale: 'Correct. That answer survives the next twelve months. It distinguishes a cash action from a saving, identifies the exposure created, and lets the business decide whether the trade remains worthwhile.' },
        { text: 'The figure came from the treasury report.', isCorrect: false, rationale: 'True and unhelpful. The question is about the decision, not the data source.' },
        { text: 'Procurement delivered ahead of target.', isCorrect: false, rationale: 'A performance statement rather than an explanation, and it invites the follow-up that produces the uncomfortable version anyway.' }
      ],
      principle: 'A cash number needs its composition, its duration and its risk. Otherwise it is a claim, and the next disruption will reclassify it.',
    }
  ],

  relSop: 'sop-savings-validation',
  rel: {
    concepts: ['working-capital', 'payment-terms', 'total-cost-of-ownership', 'demand-management', 'savings-types', 'supplier-financial-risk'],
    sops: ['sop-savings-validation', 'sop-contract-review', 'sop-supplier-performance-management', 'sop-procurement-lifecycle'],
    checklists: ['cl-savings-validation', 'cl-supplier-risk-review', 'cl-contract-review'],
    templates: ['tpl-business-case', 'tpl-savings-validation', 'tpl-supplier-risk-assessment', 'tpl-contract-performance-review'],
    calcs: ['calc-payment-terms', 'calc-budget-vs-actual', 'calc-multi-year-contract-cost', 'calc-kpi-calculator'],
    decisions: ['renew-vs-resource', 'approve-exception', 'supplier-financial-risk', 'unit-or-tco'],
    kpis: ['kpi-working-capital-impact', 'kpi-roi', 'kpi-sum', 'kpi-savings-realization'],
    glossary: ['gloss-working-capital', 'gloss-ebitda', 'gloss-eoq', 'gloss-moq']
  },
  labMission: {
    title: 'Mission 19.2: Find Where Cost and Cash Conflict',
    desc: 'Take two live objectives in your business, work out where they pull opposite ways by category, and write the decision note that should already exist.',
    tasks: [
      'Write your current cash conversion cycle by component, with the owner of each, and identify which component procurement actually directs.',
      'Find one category where a unit price improvement was bought with a larger order quantity, and price the holding cost against it.',
      'Draft the decision note for one conflict between a cost objective and a cash objective, naming who should arbitrate it.'
    ],
    ctaLabel: 'Open Budget vs Actual Tool',
    ctaHref: '#/calc/calc-budget-vs-actual',
    secondaryLabel: 'Open Savings Validation SOP',
    secondaryHref: '#/sop/sop-savings-validation'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-supply-chain-finance',
  title: 'Supply Chain Finance, Early Payment and the Ethics of the Balance Sheet',
  module: 'Module 19: The Finance of Procurement - Cash, Terms and Value',
  kicker: 'Function 19.3',
  tier: 'practitioner',
  tagline: 'Programmes that let your suppliers get paid early using your credit - what they cost, who they really benefit, and where they become coercion.',
  desc: 'Supply chain finance, dynamic discounting and invoice discounting move money along the chain without moving the underlying decision. This function covers how the structures differ, who pays for them, what they do to your reported metrics and to your smallest suppliers, and the point at which a voluntary programme stops being voluntary.',
  duration: '22 mins',
  lifecycleStage: 'Stage 14: Commercial Terms Optimization',
  lifecycleDesc: 'Sits with terms and payment behaviour, and reaches into supplier financial risk, because these programmes change who is financing whom.',

  what: "Three structures are usually confused. Supply chain finance, also called reverse factoring, is a arrangement where a buyer creditworthiness is used to let a supplier receive payment earlier than the agreed term, with a financier paying the supplier and collecting from the buyer at maturity. The supplier chooses whether to participate per invoice and pays a discount rate linked to the buyer credit rating rather than its own, which is why it works: a large buyer borrows cheaply and the supplier borrows at that rate by proxy. Dynamic discounting lets a buyer pay early at a rate that slides with how early the payment is, so the buyer is buying a discount with cash and the supplier is selling the term. Invoice discounting or payables finance sits nearer the supplier end: the supplier assigns or borrows against invoices, and the buyer may not be involved at all. The procurement relevance is not the mechanics, it is the consequences. First, the metrics. A programme that lets suppliers take early payment while the buyer pays at maturity keeps days payable outstanding high on paper while the actual cash leaves earlier for those invoices that participate. The balance sheet looks financed by suppliers when part of it is financed by a bank, and rating agencies and auditors have taken a direct interest in exactly this distinction, which is why some programmes are now classified as debt rather than as trade payables. That is a finance decision with a procurement signature, and procurement should not be surprised by it after the fact. Second, who benefits. The buyer gains either a discount or unchanged cash timing; the financier gains margin; the supplier gains access to cheaper financing than it could obtain alone, and loses the discount it would have negotiated had it known. The uncomfortable case is the supplier who is told the programme exists, that terms are being extended, and that cash flow is their own responsibility - where the choice to participate is a choice between two bad options rather than a choice. Third, the coercion question, which is a governance question and not a philosophical one. A programme is voluntary if a supplier can decline it without commercial consequence, and can price its offer against alternatives. Where a category plan quietly assumes all suppliers participate, where declining affects award decisions, or where the programme is described to suppliers as a requirement, the buyer has extended terms and financed the gap at the supplier cost while calling it support. That is the version that damages a supply base and, in several jurisdictions, has attracted regulatory attention under prompt-payment and disclosure rules. The honest position is that these programmes are usually good value when they are genuinely optional, priced transparently, and applied to suppliers who have chosen them. They are bad value when they are a way of taking cash from the supply base without deciding to. Procurement role is specific: state the term, state the programme, state who is expected to participate, and report the effect on the cycle honestly, including the part that is financed by a third party rather than by the supplier.",
  why: [
    'The three structures transfer different things to different parties, and treating them as one programme produces decisions made on the wrong assumptions about who is financing whom.',
    'Days payable outstanding can be made to look favourable while cash leaves earlier through a financier, which changes the character of the balance sheet and may reclassify it as debt.',
    'A supplier who cannot decline without commercial consequence is not participating voluntarily, and the programme has become a term extension with an extra step.',
    'Prompt payment disclosure and reporting duties in a growing number of jurisdictions turn this from a soft ethics question into a compliance one, and the obligation sits partly with procurement.',
    'The supply base effect is measurable: financing cost, willingness to quote and failure rate among smaller vendors all move with who is carrying the term.'
  ],
  when: [
    'When a payment or financing programme is proposed and the term is being changed alongside it.',
    'When a category plan relies on suppliers participating in a programme they have not agreed to.',
    'Where reported days payable and actual supplier payment dates diverge.',
    'At renewal with smaller vendors, where the financing burden of the term determines whether they quote at all.'
  ],

  raci: [
    { role: 'Treasury', resp: 'Selects the financing structure, sets the pricing, and owns the classification of the programme in the accounts.' },
    { role: 'Head of Procurement', resp: 'States the term, the programme and the participation expectation to suppliers, and reports the supply base effect.' },
    { role: 'Finance Business Partner', resp: 'Reconciles reported days payable with actual payment dates and the disclosure obligations that follow.' },
    { role: 'Category Manager', resp: 'Understands which suppliers participate and what declining would mean for them commercially.' }
  ],
  inputs: [
    'The programme structure, pricing and the party who pays the margin in each case.',
    'Agreed terms per supplier, actual payment dates, and participation per invoice.',
    'The supplier financial position for the exposed vendors in the categories concerned.',
    'The disclosure and reporting obligations that apply in each jurisdiction the business operates in.'
  ],
  outputs: [
    'A statement of who finances the term in each category, including the share carried by a third-party financier.',
    'A participation report showing which suppliers take early payment and what it costs them.',
    'A supplier-facing communication that states the term, the programme and that declining has no commercial consequence.',
    'A reconciliation of reported days payable against actual payment behaviour, with the disclosure position.'
  ],
  controls: [
    'Participation in any supplier financing programme is recorded as voluntary, and award decisions are demonstrably independent of it.',
    'Reported days payable are reconciled to actual payment dates, and the financed portion is disclosed separately.',
    'Programme terms are communicated in writing to suppliers, including the cost of early settlement and the alternatives.',
    'Where a jurisdiction imposes prompt payment reporting, the obligation is owned by a named role rather than assumed.'
  ],
  bestPractices: [
    'Be explicit about who is financing whom. The whole value of the structure is that a strong credit subsidises a weaker one, and that is worth saying out loud rather than leaving as a mechanic.',
    'Measure participation by supplier size rather than by value. A programme used only by large suppliers is a discount scheme; one used by small suppliers is a financing arrangement and needs different care.',
    'Do not let a financing programme appear in a category plan as a cost saving. It changes when cash moves, not what the goods cost.',
    'Publish the term and the payment record. Suppliers price uncertainty, and an unexplained payment lag costs more than a longer term honestly stated.'
  ],
  mistakes: [
    'Extending terms and describing the financing programme alongside it as support, when the supplier has no realistic option but to participate.',
    'Reporting a working capital improvement that is in part a bank facility, and being surprised when it is reclassified as debt.',
    'Assuming small suppliers absorb a long term quietly rather than pricing it, quoting less often, or leaving.',
    'Treating prompt payment disclosure as a legal matter with no procurement input, when the data is procurement data.'
  ],
  terms: [
    { term: 'Supply chain finance', def: 'A arrangement where a financier pays a supplier early against the buyer obligation, and the buyer settles at maturity, using the buyer credit rating to price the supplier financing.' },
    { term: 'Dynamic discounting', def: 'A sliding early payment discount where the buyer pays sooner in exchange for a rate, so the buyer chooses how much cash to spend on how much discount.' },
    { term: 'Voluntary participation', def: 'A supplier can decline the programme and be paid on the agreed term without any commercial consequence.' },
    { term: 'Prompt payment reporting', def: 'Jurisdictional duties to disclose payment terms and behaviour to smaller suppliers, which turn programme design into a compliance matter.' }
  ],

  thinkingPoints: [
    {
      quote: 'The programme was voluntary in the way a toll is voluntary.',
      explanation: 'A business moved standard terms to Net 90 and launched a supply chain finance facility at the same time, describing the facility to suppliers as a benefit. In practice, small vendors who did not take early settlement found their invoices queued behind those that did, and no one had written down that declining was allowed. Within a year, two long-standing vendors had stopped quoting in the category, and the exit interviews cited cash flow.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a financing programme becomes coercion through payment sequencing and silence rather than through any stated requirement.',
      reflectionPrompt: 'Could a small supplier in your largest category decline your financing programme and still be paid on time? What evidence would you have?',
    },
    {
      quote: 'The metric moved and nothing else did.',
      explanation: 'A working capital improvement was reported after a financing programme went live. Days payable held at the extended level while a large share of invoices settled earlier through the financier. The balance sheet line described trade payables; the substance for those invoices was a bank facility. The reclassification question arrived from outside the business, and inside it nobody could say quickly which suppliers had been paid when.',
      realWorldExample: 'Illustrative example: when the measure and the reality diverge, the correction usually comes from a party with no interest in how the number was produced.',
      reflectionPrompt: 'Could you produce, this week, the difference between agreed terms, reported days payable and actual payment dates?',
    }
  ],

  sopSteps: [
    { title: 'Identify which structure is actually being used', role: 'Treasury',
      desc: 'State whether the arrangement is supply chain finance, dynamic discounting or supplier-side invoice discounting, and write down who pays the margin and who carries the term in each case. The three look similar in a slide and behave differently in the accounts and in the supply relationship.',
      control: 'The programme note names the structure, the party paying the cost, and the party carrying the financing burden.',
      record: 'Structure note with pricing, participants and the balance sheet treatment stated.',
      pitfall: 'Describing all three as early payment support, which lets a buyer claim a benefit it is not the one providing.'
    },
    { title: 'Establish that participation is genuinely voluntary', role: 'Head of Procurement',
      desc: 'Confirm that a supplier can decline and still be paid on the agreed term, on time, with no effect on award decisions, and write that into the supplier-facing communication. Then test it: check whether payment sequencing, dispute handling or renewal behaviour differs between participants and non-participants.',
      control: 'Declining is documented as consequence-free, and the difference in treatment between participants and non-participants is measured rather than assumed.',
      record: 'Supplier communication plus a participation-neutrality check.',
      pitfall: 'A plan that quietly expects every supplier to participate, which converts an option into a term extension the supplier funds.'
    },
    { title: 'Reconcile reported days payable with actual payment dates', role: 'Finance Business Partner',
      desc: 'Compare agreed terms, reported days payable and the dates cash actually left, split by whether a financier settled early. The gap is not a rounding issue: it changes the character of the balance sheet and can move the facility from trade payables into debt.',
      control: 'The financed portion is disclosed separately in the internal report, and the accounting classification is confirmed with finance.',
      record: 'Reconciliation of terms, reported days payable and actual settlement, with the financed share shown.',
      pitfall: 'Reporting a working capital gain produced partly by a bank facility as though it were supplier credit.'
    },
    { title: 'Check the disclosure obligations that apply', role: 'Finance Business Partner',
      desc: 'Where the business operates in jurisdictions with prompt payment reporting or payment practice disclosure, identify who owes what, and confirm procurement supplies the underlying data. The obligation is usually owned by a legal or finance role and fed by procurement records, which is where it silently fails.',
      control: 'Each disclosure obligation has a named owner and a stated procurement input.',
      record: 'Disclosure register with jurisdictions, obligations, owners and data sources.',
      pitfall: 'Assuming a legal team can produce payment-behaviour disclosures without the category data that supports them.'
    },
    { title: 'Measure the supply base effect', role: 'Category Manager',
      desc: 'Track participation by supplier size, and watch the indicators that follow a financing burden: quote rates from smaller vendors, delivery and service decline, dispute volume, and exit. If the smaller vendors are not participating, ask whether they can afford to.',
      control: 'Participation is reported by supplier size band, and a fall in smaller-vendor engagement is investigated rather than accepted.',
      record: 'Participation and supply base health report per category.',
      pitfall: 'Reading a high participation rate as satisfaction, when it can equally mean there was no alternative.'
    },
    { title: 'Keep the programme out of the savings total', role: 'Finance Business Partner',
      desc: 'Classify financing effects as cash actions, not savings, in every report. Where the buyer takes a discount for paying early, that is a cost reduction against the invoice; where a supplier settles early through a facility, that is a financing choice with no effect on what the goods cost.',
      control: 'Savings reporting excludes term and financing effects, and the classification is agreed with finance before publication.',
      record: 'Classification note showing which effects sit where.',
      pitfall: 'Booking a financing programme as a category saving, which is the same error as booking a term extension as one and produces the same loss of credibility.'
    },
    { title: 'Publish the term and the behaviour', role: 'Head of Procurement',
      desc: 'Tell suppliers what the term is, what the programme costs them, and how payment actually runs. Suppliers price uncertainty more heavily than delay, and a stated position with a measured record is cheaper for both sides than a longer term nobody understands.',
      control: 'Payment behaviour is published internally and described to suppliers in plain terms, with a route to raise a dispute.',
      record: 'Supplier payment statement and the internal payment behaviour report.',
      pitfall: 'Leaving payment performance to be inferred from silence, which is read as weakness by a supplier and priced accordingly.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'Terms move to Net 90 and a supply chain finance facility is launched in the same quarter. Participation is described as optional.',
      q: 'What evidence would show whether it is genuinely optional?',
      options: [
        { text: 'The supplier agreement states that participation is voluntary.', isCorrect: false, rationale: 'Necessary and weak. Coercion in these arrangements usually arrives through payment sequencing, dispute handling or renewal behaviour rather than through the contract wording.' },
        { text: 'Measured outcomes for suppliers who decline: are they paid on the agreed term, on time, with no effect on award decisions - and does any category plan assume participation?', isCorrect: true, rationale: 'Correct. Voluntariness is a property of what happens to people who say no. If non-participants are paid late, chased less, or quietly de-prioritised, the programme is a term extension financed by the supplier with an extra step.' },
        { text: 'The participation rate is high.', isCorrect: false, rationale: 'A high rate is equally consistent with a good offer and with no alternative, so it does not answer the question.' },
        { text: 'The financier confirms the pricing is transparent.', isCorrect: false, rationale: 'Relevant to cost and not to choice. Transparent pricing of an unavoidable option is still unavoidable.' }
      ],
      principle: 'Voluntary means what happens to the supplier who declines. Measure that, or do not describe the programme as optional.',
    },
    {
      type: 'scenario',
      context: 'Days payable outstanding is 88 days against Net 90 terms. A large share of invoices was settled at day 20 through the financing facility.',
      q: 'What does the metric actually say?',
      options: [
        { text: 'Payment discipline is excellent.', isCorrect: false, rationale: 'It says the reported measure and the cash reality have separated. For the settled invoices, the financing burden moved to a bank rather than being carried by the supplier.' },
        { text: 'The reported figure describes supplier credit while part of the position is a bank facility, and the classification and disclosure consequences need to be checked.', isCorrect: true, rationale: 'Correct. That gap is exactly what external reviewers look for, because trade payables and debt are different things with different treatment. The internal answer needs the financed share shown separately.' },
        { text: 'The working capital target has been met.', isCorrect: false, rationale: 'It may have been met in the line item and not in the substance, which is the version that gets corrected from outside.' },
        { text: 'The financier is carrying the term, so suppliers have lost out.', isCorrect: false, rationale: 'Not necessarily; suppliers who chose early settlement may have gained. The finding is about the metric, not about who won.' }
      ],
      calcWork: 'Reported 88 days against agreed 90 looks like near-perfect discipline. If a material share settled at day 20 through a facility, the average economic payment date is far earlier than the reported figure implies.',
      principle: 'Days payable measures who is shown as financing you. When a facility sits in the middle, the number needs a second line.',
    },
    {
      type: 'scenario',
      context: 'A category plan includes a cash benefit from the new financing programme as part of its savings target.',
      q: 'What should happen?',
      options: [
        { text: 'Include it, since the cash benefit is real.', isCorrect: false, rationale: 'The cash effect is real and it is not a saving. Booking it as one is the same category of error as booking a term extension as a saving, and it is discovered in the same place.' },
        { text: 'Reclassify it as a cash action, separate from the cost line, and state which party carries the financing.', isCorrect: true, rationale: 'Correct. The programme changes when cash moves and who finances the gap; it does not change what the goods cost. Keeping the two apart is what makes the savings total defensible.' },
        { text: 'Remove the programme from the plan entirely.', isCorrect: false, rationale: 'The programme may be a good decision. The error is the classification, not the arrangement.' },
        { text: 'Split the benefit between procurement and treasury.', isCorrect: false, rationale: 'Allocation is a budgeting question and does not fix a misclassification.' }
      ],
      principle: 'Financing moves cash in time; it does not change unit cost. Keep the two ledgers apart or both lose credibility.',
    },
    {
      type: 'scenario',
      context: 'Smaller vendors in a category have stopped quoting, and the exit feedback cites cash flow.',
      q: 'What is the most useful procurement response?',
      options: [
        { text: 'Ask the remaining suppliers to quote more competitively to cover the gap.', isCorrect: false, rationale: 'This treats a symptom and pushes the same pressure onto the vendors who remain, which is how the effect spreads.' },
        { text: 'Review the term and the financing participation for that segment, and test whether the smaller vendors could afford the programme or the term.', isCorrect: true, rationale: 'Correct. Cash flow feedback from small vendors is a measurement of the term and of who can access the financing that offsets it. The fix may be a shorter term for that segment, which is a deliberate and cheap decision compared with losing the source.' },
        { text: 'Note the market condition in the next category review.', isCorrect: false, rationale: 'A description rather than a response, and it will be repeated next year with fewer vendors.' },
        { text: 'Extend payment terms further to improve cash and attract new entrants.', isCorrect: false, rationale: 'This is the action most likely to have caused the exit, applied again.' }
      ],
      principle: 'When small vendors cite cash flow, they are describing your terms. Segmenting the term is usually cheaper than replacing the source.',
    },
    {
      type: 'scenario',
      context: 'A jurisdiction introduces mandatory disclosure of payment terms and behaviour towards smaller suppliers.',
      q: 'What is the procurement role?',
      options: [
        { text: 'None: it is a legal filing.', isCorrect: false, rationale: 'The filing is legal, and the data is procurement data - agreed terms, actual payment dates, and the position per supplier. A disclosure built without that is either wrong or impossible.' },
        { text: 'Own the underlying data and the behaviour it reveals: agreed terms, actual payment performance, and the gap, with actions where the gap is adverse.', isCorrect: true, rationale: 'Correct. Disclosure rules change the cost of a quiet payment lag, because it becomes published. Procurement owns the term and the relationship, so it owns both the data and the improvement.' },
        { text: 'Shorten all terms to be safe.', isCorrect: false, rationale: 'A reaction rather than a decision. Where the behaviour is already good, disclosure costs nothing; where it is not, shortening everything forfeits a legitimate financing position.' },
        { text: 'Ask suppliers to confirm they are satisfied.', isCorrect: false, rationale: 'A supplier statement obtained by the party being assessed is not the data the rule asks for.' }
      ],
      principle: 'Payment disclosure turns an internal habit into a public number. The function that owns the term owns the data and the fix.',
    }
  ],

  relSop: 'sop-supplier-performance-management',
  rel: {
    concepts: ['payment-terms', 'working-capital', 'supplier-financial-risk', 'procurement-ethics', 'conflict-of-interest', 'supplier-relationship-management'],
    sops: ['sop-supplier-performance-management', 'sop-contract-review', 'sop-procurement-audit', 'sop-savings-validation'],
    checklists: ['cl-supplier-risk-review', 'cl-procurement-audit', 'cl-contract-review'],
    templates: ['tpl-supplier-risk-assessment', 'tpl-business-case', 'tpl-contract-review-checklist'],
    calcs: ['calc-payment-terms', 'calc-multi-year-contract-cost', 'calc-fx-currency'],
    decisions: ['supplier-financial-risk', 'renew-vs-resource', 'approve-exception'],
    kpis: ['kpi-working-capital-impact', 'kpi-supplier-concentration', 'kpi-roi'],
    glossary: ['gloss-working-capital', 'gloss-ebitda', 'gloss-cost-to-serve']
  },
  labMission: {
    title: 'Mission 19.3: Who Is Financing You',
    desc: 'Find out which structure your payment arrangements actually use, and produce the three numbers that describe your position honestly.',
    tasks: [
      'Write down agreed terms, reported days payable and actual average payment date for one category, and explain any gap between them.',
      'Identify which suppliers have access to a financing programme and what would happen to a supplier who declined it.',
      'Check whether any jurisdiction you operate in requires payment practice disclosure, and name who owns the data.'
    ],
    ctaLabel: 'Open Payment Terms Calculator',
    ctaHref: '#/calc/calc-payment-terms',
    secondaryLabel: 'Open Procurement Audit SOP',
    secondaryHref: '#/sop/sop-procurement-audit'
  }
});
