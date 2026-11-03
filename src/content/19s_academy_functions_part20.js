/* ==========================================================
   Procure Sherpa v3.0 - Academy Module 24: Supplier Financial
   Distress, Turnaround and Exit. Module 4 evaluates a supplier
   before the award, Module 18 covers a disrupted supply line and
   Module 19 the finance of procurement; none of them covers the
   supplier that is running out of money while the contract is
   live. Three lessons and five concepts, written deliberately
   tighter than Module 23 because the compressed bundle is
   approaching its planning warning - see the ledger addendum.
   Written with no apostrophes, since these strings are single
   quoted and the build reads them literally.
   ========================================================== */

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-supplier-financial-health',
  title: 'Reading Supplier Financial Health as a Buyer, Not an Analyst',
  module: 'Module 24: Supplier Financial Distress, Turnaround and Exit',
  kicker: 'Function 24.1',
  tier: 'practitioner',
  tagline: 'A supplier can be profitable and still fail. What kills a business is running out of cash while obligations fall due, and that is a timing problem a ratio table hides.',
  desc: "This function covers what a buyer can realistically obtain and understand about a supplier financial position: the difference between profit, cash and liquidity, which ratios actually predict distress and which are decoration, what the Altman Z-Score does and does not tell you, how to read a credit agency grade alongside a bank reference and a filed account, and what to ask for in a contract so the information keeps arriving instead of being begged for during a crisis.",
  duration: '22 mins',
  lifecycleStage: 'Stage 12: Supplier Risk & Due Diligence',
  lifecycleDesc: 'Set at qualification for new supply and repeated on a schedule for concentrated or single-source categories.',

  what: "Buyers inherit a piece of analysis they were never trained to read. A supplier files accounts, a credit agency gives a grade, a bank issues a reference, and the procurement function records that financial standing was checked. Then the supplier fails anyway, because the checks measured something other than the thing that kills a business. Start with the distinction that makes the rest legible. Profit is an accounting result over a period; cash is the balance in the bank on a day; liquidity is whether money arrives before obligations fall due. A growing, profitable firm that pays suppliers and staff monthly while collecting from customers in ninety days can fail purely because of that gap, and it will fail at the moment a customer delays a large payment - which is the single most common story behind the collapse of a healthy-looking supplier. So read timing before read profitability. The practical toolkit is short and the rest is decoration. Days sales outstanding, days of payable outstanding and inventory days give you the operating cycle: how long cash is trapped before it comes back. Working capital as a share of turnover tells you whether the cycle is funded. Interest cover - operating profit divided by interest - is a rough gauge of whether the business can carry its debt when trading softens. Current ratio is a weak signal on its own because a supplier can hold slow-moving stock and overdue receivables and still look liquid. The Altman Z-Score combines five ratios into one number with published thresholds, and the honest guidance is this: it is a useful ranking device across a supply base, and a poor predictor for one supplier in one year, because it was calibrated on large manufacturing filings and reacts to balance-sheet structure more than to trade. Treat a low score as a reason to ask questions rather than a verdict, and never treat a comfortable score as an absence of risk if the supplier is leveraged, concentrated on one customer, or holding long-dated uncontracted commitments. Next, what the other artefacts actually mean. A credit agency grade is a probability of default within a defined horizon derived from filed accounts, payment experience data and modelled sector factors - it is not a view on whether this supplier can serve your contract, and it often lags deterioration by months. A bank reference is usually a form of words about an account relationship and may deliberately disclaim reliance. Filed accounts tell you about a period that ended up to a year ago, and in many jurisdictions small entities file reduced information or late. Read each artefact for what it measures and what it is dated for, which is a more useful discipline than trusting whichever number is most confident. Then, the signals a buyer can see that no financial statement contains: delivery reliability sliding without a commercial reason, quality escapes rising, quotations going stale and lead times stretching, subcontractors complaining of late payment, staff turnover in the account team, requests to change payment terms toward the buyer paying earlier, or a supplier suddenly wanting a longer contract with a price rise. Those are operational observations of a cash problem, and they arrive months before the accounts do. The last part is contractual and the cheapest thing in this lesson. Ask for the data on a schedule rather than during the incident: filed accounts or a management summary at a defined frequency, a covenant to notify material adverse change or a breach of its own finance terms, a right to request evidence of insurance and of bond or guarantee validity, and an agreed consequence - a review, a source-switch option, security, or a shortened term - so that deterioration changes the relationship in a defined way instead of becoming an argument.",
  why: [
    'Cash and liquidity, not profit, decide whether a supplier can keep supplying, and the gap between the two is a timing problem ratio tables hide.',
    'A credit grade, a bank reference and filed accounts each measure something different, and none of them is a view on your contract.',
    'Operational drift - late deliveries, stale quotes, stretched lead times, unpaid subcontractors - is the earliest financial signal a buyer is positioned to see.',
    'Information requested during a crisis arrives late and incomplete; the same data scheduled in advance is a contract term rather than a favour.',
    'A scoring model is a ranking device across a supply base and a weak oracle for one supplier in one year.'
  ],
  when: [
    'Qualifying a supplier for a single-source or concentrated category.',
    'On the scheduled review of any supply line where substitution would take longer than the notice period.',
    'When operational signals appear together and no commercial cause is offered.',
    'Before agreeing a longer term, a price rise, or an advance payment to a supplier you have not recently assessed.',
    'When a supplier asks to change payment terms in its favour.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Owns the financial view of the supply line, the scheduled evidence request and the escalation when signals cluster.' },
    { role: 'Finance or Credit Control', resp: 'Reads the accounts, tests interest cover and the operating cycle, and interprets the agency grade against the filing date.' },
    { role: 'Supplier Performance Lead', resp: 'Holds the OTIF, quality and lead-time drift that forms the early signal set.' },
    { role: 'Legal', resp: 'Sets the notification covenant, security options and the consequence that attaches to deterioration.' },
    { role: 'Supplier', resp: 'Provides the agreed evidence on schedule and discloses material change without being chased.' }
  ],
  inputs: [
    'Filed accounts or management summary, dated, with the balance sheet and cash note where available.',
    'Credit grade with its assessment date, bank reference wording, and any insurance or bond evidence.',
    'Operational series: OTIF, quality escapes, quoted lead times, responsiveness on renewals.',
    'The supply line exposure: annual spend, substitution time, tooling or stock held at the supplier.'
  ],
  outputs: [
    'A financial health read for each material supplier with the timing metrics named, not only a pass or fail grade.',
    'A signal list where operational drift is recorded as a risk item rather than a service complaint.',
    'A schedule in the contract: what evidence arrives, how often, and what changes when it says something worrying.',
    'A short note on what is not known, including the filing lag and the limits of any score used.'
  ],
  controls: [
    'Evidence arrives on a stated schedule for material supply lines, and a missed return is treated as a risk event.',
    'A score or grade is recorded with its date and its measure, never as a substitute for the timing metrics.',
    'Clusters of operational signals trigger a defined review rather than an informal enquiry.',
    'Any advance payment, longer term or increased exposure requires a current financial read with a named approver.'
  ],
  bestPractices: [
    'Read the operating cycle first: a supplier that funds its customers is carrying risk your accounts payable does not see.',
    'Compare the supplier to its sector and to its own history, since a single ratio in isolation means little.',
    'Ask for a covenant to notify material adverse change, because self-declaration is the only signal that arrives early.',
    'Write down what the accounts cannot show you, so the next reviewer inherits the limits as well as the figures.'
  ],
  mistakes: [
    'Recording a credit grade as the whole of financial due diligence and never revisiting it.',
    'Reading a comfortable current ratio as safety while the receivables age and the stock is unsellable.',
    'Treating a supplier request for better payment terms as a commercial preference rather than as a cash signal.',
    'Assuming a profitable supplier is a viable supplier.'
  ],
  terms: [
    { term: 'Operating cycle', def: 'The days cash is trapped between paying inputs and collecting from customers, which is where a profitable failure begins.' },
    { term: 'Interest cover', def: 'Operating profit divided by interest cost, a rough measure of whether trading can soften without the debt becoming unpayable.' },
    { term: 'Material adverse change', def: 'A contractual trigger requiring a supplier to disclose a development that materially worsens its position.' },
    { term: 'Altman Z-Score', def: 'A five-ratio composite with published thresholds, best used to rank a supply base rather than to judge one supplier.' }
  ],

  thinkingPoints: [
    {
      quote: 'The profitable supplier that could not pay its own subcontractor.',
      explanation: 'A fabrication supplier posted growth and margin for three years. It funded that growth by paying its own trade creditors at sixty days while collecting from a large customer at ninety, and the gap was covered by a short-dated facility that the bank reduced without warning. The buyer learned of it when a second-tier workshop stopped work, not from any financial statement, because the accounts filed were still good.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: profitability, growth and a sound ratio table can all be true while liquidity fails, and the failure shows first in the sub-tier.',
      reflectionPrompt: 'For your most concentrated supply line, do you know the days it takes the supplier to collect, or only that its accounts looked sound when they were filed?',
    },
    {
      quote: 'The grade that arrived after the event.',
      explanation: 'A supply base review relied on agency grades and found no elevated risk. Six weeks later one supplier ceased trading. The grade had been updated on filed accounts that were ten months old, and the deterioration had been visible in the meantime as stretched lead times, unanswered quotations and a request to move to payment on delivery.',
      realWorldExample: 'Illustrative example: graded data is dated data, and the freshest signal in a supply relationship is usually operational rather than financial.',
      reflectionPrompt: 'If a supplier of yours failed next month, which operational change would most likely have predicted it, and who is watching for that change today?',
    }
  ],

  sopSteps: [
    { title: 'Classify the line by exposure, not by spend alone', role: 'Category Manager',
      desc: 'Combine annual spend with substitution time, tooling or stock held at the supplier, and whether the line is single-source. A modest spend on a line that takes a year to replace deserves more attention than a large spend that can be re-sourced in a month.',
      control: 'Each material line carries an exposure class driven by substitution time as well as spend, reviewed annually.',
      record: 'Exposure register with spend, substitution lead time, single-source flag and class.',
      pitfall: 'Screening suppliers on turnover alone and discovering that the small, critical one was never assessed.'
    },
    { title: 'Request the timing metrics, not only the ratios', role: 'Finance or Credit Control',
      desc: 'Ask for, or derive from filed accounts, the days to collect, days to pay, inventory days and interest cover, each with the period it describes. A current ratio without the operating cycle is a photograph of a moment.',
      control: 'A financial read is recorded only if it names its period and includes at least two timing metrics.',
      record: 'Financial note per supplier with period, timing metrics, interest cover and the source documents.',
      pitfall: 'Accepting a single grade or score as the assessment, because it is the only figure that arrived without a request.'
    },
    { title: 'Read every artefact for its date and its measure', role: 'Finance or Credit Control',
      desc: 'State plainly what each source measures and how old it is: the filing period of the accounts, the assessment date of the grade, the reliance wording of the bank reference. Where the sources disagree, record the disagreement rather than averaging it away.',
      control: 'Each external source is recorded with its date and what it measures; contradictory sources are escalated, not reconciled silently.',
      record: 'Evidence table with source, date, measure and the note of any conflict.',
      pitfall: 'Believing the most reassuring source because it is the most recent-looking.'
    },
    { title: 'Treat operational drift as financial intelligence', role: 'Supplier Performance Lead',
      desc: 'Track OTIF, quality escapes, quoted lead times and responsiveness to quotation requests as a series. When two or more deteriorate together without a commercial cause, raise a risk item rather than a service complaint.',
      control: 'A defined cluster of operational signals automatically creates a risk item with an owner and a review date.',
      record: 'Signal log with the series, the cluster date, the risk item raised and the explanation given.',
      pitfall: 'Handling each symptom separately with the account team, so the pattern never assembles itself into a finding.'
    },
    { title: 'Put the evidence and the consequence in the contract', role: 'Legal',
      desc: 'Set the schedule for accounts or a management summary, a covenant to notify material adverse change and any breach of its own finance terms, and name what changes when the picture worsens: a review, security, a shorter term or a source-switch option.',
      control: 'Material supply lines carry a reporting covenant, a notification trigger and a defined consequence, tested at least once during the term.',
      record: 'Clause set with the reporting schedule, notification trigger and the consequence agreed.',
      pitfall: 'Drafting a reporting duty with no consequence attached, which becomes an unanswered email in the first crisis.'
    },
    { title: 'Gate any increase in exposure', role: 'Finance or Credit Control',
      desc: 'Require a current financial read with a named approver before advance payments, longer terms, tooling investment held at the supplier, or stock building on its behalf. Exposure increases are where a good relationship quietly becomes a large loss.',
      control: 'No advance payment, asset placement or extended term above a stated threshold proceeds without a financial read taken within the defined window.',
      record: 'Exposure decision with the read date, the approver and the mitigations agreed.',
      pitfall: 'Approving an advance to a well-liked supplier because the request felt urgent rather than material.'
    },
    { title: 'Record what the data cannot show', role: 'Category Manager',
      desc: 'Note the filing lag, the absence of management accounts, reduced disclosure by small entities, and the limits of any model used. The next reviewer inherits both the figures and their boundaries, which is what makes a clean bill of health honest.',
      control: 'Each financial read includes an explicit unknowns line, and the review of a material line is scheduled rather than triggered by suspicion.',
      record: 'Assessment file with figures, sources, dates and a stated unknowns section.',
      pitfall: 'Presenting an absence of bad news as evidence of health, which is how a stale clean report survives three renewals.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A single-source supplier of machined parts reports growth in revenue and net profit for three years. Filed accounts show current assets comfortably covering current liabilities. It collects from customers in 95 days and pays trade creditors in 40.',
      q: 'What does the picture most strongly suggest?',
      options: [
        { text: 'A healthy supplier; the current ratio and profit trend both confirm it.', isCorrect: false, rationale: 'Both facts are true and neither addresses the gap: the supplier is funding a 95-day receivable while paying out at 40 days, which is financed rather than earned.' },
        { text: 'A liquidity-timeing exposure: growth is consuming cash, and the position depends on short-dated funding that can be withdrawn, so ask about the operating cycle, the facility and its terms.', isCorrect: true, rationale: 'Correct. Profitable failures usually look like this. The right response is a targeted question about how the gap is funded and for how long it is committed, not a verdict from the ratio table.' },
        { text: 'The supplier is misreporting, since growth and cash pressure rarely coexist.', isCorrect: false, rationale: 'They coexist constantly; assuming bad faith instead of a funding structure is how a buyer stops asking useful questions.' },
        { text: 'Reduce the order book immediately to remove the exposure.', isCorrect: false, rationale: 'On a single-source line that is a supply decision, not a financial one, and the evidence does not yet say distress.' }
      ],
      calcWork: 'The gap of 55 days multiplied by daily throughput is the cash the supplier must fund permanently; ask what facility covers it and whether that facility is committed or cancellable.',
      principle: 'Read the timing of cash before the level of profit, and treat growth as a demand for funding rather than as evidence of health.',
    },
    {
      type: 'scenario',
      context: 'A credit agency grade is investment-grade and dated eight months ago. Over the last quarter the supplier OTIF fell from 97 to 88 percent, two quotations went unanswered, and it asked to move from 60-day terms to payment on delivery.',
      q: 'What is the correct reading?',
      options: [
        { text: 'The grade governs; the operational issues are service matters for the account team.', isCorrect: false, rationale: 'The grade is eight months old and measures probability of default from filed data; the three operational changes are more recent information about the same question.' },
        { text: 'Payment on delivery from a supplier that was content with sixty days is a cash-flow signal, and combined with the service drift it warrants a financial review and a check on the sub-tier before any commercial concession.', isCorrect: true, rationale: 'Correct. Terms requests moving in the supplier favour are among the earliest distress markers a buyer sees, and a cluster of three independent signals is a reason to look at current data rather than a dated grade.' },
        { text: 'Grant the terms change to preserve the relationship and monitor.', isCorrect: false, rationale: 'That concedes the exposure while the signal is untested, and advances your money into a possible failure.' },
        { text: 'Start a formal supplier exit process.', isCorrect: false, rationale: 'That skips the diagnosis; distress and disruption have different remedies, and exit on a concentrated line has its own risk.' }
      ],
      principle: 'Recent operational evidence outweighs an old financial label, and a request to change payment terms toward the supplier favour is a signal, not a preference.',
    },
    {
      type: 'scenario',
      context: 'An Altman Z-Score computed from a small specialist supplier filed accounts sits in the caution band. The supplier is the only qualified source for a safety-relevant component.',
      q: 'How should the score be used?',
      options: [
        { text: 'As a decision: switch away, since the score indicates distress.', isCorrect: false, rationale: 'The score is a ranking device calibrated on large manufacturers and reacts to balance-sheet structure; on a sole qualified source it is not a decision-maker.' },
        { text: 'As a prompt to obtain current evidence and to build the contingency you could not execute quickly: dual-qualification, buffer stock, tooling rights, a step-in route, and an agreed consequence if the next reading worsens.', isCorrect: true, rationale: 'Correct. A model output should change what you ask for and how fast you build optionality, not directly change the supply decision on a line where substitution is slow and costly.' },
        { text: 'Ignore it, since the model does not apply to small suppliers.', isCorrect: false, rationale: 'The limitations argument cuts both ways; it removes the authority of a bad score and of a good one.' },
        { text: 'Re-run the score each month and treat the trend as the answer.', isCorrect: false, rationale: 'A trend of a weak instrument is still weak, and monthly accounts are rarely filed.' }
      ],
      principle: 'Use a scoring model to decide what to ask and what to prepare, never to decide a sourcing action it was not built to inform.',
    },
    {
      type: 'scenario',
      context: 'A contract renewal offers a two-year term with a price reduction. The supplier asks for a 30 percent advance payment to fund raw material for the term.',
      q: 'What is the correct handling?',
      options: [
        { text: 'Accept, since the advance is what makes the discount possible.', isCorrect: false, rationale: 'The discount is real and so is the exposure: an advance is an unsecured loan to the party whose health you are being asked to trust.' },
        { text: 'Price the advance as exposure: request a current financial read, secure it with a bond or stage it against evidence of material purchase, cap it, and compare the discount against the loss in a failure.', isCorrect: true, rationale: 'Correct. Advances can be rational; the test is whether the buyer is compensated for the risk in cash terms and whether that risk is secured, staged and capped rather than assumed.' },
        { text: 'Refuse all advances as policy.', isCorrect: false, rationale: 'A blanket rule loses good deals and hides the actual judgement, which is about size, security and evidence.' },
        { text: 'Accept and take out credit insurance on the supplier.', isCorrect: false, rationale: 'Insurance may exclude or price distress situations and does not replace the security and staging conversation.' }
      ],
      calcWork: 'Compare the discount value over the term against 30 percent of contract value at risk uninsured; if the second number exceeds the first, the deal requires security, staging or a cap to make sense.',
      principle: 'An advance payment is unsecured lending to your supplier, and it should be sized, secured and evidenced like any other exposure.',
    },
    {
      type: 'scenario',
      context: 'A category review finds nine material suppliers. Four have never had a financial check, two were assessed once at onboarding five years ago, and the reporting schedule in the contracts asks for nothing.',
      q: 'What is the highest-value first action?',
      options: [
        { text: 'Commission a full financial assessment of all nine suppliers at once.', isCorrect: false, rationale: 'Expensive, slow and undifferentiated; exposure ranking exists precisely so effort lands where substitution is hardest.' },
        { text: 'Rank the lines by exposure and substitution time, obtain current evidence for the top of that list, and insert a reporting and notification covenant at the next contract event for each.', isCorrect: true, rationale: 'Correct. The structural gap is the absence of scheduled evidence; fixing it for the highest-exposure lines first converts a five-year-old snapshot into a monitoring capability.' },
        { text: 'Require all suppliers to provide a bank reference annually.', isCorrect: false, rationale: 'A bank reference is the weakest of the available artefacts, and a blanket request gets a blanket answer.' },
        { text: 'Accept the position, since a supplier failure is ultimately the supplier problem.', isCorrect: false, rationale: 'The supply interruption, requalification cost and customer exposure land on the buyer, not the supplier.' }
      ],
      principle: 'Fix the information schedule for the lines you cannot replace quickly before buying any individual assessment.',
    }
  ],

  relSop: 'sop-supplier-performance-management',
  rel: {
    concepts: ['supplier-distress-signals', 'early-warning-ladder', 'supplier-financial-risk', 'working-capital', 'concentration-risk', 'supply-chain-risk'],
    sops: ['sop-supplier-onboarding', 'sop-supplier-performance-management', 'sop-supplier-exit'],
    checklists: ['cl-supplier-risk-review', 'cl-supplier-due-diligence', 'cl-supplier-performance-review'],
    templates: ['tpl-supplier-risk-assessment', 'tpl-supplier-due-diligence'],
    calcs: ['calc-supplier-concentration', 'calc-payment-terms'],
    decisions: ['dec-supplier-financial-risk', 'dec-dual-source'],
    kpis: ['kpi-supplier-concentration', 'kpi-otif'],
    glossary: ['gloss-run-rate', 'gloss-ppv', 'gloss-hhi']
  },
  labMission: {
    title: 'Mission 24.1: Look at the Timing, Not the Grade',
    desc: 'Pick your hardest-to-replace supplier and find out what you actually know about its cash position.',
    tasks: [
      'Name the three supply lines where substitution would take longest, and record substitution time alongside annual spend for each.',
      'For the top one, find the days to collect, days to pay and interest cover from documents you already hold. Write down which figures you could not obtain and from whom you would ask.',
      'Check what your current contract obliges that supplier to tell you, and what happens if the answer is worrying. If the clause does not exist, draft the ask for the next contract event.'
    ],
    ctaLabel: 'Open Supplier Concentration',
    ctaHref: '#/calc/calc-supplier-concentration',
    secondaryLabel: 'Open the Supplier Risk Review Checklist',
    secondaryHref: '#/cl/cl-supplier-risk-review'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-supplier-early-warning-response',
  title: 'Early Warning and the Ladder of Contingency Action',
  module: 'Module 24: Supplier Financial Distress, Turnaround and Exit',
  kicker: 'Function 24.2',
  tier: 'practitioner',
  tagline: 'The gap between knowing and being ready is where a supplier failure becomes your customer incident. Close it before the news, not after.',
  desc: "This function covers what to do with a warning: the escalation ladder from enquiry to secured alternative source, what to ask a distressed supplier and in what order, how to protect the physical things - tooling, work in progress, materials, stock, design data - how long a dual-source or requalification path really takes, and how to hold a conversation with a supplier in trouble without destroying the relationship you still need for the next six months.",
  duration: '24 mins',
  lifecycleStage: 'Stage 19: Supplier Performance & SRM',
  lifecycleDesc: 'Owned in performance management, because the trigger is operational drift rather than a renewal date.',

  what: "Almost every organisation notices in time. Almost none is ready. That gap - between a signal and an option - is the whole subject of this lesson, and it is closed with preparation that looks like waste while nothing is wrong. Build the ladder before you need it. At the bottom sits a factual enquiry: the supplier explains the drift, and the explanation is tested against delivery data rather than accepted. Above that, a scheduled review with a financial and operational ask: current orders and backlog, order book cover for the next two quarters, position with its own trade creditors, any covenant or facility discussion, and the status of your material and tooling at its site. Above that, protection of the physical things, which is where buyers lose value they never knew they owned: tooling you paid for that sits in their factory with no ownership record, work in progress made from your materials, your stock held under consignment, your design files on their systems, your certification held in their name. Then commercial measures: shorten payment terms to reduce your unsecured exposure, or conversely refuse to accelerate, depending on which direction increases risk; stage orders to limit work in progress; require a bond or guarantee; place a buffer order while the supplier still has capacity and credit. Then activation of the alternative: a dual source already qualified and priced, a requalification started in anger, an inventory position bought forward, a specification relaxed to admit a substitute, or a customer communication prepared because the delay will be visible. At the top, exit - which is a decision with its own cost curve, and rarely the right one while a rescue keeps the line running. What to ask, and in what order, matters because a distressed supplier is managing two truths at once: it needs your orders, and it cannot tell you everything. Good questions are specific and verifiable. Not is everything fine, but: show the last twelve months of deliveries against plan; what is your committed bank facility and when does it expire; what are your terms with your own three largest suppliers; which orders are you currently declining; what is the status of our tooling and stock. Answers that arrive without documentation are warnings in themselves. The timing question most buyers get wrong is how long an alternative really takes. If requalification of a safety-relevant component is nine months, the last moment to start is nine months before you need it, which means the decision must be made on a signal rather than an event. That is why the ladder exists: to convert a soft signal into a dated action, so the option is ready before the failure. Record, for each material line, the actual cost and elapsed time of standing up an alternative - qualification testing, tooling, first-article approval, customer notification, and the price difference you would carry. Once written down, it stops being an excuse and becomes a budget line. Then the relationship, which is the part procurement guidance underweights. A supplier in trouble that is treated as a counterparty to be protected against will prioritise the customers that shout loudest, take your advance payments and hand over its remaining capacity to whoever secured it. A supplier given a defined, documented plan - evidence, protection, a realistic volume commitment, help with the customer communication, and a visible exit if it fails - tends to keep delivering, because it still has something to protect. Be honest about what you are doing: telling a supplier that you are qualifying a second source, in the context of a plan, is normally survivable; being discovered doing it secretly is not. Finally, the failure mode that produces the largest losses: the informal response. Two people notice, one mentions it in a meeting, nothing is minuted, no date is set, the alternative is not funded, and eleven weeks later the supplier stops. The control is unglamorous - a signal creates a numbered risk with an owner, a required action and a review date, and the review date has a consequence.",
  why: [
    'Notice is common and readiness is rare, because the preparation looks like waste while nothing is wrong.',
    'The physical assets - tooling, work in progress, consigned stock, design data, certification held in the supplier name - are usually unprotected until someone asks.',
    'The decision must be made on a signal rather than an event, because the requalification lead time is longer than the notice period you will be given.',
    'A distressed supplier treated only as a counterparty to hedge against reallocates its remaining capacity to whoever secures it first.',
    'Informal responses are what turn a warning into a loss: no number, no owner, no date, and therefore no action.'
  ],
  when: [
    'When two or more operational signals appear together on a material line.',
    'At the point a supplier asks for better terms, an advance, or a longer commitment.',
    'When a supplier discloses a financing problem in confidence, which is both a trust test and a trigger.',
    'During the annual review of any line whose substitution path is longer than one quarter.',
    'Before a peak season or a launch where the consequence of failure is customer-visible.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Owns the ladder, the dated actions and the recommendation to protect, dual-source or exit.' },
    { role: 'Operations or Planning', resp: 'Holds buffer stock policy, order staging and the schedule consequence of a supply break.' },
    { role: 'Quality or Engineering', resp: 'Confirms the real requalification path: testing, first article, and any customer notification required.' },
    { role: 'Finance', resp: 'Quantifies unsecured exposure, terms decisions and the cost of the alternative against the cost of failure.' },
    { role: 'Legal', resp: 'Secures ownership of tooling and work in progress, and runs the step-in and exit mechanics.' }
  ],
  inputs: [
    'The signal record with dates: delivery, quality, responsiveness, terms requests, sub-tier payment complaints.',
    'An asset register per line: tooling location and ownership record, consigned stock, work in progress, data and certifications.',
    'A measured substitution path: elapsed weeks, cost, qualification steps, price difference, and who signs it off.',
    'Current exposure figures: open orders, prepayments, credit balance, unbilled work in progress.'
  ],
  outputs: [
    'A numbered risk item with owner, actions, dates and the consequence of each missed date.',
    'A protection plan for physical and intellectual assets, evidenced rather than assumed.',
    'A funded and dated alternative-source path with a named approver for starting it.',
    'A supplier communication record stating what was shared, when, and what the supplier committed to.'
  ],
  controls: [
    'A defined signal cluster automatically opens a numbered risk with an owner and a review date; no informal pathway.',
    'Tooling, consigned stock and work in progress have an ownership and recovery position recorded before any distress appears.',
    'Any decision to defer the alternative-source work is recorded with a named approver and a re-review date.',
    'Supplier disclosure in confidence is logged, and the response plan is approved above the category level.'
  ],
  bestPractices: [
    'Measure the substitution path in weeks and money once, so the decision later is a comparison rather than a debate.',
    'Ask verifiable questions; a confident answer with no document is a signal in itself.',
    'Give the supplier a plan with something to protect, because capacity reallocates to the customer that offers certainty.',
    'Fund the readiness option as an operating cost, not as a project that must justify itself during a crisis.'
  ],
  mistakes: [
    'Tightening terms in a panic and removing the working capital the supplier needed to finish your orders.',
    'Discovering at exit that the tooling you paid for has no ownership record and sits in another party factory.',
    'Waiting for certainty before starting requalification, when the lead time is the whole problem.',
    'Managing the relationship informally to avoid alarming the supplier, and losing the audit trail as well as the time.'
  ],
  terms: [
    { term: 'Ladder of contingency', def: 'A pre-agreed sequence of responses from factual enquiry to exit, with actions and dates attached to each rung.' },
    { term: 'Substitution path', def: 'The measured elapsed time and cost to move a line to another supplier, including qualification and any notification.' },
    { term: 'Work in progress exposure', def: 'Your materials and partially built product on a supplier floor, whose ownership and recovery need to be evidenced.' },
    { term: 'Step-in right', def: 'A contractual ability to take over production or recover assets at a supplier site, which requires practical routes to be real.' }
  ],

  thinkingPoints: [
    {
      quote: 'The tightened terms that finished the supplier.',
      explanation: 'When a supplier disclosed a cash problem, the buyer reduced payment from sixty days to thirty on delivery and held back two open orders pending reassurance. The supplier used its remaining cash to serve customers that had kept paying it normally, missed a payroll week, and the buyer discovered that the two held orders were the only thing that had been keeping the line running.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: risk reduction taken unilaterally can remove the working capital a supplier needed to complete your own orders, converting a manageable problem into a failure.',
      reflectionPrompt: 'If your most exposed supplier told you today, would your first move reduce its cash or protect the delivery - and who decides which?',
    },
    {
      quote: 'Nobody could say whose tooling it was.',
      explanation: 'A supplier stopped trading and the buyer moved to recover tooling worth several months of investment. There was no ownership record, no marking, and the tooling had been maintained and improved at the supplier cost. The insolvency practitioner was not unreasonable to treat it as an asset of the estate, and recovery took a year and legal cost that exceeded part of the value.',
      realWorldExample: 'Illustrative example: the assets a buyer assumes are theirs are usually the ones nobody documented, and ownership is proved with paperwork made in calm conditions.',
      reflectionPrompt: 'Where does your tooling, your data and your consigned stock sit today, and what single document would establish ownership tomorrow?',
    }
  ],

  sopSteps: [
    { title: 'Convert a signal cluster into a numbered risk', role: 'Category Manager',
      desc: 'Define what a cluster is - two or more of delivery drift, quality escapes, unanswered quotations, terms requests, sub-tier complaints - and have it open a risk item with an owner, an action list and a review date automatically, rather than as a discussion.',
      control: 'A defined cluster creates a numbered risk with dates; an undated enquiry is not an acceptable response to a cluster.',
      record: 'Risk item with signals observed, owner, actions, review date and the escalation path.',
      pitfall: 'Managing each symptom with a different colleague, so nothing accumulates into a decision.'
    },
    { title: 'Ask verifiable questions in the right order', role: 'Category Manager',
      desc: 'Start with documents: deliveries against plan for twelve months, backlog and its cover, facility expiry, terms with its own largest creditors, the status of your assets on site. Save the direct question about survival for the second meeting, when the documents frame it.',
      control: 'Each question has a named evidence request, and an answer without evidence is recorded as a signal rather than reassurance.',
      record: 'Question log with requests, documents received and the gaps remaining.',
      pitfall: 'Accepting a verbal all-clear from a supplier that has every reason to prevent a switching decision.'
    },
    { title: 'Protect the physical and the intellectual', role: 'Legal',
      desc: 'Establish and document ownership of tooling, gauges and fixtures, consigned stock, work in progress made from your materials, design data and any certification held in the supplier name. Agree marking, access, insurance and a recovery route, and test one of them.',
      control: 'Every line with buyer-funded assets has a current ownership record, an agreed recovery route and a test date within the term.',
      record: 'Asset register with location, ownership evidence, insurance, access route and last test.',
      pitfall: 'Discovering at exit that paid-for tooling was never marked, listed or documented as yours.'
    },
    { title: 'Measure the substitution path before it is needed', role: 'Quality or Engineering',
      desc: 'Time and cost the real path for each material line: qualification testing, first-article approval, tooling at a second supplier, customer or regulator notification, and the price difference for the transition period. Keep it current, since process changes make the number stale.',
      control: 'Each material line carries a dated substitution estimate with elapsed weeks and cost, refreshed at least annually.',
      record: 'Substitution sheet per line with weeks, cost, dependencies and the approval needed to start.',
      pitfall: 'Quoting a best-case requalification timeline that omits customer notification and the queue for test capacity.'
    },
    { title: 'Choose the commercial protection deliberately', role: 'Finance',
      desc: 'Decide explicitly whether to reduce exposure through terms, staging or order capping, or to increase support so the line keeps running, and record the reasoning. Both moves can be correct; drifting between them without a decision is not.',
      control: 'Any change to terms, advances or order staging on a distressed line is approved with the reasoning recorded and a re-review date.',
      record: 'Exposure decision with the position taken, the rationale, the approver and the review date.',
      pitfall: 'Tightening terms reflexively and removing the cash that was finishing your own orders.'
    },
    { title: 'Start the alternative on the signal, not the event', role: 'Operations or Planning',
      desc: 'Where the substitution path exceeds the notice you are likely to get, authorise the first funded step at the signal stage: a qualification build, a trial order, buffer stock, or a deposit with a second source. The cost of the option is the price of having a choice later.',
      control: 'For lines whose substitution time exceeds the notice period, the first step of the alternative is authorised at signal stage with a named approver.',
      record: 'Readiness action with its authorisation, cost, date and the position it buys.',
      pitfall: 'Waiting for certainty, then discovering the qualified alternative takes three quarters.'
    },
    { title: 'Give the supplier a plan with something in it', role: 'Category Manager',
      desc: 'Share the plan honestly: the evidence you need, the protections you are putting in place, the volume commitment you can make, the customer communication you will handle jointly, and what happens if the milestones are missed. Capacity goes to the customer that offers certainty.',
      control: 'A distressed supplier on a material line receives a written plan with milestones and a joint review, not silence or an ultimatum alone.',
      record: 'Supplier plan with milestones, the commitments both sides made and the review cadence.',
      pitfall: 'Quiet dual-sourcing while the supplier keeps delivering, which is discovered at exactly the moment you need its cooperation.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'On a single-source line with a nine-month requalification path, the supplier OTIF slips, lead times quoted to customers double, and the supplier requests payment on delivery. The category manager proposes to wait for the next quarterly review to raise it.',
      q: 'What makes waiting the wrong choice?',
      options: [
        { text: 'Waiting is wrong because the line cannot be replaced faster than the warning is running out: nine months of path against three simultaneous signals means the decision must be made on the signal.', isCorrect: true, rationale: 'Correct. The arithmetic of lead time versus notice is the entire reason a ladder exists; deferring to a calendar review converts an option into an emergency.' },
        { text: 'Waiting is acceptable because none of the three signals is proof of distress.', isCorrect: false, rationale: 'True that none is proof, and irrelevant: the action triggered by signals is enquiry and readiness, not termination.' },
        { text: 'Waiting is wrong mainly because the terms request will be refused anyway.', isCorrect: false, rationale: 'That misreads the terms request, which here is the most informative signal of the three.' },
        { text: 'Waiting is acceptable if the supplier grade is still sound.', isCorrect: false, rationale: 'A grade derived from old filed accounts cannot outrank live operational evidence.' }
      ],
      calcWork: 'Compare nine months of requalification against the notice the supplier would realistically give; where the first exceeds the second, the first funded step belongs at the signal stage.',
      principle: 'When the substitution path is longer than the notice you will get, a signal must trigger action rather than a further meeting.',
    },
    {
      type: 'scenario',
      context: 'A supplier admits a facility is being reduced and asks the buyer to keep paying at sixty days rather than thirty, to preserve cash. Your exposure is 400 units of open orders.',
      q: 'What is the proportionate response?',
      options: [
        { text: 'Move to thirty days immediately to halve the exposure.', isCorrect: false, rationale: 'That protects the balance sheet on paper and may remove the working capital funding the completion of those same orders.' },
        { text: 'Take the disclosure seriously, quantify both exposures - unpaid orders as well as the receivable - and negotiate a package: staged orders, security or a guarantee, evidence of the facility position, and a defined review, rather than a single terms change.', isCorrect: true, rationale: 'Correct. The exposure runs both ways: terms reduce one number and can raise the other. A package addresses the timing of cash, the completion of the orders and the information flow at once.' },
        { text: 'Keep sixty-day terms to support the supplier and say nothing internally.', isCorrect: false, rationale: 'Support may be right; silence removes the approval trail and the readiness work that should start now.' },
        { text: 'Cancel the open orders to stop the exposure growing.', isCorrect: false, rationale: 'That converts a liquidity problem into a demand shock and forfeits the line you still need.' }
      ],
      principle: 'Distress changes both your exposure and your supply; a one-variable response to a two-variable problem fails on one of them.',
    },
    {
      type: 'scenario',
      context: 'A buyer-funded tool set worth a year of investment sits at a distressed supplier. There is no ownership document, no marking, and the supplier has maintained it. Recovery is being planned for after the next payment run.',
      q: 'What should happen first?',
      options: [
        { text: 'Nothing until the relationship ends; raising it now would signal distrust.', isCorrect: false, rationale: 'The ownership position is proved by documents made in calm conditions; after an insolvency the burden and the cost both move against you.' },
        { text: 'Establish the ownership position now in writing, mark and inventory the assets, agree access and insurance, and tell the supplier - an honest request for documentation is survivable in a way a secret recovery plan is not.', isCorrect: true, rationale: 'Correct. Documentation, marking and access are ordinary contract hygiene, and doing them openly during a difficult period preserves both the asset and the relationship.' },
        { text: 'Send a third party to photograph the tooling for evidence.', isCorrect: false, rationale: 'Covert evidence-gathering destroys the trust you need for the next six months and does not create ownership.' },
        { text: 'Commission replacement tooling at a second source immediately.', isCorrect: false, rationale: 'Sometimes correct, but it is a funded decision with a cost, not a substitute for establishing what you already own.' }
      ],
      principle: 'Prove what you own while it is still cheap to prove, and do it in the open where the supplier can cooperate.',
    },
    {
      type: 'scenario',
      context: 'A risk review records that a second source could be qualified in twelve weeks. Engineering points out that the line needs a first-article inspection, the customer requires a notification period, and the test laboratory has a queue.',
      q: 'What is the correct handling of that number?',
      options: [
        { text: 'Twelve weeks stands, since it came from the sourcing team.', isCorrect: false, rationale: 'It measured the intention rather than the path; the dependencies named are exactly what consume the time.' },
        { text: 'Re-estimate the path end to end including qualification, first article, notification and laboratory queue, and record the revised figure with its dependencies and the cost to shorten it.', isCorrect: true, rationale: 'Correct. A substitution estimate that omits the gating activities is optimistic in the one direction that matters, and the readiness decision is made on that number.' },
        { text: 'Treat the estimate as unknowable and plan for twelve months.', isCorrect: false, rationale: 'Overcorrection in the other direction; measured pessimism is useful, unmeasured pessimism is paralysis.' },
        { text: 'Ask the current supplier to help qualify the second source.', isCorrect: false, rationale: 'An interesting idea in other contexts, and a poor first move with a distressed incumbent that needs your volume.' }
      ],
      calcWork: 'Add the gating activities in series where they cannot overlap: laboratory queue plus first-article plus notification often doubles a headline estimate, and the doubled figure is the one the signal stage must be judged against.',
      principle: 'Measure the substitution path including its gates, because every readiness decision is made against that number.',
    },
    {
      type: 'scenario',
      context: 'Three suppliers in the same category show drift in the same quarter. The category has been consolidated to 86 percent coverage from two of them in the last two years.',
      q: 'What does the pattern indicate?',
      options: [
        { text: 'Coincidence, since each supplier has its own circumstances.', isCorrect: false, rationale: 'Individual causes may be true and the correlation still signals something common: sector stress, a raw material, or a customer of everyone.' },
        { text: 'A correlated exposure created by the consolidation itself: the fewer suppliers carry the category, the more likely their fortunes share a cause, and simultaneous drift is a category-level risk item rather than three supplier issues.', isCorrect: true, rationale: 'Correct. Consolidation buys price and focus and sells independence; correlated distress is the price, and it shows first as a cluster of small operational signals.' },
        { text: 'Evidence that the suppliers are colluding.', isCorrect: false, rationale: 'A serious claim needing a different analysis entirely; simultaneous drift is not evidence of agreement.' },
        { text: 'A reason to consolidate further onto the strongest.', isCorrect: false, rationale: 'That increases exactly the concentration that produced the pattern.' }
      ],
      principle: 'Concentration creates correlated distress; three small signals in one category is a portfolio risk, not three supplier problems.',
    }
  ],

  relSop: 'sop-supplier-corrective-action',
  rel: {
    concepts: ['early-warning-ladder', 'step-in-and-contingency', 'concentration-risk', 'business-continuity', 'supplier-performance', 'supply-chain-risk'],
    sops: ['sop-supplier-corrective-action', 'sop-supplier-performance-management', 'sop-supplier-exit'],
    checklists: ['cl-supplier-risk-review', 'cl-supplier-performance-review', 'cl-contract-review'],
    templates: ['tpl-supplier-risk-assessment', 'tpl-supplier-business-review', 'tpl-single-source'],
    calcs: ['calc-supplier-concentration', 'calc-multi-year-contract-cost'],
    decisions: ['dec-dual-source', 'dec-supplier-financial-risk'],
    kpis: ['kpi-otif', 'kpi-supplier-concentration'],
    glossary: ['gloss-hhi', 'gloss-sla', 'gloss-single-source']
  },
  labMission: {
    title: 'Mission 24.2: Price Your Option Before You Need It',
    desc: 'Take your hardest line and turn the vague sense that switching is hard into a dated, costed number.',
      tasks: [
      'Write the substitution path for one material line: qualification steps, weeks per step, dependencies that cannot overlap, cost, and the price difference during transition.',
      'List what you would have to recover from the supplier site, and name the one document that proves each item is yours. Note any item with no document.',
      'Define your signal cluster rule - which three operational changes, together, open a numbered risk - and who owns the first action.'
    ],
    ctaLabel: 'Open Supplier Concentration',
    ctaHref: '#/calc/calc-supplier-concentration',
    secondaryLabel: 'Open the Contract Review Checklist',
    secondaryHref: '#/cl/cl-contract-review'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-distress-exit-and-recovery',
  title: 'Distress, Insolvency and the Honest Exit Decision',
  module: 'Module 24: Supplier Financial Distress, Turnaround and Exit',
  kicker: 'Function 24.3',
  tier: 'executive',
  tagline: 'Rescue and replacement are both defensible. Deciding by default, because nobody owned the question, is the failure an executive is paid to prevent.',
  desc: "This function covers the executive decision rather than the mechanics: when to support a distressed supplier and when to move, what the insolvency process will and will not protect - the ranking of claims, deposits, retention of title, set-off - why a pre-packaged sale can happen without your knowledge, what the buyer's responsibilities are downstream to the sub-tier and to employees in the markets that expect them, and how to report a supply failure to a board in a way that supports a decision rather than a defence.",
  duration: '26 mins',
  lifecycleStage: 'Stage 15: Contract Formulation & Legal Review',
  lifecycleDesc: 'The obligations that decide the outcome are written at contract stage, and the decision itself is taken at executive level.',

  what: "Two facts organise everything in this area. The first is that insolvency law is not a procurement process, and a buyer who behaves as though it is loses twice: once on the money, then on the supply. The second is that the decision to rescue or replace is a judgement about how long the line matters, how much the relationship is worth, and how much risk the organisation can hold - which makes it an executive decision rather than a category one, and one that must be taken with dates rather than by default. Start with the ranking of claims, because it is where optimism goes to die. In most regimes the costs of the insolvency process itself come first, then certain employee claims, then any preferential or secured creditors of defined classes, then ordinary untrade creditors, then shareholders. An unpaid advance payment, a deposit, or a stock consigned without a documented title usually sits in the ordinary unsecured tier, which means the recovery is a dividend of some small percentage arriving after a long delay, if anything arrives at all. Retention of title clauses can protect goods supplied but unpaid for, and in some regimes can extend to proceeds where the goods have been on-sold, but they are only as good as the records that identify your goods, which is why the paperwork made years earlier decides a recovery in a year you have not met. Set-off can help where both parties owe each other money, and is limited by what has fallen due and by the process rules. A personal or parent guarantee, a bond, a letter of credit or a security interest registered at the time of the advance are the only reliable answers, and every one of them is cheaper to arrange before a problem exists. Then the mechanics that surprise buyers. A pre-packaged sale - a business or part of it sold to a new owner immediately on the appointment of an insolvency practitioner, frequently to the existing management - can leave a buyer dealing with a new counterparty that has never been qualified, holds none of the previous contractual obligations, and may or may not honour pricing. That is a governance event, and the answer is a fast, pre-authorised requalification path rather than a lawsuit. Directors and officers have their own incentives in distress, including duties that change character as insolvency approaches; a buyer whose supplier begins unusual requests in this period - accelerate payments now, buy our stock at a discount, sign a long exclusive - should treat the request as information about the situation rather than as a negotiation. Now the sub-tier, which is where an executive reputation is actually exposed. A large buyer that stops paying a distressed supplier is often the immediate cause of a smaller supplier failing behind it, and in some markets a body exists to adjudicate that, while in others it is simply what people will say about you. Late payment in distress is also frequently counterproductive: the cash was going to be needed to finish your orders. The defensible position is transparency about what you are doing and why, protection of your own assets, and a decision on the sub-tier taken consciously - including the option of paying forward to keep a line alive - rather than inherited from an accounts-payable run. And the decision itself. Supporting a supplier makes sense where the substitution path is long, the supplier has a viable core, the exposure is bounded and secured, and the plan is evidenced; replacing makes sense where the path is short, the recovery prospects are weak, the quality of work is already degrading, or supporting means escalating commitments into a sinking position. Both are legitimate. What the board should refuse to accept is the unowned drift in which nobody chose, the terms got tightened reflexively, the alternative was never funded, and the failure arrives eleven months after the first signal. Reporting it honestly is the last executive act, and the format matters: what the signals were and when they appeared, what was done about them and who decided, what the substitution path actually costs and takes now, the exposure written down and why, and - most importantly - what the same event would cost next time, on which line, with the same controls in place. That last line turns a post-mortem into a budget request, which is the only language that reliably changes preparedness.",
  why: [
    'Insolvency is a claims process, not a supply process, and an advance without security usually lands in the unsecured tier.',
    'Recovery is decided by paperwork made years earlier - ownership records, registration of security, marking of goods - not by arguments made afterwards.',
    'A pre-packaged sale can install an unqualified counterparty overnight, which is a governance failure unless the requalification path is pre-authorised.',
    'Withholding payment from a distressed supplier can cause the sub-tier failure behind it and remove the cash needed to finish your own orders.',
    'Rescue and replacement are both defensible decisions; an unowned drift between them is the only indefensible one.'
  ],
  when: [
    'When a supplier discloses insolvency proceedings, a facility withdrawal or a change of control in progress.',
    'When unusual commercial requests arrive from a supplier whose operational signals are already drifting.',
    'Before any advance, deposit, tooling placement or long exclusivity with a supplier of thin substance.',
    'When a sub-tier behind a distressed supplier raises non-payment with you directly.',
    'In board reporting of any material supply failure, and in the approval of the readiness budget that follows it.'
  ],

  raci: [
    { role: 'Executive Sponsor', resp: 'Owns the rescue or replace decision, the approved exposure, and the board narrative including what happens next time.' },
    { role: 'Legal and Insolvency Specialist', resp: 'Advises on claim ranking, retention of title, security registration, set-off and the practical recovery of identified goods.' },
    { role: 'Head of Procurement', resp: 'Runs the substitution or transition plan, the second-source qualification and the communication to the supplier.' },
    { role: 'Finance', resp: 'Quantifies the write-off, tests the recovery assumptions, and controls payment decisions to the sub-tier.' },
    { role: 'Company Secretary or Governance', resp: 'Ensures delegated authority was used correctly and that the decision and its basis are minuted.' }
  ],
  inputs: [
    'The formal notice: process type, jurisdiction, dates, the officeholder and the claims deadline.',
    'Your exposure file: advances, open orders, unbilled work in progress, consigned stock, tooling, guarantees or bonds held.',
    'Evidence of ownership and registration for anything you intend to recover.',
    'The current substitution position: qualified alternatives, transition time, price impact, customer notification duties.'
  ],
  outputs: [
    'A dated decision to support or transition, with the reasoning, the approver and the review point recorded.',
    'A claims and recovery position with realistic percentages, not best cases, and the security instruments identified.',
    'A sub-tier payment position taken consciously, with its rationale, since it is a reputation as well as a cash decision.',
    'A board report that includes the next-time exposure and the funded readiness actions that would change it.'
  ],
  controls: [
    'No advance, deposit or asset placement above a stated threshold without a named security instrument or an executive approval of the unsecured exposure.',
    'The rescue or replace decision is taken at a defined level with the reasoning minuted, and revisited on a stated date.',
    'Claims deadlines are diarised on the day notice arrives, because a missed proof of debt converts a recoverable loss into a written-off one.',
    'Second-source qualification on a material line has a pre-authorised fast path so a change of control does not wait on a normal onboarding queue.'
  ],
  bestPractices: [
    'Register and document security at the moment of the advance, which is when the counterparty will cooperate.',
    'Ask insolvency counsel early; the ranking question is settled cheaply at day three and expensively at week eight.',
    'Model recovery in percentages and dates, since a 4 percent dividend arriving in two years is not a recovery of 100 percent.',
    'Report the next-time exposure alongside the last loss, because preparedness is only ever funded as a risk reduction.'
  ],
  mistakes: [
    'Protesting that the grade was good, when the grade was derived from accounts eight months old.',
    'Assuming a retention of title clause protects goods that cannot be identified in a mixed warehouse.',
    'Stopping all payments to a distressed supplier while expecting it to finish the work that money was funding.',
    'Treating the change of control from a pre-pack as a supplier issue rather than an unqualified new counterparty entering your supply base.'
  ],
  terms: [
    { term: 'Ranking of claims', def: 'The statutory order in which creditors are paid from an estate, which places most buyer advances among the unsecured.' },
    { term: 'Pre-packaged sale', def: 'A sale of a business arranged before and completed on appointment of an insolvency practitioner, often to existing management.' },
    { term: 'Retention of title', def: 'A clause keeping title in unpaid goods until payment, effective only where the goods remain identifiable.' },
    { term: 'Set-off', def: 'The netting of mutual debts, limited by what has fallen due and by the rules of the process entered.' }
  ],

  thinkingPoints: [
    {
      quote: 'The dividend that arrived after the audit.',
      explanation: 'A buyer wrote off an advance as unrecoverable and closed the file. Twenty-one months later a distribution arrived at a few percent of the claim, and the organisation discovered it had not diarised the claims deadline, had no registered security, and had misfiled the goods identification records that would have supported a better ranking. The loss was not the failure; it was the absence of a file.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: recovery is a process with dates and documents, and the buyer position is decided by admin made in good times rather than by advocacy in bad ones.',
      reflectionPrompt: 'If a supplier failed tomorrow, who in your organisation would own the claims deadlines, and where are the documents that identify your goods?',
    },
    {
      quote: 'The new supplier nobody approved.',
      explanation: 'A long-standing supplier entered proceedings and its business transferred the following week to an entity formed by the same management team. Nothing in the buyer records had changed, so no requalification was triggered, yet every assumption behind the approval - capital, insurance, quality system, workforce experience, the parent guarantee - belonged to a party that no longer existed.',
      realWorldExample: 'Illustrative example: a change of control is a change of counterparty, and systems that identify suppliers by name and address will not notice it.',
      reflectionPrompt: 'Does your approval regime trigger on ownership and control events, or only on a supplier asking to change something?',
    }
  ],

  sopSteps: [
    { title: 'Diary the process dates on the day of notice', role: 'Legal and Insolvency Specialist',
      desc: 'On receiving formal notice, record the process type, jurisdiction, officeholder, the claims deadline and the meeting dates, and instruct counsel on ranking within the first week. A missed proof of debt is a self-inflicted write-off.',
      control: 'Claims deadlines are entered in a tracked calendar within one working day of notice, with a named owner and a reminder ahead of the cut-off.',
      record: 'Process note with dates, counsel advice on ranking, the claim filed and its acknowledgement.',
      pitfall: 'Reading the notice as a commercial letter rather than as a procedural document with deadlines attached.'
    },
    { title: 'Value the exposure at recovery rates, not face value', role: 'Finance',
      desc: 'List advances, open orders, work in progress, consigned stock and tooling, then apply realistic percentages and dates by claim class with the security instruments identified. Report both the accounting loss and the operational loss of supply.',
      control: 'The exposure position states recovery assumptions by class and is approved at the level that owns the write-off.',
      record: 'Exposure schedule with amounts, claim class, security held, recovery assumption and the approver.',
      pitfall: 'Netting a possible dividend against an advance and presenting the optimistic number to the board.'
    },
    { title: 'Make the rescue or replace decision explicitly', role: 'Executive Sponsor',
      desc: 'Weigh the substitution path and its cost against the supplier viability, the bounded and secured exposure, and the quality of current work. Minute the decision, the reasoning, the approver and the date on which it must be revisited.',
      control: 'Continued support requires a minuted decision naming the security, the bounded exposure and the review date; silence is not a decision.',
      record: 'Decision minute with the option chosen, the reasoning, the bounds set and the review date.',
      pitfall: 'Allowing the position to drift through a sequence of unowned operational choices that add up to a rescue nobody approved.'
    },
    { title: 'Re-qualify the transferee after a pre-pack', role: 'Head of Procurement',
      desc: 'Treat a transfer of business as a new counterparty: verify the entity, ownership, capital, insurance, quality approvals, workforce continuity and the survival of guarantees, using a pre-authorised fast path so the line does not stop while governance catches up.',
      control: 'A change of control triggers qualification of the new entity on a stated timeline, with interim supply authorised at a named level.',
      record: 'Transferee approval file with entity checks, gaps, interim authorisation and the decision date.',
      pitfall: 'Assuming continuity of the supply relationship because the people on the phone are the same.'
    },
    { title: 'Decide the sub-tier position consciously', role: 'Finance',
      desc: 'Where a distressed supplier owes smaller businesses behind it, decide deliberately whether to pay forward for continuity, to withhold pending an assignment mechanism, or to take the commercial position, and record the reasoning including the reputational and regulatory context of the market.',
      control: 'Any payment route that bypasses an insolvent intermediary, and any decision not to, is approved with the rationale recorded.',
      record: 'Sub-tier decision note with the parties, the route chosen, the rationale and the approver.',
      pitfall: 'Letting an accounts-payable run decide a question the board would otherwise call strategic.'
    },
    { title: 'Rebuild the evidence trail before it is tested', role: 'Legal and Insolvency Specialist',
      desc: 'Assemble the documents that establish what was yours: purchase orders, tooling invoices and markings, delivery and consignment records, retention of title wording, registration entries, insurance and any acknowledgement by the supplier. Identify what cannot be evidenced and say so.',
      control: 'The recovery file lists each asset with its supporting documents, and gaps are named rather than assumed recoverable.',
      record: 'Recovery evidence file with assets, documents, registration references and stated gaps.',
      pitfall: 'Discovering the goods are mixed, unmarked and inseparable at the moment the officeholder asks you to identify them.'
    },
    { title: 'Report the next exposure, not only the last loss', role: 'Executive Sponsor',
      desc: 'Present to the board the signals and dates, the actions taken and by whom, the actual cost and duration of substitution, the write-off with its reasons - and the list of other lines with the same profile, what readiness would cost and what it would save.',
      control: 'Post-event reporting includes a forward exposure statement with a costed readiness option, and the accepted position is recorded.',
      record: 'Board report with timeline, decisions, exposure, and the priced readiness proposal or the accepted risk.',
      pitfall: 'A post-mortem that assigns blame for a single failure and leaves every other line exactly as exposed as it was.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A supplier enters proceedings. The buyer holds a 30 percent advance, an unmarked tool set, unbilled work in progress from buyer materials, and an open contract with no security. It asks what will be recovered.',
      q: 'What is the honest answer?',
      options: [
        { text: 'The advance and the tooling are both recoverable since the buyer paid for them.', isCorrect: false, rationale: 'Payment is not ownership in a claims process; the advance is an unsecured debt and the tooling needs identifying evidence.' },
        { text: 'The advance ranks as an unsecured claim and will likely return a small percentage late; the tooling and work in progress may be recoverable only where title, marking and records identify them, and the process cost and employee claims come first.', isCorrect: true, rationale: 'Correct. Ranking and identification decide the outcome, and neither is improved by advocacy after appointment - which is why security and paperwork are decided in advance.' },
        { text: 'Termination of the contract cancels the exposure.', isCorrect: false, rationale: 'Termination stops future obligations and does not promote a claim in the estate.' },
        { text: 'Set-off will recover the advance against the final invoice.', isCorrect: false, rationale: 'Set-off is limited by what is due and by process rules, and there may be no invoice large enough to net.' }
      ],
      calcWork: 'Model it as percentages and dates by class rather than as a single number, since the difference between a full recovery and a dividend arriving in two years is a reporting difference that changes behaviour.',
      principle: 'In an insolvency, ranking and evidence decide recovery; commercial fairness is not a claim class.',
    },
    {
      type: 'scenario',
      context: 'A distressed supplier with a viable core offers the buyer exclusive supply at a 9 percent discount for three years, requiring an advance to fund capacity. Substitution time for the line is eleven months.',
      q: 'What is the correct executive treatment?',
      options: [
        { text: 'Accept; a 9 percent discount on an exclusive term is a strong commercial outcome.', isCorrect: false, rationale: 'It converts a supplier problem into buyer concentration plus unsecured credit exposure, priced at the discount and not at the risk.' },
        { text: 'Treat it as a distress signal requiring structure: bounded exposure, registered security or a bond, staged funding against evidence, retained qualification of a second source, and a named approver for the residual risk.', isCorrect: true, rationale: 'Correct. Supporting a viable supplier can be right, and the honest form is a bounded, secured, evidenced package with the substitution path maintained - not a discount bought with unsecured credit.' },
        { text: 'Decline and start an immediate exit from the supplier.', isCorrect: false, rationale: 'Exit on an eleven-month path is a supply decision taken for a financial reason, and there is no evidence yet that the core is unviable.' },
        { text: 'Accept, and reduce the second-source work since the term is now secured.', isCorrect: false, rationale: 'That is exactly the trade that removes the only leverage and the only contingency simultaneously.' }
      ],
      principle: 'A distress discount is compensation for credit and concentration risk; take it only with security, bounds and a maintained alternative.',
    },
    {
      type: 'scenario',
      context: 'On Monday a supplier discloses proceedings. On Tuesday its business and workforce transfer to a new company formed by the same directors. Nothing on the buyer purchase order changes.',
      q: 'What is the primary governance issue?',
      options: [
        { text: 'Pricing continuity, since the new owner will want better terms.', isCorrect: false, rationale: 'A real question, and trivial beside the fact that the approved supplier no longer exists.' },
        { text: 'An unqualified counterparty is now supplying a qualified line: capital, insurance, quality approvals, workforce experience and any parent guarantee belong to an entity that never went through approval.', isCorrect: true, rationale: 'Correct. Approval attaches to a legal entity and its controls, not to a phone number, and change-of-control triggers are what catch this.' },
        { text: 'Nothing, since the directors gave notice in good faith.', isCorrect: false, rationale: 'Good faith removes the surprise and none of the exposure.' },
        { text: 'Re-tender the category to establish the new entity terms.', isCorrect: false, rationale: 'A possible outcome, not the immediate control; supply continuity needs an interim authorisation first.' }
      ],
      principle: 'A change of control is a change of counterparty; approval regimes must trigger on it without waiting to be told.',
    },
    {
      type: 'scenario',
      context: 'The supplier in proceedings owes four small businesses behind it. Accounts-payable proposes to hold all payments to the supplier through the process, which will also stop the money reaching two of those small firms working on your product.',
      q: 'What is the correct handling?',
      options: [
        { text: 'Hold everything; the policy is clear and the buyer has no relationship with the sub-tier.', isCorrect: false, rationale: 'Legally tidy and practically consequential: it may stop work finishing your product and creates a reputational position taken by default.' },
        { text: 'Escalate for a deliberate decision: confirm the legal position on payments and set-off, consider a mechanism that keeps the sub-tier working on your line, and record who chose what and why.', isCorrect: true, rationale: 'Correct. This is an executive-level judgement with legal, operational and reputational content; the failure mode is an operational default taken by nobody.' },
        { text: 'Pay the sub-tier direct on instruction from the supplier account manager.', isCorrect: false, rationale: 'Informal routing around an insolvency can be an unfair preference and rarely survives the officeholder review.' },
        { text: 'Release everything quickly to protect the relationship.', isCorrect: false, rationale: 'Overcorrection carries the same legal and set-off exposure in the other direction.' }
      ],
      principle: 'Where a payment decision reaches sub-tier businesses and your own delivery, take it deliberately at the right level and minute it.',
    },
    {
      type: 'scenario',
      context: 'A board asks for a one-page summary of a supplier failure that cost several weeks of lost production. The draft covers root cause, supplier blame and the insurance claim.',
      q: 'What must be added before it goes up?',
      options: [
        { text: 'Nothing; a root cause and an insurance position is a complete report.', isCorrect: false, rationale: 'That reports the event without the only forward-looking content a board can act on.' },
        { text: 'The signal timeline and who decided what, the real substitution cost and duration, the exposure written down and why, and the list of other lines with the same profile with a priced readiness action.', isCorrect: true, rationale: 'Correct. Preparedness is never funded from a post-mortem about one supplier; it is funded from a statement of remaining exposure with a cost attached.' },
        { text: 'A proposal to change supplier next quarter.', isCorrect: false, rationale: 'A decision that follows from the analysis rather than a substitute for it.' },
        { text: 'A request for a stricter credit policy on all suppliers.', isCorrect: false, rationale: 'Blanket policy is the usual way an organisation avoids the targeted spending the event actually showed the need for.' }
      ],
      principle: 'Report a supply failure as an exposure statement with priced options, or it will teach nothing that survives the next quarter.',
    }
  ],

  relSop: 'sop-supplier-exit',
  rel: {
    concepts: ['insolvency-claims-ranking', 'rescue-or-replace', 'step-in-and-contingency', 'supplier-financial-risk', 'liability-indemnity', 'concentration-risk', 'early-warning-ladder'],
    sops: ['sop-supplier-exit', 'sop-contract-review', 'sop-supplier-corrective-action'],
    checklists: ['cl-contract-review', 'cl-supplier-risk-review', 'cl-single-source-justification'],
    templates: ['tpl-supplier-risk-assessment', 'tpl-sole-source', 'tpl-business-case'],
    calcs: ['calc-supplier-concentration', 'calc-payment-terms'],
    decisions: ['dec-supplier-financial-risk', 'dec-re-source'],
    kpis: ['kpi-supplier-concentration', 'kpi-contract-compliance'],
    glossary: ['gloss-sole-source', 'gloss-ppv', 'gloss-hhi']
  },
  labMission: {
    title: 'Mission 24.3: Write the Page You Will Need on Day Three',
    desc: 'Prepare the two artefacts that are impossible to assemble during a failure, before you need them.',
    tasks: [
      'List every advance, deposit, tooling item and consigned stock you hold at suppliers above a threshold, and for each name the document that proves the position. Note the ones with none.',
      'Draft the decision minute template for rescue or replace: the options, the evidence each needs, who approves, and the review date.',
      'Check whether your supplier approval process triggers on a change of control. If it does not, write the one sentence that would make it do so.'
    ],
    ctaLabel: 'Open the Contract Review Checklist',
    ctaHref: '#/cl/cl-contract-review',
    secondaryLabel: 'Open Supplier Concentration',
    secondaryHref: '#/calc/calc-supplier-concentration'
  }
});
