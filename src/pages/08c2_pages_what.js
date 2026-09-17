/* ---------- "What should I do?" universal entry point (Section 50, 79) ---------- */
PS.route('what', function (arg, params) {
  PS.pageTitle = 'What Should I Do?';
  var q = params && params.q ? params.q : '';
  var html = PS.reportHead('What should I do?', 'Guided routing from a business problem') +
    '<div class="card"><h1>What should I do?</h1>' +
    '<p class="lead">Describe the situation the way you would explain it to a colleague. Procure Sherpa maps your problem to the process, SOP, checklist, calculator, template and report that apply - and shows what to document at each step.</p>' +
    '<div class="searchbox no-print">' +
    '<label class="sr-only" for="whatQ">Describe what you need to do</label>' +
    '<input type="text" id="whatQ" value="' + PS.esc(q) + '" placeholder="For example: my supplier increased prices by 12 percent" maxlength="200">' +
    '<button type="button" class="btn btn-primary btn-lg" data-act="what-run">Show me what to do</button>' +
    '</div>' +
    '<h3 class="mb8">Common situations</h3>' +
    '<div class="chips no-print">' + (PS.QUICK_PROBLEMS || []).map(function (p) {
      return '<button type="button" class="chip" data-act="prefill-what" data-q="' + PS.esc(p) + '">' + PS.esc(p) + '</button>';
    }).join('') + '</div>' +
    '<p class="note">Guidance reflects general procurement practice. It does not know your organization&rsquo;s thresholds, contracts or delegated authority - configure Settings and confirm local policy before acting.</p>' +
    '</div><div id="whatResult"></div>';
  PS.pageInit = function () {
    var inp = PS.$('#whatQ');
    if (inp) inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); PS.acts['what-run'](); } });
    if (q) PS.acts['what-run']();
    else if (inp) inp.focus();
  };
  return html;
});
PS.planGroups = [
  { type: 'sop', title: 'SOPs to follow', lead: 'These procedures govern the work. Open the SOP that matches your situation and work its steps in order.' },
  { type: 'cl', title: 'Checklists to complete', lead: 'Use these to prove each step happened and to capture evidence for the file.' },
  { type: 'calc', title: 'Calculators to run', lead: 'Quantify the decision before you commit. Each tool shows its formula, assumptions and interpretation.' },
  { type: 'tpl', title: 'Templates to complete', lead: 'Document the analysis and the decision in a form that survives review and audit.' },
  { type: 'dec', title: 'Decision guides to test', lead: 'Challenge your reasoning before the approval meeting, and record the basis.' },
  { type: 'kpi', title: 'KPIs to measure or report', lead: 'Show whether the outcome improved and how it will be tracked.' },
  { type: 'kb', title: 'Knowledge to read first', lead: 'Understand the concept before you act - it usually changes the approach.' }
];
PS.renderWhatResult = function (q) {
  var res = PS.search(q, { limit: 40 });
  var scen = PS.search(q, { type: 'scen', limit: 3 }).results;
  var html = '<div class="card"><div class="card-head"><h2>Your plan for: &ldquo;' + PS.esc(PS.clean(q, 200)) + '&rdquo;</h2>' +
    '<div class="spacer"></div><span class="badge badge-type">Guided route</span></div>' +
    '<p class="card-sub">Nothing below replaces your own policy. Work top to bottom, save the analysis, then print the report for the approval file.</p>';
  if (scen.length) {
    html += '<h3>Closest scenario</h3><div class="grid grid-3">' + scen.map(function (s) {
      return PS.tile(s.route, 'Scenario', s.title, s.desc);
    }).join('') + '</div>';
  }
  var anyLinks = false;
  PS.planGroups.forEach(function (g) {
    var hits = res.results.filter(function (r) { return r.type === g.type; }).slice(0, 8);
    if (!hits.length) return;
    anyLinks = true;
    html += '<h3>' + PS.esc(g.title) + '</h3><p class="note">' + PS.esc(g.lead) + '</p>' +
      '<div class="grid grid-3">' + hits.map(function (h) {
        var o = PS.byId(h.type, h.id);
        var d = (o && (o.purpose || o.desc || o.def || o.question)) ? PS.clean(o.purpose || o.desc || o.def || o.question, 150) : h.desc;
        return PS.tile(h.route, PS.typeLabel(h.type) + (h.cat ? ' \u00B7 ' + h.cat : ''), h.title, d);
      }).join('') + '</div>';
  });
  if (!anyLinks) {
    html += '<div class="empty">Nothing in the content set matched those words closely. Try naming the document (RFQ, contract renewal), the calculation (TCO, savings) or the situation in simpler terms. ' +
      'You can also <a href="#/search?q=' + encodeURIComponent(q) + '">open full search</a>.</div>';
  }
  html += '<h3>The documentation question</h3><p>Whatever you do next, record: the requirement, the options considered, your evaluation criteria, the commercial analysis, the risks, the negotiation outcome, the decision, who approved it and the assumptions behind the numbers. That habit is what makes a procurement decision defensible later.</p>' +
    '<div class="btn-row no-print">' +
    '<a class="btn" href="#/list/tpl/Governance">Justification templates</a>' +
    '<a class="btn" href="#/cl/cl-procurement-file">File completeness checklist</a>' +
    '<a class="btn" href="#/help">How to document a decision</a>' +
    '<a class="btn btn-ghost" href="#/search?q=' + encodeURIComponent(q) + '">Open full search</a>' +
    '</div></div>';
  return html;
};