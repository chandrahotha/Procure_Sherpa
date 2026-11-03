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

/* Draft the numbers as well as the notes, keyed to the calculator they
   belong to, so a return trip restores the right tool's work. One draft per
   calculator at a time is the existing model (PS.K.draft held calc + notes),
   and it is kept that way rather than widened, because Reset and Purge
   already assume a single record. */
PS.draftCalcInputs = function (calc) {
  if (!calc) return;
  var cur = PS.store.get(PS.K.draft, {}) || {};
  var vals = PS.readCalcInputs();
  PS.store.set(PS.K.draft, {
    calc: calc.id,
    notes: (PS.$('#calcNotes') ? PS.$('#calcNotes').value : (cur.notes || '')),
    values: vals
  });
};
PS.calcPageInit = function (calc, params) {
  var prefill = PS.pendingPrefill;
  var prefillFor = prefill ? prefill.to : '';
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
  } else if (params && params.example) {
    /* A deep link from the Academy: 'see the example working'. The point
       of the link is that the reader arrives at a finished calculation
       rather than at an empty form, which is the difference between
       a tool that looks broken and a tool that looks alive. */
    PS.loadCalcExample(true);
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
      PS.draftCalcInputs(calc);
    }, 650));
  }
  var notes = PS.$('#calcNotes');
  if (notes) {
    var draft = PS.store.get(PS.K.draft, {});
    if (draft && draft.notes && draft.calc === calc.id) notes.value = draft.notes;
  }
  /* The draft used to keep the notes and throw away the numbers. A learner
     who typed a price, went to read the glossary term behind it and came
     back found the tool's shipped defaults again - in a product whose own
     offline panel says that anything entered stays in this browser. Inputs
     are now drafted beside the notes and put back on arrival, with a line
     saying where they came from so restored numbers are never mistaken for
     the reader's latest calculation. Reset clears the draft, as it already
     did, and Purge Workspace Session Data already covered the key. */
  if (!restored && prefillFor !== calc.id) {
    var d2 = PS.store.get(PS.K.draft, {});
    if (d2 && d2.calc === calc.id && d2.values && typeof d2.values === 'object') {
      var keys = Object.keys(d2.values);
      if (keys.length) {
        PS.setCalcInputs(d2.values);
        var anchor2 = PS.$('#calcForm');
        if (anchor2 && anchor2.parentNode) {
          var told = document.createElement('p');
          told.className = 'note no-print';
          told.innerHTML = 'Your unsaved entries from earlier were put back. <button type="button" class="btn btn-sm btn-ghost" data-act="clear">Clear them</button>';
          anchor2.parentNode.insertBefore(told, anchor2.nextSibling);
        }
      }
    }
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
PS.loadCalcExample = function (quiet) {
  var calc = PS.byId('calc', PS.calcState.id);
  if (!calc || !calc.example) { if (!quiet) PS.toast('No example data is available for this tool.'); return; }
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
/* ---------- Random plausible values ----------
   Every calculator carries a curated example. That example is the
   right thing to show a reader, and it is the wrong thing to explore
   with: once you have seen one set of numbers you can see how the tool
   behaves, but you cannot see whether it is right because you cannot
   vary the inputs.

   So there are two buttons. 'Example' loads the curated set, which is
   the demonstration. 'Random values' perturbs it, which is the
   exploration. The perturbation is deliberately wide enough to change
   the answer - a five percent wobble would be a worse version of the
   example - and deliberately narrow enough that the figures still look
   like procurement rather than like noise.

   The base for the perturbation is the example value where there is one,
   then the field default, then a range that suits the unit. Constraints
   declared on the field (integer, non-negative, minimum, maximum) are
   respected, because a random value that breaks the field's own rules
   teaches the reader that the tool is broken rather than that it is
   exploring. */
PS.calcRandomValue = function (f, base) {
  var unit = f.unit || '';
  var n = base;
  if (n === null || n === undefined || n === '' || isNaN(n)) {
    if (unit === 'percent') n = 8;
    else if (unit === 'years') n = 5;
    else if (unit === 'qty') n = 1000;
    else if (unit === 'currency') n = 10000;
    else n = 100;
  }
  n = PS.num(n);
  /* Percentages live on a much smaller scale than money, so a
     percentage gets a tighter wobble. */
  var spread = unit === 'percent' ? 0.45 : 0.55;
  var factor = 1 - spread + Math.random() * (spread * 2);
  var out = n * factor;
  if (f.int) out = Math.round(out);
  else if (unit === 'currency') {
    if (Math.abs(out) >= 1000) out = Math.round(out / 10) * 10;
    else if (Math.abs(out) >= 100) out = Math.round(out);
    else out = Math.round(out * 100) / 100;
  } else if (unit === 'percent') out = Math.round(out * 100) / 100;
  else out = Math.round(out * 100) / 100;
  if (f.min !== undefined && f.min !== null && out < f.min) out = f.min;
  if (f.max !== undefined && f.max !== null && out > f.max) out = f.max;
  if (f.nonNegative && out < 0) out = 0;
  if (f.positive && out <= 0) out = f.min !== undefined && f.min !== null ? f.min : 1;
  return out;
};
PS.loadCalcRandom = function () {
  var calc = PS.byId('calc', PS.calcState.id);
  if (!calc) return;
  var ex = calc.example || {};
  var values = {};
  (calc.fields || []).forEach(function (f) {
    if (f.type === 'check') {
      values[f.k] = Math.random() < 0.4;
      return;
    }
    if (f.type === 'select') {
      var opts = f.options || [];
      if (!opts.length) { values[f.k] = f.def; return; }
      /* Pick something other than the default most of the time, so the
         reader sees a different branch of the decision, not the same
         answer in a different order. */
      var pick = Math.floor(Math.random() * opts.length);
      if (opts.length > 1 && pick === opts.indexOf(f.def)) pick = (pick + 1) % opts.length;
      var o = opts[pick];
      values[f.k] = (o && typeof o === 'object') ? o.v : o;
      return;
    }
    if (f.type === 'date' || f.type === 'text') {
      values[f.k] = (ex[f.k] !== undefined) ? ex[f.k] : (f.def !== undefined ? f.def : '');
      return;
    }
    var base = (ex[f.k] !== undefined && ex[f.k] !== null && ex[f.k] !== '') ? ex[f.k] : f.def;
    values[f.k] = PS.calcRandomValue(f, base);
  });
  PS.setCalcInputs(values);
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
  box.innerHTML = '<strong>Random values loaded.</strong>' +
    'These are plausible figures, not market data. Change any of them and the result moves, ' +
    'which is how you check that the tool is telling you something about your numbers ' +
    'rather than about the example.';
  PS.toast('Random values loaded.', 'ok');
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