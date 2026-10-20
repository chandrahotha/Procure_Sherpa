/* ==========================================================
   Procure Sherpa Academy - Module 9 and Module 10
   Services, Software and Indirect Procurement
   Risk, Compliance, Ethics and Sustainability

   The original nineteen functions covered the mainstream procurement
   lifecycle well: spend, category management, requirements, sourcing,
   cost engineering, supplier evaluation and risk, negotiation,
   contracting, P2P execution, SRM and savings.

   They did not cover six areas that a procurement professional meets in
   the first year of the job, or that a senior one is judged on:

     - indirect, MRO and facilities spend, which is where most
       organizations carry their largest count of transactions and their
       largest unmanaged tail;
     - software and SaaS, where the unit of purchase is a right to use
       something rather than a thing you own, and where the commercial
       traps (true-ups, auto-renewal, audit exposure) are specific and
       well understood;
     - professional services, where you buy hours and judgement and the
       scope has a habit of growing after the price is fixed;
     - sustainability, which is now a governed requirement in most
       large organizations rather than a preference;
     - ethics and third-party due diligence, which is a legal exposure
       in its own right;
     - supplier resilience, which is a board-level question about
       tier-n exposure and single points of failure.

   These six functions are written to the same schema as the original
   nineteen: what it is, why it matters, when it applies, who does what,
   what goes in, what comes out, the controls, the mistakes, the good
   practice, the vocabulary, a thinking point, a five-step digital SOP,
   and two graded questions with rationales.

   References used and named in the content: ISO 20400:2017 Sustainable
   procurement - Guidance (confirmed 2023, references ISO 26000,
   contributes to SDG 12 and 13); the CIPS Procurement and Supply Cycle;
   the OECD Guidelines for Multinational Enterprises on Responsible
   Business Conduct; the UN Global Compact; the GHG Protocol Scope 3
   standard; the UK Bribery Act 2010 section 7 and the US Foreign
   Corrupt Practices Act; and the CSDDD and CSRD supply-chain
   due-diligence regimes in the European Union.
   ========================================================== */
PS.ACADEMY_FUNCTIONS = PS.ACADEMY_FUNCTIONS || [];

/* ---------- Module 9: Services, Software and Indirect ---------- */

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-indirect-sourcing',
  title: 'Indirect, MRO and Facilities Procurement',
  module: 'Module 9: Services, Software and Indirect Procurement',
  kicker: 'Function 9.1',
  tagline: 'The spend that is numerous, small, dispersed, and quietly where the money leaks.',
  desc: 'Managing indirect and MRO spend through catalogue discipline, demand consolidation, and a designed tail rather than by accident.',
  duration: '15 mins',
  lifecycleStage: 'Stage 1: Business Need Identification',
  lifecycleDesc: 'Indirect spend usually enters the organization as a purchase, not as a project, so the intervention point is different.',

  what: 'Indirect procurement is everything the business buys to run itself rather than to make its product: maintenance, repair and operations supplies, facilities, cleaning, catering, travel, temporary labour, office supplies, print, marketing, and professional services. MRO is the largest and most operationally sensitive slice of it. The defining feature is not cost per unit but the shape of the demand: thousands of small, frequent, low-value transactions bought by people who are not procurement specialists and who usually buy without thinking about it at all.',
  why: [
    'Indirect spend is typically a large share of total addressable spend and is usually the least visible part of it, because it is bought through a purchasing card, a petty cash float, or a standing order that nobody reconciles.',
    'The cost is not primarily the price paid. It is the transaction: every card swipe or one-off purchase carries a processing cost, a duplicate-payment risk, a compliance exposure and an unreconciled balance that a later audit will find.',
    'Consolidation in this category is usually worth more than negotiation. Combining twenty facilities suppliers into three, with a national agreement, takes out more cost than a five percent discount ever would.',
    'It is the part of spend most likely to bypass procurement entirely, which makes it the first place to look for maverick spend and the last place anyone looks.'
  ],
  when: [
    'When a category review shows a high transaction count and a low average value, which is the signature of an unmanaged indirect category.',
    'When purchasing card or petty cash spend is growing faster than headcount or floor space.',
    'When facilities, maintenance or service contracts are renewed on a rolling basis without anyone confirming the service level or the price against the market.',
    'When a new site, office or facility opens, because the supply model has to be designed before the first invoice arrives.'
  ],
  raci: [
    { role: 'Facilities or Site Manager', resp: 'Responsible for the service specification, the local requirements, the quality of what is delivered and the safety of the site.' },
    { role: 'Category Manager (Indirect)', resp: 'Accountable for the category strategy, the supplier panel, the demand aggregation and the reported spend coverage.' },
    { role: 'Procurement Specialist', resp: 'Responsible for running the sourcing events, the contract terms and the catalogue build.' },
    { role: 'Finance / Controller', resp: 'Consulted on the treatment of committed spend, accruals and the reconciliation of card activity.' },
    { role: 'Business Unit Requester', resp: 'Responsible for raising the need through the agreed channel rather than buying directly, and for flagging known demand.' }
  ],
  inputs: [
    'Twelve months of actual spend by category, supplier, site and cost centre, including card and petty cash transactions.',
    'A list of all live contracts with their values, end dates, notice periods and renewal mechanics.',
    'The site and floor-space inventory: how many locations, what is served, and where demand actually comes from.',
    'Demand patterns by season and by site, for categories where usage is predictable enough to plan against.',
    'Existing supplier panel performance, including service failures, response times and invoice disputes.'
  ],
  outputs: [
    'An indirect category strategy per family, with a demand model and a sourcing route for each.',
    'A national agreement structure with tiered pricing by site, band or volume.',
    'A designed catalogue or preferred-supplier list, mapped to real requisition types.',
    'A documented exception route, so genuine off-contract needs have somewhere legitimate to go.',
    'A reconciliation process so that card, petty cash and contract spend end up in one reported number.'
  ],
  controls: [
    'No purchasing card transaction above a stated limit without a documented exception, and no card split into two to stay under it.',
    'Every live contract has a named owner, an end date and a notice date diarised at least 90 days ahead.',
    'Facilities and MRO suppliers are assessed for the same financial and insurance standing as any other supplier, despite low transaction value.',
    'Competition is required for a panel award even when individual orders are small; the competition is for the supply model, not the unit price.',
    'Requisition data is captured at the point of order so demand aggregation is possible, rather than reconstructed at year end.'
  ],
  mistakes: [
    'Treating indirect spend as too small to matter, and then discovering it is 30 percent of addressable spend spread over 800 suppliers.',
    'Buying a directory of suppliers rather than a supply model, and then discovering the directory has no prices, no service levels and no demand behind it.',
    'Renegotiating prices with an existing supplier while the underlying demand pattern, and therefore the real leverage, has never been analysed.',
    'Letting the requisitioner believe that raising a purchase is an obstacle to their work, and then dealing with the maverick spend that results.',
    'Consolidating suppliers without checking service coverage, and discovering the lowest bidder does not service two of the eleven sites.'
  ],
  bestPractices: [
    'Segment the category by transaction value and frequency first, and spend the sourcing effort on the segment that consumes the most attention, not the one with the highest unit price.',
    'Design the tail before the head. A category with four hundred low-value suppliers needs a different intervention from one with four.',
    'Build one national agreement with tiered pricing rather than many site-level contracts, so that aggregation is a procurement decision rather than a negotiation.',
    'Reconcile card spend monthly into the category view, because spend you cannot see is spend you cannot manage.',
    'Diarise every notice date centrally, at the time the contract is signed, not when the renewal email arrives.'
  ],
  terms: [
    { term: 'MRO (Maintenance, Repair and Operations)', def: 'The supplies and services consumed keeping physical assets and facilities running: spares, consumables, tooling, lubricants, plant hire, cleaning and grounds.' },
    { term: 'Purchasing Card (P-Card)', def: 'A company card used for low-value purchases within a delegated limit, intended to reduce administrative cost while keeping spend visible and reconciled.' },
    { term: 'Demand Aggregation', def: 'Combining the buying requirement of many sites, business units or periods into one order so that volume is real and the supply model can be designed around it.' },
    { term: 'Tapered Rate Card', def: 'A pricing structure in which unit price falls at defined volume bands, used to reward the supplier with consolidated demand and to make aggregation worth the buyer\'s effort.' },
    { term: 'Managed Tail', def: 'Deliberate policy for low-value, high-frequency purchases, normally met by a catalogue or a card scheme with defined limits rather than by a sourcing event.' }
  ],
  thinkingPoints: [
    {
      quote: 'In indirect categories the negotiation is usually not with the supplier about price. It is with your own business about demand.',
      explanation: 'A facilities estate spread across eleven sites, each buying its own cleaning and its own maintenance consumables, has no aggregate volume to negotiate with and eleven sets of terms to administer. The available cost reduction comes from designing one supply model and one agreement that sites actually use, which is a change to how the business buys, not a renegotiation with the incumbent.',
      realWorldExample: 'A manufacturer found that 38 percent of its addressable spend sat in MRO and facilities, bought from 240 suppliers, with 82 percent of the transaction value arriving as card transactions under 500. Procurement built one national MRO agreement with five delivery points and a tapered rate card, took card spend to 4 percent, and reduced the supplier panel to 26. The reported saving was 7 percent on unit price; the larger effect was on administration and on spend that had never been visible to management at all.',
      reflectionPrompt: 'Look at your organization\'s card and petty cash spend. What share of it would be invisible to a category manager, and what would you have to consolidate before you could even go to a supplier with a proposition?'
    }
  ],
  sopSteps: [
    {
      title: 'Baseline the Category and Segment the Demand',
      role: 'Category Manager (Indirect)',
      desc: 'Pull twelve months of spend across contracts, card and petty cash, and split it by category, supplier, site, value band and transaction count.',
      control: 'Reconcile the card and petty cash figures into the category view before any conclusion is drawn from the contract data alone.',
      record: 'Indirect category spend baseline with a visible tail and a named set of unknown spend.',
      pitfall: 'Analysing contract spend only, and drawing conclusions about a category in which most of the spend never passed through a contract.'
    },
    {
      title: 'Design the Supply Model Before Approaching the Market',
      role: 'Category Manager (Indirect)',
      desc: 'Decide the sourcing route for each segment: national agreement, framework with call-off, catalogue, or card scheme with limits, and specify the service levels and the demand profile.',
      control: 'Confirm that the design will cover the sites and services in scope, and that the service levels can actually be measured and enforced.',
      record: 'Approved supply model and sourcing route for each segment.',
      pitfall: 'Choosing the model by habit because that is what the last category did.'
    },
    {
      title: 'Run the Sourcing Event and Build the Panel',
      role: 'Procurement Specialist',
      desc: 'Test the market, run a competitive event against the designed requirement, evaluate on service capability as well as price, and award a panel with defined capacity and coverage.',
      control: 'Evaluate service coverage site by site, not just aggregate price, and record the coverage map that comes with the award.',
      record: 'Award recommendation with the panel, the pricing structure and the site coverage map.',
      pitfall: 'Awarding to the lowest aggregate price without checking that they will serve the smaller sites.'
    },
    {
      title: 'Publish the Catalogue and Route the Exceptions',
      role: 'Category Manager (Indirect)',
      desc: 'Make the agreed route the easiest thing to use, map it to real requisition types, and set a defined, documented exception route for genuine off-contract needs.',
      control: 'Measure catalogue uptake by value and by transaction count from the first month, and treat low uptake as a design problem before treating it as a behaviour problem.',
      record: 'Published catalogue with exception form, reporting line and response time.',
      pitfall: 'Issuing a catalogue and then calling the users non-compliant when they never used it.'
    },
    {
      title: 'Review, Reconcile and Re-Source',
      role: 'Category Manager (Indirect)',
      desc: 'Run a service and price review against the agreement, reconcile all spend to the category view, and take the re-sourcing decision on evidence at the review point rather than at the notice deadline.',
      control: 'Confirm that renewal decisions are taken at least 90 days before the notice date, and that the exit cost of leaving has been calculated.',
      record: 'Category review pack with spend reconciliation, performance evidence and the renewal or re-source decision.',
      pitfall: 'Allowing auto-renewal to take the decision by default because nobody diarised the notice date.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'You have taken over indirect procurement for a company with 300 offices and 14 factories. Card spend is 22 percent of addressable spend and is spread across 1,900 suppliers. Facilities managers tell you that any central agreement takes too long for their local needs, and your director wants a 5 percent reduction next financial year. What is the right first move?',
      q: 'What should you do first?',
      options: [
        {
          text: 'Run a competitive tender across all card spend immediately, to get the 5 percent under contract before the budget is set.',
          isCorrect: false,
          rationale: 'A tender over 1,900 fragmented low-value suppliers is not a sourcing event, it is a catalogue project wearing a tender\'s clothes. It will take a year, cost more in administration than it saves, and the card spend will continue to the old suppliers meanwhile because the business cannot wait.'
        },
        {
          text: 'Segment the spend by value band, transaction count and site, design a different supply route for each segment, and make the agreed route the easiest thing for a site manager to use.',
          isCorrect: true,
          rationale: 'This is the only route that addresses the actual shape of the problem. The 22 percent is not one problem: the high-value, low-frequency spend needs a sourcing event, the high-frequency low-value spend needs a catalogue or a card scheme with limits and demand aggregation, and the sites with genuinely local needs need a documented exception route. Designing each segment separately also means the 5 percent target comes from consolidation and reduced administration as well as from price.'
        },
        {
          text: 'Agree with facilities that a central agreement is impractical and leave each site to source locally, then report the card spend as a business-unit cost.',
          isCorrect: false,
          rationale: 'This accepts the maverick spend and makes it a reporting line rather than a managed one. The 22 percent was not visible because nobody owned it, and handing it back to the sites will not make it visible; it will make it unaccountable.'
        },
        {
          text: 'Reduce the card limit to 100 and require pre-approval above that, so that spend at least passes through a control point.',
          isCorrect: false,
          rationale: 'A tighter limit without a designed alternative simply moves the spend somewhere else, usually back to the supplier relationship or the expense claim, and the administrative load lands on the sites you were trying to help. Control is not the objective; a supply model that people use is.'
        }
      ],
      principle: 'In indirect categories the leverage is usually in the demand design, not in the price negotiation. Segment first, then choose the route per segment.'
    },
    {
      type: 'mcq',
      q: 'Which measure is the most useful early indicator that an indirect supply model is working?',
      options: [
        {
          text: 'The average discount achieved against the previous supplier rate.',
          isCorrect: false,
          rationale: 'An average discount conceals the two things that matter: whether the agreed route is being used at all, and whether the price was ever the binding constraint. A 6 percent average on 20 percent of the spend is worse than a 12 percent saving on 70 percent of it.'
        },
        {
          text: 'The percentage of category spend transacted through the agreed route, measured by value and by transaction count.',
          isCorrect: true,
          rationale: 'Uptake is the leading indicator. If the agreed route is not being used, no price benefit is being realized, and the reason is almost always a design fault: the terms, the lead time, the minimum order or the product range do not fit what the business actually needs.'
        },
        {
          text: 'The number of suppliers on the approved panel.',
          isCorrect: false,
          rationale: 'A smaller panel is not automatically better. Two suppliers who cannot both cover every site is worse than twelve who can, and panel size is only a proxy for the thing that matters, which is supply coverage.'
        },
        {
          text: 'The percentage of supplier invoices paid within terms.',
          isCorrect: false,
          rationale: 'Payment performance measures the finance function and the supplier relationship, not the supply model. It is worth tracking, but it will not tell you whether the indirect category is under control.'
        }
      ],
      principle: 'Uptake of the agreed route comes before price. Design the route the business will actually use, then optimise what sits behind it.'
    },
    {
      "type": "scenario",
      "context": "A facilities manager has been buying his own cleaning supplies from a local supplier on a card, and says it takes too long to raise a purchase order for a box of gloves. Procurement wants to put everything on contract. What is the right approach?",
      "q": "What should procurement do?",
      "options": [
        {
          "text": "Put all of it on contract, because the tail is uncontrolled and every saving has to be captured.",
          "isCorrect": false,
          "rationale": "Contracting the tail of a category that works today destroys the reason it works. A requester who can get gloves in an hour does not want a purchase order, and forcing him onto a thirty-day process for consumables produces workarounds, not compliance. The savings from consolidating a few hundred pounds of cleaning supplies will not pay for the friction, and the requester will route around it."
        },
        {
          "text": "Consolidate the categories that carry real value into an agreement, keep a card or catalogue for the genuine tail, and remove the friction from both routes.",
          "isCorrect": true,
          "rationale": "This is the segmentation logic applied honestly. The value is in the categories where spend is concentrated, the specifications are standard and the volume is real, and those belong in an agreement with a rate card and a delivery point. The tail needs a fast, low-friction route with a limit and a monthly reconciliation, because the cost of administering a small purchase must be less than the value of controlling it. The friction argument from the requester is legitimate data about the design, not an excuse."
        },
        {
          "text": "Raise a low-value purchase order form so everything is visible and consistent, accepting a longer lead time for gloves.",
          "isCorrect": false,
          "rationale": "A purchase order for a box of gloves is a control that costs more than it controls. The transaction value is trivial, the risk is negligible, and the administrative cost of the approval and the three-way match is a real cost against a trivial benefit. What is needed is a route that is fast and reconciled, not a slow route applied uniformly. Consistency is not a good enough argument to make the process worse for everyone."
        },
        {
          "text": "Let the facilities manager keep his supplier but require him to reconcile his card spend monthly, so the category is visible without changing how he buys.",
          "isCorrect": false,
          "rationale": "Visibility without control is the outcome this project is trying to leave. Monthly reconciliation tells you what happened and changes nothing about it, and it formalises a pattern the buyer has already chosen rather than one the organisation has decided. It is a reasonable interim step while a proper route is designed, but it is not the destination, and it leaves the requester with a purchasing card that is effectively a personal account with a reporting requirement."
        }
      ],
      "principle": "The tail needs a fast, reconciled route, not a slow contract. Friction is design data, not an excuse."
    },
    {
      "type": "mcq",
      "q": "A national agreement with tiered pricing by site is most valuable because it:",
      "options": [
        {
          "text": "Guarantees the lowest price, because the supplier commits to the tier regardless of volume.",
          "isCorrect": false,
          "rationale": "A rate card is a price for a volume, and the price is what the supplier charges for that volume. It does not guarantee the lowest price and it does not remove the need to aggregate: the price only reaches the better tier if the volume actually arrives at that tier, which is the buyer's job. The supplier commits to the price, not to the outcome."
        },
        {
          "text": "Makes demand aggregation commercially rational for the buyer, because the supplier rewards it with a better tier.",
          "isCorrect": true,
          "rationale": "That is the mechanism. Without a tiered structure, a site buying on its own gets a worse price than the group does, and every site is then incentivised to protect its own supplier. A rate card that pays for aggregation gives the requester a reason to bring volume to the network, and it gives the buyer a concrete mechanism to aggregate rather than an instruction. This is why a rate card is more valuable than a discount off a list price."
        },
        {
          "text": "Removes the need to keep checking the supplier's performance, because the agreement fixes the price.",
          "isCorrect": false,
          "rationale": "A fixed price removes the price negotiation, not the performance problem. If a supplier misses the service level across a hundred sites, the response is not a lower rate card, it is service credits, escalation and a different supplier. The agreement fixes what is paid, and the performance management fixes whether the supply is worth paying for, and they are separate problems."
        },
        {
          "text": "Locks the price for the whole term, so the category is not exposed to inflation.",
          "isCorrect": false,
          "rationale": "A rate card for a defined volume locks the price for that volume, and it usually has an annual uplift and an index or cap mechanism. For a short or a fixed-price agreement, a firm price is possible, but it transfers the input-cost risk to the supplier, who will price it. If cost certainty is the objective, say so in the requirement and design the commercial model around it, rather than assuming a rate card gives it."
        }
      ],
      "principle": "A tiered rate card is an incentive to aggregate. It rewards the buyer for the demand they actually bring together."
    }
 ],
  relSop: 'sop-procurement-intake',
  rel: {
    concepts: ['category-management', 'demand-management', 'direct-indirect-spend'],
    sops: ['sop-procurement-intake'],
    checklists: ['cl-procurement-file-completeness'],
    templates: ['tpl-single-source'],
    calcs: ['calc-supplier-concentration'],
    decisions: ['sourcing-method'],
    kpis: ['kpi-sum', 'kpi-maverick-spend']
  },
  labMission: {
    title: 'Mission 9.1: Segment an Indirect Category and Design Its Supply Routes',
    desc: 'Take a realistic indirect category, split it by value band and transaction count, and design a different sourcing route for each segment before you go near a supplier.',
    tasks: [
      'Open the Spend Data Model and build a category hierarchy that separates a high-frequency low-value segment from a high-value low-frequency one.',
      'For each segment, write down the supply route you would use and why: national agreement, framework, catalogue, or card scheme with a limit.',
      'Use the Pareto chart to identify the segment consuming the most attention, and state the intervention you would make there first.',
      'Use the Kraljic matrix to set the commercial posture for each segment, and check whether a non-critical, low-risk segment is being given strategic effort it does not need.'
    ],
    ctaLabel: 'Open the Spend Data Model',
    ctaHref: '#/spend-model',
    secondaryLabel: 'Review the MRO checklist',
    secondaryHref: '#/cl/cl-procurement-file-completeness'
  },
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-software-licensing',
  title: 'Software, SaaS and Technology Licensing',
  module: 'Module 9: Services, Software and Indirect Procurement',
  kicker: 'Function 9.2',
  tagline: 'Buying a right to use, not a thing you own. The commercial traps are specific and they are expensive.',
  desc: 'Sourcing software and SaaS with attention to metric definitions, true-ups, audit exposure, renewal uplift and data rights.',
  duration: '15 mins',
  lifecycleStage: 'Stage 8: Contract Structuring',
  lifecycleDesc: 'Software contracts are decided in the commercial terms, not in the technical evaluation, and the differences are rarely noticed until renewal.',

  what: 'Software and SaaS procurement is the sourcing of the right to use software, a platform, a service or a hosted capability, usually over a term measured in years rather than months. The unit of purchase is a metric: a named user, an active user, a core, a CPU-minute, a transaction, a gigabyte, a project, a seat tier. Almost every commercial problem in this category follows from one fact: the buyer and the supplier must agree what the metric means, and the buyer must be able to measure it, before the price is comparable at all. Renewal mechanics, audit rights and true-up obligations are where the money actually moves.',
  why: [
    'The metric definition is the price. "50 users" and "50 named users who logged in in the last 30 days" are different products at different prices, and the gap is usually discovered after the contract is signed.',
    'Subscription renewals are a compounding exposure. A three-year term with a 7 percent annual uplift cap is a 22 percent increase; the same contract with 10 percent uncapped and auto-renewal is 33 percent plus a negotiation that starts under time pressure.',
    'Audit rights are a real, exercisable right. Vendors audit for over-deployment, and the finding is a retroactive charge. A buyer who cannot produce a deployment record at audit time has no defence.',
    'Unused licences are the largest single source of recoverable software spend in most organizations, and they are invisible until someone matches entitlements against actual use.'
  ],
  when: [
    'When a new platform is being selected and the commercial model will be decided in the evaluation, not afterwards.',
    'When a renewal notice arrives inside the auto-renewal window, which for many vendors is 30 to 90 days.',
    'When a true-up obligation falls due, which is usually at contract anniversary and is frequently calculated on the vendor\'s own numbers.',
    'When an enterprise agreement is consolidating several subsidiary or team licences, which is where the unused-licence saving is usually found.',
    'When a data-processing clause is being agreed, because data rights outlive the subscription.'
  ],
  raci: [
    { role: 'IT / Technology Service Owner', resp: 'Responsible for the functional requirement, the integration approach, the deployment model and the actual usage record.' },
    { role: 'Procurement Specialist', resp: 'Accountable for the commercial terms: metric definition, unit price, uplift cap, true-up, audit notice, termination for convenience and renewal mechanics.' },
    { role: 'Finance / Controller', resp: 'Responsible for the accounting treatment of the licence commitment, the accrual and the capital or operating split, and for owning the entitlement record.' },
    { role: 'Legal Counsel', resp: 'Consulted on data processing, liability for data breach, intellectual property indemnity, audit clause and exit assistance obligations.' },
    { role: 'Security or Privacy Officer', resp: 'Consulted on data residency, sub-processor terms, security attestations and the right to verify them.' }
  ],
  inputs: [
    'A current inventory of every software entitlement held, by entity, by business unit, with contract end date and true-up date.',
    'Actual usage data per entitlement, over at least three months, so that the active-to-named ratio is known before it is bought.',
    'The functional requirement, the integration requirements, the data classification and the deployment timeline.',
    'The benchmark: what the requirement costs at a comparable vendor on a comparable metric, and what it costs on the incumbent metric.',
    'The business case, including the cost of the alternatives and the cost of switching at the point the decision is taken.'
  ],
  outputs: [
    'A written metric definition, with the counting rules, the measurement window and the reporting method agreed in writing.',
    'A costed comparison on a like-for-like metric basis, with the incumbent converted to the same metric before it is compared.',
    'An entitlement register, reconciled to actual usage, with a named owner and a renewal and true-up date.',
    'A contract position on uplift cap, auto-renewal notice, true-up calculation, audit notice period, data rights and exit assistance.',
    'A documented sourcing and renewal decision, with the alternatives and the reasons recorded.'
  ],
  controls: [
    'No software commitment is signed without a written metric definition and a named method of counting.',
    'Renewal notice dates, true-up dates and uplift caps are diarised centrally at signature, and reviewed at least 120 days before any notice window opens.',
    'Entitlements are reconciled to actual use at least annually, and the result is acted on rather than filed.',
    'Auto-renewal clauses are rejected or capped wherever the commercial position allows, and where they are accepted, the notice date is diarised with an escalation.',
    'Audit rights are reciprocal: the right to verify the vendor\'s claims is matched by the buyer\'s obligation to maintain a deployment record.'
  ],
  mistakes: [
    'Comparing a vendor\'s per-user price with the incumbent\'s per-seat price without converting the metric, and concluding that one is cheaper when neither figure means the same thing.',
    'Accepting a per-user price and then discovering that the vendor counts a user as anyone who receives a copy, including people who never log in.',
    'Accepting uncapped renewal uplift because the initial price was good, and finding the second-year price in a system that shows no comparison.',
    'Treating a true-up as a formality and letting the vendor calculate the shortfall on its own numbers, without independently reconciling the deployment.',
    'Treating data processing as a legal-review formality rather than a commercial term with a price and a duration attached to it.'
  ],
  bestPractices: [
    'Convert every quote to a common metric before you compare anything, and state the conversion in the evaluation document.',
    'Buy the active user, not the named user, and reconcile entitlements to usage at least twice a year.',
    'Cap renewal uplift, fix the notice window in the contract, and diarise it centrally the day the contract is signed.',
    'Use an enterprise agreement with volume bands and a genuine right to downsize at renewal, and treat the right to grow as the price of the right to shrink.',
    'Treat the exit plan as part of the commercial negotiation: data export format, timeline, cost and assistance are worth more if agreed before you need them.'
  ],
  terms: [
    { term: 'Named User vs Active User', def: 'A named user is any individual assigned a licence whether or not they use it. An active user is one who meets a stated activity threshold in a stated measurement window. The distinction is usually worth 15 to 40 percent of the licence line.' },
    { term: 'True-Up', def: 'A contractual reconciliation at a set date between entitlements purchased and entitlements actually deployed, which the buyer pays for whether or not they used them. The measurement method and the reporting obligation should be yours, not the vendor\'s.' },
    { term: 'Uplift Cap', def: 'A contractual limit on the percentage increase applied to a price at renewal. A cap converts a vendor\'s unilateral pricing power into a bounded and negotiable number.' },
    { term: 'Audit Right', def: 'A contractual right for one party to verify that the other\'s deployment matches the entitlements paid for. In software it is normally exercisable by the vendor, and the buyer\'s obligation to produce a deployment record is the price of it.' },
    { term: 'Auto-Renewal', def: 'A clause under which a contract renews automatically unless notice is given inside a short window. The renewal notice period is the single most important date in a software contract, because it is the only date on which the price is still negotiable.' },
    { term: 'Right-Sizing', def: 'Reducing purchased entitlements to match actual use. It is the largest recoverable software cost in most estates and it recurs every year unless the metric is fixed.' }
  ],
  thinkingPoints: [
    {
      quote: 'In software, the number on the invoice is an output of the metric. If the metric is wrong, every downstream number is wrong too, and none of them are comparable.',
      explanation: 'Two vendors quoting the same requirement will differ by a factor of two or three, and neither is being dishonest. One counts anyone with a licence. The other counts anyone who used the product in the last month. The comparison that matters is not which quote is lower; it is what each quote is actually a price of, and whether your own entitlement record is good enough to defend the number you are being billed.',
      realWorldExample: 'A mid-sized insurer ran a licence audit and found 34 percent of its named seats had not been used in six months, that its true-up was calculated on the vendor\'s deployment report alone, and that its renewal notice period was 30 days inside a 5 percent uplift clause. The commercial fix was unglamorous: a written active-user definition, a 3 percent uplift cap, a 120-day notice window, and a reconciliation of entitlements before the true-up date. The recovered number was 480,000 a year, and the same three clauses were applied across the remaining portfolio.',
      reflectionPrompt: 'For one software contract you own, can you state today what the metric means, what the true-up date is, when the notice window opens, and what percentage of your paid-for seats were used last month? If you cannot answer all four, that contract is the place to start.'
    }
  ],
  sopSteps: [
    {
      title: 'Define the Requirement, the Metric and the Counting Rules',
      role: 'IT / Technology Service Owner',
      desc: 'Write the functional requirement, then state the metric the organisation actually needs, the counting rules, the measurement window and who produces the data.',
      control: 'Confirm the metric is measurable from systems you already run, and that it can be independently verified rather than reported by the vendor.',
      record: 'Requirement and metric definition document, with the counting rules attached.',
      pitfall: 'Accepting the vendor\'s metric definition because it was in the quote, and discovering at renewal that the population it counts is much larger than the population you meant.'
    },
    {
      title: 'Baseline the Current Estate and Reconcile Entitlements',
      role: 'Finance / Controller',
      desc: 'Inventory every entitlement, reconcile it to actual use over at least three months, and identify the unused, the duplicated and the over-provisioned.',
      control: 'Do not begin a sourcing event before the current position is known, because the incumbent is the benchmark and a wrong benchmark produces a wrong business case.',
      record: 'Entitlement register with the active-to-named ratio and the recoverable amount identified.',
      pitfall: 'Sourcing a replacement while the incumbent footprint is still unknown, and losing the right-sizing saving in the transition.'
    },
    {
      title: 'Run the Evaluation on a Like-for-Like Metric',
      role: 'Procurement Specialist',
      desc: 'Convert every quote to the organisation metric, state the conversion in the evaluation document, and score the responses against the published criteria.',
      control: 'Require the vendor to confirm the metric in writing, and score commercial and technical merit separately before combining them.',
      record: 'Evaluation matrix on a common metric basis, with the conversion shown for every quote.',
      pitfall: 'Comparing headline unit prices that count different populations and calling the lower one the better deal.'
    },
    {
      title: 'Negotiate the Commercial Architecture',
      role: 'Procurement Specialist',
      desc: 'Settle the metric, the unit price, the volume bands, the uplift cap, the notice window, the true-up method, the audit notice period, the data terms and the exit plan.',
      control: 'Ensure the true-up reconciliation is performed on the buyer\'s own deployment record, with the right to require the vendor\'s underlying data on request.',
      record: 'Executed contract with the commercial schedule and the renewal date diarised centrally.',
      pitfall: 'Leaving the true-up method and the audit notice period to the vendor\'s standard paper because the rest of the deal was going well.'
    },
    {
      title: 'Reconcile, Right-Size and Govern the Renewal',
      role: 'Finance / Controller',
      desc: 'Run the periodic entitlement-to-usage reconciliation, act on the findings, and take the renewal decision at least 120 days before the notice window opens.',
      control: 'No renewal may pass without a recorded decision, a price comparison against the market and a named approver.',
      record: 'Annual entitlement reconciliation, renewal decision record and updated register.',
      pitfall: 'Letting the notice window decide the outcome because the reconciliation was not done in time.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'Your group has 400 named seats for a design suite costing 480,000 a year. The renewal notice period is 30 days and falls in six weeks. The vendor has offered 3 percent uplift a year. Your usage data shows 38 percent of seats unused for six months. The contract contains a true-up that reconciles on the vendor\'s deployment report. What is your sequence of action?',
      q: 'What should you do, in order?',
      options: [
        {
          text: 'Accept the renewal immediately to avoid losing the licence, and reconcile the entitlements afterwards when you have more time.',
          isCorrect: false,
          rationale: 'Once the 30-day notice window closes, the price is set for the term and the only remaining lever is the negotiation you have just declined. A renewal taken under time pressure is the most expensive hour in a software contract, and the rightsizing saving is 18 months away from being realisable in any case.'
        },
        {
          text: 'Notify early that you will not renew, use the notice period to run a competitive evaluation, and right-size the entitlement as part of the transition.',
          isCorrect: true,
          rationale: 'The notice period is leverage, and the right order is to use it while it still exists. Notifying early creates time for a real evaluation, puts the market against the renewal price, and lets the entitlement be right-sized rather than rolled forward at 400 seats. The 38 percent unused figure is a real amount, and it is recoverable at renewal rather than only at the following one.'
        },
        {
          text: 'Rely on the 3 percent uplift cap and the true-up to control cost, and review the seat count at the next annual renewal.',
          isCorrect: false,
          rationale: 'A 3 percent cap controls the rate of increase, not the base. 400 seats at a good rate is still 18 percent more capacity than the organisation uses, and the true-up works against you here because it is calculated on the vendor\'s deployment report, not yours. Both of the protections in this contract are pointing the wrong way.'
        },
        {
          text: 'Renegotiate only the true-up method, on the basis that the rest of the contract is acceptable, and keep the renewal date.',
          isCorrect: false,
          rationale: 'The true-up method is worth fixing, but it is worth far less than the entitlement and the notice window, and fixing it alone leaves the price question untouched. You are also negotiating from the weaker position, because every day that passes brings the notice window closer.'
        }
      ],
      principle: 'Sequence software renewal work backwards from the notice date. The notice date is the deadline, and using it early is worth more than using it perfectly.'
    },
    {
      type: 'mcq',
      q: 'A vendor quotes 12,000 per year for 100 named users of an analytics platform, and a second vendor quotes 19,000 for the same 100 users, defined as active users in a rolling 30-day window. On what basis should the second quote be challenged?',
      options: [
        {
          text: 'It should not be challenged: the second price is higher and the metric difference does not matter because the requirement is the same.',
          isCorrect: false,
          rationale: 'The requirement is the same and the metric is not, which is exactly the problem. You cannot conclude that the second vendor is more expensive, because the two numbers count different populations. You also cannot conclude that you would get 100 active users for 19,000, because that depends on your own usage profile.'
        },
        {
          text: 'Ask the second vendor to quote on your organisation metric, and convert the first vendor\'s price onto the same basis, so the two are comparable.',
          isCorrect: true,
          rationale: 'This is the only comparison that means anything. A common metric, with the conversion shown in the evaluation document, tells you the real unit cost of the requirement. It also tells you something more useful than the price: how much of the incumbent estate is paid for but unused.'
        },
        {
          text: 'Accept the lower named-user price, because the requirement is for 100 people to have access regardless of whether they use it.',
          isCorrect: false,
          rationale: 'That is the wrong requirement. If the business needs access for 100 people, the named-user metric is right and the first quote is correct. If the business needs 100 active users, the second metric is right. The point is to decide which requirement you actually have before you decide which price you prefer.'
        },
        {
          text: 'Split the difference at 15,500 and ask the business to fund the difference from a budget headroom.',
          isCorrect: false,
          rationale: 'Splitting the difference between two numbers that measure different things produces a number that means nothing and a commitment made without a basis. It also concedes the point that the comparison was never valid.'
        }
      ],
      principle: 'A metric is not a detail. Before you compare prices, decide what you are buying and how it is counted, and make every vendor answer on the same basis.'
    },
    {
      "type": "scenario",
      "context": "A 300,000 annual software subscription renews automatically in 45 days. The contract has a 30-day notice window, so the last date to act is in 15 days. Usage data shows 22 percent of the seats have not been used in six months, and the true-up is calculated on the vendor's deployment report. What should the buyer do first?",
      "q": "What is the right first action?",
      "options": [
        {
          "text": "Cancel the subscription now, since 22 percent of the seats are unused and the renewal is excessive.",
          "isCorrect": false,
          "rationale": "Cancelling with 15 days of notice on a 300,000 commitment, on the strength of a seat count rather than a business need, is a decision made under time pressure with no analysis behind it. Unused seats are real waste, but they are not a reason to lose a capability the business depends on, and the cancellation terms in a subscription are usually a full-term commitment rather than a month-to-month exit. The waste is recoverable; the loss of the tool is not necessarily reversible."
        },
        {
          "text": "Establish what is actually used and what the business needs, reconcile the entitlements against that, and use the notice window to negotiate a right-sized renewal with a capped uplift and a true-up on the buyer's own records.",
          "isCorrect": true,
          "rationale": "The sequence matters. The 15-day window is the real constraint and it should drive the work plan rather than the panic. The unused seats are a genuine finding and the right-sizing is where the money is, but the first job is to establish what the business actually needs, because that determines whether the right answer is fewer seats, a different tier, or a different product. Then negotiate inside the window: a capped uplift, a true-up computed on the buyer's deployment record, a notice period that is not 30 days, and the right-sized volume. The window is short, which is exactly why the analysis has to be done now rather than after the renewal."
        },
        {
          "text": "Do nothing, because cancelling at 45 days would trigger an early termination penalty.",
          "isCorrect": false,
          "rationale": "A termination penalty is a cost to be quantified, not a reason to take no decision. Doing nothing is a decision to renew, and it is the most expensive of the options because it costs 300,000 for twelve months of unchanged waste. If there is a penalty, it belongs in the analysis of what the alternatives cost, and it is usually small next to a year of unused seats. Inaction is not a neutral option here."
        },
        {
          "text": "Accept the renewal to protect continuity, and start a right-sizing exercise after the renewal date.",
          "isCorrect": false,
          "rationale": "This is a reasonable instinct and a poor plan, because right-sizing a subscription means paying for fewer seats, and that saving is only available at renewal. After the renewal you are locked into another year at the same volume, and the \"exercise\" becomes an analysis of waste you have already agreed to pay for. The value of the right-sizing is entirely in the renewal, which is why the window, however tight, is where the work has to happen."
        }
      ],
      "principle": "In a subscription, right-sizing only pays at renewal. The notice window is the whole opportunity, so the analysis happens inside it."
    },
    {
      "type": "mcq",
      "q": "A software true-up clause is most dangerous when:",
      "options": [
        {
          "text": "The measurement of deployment is left to the vendor's own report, with no right to the underlying data.",
          "isCorrect": true,
          "rationale": "That is the dangerous version, because it makes the reconciliation a self-assessment by the party with an interest in the outcome. The buyer then discovers a shortfall it never measured, calculates it on the vendor's terms, and pays it. The control is to require the buyer's own deployment record to be the basis, with a right to the vendor's underlying data on request so the two can be reconciled. A true-up computed on a shared method is a commercial process; one computed on one party's data is a revenue mechanism."
        },
        {
          "text": "The true-up is calculated quarterly, because frequent measurement is always better than annual.",
          "isCorrect": false,
          "rationale": "Frequency is not the risk, and quarterly can be a genuine advantage: the shortfall is smaller, the correction is cheaper and the buyer learns earlier. The risk is the basis of calculation and the flow of data, not how often it happens. A quarterly true-up on the buyer's own records is a better arrangement than an annual one computed by the vendor on a report the buyer never sees."
        },
        {
          "text": "The contract allows the vendor to audit the buyer's deployment, which creates a risk of billable findings.",
          "isCorrect": false,
          "rationale": "The audit right is the counterweight to the buyer's own measurement, and it is not the danger. A vendor audit can find an over-deployment, which is a billable finding, but that risk exists whether the clause is there or not, and it exists because the deployment does not match the entitlements. The honest response is to keep the deployment record accurate, not to remove the clause that makes the position checkable."
        },
        {
          "text": "The true-up applies a price per unit that is higher than the contracted unit price.",
          "isCorrect": false,
          "rationale": "A true-up at a higher rate is a commercial point worth negotiating, but it is an ordinary price term and it is visible and bounded. The dangerous clause is the one that determines whether there is a shortfall at all, because an unbounded measurement error is worse than a known premium. Negotiate the rate; insist on the data."
        }
      ],
      "principle": "A true-up is a revenue mechanism unless the buyer controls the measurement. Own the deployment record and demand the underlying data."
    }
 ],
  relSop: 'sop-rfp',
  rel: {
    concepts: ['contract-structure', 'payment-terms', 'working-capital'],
    sops: ['sop-rfp', 'sop-contract-review'],
    checklists: ['cl-contract-review'],
    templates: ['tpl-contract-review-checklist', 'tpl-business-case'],
    calcs: ['calc-multi-year-contract-cost', 'calc-payment-terms'],
    decisions: ['renew-vs-resource'],
    kpis: ['kpi-working-capital-impact', 'kpi-contract-compliance']
  },
  labMission: {
    title: 'Mission 9.2: Rebuild a Software Comparison on a Common Metric',
    desc: 'Take a two-quote comparison and rebuild it on a single organisation metric, then identify the entitlement reconciliation that follows.',
    tasks: [
      'Write the metric definition you would require: the counting rule, the measurement window and who produces the data.',
      'Take two quotes with different metrics and convert both onto your metric, showing the conversion for each.',
      'Reconcile an entitlement list against usage and calculate the right-sizing amount, then work out the effect on the renewal price.',
      'List the commercial clauses you would require: uplift cap, notice window, true-up method, audit notice, data terms and exit assistance.'
    ],
    ctaLabel: 'Open the Business Case template',
    ctaHref: '#/tpl/tpl-business-case',
    secondaryLabel: 'Review the Contract Review checklist',
    secondaryHref: '#/cl/cl-contract-review'
  },
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-professional-services',
  title: 'Professional Services and Consultancy Procurement',
  module: 'Module 9: Services, Software and Indirect Procurement',
  kicker: 'Function 9.3',
  tagline: 'You are buying hours and judgement. The scope has a habit of growing after the price is fixed.',
  desc: 'Sourcing professional and advisory services with scope control, rate benchmarking, outcome framing and the leverage of a good brief.',
  duration: '12 mins',
  lifecycleStage: 'Stage 4: Requirement Definition and Scope Formulation',
  lifecycleDesc: 'In services buying the specification is the scope, and the scope is the product. Everything downstream depends on it.',

  what: 'Professional services procurement is the sourcing of expertise: consultants, advisers, contractors, agencies, auditors, lawyers, engineers and the many hybrid roles that sit between the internal team and a specialist supplier. The commercial unit is not a good or a service delivered; it is an input to a decision. That makes the market unusually hard to price competitively in advance, because the value of an hour depends entirely on what it is used for, which is why the quality of the brief decides the quality of the price.',
  why: [
    'Scope is the price. A consultancy quote is a statement about a defined body of work, and once the work is ambiguous, the quote is ambiguous, and the ambiguity is settled in the buyer\'s favour by the supplier, slowly, over the term.',
    'Day rates hide the real price. Two firms quoting 1,200 and 1,600 an hour can deliver the same outcome for very different totals if the hours differ, and the difference is entirely a function of how clearly the work was specified.',
    'The buyer\'s brief is the negotiating position. A well-specified, outcome-anchored scope produces a fixed price and a defensible comparison; an open-ended one produces time and materials, and time and materials transfers the cost risk to the buyer while removing the incentive to be efficient.',
    'Independence is a contractual question, not a personal one. A firm auditing your accounts, valuing your business or advising on a transaction has an interest that must be managed by terms, not by trust.'
  ],
  when: [
    'When a business case is being written for external advice, because the scope written there becomes the price you are quoted.',
    'When a statement of work is being issued, and the decision to fix the price or to buy time is the real decision.',
    'When a firm has been engaged for years without a competitive review, which is common in advisory work and usually unnoticed because the relationship is personal rather than contractual.',
    'When an advisory firm is being asked to review a decision it previously advised on, which is an independence failure regardless of how good the work was.'
  ],
  raci: [
    { role: 'Business Sponsor', resp: 'Accountable for the outcome, the budget and the acceptance of the deliverable, and for the decision to engage at all.' },
    { role: 'Procurement Specialist', resp: 'Responsible for the competitive process, the rate benchmarking, the commercial model and the contractual protections.' },
    { role: 'Engagement Lead (internal)', resp: 'Responsible for the brief, the scope, the day-to-day management of the work and the verification of the deliverable against what was specified.' },
    { role: 'Legal Counsel', resp: 'Consulted on liability, indemnity, intellectual property in deliverables, confidentiality, exclusivity and conflicts of interest.' },
    { role: 'Finance / Controller', resp: 'Consulted on the accounting treatment of the commitment, the accrual profile and the recognition of value against a fixed-price engagement.' }
  ],
  inputs: [
    'The business problem stated in outcome terms, with the decision the work is meant to inform or enable.',
    'A written scope of work: deliverables, exclusions, assumptions, dependencies, timetable, and the acceptance criteria for each deliverable.',
    'The internal resource estimate, so the external quote can be tested for reasonableness against what the work would cost in-house.',
    'A rate benchmark: typical day rates or fixed fees for comparable work in the relevant market, from a current and defensible source.',
    'A conflicts and independence check on every firm that will be approached, before the request for proposal is issued.'
  ],
  outputs: [
    'A priced and comparable set of responses, each on the same scope, with the rate or fee basis stated.',
    'A statement of work with deliverables, acceptance criteria, change control, and a change rate for anything out of scope.',
    'An agreed commercial model: fixed price, capped time and materials, or retainer, chosen to suit the certainty of the scope.',
    'A conflicts, indemnity and independence position in the contract, and a record that the check was run.',
    'A decision record naming the firm, the fee, the reasons and the alternatives considered.'
  ],
  controls: [
    'No engagement begins without a written scope and defined acceptance criteria, however small the value.',
    'Scope changes are priced and approved in writing before the work is done, with a standing change rate stated in the contract.',
    'A conflicts check is run and recorded before the request for proposal is issued, not after the preferred firm is identified.',
    'The deliverable is verified against the written acceptance criteria, and acceptance is recorded with a named approver.',
    'Fees above a stated threshold are benchmarked against the market or against an internal rate, with the benchmark retained.'
  ],
  mistakes: [
    'Briefing a firm that has already been informally consulted, which has contaminated the competition before it began.',
    'Accepting a day-rate quote without an internal estimate of the hours, and therefore without any way to test whether the number is reasonable.',
    'Fixing the scope in the request for proposal and leaving it open in the contract, so that the ambiguity is settled later and in the other party\'s favour.',
    'Treating a fixed-price engagement as risk-free, when the risk simply moves to delivery quality and the buyer rarely has the commercial leverage to force a remedy.',
    'Letting an advisory relationship persist on the strength of a good individual rather than a competitive review, and discovering the rate has risen 40 percent in six years.'
  ],
  bestPractices: [
    'Write the scope and the acceptance criteria before you ask anyone to price it, and send the identical scope to every firm.',
    'Ask for a fixed price against a defined deliverable wherever the outcome can be specified, and use time and materials only where it genuinely cannot.',
    'Test the quote against an internal rate: multiply the quoted rate by your own hours estimate and ask whether the total is defensible.',
    'Run a price review on advisory relationships every two to three years even when nothing is wrong, because nothing being wrong is what makes it easy to let the rate drift.',
    'Agree the change mechanism in the contract: what a change is, what it costs per day, and who may approve it.'
  ],
  terms: [
    { term: 'Statement of Work (SOW)', def: 'The document that defines the scope, deliverables, acceptance criteria, timetable, fees and governance for one engagement or phase of work. In services contracting the SOW is the product specification.' },
    { term: 'Time and Materials (T&M)', def: 'A pricing model in which the buyer pays for time actually spent at agreed rates, plus approved expenses. It transfers cost risk to the buyer and removes the supplier\'s incentive to work efficiently, so it needs a cap, a rate and tight scope control.' },
    { term: 'Fixed Price', def: 'A pricing model in which the total cost is agreed in advance against a defined deliverable. It transfers cost risk to the supplier and rewards efficiency, and it requires a scope precise enough to price.' },
    { term: 'Change Control', def: 'The contractual process by which work outside the agreed scope is identified, priced and approved before it is performed, with a stated rate and a named approver on both sides.' },
    { term: 'Conflicts Check', def: 'A documented review of whether a prospective supplier has advised a party adverse to your interest on the same matter, or has an interest that impairs its independence. It is run before, not after, a firm is selected.' },
    { term: 'Day Rate Benchmark', def: 'A defensible reference point for the market rate for a given skill, used to test whether a quoted rate is reasonable. The source and the date matter, because a benchmark you cannot produce is not a benchmark.' }
  ],
  thinkingPoints: [
    {
      quote: 'The cheapest hour of professional advice is the one that prevents a six-month programme. The most expensive is the one bought without a brief.',
      explanation: 'Professional services cannot be commoditised on price, because the value of an hour is entirely a function of the problem it is applied to. That does not mean the price is unnegotiable. It means the negotiating position is the quality of the brief: what decision is being informed, what is being delivered, what will make it right, and what is explicitly out of scope. A firm that can price a clear problem will price it tightly. A firm asked to price an unclear one will price the uncertainty, and you will pay for it in the change requests.',
      realWorldExample: 'A mid-sized manufacturer engaged a consultancy on a supply chain programme. The first engagement ran 14 months, produced 9 reports, and delivered an average of 3.1 change requests a month at 1,450 a day, leaving the business unable to say what the programme had actually cost. The second programme, after a rewrite, was scoped to five deliverables with acceptance criteria, priced as a fixed fee, and ran 7 months with one change request. The advisory firm was the same. The difference was the brief, and it was worth roughly 60 percent of the total fee.',
      reflectionPrompt: 'Take the last piece of external advice your organization bought. Could you state, in one paragraph, what was delivered, what it cost, and what would have counted as it being wrong? If not, the scope was never really agreed.'
    }
  ],
  sopSteps: [
    {
      title: 'Write the Brief and the Outcome',
      role: 'Business Sponsor',
      desc: 'State the business problem, the decision the work informs or enables, the constraint, and what will be different if the work succeeds.',
      control: 'Require the business to state the outcome before any supplier is approached, so the procurement is buying a result rather than a body of effort.',
      record: 'Approved brief with the outcome statement and the constraints.',
      pitfall: 'Briefing for activity, such as "support the ERP implementation", instead of for an outcome.'
    },
    {
      title: 'Define Scope, Deliverables and Acceptance Criteria',
      role: 'Engagement Lead (internal)',
      desc: 'Write the scope of work: deliverables, exclusions, assumptions, dependencies, timetable, and the specific criteria against which each deliverable will be accepted.',
      control: 'Send the identical scope to every firm, and require written confirmation that the response is priced against it.',
      record: 'Scope of work issued with the request for proposal.',
      pitfall: 'Letting each firm interpret the scope differently, which produces three responses that cannot be compared.'
    },
    {
      title: 'Run the Conflicts Check and Approach the Market',
      role: 'Procurement Specialist',
      desc: 'Run and record the conflicts and independence check on every firm, then issue the request for proposal to a market that has at least one credible alternative.',
      control: 'Do not issue the request for proposal before the conflicts check is complete and recorded.',
      record: 'Conflicts check record and the invitation list with the reasons for each inclusion.',
      pitfall: 'Approaching a firm informally first and then treating the formal competition as a formality.'
    },
    {
      title: 'Benchmark and Compare on a Common Basis',
      role: 'Procurement Specialist',
      desc: 'Normalize the responses to a common basis, test the rates against the internal estimate and the market benchmark, and evaluate the fee and the team together.',
      control: 'Require a named team and a rate per role to be stated, so that the comparison is of the proposed team and not of an anonymous resource pool.',
      record: 'Evaluation matrix with the rate benchmark and the internal estimate shown.',
      pitfall: 'Comparing a fixed fee against an hourly estimate without establishing whether the scopes are the same.'
    },
    {
      title: 'Contract, Govern and Verify the Deliverable',
      role: 'Engagement Lead (internal)',
      desc: 'Execute the statement of work with the change mechanism, the acceptance criteria and the governance rhythm, and verify each deliverable against those criteria before accepting it.',
      control: 'Acceptance is recorded with a named approver, and no invoice is paid against a deliverable that has not been accepted.',
      record: 'Signed statement of work, deliverable acceptance records and the change log.',
      pitfall: 'Paying for work on the basis that it is "nearly done", which converts a delivery problem into a payment problem.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'You are sourcing a 6-month advisory engagement to redesign your order-to-cash process. Two firms respond. Firm A quotes a fixed fee of 340,000 for five named deliverables against a detailed scope. Firm B quotes 1,450 a day, with no fixed price, and suggests the work will take 280 days. Your internal estimate is 240 days. What is the right basis for the decision?',
      q: 'How should you proceed?',
      options: [
        {
          text: 'Award to Firm A, because a fixed price removes the cost risk from your organization.',
          isCorrect: false,
          rationale: 'It removes one risk and creates another. A fixed price transfers cost risk to the supplier, which is the point, but it also removes their incentive to be efficient and it exposes you to the quality and timing risk, which is the risk you have least capacity to absorb. Firm A\'s price also needs testing: 340,000 against an internal estimate of 240 days is roughly 1,420 a day equivalent, which is a very similar day rate to Firm B, not a fundamentally different commercial model.'
        },
        {
          text: 'Convert Firm A to a day-rate equivalent using the delivery timetable in its proposal, test both against your internal estimate and the market benchmark, and evaluate the proposed team and the acceptance criteria alongside the price.',
          isCorrect: true,
          rationale: 'The two quotes are not comparable until they are put on a common basis, and the common basis is the rate. The internal estimate is the test that matters: Firm A at 340,000 across the 240 days your own team thinks the work takes is 1,420 a day, so the fixed fee is protecting you against an overrun you may not have. A firm quoting 280 days is telling you the scope implies more effort than you estimated, and that is a scoping conversation to have with them, not a number to accept.'
        },
        {
          text: 'Award to Firm B, because the day rate of 1,450 is lower than the equivalent rate implied by Firm A, and time and materials keeps the work genuinely open.',
          isCorrect: false,
          rationale: 'Firm B is the more expensive offer, not the cheaper one: 280 days at 1,450 is 406,000 against 340,000. And time and materials is not genuinely open, it is genuinely unbounded, because it transfers the cost risk to you and removes the supplier\'s incentive to find the efficient answer.'
        },
        {
          text: 'Go back to both firms and ask them to re-quote a fixed price with the scope reduced to fit your 240-day estimate.',
          isCorrect: false,
          rationale: 'Reducing the scope to fit an internal estimate before you have established which estimate is right pre-empts the whole point of the exercise. The internal figure is a benchmark to test the quotes against, not a specification to impose. Note also that a reduced scope has to be a scope you want, not one that makes a number work.'
        }
      ],
      principle: 'Normalise every quote to a common rate, test it against your own estimate, and treat the proposed team and the acceptance criteria as part of the price.'
    },
    {
      type: 'mcq',
      q: 'Why does a written scope of work matter more in professional services procurement than in goods procurement?',
      options: [
        {
          text: 'Because professional services contracts have longer terms and therefore need more documentation.',
          isCorrect: false,
          rationale: 'Term length is not the reason. The reason is that in goods buying the specification of the product is largely self-evident once the goods exist, whereas in services buying the specification is the deliverable itself, and ambiguity in it is settled later, in the supplier\'s favour.'
        },
        {
          text: 'Because the specification of a service is the product, so ambiguity in it becomes cost variation, change requests and lost leverage later.',
          isCorrect: true,
          rationale: 'A service cannot be inspected against a standard, because there is no standard to inspect it against. The scope and the acceptance criteria are the only definition of what was bought. If they are vague, the supplier\'s interpretation prevails by default, and the buyer pays for the difference through time and materials, change requests, or a weaker position at acceptance.'
        },
        {
          text: 'Because professional services are intellectual property and therefore need a contract to be enforceable.',
          isCorrect: false,
          rationale: 'The intellectual property in the deliverable does need a contract, and that is a real and separate issue. It is not the reason the scope matters, though: you can have a well-drafted IP clause and still buy an undefined service, and you can have a precise scope and still lose the rights in the deliverable.'
        },
        {
          text: 'Because professional services suppliers are more likely to dispute what was delivered.',
          isCorrect: false,
          rationale: 'Disputes follow ambiguity rather than cause it. The number of disputes is a symptom of unclear scope, and the fix is the scope and the acceptance criteria, not a dispute-resolution clause bolted on afterwards.'
        }
      ],
      principle: 'In services buying, the specification is the product. That is why the brief, not the negotiation, is where the money is won or lost.'
    },
    {
      "type": "scenario",
      "context": "A consultancy has quoted 480,000 for a nine-month programme. The internal estimate of the equivalent work is 350,000. A colleague says the firm is overpriced and should be challenged. What is the correct analysis?",
      "q": "What should the buyer do?",
      "options": [
        {
          "text": "Challenge the fee as overstated, since the internal estimate is 130,000 lower.",
          "isCorrect": false,
          "rationale": "The internal estimate is not a price for the same thing. It is what the organisation thinks the work would cost if the organisation did it, which omits the cost of the capability, the opportunity cost of the internal people who would otherwise be doing their day jobs, the cost of ramping up the knowledge, and the risk that the internal team is wrong about how hard the work is. The 130,000 gap is the first place to look, not a conclusion. A challenger who opens with \"you are 27 percent overpriced\" and no cost model has lost the argument before it starts."
        },
        {
          "text": "Convert both to a day rate using the proposed team and the hours implied, and test the rate against the market, the seniority mix and the internal cost of providing the capability.",
          "isCorrect": true,
          "rationale": "This is the only comparison that means anything, and it is the same discipline as quote normalisation. 480,000 over nine months at a plausible team is a rate; the internal 350,000 over the same team is a different rate. Once both are expressed per day, the difference is visible and explicable: is it the rate, the mix, the hours, or the expectation of the internal estimate? The internal comparison then becomes a make-or-buy input rather than a price benchmark, because the organisation's cost of providing the capability is a real alternative and it should be in the comparison on a like-for-like basis."
        },
        {
          "text": "Accept the fee, because the internal team could not deliver the work to the required standard in the timeframe.",
          "isCorrect": false,
          "rationale": "That may well be true, and it is a reason to buy rather than a reason to pay any price. The point of the analysis is to establish what the capability is worth, not to explain away whatever the number turns out to be. If the internal team genuinely could not do it, that is a make-or-buy conclusion and it belongs in the business case with a stated plan for the capability afterwards, not as a reason to accept the first quote without testing it."
        },
        {
          "text": "Ask three more firms to quote, and take the lowest.",
          "isCorrect": false,
          "rationale": "A lowest-price rule on a complex professional service is the wrong rule, because the bids are not comparable and the difference in what was scoped will swamp the price difference. If the requirement is complex enough that price cannot separate the bids, which is the normal case for a programme of this kind, the answer is a scope and a weighted evaluation, not a race to the bottom. One more well-specified quote from a firm with relevant experience would tell you more than three competing guesses."
        }
      ],
      "principle": "Convert both sides to a rate and a team before you compare. The internal estimate is a make-or-buy input, not a price benchmark."
    },
    {
      "type": "mcq",
      "q": "The most common cause of scope creep in a professional services engagement is:",
      "options": [
        {
          "text": "The supplier deliberately under-scopes to win the work and recovers the margin later.",
          "isCorrect": false,
          "rationale": "It happens, but it is not the most common cause, and treating every overrun as bad faith destroys the working relationship that the rest of the engagement depends on. The more common cause is structural: the scope was written by the buyer, the buyer knew more about what would be needed than the supplier, and neither party wrote down what was out of scope. In an engagement where the buyer is a better expert on the problem than the supplier, which is the normal case in professional services, an undefined scope will expand in the direction of the buyer's unstated expectations."
        },
        {
          "text": "The scope was defined by the buyer without an explicit out-of-scope section, so both parties fill the gap differently.",
          "isCorrect": true,
          "rationale": "This is the structural cause, and it is a design fault in the request, not a commercial manoeuvre. The remedy is in the scope of work and it is unglamorous: list what is included, list what is explicitly excluded, list the assumptions the estimate depends on, state the change mechanism and the rate, and put a named approver on both sides for changes. A scope with a defined boundary does not stop changes; it makes them visible, priced and approved rather than absorbed quietly into the fee."
        },
        {
          "text": "A time and materials contract, which removes the incentive to control the scope.",
          "isCorrect": false,
          "rationale": "A time and materials contract removes the supplier's incentive to be efficient, and that is a real effect. But the incentive problem is a symptom: a fixed-price contract over an undefined scope simply relocates the overrun into a dispute, and the supplier still has to deliver the work. Fixing the contract without fixing the scope produces a worse outcome, because the overrun becomes contested rather than merely unpriced."
        },
        {
          "text": "The absence of a written statement of work, which leaves the deliverable open to interpretation.",
          "isCorrect": false,
          "rationale": "A statement of work is necessary and its absence is a serious problem, but a statement of work that lists deliverables without excluding anything is not much protection. The exclusion list, the assumptions and the change mechanism are the parts that do the work, and they are the parts most often left out because they are the least comfortable to write. A document that everybody signs and nobody reads is not a control."
        }
      ],
      "principle": "Scope creep is usually a design fault in the request: no exclusions, no assumptions, no change mechanism. Fix the scope, not the supplier."
    }
 ],
  relSop: 'sop-rfp',
  rel: {
    concepts: ['specification', 'negotiation-leverage', 'statement-of-work'],
    sops: ['sop-rfp', 'sop-contract-review'],
    checklists: ['cl-contract-review'],
    templates: ['tpl-contract-review-checklist', 'tpl-negotiation-planner'],
    calcs: ['calc-compare-quotes', 'calc-negotiation-savings'],
    decisions: ['rfq-or-rfp'],
    kpis: ['kpi-cycle-time']
  },
  labMission: {
    title: 'Mission 9.3: Write a Scope and Test a Fee',
    desc: 'Write a scope of work for a real advisory need, then test a quoted fee against it on a common rate basis.',
    tasks: [
      'Draft the scope of work for one advisory engagement: five deliverables, acceptance criteria, exclusions, dependencies and timetable.',
      'Decide the commercial model, fixed price or time and materials, and write the sentence that justifies that choice.',
      'Convert a quoted fee to a day-rate equivalent and compare it with an internal hours estimate and a market benchmark.',
      'Write the change-control clause: what a change is, what it costs per day, and who may approve it.'
    ],
    ctaLabel: 'Open the SOW template',
    ctaHref: '#/tpl/tpl-statement-of-work',
    secondaryLabel: 'Review the Contract Review checklist',
    secondaryHref: '#/cl/cl-contract-review'
  },
});

/* ---------- Module 10: Risk, Compliance, Ethics and Sustainability ---------- */

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-sustainability',
  title: 'Sustainable and Responsible Procurement',
  module: 'Module 10: Risk, Compliance, Ethics and Sustainability',
  kicker: 'Function 10.1',
  tagline: 'A requirement you have to evidence, not a preference you have to express.',
  desc: 'Making sustainability a governed, evidenced part of procurement decisions rather than a paragraph in a policy document.',
  duration: '15 mins',
  lifecycleStage: 'Stage 5: Market Analysis and Supplier Identification',
  lifecycleDesc: 'Sustainability criteria are set at the point the market is defined, and they are only as good as the evidence the buyer can demand.',

  what: 'Sustainable procurement is the practice of integrating environmental, social and governance considerations into procurement decisions, so that the environmental and social consequences of what you buy are managed rather than merely stated. It is described internationally in ISO 20400:2017, Sustainable procurement - Guidance, a 52-page standard confirmed in 2023 that builds on ISO 26000 and supports Sustainable Development Goals 12 and 13. The operative point for a procurement professional is that sustainability stops being a values statement and becomes a specification, an evaluation criterion, a contract obligation and an evidence requirement, in that order.',
  why: [
    'It is now a reporting obligation in many jurisdictions. The European Union\'s Corporate Sustainability Due Diligence Directive and Corporate Sustainability Reporting Directive require large companies to identify, assess and address adverse impacts in their own operations and their value chain, and procurement is where the value chain is actually reached.',
    'Scope 3 emissions are mostly bought. For most organizations, purchased goods and services are the largest single category of value-chain emissions, and they are reduced by what is specified and contracted, not by what is declared.',
    'Claims are now regulated. Green claims that cannot be substantiated are a legal risk in several jurisdictions, so a supplier questionnaire full of unverified claims is a liability rather than a control.',
    'A requirement without evidence is a wish. If the contract does not require data, specify it, verify it, and state what happens when it is missing, the sustainability criteria will not survive the first delivery problem.'
  ],
  when: [
    'When a category strategy is being written, because that is where the sustainability requirements for a category are set and where the criteria can be made proportionate.',
    'When a new supplier is being qualified, and the evidence requirements should be settled before the commercial conversation.',
    'When a specification is being written for a category with material environmental impact, such as packaging, energy, textiles, metals or electronics.',
    'When a reporting obligation applies and the evidence chain has to exist for a number the organization publishes.'
  ],
  raci: [
    { role: 'Sustainability or ESG Lead', resp: 'Responsible for the policy, the reporting obligations, the evidence framework and the interpretation of the criteria, and consulted on every category strategy.' },
    { role: 'Category Manager', resp: 'Accountable for translating the policy into category requirements, weightings, contract clauses and supplier evidence requests.' },
    { role: 'Procurement Specialist', resp: 'Responsible for embedding the requirements in the solicitation, the evaluation and the contract, and for collecting the evidence at the right stage.' },
    { role: 'Legal Counsel', resp: 'Consulted on warranty of compliance, audit rights, remediation and termination for sustained breach, and on the enforceability of any claim made in the contract.' },
    { role: 'Business Sponsor', resp: 'Responsible for accepting the commercial and operational consequences of the requirement and for the technical feasibility of the specification.' }
  ],
  inputs: [
    'The applicable regulatory and reporting obligations for your organization, its customers and its markets.',
    'The baseline: the category spend, the emissions or impact estimate, and where the data comes from and how reliable it is.',
    'A materiality view: which categories carry material impact, so that effort is proportionate rather than uniform.',
    'A definition of the evidence required per criterion, and the method for verifying it.',
    'A view of the supply chain beyond tier one for the categories that matter most, since most impact sits several tiers down.'
  ],
  outputs: [
    'Category-level sustainability requirements with weightings applied in the evaluation.',
    'A defined evidence set per requirement, with an agreed verification method and an owner.',
    'Contractual obligations: what is warranted, how often it is reported, what may be audited and what happens on sustained non-conformity.',
    'A recorded data trail from the supplier\'s claim to the organization\'s published number.',
    'A prioritised improvement plan for the categories with the material impact, with owners and dates.'
  ],
  controls: [
    'Every material sustainability requirement names the evidence, the verification method and the consequence of its absence. A requirement with none of the three is a preference, not a control.',
    'Supplier claims are verified against a primary source or a recognised scheme where one exists, and unverified claims are not carried into a published figure.',
    'Sustainability criteria are applied with a materiality view, so that effort is concentrated where the impact is rather than spread evenly across every purchase.',
    'Contractual sustainability obligations carry a warranty, an audit right and a defined remedy for sustained breach, and the remedy is negotiated while there is leverage.',
    'The evidence trail is auditable: for any number the organization reports, the supplier data, the verification and the treatment of gaps can all be produced.'
  ],
  mistakes: [
    'Writing a 300-page supplier questionnaire and treating the returned answers as data, when nothing has been verified and most of it is self-declared.',
    'Applying a uniform list of criteria to every category regardless of impact, which produces a large compliance burden and very little risk reduction.',
    'Embedding a sustainability requirement in the contract with no evidence obligation, so that compliance is unverifiable at the point it would matter.',
    'Publishing a figure that rests on supplier self-declaration with no record of the verification or of the gaps, and discovering the exposure in an audit.',
    'Looking only at tier one. For most categories, the material impact sits several tiers down and is invisible to a tier-one due diligence process.'
  ],
  bestPractices: [
    'Start with a materiality analysis by category, and put the effort where the impact is. A short, enforced list beats a long, unaudited one.',
    'Ask for evidence, not claims: a certification with a scheme and an expiry, a report with a scope, a number with a method and a boundary.',
    'Write the consequence into the requirement, because a criterion without a consequence is a request the supplier can decline.',
    'Use the commercial conversation: sustainability requirements are far easier to secure when the buyer is choosing between credible suppliers.',
    'Measure what the specification actually changed. If the requirement has not changed a material number, it was not a requirement.'
  ],
  terms: [
    { term: 'ISO 20400:2017', def: 'International standard "Sustainable procurement - Guidance", confirmed in 2023, which gives guidance on integrating sustainability into procurement independent of sector or organisation size, and which references ISO 26000.' },
    { term: 'Scope 3 Emissions', def: 'The greenhouse gas emissions of a company\'s value chain rather than its own operations, as defined by the GHG Protocol. For most organizations purchased goods and services are the largest Scope 3 category.' },
    { term: 'Materiality', def: 'The principle that sustainability effort should be concentrated on the impacts that are significant, so that a limited amount of effort and attention produces a proportionate reduction in impact.' },
    { term: 'Chain-of-Custody Certification', def: 'A scheme that traces certified sustainable material through the supply chain to the point of sale, such as the FSC or the PEFC for paper and timber. The traceability is the value, not the label.' },
    { term: 'Green Claims', def: 'A public or contractual claim about the environmental performance of a product or service. Regulated in several jurisdictions, and only defensible with evidence behind it.' },
    { term: 'CSDDD', def: 'The European Union Corporate Sustainability Due Diligence Directive, which requires large undertakings to identify, prevent, mitigate and account for adverse human rights and environmental impacts in their own operations and value chains.' }
  ],
  thinkingPoints: [
    {
      quote: 'A sustainability requirement that cannot be verified is a preference, and a preference does not change what is bought.',
      explanation: 'Procurement is the only function that can turn an environmental or social commitment into something that actually happens in the world, because procurement specifies what is bought, contracts for it, and then pays for it. That power is also the risk. A criterion that cannot be verified, that has no stated consequence, and that nobody has time to check at delivery is a line in a questionnaire that changes nothing, and it costs real time every year to collect.',
      realWorldExample: 'A consumer goods manufacturer set a recycled-content requirement on its packaging, published it in its sustainability report, and received no evidence for it across four years. When a customer audited the claim, the company could not substantiate it and had to withdraw the number. The fix was not a better questionnaire: it was a contract clause requiring a chain-of-custody certificate with a scheme name and an expiry, a right to verify at audit, and a stated remedy on sustained non-conformity. Two years later the same figure was defensible, because it had an evidence chain behind it rather than a claim.',
      reflectionPrompt: 'Take one sustainability requirement in your organization\'s supplier documentation. Can you name the evidence, the verification method and the consequence of its absence? If you can name only the requirement, you have a preference.'
    }
  ],
  sopSteps: [
    {
      title: 'Establish the Obligation and the Materiality View',
      role: 'Sustainability or ESG Lead',
      desc: 'Identify the reporting and legal obligations that apply, and analyse spend and impact by category to establish where the material impact sits.',
      control: 'The materiality analysis must be documented and owned, so that the choice of where to focus is a recorded decision rather than an unstated preference.',
      record: 'Sustainability obligations register with the category materiality assessment.',
      pitfall: 'Applying one uniform criteria set to every category and calling the result a strategy.'
    },
    {
      title: 'Define the Requirements, the Evidence and the Consequence',
      role: 'Category Manager',
      desc: 'For each material category, set the requirements, specify the evidence and verification method for each, and state what happens when the evidence is missing or the requirement is not met.',
      control: 'Reject any requirement that has no evidence source and no stated consequence, before it reaches a supplier.',
      record: 'Category sustainability requirement set with evidence, verification and consequence for each requirement.',
      pitfall: 'Copying a criteria list from a peer or an industry body without checking that the evidence is obtainable for the category.'
    },
    {
      title: 'Verify the Supplier Position Before Award',
      role: 'Procurement Specialist',
      desc: 'Check the evidence supplied, verify it against a primary source or a recognised scheme where one exists, and record what was verified and what was not.',
      control: 'Do not carry an unverified claim into a published figure; record it as unverified and treat it as a gap to be closed.',
      record: 'Supplier evidence file with verification status per requirement.',
      pitfall: 'Accepting a self-declared percentage in a questionnaire with a date on it and calling it evidence.'
    },
    {
      title: 'Contract the Obligation with a Remedy',
      role: 'Procurement Specialist',
      desc: 'Write the sustainability obligations into the contract with a warranty, a reporting frequency, an audit right and a defined remedy for sustained non-conformity.',
      control: 'Ensure the remedy is proportionate and enforceable, and that the supplier has a route to demonstrate improvement rather than only a penalty for failure.',
      record: 'Executed contract with the sustainability schedule and the agreed remedy.',
      pitfall: 'Writing a warranty with no audit right, so that compliance is asserted and never checked.'
    },
    {
      title: 'Verify, Report and Improve',
      role: 'Category Manager',
      desc: 'Verify the performance against the requirement at a defined frequency, record the gap where there is one, report it with the evidence trail, and improve the specification for the next cycle.',
      control: 'Every figure published externally must be traceable to the supplier evidence, the verification and the treatment of any gap.',
      record: 'Category sustainability performance report with the evidence trail and the improvement plan.',
      pitfall: 'Reporting the figure without the trail, so that a later audit cannot reconstruct how it was produced.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'Your organization has published a target for 30 percent recycled content across packaging by 2028. A supplier questionnaire asks all packaging suppliers to self-declare their recycled content percentage. Two years later, you are asked by an auditor for the evidence behind the published figure and you find that the only data is the self-declared questionnaire responses. What should you do?',
      q: 'What is the right response?',
      options: [
        {
          text: 'Report the figure with a clear caveat that it is based on supplier self-declaration, and continue to collect the same data each year.',
          isCorrect: false,
          rationale: 'A caveat does not fix a figure that is unverifiable. The data may be wrong, and if it is wrong the published number is wrong too, which is a reporting exposure rather than a procurement one. Continuing to collect the same data guarantees the same position in two more years.'
        },
        {
          text: 'Go back to the requirement: specify the evidence (a chain-of-custody certificate with scheme and expiry, or a verified mass-balance calculation), the verification method, the reporting frequency, the contract warranty and audit right, and a stated remedy for non-conformity. Then rebuild the figure only from what has been verified and treat the rest as a gap.',
          isCorrect: true,
          rationale: 'This is the whole lesson of the case: a requirement without evidence, verification and consequence is a preference, and a preference does not change what is bought. It also handles the reporting problem honestly, because the number you publish is then traceable to evidence you can produce, and the gap you have not closed is visible and owned rather than hidden inside an average.'
        },
        {
          text: 'Run an independent verification exercise with the two largest suppliers to validate the self-declared data, and treat the result as representative of the rest of the panel.',
          isCorrect: false,
          rationale: 'Verifying two of two hundred suppliers validates the sample and not the figure. The published number covers the whole panel, so the evidence chain has to exist for the whole panel or the number has to be restated on the verified subset. Doing a sample is a reasonable first step, but it is not a basis for the number as published.'
        },
        {
          text: 'Withdraw the target and the published figure, and defer sustainable packaging work until the legal and reporting requirements become clearer.',
          isCorrect: false,
          rationale: 'The obligation and the target are not going to become clearer by waiting, and deferring an obligation you have already published creates its own exposure. The target may be right or the ambition may be wrong, but the correct response to a weak data chain is a stronger requirement, not silence.'
        }
      ],
      principle: 'Fix the requirement, not the report. Evidence, verification and consequence turn a preference into something a supplier has to answer for.'
    },
    {
      type: 'mcq',
      q: 'A packaging supplier offers a chain-of-custody certificate from a recognised scheme for one material, and a self-declared recycled-content percentage for the rest of the bill of materials. What is the correct treatment?',
      options: [
        {
          text: 'Use the certificate for the certified material and the self-declared percentage for the remainder, and publish a weighted average.',
          isCorrect: false,
          rationale: 'This produces a single number whose quality is not described anywhere. The unverified portion of the bill of materials is very often the majority, and averaging a certified figure with an unverified one hides the fact rather than measuring it. If the average is published, the reader has no way to know how much of it rests on evidence.'
        },
        {
          text: 'Record the certified material as verified, record the remainder as unverified and excluded, and report them separately so the gap is visible and owned.',
          isCorrect: true,
          rationale: 'Separate reporting is the honest treatment and it is more useful, because it tells you where the improvement effort belongs: the unverified 60 percent of the bill of materials. It also gives the supplier a clear, achievable target, since a verified certificate for one more material is a concrete ask that a certification scheme can support.'
        },
        {
          text: 'Reject the whole submission, because mixed evidence across a bill of materials means the data cannot be used at all.',
          isCorrect: false,
          rationale: 'That discards the certified material, which is the part you can actually rely on, and the part of the supplier\'s performance that is already good. All-or-nothing treatment of mixed evidence loses the signal you have and makes the supplier\'s route to improvement harder to see.'
        },
        {
          text: 'Accept the self-declaration where the certificate does not cover the material, since a chain-of-custody scheme does not cover every material in every bill.',
          isCorrect: false,
          rationale: 'That is the same as accepting the self-declaration for the whole bill, with a certificate attached for appearance. It also overlooks the fact that for some materials there are recognised schemes, and for others there are primary records the supplier can produce directly, such as a mill certificate or a mass-balance calculation with a stated method.'
        }
      ],
      principle: 'Never blend verified and unverified into one number. Report them apart, so the gap is visible and the effort goes where it belongs.'
    },
    {
      "type": "scenario",
      "context": "A packaging supplier states a recycled content percentage on its quotation and provides no supporting document. The buyer has recorded the figure in the sustainability report. What is the correct response?",
      "q": "What should the buyer do?",
      "options": [
        {
          "text": "Accept the figure, because the supplier is a regulated supplier with a reputation to protect and would not misstate it.",
          "isCorrect": false,
          "rationale": "Reputation is not a verification system, and the incentive runs the wrong way: a supplier who can publish a percentage without evidence has a competitive reason to overstate it, and the reason is a lower recycled-content specification costing the buyer more. The figure is also now in a published report, which means the exposure is the buyer's as well as the supplier's. A number in a public sustainability claim has to survive scrutiny, and a self-declaration with no method and no document does not."
        },
        {
          "text": "Ask for the evidence, the method and the boundary, and treat the figure as unverified until it is received. Publish only what has been verified.",
          "isCorrect": true,
          "rationale": "This is the right sequence and it is the one that makes the published number defensible. The request is specific: the certificate with its scheme and expiry, or the mass-balance calculation with its method, or the mill record, plus the boundary the percentage applies to and the period it covers. Until that arrives, the figure is unverified and does not go into a published number. Where the supplier cannot evidence it, the honest treatment is to publish nothing rather than to publish a claim the buyer cannot stand behind, and to record the gap so the improvement effort knows where it is."
        },
        {
          "text": "Publish the figure with a caveat noting that it is self-declared and unverified.",
          "isCorrect": false,
          "rationale": "A caveat does not make a number defensible, and in a sustainability report it can make things worse, because an unverified figure with a caveat still reads as a figure that has been checked. Regulators increasingly ask for the method and the evidence behind a published claim, and \"the supplier told us and we added a caveat\" is not an answer. The buyer should publish what it can substantiate and say plainly what it cannot."
        },
        {
          "text": "Publish only the verified portion of the figure and exclude the unverified material from the calculation.",
          "isCorrect": false,
          "rationale": "That is arithmetically tempting and analytically wrong. The verified portion of a bill of materials is usually the small part, and a weighted average that blends a certified material with an unverified majority reports a number whose quality is nowhere described. Reporting the pieces apart is the correct treatment, not blending them: a figure that says \"certified for 12 percent of the bill of materials, unverified for the rest\" is honest, and a single blended percentage is not."
        }
      ],
      "principle": "An unverified figure does not go into a published number. Publish what you can evidence, and record the gap."
    },
    {
      "type": "mcq",
      "q": "Why does the Scope 3 standard place most purchased goods and services emissions outside the company's own operational control?",
      "options": [
        {
          "text": "Because they are measured differently and are less reliable than Scope 1 and 2 emissions.",
          "isCorrect": false,
          "rationale": "Measurement reliability is a genuine difficulty with Scope 3, and it is not the reason for the structure. The standard is organised around the GHG Protocol's concept of control, and a purchased good is a Scope 3 emission precisely because the emitting entity is the supplier and the buyer does not control it. The reason the categories exist is that a company's own emissions are a small part of the footprint of most value chains, and a standard that excluded them would exclude most of what matters."
        },
        {
          "text": "Because the emitting activity is outside the company's control, and the standard is organised around ownership and control of the emissions.",
          "isCorrect": true,
          "rationale": "That is the organising principle, and it is why the categories are divided at all. Scope 1 is what the company owns directly, Scope 2 is what it purchases as energy, and Scope 3 is everything else in the value chain. For procurement specifically, this means the category that moves the number is bought goods and services, so the specification and the contract are the only instruments that change it. A declaration from a supplier changes the report; a requirement in a contract changes the emissions."
        },
        {
          "text": "Because the standard assigns reporting responsibility to the largest company in the value chain.",
          "isCorrect": false,
          "rationale": "That is not how responsibility is assigned. Each company in a value chain reports its own scopes, and the largest company's Scope 3 figure includes the emissions of its suppliers, which are also reported in their own Scope 1 and 2. The double counting in the value chain is a known characteristic of the method and is handled at the category level, not by concentrating the obligation on one company."
        },
        {
          "text": "Because Scope 3 emissions are not regulated and are reported on a voluntary basis.",
          "isCorrect": false,
          "rationale": "Voluntary reporting is a feature of the framework rather than the reason for the structure, and the regulatory position has moved considerably: disclosure regimes in several jurisdictions now require Scope 3 reporting for large undertakings, and it is increasingly a condition of supplying to large buyers. The reporting driver is the reason to do it now; the control structure of the standard is the reason it is organised this way."
        }
      ],
      "principle": "Scope 3 exists because the emissions are outside your control and inside your value chain. Which means the contract is the only instrument that moves them."
    }
 ],
  relSop: 'sop-supplier-evaluation',
  rel: {
    concepts: ['procurement-ethics', 'supplier-qualification', 'contract-structure'],
    sops: ['sop-supplier-evaluation', 'sop-contract-review'],
    checklists: ['cl-supplier-due-diligence', 'cl-contract-review'],
    templates: ['tpl-supplier-risk-assessment', 'tpl-contract-review-checklist'],
    calcs: ['calc-supplier-scorecard'],
    decisions: ['supplier-financial-risk'],
    kpis: ['kpi-contract-compliance']
  },
  labMission: {
    title: 'Mission 10.1: Turn a Sustainability Preference into a Requirement',
    desc: 'Take a preference in your own organization and rewrite it as a requirement with evidence, verification and a consequence attached.',
    tasks: [
      'Choose one sustainability requirement your organization asks suppliers for today, and write down its evidence, verification method and consequence of non-conformity.',
      'Identify which requirements have all three and which have none, and treat the second group as the priority.',
      'For one category, do a materiality view: what share of spend and of impact does it carry, and where is the material impact in the chain below tier one?',
      'Draft the contract clause for one requirement, including warranty, reporting frequency, audit right and a proportionate remedy.'
    ],
    ctaLabel: 'Open the Contract Review checklist',
    ctaHref: '#/cl/cl-contract-review',
    secondaryLabel: 'Review the Procurement Audit checklist',
    secondaryHref: '#/cl/cl-procurement-audit'
  },
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-ethics-compliance',
  title: 'Ethics, Anti-Bribery and Third-Party Due Diligence',
  module: 'Module 10: Risk, Compliance, Ethics and Sustainability',
  kicker: 'Function 10.2',
  tagline: 'The part of procurement where a bad decision is a legal matter, not a commercial one.',
  desc: 'Running procurement so that bribery, conflict of interest and sanctions exposure cannot reach the organization through the supply base.',
  duration: '15 mins',
  lifecycleStage: 'Stage 6: Supplier Prequalification and Due Diligence',
  lifecycleDesc: 'Compliance is a gate at supplier entry, not a review that happens once the relationship is already established.',

  what: 'Ethics and compliance in procurement is the set of controls that prevent corruption, bribery, conflict of interest and sanctions breaches from entering the organization through its supply base, and that demonstrate to a third party that it has not. The legal exposure is specific: section 7 of the UK Bribery Act 2010 creates a corporate offence of failing to prevent bribery with no defence of adequate procedures, and the US Foreign Corrupt Practices Act applies anti-bribery and books-and-records provisions extraterritorially. The OECD Guidelines for Multinational Enterprises on Responsible Business Conduct set the expectation of risk-based due diligence. Procurement is where the exposure is created, because procurement is where money is offered to someone who can influence a decision.',
  why: [
    'The liability attaches to the organization, not to the individual who paid the bribe. A company can be convicted of failing to prevent bribery by an agent it appointed, and a defence of adequate procedures has to be demonstrated rather than asserted.',
    'Procurement is the highest-risk function because it combines three things at once: discretionary decision-making, third parties acting on your behalf, and payment. Corrupt practice needs all three.',
    'The supply base is where the exposure usually is, not your own employees. Agent, distributor, reseller and consultant relationships are where commission is paid for something other than a service.',
    'A control that cannot be evidenced is not a control. Demonstrating due diligence, not performing it, is what regulators and customers ask for.'
  ],
  when: [
    'When a new supplier or intermediary is being onboarded, before any payment is made or any influence is exercised.',
    'When an agent, representative or consultant is engaged, because commission paid to an intermediary is the classic bribery vector.',
    'When a supplier is screened against sanctions and restricted-party lists, and again at the point of renewal, because the list changes.',
    'When a red flag appears: a refusal to sign a supplier code of conduct, a request for a payment to a personal account, a gift outside policy, a tender process that looks designed around one bidder.',
    'When a supplier is being paid in a high-risk jurisdiction, or where the state, its agencies or its officials are the customer.'
  ],
  raci: [
    { role: 'Compliance Officer or General Counsel', resp: 'Accountable for the policy, the risk assessment, the due diligence standard, the sanctions regime and the investigation process.' },
    { role: 'Procurement Specialist', resp: 'Responsible for performing and evidencing the due diligence before onboarding, and for refusing to proceed where the gate is not passed.' },
    { role: 'Business Sponsor', resp: 'Responsible for declaring the business relationship, any personal or family interest, and for answering honestly in the due diligence process.' },
    { role: 'Finance / Controller', resp: 'Responsible for payment screening, the prohibition on payments to personal accounts, and for the audit trail of the money movement.' },
    { role: 'Internal Audit', resp: 'Independent assurance over the design and operation of the controls, including testing that the gate is actually applied.' }
  ],
  inputs: [
    'The bribery and corruption risk assessment for the geographies, categories and intermediaries you buy from.',
    'A defined due diligence standard with tiers, so that the depth of review matches the assessed risk rather than a fixed questionnaire for everyone.',
    'The current sanctions and restricted-party lists, and the screening process and evidence for each supplier.',
    'The supplier code of conduct, and the signed acceptance or refusal for each supplier.',
    'The declarations of interest from sponsors and from anyone involved in an evaluation, and the register of related-party relationships.'
  ],
  outputs: [
    'A completed due diligence file per supplier, with the evidence, the date, the reviewer and the outcome.',
    'A sanctions screening record per supplier, refreshed on a defined cycle and at each event that changes the risk.',
    'A signed supplier code of conduct, or a documented decision not to proceed.',
    'A register of declared conflicts of interest, with the management decision for each.',
    'An exception record for every case that went ahead without full clearance, with the reason and the approver.'
  ],
  controls: [
    'No supplier is paid, and no contract is executed, until due diligence is complete and the result is recorded. The gate is on payment and signature, not on onboarding paperwork.',
    'Sanctions and restricted-party screening is performed before onboarding and refreshed on a defined cycle, with the screening evidence retained.',
    'Payments are made only to a verified corporate account in the supplier\'s own name, and a request to pay a personal or third-party account is an automatic stop pending review.',
    'Intermediaries and agents are subject to a heightened due diligence standard, and their commission is justified in writing against the value of the service actually received.',
    'Every exception to the due diligence standard is approved by a named officer, recorded with its reason, and reported in aggregate so that the pattern is visible.'
  ],
  mistakes: [
    'Treating a supplier code of conduct as a signature exercise, so that a supplier who would not accept it is onboarded anyway.',
    'Screening once at onboarding and never again, so that a supplier added to a sanctions list after the relationship began is never detected.',
    'Accepting a commission to an intermediary in a high-risk market without a written justification of what service was actually delivered.',
    'Allowing a buyer to sit on an evaluation panel that they have a financial interest in, without declaring it.',
    'Treating a due diligence file as a form to be completed rather than evidence to be retained, so that the record cannot be produced when it is needed.'
  ],
  bestPractices: [
    'Tier the due diligence. Low-risk, low-value, domestic suppliers need a proportionate check; agents and high-risk jurisdictions need a full investigation. One standard for everyone is either too weak or too slow to be used.',
    'Make the gate operational: block the payment, not the paperwork. A control that lives in a form is not a control.',
    'Train the people who make the decisions, not only the compliance team. Most bribery is attempted at the level of a single transaction, and a buyer who knows the three red flags is the most effective control available.',
    'Ask the simple questions early, because the answers are cheap when the relationship is new: who owns the company, who is the beneficial owner, who will be paid, and why this intermediary is necessary.',
    'Treat refusals as data. A supplier who will not sign the code, will not identify the beneficial owner, or will not accept a corporate payment is telling you something important, and the pattern across suppliers is worth reviewing.'
  ],
  terms: [
    { term: 'UK Bribery Act 2010, section 7', def: 'The corporate offence of failing to prevent bribery, which applies to an organization and its associated persons. A defence of having adequate procedures is available, which is why documented due diligence is a legal control rather than an administrative one.' },
    { term: 'FCPA Books and Records Provisions', def: 'The US Foreign Corrupt Practices Act requires issuers and domestic concerns to keep books and records accurately and to devise and maintain internal controls, and extends extraterritorially to foreign subsidiaries and agents.' },
    { term: 'Beneficial Ownership', def: 'The natural person or persons who ultimately own or control a legal entity, as distinct from the registered shareholders. It is the answer to who actually receives the money and who can be influenced.' },
    { term: 'Intermediary or Agent', def: 'A third party engaged to act on your behalf, or to introduce business, often for a commission. Agents carry the highest bribery risk because they are paid to exercise influence and they act outside your visibility.' },
    { term: 'Due Diligence, Risk-Based', def: 'Due diligence whose depth is determined by an assessed risk level rather than applied uniformly. This is the approach expected by the OECD Guidelines for Multinational Enterprises on Responsible Business Conduct.' },
    { term: 'Facilitation Payment', def: 'A small, unofficial payment made to expedite a routine action that the payer is already entitled to receive. It is prohibited in most frameworks precisely because it is small, common, and easy to treat as a local custom.' }
  ],
  thinkingPoints: [
    {
      quote: 'The three questions that prevent most bribery are asked at the wrong moment, long after the answer stopped being interesting.',
      explanation: 'Who ultimately owns this company, who exactly will be paid, and why is this intermediary necessary? These are trivial to answer when the relationship is new, and almost impossible to answer once an order is late and the supplier is the only one who can fix it. By then the commercial urgency has outvoted the compliance process, which is how most bribery actually happens: not through an evil decision, but through a sequence of reasonable ones taken under time pressure, each of which looked small on its own.',
      realWorldExample: 'A manufacturer in a high-risk market paid a commission of 6 percent of contract value to a local agent, on a contract worth 2.1 million, after the agent had been recommended by an incumbent supplier. The payment was made to a corporate account, against an invoice, and appeared on a purchase order. What was missing was the written explanation of what service the agent had actually delivered, and the beneficial ownership information. Two years later, a review found 340,000 in commissions over four years with no documented service behind them. The contracts were not cancelled, but the agent relationship ended, the controls were rebuilt, and the group is now asked for the due diligence file before an entity is added to the vendor master, not after.',
      reflectionPrompt: 'For the last intermediary, agent or commission arrangement your organization used, could you produce a document explaining what service was actually delivered, and who owned the company that received the money? If not, that is the gap.'
    }
  ],
  sopSteps: [
    {
      title: 'Assess the Bribery Risk and Tier the Due Diligence',
      role: 'Compliance Officer or General Counsel',
      desc: 'Assess the bribery and corruption risk by geography, category, intermediary involvement and transaction value, and define a proportionate due diligence standard for each tier.',
      control: 'The tiering must be documented and owned, and must be reviewed when a new geography, category or intermediary type is introduced.',
      record: 'Bribery risk assessment with the due diligence standard for each tier.',
      pitfall: 'Applying a single questionnaire to every supplier regardless of risk, so that it is too slow for the low end and too shallow for the high end.'
    },
    {
      title: 'Complete Due Diligence Before Any Commercial Commitment',
      role: 'Procurement Specialist',
      desc: 'Verify the legal entity, the beneficial owners, the sanctions and restricted-party position, the financial standing, the code of conduct acceptance and, for intermediaries, the commissioned service.',
      control: 'Do not issue a contract, raise a purchase order or set up a payment until the file is complete and the outcome is recorded.',
      record: 'Due diligence file with the evidence, the date, the reviewer and the outcome for each check.',
      pitfall: 'Signing the contract first and completing the file afterwards, which turns the gate into a record of something that already happened.'
    },
    {
      title: 'Screen Sanctions and Conflicts at Entry and on a Cycle',
      role: 'Compliance Officer or General Counsel',
      desc: 'Screen the entity, its beneficial owners and its directors against the applicable sanctions and restricted-party lists, and re-screen on a defined cycle and at every event that changes the risk.',
      control: 'Retain the screening evidence and the date, so that the check can be shown to have been performed at the time it was required.',
      record: 'Sanctions screening record with the lists used, the date and the outcome.',
      pitfall: 'Screening only the registered legal entity, when the sanctions risk sits with the beneficial owner or a director.'
    },
    {
      title: 'Control the Payment and the Commercial Conduct',
      role: 'Finance / Controller',
      desc: 'Ensure payments go only to a verified corporate account in the supplier\'s own name, and that gifts, hospitality and conflicts are declared, recorded and assessed against policy.',
      control: 'A request to pay a personal account, a third-party account or a newly changed account without re-verification is an automatic hold and a report.',
      record: 'Payment verification record, gift and hospitality register, and the conflict of interest declarations.',
      pitfall: 'Treating a change of bank details as an administrative matter rather than as one of the most common payment-fraud and bribery patterns.'
    },
    {
      title: 'Monitor, Report and Review',
      role: 'Internal Audit',
      desc: 'Test that the gate is actually applied, review exceptions in aggregate, and refresh the assessment as the risk changes.',
      control: 'Exceptions are reported in aggregate by category and value so that a pattern of small exceptions is visible before it becomes a systemic exposure.',
      record: 'Annual compliance assurance report with exception analysis and remediation actions.',
      pitfall: 'Testing the completeness of the files rather than whether the gate was applied, which confirms the paperwork and not the control.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'A supplier you have worked with for four years asks to change its bank account before a large order, to an account in the name of its sister company in another country. It says this is a group treasury restructure. The account details arrive by email. The order is due to ship next week. What should you do?',
      q: 'What is the correct response?',
      options: [
        {
          text: 'Update the account so the order ships, and complete the verification afterwards, because the supplier is an established and trusted partner.',
          isCorrect: false,
          rationale: 'This is the exact pattern that payment fraud and bribery attempts take, and the established relationship is what makes it persuasive. The trigger conditions are present in combination: a change of account, a different legal entity, a different country, and a request to bypass the normal lead time. Verifying afterwards is not a mitigation when the money has already moved, and the order being due next week is a pressure that makes the mistake rather than preventing it.'
        },
        {
          text: 'Hold the payment, verify the change through an independently sourced contact rather than the one in the request, confirm the relationship with the supplier\'s known contacts, and re-run sanctions and beneficial ownership screening on the new payee before anything changes.',
          isCorrect: true,
          rationale: 'A changed bank account is a red flag that justifies a hold, and the verification has to be independent: a phone number from a previously verified source, not one from the request, and confirmation with people the supplier already knows you deal with. Re-screening the new payee is essential, because a sister company in another jurisdiction is a new entity with its own ownership and its own sanctions and corruption risk, and it is now the party that will receive your money.'
        },
        {
          text: 'Process the first payment to the new account, and from the next order onward require the standard documentation.',
          isCorrect: false,
          rationale: 'This accepts the most dangerous part of the risk while avoiding the part that is inconvenient. If the request is legitimate, the verification costs a day. If it is not, the first payment is the one that cannot be recovered, and the pattern is to structure a series of payments rather than one large one.'
        },
        {
          text: 'Escalate to the business sponsor and ask them to confirm the change with the supplier, since they hold the relationship.',
          isCorrect: false,
          rationale: 'The sponsor is a good source of information, but a sponsor confirming a change through the same channel that requested it does not constitute independent verification, and the sponsor is also a party to the commercial pressure of shipping next week. Use the sponsor for context, not for verification.'
        }
      ],
      principle: 'A change of payee details is a hold, not a form to complete. Verify independently, re-screen the new payee, and treat time pressure as a risk signal rather than a reason to skip the gate.'
    },
    {
      type: 'mcq',
      q: 'Why is an intermediary or agent relationship the highest-risk activity in procurement?',
      options: [
        {
          text: 'Because commissions are usually larger than the margin on the underlying goods, so they are more likely to be noticed and disputed.',
          isCorrect: false,
          rationale: 'Commission size is not what creates the risk, and the noticeability is not a protection. The risk is created by the combination of a payment, a third party acting on your behalf, and an influence over a decision you make.'
        },
        {
          text: 'Because it combines a payment to a third party with delegated influence over a decision, and the relationship sits outside your direct visibility.',
          isCorrect: true,
          rationale: 'Every one of those three elements is individually ordinary. Together they are the mechanism by which corruption enters an organization, and the fourth element, that the intermediary is acting outside your line of sight, is what makes it hard to detect. The control response follows directly: heightened due diligence, documented justification of the commissioned service, and payment only to a verified corporate account.'
        },
        {
          text: 'Because agents and distributors are usually less qualified than the suppliers they represent, and their work is usually lower quality.',
          isCorrect: false,
          rationale: 'Intermediaries are often highly competent and are used for legitimate reasons: local market knowledge, regulatory knowledge, access, or a service the organization cannot easily provide. The risk comes from the structure of the relationship, not from the quality of the party.'
        },
        {
          text: 'Because international intermediaries are subject to less strict local enforcement, so the underlying transactions are more likely to be irregular.',
          isCorrect: false,
          rationale: 'Enforcement varies but is not the mechanism, and the risk is not confined to cross-border arrangements. A domestic agent paid a commission to influence which supplier is chosen carries the same structural risk, and the same controls apply to it.'
        }
      ],
      principle: 'Payment plus delegated influence plus invisibility is the bribery mechanism. Every control worth having follows from naming those three elements.'
    },
    {
      "type": "scenario",
      "context": "A sales agent asks to be paid a 6 percent commission for introducing a new distributor, to be paid into an account in the agent's own company. The distributor contract is worth 2.1 million over three years. What is the correct response?",
      "q": "What should procurement do?",
      "options": [
        {
          "text": "Pay the commission, because the agent introduced the business and the rate is within the normal range for the region.",
          "isCorrect": false,
          "rationale": "A normal rate is not the test. The three features here are what make it a red flag: a commission paid for influence over the buyer's own decision, a payment to an account in the agent's company rather than to a verified supplier, and a large value. Paying it creates a documentary record of exactly the arrangement that a regulator or an anti-bribery investigation would look at, and it is paid from a company that will then be asked to account for the decision. \"It is normal in the region\" is not a defence to paying money to someone who influenced a decision you made."
        },
        {
          "text": "Do not pay it without due diligence. Establish who the agent is, who owns the agent company, what service was actually delivered, and whether the payment to the agent's own account is justified and lawful in that jurisdiction.",
          "isCorrect": true,
          "rationale": "This is the sequence, and the last part is the one most often skipped. The questions are: who is the agent, who ultimately owns the agent company, and does that ownership connect to the distributor or to any official? What service was delivered that is worth 6 percent of a 2.1 million contract, evidenced and documented? And is paying a commission to that account permissible where the business operates, because the laws differ sharply on commission payments to third parties and to individuals. If the answers are clean, the payment may be entirely proper. If they are not, the payment and possibly the contract are both at risk."
        },
        {
          "text": "Pay the commission but require the agent to declare it, so that the arrangement is transparent.",
          "isCorrect": false,
          "rationale": "A declaration by the party asking for the payment adds nothing, and it creates a document that shows the buyer knew about the arrangement and approved it. Transparency is only a control when it is transparency to someone who can act on it. A declaration filed in the agent's own file is not a control, it is a receipt, and the fact that it exists is the problem: it evidences the payment rather than preventing it."
        },
        {
          "text": "Refuse the commission and instruct the business unit to source the distributor directly, since the agency adds no value.",
          "isCorrect": false,
          "rationale": "This assumes the agency added no value, which nobody has established. Agents do real work: local market access, regulatory knowledge, introductions and the working capital that some distributors require. Refusing the commission on an assumption about the value of the relationship does not remove the risk, it removes the documentation of the risk, and it leaves the business unit to contract with the distributor directly with the same underlying questions unanswered. Establish the facts first, then decide."
        }
      ],
      "principle": "A commission paid for influence, into a third-party account, needs due diligence on ownership, service and local law before it is paid."
    },
    {
      "type": "mcq",
      "q": "Under the UK Bribery Act 2010, the corporate offence of failing to prevent bribery is:",
      "options": [
        {
          "text": "A strict liability offence, with a defence available only where the organisation can show it had adequate procedures in place.",
          "isCorrect": true,
          "rationale": "That is the structure, and it is why the defence is a documentation question rather than a conduct question. It does not matter that no one in the organisation bribed anyone, and it does not matter that the organisation is decent to work for. The question is whether it could be shown that it had adequate procedures, which is a matter of record: the policy, the due diligence on third parties, the training, the reporting route, the monitoring and the evidence that all of it happened. An organisation that cannot produce those records has no defence, whatever its culture is genuinely like."
        },
        {
          "text": "An offence that applies only where a bribe was actually paid, and only the payment is penalised.",
          "isCorrect": false,
          "rationale": "That is the ordinary bribery offence, and it is not the one that creates the organisational exposure. The section 7 offence is about the failure to prevent bribery by an associated person, and it does not require a bribe to have been paid or to have been discovered. The exposure is precisely in the case where something was paid that should not have been, because the defence is about the systems rather than about the outcome."
        },
        {
          "text": "An offence that applies only to companies operating outside the United Kingdom.",
          "isCorrect": false,
          "rationale": "The offence applies to an organisation and its associated persons, and an organisation is in scope if it has a UK presence, which is a much lower threshold than being UK-registered. A company that trades in the UK through a branch, a sales office or a subsidiary can be in scope, and so can an overseas supplier that sells into the UK. The reach is wide, and the practical question for any organisation is whether it can evidence adequate procedures, not where it is incorporated."
        },
        {
          "text": "A strict liability offence with no defence available, making it impossible to contract with intermediaries.",
          "isCorrect": false,
          "rationale": "The defence exists, and it is the whole point of the provision. The problem the section is solving is that a corporation cannot be imprisoned, and without a corporate offence a company could simply decline to investigate a bribe that an employee paid, because the employee, not the company, would be liable. Adequate procedures give the organisation a way to prevent that outcome, and they are entirely within its control to build. What is impossible is to contract with an intermediary without due diligence, not to contract at all."
        }
      ],
      "principle": "The defence is documentation, not conduct. If you cannot produce the policy, the due diligence, the training and the monitoring, you do not have a defence."
    }
 ],
  relSop: 'sop-procurement-audit',
  rel: {
    concepts: ['procurement-ethics', 'conflict-of-interest', 'segregation-of-duties', 'audit-trail'],
    sops: ['sop-procurement-audit', 'sop-supplier-evaluation'],
    checklists: ['cl-supplier-due-diligence', 'cl-procurement-audit'],
    templates: ['tpl-supplier-due-diligence', 'tpl-exception-request'],
    calcs: ['calc-supplier-scorecard'],
    decisions: ['approve-exception'],
    kpis: ['kpi-contract-compliance', 'kpi-maverick-spend']
  },
  labMission: {
    title: 'Mission 10.2: Build a Risk-Tiered Due Diligence Standard',
    desc: 'Write the due diligence standard your organization would actually use: risk tiers, evidence per tier, the gate, and the exception route.',
    tasks: [
      'Assess bribery and corruption risk for three segments of your own supplier base, and assign each a tier.',
      'Define the evidence, the verification method and the outcome for each tier, and say which checks apply to all suppliers and which only to the higher tiers.',
      'State the operational gate: the point at which the file must be complete before anything is signed, ordered or paid, and how the system enforces it.',
      'Write the exception route: who may approve, what must be recorded, and how exceptions are reported in aggregate.'
    ],
    ctaLabel: 'Open the Supplier Due Diligence record',
    ctaHref: '#/tpl/tpl-supplier-due-diligence',
    secondaryLabel: 'Review the Procurement Audit checklist',
    secondaryHref: '#/cl/cl-procurement-audit'
  },
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-resilience-continuity',
  title: 'Supplier Resilience and Business Continuity',
  module: 'Module 10: Risk, Compliance, Ethics and Sustainability',
  kicker: 'Function 10.3',
  tagline: 'The disruption arrives from the supplier you never qualified, in the country you never mapped.',
  desc: 'Mapping the supply base beyond tier one, identifying single points of failure, and planning for disruption before it happens.',
  duration: '12 mins',
  lifecycleStage: 'Stage 20: Performance Management and Value Assurance',
  lifecycleDesc: 'Resilience is a portfolio question, reviewed on a cycle, not a supplier question answered once at onboarding.',

  what: 'Supplier resilience is the capacity of the supply base to keep delivering through a disruption: a natural event, a geopolitical shift, a financial failure, an epidemic, a cyber incident or the failure of a sub-tier nobody knew about. The discipline is the same shape as every other risk practice: identify the exposures, assess them, treat them, and monitor. What makes it different from most procurement risk is that the exposure usually sits below the tier you have a contract with, so the analysis has to extend past the supplier you qualified into the suppliers your supplier depends on.',
  why: [
    'Disruption is not a tail event. The pattern across the last decade of supply chain failures is that they are regular, they compound, and they arrive through routes that were never modelled: a sub-tier insolvency, a port closure, a single plant.',
    'A qualification exercise is a snapshot of tier one. It tells you the supplier is solvent and compliant today, and tells you nothing about whether their critical input comes from one fragile source in one exposed place.',
    'Single points of failure are measurable and usually few. Most organisations have a handful of identifiable single points of failure and no record of them, which means they are known to nobody and mitigated by luck.',
    'Resilience has a price, and that price is a commercial decision. Dual sourcing, buffer stock and regional redundancy all cost money, and somebody has to authorise it, with a stated view of what disruption is worth avoiding.'
  ],
  when: [
    'When a category has been identified as critical to operations, which is usually a business-continuity decision rather than a procurement one.',
    'When a tier-one supplier announces a plant closure, a financial restructuring, a change of control or an acquisition.',
    'When a new product is designed in, because the supply base for a new part is the point at which resilience is cheapest to build.',
    'When a geography is exposed to a natural, political or regulatory event, and the spend in that geography is being reviewed.',
    'When a board or a customer asks for evidence of supply continuity, which is increasingly a condition of doing business rather than a request.'
  ],
  raci: [
    { role: 'Category Manager', resp: 'Accountable for the supply base map, the single-point-of-failure register and the treatment options for each identified exposure.' },
    { role: 'Business Continuity or Risk Lead', resp: 'Responsible for the scenario definitions, the impact assessment, the business continuity plans and the interface between supplier resilience and organizational continuity.' },
    { role: 'Procurement Specialist', resp: 'Responsible for the tier-n mapping, the supplier data collection, the contractual resilience obligations and the audit of them.' },
    { role: 'Supplier Relationship Manager', resp: 'Responsible for the relationship with the tier-one supplier, including its own continuity planning and its willingness to share sub-tier data.' },
    { role: 'Legal Counsel', resp: 'Consulted on resilience clauses: notification of disruption, audit of continuity plans, step-in rights, allocation of priority in shortage and termination rights.' }
  ],
  inputs: [
    'The list of critical categories and, for each, the revenue or output at risk if supply stops.',
    'The tier-one supplier map, and the sub-tier mapping for the categories and suppliers that matter most.',
    'The single-point-of-failure register: plants, ports, routes, components and sub-suppliers with no alternative.',
    'The contractual resilience position per critical supplier: notification duties, continuity plan obligations, audit rights and priority in allocation.',
    'The scenarios that matter for the business: which disruption would stop which operation, and for how long.'
  ],
  outputs: [
    'A multi-tier supply base map for the critical categories, showing the geography and the alternative or not for each dependency.',
    'A single-point-of-failure register with a treatment decision and an owner for each entry.',
    'A resilience clause set for critical contracts: disruption notification, continuity plan maintenance, audit right and allocation priority.',
    'A scenario-based continuity plan per critical category, with a response and an owner.',
    'A costed treatment plan, so the redundancy and buffer investment is a decision someone has actually authorised.'
  ],
  controls: [
    'No critical category is treated as resilient until its multi-tier dependency map exists, with a stated alternative or an explicit acceptance of the risk.',
    'Single points of failure are recorded in a register that is reviewed on a defined cycle, and every entry has a named owner and a treatment decision.',
    'Critical contracts require disruption notification inside a defined window, with a maintenance obligation on the supplier\'s continuity plan.',
    'Allocation priority in shortage is negotiated, not assumed, and it is tested by asking the supplier who else they supply in the same window.',
    'The cost of resilience is presented as an investment against a stated disruption cost, and the decision to accept the risk is recorded either way.'
  ],
  mistakes: [
    'Assuming that a qualified, solvent tier-one supplier means the supply is resilient, when the single point of failure is two tiers down.',
    'Building a register of single points of failure and never acting on it, so that it becomes a document rather than a control.',
    'Negotiating a continuity clause without a notification window, so that you learn about a problem from your customer.',
    'Accepting a supplier\'s continuity plan without testing whether it is plausible, or whether it is the same plan they give to every customer.',
    'Treating dual sourcing as automatically correct, when a second supplier in the same region on the same sub-tier provides no real protection at all.'
  ],
  bestPractices: [
    'Map beyond tier one, but map selectively: the critical categories and the suppliers whose disruption would stop you, not the whole base.',
    'Test the alternative rather than assume it. A second supplier that buys the same input from the same plant is not a second source.',
    'Ask the supplier who else they supply in the same window. The answer tells you whether your allocation priority is worth anything.',
    'Require notification duties in the contract and set a short window, because the value of the information decays by the hour.',
    'Cost the resilience explicitly. A buffer that protects a known revenue stream is a defensible investment; an unfunded one is a hope.'
  ],
  terms: [
    { term: 'Single Point of Failure', def: 'A single element whose loss would stop a process, a product or an operation. In a supply base it is usually a plant, a port, a route, a component or a sub-supplier with no qualified alternative.' },
    { term: 'Tier-N Mapping', def: 'Identifying the supplier\'s own suppliers, to the depth that matters, so that the dependencies behind a tier-one contract are visible rather than assumed. Tier two is usually where the material single points of failure sit.' },
    { term: 'Allocation Priority', def: 'A contractual position on who gets scarce supply first during a disruption. It is worth only what the supplier\'s other customers would consume in the same window, so it has to be tested, not assumed.' },
    { term: 'Disruption Notification', def: 'A contractual obligation to tell the buyer of a supply problem within a defined window. The window is the point: information that arrives after the fact has no planning value.' },
    { term: 'Business Continuity Plan (BCP)', def: 'A documented plan for maintaining or resuming critical functions during a disruption, including the alternative sources, inventories and workarounds that would be used.' },
    { term: 'Geographic Concentration', def: 'The share of a category\'s supply exposed to a single region or a single climate or political risk profile, which is a portfolio exposure even when the individual suppliers are different.' }
  ],
  thinkingPoints: [
    {
      quote: 'A continuity plan you have not tested against a scenario is a document, and a document does not deliver a product.',
      explanation: 'The discipline of continuity planning is well known and the failure mode is well known too: plans are written at a quiet moment by people who are not the people who will run them, and they are read once, in a folder, in the month after they were signed. A plan earns its keep only when someone has walked the scenario end to end and discovered which of the four assumptions they were relying on was wrong. The most common one is that an alternative source exists at all.',
      realWorldExample: 'A food manufacturer audited its top twenty suppliers and found a credible continuity plan for all of them. Testing the plan for its single most critical ingredient, a stabiliser sourced from a speciality chemical plant, revealed that the plant had never been asked for its own upstream dependencies, and that its backup was a distributor of the same plant\'s output in a second region. When a flood took the plant offline for eleven weeks, the plan was followed and the material still did not arrive. The fix was unglamorous: a second qualified manufacturer of the stabiliser, a nine-month buffer built on a forecast rather than a minimum, and a clause requiring the supplier to notify of sub-tier disruption. It cost more every year. It also stopped a line that would otherwise have stopped with it.',
      reflectionPrompt: 'Take your most critical single-source input. Who makes it, who makes the thing they make it from, and what would you actually do if the answer to the second question was "also one plant, also one region"?'
    }
  ],
  sopSteps: [
    {
      title: 'Define the Critical Categories and the Impact',
      role: 'Business Continuity or Risk Lead',
      desc: 'Agree which categories and which supplier failures would stop which business operation, and for how long, and define the scenarios that will be planned for.',
      control: 'The impact figure must be expressed as lost output or lost revenue over a stated period, so that the cost of resilience can be compared with it.',
      record: 'Critical category and scenario definition with the business impact for each.',
      pitfall: 'Treating every supplier as critical, so that the analysis goes nowhere and the critical ones are lost in the noise.'
    },
    {
      title: 'Map the Multi-Tier Dependency and the Geography',
      role: 'Procurement Specialist',
      desc: 'Map the tier-one supplier, its tier-two and tier-three dependencies for the critical categories, and the locations, plants, ports and routes each depends on.',
      control: 'Require the supplier to provide the mapping and the supporting evidence rather than accepting an assurance that the supply is secure.',
      record: 'Multi-tier supply base map with the geographic and single-point-of-failure annotations.',
      pitfall: 'Accepting a supplier\'s statement that it has diversified, without seeing where the diversification actually is.'
    },
    {
      title: 'Build the Single Point of Failure Register and Test the Alternatives',
      role: 'Category Manager',
      desc: 'Record every single point of failure, and for each, establish whether a genuine alternative exists by checking the sub-tier, the region and the route rather than the brand name.',
      control: 'An alternative counts only if it is independent of the same failure mode; two suppliers in one region buying one sub-supplier are not two sources.',
      record: 'Single point of failure register with the alternative test result and the treatment decision for each entry.',
      pitfall: 'Counting a second supplier as an alternative without checking what it also depends on.'
    },
    {
      title: 'Contract the Resilience Position',
      role: 'Procurement Specialist',
      desc: 'Negotiate disruption notification inside a short window, an obligation to maintain and share the continuity plan, an audit right over it, and an allocation priority position.',
      control: 'Test the allocation priority by asking who else the supplier serves in the same window, and record the answer.',
      record: 'Executed contract with the resilience schedule and the recorded allocation test.',
      pitfall: 'Accepting a general force majeure clause that covers the supplier\'s own sub-tier failure and gives you no notification.'
    },
    {
      title: 'Test, Fund and Review',
      role: 'Business Continuity or Risk Lead',
      desc: 'Run the scenario with the team who would have to execute it, record what failed, fund the treatment, and review the register on a defined cycle.',
      control: 'A scenario exercise is complete only when the failures found have owners, dates and a funded treatment, and the register is updated afterwards.',
      record: 'Scenario exercise report with the findings, the funded treatment plan and the updated register.',
      pitfall: 'Treating the exercise as a demonstration rather than as a way to find what is broken.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'You are the category manager for an electronic component used in your top-selling product. The tier-one supplier has a documented continuity plan and has never missed a delivery. A recent industry event closes a major port they use for three weeks, and they notify you within 24 hours as required. Production is set to stop in week two. What should you have in place, and what is missing today?',
      q: 'Which of these is the missing control?',
      options: [
        {
          text: 'A stronger force majeure clause, so that the supplier cannot suspend delivery in circumstances outside its control.',
          isCorrect: false,
          rationale: 'You do not want a stronger suspension right; you want earlier information and an alternative. Force majeure allocates risk between the parties, and a clause that makes the supplier\'s position worse simply makes them less willing to help when the event happens. Notification has already worked, which is the control that has already proved its value.'
        },
        {
          text: 'A documented, funded alternative: a second qualified source that does not depend on the same port, sub-tier or region, plus a buffer stock sized against the disruption scenario rather than against a minimum.',
          isCorrect: true,
          rationale: 'Notification is the control that has already done its job. What has not been tested is the response: a plan that assumes an alternative exists is not a plan. A second source has to be independent of the same failure mode, which means checking the sub-tier and the route and not just the brand on the label, and the buffer has to be sized against the scenario you defined, because a stock level set against a minimum inventory target protects you for a very short time.'
        },
        {
          text: 'A contractual penalty for late delivery, so that the supplier has a stronger incentive to prevent the disruption.',
          isCorrect: false,
          rationale: 'A penalty on late delivery does not create an alternative source and cannot create capacity that does not exist. It also weakens the relationship at exactly the moment you need the supplier prioritising you, and if the penalty is significant the supplier will price the risk into the next renewal.'
        },
        {
          text: 'A larger buffer of the finished component from the tier-one supplier, held at your site, so that production can continue while the port is closed.',
          isCorrect: false,
          rationale: 'This is a reasonable part of a treatment but it is not a complete one, and on its own it is a weak answer. You have to know how much, and the right amount comes from the scenario. It also concentrates the risk: the buffer is a single point of failure held at one site, and it protects you only for the length of the buffer, at a carrying cost, with no re-supply path behind it.'
        }
      ],
      principle: 'Notification buys you time. What converts time into a supply is a funded, tested alternative and a buffer sized against the scenario.'
    },
    {
      type: 'mcq',
      q: 'Your company dual-sources a critical component from two manufacturers. Both manufacture in the same country, both buy the same speciality resin from a single plant, and both finished-goods sites are within 400 kilometres of one port. What is the true level of protection?',
      options: [
        {
          text: 'Good. Two qualified manufacturers mean the component is dual-sourced and the risk is halved.',
          isCorrect: false,
          rationale: 'The number of qualified sources is not the measure of protection, it is the number of independent failure modes. Here there is one resin plant, one country and one port, so a single event hits both sources at once. A dual-source policy that does not test for shared dependencies produces the appearance of resilience, which is worse than openly having one source, because it suppresses the incentive to build real redundancy.'
        },
        {
          text: 'Very low. The sources share a resin plant, a country and a port, so a single event removes both. The protection is only real if the dependency map shows independent failure modes.',
          isCorrect: true,
          rationale: 'This is the point of multi-tier mapping. The dependency map is what tells you whether your redundancy is real, and it is the only way to know before the event. The practical response is to map the sub-tier for the two sources, establish whether the resin plant is a genuine single point of failure, and then decide deliberately: qualify a source outside the shared dependency, or accept the concentration and fund a buffer and a monitoring regime instead.'
        },
        {
          text: 'Moderate. Geographic proximity actually helps, because recovery from a local disruption is faster.',
          isCorrect: false,
          rationale: 'Proximity is not diversification, and here it cuts the other way. Two sites 400 kilometres apart that both depend on the same port and the same resin plant are more exposed to correlated events than two sites on different continents would be, because the common dependencies travel with the product.'
        },
        {
          text: 'Unquantifiable. Resilience cannot be assessed without a full quantitative model of the tier-three supply base.',
          isCorrect: false,
          rationale: 'A full quantitative model of tier three is not a realistic standard and would not be produced for most categories. The question is answerable at the level that matters: name the shared dependencies, judge whether the scenario hits them, and record the decision. Perfect mapping is not the prerequisite for managing the risk.'
        }
      ],
      principle: 'Resilience is measured in independent failure modes, not in the number of suppliers. A dependency map is what tells you which you have.'
    },
    {
      "type": "scenario",
      "context": "A component is single-sourced. The supplier has a documented continuity plan, has never missed a delivery, and the buyer's due diligence covers the supplier's solvency and quality. Testing the plan reveals that the supplier's sole backup is a distributor of the same plant's output in another region. What is the correct conclusion?",
      "q": "What should the buyer conclude?",
      "options": [
        {
          "text": "The plan is adequate, because it names an alternative source and the supplier has a good delivery record.",
          "isCorrect": false,
          "rationale": "A documented plan is not a working alternative. A distributor of the same plant's output is not a second source; it is the same source with a different logistics route, and the alternative fails for exactly the same reason the primary does. The delivery record shows the primary has not failed, which is a fact about the past, not about the scenario. The question is not \"has this worked so far\" but \"does this hold when the event occurs\", and on that test the plan does not hold."
        },
        {
          "text": "The plan is not a genuine alternative, because both routes depend on the same plant, so the exposure is a single point of failure that the plan does not cover.",
          "isCorrect": true,
          "rationale": "That is the correct reading and it is the whole point of testing a continuity plan rather than receiving one. A plan that fails the same test as the primary is not a plan, and it is worse than no plan because it appears on a document as evidence of resilience. The conclusion is not that the supplier has done anything wrong; it is that the buyer has a single point of failure that the file says it does not have, and that has to be corrected, funded and recorded as a known risk until it is."
        },
        {
          "text": "The risk is acceptable because the supplier has never had a disruption, so the scenario is remote.",
          "isCorrect": false,
          "rationale": "The absence of a past disruption is not evidence about a future one, and the whole point of a continuity exercise is to work through the scenario before it happens rather than after. This reasoning is how single points of failure survive in every plan until the event, at which point the plan is discovered to have been a document rather than a mitigation. The scenario might be remote, and it might also be the scenario the exercise exists to find."
        },
        {
          "text": "The buyer should require the supplier to document the distributor arrangement in detail, so that the file is complete.",
          "isCorrect": false,
          "rationale": "Better documentation of a non-mitigation produces a more complete file describing an unmitigated risk, which is the opposite of what the exercise is for. What the buyer needs is either a genuinely independent second source, a tested buffer and recovery plan, or a documented decision to accept the risk with an owner and a mitigation. A fuller file on the same single plant is not a treatment of anything."
        }
      ],
      "principle": "A plan that fails the same test as the primary is not a mitigation. Test the alternative, not the document."
    },
    {
      "type": "mcq",
      "q": "What is the most reliable way to identify a supplier's single points of failure?",
      "options": [
        {
          "text": "From the supplier's own continuity plan, which is the document they are required to maintain.",
          "isCorrect": false,
          "rationale": "The supplier's plan is the natural place to look and it is a poor place to stop, for a reason the resilience case in this curriculum makes concrete: the supplier has no incentive to describe its own fragility, and a plan that names a distributor of the same plant is not a mitigation. The plan is evidence about what the supplier believes, and it is worth reading, but it cannot be the basis of the assessment."
        },
        {
          "text": "By mapping the sub-tier and the locations behind the supply, and testing whether each dependency has an independent alternative.",
          "isCorrect": true,
          "rationale": "This is the only method that finds the fragility, because it looks past the contractual boundary to where the exposure actually is. The questions are always the same: which plant, which route, which sub-supplier, and what happens to us if that one thing stops. Independence has to be tested, not assumed, and the test is whether the alternative would survive the same event. A second supplier in the same region buying from the same plant is not a second source."
        },
        {
          "text": "By reviewing the supplier's financial statements, since a weak balance sheet is the usual source of failure.",
          "isCorrect": false,
          "rationale": "Financial fragility is one failure mode and an important one, and it is the one already covered by the due diligence process. The failure mode that financial review cannot see is the operational one: a single plant, a single sub-tier, a single port or a single component, none of which appears in a set of accounts. A solvent, well-run supplier can still be unable to deliver, and a set of financial statements will not tell you so."
        },
        {
          "text": "By looking at the supplier's customer concentration, because a supplier with one dominant customer is fragile.",
          "isCorrect": false,
          "rationale": "Customer concentration is a legitimate signal about the supplier's own stability, and it belongs in the financial assessment. It is not a map of your exposure, though. Your risk is what happens when your supply chain stops, and the answer is found in the chain, not in the supplier's customer list. The two analyses are both worth doing, and they answer different questions."
        }
      ],
      "principle": "Find the fragility below the contract: which plant, which route, which sub-supplier, and is the alternative independent of the same event."
    }
 ],
  relSop: 'sop-supplier-performance-management',
  rel: {
    concepts: ['supply-chain-risk', 'business-continuity', 'concentration-risk'],
    sops: ['sop-supplier-performance-management'],
    checklists: ['cl-supplier-risk-review', 'cl-supplier-performance-review'],
    templates: ['tpl-supplier-risk-assessment', 'tpl-supplier-business-review'],
    calcs: ['calc-supplier-concentration', 'calc-multi-year-contract-cost'],
    decisions: ['dual-source', 'supplier-concentration'],
    kpis: ['kpi-otif', 'kpi-supplier-concentration']
  },
  labMission: {
    title: 'Mission 10.3: Map a Critical Category and Find the Single Points of Failure',
    desc: 'Take one critical category, map it beyond tier one, identify the single points of failure, and cost the treatment.',
    tasks: [
      'Choose a category whose loss would stop an operation, and map the tier-one supplier, its sub-tier dependencies and the locations involved.',
      'List every single point of failure in the map, and for each, state whether a genuine independent alternative exists.',
      'Write the contractual resilience position you would require: notification window, continuity plan obligation, audit right and allocation priority.',
      'Cost a treatment, such as a qualified second source or a scenario-sized buffer, and set it against the business impact of the disruption.'
    ],
    ctaLabel: 'Open the Supplier Risk Assessment',
    ctaHref: '#/tpl/tpl-supplier-risk-assessment',
    secondaryLabel: 'Review the Risk Review checklist',
    secondaryHref: '#/cl/cl-supplier-risk-review'
  },
});
