// Aviso de cookies y carga de Google Analytics solo con consentimiento.
// La decisión se guarda en el navegador (localStorage) y se puede cambiar
// desde el enlace "Configurar cookies" del pie de página.
(function () {
  var aviso = document.getElementById("aviso-cookies");
  if (!aviso) return;
  var id = aviso.getAttribute("data-ga");
  var CLAVE = "ampa-cookies";

  function leer() { try { return localStorage.getItem(CLAVE); } catch (e) { return null; } }
  function guardar(v) { try { localStorage.setItem(CLAVE, v); } catch (e) {} }

  function cargarGA() {
    if (window.gaCargado || !id) return;
    window.gaCargado = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", id, { anonymize_ip: true });
  }

  function borrarCookiesGA() {
    document.cookie.split(";").forEach(function (c) {
      var n = c.split("=")[0].trim();
      if (n === "_ga" || n.indexOf("_ga_") === 0 || n === "_gid") {
        document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      }
    });
  }

  function decidir(v) {
    guardar(v);
    aviso.hidden = true;
    if (v === "si") cargarGA(); else borrarCookiesGA();
  }

  aviso.addEventListener("click", function (ev) {
    var b = ev.target.closest("button[data-cookies]");
    if (b) decidir(b.getAttribute("data-cookies"));
  });
  document.addEventListener("click", function (ev) {
    if (ev.target.closest("[data-cookies-abrir]")) { ev.preventDefault(); aviso.hidden = false; }
  });

  var actual = leer();
  if (actual === "si") cargarGA();
  else if (actual !== "no") aviso.hidden = false;
})();
