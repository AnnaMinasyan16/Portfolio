const defaultLanguage = "ru";
const typingWords = {
  ru: "Front-End Developer",
  en: "Front-End Developer",
  hy: "Front-End Developer"
};

function setLanguage(lang) {
  const selected = translations[lang] ? lang : defaultLanguage;
  const dict = translations[selected];
  document.documentElement.lang = selected;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (dict[key]) node.textContent = dict[key];
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === selected);
  });

  localStorage.setItem("portfolioLanguage", selected);
  runTypingEffect(typingWords[selected]);
}

function runTypingEffect(text) {
  const el = document.getElementById("typingText");
  if (!el) return;
  el.textContent = "";
  let index = 0;
  clearInterval(window.typingInterval);
  window.typingInterval = setInterval(() => {
    el.textContent = text.slice(0, index);
    index += 1;
    if (index > text.length) clearInterval(window.typingInterval);
  }, 70);
}

function setupLanguageSwitcher() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });
}

function setupHeaderAndNav() {
  const links = document.querySelectorAll(".nav-links a");
  const sections = [...links].map((link) =>
    document.querySelector(link.getAttribute("href"))
  );
  const navLinks = document.getElementById("navLinks");
  const navToggle = document.getElementById("navToggle");

  navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  links.forEach((link) =>
    link.addEventListener("click", () => navLinks.classList.remove("open"))
  );

  const onScroll = () => {
    const y = window.scrollY + 140;
    sections.forEach((section, index) => {
      if (!section) return;
      const active =
        y >= section.offsetTop && y < section.offsetTop + section.offsetHeight;
      links[index].classList.toggle("active", active);
    });
  };

  window.addEventListener("scroll", onScroll);
  onScroll();
}

function setupCursor() {
  const cursor = document.getElementById("customCursor");
  if (!cursor || window.matchMedia("(pointer: coarse)").matches) return;

  window.addEventListener("mousemove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll("a, button, input, textarea").forEach((item) => {
    item.addEventListener("mouseenter", () => cursor.classList.add("active"));
    item.addEventListener("mouseleave", () => cursor.classList.remove("active"));
  });
}

function setupLoader() {
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hidden"), 500);
  });
}

function setupMicroInteractions() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const magneticButtons = document.querySelectorAll(".hero__actions .btn");
  magneticButtons.forEach((btn) => {
    btn.addEventListener("mousemove", (event) => {
      const rect = btn.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.08}px, ${y * 0.12 - 2}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });

  const tiltItems = document.querySelectorAll("[data-tilt]");
  tiltItems.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 8;
      const rotateX = (0.5 - y) * 8;
      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function setupFooterYear() {
  const year = document.getElementById("year");
  year.textContent = String(new Date().getFullYear());
}

function init() {
  const storedLanguage = localStorage.getItem("portfolioLanguage") || defaultLanguage;
  setLanguage(storedLanguage);
  setupLanguageSwitcher();
  setupHeaderAndNav();
  setupCursor();
  setupLoader();
  setupMicroInteractions();
  setupFooterYear();
  PortfolioAnimations.setupRevealAnimations();
  PortfolioAnimations.setupParallax();
  PortfolioAnimations.setupProgressBar();
}

document.addEventListener("DOMContentLoaded", init);
