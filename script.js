document.addEventListener("DOMContentLoaded", () => {
  console.log("[main page] js run");

  const root = document.querySelector(".logger");

  const btnClose = document.querySelector(".btn-close");
  const btnBackShow = document.querySelector(".btn-back-show");
  const btnBackHide = document.querySelector(".btn-back-hide");

  btnClose.addEventListener("click", () => {
    sendMessage("WebAppClose");
  });

  btnBackShow.addEventListener("click", () => {
    sendMessage("WebAppSetupBackButton", { isVisible: true });
  });

  btnBackHide.addEventListener("click", () => {
    sendMessage("WebAppSetupBackButton", { isVisible: false });
  });

  function sendMessage(event, options) {
    // window.parent.postMessage(JSON.stringify({ type: event, ...options }), "https://web.max.ru");
    window.WebViewHandler.postEvent(event, JSON.stringify(options));
    // renderContent(window.WebViewHandler);
  }

  window.addEventListener("message", function (event) {
    if (event.origin === "https://web.max.ru") {
      console.log("my script go!");
      console.log(JSON.parse(event.data));
    }
  });

  function renderContent(content) {
    console.log(content);
    const div = document.createElement("div");
    div.textContent = content ? JSON.stringify(content) : "undefined";
    root.appendChild(div);
  }
});
