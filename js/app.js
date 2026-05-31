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
  window.PortfolioProjects?.updateProjectLabels();
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
}

function setupFooterYear() {
  const year = document.getElementById("year");
  year.textContent = String(new Date().getFullYear());
}

function showContactSuccessModal() {
  const modal = document.getElementById("contactSuccessModal");
  if (!modal) return;

  modal.hidden = false;
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => modal.classList.add("is-visible"));
  document.getElementById("contactSuccessOk")?.focus();
}

function closeContactSuccessModal() {
  const modal = document.getElementById("contactSuccessModal");
  if (!modal) return;

  modal.classList.remove("is-visible");
  document.body.classList.remove("modal-open");

  setTimeout(() => {
    modal.hidden = true;
  }, 280);
}

function setupContactSuccessModal() {
  const modal = document.getElementById("contactSuccessModal");
  const okBtn = document.getElementById("contactSuccessOk");
  const backdrop = document.getElementById("contactSuccessBackdrop");

  okBtn?.addEventListener("click", closeContactSuccessModal);
  backdrop?.addEventListener("click", closeContactSuccessModal);

  document.addEventListener("keydown", (event) => {
    if (modal?.hidden) return;
    if (event.key === "Escape") closeContactSuccessModal();
  });
}

function openCertificateLightbox(img) {
  const modal = document.getElementById("certificateLightbox");
  const lightboxImg = document.getElementById("certificateLightboxImg");
  if (!modal || !lightboxImg || !img?.src) return;

  lightboxImg.src = img.currentSrc || img.src;
  lightboxImg.alt = img.alt || "";
  modal.hidden = false;
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => modal.classList.add("is-visible"));
  document.getElementById("certificateLightboxClose")?.focus();
}

function closeCertificateLightbox() {
  const modal = document.getElementById("certificateLightbox");
  if (!modal) return;

  modal.classList.remove("is-visible");
  document.body.classList.remove("modal-open");

  setTimeout(() => {
    modal.hidden = true;
    const lightboxImg = document.getElementById("certificateLightboxImg");
    if (lightboxImg) {
      lightboxImg.removeAttribute("src");
      lightboxImg.alt = "";
    }
  }, 280);
}

function setupCertificateLightbox() {
  const modal = document.getElementById("certificateLightbox");
  const closeBtn = document.getElementById("certificateLightboxClose");
  const backdrop = document.getElementById("certificateLightboxBackdrop");

  document.querySelectorAll(".certificate-card__img").forEach((img) => {
    img.setAttribute("role", "button");
    img.setAttribute("tabindex", "0");

    const open = () => openCertificateLightbox(img);

    img.addEventListener("click", open);
    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });

  closeBtn?.addEventListener("click", closeCertificateLightbox);
  backdrop?.addEventListener("click", closeCertificateLightbox);

  document.addEventListener("keydown", (event) => {
    if (modal?.hidden) return;
    if (event.key === "Escape") closeCertificateLightbox();
  });
}

function setupContactForm() {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("contactSubmitBtn");
  const errorEl = document.getElementById("contactFormError");
  if (!form || !submitBtn) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) {
      form.reportValidity();
      return;
    }

    const lang = localStorage.getItem("portfolioLanguage") || defaultLanguage;
    const dict = translations[lang] || translations.ru;

    if (!FORMSPREE_FORM_ID || FORMSPREE_FORM_ID === "YOUR_FORM_ID") {
      if (errorEl) {
        errorEl.hidden = false;
        errorEl.textContent =
          "Formspree не настроен. Укажите FORMSPREE_FORM_ID в js/config.js";
      }
      return;
    }

    const defaultLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = dict["contact.sending"];
    if (errorEl) errorEl.hidden = true;

    try {
      const response = await fetch(
        `https://formspree.io/f/${FORMSPREE_FORM_ID}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _replyto: email,
            _subject: `Portfolio — сообщение от ${name}`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Formspree request failed");
      }

      form.reset();
      showContactSuccessModal();
    } catch {
      if (errorEl) {
        errorEl.hidden = false;
        errorEl.textContent = dict["contact.error"];
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = dict["contact.send"] || defaultLabel;
    }
  });
}

function init() {
  const storedLanguage = localStorage.getItem("portfolioLanguage") || defaultLanguage;
  setLanguage(storedLanguage);
  setupLanguageSwitcher();
  setupHeaderAndNav();
  setupCursor();
  setupLoader();
  setupMicroInteractions();
  setupContactSuccessModal();
  setupCertificateLightbox();
  setupContactForm();
  setupFooterYear();
  PortfolioAnimations.setupRevealAnimations();
  PortfolioProjects.initProjects();
  PortfolioProjects.updateProjectLabels();
  PortfolioAnimations.setupParallax();
  PortfolioAnimations.setupProgressBar();
}

document.addEventListener("DOMContentLoaded", init);
