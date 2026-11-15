// Light / dark mode. Follows the device until someone uses the sun/moon toggle in the header;
// that choice is remembered on this device (localStorage "rjy-theme").
(function () {
  var root = document.documentElement;
  var deviceDark = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function saved() {
    try {
      var t = localStorage.getItem("rjy-theme");
      return t === "light" || t === "dark" ? t : null;
    } catch (e) {
      return null;
    }
  }
  function current() {
    return saved() || (deviceDark && deviceDark.matches ? "dark" : "light");
  }
  function apply(theme) {
    root.setAttribute("data-theme", theme);
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < metas.length; i++) metas[i].setAttribute("content", theme === "dark" ? "#000000" : "#ffffff");
    var button = document.querySelector(".theme-toggle");
    if (button) button.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }

  apply(current());
  document.addEventListener("DOMContentLoaded", function () { apply(current()); });
  if (deviceDark && deviceDark.addEventListener) {
    deviceDark.addEventListener("change", function () { if (!saved()) apply(current()); });
  }
  document.addEventListener("click", function (e) {
    var button = e.target.closest ? e.target.closest(".theme-toggle") : null;
    if (!button) return;
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    try { localStorage.setItem("rjy-theme", next); } catch (err) {}
    apply(next);
  });
})();
