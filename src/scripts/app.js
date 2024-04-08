const desktopSize = window.matchMedia("(min-width: 992px)");

function toggleAppBanner() {
  const btnOpen = document.querySelector('.btn-open-banner')
  const btnClose = document.querySelector('.app-banner__close')
  const banner = document.querySelector('.app-banner')

  btnOpen.addEventListener("click", () => {
    banner.classList.add("active")
  })

  btnClose.addEventListener("click", () => {
    banner.classList.remove("active")
  })
}

function createObserver() {
  let observer;
  const boxElement = document.querySelector('.home-details-section')

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  };

  const handleIntersect = (entries) => {
    const appSection = document.querySelector('.app-section')
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        appSection.classList.add('active')
      }
    });
  };

  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(boxElement);
}

function toggleMobileMenu() {
  const openBtn = document.querySelector('.navbar__mobile-btn')
  const overlay = document.querySelector(".navbar__overlay")
  const header = document.querySelector(".navbar")

  const closeMenu = () => {
    header.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  openBtn.addEventListener("click", () => {
    header.classList.toggle("active");
    document.body.classList.toggle("no-scroll")
  })

  overlay.addEventListener("click", () => {
    closeMenu()
  })

  window.addEventListener("resize", () => {
    if (desktopSize.matches) {
      closeMenu()
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  toggleAppBanner();
  createObserver();
  toggleMobileMenu()
})
