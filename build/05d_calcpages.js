/* ---------- calculator page shell (Section 36, 40, 67) ---------- */
PS.pendingPrefill = null;
PS.calcPage = function (id, params) {
  var calc = PS.byId('calc', id);
  if (!calc) return PS.notFound('calculator', id);
  PS.calcState.id = id; PS.calcState.result = null;
  PS.currentItem = { type: 'calc', id: id, item: calc };
  PS.pageTitle = calc.title;
  PS.recent.add('calc', id, calc.title);
  var handoffs = (calc.handoffTo || []).map(function (h) {
    var t = PS.byId('calc', h);
    if (!t) return '';
    return '<button type="button" class="btn btn-sm" data-act="handoff" data-to="' + PS.esc(h) + '">Send to ' + PS.esc(t.title) + '</button>';
  }).join('');
  var html = PS.reportHead(calc.title, calc.cat + ' calculator') +
    '<div class="card">' +
    '<div class="card-head"><h1>' + PS.esc(calc.title) + '</h1><div class="spacer"></div>' +
    PS.badge('calc') + '<span class="badge">' + PS.esc(calc.cat) + '</span></div>' +
    '<p class="lead">' + PS.esc(calc.purpose) + '</p>' +
    (calc.context ? '<p class="card-sub">' + PS.esc(calc.context) + '</p>' : '') +
    PS.actionsBar([
      '<button type="button" class="btn" data-act="example">Load example data</button>',
      '<button type="button" class="btn btn-ghost" data-act="clear">Clear all inputs</button>',
      '<button type="button" class="btn btn-ghost" data-act="share">Create share link</button>'
    ]) +
    (calc.tags ? PS.tagsRow(calc) : '') +
    '</div>' +
    '<div class="grid grid-2">' +
    '<div class="card"><div class="card-head"><h2>Inputs</h2><div class="spacer"></div>' +
    '<span class="note">Fields marked <span class="req">*</span> are required</span></div>' +
    '<form id="calcForm" data-calc="' + PS.esc(calc.id) + '" autocomplete="off" onsubmit="return false;">' +
    PS.groupFields(calc) + '</form>' +
    '<div class="btn-row no-print">' +
    '<button type="button" class="btn btn-primary btn-lg" data-act="calc">Calculate</button>' +
    '<button type="button" class="btn" data-act="example">Load example</button>' +
    '<button type="button" class="btn" data-act="clear">Reset</button>' +
    '</div></div>' +
    '<div><div id="calcResult" class="results"><div class="results-empty">Enter your own values and choose <strong>Calculate</strong>. Results, interpretation, formula, assumptions and a printable report appear here.</div></div>' +
    '<div class="card no-print"><div class="card-head"><h3>Actions</h3></div>' +
    '<div class="btn-row">' +
    '<button type="button" class="btn btn-primary" data-act="calc-save">Save to workspace</button>' +
    '<button type="button" class="btn" data-act="calc-print">Print / PDF report</button>' +
    '<button type="button" class="btn" data-act="calc-csv">Export CSV</button>' +
    '<button type="button" class="btn" data-act="calc-copy">Copy summary</button>' +
    '</div>' +
    '<div class="field" style="margin-top:12px"><label for="calcNotes">Notes for the report (assumptions, alternatives, decision basis)</label>' +
    '<textarea id="calcNotes" rows="3" maxlength="4000" placeholder="Example: quotation valid 30 days; freight quoted ex-works; decision pending commercial review."></textarea></div>' +
    (handoffs ? '<h4 class="mb8">Send this analysis to another tool</h4><div class="btn-row tight">' + handoffs + '</div>' +
      '<p class="note">Compatible fields are carried across locally. Nothing is transmitted anywhere.</p>' : '') +
    '</div></div></div>' +
    PS.calcGuidance(calc) +
    PS.relatedCard('calc', calc) +
    (calc.disclaimer ? PS.alert(calc.disclaimerKind || 'info', 'Note', PS.esc(calc.disclaimer)) : '') +
    PS.disclaimer(calc.disclaimerKind || 'finance');
  PS.pageInit = function () { PS.calcPageInit(calc, params); };
  return html;
};