document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const header = document.querySelector(".ph-header");
  const backToTopBtn = document.getElementById("backToTop");

  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  const updateScrollState = () => {
    const isScrolled = window.scrollY > 90;
    header?.classList.toggle("header-sticky", isScrolled);
    document.body.classList.toggle("has-sticky-header", isScrolled);
    backToTopBtn?.classList.toggle("show", window.scrollY > 300);
  };

  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });

  backToTopBtn?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  document.querySelectorAll("#offcanvasMenu .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const offcanvasMenu = document.getElementById("offcanvasMenu");
      const offcanvasInstance = window.bootstrap?.Offcanvas.getInstance(offcanvasMenu);
      offcanvasInstance?.hide();
    });
  });

  document.addEventListener("click", (event) => {
    const clickedInsideAccordion =
      event.target.closest(".accordion-button") || event.target.closest(".accordion-collapse");

    if (!clickedInsideAccordion) {
      document.querySelectorAll(".accordion-collapse.show").forEach((openItem) => {
        const accordionInstance = window.bootstrap?.Collapse.getInstance(openItem);
        accordionInstance?.hide();
      });
    }
  });

  const revealItems = document.querySelectorAll(".reveal-on-scroll");
  if ("IntersectionObserver" in window && revealItems.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
});

