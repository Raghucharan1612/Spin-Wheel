/* Home page logic */
mount('index.html');

const MOODS = [
  ['family', 'Family Trip', 'bi-people'],
  ['commute', 'Daily Commute', 'bi-building'],
  ['adventure', 'Adventure', 'bi-tree'],
  ['luxury', 'Luxury', 'bi-gem'],
  ['first', 'First Car', 'bi-stars']
];

/* brand dropdown */
const hBrand = document.getElementById('hBrand');
BRANDS.forEach(b => hBrand.insertAdjacentHTML('beforeend', `<option value="${b.name}">${b.name}</option>`));

function heroSearch() {
  const p = new URLSearchParams();
  const brand = document.getElementById('hBrand').value;
  const budget = document.getElementById('hBudget').value;
  const fuel = document.getElementById('hFuel').value;
  if (brand) p.set('brand', brand);
  if (budget) p.set('budget', budget);
  if (fuel) p.set('fuel', fuel);
  location.href = 'cars.html?' + p.toString();
}

/* Skeleton then featured cars */
const fg = document.getElementById('featuredGrid');
fg.innerHTML = Array(4).fill('<div class="glass sk-card skeleton"></div>').join('');
setTimeout(() => {
  fg.innerHTML = CARS.slice(0, 4).map((c, i) => carCard(c, 'd' + (i % 4))).join('');
  initReveal();
}, 700);

/* brands */
document.getElementById('brandGrid').innerHTML = BRANDS.map((b, i) => `
  <a href="cars.html?brand=${b.name}" class="glass brand-chip reveal d${i % 4}">
    <div class="brand-logo">${b.abbr}</div>
    <div class="brand-name">${b.name}</div>
    <div class="brand-count">${b.count}+ cars</div>
  </a>`).join('');

/* why */
document.getElementById('whyGrid').innerHTML = WHY.map((w, i) => `
  <div class="col-md-6 col-lg-4">
    <div class="glass feature-card reveal d${i % 3}">
      <div class="feature-ico"><i class="bi ${w.icon}"></i></div>
      <h4>${w.title}</h4>
      <p>${w.text}</p>
    </div>
  </div>`).join('');

/* reviews */
document.getElementById('reviewGrid').innerHTML = REVIEWS.map((r, i) => `
  <div class="col-md-6 col-lg-3">
    <div class="glass review-card reveal d${i % 4}">
      <div class="review-stars">${'<i class="bi bi-star-fill"></i>'.repeat(r.stars)}${'<i class="bi bi-star"></i>'.repeat(5 - r.stars)}</div>
      <p class="review-text">"${r.text}"</p>
      <div class="review-author">
        <div class="review-avatar">${r.name[0]}</div>
        <div><div style="font-weight:600">${r.name}</div><div style="color:var(--muted-2);font-size:.8rem">${r.city}</div></div>
      </div>
    </div>
  </div>`).join('');

/* faq */
document.getElementById('faqList').innerHTML = FAQS.map((f, i) => `
  <div class="faq-item ${i === 0 ? 'open' : ''}">
    <div class="faq-q">${f.q}<i class="bi bi-plus-lg"></i></div>
    <div class="faq-a"><p class="pt-2 mb-0">${f.a}</p></div>
  </div>`).join('');

/* mood */
document.getElementById('moodBtns').innerHTML = MOODS.map(([k, label, ic], i) =>
  `<button class="mood-btn ${i === 0 ? 'active' : ''}" data-mood="${k}"><i class="bi ${ic} me-1"></i>${label}</button>`).join('');

function renderMood(mood) {
  const res = CARS.filter(c => c.moods.includes(mood)).sort((a, b) => b.match - a.match).slice(0, 3);
  document.getElementById('moodResult').innerHTML = res.map(c => `
    <div class="col-md-4 col-6">
      <a href="car.html?id=${c.id}" class="d-block glass p-2" style="border-radius:14px">
        <img src="${c.img}" style="width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:10px">
        <div style="font-weight:600;font-size:.85rem;margin-top:8px">${c.name.split(' ').slice(0, 2).join(' ')}</div>
        <div class="d-flex justify-content-between align-items-center"><span style="color:var(--muted-2);font-size:.78rem">${inr(c.price)}</span><span class="tag-soft">${c.match}%</span></div>
      </a>
    </div>`).join('');
}
document.getElementById('moodBtns').addEventListener('click', e => {
  const b = e.target.closest('.mood-btn'); if (!b) return;
  document.querySelectorAll('#moodBtns .mood-btn').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  renderMood(b.dataset.mood);
});
renderMood('family');

/* AI match circle */
const matchObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const score = 92;
      const circ = 402, off = circ - (circ * score / 100);
      e.target.querySelector('.bar').style.strokeDashoffset = off;
      let n = 0; const val = e.target.querySelector('.val');
      const t = setInterval(() => { n++; val.textContent = n + '%'; if (n >= score) clearInterval(t); }, 14);
      matchObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
matchObs.observe(document.getElementById('matchCircle'));

/* recently viewed */
const recent = Recent.all();
if (recent.length) {
  document.getElementById('recentSection').style.display = '';
  document.getElementById('recentGrid').innerHTML = recent.map(id => getCar(id)).filter(Boolean).map((c, i) => carCard(c, 'd' + (i % 4))).join('');
}
