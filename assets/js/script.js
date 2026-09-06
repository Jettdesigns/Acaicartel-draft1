(function () {
  "use strict";

  var intro = document.getElementById("intro");
  var enterBtn = document.getElementById("enterBtn");
  var skipLink = document.getElementById("skipIntro");
  var yearEl = document.getElementById("year");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var entered = false;
  var autoTimer = null;

  function enterSite() {
    if (entered || !intro) return;
    entered = true;
    if (autoTimer) clearTimeout(autoTimer);
    intro.classList.add("is-leaving");
    document.body.classList.add("has-entered");
    document.body.style.overflow = "";
    setTimeout(function () {
      intro.classList.add("is-hidden");
    }, reduced ? 0 : 1150);
  }

  document.body.style.overflow = "hidden";

  if (enterBtn) enterBtn.addEventListener("click", enterSite);
  if (skipLink) {
    skipLink.addEventListener("click", function (e) {
      e.preventDefault();
      enterSite();
    });
  }
  if (intro) {
    intro.addEventListener("click", function (e) {
      if (e.target === enterBtn) return;
      enterSite();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " " || e.key === "Escape") enterSite();
  });

  // Auto-advance once the sequence has fully played, so the animation
  // always resolves into the site even without user interaction.
  autoTimer = setTimeout(enterSite, reduced ? 0 : 7000);
})();
