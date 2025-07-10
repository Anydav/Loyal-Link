document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("userInput");
  const errorMsg = document.getElementById("errorMsg");
  const button = document.getElementById("resetBtn");

  // Disable the button initially
  button.disabled = true;

  input.addEventListener("input", function () {
    const value = input.value.trim();

    if (value === "") {
      showError("This field cannot be empty.");
      setInputInvalid();
      return;
    }

    if (!validateEmailOrPhone(value)) {
      showError("Invalid email or phone number.");
      setInputInvalid();
      return;
    }

    // If valid
    hideError();
    setInputValid();
  });

  function showError(message) {
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
    button.disabled = true;
  }

  function hideError() {
    errorMsg.style.display = "none";
    button.disabled = false;
  }

  function setInputInvalid() {
    input.style.borderColor = "red";
  }

  function setInputValid() {
    input.style.borderColor = "green";
  }

  function validateEmailOrPhone(input) {
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const phonePattern = /^\d{1,11}$/;
    return emailPattern.test(input) || phonePattern.test(input);
  }
});
