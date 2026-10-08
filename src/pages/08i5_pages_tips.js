/* ==========================================================
   Procure Sherpa - Daily Tips, Career Paths, Community
   A daily procurement tip, a weekly challenge, a career
   progression explorer and an offline discussion board.
   ========================================================== */

PS.dailyTips = PS.dailyTips || {};

PS.dailyTips.TIPS = [
  { id: 1, category: 'Sourcing', tip: 'Negotiate payment terms alongside price. Moving from Net 30 to Net 60 is often worth 2-3% of contract value on its own.', source: 'Commercial practice' },
  { id: 2, category: 'Negotiation', tip: 'Never sit down without knowing your walk-away point. The stronger your alternative, the less the opening number matters.', source: 'Negotiation practice' },
  { id: 3, category: 'Cost', tip: 'Total cost of ownership covers acquisition, operation, maintenance and disposal. Purchase price is one line of four.', source: 'Cost analysis' },
  { id: 4, category: 'Risk', tip: 'Dual sourcing a critical component costs more on paper and removes the single point of failure. Price the premium against the downtime scenario.', source: 'Supply resilience' },
  { id: 5, category: 'Contracts', tip: 'A most-favored-customer clause protects you if the supplier offers better terms to a comparable buyer later.', source: 'Contract practice' },
  { id: 6, category: 'Analytics', tip: 'In most spend portfolios, 80% of the money goes to 20% of the suppliers. Start every analysis there.', source: 'Spend analysis' },
  { id: 7, category: 'Sourcing', tip: 'Ask for references from work similar to yours in size and complexity. A great small-project reference says little about your project.', source: 'Supplier evaluation' },
  { id: 8, category: 'Negotiation', tip: 'After you make an offer, stop talking. Silence does more work than a second argument.', source: 'Negotiation practice' },
  { id: 9, category: 'Cost', tip: 'Should-cost analysis estimates what a product ought to cost from materials, labor and overhead. It is how you challenge a quote with facts.', source: 'Should-cost modeling' },
  { id: 10, category: 'Risk', tip: 'Review key supplier financials once a year. A supplier in trouble is a disruption risk even while quality holds.', source: 'Supplier risk' },
  { id: 11, category: 'Contracts', tip: 'Write service levels as measurable metrics with a consequence attached. "Best efforts" is not measurable; "99.5% uptime, credited at 2% per point below" is.', source: 'Contract practice' },
  { id: 12, category: 'Analytics', tip: 'Classify spend against one standard taxonomy so categories mean the same thing across reports and years.', source: 'Spend classification' },
  { id: 13, category: 'Sourcing', tip: 'Use a formal RFP when requirements are complex and price alone cannot separate the bids. Use an RFQ when they are not.', source: 'Strategic sourcing' },
  { id: 14, category: 'Negotiation', tip: 'Trade concessions, never give them. Every concession should be conditional on getting something back.', source: 'Negotiation practice' },
  { id: 15, category: 'Cost', tip: 'A 2/10 Net 30 discount (2% off for paying in 10 days) is worth about 36% annualized. Cheaper than most financing.', source: 'Working capital' },
  { id: 16, category: 'Risk', tip: 'Map your tier-2 and tier-3 suppliers. Disruptions usually arrive from a sub-tier nobody was watching.', source: 'Supply chain mapping' },
  { id: 17, category: 'Contracts', tip: 'Termination for convenience gives flexibility but usually requires compensation. Model the exit cost before you rely on it.', source: 'Contract practice' },
  { id: 18, category: 'Analytics', tip: 'Four numbers tell most of the procurement story: savings realized, supplier OTIF, contract compliance and cycle time.', source: 'Procurement metrics' },
  { id: 19, category: 'Sourcing', tip: 'Score suppliers on quality, delivery, cost and service together. A supplier that wins on price alone rarely wins overall.', source: 'Supplier scorecards' },
  { id: 20, category: 'Negotiation', tip: 'Prepare three walk-away scenarios before a negotiation: the best, the likely and the worst case.', source: 'Negotiation practice' },
  { id: 21, category: 'Cost', tip: 'Lifecycle cost includes maintenance, energy, training and disposal. A cheap machine with expensive upkeep is not cheap.', source: 'Life cycle costing' },
  { id: 22, category: 'Risk', tip: 'Keep a risk register for your key categories and review it quarterly. Risks age faster than people expect.', source: 'Risk management' },
  { id: 23, category: 'Contracts', tip: 'Standard clause playbooks cut negotiation time and legal review. Start from the playbook, deviate only where you must.', source: 'Contract practice' },
  { id: 24, category: 'Analytics', tip: 'Cut spend by category, supplier and business unit together. Consolidation opportunities hide at the intersections.', source: 'Spend analysis' },
  { id: 25, category: 'Sourcing', tip: 'Strategic suppliers reward loyalty with priority in shortages and early access to innovation. Treat the top quadrant differently from the rest.', source: 'Supplier relationships' },
  { id: 26, category: 'Negotiation', tip: 'Anchor first when you know the market. When you do not, let the other side anchor first and test their number.', source: 'Negotiation practice' },
  { id: 27, category: 'Cost', tip: 'Challenge price increases with market data. Accept the ones backed by verifiable cost drivers; push back on the rest.', source: 'Price management' },
  { id: 28, category: 'Risk', tip: 'Spread critical supply across regions. One region\'s disaster should not stop your production line.', source: 'Supply resilience' },
  { id: 29, category: 'Contracts', tip: 'Audit rights in the contract are what make compliance and cost verification possible later. Negotiate them in while you have leverage.', source: 'Contract practice' },
  { id: 30, category: 'Analytics', tip: 'Benchmark your procurement performance against comparable organizations once a year, with the same definitions each time.', source: 'Procurement metrics' }
];

PS.dailyTips.CHALLENGES = [
  { id: 'c1', title: 'Supplier evaluation', desc: 'Rank three supplier profiles using a weighted scorecard in the Practice Labs.', category: 'Sourcing', difficulty: 'Intermediate' },
  { id: 'c2', title: 'Negotiation practice', desc: 'Work the IT services scenario in the Practice Labs and compare your calls with the feedback.', category: 'Negotiation', difficulty: 'Advanced' },
  { id: 'c3', title: 'Contract review', desc: 'Red-line five contract clauses in the Practice Labs and check your read.', category: 'Contracts', difficulty: 'Intermediate' },
  { id: 'c4', title: 'Spend analysis', desc: 'Find the consolidation opportunities in the sample spend table.', category: 'Analytics', difficulty: 'Beginner' }
];

PS.dailyTips.getTipOfDay = function () {
  var day = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  var offset = PS.store.get('daily_tip_offset', 0);
  var index = (day + offset) % PS.dailyTips.TIPS.length;
  return PS.dailyTips.TIPS[index];
};

PS.dailyTips.getChallengeOfWeek = function () {
  var week = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7));
  var index = week % PS.dailyTips.CHALLENGES.length;
  return PS.dailyTips.CHALLENGES[index];
};

PS.route('daily-tip', function () {
  PS.pageTitle = 'Daily tip';
  var tip = PS.dailyTips.getTipOfDay();
  var challenge = PS.dailyTips.getChallengeOfWeek();

  var html = '<div class="card">' +
    '<div class="card-head"><h1>Today\'s tip</h1><div class="spacer"></div>' +
    '<span class="badge" style="background:var(--kpi-soft);color:var(--kpi)">' + PS.esc(tip.category) + '</span></div>' +
    '<div class="hub-note" style="margin-top:14px;font-size:.95rem">' + PS.esc(tip.tip) + '</div>' +
    '<p class="note" style="margin-top:8px">Source: ' + PS.esc(tip.source) + '</p>' +
    '<div class="btn-row" style="margin-top:12px">' +
    '<button type="button" class="btn" data-act="next-tip">Another one</button>' +
    '<button type="button" class="btn btn-ghost" data-act="copy-tip">Copy</button>' +
    '</div>' +
    '</div>';

  html += '<div class="card" style="border-left:4px solid var(--scen)">' +
    '<div class="card-head"><h2>This week\'s challenge</h2><div class="spacer"></div>' +
    '<span class="badge" style="background:var(--scen-soft);color:var(--scen)">' + PS.esc(challenge.difficulty) + '</span></div>' +
    '<p class="note">' + PS.esc(challenge.desc) + '</p>' +
    '<a class="btn btn-primary btn-sm" href="#/labs">Open the lab</a>' +
    '</div>';

  PS.pageInit = function () {
    PS.acts['next-tip'] = function () {
      PS.store.set('daily_tip_offset', PS.store.get('daily_tip_offset', 0) + 1);
      var t = PS.dailyTips.getTipOfDay();
      var card = PS.$('.hub-note');
      if (card) {
        card.textContent = t.tip;
        var srcEl = card.parentNode.querySelector('.note');
        if (srcEl) srcEl.textContent = 'Source: ' + t.source;
      }
    };
    PS.acts['copy-tip'] = function () {
      PS.copy(PS.dailyTips.getTipOfDay().tip, 'Tip');
    };
  };

  return html;
});

PS.route('career-paths', function () {
  PS.pageTitle = 'Career paths';

  var paths = [
    { title: 'Procurement Analyst', level: 'Entry', desc: 'Spend analysis, data management and reporting.', skills: ['Analytics', 'Excel', 'Data visualization'] },
    { title: 'Buyer / Purchasing Agent', level: 'Entry to mid', desc: 'Purchase orders, expediting and day-to-day supplier contact.', skills: ['PO management', 'Negotiation basics', 'ERP systems'] },
    { title: 'Category Manager', level: 'Mid', desc: 'Owns a category: strategy, sourcing events and supplier management.', skills: ['Strategic sourcing', 'Contract management', 'Stakeholder management'] },
    { title: 'Senior Category Manager', level: 'Mid to senior', desc: 'Leads complex categories and mentors the analysts and buyers below them.', skills: ['Advanced negotiation', 'Risk management'] },
    { title: 'Procurement Manager', level: 'Senior', desc: 'Runs the team and the processes: hiring, standards and performance.', skills: ['Team leadership', 'Process design', 'Budget management'] },
    { title: 'Director of Procurement', level: 'Executive', desc: 'Sets procurement strategy and represents the function to the business.', skills: ['Strategic leadership', 'Change management'] },
    { title: 'Chief Procurement Officer', level: 'C-suite', desc: 'Procurement at enterprise level: strategy, transformation and board reporting.', skills: ['Corporate strategy', 'Digital transformation'] }
  ];

  var html = '<div class="card">' +
    '<div class="card-head"><h1>Career paths</h1></div>' +
    '<p class="lead">The usual progression in procurement, and what each rung actually does all day.</p>' +
    '</div>';

  html += '<div class="card">';

  paths.forEach(function (path, i) {
    html += '<div style="display:flex;gap:14px;padding:14px 0;' + (i < paths.length - 1 ? 'border-bottom:1px solid var(--border)' : '') + '">' +
      '<div style="flex-shrink:0;width:34px;height:34px;border-radius:50%;background:var(--accent-soft);color:var(--accent);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.85rem">' + (i + 1) + '</div>' +
      '<div style="flex:1">' +
      '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap">' +
      '<h3 style="margin:0">' + PS.esc(path.title) + '</h3>' +
      '<span class="level-pill">' + PS.esc(path.level) + '</span>' +
      '</div>' +
      '<p class="note" style="margin:4px 0">' + PS.esc(path.desc) + '</p>' +
      '<div>' +
      path.skills.map(function (s) { return '<span class="badge" style="margin-right:4px">' + PS.esc(s) + '</span>'; }).join('') +
      '</div>' +
      '</div>' +
      '</div>';
  });

  html += '</div>';

  html += '<div class="card">' +
    '<h2>Where to start for each goal</h2>' +
    '<div class="grid grid-3" style="margin-top:12px">' +
    '<div class="card" style="text-align:center"><h3>Analyst</h3><p class="note">Spend analysis and data skills</p><a class="btn btn-sm" href="#/academy/func-spend-analysis">Start</a></div>' +
    '<div class="card" style="text-align:center"><h3>Buyer</h3><p class="note">PO execution and supplier management</p><a class="btn btn-sm" href="#/academy/func-supplier-eval">Start</a></div>' +
    '<div class="card" style="text-align:center"><h3>Manager</h3><p class="note">Strategy, contracts and leadership</p><a class="btn btn-sm" href="#/academy/func-category-mgmt">Start</a></div>' +
    '</div></div>';

  return html;
});

PS.route('community', function () {
  PS.pageTitle = 'Community';
  var posts = PS.store.get('community_posts', []);

  var html = '<div class="card">' +
    '<div class="card-head"><h1>Community</h1><div class="spacer"></div>' +
    '<button type="button" class="btn btn-primary btn-sm" data-act="community-new">New post</button></div>' +
    '<p class="lead">Notes, questions and wins. Posts are stored in this browser only; nothing is uploaded.</p>' +
    '</div>';

  html += '<div class="card" id="communityList">';

  if (!posts.length) {
    html += '<div class="empty">No posts yet. Start the first one above.</div>';
  } else {
    posts.slice(-20).reverse().forEach(function (post) {
      html += '<div style="padding:12px 0;border-bottom:1px solid var(--border)">' +
        '<div style="display:flex;justify-content:space-between;gap:8px;align-items:baseline;flex-wrap:wrap">' +
        '<strong>' + PS.esc(post.title) + '</strong>' +
        '<span class="badge">' + PS.esc(post.category) + '</span>' +
        '</div>' +
        '<p class="note" style="margin:4px 0">' + PS.esc(post.body) + '</p>' +
        '<div style="font-size:.78rem;color:var(--mute)">' + PS.esc(post.author) + ' &middot; ' + PS.dateStr(post.date) + '</div>' +
        '</div>';
    });
  }

  html += '</div>';

  html += '<div class="card" id="communityForm" hidden>' +
    '<h2>New post</h2>' +
    '<div class="field"><label for="communityTitle">Title</label><input type="text" id="communityTitle" maxlength="120" placeholder="What is it about?"></div>' +
    '<div class="field"><label for="communityCategory">Category</label><select id="communityCategory">' +
    '<option>General</option><option>Sourcing</option><option>Negotiation</option>' +
    '<option>Contracts</option><option>Risk</option><option>Career</option>' +
    '</select></div>' +
    '<div class="field"><label for="communityBody">Post</label><textarea id="communityBody" rows="4" maxlength="1000" placeholder="Write it out. What happened, what would you do differently?"></textarea></div>' +
    '<div class="field"><label for="communityAuthor">Name</label><input type="text" id="communityAuthor" maxlength="40" placeholder="Anonymous"></div>' +
    '<div class="btn-row"><button type="button" class="btn btn-primary" data-act="community-submit">Post</button>' +
    '<button type="button" class="btn btn-ghost" data-act="community-cancel">Cancel</button></div>' +
    '</div>';

  PS.pageInit = function () {
    PS.acts['community-new'] = function () {
      PS.$('#communityForm').hidden = false;
      PS.$('#communityTitle').focus();
    };
    PS.acts['community-cancel'] = function () {
      PS.$('#communityForm').hidden = true;
    };
    PS.acts['community-submit'] = function () {
      var title = PS.clean(PS.$('#communityTitle').value, 120);
      var body = PS.clean(PS.$('#communityBody').value, 1000);
      var author = PS.clean(PS.$('#communityAuthor').value, 40) || 'Anonymous';
      var category = PS.$('#communityCategory').value;
      if (!title || !body) { PS.toast('A title and a post are both needed.', 'warning'); return; }
      var all = PS.store.get('community_posts', []);
      all.push({ title: title, body: body, author: author, category: category, date: new Date().toISOString() });
      PS.store.set('community_posts', all);
      PS.toast('Posted.', 'ok');
      PS.renderRoute();
    };
  };

  return html;
});
