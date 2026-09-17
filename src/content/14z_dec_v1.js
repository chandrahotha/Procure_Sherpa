/* ============ Decision guides (Section 21, converted + authored) ============ */
/* shape: i id, t title, c category, n intro, q question, x reasoning, f factors[{q,hint,w}], o options[{k,label,desc}], ft follow-through, rel */
PS.SDEC({
  i: 'make-or-buy', t: 'Make or Buy?', c: 'Sourcing',
  n: 'Decide whether to produce a good or service internally or source it from an external supplier. This affects cost structure, capability building and supply risk.',
  q: 'Should this item be manufactured/built internally or purchased from an external supplier?',
  x: 'Internal production gives control and avoids supplier dependency, but usually carries higher fixed cost, slower scale-up and less focus on core competence. External supply is usually lower unit cost at volume but adds supplier risk and transaction overhead.',
  f: [
    { q: 'Is producing this in-house a core competence or strategic differentiator for your organisation?', w: { make: 3, buy: -2 } },
    { q: 'Is your internal capacity, skills and quality track record sufficient to meet demand reliably?', w: { make: -2, buy: 3 } },
    { q: 'Does the supplier market offer genuine competition and reasonable terms?', w: { make: -2, buy: 3 } },
    { q: 'Are volumes and demand stable enough to justify internal fixed investment?', hint: 'Volatile demand penalises capital-heavy internal build.', w: { make: -3, buy: 2 } },
    { q: 'Do you need speed to market now, or control over future innovation and IP?', w: { make: 1, buy: -1 } },
    { q: 'Are the total costs (including overhead, capital and risk) lower inside or outside?', w: { make: -2, buy: 3 } }
  ],
  o: [
    { k: 'make', label: 'Make in-house', desc: 'Produce internally. Best when it is a core differentiator, you have spare capacity, or need tight IP control.' },
    { k: 'buy', label: 'Buy externally', desc: 'Source from a supplier. Best when the market is competitive, volumes are volatile, or it is not a core activity.' },
    { k: 'hybrid', label: 'Hybrid', desc: 'Keep a small internal line or partner arrangement. Best when you need some control but cannot fully resource internal production.' }
  ],
  ft: ['If buying, qualify suppliers and run a quote comparison.', 'If making, confirm the investment case before committing capital.'],
  rel: { calcs: ['calc-should-cost', 'calc-tco', 'calc-make-vs-buy'], sops: ['sop-sourcing-strategy', 'sop-commercial-evaluation'] }
});
PS.SDEC({
  i: 'sourcing-method', t: 'What sourcing method?', c: 'Sourcing',
  n: 'Choose the right solicitation type for your requirement up front to save time and avoid rewriting documents later.',
  q: 'Which sourcing approach fits this requirement?',
  x: 'RFI is for learning about the market; RFQ is for clear specs where price is the main differentiator; RFP is for complex or innovative work where the solution design matters.',
  f: [
    { q: 'Is the requirement clearly specified and unlikely to change?', hint: 'Unclear requirements mean you need an RFI first.', w: { rfp: 2, rfi: 3, rfq: -2 } },
    { q: 'Is price the main (or only) evaluation criterion?', w: { rfq: 3, rfp: -2, rfi: -1 } },
    { q: 'Is the technical solution or provider innovation important to the outcome?', w: { rfp: 3, rfq: -2, rfi: -1 } },
    { q: 'Do you need market information before you can even write the requirement?', w: { rfi: 3, rfp: -1, rfq: -1 } },
    { q: 'Are the services complex, long-term or outcome-based?', w: { rfp: 2, rfq: -2 } },
    { q: 'Can you identify enough qualified suppliers to run a fair competition?', w: { direct: 2, rfp: -1, rfq: -2 } }
  ],
  o: [
    { k: 'rfi', label: 'RFI - Request for Information', desc: 'Gather market intelligence, capabilities and pricing ranges before defining requirements.' },
    { k: 'rfq', label: 'RFQ - Request for Quotation', desc: 'Clear specifications, price-based evaluation. Fast and focused.' },
    { k: 'rfp', label: 'RFP - Request for Proposal', desc: 'Complex requirements where technical approach, innovation and commercial terms are both evaluated.' },
    { k: 'direct', label: 'Direct negotiation / single source', desc: 'Only when the market is genuinely constrained or urgency rules out a competition.' }
  ],
  ft: ['Check your organisation\'s approval matrix for the threshold that applies to your chosen method.', 'Open the relevant SOP and the matching template.'],
  });
PS.SDEC({
  i: 'rfq-or-rfp', t: 'RFQ or RFP?', c: 'Sourcing',
  n: 'A quick narrowing of the sourcing-method decision, focused on whether an RFQ or an RFP is the better vehicle.',
  q: 'For this clearly-defined need, is an RFQ or an RFP the right call?',
  x: 'Use an RFQ when the specification is firm and suppliers are quoting against the same spec. Use an RFP when suppliers need to propose a solution, manage ambiguity, or when criteria beyond price carry weight.',
  f: [
    { q: 'Are the technical specifications already written and unlikely to change?', w: { rfq: 3, rfp: -3 } },
    { q: 'Will you evaluate primarily on price?', w: { rfq: 3, rfp: -3 } },
    { q: 'Do suppliers need to propose their own technical approach?', w: { rfq: -3, rfp: 3 } },
    { q: 'Are service levels, warranty or innovation part of the decision?', w: { rfq: -2, rfp: 3 } },
    { q: 'Is the scope likely to evolve during the contract?', hint: 'Evolving scope needs the flexibility an RFP buys you.', w: { rfq: -2, rfp: 3 } }
  ],
  o: [
    { k: 'rfq', label: 'RFQ', desc: 'Shorter, price-focused. Use the RFQ template and the Quote Comparison calculator.' },
    { k: 'rfp', label: 'RFP', desc: 'Fuller, solution-focused. Use the RFP template and a weighted evaluation matrix.' }
  ],
  ft: ['Load the RFQ or RFP template from the Templates section.', 'If RFQ, prepare to compare quotes side by side.'],
  rel: { sops: ['sop-rfq', 'sop-rfp'], templates: ['tpl-rfq', 'tpl-rfp'] }
});
PS.SDEC({
  i: 'rfi-or-rfq', t: 'RFI or RFQ?', c: 'Sourcing',
  n: 'Decide whether to start with an RFI (to learn the market) or go straight to an RFQ (when you already know what you want).',
  q: 'Do you need an RFI first, or can you go straight to quotation?',
  x: 'An RFI is an investment in reducing later risk. Skip it only when the specification is mature, the market is well understood, and price is the dominant criterion.',
  f: [
    { q: 'Are you confident the technical specification is complete and correct?', hint: 'A poor spec invites bad quotes regardless of process.', w: { rfq: 3, rfi: -2 } },
    { q: 'Do you know at least three qualified suppliers and their capabilities?', w: { rfq: 3, rfi: -3 } },
    { q: 'Is the item or service new to your organisation?', hint: 'New items almost always benefit from an RFI first.', w: { rfi: 3, rfq: -3 } },
    { q: 'Would a wrong specification be costly or dangerous?', hint: 'High consequence favours an RFI to de-risk.', w: { rfi: 3, rfq: -3 } },
    { q: 'Is time more valuable than reducing future risk here?', w: { rfq: 2, rfi: -2 } }
  ],
  o: [
    { k: 'rfi', label: 'Start with an RFI', desc: 'Run an RFI to confirm supplier capabilities and market options, then convert findings into an RFQ/RFP.' },
    { k: 'rfq', label: 'Go straight to RFQ', desc: 'Specification and market are mature enough to quote directly.' }
  ],
  ft: ['If you ran an RFI, archive its findings in the sourcing strategy before issuing the RFQ.'],
  rel: { sops: ['sop-rfq'], templates: ['tpl-rfq'] }
});
PS.SDEC({
  i: 'competitive-or-single', t: 'Competitive bid or single source?', c: 'Sourcing',
  n: 'Decide whether to run a competitive process or buy from a single supplier, and what justification you need.',
  q: 'Should you run a competition or use a single supplier here?',
  x: 'Competitive sourcing drives price and protects against bias. Single source is acceptable only when the market genuinely cannot support a competition - and it usually requires extra approval.',
  f: [
    { q: 'Are there at least two capable, willing and independent suppliers?', hint: 'Competition requires real options.', w: { competitive: 3, single: -3 } },
    { q: 'Is the total value above your organisation\'s competitive threshold?', w: { competitive: 3, single: -3 } },
    { q: 'Has the supplier performed well repeatedly and invested in fit-for-purpose capability?', w: { competitive: -2, single: 2 } },
    { q: 'Is there urgency that a competition would delay unacceptably?', hint: 'Urgency alone rarely justifies skipping competition.', w: { competitive: -1, single: 1 } },
    { q: 'Does the supplier have unique IP, patents or compatibility that block alternatives?', hint: 'True uniqueness is the legitimate basis for single source.', w: { competitive: -3, single: 3 } }
  ],
  o: [
    { k: 'competitive', label: 'Run a competition', desc: 'Issue an RFQ/RFP. Lower risk and better price discovery.' },
    { k: 'single', label: 'Single source (with justification)', desc: 'Only with a documented single-source justification form and approval.' }
  ],
  ft: ['If single source, complete a Single-Source Justification template and obtain the required approval.', 'If competitive, keep records of why alternatives were not viable.'],
    rel: { sops: ['sop-single-source', 'sop-commercial-evaluation'], templates: ['tpl-single-source-justification'] }
});
PS.SDEC({
  i: 'unit-or-tco', t: 'Unit price or TCO?', c: 'Commercial',
  n: 'Decide whether a low unit price is the right basis, or whether you should compare total cost of ownership first.',
  q: 'Is a low unit price enough, or do you need to look at total cost of ownership?',
  x: 'For simple, short-life, commodity items a unit price comparison is fine. For assets, services with ongoing costs, or long relationships, TCO catches the real spend.',
  f: [
    { q: 'Is this an asset with a life beyond one year?', w: { tco: 3, unit: -3 } },
    { q: 'Are running, service, maintenance or disposal costs significant?', w: { tco: 3, unit: -3 } },
    { q: 'Is the supplier relationship expected to last more than two years?', w: { tco: 3, unit: -2 } },
    { q: 'Are the items interchangeable commodities?', hint: 'True commodities can be priced on the unit alone.', w: { tco: -2, unit: 3 } },
    { q: 'Do differences in warranty, installation or service matter to the outcome?', w: { tco: 3, unit: -2 } }
  ],
  o: [
    { k: 'unit', label: 'Unit price comparison', desc: 'Use the Compare Quotes calculator. Good for simple, short-life purchases.' },
    { k: 'tco', label: 'TCO comparison', desc: 'Use the TCO calculator to bring future costs into today\'s terms.' }
  ],
  ft: ['If TCO, run the Total Cost of Ownership calculator with your real cost of capital and a defensible residual value.'],
  rel: { calcs: ['calc-tco', 'calc-compare-quotes', 'calc-should-cost'] }
});
PS.SDEC({
  i: 'accept-price-increase', t: 'Accept a price increase?', c: 'Negotiation',
  n: 'When a supplier proposes a price increase, decide whether to accept, push back, or open a re-sourcing conversation - with numbers behind the position.',
  q: 'Should you accept this supplier price increase?',
  x: 'An increase is reasonable when backed by a contract clause, a recognised index, or real cost pressure you cannot source away from. Unjustified increases are negotiation levers, not decisions to make in isolation.',
  f: [
    { q: 'Is there an escalation or index clause in the contract this increase relies on?', hint: 'A valid clause does not automatically mean the number is fair.', w: { accept: 2, fight: -2 } },
    { q: 'Is the requested increase within or above market inflation?', hint: 'Above-market increases need strong justification.', w: { accept: -2, fight: 2 } },
    { q: 'Do you have at least two ready alternative suppliers who could take volume?', hint: 'Genuine alternatives give you leverage.', w: { accept: -3, fight: 3 } },
    { q: 'Is this supplier a mission-critical single source with no fallback?', hint: 'Critical sole source reduces your BATNA.', w: { accept: 3, fight: -3 } },
    { q: 'Has supplier performance been acceptable in the last contract period?', hint: 'Poor performance weakens the supplier\'s case.', w: { accept: -2, fight: 2 } },
    { q: 'Is the increase larger than your savings or budget headroom this year?', w: { accept: -2, fight: 1 } }
  ],
  o: [
    { k: 'accept', label: 'Accept the increase', desc: 'When contractually warranted, market-aligned, and you lack alternatives. Document the rationale.' },
    { k: 'fight', label: 'Push back / negotiate', desc: 'Challenge the basis, bring alternatives, and trade the increase for something of value.' },
    { k: 're-source', label: 'Open a re-source', desc: 'If the increase is large and unjustified, treat it as a signal to re-test the market.' }
  ],
  ft: ['Run the Price Increase calculator to quantify the increase.', 'Run the Price Escalation calculator to model compounding.', 'If fighting, use the Negotiation Savings calculator to size your counter-offer.'],
  rel: { calcs: ['calc-price-increase', 'calc-price-escalation', 'calc-negotiation-savings'], sops: ['sop-negotiation-execution'] }
});
PS.SDEC({
  i: 'negotiate-or-accept', t: 'Negotiate or accept?', c: 'Negotiation',
  n: 'After receiving quotes, decide whether to accept the lowest bid as-is or negotiate it further.',
  q: 'Do you accept the best quote as-is, or negotiate?',
  x: 'Accept when the quote is already strong, the market is competitive, and the relationship is unimportant. Negotiate when there is real spread to close, the supplier is strategic, or terms need improving.',
  f: [
    { q: 'Is there meaningful price or term spread between the top quotes?', w: { negotiate: 2, accept: -2 } },
    { q: 'Is this a one-off purchase of a commodity?', hint: 'One-off commodities rarely justify negotiation effort.', w: { negotiate: -2, accept: 2 } },
    { q: 'Is the supplier strategic or a long-term partner?', w: { negotiate: 3, accept: -1 } },
    { q: 'Do you have time and internal buy-in for a negotiation round?', w: { negotiate: -2, accept: 2 } },
    { q: 'Are payment terms or service levels worth improving?', w: { negotiate: 3, accept: -2 } }
  ],
  o: [
    { k: 'accept', label: 'Accept the quotation', desc: 'Award to the best offer. Move straight to contract/PO.' },
    { k: 'negotiate', label: 'Negotiate further', desc: 'Open discussions with the preferred supplier on price, terms and service.' }
  ],
  ft: ['If negotiating, load the Negotiation Planner template and capture concessions in the concession log.'],
    rel: { sops: ['sop-negotiation-execution'], templates: ['tpl-negotiation-planner', 'tpl-negotiation-concession-log'], calcs: ['calc-negotiation-savings'] }
});
PS.SDEC({
  i: 're-source', t: 'Re-source this supplier?', c: 'Sourcing',
  n: 'Decide whether to put a supplier\'s work back to market based on performance and market conditions.',
  q: 'Should this category or supplier be re-sourced now?',
  x: 'Re-sourcing is a deliberate market test. Do it when performance has failed, the contract is due, the market has moved, or you have not competitively sourced in over two cycles.',
  f: [
    { q: 'Has supplier performance missed target for two consecutive periods?', hint: 'Pattern failure, not a single incident, triggers re-sourcing.', w: { resourcing: 3, keep: -3 } },
    { q: 'Is the contract up for renewal within the next year?', w: { resourcing: 2, keep: -1 } },
    { q: 'Has the market clearly shifted (new entrants, lower prices, better terms)?', w: { resourcing: 2, keep: -2 } },
    { q: 'Would switching costs exceed any available benefit?', hint: 'High switching costs can make renewal the better path.', w: { resourcing: -3, keep: 2 } },
    { q: 'Is the supplier a single source with no ready alternative?', w: { resourcing: -3, keep: 2 } }
  ],
  o: [
    { k: 'resourcing', label: 'Re-source now', desc: 'Open a competitive process. Update the sourcing strategy and run an RFx.' },
    { k: 'keep', label: 'Keep supplier, fix issues', desc: 'Address root causes through a performance plan instead of a full re-source.' }
  ],
  ft: ['Run a Supplier Performance Review before deciding.', 'Refresh the savings baseline before issuing the RFx.'],
  rel: { sops: ['sop-supplier-performance-management', 'sop-sourcing-strategy'], calcs: ['calc-savings-analysis'] }
});
PS.SDEC({
  i: 'renew-vs-resource', t: 'Renew or re-source at contract end?', c: 'Contracts',
  n: 'At contract expiry, decide whether to renew with the incumbent or re-source to the market.',
  q: 'Renew with the incumbent or re-source this contract?',
  x: 'Renewal is cheaper operationally but risks complacency and price creep. Re-sourcing resets leverage but costs effort and may disrupt service.',
  f: [
    { q: 'Has the incumbent met or exceeded all KPI and SLA targets?', hint: 'Strong performance supports renewal.', w: { renew: 2, resourcing: -2 } },
    { q: 'Was the contract competitively sourced originally?', w: { renew: -2, resourcing: 2 } },
    { q: 'Has the market moved in price or capability since the last competition?', w: { renew: -1, resourcing: 2 } },
    { q: 'Is renewal cheaper than the disruption and cost of re-sourcing?', hint: 'Include transition and switching costs.', w: { renew: 2, resourcing: -2 } },
    { q: 'Are you dependent on this supplier with no viable alternative?', hint: 'Dependency raises the renewal default.', w: { renew: 3, resourcing: -3 } }
  ],
  o: [
    { k: 'renew', label: 'Renew with incumbent', desc: 'Lower effort, known performance. Lock in new agreement on price and service.' },
    { k: 'resourcing', label: 'Re-source to market', desc: 'Full competition. Highest leverage but more effort and risk.' }
  ],
  ft: ['Either way, run a Supplier Performance Review before the renewal meeting.', 'If re-sourcing, update the savings baseline and document expected benefit.'],
  rel: { sops: ['sop-contract-renewal', 'sop-supplier-performance-management'], calcs: ['calc-negotiation-savings'] }
});
PS.SDEC({
  i: 'approve-exception', t: 'Approve an exception?', c: 'Governance',
  n: 'Decide whether a non-standard procurement request (over threshold, no competition, off-contract) should be approved as an exception.',
  q: 'Should this procurement exception be approved?',
  x: 'Exceptions exist for genuine edge cases. Approve only when the business case, risk mitigation and approval chain are all documented; deny by default when the shortcut is just easier.',
  f: [
    { q: 'Is there a documented business case showing why the normal process cannot apply?', hint: 'No business case means no approval.', w: { approve: 2, deny: -3 } },
    { q: 'Have all feasible alternatives within policy been ruled out?', hint: 'If policy-compliant alternatives work, there is no exception.', w: { approve: -2, deny: 3 } },
    { q: 'Has the risk been assessed and a mitigation owner assigned?', hint: 'Unmitigated risk is a reason to deny.', w: { approve: 2, deny: -2 } },
    { q: 'Is the value or risk above the level requiring executive approval?', w: { approve: 1, deny: 0 } },
    { q: 'Is the urgency real and externally driven (not internal planning failure)?', hint: 'Internal poor planning is not an exception.', w: { approve: 2, deny: -2 } }
  ],
  o: [
    { k: 'approve', label: 'Approve the exception', desc: 'Only with full documentation, risk sign-off and the appropriate approval level.' },
    { k: 'deny', label: 'Deny / require standard process', desc: 'Send it back through the normal procurement route.' }
  ],
  ft: ['Complete an Exception Approval checklist and file the business case before any PO is raised.'],
    rel: { sops: ['sop-procurement-exception'], checklists: ['cl-exception-approval'] }
});
PS.SDEC({
  i: 'framework-agreement', t: 'Framework agreement or direct award?', c: 'Sourcing',
  n: 'Decide whether to set up a multi-supplier framework (which enables future direct awards) or just buy now.',
  q: 'Set up a framework agreement, or award once now?',
  x: 'A framework is worth the upfront cost when you expect repeat spend from multiple buyers. A direct award is fine for a single, well-defined transaction.',
  f: [
    { q: 'Do multiple teams expect to buy this category in the next 1-3 years?', hint: 'Repeat demand justifies framework setup cost.', w: { framework: 3, direct: -3 } },
    { q: 'Is the category value over your threshold for mandated competition?', w: { framework: 2, direct: -2 } },
    { q: 'Are the requirements stable enough to write reusable terms?', hint: 'Volatile requirements make frameworks hard to maintain.', w: { framework: -2, direct: 2 } },
    { q: 'Is the total setup effort worth the expected repeat savings?', w: { framework: 2, direct: -1 } }
  ],
  o: [
    { k: 'framework', label: 'Framework agreement', desc: 'Run one competition to create a multi-supplier agreement for future call-offs.' },
    { k: 'direct', label: 'Award once now', desc: 'Single transaction. Keep records in case future volume needs a framework.' }
  ],
  ft: ['If framework, use the Award Recommendation template to record the winner and reserves.'],
  rel: { sops: ['sop-contract-award'], templates: ['tpl-award-recommendation'] }
});
PS.SDEC({
  i: 'supplier-concentration', t: 'Too much spend with one supplier?', c: 'Risk',
  n: 'Assess whether your concentration of spend with a supplier is a risk worth actively reducing.',
  q: 'Is this supplier too big a share of your spend?',
  x: 'Concentration creates leverage for the supplier, single points of failure, and weakens your BATNA. Above ~40% of relevant spend usually warrants mitigation.',
  f: [
    { q: 'Does this supplier account for more than 20% of your relevant category spend?', hint: '20-40% starts to concentrate risk.', w: { reduce: 2, ok: -2 } },
    { q: 'Is there a single supplier above 40% of this category spend?', hint: 'Above 40% is high concentration.', w: { reduce: 3, ok: -3 } },
    { q: 'Does the supplier have few or no real alternatives in the market?', hint: 'No alternatives raise the risk sharply.', w: { reduce: 3, ok: -3 } },
    { q: 'Is this a mission-critical item with no workaround?', hint: 'Criticality plus concentration is a high-risk mix.', w: { reduce: 2, ok: -2 } },
    { q: 'Has the supplier been acquired or shown financial stress recently?', hint: 'Financial stress on a concentrated supplier multiplies risk.', w: { reduce: 3, ok: -2 } }
  ],
  o: [
    { k: 'ok', label: 'Concentration is acceptable', desc: 'Monitor quarterly. Document the justification.' },
    { k: 'reduce', label: 'Reduce concentration', desc: 'Plan to bring in an alternative supplier and shift volume gradually.' }
  ],
  ft: ['Run the Supplier Scorecard to document why an alternative has not been viable.', 'If reducing, build it into the next sourcing strategy.'],
  rel: { calcs: ['calc-supplier-concentration', 'calc-supplier-scorecard'], sops: ['sop-supplier-segmentation', 'sop-supplier-due-diligence'] }
});
PS.SDEC({
  i: 'supplier-financial-risk', t: 'Is the supplier financially at risk?', c: 'Risk',
  n: 'When a supplier shows financial stress, decide whether to act now (mitigate) or continue.',
  q: 'Should you act on this supplier\'s financial condition?',
  x: 'Financial risk is a leading indicator of supply disruption. Act when probability and impact are both meaningful; monitor when impact is low.',
  f: [
    { q: 'Has the supplier missed payments or breached financial covenants?', hint: 'Hard signals are a strong trigger to act.', w: { act: 3, monitor: -3 } },
    { q: 'Is the item mission-critical with no close substitute?', hint: 'Criticality plus financial stress raises the stakes.', w: { act: 3, monitor: -2 } },
    { q: 'Have you already allocated significant multi-year value to this supplier?', w: { act: 2, monitor: -1 } },
    { q: 'Does the supplier have viable financial backing (parent, insurance, bonds)?', hint: 'Backing can buy time to find alternatives.', w: { act: -2, monitor: 2 } },
    { q: 'Can you absorb a disruption or source an alternative within your lead time?', hint: 'Low impact may justify monitoring only.', w: { act: -2, monitor: 2 } }
  ],
  o: [
    { k: 'act', label: 'Act now', desc: 'Trigger a contingency: expedite an alternative, reduce dependency, or accelerate re-sourcing.' },
    { k: 'monitor', label: 'Monitor and plan', desc: 'Watch financial indicators closely and prepare an exit plan.' }
  ],
  ft: ['If acting, document the decision and the alternative plan; update the risk register.'],
  rel: { sops: ['sop-supplier-due-diligence'], checklists: ['cl-supplier-due-diligence'] }
});
PS.SDEC({
  i: 'competitive-vs-single', t: 'Competitive or single source?', c: 'Sourcing',
  n: 'Decide whether to compete this purchase or single-source it, and what justification you need.',
  q: 'Compete this purchase or single-source it?',
  x: 'Even when a strong incumbent exists, an uncompeted award needs a defensible reason. Default to competition unless uniqueness or urgency overrides.',
  f: [
    { q: 'Are at least two capable suppliers available?', w: { compete: 3, single: -3 } },
    { q: 'Is this above your organisation\'s competitive bidding threshold?', w: { compete: 3, single: -3 } },
    { q: 'Does one supplier hold unique IP or compatibility others cannot match?', hint: 'True uniqueness can justify single source.', w: { compete: -3, single: 3 } },
    { q: 'Is there real urgency?', hint: 'Urgency alone is rarely enough without uniqueness.', w: { compete: -1, single: 1 } }
  ],
  o: [
    { k: 'compete', label: 'Competitive process', desc: 'Run an RFQ or RFP.' },
    { k: 'single', label: 'Single source', desc: 'Requires a Single-Source Justification and approval.' }
  ],
  ft: ['If single source, complete and approve the Single-Source Justification template before awarding.'],
  rel: { templates: ['tpl-single-source-justification'], sops: ['sop-single-source'] }
});
PS.SDEC({
  i: 'framework-agreement', t: 'Framework agreement or direct award?', c: 'Sourcing',
  n: 'Decide whether to set up a multi-supplier framework (enabling future direct awards) or just buy now.',
  q: 'Set up a framework agreement, or award once now?',
  x: 'A framework is worth the upfront effort when you expect repeat spend from multiple buyers. A direct award suits a single, well-defined transaction.',
  f: [
    { q: 'Do multiple teams expect to buy this category in the next 1-3 years?', hint: 'Repeat demand justifies framework setup cost.', w: { framework: 3, direct: -3 } },
    { q: 'Is the category value over your threshold for mandated competition?', w: { framework: 2, direct: -2 } },
    { q: 'Are the requirements stable enough to write reusable terms?', hint: 'Volatile requirements make frameworks hard to maintain.', w: { framework: -2, direct: 2 } },
    { q: 'Is the total setup effort worth the expected repeat savings?', w: { framework: 2, direct: -1 } }
  ],
  o: [
    { k: 'framework', label: 'Framework agreement', desc: 'Run one competition to create a multi-supplier agreement for future call-offs.' },
    { k: 'direct', label: 'Award once now', desc: 'Single transaction. Keep records in case future volume needs a framework.' }
  ],
  ft: ['If framework, use the Award Recommendation template to record the winner and reserves.'],
    rel: { sops: ['sop-contract-award'], templates: ['tpl-award-recommendation'] }
});
PS.SDEC({
  i: 'consolidate-suppliers', t: 'Consolidate suppliers?', c: 'Sourcing',
  n: 'Decide whether to reduce the number of suppliers in a category for leverage and simplicity.',
  q: 'Should you consolidate your supplier base?',
  x: 'Consolidation can lower unit cost and reduce management overhead, but it also creates concentration risk. Do it where competition remains healthy.',
  f: [
    { q: 'Do you have many small suppliers in the same category with fragmented spend?', hint: 'Fragmentation is the classic consolidation case.', w: { consolidate: 3, keep: -2 } },
    { q: 'Does your spend with the smaller suppliers add up to meaningful volume?', hint: 'Small, low-value fragmentation may not be worth consolidating.', w: { consolidate: -1, keep: 2 } },
    { q: 'Would consolidating create a concentration risk above acceptable thresholds?', hint: 'Creating a monopoly risk is dangerous.', w: { consolidate: -3, keep: 3 } },
    { q: 'Are the incumbent suppliers performing well on quality and delivery?', hint: 'Poor performers should be replaced, not consolidated.', w: { consolidate: 1, keep: -1 } },
    { q: 'Do you have the leverage (volume) to win better terms from fewer suppliers?', hint: 'Without leverage, consolidation will not pay off.', w: { consolidate: 2, keep: -3 } }
  ],
  o: [
    { k: 'consolidate', label: 'Consolidate', desc: 'Move volume onto fewer pre-qualified suppliers and retire the rest.' },
    { k: 'keep', label: 'Keep current base', desc: 'Maintain supplier diversity. Address performance issues directly.' }
  ],
  ft: ['If consolidating, run a Supplier Scorecard first to validate retained suppliers.', 'Document expected savings baseline before the move.'],
  rel: { sops: ['sop-supplier-segmentation', 'sop-commercial-evaluation'], calcs: ['calc-supplier-scorecard', 'calc-savings-analysis'] }
});
PS.SDEC({
  i: 'supplier-concentration', t: 'Too much spend with one supplier?', c: 'Risk',
  n: 'Assess whether your concentration of spend with a supplier is a risk worth actively reducing.',
  q: 'Is this supplier too big a share of your spend?',
  x: 'Concentration gives the supplier leverage, creates a single point of failure, and weakens your BATNA. Above ~40% of relevant spend usually warrants mitigation.',
  f: [
    { q: 'Does this supplier account for more than 20% of your relevant category spend?', hint: '20-40% starts to concentrate risk.', w: { reduce: 2, ok: -2 } },
    { q: 'Is a single supplier above 40% of this category spend?', hint: 'Above 40% is high concentration.', w: { reduce: 3, ok: -3 } },
    { q: 'Does the supplier have few or no real alternatives in the market?', hint: 'No alternatives raise the risk sharply.', w: { reduce: 3, ok: -3 } },
    { q: 'Is this a mission-critical item with no workaround?', hint: 'Criticality plus concentration is a high-risk mix.', w: { reduce: 2, ok: -2 } },
    { q: 'Has the supplier been acquired or shown financial stress recently?', hint: 'Financial stress on a concentrated supplier multiplies risk.', w: { reduce: 3, ok: -2 } }
  ],
  o: [
    { k: 'ok', label: 'Concentration is acceptable', desc: 'Monitor quarterly and document the justification.' },
    { k: 'reduce', label: 'Reduce concentration', desc: 'Plan to bring in an alternative supplier and shift volume gradually.' }
  ],
  ft: ['Run the Supplier Scorecard to document why an alternative is not yet viable.', 'If reducing, build it into the next sourcing strategy.'],
    rel: { calcs: ['calc-supplier-concentration', 'calc-supplier-scorecard'], sops: ['sop-supplier-segmentation', 'sop-supplier-due-diligence'] }
});
PS.SDEC({
  i: 'supplier-financial-risk', t: 'Is the supplier financially at risk?', c: 'Risk',
  n: 'When a supplier shows financial stress, decide whether to act now (mitigate) or continue monitoring.',
  q: 'Should you act on this supplier\'s financial condition?',
  x: 'Financial difficulty is a leading indicator of supply disruption. Act when probability and impact are both meaningful; monitor when impact is low.',
  f: [
    { q: 'Has the supplier missed payments or breached financial covenants?', hint: 'Hard signals strongly favour acting.', w: { act: 3, monitor: -3 } },
    { q: 'Is the item mission-critical with no close substitute?', hint: 'Criticality plus stress raises the stakes.', w: { act: 3, monitor: -2 } },
    { q: 'Have you allocated significant spend or multi-year value to this supplier?', w: { act: 2, monitor: -1 } },
    { q: 'Does the supplier have viable financial backing (parent, insurance, bonds)?', hint: 'Backing can buy time to secure alternatives.', w: { act: -2, monitor: 2 } },
    { q: 'Can you absorb a disruption or source an alternative within your lead time?', hint: 'Low impact may justify monitoring only.', w: { act: -2, monitor: 2 } }
  ],
  o: [
    { k: 'act', label: 'Act now', desc: 'Trigger a contingency: expedite an alternative, reduce dependency, or accelerate re-sourcing.' },
    { k: 'monitor', label: 'Monitor and plan', desc: 'Watch financial indicators closely and prepare an exit plan.' }
  ],
  ft: ['If acting, document the decision and the alternative plan; update the risk register.'],
  rel: { sops: ['sop-supplier-due-diligence'], checklists: ['cl-supplier-due-diligence'] }
});
PS.SDEC({
  i: 'dual-source', t: 'Dual source or single source?', c: 'Risk',
  n: 'Decide whether to split volume between two suppliers (dual sourcing) or commit to one.',
  q: 'Should you dual-source this item or go single?',
  x: 'Dual sourcing hedges supply and price risk but usually costs more per unit and more to manage. Single source is cheaper at volume but concentrates risk.',
  f: [
    { q: 'Is supply disruption likely or very costly?', hint: 'High disruption risk favours dual sourcing.', w: { dual: 3, single: -3 } },
    { q: 'Are price swings likely and material to budget?', hint: 'Price volatility favours a second source.', w: { dual: 2, single: -2 } },
    { q: 'Can one supplier meet all demand reliably on its own?', hint: 'If yes, single source can win on cost.', w: { dual: -2, single: 3 } },
    { q: 'Is MOQ or minimum batch size high enough that splitting volume penalises both?', hint: 'High MOQ can make dual sourcing expensive.', w: { dual: -2, single: 2 } },
    { q: 'Are you in a short-term buy (under two years)?', hint: 'Short term rarely justifies the overhead of dual sourcing.', w: { dual: -3, single: 2 } }
  ],
  o: [
    { k: 'dual', label: 'Dual source', desc: 'Split volume between two qualified suppliers. Requires scorecards and clear split rules.' },
    { k: 'single', label: 'Single source', desc: 'Commit to one supplier. Requires a strong risk and performance management plan.' }
  ],
  ft: ['For either choice, use the Supplier Scorecard calculator to set objective performance gates.', 'For dual source, run the MOQ calculator to confirm the volume split is economic.'],
  rel: { sops: ['sop-supplier-qualification', 'sop-single-source'], calcs: ['calc-supplier-scorecard', 'calc-moq'] }
});






