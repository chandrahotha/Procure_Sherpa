/* ---------- SOP pages: formal controlled-document layout (Section 19, 37, 70) ----------
   An SOP is a controlled procedure, not a checklist. Execution evidence
   lives in the Checklist library; the SOP page links to it instead of
   embedding it. */
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
    PS.sopDocControl(it) +
    PS.actionsBar(['<button type="button" class="btn" data-act="print">Print or Export SOP to PDF</button>',
      '<button type="button" class="btn btn-ghost" data-act="content-markdown">Copy as Markdown</button>']) +
    (it.tags ? PS.tagsRow(it) : '') +
    '</div>' +
    '<div class="grid grid-2">' +
    PS.sopFacts(it) +
    '<div class="card"><h2>Purpose and scope</h2>' +
    '<p><strong>Purpose:</strong> ' + PS.esc(it.purpose) + '</p>' +
    '<p><strong>Scope:</strong> ' + PS.esc(it.scope) + '</p>' +
    (it.outScope ? '<p><strong>Out of scope:</strong> ' + PS.esc(it.outScope) + '</p>' : '') +
    '<p><strong>Trigger:</strong> ' + PS.esc(it.trigger) + '</p>' +
    (it.frequency ? '<p><strong>Typical frequency:</strong> ' + PS.esc(it.frequency) + '</p>' : '') +
    '</div></div>' +
    PS.sopRaci(it) +
    '<div class="card"><h2>Procedure</h2>' +
    (it.flow ? '<div class="flow">' + it.flow.map(function (s) {
      return '<span class="flow-step">' + PS.esc(s) + '</span>';
    }).join('<span class="flow-arrow">&#8594;</span>') + '</div>' : '') +
    '<ol class="timeline">' + (it.steps || []).map(function (s) {
      var meta = [];
      if (s.role) meta.push('Owner: ' + PS.esc(s.role));
      if (s.ctrl) meta.push('Control: ' + PS.esc(s.ctrl));
      if (s.out) meta.push('Record: ' + PS.esc(s.out));
      return '<li><div class="tl-title">' + PS.esc(s.s) + '</div>' +
        '<div class="tl-body">' + PS.esc(s.d) + '</div>' +
        (meta.length ? '<p class="note">' + meta.join('. ') + '.</p>' : '') + '</li>';
    }).join('') + '</ol></div>' +
    PS.sopDetails(it) +
    PS.sopChecklistLink(it) +
    PS.relatedCard('sop', it) +
    PS.disclaimer(it.disclaimerKind || 'policy');
  return html;
});
PS.sopDocControl = function (it) {
  return PS.kv([
    ['Document ID', it.id],
    ['Version', it.version || '2.0'],
    ['Process owner', it.owner || 'Head of Procurement'],
    ['Review cycle', it.review || 'Annual']
  ]);
};
PS.sopFacts = function (it) {
  return '<div class="card"><h2>At a glance</h2>' +
    PS.kv([
      ['Process group', it.cat],
      ['Typical duration', it.duration || 'Varies with value and complexity'],
      ['Key inputs', (it.inputs || []).length + ' defined inputs'],
      ['Steps', (it.steps || []).length],
      ['Decision gates', (it.decisions || []).length],
      ['Controls', (it.control || []).length],
      ['KPIs', (it.kpis || []).length],
      ['Records produced', (it.records || []).length]
    ]) +
    '<h3>Inputs</h3>' + PS.ul(it.inputs) +
    '<h3>Outputs</h3>' + PS.ul(it.outputs) + '</div>';
};
PS.sopRaci = function (it) {
  if (!it.raci || !it.raci.length) {
    return it.roles ? '<div class="card"><h2>Responsibilities</h2><p>' + PS.esc(it.roles) + '</p></div>' : '';
  }
  return '<div class="card"><h2>Responsibilities (RACI summary)</h2>' +
    '<p class="card-sub">Accountability for each duty. The process owner is accountable for the procedure as a whole.</p>' +
    '<div class="table-wrap"><table><thead><tr><th>Role</th><th>Responsibility under this SOP</th></tr></thead><tbody>' +
    it.raci.map(function (r) {
      return '<tr><td><strong>' + PS.esc(r.role || 'Unassigned') + '</strong></td><td>' + PS.esc(r.resp) + '</td></tr>';
    }).join('') + '</tbody></table></div></div>';
};
PS.sopDetails = function (it) {
  var blocks = '';
  if (it.decisions) blocks += PS.section('Decision gates', PS.decisionList(it.decisions), { open: false });
  if (it.control) blocks += PS.section('Controls and approvals', PS.ul(it.control));
  if (it.kpis) blocks += PS.section('How this process is measured', PS.kpiLinks(it.kpis));
  if (it.records) blocks += PS.section('Records to retain' + (it.retention ? ' (' + it.retention + ')' : ''), PS.ul(it.records));
  if (it.risks) blocks += PS.section('Process risks', PS.ul(it.risks));
  if (it.exceptions) blocks += PS.section('Exceptions and escalations', PS.ul(it.exceptions));
  if (it.mistakes) blocks += PS.section('Common mistakes', PS.ul(it.mistakes));
  if (it.refs) blocks += PS.section('References', PS.ul(it.refs));
  if (it.revisions) blocks += PS.section('Revision history', PS.ul(it.revisions), { open: false });
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
    return o ? '<li><a href="#/kpi/' + encodeURIComponent(o.id) + '">' + PS.esc(o.title) + '</a> : <span class="muted">' + PS.esc(o.def) + '</span></li>' : '';
  }).join('');
  return items ? '<ul>' + items + '</ul>' : '';
};
/* Procedures define the controlled process; checklists evidence its
   execution and live in the Checklist library. This card links across. */
PS.sopChecklistLink = function (it) {
  var cl = it.checklist ? PS.byId('cl', it.checklist) : null;
  if (!cl) return '';
  return '<div class="card card-tight">' +
    '<div class="card-head"><h2>Operational execution checklist</h2></div>' +
    '<p class="card-sub">Worried about audit compliance or missing mandatory stage gates? ' +
    'The companion checklist tracks every required deliverable, sign-off, and control step in real time.</p>' +
    '<div class="actions-row">' +
    '<a class="btn btn-primary" href="#/cl/' + PS.esc(cl.id) + '">Execute ' + PS.esc(cl.title) + '</a>' +
    '</div></div>';
};
