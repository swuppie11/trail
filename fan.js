/* =========================================================
   CERTIFICATES FAN — center card + tilted neighbors
   ========================================================= */
(function () {
  const root = document.getElementById("certFan");
  if (!root) return;

  const cards = [...root.querySelectorAll(".cert-card")];
  const dotsWrap = document.getElementById("certDots");
  const n = cards.length;
  let active = 0;

  const dots = cards.map((_, i) => {
    const d = document.createElement("button");
    d.setAttribute("aria-label", `Certificate ${i + 1}`);
    d.addEventListener("click", () => go(i));
    dotsWrap.appendChild(d);
    return d;
  });

  function render() {
    cards.forEach((card, i) => {
      // shortest circular distance from the active card
      let off = ((i - active + n + Math.floor(n / 2)) % n) - Math.floor(n / 2);
      let pos;
      if (off === 0) pos = "0";
      else if (off === -1) pos = "-1";
      else if (off === 1) pos = "1";
      else pos = off < 0 ? "hidden-l" : "hidden-r";
      card.dataset.pos = pos;
    });
    dots.forEach((d, i) => d.classList.toggle("on", i === active));
  }

  function go(i) { active = (i + n) % n; render(); }

  root.querySelector(".arrow-prev").addEventListener("click", () => go(active - 1));
  root.querySelector(".arrow-next").addEventListener("click", () => go(active + 1));

  // click a side card to bring it to the center
  cards.forEach((card, i) => card.addEventListener("click", () => {
    if (card.dataset.pos === "-1" || card.dataset.pos === "1") go(i);
  }));

  // keyboard arrows when the section is in view
  document.addEventListener("keydown", (e) => {
    const r = root.getBoundingClientRect();
    if (r.top > innerHeight || r.bottom < 0) return;
    if (e.key === "ArrowLeft") go(active - 1);
    if (e.key === "ArrowRight") go(active + 1);
  });

  render();
})();
