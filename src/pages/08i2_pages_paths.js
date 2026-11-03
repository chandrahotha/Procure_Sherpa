/* ==========================================================
   Procure Sherpa - Learning Paths
   Tracks from foundations to board-level accountability, with
   progress drawn from Academy module completion.
   ========================================================== */

PS.learningPaths = PS.learningPaths || {};

PS.learningPaths.PATHS = [
  {
    id: 'beginner',
    title: 'Procurement Foundations',
    tier: 'core',
    level: 1,
    desc: 'Start from zero: what procurement is, why it matters, and the concepts every professional relies on.',
    modules: ['func-mission-value', 'func-spend-analysis', 'func-requirement-scope', 'func-landed-cost-tco', 'func-indirect-sourcing'],
    skills: ['Basic concepts', 'Cost analysis', 'Spend visibility', 'Where your own spend actually goes'],
    duration: '2-3 weeks',
    color: 'var(--ok)'
  },
  {
    id: 'intermediate',
    title: 'Operational Excellence',
    tier: 'practitioner',
    level: 2,
    desc: 'The day-to-day skills: running a competitive event, evaluating bids, negotiating and placing the order.',
    modules: ['func-rfx-strategy', 'func-rfq-issuance', 'func-quote-normalization', 'func-supplier-eval', 'func-supplier-onboarding', 'func-negotiation-strategy', 'func-negotiation-record', 'func-commercial-terms', 'func-requisition-intake', 'func-po-execution'],
    skills: ['Running a tender', 'Bid evaluation', 'Negotiation', 'Commercial terms', 'Order execution'],
    duration: '4-6 weeks',
    color: 'var(--warn-2)'
  },
  {
    id: 'advanced',
    title: 'Commercial & Contract Leadership',
    tier: 'practitioner',
    level: 3,
    desc: 'Category strategy, cost engineering, contracting and the operational controls that make them hold.',
    modules: ['func-category-mgmt', 'func-should-cost', 'func-contract-structuring', 'func-contract-types-renewal', 'func-doa-controls', 'func-threeway-matching', 'func-software-licensing', 'func-professional-services'],
    skills: ['Category strategy', 'Should-cost', 'Contract structuring', 'Delegation of authority', 'Three-way matching', 'Software and services buying'],
    duration: '6-8 weeks',
    color: 'var(--scen)'
  },
  {
    id: 'expert',
    title: 'Risk, Governance & Resilience',
    tier: 'executive',
    level: 4,
    desc: 'The work that decides whether the function survives an audit, a disclosure obligation or a disruption.',
    modules: ['func-supplier-risk', 'func-corrective-action', 'func-ethics-compliance', 'func-sustainability', 'func-resilience-continuity', 'func-srm-scorecards', 'func-savings-reporting'],
    skills: ['Due diligence', 'Anti-bribery controls', 'Sustainable sourcing', 'Supply resilience', 'Supplier performance', 'Savings assurance'],
    duration: '4-6 weeks',
    color: 'var(--danger)'
  },
  {
    id: 'digital',
    title: 'Digital Procurement & Spend Analytics',
    tier: 'practitioner',
    level: 4,
    desc: 'The data layer under everything else: the systems the buying runs through, the spend cube the analysis runs on, and the category strategy that turns a finding into a plan.',
    modules: ['func-digital-procurement', 'func-spend-analytics', 'func-category-strategy'],
    skills: ['Reading a spend cube', 'Picking the tooling that fits the process', 'Writing a category strategy a business will fund'],
    duration: '3-5 weeks',
    color: 'var(--accent)'
  },
  {
    id: 'portfolio',
    title: 'Portfolio Strategy, the Tail & Demand',
    tier: 'executive',
    level: 5,
    desc: 'Accountability for the shape of the portfolio rather than one line in it: the supply market, the long tail, and the demand you were never told about.',
    modules: ['func-tail-spend-program', 'func-market-structure', 'func-demand-management'],
    skills: ['Running a tail programme as a channel, not a campaign', 'Judging whether a market can be made competitive', 'Attacking consumption instead of only price'],
    duration: '4-6 weeks',
    color: 'var(--warn-2)'
  },
  {
    id: 'influence',
    title: 'Stakeholder Influence & Change Adoption',
    tier: 'practitioner',
    level: 5,
    desc: 'The craft that decides whether the other thirteen modules ever get applied: who actually decides, how you ask without authority, and how a booked saving is kept alive.',
    modules: ['func-stakeholder-mapping', 'func-adoption-and-change', 'func-executive-ask'],
    skills: ['Reading a decision before it is made', 'Building an ask someone can grant', 'Designing the compliant route to beat the workaround', 'Holding a result past year one'],
    duration: '3-5 weeks',
    color: 'var(--accent)'
  },
  {
    id: 'specialist',
    title: 'Specialised Markets & Category Depth',
    tier: 'practitioner',
    level: 5,
    desc: 'Where a general method is not enough: freight and customs, regulated tendering, and the people-time categories where the rate card matters less than the supervision model.',
    modules: ['func-freight-and-landed-cost', 'func-regulated-procurement', 'func-people-time-categories'],
    skills: ['Comparing sources on true landed cost', 'Running an award that survives a challenge', 'Controlling contingent and agency spend by behaviour, not by rate'],
    duration: '4-6 weeks',
    color: 'var(--scen)'
  },
  {
    id: 'boardroom',
    title: 'Executive & Board-Level Procurement',
    tier: 'executive',
    level: 6,
    desc: 'Answering for the function in front of a CFO, an audit committee or a board: the operating model, the value narrative, and the order the transformation has to happen in.',
    modules: ['func-operating-model', 'func-value-narrative', 'func-transformation-roadmap'],
    skills: ['Designing the model and defending its cost-to-serve', 'Presenting value a finance reader accepts as evidence', 'Sequencing change by dependency, not by enthusiasm'],
    duration: '5-7 weeks',
    color: 'var(--scen)'
  },
  {
    id: 'contract-risk',
    title: 'Contract Risk, Claims and Disputes',
    tier: 'practitioner',
    level: 4,
    desc: 'What happens after signature: turning the agreement into owned duties, controlling the changes that arrive anyway, and handling the disagreement when it does.',
    modules: ['func-obligation-register', 'func-change-control', 'func-claims-and-remedies'],
    skills: ['Reading a contract as a list of obligations', 'Pricing and bounding a variation', 'Assembling a provable position', 'Deciding whether a claim is worth pursuing'],
    duration: '4-5 weeks',
    color: 'var(--dec)'
  },
  {
    id: 'sourcing-operations',
    title: 'Global Sourcing Operations',
    tier: 'practitioner',
    level: 4,
    desc: 'The operational half of the job: developing a source you cannot replace, proving that what arrived conforms, and deciding which lines are worth protecting.',
    modules: ['func-supplier-development', 'func-quality-and-audit', 'func-dual-source-resilience'],
    skills: ['Building capability where substitution is impossible', 'Choosing where conformity is verified', 'Pricing protection against expected loss', 'Keeping a second source alive'],
    duration: '4-6 weeks',
    color: 'var(--ops)'
  },
  {
    id: 'disruption',
    title: 'Disruption, Emergency Buying and Allocation',
    tier: 'practitioner',
    level: 5,
    desc: 'What to do when the process cannot respond: the pre-agreed fast route, the market that stops serving you, and the close that decides whether anything changes.',
    modules: ['func-emergency-procurement', 'func-allocation-and-shortage', 'func-disruption-recovery'],
    skills: ['Using a bounded emergency route', 'Reading an allocation rule', 'Forcing an explicit internal allocation decision', 'Re-baselining and closing a claim'],
    duration: '4-5 weeks',
    color: 'var(--danger)'
  },
  {
    id: 'finance',
    title: 'The Finance of Procurement',
    tier: 'practitioner',
    level: 5,
    desc: 'Cash, terms and value: what a payment term is worth, how the cash conversion cycle turns procurement decisions into balance-sheet effects, and who is really financing the supply base.',
    modules: ['func-payment-terms-value', 'func-cash-conversion-cycle', 'func-supply-chain-finance'],
    skills: ['Valuing a term as cash and as cost', 'Reading the cash conversion cycle by component', 'Telling a saving from a cash action', 'Running a financing programme without coercion'],
    duration: '4-6 weeks',
    color: 'var(--kpi)'
  },
  {
    id: 'assurance',
    title: 'Fraud, Collusion and Assurance',
    tier: 'practitioner',
    level: 5,
    desc: 'The detection half of integrity: the patterns that show up in purchasing data, the shapes collusion takes in a bid list, and how a concern is handled without destroying evidence or reputation.',
    modules: ['func-purchasing-fraud-risk', 'func-bid-rigging-detection', 'func-fraud-response-and-disclosure'],
    skills: ['Reading distributions rather than averages', 'Verifying a payment change out of band', 'Naming the signals collusion leaves in a tender', 'Holding the first hour of a case correctly'],
    duration: '4-6 weeks',
    color: 'var(--dec)'
  },
  {
    id: 'responsible-sourcing',
    title: 'Sustainable and Responsible Sourcing',
    tier: 'practitioner',
    level: 4,
    desc: 'The three conversations a category manager now has to hold on their own terms: where the carbon actually sits and what a figure can support, what a circular arrangement really costs per cycle, and what the labour and social value rules require as evidence.',
    modules: ['func-scope3-buying-baseline', 'func-circular-sourcing-economics', 'func-social-value-labour-due-diligence'],
    skills: ['Telling a measured figure from a spend proxy', 'Pricing a returnable system per cycle achieved', 'Asking who paid the recruitment fee', 'Scoring a claim on mechanism rather than intention'],
    duration: '4-6 weeks',
    color: 'var(--ok)'
  },
  {
    id: 'category-depth',
    title: 'Specialised Category Depth II',
    tier: 'practitioner',
    level: 4,
    desc: 'Three markets where the general playbook misleads: energy, where the agreed price is only part of the bill; works, where the contract form decides who owns the risk; and marketing, where the fee line hides the money.',
    modules: ['func-energy-utility-procurement', 'func-works-and-construction-buying', 'func-marketing-and-creative-services'],
    skills: ['Separating commodity from pass-through', 'Reading a bid as a set of assumptions', 'Keeping time, money and scope apart', 'Making the mark-up on third-party spend visible'],
    duration: '5-7 weeks',
    color: 'var(--kpi)'
  },
  {
    id: 'ai-and-data',
    title: 'AI, Models and Data Markets',
    tier: 'practitioner',
    level: 4,
    desc: 'How these products are actually sold: token unit economics the buyer design controls, evaluation on your own task rather than a leaderboard, licence purpose axes, provenance evidence and assurance for a supplier whose behaviour is probabilistic.',
    modules: ['func-model-service-procurement', 'func-data-licensing-and-provenance', 'func-ai-supplier-assurance'],
    skills: ['Costing per completed task, not per token', 'Building an evaluation set with a definition of correct', 'Pricing the re-index before signing', 'Reading a licence as granted purposes', 'Classifying assurance by consequence'],
    duration: '5-7 weeks',
    color: 'var(--dec)'
  },
  {
    id: 'supplier-distress',
    title: 'Supplier Distress, Turnaround and Exit',
    tier: 'practitioner',
    level: 4,
    desc: 'What happens to a supplier while the contract is still live: reading its financial position as timing rather than as a grade, escalating a signal cluster into funded readiness, and making the rescue or replace decision deliberately rather than by default.',
    modules: ['func-supplier-financial-health', 'func-supplier-early-warning-response', 'func-distress-exit-and-recovery'],
    skills: ['Reading the operating cycle, not the current ratio', 'Turning signals into dated actions', 'Proving what your assets are while it is cheap', 'Ranking a claim realistically', 'Minuting a rescue or replace decision'],
    duration: '5-7 weeks',
    color: 'var(--ops)'
  },
  {
    id: 'public-tendering',
    title: 'Public and Regulated Tendering',
    tier: 'practitioner',
    level: 4,
    desc: 'The mechanics that decide an award before a bid is read: dividing a requirement into lots a smaller supplier can actually reach, choosing between a framework, a dynamic system and a one-off competition, publishing criteria and weights that can be defended, enquiring into a price too low to believe, and holding the signature until the mandatory pause has run.',
    modules: ['func-lotting-and-call-off-architecture', 'func-award-criteria-and-low-bids', 'func-standstill-challenge-defensible-file'],
    skills: ['Designing lots that change who can bid', 'Setting the call-off rule at framework design', 'Writing anchored scoring bands', 'Running a documented low-bid enquiry', 'Debriefing with reasoning rather than totals'],
    duration: '5-7 weeks',
    color: 'var(--accent)'
  },
  {
    id: 'services-cost-analytics',
    title: 'Services Should-Cost and Negotiation Analytics',
    tier: 'practitioner',
    level: 4,
    desc: 'The cost model behind an effort-based price: reading a proposal as a rate pyramid rather than a blended rate, what a day rate has to fund before it funds margin, which commercial structure transfers effort risk and what that transfer costs, and how to negotiate the price arc of a multi-year contract rather than its entry rate.',
    modules: ['func-service-rate-pyramid-should-cost', 'func-service-risk-and-pricing-structures', 'func-service-negotiation-analytics'],
    skills: ['Rebuilding a bid as hours by grade', 'Bounding a fully loaded rate', 'Mapping who carries effort risk', 'Modelling the price arc across a term', 'Valuing both sides of a concession'],
    duration: '5-7 weeks',
    color: 'var(--ok)'
  },
  {
    id: 'regulated-markets',
    title: 'Regulated and Constrained Markets',
    tier: 'practitioner',
    level: 5,
    desc: 'Buying where a third authority has standing in the transaction: qualifying a supplier to an evidential standard and holding change notification to a category list, classifying controlled goods and screening the whole counterparty structure, and treating continuity as a licence obligation that must be priced, contracted and exercised rather than preferred.',
    modules: ['func-regulated-supplier-qualification', 'func-controlled-goods-and-clearance-constraints', 'func-essential-service-continuity-obligation'],
    skills: ['Scoping an approval to a site and process', 'Writing a quality agreement decision matrix', 'Classifying before contracting', 'Separating obligation from preference', 'Exercising an exit plan on a schedule'],
    duration: '6-8 weeks',
    color: 'var(--info)'
  },
  {
    id: 'supplier-innovation',
    title: 'Supplier Innovation and Early Engagement',
    tier: 'practitioner',
    level: 4,
    desc: 'The part of the process that happens before a tender exists: consulting the market while the requirement is still negotiable, structuring an innovation purchase as a priced option with stage gates, kill criteria and scale-up terms agreed before the dependency, and holding the rights that decide who can use what was learned - including the data your own operations generate on someone else platform.',
    modules: ['func-early-supplier-involvement', 'func-innovation-deal-structure', 'func-rights-and-dependency-in-joint-work'],
    skills: ['Running a defensible consultation round', 'Separating outcome from mechanism in a draft', 'Pricing a pilot as an option', 'Writing kill criteria with the budget', 'Scheduling background and foreground rights'],
    duration: '5-7 weeks',
    color: 'var(--academy)'
  },
  {
    id: 'service-transition',
    title: 'Service Transition and Exit',
    tier: 'practitioner',
    level: 5,
    desc: 'What happens between the award and the stable new service: inventorying what actually moves rather than what is documented, reconciling the providers exception list against your own incident history, proving capability by exercising it at peak and at month end, pricing and bounding the tail period, and making cooperation the paid-for deliverable instead of the contractual courtesy.',
    modules: ['func-service-transition-planning', 'func-tail-period-and-exit-cooperation'],
    skills: ['Building the exception catalogue from incident data', 'Running an exercised acceptance scenario', 'Pricing a tail rate card and its cap', 'Writing obligations that survive termination', 'Testing a data extract before you need it'],
    duration: '4-6 weeks',
    color: 'var(--sop)'
  },
  {
    id: 'inventory-economics',
    title: 'Inventory and Stock Economics',
    tier: 'practitioner',
    level: 5,
    desc: 'How much to hold and who owns it: measuring the real cost per order line instead of assuming it, reading the flat region of the cost curve rather than the optimum, setting a reorder point from lead-time dispersion instead of the average, deciding which item classes are worth a service level, and separating the stock you hold from the stock you own before a supplier fails.',
    modules: ['func-order-quantity-and-reorder-point', 'func-who-owns-the-stock'],
    skills: ['Measuring cost per order line from goods-in effort', 'Telling a bound answer from an optimum', 'Re-basing a buffer on the observed tail', 'Registering stock held but not owned', 'Reporting a write-down into the category that caused it'],
    duration: '4-6 weeks',
    color: 'var(--ops)'
  }
];

/* Each path is a sequence, and a sequence that goes 4, 10, 10, 10, 8,
   8 is not a sequence. The expert path was authored that way: its
   modules were listed in the order the topics appeared in the content
   files rather than in curriculum order. Sorting here means the data
   and the display can never disagree, and the authored order does not
   matter. The sort is stable, so the order within a module is the
   order the author chose. */
PS.learningPaths.sortPaths = function () {
  /* This has to run at render time, not at load time. The pages are
     assembled before the content, so at the moment this module is
     evaluated the Academy functions do not exist yet and every module
     number resolves to zero. Sorting then does nothing and silently
     leaves the expert path in the order it was authored. */
  if (!PS.ACADEMY_FUNCTIONS || !PS.ACADEMY_FUNCTIONS.length) return;
  (PS.learningPaths.PATHS || []).forEach(function (path) {
    var mods = (path.modules || []).slice();
    mods.sort(function (a, b) {
      var fa = PS.byId('academy', a), fb = PS.byId('academy', b);
      var na = fa ? (PS.academyModuleNumber(fa.module) || 0) : 0;
      var nb = fb ? (PS.academyModuleNumber(fb.module) || 0) : 0;
      return na - nb;
    });
    path.modules = mods;
  });
};
PS.learningPaths.sortPaths();

/* Which Academy functions no track claims. When Module 12 and Module 13
   were added the curriculum grew past the paths and nothing said so: the
   page still read "Four tracks" and the all-modules table, which is built
   by walking the paths, quietly dropped the nine functions that were never
   listed. The page now measures its own coverage instead of asserting it,
   and G24 fails if a function stays uncovered. */
PS.learningPaths.uncoveredFunctions = function () {
  var listed = {};
  (PS.learningPaths.PATHS || []).forEach(function (path) {
    (path.modules || []).forEach(function (id) { listed[id] = true; });
  });
  return (PS.ACADEMY_FUNCTIONS || []).filter(function (f) { return !listed[f.id]; });
};

PS.learningPaths.getUserProgress = function (pathId) {
  var path = PS.learningPaths.PATHS.filter(function (p) { return p.id === pathId; })[0];
  if (!path) return null;
  var completed = 0;
  path.modules.forEach(function (modId) {
    if (PS.academy.isCompleted(modId)) completed++;
  });
  return {
    path: path,
    completed: completed,
    total: path.modules.length,
    pct: path.modules.length > 0 ? Math.round((completed / path.modules.length) * 100) : 0
  };
};

PS.learningPaths.getNextModule = function (pathId) {
  var progress = PS.learningPaths.getUserProgress(pathId);
  if (!progress) return null;
  for (var i = 0; i < progress.path.modules.length; i++) {
    if (!PS.academy.isCompleted(progress.path.modules[i])) {
      return progress.path.modules[i];
    }
  }
  return null;
};

PS.route('learning-paths', function () {
  PS.learningPaths.sortPaths();
  PS.pageTitle = 'Learning paths';
  var assessment = PS.skillAssessment ? PS.skillAssessment.getLastResult() : null;

  var pathCount = PS.learningPaths.PATHS.length;
  var uncovered = PS.learningPaths.uncoveredFunctions().length;

  var html = '<div class="card">' +
    '<div class="card-head"><h1>Learning paths</h1></div>' +
    '<p class="lead">' + pathCount + ' tracks, each tagged by the altitude it prepares you for: <strong>Foundation</strong>, <strong>Practitioner</strong> or <strong>Executive</strong>. ' +
    (uncovered
      ? '<strong>' + uncovered + ' Academy functions are not in any track yet</strong> - they are still readable from the <a href="#/academy">Academy hub</a>.'
      : 'Every Academy function sits in one track, so working through the tracks covers the whole curriculum.') + '</p>';

  if (assessment) {
    var level = PS.skillAssessment.getLevel(assessment.score);
    html += '<div class="hub-note" style="margin-top:12px">Your assessment placed you at <strong>Level ' + level.level + ', ' + PS.esc(level.label) + '</strong> (' + assessment.score + '%). ' +
      '<a href="#/assessment">Retake</a></div>';
  } else {
    html += '<div class="hub-note" style="margin-top:12px">Not sure where to start? <a href="#/assessment">Take the skill assessment</a> and the recommendation below becomes specific.</div>';
  }

  html += '</div>';

  html += '<div class="grid grid-3 mb16 path-grid">';

  PS.learningPaths.PATHS.forEach(function (path) {
    var progress = PS.learningPaths.getUserProgress(path.id);
    var nextMod = PS.learningPaths.getNextModule(path.id);
    var nextFunc = nextMod ? PS.byId('academy', nextMod) : null;
    var isComplete = progress && progress.pct === 100;
    var done = progress ? progress.completed : 0;
    var total = path.modules.length;

    html += '<div class="card path-card" style="border-top:3px solid ' + path.color + '">' +
      '<div class="path-card-head">' +
      '<span class="level-pill">Level ' + path.level + '</span>' +
      (path.tier ? '<span class="level-pill" style="background:' + (PS.academy && PS.academy.TIERS ? 'var(--accent-soft)' : 'var(--accent-soft)') + ';color:var(--accent)">' + PS.esc(PS.academy && PS.academy.tierName ? PS.academy.tierName(path.tier) : path.tier) + '</span>' : '') +
      (isComplete ? '<span class="level-pill" style="background:var(--ok-soft);color:var(--ok)">Done</span>' : '') +
      '</div>' +
      '<h2 class="path-card-title">' + PS.esc(path.title) + '</h2>' +
      '<p class="path-card-desc">' + PS.esc(path.desc) + '</p>' +
      '<div class="path-progress">' +
      '<div class="path-progress-meta"><span>' + done + ' of ' + total + ' modules</span><span>' + (progress ? progress.pct : 0) + '%</span></div>' +
      '<div class="bar-track"><div class="bar-fill" style="background:' + path.color + ';width:' + (progress ? progress.pct : 0) + '%"></div></div>' +
      '</div>' +
      '<div class="path-skills"><span class="path-label">What you will be able to do</span>' +
      '<ul class="path-skill-list">' + path.skills.map(function (s) { return '<li>' + PS.esc(s) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="path-meta-row"><span class="path-label">Time</span><span>' + PS.esc(path.duration) + '</span></div>' +
      '<div class="path-card-foot">' +
      (nextFunc
        ? '<a class="btn btn-primary btn-block" href="#/academy/' + encodeURIComponent(nextFunc.id) + '">' +
          '<span class="btn-label">Start: ' + PS.esc(nextFunc.title) + '</span></a>'
        : '<a class="btn btn-block" href="#/academy"><span class="btn-label">Open the Academy</span></a>') +
      '</div>' +
      '</div>';
  });

  html += '</div>';

  html += '<div class="card">' +
    '<h2>All modules</h2>' +
    '<div class="table-wrap pin-action"><table><thead><tr><th class="num">Module</th><th>Function</th><th>Path</th><th>Status</th><th></th></tr></thead><tbody>';

  /* One row per function per path, sorted by module number so the table
     reads in curriculum order rather than in track order. The path
     column still says which journey a function belongs to. */
  var rows = [];
  PS.learningPaths.PATHS.forEach(function (path, pathIdx) {
    path.modules.forEach(function (modId, idx) {
      var func = PS.byId('academy', modId);
      if (!func) return;
      rows.push({
        func: func, path: path, pathIdx: pathIdx, idx: idx,
        modNo: PS.academyModuleNumber(func.module) || 0
      });
    });
  });
  rows.sort(function (a, b) {
    if (a.modNo !== b.modNo) return a.modNo - b.modNo;
    if (a.pathIdx !== b.pathIdx) return a.pathIdx - b.pathIdx;
    return a.idx - b.idx;
  });
  rows.forEach(function (r) {
    var isComp = PS.academy.isCompleted(r.func.id);
    html += '<tr>' +
      '<td class="num"><span class="level-pill">' + r.modNo + '</span></td>' +
      '<td><strong>' + PS.esc(r.func.title) + '</strong>' +
      (r.idx === 0 ? ' <span class="level-pill" style="background:' + r.path.color + ';color:#fff">Start</span>' : '') +
      '<br><small class="muted">' + PS.esc(r.func.module || '') + '</small></td>' +
      '<td>' + PS.esc(r.path.title) + '</td>' +
      '<td>' + (isComp ? '<span style="color:var(--ok);font-weight:600">Complete</span>' : '<span class="muted">Not started</span>') + '</td>' +
      '<td><a class="btn btn-sm" href="#/academy/' + encodeURIComponent(r.func.id) + '">Open</a></td>' +
      '</tr>';
  });

  html += '</tbody></table></div></div>';

  return html;
});
