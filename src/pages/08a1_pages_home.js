/* ==========================================================
   Section L: page renderers
   Home = the Hub ONLY (hub-and-spoke): 8 modules in flow order.
   Clicking a hub card drills into its focused list page, which
   shows ONLY that related content. Nothing else on Home.
   (Section 8, 48, 49)
   ========================================================== */
PS.HUB_FLOW = [
  { step: 1, href: '#/what', ty: 'dec', t: 'Start here', d: 'Describe the situation in plain words — get the right SOP, checklist and calculator.', cta: 'Open guide' },
  { step: 2, href: '#/list/kb', ty: 'kb', t: 'Knowledge', d: 'What it is, why it matters, process, example, mistakes.', ct: 'kb', cta: 'Open hub' },
  { step: 3, href: '#/list/sop', ty: 'sop', t: 'SOPs', d: 'Procedures with controls, records, KPIs and checklists.', ct: 'sop', cta: 'Open hub' },
  { step: 4, href: '#/list/dec', ty: 'dec', t: 'Decisions', d: 'Sourcing method, make-or-buy, renew or re-source — plus guided scenarios.', ct: 'dec', cta: 'Open hub' },
  { step: 5, href: '#/list/cl', ty: 'cl', t: 'Checklists', d: 'Intake, RFQ, evaluation, negotiation, contract, audit.', ct: 'cl', cta: 'Open hub' },
  { step: 6, href: '#/list/calc', ty: 'calc', t: 'Calculators', d: 'Quotes, landed cost, TCO, savings, escalation, terms.', ct: 'calc', cta: 'Open hub' },
  { step: 7, href: '#/list/tpl', ty: 'tpl', t: 'Templates', d: 'RFQ, RFP, evaluation, negotiation plan, award, case.', ct: 'tpl', cta: 'Open hub' },
  { step: 8, href: '#/list/kpi', ty: 'kpi', t: 'KPIs', d: 'Formulas, worked examples and the traps that lie.', ct: 'kpi', cta: 'Open hub' }
];
/* Kept for backwards-compat: old 4-band hub no longer rendered on Home. */
PS.HUB = [];
PS.route('home', function () {
  PS.pageTitle = 'Home';
  return PS.homeHero() + PS.homeHub() + PS.homeContinue() + PS.disclaimer('policy');
});
