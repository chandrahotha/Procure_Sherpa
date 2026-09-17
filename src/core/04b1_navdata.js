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
  ] }
];

PS.NAV_WORKSPACE = [
  { sec: 'My Workspace', icon: '📁', items: [
    { label: 'Saved Work & Reports', href: '#/saved', badge: 'saved' },
    { label: 'Favorites', href: '#/fav', badge: 'fav' },
    { label: 'Recently Used', href: '#/recent' }
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