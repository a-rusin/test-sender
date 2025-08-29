document.addEventListener("DOMContentLoaded", () => {
  console.log("[main page] js run");

  const iframe = document.querySelector("#my-iframe");
  let iframeLoaded = false;

  const btnTest = document.querySelector(".btn-test");
  const btnClose = document.querySelector(".btn-close");

  btnClose.addEventListener("click", () => {
    sendMessage("close");
  });

  btnTest.addEventListener("click", () => {
    sendMessage("test");
  });

  iframe.addEventListener("load", function () {
    iframeLoaded = true;
  });

  function sendMessage(eventType) {
    const data = { eventType };

    if (iframeLoaded) {
      iframe.contentWindow.postMessage(JSON.stringify(data), iframe.src);
    }
  }
});
