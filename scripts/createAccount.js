document.addEventListener("DOMContentLoaded", () => {
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

  // -------- Form Handling -------- //
  const form = document.getElementById('createAccountForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmInput = document.getElementById('confirmPassword');
  const nameInput = document.getElementById('name');
  const termsCheckbox = document.getElementById('terms');
  const createBtn = document.getElementById('createbtn');

  function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email) && email.endsWith('.com');
  }

  function validatePassword(password) {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return pattern.test(password);
  }

  function checkFormValidity() {
    const isEmailValid = validateEmail(emailInput.value);
    const isPasswordValid = validatePassword(passwordInput.value);
    const isConfirmValid = confirmInput.value === passwordInput.value && confirmInput.value !== '';
    const isTermsChecked = termsCheckbox.checked;

    // Enable the submit button only when all are valid
    createBtn.disabled = !(isEmailValid && isPasswordValid && isConfirmValid && isTermsChecked);
  }

  emailInput.addEventListener('input', checkFormValidity);
  passwordInput.addEventListener('input', checkFormValidity);
  confirmInput.addEventListener('input', checkFormValidity);
  termsCheckbox.addEventListener('change', checkFormValidity);

  // -------- SIGN UP WITH EMAIL -------- //
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;
    const fullName = nameInput.value;

    // Save full name to localStorage for use in otp.html
    localStorage.setItem('full_name', fullName);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'http://localhost:5500/confirm.html' // optional for email link
        }
      });

      if (error) {
        alert('Signup error: ' + error.message);
        return;
      }

      window.location.href = `otp.html?email=${encodeURIComponent(email)}&type=register`;
    } catch (err) {
      alert('Unexpected error: ' + err.message);
    }
  });

  // -------- GOOGLE AUTH -------- //
  const googleBtn = document.getElementById('google-signup');
  if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'http://localhost:5500/otp.html?type=google'
        }
      });

      if (error) {
        alert('Google login failed: ' + error.message);
      }
    });
  }
});
