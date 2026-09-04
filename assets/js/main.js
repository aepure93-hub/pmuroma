const banner = document.querySelector("[data-cookie-banner]");
const accept = document.querySelector("[data-cookie-accept]");
const header = document.querySelector("[data-header]");

if (banner && !localStorage.getItem("pmuroma_cookie_ok")) {
  banner.hidden = false;
}

if (accept) {
  accept.addEventListener("click", () => {
    localStorage.setItem("pmuroma_cookie_ok", "1");
    banner.hidden = true;
  });
}

const updateHeader = () => {
  if (!header) return;
  header.toggleAttribute("data-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let motionFrame = 0;

const updateMotion = (event) => {
  if (prefersReducedMotion || motionFrame) return;
  motionFrame = requestAnimationFrame(() => {
    const mouseX = event ? event.clientX - window.innerWidth / 2 : 0;
    const mouseY = event ? event.clientY - window.innerHeight / 2 : 0;
    document.documentElement.style.setProperty("--mouse-x", `${Math.round(mouseX)}px`);
    document.documentElement.style.setProperty("--mouse-y", `${Math.round(mouseY)}px`);
    document.documentElement.style.setProperty("--scroll-shift", `${Math.round(window.scrollY)}px`);
    motionFrame = 0;
  });
};

if (!prefersReducedMotion) {
  window.addEventListener("pointermove", updateMotion, { passive: true });
  window.addEventListener("scroll", () => updateMotion(), { passive: true });
  updateMotion();
}

const revealTargets = document.querySelectorAll(
  ".intro-grid, .value-card, .section-heading, .treatment-card, .price-row, .demo-grid figure, .gallery-grid figure, .split-media, .split-copy, blockquote, .faq-list, .contact-band"
);

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  revealTargets.forEach((target) => target.setAttribute("data-reveal", ""));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );
  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
