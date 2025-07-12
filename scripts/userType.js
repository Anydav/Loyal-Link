const checkBox1 = document.getElementById("checkBox1");
const checkBox2 = document.getElementById("checkBox2");
const continueBtn = document.getElementById("continueId");

// Get parent divs of the checkboxes
const user1 = checkBox1.closest(".user");
const user2 = checkBox2.closest(".user");

function updateButtonState() {
  const oneSelected = checkBox1.checked || checkBox2.checked;
  continueBtn.disabled = !oneSelected;
}

function enforceSingleSelection(checkedBox, otherBox, currentUserDiv, otherUserDiv) {
  if (checkedBox.checked) {
    otherBox.checked = false;
    otherUserDiv.classList.remove("selected");
    currentUserDiv.classList.add("selected");
  } else {
    currentUserDiv.classList.remove("selected");
  }
  updateButtonState();
}

checkBox1.addEventListener('change', () => {
  enforceSingleSelection(checkBox1, checkBox2, user1, user2);
});

checkBox2.addEventListener('change', () => {
  enforceSingleSelection(checkBox2, checkBox1, user2, user1);
});

continueBtn.addEventListener('click', () => {
  if (!continueBtn.disabled) {
    alert("Continue clicked");
    // navigation logic here
  }
});
