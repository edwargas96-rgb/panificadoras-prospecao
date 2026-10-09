/* Destaques estilo stories: círculos que abrem uma galeria em tela cheia. */
(function () {
  "use strict";
  var data = window.SITE_DATA;
  var section = document.getElementById("destaques-ig");
  if (!data || !section) return;
  var groups = (data.highlights || []).filter(function (g) { return g.items && g.items.length; });
  if (!groups.length) { section.hidden = true; return; }

  var DURATION = 5000;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var row = document.getElementById("hl-row");
  var view = document.getElementById("story");
  var stage = document.getElementById("story-stage");
  var bars = document.getElementById("story-bars");
  var img = document.getElementById("story-img");
  var avatar = document.getElementById("story-avatar");
  var title = document.getElementById("story-title");
  var closeBtn = document.getElementById("story-close");
  var cta = document.getElementById("story-cta");
  var cur = null, idx = 0, elapsed = 0, last = 0, raf = 0, paused = false, opener = null;

  if (data.highlightsCta) { cta.textContent = data.highlightsCta.label; cta.href = data.highlightsCta.href; } else { cta.hidden = true; }

  groups.forEach(function (g, gi) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "hl-item";
    b.setAttribute("aria-label", "Ver destaques: " + g.label);
    var ring = document.createElement("span");
    ring.className = "hl-ring";
    var im = document.createElement("img");
    im.src = g.cover || g.items[0].src;
    im.alt = "";
    im.loading = "lazy";
    ring.appendChild(im);
    var lb = document.createElement("span");
    lb.className = "hl-label";
    lb.textContent = g.label;
    b.appendChild(ring);
    b.appendChild(lb);
    b.addEventListener("click", function () { open(gi, b); });
    row.appendChild(b);
  });

  function buildBars() {
    bars.textContent = "";
    cur.items.forEach(function () {
      var bar = document.createElement("span");
      bar.className = "story-bar";
      bar.appendChild(document.createElement("i"));
      bars.appendChild(bar);
    });
  }
  function paintBars() {
    var kids = bars.children;
    for (var i = 0; i < kids.length; i++) {
      var fill = kids[i].firstChild;
      fill.style.width = i < idx ? "100%" : i === idx ? Math.min(100, (elapsed / DURATION) * 100) + "%" : "0%";
    }
  }
  function show(i) {
    idx = i; elapsed = 0;
    var it = cur.items[idx];
    img.src = it.src;
    img.alt = it.alt || "";
    var nxt = cur.items[idx + 1];
    if (nxt) { var pre = new Image(); pre.src = nxt.src; }
    paintBars();
  }
  function next() { if (idx < cur.items.length - 1) show(idx + 1); else close(); }
  function prev() { if (idx > 0) show(idx - 1); else show(0); }
  function tick(t) {
    if (!view.hidden) {
      if (!paused && !reduceMotion) {
        elapsed += Math.min(t - last, 64);
        if (elapsed >= DURATION) next(); else paintBars();
      }
      last = t;
      raf = requestAnimationFrame(tick);
    }
  }
  function open(gi, from) {
    cur = groups[gi];
    opener = from || null;
    var c = cur.cta || data.highlightsCta;
    if (c) { cta.textContent = c.label; cta.href = c.href; cta.hidden = false; } else { cta.hidden = true; }
    title.textContent = cur.label;
    avatar.src = cur.cover || cur.items[0].src;
    buildBars();
    show(0);
    view.hidden = false;
    document.body.style.overflow = "hidden";
    last = performance.now();
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(tick);
    closeBtn.focus();
  }
  function close() {
    view.hidden = true;
    document.body.style.overflow = "";
    cancelAnimationFrame(raf);
    if (opener) opener.focus();
  }

  closeBtn.addEventListener("click", close);
  view.addEventListener("click", function (e) { if (e.target === view) close(); });
  document.addEventListener("keydown", function (e) {
    if (view.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
  });

  /* toque: esquerda volta, direita avança; segurar pausa; deslizar muda de foto ou fecha */
  var start = null;
  stage.addEventListener("pointerdown", function (e) {
    if (e.target.closest("a, button")) return;
    start = { x: e.clientX, y: e.clientY, t: performance.now() };
    paused = true;
    stage.setPointerCapture(e.pointerId);
  });
  function release(e, cancelled) {
    if (!start) return;
    var dx = e.clientX - start.x, dy = e.clientY - start.y, dt = performance.now() - start.t;
    var s = start; start = null; paused = false;
    if (cancelled) return;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) { if (dx < 0) next(); else prev(); }
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) close();
    else if (dt < 300 && Math.abs(dx) < 12 && Math.abs(dy) < 12) {
      var r = stage.getBoundingClientRect();
      if (s.x - r.left < r.width * 0.35) prev(); else next();
    }
  }
  stage.addEventListener("pointerup", function (e) { release(e, false); });
  stage.addEventListener("pointercancel", function (e) { release(e, true); });
})();
