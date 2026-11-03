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
