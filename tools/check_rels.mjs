/* Static check: every rel id must resolve to a registered item of the right type. */
import fs from 'node:fs';
import path from 'node:path';
const BUILD = 'd:/DT_Works/Free Tools/Sherpa/build';
const files = fs.readdirSync(BUILD).filter((f) => f.endsWith('.js')).sort();
const ids = { kb: new Set(), sop: new Set(), cl: new Set(), tpl: new Set(), dec: new Set(), kpi: new Set(), gloss: new Set(), calc: new Set(), scen: new Set() };
const rels = [];
const slug = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
/* find balanced {..} starting at index of '{' */
function balanced(t, start) {
  let depth = 0;
  for (let i = start; i < t.length; i++) {
    if (t[i] === '{') depth++;
    else if (t[i] === '}') { depth--; if (!depth) return t.slice(start, i + 1); }
  }
  return null;
}
for (const f of files) {
  const t = fs.readFileSync(path.join(BUILD, f), 'utf8');
     for (const m of t.matchAll(/PS\.S(?:KB|SOP|DEC|CL|TPL|KPI|GLS|SCN)\(\s*\{/g)) {
    const obj = balanced(t, m.index + m[0].length - 1);
    if (!obj) continue;
    const im = obj.match(/\bi:\s*["']([^"']+)["']/);
    const ty = m[0].match(/KB|SOP|CL|TPL|DEC|KPI|GLS|SCN/)[0];
    const key = { KB: 'kb', SOP: 'sop', CL: 'cl', TPL: 'tpl', DEC: 'dec', KPI: 'kpi', GLS: 'gloss', SCN: 'scen' }[ty];
    if (im) ids[key].add(im[1]);
    const rm = obj.match(/,\s*rel:\s*\{/);
    if (rm) {
      const rtxt = balanced(obj, obj.indexOf('{', rm.index + rm[0].length - 1));
      if (rtxt) {
        const rel = {};
        for (const pm of rtxt.matchAll(/(\w+)\s*:\s*\[([^\]]*)\]/g)) {
          rel[pm[1]] = (pm[2].match(/["']([^"']+)["']/g) || []).map((x) => x.slice(1, -1));
        }
        rels.push({ f, rel });
      }
    }
  }
  for (const m of t.matchAll(/PS_CALC\.push\(\s*\{/g)) {
    const obj = balanced(t, m.index + m[0].length - 1);
    const im = obj && obj.match(/\bid:\s*["']([^"']+)["']/);
    if (im) ids.calc.add(im[1]);
    if (obj) {
      const rm = obj.match(/,\s*rel:\s*\{/);
      if (rm) {
        const rtxt = balanced(obj, obj.indexOf('{', rm.index + rm[0].length - 1));
        if (rtxt) {
          const rel = {};
          for (const pm of rtxt.matchAll(/(\w+)\s*:\s*\[([^\]]*)\]/g)) {
            rel[pm[1]] = (pm[2].match(/["']([^"']+)["']/g) || []).map((x) => x.slice(1, -1));
          }
          rels.push({ f, rel });
        }
      }
    }
  }
}
const ALIAS = { concepts:'concepts', kb:'concepts', concept:'concepts', sops:'sops', sop:'sops', checklists:'checklists', checklist:'checklists', cl:'checklists', templates:'templates', template:'templates', tpl:'templates', calcs:'calcs', calc:'calcs', calculator:'calcs', decisions:'decisions', decision:'decisions', dec:'decisions', kpis:'kpis', kpi:'kpis', scenarios:'scenarios', scenario:'scenarios', scen:'scenarios', glossary:'glossary', gloss:'glossary', term:'glossary' };
const KEY = { concepts: 'kb', sops: 'sop', checklists: 'cl', templates: 'tpl', calcs: 'calc', decisions: 'dec', kpis: 'kpi', scenarios: 'scen', glossary: 'gloss' };
const canon = (k) => ALIAS[k] || k;
/* translate legacy ids into v2 ids before resolving */
const CALC_LEGACY = /^(calc-)?(savings-analysis|budget-vs-actual|supplier-scorecard|supplier-concentration|make-vs-buy|moq|multi-year-contract|gst|currency|kpi-calculator)$/i;
const CALC_MAP = {
  'savings-analysis': 'calc-savings-analysis', 'budget-vs-actual': 'calc-budget-vs-actual',
  'supplier-scorecard': 'calc-supplier-scorecard', 'supplier-concentration': 'calc-supplier-concentration',
  'make-vs-buy': 'calc-make-vs-buy', 'moq': 'calc-moq', 'multi-year-contract': 'calc-multi-year-contract-cost',
  'gst': 'calc-gst-tax', 'currency': 'calc-fx-currency', 'kpi-calculator': 'calc-kpi-calculator'
};
const T = {
  calc: (x) => { const m = CALC_LEGACY.exec(x); return m ? CALC_MAP[m[1].toLowerCase()] : x; },
  sop: (x) => x,
  cl: (x) => x,
  tpl: (x) => x,
  kpi: (x) => x,
  dec: (x) => x,
  kb: (x) => x
};
const norm = (ty, id) => {
  if (ty === 'calc') { const m = CALC_LEGACY.exec(id); return m ? CALC_MAP[m[1].toLowerCase()] : id; }
  return id;
};
const broken = {};
let bad = 0;
for (const r of rels) {
  for (const [k, list] of Object.entries(r.rel)) {
    const ak = canon(k);
    const ty = KEY[ak];
    if (!ty) { console.log('?? unknown rel key', k, '<-', r.f); bad++; continue; }
    for (const id of list) {
      const rid = norm(ty, id);
      if (!ids[ty].has(rid)) {
        broken[ty + ' ' + rid] = (broken[ty + ' ' + rid] || new Set());
        broken[ty + ' ' + rid].add(r.f);
        bad++;
      }
    }
  }
}
for (const [k, from] of Object.entries(broken)) console.log('BROKEN', k, '<-', [...from].join(','));
console.log('registered:', Object.entries(ids).map(([k, v]) => k + '=' + v.size).join(' '));
console.log('checked', rels.length, 'rel objects; broken refs:', bad);
