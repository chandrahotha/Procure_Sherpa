/* ==========================================================
   Procure Sherpa v2.0 - Academy Content Part 1
   Modules 1 & 2: Foundations, Spend Analysis, Category Management,
                  Requirements & SOW, RFx Strategy, Tender Issuance
   ========================================================== */
PS.ACADEMY_FUNCTIONS = PS.ACADEMY_FUNCTIONS || [];

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-mission-value',
  title: 'The Procurement Mission & Value Creation',
  module: 'Module 1: Foundations, Strategy & Spend Intelligence',
  kicker: 'Function 1.1',
  tagline: 'Moving from reactive transactional purchasing to strategic enterprise value creation.',
  desc: 'Understand why procurement is a commercial leadership function that drives risk mitigation, cash flow, and supplier innovation, not just buying goods.',
  duration: '15 mins',
  lifecycleStage: 'Stage 1: Business Need Identification',
  lifecycleDesc: 'Anchors the front end of the procurement lifecycle, aligning procurement with organizational strategy.',
  
  what: 'Procurement is the end-to-end strategic process of identifying business needs, selecting external partners, negotiating commercial agreements, and managing supplier performance. It is fundamentally distinct from purchasing, which is the transactional execution of placing orders and processing payments.',
  why: [
    'Directly impacts bottom-line profitability: external spend accounts for 50% to 70% of total enterprise revenue in most industries.',
    'Protects the enterprise from existential operational risks, including single-source failure, supplier bankruptcy, and supply chain bottlenecks.',
    'Unlocks supplier-led innovation, speed-to-market, and sustainability advantages that internal teams cannot build alone.'
  ],
  when: [
    'When formulating annual corporate operating budgets and strategic category plans.',
    'Whenever a department identifies a new external need exceeding organizational spend thresholds.',
    'When evaluating whether an activity should be kept in-house or outsourced (Make-or-Buy).'
  ],
  raci: [
    { role: 'Procurement Lead', resp: 'Accountable for commercial strategy, market competition, compliance, and contract negotiation.' },
    { role: 'Budget Holder / Requisitioner', resp: 'Responsible for defining the functional requirement and approving the budget allocation.' },
    { role: 'Finance / Controller', resp: 'Consulted on budget availability, accounting treatment (Capex vs Opex), and savings realization.' },
    { role: 'Legal & Risk', resp: 'Consulted on enterprise risk tolerance, regulatory compliance, and governance.' }
  ],
  inputs: [
    'Corporate strategic objectives and departmental operational targets.',
    'Historical spend data and forecasted budget allocations.',
    'Enterprise Risk Management (ERM) guidelines and Delegations of Authority (DOA).'
  ],
  outputs: [
    'Annual Procurement Sourcing Plan and Category Charters.',
    'Spend under Management (SUM) target baselines.',
    'Approved Stakeholder Engagement & Governance Roadmap.'
  ],
  controls: [
    'Segregation of duties: the employee who defines the requirement cannot approve the vendor or release payment.',
    'Mandatory competitive sourcing thresholds (e.g., spend over $10,000 requires minimum 3 quotes).',
    'Procurement Code of Ethics and anti-bribery declarations signed annually.'
  ],
  mistakes: [
    'Measuring procurement success purely on unit price discounts while ignoring operational downtime and poor quality.',
    'Acting as a "rubber-stamp" order processing department rather than engaging business units before budgets are locked.',
    'Treating suppliers as adversaries rather than commercial partners, destroying supplier goodwill during supply shortages.'
  ],
  bestPractices: [
    'Engage internal stakeholders 6 to 12 months before major contracts expire to allow thorough competitive sourcing.',
    'Establish a Total Value Framework that tracks working capital improvements and risk mitigation alongside cost savings.',
    'Publish transparent procurement guidelines so internal requisitioners know exactly how to engage early.'
  ],
  terms: [
    { term: 'S2C (Source-to-Contract)', def: 'The strategic upstream cycle: need identification, spend analysis, market sourcing, negotiation, and contracting.' },
    { term: 'P2P (Procure-to-Pay)', def: 'The operational downstream cycle: purchase requisition, PO issuance, receipt of goods, and invoice payment.' },
    { term: 'Spend under Management (SUM)', def: 'The percentage of total organizational spend actively governed and negotiated by procurement.' }
  ],
  thinkingPoints: [
    {
      quote: 'Procurement does not buy things; procurement manages the commercial architecture of buying so the business gets the optimal balance of cost, risk, and quality.',
      explanation: 'In a modern enterprise, procurement specialists do not decide what software developers code with or what raw materials engineers design. Instead, procurement designs and enforces the objective commercial process that prevents favoritism, ensures market competition, and enforces legal protections.',
      realWorldExample: 'A software company allowed engineers to purchase cloud servers with corporate credit cards. By the end of the year, cloud spend had skyrocketed by $2.4M across 14 fragmented accounts. Procurement stepped in, consolidated all usage under an enterprise master agreement, secured a 28% volume discount, and established automated cost governance.',
      reflectionPrompt: 'Think about your own organization or a company you know: how much spend is negotiated strategically versus purchased on credit cards without competitive checks?'
    }
  ],
  sopSteps: [
    {
      title: 'Business Need Intake & Strategy Alignment',
      role: 'Procurement Specialist',
      desc: 'Meet with functional department heads during budget planning to identify upcoming capital projects and recurring operational service renewals.',
      control: 'Verify that requirements align with approved annual department budgets.',
      record: 'Procurement Intake Registry entry with preliminary spend estimate.',
      pitfall: 'Getting involved only after the stakeholder has already promised the business to a favored supplier.'
    },
    {
      title: 'Commercial Feasibility & Risk Assessment',
      role: 'Category Manager',
      desc: 'Assess whether the market contains sufficient competitive suppliers or whether sole-source risks exist.',
      control: 'Confirm whether the item falls under regulated, safety-critical, or single-source categories.',
      record: 'Preliminary Risk & Sourcing Classification memo.',
      pitfall: 'Underestimating lead times for specialized equipment or complex technical implementations.'
    },
    {
      title: 'Sourcing Track Assignment',
      role: 'Head of Procurement',
      desc: 'Route the requirement to the appropriate procurement path: Simple Buying (<$10k), Formal RFQ ($10k to $100k), or Strategic RFP/Tender (>$100k).',
      control: 'Adhere strictly to corporate Delegation of Authority (DOA) financial thresholds.',
      record: 'Assigned Sourcing Project Charter.',
      pitfall: 'Splitting requisitions into smaller batches to artificially bypass competitive tender thresholds (order splitting).'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'The Marketing Director approaches you on Friday afternoon saying: "We need an agency to launch our new branding campaign in 3 weeks. I already found the perfect agency and promised them the deal for $120,000. Can you please generate an urgent PO immediately?"',
      q: 'As a professional procurement partner, what is your most appropriate action?',
      options: [
        {
          text: 'Refuse flatly, cancel the project, and report the Marketing Director to HR for policy violation.',
          isCorrect: false,
          rationale: 'Procurement should not act like punitive police. An antagonistic relationship causes stakeholders to bypass procurement completely in the future.'
        },
        {
          text: 'Immediately issue the PO as requested because Marketing is the budget owner and claims urgent business necessity.',
          isCorrect: false,
          rationale: 'Issuing a $120,000 PO without competitive checks or contract terms exposes the company to severe commercial, IP ownership, and audit risks.'
        },
        {
          text: 'Engage the Director constructively: explain that spend above the threshold requires competition and IP protection, rapidly review the agency\'s scope and rates against market benchmarks, and negotiate contract terms and payment milestones before committing spend.',
          isCorrect: true,
          rationale: 'This protects enterprise interests (IP assignment, fair market pricing, milestone payments) while demonstrating that procurement acts as an agile commercial partner who solves problems rather than a bureaucratic bottleneck.'
        },
        {
          text: 'Split the purchase order into two separate $60,000 POs so that it falls below the mandatory tender threshold.',
          isCorrect: false,
          rationale: 'Artificial order splitting to bypass procurement approval thresholds is a severe compliance violation and a major internal audit red flag.'
        }
      ],
      principle: 'Procurement adds the greatest value by acting as a commercial risk buffer: protecting intellectual property, benchmarking market prices, and securing contract protections even in urgent situations.'
    },
    {
      type: 'mcq',
      q: 'What is the primary difference between "Source-to-Contract" (S2C) and "Procure-to-Pay" (P2P)?',
      options: [
        {
          text: 'S2C is the strategic upstream process of selecting suppliers and establishing contracts; P2P is the operational downstream process of issuing POs and processing payments.',
          isCorrect: true,
          rationale: 'Correct. S2C defines the commercial relationship and pricing; P2P executes day-to-day transactions under the umbrella of that contract.'
        },
        {
          text: 'S2C is only used for manufacturing materials, while P2P is only used for software subscriptions.',
          isCorrect: false,
          rationale: 'Both frameworks apply universally across direct goods, indirect services, capital expenditure, and IT.'
        },
        {
          text: 'S2C is handled exclusively by Finance, whereas P2P is handled exclusively by Procurement.',
          isCorrect: false,
          rationale: 'Procurement leads S2C, while P2P involves shared execution across requisitioners, procurement, receiving, and accounts payable.'
        }
      ],
      principle: 'Without a disciplined S2C contract in place, P2P simply automates the payment of uncompetitive, unvetted invoices.'
    }
  ],
  relSop: 'sop-procurement-lifecycle',
  rel: {
    concepts: ['c-procurement-lifecycle', 'c-procurement', 'c-spend-management'],
    sops: ['sop-procurement-lifecycle'],
    checklists: ['cl-procurement-intake'],
    templates: ['tpl-business-case'],
    calcs: ['calc-budget-vs-actual'],
    decisions: ['sourcing-method'],
    kpis: ['kpi-sum', 'kpi-roi']
  },
  labMission: {
    title: 'Mission 1: Conduct a Procurement Maturity & Lifecycle Diagnosis',
    desc: 'Use the Procurement Maturity Assessment tool to diagnose where an organization sits on the journey from ad-hoc buying to world-class value generation.',
    tasks: [
      'Open the Procurement Maturity Assessment tool.',
      'Evaluate current organizational readiness across Sourcing, Contracts, Governance, and Technology.',
      'Review the gap analysis to identify the top 3 priority areas for procurement transformation.'
    ],
    ctaLabel: 'Launch Maturity Diagnostic',
    ctaHref: '#/maturity',
    secondaryLabel: 'Explore 21-Stage Lifecycle',
    secondaryHref: '#/lifecycle'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-spend-analysis',
  title: 'Spend Analysis & Demand Profiling',
  module: 'Module 1: Foundations, Strategy & Spend Intelligence',
  kicker: 'Function 1.2',
  tagline: 'Transforming raw accounts payable invoice data into actionable sourcing intelligence.',
  desc: 'Learn how to clean, categorize, and analyze enterprise spend data to find supplier consolidation opportunities, identify maverick spend, and target cost reduction.',
  duration: '18 mins',
  lifecycleStage: 'Stage 2: Spend Analysis & Market Profiling',
  lifecycleDesc: 'Provides the factual data foundation before launching any sourcing or supplier negotiation initiative.',
  
  what: 'Spend analysis is the systematic extraction, cleansing, classification, and visualization of organizational purchase data. It answers five critical questions: What did we buy? From whom? At what unit price? By which department? And did it comply with agreed contracts?',
  why: [
    'Reveals supplier fragmentation: showing where multiple departments buy identical items from different vendors at different prices.',
    'Exposes maverick (off-contract) spend where employees bypass negotiated enterprise corporate rates.',
    'Provides the quantitative baseline required to calculate and claim verified cost savings to the CFO.'
  ],
  when: [
    'Annually during category planning and procurement budgeting.',
    'Prior to initiating any major RFQ or tender to establish historical volume and baseline pricing.',
    'During post-merger integration to rationalize overlapping supplier bases.'
  ],
  raci: [
    { role: 'Spend Analyst / Buyer', resp: 'Extracts, cleanses, normalizes vendor names, and classifies transaction line items.' },
    { role: 'Category Manager', resp: 'Interprets category spend concentration, tail spend, and supplier power dynamics.' },
    { role: 'Accounts Payable', resp: 'Provides raw general ledger (GL), purchase order, and invoice transaction reports.' },
    { role: 'Internal Stakeholders', resp: 'Clarifies vague or unclassified invoice line item descriptions.' }
  ],
  inputs: [
    '12 to 24 months of Accounts Payable invoice line-item extracts from the ERP.',
    'Purchase Order transaction records including item descriptions, quantities, and unit prices.',
    'Supplier master files with Tax IDs, payment terms, and parent-subsidiary relationships.'
  ],
  outputs: [
    'Categorized Spend Cube (Spend by Category, Supplier, and Department).',
    'ABC Spend Pareto Analysis (identifying the top 20% of suppliers representing 80% of spend).',
    'Tail Spend Rationalization targets and maverick spend audit reports.'
  ],
  controls: [
    'Data reconciliation: total analyzed spend must reconcile within 1% of total audited Accounts Payable ledger disbursements.',
    'Consistent taxonomy classification using standardized taxonomy (UNSPSC or custom enterprise taxonomy).',
    'Parent-subsidiary vendor normalization (e.g. mapping "Dell USA" and "Dell Financial" to Dell Inc.).'
  ],
  mistakes: [
    'Analyzing spend at invoice header level instead of examining detailed itemized line descriptions.',
    'Failing to clean duplicate supplier records (e.g., "Grainger Inc", "W.W. Grainger", and "Grainger Supply").',
    'Focusing 100% of team time on the bottom 5% "tail spend" while ignoring multi-million dollar category leaks.'
  ],
  bestPractices: [
    'Apply the 80/20 Pareto rule: prioritize deep should-cost analysis on Category A (top 80% of spend) while automating Category C tail spend through purchasing cards or digital catalogs.',
    'Calculate the Herfindahl-Hirschman Index (HHI) to measure supplier concentration risk within each critical category.',
    'Track addressable vs non-addressable spend (taxes, government utilities, and payroll are excluded from addressable spend).'
  ],
  terms: [
    { term: 'Spend Cube', def: 'A three-dimensional analytical view of spend: Commodity/Category &times; Supplier &times; Business Unit/Cost Center.' },
    { term: 'Maverick Spend', def: 'Purchases made outside negotiated corporate contracts or without procurement authorization.' },
    { term: 'Addressable Spend', def: 'Spend that can be competitively sourced or influenced by procurement (excluding taxes, wages, rent, utilities).' }
  ],
  thinkingPoints: [
    {
      quote: 'You cannot manage what you cannot see: unclassified spend is where corporate value quietly leaks.',
      explanation: 'When finance systems dump miscellaneous invoices into generic buckets like "Other Operating Expense" or "Consulting", suppliers quietly raise prices without anyone noticing. A category manager who unmasks these line items immediately finds double-digit savings.',
      realWorldExample: 'A manufacturing firm had 4 factories across the Midwest. A spend analysis revealed that all 4 plants were independently buying identical safety goggles and gloves from 7 local distributors at prices varying by up to 42%. By consolidating spend into a single national contract, procurement delivered an immediate $380,000 recurring saving.',
      reflectionPrompt: 'If your organization pulled last year\'s top 50 suppliers, how many are delivering identical services to different departments under separate contracts?'
    }
  ],
  sopSteps: [
    {
      title: 'Data Extraction & Scope Definition',
      role: 'Procurement Analyst',
      desc: 'Extract 12 to 24 months of invoice and PO line items from ERP systems, filtering out non-addressable items (taxes, payroll, depreciation).',
      control: 'Reconcile sum total of extracted spend against total Accounts Payable general ledger disbursements.',
      record: 'Raw Spend Extract and Reconciliation Sign-off sheet.',
      pitfall: 'Missing credit card or expense report (T&E) transactions that conceal thousands of software subscriptions.'
    },
    {
      title: 'Vendor Cleansing & Parent-Child Normalization',
      role: 'Procurement Analyst',
      desc: 'Clean typos, merge duplicate supplier records, and link regional branches to ultimate parent company entities.',
      control: 'Match unique tax identification numbers (EIN, VAT) to consolidate vendor families.',
      record: 'Cleaned Vendor Master Mapping table.',
      pitfall: 'Treating three subsidiaries of the same multinational supplier as three independent competing vendors.'
    },
    {
      title: 'Categorization & Opportunity Identification',
      role: 'Category Manager',
      desc: 'Map every transaction line item into a standardized procurement taxonomy (Level 1 Category &rarr; Level 2 Subcategory &rarr; Level 3 Item).',
      control: 'Ensure unclassified or "miscellaneous" spend represents less than 3% of total volume.',
      record: 'Completed Spend Cube and Annual Sourcing Opportunity Matrix.',
      pitfall: 'Allowing broad catch-all categories like "General Supplies" to hide million-dollar contracts.'
    }
  ],
  quizzes: [
    {
      type: 'calc',
      context: 'You perform a spend review on packaging supplies across 3 regional distribution hubs. Hub North bought 20,000 cartons at $3.20 each. Hub South bought 15,000 cartons at $3.80 each. Hub West bought 25,000 cartons at $2.90 each. All cartons are identical specification.',
      q: 'If you consolidate all 60,000 cartons under a single enterprise volume contract at Hub West\'s price of $2.90, how much money will you save annually across the company?',
      options: [
        {
          text: '$19,500',
          isCorrect: true,
          rationale: 'Correct! Hub North spent $64,000. Hub South spent $57,000. Hub West spent $72,500. Total current spend = $193,500. Consolidated spend at $2.90 = 60,000 x $2.90 = $174,000. Total Annual Savings = $193,500 - $174,000 = $19,500.'
        },
        {
          text: '$12,000',
          isCorrect: false,
          rationale: 'Incorrect. This only accounts for Hub North ($6,000) and part of Hub South.'
        },
        {
          text: '$27,000',
          isCorrect: false,
          rationale: 'Incorrect. Verify the math by calculating current spend minus new unified spend.'
        }
      ],
      calcWork: 'Current Spend:\n- North: 20,000 x $3.20 = $64,000\n- South: 15,000 x $3.80 = $57,000\n- West: 25,000 x $2.90 = $72,500\nTotal = $193,500\n\nUnified Spend: 60,000 x $2.90 = $174,000\nSavings: $193,500 - $174,000 = $19,500 (10.08% overall reduction).',
      principle: 'Price variance across internal business units is procurement\'s lowest-hanging fruit: it requires no supplier switching, only contract consolidation.'
    },
    {
      type: 'scenario',
      context: 'Your company spend analysis shows that out of 1,200 active suppliers, the top 85 suppliers account for 82% of total expenditure ($41M). Meanwhile, the remaining 1,115 suppliers represent only $9M in spend, with thousands of one-off invoices.',
      q: 'Where should the procurement team concentrate its strategic sourcing efforts according to procurement best practices?',
      options: [
        {
          text: 'Spend 90% of the team\'s time renegotiating with the 1,115 small suppliers to get individual discounts on every invoice.',
          isCorrect: false,
          rationale: 'This is a catastrophic misallocation of time. The administrative cost of conducting hundreds of small negotiations far exceeds any potential savings.'
        },
        {
          text: 'Apply strategic category management and deep commercial negotiation to the top 85 Category A suppliers, while consolidating and streamlining the tail spend through punchout catalogs or buying cards.',
          isCorrect: true,
          rationale: 'Correct! The 80/20 Pareto rule dictates that senior procurement bandwidth must defend the 82% of spend where a 3% savings equals over $1.2M, while automating tail spend transactions.'
        },
        {
          text: 'Immediately terminate all 1,115 small suppliers and refuse to pay their pending invoices.',
          isCorrect: false,
          rationale: 'This would immediately halt operations and cause legal breaches for validly ordered services.'
        }
      ],
      principle: 'Differentiate your strategy: manage the head of spend with deep strategic rigor; manage the tail of spend with process efficiency and automation.'
    }
  ],
  relSop: 'sop-savings-calculation',
  rel: {
    concepts: ['spend-analysis', 'c-spend-management', 'direct-indirect-spend'],
    sops: ['sop-savings-calculation'],
    checklists: ['cl-savings-validation'],
    templates: ['tpl-savings-calculation'],
    calcs: ['calc-savings-analysis', 'calc-supplier-concentration'],
    decisions: ['consolidate-suppliers'],
    kpis: ['kpi-sum', 'kpi-savings']
  },
  labMission: {
    title: 'Mission 2: Analyze Supplier Spend Concentration (HHI)',
    desc: 'Use the Spend Concentration Calculator to calculate market concentration and measure supplier dependency risk.',
    tasks: [
      'Open the Supplier Concentration / HHI Calculator.',
      'Enter spend figures for your top 5 suppliers in a category.',
      'Review the calculated Herfindahl-Hirschman Index and identify whether your category has healthy competition or dangerous monopolistic risk.'
    ],
    ctaLabel: 'Launch Concentration Tool',
    ctaHref: '#/calc/calc-concentration',
    secondaryLabel: 'Open Spend Analysis SOP',
    secondaryHref: '#/sop/sop-savings-calculation'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-category-mgmt',
  title: 'Category Management & Portfolio Strategy',
  module: 'Module 1: Foundations, Strategy & Spend Intelligence',
  kicker: 'Function 1.3',
  tagline: 'Segmenting spend using the Kraljic Matrix to deploy the right strategy for every market.',
  desc: 'Learn how to map spend into Strategic, Bottleneck, Leverage, and Routine quadrants to maximize commercial power and eliminate supply chain disruptions.',
  duration: '20 mins',
  lifecycleStage: 'Stage 3: Category Sourcing Strategy',
  lifecycleDesc: 'Establishes the macro sourcing strategy for an entire category before individual tenders are released.',
  
  what: 'Category management is an end-to-end strategic methodology that groups corporate purchases into distinct market-facing segments (e.g. IT Software, Fleet Management, Logistics, Marketing, Raw Materials). Each category is managed as a strategic business unit with a multi-year plan tailored to supply market dynamics.',
  why: [
    'Replaces piecemeal, one-off buying with holistic multi-year supply strategies that build market leverage.',
    'Prevents commercial over-reach: tailoring contract aggression depending on whether suppliers are easily replaceable or monopolistic.',
    'Identifies supply risks early, allowing the business to develop secondary suppliers before emergencies happen.'
  ],
  when: [
    'When establishing or refreshing a 3-to-5 year procurement category roadmap.',
    'When major supply market shifts occur (e.g., raw material shortages, supplier consolidations, tariffs).',
    'Prior to negotiating enterprise master agreements.'
  ],
  raci: [
    { role: 'Category Manager', resp: 'Owns the market research, category strategy document, and supplier relationship plan.' },
    { role: 'Cross-Functional Sourcing Team', resp: 'Validates technical requirements, operational constraints, and business growth plans.' },
    { role: 'Suppliers', resp: 'Provide supply market trends, technology roadmaps, and capacity forecasts.' },
    { role: 'Executive Sponsor', resp: 'Approves category investment, make-vs-buy decisions, and supplier consolidation mandates.' }
  ],
  inputs: [
    'Historical category spend volume and 3-year enterprise growth projections.',
    'Supply market intelligence reports (Porter\'s Five Forces analysis, supplier market shares).',
    'Internal stakeholder quality and service requirements.'
  ],
  outputs: [
    'Category Management Strategy Document and Kraljic Matrix mapping.',
    'Preferred Supplier List (PSL) and approved sourcing rules.',
    'Category Sourcing Wave Plan and expected value delivery roadmap.'
  ],
  controls: [
    'Formal stakeholder sign-off on category strategy before initiating market tenders.',
    'Annual review of category risk profiles and inflation index adjustments.',
    'Adherence to single-vs-dual sourcing policies defined in the category charter.'
  ],
  mistakes: [
    'Treating Bottleneck items (high supply risk, low spend) as Leverage items, causing severe supplier boycotts or production shutdowns.',
    'Writing a category strategy once and locking it in a drawer without annual operational review.',
    'Failing to involve internal technical stakeholders when evaluating alternative substitute materials or vendors.'
  ],
  bestPractices: [
    'Map every subcategory into the Kraljic Matrix: Leverage (Exploit buying power), Strategic (Build partnerships), Bottleneck (Secure continuity / find substitutes), Routine (Standardize and automate).',
    'Conduct supplier perception surveys to understand whether you are a Core, Development, Exploitable, or Nuisance customer to your key suppliers.',
    'Develop Total Cost of Ownership (TCO) benchmarks for all strategic category assets.'
  ],
  terms: [
    { term: 'Kraljic Matrix', def: 'A 2x2 procurement framework segmenting spend by Supply Risk (x-axis) and Financial Impact (y-axis).' },
    { term: 'Leverage Items', def: 'High spend, low supply risk items with abundant suppliers where aggressive competitive tendering yields maximum savings.' },
    { term: 'Bottleneck Items', def: 'Low spend, high supply risk items with few suppliers where continuity of supply is the primary goal.' }
  ],
  thinkingPoints: [
    {
      quote: 'Treating paperclips and critical custom manufacturing components with the same sourcing strategy is a recipe for either crippling bureaucracy or catastrophic supply disruption.',
      explanation: 'One size never fits all in procurement. Routine low-risk items demand automated catalogs and minimal human touches. In contrast, strategic high-risk items require multi-stakeholder governance, long-term contracts, joint innovation, and contingency reserves.',
      realWorldExample: 'An automotive manufacturer attempted to aggressively squeeze an 8% price cut from a tiny supplier of proprietary valve springs (a bottleneck item representing just $80,000 annual spend). The offended supplier walked away and refused to renew the contract. Finding and certifying a replacement took 4 months, shutting down an assembly line and costing the carmaker $14 million in lost production.',
      reflectionPrompt: 'Are there small-spend suppliers in your organization who hold single-source control over critical business operations?'
    }
  ],
  sopSteps: [
    {
      title: 'Category Spend Profiling & Stakeholder Mapping',
      role: 'Category Manager',
      desc: 'Define category boundaries, extract historical spend, and map all internal business users and budget owners.',
      control: 'Verify that category boundaries reflect external supply markets rather than internal org charts.',
      record: 'Category Profile Charter.',
      pitfall: 'Defining categories based on who buys them rather than what supply market produces them.'
    },
    {
      title: 'Supply Market Intelligence & Kraljic Segmentation',
      role: 'Category Manager',
      desc: 'Analyze market dynamics (monopoly vs competitive) and place category components into the Kraljic quadrants.',
      control: 'Validate risk scoring with technical engineering and supply chain risk teams.',
      record: 'Kraljic Matrix Mapping and Market Intelligence Report.',
      pitfall: 'Assuming high-spend automatically means high leverage. If only one supplier exists in the world, you have no leverage.'
    },
    {
      title: 'Strategy Formulation & Governance Approval',
      role: 'Category Manager & Executive Sponsor',
      desc: 'Formulate strategy: e-Auction for Leverage, Supplier Development for Strategic, Substitution for Bottleneck, and Punchout Catalog for Routine.',
      control: 'Formal executive sign-off and alignment with corporate financial targets.',
      record: 'Signed Category Strategy Document and 3-Year Sourcing Wave Plan.',
      pitfall: 'Proceeding without stakeholder consensus, leading to widespread off-contract maverick spending.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'You are category manager for industrial equipment. One specialized sensor costs only $15,000 a year, but only one company in the world manufactures it, and your entire $50M assembly line halts if you run out.',
      q: 'Under the Kraljic Matrix, what quadrant does this sensor fall into, and what is your primary procurement objective?',
      options: [
        {
          text: 'Leverage Quadrant: Aggressively demand a 20% price reduction and threaten to walk away.',
          isCorrect: false,
          rationale: 'Threatening a monopoly supplier of a $15,000 item will cause them to cut off supply, risking your entire $50M line.'
        },
        {
          text: 'Bottleneck Quadrant: Focus on security of supply, build safety buffer stock, explore long-term index-linked contracts, and seek engineering substitutes.',
          isCorrect: true,
          rationale: 'Correct! Bottleneck items have low financial impact but high operational risk. Continuity of supply trumps cost savings.'
        },
        {
          text: 'Routine Quadrant: Put the item on a corporate employee credit card and buy it ad-hoc from an online storefront.',
          isCorrect: false,
          rationale: 'If stock is unavailable on the storefront, your plant shuts down immediately.'
        }
      ],
      principle: 'Never sacrifice supply continuity for negligible cost savings on bottleneck items.'
    },
    {
      type: 'mcq',
      q: 'Which characteristic defines a "Leverage" category in procurement?',
      options: [
        {
          text: 'High spend volume with many competing suppliers offering standardized, interchangeable products or services.',
          isCorrect: true,
          rationale: 'Correct! High spend gives you buyer power; abundant suppliers give you switching credibility. This is where competitive tendering and e-auctions deliver maximum savings.'
        },
        {
          text: 'High spend with only one patent-protected global supplier.',
          isCorrect: false,
          rationale: 'High spend with a single supplier is a Strategic quadrant item requiring partnership and negotiation, not simple leverage.'
        },
        {
          text: 'Low spend items that require 6 months to manufacture.',
          isCorrect: false,
          rationale: 'That is a Bottleneck item.'
        }
      ],
      principle: 'Leverage exists only when the buyer has significant volume AND the credible ability to switch suppliers.'
    }
  ],
  relSop: 'sop-procurement-lifecycle',
  rel: {
    concepts: ['category-management', 'c-spend-management'],
    sops: ['sop-procurement-lifecycle'],
    checklists: ['cl-sourcing-strategy'],
    templates: ['tpl-business-case'],
    calcs: ['calc-supplier-concentration', 'calc-make-vs-buy'],
    decisions: ['make-or-buy', 'sourcing-method'],
    kpis: ['kpi-sum']
  },
  labMission: {
    title: 'Mission 3: Evaluate Make-or-Buy Category Strategy',
    desc: 'Use the Make-or-Buy Decision Calculator to evaluate whether a category component should be insourced or outsourced.',
    tasks: [
      'Open the Make-vs-Buy Decision Calculator.',
      'Enter internal capital and operational costs versus external supplier quotes.',
      'Analyze the break-even production volume to determine the optimal strategic route.'
    ],
    ctaLabel: 'Launch Make-vs-Buy Tool',
    ctaHref: '#/calc/calc-make-buy',
    secondaryLabel: 'Open Sourcing Strategy Guide',
    secondaryHref: '#/dec'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-requirement-scope',
  title: 'Requirement Definition & Scope Formulation (SOW)',
  module: 'Module 2: Requirement Definition & Market Engagement',
  kicker: 'Function 2.1',
  tagline: 'Translating business needs into unambiguous, competitive specifications.',
  desc: 'Master the art of crafting functional specifications and Statements of Work (SOW) that prevent supplier scope creep, avoid proprietary lock-in, and ensure fair competition.',
  duration: '18 mins',
  lifecycleStage: 'Stage 4: Requirement Definition & Intake',
  lifecycleDesc: 'The gateway between internal stakeholder demand and external supplier market engagement.',
  
  what: 'Requirement definition is the process of articulating exactly what good or service the organization needs to purchase. A Statement of Work (SOW) defines the project scope, deliverables, acceptance criteria, timeline, and performance standards for services.',
  why: [
    'Unclear specifications are the #1 root cause of procurement disputes, change orders, cost overruns, and litigation.',
    'Functional specifications stimulate market competition by allowing suppliers to propose innovative solutions rather than forcing a rigid proprietary brand.',
    'Clear acceptance criteria prevent suppliers from demanding payment before work is genuinely completed and verified.'
  ],
  when: [
    'Prior to assembling and releasing an RFQ, RFP, or tender package to the market.',
    'Whenever contracting for professional services, IT development, construction, or customized manufacturing.',
    'When re-competing a legacy service that has suffered from chronic scope creep.'
  ],
  raci: [
    { role: 'Business User / Requisitioner', resp: 'Accountable for technical requirements, business outcomes, and subject matter details.' },
    { role: 'Procurement Specialist', resp: 'Reviews scope for commercial clarity, neutrality, milestone structures, and anti-lock-in language.' },
    { role: 'Legal Counsel', resp: 'Reviews IP ownership, liability, and standard contract integration.' },
    { role: 'Suppliers', resp: 'Bids strictly against the defined deliverables and acceptance criteria.' }
  ],
  inputs: [
    'Business problem statement and desired operational outcomes.',
    'Current baseline metrics (e.g. current system downtime, volume of transactions).',
    'Regulatory, safety, and compliance prerequisites.'
  ],
  outputs: [
    'Approved Statement of Work (SOW) or Technical Specification Sheet.',
    'Deliverable Acceptance Criteria Checklist.',
    'Service Level Agreement (SLA) & Key Performance Indicator (KPI) Schedule.'
  ],
  controls: [
    'Anti-brand bias rule: brand names are forbidden in specifications unless explicitly followed by "or approved equal".',
    'Objective acceptance criteria: deliverables must have measurable pass/fail testing protocols.',
    'Payment linked to deliverables: milestones are paid only upon written stakeholder sign-off, never purely on elapsed time.'
  ],
  mistakes: [
    'Copy-pasting an incumbent supplier\'s product brochure directly into the specification, eliminating competition.',
    'Writing a time-and-materials contract for work that could easily have been priced on fixed-deliverable milestones.',
    'Leaving acceptance criteria vague (e.g. "Work shall be completed to satisfaction"), inviting endless contractor disputes.'
  ],
  bestPractices: [
    'Use Functional Specifications ("What it must accomplish") rather than Technical Specifications ("How to build it") to invite supplier innovation and cost reduction.',
    'Include a comprehensive Service Level Agreement (SLA) with clearly defined financial remedies for missed deadlines.',
    'Establish a formal Change Order procedure in the SOW so any scope modifications require prior written commercial sign-off.'
  ],
  terms: [
    { term: 'Statement of Work (SOW)', def: 'A legally binding document outlining project activities, deliverables, milestones, timelines, and acceptance criteria.' },
    { term: 'Functional Specification', def: 'Describes the required performance, outcome, or function rather than detailing specific materials or methods.' },
    { term: 'Acceptance Criteria', def: 'Pre-agreed objective standards that a deliverable must satisfy before the buyer approves payment.' }
  ],
  thinkingPoints: [
    {
      quote: 'A vague requirement produces a precise dispute.',
      explanation: 'When procurement publishes an ambiguous specification, every bidder interprets it differently. The supplier who bids lowest is usually the one who omitted critical scope that they plan to bill later via expensive change orders. Clear specifications protect both the company budget and supplier relationships.',
      realWorldExample: 'A bank hired an IT development firm with an SOW stating: "Vendor shall build a modern customer onboarding portal." Six months later, the vendor delivered a barebones webpage without database integration, security encryption, or mobile responsiveness, demanding an extra $450,000 in Change Orders to add them. The bank had no legal recourse because the original SOW lacked technical acceptance criteria.',
      reflectionPrompt: 'When reviewing contracts in your organization, do milestones state exactly what test must be passed before the invoice is approved?'
    }
  ],
  sopSteps: [
    {
      title: 'Demand Intake & Problem Formulation',
      role: 'Procurement Lead & Requisitioner',
      desc: 'Conduct an intake interview to define the underlying business problem, required outcomes, and operational constraints.',
      control: 'Verify that the requirement is not already covered under an existing active corporate contract.',
      record: 'Intake Requisition Form.',
      pitfall: 'Accepting a brand-name purchase requisition without questioning whether market alternatives exist.'
    },
    {
      title: 'SOW Draft & Milestone Structure',
      role: 'Requisitioner & Procurement Lead',
      desc: 'Draft the Scope of Work, breaking large projects into distinct sequential phases with measurable deliverables.',
      control: 'Tie invoice payment percentages directly to validated milestone acceptance sign-offs.',
      record: 'Draft Statement of Work (SOW).',
      pitfall: 'Agreeing to large upfront advance deposits with no performance guarantees.'
    },
    {
      title: 'Commercial & Legal Review',
      role: 'Procurement Specialist',
      desc: 'Screen the specification for anti-competitive vendor bias, ambiguous language, and missing warranty clauses.',
      control: 'Ensure "or approved equal" clause is included for any referenced standards or model numbers.',
      record: 'Final Approved Bid Specification Package.',
      pitfall: 'Allowing the favored supplier to help write the RFP specifications in secret.'
    }
  ],
  quizzes: [
    {
      type: 'red_flag',
      context: 'You review a draft Statement of Work submitted by an internal IT manager for cloud consulting services. Clause 4 reads: "Consultant will perform cloud migration services on a best-efforts basis at $180/hour. Invoices will be submitted bi-weekly based on hours logged and paid within 15 days."',
      q: 'What is the major red flag in this clause from a commercial and procurement perspective?',
      options: [
        {
          text: 'The payment terms are 15 days instead of the corporate standard 30 days, but otherwise the clause is completely standard and safe.',
          isCorrect: false,
          rationale: 'Payment terms are an issue, but far less critical than paying open-ended hourly fees with zero deliverable accountability.'
        },
        {
          text: 'The contract provides zero milestone deliverables, no definition of done, no cap on hours, and promises payment on "best efforts" rather than accepted results.',
          isCorrect: true,
          rationale: 'Correct! This exposes the company to unlimited budget overruns. The consultant can log hundreds of hours with no working system delivered and still demand payment legally.'
        },
        {
          text: 'The hourly rate of $180 is illegal under federal procurement regulations.',
          isCorrect: false,
          rationale: 'Hourly rates vary by market; there is no such law. The commercial trap is the open-ended commitment.'
        }
      ],
      principle: 'Never pay purely for time spent unless accompanied by clear deliverables, acceptance testing, and a Not-to-Exceed (NTE) financial ceiling.'
    },
    {
      type: 'scenario',
      context: 'An engineering team specifies a replacement pump stating: "Vendor must provide Grundfos Model CR-15 Pump only. No substitutes allowed." When you investigate, you discover 4 other global manufacturers make identical ISO-standard pumps at 25% lower cost.',
      q: 'How should procurement handle this situation?',
      options: [
        {
          text: 'Ignore the engineers and unilaterally order a different pump from China without consulting them.',
          isCorrect: false,
          rationale: 'Procurement cannot arbitrarily override engineering standards without technical vetting; this could cause catastrophic physical plant failures.'
        },
        {
          text: 'Simply approve the sole-source Grundfos requisition to keep the engineers happy.',
          isCorrect: false,
          rationale: 'Rubber-stamping sole-source requests without challenge forfeits procurement\'s primary duty to generate competition and value.'
        },
        {
          text: 'Engage the engineering team, review the technical parameters, and convert the specification to a functional standard: "Grundfos CR-15 or approved engineering equal", inviting qualified alternative manufacturers to bid.',
          isCorrect: true,
          rationale: 'Correct! This introduces market competition while ensuring the engineering team retains the technical authority to inspect and approve alternative bids.'
        }
      ],
      principle: 'Convert brand-name requisitions into functional specifications to invite competition while preserving technical integrity.'
    }
  ],
  relSop: 'sop-procurement-intake',
  rel: {
    concepts: ['specification', 'c-procurement-lifecycle'],
    sops: ['sop-procurement-intake'],
    checklists: ['cl-requirement-definition'],
    templates: ['tpl-rfq'],
    calcs: ['calc-po-value-check'],
    decisions: ['make-or-buy'],
    kpis: ['kpi-cycle-time']
  },
  labMission: {
    title: 'Mission 4: Complete an Intake & Requirement Checklist',
    desc: 'Use the Procurement Intake Checklist to review an incoming purchase request and ensure all specifications are clear.',
    tasks: [
      'Open the Intake & Planning Checklist.',
      'Check off compliance gates for scope clarity, budget validation, and competitive feasibility.',
      'Record observations in the checklist notes for audit readiness.'
    ],
    ctaLabel: 'Open Intake Checklist',
    ctaHref: '#/cl/cl-procurement-intake',
    secondaryLabel: 'Review SOW Template',
    secondaryHref: '#/tpl'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-rfx-strategy',
  title: 'Sourcing Channels & RFx Selection (RFI vs RFP vs RFQ)',
  module: 'Module 2: Requirement Definition & Market Engagement',
  kicker: 'Function 2.2',
  tagline: 'Selecting the optimal market engagement vehicle for every procurement situation.',
  desc: 'Understand the distinct strategic purposes of Requests for Information (RFI), Proposals (RFP), Quotations (RFQ), and e-Auctions to maximize supplier participation and value.',
  duration: '16 mins',
  lifecycleStage: 'Stage 5: Sourcing Strategy Formulation',
  lifecycleDesc: 'Determines the tactical go-to-market structure before issuing tender documents.',
  
  what: 'An RFx (Request for "x") is the formal commercial vehicle used to engage external supplier markets. Choosing the correct RFx type ensures procurement gathers the right information without wasting internal time or burning supplier goodwill.',
  why: [
    'Prevents procurement mismatch: using an RFQ when the technical solution is unknown creates un-comparable bids.',
    'Maximizes competitive tension: running e-Auctions on commodity goods can yield double-digit price reductions in hours.',
    'Filters unqualified suppliers early via RFIs before investing weeks evaluating multi-page technical RFP proposals.'
  ],
  when: [
    'RFI: When researching new technologies, unknown supplier capabilities, or exploring budget cost estimates.',
    'RFP: When the business problem is clear, but suppliers are invited to propose creative, customized technical solutions and pricing.',
    'RFQ: When specifications are standardized, commodity, or fully defined, and price/delivery terms are the primary decision drivers.',
    'Reverse Auction: When high spend volume, commoditized specifications, and multiple qualified suppliers exist.'
  ],
  raci: [
    { role: 'Procurement Specialist', resp: 'Decides RFx strategy, designs the bid package, manages supplier communication, and chairs evaluation.' },
    { role: 'Internal Stakeholders', resp: 'Drafts technical criteria, scores RFP proposals, and attends supplier demonstrations.' },
    { role: 'Bidders / Suppliers', resp: 'Submits formal responses adhering strictly to the RFx instructions and deadlines.' },
    { role: 'Finance', resp: 'Confirms budget availability and verifies price evaluation models.' }
  ],
  inputs: [
    'Approved Scope of Work or Technical Specification.',
    'Market supplier landscape (number of qualified competitors).',
    'Category strategic classification (Kraljic matrix position).'
  ],
  outputs: [
    'Selected Sourcing Channel Protocol (RFI, RFP, RFQ, or Auction).',
    'Bidder Shortlist and Pre-qualification Matrix.',
    'Formal RFx Package with Evaluation Criteria and Commercial Schedules.'
  ],
  controls: [
    'Strict communication blackout: all supplier questions must be submitted through procurement to prevent unfair coaching by stakeholders.',
    'Equal information disclosure: all clarifications and Q&A answers must be shared simultaneously with all bidders without revealing names.',
    'Submission deadline integrity: late bids are rejected automatically to maintain probity and prevent legal challenge.'
  ],
  mistakes: [
    'Issuing an RFP with 120 complex essay questions for a simple commodity purchase, annoying suppliers and inflating overhead.',
    'Allowing stakeholders to communicate privately with their favorite supplier during an active RFP.',
    'Conducting a Reverse Auction when only two suppliers exist or when switching costs are prohibitively high.'
  ],
  bestPractices: [
    'Use an RFI as an early stage filter to shortlist 3 to 5 highly capable vendors before launching a detailed RFP.',
    'Publish your evaluation weighting breakdown (e.g. 60% Technical, 40% Commercial) inside the RFP package so bidders tailor their proposals to what matters most.',
    'Keep RFQ pricing sheets structured with mandatory itemized line items to prevent suppliers from hiding fees in unformatted PDF quotes.'
  ],
  terms: [
    { term: 'RFI (Request for Information)', def: 'A fact-finding inquiry to gather market information, supplier profiles, and capability overviews without commercial pricing commitments.' },
    { term: 'RFP (Request for Proposal)', def: 'A structured solicitation for complex requirements where suppliers propose methodology, technical architecture, and commercial fees.' },
    { term: 'RFQ (Request for Quotation)', def: 'A commercial solicitation for standardized goods/services where specifications are identical and award is driven by price, delivery, and terms.' }
  ],
  thinkingPoints: [
    {
      quote: 'Using an RFQ when you don\'t know the technical solution wastes supplier goodwill; using an RFP when specifications are standard wastes company time.',
      explanation: 'If you issue an RFQ asking "How much to build an ERP system?" without defined architecture, quotes will range from $50,000 to $5,000,000 because nobody is bidding on the same thing. Conversely, issuing a 40-page RFP asking for "creative philosophies" to buy A4 printer paper is absurd bureaucracy. Match the tool to the market.',
      realWorldExample: 'A logistics firm needed warehouse management software. Instead of guessing, they ran an agile 2-week RFI to understand cloud options. Armed with that knowledge, they issued a crisp RFP to 4 shortlisted vendors. The winning vendor solved their inventory bottlenecks at half the estimated cost because the RFP focused on business outcomes rather than rigid custom code.',
      reflectionPrompt: 'Has your team ever spent months evaluating complex RFP responses when a simple 3-line RFQ would have achieved the same commercial outcome?'
    }
  ],
  sopSteps: [
    {
      title: 'Market Maturity & Specification Clarity Check',
      role: 'Procurement Specialist',
      desc: 'Assess whether specifications are fully locked (use RFQ), outcome-based (use RFP), or exploratory (use RFI).',
      control: 'Consult Sourcing Method Decision Tree to validate selection criteria.',
      record: 'Sourcing Channel Selection Memo.',
      pitfall: 'Using RFQ for complex software services where hidden implementation hours will balloon the budget.'
    },
    {
      title: 'Bidder Longlisting & Pre-qualification',
      role: 'Procurement Lead',
      desc: 'Identify qualified market suppliers, verify basic financial stability, and confirm willingness to participate.',
      control: 'Ensure minimum of 3 independent, non-affiliated suppliers on the tender list.',
      record: 'Bidders List with contact details and NDA execution.',
      pitfall: 'Inviting "token" bidders who have zero chance of winning just to fulfill a numerical checklist.'
    },
    {
      title: 'Tender Release & Fair Clarification Governance',
      role: 'Procurement Specialist',
      desc: 'Issue the bid package through a single commercial point of contact; manage supplier clarifications transparently.',
      control: 'Publish all questions and answers anonymously to all participating bidders simultaneously.',
      record: 'Tender Clarification Bulletin.',
      pitfall: 'Answering a favored bidder\'s phone call and giving them private hints about competitor pricing.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'Your company needs to purchase 500 standard Dell Latitude laptops with pre-defined CPU, RAM, and SSD specifications. Delivery is required across 2 regional offices within 30 days.',
      q: 'Which sourcing vehicle is the most appropriate and cost-effective?',
      options: [
        {
          text: 'Request for Information (RFI) with an open-ended survey about the future of computing.',
          isCorrect: false,
          rationale: 'An RFI gathers market research; it does not secure firm commercial pricing or delivery commitments.'
        },
        {
          text: 'Request for Quotation (RFQ) issued to 3 to 4 authorized Dell distributors with an itemized pricing and delivery schedule.',
          isCorrect: true,
          rationale: 'Correct! The product specification is 100% standardized and unambiguous. An RFQ allows fast, apples-to-apples price and delivery comparison.'
        },
        {
          text: 'Request for Proposal (RFP) asking distributors to write 20-page essays on their corporate philosophy and values.',
          isCorrect: false,
          rationale: 'Writing and evaluating essays for standardized hardware wastes massive internal and supplier time.'
        }
      ],
      principle: 'When specifications are clear, standard, and interchangeable, use an RFQ to drive transparent price and delivery competition.'
    },
    {
      type: 'mcq',
      q: 'During an active RFP tender, a bidder calls you directly and asks for clarification on a confusing paragraph in your technical requirements. What must you do?',
      options: [
        {
          text: 'Explain the clarification over the phone, but do not tell the other bidders so you can see who is smart enough to figure it out.',
          isCorrect: false,
          rationale: 'Giving private information to one bidder violates tender probity, destroys fair competition, and exposes the company to legal protest.'
        },
        {
          text: 'Instruct the bidder to submit the question in writing via the official procurement channel, formulate a clear answer, and publish both the question and answer to ALL bidders simultaneously without disclosing who asked.',
          isCorrect: true,
          rationale: 'Correct! Equal information distribution is the foundational ethical and legal rule of public and commercial tendering.'
        },
        {
          text: 'Disqualify the bidder immediately for daring to ask a question.',
          isCorrect: false,
          rationale: 'Supplier questions are normal and helpful: they identify gaps in your documentation.'
        }
      ],
      principle: 'All bidders must compete on a strictly level playing field: identical information, identical deadlines, identical rules.'
    }
  ],
  relSop: 'sop-rfq',
  rel: {
    concepts: ['rfi-rfq-rfp', 'sourcing-strategy', 'competitive-tension'],
    sops: ['sop-rfq', 'sop-rfp'],
    checklists: ['cl-sourcing-strategy', 'cl-rfq-preparation'],
    templates: ['tpl-rfq', 'tpl-rfp'],
    calcs: ['calc-po-value-check'],
    decisions: ['rfq-or-rfp', 'rfi-or-rfq', 'competitive-or-single'],
    kpis: ['kpi-bid-rate', 'kpi-sourcing-coverage']
  },
  labMission: {
    title: 'Mission 5: Test Sourcing Channel Selection Guide',
    desc: 'Use the Sourcing Decision Guide to evaluate project scenarios and determine whether to use an RFI, RFP, RFQ, or Auction.',
    tasks: [
      'Open the Sourcing Method Decision Guide.',
      'Input project complexity, specification clarity, and market supplier count.',
      'Review the recommended tender vehicle and procurement follow-through actions.'
    ],
    ctaLabel: 'Open Decision Guide',
    ctaHref: '#/dec',
    secondaryLabel: 'View RFQ Template',
    secondaryHref: '#/tpl/tpl-rfq'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-rfq-issuance',
  title: 'Tender / RFQ Preparation & Market Issuance',
  module: 'Module 2: Requirement Definition & Market Engagement',
  kicker: 'Function 2.3',
  tagline: 'Structuring professional bid packages that yield compliant, comparable supplier bids.',
  desc: 'Learn how to assemble comprehensive RFQ packages, structure pricing schedules, enforce submission protocols, and protect tender confidentiality.',
  duration: '18 mins',
  lifecycleStage: 'Stage 6: Tender & RFQ Preparation',
  lifecycleDesc: 'The critical execution step where commercial documents are assembled and officially released.',
  
  what: 'Tender / RFQ preparation is the professional assembly of all technical, legal, and commercial documents into a unified bid package, followed by formal issuance to shortlisted suppliers with precise submission deadlines and guidelines.',
  why: [
    'A poorly structured RFQ results in fragmented, unformatted quotes that cannot be compared without weeks of tedious back-and-forth.',
    'Protects company confidentiality through enforceable Non-Disclosure Agreements (NDAs).',
    'Ensures suppliers accept standard terms and conditions upfront, preventing unpleasant surprises during contract finalization.'
  ],
  when: [
    'Whenever procuring goods or services above the informal purchasing threshold.',
    'When re-tendering existing expiring contracts for multi-year supply.',
    'When conducting benchmark quotation exercises for major capital equipment.'
  ],
  raci: [
    { role: 'Procurement Specialist', resp: 'Compiles the bid package, issues documents, monitors clarifications, and locks the tender box.' },
    { role: 'Legal Counsel', resp: 'Provides standard Terms & Conditions and review of any non-standard liability clauses.' },
    { role: 'Technical Lead', resp: 'Provides finalized technical schedules, bill of quantities (BOQ), and testing standards.' },
    { role: 'Suppliers', resp: 'Acknowledge receipt, submit formal clarification questions, and lodge bids before the deadline.' }
  ],
  inputs: [
    'Approved Specification / Scope of Work (SOW).',
    'Standard Corporate Purchasing Terms & Conditions.',
    'Structured Pricing Breakdown Schedule (Excel or table format).',
    'Evaluation Criteria and Weighting Matrix.'
  ],
  outputs: [
    'Complete RFQ / Tender Dossier (Instructions, SOW, Terms, Pricing Table).',
    'Tender Issuance Log and Signed Supplier NDAs.',
    'Official Clarification Bulletins and Tender Closing Receipt Register.'
  ],
  controls: [
    'Enforce Non-Disclosure Agreements (NDAs) before releasing proprietary technical drawings or business data.',
    'Strict tender deadline lock: late submissions must be rejected or formally approved only under exceptional verifiable system failure.',
    'Mandatory pricing schedule compliance: suppliers must quote on the provided template to ensure apples-to-apples comparability.'
  ],
  mistakes: [
    'Allowing suppliers to submit lump-sum PDF quotes without providing the mandatory cost breakdown schedule.',
    'Setting unrealistic tender deadlines (e.g. giving suppliers 48 hours to price a complex 50-page civil construction package).',
    'Failing to specify currency, Incoterms, tax treatment, and delivery locations in the RFQ instructions.'
  ],
  bestPractices: [
    'Always provide a structured, unbundled pricing sheet separating unit price, freight, customs, setup fees, and optional items.',
    'Require bidders to explicitly flag any deviations to your standard Terms & Conditions in a dedicated "Contract Compliance Table".',
    'Include a formal "Intent to Bid" deadline 3 days after issuance so you know immediately if any vendor plans to decline.'
  ],
  terms: [
    { term: 'Pricing Schedule', def: 'A standardized table provided by procurement where all bidders must enter itemized pricing to enable direct comparison.' },
    { term: 'Incoterms (International Commercial Terms)', def: 'Standardized three-letter trade terms (e.g. EXW, FOB, DDP) defining who pays freight, insurance, and customs risk.' },
    { term: 'Tender Dossier', def: 'The complete set of formal documents issued to bidders (Instructions, Specification, Contract, Pricing Sheet).' }
  ],
  thinkingPoints: [
    {
      quote: 'Supplier questions during a tender are not complaints; they are diagnostic X-rays of your specification gaps.',
      explanation: 'When 4 suppliers ask the exact same question during the tender clarification period, it means your scope was unclear. The best procurement specialists welcome questions, issue swift clarification bulletins, and use the feedback to sharpen the final contract.',
      realWorldExample: 'A logistics company issued an RFQ for 200 delivery trucks but forgot to specify whether fuel, routine maintenance, and tire replacements were included in the monthly lease. Two suppliers quoted with maintenance included; two quoted without. Procurement caught the ambiguity during Q&A, issued an immediate clarification bulletin, and avoided a $600,000 budget discrepancy.',
      reflectionPrompt: 'Does your standard RFQ package include a mandatory pricing template that prevents suppliers from hiding fees?'
    }
  ],
  sopSteps: [
    {
      title: 'Bid Dossier Assembly & Document QC',
      role: 'Procurement Specialist',
      desc: 'Assemble Instructions to Bidders, Scope of Work, Structured Pricing Sheet, and Master Terms & Conditions.',
      control: 'Verify that delivery dates, Incoterms, currency, and tax obligations are explicitly defined.',
      record: 'Master RFQ Document Package.',
      pitfall: 'Omitting payment terms, leading to suppliers assuming immediate cash-on-delivery.'
    },
    {
      title: 'NDA Execution & Formal Market Release',
      role: 'Procurement Specialist',
      desc: 'Secure signed confidentiality agreements from all shortlisted bidders and transmit the tender package.',
      control: 'Transmit packages simultaneously to all bidders using an official tracked email or procurement portal.',
      record: 'Tender Release Transmission Log.',
      pitfall: 'Releasing confidential proprietary CAD drawings to suppliers before the NDA is countersigned.'
    },
    {
      title: 'Clarification Management & Tender Receipt Log',
      role: 'Procurement Lead',
      desc: 'Collect and answer bidder questions transparently; receive and log formal bids at the closing deadline.',
      control: 'Enforce two-person tender opening protocol for high-value tenders to verify bid integrity.',
      record: 'Tender Closing Register and Safe Storage of Bids.',
      pitfall: 'Opening one supplier\'s bid early and leaking their pricing to an incumbent vendor.'
    }
  ],
  quizzes: [
    {
      type: 'red_flag',
      context: 'You receive three bids for facility maintenance. Supplier A submits a detailed completed spreadsheet. Supplier B submits a completed spreadsheet. Supplier C sends a one-page PDF letter saying: "Total turn-key facility management services for 12 months: $480,000 lump sum. Excludes unforeseen repairs."',
      q: 'Why is Supplier C\'s submission a severe commercial red flag?',
      options: [
        {
          text: 'There is no red flag; lump-sum pricing is always preferred because it guarantees a fixed price.',
          isCorrect: false,
          rationale: 'Lump-sum with vague exclusions is the exact opposite of a fixed price: it gives the supplier a blank check to bill exclusions.'
        },
        {
          text: 'Supplier C failed to use the mandatory pricing schedule, hiding their labor and material rates, and inserted an open-ended exclusion ("unforeseen repairs") that allows endless price gouging.',
          isCorrect: true,
          rationale: 'Correct! By refusing to unbundle their pricing, Supplier C prevents apples-to-apples comparison and reserves the right to charge exorbitant fees for anything they deem "unforeseen".'
        },
        {
          text: 'The price of $480,000 is mathematically too high.',
          isCorrect: false,
          rationale: 'You cannot know if it is high or low without the breakdown compared to Suppliers A and B.'
        }
      ],
      principle: 'Never accept unformatted lump-sum bids with vague exclusion clauses. Insist on standardized, itemized pricing schedules.'
    },
    {
      type: 'scenario',
      context: 'Your RFQ deadline was set for Friday at 17:00. At 17:15, a supplier emails you in a panic saying: "Our internet connection dropped at 16:55. Please find our bid attached. It is only 15 minutes late."',
      q: 'Under standard procurement probity rules, how should you handle this late bid?',
      options: [
        {
          text: 'Accept it without telling anyone because 15 minutes doesn\'t really matter.',
          isCorrect: false,
          rationale: 'Secretly accepting late bids destroys procedural integrity and exposes the award to legal challenges from compliant bidders.'
        },
        {
          text: 'Follow your organization\'s strict procurement policy: reject the late submission to protect tender probity, unless formal policy allows exceptions for verified technical server failures with audit approval.',
          isCorrect: true,
          rationale: 'Correct! Strict deadline enforcement is critical to fairness. If an exception is made, it must be fully documented, permitted by policy, and verified by IT audit trails.'
        },
        {
          text: 'Open the bid, look at the price, and if it is the cheapest, change the timestamp on the email.',
          isCorrect: false,
          rationale: 'Falsifying timestamps is fraudulent conduct and grounds for immediate termination.'
        }
      ],
      principle: 'Procedural integrity and fairness protect the organization from procurement corruption, bid-rigging, and legal liability.'
    }
  ],
  relSop: 'sop-rfq',
  rel: {
    concepts: ['rfi-rfq-rfp', 'evaluation-criteria'],
    sops: ['sop-rfq'],
    checklists: ['cl-rfq-preparation', 'cl-quote-collection'],
    templates: ['tpl-rfq', 'tpl-bid-instructions', 'tpl-supplier-invitation'],
    calcs: ['calc-po-value-check'],
    decisions: ['rfq-or-rfp'],
    kpis: ['kpi-rfq-cycle']
  },
  labMission: {
    title: 'Mission 6: Draft & Customize an RFQ Package',
    desc: 'Use the RFQ Template to build a professional Request for Quotation complete with instructions, specifications, and commercial schedules.',
    tasks: [
      'Open the RFQ Template.',
      'Fill in project scope, required delivery dates, Incoterms, and payment terms.',
      'Export or print the complete professional RFQ dossier ready for market issuance.'
    ],
    ctaLabel: 'Launch RFQ Template',
    ctaHref: '#/tpl/tpl-rfq',
    secondaryLabel: 'Check Tender Checklist',
    secondaryHref: '#/cl/cl-rfq'
  }
});
