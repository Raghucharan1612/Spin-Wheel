/* Car details logic */
mount('cars.html');

const id = new URLSearchParams(location.search).get('id') || 'creta';
const c = getCar(id) || CARS[0];
Recent.add(c.id);
document.title = c.name + ' — SpinWheel';

const gallery = [c.img, 'assets/img/interior.png', 'assets/img/car-rear.png'];

const features = [
  'Panoramic Sunroof', 'Ventilated Seats', '360° Camera', 'Wireless CarPlay',
  'ADAS Level 2', 'LED Matrix Lights', 'Cruise Control', 'Ambient Lighting',
  'Push Button Start', 'Hill Assist'
];

const wished = Wishlist.has(c.id) ? 'active' : '';

document.getElementById('carContent').innerHTML = `
  <nav style="font-size:.85rem;color:var(--muted);margin-bottom:18px">
    <a href="index.html">Home</a> / <a href="cars.html">Cars</a> / <span style="color:var(--text)">${c.name}</span>
  </nav>

  <div class="row g-4">
    <!-- LEFT: gallery + content -->
    <div class="col-lg-7">
      <div class="reveal">
        <div class="gallery-main glass" style="padding:6px">
          <img id="mainImg" src="${gallery[0]}" alt="${c.name}">
        </div>
        <div class="thumbs">
          ${gallery.map((g, i) => `<div class="thumb ${i === 0 ? 'active' : ''}" onclick="setImg(${i},this)"><img src="${g}" alt="view ${i + 1}"></div>`).join('')}
        </div>
      </div>

      <!-- Specifications -->
      <div class="glass p-4 mt-4 reveal">
        <h4 class="mb-3"><i class="bi bi-list-check text-primary me-2" style="color:var(--primary)"></i>Specifications</h4>
        <table class="spec-table">
          <tr><td>Make Year</td><td>${c.year}</td></tr>
          <tr><td>Kilometres Driven</td><td>${c.km.toLocaleString('en-IN')} km</td></tr>
          <tr><td>Fuel Type</td><td>${c.fuel}</td></tr>
          <tr><td>Transmission</td><td>${c.trans}</td></tr>
          <tr><td>Ownership</td><td>${c.owner}</td></tr>
          <tr><td>Seating Capacity</td><td>${c.seats} Seater</td></tr>
          <tr><td>Registration City</td><td>${c.city}</td></tr>
          <tr><td>Insurance</td><td>Comprehensive (Valid)</td></tr>
        </table>
      </div>

      <!-- Features -->
      <div class="glass p-4 mt-4 reveal">
        <h4 class="mb-3"><i class="bi bi-stars text-primary me-2" style="color:var(--primary)"></i>Top Features</h4>
        <div class="d-flex flex-wrap gap-2">
          ${features.map(f => `<span class="spec-chip"><i class="bi bi-check-circle-fill"></i>${f}</span>`).join('')}
        </div>
      </div>

      <!-- 360 Inspection dashboard -->
      <div class="glass p-4 mt-4 reveal" id="inspectBox">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4 class="mb-0"><i class="bi bi-shield-check text-primary me-2" style="color:var(--primary)"></i>360° Inspection Report</h4>
          <span class="tag-soft">200-Point Certified</span>
        </div>
        ${healthBar('Engine Health', c.health.engine)}
        ${healthBar('Battery Health', c.health.battery)}
        ${healthBar('Tyre Condition', c.health.tyre)}
        ${healthBar('Interior Condition', c.health.interior)}
        ${healthBar('Exterior Condition', c.health.exterior)}
      </div>
    </div>

    <!-- RIGHT: sticky summary -->
    <div class="col-lg-5">
      <div class="glass p-4 reveal" style="position:sticky;top:90px">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <span class="tag-soft mb-2 d-inline-block">${c.brand}</span>
            <h2 style="font-size:1.6rem;font-weight:800;margin:0">${c.name}</h2>
            <div class="rating mt-1"><i class="bi bi-star-fill"></i>${c.rating} <span style="color:var(--muted-2);font-weight:400">(${c.reviews} reviews)</span></div>
          </div>
          <button class="wish-btn ${wished}" style="position:static" data-wish="${c.id}" onclick="onWish(this)"><i class="bi bi-heart-fill"></i></button>
        </div>

        <div class="d-flex align-items-center gap-3 mt-3">
          <div class="big-num" style="font-size:2rem">${inr(c.price)}</div>
          ${c.oldPrice > c.price ? `<div><div style="text-decoration:line-through;color:var(--muted-2);font-size:.9rem">${inr(c.oldPrice)}</div><span class="price-drop-pill"><i class="bi bi-graph-down-arrow"></i>${inr(c.oldPrice - c.price)} drop</span></div>` : ''}
        </div>

        <div class="d-flex gap-2 mt-3">
          <button class="btn btn-glow flex-grow-1" onclick="toast('Test drive booked!')"><i class="bi bi-car-front me-1"></i>Book Test Drive</button>
          <a href="loan.html?price=${c.price}" class="btn btn-ghost"><i class="bi bi-calculator"></i></a>
        </div>
        <p style="color:var(--muted);font-size:.9rem;margin-top:16px">${c.desc}</p>

        <hr class="divider my-3">
        <!-- AI Match -->
        <div class="d-flex align-items-center gap-3">
          <div class="circle-progress" id="matchCircle" style="width:96px;height:96px">
            <svg width="96" height="96">
              <defs><linearGradient id="grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a855f7"/><stop offset="100%" stop-color="#22d3ee"/></linearGradient></defs>
              <circle class="track" cx="48" cy="48" r="40" fill="none" stroke-width="9"/>
              <circle class="bar" cx="48" cy="48" r="40" fill="none" stroke-width="9" stroke-dasharray="251" stroke-dashoffset="251"/>
            </svg>
            <div class="val" style="font-size:1.1rem">0%</div>
          </div>
          <div>
            <div style="font-weight:700">${c.match}% Match For You</div>
            <p style="color:var(--muted);font-size:.84rem;margin:0">AI-scored on price, fuel & lifestyle fit.</p>
          </div>
        </div>

        <hr class="divider my-3">
        <!-- Ownership cost predictor -->
        <h6 class="mb-3"><i class="bi bi-wallet2 text-primary me-1" style="color:var(--primary)"></i>Ownership Cost / month</h6>
        <div class="row g-2 text-center">
          <div class="col-4"><div class="glass p-2" style="border-radius:12px"><div style="font-weight:700;color:var(--primary)">${inr(c.cost.fuel)}</div><div style="font-size:.72rem;color:var(--muted-2)">Fuel</div></div></div>
          <div class="col-4"><div class="glass p-2" style="border-radius:12px"><div style="font-weight:700;color:var(--primary)" id="emiMini">—</div><div style="font-size:.72rem;color:var(--muted-2)">EMI</div></div></div>
          <div class="col-4"><div class="glass p-2" style="border-radius:12px"><div style="font-weight:700;color:var(--primary)">${inr(c.cost.maint)}</div><div style="font-size:.72rem;color:var(--muted-2)">Maintenance</div></div></div>
        </div>

        <hr class="divider my-3">
        <!-- Lifestyle match -->
        <h6 class="mb-2"><i class="bi bi-person-badge text-primary me-1" style="color:var(--primary)"></i>Lifestyle Match</h6>
        <div class="d-flex flex-wrap gap-2 mb-2" id="lifeBtns">
          ${[['bachelor', 'Bachelor'], ['family', 'Family'], ['office', 'Office'], ['adventure', 'Adventure Lover'], ['luxury', 'Luxury']].map((l, i) => `<button class="chip-btn ${i === 1 ? 'active' : ''}" data-life="${l[0]}">${l[1]}</button>`).join('')}
        </div>
        <div class="d-flex align-items-center gap-2">
          <div class="health-track flex-grow-1"><div class="health-fill good" id="lifeFill" style="width:0"></div></div>
          <b id="lifeScore" style="color:var(--primary)">0%</b>
        </div>
      </div>
    </div>
  </div>

  <!-- Similar cars -->
  <section class="section-sm">
    <div class="d-flex justify-content-between align-items-end mb-4">
      <div class="reveal"><span class="eyebrow">You may also like</span><h2 class="section-title" style="font-size:2rem">Similar Cars</h2></div>
    </div>
    <div class="car-grid" id="similarGrid"></div>
  </section>
`;

function healthBar(label, val) {
  const cls = val >= 90 ? 'good' : val >= 80 ? '' : 'mid';
  return `<div class="health-row">
    <div class="d-flex justify-content-between"><span>${label}</span><b style="color:var(--text)">${val}%</b></div>
    <div class="health-track"><div class="health-fill ${cls}" data-health="${val}" style="width:0"></div></div>
  </div>`;
}

function setImg(i, el) {
  const img = document.getElementById('mainImg');
  img.style.opacity = 0;
  setTimeout(() => { img.src = gallery[i]; img.style.opacity = 1; }, 180);
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

/* similar */
document.getElementById('similarGrid').innerHTML = CARS.filter(x => x.id !== c.id && (x.brand === c.brand || x.moods.some(m => c.moods.includes(m)))).slice(0, 4).map((x, i) => carCard(x, 'd' + (i % 4))).join('');

/* EMI mini (default 20% down, 9% 5yr) */
(function () {
  const P = c.price * 0.8, r = 0.09 / 12, n = 60;
  const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  document.getElementById('emiMini').textContent = inr(Math.round(emi));
})();

/* animate health bars + match circle on view */
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.health-fill').forEach(f => f.style.width = f.dataset.health + '%');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const ib = document.getElementById('inspectBox'); if (ib) obs.observe(ib);

const mc = document.getElementById('matchCircle');
const mObs = new IntersectionObserver((ents) => {
  ents.forEach(e => {
    if (e.isIntersecting) {
      const circ = 251, off = circ - circ * c.match / 100;
      e.target.querySelector('.bar').style.strokeDashoffset = off;
      let n = 0; const v = e.target.querySelector('.val');
      const t = setInterval(() => { n++; v.textContent = n + '%'; if (n >= c.match) clearInterval(t); }, 16);
      mObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
if (mc) mObs.observe(mc);

/* lifestyle */
const lifeScores = {
  bachelor: c.seats <= 5 ? 88 : 72, family: c.seats >= 7 ? 96 : 84,
  office: c.trans === 'Automatic' ? 94 : 80, adventure: c.moods.includes('adventure') ? 95 : 70,
  luxury: c.price > 1500000 ? 97 : 78
};
function setLife(key) {
  const s = lifeScores[key] || 80;
  document.getElementById('lifeFill').style.width = s + '%';
  let n = 0; const el = document.getElementById('lifeScore');
  const t = setInterval(() => { n += 2; if (n >= s) { n = s; clearInterval(t); } el.textContent = n + '%'; }, 20);
}
document.getElementById('lifeBtns').addEventListener('click', e => {
  const b = e.target.closest('.chip-btn'); if (!b) return;
  document.querySelectorAll('#lifeBtns .chip-btn').forEach(x => x.classList.remove('active'));
  b.classList.add('active'); setLife(b.dataset.life);
});
setTimeout(() => setLife('family'), 400);

initReveal();
