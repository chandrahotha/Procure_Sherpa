/* ==========================================================
   Procure Sherpa - What's New
   Version history, newest first, so new features get found.
   ========================================================== */

PS.whatsNew = PS.whatsNew || {};

PS.whatsNew.CHANGES = [
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
