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
  return PS.homeWelcomeCard() +
    PS.homeDualHub() +
    PS.homePhase11() +
    PS.homeSmartResume() +
    PS.homeQuickActions() +
    PS.homeThinkingPoint() +
    PS.disclaimer('policy');
});

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
