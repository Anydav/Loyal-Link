document.addEventListener("DOMContentLoaded", () => {

  // Enable "Enter" key to go to next input
const inputs = Array.from(document.querySelectorAll(
  '#createAccountForm input[type="text"], #createAccountForm input[type="email"], #createAccountForm input[type="password"]'
));

inputs.forEach((input, index) => {
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextInput = inputs[index + 1];
      if (nextInput) {
        nextInput.focus();
      } else {
        // No more inputs – optionally submit the form
        const createBtn = document.getElementById('createbtn');
        if (!createBtn.disabled) {
          createBtn.click(); // or form.submit()
        }
      }
    }
  });
});

  // -------- Supabase Setup -------- //
  const { createClient } = window.supabase;
  const supabase = createClient(
    'https://upcreedrhrazbrbxgkyh.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwY3JlZWRyaHJhemJyYnhna3loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMjEyNDAsImV4cCI6MjA2Nzg5NzI0MH0.PXxOutW_ex3uz_k69sCciEQsqP7AV9nUMl-ROR_AffM'
  );

  // -------- Show/Hide Password Icons -------- //
  document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', () => {
      const input = document.getElementById(icon.dataset.target);
      const show = icon.parentElement.querySelector('.show');
      const hide = icon.parentElement.querySelector('.hide');
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      show.style.display = isPassword ? 'none' : 'block';
      hide.style.display = isPassword ? 'block' : 'none';
    });
  });

  // -------- DOM Elements -------- //
  const form = document.getElementById('createAccountForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmInput = document.getElementById('confirmPassword');
  const nameInput = document.getElementById('name');
  const termsCheckbox = document.getElementById('terms');
  const createBtn = document.getElementById('createbtn');

  // -------- Validation Functions -------- //
  function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email) && email.endsWith('.com');
  }

  function validatePassword(password) {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return pattern.test(password);
  }

  // -------- Form Validation -------- //
  function checkFormValidity() {
    const isEmailValid = validateEmail(emailInput.value);
    const isPasswordValid = validatePassword(passwordInput.value);
    const isConfirmValid = confirmInput.value === passwordInput.value && confirmInput.value !== '';
    const isTermsChecked = termsCheckbox.checked;

    // Email Feedback
    const emailError = document.getElementById('email-error');
    const emailValid = document.getElementById('email-valid');

    if (emailInput.value === "") {
      emailError.style.display = "none";
      emailValid.style.display = "none";
      emailInput.classList.remove("valid", "invalid");
    } else if (isEmailValid) {
      emailError.style.display = "none";
      emailValid.style.display = "block";
      emailInput.classList.add("valid");
      emailInput.classList.remove("invalid");
    } else {
      emailError.style.display = "block";
      emailValid.style.display = "none";
      emailInput.classList.add("invalid");
      emailInput.classList.remove("valid");
    }

    // Password Feedback
    const passwordError = document.getElementById('password-error');
    const passwordValid = document.getElementById('password-valid');

    if (passwordInput.value === "") {
      passwordError.style.display = "none";
      passwordValid.style.display = "none";
      passwordInput.classList.remove("valid", "invalid");
    } else if (isPasswordValid) {
      passwordError.style.display = "none";
      passwordValid.style.display = "block";
      passwordInput.classList.add("valid");
      passwordInput.classList.remove("invalid");
    } else {
      passwordError.style.display = "block";
      passwordValid.style.display = "none";
      passwordInput.classList.add("invalid");
      passwordInput.classList.remove("valid");
    }

    // Confirm Password Feedback
    const confirmError = document.getElementById('confirm-error');
    const confirmValid = document.getElementById('confirm-valid');

    if (confirmInput.value === "") {
      confirmError.style.display = "none";
      confirmValid.style.display = "none";
      confirmInput.classList.remove("valid", "invalid");
    } else if (isConfirmValid) {
      confirmError.style.display = "none";
      confirmValid.style.display = "block";
      confirmInput.classList.add("valid");
      confirmInput.classList.remove("invalid");
    } else {
      confirmError.style.display = "block";
      confirmValid.style.display = "none";
      confirmInput.classList.add("invalid");
      confirmInput.classList.remove("valid");
    }

    // Enable Submit Button
    createBtn.disabled = !(isEmailValid && isPasswordValid && isConfirmValid && isTermsChecked);
  }

  // -------- Real-Time Validation Events -------- //
  emailInput.addEventListener('input', checkFormValidity);
  passwordInput.addEventListener('input', checkFormValidity);
  confirmInput.addEventListener('input', checkFormValidity);
  termsCheckbox.addEventListener('change', checkFormValidity);

  // -------- Submit Form (Email Sign Up) -------- //
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;
    const fullName = nameInput.value;

    localStorage.setItem('pending_user', JSON.stringify({
     full_name: fullName,
      email,
      role: "user"
        }));


    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'https://anydav.github.io/Loyal-Link/html/userAccountsuccess.html'
        }
      });

      if (error) {
        alert('Signup error: ' + error.message);
        return;
      }

      document.getElementById('email-popup').style.display = 'flex';

      document.getElementById('popup-close').addEventListener('click', () => {
       document.getElementById('email-popup').style.display = 'none';
});

    } catch (err) {
      alert('Unexpected error: ' + err.message);
    }
  });

  // -------- Google Auth Sign Up -------- //
  const googleBtn = document.getElementById('google-signup');
  if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
      const fullName = nameInput.value;
    localStorage.setItem('pending_user', JSON.stringify({
      full_name: fullName,
      role: "user"
     }));

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'https://anydav.github.io/Loyal-Link/html/userAccountsuccess.html?type=google'
        }
      });

      if (error) {
        alert('Google login failed: ' + error.message);
      }
    });
  }
});
