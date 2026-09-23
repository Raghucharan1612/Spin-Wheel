/* ============================================================
   Login page — validation, password toggle, auth flow
   ============================================================ */
Theme.syncIcon();

const form = document.getElementById('loginForm');
const emailEl = document.getElementById('email');
const passEl = document.getElementById('password');
const emailField = document.getElementById('emailField');
const passField = document.getElementById('passwordField');
const alertBox = document.getElementById('authAlert');
const alertMsg = document.getElementById('authAlertMsg');
const loginBtn = document.getElementById('loginBtn');

/* ---------- Demo credentials (shared with Auth store) ---------- */
const DEMO = { email: Auth.demo.email, password: Auth.demo.password };

/* Show a one-time banner when arriving from a successful registration/reset */
(function flashFromQuery() {
  const p = new URLSearchParams(location.search);
  if (p.get('registered')) showAlert('success', 'Account created! Sign in with your new credentials.');
  else if (p.get('reset')) showAlert('success', 'Password updated! Sign in with your new password.');
  if (p.get('email')) emailEl.value = p.get('email');
})();

/* ---------- Show / hide password ---------- */
const pwToggle = document.getElementById('pwToggle');
pwToggle.addEventListener('click', () => {
  const show = passEl.type === 'password';
  passEl.type = show ? 'text' : 'password';
  pwToggle.querySelector('i').className = show ? 'bi bi-eye-slash' : 'bi bi-eye';
  pwToggle.setAttribute('aria-pressed', String(show));
  pwToggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  passEl.focus();
});

/* ---------- Validation helpers ---------- */
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail() {
  const ok = emailRe.test(emailEl.value.trim());
  emailField.classList.toggle('invalid', !ok && emailEl.value.length > 0);
  emailField.classList.toggle('valid', ok);
  return ok;
}
function validatePassword() {
  const ok = passEl.value.length >= 6;
  passField.classList.toggle('invalid', !ok && passEl.value.length > 0);
  passField.classList.toggle('valid', ok);
  return ok;
}

emailEl.addEventListener('input', () => { hideAlert(); validateEmail(); });
passEl.addEventListener('input', () => { hideAlert(); validatePassword(); });

/* ---------- Alert messaging ---------- */
function showAlert(type, msg) {
  alertBox.className = 'auth-alert show ' + type;
  alertBox.querySelector('i').className = 'bi ' + (type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill');
  alertMsg.textContent = msg;
}
function hideAlert() { alertBox.className = 'auth-alert'; }

/* ---------- Demo fill ---------- */
function demoFill() {
  emailEl.value = DEMO.email;
  passEl.value = DEMO.password;
  validateEmail(); validatePassword();
  toast('Demo credentials filled');
}
window.demoFill = demoFill;

/* ---------- Submit ---------- */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  hideAlert();

  const emailOk = validateEmail();
  const passOk = validatePassword();

  // Force-show errors on empty fields
  if (!emailEl.value) emailField.classList.add('invalid');
  if (!passEl.value) passField.classList.add('invalid');

  if (!emailOk || !passOk) {
    showAlert('error', 'Please fix the highlighted fields and try again.');
    return;
  }

  // Simulated authentication with loading state
  loginBtn.disabled = true;
  loginBtn.innerHTML = '<span class="spinner"></span> <span class="ms-1">Signing in...</span>';

  setTimeout(() => {
    const email = emailEl.value.trim().toLowerCase();
    const account = Auth.validate(email, passEl.value);

    if (!account) {
      loginBtn.disabled = false;
      loginBtn.innerHTML = '<span class="btn-label"><i class="bi bi-box-arrow-in-right me-1"></i>Sign In</span>';
      passField.classList.add('invalid');
      showAlert('error', Auth.findByEmail(email)
        ? 'Incorrect password. Please try again or reset it.'
        : 'No account found for that email. Create one to get started.');
      return;
    }

    Auth.login(account);
    showAlert('success', 'Signed in successfully! Redirecting to your garage...');
    loginBtn.innerHTML = '<span class="btn-label"><i class="bi bi-check2 me-1"></i>Success</span>';
    setTimeout(() => { location.href = 'index.html'; }, 1100);
  }, 900);
});
