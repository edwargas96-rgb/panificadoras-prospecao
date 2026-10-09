(function () {
  "use strict";

  var data = window.SITE_DATA;
  if (!data) return;

  var PHONE = data.whatsapp;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover)").matches;
  var money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function norm(s) { return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function waLink(msg) { return "https://wa.me/" + PHONE + (msg ? "?text=" + encodeURIComponent(msg) : ""); }
  function fmt(n) { return money.format(n); }
  function num(n) { return String(n).replace(".", ","); }
  function round2(n) { return Math.round(n * 100) / 100; }

  var byId = {};
  data.products.forEach(function (p) { byId[p.id] = p; });
  var catById = {};
  data.categories.forEach(function (c) { catById[c.id] = c; });

  /* ---------- Links do WhatsApp com mensagem pronta ---------- */
  $$("a.whatsapp[data-message]").forEach(function (a) {
    a.href = waLink(a.getAttribute("data-message"));
  });

  /* ---------- Header ---------- */
  var header = $("#header");
  function setHeaderVar() {
    document.documentElement.style.setProperty("--hdr", header.offsetHeight + "px");
  }
  setHeaderVar();
  window.addEventListener("resize", setHeaderVar);
  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 8);
  }, { passive: true });

  var toggle = $(".menu-toggle");
  var nav = $("#navigation");
  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("open", !open);
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
    }
  });

  var year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Aberto agora ---------- */
  (function renderToday() {
    var t = $("#today-text");
    var now = new Date();
    var dow = now.getDay();
    var h = now.getHours() + now.getMinutes() / 60;
    var open = dow === 0 ? 8 : 7;
    var close = dow === 0 ? 12 : 19;
    t.textContent = "";
    if (h >= open && h < close) {
      t.appendChild(el("b", "", "Aberto agora"));
      t.appendChild(document.createTextNode(" · até às " + close + "h"));
    } else {
      t.appendChild(document.createTextNode("Segunda a sábado, 7h às 19h · domingo, 8h às 12h"));
    }
  })();

  /* ---------- Pedido (carrinho) ---------- */
  var basket = new Map();
  try {
    JSON.parse(localStorage.getItem("lari-basket") || "[]").forEach(function (pair) {
      if (byId[pair[0]] && pair[1] > 0) basket.set(pair[0], pair[1]);
    });
  } catch (e) { /* sem armazenamento: segue sem salvar */ }

  function persist() {
    try { localStorage.setItem("lari-basket", JSON.stringify(Array.from(basket.entries()))); } catch (e) { /* ignora */ }
  }
  function stepOf(p) { return p.unit === "unidade" ? 1 : 0.5; }
  function unitWord(p, q) {
    if (p.unit === "kg") return "kg";
    if (p.unit === "cento") return q > 1 ? "centos" : "cento";
    return q > 1 ? "unidades" : "unidade";
  }
  function unitShort(p) { return p.unit === "unidade" ? "unid." : p.unit; }
  function qtyText(p, q) { return num(q) + " " + unitWord(p, q); }

  function estimate() {
    var total = 0, pending = false;
    basket.forEach(function (q, id) {
      var p = byId[id];
      if (p.price == null) pending = true; else total += p.price * q;
    });
    return { total: round2(total), pending: pending };
  }

  var order = { date: "", notes: "" };

  function buildMessage() {
    var lines = ["Olá, Lari! Gostaria de fazer um pedido:", ""];
    basket.forEach(function (q, id) {
      var p = byId[id];
      var price = p.price != null ? " (" + fmt(p.price) + "/" + unitShort(p) + ")" : " (sob consulta)";
      lines.push("• " + qtyText(p, q) + " de " + p.name + price);
    });
    var est = estimate();
    if (est.total > 0) {
      lines.push("", "Estimativa dos itens: " + fmt(est.total) + (est.pending ? " + itens sob consulta" : "") + " (sem decoração).");
    } else {
      lines.push("", "Os itens estão sob consulta.");
    }
    if (order.date) {
      var d = order.date.split("-");
      lines.push("Data desejada: " + d[2] + "/" + d[1] + "/" + d[0] + ".");
    }
    if (order.notes.trim()) lines.push("Detalhes: " + order.notes.trim());
    lines.push("", "Podem me confirmar a disponibilidade e o valor final?");
    return lines.join("\n");
  }

  function syncCounts(bump) {
    var n = basket.size;
    $$("[data-count]").forEach(function (b) {
      b.textContent = n;
      b.hidden = n === 0;
      if (bump) {
        b.classList.remove("bump");
        void b.offsetWidth;
        b.classList.add("bump");
      }
    });
    $("#float-wa").hidden = n > 0;
    $("#float-cart").hidden = n === 0;
    $$(".add").forEach(function (btn) {
      var q = basket.get(btn.getAttribute("data-id"));
      btn.classList.toggle("in", !!q);
      btn.textContent = q ? num(q) : "+";
      var name = byId[btn.getAttribute("data-id")].name;
      btn.setAttribute("aria-label", q ? name + ": " + qtyText(byId[btn.getAttribute("data-id")], q) + " no pedido. Adicionar mais" : "Adicionar " + name + " ao pedido");
    });
  }

  function addItem(id, origin) {
    var p = byId[id];
    var cur = basket.get(id) || 0;
    basket.set(id, cur ? round2(cur + stepOf(p)) : 1);
    persist();
    syncCounts(true);
    renderBasket();
    if (origin) {
      var r = origin.getBoundingClientRect();
      fx.burst(r.left + r.width / 2, r.top + r.height / 2, 22);
    }
  }

  function changeItem(id, dir) {
    var p = byId[id];
    var next = round2((basket.get(id) || 0) + dir * stepOf(p));
    if (next <= 0) basket.delete(id); else basket.set(id, next);
    persist();
    syncCounts(false);
    renderBasket();
  }

  var dlg = $("#basket");
  var elEmpty = $("#basket-empty");
  var elFilled = $("#basket-filled");
  var elItems = $("#basket-items");
  var elSend = $("#basket-send");

  function renderBasket() {
    var has = basket.size > 0;
    elEmpty.hidden = has;
    elFilled.hidden = !has;
    if (!has) return;
    elItems.textContent = "";
    basket.forEach(function (q, id) {
      var p = byId[id];
      var li = el("li");
      var info = el("div");
      info.appendChild(el("p", "bi-name", p.name));
      info.appendChild(el("p", "bi-meta", p.price != null ? fmt(p.price) + " / " + unitShort(p) : "Sob consulta"));
      var step = el("div", "stepper");
      var minus = el("button", "", "−");
      minus.type = "button";
      minus.setAttribute("aria-label", "Diminuir " + p.name);
      minus.addEventListener("click", function () { changeItem(id, -1); });
      var out = el("output", "", qtyText(p, q));
      var plus = el("button", "", "+");
      plus.type = "button";
      plus.setAttribute("aria-label", "Aumentar " + p.name);
      plus.addEventListener("click", function () { changeItem(id, 1); });
      step.appendChild(minus); step.appendChild(out); step.appendChild(plus);
      li.appendChild(info); li.appendChild(step);
      elItems.appendChild(li);
    });
    var est = estimate();
    $("#basket-total").textContent = est.total > 0 ? fmt(est.total) : "Sob consulta";
    $("#basket-total-note").textContent = "Sem decoração e personalização." + (est.pending ? " Itens sob consulta não entram na estimativa." : "") + " O valor final é confirmado pelo WhatsApp.";
    elSend.href = waLink(buildMessage());
  }

  function openBasket() {
    renderBasket();
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
  }
  function closeBasket() {
    if (typeof dlg.close === "function") dlg.close(); else dlg.removeAttribute("open");
  }

  $$("[data-open-basket]").forEach(function (b) { b.addEventListener("click", openBasket); });
  $(".basket-close").addEventListener("click", closeBasket);
  $("[data-close-basket]").addEventListener("click", function () {
    closeBasket();
    $("#cardapio").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) closeBasket(); });
  $("#basket-clear").addEventListener("click", function () {
    basket.clear();
    persist();
    syncCounts(false);
    renderBasket();
  });

  var dateInput = $("#order-date");
  var notesInput = $("#order-notes");
  (function () {
    var t = new Date();
    t.setMinutes(t.getMinutes() - t.getTimezoneOffset());
    dateInput.min = t.toISOString().slice(0, 10);
  })();
  dateInput.addEventListener("input", function () { order.date = dateInput.value; if (basket.size) elSend.href = waLink(buildMessage()); });
  notesInput.addEventListener("input", function () { order.notes = notesInput.value; if (basket.size) elSend.href = waLink(buildMessage()); });

  /* ---------- Destaques (só aparecem com foto) ---------- */
  function hasPhoto(id) { return data.photos.indexOf(id) !== -1; }

  function priceNode(p) {
    var s = el("span", "price" + (p.price == null ? " consult" : ""));
    if (p.price == null) { s.textContent = "Sob consulta"; return s; }
    s.textContent = fmt(p.price);
    s.appendChild(el("small", "", "/" + unitShort(p)));
    return s;
  }

  function addButton(id) {
    var b = el("button", "add", "+");
    b.type = "button";
    b.setAttribute("data-id", id);
    return b;
  }

  var rail = $("#featured");
  var featured = data.featured.map(function (name) {
    return data.products.filter(function (x) { return x.name === name; })[0];
  }).filter(function (p, i, all) { return p && hasPhoto(p.id) && all.indexOf(p) === i; });

  if (!featured.length) {
    $("#destaques").hidden = true;
  } else {
    featured.forEach(function (p) {
      var cat = catById[p.cat];
      var card = el("article", "fcard");
      var vis = el("div", "fvisual");
      var img = el("img");
      img.src = "assets/produtos/" + p.id + ".jpg";
      img.alt = p.name;
      img.loading = "lazy";
      vis.appendChild(img);
      var body = el("div", "fbody");
      body.appendChild(el("p", "fcat", cat.label));
      body.appendChild(el("h3", "", p.name));
      if (p.desc) body.appendChild(el("p", "fdesc", p.desc));
      var buy = el("div", "fbuy");
      buy.appendChild(priceNode(p));
      buy.appendChild(addButton(p.id));
      body.appendChild(buy);
      card.appendChild(vis); card.appendChild(body);
      rail.appendChild(card);
    });
  }

  function scrollRail(dir) {
    var card = $(".fcard", rail);
    var w = card ? card.offsetWidth + 24 : 300;
    rail.scrollBy({ left: dir * w * 2, behavior: reduceMotion ? "auto" : "smooth" });
  }
  $("#rail-prev").addEventListener("click", function () { scrollRail(-1); });
  $("#rail-next").addEventListener("click", function () { scrollRail(1); });

  /* ---------- Cardápio ---------- */
  var state = { cat: data.categories[0].id, q: "" };
  var tabs = $("#tabs");
  var list = $("#menu-list");
  var searchInput = $("#search");

  function renderTabs() {
    tabs.textContent = "";
    data.categories.forEach(function (c) {
      var b = el("button", "", c.label);
      b.type = "button";
      b.setAttribute("aria-pressed", String(!state.q && c.id === state.cat));
      b.addEventListener("click", function () {
        state.cat = c.id;
        state.q = "";
        searchInput.value = "";
        renderTabs();
        renderMenu();
      });
      tabs.appendChild(b);
    });
  }

  function rowNode(p) {
    var withPhoto = hasPhoto(p.id);
    var li = el("li", "row" + (withPhoto ? " has-photo" : ""));
    if (withPhoto) {
      var img = el("img", "row-photo");
      img.src = "assets/produtos/" + p.id + ".jpg";
      img.alt = "";
      img.loading = "lazy";
      li.appendChild(img);
    }
    var main = el("div", "row-main");
    var head = el("div", "row-head");
    head.appendChild(el("span", "row-name", p.name));
    head.appendChild(el("span", "leader"));
    head.appendChild(priceNode(p));
    main.appendChild(head);
    if (p.desc) main.appendChild(el("p", "row-desc", p.desc));
    li.appendChild(main);
    li.appendChild(addButton(p.id));
    return li;
  }

  function renderMenu() {
    var q = norm(state.q.trim());
    list.textContent = "";
    var cats = q ? data.categories : data.categories.filter(function (c) { return c.id === state.cat; });
    var total = 0;
    cats.forEach(function (cat) {
      var items = data.products.filter(function (p) {
        return p.cat === cat.id && (!q || norm(p.name + " " + (p.desc || "")).indexOf(q) !== -1);
      });
      if (!items.length) return;
      total += items.length;
      if (q) list.appendChild(el("h3", "cat-title", cat.label));
      var groups = [];
      items.forEach(function (p) { if (groups.indexOf(p.group) === -1) groups.push(p.group); });
      groups.forEach(function (g) {
        if (g) list.appendChild(el("h4", "group-title", g));
        var ul = el("ul", "rows");
        items.filter(function (p) { return p.group === g; }).forEach(function (p) { ul.appendChild(rowNode(p)); });
        list.appendChild(ul);
      });
    });

    $("#category-note").textContent = q ? "" : catById[state.cat].note;
    $("#results-count").textContent = total + (total === 1 ? " item" : " itens");
    if (!total) {
      var empty = el("div", "empty");
      empty.appendChild(el("p", "", "Não encontramos esse sabor por aqui."));
      var a = el("a", "text-link", "Perguntar pelo WhatsApp");
      a.href = waLink("Olá! Vocês fazem " + state.q.trim() + "?");
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      empty.appendChild(a);
      list.appendChild(empty);
    }
    syncCounts(false);
  }

  searchInput.addEventListener("input", function () {
    state.q = searchInput.value;
    renderTabs();
    renderMenu();
  });

  [list, rail].forEach(function (root) {
    root.addEventListener("click", function (e) {
      var b = e.target.closest(".add");
      if (b) addItem(b.getAttribute("data-id"), b);
    });
  });

  renderTabs();
  renderMenu();
  renderBasket();
  syncCounts(false);

  /* ---------- Revelar ao rolar ---------- */
  (function () {
    var targets = $$(".section-heading, .fcard, .day, .steps li, .visit-card, .occasion-copy, .catalog-tools, .visit-inner > div:first-child");
    if (reduceMotion) return;
    var pending = targets.filter(function (t) { return t.getBoundingClientRect().top > window.innerHeight * 0.9; });
    pending.forEach(function (t) {
      var sibs = t.parentElement ? Array.prototype.indexOf.call(t.parentElement.children, t) : 0;
      t.style.setProperty("--d", Math.min(sibs, 5) * 70 + "ms");
      t.classList.add("reveal");
    });
    var ticking = false;
    function check() {
      ticking = false;
      var limit = window.innerHeight * 0.92;
      pending = pending.filter(function (t) {
        var r = t.getBoundingClientRect();
        if (r.top > limit) return true;
        t.classList.add("in");
        setTimeout(function () { t.classList.remove("reveal", "in"); }, 1100);
        return false;
      });
      if (!pending.length) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(check); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // segurança: se a página abrir já rolada (âncora ou recarregar), mostra o que estiver à vista
    requestAnimationFrame(check);
    window.addEventListener("load", check);
  })();

  /* ---------- Granulado (canvas) ---------- */
  var COLORS = ["#ee6f8f", "#4fc4ad", "#f0b429", "#8a5443", "#a58be8", "#f7a1b5"];

  function Field(canvas) {
    this.c = canvas;
    this.ctx = canvas.getContext("2d");
    this.p = [];
    this.running = false;
    this.mouse = { x: -999, y: -999 };
    this.resize();
  }
  Field.prototype.resize = function () {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.c.width = Math.round(this.w * dpr);
    this.c.height = Math.round(this.h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  Field.prototype.draw = function () {
    var ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);
    ctx.lineCap = "round";
    for (var i = 0; i < this.p.length; i++) {
      var s = this.p[i];
      ctx.save();
      ctx.globalAlpha = s.alpha == null ? 1 : s.alpha;
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rot);
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.wd;
      ctx.beginPath();
      ctx.moveTo(-s.len / 2, 0);
      ctx.lineTo(s.len / 2, 0);
      ctx.stroke();
      ctx.restore();
    }
  };
  Field.prototype.loop = function () {
    var self = this;
    if (!this.running) return;
    this.step();
    this.draw();
    if (this.running) requestAnimationFrame(function () { self.loop(); });
  };
  Field.prototype.start = function () {
    if (this.running) return;
    this.running = true;
    this.loop();
  };
  Field.prototype.stop = function () { this.running = false; };

  function makeSprinkle(w, h, anywhere) {
    return {
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : -20,
      base: 0.3 + Math.random() * 0.7,
      vx: (Math.random() - 0.5) * 0.25,
      vy: 0.3 + Math.random() * 0.7,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.04,
      len: 13 + Math.random() * 7,
      wd: 5 + Math.random() * 1.8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
  }

  /* Fundo do hero: granulado caindo e fugindo do mouse */
  var bg = new Field($("#bg-sprinkles"));
  var smallScreen = window.matchMedia("(max-width: 700px)").matches;
  var count = smallScreen ? 0 : 56;
  for (var i = 0; i < count; i++) bg.p.push(makeSprinkle(bg.w, bg.h, true));
  bg.step = function () {
    var m = this.mouse;
    for (var i = 0; i < this.p.length; i++) {
      var s = this.p[i];
      var dx = s.x - m.x, dy = s.y - m.y, d = Math.sqrt(dx * dx + dy * dy);
      if (d < 130 && d > 0) {
        var f = (130 - d) / 130;
        s.vx += (dx / d) * f * 0.7;
        s.vy += (dy / d) * f * 0.7;
        s.vr += (Math.random() - 0.5) * 0.02;
      }
      s.vx *= 0.97;
      s.vy += (s.base - s.vy) * 0.03;
      s.x += s.vx;
      s.y += s.vy;
      s.rot += s.vr;
      if (s.y > this.h + 20 || s.x < -30 || s.x > this.w + 30) {
        var n = makeSprinkle(this.w, this.h, false);
        this.p[i] = n;
      }
    }
  };

  /* Explosões de granulado (adicionar ao pedido, toque no hero) */
  var fx = new Field($("#fx"));
  fx.step = function () {
    for (var i = this.p.length - 1; i >= 0; i--) {
      var s = this.p[i];
      s.vy += 0.2;
      s.vx *= 0.985;
      s.x += s.vx;
      s.y += s.vy;
      s.rot += s.vr;
      s.life--;
      s.alpha = Math.min(1, s.life / 25);
      if (s.life <= 0) this.p.splice(i, 1);
    }
    if (!this.p.length) { this.running = false; this.ctx.clearRect(0, 0, this.w, this.h); }
  };
  fx.burst = function (x, y, n) {
    if (reduceMotion || !canHover) return;
    for (var i = 0; i < n; i++) {
      var a = Math.random() * Math.PI * 2, sp = 2 + Math.random() * 5;
      var s = makeSprinkle(0, 0, true);
      s.x = x; s.y = y;
      s.vx = Math.cos(a) * sp;
      s.vy = Math.sin(a) * sp - 3;
      s.vr = (Math.random() - 0.5) * 0.35;
      s.life = 60 + Math.random() * 50;
      this.p.push(s);
    }
    this.start();
  };

  var hero = $("#inicio");
  if (smallScreen) {
    /* celular: fundo limpo, sem granulado */
  } else if (reduceMotion) {
    bg.draw();
  } else {
    var heroVisible = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        heroVisible = entries[0].isIntersecting;
        if (heroVisible && !document.hidden) bg.start();
        else { bg.stop(); bg.ctx.clearRect(0, 0, bg.w, bg.h); }
      }, { threshold: 0.05 }).observe(hero);
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) bg.stop(); else if (heroVisible) bg.start();
    });
    bg.start();

    window.addEventListener("pointermove", function (e) {
      if (e.pointerType === "mouse") { bg.mouse.x = e.clientX; bg.mouse.y = e.clientY; }
    }, { passive: true });
  }
  window.addEventListener("resize", function () {
    bg.resize(); fx.resize();
    if (reduceMotion) bg.draw();
  });

  /* Inclinação da logo seguindo o mouse */
  var art = $(".hero-art");
  var card = $("#logo-card");
  if (canHover && !reduceMotion) {
    art.addEventListener("pointermove", function (e) {
      var r = art.getBoundingClientRect();
      var nx = (e.clientX - r.left) / r.width - 0.5;
      var ny = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty("--ry", (nx * 9).toFixed(2) + "deg");
      card.style.setProperty("--rx", (-ny * 9).toFixed(2) + "deg");
    });
    art.addEventListener("pointerleave", function () {
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--rx", "0deg");
    });
  }
})();
