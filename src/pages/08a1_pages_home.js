/* ==========================================================
   Section L: page renderers
   Home = Executive Command Center:
   - Personalized Local User Profile Welcome
   - Segregated Dual-Hub Gateway (Academy vs Operations)
   - Smart Workspace Resume
   - Featured Thinking Point
   ========================================================== */

PS.HUB_FLOW = [];
PS.HUB = [];

PS.route('home', function () {
  PS.pageTitle = 'Command Center';
  return PS.homeWelcomeCard() +
    PS.homeDualHub() +
    PS.homeSmartResume() +
    PS.homeQuickActions() +
    PS.homeThinkingPoint() +
    PS.disclaimer('policy');
});
