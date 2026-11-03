/* ==========================================================
   Procure Sherpa v3.0 - Academy Module 29: Service Transition and
   Exit - Moving Work Without Losing It. Module 27 taught the
   continuity obligation and that an exit plan must exist before it
   is needed; it did not teach execution. Two lessons and four
   concepts, written to the tight Module 24 pattern because the
   deployed margin is one tranche wide. Note for the library: there
   is still no transition or exit SOP - the gap is recorded rather
   than papered over. Written with no apostrophes, since these
   strings are single quoted and the build reads them literally.
   ========================================================== */

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-service-transition-planning',
  title: 'Service Transition: What Must Be Proven Before the Old Provider Stops',
  module: 'Module 29: Service Transition and Exit - Moving Work Without Losing It',
  kicker: 'Function 29.1',
  tier: 'practitioner',
  tagline: 'A transition plan ends at go-live. The service does not end there, and neither does the risk - which is why acceptance has to be measured behaviour over a window, not a date on a project chart.',
  desc: "This function covers executing a change of provider for an in-life service: what actually moves, how to prove the receiving side can run it under live demand, the exception work that never appears in a handover pack, who decides that overlap can end, and how to run the transition so a failure is attributable rather than contested.",
  duration: '20 mins',
  lifecycleStage: 'Stage 21: Savings Realization & Value Audit',
  lifecycleDesc: 'Owned after award and before the incumbent stops, which is the least governed interval in most contracts.',

  what: "Ask what moves in a transition and the answer is usually a list of documents. The service is not made of documents. It is made of a process that is documented, an exception population that is not, a set of relationships that nobody owns, and a small number of people who know where the bodies are buried. Every transition failure I have seen described comes from one of the last three. So start with an inventory by category rather than by deliverable. Process: the standard operating procedures, the calendar of recurring work, the seasonal peaks, the reporting that someone reads. People: named roles, the rota, the certifications required, and the individuals who hold undocumented knowledge. Data and configuration: what the service reads and writes, who owns the schema, what is inside the outgoing providers systems, what has to be exported and in what format. Third parties: subcontractors, landlords, utility accounts, service desk arrangements - the contracts inside the contract. Relationships: the site managers, the local suppliers, the regulators informants who answer the phone. Then the exception catalogue, which is the highest-value artefact in the whole exercise and the one nobody asks for. Ask the outgoing provider for the recurring exceptions and you will get a clean answer, because the messy work is what they solved informally and never wrote down. Compare their list against your own incident history for the last twelve months: the gap between the two is the transition risk, and it is usually where the escalations come from. A facilities handover pack that omitted 41 site-specific workarounds cost five months of missed service levels; a handover that was accurate about the process and silent about the nine recurring exceptions was accurate about something the new team would rarely meet. The evidence standard matters more than the document list. A run-book that has been read is not a run-book that has been exercised. The test that works is bounded and uncomfortable: the incoming team runs a defined scenario, including a failure, without help, and the record shows what they needed and how long it took. Do the same at peak load, because the reconciliation exception that only appears at month end is exactly the failure that parallel running exists to catch. Which brings the overlap. Running old and new together is the only mechanism that proves capability under live demand, and it is the line item most likely to be cut, because it looks like paying twice for nothing. Price it against the alternative: a failed cutover on a critical service is a remediation programme, a reportable incident and a re-negotiation from a weak position. The eleven-week payments parallel run cost 6 percent of annual contract value and caught a month-end reconciliation failure that every documented test had passed. That is the arithmetic a project sponsor needs to see before the decision, not after. Set the overlap window, the measured criteria for ending it, and the named person who decides - because the default is to end it on the planned date rather than on the evidence. Two structural points that decide most outcomes. First, people leave. The outgoing teams knowledge holders will not necessarily stay for the transition, and a contractual duty to cooperate does not make an individual available. Identify the three or four people whose departure would break the plan, and put a named mitigation against each: retention funded in the transition budget, a documented interview before they go, or a second person shadowing them. Second, attribution. During changeover, when something goes wrong, both providers have an incentive to explain it by the other. Keep the measurement running on both sides through the overlap, agree in advance which metrics decide, and hold a joint log. The transition that cannot say what happened cannot defend its own acceptance decision, and it will be relitigated at the first serious incident. Finally, close the transition with the artefacts the next team will need: the exercised run-book, the exception catalogue with owners, the escalation map with names, the data extracts confirmed in a usable format, and the acceptance decision with its evidence. If the service is regulated, that file is also what an inspector asks for.",
  why: [
    'The service is process plus exceptions plus relationships plus a few informed people, and only the first is documented.',
    'The gap between the providers exception list and your own incident history is the transition risk.',
    'A run-book that has been read is not a run-book that has been exercised under live load.',
    'Overlap converts an unprovable capability claim into a priced, dated decision.',
    'Knowledge leaves with people, and a duty to cooperate does not secure an individual.',
    'Without agreed measurement, a changeover failure becomes a dispute about cause rather than a fix.'
  ],
  when: [
    'Between award and go-live on any replacement provider.',
    'Bringing an outsourced service back in house.',
    'Merging several contracts into one provider.',
    'When the incoming provider has never carried this volume.',
    'At the acceptance decision that ends the overlap window.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Owns the transition plan, the overlap decision and the acceptance evidence.' },
    { role: 'Service Owner', resp: 'Defines what must be proven, chairs the exercised scenarios and signs the acceptance.' },
    { role: 'Incoming Provider', resp: 'Produces the run-book, staffs the rota, and demonstrates handling of live exceptions.' },
    { role: 'Outgoing Provider', resp: 'Delivers the handover, the exception catalogue and the data extracts under the cooperation obligation.' },
    { role: 'Data or IT Owner', resp: 'Confirms the format, completeness and usability of everything exported.' }
  ],
  inputs: [
    'The contract schedule: cooperation obligations, tail terms, data and configuration rights.',
    'Twelve months of incident and escalation history for the service.',
    'The incoming providers transition methodology and staffing plan.',
    'The service baseline: volumes, peaks, cycle times, exception rates.'
  ],
  outputs: [
    'A transition inventory by category with the undocumented workarounds named and owned.',
    'An exception catalogue reconciled against the incident history, with an owner per entry.',
    'Exercised acceptance evidence: scenarios run without help, at peak load, with timings.',
    'A dated overlap decision naming the criteria met, the person who decided and what remains open.'
  ],
  controls: [
    'No go-live is approved on a document list; acceptance requires an exercised scenario including a failure.',
    'The exception catalogue is compared against the incident history and the difference is dispositioned.',
    'The overlap window ends on measured criteria signed by a named decision-maker, not on a planned date.',
    'Key-person risk is listed with a mitigation per person before the transition starts.',
    'Both providers are measured during overlap, and the joint log is the record of attribution.'
  ],
  bestPractices: [
    'Interview the person who handles the escalations, not the account manager who reports on them.',
    'Run the month-end, not only the daily case, because the exceptions that matter are periodic.',
    'Budget the overlap as a line item at approval, so it is a decision rather than an overrun.',
    'Treat a smooth transition as a signal to look harder at what has not started yet.'
  ],
  mistakes: [
    'Accepting the outgoing providers exception list without comparing it to your own incident data.',
    'Ending parallel running on schedule while the evidence says otherwise.',
    'Assuming the handover pack describes the work rather than the process.',
    'Measuring the new provider only, so a failure has two explanations and no evidence.'
  ],
  terms: [
    { term: 'Exception catalogue', def: 'The list of non-standard cases the service actually handles, with who handles them and how.' },
    { term: 'Exercised evidence', def: 'Proof of capability from the new team running a real scenario without help, rather than from a document.' },
    { term: 'Overlap window', def: 'The period where old and new run together so the new service is proven under live demand.' },
    { term: 'Attribution log', def: 'The joint record of service behaviour during changeover, so a failure can be located rather than argued.' }
  ],

  thinkingPoints: [
    {
      quote: 'Forty-one workarounds that were never written down.',
      explanation: 'A facilities transition hit its planned go-live date and the new provider inherited 41 site-specific arrangements: access codes, a local supplier the previous team dealt with directly, an exception where a broken machine was worked around rather than reported. None were in the pack, because none were in a document. Service levels were missed for five months and the recovery cost more than the tender had saved.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: the handover pack describes the process; the work is what people do when the process does not apply.',
      reflectionPrompt: 'For the last service you took over or handed back, who was interviewed - the account manager or the person who handled the escalations?',
    },
    {
      quote: 'Every documented test passed at week two.',
      explanation: 'A payments-adjacent service ran eleven weeks of parallel operation. The incoming provider met all documented acceptance criteria in the second week. In the fifth, a month-end reconciliation exception appeared that no test had modelled, and it recurred at the next month end. The overlap cost 6 percent of annual contract value; the cutover failure that was avoided would have been a reportable incident with a remediation programme behind it.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: some failures only exist at real volume and real periodicity, which is what overlap buys and what a pilot cannot show.',
      reflectionPrompt: 'What is the longest period between two events your last transition tested - and was anything important rarer than that?',
    }
  ],

  sopSteps: [
    { title: 'Inventory what moves by category', role: 'Category Manager',
      desc: 'List process, people, data and configuration, third-party arrangements and relationships, and name what is undocumented in each. The contracts inside the contract - leases, utility accounts, subcontracted desks - are where transitions stall.',
      control: 'The transition inventory is signed by the service owner and includes an undocumented-items section rather than ending at the document list.',
      record: 'Transition inventory with categories, owners and the named unknowns.',
      pitfall: 'Planning around the deliverables schedule and discovering on go-live that a landlord consent was never transferred.'
    },
    { title: 'Build the exception catalogue and reconcile it', role: 'Service Owner',
      desc: 'Ask the outgoing provider for the recurring exceptions, then compare their answer with twelve months of incident and escalation data. Every entry the incident history shows and the catalogue does not is a live risk with a name attached.',
      control: 'The difference between the providers list and the incident history is dispositioned item by item before acceptance.',
      record: 'Exception catalogue with reconciliation notes, owners and the disposition of each gap.',
      pitfall: 'Accepting a clean exception list from the party whose informal handling of those exceptions is the thing being inherited.'
    },
    { title: 'Prove capability by exercising it', role: 'Incoming Provider',
      desc: 'Run defined scenarios - including a deliberate failure and a month-end - with the new team handling live work and no help from the incumbent. Record what was needed and how long it took, and repeat until the exceptions are handled without escalation.',
      control: 'Acceptance requires exercised evidence at real periodicity, not a document review, and the record shows the timings.',
      record: 'Exercise report per scenario with participants, timings, escalations and the fixes made.',
      pitfall: 'Reading the run-book aloud in a meeting and minuting it as a rehearsal.'
    },
    { title: 'Price and plan the overlap window', role: 'Category Manager',
      desc: 'Set the duration, the measured criteria for ending it, who pays for the outgoing provider to stay, and the named decision-maker. Put the cost in the approval paper as a line item next to the expected saving.',
      control: 'Overlap is approved with its cost and its exit criteria at the same time as the transition plan, and ending it is a signed decision.',
      record: 'Overlap plan with duration, criteria, cost, payer and the decision-maker.',
      pitfall: 'Cutting the overlap to protect the project budget and converting a schedule saving into an incident cost.'
    },
    { title: 'Name the key people and their mitigations', role: 'Service Owner',
      desc: 'Identify the individuals whose departure breaks the plan, and attach a mitigation to each: funded retention through the window, a documented interview before they leave, or a second person shadowing the work now.',
      control: 'No transition is approved with key-person risk listed and no owner or mitigation against it.',
      record: 'Key-person register with mitigation, owner and the date the knowledge was captured.',
      pitfall: 'Relying on a contractual duty to cooperate to keep a specific engineer available.'
    },
    { title: 'Measure both sides through changeover', role: 'Incoming Provider',
      desc: 'Keep the service metrics running on the old and the new arrangement during overlap, agree in advance which measures decide acceptance, and hold a joint log of incidents so a failure can be located rather than argued.',
      control: 'Attribution is decided from the joint log against pre-agreed metrics, and neither provider grades its own service alone.',
      record: 'Joint measurement log with the agreed metrics, incidents and the acceptance reading.',
      pitfall: 'Discovering after the event that the two providers counted the same failure differently.'
    },
    { title: 'Close with the artefacts the next team needs', role: 'Category Manager',
      desc: 'End the transition with the exercised run-book, the exception catalogue with owners, the escalation map with names, confirmed data extracts in a usable format, and the dated acceptance decision with its evidence.',
      control: 'Transition closure is a file test, not a project milestone, and the pack is retained with the contract.',
      record: 'Closure pack with the five artefacts, the acceptance decision and the open items list.',
      pitfall: 'Closing the project and losing the only people who know how the exceptions are handled.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A transition pack has been delivered complete and on time. The incident log for the last twelve months shows fourteen recurring exception types; the packs exception catalogue lists five. The go-live date is in three weeks.',
      q: 'What is the correct next step?',
      options: [
        { text: 'Proceed; the pack is complete and the missing items can be handled as they arise.', isCorrect: false, rationale: 'Nine recurring exception types with no owner is not a gap to discover in production.' },
        { text: 'Reconcile the two lists, name an owner and a handling route for each of the nine, and make that a condition of acceptance - including at least one exercised at month end.', isCorrect: true, rationale: 'Correct. The difference between the incident history and the catalogue is the transition risk, and it is cheaper to close before cutover than after.' },
        { text: 'Ask the incoming provider to sign a waiver acknowledging the pack as complete.', isCorrect: false, rationale: 'That allocates liability for a known gap without closing it.' },
        { text: 'Extend the overlap by three months.', isCorrect: false, rationale: 'Overlap length is decided by measured criteria, not by an unexamined list.' }
      ],
      principle: 'The incident history is the honest version of the exception catalogue; reconcile them before you rely on either.',
    },
    {
      type: 'scenario',
      context: 'The overlap window is scheduled to end on the 30th. On the 26th the incoming provider handles a peak-day failure correctly but needed two hours of help from the incumbent, and the month-end reconciliation has not yet been exercised at all.',
      q: 'What should the decision-maker do?',
      options: [
        { text: 'End the overlap on the 30th; the schedule is the agreed control.', isCorrect: false, rationale: 'The schedule was never the evidence standard, and the two untested conditions are the ones that fail.' },
        { text: 'Extend against the pre-agreed criteria, exercise the month-end case, and record the decision with what remains open - including the cost of the extension and who carries it.', isCorrect: true, rationale: 'Correct. Overlap ends on measured behaviour; extending it is a planned event with a price, not an overrun.' },
        { text: 'End on the 30th and put the incumbent on notice for support after go-live.', isCorrect: false, rationale: 'That converts a priced extension into an unpriced dependency at the worst moment.' },
        { text: 'Cancel the transition and re-tender.', isCorrect: false, rationale: 'Two gaps in a transition that is otherwise working is not a re-tender.' }
      ],
      principle: 'Overlap ends on evidence, on a decision by a named person, with the cost of extending it stated out loud.',
    },
    {
      type: 'knowledge',
      q: 'Why is exercised evidence required rather than a completed handover pack?',
      options: [
        { text: 'Because packs are usually late.', isCorrect: false, rationale: 'Punctuality is not the issue; completeness about the actual work is.' },
        { text: 'Because a document shows what the process is supposed to be, while only running a real scenario - including a failure and a periodic case - shows what the new team can do.', isCorrect: true, rationale: 'Correct. That is also the form of evidence a regulator or auditor accepts.' },
        { text: 'Because the outgoing provider will not cooperate otherwise.', isCorrect: false, rationale: 'Cooperation is contractual; capability is demonstrated.' },
        { text: 'Because acceptance tests are cheaper than audits.', isCorrect: false, rationale: 'Not the reason.' }
      ],
      principle: 'Capability is proven by doing the work under live conditions, not by possessing the description of it.',
    },
    {
      type: 'knowledge',
      q: 'What is the practical treatment of key-person risk in a transition?',
      options: [
        { text: 'Note it in the risk register and review at go-live.', isCorrect: false, rationale: 'By go-live the person has usually gone.' },
        { text: 'Name the individuals whose departure breaks the plan, and attach an owner, a date and a mitigation - funded retention, a captured interview, or a second person shadowing now.', isCorrect: true, rationale: 'Correct. A duty to cooperate binds the company, not the individual, and knowledge leaves with people.' },
        { text: 'Require the incumbent to replace them with an equally experienced person.', isCorrect: false, rationale: 'That is a promise nobody can verify in the window.' },
        { text: 'Transfer the risk to the incoming provider contractually.', isCorrect: false, rationale: 'That moves the blame, not the capability.' }
      ],
      principle: 'The transition plan is only as durable as the people it depends on, so price their retention explicitly.',
    },
    {
      type: 'scenario',
      context: 'During changeover a service failure occurs and the outgoing provider attributes it to the new teams configuration, while the new team attributes it to the incumbents data extract. Neither side has been measured.',
      q: 'What does this expose?',
      options: [
        { text: 'A need for a stricter penalty regime in the next contract.', isCorrect: false, rationale: 'Penalties do not answer what happened.' },
        { text: 'The absence of pre-agreed joint measurement: without a shared log and agreed metrics during overlap, every changeover failure becomes a dispute about cause rather than a fixable event.', isCorrect: true, rationale: 'Correct. Attribution is designed before it is needed, which is why both sides are measured through the window.' },
        { text: 'That the transition should have been single-sided.', isCorrect: false, rationale: 'Single-sided changeover removes the comparison, not the dispute.' },
        { text: 'That the incoming provider should have run more tests.', isCorrect: false, rationale: 'Possibly, but the defect is the missing evidence standard.' }
      ],
      principle: 'Agree what decides acceptance before the failure, and measure both sides while it is still cheap.',
    }
  ],
  relSop: 'sop-contract-renewal',
  rel: {
    concepts: ['service-transition-design', 'knowledge-transfer-evidence', 'parallel-running-and-dual-changeover', 'essential-service-continuity-duty', 'vendor-lockin-and-portability', 'service-level-agreement'],
    sops: ['sop-contract-renewal', 'sop-supplier-performance-management', 'sop-contract-review'],
    checklists: ['cl-contract-renewal', 'cl-supplier-performance-review', 'cl-procurement-file-completeness'],
    templates: ['tpl-contract-renewal-assessment', 'tpl-supplier-business-review', 'tpl-bid-instructions'],
    calcs: ['calc-multi-year-contract-cost', 'calc-supplier-scorecard'],
    decisions: ['renew-vs-resource', 're-source', 'dual-source'],
    kpis: ['kpi-otif', 'kpi-defect-rate', 'kpi-contract-compliance'],
    glossary: ['gloss-sla', 'gloss-run-rate', 'gloss-cost-to-serve']
  },
  labMission: {
    title: 'Mission 29.1: Reconcile the Catalogue With the Incidents',
    desc: 'Take one service you could name and compare what the provider says with what actually happened.',
    tasks: [
      'List the categories that would move in a transition of that service, and write the undocumented items you can already think of.',
      'Pull twelve months of incident or escalation data and compare it with any exception list the provider holds. Count the difference.',
      'Draft the acceptance criteria for one exercised scenario, including a failure and a periodic case, and name who signs that it passed.'
    ],
    ctaLabel: 'Open Supplier Scorecard',
    ctaHref: '#/calc/calc-supplier-scorecard',
    secondaryLabel: 'Open the Contract Renewal Checklist',
    secondaryHref: '#/cl/cl-contract-renewal'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-tail-period-and-exit-cooperation',
  title: 'The Tail Period: Buying Cooperation Before You Need It',
  module: 'Module 29: Service Transition and Exit - Moving Work Without Losing It',
  kicker: 'Function 29.2',
  tier: 'executive',
  tagline: 'The tail is the window where your leverage is lowest and the incumbents incentive is weakest. It is priced at award or it is priced under duress, and there is no third option.',
  desc: "This function covers the governance of exit: what the tail period costs and how to bound it, which obligations must survive termination, how to make early cooperation worth more than late obstruction, and the question a board should ask before approving a contract that could become difficult to leave.",
  duration: '18 mins',
  lifecycleStage: 'Stage 16: Approval & Delegation of Authority',
  lifecycleDesc: 'Decided at approval, because the exit terms are set once - at signature - and cannot be negotiated later at a good price.',

  what: "Every contract is an exit contract; the difference is whether anyone priced it. The tail period is the interval between the decision to leave and the moment the new service is stable, during which the outgoing provider still runs the work and knows it is being replaced. That asymmetry is the whole subject. Two facts explain most of what goes wrong. First, the incumbent controls the assets the transition needs: the data, the configuration, the undocumented arrangements, the people, and often the subcontracted pieces of the service. Second, their commercial interest during that window is close to nil - the work is ending, the margin is fixed, and the effort spent helping you is effort spent on someone else future revenue. A duty to cooperate at reasonable cost does not change either fact; it just makes the dispute look contractual rather than practical. The fourteen-week tail quoted at twice the contract day rate is the predictable outcome of a clause with no rate, no cap and no duration. So the tail is bought, not hoped for, and it is bought at award. Four instruments matter. Price it: a rate card for tail services, in the schedule, with the scope defined - extracts, knowledge transfer, interface maintenance, subcontracted third-party support, and the reporting needed to prove the service is stable. Bound it: a maximum duration with a defined extension mechanism and an approver, so that a long tail is a decision rather than a drift. Make obligations survive termination: data extracts in a stated format with a stated completeness test, configuration and documentation handed over, access maintained for a defined period, and cooperation with the incoming provider named as a party who is entitled to receive it. And align the incentives, which is the part most boards miss: hold something back. A retention against the final invoice released on verified transition completion, a tail payment made in stages against delivered artefacts, or a transition bond where the service is critical, all make the profitable strategy for the incumbent the cooperative one. The alternative - paying in advance for cooperation - is what the rate-card dispute above really was. There is a structural question underneath this that belongs at board level rather than in a template: how much of this service is portable? Portability is not a clause, it is an architecture. If the configuration lives in the providers platform, the schema is theirs, the reporting is generated by their tooling and the only people who understand the exception handling are their staff, then the exit cost is not a tail fee - it is the whole service, repriced at the moment you have no alternative. Boards approve contracts without ever seeing that number. The discipline is to require, at approval, a statement of switching cost: what would it take to leave, how long, at what cost, and what is portable today versus what would need to be built. Where the answer is bad, either buy the portability in the contract - data in a usable format on demand, escrow of configuration, a documented interface, an obligation to keep the run-book current - or shorten the term so the option comes back sooner. A long term is not always wrong; it is wrong when it is chosen for a discount while the switching cost is invisible. Finally, the reporting habit that keeps this honest. Most organisations learn about their exit exposure during an actual exit. A simple annual position - the top ten services by switching cost, with the tail terms, the portability position and the date of the last tested extract - turns a surprise into a portfolio. It also answers the regulator or auditor who asks whether the continuity obligation is actually managed, which is the same question Module 27 put at the centre of a licensed operation. The sentence worth repeating to a board is short: the price of leaving is agreed once, at signature, in the calm, with alternatives available. Every other moment to agree it is worse, and the last one is the worst of all.",
  why: [
    'The tail is where the buyers leverage is lowest and the incumbents incentive is weakest, by construction.',
    'A duty to cooperate without a rate, a cap and a duration is an invitation to price the exit under duress.',
    'Obligations must survive termination: data in a usable format, configuration, access, and cooperation with the named successor.',
    'Retention against verified transition completion makes cooperation the profitable strategy.',
    'Portability is an architecture, not a clause, and it determines whether the exit cost is a fee or the whole service.',
    'The price of leaving is agreed once, at signature, while alternatives still exist.'
  ],
  when: [
    'Approving any contract with a realistic prospect of replacement.',
    'Before agreeing a longer term in exchange for a rate reduction.',
    'When the incumbent learns the renewal is contested.',
    'At the annual review of switching exposure across the portfolio.',
    'When a regulator asks whether continuity is managed rather than intended.'
  ],

  raci: [
    { role: 'Board or Executive Sponsor', resp: 'Approves the switching-cost statement and the term, knowing what leaving would cost.' },
    { role: 'Head of Procurement', resp: 'Sets the tail rate card, the cap, the survival obligations and the retention mechanism.' },
    { role: 'Legal', resp: 'Drafts the clauses that survive termination and the named successor right.' },
    { role: 'Service Owner', resp: 'Defines what a usable extract is and tests that it can actually be taken.' },
    { role: 'Finance', resp: 'Holds the retention, prices the tail, and books the exit exposure rather than discovering it.'
    }
  ],
  inputs: [
    'The draft schedule: termination rights, cooperation clauses, rate card, data and configuration terms.',
    'A switching-cost statement: what moves, how long, at what cost, what is portable today.',
    'The transition plan from the incoming side, with its dependency on the incumbent.',
    'The service criticality: consequence of a break, regulatory status, substitution time.'
  ],
  outputs: [
    'A priced and bounded tail with survival obligations and a named successor right.',
    'A retention or staged-payment mechanism tied to verified transition artefacts.',
    'A switching-cost statement approved with the contract, with the portability gaps named.',
    'An annual portfolio view of exit exposure across the critical services.'
  ],
  controls: [
    'No critical service is approved without a switching-cost statement and a tested data extract.',
    'Tail services carry a rate card, a maximum duration and a defined extension approver.',
    'Cooperation obligations, data formats and access rights are stated to survive termination.',
    'A retention or staged payment is held against verified transition completion.',
    'The annual review lists the top services by switching cost with the date of the last tested extract.'
  ],
  bestPractices: [
    'Ask at approval: if we left tomorrow, what would it cost and how long would it take - and put the answer in the paper.',
    'Define a usable extract by testing one, not by describing one.',
    'Trade term length against portability: a longer term is acceptable when leaving is cheap.',
    'Make the last payment contingent on the thing you actually need, which is a working handover.'
  ],
  mistakes: [
    'Relying on a termination-for-convenience clause as an exit plan.',
    'Leaving tail pricing to good faith because the relationship is healthy now.',
    'Paying the final invoice before the transition artefacts are verified.',
    'Discovering the switching cost during the exit, when there is no alternative left to price against.'
  ],
  terms: [
    { term: 'Tail period', def: 'The interval between the decision to leave and a stable new service, during which the incumbent still runs the work.' },
    { term: 'Survival obligation', def: 'A duty that continues after termination: extracts, configuration, access, and cooperation with the successor.' },
    { term: 'Portability', def: 'How much of the service can move without the incumbents permission, tooling or people.' },
    { term: 'Switching cost', def: 'The total time and money required to leave, including requalification and the tail itself.' }
  ],

  thinkingPoints: [
    {
      quote: 'Fourteen weeks at twice the rate.',
      explanation: 'A contract required cooperation on exit at reasonable cost, with no rate and no cap. When the incumbent learned the renewal was contested it quoted fourteen weeks of tail support at a day rate twice the contract rate, and the incoming provider could not yet absorb the work. The buyer paid. Most of the saving the tender had produced was spent on the tail, and the clause that was supposed to protect the exit had only created an argument about what reasonable meant.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: an unpriced cooperation duty is not a protection, it is a negotiation deferred to the moment your leverage is lowest.',
      reflectionPrompt: 'For your most critical supplier, what is the tail rate, the maximum duration, and who can approve an extension?',
    },
    {
      quote: 'The extract nobody could open.',
      explanation: 'A transition required the outgoing provider to deliver a full data extract, and it delivered one on time: a proprietary export from a platform the successor could not read, with no schema documentation. Six weeks were spent building a converter, during which the incumbent was the only party able to run the service, and its cooperation became the subject of a commercial discussion rather than a contractual one.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a right to data is worthless without a format, and the format is only proven by testing it.',
      reflectionPrompt: 'When did you last test taking a usable extract from a critical provider, and did the successor confirm it could be read?',
    }
  ],

  sopSteps: [
    { title: 'Price the tail at award, in the schedule', role: 'Head of Procurement',
      desc: 'Set a rate card for the services the exit needs: extracts, knowledge transfer, interface maintenance, third-party support and reporting. Define what is included so reasonable cost is not later argued as a surprise.',
      control: 'Every critical contract carries a tail rate card with scope, and an approval above the requester is required to exceed it.',
      record: 'Tail schedule with rates, scope, the cap and the extension approver.',
      pitfall: 'A cooperation clause with no price, which becomes a negotiation conducted by the party holding the service.'
    },
    { title: 'Bound the duration and the extension', role: 'Legal',
      desc: 'State the maximum tail period, what triggers an extension, who approves it and at what rate. An unbounded tail protects nothing; it just moves the argument later.',
      control: 'Extensions beyond the stated period require a named approver and a recorded reason, and the total is capped.',
      record: 'Duration clause with cap, extension mechanism and approver.',
      pitfall: 'Leaving the tail open-ended to be flexible, and giving the incumbent a paid option to slow the transition.'
    },
    { title: 'Make the obligations survive termination', role: 'Legal',
      desc: 'Specify the data format and completeness test, the configuration and documentation handed over, the access maintained during the window, and name the successor as a party entitled to receive cooperation.',
      control: 'Survival obligations are listed explicitly in the termination clause and are tested against a scenario before signature.',
      record: 'Survival schedule with formats, tests, access rights and the named successor right.',
      pitfall: 'Cooperation owed to the buyer only, which the provider can satisfy by answering emails slowly.'
    },
    { title: 'Hold something back', role: 'Finance',
      desc: 'Make the final payment or a retention contingent on verified transition artefacts, released in stages as the extracts, run-book and exercised handover are accepted. Where the service is critical, consider a transition bond.',
      control: 'No critical contract pays in full before the transition artefacts are verified, and the release schedule is in the payment terms.',
      record: 'Payment or retention schedule tied to the acceptance of each transition artefact.',
      pitfall: 'Paying for cooperation in advance and asking for it afterwards as a favour.'
    },
    { title: 'State the switching cost before approving', role: 'Board or Executive Sponsor',
      desc: 'Require the paper to answer: what moves, how long it takes, what it costs, and what is portable today versus what would have to be built. Where the answer is bad, buy portability or shorten the term.',
      control: 'Approval of a critical service requires a switching-cost statement, and a long term requires a reason it is acceptable given that cost.',
      record: 'Switching-cost statement with the term decision and the portability gaps named.',
      pitfall: 'Trading a two-year extension for a rate reduction while the exit cost stays invisible.'
    },
    { title: 'Test the extract, do not describe it', role: 'Service Owner',
      desc: 'Once in the life of the contract, take a real extract in the stated format and have the successor or an independent engineer confirm it can be read and loaded. Record the date and the result.',
      control: 'Every critical provider has a dated, successful extract test, and a failed or missing test is escalated as a risk item.',
      record: 'Extract test log with format, date, reviewer and the outcome.',
      pitfall: 'A proprietary export nobody can read, discovered at the moment it is the only thing that matters.'
    },
    { title: 'Report the exposure annually', role: 'Head of Procurement',
      desc: 'Publish the top services by switching cost with their tail terms, portability position and last tested extract, and take the list to the risk committee alongside the continuity register.',
      control: 'The annual exit-exposure report is produced and reviewed, and the worst positions carry a named mitigation.',
      record: 'Exit exposure report with rankings, tail terms, portability status and mitigations.',
      pitfall: 'Learning the switching cost during the exit, when there is no alternative left to price against.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A board is approving a five-year contract at a 9 percent rate reduction against the current three-year deal. The switching-cost statement is not in the paper, and the service configuration lives entirely in the providers platform.',
      q: 'What should the board require before approving?',
      options: [
        { text: 'The approval can proceed; five years of price certainty is the point of the discount.', isCorrect: false, rationale: 'The certainty is real but its price is the exit cost, which is exactly what has not been stated.' },
        { text: 'A switching-cost statement - what moves, how long, what it costs, and what is portable - and either the purchase of portability terms or a shorter term, before the 9 percent is treated as a saving.', isCorrect: true, rationale: 'Correct. A long term is defensible when leaving is cheap; here the architecture makes leaving expensive, and that trade should be visible in the approval.' },
        { text: 'A clause requiring cooperation on exit at reasonable cost.', isCorrect: false, rationale: 'That is the clause that produced the fourteen-week, double-rate tail.' },
        { text: 'A review at year three.', isCorrect: false, rationale: 'A review date is not an option; without portability there is nothing to switch to.' }
      ],
      principle: 'The price of a long term is the exit cost, and it should be on the paper before the discount is welcomed.',
    },
    {
      type: 'scenario',
      context: 'The incumbent has just learned the renewal is contested. It quotes fourteen weeks of tail support at twice the contract day rate, citing the contracts reasonable-cost cooperation clause. The incoming provider cannot yet absorb the work.',
      q: 'What is the correct assessment?',
      options: [
        { text: 'The incumbent is in breach of the cooperation duty and should be threatened with litigation.', isCorrect: false, rationale: 'The clause says cooperate at reasonable cost; without a rate or cap, the quote is not obviously a breach, and a threat will not run the service.' },
        { text: 'The exposure was created at signature by an unpriced, unbounded obligation. Manage now with a staged payment against defined artefacts and a documented extension approver, and fix the clause at the next contract so the tail is priced and capped.', isCorrect: true, rationale: 'Correct. This is the predictable outcome of a duty without a rate; the immediate lever is money tied to deliverables, and the durable fix is at award.' },
        { text: 'Pay it and extend the incumbent for twelve months to avoid the transition.', isCorrect: false, rationale: 'That converts a priced problem into an unpriced dependency and teaches the market the tactic works.' },
        { text: 'Accelerate the cutover and end the tail by decision.', isCorrect: false, rationale: 'That moves the risk onto the service, which is the thing the tail exists to protect.' }
      ],
      principle: 'An unpriced cooperation clause is a negotiation deferred to the moment your leverage is lowest.',
    },
    {
      type: 'knowledge',
      q: 'Which mechanism most reliably buys cooperation during a tail period?',
      options: [
        { text: 'A liquidated-damages clause for poor transition performance.', isCorrect: false, rationale: 'That punishes after the event and is usually contested; it does not make the knowledge arrive.' },
        { text: 'A retention or staged final payment released against verified transition artefacts - extracts in a usable format, the exercised run-book, and named handover completion.', isCorrect: true, rationale: 'Correct. It aligns the profitable strategy with the one you need, and it is decided while the alternative still exists.' },
        { text: 'A written request to the account director.', isCorrect: false, rationale: 'Goodwill is not a control.' },
        { text: 'A shorter notice period.', isCorrect: false, rationale: 'That compresses the window without changing the incentive.' }
      ],
      principle: 'Make cooperation the paid-for deliverable, not the contractual courtesy.',
    },
    {
      type: 'knowledge',
      q: 'What makes a data-extract obligation real rather than decorative?',
      options: [
        { text: 'That it is written into the termination clause.', isCorrect: false, rationale: 'So is every decorative obligation.' },
        { text: 'A stated format and completeness test, a named party entitled to receive it, and a dated successful test performed during the life of the contract and confirmed by the successor.', isCorrect: true, rationale: 'Correct. A right to data without a readable format is a right to a file nobody can open.' },
        { text: 'That the provider confirms it will comply.', isCorrect: false, rationale: 'Confirmation is not verification.' },
        { text: 'A penalty for non-delivery.', isCorrect: false, rationale: 'That compensates for the failure rather than preventing it.' }
      ],
      principle: 'Portability is proven by taking the extract once and having someone else load it.',
    },
    {
      type: 'scenario',
      context: 'An annual review of the top ten services by switching cost shows three with no tested extract, two with tail terms that are good faith only, and one where the last tested extract predates a major platform change.',
      q: 'What is the correct treatment?',
      options: [
        { text: 'Note the findings and address each at its next renewal.', isCorrect: false, rationale: 'That leaves the exposure unmanaged for years and the platform-changed one is already broken.' },
        { text: 'Raise a named mitigation per position with an owner and a date - schedule an extract test, negotiate a tail rate card at the next variation, re-test the stale one now - and report the trend to the risk committee alongside the continuity register.', isCorrect: true, rationale: 'Correct. Exit exposure is a managed position, and the report is only useful if it changes something with a date on it.' },
        { text: 'Consolidate the three untested services with one provider to reduce complexity.', isCorrect: false, rationale: 'That concentrates the exposure behind the same weakness.' },
        { text: 'Ask the providers to confirm compliance in writing.', isCorrect: false, rationale: 'That is the decorative version of the control.' }
      ],
      principle: 'Switching cost is a portfolio position; it is managed with tests, dates and owners, not with renewals.',
    }
  ],
  relSop: 'sop-contract-review',
  rel: {
    concepts: ['tail-period-economics', 'service-transition-design', 'vendor-lockin-and-portability', 'essential-service-continuity-duty', 'contract-structure', 'payment-terms'],
    sops: ['sop-contract-review', 'sop-contract-renewal', 'sop-negotiation-preparation'],
    checklists: ['cl-contract-review', 'cl-contract-renewal', 'cl-negotiation'],
    templates: ['tpl-contract-review-checklist', 'tpl-negotiation-planner', 'tpl-exception-request'],
    calcs: ['calc-payment-terms', 'calc-multi-year-contract-cost'],
    decisions: ['renew-vs-resource', 'negotiate-or-accept', 'approve-exception'],
    kpis: ['kpi-contract-coverage', 'kpi-cost-avoidance', 'kpi-cycle-time'],
    glossary: ['gloss-run-rate', 'gloss-change-order', 'gloss-doa']
  },
  labMission: {
    title: 'Mission 29.2: Write the Number You Would Hate to Pay',
    desc: 'Take one critical supplier and price your own exit.',
    tasks: [
      'Draft the switching-cost statement: what moves, how long, what it costs, and what is portable today without their permission.',
      'Find the tail terms in that contract. Is there a rate, a cap, an extension approver, and an obligation that survives termination? Write the sentence you would want if you were leaving.',
      'Schedule one extract test this quarter and name the person who must confirm the file can be read by someone else.'
    ],
    ctaLabel: 'Open Payment Terms',
    ctaHref: '#/calc/calc-payment-terms',
    secondaryLabel: 'Open the Contract Review Checklist',
    secondaryHref: '#/cl/cl-contract-review'
  }
});
