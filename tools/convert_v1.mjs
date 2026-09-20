/* Convert Procurement_AIO v1.1.0 content libraries into v2 seed fragments
   that call the PS.SKB / PS.SSOP / PS.SCL / PS.STPL / PS.SKPI / PS.SGLS /
   PS.SSCN compact seed helpers. Run: node tools/convert_v1.mjs */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const V1 = 'E:/Downloads/Procurement_AIO-main/Procurement_AIO-main';
/* One-shot v1 -> v2 migration script (already run). Paths are repo-relative;
   content fragments are emitted into src/content/. */
import { SRC_CONTENT } from './lib.mjs';
const BUILD = SRC_CONTENT;
const slug = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const J = JSON.stringify;
const jList = (arr) => J(String((arr || []).join(';')));

function loadV1(file, names) {
  const src = fs.readFileSync(path.join(V1, file), 'utf8');
  const ctx = { console };
  return vm.runInNewContext('(function(){' + src + '\n;return {' + names.join(',') + '};})()', ctx);
}

/* ---- id translation (v1 id -> v2 id) ---- */
const CALC = {
  'compare-quotes': 'calc-compare-quotes', 'landed-cost': 'calc-landed-cost', 'should-cost': 'calc-should-cost',
  'tco': 'calc-tco', 'negotiation-savings': 'calc-negotiation-savings', 'price-increase': 'calc-price-increase',
  'price-escalation': 'calc-price-escalation', 'payment-terms': 'calc-payment-terms', 'po-value-check': 'calc-po-value-check',
  'moq': 'calc-moq', 'make-vs-buy': 'calc-make-vs-buy', 'supplier-scorecard': 'calc-supplier-scorecard',
  'supplier-concentration': 'calc-supplier-concentration', 'budget-vs-actual': 'calc-budget-vs-actual',
  'savings-analysis': 'calc-savings-analysis', 'multi-year-contract': 'calc-multi-year-contract-cost',
  'gst': 'calc-gst-tax', 'currency': 'calc-fx-currency', 'kpi-calculator': 'calc-kpi-calculator'
};
const TPL = {
  'sow': 'tpl-statement-of-work', 'statement-of-work': 'tpl-statement-of-work',
  'negotiation-planner': 'tpl-negotiation-planner', 'negotiation': 'tpl-negotiation-planner',
  'concession-log': 'tpl-negotiation-concession-log',
  'business-review': 'tpl-supplier-business-review', 'change-request': 'tpl-contract-change-request',
  'award': 'tpl-award-recommendation', 'award-recommendation': 'tpl-award-recommendation',
  'business-case': 'tpl-business-case', 'rfq': 'tpl-rfq', 'rfp': 'tpl-rfp', 'rfi': 'tpl-rfi'
};
const CL = {
  'file-completeness': 'cl-procurement-file-completeness', 'procurement-file': 'cl-procurement-file-completeness',
  'intake': 'cl-procurement-intake', 'procurement-intake': 'cl-procurement-intake',
  'audit': 'cl-procurement-audit', 'procurement-audit': 'cl-procurement-audit',
  'contract': 'cl-contract-review', 'contract-review': 'cl-contract-review',
  'rfq': 'cl-rfq-preparation', 'rfq-preparation': 'cl-rfq-preparation', 'rfp': 'cl-rfp-preparation',
  'supplier': 'cl-supplier-evaluation', 'supplier-evaluation': 'cl-supplier-evaluation',
  'negotiation': 'cl-negotiation'
};
const SOP_ALIAS = {
  'supplier-performance': 'supplier-performance-management', 'supplier-price-increase': 'supplier-price-increase-review'
};
const KPI_ID = {
  'spend-under-management': 'sum', 'procurement-savings': 'savings', 'cost-avoidance': 'cost-avoidance',
  'purchase-price-variance': 'ppv', 'procurement-roi': 'roi', 'procurement-cycle-time': 'cycle-time',
  'rfq-cycle-time': 'rfq-cycle', 'supplier-otd': 'otd', 'supplier-on-time-delivery': 'otd', 'otif': 'otif',
  'supplier-defect-rate': 'defect-rate', 'contract-compliance': 'contract-compliance',
  'contract-coverage': 'contract-coverage', 'maverick-spend': 'maverick-spend',
  'supplier-concentration': 'supplier-concentration', 'supplier-performance': 'otd',
  'payment-terms': 'working-capital-impact', 'working-capital-impact': 'working-capital-impact',
  'savings-realization': 'savings-realization', 'sourcing-coverage': 'sourcing-coverage',
  'competitive-bid-rate': 'bid-rate'
};
const calcId = (id) => CALC[id] || ('calc-' + slug(id));
const tplId = (id) => TPL[id] || ('tpl-' + slug(id));
const sopId = (id) => 'sop-' + (SOP_ALIAS[id] || slug(id));
const clId = (id) => CL[id] || ('cl-' + slug(id));
const kpiId = (name) => 'kpi-' + (KPI_ID[slug(name)] || slug(name));

/* ---- authored v2 ids (so cross-links to hand-written content resolve) ---- */
const authored = new Set();
for (const f of fs.readdirSync(BUILD).sort()) {
  if (!/^1[07]/.test(f) || !f.endsWith('.js')) continue;
  const t = fs.readFileSync(path.join(BUILD, f), 'utf8');
  for (const m of t.matchAll(/\bi:\s*["']([a-z0-9-]+)["']/g)) authored.add(m[1]);
}
const kbId = (id) => authored.has(id) ? id : ('c-' + slug(id));
const decId = (id) => authored.has('dec-' + slug(id)) ? ('dec-' + slug(id)) : null;

/* resolve a v1 relation string into {key:[v2id]} */
function resolveRel(str) {
  let type = null, rest = String(str || '').trim();
  const i = rest.indexOf(':');
  if (i > 0 && /^(sop|concept|checklist|calculator|template|decision|kpi)$/i.test(rest.slice(0, i))) {
    type = rest.slice(0, i).toLowerCase(); rest = rest.slice(i + 1).trim();
  } else if (/^(decision|sop|calculator|checklist|template|concept)-/.test(rest)) {
    const m = rest.match(/^(decision|sop|calculator|checklist|template|concept)-/);
    type = m[1] === 'concept' ? 'kb' : m[1]; rest = rest.slice(m[0].length);
  } else return null;
  rest = rest.replace(/^checklist-/, '');
  switch (type) {
    case 'sop': return { sops: [sopId(rest)] };
    case 'kb': return { concepts: [kbId(rest)] };
    case 'checklist': return { checklists: [clId(rest)] };
    case 'calculator': return { calcs: [calcId(rest)] };
    case 'template': return { templates: [tplId(rest)] };
    case 'decision': { const d = decId(rest); return d ? { decisions: [d] } : null; }
    case 'kpi': return { kpis: [kpiId(rest)] };
    default: return null;
  }
}
function mergeRel(rel, add) {
  if (!add) return;
  for (const k of Object.keys(add)) {
    if (!rel[k]) rel[k] = [];
    for (const id of add[k]) if (rel[k].indexOf(id) < 0) rel[k].push(id);
  }
}
const relJ = (rel) => J(rel) === '{}' ? '' : (', rel: ' + J(rel));
const counts = {};
const emit = (file, text) => { fs.writeFileSync(path.join(BUILD, file), text); };

/* ============ SOP library ============ */
{
  const { SOPLibrary } = loadV1('content/sops.js', ['SOPLibrary']);
  const out = ['/* ============ SOP library: converted from v1.1.0 ============ */'];
  for (const s of SOPLibrary) {
    const rel = {};
    for (const r of (s.related || [])) mergeRel(rel, resolveRel(r));
    for (const c of (s.tools || [])) mergeRel(rel, resolveRel('calculator:' + c.replace(/^calculator-/, '')));
    for (const t of (s.templates || [])) mergeRel(rel, resolveRel('template:' + t.replace(/^template-/, '')));
    if (s.checklist) mergeRel(rel, resolveRel('checklist:' + s.checklist));
    for (const k of (s.kpis || [])) mergeRel(rel, resolveRel('kpi:' + k));
    const cats = { Core: 'Process', Sourcing: 'Sourcing', Negotiation: 'Negotiation', Contract: 'Contract', 'Supplier Management': 'Supplier', Governance: 'Governance', Savings: 'Savings' };
    const steps = (s.procedure || []).map((p) => p.step + '|' + (p.detail || '')).join(';');
    const decisions = (s.decisions || []).map((d) => d.point + '|' + (d.options || []).join(', ')).join(';');
    const cl = s.checklist ? clId(s.checklist.replace(/^checklist-/, '')) : '';
    out.push('PS.SSOP({ i: ' + J(sopId(s.id)) + ', t: ' + J(s.title) + ', c: ' + J(cats[s.category] || 'Process') +
      ', p: ' + J(s.purpose || s.description || '') + ', s: ' + J(s.scope || '') + ', g: ' + J(s.trigger || '') +
      ', ro: ' + jList(s.roles) + ', st: ' + J(steps) + ', ip: ' + jList(s.inputs) +
      ', ot: ' + jList(s.outputs) + ', dc: ' + J(decisions) + ', ct: ' + jList(s.controls) +
      ', kp: ' + jList(s.kpis) + ', rc: ' + jList(s.records) + ', rk: ' + jList(s.risks) +
      ', exc: ' + jList(s.exceptions) + (cl ? ', cl: ' + J(cl) : '') + relJ(rel) + ' });');
    counts.sop = (counts.sop || 0) + 1;
  }
  emit('11z_sop_v1.js', out.join('\n') + '\n');
}

/* ============ Checklist library ============ */
{
  const defs = loadV1('content/checklists.js', ['ChecklistDefinitions']).ChecklistDefinitions;
  const out = ['/* ============ Checklist library: converted from v1.1.0 ============ */'];
  for (const c of defs) {
    const items = (c.items || []).map((it) => String(it));
    const parts = Math.min(3, Math.max(1, Math.ceil(items.length / 8)));
    const size = Math.ceil(items.length / parts);
    const labels = ['Prepare and verify', 'Execute and decide', 'Close out and record'];
    const sc = [];
    for (let i = 0; i < parts; i++) {
      const slice = items.slice(i * size, (i + 1) * size);
      if (slice.length) sc.push({ g: labels[i] || ('Part ' + (i + 1)), items: slice });
    }
    out.push('PS.SCL({ i: ' + J(clId(c.id)) + ', t: ' + J(c.title) + ", c: 'Process', d: " + J(c.description || '') + ', sc: ' + J(sc) + ' });');
    counts.cl = (counts.cl || 0) + 1;
  }
  emit('12z_cl_v1.js', out.join('\n') + '\n');
}

/* ============ Template library ============ */
{
  const { TemplateLibrary } = loadV1('content/templates.js', ['TemplateLibrary']);
  const out = ['/* ============ Template library: converted from v1.1.0 ============ */'];
  for (const t of TemplateLibrary) {
    const rel = {};
    for (const r of (t.related || [])) mergeRel(rel, resolveRel(r));
    const fields = (t.fields || []).map((f) => {
      const o = { k: f.key, label: f.label, type: f.type || 'text' };
      if (f.required) o.req = 1;
      if (f.options) o.options = f.options;
      return o;
    });
    const half = Math.ceil(fields.length / 2);
    const sc = [
      { g: 'Details', fields: fields.slice(0, half) },
      { g: 'Content and terms', fields: fields.slice(half) }
    ].filter((x) => x.fields.length);
    out.push('PS.STPL({ i: ' + J(tplId(t.id)) + ', t: ' + J(t.title) + ', c: ' + J(t.category || 'General') +
      ', p: ' + J(t.description || '') + ', sc: ' + J(sc) + relJ(rel) + ' });');
    counts.tpl = (counts.tpl || 0) + 1;
  }
  emit('13z_tpl_v1.js', out.join('\n') + '\n');
}

/* ============ Glossary ============ */
{
  const { Glossary } = loadV1('content/glossary.js', ['Glossary']);
  const out = ['/* ============ Glossary: converted from v1.1.0 ============ */'];
  for (const g of Glossary) {
    out.push('PS.SGLS({ i: ' + J('gloss-' + slug(g.term)) + ', t: ' + J(g.term) + ', d: ' + J(g.definition) + ' });');
    counts.gloss = (counts.gloss || 0) + 1;
  }
  emit('15z_gloss_v1.js', out.join('\n') + '\n');
}

/* ============ KPI library ============ */
{
  const { KPILibrary } = loadV1('content/kpis.js', ['KPILibrary']);
  const out = ['/* ============ KPI library: converted from v1.1.0 ============ */'];
  for (const k of KPILibrary) {
    const rel = {};
    if (k.relatedSOP) mergeRel(rel, resolveRel(k.relatedSOP));
    if (k.relatedCalculator) mergeRel(rel, resolveRel(k.relatedCalculator));
    out.push('PS.SKPI({ i: ' + J(kpiId(k.id)) + ', t: ' + J(k.title) + ', c: ' + J(k.category || 'Performance') +
      ', d: ' + J(k.definition || '') + ', fm: ' + J(k.formula || '') + ', ip: ' + jList(k.inputs) +
      ', ex: ' + J(k.example || '') + ', it: ' + jList([k.interpretation]) + ', lm: ' + jList([k.limitations]) +
      ', mt: ' + jList(k.commonMistakes) + relJ(rel) + ' });');
    counts.kpi = (counts.kpi || 0) + 1;
  }
  emit('17z_kpi_v1.js', out.join('\n') + '\n');
}

/* ============ Scenarios ============ */
function pageRef(page) {
  const m = String(page || '').match(/^(sop|calculator|template|checklist|concept|decision)-(.+)$/);
  if (!m) return null;
  const kind = m[1], rest = m[2];
  if (kind === 'sop') return { type: 'sop', id: sopId(rest) };
  if (kind === 'calculator') return { type: 'calc', id: calcId(rest) };
  if (kind === 'template') return { type: 'tpl', id: tplId(rest) };
  if (kind === 'checklist') return { type: 'cl', id: clId(rest) };
  if (kind === 'concept') return { type: 'kb', id: kbId(rest) };
  if (kind === 'decision') { const d = decId(rest); return d ? { type: 'dec', id: d } : null; }
  return null;
}
function relKeyFor(type) {
  return { calc: 'calcs', sop: 'sops', cl: 'checklists', tpl: 'templates', kb: 'concepts', dec: 'decisions', kpi: 'kpis' }[type];
}
{
  const { Scenarios } = loadV1('content/scenarios.js', ['Scenarios']);
  const out = ['/* ============ Scenario guides: converted from v1.1.0 ============ */'];
  for (const s of Scenarios) {
    const rel = {};
    const steps = (s.steps || []).map((st) => {
      const ref = pageRef(st.page);
      if (ref) mergeRel(rel, { [relKeyFor(ref.type)]: [ref.id] });
      return { label: st.label, note: st.desc || '', type: ref ? ref.type : '', id: ref ? ref.id : '' };
    });
    for (const t of (s.tools || [])) mergeRel(rel, resolveRel('calculator:' + t.replace(/^calculator-/, '')));
    out.push('PS.SSCN({ i: ' + J('scn-' + s.id) + ', t: ' + J(s.title) + ", c: 'Situations', p: " + J(s.description || '') +
      ', st: ' + J(steps) + relJ(rel) + ' });');
    counts.scn = (counts.scn || 0) + 1;
  }
  emit('16z_scn_v1.js', out.join('\n') + '\n');
}

/* ============ Knowledge base ============ */
{
  const { KnowledgeBase } = loadV1('content/concepts.js', ['KnowledgeBase']);
  const out = ['/* ============ Knowledge base: converted from v1.1.0 ============ */'];
  for (const c of KnowledgeBase) {
    const rel = {};
    for (const r of (c.related || [])) mergeRel(rel, resolveRel(r));
    const ct = c.content || {};
    out.push('PS.SKB({ i: ' + J(kbId(c.id)) + ', t: ' + J(c.title) + ', c: ' + J(c.category || 'Fundamentals') +
      ', d: ' + J(ct.definition || c.description || '') +
      ', w: ' + J(ct.whyItMatters || '') +
      ', n: ' + J(ct.whenUsed || '') +
      ', h: ' + J((ct.process || []).join(';')) +
      ', e: ' + J(ct.example || '') +
      ', r: ' + J((ct.risks || []).join(';')) +
      ', m: ' + J((ct.commonMistakes || []).join(';')) + relJ(rel) + ' });');
    counts.kb = (counts.kb || 0) + 1;
  }
  emit('10z_kb_v1.js', out.join('\n') + '\n');
}

console.log('[convert_v1] written:', JSON.stringify(counts));
