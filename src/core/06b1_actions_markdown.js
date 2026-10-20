/* ==========================================================
   Full-fidelity Markdown export (Section 26, 37, 70)

   The previous exporter emitted a generic skeleton: for an SOP it produced
   a title, a purpose and a numbered list of steps, dropping RACI, decision
   gates, controls, records, KPIs, risks, exceptions, mistakes, references
   and revision history. For a checklist it wrote every box unticked,
   discarding the evidence the user had actually produced.

   PS.toMarkdown renders the whole controlled document for each content
   type, and includes live workspace state where the type has any.
   ========================================================== */
PS.mdList = function (items, indent) {
  var pad = indent || '';
  return (items || []).map(function (x) { return pad + '- ' + x; }).join('\n');
};
PS.mdTable = function (headers, rows) {
  var out = ['| ' + headers.join(' | ') + ' |', '| ' + headers.map(function () { return '---'; }).join(' | ') + ' |'];
  (rows || []).forEach(function (r) {
    out.push('| ' + r.map(function (c) { return String(c === undefined || c === null ? '' : c).replace(/\|/g, '\\|'); }).join(' | ') + ' |');
  });
  return out.join('\n');
};
PS.mdValue = function (v) {
  if (v === undefined || v === null || v === '') return '';
  return String(v);
};

PS.toMarkdown = function (type, it, ctx) {
  ctx = ctx || {};
  var md = ['# ' + (it.title || it.term || 'Untitled'), ''];
  if (it.cat) md.push('**Type:** ' + it.cat + '  ');
  if (it.version) md.push('**Version:** ' + it.version + '  ');
  if (it.owner) md.push('**Document owner:** ' + it.owner + '  ');
  if (it.review) md.push('**Review cycle:** ' + it.review + '  ');
  if (it.id) md.push('**Reference:** ' + it.id);
  md.push('');

  /* ---------------- SOP: the full controlled document ---------------- */
  if (type === 'sop') {
    if (it.purpose) md.push('## Purpose', '', it.purpose, '');
    if (it.scope) md.push('## Scope', '', it.scope, '');
    if (it.outScope) md.push('## Out of scope', '', it.outScope, '');
    if (it.trigger) md.push('## Trigger', '', it.trigger, '');
    if (it.roles) md.push('## Roles in scope', '', it.roles, '');
    if (it.raci && it.raci.length) {
      md.push('## RACI', '', PS.mdTable(['Role', 'Responsibility'],
        it.raci.map(function (r) { return [r.role || '', r.resp || '']; })), '');
    }
    if (it.frequency) md.push('**Typical frequency:** ' + it.frequency, '');
    if (it.duration) md.push('**Typical duration:** ' + it.duration, '');
    if (it.flow && it.flow.length) {
      md.push('## Process flow', '', it.flow.map(function (s, i) { return (i + 1) + '. ' + s; }).join('\n'), '');
    }
    if (it.steps && it.steps.length) {
      md.push('## Procedure', '');
      it.steps.forEach(function (s, i) {
        md.push('### Step ' + (i + 1) + ': ' + (s.s || ''));
        md.push('');
        if (s.d) md.push(s.d, '');
        var meta = [];
        if (s.role) meta.push('**Owner:** ' + s.role);
        if (s.ctrl) meta.push('**Control:** ' + s.ctrl);
        if (s.out) meta.push('**Record produced:** ' + s.out);
        if (meta.length) md.push(meta.join('  \n'), '');
      });
    }
    if (it.inputs && it.inputs.length) md.push('## Inputs', '', PS.mdList(it.inputs), '');
    if (it.outputs && it.outputs.length) md.push('## Outputs', '', PS.mdList(it.outputs), '');
    if (it.decisions && it.decisions.length) {
      md.push('## Decision points', '', PS.mdTable(['Decision', 'Basis'],
        it.decisions.map(function (d) { return [d.q || d.g || '', d.a || d.d || '']; })), '');
    }
    if (it.control && it.control.length) md.push('## Controls', '', PS.mdList(it.control), '');
    if (it.kpis && it.kpis.length) {
      md.push('## KPIs', '', PS.mdTable(['KPI', 'Title'], it.kpis.map(function (k) {
        var o = PS.byId('kpi', k);
        return [k, o ? o.title : ''];
      })), '');
    }
    if (it.records && it.records.length) md.push('## Records to be retained', '', PS.mdList(it.records), '');
    if (it.retention) md.push('## Retention', '', it.retention, '');
    if (it.risks && it.risks.length) md.push('## Risks', '', PS.mdList(it.risks), '');
    if (it.exceptions && it.exceptions.length) md.push('## Exceptions', '', PS.mdList(it.exceptions), '');
    if (it.mistakes && it.mistakes.length) md.push('## Common mistakes', '', PS.mdList(it.mistakes), '');
    if (it.refs && it.refs.length) md.push('## References', '', PS.mdList(it.refs), '');
    if (it.revisions && it.revisions.length) md.push('## Revision history', '', PS.mdList(it.revisions), '');
    if (it.checklist) {
      var cl = PS.byId('cl', it.checklist);
      md.push('## Execution evidence', '', 'This procedure is executed against checklist: **' +
        (cl ? cl.title : it.checklist) + '**. Record the completed checklist with this document.', '');
    }
  }

  /* ---------------- Checklist: with live completion state ---------------- */
  if (type === 'cl') {
    if (it.desc) md.push(it.desc, '');
    var st = PS.clState.get(ctx.id || it.id);
    var checked = (st && st.checked) || {};
    var total = 0, done = 0;
    (it.sections || []).forEach(function (sec) {
      md.push('## ' + (sec.g || ''), '');
      (sec.items || []).forEach(function (x, i) {
        var key = (sec.g || '') + '|' + i;
        var on = !!checked[key];
        total++;
        if (on) done++;
        md.push('- [' + (on ? 'x' : ' ') + '] ' + x);
      });
      md.push('');
    });
    md.push('**Completion:** ' + done + ' of ' + total + ' items (' +
      (total ? Math.round(done / total * 100) : 0) + '%)', '');
    if (st && st.notes) md.push('## Notes', '', st.notes, '');
  }

  /* ---------------- Template: with current field values ---------------- */
  if (type === 'tpl') {
    if (it.purpose) md.push(it.purpose, '');
    var ts = PS.tplState.get(ctx.id || it.id);
    var vals = (ts && ts.values) || {};
    (it.sections || []).forEach(function (sec) {
      md.push('## ' + (sec.g || ''), '');
      (sec.fields || []).forEach(function (f) {
        var v = vals[f.k];
        md.push('**' + (f.label || f.k) + (f.req ? ' (required)' : '') + ':** ' +
          (v === undefined || v === null || v === '' ? '_(not completed)_' : v));
        md.push('');
      });
    });
    if (it.checklist) {
      md.push('## Confirmations', '');
      PS.Lv(it.checklist).forEach(function (ck) { md.push('- [ ] ' + ck); });
      md.push('');
    }
    if (it.prompts && it.prompts.length) md.push('## Prompts to answer', '', PS.mdList(it.prompts), '');
    if (ts && ts.notes) md.push('## Notes', '', ts.notes, '');
  }

  /* ---------------- Knowledge concept ---------------- */
  if (type === 'kb') {
    if (it.def) md.push(it.def, '');
    if (it.full) md.push('## In detail', '', it.full, '');
    if (it.why && it.why.length) md.push('## Why it matters', '', PS.mdList(it.why), '');
    if (it.when && it.when.length) md.push('## When it applies', '', PS.mdList(it.when), '');
    if (it.how && it.how.length) md.push('## How it is done', '', PS.mdList(it.how), '');
    if (it.ex) md.push('## Worked example', '', it.ex, '');
    if (it.risks && it.risks.length) md.push('## Risks', '', PS.mdList(it.risks), '');
    if (it.mistakes && it.mistakes.length) md.push('## Common mistakes', '', PS.mdList(it.mistakes), '');
  }

  /* ---------------- Decision guide ---------------- */
  if (type === 'dec') {
    if (it.intro) md.push(it.intro, '');
    if (it.question) md.push('**Question:** ' + it.question, '');
    if (it.explain) md.push('## How the guidance works', '', it.explain, '');
    if (it.factors && it.factors.length) {
      md.push('## Questions to answer', '');
      it.factors.forEach(function (f, i) {
        md.push('**' + (i + 1) + '. ' + (f.q || '') + '**');
        if (f.hint) md.push('_' + f.hint + '_');
        md.push('');
      });
    }
    if (ctx.answers) {
      md.push('## Answers recorded', '');
      Object.keys(ctx.answers).forEach(function (k) {
        var idx = parseInt(String(k).replace('f', ''), 10);
        var f = (it.factors || [])[idx];
        md.push('- ' + (f ? f.q : k) + ': **' + ctx.answers[k] + '**');
      });
      md.push('');
    }
    if (it.options && it.options.length) {
      md.push('## Options considered', '', PS.mdTable(['Option', 'Description'],
        it.options.map(function (o) { return [o.label || o.k, o.desc || '']; })), '');
    }
    if (it.followThrough && it.followThrough.length) md.push('## What to do next', '', PS.mdList(it.followThrough), '');
  }

  /* ---------------- KPI ---------------- */
  if (type === 'kpi') {
    if (it.def) md.push(it.def, '');
    if (it.formula) md.push('## Formula', '', '`' + it.formula + '`', '');
    if (it.formulaNote) md.push(it.formulaNote, '');
    if (it.inputs && it.inputs.length) md.push('## Inputs required', '', PS.mdList(it.inputs), '');
    if (it.example) md.push('## Worked example', '', it.example, '');
    if (it.interp && it.interp.length) md.push('## How to read it', '', PS.mdList(it.interp), '');
    if (it.limits && it.limits.length) md.push('## Limitations', '', PS.mdList(it.limits), '');
    if (it.mistakes && it.mistakes.length) md.push('## Common mistakes', '', PS.mdList(it.mistakes), '');
    if (it.practice && it.practice.length) md.push('## Good practice', '', PS.mdList(it.practice), '');
    if (it.target) md.push('**Target:** ' + it.target, '');
  }

  /* ---------------- Glossary ---------------- */
  if (type === 'gloss') {
    if (it.def) md.push(it.def, '');
    if (it.full) md.push('## In detail', '', it.full, '');
    if (it.why && it.why.length) md.push('## Why it matters', '', PS.mdList(it.why), '');
  }

  /* ---------------- Scenario ---------------- */
  if (type === 'scen') {
    if (it.problem) md.push(it.problem, '');
    if (it.summary) md.push(it.summary, '');
    if (it.steps && it.steps.length) {
      md.push('## How the situation unfolds', '');
      it.steps.forEach(function (s, i) {
        md.push('**' + (i + 1) + '. ' + (s.label || '') + '**' + (s.note ? ' - ' + s.note : ''));
        md.push('');
      });
    }
    if (it.checks && it.checks.length) md.push('## What good looks like', '', PS.mdList(it.checks), '');
    if (it.watchOut && it.watchOut.length) md.push('## What to watch out for', '', PS.mdList(it.watchOut), '');
  }

  /* ---------------- Calculator ---------------- */
  if (type === 'calc') {
    if (it.purpose) md.push(it.purpose, '');
    if (it.formula && it.formula.length) md.push('## How it is calculated', '', PS.mdList(it.formula), '');
    if (it.assumptions && it.assumptions.length) md.push('## Assumptions', '', PS.mdList(it.assumptions), '');
    if (it.fields && it.fields.length) {
      md.push('## Inputs', '', PS.mdTable(['Field', 'Unit', 'Required'],
        it.fields.map(function (f) { return [f.label || f.k, f.unit || '', f.req ? 'yes' : '']; })), '');
    }
    if (ctx.values) {
      md.push('## Values used', '', PS.mdTable(['Field', 'Value'],
        it.fields.map(function (f) { return [f.label || f.k, PS.mdValue(ctx.values[f.k])]; })), '');
    }
    if (ctx.results && ctx.results.length) {
      md.push('## Results', '', PS.mdTable(['Measure', 'Value'],
        ctx.results.map(function (r) { return [r.label, r.value]; })), '');
    }
    if (ctx.summaryText) md.push('## Interpretation', '', ctx.summaryText, '');
  }

  /* ---------------- Related items, for every type ---------------- */
  var rel = it.rel || {};
  var relNames = PS.REL_LABEL || {};
  Object.keys(rel).forEach(function (k) {
    var t = PS.REL_TYPE[PS.relKey(k)];
    if (!t) return;
    var links = PS.relatedItems(it, k).filter(function (r) { return !r.missing; });
    if (!links.length) return;
    md.push('## ' + (relNames[k] || 'Related'), '');
    links.forEach(function (r) {
      md.push('- [' + r.title + '](' + PS.routeFor(r.type, r.id) + ')');
    });
    md.push('');
  });

  md.push('---', '');
  md.push('Exported from Procure Sherpa v' + PS.VERSION + ' on ' + PS.dateTime() + '.');
  return md.join('\n');
};
