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
