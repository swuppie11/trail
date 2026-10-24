/* =========================================================
   THEME — light / dark toggle (remembers choice)
   ========================================================= */
(function () {
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");

  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = saved || (prefersDark ? "dark" : "light");

  btn.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();
