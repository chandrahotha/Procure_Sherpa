/* ==========================================================
   Workbench field specifications

   One place where the shape of each record is declared, so that the
   form, the table, the validation and the export all read from the
   same definition and cannot drift apart.
   ========================================================== */
PS.WB_FIELDS = {
  /* ---------- Supplier register ---------- */
  suppliers: [
    { k: 'name', label: 'Supplier name', type: 'text', req: true },
    { k: 'legal', label: 'Legal entity', type: 'text', hint: 'The registered company, if it differs from the trading name.' },
    { k: 'country', label: 'Country of supply', type: 'text' },
    { k: 'category', label: 'Category', type: 'text' },
    { k: 'spend', label: 'Annual spend', type: 'money', min: 0 },
    { k: 'score', label: 'Qualification score (0-100)', type: 'number', min: 0, max: 100 },
    { k: 'risk', label: 'Risk tier', type: 'select', opts: ['Low', 'Medium', 'High', 'Critical'] },
    { k: 'status', label: 'Status', type: 'select', opts: ['Prospect', 'Approved', 'Suspended', 'Exited'] },
    { k: 'contact', label: 'Primary contact', type: 'text' },
    { k: 'email', label: 'Contact email', type: 'text' },
    { k: 'notes', label: 'Notes', type: 'textarea' }
  ],

  /* ---------- Contract register ---------- */
  contracts: [
    { k: 'title', label: 'Contract', type: 'text', req: true },
    { k: 'supplier', label: 'Supplier', type: 'text', req: true },
    { k: 'category', label: 'Category', type: 'text' },
    { k: 'value', label: 'Total contract value', type: 'money', min: 0 },
    { k: 'start', label: 'Start date', type: 'date' },
    { k: 'end', label: 'Expiry date', type: 'date' },
    { k: 'notice', label: 'Notice deadline', type: 'date', hint: 'The date by which you must say nothing if you want to stop renewal.' },
    { k: 'owner', label: 'Contract owner', type: 'text' },
    { k: 'auto', label: 'Auto-renews', type: 'select', opts: ['No', 'Yes'] },
    { k: 'obligations', label: 'Key obligations', type: 'textarea', hint: 'One per line: what you owe them, and what they owe you.' },
    { k: 'notes', label: 'Notes', type: 'textarea' }
  ],

  /* ---------- Catalogue and price book ---------- */
  catalogue: [
    { k: 'item', label: 'Item', type: 'text', req: true },
    { k: 'category', label: 'Category', type: 'text' },
    { k: 'spec', label: 'Specification', type: 'text', hint: 'The specification the price is for. A price without a specification is not comparable.' },
    { k: 'uom', label: 'Unit of measure', type: 'text', hint: 'Each, pack, box, kg, litre, hour.' },
    { k: 'pack', label: 'Pack size', type: 'text', hint: 'How many units are in the pack you actually buy.' },
    { k: 'price', label: 'Unit price', type: 'money', min: 0 },
    { k: 'benchmark', label: 'Benchmark price', type: 'money', min: 0, hint: 'A market reference for the same specification, with its source and date.' },
    { k: 'supplier', label: 'Preferred supplier', type: 'text' },
    { k: 'contract', label: 'Contract reference', type: 'text' },
    { k: 'notes', label: 'Notes', type: 'textarea' }
  ],

  /* ---------- Budget and spend ---------- */
  budget: [
    { k: 'line', label: 'Budget line', type: 'text', req: true },
    { k: 'category', label: 'Category', type: 'text' },
    { k: 'owner', label: 'Budget holder', type: 'text' },
    { k: 'period', label: 'Period', type: 'text', hint: 'For example FY26, or Q1 2026.' },
    { k: 'budget', label: 'Budget', type: 'money', min: 0 },
    { k: 'committed', label: 'Committed', type: 'money', min: 0, hint: 'Signed but not yet spent.' },
    { k: 'actual', label: 'Actual', type: 'money', min: 0, hint: 'Invoiced and paid.' },
    { k: 'notes', label: 'Notes', type: 'textarea' }
  ],

  /* ---------- Receipts and invoicing ---------- */
  receipts: [
    { k: 'ref', label: 'Purchase order reference', type: 'text', req: true },
    { k: 'supplier', label: 'Supplier', type: 'text', req: true },
    { k: 'invoiceRef', label: 'Invoice reference', type: 'text' },
    { k: 'poUnitPrice', label: 'PO unit price', type: 'money', min: 0 },
    { k: 'poQty', label: 'PO quantity', type: 'number', min: 0 },
    { k: 'invUnitPrice', label: 'Invoiced unit price', type: 'money', min: 0 },
    { k: 'invQty', label: 'Invoiced quantity', type: 'number', min: 0 },
    { k: 'receivedQty', label: 'Quantity actually received', type: 'number', min: 0 },
    { k: 'freight', label: 'Freight or other charges', type: 'money', min: 0 },
    { k: 'tax', label: 'Tax', type: 'money', min: 0 },
    { k: 'notes', label: 'Notes', type: 'textarea' }
  ],

  /* ---------- Approval and policy configuration ---------- */
  approvals: [
    { k: 'name', label: 'Rule', type: 'text', req: true },
    { k: 'kind', label: 'Type', type: 'select', opts: ['Approval threshold', 'Approval chain', 'Policy rule'] },
    { k: 'role', label: 'Role or approver', type: 'text' },
    { k: 'limit', label: 'Value limit', type: 'money', min: 0, hint: 'Zero means no limit.' },
    { k: 'scope', label: 'Applies to', type: 'text', hint: 'Category, entity, spend type, or a condition.' },
    { k: 'notes', label: 'Notes', type: 'textarea' }
  ]
};

/* The RFx event is not a flat record: it has an event, a set of
   evaluation criteria and a set of bids, so it gets its own shape
   rather than being forced into the form language. */
PS.WB_RFX_CRITERIA = [
  { key: 'price', label: 'Price / commercial', weight: 35 },
  { key: 'quality', label: 'Quality and technical', weight: 25 },
  { key: 'delivery', label: 'Delivery and lead time', weight: 20 },
  { key: 'risk', label: 'Risk and resilience', weight: 10 },
  { key: 'esg', label: 'ESG and compliance', weight: 10 }
];
