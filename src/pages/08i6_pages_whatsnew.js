/* ==========================================================
   Procure Sherpa - What's New
   Version history, newest first, so new features get found.
   ========================================================== */

PS.whatsNew = PS.whatsNew || {};

PS.whatsNew.CHANGES = [
  {
    version: '3.0',
    date: '2026-11-02',
    title: 'The reading edition',
    tag: 'Major',
    items: [
      'A practice exam now opens on its own full-screen page instead of a panel inside the menu: the sidebar, the search box and the breadcrumb are three ways to leave a running clock, so the exam route drops the shell chrome, adds a question rail that shows answered and unanswered at a glance and jumps to any question, keeps the timer in the sticky header, and offers a button to move the attempt into a separate window - the attempt is saved in this browser either way. The Start control also became a real link, which is how the inbound-link gate can see it at all',
      'The dashboard stopped letting the browser decide its shape. A grid class named for two columns was rendering four across, and a four-column stat row was rendering five plus three with two holes in it, because auto-fit fits as many tracks as the width allows and the name was only ever a suggestion. The tile row is now a definite four columns and the panel row a definite two, with the fallbacks written down; the work pages take the width a reading page must refuse, scoped by route so a lesson keeps its short line length; the sidebar scrollbar no longer reads as a rule drawn down the menu; and the activity feed collapses repeated events into one row with a count and shows the lesson title instead of an internal id',
      'Four promises in the footer were links to pages that did not exist. Privacy, Disclaimers, Assumptions and Version history all routed at a help topic that was never written, and because the Help route answers an unknown topic with its own list, every link looked alive while delivering a menu instead of the page it named. Three of them are now real articles - what is stored and where, what the tool is not (including that a practice exam here is not a credential and that every worked example is constructed), and which assumptions the calculators make on your behalf with the settings that change them. Version history points at the changelog, which is what it always was. A gate now checks the argument of a help and Academy link, not just the route name, so a promise without a page behind it fails the build',
      'The relation checker now reads what the Academy lessons declare, and it found five links that had never resolved. Lessons carry their own relations - a governing SOP and a set of related records - and the renderer turns every one of those strings into a link a learner presses. The checker had only ever looked at the library registries, so a lesson pointing at a template, a concept id written without its registry prefix, or a performance concept that does not exist reported no broken references while shipping them. Five were found and corrected; the count that has always printed as broken refs 0 now means what it appears to mean, because the lesson relations are inside the same check',
      'The deployed build got 9.3 KB lighter without losing a sentence of teaching. The minifier had only ever shrunk the script, so the CSS - 148 KB of it, including the long author comments that explain why each rule exists - was being sent to every browser as written for a human to read. It is now minified for the deploy build only: Procure Sherpa.html stays fully commented, because that file is the one a person opens to decide what to trust, and dist/index.html carries the same rules with the prose removed. A guard checks the two are equivalent in structure - the same declaration-block count, the same calc() and url() counts, and the script block byte-identical to what the minifier produced - because a minifier that quietly eats a rule is worse than no minifier at all',
      'New Module 29: Service Transition and Exit - Moving Work Without Losing It - what happens between the award and the stable new service, which is the least governed interval in most contracts. Transition planning, because the service is process plus exceptions plus relationships plus a few informed people, and only the first is documented: the exception catalogue reconciled against your own incident history, capability proven by exercising a failure and a month-end rather than reading a run-book, an overlap window ended on measured criteria by a named person, key people with a mitigation each, and joint measurement so a changeover failure is attributable. At board level, the tail period, because the window where your leverage is lowest is exactly where an unpriced cooperation clause takes you - a rate card and a cap at award, obligations that survive termination, a usable data extract that has actually been tested by someone else, and a retention that makes cooperation the profitable strategy. Two new concepts expanded to four in a Service Transition and Exit category, a twenty-third learning path and the Transition Control Lead award. The curriculum is 86 functions across 29 modules, 545 step sequences and 409 quiz questions',
      'New Module 28: Supplier Innovation and Early Engagement - Shaping the Work Before It Is Priced - the part of the process that happens before a tender exists. Early supplier involvement, because most of the achievable value is decided while the requirement is still negotiable and only the market knows what is achievable - and because consultation, co-design and a bidder writing your specification are three different activities with three different risks. Innovation deal structure, because a pilot is an option on a thing rather than the thing itself: stage gates with evidence tests, kill criteria written beside the budget, a scale-up price agreed while you still have something to trade, and a free trial recognised as the supplier buying your design decision. And at board level, who owns what came out of it - background and foreground, field-of-use as a priced position rather than a clause, the data your operations generate on someone else platform, and the exit schedule answered before it is needed. Five new concepts in a Supplier Innovation and Early Engagement category, a twenty-second learning path and the Innovation Sourcing Lead award. The curriculum is 84 functions across 28 modules, 531 step sequences and 399 quiz questions',
      'New Module 27: Regulated and Constrained Markets - Where a Third Authority Has Standing - buying where someone who is not in the room has standing in the transaction. Qualifying a supplier to an evidential standard, because approval belongs to a site and a process rather than a corporate name, a certificate attests to a system and not to your line, and the expensive surprise is the change nobody told you about - so significance is defined by category with a notice period long enough to requalify. Controlled goods and clearances, because control follows the item or the technology and a drawing emailed abroad can be an export, because classification and screening fail independently, and because a materially cheap bid in a controlled category is usually a price that excludes an obligation. And at board level, continuity as a duty rather than a preference: the obligation reduced to one paragraph, the resilience options priced including the cheapest, an exit plan written for the uncooperative incumbent, and an annual exercise that turns a claim into dated evidence. Five new concepts in a Regulated and Constrained Markets category, a twenty-first learning path and the Regulated Market Lead award. The curriculum is 81 functions across 27 modules, 510 step sequences and 384 quiz questions',
      'New Module 26: Services Should-Cost and Negotiation Analytics - Rates, Risk and the Price Arc - joining Module 3 cost modelling to Module 9 services buying, which is where the money actually moves. The rate pyramid, because a blended day rate is a receipt and the distribution of hours across grades is the purchase: two bids within 3 percent on the blended figure were a third apart once the pyramids were rebuilt. Utilisation and the bench, because a rate funds on-costs, overhead and roughly four months of unbillable time before it funds margin, which is why a wage story can be an occupancy claim. Commercial structure as a risk transfer with a price on it - fixed price buys certainty and costs scope rigidity, time and materials buys redirection and needs a cap and a burn report, a retainer sells availability that should be measured in days used, and a gainshare without an agreed baseline, a method and a named measurer is a dispute with a payment attached. And at executive level, the price arc rather than the entry rate: a five-year deal signed 6 percent under the incumbent and stepped up against an unclosed index is not a saving, it is a discount in year one. Five new concepts in a Services Cost and Negotiation Analytics category, a twentieth learning path and the Services Cost Analyst award. The curriculum is 78 functions across 26 modules, 489 step sequences and 369 quiz questions',
      'A new kind of gate: the surface check (`npm run surfaces`) asks the running application whether the newest content reaches a learner at all - hub listing, lesson render, every declared relation resolving, lab links, search by title and by concept name, an exam bank for the newest module, a learning path claiming its lessons, and the governing SOP rendering as a procedure. Thirty-eight checks, derived from the data rather than pinned to a module number, so the next tranche is covered the moment it lands. It exists because every other content check proves the data agrees with itself',
      'The embedded emblem is now a 256-colour PNG instead of truecolour: 27.4 KB of base64 that gzip cannot compress, because PNG output is already deflated, was the single largest non-content item in the product at 29.5 KB of bundle. The palette copy is 8.2 KB and returns 18.9 KB of compressed bundle at RMSE 0.0096 - invisible at the 24 to 32 px the brand mark and the favicon are drawn at, and 64 colours and a smaller raster were rejected as too lossy for a brand asset',
      'New Module 25: Public and Regulated Tendering - Lots, Criteria, Low Bids and Challenges - the mechanics that decide an award before anyone reads a bid. Lotting and call-off architecture, because the size and number of prizes choose the competing population ahead of any qualification criterion, because bid-by-lot, combined award and a cap on lots won are behavioural rules that must exist before effort is spent, and because a framework that stops competing its call-offs has become a subscription. Award criteria and weightings, because selection, award and exclusion are three different tests and scoring a capability requirement is a defect with a name, because a sub-weight that would change a response should have been published, and because a bid materially below your own estimate is a question about assumptions rather than a saving. Standstill, debrief and challenge at executive level, because the mandatory pause is the moment an error is still cheaper to fix than to undo, because a score is a result while the duty is the reasoning, and because signing inside the window is what puts a contract at risk of being treated as ineffective. Five new concepts in a Public and Regulated Tendering category, a nineteenth learning path and an award. The curriculum is 75 functions across 25 modules, 468 step sequences and 354 quiz questions',
      'A controlled procedure where Module 25 pointed: the Regulated Tender Design and Award Defence SOP, eight steps each with an owner, an output and a control - testing the requirement for division and recording why each lot exists, fixing the bid and award rules before effort is spent, setting weights and the disclosure line together, anchoring the scale before bids arrive, enquiring into an implausible price, writing the rationale and the notice as one act, holding the signature through the mandatory period, and retaining the file so a sample can be tested. The SOP library is now 21 documents holding 167 procedure steps',
      'Payload claims are now measured rather than remembered, and the difference matters: the readable file a user downloads is budgeted against the 1,152 KB transfer ceiling while the minified build the deployment serves is budgeted against 979 KB, and the documents had been pairing one number with the other ceiling - which made the remaining headroom look like a third of what it is. The drift gate now measures both sizes and refuses a sentence that quotes a figure against the wrong ceiling',
      'New Module 24: Supplier Financial Distress, Turnaround and Exit - what happens to a supplier while the contract is still live, which no earlier module covered. Reading financial health as timing rather than as a grade (the operating cycle, interest cover, what a credit agency grade and a bank reference actually measure, the honest limits of a scoring model); the ladder of contingency response that turns a signal cluster into dated, funded actions, including the assets on someone else\u2019s site that nobody documented while there was time; and the rescue or replace decision, with what an insolvency returns, why a change of control is a change of counterparty, and how to report a failure so the next one is priced rather than absorbed. Five new concepts in a Supplier Distress and Recovery category, an eighteenth learning path and an award. The curriculum is 72 functions across 24 modules, 447 step sequences and 339 quiz questions',
      'The Academy hub now answers where you stand, not just how much you have read. A readiness panel splits mastery across the three altitudes - Foundation, Practitioner, Executive - with a bar for each, and carries alongside it the next lesson to read, how many are due for review today, and how many quiz answers are still unsettled, with the most pressing principle named. Every figure is read from the same records the rails, the review queue and the reflection use, so the hub cannot show a second number for one fact - and on a fresh install it says zero out loud rather than hiding the row',
      'New Module 23: Artificial Intelligence, Model Services and Data Licensing - three lessons on how these products are actually sold. Model services, because total cost is a rate multiplied by tokens per completed task and the second factor is your architecture, not their price list; because a leaderboard score is not a measurement on your work; and because the switching cost usually sits in the vector index rather than in the contract. Data licensing, because you receive records but buy permissions, so analysis, publication, embedding and model training are four different grants, and because provenance is what lets you prove entitlement years later when the supplier and the project owner have both moved on. Supplier assurance, because a probabilistic service cannot be specified into compliance - so the governance object becomes the evidence you require, the baseline you keep, the named human who would still sign the decision, and the fallback that exists before the outage rather than during it. Six new concepts in a new AI and Data Markets category, a learning path and an award. The curriculum is 69 functions across 23 modules, 426 step sequences and 324 quiz questions',
      'Reflection (#/reflection) reads your quiz answers back as judgement gaps, not as a score. The Academy already stored which option you chose on every question and whether you needed the tactical tip before getting it right, so this page separates four states - right first time, got there with coaching, still wrong, and simply not attempted - ranks the principles you have not settled, and lists the lessons to revisit with a link into the practice tab of each. A recovered answer is counted as progress rather than failure, and an unanswered question is never counted as a weakness',
      'New Module 22: Category Depth II - Energy, Works and Creative Markets - three markets where the general playbook actively misleads. Energy, because the delivered bill is commodity plus network plus policy plus metering and only one line is negotiable, and because a fixed price is an option you pay for rather than a safe harbour. Works, because the form of contract decides who carries quantity, design and ground risk before a single bid arrives, and because a tender well under the cost plan is a set of assumptions rather than a saving. Marketing, because the mark-up on third-party spend can exceed the fee being negotiated, and because attribution measures activity while only a test measures effect. Six new concepts in the Markets and Categories domain, a new learning path and a new award. The curriculum is 66 functions across 22 modules, 405 step sequences and 309 quiz questions',
      'The count of learning paths is now a pinned number asserted by the build, because the documents had been quoting a figure the data did not hold for several cycles - prose that counts something is only a claim until a gate checks it',
      'Finished lessons come back instead of evaporating: a review queue (#/revise) puts a dated interval on everything you have studied. A passed quiz earns 7, 21, 60 and 180 day gaps; a shaky or missing one earns 3, 14 and 45, and each review you mark moves the lesson up its ladder. The Academy hub states what is due, the What to learn next page picks it up, and completions recorded before dates existed are labelled as measured from today rather than backdated. The page also says in plain terms that these intervals are a teaching convention, not a measurement of how fast you personally forget',
      'New Module 21: Sustainable and Responsible Sourcing - Carbon, Circularity and Social Value - where the emissions actually sit and what a spend-based proxy can and cannot support, how a returnable system or a remanufactured part has to be priced per cycle achieved rather than per unit bought, and what the labour and due diligence rules now in force expect as evidence rather than as a signed code of conduct. Comes with six new concepts in a Sustainable and Responsible Sourcing category, the Sustainable Sourcing Verification SOP, a matching learning path and an award. The curriculum is 63 functions across 21 modules, 384 step sequences and 294 quiz questions',
      'Every worked example now says what it is, where it lives: the lesson example card, the calculator example panel, the KPI worked example and every scenario page carry a line stating that the company, figures and outcome are constructed for teaching - illustrative, not reports of real organisations. A gate now fails the build if any of those surfaces loses the label',
      'The front door is authored now: the home and dashboard headline uses the reading face, learning-path and lesson cards are set the same way, and empty states say more kindly what to do next',
      'Every lesson now states where its material comes from: examples are labelled Illustrative rather than real-world, and a provenance note says the lessons are written for this product and the figures are constructed to show how a mechanism behaves - not reports of real organisations or verified benchmarks',
      'A new controlled procedure where the curriculum had been pointing at a checklist: the Contract Change Control SOP, seven steps each with an owner, an output and a control. The SOP library is now 16 documents holding 125 procedure steps',
      'The five modules that had only two lessons each now have three: supplier onboarding and segmentation, concessions and the negotiation record, contract types and indexation and the renewal window, requisition intake and the approval matrix, and corrective action and the business review. The curriculum is 48 functions, 279 step sequences and 219 quiz questions',
      'Inside a lesson: a section jump bar on the mission tab, a closing block that lists what is still to do in this lesson and holds the mark-as-studied control on every tab (it used to exist only inside the laboratory tab), and previous and next lesson as cards naming the title and the function number rather than three arrows in a row. A new gate owns all three',
      'Browsing a library is navigable now: a live result count that moves with the filter, a sticky category jump bar on any library with more than three categories, and group headers that read as sections rather than small headings. In-page jumps go through a scroll action, because this app routes on the hash and a plain anchor link would be read as a route change',
      'The Academy hub got a way in: a sticky module index listing all seventeen modules with each module\'s mastered count, a status filter (Not started / Quiz taken / Mastered) that composes with the level filter instead of resetting it, and a per-module line saying how many lessons and how many minutes each module holds. Four new assertions check the filters against the completion record, so a strip that counts something the cards do not show now fails the build',
      'The lesson reads like a long-form article now: a reading progress bar rides the sticky tab rail so you always know how much of a lesson is behind you, and the home page featured thinking point rotates daily through the curriculum\'s authored thinking points - each one linking straight to the lesson it came from - instead of showing every visitor the same quote',
      'New Module 20: Procurement Fraud, Collusion and the Controls That Catch It - the fraud triangle applied to buying, the vendor-master and payment-diversion controls that catch it, bid rigging patterns and the twin-bid test, and what to do in the first week after a finding. Comes with six new concepts in a Fraud and Assurance category, a Vendor Master Integrity SOP, a matching assurance track and an award. The curriculum is 60 functions across 20 modules, 363 step sequences and 279 quiz questions',
      'New users start at zero. The spend model used to open on a four-category demo portfolio that read as your own numbers; it now opens empty, and the worked example is one explicit click away when you want it',
      'New Module 19: The Finance of Procurement - Cash, Terms and Value - payment terms read as a financial instrument instead of a concession, the cash conversion cycle and the part of it procurement actually controls, and supply chain finance with the ethics of pushing your own balance sheet onto a smaller supplier. The curriculum is 57 functions across 19 modules, 342 step sequences and 264 quiz questions, with a matching finance track and award',
      'New Module 18: Disruption, Emergency Buying and Allocation - the pre-agreed fast route with a clock instead of a market check, how allocation actually works and what moves your position in it, and the three closures that decide whether anything changes afterwards. The curriculum is 54 functions across 18 modules, 321 step sequences and 249 quiz questions',
      'Two controlled procedures the required library named and the product did not have: the Supplier Onboarding SOP (ten steps, from tier assignment to the readiness gate) and the Savings Validation SOP (nine steps, from an agreed baseline to the annual re-baseline). The SOP library is now 18 documents holding 143 procedure steps',
      'New Module 17: Global Sourcing Operations - Supplier Development where substitution is impossible, conformity verification and the audit that finds a process gap rather than a missing signature, and the portfolio decision of which lines are worth a second source, a shorter supply line or a buffer. The curriculum is 51 functions across 17 modules, 300 step sequences and 234 quiz questions',
     'Role recommendations now show six modules instead of four. The hub was displaying four while the gate measured coverage at five, so a module reachable only as the fifth pick was counted as recommended and never shown to anyone - the test was proving something the interface did not do',
      'New Module 16: Contract Risk, Claims and Disputes - the obligation register that turns a signed agreement into owned dated duties, the change mechanism that stops a negotiated discount being given back through variations, and the commercial judgement of whether a claim is worth pursuing. The curriculum is now 43 functions across 16 modules, 244 step sequences and 194 quiz questions, with a matching learning track and a badge',
      'A new design system: a warm-neutral canvas, one jade accent in place of the old indigo, and a dark navigation rail that stays put in both themes so the menu reads as furniture rather than as another panel. Every colour now comes from a token, in both light and dark',
      'The lesson finally looks like a lesson. Body text is set in a serif reading face at 16-17px with a capped measure, section headings are typographic rather than UI labels, and the five lesson tabs stick under the top bar so you always know where you are in a long mission',
      'Type scale raised across the product - 15px to 16px base, page titles at 2rem, stat numbers at 2rem in solid ink instead of gradient-clipped text that washed out in dark mode',
      'The content column uses the viewport: 1,440px instead of 1,240px, with a separate reading measure for prose, so a dashboard fills the screen and a paragraph does not run 110 characters',
      'Charts are now theme-aware. An SVG attribute cannot read a CSS variable, so the graphs used to keep their light-theme ink when the page went dark; they now resolve the palette at render time',
      'Hard-coded colours removed from generated markup - the mastered tick, the unlocked badge, the risk meter and the winning bid column were painted in fixed hexes that were near-invisible on the dark canvas',
      'Forms, tables and result panels come up from 13-14px: inputs at .95rem, table cells at .9rem, result values at 1.4rem, the headline figure at 1.95rem, and the calculator input pane widened to 440px',
      'A new gate owns the theme: no inline colour may be written into a page outside a token, charts must resolve their palette through the theme function, the navigation rail must be painted from its six tokens, and the lesson prose must actually carry the reading face. It found three offenders the eye had missed',
      'Cards, buttons and tiles share one motion language: a 1-2px lift on hover, a short staggered entrance on load, all of it collapsed to nothing under prefers-reduced-motion',
      'The glossary is complete: all 45 terms now carry outgoing links, including EBITDA, working capital, cost-to-serve and run-rate, and a gate fails if a term ever ships without somewhere to go'
    ]
  },
  {
    version: '2.7',
    date: '2026-11-02',
    title: 'The markets the general method does not cover',
    tag: 'Improvement',
    items: [
      'New Module 15: Specialised Markets and Category Depth - Freight, Duty and the True Landed Cost; Regulated and Public Procurement; Contingent Workforce, Agencies and Professional Services. The curriculum is now 40 functions across 15 modules, 223 step sequences and 179 quiz questions',
      'Six new knowledge concepts in a domain the library did not have (Markets & Categories): freight modes, customs and duty, landed-cost modelling, public procurement rules, agency scope and contingent workforce',
      'Two full controlled procedures added where none existed - the Freight, Duty and Customs Clearance SOP and the Contingent Workforce and Managed Services SOP - so the SOP library is 15 documents holding 118 procedure steps, each with an owner, an output and a control',
      'Six new glossary terms, and these ones carry relations, so the "Where to use it" column finally renders for them - proof that the column was a data gap rather than a code gap',
      'Recognition completed: two new badges cover the foundation and cost-analysis lessons that no badge could previously be earned from, so all 40 functions now contribute to at least one award, and G24 fails if a lesson is ever left out again',
      'The Academy hub now shows where you are: a progress rail in every module header, a summary line above the curriculum ("you have mastered 5 of 40 functions across 15 modules - about 11.5 hours of lessons left"), and a position line on every lesson ("Lesson 9 of 40 - 1/3 of this module mastered"). G27 compares each rail count and bar width against the completion record, so a progress bar that disagrees with the data fails the build',
      'Role recommendations now name up to five modules instead of four, which is what keeps every module reachable by some role as the curriculum grows'
    ]
  },
  {
    version: '2.6',
    date: '2026-11-02',
    title: 'The craft that makes the other modules happen',
    tag: 'Improvement',
    items: [
      'New Module 14: Stakeholder Influence, Internal Consulting & Change Adoption - three lessons on mapping who actually decides, building an ask someone can grant, and keeping a booked saving alive past year one. The curriculum is now 37 functions across 14 modules, 200 step sequences and 164 quiz questions',
      'A matching learning track (Stakeholder Influence & Change Adoption), a new badge, workbench links for all three lessons, and role recommendations that now point at Module 14',
      'Practice exams can no longer be submitted with questions blank: an unanswered question scores zero, so Submit now takes you to the first blank instead of recording an attempt that looks like a result',
      'The exam result no longer shows the pass mark as a stat tile beside your score. It said "70%" in the same size and colour as your own number, and people read it as a score. The pass mark is now a caption on the score, and the fourth tile is how many questions you answered',
      'Attempt history records answered-of-total and labels blanks, so a 0% row is never mistaken for a sat exam',
      '"Certification exams" is now "Practice exams" everywhere - page, sidebar, command palette, dashboard tile, tips and the data-purge list. This product issues no credentials, and its own vocabulary should not imply otherwise',
      'The footer was rebuilt around the Digi Tracks brand with www.digitracks.net, grouped links and a plain-language privacy line; the sidebar lost its duplicate padlocked privacy notice and the account row is now one clean clickable line'
    ]
  },
  {
    version: '2.5',
    date: '2026-11-02',
    title: 'The curriculum grew up, and the toolkit was proved against itself',
    tag: 'Improvement',
    items: [
      'The Academy now teaches 34 functions across 13 modules: Advanced Category & Portfolio Strategy (the tail, supply market structure, demand management) and Executive & Board-Level Procurement (operating model and cost-to-serve, the value narrative, transformation sequencing) - 179 step sequences and 148 quiz questions in total',
      'Nine functions that had been orphaned - three from Module 11 and six from Modules 12 and 13 - now belong to a learning track, so the seven tracks cover every function in the curriculum exactly once',
      'Three new badges for the senior material, and every badge now declares which functions earn it, so a renamed lesson breaks a gate instead of quietly making an award impossible',
      'The role recommendation was fixed in two ways: Modules 12 and 13 had never been in the tag map so no role could be pointed at them, and the picker was taking every module that matched a tag rather than the first, which had left Module 5 and Module 8 recommended by nobody at any version',
      'Restore is hostile-file safe: a backup JSON sent by someone else could carry a __proto__ key and replace the prototype of your stored settings, which for this product means it could choose your tax rate and costing defaults. Nothing executed; the numbers were simply not yours',
      'A storage suite where there was none: saved work, rename, duplicate, delete, the 250 and 50-item caps, favourites, recents, checklist and template state, the 100-event audit cap, workbench records, every way a bad backup file can be refused, and a real reload - the records are written, the page is reloaded from the bytes the browser kept, and they are read back',
      'The audit page now shows the content-quality report the build already computed and previously only wrote to the developer console',
      'Exam results, badges and the transcript page say plainly that Procure Sherpa certifies nothing and that no third party can verify a result',
      'Every calculator handoff, workbench link and internal reference still resolves, and the whole suite is 25 integrity gates over 100 assertions'
    ]
  },
  {
    version: '2.4',
    date: '2026-10-20',
    title: 'The application says what it actually does',
    tag: 'Major',
    items: [
      'Navigation rebuilt as two views of one profile field: a learner sees 5 sections and 26 items, a practitioner 6 and 30, and the page you are on is always in the menu',
      'Eight workbenches, so the toolkit holds your own suppliers, contracts, catalogue, receipts, budget lines, approvals, sourcing events and analytics as records rather than only teaching about them',
      'The curriculum grew to 11 modules and 28 functions, and every function now links into the SOPs, calculators, checklists and templates it teaches',
      'The role recommends modules instead of scattering them: the curriculum reads 1 to 11 for every profile',
      'Truth restoration: the maturity check, the lifecycle map, the assessment score, 27 of 41 cross-tool handoffs and the backup restore path all worked again',
      'Every Academy function shows its worked example in the explanation, and every calculator offers random values that respect each field rule',
      'The build carries a stamp: a hash of the source fragments, readable in both the artifact and the deployed minified build',
      'A verification gate that can actually fail: 20 integrity gates, route smoke across 72 renders, and the whole suite re-run against the minified build'
    ]
  },
  {
    version: '2.3',
    date: '2026-10-08',
    title: 'Learning hub for procurement enthusiasts',
    tag: 'Major',
    items: [
      'Skill assessment: ten questions that place you on a 1-5 level and shape your learning path',
      'Learning paths: three tracks from foundations to strategic leadership',
      'Practice labs: supplier evaluation, negotiation, contract review and spend analysis, each with feedback',
      'Skill portfolio: your level across six competency areas with a copyable summary',
      'Daily tip and weekly challenge',
      'Career paths: the usual progression from analyst to CPO',
      'Community board for notes and questions, stored locally'
    ]
  },
  {
    version: '2.2',
    date: '2026-09-28',
    title: 'Robustness and quality',
    tag: 'Improvement',
    items: [
      'Unit tests for the core utilities (18 tests, under 100ms)',
      'JSDoc type annotations across the core API',
      'Storage usage bar in Settings, with a warning near the quota',
      'Calculator validation at startup: missing implementations and broken examples are reported',
      'Global handlers for uncaught errors and failed promises',
      'Browser support stated plainly: evergreen browsers, ES2015+ built-ins'
    ]
  },
  {
    version: '2.1',
    date: '2026-09-20',
    title: 'Intelligence and automation',
    tag: 'Feature',
    items: [
      'Procurement Copilot: answers questions from the bundled knowledge base, with citations',
      'Certification exams: timed, randomised, with pass marks and attempt history',
      'Spend data model: one category-supplier hierarchy feeding the Pareto and Kraljic charts',
      'Document pack builder: assemble RFI/RFP/contract packs with a cover sheet',
      'What-if analysis on any calculator, with saveable scenario trees',
      'Static share pages for any route'
    ]
  },
  {
    version: '2.0',
    date: '2026-09-16',
    title: 'First release',
    tag: 'Release',
    items: [
      'Procurement Academy with 19 competency modules, quizzes and badges',
      '19 financial and operational calculators',
      '13 SOPs, 27 checklists and 33 templates',
      'Decision guides, KPIs, glossary and guided scenarios',
      'Universal search with a Ctrl+K command palette',
      'Savings dashboard, maturity assessment, saved work, favorites and backup/restore'
    ]
  }
];

PS.whatsNew.seenVersion = function () {
  return PS.store.get('whatsnew_seen', '');
};

PS.whatsNew.markSeen = function () {
  PS.store.set('whatsnew_seen', PS.VERSION);
};

PS.route('whats-new', function () {
  PS.pageTitle = "What's new";
  PS.whatsNew.markSeen();

  var html = '<div class="card">' +
    '<div class="card-head"><h1>What\'s new</h1>' +
    '<div class="spacer"></div><span class="badge">v' + PS.esc(PS.VERSION) + '</span></div>' +
    '<p class="lead">Every release, newest first. Yours is marked.</p>' +
    '</div>';

  PS.whatsNew.CHANGES.forEach(function (c) {
    var tagColor = c.tag === 'Major' ? 'var(--scen-soft);color:var(--scen)'
      : (c.tag === 'Feature' ? 'var(--accent-soft);color:var(--accent)'
        : (c.tag === 'Improvement' ? 'var(--ok-soft);color:var(--ok)' : 'var(--sunken);color:var(--mute)'));
    var isCurrent = c.version === PS.VERSION;
    html += '<div class="card" style="' + (isCurrent ? 'border-left:4px solid var(--accent)' : '') + '">' +
      '<div class="card-head"><div><h2 style="margin-bottom:2px">v' + PS.esc(c.version) + ': ' + PS.esc(c.title) + '</h2>' +
      '<div style="display:flex;gap:8px;align-items:center">' +
      '<span class="badge" style="background:' + tagColor + '">' + PS.esc(c.tag) + '</span>' +
      '<span class="note">' + PS.esc(c.date) + '</span>' +
      (isCurrent ? '<span class="badge" style="background:var(--accent-soft);color:var(--accent)">Your version</span>' : '') +
      '</div></div></div>' +
      '<ul style="margin-top:10px;padding-left:20px">' +
      c.items.map(function (item) { return '<li style="margin-bottom:6px">' + PS.esc(item) + '</li>'; }).join('') +
      '</ul></div>';
  });

  return html;
});
