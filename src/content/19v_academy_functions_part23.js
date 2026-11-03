/* ==========================================================
   Procure Sherpa v3.0 - Academy Module 27: Regulated and
   Constrained Markets - Where a Third Authority Has Standing.
   Module 4 qualifies suppliers commercially, Module 17 develops
   quality, Module 18 handles disruption; none covered the buys
   where a regulator, an export-control office, a vetting regime or
   a licence condition is a party to the transaction without being
   in the room. Three lessons and five concepts. Written with no
   apostrophes, since these strings are single quoted and the build
   reads them literally.
   ========================================================== */

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-regulated-supplier-qualification',
  title: 'Qualifying a Supplier When a Regulator Has Standing',
  module: 'Module 27: Regulated and Constrained Markets - Where a Third Authority Has Standing',
  kicker: 'Function 27.1',
  tier: 'practitioner',
  tagline: 'Commercial due diligence asks whether a supplier is a good business. Regulated qualification asks whether you can prove, years later, that you had reason to trust this site for this process.',
  desc: "This function covers supplier approval performed to an evidential standard rather than a commercial one: what an approved-supplier list scope actually means, the difference between a certificate and a qualification, what a quality agreement allocates, the change-notification duties that make a suppliers modification your decision rather than your discovery, how to run an audit that tests the process, and what requalification costs when it is planned versus when it is forced.",
  duration: '22 mins',
  lifecycleStage: 'Stage 6: Supplier Prequalification and Due Diligence',
  lifecycleDesc: 'Owned at qualification and repeated on a defined cycle, because approval is a claim about a site and a process that can stop being true.',

  what: "A general procurement question and a regulated procurement question look similar and have different answers. The commercial question is whether this supplier is capable, solvent and reasonable to work with. The regulated question is whether you can show, to someone who was not present, that you had adequate reason to rely on this site for this process - and that question is answered by records, not by impressions. Start with the unit of approval. Approving a company is usually the wrong object: capability, quality system, contamination risk and regulatory history all attach to a site and a process, not to a corporate name. An approved-supplier list that says a group is approved will be read by an inspector as an approval of whatever that group chooses to manufacture anywhere. Scope the entry narrowly - this site, this process family, this product type - and record the reason for the entry, because the reason is what makes the entry defensible when the site changes hands. Next, what a certificate is and is not. A quality-management certificate says an organisation has a documented system that an accredited body reviewed against a standard. It does not say the system works, does not cover your product specifically, and does not tell you whether the people making your part follow it. It is one input, cheap to obtain, and treating it as the qualification is the most common way a regulated approval becomes decorative. The evidence that actually carries weight is an audit performed against the process that makes your item: the batch records, the deviation and complaint handling, the change control, the training records for the operators on that line, the cleaning and segregation controls if cross-contamination matters, and the suppliers own supplier management, because your risk usually sits one tier below. A quality agreement is where the real allocation happens, and it is worth reading as a document about who decides. It should say who owns the specification, who may approve a deviation and release a non-conforming batch, who must notify what change and with how much notice, who holds the records and for how long, who may change a sub-supplier or a site, who supports an inspection or an audit by your own regulator, and what happens on a recall. Most of the arguments that later become crises are arguments that this document left open. Change notification deserves its own attention because it is where the expensive surprises come from. A supplier will usually tell you the change they consider significant; the useful clause defines significance by category rather than by feeling - a new sub-supplier of a specified material, a different manufacturing line or site, a change in test method, a change in the raw-material source, a relocation of any part of the process - with a notice period long enough for you to requalify, and a stated consequence if the notice is not given. The alternative is discovering a change in the shipment paperwork after the goods are already in your release testing. Requalification is the cost that makes all of this arithmetic. Planned requalification is a scheduled activity with a budget: documentation review, samples, stability or performance testing, an audit where the risk justifies one, and a decision recorded. Forced requalification is the same work under a deadline with a product on hold. If your approved list has not been requalified in a defined period, the honest description is not that you have diligence, it is that you have a document that has stopped being checked. Finally, the position that tests the whole system: the supplier that is both approved and the only approved source. That is a legitimate outcome of a real qualification regime, and it is also the highest-risk entry on the list, so it should carry extra obligations - a higher notification standard, a right of audit on shorter notice, an agreed contingency such as a second source under development or a defined stock position, and a standing item at the risk committee rather than a footnote in a category plan.",
  why: [
    'Approval attaches to a site and a process, not to a corporate name.',
    'A certificate is an input to qualification, not the qualification - the evidence is the audit of the process that makes your item.',
    'A quality agreement is a document about who decides, and its omissions become your crises.',
    'Change significance must be defined by category with a notice period that allows requalification.',
    'An approved-supplier list that is never requalified is a claim that has stopped being checked.',
    'A sole approved source is the entry that needs the strongest obligations, not the least attention.'
  ],
  when: [
    'Approving any source for a regulated product, process or safety-critical service.',
    'When a supplier proposes a new sub-supplier, line, site or test method.',
    'On the scheduled requalification of the approved list.',
    'When the only approved source is also the incumbent.',
    'Before an inspection or audit that will read your supplier files.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Owns the approved list, the scope of each entry and the requalification cycle.' },
    { role: 'Quality or Regulatory Affairs', resp: 'Defines the qualification standard, leads process audits and owns the quality agreement content.' },
    { role: 'Supplier', resp: 'Provides the evidence, notifies defined changes with the agreed notice, and holds the records.' },
    { role: 'Legal', resp: 'Allocates decision rights, deviation authority, notification duties and recall cooperation.' },
    { role: 'Internal Audit', resp: 'Tests a sample of approvals for evidence and scope rather than for paperwork volume.' }
  ],
  inputs: [
    'The proposed site, process family and product scope, with the regulatory classification of the item.',
    'Certificates, audit reports, quality history and complaint or deviation records.',
    'A draft quality agreement with the decision rights visible.',
    'The suppliers own approved-supplier list for the tiers below you.'
  ],
  outputs: [
    'An approved-supplier entry scoped to site and process with the recorded reason for approval.',
    'A signed quality agreement allocating specification, deviation release, notification, records and recall duties.',
    'A requalification schedule with the evidence required at each interval.',
    'A contingency position for every sole approved source.'
  ],
  controls: [
    'No approval is recorded against a company where the capability belongs to a site and process.',
    'Every approved entry carries the evidence relied on and the date it was assessed.',
    'Defined change categories require notice with a lead time that permits requalification.',
    'Deviation and non-conforming release authority is named in the agreement, not assumed.',
    'The approved list is requalified on a cycle, and overdue entries are flagged rather than left standing.'
  ],
  bestPractices: [
    'Audit the process that makes your item, and read the deviation log before the marketing pack.',
    'Write the change-notification clause as a list of categories with a notice period attached.',
    'Ask for the suppliers own sub-tier approvals; your risk usually sits one level below.',
    'Keep the reason for approval with the approval, because the reason is what an inspector reads.'
  ],
  mistakes: [
    'Recording a certificate as the whole qualification and never auditing the line.',
    'Approving a corporate group when only one site was assessed.',
    'Accepting the suppliers judgement that a change does not affect the product.',
    'Leaving deviation release authority undefined until a batch is on hold.'
  ],
  terms: [
    { term: 'Approved supplier list', def: 'A register of sites and processes a buyer has assessed and accepts, scoped by what each entry is approved to do.' },
    { term: 'Quality agreement', def: 'A document allocating decision rights between buyer and supplier: specification, deviation, notification, records and recall duties.' },
    { term: 'Requalification', def: 'Repeating the original assessment on a schedule so an approval remains a current claim.' },
    { term: 'Change notification', def: 'A contractual duty to tell the buyer about defined categories of change early enough for the buyer to act.' }
  ],

  thinkingPoints: [
    {
      quote: 'The change that arrived in the paperwork.',
      explanation: 'A contract manufacturer switched a raw-material vendor through a new sub-supplier and disclosed it in the shipment documentation. The buyers clause required notice sixty days earlier with a requalification path; instead the buyer learned of it while release testing was already running. Stability work, documentation updates and a filing amendment took eleven weeks of unplanned effort on a product already in release, and the commercial relationship spent a year rebuilding trust.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a notification clause that defines categories and lead time converts a surprise into a scheduled decision.',
      reflectionPrompt: 'Which specific changes must your largest supplier tell you about today, how much notice, and what happens if they do not?',
    },
    {
      quote: 'The certificate that qualified nothing.',
      explanation: 'A supplier held a current quality-management certificate and had been on the approved list for nine years without reassessment. An audit found that the operators on the line making the buyers product had not been trained to the current version of the work instruction, and the deviation log for that line had not been reviewed by the supplier own quality function in two years. The certificate was genuine; the approval was a document nobody had read since it was written.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: accreditation attests to a system, not to your product line, and time erodes an approval silently.',
      reflectionPrompt: 'When was the last entry on your approved list actually requalified, and who would know if it lapsed?',
    }
  ],

  sopSteps: [
    { title: 'Scope the approval to a site and a process', role: 'Category Manager',
      desc: 'Record what each approved entry is approved to make or do, at which site, under which process family. A company-level entry hides the fact that capability lives in one building and one line.',
      control: 'No approval is entered at corporate scope where the assessment covered one site or process.',
      record: 'Approved list entry with site, process family, product scope and assessment date.',
      pitfall: 'Assuming a group approval travels to a newly acquired plant that has never been seen.'
    },
    { title: 'State the evidence the approval rests on', role: 'Quality or Regulatory Affairs',
      desc: 'Write down what was reviewed and relied upon: the audit report, the deviation and complaint history, the qualification data, the sub-tier approvals. The reason is the part that makes the entry defensible years later.',
      control: 'Each entry names its evidence set, and an entry without evidence is provisional with an expiry date.',
      record: 'Evidence index per approved entry with the reviewer and the decision.',
      pitfall: 'Recording a certificate number as the evidence and never attaching the audit that matters.'
    },
    { title: 'Audit the process that makes your item', role: 'Quality or Regulatory Affairs',
      desc: 'Assess the line, the batch records, the cleaning and segregation controls, the training of the people actually working, and the suppliers own management of its suppliers. Read the deviation log before the capability presentation.',
      control: 'Audit findings are closed with dates and owners, and an unclosed critical finding blocks or limits the approval.',
      record: 'Audit report with findings, closure dates, and the scope of approval decided.',
      pitfall: 'Accepting a site tour with a quality manager present as an audit of the process.'
    },
    { title: 'Sign a quality agreement that allocates decisions', role: 'Legal',
      desc: 'Name who owns the specification, who may approve a deviation or release a non-conforming batch, who notifies which changes with how much notice, who holds records and for how long, who supports an inspection, and what each party does in a recall.',
      control: 'No regulated supply runs on a purchase order alone; the agreement is a controlled document with a version and an owner.',
      record: 'Signed quality agreement with the decision matrix and the notification categories.',
      pitfall: 'Leaving deviation release undefined so that the first contested batch becomes the precedent.'
    },
    { title: 'Define change by category, not by feeling', role: 'Quality or Regulatory Affairs',
      desc: 'List the changes that require notice - sub-supplier of a specified material, line or site move, test method change, raw-material source, design or process parameter - with a notice period long enough to requalify and a stated consequence for silence.',
      control: 'Notification categories and lead times are contractual, and a change discovered without notice is recorded as a compliance event.',
      record: 'Change category schedule with notice periods and the register of notices received.',
      pitfall: 'Trusting the supplier own materiality test for a change that affects your filing.'
    },
    { title: 'Requalify on a cycle and flag the overdue', role: 'Category Manager',
      desc: 'Set the interval by risk, plan the evidence required, and produce a list of entries whose assessment has lapsed. Planned requalification is a scheduled cost; forced requalification is the same work with product on hold.',
      control: 'The approved list carries an assessment date per entry and a report of lapses at each governance meeting.',
      record: 'Requalification plan with intervals by risk class and the lapse report.',
      pitfall: 'Treating an unchanged list as a well-controlled list when nothing has been re-read for years.'
    },
    { title: 'Put extra obligations on the sole approved source', role: 'Quality or Regulatory Affairs',
      desc: 'Where only one source is approved, raise the notification standard, secure audit rights on shorter notice, and agree the contingency - second source under development, defined stock, or a documented transfer plan - rather than relying on the relationship being good.',
      control: 'Every sole approved source carries named contingency obligations reviewed at a defined interval.',
      record: 'Sole-source risk note with obligations, contingency owner and review date.',
      pitfall: 'Recording single-source risk and then treating the approved status as if it were the mitigation.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A supplier is on the approved list as Acme Group, approved 2021, based on an audit at its plant A. Acme now proposes shipping the same part from plant B, which has never been assessed, saying the process is identical and the certificate covers both sites.',
      q: 'What is the correct handling?',
      options: [
        { text: 'Accept, since the certificate covers the group and the process is declared identical.', isCorrect: false, rationale: 'The certificate attests to a system, and the approval was evidence about plant A. A declared identity is not an assessment.' },
        { text: 'Treat it as a change requiring notice and requalification: assess plant B against the process that makes your part, and until then limit the approval to plant A.', isCorrect: true, rationale: 'Correct. Approval is site and process scoped, so a new site is a new qualification, not an administrative detail.' },
        { text: 'Ask for a written guarantee that nothing changed and file it.', isCorrect: false, rationale: 'A guarantee from the party making the change is the same evidence level you already had.' },
        { text: 'Reject the change outright to protect the approval.', isCorrect: false, rationale: 'The goal is a defensible approval, not a frozen supply map; plant B can be qualified properly.' }
      ],
      principle: 'Approval travels with the site and process it was earned on, not with the corporate name.',
    },
    {
      type: 'scenario',
      context: 'A batch fails your incoming test. The supplier releases it anyway, citing its own quality procedure, and points out that the purchase order says nothing about who decides on non-conforming product.',
      q: 'What does this expose?',
      options: [
        { text: 'A test method problem on the buyers side.', isCorrect: false, rationale: 'The method may be fine; the missing allocation is what turned a deviation into an argument.' },
        { text: 'An unallocated decision right: the quality agreement did not name who may approve a deviation or release non-conforming product, so the supplier used its own rule and the buyer had no contractual answer.', isCorrect: true, rationale: 'Correct. This is the classic omission a quality agreement exists to close, and the fix is the decision matrix rather than a dispute about this batch.' },
        { text: 'A supplier that should be removed from the approved list immediately.', isCorrect: false, rationale: 'That may follow, but the diagnosis is the missing allocation, and replacing the supplier without fixing it repeats the problem.' },
        { text: 'A need for tighter incoming inspection.', isCorrect: false, rationale: 'Inspection detects; it does not decide, and the decision is what was contested.' }
      ],
      principle: 'Name who may release a non-conforming batch before the first one exists.',
    },
    {
      type: 'knowledge',
      q: 'What is the practical difference between a certificate and a qualification?',
      options: [
        { text: 'A certificate is a documented system reviewed against a standard by an accredited body; a qualification is your own assessment, on evidence, that this site and process can make your item acceptably.', isCorrect: true, rationale: 'Correct. One is an input you read; the other is a decision you own and must be able to explain.' },
        { text: 'They are the same thing at different cost.', isCorrect: false, rationale: 'That is exactly the confusion that produces decorative approvals.' },
        { text: 'A certificate is only used for new suppliers.', isCorrect: false, rationale: 'Certificates are used at every stage; they just do not decide the question.' },
        { text: 'A qualification is the internal version of a certificate.', isCorrect: false, rationale: 'A qualification is not an attestation of a system, it is a judgement about a specific supply.' }
      ],
      principle: 'Accreditation attests to a system; qualification is your evidenced decision about your item.',
    },
    {
      type: 'knowledge',
      q: 'Why is a change-notification clause written as categories with notice periods rather than as a duty to notify significant changes?',
      options: [
        { text: 'Because regulators require a list format.', isCorrect: false, rationale: 'The reason is enforceability, not formatting.' },
        { text: 'Because significance is contested at the moment it is inconvenient, and a defined list with a lead time long enough to requalify converts an argument into a scheduled action.', isCorrect: true, rationale: 'Correct. The clause has to survive the supplier own materiality judgement, and the notice period must match the work you need to do.' },
        { text: 'Because categories let the supplier plan production better.', isCorrect: false, rationale: 'That is a side benefit, not the purpose.' },
        { text: 'Because it removes the need for audits.', isCorrect: false, rationale: 'Notification complements assessment; it does not replace it.' }
      ],
      principle: 'Define what counts as a change and how much notice, so the decision is scheduled rather than discovered.',
    },
    {
      type: 'scenario',
      context: 'Your approved list has one approved source for a safety-relevant component. The supplier is excellent, responsive and priced fairly, and the category plan records single-source risk as accepted.',
      q: 'What is the correct next step?',
      options: [
        { text: 'Nothing; a good relationship with a sole approved source is the mitigation.', isCorrect: false, rationale: 'A relationship is not a contingency, and the approval status is the reason the risk exists rather than the answer to it.' },
        { text: 'Raise the obligations on that entry - higher notification standard, audit on shorter notice - and name a real contingency with an owner and a date: second source under qualification, a defined stock position, or a documented transfer plan.', isCorrect: true, rationale: 'Correct. Sole approval is legitimate, and it is the entry that needs the strongest contractual and operational position.' },
        { text: 'Open a competitive tender immediately to remove the risk.', isCorrect: false, rationale: 'A tender that no qualified alternative can win adds cost and disruption without adding supply.' },
        { text: 'Transfer the risk to insurance.', isCorrect: false, rationale: 'Insurance pays after a failure; it does not make a second source exist.' }
      ],
      principle: 'The sole approved source is the entry that needs the most obligations, not the least attention.',
    }
  ],
  relSop: 'sop-supplier-onboarding',
  rel: {
    concepts: ['regulated-supplier-qualification', 'process-validation-and-traceability', 'supplier-qualification', 'change-control', 'supplier-development', 'audit-trail'],
    sops: ['sop-supplier-onboarding', 'sop-supplier-evaluation', 'sop-supplier-performance-management', 'sop-procurement-audit'],
    checklists: ['cl-supplier-due-diligence', 'cl-supplier-onboarding', 'cl-supplier-risk-review'],
    templates: ['tpl-supplier-onboarding', 'tpl-supplier-due-diligence', 'tpl-supplier-risk-assessment'],
    calcs: ['calc-supplier-scorecard', 'calc-supplier-concentration'],
    decisions: ['supplier-financial-risk', 'competitive-or-single', 'dual-source'],
    kpis: ['kpi-contract-compliance', 'kpi-defect-rate', 'kpi-otif'],
    glossary: ['gloss-sla', 'gloss-segregation-of-duties', 'gloss-doa']
  },
  labMission: {
    title: 'Mission 27.1: Read Your Approved List as an Inspector Would',
    desc: 'Take the approval entries you rely on most and ask what they actually say.',
    tasks: [
      'Pick three approved-supplier entries and write the site, process family and product scope each one actually covers. Note where the answer is the company name.',
      'List the change categories your most critical supplier must notify, the notice period, and what you would do inside it. If the list does not exist, draft the six categories that matter.',
      'For the sole approved source you depend on, name the contingency with an owner and a date, and check whether the quality agreement says who may release a non-conforming batch.'
    ],
    ctaLabel: 'Open Supplier Scorecard',
    ctaHref: '#/calc/calc-supplier-scorecard',
    secondaryLabel: 'Open the Supplier Onboarding Checklist',
    secondaryHref: '#/cl/cl-supplier-onboarding'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-controlled-goods-and-clearance-constraints',
  title: 'Controlled Goods, Clearances and Sovereign Requirements',
  module: 'Module 27: Regulated and Constrained Markets - Where a Third Authority Has Standing',
  kicker: 'Function 27.2',
  tier: 'practitioner',
  tagline: 'In these markets the constraint is decided before the bid: what may be sold, to whom, by whom, and in which country. Procurement does not set those rules - it has to find the market that survives them.',
  desc: "This function covers buying where classification, licensing, personnel vetting and domestic-content rules shape the addressable market: how export control and dual-use classification attach to items and to technology rather than only to shipments, how restricted-party screening differs from classification and why both fail separately, what clearance and sovereignty requirements do to price and competition, and how to run a sourcing process that is honest about a market of three compliant suppliers.",
  duration: '23 mins',
  lifecycleStage: 'Stage 5: Market Analysis and Supplier Identification',
  lifecycleDesc: 'Run before the specification is frozen, because the constraint defines who can bid and therefore what the specification can reasonably ask.',

  what: "In a normal category procurement shapes the market by how it writes requirements. In a constrained market the shape is largely given: a classification rule, a licence requirement, a vetting standard or a sovereign-content obligation decides who may participate before anyone prices. The buyers job is not to argue with those rules but to know them early, test the market against them honestly, and price what the constraint costs instead of pretending the outcome is competitive. Take export control first, because it is the one most often discovered late. Control attaches to the item or the technology, not to the invoice value, and it applies to two different events: shipping goods, and transferring technology. A drawing sent to an engineer in another country, a support session that shows controlled configuration detail, or a cloud repository accessible from abroad can all be exports in law even though nothing physical moved. Classification is a judgement made against a control list, and the practical failure is not misclassification but absence of classification - nobody recorded who decided, on what basis, and when. Ask for the classification before contracting, keep the determination with the record, and treat a supplier that cannot state it as a schedule risk rather than as a paperwork gap. The consequence of getting it wrong is not a fine arriving quietly; it is a freight forwarder stopping the shipment, a licence application with an unpredictable clock, or a supplier that cannot lawfully complete the work it quoted. Screening is the other half, and it fails independently of classification. Screening asks whether this counterparty, its owners, its affiliates and the end user appear on restricted lists, whether the destination is embargoed, and whether the stated end use is plausible. A perfectly classified item sold to a listed entity is still a violation. Screening at onboarding is not enough because ownership changes and lists move, so it runs on a schedule and at every material transaction. The commonest weakness is screening only the contracting entity while the beneficial owner or the distributor sits on a list. Now the requirements that constrain who may do the work. Personnel vetting levels, facility approvals, citizenship or residency conditions, and domestic-content rules can reduce a market of dozens to a market of three, and they do so legitimately - the state has decided that some work must be done by people or plants it can verify. The procurement consequence is that the price will look wrong against the general market, and the correct response is to state the constraint in the business case rather than to negotiate as though the constraint were a supplier failing. Two disciplines help. First, establish the requirement precisely and get it confirmed by whoever owns the rule - the security function, the regulator, the programme office - because an over-specified vetting requirement is a real cost paid for a preference, and an under-specified one arrives as a surprise during delivery. Second, test the market against the constraint before writing the specification: how many suppliers can staff this, how many sites are approved, what the qualification lead time is, and whether the vetting clock dominates the schedule. Vetting lead times are outside supplier control and routinely longer than the delivery itself. When the compliant market is thin, run the process accordingly. A tender between three compliant bidders is not a failed competition; it is the honest market, and the value comes from clarity of requirement, from a well-designed evaluation, and from the tools that thin markets need - multi-year terms with priced options, capacity guarantees, second-source development, or a deliberate decision to pay for a sovereign capability. What you should not do is describe a thin market as collusion, or use a single-source justification when three compliant suppliers exist. The last piece is the interaction between these constraints and commercial pressure. A cheaper bid in a controlled category is often a bid that has not priced an obligation: the licence, the vetted staffing, the domestic facility, the record retention. Before treating a low offer as leverage, ask which obligation the price excludes. That question is uncomfortable to ask a supplier you would like to believe, and it is the reason the classification record and the requirement confirmation exist.",
  why: [
    'Control attaches to the item or technology, and a technology transfer can be an export with no shipment.',
    'Classification and screening fail independently - a correctly classified item sold to a listed party is still a violation.',
    'Vetting, facility and content rules set the size of the addressable market before price is discussed.',
    'An over-specified constraint is a real cost paid for a preference; an under-specified one arrives during delivery.',
    'A tender between three compliant bidders is the honest market, not evidence of a failed competition.',
    'An unusually cheap bid in a controlled category is often a bid that has not priced an obligation.'
  ],
  when: [
    'Sourcing software, tooling, test equipment, components or technical data that may be controlled.',
    'Before writing a specification that carries vetting, facility or content requirements.',
    'Onboarding a supplier with affiliates, distributors or end users in constrained destinations.',
    'When a compliant market is thin and the price looks wrong against the general market.',
    'When a bid in a controlled category is materially cheaper than the others.'
  ],

  raci: [
    { role: 'Category Manager', resp: 'Runs the market test against the constraint and designs a process suited to a thin compliant field.' },
    { role: 'Compliance or Trade Controls', resp: 'Classifies items and technology, owns screening scope and frequency, and confirms what the rule requires.' },
    { role: 'Security or Programme Office', resp: 'States the vetting, facility and content requirement precisely and confirms the certification lead time.' },
    { role: 'Legal', resp: 'Puts the obligation on the supplier, records the classification basis and handles end-use representations.' },
    { role: 'Requesting Business Owner', resp: 'Accepts the price and schedule consequence of a constraint, or agrees to relax it where it is a preference.' }
  ],
  inputs: [
    'The item, software or technology description with its intended destinations and users.',
    'The classification determination and its basis, or the request for one.',
    'The confirmed vetting, facility and content requirement with who certifies it.',
    'Market map of compliant suppliers, with qualification and vetting lead times.'
  ],
  outputs: [
    'A classification record held with the contract, naming the decision-maker and the date.',
    'A screening position covering entity, owners, affiliates and end user, with a re-screen interval.',
    'A market test stating how many suppliers can comply and what the constraint costs.',
    'A process design appropriate to a thin field, with the alternatives priced rather than assumed.'
  ],
  controls: [
    'Classification is determined before contracting and recorded with its basis.',
    'Screening covers the contracting entity, beneficial owners, affiliates and the stated end user, and repeats on a schedule.',
    'Vetting and content requirements are confirmed by the owning function before the specification is issued.',
    'Technology transfer routes - support, access, repositories - are treated as potential exports and assessed.',
    'A materially low bid in a controlled category is tested against the obligations before it is treated as value.'
  ],
  bestPractices: [
    'Ask for the classification and the basis, not a promise of compliance.',
    'Test the market against the constraint first; the specification should describe a competition that can happen.',
    'Put the vetting clock on the schedule alongside the delivery clock, because one is usually longer.',
    'Distinguish obligation from preference in writing, and let the business decide the preference.'
  ],
  mistakes: [
    'Assuming the supplier handles classification and therefore carries the risk.',
    'Screening the contracting entity only, while the distributor or owner is listed.',
    'Writing an elevated vetting requirement because it sounds safe, then pricing the resulting market of three.',
    'Treating a thin compliant market as evidence of collusion and running a tender nobody can win.'
  ],
  terms: [
    { term: 'Dual-use', def: 'Goods, software or technology designed for civilian use that can also serve a military or prohibited purpose, and is therefore controlled.' },
    { term: 'Restricted-party screening', def: 'Checking counterparties, owners, affiliates and end users against applicable prohibition lists.' },
    { term: 'Technology transfer', def: 'Release of controlled technical information, which can be a regulated event even when no item is shipped.' },
    { term: 'Sovereign capability', def: 'A domestic ability a state chooses to retain, priced as a policy decision rather than as a market outcome.' }
  ],

  thinkingPoints: [
    {
      quote: 'The 18 percent saving that needed a licence.',
      explanation: 'Test equipment was sourced 18 percent under the other bids, and the licence requirement surfaced when the freight forwarder asked for the classification. The item was controlled for the destination, the supplier had quoted as though it were not, and the authorisation clock moved delivery by fifteen weeks. The cheaper price had not been a better deal; it had been an omission.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: in a controlled category, a low bid is often a price that excludes an obligation rather than a supplier that is more efficient.',
      reflectionPrompt: 'When a bid in your controlled categories is materially lowest, what question do you ask first, and who has authority to answer it?',
    },
    {
      quote: 'The requirement that made the market three.',
      explanation: 'A support service was specified with elevated vetting for anyone touching the data. Fourteen suppliers could deliver the service; three could deliver it compliantly, and the award settled 22 percent above the general market rate. The requirement was legitimate, but nobody had tested the market against it or asked whether the same outcome needed the full standard, so the cost arrived as a surprise in an otherwise normal tender.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: a constraint applied without a market test converts a policy choice into an unexplained price.',
      reflectionPrompt: 'Which requirement in your current specification is a preference written as an obligation, and who confirmed it?',
    }
  ],

  sopSteps: [
    { title: 'Classify before contracting and keep the basis', role: 'Compliance or Trade Controls',
      desc: 'Determine whether the item, software or technology is controlled, against which list, for which destinations, and who made the call. Record the determination with the contract file rather than in correspondence.',
      control: 'No controlled-category contract is signed without a dated classification determination on file.',
      record: 'Classification record with list reference, destinations, decision-maker and date.',
      pitfall: 'Accepting a suppliers statement that an item is not controlled without a basis anyone could re-read.'
    },
    { title: 'Screen the whole counterparty, not the invoice name', role: 'Compliance or Trade Controls',
      desc: 'Check the contracting entity, its beneficial owners, its affiliates and the stated end user and destination, and re-screen on a schedule and at material transactions. Ask whether the stated end use is plausible.',
      control: 'Screening scope and interval are defined, and a hit stops the transaction rather than generating a note.',
      record: 'Screening log per counterparty with scope, date, result and any escalation.',
      pitfall: 'Clearing the supplier while a distributor or new owner sits on a list.'
    },
    { title: 'Treat technology movement as a regulated event', role: 'Legal',
      desc: 'Assess support access, engineering collaboration, cloud repositories and drawing circulation as potential transfers. Define who may see what, where the data sits, and how access is withdrawn.',
      control: 'Every controlled-category engagement states permitted access by role and location before data is shared.',
      record: 'Access and transfer map with the permitted roles, locations and revocation point.',
      pitfall: 'A remote support session that shows controlled configuration detail to an unauthorised engineer.'
    },
    { title: 'Confirm the requirement with the function that owns it', role: 'Security or Programme Office',
      desc: 'Get the vetting level, facility approval or content rule stated precisely, with who certifies it and how long certification takes. Separate the legal obligation from the preference and put the preference to the business owner with a price.',
      control: 'Requirements of this kind are confirmed in writing before issue, and preferences carry a recorded acceptance of the cost.',
      record: 'Requirement confirmation with certifier, lead time and the obligation or preference label.',
      pitfall: 'Writing an elevated standard because it sounds safe and discovering the market size afterwards.'
    },
    { title: 'Test the market against the constraint', role: 'Category Manager',
      desc: 'Count the suppliers that can actually comply, with their approved sites, vetted staff and certification status, and measure the qualification and vetting clocks. Report the compliant market size before the specification is frozen.',
      control: 'The business case states the compliant supplier count, the expected competition level and the constraint premium.',
      record: 'Constraint market test with names, capability status and lead times.',
      pitfall: 'Issuing a tender that only three firms can answer and calling the result competitive.'
    },
    { title: 'Design the process for a thin field', role: 'Category Manager',
      desc: 'Where the compliant market is small, compete on clarity and structure: precise requirements, a well-anchored evaluation, priced options, capacity commitments, or a funded second-source development. Do not use a single-source justification when compliant alternatives exist.',
      control: 'Thin-market processes record the alternatives approached and the reason the chosen structure fits the field.',
      record: 'Process design note with the compliant field, structure chosen and options priced.',
      pitfall: 'Running a formal competition that produces the same supplier at the same price with six months added.'
    },
    { title: 'Interrogate the cheap bid for an omitted obligation', role: 'Compliance or Trade Controls',
      desc: 'Where a bid is materially lowest in a controlled category, ask which obligation the price excludes: licence, vetted staffing, approved facility, content rule, record retention. Test the answer before treating the price as leverage.',
      control: 'A materially low controlled-category bid is not awarded until the obligation question is answered in writing.',
      record: 'Low-bid obligation enquiry with the answer and the assessment.',
      pitfall: 'Winning the negotiation and losing the delivery when the omitted obligation surfaces at the border.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A controlled-category tender returns four bids. The lowest is 18 percent under the field and the supplier quotes a standard delivery term with no licence reference. The item is plausibly controlled for the destination.',
      q: 'What is the correct sequence?',
      options: [
        { text: 'Award to the lowest; a competitive tender produced the price.', isCorrect: false, rationale: 'The price may be real, but in this category the gap is a question about obligations before it is a saving.' },
        { text: 'Ask for the classification determination and the licence position in writing, assess whether the price excludes an obligation, and treat the answer as part of the evaluation rather than as a follow-up detail.', isCorrect: true, rationale: 'Correct. Classification is a dated determination, and a bid that omits it has not priced the same thing as the others.' },
        { text: 'Reject all bids and re-tender with a compliance clause.', isCorrect: false, rationale: 'That discards a compliant market to fix a question that has a direct answer.' },
        { text: 'Accept the low bid and let the freight forwarder raise anything that matters.', isCorrect: false, rationale: 'That is how the discovery becomes a fifteen-week delay instead of a clarification.' }
      ],
      principle: 'In controlled categories, ask which obligation the low price excludes before you call it value.',
    },
    {
      type: 'scenario',
      context: 'A support contract is specified requiring elevated vetting for anyone with data access. Fourteen suppliers could deliver the service; three could deliver it compliantly. The business owner says the vetting level was copied from an earlier contract.',
      q: 'What should procurement do?',
      options: [
        { text: 'Proceed; the requirement is contractual and the market is what it is.', isCorrect: false, rationale: 'A copied requirement that nobody owns is a cost without a decision attached to it.' },
        { text: 'Take the requirement back to the function that owns it, establish whether the outcome needs that level or a lower one, and put the constraint premium to the business owner as a priced choice.', isCorrect: true, rationale: 'Correct. Separating obligation from preference is the only way the 22 percent becomes a decision rather than a surprise.' },
        { text: 'Drop the requirement to widen the field.', isCorrect: false, rationale: 'Procurement does not own that risk decision, and dropping it unilaterally is worse than the premium.' },
        { text: 'Run a single-source award to the only vetted incumbent.', isCorrect: false, rationale: 'Three compliant suppliers exist, so a single-source justification would be false.' }
      ],
      principle: 'A constraint copied without an owner is a preference priced as an obligation.',
    },
    {
      type: 'knowledge',
      q: 'Which statement about technology transfer and export control is correct?',
      options: [
        { text: 'Only physical shipments can be exports, so data flows are out of scope.', isCorrect: false, rationale: 'That is the assumption behind most of these failures.' },
        { text: 'Releasing controlled technical information across a border can be a regulated event even when nothing is shipped, so access, support sessions and repositories need assessment.', isCorrect: true, rationale: 'Correct. The control follows the technology, and access is a release.' },
        { text: 'Transfers are controlled only for military end users.', isCorrect: false, rationale: 'Classification and destination both matter, independent of end user type.' },
        { text: 'A supplier agreement removes the buyers responsibility.', isCorrect: false, rationale: 'Contract terms allocate cost and cooperation, not regulatory standing.' }
      ],
      principle: 'Assess where the information goes, not only where the goods go.',
    },
    {
      type: 'knowledge',
      q: 'Why is screening the contracting entity alone insufficient?',
      options: [
        { text: 'Because lists are updated too often to check anyone.', isCorrect: false, rationale: 'Frequency is a reason to schedule re-screening, not to narrow scope.' },
        { text: 'Because prohibited status can sit with a beneficial owner, an affiliate, a distributor or the end user, and because ownership changes between onboarding and performance.', isCorrect: true, rationale: 'Correct. The transaction is with a company; the risk is with the people and entities behind it.' },
        { text: 'Because screening only applies above a value threshold.', isCorrect: false, rationale: 'Prohibition rules are not value-scaled.' },
        { text: 'Because the suppliers own screening can be relied on for affiliates.', isCorrect: false, rationale: 'Reliance without verification is the finding.' }
      ],
      principle: 'Screen the counterparty as a structure, and re-screen on a schedule.',
    },
    {
      type: 'scenario',
      context: 'A compliant market of three suppliers exists for a vetting-constrained service. The category team proposes a single-source award to the incumbent, arguing that a tender between three firms adds cost without adding competition.',
      q: 'What is the correct advice?',
      options: [
        { text: 'Agree; three bidders is not meaningful competition.', isCorrect: false, rationale: 'A thin compliant market is still a market, and the argument proves too much.' },
        { text: 'Run a process suited to the field - precise requirement, anchored evaluation, priced options and capacity commitments - and record the compliant field size in the business case rather than using a single-source justification that the market contradicts.', isCorrect: true, rationale: 'Correct. The honest position is that the constraint narrows the field, not that competition is impossible.' },
        { text: 'Re-specify to remove the constraint so twelve firms can bid.', isCorrect: false, rationale: 'That is a risk decision for the owning function, not a procurement tactic.' },
        { text: 'Tender and treat the result as collusion if prices are close.', isCorrect: false, rationale: 'Close prices in a market of three are a structural outcome, and calling it collusion starts an investigation that will find none.' }
      ],
      principle: 'Design for the compliant field you have; do not misdescribe it to justify convenience.',
    }
  ],
  relSop: 'sop-freight-and-customs',
  rel: {
    concepts: ['export-control-and-dual-use', 'clearance-and-sovereignty-requirements', 'customs-and-duty', 'red-flag-indicators', 'supplier-market-analysis', 'concentration-risk'],
    sops: ['sop-freight-and-customs', 'sop-supplier-onboarding', 'sop-supplier-evaluation', 'sop-procurement-audit'],
    checklists: ['cl-supplier-due-diligence', 'cl-supplier-identification', 'cl-rfp-preparation'],
    templates: ['tpl-supplier-due-diligence', 'tpl-rfp', 'tpl-single-source'],
    calcs: ['calc-landed-cost', 'calc-supplier-concentration'],
    decisions: ['sourcing-method', 'competitive-or-single', 'dual-source'],
    kpis: ['kpi-contract-compliance', 'kpi-cycle-time', 'kpi-bid-rate'],
    glossary: ['gloss-hs-code', 'gloss-incoterms', 'gloss-single-source']
  },
  labMission: {
    title: 'Mission 27.2: Find the Obligation Your Cheapest Bid Excluded',
    desc: 'Use a real controlled-category purchase and check what the paperwork actually says.',
    tasks: [
      'Pick one item, software or technology you buy that could be controlled. Find the classification determination, who made it and when. If it does not exist, request it.',
      'List the counterparty structure for your largest supplier in that category - entity, owners, affiliates, distributor, end user - and check when each was last screened.',
      'For one live specification, mark every requirement as obligation or preference, and ask the owning function to confirm the obligations in writing.'
    ],
    ctaLabel: 'Open Landed Cost',
    ctaHref: '#/calc/calc-landed-cost',
    secondaryLabel: 'Open Supplier Due Diligence',
    secondaryHref: '#/tpl/tpl-supplier-due-diligence'
  }
});

PS.ACADEMY_FUNCTIONS.push({
  id: 'func-essential-service-continuity-obligation',
  title: 'Continuity as an Obligation: Buying for a Licensed Operation',
  module: 'Module 27: Regulated and Constrained Markets - Where a Third Authority Has Standing',
  kicker: 'Function 27.3',
  tier: 'executive',
  tagline: 'Where the business holds a licence to keep a service running, resilience stops being a preference and becomes a duty that has to be evidenced - including the exit plan written while the incumbent is still the incumbent.',
  desc: "This function covers the board-level consequence of regulated continuity: how a licence obligation changes the objective of a sourcing decision, how to price resilience rather than argue about it, what a credible exit plan actually requires, why the plan must be tested while nothing is wrong, and how to present a continuity decision so it survives both a regulator and a cost review.",
  duration: '20 mins',
  lifecycleStage: 'Stage 3: Category Sourcing Strategy',
  lifecycleDesc: 'Owned at strategy level, because the trade is between regulated duty and cost, and that trade is not a category-team decision.',

  what: "In most categories the question is what a failure would cost the business. In a licensed operation the question changes shape: a failure may breach an obligation, and the obligation may require you to have planned for it in advance and to be able to show the plan. That difference is worth stating plainly to a board, because it changes what a sourcing decision is optimising for, and it changes who signs. Start with the obligation itself. Write down, in one paragraph, what the licence or the sector rule requires about continuity, who the regulator is, what evidence would be asked for, and what the consequence of breach actually is - a fine, a direction, a personal liability, a loss of authorisation to operate. Most organisations have never reduced it to that paragraph, so continuity spending gets argued as a preference between people with different risk appetites rather than as compliance with a defined duty. Second, price the resilience rather than describing it. A dual source costs the difference between one and two suppliers, the duplicated qualification, the smaller volumes and the standing test. A defined stock position costs working capital and shelf life. A tested fallback costs the annual exercise and the people who run it. A longer term with capacity guarantees costs the option value you gave up. Put those numbers next to the expected loss of a failure - not the theoretical worst case, but the plausible one with its probability - and the decision becomes arithmetic that a board can approve and a regulator can see reasoned. The line most organisations miss is that resilience spending is invisible while nothing happens, which makes it politically fragile at exactly the moment it needs defending. The answer is not a stronger argument in the crisis; it is a standing record that the trade was made deliberately, with the obligation quoted, the options priced and the decision dated. Third, the exit plan, which is where good intentions usually fail. A credible exit plan for a critical supplier says what data and configuration you would need and in what format, who else could run the service and what it would cost them to stand up, how long the transition takes including the qualification you cannot compress, what the incumbent must provide during the transition and whether that obligation survives termination, and what the fallback is if the incumbent is uncooperative, insolvent or both. The test question is simple and uncomfortable: if this supplier failed on Monday, what is the dated sequence of actions that keeps the service running, and who has rehearsed it? An exit plan that assumes cooperation is not a plan; it is a hope with a document cover. Testing matters for the same reason a fire drill matters. An untested recovery route is a claim, and a regulator that asks you to demonstrate it will find the gap - usually in the handover detail, the access arrangements, or the fact that the alternative supplier has never seen your configuration. An annual exercise at a defined scope is cheap relative to a remediation programme, and it also produces the one artefact that ends arguments: evidence that the plan works, dated. Finally, how this is presented upward. A paper that says we should pay more for resilience will lose to a paper that says we should pay less. The durable form is: the obligation stated, the plausible failure and its consequence, the options with prices including the cheapest one, the chosen position with the reason, and the test that would show it still works next year. That structure survives a cost review because it shows the discount was considered, and it survives a regulator because it shows the duty was taken seriously rather than assumed. The failure mode this whole lesson exists to prevent is the quiet one: a portfolio of critical suppliers, each with a plan written at onboarding, none tested, all assumed, and a board that has never seen the arithmetic - until the day a regulator asks for the demonstration and the answer is a document describing a route nobody has walked.",
  why: [
    'A licence obligation changes the objective of the buy from lowest cost to demonstrable continuity.',
    'Resilience must be priced as an option set, including the cheapest option, so the trade is visible.',
    'An exit plan that assumes cooperation from a failing supplier is a hope, not a plan.',
    'Untested recovery is a claim; a dated exercise is evidence, and evidence is what a regulator asks for.',
    'Resilience spending is invisible while nothing happens, so the reasoned decision record is what defends it.'
  ],
  when: [
    'Setting sourcing strategy for any supplier whose failure would breach an obligation.',
    'Before awarding a critical service to the cheapest compliant bidder.',
    'At the annual review of continuity plans for licensed operations.',
    'When a regulator, auditor or customer asks you to demonstrate the plan.',
    'When a critical supplier is distressed, uncooperative, or the only approved source.'
  ],

  raci: [
    { role: 'Board or Executive Sponsor', resp: 'Accepts the continuity position, the priced options and the residual risk.' },
    { role: 'Head of Procurement', resp: 'Builds the option set with prices, runs the exit-plan discipline and keeps the decision record.' },
    { role: 'Operations or Service Owner', resp: 'Owns the recovery route, names who would run it, and rehearses it.' },
    { role: 'Risk or Compliance', resp: 'States the obligation, the evidence expected and the consequence of breach.' },
    { role: 'Finance', resp: 'Funds the resilience option and the annual test, and books the working capital of any stock position.' }
  ],
  inputs: [
    'The licence or sector obligation text, with the evidence and breach consequence.',
    'The critical supplier register with single-source status and substitution time.',
    'Priced resilience options: dual source, stock, longer term with capacity, tested fallback.',
    'The current exit plan, with its last exercise date and result.'
  ],
  outputs: [
    'A stated continuity position per critical service with the obligation quoted.',
    'A priced option set including the cheapest, with the decision and its date recorded.',
    'An exit plan naming data, format, stand-up cost, transition obligations and the uncooperative case.',
    'An annual test with a result, the defects found, and the closure dates.'
  ],
  controls: [
    'Every critical supplier carries a continuity obligation statement and a named owner for the recovery route.',
    'Resilience options are priced and recorded, including the option not taken.',
    'Exit plans are tested at a defined interval, and a plan past its test date is escalated rather than quietly accepted.',
    'Transition obligations survive termination in the contract, with defined cooperation and cost.',
    'A board paper for a critical award states the obligation, the plausible failure, the options and the chosen position.'
  ],
  bestPractices: [
    'Reduce the obligation to one paragraph with the breach consequence, before arguing about cost.',
    'Price the cheapest option too, so the decision shows what was declined and why.',
    'Write the uncooperative-incumbent case; it is the scenario where plans actually fail.',
    'Exercise the plan annually at a defined scope and keep the dated result as the evidence.'
  ],
  mistakes: [
    'Treating insurance as a continuity plan.',
    'An exit plan that assumes the failing supplier will cooperate generously.',
    'Continuity argued as risk appetite because nobody wrote down the obligation.',
    'A plan that has never been exercised being presented to a regulator as assurance.'
  ],
  terms: [
    { term: 'Continuity obligation', def: 'A duty, from a licence or sector rule, to keep a service running and to be able to show how.' },
    { term: 'Exit plan', def: 'A documented, tested route to move a service away from a supplier, including the uncooperative case.' },
    { term: 'Recovery exercise', def: 'A scheduled test of the fallback route that produces dated evidence it works.' },
    { term: 'Transition obligation', def: 'The contractual duty to cooperate on exit, with defined scope, duration and price, surviving termination.' }
  ],

  thinkingPoints: [
    {
      quote: 'The plan nobody had walked.',
      explanation: 'A licensed operation moved a critical processing service to the cheapest compliant bidder and kept the onboarding-era continuity plan unchanged. When that supplier failed, the regulator asked for the continuity plan and the recovery route. The document named an alternative provider and a data format that had since changed, and no one had rehearsed the switch. The remediation programme cost more than the annual saving within a quarter, and the regulator recorded the finding against the obligation rather than against the price.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: an untested plan is a claim, and a regulator asks for evidence rather than intentions.',
      reflectionPrompt: 'For your most critical supplier, when was the recovery route last exercised, who signed the result, and what failed during it?',
    },
    {
      quote: 'The resilience argument that lost to a discount.',
      explanation: 'A dual-source proposal for a constrained service was rejected because the second source cost 14 percent more per unit and the business case was written as a preference between risk appetites. Nobody had reduced the licence obligation to a sentence or priced the plausible failure, so the decision became a debate about appetite. Eighteen months later the single source had a fire, and the same organisation paid spot rates for three months and funded an emergency qualification - a cost several times the 14 percent it had declined.',
      realWorldExample: 'Illustrative example, constructed to show the mechanism: without the obligation quoted and the failure priced, resilience always loses to a visible discount.',
      reflectionPrompt: 'Does your last critical sourcing paper quote the obligation, the plausible failure with its probability, and the cheapest option it declined?',
    }
  ],

  sopSteps: [
    { title: 'Reduce the obligation to one paragraph', role: 'Risk or Compliance',
      desc: 'State what the licence or rule requires about continuity, who enforces it, what evidence would be requested, and what breach actually means. Put that paragraph at the front of every critical sourcing decision.',
      control: 'Critical awards carry the obligation statement, and a decision without it is returned rather than approved.',
      record: 'Obligation statement per critical service with the enforcer and the breach consequence.',
      pitfall: 'Arguing resilience as risk appetite because the duty was never written down.'
    },
    { title: 'Identify the services where failure is a regulated event', role: 'Head of Procurement',
      desc: 'Build the critical register from consequence rather than spend: which failures breach an obligation, harm safety, or stop an essential service, with substitution time and single-source status for each.',
      control: 'The register is defined by consequence and reviewed with the risk function, not by annual spend thresholds alone.',
      record: 'Critical supplier register with consequence class, substitution time and single-source flag.',
      pitfall: 'A register built from spend that omits the small supplier whose failure stops the service.'
    },
    { title: 'Price every resilience option including the cheapest', role: 'Finance',
      desc: 'Cost dual sourcing, defined stock, capacity guarantees, a longer term and the tested fallback, and cost the do-nothing option honestly with the plausible failure and its probability. Show the arithmetic the board is declining.',
      control: 'Continuity papers present a priced option set with the declined options named, not a single recommendation.',
      record: 'Option pricing sheet with the do-nothing case and the decision recorded.',
      pitfall: 'Recommending resilience without showing what it costs, or recommending price without showing what it forgoes.'
    },
    { title: 'Write the exit plan for the uncooperative case', role: 'Operations or Service Owner',
      desc: 'Name the data and configuration needed and in what format, who else could run the service and at what stand-up cost, the transition duration including incompressible qualification, and what happens if the incumbent is insolvent, unhelpful or both.',
      control: 'Exit plans state the uncooperative scenario and are approved by the service owner, not filed by procurement alone.',
      record: 'Exit plan per critical supplier with format, alternative, duration and adverse-case actions.',
      pitfall: 'A plan whose first step is a letter asking the failing supplier for help.'
    },
    { title: 'Put transition obligations in the contract', role: 'Head of Procurement',
      desc: 'Require cooperation on exit with defined scope, duration and price, surviving termination; secure data portability, escrow or licensed access where the service depends on supplier-owned tooling or records.',
      control: 'Critical contracts carry exit obligations that survive termination, tested against the plan before signature.',
      record: 'Transition clause set with scope, duration, price and the portability position.',
      pitfall: 'Discovering at exit that the configuration, the data format and the keys all belong to the supplier.'
    },
    { title: 'Exercise the recovery route on a schedule', role: 'Operations or Service Owner',
      desc: 'Run an annual test at a defined scope - documentation walk-through, partial switch, or full simulated failover - record what failed, and close the defects with dates. Keep the dated result as the evidence.',
      control: 'Each critical service has a test interval, and a plan past its date is escalated to the risk committee.',
      record: 'Exercise report with scope, defects, owners, closure dates and the next test date.',
      pitfall: 'Rehearsing the easy half - the decision - and never the handover.'
    },
    { title: 'Present the decision so it survives both audiences', role: 'Board or Executive Sponsor',
      desc: 'Approve on a paper that quotes the obligation, states the plausible failure and its consequence, shows the priced options including the cheapest, records the chosen position, and names the next test. Keep it dated and retrievable.',
      control: 'The board record shows the trade made deliberately, and the same paper answers a later regulator question.',
      record: 'Approved continuity decision paper with obligation, options, decision and test date.',
      pitfall: 'A decision that exists only as a minuted agreement, with nothing a third party could read.'
    }
  ],

  quizzes: [
    {
      type: 'scenario',
      context: 'A licensed operation must award a critical processing service. Three bids: the cheapest is 12 percent below the others with no tested fallback available; the middle bid includes a documented and exercised transition route; the highest is a dual-source arrangement with a standing second site.',
      q: 'What should the board decide on?',
      options: [
        { text: 'The cheapest, since all three are compliant and the market spoke.', isCorrect: false, rationale: 'Compliance with the tender is not compliance with the continuity obligation, and the fallback is the part the regulator may ask about.' },
        { text: 'On a paper that quotes the obligation, prices the plausible failure, and compares all three including what each forgoes - then records the chosen position and the next test date.', isCorrect: true, rationale: 'Correct. The decision may legitimately be the cheapest bid, but only if the resilience consequence is stated, priced and accepted rather than discovered later.' },
        { text: 'The highest, because dual sourcing is always safer.', isCorrect: false, rationale: 'That substitutes a rule for the arithmetic the obligation actually requires.' },
        { text: 'Defer, because none of the options is perfect.', isCorrect: false, rationale: 'Deferral is itself an unpriced continuity decision.' }
      ],
      principle: 'Decide on the obligation and the priced consequence, not on the ranking alone - and record what was declined.',
    },
    {
      type: 'scenario',
      context: 'An exit plan for a critical supplier reads: request data in the standard format, notify the alternative provider, complete transition within ninety days. Reviewing it, nobody can say when the format was last confirmed or whether the alternative provider has ever seen the configuration.',
      q: 'What is the correct assessment?',
      options: [
        { text: 'Adequate; a documented sequence is what the standard expects.', isCorrect: false, rationale: 'A sequence that has never been tested is a claim, and the regulator asks for the demonstration.' },
        { text: 'Not a plan yet: it assumes cooperation, has no confirmed data format, and no evidence the alternative can stand up. Schedule an exercise, record what fails, and fix the handover detail before it is needed.', isCorrect: true, rationale: 'Correct. The three gaps named - cooperation, format, tested capability - are where real exits fail.' },
        { text: 'Adequate if the contract has a termination-for-convenience clause.', isCorrect: false, rationale: 'A right to leave is not an ability to land.' },
        { text: 'Replace the plan with an insurance position.', isCorrect: false, rationale: 'Insurance pays after; it does not run the service.' }
      ],
      principle: 'An exit plan is only credible if the uncooperative case, the data format and the stand-up cost have been tested.',
    },
    {
      type: 'knowledge',
      q: 'Why should a continuity paper price the option it recommends against?',
      options: [
        { text: 'To satisfy finance policy on optionality.', isCorrect: false, rationale: 'The reason is evidential rather than procedural.' },
        { text: 'Because resilience is invisible while nothing happens, so showing the declined cheap option and the plausible failure is what makes the decision defensible to a cost review and to a regulator.', isCorrect: true, rationale: 'Correct. The record of a reasoned trade is the artefact that survives both audiences.' },
        { text: 'Because regulators set the price of resilience.', isCorrect: false, rationale: 'They set the duty, not the price.' },
        { text: 'So the supplier can see the alternative.', isCorrect: false, rationale: 'That is negotiation, not governance.' }
      ],
      principle: 'Show what you declined and why; that is the difference between a decision and a preference.',
    },
    {
      type: 'knowledge',
      q: 'What is a transition obligation that actually helps at exit?',
      options: [
        { text: 'A right to terminate on ninety days notice.', isCorrect: false, rationale: 'That is the ability to leave, not to continue.' },
        { text: 'A contractual duty to cooperate on exit with defined scope, duration and price, surviving termination, plus data portability or licensed access to what the service depends on.', isCorrect: true, rationale: 'Correct. Enforceable cooperation and portable assets are the two things that make a move possible.' },
        { text: 'A penalty payable by the supplier for poor service.', isCorrect: false, rationale: 'That compensates rather than continues.' },
        { text: 'An annual review meeting with the account team.', isCorrect: false, rationale: 'Governance is useful; it is not a handover mechanism.' }
      ],
      principle: 'Write the obligations that survive termination, because that is the only moment they are needed.',
    },
    {
      type: 'scenario',
      context: 'A risk review finds that eleven critical services each have an exit plan, none exercised in two years, and three rely on a supplier now in financial distress. The CFO asks why resilience was not cheaper.',
      q: 'What is the correct executive response?',
      options: [
        { text: 'Accept the criticism and consolidate to fewer suppliers to cut cost.', isCorrect: false, rationale: 'That reduces cost and increases regulated exposure at the same time, without pricing either.' },
        { text: 'Put the obligation paragraph, the priced option set and the exercise schedule in front of the board, prioritise the three distressed cases, and record the decision including what was declined.', isCorrect: true, rationale: 'Correct. The answer to a cost challenge is the arithmetic and the duty, plus dated action on the highest-exposure cases.' },
        { text: 'Ask procurement to re-tender the eleven services.', isCorrect: false, rationale: 'Tendering does not fix untested fallbacks and may take longer than the distress lasts.' },
        { text: 'Rely on the suppliers own business continuity documents.', isCorrect: false, rationale: 'Their plan protects them; the obligation is yours.' }
      ],
      principle: 'When resilience is challenged on cost, answer with the obligation, the priced options and the dated test plan.',
    }
  ],
  relSop: 'sop-contract-renewal',
  rel: {
    concepts: ['essential-service-continuity-duty', 'business-continuity', 'step-in-and-contingency', 'vendor-lockin-and-portability', 'supply-chain-risk', 'concentration-risk'],
    sops: ['sop-contract-renewal', 'sop-emergency-procurement', 'sop-supplier-performance-management', 'sop-contract-review'],
    checklists: ['cl-contract-renewal', 'cl-emergency-procurement', 'cl-supplier-risk-review'],
    templates: ['tpl-contract-renewal-assessment', 'tpl-emergency-justification', 'tpl-supplier-risk-assessment'],
    calcs: ['calc-multi-year-contract-cost', 'calc-supplier-concentration'],
    decisions: ['renew-vs-resource', 'dual-source', 'supplier-concentration'],
    kpis: ['kpi-otd', 'kpi-otif', 'kpi-contract-compliance'],
    glossary: ['gloss-sla', 'gloss-run-rate', 'gloss-cost-to-serve']
  },
  labMission: {
    title: 'Mission 27.3: Turn One Continuity Plan into Evidence',
    desc: 'Take the most critical supplier you have and test what you would actually do on Monday.',
    tasks: [
      'Write the one-paragraph obligation statement for your most critical service: what is required, who enforces it, what evidence would be asked for, what breach means.',
      'Price three options for it - cheapest single source, tested fallback, dual source - including what each forgoes, and note which you would defend at a board.',
      'Read the current exit plan for that supplier and answer three questions: does it assume cooperation, is the data format confirmed, has anyone exercised the switch? Schedule the test.'
    ],
    ctaLabel: 'Open Multi-Year Contract Cost',
    ctaHref: '#/calc/calc-multi-year-contract-cost',
    secondaryLabel: 'Open the Supplier Risk Review Checklist',
    secondaryHref: '#/cl/cl-supplier-risk-review'
  }
});
