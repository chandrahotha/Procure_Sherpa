/* ==========================================================
   Doc Pack Builder page (roadmap 11.6)
   ========================================================== */
PS.route('docpack', function () {
  PS.pageTitle = 'Document Pack Builder';
  var candidates = PS.docpack.candidates();
  var byCat = {};
  candidates.forEach(function (c) {
    if (!byCat[c.cat]) byCat[c.cat] = [];
    byCat[c.cat].push(c);
  });
  var catNames = Object.keys(byCat).sort();
  var pickHtml = catNames.map(function (cn) {
    return '<div class="card"><h3>' + PS.esc(cn) + '</h3>' +
      '<div class="docpack-pick-list">' +
      byCat[cn].map(function (c) {
        return '<label><input type="checkbox" data-act="docpack-toggle" data-id="' + PS.escAttr(c.type + '|' + c.id) + '">' +
          '<span><strong>' + PS.esc(c.title) + '</strong><br><small>' + PS.esc(PS.typeLabel(c.type)) + (c.desc ? ' \u00B7 ' + PS.esc(c.desc) : '') + '</small></span></label>';
      }).join('') +
      '</div></div>';
  }).join('');
  return PS.reportHead('Document pack builder', 'RFI / RFP / contract packs') +
    '<div class="card"><div class="card-head"><div><h1>Document pack builder</h1>' +
    '<p class="card-sub">Assemble templates, checklists, decision guides and scenarios into a single print-ready package with a cover sheet and table of contents - ideal for RFI/RFP issuance, contract negotiation packs and audit evidence.</p></div></div>' +
    '<div class="field"><label for="docpackTitle">Pack title</label>' +
    '<input type="text" id="docpackTitle" value="' + PS.esc('Procurement document pack - ' + PS.dateStr()) + '" maxlength="140"></div>' +
    '<div class="btn-row">' +
    '<button type="button" class="btn btn-primary" data-act="docpack-build">Build pack (opens printable copy)</button>' +
    '<button type="button" class="btn" data-act="docpack-download">Download .html</button>' +
    '<button type="button" class="btn" data-act="docpack-print">Print / PDF</button>' +
    '</div>' +
    '<p class="note">Choose the documents below. The pack opens in a new window styled for printing.</p>' +
    '</div>' +
    pickHtml +
    '<div class="card"><div class="card-head"><h2>Previously created packs</h2></div>' + PS.docpack.packsHtml() + '</div>' +
    PS.disclaimer('legal');
});