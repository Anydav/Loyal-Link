// -------- Show/Hide Password -------- //
const toggleIcons = document.querySelectorAll('.toggle-password');

toggleIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    const input = document.getElementById(icon.dataset.target);
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

// -------- Form Validation -------- //
const form = document.getElementById('reset-form');
const newPass = document.getElementById('new-password');
const confirmPass = document.getElementById('confirm-password');
const errorNew = document.getElementById('new-pass-error');
const validNew = document.getElementById('new-pass-valid');
const errorConfirm = document.getElementById('confirm-pass-error');
const validConfirm = document.getElementById('confirm-pass-valid');
const popup = document.getElementById('popup');

// Password rule
function isStrongPassword(pw) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pw);
}

function validateForm() {
  const pwVal = newPass.value.trim();
  const confirmVal = confirmPass.value.trim();

  let valid = true;

  // Reset states
  [errorNew, validNew, errorConfirm, validConfirm].forEach(el => el.style.display = 'none');
  [newPass, confirmPass].forEach(input => input.classList.remove('valid', 'invalid'));

  // Validate new password
  if (!isStrongPassword(pwVal)) {
    errorNew.style.display = 'block';
    newPass.classList.add('invalid');
    valid = false;
  } else {
    validNew.style.display = 'block';
    newPass.classList.add('valid');
  }

  // Validate confirm password
  if (confirmVal !== pwVal || confirmVal === '') {
    errorConfirm.style.display = 'block';
    confirmPass.classList.add('invalid');
    valid = false;
  } else {
    validConfirm.style.display = 'block';
    confirmPass.classList.add('valid');
  }

  return valid;
}

[newPass, confirmPass].forEach(input => {
  input.addEventListener('input', validateForm);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (validateForm()) {
    popup.classList.remove('hidden');

    setTimeout(() => {
      window.location.href = '/login.html'; // Change if needed
    }, 5000);
  }
});
