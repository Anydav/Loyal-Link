// No transition effects — just direct navigation
document.addEventListener("DOMContentLoaded", function () {
  // Optional: If you still want to handle links manually
  document.querySelectorAll("a.transition-link").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = this.getAttribute("href");
    });
  });
});
