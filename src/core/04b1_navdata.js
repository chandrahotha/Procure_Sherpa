/* ==========================================================
   Section F: navigation architecture (Section 7, 48)
   Clean 4-tier segregation:
   1. Portal & Navigation
   2. 🎓 Procurement Academy (Learning Hub)
   3. 💼 Procurement Operations Hub (Execution Hub)
   4. User Workspace & Settings
   ========================================================== */

PS.NAV_ACADEMY = [
  { sec: 'Academy Overview', icon: '🎓', items: [
    { label: 'Academy Curriculum', href: '#/academy' },
    { label: 'My Progress & Badges', href: '#/academy-progress' },
    { label: 'Certificate of Mastery', href: '#/certificate' }
  ] },
  { sec: 'Module 1: Foundations', icon: '1️⃣', items: [
    { label: '1. Mission & Value', href: '#/academy/func-mission-value', funcId: 'func-mission-value' },
    { label: '2. Spend Analysis', href: '#/academy/func-spend-analysis', funcId: 'func-spend-analysis' },
    { label: '3. Category Strategy', href: '#/academy/func-category-mgmt', funcId: 'func-category-mgmt' },
    { label: '4. Scope & SOW', href: '#/academy/func-requirement-scope', funcId: 'func-requirement-scope' }
  ] },
  { sec: 'Module 2: Commercial Sourcing', icon: '2️⃣', items: [
    { label: '5. Sourcing & RFx Strategy', href: '#/academy/func-rfx-strategy', funcId: 'func-rfx-strategy' },
    { label: '6. Tender / RFQ Issuance', href: '#/academy/func-rfq-issuance', funcId: 'func-rfq-issuance' },
    { label: '7. Quote Normalization', href: '#/academy/func-quote-normalization', funcId: 'func-quote-normalization' },
    { label: '8. Landed Cost & TCO', href: '#/academy/func-landed-cost-tco', funcId: 'func-landed-cost-tco' }
  ] },
  { sec: 'Module 3: Cost Structure & Risk', icon: '3️⃣', items: [
    { label: '9. Should-Cost Modeling', href: '#/academy/func-should-cost', funcId: 'func-should-cost' },
    { label: '10. Supplier Evaluation', href: '#/academy/func-supplier-eval', funcId: 'func-supplier-eval' },
    { label: '11. Supplier Risk & Vetting', href: '#/academy/func-supplier-risk', funcId: 'func-supplier-risk' },
    { label: '12. Strategic Negotiation', href: '#/academy/func-negotiation-strategy', funcId: 'func-negotiation-strategy' }
  ] },
  { sec: 'Module 4: Negotiation & Controls', icon: '4️⃣', items: [
    { label: '13. Commercial Terms & MOQs', href: '#/academy/func-commercial-terms', funcId: 'func-commercial-terms' },
    { label: '14. Contract Structuring', href: '#/academy/func-contract-structuring', funcId: 'func-contract-structuring' },
    { label: '15. DOA & Spend Controls', href: '#/academy/func-doa-controls', funcId: 'func-doa-controls' },
    { label: '16. PO & P2P Execution', href: '#/academy/func-po-execution', funcId: 'func-po-execution' }
  ] }
];

PS.NAV_OPERATIONS = [
  { sec: 'Operations Gateway', icon: '💼', items: [
    { label: 'Operations Gateway', href: '#/operations' },
    { label: 'What Should I Do?', href: '#/what' },
    { label: 'Procurement Lifecycle', href: '#/lifecycle' },
    { label: 'Maturity Assessment', href: '#/maturity' }
  ] },
  { sec: 'Execution Libraries', icon: '📋', items: [
    { label: 'Standard Operating Procedures', href: '#/list/sop' },
    { label: 'Procurement Calculators', href: '#/list/calc' },
    { label: 'Execution Checklists', href: '#/list/cl' },
    { label: 'Production Templates', href: '#/list/tpl' }
  ] },
  { sec: 'Governance & Knowledge', icon: '📚', items: [
    { label: 'Knowledge Hub & Concepts', href: '#/list/kb' },
    { label: 'KPIs & Value Metrics', href: '#/list/kpi' },
    { label: 'Decision Guides & Scenarios', href: '#/list/dec' },
    { label: 'Procurement Glossary', href: '#/glossary' }
  ] },
  { sec: 'Intelligence & Automation', icon: '🤖', items: [
    { label: 'Procurement Copilot', href: '#/copilot' },
    { label: 'Certification Exams', href: '#/exams' },
    { label: 'Spend Data Model', href: '#/spend-model' },
    { label: 'Document Pack Builder', href: '#/docpack' }
  ] }
];

PS.NAV_WORKSPACE = [
  { sec: 'My Workspace', icon: '📁', items: [
    { label: 'Saved Work & Reports', href: '#/saved', badge: 'saved' },
    { label: 'Favorites', href: '#/fav', badge: 'fav' },
    { label: 'Recently Used', href: '#/recent' },
    { label: 'Savings Dashboard', href: '#/dash-savings' }
  ] },
  { sec: 'Guidance & Search', icon: '🔍', items: [
    { label: 'Quick Start Guide', href: '#/quickstart' },
    { label: 'Global Search', href: '#/search' },
    { label: 'Help Center', href: '#/help' }
  ] },
  { sec: 'Account & System', icon: '⚙', items: [
    { label: 'Application Settings', href: '#/settings' },
    { label: 'Audit Log & Backup', href: '#/backup' }
  ] }
];

PS.NAV = PS.NAV_ACADEMY.concat(PS.NAV_OPERATIONS).concat(PS.NAV_WORKSPACE);

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