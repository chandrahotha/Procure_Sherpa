/* ============ Calc logic: PO Value Check ============ */
PS.calcImpl.poValueCheck = function (v) {
  var p = PS.prefs();
  var sorted = (p.thresholds || []).filter(function (t) { return t && t.label; }).sort(function (a, b) {
    var am = PS.num(a.max) || 0, bm = PS.num(b.max) || 0;
    if (am === 0) return 1;
    if (bm === 0) return -1;
    return am - bm;
  });
  var applicable = null;
  for (var i = 0; i < sorted.length; i++) {
    var max = PS.num(sorted[i].max) || 0;
    if (max === 0 || v.poValue <= max) { applicable = sorted[i]; break; }
  }
  if (!applicable && sorted.length) applicable = sorted[sorted.length - 1];
  var bidThreshold = PS.num(p.competitiveBidThreshold) || 0;
  var competitiveExpected = bidThreshold > 0 ? v.poValue > bidThreshold : null;
  var gap = competitiveExpected && v.quotesObtained === 0;
  var w = [];
  if (!sorted.length) w.push('No approval thresholds are configured. Open Settings and enter your delegated authority levels so this check can identify the required approval.');
  if (competitiveExpected === null) w.push('No competitive-bidding threshold is configured. Many organizations set one; enter yours in Settings and this check will flag purchases above it.');
  if (gap) w.push('The value is above your competitive-bidding threshold but no quotations are recorded. Either run a competitive process or document why a direct award is appropriate.');
  if (v.soleSource && v.quotesObtained > 0) w.push('A single or sole source award is recorded alongside ' + v.quotesObtained + ' quotation(s). Confirm which position is correct - the file should tell one consistent story.');
  if (v.soleSource) w.push('A single or sole source award needs a written justification covering why competition is not possible, what alternatives were considered and how value for money was tested.');
  if (!v.budgetApproved) w.push('Budget confirmation is outstanding. A purchase order should not be raised before the budget holder confirms funding.');
  if (v.riskLevel === 'High') w.push('High assessed risk: confirm that due diligence, continuity planning and exit provisions are addressed before award.');
  var rows = sorted.map(function (t) {
    var max = PS.num(t.max) || 0;
    var isIt = applicable && t.label === applicable.label;
    return { cls: isIt ? 'is-best' : '', cells: [t.label, max === 0 ? 'No upper limit' : PS.moneyR(max), isIt ? 'Applicable to this purchase' : ''] };
  });
  return PS.C({
    r: [PS.res('Required approval level', applicable ? applicable.label : 'Not configured', applicable ? (PS.num(applicable.max) ? 'Covers values up to ' + PS.moneyR(PS.num(applicable.max)) : 'No upper limit') : 'Configure thresholds in Settings', 'ok', true),
      PS.res('Competitive bidding expected', competitiveExpected === null ? 'Not configured' : (competitiveExpected ? 'Yes' : 'No'), bidThreshold > 0 ? 'Your threshold: ' + PS.moneyR(bidThreshold) : 'Set a threshold in Settings', competitiveExpected ? 'warn' : '', true),
      PS.res('Quotations recorded', PS.qty(v.quotesObtained), gap ? 'No quotations on file for a value above your threshold' : 'As recorded for this purchase'),
      PS.res('Documentation position', v.soleSource ? 'Justification required' : (v.contractInPlace ? 'Contract in place' : 'Contract not in place'), v.budgetApproved ? 'Budget confirmed' : 'Budget confirmation outstanding')],
    t: { headers: ['Approval level', 'Covers values up to', 'Applies here'], numCols: 1, rows: rows,
      caption: 'Thresholds come from Settings and are your own figures.' },
    a: '<p>At ' + PS.moneyR(v.poValue) + ' the purchase falls to <strong>' + PS.esc(applicable ? applicable.label : 'an approval level you have not configured yet') + '</strong>. ' +
      (competitiveExpected === null ? 'No competitive-bidding threshold is set, so this check cannot say whether competition is expected.' :
        competitiveExpected ? 'The value is above your competitive-bidding threshold of ' + PS.moneyR(bidThreshold) + ', so a competitive process is expected unless a documented exception applies.' :
          'The value is within your competitive-bidding threshold of ' + PS.moneyR(bidThreshold) + ', so a simplified route may be acceptable under your policy.') + '</p>' +
      '<p>Threshold checking is only part of a defensible file: reviewers also ask what the requirement was, how price was tested, who approved it and why the supplier was chosen. ' +
      (v.soleSource ? 'Where competition was not used, the written justification carries the file.' : 'Where competition was used, the evaluation and award recommendation carry the file.') +
      ' Procure Sherpa applies the thresholds you configured - it does not know your policy.</p>',
    f: ['Applicable approval level = first configured level whose limit is greater than or equal to the purchase value',
      'A limit of 0 is treated as no upper bound',
      'Competitive bidding expected = purchase value > configured competitive-bidding threshold'],
    as: ['Thresholds and the bidding threshold are your own configuration, shown in the table above.',
      'Risk, category, contract status and urgency can raise or lower approval requirements in most policies; this check flags them for review.'],
    w: w,
    k: ['Approval level: ' + (applicable ? applicable.label : 'not configured'),
      competitiveExpected === null ? 'Competitive bidding: threshold not configured' : 'Competitive bidding expected: ' + (competitiveExpected ? 'yes' : 'no'),
      v.soleSource ? 'Single source award: justification required' : 'Competition used: retain evaluation and award record'],
    s: 'Value ' + PS.moneyR(v.poValue) + ' requires approval at ' + (applicable ? applicable.label : 'a level you have not configured') + '.',
    d: { poValue: v.poValue, approvalLevel: applicable ? applicable.label : '', competitiveExpected: competitiveExpected }
  });
};