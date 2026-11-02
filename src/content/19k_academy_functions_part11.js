/* ==========================================================
   Procure Sherpa v3.0 - Academy Content Part 11
   One new lesson in each of the five modules that held only
   two. The topics are not invented: each fills a named gap in
   the requirements list the ledger already recorded - supplier
   onboarding and segmentation, the negotiation record, contract
   types and indexation, requisition intake and the approval
   matrix, corrective action and the business review.
   ========================================================== */
PS.ACADEMY_FUNCTIONS = PS.ACADEMY_FUNCTIONS || [];

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-supplier-onboarding',
  title: 'Supplier Onboarding and Segmentation: Putting a New Source on Rails',
  module: 'Module 4: Supplier Evaluation & Risk Management',
  kicker: 'Function 4.3',
  tier: 'practitioner',
  tagline: 'The window between award and first order, and the classification that decides how much governance the relationship gets.',
  desc: 'Award is where most procurement work stops and where the risk actually begins: a new supplier is unpaid, unregistered, uninsured, untested on systems and unknown to the people who will use them. This function covers segmentation as a live decision rather than a one-off chart, the onboarding sequence that makes a supplier usable, and the two things that most often go wrong - a critical supplier treated as routine, and a routine supplier onboarded so slowly the business bypasses it.',
  duration: '20 mins',
  lifecycleStage: 'Stage 6: Supplier Prequalification and Due Diligence',
  lifecycleDesc: 'Follows evaluation and award, and precedes first order: the point where the selection decision has to survive contact with finance, IT, the site and the calendar.',

  what: 'Segmentation is the allocation of scarce governance effort, and it is only useful when it is re-decided rather than remembered. The familiar two-by-two - spend against supply risk - is a starting frame, not an answer, because what actually determines how much attention a supplier needs is whether the business can substitute it this quarter. A mid-value supplier holding a sole-source position with an eighteen-month qualification cycle deserves more governance than a large-value commodity with four qualified alternatives. So segment on substitutability, criticality to delivery, financial and geographic exposure, data and physical access, and compliance footprint, and then place each supplier in a tier with a defined governance package: review frequency, scorecard depth, contingency expectation, relationship owner, and whether they appear in the business-continuity plan at all. The tiers are worth having precisely because they let you say no to governing everything. Onboarding is a sequence with a gate at the end, and it fails in the same four places every time. Registration: legal entity name, tax identifier, bank details verified by callback rather than by document, and a duplicate check against the existing vendor master - duplicate vendor records are how payments go to the wrong party and how a supplier can be paid twice for the same invoice. Compliance: insurance certificates with dates that outlast the contract, the security or quality attestation the category requires, conflict and sanctions screening, and any licence the work needs. Systems: purchase-order channel, invoice format, portal access, and a test transaction before the first real one, because an untested supplier\'s first invoice is usually an exception. And readiness: the site or budget holder who will actually raise orders knows the contact route, the price on the record, and the delivery terms they will be held to. The gate is simple and is frequently skipped: no first purchase order until every item is green, and any exception is named, time-limited and approved one level up rather than absorbed as a delay. The reason onboarding matters more than it appears is that it sets the default. A supplier onboarded properly becomes a normal line in the catalogue. A supplier onboarded in a hurry becomes a permanent workaround - expense claims, direct invoices, manual payments - and every one of those routes is invisible to spend visibility and to the controls that depend on it.',
  why: [
    'Substitutability, not spend, decides how much governance a supplier needs. A commodity giant with four alternatives is a lower risk than a small sole source that qualifies the same part nobody else can make.',
    'The first-order gate is the last cheap moment to fix a bank detail, a missing certificate or an untested invoice route. After the first payment those become investigations.',
    'Duplicate and unverified vendor records are the mechanism behind most payment fraud and most duplicate-payment loss, and both are created during onboarding rather than discovered later.',
    'Onboarding quality determines channel behaviour. A supplier that cannot be ordered against will be bought around, and the work-around spend never appears in the category it was sourced for.',
    'Tiers make governance sustainable. Without them the review calendar either covers everything, and therefore nothing properly, or shrinks to the loudest relationships.'
  ],
  when: [
    'Immediately after award, before the first purchase order and before any mobilisation payment.',
    'When an existing supplier changes entity, ownership, bank details, country of establishment or data-access scope - that is a new onboarding, not an update.',
    'At the annual re-segmentation, when substitutability and criticality are re-tested rather than copied forward.',
    'Whenever a category is re-tendered and the incumbent changes, because the outgoing supplier\'s exit and the incoming one\'s entry overlap.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Sets the tier, owns the onboarding plan and signs the readiness gate before the first order.' },
    { role: 'Supplier Relationship Owner', resp: 'Holds the relationship, runs the first-quarter review and feeds performance evidence back into re-segmentation.' },
    { role: 'Master Data / Vendor Clerk', resp: 'Creates the vendor record, performs the duplicate check and verifies banking by independent callback.' },
    { role: 'Finance Controller', resp: 'Confirms tax status, payment terms, insurance validity and the invoicing channel before the first settlement.' }
  ],
  inputs: [
    'The award file: evaluated offer, agreed price list, contract or terms, and the service or delivery scope.',
    'Supplier identity pack: legal entity, registration and tax identifiers, beneficial ownership, bank details and insurance certificates.',
    'Category risk profile: criticality, substitutability, data or site access, regulatory footprint and continuity exposure.',
    'System prerequisites: vendor master access, portal entitlements, purchase-order and invoice formats, and the requesting population.'
  ],
  outputs: [
    'Tiered supplier register with the governance package attached to each tier and the date of the next re-segmentation.',
    'Completed onboarding checklist with the readiness gate signed, and any exception named, approved and time-limited.',
    'Verified vendor record: no duplicate, bank confirmed by callback, tax status and payment terms set, price on the catalogue.',
    'First-quarter review note covering on-time performance, invoice exceptions and channel adoption.'
  ],
  controls: [
    'No first purchase order is released until the readiness gate is signed; exceptions are approved one level above the requester and expire.',
    'Bank details are verified by callback to a number held independently of the supplier, not by document review.',
    'Vendor creation is separated from payment approval, and duplicate detection runs against the whole master rather than the new record.',
    'Segmentation is re-decided on a stated cadence and any tier change is recorded with its reason.'
  ],
  bestPractices: [
    'Run a test transaction before the first real one. A dummy order and a sample invoice find most channel problems at zero cost.',
    'Tell the business the supplier is live, with the route. Onboarding that ends in a signed checklist nobody read to the site produces exactly the bypass you were trying to close.',
    'Keep a fast lane for low-risk suppliers. A single gate for a cleaning contractor and a sole-source safety component makes everyone route around the gate.',
    'Record why each supplier sits in its tier. The next re-segmentation is then a debate about facts rather than about memory.'
  ],
  mistakes: [
    'Segmenting on spend alone, which puts a small sole source in the lightest governance tier the organisation has.',
    'Accepting bank details from the same email thread that carries the invoice instructions, which is how payment redirection succeeds.',
    'Treating onboarding as a form completed by procurement rather than a readiness state involving finance, IT and the site.',
    'Letting the tier from the original assessment stand forever, so a supplier that became critical is still reviewed annually.'
  ],
  terms: [
    { term: 'Supplier segmentation', def: 'Placing suppliers into tiers with different governance, based on criticality and substitutability rather than spend alone.' },
    { term: 'Readiness gate', def: 'The signed point at which a new supplier is allowed to receive orders, having passed registration, compliance, systems and business readiness.' },
    { term: 'Vendor master duplication', def: 'The same supplier held under two or more records, which breaks spend visibility and enables duplicate payment.' },
    { term: 'Callback verification', def: 'Confirming bank details by calling a number held independently of the request, rather than trusting documents sent with it.' }
  ],

  thinkingPoints: [
    {
      quote: 'The supplier was onboarded in a week and worked around for a year.',
      explanation: 'A specialist consumables supplier won a competitive event and was registered quickly because the site needed stock. The invoicing channel was never tested and the price file was not loaded. The site ordered by email, invoices arrived directly to accounts payable and were paid against the email thread, and the contract\'s volume commitment was never measured. Spend visibility showed the category as unmanaged even though it had been sourced properly.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: onboarding that stops at registration leaves the business with no compliant route, and the compliant route is the only thing that makes a contract real.',
      reflectionPrompt: 'How many live contracts currently have no working ordering channel, and how would you find out this month?'
    },
    {
      quote: 'The tier decided who would notice.',
      explanation: 'Two suppliers failed in the same quarter. One was a high-value logistics provider in the top tier with a monthly review, so the failure appeared in a report within weeks and a recovery plan followed. The other was a low-value sole-source calibration house in the bottom tier with an annual desk review, and its failure was discovered when a plant stopped for four days waiting for a certificate.',
      realWorldExample: 'Illustrative example: segmentation is a bet on where problems will be visible. Getting it wrong does not remove the problem, it removes the warning.',
      reflectionPrompt: 'Which of your bottom-tier suppliers could stop a site, and what would tell you before it happened?'
    }
  ],

  sopSteps: [
    { title: 'Segment before you onboard', role: 'Category Manager',
      desc: 'Place the new supplier in a tier using criticality, substitutability, access and compliance footprint rather than contract value alone, and write the reason. The tier determines the depth of the rest of this procedure, and a supplier placed wrongly is governed wrongly for its whole life.',
      control: 'Every supplier carries a tier and a one-line reason, and no tier is assigned by spend alone.',
      record: 'Tier decision with the four factors assessed and the governance package attached.',
      pitfall: 'Defaulting to the middle tier to avoid an argument, which buys an average of attention for everything and guarantees under-attention for the risky few.' },
    { title: 'Verify identity and beneficial ownership', role: 'Master Data / Vendor Clerk',
      desc: 'Confirm the legal entity name, registration and tax identifiers, the country of establishment and who ultimately owns it, against an independent register rather than the documents supplied. Screen for sanctions and adverse media at the tier-appropriate depth, and record what was checked and when.',
      control: 'Identity evidence comes from an independent source, and screening is dated because ownership changes.',
      record: 'Verification note with sources checked, dates and the screening result.',
      pitfall: 'Accepting a trade register printout forwarded by the supplier as independent evidence of the supplier\'s own ownership.' },
    { title: 'Create the vendor record without duplicating one', role: 'Master Data / Vendor Clerk',
      desc: 'Search the existing master on name, tax identifier, bank account and address before creating anything, and merge or link where a record already exists. Duplicate vendor records are the mechanism behind both double payment and invisible spend, and they are almost always created during onboarding under time pressure.',
      control: 'Duplicate check runs on identifiers rather than on name spelling, and the result is recorded.',
      record: 'Vendor record with the duplicate search evidence attached.',
      pitfall: 'Matching only on trading style, so the same company registered under two spellings appears as two suppliers and two spend lines.' },
    { title: 'Confirm banking by independent callback', role: 'Finance Controller',
      desc: 'Call a number held on file before this transaction, or obtained from an independent register, to confirm the account and the account holder. Never confirm using a phone number, email or document that arrived with the change request itself, because that is the exact shape of a redirection fraud.',
      control: 'Banking is verified out-of-band before the first payment is possible, and the verifier is named.',
      record: 'Callback log with the number used, the person spoken to and the date.',
      pitfall: 'Treating verification as a formality for a supplier already trusted, which is the assumption every successful payment fraud depends on.' },
    { title: 'Load the commercial terms into the systems', role: 'Category Manager',
      desc: 'Put the agreed price list, currency, tax treatment, payment terms and delivery location into the catalogue or contract record so an order can actually be raised against them. A contract that exists only as a signed PDF cannot be complied with, because the compliant route does not exist.',
      control: 'No readiness gate is signed until a test order can be raised at the contracted price.',
      record: 'Catalogue or price-record entry plus the test order reference.',
      pitfall: 'Loading prices but not the ordering route, which produces a supplier the business can only use by email.' },
    { title: 'Run a test transaction end to end', role: 'Finance Controller',
      desc: 'Raise a nominal order, receive it, and have the supplier submit an invoice through the intended channel. This finds format rejections, portal access failures, tax-code mismatches and receipting confusion while all of them are cheap. Most onboarding problems are invisible until the first real invoice is late.',
      control: 'The gate requires a completed test cycle, not a statement that the systems are configured.',
      record: 'Test transaction reference with any exception and its resolution.',
      pitfall: 'Testing the order but not the invoice, which is where the failure usually lives.' },
    { title: 'Brief the people who will use the supplier', role: 'Supplier Relationship Owner',
      desc: 'Tell the requesting population and the site how to order, what the price is, who the contacts are, and what happens when something goes wrong. Then review the relationship inside the first quarter on evidence: channel adoption, on-time delivery, invoice exceptions and any work-around still in use.',
      control: 'First-quarter review is diarised at onboarding, and low channel adoption is treated as a defect rather than a preference.',
      record: 'Communication note and first-quarter review with adoption and exception data.',
      pitfall: 'Announcing the award instead of the route, so the business keeps doing what it was doing and the contract never gets used.' }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A calibration supplier with USD 40,000 annual spend is the only qualified source for a safety-critical measurement. Under your model, tiers are set by annual spend.',
      q: 'What is the correct response?',
      options: [
        { text: 'Leave it in the lowest tier: the model is consistent and consistency is the point.', isCorrect: false, rationale: 'Consistency in a model that measures the wrong thing is not governance. The model would also put a sole-source chemical with one plant in the lowest tier because it is cheap.' },
        { text: 'Segment on substitutability and criticality as well as spend, and move this supplier up a tier with the reason recorded.', isCorrect: true, rationale: 'Correct. What makes a supplier important is whether the business can replace it this quarter, and a four-day stoppage from a missing certificate is the cost of finding that out. Recording the reason also makes the next review a debate about facts.' },
        { text: 'Put every supplier in the top tier so nothing is missed.', isCorrect: false, rationale: 'That is not governance, it is an unstaffed calendar. When everything is critical, the reviews get shorter and the genuinely dangerous relationship is still the one nobody looked at.' },
        { text: 'Re-tender it so it is no longer a sole source.', isCorrect: false, rationale: 'Worth considering on its merits, and it is a different decision. Qualification cycles may make substitution slow or impossible, and the tier question has to be answered for the supplier you actually have.' }
      ],
      principle: 'Spend tells you how much a supplier costs. Substitutability tells you how much it can hurt.'
    },
    {
      type: 'scenario',
      context: 'A new supplier emails updated bank details from its normal address, with the finance director copied, two days before the first payment.',
      q: 'What should happen?',
      options: [
        { text: 'Update the record: the request came from a known address and an identifiable person.', isCorrect: false, rationale: 'This is precisely the shape of the most common payment-redirection loss. A known address is not evidence of a known intent, and the timing - immediately before first payment - is the pattern rather than an exception to it.' },
        { text: 'Hold the change and verify by callback to a number held independently of the request, recording who was spoken to and when.', isCorrect: true, rationale: 'Correct. Verification has to use a channel the requester does not control. If the details are genuine this costs a phone call; if they are not it is the only control that stands between the request and the money.' },
        { text: 'Update and then ask the supplier to confirm in writing afterwards.', isCorrect: false, rationale: 'A written confirmation from the same channel that made the request confirms nothing. It also creates a document trail that looks like control and provides no protection.' },
        { text: 'Pay the original account and ignore the request.', isCorrect: false, rationale: 'Safer than updating blindly, but it may be a legitimate change and the payment will fail. The answer is out-of-band verification, not refusal.' }
      ],
      principle: 'Verify payment details through a channel the person requesting the change does not control. Everything else is paperwork.'
    },
    {
      type: 'scenario',
      context: 'Three months after a well-run onboarding, 60 percent of the supplier\'s volume is arriving as direct invoices to accounts payable rather than through the contract route.',
      q: 'What does this indicate?',
      options: [
        { text: 'The business is non-compliant and needs an enforcement message.', isCorrect: false, rationale: 'This is the answer that feels strongest and is usually wrong. Three months in, with a route everyone was briefed on, mass bypass means the route is slower, harder or more expensive to use than the workaround.' },
        { text: 'The compliant route is incomplete - find what the invoice channel provides that the contract route does not, and treat that as an onboarding defect.', isCorrect: true, rationale: 'Correct. Bypass is data. Common causes are a missing price record, an approval chain longer than the need, no delivery location set, or a site that cannot receipt. Fix the route, then measure adoption.' },
        { text: 'Re-tender the category through a different supplier.', isCorrect: false, rationale: 'The problem is not the supplier and re-tendering will not fix a route nobody can use. It also costs a competitive event to solve a configuration defect.' },
        { text: 'Report the saving as realised anyway, since the contract price is being paid.', isCorrect: false, rationale: 'The price may be right while the control is absent: no volume commitment measured, no service data, no spend visibility, and the terms are unenforceable in practice. That is a claim that does not survive an audit.' }
      ],
      principle: 'Channel adoption is an onboarding test result, not a behavioural one. Low adoption means the compliant route is missing something.'
    },
    {
      type: 'scenario',
      context: 'A supplier changes ownership and country of establishment. The vendor record is otherwise unchanged and the bank account stays the same.',
      q: 'What is the correct treatment?',
      options: [
        { text: 'Update the two fields in the master and continue.', isCorrect: false, rationale: 'This treats onboarding as data maintenance. A change of entity and jurisdiction changes who you are contracting with, what law applies, who owns it, the tax treatment and often the sanctions position.' },
        { text: 'Re-run onboarding: re-verify identity and ownership, re-screen, re-confirm tax and banking position, and re-check the contract is with the right legal entity.', isCorrect: true, rationale: 'Correct. The relationship is the same and the counterparty is not. Re-onboarding is cheap once and is exactly the control that catches an entity moved to avoid a liability or a sanction.' },
        { text: 'Suspend the supplier until the new owner is known personally to the category manager.', isCorrect: false, rationale: 'Suspension without a defined re-check is arbitrary and will be reversed under delivery pressure. The answer is a process, not a relationship test.' },
        { text: 'Ask the supplier to confirm in writing that nothing else has changed.', isCorrect: false, rationale: 'A confirmation of no-change from the party that made the change is not assurance. Independent verification is what a change of this kind requires.' }
      ],
      principle: 'A change of entity is a new supplier with an old contract. Onboarding applies again, not a field update.'
    },
    {
      type: 'scenario',
      context: 'Your vendor master holds 4,100 active records for 2,900 distinct companies, and the tail is reviewed annually.',
      q: 'What is the most useful first action?',
      options: [
        { text: 'Delete the surplus records so the counts agree.', isCorrect: false, rationale: 'Deleting records with transaction history breaks audit trails and can orphan open orders. The count improves on screen and the risk stays in the payment run.' },
        { text: 'Identify duplicates by tax identifier and bank account, merge them properly, and stop creating them by enforcing the duplicate check at onboarding.', isCorrect: true, rationale: 'Correct. The finding is a control gap at the point of creation, not a data-cleaning job. Merging preserves history, and fixing the gate stops the population growing back next quarter.' },
        { text: 'Add a monthly reconciliation report so duplicates are spotted later.', isCorrect: false, rationale: 'Detection after creation is expensive and never complete. A report on a leak is not a repair, though it is worth having while the gate is being fixed.' },
        { text: 'Reduce the annual review scope so it covers only the top tier.', isCorrect: false, rationale: 'A reasonable governance decision on its own merits, and it does not address 1,200 duplicate records that distort spend visibility and enable double payment.' }
      ],
      calcWork: '4,100 records against 2,900 companies is a 41 percent overstatement of the supplier population, and every spend, coverage and concentration figure computed from it is wrong by roughly that shape.',
      principle: 'Duplicates are created at onboarding and paid for in the payment run. Fix the gate, then merge - never delete.'
    }
  ],

  relSop: 'sop-supplier-evaluation',
  rel: {
    concepts: ['supplier-qualification', 'supplier-segmentation', 'supplier-financial-risk', 'segregation-of-duties', 'audit-trail', 'supplier-relationship-management'],
    sops: ['sop-supplier-evaluation', 'sop-procurement-lifecycle', 'sop-supplier-performance-management'],
    checklists: ['cl-supplier-onboarding', 'cl-supplier-due-diligence', 'cl-supplier-risk-review'],
    templates: ['tpl-supplier-onboarding', 'tpl-supplier-due-diligence', 'tpl-supplier-risk-assessment'],
    calcs: ['calc-supplier-concentration', 'calc-kpi-calculator'],
    decisions: ['competitive-or-single', 'dual-source', 'supplier-financial-risk'],
    kpis: ['kpi-supplier-concentration', 'kpi-contract-coverage', 'kpi-otd'],
    glossary: ['gloss-doa', 'gloss-single-source', 'gloss-sole-source']
  },
  labMission: {
    title: 'Mission 4.3: Segment and Gate One Real New Supplier',
    desc: 'Put a supplier you actually have into a tier with a written reason, then walk the onboarding gate and find which of the four failure points applies.',
    tasks: [
      'Score one supplier on criticality, substitutability, access and compliance footprint rather than on spend, and write the tier reason.',
      'Run the Supplier Onboarding checklist against it and list the items that are signed but not evidenced.',
      'Check whether a test order and a test invoice have ever been completed, and what the answer says about channel adoption.'
    ],
    ctaLabel: 'Open Supplier Workbench',
    ctaHref: '#/suppliers',
    secondaryLabel: 'Open Supplier Onboarding Checklist',
    secondaryHref: '#/cl/cl-supplier-onboarding'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-negotiation-record',
  title: 'Concessions, Authority and the Negotiation Record',
  module: 'Module 5: Negotiation Strategy & Commercial Terms',
  kicker: 'Function 5.3',
  tier: 'practitioner',
  tagline: 'Trading issues deliberately, recording what was given for what, and closing inside the authority you were actually granted.',
  desc: 'Negotiations are usually lost after the table, by whoever cannot say what was agreed. This function covers concession planning - what is traded, in what order, against what return - the authority envelope that keeps a good session from becoming an unapproved commitment, and the close-out record that makes the outcome enforceable and auditable.',
  duration: '22 mins',
  lifecycleStage: 'Stage 13: Commercial Negotiation',
  lifecycleDesc: 'Runs through and immediately after the negotiation event, and is the input to contract formulation: what the drafting party is told to write down.',

  what: 'A concession is a thing you give, and the discipline is in the giving. Unplanned negotiation follows the loudest issue: the supplier pushes on price, you resist, both sides trade the visible number, and the terms that cost more over five years - indexation basis, exit assistance, liability cap, data ownership, service definitions - are settled by whoever mentioned them last. A concession plan reverses that. List every issue in play, mark each as fixed or tradeable, assign a value to each from your own side\'s perspective, and decide in advance the sequence in which you will move and what return each move requires. Then write the walk-away: the point at which no further trade is acceptable, expressed in the terms that matter rather than in a price. Three rules make this real. First, never concede without a return, and never concede twice on the same issue for the same return; a concession given freely is read as an error in the opening position and invites the next request. Second, concede in descending value - give the things you valued highly but the other side will trade cheaply, and buy back the issues that are cheap for them and expensive for you. The classic loss is paying real money for a term the supplier would have granted for nothing because it cost them nothing. Third, keep the trade log: what you moved, what they moved, in what order. At the end of a long session that log is the only reliable account of the deal, and it is what stops a settlement agreed in hour six being renegotiated in the contract draft because nobody recorded it. Authority is the second half. The envelope - target, acceptable range, walk-away, and the issues you may not trade at all - should be written before the session and signed by someone who can approve it. Negotiations fail organisationally in two directions: the negotiator who holds too tight and loses a good deal, and the one who exceeds authority and produces a commitment the business must either honour or unwind. Both are prevented by the same document. Where the session needs to move outside the envelope, the correct action is an adjournment and an approval call, not a creative reading of the terms; a deal that has to be re-approved after signature is worse than a delay. The close-out record is where most of the value is recoverable. Write the agreed position on each issue in the order it was settled, with the numbers, the assumptions and anything explicitly left open, and send it to the other side within twenty-four hours with a stated deadline for objection. That single document does four jobs: it fixes the drafting brief, it prevents the quiet re-trade during contract preparation, it becomes evidence if the agreement is later disputed, and it is what the savings validation will rest on. Silence in the face of a written summary is not agreement, so the record has to say what happens if nobody objects - and the honest answer is that the open items stay open.',
  why: [
    'Most of the money in a negotiation is in the terms, not the headline price, and the terms are settled by whoever remembers to write them down.',
    'An unlogged concession is invisible at close-out, which is when the total of everything given becomes clear and too late to trade back.',
    'Authority defined in advance protects the organisation from a good session: the deal that feels fair in the room is not automatically the deal the budget holder agreed to fund.',
    'A same-day written summary is the cheapest available insurance against the re-trade that happens during contract drafting, when neither party is at the table.',
    'The record is what makes a claimed saving auditable. Without it the baseline is a memory and the comparison is an assertion.'
  ],
  when: [
    'Before the session, when the envelope and the concession plan are written and approved.',
    'During the session, on every move, in the trade log.',
    'Within twenty-four hours after the session, when the written close-out goes to the other side.',
    'At contract formulation, when the record becomes the drafting brief, and at savings validation, when it becomes the evidence.'
  ],

  raci: [
    { role: 'Lead Negotiator', resp: 'Owns the concession plan and the trade log, and keeps the session inside the approved envelope.' },
    { role: 'Budget Holder / Approver', resp: 'Sets and signs the authority envelope, and approves any move outside it before commitment.' },
    { role: 'Commercial / Legal Reviewer', resp: 'Converts the close-out record into drafting instructions and flags any term that cannot be written as agreed.' },
    { role: 'Finance', resp: 'Confirms the value of each traded issue and validates the saving against the recorded baseline.' }
  ],
  inputs: [
    'The concession plan: issues in play, each marked fixed or tradeable, valued from your own side, with the intended sequence.',
    'The signed authority envelope: target, acceptable range, walk-away, and the issues that may not be traded.',
    'The baseline and comparison data the negotiation rests on, including the alternative you would actually take.',
    'The trade log and the close-out summary template, prepared before the session rather than improvised after it.'
  ],
  outputs: [
    'Completed trade log: each move, the return required, and the position at close.',
    'Signed close-out summary issued to the counterparty with an objection deadline, listing agreed terms and open items.',
    'Drafting instructions for the contract, derived from the record rather than from recollection.',
    'Approved variance note where anything moved outside the envelope, with the approver and the reason.'
  ],
  controls: [
    'No concession is made without a recorded return, and no issue is conceded twice for the same return.',
    'The authority envelope is signed before the session; exceeding it requires adjournment and approval, not interpretation.',
    'The close-out summary is issued within twenty-four hours and states what happens if no objection is received.',
    'Savings are validated against the recorded baseline and the trade log, not against the opening position.'
  ],
  bestPractices: [
    'Value every issue in your own currency before the room: what the term is worth to you, and what you estimate it costs them. That asymmetry is where good trades live.',
    'Write the walk-away as a condition, not a number. "We will not accept a five-year term without annual exit" survives a changed price better than a figure does.',
    'Use a second note-taker. The lead cannot both argue and record accurately, and the record is worth more than the marginal point.',
    'Send the summary even when the session went badly. The awkward version of events written down early is cheaper than the disputed version discovered at signature.'
  ],
  mistakes: [
    'Trading the visible price because it is measurable, while the indexation basis moves unobserved for the life of the contract.',
    'Agreeing "in principle" to a term and leaving it to the contract draft, where it is settled by whoever has the stronger lawyer rather than the better case.',
    'Recording only the outcome, which loses the reason and makes the next negotiation start from nothing.',
    'Letting the close-out summary wait until the contract is drafted, by which point the counterparty has re-formed their memory.'
  ],
  terms: [
    { term: 'Concession plan', def: 'A pre-agreed schedule of what may be given, in what order, against what return, with the walk-away stated as a condition.' },
    { term: 'Authority envelope', def: 'The approved range within which a negotiator may commit: target, acceptable limits, walk-away and non-tradeable issues.' },
    { term: 'Trade log', def: 'The running record of each move and its return during a negotiation, used to reconstruct the deal at close-out.' },
    { term: 'Close-out summary', def: 'The written statement of agreed and open items issued after the session, with an objection deadline, that becomes the drafting brief.' }
  ],

  thinkingPoints: [
    {
      quote: 'We won four percent on price and gave back nine on the index.',
      explanation: 'A two-year distribution agreement was negotiated hard on the unit rate and settled four percent below the opening. The indexation clause was left to the draft, where the supplier proposed linking to a producer price index with no cap and no lag. It cost more over the term than the entire saving, and the negotiation record showed nobody had ever valued the index.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: the issues that are not valued before the session are the ones that get settled afterwards, by whoever drafts first.',
      reflectionPrompt: 'Which terms in your last negotiation were never written on the concession plan, and where did they end up?'
    },
    {
      quote: 'The summary email was the deal.',
      explanation: 'A services negotiation ended late with a settlement neither side could fully reconstruct. The buyer sent a written summary the next morning listing eight agreed points and two left open, with a deadline for objection. The supplier objected to one item, which was corrected, and the contract was drafted from that document. The other bidder, in a similar position, waited for the contract draft and spent three weeks re-litigating a conversation everyone had forgotten.',
      realWorldExample: 'Illustrative example: control in negotiation is often just the discipline of writing first, accurately, with the other side able to correct it.',
      reflectionPrompt: 'Who in your organisation writes the close-out record, and does the counterparty ever see it before the contract does?'
    }
  ],

  sopSteps: [
    { title: 'Build the concession plan before the session', role: 'Lead Negotiator',
      desc: 'List every issue in play, mark each fixed or tradeable, value it from your own side, and set the order in which you will move with the return each move requires. Include the issues nobody has raised yet, because the terms that decide the five-year cost are usually the ones that were never on the agenda.',
      control: 'No issue enters the room unvalued, and the plan is reviewed with the approver before the session.',
      record: 'Concession plan with values, sequence and returns stated.',
      pitfall: 'Planning only the price line, which leaves indexation, liability, exit and data ownership to be settled by whoever remembers them at hour five.' },
    { title: 'Get the authority envelope signed', role: 'Budget Holder / Approver',
      desc: 'Write the target, the acceptable range, the walk-away expressed as a condition rather than a number, and the issues that may not be traded at all, and have it approved before the session. The envelope is what allows a negotiator to be firm quickly and to know when to stop rather than to improvise.',
      control: 'Authority is documented before commitment, and any move outside it requires an adjournment and a named approver.',
      record: 'Signed envelope with the approval date and the approver.',
      pitfall: 'An envelope written by the negotiator and never tested with the person who owns the budget, which is authority in name only.' },
    { title: 'Keep the trade log during the session', role: 'Lead Negotiator',
      desc: 'Record each move as it happens: what was given, what was received, and the position at that point. Use a second note-taker where the session is contested, because arguing and recording accurately at the same time is not realistic, and the log is what the close-out will be written from.',
      control: 'Nothing is conceded without a recorded return, and no issue is traded twice for the same return.',
      record: 'Dated trade log with each move and its counterpart.',
      pitfall: 'Trusting memory across a long session, which reliably reconstructs the deal as the version most favourable to the person remembering it.' },
    { title: 'Adjourn rather than exceed', role: 'Lead Negotiator',
      desc: 'Where the only remaining movement is outside the envelope, stop and take an approval decision instead of finding language that could be read two ways. A short delay costs less than a commitment the organisation must either honour against its own limits or unwind after it has been made.',
      control: 'Exceeding authority is a recorded exception with an approver, never a drafting choice.',
      record: 'Variance note with the reason, the approver and the date.',
      pitfall: 'Agreeing "subject to contract" as a way round the envelope, which transfers the argument to the drafting stage where there is no negotiation left.' },
    { title: 'Issue the close-out summary within twenty-four hours', role: 'Lead Negotiator',
      desc: 'Write the agreed position on each issue in the order it was settled, with numbers, assumptions and the items explicitly left open, and send it to the counterparty with a stated deadline for objection. Say what happens if nobody objects, and mean that open items stay open.',
      control: 'The summary is issued before any draft is prepared, and objections are recorded rather than absorbed.',
      record: 'Close-out summary with the objection deadline and any corrections received.',
      pitfall: 'Treating silence as agreement, which is the mechanism behind most late-stage re-trades and the argument that follows them.' },
    { title: 'Convert the record into drafting instructions', role: 'Commercial / Legal Reviewer',
      desc: 'Turn the agreed summary into the terms to be written, clause by clause, and flag anything that cannot be drafted as agreed. Where a term is legally different from what was settled - a cap that does not work as intended, an exit that is unenforceable in the jurisdiction - that gap is raised and decided, not quietly resolved in the document.',
      control: 'Draft is checked line by line against the close-out summary before it is issued.',
      record: 'Drafting brief and a reconciliation note showing each agreed term against its clause.',
      pitfall: 'Handing over a summary and letting the drafting party decide what "in principle" meant, which is where negotiated terms go to die.' },
    { title: 'Validate the outcome against the recorded baseline', role: 'Finance',
      desc: 'Compare the settled position with the baseline in the record rather than with the opening offer, and state the method. Where part of the benefit came from a term rather than a price, classify it honestly, because a saving assembled from the opening number is the fastest way to lose credibility in the next validation review.',
      control: 'Savings are validated on the trade log and baseline, with the method stated and the counterparty\'s opening position shown separately.',
      record: 'Savings validation sheet referencing the close-out summary and the baseline used.',
      pitfall: 'Counting the distance from the first quote as the saving, which rewards a worse opening offer and cannot be reconciled by anyone else.' }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'In a renewal the supplier asks for a five-year term with annual price review. Your envelope covers price and service levels; nobody considered term length.',
      q: 'What is the right move?',
      options: [
        { text: 'Agree the term: it is not in the envelope, so it is not restricted.', isCorrect: false, rationale: 'This is the gap in the plan, not permission. A five-year lock with an uncapped annual review is the most valuable thing either side will trade in the session, and agreeing it because nobody valued it is how a good price becomes a bad contract.' },
        { text: 'Treat term length as an issue with a value, adjourn if the movement needed exceeds authority, and get the envelope extended deliberately.', isCorrect: true, rationale: 'Correct. The envelope can be widened, but by an approver and on the record. What must not happen is a commitment made in a gap that was never decided because it was never listed.' },
        { text: 'Refuse five years because longer terms are always worse.', isCorrect: false, rationale: 'A reflex, not an analysis. A five-year term with the right index, the right exit and a real investment commitment can be the better deal; the point is to trade it, not to veto it by habit.' },
        { text: 'Accept five years but only with no price review at all.', isCorrect: false, rationale: 'This trades a lock-in for a fixed price in an inflationary category, which is a decision about risk rather than about value, and it is made without knowing what the review basis would have been.' }
      ],
      principle: 'Every issue that can be traded has a value, including the ones nobody listed. If it is not in the envelope, it is an adjournment, not a free concession.'
    },
    {
      type: 'scenario',
      context: 'You have conceded payment terms, a reporting change and a scope addition. The supplier has moved price by half of what you expected.',
      q: 'What should happen next?',
      options: [
        { text: 'Concede one more item to unlock the price movement.', isCorrect: false, rationale: 'You have already given three returns for one partial movement. Adding a fourth teaches the counterparty that concessions arrive without being bought, and it removes the only leverage left.' },
        { text: 'Stop trading, restate the position on the record, and put the remaining gap back as a single question with a stated consequence.', isCorrect: true, rationale: 'Correct. The pattern is what matters: three gives, one half-return. Naming it and pausing is the move that either produces the trade or reveals that the counterparty is not going to move, which is information you need before spending anything else.' },
        { text: 'Accept the position, since three concessions have already produced some benefit.', isCorrect: false, rationale: 'Sometimes correct on the merits, and only knowable by valuing the trade as a whole. Accepting because the session feels finished is how the total of what was given becomes clear a month later.' },
        { text: 'Escalate to both managing directors immediately.', isCorrect: false, rationale: 'Escalation is a rung, not a reflex. It costs the relationship and it is far more effective once the record shows what was traded and what was not returned.' }
      ],
      calcWork: 'Three concessions against a half-return is a negative trade ratio. The plan should have stopped after the first unreturned move rather than reaching the third.',
      principle: 'Count the trade ratio, not the atmosphere. Concessions that are not returned are the only reliable signal that the other side has no room left.'
    },
    {
      type: 'scenario',
      context: 'A session ends at 8pm with an agreed settlement. The draft contract arrives three weeks later and reads differently on two points.',
      q: 'What most likely caused that?',
      options: [
        { text: 'The supplier negotiated in bad faith.', isCorrect: false, rationale: 'Possible, and it should be tested. But the far more common cause is that no one produced an agreed written position within a day, so the drafting was done from two different memories.' },
        { text: 'There was no close-out summary issued and acknowledged, so the drafting stage became the negotiation by default.', isCorrect: true, rationale: 'Correct. The twenty-four-hour summary is what closes the deal. Without it, whoever drafts first effectively negotiates second, and the party with the drafting pen usually wins the points nobody recorded.' },
        { text: 'The legal team misread the instructions.', isCorrect: false, rationale: 'There were no instructions. Blaming the reader assumes a document existed, and the absence of the record is the finding.' },
        { text: 'The negotiator exceeded authority.', isCorrect: false, rationale: 'A different failure, and one the envelope would have caught. Nothing here suggests the settlement was outside limits; it suggests it was never written down.' }
      ],
      principle: 'If the deal is not written within a day, the draft contract becomes the negotiation - and the drafting pen holds the advantage.'
    },
    {
      type: 'scenario',
      context: 'The team reports a saving of 12 percent because the supplier\'s opening quote came down by 12 percent.',
      q: 'What is wrong with that claim?',
      options: [
        { text: 'Nothing, provided the quote is documented.', isCorrect: false, rationale: 'Documentation makes the arithmetic checkable and the comparison still wrong: an opening quote is a position, not a baseline, and a supplier who opens high has simply negotiated in your currency.' },
        { text: 'It measures movement from an opening position rather than from the baseline actually being replaced, and it rewards a worse first quote.', isCorrect: true, rationale: 'Correct. The saving is the distance from what you would otherwise have paid, on the same scope, volume and period. Measured from the opening quote, the number is a description of the supplier\'s tactics rather than of your result.' },
        { text: 'It should be reported as cost avoidance instead.', isCorrect: false, rationale: 'Reclassifying to dodge a measurement problem damages every other claim. Fix the baseline instead, and say which one was used.' },
        { text: 'It should be netted against the concessions given, which is what the trade log is for.', isCorrect: false, rationale: 'Worth doing, and it makes the claim more honest - but it does not fix the baseline. Both corrections are needed, and the baseline is the first one.' }
      ],
      principle: 'A saving is measured from the baseline you are replacing, on the same scope and volume. The opening quote is not a baseline.'
    },
    {
      type: 'scenario',
      context: 'Your negotiator is also the person who will manage the supplier day to day after award.',
      q: 'What control matters most?',
      options: [
        { text: 'Nothing special: continuity of relationship is worth more than separation.', isCorrect: false, rationale: 'Continuity has real value, and it is also the reason a negotiator may trade a permanent term for a short-term goodwill gain. The risk is not the relationship, it is the unexamined concession.' },
        { text: 'A signed authority envelope and an independent close-out review, so the person who benefits from goodwill is not the only person deciding what was given away.', isCorrect: true, rationale: 'Correct. Separation of the decision from the relationship is the control. The envelope limits what can be committed, and a second reader of the close-out catches the term that feels harmless in month one and expensive in year four.' },
        { text: 'Have legal run the negotiation instead.', isCorrect: false, rationale: 'This moves the problem rather than solving it. Legal may protect the terms and lose the commercial outcome, and the relationship still sits with the person who did not negotiate.' },
        { text: 'Prohibit the same person from both roles.', isCorrect: false, rationale: 'In most organisations the same person must do both. A rule that cannot be followed just moves the control onto paper while the actual exposure stays.' }
      ],
      principle: 'When the negotiator is also the relationship owner, the envelope and an independent read of the close-out are what keep goodwill from being bought with other people money.'
    }
  ],

  relSop: 'sop-negotiation-preparation',
  rel: {
    concepts: ['concession-management', 'negotiation-leverage', 'negotiation-planning', 'batna', 'zopa', 'audit-trail'],
    sops: ['sop-negotiation-preparation', 'sop-contract-review', 'sop-savings-calculation'],
    checklists: ['cl-negotiation', 'cl-negotiation-closeout', 'cl-savings-validation'],
    templates: ['tpl-negotiation-planner', 'tpl-negotiation-concession-log', 'tpl-negotiation-summary', 'tpl-negotiation-agenda'],
    calcs: ['calc-negotiation-savings', 'calc-savings-analysis', 'calc-payment-terms'],
    decisions: ['negotiate-or-accept', 'accept-price-increase', 're-source'],
    kpis: ['kpi-savings', 'kpi-roi', 'kpi-savings-realization'],
    glossary: ['gloss-batna', 'gloss-zopa', 'gloss-ppv']
  },
  labMission: {
    title: 'Mission 5.3: Value Every Issue Before the Room',
    desc: 'Use the negotiation planner and concession log to price the terms, not only the price, and write an authority envelope someone else can hold you to.',
    tasks: [
      'Open the Negotiation Planner and list every issue in your next negotiation, marking each fixed or tradeable.',
      'Value three terms that are usually left to the draft - indexation basis, liability cap, exit assistance - and compare them with the price gap.',
      'Write the walk-away as a condition rather than a number, and have the envelope approved before the session.'
    ],
    ctaLabel: 'Open Negotiation Planner',
    ctaHref: '#/tpl/tpl-negotiation-planner',
    secondaryLabel: 'Open Negotiation Savings Tool',
    secondaryHref: '#/calc/calc-negotiation-savings'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-contract-types-renewal',
  title: 'Contract Types, Indexation and the Renewal Window',
  module: 'Module 6: Contracting & Governance',
  kicker: 'Function 6.3',
  tier: 'practitioner',
  tagline: 'Choosing the pricing structure that fits the demand, and deciding about renewal long before the notice date forces the decision.',
  desc: 'Fixed price, cost-plus, time and materials, milestone, framework or call-off: the structure decides who carries volume risk, who carries cost risk and what you can still see. This function covers choosing between them, building an index that does not silently reprice the contract, and running renewal, extension and expiry as a planned decision with a date on it.',
  duration: '25 mins',
  lifecycleStage: 'Stage 15: Contract Formulation & Legal Review',
  lifecycleDesc: 'Decided at formulation, tested at every renewal, and the mechanism that determines whether year three looks like year one.',

  what: 'The pricing structure is a risk allocation, and it should be chosen the way any risk decision is made: by asking who is better placed to carry each one. Fixed price transfers cost risk to the supplier and therefore costs a premium, and it works where the scope is definable and stable - it fails expensively where scope moves, because the supplier either absorbs and stops cooperating, or claims. Cost-plus transfers cost risk to the buyer and pays for openness; it is only defensible where the work genuinely cannot be scoped in advance and where audit rights over the build-up are real and used. Time and materials prices capacity rather than outcome and rewards slow work unless the rate card, the productivity expectation and the acceptance test are all specified. Milestone payment suits deliverable work with verifiable completion, and its failure mode is paying for the artefact rather than for the accepted outcome. Frameworks and call-offs buy access rather than volume, and their value depends entirely on whether the business actually routes to them - a framework nobody uses is a price list with a governance cost. Indexation is where the structure meets time, and it is the most under-managed clause in most agreements. A well-built index has four parts: the published series it references, named and dated; the weighting of the components and what happens when the mix changes; the timing - lag, effective date, and whether the adjustment is annual, semi-annual or event-driven; and the collar, being the floor and cap that bound the exposure. The common failure is an index that reprices on a series the supplier chose because it rises fastest, or a clause with no lag that lets a cost increase pass through immediately while a decrease arrives on request. Ask what the index does when the underlying falls, and the answer tells you whether it is an index or a ratchet. Renewal is a decision with a calendar, not an event with a date. Work backwards from the notice period: if notice is six months before expiry, the decision must be made nine months out, which means performance data, market check and the alternative plan exist before the counterparty knows you are thinking about it. Three routes are always available - renew as-is, re-negotiate with the market check as leverage, or re-tender - and the honest default is not to renew by default. An extension clause exercised without a market check is a decision to pay an untested price for another period, and it is the most common way a category quietly becomes sole-sourced for a decade. Finally, expiry management: a contract that lapses without either renewal or a replacement route does not end the spend, it ends the terms. The business keeps buying on the old price with no service level, no audit right and no exit, and the only record that anything happened is a supplier invoice that still references an expired agreement.',
  why: [
    'The pricing structure decides what you can see. A cost-plus contract with unused audit rights is an open book nobody reads; a fixed price with unstated exclusions is a claim waiting to be filed.',
    'Indexation usually moves more money than the negotiation did, and it is set once, in a drafting conversation, with nobody from the commercial team present.',
    'Renewal decided without a market check is a price decision made by the party with the better information about their own costs and no competition.',
    'Lapsed contracts do not stop spend, they stop control: the terms, the service levels and the exit rights end while the transactions continue.',
    'Notice periods are the cheapest leverage available, because they are the only moment the counterparty genuinely needs something from you.'
  ],
  when: [
    'At formulation, when the structure is chosen against the demand profile rather than by category habit.',
    'Whenever an index is proposed: test it against a fall in the underlying as well as a rise.',
    'Nine to twelve months before expiry, when the renewal decision has to be prepared rather than reacted to.',
    'At each extension exercise, which should be a decision with a market check attached rather than a letter sent on request.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Chooses the structure against the demand profile, owns the market check and recommends the renewal route.' },
    { role: 'Finance', resp: 'Validates the index mechanics and the exposure at the collar, and confirms the treatment of the committed spend.' },
    { role: 'Legal / Contracts Advisor', resp: 'Drafts the index, notice and extension provisions and confirms what is enforceable in the applicable jurisdiction.' },
    { role: 'Budget Holder', resp: 'Confirms the scope is stable enough for the structure chosen, and owns the decision to accept price risk.' }
  ],
  inputs: [
    'Demand profile: volume variability, scope stability, and how much of the spend is genuinely forecastable.',
    'The proposed pricing structure with its exclusions, and the audit or substantiation rights attached to it.',
    'The index definition: series, components and weights, lag, effective date, collar, and what happens on a change of mix.',
    'The contract calendar: expiry, notice period, extension options and the dates each decision must be taken.'
  ],
  outputs: [
    'Structure decision note: what risk each party carries, why, and what the buyer can still see under the chosen form.',
    'Index worked example: the adjustment under a rise and under a fall, with the collar applied and the effective dates shown.',
    'Renewal decision pack: performance against obligations, market check, options, recommended route and the approval date.',
    'Contract calendar entries for notice, decision and expiry, each with an owner and an alert ahead of the date.'
  ],
  controls: [
    'No index is accepted without a worked example showing both a rise and a fall in the underlying, and no collar without a stated exposure.',
    'Renewal or extension requires a documented market check; a re-tender is the default unless the check justifies otherwise.',
    'Notice periods are diarised with an alert that precedes the decision date, not the notice date.',
    'A contract reaching expiry without a decision is escalated as a control failure, and continuing spend is reported against it.'
  ],
  bestPractices: [
    'Choose the structure from the demand profile, not from what the category always uses. A stable consumable and a variable project service should not share a form.',
    'Name the index series and its publisher in the contract, with a stated replacement if it is discontinued - this happens more often than drafting assumes.',
    'Run the market check early and quietly. Once the counterparty knows renewal is being tested, the check stops being free.',
    'Treat expiry as a date with an owner. The failure mode is not a missing contract, it is a spend line nobody is responsible for.'
  ],
  mistakes: [
    'Accepting a ratchet dressed as an index, where increases pass through automatically and decreases need a request.',
    'Exercising an extension option as administrative housekeeping, which is a price decision made without evidence.',
    'Fixed-pricing a scope nobody can define, then being surprised by the variation claims that follow.',
    'Letting the notice period pass because the decision was uncomfortable, and inheriting a worse position than the one you could have negotiated.'
  ],
  terms: [
    { term: 'Cost-plus', def: 'A structure where the buyer reimburses verified cost and pays an agreed margin, transferring cost risk to the buyer in exchange for visibility.' },
    { term: 'Indexation collar', def: 'The floor and cap applied to an indexed price adjustment, bounding exposure in both directions.' },
    { term: 'Extension option', def: 'A contractual right to extend a term on stated terms, exercisable within a notice window and requiring the same scrutiny as a renewal.' },
    { term: 'Contract lapse', def: 'Expiry of an agreement without renewal or replacement, ending the terms while the transactions continue unmanaged.' }
  ],

  thinkingPoints: [
    {
      quote: 'The index was drafted after the negotiation, and it repriced the whole deal.',
      explanation: 'A packaging agreement was settled at three percent below the incumbent. The index clause was left to the drafting stage and referenced a producer price series chosen by the supplier, with quarterly application and no lag. In the first two periods the index moved more than the negotiated discount, and the buyer discovered the mechanism only when the invoices changed.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a term nobody valued in the room is still a price, and the drafting stage is where unvalued terms get decided by the other side.',
      reflectionPrompt: 'Which clause in your largest current contract has repriced it more than the negotiation did?'
    },
    {
      quote: 'We extended because the paperwork was easier than the decision.',
      explanation: 'A facilities contract was extended twice on the original terms, twelve months at a time, because the notice window for a challenge had passed and the site wanted continuity. At the third review a market check found the rate was well above current pricing for the same specification, and re-tendering took nine months because no transition had been planned.',
      realWorldExample: 'Illustrative example: an administrative default is still a procurement decision, and it usually costs more than the process it avoided.',
      reflectionPrompt: 'How many of your live agreements are on their second or third extension, and when did anyone last check the market?'
    }
  ],

  sopSteps: [
    { title: 'Test the demand profile before choosing a structure', role: 'Category Manager',
      desc: 'Measure how variable the volume is, how stable the scope, and how much of the spend can be forecast with confidence. The answers decide who should carry which risk, and a structure chosen by category habit rather than by this test is the origin of most long-running commercial arguments.',
      control: 'The structure decision names the risk each party carries and why that allocation is cheaper than the alternative.',
      record: 'Structure decision note with the demand profile behind it.',
      pitfall: 'Fixed-pricing a scope the business cannot define yet, which buys a quiet year and then a stream of variations.' },
    { title: 'Write the exclusions as carefully as the inclusions', role: 'Budget Holder',
      desc: 'State what the price does not cover, in the same detail as what it does. Under a fixed structure the exclusions are the claim register, and a supplier who can show the work was never priced will win the argument later with the benefit of a signed document that says nothing.',
      control: 'Every fixed-price agreement carries an explicit exclusion list agreed by the requester.',
      record: 'Exclusion schedule attached to the pricing basis.',
      pitfall: 'Leaving exclusions to be inferred from the specification, which is how a variation claim becomes a reasonable expectation.' },
    { title: 'Build the index with a worked example in both directions', role: 'Finance',
      desc: 'Define the series and its publisher, the components and weights, the lag, the effective date and the collar, then compute the adjustment under a rise and under a fall in the underlying. If the clause cannot show a decrease, it is not an index and should not be signed as one.',
      control: 'No index is accepted without a two-direction worked example and a stated maximum exposure.',
      record: 'Index schedule with the worked example retained as a contract annex.',
      pitfall: 'Accepting a series chosen by the counterparty because it is "the industry standard", without checking what it has actually done over the last five years.' },
    { title: 'Set the contract calendar from the notice period backwards', role: 'Category Manager',
      desc: 'Read the expiry, notice and extension provisions and derive the decision date by working back from notice, then add the time the market check and any re-tender need. Diarise the decision date with an owner, not the expiry date, because expiry is the point at which the choice has already been made for you.',
      control: 'Every agreement has a decision date earlier than its notice date, with an alert and a named owner.',
      record: 'Calendar entry for decision, notice and expiry with owners.',
      pitfall: 'Diarising only the expiry, which produces a decision taken in a panic and communicated as a recommendation.' },
    { title: 'Run the market check before the renewal conversation', role: 'Category Manager',
      desc: 'Test current pricing and alternatives quietly and early, using the performance record as the starting point. The check is what turns a renewal from an administrative act into a decision, and it is worth doing even where the intention is to stay, because it tells you what the terms are worth.',
      control: 'No renewal or extension is recommended without a documented check and a performance comparison.',
      record: 'Renewal decision pack: performance against obligations, market check, options and recommendation.',
      pitfall: 'Starting the check after telling the supplier you are renewing, which converts a negotiation into a notification.' },
    { title: 'Choose the route and record the reason', role: 'Budget Holder',
      desc: 'Select renew, re-negotiate or re-tender, and write why. Where the answer is renewal, state what the market check showed and what would have made re-tendering the better choice, so the decision can be tested later rather than being defended from memory.',
      control: 'Renewal by default is not a route; the pack must show the comparison that justified it.',
      record: 'Signed route decision with the comparison and the approval date.',
      pitfall: 'Exercising an extension option as paperwork, which is a price decision taken by whoever sent the letter.' },
    { title: 'Manage expiry and transition as one action', role: 'Contract Manager',
      desc: 'Where the route is change, plan the transition before the old terms end: exit assistance, data return, knowledge handover, the outgoing supplier\'s incentives during the last period, and the date the new route becomes usable. Where no decision was taken at all, escalate the lapse and report the continuing spend against it.',
      control: 'No agreement reaches expiry without either a signed replacement or an escalated lapse with the spend named.',
      record: 'Transition plan with dates, owners and the acceptance test for cutover.',
      pitfall: 'Assuming the exit clause will be exercised politely, when the counterparty\'s leverage is highest in exactly the period when you need them most.' }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A maintenance service has highly variable call volumes and an unclear scope. The category has always been fixed-priced annually.',
      q: 'What is the best structure?',
      options: [
        { text: 'Keep fixed price: it is simple, budgetable and the market expects it.', isCorrect: false, rationale: 'Simplicity for the buyer is not the same as value. On an unclear scope, fixed price buys a claim register: the supplier either restricts what they will do or argues every unusual call as outside scope.' },
        { text: 'Price a defined base service at fixed, and put variable call-out work on a rate card with a stated acceptance test.', isCorrect: true, rationale: 'Correct. Split the risk where it belongs: predictable work priced as a package, unpredictable work priced per unit at agreed rates. This is what makes both the cost and the scope visible.' },
        { text: 'Move to cost-plus so nothing is ever disputed.', isCorrect: false, rationale: 'This removes disputes by removing your protection: cost risk moves to you and the only control left is audit rights, which are worthless if nobody exercises them.' },
        { text: 'Time and materials with no cap, since volumes are unpredictable anyway.', isCorrect: false, rationale: 'Unpredictable volume is a reason to price units carefully, not a reason to abandon measurement. Uncapped T&M pays for slow work and rewards it.' }
      ],
      principle: 'Match the structure to the part of the demand you can actually predict, and price the rest by unit with an agreed test of completion.'
    },
    {
      type: 'scenario',
      context: 'A proposed clause: "Prices shall be adjusted annually in line with the published producer price index for the sector."',
      q: 'What must be added before this can be signed?',
      options: [
        { text: 'Nothing; a published index is objective by definition.', isCorrect: false, rationale: 'The series is objective; the choice of series, weighting, timing and bounds are not. Four commercial decisions are hidden inside one sentence that nobody has valued.' },
        { text: 'The named series and publisher, the weights, the lag and effective date, a collar, and a worked example showing a fall as well as a rise.', isCorrect: true, rationale: 'Correct. Each of those is a decision with money attached, and a clause without them is an open instruction to someone else - usually the counterparty, who will produce the version that suits them.' },
        { text: 'A cap only, since the risk is upward.', isCorrect: false, rationale: 'A cap without a lag or a defined series still lets the adjustment be calculated on the supplier\'s timing and their chosen index, and it says nothing about what happens when the underlying falls.' },
        { text: 'A right to object to any adjustment.', isCorrect: false, rationale: 'Objection rights without a defined mechanism produce arguments rather than outcomes, and they arrive after the invoice has already changed.' }
      ],
      principle: 'An index clause is four commercial decisions in disguise: series, weights, timing and bounds. Value them before signature, in both directions.'
    },
    {
      type: 'scenario',
      context: 'A contract expires in four months and carries a three-month notice requirement to trigger re-tendering. Performance has been good.',
      q: 'What is the correct action now?',
      options: [
        { text: 'Renew, since good performance justifies it.', isCorrect: false, rationale: 'Performance is one input and it is not a price. With the notice window already passed, "renew" is no longer a decision made on evidence - it is the default that the calendar chose for you.' },
        { text: 'Renew on reviewed terms if you must, and fix the calendar so the decision date precedes the notice date; record the constraint honestly in the pack.', isCorrect: true, rationale: 'Correct. The commercial room left is limited, but the finding is the process failure: the decision date was never diarised ahead of notice. Renewing while naming that gap, and pricing it with a market check anyway, is better than either pretending the choice was free or lurching into a tender nobody has time for.' },
        { text: 'Let it lapse and keep buying on the old terms.', isCorrect: false, rationale: 'This is the worst of the options: the terms, service levels and exit rights end while the spend continues, and no report shows anything happened.' },
        { text: 'Serve notice anyway to preserve the position.', isCorrect: false, rationale: 'Serving notice out of time is usually invalid and costs the relationship. The leverage was available before the window closed, which is the point of the calendar.' }
      ],
      calcWork: 'Expiry in four months minus three months notice means the decision had to be taken at month seven of a twelve-month cycle. The commercial options available are now set by that missed date, not by performance.',
      principle: 'Renewal leverage is a calendar problem. Work back from notice, and diarise the decision date rather than the expiry.'
    },
    {
      type: 'scenario',
      context: 'Two suppliers offer the same specification: A at fixed price for three years; B at cost-plus with audit rights and a margin cap, ten percent cheaper on the modelled base.',
      q: 'What decides between them?',
      options: [
        { text: 'B, because the modelled base is cheaper.', isCorrect: false, rationale: 'The base is the part both structures handle. The difference is who carries cost movement and what you can see, and cost-plus is only cheaper if the audit rights are actually exercised by someone with time to do it.' },
        { text: 'Which risk you want to hold and whether you will really use the audit right - cost-plus is only cheaper if visibility is enforced.', isCorrect: true, rationale: 'Correct. Cost-plus transfers cost risk to you and pays in openness; that openness has an operating cost in audit hours. If nobody will read the books, the ten percent is a projection rather than a price.' },
        { text: 'A, because fixed price is always lower risk.', isCorrect: false, rationale: 'Fixed price is lower risk on cost movement and higher risk on cooperation and claims where scope is unstable. "Always" is the wrong word for a risk allocation.' },
        { text: 'Whichever supplier has the better performance history.', isCorrect: false, rationale: 'Relevant to selection, and it does not answer the structure question, which is about what you will be able to see and control over three years.' }
      ],
      principle: 'A structure is a risk allocation with an operating cost. Choose the one you can actually administer.'
    },
    {
      type: 'scenario',
      context: 'A contract expired nine months ago. Invoices still arrive and are paid against the old reference.',
      q: 'What is the finding?',
      options: [
        { text: 'A records issue, since the invoice cites a lapsed agreement.', isCorrect: false, rationale: 'The invoice citing an expired contract is the symptom. Treating it as a records problem accepts a spend line with no terms, no service level, no audit right and no exit.' },
        { text: 'A control failure: spend continued after the terms ended, with no decision taken and no owner for the gap.', isCorrect: true, rationale: 'Correct. Contracts do not end spend; they end protection. The finding is that nobody had the expiry date, nobody had to decide, and the payment run could not tell the difference.' },
        { text: 'Re-tender immediately to close the gap.', isCorrect: false, rationale: 'Probably the right eventual answer, and it is not the finding. Acting without naming the control gap means the next agreement lapses the same way.' },
        { text: 'Ask Finance to stop paying until a new contract exists.', isCorrect: false, rationale: 'This stops the service rather than fixing the governance, and it will be overridden within a week by the business that needs the work.' }
      ],
      principle: 'Lapse does not stop spend, it stops control. Report continuing transactions against an expired agreement as a control failure, not a filing error.'
    }
  ],

  relSop: 'sop-contract-renewal',
  rel: {
    concepts: ['contract-structure', 'framework-agreement', 'price-vs-cost', 'payment-terms', 'currency-fx', 'should-cost'],
    sops: ['sop-contract-renewal', 'sop-contract-review', 'sop-supplier-price-increase-review', 'sop-contract-change-control'],
    checklists: ['cl-contract-renewal', 'cl-contract-review', 'cl-sourcing-strategy'],
    templates: ['tpl-contract-renewal-assessment', 'tpl-contract-review-checklist', 'tpl-business-case'],
    calcs: ['calc-multi-year-contract-cost', 'calc-price-escalation', 'calc-price-increase', 'calc-compare-quotes'],
    decisions: ['renew-vs-resource', 're-source', 'accept-price-increase', 'framework-agreement'],
    kpis: ['kpi-contract-coverage', 'kpi-contract-compliance', 'kpi-supplier-concentration'],
    glossary: ['gloss-capex', 'gloss-opex', 'gloss-blanket-po', 'gloss-fx']
  },
  labMission: {
    title: 'Mission 6.3: Price an Index and Date a Renewal',
    desc: 'Use the price escalation and multi-year tools to value an index clause, then work backwards from a notice period to a decision date you can own.',
    tasks: [
      'Open the Price Escalation tool and compute the adjustment under a rise and under a fall, with and without a collar.',
      'Model the three-year cost of the two structures in your current category and compare them on risk, not only on price.',
      'Take one live contract and write its decision date from the notice period backwards, then check whether it has already passed.'
    ],
    ctaLabel: 'Open Price Escalation Tool',
    ctaHref: '#/calc/calc-price-escalation',
    secondaryLabel: 'Open Renewal Assessment',
    secondaryHref: '#/tpl/tpl-contract-renewal-assessment'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-requisition-intake',
  title: 'Requisition Intake and the Approval Matrix',
  module: 'Module 7: Operational Purchasing & Order Execution (P2P)',
  kicker: 'Function 7.3',
  tier: 'core',
  tagline: 'Designing the front of the process so the compliant route is the fast one, and the approval you get is the one that matters.',
  desc: 'The approval matrix is the most visible part of procurement policy and the least designed. This function covers how demand enters the system, what the threshold should actually control, why raising it does not reduce workload on its own, and how intake design decides whether spend arrives as a requisition or as an expense claim nobody saw.',
  duration: '18 mins',
  lifecycleStage: 'Stage 16: Approval & Delegation of Authority',
  lifecycleDesc: 'The first controlled step of order execution: where a need becomes a commitment, and where most leakage is either prevented or created.',

  what: 'An approval threshold is not a control on spend; it is a control on commitment, and the distinction decides whether the design works. A threshold set below the cost of the approval means the organisation pays more to decide than the decision is worth - which is why the number has to be built from cost-to-serve rather than from a policy template copied at some point in the previous decade. Set it by asking what an approval costs to obtain, what the exposure is if it is wrong, and how often that exposure actually materialises. Then design the tiers so the approvals that remain are the ones carrying real risk: value, yes, but also counterparty novelty, contract absence, controlled category, data or site access, and jurisdiction. A single value line invites the organisation to split requisitions to stay under it, and split-order detection is a control that has to exist deliberately rather than being hoped for. Intake design decides where demand goes. If the compliant route is slower than the workaround, the workaround wins, and the spend ends up as an expense claim, a card transaction or a direct invoice to accounts payable - invisible to the category, outside the negotiated price, and outside every control that assumes a purchase order exists. The three intake channels that actually work are a catalogue for repeatable demand, where the approval is pre-built into the price and the requisition is a click; a guided form for non-catalogue demand, which asks the four or five questions that determine routing and price; and a contract-based call-off against an agreed framework, where the commitment was approved at award and the order only checks the terms. Everything else - email, spreadsheet, verbal - is an unbuilt channel, and the volume that goes through it is a measurement of design failure rather than of user behaviour. The approver has to be the person who can say no with knowledge, which is usually the budget holder rather than a procurement reviewer who cannot see the requirement. Procurement\'s role in the chain is exception review: not every requisition, but the ones that carry the risk flags above. That is what makes the matrix short enough to be used. Finally, measure the channel rather than the compliance. Time from request to order, share of demand arriving through each channel, the value of split-order patterns detected, and the volume of expense claims over the threshold - those four tell you whether intake is working. A compliance percentage measured against requisitions raised tells you how well people follow a route nobody is checking.',
  why: [
    'A threshold below the cost of obtaining the approval destroys value on every transaction it touches, and it is the most common unexamined number in a procurement policy.',
    'Approval by value alone misses the risk that actually matters: a low-value order to a new supplier with data access is more dangerous than a high-value call-off against a negotiated framework.',
    'If the compliant route is slower than the workaround, spend leaves the process and no reporting will find it, because the transactions never entered it.',
    'Routing the whole population to a procurement reviewer converts a control into a bottleneck and makes procurement responsible for decisions it cannot inform.',
    'Channel share and cycle time are the only measures that show whether intake design is working; compliance against requisitions only measures the traffic that arrived.'
  ],
  when: [
    'When the policy is written or revised, and whenever cost-to-serve is re-measured.',
    'When a category is newly contracted and the call-off route exists but is not being used.',
    'When expense-claim or card spend in a contracted category rises, which is the signal that the route is slower than the workaround.',
    'After any threshold change, when split-order behaviour should be tested rather than assumed away.'
  ],

  raci: [
    { role: 'Requester / Budget Holder', resp: 'Raises the demand through the correct channel and owns the business decision, including the approval of their own commitment.' },
    { role: 'Procurement Operations', resp: 'Runs exception review on the risk flags, maintains catalogue and price records, and measures channel share and cycle time.' },
    { role: 'Policy Owner / Head of Procurement', resp: 'Sets the threshold from cost-to-serve and exposure, and approves changes to the matrix.' },
    { role: 'Internal Audit', resp: 'Tests split-order detection, segregation between requester and approver, and the completeness of spend reaching the process.' }
  ],
  inputs: [
    'Measured cost-to-serve per transaction, and the exposure profile of the decisions being approved.',
    'The demand population: repeat lines, one-off needs, contracted categories and the volume currently outside the process.',
    'The draft matrix: value tiers, risk flags, approver roles and the segregation rules that prevent self-approval.',
    'Channel performance data: cycle time, channel share, split-order detections and expense claims above the threshold.'
  ],
  outputs: [
    'Approval matrix with value tiers and risk-based triggers, each tier justified against cost-to-serve and stated exposure.',
    'Three working intake channels: catalogue, guided requisition and framework call-off, each with a measured cycle time.',
    'Exception review queue defined by risk flags rather than by value alone, with service levels for the reviewer.',
    'Quarterly channel report showing where demand actually enters and what is outside the process.'
  ],
  controls: [
    'Thresholds are set from a stated cost-to-serve and exposure, reviewed when either changes, and the basis is recorded.',
    'Requester and approver are separated, and self-approval is prevented in the system rather than in the policy.',
    'Split-order patterns are detected and reported, and detection results feed the threshold review.',
    'Risk flags - new counterparty, no contract, controlled category, data or site access, foreign jurisdiction - route to exception review regardless of value.'
  ],
  bestPractices: [
    'Make the compliant route the fastest route. Every second a user spends waiting is a reason to use the card, and the card leaves no record.',
    'Approve the exception, not the population. A reviewer looking at every requisition is looking at nothing with attention.',
    'Publish the cycle time per channel. The comparison is what makes people use the catalogue without being told to.',
    'Review the threshold with the finance owner rather than inside procurement, because the number is a shared decision about cost and exposure.'
  ],
  mistakes: [
    'Raising the threshold as a productivity measure without channel design, which converts managed spend into unmanaged spend faster than it saves review time.',
    'Setting the threshold from a peer organisation\'s policy, which carries their cost-to-serve and their risk appetite rather than yours.',
    'Treating expense claims as outside procurement\'s remit, which is where the fastest-growing category of unmanaged spend lives.',
    'Adding a second approval to a slow route rather than removing a step, which is the standard response and never the right one.'
  ],
  terms: [
    { term: 'Approval matrix', def: 'The defined tiers of commitment authority, by value and by risk characteristic, stating who may approve what.' },
    { term: 'Cost-to-serve', def: 'The internal cost of processing one transaction end to end, used to set thresholds that are worth obtaining.' },
    { term: 'Split order', def: 'Demand divided into several transactions to fall below an approval threshold, which detection rules exist to find.' },
    { term: 'Call-off', def: 'An order placed against a framework or blanket agreement already approved at award, requiring no fresh commercial approval.' }
  ],

  thinkingPoints: [
    {
      quote: 'The threshold went up, and the spend disappeared.',
      explanation: 'To reduce review workload, a business raised its approval limit from a low figure to a much higher one. Requisition volume through procurement fell sharply and the workload did, because the reviewers were still reading everything that arrived. Two quarters later a spend review found that transactions just below the new limit had grown disproportionately, and that a large share of category spend was now arriving through staff expense claims, where no approval, no contract price and no reporting applied.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a threshold change without channel design moves spend rather than reducing risk, and the movement is invisible in the reports that were used to justify it.',
      reflectionPrompt: 'If your requisition volume fell next quarter, would you be able to tell whether the demand went away or the route did?'
    },
    {
      quote: 'Nobody bypassed the process because they wanted to.',
      explanation: 'A hospital category had a negotiated catalogue and a requisition route averaging nine days. Clinical staff needed items the same day. Card purchases grew until they exceeded catalogue spend in the same category, and the audit finding was written as non-compliance. The actual cause was a route that could not meet the operational need, and the fix was a next-day call-off with a spend cap, not a reminder letter.',
      realWorldExample: 'Illustrative example: bypass is a measurement of design, and the fastest way to reduce it is usually to make the compliant path quicker rather than to make the wrong path harder.',
      reflectionPrompt: 'Which category currently has a compliant route slower than the need, and what does its expense line say about that?'
    }
  ],

  sopSteps: [
    { title: 'Measure cost-to-serve before touching the threshold', role: 'Procurement Operations',
      desc: 'Add up the real cost of one transaction from request to settled invoice: requisition handling, approval, order issue, receipt, matching, dispute and payment. The total is what an approval costs, and it is the only defensible basis for deciding which approvals are worth obtaining.',
      control: 'The threshold review cites a measured cost-to-serve and the exposure it is protecting against.',
      record: 'Cost-to-serve calculation with its components and the date it was measured.',
      pitfall: 'Copying a peer organisation\'s limit, which encodes their processing cost and their risk appetite rather than yours.' },
    { title: 'Tier the matrix on risk as well as value', role: 'Policy Owner / Head of Procurement',
      desc: 'Keep value bands, then add triggers that route a transaction to review regardless of size: new counterparty, no contract behind the order, controlled or regulated category, data or site access, foreign jurisdiction, and single-source justification. Value alone is a blunt instrument that lets the risky small order through and stops the safe large one.',
      control: 'Risk-flagged transactions reach exception review at any value, and the flags are enforced in the system.',
      record: 'Approval matrix showing both value tiers and risk triggers with their approvers.',
      pitfall: 'Turning every risk flag into a full approval, which rebuilds the bottleneck the tiering was meant to remove.' },
    { title: 'Enforce segregation in the tool, not the policy', role: 'Internal Audit',
      desc: 'Prevent a requester approving their own commitment, and prevent the same person raising and receipting. Configuration is the control; a paragraph in a policy is a statement of intent that a system can quietly contradict.',
      control: 'Self-approval is impossible in the configured workflow, and the test is evidenced rather than asserted.',
      record: 'Configuration evidence and an exception list where a role cannot be separated, with a compensating control.',
      pitfall: 'Small teams where roles genuinely combine, handled by an undocumented override rather than a named compensating control.' },
    { title: 'Build the three channels that actually get used', role: 'Procurement Operations',
      desc: 'Provide a catalogue where the approval is pre-built into the price, a guided requisition that asks the questions determining routing, and a call-off route against existing frameworks. Each needs a stated cycle time and a route that is faster than the alternative the user would otherwise choose.',
      control: 'Each channel has a published cycle time, and catalogue coverage is measured against actual repeat demand.',
      record: 'Channel design note with cycle times, coverage and the population each serves.',
      pitfall: 'Launching a catalogue with no consumption view, so it is judged complete while the same items keep being bought by card.' },
    { title: 'Detect and report split-order behaviour', role: 'Procurement Operations',
      desc: 'Look for repeated transactions from the same requester to the same supplier just below the threshold within a short window, report the pattern, and feed the finding back into the threshold review. Splitting is the predictable response to a limit and must be measured rather than hoped away.',
      control: 'Detection runs on a stated cadence and results are reported to the policy owner, not held in the tool.',
      record: 'Split-order report with volumes, values and the action taken.',
      pitfall: 'Treating detection as a disciplinary matter, which teaches people to split less obviously rather than to stop needing the approval.' },
    { title: 'Review the exceptions, with a service level', role: 'Procurement Operations',
      desc: 'Define what exception review means: what the reviewer checks, how long they have, and what happens when they do not respond. A queue with no service level becomes either a bottleneck or a rubber stamp, and both outcomes destroy the control the queue was created to provide.',
      control: 'Exception review has a stated turnaround and an escalation path when it is not met.',
      record: 'Exception queue with ageing, outcomes and the escalation log.',
      pitfall: 'Letting review latency become the reason users avoid the route, which converts the control into a leakage generator.' },
    { title: 'Report where demand actually enters', role: 'Policy Owner / Head of Procurement',
      desc: 'Publish channel share and cycle time quarterly: requisition, catalogue, call-off, expense claim, card and direct invoice. Compare against contracted categories so the gap between what is sourced and what is bought is visible, and treat the out-of-process share as the primary measure of intake health.',
      control: 'Out-of-process spend in contracted categories is reported and owned, not estimated annually.',
      record: 'Quarterly channel report with the trend and the actions agreed by category.',
      pitfall: 'Reporting compliance as a percentage of requisitions raised, which measures only the demand that already behaved.' }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'Cost-to-serve is USD 165 per order. The current approval threshold is USD 500, and 38 percent of orders fall between those two figures.',
      q: 'What is the correct reading?',
      options: [
        { text: 'Raise the threshold to USD 1,000 to cut workload.', isCorrect: false, rationale: 'Directionally right and analytically incomplete. Without channel design, raising the limit moves demand into other routes rather than removing it, and the 38 percent band is exactly where split-order behaviour appears.' },
        { text: 'The approval on those orders costs a third of their value, so the band should be converted to catalogue or call-off demand rather than simply approved faster.', isCorrect: true, rationale: 'Correct. The finding is not that approval is slow but that the demand is repeatable and should not be re-decided each time. Moving it to a pre-approved channel removes both the cost and the decision; raising the limit alone removes the control and keeps the cost.' },
        { text: 'Keep the threshold: 38 percent of orders need scrutiny.', isCorrect: false, rationale: 'That is an assertion about risk rather than a measurement of it. If the band is small repeat purchases against contracted prices, the scrutiny is theatre and someone is paying for it.' },
        { text: 'Delegate the band to finance for batch approval.', isCorrect: false, rationale: 'This moves the approver without removing the transaction. The cost-to-serve is in the order count, and only fewer orders fix that.' }
      ],
      calcWork: 'USD 165 against a USD 500 order is 33 percent of transaction value spent deciding it. Across the 38 percent band the internal cost is the dominant component of the total.',
      principle: 'When the approval costs a third of the order, the answer is a channel that removes the order, not a faster approval of it.'
    },
    {
      type: 'scenario',
      context: 'After the threshold was doubled, requisition volume fell 22 percent and procurement cycle time improved. Nothing else was changed.',
      q: 'What should be measured next?',
      options: [
        { text: 'Nothing: both indicators moved the right way.', isCorrect: false, rationale: 'Both indicators are inside the process. A threshold change moves demand between routes, and the reports that improved are the ones that only see what stayed.' },
        { text: 'Channel share outside the process: expense claims, card spend and direct invoices in the categories affected, plus split-order patterns just below the new limit.', isCorrect: true, rationale: 'Correct. These are the only measures that can distinguish demand that genuinely went away from demand that stopped being visible, and the second is the common answer.' },
        { text: 'Supplier satisfaction with the new process.', isCorrect: false, rationale: 'Worth knowing and unrelated to the risk created here, which is spend leaving the controlled route.' },
        { text: 'The number of approvals per requisition.', isCorrect: false, rationale: 'A useful efficiency measure, and it will look good. It says nothing about whether the organisation still knows what it is buying.' }
      ],
      principle: 'A threshold change shows up in the reports that only count transactions inside the process, which is exactly why out-of-process share must be measured alongside it.'
    },
    {
      type: 'scenario',
      context: 'A USD 200 requisition for a new software tool with staff data reaches no reviewer: it is below the value threshold.',
      q: 'What does the matrix need?',
      options: [
        { text: 'A lower value threshold.', isCorrect: false, rationale: 'This would sweep millions of routine transactions into review to catch a handful of risky ones, and the review capacity needed to do it honestly does not exist.' },
        { text: 'A risk trigger: controlled category, data access or new counterparty routes to review at any value.', isCorrect: true, rationale: 'Correct. The exposure here is not the amount, it is the licence terms, the data route and the security position. Value-based tiers alone cannot see that, and risk flags are how a matrix stays short and still catches the thing that matters.' },
        { text: 'A rule that software is always approved by IT.', isCorrect: false, rationale: 'Right instinct, wrong scope. It fixes one category and leaves the same structural gap for every other low-value high-risk purchase.' },
        { text: 'An annual post-hoc review of all sub-threshold purchases.', isCorrect: false, rationale: 'Detection after commitment, with no lever left. Useful as assurance, useless as control.' }
      ],
      principle: 'Risk, not value, decides what needs a human. A matrix that only reads the amount will miss the small order that matters.'
    },
    {
      type: 'scenario',
      context: 'Procurement reviews every requisition above USD 5,000. Average review time is four days, and the queue is three weeks deep.',
      q: 'What is the correct fix?',
      options: [
        { text: 'Hire more reviewers.', isCorrect: false, rationale: 'It may relieve the queue and it institutionalises a control that reviews everything with attention to nothing. The population is the problem, not the capacity.' },
        { text: 'Define exception review: contract-backed and catalogue demand is released automatically, and only risk-flagged items reach a reviewer, with a stated turnaround.', isCorrect: true, rationale: 'Correct. A commitment already approved at award and priced on the catalogue carries no new commercial decision. Reviewing it again is not control, it is delay, and delay is what pushes demand to the card.' },
        { text: 'Raise the threshold so fewer items reach review.', isCorrect: false, rationale: 'This reduces workload and increases the population of unreviewed risky items, because the flag is value. It treats the symptom and worsens the cause.' },
        { text: 'Ask requesters to submit better documentation to speed reviews.', isCorrect: false, rationale: 'Transferring the work to the requester adds time to the compliant route, which is the exact opposite of what a queue that deep is telling you.' }
      ],
      principle: 'A three-week review queue is a design finding. Approve the exception, and let the pre-approved route be fast.'
    },
    {
      type: 'scenario',
      context: 'Expense claims above USD 150 in a category with a negotiated contract have doubled in two years.',
      q: 'What does that indicate?',
      options: [
        { text: 'A compliance problem requiring a reminder to staff and tighter expense policy.', isCorrect: false, rationale: 'Reminders have not worked on this pattern anywhere. If the compliant route is slower or harder than the card, the card wins, and the finding is about the route.' },
        { text: 'The contracted category has no usable ordering channel, so demand is expressing itself where nobody looks - and the reported saving for that category is overstated.', isCorrect: true, rationale: 'Correct. Rising out-of-process spend in a sourced category measures the gap between what was negotiated and what is available. It also means the saving claim is calculated on volume that is not being bought at the agreed price.' },
        { text: 'The expense threshold should be raised to reduce claims.', isCorrect: false, rationale: 'This removes the visibility rather than the behaviour, and it makes the leakage larger and quieter.' },
        { text: 'Finance should reject claims in contracted categories.', isCorrect: false, rationale: 'Rejection without a working alternative creates an operational argument, an exception route and eventually a policy waiver. Build the channel first.' }
      ],
      principle: 'Expense claims in a contracted category are a measurement of intake design, not of staff behaviour.'
    }
  ],

  relSop: 'sop-procurement-intake',
  rel: {
    concepts: ['delegation-of-authority', 'segregation-of-duties', 'demand-management', 'specification', 'procurement-value', 'cost-avoidance'],
    sops: ['sop-procurement-intake', 'sop-procurement-lifecycle', 'sop-emergency-procurement'],
    checklists: ['cl-procurement-intake', 'cl-requirement-definition', 'cl-exception-approval'],
    templates: ['tpl-exception-request', 'tpl-business-case', 'tpl-supplier-onboarding'],
    calcs: ['calc-po-value-check', 'calc-kpi-calculator', 'calc-moq'],
    decisions: ['approve-exception', 'sourcing-method', 'framework-agreement'],
    kpis: ['kpi-maverick-spend', 'kpi-cycle-time', 'kpi-contract-coverage'],
    glossary: ['gloss-doa', 'gloss-blanket-po', 'gloss-maverick-spend', 'gloss-cost-to-serve']
  },
  labMission: {
    title: 'Mission 7.3: Test Your Own Threshold',
    desc: 'Use the PO Value Check and the KPI calculator to see what your approval tiers actually cost, and which risks they cannot see at all.',
    tasks: [
      'Work out your cost-to-serve and compare it with the value of the transactions your lowest approval tier reviews.',
      'List three risk characteristics that should trigger review at any value, and check whether your current matrix sees them.',
      'Find one contracted category where demand is arriving outside the process, and name the reason the compliant route is losing.'
    ],
    ctaLabel: 'Open Approvals Workbench',
    ctaHref: '#/approvals',
    secondaryLabel: 'Open PO Value Check',
    secondaryHref: '#/calc/calc-po-value-check'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-corrective-action',
  title: 'Corrective Action and the Business Review That Changes Behaviour',
  module: 'Module 8: Supplier Management & Value Realization',
  kicker: 'Function 8.3',
  tier: 'practitioner',
  tagline: 'Turning a scorecard miss into a closed root cause, and a review meeting into something the supplier acts on.',
  desc: 'Most supplier reviews report performance; few change it. This function covers the corrective-action discipline that turns a missed measure into a closed cause, how to run a business review that produces commitments rather than minutes, and the point at which improvement stops being the right response and re-sourcing becomes the honest one.',
  duration: '21 mins',
  lifecycleStage: 'Stage 19: Supplier Performance & SRM',
  lifecycleDesc: 'Runs continuously through the performance stage and decides the renewal: the mechanism that separates a supplier who is improving from a supplier who is reporting.',

  what: 'A scorecard is a measurement, and measurement changes nothing on its own. The unit of improvement is the corrective action, and a well-formed one has five parts: the observed failure with its data, the impact in the business\'s currency rather than in percentage points, the root cause rather than the symptom, the action with an owner and a date, and the verification that proves the cause was addressed rather than the metric re-measured. The distinction between cause and symptom is where most of the work is. A late-delivery problem whose stated cause is "supplier capacity constraints" has not been diagnosed; the diagnosis is a scheduling practice, a yield assumption, a single machine, a subcontracted step nobody qualified, or a demand signal the supplier receives too late to act on. Five-why discipline is unglamorous and is the difference between a supplier who fixes one incident and one who stops producing them. Verification is the second half and the half usually omitted: an action closed because the next month\'s number looked better is not verified, it is hoped. Verification means either a changed process the buyer has seen, or a defect rate measured over a period long enough to include the conditions that caused the original failure - and a seasonal line needs a seasonal observation window. The business review is where this either works or becomes theatre. The difference is agenda ownership and the presence of a decision. A review that walks the scorecard top to bottom, in the supplier\'s slide format, is a report. A review that opens with the two or three issues where the gap between promise and delivery is widest, brings data both sides accept, and ends with named commitments and dates, is a governance event. Two practical rules: bring your own numbers rather than asking the supplier to explain theirs, and never let a review end without an action that has an owner outside the supplier\'s organisation as well as inside it. Escalation needs a defined ladder, because otherwise it happens emotionally: a written notice with a cure period, a performance improvement plan with milestones and a commercial consequence attached, a reduction in scope or a second source introduced, and finally termination under the clause. The point of writing the ladder down is that a supplier who knows it exists can see the cost of the next quarter, and the buyer who knows it can stop reviewing a failing relationship politely for two years. And the honest limit of corrective action: improvement programs fail when the supplier\'s constraint is structural, when the relationship matters more to the buyer than to the supplier, or when the measures are not the ones the supplier is actually managed on internally. Recognising that at review three rather than review fourteen is a procurement judgement, and re-sourcing is a legitimate outcome of performance management rather than its failure.',
  why: [
    'Reporting a miss without a cause produces a repeat. The organisation learns to measure and the supplier learns to explain.',
    'Verification over a window that excludes the original conditions is not evidence, and it is the most common way an action gets closed while the problem remains.',
    'A review without a decision costs management time on both sides and teaches the supplier that the measures are advisory.',
    'A written escalation ladder is what converts a series of uncomfortable conversations into a predictable process, and predictability is what makes the middle rung work.',
    'Knowing when improvement is the wrong response protects the business from a relationship that is being managed politely past its useful life.'
  ],
  when: [
    'When a measured obligation is missed twice, or once with material impact - not when the scorecard turns amber.',
    'At every business review, on the two or three widest gaps rather than across the whole measure set.',
    'When a corrective action\'s verification window has closed, which is the step most often skipped.',
    'When the escalation ladder reaches its last rung, or when the diagnosis shows a structural constraint that no action can fix.'
  ],

  raci: [
    { role: 'Supplier Relationship Owner', resp: 'Opens the corrective action, tests the root cause, owns verification and runs the review.' },
    { role: 'Category Manager', resp: 'Decides the escalation rung, holds the second-source option and owns the re-source recommendation.' },
    { role: 'Business Owner / Quality Function', resp: 'Provides the impact evidence, contributes to the cause analysis and accepts or rejects the verification result.' },
    { role: 'Supplier Account Manager', resp: 'Owns delivery of the action inside their organisation and provides the process evidence, not only the metric.' }
  ],
  inputs: [
    'The obligation register and scorecard data for the period, with the definitions both sides agreed.',
    'Impact evidence from the business: what the miss cost, in the currency the business uses.',
    'The supplier\'s cause analysis and the process evidence behind the proposed action.',
    'The escalation ladder with its cure periods, commercial consequences and decision owners.'
  ],
  outputs: [
    'Corrective action records: failure, impact, root cause, action, owner, date, verification method and window.',
    'Review pack with the widest gaps, agreed data and named commitments with dates.',
    'Escalation notices where the ladder is invoked, and the response received.',
    'A performance history that supports the renewal decision, or a re-source recommendation with evidence attached.'
  ],
  controls: [
    'An action cannot be closed without verification evidence covering a window that includes the original failure conditions.',
    'Two misses of the same measure, or one with material impact, automatically open a corrective action rather than a discussion.',
    'Every business review ends with commitments, owners and dates recorded against the obligation register.',
    'The escalation ladder is defined in the contract or the governance framework, and each rung is invoked by a named decision rather than by frustration.'
  ],
  bestPractices: [
    'Ask for the process change, not the next month\'s number. A metric that improves without a changed process will revert.',
    'Bring your own data to the review. A supplier explaining your figures is a supplier setting the agenda.',
    'Put a commercial consequence on the improvement plan. A plan with no cost attached to missing it is a statement of intent.',
    'Close the loop into the next sourcing event: a supplier\'s corrective-action history is qualification evidence, and it should be used as such.'
  ],
  mistakes: [
    'Accepting "root cause: capacity" or "root cause: human error" as a diagnosis, which is a description of the symptom in different words.',
    'Running reviews on the supplier\'s slide template, which imports their priorities into your governance event.',
    'Escalating emotionally rather than by ladder, which makes the second source look like punishment instead of a decision.',
    'Continuing the improvement programme past the point where the constraint is known to be structural, because ending it requires an admission.'
  ],
  terms: [
    { term: 'Corrective action', def: 'A structured response to a measured failure: cause identified, action taken, and performance verified over a period that tests the cause.' },
    { term: 'Root cause', def: 'The condition whose removal stops the failure recurring, as distinct from the immediate circumstance that exposed it.' },
    { term: 'Performance improvement plan', def: 'A formal, time-boxed improvement programme with milestones, evidence requirements and a stated commercial consequence for missing them.' },
    { term: 'Cure period', def: 'The contractual window in which a supplier may remedy a failure before a further remedy becomes available.' }
  ],

  thinkingPoints: [
    {
      quote: 'The number came back within a month, and the problem came back with it.',
      explanation: 'A logistics provider missed on-time delivery for three weeks. A corrective action was opened, the supplier added a dispatch shift for a month, the metric recovered, and the action was closed. Six months later the same failure repeated, and the cause was the same: an order file delivered to the supplier too late in the day to be picked that evening. Nobody had asked why the file arrived at 4pm, which was a buyer-side process, not a supplier failure.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a metric restored by effort rather than by change will revert, and the most durable causes are frequently on the buyer side of the interface.',
      reflectionPrompt: 'Which closed corrective actions in your last year were verified by a number rather than by a changed process?'
    },
    {
      quote: 'The review changed when we stopped asking them to explain our data.',
      explanation: 'A managed-service review had become a monthly reading of the supplier\'s report, with both sides arguing about definitions. The buyer rebuilt the pack from its own ticketing and receipt data, brought three gaps rather than twenty measures, and ended each meeting with two commitments and a named owner on each side. Misses began arriving in the meeting rather than in the invoice three weeks later.',
      realWorldExample: 'Illustrative example: governance improves when the buyer owns the measurement and the agenda holds only what can be decided in the room.',
      reflectionPrompt: 'Does your supplier review start from your data or theirs, and what would change if that flipped?'
    }
  ],

  sopSteps: [
    { title: 'Open the action from the obligation, not the mood', role: 'Supplier Relationship Owner',
      desc: 'Trigger a corrective action from a defined rule: a second miss on the same measure, or one miss with material impact. Writing the trigger down is what stops escalation depending on which relationship owner is having a bad month, and it makes the process predictable enough for the supplier to plan against.',
      control: 'Triggers are stated in the governance framework and applied automatically rather than raised at discretion.',
      record: 'Corrective action opened with the measure, the data and the impact stated in business terms.',
      pitfall: 'Opening an action for every amber flag, which produces a queue nobody verifies and teaches the supplier that the notices are noise.' },
    { title: 'Require a cause, not an explanation', role: 'Supplier Relationship Owner',
      desc: 'Test the stated cause against the evidence: would removing it stop the failure recurring on its own? Where the answer is no, keep asking - of the supplier and of your own interface with them. Late files, unclear acceptance criteria, unstable forecasts and buyer-side approvals are common causes that arrive dressed as supplier failures.',
      control: 'No action proceeds to a plan until the cause survives the question "and what caused that".',
      record: 'Cause analysis with the buyer-side factors considered and either included or excluded with reasons.',
      pitfall: 'Accepting "human error" as a cause, which is a description of how the failure surfaced rather than of why it was possible.' },
    { title: 'Agree the action, the owner and the evidence required', role: 'Supplier Account Manager',
      desc: 'Specify what will change, who inside the supplier\'s organisation owns it, by when, and what artefact will prove the change happened - a revised work instruction, a system configuration, a training record, a changed schedule. The evidence requirement is agreed at the start, because asking for it afterwards invites a reconstruction.',
      control: 'Every action names a process change, not a commitment to try harder, and the evidence type is fixed in advance.',
      record: 'Action plan with owner, date, evidence definition and the verification window.',
      pitfall: 'Agreeing a target rather than a change, which converts the corrective action into a performance conversation with extra paperwork.' },
    { title: 'Verify over a window that includes the original conditions', role: 'Business Owner / Quality Function',
      desc: 'Do not close on the next month\'s number. Test the metric across a period long enough to contain the conditions that caused the failure - month-end, seasonal peaks, a shift change, a new joiner cohort - and confirm the process artefact is in place and being used.',
      control: 'Closure requires both the artefact and the measured behaviour across the agreed window.',
      record: 'Verification note with the window covered, the data and the decision.',
      pitfall: 'Closing after one clean period on a line that failed at peak, which guarantees the recurrence and costs the credibility of the process.' },
    { title: 'Run the review on the widest gaps, with your own data', role: 'Supplier Relationship Owner',
      desc: 'Build the pack from data the buyer controls, open with the two or three issues where promise and delivery diverge most, and end with named commitments and dates. Leave the full scorecard as an annex; a review that reads twenty measures out loud produces agreement about definitions and nothing else.',
      control: 'Each review records commitments with owners on both sides, and the previous commitments are the first agenda item.',
      record: 'Review minutes with commitments, owners, dates and the status of the last meeting\'s actions.',
      pitfall: 'Letting the supplier present their own report and defend it, which hands over the agenda and turns governance into a debate about measurement.' },
    { title: 'Invoke the escalation ladder by rule', role: 'Category Manager',
      desc: 'Where the action is not delivered or the failure recurs, move one rung: written notice with the cure period, then a performance improvement plan with milestones and a commercial consequence, then scope reduction or a second source introduced, then termination under the clause. Each rung is a decision taken by a named owner, not an expression of dissatisfaction.',
      control: 'Rung changes are recorded with the reason, the decision owner and the date, and the supplier is told the ladder explicitly.',
      record: 'Escalation log with notices served, responses received and the cure period applied.',
      pitfall: 'Skipping a rung because the relationship is uncomfortable, which removes the warning that made the middle rungs effective.' },
    { title: 'Decide whether improvement is still the right answer', role: 'Category Manager',
      desc: 'Test the structural questions at each cycle: does the supplier have the capability at all, is this business material enough to them to act, are your measures the ones they are managed on internally, and is the price still defensible against the current market? Where the answers are no, recommend re-sourcing rather than another plan.',
      control: 'A third failed cycle on the same cause triggers a documented re-source assessment rather than a fourth plan.',
      record: 'Re-source recommendation with the performance history, the structural findings and the market check.',
      pitfall: 'Managing a failing relationship politely for years because ending it means admitting the earlier decision to keep it.' }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A supplier missed on-time delivery twice. Their corrective action reads: "Additional shift added for four weeks to restore performance." The next month is on time.',
      q: 'What should happen?',
      options: [
        { text: 'Close the action: the measure recovered.', isCorrect: false, rationale: 'This is the failure mode in its purest form. A resource added for a month restores the number and changes nothing about the process that produced the miss, so the cost of the fix disappears and the cause remains.' },
        { text: 'Do not close: ask what changed in the process, and set a verification window that includes the conditions under which it failed.', isCorrect: true, rationale: 'Correct. Effort is not a corrective action. The test is whether the mechanism that allowed the failure has been altered, and whether performance holds across the peak or handover that originally broke it.' },
        { text: 'Escalate to a performance improvement plan immediately.', isCorrect: false, rationale: 'Possibly justified, but it is not the finding. The gap is the diagnosis, and escalating without testing the cause produces a plan built on the same misunderstanding.' },
        { text: 'Accept the recovery and re-test in six months.', isCorrect: false, rationale: 'Six months of unverified performance is the same as no verification, and the recurrence usually arrives sooner than that.' }
      ],
      principle: 'A metric restored by effort will revert when the effort stops. Verify the process change, over the conditions that caused the failure.'
    },
    {
      type: 'scenario',
      context: 'Root-cause analysis on a late-delivery failure finds the buyer sends its consolidated order file at 4pm, and the supplier cannot pick the same day.',
      q: 'What is the correct action?',
      options: [
        { text: 'Require the supplier to extend their shift to accommodate the file time.', isCorrect: false, rationale: 'This prices your process failure into their rate and leaves the cause untouched. It also guarantees a claim the next time the file is later.' },
        { text: 'Fix the buyer-side process, and renegotiate the delivery window against the corrected signal.', isCorrect: true, rationale: 'Correct. A large share of supplier performance failures have a buyer-side cause, and the honest corrective action is on your own interface. Fixing it also changes the negotiation: you are now asking for performance against a workable input rather than for forgiveness of an impossible one.' },
        { text: 'Record the finding and continue, since the supplier agreed the target.', isCorrect: false, rationale: 'Agreeing to a target they cannot meet is not a plan. The scorecard will keep missing and the review will keep failing, and the supplier\'s credibility will absorb the cost of your process.' },
        { text: 'Move the category to a supplier who can work a later cut-off.', isCorrect: false, rationale: 'A market solution to an internal problem, and it will be repeated by the next supplier on the same file time.' }
      ],
      principle: 'Before you demand a corrective action, check which side of the interface created the condition. Some supplier failures are buyer processes wearing a costume.'
    },
    {
      type: 'scenario',
      context: 'A strategic supplier has failed the same measure three times in twelve months. Each time a plan was agreed and the relationship was described as important.',
      q: 'What is the most useful question?',
      options: [
        { text: 'How can we make the next plan more robust?', isCorrect: false, rationale: 'This is the fourth-plan reflex. Three failures of the same cause is evidence about the supplier\'s capability or priorities, not about the quality of your planning template.' },
        { text: 'Is this business material enough to them to be acted on, and is the constraint structural?', isCorrect: true, rationale: 'Correct. Improvement requires both capability and motivation. Where the buyer is not significant enough for the supplier to move resources for, a fourth plan is a wish, and the honest options are a second source, a different scope, or an exit.' },
        { text: 'Should the relationship owner be changed?', isCorrect: false, rationale: 'Sometimes useful, and it is not the finding here. Three identical failures with identical agreed plans point at the supplier\'s constraint rather than at the buyer\'s energy.' },
        { text: 'Can the measure be relaxed to reflect actual impact?', isCorrect: false, rationale: 'Possibly the right answer if the measure is wrong - and that is worth testing. But relaxing a measure to match a repeated failure is how governance quietly stops existing.' }
      ],
      principle: 'Three failures of the same cause is a diagnosis, not a request for a better plan. Test capability and materiality before trying again.'
    },
    {
      type: 'scenario',
      context: 'Monthly business reviews run through a twenty-measure scorecard supplied by the vendor. Meetings last ninety minutes and rarely end with actions.',
      q: 'What is the highest-value change?',
      options: [
        { text: 'Shorten the meeting to forty-five minutes.', isCorrect: false, rationale: 'This treats the symptom and reduces the only governance contact you have. A short meeting with no decisions is a faster way to have no decisions.' },
        { text: 'Rebuild the pack from buyer-controlled data and take the three widest gaps into the room, with the previous commitments reviewed first.', isCorrect: true, rationale: 'Correct. Governance improves when the buyer owns the measurement and the agenda holds only what can be decided. Twenty measures read aloud produces a debate about definitions; three gaps produce commitments.' },
        { text: 'Ask the supplier to explain the measures they are missing.', isCorrect: false, rationale: 'That is the current meeting. Inviting the supplier to interpret your data is how the counterparty ends up setting the agenda.' },
        { text: 'Move to quarterly reviews so each one carries more weight.', isCorrect: false, rationale: 'Longer intervals make an action-less review worse, not better. Frequency is not the defect.' }
      ],
      principle: 'A review is a decision event. If nothing is decided, the problem is the agenda and the data ownership, not the duration.'
    },
    {
      type: 'scenario',
      context: 'You are defining the escalation ladder for a critical managed service.',
      q: 'Which element makes the middle rungs actually work?',
      options: [
        { text: 'Making the first rung severe enough that it is never needed.', isCorrect: false, rationale: 'A first rung that ends the relationship is a rung nobody uses, which leaves you escalating from conversation straight to termination.' },
        { text: 'Attaching a stated commercial consequence and a defined cure period to each rung, and telling the supplier the ladder in advance.', isCorrect: true, rationale: 'Correct. Predictability is what makes the middle rungs effective: the supplier can see the cost of the next quarter, and the buyer can act by rule rather than by mood. A ladder nobody has read out is a threat rather than a process.' },
        { text: 'Reserving every decision for the executive committee.', isCorrect: false, rationale: 'This slows each rung and makes escalation politically expensive, which pushes buyers to keep tolerating failure quietly instead.' },
        { text: 'Keeping the ladder informal so it can be applied with judgement.', isCorrect: false, rationale: 'Informal escalation happens late, unevenly and emotionally, and it is the reason most performance conversations never reach a decision.' }
      ],
      principle: 'An escalation ladder works when both sides know it, and each rung costs something specific. Informal ladders escalate feelings rather than failures.'
    }
  ],

  relSop: 'sop-supplier-performance-management',
  rel: {
    concepts: ['supplier-performance', 'supplier-development', 'supplier-relationship-management', 'service-level-agreement', 'audit-trail', 'evaluation-criteria'],
    sops: ['sop-supplier-performance-management', 'sop-supplier-evaluation', 'sop-contract-review'],
    checklists: ['cl-supplier-performance-review', 'cl-supplier-risk-review', 'cl-contract-review'],
    templates: ['tpl-supplier-scorecard', 'tpl-supplier-business-review', 'tpl-contract-performance-review'],
    calcs: ['calc-supplier-scorecard', 'calc-kpi-calculator'],
    decisions: ['re-source', 'dual-source', 'supplier-financial-risk'],
    kpis: ['kpi-otif', 'kpi-defect-rate', 'kpi-otd', 'kpi-contract-compliance'],
    glossary: ['gloss-sla', 'gloss-kpi', 'gloss-tco']
  },
  labMission: {
    title: 'Mission 8.3: Test One Closed Action',
    desc: 'Take a corrective action your organisation closed and re-run the verification test on it, then draft the escalation ladder you would want before the next miss.',
    tasks: [
      'Find one action closed on a recovered number and ask what process artefact changed. Write the answer, or write that there is none.',
      'Build the Supplier Scorecard for one relationship with three measures you control the data for.',
      'Write a four-rung escalation ladder with a cure period and a commercial consequence on each rung, and check whether your supplier has seen it.'
    ],
    ctaLabel: 'Open Supplier Scorecard Tool',
    ctaHref: '#/calc/calc-supplier-scorecard',
    secondaryLabel: 'Open Business Review Template',
    secondaryHref: '#/tpl/tpl-supplier-business-review'
  }
});
