/**
 * @Script js for (Template/Project Name)
 * @project     - Project Name
 * @author      - Ashiqur Rahman
 * @created_by  -
 * @created_at  -
 * @modified_by -
 **/

const date = new Date();
const year = date.getFullYear();

/**
 * --------------------------------------------------
 * Swiper Slider
 * --------------------------------------------------
 */
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

const youSwiper = new Swiper(".youSwiper", {
  slidesPerView: 1,
  spaceBetween: 24,
  navigation: {
    nextEl: ".you-next",
    prevEl: ".you-prev",
  },
  breakpoints: {
    576: { slidesPerView: 2 }, // ≥ 576 px
    768: { slidesPerView: 3 }, // ≥ 768 px
    992: { slidesPerView: 4 }, // ≥ 992 px
  },
});

/* 3️⃣  make toggleNavButtons() work for *any* passed-in swiper */
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

/* helper – figures out the *current* slidesPerView after breakpoints */
function getCurrentSlidesPerView(swiper) {
  const bp = swiper.currentBreakpoint || "base";
  return (
    swiper.params.breakpoints?.[bp]?.slidesPerView ??
    swiper.params.slidesPerView ??
    1
  );
}

document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".youSwiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: false,
    navigation: {
      nextEl: ".you-next",
      prevEl: ".you-prev",
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 4,
      },
    },
  });
});
