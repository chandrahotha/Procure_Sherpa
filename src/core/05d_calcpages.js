/* ---------- calculator page shell (Section 36, 40, 67): makeover: focused two-pane ---------- */
PS.route('calc', function (id, params) { return PS.calcPage(id, params); });
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
    '<div class="card card-tight">' +
    '<div class="card-head"><div><h1 style="margin-bottom:2px">' + PS.esc(calc.title) + '</h1>' +
    '<div style="display:flex;gap:7px;flex-wrap:wrap;align-items:center">' +
    PS.badge('calc') + '<span class="badge">' + PS.esc(calc.cat) + '</span></div></div>' +
    '<div class="spacer"></div>' +
    '<div class="btn-row tight no-print">' +
    '<button type="button" class="btn btn-sm" data-act="example" data-i18n="calc.example">Load example</button>' +
    '<button type="button" class="btn btn-sm btn-ghost" data-act="share">Share link</button>' +
    '</div></div>' +
    '<p class="lead mb0">' + PS.esc(calc.purpose) + '</p>' +
    (calc.context ? '<p class="card-sub mb0">' + PS.esc(calc.context) + '</p>' : '') +
    (calc.tags ? '<div style="margin-top:10px">' + PS.tagsRow(calc) + '</div>' : '') +
    '</div>' +
    '<div class="calc-layout">' +
    '<div class="card calc-panel-inputs"><div class="card-head"><h2>Inputs</h2><div class="spacer"></div>' +
    '<span class="note">Fields marked <span class="req">*</span> are required</span></div>' +
    '<form id="calcForm" data-calc="' + PS.esc(calc.id) + '" autocomplete="off">' +
    PS.groupFields(calc) + '</form>' +
    '<div class="calc-actions no-print">' +
    '<div class="btn-row">' +
    '<button type="button" class="btn btn-primary btn-lg" style="flex:1" data-act="calc" data-i18n="calc.calculate">Calculate</button>' +
    '</div>' +
    '<div class="btn-row tight" style="margin-top:8px">' +
    '<button type="button" class="btn btn-sm" data-act="example" data-i18n="calc.example">Example</button>' +
    '<button type="button" class="btn btn-sm btn-ghost" data-act="clear" data-i18n="calc.reset">Reset</button>' +
    '</div></div>' +
    '<div class="calc-sheet-handle no-print" aria-hidden="true"></div></div>' +
    '<div class="calc-panel-results"><div id="calcResult" class="results" aria-live="polite" aria-atomic="true"><div class="results-empty">Enter values and choose <strong>Calculate</strong> to view results, interpretation, formula and assumptions.</div></div>' +
    '<div class="card card-tight no-print"><div class="card-head"><h3>Save & share</h3></div>' +
    '<div class="btn-row">' +
    '<button type="button" class="btn btn-primary btn-sm" data-act="calc-save" data-i18n="calc.save">Save to workspace</button>' +
    '<button type="button" class="btn btn-sm" data-act="calc-print" data-i18n="common.print">Print / PDF</button>' +
    '<button type="button" class="btn btn-sm" data-act="calc-csv">CSV</button>' +
    '<button type="button" class="btn btn-sm" data-act="calc-markdown" data-i18n="calc.markdown">Copy as Markdown</button>' +
    '<button type="button" class="btn btn-sm btn-ghost" data-act="calc-copy" data-i18n="calc.copySummary">Copy summary</button>' +
    '</div>' +
    '<div class="btn-row" style="margin-top:8px">' +
    '<button type="button" class="btn btn-sm btn-primary" data-act="whatif-open" data-i18n="calc.whatif">\u2696 What-if analysis</button>' +
    '<button type="button" class="btn btn-sm" data-act="share-static" data-i18n="calc.shareStatic">\u2197 Static share page</button>' +
    '</div>' +
    '<div class="field" style="margin-top:12px;margin-bottom:0"><label for="calcNotes">Notes for the report</label>' +
    '<textarea id="calcNotes" rows="2" maxlength="4000" placeholder="Assumptions, alternatives, decision basis…"></textarea></div>' +
    (handoffs ? '<h4 class="mb8" style="margin-top:12px">Send to another tool</h4><div class="btn-row tight">' + handoffs + '</div>' +
      '<p class="note mb0">Compatible fields carry across locally. Nothing leaves this browser.</p>' : '') +
    '</div></div>' +
    '<button type="button" class="calc-sheet-trigger no-print" aria-label="Open calculator inputs" aria-expanded="false" hidden><span>&#9650;</span> Inputs</button>' +
    '<div class="calc-sheet-backdrop no-print" hidden aria-hidden="true"></div>' +
    PS.calcGuidance(calc) +
    PS.relatedCard('calc', calc) +
    (calc.disclaimer ? PS.alert(calc.disclaimerKind || 'info', 'Note', PS.esc(calc.disclaimer)) : '') +
    PS.disclaimer(calc.disclaimerKind || 'finance');
  PS.pageInit = function () { PS.calcPageInit(calc, params); };
  return html;
};
