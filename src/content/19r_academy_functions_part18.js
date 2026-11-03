/* ==========================================================
   Procure Sherpa v3.0 - Academy Module 23: Artificial Intelligence,
   Model Services and Data Licensing. Module 9 teaches software
   licensing and Module 11 teaches what analytics does inside a
   procurement function; neither teaches how these particular
   products are actually sold. Three lessons: model services and
   their unit economics, data licences and provenance, and the
   assurance and contract terms an executive has to accept on
   suppliers whose behaviour is probabilistic. Written with no
   apostrophes, since these strings are single quoted and the
   build reads them literally.
   ========================================================== */

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-model-service-procurement',
  title: 'Model Services and the Unit Economics of Doing Work Per Token',
  module: 'Module 23: Artificial Intelligence, Model Services and Data Licensing',
  kicker: 'Function 23.1',
  tier: 'practitioner',
  tagline: 'A per-token price is not a unit cost until you know how many tokens the work actually takes - and that number is a property of your design, not of the vendor price list.',
  desc: "This function covers how model and AI services are priced - per token, per request, per seat, reserved capacity against serverless inference, batch and cached rates - and why the same business process can differ by an order of magnitude in cost depending on how it is built. It covers the difference between a benchmark score and an evaluation on your own task, what an embeddings model does to your future switching options, where latency and throughput commitments actually matter, and how to write a contract for a product whose behaviour changes when the vendor quietly updates the model underneath it.",
  duration: '26 mins',
  lifecycleStage: 'Stage 3: Category Sourcing Strategy',
  lifecycleDesc: 'The category strategy here is a design decision first and a supplier decision second, because the architecture chooses the spend.',

  what: "Model services look like a utility and behave like neither a utility nor a software licence, and the confusion starts with price. The published unit is usually a token - roughly a word fragment - quoted separately for input and output, sometimes with different rates for a longer context window, sometimes with a batch or offline rate at a fraction of the online rate, sometimes with a discount for prompt caching when the same long instruction is repeated across many calls. Two teams running the same business process can differ by ten times on the same price list, because total cost is the unit rate multiplied by tokens consumed per completed task, and that second factor is set by how the work is designed: how much context is pasted into every call, whether the model is asked to reason at length or to answer briefly, whether a cheap model handles the routine cases and a stronger one is reached only for exceptions, whether results are cached and reused, and whether failures cause the whole call to be retried. That is why the commercial conversation in this category belongs before the technology is frozen rather than after: the routing decision between one expensive model call and three cheap ones, or between retrieval that supplies only relevant text and a prompt that carries the whole document, is a procurement decision expressed in architecture. The second thing a buyer must hold is that capability claims and capability on your work are different measurements. Vendor benchmarks are public scores on tests the vendor had access to, often with prompt engineering that would not survive contact with production. A useful evaluation is built from your own examples with your own definition of correct, run against candidate models under the same conditions you will actually use: same latency budget, same context, same refusal behaviour, same rate limits. Three numbers matter more than a headline score - the accuracy on your task, the variance of that accuracy across runs, and the cost of a correct answer, which is total spend divided by answers that passed the check rather than answers produced. A model that is 92 percent right at a tenth of the cost is often the better buy; a model that scores higher but varies run to run is a maintenance burden you have not priced. Third, and the part most contracts miss: what happens when the vendor changes the product. A model service is not a fixed artefact - suppliers retire versions with notice periods, move defaults, and update behaviour without a new price. The contract questions are therefore specific: how long will the version you evaluated remain available, what notice is given before retirement, what happens to your measured accuracy when the default moves, and can you pin a version. Then the switch cost, which is rarely the contract - it is the architecture. An embeddings model turns your documents into vectors that only resemble each other in the geometry of that model family, so a corpus indexed under one vendor cannot simply be searched by another; the index has to be rebuilt, which is compute, time and a re-validation of results. Fine-tuned weights held on the vendor infrastructure raise the same question in a sharper form: who owns them, can they be exported, and what happens at exit. Prompt libraries, evaluation sets and routing rules are your assets, and the vendors that behave worst after a price increase are those whose customers cannot re-index. Fourth, commitments and capacity. Discounted committed-spend agreements look like ordinary volume commitments and are not, because they can be unspent if the vendor rate-limits you, if your traffic grows differently than planned, or if the model you planned around is retired. Availability and latency commitments belong to the workload that matters: a p99 on inference during business hours may be irrelevant for an overnight batch, while a batch completion window is critical for a report and meaningless for a chat assistant. Read the commitment against the use case, then ask what the remedy is, and be suspicious of service credits that cap at a small percentage of a monthly fee when the business process stopped. Fifth, safety and data handling as commercial terms rather than engineering folklore: whether the provider uses your inputs and outputs to train shared models, and whether that can be switched off contractually and not only by console toggle; where data resides and which sub-processors touch it; retention of prompts; tenant isolation; and logging that a regulator or an auditor could later read. These are negotiable and they belong in the agreement, not in a policy page. Finally, how to run the process. Build the evaluation set before the tender and share it, or at minimum require each bidder to demonstrate against your examples rather than their slides. Model the spend from the design: volume, tokens per task, routing, caching, retry behaviour - and state the assumptions as first-class figures so the cost model is falsifiable when usage arrives. Score on cost per correct answer on your task, not on rate card or benchmark. Contract for version availability with notice, for the data use position, for the exit that includes your index and your weights, and for reporting you can audit. Then re-run the evaluation on a schedule after go-live, because this is the one category where the thing you bought changes while the contract still runs.",
  why: [
    'Total cost is a unit rate multiplied by tokens per completed task, and the second factor is set by your design rather than by the price list.',
    'Vendor benchmarks are measured under conditions that do not survive contact with production; an evaluation on your own examples is the only comparable number between bidders.',
    'Cost per correct answer, not accuracy or rate card, is the figure that supports an award decision.',
    'An embeddings corpus is model-specific geometry, so the switching cost sits in your architecture rather than in the contract.',
    'A model service changes underneath the agreement, so version availability, notice and re-validation are commercial terms rather than technical detail.'
  ],
  when: [
    'Before the architecture is fixed, because the routing and retrieval decisions determine most of the eventual spend.',
    'When a pilot is being scaled into production and the trial volume stops looking representative.',
    'At renewal of a committed-spend agreement, when the vendor has retired the version you evaluated.',
    'When two candidates show different accuracy and very different variance across runs.',
    'Whenever the answer to who owns the fine-tuned weights, or whether your prompts train a shared model, is not written in the contract.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Owns the cost model built from the design, the evaluation-based comparison and the award recommendation.' },
    { role: 'Technology Owner', resp: 'Sets the architecture, the routing rule, the caching approach and the re-index cost of switching.' },
    { role: 'Data Protection or Compliance', resp: 'Approves the data-use position, residency, sub-processors, retention and the audit trail.' },
    { role: 'Vendor Account Lead', resp: 'States version availability, retirement notice, capacity commitments and the remedy for a miss.' },
    { role: 'Finance', resp: 'Tests the committed-spend assumption against forecast volume and holds the exposure if traffic does not arrive.' }
  ],
  inputs: [
    'Expected volumes, the design of the call, and tokens per task for each candidate route with assumptions stated.',
    'An evaluation set from real work with a written definition of a correct answer, and results run against it.',
    'Price lists separated by mode: online, batch, cached, and by context length, with committed-spend terms.',
    'The vendor position on training use of your inputs, residency, sub-processors, retention and version retirement notice.'
  ],
  outputs: [
    'A cost model with cost per correct answer on your task per candidate, not a rate-card comparison.',
    'An award note recording variance across runs and what happens to the service when the default model moves.',
    'Contract terms on version availability and notice, data use, audit reporting and an exit that covers the index and any weights.',
    'A re-evaluation schedule after go-live with a named owner and a threshold that triggers renegotiation.'
  ],
  controls: [
    'No award on a benchmark alone; every candidate is measured on the same evaluation set with the same definition of correct.',
    'Cost claims are expressed per correct answer with the volume, tokens-per-task and routing assumptions visible.',
    'The data-use position, residency and retention are in the agreement and not only in a console setting that can change.',
    'Post-award re-evaluation is scheduled, and a drift beyond the stated threshold is a contractual conversation rather than a surprise.'
  ],
  bestPractices: [
    'Design for the cheapest model that passes your evaluation and route exceptions upward; the architecture is the discount.',
    'Ask for the retirement notice period before signing, since a silently moved default invalidates the evaluation you awarded on.',
    'Budget for re-indexing in the switching analysis, because that is the number that makes an embeddings change expensive.',
    'Treat prompt and evaluation assets as your property and keep them out of the vendor exclusive, which is what preserves the ability to leave.'
  ],
  mistakes: [
    'Comparing vendors on published benchmark scores taken from different tests with different prompt engineering.',
    'Signing a committed-spend deal on a forecast the pilot volume never supported.',
    'Leaving the question of whether your inputs train shared models to a settings page.',
    'Discovering at renewal that the model version evaluated two years ago has been retired with no notice obligation.'
  ],
  terms: [
    { term: 'Token pricing', def: 'A rate per token of input and output, often varying by model, context length and mode, and only meaningful multiplied by tokens per task.' },
    { term: 'Embeddings', def: 'Vector representations of text produced by one model family, which is why an index built with one vendor is not searchable by another.' },
    { term: 'Cost per correct answer', def: 'Total spend divided by answers that passed the evaluation, the comparison figure an award decision can actually rest on.' },
    { term: 'Version retirement', def: 'A supplier withdrawal of a model release, with a notice period and a behaviour change that invalidates prior measurement.' }
  ],

  thinkingPoints: [
    {
      quote: 'The rate card that was not the bill.',
      explanation: 'A document-processing service was approved on a token price 40 percent below the incumbent. The winning design pasted each whole document into every call, retried the full request when any part failed, and used the strongest model for every step. The unit price fell and the cost per completed document doubled, because the tokens per task - not the rate - were the variable that moved.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: in this category the buyer owns the multiplier, and a price comparison that assumes the same behaviour across suppliers compares nothing.',
      reflectionPrompt: 'For the AI service you last approved, can you name the tokens per completed task, or was the business case built on the unit price alone?',
    },
    {
      quote: 'The index that held them in place.',
      explanation: 'A buyer with three years of supplier documents indexed under one embeddings model asked for a price increase response. Re-indexing under a cheaper provider was technically possible and commercially unattractive: several hundred thousand documents to reprocess, a search quality that had only ever been tuned against the original geometry, and no way to compare result quality without a fresh evaluation cycle. The increase was accepted.',
      realWorldExample: 'Illustrative example: lock-in in this market is often architectural rather than contractual, and the switching cost is the one nobody priced at the start.',
      reflectionPrompt: 'If tomorrow the model behind your vector index had to change, who would pay for the rebuild and how long would the business be unable to search its own documents?',
    }
  ],

  sopSteps: [
    { title: 'Build the evaluation set before the shortlist', role: 'Category Manager',
      desc: 'Take a sample of real work, write down what a correct answer looks like for each case, and fix the conditions: context supplied, latency budget, refusal handling and retry rule. Candidates are then measured on the same task rather than on their own chosen tests.',
      control: 'No candidate enters evaluation without a run against the buyer evaluation set, and the definition of correct is written before the results are seen.',
      record: 'Evaluation set with cases, correctness definitions, run configuration and results per candidate.',
      pitfall: 'Accepting a vendor demonstration on examples the vendor selected, which measures the demo rather than the service.'
    },
    { title: 'Model the spend from the design', role: 'Technology Owner',
      desc: 'Estimate volume, tokens per task, the routing split between cheap and strong models, caching hit rate and retry behaviour, and show each as a stated assumption. Cost per correct answer follows from that model and is the number the award rests on.',
      control: 'Every cost claim names its assumptions, and a variance beyond the stated threshold triggers a re-forecast rather than an explanation.',
      record: 'Cost model with assumptions per line, cost per correct answer per candidate and the forecast basis.',
      pitfall: 'Comparing rate cards while leaving tokens per task out of the calculation, which is the largest term in the sum.'
    },
    { title: 'Fix the version and notice position in writing', role: 'Vendor Account Lead',
      desc: 'Record which model release the evaluation was run against, how long it will remain available, what notice is given before retirement, and what re-validation is owed to the buyer when the default changes. A behaviour change with no notice invalidates the basis of the award.',
      control: 'The contract names the evaluated release, a minimum availability period, a notice period before retirement and a re-validation obligation on the supplier.',
      record: 'Contract schedule listing release, availability window, notice period and re-validation duty.',
      pitfall: 'Signing an agreement that lets the supplier move defaults at discretion, then measuring a service nobody evaluated.'
    },
    { title: 'Settle the data-use position as a term', role: 'Data Protection or Compliance',
      desc: 'Establish whether inputs and outputs are used to train shared or improving models, how that can be turned off, where data resides, which sub-processors see it, how long prompts are retained and what logging exists for later audit. A console toggle is not a commitment.',
      control: 'The agreement states the training-use position, residency, sub-processor list, retention period and the change-control route for any variation.',
      record: 'Data position schedule with training use, residency, sub-processors, retention and evidence of the setting.',
      pitfall: 'Relying on a settings page the supplier can change unilaterally as the whole of the protection.'
    },
    { title: 'Price the switching path honestly', role: 'Category Manager',
      desc: 'Cost the re-index, the export of prompts and evaluation assets, the re-validation cycle and the service gap while it happens. Where fine-tuned weights exist, record who owns them and whether they can be exported at termination.',
      control: 'Any incumbent award carries a documented switching cost, and exit terms cover data export, index rebuild support and the weights position.',
      record: 'Switching analysis with re-index cost, asset export list, weights ownership and the exit support commitment.',
      pitfall: 'Treating exit as a contractual notice period when the real constraint is that the corpus cannot be searched by anyone else.'
    },
    { title: 'Match commitments to the workload', role: 'Technology Owner',
      desc: 'Ask what is actually being protected: p99 latency for an interactive path, a completion window for a batch job, throughput headroom for a launch. Then read the remedy, since a service credit capped at a fraction of a monthly fee does not compensate a business process that stopped.',
      control: 'Each committed service level maps to a named workload and a stated consequence for the buyer, tested at least once before renewal.',
      record: 'Commitment register mapping service level to workload, remedy and the test result.',
      pitfall: 'Signing a general availability promise for a workload that is offline at night and never affected by it.'
    },
    { title: 'Re-evaluate on a schedule after go-live', role: 'Category Manager',
      desc: 'Run the evaluation set again at a fixed cadence, record the drift against the awarded baseline, and treat a breach of the stated threshold as a contractual conversation with a defined route rather than as an operational annoyance.',
      control: 'Re-evaluation is scheduled with a named owner and a threshold that triggers the vendor review, and results are retained as evidence.',
      record: 'Re-evaluation log with date, sample, drift against baseline and the action taken.',
      pitfall: 'Discovering quality loss only when users complain, months after a supplier-side change that nobody measured.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'Two candidates for a contract-analysis service. Model A scores 88 percent on the buyer evaluation set with a rate 40 percent above Model B. Model B scores 71 percent and varies by 20 points between identical runs.',
      q: 'What is the correct comparison basis?',
      options: [
        { text: 'Model B, since the higher price must be justified by a much larger gap.', isCorrect: false, rationale: 'It ignores that B fails nearly three in ten on a task where a wrong answer has to be caught, and that its variance makes any single measurement unreliable.' },
        { text: 'Model A, provided cost per correct answer on the same evaluation set is calculated for both and the review cost of Bs variance is included.', isCorrect: true, rationale: 'Correct. The award basis is cost per correct answer under your conditions; a model that varies 20 points needs a human check on most output, and that labour belongs in the comparison against the cheaper model.' },
        { text: 'Either, since a 17-point difference on a test is not significant.', isCorrect: false, rationale: 'Significance is a claim about a test you have not defined; the evaluation set and correctness rule are the buyer own instrument and the difference is on the task that matters.' },
        { text: 'Model B, with a promise to review performance after three months.', isCorrect: false, rationale: 'That defers the measurement rather than doing it, and the cost of a bad award in this category is paid back through review labour, not recovered.' }
      ],
      calcWork: 'If Bs variance means every output needs checking while A passes 88 percent of first reviews, the comparison is the token spend plus the review time - typically enough to erase a 40 percent rate advantage.',
      principle: 'Compare cost per correct answer on your own task under your own conditions, and put the cost of unreliability into the same line.',
    },
    {
      type: 'scenario',
      context: 'A vendor offers a 25 percent discount for a three-year committed spend. The pilot ran at a volume the business now expects to exceed by four times, but on a different model release than the one evaluated.',
      q: 'What should the buyer do?',
      options: [
        { text: 'Take the discount; a 25 percent reduction on any volume is a saving.', isCorrect: false, rationale: 'The discount is against a rate, while the two risks - commitment against actual volume and an unvalidated model release - are the larger numbers.' },
        { text: 'Re-run the evaluation on the release that will actually serve the work, size the commitment against the volume forecast with its assumptions shown, and only then negotiate the rate.', isCorrect: true, rationale: 'Correct. The commitment becomes an exposure if the volume does not arrive, and the rate is meaningless if the measured quality belongs to a different release. Both are fixed by doing the evaluation and the forecast before signing.' },
        { text: 'Reject the commitment and stay on pay-as-you-go at list price.', isCorrect: false, rationale: 'That may well be the right answer after the analysis, but as a reaction rather than a decision made on the numbers.' },
        { text: 'Accept and plan to review usage annually.', isCorrect: false, rationale: 'Annual review is what the commitment removes; you cannot unwind an unspent commitment after the fact.' }
      ],
      calcWork: 'A committed spend sized on a pilot that understates volume by four times is usually under-committed rather than over-committed, but the exposure reverses if the new use case does not launch - which is the case worth pricing.',
      principle: 'A commitment is only safe when it is sized against a stated forecast and the evaluated release is the release that will serve the work.',
    },
    {
      type: 'scenario',
      context: 'The supplier will not commit to a version availability period, saying only that they will give reasonable notice of changes.',
      q: 'What is the proportionate response?',
      options: [
        { text: 'Accept it; every supplier writes that clause.', isCorrect: false, rationale: 'Common is not the same as acceptable, and here the entire basis of the award - a measurement on a specific release - evaporates under it.' },
        { text: 'Escalate as a deal-blocker, and where the supplier genuinely cannot pin a release, secure notice of a defined length, a re-validation right and a no-penalty exit if the measured behaviour changes.', isCorrect: true, rationale: 'Correct. Some suppliers cannot commit for architectural reasons, and the honest response is to price the risk with notice plus re-validation plus exit, rather than accepting undefined reasonable or blowing up a good service.' },
        { text: 'Ask engineering to build a fallback to a second vendor.', isCorrect: false, rationale: 'A useful mitigation, but it is expensive and does not answer the contractual question of who tells you before the ground moves.' },
        { text: 'Request the version number in the order form instead.', isCorrect: false, rationale: 'A number without an availability commitment is documentation, not protection.' }
      ],
      principle: 'Where the product changes by nature, the contract must carry notice, re-validation and exit - the three terms that keep a measurement meaningful.',
    },
    {
      type: 'scenario',
      context: 'A procurement team wants to move to a cheaper provider. The document corpus was embedded under the current model, and the search quality has only ever been tuned against that geometry.',
      q: 'What does the switching analysis need to show?',
      options: [
        { text: 'Only the new rate card, since the corpus belongs to the buyer.', isCorrect: false, rationale: 'The corpus is yours; the vectors are a function of one model family, and rebuilding them plus re-tuning search is the real cost.' },
        { text: 'The re-index compute and time, the re-validation cycle, the service gap, and the export position for prompts, evaluation assets and any fine-tuned weights.',
          isCorrect: false, rationale: 'Close, and the right items - but the answer has to conclude with the decision they support rather than stopping at a list.' },
        { text: 'Re-index cost, re-validation cost and service gap against the rate saving over the remaining term, with the ownership and exportability of prompts, evaluation sets and weights stated - and if the switch does not pay, that conclusion recorded as the reason for renegotiating instead.', isCorrect: true, rationale: 'Correct. This is the honest form: quantify the lock-in, compare it with the saving, and let the arithmetic decide whether the move, a renegotiation, or staying is the cheapest answer.' },
        { text: 'Nothing, since the incumbent will match any credible threat.', isCorrect: false, rationale: 'That treats a switching cost that does not exist as negotiating leverage, and a supplier who knows the index is yours to move rarely blinks.' }
      ],
      calcWork: 'Re-indexing hundreds of thousands of documents plus a fresh evaluation cycle is often a one-off cost that the annual rate saving takes several years to recover, which is exactly why it must be priced before the conversation rather than during it.',
      principle: 'In this market the switching cost is architectural; price it, and let the number choose between moving, renegotiating and staying.',
    },
    {
      type: 'scenario',
      context: 'A console setting shows that data is not used for training. The contract says nothing about it, and the supplier terms of service can be updated with notice.',
      q: 'What is the correct action?',
      options: [
        { text: 'Rely on the console setting; it is the enforcement mechanism.', isCorrect: false, rationale: 'A setting the supplier can change, on terms the supplier can update, is not a protection - and it is invisible to any later audit.' },
        { text: 'Put the training-use position, retention and the change-control route into the contract, and keep evidence of the setting as a compliance record rather than as the control.', isCorrect: true, rationale: 'Correct. The contract is what binds; the setting is evidence that the binding is being honoured, which is the right way round.' },
        { text: 'Ask the supplier to confirm by email.', isCorrect: false, rationale: 'An email cannot override the terms of service it contradicts, and it will not survive a change of account team.' },
        { text: 'Produce the data in a way that avoids the question.', isCorrect: false, rationale: 'Sometimes sensible operationally, and not a substitute for a term when the work requires the service.' }
      ],
      principle: 'Write the data-use position into the agreement; a settings page is evidence, never the control.',
    }
  ],

  relSop: 'sop-sustainable-sourcing-verification',
  rel: {
    concepts: ['model-service-pricing', 'ai-evaluation-and-benchmarks', 'vendor-lockin-and-portability', 'total-cost-of-ownership', 'supplier-market-analysis', 'should-cost', 'spend-analysis'],
    sops: ['sop-sourcing-strategy', 'sop-commercial-evaluation', 'sop-supplier-evaluation'],
    checklists: ['cl-commercial-evaluation', 'cl-sourcing-strategy', 'cl-supplier-risk-review'],
    templates: ['tpl-business-case', 'tpl-commercial-evaluation', 'tpl-weighted-scoring'],
    calcs: ['calc-multi-year-contract-cost', 'calc-tco'],
    decisions: ['dec-unit-or-tco', 'dec-framework-agreement'],
    kpis: ['kpi-contract-compliance', 'kpi-savings'],
    glossary: ['gloss-tco', 'gloss-opex', 'gloss-sla']
  },
  labMission: {
    title: 'Mission 23.1: Cost One Task, Not One Rate',
    desc: 'Take one AI or data service you already use and turn the rate card into a cost per completed piece of work.',
    tasks: [
      'Estimate tokens per completed task for one real process, listing how much context is supplied per call, what share is cached, and what happens on a failure. State each assumption.',
      'Write five cases from real work with a definition of correct for each, and run your current service against them. Note the variance between runs.',
      'Compute cost per correct answer, and compare it against the price per token you were quoted. Record which number would have changed the award.'
    ],
    ctaLabel: 'Open Multi-Year Contract Cost',
    ctaHref: '#/calc/calc-multi-year-contract-cost',
    secondaryLabel: 'Open the Commercial Evaluation Checklist',
    secondaryHref: '#/cl/cl-commercial-evaluation'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-data-licensing-and-provenance',
  title: 'Data Licensing: What You Are Actually Allowed to Do With It',
  module: 'Module 23: Artificial Intelligence, Model Services and Data Licensing',
  kicker: 'Function 23.2',
  tier: 'practitioner',
  tagline: 'Data is sold as a file and licensed as a permission. The gap between the two is where the disputes live years later.',
  desc: "This function covers what a data licence grants - use, purpose, territory, term, derivative works, model training rights, redistribution and exclusivity - how provenance is evidenced rather than asserted, and why the same dataset can be lawful to analyse and unlawful to publish. It covers dataset against stream, update and correction obligations, the personal data and confidentiality questions that sit alongside commercial rights, indemnity for third-party claims, and the audit and record-keeping that lets you prove the position when a regulator or a former supplier asks.",
  duration: '26 mins',
  lifecycleStage: 'Stage 5: Market Analysis and Supplier Identification',
  lifecycleDesc: 'The market for data is thin, informal and often one-supplier, so the licence terms are discovered during identification rather than negotiated at award.',

  what: "A data purchase is unusual in that the thing you receive is not the thing you bought. You receive records; you buy permission to do particular things with them. The commercial risk in this category is therefore not quality - it is scope: doing something the licence did not grant, often in good faith, sometimes years after the file was delivered and the person who read the licence has left. So read the licence as a set of axes. Purpose: what use is allowed - internal analysis, product enhancement, customer-facing publication, research, training a model. These are different permissions, and a right to analyse is not a right to embed or to publish; a right to train a model is not a right to distribute the model to customers on terms that hand them your dataset in all but name. Users: whether affiliates, contractors and customers of your organisation may use it, and whether an onward licence exists for derivative outputs. Territory and term: where and for how long, and critically what happens to models, indexes, cached features and derived statistics built during the term when the licence expires - the common position is that the data goes away and the artefacts built from it remain, but that is exactly what must be written rather than assumed. Exclusivity: whether the seller may license the same content to your competitor, which for many market datasets is the whole point of paying more. Modification: whether you may clean, enrich or join it, and whether derived or derived-from versions carry the licence with them. Publication: what you may show, at what aggregation level, and whether attribution or a specific citation form is required. The provenance question is the second half of the decision and is where the market is least professional. Ask what the seller actually holds: the original collection, a copy bought from someone else, or a re-publication of something scraped from a third source. Each has a different chain of permission, and only the first two are usually defensible. Evidence looks like: the source and the collection basis, the licence or consent that permits onward sale, dates covering the records, a chain of titles for third-party content inside the dataset including images, text and code, the presence or absence of personal data and the lawful basis if there is any, documented quality and known limitations, and an assurance that no conflicting exclusive right has been granted. Where a supplier cannot produce any of this, the correct reading is not that the data is risky; it is that you cannot later prove you were entitled to use it, which is a different and worse position. Two structural features change the negotiation. Dataset against stream: a static file can be validated once and archived; a feed is a continuing service with latency, correction and availability obligations, and the licence may be silent on whether a corrected record replaces or supplements what you stored. Update frequency, correction windows, retro-fix policy and what happens to your derived features when upstream values change belong in the agreement. The second is derived works: if you join a licensed dataset with your own, the output may carry the licence conditions - a restriction that can quietly capture a product you intended to own outright. Model training is the sharpest version of this question: whether training on data transfers any right in the weights, whether the licence prohibits training at all, whether a model trained on the data may be distributed, and whether deletion of the data must be followed by deletion or retraining of anything built from it. The honest answer in most regimes today is unsettled, which means a competent buyer writes a position into the contract rather than inheriting an interpretation from a marketing page. Then the legal floor under the commercial rights. Personal data: even where a dataset is anonymised, re-identification risk is a real question and some regimes treat certain identifiers as personal data regardless of context. Data protection duties - lawful basis, minimisation, retention limits, a documented assessment where the processing is new or high risk - sit alongside the licence rather than instead of it, and vary by jurisdiction, so the requirement to take local advice is a standard part of this category rather than an admission of ignorance. Confidentiality: much market data is aggregated precisely because individual values are commercially sensitive; the licence may forbid any attempt to reverse that, and a competitor may have an obligation of confidence you would inherit by publishing too finely. Finally, indemnity and audit. A supplier warranty that it has the right to license is worth what the supplier is worth, so check the indemnity scope - third-party claims over content, over privacy, over IP - the caps, and whether it survives the supplier exit. Keep the licence, the provenance evidence and the derivation register as records for the life of the artefacts built on the data, because the question that arrives years later is usually who approved this use and on what basis. And before the file arrives, do the boring thing that prevents almost every dispute: write one paragraph describing exactly what you intend to do with the data - internally, in products, in models, in published reporting - and check it line by line against the granted purposes. Buying data on a licence you have not read against your own use case is the one mistake in this category that nobody has ever successfully argued their way out of.",
  why: [
    'You receive records but buy permissions, so the risk in this category is scope rather than quality.',
    'A right to analyse, a right to publish and a right to train a model are three different grants, and one is often sold on the strength of another.',
    'What happens to derived artefacts - indexes, features, models - when the term ends must be written, because the default assumption is usually wrong.',
    'Provenance is about being able to prove entitlement later, which is a different thing from the data looking plausible today.',
    'Indemnity value depends on the substance behind the supplier, and derived-work conditions can quietly capture a product you intended to own.'
  ],
  when: [
    'Before any dataset enters a product, a model or an external publication rather than only before internal analysis.',
    'When the seller cannot name where the records originated, or describes the source only as aggregated from public information.',
    'At renewal, when a licence that permitted last year use has changed its permitted purposes.',
    'When personal or commercially sensitive content is in scope and the aggregation level may allow re-identification.',
    'Whenever the plan includes training a model, embedding the corpus, or exposing values through an interface to customers.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Owns the use-case statement, the licence scope check and the record of who approved what.' },
    { role: 'Data Owner or Analytics Lead', resp: 'States the intended processing, the derived artefacts and what happens to them at termination.' },
    { role: 'Legal or IP', resp: 'Interprets granted purposes, third-party content rights, indemnity scope and the position on model training.' },
    { role: 'Data Protection', resp: 'Assesses personal data, lawful basis, minimisation, retention and any documented assessment the regime requires.' },
    { role: 'Supplier', resp: 'Evidences provenance, chain of title, update and correction policy, and the absence of conflicting exclusive grants.' }
  ],
  inputs: [
    'A written statement of intended use covering internal analysis, product exposure, model training and publication.',
    'The licence text with purposes, users, territory, term, modification, derivation, publication and exclusivity read as separate axes.',
    'Provenance evidence: origin, collection basis, chain of title for third-party content, dates and known limitations.',
    'Personal data and sensitivity position, including the aggregation level and any re-identification risk.'
  ],
  outputs: [
    'A scope decision per intended use, with any granted purpose that does not cover it either renegotiated or the use stopped.',
    'A derived-artefact register listing features, indexes, models and reports built on the data and their position at expiry.',
    'A provenance file retained for the life of the artefacts, so entitlement can be evidenced after the people have moved on.',
    'A risk note on indemnity scope, caps and survival, with the position recorded where the supplier cannot evidence its chain.'
  ],
  controls: [
    'No dataset enters a product, model or publication without a written purpose-to-licence comparison.',
    'Provenance evidence is held for the licence term plus the life of derived artefacts, not only while the supplier relationship runs.',
    'Derived-work and post-termination positions are agreed before acceptance, not resolved at renewal.',
    'Any personal or commercially sensitive content carries a documented protection position and a stated aggregation limit.'
  ],
  bestPractices: [
    'Write the intended use down first; almost every dispute in this category is a mismatch between an unexamined plan and a specific granted purpose.',
    'Ask what happens to the model or index when the data goes away, and get that answer in the agreement.',
    'Treat a supplier who cannot name its source as a provenance risk rather than a price opportunity.',
    'Keep a register of derived artefacts, because the question that arrives years later is what you built on this file.'
  ],
  mistakes: [
    'Assuming internal analysis rights extend to publishing an interface that exposes the values to customers.',
    'Accepting aggregated from public sources as provenance for content that carries a licence from someone else.',
    'Signing the exclusivity clause without checking whether the seller can still license the same records to a competitor.',
    'Deleting the file at termination and leaving the derived features, indexes and models untouched and unconsidered.'
  ],
  terms: [
    { term: 'Permitted purposes', def: 'The specific uses a licence grants, which are not interchangeable: analysis, publication, product exposure and model training are separate.' },
    { term: 'Chain of title', def: 'The documented line of rights from original collection to the seller, showing they can license what they sell.' },
    { term: 'Derived works', def: 'Outputs created from licensed data, whose conditions may inherit the licence and reach products you intended to own outright.' },
    { term: 'Re-identification', def: 'The recovery of individual records from apparently aggregated data, which is why aggregation level can be a licence term.' }
  ],

  thinkingPoints: [
    {
      quote: 'The interface that broke the licence.',
      explanation: 'A team licensed a market dataset for internal benchmarking. Six months later an internal dashboard exposed per-supplier values to business users outside the analytics team, and a customer asked for a report built from the same figures. Both were technically new purposes; the licence permitted neither, and the aggregation restriction existed because individual values were commercially sensitive to the sources who had provided them under confidence.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: purpose drift in this category happens through interface design rather than through a decision to misuse, which is why the use statement has to be written before the file arrives.',
      reflectionPrompt: 'Name every surface your licensed data reaches today - reports, dashboards, interfaces, models - and who signed off each one against the licence text.',
    },
    {
      quote: 'The provenance nobody could evidence.',
      explanation: 'A data supplier offered the cheapest market series in the category and delivered promptly. Two years on, when a third party claimed rights over part of the content, the supplier could not name the original collection source, produce a licence permitting onward sale, or identify which third-party material was inside. The buyer discovered that it had no indemnity worth relying on and no records proving it had asked.',
      realWorldExample: 'Illustrative example: the value of provenance evidence is not that it prevents a claim, it is that it shows you were entitled to rely and had checked - which is a different defence entirely.',
      reflectionPrompt: 'For the least-evidenced dataset you use, what file exists that would let you prove entitlement to a stranger in three years time?',
    }
  ],

  sopSteps: [
    { title: 'Write the intended use before the licence is read', role: 'Data Owner or Analytics Lead',
      desc: 'State in one paragraph what will be done with the data: internal analysis, inclusion in a product, exposure through an interface, training a model, external publication, and who the users will be. This becomes the checklist the licence is read against.',
      control: 'No dataset is accepted without a written intended-use statement, and every granted purpose is compared with it line by line.',
      record: 'Use statement with the purpose-to-licence comparison and the decision for each use.',
      pitfall: 'Reading the licence after the file has arrived and the project has committed, when the negotiation leverage is already gone.'
    },
    { title: 'Read the licence as separate axes', role: 'Legal or IP',
      desc: 'Score purposes, users, territory, term, modification, derivation, publication and exclusivity separately, and mark each against the use statement. A single red line item on a licence that otherwise looks generous is the usual shape of the problem.',
      control: 'The licence assessment records a position per axis with the clause reference, not an overall verdict.',
      record: 'Licence axis assessment with clause references and the gaps against the use statement.',
      pitfall: 'Summarising a licence as permissive and losing the specific restriction that happens to bind the intended product use.'
    },
    { title: 'Demand provenance evidence, not provenance language', role: 'Category Manager',
      desc: 'Ask what the seller holds and where it came from: original collection or a purchased copy, the licence or consent permitting onward sale, the dates covered, chain of title for third-party content, known limitations and whether any exclusive right has already been granted elsewhere.',
      control: 'A dataset is only accepted with a provenance file, and language such as aggregated from public sources with no supporting record is treated as an absent control.',
      record: 'Provenance file: origin, collection basis, onward-sale right, dates, third-party chain, limitations.',
      pitfall: 'Confident that the data looks plausible, which is not the same as being able to evidence entitlement after the relationship ends.'
    },
    { title: 'Settle the derived-artefact position before acceptance', role: 'Legal or IP',
      desc: 'Establish what happens to anything built from the data: features, indexes, embeddings, trained models, statistics and reports - during the term, at expiry, and after deletion. Where the regime is unsettled, agree a position rather than inheriting an interpretation.',
      control: 'The agreement states the position on derived artefacts and models at termination, including whether retraining or deletion obligations attach.',
      record: 'Derived-artefact register with the agreed position per artefact type and its termination treatment.',
      pitfall: 'Assuming that deleting the file at termination discharges the obligation, when the artefacts built from it remain in use.'
    },
    { title: 'Assess the personal and sensitive position', role: 'Data Protection',
      desc: 'Determine whether personal data is present, whether apparent anonymisation survives re-identification attempts, what lawful basis and minimisation apply, what retention limit holds, and whether the regime in force requires a documented assessment for this processing. Regimes differ, so local advice is part of the control rather than a fallback.',
      control: 'No dataset containing personal or commercially sensitive content is accepted without a recorded protection position and a stated aggregation limit.',
      record: 'Protection position with lawful basis, minimisation, retention, aggregation limit and the advice taken.',
      pitfall: 'Accepting anonymised as a supplier adjective rather than a tested position about what your join keys can reconstruct.'
    },
    { title: 'Test the indemnity against the supplier', role: 'Finance',
      desc: 'Read the warranty that the seller can license what it sells, then the indemnity scope for third-party, IP and privacy claims, the cap, the survival period and whether it binds an acquirer. A generous indemnity from a thin entity protects nothing.',
      control: 'The risk note records indemnity scope, cap and survival alongside the substance of the granting entity, and the position is escalated where they do not match.',
      record: 'Indemnity assessment with scope, cap, survival, entity substance and the mitigation agreed.',
      pitfall: 'Treating an indemnity clause as the control when the evidence file is what actually supports reliance.'
    },
    { title: 'Keep the records for the life of what you built', role: 'Category Manager',
      desc: 'Retain the licence, the provenance file, the axis assessment, the protection position and the derived-artefact register for the licence term plus the period during which artefacts built on the data remain in use, and name the owner of the file.',
      control: 'Records are retained against the artefact life rather than the contract life, with a named custodian and a review at each renewal.',
      record: 'Data licence file set with retention basis, custodian and the renewal review date.',
      pitfall: 'Archiving the licence with the purchase order and losing the only document that explains what the data was ever allowed to be used for.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A licence grants internal analysis and benchmarking for a one-year term. The team plans to embed the corpus for semantic search and to expose summary values through an internal dashboard used by the sales organisation.',
      q: 'How should each intended use be assessed?',
      options: [
        { text: 'Both are fine, since they stay inside the organisation.', isCorrect: false, rationale: 'Internal is not the granted concept; the grant is a purpose, and embedding and onward exposure to a user population are separate questions from analysis by the licensed team.' },
        { text: 'Embedding needs a right to reproduce and adapt; the dashboard needs a right to make available to those users and may breach an aggregation limit; neither follows from internal analysis.', isCorrect: true, rationale: 'Correct. Split the plan by granted purpose and check each: retention in an index, adaptation, and onward availability to a wider audience are three different permissions, and one is often priced differently from the others.' },
        { text: 'Neither is allowed, since embedding counts as distribution.', isCorrect: false, rationale: 'That over-corrects; many licences permit internal derivation, and the answer is to read the axes rather than to refuse everything.' },
        { text: 'Ask the account manager informally, since these things are usually tolerated.', isCorrect: false, rationale: 'A verbal tolerance is not a licence term, and it will not exist when the relationship or the people have changed.' }
      ],
      calcWork: 'No arithmetic here. The relevant figure is the commercial consequence: an ungranted use discovered later is typically settled as a new licence at a higher tier plus a retro period.',
      principle: 'Read a licence as granted purposes, and test each planned use against the specific permission rather than against the spirit of the deal.',
    },
    {
      type: 'scenario',
      context: 'A supplier describes a dataset as aggregated from public sources and cannot produce any origin record or third-party chain. The price is half the credible alternative.',
      q: 'What is the correct handling?',
      options: [
        { text: 'Buy it, since public sources are free to use.', isCorrect: false, rationale: 'Material being publicly visible is not the same as being licensed for onward commercial use, and the terms of the underlying sources are exactly what the supplier cannot show.' },
        { text: 'Buy it and rely on the supplier indemnity if a claim ever arrives.', isCorrect: false, rationale: 'The indemnity is worth the substance behind it, and a supplier who cannot evidence provenance usually cannot fund the claim the evidence would have prevented.' },
        { text: 'Treat the absent provenance as an unmitigated risk: request the origin record, and if it cannot be produced either decline or accept with a written risk decision, reduced use and no derived products.', isCorrect: true, rationale: 'Correct. Missing evidence is a control failure, not a discount. If the business still wants the data, that is a decision to be recorded by someone accountable, with the exposure limited by what is done with it.' },
        { text: 'Buy it for analysis and defer the provenance question to the annual review.', isCorrect: false, rationale: 'Deferral converts a procurement decision into a legacy one, and by then you will have built artefacts on the file.' }
      ],
      principle: 'Provenance evidence is what lets you prove entitlement later; when it is absent, the discount is compensation for a risk you are being asked to own.',
    },
    {
      type: 'scenario',
      context: 'A licence term ends in six months. The organisation has trained a model on the data and built a feature store from it, and the licence is silent on termination effects.',
      q: 'What should happen now?',
      options: [
        { text: 'Nothing; the artefacts were created lawfully during the term.', isCorrect: false, rationale: 'That may be the position, and it is the argument the supplier will make later when it wants to charge again. Silence is not safety.' },
        { text: 'Open the renewal conversation now, get the post-termination position on derived artefacts and models written into the renewal, and record a fallback if the supplier insists on deletion or retraining.', isCorrect: true, rationale: 'Correct. This is the only moment with leverage: before expiry, when a position can be agreed rather than conceded, and a fallback needs engineering time you no longer have afterwards.' },
        { text: 'Stop using the data now to be safe.', isCorrect: false, rationale: 'That is a drastic step taken on an unexamined interpretation, and it destroys value the licence may well have permitted you to keep.' },
        { text: 'Ask legal for an opinion and rely on it.', isCorrect: false, rationale: 'An opinion interprets silence; a contract term removes the question. You cannot negotiate with a court over an unset position and win cheaply.' }
      ],
      principle: 'Where the licence is silent on derived artefacts, resolve it in writing before expiry - afterwards the position costs far more.',
    },
    {
      type: 'scenario',
      context: 'A market dataset is provided as a daily feed. Last quarter several upstream values were corrected, and the buyer stored the original figures and built trend reporting on them.',
      q: 'What does this reveal about the agreement?',
      options: [
        { text: 'Nothing; corrections are the supplier problem and the file is now delivered.', isCorrect: false, rationale: 'A feed is a continuing service; whether corrected records replace what you stored, and who tells you, are terms that were apparently never discussed.' },
        { text: 'The agreement lacks correction, retro-fix and restatement terms, and the derived trend reporting inherited values that were never final.', isCorrect: true, rationale: 'Correct. With streams, correction windows, whether updates replace or supplement, and the treatment of derived statistics must be written, because the default outcome is a report nobody can stand behind.' },
        { text: 'The supplier should be required to notify by email each time a correction occurs.', isCorrect: false, rationale: 'A notification duty without a restatement rule leaves the buyer to decide what to do with the notice, which is the actual gap.' },
        { text: 'Buy a static dataset instead to avoid the issue.', isCorrect: false, rationale: 'That trades the correction problem for a staleness problem and does not fix the missing terms.' }
      ],
      principle: 'For a data stream, correction and restatement obligations are as commercial as price, and silence on them reaches every downstream report.',
    },
    {
      type: 'scenario',
      context: 'A dataset is described as anonymised. It contains transaction-level records with dates, location codes and product identifiers, and the analytics team intends to join it with internal customer data.',
      q: 'What is the correct next step?',
      options: [
        { text: 'Proceed, since the supplier stated it is anonymised.', isCorrect: false, rationale: 'Anonymised is a supplier adjective, and a join with data you already hold can re-identify individuals the supplier never intended to expose.' },
        { text: 'Assess re-identification risk from the join specifically, confirm the lawful basis and retention position for the combined processing, and take local advice where the regime in force requires it before the join runs.', isCorrect: true, rationale: 'Correct. The risk is created by your join rather than by the file alone, and the duties attach to the processing you are proposing - which is exactly the kind of assessment regimes expect to be documented.' },
        { text: 'Ask the supplier to remove dates and location codes.', isCorrect: false, rationale: 'Sometimes useful, but it is not an assessment; the combined processing still needs a basis and a retention position.' },
        { text: 'Run the join in a sandbox so nothing is published.', isCorrect: false, rationale: 'Publication is not the trigger; the processing itself is, and a sandbox does not change the analysis.' }
      ],
      principle: 'Anonymisation is a claim about a dataset in isolation; your own join can defeat it, and the duty attaches to the processing you propose.',
    }
  ],

  relSop: 'sop-supplier-due-diligence',
  rel: {
    concepts: ['dataset-provenance-and-rights', 'data-licence-scope', 'supplier-qualification', 'esg-data-quality', 'audit-trail', 'liability-indemnity', 'specification'],
    sops: ['sop-supplier-due-diligence', 'sop-requirement-definition', 'sop-contract-review'],
    checklists: ['cl-supplier-due-diligence', 'cl-contract-review', 'cl-requirement-definition'],
    templates: ['tpl-supplier-due-diligence', 'tpl-contract-review-checklist', 'tpl-rfp'],
    calcs: ['calc-compare-quotes', 'calc-multi-year-contract-cost'],
    decisions: ['dec-competitive-or-single', 'dec-re-source'],
    kpis: ['kpi-contract-compliance', 'kpi-cost-avoidance'],
    glossary: ['gloss-sow', 'gloss-single-source', 'gloss-kpi']
  },
  labMission: {
    title: 'Mission 23.2: Audit One Licence Against Your Own Use',
    desc: 'Take a dataset your organisation relies on and test whether what you do with it is what you were granted.',
    tasks: [
      'Write the intended-use paragraph for one dataset, then score the licence against it on each axis: purposes, users, territory, term, modification, derivation, publication, exclusivity.',
      'List every artefact built on the data - reports, features, indexes, models, dashboards - and record what the licence says happens to each at expiry.',
      'Request the provenance file from the supplier for that dataset. Record what they produced and what remains unevidenced.'
    ],
    ctaLabel: 'Open Compare Quotes',
    ctaHref: '#/calc/calc-compare-quotes',
    secondaryLabel: 'Open the Supplier Due Diligence Checklist',
    secondaryHref: '#/cl/cl-supplier-due-diligence'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-ai-supplier-assurance',
  title: 'Assuring a Supplier Whose Behaviour Is Probabilistic',
  module: 'Module 23: Artificial Intelligence, Model Services and Data Licensing',
  kicker: 'Function 23.3',
  tier: 'executive',
  tagline: 'You cannot write a specification for an answer that varies. What you can write is the evidence you require, the threshold that triggers action, and who is accountable when it moves.',
  desc: "This function covers governance rather than technology: what an executive should require of an AI or advanced-analytics supplier in assurance terms, how to contract for behaviour that is measured rather than specified, where human accountability has to remain, and how to report a portfolio of these services to a board without over-claiming control. It covers the assurance artefacts that carry information and those that do not, the failure modes that become governance findings, and the honest limits of what any buyer can know about a model it does not run.",
  duration: '28 mins',
  lifecycleStage: 'Stage 19: Supplier Performance & SRM',
  lifecycleDesc: 'The buying decision is small next to the ongoing obligation; this is a performance-management category, and most of its risk is created after signature.',

  what: "Conventional procurement assumes the supplier can be told what correct looks like and held to it. A model service is probabilistic: it produces different answers on different days to the same input, it degrades as the world drifts away from its training distribution, and the supplier can change its behaviour by updating a component. That does not make the category ungovernable; it moves the governance object from the specification to the evidence. An executive should be able to answer six questions about any material AI-dependent service in the portfolio, and the honest version of this lesson is that most organisations can answer two. First: what is the failure mode and who feels it? A wrong answer in a document pipeline costs review time. A wrong answer in a supplier risk score costs a decision. A wrong answer in a customer-facing response costs trust and possibly a regulated disclosure. The assurance requirement should be proportionate to that consequence, which is why a blanket policy demanding the same evidence from a translation utility and a credit-risk model produces paperwork without safety. Second: who is accountable for the decision the system informs? Accountability cannot be delegated to a vendor or to a model, and the cleanest governance test is whether a named person would sign the decision if the system were unavailable. If they would, they are accountable now, and the service must produce evidence sufficient for that person to keep signing. If they would not, the organisation has built a step no one owns. Third: what evidence does the supplier provide, and does it survive contact with reality? The artefacts in this market are of two kinds. Some carry information: an evaluation on the buyer own task with the results retained; a documented change log with the notice given before a behaviour change; a red-team or adversarial test report naming what was found and what was fixed; drift measurement against a stated baseline; an incident history with response times. Some carry the appearance of information: a responsible AI page, a membership of an industry body, a certification with no scope statement, a policy signed by a party who cannot influence it. The governance job is to insist on the first class and to record which of the second you accepted for what reason. Fourth: what are the data and confidentiality arrangements, in a category where the failure mode is silent. Prompts and outputs may carry commercial secrets; the question is whether they train anything shared, who else in the supply chain sees them, where they are logged, for how long, and what happens under a legitimate-access request. The reason this belongs to an executive rather than to IT is that the exposure is usually not a technical breach but an inadvertent disclosure through a tool nobody was told to be careful with because it felt like software. Fifth: what does the board get told? The temptation is to report coverage - how many systems have policy, how many suppliers signed a code - because those numbers are obtainable. They are not evidence of control. The reportable items are: which services are decision-grade, what the current accuracy and drift position is against the awarded baseline, which suppliers changed behaviour without notice and what was done, what assurance gaps exist and by when they close, and where the organisation has decided to accept exposure. An honest portfolio report contains a line saying what we cannot see, and that line is what makes the rest of it usable. Sixth: what happens when the supplier fails, is acquired, or exits the market? Beyond the exit mechanics covered in the previous lesson, the governance position needs a defined human fallback: can the process run at reduced quality with people in it, for how long, at what cost, and who declares the switch. A service that has no manual mode is not a technology risk but an operational concentration risk, and boards understand that language immediately. Two failure modes recur and both are governance findings rather than technical ones. The first is measurement drift nobody owns: quality falls gradually, users complain, and the only person measuring is the vendor, because the buyer evaluation set was run once at selection and then never again. The remedy is a scheduled re-evaluation with a named owner and a stated trigger for a commercial conversation. The second is policy theatre: a document exists, suppliers tick a form, and the organisation reports coverage while nothing about how decisions are made has changed. The remedy is to attach the policy to the evidence class above and to test it on a sample, because a governance control that has never failed a test is a statement rather than a control. Finally, the position an executive actually has to hold. There are real limits to what a buyer can know about a model it does not run: training data may be genuinely confidential, weights may be inaccessible, and independent evaluation takes work the supplier will not always do. Good governance is not the elimination of that opacity; it is knowing precisely where it sits, deciding whether the value justifies it, and putting that decision somewhere it can be read by a successor. An organisation that says we do not know how this one works inside, we measured it against our own task, here is the threshold at which we stop using it, and here is who owns that call, is governed. An organisation whose supplier can answer every question with a certification is being managed by its vendor.",
  why: [
    'A probabilistic service cannot be specified into compliance, so the governance object moves from the specification to the required evidence.',
    'Assurance artefacts divide into those that carry information and those that carry its appearance, and a policy that cannot tell them apart produces coverage rather than control.',
    'Accountability for an AI-informed decision must remain with a named person who would sign the same decision without the system.',
    'Data exposure in this category is usually an inadvertent disclosure through a tool that felt like software, which is a governance failure rather than a security one.',
    'A service with no manual fallback is an operational concentration risk, and that is a language a board can act on immediately.'
  ],
  when: [
    'When a model-informed output begins to carry a decision rather than only a draft.',
    'At approval of any AI-dependent service above a stated spend or consequence threshold, before procurement rather than after the pilot.',
    'When a supplier changes behaviour, pricing or ownership and the measured position is no longer the awarded one.',
    'At each board or audit-reporting cycle, when coverage numbers are being presented as control.',
    'Whenever nobody can say what the fallback is if the service became unavailable tomorrow.'
  ],

  raci: [
    { role: 'Executive Sponsor', resp: 'Owns the consequence classification, accepts the residual opacity in writing, and holds the accountability for decisions the service informs.' },
    { role: 'Head of Procurement', resp: 'Defines the required evidence class, ensures assurance terms are negotiable rather than decorative, and owns supplier change management.' },
    { role: 'Risk or Internal Audit', resp: 'Tests the control rather than the document, samples the evidence and reports where assurance cannot be evidenced.' },
    { role: 'Data Protection and Security', resp: 'Approves the data flow, logging and retention position, and reviews the confidentiality exposure created by everyday use.' },
    { role: 'Supplier Assurance Lead', resp: 'Supplies evaluations, change notices, drift measurement and incident reporting in the form the contract requires.' }
  ],
  inputs: [
    'A service register stating consequence class: draft support, decision support, or decision-grade.',
    'The awarded baseline for each material service: measured accuracy, variance, cost per correct answer and the evaluation set used.',
    'Supplier evidence: change notices, drift reports, adversarial test findings, incident history and the data-handling position.',
    'The named human fallback for each decision-grade service, with who declares the switch and on what threshold.'
  ],
  outputs: [
    'A portfolio assurance report showing drift against baseline, unnotified changes, open gaps with dates, and accepted exposure.',
    'A stated evidence class per consequence tier, with the appearance-only artefacts identified as such.',
    'An accountability record naming who owns each decision the systems inform and confirming they could sign without the tool.',
    'A fallback plan per decision-grade service with cost, quality loss and the trigger that invokes it.'
  ],
  controls: [
    'Assurance requirements are proportionate to consequence class, and the classification of each service is recorded.',
    'Scheduled re-evaluation with a named owner and a stated trigger for commercial action on every material service.',
    'Supplier behaviour changes require notice, and a change without notice is a contractual event rather than a surprise.',
    'Board reporting shows measured position and unknowns, and never presents coverage counts as control.'
  ],
  bestPractices: [
    'Ask who would sign this decision if the system were unavailable tomorrow; the answer tells you whether accountability exists.',
    'Distinguish evidence by class: an evaluation on your task is worth more than three memberships and a policy PDF.',
    'Put the opacity boundary in writing, since what an organisation admits it cannot see is the mark of actual control.',
    'Test one assurance control per period rather than auditing the existence of all of them.'
  ],
  mistakes: [
    'Reporting the number of suppliers who signed the AI code of conduct as the assurance position.',
    'Running the evaluation once at selection and never against the service actually received.',
    'Accepting a certification without a scope statement as the answer to a confidentiality question.',
    'Classifying every service identically, so the expensive controls land on trivial tools and the material one is under-governed.'
  ],
  terms: [
    { term: 'Consequence class', def: 'The classification of a service by what its failure costs: draft support, decision support, or decision-grade output.' },
    { term: 'Awarded baseline', def: 'The measured position - accuracy, variance, cost per correct answer - the service was bought on, against which drift is judged.' },
    { term: 'Policy theatre', def: 'Governance artefacts that are complete, signed and reported while changing nothing about how decisions are made.' },
    { term: 'Human fallback', def: 'The defined way to run the process without the service, with its cost, quality loss and the trigger that invokes it.' }
  ],

  thinkingPoints: [
    {
      quote: 'Coverage reported as control.',
      explanation: 'A governance report showed 94 percent of suppliers had accepted the responsible technology code. The audit sampled five material services and found none had provided an evaluation on the buyer task, two had changed defaults without notice, and for one no person could name the fallback. Coverage was real and control was almost absent.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a number that is easy to obtain tends to be reported in place of the number that is hard to establish, and the board learns nothing about exposure from the easier one.',
      reflectionPrompt: 'What did your last assurance report present as evidence, and would a stranger be able to tell from it where you cannot see?',
    },
    {
      quote: 'Nobody would sign it.',
      explanation: 'A supplier-risk score produced by a model informed renewal and exit decisions. Asked who would sign the same decision if the model were unavailable, the category manager explained that they could not - the process had no manual route and no one owned the judgement underneath the score. The system had been adopted as an accountability transfer rather than a tool.',
      realWorldExample: 'Illustrative example: when no person would sign the decision alone, the organisation has not automated work, it has dissolved ownership, which is the governance failure that appears in every post-event review.',
      reflectionPrompt: 'For one decision-grade output you rely on, name the person who owns the decision if the tool vanished tomorrow.',
    }
  ],

  sopSteps: [
    { title: 'Classify by consequence, not by spend', role: 'Executive Sponsor',
      desc: 'Record for each service whether its output supports a draft, supports a decision, or is effectively the decision. Assurance requirements, evidence class and re-evaluation frequency follow from that tier, and the classification is written with a reason.',
      control: 'Every AI-dependent service in the register carries a consequence class with a named approver, and the control set is tied to the class rather than to the price.',
      record: 'Service register with consequence class, approver, rationale and the control set applied.',
      pitfall: 'Treating a cheap service as a low-risk one, when the cheap model is the one silently feeding a decision-grade process.'
    },
    { title: 'Fix the awarded baseline and keep it', role: 'Head of Procurement',
      desc: 'Record the measured accuracy, variance and cost per correct answer from the evaluation the award was made on, together with the set used. Drift is only meaningful against that number, and an award without a retained baseline has no future remedy.',
      control: 'No material service is awarded without a retained baseline and evaluation set, referenced in the contract.',
      record: 'Baseline file per service with the evaluation set, results, variance and the contract reference.',
      pitfall: 'Relying on the supplier own current score, which can move in the same direction as the disagreement about it.'
    },
    { title: 'Require evidence that carries information', role: 'Head of Procurement',
      desc: 'Ask for evaluations on the buyer task, a change log with notice, adversarial test findings including what was fixed, drift measurement against baseline, and incident history with response times. Record separately which appearance-only artefacts were accepted and why.',
      control: 'The contract names the evidence items, their frequency and the consequence of non-delivery, and appearance-only artefacts are logged as accepted limitations.',
      record: 'Assurance evidence schedule with delivery dates, actuals and the note of any certification accepted without scope.',
      pitfall: 'Accepting a membership, a policy PDF or a badge without a scope statement as the answer to a question about behaviour.'
    },
    { title: 'Keep accountability with a named human', role: 'Executive Sponsor',
      desc: 'For each decision-grade output, name the person who owns the decision and test that they would sign it without the tool. Where they would not, either restore human ownership or escalate the fact that the process has no owner.',
      control: 'Every decision-grade service has a named accountable person, a stated ability to decide without the system, and a periodic confirmation of both.',
      record: 'Accountability register with the owner, the confirmation date and the outcome of the would-you-sign test.',
      pitfall: 'Allowing a model score to become the reason for a decision, which removes the person who could have challenged it.'
    },
    { title: 'Review the data and confidentiality exposure', role: 'Data Protection and Security',
      desc: 'Map what enters the service, including prompts and attached documents, whether anything trains a shared model, who in the supply chain sees it, where it is logged and for how long, and what a legitimate access request would reach. Treat everyday use, not just the integration, as in scope.',
      control: 'Each service has an approved data flow with retention and a review after any change, and the everyday-use exposure is addressed by guidance that is actually enforced.',
      record: 'Data flow approval with logging, retention, sub-processor position and the user guidance issued.',
      pitfall: 'Reviewing the system integration while staff paste live commercial documents into a tool that felt like software.'
    },
    { title: 'Define the manual fallback', role: 'Executive Sponsor',
      desc: 'State how the process runs without the service, what it costs, how much quality is lost, how long it can hold and who declares the switch. A decision-grade service without a fallback is an operational concentration risk and should be reported as one.',
      control: 'Each decision-grade service carries a documented fallback with cost, quality loss, duration limit and a named trigger owner.',
      record: 'Fallback plan per service with the trigger, the declared switch route and the last test date.',
      pitfall: 'Discovering during an outage that nobody is authorised to decide to proceed without the tool.'
    },
    { title: 'Report the measured position and the unknowns', role: 'Risk or Internal Audit',
      desc: 'Present drift against baseline, changes made without notice, open assurance gaps with closing dates, exposure consciously accepted, and a clear statement of what cannot be observed. Test one control by sampling rather than confirming every control exists.',
      control: 'Reporting includes measured position, unknowns and at least one sample-tested control; coverage counts are never presented as evidence of control.',
      record: 'Assurance report with drift figures, notice breaches, gap dates, accepted exposure and the sample test result.',
      pitfall: 'Proving governance by the volume of documents while leaving the only control that mattered untested.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A board asks for an assurance update on AI-dependent services. The draft reports: 31 services in the register, 100 percent with policy acknowledgement, 12 suppliers with ISO certification.',
      q: 'What should be changed before it goes out?',
      options: [
        { text: 'Nothing; the figures are accurate and complete.', isCorrect: false, rationale: 'They are accurate about paperwork and silent about control, which is precisely the report that hides risk from a board.' },
        { text: 'Add drift against the awarded baseline, supplier changes made without notice, open assurance gaps with dates, exposure accepted, and where visibility stops.', isCorrect: true, rationale: 'Correct. These are the items a board can act on; the coverage figures measure acknowledgement, not behaviour, and the stated unknowns are what make the rest of the report credible.' },
        { text: 'Add more certifications to show rigour.', isCorrect: false, rationale: 'Certifications without scope statements tell the board what a scheme covers, not how this service performs.' },
        { text: 'Reduce the register so there is less to report.', isCorrect: false, rationale: 'That is the opposite of assurance and would remove the material services from sight first.' }
      ],
      principle: 'Assurance reporting that cannot mention drift, breach of notice or the limits of visibility is a status document rather than a control report.',
    },
    {
      type: 'scenario',
      context: 'A supplier-risk model informs renewal and exit decisions. Asked who would sign the same decision without the model, the category manager says nobody could, since no one owns the underlying judgement.',
      q: 'What kind of finding is this?',
      options: [
        { text: 'A technology finding, to be fixed by improving model accuracy.', isCorrect: false, rationale: 'Accuracy is not the defect; the defect is that a decision has no owner.' },
        { text: 'A governance finding: accountability was transferred rather than retained, and it must be resolved by naming an owner who can decide without the tool before continued reliance.', isCorrect: true, rationale: 'Correct. The test of a decision-grade system is whether a named person would sign without it; where they would not, the organisation has dissolved ownership, which is what post-event reviews keep finding.' },
        { text: 'A procurement finding, resolved by renegotiating the contract.', isCorrect: false, rationale: 'The contract is not the missing piece and renegotiation does not create an owner.' },
        { text: 'Acceptable, since the model is more consistent than a human.', isCorrect: false, rationale: 'Consistency is not accountability, and an organisation that cannot explain a decision cannot defend one.' }
      ],
      principle: 'If no named person would sign the decision without the system, the system has not automated work - it has removed an owner.',
    },
    {
      type: 'scenario',
      context: 'A material service shows a 9 point accuracy fall against the awarded baseline. The supplier says current figures are 86 percent and the difference is a methodology issue.',
      q: 'What does the governance position need?',
      options: [
        { text: 'Accept the supplier figure, since they operate the service.', isCorrect: false, rationale: 'That makes the counterparty the arbiter of a disagreement about the thing you bought, which is the arrangement the baseline exists to avoid.' },
        { text: 'Run the retained buyer evaluation set, compare against the baseline held in the contract, and invoke the stated threshold action if the gap is confirmed.', isCorrect: true, rationale: 'Correct. The baseline and evaluation set were retained precisely so this disagreement could be settled with evidence rather than with an argument about methodology.' },
        { text: 'Commission a new third-party benchmark from a public leaderboard.', isCorrect: false, rationale: 'A public test measures conditions you do not operate and will not resolve the drift question on your task.' },
        { text: 'Escalate the discrepancy to the account team as a relationship issue.', isCorrect: false, rationale: 'It is a contractual measurement question, and framing it as a relationship issue forfeits the remedy.' }
      ],
      calcWork: 'The comparison that matters is the buyer set result against the awarded baseline: 9 points on a retained task is a stated threshold breach, while the supplier 86 percent on their task is not the same measurement.',
      principle: 'Keep the evaluation set and the baseline, because they are what turn a dispute about quality into a settled finding.',
    },
    {
      type: 'scenario',
      context: 'A policy requires every technology supplier to complete an AI assurance pack. A translation utility used by two teams received the same 40-question pack as the supplier-risk model.',
      q: 'What is the practical consequence?',
      options: [
        { text: 'Better governance, since the standard is applied consistently.', isCorrect: false, rationale: 'Consistency applied without proportion produces paperwork and pushes the material service into the same queue as the trivial one.' },
        { text: 'Effort is spent proving that low-consequence services comply, while the decision-grade service needs evidence the pack does not ask for - and both look equally assured in the report.', isCorrect: true, rationale: 'Correct. Assurance has to be proportionate to consequence, otherwise coverage is uniform and risk is not, which is the failure the classification control exists to prevent.' },
        { text: 'Nothing, since the pack covers everything relevant.', isCorrect: false, rationale: 'That is the assumption the finding is about, and a generic pack rarely includes an evaluation on your task.' },
        { text: 'Reduce the pack length so both services are easier to process.', isCorrect: false, rationale: 'That lowers the cost of the wrong design rather than fixing the tiering.' }
      ],
      principle: 'Uniform assurance effort across consequence classes buys coverage and leaves the material service under-tested.',
    },
    {
      type: 'scenario',
      context: 'A supplier of a decision-grade service is acquired and the buyer receives no notice of a change to data handling; the new entity says terms are unchanged.',
      q: 'What has failed?',
      options: [
        { text: 'Nothing; acquisition does not change contractual terms.', isCorrect: false, rationale: 'Terms may survive while practice, sub-processors and retention do not, and the assurance question is about behaviour rather than wording.' },
        { text: 'The control that required change notice for data flow, sub-processors and behaviour, and its absence should be recorded as a gap with a remediation date rather than argued as a technicality.', isCorrect: true, rationale: 'Correct. A change-of-control and change-notice duty is what converts an ownership event into an evidence question; without it the buyer learns of change by inference.' },
        { text: 'The supplier relationship, requiring a competitive retender immediately.', isCorrect: false, rationale: 'Retendering may follow from the evidence, but it is not the failure and it is not the immediate remedy.' },
        { text: 'Security testing, which should have blocked the change.', isCorrect: false, rationale: 'Buyer security testing cannot see a supplier internal change it was never told about, which is the point.' }
      ],
      principle: 'Contract the notice, not only the standard: ownership and behaviour changes are assurance events with a duty attached.',
    }
  ],

  relSop: 'sop-supplier-performance-management',
  rel: {
    concepts: ['ai-supplier-assurance', 'supplier-performance', 'supply-chain-risk', 'audit-trail', 'segregation-of-duties', 'ai-evaluation-and-benchmarks', 'vendor-lockin-and-portability'],
    sops: ['sop-supplier-performance-management', 'sop-procurement-audit', 'sop-supplier-corrective-action'],
    checklists: ['cl-supplier-performance-review', 'cl-procurement-audit', 'cl-supplier-risk-review'],
    templates: ['tpl-supplier-business-review', 'tpl-supplier-scorecard', 'tpl-exception-request'],
    calcs: ['calc-supplier-scorecard', 'calc-kpi-calculator'],
    decisions: ['dec-supplier-financial-risk', 'dec-re-source'],
    kpis: ['kpi-contract-compliance', 'kpi-supplier-performance'],
    glossary: ['gloss-sla', 'gloss-segregation-of-duties', 'gloss-kpi']
  },
  labMission: {
    title: 'Mission 23.3: Test One Assurance Control Rather Than Confirm All of Them',
    desc: 'Take the AI or advanced-analytics services you rely on, classify them, and find out what you can actually evidence.',
    tasks: [
      'List the AI-dependent services you rely on and assign a consequence class with a reason. Then check whether the control set applied matches the class rather than the cost.',
      'For the most decision-grade service, name the person who would sign the decision without the tool, and ask them whether that is true today.',
      'Sample one assurance requirement: what evidence did the supplier provide, does it include an evaluation on your own task, and when was behaviour last measured against the awarded baseline?'
    ],
    ctaLabel: 'Open the Supplier Scorecard',
    ctaHref: '#/calc/calc-supplier-scorecard',
    secondaryLabel: 'Open the Supplier Performance Review Checklist',
    secondaryHref: '#/cl/cl-supplier-performance-review'
  }
});
