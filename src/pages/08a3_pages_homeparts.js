PS.homeHero = function () {
  var n = function (arr) { return (arr || []).length; };
  var stats = [
    { v: n(PS.data.kb), l: 'Concepts', h: '#/list/kb' },
    { v: n(PS.data.sop), l: 'SOPs', h: '#/list/sop' },
    { v: n(PS.data.calc), l: 'Calculators', h: '#/list/calc' },
    { v: n(PS.data.tpl), l: 'Templates', h: '#/list/tpl' },
    { v: PS.saved.count(), l: 'Saved', h: '#/saved' },
    { v: PS.fav.list().length, l: 'Pinned', h: '#/fav' }
  ];
  return '<section class="dash-head">' +
    '<div class="dash-eyebrow-row"><span class="eyebrow">Offline &middot; private by design</span>' +
    '<span class="dash-date">' + PS.esc(PS.dateStr()) + '</span></div>' +
    '<h1>Procurement command center</h1>' +
    '<p class="dash-sub">SOPs, knowledge, calculators, checklists, templates and decision tools — one workspace on this device. No server, no account, no tracking.</p>' +
    '<div class="searchbox dash-search no-print">' +
    '<label class="sr-only" for="homeQ">Search Procure Sherpa</label>' +
    '<input type="search" id="homeQ" placeholder="Search knowledge, SOPs, calculators, checklists, templates, KPIs…" maxlength="120" aria-label="Search Procure Sherpa">' +
    '<button type="button" class="btn btn-primary" data-act="home-search">Search</button></div>' +
    '<div class="btn-row no-print">' +
    '<a class="btn btn-primary" href="#/what">What should I do?</a>' +
    '<a class="btn" href="#/list/calc">Calculators</a>' +
    '<a class="btn" href="#/list/sop">SOPs</a>' +
    '<a class="btn btn-ghost" href="#/quickstart">Quick Start</a>' +
    '</div>' +
    '<div class="stats">' + stats.map(function (s) {
      return '<a class="stat" href="' + s.h + '"><span class="s-val">' + s.v + '</span><span class="s-lab">' + s.l + '</span></a>';
    }).join('') + '</div>' +
    '</section>';
};
PS.homeHub = function () {
  var count = function (ct) {
    if (!ct) return '';
    var arr = ct === 'gloss' ? (PS.GLOSS || PS.data.gloss || []) : (PS.data[ct] || []);
    return arr.length ? arr.length + ' item' + (arr.length === 1 ? '' : 's') : '';
  };
  var cards = (PS.HUB_FLOW || []).map(function (c) {
    var m = PS.TYPE_META[c.ty] || {};
    return '<a class="tile hub-card ' + (m.acc || '') + '" href="' + PS.esc(c.href) + '">' +
      '<div class="tile-top">' +
      '<span class="t-ico" aria-hidden="true">' + m.icon + '</span>' +
      '<span class="hub-step" aria-hidden="true">' + c.step + '</span>' +
      (count(c.ct) ? '<span class="t-meta">' + PS.esc(count(c.ct)) + '</span>' : '') + '</div>' +
      '<div class="t-title">' + PS.esc(c.t) + '</div>' +
      '<p class="t-desc">' + PS.esc(c.d) + '</p>' +
      '<div class="t-cta">' + PS.esc(c.cta || 'Open') + ' <span aria-hidden="true">&rarr;</span></div></a>';
  }).join('');
  return '<div class="section-head"><h2>Modules — work in order</h2></div>' +
    '<p class="note mb8">Each step opens only its own related content. Nothing else is shown until you drill in.</p>' +
    '<div class="grid grid-4 hub-flow">' + cards + '</div>' +
    '<div class="util-links">Also: <a href="#/saved">Workspace</a> · <a href="#/scenarios">Scenarios</a> · ' +
    '<a href="#/glossary">Glossary</a> · <a href="#/quickstart">Quick Start</a> · ' +
    '<a href="#/help">Help</a> · <a href="#/settings">Settings</a></div>';
};
PS.homeContinue = function () {
  var recent = PS.recent.list().slice(0, 4);
  var favs = PS.fav.list().slice(0, 4);
  if (!recent.length && !favs.length) {
    return '<div class="card card-tight get-started"><div class="gs-steps">' +
      '<span class="gs-step"><span class="n">1</span>Describe your need</span>' +
      '<span class="gs-step"><span class="n">2</span>Follow the module</span>' +
      '<span class="gs-step"><span class="n">3</span>Save &amp; print</span></div>' +
      '<a class="btn btn-sm" href="#/quickstart">Take the tour</a></div>';
  }
  var li = function (x) {
    return '<li>' + PS.badge(x.type) + '<span><a href="' + PS.routeFor(x.type, x.id) + '" class="res-title">' +
      PS.esc(x.title || x.id) + '</a></span></li>';
  };
  return '<div class="grid grid-2">' +
    '<div class="card card-tight"><div class="card-head"><h2>Continue where you left off</h2></div>' +
    (recent.length ? '<ul class="res-list">' + recent.map(li).join('') + '</ul>'
      : '<p class="note mb0">Nothing opened yet.</p>') + '</div>' +
    '<div class="card card-tight"><div class="card-head"><h2>Pinned</h2><div class="spacer"></div>' +
    '<a class="btn btn-sm btn-ghost" href="#/fav">Manage</a></div>' +
    (favs.length ? '<ul class="res-list">' + favs.map(li).join('') + '</ul>'
      : '<p class="note mb0">Star any page with &#9734; to pin it here.</p>') + '</div></div>';
};
/* Retired home sections (kept as stubs so old calls render nothing): */
PS.homeStart = function () { return ''; };
PS.homeTools = function () { return ''; };
PS.homeActivity = function () { return ''; };
