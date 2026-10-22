/* ============ SOP: Supplier Risk Assessment & Monitoring ============
   Covers financial health screening (Altman Z), dual-sourcing, risk
   scoring, and monitoring cadence. Links to calc-altman-zscore,
   calc-supplier-concentration, calc-supplier-scorecard,
   cl-supplier-financial-health, kpi-supplier-risk-score. */

PS.SSOP({
  i: "sop-supplier-risk",
  t: "Supplier Risk Assessment & Monitoring SOP",
  c: "Supplier Risk",
  v: "1.0",
  ow: "Supplier Risk Manager",
  rv: "Annual",
  p: "Identify, assess, and monitor supplier-related risks that could disrupt supply continuity, impact product quality, or create financial exposure. Ensure risk mitigation plans are in place for all critical and strategic suppliers.",
  s: "All approved vendors in the Approved Vendor List (AVL), with heightened scrutiny for single-source, critical, and high-spend suppliers.",
  os: "Low-value catalog purchases from pre-qualified suppliers with no supply risk exposure.",
  g: "Scheduled quarterly risk reviews, or triggered by supplier financial distress signals, geopolitical events, quality incidents, or contract renewals.",
  ro: "Supplier Risk Manager, Category Manager, Financial Analyst, Quality Assurance Lead, Supply Chain Director",
  ra: "Supplier Risk Manager: Owns risk framework, maintains risk register, and chairs quarterly reviews;Category Manager: Provides category context, supplier relationship insights, and mitigation execution support;Financial Analyst: Screens financial health using Altman Z-score and ratio analysis;Quality Assurance Lead: Assesses operational and quality risk indicators;Supply Chain Director: Approves risk mitigation investments and dual-sourcing decisions",
  fq: "Quarterly risk reviews for all critical suppliers; monthly monitoring for high-risk flagged vendors.",
  du: "Four to six hours per quarterly review cycle per supplier portfolio.",
  fl: "Risk Identification|Financial Health Screening|Risk Scoring|Mitigation Planning|Monitoring & Escalation|Review & Reporting",
  st: "Identify and Register Supplier Risks|Compile a comprehensive risk register covering financial, operational, geopolitical, compliance, and concentration risks. Map single points of failure across the supply base. Use calc-supplier-concentration to quantify spend concentration.|role=Supplier Risk Manager,out=Supplier Risk Register,ctrl=Risk register reviewed and approved by Supply Chain Director;Screen Financial Health Using Altman Z-Score|Obtain three years of audited financial statements. Calculate Altman Z-score using calc-altman-zscore. Classify suppliers: Z > 2.99 safe, 1.81 < Z < 2.99 grey zone, Z < 1.81 distress. Cross-reference with credit bureau ratings.|role=Financial Analyst,out=Financial Health Screening Report,ctrl=Altman Z-score calculated with verified financial data;Assess Supplier Concentration Risk|Calculate spend concentration using Herfindahl-Hirschman Index (HHI) via calc-supplier-concentration. Flag categories where top supplier exceeds 40% of spend or HHI exceeds 2500. Document dependency implications.|role=Supplier Risk Manager,out=Concentration Risk Assessment,ctrl=HHI thresholds applied consistently across categories;Score Overall Supplier Risk|Develop composite risk score using calc-supplier-scorecard incorporating financial health (30%), operational performance (25%), concentration (20%), compliance (15%), and geopolitical exposure (10%). Assign risk tiers: Low, Medium, High, Critical.|role=Supplier Risk Manager,out=Supplier Risk Scorecard,ctrl=Scorecard methodology approved by Supply Chain Director;Develop Risk Mitigation Plans|For each High or Critical risk supplier, define mitigation actions: dual-sourcing, buffer inventory, escrow agreements, or contractual protections. Assign owners and deadlines. Evaluate dual-sourcing feasibility using cl-supplier-financial-health checklist.|role=Category Manager,out=Risk Mitigation Action Plan,ctrl=Mitigation plans approved by Supply Chain Director;Establish Monitoring Cadence and Triggers|Define monitoring frequency: Critical suppliers weekly, High monthly, Medium quarterly, Low semi-annually. Set automated triggers for financial downgrades, sanctions list changes, and delivery performance deterioration.|role=Supplier Risk Manager,out=Monitoring Schedule and Trigger Protocol,ctrl=Trigger thresholds documented and system-configured;Conduct Quarterly Risk Review Meetings|Review risk register status, mitigation progress, and trigger alerts. Update risk scores based on latest data. Escalate unresolved Critical risks to executive leadership. Document decisions and action items.|role=Supplier Risk Manager,out=Quarterly Risk Review Minutes,ctrl=Review attendance by Category Manager and Financial Analyst;Report Risk Posture to Leadership|Compile enterprise risk dashboard showing risk distribution, trend analysis, mitigation coverage, and residual risk exposure. Track kpi-supplier-risk-score as composite metric. Present to executive committee.|role=Supplier Risk Manager,out=Executive Risk Posture Report,ctrl=Report reviewed by Supply Chain Director before distribution",
  ip: "Supplier financial statements (3 years);Spend data by supplier and category;Supplier performance scorecards;Sanctions and compliance screening results;Geopolitical and market intelligence;Contract terms and SLAs",
  ot: "Supplier risk register;Financial health screening reports (Altman Z-score);Concentration risk assessments (HHI);Composite supplier risk scorecards;Risk mitigation action plans;Monitoring schedules and trigger configurations;Quarterly risk review minutes;Executive risk posture report",
  dc: "Risk Tier Classification|Assign Low, Medium, High, or Critical tier based on composite score thresholds;Mitigation Investment Approval|Approve dual-sourcing or buffer inventory investments when risk reduction benefit exceeds implementation cost;Supplier Exit Decision|Initiate supplier exit when Critical risk cannot be mitigated within defined timeline",
  ct: "Mandatory Altman Z-score screening for all suppliers exceeding $500K annual spend;Quarterly risk reviews documented with attendance and decision records;Automated monitoring triggers tested semi-annually;Dual-sourcing decisions require Supply Chain Director approval;Risk register updated within five business days of material supplier events",
  kp: ["kpi-supplier-risk-score"],
  rc: "Supplier risk register;Altman Z-score calculation worksheets;Concentration analysis (HHI) reports;Composite risk scorecards;Risk mitigation action plans with owner assignments;Quarterly risk review meeting minutes;Executive risk posture reports;Monitoring trigger configuration records",
  rt: "Retain risk assessment records for the duration of supplier relationship plus five years.",
  rk: "Supplier insolvency causing production line shutdown;Single-source dependency with no viable alternative;Geopolitical disruption affecting critical supply routes;Financial screening gaps missing early distress signals;Concentration risk underestimated due to incomplete spend data",
  exc: "New supplier onboarding may use expedited risk assessment with retrospective full review within 60 days;Force majeure events trigger emergency response protocols outside standard monitoring cadence",
  mt: ["Failing to update risk scores within five business days of material supplier events", "Approving dual-sourcing investments without documented cost-benefit analysis", "Allowing Critical risk suppliers to remain active without executive-approved exit timeline"],
  rf: ["Supplier Risk Management Framework", "Financial Distress Early Warning Guidelines", "Dual-Sourcing Policy", "Business Continuity Planning Standards"],
  rh: ["1.0: Initial release with Altman Z-score screening, concentration analysis, composite risk scoring, and monitoring protocols"],
  cl: "cl-supplier-financial-health",
  rel: {
    checklists: ["cl-supplier-financial-health", "cl-supplier-risk-review"],
    sops: ["sop-supplier-evaluation", "sop-procurement-lifecycle"],
    calcs: ["calc-altman-zscore", "calc-supplier-concentration", "calc-supplier-scorecard"],
    kpis: ["kpi-supplier-risk-score", "kpi-supplier-concentration"],
    decisions: ["supplier-financial-risk", "supplier-concentration", "dual-source"],
    scenarios: ["scn-supplier-risk"]
  }
});
