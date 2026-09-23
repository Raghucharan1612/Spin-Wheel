/* ============================================================
   Sell page — multi-step valuation
   ============================================================ */
let sellCondition = 'Excellent';
const CONDITIONS = [
  { k: 'Excellent', mult: 1.0, icon: 'bi-stars' },
  { k: 'Good', mult: 0.88, icon: 'bi-hand-thumbs-up' },
  { k: 'Fair', mult: 0.74, icon: 'bi-dash-circle' },
  { k: 'Needs Work', mult: 0.58, icon: 'bi-tools' }
];

const SELL_BENEFITS = [
  ['bi-cash-coin', 'Best price guaranteed', 'We beat any genuine dealer quote or pay you the difference.'],
  ['bi-truck', 'Free doorstep pickup', 'Our team collects the car from your home at no cost.'],
  ['bi-file-earmark-check', 'Instant paperwork', 'RC transfer and NOC handled end-to-end by us.'],
  ['bi-lightning-charge', 'Same-day payment', 'Money hits your account within hours of pickup.']
];

function initSell() {
  // Brand
  const brand = document.getElementById('sBrand');
  brand.innerHTML = BRANDS.map(b => `<option>${b.name}</option>`).join('');
  // Year
  const year = document.getElementById('sYear');
  const now = 2026;
  let yr = '';
  for (let y = now; y >= now - 15; y--) yr += `<option>${y}</option>`;
  year.innerHTML = yr;
  year.value = 2022;
  // City
  document.getElementById('sCity').innerHTML = CITIES.map(c => `<option ${c === (localStorage.getItem('sw-city') || 'Mumbai') ? 'selected' : ''}>${c}</option>`).join('');
  // KM
  const km = document.getElementById('sKm');
  const kmLabel = document.getElementById('kmLabel');
  const syncKm = () => kmLabel.textContent = (+km.value).toLocaleString('en-IN') + ' km';
  km.addEventListener('input', syncKm); syncKm();
  // Conditions
  document.getElementById('condGrid').innerHTML = CONDITIONS.map((c, i) => `
    <button type="button" class="cond-btn ${i === 0 ? 'active' : ''}" data-cond="${c.k}" onclick="pickCond(this)">
      <i class="bi ${c.icon}"></i><span>${c.k}</span>
    </button>`).join('');
  // Benefits
  document.getElementById('sellBenefits').innerHTML = SELL_BENEFITS.map(([ic, t, d]) => `
    <li><span class="sb-ico"><i class="bi ${ic}"></i></span><div><b>${t}</b><p>${d}</p></div></li>`).join('');
}

function pickCond(btn) {
  document.querySelectorAll('.cond-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  sellCondition = btn.dataset.cond;
}

function setStep(n) {
  document.querySelectorAll('.sell-step').forEach(s => s.style.display = (+s.dataset.step === n ? 'block' : 'none'));
  document.querySelectorAll('#stepper .step').forEach(s => {
    const sn = +s.dataset.s;
    s.classList.toggle('active', sn === n);
    s.classList.toggle('done', sn < n);
  });
}
function sellNext(n) { setStep(n); window.scrollTo({ top: 200, behavior: 'smooth' }); }

function calcValuation() {
  const year = +document.getElementById('sYear').value;
  const km = +document.getElementById('sKm').value;
  const cond = CONDITIONS.find(c => c.k === sellCondition);
  const ownerSel = document.getElementById('sOwner').value;
  const ownerMult = ownerSel.startsWith('1') ? 1 : ownerSel.startsWith('2') ? 0.92 : 0.84;

  // Base depreciation model
  let base = 1400000;
  const age = 2026 - year;
  base *= Math.pow(0.89, age);          // ~11% per year
  base *= (1 - Math.min(km / 200000, 0.55)); // mileage hit
  base *= cond.mult;
  base *= ownerMult;
  base = Math.max(base, 120000);

  const mid = Math.round(base / 1000) * 1000;
  const low = Math.round(mid * 0.94 / 1000) * 1000;
  const high = Math.round(mid * 1.07 / 1000) * 1000;

  setStep(3);
  document.getElementById('valLow').textContent = inr(low);
  document.getElementById('valHigh').textContent = inr(high);
  animateValue(mid);
}

function animateValue(target) {
  const el = document.getElementById('valAmount');
  const t0 = performance.now(), dur = 1200;
  function step(now) {
    const p = Math.min((now - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = inr(Math.round(target * eased / 1000) * 1000);
    if (p < 1) requestAnimationFrame(step); else el.textContent = inr(target);
  }
  requestAnimationFrame(step);
}

function lockOffer() {
  const phone = document.getElementById('sPhone').value.trim();
  if (phone.length < 10) { toast('Enter a valid mobile number'); return; }
  toast('Offer locked! Our team will call you shortly.');
}

document.addEventListener('DOMContentLoaded', () => {
  mount('sell.html');
  initSell();
});
