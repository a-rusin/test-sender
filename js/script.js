document.addEventListener("DOMContentLoaded", () => {
  const PAGE_MAIN_URL = "https://a-rusin.github.io/test-sender/";
  const PAGE_HOST = "a-rusin.github.io";

  const isDevMode = window.location.host === PAGE_HOST ? false : true;

  let isOpenFooterLink = false;
  const footerUrls = document.querySelectorAll(".main-screen__footer-url");

  const CSS_ANIMATION_DURATION = 200;

  const CSS_CLASS_SCREEN_HIDE = "screen-hide";
  const CSS_CLASS_ACTIVE_FEATURE_BOTTOM_BTN = "active";

  const screenContentSection = document.querySelector(".screen-content");
  const allScreens = document.querySelectorAll("[data-screen-item]");
  const mainScreen = document.querySelector(".main-screen");

  const featuresMainScreen = document.querySelectorAll(".feature");
  const featuresCmdsSections = document.querySelectorAll(".cmd-item");

  const featureBottomBtn = document.querySelector(".fixed-btn");

  const toasterSection = document.querySelector(".copy-label");
  const toasterSectionSuccessMsg = document.querySelector(".copy-label__text_success");
  const toasterSectionErrorMsg = document.querySelector(".copy-label__text_error");
  const TOASTER_STATUS = {
    SUCCESS: "success",
    ERROR: "error",
  };
  let successMsgTimerId;

  const fixedCtaBtn = document.querySelector(".fixed-btn__btn");

  const iframe = document.querySelector(".iframe");

  initBackBtn();

  featuresMainScreen.forEach((feature) => {
    feature.addEventListener("click", () => {
      const featureAtr = feature.getAttribute("data-feature-item");

      if (featureAtr) {
        isOpenFooterLink = false;
        showFeatureSection(featureAtr);
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, CSS_ANIMATION_DURATION);
        WebApp.BackButton.show();
      }
    });
  });

  featuresCmdsSections.forEach((cmd) => {
    cmd.addEventListener("click", () => {
      const copyText = cmd.querySelector(".cmd-item__text");

      if (copyText && copyText.textContent) {
        fallbackCopyTextToClipboard(copyText.textContent);
        showToaster();
      }
    });
  });

  // Функция для fallback метода копирования
  function fallbackCopyTextToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text
      .replace(/(\r\n|\n)/g, "")
      .replace(/\s+/g, " ")
      .trim();
    textarea.style.position = "fixed"; // Избегаем скроллинга страницы
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand("copy");
      console.log("[DEBUG INFO]: Текст успешно скопирован!");
      changeToasterContent(TOASTER_STATUS.SUCCESS);
    } catch (err) {
      console.error("[DEBUG INFO]: Ошибка при копировании: ", err);
      changeToasterContent(TOASTER_STATUS.ERROR);
    }

    document.body.removeChild(textarea);
  }

  function showFeatureSection(featureDataAtr) {
    const featureSection = document.querySelector(`.feature-screen[data-screen-item="${featureDataAtr}"]`);
    controlContent(featureSection);
  }

  function controlContent(activeScreen) {
    allScreens.forEach((screen) => screen.classList.add(CSS_CLASS_SCREEN_HIDE));
    activeScreen.classList.remove(CSS_CLASS_SCREEN_HIDE);

    if (activeScreen !== mainScreen) {
      featureBottomBtn.classList.add(CSS_CLASS_ACTIVE_FEATURE_BOTTOM_BTN);
    } else {
      featureBottomBtn.classList.remove(CSS_CLASS_ACTIVE_FEATURE_BOTTOM_BTN);
    }

    setTimeout(() => {
      const sectionHeight = activeScreen.offsetHeight;
      screenContentSection.style.height = `${sectionHeight}px`;
    }, CSS_ANIMATION_DURATION);
  }

  function initBackBtn() {
    if (isDevMode) {
      const devBtnBack = document.querySelector(".dev-btn");
      if (devBtnBack) {
        devBtnBack.style.display = "block";
        devBtnBack.addEventListener("click", backBtnHandler);
      }
    } else {
      WebApp.BackButton.onClick(backBtnHandler);
    }
  }

  function backBtnHandler() {
    if (isOpenFooterLink) {
      iframe.classList.remove("active");
      isOpenFooterLink = false;
      WebApp.BackButton.hide();
    } else {
      controlContent(mainScreen);
      WebApp.BackButton.hide();
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, CSS_ANIMATION_DURATION);
    }
  }

  footerUrls.forEach((url) => {
    url.addEventListener("click", (e) => {
      e.preventDefault();
      isOpenFooterLink = true;
      WebApp.BackButton.show();
      const urlHref = url.getAttribute("href");
      loadInIframe(urlHref);
    });
  });

  function loadInIframe(url) {
    iframe.classList.add("active");
    iframe.src = url; // Устанавливает новый URL для iframe
  }

  function changeToasterContent(type) {
    if (type === TOASTER_STATUS.SUCCESS) {
      toasterSectionSuccessMsg.style.display = "block";
      toasterSectionErrorMsg.style.display = "none";
    } else if (type === TOASTER_STATUS.ERROR) {
      toasterSectionSuccessMsg.style.display = "none";
      toasterSectionErrorMsg.style.display = "block";
    }
  }

  function showToaster() {
    if (toasterSection.classList.contains("active")) {
      toasterSection.classList.remove("active");

      if (successMsgTimerId) {
        clearTimeout(successMsgTimerId);
      }

      successMsgTimerId = setTimeout(() => {
        toasterSection.classList.add("active");
      }, 10);
    } else {
      toasterSection.classList.add("active");
    }
  }

  fixedCtaBtn.addEventListener("click", () => {
    WebApp.close();
  });
});
