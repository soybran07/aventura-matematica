'use strict';
const BalamRuta = (() => {
  const orden = Object.freeze([5, 6, 12, 0, 1, 2, 3, 4, 7, 8, 9, 10, 11]);
  const numero = w => orden.indexOf(w) + 1;
  const siguiente = w => orden[numero(w)] ?? null;
  const pendiente = completo => orden.find(w => !completo(w)) ?? null;
  const disponible = (w, completo) => numero(w) > 0 && orden.slice(0, numero(w) - 1).every(completo);
  const base = typeof document !== 'undefined' && document.currentScript?.src ? new URL('.', document.currentScript.src).href : null;
  function avanceLocal(w) {
    try {
      if(w===12)return localStorage.getItem('balam-examen-posicional-v1')==='completo';
      const mult = w >= 7;
      const datos = JSON.parse(localStorage.getItem(mult ? 'balam-multiplicacion-v1' : 'balam-aventura-v3') || '{}');
      const total = w === 5 ? 10 : w === 6 ? 8 : 6;
      return ['apoyo', 'practica', 'reto'].some(r => {
        const estado = datos[(mult ? w - 7 : w) + '-' + r];
        return estado?.done === total && estado.records?.length === total;
      });
    } catch { return false; }
  }
  function enlace(w) {
    if (window.BALAM_APP) return window.BALAM_APP + '?nivel=' + (w + 1);
    const ruta = w === 12 ? 'examen/' : w === 5 ? './' : w === 6 ? 'numero-secreto.html' : w >= 7 ? 'multiplicacion/?juego=' + (w - 6) : 'sumas/?nivel=' + (w + 1);
    return new URL(ruta, base).href;
  }
  function bloqueo(w) {
    if (window.ClassroomLink || disponible(w, avanceLocal)) return null;
    const actual = pendiente(avanceLocal);
    return '<div class="eyebrow">Ruta de Balam</div><h2>Nivel ' + numero(w) + ' bloqueado</h2><p>Completa los niveles en orden. Tu siguiente nivel es el ' + numero(actual) + '.</p><div class="actions"><a class="ruta-link" href="' + enlace(actual) + '">Ir al nivel ' + numero(actual) + '</a></div>';
  }
  function botonSiguiente(w) {
    const n = siguiente(w);
    return n === null ? '<strong>¡Completaste los 13 niveles!</strong>' : '<a class="ruta-link" href="' + enlace(n) + '" target="_top">Siguiente: nivel ' + numero(n) + '</a>';
  }
  function activarScroll(root) {
    const area = root.querySelector('.lectura'), button = root.querySelector('.ver-mas');
    if (!area || !button) return;
    function actualizar() {
      const max = area.scrollHeight - area.clientHeight;
      button.hidden = max <= 3;
      button.textContent = area.scrollTop >= max - 3 ? 'Subir ↑' : 'Ver más ↓';
    }
    button.onclick = () => {
      const max = area.scrollHeight - area.clientHeight;
      area.scrollTop = area.scrollTop >= max - 3 ? 0 : Math.min(max, area.scrollTop + Math.max(60, area.clientHeight - 36));
      actualizar();
    };
    area.addEventListener('scroll', actualizar);
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => {
        if (!area.isConnected) observer.disconnect();
        else actualizar();
      });
      observer.observe(area);
      observer.observe(area.firstElementChild);
    }
    actualizar();
  }
  return {orden, numero, siguiente, pendiente, disponible, avanceLocal, bloqueo, botonSiguiente, activarScroll};
})();
