/* ============ Calc logic: Supplier Concentration / HHI ============ */
PS.calcImpl.concentration = function (v) {
  var spends = [v.spend1, v.spend2, v.spend3, v.spend4, v.spend5]
    .map(function (x) { return isFinite(x) && x > 0 ? x : 0; });
  var w = [];
  var total = spends.reduce(function (t, x) { return t + x; }, 0);
  if (!(total > 0)) w.push('No spend entered: concentration cannot be measured. Enter at least one supplier spend.');
  var shares = spends.map(function (x) { return total > 0 ? x / total * 100 : NaN; });
  var hhi = total > 0 ? shares.reduce(function (t, s) { return t + s * s; }, 0) : NaN;
  var band = !isFinite(hhi) ? ['No result', ''] :
    hhi < 1500 ? ['Unconcentrated', 'ok'] :
    hhi <= 2500 ? ['Moderately concentrated', 'warn'] : ['Highly concentrated', 'danger'];
  var top = total > 0 ? Math.max.apply(null, shares) : NaN;
  if (isFinite(top) && top >= 50) w.push('One supplier holds ' + PS.pct(top) + ' of the spend: failure, exit or opportunism there is a business-continuity event. Dual-source or build a tested fallback.');
  else if (isFinite(top) && top >= 30) w.push('The top supplier holds ' + PS.pct(top) + ': watch-list dependency. Cap growth with this supplier until cover exists.');
  if (isFinite(hhi) && hhi > 2500) w.push('HHI ' + PS.qty(hhi) + ' sits deep in the high-concentration zone: a deliberate de-concentration plan belongs in the category strategy.');
  var rows = spends.map(function (x, i) {
    return { cells: ['Supplier ' + (i + 1), PS.moneyR(x), isFinite(shares[i]) ? PS.pct(shares[i]) : '\u2014', isFinite(shares[i]) ? PS.qty(shares[i] * shares[i]) : '\u2014'] };
  });
  return PS.C({
    r: [PS.res('HHI index', isFinite(hhi) ? PS.qty(hhi) : '\u2014', 'Scale 0-10000', band[1], true),
      PS.res('Verdict', band[0], isFinite(top) ? 'Top supplier holds ' + PS.pct(top) : '', band[1], true),
      PS.res('Category spend', PS.moneyR(total), 'Across ' + spends.filter(function (x) { return x > 0; }).length + ' suppliers'),
      PS.res('Top-supplier share', isFinite(top) ? PS.pct(top) : '\u2014', 'Dependency indicator')],
    t: {
      headers: ['Supplier', 'Spend', 'Share', 'HHI contribution'], numCols: 3,
      rows: rows,
      footer: ['Total / HHI', PS.moneyR(total), '100%', isFinite(hhi) ? PS.qty(hhi) : '\u2014']
    },
    a: '<p>The category scores <strong>' + (isFinite(hhi) ? PS.qty(hhi) : 'no') + ' HHI (' + band[0].toLowerCase() + ')</strong>' +
      (isFinite(top) ? ', with the largest supplier at ' + PS.pct(top) + ' of spend.' : '.') + '</p>' +
      '<p>Concentration is leverage running the wrong way: the supplier can price it, and you cannot walk away without pain. The remedy is structural — qualify alternates, split awards, redesign specifications — not tougher talk with a supplier who knows you have nowhere to go.</p>',
    f: ['Share-i = spend-i / total spend',
      'HHI = sum of squared percentage shares (0-10000)'],
    as: ['Only entered spend counts: missing suppliers understate the index.',
      'Bands are competition-economics thresholds reused as risk signals.',
      'Substitutability and switching cost sit outside this number.'],
    w: w,
    k: ['HHI ' + (isFinite(hhi) ? PS.qty(hhi) : '—') + ': ' + band[0].toLowerCase(),
      'Top supplier: ' + (isFinite(top) ? PS.pct(top) : '—') + ' of ' + PS.moneyR(total),
      isFinite(hhi) && hhi > 2500 ? 'De-concentration plan required' : 'Monitor top-supplier growth'],
    s: 'HHI ' + (isFinite(hhi) ? PS.qty(hhi) : '—') + ' (' + band[0].toLowerCase() + '); top supplier ' + (isFinite(top) ? PS.pct(top) : '—') + '.',
    d: { hhi: hhi, band: band[0], topShare: top, total: total }
  });
};
