/* ==========================================================
   Procure Sherpa v2.0 - Operations & Knowledge Hub Gateway
   The practitioner repository for daily professional execution
   ========================================================== */

PS.route('operations', function () {
  PS.pageTitle = 'Operations & Knowledge Hub';

  var phases = [
    {
      step: 'Phase 1',
      title: 'Intake & Demand Gating',
      desc: 'Verify business need, prevent maverick spend, confirm approved budget, and conduct contract register searches before initiating procurement.',
      tools: [
        { label: 'SOP: Procurement Intake & Demand Gating', href: '#/sop/sop-procurement-intake', type: 'SOP' },
        { label: 'Checklist: Requisition Verification', href: '#/cl/cl-procurement-intake', type: 'Checklist' },
        { label: 'Calculator: PO Value & Delegation of Authority', href: '#/calc/calc-po-value-check', type: 'Calculator' },
        { label: 'Template: Single-Source Justification', href: '#/tpl/tpl-single-source-justification', type: 'Template' }
      ],
      academyLink: { label: 'Study Intake & SOW in Academy', href: '#/academy/func-requirement-scope' }
    },
    {
      step: 'Phase 2',
      title: 'Sourcing & Tendering',
      desc: 'Formulate competitive solicitation strategy, draft clear specifications, issue sealed RFQ/RFPs, and conduct blind technical/commercial reviews.',
      tools: [
        { label: 'SOP: Request for Quotation (RFQ)', href: '#/sop/sop-rfq', type: 'SOP' },
        { label: 'SOP: Request for Proposal (RFP)', href: '#/sop/sop-rfp', type: 'SOP' },
        { label: 'Calculator: Multi-Supplier Quote Comparison', href: '#/calc/calc-compare-quotes', type: 'Calculator' },
        { label: 'Template: Standard RFQ Specification Package', href: '#/tpl/tpl-rfq', type: 'Template' }
      ],
      academyLink: { label: 'Study RFx Strategy in Academy', href: '#/academy/func-rfx-strategy' }
    },
    {
      step: 'Phase 3',
      title: 'Cost Engineering & TCO',
      desc: 'Calculate Total Cost of Ownership, normalize Incoterms freight and tariffs, model bottom-up should-costs, and evaluate cash discount terms.',
      tools: [
        { label: 'Calculator: Total Cost of Ownership (TCO)', href: '#/calc/calc-tco', type: 'Calculator' },
        { label: 'Calculator: Landed Cost & Freight Normalization', href: '#/calc/calc-landed-cost', type: 'Calculator' },
        { label: 'Calculator: Should-Cost & Cost Breakdown', href: '#/calc/calc-should-cost', type: 'Calculator' },
        { label: 'Calculator: Payment Terms & Working Capital', href: '#/calc/calc-payment-terms', type: 'Calculator' }
      ],
      academyLink: { label: 'Study TCO & Landed Cost in Academy', href: '#/academy/func-landed-cost-tco' }
    },
    {
      step: 'Phase 4',
      title: 'Supplier Vetting & Strategic Negotiation',
      desc: 'Evaluate financial health via Altman Z-Score, build tradable concession matrices, establish walk-away reservation prices, and conduct disciplined bargaining.',
      tools: [
        { label: 'SOP: Supplier Evaluation & Pre-Qualification', href: '#/sop/sop-supplier-evaluation', type: 'SOP' },
        { label: 'SOP: Negotiation Preparation & Strategy', href: '#/sop/sop-negotiation-preparation', type: 'SOP' },
        { label: 'Calculator: Negotiation Savings Valuation', href: '#/calc/calc-negotiation-savings', type: 'Calculator' },
        { label: 'Calculator: Weighted Supplier Scorecard', href: '#/calc/calc-supplier-scorecard', type: 'Calculator' }
      ],
      academyLink: { label: 'Study Negotiation Strategy in Academy', href: '#/academy/func-negotiation-strategy' }
    },
    {
      step: 'Phase 5',
      title: 'Contract Structuring & Award',
      desc: 'Conduct 3-way convergence reviews (Commercial, Legal, Finance), verify Delegation of Authority execution, and establish performance SLAs.',
      tools: [
        { label: 'SOP: Contract Review & Sign-Off Convergence', href: '#/sop/sop-contract-review', type: 'SOP' },
        { label: 'SOP: Contract Expiry & Renewal Defense', href: '#/sop/sop-contract-renewal', type: 'SOP' },
        { label: 'Template: Statement of Work (SOW)', href: '#/tpl/tpl-statement-of-work', type: 'Template' },
        { label: 'Template: Contract Amendment & Variation Notice', href: '#/tpl/tpl-contract-amendment', type: 'Template' }
      ],
      academyLink: { label: 'Study Contract Structuring in Academy', href: '#/academy/func-contract-structuring' }
    },
    {
      step: 'Phase 6',
      title: 'Post-Award Governance, SRM & Audit',
      desc: 'Manage OTIF delivery metrics, audit supplier price increases against independent indices, track hard savings, and maintain audit-ready files.',
      tools: [
        { label: 'SOP: Supplier Performance Management & QBRs', href: '#/sop/sop-supplier-performance-management', type: 'SOP' },
        { label: 'SOP: Supplier Price Increase Audit', href: '#/sop/sop-supplier-price-increase-review', type: 'SOP' },
        { label: 'SOP: Procurement Audit & File Completeness', href: '#/sop/sop-procurement-audit', type: 'SOP' },
        { label: 'Calculator: Hard P&L vs Avoidance Savings', href: '#/calc/calc-savings-analysis', type: 'Calculator' }
      ],
      academyLink: { label: 'Study SRM & Scorecards in Academy', href: '#/academy/func-srm-scorecards' }
    }
  ];

  var html = '<div class="ops-gateway-hero no-print">' +
    '<div class="flex items-center justify-between flex-wrap gap12 mb12">' +
    '<div><span class="hub-badge operations">Practitioner Command Center</span>' +
    '<h1 style="margin:8px 0 4px;">Procurement Operations Hub</h1>' +
    '<p class="t-dim" style="margin:0;">The complete operational repository for active procurement execution. 13 controlled SOPs, 19 calculators, 27 checklists, and 33 production templates arranged across 6 lifecycle phases.</p></div>' +
    '<div class="btn-row" style="margin:0;">' +
    '<a class="btn btn-primary" href="#/list/sop">Browse 13 SOPs</a>' +
    '<a class="btn" href="#/list/calc">Open Calculators</a>' +
    '<a class="btn btn-ghost" href="#/academy">&larr; Switch to Academy</a>' +
    '</div></div></div>';

  html += '<div class="ops-phase-grid no-print">';
  phases.forEach(function (phase) {
    html += '<div class="ops-phase-card">' +
      '<div class="ops-phase-kicker">' + PS.esc(phase.step) + '</div>' +
      '<div class="ops-phase-title">' + PS.esc(phase.title) + '</div>' +
      '<p class="t-dim t-sm">' + PS.esc(phase.desc) + '</p>' +
      '<div class="ops-tool-links">' +
      phase.tools.map(function (t) {
        return '<a class="ops-tool-link" href="' + PS.esc(t.href) + '">' +
          '<span>' + PS.esc(t.label) + '</span>' +
          '<span class="badge">' + PS.esc(t.type) + '</span></a>';
      }).join('') +
      '</div>' +
      '<div style="margin-top:14px; padding-top:10px; border-top:1px solid var(--border); font-size:0.82rem;">' +
      '<a class="text-accent font-semibold" href="' + PS.esc(phase.academyLink.href) + '">&bull; ' + PS.esc(phase.academyLink.label) + ' &rarr;</a>' +
      '</div>' +
      '</div>';
  });
  html += '</div>';

  return html;
});
