/* ==========================================================
   Procure Sherpa v3.0 - Academy Module 20: Procurement Fraud,
   Collusion and the Controls That Catch It. Module 10 teaches
   the behaviour expected of people; nothing in the curriculum
   taught how dishonesty is detected in data, how collusion
   looks in a bid list, or what to do when you suspect both.
   Written with no apostrophes, since these strings are single
   quoted and the build reads them literally.
   ========================================================== */

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-purchasing-fraud-risk',
  title: 'Fraud Risk in Purchasing: The Patterns Behind the Numbers',
  module: 'Module 20: Procurement Fraud, Collusion and the Controls That Catch It',
  kicker: 'Function 20.1',
  tier: 'practitioner',
  tagline: 'Almost nobody steals in a way that looks like stealing on a single document. It shows in the distribution, the adjacency and the exceptions.',
  desc: 'This function covers how dishonesty actually appears in purchasing data, which conditions make it possible rather than merely tempting, the control set that reduces the opportunity, and the specific route by which a legitimate transaction becomes an illegitimate payment: the change of bank details. It also covers what a red flag is and is not, and how to triage one without accusing anyone.',
  duration: '24 mins',
  lifecycleStage: 'Stage 18: 3-Way Matching & Invoice Settlement',
  lifecycleDesc: 'Present at every transaction from intake to payment, and mostly designed at the process stage rather than at the moment of suspicion.',

  what: "Procurement fraud is rarely a forged document. It is a genuine transaction that has been arranged, or a genuine payment that has been redirected, and both leave a trace in data rather than in paperwork. The reason the discipline matters to a buyer rather than to an auditor is that the controls sit inside the process the buyer designs: who may raise, who may approve, who may add a vendor, whether one person can hold two of those roles, and whether the record of a decision exists at all. The classical frame is the fraud triangle - pressure, opportunity and rationalisation - and only one of the three is something an organisation controls. Pressure belongs to the individual and is usually invisible until later. Rationalisation is a narrative the person supplies themselves and cannot be audited out. Opportunity is a property of the process, and it is the reason control design is the honest place to put effort: a route that lets one person create a vendor, change its bank account, raise the order and approve the receipt is not a route that depends on that person being honest. The patterns that show up in data are specific and learnable. Value distributions that cluster just under an approval threshold indicate splitting, whether the intent was speed or concealment. A vendor whose address, bank account or telephone matches an employee record is an adjacency that needs explaining. Sequential vendor numbers created by the same hand around the same date are a cluster. Invoices from one supplier that arrive in odd increments, or a supplier that only ever appears in a single buyer population, or repeated use of a route with no competition and no exception approval, are all the same kind of signal: not proof, but a reason to look. The second family of patterns is the payment diversion, and it deserves a buyer understanding because it is the one fraud that can be committed against a company with no inside participant at all. An attacker reads real correspondence, waits for a genuine invoice exchange, then sends an accurate-looking change of account. Everything downstream is authentic: the goods were delivered, the invoice is real, the only lie is the account number. The control that stops it is narrow and unglamorous - verify the change using a contact the business already held, before the change, and hold the first payment for a defined window so that a detection which arrives late still has something to catch. That is why vendor master integrity is a procurement control rather than a master-data chore: the master is the payment instruction. The third point is the hardest and the most useful. Detection is not the same as assurance, and a red flag is not a finding. A flag raised without triage produces two failures: an investigation that starts from a conclusion, and a pattern nobody follows up because the noise is too high. Triage asks whether there is a benign explanation that can be evidenced, whether the same pattern appears elsewhere, and whether the data can be looked at again in a month to see whether the shape persisted. Escalation to an investigation is a decision made by someone whose job is not to defend the process that produced the flag. The last thing a buyer needs to accept is that the highest-yield detection route in most reported cases is a person who said something: a supplier mentioning an odd request, a junior buyer who noticed a duplicate, a driver who saw goods arriving at an unfamiliar address. Every control in this function is worth less than a reporting route that people trust, because systems find the patterns they were designed to see and people find the ones nobody modelled.",
  why: [
    'Opportunity is a property of the process, not of the person, and it is the only leg of the triangle an organisation can change.',
    'A single transaction almost never looks fraudulent. The evidence lives in distributions, adjacency and repetition.',
    'Payment diversion attacks a real transaction rather than a fake one, so invoice checks miss it and only the verification channel stops it.',
    'The vendor master is a payment instruction. Treating it as administrative data is what makes the loss possible.',
    'A red flag without triage produces either an unjustified investigation or a dismissed pattern, and both teach people to ignore the next flag.'
  ],
  when: [
    'When designing or simplifying an approval route, because simplification usually removes a segregation rather than a delay.',
    'At any vendor creation or banking change, which is where the control has to sit rather than downstream.',
    'During a periodic spend review, when the same buyer and the same supplier keep appearing together.',
    'When a supplier or an employee says something that does not fit, which is the earliest signal available.',
    'After an incident, when the question is which control failed and not which person to blame.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Owns the exception pattern in the category and answers the questions a distribution raises.' },
    { role: 'Vendor Master Clerk', resp: 'Creates and amends records, runs duplicate searches, and refuses changes that arrive outside the route.' },
    { role: 'Finance Controller', resp: 'Authorises banking changes, sets the freeze window, and holds the second approval.' },
    { role: 'Internal Audit', resp: 'Samples the control on a schedule and reports a pass rate rather than an absence of complaints.' },
    { role: 'Head of Procurement', resp: 'Owns the reporting route, the non-retaliation position and the decision to escalate.' }
  ],
  inputs: [
    'Requisition and purchase order value distribution against approval thresholds.',
    'Vendor master with bank account, address, tax identifier and creation metadata.',
    'Employee master data for the adjacency comparison, held under the data protection rules that apply.',
    'Exception and single-source approvals, with requester, approver and reason.'
  ],
  outputs: [
    'A triaged flag list, with each entry showing the pattern, the benign explanation tested and the decision.',
    'A control statement for the vendor route: who may change what, who verifies, and where the freeze window applies.',
    'A periodic sample result showing whether verification evidence actually exists behind the log.',
    'A reporting route that people outside procurement know how to use, with a published triage path.'
  ],
  controls: [
    'No payment-affecting field is changed from an email or message, and no verification uses a contact supplied inside the request.',
    'Requester and approver are different people on any vendor change, and the separation is tested rather than assumed.',
    'Red flags are triaged with the explanation recorded, and a flag is never treated as proof.',
    'The control is sampled on a schedule; a log without callback evidence behind it counts as a failure.'
  ],
  bestPractices: [
    'Design the control for the person you trust least in the role, and describe it as protection for everyone rather than as suspicion.',
    'Review distributions rather than averages, since averages hide exactly the clustering that matters.',
    'Keep the vendor master clean for its own sake: duplicates are a visibility failure first and a fraud opportunity second.',
    'Close the loop on reports at an aggregate level, because a channel that produces nothing visible stops being used within a year.'
  ],
  mistakes: [
    'Testing segregation once at the design stage and never again, while permissions drift with every reorganisation.',
    'Investigating one flag as though it were a case, then discarding the flag list because it felt unfair.',
    'Treating an emergency payment as a reason to skip verification, which is the standard shape of the loss.',
    'Routing a concern to the line manager of the person named in it, which ends the reporting route for everyone watching.'
  ],
  terms: [
    { term: 'Fraud triangle', def: 'The three conditions - pressure, opportunity and rationalisation - of which only opportunity is a control variable.' },
    { term: 'Red flag', def: 'An observable pattern consistent with manipulation, which is a reason to look rather than a finding.' },
    { term: 'Payment diversion', def: 'A fraud that changes the beneficiary of a genuine invoice, usually by altering bank details during real correspondence.' },
    { term: 'Freeze window', def: 'A deliberate delay on the first payment to a changed account, so that late detection still has money to catch.' }
  ],

  thinkingPoints: [
    {
      quote: 'The control nobody tested.',
      explanation: 'A process review confirmed segregation of duties in a purchasing route: the roles were defined, documented and approved. Two years later a case showed that a systems change had quietly given one account both create and approve permissions. The design was correct, the record of the design was correct, and nobody had tested the live permissions once in between.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: segregation is a state of the system rather than a statement in a document, and it decays without anyone deciding to remove it.',
      reflectionPrompt: 'When was the last time someone tested your segregation controls against live permissions rather than against a policy?',
    },
    {
      quote: 'Everything was genuine except the number.',
      explanation: 'A supplier chased a real overdue invoice, and in the same week the payables mailbox received a letterhead-accurate note with new account details. The invoice was legitimate, the goods had arrived, the document looked correct, and the payment was made. The loss was found when the supplier raised the unpaid invoice again a month later.',
      realWorldExample: 'Illustrative example: the strongest feature of this fraud is that it attaches to a genuine transaction, so every check on the transaction passes.',
      reflectionPrompt: 'Who in your organisation can change a bank account, and what evidence would you need to show that the change was verified out of band?',
    }
  ],

  sopSteps: [
    { title: 'Map who can do what in the route', role: 'Head of Procurement',
      desc: 'List the five acts - request, approve, create vendor, change payment detail, confirm receipt - and name who holds each. Then check the live permissions rather than the policy document, because the drift is in the system.',
      control: 'No person holds two of the five on the same transaction, and the check is performed on live permissions.',
      record: 'Role and permission map with the date tested and the tester named.',
      pitfall: 'Testing at design and never again, then discovering the overlap two years later inside a case file.'
    },
    { title: 'Review the value distribution against thresholds', role: 'Category Manager',
      desc: 'Plot transaction values against the approval thresholds for the category and look for clustering underneath a limit. Splitting may be a control failure or simply a slow route, and the remedy differs - but both need fixing.',
      control: 'Threshold clustering is reviewed on a schedule and the explanation is evidenced rather than accepted verbally.',
      record: 'Distribution review with the exceptions and their written explanation.',
      pitfall: 'Reading averages, which hide the exact pattern the review exists to find.'
    },
    { title: 'Run the adjacency checks you are allowed to run', role: 'Internal Audit',
      desc: 'Compare vendor address, bank account and contact fields against employee records, within whatever data protection rules apply. A match is not proof and is often coincidence; it is a question that needs an answer.',
      control: 'Matches are triaged by someone outside the reporting line of the people named.',
      record: 'Adjacency run with match list, triage notes and outcomes.',
      pitfall: 'Treating a match as a case rather than as a signal, which damages people and discredits the check.'
    },
    { title: 'Put every banking change through the record route', role: 'Vendor Master Clerk',
      desc: 'Refuse changes arriving by email, letter or phone message, and re-submit them through the vendor master request with the original attached. This is the step that feels bureaucratic and is the reason the loss does not happen.',
      control: 'A payment-affecting field is altered only from a logged request, never from the message itself.',
      record: 'Change request with the original correspondence preserved.',
      pitfall: 'Accepting a well-formatted letter as identity evidence, since formatting proves nothing about authorship.'
    },
    { title: 'Verify with a contact held before the request', role: 'Finance Controller',
      desc: 'Call the number already on file, or one obtained independently, and speak to a named person at the supplier. Never confirm using details inside the change request, because those are the artefact the attacker controls.',
      control: 'The callback names the number used, the person spoken to and the time, and it is performed by someone who did not receive the request.',
      record: 'Callback note attached to the change record.',
      pitfall: 'Calling the contact number printed on the letter, which reaches whoever wrote the letter.'
    },
    { title: 'Hold the first payment', role: 'Accounts Payable Lead',
      desc: 'Apply a defined freeze window before the first payment to a changed account and notify the supplier through a known channel that the change is recorded and that one payment is deliberately late. Early release needs approval above the requester.',
      control: 'The window applies to every change without exception, and the release date is logged.',
      record: 'Payment hold with the release approval and date.',
      pitfall: 'Waiving the window for a supplier who is inconvenient to delay, which is the population most exposed to the fraud.'
    },
    { title: 'Triage the flag before escalating it', role: 'Head of Procurement',
      desc: 'Ask whether a benign explanation can be evidenced, whether the pattern repeats elsewhere, and whether it persists next month. Then decide who owns the decision to open a case, and make sure that person is not the owner of the process being questioned.',
      control: 'Escalation is a named decision by someone independent of the route, and the triage record survives either outcome.',
      record: 'Triage note with the explanation tested, the decision and the decision maker.',
      pitfall: 'Starting an investigation from the pattern rather than from the question, which predetermines the answer and the harm.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A review of a category finds 214 purchase orders clustered between 92 and 99 percent of a single approval threshold. The buyer says the route is simply faster under the limit.',
      q: 'What is the correct next step?',
      options: [
        { text: 'Accept the explanation, since the buyer knows the route.', isCorrect: false, rationale: 'The explanation may be true and it has not been evidenced. Accepting it on authority is how a distribution stays unexamined for years.' },
        { text: 'Test the explanation: check whether the values would have been approved anyway, whether the same buyer uses the route most, and whether the pattern persists next month.', isCorrect: true, rationale: 'Correct. This is triage. A benign cause is possible and can be shown with data; a threshold-avoidance habit is also possible and is a control failure either way.' },
        { text: 'Open a fraud investigation on the buyer.', isCorrect: false, rationale: 'That starts from the pattern rather than the question, and it harms a person on the strength of a distribution that has an innocent explanation half the time.' },
        { text: 'Raise the threshold so the clustering stops.', isCorrect: false, rationale: 'That removes the visible symptom by moving the boundary the behaviour is organised around, and it adds approval delay to everyone.' }
      ],
      principle: 'A red flag is a reason to look. Triage is the discipline that decides whether to look harder, and it is done with data rather than with authority.',
    },
    {
      type: 'scenario',
      context: 'A supplier with an open, genuine invoice emails a change of bank account, with correct letterhead, the real supplier name and a plausible explanation about a treasury reorganisation.',
      q: 'What makes this transaction dangerous?',
      options: [
        { text: 'The letterhead looks slightly wrong.', isCorrect: false, rationale: 'It usually looks exactly right, and training people to spot bad graphics teaches them a skill the attack does not require.' },
        { text: 'Every element being checked is genuine: the invoice, the goods and the relationship. The only false item is the account number, and it arrives inside a real conversation.', isCorrect: true, rationale: 'Correct. This is the shape of payment diversion. The defence is not better document reading; it is verification through a channel that existed before the request, plus a hold on the first payment.' },
        { text: 'The supplier should not be able to change details mid-contract.', isCorrect: false, rationale: 'They can and they do, legitimately and often. The control is on verification, not on permission.' },
        { text: 'Payment should be refused until the invoice is re-submitted.', isCorrect: false, rationale: 'That delays a legitimate obligation without verifying anything, and it teaches the team that controls are an obstacle.' }
      ],
      principle: 'Verify a payment change using contact details the business already held. A contact supplied inside the request reaches whoever wrote the request.',
    },
    {
      type: 'scenario',
      context: 'One person in a small team can create a vendor, approve the requisition and confirm the goods receipt. The team is trusted and the volumes are low.',
      q: 'What is the proportionate response?',
      options: [
        { text: 'Nothing: the control is designed for large populations and the team is small.', isCorrect: false, rationale: 'Small populations are where combined roles are most common and least reviewed, and trust is not a compensating control - it is the thing being tested.' },
        { text: 'Add a compensating control: independent verification of any payment-affecting change, a second signature above a threshold, and a scheduled sample of the transactions by someone outside the team.', isCorrect: true, rationale: 'Correct. Where segregation is impossible, detection substitutes for prevention and it has to be scheduled rather than volunteered. The cost is small and the exposure it closes is the entire route.' },
        { text: 'Record the risk acceptance in a policy document and move on.', isCorrect: false, rationale: 'Documenting a known gap without a compensating control is how an organisation proves it knew.' },
        { text: 'Rotate the team so nobody holds all three roles for long.', isCorrect: false, rationale: 'Better than nothing, and weaker than a scheduled independent review, since rotation without review still leaves the transactions unseen.' }
      ],
      calcWork: 'No arithmetic here. The relevant calculation is loss duration multiplied by transaction value: an undetected combined role is measured in years, not in invoices.',
      principle: 'Where segregation cannot be achieved, detection has to be scheduled, funded and owned by someone outside the route.',
    },
    {
      type: 'scenario',
      context: 'A vendor master report shows 1,180 active records, 41 of them with no payment in three years, and eleven pairs sharing a bank account across different trading names.',
      q: 'Which finding should be acted on first?',
      options: [
        { text: 'The 41 dormant records, since they inflate the master.', isCorrect: false, rationale: 'They matter for hygiene and for reactivation risk, but they are not the live exposure today.' },
        { text: 'The eleven shared bank accounts, since a single beneficiary behind several records is the classic route for both duplicate payment and concealed preference.', isCorrect: true, rationale: 'Correct. Shared beneficiary details are a pattern that needs an explanation now: it may be a legitimate group structure with a documented mandate, or it may be one person behind several suppliers. Either way it is the cheapest and highest-value check on the list.' },
        { text: 'Nothing: both could be legitimate.', isCorrect: false, rationale: 'Both could be. That is an argument for triage rather than for inaction.' },
        { text: 'The pairs, but only if the amounts paid exceed a threshold.', isCorrect: false, rationale: 'Threshold screening on amount misses the point: adjacency is the signal, and small repeated payments to a hidden common beneficiary are exactly how a scheme stays quiet.' }
      ],
      principle: 'Prioritise the pattern that can still cause loss today over the one that merely makes the data untidy.',
    },
    {
      type: 'scenario',
      context: 'A company introduces an anonymous reporting line. In year one it receives two reports. The programme owner presents this as evidence of a clean culture.',
      q: 'What is the more likely reading?',
      options: [
        { text: 'Two reports in a year is a normal volume for any channel.', isCorrect: false, rationale: 'Volume depends on population and exposure, so the number alone proves nothing - and using it as proof either way is the error.' },
        { text: 'A channel with almost no reports has an adoption problem, and the reason is usually that people cannot see what happens after a report is made.', isCorrect: true, rationale: 'Correct. Most reported cases in this class of fraud surface through a person rather than a control, so an unused channel is a detection gap. The fix is visible triage, published aggregate outcomes and demonstrable protection - not a poster.' },
        { text: 'Reports should be encouraged by offering a share of recovered money.', isCorrect: false, rationale: 'Incentives change what people report as well as how much, and they invite the speculation that a good report is meant to be.' },
        { text: 'Low volume is a reason to cut the channel and rely on audit.', isCorrect: false, rationale: 'That removes the route with the widest coverage and keeps the one that only sees the patterns it was designed to see.' }
      ],
      principle: 'A reporting channel is a detection control, and like any control it is measured by use and outcome rather than by existence.',
    }
  ],

  relSop: 'sop-vendor-master-integrity',
  rel: {
    concepts: ['fraud-triangle', 'red-flag-indicators', 'vendor-master-integrity', 'payment-diversion', 'segregation-of-duties', 'audit-trail', 'whistleblower-channel'],
    sops: ['sop-vendor-master-integrity', 'sop-procurement-audit', 'sop-supplier-onboarding'],
    checklists: ['cl-procurement-audit', 'cl-exception-approval', 'cl-procurement-file-completeness'],
    templates: ['tpl-exception-request', 'tpl-supplier-due-diligence'],
    calcs: ['calc-po-value-check', 'calc-budget-vs-actual'],
    decisions: ['approve-exception'],
    kpis: ['kpi-contract-compliance', 'kpi-maverick-spend'],
    glossary: ['gloss-segregation-of-duties', 'gloss-doa', 'gloss-procure-to-pay']
  },
  labMission: {
    title: 'Mission 20.1: Look at Your Own Distribution',
    desc: 'Take one category, run three pattern checks against your own data, and write the triage note for whatever you find.',
    tasks: [
      'List the five route actions - request, approve, create vendor, change payment detail, confirm receipt - and name who holds each in your team. Then check the live permissions.',
      'Compare your last month of purchase order values against your approval thresholds and describe any clustering you see.',
      'Search your vendor list for shared bank accounts, addresses or contacts, and write the question you would ask about each match.'
    ],
    ctaLabel: 'Open PO Value Check',
    ctaHref: '#/calc/calc-po-value-check',
    secondaryLabel: 'Open the Procurement Audit Checklist',
    secondaryHref: '#/checklist/cl-procurement-audit'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-bid-rigging-detection',
  title: 'Bid Rigging and the Tender That Was Never Contested',
  module: 'Module 20: Procurement Fraud, Collusion and the Controls That Catch It',
  kicker: 'Function 20.2',
  tier: 'executive',
  tagline: 'A competition can be procedurally flawless and commercially empty. The tell is in who loses, and by how little.',
  desc: 'This function covers the standard forms of collusive tendering, the patterns visible in bid data, what a buyer can lawfully and practically do when collusion is suspected, and the design choices in a tender that make collusion expensive rather than comfortable. It is written for the general case and for small markets, where the same three firms answer every invitation.',
  duration: '26 mins',
  lifecycleStage: 'Stage 6: Tender & RFQ Preparation',
  lifecycleDesc: 'Designed before the tender opens, because the shape of the event determines how easy or hard coordination is.',

  what: "Collusion in a procurement market is not usually a secret meeting. It is a stable arrangement in which the parties know each other, meet repeatedly, and can predict each other behaviour - and the buyer is the only person in the room who sometimes cannot. The classic forms are worth naming precisely. Bid rotation is the simplest: the firms take turns winning, sometimes with compensation paid through subcontracting or through a losing bid that stays close enough to look competitive. Cover bidding is the submission of bids that were never intended to win, priced high or technically framed to lose, so that the genuine winner appears to face competition. Suppression is the absence of a bid: a firm invited declines, or quotes a figure that guarantees it will not be selected, in exchange for forbearance elsewhere. Market allocation divides work by territory, by customer or by product line so that one firm is always the natural winner. Each of these produces a bidding record that satisfies most procedural tests: the right number of quotes, the right documents, the right evaluation sheet, and no price movement that anyone would call anomalous. The data patterns that survive a formal review are specific. Bid spread - the gap between the lowest and the second bid - that stays remarkably similar across events while absolute prices move. A stable hierarchy of losers, where the same firms finish second, third and fourth in the same order regardless of scope. Identical errors, identical formatting quirks or identical omissions across supposedly independent bids, which suggests a common hand. Last-minute withdrawals. Suspiciously round or evenly spaced numbers. A supplier that wins in one market and loses by a fixed margin in a neighbouring one. And the widest tell of all: prices that do not compete, in a category where input costs moved. None of this is proof, and a buyer who presents a pattern as an accusation will be wrong often enough to cause harm. What the pattern does is justify a different procurement design, and that is where the executive decision sits. The mechanisms that make coordination expensive are ordinary good practice with a different purpose. Widening the market through genuine outreach to firms outside the current circle, including cross-border and smaller entrants, breaks the predictability collusion depends on. Unbundling packages so that a shared understanding about who owns the whole job stops applying to its parts. Keeping specifications outcome-based so a new entrant can compete on method. Never disclosing the bid list to participants, and never revealing prices during the event. Setting a reserve or market-reasonable reference derived from cost rather than from what the incumbents usually charge. Recording the evaluation in a way that lets a second person test it later. Running a debrief that asks the loser what would have made them cheaper, which is also intelligence about the market. And using an auction mechanism only with advice, because auctions suit standardised, high-volume, transparently priced categories and fail where specification dominates. The final obligation is the one most organisations skip. In most jurisdictions there are competition regimes and reporting routes, and some offer leniency to a participant who reports first - which means a buyer who suspects collusion has a real choice between quietly re-tendering and putting the pattern in front of someone whose job is to test it. The honest position for a procurement function is to hold the record, escalate internally to a named owner in legal or compliance, stop the award if the pattern is material, and never conduct its own intelligence operation against suppliers. A buyer is not an investigator, and a market suspicion handled by the wrong person becomes both a legal exposure and an unfair allegation against a firm that may simply have priced badly.",
  why: [
    'A procedurally perfect tender can produce no competitive tension, and process compliance is the camouflage collusion relies on.',
    'The durable signals are relative - spread, hierarchy of losers, repeated errors - so reviewing absolute prices alone will miss them.',
    'Coordination depends on predictability, and every design choice that adds uncertainty to who will bid makes the arrangement more expensive to maintain.',
    'Handling suspicion inside the buying team creates both legal exposure and unfair harm to a supplier that may have priced badly.',
    'Small markets genuinely look collusive sometimes, which is exactly why the pattern must be evidenced before anything is said.'
  ],
  when: [
    'Before opening a tender in a market with few recurring participants.',
    'When bid counts, spreads or the order of finish repeat across events without moving.',
    'At award review, when the winning price does not respond to a change in input costs.',
    'When a supplier declines to bid twice in a row on work that fits them.',
    'After a debrief where the losing explanation is that the winner was impossible to beat.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Builds the bid history, records spread and participant behaviour across events, and raises the pattern.' },
    { role: 'Head of Procurement', resp: 'Decides whether the design of the event changes, and whether the award proceeds.' },
    { role: 'Legal or Compliance', resp: 'Owns the assessment of the suspicion and any external route, and protects the record while it is live.' },
    { role: 'Specification Owner', resp: 'Keeps requirements outcome-based enough that a new entrant can compete.' },
    { role: 'Finance', resp: 'Provides the cost-derived reference price rather than the incumbent-derived one.' }
  ],
  inputs: [
    'Bid history across events: participants, prices, evaluation scores and outcomes.',
    'The market structure: number of credible suppliers, entry barriers, concentration measures available publicly.',
    'Cost model or market reference for the scope, independent of what incumbents usually charge.',
    'Records of invitations, declines and withdrawals, with the reasons stated.'
  ],
  outputs: [
    'A pattern note: which signals appeared, across how many events, and what benign explanation was tested.',
    'A re-designed route: widened market, unbundled scope, outcome specification, reserve price derived from cost.',
    'An escalation decision with a named owner, and a documented record preserved in its original form.',
    'A debrief record that asks losers what would have made them cheaper and reports what changed as a result.'
  ],
  controls: [
    'The participant list is never disclosed to bidders, and no price information is shared during a live event.',
    'Bid spreads and the order of finish are recorded across events rather than judged within one award.',
    'A material pattern stops the award and goes to a named compliance owner, not to the buying team for judgement.',
    'Any external reporting route is decided by legal, with the record preserved before anyone is told.'
  ],
  bestPractices: [
    'Widen the market deliberately: outreach to firms outside the usual circle is cheaper than any analysis of the usual circle.',
    'Unbundle where it is practical, since a shared understanding about a whole package does not survive being split.',
    'Use a reserve derived from cost modelling, which is the only way to tell an efficient market from a comfortable one.',
    'Run the debrief as market intelligence and record it, especially the answer from the firm that lost twice.'
  ],
  mistakes: [
    'Reading a low bid count as a specification problem only, and never asking about relationships between bidders.',
    'Telling a supplier what the winning price was, which is both a fairness breach and a lesson in how to bid next time.',
    'Conducting an internal investigation into named firms by people whose job is buying from them.',
    'Assuming collusion in a genuinely concentrated market, and damaging a supplier who simply prices badly.'
  ],
  terms: [
    { term: 'Cover bid', def: 'A bid submitted with no intention of winning, to make the arrangement look competitive.' },
    { term: 'Bid rotation', def: 'An agreement on who wins next, often with compensation through subcontracting or forbearance.' },
    { term: 'Bid suppression', def: 'A credible bidder standing down, by declining, withdrawing or pricing to lose.' },
    { term: 'Bid spread', def: 'The gap between the lowest bid and the next, meaningful across events rather than inside one.' }
  ],

  thinkingPoints: [
    {
      quote: 'Four tenders, three firms, one winner each.',
      explanation: 'A facilities scope was re-tendered four times over three years. Each event had three bids, each was compliant, and each was won by a different firm - always by a margin of two to four percent over the second. Nobody looked at the sequence because nobody looked at the other three events. The pattern was found in an hour once someone listed all four on one sheet.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: collusion is often visible only across events, and most procurement review is organised one award at a time.',
      reflectionPrompt: 'Can you produce, in one table, the last ten awards in a category with participants, prices and finishing order?',
    },
    {
      quote: 'The debrief that taught the market.',
      explanation: 'A losing supplier asked what the winner had charged. The buyer shared the number as a courtesy. In the following three events every bid landed within a narrow band just under that figure, and the savings position that had looked like competition became a price floor with a documented origin.',
      realWorldExample: 'Illustrative example: information shared to be helpful is used to coordinate, and the buyer has handed the market a reference point nobody approved.',
      reflectionPrompt: 'What do you say in a debrief, and is the reserve or winning price in it?',
    }
  ],

  sopSteps: [
    { title: 'Record the market before the event', role: 'Category Manager',
      desc: 'Write down who the credible suppliers are, how many there are, who has been absent recently and what the entry barriers look like. A pattern identified afterwards is far weaker than a market described beforehand.',
      control: 'The market note is written before invitations go out and is kept with the award file.',
      record: 'Market structure note with participants, absences and barriers.',
      pitfall: 'Assuming the shortlist is the market, which is how a comfortable circle becomes invisible to the buyer.'
    },
    { title: 'Invite wider than the familiar list', role: 'Head of Procurement',
      desc: 'Add credible entrants, cross-border suppliers and smaller firms able to take part of the scope, and record who was invited as well as who responded. Uninvited suppliers cannot bid, and an invitation list that never changes is a market decision nobody made.',
      control: 'The invitation list changes between events, and the reason for any repeated exclusion is documented.',
      record: 'Invitation list with responses, declines and stated reasons.',
      pitfall: 'Treating a decline as disinterest when it may be the result of an arrangement between suppliers.'
    },
    { title: 'Keep the specification outcome-based', role: 'Specification Owner',
      desc: 'State the result required rather than the method expected wherever the technical position allows, so a new entrant can compete on approach. Method-prescribing specifications protect incumbents, sometimes deliberately.',
      control: 'Any method-level requirement carries a written reason and a challenge from the category manager.',
      record: 'Requirement note showing where method was mandated and why.',
      pitfall: 'Accepting a specification written by the likely winner because it was the only expert available.'
    },
    { title: 'Set a reserve from cost, not from history', role: 'Finance',
      desc: 'Build the market-reasonable reference from the cost model - inputs, labour, overhead, margin - rather than from what the incumbents usually charge. A price that beats the incumbent by three percent can still be far above cost.',
      control: 'The reserve or reference is derived independently and recorded before bids open.',
      record: 'Cost-derived reference with its assumptions and date.',
      pitfall: 'Using prior winning prices as the benchmark, which locks in whatever the market had already settled on.'
    },
    { title: 'Protect the event from information leakage', role: 'Category Manager',
      desc: 'Never disclose the participant list, never share bid prices during the event, keep questions and answers identical for everyone, and log any contact from a bidder about the competition. Coordination depends on predictability and on seeing the other hands.',
      control: 'All bidder communication is logged, and any request for another participant details is refused and recorded.',
      record: 'Communication log with every bidder contact and its response.',
      pitfall: 'A friendly debrief that names the winning price, which becomes the reference point for the next three events.'
    },
    { title: 'Analyse across events, not within one', role: 'Head of Procurement',
      desc: 'Build the ten-award table for the category: participants, prices, spreads, evaluation scores and finishing order. Look for a stable hierarchy of losers, spread repetition, common errors and synchronized withdrawals.',
      control: 'Pattern review happens on a schedule across a category, and the output is a written note rather than a private impression.',
      record: 'Cross-event pattern note with the signals listed and the benign explanations tested.',
      pitfall: 'Concluding collusion from one event, which is both unfair and unsupported.'
    },
    { title: 'Escalate to a named owner and stop inventing evidence', role: 'Legal or Compliance',
      desc: 'Where a material pattern exists, hand the record to legal or compliance, preserve documents as they are, and decide whether the award proceeds. Do not run an intelligence exercise against suppliers from the buying team.',
      control: 'Escalation is dated, addressed to a named owner, and the buying team stops its own investigation at that point.',
      record: 'Escalation note with the pattern, the preserved record list and the decision on the award.',
      pitfall: 'Confronting a supplier with a suspicion, which converts a commercial question into a legal one and warns the party being examined.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'Five consecutive awards in a category show the same three bidders, and the finishing order has been identical every time with spreads between 2 and 4 percent.',
      q: 'What does this justify?',
      options: [
        { text: 'A conclusion that the firms are colluding, and a report to the competition authority.', isCorrect: false, rationale: 'The pattern is consistent with coordination and also consistent with a stable market of three credible firms. Reporting an interpretation rather than an evidenced pattern harms a supplier and weakens the case if it later becomes real.' },
        { text: 'A written pattern note, a widened invitation list at the next event, an outcome-based specification and a cost-derived reserve - plus escalation if the pattern persists or a new signal appears.', isCorrect: true, rationale: 'Correct. The proportionate response changes the design so that coordination becomes expensive, records what was seen, and leaves judgement to the function that owns it.' },
        { text: 'Nothing, since the process was compliant each time.', isCorrect: false, rationale: 'Procedural compliance is the condition collusion operates under. A repeated structure that never changes is a finding even when every file is clean.' },
        { text: 'A request that the third bidder be excluded for poor value.', isCorrect: false, rationale: 'That would remove the apparent loser and tighten the market, which is close to the opposite of what the pattern calls for.' }
      ],
      principle: 'A pattern across events justifies better design and a written record, and only a named owner justifies an allegation.',
    },
    {
      type: 'scenario',
      context: 'A buyer is told by a long-standing supplier that two competitors would be unhappy to see them win a particular package, and that they might quote high this time.',
      q: 'What should the buyer do?',
      options: [
        { text: 'Take it as market intelligence and reduce the invitation list to the two firms mentioned.', isCorrect: false, rationale: 'That acts on a hint, narrows the market on someone else advice, and makes the buyer a participant in the arrangement.' },
        { text: 'Record the conversation verbatim with date and context, keep the invitation list unchanged and widened where possible, and pass the note to the compliance owner.', isCorrect: true, rationale: 'Correct. A contemporaneous record of what was said is the most valuable artefact in this class of case, and the decisions that follow belong to legal rather than to the buyer being spoken to.' },
        { text: 'Ask the supplier to put it in writing so it can be used.', isCorrect: false, rationale: 'Pressuring a source to document an accusation can destroy the evidence, expose the source and contaminate the record.' },
        { text: 'Ignore it, since the buyer cannot verify what was not seen.', isCorrect: false, rationale: 'Ignoring removes the only early notice available. Written down, an unverified statement is a lead; unrecorded, it is nothing.' }
      ],
      principle: 'Write down what was said, who said it and when. Then stop, because the next step is not a procurement decision.',
    },
    {
      type: 'scenario',
      context: 'Input costs for a category fell noticeably over the year, and the winning price at renewal fell by 1 percent.',
      q: 'What is the correct reading?',
      options: [
        { text: 'The supplier passed through most of the reduction in a difficult market.', isCorrect: false, rationale: 'That is possible and it needs testing. The claim is about the relationship between cost movement and price movement, and it cannot be settled by goodwill.' },
        { text: 'A cost-derived reference is needed: model what the price should be now, and treat the gap between that and the bid as the negotiation position.', isCorrect: true, rationale: 'Correct. Without an independent reference there is no way to distinguish a soft market from a comfortable one, and comparing to last year winning price is comparing to whatever the market already agreed.' },
        { text: 'Accept it, since a reduction is a reduction.', isCorrect: false, rationale: 'A reduction against a benchmark nobody set is not evidence of competition.' },
        { text: 'Open a reverse auction to force the price down.', isCorrect: false, rationale: 'Possible, and it needs design advice: auctions behave badly where specification dominates or where participants can read each other.' }
      ],
      calcWork: 'If the cost model puts the fair price at 12 percent below last award, a 1 percent reduction is an 11 percent gap - and 11 percent of the package value is the number to negotiate against.',
      principle: 'Prices only mean something against a reference built from cost, not against the previous winning bid.',
    },
    {
      type: 'scenario',
      context: 'Two of four invited bidders withdrew at the last minute, both citing capacity, and the remaining two were within 3 percent of each other.',
      q: 'What is the proportionate response?',
      options: [
        { text: 'Award to the lower of the two bids, since the process was valid.', isCorrect: false, rationale: 'Defensible on the face of it, and it discards the only unusual signal in the event. Two withdrawals from the same part of the market is data.' },
        { text: 'Record the withdrawals and their stated reasons, contact the withdrawing firms for a market view without accusing anyone, review the pattern across the last events, and proceed only if the competitive position holds.', isCorrect: true, rationale: 'Correct. Withdrawal clustering is one of the recognised signals, and the answer is to document it, widen the next event and test whether the shape repeats - not to abandon a valid award or to pretend nothing happened.' },
        { text: 'Cancel the tender and re-issue to the same four.', isCorrect: false, rationale: 'Re-running against the same list reproduces the same conditions and adds delay.' },
        { text: 'Ask the two remaining bidders why the others left.', isCorrect: false, rationale: 'That invites speculation from competitors and leaks the event state. Market questions go to the market, in writing, with care.' }
      ],
      principle: 'Unusual absences are part of the bid data. Record them with the reason given, and watch whether they cluster.',
    },
    {
      type: 'scenario',
      context: 'A junior evaluator notices that two supposedly independent bids contain the same unusual arithmetic error in the same line item.',
      q: 'What makes this worth doing something about?',
      options: [
        { text: 'Nothing - errors happen, and two firms can make the same mistake.', isCorrect: false, rationale: 'They can, and a common distinctive error is a reason to look at the whole bid pair rather than to shrug. Dismissing it teaches the evaluator to stop reporting.' },
        { text: 'It is a specific, checkable artefact: the evaluator should note both bids, the line, the error, and any further shared quirks, and put that in the pattern note.', isCorrect: true, rationale: 'Correct. A shared unusual error is one of the more persuasive signals because it is hard to explain by independence, and it is cheap to document properly at the moment it is seen.' },
        { text: 'The evaluator should ask both suppliers how they prepared the bid.', isCorrect: false, rationale: 'That opens a live channel with bidders on a suspicious matter and warns them. It belongs to whoever owns the assessment.' },
        { text: 'The evaluator should reject both bids for non-independence.', isCorrect: false, rationale: 'A decision with legal weight, taken by the person least positioned to take it, on one artefact that has an innocent explanation sometimes.' }
      ],
      principle: 'Document the artefact where it is found, by the person who found it, and let the escalation decision sit somewhere else.',
    }
  ],

  relSop: 'sop-rfp',
  rel: {
    concepts: ['bid-rigging-patterns', 'competitive-tension', 'supplier-market-analysis', 'evaluation-criteria', 'sourcing-strategy', 'should-cost'],
    sops: ['sop-rfp', 'sop-rfq', 'sop-supplier-evaluation'],
    checklists: ['cl-rfp-preparation', 'cl-quote-comparison', 'cl-supplier-evaluation', 'cl-procurement-file-completeness'],
    templates: ['tpl-bid-comparison', 'tpl-weighted-scoring', 'tpl-bid-instructions', 'tpl-award-recommendation'],
    calcs: ['calc-compare-quotes', 'calc-should-cost', 'calc-supplier-concentration'],
    decisions: ['sourcing-method', 'competitive-or-single', 'make-or-buy'],
    kpis: ['kpi-bid-rate', 'kpi-sourcing-coverage', 'kpi-supplier-concentration'],
    glossary: ['gloss-rfp', 'gloss-rfq', 'gloss-hhi', 'gloss-single-source']
  },
  labMission: {
    title: 'Mission 20.2: Build the Ten-Award Table',
    desc: 'Assemble one cross-event table for a category you know, and read it as a market rather than as ten decisions.',
    tasks: [
      'List the last ten awards in a category: participants, prices, spreads and finishing order in one table.',
      'Use the quote comparison tool on two of those events and check whether the price position moved with any cost change you can name.',
      'Write the market note you would have wanted before the next tender: credible suppliers, absences, barriers, and what you would change in the design.'
    ],
    ctaLabel: 'Open Quote Comparison Tool',
    ctaHref: '#/calc/calc-compare-quotes',
    secondaryLabel: 'Open Supplier Concentration Tool',
    secondaryHref: '#/calc/calc-supplier-concentration'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-fraud-response-and-disclosure',
  title: 'Response, Evidence and the Ethics of Accusing',
  module: 'Module 20: Procurement Fraud, Collusion and the Controls That Catch It',
  kicker: 'Function 20.3',
  tier: 'executive',
  tagline: 'The first hour decides whether there is anything left to find. Most of what goes wrong after a suspicion is not the fraud - it is the handling.',
  desc: 'This function covers what to do in the first hours after a credible concern, how evidence and confidentiality are preserved, who decides, how to recover the loss and fix the route, and how to treat a supplier or employee who turns out to have been wrongly suspected. It closes with the part procurement usually skips: what changes in the control set afterwards, and how a function keeps its own judgement honest.',
  duration: '23 mins',
  lifecycleStage: 'Stage 16: Approval & Delegation of Authority',
  lifecycleDesc: 'Triggered by an event rather than by a schedule, and owned jointly by procurement, legal, human resources and finance.',

  what: "A credible concern is not yet a case, and the difference determines everything that follows. The failure mode in most organisations is not that nothing is done but that something is done too early by the wrong person: a manager who phones the supplier to ask about the invoice, a buyer who confronts a colleague in a corridor, an internal email chain that names people before anything has been verified. Each of those can destroy evidence, warn the subject, expose the organisation to a claim, and harm a person who may be innocent. The first hour has four moves, and none of them is an interview. Preserve: stop any routine deletion, secure the system records, keep the original documents in their original state, and take the transaction out of the normal workflow if it is still live - which sometimes means freezing a payment, and sometimes means not doing that visibly. Assess who owns the decision: a concern about a purchasing act belongs to someone who is not the owner of the route being questioned, and the reporting line matters more than the seniority. Contain the circle: a handful of people who need to know, a written note of who they are, and an explicit instruction not to discuss it in the usual channels. And decide on the protection question early - whether anyone is at risk of retaliation, whether a reporter needs support, and whether the subject is entitled to know anything yet, which in most cases they are not, immediately. The evidence standard is where procurement discipline helps or hurts. Buyers are used to making judgements from incomplete data quickly; an investigation needs the opposite habit. Record what is known, what is inferred and what is unknown, in separate columns, and keep the file such that someone who was not involved can follow the sequence. Chain of custody language is not theatre: it is the difference between a finding and an assertion. Where technical acquisition is needed, that belongs to forensics or to whoever is qualified, and it is one of the moments where a function has to accept that its own cleverness is out of scope. The decision to involve outside parties is legal, not procurement: an insurer, a competition authority, a fraud reporting route, a police referral. Each has its own timing test, and a buyer who has preserved the record has done the useful part. Then the two outcomes. Where nothing is substantiated, that must be said, to the person suspected and to whoever reported, and the process that produced the false signal should be reviewed for why it pointed there. Where something is substantiated, recovery is only the first and least interesting part. Termination of a supplier relationship, removal of access, restitution, referral, and the remediation of the route that allowed it are all separate decisions with different owners. The most common failure after a case is that the recovery is pursued and the route is not: a person is removed, the same permission overlap remains, and the next person inherits an open door. The honest measure of how a procurement function handles an event is the control change, not the amount recovered. The last part is the ethics, and it belongs in a curriculum rather than in a policy annex. An accusation has consequences that begin immediately and do not wait for the finding: colleagues who have decided, a supplier whose orders quieten, a person who reads the room. The proportionate discipline is that suspicion is written down and dated, never spoken to a third party; that the subject learns what is alleged when telling them stops damaging the process; and that a function is willing to state, publicly and internally, when a concern turns out to be nothing. The other honest limit is this product: the Academy teaches the patterns, the controls and the handling, and its examiners are calculators and quizzes rather than investigators. Nothing in this tool substitutes for legal advice, and the record it keeps is a local working file, not evidence with any status outside the browser it lives in.",
  why: [
    'The damage after a suspicion is usually caused by handling, not by the fraud: warned subjects, destroyed records and harmed innocents.',
    'Ownership matters more than seniority: a concern about a route cannot be assessed by the person who owns the route.',
    'Investigation needs the opposite habit to buying: separating known, inferred and unknown rather than deciding fast on partial data.',
    'Recovery without route remediation leaves the same door open for the next person.',
    'A function that never announces an unsubstantiated concern has no basis for being believed when it announces a substantiated one.'
  ],
  when: [
    'In the first hour after a credible concern reaches anyone in procurement.',
    'Before any contact with the supplier or employee named.',
    'At the point where the decision to involve legal, insurance or an external route must be made.',
    'At closure, whether or not anything was substantiated, including what the person suspected is told.',
    'Afterwards, when the control set is re-tested and the process that produced the signal is reviewed.'
  ],

  raci: [
    { role: 'Head of Procurement', resp: 'Owns preservation and containment in the first hour and names the escalation owner.' },
    { role: 'Legal', resp: 'Decides external reporting, privilege questions and the timing of notification to any subject.' },
    { role: 'Human Resources', resp: 'Owns employment process, protections against retaliation and the treatment of an unsubstantiated outcome.' },
    { role: 'Finance Controller', resp: 'Decides payment holds, recovery and the accounting treatment of a loss.' },
    { role: 'Internal Audit', resp: 'Re-tests the route after closure and reports whether the control changed.' }
  ],
  inputs: [
    'The concern as received, in its original wording, with date, channel and the person who received it.',
    'The transaction records, documents and system logs relevant to the pattern, preserved unaltered.',
    'The process map and permission set as they stood at the time, not as they are now.',
    'The delegation of authority and policy documents the case is measured against.'
  ],
  outputs: [
    'A dated preservation note listing what was secured, by whom, and where it now lives.',
    'An assessment file separating known, inferred and unknown, written so an outsider can follow it.',
    'A decision record on escalation, recovery and any external route, with the owner named.',
    'A remediation note showing the control change made, and a re-test date.',
    'A closure communication appropriate to the outcome, including to anyone wrongly suspected.'
  ],
  controls: [
    'No contact with a named subject or supplier before the owner of the case approves it in writing.',
    'Records are preserved in their original state; nothing is edited, re-filed or summarised into a new document.',
    'The circle of knowledge is listed and dated, and case material stays out of the ordinary reporting lines.',
    'Closure includes the control change and a re-test, and an unsubstantiated outcome is stated as such.'
  ],
  bestPractices: [
    'Practise the first hour before you need it: who to call, who freezes a payment, who holds the record.',
    'Write the concern down in the words used, because a summary in your own language becomes your interpretation.',
    'Let the finding be boring: a sequence of evidenced facts outperforms a compelling narrative every time it is tested.',
    'Report the aggregate outcome of concerns raised, which sustains the reporting route that found the case.'
  ],
  mistakes: [
    'Telephoning the supplier to check, which warns them and contaminates the record.',
    'Confusing a fast commercial judgement with a sound evidential one, and writing conclusions into the file.',
    'Removing the person and leaving the permission overlap exactly where it was.',
    'Silently closing an unsubstantiated concern, so the suspected person never learns and the reporter learns that nothing happens.'
  ],
  terms: [
    { term: 'Preservation', def: 'Securing records and stopping routine deletion before anything is analysed or discussed.' },
    { term: 'Chain of custody', def: 'The documented line from an artefact being found to it being held, which is what turns a finding into an assertion.' },
    { term: 'Substantiated', def: 'A concern supported by evidence to the standard the decision requires - and the alternative outcome is also a legitimate finding.' },
    { term: 'Route remediation', def: 'Closing the process gap that permitted the act, distinct from and more valuable than recovering the money.' }
  ],

  thinkingPoints: [
    {
      quote: 'The call that ended the case.',
      explanation: 'A finance analyst noticed a duplicate payment and, wanting to be helpful, rang the supplier to ask whether the second account was theirs. It was not, and the analyst had just told the person running the scheme that the account was under review. The remaining evidence was a mailbox and a story.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: well-intentioned verification outside the process is the most common way a live case is lost.',
      reflectionPrompt: 'Does everyone in your team know that a suspicion is never used as the subject of a routine call?',
    },
    {
      quote: 'We recovered the money and changed nothing.',
      explanation: 'A purchasing case was investigated, the loss was largely recovered through insurance, and the individual involved left. The permission overlap that made it possible had been identified in the investigation report and listed as a recommended action. Eighteen months later a second case in a different site used the identical route, and the recommendation from the first report was still open.',
      realWorldExample: 'Illustrative example: recovery is visible and remediation is administrative, so remediation is what gets deferred - and deferring it is the decision that guarantees repetition.',
      reflectionPrompt: 'Where do the control recommendations from your last two cases live now, and who owns the re-test date?',
    }
  ],

  sopSteps: [
    { title: 'Preserve before analysing', role: 'Head of Procurement',
      desc: 'Stop scheduled deletion, secure the documents and system records in their original state, and write a dated note of what was taken and by whom. Analysis can wait; a mailbox retention window cannot.',
      control: 'A preservation note exists with a date, an owner and a list of what is now held.',
      record: 'Preservation note and secured copy of the transaction record set.',
      pitfall: 'Copying items into a new summary file and deleting the originals as tidy-handed practice.'
    },
    { title: 'Name the owner who is not the route owner', role: 'Head of Procurement',
      desc: 'Assign the case to someone with no reporting interest in the process being questioned. In a small organisation this may mean a peer function or an external adviser, and it must not mean the manager whose approval the case went through.',
      control: 'The owner is recorded at the start, and independence from the route is stated in one line.',
      record: 'Assignment note naming the owner and the independence basis.',
      pitfall: 'Assigning to the most senior person available, who in a purchasing case is often the closest to the process.'
    },
    { title: 'Limit and list the circle of knowledge', role: 'Legal',
      desc: 'Decide who needs to know, write the list down, and instruct in plain terms that the matter is not discussed anywhere else. Confidentiality protects the subject, the reporter and the evidence.',
      control: 'The list is dated, and additions are recorded as they happen.',
      record: 'Circle-of-knowledge list with the date of each addition.',
      pitfall: 'A closed investigation discussed in an open office, which converts a personnel matter into a public rumour.'
    },
    { title: 'Separate known, inferred and unknown', role: 'Internal Audit',
      desc: 'Build the assessment file in three columns and refuse conclusions until the sequence is checkable by someone who was not there. This is the discipline that separates a case file from an argument.',
      control: 'Every statement in the file is traceable to a document, a log entry or a named interview.',
      record: 'Assessment file with sources attached and inferences marked as inferences.',
      pitfall: 'Writing the narrative first and fitting the evidence to it, which is how a fast commercial judgement fails in an evidential setting.'
    },
    { title: 'Decide the external question deliberately', role: 'Legal',
      desc: 'Insurance notification, competition reporting, law enforcement referral and regulator contact each have their own timing and their own test. Record the decision and the reasons, including where the decision is not to report.',
      control: 'The external decision is dated, reasoned and owned by legal rather than by default.',
      record: 'Decision note covering each possible route and its outcome.',
      pitfall: 'Letting the decision be made by delay, which is the most common way an insurance or leniency position is lost.'
    },
    { title: 'Handle the person, whichever way it goes', role: 'Human Resources',
      desc: 'Where a subject is implicated, follow the employment process and tell them what is alleged when doing so stops damaging the investigation. Where the concern is not substantiated, say so, to them and to the reporter, and record the outcome.',
      control: 'Notification timing is a documented decision, and an unsubstantiated outcome is closed in writing.',
      record: 'Closure note stating the finding and what each affected person was told.',
      pitfall: 'Leaving a suspected person in a room where everyone has decided and nobody has spoken.'
    },
    { title: 'Fix the route and prove it stayed fixed', role: 'Head of Procurement',
      desc: 'Close the permission overlap, change the verification step, adjust the threshold that was being avoided - then re-test on live settings at a stated date and report whether the change survived.',
      control: 'Every recommendation from the case has an owner, a date and a re-test result, and an open one is reported as open.',
      record: 'Remediation register with owners, dates and re-test evidence.',
      pitfall: 'Reporting recovery of the loss as the outcome, which flatters a response that left the door open.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A buyer mentions over lunch that a colleague may have been taking gifts from a supplier. Nothing else is known.',
      q: 'What is the correct first action by the manager who hears it?',
      options: [
        { text: 'Speak to the colleague to give them a chance to explain.', isCorrect: false, rationale: 'That warns the subject before anything is preserved or assessed, and it turns an unverified remark into a confrontation.' },
        { text: 'Write down what was said, by whom and when, and take it to the person who owns concerns about this route - not to the lunch table and not to the colleague.', isCorrect: true, rationale: 'Correct. Contemporaneous notes are the beginning of a case file, and ownership of the next step must sit with the function that can assess it independently.' },
        { text: 'Ignore it, since hearsay is not evidence.', isCorrect: false, rationale: 'It is not evidence, and it is a signal. Ignoring removes the only starting point and forfeits the reporter trust in the route.' },
        { text: 'Start a discreet review of the colleague purchasing, telling nobody.', isCorrect: false, rationale: 'Discreet does not mean proper. An undocumented private review by a line manager produces neither evidence nor fairness.' }
      ],
      principle: 'Record what was said and route it to an independent owner. The first move is documentation, not enquiry.',
    },
    {
      type: 'scenario',
      context: 'A payment diversion loss is confirmed. The vendor record, the emails and the payment run data are all in ordinary systems with normal retention.',
      q: 'What matters most in the first hour?',
      options: [
        { text: 'Contacting the bank and starting a recall, and preserving the system records before routine deletion or migration touches them.', isCorrect: true, rationale: 'Correct. Recall has a short clock and evidence has a retention clock, and both are lost by the same thing: delay while someone decides who should act.' },
        { text: 'Interviewing the accounts payable officer who processed the payment.', isCorrect: false, rationale: 'That may come later and it belongs to whoever owns the case. Early interviews by the line manager shape what everyone else will say.' },
        { text: 'Writing an internal report so leadership has the facts.', isCorrect: false, rationale: 'A report produced before the evidence is gathered becomes the version of the facts, and it is often wrong in ways that matter.' },
        { text: 'Terminating the vendor relationship immediately.', isCorrect: false, rationale: 'Possibly correct eventually, and it removes access to the counterparty and any cooperation while the money is still traceable.' }
      ],
      principle: 'In the first hour, act on the clocks: recall windows and retention windows close whether or not anyone has decided.',
    },
    {
      type: 'scenario',
      context: 'An investigation finds the concern was mistaken: the pattern had a documented and legitimate explanation. The suspected employee was never told anything.',
      q: 'What is the correct closure?',
      options: [
        { text: 'Close quietly. Saying anything creates awkwardness.', isCorrect: false, rationale: 'Quiet closure leaves the person in an environment where colleagues may know and nothing has been stated, and it teaches the reporter that reporting damages people without resolving anything.' },
        { text: 'State the finding in writing to the person concerned and to the reporter, keep the outcome on file, and review why the pattern appeared in the data at all.', isCorrect: true, rationale: 'Correct. An unsubstantiated outcome is a legitimate finding and it deserves a record. Sometimes the useful product of a false signal is a control improvement, sometimes a data-quality fix.' },
        { text: 'Ask the reporter to apologise to the colleague.', isCorrect: false, rationale: 'That punishes use of the reporting route and guarantees the next concern stays unreported.' },
        { text: 'Re-run the analysis with a second reviewer for confidence before closing.', isCorrect: false, rationale: 'Reasonable in a complex case, and not a substitute for telling the people involved what was concluded.' }
      ],
      principle: 'How a function closes a mistaken concern determines whether anyone brings the next one.',
    },
    {
      type: 'scenario',
      context: 'A case is substantiated. 180,000 is recovered through insurance, the individual leaves, and four control recommendations remain open in the report.',
      q: 'What does the function actually need to do now?',
      options: [
        { text: 'Nothing further: the loss is covered and the person has gone.', isCorrect: false, rationale: 'That is the position in which the second case happens. Recovery and removal close the event, not the exposure.' },
        { text: 'Assign an owner and a date to each recommendation, re-test the changed controls on live settings, and report any that remain open rather than archiving them.', isCorrect: true, rationale: 'Correct. The measure of a response is whether the route still permits the act. Open items reported as open are honest; open items unowned are how a repeat becomes inevitable.' },
        { text: 'Commission a new policy document describing the case.', isCorrect: false, rationale: 'Policies describe intent. The exposure here is a permission setting, and a document does not change one.' },
        { text: 'Increase the value of the insurance cover.', isCorrect: false, rationale: 'A legitimate finance decision and completely orthogonal to whether the route is still open.' }
      ],
      calcWork: 'The number worth reporting is not the recovery, it is the count of control recommendations closed versus open - and the re-test date on each closed one.',
      principle: 'Recovery closes the loss. Remediation and re-testing close the exposure, and only the second one prevents the repeat.',
    },
    {
      type: 'scenario',
      context: 'A procurement leader asks whether this tool, its workbench records and its local log are sufficient evidence for a case.',
      q: 'What is the honest answer?',
      options: [
        { text: 'Yes, the audit trail inside the app is a tamper-evident record.', isCorrect: false, rationale: 'It is not. The log is a local convenience record in a browser, and describing it as evidence would be exactly the kind of overstatement this curriculum warns about.' },
        { text: 'No: the tool teaches the patterns and supports the thinking, while evidence must come from the systems of record, preserved and secured in their original form.', isCorrect: true, rationale: 'Correct. The workpapers are preparation, the export is a working file, and preservation has to happen in the systems that actually hold the transaction.' },
        { text: 'Yes, provided the data is exported to a spreadsheet.', isCorrect: false, rationale: 'A spreadsheet copy has no custody story and often no source reference, which is the opposite of what an assessment file needs.' },
        { text: 'No, and the tool should therefore not be used to prepare a case at all.', isCorrect: false, rationale: 'Wrong conclusion from a correct premise. Preparation and analysis are precisely what the tool is for; it just cannot be the record.' }
      ],
      principle: 'Know the status of the artefact in your hand: a working file is not evidence, and calling it evidence is how a sound case becomes an unsound one.',
    }
  ],

  relSop: 'sop-procurement-audit',
  rel: {
    concepts: ['whistleblower-channel', 'audit-trail', 'segregation-of-duties', 'procurement-ethics', 'conflict-of-interest', 'red-flag-indicators'],
    sops: ['sop-procurement-audit', 'sop-vendor-master-integrity', 'sop-contract-review'],
    checklists: ['cl-procurement-audit', 'cl-procurement-file-completeness', 'cl-exception-approval'],
    templates: ['tpl-exception-request', 'tpl-supplier-due-diligence', 'tpl-contract-performance-review'],
    calcs: ['calc-po-value-check', 'calc-kpi-calculator'],
    decisions: ['approve-exception', 'renew-vs-resource'],
    kpis: ['kpi-contract-compliance', 'kpi-savings-realization'],
    glossary: ['gloss-segregation-of-duties', 'gloss-delegation-of-authority', 'gloss-doa', 'gloss-gpo']
  },
  labMission: {
    title: 'Mission 20.3: Write the First-Hour Card',
    desc: 'Produce the one-page instruction your team would actually follow, and test it against a named scenario.',
    tasks: [
      'Write the first-hour card: who to call, who freezes a payment, who preserves the record, who must not be told yet.',
      'Run one of your own patterns through the three-column habit - known, inferred, unknown - and see how much of the file survives the split.',
      'Find two open control recommendations from previous reviews in your organisation and name the owner and re-test date for each.'
    ],
    ctaLabel: 'Open the Procurement Audit Checklist',
    ctaHref: '#/checklist/cl-procurement-audit',
    secondaryLabel: 'Open the KPI Calculator',
    secondaryHref: '#/calc/calc-kpi-calculator'
  }
});
