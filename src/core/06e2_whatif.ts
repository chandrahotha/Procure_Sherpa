/* ==========================================================
   Phase 11 - What-If Branching (roadmap 11.3)
   Vary one calculator input, compare the base result against
   a scenario result side-by-side, and save scenario branches
   into the workspace as audit-ready records.
   ========================================================== */

PS.whatif = PS.whatif || {};

PS.whatif.DEFAULT_DELTAS = [-10, -5, 0, 5, 10, 20];

/* Numeric field keys for the current calculator that can be varied. */
PS.whatif.variableKeys = function (calc) {
  var out = [];
  (calc.fields || []).forEach(function (f) {
    if (f.type === 'number') out.push(f.k);
  });
  return out;
};

/* Run the calculator impl with a modified value set (does not touch the form). */
PS.whatif.runWith = function (calc, values) {
  var v = {};
  Object.keys(values || {}).forEach(function (k) { v[k] = values[k]; });
  if (!PS.showCalcErrors(PS.validateCalc(calc, v))) return null;
  try { return calc.run(v); }
  catch (e) { if (window.console && console.error) console.error(e); return null; }
};

/* Build a result comparison table (base vs scenario) for one varied field. */
PS.whatif.compareHtml = function (calc, baseOut, scenOut) {
  var labels = [], byLabel = {};
  (baseOut.results || []).forEach(function (r) {
    labels.push(r.label);
    byLabel[r.label] = { base: r.value, baseNote: r.note || '' };
  });
  (scenOut.results || []).forEach(function (r) {
    if (byLabel[r.label]) byLabel[r.label].scen = r.value;
    else { labels.push(r.label); byLabel[r.label] = { scen: r.value }; }
  });
  if (!labels.length) return '<p class="note">This calculator produced no comparable result rows.</p>';
  var rows = labels.map(function (l) {
    var b = byLabel[l];
    return '<tr><td>' + PS.esc(l) + '</td>' +
      '<td class="num">' + PS.esc(b.base === undefined ? '\u2014' : b.base) + '</td>' +
      '<td class="num">' + PS.esc(b.scen === undefined ? '\u2014' : b.scen) + '</td></tr>';
  }).join('');
  return '<div class="table-wrap"><table><thead><tr><th>Result</th><th class="num">Base</th><th class="num">Scenario</th></tr></thead>' +
    '<tbody>' + rows + '</tbody></table></div>';
};

/* Open the what-if panel on the current calculator. */
PS.acts['whatif-open'] = function () {
  var calc = PS.byId('calc', PS.calcState.id);
  if (!calc) return;
  if (!PS.calcState.result) PS.runCalc(true);
  if (!PS.calcState.result) { PS.toast('Calculate a result first, then explore what-if scenarios.', 'warn'); return; }
  var keys = PS.whatif.variableKeys(calc);
  if (!keys.length) { PS.toast('This calculator has no numeric inputs to vary.', 'warn'); return; }
  var fieldOpts = keys.map(function (k) {
    var f = (calc.fields || []).filter(function (x) { return x.k === k; })[0];
    return '<option value="' + PS.esc(k) + '">' + PS.esc(f ? f.label : k) + '</option>';
  }).join('');
  var deltaOpts = PS.whatif.DEFAULT_DELTAS.map(function (d) {
    return '<option value="' + d + '">' + (d > 0 ? '+' : '') + d + '%</option>';
  }).join('');
  PS.modal({
    title: 'What-if analysis: ' + calc.title,
    body: '<p>Vary one input while keeping everything else fixed, then compare the result against your current calculation.</p>' +
      '<div class="field"><label for="whatifField">Field to vary</label><select id="whatifField">' + fieldOpts + '</select></div>' +
      '<div class="field"><label for="whatifDelta">Change by</label><select id="whatifDelta">' + deltaOpts + '</select></div>' +
      '<div class="btn-row"><button type="button" class="btn btn-primary" data-act="whatif-run">Run what-if</button></div>' +
      '<div id="whatifResult" class="whatif-panel"></div>',
    okLabel: 'Close', cancelLabel: null
  });
};

PS.acts['whatif-run'] = function () {
  var calc = PS.byId('calc', PS.calcState.id);
  if (!calc) return;
  var fEl = PS.$('#whatifField');
  var dEl = PS.$('#whatifDelta');
  if (!fEl || !dEl) return;
  var k = fEl.value;
  var deltaPct = PS.num(dEl.value) / 100;
  var baseValues = PS.calcState.values;
  var baseOut = PS.calcState.result;
  var scenValues = {};
  Object.keys(baseValues).forEach(function (kk) { scenValues[kk] = baseValues[kk]; });
  var cur = PS.num(baseValues[k]);
  if (!isFinite(cur)) { PS.toast('That field needs a numeric value first.', 'danger'); return; }
  scenValues[k] = PS.round(cur * (1 + deltaPct), 6);
  var scenOut = PS.whatif.runWith(calc, scenValues);
  var box = PS.$('#whatifResult');
  if (!scenOut) { if (box) box.innerHTML = PS.alert('danger', 'Scenario failed', 'The varied input failed validation or could not be calculated.'); return; }
  if (box) {
    box.innerHTML = '<h4>Base vs ' + (deltaPct > 0 ? '+' : '') + (deltaPct * 100) + '% on "' + PS.esc(k) + '"</h4>' +
      PS.whatif.compareHtml(calc, baseOut, scenOut) +
      '<div class="btn-row" style="margin-top:12px">' +
      '<button type="button" class="btn btn-sm btn-primary" data-act="whatif-save" data-delta="' + (deltaPct * 100) + '" data-key="' + PS.escAttr(k) + '" data-val="' + PS.escAttr(scenValues[k]) + '">Save scenario branch</button>' +
      '</div>';
  }
};

PS.acts['whatif-save'] = function (el) {
  var calc = PS.byId('calc', PS.calcState.id);
  if (!calc) return;
  var key = el.dataset.key;
  var delta = PS.num(el.dataset.delta);
  var val = el.dataset.val;
  var baseValues = PS.calcState.values;
  var scenValues = {};
  Object.keys(baseValues).forEach(function (kk) { scenValues[kk] = baseValues[kk]; });
  scenValues[key] = val;
  var scenOut = PS.whatif.runWith(calc, scenValues);
  if (!scenOut) { PS.toast('Could not run the scenario for saving.', 'danger'); return; }
  var field = (calc.fields || []).filter(function (x) { return x.k === key; })[0];
  var rec = PS.saved.add({
    type: 'whatif', title: calc.title + ' - what-if ' + (delta > 0 ? '+' : '') + delta + '%',
    data: {
      kind: 'whatif', calc: calc.id, calcTitle: calc.title, field: key,
      fieldLabel: field ? field.label : key, deltaPct: delta,
      baseValues: baseValues, scenValues: scenValues,
      baseResults: PS.calcState.result ? PS.calcState.result.results : [],
      scenResults: scenOut.results || [], created: new Date().toISOString()
    }
  });
  if (rec) {
    PS.toast('Scenario branch saved to your workspace.', 'ok');
    PS.audit('whatif-saved', calc.title + ' ' + (delta > 0 ? '+' : '') + delta + '% on ' + key);
  }
};