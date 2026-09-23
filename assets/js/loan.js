/* ============================================================
   Loan page — EMI calculator + offers
   ============================================================ */
const BANKS = [
  { name: 'HDFC Bank', rate: 8.9, abbr: 'H', tag: 'Lowest Rate' },
  { name: 'ICICI Bank', rate: 9.25, abbr: 'I', tag: 'Fast Approval' },
  { name: 'SBI', rate: 9.6, abbr: 'S', tag: 'No Foreclosure Fee' },
  { name: 'Axis Bank', rate: 9.85, abbr: 'A', tag: '100% Online' }
];

function emi(P, annualRate, months) {
  const r = annualRate / 12 / 100;
  if (r === 0) return P / months;
  return P * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
}

function renderOffers(amount, tenure) {
  document.getElementById('bankOffers').innerHTML = BANKS.map(b => {
    const m = Math.round(emi(amount, b.rate, tenure));
    return `<div class="bank-row">
      <span class="bank-logo">${b.abbr}</span>
      <div class="flex-grow-1">
        <div class="d-flex justify-content-between"><b>${b.name}</b><span class="tag-soft">${b.tag}</span></div>
        <div style="color:var(--muted);font-size:.8rem">${b.rate}% p.a. · EMI ${inr(m)}/mo</div>
      </div>
    </div>`;
  }).join('');
}

function recalc() {
  const amount = +document.getElementById('lAmount').value;
  const rate = +document.getElementById('lRate').value;
  const tenure = +document.getElementById('lTenure').value;

  document.getElementById('lAmtLabel').textContent = inr(amount);
  document.getElementById('lRateLabel').textContent = rate.toFixed(1) + '%';
  document.getElementById('lTenLabel').textContent = tenure + ' months';

  const m = emi(amount, rate, tenure);
  const total = m * tenure;
  const interest = total - amount;

  document.getElementById('emiOut').textContent = inr(Math.round(m));
  document.getElementById('emiPrin').textContent = inr(amount);
  document.getElementById('emiInt').textContent = inr(Math.round(interest));
  document.getElementById('emiTot').textContent = inr(Math.round(total));

  const intPct = (interest / total) * 100;
  document.getElementById('intPct').textContent = intPct.toFixed(0) + '%';
  document.getElementById('emiDonut').style.background =
    `conic-gradient(var(--primary) 0% ${100 - intPct}%, var(--warning) ${100 - intPct}% 100%)`;

  renderOffers(amount, tenure);
}

document.addEventListener('DOMContentLoaded', () => {
  mount('loan.html');
  ['lAmount', 'lRate', 'lTenure'].forEach(id =>
    document.getElementById(id).addEventListener('input', recalc));
  // pre-fill from car details if present (supports ?price= from car page and ?amount=)
  const params = new URLSearchParams(location.search);
  const incoming = params.get('amount') || params.get('price');
  if (incoming) {
    const amtEl = document.getElementById('lAmount');
    // 80% of car price is a sensible default loan amount, clamped to slider range
    const suggested = params.get('amount') ? +incoming : Math.round(+incoming * 0.8 / 50000) * 50000;
    amtEl.value = Math.min(+amtEl.max, Math.max(+amtEl.min, suggested));
  }
  recalc();
});
