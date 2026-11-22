/* ============================================================================
   KENVINZONE PROP FIRM HUB — INTERACTIVE LOGIC
   ============================================================================ */

(function () {
  if (!window.KZ_PROP_DATA) return;
  const getData = () => (window.KZ_LANG ? window.KZ_LANG.getData() : window.KZ_PROP_DATA);
  const T = (k, vars) => (window.KZ_LANG ? window.KZ_LANG.t(k, vars) : k);
  let DATA = getData();

  /* ---------- Theme Sync (kz-theme) ---------- */
  const htmlEl = document.documentElement;
  function initTheme() {
    let saved = null;
    try {
      saved = localStorage.getItem("kz-theme");
    } catch (_) {}
    if (saved === "light" || saved === "dark") {
      htmlEl.setAttribute("data-theme", saved);
    }
    const btn = document.getElementById("themeToggle");
    if (btn) {
      btn.addEventListener("click", () => {
        const next = htmlEl.getAttribute("data-theme") === "light" ? "dark" : "light";
        htmlEl.setAttribute("data-theme", next);
        try {
          localStorage.setItem("kz-theme", next);
        } catch (_) {}
      });
    }
  }

  /* ---------- Mobile Menu ---------- */
  function initMenu() {
    const btn = document.getElementById("menuToggle");
    const nav = document.getElementById("mainNav");
    if (!btn || !nav) return;
    btn.setAttribute("aria-expanded", "false");
    btn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Toast ---------- */
  let toastTimer = null;
  function showToast(msg) {
    let t = document.getElementById("kzToast");
    if (!t) {
      t = document.createElement("div");
      t.id = "kzToast";
      t.className = "toast";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => showToast(T("copied") + text),
        () => fallbackCopy(text)
      );
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast(T("copied") + text);
    } catch (_) {
      showToast(text);
    }
    document.body.removeChild(ta);
  }

  /* ---------- Hydrate Dynamic Links & Dates ---------- */
  function hydrateSiteLinks() {
    document.querySelectorAll("[data-last-updated]").forEach((el) => {
      el.textContent = DATA.site.lastUpdated;
    });
    document.querySelectorAll("[data-aurora-link]").forEach((el) => {
      el.setAttribute("href", DATA.site.auroraUrl);
    });
    document.querySelectorAll("[data-telegram-link]").forEach((el) => {
      el.setAttribute("href", DATA.site.telegramUrl);
    });
    document.querySelectorAll("[data-aff]").forEach((el) => {
      const key = el.getAttribute("data-aff");
      if (DATA.site.affiliateLinks[key]) {
        el.setAttribute("href", DATA.site.affiliateLinks[key]);
      }
    });
  }

  /* ---------- Index Page: Comparison Matrix ---------- */
  function renderComparisonTable() {
    const tbody = document.getElementById("compareTableBody");
    if (!tbody) return;
    DATA = getData();
    const f = DATA.firms;
    const keys = ["drawdown", "dll", "consistency", "activationFee", "profitSplit", "minDays", "closeTime", "news", "maxFunded"];
    const labels = T("cmp");
    const rows = keys.map((key, idx) => ({ label: Array.isArray(labels) ? labels[idx] : key, key }));

    tbody.innerHTML = rows
      .map(
        (r) => `
      <tr>
        <td class="col-label">${r.label}</td>
        <td>${f.bulenox.summaryCompare[r.key]}</td>
        <td>${f.earn2trade.summaryCompare[r.key]}</td>
        <td>${f.topstep.summaryCompare[r.key]}</td>
      </tr>
    `
      )
      .join("");
  }

  /* ---------- Unified Interactive Pricing & Coupon Simulator (All 3 Firms) ---------- */
  let currentFirmId = "bulenox";
  let currentModeIdx = 0;

  const simState = {
    bulenox: { track: "qualification", option: "opt1", coupon: "5BAAG" },
    earn2trade: { track: "tcp", coupon: "BIGBF2026" },
    topstep: { track: "naf", rta: true, coupon: "KENVINZONE" }
  };

  function renderFirmPricingShowcase(firmId) {
    DATA = getData();
    const firm = DATA.firms[firmId];
    if (!firm) return "";
    const affUrl = DATA.site.affiliateLinks[firm.id] || "#";

    /* --- 1. BULENOX --- */
    if (firmId === "bulenox" && firm.bulenoxPricingMatrix) {
      const mx = firm.bulenoxPricingMatrix;
      const st = simState.bulenox;
      const track = mx.tracks.find((t) => t.id === st.track) || mx.tracks[0];
      const plans = track[st.option] || track.opt1;
      const activeCoupon = mx.coupons.find((c) => c.id === st.coupon) || mx.coupons[0];

      const cardsHtml = plans
        .map((p) => {
          const pct = st.coupon === "none" ? 0 : (p.discounts && p.discounts[st.coupon]) || 0;
          const finalPrice = pct > 0 ? p.price * (1 - pct / 100) : p.price;
          const saved = p.price - finalPrice;
          const hasDiscount = pct > 0;
          const discountLabel =
            hasDiscount && p.discountRange && st.coupon === "5BAAG"
              ? `-${pct}% (${window.KZ_LANG && window.KZ_LANG.get() === "en" ? "up to 61%" : "tới 61%"})`
              : `-${pct}%`;

          return `
          <div class="bx-plan-card ${p.popular ? "is-popular" : ""}" data-tilt-card>
            ${p.popular ? `<div class="bx-popular-ribbon">${T("simPopular")}</div>` : ""}
            <div class="bx-plan-top">
              <div class="bx-plan-size mono">${p.size}</div>
              ${
                hasDiscount
                  ? `<span class="tag tag-rose bx-disc-badge">${discountLabel}</span>`
                  : st.coupon !== "none"
                    ? `<span class="tag" style="background:rgba(143,163,191,.12);color:var(--kz-muted);border:1px solid var(--kz-line)">${T("simNoApply")}</span>`
                    : `<span class="tag tag-cyan">${T("simListTag")}</span>`
              }
            </div>
            <div class="bx-price-stage">
              ${hasDiscount ? `<div class="bx-price-old mono">$${p.price.toFixed(2)}</div>` : `<div class="bx-price-old-spacer"></div>`}
              <div class="bx-price-now-row">
                <span class="bx-price-now mono" data-roll-price="${finalPrice.toFixed(2)}" data-orig-price="${p.price.toFixed(2)}">$${finalPrice.toFixed(2)}</span>
                <span class="bx-price-unit">${p.unit}</span>
              </div>
              ${
                hasDiscount
                  ? `<div class="bx-save-pill">${T("simSave", { saved: saved.toFixed(2), code: activeCoupon.code })}</div>`
                  : `<div class="bx-save-pill muted">${st.coupon === "none" ? T("simBxHintNone") : T("simBxHintOther")}</div>`
              }
            </div>
            <ul class="bx-spec-list">
              <li><span>${T("simTarget")}</span><strong class="mono" style="color:var(--kz-green)">${p.target}</strong></li>
              <li><span>${T("simDrawdown")}</span><strong class="mono">${p.drawdown}</strong></li>
              <li><span>${T("simDll")}</span><strong class="mono">${p.dll}</strong></li>
              <li><span>${T("simContracts")}</span><strong>${p.contracts}</strong></li>
              <li><span>${T("simActivation")}</span><strong class="mono">${p.activation}</strong></li>
            </ul>
            <div class="bx-plan-actions">
              ${hasDiscount ? `<button type="button" class="kz-cta kz-cta-gold bx-copy-btn" data-copy-code="${activeCoupon.code}" style="flex:1;padding:9px 10px;font-size:12.5px">${T("copyShort")}${activeCoupon.code}</button>` : ""}
              <a href="${affUrl}" target="_blank" rel="noopener noreferrer" class="kz-cta kz-cta-cyan" style="flex:1;padding:9px 10px;font-size:12.5px">${T("register")}</a>
            </div>
          </div>`;
        })
        .join("");

      return `
        <div class="bx-showcase" data-sim-firm="bulenox">
          <div class="bx-showcase-head">
            <div>
              <span class="tag tag-cyan" style="margin-bottom:6px">${T("simBxTag")}</span>
              <h4 style="margin:0;font-size:19px;font-weight:800;color:var(--kz-strong)">${T("simBxHead")}</h4>
            </div>
            <div class="bx-opt-switch">
              <button type="button" class="bx-opt-btn ${st.option === "opt1" ? "active" : ""}" data-sim-action="bx-opt" data-val="opt1">Option 1 · Trailing</button>
              <button type="button" class="bx-opt-btn ${st.option === "opt2" ? "active" : ""}" data-sim-action="bx-opt" data-val="opt2">Option 2 · EOD</button>
            </div>
          </div>
          <div class="bx-track-tabs">
            ${mx.tracks.map((t) => `<button type="button" class="mode-pill ${t.id === st.track ? "active" : ""}" data-sim-action="bx-track" data-val="${t.id}">${t.label}</button>`).join("")}
          </div>
          <p style="margin:0 0 14px;font-size:13px;color:var(--kz-muted)">💡 ${track.subtitle}</p>
          <div class="bx-coupon-bar">
            <div class="bx-coupon-bar-label">${T("simChooseCoupon")}</div>
            <div class="bx-coupon-pills">
              ${mx.coupons.map((c) => `<button type="button" class="bx-coupon-pill ${c.id === st.coupon ? "active" : ""}" data-sim-action="bx-coupon" data-val="${c.id}">${c.label}</button>`).join("")}
            </div>
            <div class="bx-coupon-note">${activeCoupon.note}</div>
          </div>
          <div class="bx-cards-grid">${cardsHtml}</div>
        </div>`;
    }

    /* --- 2. EARN2TRADE --- */
    if (firmId === "earn2trade" && firm.earn2tradePricingMatrix) {
      const mx = firm.earn2tradePricingMatrix;
      const st = simState.earn2trade;
      const track = mx.tracks.find((t) => t.id === st.track) || mx.tracks[0];
      const activeCoupon = mx.coupons.find((c) => c.id === st.coupon) || mx.coupons[0];

      const cardsHtml = track.plans
        .map((p) => {
          const pct = st.coupon === "none" ? 0 : (p.discounts && p.discounts[st.coupon]) || 0;
          const finalPrice = pct > 0 ? p.price * (1 - pct / 100) : p.price;
          const saved = p.price - finalPrice;
          const hasDiscount = pct > 0;

          return `
          <div class="bx-plan-card ${p.popular ? "is-popular" : ""}" data-tilt-card>
            ${p.popular ? `<div class="bx-popular-ribbon">${T("simRecommend")}</div>` : ""}
            <div class="bx-plan-top">
              <div class="bx-plan-size mono">${p.size}</div>
              ${hasDiscount ? `<span class="tag tag-rose bx-disc-badge">${p.dealBadge || "-" + pct + "%"}</span>` : `<span class="tag tag-gold">${T("simRetailTag")}</span>`}
            </div>
            <div class="bx-price-stage">
              ${hasDiscount ? `<div class="bx-price-old mono">$${p.price.toFixed(2)}</div>` : `<div class="bx-price-old-spacer"></div>`}
              <div class="bx-price-now-row">
                <span class="bx-price-now mono" style="color:var(--kz-gold)" data-roll-price="${finalPrice.toFixed(2)}" data-orig-price="${p.price.toFixed(2)}">$${finalPrice.toFixed(2)}</span>
                <span class="bx-price-unit">${p.unit}</span>
              </div>
              ${
                hasDiscount
                  ? `<div class="bx-save-pill">${T("simSave", { saved: saved.toFixed(2), code: activeCoupon.code })}</div>`
                  : `<div class="bx-save-pill muted">${T("simE2tHintNone")}</div>`
              }
            </div>
            <ul class="bx-spec-list">
              <li><span>${T("simTarget")}</span><strong class="mono" style="color:var(--kz-green)">${p.target}</strong></li>
              <li><span>${T("simEodDrawdown")}</span><strong class="mono">${p.drawdown}</strong></li>
              <li><span>${T("simDll")}</span><strong class="mono" style="color:var(--kz-rose)">${p.dll}</strong></li>
              <li><span>${T("simFixedContracts")}</span><strong>${p.contracts}</strong></li>
              <li><span>${T("simResetPromo")}</span><strong class="mono" style="color:var(--kz-cyan)">${p.resetNote}</strong></li>
            </ul>
            <div class="bx-plan-actions">
              ${hasDiscount ? `<button type="button" class="kz-cta kz-cta-gold bx-copy-btn" data-copy-code="${activeCoupon.code}" style="flex:1;padding:9px 10px;font-size:12.5px">${T("copyShort")}${activeCoupon.code}</button>` : ""}
              <a href="${affUrl}" target="_blank" rel="noopener noreferrer" class="kz-cta kz-cta-cyan" style="flex:1;padding:9px 10px;font-size:12.5px">${T("register")}</a>
            </div>
          </div>`;
        })
        .join("");

      return `
        <div class="bx-showcase" data-sim-firm="earn2trade" style="border-color:rgba(243,190,98,.38)">
          <div class="bx-showcase-head">
            <div>
              <span class="tag tag-gold" style="margin-bottom:6px">${T("simE2tTag")}</span>
              <h4 style="margin:0;font-size:19px;font-weight:800;color:var(--kz-strong)">${T("simE2tHead")}</h4>
            </div>
          </div>
          <div class="bx-track-tabs">
            ${mx.tracks.map((t) => `<button type="button" class="mode-pill ${t.id === st.track ? "active" : ""}" data-sim-action="e2t-track" data-val="${t.id}">${t.label}</button>`).join("")}
          </div>
          <p style="margin:0 0 14px;font-size:13px;color:var(--kz-muted)">💡 ${track.subtitle}</p>
          <div class="bx-coupon-bar">
            <div class="bx-coupon-bar-label">${T("simChooseE2tCoupon")}</div>
            <div class="bx-coupon-pills">
              ${mx.coupons.map((c) => `<button type="button" class="bx-coupon-pill ${c.id === st.coupon ? "active" : ""}" data-sim-action="e2t-coupon" data-val="${c.id}">${c.label}</button>`).join("")}
            </div>
            <div class="bx-coupon-note">${activeCoupon.note}</div>
          </div>
          <div class="bx-cards-grid ${track.plans.length === 3 ? "cols-3" : ""}">${cardsHtml}</div>
        </div>`;
    }

    /* --- 3. TOPSTEP --- */
    if (firmId === "topstep" && firm.topstepPricingMatrix) {
      const mx = firm.topstepPricingMatrix;
      const st = simState.topstep;
      const track = mx.tracks.find((t) => t.id === st.track) || mx.tracks[0];
      const plans = st.rta ? track.rtaOn : track.rtaOff;
      const activeCoupon = mx.coupons.find((c) => c.id === st.coupon) || mx.coupons[0];

      const cardsHtml = plans
        .map((p) => {
          const pct = st.coupon === "none" ? 0 : (p.discounts && p.discounts[st.coupon]) || 0;
          const finalPrice = pct > 0 ? p.price * (1 - pct / 100) : p.price;
          const saved = (p.baseBeforeRta || p.price) - finalPrice;
          const hasDiscount = pct > 0;

          return `
          <div class="bx-plan-card ${p.popular ? "is-popular" : ""}" data-tilt-card>
            ${p.popular ? `<div class="bx-popular-ribbon">${T("simRecommend")}</div>` : ""}
            <div class="bx-plan-top">
              <div class="bx-plan-size mono">${p.size}</div>
              ${hasDiscount ? `<span class="tag tag-rose bx-disc-badge">${T("simFirst50")}</span>` : st.rta && p.baseBeforeRta ? `<span class="tag tag-green">-$${p.baseBeforeRta - p.price} RTA</span>` : `<span class="tag tag-green">${T("simRetailTag")}</span>`}
            </div>
            <div class="bx-price-stage">
              ${hasDiscount || p.baseBeforeRta ? `<div class="bx-price-old mono">$${(p.baseBeforeRta || p.price).toFixed(2)}</div>` : `<div class="bx-price-old-spacer"></div>`}
              <div class="bx-price-now-row">
                <span class="bx-price-now mono" style="color:var(--kz-green)" data-roll-price="${finalPrice.toFixed(2)}" data-orig-price="${(p.baseBeforeRta || p.price).toFixed(2)}">$${finalPrice.toFixed(2)}</span>
                <span class="bx-price-unit">${p.unit}</span>
              </div>
              ${
                hasDiscount
                  ? `<div class="bx-save-pill">${T("simSave", { saved: saved.toFixed(2), code: activeCoupon.code })}</div>`
                  : `<div class="bx-save-pill muted">${T("simTsHintNone")}</div>`
              }
            </div>
            <ul class="bx-spec-list">
              <li><span>${T("simTarget")}</span><strong class="mono" style="color:var(--kz-green)">${p.target}</strong></li>
              <li><span>${T("simMll")}</span><strong class="mono">${p.drawdown}</strong></li>
              <li><span>${T("simDllCap")}</span><strong class="mono">${p.dll}</strong></li>
              <li><span>${T("simCombineContracts")}</span><strong>${p.contracts}</strong></li>
              <li><span>${T("simXfaActivation")}</span><strong class="mono" style="color:${p.activation.includes("FREE") ? "var(--kz-green)" : "var(--kz-strong)"}">${p.activation}</strong></li>
              <li><span>${T("simResetFee")}</span><strong class="mono">${p.resetFee}</strong></li>
            </ul>
            <div class="bx-plan-actions">
              ${hasDiscount ? `<button type="button" class="kz-cta kz-cta-gold bx-copy-btn" data-copy-code="${activeCoupon.code}" style="flex:1;padding:9px 10px;font-size:12.5px">${T("copyShort")}${activeCoupon.code}</button>` : ""}
              <a href="${affUrl}" target="_blank" rel="noopener noreferrer" class="kz-cta kz-cta-cyan" style="flex:1;padding:9px 10px;font-size:12.5px">${T("register")}</a>
            </div>
          </div>`;
        })
        .join("");

      return `
        <div class="bx-showcase" data-sim-firm="topstep" style="border-color:rgba(52,211,153,.38)">
          <div class="bx-showcase-head">
            <div>
              <span class="tag tag-green" style="margin-bottom:6px">${T("simTsTag")}</span>
              <h4 style="margin:0;font-size:19px;font-weight:800;color:var(--kz-strong)">${T("simTsHead")}</h4>
            </div>
            <div class="bx-opt-switch">
              <button type="button" class="bx-opt-btn ${st.rta ? "active" : ""}" data-sim-action="ts-rta" data-val="on">${T("simTsRtaOn")}</button>
              <button type="button" class="bx-opt-btn ${!st.rta ? "active" : ""}" data-sim-action="ts-rta" data-val="off">${T("simTsRtaOff")}</button>
            </div>
          </div>
          <div class="bx-track-tabs">
            ${mx.tracks.map((t) => `<button type="button" class="mode-pill ${t.id === st.track ? "active" : ""}" data-sim-action="ts-track" data-val="${t.id}">${t.label}</button>`).join("")}
          </div>
          <p style="margin:0 0 14px;font-size:13px;color:var(--kz-muted)">💡 ${track.subtitle}</p>
          <div class="bx-coupon-bar">
            <div class="bx-coupon-bar-label">${T("simChooseTsCoupon")}</div>
            <div class="bx-coupon-pills">
              ${mx.coupons.map((c) => `<button type="button" class="bx-coupon-pill ${c.id === st.coupon ? "active" : ""}" data-sim-action="ts-coupon" data-val="${c.id}">${c.label}</button>`).join("")}
            </div>
            <div class="bx-coupon-note">${activeCoupon.note}</div>
          </div>
          <div class="bx-cards-grid cols-3">${cardsHtml}</div>
        </div>`;
    }

    return "";
  }

  function bindPricingShowcaseEvents(rootEl, rerenderFn) {
    rootEl.querySelectorAll("[data-sim-action]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const action = btn.getAttribute("data-sim-action");
        const val = btn.getAttribute("data-val");
        let triggerSparkle = false;

        if (action === "bx-track") simState.bulenox.track = val;
        if (action === "bx-opt") simState.bulenox.option = val;
        if (action === "bx-coupon") {
          triggerSparkle = val !== "none" && val !== simState.bulenox.coupon;
          simState.bulenox.coupon = val;
        }
        if (action === "e2t-track") simState.earn2trade.track = val;
        if (action === "e2t-coupon") {
          triggerSparkle = val !== "none" && val !== simState.earn2trade.coupon;
          simState.earn2trade.coupon = val;
        }
        if (action === "ts-track") simState.topstep.track = val;
        if (action === "ts-rta") simState.topstep.rta = val === "on";
        if (action === "ts-coupon") {
          triggerSparkle = val !== "none" && val !== simState.topstep.coupon;
          simState.topstep.coupon = val;
        }

        rerenderFn();
        window.dispatchEvent(new CustomEvent("kz:price-roll"));
        if (triggerSparkle) {
          window.dispatchEvent(new CustomEvent("kz:sparkle", { detail: { x: e.clientX, y: e.clientY } }));
        }
      });
    });

    rootEl.querySelectorAll(".bx-copy-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        copyText(btn.getAttribute("data-copy-code"));
        window.dispatchEvent(new CustomEvent("kz:sparkle", { detail: { x: e.clientX, y: e.clientY } }));
      });
    });
  }

  function renderFirmExplorer() {
    const container = document.getElementById("firmExplorerContent");
    if (!container) return;
    DATA = getData();
    const firm = DATA.firms[currentFirmId];
    if (!firm) return;

    const mode = firm.modes[currentModeIdx] || firm.modes[0];
    const affUrl = DATA.site.affiliateLinks[firm.id] || "#";
    const bulenoxShowcaseHtml = renderFirmPricingShowcase(firm.id);

    // Build dynamic table columns per firm
    let headers = "";
    let bodyRows = "";
    if (firm.id === "bulenox") {
      headers = `
        <th>${T("tblPlan")}</th>
        <th>${T("tblListPrice")}</th>
        <th>${T("tblTarget")}</th>
        <th>${T("tblDrawdown")}</th>
        <th>${T("tblDll")}</th>
        <th>${T("tblMaxContracts")}</th>
        <th>${T("tblMasterAct")}</th>
        <th>${T("tblSafetyReserve")}</th>
        <th>${T("tblPayoutCap3")}</th>
      `;
      bodyRows = mode.plans
        .map(
          (p) => `
        <tr>
          <td class="col-label mono">${p.size}</td>
          <td class="mono">${p.listPrice}</td>
          <td class="mono" style="color:var(--kz-green);font-weight:700">${p.target}</td>
          <td class="mono">${p.drawdown}</td>
          <td>${p.dll}</td>
          <td>${p.contracts}</td>
          <td class="mono">${p.activation}</td>
          <td class="mono">${p.safetyReserve}</td>
          <td class="mono" style="color:var(--kz-gold);font-weight:700">${p.payoutCap3}</td>
        </tr>
      `
        )
        .join("");
    } else if (firm.id === "earn2trade") {
      headers = `
        <th>${T("tblPlan")}</th>
        <th>${T("tblListPrice")}</th>
        <th>${T("tblTarget")}</th>
        <th>${T("tblEodDrawdown")}</th>
        <th>${T("tblDll")}</th>
        <th>${T("tblFixedContracts")}</th>
        <th>${T("tblLiveSimFee")}</th>
        <th>${T("tblMinProfitDay")}</th>
        <th>${T("tblSplit80")}</th>
      `;
      bodyRows = mode.plans
        .map(
          (p) => `
        <tr>
          <td class="col-label mono">${p.size}</td>
          <td class="mono">${p.listPrice}</td>
          <td class="mono" style="color:var(--kz-green);font-weight:700">${p.target}</td>
          <td class="mono">${p.drawdown}</td>
          <td class="mono" style="color:var(--kz-rose);font-weight:700">${p.dll}</td>
          <td>${p.contracts}</td>
          <td>${p.activation}</td>
          <td class="mono">${p.minProfitDay}</td>
          <td class="mono" style="color:var(--kz-gold);font-weight:700">${p.split80Threshold}</td>
        </tr>
      `
        )
        .join("");
    } else {
      headers = `
        <th>${T("tblPlan")}</th>
        <th>${T("tblMonthly")}</th>
        <th>${T("tblTarget")}</th>
        <th>${T("tblMll")}</th>
        <th>${T("tblMaxDay55")}</th>
        <th>${T("tblCombineContracts")}</th>
        <th>${T("tblXfaAct")}</th>
        <th>${T("tblResetFee")}</th>
      `;
      bodyRows = mode.plans
        .map(
          (p) => `
        <tr>
          <td class="col-label mono">${p.size}</td>
          <td class="mono">${p.listPrice}</td>
          <td class="mono" style="color:var(--kz-green);font-weight:700">${p.target}</td>
          <td class="mono">${p.drawdown}</td>
          <td class="mono" style="color:var(--kz-gold);font-weight:700">${p.consistencyMaxDay}</td>
          <td>${p.contracts}</td>
          <td class="mono">${p.activation}</td>
          <td class="mono">${p.resetPrice}</td>
        </tr>
      `
        )
        .join("");
    }

    const scalingHtml = firm.xfaScaling
      ? `
      <div style="margin-top:22px">
        <h4 style="margin:0 0 6px;font-size:15px;color:var(--kz-strong)">${T("scalingHeading")}</h4>
        <div class="scaling-grid">
          ${firm.xfaScaling
            .map(
              (s) => `
            <div class="scaling-box">
              <h5 class="mono">${s.tier}</h5>
              <ul>${s.levels.map((l) => `<li>${l}</li>`).join("")}</ul>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `
      : firm.tcpScaling
        ? `
      <div style="margin-top:22px">
        <h4 style="margin:0 0 4px;font-size:15px;color:var(--kz-strong)">${T("tcpScalingHeading")}</h4>
        <p style="margin:0 0 10px;font-size:12.5px;color:var(--kz-muted)">💡 ${T("tcpScalingNote")}</p>
        <div class="scaling-grid">
          ${firm.tcpScaling
            .map(
              (s) => `
            <div class="scaling-box">
              <h5 class="mono" style="color:var(--kz-gold)">${s.tier}</h5>
              <ul>${s.levels.map((l) => `<li>${l}</li>`).join("")}</ul>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `
        : "";

    const platformGuideHtml = firm.platformGuide
      ? `
        <div class="meta-tile platform-guide-box" style="padding:18px;margin-top:16px">
          <div class="meta-tile-label" style="color:var(--kz-gold)">${T("platformGuideHeading")}</div>
          <div class="platform-guide-grid">
            <div class="pg-item"><strong>${T("lblDataFeed")}</strong> <span>${firm.platformGuide.dataFeed}</span></div>
            <div class="pg-item"><strong>${T("lblBestPick")}</strong> <span>${firm.platformGuide.bestPick}</span></div>
            <div class="pg-item"><strong>${T("lblCommEst")}</strong> <span>${firm.platformGuide.commissionEst}</span></div>
            <div class="pg-item"><strong>${T("lblLiveDataFee")}</strong> <span>${firm.platformGuide.liveDataFee}</span></div>
          </div>
        </div>
      `
      : "";

    container.innerHTML = `
      <div class="card">
        <div class="firm-header-box">
          <div>
            <span class="tag tag-cyan" style="margin-bottom:8px">${firm.badgeText}</span>
            <h3 style="margin:0;font-size:26px;font-weight:800;color:var(--kz-strong)">${firm.name}</h3>
            <p style="margin:4px 0 0;color:var(--kz-muted);font-size:14px">${firm.tagline}</p>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:10px">
            <a href="${affUrl}" target="_blank" rel="noopener noreferrer" class="kz-cta kz-cta-cyan">
              ${T("registerFirm", { firm: firm.name })}
            </a>
            <a href="coupons.html?firm=${firm.id}" class="kz-cta kz-cta-gold">
              ${T("getCouponFirm", { firm: firm.name })}
            </a>
          </div>
        </div>

        <div class="firm-meta-grid">
          <div class="meta-tile">
            <div class="meta-tile-label">${T("closeTimeLabel")}</div>
            <div class="meta-tile-val mono" style="color:var(--kz-gold)">${firm.closeTimeCT}</div>
            <div style="font-size:11.5px;color:var(--kz-muted);margin-top:3px">${firm.closeTimeVN_Summer}</div>
          </div>
          <div class="meta-tile">
            <div class="meta-tile-label">${T("profitSplitLabel")}</div>
            <div class="meta-tile-val">${firm.profitSplit}</div>
          </div>
          <div class="meta-tile">
            <div class="meta-tile-label">${T("resetFeeLabel")}</div>
            <div class="meta-tile-val">${firm.resetFee}</div>
          </div>
          <div class="meta-tile">
            <div class="meta-tile-label">${T("maxAccLabel")}</div>
            <div class="meta-tile-val">${firm.maxAccounts}</div>
          </div>
        </div>

        ${bulenoxShowcaseHtml}

        <div class="mode-pills" id="firmModePills" style="margin-top:${bulenoxShowcaseHtml ? "24px" : "0"}">
          ${firm.modes
            .map(
              (m, idx) => `
            <button type="button" class="mode-pill ${idx === currentModeIdx ? "active" : ""}" data-mode-idx="${idx}">
              ${m.label}
            </button>
          `
            )
            .join("")}
        </div>
        <p style="margin:0 0 14px;font-size:13.5px;color:var(--kz-text2)">💡 ${mode.note}</p>

        <div class="table-wrap">
          <table class="prop-table">
            <thead><tr>${headers}</tr></thead>
            <tbody>${bodyRows}</tbody>
          </table>
        </div>

        ${scalingHtml}

        <div style="margin-top:24px">
          <h4 style="margin:0;font-size:16px;font-weight:800;color:var(--kz-strong)">${T("trapsHeading", { firm: firm.name })}</h4>
          <div class="traps-grid">
            ${firm.traps
              .map(
                (t) => `
              <div class="trap-card">
                <h4>${t.title}</h4>
                <p>${t.detail}</p>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <div class="info-split-grid">
          <div class="meta-tile" style="padding:18px">
            <div class="meta-tile-label" style="color:var(--kz-green)">${T("payoutHeading")}</div>
            <ul class="bullet-list">
              ${firm.payoutDetails.map((d) => `<li>${d}</li>`).join("")}
            </ul>
          </div>
          <div class="meta-tile" style="padding:18px">
            <div class="meta-tile-label" style="color:var(--kz-cyan)">${T("techHeading")}</div>
            <ul class="bullet-list">
              <li><strong>${T("lblPlatforms")}</strong> ${firm.platforms.join(", ")}</li>
              <li><strong>${T("lblNews")}</strong> ${firm.newsTrading}</li>
              <li><strong>${T("lblCopy")}</strong> ${firm.copyTrading}</li>
              <li><strong>${T("lblAff")}</strong> ${firm.affiliateInfo}</li>
            </ul>
          </div>
        </div>
        ${platformGuideHtml}
      </div>
    `;

    // Bind mode pills
    container.querySelectorAll("[data-mode-idx]").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentModeIdx = Number(btn.getAttribute("data-mode-idx")) || 0;
        renderFirmExplorer();
      });
    });

    // Bind unified interactive pricing showcase controls (Bulenox, Earn2Trade, Topstep)
    bindPricingShowcaseEvents(container, renderFirmExplorer);

    window.dispatchEvent(new CustomEvent("kz:firm-rendered", { detail: { firmId: currentFirmId } }));
  }

  function initFirmTabs() {
    const tabs = document.querySelectorAll("[data-firm-tab]");
    if (!tabs.length) return;

    function selectFirm(firmId, scrollToExplorer) {
      currentFirmId = firmId;
      currentModeIdx = 0;
      tabs.forEach((t) => t.classList.toggle("active", t.getAttribute("data-firm-tab") === firmId));
      renderFirmExplorer();
      if (scrollToExplorer) {
        const el = document.getElementById("chi-tiet-quy");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => selectFirm(tab.getAttribute("data-firm-tab"), false));
    });

    document.querySelectorAll("[data-jump-firm]").forEach((el) => {
      el.addEventListener("click", () => selectFirm(el.getAttribute("data-jump-firm"), true));
    });

    renderFirmExplorer();
  }

  /* ---------- Index Page: Consistency Rule Calculator ---------- */
  function initConsistencyCalc() {
    const firmSel = document.getElementById("calcConsFirm");
    const bestDayIn = document.getElementById("calcBestDay");
    const totalProfitIn = document.getElementById("calcTotalProfit");
    const outBox = document.getElementById("calcConsResult");
    if (!firmSel || !bestDayIn || !totalProfitIn || !outBox) return;

    const rules = {
      bulenox_40: { name: "Bulenox Master (40%)", limit: 0.4 },
      e2t_30: { name: "Earn2Trade Vòng thi (30%)", limit: 0.3 },
      topstep_55: { name: "Topstep Combine (55%)", limit: 0.55 },
      topstep_40: { name: "Topstep XFA Consistency (40%)", limit: 0.4 }
    };

    function update() {
      const rule = rules[firmSel.value] || rules.topstep_55;
      const best = Math.max(0, Number(bestDayIn.value) || 0);
      const total = Math.max(0, Number(totalProfitIn.value) || 0);

      if (best <= 0 || total <= 0) {
        outBox.innerHTML = `<div style="color:var(--kz-muted);font-size:13.5px">${T("consHint")}</div>`;
        return;
      }

      const ratio = best / total;
      const pct = (ratio * 100).toFixed(1);
      const requiredTotal = Math.ceil(best / rule.limit);
      const extraNeeded = Math.max(0, requiredTotal - total);
      const passed = ratio <= rule.limit;

      outBox.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap">
          <span style="font-size:12.5px;color:var(--kz-muted)">${T("consSub", { name: rule.name })}</span>
          <span class="tag ${passed ? "tag-green" : "tag-rose"}">${passed ? T("consPassBadge") : T("consFailBadge")}</span>
        </div>
        <div class="calc-result-big mono" style="color:${passed ? "var(--kz-green)" : "var(--kz-rose)"}">${pct}% <span style="font-size:14px;color:var(--kz-muted);font-weight:600">${T("consLimitWord")}${(rule.limit * 100).toFixed(0)}%</span></div>
        <div style="font-size:13px;color:var(--kz-text2)">
          ${
            passed
              ? T("consPassText", { total: total.toLocaleString() })
              : T("consFailText", { req: requiredTotal.toLocaleString(), extra: extraNeeded.toLocaleString() })
          }
        </div>
      `;
    }

    [firmSel, bestDayIn, totalProfitIn].forEach((el) => el.addEventListener("input", update));
    window.addEventListener("kz:lang-change", update);
    update();
  }

  /* ---------- Index Page: True Cost Calculator ---------- */
  function initTrueCostCalc() {
    const monthlyIn = document.getElementById("costMonthly");
    const discountIn = document.getElementById("costDiscount");
    const resetsIn = document.getElementById("costResets");
    const resetPriceIn = document.getElementById("costResetPrice");
    const activationIn = document.getElementById("costActivation");
    const outBox = document.getElementById("costResult");
    if (!monthlyIn || !outBox) return;

    function update() {
      const m = Math.max(0, Number(monthlyIn.value) || 0);
      const d = Math.min(99, Math.max(0, Number(discountIn.value) || 0));
      const rCount = Math.max(0, Number(resetsIn.value) || 0);
      const rPrice = Math.max(0, Number(resetPriceIn.value) || 0);
      const act = Math.max(0, Number(activationIn.value) || 0);

      const discountedMonthly = m * (1 - d / 100);
      const totalResets = rCount * rPrice;
      const total = discountedMonthly + totalResets + act;
      const saved = m - discountedMonthly;

      outBox.innerHTML = `
        <div style="font-size:12.5px;color:var(--kz-muted)">${T("costTitle")}</div>
        <div class="calc-result-big mono" style="color:var(--kz-cyan)">$${total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
        <div style="font-size:13px;color:var(--kz-text2)">
          ${T("costBreakdown", { m: discountedMonthly.toFixed(1), saved: saved.toFixed(1), resets: totalResets.toFixed(0), act: act.toFixed(0) })}
        </div>
      `;
    }

    [monthlyIn, discountIn, resetsIn, resetPriceIn, activationIn].forEach((el) =>
      el.addEventListener("input", update)
    );
    window.addEventListener("kz:lang-change", update);
    update();
  }

  /* ---------- Index Page: Futures Position Size Calculator ---------- */
  function initPositionSizeCalc() {
    const instSel = document.getElementById("posInstrument");
    const riskIn = document.getElementById("posRisk");
    const slIn = document.getElementById("posSl");
    const unitSel = document.getElementById("posUnit");
    const specBadge = document.getElementById("posSpecBadge");
    const outBox = document.getElementById("posCalcResult");
    if (!instSel || !riskIn || !slIn || !unitSel || !outBox) return;

    const SPECS = {
      MNQ: { sym: "MNQ", pt: 2, tick: 0.5, tpp: 4, micro: null },
      NQ: { sym: "NQ", pt: 20, tick: 5, tpp: 4, micro: "MNQ" },
      MES: { sym: "MES", pt: 5, tick: 1.25, tpp: 4, micro: null },
      ES: { sym: "ES", pt: 50, tick: 12.5, tpp: 4, micro: "MES" },
      MGC: { sym: "MGC", pt: 10, tick: 1, tpp: 10, micro: null },
      GC: { sym: "GC", pt: 100, tick: 10, tpp: 10, micro: "MGC" },
      MCL: { sym: "MCL", pt: 100, tick: 1, tpp: 100, micro: null },
      CL: { sym: "CL", pt: 1000, tick: 10, tpp: 100, micro: "MCL" },
      MYM: { sym: "MYM", pt: 0.5, tick: 0.5, tpp: 1, micro: null },
      YM: { sym: "YM", pt: 5, tick: 5, tpp: 1, micro: "MYM" }
    };

    function fmtNum(n) {
      return Number.isInteger(n) ? n.toLocaleString() : Number(n.toFixed(2)).toLocaleString();
    }

    function update() {
      const sp = SPECS[instSel.value] || SPECS.MNQ;
      const risk = Math.max(0, Number(riskIn.value) || 0);
      const slVal = Math.max(0, Number(slIn.value) || 0);
      const unit = unitSel.value || "points";

      if (specBadge) {
        specBadge.textContent = T("posSpec", { sym: sp.sym, pt: sp.pt, tick: sp.tick, tpp: sp.tpp });
      }

      if (risk <= 0 || slVal <= 0) {
        outBox.innerHTML = `<div style="color:var(--kz-muted);font-size:13.5px">${T("posHint")}</div>`;
        return;
      }

      const slPoints = unit === "ticks" ? slVal / sp.tpp : slVal;
      const slTicks = unit === "ticks" ? slVal : slVal * sp.tpp;
      const riskPerContract = slPoints * sp.pt;
      const qty = Math.floor(risk / riskPerContract);
      const actualRisk = qty * riskPerContract;

      if (qty < 1) {
        const tipHtml = sp.micro
          ? T("posOversizeTip", { sym: sp.sym, perCt: fmtNum(riskPerContract), risk: fmtNum(risk), micro: sp.micro })
          : T("posOversizeTipMicro", { sym: sp.sym, perCt: fmtNum(riskPerContract), risk: fmtNum(risk) });
        outBox.innerHTML = `
          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap">
            <span style="font-size:12.5px;color:var(--kz-muted)">${T("posRecommended")} (${sp.sym})</span>
            <span class="tag tag-rose">${T("posOversizeBadge")}</span>
          </div>
          <div class="calc-result-big mono" style="color:var(--kz-rose)">0 ${T("posContractsUnit")}</div>
          <div style="font-size:13px;color:var(--kz-text2)">${tipHtml}</div>
        `;
        return;
      }

      outBox.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap">
          <span style="font-size:12.5px;color:var(--kz-muted)">${T("posRecommended")} (${sp.sym})</span>
          <span class="tag tag-green">${T("posSafeBadge")}</span>
        </div>
        <div class="calc-result-big mono" style="color:var(--kz-green)">${qty} <span style="font-size:16px;font-weight:700;color:var(--kz-strong)">${sp.sym} ${T("posContractsUnit")}</span></div>
        <div style="font-size:13px;color:var(--kz-text2)">
          ${T("posActualRisk", {
            qty,
            actual: fmtNum(actualRisk),
            pts: fmtNum(slPoints),
            ticks: fmtNum(slTicks),
            perCt: fmtNum(riskPerContract)
          })}
        </div>
      `;
    }

    [instSel, riskIn, slIn, unitSel].forEach((el) => el.addEventListener("input", update));
    instSel.addEventListener("change", update);
    unitSel.addEventListener("change", update);
    window.addEventListener("kz:lang-change", update);
    update();
  }

  /* ---------- Coupon Expiry Helper & Google Sheets Live Sync ---------- */
  function getExpiryMeta(coupon) {
    if (!coupon.expiresDate) {
      return { expired: false, label: coupon.expires || T("activeStatus") };
    }
    const end = new Date(coupon.expiresDate + "T23:59:59");
    if (isNaN(end.getTime())) {
      return { expired: false, label: coupon.expires || coupon.expiresDate };
    }
    const now = new Date();
    const diffMs = end.getTime() - now.getTime();
    if (diffMs < 0) {
      return { expired: true, label: T("expired") };
    }
    const daysLeft = Math.ceil(diffMs / 86400000);
    const suffix = daysLeft <= 3 ? T("daysLeftHot", { d: daysLeft }) : T("daysLeft", { d: daysLeft });
    return { expired: false, label: (coupon.expires || coupon.expiresDate) + suffix };
  }

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const next = text[i + 1];
      if (inQuotes) {
        if (ch === '"' && next === '"') {
          cur += '"';
          i++;
        } else if (ch === '"') {
          inQuotes = false;
        } else {
          cur += ch;
        }
      } else {
        if (ch === '"') {
          inQuotes = true;
        } else if (ch === ",") {
          row.push(cur.trim());
          cur = "";
        } else if (ch === "\n" || ch === "\r") {
          if (ch === "\r" && next === "\n") i++;
          row.push(cur.trim());
          if (row.some((cell) => cell !== "")) rows.push(row);
          row = [];
          cur = "";
        } else {
          cur += ch;
        }
      }
    }
    if (cur.length > 0 || row.length > 0) {
      row.push(cur.trim());
      if (row.some((cell) => cell !== "")) rows.push(row);
    }
    if (rows.length < 2) return [];
    const headers = rows[0].map((h) => h.replace(/^\uFEFF/, "").trim());
    return rows.slice(1).map((cols) => {
      const obj = {};
      headers.forEach((h, idx) => {
        obj[h] = cols[idx] !== undefined ? cols[idx] : "";
      });
      return {
        id: obj.id || (obj.firmId + "-" + obj.code),
        firmId: (obj.firmId || "").toLowerCase(),
        firmName: obj.firmName || obj.firmId || "",
        badge: obj.badge || "ƯU ĐÃI",
        code: obj.code || "",
        title: obj.title || "",
        description: obj.description || "",
        appliesTo: obj.appliesTo || "",
        expires: obj.expires || "",
        expiresDate: obj.expiresDate || "",
        note: obj.note || "",
        hot: /^(true|1|yes|x)$/i.test(obj.hot || ""),
        active: !/^(false|0|no)$/i.test(obj.active || "true"),
        autoApply: /^(true|1|yes|x)$/i.test(obj.autoApply || "")
      };
    });
  }

  let currentCouponFilter = "all";

  function syncCouponsFromSheet() {
    const csvUrl = (DATA.site.couponSheetCsvUrl || "").trim();
    if (!csvUrl) return;
    const sep = csvUrl.includes("?") ? "&" : "?";
    fetch(csvUrl + sep + "_t=" + Math.floor(Date.now() / 60000))
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error("HTTP " + res.status))))
      .then((csvText) => {
        const parsed = parseCsv(csvText);
        if (parsed.length > 0) {
          DATA.coupons = parsed;
          renderCouponCards("homeHotCoupons", "all", true);
          renderCouponCards("couponsPageGrid", currentCouponFilter, false);
        }
      })
      .catch(() => {
        // Giữ nguyên dữ liệu dự phòng trong data.js nếu không tải được Sheet
      });
  }

  /* ---------- Index Page: Preview Hot Coupons ---------- */
  function renderCouponCards(containerId, filterFirm, onlyHot) {
    const wrap = document.getElementById(containerId);
    if (!wrap) return;
    DATA = getData();

    const list = DATA.coupons.filter((c) => {
      if (!c.active) return false;
      if (getExpiryMeta(c).expired) return false;
      if (onlyHot && !c.hot) return false;
      if (filterFirm && filterFirm !== "all" && c.firmId !== filterFirm) return false;
      return true;
    });

    if (!list.length) {
      wrap.innerHTML = `<div class="card">${T("noCoupons")}</div>`;
      return;
    }

    wrap.innerHTML = list
      .map((c) => {
        const affUrl = DATA.site.affiliateLinks[c.firmId] || "#";
        const exp = getExpiryMeta(c);
        const tagClass =
          c.firmId === "bulenox" ? "tag-cyan" : c.firmId === "earn2trade" ? "tag-gold" : "tag-green";
        return `
        <article class="coupon-card ${c.hot ? "is-hot" : ""}">
          <div class="coupon-top">
            <span class="tag ${tagClass}">${c.firmName}</span>
            <span class="tag ${c.hot ? "tag-rose" : "tag-cyan"}">${c.hot ? "🔥 " : ""}${c.badge}</span>
          </div>
          <div>
            <h3 style="margin:0 0 6px;font-size:17px;font-weight:800;color:var(--kz-strong)">${c.title}</h3>
            <p style="margin:0;font-size:13.5px;color:var(--kz-text2)">${c.description}</p>
          </div>
          <div style="font-size:12px;color:var(--kz-muted)">
            <strong>${T("appliesTo")}</strong> ${c.appliesTo} • <strong>${T("expiresLabel")}</strong> ${exp.label}
          </div>
          <div class="coupon-code-box">
            <div>
              <div style="font-size:10.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--kz-muted)">${T("promoLabel")}</div>
              <div class="coupon-code-text mono">${c.code}</div>
            </div>
            ${
              c.autoApply
                ? `<span class="tag tag-green">${T("autoApply")}</span>`
                : `<button type="button" class="kz-cta kz-cta-ghost" data-copy-code="${c.code}" style="padding:8px 12px;font-size:12.5px">${T("copyBtn")}</button>`
            }
          </div>
          <div style="font-size:12px;color:var(--kz-muted)">💡 ${c.note}</div>
          <div class="coupon-actions">
            <a href="${affUrl}" target="_blank" rel="noopener noreferrer" class="kz-cta kz-cta-cyan" style="flex:1">
              ${T("openDeal", { firm: c.firmName })}
            </a>
          </div>
        </article>
      `;
      })
      .join("");

    wrap.querySelectorAll("[data-copy-code]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        copyText(btn.getAttribute("data-copy-code"));
        window.dispatchEvent(new CustomEvent("kz:sparkle", { detail: { x: e.clientX, y: e.clientY } }));
      });
    });

    if (containerId === "couponsPageGrid") {
      window.dispatchEvent(new CustomEvent("kz:coupons-rendered"));
    }
  }

  /* ---------- Coupons Page: Instant Above-the-Fold Simulator + Filter ---------- */
  function initCouponsPage() {
    const simWrap = document.getElementById("couponLiveShowcase");
    const simTabs = document.querySelectorAll("[data-coupon-sim-tab]");
    const filterWrap = document.getElementById("couponFilters");
    if (!simWrap && !filterWrap) return;

    const params = new URLSearchParams(window.location.search);
    const urlFirm = params.get("firm");
    let activeSimFirm = ["bulenox", "earn2trade", "topstep"].includes(urlFirm) ? urlFirm : "bulenox";
    let activeFilterFirm = ["all", "bulenox", "earn2trade", "topstep"].includes(urlFirm) ? urlFirm : "all";

    function renderCouponSim() {
      if (!simWrap) return;
      simWrap.innerHTML = renderFirmPricingShowcase(activeSimFirm);
      bindPricingShowcaseEvents(simWrap, renderCouponSim);
      simTabs.forEach((t) => t.classList.toggle("active", t.getAttribute("data-coupon-sim-tab") === activeSimFirm));
    }

    simTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        activeSimFirm = tab.getAttribute("data-coupon-sim-tab") || "bulenox";
        renderCouponSim();
        window.dispatchEvent(new CustomEvent("kz:price-roll"));
      });
    });

    function applyFilter(firm) {
      activeFilterFirm = firm;
      currentCouponFilter = firm;
      if (filterWrap) {
        filterWrap.querySelectorAll("[data-filter]").forEach((b) => {
          b.classList.toggle("active", b.getAttribute("data-filter") === firm);
        });
      }
      renderCouponCards("couponsPageGrid", activeFilterFirm, false);
    }

    if (filterWrap) {
      filterWrap.querySelectorAll("[data-filter]").forEach((btn) => {
        btn.addEventListener("click", () => applyFilter(btn.getAttribute("data-filter")));
      });
    }

    renderCouponSim();
    applyFilter(activeFilterFirm);
  }

  /* ---------- Boot ---------- */
  initTheme();
  initMenu();
  hydrateSiteLinks();
  renderComparisonTable();
  initFirmTabs();
  initConsistencyCalc();
  initTrueCostCalc();
  initPositionSizeCalc();
  renderCouponCards("homeHotCoupons", "all", true);
  initCouponsPage();
  syncCouponsFromSheet();

  /* ---------- Re-render All Dynamic Blocks on VI <-> EN Switch ---------- */
  window.addEventListener("kz:lang-change", () => {
    DATA = getData();
    renderComparisonTable();
    renderFirmExplorer();
    renderCouponCards("homeHotCoupons", "all", true);
    initCouponsPage();
  });
})();
