/* ==========================================================
   Procure Sherpa v3.0 - Academy Module 31: Demand Forecasting
   and Purchase Planning.

   Demand is everywhere in this curriculum and forecast nowhere.
   Module 2 profiles a spend and Module 22 segments a demand curve;
   requirement definition asks what is needed; Module 30 now sets
   the quantity and the buffer against a dispersion figure that
   somebody must have forecast. The step that produces that figure
   - choosing a method, measuring its error honestly, matching the
   horizon to the lead time, and deciding who is accountable for
   the number - has never been taught as a decision of its own.
   Two lessons fill that gap. Held out of src/manifest.txt until
   the payload decision is taken, so this file is authored but not
   built; the tranche is two lessons because the deployed artifact
   is already past its warning ceiling.
   ========================================================== */

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-forecast-method-and-error',
  title: 'Forecast Method and Error: Predicting the Quantity You Buy',
  module: 'Module 31: Demand Forecasting and Purchase Planning - Predicting the Quantity You Buy',
  kicker: 'Function 31.1',
  tier: 'practitioner',
  tagline: 'Every purchase quantity rests on a forecast, and almost nobody can say which method produced it, what that method assumes, or how wrong it has been in the past.',
  desc: "This function covers how a purchase quantity is arrived at before it is negotiated: classifying the demand pattern, choosing a method that matches it, measuring error as two separate numbers - dispersion and bias - matching the forecast horizon to the lead time that consumes it, and turning the measured error into the buffer and the commitment instead of into an argument.",
  duration: '23 mins',
  lifecycleStage: 'Stage 2: Requirement Definition and Demand Planning',
  lifecycleDesc: 'Owned where the quantity is set, which sits between the requester who knows the need and the planner who owns the number.',

  what: "Start with the uncomfortable observation: the number that decides most inventory and most committed volume is usually produced by a method nobody could name. It is not a spreadsheet failure - it is a governance one, because a method is a claim about the shape of demand, and a claim nobody can state cannot be challenged. So the first act is classification, not calculation. Look at the history and ask which pattern is present: smooth, erratic, seasonal, trending, intermittent, or new with no history at all. Each pattern admits a small set of methods that can work and a larger set that will produce confident nonsense. A moving average assumes demand is level and the recent past is the best guide; exponential smoothing assumes the same but reacts faster to a change; seasonal decomposition assumes the pattern repeats on a calendar; a causal model assumes you can name the driver and that the driver is measurable ahead of the demand; judgement assumes someone with context will correct the arithmetic. None of these is the best method in the abstract, and the choice is testable rather than a preference: run two or three candidates against the last two periods whose outcome you already know, and keep the one with the smaller error. That test is cheap, and it is the single most under-used act in this area. Intermittent demand deserves separate treatment because it defeats averaging. A spare part called for twice in eighteen months has a mean that is a fraction of a unit, and a forecast that says 0.4 units is not a quantity anyone can order against. The honest form is two numbers: the probability of a call in a period, and the size when it comes. That is also the honest form of a buffer, because a low probability of demand combined with a high cost of being out is exactly the case where you hold stock for an item that rarely moves - and the argument for it is a service level, not an average. The second half of this function is measurement, and it is where the money hides. Accuracy is reported almost everywhere as a single percentage, and a single percentage conflates two different failures. Dispersion says how far off the forecast tends to be. Bias says whether it is off in one direction consistently. They demand completely different answers, and conflating them is why categories report 92 percent accuracy while carrying rising stock. A components category reported exactly that: decomposing the same data showed error was positive in eleven of twelve months - the forecast ran high every time - so the headline was measuring dispersion while the cash was being spent by bias. Correcting the level rather than the method released roughly a tenth of the held value in two quarters. So report signed error per period and per item class, then split its mean from its spread; use a weighted absolute error against value wherever a finance reader sees the number, so a miss on an expensive line is not cancelled by a hit on a cheap one; and track bias over at least four periods, because one quarter of over-forecasting is noise and two consistent quarters is a policy. Now connect that measurement to the decision Module 30 makes. A buffer exists to absorb variability, and the variability that matters is the dispersion you just measured plus the dispersion of the lead time. If the buffer is argued from a feeling and the error is measured from data, the data will lose the argument every time, so the point is to derive the buffer from the measured error and stop negotiating it separately. One warning about what accuracy is for. A forecast error is not a performance metric to be optimised, it is a diagnostic to be read. Publish accuracy as a target and people will produce an accurate-looking number, which usually means smoothing the data, widening the window, or revising the forecast after the outcome is known. The measure chosen decides what gets optimised, and a percentage invites sandbagging while a bias figure exposes it. Finally, the horizon. A forecast is only useful against a lead time: the real question is not whether the number is right but whether it is right early enough to change the order, the capacity or the price. Errors inside the lead time are absorbed by stock or expediting; errors beyond the commitment point of a contract are absorbed by take-or-pay, storage or disposal. That asymmetry means the same demand should be forecast three ways - near horizon from consumption and open orders, middle from the demand plan, far from activity drivers such as headcount, units built or projects started - and that a category with a twenty-week lead time needs a twenty-week commitment view, not a well-polished two-week one. Two consequences worth carrying into a negotiation. Commitment blocks should match the horizon the forecast can actually hold: a packaging category held a firm price against a committed annual volume while its forecast was honest only to twelve weeks, and two of four quarters ran under the commitment so the discount came back as a shortfall settlement; moving the commitment to a rolling three-month block with a stated revision window kept the same price and removed the penalty. And shortening lead time is frequently cheaper than improving accuracy - it is the same money, spent where it also removes stock.",
  why: [
    'A method is a claim about the shape of demand, so choosing it is a testable act rather than a preference.',
    'Classification comes first: the pattern present decides which methods can work at all.',
    'Intermittent demand has no meaningful average, so forecast the probability of a call and the size when it comes.',
    'Accuracy as one percentage conflates dispersion with bias, and only bias explains a rising stock level.',
    'The measured error should produce the buffer, so the stock number and the forecast number are one decision made once.',
    'The horizon that must be accurate is set by the lead time and the commitment point, not by the reporting calendar.',
    'Shortening lead time buys the same protection as improving accuracy and usually costs less.'
  ],
  when: [
    'Setting or reviewing replenishment parameters for a stocked category.',
    'Before agreeing a volume commitment or a tiered price in a framework.',
    'When a category reports good accuracy while stock or expedite spend rises.',
    'When a new item, site or contract changes the demand regime.',
    'At the annual review of planning quality with the demand owner.'
  ],
  raci: [
    { role: 'Category Manager', resp: 'Owns the method choice, the error measurement and what the numbers are used to argue.' },
    { role: 'Demand or Planning', resp: 'Maintains the series, the data window and the revision history, and states the confidence band.' },
    { role: 'Operations or Site', resp: 'Supplies consumption and open-order visibility, and owns the expedite cost the errors create.' },
    { role: 'Supplier', resp: 'States lead time as a distribution and offers the commitment structure that matches the honest horizon.' },
    { role: 'Finance', resp: 'Sets the weighted error basis and reads bias as an inventory and provision issue, not a planning one.' }
  ],
  inputs: [
    'Item-level usage history long enough to see a pattern, with the regime changes marked.',
    'A demand classification per item class: smooth, erratic, seasonal, trending, intermittent or new.',
    'Lead time distributions with the observed tail, and the commitment point in each agreement.',
    'The cost of a unit of stock, the cost of a stock-out, and the cost of expediting - all three are needed to price an error.'
  ],
  outputs: [
    'A named method per item class with the assumption it rests on and the review date written beside it.',
    'Dispersion and bias reported separately, weighted by value, with the confidence band per horizon.',
    'Buffers derived from measured dispersion rather than negotiated per line.',
    'A commitment structure aligned to the horizon the forecast can honestly hold, with a revision rule.',
    'A ranked list of lead-time reductions priced against the accuracy improvement they replace.'
  ],
  controls: [
    'The method, data window and assumptions are recorded on the forecast, and a candidate method is tested against known periods before adoption.',
    'Forecast error is reported as dispersion and bias separately, weighted by value, and reviewed for at least four periods.',
    'Buffers are calculated from observed demand and lead-time dispersion, with the tail stated and the service target approved per class.',
    'Committed volumes and notice periods are matched to the accurate horizon, and any revision inside a commitment window is logged with its reason.',
    'A forecast may not be edited inside the period whose performance it is being used to explain.'
  ],
  bestPractices: [
    'Ask which pattern you believe is present before you open the model - that question settles most of the method choice.',
    'Test candidates on the last two periods you already know; the more impressive method rarely wins this test.',
    'Report the range, not the point. A forecast without a band is a guess with decimals.',
    'Put bias and dispersion on the same page as the buffer they justify, so the argument happens once.',
    'Price a lead-time reduction against the accuracy improvement it would replace.'
  ],
  mistakes: [
    'Forecasting an item with no history as though it had one.',
    'Leaving a seasonal method running through a structural change or a new site.',
    'Publishing one accuracy percentage and treating it as complete.',
    'Signing an annual commitment against a forecast that is only honest quarterly.',
    'Treating expedite cost as overhead instead of as the price of a forecast error.',
    'Improving short-horizon accuracy for a category whose lead time is long.'
  ],
  terms: [
    { term: 'Dispersion', def: 'How far the forecast tends to be wrong, ignoring direction - the spread of the errors.' },
    { term: 'Bias', def: 'Whether the errors point one way consistently, which is a policy rather than luck.' },
    { term: 'Intermittent demand', def: 'Demand that arrives as irregular calls, where the mean is a fraction nobody can order against.' },
    { term: 'Commitment point', def: 'The date after which a quantity can no longer be changed without cost or penalty.' },
    { term: 'Weighted absolute error', def: 'Error measured against value so a miss on an expensive line is not cancelled by a hit on a cheap one.' }
  ],
  thinkingPoints: [
    {
      quote: 'A method is a claim about the shape of demand.',
      explanation: 'Every technique encodes an assumption: level, trend, season, or a driver you can observe early. If the assumption is not present in the data, the output is a precise answer to a question the data cannot support - and the more elaborate the model, the harder it is to challenge.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a facilities team forecast cleaning consumables from a twelve-month moving average. When a second site joined the contract, the average absorbed the older history and predicted a flat quantity for four months while actual usage ran a third higher, and the shortfall was blamed on the supplier. Switching to smoothing over three periods absorbed the step change within one cycle and the same data produced a forecast within 6 percent of actual. The method was the defect.',
      reflectionPrompt: 'Which method produced the last quantity you committed to, and could you state what it assumes about your demand?'
    },
    {
      quote: 'Accuracy is a diagnostic, not a target.',
      explanation: 'The moment accuracy is graded, the number stops describing the world and starts describing what people can defend. Bias survives that transformation and is the more useful figure, because a consistent direction of error cannot be hidden by choosing a friendlier window.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a components category reported 92 percent forecast accuracy while inventory rose. The same data showed error positive in eleven of twelve months - consistently high forecasts - so the headline measured spread while the cash was spent by direction. Correcting the level released roughly a tenth of the held value within two quarters.',
      reflectionPrompt: 'If your accuracy figure were replaced by its signed mean, would the conversation in your next review change?'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'A stocked category reports 92 percent forecast accuracy. Stock cover has risen for three quarters, expedite spend is over budget, and the planner insists the forecast is good.',
      q: 'What does the data most likely need to show?',
      options: [
        { text: 'Nothing - the accuracy figure is the measurement and it is passing.', isCorrect: false, rationale: 'A single percentage cannot be read as health, because it does not say which way the error points.' },
        { text: 'The signed error split into dispersion and bias over at least four periods, because a consistently high forecast produces good-looking accuracy and rising stock at the same time.', isCorrect: true, rationale: 'Correct. Dispersion and bias demand different answers, and only bias explains a stock build behind a passing score.' },
        { text: 'A tighter accuracy target so the planner improves.', isCorrect: false, rationale: 'Grading the percentage changes how it is produced, not what it costs.' },
        { text: 'A larger buffer, since stock is clearly short.', isCorrect: false, rationale: 'The evidence points the other way - the forecast is running high.' }
      ],
      calcWork: 'Error positive in eleven of twelve months with a mean absolute error of 8 percent: accuracy looks like 92 percent while the level is biased high every period.',
      principle: 'Report the direction of the error as well as its size.'
    },
    {
      type: 'scenario',
      context: 'A spare part is called for twice in eighteen months. The planning system forecasts 0.4 units per month from a moving average, and buyers keep ordering one unit when the call arrives.',
      q: 'What is the right forecasting treatment?',
      options: [
        { text: 'Keep the average and round up when the order is placed.', isCorrect: false, rationale: 'That is what is already happening, and it makes the forecast meaningless.' },
        { text: 'Stop forecasting intermittent items and buy reactively.', isCorrect: false, rationale: 'Reactive buying abandons the service decision rather than solving it.' },
        { text: 'Forecast the probability of a call and the size when it comes, then set cover from a stated service level for that class.', isCorrect: true, rationale: 'Correct. An intermittent series has no meaningful mean, so the honest form is two numbers plus a service target.' },
        { text: 'Use a longer moving average to steady the figure.', isCorrect: false, rationale: 'A longer window on a series of zeros produces a smaller fraction, not a better answer.' }
      ],
      principle: 'Intermittent demand is forecast as a probability and a size, never as an average.'
    },
    {
      type: 'knowledge',
      context: 'Two methods are argued over for a category with a clear step change in demand last year.',
      q: 'Which test settles the choice most cheaply?',
      options: [
        { text: 'Run both against the last two periods whose outcome is already known and keep the smaller error.', isCorrect: true, rationale: 'Correct. Back-testing on known periods is cheap, fast and hard to argue with.' },
        { text: 'Choose the method with the more sophisticated technique.', isCorrect: false, rationale: 'Complexity is not evidence, and it degrades faster under a regime change.' },
        { text: 'Ask which method the team prefers.', isCorrect: false, rationale: 'Preference is a claim about the pattern, and the pattern is observable.' },
        { text: 'Average the two forecasts.', isCorrect: false, rationale: 'Blending hides which assumption is doing the work.' }
      ],
      principle: 'A method is a claim about the shape of demand, and claims can be tested.'
    },
    {
      type: 'knowledge',
      context: 'A framework gives a 7 percent discount against a committed annual volume. The category forecast is honest to twelve weeks and unreliable beyond thirty.',
      q: 'What is the main exposure?',
      options: [
        { text: 'None - the discount is worth it on average.', isCorrect: false, rationale: 'Averages do not settle commitments; the shortfall period does.' },
        { text: 'The commitment period exceeds the honest horizon, so forecast error becomes a contractual liability rather than a planning problem.', isCorrect: true, rationale: 'Correct. Errors beyond the commitment point are paid for as shortfall settlements.' },
        { text: 'The forecast should be smoothed to reduce variability.', isCorrect: false, rationale: 'Smoothing the history does not change the horizon the future can be predicted to.' },
        { text: 'The supplier should be asked to reduce the commitment.', isCorrect: false, rationale: 'That is a negotiation, and it needs the horizon argument first.' }
      ],
      principle: 'Match the commitment period to the horizon the forecast can honestly hold.'
    },
    {
      type: 'scenario',
      context: 'A category has a twenty-week lead time. The planning team spends its year improving twelve-week accuracy from 85 to 94 percent while stock cover keeps climbing.',
      q: 'What should be challenged first?',
      options: [
        { text: 'The accuracy target, which is clearly achievable.', isCorrect: false, rationale: 'It was achieved, and the money did not follow.' },
        { text: 'Whether the horizon being improved is the horizon the supply actually needs.', isCorrect: true, rationale: 'Correct. Errors inside the lead time are absorbed by stock, so short-horizon accuracy is bought with inventory rather than with analysis.' },
        { text: 'The supplier performance, since lead times are long.', isCorrect: false, rationale: 'A long lead time is a design fact here, not a failure.' },
        { text: 'The buffer policy, which must be too conservative.', isCorrect: false, rationale: 'It may be, but the horizon mismatch explains why the accuracy work did not pay.' }
      ],
      calcWork: 'Twenty-week lead time against a twelve-week improvement window: every error the programme fixed was already inside the cover.',
      principle: 'The horizon that must be accurate is set by the lead time, not by the reporting calendar.'
    }
  ],
  sopSteps: [
    { title: 'Classify the demand pattern', role: 'Category Manager with Planning', desc: 'Label each item class as smooth, erratic, seasonal, trending, intermittent or new, using the history rather than the opinion, and mark the regime changes you can already see.', control: 'Classification reviewed when a site, product or contract changes the pattern', record: 'A demand class per item group with the history window used', pitfall: 'Classifying from a chart that has been smoothed enough to hide the variability' },
    { title: 'Choose the method against the class', role: 'Planning', desc: 'Map each class to the small set of methods that can work for it, and write the assumption the method rests on beside the name.', control: 'Method and assumption recorded on the forecast itself', record: 'A method register per item class', pitfall: 'Keeping a method because the spreadsheet already computes it' },
    { title: 'Back-test the candidates', role: 'Planning with Category Manager', desc: 'Run two or three candidate methods against the last two periods whose outcome is known and keep the smaller error rather than the more sophisticated name.', control: 'Back-test repeated whenever the method or the demand regime changes', record: 'A dated comparison of candidate errors', pitfall: 'Testing on the same window that produced the method and calling it validation' },
    { title: 'Measure dispersion and bias separately', role: 'Planning with Finance', desc: 'Report signed error per period and per class, split its mean from its spread, and weight the error by value for anything a finance reader sees.', control: 'Both figures reviewed over at least four periods before any conclusion', record: 'An error report showing direction as well as size', pitfall: 'Publishing one accuracy percentage and treating the analysis as finished' },
    { title: 'Derive the buffer from the measured error', role: 'Category Manager with Operations', desc: 'Convert demand and lead-time dispersion into safety cover at the approved service target per class, so the stock number follows from the forecast rather than arguing with it.', control: 'Service target approved per class and buffers recalculated when dispersion moves', record: 'A buffer basis showing the dispersion and tail used', pitfall: 'Negotiating buffers line by line while the error that drives them goes unmeasured' },
    { title: 'Match commitments to the honest horizon', role: 'Category Manager with Legal', desc: 'Compare the accurate horizon with the lead time and the commitment point, then set committed blocks, notice periods and revision windows to what the forecast can actually hold.', control: 'Commitment structure reviewed against the accuracy horizon at every renewal', record: 'A stated horizon per class with the confidence band beside it', pitfall: 'Signing an annual volume commitment against a forecast that is honest only quarterly' },
    { title: 'Price lead-time reduction against accuracy work', role: 'Category Manager with Supplier', desc: 'Where the error is expensive, compare the cost of forecasting better with the cost of shortening the lead time, and take the cheaper protection.', control: 'Both options costed before an improvement programme is funded', record: 'A comparison sheet with the buffer released by each option', pitfall: 'Funding a modelling programme when a booked capacity slot would remove the same risk' }
  ],
  relSop: 'sop-procurement-lifecycle',
  rel: {
    concepts: ['demand-management', 'load-profile-hedging', 'order-quantity-economics', 'safety-stock-and-service-level', 'forecast-method-choice', 'forecast-error-and-bias', 'planning-horizon-and-variability', 'savings-baseline'],
    sops: ['sop-procurement-intake', 'sop-supplier-performance-management'],
    checklists: ['cl-requirement-definition', 'cl-sourcing-strategy', 'cl-contract-renewal'],
    templates: ['tpl-business-case', 'tpl-negotiation-planner'],
    calcs: ['calc-moq', 'calc-budget-vs-actual', 'calc-kpi-calculator'],
    decisions: ['make-or-buy', 'consolidate-suppliers'],
    kpis: ['kpi-savings', 'kpi-cycle-time'],
    glossary: ['gloss-run-rate', 'gloss-moq', 'gloss-eoq']
  },
  labMission: {
    title: 'Mission 31.1: Find the Method Behind Your Biggest Purchase Quantity',
    desc: 'Take one stocked line you buy regularly and establish what produced the number, how wrong it has been, and in which direction.',
    tasks: [
      'Ask who or what set the current reorder quantity, and write down the method by name. If nobody can name it, that is the finding.',
      'Take twelve periods of actual versus forecast for one item class, split the error into dispersion and bias, and state which of the two explains your stock level.',
      'Compare the horizon your forecast is honest to with the lead time and the commitment point in the agreement, and price one lead-time reduction against the accuracy work it would replace.'
    ],
    ctaLabel: 'Open Budget vs Actual',
    ctaHref: '#/calc/calc-budget-vs-actual',
    secondaryLabel: 'Open Minimum Order Quantity',
    secondaryHref: '#/calc/calc-moq'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-owning-the-forecast-number',
  title: 'Who Owns the Forecast, and What It Is Used to Defend',
  module: 'Module 31: Demand Forecasting and Purchase Planning - Predicting the Quantity You Buy',
  kicker: 'Function 31.2',
  tier: 'executive',
  tagline: 'Forecast accuracy is not a planning metric. It travels into supplier negotiations, savings claims and inventory provisions, which makes it evidence in three arguments at once - and the owner of the number decides which one it serves.',
  desc: "This function covers the governance of the forecast: who is accountable for the error, what evidence must accompany the number, how forecasts get revised after the fact to explain a variance, and what a board should require before accepting a volume commitment, a savings shortfall or a write-down that rests on a prediction.",
  duration: '20 mins',
  lifecycleStage: 'Category strategy, governance and value',
  lifecycleDesc: 'Held at board and category-governance level, because the failure is about accountability for a number rather than about the arithmetic.',

  what: "The forecast that sets a purchase quantity is usually produced by one function, approved by another and paid for by a third, and the reason forecast accuracy is so often a decorative figure is that nobody in that chain is accountable for being wrong. Start from where the number is used, because that is where the incentives live. A forecast is quoted to a supplier to obtain a tiered price, which makes it a negotiating position. It is quoted to finance to explain why a saving was not delivered, which makes it a defence. It is quoted into an inventory provision, which makes it a valuation. Any one of those three uses gives somebody a reason to prefer a particular answer, and a number that somebody has a reason to prefer will drift. This is not a culture problem, it is an ownership one: the party able to edit the forecast is usually the party measured by it. The governance that fixes it is unglamorous and cheap. Name one accountable owner per item class, and make that owner someone who does not benefit from the number being high or low. Require the method, the data window, the assumptions and the revision history to travel with the forecast, so a challenge is answered with evidence rather than with confidence. Log every change with a date and a reason, because the difference between a bad guess and an adjusted one is only ever visible in the trail. And connect the forecast to the exception report: any quantity bought ahead of the current plan gets an owner for the residual risk, an expiry review date, and the demand assumption it rests on - which is the same control that makes a forward buy defensible rather than a saving booked today against a write-down booked in two quarters. There is a specific behaviour worth naming for a board, because it is the one that survives most reviews. A category manager defends a purchase-price variance by showing that demand exceeded forecast. The revision log shows the forecast was lowered twice in the preceding quarter and restored after the variance was queried. The argument collapsed in one meeting, and the standing rule that came out of it was simple: a forecast may not be edited inside the period whose performance it is being used to explain. That rule costs nothing and closes the most common abuse. The second abuse is the consensus process. Cross-functional forecasting rounds - local estimates collected, negotiated, averaged - produce a number that is politically defensible and nobody owns. Consensus is worth having where it injects information the planner does not hold, such as a promotion, a site closure or a product launch; it is worth refusing where it converts a distribution into a compromise. The test is whether the process changes the shape of the error or only its size. If the bias figure does not move, the meetings were a negotiation. Third, the volume commitment. Suppliers price against a forecast because a committed quantity is the thing that buys the discount, and the buyer is being asked to underwrite a prediction with a penalty. The governance question is not whether you believe the forecast but whether the commitment structure matches the horizon the forecast can honestly hold, and whether the revision window is wider than the lead time. Where those two do not line up, the discount is a contingent liability and the board should see it as one. Fourth, what the accuracy figure is used for internally. Publish accuracy as a target and it stops being a measurement. Grade it, and the number will be produced by the choice of window, the smoothing applied, or the timing of revisions. The board-level preference is for two figures that are harder to flatter: bias, because a consistent direction of error is difficult to hide without an obvious edit; and the cost consequence, which is expedite spend, stock cover and provisions - the three places forecast error actually shows up as money. Finally, the honest question for a director. Not whether the forecast is accurate, but whether the organisation knows what it would cost to be wrong, who is accountable for reducing that cost, and what evidence would show the number was produced honestly rather than chosen. A single named owner with no data access cannot improve accuracy and will absorb the blame for it, so accountability has to come with the ability to change the inputs. And a governance regime that only produces documentation is a cost: the test of the register is whether anyone won or lost an argument because of it.",
  why: [
    'A forecast is a negotiating position, a defence and a valuation at once, so it always has advocates.',
    'The party able to edit the forecast is usually the party measured by it - the exact condition for a number to drift.',
    'Ownership plus evidence is what separates a bad guess from an adjusted forecast.',
    'Consensus rounds that do not move bias were a negotiation, not a forecasting process.',
    'A volume commitment longer than the honest horizon converts forecast error into a contractual liability.',
    'Bias and cost consequence are harder to flatter than an accuracy percentage.',
    'Accountability without control of the inputs is blame, not governance.'
  ],
  when: [
    'Approving a framework with committed volumes or tiered pricing.',
    'Reviewing a savings shortfall explained by demand being higher than forecast.',
    'Setting or auditing the planning process and its accuracy reporting.',
    'Before accepting an inventory provision or a write-down resting on a forecast.',
    'At the annual review of stock bought ahead of plan.'
  ],
  raci: [
    { role: 'Board or Executive Sponsor', resp: 'Requires named ownership, the evidence that travels with a forecast, and the cost consequence of error.' },
    { role: 'Category Manager', resp: 'Owns the quantity committed and the horizon claim attached to it.' },
    { role: 'Demand or Planning', resp: 'Maintains the method, the window and the revision log, and refuses edits inside an explained period.' },
    { role: 'Finance', resp: 'Reads bias against inventory and provisions, and prices the error rather than grading the forecast.' },
    { role: 'Internal Audit', resp: 'Tests the revision trail against the arguments the forecast was used to win.' }
  ],
  inputs: [
    'The forecast register: method, data window, assumptions, owner and review date per item class.',
    'The revision log with dates and reasons, not only values.',
    'Where each forecast was used - a price tier, a savings claim, a provision - and the outcome claimed.',
    'Cost consequence data: expedite spend, stock cover, provisions and shortfall settlements.'
  ],
  outputs: [
    'A named accountable owner per item class, separated from the beneficiary of the number.',
    'A rule that a forecast may not be edited inside the period whose performance it explains.',
    'Commitment structures matched to the honest horizon, with revision windows wider than the lead time.',
    'A board view of forecast error as money: expedite, cover and provision, with bias stated.',
    'An audit finding that tests the trail rather than the percentage.'
  ],
  controls: [
    'Every forecast used commercially carries method, window, assumptions, owner and review date.',
    'Revisions are logged with date and reason, and edits inside an explained period are refused.',
    'Committed volumes require a stated accuracy horizon and a revision window tested against the lead time.',
    'Quantities bought ahead of plan carry a residual-risk owner and an expiry review date.',
    'Accuracy reporting to the board is accompanied by bias and by the cost consequence of the error.'
  ],
  bestPractices: [
    'Ask what the number was used for before asking whether it was right.',
    'Prefer bias and cost consequence to an accuracy percentage in board reporting.',
    'Give the owner control of the inputs, or the accountability is decorative.',
    'Keep consensus where it injects information; refuse it where it only averages opinions.',
    'Test the revision trail against the arguments the forecast won - that is where drift shows.'
  ],
  mistakes: [
    'Owning the forecast in the function graded on the spend it prevents.',
    'Keeping the working forecast in a personal spreadsheet with no history.',
    'Accepting a discount priced on a commitment longer than the honest horizon.',
    'Grading planners on accuracy and being surprised when it improves without stock falling.',
    'Treating a lowered-then-restored forecast as a data-quality issue rather than an incentive.'
  ],
  terms: [
    { term: 'Forecast register', def: 'The record of method, window, assumptions, owner and review date that travels with a forecast.' },
    { term: 'Revision log', def: 'A dated history of changes to a forecast with reasons - the difference between a guess and an adjustment.' },
    { term: 'Sandbagging', def: 'Deliberately conservative forecasting to protect the party that will be measured on the outcome.' },
    { term: 'Cost consequence', def: 'The money an error actually caused: expedite spend, stock cover and provisions.' },
    { term: 'Honest horizon', def: 'The furthest period a forecast can be relied on, stated as a range rather than asserted as a number.' }
  ],
  thinkingPoints: [
    {
      quote: 'A forecast is evidence in three arguments at once.',
      explanation: 'The same number sets a price tier, defends a variance and values inventory. Each use has a different preferred answer, so an unowned forecast does not drift randomly - it drifts toward whoever needs it most recently.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a category manager defended a purchase-price variance by showing demand had exceeded forecast. The revision log showed the forecast had been lowered twice in the preceding quarter and restored after the variance was queried. The rule that followed was that a forecast may not be edited inside the period whose performance it is used to explain.',
      reflectionPrompt: 'Where in your organisation does one forecast serve two purposes with opposite incentives?'
    },
    {
      quote: 'Accountability without control of the inputs is blame.',
      explanation: 'A named owner who cannot influence data quality, lead times or the demand plan will absorb every error and fix none. Governance has to pair responsibility with the levers that move the number, or the register becomes documentation of outcomes nobody could change.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a planning owner was graded on accuracy while duplicated item codes kept the history unreliable. Accuracy reporting improved after the master data was repaired, which is the point - the fix was in the input, not in the owner.',
      reflectionPrompt: 'Does the person answerable for your forecast error control anything that would reduce it?'
    }
  ],
  quizzes: [
    {
      type: 'scenario',
      context: 'A purchase-price variance is defended by showing demand exceeded forecast. The forecast register shows the figure was lowered twice in the preceding quarter and restored the week after the variance was queried.',
      q: 'What is the governance conclusion?',
      options: [
        { text: 'A data-quality issue - the register needs a cleaner interface.', isCorrect: false, rationale: 'The trail is intact and readable; the problem is what was done with it.' },
        { text: 'An incentive problem, requiring a standing rule that a forecast may not be edited inside the period whose performance it is used to explain.', isCorrect: true, rationale: 'Correct. The party able to edit the number was the party defended by it, and the fix is a rule, not a reminder.' },
        { text: 'Accept the explanation - the revision history proves the demand moved.', isCorrect: false, rationale: 'It proves the forecast moved, which is the opposite claim.' },
        { text: 'Move forecast ownership to Finance.', isCorrect: false, rationale: 'Reassigning the number does not separate editing from benefit by itself.' }
      ],
      principle: 'A forecast is evidence in three arguments at once, so the trail matters more than the figure.'
    },
    {
      type: 'scenario',
      context: 'A monthly consensus round gathers estimates from six sites. The resulting number is closer to last year than any site estimate, and bias has not moved in four quarters while dispersion narrowed.',
      q: 'What is the process actually producing?',
      options: [
        { text: 'A better forecast, because six views beat one.', isCorrect: false, rationale: 'Narrower spread is not less error, and the direction is untouched.' },
        { text: 'A negotiated compromise rather than a forecast, because consensus that does not move bias changed the number without changing the information.', isCorrect: true, rationale: 'Correct. Consensus earns its cost when it injects facts the planner lacks - a promotion, a closure, a launch.' },
        { text: 'Nothing - dispersion narrowing is the definition of accuracy improvement.', isCorrect: false, rationale: 'It is the definition of a safer-looking average.' },
        { text: 'A reason to grade the sites on accuracy.', isCorrect: false, rationale: 'Grading the percentage invites the behaviour you just observed.' }
      ],
      calcWork: 'Dispersion down 30 percent, bias unchanged across four quarters: the meetings moved the size of the error and left its direction alone.',
      principle: 'Test a consensus process by whether it changes the shape of the error, not only its size.'
    },
    {
      type: 'knowledge',
      context: 'A board reviews forecast quality across categories.',
      q: 'Which reporting pair is hardest to flatter?',
      options: [
        { text: 'Accuracy percentage and on-time delivery.', isCorrect: false, rationale: 'Both can be improved by choosing a friendlier window.' },
        { text: 'Bias and the cost consequence of error - expedite spend, stock cover and provisions.', isCorrect: true, rationale: 'Correct. A consistent direction of error is hard to hide without an obvious edit, and money cannot be smoothed.' },
        { text: 'Accuracy against last year for each planner.', isCorrect: false, rationale: 'A graded percentage changes how the number is produced.' },
        { text: 'The number of forecasts reviewed in committee.', isCorrect: false, rationale: 'Activity is not accuracy.' }
      ],
      principle: 'Report error as money, not as a grade.'
    },
    {
      type: 'knowledge',
      context: 'A planning owner is accountable for accuracy but cannot influence duplicated item codes or the demand plan inputs.',
      q: 'What will the governance produce?',
      options: [
        { text: 'Improved accuracy, because accountability drives performance.', isCorrect: false, rationale: 'Accountability without control changes who is blamed, not what happens.' },
        { text: 'Blame rather than governance - the owner absorbs error they cannot reduce, so pairing responsibility with control of the inputs is the requirement.', isCorrect: true, rationale: 'Correct. The register is only fair if the named owner can move the thing being measured.' },
        { text: 'Nothing either way.', isCorrect: false, rationale: 'It produces documentation and a recurring explanation.' },
        { text: 'A case for outsourcing the forecast.', isCorrect: false, rationale: 'The defect is the split between responsibility and control.' }
      ],
      principle: 'Give the owner control of the inputs, or the accountability is decorative.'
    },
    {
      type: 'scenario',
      context: 'A forward buy is approved at a 9 percent discount against a forecast that assumes a new line starts in Q2. The saving is claimed in the category budget; the stock still exists in Q4 because the line slipped.',
      q: 'What control was missing at approval?',
      options: [
        { text: 'A second price quote to confirm the discount.', isCorrect: false, rationale: 'The price was fine; the assumption carried the risk.' },
        { text: 'A residual-risk owner, an expiry review date and the demand assumption recorded beside the quantity, reported into the same budget line as the saving.', isCorrect: true, rationale: 'Correct. The write-down landed in a different line than the saving, which is why the trade was invisible at the moment of decision.' },
        { text: 'Nothing - forward buys are legitimate.', isCorrect: false, rationale: 'They are legitimate when the residual is owned and dated.' },
        { text: 'A smaller quantity.', isCorrect: false, rationale: 'The size was set by an assumption nobody was answerable for.' }
      ],
      principle: 'Any quantity bought ahead of plan needs an owner for the residual and a review date.'
    }
  ],
  sopSteps: [
    { title: 'Name one owner per item class', role: 'Category Governance', desc: 'Assign accountability for the forecast to someone who does not benefit from the number being high or low, and give them the inputs they need to move it.', control: 'Ownership reviewed when roles or incentives change', record: 'A forecast ownership register by item class', pitfall: 'Assigning the forecast to the function graded on the spend it prevents' },
    { title: 'Require evidence with the number', role: 'Planning', desc: 'Make the method, data window, assumptions and review date part of the forecast rather than a separate document nobody opens.', control: 'A forecast without its method is not accepted into a commercial decision', record: 'The forecast register', pitfall: 'Recording the method once and never re-reading it' },
    { title: 'Log every revision with a reason', role: 'Planning with Audit', desc: 'Capture date, prior value, new value and stated reason for each change, so a bad guess and an adjustment remain distinguishable afterwards.', control: 'Edits inside a period whose performance the forecast is being used to explain are refused', record: 'The revision log', pitfall: 'Keeping history as a single overwritten cell' },
    { title: 'Test commitment structures against the honest horizon', role: 'Category Manager with Legal', desc: 'Compare the horizon the forecast can hold with the commitment period and the revision window, and refuse a commitment longer than the evidence.', control: 'No volume commitment is approved without a stated horizon and confidence band', record: 'A commitment rationale naming the horizon used', pitfall: 'Trading a longer commitment for a price the forecast cannot support' },
    { title: 'Put a residual owner on every ahead-of-plan buy', role: 'Finance with Category', desc: 'Require any quantity bought ahead of forecast to name the owner of the residual risk, an expiry review date and the demand assumption it rests on.', control: 'Ahead-of-plan purchases are approved only with an owner and a review date', record: 'An exposure list by category', pitfall: 'Claiming the saving in one budget line and absorbing the write-down in another' },
    { title: 'Report error as money, not as a grade', role: 'Finance', desc: 'Present expedite spend, stock cover and provisions alongside bias, so the conversation is about consequence rather than about a score.', control: 'Board reporting pairs bias with the cost consequence each period', record: 'A consequence view per category', pitfall: 'Grading planners on accuracy and being surprised when stock does not fall' },
    { title: 'Audit the trail against the arguments', role: 'Internal Audit', desc: 'Sample forecasts that were used to win a variance or justify a discount and test the revision history around the moment they were used.', control: 'Findings feed the standing rule about editing inside an explained period', record: 'An audit note with the cases tested', pitfall: 'Auditing the arithmetic and never looking at the dates' }
  ],
  relSop: 'sop-procurement-audit',
  rel: {
    concepts: ['forecast-ownership-and-governance', 'forecast-error-and-bias', 'planning-horizon-and-variability', 'demand-management', 'savings-baseline', 'obsolescence-and-carrying-risk', 'stock-ownership-models', 'working-capital'],
    sops: ['sop-savings-validation', 'sop-vendor-master-integrity'],
    checklists: ['cl-contract-review', 'cl-supplier-risk-review', 'cl-contract-renewal'],
    templates: ['tpl-business-case', 'tpl-cost-avoidance', 'tpl-supplier-scorecard'],
    calcs: ['calc-savings-analysis', 'calc-budget-vs-actual', 'calc-kpi-calculator'],
    decisions: ['make-or-buy', 'unit-or-tco'],
    kpis: ['kpi-savings-realization', 'kpi-contract-compliance', 'kpi-savings'],
    glossary: ['gloss-run-rate', 'gloss-eoq']
  },
  labMission: {
    title: 'Mission 31.2: Trace One Forecast Through Every Argument It Won',
    desc: 'Pick the forecast behind your largest committed volume and follow the number instead of the method.',
    tasks: [
      'Find who owns the figure, who can edit it, and who is measured by it - then check whether those are the same person.',
      'Locate two decisions the forecast supported, a price tier or a savings defence, and read the revision history around the dates each was claimed.',
      'Compare the commitment period with the horizon the forecast can honestly hold, and write the cost consequence of the last three errors as money rather than as a percentage.'
    ],
    ctaLabel: 'Open Savings Analysis',
    ctaHref: '#/calc/calc-savings-analysis',
    secondaryLabel: 'Open Contract Renewal Checklist',
    secondaryHref: '#/cl/cl-contract-renewal'
  }
});
