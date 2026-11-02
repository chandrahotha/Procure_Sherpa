/* ==========================================================
   Procure Sherpa v2.6 - Glossary additions: markets, freight,
   regulated buying and contingent work. These entries carry
   relations, so the "Where to use it" column on #/glossary
   renders for them instead of the empty placeholder.
   ========================================================== */

PS.SGLS({ i: "gloss-ddp", t: "DDP / DAP", d: "Delivered Duty Paid and Delivered at Place. Incoterms where the seller carries the goods to the named destination; under DDP the seller also clears import and pays duty, which makes the buyer's landed cost predictable but hands the seller the customs risk.",
  rel: { concepts: ["customs-and-duty", "incoterms", "landed-cost-model"], calcs: ["calc-landed-cost"] } });
PS.SGLS({ i: "gloss-hs-code", t: "HS Code", d: "Harmonized System code. The internationally standardised classification applied to goods at customs, which determines the duty rate, any licence or inspection requirement, and whether a preferential trade agreement can be claimed.",
  rel: { concepts: ["customs-and-duty", "landed-cost-model"], sops: ["sop-freight-and-customs"] } });
PS.SGLS({ i: "gloss-gpo", t: "Group Purchasing Organisation", d: "An entity that aggregates demand from several organisations - hospitals, universities, municipalities, franchises - to reach volume thresholds none of them would reach alone, usually awarding contracts members may but need not use.",
  rel: { concepts: ["public-procurement-rules", "framework-agreement", "category-management"], decisions: ["consolidate-suppliers"], templates: ["tpl-business-case"] } });
PS.SGLS({ i: "gloss-rate-card", t: "Rate card", d: "A published schedule of rates by role, seniority, discipline and location. Negotiating the card rather than the individual engagement is how agency, contractor and professional-services spend is controlled, because it prices every future change order.",
  rel: { concepts: ["contingent-workforce", "agency-scope-brief"], calcs: ["calc-compare-quotes"], sops: ["sop-contingent-labour"] } });
PS.SGLS({ i: "gloss-change-order", t: "Change order", d: "A priced written variation to agreed scope, schedule or deliverables. In services spend the change order is where the negotiated discount is usually given back, so the control that matters is the approval route and the rate applied, not the original price.",
  rel: { concepts: ["change-control", "agency-scope-brief"], templates: ["tpl-contract-change-request"], sops: ["sop-contract-review"] } });
PS.SGLS({ i: "gloss-co-employment", t: "Co-employment risk", d: "The exposure that arises when an organisation directs a worker it does not employ - setting hours, supervision, tools and performance management. It converts a flexible cost into an employment, tax and benefits liability and is the main reason contingent work needs a defined engagement model.",
  rel: { concepts: ["contingent-workforce", "segregation-of-duties"], sops: ["sop-contingent-labour"], checklists: ["cl-supplier-due-diligence"] } });
