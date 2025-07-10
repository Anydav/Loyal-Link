// -------- Show/Hide Password Icons -------- //
const toggleIcons = document.querySelectorAll('.toggle-password');

toggleIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    const inputId = icon.dataset.target;
    const input = document.getElementById(inputId);
    const showIcon = icon.parentElement.querySelector('.show');
    const hideIcon = icon.parentElement.querySelector('.hide');

    if (input.type === 'password') {
      input.type = 'text';
      showIcon.style.display = 'none';
      hideIcon.style.display = 'block';
    } else {
      input.type = 'password';
      showIcon.style.display = 'block';
      hideIcon.style.display = 'none';
    }
  });
});

// -------- Form Fields -------- //
const form = document.getElementById('createAccountForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');
const termsCheckbox = document.getElementById('terms');
const createBtn = document.getElementById('createbtn');

// Validation Message Elements
const emailError = document.getElementById('email-error');
const emailValid = document.getElementById('email-valid');
const passwordError = document.getElementById('password-error');
const passwordValid = document.getElementById('password-valid');
const confirmError = document.getElementById('confirm-error');
const confirmValid = document.getElementById('confirm-valid');

// -------- Email Validation -------- //
function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email) && email.endsWith('.com');
}

// -------- Password Validation -------- //
function validatePassword(password) {
  const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return pattern.test(password);
}

// -------- Check All Conditions -------- //
function checkFormValidity() {
  const isEmailValid = validateEmail(emailInput.value);
  const isPasswordValid = validatePassword(passwordInput.value);
  const isConfirmValid = confirmInput.value === passwordInput.value && confirmInput.value !== '';
  const isTermsChecked = termsCheckbox.checked;

  // Email messages
  if (emailInput.value !== '') {
    emailValid.style.display = isEmailValid ? 'block' : 'none';
    emailError.style.display = isEmailValid ? 'none' : 'block';
    emailInput.classList.toggle('valid', isEmailValid);
    emailInput.classList.toggle('invalid', !isEmailValid);
  }

  // Password messages
  if (passwordInput.value !== '') {
    passwordValid.style.display = isPasswordValid ? 'block' : 'none';
    passwordError.style.display = isPasswordValid ? 'none' : 'block';
    passwordInput.classList.toggle('valid', isPasswordValid);
    passwordInput.classList.toggle('invalid', !isPasswordValid);
  }

  // Confirm password messages
  if (confirmInput.value !== '') {
    confirmValid.style.display = isConfirmValid ? 'block' : 'none';
    confirmError.style.display = isConfirmValid ? 'none' : 'block';
    confirmInput.classList.toggle('valid', isConfirmValid);
    confirmInput.classList.toggle('invalid', !isConfirmValid);
  }

  // Enable button if all pass
  const allValid = isEmailValid && isPasswordValid && isConfirmValid && isTermsChecked;
  createBtn.disabled = !allValid;
}

// -------- Attach Events -------- //
emailInput.addEventListener('input', checkFormValidity);
passwordInput.addEventListener('input', checkFormValidity);
confirmInput.addEventListener('input', checkFormValidity);
termsCheckbox.addEventListener('change', checkFormValidity);

// Optional: Prevent real submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('✅ Account Created Successfully!');

  setTimeout(() => {
    window.location.href = `otp.html?email=${encodeURIComponent(emailInput.value)}`;
  }, 1000);
});