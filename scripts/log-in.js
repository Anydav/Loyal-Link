// -------- Toggle Show/Hide Password -------- //
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

// -------- Form Validation Logic -------- //
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginbtn');

// Optional: Validation Feedback Elements
const emailError = document.getElementById('email-error');
const emailValid = document.getElementById('email-valid');
const passwordError = document.getElementById('password-error');
const passwordValid = document.getElementById('password-valid');

// Email must end with ".com"
function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email) && email.endsWith('.com');
}

// Password must be at least 8 characters, including letters and numbers
function validatePassword(password) {
  const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return pattern.test(password);
}

// Check inputs and update styles
function checkFormValidity() {
  const isEmailValid = validateEmail(emailInput.value);
  const isPasswordValid = validatePassword(passwordInput.value);

  emailInput.classList.toggle('valid', isEmailValid);
  emailInput.classList.toggle('invalid', !isEmailValid);
  passwordInput.classList.toggle('valid', isPasswordValid);
  passwordInput.classList.toggle('invalid', !isPasswordValid);

  if (emailError && emailValid) {
    emailError.style.display = isEmailValid ? 'none' : 'block';
    emailValid.style.display = isEmailValid ? 'block' : 'none';
  }

  if (passwordError && passwordValid) {
    passwordError.style.display = isPasswordValid ? 'none' : 'block';
    passwordValid.style.display = isPasswordValid ? 'block' : 'none';
  }

  loginBtn.disabled = !(isEmailValid && isPasswordValid);
}

// Attach event listeners
emailInput.addEventListener('input', checkFormValidity);
passwordInput.addEventListener('input', checkFormValidity);

// Prevent form submission and simulate success
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  alert('✅ Login Successful!');
});
