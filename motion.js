/* ============================================================================
   KENVINZONE PROP HUB — MOTION GRAPHIC & SCROLL CRAFT ENGINE
   - Composite-only animations (transform & opacity) for 60/120fps
   - Respects prefers-reduced-motion
   - Works with GSAP + ScrollTrigger (CDN) and gracefully falls back offline
   ============================================================================ */

(function () {
  const prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Scroll Progress Telemetry Beam + Chapter Rail HUD ---------- */
  function initScrollTelemetry() {
    const beam = document.getElementById("kzScrollBeam");
    const railLinks = Array.from(document.querySelectorAll("[data-chapter-link]"));
    const sections = railLinks
      .map((a) => {
        const id = a.getAttribute("data-chapter-link");
        const el = document.getElementById(id);
        return el ? { id, el, link: a } : null;
      })
      .filter(Boolean);

    let ticking = false;

    function update() {
      ticking = false;
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));

      if (beam) {
        beam.style.transform = `scaleX(${progress.toFixed(4)})`;
      }

      if (sections.length) {
        const probe = window.scrollY + window.innerHeight * 0.36;
        let activeId = sections[0].id;
        for (let i = 0; i < sections.length; i++) {
          if (sections[i].el.offsetTop <= probe) {
            activeId = sections[i].id;
          }
        }
        sections.forEach((s) => s.link.classList.toggle("active", s.id === activeId));
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  /* ---------- 2. Pointer Spotlight Effect (--mx, --my) ---------- */
  function initSpotlights() {
    if (prefersReduced) return;
    const selector = ".card, .coupon-card, .quick-firm-item, .trap-card, .aurora-banner, .clock-card";

    document.addEventListener(
      "pointermove",
      (e) => {
        const target = e.target && e.target.closest ? e.target.closest(selector) : null;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--mx", (e.clientX - rect.left).toFixed(1) + "px");
        target.style.setProperty("--my", (e.clientY - rect.top).toFixed(1) + "px");
      },
      { passive: true }
    );
  }

  /* ---------- 3. Bespoke Motion Graphic: Live Equity vs Trailing/EOD Drawdown ---------- */
  function initDrawdownCanvas() {
    const canvas = document.getElementById("kzDrawdownCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const modeBtns = document.querySelectorAll("[data-dd-demo]");
    let demoMode = "eod"; // "eod" or "intraday"
    let isVisible = true;
    let t = 0;
    let rafId = null;

    modeBtns.forEach((b) => {
      b.addEventListener("click", () => {
        demoMode = b.getAttribute("data-dd-demo") || "eod";
        modeBtns.forEach((x) => x.classList.toggle("active", x === b));
        t = 0.12;
      });
    });

    // Normalized price/equity path across a trading session (0..1)
    const points = [
      0.42, 0.46, 0.58, 0.74, 0.84, 0.79, 0.62, 0.52, 0.47, 0.55, 0.66, 0.76, 0.72, 0.81, 0.9
    ];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0) return;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function samplePath(u) {
      const idx = u * (points.length - 1);
      const i0 = Math.floor(idx);
      const i1 = Math.min(points.length - 1, i0 + 1);
      const f = idx - i0;
      return points[i0] + (points[i1] - points[i0]) * f;
    }

    function drawFrame() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w <= 0 || h <= 0) return;

      ctx.clearRect(0, 0, w, h);

      const padX = 14;
      const padY = 16;
      const plotW = w - padX * 2;
      const plotH = h - padY * 2;

      // Subtle horizontal grid lines
      ctx.strokeStyle = "rgba(143, 163, 191, 0.12)";
      ctx.lineWidth = 1;
      for (let g = 0; g <= 3; g++) {
        const y = padY + (plotH / 3) * g;
        ctx.beginPath();
        ctx.moveTo(padX, y);
        ctx.lineTo(w - padX, y);
        ctx.stroke();
      }

      const steps = 64;
      const progress = prefersReduced ? 1 : t;
      const maxStep = Math.max(2, Math.floor(steps * progress));

      // Compute equity & drawdown floor series
      let highWater = points[0];
      const eqCoords = [];
      const floorCoords = [];

      for (let i = 0; i <= maxStep; i++) {
        const u = i / steps;
        const val = samplePath(u);
        if (val > highWater) highWater = val;

        const x = padX + u * plotW;
        const yEq = padY + (1 - val) * plotH;

        // Intraday trails real-time highWater; EOD stays flat during session until close
        const floorVal =
          demoMode === "intraday"
            ? Math.max(0.14, highWater - 0.34)
            : u < 0.88
              ? 0.16
              : 0.34;
        const yFloor = padY + (1 - floorVal) * plotH;

        eqCoords.push({ x, y: yEq });
        floorCoords.push({ x, y: yFloor });
      }

      // Danger zone fill under drawdown floor
      ctx.beginPath();
      ctx.moveTo(floorCoords[0].x, h - padY);
      floorCoords.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.lineTo(floorCoords[floorCoords.length - 1].x, h - padY);
      ctx.closePath();
      ctx.fillStyle =
        demoMode === "intraday"
          ? "rgba(251, 113, 133, 0.14)"
          : "rgba(52, 211, 153, 0.10)";
      ctx.fill();

      // Drawdown Floor Line
      ctx.beginPath();
      floorCoords.forEach((p, idx) => (idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = demoMode === "intraday" ? "#FB7185" : "#34D399";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);

      // Equity area gradient
      const grad = ctx.createLinearGradient(0, padY, 0, h - padY);
      grad.addColorStop(0, "rgba(56, 213, 231, 0.28)");
      grad.addColorStop(1, "rgba(56, 213, 231, 0.0)");
      ctx.beginPath();
      ctx.moveTo(eqCoords[0].x, h - padY);
      eqCoords.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.lineTo(eqCoords[eqCoords.length - 1].x, h - padY);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Equity Curve Line
      ctx.beginPath();
      eqCoords.forEach((p, idx) => (idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.strokeStyle = "#38D5E7";
      ctx.lineWidth = 2.4;
      ctx.stroke();

      // Live glowing head dot
      const last = eqCoords[eqCoords.length - 1];
      ctx.beginPath();
      ctx.arc(last.x, last.y, 4.2, 0, Math.PI * 2);
      ctx.fillStyle = "#38D5E7";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(last.x, last.y, 9, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(56, 213, 231, 0.25)";
      ctx.fill();

      // Dynamic caption inside canvas (supports VI / EN live switch)
      const capIntraday =
        (window.KZ_LANG && window.KZ_LANG.t("ddCanvasIntraday")) ||
        "INTRADAY TRAILING: Sàn kéo lên theo cả lãi ảo!";
      const capEod =
        (window.KZ_LANG && window.KZ_LANG.t("ddCanvasEod")) ||
        "EOD DRAWDOWN: Sàn đứng yên suốt phiên, chỉ cập nhật cuối ngày";
      ctx.font = "700 11px 'JetBrains Mono', monospace";
      ctx.fillStyle = demoMode === "intraday" ? "#FB7185" : "#34D399";
      ctx.fillText(demoMode === "intraday" ? capIntraday : capEod, padX, 12);
    }

    function loop() {
      if (!isVisible) {
        rafId = null;
        return;
      }
      if (!prefersReduced) {
        t += 0.0042;
        if (t > 1.18) t = 0.04;
      }
      drawFrame();
      if (!prefersReduced) {
        rafId = requestAnimationFrame(loop);
      }
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          isVisible = entries[0].isIntersecting;
          if (isVisible && !rafId) loop();
        },
        { threshold: 0.05 }
      );
      io.observe(canvas);
    }

    loop();
  }

  /* ---------- 3B. Hero Cinematic 3D Trading Chart Background (Pipcy-Inspired, 60fps Canvas) ---------- */
  function initHeroFlowCanvas() {
    const canvas = document.getElementById("kzHeroFlowCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let visible = true;
    let rafId = null;
    let time = 0;

    // Pre-generate deterministic candlestick sequence for smooth infinite loop
    const candleCount = 46;
    const candles = [];
    let price = 0.28;
    for (let i = 0; i < candleCount; i++) {
      const wave = Math.sin(i * 0.42) * 0.055 + Math.cos(i * 0.19) * 0.035;
      const drift = 0.011;
      const delta = drift + wave * 0.48 + ((i % 5 === 0 ? -0.048 : 0.024));
      const open = price;
      const close = Math.min(0.86, Math.max(0.14, open + delta));
      const high = Math.min(0.93, Math.max(open, close) + 0.025 + ((i * 7) % 5) * 0.011);
      const low = Math.max(0.08, Math.min(open, close) - 0.022 - ((i * 3) % 4) * 0.01);
      candles.push({ open, close, high, low, bull: close >= open });
      price = close;
      if (price > 0.78) price -= 0.24;
    }

    // Upward zig-zag growth trendline anchor points (normalized 0..1)
    const trendPts = [
      { x: 0.06, y: 0.78 },
      { x: 0.21, y: 0.63 },
      { x: 0.31, y: 0.69 },
      { x: 0.48, y: 0.49 },
      { x: 0.59, y: 0.56 },
      { x: 0.77, y: 0.31 },
      { x: 0.89, y: 0.21 }
    ];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w <= 0 || h <= 0) return;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawScene() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w <= 0 || h <= 0) return;

      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      ctx.clearRect(0, 0, w, h);

      // Slow cinematic camera pan & gentle breath zoom (~1.5% motion)
      const camZoom = 1.02 + Math.sin(time * 0.22) * 0.018;
      const camPanX = Math.sin(time * 0.18) * 18;
      const camPanY = Math.cos(time * 0.14) * 8;

      ctx.save();
      ctx.translate(w * 0.5 + camPanX, h * 0.5 + camPanY);
      ctx.scale(camZoom, camZoom);
      ctx.rotate(-0.022);
      ctx.translate(-w * 0.5, -h * 0.5);

      // 1. Perspective coordinate chart grid (48px base with slow horizontal scroll)
      const gridStep = 48;
      const scrollX = (time * 10) % gridStep;
      ctx.strokeStyle = isLight ? "rgba(11, 138, 163, 0.065)" : "rgba(56, 213, 231, 0.055)";
      ctx.lineWidth = 1;
      for (let x = -gridStep; x < w + gridStep * 2; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x - scrollX, -40);
        ctx.lineTo(x - scrollX - 24, h + 40);
        ctx.stroke();
      }
      for (let y = 0; y < h + gridStep; y += gridStep) {
        ctx.beginPath();
        ctx.moveTo(-40, y);
        ctx.lineTo(w + 40, y);
        ctx.stroke();
      }

      // 2. Soft atmospheric background typography (depth-of-field watermark like Pipcy)
      ctx.save();
      ctx.font = "800 " + Math.max(28, Math.min(58, Math.round(w * 0.042))) + "px 'JetBrains Mono', monospace";
      ctx.fillStyle = isLight ? "rgba(11, 138, 163, 0.045)" : "rgba(52, 211, 153, 0.045)";
      ctx.fillText("FUNDED CAPITAL", w * 0.54 - (time * 4) % 90, h * 0.27);
      ctx.fillStyle = isLight ? "rgba(180, 108, 0, 0.04)" : "rgba(56, 213, 231, 0.04)";
      ctx.fillText("CME FUTURES", w * 0.08 + (time * 3) % 70, h * 0.86);
      ctx.restore();

      // 3. Looping translucent glowing candlestick bars
      const spacing = Math.max(26, w / 28);
      const totalLoopW = candleCount * spacing;
      const candleShift = (time * 16) % totalLoopW;
      const chartTop = h * 0.14;
      const chartH = h * 0.74;

      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < candleCount; i++) {
          const c = candles[i];
          const x = i * spacing - candleShift + pass * totalLoopW;
          if (x < -spacing || x > w + spacing) continue;

          const yHigh = chartTop + (1 - c.high) * chartH;
          const yLow = chartTop + (1 - c.low) * chartH;
          const yOpen = chartTop + (1 - c.open) * chartH;
          const yClose = chartTop + (1 - c.close) * chartH;
          const bodyTop = Math.min(yOpen, yClose);
          const bodyH = Math.max(5, Math.abs(yClose - yOpen));
          const bodyW = Math.max(8, spacing * 0.44);

          const isCyan = i % 3 === 0;
          const bullColor = isLight
            ? isCyan
              ? "rgba(11, 138, 163, 0.15)"
              : "rgba(5, 135, 95, 0.14)"
            : isCyan
              ? "rgba(56, 213, 231, 0.18)"
              : "rgba(52, 211, 153, 0.22)";
          const bearColor = isLight ? "rgba(209, 44, 86, 0.08)" : "rgba(251, 113, 133, 0.11)";
          const wickColor = c.bull
            ? isLight
              ? "rgba(5, 135, 95, 0.18)"
              : "rgba(52, 211, 153, 0.30)"
            : isLight
              ? "rgba(209, 44, 86, 0.10)"
              : "rgba(251, 113, 133, 0.16)";

          // Wick
          ctx.beginPath();
          ctx.moveTo(x, yHigh);
          ctx.lineTo(x, yLow);
          ctx.strokeStyle = wickColor;
          ctx.lineWidth = 1.4;
          ctx.stroke();

          // Candle body with subtle top highlight
          ctx.fillStyle = c.bull ? bullColor : bearColor;
          ctx.fillRect(x - bodyW / 2, bodyTop, bodyW, bodyH);
          ctx.strokeStyle = wickColor;
          ctx.lineWidth = 0.8;
          ctx.strokeRect(x - bodyW / 2, bodyTop, bodyW, bodyH);
        }
      }

      // 4. Luminous upward zig-zag growth trendline + glowing arrowhead
      const pulse = 0.72 + Math.sin(time * 1.4) * 0.28;
      const pts = trendPts.map((p, idx) => ({
        x: p.x * w,
        y: p.y * h + Math.sin(time * 0.7 + idx * 0.8) * 5
      }));

      // Soft area fill under trendline
      const areaGrad = ctx.createLinearGradient(0, h * 0.18, 0, h * 0.92);
      if (isLight) {
        areaGrad.addColorStop(0, "rgba(11, 138, 163, 0.12)");
        areaGrad.addColorStop(1, "rgba(11, 138, 163, 0)");
      } else {
        areaGrad.addColorStop(0, "rgba(52, 211, 153, 0.18)");
        areaGrad.addColorStop(0.55, "rgba(56, 213, 231, 0.06)");
        areaGrad.addColorStop(1, "rgba(56, 213, 231, 0)");
      }
      ctx.beginPath();
      ctx.moveTo(pts[0].x, h);
      pts.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.lineTo(pts[pts.length - 1].x, h);
      ctx.closePath();
      ctx.fillStyle = areaGrad;
      ctx.fill();

      // Trendline stroke with glow
      const lineGrad = ctx.createLinearGradient(pts[0].x, pts[0].y, pts[pts.length - 1].x, pts[pts.length - 1].y);
      lineGrad.addColorStop(0, isLight ? "rgba(11, 138, 163, 0.25)" : "rgba(56, 213, 231, 0.35)");
      lineGrad.addColorStop(0.55, isLight ? "rgba(5, 135, 95, 0.45)" : "rgba(52, 211, 153, 0.68)");
      lineGrad.addColorStop(1, isLight ? "rgba(180, 108, 0, 0.50)" : "rgba(243, 190, 98, 0.82)");

      ctx.save();
      ctx.shadowColor = isLight ? "rgba(5, 135, 95, 0.25)" : "rgba(52, 211, 153, 0.55)";
      ctx.shadowBlur = isLight ? 8 : 16;
      ctx.beginPath();
      pts.forEach((p, idx) => (idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 2.4;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.stroke();

      // Arrowhead at the peak
      const tip = pts[pts.length - 1];
      const prev = pts[pts.length - 2];
      const ang = Math.atan2(tip.y - prev.y, tip.x - prev.x);
      const headLen = 13;
      ctx.beginPath();
      ctx.moveTo(tip.x, tip.y);
      ctx.lineTo(tip.x - headLen * Math.cos(ang - 0.45), tip.y - headLen * Math.sin(ang - 0.45));
      ctx.moveTo(tip.x, tip.y);
      ctx.lineTo(tip.x - headLen * Math.cos(ang + 0.45), tip.y - headLen * Math.sin(ang + 0.45));
      ctx.strokeStyle = isLight ? "rgba(180, 108, 0, 0.62)" : `rgba(243, 190, 98, ${(0.72 * pulse + 0.22).toFixed(2)})`;
      ctx.lineWidth = 2.4;
      ctx.stroke();

      // Pulsing beacon halo at arrowhead
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 6 + pulse * 5, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? "rgba(180, 108, 0, 0.14)" : `rgba(243, 190, 98, ${(0.22 * pulse).toFixed(2)})`;
      ctx.fill();
      ctx.restore();

      ctx.restore();
    }

    function tick() {
      if (!visible) {
        rafId = null;
        return;
      }
      if (!prefersReduced) {
        time += 0.016;
      }
      drawScene();
      if (!prefersReduced) {
        rafId = requestAnimationFrame(tick);
      }
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    // Re-draw immediately on theme toggle when reduced-motion is active
    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => requestAnimationFrame(drawScene));
    }

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          visible = entries[0].isIntersecting;
          if (visible && !rafId) tick();
        },
        { threshold: 0.02 }
      );
      io.observe(canvas);
    }
    tick();
  }

  /* ---------- 3B-2. Cursor-Following Ambient Glow Orb (Pipcy Pricing-Section Effect) ---------- */
  function initCursorOrbs() {
    if (prefersReduced || window.innerWidth < 900) return;
    const targets = document.querySelectorAll("#chi-tiet-quy, #cong-cu, #so-sanh-dong-tk, #couponLiveShowcase");
    targets.forEach((sec) => {
      sec.classList.add("kz-orb-host");
      const orb = document.createElement("div");
      orb.className = "kz-cursor-orb";
      orb.setAttribute("aria-hidden", "true");
      sec.insertBefore(orb, sec.firstChild);

      let raf = null;
      let gx = 0;
      let gy = 0;

      sec.addEventListener(
        "pointermove",
        (e) => {
          const r = sec.getBoundingClientRect();
          gx = e.clientX - r.left;
          gy = e.clientY - r.top;
          orb.classList.add("is-active");
          if (!raf) {
            raf = requestAnimationFrame(() => {
              orb.style.transform = `translate3d(${(gx - 210).toFixed(1)}px, ${(gy - 210).toFixed(1)}px, 0)`;
              raf = null;
            });
          }
        },
        { passive: true }
      );

      sec.addEventListener(
        "pointerleave",
        () => {
          orb.classList.remove("is-active");
        },
        { passive: true }
      );
    });
  }

  /* ---------- 3C. 3D Perspective Tilt on Pricing & Coupon Cards ---------- */
  function init3DTilt() {
    if (prefersReduced || window.innerWidth < 900) return;
    const sel = "[data-tilt-card], .coupon-card";

    document.addEventListener(
      "pointermove",
      (e) => {
        const card = e.target && e.target.closest ? e.target.closest(sel) : null;
        if (!card) return;
        const r = card.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-ny * 5.5).toFixed(2)}deg) rotateY(${(nx * 6.5).toFixed(2)}deg) translateY(-3px)`;
      },
      { passive: true }
    );

    document.addEventListener(
      "pointerout",
      (e) => {
        const card = e.target && e.target.closest ? e.target.closest(sel) : null;
        if (!card) return;
        if (!card.contains(e.relatedTarget)) {
          card.style.transform = "";
        }
      },
      { passive: true }
    );
  }

  /* ---------- 3D. Kinetic Price Roll-Down & Micro-Sparkle Burst ---------- */
  function initPriceRollAndSparkles() {
    window.addEventListener("kz:price-roll", () => {
      if (prefersReduced) return;
      const nodes = document.querySelectorAll("[data-roll-price]");
      nodes.forEach((el) => {
        const target = parseFloat(el.getAttribute("data-roll-price") || "0");
        const orig = parseFloat(el.getAttribute("data-orig-price") || String(target));
        const start = target < orig ? orig : target * 0.82;
        if (typeof window.gsap !== "undefined") {
          const obj = { val: start };
          window.gsap.to(obj, {
            val: target,
            duration: 0.55,
            ease: "power3.out",
            onUpdate: () => {
              el.textContent = "$" + obj.val.toFixed(2);
            }
          });
          window.gsap.fromTo(
            el,
            { scale: 1.12 },
            { scale: 1, duration: 0.45, ease: "back.out(2)", clearProps: "transform" }
          );
        }
      });
    });

    window.addEventListener("kz:sparkle", (e) => {
      if (prefersReduced) return;
      const cx = (e.detail && e.detail.x) || window.innerWidth / 2;
      const cy = (e.detail && e.detail.y) || window.innerHeight / 2;
      const colors = ["#38D5E7", "#F3BE62", "#34D399", "#FFFFFF"];

      for (let i = 0; i < 14; i++) {
        const dot = document.createElement("span");
        dot.className = "kz-sparkle";
        dot.style.left = cx + "px";
        dot.style.top = cy + "px";
        dot.style.background = colors[i % colors.length];
        document.body.appendChild(dot);

        const angle = (Math.PI * 2 * i) / 14 + (Math.random() - 0.5) * 0.4;
        const dist = 32 + Math.random() * 44;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist - 12;

        requestAnimationFrame(() => {
          dot.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) scale(0)`;
          dot.style.opacity = "0";
        });

        setTimeout(() => dot.remove(), 620);
      }
    });
  }

  /* ---------- 4. GSAP Scroll Craft Choreography (with Safe Fallback) ---------- */
  function initScrollCraft() {
    if (prefersReduced) return;

    const hasGSAP = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

    if (hasGSAP) {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Hero Entrance Timeline (above the fold)
      const heroEls = document.querySelectorAll(".hero-eyebrow, .hero h1, .hero-desc, .hero-actions, .hero-meta");
      if (heroEls.length) {
        gsap.from(heroEls, {
          y: 24,
          opacity: 0,
          duration: 0.72,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform,opacity"
        });
      }

      const heroPanel = document.querySelector(".hero-panel");
      if (heroPanel) {
        gsap.from(heroPanel, {
          y: 28,
          scale: 0.97,
          opacity: 0,
          duration: 0.85,
          delay: 0.16,
          ease: "power3.out",
          clearProps: "transform,opacity"
        });
      }

      // Dimensional Parallax on Aurora Ambient Orbs
      document.querySelectorAll(".kz-aurora").forEach((orb) => {
        gsap.to(orb, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: orb.parentElement,
            start: "top top",
            end: "bottom top",
            scrub: 0.8
          }
        });
      });

      // Section Head Reveals
      document.querySelectorAll(".section-head").forEach((head) => {
        gsap.from(head.children, {
          y: 22,
          opacity: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: head,
            start: "top 86%",
            once: true
          }
        });
      });

      // Cards & Clocks Stagger per Section
      document.querySelectorAll(".calc-grid, .clock-strip, .coupon-grid").forEach((grid) => {
        const items = grid.children;
        if (!items.length) return;
        gsap.from(items, {
          y: 26,
          opacity: 0,
          duration: 0.65,
          stagger: 0.09,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: grid,
            start: "top 86%",
            once: true
          }
        });
      });

      // Aurora Peak Banner Reveal
      document.querySelectorAll(".aurora-banner").forEach((banner) => {
        gsap.from(banner, {
          y: 34,
          scale: 0.98,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: banner,
            start: "top 85%",
            once: true
          }
        });
      });

      // Smooth re-animation when switching Firm Tabs or Coupon Filters
      window.addEventListener("kz:firm-rendered", () => {
        const panel = document.querySelector("#firmExplorerContent .card");
        if (!panel) return;
        gsap.fromTo(
          panel,
          { y: 14, opacity: 0.35 },
          { y: 0, opacity: 1, duration: 0.42, ease: "power2.out", clearProps: "transform,opacity" }
        );
        const tiles = panel.querySelectorAll(".meta-tile, .trap-card");
        if (tiles.length) {
          gsap.fromTo(
            tiles,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.38, stagger: 0.04, ease: "power2.out", clearProps: "transform,opacity" }
          );
        }
      });

      window.addEventListener("kz:coupons-rendered", () => {
        const cards = document.querySelectorAll("#couponsPageGrid .coupon-card");
        if (!cards.length) return;
        gsap.fromTo(
          cards,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.38, stagger: 0.05, ease: "power2.out", clearProps: "transform,opacity" }
        );
      });
    } else if ("IntersectionObserver" in window) {
      // Lightweight Offline Fallback
      const targets = document.querySelectorAll(".section, .aurora-banner");
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("kz-in-view");
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.08 }
      );
      targets.forEach((el) => io.observe(el));
    }
  }

  /* ---------- Boot ---------- */
  function bootAll() {
    initScrollTelemetry();
    initSpotlights();
    initHeroFlowCanvas();
    initCursorOrbs();
    initDrawdownCanvas();
    init3DTilt();
    initPriceRollAndSparkles();
    initScrollCraft();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootAll);
  } else {
    bootAll();
  }
})();
