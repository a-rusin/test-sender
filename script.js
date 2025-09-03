document.addEventListener("DOMContentLoaded", () => {
  console.log("[main page] js run");

  const btnClose = document.querySelector(".btn-close");
  const btnBackShow = document.querySelector(".btn-back-show");
  const btnBackHide = document.querySelector(".btn-back-hide");

  btnClose.addEventListener("click", () => {
    sendMessage({ type: "WebAppClose" });
  });

  btnBackShow.addEventListener("click", () => {
    sendMessage({ type: "WebAppSetupBackButton", isVisible: true });
  });

  btnBackHide.addEventListener("click", () => {
    sendMessage({ type: "WebAppSetupBackButton", isVisible: false });
  });

  function sendMessage(event) {
    console.log(event);
    // window.parent.postMessage(JSON.stringify(event), "https://web.max.ru");
    window.WebViewHandler.postMessage(JSON.stringify(event), "https://web.max.ru");
  }

  window.addEventListener("message", function (event) {
    if (event.origin === "https://web.max.ru") {
      console.log("my script go!");
      console.log(JSON.parse(event.data));
    }
  });
});
