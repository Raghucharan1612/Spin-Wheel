/* ============================================================
   Create Account — validation, strength meter, registration
   ============================================================ */
Theme.syncIcon();

const form = document.getElementById('registerForm');
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const phoneEl = document.getElementById('phone');
const passEl = document.getElementById('password');
const confirmEl = document.getElementById('confirm');
const termsEl = document.getElementById('terms');

const nameField = document.getElementById('nameField');
const emailField = document.getElementById('emailField');
const phoneField = document.getElementById('phoneField');
const passField = document.getElementById('passwordField');
const confirmField = document.getElementById('confirmField');
const termsError = document.getElementById('termsError');

const alertBox = document.getElementById('authAlert');
const alertMsg = document.getElementById('authAlertMsg');
const registerBtn = document.getElementById('registerBtn');

const pwMeter = document.getElementById('pwMeter');
const pwHint = document.getElementById('pwHint');

/* ---------- Show / hide password (multiple toggles) ---------- */
document.querySelectorAll('[data-pw-toggle]').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.pwToggle);
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.querySelector('i').className = show ? 'bi bi-eye-slash' : 'bi bi-eye';
    btn.setAttribute('aria-pressed', String(show));
    btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    input.focus();
  });
});

/* ---------- Validation helpers ---------- */
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setState(field, ok, show) {
  field.classList.toggle('invalid', !ok && show);
  field.classList.toggle('valid', ok);
}

function validateName(show = true) {
  const ok = nameEl.value.trim().length >= 2;
  setState(nameField, ok, show && nameEl.value.length > 0 || (show && !ok && submitted));
  return ok;
}
function validateEmail(show = true) {
  const ok = emailRe.test(emailEl.value.trim());
  setState(emailField, ok, (show && emailEl.value.length > 0) || (show && !ok && submitted));
  return ok;
}
function validatePhone(show = true) {
  const ok = /^[6-9]\d{9}$/.test(phoneEl.value.trim());
  setState(phoneField, ok, (show && phoneEl.value.length > 0) || (show && !ok && submitted));
  return ok;
}

/* Password strength: 0-4 */
function passwordScore(v) {
  let s = 0;
  if (v.length >= 8) s++;
  if (/[a-z]/.test(v) && /[A-Z]/.test(v)) s++;
  if (/\d/.test(v)) s++;
  if (/[^A-Za-z0-9]/.test(v)) s++;
  return s;
}
const STRENGTH = [
  { label: '', cls: '' },
  { label: 'Weak', cls: 'weak' },
  { label: 'Fair', cls: 'fair' },
  { label: 'Good', cls: 'good' },
  { label: 'Strong', cls: 'strong' }
];
function validatePassword(show = true) {
  const v = passEl.value;
  const ok = v.length >= 8 && /[A-Za-z]/.test(v) && /\d/.test(v);
  setState(passField, ok, (show && v.length > 0) || (show && !ok && submitted));

  // strength meter
  const score = v ? Math.max(1, passwordScore(v)) : 0;
  const meta = STRENGTH[score];
  pwMeter.className = 'pw-meter' + (meta.cls ? ' ' + meta.cls : '');
  if (v) { pwHint.textContent = 'Strength: ' + meta.label; pwHint.className = 'pw-hint ' + meta.cls; }
  else { pwHint.textContent = 'Use 8+ characters with letters and numbers.'; pwHint.className = 'pw-hint'; }
  return ok;
}
function validateConfirm(show = true) {
  const ok = confirmEl.value.length > 0 && confirmEl.value === passEl.value;
  setState(confirmField, ok, (show && confirmEl.value.length > 0) || (show && !ok && submitted));
  return ok;
}

let submitted = false;

/* ---------- Live validation ---------- */
nameEl.addEventListener('input', () => { hideAlert(); validateName(); });
emailEl.addEventListener('input', () => { hideAlert(); validateEmail(); });
phoneEl.addEventListener('input', () => {
  phoneEl.value = phoneEl.value.replace(/\D/g, '').slice(0, 10);
  hideAlert(); validatePhone();
});
passEl.addEventListener('input', () => { hideAlert(); validatePassword(); if (confirmEl.value) validateConfirm(); });
confirmEl.addEventListener('input', () => { hideAlert(); validateConfirm(); });
termsEl.addEventListener('change', () => { if (termsEl.checked) termsError.style.display = 'none'; });

/* ---------- Alert ---------- */
function showAlert(type, msg) {
  alertBox.className = 'auth-alert show ' + type;
  alertBox.querySelector('i').className = 'bi ' + (type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill');
  alertMsg.textContent = msg;
}
function hideAlert() { alertBox.className = 'auth-alert'; }

/* ---------- Submit (Enter key submits natively) ---------- */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  submitted = true;
  hideAlert();

  const nameOk = validateName();
  const emailOk = validateEmail();
  const phoneOk = validatePhone();
  const passOk = validatePassword();
  const confirmOk = validateConfirm();
  const termsOk = termsEl.checked;
  termsError.style.display = termsOk ? 'none' : 'block';

  if (!nameOk || !emailOk || !phoneOk || !passOk || !confirmOk || !termsOk) {
    showAlert('error', 'Please fix the highlighted fields and try again.');
    return;
  }

  registerBtn.disabled = true;
  registerBtn.innerHTML = '<span class="spinner"></span> <span class="ms-1">Creating account...</span>';

  setTimeout(() => {
    const res = Auth.register({
      name: nameEl.value,
      email: emailEl.value,
      phone: phoneEl.value,
      password: passEl.value
    });

    if (!res.ok) {
      registerBtn.disabled = false;
      registerBtn.innerHTML = '<span class="btn-label"><i class="bi bi-person-plus me-1"></i>Create Account</span>';
      emailField.classList.add('invalid');
      showAlert('error', res.error);
      return;
    }

    showAlert('success', 'Account created successfully! Redirecting to sign in...');
    registerBtn.innerHTML = '<span class="btn-label"><i class="bi bi-check2 me-1"></i>Account Created</span>';
    toast('Welcome to SpinWheel!');
    setTimeout(() => {
      location.href = 'login.html?registered=1&email=' + encodeURIComponent(emailEl.value.trim().toLowerCase());
    }, 1200);
  }, 900);
});
