document.addEventListener("DOMContentLoaded", () => {
  console.log("[main page] js run");

  const iframe = document.querySelector("#my-iframe");

  const btnTest = document.querySelector(".btn-test");
  const btnClose = document.querySelector(".btn-close");

  btnClose.addEventListener("click", () => {
    sendMessage("close");
  });

  btnTest.addEventListener("click", () => {
    sendMessage("test");
  });

  function sendMessage(eventType) {
    const data = { eventType };
    iframe.contentWindow.postMessage(JSON.stringify(data), "*");
  }
});
