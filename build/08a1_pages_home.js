/* ==========================================================
   Section L: page renderers
   Home = the Hub: all cards, beginner -> expert flow (Section 8, 48, 49)
   ========================================================== */
PS.HUB = [
  { lvl: 'Start', tag: 'Beginner', blurb: 'Never used a procurement toolkit before? Begin here - each card walks you through.', cards: [
    { href: '#/quickstart', ty: 'help', t: 'Quick Start', d: 'The guided eight-step tour: from "I have a problem" to a documented decision.' },
    { href: '#/what', ty: 'dec', t: 'What should I do?', d: 'Describe your situation in plain words - get routed to the right SOP, checklist and calculator.' },
    { href: '#/scenarios', ty: 'scen', t: 'Guided scenarios', d: 'Real situations - a new purchase, a price increase, a renewal - as step-by-step journeys.', ct: 'scen' },
    { href: '#/help', ty: 'help', t: 'Help & troubleshooting', d: 'How the app works, where your data lives, how to print, and fixes for common problems.' }
  ] },
  { lvl: 'Learn', tag: 'Everyday', blurb: 'Understand the craft: concepts, procedures and the vocabulary of professional procurement.', cards: [
    { href: '#/list/kb', ty: 'kb', t: 'Knowledge Hub', d: 'Concepts from fundamentals to risk: definition, why it matters, process, example, mistakes.', ct: 'kb' },
    { href: '#/list/sop', ty: 'sop', t: 'SOP Center', d: 'Step-by-step procedures with controls, records, KPIs and an embedded working checklist.', ct: 'sop' },
    { href: '#/list/cl', ty: 'cl', t: 'Checklists', d: 'Operational proof-of-work: intake, RFQ, evaluation, negotiation, contract, audit.', ct: 'cl' },
    { href: '#/glossary', ty: 'gloss', t: 'Glossary', d: 'The language of procurement - BATNA to ZOPA - one line each, searchable.', ct: 'gloss' }
  ] },
  { lvl: 'Do', tag: 'Professional', blurb: 'Produce the numbers and documents the job actually requires - then save and print them.', cards: [
    { href: '#/list/calc', ty: 'calc', t: 'Calculators', d: 'Quotes, landed cost, should-cost, TCO, negotiation savings, escalation, payment terms, approvals.', ct: 'calc' },
    { href: '#/list/tpl', ty: 'tpl', t: 'Templates', d: 'RFQ, RFP, evaluation forms, negotiation plan, award recommendation, business case - print-ready.', ct: 'tpl' },
    { href: '#/list/kpi', ty: 'kpi', t: 'KPI Center', d: 'Definitions, formulas, worked examples and the mistakes that make KPI numbers lie.', ct: 'kpi' },
    { href: '#/saved', ty: 'tpl', t: 'Your workspace', d: 'Saved analyses with your notes, checklist progress, backups - all local to this browser.' }
  ] },
  { lvl: 'Master', tag: 'Expert', blurb: 'The strategic layer: structured decisions, maturity assessment and the end-to-end map.', cards: [
    { href: '#/dec', ty: 'dec', t: 'Decision guides', d: 'Weighted, transparent decision frameworks: sourcing method, make-or-buy, renew or re-source.', ct: 'dec', soon: true },
    { href: '#/maturity', ty: 'kpi', t: 'Maturity model', d: 'Score your procurement function across the five levels and get the gaps to close next.', soon: true },
    { href: '#/lifecycle', ty: 'sop', t: 'Lifecycle map', d: 'The end-to-end procurement lifecycle as one navigable picture - every stage linked to its SOP.', soon: true },
    { href: '#/dash', ty: 'kpi', t: 'Dashboard', d: 'Your activity, coverage and savings snapshot across everything you have used and saved.' }
  ] }
];
PS.route('home', function () {
  PS.pageTitle = 'Home';
  return PS.homeHero() + PS.homeTools() + PS.homeHub() + PS.homeActivity() + PS.disclaimer('policy');
});