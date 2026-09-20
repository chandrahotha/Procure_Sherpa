/* ---------- compact field and group declarations (keeps content fragments small) ----------
   PS.F('unitPrice|Unit price|currency|req,nn|12.4')
     parts: key | label | unit | flags | default
     flags: req required, pos > 0, nn >= 0, int whole number, check checkbox,
            sel select (options after the default), pct percent unit, curr currency,
            min=n max=n, step=n, tip=text, ph=placeholder, opts=a;b;c
   PS.G('Purchase', 'unitPrice qty discount')                                        */
PS.F = function (spec, label, unit, flags, def) {
  if (arguments.length > 1) {
    /* multi-arg form: PS.F(key, label, unit, flags, def).
       Unit shorthands match the pipe form; 'text'/'sel' in the unit slot
       select the control type. A '|default' suffix inside flags works too. */
    var u = unit || '', fl = flags || '';
    if (u === 'text' || u === 'sel') { fl = fl ? (u + ',' + fl) : u; u = ''; }
    var parts = [spec, (label === undefined || label === null || label === '') ? spec : label, u, fl];
    if (def !== undefined && def !== null && def !== '') parts.push(String(def));
    return PS.F(parts.join('|'));
  }
  var p = String(spec).split('|');
  var f = { k: p[0], label: p[1] || p[0] };
  /* named 'un', not 'unit': 'unit' is already this function's parameter,
     and shadowing it here only happened to be safe because the multi-arg
     branch above returns before reaching this point. */
  var un = p[2] || '';
  if (un === 'curr') un = 'currency';
  if (un === 'pct') un = 'percent';
  if (un === 'bool') { f.type = 'check'; un = ''; }
  if (un && un !== 'text') f.unit = un;
  (p[3] || '').split(',').forEach(function (fl) {
    if (fl === 'req') f.req = true;
    else if (fl === 'pos') f.positive = true;
    else if (fl === 'nn') f.nonNegative = true;
    else if (fl === 'int') f.int = true;
    else if (fl === 'check') f.type = 'check';
    else if (fl === 'sel') f.type = 'select';
    else if (fl === 'date') f.type = 'date';
    else if (fl === 'text') f.type = 'text';
    else if (fl.indexOf('min=') === 0) f.min = PS.num(fl.slice(4));
    else if (fl.indexOf('max=') === 0) f.max = PS.num(fl.slice(4));
    else if (fl.indexOf('step=') === 0) f.step = PS.num(fl.slice(5));
    else if (fl.indexOf('tip=') === 0) f.tip = fl.slice(4).replace(/_/g, ' ');
    else if (fl.indexOf('ph=') === 0) f.ph = fl.slice(3).replace(/_/g, ' ');
    else if (fl.indexOf('opts=') === 0) {
      f.options = fl.slice(5).split(';').map(function (o) { return o.replace(/_/g, ' '); });
    } else if (fl) f.help = fl.replace(/_/g, ' ');
  });
  if (p[4] !== undefined && p[4] !== '') {
    if (f.type === 'check') f.def = (p[4] === '1' || p[4] === 'true');
    else if (f.type === 'select' || f.unit === undefined && f.type === 'text') f.def = p[4];
    else f.def = PS.num(p[4]);
  }
  if (f.type === 'sel') f.type = 'select';
  return f;
};
PS.G = function (name, keys, note) { return { g: name, keys: String(keys).split(' '), note: note }; };
/* compact calculation output envelope */
PS.C = function (o) {
  return {
    results: o.r || [], table: o.t || null, analysis: o.a || '', formula: o.f || null,
    assumptions: o.as || null, warnings: o.w || [], keyFindings: o.k || null,
    summaryText: o.s || '', data: o.d || null
  };
};
PS.res = function (label, value, note, status, primary) {
  return { label: label, value: value, note: note || '', status: status || '', primary: !!primary };
};