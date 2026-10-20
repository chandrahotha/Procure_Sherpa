/* ==========================================================
   Section L: page renderers
   Home = Command Center:
   - Personalized Local User Profile Welcome
   - Segregated Dual-Hub Gateway (Academy vs Operations)
   - Smart Workspace Resume
   - Featured Thinking Point
   ========================================================== */

PS.route('home', function () {
  PS.pageTitle = 'Command Center';
  return PS.homeStartHere() +
    PS.homeWelcomeCard() +
    PS.homeDualHub() +
    PS.homeQuickCalc() +
    PS.homePhase11() +
    PS.homeSmartResume() +
    PS.homeQuickActions() +
    PS.homeThinkingPoint() +
    PS.disclaimer('policy');
});

PS.homeQuickCalc = function () {
  var recent = PS.recent.list().filter(function (r) { return r.type === 'calc'; }).slice(0, 3);
  var popular = [
    { id: 'calc-tco', title: 'TCO' },
    { id: 'calc-compare-quotes', title: 'Compare Quotes' },
    { id: 'calc-landed-cost', title: 'Landed Cost' },
    { id: 'calc-negotiation-savings', title: 'Negotiation Savings' }
  ];
  var seen = {};
  recent.forEach(function (r) { seen[r.id] = 1; });
  var chips = popular.filter(function (c) { return !seen[c.id]; }).map(function (c) {
    return '<a class="btn btn-sm" href="#/calc/' + PS.esc(c.id) + '">' + PS.esc(c.title) + '</a>';
  }).join('');
  var recentChips = recent.map(function (r) {
    return '<a class="btn btn-sm btn-ghost" href="#/calc/' + PS.esc(r.id) + '">' + PS.esc(r.title || r.id) + '</a>';
  }).join('');
  if (!chips && !recentChips) return '';
  return '<div class="card no-print"><div class="card-head"><h2>Quick Calculator</h2>' +
    '<div class="spacer"></div><a class="btn btn-sm btn-ghost" href="#/list/calc">All 19 tools</a></div>' +
    '<div class="btn-row tight">' + recentChips + chips + '</div>' +
    '<p class="note mb0" style="margin-top:8px">Jump straight into the tools you use most. Results stay local.</p>' +
    '</div>';
};

PS.homePhase11 = function () {
  var cards = [
    { href: '#/copilot', ico: '🤖', title: 'Procurement Copilot', desc: 'Ask the offline assistant about concepts, processes and calculators - answers with citations.' },
    { href: '#/exams', ico: '📝', title: 'Certification Exams', desc: 'Timed, randomised exams from the Academy question bank with pass/fail grading.' },
    { href: '#/spend-model', ico: '📊', title: 'Spend Data Model', desc: 'One category-supplier hierarchy feeding the Pareto and Kraljic charts.' },
    { href: '#/docpack', ico: '📦', title: 'Document Pack Builder', desc: 'Assemble RFI / RFP / contract packs with a cover sheet and contents.' }
  ];
  return '<div class="card no-print"><div class="card-head"><h2>Intelligence &amp; Automation</h2>' +
    '<div class="spacer"></div><span class="badge">Phase 11</span></div>' +
    '<div class="phase11-grid">' +
    cards.map(function (c) {
      return '<a class="phase11-card" href="' + c.href + '"><span class="p11-ico">' + c.ico + '</span>' +
        '<span class="p11-title">' + PS.esc(c.title) + '</span>' +
        '<span class="p11-desc">' + PS.esc(c.desc) + '</span></a>';
    }).join('') +
    '</div></div>';
};
