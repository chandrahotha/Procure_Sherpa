/* ==========================================================
   Procure Sherpa v3.0 - Academy Content Part 10
   Module 16: Contract Risk, Claims and Disputes
   Signing is the point at which most procurement teams stop
   working on a contract and start working on the next tender.
   This module covers what happens after: the obligations somebody
   has to perform, the changes that arrive anyway, and the
   disagreement that follows when they do not. It is the material
   where the money is usually won back or lost.
   ========================================================== */
PS.ACADEMY_FUNCTIONS = PS.ACADEMY_FUNCTIONS || [];

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-obligation-register',
  title: 'The Obligation Register: Turning a Signed Contract into Work',
  module: 'Module 16: Contract Risk, Claims and Disputes',
  kicker: 'Function 16.1',
  tier: 'practitioner',
  tagline: 'Converting a legal document into dated, owned, verifiable duties on both sides, before the first renewal catches you without evidence.',
  desc: 'A contract contains obligations; an organisation performs almost none of them until someone has written down which one is theirs, by when, proven by what. This function covers extracting the obligation set from a signed agreement, assigning each one to a named owner who is not the contract manager, deciding what evidence proves performance, and building the review rhythm that turns "we have a contract" into "we know what it is doing".',
  duration: '22 mins',
  lifecycleStage: 'Contract management and governance',
  lifecycleDesc: 'Sits immediately after award and signature, and before any performance measure can exist: you cannot report against an obligation nobody recorded.',

  what: 'An obligation register is a derived document, and that is the whole point: it is not the contract, it is the contract read as a list of duties. Work through the signed instrument once, line by line, and pull out every sentence that commits somebody to do, deliver, provide, notify, allow or refrain from something. Expect four families. Performance obligations - deliverables, service levels, milestones, acceptance criteria, the things the business asked for. Information obligations - reports, notices, audits, insurance certificates, key-personnel lists, subcontractor disclosures; these are the most commonly missed because nobody is paid to produce them. Protective obligations - insurance limits, security controls, data-handling terms, records retention, conflict-of-interest declarations, right-to-audit. And commercial obligations - pricing schedules, indexation mechanics, volume commitments, payment terms, credits and set-off rights. For each one record five things: the clause reference, the accountable party on each side, the trigger and the due date, the evidence that proves it happened, and the consequence if it does not. The consequence field is what separates a register from a wish list, and it is where most organisations are vague: a service credit that nobody can invoke because no one kept the data, or a termination right that has quietly expired because the notice window was never diarised. Ownership is the second discipline. Procurement owns the register, not the contract, and should not own most of the obligations in it. The IT security duty belongs to the security lead, the data-retention duty to the data protection officer, the acceptance-of-deliverables duty to the budget holder who specified them. Procurement\'s job is to make the assignment stick, hold the calendar, and escalate the ones nobody will take. Evidence design comes third and is where the register earns its keep: decide at the start what will prove performance in three years when the person who agreed it has left. A report filed in a shared mailbox is not evidence; a dated artefact with an agreed definition, a named source and a retention rule is. Finally the cadence: a monthly exception sweep (what fell due, what was delivered, what was not) and a quarterly review with the supplier against the same document. That review is also the moment when the register gets corrected, because a contract signed two years ago contains obligations that no longer describe the work, and the honest response is to change the document rather than pretend the register is wrong.',
  why: [
    'Unrecorded obligations are unenforceable in practice. A credit regime, an audit right or a transition-out duty that nobody diarised is invisible at exactly the moment it becomes valuable, which is usually the moment the relationship turns adversarial.',
    'Most contract failure is information failure rather than delivery failure. The goods arrive and the service runs; what quietly lapses is the certificate of insurance, the subcontractor notification, the security attestation - and those are the terms that protect you when something goes wrong.',
    'Assigning obligations to the people who actually perform them is what makes stewardship survive staff changes. A register owned entirely by one contract manager is a register that stops existing when that manager moves on.',
    'Evidence decided in advance is cheap; evidence reconstructed after a dispute begins is expensive and often inadmissible in commercial terms, because the dates were never recorded. The register is the mechanism that makes reconstruction unnecessary.',
    'Coverage reporting depends on it. A contract-coverage or compliance percentage measured against an obligation register tells management something true; the same percentage measured against a clause count tells them nothing.'
  ],
  when: [
    'Within two weeks of signature, before the first invoice and before any mobilisation is accepted as complete.',
    'At handover from the sourcing team to the team that will live with the agreement, as the artefact that handover transfers.',
    'Before every renewal or extension review, as the record of what was actually performed rather than what was intended.',
    'Whenever an incident, audit or dispute starts: the register is the first document produced and the one the other side will be tested against.'
  ],

  raci: [
    { role: 'Contract Manager', resp: 'Extracts the obligation set from the signed instrument, holds the register, runs the monthly exception sweep and the quarterly supplier review.' },
    { role: 'Budget Holder / Service Owner', resp: 'Accepts deliverables and owns the performance obligations that describe the business outcome they asked for.' },
    { role: 'Functional Owner (security, data, finance, HSE)', resp: 'Owns and evidences the protective and information obligations that fall inside their discipline.' },
    { role: 'Legal / Contracts Advisor', resp: 'Confirms clause interpretation, notice periods and remedies; owns the decision on when a breach is material.' }
  ],
  inputs: [
    'The signed contract with all schedules, annexes, statements of work and incorporated standards.',
    'The award file: evaluated offer, negotiation record and any agreed side letters, which often carry obligations the template does not.',
    'Stakeholder map showing who performs each family of duty, and who accepts it.',
    'Existing reporting and data sources, so evidence can be attached to something that already exists rather than invented.'
  ],
  outputs: [
    'Obligation register: clause reference, party, trigger, due date, evidence definition, source system, consequence on failure, named owner.',
    'Contract calendar of dated duties - notices, reviews, certificates, insurance renewals, expiry of any step-in or audit right.',
    'Monthly exception report: obligations due, met, missed, and the ones with no owner.',
    'Stewardship pack for the first renewal review, showing performance against the register rather than against memory.'
  ],
  controls: [
    'No contract is reported as "live" until its register exists and every obligation has a named owner who is not the author.',
    'Each obligation carries an evidence definition and a retention rule agreed with the functional owner.',
    'Notice periods and any time-limited right are diarised with an alert ahead of the deadline, not on it.',
    'The register is versioned with the contract; a variation that changes an obligation changes the register in the same action.'
  ],
  bestPractices: [
    'Read the schedules harder than the body. The obligations that get missed are in annexes, incorporated standards and the pricing schedule.',
    'Keep a "no owner" list and escalate it monthly. An obligation nobody will take is a risk the organisation has chosen to carry without deciding to.',
    'Record what the business actually receives, not what the supplier says it delivered; the difference is the finding.',
    'Make the register the single source for renewal decisions, so the effort of building it is repaid rather than repeated.'
  ],
  mistakes: [
    'Producing the register as a legal summary instead of an operating document - prose about the contract rather than a list of duties with dates.',
    'Keeping every obligation in procurement\'s name so that the business never performs or evidences its own acceptance duties.',
    'Treating the register as complete at signature, then never correcting it while the work changes underneath.',
    'Recording obligations without consequences, which turns every miss into a judgement call made under pressure later.'
  ],
  terms: [
    { term: 'Obligation register', def: 'A derived operating document listing every duty in a contract with its party, trigger, due date, evidence and consequence.' },
    { term: 'Material breach', def: 'A failure serious enough to trigger a contractual remedy such as termination or a credit; defined in the agreement or argued from its consequences.' },
    { term: 'Step-in right', def: 'A buyer entitlement to take over performance, or have someone else do so, when a supplier fails - usually time-limited and conditional.' },
    { term: 'Records retention', def: 'The agreed period and format in which performance evidence must be kept, so a duty can be proven after the people involved have gone.' }
  ],

  thinkingPoints: [
    {
      quote: 'The contract was not wrong. Nobody had ever read it as a to-do list.',
      explanation: 'A services agreement carried a right to a detailed monthly cost breakdown and a credit regime for late reporting. Over three years the supplier filed a one-line invoice summary and the buyer never objected, because no one in the buying organisation knew the breakdown was owed. When the relationship was re-tendered, the incumbent produced three years of compliant reports in the final week and looked like the better-run supplier.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: an information obligation with no owner and no diarised date is functionally absent, and the counterparty decides when it exists.',
      reflectionPrompt: 'Which obligations in your largest live contract would you struggle to prove were performed, and who currently holds the evidence?'
    },
    {
      quote: 'Every renewal conversation you cannot evidence becomes the supplier\'s version of events.',
      explanation: 'Renewal negotiations are won by whoever arrives with data. A register that shows forty-two monthly deliverables, three late, two disputed and one credited gives the buyer a factual opening. Without it, the discussion starts from the supplier\'s summary of a good partnership, and the price conversation is about trust rather than performance.',
      realWorldExample: 'Illustrative example: the same relationship negotiated two ways - with a register the buyer opens with three specific failures and a credit already agreed, and without one the buyer is arguing from recollection against a party with better records.',
      reflectionPrompt: 'If your most important contract went to renewal next month, whose evidence would the conversation rest on?'
    }
  ],

  sopSteps: [
    { title: 'Read the signed instrument as duties, not as an agreement', role: 'Contract Manager',
      desc: 'Work through the contract, every schedule, every annex and any incorporated standard once, and extract each commitment into a candidate obligation with its clause reference. Do not summarise: a duty paraphrased is a duty you cannot enforce, and the wording that survived negotiation is the wording that will be tested.',
      control: 'Every clause that commits a party appears once and only once, with the clause number retained.',
      record: 'Draft obligation extract with clause references, reviewed line by line against the signed document.',
      pitfall: 'Extracting from the template rather than the signed version, so the negotiated changes - which are exactly the obligations that matter - are missing.' },
    { title: 'Sort the duties into the four families', role: 'Contract Manager',
      desc: 'Classify each obligation as performance, information, protective or commercial. The families behave differently: performance duties are measured, information duties are diarised, protective duties are attested and commercial duties are reconciled against invoices. Sorting first is what stops a register that is really a list of service levels.',
      control: 'No obligation is left unclassified; an unclassifiable duty is a drafting problem and goes to Legal.',
      record: 'Register with a family field per obligation and a count by family.',
      pitfall: 'Treating protective obligations as the supplier\'s business, when the buyer carries the exposure if the certificate lapsed.' },
    { title: 'Assign each obligation to the person who performs it', role: 'Head of Procurement',
      desc: 'Name an accountable owner for every duty, and put it with the function that actually does the work rather than with whoever holds the contract file. Expect to escalate: some obligations will be refused, and a refused obligation is a decision the organisation must take consciously rather than drift into.',
      control: 'No obligation carries procurement as owner by default; the business owns what the business receives.',
      record: 'Owner list with acceptances recorded, plus a named escalation list for refused duties.',
      pitfall: 'Accepting ownership of the whole register to avoid an argument, which guarantees the duties go unperformed and makes procurement the reason.' },
    { title: 'Define the evidence before it is needed', role: 'Functional Owner',
      desc: 'For each obligation agree what artefact proves performance, where it will be filed, what its definition is and how long it is kept. This is the step that costs almost nothing at signature and a great deal later, because evidence reconstructed after an incident is contested by default.',
      control: 'Every obligation has an evidence definition and a source; "the supplier said so" is not evidence.',
      record: 'Evidence column completed, with a sample artefact attached for each family.',
      pitfall: 'Accepting a report that exists but has no agreed definition, so the same number is argued about at every review.' },
    { title: 'Diarise every date, notice window and expiring right', role: 'Contract Manager',
      desc: 'Put each dated duty and each time-limited entitlement into the calendar with an alert ahead of the deadline. Notice periods, insurance renewals, audit windows, step-in validity and credit claim limits are all obligations with clocks, and a missed clock is a lost remedy.',
      control: 'Alerts lead the deadline rather than fall on it, and are owned by a role rather than an individual.',
      record: 'Contract calendar with owner and alert rule per entry.',
      pitfall: 'Diarising only the renewal date, which is the one deadline nobody misses and the least interesting one in the document.' },
    { title: 'Run the monthly exception sweep', role: 'Contract Manager',
      desc: 'Once a month, list what fell due, what was delivered, what was not and what has no owner. This is a twenty-minute review of a register, not a project. Its value is that it produces a contemporaneous record of failures while they are still small and still fixable.',
      control: 'The sweep happens whether or not anything is due, and the absence of exceptions is itself recorded.',
      record: 'Dated exception log with actions, owners and closure evidence.',
      pitfall: 'Running the review as a conversation and not writing anything down, so three years of small failures leave no trace when they matter.' },
    { title: 'Review the contract with the supplier against the register', role: 'Budget Holder / Service Owner',
      desc: 'Hold a quarterly review using the register as the agenda, and correct it in the meeting. Where an obligation no longer describes the work, change the document rather than quietly ignore the duty - an unused obligation is a live ambiguity, and ambiguity is resolved later by whoever has the better records.',
      control: 'Register changes are versioned alongside contract variations; nothing is agreed verbally.',
      record: 'Review minutes with register amendments, actions and the agreed evidence for each.',
      pitfall: 'Letting the review drift into a status call, which feels productive and produces no evidence of anything.' }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A five-year managed-service contract is live. Procurement holds the signed PDF, the service desk holds the tickets, and the supplier sends a monthly slide pack. Nobody can say how many contractual duties exist.',
      q: 'What is the most useful first action?',
      options: [
        { text: 'Commission a compliance audit of the supplier against the contract.', isCorrect: false, rationale: 'An audit is the most expensive way to discover you do not know what to audit against. It will produce findings about obligations nobody owns and evidence nobody kept, and the cost of the audit buys you the register you should have built for free at signature.' },
        { text: 'Extract every commitment from the signed instrument and its schedules into a register with clause references, then classify by family.', isCorrect: true, rationale: 'Correct. You cannot manage, own or evidence a duty you have not listed. Extraction is a one-off reading task of a few hours, and everything else - ownership, evidence, calendar, exception reporting - depends on it existing first.' },
        { text: 'Agree a set of service levels with the supplier at the next quarterly review.', isCorrect: false, rationale: 'This negotiates new obligations while the existing ones are unmeasured, and it hands the supplier the agenda. Service levels already in the contract have definitions and remedies attached; inventing new ones in a review weakens your position on the ones you have.' },
        { text: 'Ask the business what it thinks the supplier is responsible for.', isCorrect: false, rationale: 'Worth knowing, and worth recording as a gap, but it is not the register. The difference between the business\'s understanding and the signed document is exactly the exposure, and you can only measure that once the document has been read as duties.' }
      ],
      principle: 'Before you can enforce, report or renegotiate a contract, somebody has to read it once as a list of obligations. Almost nobody does.'
    },
    {
      type: 'scenario',
      context: 'A contract requires the supplier to notify the buyer of any subcontractor change within 10 days. In three years the supplier has changed subcontractors four times without notice. The buyer has no record of receiving any notice.',
      q: 'What is the strongest position available?',
      options: [
        { text: 'Nothing - the buyer cannot prove the notices were not received.', isCorrect: false, rationale: 'This is the intuitive answer and it is usually wrong. A notification obligation is discharged by the notifying party, and the question is what evidence they hold. In practice they hold none either, which is why the register\'s evidence design matters: a dated receipt log converts an unfalsifiable claim into a documented failure.' },
        { text: 'Treat it as a systemic control failure, require a notification log with dated receipts going forward, and reserve position on the historic periods.', isCorrect: true, rationale: 'Correct. The breach is real but the evidence is thin on both sides, so the value lies in fixing the mechanism now and using the four undisclosed changes as leverage in the renewal or a credit conversation. Escalating to termination on three-year-old unproven notice failures is a weak hand played loudly.' },
        { text: 'Declare a material breach and start the termination route.', isCorrect: false, rationale: 'Disproportionate to the harm and almost certainly unwinnable on evidence. It also destroys the relationship over a control gap the buyer partly owns, and the replacement will cost more than any credit recoverable.' },
        { text: 'Add the obligation to the next renewal so it is covered going forward.', isCorrect: false, rationale: 'The obligation is already in the contract; adding it again changes nothing. What is missing is an owner, a channel and a receipt record - which are register items and can be fixed now rather than in two years.' }
      ],
      principle: 'A notification duty without a receipt log is unprovable in both directions. Design the evidence, and the argument becomes about behaviour rather than about memory.'
    },
    {
      type: 'scenario',
      context: 'Procurement has built a 140-line obligation register. Every line has procurement as the owner because no other function accepted an item.',
      q: 'What does this tell you?',
      options: [
        { text: 'Procurement is committed and the register will be maintained properly.', isCorrect: false, rationale: 'It will be maintained for as long as one person has capacity, and then it will silently stop. Ownership that was accepted under pressure is not ownership; it is a queue.' },
        { text: 'The assignment step has failed, and the organisation is carrying 140 duties with no performer - which is a governance decision nobody has taken.', isCorrect: true, rationale: 'Correct. The register is fine; the ownership model is not. Duties belonging to security, data protection, finance and the business have been parked in procurement to avoid an escalation, and the honest move is to return them with a named refusal list to whoever can mandate the owners.' },
        { text: 'Reduce the register to the obligations procurement can realistically handle.', isCorrect: false, rationale: 'This deletes the risk rather than the obligations. The duties still exist in the contract; the register was the only place they were visible, and trimming it makes the exposure smaller only on paper.' },
        { text: 'Outsource the register review to the supplier so they confirm their own duties.', isCorrect: false, rationale: 'Handing the register to the counterparty converts your control document into their marketing document. They will confirm the duties that are easy and forget the ones with teeth.' }
      ],
      principle: 'If procurement owns every obligation, nobody owns the obligations. A refused duty escalated is a decision taken; a duty parked is a risk accepted by default.'
    },
    {
      type: 'scenario',
      context: 'A supplier misses a milestone. The contract provides for a credit of 0.5 percent of the monthly fee per working day, capped at 5 percent, and termination if three milestones are missed in twelve months. This is the second miss. The buyer wants to keep the peace and says nothing.',
      q: 'What is the correct handling?',
      options: [
        { text: 'Say nothing: invoking a credit invites a worse relationship and the cap is small.', isCorrect: false, rationale: 'This is the decision most often regretted. Silence does not preserve the relationship, it establishes a pattern - and after the third miss the buyer has waived its own remedy by conduct and has also lost the termination trigger it might one day need.' },
        { text: 'Record the miss against the register, apply or formally waive the credit in writing, and count it towards the three-in-twelve trigger.', isCorrect: true, rationale: 'Correct. Either outcome is defensible: applying the credit is enforcing the contract, waiving it once in writing is a managed commercial choice. What is not defensible is neither - an unrecorded miss that resets your position and forfeits the accumulation you were building.' },
        { text: 'Terminate, because two misses show the supplier cannot deliver.', isCorrect: false, rationale: 'The contract does not permit termination at two misses, and doing so hands the supplier a wrongful-termination claim and the business an unplanned transition. The remedy you have is the credit and the running count.' },
        { text: 'Renegotiate the milestone dates so the supplier is not in breach.', isCorrect: false, rationale: 'This is change control, not remedy, and it should be priced and approved as such. Rewriting dates to make a breach disappear moves the cost onto the buyer and destroys the evidence trail that made the register useful.' }
      ],
      principle: 'A remedy applied is control; a remedy waived in writing is judgement; a remedy ignored is a waiver you did not intend to grant.'
    },
    {
      type: 'scenario',
      context: 'The CFO asks what percentage of contracted spend is compliant. Procurement reports 94 percent, measured as contracts that have a signed document and a live purchase order.',
      q: 'What is wrong with that number?',
      options: [
        { text: 'Nothing is wrong; it is a reasonable proxy for governance.', isCorrect: false, rationale: 'It is a reasonable proxy for paperwork. It answers "do we have agreements" and is being reported as though it answered "are the agreements working", which is the question asked.' },
        { text: 'It measures existence rather than performance, and cannot be reconciled to any obligation, so it will not survive the next question.', isCorrect: true, rationale: 'Correct. Compliance against an obligation register - duties due, met, missed, evidenced - produces a number that can be broken down by contract, family and owner, and defended line by line. A document-count ratio collapses the moment somebody asks which obligations were not met.' },
        { text: 'It should be measured against purchase-order value rather than contract count.', isCorrect: false, rationale: 'A better denominator, still the wrong numerator. Weighting by value does not tell you whether the insurance certificate, the audit right or the transition-out duty were performed.' },
        { text: 'It should be reported per supplier rather than per contract.', isCorrect: false, rationale: 'Useful presentation, but presentation is not measurement. The gap is that there is no obligation set underneath the percentage.' }
      ],
      principle: 'Compliance is a ratio against obligations. Without a register, the number is a description of filing cabinets.'
    }
  ],

  relSop: 'sop-contract-review',
  rel: {
    concepts: ['contract-structure', 'service-level-agreement', 'audit-trail', 'segregation-of-duties', 'supplier-performance-management', 'delegation-of-authority'],
    sops: ['sop-contract-review', 'sop-contract-change-control', 'sop-supplier-performance-management', 'sop-procurement-lifecycle'],
    checklists: ['cl-contract-review', 'cl-supplier-performance-review', 'cl-procurement-file-completeness'],
    templates: ['tpl-contract-review-checklist', 'tpl-contract-performance-review', 'tpl-supplier-scorecard'],
    calcs: ['calc-multi-year-contract-cost', 'calc-kpi-calculator'],
    decisions: ['renew-vs-resource', 'approve-exception'],
    kpis: ['kpi-contract-compliance', 'kpi-contract-coverage', 'kpi-otif'],
    glossary: ['gloss-sla', 'gloss-sow', 'gloss-doa', 'gloss-change-order']
  },
  labMission: {
    title: 'Mission 16.1: Build the Register for One Live Contract',
    desc: 'Take a real signed agreement and turn it into an obligation register with owners, evidence definitions and a calendar - the artefact every later contract conversation depends on.',
    tasks: [
      'Open the Contract Review checklist and read the contract once as duties, extracting every commitment with its clause reference.',
      'Classify the obligations into performance, information, protective and commercial, and count each family.',
      'Name an owner for every duty, and write down the ones that were refused so the escalation is a decision rather than a drift.'
    ],
    ctaLabel: 'Open Contract Workbench',
    ctaHref: '#/contracts',
    secondaryLabel: 'Open Contract Review Checklist',
    secondaryHref: '#/cl/cl-contract-review'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-change-control',
  title: 'Change Control and the Variation Nobody Priced',
  module: 'Module 16: Contract Risk, Claims and Disputes',
  kicker: 'Function 16.2',
  tier: 'practitioner',
  tagline: 'How agreed scope survives contact with reality: pricing the change, approving it before it happens, and refusing the ones that are really re-work.',
  desc: 'Most contracts do not fail at signature; they fail in the ninety small adjustments that nobody approved because they looked trivial. This function covers the change mechanism itself - what counts as a change, who may instruct one, how it is priced, what has to be agreed before the work moves - and the discipline that stops a negotiated discount being given back through variations.',
  duration: '24 mins',
  lifecycleStage: 'Contract management and governance',
  lifecycleDesc: 'Runs throughout the performance stage, and is the control that decides whether the contract you signed is the contract you pay for.',

  what: 'A change is any adjustment to scope, quantity, quality, sequence, timing, specification or location that moves the work away from what was priced and agreed. That definition matters because the argument in every dispute is about whether something was a change or was always included, and the party that wrote the baseline usually wins it. So the first control is the baseline itself: a scope statement precise enough that a change can be identified against it, with exclusions written down as explicitly as inclusions. In services and construction the baseline is the statement of work plus the pricing schedule; in goods it is the specification plus the drawing set plus the agreed tolerance; in software it is the requirement set plus the acceptance criteria. Where the baseline is vague, change control is impossible, and every adjustment becomes a negotiation conducted after the work has started - which is the worst possible time to negotiate. The second control is authority. A delegation-of-authority matrix that names who may instruct a change, up to what value, and with whose technical agreement, and a rule that no instruction given outside that authority is priced or paid. This is not pedantry: the classic failure is a senior operational person who needs something now, instructs it on the shop floor or in an email, and procurement discovers the cost when the invoice arrives with it attached. Authority without a route is a request form; authority with a route is a control. Third is pricing mechanics, and this is where money is actually lost. Variations should be priced from the rates in the contract, not negotiated fresh, which is why the rate card and the schedule of unit rates are the most valuable pages in the document. Where no comparable rate exists, the pricing basis - cost build-up, allowed margin, treatment of overhead and disruption - must be agreed before the work, not asserted afterwards. Two rules save more money than any other in this area: no retrospective pricing without a documented emergency, and no work starts until the change order is signed by someone with authority. The fourth control is the register, because individual changes are rarely the problem. Ten changes of three percent each are thirty percent, and the register is what makes the accumulation visible: cumulative value against the original contract, count by type, count by instructing manager, and the ratio of variations to contract value. That ratio is the honest health indicator for a project - a construction or services engagement running above roughly ten to fifteen percent of contract value in approved variations is not being changed, it is being re-specified, and the original competition no longer covers the work. The fifth thing this function covers is the refusal. Change control that only approves is a cost mechanism, not a control. Some change requests are the supplier correcting their own non-conformance, some are the business discovering a requirement it should have stated at specification, and some are genuinely new demand that should be bought through a fresh competitive route rather than gifted to an incumbent at their rate. Being able to say no, in writing, with a reason, is the skill that makes the other four controls credible.',
  why: [
    'Variations are where negotiated savings are returned. A ten percent discount on the base scope is worth nothing if the work is delivered through changes priced at list rate.',
    'Retrospective approval removes every lever at once: the work is done, the leverage is gone, and the buyer is negotiating price with no ability to walk away.',
    'Cumulative drift defeats competition. Once approved changes exceed a modest fraction of contract value, the awarded scope and the delivered scope are different procurements, and the incumbent is a sole source.',
    'A named authority and a signed order convert a verbal instruction into an organisational decision, which is the only way a budget holder takes responsibility for the cost of a change rather than the supplier.',
    'Change data is the best supplier-performance evidence available. A supplier whose variation requests are frequently refused has a estimating or scoping problem, and the register shows it before the project finishes.'
  ],
  when: [
    'From the first day of performance, and specifically before any deviation from the baseline is accepted.',
    'Whenever the business asks for something the specification did not say, including the small things that feel free.',
    'At the cumulative thresholds set in the contract or the governance framework, when a change package must go back to the original approving authority.',
    'During close-out, to reconcile every change against the final account and to feed the estimate accuracy of the next similar procurement.'
  ],

  raci: [
    { role: 'Budget Holder', resp: 'Requests the change, owns its cost against the approved budget, and signs the change order within their authority limit.' },
    { role: 'Contract Manager', resp: 'Tests whether the request is a change at all, prices it from contract rates, maintains the variation register and the cumulative position.' },
    { role: 'Technical Reviewer / Engineer', resp: 'Confirms the change is necessary and correctly specified, and distinguishes new scope from the supplier correcting a non-conformance.' },
    { role: 'Finance', resp: 'Confirms funding exists before approval, and re-baselines the committed value rather than absorbing drift into variance.' }
  ],
  inputs: [
    'The signed baseline: statement of work or specification, drawing set, exclusions, acceptance criteria and the schedule of rates.',
    'The delegation-of-authority matrix, including cumulative thresholds that escalate to a higher approver.',
    'The change request itself, with the reason, the work affected, the programme impact and the proposed price or pricing basis.',
    'The variation register, showing what has already been approved on the same contract.'
  ],
  outputs: [
    'Signed change order: description, price or agreed pricing basis, programme effect, revised contract value, approver and authority reference.',
    'Variation register with cumulative value and count against the original award.',
    'Re-baselined commitment in the financial system, so the approved spend matches the contract.',
    'Refusal notices where a request is not a change, with the clause that makes it included work.'
  ],
  controls: [
    'No work outside the baseline starts before a change order is signed by an authorised approver; retrospective approval requires a documented emergency and goes to the same approver.',
    'Variations are priced from the contract rate card first; a fresh rate requires an agreed cost build-up and an allowed margin before the work.',
    'Cumulative variation value is reported against the original contract at each approval, and breaches escalate rather than accumulate.',
    'Every request is tested against the baseline before it is priced, and included work is refused in writing.'
  ],
  bestPractices: [
    'Write exclusions into the scope. The cheapest sentence in a contract is "the following are not included", and it settles more arguments than any pricing clause.',
    'Hold a weekly change board with a short list. A standing meeting where each request is approved, refused or deferred keeps the register clean and stops drift by silence.',
    'Track variations per instructing manager, not just per contract. Drift is usually concentrated in two or three people, and that is a coaching conversation rather than a policy.',
    'Feed actual change rates back into the next specification. If a category routinely absorbs eight percent in variations, the baseline was wrong and the fix is upstream.'
  ],
  mistakes: [
    'Pricing a variation as a fresh negotiation after the work has started, when the only leverage was available before it.',
    'Approving small changes outside the mechanism because the paperwork costs more than the item, which is how a ten percent drift is built one hundred dollars at a time.',
    'Treating every request as legitimate because the operational need is real - the need may be genuine and the commercial route wrong.',
    'Re-baselining silently in the contract while the budget stays at the original figure, so the variance appears in finance as an overrun nobody approved.'
  ],
  terms: [
    { term: 'Change order', def: 'A written, priced and approved variation to agreed scope, schedule or deliverables, signed by someone with the authority to commit the value.' },
    { term: 'Baseline', def: 'The approved definition of the work - scope, exclusions, specification, schedule and price - against which any change is measured.' },
    { term: 'Retrospective approval', def: 'Authorising a change after the work has been performed; legitimate only for a documented emergency and the highest-risk form of variation.' },
    { term: 'Constructive change', def: 'A change effected without a formal order, through instruction, obstruction or repeated rework, which the supplier later claims as additional cost.' }
  ],

  thinkingPoints: [
    {
      quote: 'The discount was never lost in the tender. It was given back in ninety-one emails.',
      explanation: 'A facilities contract was won at eleven percent below the rate card. Over two years, work outside the scheduled scope was instructed directly between the site manager and the supplier, priced at list rate, and invoiced without a change order. The base contract saved a modest annual amount; the unscheduled work cost more than the whole saving, and neither party could produce a document showing who agreed what.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: when the compliant route is slower than the request, cost control does not fail at the negotiation - it fails at the point where the easy path is the uncontrolled one.',
      reflectionPrompt: 'Where does work currently get instructed in your organisation without touching the contract mechanism, and who pays for it?'
    },
    {
      quote: 'Ask whether it is a change before you ask what it costs.',
      explanation: 'A supplier submitted a variation for re-work caused by their own installation error, priced from the contract rate card and supported by photographs. It was a well-documented request for work that was already in scope. The buyer had no answer, because their baseline did not state the installation requirement clearly enough to say so.',
      realWorldExample: 'Illustrative example: the refusal that succeeds is the one that can quote the clause; the refusal that fails is the one that says it seems included.',
      reflectionPrompt: 'Could you refuse a variation today by citing the baseline, or would the argument be about interpretation?'
    }
  ],

  sopSteps: [
    { title: 'Fix the baseline in writing before performance starts', role: 'Contract Manager',
      desc: 'Confirm the scope statement, the exclusions, the specification revision, the schedule of rates and the acceptance criteria as one controlled set, and record the version. Change control is arithmetic against a baseline; without one, every request becomes a negotiation.',
      control: 'The baseline is a single referenced set, and any later change to it is itself a change order.',
      record: 'Baseline pack with revision numbers and the date it was accepted by both parties.',
      pitfall: 'Leaving exclusions unstated because they felt obvious - the items nobody wrote down are the ones that arrive as variations.' },
    { title: 'Test whether the request is a change at all', role: 'Technical Reviewer / Engineer',
      desc: 'Compare the request against the baseline before pricing anything. It may be included work, the supplier correcting their own non-conformance, a requirement the business failed to specify, or genuinely new scope. Each has a different commercial answer and only the last one has a price.',
      control: 'Every request carries a classification and the clause reference that supports it.',
      record: 'Assessment note against the request: included, non-conformance, omitted requirement, or new scope.',
      pitfall: 'Starting from the supplier\'s price and arguing about the amount, which concedes that the work is additional before anyone has tested it.' },
    { title: 'Identify who has authority to instruct it', role: 'Contract Manager',
      desc: 'Check the delegation-of-authority matrix for the value and the category, and confirm cumulative exposure against any threshold that escalates approval. Where the requester lacks authority, route the request to someone who has it rather than approving it informally.',
      control: 'No instruction is accepted, and no price is quoted, outside the named authority.',
      record: 'Approver identity, authority limit and the cumulative value at the moment of approval.',
      pitfall: 'Accepting an instruction from a senior operational leader because refusing is awkward, which converts a governance control into a courtesy.' },
    { title: 'Price from the contract, not from the market', role: 'Contract Manager',
      desc: 'Apply the rates in the schedule of rates or the rate card. Where nothing comparable exists, agree the cost build-up - labour, plant, materials, overhead and allowed margin - in writing before the work starts, and record who agreed it.',
      control: 'A variation is priced from contract rates, or from a basis agreed before the work; never from an invoice received.',
      record: 'Pricing sheet showing the rate applied or the agreed build-up, with margin visible.',
      pitfall: 'Allowing the supplier to price "at cost plus" without defining cost, which reliably discovers more cost than anyone expected.' },
    { title: 'Assess the programme and consequential effects', role: 'Budget Holder / Service Owner',
      desc: 'Record what the change does to dates, to other packages, to the acceptance plan and to any service level already agreed. Consequential loss claims are usually born here, when a small priced change displaces something nobody costed.',
      control: 'Every approved change shows a programme effect or an explicit statement that there is none.',
      record: 'Change order including revised dates and any agreed relief from service levels.',
      pitfall: 'Pricing the work and ignoring the delay, then refusing the extension of time the delay makes inevitable.' },
    { title: 'Sign the order before the work moves', role: 'Budget Holder',
      desc: 'Issue the change order for signature and hold the supplier to it: no authorised order, no work. Where urgency genuinely requires starting first, record the instruction, the reason it could not wait, and the approver who accepted that risk.',
      control: 'Retrospective approvals are exceptional, documented and reported as a control breach rather than absorbed.',
      record: 'Signed change order dated before commencement, or an emergency instruction with named approver.',
      pitfall: 'Verbal "go ahead" from a site or service lead, which is the single most expensive sentence in contract management.' },
    { title: 'Reconcile the cumulative position and report the drift', role: 'Contract Manager',
      desc: 'Update the variation register with value, count, classification and instructing manager, and report cumulative variation against original contract value at every approval and at close-out. Where the ratio crosses the escalation threshold, take it back to the approving authority as a package rather than line by line.',
      control: 'Cumulative exposure is visible at the point of each approval, not discovered at completion.',
      record: 'Variation register and a close-out reconciliation into the final account.',
      pitfall: 'Reporting each change as a small percentage of a large contract so that thirty percent of drift never looks like anything.' }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A supplier quotes USD 18,000 for additional cabling "not in scope". The original specification said "all cabling required to complete the installation" and the supplier\'s tender included a site survey.',
      q: 'What is the correct first response?',
      options: [
        { text: 'Negotiate the quote down to something closer to cost.', isCorrect: false, rationale: 'This accepts the premise that the work is additional, which is the entire dispute. Once you are haggling over the price of included work, you have conceded the classification and the precedent for the next twelve requests.' },
        { text: 'Refuse in writing, citing the specification wording and the tender assumption, and record the refusal in the variation register.', isCorrect: true, rationale: 'Correct. The clause answers the claim, so the answer is a documented refusal rather than a negotiation. Recording it also builds the evidence set that makes the next refusal easier and shows a pattern if the supplier keeps trying.' },
        { text: 'Split the difference to keep the project moving.', isCorrect: false, rationale: 'This is the most common and most damaging answer: it teaches the supplier that a claim is worth fifty percent of its face value, and it converts your next project into a stream of opening bids for negotiation.' },
        { text: 'Ask the site manager whether the cabling was actually installed.', isCorrect: false, rationale: 'Worth confirming, but it is not the question. Whether the work was done is separate from whether it was owed, and the specification settles the second one.' }
      ],
      calcWork: 'USD 18,000 refused versus conceded: the direct difference is 18,000; the indirect cost of conceding is the precedent it sets across every future claim on the same contract.',
      principle: 'Classify before you price. A well-documented refusal is worth more than a negotiated discount on work you were already owed.'
    },
    {
      type: 'scenario',
      context: 'On a USD 4.2M construction-style contract, approved variations total USD 310,000 across 47 change orders in eight months. The largest is USD 12,000.',
      q: 'What does the register tell you?',
      options: [
        { text: 'Control is working: no single change is material against a USD 4.2M contract.', isCorrect: false, rationale: 'This is how drift hides. Materiality is a property of the accumulation, not of the individual items, and a regime of 47 small approvals is a design and specification failure rather than a success in processing.' },
        { text: 'Cumulative variation is over seven percent of contract value, which means the awarded scope and the delivered scope are diverging and the original competition no longer covers the work.', isCorrect: true, rationale: 'Correct. At this rate the honest response is a consolidated package review with the approving authority, a look at why the baseline was wrong, and a decision on whether the remaining work should be re-competed rather than varied.' },
        { text: 'Stop approving variations until the project finishes.', isCorrect: false, rationale: 'The work will continue anyway and the changes will be instructed outside the mechanism, which is the outcome you are trying to avoid. The control problem is the baseline and the aggregate, not the act of approving.' },
        { text: 'Ask the supplier to absorb the changes as good faith.', isCorrect: false, rationale: 'Legally weak and commercially naive. It invites a constructive-change claim for the same work, documented as obstruction, and it costs the relationship you need to finish the job.' }
      ],
      calcWork: 'USD 310,000 / USD 4,200,000 = 7.4 percent of contract value, from 47 separate approvals none of which individually triggered escalation.',
      principle: 'Variation control is measured in the aggregate. A register that only reports per-item materiality is a register that reports nothing.'
    },
    {
      type: 'scenario',
      context: 'A production line stops. The maintenance technician needs a part and labour immediately and has it fitted. The invoice arrives a week later at three times the contract rate, with no change order.',
      q: 'What is the right handling?',
      options: [
        { text: 'Reject the invoice entirely: no change order, no payment.', isCorrect: false, rationale: 'Defensible in theory and destructive in practice. The line was down, the emergency was genuine, and refusing to pay for work that kept production running converts a control issue into a dispute and a supplier who stops responding to emergencies.' },
        { text: 'Pay it, and add an emergency route to the mechanism so a documented verbal instruction can be confirmed within a stated period.', isCorrect: true, rationale: 'Correct. The failure is procedural, not moral: the contract had no fast path for an outage, so the business used the only route available. Paying against a retrospective record and then fixing the route is control; pretending the invoice could have waited is not.' },
        { text: 'Pay it and raise it with the supplier as a compliance concern.', isCorrect: false, rationale: 'This puts the obligation on the wrong party. The supplier responded to an instruction from someone on site; the missing control is your authority route and your emergency definition, not their conduct.' },
        { text: 'Require the supplier to hold future emergency work until procurement approves.', isCorrect: false, rationale: 'This trades a three-times rate for an unplanned outage, and nobody will follow it. Controls that cost the business more than they save are circumvented, and the circumvention becomes the norm.' }
      ],
      principle: 'Design the emergency route before you need it. A control with no legitimate fast path is a control that gets bypassed at the worst possible price.'
    },
    {
      type: 'scenario',
      context: 'You are writing the change clause for a three-year managed-service contract with a fixed monthly fee.',
      q: 'Which provision gives you the most protection?',
      options: [
        { text: 'A rule that all changes must be agreed by both parties in writing.', isCorrect: false, rationale: 'Necessary and almost useless on its own. It states the obvious - that a change is a mutual act - without giving you any way to price, classify or bound one.' },
        { text: 'A current schedule of unit rates and a defined pricing basis for anything not on it, agreed before the work.', isCorrect: true, rationale: 'Correct. The rate card is what makes a change priceable rather than negotiable, and a pre-agreed basis for off-card work removes the only leverage the supplier has when the need is urgent and you are not prepared.' },
        { text: 'A cap on the total value of changes permitted per year.', isCorrect: false, rationale: 'Attractive and rarely workable. A hard cap either blocks legitimate new demand or is waived under pressure, and waiving it in a crisis costs you more than never having set it.' },
        { text: 'A right to reject any change request.', isCorrect: false, rationale: 'You already have that: nobody can be forced to buy more. The protection you actually lack is a price and a process for the changes you will end up accepting.' }
      ],
      principle: 'In change control the durable protection is a price you agreed in advance, not a veto you will be pressured to give up.'
    },
    {
      type: 'scenario',
      context: 'At close-out, the final account is twelve percent above contract value. Finance asks procurement why the approved budget was exceeded.',
      q: 'What is the honest answer?',
      options: [
        { text: 'The supplier over-charged and the differences should be disputed.', isCorrect: false, rationale: 'Only if the evidence supports it, and a twelve percent drift built from approved orders does not. Deflecting onto the supplier also forfeits the real finding, which is that the organisation approved the spend.' },
        { text: 'The work changed, the changes were approved within authority, and the budget was never re-baselined - so the overrun is an accounting artefact of unreported drift.', isCorrect: true, rationale: 'Correct, and it is the answer that improves the next project. Approved variations that are never reflected in committed budget look like overspend. The control gap is the re-baselining step, and the register proves which changes were legitimate.' },
        { text: 'Procurement should have refused the changes.', isCorrect: false, rationale: 'Some perhaps, but the business had authority to request them and the operational need was real. This answer protects nobody and teaches nothing about the baseline or the estimate.' },
        { text: 'Twelve percent is normal for this type of project.', isCorrect: false, rationale: 'It is common, which is not the same as acceptable, and saying so normalises the outcome you were asked to explain. It also ends the conversation that would fix the estimate accuracy.' }
      ],
      principle: 'Re-baseline the commitment when you approve the variation. Otherwise a governed process produces an ungoverned number.'
    }
  ],

  relSop: 'sop-contract-review',
  rel: {
    concepts: ['change-control', 'contract-structure', 'statement-of-work', 'delegation-of-authority', 'price-vs-cost', 'should-cost'],
    sops: ['sop-contract-change-control', 'sop-contract-review', 'sop-procurement-lifecycle', 'sop-emergency-procurement'],
    checklists: ['cl-contract-review', 'cl-exception-approval', 'cl-requirement-definition'],
    templates: ['tpl-contract-change-request', 'tpl-exception-request', 'tpl-business-case'],
    calcs: ['calc-multi-year-contract-cost', 'calc-should-cost', 'calc-compare-quotes'],
    decisions: ['approve-exception', 're-source', 'make-or-buy'],
    kpis: ['kpi-contract-compliance', 'kpi-cycle-time', 'kpi-ppv'],
    glossary: ['gloss-change-order', 'gloss-sow', 'gloss-doa']
  },
  labMission: {
    title: 'Mission 16.2: Price and Bound a Variation',
    desc: 'Use the contract change template and the multi-year cost tool to price a change from contract rates and see the cumulative position before you approve it.',
    tasks: [
      'Classify one real change request as included work, non-conformance, omitted requirement or new scope, and write the clause reference.',
      'Price it from the contract rate card, then price it as a fresh negotiation, and compare the two numbers.',
      'Add it to a running cumulative position against the original contract value and decide who has to approve at that level.'
    ],
    ctaLabel: 'Open Change Request Template',
    ctaHref: '#/tpl/tpl-contract-change-request',
    secondaryLabel: 'Open Multi-Year Cost Tool',
    secondaryHref: '#/calc/calc-multi-year-contract-cost'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-claims-and-remedies',
  title: 'Claims, Service Credits and the Decision to Fight',
  module: 'Module 16: Contract Risk, Claims and Disputes',
  kicker: 'Function 16.3',
  tier: 'executive',
  tagline: 'Reading a disagreement as a commercial decision: what you can prove, what it is worth, what it costs to pursue, and when settlement is the correct answer.',
  desc: 'A claim is an organised argument with documents behind it, and most organisations either lose them by not keeping records or win them by not knowing when to stop. This function covers how claims form, what makes one provable, how to value a remedy, the escalation ladder from conversation to formal dispute, and the executive judgement of whether pursuing it is worth more than it costs.',
  duration: '26 mins',
  lifecycleStage: 'Contract management and governance',
  lifecycleDesc: 'The end of the performance stage and the input to renewal, exit and any legal escalation: the point where earlier record-keeping either pays or does not exist.',

  what: 'Claims form in a predictable sequence, and knowing the sequence is most of the defence. A party encounters something unexpected, forms a view that the other side is responsible, decides whether to say so now or accumulate it, and then presents the assembled case at the moment of maximum leverage - typically at renewal, at final account, or when the relationship is already dependent. The critical observation is that claims are usually filed late because filing them early is uncomfortable, and the accumulation is what makes them look unanswerable. The buyer\'s equivalent failure is the mirror of it: a decade of small unrecorded failures, and no document to show for any of them. A claim has three parts and all three must be present. Liability - the clause, the duty, and the breach. Causation - that the breach caused the loss, not merely preceded it. Quantum - the loss, measured on the basis the contract allows. Most weak claims fail on causation and most strong claims fail on quantum, because the claimant can prove the failure and cannot prove the money. The same three parts are what you assemble when you are the claimant, and the register, the exception log and the change history are what make each part cheap to produce. Valuing a remedy is a separate discipline from proving a breach. Contractual remedies are usually capped, defined and sometimes the exclusive route: service credits, liquidated damages, price adjustment, set-off, cure periods, step-in, termination. A credit regime that caps at five percent of a monthly fee is not compensation for a failed service; it is a price mechanism, and treating it as the whole answer means accepting a business loss of a different magnitude. Where the contract is silent, the remedy is damages under the applicable law, and that is where this function stops being a procurement skill and becomes a legal one: remoteness, mitigation, exclusion clauses, limitation periods and the enforceability of liquidated damages are jurisdiction-specific and are exactly the questions to route to qualified advice rather than answer from a playbook. The escalation ladder exists so that each step is cheaper than the last one\'s outcome: raise it with the account manager and record that you did; issue a formal notice of breach under the clause; apply the contractual remedy; escalate to senior commercial leadership with a stated position; invoke dispute resolution - negotiation, mediation, adjudication, arbitration or litigation depending on the contract. Skipping steps is as expensive as stopping at them too early. The executive decision is a comparison, not a principle. What is recoverable at best, what is provable on the documents you actually hold, what the process costs in fees and management time, what the relationship is worth going forward, what the transition would cost if the relationship breaks, and what precedent either outcome sets for every other supplier in the portfolio. A modest claim pursued to a public loss can cost more than the exposure it addressed; a large claim settled quietly on bad evidence teaches the whole supply base that failures are unrecorded. The answer usually turns on the quality of the record rather than the strength of the feeling, which is why this lesson sits after the register and the change control lessons rather than before them. Finally, and this is the part executives actually care about: a claim is a diagnostic. If your organisation cannot prove a breach, the finding is not that the supplier is difficult, it is that your stewardship has no evidence layer - and the fix belongs in the obligation register, the exception log and the change mechanism, not in the legal budget.',
  why: [
    'Claims are won on contemporaneous records, not on the merits. The party with a dated log of failures has a case; the party with a strong feeling has an argument.',
    'Most contractual remedies are price mechanisms rather than compensation. Credits capped at a percentage of a fee do not cover a lost production week, and assuming they do hides the real exposure.',
    'Late accumulation is the normal pattern on both sides, which means the discipline of raising and recording small failures early is what keeps options open.',
    'The decision to pursue is commercial. Fees, management time, relationship value, transition cost and portfolio precedent can all exceed the recoverable amount, and none of them appear in the claim itself.',
    'Legal questions have legal answers. Remoteness, mitigation, limitation and the enforceability of a damages clause vary by jurisdiction and are the boundary where procurement advice must stop and qualified advice must start.'
  ],
  when: [
    'When a failure has material consequence and the contractual remedy needs to be invoked, waived or reserved.',
    'At renewal or final account, when accumulated performance becomes the negotiating position.',
    'When the counterparty submits a claim against you, and specifically before anyone responds on the substance.',
    'When a relationship is deteriorating enough that exit is being discussed, because transition rights are time-limited and evidence-dependent.'
  ],

  raci: [
    { role: 'Head of Procurement', resp: 'Owns the commercial position, decides whether to pursue, settle or reserve, and represents the portfolio precedent in that decision.' },
    { role: 'Contract Manager', resp: 'Assembles the evidence set - register, exception log, change history, correspondence - and states what is provable rather than what is believed.' },
    { role: 'Legal / Contracts Advisor', resp: 'Determines liability, remedy route, notice requirements and limitation position; owns anything touching enforceability or jurisdiction.' },
    { role: 'Business Owner / Finance', resp: 'Quantifies the operational and financial effect, funds any transition, and owns the decision to trade value for relationship continuity.' }
  ],
  inputs: [
    'The contract with its remedy, notice, dispute-resolution, liability-cap and termination clauses identified and read.',
    'The obligation register, exception log and variation register covering the disputed period.',
    'Correspondence, meeting minutes and service reports, in date order, including the ones that weaken your position.',
    'A quantified effect: what the failure cost, on what basis, with the assumptions visible and the mitigation attempted recorded.'
  ],
  outputs: [
    'A written position: liability, causation and quantum stated separately, each with its supporting document.',
    'A remedy decision with its economics: pursue, apply the contractual remedy, waive, settle at a stated value, or reserve.',
    'Notice under the correct clause, in the correct form, within the correct period - or a documented reason why not.',
    'A close-out note recording what the dispute revealed about stewardship, and the control change that follows.'
  ],
  controls: [
    'No substantive response to a submitted claim until Legal has reviewed the notice requirements and the limitation position.',
    'Remedy decisions are made against a stated value and a stated cost of pursuit, approved one level above the person who would own the failure.',
    'Evidence is assembled from contemporaneous records only; reconstructed timelines are labelled as such and carry less weight.',
    'Every settlement records whether it is full and final, what it admits, and what precedent it sets for other suppliers.'
  ],
  bestPractices: [
    'Write the weak documents too. A record that shows you raised the issue and were fobbed off is worth more than a record that shows only the failures that flattered you.',
    'Separate the four numbers: what happened, what the contract allows, what you can prove, and what you expect to recover. Confusing them is how organisations over-pursue and under-settle.',
    'Use the remedy conversation while the relationship is still healthy. A credit applied in month two is a correction; the same credit demanded in month thirty after a breakdown is a dispute.',
    'Close the loop into the next award. If a supplier\'s claims pattern is bad, the fix is in the specification, the rate card and the baseline - not in a tougher attitude later.'
  ],
  mistakes: [
    'Responding to a claim on the substance before checking the notice and limitation provisions, and thereby conceding a procedural position.',
    'Treating a capped service credit as the answer to a business loss of a different order, which closes off the real remedy.',
    'Pursuing a claim because it is the principle, without costing the pursuit or the transition it may trigger.',
    'Settling quietly and recording nothing, so the same failure is repeated under the same silence with a bigger number next time.'
  ],
  terms: [
    { term: 'Liquidated damages', def: 'A pre-agreed sum payable on a defined breach, intended as a genuine estimate of loss; whether it is enforceable or an unenforceable penalty is a legal question that varies by jurisdiction.' },
    { term: 'Service credit', def: 'A contractual reduction in fees for defined performance failures, usually capped, and often the exclusive remedy for that failure.' },
    { term: 'Full and final settlement', def: 'An agreement resolving all claims arising from a stated matter, which must be explicit about what is released and what survives.' },
    { term: 'Limitation period', def: 'The time within which a claim must be brought, set by applicable law rather than by the contract, and jurisdiction-specific.' }
  ],

  thinkingPoints: [
    {
      quote: 'We had been wronged for three years and could not prove a single week of it.',
      explanation: 'A logistics provider missed agreed delivery windows repeatedly. The operations team complained internally, escalated verbally, and adjusted their own plans to absorb the misses. At renewal, the buyer wanted a price reduction justified by service failure and discovered there was no dataset: no dated record of the promised window, no record of the actual, no notice served under the clause. The supplier produced their own performance report showing a strong on-time record against the definition they had chosen.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: whoever holds the definition and the data holds the argument, and absorbing a failure quietly converts it into your own operating cost rather than their contractual breach.',
      reflectionPrompt: 'If you had to prove a supplier failed you this year, which document would you put in front of them?'
    },
    {
      quote: 'The right decision was to settle for less and say nothing about principle.',
      explanation: 'A buyer held a genuine claim worth a substantial sum against a supplier whose failure was clear. Pursuing it meant a formal dispute with a partner that held the only qualified source for a critical line, a transition that would take two quarters, and a public fight over an ambiguous clause. The executive decision was a negotiated credit, an improved measurement definition, and a second source funded from the saving.',
      realWorldExample: 'Illustrative example: a case where the recoverable amount was smaller than the value of the relationship plus the cost of pursuing it - which is the ordinary case, and is not the same as weakness.',
      reflectionPrompt: 'Who in your organisation is authorised to decide that a valid claim is not worth pursuing, and how do they record it?'
    }
  ],

  sopSteps: [
    { title: 'Establish what the contract actually says before reacting', role: 'Contract Manager',
      desc: 'Read the clauses that govern the matter: the duty, the standard, the measurement definition, the remedy, the cap, the notice requirement and the dispute route. Note the deadlines attached to each. This step is done before any response is sent, including an informal one.',
      control: 'No substantive reply to a claim, and no assertion of a remedy, until the clause position is written down.',
      record: 'Clause summary with deadlines and the exact notice form required.',
      pitfall: 'Answering the argument rather than the mechanism, and thereby missing a notice window that decides the matter.' },
    { title: 'Assemble the contemporaneous evidence set', role: 'Contract Manager',
      desc: 'Pull the register, exception log, change orders, service reports and correspondence for the disputed period into one dated bundle, including the documents that weaken your position. Where a record does not exist, state that plainly rather than reconstructing one.',
      control: 'Every assertion of fact carries a dated artefact; reconstructed material is labelled as reconstructed.',
      record: 'Evidence bundle with an index, and a short statement of what is not evidenced.',
      pitfall: 'Writing a narrative first and looking for support afterwards, which produces a document that collapses under the first adverse question.' },
    { title: 'Separate liability, causation and quantum', role: 'Legal / Contracts Advisor',
      desc: 'Test the three parts independently. Was there a breach? Did that breach cause the loss rather than merely precede it? What is the loss on the basis the contract allows? Most disputes are strong on the first and weak on the second or third, and knowing which is the weak part changes the strategy entirely.',
      control: 'Each of the three has a stated position and a confidence, and the weakest is named.',
      record: 'Assessment note covering liability, causation and quantum separately.',
      pitfall: 'Assuming a clear breach means a recoverable loss; the remedy may be capped, exclusive or nominal.' },
    { title: 'Quantify the business effect with visible assumptions', role: 'Business Owner / Finance',
      desc: 'Put a number on what happened: lost output, re-work, expedite cost, additional inventory, management time, and any mitigation attempted. Show the basis. A number with assumptions is a negotiating position; a number without them is an invitation to argue.',
      control: 'Mitigation is recorded, because a claimant who did nothing to reduce the loss recovers less.',
      record: 'Quantum schedule with method, sources and assumptions stated.',
      pitfall: 'Presenting the worst credible figure as the opening position, which costs credibility on the parts of the claim that were solid.' },
    { title: 'Cost the pursuit and the alternative', role: 'Head of Procurement',
      desc: 'Estimate fees, management time and duration for each rung of the escalation ladder, and compare with the realistic recovery. Then cost the alternative: settlement value, relationship effect, transition cost if the relationship breaks, and the precedent either way sets across the supplier base.',
      control: 'The pursue, settle or reserve decision is approved one level above the person who would own the failure.',
      record: 'Decision note with the four numbers: recoverable, provable, cost to pursue, cost of the relationship breaking.',
      pitfall: 'Escalating on principle without a costed comparison, then settling at a worse number eighteen months later.' },
    { title: 'Escalate one rung at a time, in writing', role: 'Contract Manager',
      desc: 'Raise with the account manager and record it; serve formal notice under the clause; apply the contractual remedy; escalate to senior commercial leadership with a stated position; then invoke the dispute mechanism the contract provides. Each rung is a genuine opportunity to resolve, not a performance of patience.',
      control: 'Notice is served in the required form and within the required period, even when the relationship feels fine.',
      record: 'Dated escalation trail, one entry per rung, with the response received.',
      pitfall: 'Skipping straight to the legal step because the earlier conversation felt pointless - which usually forfeits the cheaper remedy and hardens the other side.' },
    { title: 'Settle deliberately, and record what the dispute revealed', role: 'Head of Procurement',
      desc: 'Where settlement is chosen, make it explicit: what is released, what survives, whether it is full and final, whether anything is admitted, and what changes in the mechanism as a condition. Then write the diagnostic: which control was missing, and who is accountable for installing it.',
      control: 'No settlement is signed without a stated scope of release and a documented control action.',
      record: 'Settlement agreement plus a close-out note feeding specification, rate card or register changes for the next award.',
      pitfall: 'Settling the money and leaving the mechanism untouched, which guarantees the same dispute at a larger number with a different supplier.' }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A supplier submits a claim for USD 640,000 for disruption caused by your re-sequencing of works. The contract requires notice of claim within 28 days of the event; the claim is submitted nine months later and covers eleven separate events.',
      q: 'What should you do first?',
      options: [
        { text: 'Reject the claim as time-barred.', isCorrect: false, rationale: 'That may be the eventual answer, but asserting it first is a mistake. Whether the clause bites depends on its construction, whether time was made a condition, whether you waived it by conduct, and what the applicable law does to such clauses - all legal questions, and a wrong assertion here hardens a dispute you may lose.' },
        { text: 'Take the claim to Legal for the notice and time-limit position, and in parallel assemble the contemporaneous record of the eleven events.', isCorrect: true, rationale: 'Correct. The procedural position is a legal question and the factual position is yours to build. Doing both before responding is what keeps every option open, including the strong one if the clause does not bite.' },
        { text: 'Offer a small settlement to make it go away, given the size of the exposure.', isCorrect: false, rationale: 'Settling before you know whether the claim is procedurally alive pays for a problem you may not have, and signals to a supplier that late accumulation is worth submitting.' },
        { text: 'Ask the project team whether the re-sequencing actually caused disruption.', isCorrect: false, rationale: 'Worth knowing, and it is causation - but it is the second question. The first is what the contract requires and by when, and that answer determines how much of the rest you need to do at all.' }
      ],
      principle: 'A late claim is a legal question before it is a commercial one. Get the procedural position from counsel, then build the facts.'
    },
    {
      type: 'scenario',
      context: 'A managed-service contract provides service credits of 0.5 percent of the monthly fee per missed SLA, capped at 5 percent monthly. A control failure caused a production outage the business values at USD 900,000. The maximum credit is USD 12,000.',
      q: 'What is the correct reading?',
      options: [
        { text: 'The credit is the answer: the contract has priced the failure, so USD 12,000 is what is owed.', isCorrect: false, rationale: 'Only if the credit is stated as the exclusive remedy for that failure, which is a clause-by-clause legal question. Assuming exclusivity in the buyer\'s favour is the most common way a real remedy is forfeited by reading.' },
        { text: 'The credit is a price mechanism for routine misses and almost certainly does not answer a catastrophic failure; take the exclusivity, liability-cap and negligence questions to Legal, and preserve the position in writing now.', isCorrect: true, rationale: 'Correct. Small capped credits and large consequential losses are usually governed by different clauses, and the gap between USD 12,000 and USD 900,000 is exactly where the contract\'s remedy architecture gets tested. What procurement owns is the record and the reservation of rights, not the interpretation.' },
        { text: 'Withhold the monthly invoice in full until the loss is covered.', isCorrect: false, rationale: 'Set-off rights are usually limited to amounts properly due and specific remedies. Withholding a whole invoice converts a performance dispute into your own payment breach and hands the supplier a claim with clean facts.' },
        { text: 'Re-tender the contract immediately.', isCorrect: false, rationale: 'Probably the right medium-term answer, and the wrong first move. Re-tendering while a USD 900,000 exposure is unresolved surrenders your leverage at exactly the moment you hold it, and the incumbent will not price your claim out of the bid.' }
      ],
      calcWork: 'USD 12,000 maximum credit against a USD 900,000 stated effect: a ratio of 1 to 75, which is the measure of how much of this loss the credit regime was ever designed to cover.',
      principle: 'A capped credit is a price for routine misses. Whether it is also the whole remedy for a serious failure is a legal question, and it is asked of the clause, not of your preference.'
    },
    {
      type: 'scenario',
      context: 'You hold a provable claim worth USD 85,000 against a sole-source supplier of a critical component. Legal costs to arbitration are estimated at USD 120,000 over eighteen months, and transition to an alternative source would take two quarters.',
      q: 'What is the best executive decision?',
      options: [
        { text: 'Pursue it: the principle matters more than the cost across a supplier base.', isCorrect: false, rationale: 'Precedent is a real consideration, but a claim pursued at a net loss with a sole source and no transition plan is precedent set on your own vulnerability. The principle argument is usually a refusal to do the arithmetic.' },
        { text: 'Negotiate a commercial outcome that trades value for mechanism - improved measurement, a defined remedy, a second-source commitment funded from the settlement - and record the decision and its economics.', isCorrect: true, rationale: 'Correct. The claim is worth less than the process costs, and the relationship carries risk you control nothing about. Converting a modest recoverable amount into structural protection is the highest-value use of the leverage you hold, and recording the economics keeps the decision defensible.' },
        { text: 'Waive the claim to preserve the relationship.', isCorrect: false, rationale: 'This gives away the only leverage you are likely to have and buys nothing, because the supplier has already learned that failures are not recorded. Waiver without a structural change is the worst rung on the ladder.' },
        { text: 'Offset the USD 85,000 against the next three invoices without discussion.', isCorrect: false, rationale: 'Unilateral set-off on a disputed amount is usually a breach in itself, and doing it silently against a sole source trades a small recovery for a large operational risk.' }
      ],
      calcWork: 'USD 85,000 recoverable against USD 120,000 of cost, before management time and before the transition exposure of a broken sole-source relationship.',
      principle: 'The decision is a comparison, not a principle. When pursuit costs more than recovery, the claim\'s value is the leverage it buys in a negotiation.'
    },
    {
      type: 'scenario',
      context: 'Two years into a contract, a dispute begins. The buyer\'s records are meeting notes and recollections; the supplier produces a dated exception log, service reports with definitions, and notices served under the clause.',
      q: 'What is the root cause?',
      options: [
        { text: 'The supplier is aggressive and well-organised in a way the buyer was not.', isCorrect: false, rationale: 'True as a description and useless as a diagnosis. It locates the problem in the counterparty\'s behaviour, which is the one thing you cannot change before the next dispute.' },
        { text: 'The buyer\'s stewardship had no evidence layer: no obligation register, no agreed measurement definitions, no notice discipline.', isCorrect: true, rationale: 'Correct. The dispute was lost in the second month, when the first failure was discussed and not recorded. Everything after that was arithmetic on a document that never existed.' },
        { text: 'The contract was not drafted tightly enough.', isCorrect: false, rationale: 'Worth reviewing, and rarely the deciding factor. The supplier\'s case here rests on records, not on better clauses - and a tighter contract with the same record-keeping produces the same outcome.' },
        { text: 'Procurement should have escalated earlier.', isCorrect: false, rationale: 'Escalating without a record produces an argument at a higher level, not a stronger position. The gap is evidence, not altitude.' }
      ],
      principle: 'Disputes are usually decided long before they start, by whoever was keeping the record. The claim is the diagnosis; the register was the cure.'
    },
    {
      type: 'scenario',
      context: 'A settlement is agreed: USD 180,000 credit and an improved measurement definition. The business owner wants the paperwork to say "commercial agreement in good faith" and move on.',
      q: 'What must the settlement document state?',
      options: [
        { text: 'Nothing further - the credit and the definition are the substance, and legal wording is a formality.', isCorrect: false, rationale: 'The wording is the substance. An agreement that does not say what is released leaves every other claim on the same facts alive, and a payment made without a release is a payment made twice.' },
        { text: 'Whether it is full and final, which claims and which period it releases, what survives, whether anything is admitted, and what happens if the new definition is breached.', isCorrect: true, rationale: 'Correct. Those five things are what a settlement buys. Without them the buyer has paid for a pause, the supplier can re-claim on the same facts, and the improved definition has no remedy attached.' },
        { text: 'A confidentiality clause, so other suppliers do not learn the terms.', isCorrect: false, rationale: 'Sometimes appropriate and often unenforceable in the way people expect, and it does not answer the question asked. Confidentiality hides the precedent; it does not close the claim.' },
        { text: 'An acknowledgement that neither party was at fault.', isCorrect: false, rationale: 'Common, and a trap if you may need those facts later. A no-fault acknowledgement can undercut a future claim on the same performance history, and it buys nothing that a properly scoped release does not.' }
      ],
      principle: 'A settlement without a stated scope of release is a payment, not a resolution. Say what is closed, what survives, and what the new mechanism costs if it fails again.'
    }
  ],

  relSop: 'sop-contract-review',
  rel: {
    concepts: ['liability-indemnity', 'service-level-agreement', 'change-control', 'contract-structure', 'audit-trail', 'supplier-performance-management'],
    sops: ['sop-contract-review', 'sop-contract-renewal', 'sop-supplier-performance-management'],
    checklists: ['cl-contract-review', 'cl-contract-renewal', 'cl-exception-approval', 'cl-supplier-risk-review'],
    templates: ['tpl-contract-change-request', 'tpl-contract-renewal-assessment', 'tpl-exception-request', 'tpl-business-case'],
    calcs: ['calc-multi-year-contract-cost', 'calc-savings-analysis', 'calc-tco'],
    decisions: ['renew-vs-resource', 're-source', 'approve-exception', 'supplier-financial-risk'],
    kpis: ['kpi-contract-compliance', 'kpi-defect-rate', 'kpi-otif', 'kpi-savings-realization'],
    glossary: ['gloss-sla', 'gloss-change-order', 'gloss-tco']
  },
  labMission: {
    title: 'Mission 16.3: Cost a Dispute Before You Start It',
    desc: 'Put a real disagreement through the four-number test - recoverable, provable, cost to pursue, cost of the relationship breaking - and write the decision rather than the feeling.',
    tasks: [
      'List the three parts of one claim you know about: liability, causation, quantum - and name the weakest with the document that would strengthen it.',
      'Estimate realistic recovery and the cost of each rung of the escalation ladder, including your own management time.',
      'Write the decision note: pursue, apply the remedy, settle at a stated value, or reserve - with the reason and the approver.'
    ],
    ctaLabel: 'Open Contract Renewal Assessment',
    ctaHref: '#/tpl/tpl-contract-renewal-assessment',
    secondaryLabel: 'Open Multi-Year Cost Tool',
    secondaryHref: '#/calc/calc-multi-year-contract-cost'
  }
});
