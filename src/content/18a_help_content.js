/* ============ Help Center topics (Section 75) ============ */
PS_HELP.push({
  id: 'getting-started', title: 'Getting started',
  sections: [
    { h: 'You do not need to install anything', p: [
      'Procure Sherpa is one HTML file. Open it in any modern browser - Chrome, Edge, Firefox or Safari - and it works. If you are reading this inside the app, it is already running.',
      'Two ways to open it: double-click the file, or serve the folder and open the local URL. Both behave the same. On mobile, open the file or a hosted link from your browser.'
    ] },
    { h: 'Your first five minutes', ul: [
      'Open <a href="#/quickstart">Quick Start</a> for the guided eight-step tour.',
      'Try <a href="#/what">What should I do?</a> - type your real problem and follow the routed tools.',
      'Press <kbd>Ctrl</kbd>+<kbd>K</kbd> (or <kbd>/</kbd>) and search for a topic you care about.',
      'Open any calculator, press Load example, press Run, and read the interpretation.',
      'Use the &#9734; star in the top bar to pin anything you use often to <a href="#/fav">Favorites</a>.'
    ] },
    { h: 'Where your work lives', p: [
      'Saved analyses, checklist progress and favorites are stored in this browser only. Export a backup from <a href="#/backup">Backup / Restore</a> before switching machines.'
    ] }
  ]
});
PS_HELP.push({
  id: 'navigating', title: 'Navigation and search',
  sections: [
    { h: 'Sidebar', p: [ 'The sidebar groups the app by job: Knowledge, SOPs, Toolkit, Checklists, Templates, KPIs, Workspace and Help. On narrow screens the sidebar becomes a slide-in drawer opened from the top-left button.' ] },
    { h: 'Search', p: [
      'Press <kbd>Ctrl</kbd>+<kbd>K</kbd> or <kbd>/</kbd> anywhere to focus search. It matches titles, descriptions, tags and body text across every library, including the glossary. Results are grouped by type; Enter opens the best match.' ] },
    { h: 'Cross-links', p: [ 'Most content pages end with "Related" chips linking to the SOPs, checklists, calculators, templates and KPIs that apply. Follow them instead of hunting through menus.' ] },
    { h: 'History', p: [ 'Use the browser Back button - the app supports it. Recently used pages are also listed under <a href="#/recent">Recently used</a>.' ] }
  ]
});
PS_HELP.push({
  id: 'calculators', title: 'Using the calculators',
  sections: [
    { h: 'The four buttons', ul: [
      '<b>Load example</b> - fills realistic sample inputs so you can see the shape of the answer first.',
      '<b>Run</b> - validates inputs, computes, and renders results with interpretation, formula and assumptions.',
      '<b>Save</b> - stores the analysis (inputs and results) in the Workspace with a title and your notes.',
      '<b>Clear</b> - empties the form. Saved analyses are not affected.'
    ] },
    { h: 'Reading a result', p: [ 'Every result shows the computed numbers, what they mean in plain language, the formula used, the assumptions baked in, and the limitations. Read the interpretation before quoting a number in a negotiation.' ] },
    { h: 'Notes and evidence', p: [ 'Use the Notes box to record why you chose each input (quote reference, index source, agreed baseline). Saved reports include your notes - this is what makes a number defensible later.' ] },
    { h: 'Rounding', p: [ 'Displays are rounded for reading; calculations use full precision. Currency formatting follows the settings page currency symbol.' ] }
  ]
});

PS_HELP.push({
  id: 'sops-checklists', title: 'SOPs and checklists',
  sections: [
    { h: 'One SOP = one job', p: [ 'Each SOP page carries everything for that task on one scroll: purpose, scope, trigger, roles, numbered steps with detail, decision points, controls, inputs, outputs, records, risks, KPIs, and the tools that support it.' ] },
    { h: 'Embedded checklists', p: [ 'The checklist on an SOP page is live: tick items as you work, add notes per item, and the progress bar and percentage update. Progress is saved automatically in this browser per checklist.' ] },
    { h: 'Standalone checklists', p: [ 'The <a href="#/list/cl">Checklists</a> library holds the same checklists for use without the SOP - for example a contract review checklist run by a non-procurement colleague. Tick state is shared with the SOP view.' ] },
    { h: 'Printing', p: [ 'Use the printer button on any checklist or SOP. The print view keeps the content and drops navigation, buttons and progress controls.' ] }
  ]
});
PS_HELP.push({
  id: 'templates', title: 'Templates',
  sections: [
    { h: 'Fill in, then print', p: [ 'Open a template, complete the fields (required fields are marked), then use Print to produce a clean document. Templates with a two-column layout print as a form-ready sheet.' ] },
    { h: 'Saving a draft', p: [ 'Use Save to keep a partially completed template in the Workspace. Reopen it from Workspace later, update, and print. Nothing leaves the browser.' ] }
  ]
});
PS_HELP.push({
  id: 'saving-data', title: 'Where your data is stored',
  sections: [
    { h: 'Browser storage only', p: [
      'All saved work - analyses, checklist ticks, template drafts, favorites, recently used, settings - is kept in your browser local storage under keys prefixed with the app namespace. There is no server, no account and no tracking. The app makes no network requests after it loads.'
    ] },
    { h: 'What this means in practice', ul: [
      'Saved work belongs to this browser profile on this machine.',
      'Incognito / private windows usually do not keep local storage - do not rely on saves there.',
      'Clearing site data for the page deletes everything saved.',
      'Different browsers on the same machine do not share saves.'
    ] },
    { h: 'Moving your work', p: [ 'Backup / Restore exports everything as a single JSON file; Restore merges a backup back in. Export before major changes, and before switching browser or machine.' ] }
  ]
});
PS_HELP.push({
  id: 'printing', title: 'Printing and PDF',
  sections: [
    { h: 'The printer button', p: [ 'Every page has a printer action. The print stylesheet removes the sidebar, buttons, inputs and navigation, and keeps headings, tables, results, notes and the footer with date and page title.' ] },
    { h: 'To PDF', p: [ 'Choose "Save as PDF" in the browser print dialog. For a calculator report, run first, add notes, then print - the PDF includes inputs, results, interpretation and your notes, which is what you attach to an approval or file.' ] },
    { h: 'Page breaks', p: [ 'Long tables and SOP steps break across pages cleanly; a printed checklist shows ticked state as text so the progress is visible on paper.' ] }
  ]
});
PS_HELP.push({
  id: 'troubleshooting', title: 'Troubleshooting',
  sections: [
    { h: 'Common issues', table: { headers: ['Symptom', 'What to do'], rows: [
      ['Saved items are gone', 'Browser data was cleared or you are in a different browser or profile. Restore from your backup JSON via Backup / Restore.'],
      ['"Could not save" / storage errors', 'Local storage is full (~5 MB). Delete old saved analyses in Workspace, or export a backup and clear the workspace.'],
      ['App appears blank or unstyled', 'The file may be truncated (re-download it) or the browser is too old - use a current Chrome, Edge or Firefox.'],
      ['Search finds nothing', 'Search indexes after the app fully loads; if scripts are blocked the app cannot work - enable scripts for the page.'],
      ['Backup import fails', 'The JSON must be an export from this app (same version or older). Check the file was not edited.']
    ] } },
    { h: 'Resetting the app', p: [ 'Settings - Clear saved data removes saved work (not the app itself). Keep a backup export first. To return to a pristine app, re-download the HTML file.' ] }
  ]
});
PS_HELP.push({
  id: 'methodology', title: 'What the numbers mean',
  sections: [
    { h: 'Formulas are shown, not hidden', p: [ 'Every calculator states its formula and assumptions on the page. If your organisation uses different conventions (e.g. working-capital day count), align the inputs or treat the output as indicative.' ] },
    { h: 'Garbage in, garbage out', p: [ 'A savings number is only defensible with a documented baseline, agreed volumes and a validation step. The toolkit structures this - the judgement stays with you.' ] },
    { h: 'Not policy', p: [ 'Procure Sherpa reflects common practice, not your organisation policy. Where your approval matrix, templates or thresholds differ, follow your policy and use the toolkit to prepare the analysis.' ] }
  ]
});
