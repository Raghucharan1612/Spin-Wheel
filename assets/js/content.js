/* ============================================================
   Shared logic for static content pages
   (about, contact, faq, privacy, terms)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const active = document.body.dataset.active || '';
  mount(active);

  /* ---- FAQ accordion (faq.html) ---- */
  const faqList = document.getElementById('faqList');
  if (faqList && typeof FAQS !== 'undefined') {
    faqList.innerHTML = FAQS.map((f, i) => `
      <div class="faq-item ${i === 0 ? 'open' : ''}">
        <div class="faq-q">${f.q}<i class="bi bi-plus-lg"></i></div>
        <div class="faq-a"><p class="pt-2 mb-0">${f.a}</p></div>
      </div>`).join('');
    initFaq();
  }

  /* ---- Contact form (contact.html) ---- */
  const cForm = document.getElementById('contactForm');
  if (cForm) {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const fields = {
      cName: v => v.trim().length >= 2,
      cEmail: v => emailRe.test(v.trim()),
      cMsg: v => v.trim().length >= 10
    };
    const validate = (id) => {
      const el = document.getElementById(id);
      const field = el.closest('.field');
      const ok = fields[id](el.value);
      field.classList.toggle('invalid', !ok && el.value.length > 0);
      field.classList.toggle('valid', ok);
      return ok;
    };
    Object.keys(fields).forEach(id =>
      document.getElementById(id).addEventListener('input', () => validate(id)));

    cForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let allOk = true;
      Object.keys(fields).forEach(id => {
        const el = document.getElementById(id);
        if (!fields[id](el.value)) { el.closest('.field').classList.add('invalid'); allOk = false; }
      });
      if (!allOk) { toast('Please complete all fields correctly'); return; }

      const btn = document.getElementById('contactBtn');
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> <span class="ms-1">Sending...</span>';
      setTimeout(() => {
        cForm.reset();
        document.querySelectorAll('#contactForm .field').forEach(f => f.classList.remove('valid', 'invalid'));
        btn.disabled = false;
        btn.innerHTML = '<i class="bi bi-send me-1"></i>Send Message';
        const ok = document.getElementById('contactSuccess');
        if (ok) { ok.style.display = 'flex'; setTimeout(() => ok.style.display = 'none', 5000); }
        toast('Message sent! We\'ll be in touch soon.');
      }, 900);
    });
  }
});
