/* ==========================================================
   Procure Sherpa Academy - Module 11
   Digital Procurement, Analytics and Category Strategy

   Three areas the first twenty-five functions did not cover, and which
   a procurement professional meets immediately.

   Digital and e-procurement is where most of the industry's attention
   went in the last decade, and most of the disappointment too. The
   function teaches what a P2P platform actually does, what it does not
   do, and why automating a broken process produces a faster version of
   the same problem.

   Spend analytics teaches the discipline the whole function rests on:
   the multi-dimensional spend cube, the taxonomy that makes it
   comparable, and the cleansing that has to happen before anything
   can be concluded from it.

   Category strategy teaches the deliverable that sits above all of it,
   and that most people never get asked to write: a plan for a defined
   spend category that states the trade-off between cost, risk and
   value, and says who does what.

   Written to the same schema as the other twenty-five functions.
   ========================================================== */
PS.ACADEMY_FUNCTIONS = PS.ACADEMY_FUNCTIONS || [];

/* ---------- Module 11: Digital Procurement, Analytics and Category Strategy ---------- */

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-digital-procurement',
  title: 'Digital and e-Procurement',
  module: 'Module 11: Digital Procurement, Analytics and Category Strategy',
  kicker: 'Function 11.1',
  tagline: 'The platform is not the process. It is the process, made faster, with a better audit trail.',
  desc: 'What a procure-to-pay platform does, what it does not do, and how to design a digital sourcing process that improves the commercial outcome rather than the keystroke count.',
  duration: '15 mins',
  lifecycleStage: 'Stage 2: Requirement Definition and Scope Formulation',
  lifecycleDesc: 'Digital procurement starts with the process design, not the platform selection, and the wrong order is the most expensive mistake in the function.',

  what: 'Digital and e-procurement is the use of software and connected workflows to run the procurement process: request, approval, sourcing, contracting, ordering, receiving, invoicing and payment, with the data captured once and reused rather than re-keyed. It is a means, not an objective. The measurable outcomes of a digital procurement programme are the same commercial outcomes as any other: lower total cost, better control, faster cycle time, less maverick spend, and better supplier performance. A platform that improves none of those has improved the experience of the people operating it, which is a real benefit but a different one, and the distinction has to be held throughout the programme.',
  why: [
    'Most of the cost of a transaction is in the transaction, not the price. Re-keying a purchase order into a finance system, chasing an approval by email, and reconciling an invoice against a delivery note are all avoidable work, and they are a large part of why a purchase costs what it does.',
    'Data captured once is analysis you can act on. Every manual step is a place where the category, the cost centre or the supplier name is lost, and spend analysis is impossible on data that was never captured.',
    'The measurable result is usually control before it is saving. A digitally routed approval with a value threshold removes the need for a retrospective audit to find out what happened, and the saving follows.',
    'Adoption is the whole programme. A platform that the requesters route around, because the flow is slower than the old way, delivers none of the benefit and all of the cost, and the routing-around becomes maverick spend with an audit trail.'
  ],
  when: [
    'When a sourcing or ordering process has to scale to a volume the current channel cannot carry, which is usually the first honest case for a platform.',
    'When the manual process has a control weakness that a system route closes, such as approval thresholds that are applied inconsistently because they depend on someone remembering.',
    'When a category needs its own tender, order and invoice flow because its terms, currency or compliance requirements differ from the standard one.',
    'When the organisation is being asked for spend visibility it does not have, and the answer to "where does the money go" is a report rather than a system.'
  ],
  raci: [
    { role: 'Procurement Lead', resp: 'Accountable for the commercial design: what the process must achieve commercially, and which decisions must stay human.' },
    { role: 'Process or Systems Owner', resp: 'Responsible for the process design, the configuration, the integration and the release, and for the data the system depends on.' },
    { role: 'IT / Enterprise Systems', resp: 'Responsible for the platform, the integration, the identity and access model, and the technical security.' },
    { role: 'Finance / Controller', resp: 'Consulted on the accounting treatment, the accrual and the reconciliation, and on the controls that must be satisfied for a payment to be released.' },
    { role: 'Business Requester', resp: 'Responsible for raising the need correctly and for using the agreed route, and for the accuracy of what they enter.' },
    { role: 'Supplier', resp: 'Responsible for receiving orders, submitting accurate invoices and, where invited, participating in the electronic exchange.' }
  ],
  inputs: [
    'The process as it actually runs today, including the workarounds, not the process in the procedure manual.',
    'The transaction volumes by type, because they determine which parts need automation and which need a redesign.',
    'The data the process must produce, and where each field comes from, including the ones currently re-keyed.',
    'The control requirements: approval thresholds, segregation of duties, retention, and what an auditor has to be able to reconstruct.',
    'The existing supplier base and their capability, because a digital channel that excludes the small suppliers creates a maverick problem it was meant to solve.'
  ],
  outputs: [
    'A process design that states the commercial outcome the change is for, and the measures that will show whether it was achieved.',
    'A configured workflow with the approval thresholds, the cost centre rules and the required fields built in rather than remembered.',
    'An integration map showing which data is captured once and reused, and which is still re-keyed and why.',
    'An adoption plan with the requester journey, the training and the measurement of uptake by value and by transaction count.',
    'A control design that satisfies the audit requirement without adding a manual step at the end.'
  ],
  controls: [
    'A workflow must enforce the threshold, not display it. An approval route that shows the right limit and still allows the requester to proceed is worse than a manual control, because it creates the appearance of control.',
    'No re-keying of a controlled field between the requisition, the order, the receipt and the invoice. Where a field is re-entered, the system cannot detect a discrepancy it was meant to catch.',
    'Segregation of duties is enforced in the roles, not in the documentation: the person who raises a requisition cannot be the person who approves it, and the person who receives the goods is not the person who pays for them.',
    'The exception route is designed and measured with the same care as the happy path, because that is where the transactions actually go.',
    'Supplier master data is owned by a named function with a defined creation and change process, and it is not created by the requester to unblock an order.'
  ],
  mistakes: [
    'Buying a platform before deciding what the process has to achieve commercially, and then treating the software configuration as the strategy.',
    'Announcing the platform and measuring adoption by how many users logged in, which is a measure of the announcement rather than of the process.',
    'Automating a bad process, which produces the same bad outcomes faster and with a better audit trail, and is much harder to unpick than the original.',
    'Excluding the small suppliers by requiring a full portal integration, and creating a maverick channel to serve exactly the suppliers the programme was meant to bring in.',
    'Treating the go-live as the end of the programme, when the first six months of exceptions and workarounds is where the process actually gets designed.'
  ],
  bestPractices: [
    'Write the commercial objective first, in a sentence, and refuse to proceed until the platform can be shown to serve it.',
    'Measure what matters: cycle time, maverick rate, addressable spend coverage and the cost per transaction, not the number of users or the number of workflows automated.',
    'Design the requester journey before the approval logic, because the requester is the only person who can route around you.',
    'Pilot with one category that is high volume and low complexity, learn from it, and then generalise.',
    'Treat the first six months of exceptions as the design phase, and fix the process rather than adding rules to handle the exceptions.'
  ],
  terms: [
    { term: 'Procure-to-Pay (P2P)', def: 'The operational downstream cycle: requisition, approval, sourcing, order, receipt, invoice and payment. In a platform it is usually the workflow layer that connects the request to the payment.' },
    { term: 'e-Invoicing', def: 'The exchange of invoices in a structured, machine-readable format rather than as a document, which is what makes automated matching possible. The complication is jurisdiction: several countries now mandate it and define the format, so the obligation follows the supplier and the country, not the buyer.' },
    { term: 'Catalogue', def: 'A controlled list of items or services with agreed prices, terms and a defined order route. It is not a price list: the value is in the agreed terms and the fact that ordering from it removes the negotiation and the approval.' },
    { term: 'Guided Buying', def: 'A requester-facing layer that presents the right choice for the need, so the requester does not have to know the category structure or the preferred supplier. It is the single most effective control on maverick spend.' },
    { term: 'Straight-Through Processing', def: 'A process step that requires no human intervention because the data and the rules are complete enough for the system to decide. It is a measure of data completeness as much as of automation.' },
    { term: 'Maverick Spend', def: 'Spend placed outside the agreed sourcing route, usually at a higher price and usually with weaker control. A digital programme that reduces transaction cost but not maverick spend has solved the easy half.' }
  ],
  thinkingPoints: [
    {
      quote: 'A platform makes the process faster. It does not make it better, and it makes a bad process much harder to unpick.',
      explanation: 'Automation inherits every decision the process encodes, and it encodes them more consistently and at greater scale. That is the value when the encoded decisions are good, and it is the risk when they are not. The people responsible for a digital programme are therefore not implementing software, they are publishing the organisation\'s commercial rules in a form that executes itself, and the rules deserve the same scrutiny as a policy document because they are the policy.',
      realWorldExample: 'A manufacturer replaced a manual requisition and approval process with a P2P platform and a guided-buying catalogue, and reported a 40 percent reduction in transaction cost. Six months later, maverick spend had risen, because the new flow required a cost centre code that the old email route had never required and the requesters did not have. The platform was working exactly as designed and the design was wrong. The fix was not a new module: it was a cost centre mapping built from the requester journey, and a rule that let a requester pick a cost centre from a business unit rather than a code. The lesson is that the first release of a process is a hypothesis, and the exceptions are the evidence about it.',
      reflectionPrompt: 'Think of a process your organization runs manually. If it were automated exactly as it runs today, with every workaround and every judgement call encoded, would the outcome improve? The answer tells you whether the first project is a systems project or a process project.'
    }
  ],
  sopSteps: [
    {
      title: 'Define the Commercial Objective and the Measures',
      role: 'Procurement Lead',
      desc: 'State in one sentence what the change is for, and name the measures that will show it: cycle time, maverick rate, addressable spend coverage, cost per transaction or the number of manual touches.',
      control: 'No platform selection or configuration begins until the objective and the measures are written down and accepted by the finance and the business sponsor.',
      record: 'Programme charter with the commercial objective, the baseline measures and the target values.',
      pitfall: 'Accepting a business case built on transaction-cost reduction alone, with no measure of the commercial outcome.'
    },
    {
      title: 'Map the Process as It Actually Runs',
      role: 'Process or Systems Owner',
      desc: 'Walk the process end to end with the people who do it, record every step including the workarounds, the re-keying and the exceptions, and quantify the volume through each one.',
      control: 'The people performing the steps participate in the mapping, and the volumes are taken from the system rather than estimated.',
      record: 'As-is process map with volumes, the workarounds identified and the manual touch count per transaction type.',
      pitfall: 'Mapping the process in the procedure manual, which shows the intended flow and hides every route the business actually uses.'
    },
    {
      title: 'Design the Target Process and the Control in the Flow',
      role: 'Process or Systems Owner',
      desc: 'Redesign the flow, build the approval thresholds, cost centre rules, required fields and segregation of duties into it, and design the exception route at the same time as the happy path.',
      control: 'Each control is built as a rule the workflow enforces, and every exception has a defined route, an owner and a response time.',
      record: 'Target process design with the embedded control rules and the exception route.',
      pitfall: 'Designing a process for the transactions that arrive in a standard shape, and discovering during the pilot that most of the volume does not arrive that way.'
    },
    {
      title: 'Pilot, Measure and Fix the Process',
      role: 'Business Requester',
      desc: 'Run the new flow with one high-volume, low-complexity category, measure uptake by value and by transaction count, and work through the exceptions deliberately to find where the design is wrong.',
      control: 'Uptake is measured by transaction count as well as by value, and the exceptions are treated as design findings for the first six months.',
      record: 'Pilot results with uptake, exception log, the design changes made and the decision to proceed or revise.',
      pitfall: 'Judging the pilot on how many people used the system rather than on how much spend stopped going around it.'
    },
    {
      title: 'Scale, Support and Keep the Measures Live',
      role: 'IT / Enterprise Systems',
      desc: 'Roll the process out category by category, support the requesters, publish the exception learning, and keep the commercial measures in the business review rather than only in the programme report.',
      control: 'The measures are reported with the same rigour as the savings, and a category that does not reach the target uptake threshold is redesigned rather than reminded.',
      record: 'Rollout plan with the support model, the measures by category and the redesign decisions.',
      pitfall: 'Treating the launch as the finish, so the process quietly reverts and the measures stop being collected.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'A company has spent 400,000 on a procure-to-pay platform. Transaction processing time is down 45 percent and the programme is being presented as a success. Maverick spend has not moved, cycle time for a competitively sourced order is unchanged, and the adoption team reports that 78 percent of transactions now go through the system. What does this evidence actually show?',
      q: 'What is the correct reading?',
      options: [
        { text: 'The programme has succeeded, because 78 percent adoption and a 45 percent reduction in processing time are strong, measurable results.', isCorrect: false, rationale: 'Both measures are real and neither is the objective. Transaction processing time and adoption are the programme\'s own outputs, and a programme that measures only its outputs will always look successful. The measures that matter here have not moved: maverick spend is unchanged and the cycle time for a competitively sourced order, which is the number the business feels, is unchanged. The honest conclusion is that the programme has made the processing of transactions cheaper and has not yet moved the commercial position, and those are different things.' },
        { text: 'The programme has improved the operating cost of transactions but not yet the commercial outcome, because the measures that were chosen measure the programme rather than the result.', isCorrect: false, rationale: 'This is close, and the distinction in the second half is what makes it wrong. Maverick spend and sourced-order cycle time were not chosen as programme outputs; they are the outcome measures, and they have not moved. Calling them programme measures misdescribes the evidence. The correct reading is that the outputs improved and the outcomes did not, which is a finding about the design and the measurement, not a matter of labelling.' },
        { text: 'The outputs improved and the outcomes did not, which means the flow was automated as it ran rather than redesigned, and the measurement should be corrected before the next phase.', isCorrect: true, rationale: 'That is the correct reading, and it has two parts. First, the evidence: faster processing and high adoption are outputs; unchanged maverick spend and unchanged cycle time are outcomes, and the outcomes are what the programme was funded for. Second, the diagnosis: a process that gets faster without changing the cycle time of a competitively sourced order is a process that was automated as it ran, including the parts where a requester waits for something the flow never resolved. The measurement itself needs correcting, because a programme reporting only its own outputs cannot be evaluated.' },
        { text: 'The programme should be judged on the 400,000 of investment against the transaction-cost reduction, which is the figure the business case was built on.', isCorrect: false, rationale: 'That is a return-on-investment calculation, and it is legitimate, but it is a separate question from whether the programme did what it was for. If the business case promised cycle time and maverick reduction, then the correct measurement is against the promise, and the transaction-cost saving is an unpromised benefit rather than a defence. A programme that delivers only its unpromised benefits while missing its stated ones has a decision to take about the next phase, and it is not the decision to stop measuring.' }
      ],
      principle: 'Outputs are not outcomes. A programme that reports only what it produced cannot be evaluated against what it was for.'
    },
    {
      type: 'mcq',
      q: 'Which single change most reliably reduces maverick spend?',
      options: [
        { text: 'Lowering the card limit, so that small purchases go through the approved route instead.', isCorrect: false, rationale: 'Lowering the limit pushes the demand somewhere, and the somewhere is usually an expense claim, a personal card or a request to a supplier the requester already knows. The transaction is harder to see and easier to justify after the fact, and the administrative cost lands with the requester. The limit is a control, but it is a control on a route the organisation has not designed, and the workaround simply relocates the spend out of sight.' },
        { text: 'A guided-buying layer that presents the requester with the right choice for their need, so the approved route is the easy route.', isCorrect: true, rationale: 'This is the mechanism that works, because maverick spend is a routing decision made by someone who usually does not know a better route exists. A requester who searches for gloves and is shown the contract price and the expected delivery date has nothing to gain from going around it, and the requester who needs something that is not on the catalogue is directed to the exception route where the request can be justified and reviewed. This is why adoption and maverick rate are different measures: a system can be well used and still be routed around if it is slower than the alternative.' },
        { text: 'Tightening the approval workflow so that every requisition is reviewed before it is released.', isCorrect: false, rationale: 'A longer approval route applied to everything reduces the number of transactions that complete, and it does so most heavily on the low-value, high-frequency requests that make up most of the maverick spend. It also trains requesters that the system is an obstacle, which is exactly the behaviour that produces routing-around. Approving the right transactions quickly and the risky ones slowly is the design; approving everything slowly is a tax.' },
        { text: 'Publishing a spend policy that states all purchases must go through the approved route.', isCorrect: false, rationale: 'A policy is necessary and it is not sufficient, and on its own it changes very little. The people who place the transactions are rarely the people who write the policy, and a policy tells them what is expected without giving them a reason to comply or a route that is easier than the alternative. Policies shape the exceptions that get approved and the tone of the conversation; they do not change the path of a request at 4pm on a Friday.' }
      ],
      principle: 'Maverick spend is a routing decision. Make the approved route the easy one, and give the requester somewhere legitimate to go when it does not fit.'
    },
    {
      "type": "scenario",
      "context": "A guided-buying catalogue covers the 300 most frequently bought items across four business units. After six months, 71 percent of the catalogue items are ordered through it by value, but the transaction count is only 22 percent. What does this tell you?",
      "q": "What is the correct interpretation?",
      "options": [
        {
          "text": "The catalogue is working, because 71 percent of value is being ordered through it.",
          "isCorrect": false,
          "rationale": "The value figure is the one that gets reported, and it is the one that flatters. 71 percent of value through a catalogue with 300 items means the high-value items are being bought on contract, which was never in doubt. The 22 percent of transactions is the other half of the picture, and it says most of the buying still happens outside the catalogue, which is where the maverick spend and the unreconciled balances live."
        },
        {
          "text": "The high-value tail is under control but the high-frequency tail is not, and the design work is in the tail rather than in the catalogue.",
          "isCorrect": true,
          "rationale": "That is the correct reading and it points at the right work. The catalogue is doing its job on the items it was designed around, and the design is sound there. The transaction count says something different: most of the ordering events are still not going through the catalogue, which means either the catalogue does not cover what people actually buy, or it is slower than the alternative, or the fields it demands are too demanding. All three are design findings, and all three are fixed by looking at the requester journey and the exception data rather than by adding reminders."
        },
        {
          "text": "The transaction count is low because the remaining items are genuinely low value and not worth controlling.",
          "isCorrect": false,
          "rationale": "That is the assumption the low transaction count is usually given, and it is the one that has to be tested rather than assumed. Low-value and high-frequency is exactly the profile that carries the administrative cost, the duplicate payments, the unapproved spend and the reconciliation exposure, because each transaction is a small amount of money attached to a disproportionate amount of process. Assuming it away is how a category stays unmanaged for years while the headline number looks fine."
        },
        {
          "text": "The catalogue should be widened to cover more items until the transaction count rises above the value percentage.",
          "isCorrect": false,
          "rationale": "That is optimising the metric rather than the outcome, and it makes the catalogue worse. Widening it to capture more low-value transactions puts more items through a controlled flow that may be slower and more demanding than the way people currently buy, which reduces adoption further and adds cost without adding control. The number that matters is not the transaction count in isolation: it is the share of spend outside the agreed route, and that has to be read by value and by count together before anything is changed."
        }
      ],
      "principle": "Read adoption by value and by transaction count together. Value tells you the tail is controlled; count tells you whether the process is being used."
    },
    {
      "type": "mcq",
      "q": "What is the most common reason a digital procurement programme fails to deliver the commercial outcome it was funded for?",
      "options": [
        {
          "text": "The platform was not integrated with the enterprise resource planning system, so data had to be re-keyed.",
          "isCorrect": false,
          "rationale": "This is a genuine and frustrating cause, and it is the one people name because it is visible and fixable. It is not the most common, and fixing it is not sufficient. Plenty of well-integrated programmes still deliver the same commercial outcome, because the integration carried the process faithfully, including the parts that did not work. A clean data flow through a bad process is still a bad process, and it is now faster."
        },
        {
          "text": "The process was automated as it ran, workarounds and all, instead of being redesigned first.",
          "isCorrect": true,
          "rationale": "This is the most common cause and it is structural rather than technical. The workarounds exist because the process does not fit the work, and the process does not fit the work because it was never redesigned. A platform makes those workarounds permanent and harder to remove, because they are now encoded in configuration. The remedy is not a better configuration; it is going back and deciding what the process should do, which is a slower and less comfortable project than the one that was funded."
        },
        {
          "text": "The savings were claimed on the wrong baseline, so finance rejected the programme.",
          "isCorrect": false,
          "rationale": "This does cause a serious problem, and it is one of the most common reasons procurement credibility suffers. But it is a measurement failure downstream of a design decision, and it is a different failure from the one described here. The programme can deliver a genuine improvement and still have its savings rejected, which is why baseline discipline matters independently of whether the process was redesigned."
        },
        {
          "text": "The requesters did not adopt the new route, so the programme delivered only the transaction-cost reduction.",
          "isCorrect": false,
          "rationale": "This is a symptom rather than a cause, and it is the symptom of the cause above. Requesters route around a process because it does not fit their work, and the programme treats that as a communication problem rather than as the design finding it is. Where a new route is slower or more demanding than the old one, the workaround is a rational response and the numbers will show it."
        }
      ],
      "principle": "Redesign the process first. A platform that faithfully encodes a bad process produces the same bad outcome, faster and harder to unpick."
    }
 ],
  relSop: 'sop-procurement-intake',
  rel: {
    sops: ['sop-procurement-intake', 'sop-procurement-audit', 'sop-supplier-evaluation'],
    checklists: ['cl-procurement-audit', 'cl-exception-approval', 'cl-procurement-file-completeness'],
    templates: ['tpl-exception-request', 'tpl-procurement-exception'],
    calcs: ['calc-po-value-check', 'calc-supplier-concentration'],
    decisions: ['approve-exception', 'sourcing-method'],
    kpis: ['kpi-maverick-spend', 'kpi-cycle-time', 'kpi-sum'],
    concepts: ['c-procure-to-pay', 'c-maverick-spend', 'segregation-of-duties', 'audit-trail']
  },
  labMission: {
    title: 'Mission 11.1: Design a Digital Sourcing Route and Measure Its Outcome',
    desc: 'Map a real transaction as it actually runs, design the target flow with the control built in, and set the measures that would show whether it worked.',
    tasks: [
      'Map the transaction as it really runs, including the workarounds, the re-keying and the exceptions, and count the manual touches.',
      'Identify every field that is entered more than once and state where it is captured and how it is validated.',
      'Design the target flow with the approval threshold, the cost centre rule and the segregation of duties built into the workflow rather than displayed on it.',
      'Write the exception route with its owner, its response time and its reporting, and decide the measures that would show whether the change worked.'
    ],
    ctaLabel: 'Open the Procurement Audit checklist',
    ctaHref: '#/cl/cl-procurement-audit',
    secondaryLabel: 'Review the File Completeness checklist',
    secondaryHref: '#/cl/cl-procurement-file-completeness'
  },
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-spend-analytics',
  title: 'Spend Analytics and the Spend Cube',
  module: 'Module 11: Digital Procurement, Analytics and Category Strategy',
  kicker: 'Function 11.2',
  tagline: 'Collect, cleanse, classify, analyse. Most of the work is the first three.',
  desc: 'Building spend visibility that survives contact with the data: the spend cube, the taxonomy, the cleansing, and the analysis techniques that actually find money.',
  duration: '15 mins',
  lifecycleStage: 'Stage 1: Business Need Identification',
  lifecycleDesc: 'Spend analysis is the input to every category strategy, and its quality determines whether the strategy is worth anything.',

  what: 'Spend analytics is the systematic examination of what the organisation buys, from whom, for what, for which business unit and at what price, in order to find where money is being lost and where the organisation has leverage. The standard model is a cube: a multi-dimensional view of the same spend, sliced on axes such as supplier, category and cost centre. The technique works because any single view is misleading. One supplier with a hundred purchase orders looks fragmented and invites consolidation; the same spend viewed as a category with a hundred suppliers across eleven business units looks like a tail that no one manages.',
  why: [
    'Every commercial decision is a comparison, and a single-axis view cannot be compared with anything. The cube is what makes "the same spend" a thing that can be sliced two ways, and the comparison is the point.',
    'The cleansing is most of the work and it is where projects die. Supplier names, category coding and cost centre mapping are each wrong in a different way, and until they are right every number that comes out of the cube is a number nobody will act on.',
    'The tail is where the money is. In a typical enterprise, a few hundred suppliers hold most of the value and several thousand hold most of the transactions, and the second group is where the unmanaged spend and the unreconciled balances live.',
    'Analysis is only worth what the action is. A finding with no named owner, no supplier to put it to and no date is a slide, and the next cycle produces the same finding with a new chart.'
  ],
  when: [
    'When a category strategy is being written, because the spend analysis is the input that tells you where the money and the opportunity are.',
    'When a business unit asks for a saving and the current position is not known, which is more often than anyone admits.',
    'When a supplier is being consolidated, because a spend view that only counts purchase orders will tell you the opposite of the truth about how many suppliers there really are.',
    'When a category has been "sourced" and the addressable spend has not moved, which usually means the analysis was done on contract data only.'
  ],
  raci: [
    { role: 'Category Manager', resp: 'Accountable for the analysis, the findings and the actions, and for taking them to the supplier with a named owner and a date.' },
    { role: 'Spend Data Analyst', resp: 'Responsible for the extract, the cleansing, the classification, the cube and the analysis technique, and for documenting the method.' },
    { role: 'Finance / Controller', resp: 'Consulted on the data sources, the treatment of credits, accruals and intercompany, and on the reconciliation of the analysis back to the ledger.' },
    { role: 'Business Unit Requester', resp: 'Responsible for confirming the business unit and cost centre attribution, and for the demand and specification behind the finding.' },
    { role: 'Procurement Lead', resp: 'Responsible for the quality standard the analysis must meet before it is used in a sourcing event or a claim of saving.' }
  ],
  inputs: [
    'Twelve months of spend at the lowest level the source systems hold: invoice line, not purchase order, and not a monthly category summary.',
    'The supplier master with identifiers, names, parent and child relationships, and country.',
    'The category and commodity classification the organization will actually use, and a mapping from the codes the source systems emit.',
    'The cost centre and business unit hierarchy, and the mapping from the codes in the source data to it.',
    'The reconciliation back to the ledger, so that the analysis total ties to the financial statement and the difference is explained.'
  ],
  outputs: [
    'A cleansed and classified spend cube, with the cleansing rules and the exceptions documented.',
    'A category and supplier view that reconciles to the ledger, with the difference between the analysis and the accounts explained.',
    'A view of the tail: transaction count by supplier, and the transactions that fall outside every agreed route.',
    'A set of findings, each with the value, the evidence, the named owner and the date.',
    'A baseline that the savings claim will later be measured against, locked before any action.'
  ],
  controls: [
    'The analysis is reconciled to the general ledger, and the difference is explained rather than absorbed. A spend analysis that does not tie to the accounts is a slide, not a baseline.',
    'The cleansing rules are documented and repeatable, so the same analysis can be rerun and compared. An analysis that cannot be reproduced cannot be defended.',
    'One taxonomy is used across the analysis, the category strategy and the sourcing documents, because a finding under one taxonomy and a strategy under another are not comparable.',
    'Every finding names the action, the owner, the value and the date before it leaves the analysis, and findings without all four are not reported.',
    'The baseline is locked before the action. Re-deriving the baseline after the result is known is how savings programmes lose their finance sign-off.'
  ],
  mistakes: [
    'Analysing purchase order data instead of invoice lines, which misses the purchases that never became an order and the spend that arrived on a card.',
    'Using free-text descriptions as the category, so that "steel", "stainless steel" and "SS316" become three categories and a consolidation opportunity disappears into the noise.',
    'Fixing the category coding but not the supplier identities, so that one supplier appears as eleven and the "consolidate this" finding is lost.',
    'Reporting findings that are true and unowned, and then finding the same findings in the next cycle with a different chart.',
    'Setting the baseline after the negotiation, which is the most reliable way to lose the finance sign-off on a saving that genuinely happened.'
  ],
  bestPractices: [
    'Start with the reconciliation, not the chart. If the analysis does not tie to the ledger, nothing in it will survive the first finance review.',
    'Build the cube once, with agreed dimensions, and reuse it. The value is in the comparison across the axes, not in any single view.',
    'Fix the supplier and category identities before the analysis, because the findings are a function of the grouping and a wrong grouping gives a wrong answer with total confidence.',
    'Look for the patterns, not the totals: a supplier with a wide price spread, a category with a long tail of one-off buyers, a business unit paying above the market for the same specification.',
    'Turn every finding into a named action with a date before it leaves the analysis, and hold the category review to it.'
  ],
  terms: [
    { term: 'Spend Cube', def: 'A multi-dimensional view of spend, sliced on axes such as supplier, category, business unit, cost centre, geography and time, so that the same money can be read as a consolidation opportunity, a tail or a maverick problem depending on which axis is used.' },
    { term: 'Taxonomy', def: 'The agreed classification structure for what the organisation buys. A spend analysis is only comparable with another spend analysis if both used the same taxonomy, and the taxonomy has to be one the business recognises as its categories.' },
    { term: 'Cleansing', def: 'The work of correcting and normalising the data before analysis: deduplicating supplier records, mapping free text to the taxonomy, correcting cost centres and resolving the units and currencies. It is usually most of the elapsed time in a spend project and it is where the reliability is decided.' },
    { term: 'Addressable Spend', def: 'The portion of spend that procurement could realistically influence, after removing the genuinely non-addressable: utilities, taxes, rent, payroll and anything contractually fixed. Addressable spend is the denominator for the coverage measures, so overstating it makes performance look better than it is.' },
    { term: 'Maverick Spend', def: 'Spend placed outside the agreed sourcing route. It is found in the cube by slicing spend by route and order channel against spend by supplier and category, and the gap between the two views is usually the first useful finding.' },
    { term: 'Price Variance', def: 'The difference between the price paid and a reference price for the same specification or requirement. It is only meaningful when the specification is comparable, which is why price variance analysis depends on the specification work rather than on the data.' },
    { term: 'UNSPSC', def: 'The United Nations Standard Products and Services Classification, a hierarchical code for what is bought. It is useful for mapping between organisations and for comparison with external benchmarks, and it is only useful if it is mapped to the categories the business actually manages.' }
  ],
  thinkingPoints: [
    {
      quote: 'The spend cube does not find the money. It shows you where the money is, which is a different and more useful thing.',
      explanation: 'A cube is a way of looking, and what it shows depends entirely on how the data was cleaned and how the axes were defined. The value is not that a chart appears, it is that the same spend can be read along an axis that makes a pattern visible. A category read across business units shows tail. A supplier read across categories shows leakage. A price read across time shows a drift that nobody noticed. The technique is a discipline in asking the right question of clean data, and the chart is the last step.',
      realWorldExample: 'A healthcare provider spent 180,000 on a two-week analysis and found 2.9 million of spend that no system had ever seen: it sat in corporate card transactions, in purchase orders raised without a supplier, and in invoices paid outside the AP workflow. The analysis itself took a week; the cleansing of supplier records took three. The finding was not subtle once the cube existed: viewed by channel, 38 percent of transactions were in a channel nobody reported. Two years later the same provider ran the analysis again, and the number had moved from 38 percent to 6 percent, which is the only way anyone could tell whether the programme had worked.',
      reflectionPrompt: 'For your own organisation: pick one category and slice its spend three different ways. What does each view tell you that the other two do not? If the views all say the same thing, the analysis is one-dimensional and has not yet earned its cost.'
    }
  ],
  sopSteps: [
    {
      title: 'Reconcile the Source Data to the Ledger Before Anything Else',
      role: 'Spend Data Analyst',
      desc: 'Extract invoice-level spend for the period, reconcile the total to the general ledger for the same scope, and document the difference line by line.',
      control: 'The reconciliation is signed off by finance before any analysis is circulated, and the treatment of credits, accruals and intercompany is stated.',
      record: 'Reconciliation statement with the analysis total, the ledger total, the differences and their causes.',
      pitfall: 'Starting the analysis on an unreconciled extract and discovering the difference in the finance review, after the findings have been circulated.'
    },
    {
      title: 'Cleanse the Supplier, Category and Cost Centre Identities',
      role: 'Spend Data Analyst',
      desc: 'Deduplicate supplier records to the true trading entity, map the source category codes and free text to the agreed taxonomy, and correct the cost centre and business unit attribution.',
      control: 'The cleansing rules are written down and the exceptions are listed rather than silently dropped, and the category mapping is agreed with the business before the analysis is run.',
      record: 'Cleansing log with the rules applied, the records merged, the unmapped items and the business unit confirmations.',
      pitfall: 'Mapping free text to the taxonomy with a rule that catches the common cases and quietly misfiles the rest.'
    },
    {
      title: 'Build the Cube and Read It Along Each Axis',
      role: 'Category Manager',
      desc: 'Build the multi-dimensional view and read it along the axes that matter: category and supplier for concentration, transaction count for the tail, channel for maverick spend, and time for price drift.',
      control: 'Each finding is traced back to the underlying transactions, so any number can be opened and checked.',
      record: 'Spend cube with the findings, each traced to the transactions that produce it.',
      pitfall: 'Producing the cube and reading it along one axis, which is a report rather than an analysis.'
    },
    {
      title: 'Turn the Findings into Actions with Owners and Dates',
      role: 'Category Manager',
      desc: 'For each finding, state the value, the action, the owner and the date, and decide what is being pursued: a consolidation, a renegotiation, a specification change, a demand change or a control change.',
      control: 'No finding is reported without all four attributes, and the owner accepts the finding before it is escalated.',
      record: 'Finding register with the value, action, owner, date and the intended route to the supplier.',
      pitfall: 'Reporting a large number of true findings and discovering that none of them was owned, so none of them moved.'
    },
    {
      title: 'Lock the Baseline and Set the Re-Run',
      role: 'Procurement Lead',
      desc: 'Lock the baseline for each action before the commercial conversation, and schedule the analysis to be rerun on the same rules so the movement can be measured.',
      control: 'The baseline is dated and agreed with finance before the action, and the rerun uses the same cleansing rules so the comparison is valid.',
      record: 'Locked baseline per action with the finance agreement, and the re-run schedule.',
      pitfall: 'Re-running the analysis with slightly different rules, so the before and after cannot be compared and the programme cannot be evaluated.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'A category manager has found that 1.4 million of annual spend sits with 340 suppliers, none of which exceeds 30,000 a year, and each of which is used by a different business unit. The proposal is to consolidate onto five suppliers. What should the analysis do next?',
      q: 'What is the correct next step?',
      options: [
        { text: 'Consolidate onto the five largest, because the volume is there to make it worth a supplier\'s attention.', isCorrect: false, rationale: 'The five largest are the ones most likely to be serving requirements that the other 335 are also serving, and consolidating on volume alone is how a category ends up with one supplier for a standard item and a dozen emergency purchases for everything else. The volume is necessary for a negotiation but it says nothing about whether the demand is standardisable, which is the question that has to be answered before a panel is chosen.' },
        { text: 'Slice the same spend by category, business unit and specification to find out whether the 340 are supplying the same requirement or 340 different ones, and where the standardisable demand actually is.', isCorrect: true, rationale: 'That is the analysis that tells you whether there is a consolidation opportunity or a specification problem. If the demand is genuinely standard across business units, the panel is the answer and the aggregate volume is real leverage. If it is not standard, the finding is a specification and demand problem and the answer is a catalogue and a demand-management intervention, which will deliver more and cost nothing to negotiate. The same 1.4 million reads completely differently on a different axis, which is the whole argument for the cube.' },
        { text: 'Run a competitive event across the 1.4 million, because competition will establish the real market price for the category.', isCorrect: false, rationale: 'An event across 340 suppliers and 30,000 a year each will not return usable bids, and it will consume the team\'s attention for a quarter. Competition is the right instrument once the demand is understood and standard enough to be bid against. Running it before that produces a set of bids across subtly different scopes, which is the quote-comparison problem all over again, at a hundred times the scale.' },
        { text: 'Check whether the spend is addressable, because 1.4 million of small-value purchases may be mostly non-addressable.', isCorrect: false, rationale: 'Addressability is worth checking, but it is the wrong check to lead with here, and the reasoning is wrong: small-value spend is often highly addressable, because it is the fragmented spend that a framework or a catalogue fixes. The finding that matters is whether the demand behind the 340 suppliers is the same demand, and that is a question about the cube, not about the addressability definition.' },
      ],
      principle: 'Before you consolidate, find out whether the demand is the same demand. The same spend on a different axis gives a different answer.'
    },
    {
      type: 'mcq',
      q: 'Why does spend analysis need a multi-dimensional view rather than a single report by supplier?',
      options: [
        { text: 'Because the source systems only hold spend at invoice-line level, and a single report loses information.', isCorrect: false, rationale: 'The reason is about the questions being asked, not about the data granularity. A single-axis view is perfectly good at answering one question: how concentrated is this spend with this supplier. It is the wrong tool for every other question, and the risk is that the one question it answers well is the one that is easiest to produce, so it becomes the analysis.' },
        { text: 'Because the same spend read along a different axis reveals a different pattern, and it is the pattern that identifies the action.', isCorrect: true, rationale: 'That is the point of the cube. Concentration, tail, maverick spend, price drift and category leakage are all invisible in any single view and obvious in the right one. A supplier report will show you a long tail of small suppliers and suggest consolidation; a category-and-business-unit view of the same money will show a standard specification bought in a fragmented way, which is a catalogue answer rather than a negotiation one. Acting on the first reading is how a procurement team consolidates the wrong thing.' },
        { text: 'Because a single report cannot be reconciled to the general ledger, and the reconciliation requires the full cube.', isCorrect: false, rationale: 'A single-axis report reconciles to the ledger perfectly well, because the total is the same whatever axis you slice it on. The reconciliation is about the extract and the scope, not the presentation, and conflating the two leads to a belief that the cube is a control rather than a technique.' },
        { text: 'Because the finance function requires a cube for any category strategy to be approved.', isCorrect: false, rationale: 'The requirement is not a format. If finance required a particular cut of the data, that would be a genuine control to satisfy, but the reason a cube is used is that it is the technique that finds things. Building a cube because it was asked for, and then reading it along one axis, is the same failure as a single report with more effort spent on it.' }
      ],
      principle: 'A cube is a technique for asking the same money different questions. Read it on the axis that matches the decision.'
    },
    {
      "type": "scenario",
      "context": "A spend analysis finds 340 suppliers in a category where the top 5 account for 60 percent of the value and the remaining 335 account for 40 percent, spread across 11 business units. The category manager wants to run a consolidation event. What should the analysis establish first?",
      "q": "What is the correct next step?",
      "options": [
        {
          "text": "Check whether the spend with the 335 is for the same specification as the spend with the top 5, because that determines whether consolidation is even possible.",
          "isCorrect": true,
          "rationale": "That is the question that decides everything, and it is a question about the demand rather than about the supplier list. If the remaining 40 percent is the same requirement, there is a consolidation and the 60 percent is the volume that makes it negotiable. If it is not the same requirement, the panel is the wrong instrument and the money is in specification and demand management, which is entirely inside the buyer's control and does not need a supplier to agree to anything."
        },
        {
          "text": "Confirm that the 335 suppliers are financially stable, because an event with a financially weak supplier in the panel is a risk.",
          "isCorrect": false,
          "rationale": "Financial stability matters, and it is checked before a panel is appointed rather than as the question that decides whether to run the event. It does not tell you whether the demand is standardisable, which is the thing that determines whether consolidation is the right answer. And if the demand is not standard, the right answer is not a panel, so the financial check is a step in a route that may be the wrong route entirely."
        },
        {
          "text": "Run the event to establish the market price, since no internal benchmark exists for the fragmented portion.",
          "isCorrect": false,
          "rationale": "An event across 335 suppliers and small volumes does not produce usable bids or a usable benchmark; it produces a large set of bids across subtly different scopes. And the benchmark question has a better internal answer: the same category is often already being bought at a known price elsewhere, or the specification work can produce a should-cost, which is a stronger benchmark than a market average because it is independent of the suppliers in the room."
        },
        {
          "text": "Establish how much of the fragmented spend is on contract already, because anything off contract is the real opportunity.",
          "isCorrect": false,
          "rationale": "That is a useful view and it is a channel analysis rather than a demand analysis, so it is the second question rather than the first. The off-contract proportion tells you how much is exposed; it does not tell you whether the exposed demand could be brought together. Off-contract spend with a non-standard requirement cannot simply be moved onto a contract, and treating the two as the same opportunity is how a category gets a panel and keeps the same fragmentation."
        }
      ],
      "principle": "Consolidation requires standardisable demand. Ask what is being bought before you ask who is selling it."
    },
    {
      "type": "mcq",
      "q": "Why must a spend analysis reconcile to the general ledger before the findings are used?",
      "options": [
        {
          "text": "Because the finance function will not sign a saving that is measured against a baseline it cannot reconcile.",
          "isCorrect": false,
          "rationale": "That is a consequence and a real one, but it puts the reconciliation at the wrong point. The reconciliation is not there to win a signature; it is there so that the analysis is measuring the organisation's money rather than an extract that happens to look like it. A finding built on an unreconciled number can be entirely wrong about the size of the opportunity, and the finance review will find that out later, at a point where the commercial action has already been taken."
        },
        {
          "text": "Because the analysis is the baseline, and a baseline that does not tie to the accounts is a number finance cannot use and a saving that cannot be defended.",
          "isCorrect": true,
          "rationale": "That is the reason, and it is a control reason rather than a presentational one. The spend analysis is the baseline against which every future saving is measured, and a baseline that does not tie to the accounts produces savings figures that cannot survive their own audit. Reconciling first also finds real problems early: unrecorded spend, misposted cost centres, duplicated invoices, credits applied in the wrong period, and intercompany flows that are not spend at all."
        },
        {
          "text": "Because an unreconciled analysis cannot be reproduced, and an analysis that cannot be reproduced cannot be rerun for comparison.",
          "isCorrect": false,
          "rationale": "Reproducibility is a separate and important requirement, and it is about the cleansing rules being documented rather than about the reconciliation. The two are often confused because both are about rigour. Reconciliation is about whether the total is the organisation's money; reproducibility is about whether you can run the same analysis again and compare it with the last one."
        },
        {
          "text": "Because the accounting treatment of credits, accruals and intercompany changes the addressable spend, and the analysis has to use the same treatment finance uses.",
          "isCorrect": false,
          "rationale": "That is one of the things reconciliation checks, and it is a real item, but it is a component rather than the reason. The reason is simpler: the baseline is the number every future claim is measured against, so it has to be a number the accounts agree with. Treating it as a technical reconciliation exercise misses the point that it is the foundation of every savings claim the function will ever make."
        }
      ],
      "principle": "The spend analysis is the baseline for every future saving. If it does not tie to the accounts, nothing built on it survives its own audit."
    }
 ],
  relSop: 'sop-savings-calculation',
  rel: {
    sops: ['sop-savings-calculation', 'sop-procurement-audit', 'sop-contract-renewal'],
    checklists: ['cl-savings-validation', 'cl-procurement-audit'],
    templates: ['tpl-savings-calculation', 'tpl-savings-validation', 'tpl-cost-avoidance'],
    calcs: ['calc-supplier-concentration', 'calc-budget-vs-actual', 'calc-savings-analysis'],
    decisions: ['consolidate-suppliers', 'supplier-concentration'],
    kpis: ['kpi-sum', 'kpi-maverick-spend', 'kpi-savings', 'kpi-ppv'],
    concepts: ['spend-analysis', 'c-spend-management', 'direct-indirect-spend', 'maverick-spend', 'savings-baseline']
  },
  labMission: {
    title: 'Mission 11.2: Slice a Category Three Ways and Turn the Findings into Actions',
    desc: 'Take the spend data model, read the same category along three different axes, and convert the findings into owned actions.',
    tasks: [
      'Load the spend data model and reconcile the total to a figure you can defend, noting any difference and its cause.',
      'Read the category three ways: by supplier for concentration, by transaction count for the tail, and by category and business unit for standardisation.',
      'For each view, write the pattern it reveals and the action it implies: a consolidation, a catalogue, a specification change or a control change.',
      'Turn each finding into a value, an owner and a date, and lock the baseline before any commercial conversation begins.'
    ],
    ctaLabel: 'Open the Spend Data Model',
    ctaHref: '#/spend-model',
    secondaryLabel: 'Review the Savings Validation checklist',
    secondaryHref: '#/cl/cl-savings-validation'
  },
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-category-strategy',
  title: 'Category Strategy and Sourcing Plan',
  module: 'Module 11: Digital Procurement, Analytics and Category Strategy',
  kicker: 'Function 11.3',
  tagline: 'The deliverable that sits above everything else, and that most people are never asked to write.',
  desc: 'Producing a category strategy: scope, importance, spend, market, demand, the cost-risk-value trade-off, supplier selection, contract structure and an implementation plan.',
  duration: '15 mins',
  lifecycleStage: 'Stage 4: Requirement Definition and Scope Formulation',
  lifecycleDesc: 'A category strategy is the plan for a defined body of spend, and it is the document that everything else in the category hangs from.',

  what: 'A category strategy is a deliberate plan for how the organisation will manage a defined body of spend: what the category is, why it matters, where the money and the risk sit, what the market looks like, what the demand should be, how the supply should be structured, which suppliers will be selected and on what basis, what the contract will look like, and what will be done when. It is not a list of actions and it is not a summary of a sourcing event. It is the reasoning that decides whether a competitive event is the right instrument, what the event should be measured against, and what happens if the market does not behave as expected.',
  why: [
    'Most sourcing events fail for a reason that was knowable before the event: the requirement was not standard, the market was not what the category file said, or the decision was never properly framed as a make-or-buy. The strategy is where those questions get asked.',
    'The trade-off has to be made explicitly. Cost, risk, supply continuity, innovation and sustainability pull in different directions, and a strategy that only lists a cost target has made the trade-off by default rather than by decision.',
    'A strategy gives the organisation a position. Without one, every negotiation starts from the supplier\'s position, because the only reference the buyer has is the last price.',
    'The implementation plan is what makes it real. A strategy with no owner, no sequence and no date is a document, and the category will be re-sourced by whoever inherits the file.'
  ],
  when: [
    'When a category is being re-planned, which is normally 6 to 12 months before the current agreement expires.',
    'When a category has been sourced repeatedly without the commercial position improving, which usually means the strategy was never written.',
    'When the business is asking for savings from a category and nobody can say what the category is actually for.',
    'When a new requirement arrives that might belong in an existing category rather than starting a new one, because the boundary is what determines the leverage.'
  ],
  raci: [
    { role: 'Category Manager', resp: 'Accountable for the strategy, its evidence, the recommendation and the implementation plan, and for the resource to deliver it.' },
    { role: 'Business Sponsor', resp: 'Responsible for the demand, the specification, the acceptance of the trade-off between cost and continuity, and the internal change that follows.' },
    { role: 'Procurement Lead', resp: 'Responsible for the consistency of the strategy with the organisation\'s policy and portfolio, and for the plan that resourced it.' },
    { role: 'Finance / Controller', resp: 'Consulted on the baseline, the savings treatment, the funding of any investment the strategy requires, and the accounting consequences of the contract structure chosen.' },
    { role: 'Legal Counsel', resp: 'Consulted on the contract structure the strategy selects and on the risk allocation implied by it.' },
    { role: 'Supplier Relationship Manager', resp: 'Responsible for the current supplier position, the relationship history and the reality of switching, which the strategy has to reflect.' }
  ],
  inputs: [
    'The category scope, stated as what is in and what is explicitly out, because the boundary is what determines the leverage.',
    'The spend analysis and the addressable spend figure, reconciled and current.',
    'The market view: how many credible suppliers, how concentrated, how substitutable, and what the switching cost really is.',
    'The demand and specification view, including the forecast and the standardisation opportunity.',
    'The current position: contract terms, performance, the relationship, and the cost of changing anything.'
  ],
  outputs: [
    'A category charter: scope, importance, the objectives and the measures that will show whether they were met.',
    'A market assessment with the supplier landscape, the concentration, the barriers to entry and the switching cost.',
    'A stated trade-off between cost, risk, continuity, innovation and sustainability, with the reasoning recorded.',
    'A recommended sourcing route and contract structure, with the alternatives and why they were not chosen.',
    'An implementation plan with the sequence, the owners, the dates, the dependencies and the investment required.'
  ],
  controls: [
    'The scope is written down before the analysis, and anything excluded is recorded, because a category that includes everything has no leverage over anything.',
    'The objectives and their measures are agreed with the business sponsor before the market is engaged, so the strategy cannot be written to fit the answer the market gives.',
    'The trade-off between cost and continuity is decided explicitly and recorded with the reasoning, not left to the negotiation.',
    'The strategy is approved with a resourcing commitment, because a strategy that funds nothing changes nothing.',
    'The strategy has a review date and a trigger for early review, and the assumptions it rests on are listed so that a change in one of them is noticed.'
  ],
  mistakes: [
    'Writing the strategy after the sourcing event, so it becomes a description of what the market produced rather than a plan for what the organisation wants.',
    'Defining the category so broadly that it includes spend with no common supply market, which destroys the leverage the strategy was meant to create.',
    'Setting a savings target before the baseline and the addressable spend are known, which produces a number that cannot be defended.',
    'Leaving the trade-off between cost and supply continuity unstated, so it is settled by whoever is more impatient in the negotiation.',
    'Writing the strategy with no implementation plan, and then re-sourcing the category when the agreement expires because nobody did anything with it.'
  ],
  bestPractices: [
    'Start with the scope and the boundary, because the category structure is the strategy before the strategy is written.',
    'State the objective as an outcome with a measure attached, and agree the measures with the business before you go to the market.',
    'Write down the trade-off explicitly, in a sentence a reader could disagree with. That is what makes it a decision.',
    'Do the demand and specification work before the market work, because the standardisation opportunity is usually larger than the price opportunity and it is entirely in the buyer\'s control.',
    'Plan the implementation in the same document, and resource it there, because a strategy that has to survive a budget cycle without a plan does not.'
  ],
  terms: [
    { term: 'Category Strategy', def: 'A deliberate plan for managing a defined body of spend: scope, importance, demand, market, sourcing route, contract structure, trade-offs and implementation. It is the reasoning that precedes and governs the sourcing events, not a summary of them.' },
    { term: 'Category Boundaries', def: 'The definition of what belongs in a category and, more importantly, what does not. Categories exist to aggregate leverage, so a boundary that is too wide destroys the commonality the aggregation depended on.' },
    { term: 'Addressable Spend', def: 'The share of category spend that procurement could realistically influence, after removing utilities, taxes, rent, payroll and anything contractually fixed. It is the denominator for coverage and it must be stated with the exclusions, because overstating it flatters every measure computed from it.' },
    { term: 'Total Cost of Ownership (TCO)', def: 'The whole cost of acquiring, operating, supporting and disposing of a product or service over its life, including the costs a unit price hides. In a strategy it is the basis on which suppliers are compared, and the comparison has to be made on the same life and the same assumptions for every option.' },
    { term: 'Porter\'s Five Forces', def: 'A framework for assessing how attractive a market is: the bargaining power of suppliers and buyers, the threat of new entrants and substitutes, and competitive rivalry. Used in a category strategy to judge whether a market will respond to competitive pressure.' },
    { term: 'SWOT Analysis', def: 'A structured assessment of the internal Strengths and Weaknesses and the external Opportunities and Threats. Useful in a market view, and weakest where it is treated as a list rather than as the input to a sourcing decision.' },
    { term: 'Demand Management', def: 'Reducing or shaping the requirement before it is sourced: standardising specifications, challenging volumes, consolidating buying positions and removing unnecessary demand. It is the only savings lever entirely inside the buyer\'s control.' },
    { term: 'Sourcing Plan', def: 'The sequenced schedule of sourcing events across the portfolio for a period, showing which categories are re-sourced when, what resources they need and how they interact. It is what turns a set of individual strategies into a programme.' }
  ],
  thinkingPoints: [
    {
      quote: 'The strategy is the position. If you have not written one, the supplier has written it for you, and you will not know what it says until you are negotiating.',
      explanation: 'A category strategy is not a summary of a market and it is not a list of actions. It is the set of decisions the organisation has taken, in advance, about how it will buy: what the demand should be, what the market looks like, what the trade-off is between cost and continuity, and what will be done about each. Negotiation is the point at which every one of those unstated positions is settled, and the party with no stated position has the weaker one by default. Writing the strategy is not a planning exercise that precedes the negotiation; it is the preparation for it.',
      realWorldExample: 'A food manufacturer renegotiated a 40,000-a-year ingredient contract with an incumbent for three years, each time conceding on price for continuity. The category strategy written in the fourth year found that 70 percent of the requirement was technically substitutable, that the specification dated from a product no longer sold, and that the market had two credible alternatives that had never been approached because the incumbent had been the incumbent for eleven years. The strategy also recorded the explicit trade-off: they were willing to pay 4 percent above the lowest market price for dual-sourced continuity on the 30 percent of the specification that was not standardisable. The negotiation that followed reached a price 9 percent below the incumbent\'s, not because of tactics, but because there was finally something to negotiate with.',
      reflectionPrompt: 'Take the last contract you renewed. Could you state, before the negotiation started, what the organisation\'s position on price, volume, term and continuity was? If the answer is that you worked it out across the negotiation, that is what the missing strategy was for.'
    }
  ],
  sopSteps: [
    {
      title: 'Define the Category Scope and Its Importance',
      role: 'Category Manager',
      desc: 'State what is in the category and what is explicitly out, and assess its importance by value, by supply risk and by the consequence of a disruption.',
      control: 'The scope and the exclusions are written down before the analysis and agreed with the portfolio, and the importance assessment covers risk and not only value.',
      record: 'Category charter with the scope, the exclusions and the value, risk and criticality assessment.',
      pitfall: 'Drawing the boundary so wide that the category has no common supply market, which is the most common way a strategy becomes useless.'
    },
    {
      title: 'Establish the Spend Baseline and the Demand View',
      role: 'Category Manager',
      desc: 'Reconcile the addressable spend, establish the baseline, and examine the requirement: where it is specified, where it is standardised, where it could be, and what the forecast says.',
      control: 'The baseline is locked and agreed with finance before the market is engaged, and the demand findings are confirmed with the business units that own them.',
      record: 'Reconciled addressable spend baseline and a demand and specification assessment with the standardisation opportunity.',
      pitfall: 'Reading the demand from the purchase orders rather than from the requirement, which shows what is bought rather than what is needed.'
    },
    {
      title: 'Build the Market View and the Switching Cost',
      role: 'Supplier Relationship Manager',
      desc: 'Map the credible suppliers, the concentration, the barriers to entry, the substitutability and what it would actually cost and take to move, including the internal cost of the switch.',
      control: 'The market view is evidenced and dated, and the switching cost includes the internal effort and the disruption, not only the price differential.',
      record: 'Market assessment with the supplier landscape, the concentration, the entry barriers and the switching cost estimate.',
      pitfall: 'Treating the price difference between the incumbent and an alternative as the switching cost, which ignores the qualification, the tooling, the training and the risk of the transition.'
    },
    {
      title: 'State the Trade-Off and Choose the Route and Contract Structure',
      role: 'Business Sponsor',
      desc: 'Decide explicitly what the organisation will not trade for price, choose between competing, single-source, dual-source or a new-supplier development route, and select the contract structure that carries the decision.',
      control: 'The trade-off is recorded in a sentence a reader could disagree with, and the route and contract structure are approved with the reasoning and the alternatives that were rejected.',
      record: 'Category strategy with the stated trade-off, the recommended route, the contract structure and the rejected alternatives.',
      pitfall: 'Leaving the trade-off unstated so that it is settled by whoever is more impatient at the negotiating table.'
    },
    {
      title: 'Resource, Sequence and Review the Implementation',
      role: 'Procurement Lead',
      desc: 'Turn the strategy into a plan: the sequence, the owners, the dates, the dependencies, the investment required and the savings tracking, and set a review date and an early review trigger.',
      control: 'The plan is resourced and approved in the same cycle as the strategy, and the assumptions the strategy rests on are listed so a change in one of them is noticed.',
      record: 'Implementation plan with the sequence, owners, dates, investment, savings tracking and the review date.',
      pitfall: 'Writing the strategy with no implementation plan, so the category is re-sourced at expiry because nobody acted on it.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'A category manager is told to write a strategy for the "Packaging" category. The analysis shows 11 million a year across 60 suppliers, of which 4 million is corrugated board bought in volume, 3 million is flexible packaging with 40 specification variants, and 4 million is specialist food-grade film supplied by two manufacturers. What should the strategy do?',
      q: 'What is the correct approach?',
      options: [
        { text: 'Keep it as one category, because the three segments share the same function and the business wants a single packaging number.', isCorrect: false, rationale: 'A single number is a reporting requirement, not a sourcing structure, and using the reporting structure as the category structure is how a strategy ends up with no leverage. The three segments have almost nothing in common commercially: corrugated is a commodity bought in volume from a deep market, flexible packaging with 40 variants is a specification problem, and specialist food-grade film has two credible suppliers and high switching costs. Aggregating them produces a strategy that has to be true for all three and is therefore true of none.' },
        { text: 'Split the category into three sub-categories with their own strategies, because the demand, the market and the leverage are different in each, while keeping the single reporting number.', isCorrect: false, rationale: 'The analysis is right and the framing is not: the sub-categories are the right unit for the strategy, and the single number is a consequence of how the finance function happens to report, not a constraint on how the category should be managed. Keeping the reporting structure would be a category structure designed to satisfy a report rather than to buy well, which is the same error as the previous option with an extra step.' },
        { text: 'Split the category into three sub-categories, each with its own strategy, route and contract structure, while reporting them together as one packaging line.', isCorrect: true, rationale: 'This is the correct answer and it is the discipline the category structure exists for: leverage comes from aggregating demand that shares a supply market. Corrugated board with volume in a deep market is a competitive event. Flexible packaging with 40 variants is a specification and demand-management problem, where the money is in the variants rather than in the price. Specialist food-grade film with two suppliers is a continuity and dual-source decision with a deliberately high price tolerance. One reporting line, three strategies, three different commercial answers, and each one traceable to its own demand and market.' },
        { text: 'Focus the strategy on the 4 million of corrugated board, because it is the largest segment and the most competitive, and leave the remainder to annual reviews.', isCorrect: false, rationale: 'Choosing the easiest segment because it is the most competitive puts the strategy where the work is already easy, and leaves 7 million of spend with no strategy at all. The 40 specification variants in flexible packaging is where the largest controllable saving is sitting, because specification is entirely in the buyer\'s hands, and the two-supplier food-grade film is where the biggest continuity risk sits. A strategy is a statement about where the organisation is going to spend its limited attention.' }
      ],
      principle: 'Categories exist to aggregate leverage. Split where the demand, the market and the risk differ, and aggregate only what genuinely shares a supply market.'
    },
    {
      type: 'mcq',
      q: 'In a category strategy, what is the purpose of stating the trade-off between cost and supply continuity?',
      options: [
        { text: 'To show the business that procurement understands the risks involved in the category.', isCorrect: false, rationale: 'That is a presentational purpose and it is not what a trade-off is for. The business can see whether procurement understands the category from the analysis. A trade-off exists to make a decision, and the test of a decision is that somebody could reasonably disagree with it and be wrong to do so.' },
        { text: 'To record what the organisation will and will not trade, so the negotiation has a stated position to defend.', isCorrect: true, rationale: 'That is the purpose. An unstated trade-off is settled by whoever is under more pressure in the negotiation, which is usually the buyer with a date. A stated one, in a sentence, with the reasoning, gives the negotiating team a position that survives the moment when the supplier pushes hardest on the thing the buyer was never willing to give up. It also protects the buyer from a second failure mode, which is buying continuity that nobody actually needed because the requirement was standardisable.' },
        { text: 'To satisfy the supplier performance review, which requires the risk position to be documented.', isCorrect: false, rationale: 'If a performance review requires it, that is a genuine requirement, but it is not the reason the trade-off earns its place. A trade-off documented only because a form asks for it will be written to close the form, and the point of stating it is to be able to act on it when the negotiation turns to that exact question.' },
        { text: 'To justify the savings figure, because a saving that trades away continuity needs to be shown to be a net benefit.', isCorrect: false, rationale: 'That confuses two different documents. The savings figure is a baseline and a measurement, and it does not need a risk argument to be defensible. The trade-off is a strategic decision about what to prioritise, and it is made in the strategy, before the number exists. A saving bought by accepting a continuity risk the business never agreed to is not a saving, which is a separate and more serious problem.' }
      ],
      principle: 'A trade-off you could disagree with is a decision. An unstated one is settled by whoever is more impatient in the room.'
    },
    {
      "type": "scenario",
      "context": "A category strategy recommends a dual-source model because the category is technically standardisable but the supply market has only two credible suppliers. The business sponsor says the price is 6 percent above the lowest market price and refuses to sign. What does the strategy need to do?",
      "q": "What is the correct response?",
      "options": [
        {
          "text": "Accept the 6 percent, because the strategy recommended it and the business must follow it.",
          "isCorrect": false,
          "rationale": "A strategy is a recommendation with evidence, not an instruction, and the business sponsor owns the trade-off. Accepting a 6 percent premium because the strategy said so reverses the decision: the whole point of stating the trade-off is that the organisation decides it, with the consequences in view. The strategy has done its job by making the choice explicit and priced; the sponsor is entitled to take a different view of it."
        },
        {
          "text": "Make the trade-off explicit in money and in risk: what the 6 percent buys in terms of continuity and exposure, what the alternative costs when the market fails, and then let the sponsor take the decision on the record.",
          "isCorrect": false,
          "rationale": "This is close, but it treats the strategy as something to be argued until the sponsor agrees, which is a negotiation dressed as a decision process. The evidence is the first half of what is needed, but the second half matters more: the trade-off has to be set out in a way that the business can own, with the consequence of each choice stated, and the decision recorded whichever way it goes. That is what turns a disagreement into a governance point."
        },
        {
          "text": "State the trade-off explicitly in a single sentence, price the risk exposure of the alternative, and take the decision to the sponsor for approval with the reasoning on the page.",
          "isCorrect": true,
          "rationale": "That is the correct sequence and the correct division of responsibility. The strategy names the trade-off, quantifies both sides, and recommends. The sponsor approves or rejects it, and either way the reasoning is recorded, so that a later disruption is judged against a decision that was actually taken rather than against an assumption nobody wrote down. A recorded decision to accept 6 percent for continuity is a defensible position; an unrecorded one is an exposure with no owner."
        },
        {
          "text": "Revise the recommendation to the 4 percent the business will accept, and keep the dual-source structure for the portion that matters.",
          "isCorrect": false,
          "rationale": "That is the recommendation being fitted to the answer, which is the opposite of a strategy and the reason the document exists. It also loses the point the strategy was making: the premium is the price of a specific, quantified exposure, and giving it back to hit a number is giving up the protection without changing the risk. If the exposure is not worth 6 percent, the right answer is to change the supply model, not the price expectation."
        }
      ],
      "principle": "The strategy recommends and prices the trade-off. The business decides it, on the record, whichever way it goes."
    },
    {
      "type": "mcq",
      "q": "Why does a category strategy need an implementation plan with owners and dates rather than a set of recommendations?",
      "options": [
        {
          "text": "Because a strategy without a plan is not approved, and approval is what makes it binding.",
          "isCorrect": false,
          "rationale": "Approval is part of it but it is not why the plan is necessary, and a strategy can be approved and still do nothing. The real reason is what happens between the strategy and the renewal: a category is re-sourced or is not, and a recommendation with no owner and no date simply does not get acted on during the intervening years, and the next generation inherits the file and the expiry date and starts again."
        },
        {
          "text": "Because a recommendation without an owner and a date is a document, and the category will be re-sourced at expiry by whoever inherits the file.",
          "isCorrect": true,
          "rationale": "That is the reason, and it is about the gap between the strategy and the event. A category strategy usually precedes the work by six to twelve months, and in that window the market moves, the business changes its demand, the people move on. A plan with owners, dates and dependencies is what keeps the strategy alive through that window and turns it into a sequence somebody is accountable for, and it is also what makes the savings tracking and the review date real rather than aspirational."
        },
        {
          "text": "Because the implementation plan is where the savings calculation is set out and therefore where the baseline is locked.",
          "isCorrect": false,
          "rationale": "The baseline is locked when the analysis and the objective are agreed, before the commercial conversation, and the implementation plan is downstream of that. A plan is a good place to track savings, and the tracking is one of its jobs, but the plan is not primarily a financial document and it is not what makes the baseline credible. A strategy with a good baseline and no plan still fails; a strategy with a plan and no baseline has a savings claim nobody can sign."
        },
        {
          "text": "Because the implementation plan is what the audit and the business review actually examine.",
          "isCorrect": false,
          "rationale": "The audit examines the controls, the approvals and the evidence, and a business review examines performance against the objectives. Both look at the plan, but neither makes it the reason it exists. The plan exists because strategies fail in the gap between the decision and the doing, and a plan is the only thing that closes that gap with named people and dates rather than with good intentions."
        }
      ],
      "principle": "A recommendation with no owner and no date is a document. The implementation plan is what survives the gap between the strategy and the renewal."
    }
 ],
  relSop: 'sop-procurement-lifecycle',
  rel: {
    sops: ['sop-procurement-lifecycle', 'sop-rfq', 'sop-contract-review', 'sop-contract-renewal'],
    checklists: ['cl-sourcing-strategy', 'cl-requirement-definition', 'cl-award-recommendation'],
    templates: ['tpl-business-case', 'tpl-rfq', 'tpl-award-recommendation'],
    calcs: ['calc-supplier-concentration', 'calc-tco', 'calc-should-cost', 'calc-budget-vs-actual'],
    decisions: ['make-or-buy', 'sourcing-method', 'dual-source', 'competitive-or-single'],
    kpis: ['kpi-sum', 'kpi-savings', 'kpi-contract-compliance', 'kpi-sourcing-coverage'],
    concepts: ['category-management', 'sourcing-strategy', 'total-cost-of-ownership', 'demand-management', 'supplier-market-analysis', 'framework-agreement']
  },
  labMission: {
    title: 'Mission 11.3: Write a Category Charter and a Stated Trade-Off',
    desc: 'Take a real category, set its boundaries, establish its importance, and write the one sentence that decides what the organisation will not trade for price.',
    tasks: [
      'Write the category scope and the explicit exclusions, then state the value, the supply risk and the consequence of a disruption.',
      'Reconcile the addressable spend, lock the baseline, and identify the demand and specification findings that are inside the buyer\'s control.',
      'Write the trade-off as a single sentence a reader could disagree with, naming what the organisation will not trade and what it will accept.',
      'Choose the sourcing route and the contract structure that carry the decision, and write the implementation plan with owners, dates and the investment required.'
    ],
    ctaLabel: 'Open the Category Management sandbox',
    ctaHref: '#/academy/func-category-mgmt?tab=apply',
    secondaryLabel: 'Review the Sourcing Strategy checklist',
    secondaryHref: '#/cl/cl-sourcing-strategy'
  },
});
