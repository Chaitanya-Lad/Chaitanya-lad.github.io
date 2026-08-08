/* =============================================================================
   CHAITANYA LAD — main.js
   Signature signal canvas · custom cursor · magnetic · smooth scroll ·
   reveals · nav · mobile menu · theme engine · hero mask · project preview
   All GPU-only motion, IO-driven, reduced-motion aware, no scroll-reflow.
   ============================================================================= */

const doc = document.documentElement;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = matchMedia("(pointer: fine)");
const prefersReduced = () => reduceMotion.matches;

/* ----------------------------------------------------------- failsafes --- */
/* Reveals are hidden via html.js. If anything throws before the observers
   attach — or a browser never fires them — force everything visible so content
   can never be trapped. Progressive enhancement, not a dependency.           */
const revealAllNow = () => {
  document.querySelectorAll("[data-reveal], [data-reveal-stagger]").forEach((el) => el.classList.add("is-in"));
  document.querySelectorAll(".hero__title .line > span").forEach((s) => (s.style.transform = "none"));
};
window.addEventListener("error", revealAllNow);
// If the reveal observer hasn't taken over shortly after load, reveal anyway.
window.addEventListener("load", () => setTimeout(() => {
  const hero = document.querySelector(".hero__lead");
  if (hero && getComputedStyle(hero).opacity === "0") revealAllNow();
}, 1200));

/* ------------------------------------------------------------------ utils -- */
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);

/* ============================================================ THEME ENGINE = */
(() => {
  const toggle = document.getElementById("themeToggle");
  const wipe = document.querySelector(".theme-wipe");
  if (!toggle) return;

  const current = () => doc.getAttribute("data-theme") || "dark";
  const syncLabel = () => {
    const next = current() === "dark" ? "light" : "dark";
    toggle.setAttribute("aria-label", `Switch to ${next} theme`);
  };
  syncLabel();

  const apply = (theme) => {
    doc.setAttribute("data-theme", theme);
    try { localStorage.setItem("cl-theme", theme); } catch (e) {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0b0c09" : "#f2eee4");
    syncLabel();
  };

  on(toggle, "click", (e) => {
    const next = current() === "dark" ? "light" : "dark";

    if (prefersReduced() || !wipe) { apply(next); return; }

    // Circular reveal from the toggle's centre. The overlay paints the *incoming*
    // background, then we swap the theme under it and let it dissolve.
    const r = toggle.getBoundingClientRect();
    const x = ((r.left + r.width / 2) / innerWidth) * 100;
    const y = ((r.top + r.height / 2) / innerHeight) * 100;
    wipe.style.setProperty("--wx", x + "%");
    wipe.style.setProperty("--wy", y + "%");
    // paint target bg by reading the token from a temp element
    const probe = document.createElement("div");
    probe.setAttribute("data-theme", next);
    probe.style.cssText = "position:fixed;visibility:hidden";
    document.body.appendChild(probe);
    wipe.style.background = getComputedStyle(probe).getPropertyValue("--bg");
    probe.remove();

    wipe.setAttribute("data-active", "true");
    apply(next);
    const done = () => { wipe.removeAttribute("data-active"); wipe.removeEventListener("animationend", done); };
    wipe.addEventListener("animationend", done);
  });
})();

/* ========================================================= NAV BEHAVIOUR == */
(() => {
  const nav = document.querySelector(".nav");
  if (!nav) return;
  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    nav.setAttribute("data-scrolled", y > 24 ? "true" : "false");
    // hide on scroll-down past hero, reveal on scroll-up
    if (y > 520 && y > lastY + 4) nav.setAttribute("data-hidden", "true");
    else if (y < lastY - 4 || y < 520) nav.setAttribute("data-hidden", "false");
    lastY = y;
    ticking = false;
  };
  on(window, "scroll", () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();

/* ==================================================== ACTIVE SECTION NAV == */
(() => {
  const links = [...document.querySelectorAll(".nav__link")];
  if (!links.length) return;
  const map = new Map();
  links.forEach((l) => {
    const id = l.getAttribute("href").slice(1);
    const sec = document.getElementById(id);
    if (sec) map.set(sec, l);
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const link = map.get(en.target);
      if (!link) return;
      if (en.isIntersecting) {
        links.forEach((l) => l.removeAttribute("aria-current"));
        link.setAttribute("aria-current", "true");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
  map.forEach((_, sec) => io.observe(sec));
})();

/* ========================================================= MOBILE MENU === */
(() => {
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  const setOpen = (open) => {
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.setAttribute("data-open", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  on(btn, "click", () => setOpen(btn.getAttribute("aria-expanded") !== "true"));
  menu.querySelectorAll("a").forEach((a) => on(a, "click", () => setOpen(false)));
  on(document, "keydown", (e) => { if (e.key === "Escape") setOpen(false); });
})();

/* ===================================================== SMOOTH ANCHOR NAV = */
(() => {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    on(a, "click", (e) => {
      const id = a.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth", block: "start" });
      history.pushState(null, "", id);
    });
  });
})();

/* ======================================================== SCROLL REVEALS = */
(() => {
  const items = document.querySelectorAll("[data-reveal], [data-reveal-stagger]");
  if (!items.length) return;
  if (prefersReduced()) { items.forEach((el) => el.classList.add("is-in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
  items.forEach((el) => io.observe(el));
})();

/* ===================================================== HERO MASK REVEAL === */
(() => {
  const spans = document.querySelectorAll(".hero__title .line > span");
  if (!spans.length) return;
  if (prefersReduced()) { spans.forEach((s) => (s.style.transform = "none")); return; }
  spans.forEach((s, i) => {
    s.style.transition = "transform 1s cubic-bezier(.16,1,.3,1)";
    s.style.transitionDelay = 120 + i * 90 + "ms";
  });
  requestAnimationFrame(() => requestAnimationFrame(() => {
    spans.forEach((s) => (s.style.transform = "translateY(0)"));
  }));
})();

/* =========================================================== MAGNETIC ==== */
(() => {
  if (!finePointer.matches || prefersReduced()) return;
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    const strength = 0.32;
    let raf = null, tx = 0, ty = 0, cx = 0, cy = 0;
    const render = () => {
      cx = lerp(cx, tx, 0.2); cy = lerp(cy, ty, 0.2);
      el.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
      if (Math.abs(cx - tx) > 0.1 || Math.abs(cy - ty) > 0.1) raf = requestAnimationFrame(render);
      else raf = null;
    };
    on(el, "pointermove", (e) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * strength;
      ty = (e.clientY - (r.top + r.height / 2)) * strength;
      if (!raf) raf = requestAnimationFrame(render);
    });
    on(el, "pointerleave", () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(render); });
  });
})();

/* ======================================================== CUSTOM CURSOR == */
(() => {
  if (!finePointer.matches || prefersReduced()) return;
  const ring = document.querySelector(".cursor");
  const dot = document.querySelector(".cursor-dot");
  const label = ring && ring.querySelector(".cursor__label");
  if (!ring || !dot) return;

  document.body.setAttribute("data-cursor", "on");
  let mx = innerWidth / 2, my = innerHeight / 2;
  let rx = mx, ry = my;
  let visible = false;

  on(window, "pointermove", (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px)`;
    if (!visible) { visible = true; ring.removeAttribute("data-hidden"); dot.removeAttribute("data-hidden"); }
  }, { passive: true });

  on(document, "pointerleave", () => { ring.setAttribute("data-hidden", "true"); dot.setAttribute("data-hidden", "true"); visible = false; });
  on(window, "blur", () => { ring.setAttribute("data-hidden", "true"); dot.setAttribute("data-hidden", "true"); });

  const tick = () => {
    rx = lerp(rx, mx, 0.18); ry = lerp(ry, my, 0.18);
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  // Interactive targets set the cursor variant + label
  const LABELS = { view: "View", open: "Open ↗", drag: "Drag", link: "" };
  const bind = (el) => {
    const variant = el.getAttribute("data-cursor");
    on(el, "pointerenter", () => {
      ring.setAttribute("data-variant", variant);
      if (label) label.textContent = LABELS[variant] || "";
    });
    on(el, "pointerleave", () => { ring.removeAttribute("data-variant"); if (label) label.textContent = ""; });
  };
  document.querySelectorAll("[data-cursor]").forEach(bind);

  // generic interactive elements → subtle "link" grow
  document.querySelectorAll("a:not([data-cursor]):not([data-cursor-plain]), button:not([data-cursor])").forEach((el) => {
    on(el, "pointerenter", () => ring.setAttribute("data-variant", "link"));
    on(el, "pointerleave", () => ring.removeAttribute("data-variant"));
  });
})();

/* =================================================== PROJECT HOVER PREVIEW = */
(() => {
  if (!finePointer.matches || prefersReduced()) return;
  const preview = document.getElementById("projPreview");
  const items = document.querySelectorAll("[data-preview]");
  if (!preview || !items.length) return;

  // Build lightweight canvas-free "signal card" panels per project — each a
  // distinct mini-trace so the preview reads as instrument telemetry, not a stock image.
  const PANELS = {
    esr:      { tint: "var(--signal)", cap: "ESR · inflammation readout", freq: 2.4, spike: true },
    docker:   { tint: "var(--ink)",    cap: "12 containers · uptime nominal", freq: 1.0, spike: false },
    commerce: { tint: "var(--ink)",    cap: "orders → fulfilment pipeline", freq: 1.6, spike: false },
    iot:      { tint: "var(--signal)", cap: "device mesh · voice-linked", freq: 3.0, spike: true },
  };
  const NS = "http://www.w3.org/2000/svg";
  Object.entries(PANELS).forEach(([key, cfg]) => {
    const panel = document.createElement("div");
    panel.className = "proj-preview__panel";
    panel.dataset.key = key;
    panel.style.cssText = "background:var(--surface);flex-direction:column;gap:.9rem";
    // mini trace
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 200 80");
    svg.setAttribute("width", "78%");
    const path = document.createElementNS(NS, "path");
    let d = "M0 40";
    for (let x = 0; x <= 200; x += 4) {
      let y = 40 + Math.sin((x / 200) * Math.PI * 2 * cfg.freq) * 9;
      if (cfg.spike && x > 96 && x < 112) y = 40 - (x < 104 ? (x - 96) * 3.4 : (112 - x) * 3.4);
      d += ` L${x} ${y.toFixed(1)}`;
    }
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", cfg.tint);
    path.setAttribute("stroke-width", "2");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path);
    const cap = document.createElement("span");
    cap.className = "readout readout--signal";
    cap.textContent = cfg.cap;
    panel.append(svg, cap);
    preview.appendChild(panel);
  });

  let mx = 0, my = 0, px = 0, py = 0, active = false, raf = null;
  const tick = () => {
    px = lerp(px, mx, 0.16); py = lerp(py, my, 0.16);
    preview.style.transform = `translate(${px}px, ${py}px) translate(-50%,-50%) scale(${active ? 1 : 0.85})`;
    if (active || Math.abs(px - mx) > 0.5) raf = requestAnimationFrame(tick);
    else raf = null;
  };

  items.forEach((item) => {
    const key = item.getAttribute("data-preview");
    on(item, "pointerenter", () => {
      active = true;
      preview.setAttribute("data-show", "true");
      preview.querySelectorAll(".proj-preview__panel").forEach((p) =>
        p.setAttribute("data-active", String(p.dataset.key === key)));
      if (!raf) raf = requestAnimationFrame(tick);
    });
    on(item, "pointermove", (e) => { mx = e.clientX + 26; my = e.clientY - 10; if (!raf) raf = requestAnimationFrame(tick); });
    on(item, "pointerleave", () => { active = false; preview.setAttribute("data-show", "false"); });
  });
})();

/* ================================================= SIGNATURE SIGNAL CANVAS = */
/* An oscilloscope trace behind the hero. It reads "raw" — a live, drifting
   waveform with an ECG-like QRS spike — and locks toward the cursor's X,
   dropping its noise as the visitor engages. Pauses when off-screen.        */
(() => {
  const canvas = document.getElementById("signal");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: true });
  let W = 0, H = 0, dpr = 1;
  let raf = null, running = false;
  let t = 0;
  let pointerX = 0.5, targetLock = 0.35, lock = 0.35; // rest ~clean; cursor pushes toward 1
  let mouseActive = false, lastMove = 0;

  const css = (name) => getComputedStyle(doc).getPropertyValue(name).trim();
  let strokeBright, strokeSoft, gridLine;
  const readColors = () => {
    strokeBright = css("--signal-bright") || "#26b24f";
    strokeSoft = css("--signal-line") || "rgba(38,178,79,.3)";
    gridLine = css("--line") || "rgba(0,0,0,.1)";
  };
  readColors();

  const resize = () => {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  on(window, "resize", resize, { passive: true });

  // deterministic pseudo-noise in [0,1) (no allocations in loop)
  const noise = (x) => { const v = Math.sin(x * 12.9898) * 43758.5453; return v - Math.floor(v); };

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    if (W === 0) { raf = requestAnimationFrame(draw); return; }

    // lock eases toward target (cursor engaged → cleaner)
    lock = lerp(lock, targetLock, 0.04);

    const baseline = H * 0.52;
    const amp = H * 0.085;
    const cols = Math.max(60, Math.floor(W / 6));
    const scanX = (0.5 + pointerX * 0.5); // where the "beam" focuses

    // faint moving graticule tick that follows the beam
    ctx.save();
    ctx.strokeStyle = gridLine;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.6;
    const beam = scanX * W;
    ctx.beginPath(); ctx.moveTo(beam, H * 0.2); ctx.lineTo(beam, H * 0.84); ctx.stroke();
    ctx.restore();

    // ---- the trace ----
    const buildTrace = (phase, ampMul, alpha, width) => {
      ctx.beginPath();
      for (let i = 0; i <= cols; i++) {
        const x = (i / cols) * W;
        const u = i / cols;
        // base carrier — the "clean" signal, always present
        let y = Math.sin(u * Math.PI * 2 * 3 + t * 1.4 + phase) * 0.5;
        y += Math.sin(u * Math.PI * 2 * 7 - t * 0.9 + phase) * 0.16;
        // raw noise: gentle drift at rest, fades further as we lock in
        const rawN = (noise(i * 1.3 + Math.floor(t * 2.2)) - 0.5) * 2;
        y += rawN * (1 - lock) * 0.16;
        // ECG-style QRS spike near the beam, sharper when locked
        const dx = u - scanX;
        const spike = Math.exp(-(dx * dx) / 0.0011) * (0.55 + lock * 1.1);
        y -= spike;
        const yy = baseline + y * amp * ampMul;
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = width > 1.4 ? strokeBright : strokeSoft;
      ctx.lineWidth = width;
      ctx.lineJoin = "round";
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    // echo/ghost traces for depth
    buildTrace(0.6, 1.5, 0.08 + lock * 0.05, 1);
    buildTrace(0.0, 1.0, 0.66 + lock * 0.24, 1.7);

    // glowing beam head dot
    const headU = ((t * 0.12) % 1);
    const hx = headU * W;
    let hy = baseline + (Math.sin(headU * Math.PI * 2 * 3 + t * 1.4) * 0.5) * amp;
    ctx.beginPath();
    ctx.fillStyle = strokeBright;
    ctx.shadowColor = strokeBright;
    ctx.shadowBlur = 14;
    ctx.arc(hx, hy, 2.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    t += 0.016;
    // decay engagement back toward the calm resting state
    if (mouseActive && performance.now() - lastMove > 1200) { mouseActive = false; targetLock = 0.35; }
    raf = requestAnimationFrame(draw);
  };

  const start = () => { if (running) return; running = true; readColors(); raf = requestAnimationFrame(draw); };
  const stop = () => { running = false; if (raf) cancelAnimationFrame(raf); raf = null; };

  on(window, "pointermove", (e) => {
    pointerX = clamp(e.clientX / innerWidth, 0, 1);
    mouseActive = true; lastMove = performance.now(); targetLock = 1;
  }, { passive: true });

  // pause when hero scrolled away
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => (en.isIntersecting ? start() : stop()));
  }, { threshold: 0.02 });
  io.observe(canvas);

  // repaint colours on theme change
  new MutationObserver(readColors).observe(doc, { attributes: true, attributeFilter: ["data-theme"] });

  if (prefersReduced()) {
    // static single-frame trace, no animation
    resize(); targetLock = 1; lock = 1; t = 1.2; draw(); stop();
  } else {
    start();
  }
})();

/* ============================================================ TILT (soft) = */
(() => {
  if (!finePointer.matches || prefersReduced()) return;
  document.querySelectorAll("[data-tilt]").forEach((el) => {
    let raf = null;
    on(el, "pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg)`;
        raf = null;
      });
    });
    on(el, "pointerleave", () => { el.style.transform = "perspective(900px) rotateX(0) rotateY(0)"; });
  });
})();

/* Signal ready — reveal any late no-JS fallbacks if needed */
doc.classList.add("js-ready");
