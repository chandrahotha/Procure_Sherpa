/* ==========================================================
   Operations Hub: the practitioner gateway (Section 8, 50)

   The hub used to be twenty-four hand-written links. It listed ten of
   thirteen SOPs, one of twenty-seven checklists, four of thirty-three
   templates, nine of nineteen calculators, and it linked to a template
   that did not exist. Everything it did not list was invisible from
   the gateway, which is the page a practitioner is most likely to land
   on.

   It is now derived from the registry. Six phases, each selecting the
   content that belongs to it, with the twenty-one-stage lifecycle
   reconciled against them: every phase names the lifecycle stages it
   covers, so the three lifecycle views in the product (the six phases,
   the twenty-one stages and the Academy functions) stop contradicting
   each other.
   ========================================================== */
PS.LIFECYCLE_PHASES = [
  {
    id: 'intake',
    n: 1,
    title: 'Intake and Need Validation',
    purpose: 'Establish that the need is real, that it is specified, that the money exists and that this is the right way to buy it. Most of the cost of a bad procurement decision is created here, before a supplier is contacted.',
    stages: [1, 2, 3, 4],
    pick: {
      kb: ['Fundamentals'],
      sop: ['Process'],
      cl: ['Intake & Planning'],
      tpl: ['Governance'],
      dec: ['Sourcing']
    }
  },
  {
    id: 'sourcing',
    n: 2,
    title: 'Sourcing and Tendering',
    purpose: 'Test the market, choose the right method, publish the criteria, run the event, and compare the responses on one basis. Competition that is not set up properly costs more than it saves.',
    stages: [5, 6, 7, 8, 9, 10, 11],
    pick: {
      kb: ['Sourcing'],
      sop: ['Sourcing'],
      cl: ['Sourcing', 'Evaluation & Award'],
      tpl: ['Sourcing', 'Evaluation'],
      dec: ['Sourcing']
    }
  },
  {
    id: 'cost',
    n: 3,
    title: 'Cost Engineering and Commercial Analysis',
    purpose: 'Build the true cost, normalise the quotes, and test the commercial position before you commit. This is where a price becomes a cost and a cost becomes a decision.',
    stages: [12, 13],
    pick: {
      kb: ['Commercial', 'Savings'],
      calc: ['Cost Tools', 'Negotiation Tools', 'Budget & Savings Tools'],
      cl: ['Evaluation & Award'],
      tpl: ['Evaluation', 'Savings'],
      kpi: ['Cost', 'Savings', 'Financial']
    }
  },
  {
    id: 'supplier',
    n: 4,
    title: 'Supplier Evaluation, Risk and Contracting',
    purpose: 'Qualify the supplier, assess the risk, structure the contract and protect the organisation. Due diligence that stops at the supplier\'s own paperwork is not due diligence.',
    stages: [6, 14, 15, 16, 17, 18],
    pick: {
      kb: ['Supplier Management', 'Supplier', 'Negotiation', 'Contracts', 'Risk'],
      sop: ['Contract', 'Negotiation'],
      cl: ['Supplier', 'Contract', 'Negotiation'],
      tpl: ['Supplier', 'Contract', 'Negotiation'],
      dec: ['Contracts', 'Negotiation', 'Risk'],
      kpi: ['Risk']
    }
  },
  {
    id: 'performance',
    n: 5,
    title: 'Order Execution, Performance and Assurance',
    purpose: 'Place the order, receive the goods, match the invoice, measure the supplier, and validate the saving. The work that proves the decision was right.',
    stages: [19, 20],
    pick: {
      sop: ['Process'],
      cl: ['Audit', 'Governance'],
      kb: ['Governance'],
      kpi: ['Supplier', 'Efficiency', 'Governance'],
      calc: ['Buying Decision Tools', 'Tax & FX Tools', 'KPI Tools']
    }
  },
  {
    id: 'strategy',
    n: 6,
    title: 'Planning, Governance and Value Realization',
    purpose: 'Plan the spend, set the policy, manage the portfolio and the contracts, and turn the savings into a result the business can rely on. The work that decides whether the function is worth having.',
    stages: [21],
    pick: {
      kb: ['Risk', 'Savings', 'Governance', 'Fundamentals', 'Sourcing', 'Contracts'],
      sop: ['Savings', 'Process'],
      cl: ['Governance'],
      dec: ['Governance', 'Risk'],
      kpi: ['Spend', 'Efficiency']
    }
  }
];

/* Select the content that belongs to a phase, in a stable order and
   without repeating an item that two phases both claim. */
PS.phaseContent = function (phase, claimed) {
  var out = [];
  var pick = phase.pick || {};
  Object.keys(pick).forEach(function (type) {
    var cats = pick[type];
    (PS.data[type] || []).forEach(function (item) {
      var cat = item.cat || '';
      if (cats.indexOf(cat) < 0) return;
      var key = type + ':' + item.id;
      if (claimed[key]) return;
      claimed[key] = 1;
      out.push({ type: type, id: item.id, item: item, route: PS.routeFor(type, item.id) });
    });
  });
  return out;
};

PS.route('operations', function () {
  PS.pageTitle = 'Operations Hub';
  var claimed = {};
  var claimedByType = { kb: 0, sop: 0, cl: 0, tpl: 0, dec: 0, kpi: 0, calc: 0, scen: 0, gloss: 0 };
  var total = 0;

  var html = '<div class="ops-gateway-hero no-print">' +
    '<div class="flex items-center justify-between flex-wrap gap12 mb12">' +
    '<div><span class="hub-badge operations">Practitioner Tools</span>' +
    '<h1 style="margin:8px 0 4px;">Operations Hub</h1>' +
    '<p class="t-dim" style="margin:0;">Every procedure, checklist, template, calculator, guide and measure in the product, arranged by the six phases of the work and reconciled with the twenty-one-stage lifecycle.</p></div>' +
    '<div class="btn-row" style="margin:0;">' +
    '<a class="btn btn-ops" href="#/lifecycle">See the 21-stage lifecycle</a>' +
    '<a class="btn" href="#/academy">Study the Academy</a>' +
    '<a class="btn btn-ghost" href="#/what">Start from a problem</a>' +
    '</div></div></div>';

  html += '<div class="ops-phase-grid no-print">';
  PS.LIFECYCLE_PHASES.forEach(function (phase) {
    var items = PS.phaseContent(phase, claimed);
    items.forEach(function (i) { claimedByType[i.type] = (claimedByType[i.type] || 0) + 1; total++; });
    var byType = {};
    items.forEach(function (i) { byType[i.type] = (byType[i.type] || 0) + 1; });
    var counts = Object.keys(byType).map(function (t) {
      return byType[t] + ' ' + PS.typeLabel(t).toLowerCase() + (byType[t] === 1 ? '' : 's');
    }).join(', ');

    html += '<div class="ops-phase-card">' +
      '<div class="ops-phase-kicker">Phase ' + phase.n + '</div>' +
      '<div class="ops-phase-title">' + PS.esc(phase.title) + '</div>' +
      '<p class="t-dim t-sm">' + PS.esc(phase.purpose) + '</p>' +
      '<div class="ops-tool-links">' +
      items.slice(0, 8).map(function (i) {
        var title = i.item.title || i.item.term || i.id;
        return '<a class="ops-tool-link" href="' + PS.esc(i.route) + '">' +
          '<span>' + PS.esc(title) + '</span>' +
          '<span class="badge">' + PS.esc(PS.typeLabel(i.type)) + '</span></a>';
      }).join('') +
      '</div>' +
      (items.length > 8 ? '<details class="ops-phase-more"><summary>Show the other ' + (items.length - 8) + ' in this phase</summary><div class="ops-tool-links">' +
        items.slice(8).map(function (i) {
          var title = i.item.title || i.item.term || i.id;
          return '<a class="ops-tool-link" href="' + PS.esc(i.route) + '">' +
            '<span>' + PS.esc(title) + '</span>' +
            '<span class="badge">' + PS.esc(PS.typeLabel(i.type)) + '</span></a>';
        }).join('') + '</div></details>' : '') +
      '<div class="ops-phase-meta">' + PS.esc(counts) +
      ' &middot; lifecycle stages ' + phase.stages[0] + (phase.stages.length > 1 ? '-' + phase.stages[phase.stages.length - 1] : '') + '</div>' +
      '</div>';
  });
  html += '</div>';

  /* The parts of the library that are reference rather than work, and
     that no single phase claims. */
  var rest = [];
  var claimed2 = {};
  PS.LIFECYCLE_PHASES.forEach(function (p) { PS.phaseContent(p, claimed2); });
  ['gloss', 'scen'].forEach(function (type) {
    (PS.data[type] || []).forEach(function (item) {
      var key = type + ':' + item.id;
      if (claimed2[key]) return;
      claimed2[key] = 1;
      rest.push({ type: type, id: item.id, item: item, route: PS.routeFor(type, item.id) });
    });
  });

  html += '<div class="card no-print"><div class="card-head"><h2>Reference</h2>' +
    '<div class="spacer"></div><span class="badge">' + rest.length + ' items</span></div>' +
    '<p class="card-sub">Glossary and worked scenarios. The scenarios are the situations the rest of this hub is for: each one is a full commercial problem with the judgement calls along the way.</p>' +
    '<div class="ops-tool-links">' +
    rest.map(function (i) {
      var title = i.item.title || i.item.term || i.id;
      return '<a class="ops-tool-link" href="' + PS.esc(i.route) + '">' +
        '<span>' + PS.esc(title) + '</span>' +
        '<span class="badge">' + PS.esc(PS.typeLabel(i.type)) + '</span></a>';
    }).join('') +
    '</div></div>';

  html += '<div class="card no-print"><div class="card-head"><h2>Everything else in the product</h2></div>' +
    '<p class="card-sub">' + total + ' working documents are placed in the phases above, and these are the libraries they were drawn from.</p>' +
    '<div class="btn-row">' +
    '<a class="btn" href="#/list/sop">All SOPs</a>' +
    '<a class="btn" href="#/list/cl">All checklists</a>' +
    '<a class="btn" href="#/list/tpl">All templates</a>' +
    '<a class="btn" href="#/list/calc">All calculators</a>' +
    '<a class="btn" href="#/list/dec">All decision guides</a>' +
    '<a class="btn" href="#/list/kpi">All KPIs</a>' +
    '<a class="btn" href="#/list/kb">Knowledge Hub</a>' +
    '<a class="btn" href="#/scenarios">All scenarios</a>' +
    '<a class="btn" href="#/glossary">Glossary</a>' +
    '</div></div>';

  html += PS.disclaimer('policy');
  return html;
});
