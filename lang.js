/* ============================================================================
   KENVINZONE PROP HUB — BILINGUAL ENGINE (VI / EN)
   Đồng bộ hoàn toàn chuẩn ?lang= > cookie .kenvinzone.com > localStorage > TZ
   với kenvinzone.com & aurora.kenvinzone.com
   ============================================================================ */

(function () {
  function detectInitialLang() {
    let q = null;
    try {
      q = new URLSearchParams(location.search).get("lang");
    } catch (_) {}
    const c = (document.cookie.match(/(?:^|; )kz-lang=(en|vi)/) || [])[1];
    let s = null;
    try {
      s = localStorage.getItem("kz-lang");
    } catch (_) {}
    let l = q === "en" || q === "vi" ? q : c || s;
    if (l !== "en" && l !== "vi") {
      let tz = "";
      try {
        tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      } catch (_) {}
      const langs = (navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language || "vi"]
      ).map((x) => String(x).toLowerCase());
      l = /^Asia\/(Ho_Chi_Minh|Saigon)$/.test(tz) || langs.some((x) => x.indexOf("vi") === 0) ? "vi" : "en";
    }
    return l;
  }

  let currentLang = detectInitialLang();
  document.documentElement.lang = currentLang;

  function persistLang(lang) {
    currentLang = lang === "en" ? "en" : "vi";
    document.documentElement.lang = currentLang;
    try {
      localStorage.setItem("kz-lang", currentLang);
    } catch (_) {}
    try {
      const host = location.hostname || "";
      const domainAttr = /\.?kenvinzone\.com$/i.test(host) ? "; domain=.kenvinzone.com" : "";
      document.cookie = `kz-lang=${currentLang}; path=/${domainAttr}; max-age=31536000; SameSite=Lax`;
    } catch (_) {}
  }

  /* ---------- UI Dictionary (EN) ---------- */
  const EN_UI = {
    // Nav & Header
    "nav.compare": "Compare 3 Firms",
    "nav.rules": "Rule Deep-Dive",
    "nav.tools": "Calculators",
    "nav.guide": "📘 Futures 101",
    "nav.coupons": "🔥 Coupon Codes",
    "nav.back": "← Rules Dashboard",
    "nav.ctaCoupon": "Hot Coupons",
    "nav.ctaAurora": "Explore Aurora V12.2",

    // Ticker Marquee
    "ticker.bx": "<span class=\"kz-ticker-dot\"></span><strong>BULENOX:</strong> Code <span class=\"mono\" style=\"color:var(--kz-gold)\">5BAAG</span> up to 89% OFF Option 1 (from $15.95) & 75% OFF Option 2 EOD",
    "ticker.e2t": "<span class=\"kz-ticker-dot\" style=\"background:var(--kz-gold)\"></span><strong>EARN2TRADE BLACK WEEK:</strong> Code <span class=\"mono\" style=\"color:var(--kz-gold)\">BIGBF2026</span> up to 70% OFF (2 months) + discounted Resets",
    "ticker.ts": "<span class=\"kz-ticker-dot\" style=\"background:var(--kz-green)\"></span><strong>TOPSTEP FRIENDSGIVING:</strong> Code <span class=\"mono\" style=\"color:var(--kz-green)\">KENVINZONE</span> 50% OFF first Combine (from $24.50)",
    "ticker.au": "<span class=\"kz-ticker-dot\" style=\"background:var(--kz-cyan)\"></span><strong>AURORA V12.2:</strong> 1st/2nd Break + Entry/F-SL/TP 1R-2R system built for NQ, ES, GC prop evaluations",

    // Chapter Rail
    "rail.compare": "01 · Compare 3 Firms",
    "rail.rules": "02 · Rule Deep-Dive",
    "rail.tools": "03 · Calculators",
    "rail.coupons": "04 · Coupon Codes",
    "rail.aurora": "05 · Aurora V12.2",

    // Index Hero
    "hero.eyebrow": "Futures Prop Rules 2026 · Updated:",
    "hero.title": "Complete Futures Prop Firm Guide <br /><span class=\"grad-cyan\">Bulenox</span> · <span class=\"grad-gold\">Earn2Trade</span> · <span style=\"color:var(--kz-green)\">Topstep</span>",
    "hero.desc": "Explore every rule detail: account tiers, Drawdown (Intraday vs EOD), Daily Loss Limits, Consistency Rules, Scaling Plans, and <strong>hidden account-blowing traps</strong> — curated for the Kenvinzone Prop Trader community.",
    "hero.btnRules": "Explore Detailed Rules ↓",
    "hero.btnCoupons": "🔥 Coupon Hub & Ref Links",
    "hero.btnTools": "Consistency & Cost Tools",
    "hero.meta1": "✓ Includes Earn2Trade Nov 2, 2026 rule overhaul",
    "hero.meta2": "✓ Topstep XFA Scaling & Dual Payout Paths",
    "hero.meta3": "✓ CME close times converted to ICT / CT",
    "hero.panelTitle": "Quick jump to each firm",
    "hero.panelBadge": "Top 3 Futures Firms",
    "hero.qfBulenoxSub": "Option 1 (Trailing) & Option 2 (EOD) • 100% first $10K",
    "hero.qfBulenoxPill": "Up to 89% OFF",
    "hero.qfE2tSub": "TCP (scales to $400K) & Gauntlet Mini • Ladder retired",
    "hero.qfE2tPill": "Nov '26 Rules",
    "hero.qfTopstepSub": "Combine from $49 • $0 Activation Path • Up to 5 XFAs",
    "hero.qfTopstepPill": "90/10 Split",
    "hero.ddTitle": "LIVE DRAWDOWN VISUALIZER",
    "hero.ddEod": "EOD (Safe)",
    "hero.ddIntraday": "Intraday Trailing",

    // Section 1: Compare
    "s1.kicker": "01 · Side-by-Side Overview",
    "s1.title": "Quick Rule Comparison Across All 3 Firms",
    "s1.sub": "Spot at a glance which prop firm matches your trading style: Scalping, Intraday, or Trend-Following.",
    "s1.btn": "View active coupons →",
    "s1.colMetric": "Core Parameter",

    // Section 2: Explorer
    "s2.kicker": "02 · Every Rule & Edge Case",
    "s2.title": "Account Tiers, Live Coupon Pricing & Hidden Traps",
    "s2.sub": "Switch between firms below to test live coupon discounts, inspect scaling plans, payout policies, and common traps.",

    // Section 3: Calculators
    "s3.kicker": "03 · Interactive Prop Trader Tools",
    "s3.title": "Consistency, True Cost & Futures Position Size Calculators",
    "s3.sub": "Stop eyeballing your math — plug in your numbers to verify consistency eligibility, real cost to funded, and exact Mini/Micro contract sizing.",
    "calc.consKicker": "Consistency Rule Calculator",
    "calc.consTitle": "Check Your Best-Day Profit Ratio",
    "calc.consFirmLabel": "Select firm rule",
    "calc.consOpt1": "Topstep Trading Combine — 55% Limit",
    "calc.consOpt2": "Topstep XFA Consistency Path — 40% Limit",
    "calc.consOpt3": "Bulenox Master Account Payout — 40% Limit",
    "calc.consOpt4": "Earn2Trade Evaluation (TCP / Gauntlet) — 30% Limit",
    "calc.bestDay": "Best Single Day Profit ($)",
    "calc.totalProfit": "Total Net Profit ($)",
    "calc.costKicker": "True Cost to Funded Calculator",
    "calc.costTitle": "Calculate Real Cost After Coupon + Resets + Activation",
    "calc.monthly": "List Monthly Price ($)",
    "calc.discount": "Coupon Discount (%)",
    "calc.resets": "Expected Resets",
    "calc.resetPrice": "Fee per Reset ($)",
    "calc.activation": "Funded / Master Activation Fee ($)",
    "pos.kicker": "Futures Position Size Calculator",
    "pos.title": "Calculate Safe Mini / Micro Contracts by Risk $ & Stop Loss",
    "pos.sub": "Essential for traders moving from Forex/CFD to CME Futures — never accidentally oversize a Mini contract again.",
    "pos.instrument": "CME Futures Contract",
    "pos.risk": "Max Risk per Trade ($)",
    "pos.sl": "Stop Loss Distance",
    "pos.unit": "SL Unit",
    "pos.unitPoints": "Points",
    "pos.unitTicks": "Ticks",

    // CME Clocks
    "clk.tsBadge": "TOPSTEP — EARLIEST CLOSE",
    "clk.tsDesc": "VN Time (UTC+7): <strong>03:10 AM</strong> (US CDT / Summer) • <strong>04:10 AM</strong> (US CST / Winter). Auto-flatten begins at 3:08 PM CT.",
    "clk.e2tBadge": "EARN2TRADE",
    "clk.e2tDesc": "VN Time (UTC+7): <strong>03:50 AM</strong> (US CDT / Summer) • <strong>04:50 AM</strong> (US CST / Winter). Next session opens at 5:00 PM CT.",
    "clk.bxBadge": "BULENOX — LATEST CLOSE",
    "clk.bxDesc": "VN Time (UTC+7): <strong>03:59 AM</strong> (US CDT / Summer) • <strong>04:59 AM</strong> (US CST / Winter). Strictly no overnight holding.",

    // Section 4: Hot Coupons
    "s4.kicker": "04 · Cut Your Evaluation Costs",
    "s4.title": "Today's Hottest Verified Coupon Codes",
    "s4.sub": "Sign up through Kenvinzone Ref Links for maximum discounts plus community rule support.",
    "s4.btn": "Open Full Coupon Hub →",

    // Section 5: Aurora
    "au.badge": "EXCLUSIVE SYSTEM BY KENVINZONE",
    "au.title": "Knowing Prop Rules Isn't Enough — Trade With Systematic Discipline Using <span class=\"grad-cyan\">AURORA V12.2</span>",
    "au.desc": "90% of traders fail Bulenox, Earn2Trade, or Topstep not from lack of knowledge, but from <strong>emotional entries</strong> that trigger Intraday Trailing Drawdown or Hard DLL breaches.",
    "au.p1": "<strong>Standardized 1st / 2nd Break & SUNNY Setups:</strong> Trade only clean trend structures on TradingView — eliminating overtrading and DLL blowups.",
    "au.p2": "<strong>Pre-Defined Entry – F-SL – TP (1R / 2R):</strong> Fixed per-trade risk keeps your Consistency Rule smooth instead of gambling on lottery trades.",
    "au.p3": "<strong>Smart Score & 9-Timeframe LIVE HUD:</strong> Filter US-session noise instantly on NQ, ES, GC (Gold Futures), and CL.",
    "au.cta1": "Explore Kenvinzone Aurora V12.2 →",
    "au.cta2": "Join Prop Trader Community",
    "au.mockCap": "Sample $50K Evaluation Plan ($3,000 Target / $2,000 EOD)",
    "au.mockMain": "Fixed $250 risk/trade (0.5%) • Take 2R (+$500) using Aurora's Entry – F-SL – TP plan",
    "au.mockSub": "→ Just 6 clean 2R trades across 4–6 sessions: Passes 30%–55% Consistency without ever touching DLL!",
    "au.stat1": "Multi-TF Confluence",
    "au.stat2": "Fixed F-SL & TP",
    "au.stat3": "On-Chart Proof",

    // Coupons Page
    "cp.eyebrow": "Live Verified Deals · Updated:",
    "cp.title": "Live <span class=\"grad-gold\">Coupon Codes & Real Prices</span> for Top 3 Futures Firms",
    "cp.sub": "Switch firm tabs below to immediately see the <strong>highest active discount</strong>, real post-coupon prices, <strong>1-click copy</strong>, and official Ref Links.",
    "cp.dirKicker": "All Active Promotions at a Glance",
    "cp.dirTitle": "Complete Coupon Directory & Expiration Dates",
    "cp.filterAll": "All Firms",
    "cp.tipsKicker": "Prop Trader Savings Playbook",
    "cp.tipsTitle": "How to Pay the Lowest Possible Fee at Each Firm",
    "cp.tipBxTitle": "Never Pay Retail Price!",
    "cp.tipBxDesc": "Bulenox almost always runs 75%–89% off promos (e.g. code 5BAAG drops $50K Option 1 to $19.25/mo). Just factor in the one-time Master activation fee ($148 for $50K).",
    "cp.tipE2tTitle": "Leverage Free Reset on Rebill",
    "cp.tipE2tDesc": "Black Week code BIGBF2026 cuts up to 70% for 2 months + lowers reset fees. If you hit Hard DLL near month-end, wait for your rebill to get 1 free reset automatically.",
    "cp.tipTsTitle": "Compare No Activation Fee + RTA",
    "cp.tipTsDesc": "With code KENVINZONE (-50% first purchase), $50K NAF + RTA drops from $95 → $85 → $42.50 with $0 activation fee and 2x Payout Caps!",
    "cp.perkBadge": "KENVINZONE COMMUNITY PERKS",
    "cp.perkTitle": "Combine Verified Coupons With <span class=\"grad-cyan\">Aurora Standard V12.2</span>",
    "cp.perkDesc": "Slash upfront evaluation fees with verified coupons while improving your pass rate using structured Entry – F-SL – TP trend setups on TradingView.",
    "cp.perkCta1": "View Aurora V12.2 Details →",
    "cp.perkCta2": "Message Telegram Support",
    "cp.checkTitle": "3-STEP PROP TRADER CHECKLIST",
    "cp.check1": "Review the <strong>Rules & Hidden Traps</strong> on the <a href=\"index.html\" style=\"color:#38D5E7;text-decoration:underline\">Rules Dashboard</a>.",
    "cp.check2": "Copy the best coupon code above and sign up via the <strong>official Ref Link</strong>.",
    "cp.check3": "Lock in a disciplined 1R/2R risk plan with <strong>Aurora V12.2</strong> before placing trade #1.",

    // Footer
    "ft.main": "<strong style=\"color:var(--kz-strong)\">KENVINZONE PROP HUB</strong> · Futures prop firm rules comparison & live coupon hub for traders.",
    "ft.disclaimer": "Disclaimer: Prop firm rules (Bulenox, Earn2Trade, Topstep) may change anytime. Always verify live terms on the firm's official site before purchasing. Some links are Affiliate Links that help keep this hub free.",
    "ft.dashboard": "Rules Dashboard",
    "ft.couponMain": "<strong style=\"color:var(--kz-strong)\">KENVINZONE COUPON HUB</strong> · Verified discount codes for Bulenox, Earn2Trade & Topstep.",
    "ft.guideMain": "<strong style=\"color:var(--kz-strong)\">KENVINZONE FUTURES 101</strong> · Beginner's guide to CME Futures prop firms & FAQ.",
    "ft.back": "← Back to Rules Dashboard",

    // Guide Page (Futures 101 & FAQ)
    "gd.rail1": "01 · Futures vs Forex",
    "gd.rail2": "02 · Firm Matcher",
    "gd.rail2b": "02B · TCP vs GAU & Bulenox",
    "gd.rail3": "03 · A–Z Roadmap",
    "gd.rail4": "04 · FAQ",
    "gd.eyebrow": "Futures Prop Beginner Guide · Updated:",
    "gd.title": "Beginner's Guide to <span class=\"grad-cyan\">CME Futures</span> Prop Firms (Switching From <span class=\"grad-gold\">Forex / Crypto</span>)",
    "gd.desc": "Everything you need before buying your first evaluation: <strong>Mini vs Micro contract specs</strong>, picking the right firm for your style, <strong>avoiding the $140/mo Professional data trap</strong>, KYC – <strong>W-8BEN</strong> – payout rails, and 10 essential FAQs.",
    "gd.btn1": "1. Futures vs Forex & Mini/Micro ↓",
    "gd.btn2": "2. Quick Firm Matcher",
    "gd.btn2b": "2. TCP vs GAU & Bulenox",
    "gd.btn3": "3. A–Z Roadmap & Payouts",
    "gd.btn4": "4. Read 10 FAQs",
    "gd.s1Kicker": "01 · Core Foundations",
    "gd.s1Title": "Futures vs Forex/CFD & Mini / Micro Quick Reference",
    "gd.s1Sub": "Master these 4 core differences and the Tick/Point table below so you never accidentally oversize a Futures contract.",
    "gd.s1Btn": "Open Position Size Calculator →",
    "gd.d1Tag": "CENTRALIZED EXCHANGE",
    "gd.d1Title": "CME Exchange vs Offshore CFD Brokers",
    "gd.d1Desc": "Futures trade on centralized CME Group exchanges. Every trader sees the exact same order book and real exchange pricing — zero artificial spread widening or broker stop-hunting.",
    "gd.d2Tag": "SIZING & FEES",
    "gd.d2Title": "Whole Contracts & Round-Turn Commissions",
    "gd.d2Desc": "Instead of Forex Lots (0.01, 0.1), Futures use integer Contracts in two sizes: Mini (standard) and Micro (1/10th of a Mini). Spreads are typically 1 tick with a transparent fixed commission per round-turn.",
    "gd.d3Tag": "MANDATORY FLAT TIME",
    "gd.d3Title": "Strictly Intraday — No Overnight Holding",
    "gd.d3Desc": "Prop evaluations require all positions and working orders closed before the daily CT cutoff (3:10–3:59 PM CT). Never hold trades overnight or across weekends.",
    "gd.d4Tag": "PROP FIRM TERMINOLOGY",
    "gd.d4Title": "LiveSim, Buffer & Hard/Soft DLL",
    "gd.d4Desc": "Passing puts you on LiveSim / XFA / Master (simulated execution on real CME data with REAL cash payouts). Always build a healthy profit cushion (Buffer / Safety Reserve) before taking your first payout.",
    "gd.tblHeading": "📊 Quick Specs for Top 10 CME Futures Contracts (Mini vs Micro)",
    "gd.thSym": "Symbol (Micro / Mini)",
    "gd.thProd": "Product",
    "gd.thTick": "1 Tick Value",
    "gd.thTpp": "Ticks / Point",
    "gd.thPt": "1 Point Value",
    "gd.thFx": "Rough Forex/CFD Equivalent",
    "gd.thTip": "Beginner Tip",
    "gd.prodGc": "Gold Futures",
    "gd.prodCl": "WTI Crude Oil",
    "gd.fxNq": "1 NQ ≈ $20/point (very fast!)",
    "gd.tipNq": "<strong>Start with MNQ only</strong> (1–5 contracts)",
    "gd.fxEs": "1 ES ≈ $50/point (smoother than NQ)",
    "gd.tipEs": "<strong>MES</strong> is ideal for learning risk discipline",
    "gd.fxGc": "1 MGC ≈ 0.1 Lot XAUUSD • 1 GC ≈ 1.0 Lot",
    "gd.tipGc": "Very intuitive for Gold (XAUUSD) traders",
    "gd.fxCl": "1 MCL ≈ 0.1 Lot USOIL • 1 CL ≈ 1.0 Lot",
    "gd.tipCl": "High US-session volatility — use <strong>MCL</strong>",
    "gd.fxYm": "1 MYM ≈ $0.50/point US30",
    "gd.tipYm": "Gentlest sizing for $25K–$50K accounts",
    "gd.s2Kicker": "02 · Start Smart",
    "gd.s2Title": "Quick Prop Firm Matcher for Beginners",
    "gd.s2Sub": "Each firm excels for a specific trader profile. Picking the right match upfront doubles your odds of passing.",
    "gd.m1Tag": "EASIEST ONBOARDING (FOREX/CRYPTO)",
    "gd.m1Title": "Topstep (TopstepX + NAF Path)",
    "gd.m1Desc": "Trade directly on browser-based TradingView charts via TopstepX — no NinjaTrader or Rithmic setup needed. Includes native Copy Trader & $0 XFA activation option.",
    "gd.m1Btn": "View Topstep Deals (-50% KENVINZONE) →",
    "gd.m2Tag": "LOWEST ENTRY COST (<$20)",
    "gd.m2Desc": "Code 5BAAG cuts Option 1 by 89% ($50K is just $19.25/mo) — cheapest way to test prop pressure. Prefer safer EOD drawdown? Pick Option 2 EOD (-75% OFF).",
    "gd.m2Btn": "View Bulenox Deals (-89% 5BAAG) →",
    "gd.m3Tag": "FREE ORDER FLOW & $400K SCALING",
    "gd.m3Desc": "#1 pick if you want structured capital scaling up to $400K, FREE ATAS / DeepCharts order flow software via dxFeed, and $0 upfront activation ($139 deducted from 1st payout).",
    "gd.m3Btn": "View Earn2Trade Deals (-70% BIGBF2026) →",
    "gd.s2bKicker": "02B · Deciding Between Account Tracks",
    "gd.s2bTitle": "Deep Account-Type Comparison: Earn2Trade (TCP vs GAU) & Bulenox",
    "gd.s2bSub": "With deep promo codes active, traders often debate TCP100 vs GAU100 at Earn2Trade, or Qualification vs Momentum vs Fast-Track at Bulenox. Here is how their withdrawal caps, scaling, and payout consistency rules actually compare.",
    "gd.e2tVsTitle": "TCP100 vs Gauntlet Mini 100K (GAU100): Which Is Better at 70% OFF?",
    "gd.e2tVsBtn": "View BIGBF2026 Deals →",
    "gd.vsMetric": "Key Decision Factor",
    "gd.vsTcp": "Trader Career Path® (TCP100) ★",
    "gd.vsGau": "Gauntlet Mini™ 100K (GAU100)",
    "gd.eRow1": "Month 1 Price w/ BIGBF2026 (-70%)",
    "gd.eRow1Tcp": "<strong style=\"color:var(--kz-gold)\">$105.00</strong> <span style=\"color:var(--kz-muted);font-size:12px\">($350 retail • Month 2 -60%)</span>",
    "gd.eRow1Gau": "<strong style=\"color:var(--kz-cyan)\">$94.50</strong> <span style=\"color:var(--kz-muted);font-size:12px\">($315 retail • Month 2 -60%)</span>",
    "gd.eRow2": "Eval Specs (Target / EOD / DLL / Cts)",
    "gd.eRow2Same": "Identical: $6,000 / $3,500 EOD / $2,200 Hard DLL / 8 Minis",
    "gd.eRow3": "LiveSim Max Withdrawal Cap",
    "gd.eRow3Tcp": "<strong class=\"mono\" style=\"color:var(--kz-green)\">Up to $6,000</strong> on LiveSim (EOD Drawdown) before moving to Live",
    "gd.eRow3Gau": "<strong class=\"mono\" style=\"color:var(--kz-rose)\">Capped at $5,000</strong> (flat cap across all GAU 50K–200K) before Live",
    "gd.eRow4": "Capital Scaling Ladder",
    "gd.eRow4Tcp": "<strong style=\"color:var(--kz-green)\">Auto-Scaling Plan:</strong> $100K → $150K → $200K → <strong>$400,000</strong> with no re-eval",
    "gd.eRow4Gau": "<strong>Fixed at $100K permanently</strong> — no upward scaling ladder",
    "gd.eRow5": "Drawdown After LiveSim → Live",
    "gd.eRow5Both": "Switches from EOD to Intraday Trailing on Live (TCP100's $6,000 cap lets you withdraw $1,000 more on safer EOD!)",
    "gd.eRow5Gau": "Switches to Intraday Trailing earlier at the $5,000 withdrawal mark",
    "gd.eRow6": "Free Reset on Monthly Rebill",
    "gd.eRow6Tcp": "<strong style=\"color:var(--kz-green)\">1 Free Reset included</strong> on every monthly rebill",
    "gd.eRow6Gau": "Standard / promo reset fee applies",
    "gd.eRow7": "Payout Rule & 80/20 Split Threshold",
    "gd.eRow7Same": "5 winning days ≥$200/day • Withdraw ≥$3,000 for 80/20 (below $3K = 50/50)",
    "gd.e2tVerdict": "<strong>💡 Earn2Trade Verdict:</strong> For only <strong>$10.50 more</strong> in Month 1 ($105 vs $94.50), <strong>TCP100 beats GAU100 across the board</strong> (+$1,000 higher LiveSim EOD withdrawal cap, auto-scaling to $400K, and Free Reset on rebill). Only pick <strong>Gauntlet Mini</strong> if you want to start directly at <strong>GAU150 ($150K)</strong> or <strong>GAU200 ($200K)</strong> where TCP has no direct entry.",
    "gd.bxVsBadge": "BULENOX · 3 ACCOUNT TRACKS",
    "gd.bxVsTitle": "Qualification vs Momentum vs Fast-Track: Payout & Consistency Breakdown",
    "gd.bxVsBtn": "View 5BAAG Deals (-89%) →",
    "gd.vsBxQual": "Qualification (Classic) ★",
    "gd.vsBxMom": "Momentum ($0 Activation)",
    "gd.vsBxFt": "Fast-Track (Direct Funded)",
    "gd.bRow1": "Entry Price ($50K Opt 1 w/ 5BAAG)",
    "gd.bRow1Qual": "<strong style=\"color:var(--kz-cyan)\">$19.25/mo</strong> (-89%)",
    "gd.bRow1Mom": "<strong style=\"color:var(--kz-gold)\">$78.65/mo</strong> (-45%)",
    "gd.bRow1Ft": "<strong style=\"color:var(--kz-green)\">$292.80</strong> (one-time, -40%)",
    "gd.bRow2": "Master Activation Fee ($50K)",
    "gd.bRow2Qual": "$148 (one-time upon passing)",
    "gd.bRow2Mom": "$0 (Free)",
    "gd.bRow2Ft": "$0 (Skip evaluation)",
    "gd.bRow3": "Max Drawdown ($50K)",
    "gd.bRow3Qual": "$2,500 (Widest)",
    "gd.bRow4": "Min Trading Days Before Payout",
    "gd.bRow4Qual": "10 trading days before 1st payout",
    "gd.bRow4Mom": "5 profitable days per payout cycle",
    "gd.bRow4Ft": "No minimum trading days required",
    "gd.bRow5": "Payout Consistency Rule",
    "gd.bRow5Qual": "<strong style=\"color:var(--kz-green)\">40% (most forgiving)</strong> — measured across lifetime account P&L",
    "gd.bRow5Mom": "<strong style=\"color:var(--kz-gold)\">35%</strong> — resets fresh every payout cycle",
    "gd.bRow5Ft": "<strong style=\"color:var(--kz-rose)\">20% – 30% (strictest)</strong> — resets fresh every payout cycle",
    "gd.bRow6": "Payout Processing Speed",
    "gd.bRow6Qual": "Weekly on Wednesdays (submit by Friday)",
    "gd.bRow6Mom": "Fast / on-demand after 5 winning days",
    "gd.bRow6Ft": "Same-day processing before cutoff",
    "gd.bRow7": "Profit Split & Safety Reserve",
    "gd.bRow7All": "Shared across all 3 tracks: Keep 100% of your first $10,000 profit → 90/10 thereafter • All enforce a Safety Reserve & initial payout caps (caps lifted after payout #3 / Live review).",
    "gd.bxVerdict": "<strong>💡 Bulenox Verdict:</strong> Beginners should start with <strong>Qualification (Option 2 EOD for trend trading, or Option 1 for fast scalping)</strong> — lowest upfront entry ($19–$43), widest $2,500 drawdown, and the most forgiving 40% lifetime consistency rule. Pick <strong>Momentum</strong> if you reliably pass within 1 month and want $0 activation; reserve <strong>Fast-Track</strong> for seasoned traders with ultra-smooth equity curves (20%–30% consistency).",
    "gd.s3Kicker": "03 · Step-by-Step Playbook",
    "gd.s3Title": "4 Essential Steps to Avoid Costly Mistakes & Withdraw Smoothly",
    "gd.s3Sub": "Most beginners lose money not from bad chart reads, but from clicking the wrong data agreement or forgetting auto-renewal.",
    "gd.st1Title": "Data Agreement: ALWAYS Select NON-PROFESSIONAL",
    "gd.st1Desc": "When signing your Rithmic / dxFeed / CME market data agreement as a retail trader, <strong>ALWAYS select \"Non-Professional\"</strong>. Selecting \"Professional\" by mistake triggers <strong>$140+/month per exchange</strong> in CME data fees!",
    "gd.st2Title": "Manage Monthly Auto-Renewal & Resets",
    "gd.st2Desc": "Futures evaluations are monthly subscriptions. If you blow an account and don't plan to continue, cancel in <strong>Billing / Subscription</strong> before your rebill date. Note: Earn2Trade grants 1 Free Reset on rebill, which can be cheaper than a mid-month reset.",
    "gd.st3Title": "Set Personal Guardrails Before Trade #1",
    "gd.st3Desc": "Configure a <strong>Personal Daily Loss Limit</strong> 20–30% tighter than the firm's Hard DLL so the platform locks you out before tilt takes over, and set an alarm 10 minutes before the CT flat time. Always size with the <a href=\"index.html#cong-cu\" style=\"color:var(--kz-cyan);text-decoration:underline\">Position Size Calculator</a>.",
    "gd.st4Title": "KYC, W-8BEN Tax Form & International Payouts",
    "gd.st4Desc": "Upon passing, complete KYC with your <strong>National ID / Passport</strong> + proof of address and sign the <strong>W-8BEN</strong> form (certifies non-US tax residency to avoid 30% US withholding). Withdrawals via <strong>RiseWorks, Wise, or Wire Transfer</strong> typically arrive in 1–3 business days.",
    "gd.payTblTitle": "💸 Quick Comparison of Popular International / Vietnam Payout Rails",
    "gd.pthRail": "Payout Rail",
    "gd.pthFirms": "Supported Firms",
    "gd.pthFee": "Est. Fee",
    "gd.pthTime": "Arrival Time",
    "gd.pthNote": "Notes for International / VN Traders",
    "gd.pRiseFee": "Low (~0%–1% by method)",
    "gd.pRiseTime": "1–3 business days",
    "gd.pRiseNote": "Standard across US prop firms; supports local bank transfers or USDC depending on Rise account setup.",
    "gd.pWiseFee": "$0 from Topstep (Wise FX fee only)",
    "gd.pWiseTime": "Hours – 2 days",
    "gd.pWiseNote": "Near-midmarket USD/VND exchange rates straight to local bank accounts.",
    "gd.pWireFee": "~$25–$35 + receiving bank fee",
    "gd.pWireTime": "2–5 business days",
    "gd.pWireNote": "Best for larger payouts (≥$2,000) to amortize fixed wire fees. Requires your bank's SWIFT code.",
    "gd.s4Kicker": "04 · Quick Answers",
    "gd.s4Title": "10 Frequently Asked Questions (FAQ) About Futures Prop Firms",
    "gd.s4Sub": "Click any question below for a concise, straight-to-the-point answer.",
    "gd.fq1": "1. Can traders in Vietnam legally trade and withdraw from Bulenox, Earn2Trade, and Topstep?",
    "gd.fa1": "Yes. All 3 firms accept traders from Vietnam. After passing, you complete KYC with your National ID/Passport, submit a W-8BEN form (non-US resident), and withdraw profits via Wise, RiseWorks, or International Wire.",
    "gd.fq2": "2. Do I have to learn NinjaTrader or Rithmic to trade Futures prop firms?",
    "gd.fa2": "No. If you prefer browser-based TradingView charts, choose Topstep (TopstepX runs right in your browser) or Earn2Trade (supports Tradovate/TradingView). Desktop platforms like NinjaTrader, Quantower, or ATAS are only needed if you want advanced Order Flow tools.",
    "gd.fq3": "3. If I fail an evaluation, will I still be charged monthly auto-renewal?",
    "gd.fa3": "Yes! Most Futures evaluations are recurring monthly subscriptions. If you breach an account and do not want to continue, you must manually cancel the subscription in your billing dashboard before the next rebill date.",
    "gd.fq4": "4. How do LiveSim / XFA / Master Accounts differ from Live accounts? Are payouts real money?",
    "gd.fa4": "LiveSim (Earn2Trade), XFA (Topstep), and Master Account (Bulenox) run on simulated execution with live CME data, and YES — you withdraw REAL cash (80%–100% split). After consistent payouts, firms may transition you to a Live brokerage account (lifting payout caps while introducing monthly CME data fees).",
    "gd.fq5": "5. Are trading bots/EAs or multi-account Copy Trading allowed?",
    "gd.fa5": "Personal copy trading across your own accounts is allowed at all 3 firms (TopstepX includes a built-in copier for up to 5 XFAs; Bulenox & Earn2Trade support Rithmic/NinjaTrader copiers). Cross-account hedging, latency arbitrage, and HFT are strictly banned.",
    "gd.fq6": "6. Is news trading (CPI, NFP, FOMC) allowed?",
    "gd.fa6": "Unlike many Forex CFD prop firms that ban trading around news, Bulenox, Earn2Trade, and Topstep all ALLOW news trading. However, extreme slippage during news can instantly trigger Hard DLL or Intraday Trailing Drawdown, so size down or step aside if you're new.",
    "gd.fq7": "7. What happens if I forget to close a trade past the daily cutoff (3:10 / 3:50 / 3:59 PM CT)?",
    "gd.fa7": "Holding past mandatory flat time is a serious rule violation (and can forfeit a funded account). Remember Topstep closes earliest at 3:10 PM CT (auto-flatten starts 3:08 PM CT), Earn2Trade at 3:50 PM CT, and Bulenox at 3:59 PM CT.",
    "gd.fq8": "8. Does my first withdrawal change my Drawdown limit?",
    "gd.fa8": "YES — this is the classic trap! On Topstep XFA, your first payout locks MLL permanently at $0 (starting balance), so your remaining profit is your entire cushion. Bulenox also enforces a Safety Reserve. Never drain your full buffer on payout #1.",
    "gd.fq9": "9. Is the Activation Fee charged every month?",
    "gd.fa9": "No! Activation fees ($149 Topstep Standard, $139 Earn2Trade LiveSim deducted from 1st payout, or $143–$498 Bulenox Qualification) are ONE-TIME fees paid only when upgrading to funded. Topstep NAF and Bulenox Momentum have $0 activation fees.",
    "gd.fq10": "10. Should Forex switchers trade Minis or Micros, and how much should I risk per trade?",
    "gd.fa10": "Always start with Micros (MNQ, MES, MGC) and risk roughly $150–$250 per trade on a $50K account (8%–12% of a $2,000 drawdown). Just 6–8 disciplined 2R wins spread across multiple days will clear a $3,000 target while staying safely inside Consistency Rules.",
    "gd.ctaKicker": "Ready to start with discipline?",
    "gd.ctaTitle": "Compare all 3 firms in detail or grab today's deepest promo codes",
    "gd.ctaBtn1": "Explore Detailed Firm Rules →",
    "gd.ctaBtn2": "🔥 Claim Hot Coupons"
  };

  /* ---------- Dynamic Strings for app.js & motion.js ---------- */
  const STRINGS = {
    vi: {
      copied: "✓ Đã sao chép mã: ",
      copyBtn: "📋 Sao chép mã",
      copyShort: "📋 Copy ",
      autoApply: "Tự áp qua Link",
      register: "Đăng ký →",
      openDeal: "Mở {firm} & Áp Ưu Đãi →",
      appliesTo: "Áp dụng:",
      expiresLabel: "Hạn dùng:",
      promoLabel: "Mã ưu đãi",
      noCoupons: "Hiện chưa có mã giảm giá nào còn hạn cho bộ lọc này.",
      expired: "Đã hết hạn",
      activeStatus: "Đang hoạt động",
      daysLeftHot: " (🔥 Còn {d} ngày)",
      daysLeft: " (Còn {d} ngày)",
      ddCanvasIntraday: "INTRADAY TRAILING: Sàn kéo lên theo cả lãi ảo!",
      ddCanvasEod: "EOD DRAWDOWN: Sàn đứng yên suốt phiên, chỉ cập nhật cuối ngày",
      registerFirm: "Đăng ký {firm} (Link Ref) →",
      getCouponFirm: "Lấy mã giảm giá {firm}",
      closeTimeLabel: "Giờ đóng lệnh bắt buộc",
      profitSplitLabel: "Tỷ lệ chia lợi nhuận",
      resetFeeLabel: "Phí Reset vòng thi",
      maxAccLabel: "Tài khoản tối đa",
      trapsHeading: "⚠️ Các \"Bẫy Ngầm\" Dễ Cháy Tài Khoản Tại {firm}",
      payoutHeading: "💰 Chính Sách Rút Tiền (Payout)",
      techHeading: "⚙️ Nền Tảng, News, Copy Trade & Affiliate",
      lblPlatforms: "Nền tảng:",
      lblNews: "Tin tức (News):",
      lblCopy: "Copy Trading:",
      lblAff: "Affiliate / Ref:",
      scalingHeading: "📈 Bảng Scaling Plan trên Topstep XFA (Mở khóa sau khi chốt ngày EOD)",
      tcpScalingHeading: "📈 Lộ Trình Nâng Vốn Earn2Trade TCP (Tự động lên bậc khi đạt target & rút lãi)",
      tcpScalingNote: "Từ 02/11/2026: Đã bỏ bảng Progression Ladder, hệ thống tự giới hạn hợp đồng cố định theo từng mốc vốn. Chỉ TCP50 và TCP100 mới lên được trần $400K.",
      platformGuideHeading: "🖥️ Chọn Data Feed, Nền Tảng & Phí Giao Dịch (Live)",
      lblDataFeed: "Nguồn dữ liệu (Data Feed):",
      lblBestPick: "Gợi ý chọn nền tảng:",
      lblCommEst: "Phí Commission tham khảo:",
      lblLiveDataFee: "Phí Data khi lên Funded / Live:",
      tblPlan: "Gói tài khoản",
      tblListPrice: "Phí tháng (Gốc)",
      tblMonthly: "Phí tháng",
      tblTarget: "Mục tiêu lãi",
      tblDrawdown: "Drawdown",
      tblEodDrawdown: "EOD Drawdown",
      tblMll: "Max Loss Limit (MLL)",
      tblDll: "Daily Loss Limit",
      tblMaxContracts: "Hợp đồng tối đa",
      tblFixedContracts: "Hợp đồng cố định (Mới)",
      tblCombineContracts: "Hợp đồng (Combine)",
      tblMasterAct: "Phí kích hoạt Master",
      tblLiveSimFee: "Phí LiveSim",
      tblXfaAct: "Phí kích hoạt XFA",
      tblSafetyReserve: "Safety Reserve",
      tblPayoutCap3: "Trần rút 3 lần đầu",
      tblMinProfitDay: "Lãi tối thiểu/ngày rút",
      tblSplit80: "Ngưỡng chia 80/20",
      tblMaxDay55: "Max 1 ngày (55%)",
      tblResetFee: "Phí Reset",
      posHint: "Nhập số tiền rủi ro tối đa ($) và khoảng dừng lỗ (Stop Loss) để tính khối lượng hợp đồng an toàn.",
      posSpec: "Thông số {sym}: ${pt}/Point • ${tick}/Tick ({tpp} Ticks/Point)",
      posRecommended: "Khối lượng khuyến nghị tối đa",
      posContractsUnit: "hợp đồng",
      posActualRisk: "Rủi ro thực tế với {qty} HĐ: <strong class=\"mono\" style=\"color:var(--kz-cyan)\">${actual}</strong> (SL {pts} pts = {ticks} ticks • ${perCt}/HĐ).",
      posOversizeBadge: "⚠ VƯỢT RISK VỚI 1 HĐ",
      posSafeBadge: "✓ AN TOÀN TRONG RISK",
      posOversizeTip: "Ngay cả <strong>1 hợp đồng {sym}</strong> cũng rủi ro <strong class=\"mono\" style=\"color:var(--kz-rose)\">${perCt}</strong> (vượt mức ${risk}). Hãy chuyển sang mã Micro tương ứng (<strong>{micro}</strong>) hoặc thu gọn Stop Loss!",
      posOversizeTipMicro: "1 hợp đồng <strong>{sym}</strong> rủi ro <strong class=\"mono\" style=\"color:var(--kz-rose)\">${perCt}</strong> (vượt mức ${risk}). Hãy tăng mức Risk cho phép hoặc thu gọn khoảng Stop Loss.",
      consHint: "Nhập lợi nhuận ngày lớn nhất và tổng lợi nhuận để tính tự động.",
      consSub: "Tỷ trọng ngày lớn nhất / Tổng lãi ({name})",
      consPassBadge: "✓ ĐẠT CHUẨN RULE",
      consFailBadge: "⚠ VƯỢT NGƯỠNG",
      consLimitWord: "/ giới hạn ",
      consPassText: "Tuyệt vời! Bạn đang tuân thủ đúng Consistency Rule với tổng lợi nhuận <strong>${total}</strong>.",
      consFailText: "Để hợp lệ, tổng lợi nhuận tối thiểu phải đạt <strong class=\"mono\" style=\"color:var(--kz-gold)\">${req}</strong> → Bạn cần kiếm thêm ít nhất <strong class=\"mono\" style=\"color:var(--kz-cyan)\">+${extra}</strong> ở các ngày giao dịch khác.",
      costTitle: "Tổng chi phí thực tế để lên Tài khoản Cấp vốn",
      costBreakdown: "Phí thi sau giảm: <strong class=\"mono\">${m}</strong> (tiết kiệm <span class=\"mono\" style=\"color:var(--kz-green)\">${saved}</span>) • Reset: <strong class=\"mono\">${resets}</strong> • Kích hoạt: <strong class=\"mono\">${act}</strong>",
      // Compare row labels
      cmp: [
        "Loại Drawdown",
        "Daily Loss Limit (DLL)",
        "Consistency Rule",
        "Phí kích hoạt (Activation)",
        "Tỷ lệ chia lợi nhuận",
        "Số ngày thi tối thiểu",
        "Giờ đóng lệnh bắt buộc",
        "Giao dịch tin tức (News)",
        "Giới hạn TK cấp vốn"
      ],
      // Simulator UI
      simPopular: "★ PHỔ BIẾN NHẤT",
      simRecommend: "★ KHUYÊN DÙNG",
      simListTag: "Giá niêm yết",
      simRetailTag: "Giá gốc",
      simNoApply: "Mã không áp gói này",
      simSave: "✓ Tiết kiệm <strong class=\"mono\">${saved}</strong> với mã <strong class=\"mono\">{code}</strong>",
      simTarget: "Mục tiêu lãi",
      simDrawdown: "Drawdown tối đa",
      simEodDrawdown: "EOD Drawdown",
      simMll: "Max Loss Limit",
      simDll: "Daily Loss Limit",
      simDllCap: "Daily Loss / Cap",
      simContracts: "Hợp đồng tối đa",
      simFixedContracts: "Hợp đồng cố định",
      simCombineContracts: "Hợp đồng (Combine)",
      simActivation: "Phí kích hoạt",
      simXfaActivation: "Phí kích hoạt XFA",
      simResetPromo: "Ưu đãi Reset",
      simResetFee: "Phí Reset",
      simChooseCoupon: "Chọn mã giảm giá áp thử:",
      simChooseE2tCoupon: "Chọn mã giảm giá Black Week:",
      simChooseTsCoupon: "Chọn mã giảm giá Friendsgiving:",
      simBxHead: "Chọn Dòng Gói & Bật Mã Giảm Giá Bulenox (Hạn 30/11/2026)",
      simBxTag: "⚡ BULENOX · MÃ GIẢM GIÁ & GIÁ THỰC TẾ",
      simE2tHead: "Chọn Gói TCP / Gauntlet Mini & Áp Mã BIGBF2026 (Hạn 29/11/2026)",
      simE2tTag: "🔥 EARN2TRADE · BLACK WEEK 2026 (TỚI 70%)",
      simTsHead: "Chọn Standard / No Activation Fee & Áp Mã KENVINZONE (-50%)",
      simTsTag: "🦃 TOPSTEP · FRIENDSGIVING 50% OFF (MÃ KENVINZONE)",
      simTsRtaOn: "RTA: BẬT (X2 Payout Cap)",
      simTsRtaOff: "RTA: TẮT",
      simBxHintNone: "Bật mã 5BAAG ở trên để xem giá giảm sốc!",
      simBxHintOther: "Hãy chọn mã 5BAAG để giảm toàn bộ gói.",
      simE2tHintNone: "Bật mã BIGBF2026 để giảm tới 70% (2 tháng)!",
      simTsHintNone: "Bật mã KENVINZONE để giảm ngay 50% Friendsgiving!",
      simFirst50: "-50% LẦN ĐẦU"
    },
    en: {
      copied: "✓ Copied code: ",
      copyBtn: "📋 Copy Code",
      copyShort: "📋 Copy ",
      autoApply: "Auto-Applied via Link",
      register: "Sign Up →",
      openDeal: "Open {firm} & Claim Deal →",
      appliesTo: "Applies to:",
      expiresLabel: "Valid:",
      promoLabel: "Promo Code",
      noCoupons: "No active coupons match this filter right now.",
      expired: "Expired",
      activeStatus: "Active",
      daysLeftHot: " (🔥 {d}d left)",
      daysLeft: " ({d} days left)",
      ddCanvasIntraday: "INTRADAY TRAILING: Floor trails unrealized open profits!",
      ddCanvasEod: "EOD DRAWDOWN: Floor stays flat intraday, updates only at close",
      registerFirm: "Sign Up {firm} (Ref Link) →",
      getCouponFirm: "Get {firm} Coupons",
      closeTimeLabel: "Mandatory Flat Time",
      profitSplitLabel: "Profit Split",
      resetFeeLabel: "Evaluation Reset Fee",
      maxAccLabel: "Max Active Accounts",
      trapsHeading: "⚠️ Hidden Account-Blowing Traps at {firm}",
      payoutHeading: "💰 Payout Policy & Withdrawals",
      techHeading: "⚙️ Platforms, News, Copy Trade & Affiliate",
      lblPlatforms: "Platforms:",
      lblNews: "News Trading:",
      lblCopy: "Copy Trading:",
      lblAff: "Affiliate / Referral:",
      scalingHeading: "📈 Topstep XFA Scaling Plan (Unlocks next session after EOD)",
      tcpScalingHeading: "📈 Earn2Trade TCP Capital Scaling Roadmap (Auto-upgrades upon target & payout)",
      tcpScalingNote: "Post-Nov 2, 2026: Progression Ladder retired — system enforces fixed contract limits per tier. Only TCP50 and TCP100 can scale up to the $400K ceiling.",
      platformGuideHeading: "🖥️ Data Feed, Platform Picks & Live Trading Fees",
      lblDataFeed: "Market Data Feed:",
      lblBestPick: "Recommended Platform:",
      lblCommEst: "Est. Round-Turn Commission:",
      lblLiveDataFee: "Funded / Live Data Fees:",
      tblPlan: "Account Size",
      tblListPrice: "Monthly (List)",
      tblMonthly: "Monthly Fee",
      tblTarget: "Profit Target",
      tblDrawdown: "Drawdown",
      tblEodDrawdown: "EOD Drawdown",
      tblMll: "Max Loss Limit (MLL)",
      tblDll: "Daily Loss Limit",
      tblMaxContracts: "Max Contracts",
      tblFixedContracts: "Fixed Contracts (New)",
      tblCombineContracts: "Contracts (Combine)",
      tblMasterAct: "Master Activation",
      tblLiveSimFee: "LiveSim Fee",
      tblXfaAct: "XFA Activation",
      tblSafetyReserve: "Safety Reserve",
      tblPayoutCap3: "First 3 Payout Caps",
      tblMinProfitDay: "Min Profit/Payout Day",
      tblSplit80: "80/20 Split Threshold",
      tblMaxDay55: "Max 1-Day (55%)",
      tblResetFee: "Reset Fee",
      posHint: "Enter your max risk ($) and Stop Loss distance to calculate safe CME Futures contract size.",
      posSpec: "{sym} Spec: ${pt}/Point • ${tick}/Tick ({tpp} Ticks/Point)",
      posRecommended: "Recommended Max Position Size",
      posContractsUnit: "contracts",
      posActualRisk: "Actual risk at {qty} ct(s): <strong class=\"mono\" style=\"color:var(--kz-cyan)\">${actual}</strong> (SL {pts} pts = {ticks} ticks • ${perCt}/ct).",
      posOversizeBadge: "⚠ 1 CONTRACT EXCEEDS RISK",
      posSafeBadge: "✓ SAFE WITHIN RISK",
      posOversizeTip: "Even <strong>1 contract of {sym}</strong> risks <strong class=\"mono\" style=\"color:var(--kz-rose)\">${perCt}</strong> (exceeds your ${risk} limit). Switch to the Micro contract (<strong>{micro}</strong>) or tighten your Stop Loss!",
      posOversizeTipMicro: "1 contract of <strong>{sym}</strong> risks <strong class=\"mono\" style=\"color:var(--kz-rose)\">${perCt}</strong> (exceeds your ${risk} limit). Increase your risk budget or tighten your Stop Loss.",
      consHint: "Enter your best single day profit and total net profit to calculate.",
      consSub: "Best Day Share of Total Profit ({name})",
      consPassBadge: "✓ RULE PASSED",
      consFailBadge: "⚠ OVER LIMIT",
      consLimitWord: "/ limit ",
      consPassText: "Great job! Your profit distribution passes the Consistency Rule with <strong>${total}</strong> total profit.",
      consFailText: "To qualify, total net profit must reach at least <strong class=\"mono\" style=\"color:var(--kz-gold)\">${req}</strong> → You need at least <strong class=\"mono\" style=\"color:var(--kz-cyan)\">+${extra}</strong> more across additional trading days.",
      costTitle: "True Total Cost to Get Funded",
      costBreakdown: "Discounted Eval: <strong class=\"mono\">${m}</strong> (save <span class=\"mono\" style=\"color:var(--kz-green)\">${saved}</span>) • Resets: <strong class=\"mono\">${resets}</strong> • Activation: <strong class=\"mono\">${act}</strong>",
      cmp: [
        "Drawdown Type",
        "Daily Loss Limit (DLL)",
        "Consistency Rule",
        "Activation Fee",
        "Profit Split",
        "Min Trading Days",
        "Mandatory Flat Time",
        "News Trading",
        "Max Funded Accounts"
      ],
      simPopular: "★ MOST POPULAR",
      simRecommend: "★ RECOMMENDED",
      simListTag: "List Price",
      simRetailTag: "Retail",
      simNoApply: "Not eligible for code",
      simSave: "✓ Save <strong class=\"mono\">${saved}</strong> with code <strong class=\"mono\">{code}</strong>",
      simTarget: "Profit Target",
      simDrawdown: "Max Drawdown",
      simEodDrawdown: "EOD Drawdown",
      simMll: "Max Loss Limit",
      simDll: "Daily Loss Limit",
      simDllCap: "Daily Loss / Cap",
      simContracts: "Max Contracts",
      simFixedContracts: "Fixed Contracts",
      simCombineContracts: "Max Contracts (Combine)",
      simActivation: "Activation Fee",
      simXfaActivation: "XFA Activation Fee",
      simResetPromo: "Reset Promo",
      simResetFee: "Reset Fee",
      simChooseCoupon: "Test Promo Code Live:",
      simChooseE2tCoupon: "Test Black Week Promo Code:",
      simChooseTsCoupon: "Test Friendsgiving Promo Code:",
      simBxHead: "Pick Account Track & Toggle Bulenox Promo Code (Valid thru Nov 30, 2026)",
      simBxTag: "⚡ BULENOX · LIVE COUPON & PRICING SIMULATOR",
      simE2tHead: "Pick TCP / Gauntlet Mini & Apply BIGBF2026 (Valid thru Nov 29, 2026)",
      simE2tTag: "🔥 EARN2TRADE · BLACK WEEK 2026 (UP TO 70% OFF)",
      simTsHead: "Pick Standard / No Activation Fee & Apply KENVINZONE (-50%)",
      simTsTag: "🦃 TOPSTEP · FRIENDSGIVING 50% OFF (CODE: KENVINZONE)",
      simTsRtaOn: "RTA: ON (2x Payout Caps)",
      simTsRtaOff: "RTA: OFF",
      simBxHintNone: "Toggle code 5BAAG above to see up to 89% instant savings!",
      simBxHintOther: "Switch to code 5BAAG to discount every Bulenox tier.",
      simE2tHintNone: "Toggle code BIGBF2026 for up to 70% OFF (2 months)!",
      simTsHintNone: "Toggle code KENVINZONE for 50% OFF your first Combine!",
      simFirst50: "-50% FIRST BUY"
    }
  };

  /* ---------- English Data Overlay for Firms & Coupons ---------- */
  function buildEnglishData(base) {
    const en = JSON.parse(JSON.stringify(base));

    en.coupons = [
      {
        id: "bulenox-all-in-one",
        firmId: "bulenox",
        firmName: "Bulenox",
        badge: "ALL-IN-ONE · UP TO 89% OFF",
        hot: true,
        active: true,
        code: "5BAAG",
        title: "Universal Bulenox Code (Opt 1: 89% • Opt 2: 75% • Fast-Track: 40%)",
        description: "One single code covering all Bulenox tracks: Qualification Option 1 (89% OFF), Option 2 EOD (75% OFF), Fast-Track (40% OFF), Momentum Opt 1 (35–61% OFF), and Momentum Opt 2 (30% OFF).",
        appliesTo: "Option 1, Option 2, Fast-Track & Momentum",
        expires: "Thru Nov 30, 2026",
        expiresDate: "2026-11-30",
        note: "Recommended default code — unlocks the highest discount across every Bulenox plan."
      },
      {
        id: "bulenox-opt1-89",
        firmId: "bulenox",
        firmName: "Bulenox",
        badge: "89% OFF · OPTION 1",
        hot: true,
        active: true,
        code: "LTRRR",
        title: "Dedicated Qualification Option 1 (Trailing Drawdown)",
        description: "Direct 89% OFF for Qualification Option 1 ($25K / 3 cts, $50K / 7 cts, $100K / 12 cts, $150K / 15 cts). No DLL, no scaling.",
        appliesTo: "Qualification Option 1 ($25K – $150K)",
        expires: "Thru Nov 30, 2026",
        expiresDate: "2026-11-30",
        note: "$50K drops to just $19.25/mo (plus one-time $148 Master activation fee upon passing)."
      },
      {
        id: "bulenox-opt2-75",
        firmId: "bulenox",
        firmName: "Bulenox",
        badge: "75% OFF · OPTION 2 EOD",
        hot: false,
        active: true,
        code: "UREHV",
        title: "Dedicated Qualification Option 2 (EOD / Scaling / DLL)",
        description: "Massive 75% OFF on Option 2 EOD accounts ($25K–$150K) — End-of-Day drawdown does not trail unrealized open profits.",
        appliesTo: "Qualification Option 2 ($25K – $150K)",
        expires: "Thru Nov 30, 2026",
        expiresDate: "2026-11-30",
        note: "Rare deep 75% discount on Option 2 EOD — ideal for swing/intraday trend traders."
      },
      {
        id: "e2t-blackweek-2026",
        firmId: "earn2trade",
        firmName: "Earn2Trade",
        badge: "BLACK WEEK · UP TO 70% OFF",
        hot: true,
        active: true,
        code: "BIGBF2026",
        title: "Black Week 2026: Up to 70% OFF (2 Months) + Discounted Resets",
        description: "70% OFF Month 1 + 60% OFF Month 2 on TCP100 & GAU100 • 60% OFF (2 mos) on GAU150 • 50% OFF (2 mos) on TCP25, TCP50, GAU50 & GAU200.",
        appliesTo: "All TCP & Gauntlet Mini Plans",
        expires: "Thru Nov 29, 2026",
        expiresDate: "2026-11-29",
        note: "Includes discounted resets thru Jan 31, 2027: TCP25 ($100→$65), GAU50 ($100→$75), TCP50 ($100→$85)."
      },
      {
        id: "topstep-friendsgiving-50",
        firmId: "topstep",
        firmName: "Topstep",
        badge: "FRIENDSGIVING · 50% OFF",
        hot: true,
        active: true,
        code: "KENVINZONE",
        title: "Friendsgiving 50% OFF First Trading Combine",
        description: "Valid on both Standard Path ($49→$24.50) and No Activation Fee Path ($85→$42.50 with Responsible Trading Advantage ON). Code never expires for new traders!",
        appliesTo: "Trading Combine ($50K / $100K / $150K)",
        expires: "Never Expires (New Traders)",
        expiresDate: "",
        note: "Enter code KENVINZONE at Topstep checkout for 50% off your first Combine."
      }
    ];

    // Bulenox EN
    const bx = en.firms.bulenox;
    bx.tagline = "Dual Risk Models (Trailing vs EOD) • 100% of First $10K • Frequent 89% Sales";
    bx.badgeText = "FAVORITE FOR SCALPERS & COPY TRADERS";
    bx.closeTimeVN_Summer = "03:59 AM ICT (Summer) / 04:59 AM (Winter)";
    bx.newsTrading = "Allowed (no mandatory flat before news, manage drawdown carefully)";
    bx.copyTrading = "Allowed across your own Bulenox accounts (no cross-firm latency arbitrage/HFT)";
    bx.maxAccounts = "Unlimited Qualification accounts • Up to 5 active Master accounts";
    bx.resetFee = "$78 / reset (Qualification)";
    bx.profitSplit = "100% of first $10,000 profit → 90/10 thereafter";
    bx.affiliateInfo = "Official Affiliate Program with custom tracking link & monthly promo codes.";
    bx.summaryCompare = {
      drawdown: "Opt 1: Intraday Trailing | Opt 2: EOD",
      dll: "Opt 1: None | Opt 2: Soft Pause (locks day)",
      consistency: "40% (on Master Account payouts)",
      activationFee: "$143 – $498 one-time ($0 on Momentum)",
      profitSplit: "100% (first $10K) → 90/10",
      minDays: "No minimum days during eval (varies by track)",
      closeTime: "3:59 PM CT",
      news: "Allowed",
      maxFunded: "5 Master Accounts"
    };
    bx.traps = [
      { title: "Trap #1: Option 1 vs Option 2 is Permanently Locked", detail: "You choose Option 1 (Intraday Trailing) or Option 2 (EOD) at purchase and CANNOT switch later. Option 1 trails unrealized open profits in real time — a +$800 spike that returns to breakeven still raises your floor by $800!" },
      { title: "Trap #2: Safety Reserve & First-3-Payout Caps", detail: "On your first 3 Master payouts, Bulenox enforces both a Safety Reserve buffer and withdrawal caps ($1,000–$2,000 by size). Caps are lifted starting from payout #4." },
      { title: "Trap #3: 40% Consistency Rule on Payouts", detail: "No single day can exceed 40% of total accumulated profits in a payout cycle. Oversized lottery days require extra trading days to dilute the ratio back ≤ 40%." },
      { title: "Trap #4: Holding Past 3:59 PM CT", detail: "All positions and working orders must be flat before 3:59 PM CT. Overnight holding is strictly prohibited." }
    ];
    bx.payoutDetails = [
      "Keep 100% of the first $10,000 in profits, then 90% Trader / 10% Firm.",
      "First 3 payout caps: $1,000 ($25K) • $1,500 ($50K) • $1,750 ($100K) • $2,000 ($150K). Caps removed from payout #4.",
      "Master Account trailing floor locks at Starting Balance + $100 once reached.",
      "40% Consistency Rule applies to Master payout requests."
    ];
    bx.bulenoxPricingMatrix.coupons = [
      { id: "none", label: "Retail Price (No Code)", code: "", note: "Showing standard list prices on Bulenox signup." },
      { id: "5BAAG", label: "🔥 Apply 5BAAG (All-in-One)", code: "5BAAG", note: "Universal code: Opt 1 (-89%) • Opt 2 (-75%) • Fast-Track (-40%) • Momentum Opt 1 (-35%→61%) • Momentum Opt 2 (-30%)." },
      { id: "LTRRR", label: "⚡ Apply LTRRR (-89% Opt 1)", code: "LTRRR", note: "Dedicated 89% OFF for Qualification Option 1 ($25K–$150K)." },
      { id: "UREHV", label: "🛡️ Apply UREHV (-75% Opt 2)", code: "UREHV", note: "Dedicated 75% OFF for Qualification Option 2 EOD ($25K–$150K)." }
    ];
    bx.bulenoxPricingMatrix.tracks[0].label = "Qualification (Standard · 1 Month)";
    bx.bulenoxPricingMatrix.tracks[0].subtitle = "Widest drawdown ($1,500–$4,500) • Deepest discounts up to 89% • One-time Master activation fee ($143–$498).";
    bx.bulenoxPricingMatrix.tracks[1].label = "Momentum ($0 Activation · 1 Month)";
    bx.bulenoxPricingMatrix.tracks[1].subtitle = "Zero Master activation fee upon passing • Code 5BAAG gives 35–61% OFF (Opt 1) or 30% OFF (Opt 2).";
    bx.bulenoxPricingMatrix.tracks[2].label = "Fast-Track (Skip Eval · One-Time)";
    bx.bulenoxPricingMatrix.tracks[2].subtitle = "One-time fee straight into Fast-Track with no eval profit target • Code 5BAAG gives 40% OFF!";
    bx.bulenoxPricingMatrix.tracks.forEach((tr) => {
      ["opt1", "opt2"].forEach((k) => {
        tr[k].forEach((p) => {
          p.unit = p.unit.replace("/tháng", "/mo").replace("(1 lần)", "(one-time)");
          p.target = p.target.replace("Vào thẳng", "Direct");
          p.dll = p.dll.replace("Không có (Ngoại lệ $25K)", "None ($25K exception)").replace("Không có", "None");
          p.activation = p.activation.replace("(Gộp gói)", "(Included)");
        });
      });
    });
    bx.modes[0].label = "Option 1 — Intraday Trailing (No Scaling, No DLL)";
    bx.modes[0].note = "Built for fast scalpers who take quick profits and want zero Daily Loss Limit or contract scaling restrictions.";
    bx.modes[1].label = "Option 2 — EOD Drawdown (With Soft DLL & Scaling)";
    bx.modes[1].note = "Drawdown updates once at end of day on realized balance. Hitting DLL only pauses trading for the rest of the day (no blowup).";
    bx.modes.forEach((m) => {
      m.plans.forEach((p) => {
        p.listPrice = p.listPrice.replace("/tháng", "/mo");
        p.dll = p.dll.replace("Không có", "None");
      });
    });
    bx.platformGuide = {
      dataFeed: "Rithmic (low-latency CME data feed compatible with NinjaTrader, Quantower, Bookmap, Sierra Chart, ATAS, Jigsaw).",
      bestPick: "NinjaTrader 8 or Quantower via Rithmic (top choice for scalpers & multi-account copy trading).",
      commissionEst: "Approx. ~$4.00–$5.00 round-turn (Mini) • ~$1.20–$1.50 round-turn (Micro) depending on CME contract & clearing.",
      liveDataFee: "Non-Professional data is free during evaluation. Master/Live accounts use Non-Pro Rithmic/CME bundles (never select Professional or you'll pay $140+/mo)."
    };

    // Earn2Trade EN
    const e2 = en.firms.earn2trade;
    e2.tagline = "Scale Up to $400K • Progression Ladder Retired Nov 2026 • Free Reset on Rebill";
    e2.badgeText = "MAJOR NOV 2, 2026 RULE UPDATE";
    e2.closeTimeVN_Summer = "03:50 AM ICT (Summer) / 04:50 AM (Winter)";
    e2.newsTrading = "Allowed in both Evaluation and Funded stages";
    e2.copyTrading = "Supported on compatible personal Rithmic / Tradovate setups";
    e2.maxAccounts = "Up to 5 concurrent accounts • TCP career path scales to $400K";
    e2.resetFee = "1 Free Reset automatically on every monthly rebill • Mid-month reset $100–$130 (Black Week promo $65–$85)";
    e2.profitSplit = "Tiered 50/50 (below threshold) → 80/20 (at/above threshold) • $400K tier fixed 60/40";
    e2.affiliateInfo = "Official Partner/Affiliate program with tracking links & seasonal Black Week codes.";
    e2.summaryCompare = {
      drawdown: "EOD Trailing Drawdown",
      dll: "Hard Breach (instant fail, includes unrealized loss)",
      consistency: "30% (Eval only • Removed when Funded)",
      activationFee: "$139 LiveSim (deducted from 1st payout!)",
      profitSplit: "50/50 → 80/20 (60/40 at $400K)",
      minDays: "No minimum days (30% rule → ≥4 days)",
      closeTime: "3:50 PM CT",
      news: "Allowed",
      maxFunded: "5 Concurrent / Scales to $400K"
    };
    e2.traps = [
      { title: "Trap #1: Daily Loss Limit (DLL) is a HARD BREACH!", detail: "Unlike Bulenox Option 2 (soft pause), Earn2Trade DLL includes open unrealized losses + commissions. Touching DLL for even 1 second fails the account immediately." },
      { title: "Big Nov 2, 2026 Update: Progression Ladder Retired!", detail: "New subscriptions from Nov 2, 2026 onward use system-enforced FIXED contract caps (TCP25: 2 Minis, 50K: 4, 100K: 8, 150K: 12, 200K: 15, 400K: 20) — no more accidental ladder violations!" },
      { title: "Trap #2: New 5 Profitable Days Payout Rule", detail: "Each withdrawal on LiveSim/Live requires 5 new qualifying profitable days (non-consecutive): TCP25 ≥$100/day, 50K ≥$150/day, 100K ≥$200/day." },
      { title: "Trap #3: 50/50 vs 80/20 Withdrawal Thresholds", detail: "Withdrawing below your tier's threshold (TCP25: $1,500 • TCP50: $2,250 • TCP100: $3,000 • TCP200: $5,000) only pays a 50/50 split. Wait until you hit the threshold for 80/20!" }
    ];
    e2.payoutDetails = [
      "$139 LiveSim activation fee is NOT paid upfront — it is deducted from your first profit withdrawal.",
      "Weekly payout processing (submit by Friday 2:00 PM CT, paid via Rise & international rails).",
      "Requires 5 new qualifying profitable days per withdrawal cycle (Nov 2, 2026 update).",
      "Moving from LiveSim to Live brokerage incurs standard monthly CME exchange data fees."
    ];
    e2.earn2tradePricingMatrix.coupons = [
      { id: "none", label: "Retail Price (No Code)", code: "", note: "Showing standard list prices on Earn2Trade." },
      { id: "BIGBF2026", label: "🔥 Apply BIGBF2026 (Black Week up to 70%)", code: "BIGBF2026", note: "Valid thru Nov 29, 2026: 70% OFF M1 + 60% OFF M2 (TCP100 & GAU100) • 60% OFF 2 mos (GAU150) • 50% OFF 2 mos (TCP25, TCP50, GAU50, GAU200) + discounted resets thru Jan 31, 2027!" }
    ];
    e2.earn2tradePricingMatrix.tracks[0].label = "Trader Career Path® (TCP — Scales to $400K)";
    e2.earn2tradePricingMatrix.tracks[0].subtitle = "Up to 5 concurrent accounts • Free Reset on Rebill • Progression Ladder retired Nov 2, 2026.";
    e2.earn2tradePricingMatrix.tracks[1].label = "The Gauntlet Mini™ (GAU — Fixed Size Funded)";
    e2.earn2tradePricingMatrix.tracks[1].subtitle = "Go straight to $50K–$200K funded • No minimum trading days • News trading allowed.";
    e2.earn2tradePricingMatrix.tracks.forEach((tr) => {
      tr.plans.forEach((p) => {
        p.unit = "/mo";
        p.dealBadge = (p.dealBadge || "").replace("tháng", "mos").replace("T1", "M1").replace("T2", "M2");
        p.resetNote = (p.resetNote || "").replace("Tặng Reset khi Rebill", "Free Reset on Rebill").replace("Reset chuẩn", "Standard Reset");
      });
    });
    e2.modes[0].label = "Trader Career Path® (TCP) — Scales to $200K / $400K";
    e2.modes[0].note = "Pass once, withdraw profits, and automatically upgrade to larger funded tiers. Includes 1 Free Reset per monthly rebill.";
    e2.modes[1].label = "The Gauntlet Mini™ (GAU) — Fixed-Size Funded Account";
    e2.modes[1].note = "Go directly into a fixed-size funded account ($50K–$200K) without TCP tier scaling. Same EOD Drawdown & 30% eval consistency rules.";
    e2.modes.forEach((m) => {
      m.plans.forEach((p) => {
        p.listPrice = p.listPrice.replace("/tháng", "/mo");
        p.activation = p.activation.replace("trừ rút đầu", "deducted 1st payout");
        p.minProfitDay = p.minProfitDay.replace("/ngày", "/day");
      });
    });
    e2.tcpScaling = [
      {
        tier: "TCP25 ($25K → $200K)",
        levels: [
          "Start $25K: Max 2 Minis (20 Micros)",
          "Upgrade $50K: Max 4 Minis (40 Micros)",
          "Upgrade $100K: Max 8 Minis (80 Micros)",
          "Max Ceiling $200K: Max 15 Minis (150 Micros)"
        ]
      },
      {
        tier: "TCP50 ($50K → $400K)",
        levels: [
          "Start $50K: Max 4 Minis (40 Micros)",
          "Upgrade $100K: Max 8 Minis (80 Micros)",
          "Upgrade $200K: Max 15 Minis (150 Micros)",
          "Max Ceiling $400K: 20 Minis (fixed 60/40 split)"
        ]
      },
      {
        tier: "TCP100 ($100K → $400K)",
        levels: [
          "Start $100K: Max 8 Minis (80 Micros)",
          "Upgrade $150K: Max 12 Minis (120 Micros)",
          "Upgrade $200K: Max 15 Minis (150 Micros)",
          "Max Ceiling $400K: 20 Minis (fixed 60/40 split)"
        ]
      }
    ];
    e2.platformGuide = {
      dataFeed: "Supports both Rithmic and dxFeed (institutional-grade feed with deep MBO order book data).",
      bestPick: "dxFeed × ATAS or dxFeed × DeepCharts (includes FREE ATAS / DeepCharts order flow & footprint license throughout eval & LiveSim!). Also supports NinjaTrader & Tradovate.",
      commissionEst: "Approx. ~$4.20–$4.80 round-turn (Mini) • ~$1.10–$1.50 round-turn (Micro) depending on CME product & partner brokerage.",
      liveDataFee: "Non-Pro data is included during evaluation. LiveSim data is covered under the $139 activation fee (deducted from 1st payout). Moving to Live brokerage incurs standard monthly CME data fees."
    };

    // Topstep EN
    const ts = en.firms.topstep;
    ts.tagline = "#1 Global Futures Prop Firm • From $49/mo • $0 Activation Path • TopstepX Built-In";
    ts.badgeText = "MOST POPULAR FUTURES PROP FIRM";
    ts.platforms = ["TopstepX (Built-in TradingView & Copy Trader)", "Tradovate", "Quantower (by path)"];
    ts.closeTimeVN_Summer = "03:10 AM ICT (Summer) / 04:10 AM (Winter)";
    ts.newsTrading = "Allowed (stay strictly within MLL and XFA Scaling limits)";
    ts.copyTrading = "Allowed across up to 5 XFAs via native TopstepX copier (no cross-account hedging)";
    ts.maxAccounts = "Up to 5 active Express Funded Accounts (XFAs) simultaneously";
    ts.resetFee = "Standard: $49 / $99 / $199 • No Activation Fee: $85–$95 / $129–$149 / $199–$229";
    ts.profitSplit = "90% Trader / 10% Topstep (both Standard & Consistency Payout Paths)";
    ts.affiliateInfo = "Public affiliate sunsetted for new signups → Uses Trader Profile Referral Code (KENVINZONE = 50% OFF first Combine).";
    ts.summaryCompare = {
      drawdown: "EOD Trailing MLL (locks at $0 after 1st payout)",
      dll: "Optional (enable RTA for 2x Payout Caps!)",
      consistency: "Combine 55% | XFA: 5 days $150+ or 3 days 40%",
      activationFee: "Standard: $149 | NAF Path: $0 (FREE)",
      profitSplit: "90/10 (Up to 50% balance per payout, capped)",
      minDays: "2 trading days (Combine)",
      closeTime: "3:10 PM CT (earliest of all 3 firms!)",
      news: "Allowed",
      maxFunded: "5 XFAs Simultaneously"
    };
    ts.traps = [
      { title: "Trap #1: 'First Payout Trap' — MLL Locks to $0!", detail: "The moment you take your first XFA payout, your Maximum Loss Limit permanently locks at $0 (starting balance). Don't drain your entire cushion on payout #1." },
      { title: "Trap #2: Earliest Mandatory Flat Time (3:10 PM CT)", detail: "All positions and working orders must be flat by 3:10 PM CT (auto-flatten starts ~3:08 PM CT) — 40–49 minutes earlier than Earn2Trade and Bulenox!" },
      { title: "Trap #3: Tight Initial XFA Scaling Plan", detail: "While $50K Combine allows 5 Minis, a fresh $50K XFA (<$1,500 profit) starts capped at 1 Mini (10 Micros). Higher contract tiers unlock the next session after EOD." },
      { title: "Trap #4: Permanent Standard vs Consistency Payout Path", detail: "At XFA activation you permanently pick Standard (5 winning days ≥$150, caps $2K/$3K/$5K) or Consistency (3 days + 40% consistency, higher caps $3K/$4K/$6K)." }
    ];
    ts.payoutDetails = [
      "Minimum withdrawal $125 • Max 50% of profit balance per request, subject to tier & path caps.",
      "XFA Standard Path (5 days ≥$150): Caps $2,000 ($50K) • $3,000 ($100K) • $5,000 ($150K) — DOUBLED with RTA!",
      "XFA Consistency Path (3 days + 40%): Caps $3,000 ($50K) • $4,000 ($100K) • $6,000 ($150K).",
      "ACH/Wire fee is $30; Wise/Aeropay typically waived. Live Funded Accounts (LFA) remove payout caps entirely."
    ];
    ts.xfaScaling = [
      { tier: "$50K XFA", levels: ["Profit < $1,500: 1 Mini (10 Micros)", "Profit ≥ $1,500: 2 Minis (20 Micros)", "Profit ≥ $2,000: 3 Minis (31 Micros)"] },
      { tier: "$100K XFA", levels: ["Profit < $1,500: 1 Mini (18 Micros)", "Profit ≥ $1,500: 2 Minis (25 Micros)", "Profit ≥ $2,000: 3 Minis (31 Micros)", "Profit ≥ $3,000: 6 Minis (62 Micros)"] },
      { tier: "$150K XFA", levels: ["Profit < $1,500: 1 Mini (18 Micros)", "Profit ≥ $1,500: 2 Minis (25 Micros)", "Profit ≥ $2,000: 3 Minis (31 Micros)", "Profit ≥ $3,000: 6 Minis (62 Micros)", "Profit ≥ $4,500: 9 Minis (93 Micros)"] }
    ];
    ts.topstepPricingMatrix.coupons = [
      { id: "none", label: "Retail Price (No Code)", code: "", note: "Showing standard Topstep checkout prices." },
      { id: "KENVINZONE", label: "🦃 Apply KENVINZONE (-50% Friendsgiving)", code: "KENVINZONE", note: "Flat 50% OFF your first Trading Combine! Code KENVINZONE never expires for new traders." }
    ];
    ts.topstepPricingMatrix.tracks[0].label = "No Activation Fee ($0 XFA Activation)";
    ts.topstepPricingMatrix.tracks[0].subtitle = "Skip the $149 XFA activation fee • Turn ON Responsible Trading Advantage to save up to $30/mo + DOUBLE Payout Caps!";
    ts.topstepPricingMatrix.tracks[1].label = "Standard Path (From $49/mo + $149 Activation)";
    ts.topstepPricingMatrix.tracks[1].subtitle = "Lowest monthly cost for traders still calibrating • Note: Turning RTA ON keeps Standard monthly prices unchanged, adding DLL & 2x Payout Caps (-$10→$30/mo discount applies to NAF Path).";
    ts.topstepPricingMatrix.tracks.forEach((tr) => {
      ["rtaOff", "rtaOn"].forEach((k) => {
        tr[k].forEach((p) => {
          p.unit = "/mo";
          p.dll = p.dll.replace("Không bắt buộc", "Optional").replace("X2 Payout Cap", "2x Payout Caps");
        });
      });
    });
    ts.modes[0].label = "Standard Path — Low Monthly ($49–$199) + $149 Activation";
    ts.modes[0].note = "Best if you're new to Topstep or expect to take >2 months / multiple resets to pass the Combine.";
    ts.modes[1].label = "No Activation Fee (NAF) Path — Waives $149 XFA Fee";
    ts.modes[1].note = "Lowest total cost if you pass in 1–2 attempts (e.g., $50K total is $95 instead of $49 + $149 = $198!).";
    ts.modes.forEach((m) => {
      m.plans.forEach((p) => {
        p.listPrice = p.listPrice.replace("/tháng", "/mo");
        p.dll = p.dll.replace("Tùy chọn", "Optional");
        p.activation = p.activation.replace("(1 lần)", "(one-time)").replace("(Miễn phí)", "(Free)");
      });
    });
    ts.platformGuide = {
      dataFeed: "TopstepX (ProjectX — native browser TradingView charts with zero software installation or Rithmic setup).",
      bestPick: "TopstepX — easiest onboarding for traders switching from Forex/Crypto, with built-in 5-XFA Copy Trader, auto DLL lock, and 1-click Flatten.",
      commissionEst: "Highly competitive on TopstepX: ~$2.80 round-turn (Mini ES/NQ) • ~$0.74 round-turn (Micro MES/MNQ).",
      liveDataFee: "Free data during Combine & XFA. Upgrading to Live Funded Account (LFA) incurs standard CME Non-Pro data bundle (~$135/mo)."
    };

    return en;
  }

  let cachedEnData = null;

  /* ---------- Cache Original Vietnamese Text Nodes ---------- */
  const viCache = new Map();

  function applyDomTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!viCache.has(el)) viCache.set(el, el.textContent);
      if (currentLang === "en" && EN_UI[key]) {
        el.textContent = EN_UI[key];
      } else {
        el.textContent = viCache.get(el);
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (!viCache.has(el)) viCache.set(el, el.innerHTML);
      if (currentLang === "en" && EN_UI[key]) {
        el.innerHTML = EN_UI[key];
      } else {
        el.innerHTML = viCache.get(el);
      }
    });

    document.querySelectorAll("[data-i18n-label]").forEach((el) => {
      const key = el.getAttribute("data-i18n-label");
      const attrKey = key + "::vi";
      if (!viCache.has(attrKey)) viCache.set(attrKey, el.getAttribute("data-label") || "");
      el.setAttribute("data-label", currentLang === "en" && EN_UI[key] ? EN_UI[key] : viCache.get(attrKey));
    });

    const toggleBtn = document.getElementById("langToggle");
    if (toggleBtn) {
      toggleBtn.textContent = currentLang === "en" ? "VI" : "EN";
      toggleBtn.title = currentLang === "en" ? "Chuyển sang Tiếng Việt" : "Switch to English";
    }
  }

  /* ---------- Public API ---------- */
  window.KZ_LANG = {
    get: () => currentLang,
    t: (key, vars) => {
      const dict = STRINGS[currentLang] || STRINGS.vi;
      let str = dict[key] !== undefined ? dict[key] : STRINGS.vi[key] || key;
      if (vars && typeof str === "string") {
        Object.keys(vars).forEach((k) => {
          str = str.replace(new RegExp("\\{" + k + "\\}", "g"), vars[k]);
        });
      }
      return str;
    },
    getData: () => {
      if (currentLang === "en" && window.KZ_PROP_DATA) {
        if (!cachedEnData) cachedEnData = buildEnglishData(window.KZ_PROP_DATA);
        return cachedEnData;
      }
      return window.KZ_PROP_DATA;
    },
    set: (lang) => {
      persistLang(lang);
      applyDomTranslations();
      window.dispatchEvent(new CustomEvent("kz:lang-change", { detail: { lang: currentLang } }));
    },
    apply: applyDomTranslations
  };

  function bindLangToggle() {
    applyDomTranslations();
    const btn = document.getElementById("langToggle");
    if (btn) {
      btn.addEventListener("click", () => {
        window.KZ_LANG.set(currentLang === "en" ? "vi" : "en");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindLangToggle);
  } else {
    bindLangToggle();
  }
})();
