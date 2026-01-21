// GET STORAGE
const users = JSON.parse(localStorage.getItem("users")) || {};
const currentEmail = localStorage.getItem("currentUser");

// SECURITY CHECK
if (!currentEmail || !users[currentEmail]) {
  alert("Please log in first.");
  window.location.href = "signup.html";
}

// USER DATA
let user = users[currentEmail];
let isEditing = false;

// ELEMENTS
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const regionInput = document.getElementById("region");
const budgetSelect = document.getElementById("budget");

const foodButtons = document.querySelectorAll(".food-buttons button");
const favs = document.querySelectorAll(".fav");

const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");
const logoutBtn = document.getElementById("logoutBtn");

// --------------------
// LOAD USER DATA
// --------------------
nameInput.value = user.name || "";
emailInput.value = currentEmail;
regionInput.value = user.region || "";
budgetSelect.value = user.budget || "Low";

// FOOD
foodButtons.forEach(btn => {
  if (btn.dataset.food === user.food) {
    btn.classList.add("active");
  }

  btn.onclick = () => {
    if (!isEditing) return;
    foodButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  };
});

// FAVORITES
favs.forEach((fav, index) => {
  if (user.favorites && user.favorites.includes(index)) {
    fav.classList.add("active");
  }

  fav.onclick = () => {
    if (!isEditing) return;
    fav.classList.toggle("active");
  };
});

// --------------------
// EDIT MODE CONTROL
// --------------------
function setEditing(state) {
  isEditing = state;

  nameInput.disabled = !state;
  emailInput.disabled = true; // email NEVER editable
  regionInput.disabled = !state;
  budgetSelect.disabled = !state;
}

// FORCE DISABLED ON LOAD ✅
setEditing(false);

// --------------------
// EDIT BUTTON
// --------------------
editBtn.onclick = () => {
  setEditing(true);
};

// --------------------
// SAVE BUTTON
// --------------------
saveBtn.onclick = () => {
  const selectedFood =
    document.querySelector(".food-buttons .active")?.dataset.food || "";

  const favorites = [];
  favs.forEach((fav, i) => {
    if (fav.classList.contains("active")) favorites.push(i);
  });

  // UPDATE USER
  users[currentEmail] = {
    ...user,
    name: nameInput.value,
    region: regionInput.value,
    budget: budgetSelect.value,
    food: selectedFood,
    favorites: favorites
  };

  // SAVE
  localStorage.setItem("users", JSON.stringify(users));
  user = users[currentEmail];

  setEditing(false);
  alert("Profile saved successfully!");
};

// --------------------
// LOGOUT
// --------------------
logoutBtn.onclick = () => {
  localStorage.removeItem("currentUser");
  window.location.href = "../index.html";
};
