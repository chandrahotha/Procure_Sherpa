/* ==========================================================
   Procurement 360 — Rates & Assumptions page
   Every rate the calculators use, editable by the user.
   Stored locally. Each rate carries a basis note and a
   last-verified date the user sets.
   ========================================================== */
import { PS } from '../core/ps.ts';
import type { RateEntry } from '../core/rates.ts';

PS.route('rates', function () {
  var entries = PS.allRates();
  var categories: Record<string, RateEntry[]> = {};
  entries.forEach(function (e) {
    if (!categories[e.category]) categories[e.category] = [];
    categories[e.category].push(e);
  });

  var html = '<div class="page-head"><p class="eyebrow">Procurement 360</p>' +
    '<h1>Rates &amp; Assumptions</h1>' +
    '<p class="page-sub">Every rate and assumption the calculators use, in one place. ' +
    'Edit a rate here and every calculator that references it uses your number. ' +
    'These are your reference defaults, not authoritative rates — verify against the latest official source.</p></div>';

  html += '<div class="alert alert-warn"><strong>Your data, your rates.</strong> ' +
    'Nothing here leaves your browser. Edit a rate, set the date you verified it, and it is saved locally. ' +
    'Reset any rate to its default at any time.</div>';

  Object.keys(categories).sort().forEach(function (cat) {
    var rows = categories[cat].map(function (e) {
      var val = e.isDefault ? e.defaultValue : e.value;
      var verified = e.lastVerified ? 'Verified ' + PS.esc(e.lastVerified) : 'Never verified';
      return '<tr>' +
        '<td><strong>' + PS.esc(e.label) + '</strong><br><span class="t-mute">' + PS.esc(e.note) + '</span></td>' +
        '<td class="num"><input type="number" step="any" value="' + PS.esc(String(val)) + '" ' +
          'data-rate-key="' + PS.esc(e.key) + '" class="rate-input" style="width:100px"> ' + PS.esc(e.unit) + '</td>' +
        '<td><input type="date" value="' + PS.esc(e.lastVerified) + '" data-rate-verified="' + PS.esc(e.key) + '" class="rate-date"></td>' +
        '<td class="t-mute">' + PS.esc(verified) + '<br><span class="t-mute">' + PS.esc(e.source) + '</span></td>' +
        '<td><button class="btn btn-sm" data-rate-reset="' + PS.esc(e.key) + '">Reset</button></td>' +
        '</tr>';
    }).join('');

    html += '<h2 class="section-label" style="margin-top:24px">' + PS.esc(cat) + '</h2>' +
      '<div class="table-wrap"><table>' +
      '<thead><tr><th>Rate</th><th>Value</th><th>Verified</th><th>Basis</th><th></th></tr></thead>' +
      '<tbody>' + rows + '</tbody></table></div>';
  });

  html += '<div class="btn-row" style="margin-top:20px">' +
    '<button class="btn btn-primary" id="ratesSave">Save all rates</button>' +
    '<button class="btn" id="ratesResetAll">Reset all to defaults</button>' +
    '<button class="btn" id="ratesExport">Export JSON</button>' +
    '</div>';

  html += '<p class="note" style="margin-top:16px">Rates are used by: ' +
    'Landed Cost, TCO, Should-Cost, Price Escalation, Payment Terms, EOQ, Safety Stock, ' +
    'Supplier Risk (Altman Z), OTIF, Savings Analysis, and every other calculator that needs a rate. ' +
    'Edit once, use everywhere.</p>';

  return html;
});

/* Wire the rates page into the navigation */
if (typeof PS.NAV_WORKSPACE !== 'undefined') {
  PS.NAV_WORKSPACE[0].items.splice(2, 0, { label: 'Rates & Assumptions', href: '#/rates' });
}
