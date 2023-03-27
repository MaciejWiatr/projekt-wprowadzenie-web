// Handle classes scroll

const classesList = document.querySelector(".home-classes-list");

/** @type {HTMLButtonElement} */
const scrollButtonRight = document.querySelector(".scroll-button-right");

/** @type {HTMLButtonElement} */
const scrollButtonLeft = document.querySelector(
  ".home-classes-scroll-button.scroll-button-left"
);

let showLeftScrollButton = (show) => {
  if (show) {
    scrollButtonLeft.style.opacity = 1;
  } else {
    scrollButtonLeft.style.opacity = 0;
  }
};

scrollButtonRight.addEventListener("click", () => {
  classesList.scrollLeft = classesList.scrollWidth;
  showLeftScrollButton(true);
});

scrollButtonLeft.addEventListener("click", () => {
  classesList.scrollLeft = 0;
  showLeftScrollButton(false);
});
