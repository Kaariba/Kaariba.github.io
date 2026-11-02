/* =========================================================
   Kaariba Khan · Portfolio behaviour
   You shouldn't need to edit this file. Content lives in projects.js.
   ========================================================= */
(function () {
  "use strict";

  var SITE = window.SITE || {};
  var PROJECTS = window.PROJECTS || [];
  var SLIDES = [
    { key: "problem", label: "Problem" },
    { key: "approach", label: "Approach" },
    { key: "analysis", label: "Analysis" },
    { key: "recommendation", label: "Recommendation" }
  ];

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function assetPath(project, file) { return "assets/projects/" + project.id + "/" + file; }

  // An <img> that turns into a labelled placeholder if the file is missing.
  function imgOrPlaceholder(src, alt, label, phClass) {
    return '<img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy" data-ph="' + esc(label) +
      '" data-ph-class="' + esc(phClass || "sl-ph") + '">';
  }
  function wireFallbacks(root) {
    $all("img[data-ph]", root).forEach(function (img) {
      function swap() {
        var div = document.createElement("div");
        div.className = img.getAttribute("data-ph-class");
        div.textContent = img.getAttribute("data-ph");
        var host = img.closest("a.sl-img-link") || img;
        host.parentNode.replaceChild(div, host);
      }
      if (img.complete && img.naturalWidth === 0) swap();
      else img.addEventListener("error", swap, { once: true });
    });
  }

  /* ---------- résumé links + year ---------- */
  $all("[data-resume-link]").forEach(function (a) { if (SITE.resumeUrl) a.href = SITE.resumeUrl; });
  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();

  /* ---------- mobile nav ---------- */
  var toggle = $(".nav-toggle"), menu = $("#nav-menu");
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("is-open", open);
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true"); });
    $all("a", menu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    window.addEventListener("resize", function () { if (window.innerWidth > 820) setMenu(false); });
  }

  /* ---------- intro video: show placeholder until the file exists ---------- */
  var frame = $("#intro-frame"), video = $("#intro-video");
  if (frame && video) {
    var source = $("source", video);
    var markMissing = function () { frame.classList.add("is-missing"); };
    if (source) source.addEventListener("error", markMissing);
    video.addEventListener("error", markMissing);
    if (video.networkState === 3) markMissing(); // NETWORK_NO_SOURCE
  }

  /* ---------- project cards ---------- */
  var cardsEl = $("#project-cards");
  if (cardsEl) {
    cardsEl.innerHTML = PROJECTS.map(function (p) {
      var draft = p.status === "in-progress";
      var nda = p.type === "nda";
      var cls = "card" + (draft ? " is-draft" : "") + (nda ? " is-nda" : "");
      var thumb = nda
        ? '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg><span>Client work · visuals withheld under NDA</span>'
        : imgOrPlaceholder(assetPath(p, "thumb.png"), p.title + " preview", draft ? "[Project thumbnail]" : "[Dashboard thumbnail]", "ph");
      var status = draft ? ' · <span class="status">In progress</span>' : "";
      var cta = nda ? "Read the summary" : "View 4-slide case study";
      return '' +
        '<article class="' + cls + '">' +
          '<div class="card-thumb">' + thumb + '</div>' +
          '<div class="card-body">' +
            '<p class="card-kicker">' + esc(p.kicker) + status + '</p>' +
            '<h3 class="card-title">' + esc(p.title) + '</h3>' +
            '<p class="card-summary">' + esc(p.summary) + '</p>' +
            '<p class="card-outcome"><strong>Outcome:</strong> ' + esc(p.outcome) + '</p>' +
            '<p class="card-tools">' + (p.tools || []).map(esc).join(" · ") + '</p>' +
            '<button type="button" class="card-cta" data-open="' + esc(p.id) + '">' + cta + ' <span class="arr" aria-hidden="true">→</span></button>' +
          '</div>' +
        '</article>';
    }).join("");
    wireFallbacks(cardsEl);
    $all("[data-open]", cardsEl).forEach(function (b) {
      b.addEventListener("click", function () { openCase(b.getAttribute("data-open"), 0, b); });
    });
  }

  /* ---------- case study viewer ---------- */
  var dlg = $("#case-study");
  var tabsEl = $("#cs-tabs"), slideEl = $("#cs-slide"), footEl = $("#cs-foot");
  var current = null, idx = 0, opener = null;

  function renderSlide() {
    var p = current, s = p.slides || {}, key = SLIDES[idx].key, d = s[key] || {}, html = "";

    if (key === "problem") {
      html =
        '<p class="sl-label">01 · The problem</p>' +
        '<div class="sl-split"><div>' +
          '<h3 class="sl-title">' + esc(d.question) + '</h3>' +
          '<dl class="sl-dl">' +
            '<div><dt>Context</dt><dd>' + esc(d.context) + '</dd></div>' +
            '<div><dt>Stakeholders</dt><dd>' + esc(d.stakeholders) + '</dd></div>' +
            '<div><dt>Constraints</dt><dd>' + esc(d.constraints) + '</dd></div>' +
          '</dl></div>' +
          '<div class="sl-stake"><p class="k">' + esc(d.stakeLabel || "What's at stake") + '</p><p class="v">' + esc(d.stakeValue) + '</p><p class="d">' + esc(d.stakeNote) + '</p></div>' +
        '</div>';
    }

    if (key === "approach") {
      html =
        '<p class="sl-label">02 · My approach</p>' +
        '<h3 class="sl-title">' + esc(d.headline) + '</h3>' +
        '<ol class="sl-steps">' + (d.steps || []).map(function (t, i) {
          return '<li><span class="s">Step ' + (i + 1) + '</span><span class="t">' + esc(t) + '</span></li>';
        }).join("") + '</ol>' +
        '<div class="sl-split-wide">' +
          '<figure class="sl-fig">' + imgOrPlaceholder(assetPath(p, "approach.png"), d.imageAlt, d.imageLabel, "sl-ph short") + '</figure>' +
          '<div class="sl-facts">' +
            '<div><div class="k">Data sources</div><div class="v">' + esc(d.dataSources) + '</div></div>' +
            '<div><div class="k">Key assumptions</div><div class="v">' + esc(d.assumptions) + '</div></div>' +
            '<div><div class="k">Tools</div><div class="v">' + esc(d.toolsUsed) + '</div></div>' +
          '</div>' +
        '</div>';
    }

    if (key === "analysis") {
      var src = assetPath(p, "dashboard.png");
      var img = imgOrPlaceholder(src, d.imageAlt, d.imageLabel, "sl-ph");
      var linked = '<a class="sl-img-link" href="' + esc(src) + '" target="_blank" rel="noopener" aria-label="Open dashboard image full size">' + img + '</a>';
      var live = d.liveUrl ? ' · <a href="' + esc(d.liveUrl) + '" target="_blank" rel="noopener">Open the live dashboard ↗</a>' : "";
      html =
        '<p class="sl-label">03 · Analysis &amp; dashboard</p>' +
        '<div class="sl-split-wide">' +
          '<figure class="sl-fig">' + linked + '<figcaption>Click to enlarge' + live + '</figcaption></figure>' +
          '<ol class="sl-findings">' + (d.findings || []).map(function (f, i) {
            return '<li><span class="n">' + (i + 1) + '</span><div><div class="t">' + esc(f.title) + '</div><div class="d">' + esc(f.detail) + '</div></div></li>';
          }).join("") + '</ol>' +
        '</div>';
    }

    if (key === "recommendation") {
      html =
        '<p class="sl-label">04 · Recommendations</p>' +
        '<h3 class="sl-title">' + esc(d.headline) + '</h3>' +
        '<div class="sl-table-wrap"><table class="sl-table">' +
          '<thead><tr><th scope="col">Recommendation</th><th scope="col">Expected impact</th><th scope="col">Effort</th><th scope="col">Owner</th></tr></thead>' +
          '<tbody>' + (d.rows || []).map(function (r, i) {
            return '<tr><td>' + (i + 1) + '. ' + esc(r.action) + '</td><td>' + esc(r.impact) + '</td><td>' + esc(r.effort) + '</td><td>' + esc(r.owner) + '</td></tr>';
          }).join("") + '</tbody>' +
        '</table></div>' +
        '<p class="sl-note"><strong>Risks &amp; next steps:</strong> ' + esc(d.risks) + '</p>';
    }

    slideEl.innerHTML = html;
    slideEl.setAttribute("aria-labelledby", "cs-tab-" + idx);
    wireFallbacks(slideEl);

    $all(".cs-tab", tabsEl).forEach(function (t, i) {
      t.setAttribute("aria-selected", String(i === idx));
      t.tabIndex = i === idx ? 0 : -1;
      if (i === idx && tabsEl.scrollWidth > tabsEl.clientWidth) {
        tabsEl.scrollTo({ left: t.offsetLeft - 16, behavior: "smooth" });
      }
    });
    $("#cs-pos").textContent = "Slide " + (idx + 1) + " of " + SLIDES.length;
    $("#cs-prev").disabled = idx === 0;
    $("#cs-next").disabled = idx === SLIDES.length - 1;
    $(".cs-stage", dlg).scrollTop = 0;
  }

  function renderNda() {
    var n = current.nda || {};
    slideEl.removeAttribute("aria-labelledby");
    slideEl.innerHTML =
      '<div class="nda-banner"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>' +
        'Client work: screens and data are confidential. Happy to walk through the approach in an interview.</div>' +
      '<div class="nda-cols">' +
        '<div><h3>The problem</h3><p>' + esc(n.problem) + '</p></div>' +
        '<div><h3>What I did</h3><p>' + esc(n.did) + '</p></div>' +
        '<div><h3>Outcome</h3><p class="big">' + esc(n.outcomeValue) + '</p><p>' + esc(n.outcomeText) + '</p></div>' +
      '</div>' +
      '<p class="nda-tools">Tools: ' + (current.tools || []).map(esc).join(" · ") + '</p>';
  }

  function go(i) {
    if (!current || current.type === "nda") return;
    idx = Math.max(0, Math.min(SLIDES.length - 1, i));
    renderSlide();
  }

  function openCase(id, startAt, fromEl) {
    var p = PROJECTS.filter(function (x) { return x.id === id; })[0];
    if (!p || !dlg) return;
    current = p; idx = startAt || 0; opener = fromEl || null;

    $("#cs-kicker").textContent = p.kicker + (p.type === "nda" ? " · NDA summary" : "");
    $("#cs-title").textContent = p.title;
    var deck = $("#cs-deck");
    if (p.deckUrl) { deck.href = p.deckUrl; deck.hidden = false; } else { deck.hidden = true; }

    var isNda = p.type === "nda";
    tabsEl.hidden = isNda; footEl.hidden = isNda;
    if (isNda) {
      renderNda();
    } else {
      tabsEl.innerHTML = SLIDES.map(function (s, i) {
        return '<button type="button" role="tab" class="cs-tab" id="cs-tab-' + i + '" aria-controls="cs-slide" data-i="' + i + '"><span class="n">0' + (i + 1) + '</span>' + s.label + '</button>';
      }).join("");
      $all(".cs-tab", tabsEl).forEach(function (t) {
        t.addEventListener("click", function () { go(+t.getAttribute("data-i")); });
      });
      renderSlide();
    }

    if (!dlg.open) {
      if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
      document.body.classList.add("cs-open");
    }
    if (location.hash !== "#case/" + id) history.replaceState(null, "", "#case/" + id);
    $("#cs-close").focus();
  }

  function closeCase() {
    if (dlg.open) { if (typeof dlg.close === "function") dlg.close(); else dlg.removeAttribute("open"); }
  }

  if (dlg) {
    $("#cs-close").addEventListener("click", closeCase);
    $("#cs-prev").addEventListener("click", function () { go(idx - 1); });
    $("#cs-next").addEventListener("click", function () { go(idx + 1); });

    // Click on the dark backdrop closes the viewer
    dlg.addEventListener("click", function (e) { if (e.target === dlg) closeCase(); });

    // Arrow keys move between slides while the viewer is open
    dlg.addEventListener("keydown", function (e) {
      var tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      if (e.key === "ArrowRight") { e.preventDefault(); go(idx + 1); var t = $("#cs-tab-" + idx); if (t && e.target.classList.contains("cs-tab")) t.focus(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(idx - 1); var t2 = $("#cs-tab-" + idx); if (t2 && e.target.classList.contains("cs-tab")) t2.focus(); }
    });

    // Simple swipe on touch screens
    var sx = null, sy = null;
    slideEl.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    slideEl.addEventListener("touchend", function (e) {
      if (sx == null) return;
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5 && !e.target.closest(".sl-table-wrap")) go(idx + (dx < 0 ? 1 : -1));
      sx = sy = null;
    });

    dlg.addEventListener("close", function () {
      document.body.classList.remove("cs-open");
      if (location.hash.indexOf("#case/") === 0) history.replaceState(null, "", "#work");
      if (opener) opener.focus();
      current = null;
    });
  }

  /* ---------- deep links: yoursite/#case/<id> ---------- */
  function fromHash() {
    var m = location.hash.match(/^#case\/([\w-]+)/);
    if (m) openCase(m[1], 0, null);
  }
  window.addEventListener("hashchange", fromHash);
  fromHash();
})();
