/* ==========================================================
   Procure Sherpa v3.0 - Academy Module 21: Sustainable and
   Responsible Sourcing - Carbon, Circularity and Social Value.
   Module 10 treats sustainability as one subject inside a
   governance module and one lesson carries it. A reader going
   into category work now meets carbon measurement bases,
   circular economics and due diligence law, and nothing here
   taught the difference between a figure and a claim. Written
   with no apostrophes, since these strings are single quoted
   and the build reads them literally.
   ========================================================== */

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-scope3-buying-baseline',
  title: 'Carbon in the Buying Decision: Scope 3, Data Bases and Where Reduction Actually Happens',
  module: 'Module 21: Sustainable and Responsible Sourcing - Carbon, Circularity and Social Value',
  kicker: 'Function 21.1',
  tier: 'practitioner',
  tagline: 'For most organisations the largest emissions number is not in their building. It is in what they buy, and the buyer is the only person who can move it.',
  desc: 'This function covers where emissions sit in a purchasing portfolio, the three ways a figure can be produced and what each one can and cannot support, the difference between a measured number and a proxy, and the sourcing levers that actually reduce the total. It also covers how to write a carbon requirement into a contract so that the data keeps arriving and the reduction can be proven, and how to avoid the two failures most common in this area: reporting a price movement as a carbon saving, and paying a premium for a claim nobody verified.',
  duration: '26 mins',
  lifecycleStage: 'Stage 3: Category Sourcing Strategy',
  lifecycleDesc: 'Set at strategy and specification, because the measurement basis decides which options look good, and that decision happens before any bid is priced.',

  what: "Greenhouse gas accounting divides emissions into three scopes, and the division is not a matter of size but of control. Scope 1 is what the organisation burns or leaks itself: fuel in its own vehicles, refrigerant, process emissions. Scope 2 is the electricity, heat and cooling it buys. Scope 3 is everything else in the value chain, fifteen categories, and for a buyer the important one is Category 1, purchased goods and services. In most manufacturing, retail and construction organisations the largest single emissions number in the whole report sits there, produced by factories the buyer selects and specifications the buyer writes, and reported by a sustainability team that has no direct authority over either. That is why the measurement basis matters commercially rather than technically. There are three ways to produce a number for purchased goods. The first is spend-based: multiply money spent by an emission factor for the sector, taken from an average dataset. It is available immediately for the whole portfolio, requires no supplier cooperation, and is a proxy in every cell. Its dangerous property is that it moves when prices move: a hard negotiation that cuts the price of a tonne of material cuts the calculated carbon as well, and an organisation can report a reduction while buying exactly the same physical quantity. The second is average or supplier-specific activity data: a per-unit factor from a published industry dataset, applied to real volumes. It responds to volume rather than to price, and it is still an average that hides the difference between a modern plant and an old one. The third is supplier-specific physical data: the actual footprint of the actual product made at the actual site, usually expressed as a product carbon footprint with a stated system boundary and, for construction, an environmental product declaration to a named standard. It is expensive to collect and only worth it for the categories where the money and the carbon both sit. The practical method is a hybrid: screen everything by spend to find the small number of categories that carry most of the total, then move those to volume data and, for the largest contracts, demand site-level figures. What a buyer must then hold on to is the hierarchy of data quality. A figure needs four attributes before it can support a decision: the boundary (which site, which product, which upstream layers included), the year, the method (measured, estimated or proxy) and whether a third party attested it. A group average presented for a plant is a boundary error, not a lie, and boundary errors are the most common reason a corporate number cannot be defended later. Reduction levers sort into a short list, and only some of them are the ones people reach for first. Specification and substitution - less material, a different grade, a lower-carbon cement or aluminium where performance allows - move the largest share, because the footprint of a product is mostly decided when its recipe is fixed. Quantity and consolidation reduce the number of producers and let the buyer reach the better plants rather than the nearest. Freight mode is significant but belongs more to logistics than to sourcing unless the trade lane changes. Energy and process efficiency at the supplier is real and slow, and it is where a buyer can genuinely help by sharing the diagnosis. End-of-life and recyclability close the loop and belong to the circular lesson. What buyers must refuse: offsets sold as reductions. An offset credit is a claim about carbon avoided or removed somewhere else, and its quality depends on additionality, permanence, vintage and double counting; a reduction of the buyer own footprint and a purchase of a credit are different transactions and must never be reported as one. Offsets have a legitimate place - residual emissions that no current technology can eliminate - and it is a treasury conversation rather than a sourcing one. The contract is where all of this either becomes real or becomes decoration. A workable clause asks for a figure with boundary, year and method on a schedule; asks for the trajectory, not only the level; ties improvement to a review rather than to a bonus the buyer pays for; and makes the data a deliverable, because if the figure cannot be produced again in two years it was never a management number. One last honest note: carbon data has a lag, so a supplier that improves its plant today will not appear in the baseline for a reporting year. Managing on the level alone rewards whoever measured first, and a buyer who wants actual reduction has to look at the trend and the investment plan behind it.",
  why: [
    'For a buying organisation the largest emissions figure is usually in purchased goods, and the buyer is the only role that selects those goods.',
    'A spend-based figure moves with price, so a negotiated saving can be reported as a carbon reduction while nothing physical changed.',
    'A number without a boundary, a year and a method cannot support an award, a premium payment or an external report.',
    'Most of the footprint of a product is fixed by the specification, which means the reduction is decided before the supplier is chosen.',
    'Offsets and reductions are different transactions, and reporting one as the other is the failure that turns a disclosure into a correction.'
  ],
  when: [
    'Building or refreshing a category strategy where the organisation has a climate target and no line of sight to the buying decisions behind it.',
    'At specification review, when a material or grade choice is open and its carbon difference is quantifiable.',
    'When a bid claims a lower-carbon product and the premium being paid depends on that claim.',
    'At renewal, when a supplier has been asked for data and the quality of what arrived has never been tested.',
    'Before signing anything that will be quoted in an external report, because the buyer owns the evidence behind the figure.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Owns the footprint of the category, sets the data requirement and decides which figure can support an award.' },
    { role: 'Sustainability Lead', resp: 'Defines the measurement basis, the accepted standards and the boundary rules the whole portfolio must follow.' },
    { role: 'Requirement Owner', resp: 'Fixes the performance requirement, since substitution only saves carbon if the function is unchanged.' },
    { role: 'Supplier Account Manager', resp: 'Supplies site-level figures, the improvement trajectory and the investment plan behind it.' },
    { role: 'Finance Controller', resp: 'Treats carbon data as a contract deliverable and refuses payment where the deliverable is absent.' }
  ],
  inputs: [
    'Spend by category and supplier, with physical volumes where they exist.',
    'Sector emission factors for the screen, and product-level datasets for the categories worth the effort.',
    'Supplier figures with boundary, year, method and assurance level stated.',
    'Specification sheet with the performance requirement that any substitution must still meet.'
  ],
  outputs: [
    'A category baseline with the method of every figure visible, not only the number.',
    'A hotspot list showing which few categories carry most of the footprint and what would move each one.',
    'A data clause for the contract: figure, boundary, year, method, schedule and trajectory.',
    'An evaluation record that shows what a low-carbon option was credited with and what it cost.'
  ],
  controls: [
    'No spend-based figure is presented as measured, and no proxy is used to justify a premium payment.',
    'Every accepted figure carries boundary, year and method, and a figure missing one of the three is recorded as unverified.',
    'Substitution requires a performance sign-off from the requirement owner before a carbon benefit is counted.',
    'Reductions and offsets are reported separately and never netted in the same sentence.'
  ],
  bestPractices: [
    'Screen with proxies, decide with physical data: use the cheap number to find where the expensive number is worth collecting.',
    'Compare plants rather than companies, since a corporate average is a mix of good and bad sites and an award goes to one of them.',
    'Ask for the trend and the investment behind it, because a level tells you who measured first and a trajectory tells you who is improving.',
    'Write the data as a deliverable with a date, because a figure that cannot be reproduced next year was never a management input.'
  ],
  mistakes: [
    'Reporting a negotiated price cut as an emissions reduction because the model multiplies spend by a factor.',
    'Paying a green premium for a claim whose boundary covers a different site or a different product line.',
    'Collecting supplier data nobody uses because the category decision was already made on price.',
    'Setting a supplier target without asking whether the supplier controls the energy mix behind it.'
  ],
  terms: [
    { term: 'Scope 3', def: 'Emissions from the value chain rather than from own operations or purchased energy, with purchased goods and services as the largest category for most buyers.' },
    { term: 'Spend-based factor', def: 'An emission factor per unit of currency for a sector, used as a proxy when physical data is absent.' },
    { term: 'Product carbon footprint', def: 'A figure for one product at one boundary, ideally with the production site named and the method stated.' },
    { term: 'Additionality', def: 'The test that a carbon credit funds an activity that would not have happened anyway, and the reason credit quality varies so widely.' }
  ],

  thinkingPoints: [
    {
      quote: 'The saving that was only a discount.',
      explanation: 'A category reported a 9 percent carbon reduction over two years. The model was spend-based. The volume purchased had risen slightly, the price had fallen 11 percent in a soft market, and the reduction existed entirely in the multiplication. The organisation had improved its negotiating and reported it as an environmental achievement until an internal reviewer compared the two datasets.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a proxy responds to whatever the model multiplies, so a price movement is invisible as a price movement and appears as carbon.',
      reflectionPrompt: 'In the last carbon figure you quoted, do you know whether it was measured, estimated or derived from spend, and would the answer change the decision it supported?',
    },
    {
      quote: 'Two suppliers, one average, different plants.',
      explanation: 'A buyer narrowed two chemical suppliers on published corporate intensity figures and the gap was 4 percent. Site-level data was requested for the two plants actually serving the account and the gap was 31 percent, in favour of the supplier that had looked worse. The corporate figure had averaged an old plant against a new one in both directions.',
      realWorldExample: 'Illustrative example: a corporate average is a blend, and an award goes to a specific site rather than to a portfolio of sites.',
      reflectionPrompt: 'Where a supplier scorecard uses a group-level figure, what would you need before that figure could decide an award?',
    }
  ],

  sopSteps: [
    { title: 'Screen the portfolio by spend to find the hotspots', role: 'Category Manager',
      desc: 'Apply sector factors to the whole spend base and rank it. In most organisations two thirds of the footprint sits in a small number of categories, and everything after this step is about those. Do not present the screen as a measurement, because it is a map of where measurement is worth buying.',
      control: 'The screen is labelled as spend-based, and no decision that pays a premium is taken on a screened figure.',
      record: 'Hotspot ranking with the share of total each category carries and the method named.',
      pitfall: 'Stopping at the screen, and then reporting a proxy as progress because the number arrived quickly and looked authoritative.'
    },
    { title: 'Move the top categories to volume and physical data', role: 'Sustainability Lead',
      desc: 'Convert the significant categories from money to quantity, then ask the largest suppliers for product-level figures with the site named. Set a rule in advance about what counts as usable: boundary, year, method and whether anyone attested it.',
      control: 'A figure enters the baseline only with boundary, year and method, and the acceptance rule is written before the requests go out.',
      record: 'Baseline table showing method per row and the categories still on proxy data.',
      pitfall: 'Accepting a group certificate when the award concerns one plant, which is the single most common boundary error in this work.'
    },
    { title: 'Set the specification question before the sourcing question', role: 'Requirement Owner',
      desc: 'Ask what the product must do, then test whether a lower-carbon option meets that function. Substitution decided in procurement without an engineering sign-off either fails in service or gets reversed quietly by the user.',
      control: 'Any substitution carries a written performance acceptance from the requirement owner before a carbon benefit is counted.',
      record: 'Specification review showing options considered, the acceptance and the resulting figure.',
      pitfall: 'Mandating a material instead of an outcome, which freezes the answer at today best option and blocks a better one next year.'
    },
    { title: 'Price the low-carbon option honestly', role: 'Category Manager',
      desc: 'Where a lower-carbon option costs more, express the premium as cost per tonne of emissions avoided, and put it next to the internal carbon price or the disclosure obligation that justifies paying it. If neither exists, record that the decision was made on cost.',
      control: 'Any premium paid is expressed as cost per tonne avoided and signed against a stated policy or obligation.',
      record: 'Award note with the premium, the tonnes difference and the authority that accepted it.',
      pitfall: 'Paying a premium for a claim that was never verified, which converts an unverified marketing statement into a real cost.'
    },
    { title: 'Write data and trajectory into the contract', role: 'Finance Controller',
      desc: 'Make the figure a deliverable with a date and a format, ask for an annual trajectory rather than only a current level, and attach a review consequence to non-delivery. A contract that pays for goods and never asks for data will not produce data.',
      control: 'The schedule names the boundary, the method and the reporting date, and a missed return affects the scorecard rather than passing unnoticed.',
      record: 'Contract clause with the deliverable, the date and the consequence.',
      pitfall: 'Rewarding a level with a bonus while paying nothing for improvement, which pays whoever measured first and blocks everyone else.'
    },
    { title: 'Keep reductions and offsets in separate columns', role: 'Sustainability Lead',
      desc: 'Report what fell in the value chain separately from what was purchased as credits, and state the quality basis of any credit. A residual that genuinely cannot be eliminated is a legitimate case, and it is decided by policy rather than by a sourcing saving.',
      control: 'No netted figure is published without the two components visible, and credit purchases carry their vintage and standard.',
      record: 'Reporting note showing reduction, credit purchase and residual as three lines.',
      pitfall: 'Netting a credit purchase against a supplier emission, which is the fastest route to a restated disclosure.'
    },
    { title: 'Re-test the data rather than trusting the file', role: 'Category Manager',
      desc: 'Each year pick a sample of accepted figures and ask the supplier to reproduce them from the underlying records. Where the figure cannot be reproduced, treat the whole submission as unverified rather than adjusting one row.',
      control: 'A sample is reproduced annually, and a failure downgrades the supplier data status for the year rather than passing on the earlier file.',
      record: 'Reproduction test log with the sample, the outcome and the status change.',
      pitfall: 'Reading an absence of complaints as evidence that the data is good, since nobody challenges a number they cannot check.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A category shows a 12 percent emissions fall over two years. The baseline was built by multiplying spend by a sector factor. Physical volume rose 3 percent and unit price fell 14 percent.',
      q: 'What does the fall actually represent?',
      options: [
        { text: 'A real reduction of 12 percent, since the model is the agreed basis.', isCorrect: false, rationale: 'The model is the agreed basis for estimating, not for measuring. It fell because the multiplicand fell, and volume rose.' },
        { text: 'Nothing physical: a spend-based figure moves with price, so this is a market movement reported as carbon.', isCorrect: true, rationale: 'Correct. Volume increased, so the physical footprint almost certainly increased too. This is why a proxy may screen but must never be reported as an achieved reduction.' },
        { text: 'A reduction that needs the supplier to confirm it.', isCorrect: false, rationale: 'No supplier confirmation can turn a price movement into a physical change. The method is the problem, not the evidence.' },
        { text: 'A reduction, because the money spent is lower and the budget was saved.', isCorrect: false, rationale: 'Financial saving and emissions reduction are different quantities that a spend-based model conflates by construction.' }
      ],
      calcWork: 'Volume rose 3 percent while price fell 14 percent, so spend fell roughly 11 percent and the proxy fell with it. The physical footprint moved in the opposite direction to the reported figure.',
      principle: 'Know which of the three data bases produced a number, because only two of them respond to physical reality.',
    },
    {
      type: 'scenario',
      context: 'A supplier offers a lower-carbon grade at a 6 percent premium and sends a group-level certificate covering all its plants. The buyer buys from one plant, in another country, and has never asked which site serves the account.',
      q: 'What is the correct next step before award?',
      options: [
        { text: 'Award on the certificate, since it was issued by a recognised body.', isCorrect: false, rationale: 'The certificate is genuine and it answers a different question. Certification scope is the most common boundary error in this decision.' },
        { text: 'Reject the claim, since a group certificate proves nothing.', isCorrect: false, rationale: 'That over-corrects. The claim may well be true for the site that matters; it has simply not been shown for that site.' },
        { text: 'Ask which plant serves the account and request the product figure for that plant with boundary, method and year.', isCorrect: true, rationale: 'Correct. An award goes to a site, so the figure must describe that site. The three attributes decide whether the premium buys a real difference.' },
        { text: 'Split the premium across the portfolio so the group average applies to everyone.', isCorrect: false, rationale: 'That converts an unverified claim into a paid-for one and hides the boundary problem inside a pricing decision.' }
      ],
      principle: 'Ask what a certificate covers before what it says: site, product, year and method decide whether a claim can support a payment.',
    },
    {
      type: 'scenario',
      context: 'An engineering standard allows two material options. Option B has a 20 percent lower product footprint but has not been used in this application. The requirement owner is on leave and the tender closes Friday.',
      q: 'How should the buyer proceed?',
      options: [
        { text: 'Specify option B in the tender, since the carbon difference is large and the deadline is real.', isCorrect: false, rationale: 'A substitution nobody in authority has accepted transfers the risk to the operating line and is usually reversed quietly, taking the carbon benefit with it.' },
        { text: 'Take the decision as cost only and record the carbon difference as unassessed pending the engineering sign-off.', isCorrect: true, rationale: 'Correct. This keeps both facts visible: the award proceeds on the basis that can be defended, and the quantified difference is preserved for the next cycle when the sign-off exists.' },
        { text: 'Cancel the tender and wait for the engineer.', isCorrect: false, rationale: 'Deadline failure is a real cost, and the carbon case here is not strong enough to justify inventing one.' },
        { text: 'Ask both bidders to quote both options and let the evaluator decide.', isCorrect: false, rationale: 'That pushes an engineering judgement onto commercial evaluators, which is how a decision loses its owner.' }
      ],
      principle: 'A carbon benefit counts only when someone accountable accepts the performance consequence, and that acceptance must exist before the saving is claimed.',
    },
    {
      type: 'scenario',
      context: 'A supplier proposes a programme: new roofing solar at its plant, and the buyer funds it through a small price premium, then reports the whole reduction as its own.',
      q: 'What is the correct treatment?',
      options: [
        { text: 'Report it as a Scope 3 reduction, since the purchase pays for it.', isCorrect: false, rationale: 'The money and the emissions are linked, but claiming a supplier investment as a buyer reduction without a defined contractual mechanism is double counting of exactly the kind disclosure regimes look for.' },
        { text: 'Refuse, since supplier decarbonisation is not the buyer concern.', isCorrect: false, rationale: 'It is very much the buyer concern: purchased goods carry the emissions of the process that made them, and investment here is often the cheapest tonne available.' },
        { text: 'Proceed only with a written mechanism defining who owns the attribute, how the reduction is allocated and how it will be reported by each party.', isCorrect: true, rationale: 'Correct. This is the honest version of a joint investment: the attribute and the accounting treatment are settled before the money moves, which is what prevents two parties claiming the same tonne.' },
        { text: 'Proceed and net the premium against the reported reduction so the numbers reconcile.', isCorrect: false, rationale: 'Netting a financial term against a physical quantity is the error pattern the previous question just covered, and it produces a figure nobody can reproduce.' }
      ],
      principle: 'Where investment is shared, the ownership of the environmental attribute and the reporting allocation are contractual terms, decided before any claim is made.',
    },
    {
      type: 'scenario',
      context: 'A sustainability dashboard compares eight suppliers on published intensity scores. Three have no figure at all, and the report shows them in the middle of the range.',
      q: 'What is wrong with that presentation?',
      options: [
        { text: 'Nothing, since a mid-range position is a fair neutral assumption.', isCorrect: false, rationale: 'A neutral assumption is not a neutral presentation: the reader will treat a placed supplier as measured, and the missing three could be the best or the worst in the set.' },
        { text: 'The absence of data is being displayed as data, and it should appear as unknown with a stated staleness rule instead.', isCorrect: true, rationale: 'Correct. Unknown must look different from middling, and a score needs a date, because an unrefreshed figure silently presents last year position as current.' },
        { text: 'The comparison should include more suppliers.', isCorrect: false, rationale: 'Population size does not fix a missing-value treatment, and a larger table with the same defect simply hides it better.' },
        { text: 'The published scores should be replaced by supplier self-declarations.', isCorrect: false, rationale: 'That trades a coverage problem for a verification problem, and self-declaration without method is a claim rather than a figure.' }
      ],
      principle: 'In a comparison, an unknown must be visibly an unknown, and every figure needs a date before it can be called current.',
    }
  ],

  relSop: 'sop-sustainable-sourcing-verification',
  rel: {
    concepts: ['scope3-supplier-emissions', 'esg-data-quality', 'environmental-claim-verification', 'total-cost-of-ownership', 'spend-analysis', 'should-cost', 'supplier-performance'],
    sops: ['sop-sustainable-sourcing-verification', 'sop-supplier-performance-management', 'sop-sourcing-strategy'],
    checklists: ['cl-supplier-due-diligence', 'cl-supplier-performance-review', 'cl-commercial-evaluation'],
    templates: ['tpl-supplier-scorecard', 'tpl-commercial-evaluation', 'tpl-business-case'],
    calcs: ['calc-multi-year-contract-cost', 'calc-tco'],
    decisions: ['dec-unit-or-tco', 'dec-rfq-or-rfp'],
    kpis: ['kpi-supplier-performance', 'kpi-contract-compliance'],
    glossary: ['gloss-tco', 'gloss-kpi', 'gloss-sla']
  },
  labMission: {
    title: 'Mission 21.1: Find Your Category Hotspot',
    desc: 'Take one category, work out where its footprint really sits, and write the data clause you would put in the next contract.',
    tasks: [
      'Split your last twelve months of spend in one category into supplier groups and estimate the share of the total footprint each group carries. Name the method you used and what it cannot tell you.',
      'Pick the largest supplier in that category and request one product figure with boundary, year and method. Record what came back and whether it would survive the four questions in this lesson.',
      'Draft a data clause: the deliverable, the format, the date, the trajectory and what happens when the return is missing.'
    ],
    ctaLabel: 'Open Multi-Year Contract Cost',
    ctaHref: '#/calc/calc-multi-year-contract-cost',
    secondaryLabel: 'Open the Supplier Due Diligence Checklist',
    secondaryHref: '#/cl/cl-supplier-due-diligence'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-circular-sourcing-economics',
  title: 'Circular Sourcing: Reuse, Remanufacture and the Economics of a Second Life',
  module: 'Module 21: Sustainable and Responsible Sourcing - Carbon, Circularity and Social Value',
  kicker: 'Function 21.2',
  tier: 'practitioner',
  tagline: 'Circularity is not a material, it is a contract. Whoever holds the asset at the end of the cycle carries the cost, and that is a purchasing decision.',
  desc: 'This function covers the levers that keep material in use - reuse, refurbishment, remanufacture, refill and returnable systems, leasing with recovery, design for disassembly and waste as an input - and how each one changes the cost model rather than only the carbon model. It covers the difference between used, refurbished and remanufactured, the evidence a buyer needs before booking a saving, the residual value and lock-in risks that circular contracts create, and the calculation that decides whether a returnable system beats a single-use one.',
  duration: '24 mins',
  lifecycleStage: 'Stage 4: Requirement Definition & Intake',
  lifecycleDesc: 'Decided at requirement definition, because a specification written as a purchase cannot be reversed into a service later without a renegotiation.',

  what: "A linear buy costs money once and disposal costs money again, and the second figure usually arrives in a budget the buyer does not own. A circular arrangement keeps the material in use longer or returns it to the producer, and every version of that idea moves cost and risk between parties. That movement is the subject matter, not the environmental intent. Start with the vocabulary, because these three words are priced differently. A used item is sold as it stands, with no restoration and usually no warranty. A refurbished item is cleaned, repaired to specification and tested, with a limited warranty. A remanufactured item is disassembled to a core, worn parts replaced and the assembly restored to original performance, with a warranty that should match new; where it does not, the price gap reflects a real risk transfer to the buyer and must be shown as such. Confusing these three in a specification is how a category ends up buying failures. The levers worth knowing. Returnable packaging replaces consumable packaging with a pool of durable containers that circulate: the economics turn on trips per unit, cleaning cost, loss rate, and the transport of empties, and a pool that leaks 15 percent a year can be worse than the cardboard it replaced. Refill systems keep the container with the user and replenish the content, which shifts the design question to the dispenser. Lease and power-by-the-hour move the asset to the supplier balance sheet and price the service, which is excellent where utilisation is uncertain and expensive where the buyer would have kept the asset longer than the contract. Product-as-service in general works when the producer can recover value at end of use, and it fails where the recovery cost exceeds the material value, which is why it succeeds with mobile phones and struggles with composites. Design for disassembly is a specification lever: fasteners rather than adhesive, declared material composition, and parts that a third party could recover, because a design only the original producer can service is a lock-in dressed as a partnership. Waste as an input, where one process output becomes another feedstock, is the most commercially fragile of all: it depends on continuity, on contamination tolerance and on someone owning the storage of a material nobody planned for. The cost model has to be whole-cycle, and this is where most circular business cases are quietly dishonest. A single-use price comparison ignores disposal, contamination handling and raw material exposure. A correct comparison carries purchase or rental, maintenance, consumables, cleaning, transport of returns, loss or shrinkage, storage, residual value at contract end and disposal of what cannot be recovered. Two figures deserve particular attention: residual value, which is a forecast and the place where a lease looks cheaper than it is, and the loss rate of a returnable pool, which is a small number multiplied by a large fleet. On risk. Extended producer responsibility regimes push end-of-life cost onto whoever places an item on the market, and they vary by jurisdiction, so a buyer assuming the supplier carries that duty needs the contract to say so and needs to know which regime applies. Reverse logistics is a real physical flow with carbon and cost of its own, and a collection network that returns half-empty trucks can erase the benefit of the reuse. Take-back clauses without a stated recovery route are promises to store something later. Lock-in is the second structural risk: when only the incumbent can service or recover the item, the renewal conversation loses its alternative, and a buyer who did not price that renewal has lost leverage exactly when the switching cost is highest. What to demand before booking a saving: performance parity in writing, warranty parity or an explicit priced gap, the failure rate observed by others in the same duty cycle, a defined core return process with the ownership of the core settled, and a recovery route that names where the material actually goes. And one honest caution about measurement: circularity metrics are easy to compute and easy to game. Recycled content is a percentage of mass with a chain-of-custody method behind it, recyclability is a conditional statement about facilities that may not exist nearby, and circularity rate over a period can be moved by shortening the period. Report the definition used alongside the number, or the number means nothing to the next reader.",
  why: [
    'A circular arrangement is a transfer of cost and risk to a named party, and the party holding the asset at end of cycle pays for the recovery.',
    'Used, refurbished and remanufactured are different products at different risk, and a specification that conflates them buys failures at a discount.',
    'The whole-cycle model has to include cleaning, return transport, loss rate, residual value and disposal, since a circular case usually fails in one of those five lines.',
    'Recovery that only the incumbent can perform removes the alternative at renewal, which is a commercial exposure wearing an environmental label.',
    'Circularity metrics depend on the definition used, so a percentage without a stated basis is a marketing number rather than a measurement.'
  ],
  when: [
    'Writing a specification for packaging, consumables, tooling or equipment with a service life longer than one contract.',
    'Evaluating a remanufactured or refurbished offer where the price gap to new is being booked as a saving.',
    'Considering a lease or product-as-service in place of a purchase, especially where utilisation is uncertain.',
    'At renewal of a contract where the supplier owns the recovery route for the asset.',
    'Where an extended producer responsibility or disposal duty is changing and the allocation between parties has never been written down.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Owns the whole-cycle comparison and decides whether the circular option is genuinely cheaper once recovery is priced.' },
    { role: 'Requirement Owner', resp: 'Accepts the performance and warranty basis of a refurbished or remanufactured item before it enters the specification.' },
    { role: 'Sustainability Lead', resp: 'Defines the circularity metric and the chain-of-custody evidence accepted for recycled content.' },
    { role: 'Supplier', resp: 'Runs the return, cleaning and recovery flow and reports the loss rate rather than only the collection rate.' },
    { role: 'Finance Controller', resp: 'Treats residual value and disposal liability as balance sheet items and refuses unpriced commitments.' }
  ],
  inputs: [
    'Single-use baseline: unit price, disposal cost, contamination handling and raw material exposure.',
    'Circular option: durable unit cost, expected trips, cleaning and return transport, loss rate and end-of-life route.',
    'Warranty and observed failure data for remanufactured items in the same duty cycle.',
    'Contract terms on core ownership, recovery route, residual value and the renewal notice period.'
  ],
  outputs: [
    'A whole-cycle comparison with the five cost lines that decide it shown separately.',
    'A specification written as an outcome, with the recovery and warranty basis stated.',
    'A priced gap analysis where a remanufactured offer is cheaper, showing what the buyer is being paid to accept.',
    'A renewal exposure note naming what happens if the recovery route is unavailable or the incumbent changes.'
  ],
  controls: [
    'No circular saving is booked before the recovery cost, loss rate and disposal route are priced and evidenced.',
    'Remanufactured and refurbished items require a written performance and warranty statement before award.',
    'Any arrangement where only the incumbent can recover the item carries a documented renewal strategy.',
    'Circularity percentages are reported with the definition and the chain-of-custody method used.'
  ],
  bestPractices: [
    'Specify the outcome and let the supplier choose the mechanism, which keeps the design open to a better recovery route next year.',
    'Ask for the loss rate, not the collection rate: a pool that leaks looks successful in a flow diagram and fails in a budget.',
    'Price the renewal when you price the deal, because the switching cost of a service arrangement is highest at the moment of the second negotiation.',
    'Compare a returnable system per cycle rather than per unit, which is the only way the transport and cleaning lines stay visible.'
  ],
  mistakes: [
    'Booking the difference between remanufactured and new price as a saving while ignoring a shorter warranty.',
    'Assuming the supplier carries an end-of-life duty that the contract never allocated.',
    'Building a returnable pool without funding the reverse logistics, so empties travel half-loaded or not at all.',
    'Accepting a lease that transfers disposal risk and then paying a residual settlement at the end of it.'
  ],
  terms: [
    { term: 'Remanufactured', def: 'A core disassembled and restored to original specification with a warranty that should match new, which is what justifies the price.' },
    { term: 'Returnable pool', def: 'Durable containers circulating between producer and user, whose economics depend on trips, cleaning, transport and loss.' },
    { term: 'Core', def: 'The used asset returned for remanufacture, whose ownership and value must be settled in the contract before it is collected.' },
    { term: 'Extended producer responsibility', def: 'A regime placing end-of-life cost on whoever puts an item on the market, with allocation between parties varying by jurisdiction.' }
  ],

  thinkingPoints: [
    {
      quote: 'The carton that was cheaper for one trip.',
      explanation: 'A plant replaced single-use cartons with a returnable pool at 2.20 each against 0.40, planning thirty trips and counting the per-trip cost as favourable. Eighteen months later the average was nine trips: no one had funded the return transport, containers were lost at customer sites without chargeback, and half the pool sat in a yard waiting for a cleaning slot that nobody had scheduled.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a returnable system is a logistics operation with costs of its own, and where those costs are unfunded the durable unit price does the rest.',
      reflectionPrompt: 'If you replaced a consumable with a durable asset tomorrow, who would own the return flow, and would the loss rate appear in a report anyone reads?',
    },
    {
      quote: 'A saving with a shorter warranty attached.',
      explanation: 'A component category booked 22 percent on remanufactured parts against new. The remanufactured item carried a six-month warranty and the new one thirty-six. Two years of field failure data showed the difference was worth roughly half the booked saving, and the cost surfaced in service rather than in purchasing.',
      realWorldExample: 'Illustrative example: where a circular option is cheaper and carries less protection, the difference is a payment for accepting risk, and it belongs to whoever pays for the failures.',
      reflectionPrompt: 'Where your last price reduction came from a lower tier of product, who signed off the performance difference and where did the failures end up?',
    }
  ],

  sopSteps: [
    { title: 'Write the requirement as an outcome', role: 'Requirement Owner',
      desc: 'State the function, duty cycle and service conditions rather than the material or the construction. An outcome specification lets a supplier propose a refill, a pool or a remanufactured option, and lets a better mechanism win next cycle without a contract change.',
      control: 'The specification names performance and duty rather than a fixed design, and any material preference is justified in writing.',
      record: 'Requirement sheet with duty cycle, performance basis and the reason for any stated preference.',
      pitfall: 'Mandating a recyclable material where the recovery facility does not exist within economical distance, which buys a property nobody can use.'
    },
    { title: 'Build the whole-cycle model with all five lines', role: 'Category Manager',
      desc: 'Carry purchase or rental, maintenance and consumables, cleaning and return transport, loss or shrinkage, and end-of-life disposal or residual. Compare per cycle against the single-use baseline, and keep each line visible rather than netting them into one unit price.',
      control: 'A circular option is approved only on a whole-cycle comparison where recovery, loss and disposal are separately shown.',
      record: 'Cycle model with the five lines, the trip assumption and the source for each rate.',
      pitfall: 'Comparing the purchase price of a durable against a consumable and calling the difference a saving that has not yet paid for its own logistics.'
    },
    { title: 'Fix the tier and the warranty before pricing', role: 'Requirement Owner',
      desc: 'State whether the offer is used, refurbished or remanufactured, and require a written warranty and performance basis for the tier proposed. Where the warranty is shorter than new, quantify the gap and route it to whoever carries the failure cost.',
      control: 'No remanufactured item enters the specification without a warranty statement and observed failure data for the same duty cycle.',
      record: 'Tier and warranty note with failure data, and the priced gap where protection is lower.',
      pitfall: 'Reading a green product name as an equivalence claim, since the label describes the mechanism rather than the guarantee.'
    },
    { title: 'Settle who owns the core and the recovery route', role: 'Finance Controller',
      desc: 'Define what happens to the item at the end of each cycle: who takes it back, who owns the core, what value it carries, where material actually goes and who pays if the route closes. A take-back clause with no named destination is a future storage cost.',
      control: 'Recovery is written with a destination and a cost owner, and residual or settlement terms are quantified before signature.',
      record: 'Recovery schedule with destination, ownership of the core, residual basis and the cost owner.',
      pitfall: 'Accepting a lease that transfers disposal duty and hides a settlement that becomes payable in the final month of the term.'
    },
    { title: 'Price the renewal exposure now', role: 'Category Manager',
      desc: 'Where only the incumbent can service, clean or recover the item, record what a renewal would cost with no alternative available, and write the notice period and exit assistance into the contract while leverage still exists.',
      control: 'Every exclusive recovery arrangement carries a documented renewal strategy and exit assistance terms agreed at signature.',
      record: 'Renewal exposure note with the notice date and the agreed exit assistance.',
      pitfall: 'Discovering at renewal that the switching cost includes the entire installed base, which is the point at which the discount was really paid.'
    },
    { title: 'Report loss rate, not collection rate', role: 'Supplier',
      desc: 'Return a periodic count of units in circulation, units returned, units lost and average trips achieved, with the cleaning throughput beside it. A collection percentage that omits losses and dwell time reports the flow and hides the money.',
      control: 'The loss rate and trips achieved are reported on the same schedule as delivery performance, with a target and a remedy.',
      record: 'Pool report: in circulation, returned, lost, average trips and cleaning capacity used.',
      pitfall: 'Reporting a collection rate computed against returned units rather than against the issued fleet, which always looks healthy.'
    },
    { title: 'State the definition behind every percentage', role: 'Sustainability Lead',
      desc: 'When recycled content, recyclability or circularity rate is reported, carry the definition, the period and the chain-of-custody method with it. Where a figure is a share of mass, say so, and where a facility is assumed, name it.',
      control: 'No circularity percentage is published without its definition and measurement basis alongside it.',
      record: 'Metric note with definition, period, method and named recovery facility where applicable.',
      pitfall: 'Improving a circularity rate by shortening the reporting window rather than by changing anything physical.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'Single-use packaging costs 0.40 per trip including disposal. A returnable container costs 2.20, planned for thirty trips, with cleaning at 0.06 per trip and return transport at 0.04 per trip. Observed trips average twelve and 9 percent of the fleet is written off each year.',
      q: 'What is the correct per-trip comparison at twelve trips?',
      options: [
        { text: '0.0733, since 2.20 divided by thirty trips is the unit cost the design assumed.', isCorrect: false, rationale: 'That is the planning number and it describes a container that is not being achieved. Design life is not a cost basis when observed cycles are known.' },
        { text: 'About 0.247 plus a loss allowance, so the pool is not obviously cheaper than 0.40 before losses are added.', isCorrect: true, rationale: 'Correct. 2.20 over twelve trips is 0.183, plus 0.06 cleaning and 0.04 return is 0.283, and the 9 percent write-off sits on top. The case is close, not decisive, and it depends on raising trips achieved.' },
        { text: '0.40, since the two options must cost the same over time.', isCorrect: false, rationale: 'That is an assumption about equilibrium, not a calculation, and it hides exactly the lever worth pulling, which is trips per container.' },
        { text: 'Cannot be compared without knowing the disposal cost of the container itself.', isCorrect: false, rationale: 'That cost matters but it does not block the comparison. The dominant lines are already quantified.' }
      ],
      calcWork: '2.20 / 12 = 0.183; + 0.06 cleaning + 0.04 return transport = 0.283 per trip, before the 9 percent annual write-off and before recovery of the damaged units. The single-use baseline is 0.40.',
      principle: 'A returnable system is priced per cycle achieved, not per cycle designed, and the lever that decides it is the trips and loss rate you can actually operate.',
    },
    {
      type: 'scenario',
      context: 'A remanufactured part costs 22 percent less than new, carries a six-month warranty against thirty-six months for new, and the failure cost sits with the maintenance department.',
      q: 'How should the buyer treat the 22 percent?',
      options: [
        { text: 'Book it as a saving, since the purchase price genuinely fell.', isCorrect: false, rationale: 'The purchase price is one line of a whole-cycle cost, and the risk transferred by the shorter warranty lands in another department budget.' },
        { text: 'Reject the part, since remanufactured items are not fit for use.', isCorrect: false, rationale: 'That is not what the warranty gap shows. Many remanufactured items perform fully; the question is whether protection is matched or priced.' },
        { text: 'Quantify the expected additional failure cost, and only count as a saving what remains after it, with the maintenance owner signing the basis.', isCorrect: true, rationale: 'Correct. Where protection is lower, the price difference is partly a payment for accepting risk, and the party carrying that risk has to agree the arithmetic.' },
        { text: 'Ask the supplier to extend the warranty and treat any refusal as proof of poor quality.', isCorrect: false, rationale: 'A refusal is information about the reliability data the supplier holds, not proof of defect, and the buyer still needs the cost basis either way.' }
      ],
      principle: 'A price reduction against a shorter warranty is a risk transfer, and it counts as a saving only after the party carrying the failures has priced it.',
    },
    {
      type: 'scenario',
      context: 'A supplier proposes a three-year equipment lease with no purchase option, saying it removes disposal responsibility entirely. The equipment has a ten-year service life and the maintenance contract belongs to the supplier.',
      q: 'What should the buyer examine before agreeing?',
      options: [
        { text: 'Nothing, since the disposal duty is clearly transferred.', isCorrect: false, rationale: 'The duty is transferred for three years. What happens to an asset the buyer does not own at month thirty-seven, and on whose terms, is the whole decision.' },
        { text: 'The renewal terms, the residual settlement, the exit assistance and what the supplier may charge to recover the asset, priced now.', isCorrect: true, rationale: 'Correct. A service arrangement concentrates leverage with whoever controls recovery and servicing, so the second negotiation is the expensive one and its terms have to be fixed in the first.' },
        { text: 'Only the monthly cost, since everything else is legal detail.', isCorrect: false, rationale: 'Monthly cost is the visible term and the least risky one; exposure lives in settlement and in the absence of an alternative supplier.' },
        { text: 'Whether the equipment is recyclable, since that determines the environmental case.', isCorrect: false, rationale: 'Recyclability at month thirty-seven belongs to the owner, and the buyer will not own it. The commercial allocation is the prior question.' }
      ],
      principle: 'Lease and service models are judged at renewal, so residual terms, exit assistance and recovery cost are priced at signature while the buyer still has an alternative.',
    },
    {
      type: 'scenario',
      context: 'A category reports circularity rate rising 12 points after the team changed the measurement window from twelve months to three.',
      q: 'What does the change tell you?',
      options: [
        { text: 'Real improvement, since the metric moved and the report was approved.', isCorrect: false, rationale: 'A metric can improve because its definition changed, and a shorter window raises the share returned without anything physical getting better.' },
        { text: 'Nothing about performance: the definition changed, so the two numbers are not comparable and the series has to be restated.', isCorrect: true, rationale: 'Correct. A metric is only valid on a fixed definition, and any comparison across a definition change must be restated or labelled, never reported as progress.' },
        { text: 'Improvement, but it should be verified by a supplier audit.', isCorrect: false, rationale: 'Audit verifies a supplier, not a definition. The defect here is in the measurement basis.' },
        { text: 'Improvement, provided the same window is used next quarter.', isCorrect: false, rationale: 'Consistency from now on protects the future series and does not make the historical comparison valid.' }
      ],
      principle: 'Whenever a definition changes, restate the series or mark the break: a metric moved by a window change is a reporting artefact, not an achievement.',
    },
    {
      type: 'scenario',
      context: 'A specification calls for a fully recyclable composite panel. A supplier proposes an alternative that is not recyclable but lasts three times longer and is taken back at end of life.',
      q: 'What is the correct evaluation?',
      options: [
        { text: 'Reject the alternative, since it fails the stated requirement.', isCorrect: false, rationale: 'The requirement named a property rather than the outcome, and the option that better serves the purpose loses to a line in a document the buyer wrote.' },
        { text: 'Award the recyclable panel and ask the supplier to improve next time.', isCorrect: false, rationale: 'That preserves the specification and forfeits the actual benefit, which was the point of the exercise.' },
        { text: 'Test whether the requirement was written as a proxy for a purpose, and if so rewrite it as an outcome and compare both options on whole-cycle performance and recovery.', isCorrect: true, rationale: 'Correct. Property-based specifications freeze a solution at the moment of writing; the honest evaluation goes back to what the asset must do, then compares life, recovery and cost together.' },
        { text: 'Split the award between both options to keep the requirement and the benefit.', isCorrect: false, rationale: 'That is a decision without an owner, and it doubles the recovery arrangements to avoid answering the specification question.' }
      ],
      principle: 'Where a specified property stops a better outcome from being considered, the specification is wrong, and that is a requirement-definition defect rather than a market failure.',
    }
  ],

  relSop: 'sop-sustainable-sourcing-verification',
  rel: {
    concepts: ['circular-economy-levers', 'total-cost-of-ownership', 'make-or-buy', 'specification', 'cost-breakdown', 'scope3-supplier-emissions'],
    sops: ['sop-sustainable-sourcing-verification', 'sop-requirement-definition', 'sop-contract-renewal'],
    checklists: ['cl-requirement-definition', 'cl-commercial-evaluation', 'cl-contract-renewal'],
    templates: ['tpl-business-case', 'tpl-commercial-evaluation', 'tpl-contract-renewal-assessment'],
    calcs: ['calc-tco', 'calc-make-vs-buy'],
    decisions: ['dec-make-or-buy', 'dec-unit-or-tco'],
    kpis: ['kpi-cost-avoidance', 'kpi-savings'],
    glossary: ['gloss-tco', 'gloss-capex', 'gloss-opex']
  },
  labMission: {
    title: 'Mission 21.2: Build the Cycle Model for One Item',
    desc: 'Take a consumable or an asset you buy regularly, model it per cycle, and write the recovery terms you would demand.',
    tasks: [
      'Pick one packaging item or one piece of equipment and list its single-use cost per cycle, including disposal and any contamination handling that is currently paid somewhere else.',
      'Model the circular alternative per cycle: durable unit cost, trips or years achieved, cleaning, return transport, loss rate and end-of-life route. Show the five lines separately.',
      'Write the recovery clause: who owns the core, where the material goes, who pays, and what the exit or settlement term is at renewal.'
    ],
    ctaLabel: 'Open the TCO Calculator',
    ctaHref: '#/calc/calc-tco',
    secondaryLabel: 'Open Make vs Buy',
    secondaryHref: '#/calc/calc-make-vs-buy'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-social-value-labour-due-diligence',
  title: 'Social Value, Labour Rights and the Due Diligence Laws Now in Force',
  module: 'Module 21: Sustainable and Responsible Sourcing - Carbon, Circularity and Social Value',
  kicker: 'Function 21.3',
  tier: 'executive',
  tagline: 'One regime asks what you disclose, another what you looked for, a third what you did when you found it. A board that answers with a code of conduct is answering the wrong question.',
  desc: 'This function covers the family of rules now placing duties on buying organisations for labour and human rights in their chains, what each of them actually requires - disclosure, due diligence, prohibition of product, remediation - and the practical programme a procurement function runs to satisfy them: tier mapping, the recruitment fee question, worker grievance access, audit design and remediation with a clock. It covers social value in award design and its legal limits, and it covers the executive judgement most organisations never formally make: when to remediate and when to exit, and what each choice does to the workers in the finding.',
  duration: '30 mins',
  lifecycleStage: 'Stage 6: Supplier Prequalification and Due Diligence',
  lifecycleDesc: 'Owned at prequalification and contract formation, and tested again during performance, because a chain changes without telling anyone when a subcontract is added.',

  what: "The obligations now attached to a buying organisation divide into four different types, and the confusion in most programmes comes from treating them as one. The first is transparency: a law requiring a statement, published, describing what the organisation did about forced labour in its chains. It does not require that the chain be clean; it requires that the account be given. The second is due diligence: a duty to identify, prevent, mitigate and account for adverse impacts across the chain, with remediation where the organisation caused or contributed to them, and with a liability exposure that in some regimes reaches the directors and includes financial penalties. The third is prohibition: rules that stop product made with forced labour entering a market, where the test is not what the buyer knew but what the goods are, and the exposure is a border or a seizure rather than a report. The fourth is sector-specific traceability, such as conflict minerals, which requires a documented inquiry into named materials and countries. Across all four, the same practical question dominates: how deep did you actually look, and can you evidence it. Forcing this into a purchasing programme produces a short list of mechanisms. Tier mapping first. Most serious labour risk sits below tier one, in component processing, agriculture, mining, logistics, cleaning and in the labour agencies that supply workers rather than materials. A chain map that stops at the direct supplier is a description of contracts rather than of risk, and every regime in the due diligence family expects the buyer to reason about depth proportionate to risk. The recruitment fee question second, because it is the single most diagnostic thing to ask. Where a worker paid a fee to obtain a job, that debt is what makes a resignation impossible, and the employer-pays principle - no fee to the worker for any part of recruitment, verified by receipts from the agency chain - converts a moral position into an auditable one. Wage evidence follows: not a payslip sample from the front office but records that reconcile hours, deductions and the local minimum or a defined living wage benchmark, with deductions tested against what the law allows. Third, worker voice. An audit is a scheduled event at a site that prepared for it. The information that travels is what workers say when they are not being watched and when they can raise something without the answer going back to the person they are complaining about, which means a grievance route tested by asking workers how they would raise a problem rather than by pointing at a notice on a board. Fourth, the audit itself, designed honestly: announced and unannounced elements, sampling across shifts and sites, a remedy for the auditor being paid by the audited party, and an internal recognition that a certification scheme tells you what that scheme verifies and nothing more. Now the executive decision that a policy cannot delegate. When a finding lands, the two options are remediation with a clock or termination, and both have consequences that a compliance framework rarely states. Termination is clean in the file and often worse for the workers: the site keeps the practice, loses the buyer leverage that was funding the change, and the goods move to another supplier under another buyer who has not looked. Continued relationship with remediation is slower, requires the organisation to accept a period where it is knowingly exposed, and depends on verifying the fix by evidence rather than by an assurance letter. The honest position is that exit is a remedy for a finding the supplier refuses to address, not a way of making a problem disappear from a report, and that the decision needs a named owner, a written basis and a date. Social value belongs in this lesson because it is the same muscle used in a commercial form: a criterion in an award that measures benefit to people - training places, local employment, health outcomes, inclusive supply - and it carries two structural risks. The first is legal: in most public regimes a award criterion must be connected to the subject matter of the contract, and a weight set for political rather than contractual reasons is the one most likely to fall in a challenge. The second is evaluative: unweighted narrative sections invite scoring on enthusiasm, and the fix is the discipline of units, periods, delivery mechanism and evidence, applied to social criteria exactly as to a technical one. A promise with no mechanism scores lowest, and the reason is written down. What good looks like at board level is uncomfortable to fake: a map of where the workforce risk actually sits, an answer to who pays recruitment fees in that population, a grievance route that produced at least one complaint, a remediation log with dates rather than assurances, and a disclosure that says what could not be seen. The last is the truest test of the programme. An organisation that can state honestly where its visibility ends has a due diligence system; an organisation whose statement contains no unknowns has a marketing document that will be read against the day something is found.",
  why: [
    'The four obligation types - disclosure, due diligence, prohibition and traceability - demand different evidence, and a single policy cannot satisfy two of them.',
    'Most severe labour risk sits below tier one, where neither the contract nor the audit reaches, so depth of inquiry is the actual compliance question.',
    'A recruitment fee paid by the worker is what makes leaving impossible, which converts an abstract rights issue into one contractual term with receipts.',
    'Termination after a finding often worsens the outcome for the workers it was meant to protect, and that consequence belongs in the escalation policy.',
    'A social value criterion that is not tied to the subject matter or not scored on evidence is the most common ground on which an award is challenged.'
  ],
  when: [
    'Entering or deepening a category where the labour is seasonal, agency-supplied or physically hazardous.',
    'Designing an award in a jurisdiction where social criteria are permitted or required, and the weighting has to survive scrutiny.',
    'When a finding arrives from an audit, a journalist, a worker or an NGO, and the first decision is who owns it and on what clock.',
    'At annual review of a public statement or report, when the previous year assertions are tested against what evidence exists.',
    'Before relying on a certification in a disclosure, because the scheme defines what was checked and it is usually narrower than the claim implies.'
  ],

  raci: [
    { role: 'Head of Procurement', resp: 'Owns the chain map, the escalation route and the recommendation to remediate or exit.' },
    { role: 'General Counsel or Compliance Lead', resp: 'States which regime applies, what it requires as evidence and what must be disclosed.' },
    { role: 'Category Manager', resp: 'Runs the fee and wage inquiry with the supplier and holds the remediation dates in the contract file.' },
    { role: 'Supplier', resp: 'Discloses the labour providers and sites, produces records rather than statements and executes the corrective plan.' },
    { role: 'Board or Executive Committee', resp: 'Accepts the residual unknown, signs the escalation policy and owns the decision where exit is recommended.' }
  ],
  inputs: [
    'Chain map to the depth risk justifies, naming sites, labour agencies and worker populations.',
    'Recruitment evidence: who paid what fee, in which country, to which agency, and the wage records reconciled to hours.',
    'Grievance data by route and by site, with response times and outcomes, including the periods where nothing was raised.',
    'The applicable regime text or advice, with its evidence expectation and reporting date.'
  ],
  outputs: [
    'A due diligence record showing what was looked for, where inquiry stopped and why.',
    'A remediation log with finding, action, owner, verification method and close date.',
    'An escalation policy that names who decides on exit and what the workers consequence is.',
    'A disclosure or social value evaluation record that could be defended after the fact.'
  ],
  controls: [
    'No fee is charged to a worker at any layer of recruitment for the supplying population, verified by receipts rather than by clause.',
    'Every finding carries a named owner, a verification method and a date, and a closed finding is evidenced rather than re-assured.',
    'Award criteria on social benefit are published before bids, weighted in proportion, and scored with a written reason per band.',
    'The statement of what could not be seen is retained in the disclosure, since an absence of unknowns is not a sign of strength.'
  ],
  bestPractices: [
    'Ask who paid the recruitment fee before asking whether forced labour exists: the fee question is diagnostic and the other is a conclusion.',
    'Test grievance access by asking workers how they would report a problem, since a route that terminates at the site manager is not a route.',
    'Keep the relationship during remediation where the supplier engages, and record the reason, because withdrawal removes the only leverage the worker had.',
    'Write the escalation policy before the first finding, when nobody is defending a position and the decision can be made on principle.'
  ],
  mistakes: [
    'Relying on a signed code of conduct as evidence of anything beyond the signature.',
    'Announcing every audit, which measures preparation rather than practice.',
    'Adding a social value criterion with no weight, then reporting that the tender considered social benefit.',
    'Reporting zero findings for a year as performance, when it more often means the inquiry did not reach where the risk is.'
  ],
  terms: [
    { term: 'Employer pays principle', def: 'The rule that all recruitment costs sit with the employer and the agencies, with no fee charged to the worker at any layer.' },
    { term: 'Due diligence', def: 'A documented process of identifying, preventing, mitigating and accounting for adverse impacts, distinct from a duty to disclose.' },
    { term: 'Grievance mechanism', def: 'A route by which a worker can raise a concern that does not pass through the person the concern is about.' },
    { term: 'Social value', def: 'Measurable benefit to people or place produced by an award, expressed in units with a period and a delivery mechanism.' }
  ],

  thinkingPoints: [
    {
      quote: 'The certificate that covered the wrong question.',
      explanation: 'A food category answered a due diligence request with a farm certification held by its primary supplier. The finding later came from a processing site one layer down, employing agency-supplied seasonal workers, a site the certificate did not cover, in a chain the supplier had never listed. Nothing in the file was false. The file simply asked a narrower question than the law did.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: certification tells you what a scheme verifies, and a compliance programme built on certificates inherits the scope of whoever designed the scheme.',
      reflectionPrompt: 'For your most exposed category, what is the last layer your assurance actually reaches, and who decided that was deep enough?',
    },
    {
      quote: 'The exit that protected nobody.',
      explanation: 'A garment finding produced an immediate termination, as policy required. The buyer left with its order book, the site retained the practice and the workers lost the one thing that had funded the correction: a customer who wanted the goods and could withhold them. Eighteen months later the same supplier appeared in another buyer list, with the same site and no remediation record anywhere.',
      realWorldExample: 'Illustrative example: disengagement is a remedy against a supplier and a loss for the workers, and a policy that treats it as the safe option transfers harm to people who never appear in the report.',
      reflectionPrompt: 'Does your escalation policy state when you stay and fix, with a date and a verification method, or does it only say what happens when a finding is confirmed?',
    }
  ],

  sopSteps: [
    { title: 'Name the regime and its evidence test', role: 'General Counsel or Compliance Lead',
      desc: 'State which obligation applies to the organisation: a disclosure, a due diligence duty with penalties, an import prohibition or a sector traceability rule. Record what the regime expects as evidence and the date by which it must exist, because these differ and a single policy cannot cover them.',
      control: 'Each regime in force is mapped to a named owner, an evidence expectation and a reporting date before the next reporting cycle.',
      record: 'Regime register with the applicable duty, the owner and the evidence required.',
      pitfall: 'Treating a transparency duty as satisfied by a statement nobody tested, then discovering the same year that a prohibition regime also applied to the goods.'
    },
    { title: 'Map the chain to the depth that risk justifies', role: 'Category Manager',
      desc: 'Identify sites, labour agencies and worker populations below tier one where the risk is concentrated: seasonal, agency-supplied, hazardous or migrant work. Proportionate means deeper where exposure is real and shallower where it is not, and the reasoning is written down.',
      control: 'High-risk categories carry a map to at least one layer below the contract supplier, with the reason for the depth recorded.',
      record: 'Chain map with sites, agencies, worker counts and the justification for the inquiry depth.',
      pitfall: 'A map that stops at the direct supplier and is then described as full visibility, which converts a contract list into an assurance claim.'
    },
    { title: 'Ask the recruitment fee question and demand receipts', role: 'Category Manager',
      desc: 'For every worker population in scope, establish who paid what, to whom, in which country, at any stage including third-party agencies, and obtain documentary evidence. Put the employer-pays obligation into the contract and require flow-down to agencies.',
      control: 'No worker at any layer pays a recruitment-related fee, evidenced by agency declarations and sample worker-level documents rather than by clause alone.',
      record: 'Fee inquiry file with agency chain, amounts, receipts and the flow-down clause reference.',
      pitfall: 'Accepting an agency declaration that no fees are charged, since the fee is often collected elsewhere as a deposit, a transport charge or a document retention.'
    },
    { title: 'Test grievance access where the work happens', role: 'Head of Procurement',
      desc: 'Ask workers how they would raise a problem, without management present, and follow what happens to a report: whether the route reaches someone able to act, whether it is available in the language actually spoken, and whether the reporter is protected.',
      control: 'Grievance routes are tested by worker interviews on a schedule, and volumes are reviewed as a signal of access rather than of health.',
      record: 'Grievance test note with the route described, interview count, language check and outcome log.',
      pitfall: 'Reading zero reports as a clean site, which is the interpretation that keeps a broken route untested for years.'
    },
    { title: 'Design the audit for what it can actually see', role: 'Head of Procurement',
      desc: 'Mix announced and unannounced visits, sample across shifts and sites, check the scope and rigour of any certification relied on, and treat the payment relationship between auditor and audited party as a known limitation to be managed rather than ignored.',
      control: 'Audit coverage, timing and scheme scope are recorded per site, and no certificate is relied on without a written note on what it verifies.',
      record: 'Audit plan with site list, timing basis, scheme scope notes and observed limitations.',
      pitfall: 'Buying a certificate and reporting its brand rather than its scope, since schemes vary enormously in what they actually inspect.'
    },
    { title: 'Score social criteria on mechanism, not intention', role: 'Category Manager',
      desc: 'Where an award carries social benefit criteria, publish the rubric before bids, define units and periods, require the delivery mechanism and the evidence, and write the reason for each band. Confirm that the criterion is tied to the subject matter of the contract.',
      control: 'Every scored social criterion has a published definition, a stated weight, and a written reason per band in the award record.',
      record: 'Evaluation sheet with rubric, weight, bands, evidence cited and the reason for each band.',
      pitfall: 'Scoring a promise because it is enthusiastic, which is the failure a challenge examines first and the reason the criterion gets removed later.'
    },
    { title: 'Escalate with a decision owner and a clock', role: 'Head of Procurement',
      desc: 'On a finding, assign a named owner outside the category reporting line, decide remediation or exit against a written basis, set verification dates, and record the worker consequence of exiting. Keep the evidence chain intact from first report to closure.',
      control: 'Remediation carries dates and evidence-based verification, and an exit decision names who approved it, on what basis and with what alternative for the workers.',
      record: 'Escalation file with the finding, the decision, the owner, the dates, the verification and the closure evidence.',
      pitfall: 'Closing a finding on a renewed assurance letter, which is the moment a remediation programme becomes a paper exercise.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A group publishes a modern slavery statement listing its supplier code of conduct, annual certificates and a hotline. It reports no findings for three years. A due diligence law now applies to the group, with penalties and a duty to remediate.',
      q: 'What is the most important gap to close?',
      options: [
        { text: 'Nothing, since the absence of findings shows the chain is clean.', isCorrect: false, rationale: 'Zero findings across three years is far more often a statement about the inquiry than about the chain, and a due diligence regime examines the inquiry.' },
        { text: 'Move from disclosure artefacts to a documented process: risk mapping to depth, the fee question, grievance evidence, remediation with dates and a record of what could not be seen.', isCorrect: true, rationale: 'Correct. A transparency duty is satisfied with a statement; a due diligence duty is satisfied with a process and the evidence of it running. The artefacts listed answer the first regime and not the second.' },
        { text: 'Add more certificates, since the statement is thin.', isCorrect: false, rationale: 'Certificates extend the list of artefacts without answering what was looked for, and a scheme covers only what it verifies.' },
        { text: 'Commission a further annual audit of tier one suppliers.', isCorrect: false, rationale: 'That repeats the layer where the risk is least concentrated and adds a document to a file that already has documents.' },
      ],
      principle: 'Identify which type of duty applies before designing anything, because disclosure regimes ask what you published and due diligence regimes ask what you looked for.',
    },
    {
      type: 'scenario',
      context: 'An audit of a primary supplier is clean. The category uses a resin from a converter, which uses an agency supplying migrant workers. Workers report a placement fee, a withheld passport and deduction for accommodation.',
      q: 'Where does the buyers responsibility sit?',
      options: [
        { text: 'With the converter, since the primary supplier was audited and passed.', isCorrect: false, rationale: 'The clean audit describes a different legal entity. The practice is in the chain the buyer relies on, and the regime examines the chain rather than the contract list.' },
        { text: 'With the buyer, to act: the fee must be reimbursed and stopped by contract at every layer, documents returned, deductions made lawful, with verification dates and no withdrawal of the order before the fix is evidenced.', isCorrect: true, rationale: 'Correct. Contribution to an impact through a purchasing relationship brings duties to mitigate and remediate, and the buyer holds the only leverage that reaches the agency quickly.' },
        { text: 'With the agency alone, since it committed the act.', isCorrect: false, rationale: 'The agency bears legal responsibility for its own acts and the buyer responsibility for the chain it organised, which is why the employer-pays principle exists.' },
        { text: 'Resolved by replacing the converter, which removes the exposure.', isCorrect: false, rationale: 'That moves the workers into a relationship with a new buyer that has not asked the question, and the practice usually follows the goods.' }
      ],
      principle: 'Depth of visibility is the substance of labour due diligence: a finding one layer below the contract is still in the chain the buying decision created.',
    },
    {
      type: 'scenario',
      context: 'A public tender weights social value at 10 percent. One bidder offers 300 training hours delivered by a named college with a plan; another offers commitment to local skills and community benefit with no mechanism; a third offers nothing.',
      q: 'How should the middle bid be scored?',
      options: [
        { text: 'Equal to the first, since both addressed the topic and the intent is clear.', isCorrect: false, rationale: 'Intent without a delivery mechanism cannot be verified later, which is the exact defect the criterion exists to avoid.' },
        { text: 'In the lowest band that the published rubric allows for an unevidenced intention, with the written reason recorded.', isCorrect: true, rationale: 'Correct. The rubric was published before bids, so scoring an intention in a band designed for mechanism and evidence is both unfair to the bidder that delivered a plan and the first thing a challenge examines.' },
        { text: 'Higher than the first, because broader language suggests wider benefit.', isCorrect: false, rationale: 'That rewards vagueness and destroys the criterion purpose, and it cannot be defended against a bidder who produced a named partner and a schedule.' },
        { text: 'Rejected from the tender as non-responsive.', isCorrect: false, rationale: 'An unambitious offer is a low score rather than an exclusion, and excluding it narrows competition disproportionately.' }
      ],
      principle: 'Score the mechanism and the evidence, not the enthusiasm, and write the reason for the band at the time of scoring rather than after a challenge.',
    },
    {
      type: 'scenario',
      context: 'A finding is confirmed at a long-standing supplier. The escalation policy says terminate. The remediation plan needs fourteen months and the supplier holds 60 percent of a category with no qualified alternative.',
      q: 'What is the correct executive action?',
      options: [
        { text: 'Terminate as the policy says, since a policy that is not followed is worse than no policy.', isCorrect: false, rationale: 'Following a policy that was written before anyone had to apply it, in a case where the consequence falls on workers and on supply continuity, is a decision delegated to a document.' },
        { text: 'Ignore the policy and continue as normal until an alternative exists.', isCorrect: false, rationale: 'That converts a known harm into a commercial convenience and removes the evidence trail that protects the organisation later.' },
        { text: 'Escalate to the named owner, approve a dated remediation plan with verification by evidence, record the worker and continuity consequence of exit, and revise the policy for the case it did not anticipate.', isCorrect: true, rationale: 'Correct. Remediating under a written basis with dates keeps leverage with the workers, and updating the policy is what turns an exception into a rule someone can follow next time.' },
        { text: 'Reduce volumes quietly until the issue is resolved.', isCorrect: false, rationale: 'A partial withdrawal with no plan achieves neither pressure nor protection, and it hides the decision from the people who must own it.' }
      ],
      principle: 'A policy that has never met a case where exit harms the workers is a draft: the decision needs a named owner, a written basis, dates and a policy revision afterwards.',
    },
    {
      type: 'scenario',
      context: 'A board pack reports that 98 percent of suppliers have signed the code of conduct. The same board asks what the programme has found.',
      q: 'What is the honest answer to give?',
      options: [
        { text: '98 percent coverage, since that is the metric that was tracked.', isCorrect: false, rationale: 'It answers a question about paperwork. The board asked a different one, and reporting the available metric instead of the asked one is how programmes lose credibility.' },
        { text: 'What the inquiry reached and what it found: chain depth mapped, fee evidence tested, grievance volumes by site, findings raised, remediations closed with evidence, and the areas where visibility stops.', isCorrect: true, rationale: 'Correct. A signature rate measures nothing about labour conditions; the due diligence record measures the process the board is accountable for, and the stated unknowns are what make the rest credible.' },
        { text: 'Nothing is known because no audit found anything.', isCorrect: false, rationale: 'That is an absence of evidence presented as evidence of absence, and it omits the reason, which is inquiry depth.' },
        { text: 'The certificates held by the top suppliers.', isCorrect: false, rationale: 'A count of certificates describes scope chosen by scheme designers, not the risk the organisation carries.' }
      ],
      principle: 'Report what the inquiry reached, what it found and where visibility ends: a due diligence disclosure with no stated unknowns will be read against the organisation later.',
    }
  ],

  relSop: 'sop-sustainable-sourcing-verification',
  rel: {
    concepts: ['modern-slavery-due-diligence', 'social-value-in-awarding', 'environmental-claim-verification', 'supplier-qualification', 'supply-chain-risk', 'procurement-ethics', 'esg-data-quality'],
    sops: ['sop-sustainable-sourcing-verification', 'sop-supplier-due-diligence', 'sop-supplier-corrective-action'],
    checklists: ['cl-supplier-due-diligence', 'cl-commercial-evaluation', 'cl-award-recommendation'],
    templates: ['tpl-supplier-due-diligence', 'tpl-commercial-evaluation', 'tpl-award-recommendation'],
    calcs: ['calc-supplier-scorecard', 'calc-compare-quotes'],
    decisions: ['dec-rfq-or-rfp', 'dec-competitive-or-single'],
    kpis: ['kpi-contract-compliance', 'kpi-supplier-performance'],
    glossary: ['gloss-co-employment', 'gloss-sla', 'gloss-rfp']
  },
  labMission: {
    title: 'Mission 21.3: Write the Escalation Page You Would Need on a Friday',
    desc: 'Take one exposed category and produce the three artefacts a due diligence regime expects: the depth map, the fee answer and the escalation decision.',
    tasks: [
      'Map your most labour-exposed category one layer below the contract supplier, and name the worker populations, sites and agencies you cannot currently see.',
      'Answer the fee question for that population: who pays, at what stage, in which country, and what document would prove it.',
      'Draft the escalation page: who decides after a confirmed finding, what remediation with dates looks like, what evidence closes it, and what you will say about the workers if you exit.'
    ],
    ctaLabel: 'Open the Supplier Scorecard',
    ctaHref: '#/calc/calc-supplier-scorecard',
    secondaryLabel: 'Open the Supplier Due Diligence Checklist',
    secondaryHref: '#/cl/cl-supplier-due-diligence'
  }
});
