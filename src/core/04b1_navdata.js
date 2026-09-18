/* ==========================================================
   Section F: navigation architecture (Section 7, 48)
   One persistent sidebar, five top-level sections, shown on
   every route except the distraction-free Command Center
   (#/home). Deep Academy module/function browsing lives on the
   #/academy hub page itself, not duplicated in the sidebar.
   ========================================================== */

PS.NAV_UNIFIED = [
  { sec: 'Overview', ico: '1', items: [
    { label: 'Command Center', href: '#/home' },
    { label: 'What Should I Do?', href: '#/what' },
    { label: 'Procurement Lifecycle', href: '#/lifecycle' },
    { label: 'Maturity Assessment', href: '#/maturity' },
    { label: 'Global Search', href: '#/search' },
    { label: 'Quick Start', href: '#/quickstart' }
  ] },
  { sec: 'Learn', ico: '2', items: [
    { label: 'Academy Curriculum', href: '#/academy' },
    { label: 'My Progress & Badges', href: '#/academy-progress' },
    { label: 'Certification Exams', href: '#/exams' },
    { label: 'Credential Transcript (Future)', href: '#/certificate' }
  ] },
  { sec: 'Execute', ico: '3', items: [
    { label: 'SOPs & Procedures', href: '#/list/sop' },
    { label: 'Calculators', href: '#/list/calc' },
    { label: 'Checklists', href: '#/list/cl' },
    { label: 'Templates', href: '#/list/tpl' },
    { label: 'Procurement Copilot', href: '#/copilot' },
    { label: 'Spend Data Model', href: '#/spend-model' },
    { label: 'Doc Pack Builder', href: '#/docpack' }
  ] },
  { sec: 'Reference', ico: '4', items: [
    { label: 'Knowledge Hub', href: '#/list/kb' },
    { label: 'KPIs & Metrics', href: '#/list/kpi' },
    { label: 'Decision Guides', href: '#/list/dec' },
    { label: 'Scenarios', href: '#/scenarios' },
    { label: 'Glossary', href: '#/glossary' }
  ] },
  { sec: 'Workspace', ico: '5', items: [
    { label: 'Saved Work', href: '#/saved', badge: 'saved' },
    { label: 'Favorites', href: '#/fav', badge: 'fav' },
    { label: 'Recently Used', href: '#/recent' },
    { label: 'Savings Dashboard', href: '#/dash-savings' },
    { label: 'Help Center', href: '#/help' },
    { label: 'Settings', href: '#/settings' },
    { label: 'Backup & Audit', href: '#/backup' }
  ] }
];
