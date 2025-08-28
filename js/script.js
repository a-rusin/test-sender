document.addEventListener("DOMContentLoaded", () => {
  const isDevMode = true;

  const CSS_CLASS_SCREEN_ACTIVE = "screen-active";
  const CSS_CLASS_SCREEN_HIDE = "screen-hide";
  const CSS_CLASS_BODY_HIDE_BG = "feature-active";
  const CSS_CLASS_ACTIVE_FEATURE_BOTTOM_BTN = "active";

  const body = document.querySelector("body");

  const featuresMainScreen = document.querySelectorAll(".feature");
  const allScreens = document.querySelectorAll("[data-screen-item]");
  const mainScreen = document.querySelector(".main-screen");

  const featureBottomBtn = document.querySelector(".fixed-btn");

  initBackBtn();

  featuresMainScreen.forEach((feature) => {
    feature.addEventListener("click", () => {
      const featureAtr = feature.getAttribute("data-feature-item");

      if (featureAtr) {
        showFeatureSection(featureAtr);
      }
    });
  });

  function showFeatureSection(featureDataAtr) {
    const featureSection = document.querySelector(`.feature-screen[data-screen-item="${featureDataAtr}"]`);
    controlContent(featureSection);
  }

  function controlContent(activeScreen) {
    allScreens.forEach((screen) => {
      if (screen === activeScreen) {
        screen.classList.add(CSS_CLASS_SCREEN_ACTIVE);
        screen.classList.remove(CSS_CLASS_SCREEN_HIDE);
      } else {
        screen.classList.add(CSS_CLASS_SCREEN_HIDE);
        screen.classList.remove(CSS_CLASS_SCREEN_ACTIVE);
      }
    });

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
});
