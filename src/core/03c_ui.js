/* ---------- toast + modal framework ---------- */
PS.toast = function (msg, kind) {
  var t = PS.$('#toast');
  if (!t) return;
  t.className = 'toast' + (kind ? ' is-' + kind : '');
  t.textContent = PS.clean(msg, 400);
  t.hidden = false;
  clearTimeout(PS._toastT);
  PS._toastT = setTimeout(function () { t.hidden = true; }, 3400);
};
PS.modal = function (opts) {
  opts = opts || {};
  var root = PS.$('#modalRoot');
  var prevFocus = document.activeElement;
  root.innerHTML = '<div class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modalTitle">' +
    '<div class="modal' + (opts.wide ? ' modal-wide' : '') + '">' +
    '<h2 id="modalTitle">' + PS.esc(opts.title || 'Confirm') + '</h2>' +
    '<div class="modal-body" id="modalBody">' + (opts.body || '') + '</div>' +
    '<div class="modal-actions">' +
    (opts.cancelLabel === null ? '' : '<button type="button" class="btn" data-modal="cancel">' + PS.esc(opts.cancelLabel || 'Cancel') + '</button>') +
    '<button type="button" class="btn ' + (opts.danger ? 'btn-danger' : 'btn-primary') + '" data-modal="ok">' + PS.esc(opts.okLabel || 'Confirm') + '</button>' +
    '</div></div></div>';
  var back = PS.$('.modal-backdrop', root);
  function close() {
    root.innerHTML = '';
    document.removeEventListener('keydown', onKey);
    if (prevFocus && prevFocus.focus) { try { prevFocus.focus(); } catch (e) { } }
  }
  function onKey(e) { if (e.key === 'Escape') { close(); if (opts.onCancel) opts.onCancel(); } }
  document.addEventListener('keydown', onKey);
  back.addEventListener('click', function (e) {
    if (e.target === back) { close(); if (opts.onCancel) opts.onCancel(); }
  });
  var cab = PS.$('[data-modal="cancel"]', root);
  if (cab) cab.addEventListener('click', function () { close(); if (opts.onCancel) opts.onCancel(); });
  PS.$('[data-modal="ok"]', root).addEventListener('click', function () {
    if (opts.onOk && opts.onOk(back) === false) return;
    close();
  });
  var first = PS.$('#modalBody input, #modalBody select, #modalBody textarea', root) || PS.$('.modal-actions .btn-primary', root);
  if (first) { try { first.focus(); if (first.select && first.type !== 'checkbox') first.select(); } catch (e) { } }
  return { el: back, close: close };
};
PS.confirm = function (o) {
  o = o || {};
  return PS.modal({
    title: o.title || 'Please confirm',
    body: o.body || '',
    okLabel: o.okLabel || 'Confirm',
    cancelLabel: o.cancelLabel || 'Cancel',
    danger: o.danger, wide: o.wide, onOk: o.onOk, onCancel: o.onCancel
  });
};
PS.promptText = function (o) {
  o = o || {};
  return PS.modal({
    title: o.title || 'Enter a value',
    body: '<div class="field"><label for="promptVal">' + PS.esc(o.label || 'Value') + '</label>' +
      '<input type="text" id="promptVal" value="' + PS.esc(o.value || '') + '" maxlength="160"></div>' +
      (o.hint ? '<p class="note">' + PS.esc(o.hint) + '</p>' : ''),
    okLabel: o.okLabel || 'Save',
    onOk: function (root) {
      var v = PS.clean(PS.$('#promptVal', root).value, 160);
      if (!v) { PS.toast('A value is required.', 'danger'); return false; }
      if (o.onOk) o.onOk(v);
    }
  });
};
/* footer note helper used by many pages */
PS.withDisclaimer = function (kind) {
  var D = {
    policy: 'Approval thresholds and procurement requirements vary by organization. Configure Procure Sherpa in Settings to match your company policy before operational use.',
    tax: 'Tax treatment varies by jurisdiction and transaction type. Verify applicable tax rules before using results for accounting or compliance decisions.',
    legal: 'Contract and legal guidance in this toolkit is general procurement information and is not a substitute for qualified legal advice.',
    finance: 'Financial calculations are decision-support estimates. Validate assumptions before committing funds.',
    data: 'Results depend entirely on the figures you enter. Procure Sherpa does not verify or benchmark supplier data.'
  };
  return '<p class="disclaimer">' + PS.esc(D[kind] || D.data) + '</p>';
};