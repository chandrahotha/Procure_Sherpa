/* ============ SOP: Payment Terms & Working Capital ============
   Covers payment terms negotiation, early payment discounts, DPO
   optimization, and cash conversion cycle. Links to
   calc-early-payment-roi, calc-payment-terms, cl-invoice-processing,
   kpi-dpo, kpi-working-capital. */

PS.SSOP({
  i: "sop-payment-terms",
  t: "Payment Terms & Working Capital SOP",
  c: "Finance",
  v: "1.0",
  ow: "Treasury Manager",
  rv: "Annual",
  p: "Optimize payment terms and working capital metrics to maximize cash flow while maintaining strong supplier relationships. Ensure payment terms are negotiated strategically, early payment discounts are evaluated rigorously, and DPO targets are aligned with corporate cash objectives.",
  s: "All supplier contracts, purchase orders, and invoice processing workflows where payment terms impact cash flow and working capital.",
  os: "Employee expense reimbursements, utility payments, tax payments, and other non-procurement disbursements.",
  g: "Contract negotiation cycles, quarterly working capital reviews, or when early payment discount opportunities arise.",
  ro: "Treasury Manager, Procurement Manager, Accounts Payable Lead, Finance Controller, Category Manager",
  ra: "Treasury Manager: Sets DPO targets, approves early payment discount decisions, and owns working capital reporting;Procurement Manager: Negotiates payment terms during sourcing events and contract renewals;Accounts Payable Lead: Executes payment runs, ensures invoice accuracy, and maintains payment calendars;Finance Controller: Validates working capital calculations and reconciles DPO metrics;Category Manager: Provides supplier relationship context and negotiates terms within sourcing events",
  fq: "Quarterly working capital reviews; monthly DPO monitoring; per-contract payment terms negotiation.",
  du: "Two to three hours per quarterly review; one to two hours per contract terms evaluation.",
  fl: "Terms Negotiation|Discount Evaluation|DPO Optimization|Invoice Processing|Working Capital Reporting|Exception Management",
  st: "Negotiate Payment Terms During Sourcing Events|Establish target payment terms by category: Net 60 for strategic suppliers, Net 45 for preferred, Net 30 for transactional. Use calc-payment-terms to model cash impact. Balance DPO objectives against supplier relationship considerations.|role=Procurement Manager,out=Negotiated Payment Terms Agreement,ctrl=Terms within Treasury-approved thresholds;Evaluate Early Payment Discount Opportunities|When suppliers offer early payment discounts (e.g., 2/10 Net 30), calculate the annualized return using calc-early-payment-roi. Compare against corporate cost of capital. Accept discount when annualized return exceeds cost of capital by minimum 5% margin.|role=Treasury Manager,out=Early Payment Discount Analysis,ctrl=Discount acceptance approved by Finance Controller;Optimize Days Payable Outstanding (DPO)|Calculate DPO using formula: DPO = (Average Accounts Payable / Cost of Goods Sold) x Number of Days. Set category-level DPO targets aligned with cash flow objectives. Use calc-payment-terms to simulate scenarios.|role=Treasury Manager,out=DPO Optimization Plan,ctrl=DPO targets approved by Finance Controller;Streamline Invoice Processing Workflows|Ensure invoices are received, matched, and approved efficiently to avoid early payment penalties or missed discount windows. Use cl-invoice-processing checklist. Monitor invoice cycle time and first-pass match rate.|role=Accounts Payable Lead,out=Invoice Processing Efficiency Report,ctrl=Invoice aging reviewed weekly;Monitor Cash Conversion Cycle (CCC)|Calculate CCC = DIO + DSO - DPO. Track trends monthly and investigate deterioration. Identify opportunities to reduce DIO through inventory optimization or DSO through receivables management.|role=Treasury Manager,out=Cash Conversion Cycle Dashboard,ctrl=CCC components reconciled with financial statements;Manage Payment Exceptions and Disputes|Establish clear escalation path for invoice disputes, payment discrepancies, and supplier payment inquiries. Resolve disputes within 10 business days. Document root causes and preventive actions.|role=Accounts Payable Lead,out=Payment Exception Resolution Log,ctrl=Dispute resolution within 10 business days;Report Working Capital Metrics to Leadership|Compile monthly working capital report including DPO, DIO, DSO, CCC, and early payment discount capture rate. Track kpi-dpo and kpi-working-capital. Present to CFO and executive team.|role=Treasury Manager,out=Monthly Working Capital Report,ctrl=Report reviewed by Finance Controller before distribution",
  ip: "Supplier contract terms and conditions;Historical invoice and payment data;Cost of capital benchmarks;Supplier discount offers;Accounts payable aging reports;Cash flow forecasts",
  ot: "Negotiated payment terms by supplier;Early payment discount analysis;DPO optimization plans;Invoice processing efficiency reports;Cash conversion cycle dashboards;Payment exception resolution logs;Monthly working capital reports",
  dc: "Payment Terms Acceptance|Accept terms when cash flow benefit exceeds supplier relationship cost or when required for competitive positioning;Early Payment Discount Decision|Accept discount when annualized return exceeds cost of capital by minimum 5% margin;DPO Target Setting|Set DPO targets that optimize cash flow without exceeding supplier tolerance thresholds or triggering supply disruption",
  ct: "Payment terms negotiated within Treasury-approved authority limits;Early payment discount decisions documented with ROI calculations;DPO monitored monthly with variance analysis;Invoice disputes resolved within 10 business days;Working capital metrics reconciled with general ledger quarterly",
  kp: ["kpi-dpo", "kpi-working-capital"],
  rc: "Negotiated payment terms documentation;Early payment discount ROI calculations;DPO optimization plans and targets;Invoice processing efficiency reports;Cash conversion cycle calculations;Payment exception resolution logs;Monthly working capital reports",
  rt: "Retain payment terms records for contract duration plus seven years; retain working capital reports for five years.",
  rk: "Excessively aggressive payment terms damaging supplier relationships;Missed early payment discount opportunities due to slow invoice processing;DPO inflation through unapproved payment term extensions;Cash flow forecasting errors from inaccurate payment timing assumptions",
  exc: "Strategic suppliers may receive preferential payment terms with Treasury Manager and CFO joint approval;Emergency payments for critical supply continuity may bypass standard approval workflows with retrospective documentation",
  mt: ["Accepting early payment discounts without documented ROI calculation", "Extending payment terms beyond negotiated agreements without supplier consent", "Allowing invoice disputes to remain unresolved beyond 10 business days"],
  rf: ["Treasury Management Policy", "Working Capital Optimization Guidelines", "Accounts Payable Procedures", "Supplier Payment Terms Framework"],
  rh: ["1.0: Initial release with payment terms negotiation, early payment discount evaluation, DPO optimization, and working capital reporting procedures"],
  cl: "cl-invoice-processing",
  rel: {
    checklists: ["cl-invoice-processing"],
    sops: ["sop-procurement-lifecycle", "sop-negotiation-preparation"],
    calcs: ["calc-early-payment-roi", "calc-payment-terms"],
    kpis: ["kpi-dpo", "kpi-working-capital"],
    concepts: ["c-working-capital"],
    scenarios: ["scn-payment-terms-negotiation"]
  }
});
