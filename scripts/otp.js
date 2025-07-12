document.addEventListener("DOMContentLoaded", async () => {
  const otpInputs = document.querySelectorAll(".otp");
  const verifyButton = document.getElementById("verify");
  const resendButton = document.getElementById("resend");
  const timerDisplay = document.getElementById("timer");

  const { createClient } = window.supabase;
  const supabase = createClient(
    'https://upcreedrhrazbrbxgkyh.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwY3JlZWRyaHJhemJyYnhna3loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMjEyNDAsImV4cCI6MjA2Nzg5NzI0MH0.PXxOutW_ex3uz_k69sCciEQsqP7AV9nUMl-ROR_AffM'
  );

  const params = new URLSearchParams(window.location.search);
  const type = params.get("type"); // "register" or "reset"
  const email = params.get("email");

  // Auto-focus next OTP input
  otpInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (input.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });
  });

  // 🕒 Start resend countdown
  let countdown = 30;
  let interval = setInterval(() => {
    countdown--;
    timerDisplay.textContent = `${countdown}s`;
    if (countdown <= 0) {
      clearInterval(interval);
      timerDisplay.textContent = "0s";
      resendButton.disabled = false;
    }
  }, 1000);

  // 🔁 Resend code simulation
  resendButton.addEventListener("click", () => {
    alert("✅ OTP resent!");
    resendButton.disabled = true;
    countdown = 30;
    timerDisplay.textContent = `${countdown}s`;

    interval = setInterval(() => {
      countdown--;
      timerDisplay.textContent = `${countdown}s`;
      if (countdown <= 0) {
        clearInterval(interval);
        resendButton.disabled = false;
      }
    }, 1000);
  });

  // ✅ Verify OTP button
  verifyButton.addEventListener("click", async () => {
    const code = Array.from(otpInputs).map(input => input.value).join("");
    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      alert("❌ Please enter a valid 6-digit OTP");
      return;
    }

    try {
      // ✅ Get session and user
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;

      if (!user || !user.email_confirmed_at) {
        alert("❌ Email not verified yet. Please click the verification link in your email.");
        return;
      }

      // 👤 Check if profile already exists
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!existingProfile) {
        // Get full name
        const fullName = localStorage.getItem("full_name") || 
                         user.user_metadata.full_name || 
                         user.user_metadata.name || 
                         "New User";

        const { error: insertError } = await supabase.from("profiles").insert([
          {
            id: user.id,
            full_name: fullName,
          }
        ]);

        if (insertError) {
          console.error("Profile insert error:", insertError.message);
          alert("❌ Failed to save your profile.");
          return;
        }

        // ✅ Clear temp full name after use
        localStorage.removeItem("full_name");
      }

      // ✅ Navigate to appropriate page
      if (type === "register") {
        window.location.href = "userAccountsuccess.html";
      } else if (type === "reset") {
        window.location.href = "newPassword.html";
      } else {
        alert("❌ Unknown action type");
      }
    } catch (err) {
      alert(`❌ Unexpected error: ${err.message}`);
    }
  });
});
