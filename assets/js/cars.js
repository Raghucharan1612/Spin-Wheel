/* Cars listing logic */
mount('cars.html');

const params = new URLSearchParams(location.search);
const fBrand = document.getElementById('fBrand');
const fFuel = document.getElementById('fFuel');
const fTrans = document.getElementById('fTrans');
const fSort = document.getElementById('fSort');
const fBudget = document.getElementById('fBudget');
const budgetLabel = document.getElementById('budgetLabel');
const grid = document.getElementById('carsGrid');

BRANDS.forEach(b => fBrand.insertAdjacentHTML('beforeend', `<option value="${b.name}">${b.name}</option>`));

/* pre-fill from query */
if (params.get('brand')) fBrand.value = params.get('brand');
if (params.get('fuel')) fFuel.value = params.get('fuel');
if (params.get('budget')) fBudget.value = Math.min(4000000, +params.get('budget'));

function applyFilters(skeleton = false) {
  budgetLabel.textContent = inr(+fBudget.value);
  let list = CARS.filter(c =>
    (!fBrand.value || c.brand === fBrand.value) &&
    (!fFuel.value || c.fuel === fFuel.value) &&
    (!fTrans.value || c.trans === fTrans.value) &&
    c.price <= +fBudget.value
  );
  const q = (params.get('q') || '').toLowerCase();
  if (q) list = list.filter(c => c.name.toLowerCase().includes(q));

  switch (fSort.value) {
    case 'low': list.sort((a, b) => a.price - b.price); break;
    case 'high': list.sort((a, b) => b.price - a.price); break;
    case 'rating': list.sort((a, b) => b.rating - a.rating); break;
    default: list.sort((a, b) => b.match - a.match);
  }

  document.getElementById('resCount').textContent = list.length;
  document.getElementById('emptyState').style.display = list.length ? 'none' : 'block';

  if (skeleton) {
    grid.innerHTML = Array(6).fill('<div class="glass sk-card skeleton"></div>').join('');
    setTimeout(() => { render(list); }, 600);
  } else {
    render(list);
  }
}
function render(list) {
  grid.innerHTML = list.map((c, i) => carCard(c, 'd' + (i % 4))).join('');
  initReveal();
}
function resetFilters() {
  fBrand.value = ''; fFuel.value = ''; fTrans.value = ''; fSort.value = 'match'; fBudget.value = 4000000;
  history.replaceState(null, '', 'cars.html');
  applyFilters(true);
}

[fBrand, fFuel, fTrans, fSort].forEach(el => el.addEventListener('change', () => applyFilters()));
fBudget.addEventListener('input', () => applyFilters());

applyFilters(true);
