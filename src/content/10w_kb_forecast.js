/* ==========================================================
   Procure Sherpa v3.0 - Knowledge additions: Demand Forecasting
   and Purchase Planning. Demand appears through this product as
   profiling, intake and segmentation - spend analysis asks what
   was bought, requirement definition asks what is needed. What
   no record teaches, as a decision of its own, is how the
   quantity you will buy next is arrived at, how the error in that
   number is measured and owned, and how the size of the error
   sets the stock and the schedule downstream. These four records
   make forecasting teachable. Added with Academy Module 31; held
   out of src/manifest.txt until the payload decision is taken.
   ========================================================== */

PS.SKB({ i: "forecast-method-choice", t: "Forecast method: what each technique assumes about demand", c: "Demand Forecasting and Purchase Planning",
  d: "The choice between a moving average, exponential smoothing, seasonal decomposition, a causal model and a judgemental overlay is a choice about what pattern is believed to exist in the data - and each method is confidently wrong when the pattern it assumes is not the pattern present.",
  w: "A method is a claim about the shape of demand, so picking it is a testable act rather than a preference;Simple methods are usually adequate and are far cheaper to explain to the people who must act on them;The expensive failure is a complex model applied to demand that has no structure left to model;Every method degrades when the regime changes, which is why the choice must be re-made on a calendar rather than inherited",
  n: "Setting replenishment quantities for repeat-purchased items;Planning volumes for a contract with committed tiers;Budgeting a category where spend is driven by activity rather than price;Deciding whether a new item has enough history to forecast at all",
  h: "Classify the demand pattern before choosing anything: smooth, erratic, seasonal, trending, intermittent or new - the pattern is the answer to which method can work;Test two or three candidate methods on the last two periods you already know the outcome of, and keep the one with the smaller error rather than the more impressive name;For intermittent demand, forecast the probability of a call and the size when it comes rather than a single expected quantity, because averaging a series of zeros produces a forecast nobody can order against;Record the chosen method, the data window and the review date on the forecast itself so a later reader knows what was assumed",
  e: "A facilities group forecast cleaning consumables from a twelve-month moving average. When a second site joined the contract the average absorbed the old sites history and predicted a flat quantity for four months while actual usage ran a third higher, and the shortfall was read as supplier unreliability. Switching to smoothing over three periods absorbed the step change in one cycle, and the same data produced a forecast within 6 percent of actual. The method had been the defect, not the supplier.",
  r: "A forecast is a range presented as a point, and the honest form is the range;Models calibrated on a period of unusual demand carry that period into the future as if it were normal;Data quality sets the ceiling on method quality, so a master with duplicated item codes cannot be forecast accurately by any technique",
  m: "Choosing a method because it is what the spreadsheet already computes;Forecasting an item with no history as though it had one;Leaving a seasonal method running through a structural change;Reporting accuracy at the aggregate while every individual line is badly wrong",
  rel: { concepts: ["demand-management", "load-profile-hedging", "savings-baseline", "order-quantity-economics", "esg-data-quality"],
         sops: ["sop-procurement-lifecycle", "sop-procurement-intake"],
         checklists: ["cl-requirement-definition", "cl-sourcing-strategy"],
         templates: ["tpl-business-case", "tpl-cost-avoidance"],
         calcs: ["calc-moq", "calc-budget-vs-actual", "calc-multi-year-contract-cost"],
         decisions: ["make-or-buy", "consolidate-suppliers"],
         kpis: ["kpi-savings", "kpi-cycle-time"],
         glossary: ["gloss-run-rate", "gloss-moq"] } });

PS.SKB({ i: "forecast-error-and-bias", t: "Forecast error is two numbers: how far off, and consistently which way", c: "Demand Forecasting and Purchase Planning",
  d: "Accuracy reported as a single percentage hides two different failures. Dispersion says how wrong the forecast tends to be; bias says whether it is wrong in one direction, which is the part that quietly costs money because a biased forecast is a decision that repeats.",
  w: "A forecast can be 90 percent accurate on average and still be wrong high on every single line, which is a stock build disguised as performance;Bias is actionable and dispersion usually is not, because dispersion is often the demand itself being variable;The measure chosen decides what people optimise, and a percentage-of-error measure invites sandbagging while a bias measure exposes it;Comparing error against the wrong denominator - cheap high-volume lines against expensive rare ones - makes an unreliable category look controlled",
  n: "Reviewing a forecast that a planner or a supplier disputes;Setting the buffer for a category where the average error conceals a one-directional miss;Reporting planning quality to a board or a finance partner;Deciding whether to fix a forecast or fix the supply response to it",
  h: "Report signed error per period and per item class, then separate the mean of those errors (bias) from their spread (dispersion) - they demand different answers;Use a weighted absolute error against value for anything a finance reader will see, so a miss on an expensive line is not cancelled by a hit on a cheap one;Track bias over at least four periods, because two quarters of consistent over-forecasting is a policy and one quarter is noise;Feed the measured dispersion into the buffer rather than inventing a safety margin, so the stock number and the forecast number are the same decision made once",
  e: "A components category reported 92 percent forecast accuracy and carried rising inventory. Decomposing the same data showed error was positive in eleven of twelve months - the forecast ran high consistently - so the headline accuracy was measuring dispersion while the money was being spent by bias. Correcting the level, not the method, released roughly a tenth of the held value in that category within two quarters.",
  r: "Accuracy percentages are only comparable inside a demand class, so a cross-category league table is a competition nobody can win honestly;A measured bias can be gamed by a planner who can also choose the review window;Low historical volume makes both figures unstable, and a small denominator produces dramatic percentages",
  m: "Publishing one accuracy number and calling it complete; Treating a persistent one-directional miss as bad luck;Chasing accuracy as a target rather than as a diagnostic;Adjusting the measure after the result instead of adjusting the forecast",
  rel: { concepts: ["demand-management", "safety-stock-and-service-level", "order-quantity-economics", "working-capital", "savings-baseline"],
         sops: ["sop-supplier-performance-management", "sop-procurement-audit"],
         checklists: ["cl-sourcing-strategy", "cl-supplier-risk-review"],
         templates: ["tpl-supplier-scorecard", "tpl-business-case"],
         calcs: ["calc-moq", "calc-kpi-calculator", "calc-budget-vs-actual"],
         decisions: ["unit-or-tco", "consolidate-suppliers"],
         kpis: ["kpi-savings-realization", "kpi-contract-compliance"],
         glossary: ["gloss-eoq", "gloss-run-rate"] } });

PS.SKB({ i: "planning-horizon-and-variability", t: "The planning horizon decides which errors you can still fix", c: "Demand Forecasting and Purchase Planning",
  d: "A forecast is only useful against a lead time. The question is not whether the number is right but whether it is right early enough to change the order, the capacity or the price - which is why the same demand is forecast three different ways for three different horizons.",
  w: "Errors inside the lead time are absorbed by stock or by expediting, so accuracy at short horizons is bought with inventory rather than with analysis;Errors beyond the commitment point of a contract are absorbed by take-or-pay, storage or disposal, which is why long horizons need a different method and a wider confidence band;The horizon that matters is set by the supply, not by the calendar, so a category with a twenty-week lead time needs a twenty-week commitment view and a two-week view for execution only;Shortening lead time is frequently cheaper than improving forecast accuracy, and it is the same money",
  n: "Structuring a framework with call-off commitments;Deciding the notice period in a supply agreement;Planning a category with imported or single-source inputs;Setting the review cadence for a forecast that keeps arriving too late to act on",
  h: "Write the lead time and the commitment point for each item class before agreeing any forecast cadence, because they define the only horizon that has to be accurate;Forecast the near horizon from consumption and open orders, the middle from the demand plan, and the far horizon from activity drivers - headcount, units built, projects started - rather than extrapolating one series three times;State the confidence band appropriate to the horizon and let the buffer be derived from it, so nobody has to argue about the buffer in isolation;Put an explicit revision rule in the agreement: what changes a committed quantity, by when, and at whose cost",
  e: "A packaging category negotiated a firm price against a committed annual volume. Its forecast was accurate to within 8 percent at twelve weeks and meaningless beyond thirty, and the commitment was annual. Two of four quarters ran under the committed volume and the discount was paid back as a shortfall settlement. Moving the commitment to a rolling three-month block with a stated revision window kept the same price and removed the penalty, because the commitment finally matched the horizon the forecast could actually hold.",
  r: "Long horizons are where judgement is genuinely required, and a model gives false comfort there;A commitment point earlier than the accurate horizon converts forecast error into a contractual liability;Two horizons maintained by two teams usually disagree, and the disagreement is the real information",
  m: "Improving twelve-week accuracy for a twenty-week lead time;Forecasting one series and applying it to every horizon;Signing an annual commitment against a forecast that is only honest quarterly;Treating expedite cost as overhead instead of as the price of a forecast error",
  rel: { concepts: ["order-quantity-economics", "safety-stock-and-service-level", "demand-management", "obsolescence-and-carrying-risk", "working-capital"],
         sops: ["sop-contract-renewal", "sop-procurement-lifecycle", "sop-supplier-price-increase-review"],
         checklists: ["cl-contract-renewal", "cl-sourcing-strategy"],
         templates: ["tpl-negotiation-planner", "tpl-business-case"],
         calcs: ["calc-multi-year-contract-cost", "calc-moq", "calc-tco"],
         decisions: ["unit-or-tco", "make-or-buy", "consolidate-suppliers"],
         kpis: ["kpi-cycle-time", "kpi-contract-compliance"],
         glossary: ["gloss-moq", "gloss-eoq", "gloss-run-rate"] } });

PS.SKB({ i: "forecast-ownership-and-governance", t: "Who owns forecast accuracy, and what the number is used to defend", c: "Demand Forecasting and Purchase Planning",
  d: "The forecast that sets a purchase quantity is usually produced by one function, approved by another and paid for by a third. Governance is the decision about who is accountable for the error, what evidence they must show, and what happens when the number is used as the reason a saving was not delivered.",
  w: "An unowned forecast is a shared number, and shared numbers are only defended when they are convenient;The party able to change the forecast is usually the party measured by it, which is the exact condition for sandbagging or for optimism before a budget round;Accuracy figures travel into supplier negotiations, savings claims and inventory provisions, so a forecast is evidence in three arguments at once;Governance is cheap: a named owner, a stated method, a review date and a record of revisions is most of it",
  n: "Setting up a planning process for a new category;Before a savings claim is defended using forecast demand;When a supplier prices against a volume commitment you cannot evidence;At the annual review of stock provisions and write-downs",
  h: "Name one accountable owner per item class, distinct from the person who benefits from the number being high or low;Require the method, the data window, the assumptions and the revision history to sit with the forecast, so a challenge can be answered with evidence rather than with confidence;Log every change of forecast with date and reason, because the audit trail is what separates a bad guess from an adjusted one;Tie the forecast into the exception report: any quantity bought ahead of the current plan gets an owner, an expiry review date and the assumption it rests on - which is the same control that makes a forward buy defensible",
  e: "A category manager defended a purchase-price variance by showing demand had exceeded forecast. The revision log showed the forecast had been lowered twice in the preceding quarter and restored after the variance was queried. The variance argument collapsed in a single meeting, and the standing rule that came out of it was that a forecast may not be edited inside the period whose performance it is being used to explain.",
  r: "Governance can become a documentation exercise that records forecasts nobody reads;A single named owner with no data access cannot improve accuracy and will absorb the blame for it;Cross-functional consensus processes can produce a number nobody is accountable for, which is the failure the process was meant to fix",
  m: "Owning the forecast in the function that is graded on the spend it prevents;Keeping the forecast in a personal spreadsheet with no revision history;Arguing a saving shortfall with a forecast that was revised after the fact;Measuring owners on accuracy while giving them no control over the inputs",
  rel: { concepts: ["demand-management", "obsolescence-and-carrying-risk", "stock-ownership-models", "savings-baseline", "esg-data-quality"],
         sops: ["sop-procurement-audit", "sop-savings-validation", "sop-vendor-master-integrity"],
         checklists: ["cl-contract-review", "cl-supplier-risk-review"],
         templates: ["tpl-business-case", "tpl-cost-avoidance"],
         calcs: ["calc-savings-analysis", "calc-budget-vs-actual", "calc-kpi-calculator"],
         decisions: ["make-or-buy", "unit-or-tco"],
         kpis: ["kpi-savings", "kpi-savings-realization", "kpi-contract-compliance"],
         glossary: ["gloss-run-rate", "gloss-eoq"] } });
