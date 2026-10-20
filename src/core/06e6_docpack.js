/* ==========================================================
   Phase 11 - Doc Pack Builder (roadmap 11.6)
   Assemble RFI/RFP/contract packs from templates, checklists
   and decision guides into a single printable package with a
   cover sheet, executive summary and table of contents.
   ========================================================== */

PS.docpack = PS.docpack || {};

PS.docpack.KEY = 'ps_docpacks';
PS.docpack.all = function () {
  var d = PS.store.get(PS.docpack.KEY, {});
  return (d && typeof d === 'object') ? d : {};
};
PS.docpack.save = function (d) { PS.store.set(PS.docpack.KEY, d); };
PS.docpack.list = function () {
  var d = PS.docpack.all();
  return d.packs || [];
};

/* Candidate documents that can go into a pack. */
PS.docpack.candidates = function () {
  var out = [];
  (PS.data.tpl || []).forEach(function (x) {
    out.push({ type: 'tpl', id: x.id, title: x.title, cat: x.cat || 'Template', desc: x.purpose || '' });
  });
  (PS.data.cl || []).forEach(function (x) {
    out.push({ type: 'cl', id: x.id, title: x.title, cat: x.cat || 'Checklist', desc: x.desc || '' });
  });
  (PS.data.dec || []).forEach(function (x) {
    out.push({ type: 'dec', id: x.id, title: x.title, cat: x.cat || 'Decision', desc: x.intro || '' });
  });
  (PS.data.scen || []).forEach(function (x) {
    out.push({ type: 'scen', id: x.id, title: x.title, cat: x.cat || 'Scenario', desc: x.summary || '' });
  });
  return out;
};

/* Render one document's body inside a pack.
   A pack is evidence, so it must carry the evidence the user produced.
   The pack used to render every template field as a blank ruled line
   and every checklist item as an empty box, which made a "Document Pack
   Builder" into a form printer: the document looked complete and
   contained nothing. It now reads the workspace state. */
PS.docpack.docBody = function (c) {
  if (c.type === 'tpl') {
    var tpl = PS.byId('tpl', c.id);
    if (!tpl) return '<p class="note">Template not found.</p>';
    var st = PS.tplState.get(c.id);
    var vals = (st && st.values) || {};
    var filled = 0;
    (tpl.sections || []).forEach(function (s) {
      (s.fields || []).forEach(function (f) {
        var v = vals[f.k];
        if (v !== undefined && v !== null && String(v).length) filled++;
      });
    });
    var outTpl = (tpl.purpose ? '<p>' + PS.esc(tpl.purpose) + '</p>' : '') +
      (filled === 0 ? '<p class="note">No entries have been completed for this template in your workspace, so the fields below are blank.</p>' : '') +
      (tpl.sections || []).map(function (s) {
        return '<div class="docpack-section"><h3>' + PS.esc(s.g) + '</h3>' +
          (s.fields || []).map(function (f) {
            var v = vals[f.k];
            var has = v !== undefined && v !== null && String(v).length;
            return '<div><strong>' + PS.esc(f.label) + '</strong>' + (f.req ? ' *' : '') +
              ' &nbsp; ' + (has ? '<span class="docpack-value">' + PS.esc(String(v)) + '</span>'
                : '<span class="docpack-line"></span>') + '</div>';
          }).join('') + '</div>';
      }).join('');
    if (st && st.notes) outTpl += '<div class="docpack-section"><h3>Notes</h3><p>' + PS.esc(st.notes) + '</p></div>';
    return outTpl;
  }
  if (c.type === 'cl') {
    var cl = PS.byId('cl', c.id);
    if (!cl) return '<p class="note">Checklist not found.</p>';
    var cst = PS.clState.get(c.id);
    var checked = (cst && cst.checked) || {};
    var done = 0, total = 0;
    (cl.sections || []).forEach(function (s) {
      (s.items || []).forEach(function (it, i) {
        total++;
        if (checked[s.g + '|' + i]) done++;
      });
    });
    var outCl = (cl.desc ? '<p>' + PS.esc(cl.desc) + '</p>' : '') +
      '<p class="note">Completion: ' + done + ' of ' + total + ' items (' + (total ? Math.round(done / total * 100) : 0) + '%)' +
      (done === 0 ? '. No items have been ticked in your workspace.' : '.') + '</p>' +
      (cl.sections || []).map(function (s) {
        return '<div class="docpack-section"><h3>' + PS.esc(s.g) + '</h3>' +
          (s.items || []).map(function (it, i) {
            var on = !!checked[s.g + '|' + i];
            return '<div><span class="docpack-box' + (on ? ' is-done' : '') + '">' + (on ? '&#10003;' : '') + '</span> ' +
              PS.esc(it) + (on ? ' <span class="muted">(complete)</span>' : '') + '</div>';
          }).join('') +
          '</div>';
      }).join('');
    if (cst && cst.notes) outCl += '<div class="docpack-section"><h3>Notes and evidence</h3><p>' + PS.esc(cst.notes) + '</p></div>';
    return outCl;
  }
  if (c.type === 'dec') {
    var dec = PS.byId('dec', c.id);
    if (!dec) return '<p class="note">Decision guide not found.</p>';
    var res = PS.decisionResult && PS.decisionResult.dec === dec.id ? PS.decisionResult : null;
    var outDec = (dec.intro ? '<p>' + PS.esc(dec.intro) + '</p>' : '') +
      (dec.question ? '<div class="alert alert-info"><strong>Decision question:</strong> ' + PS.esc(dec.question) + '</div>' : '');
    if (res && res.out && res.out.top) {
      outDec += '<div class="docpack-section"><h3>Outcome</h3>' +
        '<p><strong>' + PS.esc(res.out.top.label) + '</strong> - ' + PS.esc(res.out.top.desc || '') + '</p></div>';
    }
    outDec += (dec.options || []).map(function (o) {
      var on = res && res.out && res.out.top && res.out.top.k === o.k;
      return '<div><span class="docpack-box' + (on ? ' is-done' : '') + '">' + (on ? '&#10003;' : '') + '</span> <strong>' +
        PS.esc(o.label) + '</strong> - ' + PS.esc(o.desc || '') + '</div>';
    }).join('');
    if (res && res.answers) {
      outDec += '<div class="docpack-section"><h3>Answers recorded</h3>' +
        (dec.factors || []).map(function (f, i) {
          var a = res.answers['f' + i];
          return '<div><strong>' + PS.esc(f.q) + '</strong>: ' + PS.esc(a || 'not sure') + '</div>';
        }).join('') + '</div>';
    }
    return outDec;
  }
  if (c.type === 'scen') {
    var sc = PS.byId('scen', c.id);
    if (!sc) return '<p class="note">Scenario not found.</p>';
    return (sc.problem ? '<p>' + PS.esc(sc.problem) + '</p>' : '') +
      (sc.steps || []).map(function (st, i) { return '<p><strong>Step ' + (i + 1) + ':</strong> ' + PS.esc(st.label) + (st.note ? ' - ' + PS.esc(st.note) : '') + '</p>'; }).join('');
  }
  return '';
};

/* Build a complete printable package document. */
PS.docpack.buildPackHtml = function (title, items, opts) {
  opts = opts || {};
  var p = PS.prefs();
  var css = PS.$$('style').map(function (s) { return s.textContent || ''; }).join('\n');
  var toc = items.map(function (c, i) {
    return '<div><a href="#packdoc' + i + '">' + (i + 1) + '. ' + PS.esc(c.title) + '</a></div>';
  }).join('');
  var body = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<title>' + PS.esc(title) + '</title><style>' + css + '</style></head><body>' +
    '<div class="docpack-cover card">' +
    '<h1>' + PS.esc(title) + '</h1>' +
    '<p class="lead">' + PS.esc(p.orgName || 'Procurement') + (p.deptName ? ' \u00B7 ' + PS.esc(p.deptName) : '') + '</p>' +
    '<p class="note">Prepared ' + PS.esc(PS.dateTime()) + ' \u00B7 ' + items.length + ' documents \u00B7 ' + PS.esc(PS.APP) + '</p>' +
    '<div style="margin-top:18px;text-align:left"><h3>Contents</h3>' + toc + '</div>' +
    '</div>';
  items.forEach(function (c, i) {
    body += '<div class="card docpack-section" id="packdoc' + i + '">' +
      '<div class="card-head"><div><h2>' + PS.esc(c.title) + '</h2>' +
      '<p class="card-sub">' + PS.esc(PS.typeLabel(c.type)) + ' \u00B7 ' + PS.esc(c.cat || '') + '</p></div></div>' +
      PS.docpack.docBody(c) + '</div>';
  });
  body += '<div style="text-align:center;padding:24px;color:var(--mute);font-size:.8rem">' +
    'Prepared with Procure Sherpa. This package is a working draft - validate all values before external use.</div>' +
    '</body></html>';
  return body;
};

/* ---------- page actions ---------- */
PS.acts['docpack-toggle'] = function (el) {
  var id = el.dataset.id;
  var sel = PS.docpack._selected = PS.docpack._selected || {};
  if (el.checked) sel[id] = true; else delete sel[id];
};
PS.acts['docpack-build'] = function () {
  var sel = PS.docpack._selected || {};
  var ids = Object.keys(sel);
  if (!ids.length) { PS.toast('Select at least one document to include.', 'warn'); return; }
  var title = PS.clean(PS.$('#docpackTitle') ? PS.$('#docpackTitle').value : '', 140) || 'Procurement document pack';
  var items = PS.docpack.candidates().filter(function (c) { return sel[c.type + '|' + c.id]; });
  var html = PS.docpack.buildPackHtml(title, items);
  PS.docpack._lastHtml = html;
  PS.docpack._lastTitle = title;
  PS.docpack._lastItems = items;
  var win = window.open('', '_blank');
  if (win) { win.document.write(html); win.document.close(); win.focus(); }
  PS.docpack.addToPacks(title, items);
  PS.toast('Pack built with ' + items.length + ' documents.', 'ok');
  PS.audit('docpack-built', title + ' (' + items.length + ' docs)');
};
PS.acts['docpack-download'] = function () {
  if (!PS.docpack._lastHtml) { PS.toast('Build a pack first.', 'warn'); return; }
  var base = PS.clean((PS.docpack._lastTitle || 'docpack').replace(/[^\w]+/g, '_'), 60);
  PS.download(base + '_' + PS.iso() + '.html', PS.docpack._lastHtml, 'text/html');
};
PS.acts['docpack-print'] = function () {
  if (!PS.docpack._lastHtml) { PS.toast('Build a pack first.', 'warn'); return; }
  var win = window.open('', '_blank');
  if (win) {
    win.document.write(PS.docpack._lastHtml);
    win.document.close();
    win.focus();
    setTimeout(function () { try { win.print(); } catch (e) { } }, 250);
  }
};

/* Persist created packs so they can be reopened from the page. */
PS.docpack.addToPacks = function (title, items) {
  var d = PS.docpack.all();
  d.packs = d.packs || [];
  d.packs.unshift({ title: title, t: new Date().toISOString(), items: items.map(function (c) { return { type: c.type, id: c.id, title: c.title, cat: c.cat }; }) });
  d.packs = d.packs.slice(0, 20);
  PS.docpack.save(d);
};
PS.docpack.packsHtml = function () {
  var packs = PS.docpack.list();
  if (!packs.length) return '<p class="note">No packs created yet in this browser.</p>';
  return '<div class="table-wrap"><table><thead><tr><th>Pack</th><th class="num">Docs</th><th>Created</th><th></th></tr></thead><tbody>' +
    packs.map(function (p) {
      return '<tr><td>' + PS.esc(p.title) + '</td><td class="num">' + (p.items ? p.items.length : 0) + '</td>' +
        '<td>' + PS.esc(PS.dateTime(p.t)) + '</td>' +
        '<td><button type="button" class="btn btn-sm btn-ghost" data-act="docpack-reopen" data-idx="' + packs.indexOf(p) + '">Reopen</button></td></tr>';
    }).join('') + '</tbody></table></div>';
};
PS.acts['docpack-reopen'] = function (el) {
  var packs = PS.docpack.list();
  var p = packs[PS.num(el.dataset.idx)];
  if (!p) return;
  var items = (p.items || []).map(function (x) { return PS.docpack.candidates().filter(function (c) { return c.type === x.type && c.id === x.id; })[0]; }).filter(Boolean);
  if (!items.length) { PS.toast('None of the documents in that pack still exist.', 'warn'); return; }
  PS.docpack._lastHtml = PS.docpack.buildPackHtml(p.title, items);
  PS.docpack._lastTitle = p.title;
  PS.docpack._lastItems = items;
  var win = window.open('', '_blank');
  if (win) { win.document.write(PS.docpack._lastHtml); win.document.close(); win.focus(); }
};