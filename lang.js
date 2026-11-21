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
    "nav.coupons": "🔥 Coupon Codes",
    "nav.back": "← Rules Dashboard",
    "nav.ctaCoupon": "Hot Coupons",
    "nav.ctaAurora": "Explore Aurora V12.2",

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
    "s3.title": "Consistency Rule & True Evaluation Cost Calculators",
    "s3.sub": "Stop eyeballing your math — plug in your numbers to verify consistency eligibility and real cost to funded.",
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

    // CME Clocks
    "clk.tsBadge": "TOPSTEP — EARLIEST CLOSE",
    "clk.tsDesc": "VN Time (ICT): <strong>03:10 AM</strong> (Summer) • <strong>04:10 AM</strong> (Winter). Auto-flatten begins at 3:08 PM CT.",
    "clk.e2tBadge": "EARN2TRADE",
    "clk.e2tDesc": "VN Time (ICT): <strong>03:50 AM</strong> (Summer) • <strong>04:50 AM</strong> (Winter). Next session opens at 5:00 PM CT.",
    "clk.bxBadge": "BULENOX — LATEST CLOSE",
    "clk.bxDesc": "VN Time (ICT): <strong>03:59 AM</strong> (Summer) • <strong>04:59 AM</strong> (Winter). Strictly no overnight holding.",

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
    "ft.couponMain": "<strong style=\"color:var(--kz-strong)\">KENVINZONE COUPON HUB</strong> · Verified discount codes for Bulenox, Earn2Trade & Topstep.",
    "ft.back": "← Back to Rules Dashboard"
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
          p.dll = p.dll.replace("Không có", "None");
          p.activation = p.activation.replace("(Gộp gói)", "(Included)");
        });
      });
    });

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

    // Topstep EN
    const ts = en.firms.topstep;
    ts.tagline = "#1 Global Futures Prop Firm • From $49/mo • $0 Activation Path • TopstepX Built-In";
    ts.badgeText = "MOST POPULAR FUTURES PROP FIRM";
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
    ts.topstepPricingMatrix.tracks[1].subtitle = "Lowest monthly cost for traders still calibrating • Includes Monthly Reset Credit on Rebill.";
    ts.topstepPricingMatrix.tracks.forEach((tr) => {
      ["rtaOff", "rtaOn"].forEach((k) => {
        tr[k].forEach((p) => {
          p.unit = "/mo";
          p.dll = p.dll.replace("Không bắt buộc", "Optional").replace("X2 Payout Cap", "2x Payout Caps");
        });
      });
    });

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
