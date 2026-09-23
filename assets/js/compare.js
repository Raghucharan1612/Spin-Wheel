/* ============================================================
   Compare page
   ============================================================ */
let cmpSlots = ['creta', 'xuv700', 'city'];

function buildSelects() {
  const opts = '<option value="">— Select a car —</option>' +
    CARS.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  document.querySelectorAll('.cmp-select').forEach((sel, i) => {
    sel.innerHTML = opts;
    sel.value = cmpSlots[i] || '';
    sel.addEventListener('change', () => {
      cmpSlots[sel.dataset.slot] = sel.value;
      renderCompare();
    });
  });
}

// rows: [label, accessor, betterFn (higher|lower|none), formatter]
const ROWS = [
  ['Price', c => c.price, 'lower', v => inr(v)],
  ['Match Score', c => c.match, 'higher', v => v + '%'],
  ['Year', c => c.year, 'higher', v => v],
  ['Kilometres', c => c.km, 'lower', v => v.toLocaleString('en-IN') + ' km'],
  ['Fuel', c => c.fuel, 'none', v => v],
  ['Transmission', c => c.trans, 'none', v => v],
  ['Seats', c => c.seats, 'higher', v => v + ' seats'],
  ['Owner', c => c.owner, 'none', v => v],
  ['Rating', c => c.rating, 'higher', v => v + ' ★'],
  ['Engine Health', c => c.health.engine, 'higher', v => v + '%'],
  ['Monthly Fuel', c => c.cost.fuel, 'lower', v => inr(v)],
  ['Monthly Maint.', c => c.cost.maint, 'lower', v => inr(v)],
  ['City', c => c.city, 'none', v => v]
];

function bestIndex(cars, accessor, dir) {
  if (dir === 'none') return -1;
  let best = -1, bestVal = dir === 'higher' ? -Infinity : Infinity;
  cars.forEach((c, i) => {
    if (!c) return;
    const v = accessor(c);
    if ((dir === 'higher' && v > bestVal) || (dir === 'lower' && v < bestVal)) { bestVal = v; best = i; }
  });
  return best;
}

function renderCompare() {
  const cars = cmpSlots.map(id => id ? getCar(id) : null);
  const active = cars.filter(Boolean);
  const table = document.getElementById('cmpTable');

  if (active.length < 2) {
    document.getElementById('cmpWrap').innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-bar-chart-steps" style="font-size:3rem;color:var(--muted-2)"></i>
        <h4 class="mt-3">Select at least 2 cars</h4>
        <p style="color:var(--muted)">Use the dropdowns above to start comparing.</p>
      </div>`;
    return;
  }

  // header
  let head = '<thead><tr><th class="cmp-label">Specification</th>';
  cars.forEach((c, i) => {
    head += c ? `<th>
        <div class="cmp-head">
          <img src="${c.img}" alt="${c.name}">
          <div class="cmp-name">${c.name}</div>
          <div class="cmp-price">${inr(c.price)}</div>
          <div class="cmp-meta"><i class="bi bi-star-fill"></i>${c.rating} · ${c.year} · ${c.fuel}</div>
          <a href="car.html?id=${c.id}" class="btn btn-glow btn-sm btn-pill mt-2">View Details</a>
        </div></th>` : `<th class="cmp-empty"><div class="cmp-add"><i class="bi bi-plus-circle"></i><span>Add a car</span></div></th>`;
  });
  head += '</tr></thead>';

  let body = '<tbody>';
  ROWS.forEach(([label, acc, dir, fmt]) => {
    const best = bestIndex(cars, acc, dir);
    body += `<tr><td class="cmp-label">${label}</td>`;
    cars.forEach((c, i) => {
      if (!c) { body += '<td class="cmp-empty">—</td>'; return; }
      const win = i === best ? ' cmp-best' : '';
      body += `<td class="${win}">${fmt(acc(c))}${i === best ? ' <i class="bi bi-trophy-fill cmp-trophy"></i>' : ''}</td>`;
    });
    body += '</tr>';
  });
  body += '</tbody>';

  table.innerHTML = head + body;
  document.getElementById('cmpWrap').innerHTML = '';
  document.getElementById('cmpWrap').appendChild(table);
}

document.addEventListener('DOMContentLoaded', () => {
  mount('compare.html');
  buildSelects();
  renderCompare();
});
