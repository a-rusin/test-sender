document.addEventListener("DOMContentLoaded", () => {
  console.log("[main page] js run");

  const root = document.querySelector(".logger");

  const btnClose = document.querySelector(".btn-close");
  const btnBackShow = document.querySelector(".btn-back-show");
  const btnBackHide = document.querySelector(".btn-back-hide");

  const app = window.WebViewHandler;

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
    app.postEvent(event, JSON.stringify(options));
    // renderContent(window.WebViewHandler);
  }

  // app.receiveEvent("WebAppBackButtonPressed", () => {
  //   renderContent("WebAppBackButtonPressed");
  // });

  // window.addEventListener("message", function (event) {
  //   if (event.origin === "https://web.max.ru") {
  //     console.log("my script go!");
  //     console.log(JSON.parse(event.data));
  //   }
  // });

  function renderContent(content) {
    console.log(content);
    const div = document.createElement("div");
    div.textContent = content ? JSON.stringify(content) : "undefined";
    root.appendChild(div);
  }

  // Пример объекта с методами
  class MyClass {
    test = "123";
  }

  MyClass.prototype.hiddenMethod = function () {};

  const myObject = new MyClass();

  // Функция для получения всех методов, включая методы прототипа
  function getAllMethods(obj) {
    const methods = [];
    let currentObj = obj;

    do {
      const properties = Object.getOwnPropertyNames(currentObj);
      properties.forEach((property) => {
        if (typeof obj[property] === "function" && !methods.includes(property)) {
          methods.push(property);
        }
      });
      currentObj = Object.getPrototypeOf(currentObj);
    } while (currentObj);

    return methods;
  }

  // Получение всех методов объекта
  const allMethods = getAllMethods(myObject);
  const allMethods2 = getAllMethods(app);

  // Добавление методов в HTML
  allMethods.forEach((method) => {
    const listItem = document.createElement("div");
    listItem.textContent = method;
    root.appendChild(listItem);
  });

  renderContent(app);
});
