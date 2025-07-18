// -------- Supabase Setup -------- //
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://upcreedrhrazbrbxgkyh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwY3JlZWRyaHJhemJyYnhna3loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMjEyNDAsImV4cCI6MjA2Nzg5NzI0MH0.PXxOutW_ex3uz_k69sCciEQsqP7AV9nUMl-ROR_AffM'
);

console.log('✅ Supabase initialized');

// -------- DOM Elements -------- //
const form = document.getElementById("businessRegisterForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");
const nameInput = document.getElementById("name");
const categorySelect = document.getElementById("category");
const termsCheckbox = document.getElementById("terms");
const submitBtn = document.getElementById("createbtn");
const googleBtn = document.getElementById("google-signup");

// -------- Validation -------- //
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.includes(".com");
}

function validatePassword(password) {
  return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
}

function updateValidation(input, isValid) {
  input.classList.toggle("valid", isValid);
  input.classList.toggle("invalid", !isValid);
}

function checkFormStatus() {
  const emailIsValid = validateEmail(emailInput.value);
  const passwordIsValid = validatePassword(passwordInput.value);
  const confirmIsValid = confirmInput.value === passwordInput.value && passwordIsValid;
  const categoryIsValid = categorySelect.value.trim() !== "";
  const termsIsChecked = termsCheckbox.checked;

  submitBtn.disabled = !(emailIsValid && passwordIsValid && confirmIsValid && categoryIsValid && termsIsChecked);
}

// -------- Events for Validation -------- //
emailInput.addEventListener("input", () => {
  const isValid = validateEmail(emailInput.value);
  updateValidation(emailInput, isValid);
  document.getElementById("email-error").style.display = isValid ? "none" : "block";
  document.getElementById("email-valid").style.display = isValid ? "block" : "none";
  checkFormStatus();
});

passwordInput.addEventListener("input", () => {
  const isValid = validatePassword(passwordInput.value);
  updateValidation(passwordInput, isValid);
  document.getElementById("password-error").style.display = isValid ? "none" : "block";
  document.getElementById("password-valid").style.display = isValid ? "block" : "none";
  checkFormStatus();
});

confirmInput.addEventListener("input", () => {
  const match = confirmInput.value === passwordInput.value && passwordInput.value.length > 0;
  updateValidation(confirmInput, match);
  document.getElementById("confirm-error").style.display = match ? "none" : "block";
  document.getElementById("confirm-valid").style.display = match ? "block" : "none";
  checkFormStatus();
});

categorySelect.addEventListener("change", () => {
  const isValid = categorySelect.value.trim() !== "";
  updateValidation(categorySelect, isValid);
  checkFormStatus();
});

termsCheckbox.addEventListener("change", checkFormStatus);

// -------- Show/Hide Password -------- //
document.querySelectorAll(".toggle-password").forEach(icon => {
  icon.addEventListener("click", () => {
    const input = document.getElementById(icon.dataset.target);
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";

    const icons = document.querySelectorAll(`img[data-target='${icon.dataset.target}']`);
    icons.forEach(i => i.classList.toggle("hide"));
    icons.forEach(i => i.classList.toggle("show"));
  });
});

// -------- Form Submission: Email Signup -------- //
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;
  const business_name = nameInput.value;
  const category = categorySelect.value;

  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password
      // No verification email
    });

    if (authError) {
      alert("❌ Sign-up failed: " + authError.message);
      return;
    }

    const { error: dbError } = await supabase.from("business_profiles").insert({
      business_name,
      email,
      category,
      status: "pending"
    });

    if (dbError) {
      alert("❌ Database error: " + dbError.message);
      return;
    }

    // Save for use in businesspending.html
    localStorage.setItem("pending_business", JSON.stringify({ business_name, email, category }));

    // Go to pending page
    window.location.href = "https://anydav.github.io/Loyal-Link/html/businesspending.html";

  } catch (err) {
    console.error(err);
    alert("⚠️ Unexpected error: " + err.message);
  }
});

// -------- Google Auth Sign-Up -------- //
if (googleBtn) {
  googleBtn.addEventListener("click", async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google"
      });

      if (error) {
        alert("❌ Google Auth failed: " + error.message);
        return;
      }

      // Save dummy business data and go to pending page (you may need a separate logic to get name & category later)
      const email = ""; // Will be fetched later from user session
      localStorage.setItem("pending_business", JSON.stringify({ email, business_name: "", category: "" }));

      // Delay navigation slightly to allow session to complete
      setTimeout(() => {
        window.location.href = "https://anydav.github.io/Loyal-Link/html/businesspending.html";
      }, 3000);

    } catch (err) {
      alert("⚠️ Unexpected error during Google login: " + err.message);
    }
  });
}
