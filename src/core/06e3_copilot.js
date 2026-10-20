/* ==========================================================
   Phase 11 - Offline AI Copilot (roadmap 11.1)
   Local retrieval + rule-based answer engine over the bundled
   KB, glossary, SOPs, scenarios and calculators. Zero network.
   ========================================================== */

PS.copilot = PS.copilot || {};

PS.copilot.STOP = new Set(('a an and are as at be but by for from has have he her his i in is it its of on or she that the their this to was were we what when which who will with you your the and or for not no yes can could should would do does did').split(' '));

PS.copilot.KEY = 'ps_copilot';

PS.copilot.all = function () {
  var c = PS.store.get(PS.copilot.KEY, {});
  return (c && typeof c === 'object') ? c : {};
};
PS.copilot.save = function (c) {
  PS.store.set(PS.copilot.KEY, c);
};

PS.copilot.transcript = function () {
  return PS.copilot.all().transcript || [];
};
PS.copilot.addExchange = function (q, answer, hits, confidence) {
  var c = PS.copilot.all();
  c.transcript = c.transcript || [];
  c.transcript.unshift({ q: PS.clean(q, 200), a: PS.clean(answer, 1200), hits: hits || [], confidence: confidence || 0, t: new Date().toISOString() });
  c.transcript = c.transcript.slice(0, 30);
  PS.copilot.save(c);
};
PS.copilot.clearTranscript = function () {
  var c = PS.copilot.all();
  c.transcript = [];
  PS.copilot.save(c);
};

/* ---------------- content index ---------------- */
PS.copilot._index = null;
PS.copilot.buildIndex = function () {
  if (PS.copilot._index) return PS.copilot._index;
  var idx = [];
  function push(type, id, title, cat, route, text) {
    if (!id || !text) return;
    idx.push({ type: type, id: id, title: PS.clean(title, 160), cat: PS.clean(cat, 60), route: route || PS.routeFor(type, id), text: String(text).toLowerCase() });
  }
  (PS.data.kb || []).forEach(function (x) {
    push('kb', x.id, x.title, x.cat, PS.routeFor('kb', x.id),
      [x.title, x.def, x.full, (x.why || []).join(' '), (x.how || []).join(' '), (x.when || []).join(' '), (x.mistakes || []).join(' ')].join(' '));
  });
  (PS.data.gloss || []).forEach(function (x) {
    push('gloss', x.id, x.term, 'Glossary', '#/glossary?term=' + encodeURIComponent(x.id), [x.term, x.def, x.full, (x.why || []).join(' ')].join(' '));
  });
  (PS.data.sop || []).forEach(function (x) {
    push('sop', x.id, x.title, x.cat, PS.routeFor('sop', x.id),
      [x.title, x.purpose, x.scope, (x.steps || []).map(function (s) { return s.s + ' ' + s.d; }).join(' '), (x.flow || []).join(' ')].join(' '));
  });
  (PS.data.scen || []).forEach(function (x) {
    push('scen', x.id, x.title, x.cat, PS.routeFor('scen', x.id), [x.title, x.problem, x.summary, (x.steps || []).map(function (s) { return s.label; }).join(' ')].join(' '));
  });
  (PS.data.calc || []).forEach(function (x) {
    push('calc', x.id, x.title, x.cat, PS.routeFor('calc', x.id), [x.title, x.purpose, x.context, (x.fields || []).map(function (f) { return f.label; }).join(' ')].join(' '));
  });
  /* The index covered only five of the nine content types, so the two
     questions a practitioner asks most often came back empty: "which
     template do I use for an award recommendation" and "which
     checklist proves the contract review was done". */
  (PS.data.tpl || []).forEach(function (x) {
    push('tpl', x.id, x.title, x.cat, PS.routeFor('tpl', x.id),
      [x.title, x.purpose, (x.sections || []).map(function (s) {
        return s.g + ' ' + (s.fields || []).map(function (f) { return f.label + ' ' + (f.hint || ''); }).join(' ');
      }).join(' '), (x.prompts || []).join(' ')].join(' '));
  });
  (PS.data.cl || []).forEach(function (x) {
    push('cl', x.id, x.title, x.cat, PS.routeFor('cl', x.id),
      [x.title, x.desc, (x.sections || []).map(function (s) {
        return s.g + ' ' + (s.items || []).join(' ');
      }).join(' ')].join(' '));
  });
  (PS.data.dec || []).forEach(function (x) {
    push('dec', x.id, x.title, x.cat, PS.routeFor('dec', x.id),
      [x.title, x.intro, x.question, x.explain, (x.factors || []).map(function (f) { return f.q + ' ' + (f.hint || ''); }).join(' '),
        (x.options || []).map(function (o) { return o.label + ' ' + (o.desc || ''); }).join(' ')].join(' '));
  });
  (PS.data.kpi || []).forEach(function (x) {
    push('kpi', x.id, x.title, x.cat, PS.routeFor('kpi', x.id),
      [x.title, x.def, x.formula, x.formulaNote, (x.inputs || []).join(' '), (x.interp || []).join(' ')].join(' '));
  });
  /* The Academy curriculum: twenty-five functions and ten modules, the
     largest body of procurement teaching in the product, and until now
     invisible to the assistant. */
  (PS.ACADEMY_FUNCTIONS || []).forEach(function (f) {
    push('academy', f.id, f.title, f.module, '#/academy/' + encodeURIComponent(f.id),
      [f.title, f.tagline, f.desc, f.what, f.lifecycleStage, (f.why || []).join(' '),
        (f.terms || []).map(function (t) { return t.term + ' ' + t.def; }).join(' '),
        (f.sopSteps || []).map(function (s) { return s.title + ' ' + s.desc; }).join(' ')].join(' '));
  });
  PS.copilot._index = idx;
  return idx;
};
PS.copilot.invalidateIndex = function () { PS.copilot._index = null; };

/* ---------------- tokenization ---------------- */
PS.copilot.tokens = function (q) {
  return PS.clean(q, 200).toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/).filter(function (t) {
    return t.length > 1 && !PS.copilot.STOP.has(t);
  });
};

/* Light suffix stemming so "negotiation" matches "negotiate"/"negotiating".
   Conservative: only strips common inflectional suffixes from terms longer
   than 5 chars, and never to a root shorter than 4 chars. */
PS.copilot.stem = function (t) {
  if (typeof t !== 'string' || t.length < 5) return t;
  var lower = t.toLowerCase();
  var suffix = [
    ['negotiations', 'negotiat'], ['negotiating', 'negotiat'], ['negotiated', 'negotiat'],
    ['purchasing', 'purchas'], ['purchased', 'purchas'], ['purchases', 'purchas'],
    ['suppliers', 'supplier'], ['contracts', 'contract'], ['sourcing', 'sourc'],
    ['escalations', 'escalat'], ['escalated', 'escalat'], ['forecasts', 'forecast'],
    ['analyses', 'analys'], ['analytics', 'analytic'], ['strategies', 'strateg'],
    ['checklists', 'checklist'], ['categories', 'categor'], ['commodities', 'commodit'],
    ['liabilities', 'liabilit'], ['equities', 'equit'], ['revenues', 'revenue'],
    ['invoices', 'invoice'], ['payments', 'payment'], ['deliveries', 'deliveri']
  ];
  for (var i = 0; i < suffix.length; i++) {
    if (lower.slice(-suffix[i][0].length) === suffix[i][0]) return suffix[i][1];
  }
  /* generic: -ing / -ed / -es / -s when safe */
  if (lower.length > 6 && lower.slice(-3) === 'ing') return lower.slice(0, -3);
  if (lower.length > 6 && lower.slice(-2) === 'ed') return lower.slice(0, -2);
  if (lower.length > 5 && lower.slice(-2) === 'es') return lower.slice(0, -2);
  if (lower.length > 6 && lower.slice(-1) === 's') return lower.slice(0, -1);
  return lower;
};

/* Score helper that also matches stemmed forms so the index does not
   need pre-stemming (keeps index building cheap). */
PS.copilot.matches = function (text, term) {
  if (text.indexOf(term) >= 0) return true;
  var st = PS.copilot.stem(term);
  if (st !== term && text.indexOf(st) >= 0) return true;
  return false;
};

/* ---------------- retrieval ---------------- */
PS.copilot.ask = function (q) {
  var idx = PS.copilot.buildIndex();
  var tokens = PS.copilot.tokens(q);
  if (!tokens.length) return { hits: [], confidence: 0, answer: 'Please ask a more specific procurement question. Try terms like "TCO", "landed cost", "3-way match", "DOA", or "incoterms".' };
  var scored = [];
  idx.forEach(function (rec) {
    var score = 0, matched = 0;
    tokens.forEach(function (t) {
      var titleHit = PS.copilot.matches(rec.title.toLowerCase(), t);
      var bodyHit = PS.copilot.matches(rec.text, t);
      if (titleHit) score += 5;
      if (bodyHit) { score += 2; matched++; }
      if (PS.copilot.matches(rec.cat.toLowerCase(), t)) score += 2;
    });
    if (matched) scored.push({ rec: rec, score: score });
  });
  scored.sort(function (a, b) {
    if (b.score !== a.score) return b.score - a.score;
    return a.rec.title.localeCompare(b.rec.title);
  });
  /* confidence: proportion of query tokens matched, weighted by spread.
     A query where every token hit the top doc is high-confidence;
     a query where only one of several tokens matched is low-confidence. */
  var top = scored[0];
  var matchedTokens = 0;
  if (top) {
    tokens.forEach(function (t) {
      var titleHit = PS.copilot.matches(top.rec.title.toLowerCase(), t);
      var bodyHit = PS.copilot.matches(top.rec.text, t);
      if (titleHit || bodyHit) matchedTokens++;
    });
  }
  var confidence = tokens.length ? Math.round((matchedTokens / tokens.length) * 100) : 0;
  var hits = scored.slice(0, 5).map(function (s) { return s.rec; });
  var answer = PS.copilot.answerFor(q, hits, tokens, confidence);
  return { hits: hits, confidence: confidence, answer: answer };
};

/* Build a plain-language answer with inline citations from the top hits. */
PS.copilot.answerFor = function (q, hits, tokens, confidence) {
  if (!hits.length) return 'I could not find a confident match for "' + PS.clean(q, 120) + '" in the local library. Try the global search (Ctrl+K), or rephrase with procurement terms such as "landed cost" or "3-way match".';
  var top = hits[0];
  var detail = '';
  if (top.type === 'gloss') {
    var g = PS.glossaryById(top.id);
    if (g) detail = g.def + (g.full ? ' ' + g.full : '');
  } else if (top.type === 'kb') {
    var kb = PS.byId('kb', top.id);
    if (kb) detail = kb.def + (kb.full ? ' ' + kb.full : '');
  } else if (top.type === 'sop') {
    var sop = PS.byId('sop', top.id);
    if (sop) detail = sop.purpose;
  } else if (top.type === 'scen') {
    var sc = PS.byId('scen', top.id);
    if (sc) detail = sc.summary || sc.problem;
  } else if (top.type === 'calc') {
    var ca = PS.byId('calc', top.id);
    if (ca) detail = ca.purpose;
  }
  detail = detail ? detail : top.title;
  if (detail.length > 480) detail = detail.slice(0, 477) + '\u2026';
  var name = PS.typeLabel(top.type);

  /* Honest confidence signalling: below 60% we say so plainly. */
  var lowConfidence = confidence !== undefined && confidence < 60;
  var verdict = lowConfidence
    ? 'I found a partial match, but I am not fully confident it answers your question. The closest local entry is "'
    : 'Based on the local library, the best match is "';
  return verdict + top.title + '" (' + name + '). ' + detail +
    (lowConfidence
      ? ' Verify this entry before relying on it, or try rephrasing your question.'
      : ' Open the linked page below for the full, cited source.');
};

PS.copilot.confidenceTag = function (confidence) {
  if (confidence >= 80) return '<span class="badge" style="background:var(--ok-soft);color:var(--ok);font-weight:700">High match</span>';
  if (confidence >= 60) return '<span class="badge" style="background:var(--warn-soft);color:var(--warn);font-weight:700">Partial match</span>';
  return '<span class="badge" style="background:var(--danger-soft);color:var(--danger);font-weight:700">Low confidence</span>';
};

PS.copilot.citesHtml = function (hits) {
  if (!hits.length) return '';
  return '<div class="cp-cites">' + hits.map(function (h, i) {
    var route = h.type === 'gloss' ? '#/glossary?term=' + encodeURIComponent(h.id) : PS.routeFor(h.type, h.id);
    return '<a class="cp-cite" href="' + PS.esc(route) + '"><span class="tick">' + (i + 1) + '</span>' +
      PS.esc(h.title) + ' <span class="badge">' + PS.esc(PS.typeLabel(h.type)) + '</span></a>';
  }).join('') + '</div>';
};

/* ---------- page-level actions ---------- */
PS.acts['copilot-ask'] = function (el) {
  var q = PS.$('#copilotInput') ? PS.$('#copilotInput').value : '';
  if (!PS.clean(q)) { PS.toast('Type a question first.', 'warn'); return; }
  PS.copilot.renderExchange(q);
};
PS.acts['copilot-suggest'] = function (el) {
  var q = el.dataset.q || '';
  if (!q) return;
  PS.copilot.renderExchange(q);
};
PS.acts['copilot-clear'] = function () {
  PS.confirm({
    title: 'Clear copilot transcript?',
    body: '<p>This clears the local chat transcript for this browser only.</p>',
    okLabel: 'Clear transcript', danger: true,
    onOk: function () { PS.copilot.clearTranscript(); PS.renderRoute(); PS.toast('Transcript cleared.', 'ok'); }
  });
};

PS.copilot.renderExchange = function (q) {
  var qClean = PS.clean(q, 200);
  if (!qClean) return;
  var res = PS.copilot.ask(qClean);
  PS.copilot.addExchange(qClean, res.answer, res.hits.map(function (h) { return { type: h.type, id: h.id, title: h.title }; }), res.confidence);
  var chat = PS.$('#copilotChat');
  if (!chat) return;
  var userHtml = '<div class="copilot-msg is-user"><div class="cp-avatar" aria-hidden="true">You</div><div class="cp-bubble">' + PS.esc(qClean) + '</div></div>';
  var aiHtml = '<div class="copilot-msg"><div class="cp-avatar" aria-hidden="true">PS</div><div class="cp-bubble">' +
    PS.copilot.confidenceTag(res.confidence) + ' ' + PS.esc(res.answer) + PS.copilot.citesHtml(res.hits) + '</div></div>';
  chat.insertAdjacentHTML('beforeend', userHtml + aiHtml);
  chat.scrollTop = chat.scrollHeight;
  if (PS.$('#copilotInput')) PS.$('#copilotInput').value = '';
  PS.audit('copilot-question', qClean.slice(0, 120));
};

/* Suggestion chips derived from the current library. */
PS.copilot.suggestions = function (n) {
  var base = [
    { q: 'What is total cost of ownership (TCO)?', t: 'TCO' },
    { q: 'How do I compare supplier quotes?', t: 'Compare quotes' },
    { q: 'What is a three-way match?', t: '3-way match' },
    { q: 'Explain incoterms and landed cost', t: 'Incoterms' },
    { q: 'How do I negotiate a price increase?', t: 'Price increase' },
    { q: 'What does DOA mean in procurement?', t: 'DOA' }
  ];
  return base.slice(0, n || 4).map(function (s) {
    return '<button type="button" class="chip" data-act="copilot-suggest" data-q="' + PS.escAttr(s.q) + '">' + PS.esc(s.t) + '</button>';
  }).join('');
};