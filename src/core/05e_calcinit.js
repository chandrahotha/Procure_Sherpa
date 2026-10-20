/* ---------- calculator page initialisation, guidance, examples ---------- */
/* Restore a saved calculation. PS.pendingSaved was written by the
   "saved-open" action in three places and read in none, so opening a saved
   calculation showed the tool's defaults with an empty results panel. */
PS.applyPendingSaved = function (calc) {
  var rec = PS.pendingSaved;
  if (!rec || !calc) return false;
  var d = rec.data || {};
  var targetId = d.calc || (rec.type === 'quote-comparison' ? 'calc-compare-quotes' : null);
  if (targetId !== calc.id) return false;
  PS.pendingSaved = null;
  if (!d.values || typeof d.values !== 'object') return false;
  PS.setCalcInputs(d.values);
  PS.runCalc(true);
  var note = document.createElement('div');
  note.className = 'alert alert-info no-print';
  note.innerHTML = '<strong>Reopened from your saved work: ' + PS.esc(rec.title) + '</strong>' +
    'The values you saved are back in the form and the result has been recalculated. ' +
    'Nothing was overwritten in your workspace - use Save again if you want a new copy.';
  var anchor = PS.$('#calcForm');
  if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(note, anchor);
  PS.toast('Saved calculation reopened.', 'ok');
  return true;
};

PS.calcPageInit = function (calc, params) {
  var prefill = PS.pendingPrefill;
  /* A reopened saved calculation takes priority over a cross-tool handoff:
     it carries the user's own prior work, not another tool's values. */
  var restored = PS.applyPendingSaved(calc);
  if (restored) prefill = null;
  if (prefill && prefill.to === calc.id) {
    var applied = [];
    (calc.fields || []).forEach(function (f) {
      var v = prefill.values ? prefill.values[f.k] : undefined;
      if (v === undefined || v === null || v === '') return;
      var el = PS.$('#calcForm [data-key="' + f.k + '"]');
      if (!el) return;
      if (el.type === 'checkbox') el.checked = !!v;
      else el.value = v;
      applied.push(f.label);
    });
    var from = PS.byId('calc', prefill.from);
    var fromTitle = from ? from.title : prefill.from;
    PS.pendingPrefill = null;
    var note = document.createElement('div');
    note.className = 'alert alert-info no-print';
    if (applied.length) {
      note.innerHTML = '<strong>Values received from ' + PS.esc(fromTitle) + '</strong>' +
        'Pre-filled ' + applied.length + ' field' + (applied.length > 1 ? 's' : '') + ': ' +
        PS.esc(applied.slice(0, 6).join(', ')) + '. Review them, then choose Calculate.';
    } else {
      note.innerHTML = '<strong>Opened from ' + PS.esc(fromTitle) + '</strong>' +
        'None of its fields matched this tool, so nothing was carried across. Enter your values manually.';
    }
    var anchor = PS.$('#calcForm');
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(note, anchor);
  } else if (params && params.s) {
    var payload = PS.decodeHashPayload(params.s);
    if (payload && payload.v) {
      PS.setCalcInputs(payload.v);
      PS.runCalc(true);
      PS.audit('share-link-opened', calc.title);
      PS.toast('Values were loaded from a shared link. Review them before relying on the result.', 'ok');
    } else {
      PS.toast('This shared link could not be read. No values were loaded.');
    }
  }
  var form = PS.$('#calcForm');
  if (form) {
    form.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && e.target && e.target.tagName === 'INPUT') { e.preventDefault(); PS.runCalc(false); }
    });
    form.addEventListener('input', PS.debounce(function () {
      PS.$$('#calcForm input.is-invalid').forEach(function (i) { i.classList.remove('is-invalid'); });
      PS.runCalc(true);
    }, 650));
  }
  var notes = PS.$('#calcNotes');
  if (notes) {
    var draft = PS.store.get(PS.K.draft, {});
    if (draft && draft.notes && draft.calc === calc.id) notes.value = draft.notes;
  }

  // Mobile bottom sheet for calculator inputs
  PS.initCalcBottomSheet();
};

PS.initCalcBottomSheet = function () {
  var trigger = PS.$('.calc-sheet-trigger');
  var panel = PS.$('.calc-panel-inputs');
  var backdrop = PS.$('.calc-sheet-backdrop');
  if (!trigger || !panel || !backdrop) return;

  function open() {
    panel.classList.add('is-open');
    backdrop.hidden = false;
    requestAnimationFrame(function () { backdrop.classList.add('is-open'); });
    trigger.setAttribute('aria-expanded', 'true');
    trigger.innerHTML = '<span>&#9660;</span> Close Inputs';
    document.body.style.overflow = 'hidden';
  }
  function close() {
    panel.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    setTimeout(function () { backdrop.hidden = true; }, 200);
    trigger.setAttribute('aria-expanded', 'false');
    trigger.innerHTML = '<span>&#9650;</span> Inputs';
    document.body.style.overflow = '';
  }
  function toggle() { if (panel.classList.contains('is-open')) close(); else open(); }

  trigger.addEventListener('click', toggle);
  backdrop.addEventListener('click', close);

  // Close on Escape
  document.addEventListener('keydown', function onEsc(e) {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) {
      close();
    }
  });

  // Show trigger only on mobile
  function checkMobile() {
    var isMobile = window.matchMedia('(max-width: 768px)').matches;
    trigger.hidden = !isMobile;
    if (!isMobile) { panel.classList.remove('is-open'); backdrop.classList.remove('is-open'); backdrop.hidden = true; }
  }
  checkMobile();
  window.addEventListener('resize', checkMobile);
};
PS.calcGuidance = function (calc) {
  var rows = [];
  if (calc.whenToUse) rows.push('<h3>When to use this tool</h3>' + PS.ul(calc.whenToUse));
  if (calc.decisionUse) rows.push('<h3>What this result should drive</h3>' + PS.ul(calc.decisionUse));
  if (calc.pitfalls) rows.push('<h3>Common mistakes</h3>' + PS.ul(calc.pitfalls));
  if (calc.documentation) rows.push('<h3>What to document</h3>' + PS.ul(calc.documentation));
  if (!rows.length) return '';
  return '<details class="acc"><summary>Professional guidance: when to use it, what it drives, what to document</summary>' +
    '<div class="acc-body">' + rows.join('') + '</div></details>';
};
PS.loadCalcExample = function () {
  var calc = PS.byId('calc', PS.calcState.id);
  if (!calc || !calc.example) { PS.toast('No example data is available for this tool.'); return; }
  PS.setCalcInputs(calc.example);
  PS.showCalcErrors({});
  PS.runCalc(false);
  var box = PS.$('#exampleNote');
  if (!box) {
    box = document.createElement('div');
    box.id = 'exampleNote';
    box.className = 'alert alert-info no-print';
    var anchor = PS.$('#calcForm');
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(box, anchor);
  }
  box.innerHTML = '<strong>Example data loaded - replace with your own information.</strong>' +
    'The figures demonstrate how this tool behaves; they are not market data, benchmarks or supplier positions.';
};
PS.calcSummaryText = function (calc, values, out) {
  var lines = [];
  lines.push(PS.APP + ' - ' + calc.title);
  lines.push('Generated: ' + PS.dateTime());
  if (PS.orgLine()) lines.push('Organisation: ' + PS.orgLine());
  lines.push('');
  lines.push('RESULTS');
  (out.results || []).forEach(function (r) { lines.push('- ' + r.label + ': ' + r.value); });
  if (out.summaryText) { lines.push(''); lines.push('INTERPRETATION'); lines.push(out.summaryText); }
  if (out.keyFindings) { lines.push(''); lines.push('KEY FINDINGS'); out.keyFindings.forEach(function (k) { lines.push('- ' + k); }); }
  var assumptions = (out.assumptions || []).concat(calc.assumptions || []);
  if (assumptions.length) { lines.push(''); lines.push('ASSUMPTIONS'); assumptions.forEach(function (a) { lines.push('- ' + a); }); }
  return lines.join('\n');
};