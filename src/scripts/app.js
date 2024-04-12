const desktopSize = window.matchMedia("(min-width: 992px)");

function toggleAppBanner() {
  const btnOpen = document.querySelector(".btn-open-banner");
  const btnClose = document.querySelector(".app-banner__close");
  const banner = document.querySelector(".app-banner");

  if (!banner) return;

  btnOpen.addEventListener("click", () => {
    banner.classList.add("active");
  });

  btnClose.addEventListener("click", () => {
    banner.classList.remove("active");
  });
}

function createObserver() {
  let observer;
  const boxElement = document.querySelector(".home-details-section");
  const appSection = document.querySelector(".app-section");
  if (!appSection) return;

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  };

  const handleIntersect = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        appSection.classList.add("active");
      }
    });
  };

  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(boxElement);
}

function toggleMobileMenu() {
  const openBtn = document.querySelector(".navbar__mobile-btn");
  const overlay = document.querySelector(".navbar__overlay");
  const header = document.querySelector(".navbar");

  if (!openBtn) return;

  const closeMenu = () => {
    header.classList.remove("active");
    document.body.classList.remove("no-scroll");
  };

  openBtn.addEventListener("click", () => {
    header.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  overlay.addEventListener("click", () => {
    closeMenu();
  });

  window.addEventListener("resize", () => {
    if (desktopSize.matches) {
      closeMenu();
    }
  });
}

function initAccordion(accordion) {
  const accordions = document.querySelectorAll(accordion);
  if (!accordions.length) return;

  accordions.forEach((accordion, index) => {
    if (accordion.classList.contains("active")) {
      accordion.nextElementSibling.style.maxHeight =
        accordion.nextElementSibling.scrollHeight + "px";
    }

    accordion.addEventListener("click", () => {
      accordions.forEach((accordion, i) => {
        if (i !== index) {
          accordion.classList.remove("active");
          accordion.nextElementSibling.style.maxHeight = null;
        }
      });
    });

    accordion.addEventListener("click", () => {
      accordion.classList.toggle("active");

      const content = accordion.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  toggleAppBanner();
  createObserver();
  toggleMobileMenu();
  initAccordion(".psychotherapy-faq__header");
});
