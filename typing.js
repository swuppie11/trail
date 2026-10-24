/* =========================================================
   TYPING LINE — types / deletes phrases under the cat
   Edit the phrases array to say whatever you like.
   ========================================================= */
(function () {
  const el = document.getElementById("typedText");
  const phrases = [
    "Hi, I'm [Your Name] :3",
    "Web Developer",
    "UI Designer",
    "Open to opportunities",
  ];

  let p = 0, i = 0, deleting = false;

  function tick() {
    const word = phrases[p];
    el.textContent = word.slice(0, i);

    let delay = deleting ? 40 : 85;

    if (!deleting && i === word.length) { delay = 1600; deleting = true; }
    else if (deleting && i === 0) { deleting = false; p = (p + 1) % phrases.length; delay = 400; }
    else { i += deleting ? -1 : 1; }

    setTimeout(tick, delay);
  }
  tick();
})();
