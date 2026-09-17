/* ---------- settings (Section 42, 62, 74) ---------- */
PS.route('settings', function () {
  PS.pageTitle = 'Settings';
  var p = PS.prefs();
  var html = PS.reportHead('Settings', 'Configuration') +
    '<div class="card"><h1>Settings</h1>' +
    '<p class="card-sub">Configure Procure Sherpa to match your organization. These values feed calculators, approval checks, reports and formatting. They are stored locally and never transmitted.</p>' +
    '<p class="note">Procure Sherpa deliberately ships with no universal thresholds. Where your policy differs from the defaults, change it here. It will never assert that &ldquo;every purchase above X needs three quotes&rdquo;, because that rule is organizational rather than universal.</p>' +
    '</div>' +
    '<div class="grid grid-2">' + PS.settingsOrgCard(p) + PS.settingsFormatCard(p) +
    PS.settingsThresholdCard(p) + PS.settingsAssumptionCard(p) + '</div>' +
    '<div class="card"><div class="btn-row no-print">' +
    '<button type="button" class="btn btn-primary btn-lg" data-act="settings-save">Save settings</button>' +
    '<button type="button" class="btn" data-act="settings-reset">Restore defaults</button>' +
    '<button type="button" class="btn btn-ghost" data-act="storage-info">Storage details</button>' +
    '<button type="button" class="btn btn-danger" data-act="clear-data">Clear local data</button>' +
    '</div></div>' + PS.disclaimer('policy');
  PS.pageInit = function () { PS.initThemeScheduleOptions(); };
  return html;
});
PS.settingsOrgCard = function (p) {
  return '<div class="card"><h2>Organisation and currency</h2>' +
    '<div class="field"><label for="setOrg">Organisation name (used in reports)</label><input type="text" id="setOrg" maxlength="120" value="' + PS.esc(p.orgName) + '" placeholder="Example: Northwind Manufacturing"></div>' +
    '<div class="field"><label for="setDept">Procurement department name</label><input type="text" id="setDept" maxlength="120" value="' + PS.esc(p.deptName) + '" placeholder="Example: Group Procurement"></div>' +
    '<div class="field"><label for="setCurrency">Default currency</label><select id="setCurrency">' +
    PS.CURRENCIES.map(function (c) {
      return '<option value="' + PS.esc(c.c) + '"' + (c.c === p.currency ? ' selected' : '') + '>' + PS.esc(c.c) + (c.s ? ' (' + PS.esc(c.s.trim()) + ')' : ' (no symbol)') + '</option>';
    }).join('') + '</select></div>' +
    '<div class="field"><label for="setTax">Default tax rate (%)</label><input type="number" step="any" min="0" max="60" id="setTax" value="' + PS.esc(p.taxRate) + '">' +
    '<span class="hint">Starting point for tax calculations. Tax treatment varies by jurisdiction and transaction type - verify before using results for accounting or compliance decisions.</span></div></div>';
};
PS.settingsFormatCard = function (p) {
  return '<div class="card"><h2>Formatting and display</h2>' +
    '<div class="field"><label for="setDate">Preferred date format</label><select id="setDate">' +
    '<option value="iso"' + (p.dateFormat === 'iso' ? ' selected' : '') + '>ISO - 2026-09-16</option>' +
    '<option value="us"' + (p.dateFormat === 'us' ? ' selected' : '') + '>US - 09/16/2026</option>' +
    '<option value="eu"' + (p.dateFormat === 'eu' ? ' selected' : '') + '>European - 16/09/2026</option>' +
    '</select></div>' +
    '<div class="field"><label for="setDecimals">Decimal places for currency</label><input type="number" id="setDecimals" min="0" max="4" step="1" value="' + PS.esc(p.decimals) + '">' +
    '<span class="hint">Headline results are rounded to avoid false precision, for example ' + PS.esc(PS.moneyR(18492.84)) + ' rather than ' + PS.esc(PS.money(18492.837492, 2)) + '.</span></div>' +
    '<div class="field"><label for="setThemeSchedule">Theme schedule</label><select id="setThemeSchedule">' +
    '<option value="manual"' + (p.themeSchedule === 'manual' ? ' selected' : '') + '>Manual (use toggle button)</option>' +
    '<option value="auto"' + (p.themeSchedule === 'auto' ? ' selected' : '') + '>Auto (by time of day)</option>' +
    '<option value="system"' + (p.themeSchedule === 'system' ? ' selected' : '') + '>Follow system (OS/Browser)</option>' +
    '</select>' +
    '<div class="theme-schedule-options" id="themeScheduleOptions" style="margin-top:8px"></div>' +
    '<span class="hint">Printed output always uses a light, readable layout regardless of this setting.</span></div>' +
    '<div class="field"><label for="setFooter">Report footer</label><input type="text" id="setFooter" maxlength="300" value="' + PS.esc(p.reportFooter) + '" placeholder="Example: Internal - commercial in confidence"></div></div>';
};