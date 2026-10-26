// Menú desplegable accesible para móvil.
// Sin este script el menú sigue siendo un enlace normal (funciona
// igualmente, solo que siempre visible), así que un fallo aquí
// nunca deja la web inutilizable.
document.addEventListener("DOMContentLoaded", function () {
  var boton = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!boton || !nav) return;

  boton.addEventListener("click", function () {
    var abierto = nav.classList.toggle("abierto");
    boton.setAttribute("aria-expanded", abierto ? "true" : "false");
  });
});
