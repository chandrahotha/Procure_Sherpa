PS.homeHero = function () {
  return '<section class="hero">' +
    '<h1>PROCURE SHERPA</h1>' +
    '<p class="hero-sub">The Procurement Professional&rsquo;s Offline Toolkit</p>' +
    '<p>SOPs, procurement knowledge, calculators, checklists, templates and decision tools in one private workspace. Everything runs in this single file - no server, no account, no internet connection required.</p>' +
    '<div class="btn-row no-print">' +
    '<a class="btn" href="#/what">What should I do?</a>' +
    '<a class="btn" href="#/quickstart">Quick Start</a>' +
    '<a class="btn" href="#/list/calc">Calculators</a>' +
    '<a class="btn" href="#/list/sop">SOPs</a>' +
    '</div></section>';
};
PS.homeStart = function () {
  var steps = [
    { href: '#/what', t: '1. Say what you need', d: 'Type your problem in plain words. Procure Sherpa maps it to the right SOP, checklist and calculator.' },
    { href: '#/scenarios', t: '2. Follow the route', d: 'Worked scenarios show every step in order - open the tools as you go and tick steps off.' },
    { href: '#/saved', t: '3. Save and print', d: 'Save the analysis with your notes, print the report, back up your work.' }
  ];
  return '<h2 class="mb8">New here? Three steps</h2><div class="path no-print">' + steps.map(function (s) {
    return '<a class="path-step" href="' + s.href + '"><span class="path-num">' + PS.esc(s.t.charAt(0)) + '</span>' +
      '<span><div class="p-t">' + PS.esc(s.t.slice(3)) + '</div><div class="p-d">' + PS.esc(s.d) + '</div></span></a>';
  }).join('') + '</div>';
};
PS.homeTools = function () {
  return PS.homeStart() +
    '<div class="grid grid-2">' +
    '<div class="card"><div class="card-head"><h2>What do you need to do?</h2></div>' +
    '<p class="card-sub">Describe your situation in your own words - for example &ldquo;my supplier increased prices by 12 percent&rdquo; or &ldquo;I received three quotes&rdquo;. Procure Sherpa maps it to the process, SOP, checklist, calculator, template and report that fit.</p>' +
    '<div class="searchbox no-print">' +
    '<label class="sr-only" for="homeWhat">Describe what you need to do</label>' +
    '<input type="text" id="homeWhat" placeholder="I need to&hellip;" maxlength="160" data-act="home-what">' +
    '<button type="button" class="btn btn-primary" data-act="home-what-run">Guide me</button></div>' +
    '<div class="chips">' + (PS.QUICK_PROBLEMS || []).slice(0, 8).map(function (p) {
      return '<button type="button" class="chip" data-act="scenario-jump" data-q="' + PS.esc(p) + '">' + PS.esc(p) + '</button>';
    }).join('') + '</div></div>' +
    '<div class="card"><div class="card-head"><h2>Search everything</h2></div>' +
    '<p class="card-sub">SOPs, concepts, calculators, checklists, templates, KPIs, decision guides, glossary entries and examples - all indexed locally, working offline.</p>' +
    '<div class="searchbox no-print">' +
    '<label class="sr-only" for="homeQ">Search Procure Sherpa</label>' +
    '<input type="search" id="homeQ" placeholder="Try: price increase, RFQ, TCO, supplier risk&hellip;" maxlength="120">' +
    '<button type="button" class="btn btn-primary" data-act="home-search">Search</button></div>' +
    '<div class="chips">' + (PS.suggestTerms || []).slice(0, 8).map(function (t) {
      return '<a class="chip" href="#/search?q=' + encodeURIComponent(t) + '">' + PS.esc(t) + '</a>';
    }).join('') + '</div>' +
    '<p class="note">Tip: press <kbd>Ctrl</kbd>+<kbd>K</kbd> anywhere to jump into search.</p></div></div>' +
    '<h2>Quick-start scenarios</h2>' +
    '<p class="note mb8">A scenario is a guided journey: each step links the exact SOP, checklist or calculator for that stage, with a progress tracker.</p>' +
    '<div class="grid grid-3">' + ((PS.data.scen || []).slice(0, 6).map(function (s) {
      return PS.tile('#/scen/' + encodeURIComponent(s.id), 'Scenario', s.title, s.problem || s.desc,
        { icon: PS.TYPE_META.scen.icon, acc: PS.TYPE_META.scen.acc, meta: (s.steps || []).length + ' steps', cta: 'Open the route' });
    }).join('') || '<p class="note">Loading scenario library.</p>') + '</div>' +
    '<div class="grid grid-3">' + PS.SECTION_TILES.map(function (t) { return PS.tile(t.href, t.k, t.t, t.d); }).join('') + '</div>';
};
PS.homeActivity = function () {
  var recent = PS.recent.list().slice(0, 5);
  var favs = PS.fav.list().slice(0, 6);
  var savedN = PS.saved.count();
  return '<div class="grid grid-2">' +
    '<div class="card"><div class="card-head"><h2>Recently used</h2><div class="spacer"></div>' +
    (recent.length ? '<button type="button" class="btn btn-sm" data-act="recent-clear">Clear list</button>' : '') + '</div>' +
    (recent.length ? '<ul class="res-list">' + recent.map(function (r) {
      return '<li>' + PS.badge(r.type) + '<span><a href="' + PS.routeFor(r.type, r.id) + '" class="res-title">' + PS.esc(r.title || r.id) + '</a></span></li>';
    }).join('') + '</ul>' : '<p class="note">Nothing yet. Pages you open are listed here for a quick return.</p>') + '</div>' +
    '<div class="card"><div class="card-head"><h2>Favorites</h2><div class="spacer"></div>' +
    '<a class="btn btn-sm" href="#/fav">Manage</a></div>' +
    (favs.length ? '<ul class="res-list">' + favs.map(function (f) {
      return '<li>' + PS.badge(f.type) + '<span><a href="' + PS.routeFor(f.type, f.id) + '" class="res-title">' + PS.esc(f.title || f.id) + '</a></span></li>';
    }).join('') + '</ul>' : '<p class="note">Use the &#9734; star in the top bar to keep tools, SOPs and templates here.</p>') +
    '<p class="note">' + savedN + ' item' + (savedN === 1 ? '' : 's') + ' saved in your local workspace. <a href="#/saved">Open saved work</a>.</p></div>' +
    '</div>' +
    '<div class="card"><h2>How Procure Sherpa connects the work</h2>' +
    '<div class="flow">' + ['Question', 'Concept', 'Process / SOP', 'Checklist', 'Calculator', 'Decision', 'Template', 'Report']
      .map(function (s) { return '<span class="flow-step">' + PS.esc(s) + '</span>'; }).join('<span class="flow-arrow">&#8594;</span>') + '</div>' +
    '<p class="note">Every concept links to the SOP that governs it, the checklist that proves it was done, the calculator that quantifies it, the template that documents it and the report that communicates it.</p>' +
    '<p class="note"><strong>Your procurement data stays on your device/browser.</strong> Nothing is transmitted, there is no analytics, no account and no cloud dependency.</p></div>';
};