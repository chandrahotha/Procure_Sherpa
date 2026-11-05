/* ==========================================================
   Break UI Test - Adversarial content audit for Procure Sherpa
   Injects worst-case data and checks for visual/layout breaks
   ========================================================== */

import { JSDOM } from 'jsdom';
import fs from 'fs';

const html = fs.readFileSync('ProcureSherpa-v2.0.html', 'utf8');

// Worst-case content fixtures
const WORST_CASE = {
  // Long names that wrap, emoji, RTL, diacritics
  kb: [
    { id: 'wc-long-title', title: 'Enterprise Procurement Strategy Framework for Cross-Functional Digital Transformation Initiatives Across Global Supply Chains', cat: 'Strategy', def: 'A comprehensive framework for aligning procurement operations with enterprise-wide digital transformation goals across multi-tier supplier networks.', full: 'This concept covers the end-to-end methodology for establishing governance structures that enable rapid decision-making while maintaining compliance with SOX 404 segregation-of-duties requirements.', why: ['Regulatory pressure', 'Shareholder demand for ESG reporting', 'Competitive necessity'], when: ['Annual strategy review', 'Post-merger integration', 'New market entry'], how: ['Stakeholder mapping', 'Capability assessment', 'Roadmap development'], ex: 'A Fortune 500 manufacturer reduced cycle time by 34% using this framework.', risks: ['Change fatigue', 'Data quality gaps'], mistakes: ['Skipping baseline measurement', 'Underestimating change management'], rel: {} },
    { id: 'wc-rtl', title: 'إدارة المشتريات الاستراتيجية للمؤسسات متعددة الجنسيات', cat: 'Strategy', def: 'إطار عمل شامل لتوافق عمليات المشتريات مع أهداف التحول الرقمي على مستوى المؤسسة عبر شبكات الموردين متعددة المستويات.', full: '', why: [], when: [], how: [], ex: '', risks: [], mistakes: [], rel: {} },
    { id: 'wc-emoji', title: '📊 Supplier Performance Dashboard 🎯🔥', cat: 'Analytics', def: 'Real-time dashboard with emoji indicators for quick visual scanning of supplier health metrics.', full: '', why: [], when: [], how: [], ex: '', risks: [], mistakes: [], rel: {} },
    { id: 'wc-diacritics', title: 'Příběh úspěchu: Zásobování přes hranice 🇨🇿🇸🇰🇭🇺', cat: 'Cross-border', def: 'Cross-border procurement success story with Czech, Slovak, Hungarian diacritics and flags.', full: '', why: [], when: [], how: [], ex: '', risks: [], mistakes: [], rel: {} },
    { id: 'wc-one-char', title: 'A', cat: 'Minimal', def: 'Single character title', full: '', why: [], when: [], how: [], ex: '', risks: [], mistakes: [], rel: {} },
    { id: 'wc-long-email', title: 'Contact: bartholomew.fitzgerald@northwind-industries-holdings.example.com', cat: 'Contact', def: 'Very long email address in title', full: '', why: [], when: [], how: [], ex: '', risks: [], mistakes: [], rel: {} },
    { id: 'wc-unicode', title: '日本語の調達戦略 🇯🇵 中国采购 🇨🇳 한국의 조달 🇰🇷', cat: 'International', def: 'Mixed Japanese, Chinese, Korean with flags', full: '', why: [], when: [], how: [], ex: '', risks: [], mistakes: [], rel: {} },
  ],

  sop: [
    { id: 'wc-long-sop', title: 'Enterprise-Wide Procurement-to-Pay Compliance Validation and Continuous Monitoring Standard Operating Procedure', cat: 'Compliance', desc: 'Validates end-to-end P2P process compliance across all business units with automated controls and exception escalation.', purpose: 'Ensure 100% compliance with SOX 404 segregation-of-duties requirements across the entire procurement-to-pay lifecycle.', scope: 'All business units, all spend categories, all geographies where the organization operates.', outScope: 'Non-procurement payments, expense reimbursements below policy threshold.', trigger: 'Quarterly compliance review cycle or regulatory change notification.', flow: ['Initiate', 'Validate', 'Escalate', 'Remediate', 'Report'], steps: [
      { s: 'Initiate Compliance Review', d: 'Triggered by quarterly calendar or regulatory notification. Coordinator assembles cross-functional review team including Internal Audit, IT Security, and Business Unit Controllers.' },
      { s: 'Extract Transaction Data', d: 'Pull all P2P transactions from ERP for review period. Apply data quality filters: complete records, valid approval chains, matched three-way documents.' },
      { s: 'Run Automated Segregation Checks', d: 'Execute predefined SoD rule set against transaction dataset. Flag any user who both created and approved a PO, or who processed payment for a vendor they created.' },
      { s: 'Classify Exceptions', d: 'Each SoD violation is classified by severity: Critical (financial impact >$100K), High (financial impact $10K-$100K), Medium (policy deviation without financial impact), Low (documentation gap).' },
      { s: 'Escalate Critical Findings', d: 'Critical and High severity findings routed to CFO and Internal Audit Director within 24 hours. Business Unit VP notified for context.' },
      { s: 'Remediation Planning', d: 'Root cause analysis for each finding. Remediation plan with owner, due date, and compensating control documented in tracking system.' },
      { s: 'Validate Remediation', d: 'Follow-up testing to confirm remediation effectiveness. Re-test the specific SoD rule that was violated.' },
      { s: 'Report to Audit Committee', d: 'Quarterly summary report with trend analysis, open findings aging, and remediation status.' }
    ], rel: {} },
    { id: 'wc-one-step', title: 'Single Step SOP', cat: 'Minimal', desc: 'SOP with only one step', purpose: '', scope: '', outScope: '', trigger: '', flow: ['Single'], steps: [{ s: 'Do the thing', d: 'Just do it' }], rel: {} },
  ],

  cl: [
    { id: 'wc-long-cl', title: 'Comprehensive Supplier Onboarding Checklist for Regulated Industries with Multi-Jurisdictional Compliance Requirements', cat: 'Onboarding', desc: 'End-to-end supplier onboarding validation across all regulatory domains including anti-corruption, export controls, ESG, and data privacy.', sections: [
      { g: 'Pre-Qualification', items: ['Corporate structure verified', 'Ultimate beneficial owners identified', 'Financial stability assessed', 'Insurance coverage verified', 'Certifications validated'] },
      { g: 'Compliance Screening', items: ['Sanctions list screening (OFAC, EU, UN, UK)', 'Anti-bribery/corruption questionnaire completed', 'Export control classification confirmed', 'Data privacy addendum executed', 'ESG self-assessment submitted'] },
      { g: 'Contract Execution', items: ['Master agreement reviewed by Legal', 'Pricing schedules attached', 'SLA metrics defined', 'Termination clauses reviewed', 'Audit rights confirmed'] },
      { g: 'System Setup', items: ['Vendor master record created in ERP', 'Payment terms configured', 'Tax codes assigned', 'Approval workflow configured', 'Communication channels established'] },
      { g: 'Go-Live Validation', items: ['Test PO issued and acknowledged', 'First invoice processed correctly', 'Payment terms honored', 'Communication protocol tested', 'Escalation contacts verified'] }
    ], rel: {} },
    { id: 'wc-empty-cl', title: 'Empty Checklist', cat: 'Minimal', desc: 'Checklist with no sections', sections: [], rel: {} },
    { id: 'wc-many-items', title: 'Checklist with 50 Items in One Section', cat: 'Stress', desc: 'Single section with many items', sections: [{ g: 'Massive Section', items: Array.from({length: 50}, (_, i) => `Item ${i + 1}: Very long item description that will definitely wrap to multiple lines and test the layout of the checklist rendering engine with content that extends far beyond what any reasonable person would expect to see in a single checklist item description`) }], rel: {} },
  ],

  tpl: [
    { id: 'wc-long-tpl', title: 'Enterprise Procurement Contract Template with Multi-Jurisdictional Clauses and Extensive Schedules', cat: 'Contracts', purpose: 'Master agreement for cross-border procurement with full regulatory compliance schedules.', sections: [
      { title: 'Parties and Definitions', fields: ['Supplier legal name', 'Supplier registered address', 'Supplier registration number', 'Buyer legal name', 'Buyer registered address', 'Governing law', 'Jurisdiction', 'Language of contract'] },
      { title: 'Commercial Terms', fields: ['Currency', 'Payment terms', 'Incoterms 2020', 'Price adjustment mechanism', 'Volume discounts', 'Rebate structure', 'Indexation clause', 'Force majeure'] },
      { title: 'Compliance Schedules', fields: ['Anti-bribery schedule', 'Export control schedule', 'Data protection schedule', 'ESG schedule', 'Modern slavery schedule', 'Sanctions compliance schedule'] },
      { title: 'Operational Schedules', fields: ['Service level agreement', 'Key performance indicators', 'Reporting requirements', 'Audit rights', 'Transition assistance', 'Exit management'] }
    ], rel: {} },
    { id: 'wc-empty-tpl', title: 'Empty Template', cat: 'Minimal', purpose: 'Template with no sections', sections: [], rel: {} },
  ],

  dec: [
    { id: 'wc-long-dec', title: 'Strategic Supplier Consolidation Decision: RFP vs Framework Agreement vs Spot Buy for €50M+ Annual Spend Across 12 Categories', cat: 'Strategy', intro: 'Consolidating fragmented supplier base for enterprise-wide indirect spend categories.', question: 'Should we run a single multi-category RFP, establish a framework agreement with call-offs, or continue spot buying?', explain: 'Current spend is fragmented across 200+ suppliers with no volume leverage. Three consolidation paths exist.', factors: [
      { q: 'Volume concentration achievable', w: { opt1: 30, opt2: 20, opt3: 10 } },
      { q: 'Supplier transition risk', w: { opt1: 15, opt2: 25, opt3: 5 } },
      { q: 'Internal change management effort', w: { opt1: 20, opt2: 10, opt3: 30 } },
      { q: 'Regulatory approval timeline', w: { opt1: 25, opt2: 15, opt3: 5 } },
      { q: 'Innovation pipeline access', w: { opt1: 10, opt2: 30, opt3: 20 } }
    ], options: [
      { k: 'opt1', label: 'Single Multi-Category RFP', desc: 'One competitive process covering all 12 categories with lotting structure.' },
      { k: 'opt2', label: 'Framework Agreement with Call-Offs', desc: 'Pre-qualify panel, then run mini-competitions per call-off.' },
      { k: 'opt3', label: 'Continue Spot Buying', desc: 'Maintain status quo with targeted renegotiations.' }
    ], rel: {} },
    { id: 'wc-simple-dec', title: 'Simple Decision', cat: 'Minimal', intro: '', question: 'Yes or no?', explain: '', factors: [{ q: 'Only factor', w: { yes: 50, no: 50 } }], options: [{ k: 'yes', label: 'Yes', desc: '' }, { k: 'no', label: 'No', desc: '' }], rel: {} },
  ],

  kpi: [
    { id: 'wc-long-kpi', title: 'Enterprise Spend Under Management Percentage Across All Business Units Including Joint Ventures and Affiliates', cat: 'Spend Management', def: 'Percentage of total addressable spend that flows through approved procurement processes and contracts.', formula: 'SUM(Contracted Spend + PO-Backed Spend) / Total Addressable Spend * 100', formulaNote: 'Excludes M&A integration spend for 18 months post-close.', inputs: ['Total addressable spend', 'Contracted spend', 'PO-backed spend', 'M&A carve-outs'], example: 'Enterprise with $2.3B addressable spend, $1.84B under management = 80% SUM', interp: ['>90% = World class', '80-90% = Strong', '70-80% = Developing', '<70% = Critical gap'], limits: ['Self-reported spend data', 'JV data latency'], mistakes: ['Counting non-contracted spend', 'Double-counting JV spend'], practice: ['Monthly cadence', 'BU-level drill-down', 'Trend over 12 months'], target: '90% by FY26', rel: {} },
    { id: 'wc-simple-kpi', title: 'Simple KPI', cat: 'Minimal', def: 'Simple definition', formula: 'A / B * 100', formulaNote: '', inputs: ['A', 'B'], example: '', interp: [], limits: [], mistakes: [], practice: [], target: '', rel: {} },
  ],

  gloss: [
    { id: 'wc-long-gloss', term: 'Enterprise-Wide Strategic Sourcing Governance Framework', full: 'Governance framework for strategic sourcing across enterprise', def: 'A structured approach to governing strategic sourcing activities across all business units and geographies, ensuring alignment with enterprise objectives, regulatory requirements, and stakeholder expectations.', why: ['Regulatory compliance', 'Stakeholder alignment', 'Risk mitigation'], rel: {} },
    { id: 'wc-unicode-gloss', term: '調達ガバナンス 🇯🇵 采购治理 🇨🇳 조달 거버넌스 🇰🇷', full: '', def: 'Multi-language glossary term with Japanese, Chinese, Korean and flags', why: [], rel: {} },
  ],

  scen: [
    { id: 'wc-long-scen', title: 'Enterprise Supplier Consolidation Across 12 Categories With €50M Annual Spend and Regulatory Constraints', cat: 'Sourcing', problem: 'Fragmented supplier base across 12 indirect categories with 200+ suppliers, no volume leverage, and compliance gaps in anti-bribery and export controls.', summary: 'Consolidate to panel of 15 strategic suppliers via multi-category RFP with lotting structure.', steps: [
      { label: 'Baseline Assessment', note: 'Map current suppliers, spend, contracts, and compliance gaps across all 12 categories.', type: 'analysis' },
      { label: 'Category Strategy', note: 'Define lotting structure, evaluation criteria, and weightings per category.', type: 'strategy' },
      { label: 'Supplier Engagement', note: 'Run market engagement, issue RFI, shortlist to 30 suppliers.', type: 'engagement' },
      { label: 'RFP Execution', note: 'Issue multi-category RFP with 12 lots, 6-week response window.', type: 'execution' },
      { label: 'Evaluation & Award', note: 'Score bids, run moderation, negotiate with preferred suppliers, award contracts.', type: 'decision' },
      { label: 'Transition', note: '12-month transition plan with milestone gates, data migration, and stakeholder communication.', type: 'transition' }
    ], rel: {} },
    { id: 'wc-simple-scen', title: 'Simple Scenario', cat: 'Minimal', problem: 'Simple problem', summary: 'Simple summary', steps: [{ label: 'Step 1', note: 'Do it', type: 'action' }], rel: {} },
  ],

  calc: [
    { id: 'wc-many-fields', title: 'Calculator with 20 Input Fields', cat: 'Stress', purpose: 'Calculator with maximum fields to test form layout', desc: 'Tests form layout with many fields', disclaimerKind: 'finance', assumptions: ['All fields required'], formula: ['Complex multi-step calculation'], groups: [
      { label: 'Section 1', fields: ['field1', 'field2', 'field3', 'field4', 'field5'] },
      { label: 'Section 2', fields: ['field6', 'field7', 'field8', 'field9', 'field10'] },
      { label: 'Section 3', fields: ['field11', 'field12', 'field13', 'field14', 'field15'] },
      { label: 'Section 4', fields: ['field16', 'field17', 'field18', 'field19', 'field20'] }
    ], fields: [
      { id: 'field1', label: 'Field 1 with a very long label that will definitely wrap and test the layout', type: 'curr', required: true, example: '10000' },
      { id: 'field2', label: 'Field 2 with a very long label that will definitely wrap and test the layout', type: 'curr', required: true, example: '10000' },
      { id: 'field3', label: 'Field 3 with a very long label that will definitely wrap and test the layout', type: 'curr', required: true, example: '10000' },
      { id: 'field4', label: 'Field 4 with a very long label that will definitely wrap and test the layout', type: 'curr', required: true, example: '10000' },
      { id: 'field5', label: 'Field 5 with a very long label that will definitely wrap and test the layout', type: 'curr', required: true, example: '10000' },
      { id: 'field6', label: 'Field 6 with a very long label that will definitely wrap and test the layout', type: 'curr', required: true, example: '10000' },
      { id: 'field7', label: 'Field 7 with a very long label that will definitely wrap and test the layout', type: 'curr', required: true, example: '10000' },
      { id: 'field8', label: 'Field 8 with a very long label that will definitely wrap and test the layout', type: 'curr', required: true, example: '10000' },
      { id: 'field9', label: 'Field 9 with a very long label that will definitely wrap and test the layout', type: 'curr', required: true, example: '10000' },
      { id: 'field10', label: 'Field 10 with a very long label that will definitely wrap and test the layout', type: 'curr', required: true, example: '10000' },
      { id: 'field11', label: 'Field 11 with a very long label that will definitely wrap and test the layout', type: 'curr', required: true, example: '10000' },
      { id: 'field12', label: 'Field 12 with a very long label that will definitely wrap and test the layout', type: 'curr', required: true, example: '10000' },
      { id: 'field13', label: 'Field 13 with a very long label that will definitely wrap and test the layout', type: 'curr', required: true, example: '10000' },
      { id: 'field14', label: 'Field 14 with a very long label that will definitely wrap and test the layout', type: 'curr', required: true, example: '10000' },
      { id: 'field15', label: 'Field 15 with a very long label that will definitely wrap and test the layout', type: 'curr', required: true, example: '10000' },
      { id: 'field16', label: 'Field 16 with a very long label that will definitely wrap and test the layout', type: 'curr', required: true, example: '10000' },
      { id: 'field17', label: 'Field 17 with a very long label that will definitely wrap and test the layout', type: 'curr', required: true, example: '10000' },
      { id: 'field18', label: 'Field 18 with a very long label that will definitely wrap and test the layout', type: 'curr', required: true, example: '10000' },
      { id: 'field19', label: 'Field 19 with a very long label that will definitely wrap and test the layout', type: 'curr', required: true, example: '10000' },
      { id: 'field20', label: 'Field 20 with a very long label that will definitely wrap and test the layout', type: 'curr', required: true, example: '10000' }
    ], example: {}, handoffTo: [], rel: {} },
  ],

  help: [
    { id: 'wc-long-help', title: 'How to Configure Enterprise-Wide Multi-Jurisdictional Procurement Compliance with Automated Controls and Exception Escalation', sections: [
      { h: 'Overview', p: ['This guide covers the complete setup process for enterprise-wide procurement compliance across multiple jurisdictions with automated controls and exception escalation workflows.'] },
      { h: 'Prerequisites', p: ['Admin access to ERP', 'Internal Audit sign-off', 'Legal review of jurisdictional requirements', 'IT Security approval for automated controls'] },
      { h: 'Configuration Steps', p: ['Step 1: Define jurisdictional scope', 'Step 2: Configure regulatory rule sets', 'Step 3: Set up exception escalation matrix', 'Step 4: Define approval workflows per jurisdiction', 'Step 5: Configure automated monitoring rules', 'Step 6: Set up exception escalation workflows', 'Step 7: Test with sample transactions', 'Step 8: Train business unit controllers', 'Step 9: Go-live with monitoring period'] },
      { h: 'Troubleshooting', p: ['Common issue: Rule conflicts between jurisdictions', 'Resolution: Priority matrix with Legal sign-off', 'Common issue: False positive exceptions', 'Resolution: Tuning rule thresholds with Internal Audit'] }
    ], rel: {} },
  ],

  academy: [
    { id: 'wc-long-academy', module: 'Advanced Strategic Sourcing', title: 'Enterprise-Wide Strategic Sourcing Governance Framework for Cross-Functional Digital Transformation Initiatives Across Global Supply Chains', tier: 'executive', kicker: 'Executive Leadership', tagline: 'Governance framework for strategic sourcing across enterprise', duration: '45 mins', desc: 'A comprehensive framework for aligning procurement operations with enterprise-wide digital transformation goals across multi-tier supplier networks.', sopSteps: Array.from({length: 10}, (_, i) => `Step ${i+1}: Very long step description that tests the rendering of many procedure steps in the Academy function detail view with content that extends far beyond what any reasonable person would expect to see in a single procedure step description`).join(';'), quizzes: [
      { q: 'What is the primary purpose of the governance framework?', type: 'mcq', options: [{ text: 'Align procurement with digital transformation', isCorrect: true }, { text: 'Reduce costs', isCorrect: false }, { text: 'Increase speed', isCorrect: false }] }
    ], rel: {} },
  ],
};

// Helper to inject worst-case data
function injectWorstCase(PS) {
  console.log('Injecting worst-case content...');
  
  // Clear existing data
  PS.data.kb = [];
  PS.data.sop = [];
  PS.data.cl = [];
  PS.data.tpl = [];
  PS.data.dec = [];
  PS.data.kpi = [];
  PS.data.gloss = [];
  PS.data.scen = [];
  PS.data.calc = [];
  PS.data.help = [];
  PS.ACADEMY_FUNCTIONS = [];
  
  // Inject worst-case
  Object.entries(WORST_CASE).forEach(([type, items]) => {
    items.forEach(item => {
      if (type === 'academy') {
        PS.ACADEMY_FUNCTIONS.push(item);
      } else {
        PS.data[type].push(item);
      }
    });
  });
  
  // Re-normalize
  PS.normalizeContent();
  console.log('Worst-case content injected');
}

export { WORST_CASE, injectWorstCase };