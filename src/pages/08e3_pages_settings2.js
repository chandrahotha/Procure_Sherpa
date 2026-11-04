PS.settingsThresholdCard = function (p) {
  return PS.ui.card(
    '<h2 class="inst-title">Approval thresholds</h2>' +
    '<p class="inst-read">Enter your own delegated authority levels. The PO Value Check calculator uses this table to show which approval level a value falls into. Leave a limit at 0 to mean no upper bound for that level.</p>' +
    '<div id="thresholdRows">' +
    (p.thresholds || []).map(function (t) {
      return '<div class="inst-grid inst-grid-3" style="gap:var(--space-2);align-items:end;margin-bottom:var(--space-2)">' +
        '<div class="inst-field" style="margin:0"><label>Approval level</label><input type="text" data-th="label" value="' + PS.esc(t.label) + '" maxlength="80" aria-label="Approval level label"></div>' +
        '<div class="inst-field" style="margin:0"><label>Up to (value)</label><input type="number" data-th="max" value="' + PS.esc(t.max) + '" step="any" min="0" style="max-width:160px" aria-label="Approval limit value"></div>' +
        '<div style="display:flex;align-items:end"><button type="button" class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm inst-home-btn--danger" data-act="threshold-del" data-i18n="common.remove">' + (PS.i18n ? PS.i18n.t('common.remove') : 'Remove') + '</button></div>' +
        '</div>';
    }).join('') + '</div>' +
    '<div class="inst-btn-row"><button type="button" class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm" data-act="threshold-add" data-i18n="common.add">+ ' + (PS.i18n ? PS.i18n.t('common.add') : 'Add') + ' approval level</button></div>' +
    '<div class="inst-field" style="margin-top:var(--space-3)"><label for="setBidThreshold">Competitive bidding threshold (optional)</label>' +
    '<input type="number" step="any" min="0" id="setBidThreshold" value="' + PS.esc(p.competitiveBidThreshold) + '">' +
    '<span class="inst-note">If you record your organization&rsquo;s threshold here, decision guidance and checklists can reference it. Enter 0 to leave it unset - Procure Sherpa assumes no universal figure.</span></div>'
  );
};
PS.settingsAssumptionCard = function (p) {
  return PS.ui.card(
    '<h2 class="inst-title">Default assumptions</h2>' +
    '<div class="inst-field"><label for="setAssumptions">Standing assumptions recorded in reports</label>' +
    '<textarea id="setAssumptions" rows="4" maxlength="1200" placeholder="Example: default cost of capital 9% per annum; freight quoted ex-works; volumes per current forecast; no currency hedging.">' + PS.esc(p.defaultAssumptions) + '</textarea>' +
    '<span class="inst-note">Free text, shown with your settings and available to quote in reports.</span></div>' +
    '<div class="inst-grid inst-grid-3">' +
    '<div class="inst-field"><label for="setDefaultDiscount">Default discount rate (%)</label>' +
    '<input type="number" step="any" min="0" max="100" id="setDefaultDiscount" value="' + PS.esc(p.defaults.discountRate) + '">' +
    '<span class="inst-note">Used as the starting value in Total Cost of Ownership and Multi-Year Contract Cost.</span></div>' +
    '<div class="inst-field"><label for="setDefaultCostOfCapital">Default cost of capital (%)</label>' +
    '<input type="number" step="any" min="0" max="100" id="setDefaultCostOfCapital" value="' + PS.esc(p.defaults.costOfCapital) + '">' +
    '<span class="inst-note">Used as the starting value in Payment Terms and Working Capital.</span></div>' +
    '<div class="inst-field"><label for="setDefaultHolding">Default holding rate (% p.a.)</label>' +
    '<input type="number" step="any" min="0" max="100" id="setDefaultHolding" value="' + PS.esc(p.defaults.holdingRate) + '">' +
    '<span class="inst-note">Annual carrying cost as a percentage of unit value.</span></div>' +
    '</div>' +
    '<p class="inst-note">These rates are starting points for calculation, not advice. Replace them with your organization&rsquo;s finance parameters. ' +
    'Every calculator that uses them starts with your figure; the value is always editable on the calculator itself.</p>'
  );
};

PS.initThemeScheduleOptions = function () {
  var select = PS.$('#setThemeSchedule');
  var container = PS.$('#themeScheduleOptions');
  if (!select || !container) return;

  function render() {
    var val = select.value;
    var p = PS.prefs();
    if (val === 'auto') {
      container.innerHTML = '<div class="inst-grid inst-grid-2">' +
        '<div class="inst-field"><label for="setThemeAutoStart">Light mode from</label><input type="time" id="setThemeAutoStart" value="' + PS.esc(p.themeAutoStart || '06:00') + '"></div>' +
        '<div class="inst-field"><label for="setThemeAutoEnd">Dark mode from</label><input type="time" id="setThemeAutoEnd" value="' + PS.esc(p.themeAutoEnd || '20:00') + '"></div>' +
        '</div>' +
        '<p class="inst-note">Light mode will be active between the start and end times. Outside that window, dark mode applies.</p>';
    } else {
      container.innerHTML = '';
    }
  }

  select.addEventListener('change', render);
  render();
};