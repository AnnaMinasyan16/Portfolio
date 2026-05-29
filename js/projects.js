const GITHUB_USER = "AnnaMinasyan16";

const projectsData = [
  {
    id: "portfolio",
    name: "Portfolio",
    url: `https://github.com/${GITHUB_USER}/Portfolio`,
    tech: ["HTML5", "CSS3", "JavaScript"],
    colors: ["#eef2f7", "#e4e8f4", "#d8dff0", "#f5e1da"],
    description: {
      ru: "Персональный портфолио-сайт с премиальным UI, мультиязычностью и плавными анимациями.",
      en: "Personal portfolio website with premium UI, multilingual support, and smooth animations.",
      hy: "Անձնական պորտֆոլիո կայք՝ պրեմիում UI, բազմալեզուության և սահուն անիմացիաների հետ։",
    },
  },
  {
    id: "taskmanagement",
    name: "TaskManagement",
    url: `https://github.com/${GITHUB_USER}/TaskManagement`,
    tech: ["JavaScript", "HTML5", "CSS3"],
    colors: ["#e8edf5", "#dce4f2", "#cfd9ee", "#c2cee8"],
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
    tech: ["JavaScript", "HTML5", "CSS3"],
    colors: ["#f3f0fa", "#ebe6f5", "#e2ddf0", "#d8d2eb"],
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
    tech: ["JavaScript", "HTML5", "CSS3"],
    colors: ["#f8f7f4", "#f1eef6", "#ebe8f4", "#e4ecf3"],
    description: {
      ru: "Интерактивный To-Do список с добавлением, редактированием и фильтрацией задач.",
      en: "Interactive to-do list with add, edit, and filter functionality.",
      hy: "Ինտերակտիվ To-Do ցանկ՝ առաջադրանքների ավելացման, խմբագրման և ֆիլտրացիայի համար։",
    },
  },
  {
    id: "hotelpage",
    name: "HotelPage",
    url: `https://github.com/${GITHUB_USER}/HotelPage`,
    tech: ["HTML5", "CSS3"],
    colors: ["#efe3d5", "#f5e1da", "#f8f0eb", "#ebe4dc"],
    description: {
      ru: "Лендинг отеля с аккуратной вёрсткой, адаптивной сеткой и визуальной иерархией.",
      en: "Hotel landing page with clean layout, responsive grid, and visual hierarchy.",
      hy: "Հյուրանոցի լենդինգ՝ կոկիկ դասավորությամբ, ադապտիվ ցանցով և հստակ հիերարխիայով։",
    },
  },
  {
    id: "todo-list-css",
    name: "To-Do-List",
    url: `https://github.com/${GITHUB_USER}/To-Do-List`,
    tech: ["HTML5", "CSS3"],
    colors: ["#eef2f7", "#e8edf5", "#dfe8f2", "#d5e0ef"],
    description: {
      ru: "Стилизованный To-Do интерфейс с фокусом на CSS и современный визуальный дизайн.",
      en: "Styled to-do interface focused on CSS and modern visual design.",
      hy: "Ոճավորված To-Do ինտերֆեյս՝ կենտրոնացած CSS-ի և ժամանակակից դիզայնի վրա։",
    },
  },
  {
    id: "weather",
    name: "Weather",
    url: `https://github.com/${GITHUB_USER}/Weather`,
    tech: ["JavaScript", "HTML5", "CSS3", "API"],
    colors: ["#dce8f4", "#cfe0f0", "#c0d6ec", "#b2cce8"],
    description: {
      ru: "Погодное приложение с запросами к API и отображением актуальных данных.",
      en: "Weather application with API requests and real-time data display.",
      hy: "Եղանակի հավելված՝ API հարցումներով և արդի տվյալների ցուցադրմամբ։",
    },
  },
  {
    id: "todo-list-js",
    name: "To-Do-List-",
    url: `https://github.com/${GITHUB_USER}/To-Do-List-`,
    tech: ["JavaScript", "HTML5", "CSS3"],
    colors: ["#f1eef6", "#ebe8f4", "#e4e0f0", "#ddd8ec"],
    description: {
      ru: "JavaScript-версия To-Do приложения с динамическим управлением задачами.",
      en: "JavaScript to-do app with dynamic task management.",
      hy: "To-Do հավելվածի JavaScript տարբերակ՝ դինամիկ առաջադրանքների կառավարմամբ։",
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
    <article class="project-card reveal${index % 3 === 1 ? " delay-1" : index % 3 === 2 ? " delay-2" : ""}" data-project-id="${project.id}">
      <div class="project-card__shine" aria-hidden="true"></div>
      <h3 class="project-card__title">${project.name}</h3>
      <button type="button" class="btn btn--ghost project-card__btn" data-open-project="${project.id}">
        ${t("projects.open")}
      </button>
    </article>
  `
    )
    .join("");

  grid.querySelectorAll("[data-open-project]").forEach((btn) => {
    btn.addEventListener("click", () => openProjectModal(btn.dataset.openProject));
  });

  if (window.PortfolioAnimations?.observeReveal) {
    PortfolioAnimations.observeReveal(grid.querySelectorAll(".reveal"));
  }
}

function updateProjectLabels() {
  document.querySelectorAll(".project-card__btn").forEach((btn) => {
    btn.textContent = t("projects.open");
  });

  const modal = document.getElementById("projectModal");
  if (modal && !modal.hidden && activeProjectId) {
    fillModalContent(activeProjectId);
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

  const githubBtn = document.getElementById("modalGithubBtn");
  githubBtn.href = project.url;
  githubBtn.textContent = t("projects.openProject");

  renderGallery(project, activeSlideIndex);
}

function renderGallery(project, index) {
  const slides = project.colors;
  const safeIndex = ((index % slides.length) + slides.length) % slides.length;
  activeSlideIndex = safeIndex;

  const main = document.getElementById("modalGalleryMain");
  main.style.background = slides[safeIndex];
  main.setAttribute("aria-label", `${project.name} preview ${safeIndex + 1}`);

  const track = document.getElementById("modalGalleryTrack");
  track.innerHTML = slides
    .map(
      (color, i) => `
    <button
      type="button"
      class="modal-thumb${i === safeIndex ? " active" : ""}"
      style="background:${color}"
      data-slide="${i}"
      aria-label="Slide ${i + 1}"
    ></button>
  `
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
  document.body.classList.add("modal-open");

  requestAnimationFrame(() => modal.classList.add("is-visible"));
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  modal.classList.remove("is-visible");
  document.body.classList.remove("modal-open");

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
  renderProjectCards,
};
