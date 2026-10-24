/* =========================================================
   SKILLS CAROUSEL — slides one card at a time
   ========================================================= */
(function () {
  const root = document.getElementById("skillsCarousel");
  if (!root) return;

  const track = root.querySelector(".track");
  const cards = [...track.children];
  const prev = root.querySelector(".arrow-prev");
  const next = root.querySelector(".arrow-next");
  let index = 0;

  const visible = () => parseInt(getComputedStyle(root).getPropertyValue("--visible"), 10) || 3;
  const maxIndex = () => Math.max(0, cards.length - visible());

  function update() {
    index = Math.min(index, maxIndex());
    const step = cards[0].offsetWidth + parseFloat(getComputedStyle(track).columnGap || 20);
    track.style.transform = `translateX(${-index * step}px)`;
    prev.disabled = index === 0;
    next.disabled = index === maxIndex();
  }

  prev.addEventListener("click", () => { index = Math.max(0, index - 1); update(); });
  next.addEventListener("click", () => { index = Math.min(maxIndex(), index + 1); update(); });
  window.addEventListener("resize", update);

  // swipe support
  let startX = null;
  track.addEventListener("pointerdown", (e) => { startX = e.clientX; });
  window.addEventListener("pointerup", (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev).click();
    startX = null;
  });

  update();
})();
