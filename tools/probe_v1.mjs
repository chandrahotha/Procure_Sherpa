import fs from 'node:fs';
import vm from 'node:vm';
const V1 = 'E:/Downloads/Procurement_AIO-main/Procurement_AIO-main';
const load = (file, names) => {
  const src = fs.readFileSync(V1 + '/' + file, 'utf8');
  return vm.runInNewContext('(function(){' + src + '\n;return {' + names.join(',') + '};})()', { console });
};
const cls = load('content/checklists.js', ['ChecklistDefinitions']).ChecklistDefinitions;
console.log('CHECKLISTS:'); cls.forEach((c) => console.log(' ', c.id, '|', c.title, '| items:', (c.items || []).length));
const tpls = load('content/templates.js', ['TemplateLibrary']).TemplateLibrary;
console.log('TEMPLATES:'); tpls.forEach((c) => console.log(' ', c.id, '|', c.title));
const decs = load('content/decisions.js', ['DecisionGuides']).DecisionGuides;
console.log('DECISIONS:'); decs.forEach((c) => console.log(' ', c.id, '|', c.title, '| q:', c.questions.length));
const sops = load('content/sops.js', ['SOPLibrary']).SOPLibrary;
console.log('SOPS:'); sops.forEach((c) => console.log(' ', c.id, '|', c.title));
const kpis = load('content/kpis.js', ['KPILibrary']).KPILibrary;
console.log('KPIS:'); kpis.forEach((c) => console.log(' ', c.id, '|', c.title));
const cpts = load('content/concepts.js', ['KnowledgeBase']).KnowledgeBase;
console.log('CONCEPTS:'); cpts.forEach((c) => console.log(' ', c.id, '|', c.title));
