function setupRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupParallax() {
  const shapes = document.querySelectorAll(".shape");
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    shapes.forEach((shape, index) => {
      shape.style.transform = `translateY(${y * (0.02 + index * 0.01)}px)`;
    });
  });
}

function setupProgressBar() {
  const progressBar = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const width = (scrollTop / height) * 100;
    progressBar.style.width = `${width}%`;
  });
}

window.PortfolioAnimations = {
  setupRevealAnimations,
  setupParallax,
  setupProgressBar
};
