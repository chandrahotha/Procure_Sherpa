/* ==========================================================
   Procure Sherpa v2.0 - Academy Content Part 2
   Modules 3 & 4: Commercial Analysis, TCO, Should-Cost,
                  Supplier Evaluation & Risk Mitigation
   ========================================================== */
PS.ACADEMY_FUNCTIONS = PS.ACADEMY_FUNCTIONS || [];

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-quote-normalization',
  title: 'Quotation Comparison & Price Normalization',
  module: 'Module 3: Commercial Analysis & Cost Engineering',
  kicker: 'Function 3.1',
  tagline: 'Leveling the playing field to perform true apples-to-apples commercial comparisons.',
  desc: 'Learn how to normalize foreign currencies, Incoterms, freight, customs duties, payment terms, and scope exclusions so supplier quotations can be compared accurately.',
  duration: '20 mins',
  lifecycleStage: 'Stage 8: Quotation Analysis & Evaluation',
  lifecycleDesc: 'The bridge between receiving raw supplier proposals and declaring a commercial ranking.',
  
  what: 'Quotation comparison and price normalization is the disciplined analytical process of adjusting raw supplier bids to a common commercial baseline. Suppliers quote in different currencies, with different shipping terms (Incoterms), different warranty durations, and different inclusions/exclusions. Normalization reveals the true comparable price.',
  why: [
    'Raw quote comparison is deceptive: a supplier quoting $100 Ex-Works is often vastly more expensive than a supplier quoting $108 Delivered Duty Paid (DDP).',
    'Prevents hidden costs from destroying project budgets after contracts are awarded.',
    'Protects procurement from awarding contracts based on misleading baseline assumptions.'
  ],
  when: [
    'Immediately following the close of an RFQ or tender.',
    'Whenever comparing domestic suppliers against international overseas vendors.',
    'When bids contain varying commercial conditions (e.g. payment terms of Net 30 vs Net 90).'
  ],
  raci: [
    { role: 'Procurement Specialist', resp: 'Builds the normalization model, verifies exchange rates, and calculates landed adjustments.' },
    { role: 'Logistics / Trade Compliance', resp: 'Validates ocean freight, customs tariffs, port handling, and inland transit costs.' },
    { role: 'Finance / Treasury', resp: 'Provides standard corporate foreign exchange (FX) conversion rates and cost of capital.' },
    { role: 'Technical Evaluator', resp: 'Confirms that scope differences (e.g. spare parts, training) are properly costed and normalized.' }
  ],
  inputs: [
    'Raw supplier bid schedules and technical clarification responses.',
    'Applicable Incoterms 2020 definitions (EXW, FOB, CIF, DAP, DDP).',
    'Official corporate planning FX exchange rates and import tariff schedules.'
  ],
  outputs: [
    'Normalized Commercial Bid Comparison Sheet.',
    'Variance and Exception Report highlighting pricing anomalies.',
    'Apples-to-Apples Commercial Ranking Table.'
  ],
  controls: [
    'Use standardized Treasury-approved FX exchange rates for all bids on the same date. Never allow suppliers to pick their own spot rates.',
    'Mandatory line-by-line verification: every item omitted by one bidder must be quantified and added to their bid price.',
    'Two-person review of complex commercial normalization models before stakeholder presentation.'
  ],
  mistakes: [
    'Comparing an Ex-Works (EXW) quote directly against a Delivered at Place (DAP) quote without adding freight and insurance.',
    'Ignoring payment term differences: failing to account for the working capital value of Net 60 vs 100% advance payment.',
    'Comparing prices with different tax inclusions (e.g. comparing a VAT-inclusive quote against a VAT-exclusive quote).'
  ],
  bestPractices: [
    'Convert all bids to Delivered Duty Paid (DDP) or Total Landed Cost at the receiving dock doors.',
    'Create an "Add/Deduct" schedule: if Bidder A includes 3 years of warranty while Bidder B includes only 1 year, add the cost of 2 years extended warranty to Bidder B.',
    'Calculate effective discount rates when cash discounts (e.g., 2/10 Net 30) are offered.'
  ],
  terms: [
    { term: 'Price Normalization', def: 'The mathematical adjustment of supplier quotes to ensure all bids reflect identical scope, terms, currency, and delivery points.' },
    { term: 'Ex-Works (EXW)', def: 'Buyer assumes all costs and risks from the seller\'s factory gate, including export clearance, freight, insurance, and duties.' },
    { term: 'Delivered Duty Paid (DDP)', def: 'Seller assumes all costs, risks, transportation, import customs duties, and taxes right to the buyer\'s designated location.' }
  ],
  thinkingPoints: [
    {
      quote: 'Comparing raw quotations without normalizing freight, currency, taxes, and scope exclusions is not procurement: it is a dangerous lottery.',
      explanation: 'Un-normalized bid numbers are optical illusions. A vendor from overseas may look 15% cheaper on the surface, but when you add 8% international freight, 5% import tariffs, 2% port handling, and 3% currency hedging costs, they are actually more expensive than a reliable local supplier.',
      realWorldExample: 'A heavy machinery buyer compared two bids for hydraulic cylinders: Supplier A (local) quoted $500/unit delivered. Supplier B (overseas) quoted $420/unit Ex-Works. The buyer rushed to award Supplier B. When the bill arrived, international ocean freight added $45/unit, customs duties added $28/unit, port demurrage fees added $35/unit, and the true cost was $528/unit, plus an 8-week delay.',
      reflectionPrompt: 'Does your organization have a standard formula for adding shipping, import duties, and payment term value to raw supplier quotes?'
    }
  ],
  sopSteps: [
    {
      title: 'Bid Schedule Deconstruction & Scope Check',
      role: 'Procurement Specialist',
      desc: 'Verify that every bidder quoted the exact required quantity, specification, and included all required auxiliary services (training, warranty).',
      control: 'Flag any bidder who marked required line items as "Excluded" or "TBD".',
      record: 'Bid Scope Completeness Matrix.',
      pitfall: 'Assuming all bidders read the same specification identically without checking line items.'
    },
    {
      title: 'Currency & Incoterms Normalization',
      role: 'Procurement Specialist',
      desc: 'Convert all foreign currency quotes into base corporate currency using Treasury-approved rates; add freight, customs, and insurance to reach a common delivery point (DDP).',
      control: 'Use official Harmonized Tariff Schedule (HTS) codes to calculate accurate import duty percentages.',
      record: 'Landed Cost Normalization Table.',
      pitfall: 'Forgetting inland trucking freight from the seaport to your local warehouse.'
    },
    {
      title: 'Commercial Terms Adjustment & Ranking',
      role: 'Procurement Lead',
      desc: 'Adjust for warranty durations, payment terms, and volume discounts; generate the normalized apples-to-apples commercial ranking.',
      control: 'Sign-off by Category Lead and Finance Business Partner.',
      record: 'Final Commercial Evaluation Summary.',
      pitfall: 'Presenting raw quote numbers to executive stakeholders before normalization is complete.'
    },
    {
      "title": "Normalize the Commercial Basis of Every Quote",
      "role": "Procurement Specialist",
      "desc": "Convert every quote to a common basis: one Incoterm, one currency, one tax treatment, one payment term, one scope and one delivery point, recording every adjustment made.",
      "control": "The normalization sheet shows the original quote and every adjustment applied to it, so any line can be traced back to the supplier's own submission.",
      "record": "Normalized comparison sheet with the original quote, each adjustment and the reason for it.",
      "pitfall": "Adjusting the numbers silently, so the file no longer shows what the supplier actually said."
    },
    {
      "title": "Quantify the Working Capital Effect of the Terms",
      "role": "Procurement Specialist",
      "desc": "Value the difference in payment terms and in the timing of delivery at your own cost of capital, so that a longer-term, lower-price offer can be compared fairly.",
      "control": "The cost-of-capital rate used is the one set in Settings or entered on the face of the comparison, and the working capital effect is shown as a separate line rather than folded into the price.",
      "record": "Comparison sheet with the working capital effect shown separately from the unit price.",
      "pitfall": "Comparing a cash price with a 60-day price and concluding that the cash price is better, when the cash cost of the 60-day terms is higher."
    }
 ],
  quizzes: [
    {
      type: 'calc',
      context: 'You are procuring 1,000 industrial pumps. Supplier X (Domestic) quotes $210 each, Delivered Duty Paid (DDP) to your factory. Supplier Y (International) quotes $185 each, Ex-Works (EXW) at their port in Shanghai. You estimate international shipping & insurance at $16 per pump, import customs duty at 6% of the EXW price, and local inland delivery at $8 per pump.',
      q: 'What is the true normalized landed cost per pump for Supplier Y, and which supplier is commercially superior?',
      options: [
        {
          text: 'Supplier Y landed cost is $220.10; Supplier X is cheaper by $10.10 per pump ($10,100 total company savings).',
          isCorrect: true,
          rationale: 'Correct! Supplier Y breakdown: Base $185 + Freight/Insurance $16 + Customs Duty ($185 x 6% = $11.10) + Local Trucking $8 = $220.10 landed. Supplier X at $210 DDP is $10.10 cheaper per unit, saving $10,100 on the order.'
        },
        {
          text: 'Supplier Y landed cost is $185; Supplier Y is cheaper by $25 per pump.',
          isCorrect: false,
          rationale: 'This ignores all freight, customs duty, and inland delivery costs.'
        },
        {
          text: 'Supplier Y landed cost is $209; Supplier Y is cheaper by $1 per pump.',
          isCorrect: false,
          rationale: 'This forgot the import customs duty ($11.10).'
        }
      ],
      calcWork: 'Supplier Y Landed Cost:\n- Base EXW: $185.00\n- Ocean Freight & Insurance: $16.00\n- Customs Duty (6% of $185): $11.10\n- Inland Local Delivery: $8.00\nTotal Landed: $220.10\n\nSupplier X DDP: $210.00\nDifference: Supplier X is $10.10 cheaper per unit ($10,100 total on 1,000 units).',
      principle: 'Always normalize to Total Landed Cost: a lower unit price at a foreign factory gate frequently turns into a more expensive purchase at your warehouse door.'
    },
    {
      type: 'scenario',
      context: 'Bidder A quotes $100,000 with standard Net 30 days payment terms. Bidder B quotes $98,000, but demands 100% advance payment 60 days before manufacturing begins, with zero bank guarantee.',
      q: 'As a commercial procurement professional, how do you evaluate Bidder B\'s proposal?',
      options: [
        {
          text: 'Award immediately to Bidder B because they are $2,000 cheaper on paper.',
          isCorrect: false,
          rationale: 'Handing 100% advance cash to an unbonded supplier exposes the company to total financial loss if the vendor goes bankrupt or defaults.'
        },
        {
          text: 'Reject the 100% advance cash demand or require Bidder B to provide an Advance Payment Bank Guarantee at their expense, while factoring in the corporate cost of capital for tying up cash for 60 days.',
          isCorrect: true,
          rationale: 'Correct! 100% advance payment transfers extreme operational and financial risk to the buyer. The cost of money and risk of default far outweigh a nominal $2,000 price variance.'
        },
        {
          text: 'Pay 50% under the table to get an extra discount.',
          isCorrect: false,
          rationale: 'Bribery and off-book payments are criminal offenses.'
        }
      ],
      principle: 'Payment terms carry significant risk and working capital value. Never accept advance payment terms without security instruments.'
    },
    {
      "type": "scenario",
      "context": "Three suppliers quote the same 1,000 units. Supplier A quotes 12.00 per unit EXW. Supplier B quotes 14.50 per unit DDP. Supplier C quotes 13.20 per unit FOB with a separately quoted 900 freight and 6 percent duty. Which is the lowest landed cost?",
      "q": "What is the correct comparison?",
      "options": [
        {
          "text": "Supplier A, at 12.00 per unit.",
          "isCorrect": false,
          "rationale": "That is the lowest headline price, and it is the number that the whole exercise exists to prevent you from using. A quoted price is not a comparable price until it is on the same basis: the same Incoterm, the same scope, the same currency, the same tax treatment, the same payment terms and the same delivery point. An EXW price is the supplier's cost before almost everything, and comparing it to a DDP price compares two different obligations."
        },
        {
          "text": "Supplier C, at 13.20 plus 900 freight plus 6 percent duty, which brings it to 14.10 per unit before anything else, and still needs the tax treatment checked.",
          "isCorrect": false,
          "rationale": "This is closer, but it is still not the comparison, and it is a useful illustration of how much work a normalization is. The 6 percent duty applies to a customs value that includes freight to the port of import, not to the FOB price, and the freight element may be partly non-deductible. The tax treatment, the currency and the payment terms are still outstanding. This is the right direction and the wrong level of finish."
        },
        {
          "text": "None can be called lowest until all three are converted to the same basis: the same Incoterm, currency, scope, tax treatment and payment terms, with freight and duty computed on the correct customs base.",
          "isCorrect": true,
          "rationale": "This is the discipline. You do not pick a winner from the quotes; you build a comparison. Convert every bid to a common basis, then make the additions explicit: freight to a stated destination, duty on the correct customs value, tax at the stated recoverability, and the cost of money for any materially different payment terms. The result is a landed, like-for-like cost per unit, and only then can the award be argued on the numbers. The spread between the raw quotes is the negotiation range, and the normalized spread is the decision."
        },
        {
          "text": "Supplier B, at 14.50 DDP, because the landed cost is included and no further additions are needed.",
          "isCorrect": false,
          "rationale": "A DDP price does include freight and duty to the named destination, which is why it is a good basis, but it is not automatically the cheapest once the other dimensions are equalized: the tax treatment, the currency, the scope and the payment terms can each move it. It is also possible for a supplier to price DDP high to win a delivery-inclusive comparison, which is exactly why the basis has to be chosen and applied consistently, not inferred from whichever quote is largest."
        }
      ],
      "principle": "Do not pick a winner from the quotes. Build a like-for-like comparison, and let the additions be explicit."
    },
    {
      "type": "mcq",
      "q": "Why must a quote comparison use the same payment terms for every supplier?",
      "options": [
        {
          "text": "Because a contract with different terms is invalid, so the comparison has to be on a single set of terms.",
          "isCorrect": false,
          "rationale": "Suppliers routinely quote their standard terms, and a comparison is meant to normalise exactly that. You are not going to get every bidder onto your terms before you compare; you are going to price the difference between their terms and yours."
        },
        {
          "text": "Because the cost of money differs between terms, so an equal price on different terms is not an equal offer.",
          "isCorrect": true,
          "rationale": "Net 30 against net 90 is not a cosmetic difference: on a large commitment, the value of the payment terms can outweigh a percentage point of price. That is the same reasoning as the early-payment discount calculator, applied in reverse to the comparison. Price the terms at your own cost of capital and the comparison becomes honest, and the award can be argued on the whole commercial position rather than on the unit price alone."
        },
        {
          "text": "Because it simplifies the contract award, since only one set of terms needs to be written into it.",
          "isCorrect": false,
          "rationale": "That is an administrative convenience and it comes at the cost of the comparison. Forcing terms at the point of comparison throws away information the buyer needs: a supplier offering worse terms may be better value, and a supplier offering better terms may be worth negotiating for. You want to know the difference, not to hide it."
        },
        {
          "text": "Because differing terms indicate differing risk, and a higher-risk supplier is usually less reliable.",
          "isCorrect": false,
          "rationale": "There is no reliable relationship between a supplier's payment terms and its reliability, and treating it as one would be a heuristic, not an analysis. If you want to assess delivery or performance risk, assess it directly, with a scorecard and evidence. Using payment terms as a proxy for reliability is guessing."
        }
      ],
      "principle": "Payment terms carry a cost of money. Price the difference at your own cost of capital before you compare."
    }
 ],
  relSop: 'sop-rfq',
  rel: {
    concepts: ['evaluation-criteria', 'rfi-rfq-rfp'],
    sops: ['sop-rfq'],
    checklists: ['cl-quote-comparison'],
    templates: ['tpl-bid-comparison'],
    calcs: ['calc-compare-quotes', 'calc-landed-cost'],
    decisions: ['unit-or-tco'],
    kpis: ['kpi-ppv']
  },
  labMission: {
    title: 'Mission 7: Compare Supplier Quotations in the Tool',
    desc: 'Use the Quote Comparison Calculator to normalize unit prices, freight, warranty adjustments, and payment terms across 3 competing suppliers.',
    tasks: [
      'Open the Compare Quotes Calculator.',
      'Enter raw quotes for Supplier A, Supplier B, and Supplier C with varying shipping terms.',
      'Analyze the normalized ranking and identify the true lowest-cost commercial supplier.'
    ],
    ctaLabel: 'Launch Quote Comparison Tool',
    ctaHref: '#/calc/calc-compare-quotes',
    secondaryLabel: 'Open Landed Cost Calculator',
    secondaryHref: '#/calc/calc-landed-cost'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-landed-cost-tco',
  title: 'Landed Cost & Total Cost of Ownership (TCO)',
  module: 'Module 3: Commercial Analysis & Cost Engineering',
  kicker: 'Function 3.2',
  tagline: 'Uncovering the iceberg of hidden lifecycle costs beyond the initial purchase price.',
  desc: 'Master the principles of Total Cost of Ownership (TCO) across acquisition, operating, maintenance, downtime, and disposal costs to make executive commercial recommendations.',
  duration: '22 mins',
  lifecycleStage: 'Stage 9: Total Cost of Ownership (TCO) Modeling',
  lifecycleDesc: 'Evaluates multi-year lifecycle financial impact before finalizing supplier selection.',
  
  what: 'Total Cost of Ownership (TCO) is a comprehensive financial estimate of all direct and indirect costs associated with acquiring, operating, maintaining, and disposing of an asset or service throughout its entire lifecycle. The initial purchase price is merely the visible tip of the commercial iceberg.',
  why: [
    'The initial purchase price frequently represents less than 20% to 30% of the total lifetime cost of an enterprise asset (e.g. software, fleet vehicles, industrial machinery).',
    'Prevents costly blunders: buying equipment that is cheap to buy but exorbitant to repair, power, or maintain.',
    'Elevates procurement into a trusted advisor to the CFO by focusing on bottom-line Return on Investment (ROI).'
  ],
  when: [
    'When procuring capital expenditure (Capex) assets, machinery, vehicles, or enterprise IT systems.',
    'When evaluating high-energy consuming equipment (chillers, compressors, servers).',
    'When deciding between purchasing an asset outright versus leasing or subscribing (Product-as-a-Service).'
  ],
  raci: [
    { role: 'Category Manager', resp: 'Builds the multi-year TCO financial model including inflation and Net Present Value (NPV).' },
    { role: 'Operations / Maintenance Lead', resp: 'Provides expected failure rates, maintenance cycles, and spare parts consumption data.' },
    { role: 'Finance / FP&A', resp: 'Provides the corporate discount rate / Weighted Average Cost of Capital (WACC).' },
    { role: 'Supplier', resp: 'Provides guaranteed power consumption ratings, preventative maintenance schedules, and spare parts price lists.' }
  ],
  inputs: [
    'Acquisition price, delivery, and commissioning costs.',
    'Estimated asset lifespan (e.g. 5, 7, or 10 years) and expected utilization hours.',
    'Operating expenses: electricity/fuel consumption, routine servicing, licensed consumable supplies.',
    'Estimated salvage / residual value at end-of-life disposal.'
  ],
  outputs: [
    'Comprehensive Multi-Year TCO Financial Model.',
    'Discounted Cash Flow (NPV) Comparison Matrix.',
    'Lifecycle Cost Sensitivity Analysis (testing energy price hikes or maintenance escalation).'
  ],
  controls: [
    'Contractualization of TCO claims: suppliers must guarantee their energy efficiency and maintenance intervals contractually.',
    'Formal Finance sign-off on the discount rate (cost of capital) used in NPV calculations.',
    'Inclusion of decommissioning, environmental remediation, and disposal compliance costs.'
  ],
  mistakes: [
    'Focusing exclusively on the initial sticker price and getting blindsided by astronomical consumable or spare parts prices.',
    'Believing supplier marketing brochures without demanding contractual performance guarantees or service level penalties.',
    'Failing to account for internal change management, user training, and software implementation costs.'
  ],
  bestPractices: [
    'Always use the 5-Pillar TCO Framework: Acquisition + Operating + Maintenance + Downtime/Risk + End-of-Life Disposal.',
    'Lock in spare parts pricing and software maintenance escalation caps (e.g. CPI + 1% max) during the initial negotiation.',
    'Discount future cash flows using Net Present Value (NPV) to reflect the time value of money.'
  ],
  terms: [
    { term: 'Total Cost of Ownership (TCO)', def: 'The complete sum of all purchase, installation, operating, maintenance, downtime, and disposal costs over the life of an asset.' },
    { term: 'Net Present Value (NPV)', def: 'The current value of future cash outflows discounted at the company\'s cost of capital.' },
    { term: 'Consumable Lock-In', def: 'A business model where equipment is sold cheaply, but proprietary consumables (e.g. printer ink, surgical blades) are sold at monopolistic margins.' }
  ],
  thinkingPoints: [
    {
      quote: 'The cheapest quotation is not necessarily the lowest-cost purchase.',
      explanation: 'In procurement, the purchase price is only what you pay on Day 1. TCO is what you pay every single day for the next 7 years. A supplier offering a 10% discount on a machine that consumes 30% more power and breaks down twice as often will cost your company millions in lost revenue.',
      realWorldExample: 'A logistics fleet manager purchased 50 delivery vans from Brand X because they were $3,000 cheaper per van than Brand Y (saving $150,000 upfront). Over 5 years, Brand X consumed 22% more fuel, suffered frequent transmission breakdowns, and had near-zero resale value. The total lifetime cost of Brand X was $620,000 HIGHER than Brand Y. The upfront "savings" were completely wiped out by fuel and maintenance bills.',
      reflectionPrompt: 'Think about enterprise software or machinery in your company: what percentage of the total spend goes to annual maintenance fees versus the initial license?'
    }
  ],
  sopSteps: [
    {
      title: 'TCO Boundary & Cost Driver Identification',
      role: 'Category Manager & Operations',
      desc: 'Map every lifecycle cost component: purchase price, freight, installation, power, maintenance labor, parts, and disposal.',
      control: 'Include decommissioning and e-waste disposal liabilities.',
      record: 'TCO Cost Driver Checklist.',
      pitfall: 'Forgetting installation, electrical upgrades, or software integration consulting fees.'
    },
    {
      title: 'Data Collection & Contractual Guarantees',
      role: 'Procurement Specialist',
      desc: 'Require all bidders to provide guaranteed operational consumption metrics (kWh/hour, MTBF failure rates, spare parts pricing).',
      control: 'Tie consumption claims to contractually binding performance liquidated damages.',
      record: 'Bidder Operational Data Sheet.',
      pitfall: 'Accepting optimistic manufacturer claims that are not backed by performance guarantees.'
    },
    {
      title: 'Lifecycle Modeling & Executive Recommendation',
      role: 'Category Manager',
      desc: 'Model cash flows over 5 to 10 years; apply NPV discount rates; prepare executive comparison highlighting lowest lifetime cost.',
      control: 'Finance validation of WACC discount rates and inflation assumptions.',
      record: 'Formal TCO Business Case and Recommendation Dossier.',
      pitfall: 'Recommending an asset with lowest TCO that the internal maintenance team cannot service locally.'
    },
    {
      "title": "Build the Life-Cycle Cost Model for Each Option",
      "role": "Category Manager",
      "desc": "Model acquisition, installation, energy, maintenance, consumables, downtime, disposal and residual value for every option over the same life and the same utilisation.",
      "control": "Every option is modelled over the same life and on the same assumptions, and any difference in the assumptions is declared rather than embedded in a number.",
      "record": "Life-cycle cost model per option with the acquisition, operating and end-of-life lines and the assumptions used.",
      "pitfall": "Comparing a new machine against a ten-year-old one, so the maintenance and residual assumptions flatter the new option."
    },
    {
      "title": "Discount the Cash Flows and Test the Sensitivity",
      "role": "Category Manager",
      "desc": "Discount the modelled cash flows at the organization's cost of capital, then test the answer against the assumptions it is most sensitive to: utilisation, energy price, maintenance scope and residual value.",
      "control": "The discount rate is the one set in Settings, and the sensitivity test shows the point at which the ranking would change.",
      "record": "Discounted life-cycle comparison with a sensitivity table on the four assumptions that move the answer.",
      "pitfall": "Reporting a single discounted number with no sensitivity, so a reader cannot see how close the decision is."
    }
 ],
  quizzes: [
    {
      type: 'scenario',
      context: 'You are procuring an enterprise data storage system. Vendor A bids $100,000 upfront with annual maintenance of $30,000/year for 5 years. Vendor B bids $140,000 upfront with annual maintenance of $15,000/year for 5 years. Both systems meet all technical requirements identically.',
      q: 'Ignoring the time value of money for simplicity, what is the 5-year Total Cost of Ownership for each, and which vendor is the lowest-cost purchase?',
      options: [
        {
          text: 'Vendor A: $250,000; Vendor B: $215,000. Vendor B is $35,000 cheaper overall over 5 years.',
          isCorrect: true,
          rationale: 'Correct! Vendor A: $100,000 + (5 x $30,000) = $250,000. Vendor B: $140,000 + (5 x $15,000) = $215,000. Although Vendor B has a 40% higher purchase price, its lower maintenance fees save the company $35,000 over 5 years.'
        },
        {
          text: 'Vendor A is $40,000 cheaper because their purchase price is only $100,000.',
          isCorrect: false,
          rationale: 'This is the classic purchase price trap: ignoring multi-year maintenance fees.'
        },
        {
          text: 'Both vendors cost exactly the same over 5 years.',
          isCorrect: false,
          rationale: 'Review the calculations: $250,000 vs $215,000.'
        }
      ],
      calcWork: 'Vendor A:\n- Upfront: $100,000\n- Maintenance (5 yrs @ $30k): $150,000\nTotal TCO = $250,000\n\nVendor B:\n- Upfront: $140,000\n- Maintenance (5 yrs @ $15k): $75,000\nTotal TCO = $215,000\n\nNet Lifecycle Advantage: Vendor B saves $35,000.',
      principle: 'Always calculate lifetime cost over the full operational horizon: a high initial price with low operating fees is frequently superior to a low initial price with predatory maintenance fees.'
    },
    {
      type: 'red_flag',
      context: 'A printer manufacturer offers your company 200 office multi-function printers for "FREE" ($0 purchase price), provided your company signs an exclusive 3-year contract to buy all toner cartridges and replacement drums from them at their standard catalog price.',
      q: 'Why should a professional procurement person view this "Free" offer with extreme caution?',
      options: [
        {
          text: 'It is a fantastic deal that should be signed immediately because free equipment saves capital budget.',
          isCorrect: false,
          rationale: 'There is no such thing as free enterprise equipment. The cost is simply shifted into exorbitant operating charges.'
        },
        {
          text: 'This is a classic "razor-and-blades" consumable lock-in trap. By accepting free hardware, you grant the vendor an uncompetitive monopoly over consumables, where they can inflate toner prices by 400% over the next 3 years.',
          isCorrect: true,
          rationale: 'Correct! Procurement must calculate the Cost-per-Page (CPP) over 3 years. Buying the printers outright and negotiating competitive bulk toner rates will almost always be vastly cheaper over the lifecycle.'
        },
        {
          text: 'The offer is illegal under corporate governance laws.',
          isCorrect: false,
          rationale: 'It is completely legal commercial practice, but an expensive trap for naive buyers.'
        }
      ],
      principle: 'Beware of "free" or subsidized capital equipment that locks the enterprise into proprietary, high-margin consumables or replacement parts.'
    },
    {
      "type": "scenario",
      "context": "An equipment supplier offers machine A at 90,000 with 26,000 of annual energy and 11,000 of annual maintenance, and machine B at 130,000 with 11,500 of energy and 4,500 of maintenance, both over five years. A colleague says A is 40,000 cheaper. What is the correct analysis?",
      "q": "What should the buyer do?",
      "options": [
        {
          "text": "Agree with the colleague. A is 40,000 cheaper on purchase price and the budget is what matters this year.",
          "isCorrect": false,
          "rationale": "That is the exact error total cost of ownership exists to prevent, and it is expensive in both directions: a decision made this way can be wrong by more than the price difference it was based on. The budget is a constraint on when the money is spent, not a measure of which machine is cheaper over its life, and the operating difference here is 21,000 a year, which is 105,000 over five years."
        },
        {
          "text": "Compare on discounted total cost of ownership over the five years, including the operating difference and the discount rate, and check what the residual value assumption is doing to the answer.",
          "isCorrect": true,
          "rationale": "A costs 90,000 + 5 x 37,000 = 275,000. B costs 130,000 + 5 x 16,000 = 210,000. B is 65,000 cheaper over the life, before discounting, on these figures. The comparison has to be discounted because the money is not spent at the same time, and the discount rate has to be yours, not the supplier's. And the residual value assumption matters: it is the one figure that is pure forecast, and it is where these comparisons are usually gamed."
        },
        {
          "text": "Compare the operating cost difference only, because the purchase price is the same for both under the framework agreement.",
          "isCorrect": false,
          "rationale": "The purchase prices are not the same, and if a framework agreement fixed the price the choice would be made on operating cost alone, which is a different problem. Here the capital difference is 40,000 and the operating difference is 21,000 a year, so the operating comparison is the larger part of the decision but it is not the whole of it. Discounted total cost of ownership is the comparison that keeps both in one number."
        },
        {
          "text": "Ask each supplier for a 5-year guaranteed total cost of ownership, and take the lower figure.",
          "isCorrect": false,
          "rationale": "That is outsourcing the analysis to the party with an interest in the answer, and a guaranteed figure is only as good as the guarantee. You do need the supplier's operating cost data, and you should test it, but you also need the discount rate, the residual value, the utilisation assumption and the maintenance scope, none of which a supplier will hand you complete and none of which you should accept unchecked."
        }
      ],
      "principle": "Purchase price is one input. Discounted total cost of ownership over the real life, with your own discount rate, is the decision."
    },
    {
      "type": "mcq",
      "q": "In a total cost of ownership comparison, the discount rate should be:",
      "options": [
        {
          "text": "The weighted average cost of capital of the organization, because that is the cost of the money being committed.",
          "isCorrect": true,
          "rationale": "The discount rate is the cost of the capital the organization is committing, and for a capital purchase that is normally the WACC. It is also the most contestable part of the analysis, which is exactly why it should be yours and stated, because the supplier will always prefer a higher rate (which shrinks the present value of future running costs and makes their machine look better). Setting it in Settings and stating it on the face of the analysis is what stops it being a negotiation variable."
        },
        {
          "text": "The risk-free rate, because the analysis should reflect the time value of money without a risk premium.",
          "isCorrect": false,
          "rationale": "A risk-free rate systematically overvalues cash flows further out, because it ignores the risk that the cash flows will not arrive as forecast. For a comparison whose whole purpose is to weigh a known capital cost against forecast operating costs, using a rate that carries no risk premium flatters whichever option has the larger forecast tail. The organization's actual cost of capital already contains the relevant risk."
        },
        {
          "text": "A low rate, to make the analysis conservative and avoid overstating the value of the decision.",
          "isCorrect": false,
          "rationale": "A low discount rate is not conservative, it is directional: it inflates the present value of future running costs, which flatters the option with the larger operating tail. If anything the choice is sensitive in both directions, which is precisely why it should be set from the organization's own cost of capital and disclosed, rather than picked for its effect on the answer."
        },
        {
          "text": "Whatever rate makes the two options look closest, so the decision is made on the other criteria.",
          "isCorrect": false,
          "rationale": "That is tuning the analysis to the desired answer, and it is the fastest way to lose the credibility of the whole exercise with finance. The discount rate is a fact about the organization's cost of capital, and the analysis reports what it produces. If the answer is uncomfortable, the answer is that the assumptions or the options need work, not that the rate needs adjusting."
        }
      ],
      "principle": "The discount rate is your cost of capital, stated on the face of the analysis. It is an input, never a lever."
    }
 ],
  relSop: 'sop-supplier-evaluation',
  rel: {
    concepts: ['total-cost-of-ownership', 'cost-breakdown', 'incoterms'],
    sops: ['sop-supplier-evaluation'],
    checklists: ['cl-commercial-evaluation'],
    templates: ['tpl-business-case'],
    calcs: ['calc-tco', 'calc-landed-cost', 'calc-should-cost'],
    decisions: ['unit-or-tco'],
    kpis: ['kpi-ppv', 'kpi-working-capital-impact']
  },
  labMission: {
    title: 'Mission 8: Build a 5-Year TCO Lifecycle Model',
    desc: 'Use the Total Cost of Ownership (TCO) Calculator to model acquisition, maintenance, energy, and disposal costs for equipment.',
    tasks: [
      'Open the TCO Calculator.',
      'Enter upfront capital expenditure, annual operational costs, energy consumption, and salvage value.',
      'Review the Net Present Value (NPV) breakdown and identify which cost component dominates the lifecycle.'
    ],
    ctaLabel: 'Launch TCO Calculator',
    ctaHref: '#/calc/calc-tco',
    secondaryLabel: 'Review Landed Cost Tool',
    secondaryHref: '#/calc/calc-landed-cost'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-should-cost',
  title: 'Should-Cost Modeling & Cost Breakdowns',
  module: 'Module 3: Commercial Analysis & Cost Engineering',
  kicker: 'Function 3.3',
  tagline: 'Deconstructing supplier margins through bottom-up cost engineering.',
  desc: 'Learn how to tear down a product or service into raw materials, direct labor, manufacturing overhead, SG&A, and fair profit margin to negotiate from facts rather than haggling.',
  duration: '18 mins',
  lifecycleStage: 'Stage 10: Cost Modeling & Should-Cost',
  lifecycleDesc: 'Arms procurement with empirical cost facts before entering supplier negotiations.',
  
  what: 'Should-cost modeling (clean-sheet costing) is a bottom-up cost engineering technique that estimates what a product or service should reasonably cost to produce, assuming an efficient manufacturing or delivery process, prevailing raw material prices, direct labor rates, realistic overhead, and an equitable profit margin.',
  why: [
    'Shifts negotiation from adversarial haggling ("Can you give me 5% off?") to objective commercial collaboration ("Your material cost benchmark is 18% above index prices").',
    'Neutralizes supplier price increase demands: testing whether raw material spikes genuinely justify the price hike requested.',
    'Enables target costing during new product development, ensuring products are designed to meet target profit margins.'
  ],
  when: [
    'When negotiating high-spend custom direct materials, stamped metal parts, injection molded plastics, or electronic assemblies.',
    'When a monopoly or sole-source supplier demands an unverified price increase.',
    'When preparing a comprehensive negotiation strategy for multi-million dollar contracts.'
  ],
  raci: [
    { role: 'Cost Engineer / Category Specialist', resp: 'Conducts the bottom-up tear-down, validates commodity index rates, and models machine cycle times.' },
    { role: 'Engineering / Manufacturing', resp: 'Provides bill of materials (BOM), scrap rates, and technical cycle time benchmarks.' },
    { role: 'Suppliers', resp: 'Submits formal Cost Breakdown Sheets (CBS) detailing material, labor, overhead, and margin.' },
    { role: 'Procurement Negotiator', resp: 'Uses should-cost gaps as primary leverage levers during commercial negotiations.' }
  ],
  inputs: [
    'Engineering Bill of Materials (BOM) with weights, material grades, and tolerances.',
    'Public commodity index prices (e.g. LME for aluminum, ICIS for resins, steel indices).',
    'Regional labor rate benchmarks and typical manufacturing overhead multipliers.'
  ],
  outputs: [
    'Bottom-Up Clean Sheet Cost Model.',
    'Price-to-Cost Gap Analysis Sheet.',
    'Negotiation Target Sheet (Target Price, Walk-Away Price, Aspiration Price).'
  ],
  controls: [
    'Mandatory Cost Breakdown Sheet (CBS) requirement in all major RFQ instructions.',
    'Validation of raw material prices against independent public indices (London Metal Exchange, Platts).',
    'Index-linked price escalation clauses that allow prices to move down when commodity prices drop.'
  ],
  mistakes: [
    'Allowing suppliers to lump labor and overhead into a single untraceable "conversion cost" number.',
    'Failing to capture scrap recovery value: in machining or stamping, valuable metal scrap is resold by the vendor and must be credited to the buyer.',
    'Accepting supplier price increases immediately when commodity prices rise, but never auditing when commodity prices drop.'
  ],
  bestPractices: [
    'Structure pricing around a Transparent Cost Formula: Price = [Material Weight &times; Index Rate] + [Cycle Time &times; Machine Rate] + [Overhead %] + [Fixed Profit %].',
    'Audit supplier scrap rates: high-efficiency automated factories generate 2% to 4% scrap, whereas inefficient plants lose 12% to scrap.',
    'Use should-cost models to help key suppliers improve their own operational efficiency, creating shared value.'
  ],
  terms: [
    { term: 'Should-Cost Model', def: 'A calculated estimate of an item\'s cost based on raw materials, labor, machine time, overhead, and reasonable margin.' },
    { term: 'Cost Breakdown Sheet (CBS)', def: 'A standardized submission form where a supplier itemizes each cost element that constitutes their final quote.' },
    { term: 'Indexation', def: 'Contractual formula linking price adjustments directly to independent published indices (e.g. PPI, LME).' }
  ],
  thinkingPoints: [
    {
      quote: 'Suppliers price to what the market will bear; procurement negotiates to what the product should cost.',
      explanation: 'Without cost transparency, suppliers will price according to how desperately you need the item. When procurement understands the underlying cost of steel, plastic resin, machine cycle times, and labor, the conversation shifts from subjective opinions to mathematical realities.',
      realWorldExample: 'A heavy equipment buyer was quoted $1,200 for a custom steel bracket. The buyer conducted a clean-sheet teardown: 40kg of structural steel ($60), 25 minutes of laser cutting and CNC bending ($45), robotic welding ($30), powder coating ($25), 15% SG&A ($24), and 12% profit ($22). Total should-cost: $206. Armed with this teardown, procurement negotiated the final price down from $1,200 to $265, saving $935,000 annually across the machine line.',
      reflectionPrompt: 'When suppliers ask for a price increase citing "rising raw material costs", do you ask them to prove the exact percentage of raw material in the unit cost?'
    }
  ],
  sopSteps: [
    {
      title: 'Bill of Materials (BOM) Deconstruction',
      role: 'Procurement Specialist & Engineering',
      desc: 'Obtain CAD drawings and physical samples; determine exact material weights, grades, and packaging specifications.',
      control: 'Verify net weight vs gross input weight to calculate expected scrap generation.',
      record: 'Itemized BOM Teardown Sheet.',
      pitfall: 'Relying on supplier-reported weights without independently weighing physical samples.'
    },
    {
      title: 'Index Benchmarking & Process Costing',
      role: 'Cost Engineer',
      desc: 'Look up market index rates for raw materials; model machine hourly operating rates and direct assembly labor minutes.',
      control: 'Apply industry-standard SG&A (8% to 15%) and target profit margins (8% to 12%).',
      record: 'Calculated Should-Cost Target Model.',
      pitfall: 'Assuming high Western labor rates for products manufactured in low-cost offshore manufacturing hubs.'
    },
    {
      title: 'Gap Analysis & Negotiation Scripting',
      role: 'Category Manager',
      desc: 'Compare supplier quote against should-cost baseline; isolate specific cost buckets where the supplier is uncompetitive.',
      control: 'Establish formal Best Alternative to a Negotiated Agreement (BATNA) before meeting.',
      record: 'Commercial Negotiation Playbook.',
      pitfall: 'Showing the supplier your raw spreadsheet rather than using the data to guide targeted probing questions.'
    },
    {
      "title": "Decompose the Product into Cost Drivers",
      "role": "Category Manager",
      "desc": "Break the item into the elements that actually drive its cost: material with the index and base period, labour with the rate and the productivity assumption, machine time, overhead absorption, packaging, logistics, scrap and tooling.",
      "control": "Every element is stated with the source of the figure and the base period, so that a dispute is about the number rather than about which model is being used.",
      "record": "Cost breakdown structure with the driver, the value, the unit, the source and the base period for each element.",
      "pitfall": "Building the breakdown from the supplier's own figures, which guarantees agreement and teaches you nothing."
    },
    {
      "title": "Set the Margin and Test the Gap Against the Evidence",
      "role": "Category Manager",
      "desc": "Apply a defensible fair-margin allowance, compare the resulting should-cost with the quote, and prepare the challenge on the elements where the two differ.",
      "control": "The margin is set and justified independently of the quote, and the challenge is evidence-based: the question to the supplier is \"what drives this line\", not \"we think you are wrong\".",
      "record": "Should-cost model with the margin justification, the gap analysis and the challenge questions for each driver.",
      "pitfall": "Adjusting the margin until the gap closes, which converts an independent estimate into a copy of the quote."
    }
 ],
  quizzes: [
    {
      type: 'scenario',
      context: 'A key supplier sends a formal letter demanding an immediate 15% price increase across all plastic components, citing: "The global market price of polypropylene resin has increased by 30% over the last quarter."',
      q: 'You check your should-cost model and find that raw polypropylene resin represents only 40% of the component\'s total cost structure (the remaining 60% is machine depreciation, labor, and packaging, which did not increase). What is the mathematically justified price adjustment?',
      options: [
        {
          text: 'A maximum price increase of 12% (40% x 30%), not 15%.',
          isCorrect: true,
          rationale: 'Correct! If resin is 40% of the cost structure and resin increased by 30%, the net impact on the finished product price is 40% x 30% = 12.0%. Accepting a 15% increase gives the supplier an unearned profit windfall on their labor and overhead!'
        },
        {
          text: 'Accept the 15% increase immediately because raw materials rose by 30%.',
          isCorrect: false,
          rationale: 'This ignores cost contribution weighting: a fatal mistake that overpays vendors.'
        },
        {
          text: 'Reject any increase whatsoever and sue the supplier.',
          isCorrect: false,
          rationale: 'If raw materials rose genuinely and contract terms permit index adjustments, an arbitrary refusal may breach contract or halt production.'
        }
      ],
      calcWork: 'Cost Contribution Formula:\n- Raw Material Share: 40%\n- Raw Material Inflation: +30%\n- Net Product Price Impact: 40% x 30% = +12.0%\n\nSupplier Demand: +15.0%\nUnjustified Supplier Markup: 3.0% excess margin.',
      principle: 'Never apply raw material inflation to the entire unit price. Apply it strictly to the verified raw material percentage of the cost structure.'
    },
    {
      type: 'mcq',
      q: 'What is the purpose of requesting a formal "Cost Breakdown Sheet" (CBS) during an RFQ?',
      options: [
        {
          text: 'To deconstruct the quote into materials, labor, overhead, and margin so procurement can identify where the supplier is efficient or uncompetitive.',
          isCorrect: true,
          rationale: 'Correct! A CBS gives procurement visibility into cost drivers, enabling fact-based negotiations and future index-linked adjustments.'
        },
        {
          text: 'To steal the supplier\'s trade secrets and give them to competitors.',
          isCorrect: false,
          rationale: 'Procurement ethics and NDAs strictly prohibit disclosing proprietary cost data to third parties.'
        },
        {
          text: 'To calculate the supplier\'s corporate income tax bill.',
          isCorrect: false,
          rationale: 'Procurement is concerned with unit cost economics, not corporate tax accounting.'
        }
      ],
      principle: 'Cost transparency transforms negotiation from an emotional argument into an objective joint problem-solving exercise.'
    },
    {
      "type": "scenario",
      "context": "A sole-source supplier quotes 89.00 per unit for 20,000 units a year. The buyer builds a should-cost of 38.50 material, 0.40 hours at 35.00, 8.50 machine overhead, 10 percent SG&A and a 12 percent fair margin, and gets 81.30. What is the right next step?",
      "q": "What should the buyer do?",
      "options": [
        {
          "text": "Reject the quote and award to a competitor, since a 7.70 per unit gap proves the supplier is overcharging.",
          "isCorrect": false,
          "rationale": "The gap does not prove overcharging, and there is no competitor to award to: this is a sole source. The gap is a starting point for a conversation about where the 7.70 sits. It may be in the material index, the labour rate, the overhead allocation or the margin. The next step is decomposition and challenge, not a rejection, and a rejection with no alternative simply ends the supply."
        },
        {
          "text": "Challenge the quote line by line against the cost build-up, starting with the elements most likely to be misstated, and ask for the evidence behind each.",
          "isCorrect": true,
          "rationale": "This is what should-cost is for. You are not asserting that the supplier is wrong; you are asking a better-informed question than \"why is it 89 when you say 81.30\". Material index and base period, labour rate and productivity assumption, overhead absorption basis, and the margin target are the four lines to attack first, because they are the four that most often differ for a legitimate reason and can be settled with evidence. The right outcome is often a price change, but it is also sometimes a discovered cost the buyer had not modelled, and both are worth having."
        },
        {
          "text": "Accept the 7.70 per unit gap as the price of not having an alternative, and record it as an unavoidable cost of single sourcing.",
          "isCorrect": false,
          "rationale": "Conceding without asking converts a negotiating position into a permanent cost, and it is not what the gap tells you. Single sourcing is a decision with a price, and the price has not yet been established: nobody has tested whether the 89.00 is supportable, or whether the build-up of 81.30 is missing a cost the buyer should be carrying. A should-cost that is never used to challenge anything is an internal document, not an analysis."
        },
        {
          "text": "Rebuild the should-cost with a higher margin allowance to close the gap, and treat the result as market-validated.",
          "isCorrect": false,
          "rationale": "That reverses the analysis into something it cannot be. The should-cost is an independent estimate of what the product ought to cost, built from the cost drivers; changing the margin assumption until it matches the quote makes it a description of the quote rather than a test of it, and it destroys the only thing the exercise has to offer. The margin is an input you justify, not a plug you close a gap with."
        }
      ],
      "principle": "A should-cost is a question, not a verdict. Decompose the gap, challenge the drivers, and use the evidence."
    },
    {
      "type": "mcq",
      "q": "A should-cost model is most valuable when:",
      "options": [
        {
          "text": "It is used to challenge a quote in a competitive event, where the buyer has a reference point to negotiate from.",
          "isCorrect": false,
          "rationale": "It is a legitimate application, but it is not where the model is most valuable. In a competitive event the buyer already has competing quotes as a reference point, so the should-cost is a second opinion rather than the only one. It also carries a risk in a live event: a should-cost built during the tender invites a dispute about the buyer's cost model, which is a distraction from the published evaluation criteria."
        },
        {
          "text": "It is used to validate a price in a sole-source situation, where the buyer has no other offer to compare against.",
          "isCorrect": true,
          "rationale": "This is where it is most valuable, and it is the place most buyers skip. Without a market price, an independent cost estimate is the only reference point the buyer has, and a should-cost gives the negotiation something concrete to work with. Many organisations never build one here, which is precisely why sole-source pricing drifts upwards year after year with nobody able to say why."
        },
        {
          "text": "It is used after the award, to check whether the supplier made the margin the buyer expected.",
          "isCorrect": false,
          "rationale": "That is a job the buyer cannot do, because the supplier does not disclose its margin and never will, and attempting it consumes the relationship and produces no reliable answer. The should-cost is a pre-award negotiating instrument. Its value is in what it tells you about the cost structure before you commit, not in auditing a private number afterwards."
        },
        {
          "text": "It is used to select the sourcing route, by showing whether the product can be made or bought more cheaply.",
          "isCorrect": false,
          "rationale": "A should-cost tells you what the product ought to cost on the current design, which is a different question from whether a different design or a different route is better. The make-or-buy decision is made with a full cost model of both options including the non-price costs of owning the capability, and a should-cost of the current specification is one input to that, not the decision itself."
        }
      ],
      "principle": "A should-cost has the most force before the award, in both competitive and sole-source situations. It is a negotiating instrument, not an audit tool."
    }
 ],
  relSop: 'sop-supplier-evaluation',
  rel: {
    concepts: ['should-cost', 'cost-breakdown', 'price-vs-cost'],
    sops: ['sop-supplier-evaluation'],
    checklists: ['cl-commercial-evaluation'],
    templates: ['tpl-commercial-evaluation'],
    calcs: ['calc-should-cost', 'calc-tco'],
    decisions: ['unit-or-tco'],
    kpis: ['kpi-ppv']
  },
  labMission: {
    title: 'Mission 9: Test Price Escalation & Should-Cost Formulas',
    desc: 'Use the Price Escalation Calculator to calculate fair cost adjustments when labor, material, and fuel indices change.',
    tasks: [
      'Open the Price Escalation Calculator.',
      'Input baseline cost shares (Materials %, Labor %, Overhead %) and index movements.',
      'Calculate the mathematically justified price adjustment and compare it to supplier claims.'
    ],
    ctaLabel: 'Launch Escalation Calculator',
    ctaHref: '#/calc/calc-price-escalation',
    secondaryLabel: 'Open Should-Cost Tool',
    secondaryHref: '#/calc/calc-should-cost'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-supplier-eval',
  title: 'Multi-Criteria Supplier Evaluation & Scoring',
  module: 'Module 4: Supplier Evaluation & Risk Management',
  kicker: 'Function 4.1',
  tagline: 'Balancing price, technical quality, financial health, and ESG with mathematical rigor.',
  desc: 'Learn how to build weighted decision matrices, establish mandatory qualifying gates, conduct objective scoring consensus sessions, and prevent bias.',
  duration: '18 mins',
  lifecycleStage: 'Stage 11: Supplier Evaluation & Scoring',
  lifecycleDesc: 'The governance mechanism for turning complex qualitative and quantitative bids into an objective ranking.',
  
  what: 'Multi-criteria supplier evaluation is the structured process of assessing competing supplier proposals against predetermined weighted dimensions, encompassing commercial cost, technical capability, operational quality, financial stability, delivery lead times, and sustainability.',
  why: [
    'Prevents subjective bias and personal favoritism from dictating multi-million dollar vendor awards.',
    'Ensures non-cost factors (cybersecurity, safety certifications, delivery reliability) are rigorously balanced against price.',
    'Provides an audit-proof paper trail that defends the award decision against internal executive skepticism or external bidder challenges.'
  ],
  when: [
    'Immediately following the receipt and technical clarification of RFPs or tenders.',
    'When evaluating complex service providers, IT systems, or critical engineering components.',
    'During annual supplier tiering reviews for Strategic Relationship Management (SRM).'
  ],
  raci: [
    { role: 'Procurement Lead', resp: 'Chairs the evaluation panel, enforces scoring guidelines, normalizes commercial scores, and moderates consensus.' },
    { role: 'Technical Evaluators', resp: 'Score technical, operational, and architectural criteria based on evidence in the bid.' },
    { role: 'Finance Evaluator', resp: 'Assesses supplier balance sheet health, liquidity, credit rating, and commercial pricing.' },
    { role: 'Evaluation Committee', resp: 'Signs individual scoring sheets and agrees on the final composite ranking.' }
  ],
  inputs: [
    'Pre-established Evaluation Matrix with criteria weightings locked before tender opening.',
    'Submitted supplier technical proposals, case studies, and references.',
    'Financial statements (audited 3-year P&L, balance sheet, cash flow) and credit reports.'
  ],
  outputs: [
    'Completed Consensus Evaluation Scoring Matrix.',
    'Formal Evaluation Committee Award Recommendation Report.',
    'Documented Supplier Clarification and Technical Scoring Logs.'
  ],
  controls: [
    'Weightings locked prior to tender opening: criteria weightings cannot be altered after bids are opened under any circumstances.',
    'Mandatory minimum technical threshold (e.g. minimum 70% technical score required before commercial price envelopes are opened).',
    'Signed Conflict of Interest (COI) declarations from every evaluation panel member.'
  ],
  mistakes: [
    'Opening commercial price envelopes before technical scoring is complete, allowing price to unconsciously bias technical scores.',
    'Allowing an aggressive stakeholder to bully other evaluators into changing their scores without factual justification.',
    'Using subjective scoring definitions (e.g. "Good", "Bad") without explicit rubrics (e.g. "0 = Non-compliant, 5 = Fully compliant with evidence, 10 = Exceeds specification with verified case study").'
  ],
  bestPractices: [
    'Use the Two-Envelope Tender System: evaluate and lock Envelope 1 (Technical & Quality) before unsealing Envelope 2 (Commercial Price).',
    'Establish "Knockout" (Pass/Fail) criteria: if a vendor lacks mandatory ISO certifications or cybersecurity insurance, they are disqualified immediately before scoring begins.',
    'Conduct supplier reference calls with previous clients using a standardized question checklist to verify real-world performance.'
  ],
  terms: [
    { term: 'Two-Envelope System', def: 'A procurement governance process where technical and commercial bids are submitted separately; commercial bids are opened only for technically qualified vendors.' },
    { term: 'Weighted Scorecard', def: 'A decision matrix where evaluation criteria are assigned percentage weights reflecting their relative strategic importance.' },
    { term: 'Consensus Scoring', def: 'A moderated panel session where individual evaluators discuss score variances and agree on a unified composite score based on factual evidence.' }
  ],
  thinkingPoints: [
    {
      quote: 'A weighted scorecard that doesn\'t define mandatory minimum qualifying thresholds allows an incompetent, cheap supplier to win.',
      explanation: 'If commercial price carries 50% weight and technical carries 50% weight, a vendor with terrible quality (10/100 technical) who bids absurdly low (100/100 price) will achieve a high combined score of 55/100 and potentially win. Best-in-class procurement enforces a non-negotiable rule: "Vendors must score at least 70% on technical capability to have their price envelope opened."',
      realWorldExample: 'A hospital procured medical telemetry monitors. A low-cost overseas vendor bid 60% below market. On a simple linear scorecard without minimum technical gates, they came out on top. Fortunately, procurement enforced a mandatory 80% clinical accuracy threshold. The cheap vendor scored 48% on clinical reliability during hospital trials and was disqualified, preventing life-threatening patient monitoring failures.',
      reflectionPrompt: 'Does your organization evaluate technical proposals in isolation before looking at price, or do stakeholders peek at prices first?'
    }
  ],
  sopSteps: [
    {
      title: 'Criteria Definition & Weighting Lock',
      role: 'Procurement Specialist & Stakeholders',
      desc: 'Define evaluation criteria, pass/fail knockout gates, and percentage weights before releasing the RFx.',
      control: 'Sign and lock the evaluation criteria matrix before tender opening.',
      record: 'Locked Evaluation Plan Document.',
      pitfall: 'Changing weightings after bids arrive to help a preferred vendor win (a major fraud red flag).'
    },
    {
      title: 'Knockout Screening & Technical Evaluation',
      role: 'Evaluation Panel',
      desc: 'Verify mandatory compliance criteria (licenses, insurance, ISO); score technical proposals against predefined rubrics.',
      control: 'Evaluate technical proposals with commercial pricing redacted (blind technical evaluation).',
      record: 'Technical Evaluation Scoring Sheets.',
      pitfall: 'Scoring based on personal impressions rather than documented evidence in the proposal.'
    },
    {
      title: 'Commercial Unsealing & Composite Ranking',
      role: 'Procurement Lead',
      desc: 'Unseal commercial envelopes for technically qualified bidders; apply formula to calculate commercial points; combine for final ranking.',
      control: 'Verify that mathematical formulas treat lowest price accurately and consistently.',
      record: 'Consolidated Evaluation Ranking & Award Recommendation.',
      pitfall: 'Using non-linear commercial scoring formulas that distort price differences.'
    },
    {
      "title": "Derive the Evaluation Criteria from the Category Strategy",
      "role": "Category Manager",
      "desc": "Set the criteria from what matters in this category: the drivers of performance for this supply, the risks the category carries, and the differentiators that actually separate the field.",
      "control": "The number of criteria is limited to what the panel can assess with rigour, and each criterion has a defined scale and a defined evidence source.",
      "record": "Evaluation criteria sheet with the rationale, the scale and the evidence source for each criterion.",
      "pitfall": "Copying a generic scorecard used for a different category, and scoring the field on things that do not differentiate them."
    },
    {
      "title": "Brief the Panel and Score Against the Published Scale",
      "role": "Procurement Specialist",
      "desc": "Brief the evaluators on the criteria, the scales and the evidence before any bid is opened, and require an individual score and a written reason for each criterion.",
      "control": "No bid is opened before the panel has been briefed and the criteria and scales confirmed, and the panel scores independently before any discussion.",
      "record": "Panel briefing record and the individual scoring sheets with reasons, retained with the evaluation file.",
      "pitfall": "Opening the bids and then explaining the scales, which makes the scale fit whichever bid is in front of the panel."
    }
 ],
  quizzes: [
    {
      type: 'scenario',
      context: 'An evaluation panel is reviewing 4 bids for a mission-critical cybersecurity system. The scorecard weighting is 60% Technical and 40% Commercial. Vendor 1 scores 92/100 Technical, but bids $500,000. Vendor 2 scores 45/100 Technical (failing critical data encryption tests), but bids $180,000.',
      q: 'If your procurement policy enforces a mandatory 70% technical qualification threshold, what happens to Vendor 2?',
      options: [
        {
          text: 'Vendor 2 is immediately disqualified from the tender, their commercial price is ignored, and only vendors meeting the 70% technical bar are ranked.',
          isCorrect: true,
          rationale: 'Correct! A mission-critical system that fails encryption tests is an existential risk to the enterprise. A low price cannot compensate for failing mandatory technical criteria.'
        },
        {
          text: 'Award the contract to Vendor 2 because their price is 64% cheaper, saving $320,000.',
          isCorrect: false,
          rationale: 'Awarding an encryption failure to save money guarantees massive regulatory fines, data breaches, and litigation.'
        },
        {
          text: 'Average the scores together and give Vendor 2 the contract if their combined math is higher.',
          isCorrect: false,
          rationale: 'This violates the mandatory qualification threshold rule.'
        }
      ],
      principle: 'Mandatory technical gates protect the enterprise from catastrophic low-cost operational failures.'
    },
    {
      type: 'red_flag',
      context: 'During an evaluation committee meeting, an internal stakeholder says: "I know Vendor C didn\'t provide the required references or safety certifications in their proposal, but I worked with their CEO 8 years ago at another company and he is a great guy. I gave them 10/10 on safety."',
      q: 'How should the Procurement Lead managing the evaluation respond to this remark?',
      options: [
        {
          text: 'Accept the 10/10 score because executive experience is valuable.',
          isCorrect: false,
          rationale: 'Personal anecdotes cannot replace objective audit evidence required by procurement policy.'
        },
        {
          text: 'Politely remind the committee that scores must be based exclusively on verified evidence submitted in the tender dossier. Require Vendor C to be scored on the documentation provided (0 or low score), and check if the evaluator has a declarable Conflict of Interest.',
          isCorrect: true,
          rationale: 'Correct! Procurement must uphold objective evidentiary standards and protect the evaluation from undocumented personal favoritism.'
        },
        {
          text: 'Report the evaluator to the police for immediate arrest.',
          isCorrect: false,
          rationale: 'A disproportionate reaction. The proper procedure is procedural correction and conflict-of-interest review.'
        }
      ],
      principle: 'Evaluation scores must reflect factual evidence submitted within the tender documents, never undocumented personal relationships.'
    },
    {
      "type": "scenario",
      "context": "Two finalists score 8.4 and 8.1 out of 10 on a published weighted scorecard. The 0.3 difference is well inside the noise of a subjective assessment. The procurement manager wants to award to the higher score. What is the right approach?",
      "q": "What should the manager do?",
      "options": [
        {
          "text": "Award to the higher score, because that is what the published criteria require.",
          "isCorrect": false,
          "rationale": "The criteria say how to score, and 8.4 versus 8.1 is what the criteria produced, so awarding to 8.4 is procedurally correct. The problem is what the score means, and this is where a scorecard is often misread. A weighted score compresses real differences: a 0.3 gap on a 10-point scale is inside the margin of assessor disagreement, and treating it as a decisive result is how a published framework gets quietly overridden anyway."
        },
        {
          "text": "Award to the higher score, and record the margin of difference and the fact that the scores were within assessor variation.",
          "isCorrect": true,
          "rationale": "This is the disciplined answer and it is also the one that survives scrutiny. The criteria were published and they produced 8.4, so the award follows the criteria, and the record states that the margin was narrow. That is the honest position: the process was followed, and the decision is exposed to the fact that the difference was not significant. If the two bidders were genuinely equivalent on the criteria, the tie-break has to come from somewhere else, and naming where it comes from is better than letting a decimal place decide it."
        },
        {
          "text": "Re-score both suppliers with a fresh panel until the gap is clearer, so the award is not decided by a narrow margin.",
          "isCorrect": false,
          "rationale": "Re-scoring until the gap widens is a way of getting the answer you wanted, and it breaches the published process, because the criteria and the method were already fixed. If the assessment was poor, the answer is to run the evaluation properly with a properly briefed panel, not to repeat it until the numbers suit the outcome. Two evaluations with different results are harder to defend than one honest result with a narrow margin."
        },
        {
          "text": "Award to the lower-priced bidder, since a 0.3 score difference does not justify a price premium and the decision is really a commercial one.",
          "isCorrect": false,
          "rationale": "That abandons the published criteria in the other direction, and it treats the score as worthless when what it actually indicates is that quality and service are equivalent within measurement error. If price is the deciding factor, that is a legitimate outcome, but it should be taken as an explicit commercial decision with the price difference quantified and accepted, not smuggled in as a reinterpretation of a scoring exercise."
        }
      ],
      "principle": "A weighted score compresses real differences. Follow the published criteria, and record honestly when the margin is inside the noise."
    },
    {
      "type": "mcq",
      "q": "The most common weakness of a supplier scorecard is:",
      "options": [
        {
          "text": "It measures the wrong things, because the criteria are chosen for convenience rather than from the category strategy.",
          "isCorrect": true,
          "rationale": "That is the most damaging failure, because the scorecard then measures whatever the last buyer found easy to count. Scorecards that are not derived from the category strategy produce a number that is defensible in form and meaningless in substance: high scores that say nothing about whether the supplier will deliver what this category needs. The fix is to derive the criteria from the strategy, not to standardise a generic scorecard across every category."
        },
        {
          "text": "It uses too many criteria, so the assessment takes too long and the panel loses focus.",
          "isCorrect": false,
          "rationale": "Too many criteria is a real problem, and it is usually a symptom of the bigger one: criteria added because someone wanted them measured, without anyone deciding what actually differentiates the suppliers in this category. Four or five criteria that discriminate between the field beat fifteen that do not, and the length is a consequence of the absence of a strategy rather than the cause."
        },
        {
          "text": "It relies on the supplier's own data, so it is not independently verified.",
          "isCorrect": false,
          "rationale": "Self-reported data is a genuine weakness in some scorecards, but it is a fixable one: the data that matters is delivery performance, quality and responsiveness, all of which the buyer observes independently, and the cost performance the buyer can test. A scorecard that measures only what the supplier reports is a weak scorecard, but that is a design fault rather than the general condition."
        },
        {
          "text": "It is applied too infrequently, so the scores are out of date by the time they are used.",
          "isCorrect": false,
          "rationale": "Frequency matters, and a scorecard reviewed annually for a fast-moving category is not much use. But the fundamental problem is what is measured and why. A perfectly current scorecard of irrelevant criteria gives a current and equally meaningless answer, and refreshing it on a schedule makes the irrelevance look like rigour."
        }
      ],
      "principle": "A scorecard is only as good as the strategy behind it. Derive the criteria from the category, not from a template."
    }
 ],
  relSop: 'sop-supplier-evaluation',
  rel: {
    concepts: ['supplier-qualification', 'supplier-segmentation', 'evaluation-criteria'],
    sops: ['sop-supplier-evaluation'],
    checklists: ['cl-supplier-evaluation', 'cl-supplier-due-diligence'],
    templates: ['tpl-supplier-evaluation', 'tpl-weighted-scoring', 'tpl-supplier-scorecard'],
    calcs: ['calc-supplier-scorecard'],
    decisions: ['competitive-or-single'],
    kpis: ['kpi-otif', 'kpi-defect-rate']
  },
  labMission: {
    title: 'Mission 10: Build a Weighted Supplier Scorecard',
    desc: 'Use the Supplier Scorecard Calculator to configure evaluation criteria, assign percentage weights, and score competing suppliers.',
    tasks: [
      'Open the Supplier Scorecard Calculator.',
      'Configure criteria across Commercial, Quality, Delivery, and ESG.',
      'Input scores for 3 competing suppliers and review the automated weighted ranking.'
    ],
    ctaLabel: 'Launch Scorecard Tool',
    ctaHref: '#/calc/calc-scorecard',
    secondaryLabel: 'Open Evaluation Template',
    secondaryHref: '#/tpl/tpl-eval-matrix'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-supplier-risk',
  title: 'Supplier Due Diligence & Risk Mitigation',
  module: 'Module 4: Supplier Evaluation & Risk Management',
  kicker: 'Function 4.2',
  tagline: 'Safeguarding enterprise resilience against supplier bankruptcy, single-source dependency, and ethical failures.',
  desc: 'Learn how to perform comprehensive financial health checks (Altman Z-Score), evaluate geopolitical and cybersecurity risks, and structure dual-sourcing strategies.',
  duration: '18 mins',
  lifecycleStage: 'Stage 12: Supplier Risk & Due Diligence',
  lifecycleDesc: 'The defense shield that vets external suppliers before long-term commitments are executed.',
  
  what: 'Supplier due diligence is the comprehensive investigation of a prospective or incumbent vendor\'s operational capacity, financial stability, legal standing, cybersecurity posture, environmental/social governance (ESG), and supply chain continuity.',
  why: [
    'A supplier going bankrupt mid-project halts production, freezes capital, and leaves the company with incomplete assets.',
    'Regulatory compliance: governments impose multi-million dollar penalties for modern slavery, forced labor, and bribery found anywhere in tier-1 or tier-2 supply chains.',
    'Cybersecurity: over 60% of enterprise data breaches originate through compromised external third-party vendor credentials.'
  ],
  when: [
    'Prior to onboarding any new vendor with spend exceeding organizational risk thresholds.',
    'Annually for all Strategic and Bottleneck suppliers in the category portfolio.',
    'Immediately upon observing warning signs (e.g. key executive resignations, delayed shipments, sudden credit limit cuts).'
  ],
  raci: [
    { role: 'Risk & Compliance Lead', resp: 'Conducts sanctions screening, anti-money laundering (AML), and regulatory background checks.' },
    { role: 'Procurement Specialist', resp: 'Analyzes financial health metrics, capacity constraints, and operational contingency plans.' },
    { role: 'IT / Information Security', resp: 'Performs Third-Party Risk Management (TPRM) assessments and penetration testing reviews.' },
    { role: 'Supplier Management', resp: 'Provides audited financials, disaster recovery plans, and sub-tier supplier disclosures.' }
  ],
  inputs: [
    'Audited annual balance sheets, income statements, and cash flow reports (past 3 years).',
    'Third-party risk intelligence reports (Dun & Bradstreet, CreditSafe, EcoVadis).',
    'Business Continuity Plan (BCP) and Disaster Recovery (DR) testing evidence.'
  ],
  outputs: [
    'Supplier Financial & Operational Risk Assessment Report.',
    'Altman Z-score / Financial Distress Rating.',
    'Corrective Action Plan (CAP) or Risk Mitigation Bond requirement.'
  ],
  controls: [
    'Automated daily sanctions, PEP (Politically Exposed Persons), and adverse media screening.',
    'Mandatory credit check and maximum spend ratio: company spend should rarely exceed 25% to 30% of a supplier\'s total revenue (dependency risk).',
    'Escrow agreements for proprietary source code or tooling drawings in single-source arrangements.'
  ],
  mistakes: [
    'Awarding a multi-million dollar contract to a supplier without checking if their total annual revenue is only $500,000.',
    'Assuming a large, famous multinational supplier cannot suffer localized plant fires or catastrophic supply failure.',
    'Relying solely on self-reported supplier surveys without auditing physical facilities or demanding independent certifications.'
  ],
  bestPractices: [
    'Calculate the Altman Z-score to predict insolvency risk: scores below 1.8 indicate high distress, while scores above 3.0 indicate financial safety.',
    'Implement dual-sourcing (e.g. 70/30 split) for mission-critical direct materials to ensure a warm backup supplier is always active.',
    'Insert "Right to Audit" clauses into all contracts, empowering procurement and internal audit to inspect supplier facilities and books.'
  ],
  terms: [
    { term: 'Altman Z-Score', def: 'A formula combining five financial ratios to predict the probability of corporate bankruptcy within two years.' },
    { term: 'Single Sourcing vs Dual Sourcing', def: 'Single sourcing uses one vendor for 100% of volume; dual sourcing splits volume (e.g. 70/30) between two vendors to ensure continuity.' },
    { term: 'Third-Party Risk Management (TPRM)', def: 'The systematic oversight of risks introduced by external suppliers, including cyber, legal, and operational risks.' }
  ],
  thinkingPoints: [
    {
      quote: 'Single-sourcing a mission-critical component to save 2% without a contingency plan isn\'t cost optimization; it is a corporate existential gamble.',
      explanation: 'Consolidating 100% of your spend with one supplier gives you great bulk purchasing discounts, until that supplier\'s factory floods, burns down, or enters bankruptcy liquidation. World-class procurement models the cost of downtime and maintains qualified secondary suppliers for critical operations.',
      realWorldExample: 'A smartphone maker single-sourced a specialized micro-controller chip from a single fabrication plant in Japan to save 3 cents per unit. An earthquake struck the region, halting the fab for 6 months. Competitors who dual-sourced from Korea and Taiwan captured 18% of their global market share. The 3-cent "saving" cost the company $1.8 billion in lost sales.',
      reflectionPrompt: 'Does your company have a disaster recovery plan if your #1 most critical supplier went bankrupt tomorrow morning?'
    }
  ],
  sopSteps: [
    {
      title: 'Preliminary Compliance & Sanctions Screening',
      role: 'Procurement Specialist & Compliance',
      desc: 'Screen vendor entity and beneficial owners against global anti-bribery, terrorism, sanctions, and debarment lists.',
      control: 'Zero tolerance: immediate disqualification for matches on active international sanctions lists.',
      record: 'Automated Sanctions Screening Clearance Certificate.',
      pitfall: 'Checking only the local trading name rather than the ultimate beneficial owners (UBO).'
    },
    {
      title: 'Financial Viability & Solvency Audit',
      role: 'Procurement Specialist / Finance',
      desc: 'Examine balance sheet liquidity (Quick Ratio, Current Ratio), debt leverage, and Altman Z-score for bankruptcy risk.',
      control: 'Require parent company guarantees or performance bonds if supplier Z-score falls into the distress zone (<1.8).',
      record: 'Financial Health Diagnostic Scorecard.',
      pitfall: 'Accepting un-audited internal spreadsheets from private suppliers without third-party bank verification.'
    },
    {
      title: 'Continuity Planning & Risk Tier Allocation',
      role: 'Category Manager',
      desc: 'Determine whether the item requires dual-sourcing, safety stock buffer agreements, or escrow holding of technical tooling.',
      control: 'Formal sign-off on Single-Source Justification if dual sourcing is unfeasible.',
      record: 'Supplier Risk Treatment Plan.',
      pitfall: 'Allowing sole-source arrangements to persist for years without regular market testing.'
    },
    {
      "title": "Obtain the Financial Position and Assess Solvency",
      "role": "Procurement Specialist",
      "desc": "Get the financial information the supplier will not volunteer: filed accounts, management information, credit references, and the reasons for any change in credit facility.",
      "control": "The information is obtained and recorded with its date and source, and an assessed risk position is signed off by a named officer.",
      "record": "Financial risk assessment with the evidence, the risk rating and the date the assessment was made.",
      "pitfall": "Accepting a management assurance about a supplier whose bank has withdrawn a facility, which is a signal that requires evidence rather than reassurance."
    },
    {
      "title": "Map the Sub-Tier Exposure for Critical Categories",
      "role": "Category Manager",
      "desc": "For the categories where a failure would stop the business, map the sub-tier suppliers, the plants, the routes and the single points of failure, and record whether an independent alternative exists.",
      "control": "The map covers the categories that would actually stop operations, and every single point of failure has a treatment decision with an owner.",
      "record": "Multi-tier supply base map with the single point of failure register and the treatment decisions.",
      "pitfall": "Mapping the tier-two suppliers of everything, instead of the sub-tier of the few suppliers whose failure would actually stop the business."
    }
 ],
  quizzes: [
    {
      type: 'scenario',
      context: 'You review the audited balance sheet of a critical packaging supplier who bids for an exclusive 3-year contract. You calculate their Current Ratio at 0.65 (current liabilities far exceed current assets) and note that their short-term bank debt matures in 60 days with negative cash flow from operations.',
      q: 'What is the commercial diagnosis of this supplier, and what should procurement do?',
      options: [
        {
          text: 'Ignore it because packaging is not high tech.',
          isCorrect: false,
          rationale: 'If your packaging supplier halts, you cannot ship finished goods.'
        },
        {
          text: 'The supplier is suffering acute liquidity distress and faces severe bankruptcy risk within 60 to 90 days. Procurement should pause sole-source award, require a solvent parent company guarantee, or qualify an alternative backup vendor immediately.',
          isCorrect: true,
          rationale: 'Correct! A current ratio below 1.0 combined with maturing debt indicates the vendor may be unable to pay their own paper suppliers or payroll, risking immediate shutdown.'
        },
        {
          text: 'Lend the supplier $5,000,000 of your company\'s cash with no collateral.',
          isCorrect: false,
          rationale: 'Procurement is not a commercial bank; uncollateralized bailouts violate fiduciary duty.'
        }
      ],
      principle: 'Financial due diligence is essential: an insolvent supplier cannot honor contract commitments, regardless of how attractive their pricing appears.'
    },
    {
      type: 'mcq',
      q: 'What is the primary operational advantage of maintaining a 70/30 Dual-Sourcing split for critical components?',
      options: [
        {
          text: 'It guarantees that 100% of your supply is continuously active and qualified across two independent production facilities, allowing you to shift volume overnight if one fails.',
          isCorrect: true,
          rationale: 'Correct! Maintaining a live secondary supplier at 30% volume keeps tooling warm, QA certified, and electronic links tested, eliminating the catastrophic 6-month delay of finding a new supplier in a crisis.'
        },
        {
          text: 'It eliminates all paperwork and doubles shipping costs.',
          isCorrect: false,
          rationale: 'Dual sourcing requires deliberate administration, but provides priceless enterprise continuity.'
        },
        {
          text: 'It forces both suppliers to merge into one company.',
          isCorrect: false,
          rationale: 'The objective is to maintain distinct, competing, independent supply channels.'
        }
      ],
      principle: 'Dual-sourcing is an active insurance policy: volume allocation creates healthy competitive pressure and instantaneous supply redundancy.'
    },
    {
      "type": "scenario",
      "context": "A supplier of a critical component has missed three delivery dates in a year. Its financial statements are not yet published, its bank has just withdrawn a credit facility, and the buyer has no alternative source qualified. What should the buyer do first?",
      "q": "What is the right first action?",
      "options": [
        {
          "text": "Qualify an alternative supplier immediately, because the financial signals and the delivery record together mean the supply is at risk.",
          "isCorrect": false,
          "rationale": "This is the right destination and the wrong first move, and the sequence matters more than it appears. Qualifying an alternative takes weeks to months, and a bank withdrawing a facility is a signal to be acted on, not a fact that means supply has already stopped. The first action is to understand what is actually happening and to stabilise the current supply, while the qualification runs in parallel. Treating the first step as the second step is how a panic becomes a crisis."
        },
        {
          "text": "Get the facts: obtain the financial information directly, understand the cause of the three misses, and assess the exposure by volume and by what happens if delivery stops.",
          "isCorrect": true,
          "rationale": "This is the disciplined first step, and it is three things at once. Obtain the information you have been refused, because a withdrawn facility and a missed delivery pattern are a different situation depending on the cause. Understand the misses, because three misses caused by the buyer's own forecast errors and three caused by capacity failure call for different responses. And size the exposure: what share of output depends on this supplier, what is the substitute, how long would it take to switch, and what is at risk in the meantime. Only with those facts can you choose between qualifying an alternative, placing a buffer order, negotiating a recovery plan, or exiting."
        },
        {
          "text": "Place a large forward order with the supplier to secure the supply before anything changes.",
          "isCorrect": false,
          "rationale": "This looks prudent and is often the opposite. It converts a delivery problem into a cash and inventory problem, it increases your exposure to a supplier whose financial position you have just been warned about, and it may simply accelerate the failure. Forward buying is justified when you have a confident view of the supplier and a known temporary constraint. Here you have neither, so it is a bet on a supplier whose bank has just withdrawn credit."
        },
        {
          "text": "Escalate to the supplier's management and require a written recovery plan before taking any further action.",
          "isCorrect": false,
          "rationale": "Escalation is part of the answer but it is not the whole first step, and it is not a substitute for your own assessment. It is entirely possible for the supplier to produce a reassuring recovery plan and still fail, and the volume at risk will not be smaller for the plan existing. You need the facts and the exposure assessment to decide how much weight the plan carries, and you need to start the alternative qualification clock running regardless."
        }
      ],
      "principle": "In a supply risk, the first step is facts and exposure. The action follows the facts, and the alternative qualification runs in parallel."
    },
    {
      "type": "mcq",
      "q": "Why is a tier-two or tier-three supplier risk relevant to a tier-one buyer?",
      "options": [
        {
          "text": "Because the buyer is contractually liable for the conduct of its suppliers' suppliers.",
          "isCorrect": false,
          "rationale": "Liability for sub-tier conduct is a separate and real issue in some regimes, but it is not why the exposure matters. The operational reason is simpler and more immediate: a disruption at the sub-tier becomes the tier-one supplier's inability to deliver to you, and the tier-one supplier cannot always recover it for you because it has the same problem."
        },
        {
          "text": "Because most material disruption arrives through a sub-tier the buyer has never assessed, and the tier-one supplier is exposed to the same failure.",
          "isCorrect": true,
          "rationale": "This is the reason to look below tier one, and it is the reason a supplier due diligence that stops at the direct supplier is incomplete. A tier-one supplier can be healthy, solvent and qualified and still be unable to deliver because its own critical input comes from one fragile sub-supplier. Mapping the sub-tier for the categories that would actually stop you is what turns a generic continuity plan into a real one."
        },
        {
          "text": "Because tier-one contracts are usually silent about sub-tier subcontracting.",
          "isCorrect": false,
          "rationale": "Silence in the contract is often the reason the buyer does not know the answer, and the remedy is a flow-down clause, not an inference. A requirement to disclose and approve material sub-tier suppliers, with a right to audit the arrangement, is a contractual control that has to be put in deliberately. A buyer who has never asked cannot know the tier-two picture, and a buyer who has asked and been refused has learned something important about the relationship."
        },
        {
          "text": "Because it improves the buyer's negotiating position with the tier-one supplier.",
          "isCorrect": false,
          "rationale": "Knowing the sub-tier map is sometimes useful leverage, but treating it primarily as a negotiating tool produces a bad outcome: the supplier learns that disclosure of its supply base is penalised, and the map gets less accurate over time. The buyer needs the map to manage risk, and the way to get it is to make disclosure a condition of the relationship and to use it for that purpose."
        }
      ],
      "principle": "Disruption arrives through the sub-tier. Map it for the categories that would stop you, and put the disclosure obligation in the contract."
    }
 ],
  relSop: 'sop-supplier-evaluation',
  rel: {
    concepts: ['supplier-qualification', 'supplier-financial-risk', 'concentration-risk', 'supply-chain-risk'],
    sops: ['sop-supplier-evaluation'],
    checklists: ['cl-supplier-due-diligence', 'cl-supplier-risk-review'],
    templates: ['tpl-supplier-due-diligence', 'tpl-supplier-risk-assessment'],
    calcs: ['calc-supplier-concentration'],
    decisions: ['supplier-financial-risk', 'dual-source'],
    kpis: ['kpi-supplier-concentration']
  },
  labMission: {
    title: 'Mission 11: Evaluate Single vs Dual Sourcing Strategy',
    desc: 'Use the Sourcing Strategy Decision Guide to evaluate whether a critical item should be single-sourced or dual-sourced.',
    tasks: [
      'Open the Sourcing Decision Guide.',
      'Assess tool changeover costs, minimum production volumes, and downtime risk.',
      'Review the recommended risk allocation framework and follow-through actions.'
    ],
    ctaLabel: 'Launch Sourcing Decision Guide',
    ctaHref: '#/dec',
    secondaryLabel: 'Check Audit Checklist',
    secondaryHref: '#/cl/cl-audit'
  }
});
