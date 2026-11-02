/* ==========================================================
   Procure Sherpa v2.4 - Academy Content Part 7
   Module 13: Executive & Board-Level Procurement
   Operating model, the value narrative, and transformation sequencing.
   Written for the reader who has to answer for the function in front of
   a CFO, an audit committee or a board, not for the reader learning the
   process.
   ========================================================== */
PS.ACADEMY_FUNCTIONS = PS.ACADEMY_FUNCTIONS || [];

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-operating-model',
  title: 'Procurement Operating Model & Cost-to-Serve',
  module: 'Module 13: Executive & Board-Level Procurement',
  kicker: 'Function 13.1',
  tier: 'executive',
  tagline: 'Deciding who does the work, where it is done, and what it costs to run the function at all.',
  desc: 'Before a strategy can be executed someone has to design the machine: central versus embedded teams, the split between sourcing and processing, decision rights, resourcing ratios, and the cost-to-serve number that makes the model defensible to a CFO.',
  duration: '28 mins',
  lifecycleStage: 'Make-or-buy and sourcing strategy',
  lifecycleDesc: 'Sits above the lifecycle rather than inside it: the operating model decides which stage each role touches and where hand-offs break.',

  what: 'An operating model is a set of connected decisions: how the function is organised (centralised, category-aligned, embedded in business units, or a hybrid with a centre of excellence), how work is split between sourcing, supplier management, transactional processing and analytics, where decision rights sit between the business, finance and procurement, what the team costs per unit of spend managed, and which of that work is automated or outsourced. The design question is not which model is best in general; it is which model fits the spend shape, the maturity of the business, and the risk the organisation is carrying. A model that suits a concentrated capital-equipment portfolio starves when applied to a fragmented indirect estate. Cost-to-serve is the discipline that makes the choice arguable: the fully loaded cost of running a transaction, a sourcing event and a supplier relationship, measured rather than assumed.',
  why: [
    'A strategy with no operating model is executed by whoever happens to be available, which is how category management quietly turns into order processing.',
    'Resourcing ratios are the number a board can test: cost of the function per currency of spend under management. Without it, every request for capability is argued on feeling.',
    'Decision rights are where most control failures actually originate. A delegation of authority that no role in the model owns is a policy document, not a control.'
  ],
  when: [
    'When the function is being asked to deliver more value with the same or fewer people, which is a design question before it is a productivity question.',
    'After a merger, a divestment, or a move into a new market, because the spend shape has changed underneath the model.',
    'Before committing to a technology platform, since tooling that automates the wrong process industrialises the failure.'
  ],
  raci: [
    { role: 'Chief Procurement Officer / Head of Procurement', resp: 'Accountable for the model: its shape, its cost, its decision rights and the case put to the executive for it.' },
    { role: 'Finance / Controller', resp: 'Responsible for the cost-to-serve measurement and for validating the fully loaded function cost used in ratios.' },
    { role: 'Business unit leadership', resp: 'Consulted on embedded support needs and accountable for the decision rights they hold inside the model.' },
    { role: 'HR / Organisation design', resp: 'Consulted on role definitions, career structure and grade alignment, which decide whether the model can be staffed.' }
  ],
  inputs: [
    'Spend shape: value distribution, category mix, transaction volume, supplier population, and where the complexity actually sits.',
    'Current workload data: events per year, average cycle time, transaction counts by channel, and how much of the team time is consumed by processing.',
    'Fully loaded function cost including systems, and a measured cost per transaction through the whole procure-to-pay chain.',
    'The risk profile the organisation is carrying: regulated categories, single-source exposure, third-party compliance obligations.'
  ],
  outputs: [
    'A model description showing which role owns which lifecycle stage, where the hand-offs are, and what the business can expect from each.',
    'A resourcing plan with the ratio being argued for and the cost-to-serve assumption behind it.',
    'A decision-rights map aligned to the delegation of authority, with every threshold owned by a named role rather than a committee.',
    'A stated list of what the model deliberately does not cover, so the gaps are a choice rather than an accident.'
  ],
  controls: [
    'Segregation of duties is designed in, not audited in afterwards: the requester, the approver, the buyer and the payer cannot collapse into one role for convenience.',
    'Function cost and ratios are reported to the same standard as any other overhead line, with the method stated and repeatable.',
    'Every change to decision rights is versioned and dated, because a control framework that rewrites itself silently is not a control framework.'
  ],
  mistakes: [
    'Copying an operating model from a benchmark or a former employer without matching it to the spend shape, then explaining the shortfall in capability rather than in fit.',
    'Centralising everything to gain control, which removes the embedded capacity the business needs and pushes purchasing into unmanaged workarounds.',
    'Measuring cost-to-serve on salary divided by transactions, ignoring system, rework and dispute cost, and then defending a number Finance can instantly reject.'
  ],
  bestPractices: [
    'Design the model around where the value and the risk are concentrated, and accept a lighter touch where they are not.',
    'Give the business a visible service promise per model: what it gets, how long it takes, and who answers. Models that cannot be described in one page are not operating.',
    'Review the model against cycle time and cost-to-serve once a year with the same method, so drift is visible rather than debated.'
  ],
  terms: [
    { term: 'Cost-to-serve', def: 'The fully loaded internal cost of completing a unit of procurement work, including people, systems, rework and dispute handling, measured per transaction, event or relationship.' },
    { term: 'Centre of excellence', def: 'A small central capability holding method, data, tooling and standards while delivery sits with the business or the categories; it enables rather than executes.' },
    { term: 'Decision rights map', def: 'The explicit allocation of approval and veto authority across roles and thresholds, aligned to the delegation of authority and owned by named posts.' }
  ],
  thinkingPoints: [
    {
      quote: 'Every operating model is a bet about which failures are worth preventing and which are worth tolerating.',
      explanation: 'Centralisation prevents inconsistency and leaks value in speed and ownership. Devolution prevents delay and leaks value in control. The professional choice is made by naming the leak you can afford, which is why two organisations with identical spend can justify opposite models.',
      realWorldExample: 'A technology group moved to a fully centralised model to close an audit finding on unmanaged spend. Within a year, engineering teams began buying through expense claims and prepaid cards because the central queue took eleven days. Control improved on paper and the addressable share of spend fell.',
      reflectionPrompt: 'Which failure is your current model designed to prevent, and what is it quietly allowing instead? If you cannot answer the second part, the leak is unmeasured.'
    },
    {
      quote: 'The ratio a board remembers is the cost of the function against the value it influences, not the size of the team.',
      explanation: 'Headcount arguments lose because they are about inputs. Cost-to-serve and spend-under-management ratios are about the relationship between cost and reach, and they invite a different conversation: what would it take to improve the ratio, rather than why the team is that size.',
      realWorldExample: 'A CPO asked for four analytics roles and was refused. A year later the same request was framed as a ratio: the function cost 0.19 percent of addressable spend and could influence 41 percent of it, and the proposal showed what the ratio became when intake and spend visibility were automated first. It was approved as a change to a number rather than an increase in headcount.',
      reflectionPrompt: 'Can you state your function cost as a percentage of addressable spend today, and say which part of that spend you cannot influence at any price?'
    }
  ],
  sopSteps: [
    {
      title: 'Describe the spend shape before describing the team',
      role: 'Chief Procurement Officer',
      desc: 'Establish the distribution the model has to serve: value concentration, transaction volume, category complexity, supplier population and the geography of demand.',
      control: 'The spend shape is dated and drawn from the same baseline Finance uses, so the model argument rests on a shared fact.',
      record: 'Spend shape profile with concentration, volume and complexity bands, sourced and dated.',
      pitfall: 'Designing for the organisation chart rather than for the spend, which produces a model that looks tidy and cannot serve the demand.'
    },
    {
      title: 'Split the work by type, not by seniority',
      role: 'Head of Procurement',
      desc: 'Separate sourcing, category management, supplier management, transactional processing and analytics, and state what each is for and what it should not be asked to absorb.',
      control: 'No role is assigned work from two types without a stated reason and a capacity check.',
      record: 'Work-type definitions with the role owning each and the exclusions written down.',
      pitfall: 'Letting senior people absorb processing because they are the only ones who can get it done, which is how a category manager stops managing categories.'
    },
    {
      title: 'Measure cost-to-serve across the full chain',
      role: 'Finance / Controller',
      desc: 'Compute the fully loaded cost per transaction, per sourcing event and per managed relationship, including systems, rework and dispute handling rather than salary alone.',
      control: 'The method is written down and repeatable so next year comparison is honest.',
      record: 'Cost-to-serve model with method, inclusions and the resulting unit costs.',
      pitfall: 'Publishing a salary-only figure, which Finance dismantles in one question about system cost and rework.'
    },
    {
      title: 'Allocate decision rights to named roles',
      role: 'Chief Procurement Officer',
      desc: 'Map every threshold and veto in the delegation of authority to a role that exists in the model, and remove any authority held only by a committee.',
      control: 'Each decision right has an accountable post, a stated limit and an escalation route.',
      record: 'Decision-rights matrix cross-checked against the delegation of authority, with gaps closed.',
      pitfall: 'Leaving authority in a forum with no named owner, which is where unmanaged spend and unapproved exceptions originate.'
    },
    {
      title: 'State the service promise per model',
      role: 'Head of Procurement',
      desc: 'Publish what the business receives for each request type, with cycle time, the owning role and the route for escalation.',
      control: 'Promise levels are backed by capacity maths rather than ambition, and are reviewed against actual cycle time.',
      record: 'Service catalogue with request types, promised cycle times, owners and actual performance.',
      pitfall: 'Promising speed the model cannot deliver, converting a service document into a list of failures the business has been warned about.'
    },
    {
      title: 'Name what the model deliberately does not do',
      role: 'Chief Procurement Officer',
      desc: 'Record the areas the function is choosing not to cover at this cost level, with the risk accepted and who accepted it.',
      control: 'The exclusions are reviewed with Risk at a stated cadence, so an accepted gap cannot become invisible.',
      record: 'Model scope statement with exclusions, risk acceptance and review date.',
      pitfall: 'Leaving gaps implicit. An unstated gap is later discovered as a control failure attributed to procurement rather than as a decision the business took.'
    },
    {
      title: 'Review the model against ratio and cycle time annually',
      role: 'Finance / Controller',
      desc: 'Re-run the same cost-to-serve and cycle-time measurement each year and present the movement alongside the value influenced.',
      control: 'The comparison uses the identical method, with any method change stated and its effect quantified.',
      record: 'Annual operating model review showing cost-to-serve trend, cycle time and coverage.',
      pitfall: 'Changing the measurement method in the same year the result disappoints, which removes the only evidence the model is improving.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'A function with 30 people spends 70 percent of its hours on transactional processing for a fragmented indirect estate. The CFO asks why savings growth has stalled.',
      q: 'What is the model-level answer?',
      options: [
        { text: 'The team needs better negotiation training.', isCorrect: false, rationale: 'Training does not change the fact that the team has 9 hours a week left for sourcing. This treats a capacity structure as a capability gap.' },
        { text: 'The model is misaligned to the spend shape: processing work is being done by sourcing roles, so the addressable work never happens.', isCorrect: true, rationale: 'Correct. When a spend shape generates high transaction volume against low per-unit value, the model has to move processing to a lower-cost or automated channel. Until that is done, any savings target is a request for the team to do two jobs.' },
        { text: 'The savings target is too ambitious for this portfolio.', isCorrect: false, rationale: 'Possibly true, but it answers nothing. The CFO question was about why performance stopped improving, and the 70 percent figure is the answer available.' },
        { text: 'Outsource everything, including category management.', isCorrect: false, rationale: 'Outsourcing processing is a standard answer; outsourcing category judgement hands over the part that produces the value. The two decisions have different economics and should not be taken together.' }
      ],
      principle: 'When the work mix and the spend shape disagree, performance is capped by the model, not by the skill in it.'
    },
    {
      type: 'scenario',
      context: 'Two operating models are proposed. Model A centralises all sourcing with a cycle time of 18 days. Model B embeds buyers in business units with a cycle time of 6 days and 30 percent less coverage of spend by a category plan.',
      q: 'What decides between them?',
      options: [
        { text: 'Model B, because speed is what the business values.', isCorrect: false, rationale: 'That is a preference dressed as a conclusion. It ignores which categories carry the value and the risk, and coverage loss on concentrated categories is rarely worth 12 days.' },
        { text: 'Which spend the model is being designed for: high-value concentrated categories justify Model A with an exception route for speed; fragmented tail spend needs Model B mechanics.', isCorrect: true, rationale: 'Correct. The question has no answer at model level, only at spend level. Most functions end up with a deliberately hybrid design: central depth where value and risk concentrate, embedded or self-service speed where they do not, with the split drawn on evidence rather than on politics.' },
        { text: 'Model A, because control is the audit priority.', isCorrect: false, rationale: 'Control is a real requirement, but a model that adds 12 days to tail transactions pushes that demand into expense channels audit cannot see, which usually worsens the finding it was meant to close.' },
        { text: 'Whatever the benchmark says the peer group does.', isCorrect: false, rationale: 'Benchmarks describe spend shapes as much as models. Without knowing the shape behind the number, the benchmark is a coincidence.' }
      ],
      principle: 'Operating model choice is a function of spend shape and risk, not of speed versus control in the abstract.'
    },
    {
      type: 'scenario',
      context: 'A delegation of authority gives procurement approval above USD 250,000, but the model has no role with capacity below that level and a standing committee reviews everything between 50,000 and 250,000.',
      q: 'What is the actual control exposure?',
      options: [
        { text: 'None, since the committee reviews the mid-band.', isCorrect: false, rationale: 'A committee with no named owner reviews fewer things less carefully. This is the exposure, not the mitigation.' },
        { text: 'Authority sits with a forum rather than an accountable post, so approvals are neither timely nor traceable to a decision-maker, and spend below 50,000 has no route at all.', isCorrect: true, rationale: 'Correct. Two defects in one: a control held by an unnamed body cannot be evidenced in an audit, and the gap below the committee threshold is where most transaction volume lives, so the estate between zero and 50,000 is unowned by design.' },
        { text: 'Procurement is understaffed and needs another headcount request.', isCorrect: false, rationale: 'The gap here is a decision-rights design fault. More people in a model with an unowned threshold produce the same untraceable approvals.' },
        { text: 'Raise the committee threshold to reduce the queue.', isCorrect: false, rationale: 'This shortens the queue by moving value out of review. The exposure increases and the symptom disappears, which is the worst combination.' }
      ],
      principle: 'A decision right belongs to a role, not a forum. Unnamed authority and unowned thresholds are the two ways a control framework becomes decoration.'
    },
    {
      type: 'scenario',
      context: 'You report cost-to-serve as USD 96 per purchase order using salary divided by order count. Finance says the number is not usable.',
      q: 'Why, and what is the fix?',
      options: [
        { text: 'The figure is too low; add a margin to be safe.', isCorrect: false, rationale: 'Adjusting a bad method to please a reviewer destroys the number for all future use. The objection is about method, not caution.' },
        { text: 'The method excludes systems, rework, dispute handling and the shared-service layer, so it is not a fully loaded cost; rebuild it with the inclusions stated and reconcile to the actual function cost.', isCorrect: true, rationale: 'Correct. A cost-to-serve figure has to sum to a cost Finance already recognises. When it does, the number becomes usable in both directions and the ratio argument gains standing.' },
        { text: 'Report per-category instead of per-order.', isCorrect: false, rationale: 'A different unit does not repair an incomplete method; it just moves the objection.' },
        { text: 'Stop reporting cost-to-serve and use headcount.', isCorrect: false, rationale: 'Headcount is the argument that loses every time. The right response is to make the metric defensible.' }
      ],
      calcWork: 'A fully loaded figure is one whose total reconciles to the recognised function cost. Salary-only per-order cost multiplied by volume will not sum to the cost line Finance holds, and that gap is precisely what makes it unusable.',
      principle: 'Internal cost metrics have to reconcile to the accounts. A number that does not sum to a cost Finance recognises will not survive a question.'
    },
    {
      type: 'scenario',
      context: 'After a merger, procurement inherits an embedded model in one division and a central model in the other. Integration pressure says pick one.',
      q: 'What is the professional approach?',
      options: [
        { text: 'Adopt the larger division model for consistency.', isCorrect: false, rationale: 'Size is not evidence of fit. Consistency is a real benefit but not at the price of misaligning half the estate.' },
        { text: 'Re-derive the model from the merged spend shape and risk profile, adopting whichever existing pattern fits each segment and stating why.', isCorrect: true, rationale: 'Correct. A merger changes the spend shape, which is the input the model is supposed to serve. Designing from the merged portfolio gives a defensible reason for the pattern chosen in each segment, and it avoids an integration decision that would have to be reversed within a year.' },
        { text: 'Run both models and revisit in two years.', isCorrect: false, rationale: 'This is often the honest short-term answer, but as a stated plan with review dates and a decision owner, not as a deferral. Left unowned it becomes permanent duplication.' },
        { text: 'Centralise to satisfy the audit team.', isCorrect: false, rationale: 'It resolves one concern and creates an unmeasured service gap for every embedded team that loses its local capability.' }
      ],
      principle: 'A merger is an operating-model question, because it changes the input the model exists to serve. Re-derive rather than choose a winner.'
    },
    {
      type: 'scenario',
      context: 'A platform implementation is approved before the operating model is redesigned. The vendor will automate the current intake, sourcing and processing flows.',
      q: 'What is the most important thing to insist on?',
      options: [
        { text: 'Nothing; implementation teams know the tooling better than the business.', isCorrect: false, rationale: 'Vendor knowledge is about the product, not about which of your processes deserve to exist. Deferring here is how a design fault gets a licence.' },
        { text: 'The model and the process design are fixed before configuration, because the platform will otherwise industrialise the current hand-offs and thresholds.', isCorrect: true, rationale: 'Correct. Automation is leverage on whatever it is pointed at. If the model still has processing done by sourcing roles, an unowned mid-band threshold and eleven-day cycles, the platform makes those permanent, expensive and visible.' },
        { text: 'Ask for the tool to be configured to match each existing division so adoption is easy.', isCorrect: false, rationale: 'This preserves the duplication under one licence and multiplies maintenance forever.' },
        { text: 'Delay the platform until headcount is reduced, to prove efficiency.', isCorrect: false, rationale: 'Sequencing the tool after a staffing cut removes the capability that would have justified the change, and the platform arrives into a team already weakened.' }
      ],
      principle: 'Fix the model before automating it. Tooling multiplies the design you give it, including the parts you meant to change.'
    }
  ],
  relSop: 'sop-procurement-lifecycle',
  rel: {
    concepts: ['c-procurement', 'delegation-of-authority', 'segregation-of-duties', 'category-management', 'sourcing-strategy'],
    sops: ['sop-procurement-lifecycle', 'sop-procurement-intake'],
    checklists: ['cl-procurement-intake', 'cl-procurement-audit'],
    templates: ['tpl-business-case', 'tpl-exception-request'],
    calcs: ['calc-kpi-calculator', 'calc-budget-vs-actual'],
    decisions: ['make-or-buy', 'approve-exception'],
    kpis: ['kpi-cycle-time', 'kpi-sum', 'kpi-roi']
  },
  labMission: {
    title: 'Mission 13.1: Build the Ratio the Board Will Test',
    desc: 'Use the KPI Calculator to express function cost against addressable spend, and find which part of the spend the current model cannot influence.',
    tasks: [
      'Open the KPI Calculator and enter your fully loaded function cost, addressable spend and spend under management.',
      'Compute the cost ratio and the coverage percentage, and state the assumption behind each.',
      'Name the one work-type shift that would improve the ratio without reducing control, and what it would cost to make.'
    ],
    ctaLabel: 'Open KPI Calculator',
    ctaHref: '#/calc/calc-kpi-calculator',
    secondaryLabel: 'Open the Maturity Check',
    secondaryHref: '#/maturity'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-value-narrative',
  title: 'The Executive Value Narrative & Benefit Assurance',
  module: 'Module 13: Executive & Board-Level Procurement',
  kicker: 'Function 13.2',
  tier: 'executive',
  tagline: 'What a CFO, an audit committee and a board will actually accept as evidence that procurement created value.',
  desc: 'The gap between a category manager claim and a board-grade claim is not ambition, it is assurance: baseline, method, evidence, independent validation and a place in the accounts. This function covers how to state value so it survives scrutiny.',
  duration: '30 mins',
  lifecycleStage: 'Performance management and value assurance',
  lifecycleDesc: 'Closes the loop: the point at which work either appears in the financial statements or does not, and the function either gains credibility or loses it.',

  what: 'A value narrative is the disciplined account of what the function changed and how that shows up financially. It rests on four claims, each with a different evidence standard: hard savings, which are a validated reduction against a dated baseline and should appear as lower cost in the accounts; cost avoidance, which is a cost rise that was prevented and is evidenced by the quote or notice that would have applied; working-capital effects, measured in days of inventory, payable or receivable and owned jointly with Finance; and risk or resilience reduction, which has no P&L line and is stated as exposure avoided with the probability and consequence reasoned rather than asserted. Assurance is what separates the credible from the promotional: a stated baseline, a stated method, evidence held by someone who can produce it, and validation by a party that did not make the claim. The narrative also has a shape: the board wants a bridge from last year position to this year, the largest movement explained, and the claims the function is not making stated explicitly.',
  why: [
    'Over-claiming is the most common way a procurement function loses its standing, and it is almost never malicious: it is a method shortcut taken once, then inherited by the reporting.',
    'Four kinds of value answer four different questions and land in four different places in the accounts. Reporting them as one number is the single most common reason Finance rejects the whole submission.',
    'Working capital and resilience are where procurement can genuinely speak in the CFO language, and they are also the two areas most functions cannot evidence at all because nobody recorded the before position.'
  ],
  when: [
    'When the function is asked to justify itself in a cost round, which is precisely when an unassured history becomes a liability.',
    'Before a programme begins, by agreeing the baseline, the method and who validates, because assurance retro-fitted to a done deal is not assurance.',
    'Whenever a claim crosses into a published number: a statutory report, an investor communication, a bonus calculation or an incentive scheme.'
  ],
  raci: [
    { role: 'Head of Procurement / CPO', resp: 'Accountable for what the function claims and for stating the limits of each claim to the executive.' },
    { role: 'Finance business partner / Controller', resp: 'Responsible for validating savings against the accounts and for deciding how each benefit type is recognised.' },
    { role: 'Category managers', resp: 'Responsible for the baseline, the evidence and the method behind each claim they originate.' },
    { role: 'Internal audit / Risk', resp: 'Consulted on the assurance standard and on the treatment of risk-reduction claims that have no financial line.' }
  ],
  inputs: [
    'A dated baseline per claim: the price actually paid, the quoted increase that was avoided, or the working-capital position before the change.',
    'The method by which each effect is calculated, including volume assumption, currency treatment and time phasing.',
    'Evidence that a third party could inspect: the prior invoice, the escalation notice, the signed agreement, the ledger extract.',
    'The place in the accounts where the effect appears, agreed with Finance before publication rather than after.'
  ],
  outputs: [
    'A value bridge showing last year position to this year position by effect type, with the largest single movement explained in one line.',
    'A claims register with baseline, method, evidence reference, validator and recognition route per claim.',
    'An explicit list of what is not being claimed, which protects every number that is.',
    'A one-page executive statement in the CFO vocabulary: P&L effect, balance-sheet effect, risk exposure changed, and the confidence level on each.'
  ],
  controls: [
    'No claim is published without a named validator who did not originate it, and the validation standard is the same for every category.',
    'Baselines are frozen and dated before negotiation, so the before position cannot be selected to fit the result.',
    'Risk and resilience claims carry their reasoning and are never presented with the same certainty as validated savings.'
  ],
  mistakes: [
    'Reporting a price rise prevented as hard savings, which reverses the first time volume grows and the ledger does not move.',
    'Netting the function own cost against the benefit and calling it net value without Finance recognition of the cost line, which double-counts the same money.',
    'Building a narrative around a single total, because one unverifiable claim inside an aggregate contaminates every genuine claim in it.'
  ],
  bestPractices: [
    'Agree the recognition route with Finance before the negotiation, not after: who books it, in which period, against what baseline.',
    'Report the split, then the total, then the exclusions. An aggregate with no decomposition is a request to be disbelieved.',
    'Keep a public record of claims the function declined to make. It is the fastest way to establish that the remaining numbers were chosen carefully.'
  ],
  terms: [
    { term: 'Benefit assurance', def: 'The standard of evidence behind a value claim: dated baseline, stated method, inspectable proof and validation by someone who did not originate the claim.' },
    { term: 'Cost avoidance', def: 'A cost increase that was prevented, evidenced by the notice or quotation that would otherwise have applied, and reported separately from hard savings because it does not reduce the ledger.' },
    { term: 'Value bridge', def: 'A movement statement from a prior period position to the current one, decomposed by effect type, so the change is attributable rather than asserted.' }
  ],
  thinkingPoints: [
    {
      quote: 'A number that cannot be traced to a place in the accounts is an opinion with decimal places.',
      explanation: 'Precision creates false confidence. Boards have learned that a saving figure is usually a method choice, so the credible submission is the one that names its own assumptions before someone else does. The function that says "this is validated, this is avoidance, this is our estimate with this confidence" gets heard; the one that says "we saved 40 million" gets audited.',
      realWorldExample: 'A function reported USD 52 million saved against a USD 480 million base. Finance reconciled to the ledger and found USD 17 million of it was the effect of lower volumes from a plant closure that year. The corrected figure of USD 35 million, published openly with the method that found the error, survived two subsequent cost rounds. The original number would not have survived one.',
      reflectionPrompt: 'If someone reconciled your last annual figure to the ledger without being told how it was built, would it stand? Would you want to know the answer before they found it?'
    },
    {
      quote: 'The most valuable thing procurement can report is sometimes the thing it decided not to buy.',
      explanation: 'A demand reduction or a deferred capital purchase changes the trajectory of costs rather than the price of a purchase. These are the largest numbers in most companies and the least evidenced, because nobody holds a baseline of the cost that never arrived.',
      realWorldExample: 'A category manager challenged a proposal for 240 additional field engineers and replaced it with a third-party service-level design, avoiding USD 6.4 million of annual labour cost over three years. It was not a saving against a price, so their own reporting system had no category for it, and the work appeared nowhere in the function scorecard for three quarters until the framework was widened.',
      reflectionPrompt: 'Where would a demand decision of that size appear in your reporting today? If it has no home, the function is systematically under-reporting its largest contribution.'
    }
  ],
  sopSteps: [
    {
      title: 'Freeze the baseline before the negotiation',
      role: 'Category Manager',
      desc: 'Record the price actually paid, the volume, the period and the source of the baseline before any commercial discussion begins, and date it.',
      control: 'Baselines are locked in the claims register at the start of an event, not reconstructed afterwards.',
      record: 'Dated baseline entry with prior price, volume, period and invoice or contract reference.',
      pitfall: 'Selecting the baseline after the result is known, which turns a genuine outcome into a chosen one and is visible to anyone who reconciles.'
    },
    {
      title: 'Classify the effect before calculating it',
      role: 'Category Manager',
      desc: 'Decide whether the outcome is a hard saving, cost avoidance, a working-capital effect or a risk reduction, and write the evidence standard that applies to each.',
      control: 'Classification is reviewed by Finance at the point of claim rather than at the point of reporting.',
      record: 'Claim register line showing type, evidence standard and the recognition route agreed with Finance.',
      pitfall: 'Reclassifying a claim between periods to fit a target, which is the specific behaviour assurance exists to prevent.'
    },
    {
      title: 'Calculate with stated assumptions',
      role: 'Category Manager',
      desc: 'Compute the effect with the volume assumption, currency treatment, escalator handling and time phasing written next to the number.',
      control: 'Every calculation references a stated method rather than a spreadsheet formula nobody can read.',
      record: 'Calculation sheet with method, assumptions, and the arithmetic reproduced in the register.',
      pitfall: 'Applying annualised volumes to a price that only holds for six months, which overstates and reverses in the next period.'
    },
    {
      title: 'Have someone who did not make the claim validate it',
      role: 'Finance business partner',
      desc: 'Independent validation against the evidence, at the same standard for every category, with the validator named in the register.',
      control: 'The validator has no interest in the outcome and applies a documented standard rather than judgement alone.',
      record: 'Validation entry with validator name, date, evidence inspected and the outcome.',
      pitfall: 'Peer review inside the same team, which is self-validation wearing a control name.'
    },
    {
      title: 'Build the bridge and name the largest movement',
      role: 'Head of Procurement',
      desc: 'Present the period movement by effect type, identify the single largest driver and explain it in one sentence in the CFO vocabulary.',
      control: 'The bridge sums to a figure Finance can reconcile, and the period comparison uses identical method.',
      record: 'Value bridge showing prior position, movements by type, current position, and the reconciling note.',
      pitfall: 'Reporting a total with no decomposition, which invites the reviewer to test one claim and, finding it weak, reject the whole.'
    },
    {
      title: 'State what is not being claimed',
      role: 'Head of Procurement',
      desc: 'List the excluded or unvalidated items explicitly, with the reason each was left out of the reported figure.',
      control: 'Exclusions are recorded at the time of decision, not assembled when challenged.',
      record: 'Exclusions note with item, reason and the date the claim was declined.',
      pitfall: 'Silence about weak claims, which reads as confidence until one is found and every other number becomes suspect.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'A negotiation stops a 9 percent supplier escalation. The category manager books it as hard savings in the annual figure.',
      q: 'What is the correct treatment?',
      options: [
        { text: 'Hard savings, since the escalation would certainly have applied.', isCorrect: false, rationale: 'Certainty about a counterfactual is not evidence in the accounts. The price you pay did not fall; a planned rise did not happen. Calling it savings creates a number Finance cannot find in the ledger.' },
        { text: 'Cost avoidance, evidenced by the escalation notice and the price that would otherwise have applied, reported separately from hard savings.', isCorrect: true, rationale: 'Correct. It is real value with a different evidence standard and a different financial signature. Keeping it separate protects the hard-savings figure, and reporting it properly gives the function credit for a fight it won.' },
        { text: 'Nothing, because no money was saved.', isCorrect: false, rationale: 'This discards a genuine outcome and teaches the team not to record avoided increases, which is how the biggest category of procurement value disappears from reporting.' },
        { text: 'Hard savings if the notice was in writing.', isCorrect: false, rationale: 'Written evidence is a requirement of the avoidance claim, not a licence to re-label it as a reduction. The evidence standard and the category are different questions.' }
      ],
      principle: 'Value that prevents a rise does not appear as lower cost. Report it as avoidance, with the notice as evidence, and keep it out of the savings total.'
    },
    {
      type: 'scenario',
      context: 'You extended payment terms from 30 to 45 days on USD 60 million of annual spend and want to report the benefit.',
      q: 'How should it be stated?',
      options: [
        { text: 'As savings of the interest saved at your borrowing rate.', isCorrect: false, rationale: 'That converts a balance-sheet effect into an income statement claim, and it assumes a rate and a cash position that Finance may not agree. It also double-counts if treasury books it.' },
        { text: 'As a working-capital effect: 15 days of payables improvement, quantified in days and in cash released, owned jointly with Finance and treasury.', isCorrect: true, rationale: 'Correct. Payment terms move the balance sheet, not the P&L. Days payable outstanding is the metric a CFO reads, cash released is the value, and joint ownership with treasury prevents it being claimed twice or dismissed as a financing decision.' },
        { text: 'As a supplier concession worth reporting with the price saving.', isCorrect: false, rationale: 'It was a concession, but reporting it beside a price saving mixes two financial signatures in one number, which is how a submission loses credibility.' },
        { text: 'Not at all, since terms are a financing matter outside procurement.', isCorrect: false, rationale: 'This gives away one of the few levers procurement controls that a CFO genuinely cares about. Ownership is shared; relevance is not in question.' }
      ],
      calcWork: 'USD 60 million annual spend divided by 365 is roughly USD 164,000 a day. Fifteen extra days of payable terms releases about USD 2.47 million of cash, which is a balance-sheet effect whose value depends on the cost of the alternative funding.',
      principle: 'Terms changes are working capital, not savings. Report them in days and cash released, and agree the treatment with treasury.'
    },
    {
      type: 'scenario',
      context: 'The board pack shows procurement savings of 40 million against a target of 35 million. You have been asked to present it and you know 6 million rests on a baseline nobody can produce.',
      q: 'What do you present?',
      options: [
        { text: 'The 40 million, since the target was met and the detail can be answered later.', isCorrect: false, rationale: 'This puts an unverified claim into a governance document. When the baseline cannot be produced, the entire figure becomes the story, including the 34 million that was sound.' },
        { text: '34 million validated, 6 million flagged as asserted with the reason, and the target status stated against the validated number.', isCorrect: true, rationale: 'Correct. The board is entitled to know the confidence behind a figure that drives decisions and incentives. Presenting a validated core with an explicit exception protects the function, keeps the missing baseline visible as work to do, and demonstrates the judgement the role is paid for.' },
        { text: '34 million only, without mentioning the remainder.', isCorrect: false, rationale: 'This understates the position and hides the fact that the target was arguably exceeded. Honesty about uncertainty should still be complete about performance.' },
        { text: 'Ask Finance to validate the 6 million before the meeting.', isCorrect: false, rationale: 'A good instinct, but a baseline that cannot be produced will not be validated in a week. The realistic path is to present it as asserted and fix the evidence afterwards.' }
      ],
      principle: 'A published number carries your credibility. Show the validated base, name the exception, and let the target be judged on what is evidenced.'
    },
    {
      type: 'scenario',
      context: 'Your function reports gross savings of 28 million and its own cost is 9 million. The executive asks for net value.',
      q: 'What is the correct response?',
      options: [
        { text: 'Report 19 million as net value.', isCorrect: false, rationale: 'That subtracts a cost line Finance already carries from a benefit that may be booked elsewhere, so the same money is treated twice. It is also a number nobody can find in the accounts.' },
        { text: 'Explain that gross benefit and function cost sit in different places, present both with their basis, and let Finance decide whether a net figure is meaningful at all.', isCorrect: true, rationale: 'Correct. Net-of-cost reporting requires an agreed recognition method for both sides. Presenting the two figures with their basis answers the real question, which is whether the function is worth what it costs, without inventing an accounting treatment.' },
        { text: 'Refuse to report cost, since it weakens the case.', isCorrect: false, rationale: 'The cost is already known. Refusing to discuss it makes the ratio the executive will compute anyway look like something being concealed.' },
        { text: 'Report 28 million and mention cost verbally.', isCorrect: false, rationale: 'Better than inventing a net figure, but the written record should hold both numbers so the comparison is transparent rather than dependent on what was said in a room.' }
      ],
      principle: 'Gross benefit and function cost are different accounting objects. Present both with their basis rather than inventing a net number nobody can reconcile.'
    },
    {
      type: 'scenario',
      context: 'A resilience programme reduced single-source exposure from 34 components to 9. There is no P&L effect to report.',
      q: 'How should this appear in an executive report?',
      options: [
        { text: 'Leave it out; it has no financial value.', isCorrect: false, rationale: 'It removed exposure the business was carrying. Omitting it teaches the organisation that only price matters, which is how resilience work stops being funded.' },
        { text: 'Report it as an exposure change with the consequence reasoned: number of lines, value at risk, and the production impact avoided at a stated confidence, clearly separated from validated savings.', isCorrect: true, rationale: 'Correct. Risk value is stated as exposure reduced with an honest confidence level, not as a savings figure. Showing the value at risk and the count of lines removed gives an executive something to decide with, and keeping it out of the savings total protects both.' },
        { text: 'Estimate the saving as one week of lost production and add it to savings.', isCorrect: false, rationale: 'A plausible-looking number built on a counterfactual, added to a category with an evidence standard it cannot meet. This is exactly the practice that gets an entire report questioned.' },
        { text: 'Report the count reduction alone, since numbers speak for themselves.', isCorrect: false, rationale: 'Thirty-four to nine means nothing without value at risk and consequence. The executive needs the shape of the exposure, not the arithmetic of the project.' }
      ],
      principle: 'Risk reduction is reported as exposure changed with a stated confidence. It earns credibility by staying out of the savings line, not by joining it.'
    },
    {
      type: 'scenario',
      context: 'Your incentive scheme pays on reported savings. Finance has just rejected 11 percent of this year claims on evidence grounds.',
      q: 'What does that tell you about the framework?',
      options: [
        { text: 'The team needs to claim less next year.', isCorrect: false, rationale: 'Under-claiming is not a control. It hides value and does nothing about the evidence standard that failed.' },
        { text: 'The assurance standard and the payment trigger are misaligned: claims were validated after payment rather than before, so the scheme rewarded assertion.', isCorrect: true, rationale: 'Correct. Where a scheme pays on reported savings rather than on independently validated savings with the evidence complete, the incentive is to claim first and defend later. Fixing the sequence, not the ambition, is the remedy.' },
        { text: 'Finance is applying an unfair standard.', isCorrect: false, rationale: 'Possible, and worth testing against the written method. But 11 percent rejection on evidence grounds is usually a process signal rather than a dispute about judgement.' },
        { text: 'Move the incentive to cost avoidance.', isCorrect: false, rationale: 'Avoidance has a weaker evidence standard than savings, so this increases the exposure rather than reducing it.' }
      ],
      principle: 'Whatever you pay for, you will get. Pay on validated claims with complete evidence, and the evidence standard becomes self-enforcing.'
    }
  ],
  relSop: 'sop-savings-calculation',
  rel: {
    concepts: ['savings-types', 'savings-measurement', 'savings-baseline', 'savings-realization', 'cost-avoidance', 'working-capital', 'price-vs-cost'],
    sops: ['sop-savings-calculation', 'sop-supplier-performance-management'],
    checklists: ['cl-savings-validation', 'cl-procurement-audit'],
    templates: ['tpl-savings-validation', 'tpl-savings-calculation', 'tpl-cost-avoidance', 'tpl-business-case'],
    calcs: ['calc-savings-analysis', 'calc-negotiation-savings', 'calc-kpi-calculator'],
    decisions: ['negotiate-or-accept', 'approve-exception'],
    kpis: ['kpi-savings', 'kpi-savings-realization', 'kpi-cost-avoidance', 'kpi-working-capital-impact', 'kpi-roi']
  },
  labMission: {
    title: 'Mission 13.2: Build a Claim That Survives Reconciliation',
    desc: 'Use the savings validation route to state a baseline, classify the effect, and write the assurance line Finance will accept.',
    tasks: [
      'Open the Savings Validation template and record the dated baseline and the volume assumption for one live negotiation.',
      'Classify the expected effect as hard saving, avoidance, working capital or exposure, and state the evidence standard for that class.',
      'Name the validator who did not make the claim and the place in the accounts where the effect will appear.'
    ],
    ctaLabel: 'Open Savings Validation Template',
    ctaHref: '#/tpl/tpl-savings-validation',
    secondaryLabel: 'Open Savings Analysis',
    secondaryHref: '#/calc/calc-savings-analysis'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-transformation-roadmap',
  title: 'Transformation Sequencing & the 18-Month Arc',
  module: 'Module 13: Executive & Board-Level Procurement',
  kicker: 'Function 13.3',
  tier: 'executive',
  tagline: 'What has to be true first, what to prove in ninety days, and how transformations actually fail.',
  desc: 'Most procurement transformations fail in sequence rather than in ambition: a platform before a process, a target before a baseline, a reorganisation before the data exists to design it. This is the craft of ordering the work so each step makes the next one possible.',
  duration: '26 mins',
  lifecycleStage: 'Renewal, re-sourcing and closeout',
  lifecycleDesc: 'Applies across the whole lifecycle at once, because transformation changes how every stage is performed rather than improving one of them.',

  what: 'Transformation sequencing is the deliberate ordering of capability work against the dependencies between them. A usable order for most functions: establish the data and intake position first, because every later target depends on knowing what is spent, with whom and through which channel; fix the policy and decision rights that make compliance meaningful; build the two or three category capabilities where value concentrates; then automate the flows that are now stable; and only then restructure the organisation, because the structure depends on the process the tooling now runs. The ninety-day proof is a deliberately small, visible win on a real category with a real number attached, chosen for its evidential value rather than its size. Failure modes are recognisable: tool-first transformation, target-led change with no baseline, capability claims without a person who holds them, and a programme that survives its own results because the reporting was the deliverable.',
  why: [
    'Dependencies are real and invisible: a spend-visibility promise made before intake is controlled produces data nobody trusts, and the function loses the credibility it needed for phase two.',
    'The ninety-day win is not about the money. It buys the political space that the harder structural work needs, and it demonstrates the method rather than describing it.',
    'Sequencing errors are expensive in attention rather than in licence cost. A function that automates a broken process spends its next two years explaining why the numbers did not improve.'
  ],
  when: [
    'When a new CPO or head of procurement takes accountability and has one budget cycle to establish a position.',
    'When the organisation is funding a platform, a shared-service change or a category restructure and the order of the three has not been discussed.',
    'After a failed programme, because the recovery plan has to name what was skipped, or the same sequence repeats.'
  ],
  raci: [
    { role: 'Chief Procurement Officer', resp: 'Accountable for the sequence, for what is deliberately deferred, and for the honest state of each phase to the executive.' },
    { role: 'Programme lead', resp: 'Responsible for dependency tracking, the ninety-day proof, and the evidence behind each capability claim.' },
    { role: 'Finance', resp: 'Responsible for the benefit baseline and for validating what the programme claims as it lands, phase by phase.' },
    { role: 'Business unit leaders', resp: 'Consulted on the process and policy changes they must operate, and accountable for the adoption the programme depends on.' }
  ],
  inputs: [
    'A current-state capability read, ideally against a stated maturity model, including what the function can actually evidence today.',
    'The spend and transaction data quality position, with known gaps named rather than estimated.',
    'The funding envelope and its timing, and the political capital available before the first visible result.',
    'A list of the dependencies between proposed initiatives, written as dependencies rather than as a plan.'
  ],
  outputs: [
    'A sequenced roadmap showing what is done first and, more importantly, what is deliberately not done yet and why.',
    'A ninety-day proof with a named category, a stated baseline, an owner and a number that will be reported whatever it turns out to be.',
    'A benefits realisation track that validates per phase rather than at the end, so a shortfall is discovered while it can still be fixed.',
    'Kill or re-plan criteria written before the work begins.'
  ],
  controls: [
    'No phase advances on a capability claim that has no evidence and no named owner.',
    'Every target is set against a baseline that Finance has accepted, before the negotiation that produces the result.',
    'Deferrals are recorded as decisions with a reason and a review date, so a postponed phase is a choice rather than a drift.'
  ],
  mistakes: [
    'Starting with the platform because it is fundable and visible, then discovering the process it automates was the actual problem.',
    'Setting a savings target for the programme before the addressable spend is known, which is the most common way a credible function produces a year of unreconciled reporting.',
    'Reporting adoption instead of outcome: users logged in, categories onboarded, contracts migrated, and no movement in cost, cycle time or exposure.'
  ],
  bestPractices: [
    'Choose the ninety-day proof for its evidential power: a category where the method will be visible, transferable, and measurable by someone outside procurement.',
    'Sequence by dependency and say so publicly; a team that knows why phase three waits stops lobbying for it.',
    'Build the reporting for the second year, not the first. Programmes that only look good in their own launch review are the ones that get quietly extended.'
  ],
  terms: [
    { term: 'Dependency-led sequencing', def: 'Ordering initiatives by what each requires from the others rather than by value or fundability, and stating the deferred items as deliberate decisions.' },
    { term: 'Ninety-day proof', def: 'A small, deliberately chosen early result whose purpose is to evidence the method and buy political space, not to deliver the programme benefit.' },
    { term: 'Benefits realisation track', def: 'The standing function that validates each phase result against its agreed baseline while the programme is still running, so a shortfall can be corrected rather than explained.' }
  ],
  thinkingPoints: [
    {
      quote: 'The expensive mistake in transformation is never the wrong destination. It is arriving there in the wrong order.',
      explanation: 'Sequencing errors do not announce themselves. The programme looks active, the budget is spent, the milestones are met, and the capability that depended on the skipped step simply never arrives. Because it was never delivered as a step, nobody is accountable for its absence.',
      realWorldExample: 'A function invested in a sourcing suite in month two and a spend classification programme in month nine. By month eighteen the suite held accurate data on 46 percent of spend, so most events were still run outside it, and the licence cost became the reason the programme was reviewed rather than the reason adoption improved.',
      reflectionPrompt: 'Which of your current initiatives depends on a capability that is scheduled after it? Name the dependency, not the project.'
    },
    {
      quote: 'A ninety-day win chosen for its size is a demo. Chosen for its evidence, it is a mandate.',
      explanation: 'The purpose of the early win is to prove the method transfers. A large category won by a heroic one-off effort teaches nothing and cannot be replicated by the team, which is why functions that chase the biggest early number often stall afterwards.',
      realWorldExample: 'A new head of procurement chose a mid-sized logistics category for the first ninety days because it had clean data, a willing operational owner and a measurable service metric. The result was 3.8 million on a small base, but the method was documented, the category manager who ran it became the internal trainer, and phases two and three were staffed from inside.',
      reflectionPrompt: 'What would your first ninety days prove about the method rather than about the team? Would a colleague be able to repeat it without you?'
    }
  ],
  sopSteps: [
    {
      title: 'Read the current capability honestly',
      role: 'Chief Procurement Officer',
      desc: 'Assess what the function can evidence today across data, intake, category depth, contract control, supplier management and reporting, naming the gaps rather than averaging them.',
      control: 'The read is supported by evidence samples, not by self-assessment scores alone.',
      record: 'Capability baseline with the evidence behind each rating and the gaps named.',
      pitfall: 'Inflating a mid-point rating to make the roadmap look achievable, which sets every later target on a position that does not exist.'
    },
    {
      title: 'Write the dependencies, then the plan',
      role: 'Programme lead',
      desc: 'State what each initiative requires from the others, in one page, and let the sequence fall out of that rather than from funding windows.',
      control: 'Any initiative scheduled before its dependency is either re-ordered or its dependency is formally waived with a reason.',
      record: 'Dependency map with sequence, waivers and the approver of each waiver.',
      pitfall: 'Reordering for fundability and never telling the team, so the skipped dependency becomes an unexplained shortfall a year later.'
    },
    {
      title: 'Fix data and intake before making promises',
      role: 'Head of Procurement',
      desc: 'Establish the spend baseline and route all demand through one intake with ownership, before any addressable-spend or savings target is published.',
      control: 'The baseline is accepted by Finance and dated, and the intake route measures leakage rather than coverage.',
      record: 'Spend baseline and intake design with the leakage measure and its first reading.',
      pitfall: 'Publishing an addressable-spend number that cannot survive the first reconciliation, which costs the programme more credibility than it buys in ambition.'
    },
    {
      title: 'Choose the ninety-day proof for its evidence value',
      role: 'Chief Procurement Officer',
      desc: 'Select a category with clean data, a willing business owner and a metric an outsider can verify, and document the method while it is being run.',
      control: 'The baseline and success measure are agreed before the event, and the result is reported whatever it is.',
      record: 'Proof-point brief with category, baseline, method, owner and published result.',
      pitfall: 'Picking the largest possible number for the launch review, which produces a result nobody can reproduce and a team that cannot scale it.'
    },
    {
      title: 'Validate benefits per phase, not at the end',
      role: 'Finance',
      desc: 'Run the benefits realisation check at each phase gate against the agreed baseline, and treat a shortfall as a re-planning trigger rather than a reporting note.',
      control: 'A phase cannot close without its validation entry, and the validator did not deliver the phase.',
      record: 'Phase validation log with baseline, outcome, variance and the decision taken.',
      pitfall: 'Deferring validation to programme close, by which point the fixes are staffed elsewhere and the only remaining action is explanation.'
    },
    {
      title: 'Automate only flows that have stabilised',
      role: 'Programme lead',
      desc: 'Bring tooling in after the process it runs is settled and owned, and configure it to the agreed process rather than to the legacy exception.',
      control: 'Each automated flow has a named process owner and a documented current-state definition.',
      record: 'Automation readiness note per flow with owner, definition date and exception handling.',
      pitfall: 'Configuring the platform around a process everyone knows is temporary, which makes the temporary arrangement permanent and expensive to change.'
    },
    {
      title: 'Publish the kill or re-plan criteria in advance',
      role: 'Chief Procurement Officer',
      desc: 'State the result that would cause a phase to stop or change shape, with the review date and who decides.',
      control: 'The criteria are tested at the phase gate whether or not the news is good.',
      record: 'Criteria statement with thresholds, review dates and the decision owner.',
      pitfall: 'A programme with no exit condition, where the only permitted outcomes are extension or celebration.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'A newly funded transformation lists five workstreams: sourcing platform, spend visibility, category capability, contract control and supplier risk. Finance wants a savings target next quarter.',
      q: 'What sequence do you propose?',
      options: [
        { text: 'All five in parallel with a shared target, since speed matters more than order.', isCorrect: false, rationale: 'Parallel streams compete for the same scarce owners, and a shared target with no baseline turns every workstream into a claim contest rather than a delivery effort.' },
        { text: 'Spend visibility and intake first, then category capability and contract control on that baseline, then supplier risk, and the platform once the flows are defined.', isCorrect: true, rationale: 'Correct. Visibility and intake are the dependency under everything else: they produce the baseline that makes a target meaningful and the process definition the platform should be configured to. Capability and control then have something honest to measure against. Tooling last is not delay; it is avoiding the cost of automating an undefined flow.' },
        { text: 'The platform first, because it is the funded item and momentum matters.', isCorrect: false, rationale: 'This is the most common and most expensive ordering. The platform is configured against a process that changes in month nine, and the licence cost then becomes the programme reason for existing.' },
        { text: 'Supplier risk first, because it is the area with the most exposure.', isCorrect: false, rationale: 'Real exposure, but a risk programme needs spend and supplier data that does not yet exist. It will produce a methodology and no coverage, and the exposure stays unquantified.' }
      ],
      principle: 'Sequence by dependency. The capability that produces the baseline comes before anything measured against a baseline.'
    },
    {
      type: 'scenario',
      context: 'Month two of a programme: the steering group wants a bigger launch story than the ninety-day proof provides.',
      q: 'What is the right response?',
      options: [
        { text: 'Widen the proof to the largest category so the number impresses.', isCorrect: false, rationale: 'A bigger number on an unstable method is a risk to the programme rather than a defence of it; the following phase is judged against a result the team cannot repeat.' },
        { text: 'Keep the proof small and make the evidence unambiguous, then show the transfer plan so the steering group sees a repeatable method rather than a single win.', isCorrect: true, rationale: 'Correct. Early steering confidence should come from the credibility of the method and the clarity of the transfer path, not from the size of the first figure. A documented, verifiable, repeatable result is a mandate; a heroic one-off is a rumour.' },
        { text: 'Report projected benefits alongside actual, labelled clearly.', isCorrect: false, rationale: 'Defensible if strictly labelled, but in a launch review projections become the headline within one slide. Better to let the actual result and the transfer plan carry it.' },
        { text: 'Let Finance choose the category so the result is credible.', isCorrect: false, rationale: 'Credibility comes from evidence, not from authorship. Finance validating a baseline is essential; selecting the proof point is not the mechanism.' }
      ],
      principle: 'The first result is bought for its evidence value. A method a colleague can repeat is worth more to a steering group than a number nobody can reproduce.'
    },
    {
      type: 'scenario',
      context: 'The platform went live on schedule. Adoption reporting shows 78 percent of users logged in, and 31 percent of events ran through it.',
      q: 'What does the programme report?',
      options: [
        { text: '78 percent adoption, since users are engaging.', isCorrect: false, rationale: 'Login is attendance. The behaviour the programme exists to change is whether work runs through the platform, and 31 percent says it mostly does not.' },
        { text: '31 percent of events run through the platform, with the reasons for the gap and the corrective plan, because value follows the flow and not the login.', isCorrect: true, rationale: 'Correct. Reporting the flow metric exposes the real problem early enough to fix it: usually that the exceptions are faster, or the process configured is not the one the business runs. Reporting the vanity metric defers that discovery by a year and buries the credibility of whoever reported it.' },
        { text: 'Nothing until the licence cost is justified.', isCorrect: false, rationale: 'Silence during a shortfall is how a programme loses its sponsors. The gap reported with a plan is the strongest position available.' },
        { text: 'Both figures, averaged.', isCorrect: false, rationale: 'Averaging a behavioural measure with an attendance measure produces a number with no meaning and no action attached to it.' }
      ],
      principle: 'Measure the flow, not the login. Adoption that is not the work actually being done is attendance.'
    },
    {
      type: 'scenario',
      context: 'A savings target of 12 percent was set before the addressable spend was known. Analysis now shows addressable spend is 38 percent lower than assumed.',
      q: 'What is the correct handling?',
      options: [
        { text: 'Keep the target and work harder, since targets drive behaviour.', isCorrect: false, rationale: 'It guarantees an unmet number and a team optimising for the report rather than the value. A target built on a wrong base is not stretch; it is error.' },
        { text: 'Re-baseline openly with the corrected figure, restate the target against the real addressable spend, and show what the original number would have required.', isCorrect: true, rationale: 'Correct. A target is a ratio against a base, and when the base is wrong the honest move is to restate both together. Doing it before year end, with the arithmetic visible, preserves credibility; hiding it produces a miss the function cannot explain.' },
        { text: 'Redefine addressable spend to fit the original target.', isCorrect: false, rationale: 'This is the most damaging option available. It converts a measurement error into a governance one and is discoverable by anyone who asks what is inside the word.' },
        { text: 'Split the difference and commit to 9 percent.', isCorrect: false, rationale: 'A negotiated midpoint with no base behind it satisfies nobody and leaves the same measurement fault in place for next year.' }
      ],
      calcWork: 'If the addressable base is 38 percent smaller than assumed, a target set on the larger base is roughly 1.6 times harder than intended on the real base. Restating against the corrected number is the only arithmetic that makes the target mean anything.',
      principle: 'A target without a validated base is a slogan. When the base moves, restate the target and the base together, early and in public.'
    },
    {
      type: 'scenario',
      context: 'A reorganisation is proposed as the first phase of the transformation, on the argument that the right people will fix the process.',
      q: 'What is the strongest objection?',
      options: [
        { text: 'Reorganisations take too long.', isCorrect: false, rationale: 'Timing is a weak argument and easy to dismiss. The problem with this sequence is structural rather than about speed.' },
        { text: 'The structure depends on the work mix the process and tooling will create, so restructuring first locks in today hand-offs and guarantees a second reorganisation.', isCorrect: true, rationale: 'Correct. Design the model after the process is defined and the automation decision is made, because the roles and the split of work depend on both. Restructuring first is a predictable second restructure, and it costs the programme its credibility with the people who moved twice.' },
        { text: 'The team will resist change.', isCorrect: false, rationale: 'Resistance is real and applies to every phase; it is not a reason to prefer one sequence over another.' },
        { text: 'Finance will not fund a restructure in phase one.', isCorrect: false, rationale: 'A funding obstacle is not a design argument. If the funding is the only issue, the sequencing fault remains when the money arrives.' }
      ],
      principle: 'Organisation design follows process and automation decisions, because the work mix determines the shape. Putting it first buys a second reorganisation.'
    },
    {
      type: 'scenario',
      context: 'Eighteen months in, the programme has delivered its milestones and no measurable change in cost, cycle time or exposure.',
      q: 'What is the diagnosis?',
      options: [
        { text: 'The team delivered what was asked, so the outcome reflects market conditions.', isCorrect: false, rationale: 'This is a defence of activity rather than an explanation of the gap, and it accepts that the programme was never connected to a result.' },
        { text: 'The programme measured delivery rather than effect, so its benefit tracking was built to report completion instead of change.', isCorrect: true, rationale: 'Correct. Milestones met with no outcome movement means the tracking framework was never wired to a baseline and a result metric. The fix is a benefits realisation track with validation at each gate, which is exactly the control usually deferred to phase two.' },
        { text: 'Targets need to be raised to force focus.', isCorrect: false, rationale: 'Raising a target on an unmeasured base adds pressure without information, which is how a programme enters its second year of the same result.' },
        { text: 'Commission an external review to establish credibility.', isCorrect: false, rationale: 'External review can help, but the organisation already has the diagnosis in the fact that no outcome was measured. An external party will ask for the baseline first and find it absent.' }
      ],
      principle: 'Milestones prove activity. If nothing moved in cost, cycle time or exposure, the measurement design was the failure, not the delivery.'
    }
  ],
  relSop: 'sop-procurement-audit',
  rel: {
    concepts: ['c-strategic-procurement', 'procurement-value', 'sourcing-strategy', 'category-management', 'savings-measurement'],
    sops: ['sop-procurement-audit', 'sop-procurement-lifecycle'],
    checklists: ['cl-sourcing-strategy', 'cl-procurement-audit'],
    templates: ['tpl-business-case', 'tpl-savings-validation'],
    calcs: ['calc-kpi-calculator', 'calc-savings-analysis', 'calc-budget-vs-actual'],
    decisions: ['make-or-buy', 're-source'],
    kpis: ['kpi-roi', 'kpi-savings-realization', 'kpi-cycle-time', 'kpi-maverick-spend']
  },
  labMission: {
    title: 'Mission 13.3: Order the Work by Dependency',
    desc: 'Use the maturity check to establish the current position, then write the dependency map that decides what happens first.',
    tasks: [
      'Open the Maturity Check and record the current position for data, intake, category depth and reporting.',
      'Write the dependencies between your proposed initiatives on one page, and identify what the savings target requires before it can mean anything.',
      'Choose a ninety-day proof point for its evidence value, and state the metric an outsider could verify.'
    ],
    ctaLabel: 'Open the Maturity Check',
    ctaHref: '#/maturity',
    secondaryLabel: 'Open Learning Paths',
    secondaryHref: '#/learning-paths'
  }
});
