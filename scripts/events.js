const timelineContents = document.querySelectorAll(".timeline-content");
timelineContents.forEach((content, idx) => {
  content.setAttribute("content-idx", idx + 1);
});

/**
 * @param {IntersectionObserverEntry[]} entries
 */
const onIntersection = (entries) => {
  entries.forEach((entry) => {
    const index = entry.target.getAttribute("content-idx");

    if (entry.intersectionRatio > 0.1) {
      entry.target.classList.add("show");
    }
  });
};

const observer = new IntersectionObserver(onIntersection, {
  root: null,
  rootMargin: "0px",
  threshold: 0.25,
});

timelineContents.forEach((content) => {
  observer.observe(content);
});
