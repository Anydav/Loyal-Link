console.log("Button script connected!");
// Wait for the page to load
document.addEventListener("DOMContentLoaded", function () {
  // Get the button element
  const beginButton = document.querySelector(".begin-btn");

  // Add a click event listener
  beginButton.addEventListener("click", function () {
    // Action to perform: Redirect to another page (e.g., signup.html)
    window.location.href = "signup.html"; // Change to your desired page
  });
});
