/* ==========================================================
   Section F: navigation architecture (Section 7, 48)
   ========================================================== */
PS.NAV = [
  { sec: 'Home', icon: '⌂', items: [
    { label: 'Home', href: '#/home' },
    { label: 'What Should I Do?', href: '#/what' },
    { label: 'Quick Start', href: '#/quickstart' },
    { label: 'Search', href: '#/search' }
  ] },
  { sec: 'Procurement Knowledge', icon: '▤', items: [
    { label: 'Knowledge Hub', href: '#/list/kb' },
    { label: 'Procurement Fundamentals', href: '#/list/kb/Fundamentals' },
    { label: 'Procurement Lifecycle', href: '#/lifecycle' },
    { label: 'Sourcing', href: '#/list/kb/Sourcing' },
    { label: 'Commercial & Cost', href: '#/list/kb/Commercial' },
    { label: 'Supplier Management', href: '#/list/kb/Supplier Management' },
    { label: 'Negotiation', href: '#/list/kb/Negotiation' },
    { label: 'Contracts', href: '#/list/kb/Contracts' },
    { label: 'Governance', href: '#/list/kb/Governance' },
    { label: 'Risk', href: '#/list/kb/Risk' },
    { label: 'Savings & Value', href: '#/list/kb/Savings' },
    { label: 'Procurement KPIs', href: '#/list/kpi' },
    { label: 'Procurement Glossary', href: '#/glossary' }
  ] },
  { sec: 'SOP Center', icon: '☰', items: [
    { label: 'All SOPs', href: '#/list/sop' },
    { label: 'Core Procurement SOPs', href: '#/list/sop/Core' },
    { label: 'Supplier SOPs', href: '#/list/sop/Supplier' },
    { label: 'Sourcing SOPs', href: '#/list/sop/Sourcing' },
    { label: 'Negotiation SOPs', href: '#/list/sop/Negotiation' },
    { label: 'Contract SOPs', href: '#/list/sop/Contract' },
    { label: 'Buying SOPs', href: '#/list/sop/Buying' },
    { label: 'Savings & Governance SOPs', href: '#/list/sop/Savings & Governance' }
  ] },
  { sec: 'Decision Center', icon: '⚖', items: [
    { label: 'All Decision Guides', href: '#/list/dec' },
    { label: 'What Should I Do?', href: '#/what' },
    { label: 'Scenario Library', href: '#/scenarios' },
    { label: 'Procurement Maturity Check', href: '#/maturity' }
  ] },
  { sec: 'Checklists', icon: '☑', items: [
    { label: 'All Checklists', href: '#/list/cl' },
    { label: 'Intake & Planning', href: '#/list/cl/Intake & Planning' },
    { label: 'Sourcing', href: '#/list/cl/Sourcing' },
    { label: 'Evaluation & Award', href: '#/list/cl/Evaluation & Award' },
    { label: 'Negotiation', href: '#/list/cl/Negotiation' },
    { label: 'Contract', href: '#/list/cl/Contract' },
    { label: 'Supplier', href: '#/list/cl/Supplier' },
    { label: 'Governance', href: '#/list/cl/Governance' },
    { label: 'Audit', href: '#/list/cl/Audit' }
  ] },
  { sec: 'Toolkit', icon: '∑', items: [
    { label: 'All Calculators', href: '#/list/calc' },
    { label: 'Quote Tools', href: '#/list/calc/Quote Tools' },
    { label: 'Cost Tools', href: '#/list/calc/Cost Tools' },
    { label: 'Negotiation Tools', href: '#/list/calc/Negotiation Tools' },
    { label: 'Supplier Tools', href: '#/list/calc/Supplier Tools' },
    { label: 'Buying Decision Tools', href: '#/list/calc/Buying Decision Tools' },
    { label: 'Budget & Savings Tools', href: '#/list/calc/Budget & Savings Tools' },
    { label: 'Contract Tools', href: '#/list/calc/Contract Tools' },
    { label: 'Tax & FX Tools', href: '#/list/calc/Tax & FX Tools' }
  ] },
  { sec: 'Templates', icon: '⧉', items: [
    { label: 'All Templates', href: '#/list/tpl' },
    { label: 'Sourcing', href: '#/list/tpl/Sourcing' },
    { label: 'Evaluation', href: '#/list/tpl/Evaluation' },
    { label: 'Negotiation', href: '#/list/tpl/Negotiation' },
    { label: 'Supplier', href: '#/list/tpl/Supplier' },
    { label: 'Contract', href: '#/list/tpl/Contract' },
    { label: 'Governance', href: '#/list/tpl/Governance' },
    { label: 'Savings', href: '#/list/tpl/Savings' }
  ] },
  { sec: 'KPI Center', icon: '▦', items: [
    { label: 'KPI Library', href: '#/list/kpi' },
    { label: 'KPI Calculator', href: '#/calc/kpi-calculator' },
    { label: 'Savings Dashboard', href: '#/dash-savings' }
  ] },
  { sec: 'Workspace', icon: '◍', items: [
    { label: 'Saved Work', href: '#/saved', badge: 'saved' },
    { label: 'Favorites', href: '#/fav', badge: 'fav' },
    { label: 'Recently Used', href: '#/recent' },
    { label: 'Dashboard', href: '#/dash' },
    { label: 'Open Checklists', href: '#/saved?type=checklist', badge: 'cl' },
    { label: 'Backup / Restore', href: '#/backup' },
    { label: 'Audit Log', href: '#/audit' },
    { label: 'Settings', href: '#/settings' }
  ] },
  { sec: 'Help', icon: '?', items: [
    { label: 'How to Use', href: '#/help' },
    { label: 'Methodology', href: '#/help/methodology' },
    { label: 'Assumptions', href: '#/help/assumptions' },
    { label: 'Privacy & Security', href: '#/help/privacy' },
    { label: 'Disclaimers', href: '#/help/disclaimers' },
    { label: 'Version History', href: '#/help/versions' },
    { label: 'Troubleshooting', href: '#/help/troubleshooting' }
  ] }
];