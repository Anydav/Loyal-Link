document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("businessRegisterForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmInput = document.getElementById("confirmPassword");
  const categorySelect = document.getElementById("category");
  const termsCheckbox = document.getElementById("terms");
  const submitBtn = document.getElementById("createbtn");

  const emailError = document.getElementById("email-error");
  const emailValid = document.getElementById("email-valid");
  const passwordError = document.getElementById("password-error");
  const passwordValid = document.getElementById("password-valid");
  const confirmError = document.getElementById("confirm-error");
  const confirmValid = document.getElementById("confirm-valid");

  const toggleIcons = document.querySelectorAll(".toggle-password");

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.includes(".com");
  }

  function validatePassword(password) {
    return (
      password.length >= 8 &&
      /[A-Za-z]/.test(password) &&
      /[0-9]/.test(password)
    );
  }

  function updateValidation(input, isValid) {
    if (isValid) {
      input.classList.remove("invalid");
      input.classList.add("valid");
    } else {
      input.classList.remove("valid");
      input.classList.add("invalid");
    }
  }

  function checkFormStatus() {
    const emailIsValid = validateEmail(emailInput.value);
    const passwordIsValid = validatePassword(passwordInput.value);
    const confirmIsValid = confirmInput.value === passwordInput.value && passwordIsValid;
    const categoryIsValid = categorySelect.value.trim() !== "";
    const termsIsChecked = termsCheckbox.checked;

    // Enable or disable button
    if (emailIsValid && passwordIsValid && confirmIsValid && categoryIsValid && termsIsChecked) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  // --- Email Validation ---
  emailInput.addEventListener("input", () => {
    const isValid = validateEmail(emailInput.value);
    updateValidation(emailInput, isValid);
    emailError.style.display = isValid ? "none" : "block";
    emailValid.style.display = isValid ? "block" : "none";
    checkFormStatus();
  });

  // --- Password Validation ---
  passwordInput.addEventListener("input", () => {
    const isValid = validatePassword(passwordInput.value);
    updateValidation(passwordInput, isValid);
    passwordError.style.display = isValid ? "none" : "block";
    passwordValid.style.display = isValid ? "block" : "none";
    checkFormStatus();
  });

  // --- Confirm Password Validation ---
  confirmInput.addEventListener("input", () => {
    const match = confirmInput.value === passwordInput.value && passwordInput.value.length > 0;
    updateValidation(confirmInput, match);
    confirmError.style.display = match ? "none" : "block";
    confirmValid.style.display = match ? "block" : "none";
    checkFormStatus();
  });

  // --- Business Category Dropdown ---
  categorySelect.addEventListener("change", () => {
    const isValid = categorySelect.value.trim() !== "";
    updateValidation(categorySelect, isValid);
    checkFormStatus();
  });

  // --- Terms Checkbox ---
  termsCheckbox.addEventListener("change", checkFormStatus);

  // --- Password Eye Toggle ---
  toggleIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const inputId = icon.dataset.target;
      const input = document.getElementById(inputId);
      const allIcons = document.querySelectorAll(`img[data-target='${inputId}']`);
      if (input.type === "password") {
        input.type = "text";
        allIcons.forEach((i) => {
          i.classList.toggle("show");
          i.classList.toggle("hide");
        });
      } else {
        input.type = "password";
        allIcons.forEach((i) => {
          i.classList.toggle("show");
          i.classList.toggle("hide");
        });
      }
    });
  });

  // Prevent default form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Optional: you can do some API or Supabase logic here before redirecting

  // Redirect to dashboard or next step
  window.location.href = "businesspending.html"; // ← change to your actual page
});

});
