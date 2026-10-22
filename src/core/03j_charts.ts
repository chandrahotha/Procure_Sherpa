/* ==========================================================
   Section C: SVG Visual Analytics Engine
   Pure inline SVG data visualizers:
   1. PS.chart.waterfall (Should-Cost & Margin Breakdown)
   2. PS.chart.kraljic (2x2 Portfolio Matrix)
   3. PS.chart.pareto (80/20 Spend Concentration)
   4. PS.chart.zscoreGauge (Altman Z-Score Solvency Gauge)
   ========================================================== */

PS.chart = {
  /* Export SVG as file */
  exportSVG: function (svgElement, filename) {
    var serializer = new XMLSerializer();
    var source = serializer.serializeToString(svgElement);
    if (!source.match(/^<svg[^>]*xmlns/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    var blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename || 'chart.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },
  /* Should-Cost Waterfall Buildup Chart */
  waterfall: function (items, opts) {
    opts = opts || {};
    var w = opts.width || 680;
    var h = opts.height || 260;
    var padLeft = 60;
    var padRight = 30;
    var padTop = 30;
    var padBottom = 55;
    var chartW = w - padLeft - padRight;
    var chartH = h - padTop - padBottom;

    if (!items || !items.length) return '<div class="chart-empty">No cost elements to visualize.</div>';

    var total = 0;
    items.forEach(function (it) { total += Number(it.val) || 0; });
    var maxVal = Math.max(total * 1.12, 1);

    var allBars = items.concat([{ label: 'Final Price', val: total, isTotal: true }]);
    var barW = Math.max(Math.min(chartW / allBars.length - 12, 65), 24);
    var slotW = chartW / allBars.length;

    var runningTotal = 0;
    var svgParts = [];

    /* Background Grid Lines */
    for (var g = 0; g <= 4; g++) {
      var gridY = padTop + chartH * (g / 4);
      var gridVal = (maxVal * (1 - g / 4));
      svgParts.push(
        '<line x1="' + padLeft + '" y1="' + gridY.toFixed(1) + '" x2="' + (w - padRight) + '" y2="' + gridY.toFixed(1) + '" stroke="var(--border)" stroke-width="1" stroke-dasharray="3,3" />' +
        '<text x="' + (padLeft - 8) + '" y="' + (gridY + 4).toFixed(1) + '" text-anchor="end" font-size="10" fill="var(--mute)">' + (opts.currency || '$') + gridVal.toFixed(0) + '</text>'
      );
    }

    /* Render Bars */
    allBars.forEach(function (b, idx) {
      var val = Number(b.val) || 0;
      var startYVal = b.isTotal ? 0 : runningTotal;
      var endYVal = b.isTotal ? total : (runningTotal + val);

      var y0 = padTop + chartH * (1 - startYVal / maxVal);
      var y1 = padTop + chartH * (1 - endYVal / maxVal);
      var barTop = Math.min(y0, y1);
      var barH = Math.max(Math.abs(y0 - y1), 2);
      var barX = padLeft + idx * slotW + (slotW - barW) / 2;

      /* Guideline to next bar */
      if (!b.isTotal && idx < allBars.length - 1) {
        var nextSlotX = padLeft + (idx + 1) * slotW + (slotW - barW) / 2;
        svgParts.push(
          '<line x1="' + (barX + barW) + '" y1="' + y1.toFixed(1) + '" x2="' + nextSlotX + '" y2="' + y1.toFixed(1) + '" stroke="var(--border-2)" stroke-width="1.2" stroke-dasharray="2,2" />'
        );
      }

      var fillGrad = b.isTotal ? 'url(#wfGradTotal)' : (val < 0 ? 'url(#wfGradNeg)' : 'url(#wfGradPos)');
      var strokeColor = b.isTotal ? '#059669' : (val < 0 ? '#dc2626' : '#4f46e5');

      svgParts.push(
        '<rect x="' + barX.toFixed(1) + '" y="' + barTop.toFixed(1) + '" width="' + barW.toFixed(1) + '" height="' + barH.toFixed(1) + '" rx="4" fill="' + fillGrad + '" stroke="' + strokeColor + '" stroke-width="1.2" />' +
        '<text x="' + (barX + barW / 2).toFixed(1) + '" y="' + (barTop - 7).toFixed(1) + '" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text)">' +
        (opts.currency || '$') + val.toFixed(2) + '</text>' +
        '<text x="' + (barX + barW / 2).toFixed(1) + '" y="' + (h - padBottom + 16).toFixed(1) + '" text-anchor="middle" font-size="10.5" font-weight="600" fill="var(--dim)">' +
        PS.esc(b.label) + '</text>'
      );

      if (!b.isTotal) {
        var pct = total > 0 ? ((val / total) * 100).toFixed(1) + '%' : '';
        svgParts.push(
          '<text x="' + (barX + barW / 2).toFixed(1) + '" y="' + (h - padBottom + 30).toFixed(1) + '" text-anchor="middle" font-size="9.5" fill="var(--mute)">' +
          pct + '</text>'
        );
        runningTotal += val;
      }
    });

    var defs = '<defs>' +
      '<linearGradient id="wfGradPos" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#6366f1" stop-opacity="0.9" />' +
      '<stop offset="100%" stop-color="#4f46e5" stop-opacity="0.8" />' +
      '</linearGradient>' +
      '<linearGradient id="wfGradTotal" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#10b981" stop-opacity="0.95" />' +
      '<stop offset="100%" stop-color="#059669" stop-opacity="0.85" />' +
      '</linearGradient>' +
      '<linearGradient id="wfGradNeg" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#f87171" stop-opacity="0.95" />' +
      '<stop offset="100%" stop-color="#dc2626" stop-opacity="0.85" />' +
      '</linearGradient>' +
      '</defs>';

    return '<div class="chart-container">' +
      '<div class="chart-title"><span>Should-Cost Composition Waterfall</span> <span class="chart-badge">TCO Cost Buildup</span></div>' +
      '<div class="chart-actions" style="display:flex;gap:8px;margin-top:8px">' +
      '<button type="button" class="btn btn-sm btn-ghost" data-act="chart-export" data-chart-type="waterfall" title="Export as SVG">⬇ Export SVG</button>' +
      '</div>' +
      '<div class="chart-svg-wrap">' +
      '<svg viewBox="0 0 ' + w + ' ' + h + '" class="svg-responsive" role="img" aria-label="Should-Cost Waterfall">' +
      defs + svgParts.join('') +
      '</svg></div></div>';
  },

  /* Kraljic 2x2 Portfolio Matrix Visualizer */
  kraljic: function (items, opts) {
    opts = opts || {};
    var w = opts.width || 600;
    var h = opts.height || 420;
    var pad = 45;
    var midX = pad + (w - pad * 2) / 2;
    var midY = pad + (h - pad * 2) / 2;

    var svg = [];

    /* Quadrant Backgrounds */
    // Top-Left: Leverage (High Impact, Low Risk)
    svg.push('<rect x="' + pad + '" y="' + pad + '" width="' + (midX - pad) + '" height="' + (midY - pad) + '" fill="rgba(16, 185, 129, 0.08)" stroke="var(--border)" stroke-width="1" />');
    // Top-Right: Strategic (High Impact, High Risk)
    svg.push('<rect x="' + midX + '" y="' + pad + '" width="' + (w - pad - midX) + '" height="' + (midY - pad) + '" fill="rgba(99, 102, 241, 0.09)" stroke="var(--border)" stroke-width="1" />');
    // Bottom-Left: Non-Critical (Low Impact, Low Risk)
    svg.push('<rect x="' + pad + '" y="' + midY + '" width="' + (midX - pad) + '" height="' + (h - pad - midY) + '" fill="rgba(100, 116, 139, 0.07)" stroke="var(--border)" stroke-width="1" />');
    // Bottom-Right: Bottleneck (Low Impact, High Risk)
    svg.push('<rect x="' + midX + '" y="' + midY + '" width="' + (w - pad - midX) + '" height="' + (h - pad - midY) + '" fill="rgba(245, 158, 11, 0.08)" stroke="var(--border)" stroke-width="1" />');

    /* Quadrant Watermark Headers */
    svg.push('<text x="' + (pad + 12) + '" y="' + (pad + 24) + '" font-size="12" font-weight="800" fill="#059669" letter-spacing="0.05em">LEVERAGE (High Value, Low Risk)</text>');
    svg.push('<text x="' + (pad + 12) + '" y="' + (pad + 38) + '" font-size="10" fill="var(--mute)">Strategy: Competitive Tendering, Reverse Auctions</text>');

    svg.push('<text x="' + (midX + 12) + '" y="' + (pad + 24) + '" font-size="12" font-weight="800" fill="#6366f1" letter-spacing="0.05em">STRATEGIC (High Value, High Risk)</text>');
    svg.push('<text x="' + (midX + 12) + '" y="' + (pad + 38) + '" font-size="10" fill="var(--mute)">Strategy: Long-Term Partnerships, SRM, Co-Development</text>');

    svg.push('<text x="' + (pad + 12) + '" y="' + (midY + 24) + '" font-size="12" font-weight="800" fill="#64748b" letter-spacing="0.05em">NON-CRITICAL (Low Value, Low Risk)</text>');
    svg.push('<text x="' + (pad + 12) + '" y="' + (midY + 38) + '" font-size="10" fill="var(--mute)">Strategy: P-Cards, Catalogs, Vendor Consolidation</text>');

    svg.push('<text x="' + (midX + 12) + '" y="' + (midY + 24) + '" font-size="12" font-weight="800" fill="#d97706" letter-spacing="0.05em">BOTTLENECK (Low Value, High Risk)</text>');
    svg.push('<text x="' + (midX + 12) + '" y="' + (midY + 38) + '" font-size="10" fill="var(--mute)">Strategy: Safety Stock, Dual-Sourcing, Standardize Specs</text>');

    /* Axis Dividers */
    svg.push('<line x1="' + midX + '" y1="' + pad + '" x2="' + midX + '" y2="' + (h - pad) + '" stroke="var(--border-2)" stroke-width="2" />');
    svg.push('<line x1="' + pad + '" y1="' + midY + '" x2="' + (w - pad) + '" y2="' + midY + '" stroke="var(--border-2)" stroke-width="2" />');

    /* Axis Labels */
    svg.push('<text x="' + (w / 2) + '" y="' + (h - 12) + '" text-anchor="middle" font-size="12" font-weight="700" fill="var(--dim)">Supply Market Complexity & Risk &rarr;</text>');
    svg.push('<text x="14" y="' + (h / 2) + '" text-anchor="middle" font-size="12" font-weight="700" fill="var(--dim)" transform="rotate(-90 14 ' + (h / 2) + ')">Financial & Profit Impact &rarr;</text>');

    /* Render Category Nodes */
    (items || []).forEach(function (cat) {
      var cx = pad + (cat.risk / 100) * (w - pad * 2);
      var cy = (h - pad) - (cat.impact / 100) * (h - pad * 2);
      var r = Math.max(Math.min(cat.spendRatio ? cat.spendRatio * 22 : 14, 26), 9);
      var color = cat.color || '#4f46e5';

      svg.push(
        '<g class="kraljic-node" tabindex="0">' +
        '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + r + '" fill="' + color + '" fill-opacity="0.85" stroke="#fff" stroke-width="2" />' +
        '<text x="' + cx.toFixed(1) + '" y="' + (cy + r + 13).toFixed(1) + '" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text)">' +
        PS.esc(cat.name) + '</text>' +
        (cat.spend ? '<text x="' + cx.toFixed(1) + '" y="' + (cy + r + 24).toFixed(1) + '" text-anchor="middle" font-size="9.5" fill="var(--mute)">' + PS.esc(cat.spend) + '</text>' : '') +
        '</g>'
      );
    });

    return '<div class="chart-container">' +
      '<div class="chart-title"><span>Kraljic Sourcing Portfolio Matrix</span> <span class="chart-badge">Strategic Positioning</span></div>' +
      '<div class="chart-actions" style="display:flex;gap:8px;margin-top:8px">' +
      '<button type="button" class="btn btn-sm btn-ghost" data-act="chart-export" data-chart-type="kraljic" title="Export as SVG">⬇ Export SVG</button>' +
      '</div>' +
      '<div class="chart-svg-wrap">' +
      '<svg viewBox="0 0 ' + w + ' ' + h + '" class="svg-responsive" role="img" aria-label="Kraljic Portfolio Matrix">' +
      svg.join('') +
      '</svg></div></div>';
  },

  /* Pareto 80/20 Spend Distribution Curve */
  pareto: function (vendors, opts) {
    opts = opts || {};
    var w = opts.width || 680;
    var h = opts.height || 280;
    var padLeft = 65;
    var padRight = 55;
    var padTop = 35;
    var padBottom = 65;
    var chartW = w - padLeft - padRight;
    var chartH = h - padTop - padBottom;

    if (!vendors || !vendors.length) return '<div class="chart-empty">No spend data.</div>';

    var sorted = vendors.slice().sort(function (a, b) { return (b.spend || 0) - (a.spend || 0); });
    var totalSpend = 0;
    sorted.forEach(function (v) { totalSpend += Number(v.spend) || 0; });
    var maxSpend = sorted[0] ? sorted[0].spend * 1.15 : 1;

    var slotW = chartW / sorted.length;
    var barW = Math.max(slotW * 0.65, 14);

    var svg = [];
    var cumPoints = [];
    var cumSpend = 0;

    /* Background Grid & Axes */
    for (var i = 0; i <= 4; i++) {
      var gy = padTop + chartH * (i / 4);
      var gVal = (maxSpend * (1 - i / 4));
      var gPct = (100 * (1 - i / 4)).toFixed(0);
      svg.push(
        '<line x1="' + padLeft + '" y1="' + gy.toFixed(1) + '" x2="' + (w - padRight) + '" y2="' + gy.toFixed(1) + '" stroke="var(--border)" stroke-width="1" stroke-dasharray="3,3" />' +
        '<text x="' + (padLeft - 8) + '" y="' + (gy + 4).toFixed(1) + '" text-anchor="end" font-size="10" fill="var(--mute)">$' + (gVal / 1000).toFixed(0) + 'k</text>' +
        '<text x="' + (w - padRight + 8) + '" y="' + (gy + 4).toFixed(1) + '" text-anchor="start" font-size="10" fill="#d97706">' + gPct + '%</text>'
      );
    }

    /* 80% Cutoff Line */
    var y80 = padTop + chartH * (1 - 0.8);
    svg.push(
      '<line x1="' + padLeft + '" y1="' + y80.toFixed(1) + '" x2="' + (w - padRight) + '" y2="' + y80.toFixed(1) + '" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="5,4" />' +
      '<text x="' + (w - padRight - 8) + '" y="' + (y80 - 6).toFixed(1) + '" text-anchor="end" font-size="10" font-weight="700" fill="#ef4444">80% Spend Cutoff (Category Class A)</text>'
    );

    /* Render Spend Bars */
    sorted.forEach(function (v, idx) {
      var spend = Number(v.spend) || 0;
      var barH = (spend / maxSpend) * chartH;
      var barX = padLeft + idx * slotW + (slotW - barW) / 2;
      var barY = padTop + chartH - barH;

      cumSpend += spend;
      var cumPct = totalSpend > 0 ? (cumSpend / totalSpend) : 0;
      var ptX = barX + barW / 2;
      var ptY = padTop + chartH * (1 - cumPct);
      cumPoints.push({ x: ptX, y: ptY, pct: (cumPct * 100).toFixed(1) });

      var isClassA = (cumSpend - spend) / totalSpend < 0.8;
      var fill = isClassA ? '#4f46e5' : '#94a3b8';

      svg.push(
        '<rect x="' + barX.toFixed(1) + '" y="' + barY.toFixed(1) + '" width="' + barW.toFixed(1) + '" height="' + barH.toFixed(1) + '" rx="3" fill="' + fill + '" />' +
        '<text x="' + (barX + barW / 2).toFixed(1) + '" y="' + (h - padBottom + 16).toFixed(1) + '" text-anchor="end" font-size="9.5" font-weight="600" fill="var(--dim)" transform="rotate(-35 ' + (barX + barW / 2) + ' ' + (h - padBottom + 16) + ')">' +
        PS.esc(v.name) + '</text>'
      );
    });

    /* Cumulative Spline Line */
    if (cumPoints.length > 1) {
      var pathD = 'M ' + cumPoints[0].x.toFixed(1) + ' ' + cumPoints[0].y.toFixed(1);
      for (var p = 1; p < cumPoints.length; p++) {
        pathD += ' L ' + cumPoints[p].x.toFixed(1) + ' ' + cumPoints[p].y.toFixed(1);
      }
      svg.push('<path d="' + pathD + '" fill="none" stroke="#d97706" stroke-width="2.5" />');
      cumPoints.forEach(function (pt) {
        svg.push(
          '<circle cx="' + pt.x.toFixed(1) + '" cy="' + pt.y.toFixed(1) + '" r="3.5" fill="#fff" stroke="#d97706" stroke-width="2" />'
        );
      });
    }

    return '<div class="chart-container">' +
      '<div class="chart-title"><span>Pareto Spend Distribution (80/20 Rule)</span> <span class="chart-badge">Spend Analysis</span></div>' +
      '<div class="chart-actions" style="display:flex;gap:8px;margin-top:8px">' +
      '<button type="button" class="btn btn-sm btn-ghost" data-act="chart-export" data-chart-type="pareto" title="Export as SVG">⬇ Export SVG</button>' +
      '</div>' +
      '<div class="chart-svg-wrap">' +
      '<svg viewBox="0 0 ' + w + ' ' + h + '" class="svg-responsive" role="img" aria-label="Pareto Spend Distribution">' +
      svg.join('') +
      '</svg></div></div>';
  },

  /* Altman Z-Score Solvency Risk Gauge */
  zscoreGauge: function (score, opts) {
    opts = opts || {};
    var w = opts.width || 380;
    var h = opts.height || 220;
    var cx = w / 2;
    var cy = 170;
    var r = 120;
    var thickness = 26;

    var z = Number(score) || 0;
    // Scale: 0 to 4.0 mapped to 180 degrees (PI to 0)
    var clamped = Math.max(Math.min(z, 4.0), 0);
    var angle = Math.PI - (clamped / 4.0) * Math.PI;

    var needleX = cx + (r - 12) * Math.cos(angle);
    var needleY = cy - (r - 12) * Math.sin(angle);

    var zoneLabel = 'Distress Zone (High Insolvency Risk)';
    var zoneColor = '#ef4444';
    if (z >= 2.90) {
      zoneLabel = 'Safe Zone (Low Default Probability)';
      zoneColor = '#10b981';
    } else if (z >= 1.23) {
      zoneLabel = 'Grey Zone (Marginal Liquidity / Monitor)';
      zoneColor = '#f59e0b';
    }

    var svg = [
      /* Red Arc (0 to 1.23) -> angle PI to PI - (1.23/4)*PI */
      '<path d="M ' + (cx - r) + ' ' + cy + ' A ' + r + ' ' + r + ' 0 0 1 ' + (cx + r * Math.cos(Math.PI - 1.23/4*Math.PI)).toFixed(1) + ' ' + (cy - r * Math.sin(Math.PI - 1.23/4*Math.PI)).toFixed(1) + '" fill="none" stroke="#ef4444" stroke-width="' + thickness + '" />',
      /* Amber Arc (1.23 to 2.90) */
      '<path d="M ' + (cx + r * Math.cos(Math.PI - 1.23/4*Math.PI)).toFixed(1) + ' ' + (cy - r * Math.sin(Math.PI - 1.23/4*Math.PI)).toFixed(1) + ' A ' + r + ' ' + r + ' 0 0 1 ' + (cx + r * Math.cos(Math.PI - 2.90/4*Math.PI)).toFixed(1) + ' ' + (cy - r * Math.sin(Math.PI - 2.90/4*Math.PI)).toFixed(1) + '" fill="none" stroke="#f59e0b" stroke-width="' + thickness + '" />',
      /* Green Arc (2.90 to 4.0) */
      '<path d="M ' + (cx + r * Math.cos(Math.PI - 2.90/4*Math.PI)).toFixed(1) + ' ' + (cy - r * Math.sin(Math.PI - 2.90/4*Math.PI)).toFixed(1) + ' A ' + r + ' ' + r + ' 0 0 1 ' + (cx + r) + ' ' + cy + '" fill="none" stroke="#10b981" stroke-width="' + thickness + '" />',

      /* Gauge Tick Marks & Labels */
      '<text x="' + (cx - r - 6) + '" y="' + (cy + 16) + '" font-size="10" font-weight="700" fill="#ef4444">0.0</text>',
      '<text x="' + (cx + r * Math.cos(Math.PI - 1.23/4*Math.PI) - 8).toFixed(1) + '" y="' + (cy - r * Math.sin(Math.PI - 1.23/4*Math.PI) - 10).toFixed(1) + '" font-size="10" font-weight="700" fill="#ef4444">1.23</text>',
      '<text x="' + (cx + r * Math.cos(Math.PI - 2.90/4*Math.PI) + 4).toFixed(1) + '" y="' + (cy - r * Math.sin(Math.PI - 2.90/4*Math.PI) - 10).toFixed(1) + '" font-size="10" font-weight="700" fill="#10b981">2.90</text>',
      '<text x="' + (cx + r - 4) + '" y="' + (cy + 16) + '" font-size="10" font-weight="700" fill="#10b981">4.0+</text>',

      /* Needle */
      '<line x1="' + cx + '" y1="' + cy + '" x2="' + needleX.toFixed(1) + '" y2="' + needleY.toFixed(1) + '" stroke="var(--text)" stroke-width="3" stroke-linecap="round" />',
      '<circle cx="' + cx + '" cy="' + cy + '" r="7" fill="var(--text)" />',

      /* Center Readout */
      '<text x="' + cx + '" y="' + (cy - 30) + '" text-anchor="middle" font-size="24" font-weight="800" fill="' + zoneColor + '">' + z.toFixed(2) + '</text>',
      '<text x="' + cx + '" y="' + (cy + 34) + '" text-anchor="middle" font-size="11.5" font-weight="700" fill="' + zoneColor + '">' + zoneLabel + '</text>'
    ];

    return '<div class="chart-container">' +
      '<div class="chart-title"><span>Altman Z-Score Solvency Dial</span> <span class="chart-badge">Supplier Financial Health</span></div>' +
      '<div class="chart-actions" style="display:flex;gap:8px;margin-top:8px;justify-content:center">' +
      '<button type="button" class="btn btn-sm btn-ghost" data-act="chart-export" data-chart-type="zscore" title="Export as SVG">⬇ Export SVG</button>' +
      '</div>' +
      '<div class="chart-svg-wrap" style="text-align:center;">' +
      '<svg viewBox="0 0 ' + w + ' ' + h + '" class="svg-responsive" style="max-width:380px; margin:0 auto;" role="img" aria-label="Altman Z-Score Gauge">' +
      svg.join('') +
      '</svg></div></div>';
  }
};
