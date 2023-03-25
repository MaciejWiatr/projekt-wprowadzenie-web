/** @type {HTMLButtonElement} */
const navButton = document.querySelector(".navigation-header-button");

/** @type {HTMLUListElement} */
const navLinksContainer = document.querySelector(".navigation-links");

/** @type {HTMLLIElement[]} */
const navLinks = document.querySelectorAll(".navigation-link");

navButton.addEventListener("click", () => {
  const opened = navLinksContainer.classList.contains(
    "navigation-links--active"
  );

  // Delay animations only if the menu is opened
  const timeForEl = (idx) => (opened ? idx * 100 + 100 : 0);

  setTimeout(() => {
    navLinksContainer.classList.toggle("navigation-links--active");
  }, timeForEl(navLinks.length + 1));

  navLinks.forEach((link, idx) => {
    setTimeout(() => {
      link.classList.toggle("navigation-link--active");
    }, timeForEl(idx));
  });
});
