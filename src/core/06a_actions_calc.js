/* ==========================================================
   Section J: action handlers (Section 26, 32, 67, 73)
   ========================================================== */
PS.acts = PS.acts || {};
PS.acts.calc = function () { PS.runCalc(false); };
PS.acts.example = function () { PS.loadCalcExample(); };
PS.acts['calc-random'] = function () { PS.loadCalcRandom(); };
PS.acts.clear = function () {
  var calc = PS.byId('calc', PS.calcState.id);
  if (!calc) return;
  PS.$$('#calcForm [data-ckind="field"]').forEach(function (el) {
    if (el.type === 'checkbox') el.checked = false;
    else el.value = '';
  });
  PS.setCalcInputs(PS.calcDefaults(calc));
  PS.showCalcErrors({});
  var r = PS.$('#calcResult');
  if (r) r.innerHTML = '<div class="results-empty">Inputs cleared. Enter your own values and choose <strong>Calculate</strong>.</div>';
  var note = PS.$('#exampleNote');
  if (note) note.remove();
  PS.store.remove(PS.K.draft);
};
PS.acts['calc-save'] = function () {
  var calc = PS.byId('calc', PS.calcState.id);
  if (!calc) return;
  if (!PS.calcState.result) { PS.runCalc(true); }
  if (!PS.calcState.result) return;
  var notes = PS.$('#calcNotes') ? PS.$('#calcNotes').value : '';
  PS.promptText({
    title: 'Save this analysis',
    label: 'Title for the saved calculation',
    value: calc.title + ' - ' + PS.dateStr(),
    hint: 'Persisted to your active workspace session. Export via Backup & Data Management to archive.',
    okLabel: 'Save',
    onOk: function (title) {
      var rec = PS.saved.add({
        type: 'calculation', title: title, notes: notes,
        data: {
          calc: calc.id, calcTitle: calc.title, values: PS.calcState.values,
          results: PS.calcState.result.results,
          summaryText: PS.calcState.result.summaryText || '',
          formula: PS.calcState.result.formula || [],
          assumptions: (PS.calcState.result.assumptions || []).concat(calc.assumptions || []),
          payload: PS.calcState.result.data || null
        }
      });
      if (rec) {
        PS.store.set(PS.K.draft, { calc: calc.id, notes: notes });
        PS.toast('Saved to your workspace.', 'ok');
        PS.updateNavCounts();
      }
    }
  });
};
PS.acts['calc-print'] = function () {
  if (PS.$('#calcForm')) PS.runCalc(true);
  try { window.print(); } catch (e) { PS.toast('Printing is not available in this browser.', 'danger'); }
};
PS.acts['calc-csv'] = function () {
  var calc = PS.byId('calc', PS.calcState.id);
  if (!calc || !PS.calcState.result) { PS.runCalc(true); }
  if (!calc || !PS.calcState.result) return;
  PS.download('ProcureSherpa_' + calc.id + '_' + PS.iso() + '.csv',
    PS.calcCSV(calc, PS.calcState.values, PS.calcState.result), 'text/csv');
  PS.audit('csv-exported', calc.title);
};
PS.acts['calc-copy'] = function () {
  var calc = PS.byId('calc', PS.calcState.id);
  if (!calc || !PS.calcState.result) { PS.runCalc(true); }
  if (!calc || !PS.calcState.result) return;
  PS.copy(PS.calcSummaryText(calc, PS.calcState.values, PS.calcState.result), calc.title + ' summary');
};
PS.acts['calc-markdown'] = function () {
  var calc = PS.byId('calc', PS.calcState.id);
  if (!calc || !PS.calcState.result) { PS.runCalc(true); }
  if (!calc || !PS.calcState.result) return;
  PS.copy(PS.calcMarkdown(calc, PS.calcState.values, PS.calcState.result), calc.title + ' Markdown');
};
PS.acts.share = function () {
  var calc = PS.byId('calc', PS.calcState.id);
  if (!calc) return;
  var values = PS.readCalcInputs();
  PS.modal({
    title: 'Create a share link',
    body: '<div class="alert alert-warn"><strong>Link contents are visible to anyone who receives it</strong>' +
      'A Procure Sherpa share link stores your input values in the link itself (after the # character). ' +
      'It never leaves your device automatically and nothing is sent to a server, but the link text contains your numbers - ' +
      'so do not share commercially sensitive values by chat, email or an unsecured channel.</div>' +
      '<p class="note">Only input values are encoded. Saved work, notes and your other analyses are never included.</p>',
    okLabel: 'Create link',
    onOk: function () {
      var payload = PS.encodeHashPayload({ v: values, c: calc.id, t: PS.iso() });
      if (!payload) { PS.toast('A share link could not be created.', 'danger'); return false; }
      var url = location.href.split('#')[0] + '#/calc/' + encodeURIComponent(calc.id) + '?s=' + payload;
      PS.audit('share-link-created', calc.title);
      PS.modal({
        title: 'Share link ready',
        cancelLabel: null,
        okLabel: 'Close',
        body: '<p>Send this link only to people who are allowed to see the figures below.</p>' +
          '<div class="field"><label for="shareUrl">Share link</label>' +
          '<textarea id="shareUrl" rows="4" readonly>' + PS.esc(url) + '</textarea></div>' +
          '<div class="btn-row"><button type="button" class="btn" data-act="copy-share">Copy link</button></div>'
      });
    }
  });
};
PS.acts['copy-share'] = function () {
  var t = PS.$('#shareUrl');
  if (t) PS.copy(t.value, 'Share link');
};
/* ---------- canonical commercial quantities ----------
   The nineteen calculators share 110 distinct field keys and only six of
   them matched between tools, so 27 of the 41 declared handoffs carried
   nothing: the buyer pressed "Send to another tool" and was told that
   none of the fields matched.

   This map gives the calculators a shared vocabulary. A field names the
   commercial quantity it holds, and a handoff matches on the quantity
   rather than on the variable name, so a "Quantity required" of 2,500
   travels to a tool that calls it "Annual Volume" and lands in the right
   box. */
PS.CALC_FIELD_CONCEPT = {
  qty: ['quantity'], annualVolume: ['quantity'], volume: ['quantity'],
  annualDemand: ['quantity'], annualOutput: ['quantity'], currentQty: ['quantity'],
  unitPrice: ['unitPrice'], quotedPrice: ['unitPrice'], basePrice: ['unitPrice'],
  currentPrice: ['unitPrice'], negotiatedPrice: ['unitPrice'], newPrice: ['unitPrice'],
  baselinePrice: ['unitPrice'], matCost: ['unitPrice', 'material'], unitCost: ['unitPrice'],
  buyPrice: ['unitPrice'], aPrice: ['unitPrice', 'priceA'], bPrice: ['unitPrice', 'priceB'],
  cPrice: ['unitPrice', 'priceC'],
  annualSpend: ['annualSpend', 'commitment'], poValue: ['commitment', 'annualSpend'],
  amount: ['annualSpend'], foreignAmount: ['annualSpend'],
  spend1: ['annualSpend'], spend2: ['annualSpend'], spend3: ['annualSpend'],
  spend4: ['annualSpend'], spend5: ['annualSpend'],
  baselineAnnual: ['annualSpend'], newAnnual: ['annualSpend'],
  annualBudget: ['commitment', 'annualSpend'], actualToDate: ['annualSpend'],
  priorYear: ['annualSpend'],
  freight: ['freight'], logistics: ['freight'], buyLogistics: ['freight'],
  aFreight: ['freight', 'freightA'], bFreight: ['freight', 'freightB'], cFreight: ['freight', 'freightC'],
  dutyPct: ['duty'], aDuty: ['duty', 'dutyA'], bDuty: ['duty', 'dutyB'], cDuty: ['duty', 'dutyC'],
  discount: ['discount'], discountPct: ['discount'],
  aDiscount: ['discount', 'discountA'], bDiscount: ['discount', 'discountB'], cDiscount: ['discount', 'discountC'],
  insurance: ['insurance'],
  years: ['years'], termYears: ['years'], lifeYears: ['years'], contractMonths: ['months'],
  discountRate: ['rate'], costOfCapital: ['rate'],
  escalationPct: ['escalation'], indexRate: ['escalation'],
  implementationCost: ['implementation'], oneOffCost: ['implementation'], fixedSetup: ['implementation'],
  marginPct: ['margin'], taxRate: ['taxRate'],
  material: ['material'], labour: ['labour'], labourCost: ['labour'],
  overhead: ['overhead'], overheadCost: ['overhead'],
  machine: ['machine'], packaging: ['packaging'], tooling: ['tooling'],
  handling: ['handling'], otherCost: ['otherCost'], other: ['otherCost'], otherAnnual: ['otherCost'],
  installCost: ['installCost'], energy: ['energy'], maintenance: ['maintenance'],
  consumables: ['consumables'], downtime: ['downtime'],
  disposalCost: ['disposalCost'], residualValue: ['residualValue'],
  currentDays: ['currentDays'], netDays: ['currentDays'],
  proposedDays: ['proposedDays'], discountDays: ['discountDays'],
  orderCost: ['orderCost'], holdingCost: ['holdingCost'], supplierMOQ: ['supplierMOQ'],
  exchangeRate: ['exchangeRate'], spreadPct: ['spreadPct'], feeFixed: ['feeFixed'],
  year1Cost: ['year1Cost'], priorPeriod: ['priorPeriod'],
  actual: ['actual'], target: ['target']
};

/* Carry a value from one calculator to another on the shared
   vocabulary. Exact field-name matches win; concept matches fill the
   gaps. */
PS.mapHandoffValues = function (fromCalc, toCalc, values) {
  var out = {};
  var targetFields = toCalc.fields || [];
  var sourceFields = fromCalc.fields || [];
  if (!targetFields.length || !sourceFields.length) return out;
  Object.keys(values || {}).forEach(function (k) {
    for (var i = 0; i < targetFields.length; i++) {
      if (targetFields[i].k === k) { out[k] = values[k]; return; }
    }
  });
  sourceFields.forEach(function (f) {
    if (out[f.k] !== undefined) return;
    var v = values ? values[f.k] : undefined;
    if (v === undefined || v === null || v === '') return;
    var concepts = PS.CALC_FIELD_CONCEPT[f.k] || [];
    if (!concepts.length) return;
    for (var i = 0; i < targetFields.length; i++) {
      var tf = targetFields[i];
      if (out[tf.k] !== undefined) continue;
      var tc = PS.CALC_FIELD_CONCEPT[tf.k] || [];
      for (var c = 0; c < concepts.length; c++) {
        if (tc.indexOf(concepts[c]) >= 0) { out[tf.k] = v; return; }
      }
    }
  });
  return out;
};

PS.acts.handoff = function (el) {
  var to = el.dataset.to;
  var calc = PS.byId('calc', PS.calcState.id);
  if (!calc || !to) return;
  var target = PS.byId('calc', to);
  if (!target) return;
  var raw = PS.readCalcInputs();
  var carried = PS.mapHandoffValues(calc, target, raw);
  if (!Object.keys(carried).length) {
    PS.toast('These two tools do not share a comparable input, so nothing can be carried across.', 'danger');
    return;
  }
  PS.pendingPrefill = { to: to, from: calc.id, values: carried, t: new Date().toISOString() };
  PS.audit('cross-tool-handoff', calc.title + ' \u2192 ' + target.title);
  PS.go('calc', null, to);
};
PS.acts['chart-export'] = function (el) {
  var type = el.dataset.chartType;
  /* the svg element itself carries .svg-responsive; selecting a descendant
     wrapper never matched, which made every export button report "no chart" */
  var scope = el.closest ? el.closest('.chart-container') : document;
  var svg = (scope || document).querySelector('svg.svg-responsive');
  if (!svg) { PS.toast('No chart found on this page.', 'danger'); return; }
  var filenames = {
    waterfall: 'should-cost-waterfall.svg',
    kraljic: 'kraljic-matrix.svg',
    pareto: 'pareto-spend.svg',
    zscore: 'altman-zscore-gauge.svg',
    radar: 'supplier-radar.svg'
  };
  PS.chart.exportSVG(svg, filenames[type] || 'chart.svg');
  PS.toast('SVG downloaded', 'ok');
};