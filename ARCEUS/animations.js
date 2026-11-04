/* ============================================================
   ARCEUS — Surcouche d'animations premium (GSAP 3 + ScrollTrigger)
   ------------------------------------------------------------
   Architecture du projet : site statique mono-fichier (aucun
   bundler, aucun npm) → GSAP est chargé en fichiers LOCAUX
   (gsap.min.js + ScrollTrigger.min.js) et consommé via les
   globales window.gsap / window.ScrollTrigger. Pas d'« import »
   possible sans bundler : c'est l'équivalent exact ici.

   Principes :
   - Surcouche non destructive : si GSAP est absent, le site
     garde toutes ses animations CSS/IO d'origine (repli).
   - Uniquement transform & opacity (sauf la hauteur de l'en-tête,
     élément unique et léger), force3D.
   - Sélecteurs RÉELS du site (.reveal, .hero-text h1,
     .stats-grid, #heroCards, #quizBox…).
   - Le header réutilise la classe « scrolled » déjà posée par le
     onScroll() du site comme repère de seuil.
   - gsap.context : réversion propre possible au démontage.
   ============================================================ */
(function () {
  "use strict";
  if (window.__ARCEUS_ANIM) return;              /* pas de double démarrage */
  window.__ARCEUS_ANIM = true;

  var rm = false;
  try {
    rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {}
  /* Choix EXPRES du propriétaire (23/10/2026) : le calque tourne même si
     le système demande « animations réduites ». Le drapeau gsap-rm est
     posé pour information (CSS/console). Pour rétablir le respect strict
     du réglage système, rendre actif à nouveau : « if (rm) return; ». */

  var initPremiumAnimations = function (root) {

    var ctx = gsap.context(function () {
      gsap.registerPlugin(ScrollTrigger);

      /* ---------- Découpage du titre en mots (révélation masquée) ---------- */
      var computed = function (el, prop) {
        try { return window.getComputedStyle(el)[prop] || ""; } catch (e) { return ""; }
      };
      /* Le texte dégradé (background-clip:text + color:transparent) ne doit
         PAS être découpé en sous-éléments : le dégradé est posé sur l'élément
         lui-même et ne suivrait pas ses enfants → mots invisibles.
         Ces éléments restent donc ENTIERS et glissent dans un seul masque. */
      var isGradientText = function (el) {
        return (computed(el, "webkitBackgroundClip") || computed(el, "backgroundClip")) === "text";
      };
      var splitWords = function (el) {
        var orig = (el.textContent || "").replace(/\s+/g, " ").trim();
        var words = [];
        (function walk(node) {
          [].slice.call(node.childNodes).forEach(function (n) {
            if (n.nodeType === 3) {
              /* Les espaces (y compris les insécables &nbsp;) sont gardés TELS QUELS */
              var frag = document.createDocumentFragment();
              n.textContent.split(/(\s+)/).forEach(function (p) {
                if (!p.length) return;
                if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
                var m = document.createElement("span"); m.className = "w";
                var i = document.createElement("span"); i.className = "wi"; i.textContent = p;
                m.appendChild(i); frag.appendChild(m); words.push(i);
              });
              node.replaceChild(frag, n);
            } else if (n.nodeType === 1) {
              if (isGradientText(n)) {
                /* « On t'aide à choisir. » : un seul masque pour tout l'élément */
                var mask = document.createElement("span"); mask.className = "w";
                n.parentNode.replaceChild(mask, n);
                mask.appendChild(n);
                n.classList.add("wi");
                words.push(n);
              } else walk(n);
            }
          });
        })(el);
        /* Accessibilité : le texte complet reste lisible pour les lecteurs d'écran */
        el.setAttribute("aria-label", orig);
        [].slice.call(el.querySelectorAll(".w")).forEach(function (m) {
          m.setAttribute("aria-hidden", "true");
        });
        return words;
      };

      /* ---------- 1. Introduction du héros (timeline synchronisée) ---------- */
      var wis = [];
      var h1 = document.querySelector(".hero-text h1");
      if (h1 && !h1.querySelector(".wi")) wis = splitWords(h1);

      var tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.05 });
      if (wis.length) tl.fromTo(wis, { yPercent: 118 }, { yPercent: 0, duration: 0.72, stagger: 0.028 }, 0.10);
      tl.fromTo(".hero-text .eyebrow", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, wis.length ? 0.08 : 0)
        .fromTo(".hero-text .lead", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.32)
        .fromTo(".hero-actions .btn", {
          y: 16, opacity: 0
        }, {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.09,
          /* clearProps : le CSS reprend la main sur le survol ensuite */
          clearProps: "transform,opacity"
        }, 0.44)
        .fromTo("#heroCards", { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, clearProps: "transform,opacity" }, 0.40)
        /* Les .float-card gardent leur animation CSS « float3d » :
           on entre par l'opacité seulement, zéro conflit de transform
           (la parallaxe du site pilote déjà les marges de ces cartes). */
        .fromTo("#heroCards .float-card", { opacity: 0 },
          { opacity: 1, duration: 0.6, stagger: 0.1, clearProps: "opacity" }, 0.62)
        /* Chiffres du héros : fondu aligné sur la timeline */
        .fromTo(".stats-grid > div", { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, clearProps: "all" }, 0.75);

      /* ---------- 2. Révélations au défilement (système .reveal du site) ---------- */
      var revs = [].slice.call(document.querySelectorAll(".reveal"))
        .filter(function (el) { return !el.closest(".hero"); });
      if (revs.length) {
        gsap.set(revs, { opacity: 0, y: 26 });
        ScrollTrigger.batch(revs, {
          start: "top 88%",
          once: true,
          interval: 0.06,
          batchMax: 12,
          onEnter: function (batch) {
            gsap.to(batch, {
              opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
              stagger: 0.075, overwrite: true, clearProps: "transform"
            });
          }
        });
      }

      /* ---------- 3. Profondeur au défilement : le texte du héros glisse ---------- */
      if (window.matchMedia("(min-width: 901px)").matches) {
        gsap.to(".hero-text", {
          yPercent: -6, opacity: 0.85, ease: "none",
          scrollTrigger: {
            trigger: ".hero", start: "top top", end: "bottom top", scrub: true
          }
        });
      }
    }, root || document);

    /* ---------- 4. Hors du contexte GSAP, lié au cycle de vie ---------- */
    var stops = [];

    /* 4a. Quiz : transition douce à chaque changement de question */
    try {
      var box = document.getElementById("quizBox");
      var qRaf = null;
      var qObs = new MutationObserver(function () {
        if (qRaf) return;
        qRaf = requestAnimationFrame(function () {
          qRaf = null;
          if (!box.children.length) return;
          gsap.fromTo(box.children,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
        });
      });
      qObs.observe(box, { childList: true });

      stops.push(function () { try { qObs.disconnect(); } catch (e) {} });
    } catch (e) {}

    /* 4b. En-tête : rétrécissement fluide.
       La classe .scrolled vient déjà du site (y > 30). La hauteur est
       animée par GSAP pour rester douce MÊME quand le réglage système
       neutralise les transitions CSS (cas « animations réduites ») :
       clearProps rend la main au CSS statique entre les manœuvres. */
    try {
      var hdr = document.querySelector(".header-inner");
      var hSkip = false, hState = null;
      var hScroll = function () {
        if (hSkip) return;
        hSkip = true;
        requestAnimationFrame(function () {
          hSkip = false;
          if (!hdr) return;
          var s = window.scrollY > 30;
          if (s === hState) return;
          hState = s;
          gsap.to(hdr, {
            height: s ? 60 : 72, duration: 0.45, ease: "power2.inOut",
            overwrite: true, clearProps: "height"
          });
        });
      };
      window.addEventListener("scroll", hScroll, { passive: true });
      window.addEventListener("resize", hScroll, { passive: true });
      hScroll();                                   /* cas d'une page rechargée en milieu de page */

      stops.push(function () {
        window.removeEventListener("scroll", hScroll);
        window.removeEventListener("resize", hScroll);
        try {
          if (hdr) { gsap.killTweensOf(hdr); hdr.style.height = ""; }
        } catch (e) {}
      });
    } catch (e) {}

    return {
      ctx: ctx,
      stop: function () {
        stops.forEach(function (f) { try { f(); } catch (e) {} });
        try { ctx.revert(); } catch (e) {}
      }
    };
  };

  /* ---------- Démarrage sûr : si GSAP manque, le CSS natif suffit ---------- */
  function start() {
    var flagAdded = false;
    try {
      if (!window.gsap || !window.ScrollTrigger) return;
      gsap.config({ force3D: true });
      try { gsap.ticker.lagSmoothing(500, 33); } catch (e) {}
      try { ScrollTrigger.config({ ignoreMobileResize: true }); } catch (e) {}

      /* Drapeau AVANT l'init : le CSS neutralise les animations doublées
         au moment exact où GSAP prend le relais. */
      document.documentElement.classList.add("gsap-on");
      if (rm) document.documentElement.classList.add("gsap-rm");   /* forçage : système en « mouvement réduit » */
      flagAdded = true;

      window.__ARCEUS_ANIM_INSTANCE = initPremiumAnimations(document);

      /* Le chargement des polices peut déplacer des éléments */
      window.addEventListener("load", function () {
        try { ScrollTrigger.refresh(); } catch (e) {}
      });
    } catch (e) {
      /* tout échec → repli propre : le site reprend ses animations d'origine */
      if (flagAdded) {
        try { document.documentElement.classList.remove("gsap-on"); } catch (e2) {}
        try { document.documentElement.classList.remove("gsap-rm"); } catch (e2) {}
      }
      try { if (window.__ARCEUS_ANIM_INSTANCE) window.__ARCEUS_ANIM_INSTANCE.stop(); } catch (e2) {}
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
