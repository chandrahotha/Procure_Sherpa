/* ==========================================================
   Procure Sherpa v2.5 - Academy Content Part 8
   Module 14: Stakeholder Influence, Internal Consulting & Change Adoption
   The craft that decides whether everything in Modules 1-13 actually
   happens: nobody in the business is obliged to agree with procurement,
   and the function has to work anyway.
   These three lessons are written for the reader whose analysis is
   already good and whose results are not, because the decision is made
   in a room they are not in.
   ========================================================== */
PS.ACADEMY_FUNCTIONS = PS.ACADEMY_FUNCTIONS || [];

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-stakeholder-mapping',
  title: 'Stakeholder Mapping & Internal Consulting',
  module: 'Module 14: Stakeholder Influence, Internal Consulting & Change Adoption',
  kicker: 'Function 14.1',
  tier: 'practitioner',
  tagline: 'Working out who actually decides, what they are accountable for, and what you have to give them to get the outcome.',
  desc: 'A sourcing recommendation fails long before the award: it fails in the requirement conversation, in the budget holder who routed around the process, or in the one executive who treats procurement as an approval obstacle. This function covers the deliberate practice of mapping that terrain and behaving like an internal consultant rather than a gate.',
  duration: '21 mins',
  lifecycleStage: 'Requirement definition and intake',
  lifecycleDesc: 'Sits at the front of the lifecycle, because influence is won or lost before the market is approached - after the specification is frozen the decision has usually already been made.',

  what: 'Stakeholder mapping in procurement is not a list of people to inform. It is an analysis of decision power and motive: who can stop this, who can make it happen, who decides alone, who decides only with someone else, and what each of them is actually measured on. The practical instrument is a small grid - the handful of people whose behaviour determines the outcome, plotted by influence against support, with a written answer to one question per name: what does success look like from their chair? A budget holder accountable for an in-service date does not experience a six-week competitive process as diligence; he experiences it as risk to the number he is judged on, and he will find another route. Once that is understood, the work becomes consultative rather than procedural: you bring the market view and the cost structure to the requirement conversation instead of arriving afterwards to police the paperwork. Internal consulting means being asked early because you are useful, not avoided because you are a checkpoint. The distinction shows up in three habits: you prepare the recommendation in the language of the decision-maker\'s own accountability, you name the trade-off you would make in their position, and you give them a route that is faster than the workaround. Enforcement capacity is a weak lever in procurement: it produces compliance theatre, delays and an unfixed underlying requirement. The strongest lever is being the person who can tell the business something about its costs that it cannot find on its own.',
  why: [
    'Most procurement failures are decided before sourcing starts. The specification, the budget, the in-service date and the preferred supplier are set in a conversation procurement was not invited to, and everything after that is paperwork describing a decision already taken.',
    'A stakeholder map converts a diffuse problem - "the business does not cooperate" - into a small number of named, addressable things: one person who needs a different number, one process that is slower than the workaround, one accountability conflict between two directors that procurement is being asked to resolve indirectly.',
    'Influence without authority is the only lever available in a matrixed organisation. Procurement rarely owns the budget, the requirement or the deadline, so it achieves outcomes by making the recommended route the easiest, fastest and best-informed route available to the people who do own them.',
    'The map exposes the informal network that the org chart hides: the operations lead whose opinion moves a plant director, the finance analyst who controls the capital submission window. Approving the visible decision-makers and ignoring these routes is why well-argened recommendations quietly die.'
  ],
  when: [
    'At the start of any category strategy or major sourcing event, before the requirement is frozen - twenty minutes with the right two people is cheaper than a re-tender.',
    'Whenever a recommendation that is analytically strong has been rejected or delayed twice; that pattern is almost always a stakeholder problem misdiagnosed as a numbers problem.',
    'On taking a new portfolio, a new site or a new market, when the formal structure tells you nothing about who actually decides.',
    'Before any process change: threshold, intake route, catalogue or approval flow, because the people whose behaviour must change are rarely the people who approve the change.'
  ],
  raci: [
    { role: 'Category Manager / Sourcing Lead', resp: 'Responsible for building and using the map: identifying the deciding coalition, preparing the recommendation in each name\'s language, and running the requirement conversation early.' },
    { role: 'Budget Holder / Business Sponsor', resp: 'Accountable for the outcome the sourcing supports, and the person whose in-service date or operating target determines whether the plan is feasible at all.' },
    { role: 'Head of Procurement', resp: 'Accountable for escalation when the map shows a blocked outcome, and for the relationship capital that lets an uncomfortable recommendation reach an executive table.' },
    { role: 'Finance Business Partner', resp: 'Consulted on the funding, phasing and approval route; frequently the informal gatekeeper on capital and on the timing of any submission.' }
  ],
  inputs: [
    'The decision that has to be made, stated as the business would state it: the outcome, the date and the budget, not the sourcing activity.',
    'A named list of everyone who can influence that decision, including the people whose role is advisory and the ones who are usually asked privately.',
    'Each name\'s accountability, taken from their own objectives rather than assumed: in-service date, cost per unit, availability, audit finding closed, headcount held.',
    'The current informal position: who supports this, who is resisting, and what each of them believes they are losing.',
    'Evidence procurement holds that the business does not have - market structure, price benchmarks, cost drivers, comparable internal rates from another site.'
  ],
  outputs: [
    'A one-page influence-and-support map with a written motive per name, and the two or three conversations that have to happen before the requirement is frozen.',
    'A recommendation framed for the actual decision-maker: the number they care about first, the trade-off named openly, and the option you would choose in their position.',
    'A deliberately chosen route for the resistant stakeholder - either a design change that removes their objection, or an early, explicit decision escalated to the accountable owner.',
    'A documented "why this way" note attached to the sourcing file, so that when the question returns in eight months the answer is not reconstructed under pressure.'
  ],
  controls: [
    'No major sourcing event proceeds to specification without a named deciding coalition and a recorded conversation with the accountable budget holder.',
    'Escalation is a control, not a defeat: a stakeholder conflict that blocks a documented recommendation is raised within a stated period rather than absorbed silently by the category manager.',
    'Requirement changes after the market is engaged require a written reason and the approval of the same coalition that agreed the original scope, so re-scoping cannot be used to steer an outcome.',
    'The map is stored with the category strategy and refreshed at each strategy review, so influence knowledge survives the person who built it.'
  ],
  mistakes: [
    'Mapping the organisation chart instead of the decision. The chart names who signs; the map needs who influences the signature, and those are usually different people.',
    'Arriving with a fully formed recommendation instead of an option set. A finished answer invites the stakeholder to react; a framed choice with trade-offs invites them to decide, which is what they are paid for.',
    'Treating resistance as a compliance problem. When a plant keeps buying off-route, the first question should be what the off-route supplier provides that the agreed one does not, because the answer is usually a service requirement the design missed.',
    'Speaking in procurement vocabulary. "Compliance", "maverick spend" and "leverage" describe the function\'s concerns; the business decides on risk, speed and its own number, and a recommendation that uses the first vocabulary tends to lose to one that uses the second.',
    'Doing the map once. Support and opposition move with reorganisations, budget cycles and one bad meeting, and a stale map is worse than no map because it feels finished.'
  ],
  terms: ['stakeholder analysis', 'decision coalition', 'cost-to-serve', 'requirement definition', 'sponsor'],
  thinkingPoints: [
    {
      quote: 'If the fastest route for a requester is the workaround, then the control is decorative and the person using the workaround is behaving rationally.',
      explanation: 'Resistance is information about design. Before escalating non-compliance, work out what the off-route option is buying - speed, a local invoice, a phone number that answers, a delivery tomorrow - and decide whether the compliant route can provide it. If it can, the compliance problem solves itself; if it cannot, you have found a real requirement that your design ignored.',
      realWorldExample: 'A category manager chasing 8 percent catalogue compliance found that a single plant accounted for half the exceptions, all of them same-day consumables. The approved supplier had a two-day lead time; the local merchant delivered in ninety minutes for a 6 percent price premium. The fix was a consigned stock bin at the plant, not a compliance campaign, and the exceptions fell to near zero within a quarter.',
      reflectionPrompt: 'Name the three most common off-route purchases in your business and, for each one, write the reason a reasonable person would give for buying it that way. Which of those reasons has your process answered?'
    },
    {
      quote: 'The strongest position in procurement is not the approval right; it is being the only party in the room who knows what the market looks like.',
      explanation: 'Authority compels and then decays; usefulness compounds. A category team that arrives at requirement meetings with market structure, price benchmarks and cost-driver knowledge becomes the party the business consults, and the sourcing recommendations it then makes are adopted because they are the best-informed option rather than the mandated one.',
      realWorldExample: 'An engineering group moved procurement from being treated as a signature to being invited to design reviews after the category manager began circulating a one-page market note per quarter - supplier capacity, input indices, who was consolidating. Nobody\'s authority changed. Participation changed, and specification-stage savings appeared without a single new policy.',
      reflectionPrompt: 'What do you know about one of your categories that the business would find genuinely useful and does not currently have? When did you last give it to them without being asked?'
    }
  ],
  sopSteps: [
    {
      title: 'State the decision, not the activity',
      role: 'Category Manager',
      desc: 'Write the outcome in the business\'s own words - what has to be delivered, by when, at what funding - before naming any sourcing action, so the stakeholder set is derived from the decision rather than from the procurement calendar.',
      control: 'The statement is confirmed in writing with the accountable budget holder, not assumed from the requisition or the category plan.',
      record: 'Decision statement in the category file: outcome, date, funding envelope, accountable name.',
      pitfall: 'Defining the work as "run an RFQ", which pre-selects the answer and hides the possibility that the real decision is whether to buy at all, to lease, or to change the requirement.'
    },
    {
      title: 'Build the deciding coalition by name',
      role: 'Category Manager',
      desc: 'List every person who can block or enable the outcome, mark formal authority separately from demonstrated influence, and identify the one or two relationships that actually move the decision.',
      control: 'The list includes at least one person outside the reporting line of the sponsor, and each name carries a written note of what they are personally measured on.',
      record: 'Stakeholder map with role, influence, support level, stated motive and the evidence source for each judgement.',
      pitfall: 'Consulting only the senior names. A maintenance planner who controls requisition timing can stop a programme that two directors have approved.'
    },
    {
      title: 'Test the map against recent behaviour',
      role: 'Sourcing Lead',
      desc: 'Check the map against what actually happened last time - who was asked, who objected, what changed and what did not - because stated positions in a meeting predict far less well than the routes people used when nobody was watching.',
      control: 'Any mismatch between stated support and observed behaviour is written down as an open question rather than resolved by assuming the statement was correct.',
      record: 'Notes from the previous comparable decision: objections raised, workarounds used, escalations and their outcome.',
      pitfall: 'Accepting agreement in a meeting as a decision. The commitment that matters is the one made afterwards, without an audience, when the cost lands on their budget.'
    },
    {
      title: 'Run the requirement conversation before the specification freezes',
      role: 'Category Manager',
      desc: 'Bring the market view to the business while options are still open: who can actually supply this, what the cost drivers are, where specification changes buy disproportionate value, and what the realistic lead time is.',
      control: 'Specification is not frozen until the market view is recorded and any resulting requirement change is approved by the same coalition that owns the outcome.',
      record: 'Pre-tender requirement note: market constraints, options considered, agreed specification and the reason each rejected option was rejected.',
      pitfall: 'Engaging the market after the specification is signed, which converts a valuable sourcing contribution into a price exercise against an unchangeable requirement.'
    },
    {
      title: 'Prepare the recommendation in the decision-maker\'s arithmetic',
      role: 'Sourcing Lead',
      desc: 'Lead with the number that stakeholder is accountable for, present two or three genuine options with the trade-off stated plainly, and name the option you would choose in their position and why.',
      control: 'The recommendation is reviewed by someone without procurement context for clarity before it reaches the decision forum, and every claim traces to a stated source and assumption.',
      record: 'Recommendation pack with option comparison, named assumptions, risks the business carries, and the decision actually requested.',
      pitfall: 'Burying the decision under method. A twenty-slide process narrative with no clear ask transfers the work of deciding back to a person who did not ask for it.'
    },
    {
      title: 'Design the compliant route to beat the workaround',
      role: 'Process Owner',
      desc: 'Set intake, thresholds and channel design against the fastest legitimate path, so that doing the right thing is also the easy thing, and record the deliberate residual risk where it cannot be.',
      control: 'Threshold and route design is reviewed against measured cycle time and observed exception behaviour, not against approval-compliance percentages alone.',
      record: 'Channel design note: route, limits, expected cycle time, accepted residual risk with its owner.',
      pitfall: 'Tightening approval thresholds to feel safe, which lengthens the compliant route and converts ordinary demand into off-route spend without reducing any real risk.'
    },
    {
      title: 'Escalate the block, then keep the relationship',
      role: 'Head of Procurement',
      desc: 'Where a documented recommendation is blocked by a stakeholder conflict that is not procurement\'s to resolve, put it to the accountable executive as a choice between two named outcomes, and continue to serve the objecting stakeholder afterwards.',
      control: 'Escalation carries the evidence and the options rather than the grievance, is raised within a stated period, and is recorded in the category file with the decision and its date.',
      record: 'Escalation note with the decision made, who made it, the accepted consequence, and any resulting change to the plan.',
      pitfall: 'Winning the escalation and losing the category. A stakeholder who feels overridden stops bringing requirements to procurement, and the function loses its earliest and most valuable point of influence.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'You recommend consolidating four maintenance suppliers onto one, saving 11 percent. The plant engineer blocks it: his teams will not use the new portal. The plant director supports you. The site manager has not said anything.',
      q: 'What is the most useful next step?',
      options: [
        { text: 'Ask the plant director to overrule the engineer, since he has the seniority.', isCorrect: false, rationale: 'This decides the question and leaves the failure mode intact. The engineer controls whether the teams actually use the channel; an overruled stakeholder can absorb the decision and still deliver the outcome through exceptions, which is worse for you than open opposition.' },
        { text: 'Find out what the engineer is accountable for and what the four current suppliers provide that the new one does not.', isCorrect: true, rationale: 'Correct. Opposition from a technical stakeholder is usually a service, availability or familiarity requirement expressed badly. Until you know which of those the incumbent arrangement is delivering, your saving is a number that ignores a constraint - and the silent site manager is a sign the decision is not yet real.' },
        { text: 'Proceed with the award and handle portal adoption later through training.', isCorrect: false, rationale: 'This is how savings claims become variance. Adoption is not a communication task that follows an award; it is a design requirement that belongs in the award decision, and the evidence is the blocking behaviour itself.' },
        { text: 'Escalate the site manager\'s silence as passive resistance.', isCorrect: false, rationale: 'Accurate perhaps, and useless. Naming someone\'s silence as obstruction costs relationship capital and does not answer the substantive question of what makes the compliant route workable on that site.' }
      ],
      principle: 'Map motives before counting heads. A blocked recommendation is almost always an unanswered service requirement, and seniority does not implement anything.'
    },
    {
      type: 'scenario',
      context: 'A capital project specification names a single manufacturer. Procurement is asked to "get the best price". The requirement conversation happened two months ago without you.',
      q: 'What should procurement do?',
      options: [
        { text: 'Run the tender against the named manufacturer and document the price achieved.', isCorrect: false, rationale: 'This is a price exercise dressed as sourcing. It produces a compliant file, no competitive tension, and an outcome the business already decided - while teaching everyone that procurement adds process rather than insight.' },
        { text: 'Return the requirement, refuse to proceed and escalate the breach of process.', isCorrect: false, rationale: 'The objection is legitimate and the move is wrong. Refusal after the decision is frozen is late authority, and it costs credibility you will need on the next requirement - which you can still influence if you handle this one well.' },
        { text: 'Bring a market view to the owner of the specification: capacity, alternatives, cost drivers and what the single-source constraint is worth, then ask whether the requirement still holds.', isCorrect: true, rationale: 'Correct. The specification is a decision made on incomplete information, and the only durable intervention is the information. If the constraint is real - spares compatibility, an installed base, a warranty - you will learn it, and the file records a reasoned single source. If it was habit, options reopen.' },
        { text: 'Tender three "equivalent" models chosen by the engineering team.', isCorrect: false, rationale: 'Better than nothing, but equivalence defined by the requester is specification capture by another name. Genuine alternatives have to come from a market view, with the performance basis stated.' }
      ],
      calcWork: 'A single-source award against a frozen specification typically surrenders the whole competitive margin, commonly 10-25 percent on an engineering category. The gain from reopening the requirement is an order of magnitude larger than any price negotiation conducted afterwards.',
      principle: 'Influence belongs upstream of the paper. Once the specification is fixed, procurement is pricing a decision rather than making one.'
    },
    {
      type: 'scenario',
      context: 'Two directors disagree: Facilities wants a five-year bundled contract for stability; Finance wants annual pricing to protect against volume decline. Your recommendation is caught between them.',
      q: 'What is the correct handling?',
      options: [
        { text: 'Recommend the option supported by the more senior stakeholder.', isCorrect: false, rationale: 'Seniority is a proxy for authority, not for the right answer, and this decision is not procurement\'s to take. Choosing a side on rank guarantees the losing party owns the failure of whatever is implemented.' },
        { text: 'Quantify the trade-off in both parties\' terms and put the choice, with its numbers, to the accountable owner.', isCorrect: true, rationale: 'Correct. This is a genuine risk-and-return trade, not a compliance question: term length buys price and stability at the cost of flexibility if volumes fall. Put both numbers - the multi-year saving against the exposure if demand drops - to the person accountable for the outcome and record their decision.' },
        { text: 'Split the contract to satisfy both.', isCorrect: false, rationale: 'A compromise that serves the disagreement rather than the business. It usually loses the bundle discount and adds management cost, and nobody is accountable for the split.' },
        { text: 'Delay until they resolve it themselves.', isCorrect: false, rationale: 'Sometimes correct as a tactic, wrong as a default. Procurement owns the quantification the argument is missing; waiting without supplying it lets the decision drift into whoever speaks last.' }
      ],
      principle: 'When two accountabilities conflict, procurement supplies the arithmetic and hands the decision to the owner. Being the honest calculator is the durable role.'
    },
    {
      type: 'scenario',
      context: 'Your category plan reads: "improve compliance with the procurement process from 61 to 80 percent". Your head asks what that is worth.',
      q: 'What makes the plan defensible?',
      options: [
        { text: 'State the compliance uplift as the target, since process adherence is the function\'s mandate.', isCorrect: false, rationale: 'Compliance is a proxy. It is a legitimate operational measure, but it is not an outcome the business buys, and a plan whose only number is a compliance percentage will keep failing the "so what" question.' },
        { text: 'Translate it into the two things compliance actually changes: the value routed through negotiated terms, and the cost per transaction of the routes being bypassed.', isCorrect: true, rationale: 'Correct. Off-route spend costs money in two distinct ways - price not captured and process cost incurred per transaction. Quantifying both gives a number the business recognises, and it tells you whether to fix the channel or the savings, which are different programmes.' },
        { text: 'Report the average price of on-route versus off-route purchases as the saving available.', isCorrect: false, rationale: 'A common and usually wrong shortcut. Off-route purchases differ in specification, urgency and quantity, so a price gap is not a saving until the mix is controlled. It is a good first estimate and a bad business case.' },
        { text: 'Set a target of zero exceptions.', isCorrect: false, rationale: 'Exceptions encode legitimate business need. Aiming for none either suppresses reporting or forces a control that the operation routes around, and it hides the useful signal about which requirements the channel does not serve.' }
      ],
      principle: 'Convert every process metric into value routed or cost removed before you take it to a business audience.'
    },
    {
      type: 'scenario',
      context: 'A plant you support has just been hit by a supply failure. The same risk appeared in your category report two years ago and was never actioned.',
      q: 'What is the most constructive response?',
      options: [
        { text: 'Point to the earlier report so the record shows procurement advised correctly.', isCorrect: false, rationale: 'Fair on the facts, fatal in practice. Being right after a loss reads as blame, and it will shape how the next warning is received. The file already carries the advice; use it, do not wave it.' },
        { text: 'Support the immediate recovery, then convert the risk into a named decision with a cost of inaction stated in the plant\'s own terms.', isCorrect: true, rationale: 'Correct. Crisis gives you the only audience that acts, and the durable move is to pair recovery support with a specific, priced recommendation - dual source, buffer stock, a qualified alternative - so the same risk requires an explicit decision rather than another ignored report.' },
        { text: 'Require a dual-source policy for all single-sourced critical items.', isCorrect: false, rationale: 'A policy that cannot be funded or staffed becomes the third unactioned warning. Risk treatment has to be selected per item against its exposure and its cost, with an owner and a date.' },
        { text: 'Escalate the previous non-action to the executive.', isCorrect: false, rationale: 'Retrospective escalation of an old advice closes nothing. It reopens the failure without proposing the fix, and it teaches the business that procurement reports are arguments rather than help.' }
      ],
      principle: 'Credibility in procurement is spent, not banked. A warning that was ignored becomes influence only when it is reborn as a costed decision.'
    },
    {
      type: 'knowledge',
      q: 'Which measure best indicates that procurement has genuine internal influence rather than only procedural authority?',
      options: [
        { text: 'The share of requisition value routed through approved channels.', isCorrect: false, rationale: 'A useful hygiene measure that can be raised by enforcement alone, so it does not distinguish consent from compliance.' },
        { text: 'How often business teams bring procurement into requirement definition before the specification is frozen.', isCorrect: true, rationale: 'Correct. Early invitation is revealed preference: it means the business expects procurement to add something it cannot obtain elsewhere. Persistent late engagement, whatever the compliance numbers say, is the sign of a function treated as a checkpoint.' },
        { text: 'The number of policy exceptions approved each quarter.', isCorrect: false, rationale: 'Reflects exception volume and control design, not influence. It can fall because requesters stopped reporting.' },
        { text: 'Savings delivered against target.', isCorrect: false, rationale: 'Necessary but not sufficient. A function can hit savings through mandate and still be routed around on everything it does not see.' }
      ],
      principle: 'Influence is measured by when you are invited, not by how many approvals you hold.'
    }
  ],
  relSop: 'sop-procurement-intake',
  rel: {
    concepts: ['procurement-value', 'demand-management', 'spend-analysis', 'c-procurement', 'supplier-relationship-management'],
    sops: ['sop-procurement-intake', 'sop-procurement-lifecycle'],
    checklists: ['cl-requirement-definition', 'cl-procurement-intake', 'cl-sourcing-strategy'],
    templates: ['tpl-business-case', 'tpl-rfi'],
    calcs: ['calc-kpi-calculator', 'calc-savings-analysis'],
    decisions: ['sourcing-method', 'approve-exception'],
    kpis: ['kpi-cycle-time', 'kpi-maverick-spend', 'kpi-sourcing-coverage'],
    glossary: ['gloss-maverick-spend', 'gloss-rfi']
  },
  labMission: {
    title: 'Mission 14.1: Map the Decision, Not the Org Chart',
    desc: 'Take one live recommendation of yours, work out who actually decides and what each name is measured on, and rewrite the recommendation in their arithmetic.',
    tasks: [
      'Write the decision as the business would state it - outcome, date, funding - and name the four people whose behaviour determines it.',
      'For each name, write what they are personally accountable for and what they believe they would lose from your recommendation.',
      'Open the KPI Calculator, price the trade-off each stakeholder cares about, and rewrite your opening paragraph in their number rather than yours.'
    ],
    ctaLabel: 'Open KPI Calculator',
    ctaHref: '#/calc/calc-kpi-calculator',
    secondaryLabel: 'Open the Intake SOP',
    secondaryHref: '#/sop/sop-procurement-intake'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-executive-ask',
  title: 'The Executive Ask: Business Cases Without Authority',
  module: 'Module 14: Stakeholder Influence, Internal Consulting & Change Adoption',
  kicker: 'Function 14.2',
  tier: 'executive',
  tagline: 'Getting funding, mandate or a decision from people who are not obliged to give you any of the three.',
  desc: 'Programmes in procurement stall on four asks: money, people, mandate and permission to change a requirement. Each is won with the same craft - a case built on the executive\'s own numbers, an honest statement of what happens if the board says no, and a request specific enough to be granted. This function covers the construction of that ask and the arithmetic that makes it survivable under challenge.',
  duration: '25 mins',
  lifecycleStage: 'Category strategy and performance management',
  lifecycleDesc: 'Wraps the strategy and value stages: it is how a category plan becomes funded, and how a measured result becomes a mandate for the next one.',

  what: 'An executive ask is a compressed argument: here is the decision, here is its value in your numbers, here is what it costs, here is what happens if we do nothing, here is exactly what I need from you. Most procurement cases fail on the last two. They present activity ("we need two analysts to run category management") instead of a decision, and they omit the cost of inaction, which is the only part of the argument an executive can compare against their other claims on the same money. The craft has four components. First, the number: value must be expressed in the currency the executive is measured on - EBITDA contribution, working capital, cost per unit, delivery risk closed, capital programme protected - and every figure must survive the question "how do you know". Second, the trade-off: an honest ask names what it will not deliver, which is what makes the rest credible. Third, the granularity of the request: funding of a stated amount for a stated period against a stated deliverable and a stated review point, not "support for the function". Fourth, the fallback: a smaller version of the same outcome that you would accept, so the conversation has somewhere to land rather than failing outright. Executives also process risk asymmetrically - a programme that prevents a loss is worth more than an identical-sized gain, and a programme that closes an audit finding or protects a delivery date outranks a marginal price improvement. Knowing which of those frames is true of your case is a positioning decision, not a spin decision: prevention claims need evidence of exposure, and gain claims need a baseline that finance will accept. Finally, the ask travels through a person, not a process. Sponsoring an executive means giving them something they can defend in the room without your presence, which in practice means one page, three numbers and a sentence they can say in their own words.',
  why: [
    'Procurement rarely owns the resources its own strategy needs. Funding, headcount and mandate are allocated by people with competing claims on the same budget, so the function competes with every other proposal on the quality of its argument rather than on the correctness of its process.',
    'Executives decide under scarcity and asymmetrical risk. A case expressed as a percentage saving competes poorly against a case expressed as delivery risk removed or an audit exposure closed, even when the money is identical - which means the framing is a truthful statement about value, not decoration.',
    'The absence of a stated "if we do nothing" line is why procurement programmes are deferred rather than rejected. Deferral has no owner and no visible cost, so an unpriced inaction is always the cheap option in a queue.',
    'A specific ask produces a decision. Vague requests for support get encouragement, which is the most expensive outcome available: it commits nobody, funds nothing, and reads as approval until the resources never arrive.'
  ],
  when: [
    'When a category or savings plan requires money, people or a decision authority the function does not hold.',
    'When a recommendation has been accepted in principle twice and executed zero times, which usually means nobody was ever asked for a specific decision.',
    'Before a planning or budget cycle, not during it: an ask that arrives after allocations are locked becomes a request to reallocate, which is a different and much harder conversation.',
    'After a loss, an audit finding or a delivery failure that your function predicted, when exposure is measurable and the cost of inaction no longer has to be argued.'
  ],
  raci: [
    { role: 'Head of Procurement / Category Director', resp: 'Accountable for the ask: its numbers, its framing, the specific decision requested and the fallback position if it is declined.' },
    { role: 'Finance Business Partner / Controller', resp: 'Responsible for testing the value and cost figures against the basis the organisation recognises, and for the phasing and accrual treatment the case depends on.' },
    { role: 'Sponsoring Executive', resp: 'Accountable in the decision forum. Needs a case they can defend without the author present, in their own words, on one page.' },
    { role: 'Business Unit Leadership', resp: 'Consulted where the ask changes operating practice, and frequently the source of the delivery or service risk that makes the case urgent.' }
  ],
  inputs: [
    'A validated baseline: what the organisation currently spends, pays, loses or carries, with the method stated and finance engaged before the number is used.',
    'The exposure quantified in the organisation\'s own currency - lost margin, working capital tied up, cost of a delivery week, the value of the audit finding remaining open.',
    'The cost of the ask, fully loaded: people, systems, transition, and the operating cost the change creates for somebody else.',
    'A named decision with an owner, a date and a review point, plus the smaller version that would still deliver most of the outcome.',
    'Evidence a sceptical reader will demand: two or three comparable internal results, market data, or a pilot with measured output rather than a projection.'
  ],
  outputs: [
    'A one-page case: decision requested, value, cost, risk of inaction, fallback - with the arithmetic available in the appendix rather than in the argument.',
    'A sponsor-ready version: three numbers and a sentence the executive can repeat without qualifying it.',
    'A recorded decision with its conditions, owner and date - including the decision to do nothing, which is the outcome most cases fail to capture.',
    'A pre-agreed measurement plan: what will be reviewed at the stated point, by whom, and what would justify stopping.'
  ],
  controls: [
    'Every value claim carries a stated baseline and method, and has been through the savings-assurance route the organisation applies to any other saving.',
    'Cost figures are fully loaded and include the operating cost transferred to another function, so the case does not win by moving work into an unpriced department.',
    'Projections are labelled as projections. A modelled benefit, a pilot result and a validated realised saving are three different claims and are presented differently.',
    'The decision, its conditions and its owner are minuted. A case that "went well" without a recorded decision has produced enthusiasm, which is not an outcome.'
  ],
  mistakes: [
    'Asking for capability rather than a decision. "We need a category manager for this portfolio" is a resource request; "approve a five-month pilot on the packaging category against a validated 4 percent baseline, reviewed in June" is a decision.',
    'Omitting the cost of inaction, or stating it as a percentage of spend nobody can visualise, when the same exposure expressed as delivery weeks lost or an open audit finding is immediately comparable.',
    'Over-reaching in the first ask. A case that requires mandate, funding, three people and a system change is a portfolio of decisions, and the usual response to a portfolio is deferral.',
    'Presenting a modelled saving as though it were realised. One challenge that exposes it discredits the whole number and, worse, the function\'s other numbers for a year.',
    'Winning the meeting and losing the follow-up. Sponsorship without a recorded decision, a named owner and a review date converts a yes into an unanswered email.'
  ],
  terms: ['business case', 'return on investment', 'payback period', 'cost of inaction', 'executive sponsorship'],
  thinkingPoints: [
    {
      quote: 'Executives do not reject good numbers; they reject numbers that cannot survive one question.',
      explanation: 'The durability of a business case is tested by the shallowest competent challenge to it - how was the baseline set, what does this cost to run, who else is affected. A case that has those answers in the appendix, in the organisation\'s own accounting basis, gets funded. A case that has to construct them live in the room does not, however good the underlying analysis is.',
      realWorldExample: 'A head of procurement seeking two analysts for a professional-services programme resubmitted the same case twice: first as a savings projection of 6 percent on USD 40 million, then as a one-page decision requesting a five-month pilot on one sub-category with a validated baseline, a named finance reviewer and a stated stop condition. The second version was funded in one meeting, and the eventual result was below the first projection.',
      reflectionPrompt: 'Write the sharpest question a hostile finance director would ask about your current business case, then check whether your document contains the answer anywhere.'
    },
    {
      quote: 'The most expensive outcome in procurement is encouragement.',
      explanation: 'A request that receives "sounds good, look into it" has been neither funded nor refused. It consumes the sponsor\'s goodwill, creates no obligation and leaves the work unresourced - and it typically recurs annually, by which time the goodwill is spent. A clear refusal is more useful, because it forces the ask to change or be narrowed to a decision someone can actually make.',
      realWorldExample: 'A function asked the executive committee three years running for a contract-lifecycle tool, and each year received interest and no decision. In the fourth year the ask was narrowed to USD 40,000 for twelve months of managed contract extraction against two named categories, with the review point set and the stop condition written. It was refused, the reason recorded, and the same result was then achieved inside existing resources by changing who maintained the contract register.',
      reflectionPrompt: 'Which of your open asks has been encouraged rather than decided, and what would a narrower version of it look like that someone could refuse on one page?'
    }
  ],
  sopSteps: [
    {
      title: 'Define the decision you want',
      role: 'Head of Procurement',
      desc: 'State in one sentence the specific thing the executive must approve - an amount, a mandate, a resource or a policy change - with the date it is needed by and the person who will own it afterwards.',
      control: 'The ask is testable: it names an amount or authority, an owner and a review point, and can be granted or refused without further interpretation.',
      record: 'One-line decision request at the top of the case, repeated verbatim in the minutes.',
      pitfall: 'Writing the ask as support for a strategy, which nobody can refuse and therefore nobody commits resources to.'
    },
    {
      title: 'Fix the baseline with Finance before using the number',
      role: 'Finance Business Partner',
      desc: 'Agree the measurement basis, the period and the treatment with the function that will later have to accept the claim, so the value in the case is the same number the accounts will recognise.',
      control: 'Baseline definition, period and exclusion rules are documented and signed off by the finance reviewer named in the case.',
      record: 'Baseline sheet with source data, agreed adjustments and the finance sign-off date.',
      pitfall: 'Building a case on a saving definition Finance has not agreed, then discovering at the review point that the money was never claimable.'
    },
    {
      title: 'Price the inaction, not only the action',
      role: 'Category Director',
      desc: 'Quantify what continues if the decision is not taken - exposure, delivery risk, open findings, cost carried - and express it in the currency the organisation already uses for that type of risk.',
      control: 'The inaction figure has a stated source and a conservative assumption set, and is presented alongside the opportunity figure rather than instead of it.',
      record: 'Cost-of-inaction note with the exposure calculation and the assumptions a reviewer would test.',
      pitfall: 'Inflating the downside to force the decision. One exposed number destroys the credibility of every other claim in the pack.'
    },
    {
      title: 'Build the one-page version',
      role: 'Head of Procurement',
      desc: 'Reduce the case to decision, value, cost, risk of inaction and the specific ask, in language a sponsor can repeat without qualifying it, with the arithmetic moved to an appendix.',
      control: 'A reader without procurement context can state the decision correctly from the single page alone; that test is run before the meeting.',
      record: 'One-page case plus appendix, version-dated, held with the decision record.',
      pitfall: 'Arriving with a deck. Detail presented in the room transfers the work of deciding to the audience and usually defers it.'
    },
    {
      title: 'Offer the smaller yes',
      role: 'Sponsoring Executive',
      desc: 'Prepare a reduced version of the same outcome - a pilot, one category, a fixed term with a stop condition - that can be approved if the full ask is not affordable, and put it in the document rather than in your pocket.',
      control: 'The fallback delivers a measurable part of the value and has its own review point, so a small decision still produces evidence.',
      record: 'Fallback option with its reduced scope, cost and what it proves or delivers.',
      pitfall: 'Treating the fallback as surrender. Deferred large asks are routinely refused twice and then funded by a competitor with a smaller one.'
    },
    {
      title: 'Record the decision and its conditions',
      role: 'Head of Procurement',
      desc: 'Minute the decision actually taken, including a decision to defer or decline, with the owner, the conditions attached and the next review date, and circulate it to the sponsor as confirmation.',
      control: 'Every case closes with a recorded decision; an outcome of "further discussion" carries a named owner and a date.',
      record: 'Decision record: what was approved, by whom, conditions, review point, and what was explicitly not approved.',
      pitfall: 'Leaving a yes unwritten. In a matrixed organisation an unrecorded approval is unavailable to the next conversation and the ask restarts.'
    },
    {
      title: 'Return on the promise you made',
      role: 'Programme Lead',
      desc: 'At the review point, report the measured result against the number in the case - including the shortfall - and state the next decision, so the function builds a history of delivered claims rather than a history of proposals.',
      control: 'Review packs compare claim against validated actual with the method shown, and any re-forecast explains the difference.',
      record: 'Review pack with actuals, variance explanation and the next ask or the stop decision.',
      pitfall: 'Reporting the percentage against target rather than the absolute against the original claim, which hides whether the case was right.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'You need USD 300,000 and two analysts to run category management across six portfolios. The board is reviewing discretionary spend this month.',
      q: 'Which ask has the best chance of a decision?',
      options: [
        { text: 'Approve the full programme: six categories, two analysts, USD 300,000 of tooling, against a projected 5 percent saving.', isCorrect: false, rationale: 'This is a portfolio of decisions in one envelope, and the standard response to that is deferral. It also asks the board to fund a projection across categories you have never worked in that way.' },
        { text: 'Approve a two-analyst pilot on the packaging category for six months against a validated 4 percent baseline, with a review date and a stop condition.', isCorrect: true, rationale: 'Correct. Small enough to be decided, specific enough to be refused on reasons, and structured to produce evidence the board can rely on for the larger question. It also lets you claim the whole six-category result later from a demonstrated base rather than a forecast.' },
        { text: 'Ask for the two analysts only, since the tooling can wait.', isCorrect: false, rationale: 'Better than the full ask, but it still requests capability rather than a decision, and without a scope and review point it converts into encouragement - the outcome that commits nobody.' },
        { text: 'Present the total value at stake across all six categories to show the scale of the opportunity.', isCorrect: false, rationale: 'Scale without affordability produces anxiety, not decisions. The board is choosing between claims on one budget; a large aggregate with no entry point is the easiest thing on the agenda to postpone.' }
      ],
      principle: 'A decision needs an edge. Ask for the smallest complete version of the outcome that produces evidence.'
    },
    {
      type: 'scenario',
      context: 'Your case claims USD 1.8m of savings on IT services. Finance has not seen the baseline. The CFO asks how it was calculated.',
      q: 'What is the correct preparation?',
      options: [
        { text: 'Answer with the percentage uplift per supplier, since that is how the analysis was built.', isCorrect: false, rationale: 'It answers a different question. The CFO is asking about the basis, and describing a method built on your own comparison table invites the follow-up that will find the baseline unsignposted.' },
        { text: 'Agree the baseline, period and exclusions with the finance reviewer before the meeting, and carry the sign-off in the appendix.', isCorrect: true, rationale: 'Correct. A claim that competes for funding has to be expressed in the number the accounts will recognise, and the only protection is a pre-agreed basis. If the number then falls, it falls honestly and stays usable.' },
        { text: 'Reduce the claim by a contingency margin so it is safe under challenge.', isCorrect: false, rationale: 'A haircut without a method is guesswork in the other direction. It can still be dismantled - "why 15 percent?" - and it quietly concedes that the original basis was never agreed.' },
        { text: 'Present the savings as cost avoidance instead, since IT rates move with demand.', isCorrect: false, rationale: 'Reclassifying to dodge a challenge destroys every future claim. Avoidance is a legitimate category with its own evidence standard, not a hiding place for a saving that cannot be defended.' }
      ],
      principle: 'A number is only as strong as the basis somebody independent has agreed before you use it.'
    },
    {
      type: 'knowledge',
      q: 'Which framing usually carries most weight with an executive committee reviewing competing discretionary requests?',
      options: [
        { text: 'Percentage saving against category spend.', isCorrect: false, rationale: 'Comparable across procurement proposals, but not against a safety investment, an IT outage fix or a delivery-risk mitigation - and the committee decides across all of them.' },
        { text: 'Risk removed to a business outcome the committee already owns: a delivery date protected, an audit exposure closed, a launch defended.', isCorrect: true, rationale: 'Correct. Executives process risk and commitments to their own outcomes more sharply than margin percentages, and a claim expressed in a risk they already carry enters an existing decision queue rather than starting a new argument.' },
        { text: 'Total value at stake over three years.', isCorrect: false, rationale: 'Multi-year aggregates dilute the annual cost and invite discounting of the later years, which usually reduces rather than increases support.' },
        { text: 'Benchmark against peer functions.', isCorrect: false, rationale: 'Useful for credibility on capability, weak on funding. "Others have it" is not an outcome and rarely survives a budget question.' }
      ],
      principle: 'Enter an existing decision queue. The committee that owns a delivery date already has a place for a proposal that protects it.'
    },
    {
      type: 'scenario',
      context: 'Three years running you have asked for a contract-management capability. Each time: interest, no decision. Nothing has been funded and nothing has been refused.',
      q: 'What should change?',
      options: [
        { text: 'Ask again with updated figures, since the case is stronger each year.', isCorrect: false, rationale: 'The obstacle is the shape of the ask, not its freshness. A fourth encouragement costs your remaining credibility rather than the sponsor\'s patience.' },
        { text: 'Narrow to a specific, time-boxed decision with a stop condition, and put the fallback in the document.', isCorrect: true, rationale: 'Correct. Persistent deferral is a symptom of an ask that cannot be refused cleanly. A dated, bounded decision with a stated stop condition forces a real answer - and a refusal you can work around is worth more than another year of interest.' },
        { text: 'Escalate to a more senior sponsor who can override the committee.', isCorrect: false, rationale: 'This buys a decision and costs the relationship with the people who control the budget line for years. It also tends to reverse at the next reorganisation.' },
        { text: 'Build the capability inside existing resources and present the result afterwards.', isCorrect: false, rationale: 'Sometimes the right move, and a governance risk if it needs licences or headcount. It also leaves a pattern of unfunded mandates that eventually surfaces as an audit finding about control ownership.' }
      ],
      principle: 'Encouragement is not progress. If the response is always interest, the ask is unrefusable and therefore unfundable.'
    },
    {
      type: 'scenario',
      context: 'Your pilot delivered 1.9 percent against the 4 percent promised in the funding case. The review meeting is next week.',
      q: 'What is the right report?',
      options: [
        { text: 'Report 48 percent of target achieved, since the target was ambitious.', isCorrect: false, rationale: 'Percentage-of-target framing hides the absolute against the claim and reads as an attempt to redefine success. The committee remembers the number it approved.' },
        { text: 'Report the validated absolute against the original claim, explain the variance, and state the decision you now recommend with the revised basis.', isCorrect: true, rationale: 'Correct. This is the moment the function\'s credibility is actually built or lost. Delivering the honest number with a clear cause - baseline was richer than assumed, mix shifted, the driver was volume not price - plus a specific next decision, buys more trust than a better result would.' },
        { text: 'Present the gross saving before the mix effect, which is closer to the case.', isCorrect: false, rationale: 'It will be found. One re-baselining discovered after the fact costs more than the shortfall it concealed, because it converts a delivery miss into a honesty question.' },
        { text: 'Focus on the process improvements the pilot enabled, since the number is weak.', isCorrect: false, rationale: 'Genuine value, wrong audience. A funding review is a comparison against a promise; secondary benefits belong after the promise is accounted for.' }
      ],
      calcWork: 'Claim 4 percent of USD 22m = USD 880,000. Delivered 1.9 percent = USD 418,000. The honest variance is USD 462,000, not a 48 percent score, and the review must explain where that went.',
      principle: 'Report against the promise, not against a target you set yourself. The variance explanation is where trust compounds.'
    }
  ],
  relSop: 'sop-savings-calculation',
  rel: {
    concepts: ['procurement-value', 'savings-types', 'cost-avoidance', 'savings-baseline', 'should-cost'],
    sops: ['sop-savings-calculation', 'sop-procurement-lifecycle'],
    checklists: ['cl-savings-validation', 'cl-exception-approval'],
    templates: ['tpl-business-case', 'tpl-savings-validation', 'tpl-cost-avoidance'],
    calcs: ['calc-savings-analysis', 'calc-multi-year-contract-cost', 'calc-kpi-calculator'],
    decisions: ['re-source', 'make-or-buy'],
    kpis: ['kpi-roi', 'kpi-savings-realization', 'kpi-working-capital-impact']
  },
  labMission: {
    title: 'Mission 14.2: Write the One-Page Ask',
    desc: 'Take the biggest thing you currently need from your executive and turn it into a decision someone can grant or refuse on one page.',
    tasks: [
      'Write the decision in one sentence: the amount or authority, the owner, the date needed and the review point.',
      'Use the Multi-Year Contract Cost tool to price the option you are recommending against at least one alternative over the same horizon.',
      'Add the cost of doing nothing and the smaller version of the ask, then check that a non-procurement reader can state the decision correctly from page one.'
    ],
    ctaLabel: 'Open Multi-Year Contract Cost',
    ctaHref: '#/calc/calc-multi-year-contract-cost',
    secondaryLabel: 'Open Savings Analysis',
    secondaryHref: '#/calc/calc-savings-analysis'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-adoption-and-change',
  title: 'Adoption, Behaviour Change & Holding the Gain',
  module: 'Module 14: Stakeholder Influence, Internal Consulting & Change Adoption',
  kicker: 'Function 14.3',
  tier: 'practitioner',
  tagline: 'The gap between an awarded contract and a changed habit, and how to stop the year-two reversal.',
  desc: 'Procurement results decay because they depend on behaviour that nobody owns: catalogue use, order routing, contract compliance, specification discipline, supplier performance conversations. This function covers adoption as a design problem - making the compliant route the fastest, giving the behaviour an owner outside procurement, measuring it where it happens - and the review mechanisms that catch erosion before it becomes the new baseline.',
  duration: '22 mins',
  lifecycleStage: 'Performance management and value assurance',
  lifecycleDesc: 'Runs after award and continues indefinitely, which is why it is the least-loved stage: the savings are booked and the people who own the behaviour have moved on.',

  what: 'An award changes a price. Adoption changes a behaviour, and behaviours have owners outside procurement who are measured on something else. The practical model has four parts. Design the route so that doing the right thing is the fastest thing: a catalogue that answers in one click, a card rule that removes the requisition, an intake form shorter than the workaround it replaces. Then assign the behaviour to a named owner in the business - not "departments" - and give them the measure, because a metric procurement reports is a metric procurement carries alone. Then instrument the behaviour where it happens: exception counts by team, coverage against actual transactions, off-catalogue spend by cost centre, cycle time at the requisition point. Aggregate compliance percentages hide exactly the units that need attention. Finally, review on a stated cadence with a decay test: is the behaviour holding against the original baseline, or has the baseline quietly moved? The characteristic failure is the year-two reversal - supplier counts climb back, off-catalogue spend returns, contract compliance drifts - because the improvement was delivered as an event rather than as an operating change, and no one\'s objectives contained it. Two design rules prevent most of it. First, treat every exception as data about the design rather than as a control breach: repeated exceptions from the same team are a requirement the channel does not serve, and fixing that requirement is cheaper than endless enforcement. Second, make the improvement visible to the person doing it - a department that can see its own order count falling is a department that keeps doing it. Adoption work is unglamorous and cheap, and it is where a measured saving either becomes permanent or becomes a story about why year one was exceptional.',
  why: [
    'Savings decay by default. A benefit realised through behaviour reverts the moment the attention moves, and since procurement books the result at award while the behaviour must be sustained for years, the ownership of the gain is structurally misplaced unless someone fixes it deliberately.',
    'The year-two reversal has a specific cause: the improvement was designed as a project with an end date rather than as a change to how the organisation operates. Projects are funded and closed; operating changes need an owner, a measure and a cadence.',
    'Enforcement capacity is finite and mostly ineffective at scale. Every control that depends on somebody watching transactions fails quietly at the volume the tail generates, so durability has to come from channel design and from an owner who experiences the measure as their own.',
    'Exception behaviour is the earliest signal available. Off-route spend, deviations and emergency orders arrive weeks before the aggregate number moves, and a function that reads them as compliance failures rather than design feedback loses both the warning and the fix.'
  ],
  when: [
    'At award, not after: the adoption design - owner, route, measure, cadence - is part of implementing the contract rather than follow-up work.',
    'When a category result has been booked and no named business owner is accountable for keeping it, which describes most savings in most organisations.',
    'When the same team generates a recurring share of exceptions, which is a design signal rather than a discipline signal.',
    'At the first annual review after any consolidation, catalogue launch or threshold change, when the reversal becomes visible if it is going to.'
  ],
  raci: [
    { role: 'Category Manager', resp: 'Responsible for the adoption design at award: route, owner, measure, cadence, and the exception review that turns deviations into design changes.' },
    { role: 'Budget Holder / Department Manager', resp: 'Accountable for the behaviour that sustains the result within their area, because they own the requisitions, the headcount and the operational consequence.' },
    { role: 'Procurement Operations / Shared Services', resp: 'Responsible for the instrumented measures - coverage, exception counts, cycle time - and for reporting them where the behaviour happens rather than only centrally.' },
    { role: 'Head of Procurement', resp: 'Accountable for the review cadence and for escalating an eroding result while it is still a business decision rather than a post-annual variance explanation.' }
  ],
  inputs: [
    'The behaviour that produces the benefit, written as an observable action - orders placed against the catalogue line, requisitions raised on the agreed intake route, consumables drawn from the consigned bin.',
    'A named business owner for that behaviour, with their agreement and their own measure connected to it.',
    'The baseline as measured at go-live: transaction counts, unit rates, off-route spend, coverage of actual demand, and the date.',
    'Instrumentation at the point of behaviour rather than at the summary: exception lists by cost centre, coverage by department, cycle time by requisition type.',
    'The list of known workarounds with the reason each exists, so the first review has real content rather than a compliance percentage.'
  ],
  outputs: [
    'An adoption plan with owners in the business, the measure each of them sees, the review cadence and the trigger that prompts intervention.',
    'A channel design that is measurably faster than the workaround, with residual exceptions accepted and named rather than suppressed.',
    'A decay report at each review: behaviour against the go-live baseline, what eroded, why, and the decision requested - including the option of accepting the new level deliberately.',
    'A design-change log: every recurring exception that produced a change to catalogue, route or threshold, which is where the durable improvements usually come from.'
  ],
  controls: [
    'No savings claim is closed without a named owner for the sustaining behaviour and a measure reported at the cadence agreed at award.',
    'Exception data is reviewed on a stated schedule and every recurring exception from one unit is either accepted with a reason or converted into a channel change - it is not left as a compliance finding.',
    'Baselines are locked at go-live and re-baselining requires the same approval as the original claim, so improvement cannot be reported against a target that has drifted.',
    'Coverage is measured against actual transactions, not against catalogue line count, so a route nobody uses cannot be reported as complete.'
  ],
  mistakes: [
    'Treating go-live as completion. The award ceremony and the system launch are the beginning of the behaviour change, and the resources that delivered them are usually already reassigned.',
    'Reporting compliance percentage centrally. The number that changes behaviour is the one the department sees about itself, compared with last month and with peers.',
    'Suppressing exceptions instead of reading them. A control that reduces reported exceptions without changing the underlying requirement produces hidden workarounds and a false baseline.',
    'Re-baselining to protect the narrative. Each year\'s starting point quietly becomes last year\'s achieved level, so the programme reports stability while the original benefit disappears.',
    'Assigning adoption to procurement. When the sustaining behaviour sits with a function that does not own the requisitions, it decays at the rate of procurement\'s ability to nag, which is finite.'
  ],
  terms: ['change adoption', 'benefit sustainment', 'compliance drift', 're-baselining', 'exception management'],
  thinkingPoints: [
    {
      quote: 'A saving is booked once and sustained daily. The organisation pays for the booking and nobody pays for the daily.',
      explanation: 'Award releases the value and ends the project funding, but the benefit continues only while a behaviour continues, and that behaviour belongs to people whose objectives do not mention it. This mismatch - not supplier opportunism, not bad systems - is the main cause of benefit decay, and the fix is structural: name the owner, connect the measure to their objective, and set the cadence before the team disbands.',
      realWorldExample: 'A facilities consolidation cut 340 small service suppliers to 40 and booked a 12 percent saving. Nobody in the sites had a measure connected to using the four contracts. Eighteen months later the vendor count was back to 210, mostly through small capital orders and petty-cash repairs, and the reported saving had become a story about the price of the remaining contracts.',
      reflectionPrompt: 'For the last saving you booked, name the behaviour that sustains it, the person accountable for that behaviour, and the meeting where they see a number about it. If any of the three is missing, the benefit is already decaying.'
    },
    {
      quote: 'Every stable exception rate is a design specification you have not read yet.',
      explanation: 'Exceptions that persist across months and come from predictable places are not random discipline failures. They are the operational system telling you that a requirement is real and the channel does not meet it. Reading them as data changes what you build; reading them as breaches changes only the reporting.',
      realWorldExample: 'A group reviewed a steady 9 percent off-catalogue spend on laboratory consumables and found that four departments accounted for 85 percent of it, all under urgent one-off quantities. The catalogue required a purchase order; the labs needed same-day items under a value nobody bothered to approve. Adding a stocked bin and a card rule for those sites removed the exceptions in a quarter, at no price cost.',
      reflectionPrompt: 'Pull your exception list by cost centre for last quarter. Which three units generate most of it, and what does their work need that your channel does not provide?'
    }
  ],
  sopSteps: [
    {
      title: 'Name the behaviour before the launch',
      role: 'Category Manager',
      desc: 'Write the sustaining behaviour as an observable action at award stage, and record the transaction types and volumes that must move for the benefit to exist.',
      control: 'The behaviour is measurable from existing transaction data, with the go-live baseline captured at the same time.',
      record: 'Adoption clause in the award file: behaviour, baseline, volumes affected, measurement source.',
      pitfall: 'Describing the behaviour as "use the contract", which cannot be measured and therefore cannot be reviewed.'
    },
    {
      title: 'Give the behaviour a business owner with their own measure',
      role: 'Budget Holder',
      desc: 'Assign the behaviour to a named person outside procurement whose objectives include the number, and agree what they will see, how often, and what they are expected to do about it.',
      control: 'Ownership is confirmed with the owner, not assigned by procurement, and the measure appears in a forum they attend.',
      record: 'Owner register per behaviour: name, measure, review forum, agreed target range.',
      pitfall: 'Accepting "procurement will monitor it", which converts a business behaviour into an enforcement task and guarantees decay after go-live.'
    },
    {
      title: 'Instrument the point of behaviour',
      role: 'Procurement Operations',
      desc: 'Report coverage, exceptions and cycle time by department and transaction type, showing each unit its own figures against its own history and peers.',
      control: 'Reporting is generated from transactional systems on a fixed cadence, and coverage is measured against actual transactions rather than catalogue breadth.',
      record: 'Monthly unit-level view: transactions routed, exceptions with reasons, cycle time, versus the go-live baseline.',
      pitfall: 'Publishing a single group compliance percentage, which is universally understood to be nobody\'s problem.'
    },
    {
      title: 'Run an exception review that changes the design',
      role: 'Category Manager',
      desc: 'Every quarter, take the recurring exceptions, decide for each whether the requirement is legitimate, and change the channel - catalogue, stock, card rule, threshold - where it is.',
      control: 'Each recurring exception has a recorded disposition: accepted with reason, resolved by design change, or refused with the decision owner named.',
      record: 'Design-change log with the exception evidence, the change made and the measured effect.',
      pitfall: 'Closing exceptions with reminders and training while the underlying requirement stays unserved, which produces the same list next quarter and a compliance meeting to discuss it.'
    },
    {
      title: 'Test for decay against the locked baseline',
      role: 'Procurement Operations',
      desc: 'At each review, compare behaviour and unit rates against the go-live baseline rather than against last month, and state the variance in absolute money, not percentage of target.',
      control: 'The baseline is locked; re-baselining requires the same approval route as the original savings claim.',
      record: 'Decay report: behaviour measure, price measure, absolute variance against the baseline, cause, proposed action.',
      pitfall: 'Quietly resetting the starting point each year, so the programme reports "stable" while the booked benefit has dissolved.'
    },
    {
      title: 'Escalate an eroding result as a business decision',
      role: 'Head of Procurement',
      desc: 'Where decay is material and the owner cannot arrest it, put a specific decision - reinstate the control, change the channel, accept the new level - to the accountable executive with the money attached.',
      control: 'Escalation carries options and a recommendation with costs, and the resulting decision is recorded with its owner.',
      record: 'Decision note: measured erosion, options, chosen position, owner and review date.',
      pitfall: 'Managing decline through reporting language, which preserves the narrative for four quarters and then surfaces as a variance nobody can explain.'
    },
    {
      title: 'Close the loop with the people doing it',
      role: 'Department Manager',
      desc: 'Feed the result back to the units whose behaviour changed - orders removed, invoices avoided, days recovered - in their own numbers, because a visible benefit is what makes the habit survive attention moving elsewhere.',
      control: 'Feedback is on the same cadence as the measure and reaches the unit rather than only its manager.',
      record: 'Unit-level result note shared in the owning forum, with the next period\'s figure agreed.',
      pitfall: 'Reporting only to the procurement steering group, where the audience is the people least able to change the behaviour.'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'A catalogue launch hit 92 percent line coverage but only 38 percent of actual transactions route through it. The steering group is hearing "launch complete".',
      q: 'What should be reported instead?',
      options: [
        { text: 'Coverage, with a note that adoption will improve with training.', isCorrect: false, rationale: 'Coverage measures what the catalogue contains, not what people use. Reporting it as completion is precisely how an unadopted channel is declared finished, and the 38 percent will not fix itself with training if it is a design problem.' },
        { text: 'Transaction-based adoption by unit, with the top three exception reasons and what each says about the channel design.', isCorrect: true, rationale: 'Correct. Adoption measured as a share of actual transactions is the only figure that describes the benefit, and disaggregating it by unit plus reason turns a number into a workable list - usually a small set of design gaps concentrated in a few teams.' },
        { text: 'The value of off-catalogue spend as an opportunity for year two.', isCorrect: false, rationale: 'It reframes a failing as a pipeline. Honest and useful later, but at this review the question is whether the launched channel works, and a year-two opportunity line defers that answer.' },
        { text: 'Cycle time comparison between catalogue and off-catalogue orders.', isCorrect: false, rationale: 'A genuinely useful diagnostic and often the reason for the 38 percent - but as a supporting measure, not the headline. Reporting cycle time instead of adoption lets the launch still be called complete.' }
      ],
      principle: 'Measure coverage against transactions, never against the catalogue. Breadth is a design output; routing is the behaviour.'
    },
    {
      type: 'scenario',
      context: 'Six months after a consolidation, vendor count has climbed from 40 back to 130. Most new vendors are small capital orders and site-managed repairs.',
      q: 'What is the most effective response?',
      options: [
        { text: 'Block new vendor creation below USD 25,000 and require procurement approval.', isCorrect: false, rationale: 'This is the control that caused the original leakage in another form. Blocking creation without serving the need converts small capital orders into split requisitions, emergency codes or expense claims, all of which are more expensive to process and harder to see.' },
        { text: 'Design for the two demand types that are returning - a stocked or call-off route for repairs, and a pre-agreed capital supplier panel - and give each a business owner with a measure.', isCorrect: true, rationale: 'Correct. The vendor count is a symptom of unserved requirement patterns. Meeting those patterns with a legitimate fast route removes the reason for the workaround, and the owner-and-measure step is what prevents the same drift recurring in year three.' },
        { text: 'Report the reversal in the next quarterly review with a corrected saving.', isCorrect: false, rationale: 'Necessary and insufficient. Honesty about the number preserves credibility, but it leaves the cause unaddressed and the reversal continuing; it is a control, not an intervention.' },
        { text: 'Re-tender the repair spend to include the returning items.', isCorrect: false, rationale: 'Tendering at the wrong demand shape usually fails. Site repairs need immediacy and local settlement, which is why the market structure you negotiated does not get used.' }
      ],
      principle: 'A returning supplier population is a demand pattern your channel does not serve. Fix the route, then the count follows.'
    },
    {
      type: 'knowledge',
      q: 'Which single change most improves whether a booked benefit survives its first year?',
      options: [
        { text: 'A monthly compliance report from procurement to the steering group.', isCorrect: false, rationale: 'Central reporting by the function that cannot change the behaviour is the weakest form of ownership and typically fades by month four.' },
        { text: 'A named business owner for the sustaining behaviour, with the measure inside their own objectives.', isCorrect: true, rationale: 'Correct. Behaviour persists when the person who performs it is accountable for it. Everything else - channel design, instrumentation - supports that, and without it the benefit is sustained only while procurement keeps spending attention it no longer has.' },
        { text: 'Automatic requisition blocking when a supplier is off-contract.', isCorrect: false, rationale: 'Effective on transactional spend, and a source of hidden workarounds where the requirement is legitimate. A control without an owner moves the behaviour underground rather than removing the need for it.' },
        { text: 'A higher savings target in the following year, to force continued effort.', isCorrect: false, rationale: 'Targets without ownership produce better reporting, not better outcomes, and usually encourage re-baselining to make the number reachable.' }
      ],
      principle: 'Ownership beats monitoring. The measure that changes behaviour is the one the actor is accountable for.'
    },
    {
      type: 'scenario',
      context: 'Your team is preparing the annual review. Last year\'s baseline was USD 12.4m; measured spend this year is USD 12.1m; the booked saving was USD 900,000.',
      q: 'What makes the review credible?',
      options: [
        { text: 'Report the USD 300,000 reduction as realised against a USD 900,000 claim, with the shortfall explained.', isCorrect: true, rationale: 'Correct. This compares the claim against what actually happened on the locked baseline, in absolute money, and the shortfall is the finding: mix shift, volume growth, rates not held, or demand that moved. That is a number Finance can test and a decision the executive can act on.' },
        { text: 'Set this year\'s baseline at USD 12.1m so improvement is measured from the achieved level.', isCorrect: false, rationale: 'This is re-baselining to protect the narrative. It may be the right answer eventually, but only as a stated, approved decision with the reason recorded - not as the default in a review pack, where it silently erases last year\'s claim.' },
        { text: 'Report 96.7 percent of budgeted spend achieved.', isCorrect: false, rationale: 'A different question answered. Percentage against budget hides the absolute against the claim, which is the only comparison the funding decision depended on.' },
        { text: 'Attribute the USD 600,000 gap to volume growth and exclude it from the report.', isCorrect: false, rationale: 'A real and often dominant cause - but exclusion is not analysis. Separating price effect from volume effect is the honest treatment, and it is also the one that tells the business what to do next.' }
      ],
      calcWork: 'Claim USD 900,000 against baseline USD 12.4m implies expected spend of USD 11.5m. Actual USD 12.1m means USD 600,000 of the claim did not land - to be split between price not held and volume or mix effects, not averaged away.',
      principle: 'A review is a comparison against the promise, decomposed by cause. The decomposition is the value.'
    },
    {
      type: 'scenario',
      context: 'Four departments account for 78 percent of off-route spend, always for same-day items. The catalogue delivers in two days.',
      q: 'What is the correct diagnosis?',
      options: [
        { text: 'A compliance problem concentrated in four departments, requiring targeted training and escalation.', isCorrect: false, rationale: 'It describes the pattern accurately and treats it wrongly. Uniform behaviour across four teams with the same item type and the same urgency is a service gap; training a rational workaround does not remove the reason for it.' },
        { text: 'A service-level gap in the channel design: the compliant route does not meet the demand\'s time requirement.', isCorrect: true, rationale: 'Correct. Lead time is a specification of the channel, and where it mismatches the demand the route will be bypassed predictably. The fix - consigned stock, a local card rule, a same-day tier priced differently - comes from treating the exception list as design input.' },
        { text: 'A threshold problem: raise the approval limit so these purchases need no requisition.', isCorrect: false, rationale: 'It removes the friction but also the visibility and control, and it invites larger orders under the new limit. Speed has to be bought with route design, not by relaxing the control that makes the spend legible.' },
        { text: 'A supplier-performance problem: the contracted supplier is failing its service level.', isCorrect: false, rationale: 'Possible, and worth checking against the agreed SLA - but the pattern is the same two days for four departments, which suggests the agreed service was designed at that level rather than breached.' }
      ],
      principle: 'Predictable exceptions are requirements. Fix the lead time and the compliance problem solves itself.'
    }
  ],
  relSop: 'sop-supplier-performance-management',
  rel: {
    concepts: ['c-maverick-spend', 'supplier-performance', 'demand-management', 'category-management', 'savings-realization'],
    sops: ['sop-supplier-performance-management', 'sop-procurement-audit'],
    checklists: ['cl-supplier-performance-review', 'cl-procurement-file-completeness', 'cl-exception-approval'],
    templates: ['tpl-supplier-business-review', 'tpl-exception-request', 'tpl-contract-performance-review'],
    calcs: ['calc-budget-vs-actual', 'calc-kpi-calculator'],
    decisions: ['approve-exception', 'consolidate-suppliers'],
    kpis: ['kpi-maverick-spend', 'kpi-contract-coverage', 'kpi-savings-realization']
  },
  labMission: {
    title: 'Mission 14.3: Find the Decay Before the Report Does',
    desc: 'Take one booked benefit from your own portfolio, lock its baseline, and design the owner-and-measure loop that keeps it alive.',
    tasks: [
      'Write the behaviour that sustains it as an observable action, and name the person outside procurement who should own it.',
      'Open the Budget vs Actual tool and compare this year against the original baseline rather than against last year, in absolute money.',
      'List the three most frequent exceptions in that category and decide, for each, whether the answer is enforcement or a channel change.'
    ],
    ctaLabel: 'Open Budget vs Actual',
    ctaHref: '#/calc/calc-budget-vs-actual',
    secondaryLabel: 'Open the Audit SOP',
    secondaryHref: '#/sop/sop-procurement-audit'
  }
});
