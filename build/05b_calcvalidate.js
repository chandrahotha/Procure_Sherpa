PS.validateCalc = function (calc, values) {
  var errors = {};
  (calc.fields || []).forEach(function (f) {
    var v = values[f.k], bad = null;
    var empty = (v === null || v === undefined || v === '');
    if (f.req) {
      if (f.type === 'check') { if (!v) bad = f.errReq || 'Please confirm this item.'; }
      else if (empty) bad = f.errReq || 'A value is required.';
      else if (f.type === 'number' && !isFinite(v)) bad = 'Enter a valid number.';
    }
    if (!bad && f.type === 'number' && !empty && v !== null) {
      if (!isFinite(v)) bad = 'Enter a valid number.';
      else if (f.min !== undefined && v < f.min) bad = 'Must be at least ' + f.min + (f.unit === 'percent' ? '%' : '') + '.';
      else if (f.max !== undefined && v > f.max) bad = 'Must not exceed ' + f.max + (f.unit === 'percent' ? '%' : '') + '.';
      else if (f.positive && v <= 0) bad = 'Enter a value greater than zero.';
      else if (f.nonNegative && v < 0) bad = 'Enter zero or more.';
      else if (f.int && Math.round(v) !== v) bad = 'Enter a whole number.';
    }
    if (bad) errors[f.k] = bad;
  });
  return errors;
};
PS.showCalcErrors = function (errors) {
  PS.$$('#calcForm [data-err]').forEach(function (el) {
    var k = el.dataset.err;
    if (errors[k]) { el.textContent = errors[k]; el.hidden = false; el.style.color = 'var(--danger)'; }
    else { el.textContent = ''; el.hidden = true; }
  });
  PS.$$('#calcForm [data-fkey]').forEach(function (f) {
    var inp = PS.$('input,select,textarea', f);
    if (inp) inp.classList.toggle('is-invalid', !!errors[f.dataset.fkey]);
  });
  var keys = Object.keys(errors);
  if (keys.length) {
    var first = PS.$('[data-fkey="' + keys[0] + '"] input, [data-fkey="' + keys[0] + '"] select');
    if (first) first.focus();
    PS.toast(keys.length + ' field' + (keys.length > 1 ? 's need' : ' needs') + ' attention: ' + errors[keys[0]], 'danger');
  }
  return keys.length === 0;
};
PS.runCalc = function (silent) {
  var calc = PS.byId('calc', PS.calcState.id);
  if (!calc) return;
  var values = PS.readCalcInputs();
  if (!PS.showCalcErrors(PS.validateCalc(calc, values))) return;
  var out;
  try { out = calc.run(values); }
  catch (e) {
    if (window.console && console.error) console.error(e);
    PS.toast('This calculation could not be completed with the values entered. Check that no divisor is zero.', 'danger');
    return;
  }
  if (!out) return;
  PS.calcState.values = values;
  PS.calcState.result = out;
  PS.calcState.dirty = true;
  var root = PS.$('#calcResult');
  if (root) {
    root.innerHTML = PS.renderCalcResult(calc, values, out);
    if (!silent) { try { root.scrollIntoView({ block: 'nearest' }); } catch (e) { } }
  }
  if (!silent) PS.audit('calculation-run', calc.title);
};
PS.calcTitleFor = function (title, suffix) {
  var p = PS.prefs();
  return (p.orgName ? p.orgName + ' - ' : '') + title + (suffix ? ' - ' + suffix : '');
};