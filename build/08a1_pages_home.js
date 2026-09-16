/* ==========================================================
   Section L: page renderers
   Home, Quick Start, Favorites, Recently Used (Section 8, 48, 49)
   ========================================================== */
PS.SECTION_TILES = [
  { href: '#/list/kb', ty: 'kb', k: 'Knowledge', t: 'Procurement Knowledge Hub', d: 'Fundamentals, lifecycle, sourcing, commercial, supplier, negotiation, contracts, governance and risk concepts.' },
  { href: '#/list/sop', ty: 'sop', k: 'SOP Center', t: 'Standard operating procedures', d: 'Step-by-step procedures with controls, records, KPIs and an embedded operational checklist.' },
  { href: '#/what', ty: 'dec', k: 'Decision Center', t: 'What should I do?', d: 'Start with your business problem and get routed to the right process, SOP, checklist, calculator and template.' },
  { href: '#/list/calc', ty: 'calc', k: 'Toolkit', t: 'Calculators and analysis', d: 'Quotes, landed cost, TCO, negotiation, escalation, payment terms, suppliers, budget, tax and FX.' },
  { href: '#/list/cl', ty: 'cl', k: 'Checklists', t: 'Operational checklists', d: 'Intake, RFQ, evaluation, negotiation, award, contract, renewal, performance, risk and audit.' },
  { href: '#/list/tpl', ty: 'tpl', k: 'Templates', t: 'Ready-to-use templates', d: 'RFQ, RFP, evaluation, negotiation plan, award recommendation, business case, justification letters.' },
  { href: '#/list/kpi', ty: 'kpi', k: 'KPI Center', t: 'Procurement KPI library', d: 'Twenty KPIs with definition, formula, inputs, example, interpretation, limitations and mistakes.' },
  { href: '#/saved', ty: 'tpl', k: 'Workspace', t: 'Your saved work', d: 'Saved analyses, checklists, templates and decisions - stored only in this browser, with backup and restore.' }
];
PS.route('home', function () {
  PS.pageTitle = 'Home';
  return PS.homeHero() + PS.homeTools() + PS.homeActivity() + PS.disclaimer('policy');
});