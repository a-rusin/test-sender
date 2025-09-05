document.addEventListener("DOMContentLoaded", () => {
  console.log("[main page] js run");

  const root = document.querySelector(".logger");

  const btnClose = document.querySelector(".btn-close");
  const btnBackShow = document.querySelector(".btn-back-show");
  const btnBackHide = document.querySelector(".btn-back-hide");

  const app = window.WebViewHandler;

  btnClose.addEventListener("click", () => {
    // sendMessage("WebAppClose");
    WebApp.close();
    renderContent(window.WebViewHandler);
    // renderContent(window.WebViewHandler);
  });

  btnBackShow.addEventListener("click", () => {
    // sendMessage("WebAppSetupBackButton", { isVisible: true });
    renderContent(window.WebViewHandler);
  });

  btnBackHide.addEventListener("click", () => {
    // sendMessage("WebAppSetupBackButton", { isVisible: false });
  });

  function sendMessage(eventType, options) {
    if (window.WebViewHandler) {
      window.WebViewHandler.postEvent(eventType, JSON.stringify(options));
    } else {
      window.parent.postMessage(JSON.stringify({ type: eventType, ...options }), "https://web.max.ru");
    }
  }

  function isIframe() {
    return typeof window < "u" && window.self !== window.top;
  }

  window.addEventListener("message", function (event) {
    if (event.origin === "https://web.max.ru" && event.data && event.data === '{"type":"WebAppBackButtonPressed"}') {
      // backBtnHandler();
    }
  });

  function renderContent(content) {
    console.log(content);
    const div = document.createElement("div");
    div.textContent = content ? JSON.stringify(content) : "undefined";
    root.appendChild(div);
  }
});
