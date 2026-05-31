let savedScrollY = 0;
let lockCount = 0;

function useFixedBodyLock() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function preventBackgroundTouchMove(event) {
  if (
    event.target.closest(
      ".project-modal__body, .certificate-lightbox, .confirm-modal__dialog"
    )
  ) {
    return;
  }
  event.preventDefault();
}

function lockPageScroll() {
  if (lockCount === 0) {
    savedScrollY =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    document.documentElement.classList.add("modal-open");
    document.body.classList.add("modal-open");

    if (useFixedBodyLock()) {
      document.body.classList.add("modal-open--fixed");
      document.body.style.top = `-${savedScrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";

      document.addEventListener("touchmove", preventBackgroundTouchMove, {
        passive: false,
      });
    }
  }

  lockCount += 1;
}

function unlockPageScroll() {
  if (lockCount === 0) return;

  lockCount -= 1;
  if (lockCount > 0) return;

  const scrollY = savedScrollY;
  const hadFixedLock = document.body.classList.contains("modal-open--fixed");

  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  document.body.classList.remove("modal-open--fixed");
  document.documentElement.classList.remove("modal-open");
  document.body.classList.remove("modal-open");
  document.removeEventListener("touchmove", preventBackgroundTouchMove);

  if (hadFixedLock) {
    window.scrollTo(0, scrollY);
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  }
}

window.PageScrollLock = {
  lockPageScroll,
  unlockPageScroll,
};
