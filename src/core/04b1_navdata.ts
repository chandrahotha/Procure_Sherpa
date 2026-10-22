/* ==========================================================
   Section F: navigation architecture (Section 7, 48)
   Professional 3-hub structure:
   1. Procurement Academy (Learning Hub) - dynamic from curriculum
   2. Operations Hub (Execution Hub)
   3. Workspace & Settings
   Sections collapse; module sections default closed so the
   sidebar stays calm even with many curriculum items.
   ========================================================== */

PS.NAV_OPERATIONS = [
  { sec: 'Start Here', items: [
    { label: 'What Should I Do?', href: '#/what' },
    { label: 'Procurement Lifecycle', href: '#/lifecycle' },
    { label: 'Maturity Assessment', href: '#/maturity' }
  ] },
  { sec: 'Execution Libraries', items: [
    { label: 'SOPs & Procedures', href: '#/list/sop' },
    { label: 'Calculators', href: '#/list/calc' },
    { label: 'Checklists', href: '#/list/cl' },
    { label: 'Templates', href: '#/list/tpl' }
  ] },
  { sec: 'Reference & Governance', items: [
    { label: 'Knowledge Hub', href: '#/list/kb' },
    { label: 'KPIs & Metrics', href: '#/list/kpi' },
    { label: 'Decision Guides', href: '#/list/dec' },
    { label: 'Scenarios', href: '#/scenarios' },
    { label: 'Glossary', href: '#/glossary' }
  ] },
  { sec: 'Intelligence', items: [
    { label: 'Procurement Copilot', href: '#/copilot' },
    { label: 'Spend Data Model', href: '#/spend-model' },
    { label: 'Doc Pack Builder', href: '#/docpack' }
  ] }
];

PS.NAV_WORKSPACE = [
  { sec: 'My Work', items: [
    { label: 'Saved Work', href: '#/saved', badge: 'saved' },
    { label: 'Favorites', href: '#/fav', badge: 'fav' },
    { label: 'Recently Used', href: '#/recent' },
    { label: 'Savings Dashboard', href: '#/dash-savings' }
  ] },
  { sec: 'Support', items: [
    { label: 'Global Search', href: '#/search' },
    { label: 'Quick Start', href: '#/quickstart' },
    { label: 'Help Center', href: '#/help' }
  ] },
  { sec: 'System', items: [
    { label: 'Settings', href: '#/settings' },
    { label: 'Backup & Audit', href: '#/backup' }
  ] }
];

PS.NAV = PS.NAV_OPERATIONS.concat(PS.NAV_WORKSPACE);

/* ==========================================================
   Academy sidebar nav is generated from PS.ACADEMY_FUNCTIONS at
   runtime so membership, ordering, and module names always match
   the published curriculum. The maps below provide curated short
   labels; the builder falls back to the kicker + title.
   ========================================================== */
PS.ACADEMY_NAV_LABELS = {
  'func-mission-value': '1.1 Mission & Value',
  'func-spend-analysis': '1.2 Spend Analysis',
  'func-category-mgmt': '1.3 Category Strategy',
  'func-requirement-scope': '2.1 Scope & SOW',
  'func-rfx-strategy': '2.2 Sourcing & RFx',
  'func-rfq-issuance': '2.3 Tender / RFQ Issuance',
  'func-quote-normalization': '3.1 Quote Normalization',
  'func-landed-cost-tco': '3.2 Landed Cost & TCO',
  'func-should-cost': '3.3 Should-Cost Modeling',
  'func-supplier-eval': '4.1 Supplier Evaluation',
  'func-supplier-risk': '4.2 Supplier Risk & Vetting',
  'func-negotiation-strategy': '5.1 Negotiation Strategy',
  'func-commercial-terms': '5.2 Commercial Terms & MOQs',
  'func-contract-structuring': '6.1 Contract Structuring',
  'func-doa-controls': '6.2 DOA & Spend Controls',
  'func-po-execution': '7.1 PO & P2P Execution',
  'func-threeway-matching': '7.2 3-Way Matching',
  'func-srm-scorecards': '8.1 SRM & Scorecards',
  'func-savings-reporting': '8.2 Savings Reporting'
};

PS.ACADEMY_NAV_SEC_SHORT = {
  'Module 1: Foundations, Strategy & Spend Intelligence': 'Module 1: Foundations & Spend',
  'Module 2: Requirement Definition & Market Engagement': 'Module 2: Requirements & Market',
  'Module 3: Commercial Analysis & Cost Engineering': 'Module 3: Cost Engineering',
  'Module 4: Supplier Evaluation & Risk Management': 'Module 4: Supplier Evaluation & Risk',
  'Module 5: Negotiation Strategy & Commercial Terms': 'Module 5: Negotiation & Terms',
  'Module 6: Contracting & Governance': 'Module 6: Contracts & Governance',
  'Module 7: Operational Purchasing & Order Execution (P2P)': 'Module 7: P2P Execution',
  'Module 8: Supplier Management & Value Realization': 'Module 8: SRM & Value'
};