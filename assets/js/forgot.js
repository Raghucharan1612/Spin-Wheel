/* ============================================================
   Forgot / Reset password — two-step flow (localStorage demo)
   ============================================================ */
Theme.syncIcon();

const stepEmail = document.getElementById('step-email');
const stepReset = document.getElementById('step-reset');
const stepDone = document.getElementById('step-done');

const alertBox = document.getElementById('authAlert');
const alertMsg = document.getElementById('authAlertMsg');

const emailForm = document.getElementById('emailForm');
const emailEl = document.getElementById('email');
const emailField = document.getElementById('emailField');
const emailBtn = document.getElementById('emailBtn');

const resetForm = document.getElementById('resetForm');
const passEl = document.getElementById('password');
const confirmEl = document.getElementById('confirm');
const passField = document.getElementById('passwordField');
const confirmField = document.getElementById('confirmField');
const resetBtn = document.getElementById('resetBtn');
const resetEmailLabel = document.getElementById('resetEmailLabel');
const pwMeter = document.getElementById('pwMeter');
const pwHint = document.getElementById('pwHint');

let targetEmail = '';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ---------- Alert ---------- */
function showAlert(type, msg) {
  alertBox.className = 'auth-alert show ' + type;
  alertBox.querySelector('i').className = 'bi ' + (type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill');
  alertMsg.textContent = msg;
}
function hideAlert() { alertBox.className = 'auth-alert'; }

/* ---------- Password toggles ---------- */
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

/* ---------- Prefill email if passed from login ---------- */
const qEmail = new URLSearchParams(location.search).get('email');
if (qEmail) emailEl.value = qEmail;

/* ============================================================
   STEP 1 — verify email exists
   ============================================================ */
emailEl.addEventListener('input', () => {
  hideAlert();
  const ok = emailRe.test(emailEl.value.trim());
  emailField.classList.toggle('invalid', !ok && emailEl.value.length > 0);
  emailField.classList.toggle('valid', ok);
});

emailForm.addEventListener('submit', (e) => {
  e.preventDefault();
  hideAlert();
  const email = emailEl.value.trim().toLowerCase();
  const ok = emailRe.test(email);
  emailField.classList.toggle('invalid', !ok);
  if (!ok) { showAlert('error', 'Please enter a valid email address.'); return; }

  emailBtn.disabled = true;
  emailBtn.innerHTML = '<span class="spinner"></span> <span class="ms-1">Checking...</span>';

  setTimeout(() => {
    emailBtn.disabled = false;
    emailBtn.innerHTML = '<span class="btn-label"><i class="bi bi-send me-1"></i>Continue</span>';

    const exists = !!Auth.findByEmail(email);
    if (!exists) {
      emailField.classList.add('invalid');
      showAlert('error', 'No account found for that email. Please check it or create an account.');
      return;
    }

    // Account verified — move to reset step
    targetEmail = email;
    resetEmailLabel.textContent = email;
    stepEmail.style.display = 'none';
    stepReset.style.display = '';
    hideAlert();
    showAlert('success', 'Email verified! Choose a new password below.');
    passEl.focus();
  }, 800);
});

/* ============================================================
   STEP 2 — set new password
   ============================================================ */
function passwordScore(v) {
  let s = 0;
  if (v.length >= 8) s++;
  if (/[a-z]/.test(v) && /[A-Z]/.test(v)) s++;
  if (/\d/.test(v)) s++;
  if (/[^A-Za-z0-9]/.test(v)) s++;
  return s;
}
const STRENGTH = ['', 'weak', 'fair', 'good', 'strong'];
const STRENGTH_LABEL = ['', 'Weak', 'Fair', 'Good', 'Strong'];

function validatePassword(show = true) {
  const v = passEl.value;
  const ok = v.length >= 8 && /[A-Za-z]/.test(v) && /\d/.test(v);
  passField.classList.toggle('invalid', !ok && (show && v.length > 0));
  passField.classList.toggle('valid', ok);

  const score = v ? Math.max(1, passwordScore(v)) : 0;
  pwMeter.className = 'pw-meter' + (STRENGTH[score] ? ' ' + STRENGTH[score] : '');
  if (v) { pwHint.textContent = 'Strength: ' + STRENGTH_LABEL[score]; pwHint.className = 'pw-hint ' + STRENGTH[score]; }
  else { pwHint.textContent = 'Use 8+ characters with letters and numbers.'; pwHint.className = 'pw-hint'; }
  return ok;
}
function validateConfirm(show = true) {
  const ok = confirmEl.value.length > 0 && confirmEl.value === passEl.value;
  confirmField.classList.toggle('invalid', !ok && (show && confirmEl.value.length > 0));
  confirmField.classList.toggle('valid', ok);
  return ok;
}

passEl.addEventListener('input', () => { hideAlert(); validatePassword(); if (confirmEl.value) validateConfirm(); });
confirmEl.addEventListener('input', () => { hideAlert(); validateConfirm(); });

resetForm.addEventListener('submit', (e) => {
  e.preventDefault();
  hideAlert();
  const passOk = validatePassword();
  const confirmOk = validateConfirm();
  if (!passEl.value) passField.classList.add('invalid');
  if (!confirmEl.value) confirmField.classList.add('invalid');

  if (!passOk || !confirmOk) {
    showAlert('error', 'Please fix the highlighted fields and try again.');
    return;
  }

  resetBtn.disabled = true;
  resetBtn.innerHTML = '<span class="spinner"></span> <span class="ms-1">Updating...</span>';

  setTimeout(() => {
    const updated = Auth.updatePassword(targetEmail, passEl.value);
    if (!updated) {
      resetBtn.disabled = false;
      resetBtn.innerHTML = '<span class="btn-label"><i class="bi bi-check2-circle me-1"></i>Update Password</span>';
      showAlert('error', 'Something went wrong updating your password. Please try again.');
      return;
    }
    // Success animation
    stepReset.style.display = 'none';
    hideAlert();
    stepDone.style.display = '';
    toast('Password updated successfully');
    setTimeout(() => {
      location.href = 'login.html?reset=1&email=' + encodeURIComponent(targetEmail);
    }, 1600);
  }, 900);
});

/* ---------- Use a different email ---------- */
document.getElementById('useDifferent').addEventListener('click', (e) => {
  e.preventDefault();
  stepReset.style.display = 'none';
  stepEmail.style.display = '';
  hideAlert();
  passEl.value = ''; confirmEl.value = '';
  passField.classList.remove('valid', 'invalid');
  confirmField.classList.remove('valid', 'invalid');
  emailEl.focus();
});
