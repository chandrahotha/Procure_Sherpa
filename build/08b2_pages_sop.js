/* ---------- SOP pages (Section 19, 20, 37, 70) ---------- */
PS.route('sop', function (id) {
  var it = PS.byId('sop', id);
  if (!it) return PS.notFound('SOP', id);
  PS.currentItem = { type: 'sop', id: id, item: it };
  PS.pageTitle = it.title;
  PS.recent.add('sop', id, it.title);
  var html = PS.reportHead(it.title, 'SOP \u00B7 ' + (it.cat || '')) +
    '<div class="card">' +
    '<div class="card-head"><h1>' + PS.esc(it.title) + '</h1><div class="spacer"></div>' +
    PS.badge('sop') + '<span class="badge">' + PS.esc(it.cat || 'General') + '</span></div>' +
    (it.desc ? '<p class="lead">' + PS.esc(it.desc) + '</p>' : '') +
    PS.actionsBar([
      '<button type="button" class="btn" data-act="print">Print / PDF this SOP</button>',
      it.checklist && PS.byId('cl', it.checklist) ? '<a class="btn btn-ghost" href="#/cl/' + PS.esc(it.checklist) + '">Open checklist standalone</a>' : ''
    ]) +
    (it.tags ? PS.tagsRow(it) : '') +
    '</div>' +
    '<div class="grid grid-2">' +
    PS.sopFacts(it) +
    '<div class="card"><h2>Purpose and scope</h2>' +
    '<p><strong>Purpose:</strong> ' + PS.esc(it.purpose) + '</p>' +
    '<p><strong>Scope:</strong> ' + PS.esc(it.scope) + '</p>' +
    '<p><strong>Trigger:</strong> ' + PS.esc(it.trigger) + '</p>' +
    (it.roles ? '<p><strong>Roles involved:</strong> ' + PS.esc(it.roles) + '</p>' : '') +
    (it.frequency ? '<p><strong>Typical frequency:</strong> ' + PS.esc(it.frequency) + '</p>' : '') +
    '</div></div>' +
    '<div class="card"><h2>Process</h2>' +
    (it.flow ? '<div class="flow">' + it.flow.map(function (s, i) {
      return '<span class="flow-step">' + PS.esc(s) + '</span>';
    }).join('<span class="flow-arrow">&#8594;</span>') + '</div>' : '') +
    '<ol class="timeline">' + (it.steps || []).map(function (s) {
      return '<li><div class="tl-title">' + PS.esc(s.s) + '</div>' +
        '<div class="tl-body">' + PS.esc(s.d) + '</div>' +
        ((s.role || s.out) ? '<p class="note">' + (s.role ? 'Responsible: ' + PS.esc(s.role) + '. ' : '') +
          (s.out ? 'Output: ' + PS.esc(s.out) : '') + '</p>' : '') + '</li>';
    }).join('') + '</ol></div>' +
    PS.sopDetails(it) +
    PS.sopChecklistBlock(it) +
    PS.relatedCard('sop', it) +
    PS.disclaimer(it.disclaimerKind || 'policy');
  return html;
});
PS.sopFacts = function (it) {
  return '<div class="card"><h2>At a glance</h2>' +
    PS.kv([
      ['Process group', it.cat],
      ['Typical duration', it.duration || 'Varies with value and complexity'],
      ['Key inputs', (it.inputs || []).length + ' defined inputs'],
      ['Steps', (it.steps || []).length],
      ['Decision points', (it.decisions || []).length],
      ['Controls', (it.control || []).length],
      ['KPIs', (it.kpis || []).length],
      ['Records produced', (it.records || []).length]
    ]) +
    '<h3>Inputs</h3>' + PS.ul(it.inputs) +
    '<h3>Outputs</h3>' + PS.ul(it.outputs) + '</div>';
};
PS.sopDetails = function (it) {
  var blocks = '';
  if (it.decisions) blocks += PS.section('Decision points', PS.decisionList(it.decisions), { open: false });
  if (it.control) blocks += PS.section('Controls and approvals', PS.ul(it.control));
  if (it.kpis) blocks += PS.section('How this process is measured', PS.kpiLinks(it.kpis));
  if (it.records) blocks += PS.section('Records to retain', PS.ul(it.records));
  if (it.risks) blocks += PS.section('Process risks', PS.ul(it.risks));
  if (it.exceptions) blocks += PS.section('Exceptions and escalations', PS.ul(it.exceptions));
  if (it.mistakes) blocks += PS.section('Common mistakes', PS.ul(it.mistakes));
  return blocks ? '<div class="card"><h2>Controls, records and measurement</h2>' + blocks + '</div>' : '';
};
PS.decisionList = function (list) {
  return '<dl class="kv">' + list.map(function (d) {
    return '<dt>' + PS.esc(d.q || d.d) + '</dt><dd>' + PS.esc(d.a || '') + '</dd>';
  }).join('') + '</dl>';
};
PS.kpiLinks = function (ids) {
  var items = (ids || []).map(function (k) {
    var o = PS.byId('kpi', k);
    return o ? '<li><a href="#/kpi/' + encodeURIComponent(o.id) + '">' + PS.esc(o.title) + '</a> &mdash; <span class="muted">' + PS.esc(o.def) + '</span></li>' : '';
  }).join('');
  return items ? '<ul>' + items + '</ul>' : '';
};
PS.sopChecklistBlock = function (it) {
  var cl = it.checklist ? PS.byId('cl', it.checklist) : null;
  if (!cl) return '';
  var st = PS.clState.get(cl.id);
  var done = 0, total = 0;
  (cl.sections || []).forEach(function (s, si) {
    (s.items || []).forEach(function (x, i) { total++; if (st.checked[s.g + '|' + i]) done++; });
  });
  var pctv = total ? Math.round(done / total * 100) : 0;
  return '<div class="card"><div class="card-head"><h2>Embedded operational checklist</h2><div class="spacer"></div>' +
    '<span class="badge">' + PS.esc(cl.title) + '</span><a class="btn btn-sm" href="#/cl/' + PS.esc(cl.id) + '">Open full checklist</a></div>' +
    '<p class="card-sub">Ticking items here updates the same checklist: ' + done + ' of ' + total + ' complete (' + pctv + '%). Progress is stored in this browser.</p>' +
    '<div class="progress"><span style="width:' + pctv + '%"></span></div>' +
    (cl.sections || []).map(function (s, si) {
      return '<h4>' + PS.esc(s.g) + '</h4><div>' + (s.items || []).map(function (x, i) {
        var key = s.g + '|' + i;
        return '<label class="check"><input type="checkbox" data-act="cl-toggle" data-cl="' + PS.esc(cl.id) +
          '" data-item="' + PS.esc(key) + '"' + (st.checked[key] ? ' checked' : '') + '><span>' + PS.esc(x) + '</span></label>';
      }).join('') + '</div>';
    }).join('') + '</div>';
};