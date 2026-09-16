/* ==========================================================
   Compact content seed helpers (Section 54)
   Data fragments below call PS.SKB / PS.SSOP / etc. with short
   keys; these helpers expand them into the full item shapes the
   page renderers expect. Lists use ';' separated strings.
   ========================================================== */
PS.Lv = function (s) {
  return String(s || '').split(';').map(function (x) { return x.trim(); }).filter(Boolean);
};
PS.Pv = function (s) {
  return PS.Lv(s).map(function (x) {
    var i = x.indexOf('|');
    return i < 0 ? { s: x, d: '' } : { s: x.slice(0, i).trim(), d: x.slice(i + 1).trim() };
  });
};
PS.Dv = function (s) {
  return PS.Lv(s).map(function (x) {
    var i = x.indexOf('|');
    return i < 0 ? { q: x, a: '' } : { q: x.slice(0, i).trim(), a: x.slice(i + 1).trim() };
  });
};
/* knowledge concept */
PS.SKB = function (o) {
  PS_KB.push({
    id: o.i, title: o.t, cat: o.c || 'Fundamentals', def: o.d, full: o.f || '',
    why: PS.Lv(o.w), when: PS.Lv(o.n), how: PS.Lv(o.h), ex: o.e || '',
    risks: PS.Lv(o.r), mistakes: PS.Lv(o.m), rel: o.rel || {}
  });
};
/* SOP */
PS.SSOP = function (o) {
  PS_SOPS.push({
    id: o.i, title: o.t, cat: o.c, desc: (o.p || '').slice(0, 190),
    purpose: o.p || '', scope: o.s || '', trigger: o.g || '',
    roles: o.ro || '', frequency: o.fq || '',
    flow: PS.Lv(o.fl), steps: PS.Pv(o.st),
    inputs: PS.Lv(o.ip), outputs: PS.Lv(o.ot), decisions: PS.Dv(o.dc),
    control: PS.Lv(o.ct), kpis: PS.Lv(o.kp), records: PS.Lv(o.rc),
    risks: PS.Lv(o.rk), exceptions: PS.Lv(o.esc || o.exc), mistakes: PS.Lv(o.mt),
    checklist: o.cl || '', rel: o.rel || {}
  });
};
/* checklist: o.sc is an array of { g: section, items: [...] } */
PS.SCL = function (o) {
  PS_CL.push({ id: o.i, title: o.t, cat: o.c, desc: o.d || '', sections: o.sc, rel: o.rel || {} });
};
/* template: o.sc sections of fields, o.ck confirmations */
PS.STPL = function (o) {
  PS_TPL.push({
    id: o.i, title: o.t, cat: o.c, purpose: o.p || '', sections: o.sc,
    checklist: o.ck || '', prompts: PS.Lv(o.pr), rel: o.rel || {}
  });
};
/* decision guide: o.f factors [{q,hint,w:{opt:weight}}], o.o options [{k,label,desc}] */
PS.SDEC = function (o) {
  PS_DEC.push({
    id: o.i, title: o.t, cat: o.c || 'Sourcing', intro: o.n || '', question: o.q,
    explain: o.x || '', factors: o.f, options: o.o,
    followThrough: PS.Lv(o.ft), rel: o.rel || {}
  });
};
/* KPI */
PS.SKPI = function (o) {
  PS_KPI.push({
    id: o.i, title: o.t, cat: o.c, def: o.d, formula: o.fm, formulaNote: o.fn || '',
    inputs: PS.Lv(o.ip), example: o.ex, interp: PS.Lv(o.it), limits: PS.Lv(o.lm),
    mistakes: PS.Lv(o.mt), practice: PS.Lv(o.pg), target: o.tg || '', rel: o.rel || {}
  });
};
/* glossary entry */
PS.SGLS = function (o) {
  PS_GLOSS.push({ id: o.i, term: o.t, full: o.f || '', def: o.d, why: PS.Lv(o.w), rel: o.rel || {} });
};
/* scenario: o.st steps [{label,note,type,id}] */
PS.SSCN = function (o) {
  PS_SCEN.push({
    id: o.i, title: o.t, cat: o.c || 'Situations', problem: o.p, summary: o.sm || '',
    steps: o.st, checks: PS.Lv(o.ck), watchOut: PS.Lv(o.wo), rel: o.rel || {}
  });
};