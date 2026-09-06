(function () {
  "use strict";

  var intro = document.getElementById("intro");
  var enterBtn = document.getElementById("enterBtn");
  var skipLink = document.getElementById("skipIntro");
  var dustField = document.getElementById("dust");
  var yearEl = document.getElementById("year");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Ambient gold dust particles
  if (dustField && !reduced) {
    var count = 26;
    for (var i = 0; i < count; i++) {
      var p = document.createElement("span");
      var size = (Math.random() * 3 + 1.5).toFixed(1);
      var left = (Math.random() * 100).toFixed(2);
      var dur = (Math.random() * 5 + 6).toFixed(2);
      var delay = (Math.random() * 6).toFixed(2);
      var dx = (Math.random() * 80 - 40).toFixed(0) + "px";
      p.style.setProperty("--s", size + "px");
      p.style.setProperty("--dur", dur + "s");
      p.style.setProperty("--delay", delay + "s");
      p.style.setProperty("--dx", dx);
      p.style.left = left + "%";
      dustField.appendChild(p);
    }
  }

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
