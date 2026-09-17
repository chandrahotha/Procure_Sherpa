PS.acts['settings-save'] = function () {
  var g = function (id) { return PS.$(id) ? PS.$(id).value : ''; };
  var thresholds = PS.$$('#thresholdRows tr').map(function (tr) {
    var labEl = PS.$('[data-th="label"]', tr), maxEl = PS.$('[data-th="max"]', tr);
    var label = PS.clean(labEl ? labEl.value : '', 80);
    var max = PS.num(maxEl ? maxEl.value : 0);
    return { label: label, max: isFinite(max) ? max : 0 };
  }).filter(function (t) { return t.label; });
  var dec = PS.num(g('#setDecimals'));
  PS.savePrefs({
    currency: g('#setCurrency') || PS.prefs().currency,
    orgName: PS.clean(g('#setOrg'), 120),
    deptName: PS.clean(g('#setDept'), 120),
    taxRate: PS.num(g('#setTax')) || 0,
    competitiveBidThreshold: PS.num(g('#setBidThreshold')) || 0,
    dateFormat: g('#setDate') || 'iso',
    decimals: isFinite(dec) ? PS.clamp(dec, 0, 4) : 2,
    reportFooter: PS.clean(g('#setFooter'), 300),
    defaultAssumptions: PS.clean(g('#setAssumptions'), 1200),
    theme: g('#setTheme') || PS.prefs().theme,
    themeSchedule: g('#setThemeSchedule') || PS.prefs().themeSchedule,
    themeAutoStart: g('#setThemeAutoStart') || PS.prefs().themeAutoStart,
    themeAutoEnd: g('#setThemeAutoEnd') || PS.prefs().themeAutoEnd,
    thresholds: thresholds.length ? thresholds : PS.DEFAULT_PREFS.thresholds
  });
  PS.applyTheme();
  PS.buildNav();
  PS.renderRoute();
  PS.toast('Settings saved locally.', 'ok');
};
PS.acts['settings-reset'] = function () {
  PS.confirm({
    title: 'Restore default settings?',
    body: '<p>Currency, organisation details, approval thresholds, formatting and default assumptions return to their defaults. Saved work is not affected.</p>',
    okLabel: 'Restore defaults',
    onOk: function () { PS.resetPrefs(); PS.applyTheme(); PS.renderRoute(); PS.toast('Settings restored to defaults.', 'ok'); }
  });
};
PS.acts['threshold-add'] = function () {
  var tb = PS.$('#thresholdRows');
  if (!tb) return;
  var tr = document.createElement('tr');
  tr.innerHTML = '<td><input type="text" data-th="label" value="" maxlength="80" placeholder="Approval level, for example Category manager"></td>' +
    '<td class="num"><input type="number" data-th="max" value="" step="any" min="0" style="max-width:160px" placeholder="0 = no limit"></td>' +
    '<td><button type="button" class="btn btn-sm btn-danger" data-act="threshold-del">Remove</button></td>';
  tb.appendChild(tr);
};
PS.acts['threshold-del'] = function (el) {
  var tr = el.closest ? el.closest('tr') : null;
  if (tr) tr.remove();
};