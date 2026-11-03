/* ==========================================================
   Procure Sherpa v3.0 - Academy Module 28: Supplier Innovation
   and Early Engagement - Shaping the Work Before It Is Priced.
   Module 2 engages the market to define a requirement and Module 8
   manages an existing supplier; neither taught the deliberate
   middle - involving suppliers before the requirement is fixed,
   buying an innovation without buying a prototype, and keeping the
   rights that decide who owns the result. Three lessons and five
   concepts. Written with no apostrophes, since these strings are
   single quoted and the build reads them literally.
   ========================================================== */

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-early-supplier-involvement',
  title: 'Early Supplier Involvement: Letting the Market Shape the Requirement',
  module: 'Module 28: Supplier Innovation and Early Engagement - Shaping the Work Before It Is Priced',
  kicker: 'Function 28.1',
  tier: 'practitioner',
  tagline: 'Most of the achievable value in a buy is decided before the specification is written, and the only people who know what is achievable are the ones you have not invited yet.',
  desc: "This function covers structured engagement with suppliers before a requirement is fixed: the difference between consultation, co-design and a specification written by a bidder, what to share and what to withhold, the record that keeps the process defensible, the balance of who gets heard, and how to turn market knowledge into a better requirement without pre-deciding the award.",
  duration: '21 mins',
  lifecycleStage: 'Stage 5: Market Analysis and Supplier Identification',
  lifecycleDesc: 'Run before the specification is frozen, because after it is written the same conversation becomes a variation rather than a design decision.',

  what: "There is a moment in every significant buy when the requirement is still negotiable and the market knows more about what is possible than the internal team does. Everything about early supplier involvement follows from that moment: it is worth a great deal, and it is one of the easiest things to do badly. Start by naming which of three activities you are actually doing, because they have different risks and different controls. Consultation asks suppliers what is achievable, what the constraints usually are, what goes wrong, and what the cost drivers look like; the output is knowledge that the buyer applies. Co-design works with a specific supplier to develop a specific solution, which produces shared intellectual property and a real dependency, and should be a funded, bounded engagement rather than a favour. Specification writing is not an activity to share at all: the requirement is the buyers to own, and a bidder drafting it is the failure mode this lesson exists to describe. Most organisations intend consultation and drift into the third. The value is larger than most processes assume. A supplier that expects to bid on a category knows which assumptions in your draft are wrong, which features cost disproportionately, and where the industry has moved without your internal standards noticing. A packaging team that assumed material thickness was a requirement learned from two suppliers that it could be reduced if the pallet geometry changed - an internal engineering change, not a supplier one - and the revised requirement cut unit weight by 14 percent. That kind of answer is not available from a benchmark or a report; it is available only from someone who makes the thing. The risks are equally concrete, and they are worth naming precisely so they can be managed rather than avoided. The first is advantage: the engaged supplier learns what you want, how you think about value, and roughly what you will pay, and it bids from inside that knowledge. The second is capture: the requirement starts to describe the advisers product, usually in good faith, because the adviser is the one who answered the questions. The third is defensibility: a competitor who was never invited can argue that the process was closed, and in a regulated regime that argument has a route. Controls that actually work. Keep a register of every engagement: who was seen, on what date, what was asked, what was given, and what was decided afterwards - the same discipline as a clarification log, applied before the tender exists. Give each engaged supplier the same information and the same question set, so no one receives a privileged brief. Invite deliberately across the field rather than only to the incumbent and the loudest challenger, and include at least one supplier whose architecture differs from the one you are leaning toward. State the purpose in writing at the start: this is market consultation, it creates no expectation of award, and the resulting requirement will be competed. Then the hardest control, which is a design test rather than a process one: read the draft specification back as if you were a bidder who dislikes it. Where the document names a mechanism rather than an outcome, ask whether the outcome could be met another way; where it names a component, a standard or an architecture that exactly one supplier uses, require the internal owner to justify it in terms of the need. A useful habit is to write the requirement twice - once as the business wants it, once as the market could meet it - and to compare. Finally, know what you are not doing. Early involvement is not a preferred-supplier decision, and the fact that the adviser usually wins the tender in badly run processes is not evidence that the adviser is best; it is evidence that the requirement was written to a template only one firm holds. The clean outcome is the opposite: a better requirement, more credible competition, and an award that a supplier who was never in the room can win - as happened in the packaging case, where the eventual winner had attended no session at all.",
  why: [
    'The requirement is negotiable only before it is written, and the market knows what is achievable.',
    'Consultation, co-design and specification writing are three different activities with three different risks.',
    'Engagement gives real advantage to the engaged supplier, and that advantage must be smaller than the value of the better requirement.',
    'A register of who was told what is what makes the process defensible to a supplier who was not invited.',
    'The design test is to read the draft as a hostile bidder and ask whether the outcome could be met another way.'
  ],
  when: [
    'Any requirement the internal team has not bought before.',
    'A specification unchanged for several terms.',
    'Before approving a category strategy or a multi-year roadmap.',
    'When a supplier says the current specification cannot be met.',
    'Where the market has moved faster than the internal standard.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Runs the engagement, keeps the register, and owns the resulting requirement.' },
    { role: 'Requesting Business Owner', resp: 'Decides which market knowledge changes the need and which does not.' },
    { role: 'Technical or Engineering Lead', resp: 'Separates outcome from mechanism and tests the draft against alternative architectures.' },
    { role: 'Legal or Compliance', resp: 'Sets the confidentiality terms, the no-expectation statement, and the regulated disclosure position.' },
    { role: 'Supplier', resp: 'Provides market truth rather than a design for the tender, and competes afterwards on the same terms as everyone.' }
  ],
  inputs: [
    'A draft requirement with the assumptions marked, not hidden.',
    'The field map: who could serve this, and which architectures differ.',
    'The question set used in every session, unchanged.',
    'Confidentiality terms covering both directions of information flow.'
  ],
  outputs: [
    'A register of engagements with date, participant, question, information given and decision taken.',
    'A revised requirement with the reason for each change and who prompted it.',
    'A note on which internal assumptions the market contradicted, and what was kept anyway.',
    'A competition that a non-engaged supplier can enter and win.'
  ],
  controls: [
    'The purpose of every session is stated in writing before it begins, including that no expectation of award arises.',
    'Each engaged supplier receives the same information and the same questions.',
    'The engagement register is retrievable and is referenced in the award file.',
    'Any requirement element that names a mechanism rather than an outcome carries a written justification.',
    'At least one supplier with a different architecture is heard before the requirement freezes.'
  ],
  bestPractices: [
    'Ask what the market thinks is wrong with your draft; suppliers answer that more honestly than they answer a capability question.',
    'Write the requirement twice - as the business wants it and as the market could meet it - and compare.',
    'Keep the sessions short and structured; long conversations drift into design.',
    'Record the assumptions you chose to keep, so the reasoning survives the person.'
  ],
  mistakes: [
    'Consulting one supplier because they were responsive and calling it market engagement.',
    'Letting a free assessment write the specification.',
    'Naming components, standards or architectures that only one supplier uses, without a stated reason.',
    'Treating the advisers eventual win as proof the process was sound.'
  ],
  terms: [
    { term: 'Consultation', def: 'Asking the market what is achievable, with the buyer keeping the decision.' },
    { term: 'Co-design', def: 'Working with a named supplier to develop a solution, which creates shared rights and a real dependency.' },
    { term: 'Requirement capture', def: 'A specification shaped around one suppliers solution, usually in good faith.' },
    { term: 'Engagement register', def: 'The dated record of who was consulted, what was asked, what was given and what was decided.' }
  ],

  thinkingPoints: [
    {
      quote: 'The thickness that was not a requirement.',
      explanation: 'A packaging category assumed a material thickness that every internal standard repeated. Two suppliers in market sessions said the same protection could be achieved with less material if the pallet geometry changed - a change on the buyers side of the wall. The revised requirement cut unit weight 14 percent, and the tender was won by a supplier who had attended no session at all.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: the largest savings are often inside the buyers own specification, and only the market will tell you so before the tender closes the question.',
      reflectionPrompt: 'Which assumption in your current specification has never been challenged by someone who actually makes the thing?',
    },
    {
      quote: 'The free assessment that wrote the plan.',
      explanation: 'A services firm offered a maturity review at no cost and produced a report recommending its own framework. The category plan adopted three of the firms stages as requirements. A challenger pointed out that a different architecture met the same objective at half the run cost - but the specification had named the framework components rather than the outcome, so no alternative could have complied.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: capture is usually the by-product of helpfulness, and it looks exactly like thorough research.',
      reflectionPrompt: 'Which parts of your current requirement came from a supplier document, and has anyone re-derived them?',
    }
  ],

  sopSteps: [
    { title: 'Decide which activity you are doing and say so', role: 'Category Manager',
      desc: 'Choose consultation, co-design or internal drafting, and write the purpose into the invitation: market consultation creates no expectation of award, and anything that does create a dependency is a funded engagement with its own terms.',
      control: 'Every supplier session carries a written purpose statement, and co-design sessions are separately authorised.',
      record: 'Session purpose note with the activity type, participants and the no-expectation wording.',
      pitfall: 'Starting as consultation and drifting into co-design because the conversation was going well.'
    },
    { title: 'Select the field deliberately', role: 'Category Manager',
      desc: 'Invite across the market rather than the loudest: the incumbent, at least one challenger, and at least one supplier whose architecture differs from the solution you are leaning toward. Record why each was chosen.',
      control: 'No engagement round is limited to suppliers who already hold the work, and the differing-architecture invite is documented.',
      record: 'Participant list with the selection reason per supplier.',
      pitfall: 'Hearing only from firms that can deliver the current specification and concluding the market agrees with it.'
    },
    { title: 'Prepare one question set and give one information pack', role: 'Requesting Business Owner',
      desc: 'Write the questions in advance and ask the same ones of everyone, with the same background. Where a supplier asks something the pack does not cover, decide whether to add it for all or answer nothing.',
      control: 'Identical questions and identical information across sessions, with any addition distributed.',
      record: 'Question set, information pack, and the log of additions made after the first session.',
      pitfall: 'A richer conversation with the preferred supplier, which is not unfair on purpose and is indefensible anyway.'
    },
    { title: 'Keep the register as the process runs', role: 'Category Manager',
      desc: 'Date every session, note who attended, what was asked, what was told, and what was decided afterwards. The register is what a competitor who was not invited will be shown, so write it for that reader.',
      control: 'The register is retrievable, referenced in the award file, and complete before the tender is issued.',
      record: 'Engagement register with sessions, content given, and resulting decisions.',
      pitfall: 'Reconstructing the record after a challenge, when the reconstruction becomes the argument.'
    },
    { title: 'Convert knowledge into a changed requirement', role: 'Technical or Engineering Lead',
      desc: 'Take each market answer back to the draft and decide: change the requirement, change the specification route, or keep the assumption and record why the contradiction was declined. Silence is not a decision.',
      control: 'Every material market input is dispositioned with a reason, and declined advice is documented rather than dropped.',
      record: 'Disposition table: input, source, decision, reason, and the requirement change made.',
      pitfall: 'Running excellent sessions and issuing the unchanged specification afterwards.'
    },
    { title: 'Separate outcome from mechanism in the draft', role: 'Technical or Engineering Lead',
      desc: 'Where the requirement names a component, standard or architecture, test whether it could be met another way and whether the named element excludes an alternative. Keep mechanisms only with a written justification tied to the need.',
      control: 'Named mechanisms require a justification, and a requirement that only one supplier can meet is escalated as a design decision.',
      record: 'Mechanism register with the justification and the alternatives considered.',
      pitfall: 'Writing the solution you were shown because the problem was never stated independently.'
    },
    { title: 'Hand the process over clean', role: 'Legal or Compliance',
      desc: 'Issue the tender against the requirement, not the engagement. In a regulated setting, publish the market consultation as part of the preparation record so the field can see the basis, and keep evaluation independent of who advised.',
      control: 'Evaluation panels receive no engagement material beyond the published requirement, and the consultation record is disclosed where the regime requires it.',
      record: 'Award file cross-reference to the engagement register and the disclosure position.',
      pitfall: 'Sending the advisers own inputs to the panel as expert context, which is capture with a citation.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A category team plans three supplier conversations before writing a specification for a new handling system. The incumbent and two firms from its approved list are invited; the third is a supplier whose architecture is different but who has never sold to the organisation.',
      q: 'What is the strongest improvement to the plan?',
      options: [
        { text: 'Nothing; three suppliers across two architectures is a reasonable field.', isCorrect: false, rationale: 'Two of the three come from the buyers own list, so the frame of the question was set by the buyer own history.' },
        { text: 'Add at least one supplier outside the current approved list and write the purpose of the sessions in advance, including that no expectation of award arises.', isCorrect: true, rationale: 'Correct. The register and the stated purpose are what make the process defensible, and an outside participant is what tests the requirement rather than confirming it.' },
        { text: 'Invite all suppliers in the category so nothing can be criticised.', isCorrect: false, rationale: 'That is expensive and usually produces shallow conversations; the control is deliberate selection with a recorded reason.' },
        { text: 'Ask the incumbent to draft the requirement and have the others comment.', isCorrect: false, rationale: 'That is specification writing handed to a bidder, the exact failure mode.' }
      ],
      principle: 'Choose the field to test your assumptions, and say what the conversation is for before it happens.',
    },
    {
      type: 'scenario',
      context: 'Two suppliers say the specified material thickness can be reduced if the buyers pallet geometry changes. The engineering team says the pallet standard is fixed for twenty years and does not want to reopen it.',
      q: 'What is the correct handling?',
      options: [
        { text: 'Drop the suggestion; the internal standard is not procurement to change.', isCorrect: false, rationale: 'That is the most common way early involvement produces nothing, and it declines the largest available saving on a procedural argument.' },
        { text: 'Take it to the owner of the standard as a decision with numbers - what the change costs internally, what it saves per unit, and who absorbs the transition - and record the outcome either way.', isCorrect: true, rationale: 'Correct. Procurement owns the routing of the information, not the engineering decision; declining it silently is the failure.' },
        { text: 'Change the specification to allow thinner material and see what happens.', isCorrect: false, rationale: 'That moves the requirement without the owner having tested the consequence.' },
        { text: 'Ask the suppliers to fund the pallet change.', isCorrect: false, rationale: 'Possible, but only after the change is shown to be worth making.' }
      ],
      calcWork: 'Unit weight down 14 percent against a pallet changeover cost spread across the volume: the payback is usually measured in months, which is the number the standard owner needs.',
      principle: 'Market knowledge that lands on an internal assumption must be dispositioned with numbers, not quietly dropped.',
    },
    {
      type: 'knowledge',
      q: 'What distinguishes consultation from co-design in early engagement?',
      options: [
        { text: 'Nothing except duration.', isCorrect: false, rationale: 'They differ in what is created and who owns it, not in length.' },
        { text: 'Consultation buys information and the buyer keeps the decision; co-design develops a solution with a named supplier, creating shared rights and a dependency, and should be funded and bounded.', isCorrect: true, rationale: 'Correct. That is why co-design needs its own authorisation and terms.' },
        { text: 'Co-design is only used for research contracts.', isCorrect: false, rationale: 'It is any work where the supplier helps shape what will be bought.' },
        { text: 'Consultation is not allowed in regulated regimes.', isCorrect: false, rationale: 'It is allowed and common; it must be transparent and non-discriminatory.' }
      ],
      principle: 'Name the activity, because the controls and the consequences differ.',
    },
    {
      type: 'knowledge',
      q: 'What is the practical test for supplier capture in a draft specification?',
      options: [
        { text: 'Whether the supplier community approved the document.', isCorrect: false, rationale: 'Approval by one part of the market is the symptom, not a test.' },
        { text: 'Read it as a hostile bidder: where it names a mechanism, standard or component rather than an outcome, ask whether an alternative architecture could meet the same need, and require a written justification where it cannot.', isCorrect: true, rationale: 'Correct. Capture survives because nobody restates the requirement independently; this does exactly that.' },
        { text: 'Whether the specification is longer than the last one.', isCorrect: false, rationale: 'Length is unrelated to ownership.' },
        { text: 'Whether the eventual tender attracts more than four bids.', isCorrect: false, rationale: 'A number of bids can be healthy while every one of them is the same architecture.' }
      ],
      principle: 'A requirement owned by the buyer can be met in several ways; a captured one can be met in one.',
    },
    {
      type: 'scenario',
      context: 'A competitor who was not consulted sends a pre-tender question saying the requirement appears written around one suppliers platform and asks what market engagement took place.',
      q: 'What is the correct response?',
      options: [
        { text: 'Answer that no engagement took place, to avoid the argument.', isCorrect: false, rationale: 'That is untrue if sessions happened, and the register exists.' },
        { text: 'Reply from the engagement register: who was seen and when, what information was given, how the requirement changed as a result, and the published basis of the mechanisms named - then decide whether the criticism has merit and correct the document if it has.', isCorrect: true, rationale: 'Correct. The register is the defence, and a genuine capture finding is better fixed before the tender than litigated after it.' },
        { text: 'Withdraw and re-tender immediately.', isCorrect: false, rationale: 'That concedes a point that may not exist and loses months.' },
        { text: 'Invite the competitor to a private briefing before answering.', isCorrect: false, rationale: 'A private briefing is the next complaint.' }
      ],
      principle: 'The record of who was told what is what turns an allegation into an answer.',
    }
  ],
  relSop: 'sop-procurement-intake',
  rel: {
    concepts: ['early-supplier-involvement', 'supplier-led-requirement-risk', 'specification', 'sourcing-strategy', 'supplier-market-analysis', 'conflict-of-interest'],
    sops: ['sop-procurement-intake', 'sop-rfq', 'sop-rfp', 'sop-supplier-evaluation'],
    checklists: ['cl-requirement-definition', 'cl-sourcing-strategy', 'cl-supplier-identification'],
    templates: ['tpl-rfi', 'tpl-rfp', 'tpl-bid-instructions'],
    calcs: ['calc-make-vs-buy', 'calc-should-cost'],
    decisions: ['rfi-or-rfq', 'sourcing-method', 'make-or-buy'],
    kpis: ['kpi-bid-rate', 'kpi-sourcing-coverage', 'kpi-cycle-time'],
    glossary: ['gloss-rfi', 'gloss-rfp', 'gloss-sow']
  },
  labMission: {
    title: 'Mission 28.1: Ask the Market What Is Wrong With Your Draft',
    desc: 'Run one structured consultation on a requirement you are about to freeze.',
    tasks: [
      'Take one live specification and mark every assumption you would struggle to justify to an engineer from another industry.',
      'Write the question set and the purpose statement, then hold one session with a supplier who does not currently hold the work.',
      'Disposition each answer as change, keep with reason, or escalate with numbers, and start the register that a competitor could be shown.'
    ],
    ctaLabel: 'Open Make versus Buy',
    ctaHref: '#/calc/calc-make-vs-buy',
    secondaryLabel: 'Open the Requirement Definition Checklist',
    secondaryHref: '#/cl/cl-requirement-definition'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-innovation-deal-structure',
  title: 'Buying an Innovation Without Buying a Prototype',
  module: 'Module 28: Supplier Innovation and Early Engagement - Shaping the Work Before It Is Priced',
  kicker: 'Function 28.2',
  tier: 'practitioner',
  tagline: 'A pilot is an option, not a purchase. Price the option, write the kill criteria, and agree the scale-up terms while you still have something to trade.',
  desc: "This function covers the commercial structure of buying something that does not yet work reliably: staged funding with decisions at gates, what evidence each stage must produce, why a free pilot is the most expensive kind, how to define the difference between a demonstration and an operating model, and how to end an experiment without ending the relationship or the category.",
  duration: '23 mins',
  lifecycleStage: 'Stage 13: Commercial Negotiation',
  lifecycleDesc: 'Set at the negotiation of the trial itself, because the terms that matter are agreed before the dependency exists.',

  what: "An innovation purchase is not a purchase of a thing; it is a purchase of an option on a thing, priced as if it were the thing. That reframing changes every term. Start with the sequence of stages and what each one is for. A demonstration shows that the supplier can do it, usually on a prepared site, with their engineers present. A pilot shows that you can do it - in your conditions, with your people, at a fraction of your volume, with your integration. A trial at scale shows that the economics survive volume, seasonality and the boring parts. Each stage answers a different question, and the common failure is approving the next stage without knowing which question the previous one answered. So write, before any money moves, what evidence ends each stage and what would stop it. A performance result is not an operating model. The result of a good pilot is a costed way to run the thing: staffing, cycle time at volume, exception handling, the integration work nobody estimated, the training, the seasonal peak, and the effect on the sites that were not in the trial. If the pilot produces a slide with a percentage improvement and no costed model, it produced a demonstration. That distinction is worth real money because scale-up is where the price is, and the price is negotiated when the alternative still exists. Which brings the most expensive sentence in this category: the free pilot. A supplier who funds the trial has bought something - your site, your data, your redesign, and the fact that by the time the trial ends your operation is shaped around their equipment and no other supplier can be qualified inside your operating plan. The warehouse automation case is the archetype: the pilot was free, the test succeeded, the site had been redesigned around the machinery, and the scale-up price came out at 2.6 times the modelled cost with no alternative that could still be qualified. Nothing was dishonest; the commercial structure simply had no scale-up terms. So agree the scale-up price and terms before the pilot, as a range or a formula, and treat a supplier who resists that as telling you something. Staged funding is the instrument. Each stage gets a defined budget, a defined evidence test, a named decision-maker and a date. Kill criteria are written at the start, which makes stopping a planned event rather than an admission of error - and an experiment that cannot be stopped becomes a programme. A useful discipline is a maximum number of trials: if the same pilot has run twice, the third must be justified by naming what additional evidence it produces that the first two could not, because otherwise the answer is that the evidence is not the obstacle. Keep the incumbent in the room. A trial against no alternative is not a comparison; it is a demonstration with a budget. The cheapest way to preserve the option is to run the trial while the existing supply continues on its current terms, and to price the alternative path - do nothing, do it differently, or do it later - alongside the innovation. On the supplier side, ask what they are optimising. A supplier offering to co-fund a development is buying a reference site, a design win, or a learning that will be sold to your competitors; that is legitimate, and it should be priced and restricted rather than accepted as generosity. Field-of-use limits, contribution to the cost, and the rights in what is learned are the trade. Finally, report honestly. A pilot result is evidence about a decision, not a saving. Booking pilot benefits converts an experiment into a number in a report that nobody can validate, and it corrupts the baseline for the eventual scale-up. The reporting discipline that keeps the whole thing sane is small: state the stage, the evidence produced, the decision taken, and the money actually committed.",
  why: [
    'An innovation purchase is an option on a thing, and options are priced differently from things.',
    'A demonstration shows the supplier can do it; a pilot shows you can, in your conditions.',
    'A performance result without a costed operating model is not evidence for scale-up.',
    'A free pilot buys the supplier your design dependency, and the scale-up terms must be agreed before that exists.',
    'Kill criteria written at the start make stopping a plan rather than an admission.',
    'A pilot result reported as a saving corrupts the baseline it will later be measured against.'
  ],
  when: [
    'Whenever a supplier presents innovation as the differentiator.',
    'Before authorising any pilot, especially a free or supplier-funded one.',
    'When a trial has already run twice.',
    'Before a multi-year roadmap built on an unproven technology.',
    'When a pilot success is about to be reported as a benefit.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Builds the stage gates, the kill criteria and the scale-up terms, and keeps the alternative live.' },
    { role: 'Requesting Business Owner', resp: 'Defines what the operating model must look like and owns the decision at each gate.' },
    { role: 'Finance', resp: 'Prices the option, funds the stages, and refuses pilot benefits in the savings report.' },
    { role: 'Legal', resp: 'Sets the scale-up price mechanism, the rights in what is learned, and the data terms.' },
    { role: 'Supplier', resp: 'States what they are gaining from funding and accepts field-of-use limits.' }
  ],
  inputs: [
    'The claim being tested, in one sentence, with the mechanism assumed.',
    'The current operating baseline and the do-nothing cost.',
    'The stage plan: what each stage must evidence, who decides, and when.',
    'A modelled scale-up cost, prepared independently of the supplier.'
  ],
  outputs: [
    'A staged funding plan with evidence tests, decision-makers, dates and kill criteria.',
    'An agreed scale-up price mechanism signed before the pilot runs.',
    'A costed operating model from the pilot, not only a performance result.',
    'A decision record naming what the trial proved, what it cost and what happens next.'
  ],
  controls: [
    'No stage is funded without a written evidence test and a named decision-maker.',
    'Scale-up price or formula is agreed before the pilot, with the alternative path priced alongside.',
    'A repeated trial must state what additional evidence it produces.',
    'Pilot results are recorded as evidence, never booked as savings.',
    'Supplier-funded developments carry field-of-use terms and a data position.'
  ],
  bestPractices: [
    'Model the scale-up cost yourself before the trial, so the offered price has something to be compared against.',
    'Write the stop condition in the same paragraph as the budget.',
    'Keep the existing supply running on its current terms during the trial.',
    'Ask the supplier what they are buying from the deal, and price that back.'
  ],
  mistakes: [
    'Accepting a free pilot without scale-up terms.',
    'Reading a demonstration on a prepared site as proof of operability.',
    'Authorising a third trial without naming what new evidence it produces.',
    'Booking pilot benefits and then measuring the scale-up against them.'
  ],
  terms: [
    { term: 'Stage gate', def: 'A defined point where evidence is tested and the next tranche of funding is decided or refused.' },
    { term: 'Kill criteria', def: 'The conditions written before the work that end the experiment, making a stop a planned event.' },
    { term: 'Operating model', def: 'The costed description of running the thing at volume, including exceptions and staffing.' },
    { term: 'Field-of-use', def: 'A limit on where a jointly developed improvement may be exploited, usually to keep it out of the buyers competitors hands.' }
  ],

  thinkingPoints: [
    {
      quote: 'The free pilot that cost 2.6 times.',
      explanation: 'A warehouse automation trial was signed at no charge with the price to be agreed after successful testing. The test passed. By then the site layout, the shift pattern and the receiving process had been redesigned around the equipment, and the scale-up price offered was 2.6 times the modelled cost. There was no agreed price mechanism and no alternative that could be qualified inside the operating plan, so the negotiation started from a dependency rather than from a comparison.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a supplier-funded pilot is a purchase of your design decision, and the price of it appears at scale-up.',
      reflectionPrompt: 'For the last free trial you authorised, what was the agreed scale-up price mechanism, and who could still deliver the same outcome?',
    },
    {
      quote: 'The third trial of the same thing.',
      explanation: 'A route-optimisation tool was piloted twice, each time at one depot in one season, with strong results and no scale-up decision. The third proposal was approved only after the sponsor was asked what evidence the first two had not produced: the driver behaviour change across eleven other depots, winter conditions, and the costed staffing model. That trial produced the model, and the decision followed within a quarter.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: repeated trials usually signal a missing decision-maker or missing cost evidence, not missing technical proof.',
      reflectionPrompt: 'Which pilot in your portfolio has run more than once, and what would have to be true for it to end this year?',
    }
  ],

  sopSteps: [
    { title: 'State the claim and the alternative in one sentence', role: 'Category Manager',
      desc: 'Write what is being tested, what mechanism is assumed, and what the do-nothing or do-it-differently path costs. A trial without a priced alternative cannot produce a decision, only a result.',
      control: 'Every innovation proposal carries the claim, the assumed mechanism and the costed alternative on the first page.',
      record: 'Innovation brief with claim, mechanism, baseline and alternative path.',
      pitfall: 'Testing whether a technology works instead of whether it is the best available answer.'
    },
    { title: 'Design the stages and the evidence each must produce', role: 'Requesting Business Owner',
      desc: 'Separate demonstration, pilot and scale trial, and define for each the evidence that ends it: performance in your conditions, a costed operating model, and volume behaviour including exceptions and seasonality.',
      control: 'No stage is approved without a written evidence test, a named decision-maker and a date.',
      record: 'Stage plan with evidence tests, owners, dates and budgets.',
      pitfall: 'Approving the next stage because the last one looked good, without asking which question it answered.'
    },
    { title: 'Write the kill criteria before the money moves', role: 'Finance',
      desc: 'Define the conditions that stop the work - cost per unit above a stated figure, an integration effort beyond a stated bound, a benefit that cannot be evidenced - and who may invoke them. Stopping must be a planned event.',
      control: 'Kill criteria are recorded at the start of each stage and reviewed at the gate, and a stage that meets them is stopped.',
      record: 'Kill criteria per stage with the invoking authority and the outcome at each gate.',
      pitfall: 'An experiment that cannot be stopped becoming a programme with a budget line.'
    },
    { title: 'Agree the scale-up terms before the pilot', role: 'Legal',
      desc: 'Set the price mechanism or range for full implementation while the alternative still exists, together with data rights, access to configuration, and what happens if the supplier is acquired or exits. Resist the offer of a free trial that comes without these terms.',
      control: 'No supplier-funded pilot proceeds without a scale-up price mechanism and a data and portability position.',
      record: 'Scale-up term sheet with price mechanism, data rights, portability and change-of-control position.',
      pitfall: 'Negotiating from a redesigned operation, which is not a negotiation.'
    },
    { title: 'Keep the incumbent and the alternative live', role: 'Category Manager',
      desc: 'Run the trial against continuing supply on current terms, and keep at least one alternative route warm - a second supplier qualified, an internal option, or a deferral that costs little. Comparison is what turns a result into a decision.',
      control: 'The trial authorisation names the alternative kept available and the cost of keeping it.',
      record: 'Alternative position note with qualification status, cost and review date.',
      pitfall: 'A successful trial that has nothing to be compared against except the status quo it already replaced.'
    },
    { title: 'Price what the supplier is buying', role: 'Finance',
      desc: 'Ask what the supplier gains - a reference site, a design win, learning to sell onward - and reflect it in contribution, field-of-use limits and exclusivity periods rather than accepting funding as generosity.',
      control: 'Supplier-funded work carries a stated benefit to the supplier and a matching restriction or contribution.',
      record: 'Funding note with supplier benefit, field-of-use restriction and duration.',
      pitfall: 'Discovering your jointly developed improvement running at two competitors two years later, lawfully.'
    },
    { title: 'Report the stage, not the story', role: 'Finance',
      desc: 'Record what the trial proved, what it cost, what the operating model says and what was decided. Keep pilot results out of the savings ledger, since booking them corrupts the baseline the scale-up will be measured against.',
      control: 'Savings reporting excludes pilot results, and each gate decision is retrievable with its evidence.',
      record: 'Gate decision record with evidence, cost, decision and the next date.',
      pitfall: 'A portfolio of successful pilots and no scaled decisions.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A supplier offers a free twelve-week trial of an inspection system, with the price to be agreed if the trial succeeds. The trial would require moving two production lines and retraining thirty operators.',
      q: 'What is the correct commercial response?',
      options: [
        { text: 'Accept; a free trial is low risk and the evidence will speak for itself.', isCorrect: false, rationale: 'The risk is not the trial fee, it is the redesign and the missing price mechanism.' },
        { text: 'Agree to the trial only with a scale-up price mechanism fixed now, the data and configuration rights stated, the alternative route kept warm, and kill criteria written with the budget.', isCorrect: true, rationale: 'Correct. Those four terms are what convert a free option into a priced one; without them the negotiation happens after the dependency exists.' },
        { text: 'Ask for the trial to be paid so it feels serious.', isCorrect: false, rationale: 'Paying without terms changes nothing, and a fee is not leverage.' },
        { text: 'Refuse innovation terms and stay with manual inspection.', isCorrect: false, rationale: 'That may be the right answer eventually, but it should follow the evidence test rather than pre-empt it.' }
      ],
      principle: 'Price the option before the operation is reshaped around it.',
    },
    {
      type: 'scenario',
      context: 'A pilot report shows a 22 percent cycle-time improvement at one depot in summer. The sponsor proposes a second pilot at the same depot in winter to confirm the result.',
      q: 'What should be asked before authorising it?',
      options: [
        { text: 'Nothing; confirming a result across seasons is sound method.', isCorrect: false, rationale: 'Season is one variable; the decision needs the other eleven depots and the costed model.' },
        { text: 'What evidence would the second pilot produce that the first could not - specifically the costed operating model, the staffing and behaviour change across the other sites, and the integration cost - and if the answer is not a decision, name who has to decide and what would stop it.', isCorrect: true, rationale: 'Correct. Repeated pilots usually signal missing cost evidence or a missing decision-maker, and the kill criteria expose which.' },
        { text: 'Ask the supplier to run the winter pilot free of charge as well.', isCorrect: false, rationale: 'That deepens the dependency without adding the missing evidence.' },
        { text: 'Scale immediately on the 22 percent result.', isCorrect: false, rationale: 'That is the mirror-image error: a demonstration treated as an operating model.' }
      ],
      principle: 'A new trial must be justified by the decision it will enable, not by the result it will repeat.',
    },
    {
      type: 'knowledge',
      q: 'What is the difference between a demonstration and a pilot?',
      options: [
        { text: 'Duration and cost.', isCorrect: false, rationale: 'Both vary and neither defines the difference.' },
        { text: 'A demonstration shows the supplier can make it work, typically on prepared conditions; a pilot shows the buyer can operate it, in their conditions, with their people and their integration.', isCorrect: true, rationale: 'Correct. That is why a demonstration result cannot support a scale-up decision.' },
        { text: 'A demonstration is internal and a pilot is external.', isCorrect: false, rationale: 'The terms describe evidence stages, not locations.' },
        { text: 'A demonstration is free and a pilot is paid.', isCorrect: false, rationale: 'Commercial terms are unrelated to the evidence type.' }
      ],
      principle: 'Ask whose conditions produced the result, because that is whose risk it proves.',
    },
    {
      type: 'knowledge',
      q: 'Why must pilot results be kept out of the savings ledger?',
      options: [
        { text: 'Because finance policy forbids it.', isCorrect: false, rationale: 'The reason is measurement, not policy.' },
        { text: 'Because a pilot measures evidence about a decision, and booking it as a saving sets a baseline the eventual scale-up will be wrongly measured against.', isCorrect: true, rationale: 'Correct. It also makes the portfolio look successful while nothing has been implemented.' },
        { text: 'Because pilots are usually unsuccessful.', isCorrect: false, rationale: 'Irrelevant to how the number is classified.' },
        { text: 'Because the supplier has not invoiced yet.', isCorrect: false, rationale: 'Invoicing is not the test of a benefit.' }
      ],
      principle: 'Report the stage, the evidence and the decision; book savings only when the operation changes.',
    },
    {
      type: 'scenario',
      context: 'A supplier offers to fund 60 percent of a joint development, retaining the right to reuse improvements. Your operations team wants to accept, since the money is real.',
      q: 'What is the correct handling?',
      options: [
        { text: 'Accept; supplier funding reduces cost with no downside.', isCorrect: false, rationale: 'The downside is the learning leaving the building, and it is priced in the clause nobody reads.' },
        { text: 'Establish what the supplier is buying, then negotiate the trade: a field-of-use restriction and period, a contribution adjustment, or full ownership at a higher price - and record the decision with the exposure it accepts.', isCorrect: true, rationale: 'Correct. Reuse rights are a real asset; the choice is to restrict, price or accept them knowingly rather than discover them later.' },
        { text: 'Refund the offer and fund it entirely internally.', isCorrect: false, rationale: 'That may be the right answer, but only after the trade is priced.' },
        { text: 'Accept and ask for a side letter excluding your two largest competitors.', isCorrect: false, rationale: 'A side letter without a defined field of use and duration is unenforceable theatre.' }
      ],
      principle: 'Supplier funding buys something from you; find out what, and price it before signing.',
    }
  ],
  relSop: 'sop-negotiation-preparation',
  rel: {
    concepts: ['innovation-deal-structure', 'pilot-to-scale-gap', 'background-and-foreground-rights', 'make-or-buy', 'should-cost', 'vendor-lockin-and-portability'],
    sops: ['sop-negotiation-preparation', 'sop-contract-review', 'sop-savings-validation', 'sop-rfp'],
    checklists: ['cl-negotiation', 'cl-contract-review', 'cl-savings-validation'],
    templates: ['tpl-business-case', 'tpl-negotiation-planner', 'tpl-exception-request'],
    calcs: ['calc-make-vs-buy', 'calc-multi-year-contract-cost', 'calc-should-cost', 'calc-savings-analysis'],
    decisions: ['make-or-buy', 'negotiate-or-accept', 'approve-exception'],
    kpis: ['kpi-roi', 'kpi-savings-realization', 'kpi-cost-avoidance'],
    glossary: ['gloss-capex', 'gloss-opex', 'gloss-run-rate']
  },
  labMission: {
    title: 'Mission 28.2: Price the Option Before the Redesign',
    desc: 'Take one live pilot proposal and put the commercial structure around it.',
    tasks: [
      'Write the claim in one sentence and cost the do-nothing and do-it-differently paths, so the trial has something to be compared against.',
      'Draft the stage plan with the evidence test, decision-maker, date and kill criteria for each stage, and note which stage you are actually funding.',
      'Agree in writing what the scale-up price mechanism would be, and what the supplier gains from any funding they provide.'
    ],
    ctaLabel: 'Open Make versus Buy',
    ctaHref: '#/calc/calc-make-vs-buy',
    secondaryLabel: 'Open the Negotiation Planner',
    secondaryHref: '#/tpl/tpl-negotiation-planner'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-rights-and-dependency-in-joint-work',
  title: 'Who Owns What Came Out of It: Rights, Data and Dependency',
  module: 'Module 28: Supplier Innovation and Early Engagement - Shaping the Work Before It Is Priced',
  kicker: 'Function 28.3',
  tier: 'executive',
  tagline: 'Innovation disputes are almost never about the idea. They are about who may use what was learned, whose data produced it, and who can walk away.',
  desc: "This function covers the governance of joint work at the level a board has to approve: background and foreground rights, field-of-use and exclusivity as priced positions, the data your operations generate on supplier systems, the dependency an innovation partnership creates, and the exit from an innovation deal that has not worked.",
  duration: '20 mins',
  lifecycleStage: 'Stage 15: Contract Formulation & Legal Review',
  lifecycleDesc: 'Approved at contract level, because these positions are decided once, cheaply, or never, at the most expensive price.',

  what: "A board approves an innovation partnership for what it will produce and inherits it for what it will own. The ownership questions are settled in a document nobody in the room reads closely, and they are almost impossible to reopen once the work has started. Take the two categories of rights. Background is what each party brings: your process knowledge, your data, your models, your problem definition, and the suppliers existing platform, methods and tooling. Foreground is what is created during the work. The naive position - that the buyer owns everything created with its money - fails on contact with reality, because most of what is created is an improvement to the suppliers platform, and a clause claiming it is either fought, voided in practice, or quietly accepted and then ignored. The workable position is a defined split: you own the improvements to your process and your data, the supplier owns its platform, and the licence you receive to use the foreground is scoped by field, duration, territory and revocability - and that scope has a price. Which is the board-level point: exclusivity is a purchase, not a clause. A field-of-use restriction that keeps your jointly developed improvement out of your two largest competitors hands is worth real money to you and costs the supplier real revenue, so it will be priced. What you should not accept is the default position, which is no restriction at all and no price for it - the state in which you fund a suppliers product development for the whole market. The second asset is data, and it is the least protected thing in most arrangements. Your operations produce telemetry, exception records, cycle times, defect patterns and usage data while running on supplier-owned systems. Contracts routinely say nothing about it, or say the supplier may use anonymised and aggregated data for improvement - which sounds reasonable until the aggregation is what makes their benchmark valuable and the anonymisation is what makes your contribution untraceable. The positions worth holding are narrow and specific: you own the data your operations generate, you receive it in a documented usable format with a right to a copy at any time and on exit, restrictions on personal or regulated data are stated rather than assumed, and any supplier use of your data is defined by purpose, not by the word anonymised. The third is dependency, which is what an innovation partnership actually creates. A successful joint development usually means the supplier understands your process better than anyone, your operation is configured around their platform, and the market has learned that you are a reference site. That is a commercial position, and the board should see it as one: what is the switching cost, how long would requalification take, what would it cost to run the process on an alternative, and what does it cost to keep one warm? The answers are usually worse than the operating team believes, and the mitigation is cheap if decided at the start - portability of configuration and data, escrow where the tooling matters, a second source under development, or a term that expires rather than renews. Finally, exit from a deal that has not worked, which is where the rights questions stop being theoretical. The list is short: what you keep, what the supplier keeps, what you must be given to run the process yourself, what happens to improvements made to your process, who pays for the transition, and what the supplier is still permitted to do with what was learned. A joint development agreement that answers those five questions is a serious document; one that does not is a partnership until the first difficulty. The governance habit that catches all of this is small and reliable: before signature, ask two questions in the room - what does this clause let the supplier do with our work, and what does it let us do with theirs, in five years, without asking permission?",
  why: [
    'Foreground ownership is decided before the work, cheaply, or after the work, expensively.',
    'Exclusivity and field-of-use are priced positions; the default of no restriction is a subsidy to the market.',
    'Data your operations generate on a supplier system is the least protected asset in the arrangement.',
    'A successful innovation partnership creates a commercial dependency the board should see as one.',
    'A joint development agreement is only serious once it answers what each side keeps and what must be handed over.'
  ],
  when: [
    'Approving any joint development, co-design or supplier-funded innovation.',
    'Before a pilot that will place your data or configuration on supplier systems.',
    'At renewal of a partnership where the switching cost has grown.',
    'When the supplier asks to use results as a reference or case study.',
    'When an innovation deal is failing and the exit terms are being read for the first time.'
  ],

  raci: [
    { role: 'Board or Executive Sponsor', resp: 'Approves the ownership and exclusivity position and the dependency it accepts.' },
    { role: 'Legal', resp: 'Drafts background and foreground terms, field-of-use, licence scope, data rights and exit.' },
    { role: 'Category Manager', resp: 'Prices the restriction, keeps the alternative route warm, and states the switching position.' },
    { role: 'Data or IT Owner', resp: 'Defines the format, access and retention of operational data and the portability of configuration.' },
    { role: 'Supplier', resp: 'States what it retains, what it may reuse, and what it will hand over on exit.' }
  ],
  inputs: [
    'The list of background on both sides, written before the work starts.',
    'The proposed foreground split, licence scope and field-of-use.',
    'The data the operations will generate, with its format and location.',
    'The switching analysis: requalification time, alternative suppliers, configuration portability.'
  ],
  outputs: [
    'A signed background and foreground schedule with a priced field-of-use position.',
    'A data clause stating ownership, format, access, retention and permitted supplier use.',
    'An exit schedule answering the five questions: what each side keeps, what is handed over, who pays, what may be reused.',
    'A dependency statement for the board with the switching cost and the option kept warm.'
  ],
  controls: [
    'No joint development starts without a written background schedule from both parties.',
    'Field-of-use and exclusivity are decided with a price attached, and the decision is recorded.',
    'Operational data ownership, format and access rights are contractual, not assumed.',
    'Every innovation partnership carries a switching analysis reviewed at renewal.',
    'Exit terms are tested against a scenario before signature, not read for the first time during a dispute.'
  ],
  bestPractices: [
    'Ask the two five-year questions before signature: what may the supplier do with our work, and what may we do with theirs.',
    'Treat anonymised and aggregated as a defined purpose, not a reassuring adjective.',
    'Buy the narrow right you need rather than the absolute ownership you will not get.',
    'Put the dependency statement in the same paper that asks for the money.'
  ],
  mistakes: [
    'Claiming all foreground and accepting none of the price.',
    'Leaving data terms to the technical teams because the schedule was tight.',
    'Reading the exit clause for the first time when the partnership is failing.',
    'Approving a reference-site role without deciding what publicity is permitted.'
  ],
  terms: [
    { term: 'Background', def: 'What each party brings before the work, which stays theirs and is licensed for the purpose of the project.' },
    { term: 'Foreground', def: 'What is created during the work, whose ownership and licence are the substance of the agreement.' },
    { term: 'Field of use', def: 'The defined market, application or territory in which a jointly developed improvement may be exploited.' },
    { term: 'Portability', def: 'The ability to move configuration, data and process knowledge to another provider without supplier permission.' }
  ],

  thinkingPoints: [
    {
      quote: 'The improvement that went to two competitors.',
      explanation: 'A scheduling model was co-developed with the supplier funding part of the work and retaining the right to reuse improvements. Two years later the same model was in production at the buyers two largest competitors, lawfully. The field-of-use clause had been read once, at signature, by nobody in procurement, and the buyer had effectively financed product development for the whole market while believing it had bought an advantage.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: reuse rights are an asset, and leaving them unpriced converts a purchase into a subsidy.',
      reflectionPrompt: 'In your current joint developments, what is the supplier permitted to do with what was learned, and who priced that?',
    },
    {
      quote: 'The data that was not yours to take.',
      explanation: 'A production optimisation partnership ended after four years when the buyer tried to move to a new provider. The process configuration and eighteen months of exception data lived inside the supplier platform; the contract gave a right to reports but no right to the underlying data in a usable format, and no escrow for the configuration. The transition took eleven months and needed a concession on price that had nothing to do with the service.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: portability is a contractual asset, and its absence is paid for at the moment you have least leverage.',
      reflectionPrompt: 'If your most embedded supplier partnership ended tomorrow, what could you take out, in what format, and who would have to agree?',
    }
  ],

  sopSteps: [
    { title: 'Schedule the background before the work starts', role: 'Legal',
      desc: 'Ask each party to list what it brings: your process knowledge, data, models and problem definition; their platform, methods and tooling. The schedule is what later disputes are measured against.',
      control: 'No joint development is authorised without a two-sided background schedule attached to the agreement.',
      record: 'Background schedule with each partys entries, dated and signed.',
      pitfall: 'Starting the work with an undocumented list in one teams head.'
    },
    { title: 'Split the foreground deliberately and price the scope', role: 'Board or Executive Sponsor',
      desc: 'Decide what you own (improvements to your process and data) and what the supplier owns (its platform), then buy the licence scope you need - field, territory, duration, revocability - and record the price of any exclusivity.',
      control: 'The licence scope and any field-of-use restriction are approved with a stated price and a recorded reason.',
      record: 'Foreground and licence schedule with scope, duration, restriction and price.',
      pitfall: 'Claiming everything, getting nothing, and paying for neither.'
    },
    { title: 'Define the data position in operational terms', role: 'Data or IT Owner',
      desc: 'State who owns the data your operations generate, in what format you can have it, how often, on what notice, and on exit. Replace anonymised and aggregated with a defined permitted purpose.',
      control: 'Data ownership, format, access and exit copy rights are contractual, and permitted supplier use is purpose-limited.',
      record: 'Data schedule with ownership, format, access route, retention and permitted purposes.',
      pitfall: 'A right to reports where the value is in the underlying data.'
    },
    { title: 'Write the exit schedule and test it once', role: 'Category Manager',
      desc: 'Answer five questions in the agreement: what each side keeps, what must be handed over to run the process independently, what happens to improvements made to your process, who pays for transition, and what the supplier may still do with the learning. Walk one scenario through it before signature.',
      control: 'Exit terms are tested against a written scenario at approval, and the test result is retained with the contract.',
      record: 'Exit schedule with the five answers and the scenario test result.',
      pitfall: 'Discovering at exit that the clause describes cooperation you cannot compel.'
    },
    { title: 'State the dependency to the board', role: 'Category Manager',
      desc: 'Quantify what switching would cost and take: requalification time, configuration portability, alternative suppliers able to serve, and the cost of keeping one warm. Put that in the same paper that asks for the money.',
      control: 'Every innovation partnership approval carries a switching analysis and the option kept available.',
      record: 'Dependency statement with requalification time, alternatives, cost to keep warm and review date.',
      pitfall: 'A partnership reviewed as a delivery success while its switching position quietly hardens.'
    },
    { title: 'Decide the publicity position', role: 'Legal',
      desc: 'A supplier wants a reference site and a case study. Decide what may be named, what metrics may be published, whether competitors may be told the detail, and what you receive for it. Make it a decision rather than a default accepted in a project plan.',
      control: 'Publicity and reference rights are approved separately with stated limits and consideration.',
      record: 'Publicity approval with scope, metrics permitted, duration and consideration.',
      pitfall: 'Learning that your transformation is a conference slide from a competitor.'
    },
    { title: 'Review the position at renewal, not at exit', role: 'Board or Executive Sponsor',
      desc: 'At each renewal, re-read the licence scope, the data position, the portability and the dependency statement, and decide whether to buy any additional right while you still hold something to trade.',
      control: 'Renewal of a joint development requires the rights position re-approved with any changes priced.',
      record: 'Renewal rights review with changes made, prices paid and the position accepted.',
      pitfall: 'The only moment leverage exists being the renewal you did not prepare for.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A co-development agreement says each party owns what it creates, the buyer gets a perpetual licence to use the results internally, and the supplier may improve and commercialise its platform. Legal asks the board to approve.',
      q: 'What is the material question to put before approval?',
      options: [
        { text: 'Whether the licence is royalty-free.', isCorrect: false, rationale: 'Important, but not the exposure in this wording.' },
        { text: 'Whether improvements made to our process using our data are inside the suppliers platform rights - that is, whether what we funded can lawfully be sold to our competitors, and what a field-of-use restriction would cost.', isCorrect: true, rationale: 'Correct. That single question decides whether the arrangement buys an advantage or subsidises a market.' },
        { text: 'Whether the term is five years.', isCorrect: false, rationale: 'Term length does not address ownership.' },
        { text: 'Whether governance meetings are monthly.', isCorrect: false, rationale: 'Governance cadence is not a rights position.' }
      ],
      principle: 'Ask what the supplier may do with your work in five years without asking you.',
    },
    {
      type: 'scenario',
      context: 'A partnership is ending. The buyer wants eighteen months of exception data and the process configuration. The contract grants monthly reports and states the supplier owns all system data.',
      q: 'What is the realistic position?',
      options: [
        { text: 'The buyer will receive both, since the data came from its operations.', isCorrect: false, rationale: 'That is the intuition, and it is exactly what the clause was drafted to defeat.' },
        { text: 'The buyer holds reports only; the underlying data and configuration are the suppliers by contract, so the transition must be negotiated - which is the cost of the missing data and portability terms, and the reason to buy them at the next renewal while leverage exists.', isCorrect: true, rationale: 'Correct. The lesson is that these rights are cheap before signature and expensive after, and a renewal is the last moment they are tradeable.' },
        { text: 'Escrow applies automatically to configuration.', isCorrect: false, rationale: 'Escrow is a negotiated instrument, not a default.' },
        { text: 'A regulator would order the data handed over.', isCorrect: false, rationale: 'Only where a specific obligation says so; commercial data terms otherwise stand.' }
      ],
      principle: 'Portability is bought in advance or paid for at exit; there is no third option.',
    },
    {
      type: 'knowledge',
      q: 'What is background in a joint development agreement?',
      options: [
        { text: 'The commercial case for the project.', isCorrect: false, rationale: 'That is the business case.' },
        { text: 'What each party brings before the work - knowledge, data, models, platform - which remains theirs and is licensed for the purposes of the project.', isCorrect: true, rationale: 'Correct. Listing it is what makes later foreground disputes decidable.' },
        { text: 'The suppliers prior patents only.', isCorrect: false, rationale: 'It covers both sides and all forms of prior asset.' },
        { text: 'The context section of the contract.', isCorrect: false, rationale: 'A drafting term, not the rights concept.' }
      ],
      principle: 'Write down what everyone already owned, before anyone creates something.',
    },
    {
      type: 'knowledge',
      q: 'Why is a field-of-use restriction treated as a purchase rather than a clause?',
      options: [
        { text: 'Because it must be recorded in the pricing schedule.', isCorrect: false, rationale: 'That is a consequence, not the reason.' },
        { text: 'Because it removes revenue the supplier could otherwise earn from other customers, so it has real value and will be priced - and the absence of one means you have funded development for the whole market.', isCorrect: true, rationale: 'Correct. Recognising it as a priced position is what makes it a board decision instead of a drafting default.' },
        { text: 'Because regulators require it.', isCorrect: false, rationale: 'They do not.' },
        { text: 'Because it applies only to patents.', isCorrect: false, rationale: 'It applies to improvements, methods and derived works as well.' }
      ],
      principle: 'Exclusivity costs money; the free option is usually the one that costs most.',
    },
    {
      type: 'scenario',
      context: 'A supplier asks to publish a case study naming your site and the improvement metrics as part of the pilots success. The project team is happy to agree.',
      q: 'What is the correct handling?',
      options: [
        { text: 'Agree, since refusing damages the relationship and the numbers are small.', isCorrect: false, rationale: 'That is a decision made by default, which is the failure.' },
        { text: 'Decide it as a priced position: what may be named, which metrics, for how long, whether competitors may receive detail, and what you receive in return - then record the approval separately from the project plan.', isCorrect: true, rationale: 'Correct. Publicity is consideration, and a reference site is something you own the right to trade.' },
        { text: 'Refuse all publicity.', isCorrect: false, rationale: 'That may be right, but it should be a decision with a reason rather than a reflex.' },
        { text: 'Let the supplier draft it and send it for comment.', isCorrect: false, rationale: 'That hands over the definition of what is disclosed.' }
      ],
      principle: 'A reference is an asset; approve it as one and take something for it.',
    }
  ],
  relSop: 'sop-contract-review',
  rel: {
    concepts: ['background-and-foreground-rights', 'vendor-lockin-and-portability', 'data-licence-scope', 'dataset-provenance-and-rights', 'contract-structure', 'conflict-of-interest'],
    sops: ['sop-contract-review', 'sop-contract-change-control', 'sop-contract-renewal', 'sop-negotiation-preparation'],
    checklists: ['cl-contract-review', 'cl-contract-renewal', 'cl-exception-approval'],
    templates: ['tpl-contract-review-checklist', 'tpl-contract-renewal-assessment', 'tpl-exception-request'],
    calcs: ['calc-multi-year-contract-cost', 'calc-payment-terms'],
    decisions: ['approve-exception', 'negotiate-or-accept', 'renew-vs-resource'],
    kpis: ['kpi-contract-compliance', 'kpi-contract-coverage', 'kpi-roi'],
    glossary: ['gloss-doa', 'gloss-segregation-of-duties', 'gloss-sow']
  },
  labMission: {
    title: 'Mission 28.3: Read the Rights in One Live Partnership',
    desc: 'Take a joint development or innovation contract you can access and answer five questions.',
    tasks: [
      'List the background of both sides as the contract sees it. If the contract does not list it, note what the supplier would claim is theirs.',
      'Answer in writing: what may the supplier do with what was learned about our process, in five years, without asking us? Then find the price of stopping that.',
      'State the data and configuration you could take out today, in what format, and who would have to agree - and write the switching cost into the next renewal paper.'
    ],
    ctaLabel: 'Open Multi-Year Contract Cost',
    ctaHref: '#/calc/calc-multi-year-contract-cost',
    secondaryLabel: 'Open the Contract Review Checklist',
    secondaryHref: '#/cl/cl-contract-review'
  }
});
