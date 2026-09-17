PS.settingsThresholdCard = function (p) {
  return '<div class="card"><h2>Approval thresholds</h2>' +
    '<p class="card-sub">Enter your own delegated authority levels. The PO Value Check calculator uses this table to show which approval level a value falls into. Leave a limit at 0 to mean no upper bound for that level.</p>' +
    '<div class="table-wrap"><table><thead><tr><th>Approval level</th><th class="num">Up to (value)</th><th></th></tr></thead><tbody id="thresholdRows">' +
    (p.thresholds || []).map(function (t) {
      return '<tr><td><input type="text" data-th="label" value="' + PS.esc(t.label) + '" maxlength="80"></td>' +
        '<td class="num"><input type="number" data-th="max" value="' + PS.esc(t.max) + '" step="any" min="0" style="max-width:160px"></td>' +
        '<td><button type="button" class="btn btn-sm btn-danger" data-act="threshold-del">Remove</button></td></tr>';
    }).join('') + '</tbody></table></div>' +
    '<div class="btn-row"><button type="button" class="btn btn-sm" data-act="threshold-add">Add approval level</button></div>' +
    '<div class="field" style="margin-top:12px"><label for="setBidThreshold">Competitive bidding threshold (optional)</label>' +
    '<input type="number" step="any" min="0" id="setBidThreshold" value="' + PS.esc(p.competitiveBidThreshold) + '">' +
    '<span class="hint">If you record your organization&rsquo;s threshold here, decision guidance and checklists can reference it. Enter 0 to leave it unset - Procure Sherpa assumes no universal figure.</span></div></div>';
};
PS.settingsAssumptionCard = function (p) {
  return '<div class="card"><h2>Default assumptions</h2>' +
    '<div class="field"><label for="setAssumptions">Standing assumptions recorded in reports</label>' +
    '<textarea id="setAssumptions" rows="4" maxlength="1200" placeholder="Example: default cost of capital 9% per annum; freight quoted ex-works; volumes per current forecast; no currency hedging.">' + PS.esc(p.defaultAssumptions) + '</textarea>' +
    '<span class="hint">Free text, shown with your settings and available to quote in reports.</span></div>' +
    '<div class="grid grid-3">' +
    '<div class="stat"><div class="s-lab">Default discount rate</div><div class="s-val">' + PS.esc(p.defaults.discountRate) + '%</div></div>' +
    '<div class="stat"><div class="s-lab">Default cost of capital</div><div class="s-val">' + PS.esc(p.defaults.costOfCapital) + '%</div></div>' +
    '<div class="stat"><div class="s-lab">Default holding rate</div><div class="s-val">' + PS.esc(p.defaults.holdingRate) + '%</div></div>' +
    '</div>' +
    '<p class="note">These rates are starting points for calculation, not advice. Replace them with your organization&rsquo;s finance parameters.</p></div>';
};