# Procure Sherpa v2.0

## Comprehensive Product Requirements Specification

### Procurement Professional Knowledge + SOP + Toolkit --- Single-File Offline Application

**Document status:** Master Requirements\
**Target:** Procure Sherpa v2.0\
**Primary artifact:** One self-contained HTML file\
**Architecture:** Offline-first, zero-backend, browser-local\
**Existing baseline:** Procure Sherpa v1.1.0\
**Primary objective:** Expand the existing calculator toolkit into a
complete practical procurement professional knowledge, SOP,
decision-support, checklist, template, KPI and calculation toolkit
without turning it into an ERP.

------------------------------------------------------------------------

# 1. Executive Product Definition

Procure Sherpa is a **complete procurement professional toolkit**
delivered as a single offline-first HTML application.

It combines:

-   Procurement knowledge
-   Procurement concepts
-   Procurement lifecycle guidance
-   Procurement SOPs
-   Procedures
-   Process maps
-   Decision guides
-   Checklists
-   Templates
-   Calculators
-   Commercial analysis
-   Supplier analysis
-   Risk analysis
-   Procurement KPIs
-   Saved work
-   Local backup/restore
-   Printable reports
-   Cross-tool workflows
-   Search
-   Practical examples
-   Audit/documentation guidance

The product is intended for procurement professionals, sourcing
professionals, buyers, category managers, procurement managers,
procurement leaders, business users involved in purchasing, and people
learning professional procurement.

It is **not an ERP**.

It does not process real purchase orders, invoices, inventory
transactions or supplier transactions. It is a **professional
decision-support and knowledge toolkit**.

------------------------------------------------------------------------

# 2. Product Positioning

## 2.1 Core proposition

> **Everything a procurement professional needs to understand, plan,
> analyze, execute and document procurement decisions --- in one private
> offline toolkit.**

The product should move beyond the concept of "a collection of
calculators."

The user experience must connect:

**Question → Concept → Process → SOP → Checklist → Calculator → Decision
→ Template → Report**

Example:

A user receives a 12% supplier price increase.

Procure Sherpa should allow the user to find:

-   Price Increase Calculator
-   Price Escalation Concept
-   Contract Review SOP
-   Negotiation SOP
-   Negotiation Checklist
-   TCO Calculator
-   Supplier Performance
-   Contract Renewal Assessment
-   Negotiation Planner
-   Savings Analysis
-   Printable decision report

The tools must feel like one connected procurement system of knowledge,
not independent pages.

------------------------------------------------------------------------

# 3. Critical Product Boundary

Procure Sherpa must remain a **toolkit**, not become an ERP.

## 3.1 Explicitly included

-   Knowledge
-   Guidance
-   Analysis
-   Calculations
-   Templates
-   Checklists
-   SOPs
-   Decision frameworks
-   Procurement documentation
-   Local saved analysis
-   Printable reports
-   Offline use

## 3.2 Explicitly excluded

Do not build:

-   Purchase order transaction processing
-   Accounts payable
-   Invoice processing
-   Goods receipt processing
-   Warehouse transactions
-   Inventory ledger
-   Supplier login portal
-   Buyer login portal
-   Enterprise workflow engine
-   Cloud database
-   Mandatory API integrations
-   Live supplier marketplace
-   Live price scraping
-   Live exchange-rate dependency
-   ERP replacement
-   Full contract lifecycle transaction platform

Optional future integrations may be considered later, but the core
product must remain completely functional without them.

------------------------------------------------------------------------

# 4. Technical Requirements

## 4.1 Single-file requirement

The primary deliverable must be one HTML file.

Example:

`ProcureSherpa-v2.0.html`

A user must be able to:

1.  Download the HTML file.
2.  Store it locally.
3.  Double-click it.
4.  Open Procure Sherpa.
5.  Use the core application without a server.
6.  Use the application without internet access.

All application logic and content required for the core experience must
be embedded in the HTML.

## 4.2 Technology

Preferred:

-   HTML5
-   CSS3
-   Vanilla JavaScript
-   SVG
-   Browser-native APIs
-   localStorage

Avoid unnecessary frameworks.

Do not introduce a build process for the end user.

## 4.3 Offline requirement

Core functions must work with the internet disconnected.

The following must work offline:

-   Navigation
-   Search
-   SOPs
-   Concepts
-   Calculators
-   Checklists
-   Templates
-   Saved work
-   Reports
-   Examples
-   Backup
-   Restore
-   Dark mode
-   Cross-tool handoffs

External fonts may be used as progressive enhancement, but fallback
fonts must be defined.

------------------------------------------------------------------------

# 5. Existing v1.1.0 Must Be Preserved

Before changing the application:

1.  Inspect the entire existing HTML.
2.  Identify all existing pages.
3.  Identify all calculators.
4.  Identify all JavaScript functions.
5.  Identify all localStorage keys.
6.  Identify saved-work structures.
7.  Identify current navigation.
8.  Identify current styling system.
9.  Identify current report functionality.
10. Identify current example data.
11. Identify current security protections.
12. Identify existing PWA references.

Do not rebuild the application blindly.

Preserve working functionality unless there is a documented reason to
change it.

------------------------------------------------------------------------

# 6. Existing Calculator Suite

The existing calculators/tools must remain available.

Current dedicated tools:

1.  Compare Quotes
2.  Landed Cost
3.  Should Cost
4.  TCO --- Total Cost of Ownership
5.  Negotiation Savings
6.  Price Increase
7.  Price Escalation
8.  Payment Terms
9.  PO Value Check
10. MOQ / Order Quantity Optimizer
11. Make vs Buy
12. Supplier Scorecard
13. Supplier Concentration / HHI
14. Budget vs Actual
15. Savings Analysis
16. Multi-Year Contract Cost
17. GST / Tax
18. Currency / FX

Do not remove any of these.

Improve them where necessary for consistency, validation, usability,
explanations and reporting.

------------------------------------------------------------------------

# 7. New Information Architecture

The sidebar should be reorganized into meaningful professional sections.

## HOME

-   Home
-   Quick Start
-   Search
-   Recently Used
-   Favorites
-   What Should I Do?

## PROCUREMENT KNOWLEDGE

-   Procurement Fundamentals
-   Procurement Lifecycle
-   Sourcing
-   Commercial
-   Supplier Management
-   Negotiation
-   Contracts
-   Governance
-   Risk
-   Procurement KPIs
-   Procurement Glossary

## SOP CENTER

-   Core Procurement SOPs
-   Sourcing SOPs
-   Supplier SOPs
-   Commercial SOPs
-   Contract SOPs
-   Governance SOPs
-   Exception SOPs
-   Audit SOPs

## DECISION CENTER

-   What Should I Do?
-   Sourcing Method Selector
-   RFQ vs RFP vs RFI
-   Competitive vs Single Source
-   Negotiate vs Accept
-   Renew vs Re-source
-   Consolidate vs Diversify
-   Make vs Buy
-   Unit Price vs TCO
-   Supplier Risk Decision
-   Price Increase Decision

## TOOLKIT

-   Quote Tools
-   Cost Tools
-   Negotiation Tools
-   Supplier Tools
-   Buying Decision Tools
-   Budget/Savings Tools
-   Contract Tools
-   Tax/FX Tools

## CHECKLISTS

-   Procurement Intake
-   RFQ
-   Supplier
-   Evaluation
-   Negotiation
-   Award
-   Contract
-   Renewal
-   Performance
-   Risk
-   Audit
-   Exception

## TEMPLATES

-   RFQ
-   RFP
-   Supplier Evaluation
-   Bid Comparison
-   Negotiation Plan
-   Scorecard
-   Risk Assessment
-   Award Recommendation
-   Business Case
-   Savings Validation
-   Contract Renewal
-   Performance Review
-   Exception Request

## KPI CENTER

-   KPI Library
-   KPI Calculator
-   KPI Definitions
-   KPI Examples

## WORKSPACE

-   Saved Work
-   Backup / Restore
-   Audit Log
-   Settings

## HELP

-   How to Use
-   Methodology
-   Assumptions
-   Glossary
-   Disclaimers
-   Version History

------------------------------------------------------------------------

# 8. HOME PAGE REQUIREMENTS

The Home page is the most important navigation surface.

It must immediately communicate what Procure Sherpa is.

Recommended hero:

**PROCURE SHERPA**

**The Procurement Professional's Offline Toolkit**

Subheading:

**SOPs, procurement knowledge, calculators, checklists, templates and
decision tools in one private workspace.**

The home page should contain:

-   Global search
-   "What do you need to do?"
-   Calculator access
-   SOP access
-   Checklist access
-   Template access
-   Recently used
-   Favorites
-   Saved work
-   Quick-start scenarios

## Quick-start scenarios

Examples:

-   I need to source a supplier.
-   I received multiple quotations.
-   My supplier increased prices.
-   I need to negotiate.
-   I need to evaluate suppliers.
-   I need to renew a contract.
-   I need to justify a single-source purchase.
-   I need to calculate savings.
-   I need to assess supplier risk.
-   I need to compare total cost.
-   I need to prepare for an audit.

Each scenario should link into the relevant content and tools.

------------------------------------------------------------------------

# 9. GLOBAL SEARCH

Search must cover the complete application.

Searchable content:

-   SOPs
-   Concepts
-   Calculators
-   Checklists
-   Templates
-   KPIs
-   Decision guides
-   Glossary
-   Examples

Search results should identify content type.

Example:

Search: `price increase`

Results:

-   Calculator --- Price Increase
-   SOP --- Supplier Price Increase Review
-   Concept --- Price Escalation
-   Decision Guide --- Should I Accept a Supplier Price Increase?
-   Checklist --- Price Increase Review
-   Template --- Supplier Price Increase Assessment
-   Calculator --- TCO
-   Calculator --- Negotiation Savings

Search should support partial words and common terminology.

------------------------------------------------------------------------

# 10. PROCUREMENT KNOWLEDGE HUB

Create a structured procurement reference library.

Every concept page should use a consistent structure:

1.  Definition
2.  Why it matters
3.  When it is used
4.  Process
5.  Example
6.  Risks
7.  Common mistakes
8.  Related SOPs
9.  Related checklists
10. Related templates
11. Related calculators

------------------------------------------------------------------------

# 11. PROCUREMENT FUNDAMENTALS

Include detailed practical concepts for:

-   Procurement
-   Purchasing
-   Strategic procurement
-   Tactical procurement
-   Strategic sourcing
-   Category management
-   Direct procurement
-   Indirect procurement
-   CAPEX
-   OPEX
-   Procurement lifecycle
-   Source-to-contract
-   Procure-to-pay
-   Supplier management
-   Spend management
-   Spend under management
-   Procurement governance
-   Procurement compliance
-   Procurement ethics
-   Segregation of duties
-   Delegation of authority
-   Three-way match
-   Procurement savings
-   Cost avoidance
-   Maverick spend
-   Contract compliance

------------------------------------------------------------------------

# 12. PROCUREMENT LIFECYCLE

Create a complete lifecycle explanation.

Stages:

1.  Requirement identification
2.  Requirement definition
3.  Demand validation
4.  Procurement strategy
5.  Market assessment
6.  Supplier identification
7.  Supplier qualification
8.  RFI where appropriate
9.  RFQ/RFP/RFT
10. Bid collection
11. Technical evaluation
12. Commercial evaluation
13. Negotiation
14. Supplier selection
15. Business approval
16. Contract/PO
17. Delivery/performance
18. Supplier performance management
19. Savings validation
20. Renewal/re-source decision
21. Closeout/document retention

Each stage should link to relevant tools and SOPs.

------------------------------------------------------------------------

# 13. SOURCING KNOWLEDGE

Include:

-   Market research
-   Sourcing strategy
-   Competitive sourcing
-   RFI
-   RFQ
-   RFP
-   RFT
-   e-auction concept
-   Bid process
-   Supplier longlist
-   Supplier shortlist
-   Technical qualification
-   Commercial evaluation
-   Weighted evaluation
-   Bid normalization
-   Clarification process
-   Best-and-final-offer
-   Award recommendation
-   Source selection

Explain when each sourcing method is appropriate.

Do not state universal thresholds where organizations may have different
policies.

Use configurable examples.

------------------------------------------------------------------------

# 14. SUPPLIER MANAGEMENT KNOWLEDGE

Include:

-   Supplier identification
-   Supplier qualification
-   Supplier onboarding
-   Supplier due diligence
-   Financial risk
-   Operational risk
-   Geographic risk
-   Dependency risk
-   Cyber/security considerations
-   Quality risk
-   Delivery risk
-   Capacity risk
-   Supplier concentration
-   Supplier segmentation
-   Supplier performance
-   Supplier development
-   Supplier corrective action
-   Supplier business reviews
-   Supplier exit

------------------------------------------------------------------------

# 15. NEGOTIATION KNOWLEDGE

Include:

-   Negotiation preparation
-   Objectives
-   Target price
-   Walk-away/reservation concept
-   BATNA
-   ZOPA
-   Concessions
-   Negotiation variables
-   Cost drivers
-   Supplier economics
-   Volume leverage
-   Term leverage
-   Payment-term leverage
-   Contract duration
-   Bundling
-   Competition leverage
-   Service-level tradeoffs
-   Commercial give-and-take
-   Negotiation documentation

Avoid simplistic "always negotiate X%" advice.

------------------------------------------------------------------------

# 16. CONTRACT KNOWLEDGE

Include:

-   Contract lifecycle
-   Contract types
-   Fixed price
-   Time and materials
-   Framework agreements
-   Master service agreements
-   Statements of work
-   Service levels
-   KPIs
-   Price escalation
-   Indexation
-   Renewal
-   Extension
-   Termination
-   Change control
-   Liability
-   Warranty
-   Payment terms
-   Performance obligations
-   Contract compliance
-   Contract expiry management

Legal concepts must be presented as general procurement guidance, not
jurisdiction-specific legal advice.

------------------------------------------------------------------------

# 17. PROCUREMENT GOVERNANCE

Include:

-   Approval matrix
-   Delegation of authority
-   Competitive bidding
-   Exceptions
-   Emergency procurement
-   Single-source justification
-   Sole-source justification
-   Conflict of interest
-   Segregation of duties
-   Procurement documentation
-   Audit trail
-   Record retention
-   Compliance monitoring
-   Procurement policy structure
-   Procurement authority

Company-specific thresholds must be configurable rather than hard-coded
as universal rules.

------------------------------------------------------------------------

# 18. PROCUREMENT SOP CENTER

Every SOP must use the same professional structure.

## SOP structure

### SOP Title

### 1. Purpose

What the SOP controls.

### 2. Scope

Where it applies.

### 3. Trigger

What causes the process to start.

### 4. Definitions

Important terms.

### 5. Roles

Typical responsibilities.

### 6. Inputs

Information/documents required.

### 7. Procedure

Detailed sequential steps.

### 8. Decision points

Where the user must choose between paths.

### 9. Approvals

What approvals may be required.

### 10. Controls

Required procurement controls.

### 11. Risks

Typical risks.

### 12. Exceptions

How exceptions should be documented.

### 13. Outputs

Expected result.

### 14. Records

Documents to retain.

### 15. KPIs

How the process is measured.

### 16. Checklist

Operational checklist.

### 17. Related tools

Calculators.

### 18. Related templates

Documents.

### 19. Common mistakes

Practical warnings.

------------------------------------------------------------------------

# 19. REQUIRED SOP LIBRARY

Create comprehensive SOPs for:

## Core

1.  Procurement Lifecycle SOP
2.  Procurement Intake SOP
3.  Requirement Definition SOP
4.  Procurement Planning SOP
5.  Sourcing Strategy SOP

## Supplier

6.  Supplier Identification SOP
7.  Supplier Prequalification SOP
8.  Supplier Due Diligence SOP
9.  Supplier Onboarding SOP
10. Supplier Evaluation SOP
11. Supplier Segmentation SOP
12. Supplier Performance Management SOP
13. Supplier Corrective Action SOP
14. Supplier Exit SOP

## Sourcing

15. RFI SOP
16. RFQ SOP
17. RFP SOP
18. Competitive Bid SOP
19. Quote Comparison SOP
20. Bid Normalization SOP
21. Technical Evaluation SOP
22. Commercial Evaluation SOP
23. Supplier Selection SOP
24. Award Recommendation SOP

## Negotiation

25. Negotiation Preparation SOP
26. Negotiation Execution SOP
27. Negotiation Savings SOP
28. Supplier Price Increase Review SOP
29. Price Escalation Review SOP

## Contract

30. Contract Review SOP
31. Contract Award SOP
32. Contract Renewal SOP
33. Contract Extension SOP
34. Contract Change Control SOP
35. Contract Expiry SOP
36. Contract Performance Review SOP

## Buying

37. Purchase Requisition SOP
38. Purchase Order SOP
39. Emergency Procurement SOP
40. Single-Source Procurement SOP
41. Sole-Source Procurement SOP
42. Procurement Exception SOP
43. Competitive Bid Waiver SOP

## Savings/Governance

44. Savings Calculation SOP
45. Savings Validation SOP
46. Cost Avoidance SOP
47. Procurement KPI Reporting SOP
48. Procurement Documentation SOP
49. Procurement Audit Preparation SOP
50. Procurement Compliance Review SOP

------------------------------------------------------------------------

# 20. SOP PROCESS VISUALIZATION

Major SOPs must have a visual flow.

Example:

Requirement ↓ Validate ↓ Strategy ↓ Market/Supplier Assessment ↓ RFQ/RFP
↓ Evaluation ↓ Negotiation ↓ Approval ↓ Award ↓ Contract/PO ↓
Performance ↓ Renewal/Re-source

Each stage should be clickable where practical.

------------------------------------------------------------------------

# 21. DECISION CENTER

The Decision Center should be a core differentiator.

It should answer practical procurement questions.

## Required decision guides

-   What procurement process should I use?
-   RFQ or RFP?
-   RFI or RFQ?
-   Competitive sourcing or single source?
-   Should I negotiate?
-   Should I accept the price increase?
-   Should I renew the contract?
-   Should I re-source?
-   Should I use unit price or TCO?
-   Should I consolidate suppliers?
-   Should I dual-source?
-   Is supplier concentration too high?
-   Should I make or buy?
-   Is the supplier financially risky?
-   Should I approve an exception?
-   Is a purchase competitive enough?
-   Should I use a framework agreement?

Each guide must explain the reasoning.

Do not create arbitrary universal rules.

Where thresholds vary, allow the user to configure them.

------------------------------------------------------------------------

# 22. CHECKLIST LIBRARY

Create detailed checklists for:

1.  Procurement Intake
2.  Requirement Definition
3.  Sourcing Strategy
4.  Supplier Identification
5.  Supplier Qualification
6.  Supplier Due Diligence
7.  RFQ Preparation
8.  RFP Preparation
9.  Quote Collection
10. Quote Comparison
11. Technical Evaluation
12. Commercial Evaluation
13. Supplier Selection
14. Negotiation Preparation
15. Negotiation Closeout
16. Award Recommendation
17. Contract Review
18. Contract Renewal
19. Supplier Onboarding
20. Supplier Performance Review
21. Supplier Risk Review
22. Emergency Procurement
23. Single-Source Justification
24. Exception Approval
25. Savings Validation
26. Procurement Audit
27. Procurement File Completeness

Checklist requirements:

-   Checkbox
-   Section grouping
-   Progress percentage
-   Notes
-   Save
-   Reset
-   Print
-   Export
-   Restore

------------------------------------------------------------------------

# 23. TEMPLATE LIBRARY

Create practical templates.

## Sourcing

-   RFQ Template
-   RFP Template
-   RFI Template
-   Supplier Invitation
-   Bid Submission Instructions

## Evaluation

-   Supplier Evaluation
-   Technical Evaluation
-   Commercial Evaluation
-   Bid Comparison
-   Weighted Scoring
-   Award Recommendation

## Negotiation

-   Negotiation Planner
-   Negotiation Agenda
-   Negotiation Concession Log
-   Negotiation Summary

## Supplier

-   Supplier Onboarding
-   Supplier Due Diligence
-   Supplier Scorecard
-   Supplier Risk Assessment
-   Supplier Business Review

## Contract

-   Contract Renewal Assessment
-   Contract Review Checklist
-   Contract Change Request
-   Contract Performance Review

## Governance

-   Single-Source Justification
-   Sole-Source Justification
-   Emergency Purchase Justification
-   Procurement Exception Request
-   Competitive Bid Waiver

## Savings

-   Savings Calculation
-   Savings Validation
-   Cost Avoidance Record
-   Procurement Business Case

Templates should be editable in the browser and printable.

------------------------------------------------------------------------

# 24. CALCULATOR STANDARD

Every calculator must have:

-   Tool title
-   Purpose
-   Inputs
-   Input units
-   Validation
-   Example
-   Calculate
-   Reset
-   Results
-   Formula explanation
-   Interpretation
-   Assumptions
-   Warning messages
-   Save
-   Print
-   Export where useful
-   Related SOP
-   Related checklist
-   Related template

Avoid hidden formulas where transparency matters.

------------------------------------------------------------------------

# 25. CALCULATOR QUALITY

Calculators must be professionally designed, not merely mathematically
functional.

Requirements:

-   Validate required fields.
-   Reject invalid numbers.
-   Handle zero correctly.
-   Handle negative values where appropriate.
-   Avoid divide-by-zero errors.
-   Format currency consistently.
-   Show units.
-   Explain assumptions.
-   Distinguish percentages from decimal inputs.
-   Clearly identify estimated values.
-   Provide meaningful error messages.

Results should include interpretation.

Example:

Instead of only:

`Savings = $18,500`

show:

-   Baseline
-   Negotiated cost
-   Absolute savings
-   Savings %
-   Period
-   Assumptions

------------------------------------------------------------------------

# 26. CROSS-TOOL HANDOFFS

Tools must exchange data locally.

Required examples:

## Compare Quotes

Send to:

-   Negotiation
-   TCO
-   Savings Analysis
-   Award Recommendation

## Supplier Evaluation

Send to:

-   Supplier Scorecard
-   Supplier Risk

## Price Increase

Send to:

-   Negotiation
-   Price Escalation
-   TCO
-   Contract Renewal

## TCO

Send to:

-   Make vs Buy
-   Award Recommendation

## Savings Analysis

Send to:

-   Savings Dashboard

## Supplier Concentration

Send to:

-   Supplier Risk

Cross-tool handoff should prepopulate compatible fields.

------------------------------------------------------------------------

# 27. SAVED WORKSPACE

Continue the existing localStorage architecture using the `ps_`
namespace.

Support saved:

-   Quote comparisons
-   Calculations
-   Supplier assessments
-   Checklists
-   Decision assessments
-   Notes
-   Reports where practical

Each saved item should include:

-   Type
-   Title
-   Date created
-   Date modified
-   Optional tags
-   Optional notes
-   Data payload
-   Version

Provide:

-   Search
-   Filter
-   Sort
-   Duplicate
-   Rename
-   Delete
-   Export
-   Import

------------------------------------------------------------------------

# 28. BACKUP AND RESTORE

Complete local backup.

Example filename:

`ProcureSherpa_Backup_2026-09-16.json`

Backup should contain:

-   Saved work
-   Preferences
-   Favorites
-   Recent items
-   Checklist states
-   User-created notes

Restore must validate the JSON structure before writing to localStorage.

Do not overwrite current data without confirmation.

------------------------------------------------------------------------

# 29. AUDIT LOG

Maintain a local audit log.

Existing target:

-   Last 100 local events

Events may include:

-   Calculator used
-   Calculation saved
-   Calculation deleted
-   Checklist completed
-   Template created
-   Backup exported
-   Backup restored
-   Settings changed
-   Data cleared

Do not transmit audit events externally.

------------------------------------------------------------------------

# 30. PROCUREMENT KPI CENTER

Create a KPI library.

Include:

-   Spend Under Management
-   Procurement Savings
-   Cost Avoidance
-   Purchase Price Variance
-   Procurement ROI
-   Procurement Cycle Time
-   RFQ Cycle Time
-   Supplier On-Time Delivery
-   OTIF
-   Supplier Defect Rate
-   Contract Compliance
-   Contract Coverage
-   Maverick Spend
-   Supplier Concentration
-   Supplier Performance
-   Payment Terms
-   Working Capital Impact
-   Savings Realization
-   Sourcing Coverage
-   Competitive Bid Rate

Each KPI page should contain:

1.  Definition
2.  Formula
3.  Required inputs
4.  Example
5.  Interpretation
6.  Limitations
7.  Common mistakes
8.  Related calculator
9.  Related SOP

------------------------------------------------------------------------

# 31. GLOSSARY

Create a procurement glossary covering major terminology.

Examples:

-   BATNA
-   Bid
-   Blanket PO
-   CAPEX
-   Cost Avoidance
-   Direct Spend
-   DOA
-   EBITDA
-   EOQ
-   FX
-   HHI
-   Incoterms
-   KPI
-   Landed Cost
-   MOQ
-   OPEX
-   PPV
-   RFQ
-   RFI
-   RFP
-   SLA
-   SOW
-   TCO
-   ZOPA
-   Strategic Sourcing
-   Single Source
-   Sole Source
-   Maverick Spend

Every glossary entry should link to relevant content.

------------------------------------------------------------------------

# 32. REPORTING

Important tools should generate a professional report view.

Report should include:

-   Procure Sherpa title
-   Tool name
-   Date
-   Inputs
-   Calculations
-   Results
-   Key findings
-   Assumptions
-   Notes
-   Related methodology
-   Disclaimer

Use print CSS.

The report must remain readable in black-and-white printing.

------------------------------------------------------------------------

# 33. DATA PRIVACY

The application should communicate:

> **Your procurement data stays on your device/browser.**

No core data should be transmitted to an external server.

No mandatory analytics.

No mandatory account.

No mandatory cloud.

------------------------------------------------------------------------

# 34. INPUT SECURITY

Maintain existing protections.

Required:

-   HTML sanitization
-   Safe rendering of user-entered text
-   CSV injection protection
-   Safe JSON import
-   Validation of imported data
-   Maximum storage safeguards
-   No arbitrary script execution from imported data

Never use user-entered HTML as executable markup.

------------------------------------------------------------------------

# 35. UI/UX DESIGN SYSTEM

The application should feel like a professional product.

## Design principles

-   Clear
-   Structured
-   Dense but readable
-   Professional
-   Consistent
-   Fast
-   Minimal unnecessary animation
-   Desktop-first
-   Responsive

Use consistent:

-   Typography
-   Spacing
-   Cards
-   Tables
-   Buttons
-   Input fields
-   Result panels
-   Badges
-   Alerts
-   Navigation

------------------------------------------------------------------------

# 36. CALCULATOR PAGE DESIGN

Recommended layout:

### Header

Tool name + description.

### Context

What this tool solves.

### Input panel

Grouped inputs.

### Action

Calculate / Reset / Load Example.

### Result panel

Large primary outputs.

### Analysis

Interpretation.

### Formula

Expandable methodology.

### Actions

Save / Print / Export / Send to another tool.

### Related content

SOP / Checklist / Template / Concept.

------------------------------------------------------------------------

# 37. SOP PAGE DESIGN

Use:

-   SOP title
-   Purpose
-   Scope
-   Trigger
-   Inputs
-   Process timeline
-   Step-by-step procedure
-   Decision points
-   Controls
-   Risks
-   Exceptions
-   Outputs
-   Records
-   KPI
-   Checklist
-   Related tools
-   Related templates

Provide print-friendly formatting.

------------------------------------------------------------------------

# 38. KNOWLEDGE PAGE DESIGN

Each knowledge page should avoid long unstructured text.

Use:

-   Definition card
-   Why it matters
-   When to use
-   How it works
-   Example
-   Risks
-   Common mistakes
-   Related SOP
-   Related tool
-   Related checklist
-   Related template

------------------------------------------------------------------------

# 39. DECISION GUIDE DESIGN

A decision guide should be interactive.

Example:

## Should I use RFQ or RFP?

Ask:

-   Is the requirement clearly specified?
-   Is technical solution already defined?
-   Is supplier creativity required?
-   Is evaluation primarily price?
-   Are services complex?
-   Are requirements likely to change?

Then show:

**Likely approach:** RFQ / RFP / RFI

But explain the basis.

The output must not pretend to know company policy.

------------------------------------------------------------------------

# 40. EXAMPLE DATA

Every calculator and major tool should have a "Load Example" function.

Example data must be realistic but clearly labelled:

> Example data --- replace with your own information.

Examples should demonstrate how the tool works without being presented
as real market data.

------------------------------------------------------------------------

# 41. DISCLAIMERS

Use contextual disclaimers.

Examples:

### Procurement policy

> Approval thresholds and procurement requirements vary by organization.
> Configure Procure Sherpa to your company's policy before operational
> use.

### Tax

> Tax treatment varies by jurisdiction and transaction type. Verify
> applicable tax rules before using results for accounting or compliance
> decisions.

### Legal

> Contract and legal guidance is general procurement information and is
> not a substitute for qualified legal advice.

### Financial

> Financial calculations are decision-support estimates. Validate
> assumptions before committing funds.

------------------------------------------------------------------------

# 42. CONFIGURATION

Provide a simple settings area.

Possible configurable values:

-   Default currency
-   Organization name
-   Procurement department name
-   Default tax rate
-   Approval thresholds
-   Preferred date format
-   Number formatting
-   Report footer
-   Default assumptions

Do not hard-code organization-specific policies.

------------------------------------------------------------------------

# 43. DARK MODE

Preserve dark mode.

Requirements:

-   All pages support dark mode.
-   Tables remain readable.
-   Charts remain readable.
-   Print view ignores dark mode where necessary.
-   Preference persists locally.

------------------------------------------------------------------------

# 44. PWA READINESS

The application may remain PWA-ready.

Existing references:

-   `manifest.json`
-   `sw.js`
-   `Procuresherpa Logo.png`

However, the core application must not depend on those external files
for basic operation if the requirement is a truly standalone HTML
distribution.

If PWA packaging is retained, document the difference between:

**Standalone HTML mode**

and

**Optional PWA mode**

------------------------------------------------------------------------

# 45. PERFORMANCE

The application should remain responsive despite containing substantial
content.

Requirements:

-   Avoid unnecessary DOM rendering.
-   Render large content sections on demand where practical.
-   Avoid duplicate data structures.
-   Minimize repeated event listeners.
-   Keep search responsive.
-   Avoid blocking the main thread with unnecessary processing.

The goal is a professional-feeling local application, not merely a large
HTML document.

------------------------------------------------------------------------

# 46. RESPONSIVE DESIGN

Desktop should be the primary experience.

Support:

-   Laptop
-   Desktop
-   Tablet
-   Mobile

On small screens:

-   Sidebar collapses.
-   Tables become horizontally scrollable.
-   Calculator panels stack.
-   Buttons remain usable.
-   Results remain visible.
-   Search remains accessible.

------------------------------------------------------------------------

# 47. ACCESSIBILITY

Include:

-   Semantic HTML
-   Labels for inputs
-   Keyboard navigation
-   Visible focus states
-   Sufficient text contrast
-   Descriptive buttons
-   Accessible tables
-   Avoid color-only meaning
-   Logical heading hierarchy

------------------------------------------------------------------------

# 48. NAVIGATION

Every major page must provide:

-   Breadcrumb/context where useful
-   Back navigation where appropriate
-   Related content
-   Search access
-   Home access

Avoid forcing users to return to Home after every action.

------------------------------------------------------------------------

# 49. FAVORITES AND RECENTLY USED

Allow users to favorite:

-   Calculators
-   SOPs
-   Checklists
-   Templates
-   Knowledge pages
-   Decision guides

Recently used should show the most recent useful items.

Store preferences locally.

------------------------------------------------------------------------

# 50. "WHAT SHOULD I DO?" UNIVERSAL ENTRY POINT

This should be one of the most important product features.

The user starts with a business problem.

Examples:

"I received three quotes."

"I need to source a supplier."

"Supplier increased price."

"Contract is expiring."

"I need to prove savings."

"I need to justify single source."

"I need to evaluate supplier risk."

"I need to compare suppliers."

The system should map the problem to:

-   Process
-   SOP
-   Checklist
-   Calculator
-   Template
-   Report

This is the central "Sherpa" concept.

------------------------------------------------------------------------

# 51. PROCUREMENT SCENARIO LIBRARY

Create practical scenarios.

Examples:

## Scenario 1 --- New Purchase

Requirement → Strategy → Supplier Search → RFQ → Evaluation →
Negotiation → Approval → Award

## Scenario 2 --- Supplier Price Increase

Notice → Validate contract → Analyze increase → Check market/cost basis
→ Calculate impact → Negotiate → Accept/reject/escalate → Document
decision

## Scenario 3 --- Contract Renewal

Expiry → Performance review → Spend analysis → Market check → TCO →
Renewal economics → Negotiation → Approval → Renewal/re-source

## Scenario 4 --- Supplier Risk

Identify dependency → Concentration → Performance →
Financial/operational considerations → Mitigation → Dual-source/backup
strategy

------------------------------------------------------------------------

# 52. PROCUREMENT FILE COMPLETENESS

Create a checklist that allows a user to check whether a procurement
event has sufficient documentation.

Possible records:

-   Requirement
-   Business justification
-   Sourcing strategy
-   Supplier list
-   RFQ/RFP
-   Supplier responses
-   Evaluation
-   Negotiation notes
-   Award recommendation
-   Approval
-   Contract
-   PO
-   Supplier performance
-   Savings calculation

The toolkit should not claim a file is legally compliant. It should call
it a procurement documentation completeness check.

------------------------------------------------------------------------

# 53. CONTENT RELATIONSHIP MODEL

Every major content object should be able to link to related objects.

Concept:

→ SOP\
→ Calculator\
→ Checklist\
→ Template\
→ Decision Guide

SOP:

→ Concepts\
→ Checklist\
→ Templates\
→ Calculators

Calculator:

→ SOP\
→ Concept\
→ Checklist\
→ Template

This creates a knowledge graph-like experience without requiring a
database.

------------------------------------------------------------------------

# 54. INTERNAL CONTENT STRUCTURE

Even inside one HTML file, organize content logically.

Recommended JavaScript structures:

-   `knowledgeBase`
-   `sopLibrary`
-   `decisionGuides`
-   `checklists`
-   `templates`
-   `calculatorRegistry`
-   `kpiLibrary`
-   `glossary`
-   `scenarios`

Each content item should have:

-   id
-   title
-   category
-   description
-   tags
-   related items
-   content

This makes future maintenance easier.

------------------------------------------------------------------------

# 55. VERSION COMPATIBILITY

Because saved data may survive application updates:

-   Include data schema version.
-   Validate saved records.
-   Provide migration logic when practical.
-   Never silently corrupt existing saved data.
-   Keep backward compatibility with v1.1.0 saved work where possible.

------------------------------------------------------------------------

# 56. STORAGE LIMITS

Existing quote comparison target:

**Maximum 50 saved quote comparisons.**

Maintain this unless there is a strong reason to change it.

For all saved work:

-   Handle localStorage quota errors.
-   Show useful error messages.
-   Never silently lose data.
-   Allow backup/export.

------------------------------------------------------------------------

# 57. ERROR HANDLING

The application must fail gracefully.

Examples:

-   Invalid number
-   Missing input
-   Invalid JSON
-   Storage unavailable
-   Storage quota exceeded
-   Invalid saved object
-   Calculation overflow
-   Division by zero
-   Unsupported browser feature

Never show raw JavaScript errors to the user.

------------------------------------------------------------------------

# 58. FORMULA TRANSPARENCY

For professional calculators, show formulas when useful.

Example:

**Savings %**

`(Baseline Cost - New Cost) / Baseline Cost × 100`

Explain:

-   Baseline definition
-   New cost definition
-   Period
-   Included/excluded costs

This improves trust.

------------------------------------------------------------------------

# 59. ASSUMPTION MANAGEMENT

Important calculators should explicitly display assumptions.

Examples:

-   Tax included/excluded
-   Freight included/excluded
-   Currency conversion rate
-   Contract duration
-   Volume
-   Payment timing
-   Discount rate
-   Expected demand
-   Useful life

Users should be able to change assumptions.

------------------------------------------------------------------------

# 60. NO FALSE PRECISION

Do not display more decimal precision than meaningful.

For example:

Avoid:

`Savings = $18,492.837492`

Prefer:

`Savings = $18,493`

Allow detailed values when needed.

------------------------------------------------------------------------

# 61. PROFESSIONAL CONTENT STANDARD

Content must be practical rather than generic.

Avoid paragraphs that merely define terms.

For each concept answer:

-   What is it?
-   Why does procurement care?
-   When do I use it?
-   What do I actually do?
-   What can go wrong?
-   Which tool helps me?

------------------------------------------------------------------------

# 62. POLICY VARIABILITY

Never hard-code claims such as:

"Every purchase above X requires three quotes."

Instead:

> "Many organizations establish competitive-bidding thresholds. Enter
> your organization's threshold in Settings."

Where legal, tax, accounting or regulatory requirements vary by
jurisdiction, identify them as configurable/jurisdiction-dependent.

------------------------------------------------------------------------

# 63. PROCUREMENT MATURITY

Optionally include a Procurement Maturity self-assessment.

Areas:

-   Governance
-   Sourcing
-   Supplier management
-   Contract management
-   Spend visibility
-   Savings management
-   Data quality
-   Risk management
-   KPI management

The assessment should produce a descriptive maturity profile, not a
misleading universal benchmark.

------------------------------------------------------------------------

# 64. DASHBOARD

Create a local dashboard showing the user's own saved analysis.

Possible metrics:

-   Saved analyses
-   Savings analyzed
-   Potential savings
-   Supplier assessments
-   Open checklists
-   Recent activity
-   Favorite tools
-   Recently used SOPs

Do not imply these are enterprise KPIs unless the user has entered
enterprise data.

------------------------------------------------------------------------

# 65. SAVINGS DASHBOARD

Preserve and improve the existing Savings Dashboard.

Show:

-   Baseline
-   Negotiated/actual cost
-   Savings
-   Savings %
-   Cost avoidance where separately classified
-   Number of initiatives
-   Savings by category
-   Savings by supplier
-   Savings by period

Clearly distinguish:

**Savings**

from

**Cost Avoidance**

Do not combine them without explanation.

------------------------------------------------------------------------

# 66. PROCUREMENT KNOWLEDGE SEARCH TAGS

Use tags such as:

-   sourcing
-   supplier
-   negotiation
-   contract
-   savings
-   risk
-   governance
-   quote
-   RFQ
-   RFP
-   TCO
-   payment
-   tax
-   FX
-   KPI
-   audit
-   exception

------------------------------------------------------------------------

# 67. EXPORT OPTIONS

Where practical:

-   Print
-   CSV for tabular data
-   JSON for saved work
-   Copy-to-clipboard for templates/results

Do not introduce external dependencies solely for export.

------------------------------------------------------------------------

# 68. PRINT DESIGN

Print output should:

-   Hide navigation
-   Hide interactive controls
-   Show report title
-   Show date
-   Show data
-   Show results
-   Show assumptions
-   Show notes
-   Use readable page breaks
-   Avoid dark backgrounds
-   Avoid clipped tables

------------------------------------------------------------------------

# 69. TEMPLATE EDITOR

Templates should not simply be static paragraphs.

Provide:

-   Editable fields
-   Checkboxes where relevant
-   Notes
-   Copy
-   Print
-   Reset
-   Save as local work

Example RFQ fields:

-   Requirement
-   Quantity
-   Specification
-   Delivery location
-   Required date
-   Incoterms
-   Payment terms
-   Warranty
-   Quote validity
-   Supplier response date

------------------------------------------------------------------------

# 70. SOP CHECKLIST INTEGRATION

Each SOP should have an embedded operational checklist.

Example:

**RFQ SOP**

-   Requirement defined
-   Specification approved
-   Supplier list prepared
-   RFQ issued
-   Clarifications managed
-   Quotes received
-   Quotes normalized
-   Technical evaluation completed
-   Commercial evaluation completed
-   Negotiation completed
-   Award recommendation prepared
-   Approval obtained
-   Records retained

The checklist should be usable independently.

------------------------------------------------------------------------

# 71. DOCUMENTATION QUALITY

The toolkit should teach users to document decisions.

For every major procurement decision, encourage recording:

-   Requirement
-   Alternatives
-   Evaluation criteria
-   Commercial analysis
-   Risks
-   Negotiation
-   Decision
-   Approval
-   Assumptions

This supports auditability without becoming an ERP.

------------------------------------------------------------------------

# 72. SECURITY PRINCIPLE

Because procurement information may be commercially sensitive:

-   Do not send data externally.
-   Do not embed tracking.
-   Do not use external APIs for core calculations.
-   Do not expose saved data through URL unless the user explicitly
    chooses sharing.

------------------------------------------------------------------------

# 73. URL HASH SHARING

The existing share-via-URL-hash feature may be retained.

Requirements:

-   Clearly explain that hash links may contain data.
-   Never share sensitive information by default.
-   Provide a warning before generating a share link.
-   Sanitize decoded content.
-   Do not send data to a server.

------------------------------------------------------------------------

# 74. LOCAL DATA CLEARING

Provide:

**Settings → Clear Local Data**

Show exactly what will be removed.

Require confirmation.

Offer backup before deletion.

------------------------------------------------------------------------

# 75. HELP CENTER

Include:

-   Getting Started
-   How calculators work
-   How saved work works
-   Backup/restore
-   Privacy
-   Sharing
-   SOP methodology
-   Procurement glossary
-   Assumptions
-   Version history
-   Troubleshooting

------------------------------------------------------------------------

# 76. QUALITY ASSURANCE REQUIREMENTS

Before release, test:

## Navigation

Every sidebar item works.

## Calculators

Every calculator:

-   Loads
-   Calculates
-   Validates
-   Resets
-   Loads example
-   Saves
-   Prints

## Storage

Test:

-   Save
-   Load
-   Delete
-   Duplicate
-   Backup
-   Restore
-   Corrupt backup
-   Storage quota

## Search

Test major procurement terms.

## Cross-tool handoff

Test every documented handoff.

## Offline

Disconnect internet and test core application.

## Responsive

Test desktop/tablet/mobile.

## Dark mode

Test every major page.

## Print

Test reports and SOPs.

## Security

Test malicious input and CSV formulas.

------------------------------------------------------------------------

# 77. CONTENT QA

Before release, verify:

-   No duplicate SOPs.
-   No contradictory definitions.
-   No broken links.
-   No missing related tools.
-   No placeholder text.
-   No "Lorem ipsum."
-   No unsupported claims.
-   No fake statistics.
-   No fabricated regulations.
-   No universal approval thresholds unless explicitly configurable.
-   No misleading legal/tax claims.

------------------------------------------------------------------------

# 78. FINAL NAVIGATION TEST

The following user journeys must work end-to-end.

## Journey A

Home → Need to source supplier → Sourcing Strategy → RFQ SOP → RFQ
Checklist → Compare Quotes → Negotiation → Award Recommendation

## Journey B

Home → Supplier increased price → Price Increase Decision → Price
Increase Calculator → Price Escalation SOP → Negotiation Planner → TCO →
Contract Renewal

## Journey C

Home → Need supplier evaluation → Supplier Evaluation SOP → Supplier
Scorecard → Supplier Risk → Supplier Concentration → Supplier Review
Template

## Journey D

Home → Need savings report → Savings Analysis → Savings Validation SOP →
Savings Dashboard → Printable Report

------------------------------------------------------------------------

# 79. PRODUCT DIFFERENTIATION

The product should not compete merely on the number of calculators.

The differentiator is the connection between:

**Knowledge + SOP + Decision + Checklist + Template + Calculator**

Example:

A generic calculator tells the user:

> "Savings = 8.4%."

Procure Sherpa should additionally explain:

-   What baseline was used?
-   Is this savings or cost avoidance?
-   What should be documented?
-   Which SOP applies?
-   Which approval may be required?
-   Which negotiation approach is relevant?
-   How should the result be reported?

This is the product's core intellectual value.

------------------------------------------------------------------------

# 80. DESIGN PHILOSOPHY

The product should feel like:

**A procurement expert sitting beside the user.**

Not a generic calculator website.

Not an ERP.

Not a document repository.

Not a textbook.

Not a spreadsheet collection.

It should be a **guided procurement workbench**.

------------------------------------------------------------------------

# 81. FINAL DELIVERABLE

The completed Procure Sherpa v2.0 should provide:

### Knowledge

Comprehensive procurement concepts.

### SOP

A structured professional SOP library.

### Decisions

Interactive decision guides.

### Checklists

Operational procurement checklists.

### Templates

Practical procurement documents.

### Calculators

Existing calculator suite plus improvements.

### KPIs

Definitions and calculations.

### Scenarios

Realistic procurement use cases.

### Workspace

Saved local work.

### Reports

Print-ready professional outputs.

### Search

Cross-application search.

### Privacy

Offline/local data handling.

### Architecture

Single-file HTML.

------------------------------------------------------------------------

# 82. SUCCESS CRITERIA

Procure Sherpa v2.0 is successful if a procurement professional can use
the application to answer all of these without opening another
reference:

1.  What procurement process applies?
2.  What SOP should I follow?
3.  What steps should I perform?
4.  What documents do I need?
5.  What risks should I consider?
6.  What calculator should I use?
7.  How should I compare suppliers?
8.  How should I negotiate?
9.  How should I evaluate total cost?
10. How should I document the decision?
11. What checklist should I complete?
12. What template should I use?
13. What KPI should I measure?
14. How should I present the result?

The product should turn those questions into a connected workflow.

------------------------------------------------------------------------

# 83. DEVELOPMENT RULE

Do not attempt to generate the entire application blindly in one pass.

Development sequence:

1.  Inspect existing v1.1.0.
2.  Preserve existing calculators.
3.  Establish content architecture.
4.  Establish navigation architecture.
5.  Build Knowledge Hub.
6.  Build SOP Center.
7.  Build Decision Center.
8.  Build Checklist Library.
9.  Build Template Library.
10. Improve calculator consistency.
11. Build cross-tool relationships.
12. Build KPI Center.
13. Build universal search.
14. Improve Saved Work.
15. Improve reporting.
16. Test offline.
17. Test storage.
18. Test security.
19. Test responsive UI.
20. Perform complete end-to-end QA.

Do not sacrifice existing functionality to add content.

------------------------------------------------------------------------

# 84. FINAL PRODUCT STATEMENT

**Procure Sherpa v2.0**

> **The complete offline Procurement Professional Toolkit.**

One application containing:

**Procurement Knowledge\
+ SOPs\
+ Procedures\
+ Decision Guides\
+ Checklists\
+ Templates\
+ Calculators\
+ KPIs\
+ Analysis\
+ Reports\
+ Saved Work**

All delivered through a **single private, offline-first HTML
application**.

The objective is not to manage procurement transactions.

The objective is to help a procurement professional **know what to do,
understand why, perform the analysis, make the decision, document it,
and produce the required procurement output.**
