/* ==========================================================
   Procure Sherpa - Practice Labs
   Hands-on exercises: supplier evaluation, negotiation practice,
   contract review and spend analysis, each with feedback.
   ========================================================== */

PS.practiceLabs = PS.practiceLabs || {};

PS.practiceLabs.LABS = [
  {
    id: 'supplier-eval',
    title: 'Supplier evaluation',
    category: 'sourcing',
    desc: 'Rate three fictional supplier profiles and make a sourcing call from the scorecard, risk and strategic fit.',
    difficulty: 'Intermediate',
    duration: '15 min',
    skills: ['Scorecard design', 'Risk assessment', 'Decision making']
  },
  {
    id: 'negotiation-sim',
    title: 'Negotiation practice',
    category: 'negotiation',
    desc: 'Work through a negotiation step by step: anchoring, concessions, and knowing when to hold firm.',
    difficulty: 'Advanced',
    duration: '20 min',
    skills: ['BATNA', 'Concession strategy', 'Value creation']
  },
  {
    id: 'contract-review',
    title: 'Contract review',
    category: 'contracts',
    desc: 'Read five contract clauses and flag the risky ones before checking your answer against the notes.',
    difficulty: 'Intermediate',
    duration: '15 min',
    skills: ['Clause analysis', 'Risk identification']
  },
  {
    id: 'spend-analysis',
    title: 'Spend analysis',
    category: 'analytics',
    desc: 'Read a sample spend table and find the consolidation opportunities hiding in it.',
    difficulty: 'Beginner',
    duration: '10 min',
    skills: ['Data analysis', 'Pareto thinking']
  }
];

PS.practiceLabs.getUserProgress = function (labId) {
  return PS.store.get('practice_labs', {})[labId] || null;
};

PS.practiceLabs.storeProgress = function (labId, data) {
  var all = PS.store.get('practice_labs', {});
  all[labId] = data;
  PS.store.set('practice_labs', all);
};

PS.route('labs', function () {
  PS.pageTitle = 'Practice labs';
  var allProgress = PS.store.get('practice_labs', {});
  var completedCount = Object.keys(allProgress).length;

  var html = '<div class="card">' +
    '<div class="card-head"><h1>Practice labs</h1></div>' +
    '<p class="lead">Short exercises with feedback on your decisions. Reading builds knowledge; these build judgment.</p>' +
    '<div class="grid grid-3 mb16">' +
    '<div class="stat"><span class="s-val">' + PS.practiceLabs.LABS.length + '</span><span class="s-lab">Labs</span></div>' +
    '<div class="stat"><span class="s-val">' + completedCount + '</span><span class="s-lab">Completed</span></div>' +
    '<div class="stat"><span class="s-val">' + (PS.practiceLabs.LABS.length - completedCount) + '</span><span class="s-lab">Remaining</span></div>' +
    '</div>' +
    '</div>';

  html += '<div class="grid grid-2 mb16">';

  PS.practiceLabs.LABS.forEach(function (lab) {
    var progress = PS.practiceLabs.getUserProgress(lab.id);
    var isComplete = progress && progress.completed;

    html += '<div class="card" style="border-left:4px solid var(--calc)">' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-start">' +
      '<div><span class="badge">' + PS.esc(lab.category) + '</span> ' +
      '<span class="badge" style="background:' + (lab.difficulty === 'Beginner' ? 'var(--ok-soft);color:var(--ok)' : lab.difficulty === 'Intermediate' ? 'var(--warn-soft);color:var(--warn)' : 'var(--danger-soft);color:var(--danger)') + '">' + PS.esc(lab.difficulty) + '</span>' +
      '<h2 style="margin:8px 0 4px;font-size:1.05em">' + PS.esc(lab.title) + '</h2></div>' +
      (isComplete ? '<span class="level-pill" style="background:var(--ok-soft);color:var(--ok)">Done</span>' : '') +
      '</div>' +
      '<p class="note" style="margin:8px 0">' + PS.esc(lab.desc) + '</p>' +
      '<div class="note" style="margin-bottom:8px"><strong>Time:</strong> ' + PS.esc(lab.duration) + ' &middot; <strong>Skills:</strong> ' + PS.esc(lab.skills.join(', ')) + '</div>' +
      '<button type="button" class="btn btn-sm btn-primary" data-act="lab-start" data-lab="' + PS.esc(lab.id) + '">' +
      (isComplete ? 'Review' : (progress ? 'Continue' : 'Start')) +
      '</button>' +
      '</div>';
  });

  html += '</div>';

  html += '<div class="card">' +
    '<h2 id="labTitleAnchor">Exercise area</h2>' +
    '<div id="labContainer">' +
    '<div class="empty">Pick a lab above. Each one gives feedback on your decisions as you go.</div>' +
    '</div>' +
    '</div>';

  PS.pageInit = function () {
    PS.bindLabEvents();
  };

  return html;
});

PS.bindLabEvents = function () {
  PS.acts['lab-start'] = function (el) {
    var labId = el.dataset.lab;
    var lab = PS.practiceLabs.LABS.filter(function (l) { return l.id === labId; })[0];
    if (!lab) return;

    if (labId === 'supplier-eval') {
      PS.renderSupplierEvalLab();
    } else if (labId === 'negotiation-sim') {
      PS.renderNegotiationLab();
    } else if (labId === 'contract-review') {
      PS.renderContractReviewLab();
    } else if (labId === 'spend-analysis') {
      PS.renderSpendAnalysisLab();
    }
    var anchor = PS.$('#labTitleAnchor');
    if (anchor) {
      anchor.textContent = lab.title;
      try { anchor.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) { }
    }
  };
};

PS.renderSupplierEvalLab = function () {
  var suppliers = [
    { id: 'A', name: 'TechParts Global', quality: 85, delivery: 70, price: 60, risk: 40, sustainability: 55 },
    { id: 'B', name: 'Local Components Ltd', quality: 75, delivery: 90, price: 75, risk: 80, sustainability: 70 },
    { id: 'C', name: 'Premium Manufacturing Co', quality: 95, delivery: 85, price: 35, risk: 60, sustainability: 45 }
  ];

  var html = '<h3>The call to make</h3>' +
    '<p>You are sourcing a critical component for your flagship product. Three suppliers have responded. ' +
    'Your priorities, in order: quality, delivery reliability, price, risk, sustainability.</p>' +
    '<div class="table-wrap"><table style="margin-top:12px"><thead><tr><th>Supplier</th><th>Quality</th><th>Delivery</th><th>Price</th><th>Risk</th><th>Sustainability</th><th>Weighted</th></tr></thead><tbody>';

  suppliers.forEach(function (s) {
    var total = Math.round(s.quality * 0.3 + s.delivery * 0.25 + (100 - s.price) * 0.2 + s.risk * 0.15 + s.sustainability * 0.1);
    html += '<tr style="cursor:pointer" data-supplier="' + s.id + '">' +
      '<td><strong>' + PS.esc(s.name) + '</strong></td>' +
      '<td>' + s.quality + '</td><td>' + s.delivery + '</td><td>' + s.price + '</td><td>' + s.risk + '</td><td>' + s.sustainability + '</td>' +
      '<td><strong>' + total + '</strong></td></tr>';
  });

  html += '</tbody></table></div>' +
    '<p class="note">Select a row to make your call. The weighted column is a hint, not the answer.</p>' +
    '<div id="supplierFeedback" style="margin-top:16px"></div>';

  PS.$('#labContainer').innerHTML = html;

  var table = PS.$('#labContainer table');
  if (table) {
    table.addEventListener('click', function (e) {
      var tr = e.target.closest ? e.target.closest('tr[data-supplier]') : null;
      if (tr) PS.selectSupplier(tr.dataset.supplier);
    });
  }
};

PS.selectSupplier = function (supplierId) {
  var feedback = {
    'A': '<div class="alert alert-info"><strong>Defensible.</strong> TechParts Global scores best on quality, your top priority, but carries delivery risk. ' +
      'In practice you would negotiate delivery penalties or line up a second source before award.</div>',
    'B': '<div class="alert alert-warn"><strong>Reasonable.</strong> Local Components balances delivery and risk well, though quality sits below your stated priority. ' +
      'If you go this way, an incoming inspection or quality improvement plan belongs in the contract.</div>',
    'C': '<div class="alert alert-danger"><strong>Hard to defend.</strong> Premium Manufacturing has the best quality and the worst price, and the sustainability score is weak. ' +
      'For a critical component the total cost over its life, not the sticker price, is what matters.</div>'
  };

  PS.$('#supplierFeedback').innerHTML = feedback[supplierId] || '';
  PS.practiceLabs.storeProgress('supplier-eval', { completed: true, choice: supplierId, date: new Date().toISOString() });
  PS.toast('Recorded. Review the feedback above.', 'ok');
};

PS.renderNegotiationLab = function () {
  var html = '<h3>The scenario</h3>' +
    '<p>A 12-month IT services contract. The supplier opened at $500,000. Your target is $450,000; your walk-away point is $475,000.</p>' +
    '<div id="negotiationSteps"></div>';

  PS.$('#labContainer').innerHTML = html;
  PS.renderNegotiationStep(0);
};

PS.renderNegotiationStep = function (step) {
  var steps = [
    {
      question: 'The supplier opens at $500,000. Your response?',
      options: [
        { text: 'Accept the $500,000 offer', score: 0, feedback: 'That leaves value unclaimed. An opening offer is an anchor, not a price.' },
        { text: 'Counter at $420,000', score: 10, feedback: 'Good anchoring. A lower counter gives you room to concede and still land near your target.' },
        { text: 'Counter at $470,000', score: 5, feedback: 'A modest counter. Workable, but you may give away the gap between $470,000 and your $450,000 target.' },
        { text: 'Walk away immediately', score: 0, feedback: 'Your alternative is worth $475,000. Walking away from $500,000 over that needs a better reason than the opening number.' }
      ]
    },
    {
      question: 'The supplier now offers $460,000 with Net 60 payment terms instead of Net 30. What do you do?',
      options: [
        { text: 'Accept the $460,000 offer', score: 5, feedback: 'Close to target, but payment terms carry cash-flow cost. Price the difference before accepting.' },
        { text: 'Counter: $450,000 with Net 30 terms', score: 10, feedback: 'Strong. You hold your target and separate the two issues instead of trading them blindly.' },
        { text: 'Reject and find another supplier', score: 0, feedback: 'Your walk-away was $475,000. $460,000 beats it. Walking away now costs you real value.' },
        { text: 'Accept Net 60 but ask for $455,000', score: 8, feedback: 'A fair trade: you are selling the payment terms for price, which is how concessions should work.' }
      ]
    },
    {
      question: 'You land at $455,000 with Net 45. The supplier asks for a 2-year extension at the same rate. You want pricing reviewed annually. What do you do?',
      options: [
        { text: 'Accept the 2-year extension', score: 3, feedback: 'You lose the annual price review, and market conditions will move over two years.' },
        { text: 'Propose 1 year with an option to extend, price review included', score: 10, feedback: 'The professional answer. Flexibility for you, a fair commitment for them.' },
        { text: 'Demand a 6-month contract only', score: 5, feedback: 'Too short for the supplier to commit resources. Short terms often cost more, not less.' },
        { text: 'Accept 2 years with a 10% increase cap', score: 7, feedback: 'Reasonable: certainty now, capped exposure later. Check the cap against realistic index movements.' }
      ]
    }
  ];

  if (step >= steps.length) {
    PS.$('#negotiationSteps').innerHTML = '<div class="alert alert-ok"><strong>Done.</strong> The pattern across all three steps: know your walk-away point, anchor deliberately, trade concessions rather than giving them, and write the agreement down.</div>';
    PS.practiceLabs.storeProgress('negotiation-sim', { completed: true, date: new Date().toISOString() });
    return;
  }

  var s = steps[step];
  var html = '<div style="margin-top:16px;padding:16px;border:1px solid var(--border);border-radius:10px">' +
    '<p><strong>Step ' + (step + 1) + ' of ' + steps.length + ':</strong> ' + PS.esc(s.question) + '</p>' +
    '<div style="margin-top:12px">';

  s.options.forEach(function (opt, i) {
    html += '<label class="opt-card">' +
      '<input type="radio" name="nego-step' + step + '" value="' + i + '">' +
      PS.esc(opt.text) + '</label>';
  });

  html += '</div><button type="button" class="btn btn-primary" data-act="nego-next" data-step="' + step + '" style="margin-top:12px">Submit</button></div>';

  PS.$('#negotiationSteps').innerHTML = html;

  PS.acts['nego-next'] = function (el) {
    var currentStep = parseInt(el.dataset.step, 10);
    var selected = document.querySelector('input[name="nego-step' + currentStep + '"]:checked');
    if (!selected) { PS.toast('Choose an answer first.', 'warning'); return; }
    var opt = steps[currentStep].options[parseInt(selected.value, 10)];
    PS.$('#negotiationSteps').innerHTML += '<div class="alert alert-info" style="margin-top:8px"><strong>Why:</strong> ' + PS.esc(opt.feedback) + '</div>';
    setTimeout(function () { PS.renderNegotiationStep(currentStep + 1); }, 1500);
  };
};

PS.renderContractReviewLab = function () {
  var clauses = [
    { text: 'Payment Terms: Net 90 days from invoice date', risk: 'High', issue: 'Ninety days favors the supplier\'s cash position, not yours. Net 30 is the norm; the gap has a real cost in working capital.' },
    { text: 'Liability: Supplier liability limited to contract value', risk: 'Medium', issue: 'May be thin for a critical component. Consider higher limits or carve-outs for gross negligence.' },
    { text: 'Termination: Either party may terminate with 90 days notice', risk: 'Low', issue: 'Reasonable. Confirm you keep access to data, source code or inventory through the transition.' },
    { text: 'Force Majeure: Includes pandemics and government actions', risk: 'Low', issue: 'Standard since 2020. Acceptable as long as the triggering events are defined, not open-ended.' },
    { text: 'Price Escalation: Annual increase based on CPI + 3%', risk: 'Medium', issue: 'CPI plus a flat 3% will outrun most markets. Consider a fixed percentage or a cap over the contract term.' }
  ];

  var html = '<h3>Red-line these clauses</h3>' +
    '<p>Flag the ones you would push back on, then submit to see how your read compares with the notes.</p>' +
    '<div id="contractClauses">';

  clauses.forEach(function (c, i) {
    html += '<div style="margin-top:12px;padding:12px;border:1px solid var(--border);border-radius:10px">' +
      '<p><strong>Clause ' + (i + 1) + ':</strong> ' + PS.esc(c.text) + '</p>' +
      '<label class="opt-card" style="margin-top:8px"><input type="checkbox" data-clause="' + i + '"> Flag as risky</label>' +
      '</div>';
  });

  html += '</div><button type="button" class="btn btn-primary" data-act="contract-submit" style="margin-top:12px">Submit review</button>' +
    '<div id="contractFeedback"></div>';

  PS.$('#labContainer').innerHTML = html;

  PS.acts['contract-submit'] = function () {
    var flagged = [];
    PS.$$('#contractClauses input[data-clause]:checked').forEach(function (cb) {
      flagged.push(parseInt(cb.dataset.clause, 10));
    });

    var out = '<div style="margin-top:16px"><h3>How your read compares</h3>';
    clauses.forEach(function (c, i) {
      var isFlagged = flagged.indexOf(i) >= 0;
      out += '<div style="margin-top:8px;padding:10px;border-radius:10px;background:' + (isFlagged ? 'var(--ok-soft)' : 'var(--danger-soft)') + '">' +
        '<strong>Clause ' + (i + 1) + ':</strong> ' + (isFlagged ? 'flagged' : 'not flagged') +
        '<br><span class="note"><strong>Risk:</strong> ' + PS.esc(c.risk) + '. ' + PS.esc(c.issue) + '</span></div>';
    });
    out += '</div>';

    PS.$('#contractFeedback').innerHTML = out;
    PS.practiceLabs.storeProgress('contract-review', { completed: true, flagged: flagged.length, date: new Date().toISOString() });
  };
};

PS.renderSpendAnalysisLab = function () {
  var data = [
    { category: 'IT Services', spend: 450000, suppliers: 8 },
    { category: 'Office Supplies', spend: 120000, suppliers: 15 },
    { category: 'Raw Materials', spend: 890000, suppliers: 4 },
    { category: 'Logistics', spend: 340000, suppliers: 12 },
    { category: 'Marketing', spend: 280000, suppliers: 20 },
    { category: 'Facilities', spend: 190000, suppliers: 6 }
  ];

  var html = '<h3>Find the opportunities</h3>' +
    '<p>Six categories. Where is the fragmentation, and what would consolidating it buy you?</p>' +
    '<div class="table-wrap"><table style="margin-top:12px"><thead><tr><th>Category</th><th>Spend</th><th>Suppliers</th><th>Spend per supplier</th><th>Opportunity</th></tr></thead><tbody>';

  data.forEach(function (d) {
    var sps = d.spend / d.suppliers;
    var opp = d.suppliers > 10 ? 'High' : (d.suppliers > 5 ? 'Moderate' : 'Low');
    var color = d.suppliers > 10 ? 'var(--danger)' : 'inherit';
    html += '<tr><td><strong>' + PS.esc(d.category) + '</strong></td>' +
      '<td>' + PS.money(d.spend) + '</td><td>' + d.suppliers + '</td>' +
      '<td>' + PS.money(sps) + '</td>' +
      '<td' + (color !== 'inherit' ? ' style="color:' + color + ';font-weight:600"' : '') + '>' + opp + '</td></tr>';
  });

  html += '</tbody></table></div>' +
    '<div class="hub-note" style="margin-top:14px"><strong>What stands out:</strong> Office Supplies and Marketing carry many suppliers per dollar of spend. ' +
    'Cutting the supplier count roughly in half in those categories is where a consolidation round would start, and 15-20% savings from volume is a realistic first estimate.</div>' +
    '</div>';

  PS.$('#labContainer').innerHTML = html;
  PS.practiceLabs.storeProgress('spend-analysis', { completed: true, date: new Date().toISOString() });
};
