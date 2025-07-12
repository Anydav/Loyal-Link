document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("userInput");
  const errorMsg = document.getElementById("errorMsg");
  const button = document.getElementById("resetBtn");
  const form = document.getElementById("resetForm");

  function validateEmailOrPhone(value) {
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const phonePattern = /^\d{1,11}$/;
    return emailPattern.test(value) || phonePattern.test(value);
  }

  function showError(message) {
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
    input.style.borderColor = "red";
    button.disabled = true;
  }

  function hideError() {
    errorMsg.style.display = "none";
    input.style.borderColor = "green";
    button.disabled = false;
  }

  input.addEventListener("input", function () {
    const value = input.value.trim();

    if (value === "") {
      showError("This field cannot be empty.");
      return;
    }

    if (!validateEmailOrPhone(value)) {
      showError("Invalid email or phone number.");
      return;
    }

    hideError();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const value = input.value.trim();

    if (value === "") {
      showError("This field cannot be empty.");
      return;
    }

    if (!validateEmailOrPhone(value)) {
      showError("Invalid email or phone number.");
      return;
    }

    hideError();

    // ✅ Redirect to OTP page
   window.location.href = `otp.html?contact=${encodeURIComponent(value)}&type=reset`;

  });
});
