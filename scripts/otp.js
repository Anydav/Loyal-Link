document.addEventListener("DOMContentLoaded", function () {
  const otpInputs = document.querySelectorAll(".otp");
  const verifyButton = document.getElementById("verify");
  const resendButton = document.getElementById("resend");
  const timerDisplay = document.getElementById("timer");

  const params = new URLSearchParams(window.location.search);
  const type = params.get("type"); // either 'register' or 'reset'

  // 🔁 Auto move to next input
  otpInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (input.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });
  });

  // 🔒 Simulate verify OTP
  verifyButton.addEventListener("click", () => {
    const code = Array.from(otpInputs).map(input => input.value).join("");

    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      alert("❌ Please enter a valid 6-digit OTP");
      return;
    }

    // Simulate valid OTP (you'll connect backend later)
    if (/^\d{6}$/.test(code)) {
      if (type === "register") {
        window.location.href = "userAccountsuccess.html"; // Or any success page
      } else if (type === "reset") {
        window.location.href = "newPassword.html"; // Direct to reset password page
      } else {
        alert("❌ Unknown action type");
      }
    } else {
      alert("❌ Invalid OTP. Please try again.");
    }
  });

  // ⏱ Countdown timer for Resend
  let countdown = 30;
  const interval = setInterval(() => {
    countdown--;
    timerDisplay.textContent = `${countdown}s`;

    if (countdown <= 0) {
      clearInterval(interval);
      timerDisplay.textContent = "0s";
      resendButton.disabled = false;
    }
  }, 1000);

  // 🔄 Resend button simulation
  resendButton.addEventListener("click", () => {
    alert("✅ OTP resent!");
    resendButton.disabled = true;
    countdown = 30;
    timerDisplay.textContent = `${countdown}s`;

    const newInterval = setInterval(() => {
      countdown--;
      timerDisplay.textContent = `${countdown}s`;

      if (countdown <= 0) {
        clearInterval(newInterval);
        resendButton.disabled = false;
      }
    }, 1000);
  });
});
