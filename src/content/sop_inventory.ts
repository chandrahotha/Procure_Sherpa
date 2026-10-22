/* ============ SOP: Inventory Management & Reorder Point ============
   Covers reorder point calculation, safety stock, EOQ, cycle counting,
   and ABC analysis. Links to calc-eoq-safety-stock, calc-moq,
   cl-inventory-review, kpi-inventory-turns, kpi-stockout-rate. */

PS.SSOP({
  i: "sop-inventory-management",
  t: "Inventory Management & Reorder Point SOP",
  c: "Inventory",
  v: "1.0",
  ow: "Inventory Manager",
  rv: "Annual",
  p: "Maintain optimal inventory levels that balance carrying costs against stockout risk. Ensure reorder points, safety stock, and order quantities are calculated using validated demand data and reviewed on a defined cadence.",
  s: "All stock-keeping units (SKUs) in the warehouse and replenishment system, including raw materials, work-in-progress, finished goods, and maintenance spares.",
  os: "Non-inventory assets, office supplies, and consignment stock owned by suppliers.",
  g: "Scheduled monthly review cycle, or triggered when stockout events, demand spikes, or supplier lead time changes occur.",
  ro: "Inventory Manager, Warehouse Supervisor, Procurement Planner, Demand Planner, Finance Analyst",
  ra: "Inventory Manager: Owns inventory policy, approves reorder parameters, and reviews KPI trends;Warehouse Supervisor: Executes cycle counts, reports discrepancies, and manages stock placement;Procurement Planner: Places replenishment orders and monitors supplier lead time performance;Demand Planner: Provides demand forecasts and consumption trend analysis;Finance Analyst: Validates carrying cost assumptions and EOQ model inputs",
  fq: "Monthly review of all active SKUs; weekly review of A-class items.",
  du: "Two to four hours per monthly review cycle.",
  fl: "Demand Analysis|Reorder Point Calculation|Safety Stock Setting|EOQ Determination|Cycle Counting|ABC Classification|Exception Review",
  st: "Analyze Historical Demand and Lead Time Data|Pull 12 months of consumption data and supplier lead time records. Calculate average daily demand, demand variability (standard deviation), and average lead time. Validate data integrity before proceeding.|role=Demand Planner,out=Validated Demand and Lead Time Dataset,ctrl=Data completeness check on 12-month history;Calculate Reorder Point for Each SKU|Apply the formula: Reorder Point = (Average Daily Demand x Average Lead Time) in days + Safety Stock. Use the calc-eoq-safety-stock calculator for automated computation. Document assumptions.|role=Inventory Manager,out=Reorder Point Calculation Sheet,ctrl=Formula verified against historical stockout events;Determine Safety Stock Levels|Set safety stock based on desired service level (Z-score), demand variability, and lead time variability. Use calc-eoq-safety-stock for statistical safety stock. Classify service levels: A-items 98%, B-items 95%, C-items 90%.|role=Inventory Manager,out=Safety Stock Policy by SKU Class,ctrl=Service level targets approved by Operations Director;Compute Economic Order Quantity (EOQ)|Calculate EOQ using the formula: EOQ = sqrt((2 x Annual Demand x Order Cost) / Holding Cost per Unit). Validate order cost and holding cost inputs with Finance. Cross-reference with calc-moq to ensure supplier minimums are met.|role=Finance Analyst,out=EOQ Calculation Worksheet,ctrl=Finance sign-off on cost inputs;Establish Cycle Counting Schedule|Define counting frequency by ABC classification: A-items monthly, B-items quarterly, C-items semi-annually. Assign counting teams independent of warehouse operations. Use cl-inventory-review checklist for execution.|role=Warehouse Supervisor,out=Cycle Count Schedule,ctrl=Segregation of duties between counters and stock handlers;Perform ABC Analysis and Classification|Classify SKUs by annual consumption value: A-items (top 70-80% of value), B-items (next 15-20%), C-items (remaining 5-10%). Review classification quarterly. Adjust reorder parameters accordingly.|role=Inventory Manager,out=ABC Classification Report,ctrl=Quarterly reclassification with documented rationale;Execute Cycle Counts and Reconcile Variances|Count assigned SKUs, investigate variances exceeding 2% or $500, and adjust inventory records. Root-cause recurring variances. Report count accuracy metrics.|role=Warehouse Supervisor,out=Cycle Count Variance Report,ctrl=Variance investigation threshold enforced;Review Exceptions and Adjust Parameters|Analyze stockout events, excess inventory, and obsolete stock. Adjust reorder points, safety stock, and EOQ parameters based on findings. Escalate systemic issues to Procurement Planner.|role=Inventory Manager,out=Updated Inventory Parameters,ctrl=Parameter changes documented with effective dates;Monitor Inventory KPIs and Report|Track kpi-inventory-turns and kpi-stockout-rate monthly. Compare against targets: inventory turns improvement and stockout rate below 2%. Present trends to Operations leadership.|role=Inventory Manager,out=Monthly Inventory KPI Dashboard,ctrl=KPI targets reviewed and approved by Operations Director",
  ip: "12 months of historical consumption data;Supplier lead time records;Current inventory on-hand balances;Unit carrying cost and order cost data;Demand forecast projections",
  ot: "Reorder point calculations per SKU;Safety stock levels by classification;EOQ recommendations;Cycle count schedules and variance reports;ABC classification report;Updated inventory parameters;Monthly KPI dashboard",
  dc: "Reorder Point Acceptance|Accept calculated reorder point when validated against historical demand patterns and lead time data;Safety Stock Adjustment|Increase safety stock when stockout frequency exceeds target or demand variability rises;EOQ versus MOQ|When EOQ falls below supplier MOQ, evaluate total cost of ordering at MOQ versus splitting orders",
  ct: "Segregation of duties between inventory planning and warehouse execution;Monthly cycle counting mandatory for all A-class SKUs;All parameter changes documented with effective dates and approver signatures;Safety stock reviews triggered automatically by stockout events;ABC classification reviewed quarterly with Finance validation",
  kp: ["kpi-inventory-turns", "kpi-stockout-rate"],
  rc: "Reorder point calculation worksheets;Safety stock policy documentation;EOQ computation records;Cycle count schedules and variance investigation reports;ABC classification reports;Monthly KPI trend dashboards;Parameter change approval records",
  rt: "Retain inventory parameter records for three years; retain cycle count variance reports for five years.",
  rk: "Demand forecast inaccuracy leading to overstock or stockout;Supplier lead time variability eroding safety stock protection;Obsolete stock accumulation from poor demand planning;Inadequate cycle count coverage allowing record inaccuracies to compound",
  exc: "Emergency replenishment orders may bypass standard reorder point process with retrospective parameter review within five business days;New SKUs without historical demand data use analogous item demand profiles for initial parameter setting",
  mt: ["Adjusting reorder points or safety stock without documented demand or lead time analysis", "Allowing cycle count variances to remain unresolved beyond 30 days", "Failing to review ABC classification at least quarterly"],
  rf: ["Inventory Policy Manual", "Warehouse Management Procedures", "Demand Planning Guidelines", "Cost Accounting Standards"],
  rh: ["1.0: Initial release with reorder point, safety stock, EOQ, cycle counting, and ABC analysis procedures"],
  cl: "cl-inventory-review",
  rel: {
    checklists: ["cl-inventory-review"],
    sops: ["sop-procurement-lifecycle"],
    calcs: ["calc-eoq-safety-stock", "calc-moq"],
    kpis: ["kpi-inventory-turns", "kpi-stockout-rate"],
    concepts: ["c-inventory-management"],
    scenarios: ["scn-stockout-response"]
  }
});
