/* ==========================================================
   Procure Sherpa v2.0 - Universal Search & Instant Command Palette
   Features: Weighted relevance scoring, Academy indexing,
             live keyboard navigation, instant route jump (Ctrl+K)
   ========================================================== */

PS._index = null;

/* Flatten any nested content value into a list of searchable strings.
   This hangs off PS rather than standing in the shared global scope:
   every fragment in this build shares a single <script>, so a bare
   `function flat` here would define a global named `flat` for the
   whole application. The inner name is kept for the recursive calls. */
PS._flattenSearchable = function flat(v, out) {
  if (v === null || v === undefined) return out;
  if (typeof v === 'string' || typeof v === 'number') { out.push(String(v)); return out; }
  if (Array.isArray(v)) { v.forEach(function (x) { flat(x, out); }); return out; }
  if (typeof v === 'object') { Object.keys(v).forEach(function (k) { flat(v[k], out); }); return out; }
  return out;
};

PS.buildIndex = function () {
  if (PS._index) return PS._index;
  var idx = [];

  function add(type, item, extra, customRoute) {
    if (!item) return;
    var parts = PS._flattenSearchable(extra || [], []);
    var title = item.title || item.term || item.label || '';
    var desc = item.desc || item.summary || item.def || item.purpose || item.question || item.tagline || '';
    idx.push({
      type: type,
      id: item.id,
      title: title,
      cat: item.cat || item.group || item.module || '',
      tags: (item.tags || []).join(' '),
      route: customRoute || PS.routeFor(type, item.id),
      desc: PS.clean(desc, 220),
      text: (title + ' ' + (item.cat || '') + ' ' + (item.module || '') + ' ' + (item.tags || []).join(' ') + ' ' + parts.join(' ')).toLowerCase()
    });
  }

  // 1. Academy Learning Modules
  (PS.ACADEMY_FUNCTIONS || []).forEach(function (f) {
    add('academy', f, [
      f.desc, f.tagline, f.what, f.lifecycleStage,
      (f.why || []).join(' '),
      (f.sopSteps || []).map(function (s) { return s.title + ' ' + s.desc; }).join(' '),
      (f.terms || []).map(function (t) { return t.term; }).join(' ')
    ], '#/academy/' + encodeURIComponent(f.id));
  });

  // 2. Operational Knowledge Base
  (PS.data.kb || []).forEach(function (x) {
    add('kb', x, [x.def, x.why, x.when, x.how, x.ex, x.risks, x.mistakes]);
  });

  // 3. Digital Standard Operating Procedures
  (PS.data.sop || []).forEach(function (x) {
    add('sop', x, [x.purpose, x.scope, x.trigger, x.inputs, (x.steps || []).map(function (s) { return s.s + ' ' + s.d; }), x.outputs, x.records, x.control]);
  });

  // 4. Compliance Checklists
  (PS.data.cl || []).forEach(function (x) {
    add('cl', x, [(x.sections || []).map(function (s) { return s.g + ' ' + (s.items || []).join(' '); })]);
  });

  // 5. Work Templates
  (PS.data.tpl || []).forEach(function (x) {
    add('tpl', x, [x.purpose, (x.fields || []).map(function (f) { return f.label + ' ' + (f.hint || ''); }), x.prompts]);
  });

  // 6. Decision Matrices
  (PS.data.dec || []).forEach(function (x) {
    add('dec', x, [x.question, (x.factors || []).map(function (f) { return f.q + ' ' + (f.hint || ''); }), x.explain]);
  });

  // 7. Key Performance Indicators
  (PS.data.kpi || []).forEach(function (x) {
    add('kpi', x, [x.def, x.formula, x.inputs, x.interp, x.limits, x.mistakes]);
  });

  // 8. Procurement Glossary
  (PS.data.gloss || []).forEach(function (x) {
    add('gloss', x, [x.def, x.full, x.term]);
  });

  // 9. Guided Scenarios
  (PS.data.scen || []).forEach(function (x) {
    add('scen', x, [x.problem, x.summary, (x.steps || []).map(function (s) { return s.label + ' ' + (s.note || ''); })]);
  });

  // 10. Commercial Calculators
  (PS.data.calc || []).forEach(function (x) {
    add('calc', x, [x.purpose, x.context, (x.fields || []).map(function (f) { return f.label + ' ' + (f.tip || ''); })]);
  });

  // 11. System Help Topics
  (PS.data.help || []).forEach(function (x) { add('help', x, [x.body]); });

  // 12. Core Platform Gateways & Direct Commands
  var coreCommands = [
    { id: 'cmd-academy', title: 'Procurement Academy Hub', cat: 'Learning Platform', desc: 'Browse all 16 strategic procurement competency modules.', route: '#/academy', tags: ['learning', 'course', 'curriculum'] },
    { id: 'cmd-ops-hub', title: 'Operational Practice Hub', cat: 'Operations', desc: 'Access end-to-end execution tools: SOPs, calculators, checklists, and templates.', route: '#/operations', tags: ['tools', 'gateway', 'daily'] },
    { id: 'cmd-transcript', title: 'Academy Progress & Transcript', cat: 'Learning Platform', desc: 'View complete module completion record and assessment scores.', route: '#/academy-progress', tags: ['grades', 'status', 'badges'] },
    { id: 'cmd-cert', title: 'Credential Transcript (Future)', cat: 'Certification', desc: 'Not available yet - planned as a future feature, not a legally issued credential.', route: '#/certificate', tags: ['diploma', 'future', 'cips', 'ism'] },
    { id: 'cmd-dash-savings', title: 'Savings & Spend Dashboard', cat: 'Commercial Controls', desc: 'Portfolio view of realized savings, cost avoidance, and working capital.', route: '#/dash-savings', tags: ['finance', 'controller', 'benefits'] },
    { id: 'cmd-maturity', title: 'Procurement Maturity Assessment', cat: 'Governance', desc: 'Audit and score your organization commercial sourcing maturity.', route: '#/maturity', tags: ['audit', 'benchmark', 'strategy'] },
    { id: 'cmd-backup', title: 'Backup & Restore Workspace', cat: 'System Data', desc: 'Export or import your offline local data, saved calculations, and profile.', route: '#/backup', tags: ['export', 'json', 'privacy'] },
    { id: 'cmd-settings', title: 'System Preferences & Settings', cat: 'System Data', desc: 'Configure default currency, company name, and interface theme.', route: '#/settings', tags: ['config', 'theme', 'dark'] },
    { id: 'cmd-copilot', title: 'Procurement Copilot', cat: 'Intelligence', desc: 'Ask the offline assistant about concepts, processes and calculators.', route: '#/copilot', tags: ['ai', 'assistant', 'ask', 'chat'] },
    { id: 'cmd-exams', title: 'Certification Exams', cat: 'Academy', desc: 'Timed, randomised exams from the Academy question bank.', route: '#/exams', tags: ['test', 'certification', 'quiz'] },
    { id: 'cmd-spend-model', title: 'Spend Data Model', cat: 'Intelligence', desc: 'Edit the category-supplier hierarchy feeding Pareto and Kraljic charts.', route: '#/spend-model', tags: ['spend', 'pareto', 'kraljic', 'supplier'] },
    { id: 'cmd-docpack', title: 'Document Pack Builder', cat: 'Intelligence', desc: 'Assemble RFI/RFP/contract packs with a cover sheet and contents.', route: '#/docpack', tags: ['rfp', 'rfi', 'contract', 'pack', 'print'] }
  ];
  coreCommands.forEach(function (c) {
    add('command', c, [c.desc, c.tags.join(' ')], c.route);
  });

  PS._index = idx;
  return idx;
};

PS.invalidateIndex = function () {
  PS._index = null;
};

PS.search = function (q, opts) {
  opts = opts || {};
  var idx = PS.buildIndex();
  var raw = PS.clean(q, 120).toLowerCase();
  if (!raw) return { query: '', results: [], total: 0 };
  var tokens = raw.split(/[\s,;]+/).filter(function (t) { return t.length > 0; });
  var out = [];

  idx.forEach(function (rec) {
    if (opts.type && opts.type !== 'all') {
      if (opts.type === 'learning' && rec.type !== 'academy') return;
      if (opts.type === 'operations' && (rec.type === 'academy' || rec.type === 'command')) return;
      if (opts.type !== 'learning' && opts.type !== 'operations' && rec.type !== opts.type) return;
    }

    var score = 0;
    var title = rec.title.toLowerCase();
    var allHit = true;

    tokens.forEach(function (t) {
      var hit = 0;
      if (title === t) hit = 160;
      else if (title.indexOf(t) === 0) hit = 100;
      else if (title.indexOf(' ' + t) >= 0) hit = 75;
      else if (title.indexOf(t) > 0) hit = 55;
      else if (rec.type === t) hit = 50;
      else if (rec.tags.indexOf(t) >= 0) hit = 42;
      else if (rec.cat.toLowerCase().indexOf(t) >= 0) hit = 32;
      else if (rec.text.indexOf(t) >= 0) hit = 18;
      else if (t.length > 4 && rec.text.indexOf(t.slice(0, Math.max(4, t.length - 2))) >= 0) hit = 10;

      if (!hit) allHit = false;
      score += hit;
    });

    if (!allHit) return;

    // Small boost for Academy modules and core commands when relevant
    if (rec.type === 'academy') score += 12;
    if (rec.type === 'command') score += 8;

    if (score > 0) out.push({ rec: rec, score: score });
  });

  out.sort(function (a, b) {
    if (b.score !== a.score) return b.score - a.score;
    return a.rec.title.localeCompare(b.rec.title);
  });

  var limit = opts.limit || 60;
  var results = out.slice(0, limit).map(function (o) {
    var r = o.rec;
    return {
      type: r.type,
      id: r.id,
      title: r.title,
      cat: r.cat,
      tags: r.tags,
      route: r.route,
      desc: r.desc,
      text: r.text,
      score: o.score,
      shortcut: (PS.cmdPalette && PS.cmdPalette.getShortcut) ? PS.cmdPalette.getShortcut(r.type, r.id) : ''
    };
  });
  return { query: PS.clean(q, 120), results: results, total: out.length, suggestions: PS.getSearchSuggestions(q) };
};

PS.highlight = function (text, q) {
  var safe = PS.esc(text);
  var tokens = PS.clean(q, 120).toLowerCase().split(/\s+/).filter(function (t) { return t.length > 1; });
  tokens.forEach(function (t) {
    try {
      var re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      safe = safe.replace(re, '<mark>$1</mark>');
    } catch (e) { }
  });
  return safe;
};

PS.levenshtein = function (a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  var matrix = [], i, j;
  for (i = 0; i <= b.length; i++) { matrix[i] = [i]; }
  for (j = 0; j <= a.length; j++) { matrix[0][j] = j; }
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
};

PS.getSearchSuggestions = function (query, maxSuggestions) {
  maxSuggestions = maxSuggestions || 3;
  var q = PS.clean(query, 120).toLowerCase();
  if (!q || q.length < 3) return [];

  var idx = PS.buildIndex();
  var terms = new Set();

  // Collect all searchable terms from index
  idx.forEach(function (rec) {
    terms.add(rec.title.toLowerCase());
    if (rec.cat) terms.add(rec.cat.toLowerCase());
    (rec.tags || '').split(' ').forEach(function (t) { if (t.length > 2) terms.add(t); });
  });

  // Add known suggest terms
  PS.suggestTerms.forEach(function (t) { terms.add(t.toLowerCase()); });

  // Find closest matches by Levenshtein distance
  var suggestions = [];
  terms.forEach(function (term) {
    if (term.length < 3) return;
    var dist = PS.levenshtein(q, term);
    var maxDist = Math.max(2, Math.floor(q.length * 0.3));
    if (dist <= maxDist && term !== q) {
      suggestions.push({ term: term, distance: dist });
    }
  });

  suggestions.sort(function (a, b) {
    if (a.distance !== b.distance) return a.distance - b.distance;
    return a.term.localeCompare(b.term);
  });

  return suggestions.slice(0, maxSuggestions).map(function (s) { return s.term; });
};

PS.suggestTerms = [
  'price increase', 'RFQ', 'RFP', 'TCO', 'payment terms', 'supplier risk',
  'savings', 'renewal', 'single source', 'negotiation', 'landed cost',
  'three-way matching', 'DOA controls', 'HHI', 'audit', 'KPI'
];

/* ==========================================================
   Spotlight Command Palette (Ctrl+K)
   ========================================================== */
PS.cmdPalette = {
  isOpen: false,
  activeIdx: 0,
  currentFilter: 'all',
  lastQuery: '',

  typeLabels: {
    'academy': 'Academy Module',
    'sop': 'Standard Operating Procedure',
    'calc': 'Calculator',
    'cl': 'Checklist',
    'tpl': 'Work Template',
    'dec': 'Decision Matrix',
    'kpi': 'Procurement KPI',
    'kb': 'Knowledge Guide',
    'gloss': 'Glossary Term',
    'scen': 'Scenario Walkthrough',
    'command': 'Platform Command'
  },

  getShortcut: function (type, id) {
    var shortcuts = {
      'academy': 'G A',
      'sop': 'G S',
      'calc': 'G C',
      'cl': 'G L',
      'tpl': 'G T',
      'dec': 'G D',
      'kpi': 'G K',
      'kb': 'G K',
      'command': 'G H'
    };
    return shortcuts[type] || '';
  },

  open: function (initialQuery, filter) {
    var self = this;
    self.isOpen = true;
    self.activeIdx = 0;
    self.currentFilter = filter || 'all';
    self.ensureDom();

    var modal = document.getElementById('cmdPaletteModal');
    var input = document.getElementById('cmdPaletteInput');
    if (modal) modal.removeAttribute('hidden');
    document.body.classList.add('modal-open');

    if (input) {
      if (initialQuery !== undefined) input.value = initialQuery;
      input.focus();
      input.select();
    }

    self.renderResults();
  },

  close: function () {
    var self = this;
    self.isOpen = false;
    var modal = document.getElementById('cmdPaletteModal');
    if (modal) modal.setAttribute('hidden', '');
    document.body.classList.remove('modal-open');
  },

  ensureDom: function () {
    var self = this;
    if (document.getElementById('cmdPaletteModal')) return;

    var el = document.createElement('div');
    el.id = 'cmdPaletteModal';
    el.className = 'cmd-palette-backdrop';
    el.setAttribute('hidden', '');

    el.innerHTML = '<div class="cmd-palette-container" role="dialog" aria-modal="true" aria-label="Command Palette">' +
      '<div class="cmd-palette-header">' +
      '<div class="cmd-palette-input-wrap">' +
      '<span class="cmd-palette-search-icon" aria-hidden="true">&#128269;</span>' +
      '<input type="search" id="cmdPaletteInput" class="cmd-palette-input" ' +
      'placeholder="Search SOPs, tools, academy, calculators, or jump to route..." autocomplete="off" spellcheck="false">' +
      '<button type="button" class="cmd-palette-close-btn" id="cmdPaletteCloseBtn" aria-label="Close">&#10005;</button>' +
      '</div>' +
      '<div class="cmd-palette-filter-row" id="cmdPaletteFilters">' +
      '<button type="button" class="cmd-filter-chip is-active" data-filter="all">All</button>' +
      '<button type="button" class="cmd-filter-chip" data-filter="academy">Academy</button>' +
      '<button type="button" class="cmd-filter-chip" data-filter="sop">SOPs</button>' +
      '<button type="button" class="cmd-filter-chip" data-filter="calc">Calculators</button>' +
      '<button type="button" class="cmd-filter-chip" data-filter="cl">Checklists</button>' +
      '<button type="button" class="cmd-filter-chip" data-filter="tpl">Templates</button>' +
      '</div>' +
      '</div>' +
      '<div class="cmd-palette-body" id="cmdPaletteResultsList">' +
      '</div>' +
      '<div class="cmd-palette-footer">' +
      '<span><kbd>&uarr;</kbd> <kbd>&darr;</kbd> Navigate</span>' +
      '<span><kbd>&crarr;</kbd> Open</span>' +
      '<span><kbd>ESC</kbd> Close</span>' +
      '<span><kbd>Ctrl+Shift+K</kbd> Shortcuts</span>' +
      '<button type="button" class="btn btn-ghost btn-sm" data-act="print-kbd" style="margin-left:auto">Print Cheat Sheet</button>' +
      '</div>' +
      '</div>';

    document.body.appendChild(el);

    // Wire events
    el.addEventListener('click', function (e) {
      if (e.target === el) self.close();
    });

    var closeBtn = document.getElementById('cmdPaletteCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', function () { self.close(); });

    var input = document.getElementById('cmdPaletteInput');
    if (input) {
      input.addEventListener('input', function () {
        self.activeIdx = 0;
        self.renderResults();
      });

      input.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          self.moveActive(1);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          self.moveActive(-1);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          self.executeActive();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          self.close();
        } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'K') {
          e.preventDefault();
          self.close();
          PS.kbdHelp.open();
        }
      });
    }

    var filterRow = document.getElementById('cmdPaletteFilters');
    if (filterRow) {
      filterRow.addEventListener('click', function (e) {
        var btn = e.target.closest('.cmd-filter-chip');
        if (!btn) return;
        var f = btn.dataset.filter;
        self.currentFilter = f;
        var chips = filterRow.querySelectorAll('.cmd-filter-chip');
        chips.forEach(function (c) { c.classList.toggle('is-active', c === btn); });
        self.activeIdx = 0;
        self.renderResults();
      });
    }
  },

  renderResults: function () {
    var self = this;
    var input = document.getElementById('cmdPaletteInput');
    var list = document.getElementById('cmdPaletteResultsList');
    if (!list) return;

    var q = input ? input.value.trim() : '';
    var searchOpts = {
      type: self.currentFilter,
      limit: 24
    };

    var res;
    if (!q) {
      // Default: show recommended starting points and top commands
      var idx = PS.buildIndex();
      var defaultList = idx.filter(function (x) {
        if (self.currentFilter && self.currentFilter !== 'all') {
          return x.type === self.currentFilter;
        }
        return x.type === 'command' || x.type === 'academy';
      }).slice(0, 16);
      res = { query: '', results: defaultList, total: defaultList.length };
    } else {
      res = PS.search(q, searchOpts);
    }

    self.lastResults = res.results || [];
    var suggestions = res.suggestions || [];
    var showSuggestions = suggestions.length && (self.lastResults.length < 5 || !self.lastResults.length);

    if (!self.lastResults.length) {
      var suggestionHtml = showSuggestions ? '<div class="cmd-suggestions">' +
        '<div class="cmd-suggestion-label">Did you mean?</div>' +
        '<div class="cmd-suggestion-chips">' +
        suggestions.map(function (s) {
          return '<button type="button" class="cmd-suggestion-chip" data-suggest="' + PS.escAttr(s) + '">' + PS.esc(s) + '</button>';
        }).join('') +
        '</div></div>' : '';

      list.innerHTML = '<div class="cmd-empty-state">' +
        '<div class="cmd-empty-icon">&#128269;</div>' +
        '<div class="cmd-empty-title">No matching procurement items found</div>' +
        '<div class="cmd-empty-desc">Try searching for concepts like <em>price increase</em>, <em>TCO</em>, <em>RFQ</em>, or <em>supplier evaluation</em>.</div>' +
        suggestionHtml +
        '</div>';
      // Wire suggestion chips
      if (showSuggestions) {
        list.querySelectorAll('.cmd-suggestion-chip').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var suggest = btn.dataset.suggest;
            if (suggest && input) {
              input.value = suggest;
              self.activeIdx = 0;
              self.renderResults();
            }
          });
        });
      }
      return;
    }

    // Also show suggestions inline if few results
    if (showSuggestions) {
      html += '<div class="cmd-suggestions" style="margin-top:8px;padding-top:8px;border-top:1px solid var(--border)">' +
        '<div class="cmd-suggestion-label">Did you mean?</div>' +
        '<div class="cmd-suggestion-chips">' +
        suggestions.map(function (s) {
          return '<button type="button" class="cmd-suggestion-chip" data-suggest="' + PS.escAttr(s) + '">' + PS.esc(s) + '</button>';
        }).join('') +
        '</div></div>';
    }

    var html = '';
    self.lastResults.forEach(function (item, idx) {
      var isSel = idx === self.activeIdx;
      var typeName = self.typeLabels[item.type] || item.type.toUpperCase();
      var titleHtml = q ? PS.highlight(item.title, q) : PS.esc(item.title);
      var descHtml = PS.esc(item.desc || '');
      var scoreHtml = item.score ? '<span class="cmd-item-score">' + Math.round(item.score) + '</span>' : '';
      var shortcutHtml = item.shortcut ? '<kbd class="cmd-shortcut">' + PS.esc(item.shortcut) + '</kbd>' : '';

      html += '<div class="cmd-item ' + (isSel ? 'is-selected' : '') + '" data-idx="' + idx + '" data-route="' + PS.escAttr(item.route) + '">' +
        '<div class="cmd-item-main">' +
        '<div class="cmd-item-head">' +
        '<span class="cmd-type-badge cmd-type-' + PS.esc(item.type) + '">' + PS.esc(typeName) + '</span>' +
        '<span class="cmd-item-title">' + titleHtml + '</span>' +
        scoreHtml +
        shortcutHtml +
        '</div>' +
        (descHtml ? '<div class="cmd-item-desc">' + descHtml + '</div>' : '') +
        '</div>' +
        '<div class="cmd-item-meta">' +
        (item.cat ? '<span class="cmd-cat-tag">' + PS.esc(item.cat) + '</span>' : '') +
        '<span class="cmd-enter-hint">&crarr;</span>' +
        '</div>' +
        '</div>';
    });

    list.innerHTML = html;

    // Add click listeners to items
    var itemEls = list.querySelectorAll('.cmd-item');
    itemEls.forEach(function (el) {
      el.addEventListener('click', function () {
        var route = el.dataset.route;
        if (route) {
          self.close();
          window.location.hash = route;
        }
      });
      el.addEventListener('mouseenter', function () {
        var idx = parseInt(el.dataset.idx, 10);
        if (!isNaN(idx)) {
          self.activeIdx = idx;
          itemEls.forEach(function (x, i) { x.classList.toggle('is-selected', i === idx); });
        }
      });
    });

    self.scrollActiveIntoView();
  },

  moveActive: function (delta) {
    var self = this;
    if (!self.lastResults || !self.lastResults.length) return;
    self.activeIdx = (self.activeIdx + delta + self.lastResults.length) % self.lastResults.length;
    var list = document.getElementById('cmdPaletteResultsList');
    if (!list) return;
    var itemEls = list.querySelectorAll('.cmd-item');
    itemEls.forEach(function (el, i) {
      el.classList.toggle('is-selected', i === self.activeIdx);
    });
    self.scrollActiveIntoView();
  },

  scrollActiveIntoView: function () {
    var list = document.getElementById('cmdPaletteResultsList');
    if (!list) return;
    var activeEl = list.querySelector('.cmd-item.is-selected');
    if (activeEl) {
      var listRect = list.getBoundingClientRect();
      var activeRect = activeEl.getBoundingClientRect();
      if (activeRect.bottom > listRect.bottom) {
        list.scrollTop += (activeRect.bottom - listRect.bottom);
      } else if (activeRect.top < listRect.top) {
        list.scrollTop -= (listRect.top - activeRect.top);
      }
    }
  },

  executeActive: function () {
    var self = this;
    if (!self.lastResults || !self.lastResults.length) return;
    var item = self.lastResults[self.activeIdx];
    if (item && item.route) {
      self.close();
      window.location.hash = item.route;
    }
  }
};