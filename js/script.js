document.addEventListener("DOMContentLoaded", () => {
  const isDevMode = true;

  const CSS_CLASS_SCREEN_HIDE = "screen-hide";
  const CSS_CLASS_BODY_HIDE_BG = "feature-active";
  const CSS_CLASS_ACTIVE_FEATURE_BOTTOM_BTN = "active";

  const body = document.querySelector("body");

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

  initBackBtn();

  featuresMainScreen.forEach((feature) => {
    feature.addEventListener("click", () => {
      const featureAtr = feature.getAttribute("data-feature-item");

      if (featureAtr) {
        showFeatureSection(featureAtr);
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 200);
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
    textarea.value = text;
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
      body.classList.add(CSS_CLASS_BODY_HIDE_BG);
      featureBottomBtn.classList.add(CSS_CLASS_ACTIVE_FEATURE_BOTTOM_BTN);
    } else {
      body.classList.remove(CSS_CLASS_BODY_HIDE_BG);
      featureBottomBtn.classList.remove(CSS_CLASS_ACTIVE_FEATURE_BOTTOM_BTN);
    }
  }

  function initBackBtn() {
    if (isDevMode) {
      const devBtnBack = document.querySelector(".dev-btn");
      if (devBtnBack) {
        devBtnBack.style.display = "block";
        devBtnBack.addEventListener("click", () => {
          controlContent(mainScreen);
        });
      }
    } else {
      // logic for backButton MAX bot app
    }
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
});
