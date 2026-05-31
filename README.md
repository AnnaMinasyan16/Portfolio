# Anna Minasyan - Portfolio

Современный, минималистичный и премиальный персональный landing page-портфолио, реализованный на чистом `HTML5`, `CSS3` и `Vanilla JavaScript` без фреймворков и UI-библиотек.

## О проекте

- аккуратная визуальная система (soft glassmorphism, pastel palette, clean spacing),
- продуманная архитектура файлов,
- плавные и деликатные micro-interactions,
- полностью адаптивный интерфейс,
- мультиязычность с динамическим переводом контента.

## Стек (Strict)

- `HTML5`
- `CSS3`
- `Vanilla JavaScript`

## Ключевые возможности

- Полноценный landing page с секциями:
  - Hero
  - About
  - Skills
  - Education & Courses
  - Languages
  - Personal Qualities
  - Contact
  - Footer
- Мультиязычность: `RU` (по умолчанию), `EN`, `HY`
  - централизованный словарь переводов,
  - динамическая смена всех текстов на странице,
  - сохранение выбранного языка в `localStorage`.
- UI-анимации и эффекты:
  - scroll reveal,
  - typing effect,
  - progress bar по скроллу,
  - custom cursor,
  - subtle parallax background shapes,
  - hover/focus micro-interactions,
  - lightweight tilt для skill cards.
- Социальные SVG-иконки в `assets/icons`.
- Базовые accessibility-практики:
  - semantic HTML,
  - `aria-label` для интерактивных элементов,
  - `:focus-visible`,
  - `prefers-reduced-motion` fallback.

## Структура проекта

```text
Portfolio/
|- index.html
|- README.md
|- css/
|  |- style.css
|  |- animations.css
|  |- responsive.css
|- js/
|  |- app.js
|  |- translations.js
|  |- animations.js
|- assets/
   |- images/
   |- icons/
      |- github.svg
      |- linkedin.svg
      |- mail.svg
```

## Быстрый старт

1. Скачайте или клонируйте проект.
2. Откройте папку проекта.
3. Запустите `index.html` в браузере.

Для корректной локальной разработки рекомендуется использовать Live Server (или любой локальный static server), хотя проект работает и как обычный статический сайт.

## Конфигурация и кастомизация

### 1) Контакты и ссылки

Обновите в `index.html`:

- GitHub ссылку (`href` в social/contact блоках),
- LinkedIn ссылку,
- ссылку на CV в кнопке `Download CV`.

### 2) Тексты и переводы

Все переводы находятся в:

- `js/translations.js`

Добавляйте/редактируйте ключи в объектах `ru`, `en`, `hy`, затем используйте соответствующий `data-i18n` в HTML.

### 3) Визуальная тема

Основные дизайн-токены находятся в:

- `css/style.css` (`:root` переменные цветов, радиусов, теней)

### 4) Анимации

- Логика reveal/parallax/progress: `js/animations.js`
- Общая интерактивность, typing, nav, cursor: `js/app.js`
- Keyframes и motion-поведение: `css/animations.css`

## Производительность и качество кода

- Чистая модульная структура (разделение layout/styles/animations/logic/translations)
- Отсутствие heavy dependencies
- Плавные, но не перегруженные эффекты
- Оптимальная основа для дальнейшего масштабирования (мультиязычность, контентные блоки, интеграция форм)


## Автор

**Anna Minasyan**  
Front-End Developer

- Email: [annaminasyan1016@gmail.com](mailto:annaminasyan1016@gmail.com)
- Phone: `+37498399513`

