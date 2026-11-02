/* Static check: every rel id must resolve to a registered item of the
   right type.

   NOTE ON KEY QUOTING: content converted from v1 is written with
   JSON-style quoted keys ({ "sops": [...] }) while hand-authored
   content uses bare keys ({ sops: [...] }). The extraction patterns
   below previously required a bare word, so the relations - and some
   ids - in every converted file were silently skipped: the checker
   reported "broken refs: 0" without having looked at most of the
   content. Each pattern now accepts an optional quote. */
import { listFiles, baseName, readSrc, registryFromSource } from './lib.mjs';
const files = listFiles().filter((f) => f.endsWith('.js'));
/* The ids and the rel objects come from tools/lib.mjs now, because
   tools/inventory.mjs has to count exactly what this file resolves.
   `registryFromSource` reads the only two ways an id can be registered:
   a PS.S*( {…} ) push for content, a PS_CALC.push({…}) for calculators. */
const { ids, rels } = registryFromSource(files);
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
/* Hard-coded links in copy are relations too.
   PS.ACADEMY_FUNCTIONS[].labMission.ctaHref, the "Apply in Laboratory"
   button on every lesson, is written as a literal '#/calc/calc-scorecard'
   string. Nothing above read those: rel objects were validated, hrefs in
   page templates were not, so twelve Academy lessons - across four content
   files - were pointing at calculator, checklist and template ids that had
   never existed, and a learner pressing the button was served the not-found
   card. The app cannot show them otherwise, because it renders the string.

   Every '#/<type>/<id>' the source writes as a link is checked here against
   the same registry and the same legacy-id map the runtime uses. A comment
   giving an example of a bad link is allowed; a link is not. */
const LINK_TYPE = { k: 'kb', sop: 'sop', cl: 'cl', tpl: 'tpl', dec: 'dec', kpi: 'kpi', scen: 'scen', calc: 'calc' };
const hrefHits = [];
for (const f of files) {
  const body = readSrc(f);
  for (const m of body.matchAll(/(?:href="#|Href:\s*['"])(#\/(k|sop|cl|tpl|dec|kpi|scen|calc)\/([A-Za-z0-9_-]+))/g)) {
    const ty = LINK_TYPE[m[2]];
    const rid = norm(ty, m[3]);
    if (!ids[ty] || !ids[ty].has(rid)) hrefHits.push(f + ' -> ' + m[1] + ' (no ' + ty + ' with id ' + rid + ')');
  }
}
if (hrefHits.length) {
  hrefHits.forEach((h) => console.log('BROKEN hard-coded link', h));
  bad += hrefHits.length;
} else {
  console.log('hard-coded item links in copy: all resolve');
}

for (const [k, from] of Object.entries(broken)) console.log('BROKEN', k, '<-', [...from].join(','));
console.log('registered:', Object.entries(ids).map(([k, v]) => k + '=' + v.size).join(' '));
console.log('checked', rels.length, 'rel objects; broken refs:', bad);
/* A broken relation is a build failure, not a console note. The app prunes
   unresolvable references at boot, so a broken id is a link that silently
   does not exist in the shipped product. */
if (bad) { console.log('RELATIONSHIP CHECK: FAIL'); process.exit(1); }
console.log('RELATIONSHIP CHECK: PASS');
