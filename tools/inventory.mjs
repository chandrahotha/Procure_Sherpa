/* Content inventory: what is actually registered, item by item.
   Reads the same two registration paths as tools/check_rels.mjs (see
   registryFromSource in tools/lib.mjs), so the two tools cannot print
   different numbers for the same build. Documents quote these counts,
   which is why the old file-by-filename guess was a problem: it printed
   `CALC (0)` for a registry holding 19 calculators. */
import { registryFromSource, REGISTRY_KEYS } from './lib.mjs';

const { ids } = registryFromSource();
const ORDER = ['kb', 'sop', 'cl', 'tpl', 'dec', 'kpi', 'scen', 'gloss', 'calc'];
for (const key of ORDER) {
  console.log(key.toUpperCase() + ' (' + ids[key].size + '): ' + [...ids[key]].join(' '));
}
console.log('total registered items: ' + ORDER.reduce((a, k) => a + ids[k].size, 0));
/* The list above is the only order the tool prints in; REGISTRY_KEYS is
   the shared set, so a new registry has to be named here on purpose. */
const unmapped = REGISTRY_KEYS.filter((k) => !ORDER.includes(k));
if (unmapped.length) console.log('NOTE: registries not printed: ' + unmapped.join(', '));
