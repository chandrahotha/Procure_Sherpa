/* ==========================================================
   Procure Sherpa v3.0 - Academy Module 25: Public and Regulated
   Tendering - Lots, Criteria, Low Bids and Challenges. Module 2
   chooses the sourcing method, Module 4 evaluates a supplier and
   Module 6 governs the contract, but none of them covers the
   mechanics that decide an award before anyone reads a bid: how
   the tender is divided, what is disclosed about the criteria, what
   an implausibly cheap answer requires, and what happens when a
   loser asks why. Three lessons and five concepts. Written with no
   apostrophes, since these strings are single quoted and the build
   reads them literally.
   ========================================================== */

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-lotting-and-call-off-architecture',
  title: 'Lotting and Call-Off Architecture: Who Is Allowed to Compete',
  module: 'Module 25: Public and Regulated Tendering - Lots, Criteria, Low Bids and Challenges',
  kicker: 'Function 25.1',
  tier: 'practitioner',
  tagline: 'Before a specification is read, the shape of the tender has already decided who can bid. That is the most powerful competition lever a buyer holds, and it is usually set by whoever last signed the contract.',
  desc: "This function covers the structure of a competed buy rather than its content: how a requirement is divided into lots and what each division costs and buys, the difference between bid-by-lot and award-by-lot and why a cap on lots won changes market behaviour, the choice between a one-off contract, a framework with call-offs, and a system that stays open to new suppliers, how mini-competition and rotation decide later orders, and the aggregate exposure a lot strategy creates when one supplier quietly wins most of the pieces.",
  duration: '21 mins',
  lifecycleStage: 'Stage 5: Sourcing Strategy Formulation',
  lifecycleDesc: 'Taken at strategy design, before the specification is frozen, because lotting is a market decision rather than a drafting one.',

  what: "Every regulated tender contains a hidden decision that is rarely written down as a decision: how many prizes there will be and how big each one is. Set that shape and you have already chosen the field of competitors, often more decisively than any qualification criterion. Start from why division exists at all. A single large package is convenient to administer and it narrows the market, because only suppliers with the capacity, the cover and the balance sheet to absorb the whole scope can price it. Six regional lots attract a different population: smaller firms, regional contractors, and incumbents that must now compete where they were uncontested. The genuine reason to divide is not fairness to small suppliers, it is that the requirement is servable in pieces and that resilience improves when the pieces fail independently. Test each lot for standalone viability. A lot that only makes sense if the same supplier takes another lot is not a lot, it is a discount dressed as competition, and it will be priced as one. Then the three rules that actually change behaviour. The first is whether a bidder may bid on all, some or one lot - published in advance, because a bidder decides where to spend its effort before it knows the answer. The second is whether lots may be awarded together, and whether the buyer may combine them if the same bidder offers value across several: a combined-award option can be worth real money and can also hand the whole requirement back to the incumbent by another route. The third is a cap on how many lots one bidder may win, which is a resilience instrument rather than a competition one, and which forces the buyer to state, in advance, how many independent failures it is willing to carry. Next, the architecture above the individual award. A one-off contract competes the requirement and is finished. A framework competes the qualification once and then decides later orders inside the list - by reopening competition, by a rotation, by automatic allocation against agreed rules, or by direct award below a threshold. A dynamic system behaves like a framework whose door stays open: new suppliers can join during its life if they meet the published terms, which is the version that keeps a thin market thin no longer. The choice is not a legal preference; it follows from how predictable and how repeated the demand is, how fast the requirement must be served, and whether the population you qualified would still be the population you want in two years. Framework economics deserve the same honesty as lot economics. A framework saves evaluation cost on the second and every later order - that is the real saving - but it also freezes the competitor set, and a framework whose call-offs are never competed becomes a subscription with a price review attached. Decide the call-off rule at design time and publish it: what value or volume triggers a mini-competition, how many are invited, what may change between call-offs, and what happens when a supplier improves service and still loses on price. Automatic rotation is defensible where the requirement is homogeneous and indefensible where quality differs, and in either case it must be stated before anyone benefits from it. Finally, aggregate exposure. A lot strategy that splits a service into six and then awards five of them to one bidder has produced administrative complexity and a single point of failure without the benefit of either. Track awarded share across lots and across the portfolio, watch the group relationships behind bidders - common ownership, shared subcontractors, one person signing for several names - and treat the pattern of awards, not the pattern of bidding, as the evidence of how competitive the structure really was. The practical output of this function is short: a lot plan with the rules published before bids arrive, a stated reason for each division, a call-off rule for anything that will be bought repeatedly, and a named review point at which the structure itself is retested rather than inherited.",
  why: [
    'Lot size and number decide the competing population before any qualification criterion is applied.',
    'Bid-by-lot, award-by-lot and the cap on lots won are behavioural levers, and all three must be published before bids arrive.',
    'A framework saves the cost of the second competition, not the first, and stops saving anything once call-offs stop being competed.',
    'Splitting into many lots and awarding most of them to one bidder buys administration and concentration while losing resilience.',
    'A lot that only works alongside another lot is a discount, not competition.'
  ],
  when: [
    'Designing any tender above the regime threshold, before the specification is frozen.',
    'Refreshing a package that has been bought as one lot for several terms.',
    'When market testing shows credible mid-sized suppliers cannot absorb the whole scope.',
    'When demand is repeated and unpredictable in timing, and cycle time is the binding constraint.',
    'When one supplier wins most lots across a divided tender and the structure has not been retested.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Owns the lot plan and the call-off architecture, and states the reason each division exists.' },
    { role: 'Requesting Business Owner', resp: 'Confirms which pieces of the scope can genuinely be served separately and what that does to service.' },
    { role: 'Legal or Compliance', resp: 'Checks the published rules on bidding across lots, combined awards and the cap, and that they are disclosed before bids open.' },
    { role: 'Sourcing Lead', resp: 'Runs market testing on the divided shape rather than the whole package, and reports who can bid what.' },
    { role: 'Supplier', resp: 'Decides where to spend bid effort against the published lot and award rules.' }
  ],
  inputs: [
    'The requirement with its natural seams: geography, discipline, package size, service dependency.',
    'Market map: how many suppliers can serve each piece alone, and how many can serve the whole.',
    'Historical award pattern from the previous term, including lot concentration.',
    'Demand profile for anything repeat: volumes, timing variability, value bands per order.'
  ],
  outputs: [
    'A lot plan with sizes, standalone-viability notes, and published bid and award rules.',
    'A stated cap on lots winnable per bidder with the resilience reason behind it.',
    'A call-off architecture - framework, dynamic system or one-off - with the mini-competition trigger written down.',
    'An aggregate exposure view across lots and suppliers, reviewed before award rather than after.'
  ],
  controls: [
    'Lot division carries a recorded reason; a lot that exists only because an internal budget line exists is not justified.',
    'Each lot is tested for standalone viability before the tender is issued.',
    'Bid-by-lot, combined-award and lots-won cap are published in the tender documents, not decided after bids arrive.',
    'Framework call-offs compete above a stated value threshold, and the threshold is reviewed with the framework.',
    'Awarded share across lots is measured per supplier and per corporate group before the award is signed.'
  ],
  bestPractices: [
    'Size lots against what a credible supplier can absorb, then market test the divided shape, not the whole package.',
    'Keep the number of lots inside the evaluation capacity you actually have; more lots assessed badly is worse than fewer assessed well.',
    'Prefer a dynamic system over a closed framework where the market is thin or new entrants are the point.',
    'Retest the structure at each renewal; a lot plan is an assumption about a market and markets move.'
  ],
  mistakes: [
    'Issuing one large package and concluding the market is thin because four incumbents bid.',
    'Splitting on the organisation chart so that every bidder must bid on all pieces to make the bid worth doing.',
    'Awarding a framework and then never competing inside it for the whole term.',
    'Using rotation to avoid an argument about quality differences that the specification should have settled.'
  ],
  terms: [
    { term: 'Lot', def: 'A separately competed and separately awardable piece of one tender.' },
    { term: 'Call-off', def: 'A later order placed against an existing framework rather than a fresh competition.' },
    { term: 'Mini-competition', def: 'A competition reopened among the suppliers already on a framework for a specific requirement.' },
    { term: 'Dynamic purchasing system', def: 'A framework-like arrangement that stays open to new suppliers for its whole life on published terms.' }
  ],

  thinkingPoints: [
    {
      quote: 'The tender that was only ever reachable by four firms.',
      explanation: 'A regional highways maintenance buy had run as a single package for nine years and drew four bidders each time, all national incumbents, and the buyer concluded the market was thin. When it was reissued as six area lots with a cap of three per bidder, eleven suppliers bid, two of them new to the authority, and two of the three largest areas priced 18 percent under the previous single-lot rate.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: the market was not thin, the package was too thick, and the shape of the tender was the reason four firms were the only feasible bidders.',
      reflectionPrompt: 'For the last tender you issued as one package, how many suppliers could have served a third of it - and did anyone test that before the specification was frozen?',
    },
    {
      quote: 'The framework nobody competed inside.',
      explanation: 'An IT support framework of nine suppliers ran automatic rotation for two years because call-offs were faster that way. Prices drifted 14 percent above the market index, and the two most capable suppliers had left at renewal because they never received work under the rotation. The framework had converted competition into membership.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a framework saves the cost of the second competition only if the second competition still happens in some form.',
      reflectionPrompt: 'On your largest framework, what value triggers a mini-competition today, and when did that trigger last bite?',
    }
  ],

  sopSteps: [
    { title: 'Map the requirement onto its natural seams', role: 'Category Manager',
      desc: 'List the pieces a supplier could credibly serve on its own - geography, discipline, package, service dependency - and say what each seam costs in management effort. This is the raw material for a lot plan rather than a decision.',
      control: 'Candidate seams are documented with the service consequence of separating them, before lot sizes are set.',
      record: 'Seam map with management cost and service dependency noted per seam.',
      pitfall: 'Designing lots from internal budget lines so that no external supplier can profitably bid any one of them.'
    },
    { title: 'Test each candidate lot for standalone viability', role: 'Sourcing Lead',
      desc: 'Ask whether a credible supplier could serve that lot alone at a sensible price, using the market map. A lot that only works if the same bidder also takes another lot is a discount, not a piece of competition.',
      control: 'No lot is issued that fails the standalone test unless the reason for issuing it anyway is recorded.',
      record: 'Viability test per lot naming suppliers able to serve it alone.',
      pitfall: 'Creating a small specialist lot that only the incumbent can staff, then presenting the tender as open to new entrants.'
    },
    { title: 'Market test the divided shape, not the whole package', role: 'Sourcing Lead',
      desc: 'Sound out the market on the proposed lots and ask directly who could bid what. Incumbents will describe the whole package as un-dividable because division costs them; the test that matters is how many independent suppliers can serve each piece.',
      control: 'Market feedback on lotting is recorded with the identity of who said it, and disagreements with the plan are escalated rather than dropped.',
      record: 'Market sound-out log per lot with bid intent and objections.',
      pitfall: 'Accepting the incumbent view that the service cannot be split, which is the cheapest answer for the party giving it.'
    },
    { title: 'Fix and publish the bidding and awarding rules', role: 'Legal or Compliance',
      desc: 'State whether bidders may bid on all or some lots, whether lots may be awarded together, what a combined bid must contain to be assessed, and the cap on lots one bidder may win. All of it appears in the documents before bids arrive.',
      control: 'Bid, combined-award and lots-won rules appear in the published pack and are unchanged after it is issued.',
      record: 'Rule set in the tender pack with the resilience reason for any cap.',
      pitfall: 'Deciding combination treatment after seeing the bids, which is how a fair structure becomes an argued one.'
    },
    { title: 'Choose the call-off architecture deliberately', role: 'Category Manager',
      desc: 'Compare a one-off contract, a closed framework and a dynamic system against the demand profile: how repeated, how predictable, how urgent, and whether the qualified population should be fixed for the term. Write down which of those the chosen shape serves and which it sacrifices.',
      control: 'The architecture choice carries a recorded rationale tied to the demand profile and is revisited at each framework review.',
      record: 'Architecture note with demand profile, chosen shape and rejected alternatives.',
      pitfall: 'Choosing a framework for speed on the first buy and discovering it is a subscription by the second call-off.'
    },
    { title: 'Set the mini-competition trigger at design time', role: 'Sourcing Lead',
      desc: 'Define the value or volume above which a call-off reopens competition, who is invited, what may change between call-offs, and how service improvement can win against price. Publish it to framework members so the rule is known before it is used.',
      control: 'Every framework names a call-off threshold and a minimum invited count, and a sample of call-offs is audited against it.',
      record: 'Call-off ruleset with thresholds, invitation rule and the last audit date.',
      pitfall: 'Leaving allocation to whoever raises the order fastest, which quietly retires competition without a decision.'
    },
    { title: 'Measure awarded concentration before signature, not after', role: 'Category Manager',
      desc: 'Add up what each bidder and each corporate group wins across lots and across other live awards. Where the cap or the concentration limits are breached, apply the published remedy rather than renegotiating informally.',
      control: 'An awarded-share view across lots and groups is produced and signed before the award recommendation, including related-company checks.',
      record: 'Concentration summary per bidder and per group with any remedy applied.',
      pitfall: 'Counting bids received as competition while one group takes five of six lots and the service fails once instead of never.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A grounds-maintenance contract worth 8 million a year has run as one lot for three terms and attracted three bidders each time. The category team proposes six regional lots of between 0.8 and 2.2 million, with a cap of three lots per bidder and no combined-award option.',
      q: 'What is the strongest argument that the proposal will actually improve competition?',
      options: [
        { text: 'Six lots means twice as many prizes as three bidders, so more bids are certain.', isCorrect: false, rationale: 'Prize count alone does not create capacity; a bidder who cannot serve a 2.2 million lot is still excluded from the whole tender.' },
        { text: 'Each lot must pass a standalone-viability test, so a mid-sized regional supplier able to serve one area can bid one area - and the cap means it cannot quietly rebuild the single-lot market by winning everything.', isCorrect: true, rationale: 'Correct. Competition changes when a lot becomes reachable for a supplier that could not carry the whole, and the cap protects the resilience the division was bought for.' },
        { text: 'Removing combined awards guarantees lower prices because incumbents cannot discount across lots.', isCorrect: false, rationale: 'Combination can deliver genuine value; removing it is a choice with a cost, not an automatic saving.' },
        { text: 'Smaller lots always reduce total cost because overheads fall with size.', isCorrect: false, rationale: 'Mobilisation and supervision costs rise with more contracts, which is why lot count is a trade-off rather than a rule.' }
      ],
      principle: 'A lot improves competition only when it is reachable by a supplier who could not reach the whole; the cap then protects the resilience the split was bought for.',
    },
    {
      type: 'scenario',
      context: 'A professional services framework of fourteen suppliers allows direct award below 50,000 and mini-competition above it. Over the past year, 71 percent of spend went on direct awards just below the threshold, and prices have risen 9 percent.',
      q: 'What does the pattern indicate?',
      options: [
        { text: 'The framework is working; direct award is the intended efficiency.', isCorrect: false, rationale: 'The mechanism is intended, but work concentrated just below its trigger is behaviour responding to the trigger.' },
        { text: 'The threshold is doing the work of a pricing rule: work is being shaped to stay below it, so the trigger needs review and the near-threshold population needs a stated justification requirement.', isCorrect: true, rationale: 'Correct. Spend clustering immediately below a threshold is the signature of the threshold being the decision. Either lower it, add a value test, or require a documented reason for not competing.' },
        { text: 'Reduce the framework to five suppliers so direct awards go to better firms.', isCorrect: false, rationale: 'Fewer members makes each direct award more defensible in name and less contested in fact.' },
        { text: 'Ban direct award entirely.', isCorrect: false, rationale: 'That converts a speed mechanism into a queue and will be bypassed by scope splitting.' }
      ],
      principle: 'A call-off threshold that is never questioned becomes the pricing rule; distribution just below it is the evidence to review.',
    },
    {
      type: 'knowledge',
      q: 'What distinguishes a dynamic purchasing system from a closed framework?',
      options: [
        { text: 'A dynamic system is used only for goods rather than services.', isCorrect: false, rationale: 'The distinction is openness over the term, not the category of purchase.' },
        { text: 'A dynamic system stays open throughout its life to suppliers meeting the published terms; a closed framework fixes the population at qualification.', isCorrect: true, rationale: 'Correct. That is why it is the choice where the market is thin, changing, or deliberately being opened.' },
        { text: 'A dynamic system never needs mini-competition.', isCorrect: false, rationale: 'Call-offs still have to be decided; openness at entry does not remove the need to compete the order.' },
        { text: 'A closed framework is always the faster route.', isCorrect: false, rationale: 'Speed depends on the call-off rule, and a closed list can be slower than a fresh open system with a ready pool.' }
      ],
      principle: 'Entry openness and call-off competition are two separate design choices, and a framework can fail on either.',
    },
    {
      type: 'knowledge',
      q: 'Why must a cap on lots winnable per bidder be published before bids are received?',
      options: [
        { text: 'Because bidders allocate scarce bid effort against the rules they know, and a rule introduced after bids changes the competition that was actually run.', isCorrect: true, rationale: 'Correct. It is also the rule that decides whether a bidder pursues one lot or several, so timing is part of fairness.' },
        { text: 'Because caps are illegal in most regimes.', isCorrect: false, rationale: 'Caps are permitted and common; what matters is disclosure and consistent application.' },
        { text: 'Because the cap guarantees the lowest price across lots.', isCorrect: false, rationale: 'A cap can raise unit prices by preventing cross-lot efficiency; it is bought for resilience, not price.' },
        { text: 'Because it removes the need to check related-company bids.', isCorrect: false, rationale: 'Group relationships still have to be examined; a cap applied per legal entity can be evaded inside a group.' }
      ],
      principle: 'Award rules are behavioural instruments, and their power depends on existing before effort is spent.',
    },
    {
      type: 'scenario',
      context: 'A six-lot waste collection award results in one group winning five lots through three subsidiary companies. Nothing breached the published cap of four lots per bidder, and the buyer is content because eleven firms bid.',
      q: 'What is the correct follow-up?',
      options: [
        { text: 'Nothing: eleven bidders and a respected cap is evidence of a competitive process.', isCorrect: false, rationale: 'Bid counts measure participation; awarded share measures whether resilience was actually bought.' },
        { text: 'Measure awarded concentration across the group, test whether the cap was meant to bind per entity or per group, and fix the drafting for the next award rather than reopening this one informally.', isCorrect: true, rationale: 'Correct. The gap is in how the rule was written; the remedy is a stated group definition and a documented risk decision about the concentration that now exists.' },
        { text: 'Reallocate one lot to the fourth-placed bidder to restore balance.', isCorrect: false, rationale: 'That changes an award after the fact without a ground, which is exactly how a defensible decision becomes a challengeable one.' },
        { text: 'Cancel and re-compete the whole tender.', isCorrect: false, rationale: 'That is a remedy for a defect in the award, not for an outcome the published rules permitted.' }
      ],
      principle: 'Competition is measured in awarded share and group structure, not in the number of bids received.',
    }
  ],
  relSop: 'sop-tender-design-and-defence',
  rel: {
    concepts: ['lotting-and-lot-design', 'call-off-architecture', 'framework-agreement', 'public-procurement-rules', 'supplier-market-analysis', 'concentration-risk'],
    sops: ['sop-tender-design-and-defence', 'sop-rfp', 'sop-rfq', 'sop-procurement-intake'],
    checklists: ['cl-rfp-preparation', 'cl-sourcing-strategy', 'cl-supplier-identification'],
    templates: ['tpl-rfp', 'tpl-bid-instructions', 'tpl-supplier-invitation'],
    calcs: ['calc-supplier-concentration', 'calc-compare-quotes'],
    decisions: ['framework-agreement', 'sourcing-method', 'consolidate-suppliers', 'rfq-or-rfp'],
    kpis: ['kpi-bid-rate', 'kpi-supplier-concentration', 'kpi-contract-coverage'],
    glossary: ['gloss-rfp', 'gloss-bid', 'gloss-rft']
  },
  labMission: {
    title: 'Mission 25.1: Draw the Market You Actually Want to Compete',
    desc: 'Take a package you buy as one lot and design the divided version, then test whether anyone new could bid it.',
    tasks: [
      'Split one current single-lot contract into candidate lots on real seams, and for each, name at least three suppliers that could serve it alone.',
      'Write the bid, combined-award and lots-won rules you would publish, and check whether you could add any of them after seeing bids.',
      'For one framework you use, find the call-off threshold and measure last year spend against it. Report how much sat just below.'
    ],
    ctaLabel: 'Open Supplier Concentration',
    ctaHref: '#/calc/calc-supplier-concentration',
    secondaryLabel: 'Open the RFP Preparation Checklist',
    secondaryHref: '#/cl/cl-rfp-preparation'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-award-criteria-and-low-bids',
  title: 'Award Criteria, Weightings and the Bid That Is Too Cheap',
  module: 'Module 25: Public and Regulated Tendering - Lots, Criteria, Low Bids and Challenges',
  kicker: 'Function 25.2',
  tier: 'practitioner',
  tagline: 'The published criteria are the contract with every bidder about how they will be judged. Change them after bids arrive, or write them so only one supplier can win, and the award has already been decided - just not defensibly.',
  desc: "This function covers what is disclosed before bids arrive and what can be defended afterwards: the difference between selection, award and exclusion tests, how weights and sub-weights shape bidder behaviour and expose the incumbent, how to write a criterion two assessors score the same way without conferring, when a bid so low it undermines the service must be enquired into rather than accepted or rejected, and how the should-cost model is used as a test rather than as scripture.",
  duration: '23 mins',
  lifecycleStage: 'Stage 11: Supplier Evaluation & Scoring',
  lifecycleDesc: 'Owned in evaluation design and re-used at scoring, because the disclosure happens before the assessment that defends it.',

  what: "An award decision is defensible to exactly the depth of what was disclosed before bids arrived, and buyers discover that too late. Separate the three tests that get confused. Selection criteria decide who is capable of being invited or shortlisted - capability, financial standing, technical capacity, compliance with law. Award criteria decide which submitted bid wins - price, quality, service, sustainability, social value, whole-life cost. Exclusion grounds remove a bidder for conduct or status - tax or social-security defaults, a serious criminal conviction, a conflict of interest, misbehaviour in the process, or a finding under the relevant debarment route. Weighting a capability requirement into the award is the commonest drafting error: it excludes a bidder under the name of scoring them, and it is argued as a selection defect. Then the disclosure line. Weights and the relative importance of criteria are published; sub-criteria may be published where they would change how a bidder responds, and withheld where they would let a sophisticated bidder reverse-engineer the incumbents position. The judgement is honest rather than convenient: if a sub-weight would change bidder behaviour, it belongs in the documents, because withholding it and then applying it is the defect. Award criteria can be changed only for a reason that could not have been known earlier, and never in a way that would have attracted a different bid. Scoring quality is the part almost nobody designs. A criterion scores the same way in two hands when it is written against observable evidence with anchored bands: 0-25 percent means no evidence, 26-75 percent means partial with named gaps, 76-100 percent means the evidence is present and testable. Write the anchors, run a moderation round before results are fixed, keep the rationale per line rather than per total, and never let a assessor see the price while scoring the technical. A score without a written reason is the first document a challenger asks for, and a total with no rationale per line is indistinguishable from an impression. Weightings deserve a hard look for a second reason as well: they are where the incumbents advantages get laundered into requirements. If a criterion unusually favours the current provider, either it is genuinely valuable to the service and the reason is stated, or it is a description of the incumbent and should be deleted. The test is whether the criterion would survive being proposed by a losing bidder. Next, the bid that is too cheap. An implausibly low offer is not automatically a bad bid - it can be a real efficiency, a different risk allocation, a loss leader, or a mistake in the buyers own estimate. The required response is an enquiry into the assumptions that produce the number: labour rates against statutory minima and market levels, subcontractor terms and whether they have been agreed, margins and finance cost, overhead allocation, the treatment of provisional sums and of any scope the specification requires that the bid appears not to price. Set the trigger before bids open - a distance below the should-cost model or below the median response - so the enquiry is a rule rather than a reaction. Two failure modes sit on either side. Accepting an implausible price because it beats the savings target converts the shortfall into claims, variation requests, service decay or a failed contract; refusing to look at the whole market because one bid embarrassed everyone elses estimates is the other. Rejecting a low bid without asking is the version most often overturned on review; asking, recording and then rejecting against a stated ground is the version that survives. Finally, keep the estimate honest: a should-cost model is a test of bids and a bid is a test of the model. When a bid is materially under it, the enquiry should establish whether the market moved, whether the model carried an assumption no longer true, or whether the bidder has priced something the buyer did not understand. The last answer is information worth having, and it should reach the next estimate rather than being filed as a rejected offer.",
  why: [
    'Selection, award and exclusion are three different tests; scoring a capability requirement as if it were value is a defect with a name.',
    'Weights are published behaviour-shapers: any sub-weight that would change a response should have been told.',
    'A criterion that only the incumbent can satisfy is a description of a supplier dressed as a requirement.',
    'An implausibly low bid requires an enquiry into assumptions, not a verdict from the price column.',
    'A score without a per-line written rationale is indistinguishable from a preference when someone reads it back.'
  ],
  when: [
    'Drafting any tender where price is not the whole answer.',
    'When a bid arrives materially below the should-cost model or below the other responses.',
    'Before awarding on a close margin where a challenger could argue the criteria decided it.',
    'At the review of an old scorecard that keeps favouring the same supplier type.',
    'When an assessor says the scores are obvious and refuses to write the reason.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Owns the criteria set and the weights, and states why each criterion is worth paying for.' },
    { role: 'Requesting Business Owner', resp: 'Confirms the value judgement behind weights and accepts the consequence of publishing or withholding sub-criteria.' },
    { role: 'Evaluation Panel', resp: 'Scores independently against anchored bands, writes a rationale per line and moderates before results are fixed.' },
    { role: 'Legal or Compliance', resp: 'Checks disclosure, the permitted grounds for changing criteria, and the documented route for rejecting an implausible bid.' },
    { role: 'Finance or Cost Engineer', resp: 'Maintains the should-cost model that sets the low-bid trigger and revises it when the market proves it wrong.' }
  ],
  inputs: [
    'Draft criteria, weights and scoring anchors before the pack is issued.',
    'The should-cost model or buyer estimate, with its assumptions stated and dated.',
    'Bid submissions with the price breakdown and any stated qualifications.',
    'Panel scoring sheets with written rationale per line and the moderation record.'
  ],
  outputs: [
    'A published criteria set with weights, anchored bands and the evidence each band requires.',
    'A low-bid enquiry with the assumptions tested and the answer assessed against the estimate.',
    'A scoring record where the rationale is legible without the assessors being asked.',
    'A revised estimate where a bid has proved the model stale, fed back before the next tender.'
  ],
  controls: [
    'Criteria and weights are frozen before issue, and any post-issue change is recorded with the reason it could not have been known earlier.',
    'No criterion is awarded weight without a stated value reason and an anchored scoring band.',
    'Technical scores are produced without sight of price, and moderation happens before results are fixed.',
    'A bid beyond the defined distance from the estimate triggers a documented enquiry before any accept or reject decision.',
    'Rejection of a low bid names the ground and the evidence, and is approved outside the panel.'
  ],
  bestPractices: [
    'Write bands against evidence, not adjectives, so two reasonable assessors converge without conferring.',
    'Test every criterion by asking whether a losing bidder would have proposed it.',
    'Keep the total and the rationale in one artefact; a matrix of numbers with no reasons is a challenge waiting to be filed.',
    'Run the low-bid enquiry as a question about assumptions and demand the same documentation the specification demands.'
  ],
  mistakes: [
    'Weighting membership of a specific register or an unusual certification that only one supplier holds.',
    'Publishing weights but not the sub-criteria, then scoring against the sub-criteria.',
    'Rejecting an implausibly low bid without enquiry, or accepting it without testing the scope behind the price.',
    'Allowing the panel to re-score a losing bid during a challenge without reopening competition to everyone.'
  ],
  terms: [
    { term: 'Award criterion', def: 'A published standard, weighted, on which submitted bids are compared to decide the winner.' },
    { term: 'Selection criterion', def: 'A capability or standing test deciding who may be invited or shortlisted, not who wins.' },
    { term: 'Scoring anchor', def: 'A defined band of the scale tied to observable evidence, so a score means the same thing in different hands.' },
    { term: 'Abnormally low tender', def: 'An offer implausible against the buyer estimate or the other bids, requiring enquiry into its assumptions before decision.' }
  ],

  thinkingPoints: [
    {
      quote: 'The sub-criterion that fitted one fleet.',
      explanation: 'A transport award weighted 60 percent price and 40 percent service, with five service sub-criteria whose weights were not published. A losing bidder obtained the scoring sheets under the review process and found one sub-criterion - a distinctive depot arrangement - that only the incumbent fleet type satisfied, carrying 12 of the 40 service points. The decision had to be retaken because the undisclosed element had effectively written the specification.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: undisclosed sub-weights are not a detail withheld, they are a criterion applied that nobody was told they were competing against.',
      reflectionPrompt: 'Look at the last scorecard you used: which sub-criterion would a losing bidder have argued only one supplier could meet, and was its weight published?',
    },
    {
      quote: 'The 23 percent saving that arrived as a claim.',
      explanation: 'A cleaning tender came in 23 percent under the should-cost model and was awarded because it beat the savings target. The enquiry was skipped as too slow. In month three the operator produced a variation request: it had priced 42 hours a week against a specification requiring 60. The shortfall became a dispute, the service degraded visibly, and the second-placed bidder was eventually offered the site at a price close to the original estimate.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: an unexamined low price is not a saving, it is a transfer of the difference into claims, service decay or termination.',
      reflectionPrompt: 'What distance below your estimate triggers a documented enquiry today, and has that trigger ever actually fired?',
    }
  ],

  sopSteps: [
    { title: 'Separate selection, award and exclusion in the drafting', role: 'Legal or Compliance',
      desc: 'Sort every test into capability to be shortlisted, value to be weighted, and conduct or status to exclude. Rewrite anything that is a capability requirement sitting in the weighted set.',
      control: 'The criteria schedule labels each test by its type, and no weighted criterion replicates a selection test.',
      record: 'Criteria schedule with type labels and the owner of each.',
      pitfall: 'Scoring a supplier out on a capability gap that should have been a shortlisting filter with a chance to prove it.'
    },
    { title: 'Set weights from the business case, then test them for bias', role: 'Category Manager',
      desc: 'Derive each weight from what the case says creates value, then ask whether a losing bidder would have proposed that criterion and weight. Record the answer for any criterion that unusually favours an existing supplier.',
      control: 'Every weight above a defined threshold carries a written value reason and a completed bias test.',
      record: 'Weight rationale with bias test outcomes and any criterion removed.',
      pitfall: 'Keeping a criterion because the business likes it while the weight quietly decides the outcome.'
    },
    { title: 'Decide and record the disclosure line for sub-criteria', role: 'Legal or Compliance',
      desc: 'For each sub-criterion ask the honest question: would knowing this change how a bidder responds? If yes, publish it. Where it is withheld, note that the withholding is defensible only because the response would not have changed.',
      control: 'Sub-criteria are published where they would influence a response, and each non-publication carries a recorded reason.',
      record: 'Disclosure register listing every sub-criterion, its weight and its published status.',
      pitfall: 'Withholding a sub-weight and then applying it, which converts a drafting shortcut into a reviewable defect.'
    },
    { title: 'Write anchored bands before bids arrive', role: 'Evaluation Panel',
      desc: 'Convert adjectives into evidence thresholds so that a score of 80 means the same in two hands. Each band names what must be present in the response, and the bands are issued with the pack.',
      control: 'No weighted criterion is issued without anchored bands and a named evidence requirement per band.',
      record: 'Scorecard with bands, evidence definitions and the worked example used at moderation.',
      pitfall: 'A 1-to-10 scale with no anchors, where the panel discovers its disagreement only after totals are added.'
    },
    { title: 'Score independently, then moderate before fixing', role: 'Evaluation Panel',
      desc: 'Assessors score separately without sight of price, and the panel moderates only the gaps between independent scores - discussing evidence, not averaging numbers. The moderation record shows what moved and why.',
      control: 'Independent scores are retained alongside moderated scores, and every movement has a written reason.',
      record: 'Moderation note with independent scores, the gaps discussed and the reasons for movement.',
      pitfall: 'A chaired scoring session that produces one opinion spoken first and then inherited by everyone else.'
    },
    { title: 'Trigger and run the low-bid enquiry', role: 'Finance or Cost Engineer',
      desc: 'When a bid breaches the published distance from the estimate, ask for the specific assumptions behind the price and test them against statutory minima, agreed subcontractor terms, overhead allocation and the scope the specification requires.',
      control: 'The enquiry is documented, the answer is assessed against the estimate, and both are held in the award file.',
      record: 'Low-bid enquiry file with the question, the assumptions supplied and the assessment.',
      pitfall: 'Turning the enquiry into a negotiation available only to the cheapest bidder, which is its own defect.'
    },
    { title: 'Decide on the record and revise the estimate if it was wrong', role: 'Category Manager',
      desc: 'Accept, clarify or reject against a stated ground with evidence, approved outside the panel. Where the enquiry shows the market moved or the model carried a stale assumption, revise the model so the next tender starts from the corrected position.',
      control: 'Rejection of a low bid names the ground and is signed by someone outside the panel; a model disproved by evidence is updated before the next award.',
      record: 'Award decision note with the ground, the approver and any estimate revision.',
      pitfall: 'Rejecting an implausible bid for being low, keeping the stale estimate, and being surprised again next cycle.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A managed-print tender weights three criteria at 40, 35 and 25. The 40-point criterion is a certified technician coverage model that only the incumbent and one other supplier can evidence at the top band. Sub-weights are not published. A bidder complains at debrief that it does not understand how it lost.',
      q: 'What is the correct position?',
      options: [
        { text: 'The criteria were published, so the complaint has no ground.', isCorrect: false, rationale: 'Publication of the criterion is not the whole test; whether a sub-weight that changed behaviour was withheld is the live question.' },
        { text: 'Explain the scoring in a way the bidder could have acted on, and test whether the criterion itself is a capability requirement or a genuine value judgement - if it favours one supplier type, the reason must be defensible on the service.', isCorrect: true, rationale: 'Correct. Debrief owes enough for the bidder to judge whether the decision was wrong, and a criterion that reads as a description of the incumbent is the defect worth fixing before the next award.' },
        { text: 'Reveal the sub-weights at debrief as a courtesy.', isCorrect: false, rationale: 'If a sub-weight would have changed responses, it belonged in the documents; disclosing it afterwards repairs nothing and admits the omission.' },
        { text: 'Delete the criterion and re-score to avoid the argument.', isCorrect: false, rationale: 'Re-scoring against unpublished criteria without reopening to all bidders is a larger defect than the one complained of.' }
      ],
      calcWork: 'If the top band is reachable by only two suppliers, the expected spread on 40 points is near zero unless the band is redefined - treat reachability as a design test on every high-weight criterion.',
      principle: 'A criterion that only one supplier type can meet is either a genuine service need with a stated reason or a description of the incumbent.',
    },
    {
      type: 'scenario',
      context: 'Your should-cost model puts a facility service at 3.4 million a year. One bid arrives at 2.55 million, 11 percent below the next nearest, and the savings report will look excellent if it is awarded.',
      q: 'What is the correct sequence?',
      options: [
        { text: 'Award it; a competitive process produced the price and a lower price is the point.', isCorrect: false, rationale: 'The gap may be a real efficiency or a priced-to-win shortfall, and the difference is not visible in the number.' },
        { text: 'Reject it as unrealistic and award the second bid.', isCorrect: false, rationale: 'Rejection without enquiry is the version most often overturned, and it may discard the cheapest genuine offer in the market.' },
        { text: 'Run the published enquiry: ask for labour rates against statutory minima, agreed subcontractor terms, overhead allocation, and the hours or service levels priced against the specification - then assess the answer against the model and record the ground for whatever is decided.', isCorrect: true, rationale: 'Correct. The enquiry tests assumptions rather than the price, and it also tests whether the estimate has gone stale.' },
        { text: 'Ask all bidders to improve their prices to match the lowest.', isCorrect: false, rationale: 'That is a second negotiation round opened by the wrong party and is a defect in itself.' }
      ],
      principle: 'An implausible price is a question about assumptions - the bidders and your own - and the enquiry is the record that makes the decision defensible.',
    },
    {
      type: 'knowledge',
      q: 'Which is the correct treatment of a selection criterion?',
      options: [
        { text: 'It may be weighted in the award as long as it is published.', isCorrect: false, rationale: 'Weighting a capability test converts it into a value judgement and is argued as a selection defect.' },
        { text: 'It decides who may be invited or shortlisted; failure to meet it removes a bidder, and it is never a weighted source of points in the award.', isCorrect: true, rationale: 'Correct. Selection tests pass or fail; award criteria compare value.' },
        { text: 'It can be introduced after bids if the panel thinks it important.', isCorrect: false, rationale: 'A new test after bids is the clearest ground for review.' },
        { text: 'It applies only to bidders above the value threshold.', isCorrect: false, rationale: 'Selection applies to whoever is being shortlisted, whatever the value.' }
      ],
      principle: 'Selection filters capability, award criteria compare value, and mixing them is the defect rather than the shortcut.',
    },
    {
      type: 'knowledge',
      q: 'What is the practical purpose of anchored scoring bands?',
      options: [
        { text: 'To make the scorecard look rigorous to an auditor.', isCorrect: false, rationale: 'Appearance is not the purpose; the purpose is that the same response earns the same score in different hands.' },
        { text: 'To make independent assessor scores converge on evidence, so moderation discusses the gap rather than the personality, and a rationale can be written per line.', isCorrect: true, rationale: 'Correct. Anchors bind a band to observable evidence, which is also what makes the resulting score explicable months later.' },
        { text: 'To allow the panel to average scores instead of debating.', isCorrect: false, rationale: 'Averaging hides disagreement; the anchors exist so the disagreement can be resolved on evidence.' },
        { text: 'To keep price out of the technical score.', isCorrect: false, rationale: 'That is achieved by sequencing and sightlines, not by the bands.' }
      ],
      principle: 'Anchored bands turn a score from an opinion into a claim that can be shown, tested and re-read.',
    },
    {
      type: 'scenario',
      context: 'During a challenge, the reviewing body asks for the evaluation file. The panel has totals, but individual sheets show only numbers, and the moderation meeting was not minuted.',
      q: 'What is the realistic consequence?',
      options: [
        { text: 'None: the totals were arithmetically correct.', isCorrect: false, rationale: 'Correct arithmetic proves addition, not reasoning; the file answers why, not how much.' },
        { text: 'The decision must be reconstructed from memory, and a reconstruction produced under challenge carries less weight than a contemporaneous rationale - which is why per-line reasons and a moderation note are the cheap insurance.', isCorrect: true, rationale: 'Correct. The defence of an award is the record made at the time, and the absence of it turns a sound decision into an arguable one.' },
        { text: 'The panel re-scores now with better reasons and submits that.', isCorrect: false, rationale: 'A fresh scoring exercise under challenge invites the question of why the first one was not reliable.' },
        { text: 'The buyer withdraws the award and re-tenders to end the argument.', isCorrect: false, rationale: 'That may be the eventual outcome, but it is a consequence of the missing record rather than a management option.' }
      ],
      principle: 'The award file is the defence; a total without a per-line rationale is what forces a decision to be retaken.',
    }
  ],
  relSop: 'sop-supplier-evaluation',
  rel: {
    concepts: ['award-criteria-weighting', 'abnormally-low-tender', 'evaluation-criteria', 'should-cost', 'total-cost-of-ownership', 'audit-trail'],
    sops: ['sop-tender-design-and-defence', 'sop-supplier-evaluation', 'sop-rfp', 'sop-savings-validation'],
    checklists: ['cl-technical-evaluation', 'cl-commercial-evaluation', 'cl-award-recommendation'],
    templates: ['tpl-weighted-scoring', 'tpl-technical-evaluation', 'tpl-award-recommendation', 'tpl-commercial-evaluation'],
    calcs: ['calc-supplier-scorecard', 'calc-should-cost', 'calc-compare-quotes'],
    decisions: ['unit-or-tco', 'rfq-or-rfp', 'negotiate-or-accept'],
    kpis: ['kpi-bid-rate', 'kpi-ppv', 'kpi-contract-compliance'],
    glossary: ['gloss-should-cost', 'gloss-bid', 'gloss-tco']
  },
  labMission: {
    title: 'Mission 25.2: Read Your Scorecard as a Challenger Would',
    desc: 'Take the last scorecard you used and look for the criterion that decided the outcome before the bids arrived.',
    tasks: [
      'List the weighted criteria from one real tender, label each as selection, award or exclusion, and rewrite anything mislabelled.',
      'For the highest-weight criterion, write the anchored bands you would have published, and check whether a losing bidder could have reached the top band.',
      'Set the distance from your estimate that should trigger a documented low-bid enquiry, and find whether any recent bid exceeded it without an enquiry.'
    ],
    ctaLabel: 'Open Weighted Scoring',
    ctaHref: '#/calc/calc-supplier-scorecard',
    secondaryLabel: 'Open the Award Recommendation Checklist',
    secondaryHref: '#/cl/cl-award-recommendation'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-standstill-challenge-defensible-file',
  title: 'Standstill, Debrief and a File That Survives Being Read',
  module: 'Module 25: Public and Regulated Tendering - Lots, Criteria, Low Bids and Challenges',
  kicker: 'Function 25.3',
  tier: 'executive',
  tagline: 'The signature is not the end of the decision. Between award and contract sits a window whose only purpose is to let someone who lost stop a wrong decision - and the board question is whether your file could bear being read in it.',
  desc: "This function covers the period after an award decision and the governance that makes it survivable: what a standstill notice has to say and how long it has to run, what a debrief owes without handing over grounds, how self-correction differs from a U-turn, what a review body can actually do to a signed contract, the publication and record duties that make the decision traceable, and how an executive should read an award file before approving the signature.",
  duration: '20 mins',
  lifecycleStage: 'Stage 16: Approval & Delegation of Authority',
  lifecycleDesc: 'Held at approval, because the decision to sign before the window closes is an authority question and not a project-management one.',

  what: "A procurement decision becomes a governable event only when someone outside it can read it and tell what happened. That is the subject of this lesson, and the reason it belongs at executive level is that the failure is almost always a trade made under schedule pressure by someone with too little authority to make it. Begin with the pause. Between the award decision and signature, unsuccessful bidders are told who won, why, and in enough detail about the winning offer to judge whether the decision was wrong - and the contract is held while they consider it. The length is set by the regime and by how quickly a challenge could be filed; the content is the part organisations get wrong. A notice that gives the score and nothing else does not discharge the duty, because a score is a result rather than a reason. The characteristics that decided it are what must be disclosed: the relative weighting actually applied, the way the winning response met a criterion the loser did not, and the reason the second bidder was behind. Debrief detail is where judgement lives. The obligation is transparency sufficient for a bidder to assess whether the decision was lawful; it is not an obligation to draft the grounds of a challenge against yourself, and it is not a licence to reveal commercial secrets. The line that survives scrutiny is reasoning rather than raw data: explain how an answer was scored and why, without reading out another suppliers prices or its staff names. If a challenger wants more, the review process decides that argument - your job is to be able to explain your own decision in writing, in the terms you used at the time. Self-correction is the most underused instrument in this window. When a defect appears before signature - a misapplied weight, an unrecorded low-bid enquiry, an assessor conflict discovered late - a buyer that can correct and re-run a decision usually saves itself a review proceeding. Correction is not weakness; a U-turn without a ground is the problem, and a documented correction against an identified defect is the version that holds. Then the escalation ladder a board should expect to see described: explanation, correction, and only then a review body. Reviews decide lawfulness, and their remedies are sharper than most executives assume. A recommendation can be set aside and the decision retaken; a signature made inside the pause window can be met with a short order preventing the contract; and where a mandatory standstill was skipped altogether, the contract already signed can be treated as ineffective - which does not mean the supplier leaves, it means the relationship is stripped of legal protection and, in some regimes, a financial penalty follows. Ineffectiveness is the outcome that makes the three-day saving look like what it is. Publication and record duties exist for the same reason as the pause. Notices of the award, its value, the winner and the reasoning go on the public register; the file keeps the pack, the clarifications log, the scoring sheets with rationale, the moderation note, the low-bid enquiry, the recommendation, the approval and the standstill. Retrievability is not tidiness: an award that cannot be reconstructed is treated as one that was not properly made. Executives rarely read those files, and the right question at approval is narrow and brutal: could this decision be explained by a document written before it was made, and does anything in the window remain unresolved? Alongside the file sit two governance facts that get traded away under schedule pressure. Conflicts of interest: an assessor with a relationship to a bidder is removed, and the record shows it was known and handled, because an undisclosed conflict defeats an otherwise excellent evaluation. And the emergency route: there is a narrow set of circumstances where competition is dispensed with altogether, and it is defensible only while the reason is genuinely external to the buyers own planning. Where the delay was caused by a specification that arrived late, the route is being used to cover a planning failure, and that pattern - not the individual case - is what a board should be counting.",
  why: [
    'The pause exists so a wrong decision can be stopped before it becomes a contract, which is the cheapest moment to fix it.',
    'A score is a result; disclosure must reach the reasoning and the characteristics that decided the award.',
    'Self-correction against a documented defect is normally better than defending a review proceeding.',
    'Signing inside the window risks the contract being treated as ineffective, which is not the same as being cancelled.',
    'A file that cannot reconstruct the decision is read as a decision that was not properly made.'
  ],
  when: [
    'Before signing any award above threshold in a regulated regime.',
    'When a losing bidder asks why it lost, especially on a close decision.',
    'When a defect in the evaluation is discovered after the recommendation but before signature.',
    'At board approval of a large award, as a question about the file rather than the price.',
    'When reviewing how often the emergency or single-source route was used and for what reason.'
  ],

  raci: [
    { role: 'Executive Sponsor', resp: 'Approves the signature after asking whether the file explains the decision and whether the window is clear.' },
    { role: 'Head of Procurement', resp: 'Owns the standstill, the debrief standard and the decision to self-correct, and holds the line against schedule-driven shortcuts.' },
    { role: 'Legal', resp: 'Advises on disclosure depth, the grounds available for correction, and the exposure if the period is shortened or skipped.' },
    { role: 'Category Manager', resp: 'Assembles the award file so it is retrievable as one set and writes the rationale in the terms used at the time.' },
    { role: 'Internal Audit', resp: 'Tests a sample of awards for standstill compliance, disclosure quality and completeness of the file.' }
  ],
  inputs: [
    'The award recommendation with per-line rationale and the moderation record.',
    'The published pack, the clarification log and the low-bid enquiry where one was raised.',
    'The standstill notice draft: winner, reasons, characteristics that decided it, and the date the period ends.',
    'Debrief notes and any challenge or correction request received.'
  ],
  outputs: [
    'A notice and a debrief that let a loser assess the lawfulness of the decision without supplying its grounds.',
    'A dated decision record where correction, if any, is written against an identified defect.',
    'A complete retrievable award file, approved for signature only after the period has run.',
    'A management report on shortened periods, conflicts handled and use of the emergency route.'
  ],
  controls: [
    'No signature before the mandatory period ends, with any exception requiring approval one level above the requester and a recorded reason.',
    'Debrief content follows a written standard: reasoning and decided characteristics, no competitor secrets, no new criteria.',
    'Every correction is recorded with the defect, the ground and the approver; nothing is corrected verbally.',
    'Assessor declarations are taken before scoring and any conflict is documented as handled.',
    'A sample of closed awards is file-tested each period for notice, rationale and retrievability.'
  ],
  bestPractices: [
    'Write the rationale as if a hostile reader will get it, because eventually one does.',
    'Self-correct early in the window rather than defending a decision the file cannot support.',
    'Give the executive the file index with the recommendation, so approval is a question about evidence rather than about price.',
    'Count and report the use of shortened periods and single-source routes - the trend is the risk, not the incident.'
  ],
  mistakes: [
    'Shortening the standstill to protect a service start date on a large award.',
    'Debriefing totals and placing without explaining the reasons that produced them.',
    'Re-scoring a losing bid during a challenge without reopening the competition to every bidder.',
    'Assuming the decision was fair in the room and therefore the file will speak for itself.'
  ],
  terms: [
    { term: 'Standstill period', def: 'The mandatory pause between notifying an award decision and signing, during which a loser can question it.' },
    { term: 'Ineffectiveness', def: 'The remedy that strips an already-signed contract of protection where the required pause was skipped.' },
    { term: 'Self-correction', def: 'Fixing an identified defect in a decision before signature and recording the ground for doing so.' },
    { term: 'Debrief', def: 'The explanation given to unsuccessful bidders, sufficient for them to assess whether the decision was lawful.' }
  ],

  thinkingPoints: [
    {
      quote: 'The three days that cost eleven weeks.',
      explanation: 'A security services contract was signed on the day of the award decision so the new provider could mobilise on schedule. The second-ranked bidder obtained the scoring sheets, found an arithmetical error in the technical model worth four points, and because the contract was already signed the remedy had to be a termination and a re-award. The service ran on an extended old contract for eleven weeks longer than planned, at the old rates, and the organisation also had to explain to the review body why the mandatory pause had been waived.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: the pause is not administrative delay, it is the point at which an error is still cheaper to fix than to undo.',
      reflectionPrompt: 'Who in your organisation can authorise a shortened standstill, what threshold triggers that decision, and does the reason get written down before or after the signature?',
    },
    {
      quote: 'The debrief that answered the wrong question.',
      explanation: 'A technology provider asked why it lost and was told it scored 71 against the winners 84. Unsatisfied, it asked for the reasoning and received a refusal citing commercial confidentiality. The review that followed was not about the score; it was about a sub-criterion the pack had not disclosed, and the fact that nobody had been able to explain the reasoning earlier made the defect hard to answer.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: withholding reasoning does not protect a decision, it converts an explainable outcome into an unanswerable one.',
      reflectionPrompt: 'Could the last award you made be explained from a document written before it, and who would have to be asked to explain it now?',
    }
  ],

  sopSteps: [
    { title: 'Close the evaluation into one retrievable file', role: 'Category Manager',
      desc: 'Assemble pack, clarification log, declarations, scoring sheets with per-line rationale, moderation note, any low-bid enquiry, and the recommendation as one set with an index, so a reader can reconstruct the decision without asking anyone what happened.',
      control: 'The file index accompanies the recommendation, and a missing element blocks approval rather than being promised later.',
      record: 'Indexed award file with a completeness check signed by the owner.',
      pitfall: 'A recommendation that reads well while the reasoning sits in three assessors memories and one unshared spreadsheet.'
    },
    { title: 'Issue a notice that carries reasons, not just results', role: 'Head of Procurement',
      desc: 'Name the winner, the reasons the decision was taken, the characteristics and relative weighting actually applied, and the date the period ends. Write it so a bidder who lost can judge whether something was wrong.',
      control: 'Notices follow a published template with mandatory reason fields, and are sampled by internal audit.',
      record: 'Issued notice with the reason text and the period end date.',
      pitfall: 'Sending the score and the placing and calling that transparency.'
    },
    { title: 'Hold the signature until the window closes', role: 'Executive Sponsor',
      desc: 'Treat the end date as a control, not a schedule item. Where a shortening is genuinely necessary, it is approved above the requester, recorded with its reason, and the residual risk is named before the signature rather than after the challenge.',
      control: 'Signature is blocked until the recorded period end, and any exception carries a named approver one level above the requester.',
      record: 'Signature gate log with period dates and any approved exception and its reason.',
      pitfall: 'Accepting a waiver because the mobilisation date matters, which is how an ineffectiveness risk is created.'
    },
    { title: 'Run the debrief to a written standard', role: 'Head of Procurement',
      desc: 'Explain how each answer was scored and why it sat where it did, without revealing another bidders commercial secrets or introducing criteria nobody was told about. Prepare the assessor to say what the reasoning was, not to improvise a defence.',
      control: 'Debrief notes are recorded against the standard, and any question that could not be answered is escalated rather than glossed.',
      record: 'Debrief note per bidder with questions asked and answers given.',
      pitfall: 'Refusing reasoning outright and converting a routine explanation into an allegation of concealment.'
    },
    { title: 'Self-correct against the defect when one appears', role: 'Legal',
      desc: 'Where a defect is identified before signature - an unrecorded enquiry, a misapplied weight, an undisclosed conflict - decide the correction on a documented ground, notify those affected, and retake the decision in the terms the pack allowed.',
      control: 'Corrections are approved by someone outside the panel and notified to all bidders; no correction is made on an unrecorded basis.',
      record: 'Correction note with the defect, ground, approver and the notification made.',
      pitfall: 'Re-scoring one bidder privately to answer a complaint, which is a larger defect than the complaint.'
    },
    { title: 'Handle conflicts where they are found, in the record', role: 'Legal',
      desc: 'Take declarations before scoring. Where a relationship emerges later, decide and record whether the assessor is removed and whether an existing score can stand, rather than leaving the discovery undocumented.',
      control: 'Every assessment file shows declarations and any conflict handled, with the decision and its author.',
      record: 'Declaration register plus the conflict-handling note where relevant.',
      pitfall: 'Treating an honest non-disclosure as harmless because the assessor scored conservatively.'
    },
    { title: 'Report the pattern, not just the incident', role: 'Internal Audit',
      desc: 'Each period, count shortened periods, exceptions to the notice requirement, corrections made, and use of the emergency or single-source route, and report the trend to the executive with the reasons given.',
      control: 'A file test of sampled awards plus a trend report is produced each period, and repeat reasons are escalated.',
      record: 'Quarterly award-integrity report with counts, reasons and the cases tested.',
      pitfall: 'Reviewing each exception on its own merits while the aggregate quietly shows a planning problem.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A 26 million award is ready to sign on Friday. The mandatory period ends the following Wednesday, and the service start date cannot move. The operations director asks procurement to sign now and handle any complaint later.',
      q: 'What is the correct response?',
      options: [
        { text: 'Sign it; the complaint route remains open to losers afterwards, so nothing is lost.', isCorrect: false, rationale: 'After signature the remedies change shape and cost, and skipping the required period is the specific trigger for a harsher one.' },
        { text: 'Refuse the shortcut, sign on the other side of the period, and if the start date truly cannot wait use a documented bridge on the existing contract approved above the requester.', isCorrect: true, rationale: 'Correct. The gap is a scheduling problem with a legitimate answer; signing inside the window is a legal problem with an answer that includes treating the contract as ineffective.' },
        { text: 'Shorten the period to Monday as a compromise.', isCorrect: false, rationale: 'A mandatory period is not negotiable by proportion; a shortened one is treated as a skipped one.' },
        { text: 'Sign and notify losers afterwards so they still have their rights.', isCorrect: false, rationale: 'Notification after signature is the defect, however promptly it is sent.' }
      ],
      principle: 'The pause is where an error is still cheaper to fix than to undo, and a bridge contract is the honest way to buy time.',
    },
    {
      type: 'scenario',
      context: 'A losing bidder asks for a debrief. The panel is willing to explain the reasoning but fears that any detail will hand the bidder grounds for a challenge.',
      q: 'What should be disclosed?',
      options: [
        { text: 'Nothing until a challenge is filed, then everything through the review.', isCorrect: false, rationale: 'That converts a routine duty into an accusation of concealment and wastes the chance to correct a defect early.' },
        { text: 'The reasons and the decided characteristics - how its own answer was scored and why it sat behind the winner - while protecting another bidders commercial secrets and introducing no criterion nobody was told about.', isCorrect: true, rationale: 'Correct. The standard is transparency sufficient to assess lawfulness, not a full disclosure of competitors data.' },
        { text: 'The winners full price breakdown so the comparison is honest.', isCorrect: false, rationale: 'Commercial detail of another bidder is not required and can itself be a defect.' },
        { text: 'The totals only, since that is what the bidder can verify.', isCorrect: false, rationale: 'A score is a result; reasons are what the duty is about.' }
      ],
      principle: 'Explain reasoning, protect secrets, add nothing unpublished - that is the debrief line that survives being challenged.',
    },
    {
      type: 'knowledge',
      q: 'What does the remedy of ineffectiveness actually mean for a signed contract?',
      options: [
        { text: 'The contract is cancelled and the supplier leaves immediately.', isCorrect: false, rationale: 'That is not what it generally does; service continuity is handled separately.' },
        { text: 'The contract is stripped of legal protection, often with a financial penalty, because the required pause before signature was skipped.', isCorrect: true, rationale: 'Correct. It is the consequence of signing inside the window rather than a routine termination.' },
        { text: 'The buyer must re-tender every award to the same supplier.', isCorrect: false, rationale: 'The remedy attaches to the defective award, not to the whole portfolio.' },
        { text: 'Nothing, provided the award decision itself was sound.', isCorrect: false, rationale: 'A sound decision taken through the wrong process is precisely the case the remedy exists for.' }
      ],
      principle: 'Process is not decoration: skipping the pause attacks the contract rather than only the decision.',
    },
    {
      type: 'knowledge',
      q: 'When is self-correction the right answer after an award decision?',
      options: [
        { text: 'Never; changing a decision invites a challenge.', isCorrect: false, rationale: 'Unrecorded change invites challenge; a documented correction against a defect usually ends the argument.' },
        { text: 'When a defect is identified before signature and can be fixed on a ground the published pack allows, with the correction documented and those affected notified.', isCorrect: true, rationale: 'Correct. The discipline is a named defect, a permitted ground and notification - not a quiet second look at the scores.' },
        { text: 'Whenever a losing bidder complains persuasively.', isCorrect: false, rationale: 'Complaints are not grounds; the defect is.' },
        { text: 'Only when a review body orders it.', isCorrect: false, rationale: 'By then the cheaper window has usually passed.' }
      ],
      principle: 'A correction recorded against an identified defect is governance; an unrecorded reversal is the defect.',
    },
    {
      type: 'scenario',
      context: 'At board approval of a large award, the executive has ten minutes and the recommendation runs to four pages of scoring tables and a totals line.',
      q: 'What question should the executive ask?',
      options: [
        { text: 'Whether the price is the lowest available.', isCorrect: false, rationale: 'That is one input and the least likely thing to be challenged; it is also not the standard the award was made against.' },
        { text: 'Whether a document written before the decision could explain it to someone who lost, whether anything in the window is unresolved, and whether the file index is complete.', isCorrect: true, rationale: 'Correct. Those are the questions that predict whether the award survives being read, and they take two minutes.' },
        { text: 'Whether procurement recommends proceeding.', isCorrect: false, rationale: 'That is the answer already given; approval adds value by testing its evidence.' },
        { text: 'Whether the standstill notice has been drafted, to be checked later.', isCorrect: false, rationale: 'Later is after the signature, which is the decision being approved.' }
      ],
      principle: 'Executive approval of an award is a test of the file, not a second reading of the price.',
    }
  ],
  relSop: 'sop-tender-design-and-defence',
  rel: {
    concepts: ['standstill-and-challenge', 'audit-trail', 'award-criteria-weighting', 'conflict-of-interest', 'delegation-of-authority', 'public-procurement-rules'],
    sops: ['sop-tender-design-and-defence', 'sop-procurement-audit', 'sop-supplier-evaluation', 'sop-rfp'],
    checklists: ['cl-procurement-file-completeness', 'cl-award-recommendation', 'cl-procurement-audit'],
    templates: ['tpl-award-recommendation', 'tpl-exception-request', 'tpl-bid-waiver'],
    calcs: ['calc-compare-quotes'],
    decisions: ['approve-exception', 'competitive-or-single'],
    kpis: ['kpi-cycle-time', 'kpi-contract-compliance', 'kpi-maverick-spend'],
    glossary: ['gloss-bid', 'gloss-doa', 'gloss-segregation-of-duties']
  },
  labMission: {
    title: 'Mission 25.3: Read an Award as Someone Who Lost',
    desc: 'Take the last large award you approved and test whether it could survive being read by a challenger.',
    tasks: [
      'List the elements of one recent award file - pack, clarifications, declarations, scores with rationale, recommendation, notice - and mark what is missing or scattered.',
      'Draft the debrief paragraph for the second-placed bidder using reasoning only, and check it names no new criterion and no competitor secret.',
      'Find who can authorise a shortened mandatory period at your organisation, what threshold applies, and whether the reason is recorded before or after signature.'
    ],
    ctaLabel: 'Open the Procurement File Completeness Checklist',
    ctaHref: '#/cl/cl-procurement-file-completeness',
    secondaryLabel: 'Open Award Recommendation',
    secondaryHref: '#/tpl/tpl-award-recommendation'
  }
});
