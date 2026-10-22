/* Fix registry references: PS_CALC -> PS.CALC, PS_KB -> PS.KB, etc.
   In the old concatenation build, these were global vars. In ES modules,
   they must be properties of PS. */
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src');

const registryMap = {
  'PS_CALC': 'PS.CALC',
  'PS_KB': 'PS.KB',
  'PS_SOPS': 'PS.SOPS',
  'PS_CL': 'PS.CL',
  'PS_TPL': 'PS.TPL',
  'PS_DEC': 'PS.DEC',
  'PS_KPI': 'PS.KPI',
  'PS_GLOSS': 'PS.GLOSS',
  'PS_SCEN': 'PS.SCEN',
  'PS_HELP': 'PS.HELP'
};

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.ts')) fixFile(full);
  }
}

function fixFile(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Fix the var declarations in 09a_data_init.ts
  if (filePath.endsWith('09a_data_init.ts')) {
    for (const [oldName, newName] of Object.entries(registryMap)) {
      const varPattern = new RegExp(`var ${oldName} = \\[\\];`, 'g');
      if (varPattern.test(code)) {
        code = code.replace(varPattern, `${newName} = [];`);
        changed = true;
      }
    }
  }

  // Fix references in all other files
  for (const [oldName, newName] of Object.entries(registryMap)) {
    // Replace PS_CALC.push( with PS.CALC.push( etc.
    const refPattern = new RegExp(`\\b${oldName}\\.`, 'g');
    if (refPattern.test(code)) {
      code = code.replace(refPattern, `${newName}.`);
      changed = true;
    }
    // Replace bare PS_CALC (not followed by . or alphanumeric)
    const barePattern = new RegExp(`\\b${oldName}\\b(?!\\.)`, 'g');
    if (barePattern.test(code)) {
      code = code.replace(barePattern, newName);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, code);
    console.log('fixed ' + path.relative(SRC, filePath));
  }
}

walk(SRC);
console.log('Done fixing registry references');
