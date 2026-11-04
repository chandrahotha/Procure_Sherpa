/* ---------- calculator page shell (Section 36, 40, 67): makeover: focused two-pane ---------- */
PS.route('calc', function (id, params) { return PS.calcPage(id, params); });
PS.pendingPrefill = null;
PS.calcPage = function (id, params) {
  if (!id) return PS.sectionIndex('calc', params);
  var calc = PS.byId('calc', id);
  if (!calc) return PS.notFound('calculator', id);
  PS.calcState.id = id; PS.calcState.result = null;
  PS.currentItem = { type: 'calc', id: id, item: calc };
  PS.pageTitle = calc.title;
  PS.recent.add('calc', id, calc.title);
  var handoffs = (calc.handoffTo || []).map(function (h) {
    var t = PS.byId('calc', h);
    if (!t) return '';
    return '<button type="button" class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm" data-act="handoff" data-to="' + PS.esc(h) + '">Send to ' + PS.esc(t.title) + '</button>';
  }).join('');
  var html = PS.reportHead(calc.title, calc.cat + ' calculator') +
    '<div class="inst-card inst-card--tight">' +
    '<div class="inst-card-head"><div><h1 style="margin-bottom:2px">' + PS.esc(calc.title) + '</h1>' +
    '<div style="display:flex;gap:7px;flex-wrap:wrap;align-items:center">' +
    PS.badge('calc') + '<span class="inst-badge">' + PS.esc(calc.cat) + '</span></div></div>' +
    '<div class="spacer"></div>' +
    '<div class="inst-btn-row tight no-print">' +
    '<button type="button" class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm" data-act="example" data-i18n="calc.example">Load example</button>' +
    '<button type="button" class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm" data-act="calc-random" data-i18n="calc.random">Random values</button>' +
    '<button type="button" class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm" data-act="share">Share link</button>' +
    '</div></div>' +
    '<p class="inst-read">' + PS.esc(calc.purpose) + '</p>' +
    (calc.context ? '<p class="inst-card-sub mb0">' + PS.esc(calc.context) + '</p>' : '') +
    (calc.tags ? '<div style="margin-top:var(--space-3)">' + PS.tagsRow(calc) + '</div>' : '') +
    '</div>' +
    '<div class="calc-layout">' +
    '<div class="inst-card calc-panel-inputs"><div class="inst-card-head"><h2>Inputs</h2><div class="spacer"></div>' +
    '<span class="inst-note">Fields marked <span class="req">*</span> are required</span></div>' +
    '<form id="calcForm" data-calc="' + PS.esc(calc.id) + '" autocomplete="off">' +
    PS.groupFields(calc) + '</form>' +
    '<div class="calc-actions no-print">' +
    '<div class="inst-btn-row">' +
    '<button type="button" class="inst-home-btn inst-home-btn--primary inst-home-btn--lg" style="flex:1" data-act="calc" data-i18n="calc.calculate">Calculate</button>' +
    '</div>' +
    '<div class="inst-btn-row tight" style="margin-top:var(--space-2)">' +
    '<button type="button" class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm" data-act="example" data-i18n="calc.example">Example</button>' +
    '<button type="button" class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm" data-act="calc-random" data-i18n="calc.random">Random values</button>' +
    '<button type="button" class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm" data-act="clear" data-i18n="calc.reset">Reset</button>' +
    '</div>' +
    PS.illustrativeNote('calc') +
    '</div></div>' +
    '<div class="calc-sheet-handle no-print" aria-hidden="true"></div></div>' +
    '<div class="calc-panel-results"><div id="calcResult" class="inst-results" aria-live="polite" aria-atomic="true"><div class="inst-results-empty">Enter values and choose <strong>Calculate</strong> to view results, interpretation, formula and assumptions.</div></div>' +
    '<div class="inst-card inst-card--tight no-print"><div class="inst-card-head"><h3>Save & share</h3></div>' +
    '<div class="inst-btn-row">' +
    '<button type="button" class="inst-home-btn inst-home-btn--primary inst-home-btn--sm" data-act="calc-save" data-i18n="calc.save">Save to workspace</button>' +
    '<button type="button" class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm" data-act="calc-print" data-i18n="common.print">Print / PDF</button>' +
    '<button type="button" class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm" data-act="calc-csv">CSV</button>' +
    '<button type="button" class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm" data-act="calc-markdown" data-i18n="calc.markdown">Copy as Markdown</button>' +
    '<button type="button" class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm" data-act="calc-copy" data-i18n="calc.copySummary">Copy summary</button>' +
    '</div>' +
    '<div class="inst-btn-row" style="margin-top:var(--space-2)">' +
    '<button type="button" class="inst-home-btn inst-home-btn--primary inst-home-btn--sm" data-act="whatif-open" data-i18n="calc.whatif">\u2696 What-if analysis</button>' +
    '<button type="button" class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm" data-act="share-static" data-i18n="calc.shareStatic">\u2197 Static share page</button>' +
    '</div>' +
    '<div class="inst-field" style="margin-top:var(--space-3);margin-bottom:0"><label for="calcNotes">Notes for the report</label>' +
    '<textarea id="calcNotes" rows="2" maxlength="4000" placeholder="Assumptions, alternatives, decision basis..."></textarea></div>' +
    (handoffs ? '<h4 class="inst-eyebrow" style="margin-top:var(--space-3)">Send to another tool</h4><div class="inst-btn-row tight">' + handoffs + '</div>' +
      '<p class="inst-note mb0">Compatible fields carry across locally. Nothing leaves this browser.</p>' : '') +
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