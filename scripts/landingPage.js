document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".page-wrapper");

  // Fade in when page loads
  setTimeout(() => {
    wrapper.classList.add("fade-in");
  }, 10); // slight delay to trigger transition

  // Handle buttons or links for transition
  document.querySelectorAll("a.transition-link").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");

      wrapper.classList.remove("fade-in");
      wrapper.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = "userType.html"; // Change to the desired URL
      }, 500); // Match transition time
    });
  });
});
