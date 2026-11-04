/* ---------- settings (Section 42, 62, 74) ---------- */
PS.route('settings', function () {
  PS.pageTitle = 'Settings';
  var p = PS.prefs();
  var html = PS.reportHead('Settings', 'Configuration') +
    PS.ui.card(
      '<h1 class="inst-title">Settings</h1>' +
      '<p class="inst-read">Configure Procure Sherpa to match your organization. These values feed calculators, approval checks, reports and formatting. They are stored locally and never transmitted.</p>' +
      '<p class="inst-note">Procure Sherpa deliberately ships with no universal thresholds. Where your policy differs from the defaults, change it here. It will never assert that &ldquo;every purchase above X needs three quotes&rdquo;, because that rule is organizational rather than universal.</p>'
    ) +
    '<div class="inst-grid inst-grid-2">' +
    PS.settingsOrgCard(p) +
    PS.settingsFormatCard(p) +
    PS.settingsThresholdCard(p) +
    PS.settingsAssumptionCard(p) +
    '</div>' +
    PS.ui.card(
      '<h2 class="inst-title">Storage usage</h2>' +
      '<div id="storageUsageBar" style="margin-bottom:var(--space-2)">' +
      '<div class="inst-field" style="margin:0;background:var(--border);border-radius:var(--inst-r-progress);height:8px;overflow:hidden">' +
      '<div id="storageUsageFill" style="height:100%;background:var(--accent);width:0%;transition:width 0.3s ease"></div>' +
      '</div>' +
      '<p class="inst-note" id="storageUsageText">Calculating...</p>' +
      '</div>' +
      '<div class="inst-btn-row no-print">' +
      '<button type="button" class="inst-home-btn inst-home-btn--primary inst-home-btn--lg" data-act="settings-save" data-i18n="common.save">Save settings</button>' +
      '<button type="button" class="inst-home-btn inst-home-btn--ghost" data-act="settings-reset" data-i18n="common.reset">Restore defaults</button>' +
      '<button type="button" class="inst-home-btn inst-home-btn--ghost" data-act="storage-info" data-i18n="common.details">Storage details</button>' +
      '<button type="button" class="inst-home-btn inst-home-btn--ghost inst-home-btn--danger" data-act="clear-data" data-i18n="common.clear">Clear local data</button>' +
      '</div>'
    ) +
    PS.disclaimer('policy');
  PS.pageInit = function () { PS.initThemeScheduleOptions(); PS.updateStorageUsage(); };
  return html;
});
PS.updateStorageUsage = function () {
  var fill = PS.$('#storageUsageFill');
  var text = PS.$('#storageUsageText');
  if (!fill || !text) return;
  var bytes = PS.store.bytes();
  var quota = 5 * 1024 * 1024;
  var pct = Math.min(100, Math.round((bytes / quota) * 100));
  fill.style.width = pct + '%';
  if (pct > 80) fill.style.background = 'var(--danger)';
  else if (pct > 60) fill.style.background = 'var(--warn)';
  else fill.style.background = 'var(--accent)';
  var kb = (bytes / 1024).toFixed(1);
  var qmb = (quota / 1024 / 1024).toFixed(0);
  text.textContent = kb + ' KB used of ~' + qmb + ' MB typical browser quota (' + pct + '%)';
  if (pct > 80) text.innerHTML = ' <strong style="color:var(--danger)">Storage nearly full. Consider exporting a backup and clearing old saved items.</strong>';
};
PS.settingsOrgCard = function (p) {
  return PS.ui.card(
    '<h2 class="inst-title">Organisation and currency</h2>' +
    '<div class="inst-field"><label for="setOrg">Organisation name (used in reports)</label><input type="text" id="setOrg" maxlength="120" value="' + PS.esc(p.orgName) + '" placeholder="Example: Northwind Manufacturing"></div>' +
    '<div class="inst-field"><label for="setDept">Procurement department name</label><input type="text" id="setDept" maxlength="120" value="' + PS.esc(p.deptName) + '" placeholder="Example: Group Procurement"></div>' +
    '<div class="inst-field"><label for="setCurrency">Default currency</label><select id="setCurrency">' +
    PS.CURRENCIES.map(function (c) {
      return '<option value="' + PS.esc(c.c) + '"' + (c.c === p.currency ? ' selected' : '') + '>' + PS.esc(c.c) + (c.s ? ' (' + PS.esc(c.s.trim()) + ')' : ' (no symbol)') + '</option>';
    }).join('') + '</select></div>' +
    '<div class="inst-field"><label for="setTax">Default tax rate (%)</label><input type="number" step="any" min="0" max="60" id="setTax" value="' + PS.esc(p.taxRate) + '">' +
    '<span class="inst-note">Starting point for tax calculations. Tax treatment varies by jurisdiction and transaction type - verify before using results for accounting or compliance decisions.</span></div>'
  );
};
PS.settingsFormatCard = function (p) {
  return PS.ui.card(
    '<h2 class="inst-title">Formatting and display</h2>' +
    '<div class="inst-field"><label for="setDate">Preferred date format</label><select id="setDate">' +
    '<option value="iso"' + (p.dateFormat === 'iso' ? ' selected' : '') + '>ISO - 2026-09-16</option>' +
    '<option value="us"' + (p.dateFormat === 'us' ? ' selected' : '') + '>US - 09/16/2026</option>' +
    '<option value="eu"' + (p.dateFormat === 'eu' ? ' selected' : '') + '>European - 16/09/2026</option>' +
    '</select></div>' +
    '<div class="inst-field"><label for="setDecimals">Decimal places for currency</label><input type="number" id="setDecimals" min="0" max="4" step="1" value="' + PS.esc(p.decimals) + '">' +
    '<span class="inst-note">Headline results are rounded to avoid false precision, for example ' + PS.esc(PS.moneyR(18492.84)) + ' rather than ' + PS.esc(PS.money(18492.837492, 2)) + '.</span></div>' +
    '<div class="inst-field"><label for="setThemeSchedule">Theme schedule</label><select id="setThemeSchedule">' +
    '<option value="manual"' + (p.themeSchedule === 'manual' ? ' selected' : '') + '>Manual (use toggle button)</option>' +
    '<option value="auto"' + (p.themeSchedule === 'auto' ? ' selected' : '') + '>Auto (by time of day)</option>' +
    '<option value="system"' + (p.themeSchedule === 'system' ? ' selected' : '') + '>Follow system (OS/Browser)</option>' +
    '</select>' +
    '<div class="theme-schedule-options" id="themeScheduleOptions" style="margin-top:var(--space-2)"></div>' +
    '<span class="inst-note">Printed output always uses a light, readable layout regardless of this setting.</span></div>' +
    '<div class="inst-field"><label for="setFooter">Report footer</label><input type="text" id="setFooter" maxlength="300" value="' + PS.esc(p.reportFooter) + '" placeholder="Example: Internal - commercial in confidence"></div>' +
    '<div class="inst-field"><label for="setLocale">Interface language</label><select id="setLocale">' +
    Object.keys(PS.i18n.CATALOG).map(function (code) {
      return '<option value="' + PS.esc(code) + '"' + (code === PS.i18n.current() ? ' selected' : '') + '>' + PS.esc(code.toUpperCase()) + '</option>';
    }).join('') +
    '</select>' +
    '<span class="inst-note">Language applies to the app chrome (nav, search, footer). Content is currently authored in English; extra catalogs can be added to PS.i18n.CATALOG without touching feature code.</span></div>'
  );
};