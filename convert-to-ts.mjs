/* Converts all JS source files to TypeScript ES modules.
   - Replaces `var PS = window.PS = window.PS || {}` with an import
   - Adds .ts extension
   - Fixes relative import paths
   Run: node convert-to-ts.mjs */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'src');

let converted = 0;
let skipped = 0;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name.endsWith('.js')) {
      convertFile(full);
    }
  }
}

function convertFile(filePath) {
  const rel = path.relative(SRC, filePath);
  const dir = path.dirname(rel);
  
  // Skip already-converted files
  if (rel === 'main.ts' || rel === 'core/ps.ts' || rel === 'core/types.ts' || 
      rel === 'core/storage.ts' || rel === 'core/ui.ts') {
    skipped++;
    return;
  }

  let code = fs.readFileSync(filePath, 'utf8');
  
  // Replace the PS initialization with an import
  const psInitPattern = /var\s+PS\s*=\s*window\.PS\s*=\s*window\.PS\s*\|\|\s*\{\};?/;
  if (psInitPattern.test(code)) {
    // Calculate relative path to core/ps.ts
    const depth = dir === '.' ? 0 : dir.split(path.sep).length;
    const importPath = depth === 0 ? './core/ps.js' : '../'.repeat(depth) + 'core/ps.js';
    
    code = code.replace(psInitPattern, `import { PS } from '${importPath}';`);
  }
  
  // Write as .ts
  const tsPath = filePath.replace(/\.js$/, '.ts');
  fs.writeFileSync(tsPath, code);
  fs.unlinkSync(filePath);
  converted++;
}

walk(SRC);
console.log(`Converted ${converted} files to TypeScript, skipped ${skipped}`);
