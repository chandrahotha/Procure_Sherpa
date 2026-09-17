/* Shared repo-path helpers for tools/*.mjs (avoids hardcoded absolute paths). */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
export const SRC = path.join(ROOT, 'src');
export const SRC_CONTENT = path.join(SRC, 'content');

/* All source fragments, as forward-slash paths relative to src/, sorted. */
export function listFiles(dir = SRC) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...listFiles(p));
    else if (!e.name.startsWith('.')) out.push(path.relative(SRC, p).split(path.sep).join('/'));
  }
  return out.sort();
}

export const baseName = (rel) => rel.slice(rel.lastIndexOf('/') + 1);
export const readSrc = (rel) => fs.readFileSync(path.join(SRC, rel), 'utf8');
