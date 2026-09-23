/* ============================================================
   SpinWheel — shared app logic
   ============================================================ */

/* ---------- Theme ---------- */
const Theme = {
  get() { return localStorage.getItem('sw-theme') || 'dark'; },
  set(t) { localStorage.setItem('sw-theme', t); document.documentElement.setAttribute('data-theme', t); Theme.syncIcon(); },
  toggle() { Theme.set(Theme.get() === 'dark' ? 'light' : 'dark'); },
  syncIcon() {
    document.querySelectorAll('[data-theme-icon]').forEach(el => {
      el.className = (Theme.get() === 'dark' ? 'bi bi-moon-stars' : 'bi bi-brightness-high');
    });
  }
};
document.documentElement.setAttribute('data-theme', Theme.get());

/* ---------- Auth (localStorage, demo) ---------- */
const Auth = {
  key: 'sw-user',          // currently signed-in user (session)
  usersKey: 'sw-users',    // registered accounts store
  demo: { email: 'demo@spinwheel.in', password: 'spinwheel', name: 'Demo Driver' },

  /* Registered accounts ------------------------------------------------ */
  users() { try { return JSON.parse(localStorage.getItem(this.usersKey)) || []; } catch { return []; } },
  saveUsers(list) { localStorage.setItem(this.usersKey, JSON.stringify(list)); },
  findByEmail(email) {
    const e = (email || '').trim().toLowerCase();
    return this.users().find(u => u.email === e) || null;
  },
  /* Register a new account. Returns {ok, error?} */
  register({ name, email, phone, password }) {
    email = (email || '').trim().toLowerCase();
    if (this.findByEmail(email) || email === this.demo.email) {
      return { ok: false, error: 'An account with this email already exists.' };
    }
    const list = this.users();
    list.push({ name: name.trim(), email, phone: (phone || '').trim(), password });
    this.saveUsers(list);
    return { ok: true };
  },
  /* Validate credentials. Returns the user object or null. */
  validate(email, password) {
    email = (email || '').trim().toLowerCase();
    if (email === this.demo.email && password === this.demo.password) {
      return { email: this.demo.email, name: this.demo.name };
    }
    const u = this.findByEmail(email);
    if (u && u.password === password) return { email: u.email, name: u.name };
    return null;
  },
  /* Update a stored account's password. Returns true if updated. */
  updatePassword(email, newPassword) {
    email = (email || '').trim().toLowerCase();
    const list = this.users();
    const u = list.find(x => x.email === email);
    if (!u) return false;
    u.password = newPassword;
    this.saveUsers(list);
    return true;
  },

  /* Session -------------------------------------------------------------- */
  user() { try { return JSON.parse(localStorage.getItem(this.key)); } catch { return null; } },
  login(user) { localStorage.setItem(this.key, JSON.stringify(user)); },
  logout() {
    localStorage.removeItem(this.key);
    toast('Signed out');
    setTimeout(() => location.href = 'index.html', 500);
  }
};

/* ---------- Wishlist (localStorage) ---------- */
const Wishlist = {
  key: 'sw-wishlist',
  all() { try { return JSON.parse(localStorage.getItem(this.key)) || []; } catch { return []; } },
  has(id) { return this.all().includes(id); },
  toggle(id) {
    let list = this.all();
    if (list.includes(id)) { list = list.filter(x => x !== id); toast('Removed from wishlist'); }
    else { list.push(id); toast('Added to wishlist'); }
    localStorage.setItem(this.key, JSON.stringify(list));
    this.updateCount();
    return list.includes(id);
  },
  updateCount() {
    const n = this.all().length;
    document.querySelectorAll('[data-wish-count]').forEach(el => {
      el.textContent = n; el.style.display = n ? 'grid' : 'none';
    });
  }
};

/* ---------- Recently viewed ---------- */
const Recent = {
  key: 'sw-recent',
  all() { try { return JSON.parse(localStorage.getItem(this.key)) || []; } catch { return []; } },
  add(id) {
    let list = this.all().filter(x => x !== id);
    list.unshift(id);
    localStorage.setItem(this.key, JSON.stringify(list.slice(0, 6)));
  }
};

/* ---------- Toast ---------- */
function toast(msg) {
  let t = document.getElementById('sw-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'sw-toast';
    t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);background:linear-gradient(120deg,var(--primary),var(--primary-2));color:#fff;padding:12px 22px;border-radius:999px;font-weight:600;z-index:2000;opacity:0;transition:.3s;box-shadow:0 12px 30px -8px var(--primary-glow);font-size:.9rem;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)'; });
  clearTimeout(t._h);
  t._h = setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(20px)'; }, 1800);
}

/* ---------- Navbar markup ---------- */
function renderNav(active) {
  const links = [
    ['index.html', 'Home'], ['cars.html', 'Buy'], ['sell.html', 'Sell'],
    ['loan.html', 'Loan'], ['compare.html', 'Compare']
  ];
  const cityOpts = CITIES.map(c => `<option ${c === (localStorage.getItem('sw-city') || 'Mumbai') ? 'selected' : ''}>${c}</option>`).join('');
  const user = Auth.user();
  const authBtn = user
    ? `<div class="dropdown">
         <button class="btn btn-ghost btn-pill dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
           <i class="bi bi-person-circle me-1"></i>${user.name}
         </button>
         <ul class="dropdown-menu dropdown-menu-end sw-menu">
           <li><a class="dropdown-item" href="wishlist.html"><i class="bi bi-heart me-2"></i>My Wishlist</a></li>
           <li><hr class="dropdown-divider"></li>
           <li><button class="dropdown-item" onclick="Auth.logout()"><i class="bi bi-box-arrow-right me-2"></i>Sign Out</button></li>
         </ul>
       </div>`
    : `<a class="btn btn-glow btn-pill" href="login.html"><i class="bi bi-person me-1"></i>Login</a>`;
  return `
  <nav class="navbar navbar-expand-lg fixed-top" id="mainNav">
    <div class="container container-xl">
      <a class="brand" href="index.html">
        <span class="brand-mark"><i class="bi bi-record-circle"></i></span>
        <span>Spin<b>Wheel</b></span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <i class="bi bi-list fs-3"></i>
      </button>
      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav mx-lg-auto align-items-lg-center gap-lg-1">
          ${links.map(([h, t]) => `<li class="nav-item"><a class="nav-link px-3 ${active === h ? 'text-light fw-semibold' : ''}" style="${active === h ? 'color:var(--primary)!important' : 'color:var(--muted)'}" href="${h}">${t}</a></li>`).join('')}
        </ul>
        <div class="d-flex align-items-center gap-2 flex-wrap mt-3 mt-lg-0">
          <div class="nav-search d-none d-xl-flex">
            <i class="bi bi-search"></i>
            <input type="text" placeholder="Search cars..." onkeydown="if(event.key==='Enter'){location.href='cars.html?q='+encodeURIComponent(this.value)}">
          </div>
          <select class="city-select" onchange="localStorage.setItem('sw-city',this.value);toast('City set to '+this.value)">${cityOpts}</select>
          <a href="wishlist.html" class="icon-btn" title="Wishlist"><i class="bi bi-heart"></i><span class="badge-count" data-wish-count></span></a>
          <button class="icon-btn" onclick="Theme.toggle()" title="Theme"><i data-theme-icon class="bi bi-moon-stars"></i></button>
          ${authBtn}
        </div>
      </div>
    </div>
  </nav>`;
}

/* ---------- Footer markup ---------- */
function renderFooter() {
  // [label, href] — real pages link directly; informational items show a friendly toast
  const soon = (name) => `href="#" onclick="event.preventDefault();toast('${name} page coming soon')"`;
  const linkList = items => items.map(([label, attr]) =>
    attr.startsWith('href=') ? `<a ${attr}>${label}</a>` : `<a href="${attr}">${label}</a>`).join('');

  const company = [['About Us', 'about.html'], ['Contact', 'contact.html'], ['FAQ', 'faq.html'], ['Careers', soon('Careers')]];
  const services = [['Buy a Car', 'cars.html'], ['Sell a Car', 'sell.html'], ['Car Loan', 'loan.html'], ['Insurance', soon('Insurance')]];
  const quick = [['Compare', 'compare.html'], ['Wishlist', 'wishlist.html'], ['EMI Calculator', 'loan.html'], ['Login', 'login.html']];

  const socials = [
    ['instagram', 'https://instagram.com'], ['twitter-x', 'https://x.com'],
    ['facebook', 'https://facebook.com'], ['youtube', 'https://youtube.com'], ['linkedin', 'https://linkedin.com']
  ];

  return `
  <footer class="footer">
    <div class="container container-xl">
      <div class="row g-4">
        <div class="col-lg-4 col-md-6">
          <a class="brand mb-3 d-inline-flex" href="index.html">
            <span class="brand-mark"><i class="bi bi-record-circle"></i></span>
            <span>Spin<b>Wheel</b></span>
          </a>
          <p class="text-muted-2" style="color:var(--muted);max-width:320px">India's most trusted next-gen used-car marketplace. Verified cars, transparent pricing, zero hassle.</p>
          <div class="social-row">
            ${socials.map(([s, url]) => `<a href="${url}" target="_blank" rel="noopener" class="icon-btn" aria-label="${s}"><i class="bi bi-${s}"></i></a>`).join('')}
          </div>
        </div>
        <div class="col-lg-2 col-6"><h6>Company</h6>${linkList(company)}</div>
        <div class="col-lg-2 col-6"><h6>Services</h6>${linkList(services)}</div>
        <div class="col-lg-2 col-6"><h6>Quick Links</h6>${linkList(quick)}</div>
        <div class="col-lg-2 col-md-6">
          <h6>Newsletter</h6>
          <p style="color:var(--muted);font-size:.86rem">Get price drops & new arrivals.</p>
          <form class="newsletter d-flex" onsubmit="event.preventDefault();toast('Subscribed!');this.reset()">
            <input type="email" placeholder="Email" required>
            <button class="btn btn-glow" style="border-radius:0 999px 999px 0" aria-label="Subscribe"><i class="bi bi-send"></i></button>
          </form>
        </div>
      </div>
      <hr class="divider my-4">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2" style="color:var(--muted-2);font-size:.84rem">
        <span>© 2026 SpinWheel. Crafted for car lovers.</span>
        <div class="d-flex gap-3">
          <a href="privacy.html" style="display:inline">Privacy</a>
          <a href="terms.html" style="display:inline">Terms</a>
          <a href="faq.html" style="display:inline">FAQ</a>
        </div>
      </div>
    </div>
  </footer>`;
}

/* ---------- Car card markup ---------- */
const BADGE_MAP = {
  hot: ['Hot Deal', 'badge-hot'], new: ['New Arrival', 'badge-new'],
  drop: ['Price Drop', 'badge-drop'], best: ['Best Seller', 'badge-best']
};
const AVAIL_MAP = {
  now: ['Available Now', 'avail-now'], left: ['Only 2 Left', 'avail-left'], pop: ['Popular Choice', 'avail-pop']
};

function carCard(c, delay = '') {
  const badges = c.badges.map(b => `<span class="badge-tag ${BADGE_MAP[b][1]}">${BADGE_MAP[b][0]}</span>`).join('');
  const leftBadge = c.avail === 'left' ? '<span class="badge-tag badge-left">Only 2 Left</span>' : '';
  const [aText, aClass] = AVAIL_MAP[c.avail];
  const drop = c.oldPrice > c.price ? `<span class="price-drop-pill"><i class="bi bi-graph-down-arrow"></i>${inr(c.oldPrice - c.price)} off</span>` : '';
  const wished = Wishlist.has(c.id) ? 'active' : '';
  return `
  <article class="car-card glass reveal ${delay}">
    <div class="car-media">
      <div class="badge-row">${badges}${leftBadge}</div>
      <button class="wish-btn ${wished}" data-wish="${c.id}" onclick="onWish(this)"><i class="bi bi-heart-fill"></i></button>
      <a href="car.html?id=${c.id}"><img src="${c.img}" alt="${c.name}" loading="lazy"></a>
    </div>
    <div class="car-body">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <a href="car.html?id=${c.id}" class="car-title d-block">${c.name}</a>
          <span class="car-sub">${c.year} · ${c.km.toLocaleString('en-IN')} km · ${c.owner}</span>
        </div>
        <span class="rating"><i class="bi bi-star-fill"></i>${c.rating}</span>
      </div>
      <div class="spec-row">
        <span class="spec-chip"><i class="bi bi-fuel-pump"></i>${c.fuel}</span>
        <span class="spec-chip"><i class="bi bi-gear"></i>${c.trans}</span>
        <span class="spec-chip"><i class="bi bi-geo-alt"></i>${c.city}</span>
      </div>
      <div class="d-flex justify-content-between align-items-end mt-auto pt-2">
        <div>
          <div class="car-price">${inr(c.price)}</div>
          ${drop}
        </div>
        <span class="avail ${aClass}"><span class="dot"></span>${aText}</span>
      </div>
      <a href="car.html?id=${c.id}" class="btn btn-ghost w-100 mt-1">View Details <i class="bi bi-arrow-right ms-1"></i></a>
    </div>
  </article>`;
}

function onWish(btn) {
  const active = Wishlist.toggle(btn.dataset.wish);
  btn.classList.toggle('active', active);
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ---------- Animated counters ---------- */
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const dec = el.dataset.dec ? parseInt(el.dataset.dec) : 0;
  let start = 0; const dur = 1600; const t0 = performance.now();
  function step(now) {
    const p = Math.min((now - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = (target * eased);
    el.textContent = (dec ? val.toFixed(dec) : Math.floor(val).toLocaleString('en-IN')) + suffix;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = (dec ? target.toFixed(dec) : target.toLocaleString('en-IN')) + suffix;
  }
  requestAnimationFrame(step);
}
function initCounters() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => obs.observe(el));
}

/* ---------- Ripple ---------- */
function initRipple() {
  document.addEventListener('click', e => {
    const b = e.target.closest('.btn');
    if (!b) return;
    const r = document.createElement('span');
    const d = Math.max(b.offsetWidth, b.offsetHeight);
    const rect = b.getBoundingClientRect();
    r.className = 'ripple';
    r.style.width = r.style.height = d + 'px';
    r.style.left = (e.clientX - rect.left - d / 2) + 'px';
    r.style.top = (e.clientY - rect.top - d / 2) + 'px';
    b.appendChild(r);
    setTimeout(() => r.remove(), 600);
  });
}

/* ---------- Navbar scroll ---------- */
function initNavScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll); onScroll();
}

/* ---------- FAQ ---------- */
function initFaq() {
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => q.parentElement.classList.toggle('open'));
  });
}

/* ---------- Floating advisor ---------- */
function renderAdvisor() {
  const html = `
  <button class="advisor-fab" onclick="document.getElementById('advisorPanel').classList.toggle('open')" title="Smart Advisor">
    <i class="bi bi-robot"></i>
  </button>
  <div class="glass advisor-panel" id="advisorPanel">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h5 class="mb-0"><i class="bi bi-robot text-primary me-1" style="color:var(--primary)"></i> Smart Advisor</h5>
      <button class="icon-btn" style="width:32px;height:32px" onclick="document.getElementById('advisorPanel').classList.remove('open')"><i class="bi bi-x"></i></button>
    </div>
    <p style="color:var(--muted);font-size:.85rem">Answer 4 quick questions and I'll find your perfect match.</p>
    <label class="d-block mb-2" style="font-size:.78rem;color:var(--muted-2)">Budget</label>
    <select class="form-select mb-2" id="advBudget" style="background:var(--surface-2);border:1px solid var(--stroke);color:var(--text)">
      <option value="800000">Under ₹8 L</option><option value="1500000">₹8 L – ₹15 L</option><option value="2500000">₹15 L – ₹25 L</option><option value="9999999">₹25 L+</option>
    </select>
    <label class="d-block mb-2" style="font-size:.78rem;color:var(--muted-2)">Fuel</label>
    <select class="form-select mb-2" id="advFuel" style="background:var(--surface-2);border:1px solid var(--stroke);color:var(--text)">
      <option>Any</option><option>Petrol</option><option>Diesel</option>
    </select>
    <label class="d-block mb-2" style="font-size:.78rem;color:var(--muted-2)">Transmission</label>
    <select class="form-select mb-3" id="advTrans" style="background:var(--surface-2);border:1px solid var(--stroke);color:var(--text)">
      <option>Any</option><option>Automatic</option><option>Manual</option>
    </select>
    <button class="btn btn-glow w-100" onclick="runAdvisor()">Recommend Cars</button>
    <div id="advResult" class="mt-3"></div>
  </div>`;
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);
}
function runAdvisor() {
  const budget = +document.getElementById('advBudget').value;
  const fuel = document.getElementById('advFuel').value;
  const trans = document.getElementById('advTrans').value;
  let res = CARS.filter(c => c.price <= budget && (fuel === 'Any' || c.fuel === fuel) && (trans === 'Any' || c.trans === trans));
  res = res.sort((a, b) => b.match - a.match).slice(0, 2);
  const box = document.getElementById('advResult');
  if (!res.length) { box.innerHTML = `<p style="color:var(--muted);font-size:.85rem">No exact match — try widening your budget.</p>`; return; }
  box.innerHTML = res.map(c => `
    <a href="car.html?id=${c.id}" class="d-flex align-items-center gap-2 mb-2 p-2" style="background:var(--surface-2);border-radius:12px;border:1px solid var(--stroke)">
      <img src="${c.img}" style="width:54px;height:40px;object-fit:cover;border-radius:8px">
      <div class="flex-grow-1"><div style="font-weight:600;font-size:.85rem">${c.name}</div><div style="color:var(--muted-2);font-size:.75rem">${inr(c.price)}</div></div>
      <span class="tag-soft">${c.match}%</span>
    </a>`).join('');
}

/* ---------- Boot ---------- */
function mount(activePage) {
  const navSlot = document.getElementById('nav-slot');
  const footSlot = document.getElementById('footer-slot');
  if (navSlot) navSlot.innerHTML = renderNav(activePage);
  if (footSlot) footSlot.innerHTML = renderFooter();
  renderAdvisor();
  Theme.syncIcon();
  Wishlist.updateCount();
  initNavScroll();
  initRipple();
  // defer reveal/counter/faq to allow page scripts to inject content first
  setTimeout(() => { initReveal(); initCounters(); initFaq(); }, 60);
}
