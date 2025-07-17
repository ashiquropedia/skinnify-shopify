/**
 * @Script js for (Template/Project Name)
 * @project     - Project Name
 * @author      - Ashiqur Rahman
 * @created_by  -
 * @created_at  -
 * @modified_by -
 **/

// Global variables
const date = new Date();
const year = date.getFullYear();

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  // Load header and footer
  loadPartial("header.html", "header");
  loadPartial("footer.html", "footer");

  // Initialize Swipers
  initMainSwiper();
  initYouSwiper();
  initPopularSwiper();
  initHomeProductsSwiper();

  // Initialize accordions
  initFaqAccordion();
  initBootstrapAccordion();

  // Initialize mobile filter
  initMobileFilter();
});

// Helper Functions
function loadPartial(url, elementId) {
  fetch(url)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    });
}

function getCurrentSlidesPerView(swiper) {
  const bp = swiper.currentBreakpoint || "base";
  return (
    swiper.params.breakpoints?.[bp]?.slidesPerView ??
    swiper.params.slidesPerView ??
    1
  );
}

function toggleNavButtons(swiper) {
  const total = swiper.slides.length;
  const visible = getCurrentSlidesPerView(swiper);
  const prevBtn = swiper.navigation.prevEl;
  const nextBtn = swiper.navigation.nextEl;

  if (total <= visible) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
  } else {
    prevBtn.style.display = "flex";
    nextBtn.style.display = "flex";
    prevBtn.classList.toggle("swiper-button-disabled", swiper.isBeginning);
    nextBtn.classList.toggle("swiper-button-disabled", swiper.isEnd);
  }
}

// Swiper Initialization Functions
function initMainSwiper() {
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      768: { slidesPerView: 1 },
      992: { slidesPerView: 3 },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: false,
    on: {
      afterInit: function () {
        toggleNavButtons(this);
      },
      slideChange: function () {
        toggleNavButtons(this);
      },
    },
  });
}

function initYouSwiper() {
  new Swiper(".youSwiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: false,
    navigation: {
      nextEl: ".you-next",
      prevEl: ".you-prev",
    },
    breakpoints: {
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
    },
  });
}

function initShopCategorySwiper() {
  new Swiper(".shopCategorySwiper", {
    loop: true,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    slidesPerView: 4,
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 4 },
    },
  });
}

function initReviewsSwiper() {
  new Swiper(".myReviewsSwiper", {
    loop: true,
    spaceBetween: 20,
    navigation: {
      nextEl: ".reviews-next",
      prevEl: ".reviews-prev",
    },
    slidesPerView: 4,
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 4 },
    },
  });
}

function initPopularSwiper() {
  new Swiper(".popularSwiper", {
    loop: true,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    slidesPerView: 4,
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 4 },
    },
  });
}

function initHomeProductsSwiper() {
  new Swiper(".homeOurproductsSwiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: false,
    navigation: {
      nextEl: ".you-next",
      prevEl: ".you-prev",
    },
    breakpoints: {
      425: { slidesPerView: 1.1 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 4 },
    },
  });
}

// Accordion Initialization Functions
function initFaqAccordion() {
  document.querySelectorAll(".faq-accordion-header").forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.closest(".faq-accordion-item");
      const bodyId = header.getAttribute("data-target");
      const body = document.getElementById(bodyId);
      const isActive = item.classList.contains("active");

      // Close all
      document
        .querySelectorAll(".faq-accordion-item")
        .forEach((i) => i.classList.remove("active"));
      document
        .querySelectorAll(".faq-accordion-body")
        .forEach((b) => b.classList.remove("show"));

      // Open if not already active
      if (!isActive) {
        item.classList.add("active");
        body.classList.add("show");
      }
    });
  });
}

function initBootstrapAccordion() {
  document.querySelectorAll('[data-bs-toggle="collapse"]').forEach((toggle) => {
    // Handle both icon elements and text toggles
    const targetId = toggle.getAttribute("data-bs-target");
    const target = document.querySelector(targetId);
    const svgToggle = toggle.querySelector(".accordion-toggle svg");

    if (!target || !svgToggle) return;

    // Get the SVG paths
    const minusLine = svgToggle.querySelector(".accordion-minus");
    const plusLine = svgToggle.querySelector(".accordion-plus");

    // Set initial state
    if (target.classList.contains("show")) {
      minusLine.style.opacity = "1";
      plusLine.style.opacity = "0";
      plusLine.style.transform = "rotate(90deg)";
    } else {
      minusLine.style.opacity = "1";
      plusLine.style.opacity = "1";
      plusLine.style.transform = "rotate(0deg)";
    }

    // Smooth transition on expand
    target.addEventListener("shown.bs.collapse", () => {
      minusLine.style.opacity = "1";
      plusLine.style.opacity = "0";
      plusLine.style.transform = "rotate(90deg)";
    });

    // Smooth transition on collapse
    target.addEventListener("hidden.bs.collapse", () => {
      minusLine.style.opacity = "1";
      plusLine.style.opacity = "1";
      plusLine.style.transform = "rotate(0deg)";
    });
  });
}

// Mobile Filter Initialization
function initMobileFilter() {
  const mobileFilterButton = document.getElementById("mobileFilterButton");
  if (mobileFilterButton) {
    const mobileFilterModal = new bootstrap.Offcanvas(
      document.getElementById("mobileFilterModal")
    );
    mobileFilterButton.addEventListener("click", function () {
      mobileFilterModal.show();
    });
  }
}

const popularSwiper = new Swiper("#popularSwiper .popularSwiper", {
  slidesPerView: 1,
  loop: false,
  spaceBetween: 20,
  navigation: {
    nextEl: "#popularSwiper .popular-next",
    prevEl: "#popularSwiper .popular-prev",
    disabledClass: "swiper-button-disabled",
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 },
    1200: { slidesPerView: 4 },
  },
  on: {
    init: function () {
      this.navigation.update(); // Update navigation buttons on init
    },
    slideChange: function () {
      this.navigation.update(); // Update navigation buttons on slide change
    },
  },
});

const shopCategorySwiper = new Swiper(
  "#shopCategorySwiper .shopCategorySwiper",
  {
    slidesPerView: 1,
    loop: false,
    spaceBetween: 20,
    navigation: {
      nextEl: "#shopCategorySwiper .category-next",
      prevEl: "#shopCategorySwiper .category-prev",
      disabledClass: "swiper-button-disabled",
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
      1200: { slidesPerView: 3 },
    },
    on: {
      init: function () {
        this.navigation.update(); // Update navigation buttons on init
      },
      slideChange: function () {
        this.navigation.update(); // Update navigation buttons on slide change
      },
    },
  }
);
const reviewsSwiper = new Swiper("#reviews .myReviewsSwiper", {
  slidesPerView: 1,
  loop: false,
  spaceBetween: 20,
  navigation: {
    nextEl: "#reviews .reviews-next",
    prevEl: "#reviews .reviews-prev",
    disabledClass: "swiper-button-disabled",
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 },
    1200: { slidesPerView: 3 },
  },
  on: {
    init: function () {
      this.navigation.update(); // Update navigation buttons on init
    },
    slideChange: function () {
      this.navigation.update(); // Update navigation buttons on slide change
    },
  },
});

document.addEventListener("DOMContentLoaded", function () {
  const mainImage = document.getElementById("main-image");
  const thumbnails = document.querySelectorAll(".thumbnail-slider .thumb");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      // Update main image
      mainImage.src = thumb.src;

      // Trigger animation
      mainImage.classList.remove("animate"); // Reset
      void mainImage.offsetWidth; // Force reflow
      mainImage.classList.add("animate");

      // Handle active state
      thumbnails.forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const sizeGuideLink = document.querySelector(".size-guide-link");
  const sizeGuidePopup = document.querySelector(".size-guide-popup");
  const popupClose = document.querySelector(".popup-close");
  const popupOverlay = document.querySelector(".popup-overlay");

  // Show popup
  sizeGuideLink.addEventListener("click", function (e) {
    e.preventDefault();
    sizeGuidePopup.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  // Close popup
  function closePopup() {
    sizeGuidePopup.style.display = "none";
    document.body.style.overflow = "";
  }

  popupClose.addEventListener("click", closePopup);
  popupOverlay.addEventListener("click", function (e) {
    if (e.target === popupOverlay) closePopup();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sizeGuidePopup.style.display === "flex") {
      closePopup();
    }
  });

  // Toggle CM/IN
  const unitToggle = document.getElementById("unit-toggle");
  const measurements = document.querySelectorAll(".measurement");

  unitToggle.addEventListener("change", function () {
    const isCM = this.checked;
    measurements.forEach((measurement) => {
      measurement.textContent = isCM
        ? measurement.getAttribute("data-cm")
        : measurement.getAttribute("data-in");
    });
  });

  // Tab switching (if extended)
  const tabs = document.querySelectorAll(".nav-link");
  tabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
      // Optionally add logic to show/hide tab content
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const tabLinks = document.querySelectorAll(".chart-tabs .nav-link");

  tabLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all tabs and content
      document.querySelectorAll(".chart-tabs .nav-link").forEach((tab) => {
        tab.classList.remove("active");
      });
      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.add("d-none");
        content.classList.remove("active");
      });

      // Add active class to clicked tab and corresponding content
      this.classList.add("active");
      const targetId = this.getAttribute("data-target");
      document.getElementById(targetId).classList.remove("d-none");
      document.getElementById(targetId).classList.add("active");
    });
  });
  // Toggle between inches and centimeters
  const unitToggle = document.getElementById("unit-toggle");

  if (unitToggle) {
    unitToggle.addEventListener("change", function () {
      const isCM = this.checked;

      // Toggle all inch measurements
      document
        .querySelectorAll(".waist-in, .hips-in, .inseam-in")
        .forEach((el) => {
          el.classList.toggle("d-none", isCM);
        });

      // Toggle all cm measurements
      document
        .querySelectorAll(".waist-cm, .hips-cm, .inseam-cm")
        .forEach((el) => {
          el.classList.toggle("d-none", !isCM);
        });

      // Update unit labels styling
      document.querySelectorAll(".unit-in, .unit-cm").forEach((el) => {
        el.classList.toggle(
          "fw-bold",
          (el.classList.contains("unit-in") && !isCM) ||
            (el.classList.contains("unit-cm") && isCM)
        );
      });
    });
  }

  // Tab switching functionality
  const tabs = document.querySelectorAll(".nav-link");
  tabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all tabs
      tabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");
    });
  });
});

// cart sidebar

function increaseValue() {
  const input = document.getElementById("productQty");
  let value = parseInt(input.value) || 0;
  input.value = value + 1;
}

function decreaseValue() {
  const input = document.getElementById("productQty");
  let value = parseInt(input.value) || 0;
  if (value > 1) {
    input.value = value - 1;
  }
}
function increaseValue2() {
  const input = document.getElementById("productQty2");
  let value = parseInt(input.value) || 0;
  input.value = value + 1;
}

function decreaseValue2() {
  const input = document.getElementById("productQty2");
  let value = parseInt(input.value) || 0;
  if (value > 1) {
    input.value = value - 1;
  }
}
