/* ---------- knowledge concept pages (Section 10, 38, 61) ---------- */
PS.route('k', function (id) {
  var it = PS.byId('kb', id);
  if (!it) return PS.notFound('concept', id);
  PS.currentItem = { type: 'kb', id: id, item: it };
  PS.pageTitle = it.title;
  PS.recent.add('kb', id, it.title);
  var html = PS.reportHead(it.title, 'Procurement concept \u00B7 ' + (it.cat || '')) +
    '<div class="card">' +
    '<div class="card-head"><h1>' + PS.esc(it.title) + '</h1><div class="spacer"></div>' +
    PS.badge('kb') + '<span class="badge">' + PS.esc(it.cat || 'General') + '</span></div>' +
    '<div class="alert alert-info"><strong>Definition</strong>' + PS.esc(it.def) + '</div>' +
    (it.tags ? PS.tagsRow(it) : '') +
    '</div>' +
    PS.actionsBar(['<button type="button" class="btn btn-ghost" data-act="content-markdown">Copy as Markdown</button>']) +
    '<div class="grid grid-2">' +
    '<div class="card"><h2>Why procurement cares</h2>' + PS.ul(it.why) + '</div>' +
    '<div class="card"><h2>When it is used</h2>' + PS.ul(it.when) + '</div>' +
    '</div>' +
    '<div class="card"><h2>How it works</h2>' + PS.ul(it.how) +
    (it.stages ? PS.stagesList(it.stages) : '') + '</div>' +
    (it.ex ? '<div class="card"><h2>Practical example</h2><div class="alert"><strong>Example</strong>' + PS.esc(it.ex) + '</div></div>' : '') +
    '<div class="grid grid-2">' +
    '<div class="card"><h2>Risks to manage</h2>' + PS.ul(it.risks) + '</div>' +
    '<div class="card"><h2>Common mistakes</h2>' + PS.ul(it.mistakes) + '</div>' +
    '</div>' +
    (it.practice ? '<div class="card"><h2>What procurement actually does</h2>' + PS.ul(it.practice) + '</div>' : '') +
    (it.rel && it.rel.kb ? '' : '') +
    PS.relatedCard('kb', it) +
    PS.disclaimer(it.disclaimerKind || 'data');
  return html;
});
PS.stagesList = function (stages) {
  return '<ol class="timeline">' + stages.map(function (s) {
    return '<li><div class="tl-title">' + PS.esc(s.t) + '</div><div class="tl-body">' + PS.esc(s.d) + '</div></li>';
  }).join('') + '</ol>';
};
/* ---------- procurement lifecycle (Section 12) ---------- */
PS.route('lifecycle', function () {
  PS.pageTitle = 'Procurement Lifecycle';
  var stages = PS.LIFECYCLE || [];
  var html = PS.reportHead('Procurement lifecycle', stages.length + ' stages') +
    '<div class="card"><h1>Procurement lifecycle</h1>' +
    '<p class="lead">Twenty-one stages from identifying a requirement to closing out the record. Each stage links to the governing SOP, the knowledge that explains it and the calculator that quantifies it.</p>' +
    '<div class="flow">' + stages.map(function (s, i) {
      var kb = (PS.data.kb || []).filter(function (k) { return k.id === s.kb; })[0];
      return '<a class="flow-step" href="' + (kb ? '#/k/' + encodeURIComponent(kb.id) : '#/list/kb') + '" title="' + PS.esc(s.summary || '') + '">' +
        (i + 1) + '. ' + PS.esc(s.name) + '</a>';
    }).join('<span class="flow-arrow">&#8594;</span>') + '</div>' +
    '<p class="note">The lifecycle is a reference model, not a mandated sequence. Your organization may run stages in parallel, split them across teams or skip some for low-value purchases - document what you did and why.</p></div>' +
    '<ol class="timeline">' + stages.map(function (s) {
      var kb = (PS.data.kb || []).filter(function (k) { return k.id === s.kb; })[0];
      var sop = (s.sop && PS.byId('sop', s.sop)) ? PS.byId('sop', s.sop) : null;
      var calc = (s.calc && PS.byId('calc', s.calc)) ? PS.byId('calc', s.calc) : null;
      return '<li><div class="tl-title">' + PS.esc(s.name) + '</div>' +
        '<div class="tl-body">' + PS.esc(s.summary || '') + '</div>' +
        '<div class="chips" style="margin-top:6px">' +
        (kb ? '<a class="chip" href="#/k/' + encodeURIComponent(kb.id) + '">Concept: ' + PS.esc(kb.title) + '</a>' : '') +
        (sop ? '<a class="chip" href="#/sop/' + encodeURIComponent(sop.id) + '">SOP: ' + PS.esc(sop.title) + '</a>' : '') +
        (calc ? '<a class="chip" href="#/calc/' + encodeURIComponent(calc.id) + '">Calculator: ' + PS.esc(calc.title) + '</a>' : '') +
        '</div></li>';
    }).join('') + '</ol>' +
    PS.relatedCard('kb', { id: 'lifecycle', rel: { sops: ['sop-procurement-lifecycle'], calcs: ['calc-compare-quotes'], cl: ['cl-procurement-intake'] } }) +
    PS.disclaimer('data');
  return html;
});