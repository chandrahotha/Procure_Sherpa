/* Static check: every rel id must resolve to a registered item of the
   right type.

   NOTE ON KEY QUOTING: content converted from v1 is written with
   JSON-style quoted keys ({ "sops": [...] }) while hand-authored
   content uses bare keys ({ sops: [...] }). The extraction patterns
   below previously required a bare word, so the relations - and some
   ids - in every converted file were silently skipped: the checker
   reported "broken refs: 0" without having looked at most of the
   content. Each pattern now accepts an optional quote. */
import { listFiles, baseName, readSrc } from './lib.mjs';
const files = listFiles().filter((f) => f.endsWith('.js'));
const ids = { kb: new Set(), sop: new Set(), cl: new Set(), tpl: new Set(), dec: new Set(), kpi: new Set(), gloss: new Set(), calc: new Set(), scen: new Set() };
const rels = [];
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
  const t = readSrc(f);
     for (const m of t.matchAll(/PS\.S(?:KB|SOP|DEC|CL|TPL|KPI|GLS|SCN)\(\s*\{/g)) {
    const obj = balanced(t, m.index + m[0].length - 1);
    if (!obj) continue;
    const im = obj.match(/["']?\bi["']?:\s*["']([^"']+)["']/);
    const ty = m[0].match(/KB|SOP|CL|TPL|DEC|KPI|GLS|SCN/)[0];
    const key = { KB: 'kb', SOP: 'sop', CL: 'cl', TPL: 'tpl', DEC: 'dec', KPI: 'kpi', GLS: 'gloss', SCN: 'scen' }[ty];
    if (im) ids[key].add(im[1]);
    const rm = obj.match(/,\s*["']?rel["']?:\s*\{/);
    if (rm) {
      const rtxt = balanced(obj, obj.indexOf('{', rm.index + rm[0].length - 1));
      if (rtxt) {
        const rel = {};
        for (const pm of rtxt.matchAll(/["']?(\w+)["']?\s*:\s*\[([^\]]*)\]/g)) {
          rel[pm[1]] = (pm[2].match(/["']([^"']+)["']/g) || []).map((x) => x.slice(1, -1));
        }
        rels.push({ f, rel });
      }
    }
  }
  for (const m of t.matchAll(/PS_CALC\.push\(\s*\{/g)) {
    const obj = balanced(t, m.index + m[0].length - 1);
    const im = obj && obj.match(/["']?\bid["']?:\s*["']([^"']+)["']/);
    if (im) ids.calc.add(im[1]);
    if (obj) {
      const rm = obj.match(/,\s*["']?rel["']?:\s*\{/);
      if (rm) {
        const rtxt = balanced(obj, obj.indexOf('{', rm.index + rm[0].length - 1));
        if (rtxt) {
          const rel = {};
          for (const pm of rtxt.matchAll(/["']?(\w+)["']?\s*:\s*\[([^\]]*)\]/g)) {
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
/* The legacy id translations live in exactly one place:
   src/core/90a_idmap.js, which the runtime also reads. This checker used
   to carry its own, richer copy, so it reported "broken refs: 0" while the
   app silently pruned three live links at boot. Both sides read the same
   JSON object now, so a divergence is impossible. */
const LEGACY_MAP = (() => {
  const src = readSrc('core/90a_idmap.js');
  const m = src.match(/PS\.LEGACY_ID_MAP\s*=\s*(\{[\s\S]*?\n\});/);
  if (!m) { console.error('FAIL: could not find PS.LEGACY_ID_MAP in core/90a_idmap.js'); process.exit(1); }
  return JSON.parse(m[1]);
})();
const norm = (ty, id) => {
  const hit = LEGACY_MAP[ty + ':' + id];
  if (hit) return hit;
  if (ty === 'dec' && id.startsWith('dec-')) return id.slice(4);
  if (ty === 'kb' && id.startsWith('kb-')) return id.slice(3);
  return id;
};

/* The link-completion declarations live in one place, and the runtime
   applies them. The checker applies them too, so the static view and
   the shipped view cannot disagree. */
const LINK_COMPLETION = (() => {
  const src = readSrc('core/90b_link_completion.js');
  const m = src.match(/PS\.LINK_COMPLETION\s*=\s*(\{[\s\S]*?\n\});/);
  if (!m) { console.error('FAIL: could not find PS.LINK_COMPLETION in core/90b_link_completion.js'); process.exit(1); }
  /* The declaration is written with single quotes for consistency with
     the rest of the source, and with bare inner keys. JSON needs
     double quotes and quoted keys. */
  const asJson = m[1].replace(/'/g, '"').replace(/([{,]\s*)([a-zA-Z_][\w]*)\s*:/g, '$1"$2":');
  return JSON.parse(asJson);
})();
for (const [, rel] of Object.entries(LINK_COMPLETION)) {
  for (const [k, list] of Object.entries(rel)) {
    const ty = KEY[canon(k)];
    if (!ty) continue;
    rels.push({ f: 'core/90b_link_completion.js', rel: { [k]: list } });
  }
}
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
        broken[ty + ' ' + rid].add(baseName(r.f));
        bad++;
      }
    }
  }
}
for (const [k, from] of Object.entries(broken)) console.log('BROKEN', k, '<-', [...from].join(','));
console.log('registered:', Object.entries(ids).map(([k, v]) => k + '=' + v.size).join(' '));
console.log('checked', rels.length, 'rel objects; broken refs:', bad);
/* A broken relation is a build failure, not a console note. The app prunes
   unresolvable references at boot, so a broken id is a link that silently
   does not exist in the shipped product. */
if (bad) { console.log('RELATIONSHIP CHECK: FAIL'); process.exit(1); }
console.log('RELATIONSHIP CHECK: PASS');
