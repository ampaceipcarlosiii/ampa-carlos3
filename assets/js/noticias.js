// Scroll infinito de la lista de noticias.
// Muestra las primeras noticias y, al acercarse al final de la página,
// va destapando las siguientes. Sin JavaScript (o en un navegador muy
// antiguo) la lista se ve entera, así que nunca se pierde ninguna noticia.
function initNoticias(raiz) {
  var lista = (raiz || document).querySelector(".noticias-lista");
  if (!lista || lista.dataset.listo) return;
  lista.dataset.listo = "1";
  var items = Array.prototype.slice.call(lista.children);
  var lote = parseInt(lista.getAttribute("data-lote"), 10) || 6;
  var mostradas = 0;
  if (items.length <= lote || !("IntersectionObserver" in window)) return;

  var fin = document.createElement("p");
  fin.className = "noticias-fin";
  fin.hidden = true;
  fin.textContent = lista.getAttribute("data-fin") || "";
  lista.parentNode.insertBefore(fin, lista.nextSibling);

  var centinela = document.createElement("div");
  centinela.className = "noticias-centinela";
  centinela.setAttribute("aria-hidden", "true");
  lista.parentNode.insertBefore(centinela, fin);

  function mostrarMas() {
    var hasta = Math.min(mostradas + lote, items.length);
    for (var i = mostradas; i < hasta; i++) {
      items[i].hidden = false;
      items[i].classList.add("aparece");
    }
    mostradas = hasta;
    if (mostradas >= items.length) {
      obs.disconnect();
      centinela.remove();
      fin.hidden = false;
    }
  }

  items.forEach(function (li) { li.hidden = true; });
  var obs = new IntersectionObserver(function (entradas) {
    if (entradas[0].isIntersecting) mostrarMas();
  }, { rootMargin: "300px 0px" });
  mostrarMas();
  obs.observe(centinela);
}
document.addEventListener("DOMContentLoaded", function () { initNoticias(); });
