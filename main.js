/* =========================================================
   MAIN — scroll reveal, active nav link, navbar shadow
   ========================================================= */
(function () {
  // footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // reveal sections as they scroll into view
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.18 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // highlight the nav link of the section on screen
  const links = [...document.querySelectorAll(".nav-link")];
  const map = {
    home: "#home",
    about: "#about",
    skills: "#about",
    resume: "#resume",
    portfolio: "#portfolio",
  };
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const target = map[e.target.id];
      links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === target));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["home", "about", "skills", "resume", "portfolio"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) spy.observe(el);
  });

  // navbar shadow after scrolling
  const nav = document.getElementById("navbar");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 10);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
