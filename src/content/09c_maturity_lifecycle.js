/* ==========================================================
   Maturity model and the consolidated 21-stage lifecycle
   (Section 12, 63)

   PS.MATURITY and PS.LIFECYCLE were declared as empty arrays in
   09a_data_init.js and nothing ever pushed into them. The Maturity page
   therefore rendered zero rating fields and then threw an uncaught
   TypeError on submit, and the Lifecycle page promised "twenty-one
   stages" and rendered none. Both were reachable from the sidebar.

   The lifecycle below is the application's own consolidated model. It
   maps the six phases of the Operations Hub onto the wider pre-contract,
   contract and post-contract sequence, and every stage links to the
   concept, SOP and calculator that govern it.

   The maturity areas follow the dimensions that procurement maturity
   models consistently assess: governance, operating model, demand and
   spend, category strategy, sourcing, supplier relationship management,
   contract management, risk and sustainability, and data with people.
   ========================================================== */
(function () {
  var L = [
    'Ad hoc activity, no documented process',
    'Basic process exists and is partly followed',
    'Documented process, defined roles and records',
    'Process measured, supplier performance managed',
    'Continuous improvement on an evidence base'
  ];

  PS.MATURITY = [
    {
      area: 'Governance, policy and compliance',
      question: 'How firmly are procurement rules written, approved and enforced?',
      labels: L, levels: L,
      focus: 'Publish a one-page procurement policy with named thresholds, a code of conduct, and a documented route for approving exceptions. Nothing else on this list works without it.'
    },
    {
      area: 'Operating model, roles and delegation of authority',
      question: 'Is it clear who decides, who buys, who approves and who cannot do both?',
      labels: L, levels: L,
      focus: 'Write down the separation of duties between requisitioner, buyer, evaluator and approver, and map a delegation of authority to real monetary limits by role.'
    },
    {
      area: 'Demand management, budget control and spend visibility',
      question: 'Do you know what is being bought, by whom, and whether the money exists?',
      labels: L, levels: L,
      focus: 'Establish a baseline of addressable spend by category, and a budget check that happens before a purchase order is raised rather than after it is paid.'
    },
    {
      area: 'Category and strategy management',
      question: 'Is spend treated as a portfolio, or as a stream of unrelated orders?',
      labels: L, levels: L,
      focus: 'Segment spend using the Kraljic matrix, pick the two categories that carry the most risk and the most margin, and write a category strategy for each.'
    },
    {
      area: 'Strategic sourcing and competitive sourcing',
      question: 'How much of your spend genuinely goes to market?',
      labels: L, levels: L,
      focus: 'Measure your competitive bid rate and spend under management. A single source is a legitimate choice only when it has been justified in writing against a market view.'
    },
    {
      area: 'Supplier relationship and performance management',
      question: 'Do you measure supplier performance, or only supplier invoices?',
      labels: L, levels: L,
      focus: 'Agree a small set of measures with each supplier, run a review rhythm, and record the outcomes. A scorecard nobody reviews is a spreadsheet, not a management system.'
    },
    {
      area: 'Contract and commercial management',
      question: 'Is every live obligation tracked, with its owner and its date?',
      labels: L, levels: L,
      focus: 'Build a contract register with value, key dates, obligations and renewal windows. Contracts that are not tracked are not managed, whatever the clause says.'
    },
    {
      area: 'Risk, compliance and sustainability',
      question: 'Are supplier risk and sustainability assessed, and does the answer change what you buy?',
      labels: L, levels: L,
      focus: 'Tier suppliers by criticality, and apply proportionate due diligence. Then make sure the tier actually drives the depth of review you apply.'
    },
    {
      area: 'Data, analytics, systems and people capability',
      question: 'Do you have the information and the skills to make the decisions the process demands?',
      labels: L, levels: L,
      focus: 'Clean the spend data first, then build capability. Buying an analytics tool on top of unreliable data produces confident answers to the wrong question.'
    }
  ];

  PS.LIFECYCLE = [
    { name: 'Requirement identification', summary: 'A business need is recognised, named and given an owner before anyone looks for a supplier.', kb: 'c-procurement-lifecycle', sop: 'sop-procurement-intake', calc: 'calc-po-value-check' },
    { name: 'Requirement definition and specification', summary: 'The need is written down as a specification: what, how many, to what standard, by when, and what it must not be.', kb: 'specification', sop: 'sop-procurement-intake' },
    { name: 'Business case and budget validation', summary: 'The requirement is costed, funded and confirmed against a real budget line before sourcing effort is spent.', kb: 'spend-analysis', calc: 'calc-budget-vs-actual' },
    { name: 'Make-or-buy and sourcing strategy', summary: 'The decision is made to buy competitively, to buy from a single source with justification, or to make in-house.', kb: 'sourcing-strategy', calc: 'calc-make-vs-buy' },
    { name: 'Market analysis and supplier identification', summary: 'The market is mapped: how many credible suppliers exist, how concentrated it is, and where the leverage sits.', kb: 'supplier-market-analysis', sop: 'sop-procurement-intake' },
    { name: 'Supplier prequalification and due diligence', summary: 'Candidate suppliers are screened for financial health, capability, regulatory standing and sanctions exposure before they are invited.', kb: 'supplier-qualification', sop: 'sop-supplier-evaluation' },
    { name: 'Sourcing method selection', summary: 'RFI, RFQ or RFP is chosen deliberately, based on how much the commercial answer needs to compete and how complex the requirement is.', kb: 'rfi-rfq-rfp', sop: 'sop-rfq' },
    { name: 'Evaluation criteria and weightings design', summary: 'The criteria and their weights are fixed and published before bids arrive, so the decision is made against a standard rather than an impression.', kb: 'evaluation-criteria', sop: 'sop-rfq' },
    { name: 'Solicitation release', summary: 'Identical packages go to all shortlisted suppliers at the same time, with submission deadlines, clarifications route and commercial schedules.', sop: 'sop-rfq' },
    { name: 'Supplier clarification and response management', summary: 'Every supplier question is logged, answered in writing and distributed to all bidders equally. The deadline holds.', kb: 'evaluation-criteria' },
    { name: 'Bid normalization', summary: 'Responses are put on one comparable basis: same currency, same freight terms, same scope, same price structure.', cl: 'cl-quote-comparison', calc: 'calc-compare-quotes' },
    { name: 'Technical evaluation', summary: 'Technical merit is scored first and without sight of the price, so the commercial answer is not anchored by the technical one.', kb: 'evaluation-criteria' },
    { name: 'Commercial evaluation and total cost of ownership', summary: 'Price is assessed on landed and total cost of ownership, not on the headline unit price, and against the pre-published criteria.', kb: 'total-cost-of-ownership', calc: 'calc-tco' },
    { name: 'Supplier selection and award recommendation', summary: 'The scored outcome is turned into a written award recommendation naming the supplier, the price, the reasons and the risks accepted.', kb: 'c-supplier-management', calc: 'calc-compare-quotes' },
    { name: 'Negotiation preparation and strategy', summary: 'Before any conversation: the walk-away point, the reservation price, the concession matrix and the mandate are agreed and written down.', kb: 'negotiation-planning', sop: 'sop-negotiation-preparation' },
    { name: 'Negotiation execution and closure', summary: 'Trades are priced and logged as they are given and taken, and the session closes with a written summary both sides have seen.', kb: 'batna', sop: 'sop-negotiation-preparation' },
    { name: 'Contract structuring, review and approval', summary: 'Terms are drafted against a template, reviewed by legal and finance against a convergence checklist, and approved within authority.', kb: 'contract-structure', sop: 'sop-contract-review' },
    { name: 'Contract execution and supplier onboarding', summary: 'The signed contract is issued, the supplier is onboarded with the real specification and delivery expectations, and both are recorded.', kb: 'c-supplier-management', sop: 'sop-contract-review' },
    { name: 'Order release, delivery and receipt', summary: 'Orders are raised against the contract, deliveries are tracked against the promised date, and what actually arrived is recorded against what was ordered.', kb: 'c-three-way-match', calc: 'calc-po-value-check' },
    { name: 'Performance management and value assurance', summary: 'Delivery, quality, cost and service are measured and reviewed. Realized savings are validated against an agreed baseline.', kb: 'supplier-performance', sop: 'sop-supplier-performance-management' },
    { name: 'Renewal, re-sourcing and closeout', summary: 'The renewal decision is taken with evidence, obligations are closed out, records are retained, and lessons are fed back into the category strategy.', kb: 'c-procurement-lifecycle', sop: 'sop-contract-renewal' }
  ];
}());
