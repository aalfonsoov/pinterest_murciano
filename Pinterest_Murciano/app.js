const pins = document.querySelector('.pins');
const allPins = [...document.querySelectorAll('.pin')];

// Guardar orden original (para reordenación estable)
allPins.forEach((pin, i) => {
  pin.dataset.index = String(i);
  pin.dataset.liked = "false";
  pin.dataset.likedAt = "0";
});

// Reordenar: liked primero (más reciente arriba), luego orden original
function sortPins() {
  const list = [...document.querySelectorAll('.pin')];

  list.sort((a, b) => {
    const aLiked = a.dataset.liked === "true";
    const bLiked = b.dataset.liked === "true";

    if (aLiked && !bLiked) return -1;
    if (!aLiked && bLiked) return 1;

    if (aLiked && bLiked) {
      // más reciente primero
      return Number(b.dataset.likedAt) - Number(a.dataset.likedAt);
    }

    return Number(a.dataset.index) - Number(b.dataset.index);
  });

  list.forEach(el => pins.appendChild(el));
}

// Like: cambia icono + reordena
document.addEventListener('click', (e) => {
  const likeBtn = e.target.closest('.like-btn');
  if (likeBtn) {
    const pin = likeBtn.closest('.pin');
    const isLiked = pin.classList.toggle('is-liked');

    pin.dataset.liked = isLiked ? "true" : "false";
    pin.dataset.likedAt = isLiked ? String(Date.now()) : "0";
    likeBtn.setAttribute('aria-pressed', isLiked ? "true" : "false");

    sortPins();
    return;
  }

  // Botón permanente (Guardar): cambia estado y texto
  const actionBtn = e.target.closest('.actionBtn');
  if (actionBtn) {
    const pin = actionBtn.closest('.pin');
    const saved = pin.classList.toggle('is-saved');
    actionBtn.textContent = saved ? "Guardado" : "Guardar";
    return;
  }
});

// Menú lateral móvil (toggle)
const menuBtn = document.getElementById('menuBtn');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const open = document.body.classList.toggle('sidebar-open');
    menuBtn.setAttribute('aria-expanded', open ? "true" : "false");
  });

  // Cerrar sidebar al clicar fuera (móvil)
  document.addEventListener('click', (e) => {
    if (!document.body.classList.contains('sidebar-open')) return;
    const sidebar = document.getElementById('sidebar');
    const inside = sidebar.contains(e.target) || menuBtn.contains(e.target);
    if (!inside) {
      document.body.classList.remove('sidebar-open');
      menuBtn.setAttribute('aria-expanded', "false");
    }
  });
}
