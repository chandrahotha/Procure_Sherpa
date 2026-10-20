/* ==========================================================
   Section I: calculator engine (Section 24, 25, 26, 36, 40)
   ========================================================== */
PS.calcState = { id: '', values: {}, result: null, dirty: false };
PS.PRIMARY_NOTE = 'Example data - replace with your own information.';
PS.fieldHtml = function (f) {
  var id = 'f_' + f.k;
  var unit = f.unit === 'currency' ? PS.curSymbol(PS.prefs().currency)
    : (f.unit === 'percent' ? '%' : (f.unit || ''));
  var common = 'id="' + id + '" data-key="' + PS.esc(f.k) + '" data-ckind="field"';
  var control;
  if (f.type === 'select') {
    control = '<select ' + common + '>' + (f.options || []).map(function (o) {
      var val = typeof o === 'string' ? o : o.v;
      var lab = typeof o === 'string' ? o : o.l;
      return '<option value="' + PS.esc(val) + '"' + (String(f.def) === String(val) ? ' selected' : '') + '>' + PS.esc(lab) + '</option>';
    }).join('') + '</select>';
  } else if (f.type === 'check') {
    control = '<label class="check"><input type="checkbox" ' + common + (f.def ? ' checked' : '') +
      '><span>' + PS.esc(f.help || 'Yes') + '</span></label>';
  } else {
    control = '<div class="input-row"><input type="' + (f.type === 'date' ? 'date' : (f.type === 'text' ? 'text' : 'number')) + '" ' + common +
      (f.type === 'number' ? ' step="' + (f.step || 'any') + '" inputmode="decimal"' : '') +
      (f.def !== undefined && f.def !== null ? ' value="' + PS.esc(f.def) + '"' : '') + '>' +
      (unit ? '<span class="unit">' + PS.esc(unit) + '</span>' : '') + '</div>';
  }
  return '<div class="field" data-fkey="' + PS.esc(f.k) + '">' +
    '<label for="' + id + '">' + PS.esc(f.label) + (f.req ? ' <span class="req" title="Required">*</span>' : '') + '</label>' +
    control +
    (f.tip ? '<span class="hint">' + PS.esc(f.tip) + '</span>' : '') +
    '<span class="err" data-err="' + PS.esc(f.k) + '" hidden></span></div>';
};
PS.groupFields = function (calc) {
  var groups = calc.groups || [{ g: 'Inputs', keys: (calc.fields || []).map(function (f) { return f.k; }) }];
  var byKey = {};
  (calc.fields || []).forEach(function (f) { byKey[f.k] = f; });
  return groups.map(function (grp) {
    var fields = (grp.keys || []).map(function (k) { return byKey[k]; }).filter(Boolean);
    if (!fields.length) return '';
    var checks = fields.filter(function (f) { return f.type === 'check'; });
    var inputs = fields.filter(function (f) { return f.type !== 'check'; });
    return '<fieldset class="fieldset"><legend>' + PS.esc(grp.g) + '</legend>' +
      (inputs.length ? '<div class="' + (inputs.length > 2 ? 'fields-3' : 'fields-2') + '">' +
        inputs.map(PS.fieldHtml).join('') + '</div>' : '') +
      (checks.length ? '<div>' + checks.map(PS.fieldHtml).join('') + '</div>' : '') +
      (grp.note ? '<p class="note">' + PS.esc(grp.note) + '</p>' : '') + '</fieldset>';
  }).join('');
};
PS.readCalcInputs = function () {
  var out = {};
  PS.$$('#calcForm [data-ckind="field"]').forEach(function (el) {
    var k = el.dataset.key;
    if (el.type === 'checkbox') out[k] = el.checked;
    else if (el.type === 'number') out[k] = el.value === '' ? null : PS.num(el.value);
    else out[k] = PS.clean(el.value, 500);
  });
  return out;
};
PS.setCalcInputs = function (values) {
  PS.$$('#calcForm [data-ckind="field"]').forEach(function (el) {
    var k = el.dataset.key;
    if (!(k in values)) return;
    if (el.type === 'checkbox') el.checked = !!values[k];
    else el.value = (values[k] === null || values[k] === undefined) ? '' : values[k];
  });
};
/* Calculator fields that take their default from a value the user has
   configured in Settings. The Settings screen presented these as
   configurable house defaults, and the TCO and Payment Terms calculators
   tell the user to set them there, but nothing read them: every value was
   hardcoded in the calculator definition. */
PS.CALC_PREF_DEFAULT = {
  discountRate: 'discountRate',
  costOfCapital: 'costOfCapital',
  indexRate: 'inflation'
};
PS.calcDefaults = function (calc) {
  var v = {};
  var p = PS.prefs ? PS.prefs() : null;
  var pd = (p && p.defaults) || {};
  (calc.fields || []).forEach(function (f) {
    var prefKey = PS.CALC_PREF_DEFAULT[f.k];
    if (prefKey && pd[prefKey] !== undefined && pd[prefKey] !== null && pd[prefKey] !== '') {
      v[f.k] = PS.num(pd[prefKey]);
      return;
    }
    if (f.def !== undefined && f.def !== null) v[f.k] = f.def;
    else if (f.type === 'check') v[f.k] = false;
    else v[f.k] = null;
  });
  return v;
};