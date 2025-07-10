document.addEventListener("DOMContentLoaded", () => {
  const otpInputs = document.querySelectorAll(".otp");
  const verifyBtn = document.getElementById("verify");
  const resendBtn = document.getElementById("resend");
  const timerDisplay = document.getElementById("timer");

  let timer;
  let countdown = 30;

  // Focus handling
  otpInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^0-9]/g, ""); // Only numbers

      if (input.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && input.value === "" && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });

  // Timer logic
  function startTimer() {
    resendBtn.disabled = true;
    countdown = 30;
    timerDisplay.textContent = `${countdown}s`;

    timer = setInterval(() => {
      countdown--;
      timerDisplay.textContent = `${countdown}s`;

      if (countdown <= 0) {
        clearInterval(timer);
        timerDisplay.textContent = "0s";
        resendBtn.disabled = false;
      }
    }, 1000);
  }

  // Resend button
  resendBtn.addEventListener("click", () => {
    otpInputs.forEach(input => input.value = "");
    otpInputs[0].focus();
    startTimer();
    // TODO: Trigger backend resend logic
  });

  // Verify button
  verifyBtn.addEventListener("click", () => {
    const code = Array.from(otpInputs).map(input => input.value).join("");

    if (code.length !== 6) {
      alert("⚠️ Please enter all 6 digits.");
      return;
    }

    // ✅ Replace this with your actual page
    window.location.href = "userAccountsuccess.html";
  });

  startTimer();
});
