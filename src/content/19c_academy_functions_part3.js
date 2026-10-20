/* ==========================================================
   Procure Sherpa v2.0 - Academy Content Part 3
   Modules 5, 6, 7 & 8: Negotiation, Commercial Terms,
   Contracting, P2P & 3-Way Matching, SRM, and Savings Realization
   ========================================================== */
PS.ACADEMY_FUNCTIONS = PS.ACADEMY_FUNCTIONS || [];

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-negotiation-strategy',
  title: 'Negotiation Planning & Strategy (BATNA & ZOPA)',
  module: 'Module 5: Negotiation Strategy & Commercial Terms',
  kicker: 'Function 5.1',
  tagline: 'Securing superior commercial agreements through disciplined preparation, not theatrical bluffing.',
  desc: 'Learn how to determine your Best Alternative to a Negotiated Agreement (BATNA), map the Zone of Possible Agreement (ZOPA), structure concession matrices, and execute collaborative win-win deals.',
  duration: '22 mins',
  lifecycleStage: 'Stage 13: Commercial Negotiation',
  lifecycleDesc: 'The high-stakes phase where commercial value, risk allocations, and contractual terms are finalized.',
  
  what: 'Procurement negotiation is the structured dialogue between buyer and seller aimed at reaching an agreement on price, service levels, risk allocation, payment terms, and governance. 80% of negotiation success occurs in pre-meeting preparation, not across the table.',
  why: [
    'A disciplined negotiator captures quantifiable cost reductions and contract protections without damaging supplier relationships.',
    'Prevents concession bleeding: giving away valuable commercial terms without demanding reciprocal value in return.',
    'Knowing your walk-away point (BATNA) gives you psychological confidence and prevents making bad deals under artificial pressure.'
  ],
  when: [
    'Following quotation evaluation and shortlisting to finalize the preferred vendor agreement.',
    'During annual contract renewals or when addressing unverified supplier price increase notices.',
    'When resolving contractual claims, scope disputes, or performance defaults.'
  ],
  raci: [
    { role: 'Lead Commercial Negotiator', resp: 'Procurement Specialist who leads the meeting, enforces the concession matrix, and controls the room.' },
    { role: 'Technical Lead', resp: 'Validates technical feasibility; speaks only on engineering facts as designated by the Lead Negotiator.' },
    { role: 'Executive Sponsor', resp: 'Authorizes the walk-away threshold (BATNA) and signs the final negotiated agreement.' },
    { role: 'Supplier Commercial Team', resp: 'Presents supplier proposals, tests buyer resolve, and seeks margin protection.' }
  ],
  inputs: [
    'Normalized Bid Comparison Matrix and Should-Cost breakdown models.',
    'Documented BATNA (e.g. credible alternative supplier quote, extending existing contract, in-sourcing).',
    'Concession Trade-Off Matrix (High value to supplier, low cost to buyer).'
  ],
  outputs: [
    'Written Negotiation Plan & Strategy Charter.',
    'Agreed Memorandum of Understanding (MOU) or Heads of Terms.',
    'Documented Savings Realization Log signed by both parties.'
  ],
  controls: [
    'Rehearsal / Role-play: multi-person negotiation teams must hold a strategy dry run before meeting the supplier.',
    'Strict role discipline: technical stakeholders must agree beforehand not to reveal internal budget numbers or give away free concessions.',
    'Four-eyes approval on final agreed commercial terms before contract signature.'
  ],
  mistakes: [
    'Walking into a negotiation without a credible alternative (BATNA), leaving you at the mercy of the supplier.',
    'Focusing exclusively on price: ignoring payment terms, warranties, SLA penalties, and intellectual property.',
    'Making unilateral concessions without demanding a trade-off ("If you give me X, I will give you Y").'
  ],
  bestPractices: [
    'Always know your three numbers: Target Price (realistic goal), Aspiration Price (best-case stretch), and Walk-Away Point (BATNA threshold).',
    'Expand the pie using tradeable currencies: trade longer contract tenure or faster payment terms in exchange for lower unit prices.',
    'Silence is power: when the supplier makes a proposal, pause for 5 to 7 seconds before speaking to allow psychological space for them to soften.'
  ],
  terms: [
    { term: 'BATNA (Best Alternative to a Negotiated Agreement)', def: 'The course of action you will take if negotiations fail completely. Your BATNA determines your true bargaining power.' },
    { term: 'ZOPA (Zone of Possible Agreement)', def: 'The overlapping financial range between the buyer\'s maximum budget and the seller\'s minimum acceptable price.' },
    { term: 'Concession Matrix', def: 'A pre-planned list of commercial trades ranked by cost to you vs value to the other party.' }
  ],
  thinkingPoints: [
    {
      quote: 'The party with the best alternative always holds the ultimate leverage in the room.',
      explanation: 'You do not negotiate with your mouth; you negotiate with your alternatives. If you have two other qualified suppliers waiting in the wings who can deliver at a fair price, you have immense power. If the supplier knows you cannot switch and have no alternatives, no amount of clever speaking will save you.',
      realWorldExample: 'A bank was renegotiating an $8M core software license. The incumbent software giant demanded a 20% price hike, believing the bank could never switch. Procurement spent 3 months quietly certifying a competitive cloud alternative (building a rock-solid BATNA). When procurement calmly tabled the alternative plan during negotiations, the software giant immediately dropped the 20% hike and granted a 10% discount to preserve the account.',
      reflectionPrompt: 'Before your next negotiation, write down: "What will happen if we walk away from this table today with zero agreement?"'
    }
  ],
  sopSteps: [
    {
      title: 'Information Gathering & Alternative Reality (BATNA)',
      role: 'Procurement Specialist',
      desc: 'Assemble should-cost teardowns, benchmark pricing, and determine your quantified walk-away alternative (BATNA).',
      control: 'Verify that the alternative option is genuinely feasible and acceptable to operations.',
      record: 'Pre-Negotiation Strategy Plan.',
      pitfall: 'Bluffing about having an alternative when the supplier knows you have nowhere else to go.'
    },
    {
      title: 'Concession Matrix & Team Roles Alignment',
      role: 'Lead Negotiator & Stakeholders',
      desc: 'Define roles (Lead Negotiator, Technical Scribe, Commercial Analyst); plan trades (e.g. trade 2-year contract extension for 6% discount).',
      control: 'Explicitly instruct technical team members not to negotiate or agree to anything without lead approval.',
      record: 'Concession Matrix Table.',
      pitfall: 'A technical stakeholder speaking out of turn and saying: "Don\'t worry, we have plenty of budget left."'
    },
    {
      title: 'Execution, Closing & Written Confirmation',
      role: 'Lead Negotiator',
      desc: 'Conduct the session using structured pacing; document agreed points in real-time; issue formal meeting minutes within 24 hours.',
      control: 'Both parties initial agreed commercial points at the close of the meeting.',
      record: 'Signed Heads of Terms / Agreed Term Sheet.',
      pitfall: 'Leaving the meeting without written agreed notes, allowing the supplier to re-negotiate points the next week.'
    },
    {
      "title": "Establish the Reservation Price and the BATNA",
      "role": "Category Manager",
      "desc": "Calculate the walk-away price from the cost of the alternative, including switching cost, dual-running and the risk of not having a supply, and identify what you would actually do if the deal fails.",
      "control": "The BATNA is tested for executability, and any alternative that has not been scoped or costed is recorded as theoretical rather than counted as leverage.",
      "record": "Negotiation mandate with the reservation price, the cost of the alternative and the walk-away conditions.",
      "pitfall": "Counting a theoretical alternative as leverage, and then discovering mid-session that it is not one."
    },
    {
      "title": "Build the Concession Matrix and the Agenda",
      "role": "Category Manager",
      "desc": "List what you can give, what it is worth to you, and what you will ask for each item in exchange, then sequence the agenda so the trades are made in the right order.",
      "control": "Every concession is conditional and priced before the session, and nothing is given without something coming back for it.",
      "record": "Concession matrix with the value of each item and the position taken, plus the signed negotiation mandate.",
      "pitfall": "Giving a concession to build goodwill, and receiving nothing for it, which teaches the supplier that concessions are free."
    }
 ],
  quizzes: [
    {
      type: 'scenario',
      context: 'You are negotiating a facility services contract. Your Target Price is $400,000. Your absolute walk-away budget limit is $440,000 (your BATNA is renewing the incumbent for $440,000). The new supplier opens with an initial demand of $480,000, but confides their bottom-line acceptable price is $420,000.',
      q: 'What is the Zone of Possible Agreement (ZOPA) in this negotiation?',
      options: [
        {
          text: 'Between $420,000 and $440,000.',
          isCorrect: true,
          rationale: 'Correct! The ZOPA is the overlap where a deal is mutually beneficial: from the seller\'s minimum ($420,000) to the buyer\'s maximum walk-away limit ($440,000). Any agreement within this $20,000 band creates a deal.'
        },
        {
          text: 'Between $400,000 and $480,000.',
          isCorrect: false,
          rationale: 'Incorrect. That is the outer spread between opening positions, not the true ZOPA.'
        },
        {
          text: 'There is no ZOPA because the seller asked for $480,000.',
          isCorrect: false,
          rationale: 'Opening demands are rarely bottom-line limits.'
        }
      ],
      principle: 'A ZOPA exists when the buyer\'s reservation price is higher than the seller\'s reservation price.'
    },
    {
      type: 'mcq',
      q: 'During a tense contract negotiation, the supplier agrees to reduce their price by $50,000, but immediately demands: "In return, you must change the payment terms from Net 60 to Net 30." What is the fundamental procurement rule of concessions?',
      options: [
        {
          text: 'Always refuse any change to payment terms automatically.',
          isCorrect: false,
          rationale: 'Payment terms are a valid commercial trade; calculate the financial trade-off.'
        },
        {
          text: 'Evaluate the commercial trade-off: calculate the cost of working capital for Net 30 vs Net 60; if the $50,000 price cut exceeds the working capital cost, accept the trade-off and secure the deal.',
          isCorrect: true,
          rationale: 'Correct! Professional procurement uses payment terms as a tradeable currency. If 30 days of cash costs the company $4,000 at current interest rates, trading it for a $50,000 price cut generates $46,000 in net enterprise value.'
        },
        {
          text: 'Demand that the supplier cut another $50,000 for free.',
          isCorrect: false,
          rationale: 'Unrealistic greed breaks the negotiation and loses the $50,000 gain.'
        }
      ],
      principle: 'Every concession must be a trade: give what is cheap to you and valuable to them, to get what is valuable to you and cheap to them.'
    },
    {
      "type": "scenario",
      "context": "A supplier has quoted 118.50 against a 100.00 contract price, citing an 8 percent material index increase. The buyer has no cost breakdown, has not seen the index, and has a 30-day acceptance window. What is the strongest opening position?",
      "q": "What should the buyer do?",
      "options": [
        {
          "text": "Accept the increase, because an 8 percent material index increase is plausible and the buyer has no evidence to contest it.",
          "isCorrect": false,
          "rationale": "Conceding without evidence is the most expensive possible response, because it sets the reference point for the next increase and removes the supplier's incentive to ever provide a breakdown. Plausibility is not evidence: the index may apply, may not apply to this material, or may be measured on a base period that does not match the contract. The window length makes this worse, not better, because an unchallenged accepted increase becomes the baseline for the next one."
        },
        {
          "text": "Accept the increase in principle but withhold agreement, and request the cost breakdown, the index reference and the base period, with a stated deadline before the acceptance window closes.",
          "isCorrect": true,
          "rationale": "This is the right opening because it changes the information position without changing the commercial position. You are not refusing the increase, you are refusing to agree it without the evidence that lets you judge it, and the request is specific: the breakdown, the index, the base period, the contract clause. Doing it inside the acceptance window, with a stated deadline, protects the supply relationship and your contractual position while giving the supplier a clear route to a resolution. The unevidenced element is then a negotiation, not an assumption."
        },
        {
          "text": "Reject the increase outright and state that the contract price is fixed, because a 30-day window is too short to reopen price.",
          "isCorrect": false,
          "rationale": "If the contract has an escalation clause that permits the increase on evidenced index movement, a flat refusal is not a strong position, it is a position that will be tested and may end in escalation or dispute. If the contract has no such clause, then the price is fixed and the refusal is correct. The buyer's first task is to read the clause, not to take a position before knowing what the contract says."
        },
        {
          "text": "Accept the increase but ask for the evidence afterwards, so the supply is not interrupted.",
          "isCorrect": false,
          "rationale": "This is the \"accept now, verify later\" pattern, and it is how an unevidenced increase becomes permanent. The evidence, once accepted, is no longer required; the supplier has no obligation to provide it after the fact, and the buyer has already given away the leverage that would have made it provided. If you are going to accept without evidence, at least record that you did so and on what basis, so that the next increase starts from a known position rather than a manufactured one."
        }
      ],
      "principle": "Do not agree an increase you cannot evaluate. Ask for the evidence inside the window, with a deadline."
    },
    {
      "type": "mcq",
      "q": "A BATNA in negotiation planning is:",
      "options": [
        {
          "text": "The best alternative you would accept if the deal with this supplier does not happen.",
          "isCorrect": true,
          "rationale": "A BATNA is your alternative to agreement, and its strength determines your negotiating position: the better your alternative, the less you need this deal and the more you can hold out for. The practical test is whether you could actually execute it, because a BATNA that is theoretical gives you no leverage at all, and a BATNA that is strong enough to walk away is the reason you never have to."
        },
        {
          "text": "The first offer you intend to make, anchored against the market price.",
          "isCorrect": false,
          "rationale": "That is an anchor, which is a different and related thing. The anchor is the position you open with and try to justify; the BATNA is the position you fall back to. They interact, and it is a mistake to set your first offer as low as your fallback, because you will end up negotiating against yourself."
        },
        {
          "text": "The zone of possible agreement between the two parties, expressed as a range.",
          "isCorrect": false,
          "rationale": "That is the ZOPA. The ZOPA is the space you are trying to find, the BATNA is what you do if there is no ZOPA, and the reservation price is the point inside your own range below which you walk. Keeping the three distinct is what stops a negotiation from being run on optimism about where the other side will land."
        },
        {
          "text": "The list of concessions you are prepared to trade, ranked by cost to you.",
          "isCorrect": false,
          "rationale": "That is a concession matrix, and it is an important tool, but it is not a BATNA. A concession matrix is what you offer in exchange for something; a BATNA is what you do instead of agreeing. Confusing them produces a negotiation in which you trade concessions away without ever having established that walking away was realistic."
        }
      ],
      "principle": "The BATNA is your alternative to agreement, and its real strength sets your negotiating position. Know it before you sit down."
    }
 ],
  relSop: 'sop-negotiation-preparation',
  rel: {
    concepts: ['negotiation-planning', 'batna', 'zopa', 'negotiation-leverage'],
    sops: ['sop-negotiation-preparation'],
    checklists: ['cl-negotiation', 'cl-negotiation-closeout'],
    templates: ['tpl-negotiation-planner', 'tpl-negotiation-agenda', 'tpl-negotiation-concession-log'],
    calcs: ['calc-negotiation-savings'],
    decisions: ['negotiate-or-accept'],
    kpis: ['kpi-savings']
  },
  labMission: {
    title: 'Mission 12: Calculate Negotiation Savings & Concession Value',
    desc: 'Use the Negotiation Savings Calculator to model opening positions, target prices, and concession movements.',
    tasks: [
      'Open the Negotiation Savings Calculator.',
      'Enter baseline supplier quotes, your target positions, and final negotiated figures.',
      'Review hard cost reduction vs cost avoidance metrics for executive reporting.'
    ],
    ctaLabel: 'Launch Negotiation Calculator',
    ctaHref: '#/calc/calc-negotiation-savings',
    secondaryLabel: 'Open Negotiation Template',
    secondaryHref: '#/tpl/tpl-neg-plan'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-commercial-terms',
  title: 'Commercial Terms Optimization (Payment Terms & MOQs)',
  module: 'Module 5: Negotiation Strategy & Commercial Terms',
  kicker: 'Function 5.2',
  tagline: 'Unlocking millions in free working capital through terms engineering.',
  desc: 'Learn how to optimize payment terms (Net 30 vs Net 60 vs Net 90), evaluate dynamic early payment cash discounts (2/10 Net 30), and balance Minimum Order Quantities (MOQs) against inventory carrying costs.',
  duration: '18 mins',
  lifecycleStage: 'Stage 14: Commercial Terms Optimization',
  lifecycleDesc: 'Aligns contract terms with corporate treasury, cash flow, and working capital strategies.',
  
  what: 'Commercial terms optimization is the strategic calibration of payment schedules, early payment discounts, order batch sizes (MOQs), and price tiers to minimize enterprise working capital requirements and maximize Return on Capital Employed (ROCE).',
  why: [
    'Extending Days Payable Outstanding (DPO) from Net 30 to Net 60 generates millions in free cash flow without taking on external bank debt.',
    'Early payment discounts (e.g. 2/10 Net 30) represent an annualized return of over 36%, which is higher than almost any corporate treasury investment.',
    'Prevents inventory write-downs: high Minimum Order Quantities (MOQs) tie up cash in warehouses and risk obsolescence.'
  ],
  when: [
    'When finalizing master services agreements and volume purchase contracts.',
    'During company-wide working capital and cash preservation programs directed by the CFO.',
    'When ordering seasonal or fast-depreciating inventory items.'
  ],
  raci: [
    { role: 'Procurement Specialist', resp: 'Negotiates payment terms, early discount clauses, and volume break tiers.' },
    { role: 'Corporate Treasury / Finance', resp: 'Sets corporate standard payment terms (e.g. Net 60) and hurdle rates for cash discounts.' },
    { role: 'Supply Chain / Inventory Lead', resp: 'Calculates inventory holding costs (typically 15% to 25% per year) to evaluate MOQs.' },
    { role: 'Suppliers', resp: 'Balances their own cash flow requirements against buyer payment terms.' }
  ],
  inputs: [
    'Corporate standard payment term policy and Weighted Average Cost of Capital (WACC).',
    'Supplier proposed pricing, payment terms, and early discount options.',
    'Inventory carrying cost percentage (capital cost, warehousing, insurance, obsolescence).'
  ],
  outputs: [
    'Payment Terms Financial Value Analysis.',
    'Economic Order Quantity (EOQ) vs MOQ Trade-Off Model.',
    'Approved Commercial Terms Schedule in the Contract.'
  ],
  controls: [
    'Treasury approval required for any contract deviating from standard corporate payment terms (e.g. granting Net 15 or advance payments).',
    'Early payment discounts must be systematically captured in Accounts Payable via automated ERP payment runs.',
    'Audit verification of invoice payment timing: ensuring the company pays on day 60, not day 15, under Net 60 terms.'
  ],
  mistakes: [
    'Negotiating a 1% price cut while conceding to Net 15 payment terms from Net 60, destroying net working capital value.',
    'Failing to capture early payment discounts because Accounts Payable processes invoices too slowly.',
    'Buying a 3-year supply of goods just to hit an MOQ discount, only for the product to expire in the warehouse.'
  ],
  bestPractices: [
    'Always use the Annualized Return Formula to evaluate discounts: Annualized Return = [Discount % / (100 - Discount %)] &times; [365 / (Standard Days - Discount Days)].',
    'Negotiate tiered MOQs: allow smaller delivery batches while aggregating annual volume to maintain the tier discount.',
    'Standardize on Net 60 or Net 90 for large enterprise suppliers who have easy access to cheap commercial paper.'
  ],
  terms: [
    { term: '2/10 Net 30', def: 'Buyer receives a 2% cash discount if the invoice is paid within 10 days; otherwise the full gross amount is due in 30 days.' },
    { term: 'Days Payable Outstanding (DPO)', def: 'A financial ratio measuring the average number of days a company takes to pay its suppliers.' },
    { term: 'Holding Cost of Inventory', def: 'The total cost of keeping inventory in stock (cost of money, warehouse space, shrinkage, damage, insurance).' }
  ],
  thinkingPoints: [
    {
      quote: 'A 2% price reduction accompanied by Net 15 payment terms can destroy more corporate cash flow than the discount saved.',
      explanation: 'Cash is the lifeblood of business. If an enterprise with a high cost of capital pays invoices in 15 days instead of 60 days, it must borrow cash from banks to fund operations. Great procurement specialists look at the total commercial picture: unit price, payment velocity, and inventory carrying costs, not just the invoice number.',
      realWorldExample: 'A retail chain was offered a 2/10 Net 60 discount by their beverage distributor on $50M of annual spend. Procurement calculated the annualized return: [2 / 98] x [365 / 50] = 14.9% annualized return. Since the company could borrow cash at 5%, they borrowed to pay in 10 days, netting an annual free profit of $745,000 pure cash directly to the bottom line.',
      reflectionPrompt: 'Does your company take advantage of cash discounts, or does Accounts Payable pay invoices at Net 30 regardless of terms?'
    }
  ],
  sopSteps: [
    {
      title: 'Payment Terms Policy Alignment',
      role: 'Procurement Specialist',
      desc: 'Verify corporate standard payment baseline (e.g. Net 60); evaluate supplier cash discount proposals against Treasury hurdle rates.',
      control: 'Require formal CFO/Treasury waiver for terms under Net 45.',
      record: 'Commercial Terms Analysis Sheet.',
      pitfall: 'Agreeing to Net 15 terms on paper when the ERP system only runs payment batches once a month.'
    },
    {
      title: 'MOQ & Inventory Carrying Analysis',
      role: 'Procurement Specialist & Inventory',
      desc: 'Compare supplier Minimum Order Quantity against annual consumption and inventory holding cost (20%/year).',
      control: 'Confirm shelf-life and obsolescence risk with operations before committing to large bulk batches.',
      record: 'EOQ / MOQ Trade-Off Model.',
      pitfall: 'Buying 5,000 units of custom packaging to save $0.10/unit, only for the company logo to change 6 months later.'
    },
    {
      title: 'Contractual Incorporation & AP Setup',
      role: 'Procurement Specialist',
      desc: 'Insert finalized commercial terms into Master Agreement; ensure vendor master record in ERP reflects agreed terms accurately.',
      control: 'Audit sample of first 3 invoices to confirm payment terms were entered correctly in Accounts Payable.',
      record: 'Vendor Master ERP Configuration Sign-Off.',
      pitfall: 'Negotiating Net 60 in the contract, but AP leaves the vendor master at default Net 30 in the system.'
    },
    {
      "title": "Value the Working Capital Effect at Your Cost of Capital",
      "role": "Category Manager",
      "desc": "Calculate the cash released or absorbed by the terms against the invoice value and the days of difference, and value it at the organization's cost of capital.",
      "control": "The cost of capital used is the one set in Settings or entered on the face of the analysis, and the working capital effect is shown separately from the price.",
      "record": "Working capital analysis with the cash released, the days, the cost of capital and the annualised value.",
      "pitfall": "Treating the terms as a concession and booking the benefit without the cash cost of the funding, which is the whole cost of the concession."
    },
    {
      "title": "Assess the Counterparty and the Exposure Alongside the Terms",
      "role": "Procurement Specialist",
      "desc": "Assess the supplier's financial position and the size of the receivable exposure relative to the supplier's turnover, before accepting a longer term.",
      "control": "The receivable exposure is within the limit set for that supplier's risk rating, and the assessment is dated and recorded.",
      "record": "Exposure assessment with the risk rating, the exposure ratio and the approved terms.",
      "pitfall": "Extending terms to a financially weak supplier to win a price concession, converting a price problem into a credit exposure."
    }
 ],
  quizzes: [
    {
      type: 'calc',
      context: 'A supplier offers payment terms of "2/10 Net 30" on a $100,000 invoice. This means you can pay $98,000 on Day 10 (saving $2,000), or pay the full $100,000 on Day 30.',
      q: 'What is the annualized interest return rate of capturing this 2% discount (paying 20 days earlier)?',
      options: [
        {
          text: '37.24% annualized return.',
          isCorrect: true,
          rationale: 'Correct! Formula: [2 / 98] x [365 / 20] = 0.0204 x 18.25 = 37.24% annualized return. This is an enormous return on capital that vastly outperforms corporate treasury yields. Paying on Day 10 is an exceptional financial decision!'
        },
        {
          text: '2.00% annualized return.',
          isCorrect: false,
          rationale: '2% is the raw discount for only 20 days of time, not the annualized rate.'
        },
        {
          text: '12.50% annualized return.',
          isCorrect: false,
          rationale: 'Check the mathematical formula: (365 / 20) x 2.04%.'
        }
      ],
      calcWork: 'Annualized Discount Formula:\nRate = [Discount % / (100 - Discount %)] x [365 / (30 - 10)]\nRate = [2 / 98] x [365 / 20]\nRate = 0.020408 x 18.25 = 37.24% annualized return.',
      principle: 'Early payment cash discounts provide massive annualized investment returns. Capturing them is one of procurement\'s most direct cash-generating powers.'
    },
    {
      type: 'scenario',
      context: 'A supplier offers a 10% unit price discount if you double your order size from 500 units to a Minimum Order Quantity (MOQ) of 1,000 units. However, your warehouse space is full, holding costs are 25% per year, and the product undergoes a technology revision every 9 months.',
      q: 'What is the professional recommendation regarding this MOQ discount?',
      options: [
        {
          text: 'Reject the 1,000 unit MOQ discount because the 25% annual carrying cost and high obsolescence risk will cost far more than the 10% unit price saving.',
          isCorrect: true,
          rationale: 'Correct! Holding 1,000 units means holding 18 months of supply for a product that revises in 9 months. You will end up scrapping obsolete inventory at a total loss. Never take an MOQ discount that creates dead inventory.'
        },
        {
          text: 'Accept immediately because 10% unit cost reduction is guaranteed savings.',
          isCorrect: false,
          rationale: 'The inventory holding cost and obsolescence will wipe out the savings multiple times over.'
        },
        {
          text: 'Order 10,000 units to see if you can get a 50% discount.',
          isCorrect: false,
          rationale: 'This will fill the warehouse with dead inventory and cause immense write-offs.'
        }
      ],
      principle: 'Balance purchase price discounts against inventory carrying costs and product obsolescence lifespans.'
    },
    {
      "type": "scenario",
      "context": "A supplier offers 2/10 net 30 on a 500,000 annual spend, against the buyer's standard net 60. The buyer's cost of capital is 9 percent. What is the annualised value of the discount?",
      "q": "What is the correct calculation?",
      "options": [
        {
          "text": "About 36 percent, because a 2 percent discount for paying 20 days early is worth roughly 36 percent annualised.",
          "isCorrect": true,
          "rationale": "The arithmetic: paying on day 10 rather than day 30 gets 2 percent off 20 days earlier, so the effective rate is 2 percent over 20/365 of a year, which annualises to roughly 36 percent. That is far above any plausible cost of capital, which is why early-payment discounts are usually worth taking. The comparison has to be against the cost of money, and 36 percent against 9 percent is decisive. The discount also has to be tested against the cash effect: paying on day 10 rather than day 60 puts 50 days of cash back into the business at the same time."
        },
        {
          "text": "2 percent, because that is the discount stated on the invoice.",
          "isCorrect": false,
          "rationale": "That is the nominal rate, and it is not comparable with anything. A discount has to be expressed in the same terms as the alternatives: 2 percent for 20 days of early payment, or 2 percent for 120 days of extended terms, are completely different offers that both look like \"2 percent\" on the paperwork. Always convert to a rate the reader can compare, and always compare it against the cost of capital rather than against a nominal percentage."
        },
        {
          "text": "2 percent of 500,000, which is 10,000 a year.",
          "isCorrect": false,
          "rationale": "That is the cash amount, which is useful but is not the decision. 10,000 a year is the benefit, and the cost is the working capital released early, which on 500,000 over 50 days at 9 percent is roughly 6,000. The net is positive, and the annualised comparison against a 9 percent cost of capital is the number that makes the decision. Both the cash benefit and the working capital effect belong in the analysis, and the decision is the difference between them, not the benefit alone."
        },
        {
          "text": "About 0.5 percent, because 2 percent over 20 days is a small proportion of a year.",
          "isCorrect": false,
          "rationale": "The arithmetic is inverted: 2 percent over 20 days annualises upward, because the money is returned for a short period many times over. Dividing rather than multiplying by 365 is the classic error, and it turns a decisive offer into one that looks trivial. When a rate is short-period, it always scales up."
        }
      ],
      "principle": "A short-period discount scales up. Compare it annualised against your cost of capital, and net it against the working capital it releases."
    },
    {
      "type": "mcq",
      "q": "The main commercial risk in accepting extended payment terms is:",
      "options": [
        {
          "text": "That the supplier will increase prices to compensate for the longer payment period.",
          "isCorrect": false,
          "rationale": "That does happen, and it is worth watching, but it is a pricing risk rather than the main risk of the terms themselves. It is also mitigable: the terms are negotiated and priced, and a supplier charging more for net 90 than net 30 is making the terms visible in the price. The risk that is harder to see and harder to fix is the balance-sheet one."
        },
        {
          "text": "That you are financing the supplier with your balance sheet, and the return is only the discount, which may be less than your cost of capital.",
          "isCorrect": true,
          "rationale": "This is the point that gets missed. Extended terms are not free: the buyer is lending the supplier money at the implied rate in the discount, and if that implied rate is below the buyer's own cost of capital, the terms are destroying value even though they feel like a concession. The analysis is simple: take the implied annualised rate from the discount and compare it with your cost of capital. If it is below, you are paying to be paid late."
        },
        {
          "text": "That the supplier will fail and the receivable will be written off.",
          "isCorrect": false,
          "rationale": "Counterparty risk on a receivable is real, and for a small supplier it is a genuine concern, but it is a credit decision rather than a terms decision, and it is handled through the supplier risk assessment and the exposure limit. The terms themselves do not change the probability of failure; they change how long the exposure sits there. Keep the two apart: assess credit on its own merits, and price the terms on their own merits."
        },
        {
          "text": "That the buyer loses negotiating leverage, because the supplier will not want to give the terms back.",
          "isCorrect": false,
          "rationale": "Leverage is a real consideration when terms are reconsidered at renewal, but it is not the main commercial risk and it is usually overestimated. A supplier who has priced extended terms into the rate knows that, and the buyer can negotiate the terms or the price as a package. The value question comes first, because a bad rate cannot be negotiated away later either."
        }
      ],
      "principle": "Extended terms are a loan to the supplier at the implied discount rate. Below your cost of capital, you are paying to be paid late."
    }
 ],
  relSop: 'sop-negotiation-preparation',
  rel: {
    concepts: ['payment-terms', 'working-capital', 'concession-management'],
    sops: ['sop-negotiation-preparation'],
    checklists: ['cl-negotiation-closeout'],
    templates: ['tpl-negotiation-summary', 'tpl-negotiation-concession-log'],
    calcs: ['calc-payment-terms', 'calc-moq', 'calc-multi-year-contract-cost'],
    decisions: ['negotiate-or-accept'],
    kpis: ['kpi-working-capital-impact']
  },
  labMission: {
    title: 'Mission 13: Analyze Payment Terms & MOQ Breakeven',
    desc: 'Use the Payment Terms Calculator and MOQ Calculator to evaluate working capital value and inventory holding costs.',
    tasks: [
      'Open the Payment Terms Calculator.',
      'Model the annualized return of 2/10 Net 30 vs standard terms.',
      'Open the MOQ Calculator to evaluate price breaks vs inventory carrying costs.'
    ],
    ctaLabel: 'Launch Payment Terms Tool',
    ctaHref: '#/calc/calc-payment-terms',
    secondaryLabel: 'Open MOQ Calculator',
    secondaryHref: '#/calc/calc-moq'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-contract-structuring',
  title: 'Contract Structuring & Critical Legal Clauses',
  module: 'Module 6: Contracting & Governance',
  kicker: 'Function 6.1',
  tagline: 'Translating commercial agreements into legally enforceable risk shields.',
  desc: 'Master the architecture of commercial contracts: Master Services Agreements (MSAs), Statements of Work (SOWs), Service Level Agreements (SLAs), Limitation of Liability, Indemnification, Warranties, and Termination clauses.',
  duration: '22 mins',
  lifecycleStage: 'Stage 15: Contract Formulation & Legal Review',
  lifecycleDesc: 'The legal binding phase that locks negotiated commitments into enforceable commercial law.',
  
  what: 'Contract structuring is the drafting, review, negotiation, and formal execution of legally binding agreements between buyer and seller. A contract defines the obligations of each party, payment terms, performance metrics (SLAs), and the legal remedies when things go wrong.',
  why: [
    'Contracts are not written for when things go well; they are written to protect the company when things go catastrophically wrong.',
    'Caps financial liability: without a negotiated limitation of liability, a company could be sued for unlimited consequential damages if a vendor system fails.',
    'Secures intellectual property (IP): ensuring the buyer owns all custom software, designs, or data produced under the agreement.'
  ],
  when: [
    'Before issuing any purchase order for customized services, software, or capital equipment.',
    'When renewing multi-year vendor engagements.',
    'When onboarding high-risk contractors who handle sensitive company data or work on physical premises.'
  ],
  raci: [
    { role: 'Procurement Specialist', resp: 'Negotiates commercial schedules, pricing, SLAs, milestones, and operational clauses.' },
    { role: 'Legal Counsel', resp: 'Drafts, reviews, and approves legal terms (Indemnification, Liability, Governing Law, IP).' },
    { role: 'Business Owner', resp: 'Validates operational scope, service level targets, and acceptance criteria.' },
    { role: 'Authorized Signatory', resp: 'Executes the contract in accordance with corporate Delegation of Authority (DOA).' }
  ],
  inputs: [
    'Final agreed commercial term sheet / negotiation summary.',
    'Approved Scope of Work (SOW) and technical specifications.',
    'Standard Corporate Master Services Agreement (MSA) template.'
  ],
  outputs: [
    'Executed Master Services Agreement (MSA) and Statement of Work (SOW).',
    'Service Level Agreement (SLA) with service credits schedule.',
    'Contract Summary Sheet and Milestone Tracking Calendar.'
  ],
  controls: [
    'Order of Precedence clause: specifies which document governs in the event of a conflict (typically: SOW overrides MSA, or vice versa).',
    'Mandatory Limitation of Liability: liability capped at 1x to 2x contract value, with carve-outs for confidentiality breaches and gross negligence.',
    'Execution strictly by authorized corporate officers listed in the official Delegation of Authority register.'
  ],
  mistakes: [
    'Signing a supplier\'s standard "Order Form" without realizing the fine print incorporates the supplier\'s aggressive website terms by reference.',
    'Agreeing to automatic renewal clauses (evergreen contracts) with tight cancellation windows (e.g. 90-day prior written notice).',
    'Failing to secure "Termination for Convenience" rights, trapping the company in multi-year payments for services it no longer needs.'
  ],
  bestPractices: [
    'Insist on using your organization\'s standard contract template as the negotiation baseline whenever your spend leverage permits.',
    'Include clear Service Credits in the SLA: if a vendor misses their uptime target, a pre-agreed 5% to 10% credit is automatically deducted from the next invoice without going to court.',
    'Maintain a central digital contract repository with automated alerts 90, 60, and 30 days before contract expiration.'
  ],
  terms: [
    { term: 'Master Services Agreement (MSA)', def: 'An overarching contract that establishes the core legal terms governing all future project Statements of Work (SOWs).' },
    { term: 'Service Level Agreement (SLA)', def: 'A documented performance standard (e.g. 99.9% uptime, 4-hour response time) backed by financial remedies (Service Credits).' },
    { term: 'Limitation of Liability (LoL)', def: 'A contractual cap specifying the maximum dollar amount one party can recover from the other in the event of a breach or damages.' }
  ],
  thinkingPoints: [
    {
      quote: 'Contracts aren\'t written for the honeymoon when the relationship begins; they are written for the divorce when things go wrong.',
      explanation: 'When you sign a contract, everyone is smiling, shaking hands, and enthusiastic. But 18 months later, the project may be 6 months behind schedule, the key engineer has quit, and budgets are blown. That is the moment the contract is pulled out of the drawer. If your termination and liability clauses are weak, the company is trapped.',
      realWorldExample: 'A logistics firm signed a cloud dispatch contract on the vendor\'s standard paper. When the cloud server crashed for 4 days during peak holiday shipping, the company lost $1.2M in shipments. They tried to claim damages, only to discover the vendor\'s fine print capped total liability at "the fees paid in the preceding one month" ($8,000) and excluded all consequential damages. The company absorbed the entire $1.2M loss.',
      reflectionPrompt: 'Does your company allow managers to sign vendor click-through software agreements without procurement or legal review?'
    }
  ],
  sopSteps: [
    {
      title: 'Contract Drafting & Baseline Assembly',
      role: 'Procurement Specialist',
      desc: 'Assemble the corporate MSA template, append the agreed SOW, pricing schedule, and customized SLA schedules.',
      control: 'Ensure the buyer standard template is used as the negotiation baseline.',
      record: 'Draft Master Contract Dossier.',
      pitfall: 'Starting from the vendor\'s one-sided standard contract draft.'
    },
    {
      title: 'Legal & Risk Redline Review',
      role: 'Legal Counsel & Procurement Lead',
      desc: 'Review vendor redlines; negotiate liability caps, IP ownership, confidentiality, and termination for convenience clauses.',
      control: 'Formal written Legal sign-off on any deviations to standard liability or indemnity terms.',
      record: 'Contract Negotiation Redline Log.',
      pitfall: 'Accidentally giving away company IP ownership in custom software development.'
    },
    {
      title: 'Formal Execution & Contract Repository Storage',
      role: 'Authorized Officer & Procurement',
      desc: 'Execute via secure electronic signature; upload executed document to central procurement contract repository; log expiry alerts.',
      control: 'Verify that the signing officer possesses legal authority under the corporate DOA schedule.',
      record: 'Executed Contract PDF and Contract Registry Record.',
      pitfall: 'Storing the signed contract on an individual buyer\'s laptop where it is lost when they leave the company.'
    },
    {
      "title": "Classify the Exposure and the Term for Each Risk Category",
      "role": "Legal Counsel",
      "desc": "Work through the risk categories that matter for this contract: ordinary performance, confidentiality, data protection, intellectual property, personal injury, regulatory breach and financial failure, and decide the position for each.",
      "control": "Each category has a stated position, and the positions for data protection and IP are not treated as ordinary contractual risk.",
      "record": "Clause position schedule, category by category, with the fallback and the approval level for each.",
      "pitfall": "Accepting a single supplier paper clause set for every category, and then discovering that the highest-exposure category is covered by the most general term."
    },
    {
      "title": "Secure the Continuity Terms: Assignment, Step-In and Exit",
      "role": "Procurement Specialist",
      "desc": "Secure the rights that let the buyer continue to perform if the supplier fails: assignment or novation on a change of control or insolvency, step-in, continued access to data, and an exit plan with a defined format, timeline and cost.",
      "control": "The continuity terms are agreed before signature, and the exit plan names the data format, the assistance required and the cost, so that the exit is executable rather than aspirational.",
      "record": "Executed contract with the continuity and exit schedule attached.",
      "pitfall": "Leaving the exit plan to be negotiated at the point of failure, when there is no leverage and no time."
    }
 ],
  quizzes: [
    {
      type: 'red_flag',
      context: 'You review a vendor\'s draft contract for IT support services. Clause 12 reads: "This Agreement shall automatically renew for successive 3-year periods unless Customer provides written notice of non-renewal via registered mail at least 180 days prior to the expiration date. Fees for each renewal term shall increase by 12%."',
      q: 'Why is this evergreen renewal clause a severe trap for your company?',
      options: [
        {
          text: 'It is a dangerous trap: if your team misses the 180-day window by even 1 day, the company is legally locked into another 3 years of service with an unbudgeted 12% price hike!',
          isCorrect: true,
          rationale: 'Correct! Predatory automatic renewal clauses with huge advance notification windows (6 months!) and automatic price hikes are designed to trap unwary buyers. Always negotiate 30 days notice and replace automatic hikes with mutual written agreement.'
        },
        {
          text: 'It is completely safe and normal commercial practice.',
          isCorrect: false,
          rationale: 'It is extremely one-sided and a major budget risk.'
        },
        {
          text: 'Automatic renewal clauses are illegal in all 50 states.',
          isCorrect: false,
          rationale: 'They are legally binding in commercial B2B contracts unless properly negotiated out.'
        }
      ],
      principle: 'Never accept automatic evergreen renewal clauses with long notification windows and mandatory price escalations.'
    },
    {
      type: 'mcq',
      q: 'What is the purpose of a "Termination for Convenience" clause in a procurement contract?',
      options: [
        {
          text: 'It allows the buyer to terminate the contract at any time, for any reason or no reason, by giving pre-agreed written notice (e.g. 30 days), paying only for work completed up to that date.',
          isCorrect: true,
          rationale: 'Correct! This gives the company agility. If business priorities change, a product line is discontinued, or budgets are frozen, you can exit the contract cleanly without having to prove the supplier breached the agreement.'
        },
        {
          text: 'It allows the vendor to shut off services whenever they feel tired.',
          isCorrect: false,
          rationale: 'Termination for convenience is typically sought by the buyer to preserve commercial agility.'
        },
        {
          text: 'It automatically cancels the contract after 100 days.',
          isCorrect: false,
          rationale: 'It is an optional discretionary right exercised via formal written notice.'
        }
      ],
      principle: 'Always negotiate Termination for Convenience to protect the enterprise from being trapped in obsolete multi-year commitments.'
    },
    {
      "type": "scenario",
      "context": "Legal has reviewed the supplier's liability clause: the buyer's total liability is capped at 12 months of fees, and there is no carve-out for data breach, confidentiality or IP infringement. The buyer stores customer personal data through this supplier. What is the correct response?",
      "q": "What should the buyer do?",
      "options": [
        {
          "text": "Accept the cap, because a liability cap at 12 months of fees is market standard for a services contract of this size.",
          "isCorrect": false,
          "rationale": "Market standard is a reasonable reference for a generic cap, and it says nothing about the carve-outs. The two things that matter here are the carve-outs and the exposure. A cap on ordinary contractual liability is normal; a cap that also applies to a data breach, to the buyer's own confidential information, and to third-party IP claims is a different clause with a different consequence, and it is very common in supplier paper precisely because most buyers do not challenge it."
        },
        {
          "text": "Separate the cap on ordinary liability from the carve-outs, and require uncapped or super-capped liability for data breach, confidentiality and IP infringement, with indemnity and insurance behind it.",
          "isCorrect": true,
          "rationale": "This is the right structure and the standard commercial answer. Ordinary liability is capped at a multiple of fees, and the categories that are not capable of being capped at a commercial multiple, because the exposure is not proportional to the fees, are carved out. A data breach or an IP infringement claim can cost many times the annual contract value, so a fees-based cap is not a risk allocation, it is a limitation on the supplier's accountability. Behind the carve-out, you want indemnity and evidence of insurance, so that the cap is not a promise but a funded obligation."
        },
        {
          "text": "Accept the cap but require a higher cap on the price to compensate for the risk.",
          "isCorrect": false,
          "rationale": "This does not solve the problem, it prices it. A buyer who has accepted an uncapped exposure with a fees-based cap is exposed to a claim the supplier cannot satisfy, and a price adjustment does not fund a multi-million liability. The exposure is not a cost line, it is a solvency question, and the remedy is the contractual structure, not the rate. If the supplier will not provide the carve-outs, the correct response is to escalate the risk and reconsider the choice of supplier, not to buy it."
        },
        {
          "text": "Reject the clause and require unlimited liability for all breaches, since the buyer is the one carrying the customer risk.",
          "isCorrect": false,
          "rationale": "Asking for unlimited liability on everything is not a negotiating position, it is a reason for a supplier to walk. Suppliers will not offer unlimited liability for ordinary breaches, and a buyer who demands it often gets nothing. The skilled position is to accept a reasonable cap on ordinary liability, where the exposure is proportional, and reserve the uncapped or super-capped position for the categories where it is not. That is a position a supplier can accept, which is what makes it a position rather than a complaint."
        }
      ],
      "principle": "Split ordinary liability from the carve-outs. A fees-based cap is not a risk allocation where the exposure is not proportional to the fees."
    },
    {
      "type": "mcq",
      "q": "Which contractual term gives a buyer the most practical protection in a supplier insolvency?",
      "options": [
        {
          "text": "A termination for convenience clause, allowing the buyer to exit at any time.",
          "isCorrect": false,
          "rationale": "Termination for convenience is valuable and frequently mispriced, because it usually carries a compensation obligation that grows with the remaining term. In an insolvency it is also close to worthless: the supplier is insolvent, so there is nobody to pay the compensation and nobody to wind the contract down cooperatively. Its value is in the ordinary case, where the supplier is solvent and the buyer wants flexibility."
        },
        {
          "text": "An assignment or novation right, so the contract can be transferred to a successor or a replacement supplier.",
          "isCorrect": true,
          "rationale": "This is the term that does the work in an insolvency, because the buyer's practical need is to get a different supplier performing the same scope. Assignment or novation, with the buyer's consent not to be unreasonably withheld, means the contract and the goodwill move to the successor or the acquirer. A step-in right is the related mechanism that lets the buyer step in and operate the service or take the goods directly. Together, they are what makes a contract survivable when the counterparty is not."
        },
        {
          "text": "A most-favoured-customer clause, so the buyer is not paying more than anyone else.",
          "isCorrect": false,
          "rationale": "That is a pricing protection and a genuinely useful one in normal operation, but it is irrelevant in an insolvency: the counterparty no longer has prices to compare. It is also a term that mostly attracts a supplier's price increase rather than a discount, because the buyer has to share any improvement the supplier gives elsewhere, which is a one-way obligation unless it is drafted carefully."
        },
        {
          "text": "A liquidated damages clause for late delivery, so the buyer is compensated for the failure.",
          "isCorrect": false,
          "rationale": "Liquidated damages improve the outcome in a solvent failure, and they are worth having. In an insolvency, though, they are a claim against an insolvent estate, and the recovery depends on the estate's priority and the size of the remaining assets, which is exactly the situation in which contractual remedies fail. The protection that works is the one that helps you perform without the counterparty: assignment, step-in, and continued access to the data, the tooling and the knowledge."
        }
      ],
      "principle": "In an insolvency, contractual remedies are claims against an empty estate. What works is what lets you perform without the counterparty: assignment, step-in, data access."
    }
 ],
  relSop: 'sop-contract-review',
  rel: {
    concepts: ['contract-structure', 'liability-indemnity', 'service-level-agreement', 'statement-of-work'],
    sops: ['sop-contract-review'],
    checklists: ['cl-contract-review'],
    templates: ['tpl-contract-review-checklist', 'tpl-contract-review-checklist'],
    calcs: ['calc-multi-year-contract-cost'],
    decisions: ['renew-vs-resource'],
    kpis: ['kpi-contract-compliance']
  },
  labMission: {
    title: 'Mission 14: Review a Contract & SLA Checklist',
    desc: 'Use the Contract Review Checklist to audit key clauses before contract execution.',
    tasks: [
      'Open the Contract Review Checklist.',
      'Check off verification gates for limitation of liability, IP ownership, termination, and SLAs.',
      'Log audit notes and verify that sign-off complies with Delegation of Authority thresholds.'
    ],
    ctaLabel: 'Open Contract Checklist',
    ctaHref: '#/cl/cl-contract',
    secondaryLabel: 'View SLA Template',
    secondaryHref: '#/tpl'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-doa-controls',
  title: 'Delegation of Authority (DOA) & PO Value Controls',
  module: 'Module 6: Contracting & Governance',
  kicker: 'Function 6.2',
  tagline: 'Enforcing financial governance to prevent unauthorized commitments and maverick fraud.',
  desc: 'Understand how Delegation of Authority (DOA) financial thresholds, approval workflows, segregation of duties, and audit trails protect corporate treasuries from unauthorized spend.',
  duration: '16 mins',
  lifecycleStage: 'Stage 16: Approval & Delegation of Authority',
  lifecycleDesc: 'The governance checkpoint where financial commitments are authorized before purchase orders are legally dispatched.',
  
  what: 'Delegation of Authority (DOA) is the formal corporate policy specifying the monetary limits and organizational positions authorized to commit company funds, sign contracts, and approve purchase requisitions.',
  why: [
    'Prevents unauthorized employees from legally binding the enterprise to contracts it cannot afford or does not need.',
    'Enforces segregation of duties: ensuring the person who requests a purchase cannot be the sole approver of the vendor or invoice.',
    'Required by corporate governance laws (e.g. Sarbanes-Oxley / SOX), external financial auditors, and institutional investors.'
  ],
  when: [
    'Whenever a purchase requisition (PR) is submitted in the ERP system.',
    'Before any contract, letter of intent, or purchase order is signed.',
    'When approving project change orders or budget overruns.'
  ],
  raci: [
    { role: 'Requisitioner', resp: 'Initiates the request within their approved budget.' },
    { role: 'Budget Approver (Manager / Director)', resp: 'Authorizes the business necessity and budget consumption up to their financial DOA limit.' },
    { role: 'Procurement Specialist', resp: 'Verifies commercial policy compliance, competitive sourcing evidence, and supplier vetting.' },
    { role: 'Internal Audit', resp: 'Conducts random sampling to detect policy circumvention, order splitting, and unapproved commitments.' }
  ],
  inputs: [
    'Official Corporate Delegation of Authority (DOA) Matrix.',
    'Purchase Requisition with itemized quote and business justification.',
    'Sourcing evaluation summary and contract document.'
  ],
  outputs: [
    'Electronically approved Purchase Requisition (PR).',
    'Audit log documenting approval timestamps, identity, and financial limits.',
    'Authorized Purchase Order release trigger.'
  ],
  controls: [
    'Automated ERP approval routing: the system routes approval strictly based on line-item total value; manual routing bypasses are blocked.',
    'Anti-order splitting algorithms: flags multiple purchases to the same supplier by the same department within 30 days that total over approval thresholds.',
    'Mandatory Board of Directors approval for mega-transactions (e.g. spend > $5,000,000).'
  ],
  mistakes: [
    'Order splitting: deliberately dividing a $15,000 order into two $7,500 POs to stay beneath a manager\'s $10,000 approval limit.',
    'Confusing "Budget Approval" with "Contract Signing Authority": having a department budget does NOT give a manager legal authority to sign contracts.',
    'Permitting "after-the-fact" POs (confirming POs) where services were already delivered before any approval was sought.'
  ],
  bestPractices: [
    'Enforce a strict "No PO, No Pay" policy: invoices received without a pre-approved purchase order number are rejected automatically.',
    'Implement dual approvals for capital expenditure (Capex): requires both operational head and Finance Director sign-off.',
    'Audit Delegation of Authority user profiles annually to immediately revoke approval privileges for departed or reassigned staff.'
  ],
  terms: [
    { term: 'Delegation of Authority (DOA)', def: 'The formal corporate matrix assigning financial approval limits to specific management tiers (e.g., Manager up to $25k, VP up to $250k).' },
    { term: 'Order Splitting (Smurfing)', def: 'The illicit practice of dividing a large purchase into smaller transactions to bypass approval limits or competitive tender rules.' },
    { term: 'No PO, No Pay', def: 'A corporate governance policy that forbids Accounts Payable from processing any invoice that lacks an approved pre-authorized PO.' }
  ],
  thinkingPoints: [
    {
      quote: 'Having an approved department budget is not a blank check; Delegation of Authority is the checkpoint that ensures company money is committed legally and competitively.',
      explanation: 'Many managers believe: "It\'s in my budget, so I can spend it however I want." That is false. The budget gives you the financial allocation; the Delegation of Authority policy dictates WHO must approve the commercial contract, what competitive bids are required, and who is legally authorized to sign.',
      realWorldExample: 'A regional sales manager had a $500,000 annual travel and events budget with a $20,000 individual signing limit. He signed a 3-year $180,000 hotel catering contract without procurement or VP approval. When the company downsized, the hotel sued for breach of contract. The manager was terminated for exceeding his legal signing authority, and the company had to pay a $90,000 settlement.',
      reflectionPrompt: 'Do you know your exact individual financial approval limit, and who must sign above you?'
    }
  ],
  sopSteps: [
    {
      title: 'Requisition Creation & Budget Verification',
      role: 'Requisitioner',
      desc: 'Create PR in ERP; attach quotation, SOW, and select the correct General Ledger (GL) account code.',
      control: 'System automated check: verify that budget funds exist in the designated cost center.',
      record: 'Electronic Purchase Requisition.',
      pitfall: 'Charging software spend to a travel GL code to bypass IT procurement oversight.'
    },
    {
      title: 'DOA Hierarchy Routing & Review',
      role: 'Automated ERP Workflow',
      desc: 'Route PR sequentially through the hierarchy (Manager &rarr; Director &rarr; VP &rarr; CFO) based on financial thresholds.',
      control: 'Enforce segregation of duties: requisitioner cannot approve their own PR.',
      record: 'Digital Audit Approval Trail with timestamps.',
      pitfall: 'Sharing ERP passwords or having assistants approve large requisitions on behalf of executives.'
    },
    {
      title: 'Procurement Commercial Check & PO Release',
      role: 'Procurement Specialist',
      desc: 'Verify that spend complies with category contracts and competitive tender rules before converting PR to PO.',
      control: 'Verify that required minimum quotes (e.g. 3 quotes) or approved sole-source waiver is attached.',
      record: 'Approved and Dispatched Purchase Order.',
      pitfall: 'Approving POs after work is already 100% completed by the supplier.'
    },
    {
      "title": "Classify the Request and Test It Against the Authority Schedule",
      "role": "Procurement Specialist",
      "desc": "Determine the total value of the commitment including recurring and contingent elements, classify the category and the risk, and identify the approval level required.",
      "control": "The value is calculated on the full commitment and the approval level is taken from the schedule, and any value above a threshold is escalated rather than split.",
      "record": "Approval request with the calculated total value, the category, the risk rating and the required authority level.",
      "pitfall": "Splitting a commitment into parts to bring each under a threshold, which is a control failure and not an administrative convenience."
    },
    {
      "title": "Obtain and Record the Approval Against the Authority",
      "role": "Budget Holder",
      "desc": "Review the request against the budget, the category strategy and the commercial case, and record the decision in the approval system with the approver, the date and the conditions.",
      "control": "The approval is recorded against the correct authority level, and the approver is recorded as a person distinct from the requester and the buyer.",
      "record": "Approval record with the approver, the authority level, the date, the decision and any conditions attached.",
      "pitfall": "Approving by email or chat, which leaves no record of what was approved, against which budget, or by whom."
    }
 ],
  quizzes: [
    {
      type: 'red_flag',
      context: 'You review monthly purchase records and notice that the Facilities Department issued three separate purchase orders to the same painting contractor on the same day: PO #101 for $9,500, PO #102 for $9,500, and PO #103 for $9,000. Your company\'s procurement policy states that any purchase over $10,000 requires a competitive RFQ and VP sign-off.',
      q: 'What is occurring here, and how should it be addressed?',
      options: [
        {
          text: 'This is textbook "order splitting" to deliberately evade the $10,000 competitive tender threshold and VP approval. Procurement and Internal Audit must investigate and stop the practice immediately.',
          isCorrect: true,
          rationale: 'Correct! Splitting a $28,000 painting project into three sub-$10,000 POs is a serious policy and compliance breach designed to avoid competitive bidding and executive oversight.'
        },
        {
          text: 'Nothing is wrong; the manager is allowed to create as many small POs as they want.',
          isCorrect: false,
          rationale: 'Order splitting violates standard corporate governance and audit controls globally.'
        },
        {
          text: 'Reward the manager for showing efficiency.',
          isCorrect: false,
          rationale: 'This is an audit violation that often conceals favoritism or procurement fraud.'
        }
      ],
      principle: 'Procurement must actively monitor spend patterns to detect and eliminate artificial order splitting.'
    },
    {
      type: 'mcq',
      q: 'Under the principle of "Segregation of Duties" (SOD), which of the following combinations of responsibilities is forbidden for a single employee?',
      options: [
        {
          text: 'Creating a new vendor in the system, approving the purchase order, receiving the goods, AND approving the invoice for payment.',
          isCorrect: true,
          rationale: 'Correct! If one person can create a vendor, approve a PO, confirm delivery, and approve payment, they can create a fake shell company and steal millions with zero oversight. Separating these duties is the #1 defense against internal fraud.'
        },
        {
          text: 'Reviewing a contract and negotiating commercial terms.',
          isCorrect: false,
          rationale: 'That is standard procurement responsibility.'
        },
        {
          text: 'Writing an SOW and reviewing supplier proposals.',
          isCorrect: false,
          rationale: 'Normal technical stakeholder duty.'
        }
      ],
      principle: 'Segregation of duties ensures that no single individual has total end-to-end control over committing funds and releasing payments.'
    },
    {
      "type": "scenario",
      "context": "A category manager needs a 60,000 purchase. The delegation of authority says the category manager can approve up to 50,000 and a head of department up to 250,000. The manager emails the head asking for approval, and the head replies \"go ahead\". The purchase order is raised. What has gone wrong?",
      "q": "What is the correct reading of this?",
      "options": [
        {
          "text": "Nothing. The head of department had the authority and gave it, so the approval is valid.",
          "isCorrect": false,
          "rationale": "The authority was valid and the approval was not, and the difference matters. A delegation of authority is a limit on who can commit the organization, and the limit was breached. The approval also happened in a way that could not be evidenced: an email saying \"go ahead\" does not show what was bought, against what budget, on what basis, and it creates no record that the person approving had the delegated authority at that moment."
        },
        {
          "text": "The approval was not valid, because the value exceeded the approver's limit, and the evidence of it is an email rather than an approval record against the correct authority.",
          "isCorrect": true,
          "rationale": "Two separate failures. The value exceeded the limit, so whoever approved it did not have the authority to commit that spend. And the form of the evidence is a problem in its own right: an approval that is not recorded against the correct authority, the correct budget and the correct request is not auditable, and it does not show that segregation of duties was observed. A purchase order raised on the back of an email is exactly the pattern a post-payment audit finds."
        },
        {
          "text": "The approval was fine but the process was poor, because the buyer should have asked for the approval to be raised formally first.",
          "isCorrect": false,
          "rationale": "This is too forgiving. The outcome is not a process blemish; it is a commitment made outside the delegated authority, which is the definition of a control failure, and it means the spend was approved by someone who could not approve it. The remedy is to reverse or ratify it properly, retrospectively, with the deviation recorded, and to fix the request route so that the next 60,000 purchase is raised against the right approver in the first place."
        },
        {
          "text": "The purchase order should have been raised by the head of department, since they gave the approval.",
          "isCorrect": false,
          "rationale": "This confuses the approval with the raising of the order. The issue is not who types the purchase order but who commits the organization to spend, on whose authority, and against what record. A purchase order raised by the head of department but based on an approval outside the process is no better, and it obscures the trail. The commitment has to be raised through the route, with the approval recorded against the authority, and the segregation between requester, buyer and approver intact."
        }
      ],
      "principle": "Authority limits who can commit the organization. A value above the limit is not approved, whoever says yes."
    },
    {
      "type": "mcq",
      "q": "What does segregation of duties require in a procurement process?",
      "options": [
        {
          "text": "That different people perform the request, the evaluation, the approval and the payment, so no one can carry a transaction end to end.",
          "isCorrect": true,
          "rationale": "That is the definition, and it is the control that makes the others meaningful. The fraud that matters is usually not a single dishonest act but a sequence in which one person can raise a requirement, select a supplier, approve the spend and influence the payment, or can create a supplier and then pay it. Splitting the four steps means that a single manipulation has to be repeated by several people, and it is what makes an audit trail worth having."
        },
        {
          "text": "That no one in procurement may approve a purchase for a department they have a relationship with.",
          "isCorrect": false,
          "rationale": "That is a conflict-of-interest rule, and it is a necessary one, but it addresses a different risk. Segregation of duties is structural: it does not depend on knowing who knows whom, and it holds even when everyone is honest. Conflict rules are a supplement to it, not a substitute."
        },
        {
          "text": "That approval thresholds are documented and that the approval is recorded against the correct authority level.",
          "isCorrect": false,
          "rationale": "That is the delegation of authority, and it is a different control again. A documented threshold with a properly recorded approval can still be breached by one person who holds all the other roles. Delegation without segregation says how much one person may commit; segregation says how many people it takes."
        },
        {
          "text": "That every purchase is checked by someone other than the person who raised it.",
          "isCorrect": false,
          "rationale": "That is a light version of the control and it leaves the real exposure open. If the same person can still select the supplier and process the payment, checking the request adds little. The four steps that must be separated are the request, the evaluation or selection, the approval, and the payment, and the separation has to be real rather than nominal."
        }
      ],
      "principle": "Segregation of duties is structural: request, select, approve and pay are four different people. It holds even when everyone is honest."
    }
 ],
  relSop: 'sop-procurement-intake',
  rel: {
    concepts: ['delegation-of-authority', 'segregation-of-duties', 'conflict-of-interest', 'procurement-ethics'],
    sops: ['sop-procurement-intake', 'sop-procurement-audit'],
    checklists: ['cl-procurement-audit', 'cl-exception-approval'],
    templates: ['tpl-exception-request', 'tpl-single-source'],
    calcs: ['calc-po-value-check'],
    decisions: ['approve-exception'],
    kpis: ['kpi-maverick-spend', 'kpi-contract-compliance']
  },
  labMission: {
    title: 'Mission 15: Run the PO Value Approval Check Tool',
    desc: 'Use the PO Value Check Calculator to verify approval authority, financial thresholds, and required documentation.',
    tasks: [
      'Open the PO Approval Value Check Tool.',
      'Input proposed purchase values across different spend categories.',
      'Review the required approval tiers, mandatory competitive thresholds, and audit documentation rules.'
    ],
    ctaLabel: 'Launch PO Value Check Tool',
    ctaHref: '#/calc/calc-po-value-check',
    secondaryLabel: 'Open Procurement Audit Checklist',
    secondaryHref: '#/cl/cl-audit'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-po-execution',
  title: 'Purchase Order Execution & Expediting',
  module: 'Module 7: Operational Purchasing & Order Execution (P2P)',
  kicker: 'Function 7.1',
  tagline: 'Executing unambiguous commercial orders and managing on-time delivery.',
  desc: 'Master the Procure-to-Pay (P2P) ordering cycle: PR-to-PO conversion, legal terms incorporation, order expediting, supplier acknowledgment, and lead-time management.',
  duration: '16 mins',
  lifecycleStage: 'Stage 17: Purchase Order Issuance',
  lifecycleDesc: 'The operational point of commitment where a purchase requisition becomes a legally dispatched contract order.',
  
  what: 'Purchase order execution is the conversion of an approved internal purchase requisition into an official legal Purchase Order (PO), followed by transmission to the supplier, formal receipt of supplier acknowledgment, and active expediting to ensure on-time, in-full (OTIF) delivery.',
  why: [
    'A dispatched Purchase Order is a legally binding contract in miniature: once accepted by the vendor, it legally binds both parties to price, delivery dates, and specifications.',
    'Prevents delivery surprises: proactive expediting catches production bottlenecks at the supplier\'s factory weeks before delivery is missed.',
    'Establishes the clean accounting baseline necessary for accurate 3-way matching and timely invoice payment.'
  ],
  when: [
    'Immediately upon final approval of a purchase requisition in the ERP.',
    'For recurring call-offs against established blanket purchase agreements (BPAs).',
    'When ordering raw materials, capital spare parts, or scheduled service visits.'
  ],
  raci: [
    { role: 'Buyer / Purchasing Agent', resp: 'Verifies PR accuracy, converts to PO, transmits to vendor, and tracks delivery.' },
    { role: 'Supplier Order Desk', resp: 'Issues formal written Order Acknowledgment confirming price, quantity, and Promised Delivery Date.' },
    { role: 'Requisitioner', resp: 'Monitors project readiness to receive goods at the destination.' },
    { role: 'Warehouse / Receiving', resp: 'Inspects and physically books in goods upon delivery.' }
  ],
  inputs: [
    'Fully approved electronic Purchase Requisition (PR).',
    'Active master contract number, pricing schedule, or verified quotation.',
    'Confirmed delivery address, Incoterms, and requested delivery date.'
  ],
  outputs: [
    'Dispatched Purchase Order (PDF/EDI) with standard Terms & Conditions.',
    'Supplier Order Acknowledgment with confirmed shipment dates.',
    'Expediting Tracking Log and Early Warning Notification.'
  ],
  controls: [
    'Order Acknowledgment rule: suppliers must acknowledge receipt and confirm delivery date within 48 hours of PO issuance.',
    'Price and quantity variance check: PO line items must match contracted price schedules exactly.',
    'Change Order control: any modification to PO price or delivery date requires formal re-approval under DOA rules.'
  ],
  mistakes: [
    'Assuming the supplier received the PO without demanding a written Order Acknowledgment.',
    'Leaving the "Required Delivery Date" as "ASAP" rather than specifying an exact calendar date.',
    'Failing to expedite until the day after the promised delivery date has already passed.'
  ],
  bestPractices: [
    'Implement a 3-Stage Expediting Protocol: 1) Acknowledgment check (Day 2), 2) Mid-point production status check (50% of lead time), 3) Pre-shipment dispatch check (5 days before shipping).',
    'Use Blanket Purchase Orders (BPOs) with automated release schedules for high-frequency consumable items.',
    'Track On-Time In-Full (OTIF) metrics per supplier to hold vendors accountable during Quarterly Business Reviews.'
  ],
  terms: [
    { term: 'Purchase Order (PO)', def: 'A legally binding commercial document issued by a buyer committing to pay for specified products or services under defined conditions.' },
    { term: 'Order Acknowledgment', def: 'A supplier\'s written confirmation that they received the PO and accept the price, specifications, and promised delivery date.' },
    { term: 'OTIF (On-Time In-Full)', def: 'A supply chain KPI measuring the percentage of orders delivered by the promised date with 100% of the ordered quantity.' }
  ],
  thinkingPoints: [
    {
      quote: 'A purchase order is a legal contract in miniature: every detail on the face of the PO binds the company.',
      explanation: 'Too many buyers view a PO as a simple internal tracking number. In commercial law, issuing a PO is a formal purchase offer. If you type the wrong unit price, forget the delivery date, or fail to reference your Master Agreement, you expose your company to legal and financial disputes.',
      realWorldExample: 'A buyer typed a PO for 1,000 valves at $150 each, but accidentally selected the wrong currency code (EUR instead of USD) in the ERP dropdown. The supplier happily shipped the valves and invoiced in Euros, costing the company an unexpected $18,000 currency loss that procurement could not legally dispute because the face of the PO stated EUR.',
      reflectionPrompt: 'Does your procurement team track supplier Order Acknowledgments, or do you assume orders are being built in silence?'
    }
  ],
  sopSteps: [
    {
      title: 'PR Review & Master Agreement Matching',
      role: 'Buyer',
      desc: 'Verify that the requisition references an active master contract; check item descriptions, quantities, and delivery site.',
      control: 'Ensure unit prices match contract price schedules down to the exact penny.',
      record: 'Validated Purchase Requisition.',
      pitfall: 'Converting free-text requisitions without verifying if catalog contract items already exist.'
    },
    {
      title: 'PO Generation & Secure Transmission',
      role: 'Buyer',
      desc: 'Generate formal PO in ERP; attach technical drawings or SOW; dispatch electronically to the designated supplier email/EDI.',
      control: 'Include corporate standard Purchase Order Terms & Conditions on the PO face or attachment.',
      record: 'Dispatched Purchase Order Document.',
      pitfall: 'Sending POs to an individual sales rep\'s personal email who has left the supplier company.'
    },
    {
      title: 'Acknowledgment Logging & Active Expediting',
      role: 'Buyer / Expediter',
      desc: 'Obtain written Order Acknowledgment within 48 hours; conduct mid-point production check; confirm carrier tracking.',
      control: 'Flag any supplier who attempts to change promised delivery dates on the acknowledgment.',
      record: 'Order Acknowledgment & Expediting Log.',
      pitfall: 'Waiting until the delivery is 2 weeks late before calling the supplier.'
    },
    {
      "title": "Raise the Order Against the Agreement with Complete Detail",
      "role": "Procurement Specialist",
      "desc": "Raise the purchase order with the item, the specification, the quantity, the unit price, the delivery point, the required date and the cost centre, checked against the agreement terms.",
      "control": "The order is checked against the framework or the contract before issue, and any deviation is referred for approval rather than corrected quietly.",
      "record": "Purchase order with the agreement reference, the delivery schedule and the cost centre coding.",
      "pitfall": "Raising the order with a delivery date copied from a previous order rather than from the requirement."
    },
    {
      "title": "Monitor, Expedite and Record the Delivery Performance",
      "role": "Procurement Specialist",
      "desc": "Track the order against the promised date, raise an early warning when the date is at risk, and record the actual delivery performance for the supplier review.",
      "control": "Delivery performance is recorded against the order and feeds the supplier scorecard, and an at-risk date is escalated before it becomes a failure.",
      "record": "Order tracking record with the promised date, the actual date, the exception raised and the outcome.",
      "pitfall": "Recording the delivery performance in a spreadsheet that nobody reconciles with the orders, so the scorecard reflects recollection rather than record."
    }
 ],
  quizzes: [
    {
      type: 'scenario',
      context: 'You issue a PO on Monday for 100 industrial motors with delivery promised for September 30. On Wednesday, the supplier sends an Order Acknowledgment stating: "Thank you for the order. We have booked it in our system for delivery on October 25 due to factory capacity."',
      q: 'What must the buyer do immediately?',
      options: [
        {
          text: 'Ignore the acknowledgment because the PO date of September 30 legally overrides whatever the supplier says.',
          isCorrect: false,
          rationale: 'Ignoring the acknowledgment guarantees the motors will arrive a month late, potentially shutting down operations.'
        },
        {
          text: 'Contact the supplier immediately: challenge the unapproved 25-day delivery delay, escalate to their account director, evaluate expediting freight options, or switch volume to a backup supplier if the date is critical to operations.',
          isCorrect: true,
          rationale: 'Correct! An order acknowledgment that alters delivery dates is a "counter-offer" in commercial law. Prompt intervention is mandatory before factory production schedules are locked.'
        },
        {
          text: 'Wait until September 30 and complain to Accounts Payable.',
          isCorrect: false,
          rationale: 'Accounts Payable has no operational control over supplier factory delays.'
        }
      ],
      principle: 'Always review supplier order acknowledgments immediately to intercept unauthorized delivery delays or price alterations.'
    },
    {
      type: 'mcq',
      q: 'Why is specifying "ASAP" (As Soon As Possible) as the delivery date on a Purchase Order bad procurement practice?',
      options: [
        {
          text: 'Because "ASAP" has zero legal definition; it allows the supplier to deliver in 3 days or 6 months without being in contractual breach.',
          isCorrect: true,
          rationale: 'Correct! "ASAP" is commercially unenforceable. A legally binding PO must specify a precise calendar date (e.g. "Deliver on or before October 15, 2026") to hold the supplier accountable for delay damages.'
        },
        {
          text: 'Because ERP systems cannot spell four-letter words.',
          isCorrect: false,
          rationale: 'The flaw is legal and operational ambiguity, not software spelling.'
        },
        {
          text: 'Because suppliers are legally required to deliver within 24 hours of receiving an ASAP order.',
          isCorrect: false,
          rationale: 'There is no such law; suppliers will simply deprioritize the order.'
        }
      ],
      principle: 'Every Purchase Order must specify a precise, legally enforceable delivery date.'
    },
    {
      "type": "scenario",
      "context": "An order is due for delivery on Friday. The supplier calls on Thursday to say it will arrive the following Tuesday, with no reason given. The buyer's own order record shows the delivery date was agreed as a hard date because the item is on the critical path. What should the buyer do?",
      "q": "What is the correct response?",
      "options": [
        {
          "text": "Accept the new date, because the supplier's commitment is what the business will actually get, and the alternative is a disruption on Friday.",
          "isCorrect": false,
          "rationale": "The alternative is not a disruption, it is a conversation. The buyer does not have to accept a unilateral change; it has to find out what happened and what the options are. Accepting a date change without explanation sets the precedent that the delivery date in the purchase order is advisory, and the next late delivery will be met with the same conversation rather than a remedy."
        },
        {
          "text": "Establish what happened and what the options are: part shipment, an alternative date with a documented reason, or a substitute from the second source, and apply the contractual remedy for late delivery if the cause is the supplier's.",
          "isCorrect": true,
          "rationale": "This is the disciplined sequence and it is also the most effective, because each of those options is a better outcome than simply accepting. A part shipment may cover the critical path, a documented reason may move you to a remedy rather than a negotiation, and a second source may exist for a reason you built the contract. Critically, the buyer should also find out the cause, because a first delay caused by the supplier's capacity is a pattern that needs escalation, while a one-off caused by a customs delay does not. And the remedy, if it is the supplier's fault, is part of the conversation from the start rather than something raised later."
        },
        {
          "text": "Escalate immediately to the supplier's account manager and ask for a written recovery plan, as a late delivery is a breach of the contract.",
          "isCorrect": false,
          "rationale": "The escalation is right but the framing is wrong, and it wastes the time you need. Opening with \"this is a breach\" on a first late delivery, with no facts established, makes the supplier defensive before the conversation has begun, and it takes the focus off the operational question, which is what is actually needed on Thursday for a Friday requirement. Facts, options, and then the remedy."
        },
        {
          "text": "Raise a dispute with the supplier and withhold payment until the delivery is made, to enforce the delivery date.",
          "isCorrect": false,
          "rationale": "Withholding payment in response to a late delivery creates a second dispute and damages the relationship, and it may breach the contract if the terms do not permit it. The buyer usually wins on the price and loses on the supply, because the cost of a disrupted line is larger than the value of the claim. A late delivery is normally managed through service credits and the performance record, and reserving the payment dispute for the case where the remedy is not being honoured."
        }
      ],
      "principle": "A late delivery is a fact-finding conversation first, an options conversation second, and a remedy conversation third. Do not skip to the third."
    },
    {
      "type": "mcq",
      "q": "Why does issuing a purchase order against an existing framework agreement rather than a new one matter?",
      "options": [
        {
          "text": "It avoids the need for a purchase order to be raised at all, since the agreement already commits the volume.",
          "isCorrect": false,
          "rationale": "Most framework agreements commit the terms and sometimes the access, not the volume, and a call-off is still usually required to draw against them. The order is what carries the quantity, the price and the delivery point, and without it there is no record of what was ordered against what the agreement allows. A framework without orders is a piece of paper."
        },
        {
          "text": "It records the specific quantity, price and delivery point against the agreed terms, and it is the record that the receipt and the invoice can be matched against later.",
          "isCorrect": true,
          "rationale": "This is why the order matters operationally. The framework fixes the commercial terms, and the call-off order fixes the transaction: how much, at what price, delivered where and when. It is the document the goods receipt is matched against, the document the invoice is matched against, and the document that shows the commitment was made under the right terms. Without it, three-way matching has nothing to match, and the \"off-contract\" problem is invisible."
        },
        {
          "text": "It speeds up the process, because the agreement removes the need for a competitive event on each order.",
          "isCorrect": false,
          "rationale": "The speed benefit is real and it is one of the reasons frameworks exist, but it is not what makes the order itself necessary. The order is the transaction record; the framework is the permission and the terms. Confusing the two leads to the practice of assuming that having a framework means you do not need to raise orders, and the commitments then go unrecorded."
        },
        {
          "text": "It creates a separate legal commitment, so the buyer can enforce the order terms independently of the framework.",
          "isCorrect": false,
          "rationale": "An order made under a framework is subject to the framework, and does not create a separate contract. It is usually a call-off or an order form that incorporates the agreement. The benefit is the opposite of separate: the framework terms apply automatically, which is why the order must be raised and why it must be consistent with the agreement it calls off."
        }
      ],
      "principle": "The framework fixes the terms; the order fixes the transaction. Both are needed, and the order is what matching is done against."
    }
 ],
  relSop: 'sop-procurement-intake',
  rel: {
    concepts: ['c-procure-to-pay', 'c-three-way-match', 'audit-trail'],
    sops: ['sop-procurement-intake'],
    checklists: ['cl-procurement-file-completeness', 'cl-procurement-intake'],
    templates: ['tpl-business-case'],
    calcs: ['calc-po-value-check', 'calc-moq'],
    decisions: ['approve-exception'],
    kpis: ['kpi-cycle-time', 'kpi-otif']
  },
  labMission: {
    title: 'Mission 16: Review PO Execution Checklist & Templates',
    desc: 'Use the PO Execution Checklist and Template to ensure all required commercial terms and delivery dates are properly structured.',
    tasks: [
      'Open the Buying & Ordering Checklist.',
      'Check off verification gates for delivery schedules, Incoterms, and acknowledgment logging.',
      'Review the Purchase Order Template for standard commercial protections.'
    ],
    ctaLabel: 'Open Buying Checklist',
    ctaHref: '#/cl/cl-rfq',
    secondaryLabel: 'View PO Template',
    secondaryHref: '#/tpl'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-threeway-matching',
  title: '3-Way Matching & Discrepancy Resolution',
  module: 'Module 7: Operational Purchasing & Order Execution (P2P)',
  kicker: 'Function 7.2',
  tagline: 'The financial iron curtain protecting corporate cash from overbilling and fraud.',
  desc: 'Master the mechanics of 3-Way Matching: aligning Purchase Orders, Goods Receipt Notes (GRN), and Invoices to resolve price, quantity, and tax discrepancies before payment release.',
  duration: '18 mins',
  lifecycleStage: 'Stage 18: 3-Way Matching & Invoice Settlement',
  lifecycleDesc: 'The critical audit control that verifies goods were genuinely received and properly billed before cash is disbursed.',
  
  what: '3-Way Matching is the foundational financial control in Procure-to-Pay (P2P) that compares three critical documents before an invoice is approved for payment: 1) The Purchase Order (what was ordered and agreed), 2) The Goods Receipt / Receiving Note (what was physically received and inspected), and 3) The Supplier Invoice (what is being billed).',
  why: [
    'Prevents paying for goods never received, damaged items, or duplicate invoices.',
    'Catches stealth price increases where a vendor quotes $100 on the PO but invoices $115 on the bill.',
    'Mandated by external financial auditors and internal control frameworks (SOX) to prevent corporate embezzlement and procurement fraud.'
  ],
  when: [
    'Automatically executed in the ERP upon receiving a vendor invoice.',
    'Whenever a 3-way match exception block or tolerance hold is triggered.',
    'During monthly vendor statement reconciliations.'
  ],
  raci: [
    { role: 'Accounts Payable', resp: 'Enters invoice data, monitors automated 3-way match status, and processes payment.' },
    { role: 'Warehouse / Receiving', resp: 'Inspects delivered goods, records serial numbers, and posts Goods Receipt (GRN).' },
    { role: 'Buyer / Procurement Specialist', resp: 'Investigates and resolves price and quantity match discrepancies with the supplier.' },
    { role: 'Requisitioner', resp: 'Confirms completion of services (Service Entry Sheet) before invoice approval.' }
  ],
  inputs: [
    'Approved Purchase Order (PO) line items and unit prices.',
    'Signed Goods Receipt Note (GRN) / Receiving Log from warehouse or Service Entry Sheet (SES).',
    'Supplier Tax Invoice detailing line items, quantities, taxes, and bank details.'
  ],
  outputs: [
    'Matched and Cleared Invoice scheduled for payment release.',
    'Discrepancy Exception Notice issued to supplier.',
    'Debit Note or Credit Adjustment Note.'
  ],
  controls: [
    'Tolerance thresholds: strict tolerance limits (e.g. 0% tolerance on unit price; max 1% or $25 tolerance on quantity/freight).',
    'Segregation of duties: Accounts Payable cannot alter PO pricing; Procurement cannot post Goods Receipts.',
    'Immediate block on invoices with price discrepancies until Procurement formally investigates.'
  ],
  mistakes: [
    'Blindly approving invoices because "the project is running and we need to pay" without checking receiving records.',
    'Receiving goods in the system before they actually arrive at the loading dock (ghost receipts).',
    'Allowing suppliers to add surprise "Handling Fees" or "Fuel Surcharges" on the invoice that were never agreed on the PO.'
  ],
  bestPractices: [
    'Automate 3-way matching via Electronic Data Interchange (EDI) or e-Invoicing portals to achieve >85% "touchless" invoice processing.',
    'Enforce a strict Debit Note protocol: if an invoice overbills by $200, issue a debit note and pay the correct undisputed amount on time.',
    'Conduct monthly "GR/IR" (Goods Receipt / Invoice Receipt) account reconciliations to clear aged open purchase orders.'
  ],
  terms: [
    { term: '3-Way Match', def: 'A verification process confirming that PO details, Goods Receipt records, and Vendor Invoice line items match within strict tolerances.' },
    { term: 'Goods Receipt Note (GRN)', def: 'Formal evidence posted in the ERP certifying that physical goods arrived at the warehouse and passed quality inspection.' },
    { term: 'Service Entry Sheet (SES)', def: 'The service equivalent of a GRN, signed by the business owner certifying that professional services were satisfactorily performed.' }
  ],
  thinkingPoints: [
    {
      quote: 'The distance between what was ordered, what was received, and what was invoiced is where supplier fraud and corporate losses hide.',
      explanation: 'Unscrupulous suppliers and dishonest employees thrive in organizations with sloppy receiving controls. If Accounts Payable pays invoices without demanding a verified Goods Receipt Note signed by the warehouse, companies end up paying for ghost shipments, broken equipment, and inflated prices.',
      realWorldExample: 'An energy utility was billed $1.4 million for industrial chemicals over 2 years. When internal audit conducted a 3-way match investigation, they discovered the supplier was shipping 40 barrels per load but invoicing for 50 barrels. Because the plant manager was rubber-stamping receiving slips without counting barrels, the utility overpaid $280,000 for chemicals that were never delivered.',
      reflectionPrompt: 'In your organization, can an invoice be paid if the warehouse has not posted a physical Goods Receipt?'
    }
  ],
  sopSteps: [
    {
      title: 'Physical Receiving & Inspection (GRN)',
      role: 'Warehouse / Receiving Staff',
      desc: 'Count delivered cartons; check packaging integrity; verify packing slip against PO line items; post GRN in the ERP.',
      control: 'Never post GRN before physical count is completed; quarantine damaged goods immediately.',
      record: 'Goods Receipt Note (GRN) in ERP.',
      pitfall: 'Signing carrier delivery slips without checking the box count.'
    },
    {
      title: 'Automated 3-Way Match Verification',
      role: 'Accounts Payable & ERP System',
      desc: 'Scan invoice (OCR); system automatically checks PO vs GRN vs Invoice line items, quantities, unit prices, and tax rates.',
      control: 'System automated block on any variance exceeding pre-set financial tolerance thresholds (0% on price).',
      record: 'Invoice Match Status Record (Cleared or Blocked).',
      pitfall: 'AP clerks manually overriding price blocks without procurement authorization.'
    },
    {
      title: 'Discrepancy Investigation & Resolution',
      role: 'Buyer & Accounts Payable',
      desc: 'Investigate match blocks: if supplier overbilled, demand a corrected Credit Note; if freight was omitted from PO, issue a Change Order.',
      control: 'Never pay disputed overbillings; pay only undisputed base amounts.',
      record: 'Discrepancy Resolution Memo / Credit Note.',
      pitfall: 'Letting blocked invoices sit in a drawer for 90 days until the supplier halts supply.'
    },
    {
      "title": "Match the Three Documents Line by Line and Classify the Variance",
      "role": "Accounts Payable Analyst",
      "desc": "Match the purchase order, the goods receipt and the invoice line by line, and classify each difference as a price variance, a quantity variance, an uncontracted charge or a tolerance breach.",
      "control": "Each variance is recorded and raised separately with its own cause and remedy, and no variance is netted against another before it is raised.",
      "record": "Match record with the three documents referenced, the variance classified and the exception raised.",
      "pitfall": "Netting a price variance against a quantity variance, which hides both and produces a wrong settlement."
    },
    {
      "title": "Resolve the Exceptions with Evidence and a Decision",
      "role": "Procurement Specialist",
      "desc": "Investigate each exception with the receiver, the buyer and the supplier, and decide whether it is a price adjustment, a credit, a short-shipment recovery, a legitimate charge or a tolerance acceptance.",
      "control": "Nothing is written off without a recorded decision and a named approver, and a repeated exception from the same supplier is escalated to the performance review.",
      "record": "Exception log with the evidence, the resolution, the credit or adjustment raised and the approver.",
      "pitfall": "Accepting the invoice to clear the queue, which converts a recoverable exception into a permanent cost."
    }
 ],
  quizzes: [
    {
      type: 'scenario',
      context: 'You issued a PO for 50 laptops at $1,000 each ($50,000 total). The warehouse posted a Goods Receipt for 48 laptops (2 were damaged in transit and rejected). The supplier\'s invoice arrives billing for 50 laptops at $1,050 each ($52,500 total), plus an uncontracted $500 "Fuel Surcharge".',
      q: 'What should Accounts Payable and Procurement do with this invoice?',
      options: [
        {
          text: 'Pay the full $52,500 invoice because fighting with vendors is unpleasant.',
          isCorrect: false,
          rationale: 'This throws away $4,500 of company money for 2 missing laptops, an unapproved $50/unit price hike, and an unauthorized surcharge.'
        },
        {
          text: 'Place an immediate match block on the invoice. Reject the $50 price increase and the $500 fuel surcharge as unauthorized; require the supplier to issue a revised invoice or credit note for the 48 laptops actually received at the contracted $1,000 price ($48,000 total).',
          isCorrect: true,
          rationale: 'Correct! 3-way matching catches all three violations: 1) Quantity mismatch (billed 50 vs received 48), 2) Price mismatch (billed $1,050 vs contracted $1,000), and 3) Scope mismatch (unauthorized $500 surcharge). The legitimate obligation is exactly $48,000.'
        },
        {
          text: 'Change the PO unit price to $1,050 so that the invoice clears the computer system.',
          isCorrect: false,
          rationale: 'Falsifying POs to bypass invoice blocks is a severe compliance violation.'
        }
      ],
      principle: 'Never pay for unreceived quantities, unauthorized price increases, or uncontracted miscellaneous surcharges.'
    },
    {
      type: 'mcq',
      q: 'What is a "Service Entry Sheet" (SES) in 3-way matching for services?',
      options: [
        {
          text: 'A formal digital receipt in the ERP where the business project manager certifies that service milestones or hours were satisfactorily completed, acting as the service equivalent of a physical Goods Receipt.',
          isCorrect: true,
          rationale: 'Correct! Because services have no physical boxes to weigh at a loading dock, the Service Entry Sheet provides the necessary audit proof of delivery before invoices can match and pay.'
        },
        {
          text: 'A timesheet sent to the supplier\'s HR department.',
          isCorrect: false,
          rationale: 'The SES is an internal buyer-side verification mechanism.'
        },
        {
          text: 'A tax form filed with the federal government.',
          isCorrect: false,
          rationale: 'It is an operational P2P receiving document.'
        }
      ],
      principle: 'Services require documented Service Entry Sheets to verify delivery before Accounts Payable releases funds.'
    },
    {
      "type": "scenario",
      "context": "A supplier invoices 600 units at 92.00. The purchase order is for 600 units at 85.00 and the goods receipt records 480 units received. The invoice also adds 1,800 of freight that was not ordered. What are the exceptions?",
      "q": "Which exceptions should be raised?",
      "options": [
        {
          "text": "A price variance only, because the quantity matches the purchase order and the freight is a legitimate additional charge.",
          "isCorrect": false,
          "rationale": "The price variance is real, but it is one of three and the least serious. The quantity difference is larger in money terms: 120 units at 92.00 is 11,040 invoiced for goods never received. And the freight is uncontracted, which is a separate control question: a supplier billing an amount that was not on the order, for a service that was not agreed, is precisely the kind of thing matching exists to catch."
        },
        {
          "text": "Three: a price variance on 480 units received, a quantity variance of 120 units billed but not received, and an uncontracted freight charge.",
          "isCorrect": true,
          "rationale": "That is the correct reading and it is the reason matching is done line by line. Price variance: 92.00 against 85.00, which is 3,360 on the received quantity and is a question for the negotiation or an index clause. Quantity variance: 120 units billed with no matching receipt, which is 11,040 and is either a short delivery being billed in full or a receipt not being recorded. Freight: 1,800 not on the order, which is uncontracted spend. Each of the three should be raised separately, because each has a different cause and a different remedy, and bundling them into one \"query\" is how a quantity discrepancy becomes an accepted price."
        },
        {
          "text": "A quantity variance only, because a 480-unit receipt against a 600-unit order is a normal short delivery.",
          "isCorrect": false,
          "rationale": "A short delivery is a normal operational event and it is what the goods receipt is for. The exception is that the supplier has invoiced the full 600 units. That the receipt says 480 and the invoice says 600 is the discrepancy, and it is 11,040 of value. Treating the short delivery as the finding and missing the invoice is how a receipt is never matched at all."
        },
        {
          "text": "A price and a quantity variance, with the freight treated as a rounding or freight-forwarding arrangement.",
          "isCorrect": false,
          "rationale": "The freight is not a rounding item, and treating an uncontracted 1,800 as an arrangement rather than an exception removes it from the record. It is a real charge that was not on the order, and the fact that it is small relative to the other two is not a reason to skip it. Matching exists to catch exactly the small unbilled and uncontracted amounts, because those are the ones that recur every invoice without ever being noticed."
        }
      ],
      "principle": "Raise price, quantity and uncontracted charges as separate exceptions. Each has a different cause and a different remedy."
    },
    {
      "type": "mcq",
      "q": "What is the purpose of a three-way match?",
      "options": [
        {
          "text": "To confirm that the purchase order, the goods receipt and the supplier invoice agree before payment is released.",
          "isCorrect": true,
          "rationale": "That is the mechanism, and it works because the three documents come from three different places: the buyer raised the order, the receiver confirmed the goods, and the supplier sent the invoice. A single person cannot easily make all three agree. The three-way match is therefore as much a control against internal collusion as it is an accuracy check, which is why the match is done against the documents and not against a summary someone typed in."
        },
        {
          "text": "To confirm that the invoice is arithmetically correct against the goods received, so the accounts are not overstated.",
          "isCorrect": false,
          "rationale": "That is a two-way match, and it leaves the price untested. The order is what establishes the price the organization agreed to pay, and without it the match confirms only that the supplier billed what they say they delivered. The order is the document that makes the price testable, which is the whole point of having one."
        },
        {
          "text": "To confirm that the supplier has been paid on time, so that the relationship is maintained.",
          "isCorrect": false,
          "rationale": "Payment timing is a relationship and working-capital issue, and it is handled through the terms and the payment process rather than through matching. Matching is an accuracy and control mechanism. Conflating the two produces a process that gets skipped under payment pressure, and a skipped match is how an overpayment happens."
        },
        {
          "text": "To confirm that the goods received are within the contracted tolerance, so that the supplier is not penalised for minor variances.",
          "isCorrect": false,
          "rationale": "Tolerance is a parameter of the match, not its purpose. A stated tolerance decides what counts as a variance worth raising, and that matters, but it is one setting inside a broader control rather than the reason the control exists. Describing tolerance as the purpose of matching inverts the relationship: the match exists to establish that the three documents agree, and tolerance determines how strictly you judge the agreement."
        }
      ],
      "principle": "The three-way match is as much a control against internal collusion as an accuracy check, which is why it compares documents, not summaries."
    }
 ],
  relSop: 'sop-procurement-audit',
  rel: {
    concepts: ['c-three-way-match', 'audit-trail', 'segregation-of-duties'],
    sops: ['sop-procurement-audit'],
    checklists: ['cl-procurement-file-completeness', 'cl-procurement-audit'],
    templates: ['tpl-exception-request'],
    calcs: ['calc-po-value-check'],
    decisions: ['approve-exception'],
    kpis: ['kpi-contract-compliance', 'kpi-ppv']
  },
  labMission: {
    title: 'Mission 17: Review P2P Operational Controls Checklist',
    desc: 'Use the Operational Checklists to audit receiving, invoice matching, and payment release controls.',
    tasks: [
      'Open the Operational Purchasing & Intake Checklist.',
      'Audit 3-way matching tolerance rules and dispute resolution workflows.',
      'Record findings and review discrepancy escalation protocols.'
    ],
    ctaLabel: 'Open P2P Checklist',
    ctaHref: '#/cl/cl-procurement-intake',
    secondaryLabel: 'View Operational Buying SOP',
    secondaryHref: '#/sop'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-srm-scorecards',
  title: 'Supplier Relationship Management (SRM) & Scorecards',
  module: 'Module 8: Supplier Management & Value Realization',
  kicker: 'Function 8.1',
  tagline: 'Driving continuous supplier improvement, innovation, and long-term strategic alignment.',
  desc: 'Learn how to segment suppliers into Strategic, Preferred, and Transactional tiers, establish balanced scorecard metrics, conduct Quarterly Business Reviews (QBRs), and manage corrective action plans.',
  duration: '18 mins',
  lifecycleStage: 'Stage 19: Supplier Performance & SRM',
  lifecycleDesc: 'The post-award relationship management framework that ensures suppliers deliver promised value over the contract life.',
  
  what: 'Supplier Relationship Management (SRM) is the systematic enterprise discipline of managing interactions with third-party vendors to maximize value, foster innovation, mitigate risk, and drive continuous performance improvements throughout the contract lifecycle.',
  why: [
    'Value leakage: without active post-award management, 40% to 60% of negotiated contract value degrades over time through creeping service degradation and unmonitored fees.',
    'Innovation partnership: strategic suppliers possess deep R&D capabilities that can accelerate your company\'s new product launches.',
    'Priority customer status: in times of global supply chain shortages, suppliers prioritize shipments to their preferred SRM partners.'
  ],
  when: [
    'Ongoing throughout the multi-year lifecycle of major contracts.',
    'Quarterly during executive Quarterly Business Reviews (QBRs) for Tier-1 Strategic suppliers.',
    'When addressing chronic quality defects, delivery delays, or billing disputes.'
  ],
  raci: [
    { role: 'SRM Lead / Category Manager', resp: 'Leads relationship governance, tracks composite scorecards, and chairs QBR meetings.' },
    { role: 'Operations & Quality Leads', resp: 'Provide monthly operational performance data (defect rates, SLA uptime, OTIF).' },
    { role: 'Executive Sponsor', resp: 'Attends annual executive reviews with supplier C-suite to align strategic roadmaps.' },
    { role: 'Supplier Account Executive', resp: 'Owns vendor performance delivery, resolves escalations, and leads continuous improvement.' }
  ],
  inputs: [
    'Monthly operational KPI logs (On-Time Delivery, Defect Rate PPM, SLA Uptime).',
    'Internal stakeholder satisfaction surveys across business units.',
    'Executed contract SLA schedules and commercial terms.'
  ],
  outputs: [
    'Quarterly Supplier Balanced Scorecard.',
    'Quarterly Business Review (QBR) Action Log & Innovation Pipeline.',
    'Corrective Action Request (CAR) for underperforming vendors.'
  ],
  controls: [
    'Objective metrics over subjective impressions: scorecards must be backed by empirical ERP transaction data.',
    'Formal 360-degree feedback: allowing suppliers to evaluate your company as a customer (identifying late payments or erratic forecasting).',
    'Tiering governance: reserve intensive executive QBRs strictly for the top 5% of strategic suppliers (do not waste time holding QBRs for stationery vendors).'
  ],
  mistakes: [
    'Holding QBRs that devolve into one-sided complaint sessions rather than strategic collaborative planning.',
    'Calculating scorecards manually in secret and surprising the supplier with a failing grade without ongoing monthly dialogue.',
    'Failing to follow through on Corrective Action Plans (CAPs) when a supplier consistently fails SLAs.'
  ],
  bestPractices: [
    'Use a Balanced Scorecard covering 4 pillars: Quality & Operations (30%), Commercial & Cost (25%), Service & Innovation (25%), and ESG & Compliance (20%).',
    'Create an Executive Sponsor pairing: pair your Chief Technology Officer with the supplier\'s VP of Engineering for high-level alignment.',
    'Institute "Customer of Choice" initiatives: pay on time, share 12-month demand forecasts, and treat suppliers with respect to earn preferential allocation during shortages.'
  ],
  terms: [
    { term: 'Quarterly Business Review (QBR)', def: 'A formal executive meeting held every 3 months between buyer and supplier leaders to review performance scorecards and collaborate on future initiatives.' },
    { term: 'Supplier Balanced Scorecard', def: 'A multidimensional performance dashboard tracking delivery, quality, cost management, and innovation over time.' },
    { term: 'Corrective Action Request (CAR)', def: 'A formal notice issued to an underperforming supplier mandating a root-cause investigation and documented remediation plan within 30 days.' }
  ],
  thinkingPoints: [
    {
      quote: 'Contract signature is the beginning of value delivery, not the end of procurement\'s job.',
      explanation: 'A brilliantly negotiated contract locked in a drawer produces zero savings if the supplier fails to deliver on time, invoices wrong rates, or suffers quality defects. Elite procurement teams invest as much effort into post-award relationship management as they do into pre-award tendering.',
      realWorldExample: 'A global consumer goods company established a structured SRM program with its top 20 packaging suppliers. By sharing 2-year sustainability roadmaps, one supplier co-developed a 100% biodegradable plastic bottle that reduced material cost by 14% and won the company a major retail marketing award. The innovation came from mutual collaboration, not adversarial bullying.',
      reflectionPrompt: 'Does your company treat strategic suppliers like disposable vendors, or as valued commercial partners?'
    }
  ],
  sopSteps: [
    {
      title: 'Supplier Tiering & Governance Assignment',
      role: 'SRM Lead',
      desc: 'Classify suppliers into Tier 1 (Strategic - Quarterly QBRs), Tier 2 (Preferred - Biannual Reviews), and Tier 3 (Transactional - Automated Scorecards).',
      control: 'Tier 1 status restricted to suppliers with high spend, high business criticality, or high innovation potential.',
      record: 'Annual Supplier Segmentation Register.',
      pitfall: 'Granting "Strategic" status to hundreds of vendors, overwhelming internal team bandwidth.'
    },
    {
      title: 'Monthly Data Capture & Scorecard Generation',
      role: 'Procurement Analyst & Operations',
      desc: 'Extract OTIF delivery, quality defect PPM, invoice accuracy, and stakeholder satisfaction; generate balanced scorecard.',
      control: 'Verify that operational data is shared with the supplier monthly so there are no surprises at the QBR.',
      record: 'Monthly Performance Scorecard.',
      pitfall: 'Relying exclusively on annual subjective surveys rather than factual monthly ERP delivery data.'
    },
    {
      title: 'Quarterly Business Review (QBR) & Action Tracking',
      role: 'Category Manager & Executive Sponsor',
      desc: 'Convene executive QBR; review past performance; resolve operational roadblocks; agree on Joint Innovation Projects.',
      control: 'Document all agreed commitments in a formal Action Tracker with named owners and deadlines.',
      record: 'Signed QBR Minutes & Executive Action Log.',
      pitfall: 'Talking only about past disputes without discussing future business growth and technology roadmaps.'
    },
    {
      "title": "Agree the Measures and the Plan with the Supplier",
      "role": "Supplier Relationship Manager",
      "desc": "Set the measures, the data sources, the reporting cadence and the remedy for each measure, and record the improvement plan with owners and dates.",
      "control": "Both parties agree the measures in advance and the plan carries named owners and dates, and the measures are the ones the category strategy identifies as differentiating.",
      "record": "Supplier performance plan with the measures, the data source, the target, the owner and the review date.",
      "pitfall": "Measuring whatever data is available rather than what differentiates the supplier in this category."
    },
    {
      "title": "Run the Review as a Decision on Volume, Terms and Status",
      "role": "Supplier Relationship Manager",
      "desc": "Present the performance against the plan, take the supplier's explanation, agree the forward actions, and decide explicitly what the performance means for volume, terms, status and senior access.",
      "control": "The review records a decision with a named owner, and a repeated failure to meet an agreed plan escalates to the sourcing and contract strategy rather than being re-planned again.",
      "record": "Business review record with the performance data, the explanation, the agreed actions and the decision on volume, terms and status.",
      "pitfall": "Recording the performance and the actions but not the decision, so nothing actually changes and the review becomes an annual formality."
    }
 ],
  quizzes: [
    {
      type: 'scenario',
      context: 'Your strategic Tier-1 logistics provider has scored below the acceptable 95% On-Time Delivery threshold for three consecutive months (scoring 88%, 86%, and 84%), causing severe stock-outs in retail stores. At the QBR, the supplier apologizes vaguely and promises to "try harder".',
      q: 'How should the Procurement Lead manage this situation according to professional SRM practice?',
      options: [
        {
          text: 'Accept the verbal apology and wait another 6 months to see if things improve naturally.',
          isCorrect: false,
          rationale: 'Passive hope is not a management strategy; stock-outs are destroying retail revenue.'
        },
        {
          text: 'Issue a formal Corrective Action Request (CAR). Require the supplier\'s operations director to submit a written Root Cause Analysis (5-Whys) and a binding 30-day Remediation Plan, while enforcing contractual SLA financial service credits.',
          isCorrect: true,
          rationale: 'Correct! Strategic relationships require structured accountability. Enforcing pre-agreed contract remedies while demanding a formal root-cause remediation plan fixes the operational breakdown professionally.'
        },
        {
          text: 'Immediately cancel the contract on the spot without checking if an alternative logistics network exists.',
          isCorrect: false,
          rationale: 'Abruptly terminating your primary logistics provider with no replacement shuts down retail operations immediately.'
        }
      ],
      principle: 'Pair contractual accountability with structured operational remediation: enforce SLA credits while requiring a formal Corrective Action Plan.'
    },
    {
      type: 'mcq',
      q: 'What is the purpose of conducting "360-Degree Feedback" in a Supplier Relationship Management program?',
      options: [
        {
          text: 'To ask the supplier for confidential feedback on how the buyer\'s own internal teams are performing (e.g. promptness of payments, forecast accuracy, clarity of specs).',
          isCorrect: true,
          rationale: 'Correct! Often, supplier delivery failures are caused by the buyer\'s own bad habits: changing order specs at the last minute, erratic forecasting, or 90-day invoice delays. 360-degree feedback fixes internal bottlenecks to become a "Customer of Choice".'
        },
        {
          text: 'To spin the supplier around in a swivel chair.',
          isCorrect: false,
          rationale: 'Nonsensical distractor.'
        },
        {
          text: 'To audit the supplier\'s political donations.',
          isCorrect: false,
          rationale: 'Irrelevant to operational SRM.'
        }
      ],
      principle: 'High-performing supply chains require two-way accountability: fixing internal buyer dysfunction is often the fastest way to improve supplier performance.'
    },
    {
      "type": "scenario",
      "context": "A strategic supplier scores 92 percent on delivery and quality but 68 percent on responsiveness, and has missed three service reviews. The account manager calls them \"a great supplier who is hard to work with\". What should the review do?",
      "q": "What is the right approach?",
      "options": [
        {
          "text": "Accept the narrative, because the delivery and quality record is strong and the account manager has the relationship.",
          "isCorrect": false,
          "rationale": "This is the failure mode of relationship-led reviews, and it is why scorecards are often ignored. A 68 percent responsiveness score is not a rounding error, and the narrative and the number are describing different things: the supplier delivers well and is hard to work with. That combination has consequences, and the review is the place to say so. Accepting the narrative also means the scorecard is not measuring anything, which removes the reason to have one."
        },
        {
          "text": "Use the scorecard to make the trade explicit: 92 on delivery and quality against 68 on responsiveness, with the agreed remedy for the gap, and a decision on whether the performance still justifies the strategic status.",
          "isCorrect": true,
          "rationale": "This is what a business review is for. The scorecard makes the tension visible and quantified, the narrative makes it contextual, and the two together support a decision that neither supports alone. The step that is often missing is the last one: whether the performance still justifies the strategic status, the volume commitment and the senior access that go with it. A supplier that delivers reliably but makes the business expensive to work with is a different proposition from the one that was selected, and the review is where that is said out loud and acted on."
        },
        {
          "text": "Re-weight the scorecard so delivery and quality count for more, since they reflect what matters to the business.",
          "isCorrect": false,
          "rationale": "Re-weighting after the results are known makes the scorecard meaningless and removes the comparability that made it useful. It also teaches everyone involved that the weights move to produce the desired answer. If responsiveness genuinely should carry more weight for this category, that is a change to the category strategy, agreed before the next cycle, and it applies to every supplier in the category rather than to one that has just been reviewed badly."
        },
        {
          "text": "Move the supplier out of the strategic tier and onto a transactional agreement, given the responsiveness gap.",
          "isCorrect": false,
          "rationale": "This is a legitimate option but it is a large one to take on a 32-point gap in one dimension, and it should not be the first move. The gap has to be understood first: is it responsiveness on quotes, on issues, on invoices or on changes, and is it a capacity problem, a behaviour problem or a relationship problem? A supplier with a specific, fixable responsiveness gap and strong delivery is often worth keeping at a lower volume. Downgrading first and diagnosing afterwards risks losing a supplier that was recoverable."
        }
      ],
      "principle": "Make the score and the narrative meet. A 68 on responsiveness next to a 92 on delivery is a decision to take, not a rounding issue."
    },
    {
      "type": "mcq",
      "q": "A supplier business review is most useful when it is:",
      "options": [
        {
          "text": "Held at a fixed cadence, whether or not there is anything to discuss, so the data is comparable over time.",
          "isCorrect": false,
          "rationale": "A fixed cadence is good discipline for a data review and bad for a business review. Cadence without a purpose produces meetings that both sides skip, which is how a review that was meant to improve performance becomes a formality. The review should happen when there is a decision to make, and the data should be there to inform it, with a cadence covering the data collection."
        },
        {
          "text": "Held to decide something: continue, improve, re-plan or exit, with the performance data and the relationship context in front of the decision.",
          "isCorrect": true,
          "rationale": "A review is a decision forum. If there is no decision available, the meeting has no purpose and will not improve the relationship. The structure that works is: performance against the agreed measures, the supplier's explanation, the forward plan with owners and dates, and then a decision on volume, terms, status or exit. The data is the evidence for the decision, and the relationship context is what makes the decision reasonable rather than merely correct."
        },
        {
          "text": "Run by procurement alone, so that the commercial conversation is not diluted by operational complaints.",
          "isCorrect": false,
          "rationale": "The risk is the opposite: a review run only by procurement tends to become a score discussion, because procurement sees the supplier through a commercial lens and the receiving team sees a different supplier. The review needs the function that uses the supply, because delivery and responsiveness are experienced where the work happens, and the buyer is the one who has to convert the outcome into a plan."
        },
        {
          "text": "Held with the supplier's account manager, because they are the relationship and will know what is really going on.",
          "isCorrect": false,
          "rationale": "The account manager is the right person to be in the room and the wrong person to be the only one. An account manager with a strong relationship will usually carry a sympathetic narrative, and the operational experience that contradicts it will not be in the room. The review needs the buyer, the user of the supply and the account manager together, or the scorecard will be quietly overruled by the relationship every cycle."
        }
      ],
      "principle": "A review is a decision forum: continue, improve, re-plan or exit. The data informs the decision; it is not the meeting."
    }
 ],
  relSop: 'sop-supplier-performance-management',
  rel: {
    concepts: ['supplier-performance', 'supplier-relationship-management', 'supplier-development', 'supplier-segmentation'],
    sops: ['sop-supplier-performance-management'],
    checklists: ['cl-supplier-performance-review'],
    templates: ['tpl-supplier-scorecard', 'tpl-supplier-business-review'],
    calcs: ['calc-supplier-scorecard', 'calc-supplier-concentration'],
    decisions: ['dual-source', 're-source'],
    kpis: ['kpi-otif', 'kpi-defect-rate']
  },
  labMission: {
    title: 'Mission 18: Build & Evaluate a Supplier Performance Scorecard',
    desc: 'Use the Supplier Scorecard Calculator to evaluate real-world vendor delivery, quality, and commercial KPIs.',
    tasks: [
      'Open the Supplier Scorecard Calculator.',
      'Input monthly operational metrics across Quality (PPM), Delivery (OTIF), Commercial, and Service.',
      'Review the composite supplier rating and generate a formal Performance Summary.'
    ],
    ctaLabel: 'Launch Scorecard Tool',
    ctaHref: '#/calc/calc-scorecard',
    secondaryLabel: 'Open SRM Template',
    secondaryHref: '#/tpl'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-savings-reporting',
  title: 'Savings Measurement & Value Reporting',
  module: 'Module 8: Supplier Management & Value Realization',
  kicker: 'Function 8.2',
  tagline: 'Bridging the credibility gap between procurement savings and the CFO\'s general ledger.',
  desc: 'Master the distinction between Hard Savings (Cost Reduction) and Soft Savings (Cost Avoidance), establish verified baselines, reconcile with Finance, and build executive value dashboards.',
  duration: '20 mins',
  lifecycleStage: 'Stage 21: Savings Realization & Value Audit',
  lifecycleDesc: 'The final closing loop of the procurement lifecycle where delivered value is verified, audited, and celebrated.',
  
  what: 'Savings measurement and value reporting is the disciplined financial methodology used to quantify, validate, reconcile, and report the commercial savings, cost avoidance, working capital gains, and risk mitigation generated by procurement initiatives.',
  why: [
    'The "Procurement Credibility Gap": CFOs frequently dismiss procurement claims because reported savings do not show up as actual budget reductions on the company\'s bottom line.',
    'Validates procurement\'s Return on Investment (ROI): demonstrating that every $1 invested in the procurement team yields $5 to $10 in bottom-line cash savings.',
    'Prevents budget re-absorption: ensuring negotiated price cuts result in lower departmental budget allocations rather than being spent on other items.'
  ],
  when: [
    'Immediately following the implementation of a newly negotiated contract.',
    'Monthly during financial budget reconciliations with the CFO and Finance Controllers.',
    'Annually during executive performance reporting.'
  ],
  raci: [
    { role: 'Procurement Specialist / Lead', resp: 'Calculates savings using standardized methodology; provides contract and invoice evidence.' },
    { role: 'Finance Business Partner / Controller', resp: 'Audits baseline data, verifies accounting treatment, and formally countersigns the savings claim.' },
    { role: 'Budget Owner', resp: 'Confirms that departmental operating budgets are reduced to reflect the lower pricing.' },
    { role: 'Chief Financial Officer (CFO)', resp: 'Reviews the consolidated corporate savings report and presents results to the Board.' }
  ],
  inputs: [
    'Historical baseline price and volume data (prior 12 months verified AP spend).',
    'Newly negotiated contract price schedule and implementation date.',
    'Actual invoice consumption data from ERP accounts payable.'
  ],
  outputs: [
    'Finance-Reconciled Savings Certificate / Form.',
    'Corporate Procurement Value Dashboard (Hard Savings, Cost Avoidance, Working Capital).',
    'Budget Adjustment Memo reducing departmental cost center allocations.'
  ],
  controls: [
    'Finance Sign-Off Mandate: no savings number can be published externally or reported to executives without written validation from Finance.',
    'Clean Baseline Protocol: baselines must reflect the weighted average price of the prior 12 months, not an arbitrarily chosen peak quote.',
    'Volume effect separation: procurement cannot claim savings caused purely by business downsizing (if the company buys 50% fewer laptops because it laid off staff, that is not a procurement saving).'
  ],
  mistakes: [
    'Reporting "Negotiated Savings" on Day 1 based on estimated volumes that are never actually purchased by the business.',
    'Blurring Hard Savings (actual cash reduction) with Cost Avoidance (preventing a hypothetical price increase).',
    'Failing to claw back departmental budgets: leaving the saved cash in department budgets where managers spend it on luxury offsite dinners.'
  ],
  bestPractices: [
    'Categorize savings into 3 transparent tiers: Tier 1: Hard Cost Reduction (P&L impact), Tier 2: Cost Avoidance (mitigating market index inflation), Tier 3: Value Add (free warranties, extended terms).',
    'Calculate savings on actual invoiced spend: track savings monthly as invoices arrive rather than claiming 100% upfront.',
    'Establish an official Savings Governance Charter co-signed by the Head of Procurement and the Chief Financial Officer.'
  ],
  terms: [
    { term: 'Hard Savings (Cost Reduction)', def: 'Actual reduction in expenditure compared to prior year spending that directly lowers operating costs and improves P&L net income.' },
    { term: 'Soft Savings (Cost Avoidance)', def: 'Actions that prevent an impending cost increase (e.g. negotiating a supplier\'s proposed 10% price hike down to 2%).' },
    { term: 'Baseline', def: 'The verified historical price paid for an item over the prior 12-month period, used as the benchmark to measure savings.' }
  ],
  thinkingPoints: [
    {
      quote: 'Savings not agreed with Finance are just opinions on a PowerPoint slide.',
      explanation: 'If procurement proudly announces: "We saved $5 million this year!", but the CFO looks at the company balance sheet and expenses have gone up by $2 million, procurement loses all credibility. Elite procurement teams invite Finance into the savings calculation process, agree on the rules upfront, and require Finance to sign off on every dollar claimed.',
      realWorldExample: 'A procurement team negotiated a $200,000 price cut on IT server hosting. Instead of celebrating in isolation, the Category Manager met with the FP&A Director and modified the IT department\'s next-year budget downward by exactly $200,000. At the end of the year, the CFO publicly commended procurement at the all-hands meeting because the savings flowed straight to the company\'s bottom line.',
      reflectionPrompt: 'Does your Finance department audit and countersign procurement savings reports, or do they view them with skepticism?'
    }
  ],
  sopSteps: [
    {
      title: 'Baseline Determination & Methodology Selection',
      role: 'Procurement Specialist & Finance',
      desc: 'Establish historical 12-month baseline price paid; determine whether initiative is Hard Cost Reduction or Cost Avoidance.',
      control: 'Baseline must be extracted from verified Accounts Payable historical invoice records.',
      record: 'Savings Baseline Calculation Sheet.',
      pitfall: 'Using a high catalog list price as the baseline instead of what the company actually paid.'
    },
    {
      title: 'Implementation & Actual Realization Tracking',
      role: 'Procurement Specialist',
      desc: 'Track actual purchase order volume over the contract year; calculate savings: (Baseline Price - New Price) x Actual Volume.',
      control: 'Exclude volume reduction effects from unit price efficiency calculations.',
      record: 'Monthly Savings Realization Ledger.',
      pitfall: 'Claiming savings on forecast volumes that were never purchased.'
    },
    {
      title: 'Finance Reconciliation & Budget Clawback',
      role: 'Category Manager & Finance Controller',
      desc: 'Meet monthly with Finance to reconcile invoiced spend; secure Finance sign-off; reduce departmental operating budgets.',
      control: 'Formal written Finance Controller sign-off required on all savings entries.',
      record: 'Signed Savings Certificate & Executive Value Dashboard.',
      pitfall: 'Publishing savings reports without prior Finance Controller review and approval.'
    },
    {
      "title": "Lock the Baseline and Agree It With Finance Before the Action",
      "role": "Category Manager",
      "desc": "Establish what was genuinely paid or would have been paid, document every adjustment, and obtain finance agreement on the baseline before the negotiation or the commitment happens.",
      "control": "The baseline is dated, evidenced and signed by finance before the action, and any later change is recorded as a restatement with the reason.",
      "record": "Baseline record with the source data, the adjustments, the finance agreement and the date locked.",
      "pitfall": "Settling the baseline after the outcome is known, which is how savings numbers lose their finance sign-off."
    },
    {
      "title": "Classify Savings Against Avoidance and Report Them Separately",
      "role": "Category Manager",
      "desc": "Classify each benefit as a saving, a cost avoidance or a one-off, record the realisation route and the expected date, and keep the three apart in the reporting.",
      "control": "Every initiative is classified before it is reported, and no avoidance is added to a saving total before it is realised.",
      "record": "Savings register with the classification, the baseline reference, the realisation route and the expected date.",
      "pitfall": "Adding avoidance to savings in a headline total, and having to revise it down in public when the avoidance does not materialise."
    }
 ],
  quizzes: [
    {
      type: 'calc',
      context: 'A supplier who currently charges $50 per unit sends a formal notification increasing their price to $60 per unit due to global inflation. Procurement enters negotiations, conducts a should-cost teardown, and settles the final price at $48 per unit. The company purchases 10,000 units over the year.',
      q: 'Under standard procurement accounting rules, how much Hard Savings (Cost Reduction) and how much Soft Savings (Cost Avoidance) did procurement deliver?',
      options: [
        {
          text: 'Hard Savings: $20,000 ($2/unit reduction vs prior year); Cost Avoidance: $120,000 ($12/unit avoided vs demanded hike).',
          isCorrect: true,
          rationale: 'Correct! Hard savings is the reduction below historical baseline: ($50 - $48) x 10,000 = $20,000 actual cash reduction. Cost avoidance is the difference between the demanded price and final price: ($60 - $48) x 10,000 = $120,000 avoided inflation. Separating them transparently builds total trust with Finance!'
        },
        {
          text: 'Hard Savings: $120,000; Cost Avoidance: $0.',
          isCorrect: false,
          rationale: 'Falsely claiming cost avoidance as hard cash savings destroys procurement credibility with the CFO.'
        },
        {
          text: 'Total savings of $140,000 hard cash.',
          isCorrect: false,
          rationale: 'Double counting hard and soft savings is a fatal reporting error.'
        }
      ],
      calcWork: 'Savings Breakdown:\n- Prior Baseline: $50.00\n- Demanded Price: $60.00\n- Final Settled Price: $48.00\n- Volume: 10,000 units\n\nHard Savings (P&L Cost Reduction):\n($50 - $48) x 10,000 = $20,000\n\nSoft Savings (Cost Avoidance):\n($60 - $48) x 10,000 = $120,000.',
      principle: 'Always separate Hard Cost Reduction (P&L impact) from Cost Avoidance (mitigated inflation) to maintain complete financial credibility.'
    },
    {
      type: 'scenario',
      context: 'Last year your company spent $2,000,000 on travel (1,000 international flights at $2,000 each). This year, due to an internal hiring freeze, the company only took 400 flights, spending $800,000 at the exact same $2,000 ticket price.',
      q: 'Can procurement report $1,200,000 in procurement savings?',
      options: [
        {
          text: 'No. The unit price did not decrease at all ($2,000 ticket price is identical). The $1.2M reduction is a business volume reduction (demand reduction), not a procurement efficiency saving.',
          isCorrect: true,
          rationale: 'Correct! Procurement efficiency is measured by unit price and commercial terms. If volume drops because the company stopped traveling, that is an operational demand shift, not a procurement negotiation achievement.'
        },
        {
          text: 'Yes! Less money was spent, so procurement can claim all of it.',
          isCorrect: false,
          rationale: 'If procurement claims credit for corporate austerity and hiring freezes, Finance will completely reject the claim.'
        },
        {
          text: 'Claim 50% of it as a compromise.',
          isCorrect: false,
          rationale: 'Arbitrary compromises have no accounting validity.'
        }
      ],
      principle: 'Never conflate business demand reductions with procurement commercial savings.'
    },
    {
      "type": "scenario",
      "context": "A negotiation saved 120,000 a year against a last-paid-price baseline. Finance will not sign it off, because the previous year's price was inflated by a one-off promotional discount that the supplier withdrew. What is the right response?",
      "q": "What should the buyer do?",
      "options": [
        {
          "text": "Report the saving against the budgeted price instead, which finance accepts, and keep the same 120,000 figure.",
          "isCorrect": false,
          "rationale": "Moving the baseline to make the number acceptable is baseline gaming, and it is the most common way a savings programme loses credibility with finance. The budgeted price is not what was paid, so a saving against it is not money the organization did not spend. Finance is right to refuse this figure, and the reason it can refuse it is that the baseline was never agreed before the negotiation."
        },
        {
          "text": "Go back to the evidence and agree a baseline with finance before the fact: what was actually paid, adjusted for the one-off, with the adjustment documented and agreed.",
          "isCorrect": true,
          "rationale": "The substantive problem is that the baseline was never locked before the negotiation, which is the control that finance signs against. The remedy is to reconstruct it properly, not to move it: establish what was genuinely paid, remove the one-off and document the adjustment, and have finance agree the basis with the reasoning stated. That produces a figure that is lower than 120,000 and defensible, rather than 120,000 that is not. The lesson to carry forward is the process one, and it belongs in the savings calculation procedure."
        },
        {
          "text": "Report the 120,000 as a cost avoidance rather than a saving, since the increase would otherwise have applied.",
          "isCorrect": false,
          "rationale": "That is a category change, not a baseline change, and it will not survive scrutiny either, because the underlying claim is still measured against a price that was never really paid. Avoidance is a different measure with different rules, and the honest use of it is for cost that genuinely did not arise, not as a relabelling of a saving the baseline cannot support."
        },
        {
          "text": "Split the difference, report 90,000 as the saving and 30,000 as an unallocated benefit, so part of it can be signed.",
          "isCorrect": false,
          "rationale": "This invents a number to fit a process, and it is the worst of the options because it looks like compromise while being entirely arbitrary. The finance reviewer is not asking for a smaller number; they are asking for a number they can defend to an auditor. An arbitrary split gives them neither, and it removes the incentive to fix the actual problem, which is the baseline discipline."
        }
      ],
      "principle": "If finance will not sign the baseline, the answer is a better baseline, evidenced and agreed - not a smaller number and not a different label."
    },
    {
      "type": "mcq",
      "q": "Which of these is the correct treatment of cost avoidance?",
      "options": [
        {
          "text": "It is reported separately from savings, because it is a different measure with different rules.",
          "isCorrect": true,
          "rationale": "They are different things and the distinction is the point. A saving is money the organization did not spend that it otherwise would have. An avoidance is money the organization did not spend that it was never going to spend anyway, because the demand never materialised or the risk never crystallised. Reporting them together inflates the number and, in most review processes, gets the whole programme discredited. They also have different realization profiles, so a saving committed in a negotiation and an avoidance that depends on a project not happening should never be added before they are realized."
        },
        {
          "text": "It is added to savings in the reporting, because both reduce cost and the total is what the business cares about.",
          "isCorrect": false,
          "rationale": "The total is not what the business can act on, and combining them is the single most common reason a savings number is challenged. Avoidance is usually not realized and is often not repeatable, so adding it to a contracted saving overstates the result and, when the avoidance fails to materialise, the reported total has to be revised downwards in public."
        },
        {
          "text": "It is excluded entirely from savings reporting, because it is not a real saving.",
          "isCorrect": false,
          "rationale": "Excluding avoidance entirely is also wrong, because avoidance has real value and the CFO needs to see it: a negotiated cost avoidance on a renewal is worth a great deal, and it is often the largest single benefit of the negotiation. The error is not counting avoidance; the error is counting it as if it were a saving, or counting it before it is realized."
        },
        {
          "text": "It is counted only once it is realized in the actuals, in the same period as the savings.",
          "isCorrect": false,
          "rationale": "Realisation in the actuals is the right test, and it is a necessary part of the treatment. The error is in the last clause: counting avoidance in the same period as the savings is how the two measures get combined, and combining them is precisely what the separate reporting exists to prevent. Avoidance and savings belong on separate lines, each realised on its own evidence, and a total that adds them together is the number finance will not sign."
        }
      ],
      "principle": "Savings and avoidance are different measures with different rules. Report them separately, and count both only once they are realized."
    }
 ],
  relSop: 'sop-savings-calculation',
  rel: {
    concepts: ['savings-types', 'savings-measurement', 'savings-baseline', 'savings-realization', 'cost-avoidance'],
    sops: ['sop-savings-calculation'],
    checklists: ['cl-savings-validation'],
    templates: ['tpl-savings-validation', 'tpl-cost-avoidance'],
    calcs: ['calc-savings-analysis', 'calc-budget-vs-actual'],
    decisions: ['accept-price-increase'],
    kpis: ['kpi-savings', 'kpi-cost-avoidance', 'kpi-savings-realization']
  },
  labMission: {
    title: 'Mission 19: Model Hard Savings & Build the Savings Dashboard',
    desc: 'Use the Savings Analysis Calculator to model cost reduction vs cost avoidance across category initiatives.',
    tasks: [
      'Open the Savings Analysis Calculator.',
      'Enter baseline spend, negotiated pricing, and actual volume to calculate net savings.',
      'Open the Savings Dashboard to view consolidated enterprise value tracking.'
    ],
    ctaLabel: 'Launch Savings Calculator',
    ctaHref: '#/calc/calc-savings',
    secondaryLabel: 'Open Savings Dashboard',
    secondaryHref: '#/dash-savings'
  }
});
