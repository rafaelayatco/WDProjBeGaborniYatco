// Get stored data
const users = JSON.parse(localStorage.getItem("users"));
const currentUserEmail = localStorage.getItem("currentUser");
const user = users[currentUserEmail];

/* DISPLAY PROFILE */
document.getElementById("name").textContent = user.name;
document.getElementById("email").textContent = currentUserEmail;
document.getElementById("region").textContent = user.region;
document.getElementById("interests").textContent = user.interests.join(", ");
document.getElementById("food").textContent = user.food;
document.getElementById("budget").textContent = user.budget;

/* ENABLE EDIT MODE */
function enableEdit() {
  document.getElementById("viewProfile").classList.add("hidden");
  document.getElementById("editProfile").classList.remove("hidden");

  // Pre-fill inputs
  document.getElementById("editName").value = user.name;
  document.getElementById("editEmail").value = currentUserEmail;
  document.getElementById("editRegion").value = user.region;
  document.getElementById("editInterests").value = user.interests.join(", ");

  document.querySelector(`input[name="food"][value="${user.food}"]`).checked = true;
  document.querySelector(`input[name="budget"][value="${user.budget}"]`).checked = true;
}

/* CANCEL EDIT */
function cancelEdit() {
  document.getElementById("editProfile").classList.add("hidden");
  document.getElementById("viewProfile").classList.remove("hidden");
}

/* SAVE CHANGES */
function saveProfile() {
  const newEmail = document.getElementById("editEmail").value;

  users[newEmail] = {
    name: document.getElementById("editName").value,
    region: document.getElementById("editRegion").value,
    interests: document
      .getElementById("editInterests")
      .value.split(",")
      .map(i => i.trim()),
    food: document.querySelector('input[name="food"]:checked').value,
    budget: document.querySelector('input[name="budget"]:checked').value,
    password: user.password // keep existing password
  };

  // If email changed, remove old key
  if (newEmail !== currentUserEmail) {
    delete users[currentUserEmail];
    localStorage.setItem("currentUser", newEmail);
  }

  localStorage.setItem("users", JSON.stringify(users));
  location.reload();
}

/* LOG OUT */
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "signup.html";
}
