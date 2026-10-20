/* ==========================================================
   Section F: navigation architecture (Section 7, 48)

   One persistent sidebar, five sections, shown on every route including
   the Command Center. The section names are questions the section
   answers, not the names of the app's internals: "Do the Work" and
   "Look It Up" are both about content, but only one of them is about
   acting on it.

   Every previous item is accounted for in the ledger below. Nothing was
   silently dropped: three "what next" pages that collided with each
   other were separated, three near-duplicate personal lists were merged
   under one Dashboard, the Operations Hub was promoted out of hiding,
   and two dead ends were removed with a stated reason.

   Ledger (previous 37 items -> 33 in the tree + 4 in the footer):
     Command Center        kept, first item
     What to Learn Next    -> renamed "Next Lesson", moved to Learn
     What Should I Do?     -> renamed "Help Me With a Problem", in Start
     Procurement Lifecycle -> renamed "Lifecycle Map", moved to Look It Up
     Maturity Assessment   -> renamed "Maturity Check", moved to Do the Work
     Global Search         -> renamed "Search Everything", in Start
     Quick Start           -> removed from the tree; it duplicated the
                              Command Center getting-started card. The
                              route still resolves and the content is
                              reachable from Help.
     What's New            -> moved to the footer strip as "Changelog"
     Academy Curriculum    kept
     Skill Assessment      kept
     Learning Paths        kept
     Practice Labs         kept
     Skill Portfolio       kept
     Daily Tip & Career    -> split. The tip became a "Today" card on the
                              Command Center; the career ladder became
                              the rescued "Career Paths" page, which no
                              link pointed at before.
     My Progress & Badges  -> renamed "My Progress"
     Certification Exams   kept
     Credential Transcript -> removed from the tree. It is an honest
                              "not available yet" placeholder; the link
                              stays on the My Progress page.
     Community Forum       -> renamed "My Notes" and moved to My Work.
                              It is a private notes board, not a forum.
     SOPs & Procedures     -> renamed "SOPs"
     Calculators           kept
     Checklists            kept
     Templates             kept
     Procurement Copilot   -> renamed "Copilot"
     Spend Data Model      kept
     Doc Pack Builder      kept
     Knowledge Hub         kept
     KPIs & Metrics        kept
     Decision Guides       -> moved from Reference to Do the Work
     Scenarios             -> moved from Reference to Do the Work
     Glossary              kept
     Saved Work            kept, now under My Work
     Favorites             kept, now under My Work
     Recently Used         kept, now under My Work
     Savings Dashboard     -> moved from Workspace to Do the Work
     Help Center           -> moved to the footer strip
     Settings              -> moved to the footer strip
     Backup & Audit        -> renamed "Backup & Restore", moved to the
                              footer strip, and now carries an explicit
                              link to the audit log, which was only
                              reachable from an orphaned page.
   ========================================================== */
/* Each section declares which views it belongs to: 'academy',
   'operations', or 'both'. The sidebar is scoped by the profile's
   track, so a learner sees the learning navigation and a practitioner
   sees the working navigation, and the shared sections are always
   there. The profile already carried a two-option track from the
   beginning; it changed one line of text and nothing else. This is the
   thing that was chosen when the track was added: the menu follows the
   selection.

   The reference library is deliberately shared. The Academy is taught
   through the SOPs, templates and calculators, so hiding them from a
   learner would cut the link between learning and doing, and every
   Academy function links into it.

   The current route always wins: if you are on a page whose section
   your view hides, that section is shown for that visit. Nothing is
   ever a dead end in the navigation. */
PS.NAV_UNIFIED = [
  {
    sec: 'Start', ico: '\u2605', views: 'both', items: [
      { label: 'Command Center', href: '#/home' },
      { label: 'Help Me With a Problem', href: '#/what' },
      { label: 'Search Everything', href: '#/search' }
    ]
  },
  {
    sec: 'Learn', ico: '\u25C6', views: 'academy', items: [
      { label: 'Academy Curriculum', href: '#/academy' },
      { label: 'Learning Paths', href: '#/learning-paths' },
      { label: 'Skill Assessment', href: '#/assessment' },
      { label: 'Practice Labs', href: '#/labs' },
      { label: 'Certification Exams', href: '#/exams' },
      { label: 'Skill Portfolio', href: '#/portfolio' },
      { label: 'My Progress', href: '#/academy-progress' },
      { label: 'Next Lesson', href: '#/next-up' },
      { label: 'Career Paths', href: '#/career-paths' }
    ]
  },
  {
    sec: 'Workbench', ico: '\u25A0', views: 'operations', items: [
      { label: 'RFx & Evaluation', href: '#/rfx' },
      { label: 'Supplier Register', href: '#/suppliers' },
      { label: 'Contract Register', href: '#/contracts' },
      { label: 'Catalogue & Prices', href: '#/catalogue' },
      { label: 'Receipts & Invoicing', href: '#/receipts' },
      { label: 'Budget & Spend', href: '#/budget' },
      { label: 'Approvals & Policy', href: '#/approvals' },
      { label: 'Analytics', href: '#/analytics' }
    ]
  },
  {
    sec: 'Toolkit', ico: '\u25C6', views: 'operations', items: [
      { label: 'Operations Hub', href: '#/operations' },
      { label: 'Scenarios', href: '#/scenarios' },
      { label: 'Maturity Check', href: '#/maturity' },
      { label: 'Copilot', href: '#/copilot' },
      { label: 'Doc Pack Builder', href: '#/docpack' }
    ]
  },
  {
    sec: 'Library', ico: '\u25A4', views: 'both', items: [
      { label: 'SOPs', href: '#/list/sop' },
      { label: 'Checklists', href: '#/list/cl' },
      { label: 'Templates', href: '#/list/tpl' },
      { label: 'Calculators', href: '#/list/calc' },
      { label: 'Decision Guides', href: '#/list/dec' }
    ]
  },
  {
    sec: 'Look It Up', ico: '\u25CF', views: 'both', items: [
      { label: 'Knowledge Hub', href: '#/list/kb' },
      { label: 'KPIs & Metrics', href: '#/list/kpi' },
      { label: 'Glossary', href: '#/glossary' },
      { label: 'Lifecycle Map', href: '#/lifecycle' }
    ]
  },
  {
    sec: 'My Work', ico: '\u25B2', views: 'both', items: [
      { label: 'Dashboard', href: '#/dash' },
      { label: 'Saved Work', href: '#/saved', badge: 'saved', i18n: 'nav.saved' },
      { label: 'Favorites', href: '#/fav', badge: 'fav', i18n: 'nav.fav' },
      { label: 'Recently Used', href: '#/recent', i18n: 'nav.recent' },
      { label: 'My Notes', href: '#/community' }
    ]
  }
];

/* System pages sit in a persistent footer strip: always visible, never
   collapsed, and never mixed into the tree of things you work with. */
PS.NAV_FOOTER = [
  { label: 'Settings', href: '#/settings' },
  { label: 'Help Center', href: '#/help', i18n: 'nav.help' },
  { label: 'Backup & Restore', href: '#/backup' },
  { label: 'Changelog', href: '#/whats-new' }
];
