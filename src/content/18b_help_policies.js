/* ==========================================================
   Procure Sherpa v3.0 - Help Center policy topics.
   The footer has always promised Privacy, Disclaimers and
   Assumptions, and none of them existed: the router answers an
   unknown help topic with the Help list, so the links looked alive
   while delivering nothing. A gate now checks the argument of a
   help link, which is how the gap was found. These three topics
   close it with what the product actually does rather than with
   language written to reassure.
   ========================================================== */

PS_HELP.push({
  id: 'privacy', title: 'Privacy and where your data is held',
  sections: [
    { h: 'The short answer', p: [
      'Procure Sherpa has no accounts, no server-side storage and no telemetry. Everything you enter is written to your browsers local storage on the machine you are using, and the only network request the application makes is the one that fetched this page.'
    ] },
    { h: 'What is stored, and where you can see it', ul: [
      'Saved calculations, checklist progress, filled templates, favourites, recently used pages, notes, preferences and the local audit log - each in its own storage key.',
      'Academy progress: which lessons were studied and completed, quiz answers, exam attempts, badges and the review-queue dates.',
      '<a href="#/settings">Settings</a> includes the storage view of what is held and how large each part is, and <a href="#/audit">Activity log</a> shows the local event history.',
      'Nothing is written to a database we operate, because there is no database we operate.'
    ] },
    { h: 'What the application does not do', p: [
      'It sends no analytics, no crash reports and no usage statistics. Its content security policy forbids outbound connections, and the security audit in the build fails the release if a runtime network call appears. The strings that look like web addresses inside the file are metadata in the page head and the SVG namespace - they are never fetched.'
    ] },
    { h: 'What is not protected', p: [
      'Local storage is as private as the machine and the browser profile it sits in. Anyone with access to your browser can open this file and see your work; the operating system, the browser vendor and any sync or backup feature you enable are outside this applications control.',
      'The backup file you export is plain JSON. Treat it as you would treat a spreadsheet containing your commercial data: store it somewhere you control, and do not send it by an unmanaged channel.'
    ] },
    { h: 'If you want it removed', p: [
      'Settings has a Clear Local Data action that shows exactly what will be deleted and offers a backup first. Deleting the file you opened removes the application; it does not remove the data, which lives in the browser - use the clear action for that.'
    ] },
    { h: 'The hosted version', p: [
      'The deployment at procuresherpa.vercel.app serves the same single file over HTTPS. The hosting provider sees the usual web-server record of a request - IP address, user agent, timestamp - and the application itself does nothing further with it. If that record matters to you, use the downloaded file: it works identically with no network at all.'
    ] }
  ],
  related: [{ t: 'calc', id: 'calc-po-value-check' }]
});

PS_HELP.push({
  id: 'disclaimers', title: 'Disclaimers: what this tool is not',
  sections: [
    { h: 'It is a learning and decision-support tool', p: [
      'Procure Sherpa is not an ERP, not a source-to-contract system, and not a system of record. It has no supplier master, no purchase orders and no approval workflow that anyone is obliged to follow. Records you create here exist to help you think, not to bind the business.'
    ] },
    { h: 'Nothing here is a credential', p: [
      'The practice exams, badges, transcript and maturity scores are computed locally from the content in this file. Procure Sherpa is not an authorised issuer of procurement qualifications: an exam result here is not a certification, not an accredited course, and not verifiable by any third party. Where a real credential matters, the awarding bodies are CIPS, CPSM and their equivalents.'
    ] },
    { h: 'Not legal, tax or financial advice', p: [
      'Clauses, thresholds, tax treatments, retention periods and regulatory references are written to teach a mechanism. They are general, they are simplified, and the real answer depends on your jurisdiction, your contract and your counsel. Verify locally before relying on any of it operationally.'
    ] },
    { h: 'Worked examples are constructed', p: [
      'Every example figure in this product - in lessons, calculators, scenarios and KPI illustrations - is invented to show how a mechanism behaves. They are not reports of real organisations, not benchmark data, and not audited results. A gate in the build fails if any of those surfaces loses its illustrative label.'
    ] },
    { h: 'Numbers you see are numbers you typed', p: [
      'Savings, cost avoidance and benefit figures depend entirely on the inputs and the baseline you choose. The tool does not verify supplier data, does not benchmark against an external dataset, and cannot tell you whether your baseline was honest. That is the users responsibility, and the calculators say so where the assumption is made.'
    ] }
  ]
});

PS_HELP.push({
  id: 'assumptions', title: 'Assumptions the tools make',
  sections: [
    { h: 'Why this page exists', p: [
      'Every calculator is a small model, and a model is only as good as the assumptions inside it. These are the ones the product makes on your behalf, and where you can change them.'
    ] },
    { h: 'Configurable in Settings', ul: [
      'Currency and decimal formatting, organisation and department names used in exports.',
      'Default tax rate, and whether a calculator treats prices as tax-inclusive.',
      'Approval thresholds and the competitive-bid value that changes which guidance you get.',
      'Rate defaults used by the payment-terms and escalation tools.'
    ] },
    { h: 'Built in, and stated where they are used', ul: [
      'A year is twelve periods and a working year is treated as 250 working days where a tool needs one.',
      'Landed-cost and freight tools assume Incoterms responsibilities as published for the named rule.',
      'The review queue schedules a passed lesson at 7, 21, 60 and 180 days, and a shaky one at 3, 14 and 45.',
      'Maturity scoring treats the levels as ordinal, so a score is a position on a ladder rather than a quantity of anything.',
      'Should-cost and savings tools assume the baseline you enter is the counterfactual - what would have happened without the change.'
    ] },
    { h: 'What the tools deliberately do not assume', p: [
      'They do not assume a supplier quote is comparable across bids; the comparison tools ask you to normalise scope, currency, freight and tax first. They do not assume your forecast is right; multi-year tools show the term total and let you vary the escalation rather than presenting one figure as fact.'
    ] },
    { h: 'When an assumption is wrong for you', p: [
      'Change the setting where one exists. Where it does not, treat the output as an illustration of the mechanism and rebuild the arithmetic with your own figures before using it in a decision. Nothing here is calibrated to your organisation.'
    ] }
  ]
});
