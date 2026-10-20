/* ==========================================================
   Academy sandbox model definitions and generic renderer
   (Section 48, 73)

   The eleven commercial crisis models used to be eleven hand-written
   if/else branches inside the renderer, each repeating the same banner,
   input grid and button markup. They are data now, so the renderer is
   one shape and a new model is a data change.

   The input ids, defaults, ranges and option values are byte-identical
   to the previous implementation, so the calculation code in
   PS.executeAcademySandbox is untouched by this change.
   ========================================================== */
/* ==========================================================
   Academy sandbox model definitions

   These eleven commercial crisis models were hand-written as markup
   inside the renderer: ten if/else branches, each repeating the same
   banner, field grid and button markup. They are data now, rendered
   by PS.renderSandboxForm, so a new model is a data change rather
   than a new code branch.

   Extracted verbatim from the previous implementation; the input
   ids, defaults and option values are unchanged, so the calculation
   code in PS.executeAcademySandbox is untouched.
   ========================================================== */
PS.ACADEMY_SANDBOX_MODELS = {
  'spend_analysis': {
    title: 'Enterprise Crisis: Spend Fragmentation & Tail Spend Dissipation',
    desc: 'Spend is heavily fragmented across 185 suppliers, causing margin leakage and excessive accounts payable overhead. Quantify spend concentration using the Pareto 80/20 principle, isolate the critical Class A supplier core, and model cash savings from tail spend consolidation.',
    run: 'Run Pareto Spend Analysis & Generate Curve →',
    fields: [
      { id: 'sb_sp_v1', label: 'Top Supplier 1 Spend ($)', value: 3400000, step: 100000 },
      { id: 'sb_sp_v2', label: 'Top Supplier 2 Spend ($)', value: 2100000, step: 100000 },
      { id: 'sb_sp_v3', label: 'Top Supplier 3 Spend ($)', value: 1200000, step: 50000 },
      { id: 'sb_sp_v4', label: 'Top Supplier 4 Spend ($)', value: 650000, step: 25000 },
      { id: 'sb_sp_v5', label: 'Top Supplier 5 Spend ($)', value: 450000, step: 25000 },
      { id: 'sb_sp_tail', label: 'Remaining Tail Spend ($)', value: 1200000, step: 50000 },
      { id: 'sb_sp_tail_count', label: 'Number of Tail Vendors', value: 180, step: 10 },
      { id: 'sb_sp_rebate', label: 'Consolidation Rebate Target (%)', value: 5.0, step: 0.5 },
    ]
  },
  'kraljic_matrix': {
    title: 'Enterprise Crisis: Kraljic Sourcing Portfolio Segmentation',
    desc: 'Commercial strategy misalignment creates critical supply disruptions and uncompetitive margins. Position category spend across the 2x2 Kraljic Matrix to align commercial posture (Strategic Alliances, Competitive Tendering, Risk Buffering, or Transaction Automation).',
    run: 'Render Kraljic Portfolio 2x2 Matrix →',
    fields: [
      { id: 'sb_kr_s_imp', label: 'Strategic Item (Custom ASICs) Impact (0-100)', value: 88, min: 0, max: 100 },
      { id: 'sb_kr_s_risk', label: 'Strategic Item Risk (0-100)', value: 85, min: 0, max: 100 },
      { id: 'sb_kr_l_imp', label: 'Leverage Item (Packaging) Impact (0-100)', value: 75, min: 0, max: 100 },
      { id: 'sb_kr_l_risk', label: 'Leverage Item Risk (0-100)', value: 20, min: 0, max: 100 },
      { id: 'sb_kr_b_imp', label: 'Bottleneck Item (Resins) Impact (0-100)', value: 25, min: 0, max: 100 },
      { id: 'sb_kr_b_risk', label: 'Bottleneck Item Risk (0-100)', value: 85, min: 0, max: 100 },
      { id: 'sb_kr_n_imp', label: 'Non-Critical (Office Supplies) Impact', value: 18, min: 0, max: 100 },
      { id: 'sb_kr_n_risk', label: 'Non-Critical Item Risk', value: 15, min: 0, max: 100 },
    ]
  },
  'should_cost': {
    title: 'Enterprise Crisis: Bottom-Up Should-Cost Margin Padding Audit',
    desc: 'A sole-source precision machining vendor quotes $89.00/unit for automotive brackets, citing severe raw material increases. Build a bottom-up should-cost model (raw materials, direct labor, machine cycle, SG&A, and fair margin) to uncover margin padding before negotiating.',
    run: 'Construct Should-Cost Waterfall & Expose Margin →',
    fields: [
      { id: 'sb_sc_mat', label: 'Raw Material Cost ($/unit)', value: 38.50, step: 0.5 },
      { id: 'sb_sc_hrs', label: 'Direct Labor Hours / Unit', value: 0.40, step: 0.05 },
      { id: 'sb_sc_rate', label: 'Shop Labor Rate ($/hr)', value: 35.00, step: 1.0 },
      { id: 'sb_sc_over', label: 'Machine Overhead ($/unit)', value: 8.50, step: 0.5 },
      { id: 'sb_sc_sga', label: 'SG&A Overhead Allocation (%)', value: 10.0, step: 0.5 },
      { id: 'sb_sc_margin', label: 'Fair Supplier Margin Target (%)', value: 12.0, step: 0.5 },
      { id: 'sb_sc_quote', label: 'Supplier Quoted Unit Price ($)', value: 89.00, step: 1.0 },
      { id: 'sb_sc_vol', label: 'Annual Sourcing Volume (Units)', value: 20000, step: 1000 },
    ]
  },
  'supplier_risk': {
    title: 'Enterprise Crisis: Critical Supplier Solvency & Altman Z-Score Stress Test',
    desc: 'A critical components vendor delays production shipments. Trade rumors cite liquidity shortages. Audit balance sheet ratios through the Altman Z-Score manufacturing solvency model before releasing major advance cash deposits.',
    run: 'Audit Financial Solvency & Gauge Dial →',
    fields: [
      { id: 'sb_zr_wc', label: 'Working Capital ($)', value: 180000, step: 10000 },
      { id: 'sb_zr_re', label: 'Retained Earnings ($)', value: 110000, step: 10000 },
      { id: 'sb_zr_ebit', label: 'Operating EBIT ($)', value: 85000, step: 5000 },
      { id: 'sb_zr_eq', label: 'Market / Book Equity ($)', value: 320000, step: 10000 },
      { id: 'sb_zr_liab', label: 'Total Liabilities ($)', value: 780000, step: 10000 },
      { id: 'sb_zr_sales', label: 'Annual Sales Revenue ($)', value: 1500000, step: 50000 },
      { id: 'sb_zr_assets', label: 'Total Assets ($)', value: 1100000, step: 50000 },
    ]
  },
  'contract_redline': {
    title: 'Enterprise Crisis: High-Stakes Contract Clause Redline Auditing',
    desc: 'A strategic vendor submits their standard supplier contract containing aggressive liability exclusions, punitive late payment fees, and proprietary IP claims. Select your commercial redline stance across 4 critical risk clauses to protect corporate balance sheets.',
    run: 'Audit Contract Legal Exposure & Redline Scorecard →',
    fields: [
      { id: 'sb_cr_liability', label: '1. Limitation of Liability & Consequential Damages', span: 2, options: [{ v: 'vendor', l: 'Accept Vendor Paper: 1x Annual spend cap, excludes all data breach and gross negligence indemnity' }, { v: 'fallback', l: 'Commercially Balanced: 3x Annual spend cap, with $5M super-cap for data breach and IP infringement', sel: 1 }, { v: 'redline', l: 'Enterprise Redline: Uncapped for confidentiality, data breaches, and IP indemnity; 5x standard cap' }] },
      { id: 'sb_cr_payment', label: '2. Payment Terms & Dispute Withholding', span: 2, options: [{ v: 'vendor', l: 'Accept Vendor Paper: Net 15 advance billing, 2.5%/month late penalty, no dispute withholding' }, { v: 'fallback', l: 'Commercially Balanced: Net 45 from valid invoice, statutory interest only, withholding allowed for disputes', sel: 1 }, { v: 'redline', l: 'Enterprise Redline: Net 60 End-of-Month, 0% penalty on disputed amounts, performance continuity mandated' }] },
      { id: 'sb_cr_warranty', label: '3. Warranty & SLA Service Credits', span: 2, options: [{ v: 'vendor', l: 'Accept Vendor Paper: 14 days as-is, repair sole remedy at vendor discretion, no SLA penalties' }, { v: 'fallback', l: 'Commercially Balanced: 12 months comprehensive, 48h swap, 10% monthly service credits', sel: 1 }, { v: 'redline', l: 'Enterprise Redline: 24 months full warranty, 99.9% uptime with 25% liquidated damages and termination exit rights' }] },
      { id: 'sb_cr_ip', label: '4. Intellectual Property & Deliverables Ownership', span: 2, options: [{ v: 'vendor', l: 'Accept Vendor Paper: Vendor owns all bespoke tooling, code, and custom CAD deliverables' }, { v: 'fallback', l: 'Commercially Balanced: Buyer owns bespoke deliverables; vendor retains pre-existing background IP', sel: 1 }, { v: 'redline', l: 'Enterprise Redline: Complete assignment of all work product, source code, and tooling upon creation' }] },
    ]
  },
  'supplier_eval': {
    title: 'Enterprise Crisis: Multi-Criteria Sourcing Evaluation (MCDA)',
    desc: 'Two finalists submitted bids for an enterprise facility operations contract. Supplier A is the premium quality incumbent with higher pricing; Supplier B is an aggressive challenger offering significant cost savings with unproven resilience. Run a weighted Multi-Criteria Decision Analysis.',
    run: 'Calculate Weighted MCDA Decision Score →',
    fields: [
      { id: 'sb_ev_a_qual', label: 'Supplier A Technical Quality (1-10)', value: 9.0, step: 0.5, min: 1, max: 10 },
      { id: 'sb_ev_a_price', label: 'Supplier A Commercial Price (1-10)', value: 6.0, step: 0.5, min: 1, max: 10 },
      { id: 'sb_ev_a_deliv', label: 'Supplier A Delivery Resilience (1-10)', value: 8.5, step: 0.5, min: 1, max: 10 },
      { id: 'sb_ev_a_esg', label: 'Supplier A ESG Compliance (1-10)', value: 8.0, step: 0.5, min: 1, max: 10 },
      { id: 'sb_ev_a_fin', label: 'Supplier A Solvency Score (1-10)', value: 8.0, step: 0.5, min: 1, max: 10 },
      { id: 'sb_ev_b_qual', label: 'Supplier B Technical Quality (1-10)', value: 7.5, step: 0.5, min: 1, max: 10 },
      { id: 'sb_ev_b_price', label: 'Supplier B Commercial Price (1-10)', value: 9.2, step: 0.5, min: 1, max: 10 },
      { id: 'sb_ev_b_deliv', label: 'Supplier B Delivery Resilience (1-10)', value: 7.0, step: 0.5, min: 1, max: 10 },
      { id: 'sb_ev_b_esg', label: 'Supplier B ESG Compliance (1-10)', value: 7.0, step: 0.5, min: 1, max: 10 },
      { id: 'sb_ev_b_fin', label: 'Supplier B Solvency Score (1-10)', value: 6.5, step: 0.5, min: 1, max: 10 },
    ]
  },
  'incoterms': {
    title: 'Enterprise Crisis: Global Incoterms Landed Cost Discrepancy',
    desc: 'An overseas vendor offers an attractive unit price under EXW (Ex Works), claiming a $27/unit discount over a domestic vendor offering DDP. Test the real Total Landed Cost (TLC) including ocean freight, customs tariffs, terminal port handling, and demurrage risk buffers.',
    run: 'Run Commercial Landed Cost Audit →',
    fields: [
      { id: 'sb_exw_price', label: 'Overseas EXW Price ($)', value: 85, step: 1 },
      { id: 'sb_ocean_freight', label: 'Ocean Freight / Unit ($)', value: 14, step: 1 },
      { id: 'sb_duty_pct', label: 'Tariff / Customs Duty (%)', value: 6.5, step: 0.5 },
      { id: 'sb_port_cost', label: 'Port Handling & Drayage ($)', value: 5.5, step: 0.5 },
      { id: 'sb_demurrage', label: 'Port Demurrage Risk Buffer ($)', value: 3.5, step: 0.5 },
      { id: 'sb_ddp_price', label: 'Domestic DDP Quote ($)', value: 112, step: 1 },
      { id: 'sb_volume', label: 'Annual Volume (Units)', value: 5000, step: 500 },
    ]
  },
  'tco': {
    title: 'Enterprise Crisis: Capex vs Opex Life-Cycle TCO Trade-Off',
    desc: 'The operations manager demands Model A because it is $40,000 cheaper up front. However, engineering notes that Model B uses 55% less electrical power and requires half the scheduled maintenance over its 5-year operating life. Test the true 5-year Total Cost of Ownership.',
    run: 'Evaluate 5-Year Life Cycle Model →',
    fields: [
      { id: 'sb_ca_price', label: 'Model A Initial Capex ($)', value: 90000, step: 5000 },
      { id: 'sb_ca_energy', label: 'Model A Annual Energy ($/yr)', value: 26000, step: 1000 },
      { id: 'sb_ca_maint', label: 'Model A Annual Maintenance ($/yr)', value: 11000, step: 1000 },
      { id: 'sb_cb_price', label: 'Model B Initial Capex ($)', value: 130000, step: 5000 },
      { id: 'sb_cb_energy', label: 'Model B Annual Energy ($/yr)', value: 11500, step: 500 },
      { id: 'sb_cb_maint', label: 'Model B Annual Maintenance ($/yr)', value: 4500, step: 500 },
      { id: 'sb_lifespan', label: 'Operating Lifespan (Years)', value: 5, step: 1 },
    ]
  },
  'matching': {
    title: 'Enterprise Crisis: Three-Way Match Forensic Leakage Audit',
    desc: 'Accounts Payable flags a supplier invoice for $57,000 that failed automated 3-way matching against a Purchase Order of $51,000 and Goods Receipt Note. Unbundle the unapproved price variance, unverified backorders, and unauthorized freight additions before funds are released.',
    run: 'Audit 3-Way Discrepancy & Authorize Payment →',
    fields: [
      { id: 'sb_po_rate', label: 'PO Contracted Price ($/unit)', value: 85, step: 1 },
      { id: 'sb_po_qty', label: 'PO Authorized Quantity', value: 600, step: 10 },
      { id: 'sb_grn_qty', label: 'Physically Received Quantity (GRN)', value: 480, step: 10 },
      { id: 'sb_inv_rate', label: 'Invoiced Unit Price ($/unit)', value: 92, step: 1 },
      { id: 'sb_inv_qty', label: 'Invoiced Quantity Billed', value: 600, step: 10 },
      { id: 'sb_inv_freight', label: 'Uncontracted Freight Billed ($)', value: 1800, step: 100 },
    ]
  },
  'negotiation': {
    title: 'Enterprise Crisis: Monopoly Renewal & Multi-Variable Concession Trading',
    desc: 'A critical enterprise software vendor refuses any baseline price reduction on a $250,000 renewal. Trade non-cash commercial variables (term length, prompt payment, marketing logo rights, and strict SLA service credits) to extract commercial value without compromising scope.',
    run: 'Calculate Concession Package Value →',
    fields: [
      { id: 'sb_neg_spend', label: 'Annual Baseline Spend ($)', value: 250000, step: 10000 },
      { id: 'sb_neg_term', label: 'Annual Baseline Spend ($)</label><input type="number" id="sb_neg_spend" value="250000" step="10000"></div><div class="sandbox-field"><label>Multi-Year Term Commitment', options: [{ v: '1', l: '1-Year Renewal (0% discount)' }, { v: '3', l: '3-Year Agreement (8.0% discount)', sel: 1 }, { v: '5', l: '5-Year Agreement (12.0% discount)' }] },
      { id: 'sb_neg_pay', label: 'Payment Terms Concession', options: [{ v: '0', l: 'Standard Net 30 (0% discount)' }, { v: '1.5', l: '2/10 Net 30 Prompt Pay (1.5% value)', sel: 1 }, { v: '2.5', l: 'Annual Upfront Advance (2.5% value)' }] },
      { id: 'sb_neg_case', label: 'Co-Marketing Case Study', options: [{ v: '0', l: 'No Public Logo Rights' }, { v: '2.0', l: 'Published Enterprise Case Study (2.0% value)', sel: 1 }] },
      { id: 'sb_neg_sla', label: 'SLA Service Credit Penalties', options: [{ v: '0', l: 'Standard Best-Effort' }, { v: '1.5', l: '99.9% Uptime with 10% Monthly Rebates (1.5% risk value)', sel: 1 }] },
    ]
  },
  'price-increase': {
    title: 'Enterprise Crisis: Emergency Supplier Price Increase Defense',
    desc: 'A strategic supplier demands an urgent +18.5% price hike citing general market inflation. Unbundle their direct materials and labor cost composition, apply verifiable PPI economic indices, and compute the cost-justified counter-offer.',
    run: 'Audit Cost Breakdown & Compute Counter-Offer →',
    fields: [
      { id: 'sb_base_price', label: 'Current Baseline Unit Price ($)', value: 100, step: 5 },
      { id: 'sb_demanded_price', label: 'Supplier Demanded Price ($)', value: 118.5, step: 0.5 },
      { id: 'sb_mat_share', label: 'Raw Material Share (%)', value: 45, step: 5 },
      { id: 'sb_mat_ppi', label: 'Official Material PPI Change (%)', value: 8.0, step: 0.5 },
      { id: 'sb_lab_share', label: 'Direct Labor Share (%)', value: 25, step: 5 },
      { id: 'sb_lab_wage', label: 'Official Labor Wage Index (%)', value: 3.0, step: 0.5 },
      { id: 'sb_volume', label: 'Annual Volume (Units)', value: 10000, step: 1000 },
    ]
  },
};

/* ---------- generic sandbox form renderer ----------
   The eleven crisis models are data. This builds the banner, the input
   grid and the run button from one shape, so a new model is a data
   change rather than a new hand-written branch. */
PS.renderSandboxForm = function (type) {
  var m = PS.ACADEMY_SANDBOX_MODELS[type] || PS.ACADEMY_SANDBOX_MODELS['price-increase'];
  if (!m) return "";
  var html = '<div class="sandbox-crisis-banner">' +
    '<h4>' + PS.esc(m.title) + '</h4>' +
    '<p>' + PS.esc(m.desc) + '</p>' +
    '</div>' +
    '<div class="sandbox-form">' +
    '<div class="sandbox-input-grid">';
  (m.fields || []).forEach(function (f) {
    var span = f.span ? ' style="grid-column: span 2;"' : '';
    if (f.options) {
      html += '<div class="sandbox-field' + span + '"><label>' + PS.esc(f.label) + '</label>' +
        '<select id="' + PS.esc(f.id) + '">' +
        f.options.map(function (o) {
          return '<option value="' + PS.esc(o.v) + '"' + (o.sel ? ' selected' : '') + '>' + PS.esc(o.l) + '</option>';
        }).join('') + '</select></div>';
    } else {
      html += '<div class="sandbox-field' + span + '"><label>' + PS.esc(f.label) + '</label>' +
        '<input type="number" id="' + PS.esc(f.id) + '" value="' + PS.esc(f.value) + '"' +
        (f.step !== undefined ? ' step="' + PS.esc(f.step) + '"' : '') +
        (f.min !== undefined ? ' min="' + PS.esc(f.min) + '"' : '') +
        (f.max !== undefined ? ' max="' + PS.esc(f.max) + '"' : '') + '></div>';
    }
  });
  html += '</div>' +
    '<button type="button" class="btn btn-primary" data-act="academy-sandbox-run">' + PS.esc(m.run) + '</button>' +
    '</div>';
  return html;
};
