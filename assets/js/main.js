const root = document.documentElement;
const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");
const themeButton = document.querySelector(".theme-button");

const savedTheme = localStorage.getItem("portfolio-theme");
const preferredTheme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
root.dataset.theme = savedTheme || preferredTheme;
themeButton?.setAttribute("aria-label", `Switch to ${root.dataset.theme === "dark" ? "light" : "dark"} theme`);

themeButton?.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("portfolio-theme", next);
  themeButton.setAttribute("aria-label", `Switch to ${next === "dark" ? "light" : "dark"} theme`);
});

const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 20);
updateHeader();
addEventListener("scroll", updateHeader, { passive: true });

const setMenu = (open) => {
  menuButton?.setAttribute("aria-expanded", String(open));
  menuButton?.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  mobileNav?.classList.toggle("open", open);
  mobileNav?.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("menu-open", open);
};
menuButton?.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
mobileNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

document.getElementById("year").textContent = new Date().getFullYear();
