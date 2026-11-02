/* ==========================================================
   Procure Sherpa v3.0 - Academy Content Part 12
   Module 17: Global Sourcing Operations - Development, Quality
   and Continuity. The curriculum teaches how to choose a
   supplier and how to govern the contract; it did not teach the
   operational work that follows when the source is hard to
   replace, the conformity of what arrives has to be proved, and
   a single geography carries the whole risk.
   ========================================================== */
PS.ACADEMY_FUNCTIONS = PS.ACADEMY_FUNCTIONS || [];

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-supplier-development',
  title: 'Supplier Development: Improving a Source You Cannot Replace',
  module: 'Module 17: Global Sourcing Operations - Development, Quality and Continuity',
  kicker: 'Function 17.1',
  tier: 'practitioner',
  tagline: 'When qualification cycles, tooling or geography mean there is no alternative, the only lever left is making the existing one better.',
  desc: 'Most procurement method assumes a supplier can be replaced. In a long qualification cycle, a tooling-owned process or a thin market it cannot, and the answer is supplier development: a structured, funded, time-boxed programme to raise a source\'s capability. This function covers when development is the right answer rather than a refusal to decide, how to scope it, who pays and who benefits, and how to stop it becoming consulting work done for free.',
  duration: '23 mins',
  lifecycleStage: 'Stage 19: Supplier Performance & SRM',
  lifecycleDesc: 'Sits in the performance stage but starts from a sourcing constraint: it is what you do when re-sourcing is not genuinely available.',

  what: 'Supplier development is the deliberate investment of buyer-side time, expertise or money into a supplier\'s capability, and it is justified by exactly one condition: the constraint you are trying to remove is real and cannot be removed faster by finding another source. Say that out loud at the start, because the alternative explanation for most development programmes is that re-sourcing was too hard, the incumbent had a good relationship with the site, and someone needed to look like they were doing something about the cost or the quality. A legitimate case has a named constraint - a eighteen-month requalification, tooling the supplier owns, a process nobody else in the region runs, a certification the market takes a year to obtain - and a target the business actually needs: first-pass yield from 91 to 97 percent, changeover time halved, an on-time rate held through a seasonal peak, a defect class eliminated rather than sorted. Scope it as a project with a baseline, a target, an owner on each side, a period and a measure, because anything looser becomes a relationship activity. The economics matter and are usually unexamined. Your engineer\'s time is a cost; the supplier\'s improvement is an asset they keep and can sell to your competitor next year. So decide before starting what you get for it: a price held for a period, capacity reserved, first refusal on new volume, an exclusivity that expires, shared tooling access, a cost-down split on the saving the programme creates, or visibility rights over the process afterwards. There is no rule that says these must be extracted - there is a rule that says they must be decided, because an undeclared benefit is a gift to the sales director and a finding for the next audit. Two failure modes are worth naming precisely. The first is development as therapy: a programme that produces reports, meetings and goodwill, and leaves the metric where it was, because nobody was willing to say the constraint was commercial rather than technical. The second is teaching a supplier to be efficient and then discovering your volume is too small for them to care about you afterwards - the capability you built is reallocated to a larger customer, and you are now dependent on a supplier who understands your demand better than you understand theirs. The honest version of this function includes knowing when to stop. If two funded cycles on the same constraint have not moved the measure, the constraint is not technical and the answer is design - change the specification, change the material, change the process on your own side so the requirement no longer exists. That is a procurement outcome, and it is frequently cheaper than a third programme.',
  why: [
    'Development is the correct response to a real constraint, and the wrong response to a hard decision. Naming which one you are doing is the first deliverable.',
    'Buyer time and expertise are unfunded costs that appear in nobody\'s budget, so a development programme with no stated return is spending money no one has agreed to spend.',
    'The capability you build stays with the supplier after the programme ends. Without an agreed benefit, you have paid to improve a party who may sell the result to your competitor.',
    'Two failed cycles on the same measure is evidence about the nature of the constraint, not evidence that more effort is needed.',
    'Changing the requirement is often the cheapest route to the outcome. Development aimed at a specification nobody ever validated is the most expensive route.'
  ],
  when: [
    'When re-qualification or tooling makes substitution slower and dearer than improvement, and the constraint is documented.',
    'When a supplier is strategically important and structurally weak: capable of the volume, not yet capable of the standard.',
    'When a market is thin enough that developing an existing source is the only realistic way to add a second one.',
    'When the business requirement itself has been validated - because development aimed at an unnecessary tolerance is a project that should never have existed.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Establishes the constraint, scopes the programme, negotiates the return, and decides whether a third cycle is justified.' },
    { role: 'Technical / Quality Engineer', resp: 'Provides the capability, runs the analysis with the supplier, and owns the measurement of the baseline and the result.' },
    { role: 'Supplier Account Manager', resp: 'Owns delivery of the improvement inside their organisation and commits their own resource, not only yours.' },
    { role: 'Finance', resp: 'Values the buyer-side cost, agrees how the saving is split and classified, and confirms the programme does not simply move cost between lines.'
    }
  ],
  inputs: [
    'The documented constraint: qualification lead time, tooling ownership, process rarity, certification status and the realistic alternative with its cost.',
    'A measured baseline of the thing to be improved, agreed by both sides, with the data source named.',
    'The business requirement validated against the specification, so the target is a real need rather than a habit.',
    'A named buyer-side resource with an estimate of their time, and an approval that recognises it as a cost.'
  ],
  outputs: [
    'Development charter: constraint, baseline, target, period, owners on both sides, the buyer-side cost and the benefit the buyer receives.',
    'Progress record with the measured movement, the obstacles and the decision at each gate.',
    'A closing assessment: the result, whether the return was secured, and what happens to the capability afterwards.',
    'Where the programme fails, a documented re-source or design-change recommendation instead of a third cycle.'
  ],
  controls: [
    'No programme starts without a written constraint, a measured baseline and a named benefit to the buyer.',
    'Buyer-side resource is approved by the function that owns it, so the cost is visible rather than absorbed.',
    'Gate reviews at fixed dates with a continue, change or stop decision recorded by name.',
    'Two consecutive failed gates on the same measure trigger a design or sourcing review, not another plan.'
  ],
  bestPractices: [
    'Put the supplier\'s own resource in the charter. A programme where the buyer does the analysis and the supplier implements the conclusion produces dependency, not capability.',
    'Measure with your own data. The supplier\'s yield report is an input; the receiving inspection record is the result.',
    'Keep the return simple and contractual: a price held, capacity reserved, a cost-down share, visibility rights. Novelty in a development deal is where the value leaks.',
    'Write down what you learned about the specification. Development programmes regularly discover the requirement was never needed, and that finding is worth more than the improvement.'
  ],
  mistakes: [
    'Running development because the relationship is good and the alternative is uncomfortable.',
    'Funding engineering time out of a category budget that has no line for it, so the programme is invisible until it is over.',
    'Accepting a target the supplier sets, which is usually the measure they can already nearly meet.',
    'Repeating the same programme with a new name after the first one failed, which is how a capability gap becomes a permanent cost.'
  ],
  terms: [
    { term: 'Supplier development', def: 'A structured, time-boxed investment of buyer resource into a supplier\'s capability, justified by a documented constraint on substitution.' },
    { term: 'Qualification cycle', def: 'The lead time required to approve an alternative source for a specified item, often the real reason a supplier is not replaceable.' },
    { term: 'Cost-down share', def: 'An agreed split of the saving a development programme creates, used as the return on buyer-side investment.' },
    { term: 'Design-out', def: 'Removing the requirement through a change of specification, material or process instead of improving the supplier\'s ability to meet it.' }
  ],

  thinkingPoints: [
    {
      quote: 'We spent two years making a supplier good at a job we should have stopped asking for.',
      explanation: 'A machining supplier missed a surface-finish tolerance repeatedly. A development programme raised their capability and their cost, and the buyer paid for the engineering time. In the third year a design review found the tolerance had been copied from an earlier drawing and nothing in the assembly depended on it. Relaxing it removed the failure, the programme and a per-unit cost the supplier had been carrying since year one.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: before improving a supplier\'s ability to meet a requirement, test whether the requirement is real. A large share of supplier performance problems are specification problems wearing a supplier\'s face.',
      reflectionPrompt: 'Which current development or improvement work exists to meet a tolerance nobody has revalidated in years?'
    },
    {
      quote: 'The capability stayed. The loyalty did not.',
      explanation: 'A buyer funded a lean programme for a small sole-source fabricator, taking defect rates down substantially and shortening lead times. Eighteen months later the fabricator used the improved capacity and faster turnaround to serve a larger customer in the same sector, and the original buyer\'s order became the one that got pushed to the end of the queue. There had been no reserved capacity and no commitment in the programme charter.',
      realWorldExample: 'Illustrative example: an improvement you paid for becomes a supplier asset, and assets are allocated to the customer with the most leverage unless a contract says otherwise.',
      reflectionPrompt: 'If you funded an improvement today, what would you be entitled to afterwards - and is that written anywhere?'
    }
  ],

  sopSteps: [
    { title: 'Prove the constraint before choosing development', role: 'Category Manager',
      desc: 'Write down why this supplier cannot be replaced at acceptable cost and time: qualification lead time, tooling ownership, process rarity, certification, and the realistic alternative priced properly. Where the honest answer is that re-sourcing would be awkward rather than expensive, the correct programme is a tender, not a development plan.',
      control: 'A development charter cannot be approved without a documented constraint and a costed alternative.',
      record: 'Constraint note with the qualification timeline, tooling position and the alternative source assessment.',
      pitfall: 'Accepting "sole source" as a description rather than a finding, and never testing what it would take to end it.' },
    { title: 'Validate the requirement you are trying to meet', role: 'Technical / Quality Engineer',
      desc: 'Before improving a supplier\'s ability to meet a specification, check that the specification is needed. Re-read the tolerance against the function it serves, and ask what breaks if it is relaxed. Design-out is cheaper than development and is discovered almost only by people who were asked to look.',
      control: 'Every development target is signed off by someone who has confirmed the requirement is real and current.',
      record: 'Requirement review note with the function served and any tolerance change agreed.',
      pitfall: 'Copying a tolerance from an older drawing because it was in the file, and then funding a programme to meet it.' },
    { title: 'Agree the baseline with data both sides accept', role: 'Technical / Quality Engineer',
      desc: 'Measure the thing to be improved from a named source, over enough periods to include normal variation, and agree it in writing. A baseline the supplier disputes is not a baseline, and a baseline taken in a quiet month flatters everyone and collapses at the first peak.',
      control: 'The baseline states its source, its window and its variation, and both parties have signed it.',
      record: 'Baseline sheet with data source, period and the measured spread.',
      pitfall: 'Using the supplier\'s internal report as the baseline and your own receiving data as the measure, so the improvement cannot be compared with anything.' },
    { title: 'Write the charter, including what the buyer receives', role: 'Category Manager',
      desc: 'Set the target, the period, the owners on both sides, the buyer-side resource with its cost, and the benefit the buyer gets for funding it: a price held, capacity reserved, a cost-down share, visibility rights or first refusal on new volume. Decide the benefit now, in the open, rather than discovering later that the value went to the supplier.',
      control: 'No programme starts without a named buyer benefit and an approval from the function lending the engineer.',
      record: 'Signed development charter with the return stated and the approval dates.',
      pitfall: 'Leaving the return vague so the conversation stays comfortable, which converts a funded investment into an unsanctioned gift.' },
    { title: 'Run the work with the supplier, not for them', role: 'Supplier Account Manager',
      desc: 'Do the analysis jointly, require the supplier to commit their own people and time in the charter, and hand over the method with the result. A programme that ends with the supplier able to hit the target while the buyer was doing the work has produced a dependency, not a capability.',
      control: 'Supplier-side resource is named in the charter and their contribution is recorded at each gate.',
      record: 'Joint work log with each side\'s contributions and the method transfer evidence.',
      pitfall: 'Solving the problem on the supplier\'s shop floor because it is faster, which is quicker and worth nothing after you leave.' },
    { title: 'Gate the programme on measurement', role: 'Category Manager',
      desc: 'Review at fixed dates against the agreed measure, and record a continue, change or stop decision by name. Gates are where an uncomfortable programme gets an honest ending, so the stop option has to be real at gate one or it will not exist at gate three.',
      control: 'Each gate produces a dated decision with an owner, and a failed gate changes the plan rather than the language.',
      record: 'Gate minutes with the measured movement and the decision taken.',
      pitfall: 'Reporting activity - meetings held, training delivered - instead of movement in the measure the charter named.' },
    { title: 'Close it, and decide what happens next', role: 'Finance',
      desc: 'Verify the result on the buyer\'s own data over a window that includes normal variation, value the saving, apply the agreed split, and record whether the constraint still exists. Where the target was not met twice on the same cause, recommend the design change or the re-source instead of a further cycle.',
      control: 'Closure requires buyer-side verification and a stated position on whether the source is still non-substitutable.',
      record: 'Closing assessment: verified result, benefit received, capability retained, and the sourcing recommendation.',
      pitfall: 'Closing on the supplier\'s final presentation, which is a summary of intent written by the party being assessed.' }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A supplier misses a surface-finish tolerance repeatedly. Re-qualification elsewhere takes fourteen months and new tooling. Your engineer suggests a development programme.',
      q: 'What must happen before the programme starts?',
      options: [
        { text: 'Agree targets and a schedule with the supplier and begin.', isCorrect: false, rationale: 'That is the second step. Starting before the requirement has been tested risks funding a programme to meet a tolerance nobody can justify.' },
        { text: 'Check whether the tolerance is actually needed, and confirm the constraint and cost the alternative properly.', isCorrect: true, rationale: 'Correct. Design-out is cheaper than development, and it is found almost only when someone is asked to look. If the requirement survives the review, you then know the constraint is real and the programme has a justification.' },
        { text: 'Issue a formal non-conformance first, so the supplier takes it seriously.', isCorrect: false, rationale: 'Contractual pressure before diagnosis produces a defensive supplier and a corrective action that names the symptom. It may still be the right eventual step, but not before you know what you are asking for.' },
        { text: 'Ask the supplier to quote the cost of improving the process.', isCorrect: false, rationale: 'This starts the conversation at their price rather than at the requirement, and it presumes the process is the cause.' }
      ],
      principle: 'Before funding a supplier\'s ability to meet a requirement, test whether the requirement is real. Some supplier problems are specification problems.'
    },
    {
      type: 'scenario',
      context: 'A funded development programme will use 120 hours of your quality engineer over six months. The supplier gains a permanent process improvement.',
      q: 'What should the charter include?',
      options: [
        { text: 'The improvement target and the review dates.', isCorrect: false, rationale: 'Necessary and incomplete. It records what the supplier gains and nothing about what the buyer receives for a real cost.' },
        { text: 'The buyer-side cost, an approval from the engineer\'s own function, and a stated benefit: price held, capacity reserved, cost-down share or visibility rights.', isCorrect: true, rationale: 'Correct. The engineer\'s time is money that currently appears in no budget, and the improvement is an asset the supplier keeps. Both facts belong in the document that authorises the work.' },
        { text: 'A confidentiality clause covering the process learnings.', isCorrect: false, rationale: 'Worth having where the method is genuinely yours, and it does not answer the economic question. Confidentiality protects knowledge; it does not pay for it.' },
        { text: 'A clause allowing the programme to be extended if targets slip.', isCorrect: false, rationale: 'Extension clauses in improvement programmes are how failed projects become permanent ones. The gate decision should be continue, change or stop.' }
      ],
      calcWork: '120 hours of a qualified engineer is a real cost with a market value; if the programme produces a saving, the split has to be agreed before the work, because afterwards there is nothing left to trade.',
      principle: 'Decide what you get for funding somebody else\'s capability, and write it down before you spend the hours.'
    },
    {
      type: 'scenario',
      context: 'Two consecutive gates on the same development programme show no movement in the measure. The supplier proposes a third phase with additional training.',
      q: 'What is the correct response?',
      options: [
        { text: 'Approve the third phase: abandoning now wastes the investment already made.', isCorrect: false, rationale: 'Sunk cost reasoning. The two failed gates are the information; the extra hours already spent are not a reason to buy more of the same outcome.' },
        { text: 'Stop, and treat two failures as evidence the constraint is not technical: review the design, the specification or the sourcing route.', isCorrect: true, rationale: 'Correct. Repeated failure to move a measure despite funded effort usually means the cause is elsewhere - an unworkable requirement, a supplier whose real constraint is capital, or a relationship where the buyer is more dependent than the supplier.' },
        { text: 'Escalate to the supplier\'s managing director.', isCorrect: false, rationale: 'Escalation raises pressure, not capability. If the constraint were motivational the first two gates would have shown movement.' },
        { text: 'Reduce the target so the programme can be closed successfully.', isCorrect: false, rationale: 'This is how improvement programmes come to look like administrative exercises. If the original target was wrong, say so and change the requirement instead of the measure.' }
      ],
      principle: 'Two failed gates on the same measure is a finding about the constraint. The next review should be about design or sourcing, not about effort.'
    },
    {
      type: 'scenario',
      context: 'You depend on a sole-source fabricator. They are improving, but their largest customer is a competitor of yours.',
      q: 'What is the most important thing to establish?',
      options: [
        { text: 'Whether they will sign a confidentiality agreement.', isCorrect: false, rationale: 'Useful, and secondary. Confidentiality governs information; it does not govern capacity, priority or investment decisions.' },
        { text: 'What share of their capacity and revenue you represent, and what happens to your priority when the two customers compete for the same slot.', isCorrect: true, rationale: 'Correct. Dependency is a function of relative importance. Knowing your share tells you whether improvement will be available to you, whether a development programme is worth funding, and whether you need a second source regardless of the cost.' },
        { text: 'Whether their quality system is certified.', isCorrect: false, rationale: 'A baseline check, not a risk answer. Certification says a system exists; it says nothing about who gets the capacity.' },
        { text: 'Whether a longer contract term would secure their loyalty.', isCorrect: false, rationale: 'Terms secure volume commitments, not preference. Where you are a minor customer, a longer term can make the position worse by locking you in while they grow elsewhere.' }
      ],
      principle: 'In a thin market, know your share of the supplier\'s capacity. It predicts your priority better than any clause does.'
    },
    {
      type: 'scenario',
      context: 'A development programme succeeded: defect rates fell and lead times improved. Six months later your orders are consistently late while a larger customer\'s are not.',
      q: 'What most likely went wrong?',
      options: [
        { text: 'The supplier reverted to old habits once the programme ended.', isCorrect: false, rationale: 'Possible, and it does not fit the pattern. The capability improved; the queue order changed, which is a different mechanism.' },
        { text: 'You funded a capability with no reserved capacity or priority right, and the improved asset was reallocated to a customer with more leverage.', isCorrect: true, rationale: 'Correct. An improvement is an asset the supplier owns and allocates. Without a stated entitlement - reserved capacity, a service commitment, a priority mechanism - the rational allocation follows revenue, and your programme made the supplier better for somebody else.' },
        { text: 'The service levels should have been tighter from the start.', isCorrect: false, rationale: 'Service levels describe what was promised; they do not create entitlement to scarce capacity when demand exceeds it. The gap is commercial structure, not measurement.' },
        { text: 'A second source should have been qualified during the programme.', isCorrect: false, rationale: 'Often a good idea and a separate decision. It does not explain this failure, which happened at the allocation of capacity you had already paid to create.' }
      ],
      principle: 'Capability you fund becomes capacity the supplier allocates. Reserve your share in the charter or expect it to go to the biggest customer.'
    }
  ],

  relSop: 'sop-supplier-performance-management',
  rel: {
    concepts: ['supplier-development', 'supplier-performance', 'supplier-qualification', 'should-cost', 'specification', 'total-cost-of-ownership'],
    sops: ['sop-supplier-performance-management', 'sop-supplier-evaluation', 'sop-supplier-price-increase-review'],
    checklists: ['cl-supplier-performance-review', 'cl-supplier-due-diligence', 'cl-supplier-risk-review'],
    templates: ['tpl-supplier-scorecard', 'tpl-supplier-business-review', 'tpl-business-case'],
    calcs: ['calc-should-cost', 'calc-supplier-scorecard', 'calc-savings-analysis'],
    decisions: ['dual-source', 'make-or-buy', 're-source', 'supplier-financial-risk'],
    kpis: ['kpi-defect-rate', 'kpi-otif', 'kpi-roi'],
    glossary: ['gloss-sole-source', 'gloss-should-cost', 'gloss-tco']
  },
  labMission: {
    title: 'Mission 17.1: Write the Constraint Before the Programme',
    desc: 'Take one supplier you describe as irreplaceable and prove or disprove it, then decide whether the answer is development, design change or a second source.',
    tasks: [
      'Document the real constraint on one critical item: qualification lead time, tooling, process rarity, certification - and cost the alternative honestly.',
      'Re-read one tolerance or requirement you have never validated and ask what breaks if it is relaxed.',
      'Draft the return you would ask for if you funded an improvement, and check whether anything like it exists in your current agreements.'
    ],
    ctaLabel: 'Open Should-Cost Tool',
    ctaHref: '#/calc/calc-should-cost',
    secondaryLabel: 'Open Supplier Business Review',
    secondaryHref: '#/tpl/tpl-supplier-business-review'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-quality-and-audit',
  title: 'Conformity, Inspection and the Supplier Audit That Finds Something',
  module: 'Module 17: Global Sourcing Operations - Development, Quality and Continuity',
  kicker: 'Function 17.2',
  tier: 'practitioner',
  tagline: 'Proving that what arrived is what was specified, and using an audit to test a process rather than to confirm a certificate.',
  desc: 'Conformity evidence is the difference between a delivered item and a usable one, and most organisations buy the certificate and skip the evidence. This function covers the inspection and verification model - source, in-process, receiving, skip-lot and third-party - how to choose between them on cost and consequence, and how to run a supplier audit that examines process rather than paperwork.',
  duration: '22 mins',
  lifecycleStage: 'Stage 11: Supplier Evaluation & Scoring',
  lifecycleDesc: 'Runs at evaluation for capability and through delivery for conformity, and is the control that makes a specification enforceable rather than aspirational.',

  what: 'Conformity is a claim, and the question is always who is evidencing it and how. There are five places to look, and they differ in cost, speed and what they can actually catch. Source inspection at the supplier\'s works before despatch catches defects while the item is still fixable and the freight has not been paid; it is the right place for high-consequence, long-lead goods and wrong for cheap consumables. In-process verification looks at the manufacturing step rather than the finished article, and is the only method that prevents a batch rather than sorting it - which is why it belongs in supplier development conversations and in agreements where the process is genuinely controlled by the supplier. Receiving inspection at your own gate is the default, is the most expensive place to find a problem, and is where most organisations put all their effort because it is the only place they own. Skip-lot and sampling regimes reduce that cost using a defect history, and the discipline is in the rule: which conditions cause a supplier to be promoted to sampling and which demote them back to full inspection, decided in advance and applied automatically rather than by negotiation with whoever is chasing the delivery. Third-party verification buys independence and specialist capability - useful where you cannot test the item yourself, where the standard requires an accredited body, or where the supplier\'s own data is not credible. Each method needs a written plan naming the characteristic, the method, the sample, the acceptance number and the disposition route when it fails, and the plan has to be agreed with the supplier before the first order rather than argued after the first rejection, because a rejection with no agreed rule becomes a commercial dispute about a quality fact. Sampling deserves an honest sentence: a sampling plan accepts some proportion of defective goods by design. The right question is not "how do we catch everything" but "what defect level are we prepared to accept, at what inspection cost", and the answer differs between a safety characteristic and a cosmetic one. Audits are the same discipline applied to process instead of product, and most supplier audits fail in a predictable way: they are announced, they follow a checklist, they read the procedure documents, they find the certificate is in date, and they conclude compliance. A useful audit is built differently. Announce the visit and do not announce the scope; sample backwards from a defect, a complaint or a delivery rather than forwards from a procedure; watch one job end to end and see whether the documented control is used when nobody is helping; ask the operator rather than the quality manager, because the operator is the one who knows where the process diverges; and test the records for the specific lot you inspected rather than for a folder of examples. The finding you are looking for is not a missing signature - it is the gap between what the procedure says, what the paperwork shows, and what the person on the machine actually does. Finally, connect the conformity model to the money. Inspection cost is a real line that sits in nobody\'s category budget, and a supplier who is allowed to shift it onto the buyer has had a price increase without a negotiation. The correct structure is a stated expectation - source verification, first-article approval, a defect rate ceiling, a recall or containment obligation, and who pays when the evidence is missing - written into the agreement so that quality cost stays visible where it is created.',
  why: [
    'Where a defect is found changes its cost by orders of magnitude: contained at source, sorted at the gate, recalled from a customer, or discovered in service.',
    'A certificate proves a system existed at an audit date. It says nothing about the lot in front of you, which is why process evidence and product evidence are different controls.',
    'Sampling plans accept defects by design. Choosing the acceptance level is a business decision that procurement should not make alone and should not leave implicit.',
    'Inspection effort that is not priced is a cost transfer from the supplier to the buyer, and it looks like a quality decision rather than a price one.',
    'An audit that reads documents tests the documents. The finding lives in the gap between the procedure, the record and what the operator does when nobody is helping.'
  ],
  when: [
    'At qualification, to establish capability before volume is committed - first-article approval is the cheapest point to find a process gap.',
    'When a defect class appears in service or at the customer, which is the signal the current inspection point is the wrong one.',
    'When a supplier\'s defect history changes, promoting or demoting them through the sampling tiers by the rule rather than by discussion.',
    'Before any audit, with a scope chosen from a specific finding rather than a generic checklist.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Sets the conformity model against consequence and cost, and prices inspection effort into the commercial comparison.' },
    { role: 'Quality Function', resp: 'Writes and owns the inspection plan, the sampling rules, the disposition route and the audit programme.' },
    { role: 'Supplier Quality Contact', resp: 'Provides the process evidence, the control records for the specific lot, and the containment plan on a failure.' },
    { role: 'Operations / Receiving', resp: 'Executes receiving inspection, reports the escapes, and holds the stop point when a characteristic fails.' }
  ],
  inputs: [
    'The characteristic list with consequence: safety or regulatory, functional, cosmetic - each with its defect level the business will accept.',
    'The supplier\'s defect history by characteristic, and the lead time and cost of the goods being inspected.',
    'The inspection plan: method, sample size, acceptance number, disposition route and who pays at each outcome.',
    'For an audit: a specific trigger - a complaint, an escape, a process change - and the records for the lot in question.'
  ],
  outputs: [
    'Conformity plan per category: where verification happens, why, and what it costs against the alternative.',
    'First-article and change-control approvals, including the rule that a process change requires re-approval.',
    'Sampling tier register with promotion and demotion criteria applied by rule, and the escapes recorded.',
    'Audit report with the process gap described, the evidence sampled, the finding graded, and a corrective action with a verification window.'
  ],
  controls: [
    'No category runs without a written conformity plan naming the inspection point and the acceptance rule.',
    'Sampling tier changes are automatic against the stated criteria, and a manual override is recorded with a reason and an approver.',
    'A supplier process or material change without prior re-approval is a contractual breach, not a notification.',
    'Audit findings are graded by consequence and each carries a verification window that includes the conditions tested.'
  ],
  bestPractices: [
    'Price inspection into the comparison. Two quotes where one requires double the receiving effort are not the same price.',
    'Sample backwards. Start an audit from a defect you have already seen rather than from the clause list, and follow it into the process.',
    'Talk to the operator. The gap between the documented control and the real one is visible only to the person who lives in it.',
    'Keep the escape log. The record of defects that got past inspection is the evidence for where the inspection point should move.'
  ],
  mistakes: [
    'Buying the certificate instead of the capability, and treating an accredited supplier as an inspected one.',
    'Putting all verification at receiving because that is where the buyer has authority, which is also the most expensive place to find anything.',
    'Letting a delivery deadline decide whether the rule applies, which teaches the supplier that the rule is negotiable.',
    'Auditing annually with the same checklist regardless of performance, so the audit calendar measures your process rather than theirs.'
  ],
  terms: [
    { term: 'First-article inspection', def: 'Full verification of the first production item from a new process or tooling, used to prove capability before volume is committed.' },
    { term: 'Skip-lot sampling', def: 'Reduced inspection for a supplier with a clean defect history, promoted and demoted by a stated rule rather than by discussion.' },
    { term: 'Escape', def: 'A defect that passed the inspection point, and the primary evidence that the inspection point is in the wrong place.' },
    { term: 'Process change control', def: 'The obligation to obtain buyer re-approval before a supplier changes material, process, tooling or manufacturing location.' }
  ],

  thinkingPoints: [
    {
      quote: 'The certificate was valid. The batch was not.',
      explanation: 'A supplier held a current accredited certification and passed the annual desk audit. A receiving inspection found a dimensional drift across a batch, and the process audit that followed showed the gauge used for in-process checks had been out of calibration for five months - a finding invisible in a document review, because the calibration register they showed the auditor listed the gauge as current.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: document evidence proves intent. Only a physical check of the specific instrument, on the specific lot, proves the control was operating.',
      reflectionPrompt: 'Which of your approved suppliers have been verified by paperwork rather than by something you measured yourself?'
    },
    {
      quote: 'We moved the inspection backwards and the cost fell twice.',
      explanation: 'A component category carried heavy receiving inspection because two escapes had reached customers. The plan was rebuilt with source verification on the two characteristics that had actually escaped, and receiving reduced to a check of the supplier\'s own record for the others. Receiving hours fell, escapes fell, and the supplier\'s behaviour changed because the check was now where the defect was created.',
      realWorldExample: 'Illustrative example: verification placed by consequence and evidence moves cost to where it prevents loss, while verification placed by convenience moves cost to where it records loss.',
      reflectionPrompt: 'Which characteristic would you inspect at source rather than at the gate, and what stops you now?'
    }
  ],

  sopSteps: [
    { title: 'Classify characteristics by consequence', role: 'Quality Function',
      desc: 'Separate safety and regulatory characteristics from functional ones and cosmetic ones, and state the defect level the business will accept for each. This is the decision that makes every later choice about inspection cost rational rather than reactive, and it belongs to the business rather than to procurement or quality alone.',
      control: 'Every specified characteristic has a consequence class and an accepted defect level agreed with the owner of the outcome.',
      record: 'Characteristic list with class, accepted level and the named business approver.',
      pitfall: 'Treating all specification items as equally important, which produces either universal full inspection or a rule nobody follows.' },
    { title: 'Choose the inspection point by cost of discovery', role: 'Category Manager',
      desc: 'Decide where verification happens for each class: at source for long-lead high-consequence goods, in-process where a batch can be prevented rather than sorted, at receiving where the item is cheap and the lead time short, and by third party where you cannot test it yourself. Write the reason, because the next commercial review will otherwise move it to the cheapest place rather than the right one.',
      control: 'The conformity plan names the inspection point per class with the reason and the cost of each option.',
      record: 'Conformity plan with the inspection point, method and rationale per characteristic class.',
      pitfall: 'Defaulting everything to receiving because that is where the buyer has authority, and paying for it in freight, downtime and re-work.' },
    { title: 'Write the plan before the first order', role: 'Quality Function',
      desc: 'Specify method, sample size, acceptance number, disposition route and who pays at each outcome, and get the supplier to sign it. A rejection rule agreed after the first rejected batch is a negotiation conducted under commercial pressure, and it will be settled by whoever needs the delivery less.',
      control: 'No volume is released before the inspection plan is agreed, including the disposition and cost rules.',
      record: 'Signed inspection plan with the disposition matrix.',
      pitfall: 'Leaving disposition to be decided per incident, so every rejection becomes an argument about the schedule instead of a rule about the product.' },
    { title: 'Set the sampling tiers as a rule, not a judgement', role: 'Quality Function',
      desc: 'Define what promotes a supplier to reduced inspection and what demotes them back, in terms of defect history and escapes over a stated period, and apply it automatically. Where a deadline tempts an override, the override is recorded with a reason and an approver - which keeps the exception visible instead of letting it become the practice.',
      control: 'Tier changes follow the stated rule; overrides are logged, counted and reported to the policy owner.',
      record: 'Tier register with the history behind each promotion and demotion.',
      pitfall: 'Freezing a promotion because the current delivery is urgent, which removes the only consequence attached to the quality history.' },
    { title: 'Approve the first article and control change', role: 'Supplier Quality Contact',
      desc: 'Verify the first production item from new tooling, material, process or location before volume ships, and require prior re-approval for any of those changes. Unannounced process change is the most common route by which an approved supplier produces something that was never approved.',
      control: 'A change without re-approval is treated as a contractual breach, and the plan states the containment obligation.',
      record: 'First-article approval and the change-control register with re-approval evidence.',
      pitfall: 'Accepting a notification after the change has shipped, which converts a control into correspondence.' },
    { title: 'Audit the process, from a finding backwards', role: 'Quality Function',
      desc: 'Announce the visit but not the scope. Start from a specific escape, complaint or change, follow that job through the process, observe the control being used without assistance, question the operator rather than the manager, and pull the records for the lot you inspected rather than a prepared folder.',
      control: 'Each audit has a stated trigger and evidence sampled from a specific lot, not a generic checklist completion.',
      record: 'Audit report describing the gap between procedure, record and practice, with findings graded by consequence.',
      pitfall: 'Running the audit as a document review, which reliably confirms that the supplier can produce paperwork.' },
    { title: 'Close findings on verified process change', role: 'Supplier Quality Contact',
      desc: 'Require a corrective action with a cause, a process change and verification over a window that includes the conditions that produced the defect. Track the escape log alongside it: a falling escape rate is the measure that matters, not a closed finding count.',
      control: 'Findings cannot close on a promise or on one clean period; the verification window is set by the failure mode.',
      record: 'Corrective action records with verification evidence and the escape trend.',
      pitfall: 'Reporting closure rate as the quality metric, which rewards closing findings quickly rather than removing causes.' }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A supplier is ISO certified, passes the annual desk audit, and delivers to a specification you have never independently verified.',
      q: 'What do you actually know about the last shipment?',
      options: [
        { text: 'It conforms, because the certification body audits their quality system annually.', isCorrect: false, rationale: 'This is the substitution that makes certificates dangerous. A certification audits a system at a point in time, in a scope that may not include your part, and it does not measure your characteristic.' },
        { text: 'Nothing about the goods themselves - only that a management system was found in place at some date. Conformity needs evidence tied to the lot.', isCorrect: true, rationale: 'Correct. System evidence and product evidence are different controls, and one cannot be traded for the other. The question to answer is what evidence exists for this batch, from which inspection point.' },
        { text: 'It conforms unless the receiving inspection says otherwise.', isCorrect: false, rationale: 'That is a statement about your detection rate, not about conformity, and receiving inspection was designed for a different defect population.' },
        { text: 'Nothing, so a full inspection should be introduced immediately.', isCorrect: false, rationale: 'The conclusion is right and the action is wrong. Full inspection at the gate is the most expensive place to find a defect; the answer is to choose the inspection point by consequence.' }
      ],
      principle: 'A certificate proves a system existed on an audit date. It is not evidence about the goods in front of you.'
    },
    {
      type: 'scenario',
      context: 'Two quotes for the same part: A is 6 percent cheaper but has twice your defect history; B is clean. Your receiving inspection costs USD 40 per lot and takes two days.',
      q: 'What is the correct comparison?',
      options: [
        { text: 'A is cheaper; manage the quality with tighter receiving inspection.', isCorrect: false, rationale: 'This moves the cost to your side and calls it a saving. Tighter receiving inspection is buyer effort, buyer delay and buyer risk of an escape, and none of it appears in the price comparison.' },
        { text: 'Price the inspection, the re-work, the delay and the escape risk into the comparison, and decide whether the 6 percent survives.', isCorrect: true, rationale: 'Correct. The defect history is a cost with a value, and the only honest comparison is landed and inspected cost. Often the cheaper quote survives; sometimes it does not, and the decision should be made with that number visible.' },
        { text: 'Choose B, because quality problems are always more expensive.', isCorrect: false, rationale: 'A rule of thumb that will occasionally cost real money. If A\'s total after inspection is still cheaper, refusing it is a preference rather than a decision.' },
        { text: 'Ask A to accept a service credit regime for defects.', isCorrect: false, rationale: 'A useful mitigation and not a comparison. Credits compensate after the disruption; they do not make the 6 percent real or the delay free.' }
      ],
      calcWork: 'USD 40 per lot plus two days plus re-work plus the expected cost of an escape, set against the value of the 6 percent. The comparison is only meaningful once the inspection cost is on the same page as the price.',
      principle: 'Inspection effort is a price. A supplier who shifts it onto you has raised their price without a negotiation.'
    },
    {
      type: 'scenario',
      context: 'A critical delivery is due Friday. The supplier\'s lot fails the agreed acceptance number. Operations ask for a concession.',
      q: 'What is the correct handling?',
      options: [
        { text: 'Grant the concession; the rule was written before the deadline existed.', isCorrect: false, rationale: 'The concession may be the right commercial answer and it is never a free one. Granting it silently teaches the supplier that the acceptance number is advisory and removes the evidence trail for whatever happens next.' },
        { text: 'Grant it only as a named, recorded, time-limited deviation with a technical disposition, containment and a fee or credit attached, approved above the requester.', isCorrect: true, rationale: 'Correct. A documented deviation preserves the rule while allowing the business to choose its exposure. It also creates the population of concessions you need to see, because a category with twenty undocumented ones is a category with no inspection regime.' },
        { text: 'Refuse, because the rule is the rule.', isCorrect: false, rationale: 'Rigid and sometimes wrong. The business may legitimately prefer the risk of accepting a marginal lot to stopping a line, and that is a decision someone senior should take knowingly.' },
        { text: 'Re-inspect until it passes, then accept.', isCorrect: false, rationale: 'This is the mechanism by which inspection systems lose all value. Selecting a passing sample from a failing lot is not verification, and it will be found the first time someone looks.' }
      ],
      principle: 'Concessions are legitimate when they are named, approved above the requester and counted. The failure mode is not granting one - it is granting one quietly.'
    },
    {
      type: 'scenario',
      context: 'Your last six supplier audits produced findings about missing signatures and an out-of-date procedure document.',
      q: 'What does that tell you?',
      options: [
        { text: 'The suppliers have good documentation discipline.', isCorrect: false, rationale: 'It tells you the audit is measuring paperwork. Findings about signatures are findings about the cheapest thing to fix and the least likely cause of a defect.' },
        { text: 'The audits are being run forwards from the checklist rather than backwards from a defect, so they are testing paperwork rather than process.', isCorrect: true, rationale: 'Correct. Process findings come from following a real job, watching the control used unaided, asking the operator, and pulling records for the specific lot. An audit that reliably finds clerical issues is reliably not looking at the process.' },
        { text: 'Audits should be discontinued.', isCorrect: false, rationale: 'The evidence says the design is wrong, not that the control is unnecessary. Discontinuing removes the only on-site view you have.' },
        { text: 'The auditors need more training on the standard.', isCorrect: false, rationale: 'Possible, and it is not the main cause. A well-trained auditor following a checklist still finds paperwork; the trigger and the scope are what change the outcome.' }
      ],
      principle: 'An audit that always finds clerical errors is auditing the documents. Start from a defect and follow it into the process.'
    },
    {
      type: 'scenario',
      context: 'A supplier quietly changes the resin supplier for a moulded part. Performance is identical and the part still meets the drawing.',
      q: 'What is the correct position?',
      options: [
        { text: 'No action, since the part conforms.', isCorrect: false, rationale: 'This treats conformity as the only contract term. The change alters an input you never approved, may affect ageing, regulatory status or traceability, and it removes your ability to reason about a future failure.' },
        { text: 'Treat it as a breach of change control, require re-approval evidence, and check whether any other input has moved without notice.', isCorrect: true, rationale: 'Correct. Change control exists because conformity today does not prove conformity in three years, and because an unapproved input change makes a future defect untraceable. The response is proportionate - re-approval, not punishment - but it is not nothing.' },
        { text: 'Accept it and update the specification to match.', isCorrect: false, rationale: 'Only after the technical review has been done. Retro-approving a change the supplier made unilaterally converts a control into a filing exercise.' },
        { text: 'Issue a penalty and put the supplier on a corrective action plan.', isCorrect: false, rationale: 'Over-escalated for a change with no demonstrated harm, and it will be resented as such. The finding is the process breach; the response is re-approval and a check for a pattern.' }
      ],
      principle: 'Change control protects your ability to explain a future failure, not just to approve today\'s part. An unapproved input change is a breach even when the part is fine.'
    }
  ],

  relSop: 'sop-supplier-evaluation',
  rel: {
    concepts: ['supplier-qualification', 'evaluation-criteria', 'specification', 'supplier-performance', 'audit-trail', 'total-cost-of-ownership'],
    sops: ['sop-supplier-evaluation', 'sop-procurement-audit', 'sop-supplier-performance-management'],
    checklists: ['cl-supplier-due-diligence', 'cl-technical-evaluation', 'cl-procurement-audit', 'cl-supplier-performance-review'],
    templates: ['tpl-technical-evaluation', 'tpl-supplier-scorecard', 'tpl-supplier-due-diligence'],
    calcs: ['calc-supplier-scorecard', 'calc-tco', 'calc-compare-quotes'],
    decisions: ['competitive-or-single', 're-source', 'unit-or-tco'],
    kpis: ['kpi-defect-rate', 'kpi-otif', 'kpi-contract-compliance'],
    glossary: ['gloss-sla', 'gloss-tco', 'gloss-ppv']
  },
  labMission: {
    title: 'Mission 17.2: Move One Inspection Point Backwards',
    desc: 'Take a category where all verification happens at your gate, price the effort, and design a conformity plan that puts the check where the defect is created.',
    tasks: [
      'List the characteristics you inspect and classify each by consequence, then state the defect level the business actually accepts.',
      'Price your receiving inspection per lot and add it to the last two quotes you compared.',
      'Pick one high-consequence characteristic and write the source-verification rule that would replace the gate check.'
    ],
    ctaLabel: 'Open Technical Evaluation Template',
    ctaHref: '#/tpl/tpl-technical-evaluation',
    secondaryLabel: 'Open TCO Calculator',
    secondaryHref: '#/calc/calc-tco'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-dual-source-resilience',
  title: 'Dual Sourcing, Nearshoring and Inventory as Protection',
  module: 'Module 17: Global Sourcing Operations - Development, Quality and Continuity',
  kicker: 'Function 17.3',
  tier: 'executive',
  tagline: 'Buying protection deliberately: what a second source, a shorter supply line or a buffer of stock actually costs, and what it is worth.',
  desc: 'Resilience is a portfolio decision, not a policy. This function covers how to decide which lines deserve protection at all, the real cost and failure modes of dual sourcing, nearshoring and safety stock as alternatives to each other, and how to present the choice to an executive that is being asked to spend money on something that will not happen.',
  duration: '26 mins',
  lifecycleStage: 'Stage 12: Supplier Risk & Due Diligence',
  lifecycleDesc: 'Sits at portfolio and category strategy level: the decision is made against consequence and probability, not against a supplier\'s audit score.',

  what: 'The first discipline is admitting that protection is not free and not universal. Every line cannot be dual-sourced, held in buffer, or brought closer, so the decision is a portfolio one: which few lines, if they stopped, would cost more than a year of the protection applied to all of them. That calculation needs a consequence measured in the currency the business loses - days of plant downtime, a contractual penalty, a regulatory stop, a recall - and a probability that is honest rather than comfortable. Most organisations get both numbers wrong: consequence is understated because the last disruption was survivable, and probability is overstated for the risks that are vivid and understated for the ones that are quiet. Dual sourcing is the strongest protection and the most fragile in practice. Splitting volume halves the unit price leverage on both sides, doubles the qualification and quality overhead, and creates a real incentive problem: a supplier holding thirty percent of a line they expected to keep entirely will invest differently in it, and the second source you qualified as insurance may quietly become the one that leaves first. The arrangements that survive contact with reality share three features - the split is explicit and stable, the second source has a genuine volume floor rather than zero, and the qualification is refreshed rather than left to expire. Nearshoring trades money for time and for fewer dependencies: a shorter line means less transit, fewer borders, less exposure to a single maritime chokepoint, and usually a higher unit price and a thinner local market. It is the right answer where lead time variability is the actual problem, and the wrong one where the risk being managed is a specific factory. The most common failure is nearshoring a supplier who then sources from the same origin, which moves the exposure rather than reducing it - so the test is always the tier-two map, not the postcode of the tier-one. Inventory is the cheapest protection to implement and the most expensive to hold honestly. It works for short-shock, high-volume, stable-demand items and fails for long-lead, engineered, perishable or specification-unstable goods, where the buffer is either too small to matter or obsolete before it is used. Its real cost is capital, space, insurance, shrinkage and obsolescence, and the honest number is usually three to four times what the initial business case carried. The executive conversation has a specific shape. You are asking to spend money on an event that has not happened, against a comparison the reader can check: the annual cost of the protection versus the expected loss it prevents. That means stating the consequence in a number the business owns, the probability with its basis, the alternatives priced against each other rather than presented as a menu, and the decision recorded either way - including the decision not to protect, which is a legitimate and often correct answer that most organisations take silently. A resilience register where every line says "mitigated" is not a risk register; it is a document that avoids an argument. And the part that is almost always omitted: the response plan. A second source that needs nine months to qualify is not protection unless someone has written the nine-month plan, named the person who triggers it, and tested it once. Protection is a capability, and capabilities degrade quietly.',
  why: [
    'Protection applied everywhere is protection applied nowhere. The portfolio question - which few lines justify the cost - is the whole decision.',
    'A second source with zero volume is a document, not a capability: it degrades, its qualification expires, and the supplier loses the incentive to maintain it.',
    'Nearshoring that leaves the tier-two dependency in the same origin moves the exposure rather than reducing it, and looks like mitigation on a map.',
    'Inventory is protection against short shocks only. Against a long-lead engineered item it is a large cost that arrives too late to help.',
    'The decision not to protect is legitimate and should be recorded as one, because an unrecorded acceptance becomes an unexplained failure after the event.'
  ],
  when: [
    'At category strategy, when the portfolio is segmented by consequence and substitutability rather than by spend.',
    'After any disruption, when the real recovery time and the real consequence are finally known.',
    'When a single-source line\'s qualification, tooling or location becomes materially concentrated with one counterparty or one geography.',
    'On a stated cadence, by testing the response plan rather than re-reading the register.'
  ],

  raci: [
    { role: 'Head of Procurement', resp: 'Runs the portfolio decision, prices the protection options against expected loss, and records the decision not to protect.' },
    { role: 'Operations / Supply Chain', resp: 'Owns the consequence estimate, the inventory policy and the response plan execution.' },
    { role: 'Category Manager', resp: 'Qualifies and maintains the second source, sets the volume floor, and keeps the qualification live.' },
    { role: 'Finance', resp: 'Values the capital and holding cost of inventory and the annual cost of maintaining standby capacity.' }
  ],
  inputs: [
    'A consequence estimate per critical line: what stops, for how long, at what cost, in the currency the business loses.',
    'The tier-two dependency map for each critical line: origin, single sites, shared tooling, shared logistics routes.',
    'Priced options: dual-source split with its volume floor and overhead, nearshore alternative with its unit cost, buffer with its true holding cost.',
    'The response plan as it stands today, with the trigger, the decision-maker and the elapsed time to recovery.'
  ],
  outputs: [
    'Resilience register: critical lines with consequence, probability, chosen protection, the decision owner and the date of the last test.',
    'Dual-source agreement with an explicit volume floor, a stable split, and a qualification refresh obligation.',
    'Inventory policy stating which lines carry buffer, at what cover, and the obsolescence review that retires it.',
    'A tested response plan with the elapsed time measured in the exercise rather than estimated in the document.'
  ],
  controls: [
    'Protection decisions are made against a stated consequence and probability with a named basis, and the choice not to protect is recorded.',
    'A second source must carry a minimum volume and a refresh cadence, or it is classified as unproven rather than as mitigation.',
    'Tier-two dependencies are mapped for every critical line, and nearshoring is assessed against the origin rather than the supplier\'s address.',
    'The response plan is exercised on a stated cadence and the measured recovery time replaces the assumed one.'
  ],
  bestPractices: [
    'Price protection in the same currency as the loss. A holding cost against a production stoppage is a comparison an executive can decide.',
    'Give the second source real work. A floor of ten to fifteen percent keeps the qualification, the tooling and the attention alive at modest cost.',
    'Test the plan, do not read it. The gap between an assumed recovery time and a measured one is usually the entire business case.',
    'Record the accepted risks visibly. A register that shows decisions not to protect is more credible, and more useful after an event, than one where everything is mitigated.'
  ],
  mistakes: [
    'Dual-sourcing for procurement\'s comfort rather than the business\'s exposure, and paying twice the overhead to protect a line that could be re-planned in a week.',
    'Treating a nearshore supplier\'s address as evidence, without checking where their inputs come from.',
    'Setting safety stock once, during the disruption, and never retiring it when the pressure passes.',
    'Leaving a standby source unqualified for three years and discovering the tooling, the approval and the staff who knew it are all gone.'
  ],
  terms: [
    { term: 'Volume floor', def: 'The minimum share of demand deliberately given to a second source so that its qualification, tooling and capability remain live.' },
    { term: 'Tier-two dependency', def: 'A supplier\'s own source, whose concentration or geography can carry the risk the nearshore or dual arrangement was meant to remove.' },
    { term: 'Cover', def: 'The period of demand a buffer of inventory represents, used to compare holding cost against expected outage length.' },
    { term: 'Response plan', def: 'The named trigger, decision-maker, sequence and measured elapsed time by which a disruption is actually recovered from.' }
  ],

  thinkingPoints: [
    {
      quote: 'We had two approved sources and one that worked.',
      explanation: 'After a disruption a category team reported dual coverage across its critical lines. When the event came, the second source had held no volume for two years: the tooling had been repurposed, the process approval had lapsed, and the engineers who had run the qualification had left. Recovery through the approved alternate took longer than recovery through the primary would have, and the register that had shown the line as mitigated was the reason nobody had planned for it.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a qualification is a perishable capability. An alternate source is only protection if something is deliberately spending money to keep it alive.',
      reflectionPrompt: 'When did you last place real volume through your designated second sources, and would they pass requalification today?'
    },
    {
      quote: 'The nearshore move cut transit and kept the risk.',
      explanation: 'A component was moved from an overseas manufacturer to a domestic one, and the supply line shortened by several weeks. The tier-two map, produced later during an unrelated audit, showed both manufacturers buying the same sub-assembly from the same two suppliers in the same region. The change reduced freight time and cost exposure to a shipping disruption, and did nothing about the dependency the business case had been written to address.',
      realWorldExample: 'Illustrative example: geography is a proxy for risk only when the inputs are also local. Otherwise it changes which disruption you are exposed to, not whether you are exposed.',
      reflectionPrompt: 'For your most recent sourcing move justified by resilience, what did the tier-two map actually show?'
    }
  ],

  sopSteps: [
    { title: 'Estimate consequence in the currency the business loses', role: 'Operations / Supply Chain',
      desc: 'For each candidate line, state what stops, for how long, and at what cost - downtime, penalty, regulatory stop, recall, lost sale. Use the last real event where it exists and a documented estimate where it does not, and have the number owned by the function that would carry the loss rather than by procurement.',
      control: 'No resilience case proceeds on an unowned consequence estimate, and the basis is stated.',
      record: 'Consequence sheet per critical line with the owner and the basis.',
      pitfall: 'Using spend as a proxy for consequence, which puts a cheap single-source component that stops a plant at the bottom of the list.' },
    { title: 'Map the tier-two dependencies', role: 'Category Manager',
      desc: 'Identify where each critical line\'s inputs actually originate: single sites, shared tooling, shared logistics routes, shared sub-suppliers, shared test capacity. Concentration that sits one level down is invisible on an org chart and obvious on a map, and it is where most resilience programmes find their real exposure.',
      control: 'Every critical line has a tier-two map, and it is refreshed when a supplier changes source or location.',
      record: 'Dependency map naming origins, shared sites and shared routes.',
      pitfall: 'Mapping the supplier but not their supplier, then reporting a nearshore move as a risk reduction.' },
    { title: 'Price the three protection options against each other', role: 'Finance',
      desc: 'Cost a dual-source split including the qualification, quality and overhead of running two, a nearshore alternative at its real unit price, and a buffer at full holding cost - capital, space, insurance, shrinkage and obsolescence. Present them as competing answers to the same exposure rather than as a menu, with the expected loss stated alongside.',
      control: 'The comparison is in one currency, with the holding cost of inventory computed rather than assumed.',
      record: 'Option comparison with annual protection cost against expected loss prevented.',
      pitfall: 'Omitting the overhead of maintaining two sources, which is usually the largest component and the one nobody budgets.' },
    { title: 'Decide, and record the risks you choose not to cover', role: 'Head of Procurement',
      desc: 'Take the portfolio decision line by line and write down the accepted exposures with the name of the person accepting them and the date. A register that shows only mitigations is a document that avoided an argument, and it will be read after an event as evidence that nobody ever looked at the risk.',
      control: 'Each critical line has either a protection decision or a named acceptance, with a review date.',
      record: 'Resilience register with decisions, acceptances, owners and review dates.',
      pitfall: 'Defaulting to mitigation everywhere because refusing is uncomfortable, which spends the protection budget on the least exposed lines.' },
    { title: 'Give the second source a volume floor and a refresh', role: 'Category Manager',
      desc: 'Place real, stable volume with the alternate - enough to keep tooling, process approval, staff knowledge and attention alive - and set a requalification cadence with a named owner. Zero-volume alternates degrade silently and are discovered as unavailable at exactly the moment they are needed.',
      control: 'A source is classified as mitigation only where it carries volume or has been exercised within the stated window.',
      record: 'Alternate-source agreement with the floor, the refresh dates and the last exercise.',
      pitfall: 'Announcing dual coverage in a report while the second line holds nothing but an approval certificate.' },
    { title: 'Set inventory cover as a policy with an exit', role: 'Operations / Supply Chain',
      desc: 'Define which lines carry buffer, at what cover against what outage, and the review that retires it when the pressure passes. Buffers set during a crisis are almost never reduced afterwards, and the obsolescence cost arrives quietly in a different budget line.',
      control: 'Every buffer has a stated cover, a rationale and a scheduled review that can reduce it.',
      record: 'Inventory policy with cover, holding cost and the retirement review dates.',
      pitfall: 'Buffering long-lead engineered items, where the stock is either too small to matter or obsolete before it is used.' },
    { title: 'Exercise the response plan and publish the measured time', role: 'Head of Procurement',
      desc: 'Run the plan on a stated cadence: trigger it, call the alternate, walk the qualification and approval steps, and record the elapsed time it actually took. Replace the assumed recovery figure with the measured one, and let that number drive the next portfolio decision.',
      control: 'Each critical line has an exercised date, and the recovery figure used in the business case is the measured one.',
      record: 'Exercise report with the elapsed time, the blockers found and the plan changes made.',
      pitfall: 'Reviewing the plan document instead of running it, which confirms the wording and not the capability.' }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A cheap single-source component stops a plant line for six days if it is unavailable. Annual spend is small; the line is not in your resilience scope because it is low value.',
      q: 'What is the correct treatment?',
      options: [
        { text: 'Keep it out of scope: resilience covers material spend.', isCorrect: false, rationale: 'This is the exact error the scope rule creates. Spend measures what you pay, not what you lose, and a cheap part that stops production is the highest-consequence item in the portfolio.' },
        { text: 'Bring it into scope on consequence, and price protection against the six-day loss.', isCorrect: true, rationale: 'Correct. Segmentation for resilience runs on consequence and substitutability. Once the loss is quantified, the decision - dual source, buffer, or a named acceptance - becomes straightforward and defensible.' },
        { text: 'Dual-source it immediately to close the gap.', isCorrect: false, rationale: 'Possibly right, and it should follow the comparison. Qualification cost, overhead and the volume floor are real, and for a six-day exposure a buffer may dominate.' },
        { text: 'Ask the supplier to hold consignment stock.', isCorrect: false, rationale: 'A good option and not an analysis. It also assumes the supplier can and will hold it, and that a single source of the component is not the actual problem.' }
      ],
      calcWork: 'Consequence, not spend, sets scope: six days of line stoppage is almost certainly a larger number than the annual value of the component, which is why the spend-based screen missed it.',
      principle: 'Resilience scope is set by consequence and substitutability. Spend is how you budget, not how you rank exposure.'
    },
    {
      type: 'scenario',
      context: 'Your register shows twelve critical lines with approved alternate sources. None has held volume in two years.',
      q: 'What is the accurate statement of your position?',
      options: [
        { text: 'Twelve lines are dual-sourced.', isCorrect: false, rationale: 'They are documented. An alternate that has run nothing for two years has expired tooling, expired approvals and no trained operators, and you will learn that during the event.' },
        { text: 'Zero lines are currently dual-sourced; twelve have a paper alternate whose real recovery time is unknown.', isCorrect: true, rationale: 'Correct. Capability requires maintenance. The honest register records the last exercise date, and where there is none the line should read as single-source with an unproven alternate.' },
        { text: 'Requalify all twelve at the start of next year.', isCorrect: false, rationale: 'A reasonable plan, and it leaves twelve months of unproven cover. The cheaper first step is to exercise one and find out what the recovery actually costs.' },
        { text: 'Reduce the alternate list to the lines you can afford to keep warm.', isCorrect: false, rationale: 'Often the right eventual answer, and it should be an explicit acceptance decision rather than a silent drift where the register says mitigated and nothing is maintained.' }
      ],
      principle: 'A second source with no volume is a document. Protection is a maintained capability or it is not protection.'
    },
    {
      type: 'scenario',
      context: 'A proposal moves a component from an overseas source to a domestic one at 14 percent higher unit cost, justified by supply-risk reduction.',
      q: 'What evidence would make that decision sound?',
      options: [
        { text: 'A shorter transit time and a lower carbon footprint.', isCorrect: false, rationale: 'Both real benefits, neither is the risk being managed. A shorter line does not follow from a lower dependency unless the inputs also moved.' },
        { text: 'The tier-two map for both sources, showing where the sub-assembly and raw material actually originate, plus the priced comparison against a buffer and a dual-source split.', isCorrect: true, rationale: 'Correct. The claim is about risk, so the evidence must be about dependency rather than distance - and the alternatives have to be priced, or the 14 percent is being spent without a comparison.' },
        { text: 'A supplier questionnaire confirming they have a business continuity plan.', isCorrect: false, rationale: 'A document from the party being assessed. It is a starting point for the audit, not evidence that the exposure changed.' },
        { text: 'Feedback from the operations team that local is easier to work with.', isCorrect: false, rationale: 'Genuine and worth capturing, and it is a service argument rather than a resilience one. Mixing them makes both weaker.' }
      ],
      calcWork: '14 percent of unit cost is an annual premium; the case needs the expected loss it prevents, and the same exposure priced as a buffer and as a dual-source split before the premium can be called the cheapest answer.',
      principle: 'Nearshoring reduces exposure only if the inputs move too. Otherwise you have changed which disruption you are vulnerable to.'
    },
    {
      type: 'scenario',
      context: 'During a disruption, safety stock was raised 40 percent across a category. Demand has since returned to normal and the stock has not moved.',
      q: 'What should happen?',
      options: [
        { text: 'Keep it: buffer is always protection.', isCorrect: false, rationale: 'Buffer is protection against a short shock and a cost against everything else. Holding it indefinitely buys obsolescence risk and working capital for no additional cover.' },
        { text: 'Review against current cover and outage assumptions, reduce or re-purpose, and record who owns the decision to hold it.', isCorrect: true, rationale: 'Correct. Crisis-set buffers persist because nobody owns the reduction. A stated cover, a real obsolescence risk and a named decision make the holding cost a choice rather than a habit.' },
        { text: 'Write down the excess as a one-off adjustment.', isCorrect: false, rationale: 'This is accounting for the consequence of the decision rather than making the decision, and it usually makes the stock invisible.' },
        { text: 'Ask the supplier to take it back on consignment.', isCorrect: false, rationale: 'Worth exploring for some items, and it shifts rather than answers the question. Consignment still occupies space and still expires.' }
      ],
      principle: 'Every buffer needs an owner and a retirement date. Crisis inventory is the most durable inventory there is.'
    },
    {
      type: 'scenario',
      context: 'The board asks why procurement wants budget to maintain second sources on lines that have never failed.',
      q: 'What is the strongest answer?',
      options: [
        { text: 'Supply chains are more fragile than they used to be.', isCorrect: false, rationale: 'Probably true and unfalsifiable, which makes it a slogan rather than a case. It invites the follow-up question nobody can answer.' },
        { text: 'State the consequence for the specific lines, the probability with its basis, the annual cost of protection, and the expected loss it prevents - and name the lines you recommend leaving unprotected.', isCorrect: true, rationale: 'Correct. This is a capital allocation argument and it has to be made in those terms. Naming the accepted risks is what makes the recommended spend credible, and it gives the board a decision rather than a request.' },
        { text: 'Explain that resilience is a policy requirement.', isCorrect: false, rationale: 'Policies are not business cases, and a compliance framing invites the question of who wrote the policy.' },
        { text: 'Offer to reduce the number of lines covered.', isCorrect: false, rationale: 'A concession made before the argument. If the portfolio logic is right, the number is already the result of it.' }
      ],
      principle: 'Protection is a capital allocation argument: consequence, probability, cost, expected loss - and a visible list of what you are choosing not to cover.'
    }
  ],

  relSop: 'sop-supplier-evaluation',
  rel: {
    concepts: ['supply-chain-risk', 'concentration-risk', 'business-continuity', 'supplier-financial-risk', 'category-management', 'working-capital'],
    sops: ['sop-emergency-procurement', 'sop-supplier-evaluation', 'sop-procurement-lifecycle'],
    checklists: ['cl-supplier-risk-review', 'cl-sourcing-strategy', 'cl-single-source-justification'],
    templates: ['tpl-supplier-risk-assessment', 'tpl-business-case', 'tpl-single-source'],
    calcs: ['calc-supplier-concentration', 'calc-multi-year-contract-cost', 'calc-kpi-calculator'],
    decisions: ['dual-source', 're-source', 'competitive-or-single', 'supplier-concentration'],
    kpis: ['kpi-supplier-concentration', 'kpi-otd', 'kpi-working-capital-impact'],
    glossary: ['gloss-hhi', 'gloss-sole-source', 'gloss-single-source', 'gloss-eoq']
  },
  labMission: {
    title: 'Mission 17.3: Price One Unit of Protection',
    desc: 'Take one genuinely critical line, state the loss if it stops, and compare dual sourcing, nearshoring and buffer in one currency.',
    tasks: [
      'Write the consequence for one line in the currency the business loses - days, penalty, lost sale - and name who owns that number.',
      'Map the tier-two dependencies for it and identify the single points that survive a change of supplier.',
      'Use the concentration calculator to price the three protections against each other and record the one you choose not to buy.'
    ],
    ctaLabel: 'Open Concentration Calculator',
    ctaHref: '#/calc/calc-supplier-concentration',
    secondaryLabel: 'Open Supplier Risk Assessment',
    secondaryHref: '#/tpl/tpl-supplier-risk-assessment'
  }
});
