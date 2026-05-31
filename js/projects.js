const GITHUB_USER = "AnnaMinasyan16";

/**
 * url     — GitHub repo (Open Code)
 * demoUrl — live host link: Netlify, GitHub Pages, Vercel, etc. (Open Project)
 */
const projectsData = [
  {
    id: "taskmanagement",
    name: "TaskManagement",
    url: `https://github.com/${GITHUB_USER}/TaskManagement`,
    demoUrl: `https://task-management-orcin-eight.vercel.app/`,
    tech: ["JavaScript", "HTML5", "CSS3"],
    images: [
      "./assets/images/projects/taskmanagement/1.png",
      "./assets/images/projects/taskmanagement/2.png",
      "./assets/images/projects/taskmanagement/3.png",
      "./assets/images/projects/taskmanagement/4.png",
    ],
    description: {
      ru: "Приложение для управления задачами с удобным интерфейсом и логикой работы со списками.",
      en: "Task management application with a clean interface and list workflow logic.",
      hy: "Առաջադրանքների կառավարման հավելված՝ հարմար ինտերֆեյսով և ցանկերի տրամաբանությամբ։",
    },
  },
  {
    id: "libraryapp",
    name: "LibraryApp",
    url: `https://github.com/${GITHUB_USER}/LibraryApp`,
    demoUrl: "https://library-app-tan-eight.vercel.app/",
    tech: ["JavaScript", "HTML5", "CSS3"],
    images: [
      "./assets/images/projects/libraryapp/1.png",
      "./assets/images/projects/libraryapp/2.png",
      "./assets/images/projects/libraryapp/3.png",
      "./assets/images/projects/libraryapp/4.png",
    ],
    description: {
      ru: "Веб-приложение библиотеки для работы с книгами и структурированным каталогом.",
      en: "Library web application for managing books and a structured catalog.",
      hy: "Գրադարանի վեբ հավելված՝ գրքերի և կատալոգի կառավարման համար։",
    },
  },
  {
    id: "todolist",
    name: "ToDoList",
    url: `https://github.com/${GITHUB_USER}/ToDoList`,
    demoUrl: "https://to-do-list-hazel-delta.vercel.app/",
    tech: ["JavaScript", "HTML5", "CSS3"],
    images: [
      "./assets/images/projects/todolist/1.png",
      "./assets/images/projects/todolist/2.png",
      "./assets/images/projects/todolist/3.png",
      "./assets/images/projects/todolist/4.png",
    ],
    description: {
      ru: "Интерактивный To-Do список с добавлением, редактированием и фильтрацией задач.",
      en: "Interactive to-do list with add, edit, and filter functionality.",
      hy: "Ինտերակտիվ To-Do ցանկ՝ առաջադրանքների ավելացման, խմբագրման և ֆիլտրացիայի համար։",
    },
  },
  {
    id: "healthcareapp",
    name: "HealthCareApp",
    url: "https://github.com/ordinyanlilia/Hospital_App",
    demoUrl: "https://healthcare-7fe99.web.app/",
    tech: ["React.js", "Firebase", "JavaScript"],
    images: [
      "./assets/images/projects/healthcareapp/1.png",
      "./assets/images/projects/healthcareapp/2.png",
      "./assets/images/projects/healthcareapp/3.png",
      "./assets/images/projects/healthcareapp/4.png",
    ],
    description: {
      ru: "Веб-приложение для управления больничными процессами, записями пациентов и медицинскими данными.Приложение Health Care App было разработано в рамках курса React. Это был командный проект, и я отвечал(а) за личную страницу врача, где врач может просматривать закреплённых за ним пациентов и другие функции.",
      en: "Healthcare web application for hospital workflows, patient records, and medical data management.The Health Care App was developed as part of a React course. It was a team project, and I was responsible for the doctor’s personal page, where the doctor can view the patients assigned to them, among other features.",
      hy: "Առողջապահական վեբ հավելված՝ հիվանդանոցային գործընթացների, պացիենտների գրառումների և բժշկական տվյալների կառավարման համար։Health Care App-ը մշակվել է React դասընթացի շրջանակներում։ Այն թիմային նախագիծ էր, և ես պատասխանատու էի բժշկի անձնական էջի համար, որտեղ բժիշկը կարող է տեսնել իրեն կցված պացիենտներին և այլ հնարավորություններ։",
    },
  },
];

let activeProjectId = null;
let activeSlideIndex = 0;

function getLang() {
  return localStorage.getItem("portfolioLanguage") || "ru";
}

function t(key) {
  const lang = getLang();
  return translations[lang]?.[key] || translations.ru[key] || key;
}

function renderProjectCards() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = projectsData
    .map(
      (project, index) => `
    <article
      class="project-card reveal${index % 4 === 1 ? " delay-1" : index % 4 === 2 ? " delay-2" : index % 4 === 3 ? " delay-1" : ""}"
      data-open-project="${project.id}"
      role="button"
      tabindex="0"
      aria-label="${project.name}"
    >
      <div class="project-card__inner">
        <img
          src="${project.images[0]}"
          alt=""
          class="project-card__preview"
          loading="lazy"
        />
        <div class="project-card__overlay">
          <div class="project-card__content">
            <span class="project-card__line" aria-hidden="true"></span>
            <h3 class="project-card__title">${project.name}</h3>
            <span class="project-card__hint">${t("projects.view")}</span>
          </div>
        </div>
      </div>
    </article>
  `,
    )
    .join("");

  grid.querySelectorAll("[data-open-project]").forEach((card) => {
    const open = () => openProjectModal(card.dataset.openProject);

    card.addEventListener("click", open);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });

  if (window.PortfolioAnimations?.observeReveal) {
    PortfolioAnimations.observeReveal(grid.querySelectorAll(".reveal"));
  }
}

function updateProjectLabels() {
  document.querySelectorAll(".project-card__hint").forEach((el) => {
    el.textContent = t("projects.view");
  });

  const projectBtn = document.getElementById("modalProjectBtn");
  const codeBtn = document.getElementById("modalCodeBtn");
  if (projectBtn) projectBtn.textContent = t("projects.openProject");
  if (codeBtn) codeBtn.textContent = t("projects.openCode");

  const modal = document.getElementById("projectModal");
  if (modal && !modal.hidden && activeProjectId) {
    fillModalContent(activeProjectId);
  }
}

function normalizeDemoUrl(url) {
  if (!url?.trim()) return "";
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function setModalLink(linkEl, url, labelKey) {
  if (!linkEl) return;

  const safeUrl = normalizeDemoUrl(url);
  linkEl.textContent = t(labelKey);

  if (safeUrl) {
    linkEl.href = safeUrl;
    linkEl.hidden = false;
    linkEl.setAttribute("target", "_blank");
    linkEl.setAttribute("rel", "noopener noreferrer");
  } else {
    linkEl.removeAttribute("href");
    linkEl.removeAttribute("target");
    linkEl.hidden = true;
  }
}

function fillModalContent(projectId) {
  const project = projectsData.find((p) => p.id === projectId);
  if (!project) return;

  const lang = getLang();
  document.getElementById("modalProjectTitle").textContent = project.name;
  document.getElementById("modalProjectDesc").textContent =
    project.description[lang] || project.description.ru;

  const techWrap = document.getElementById("modalProjectTech");
  techWrap.innerHTML = project.tech
    .map((tech) => `<span class="modal-tech-tag">${tech}</span>`)
    .join("");

  const projectBtn = document.getElementById("modalProjectBtn");
  const codeBtn = document.getElementById("modalCodeBtn");

  setModalLink(projectBtn, project.demoUrl, "projects.openProject");
  setModalLink(codeBtn, project.url, "projects.openCode");

  renderGallery(project, activeSlideIndex);
}

function renderGallery(project, index) {
  const slides = project.images || [];
  if (!slides.length) return;

  const safeIndex = ((index % slides.length) + slides.length) % slides.length;
  activeSlideIndex = safeIndex;

  const main = document.getElementById("modalGalleryMain");
  main.innerHTML = `<img src="${slides[safeIndex]}" alt="${project.name} — screenshot ${safeIndex + 1}" class="modal-gallery__img" loading="lazy" decoding="async" />`;
  main.setAttribute("aria-label", `${project.name} preview ${safeIndex + 1}`);

  const track = document.getElementById("modalGalleryTrack");
  track.innerHTML = slides
    .map(
      (src, i) => `
    <button
      type="button"
      class="modal-thumb${i === safeIndex ? " active" : ""}"
      data-slide="${i}"
      aria-label="Slide ${i + 1}"
    >
      <img src="${src}" alt="" class="modal-thumb__img" loading="lazy" />
    </button>
  `,
    )
    .join("");

  track.querySelectorAll(".modal-thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      renderGallery(project, Number(thumb.dataset.slide));
    });
  });
}

function scrollThumbs(direction) {
  const project = projectsData.find((p) => p.id === activeProjectId);
  if (!project) return;
  renderGallery(project, activeSlideIndex + direction);
}

function openProjectModal(projectId) {
  activeProjectId = projectId;
  activeSlideIndex = 0;

  const modal = document.getElementById("projectModal");
  fillModalContent(projectId);
  modal.hidden = false;
  window.PageScrollLock?.lockPageScroll();

  requestAnimationFrame(() => modal.classList.add("is-visible"));
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  modal.classList.remove("is-visible");
  window.PageScrollLock?.unlockPageScroll();

  setTimeout(() => {
    modal.hidden = true;
    activeProjectId = null;
  }, 280);
}

function setupProjectModal() {
  const modal = document.getElementById("projectModal");
  const closeBtn = document.getElementById("modalClose");
  const backdrop = document.getElementById("modalBackdrop");
  const prevBtn = document.getElementById("modalGalleryPrev");
  const nextBtn = document.getElementById("modalGalleryNext");

  closeBtn?.addEventListener("click", closeProjectModal);
  backdrop?.addEventListener("click", closeProjectModal);
  prevBtn?.addEventListener("click", () => scrollThumbs(-1));
  nextBtn?.addEventListener("click", () => scrollThumbs(1));

  document.addEventListener("keydown", (event) => {
    if (modal.hidden) return;
    if (event.key === "Escape") closeProjectModal();
    if (event.key === "ArrowLeft") scrollThumbs(-1);
    if (event.key === "ArrowRight") scrollThumbs(1);
  });
}

function initProjects() {
  renderProjectCards();
  setupProjectModal();
}

window.PortfolioProjects = {
  initProjects,
  updateProjectLabels,
};
