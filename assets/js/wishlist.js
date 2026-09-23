/* ============================================================
   Wishlist page
   ============================================================ */
function renderWishlist() {
  const ids = Wishlist.all();
  const cars = ids.map(getCar).filter(Boolean);
  const grid = document.getElementById('wishGrid');
  const empty = document.getElementById('wishEmpty');
  document.getElementById('wishCount').textContent = cars.length;

  if (!cars.length) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  grid.innerHTML = cars.map((c, i) => carCard(c, 'd' + (i % 4))).join('');
  setTimeout(initReveal, 40);
}

function clearWishlist() {
  localStorage.setItem('sw-wishlist', '[]');
  Wishlist.updateCount();
  renderWishlist();
  toast('Wishlist cleared');
}

// re-render when a heart is toggled on this page
const _origOnWish = window.onWish;
window.onWish = function (btn) {
  _origOnWish(btn);
  setTimeout(renderWishlist, 50);
};

document.addEventListener('DOMContentLoaded', () => {
  mount('wishlist.html');
  renderWishlist();
});
