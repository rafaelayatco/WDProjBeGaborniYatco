document.addEventListener("DOMContentLoaded", () => {

  const currentEmail = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (!currentEmail || !users[currentEmail]) {
    window.location.href = "../index.html";
    return;
  }

  const user = users[currentEmail];

  // ===== ELEMENTS =====
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const regionSelect = document.getElementById("region");
  const budgetSelect = document.getElementById("budget");

  const foodRadios = document.querySelectorAll("input[name='food']");
  const interestCheckboxes = document.querySelectorAll("#interestGroup input");

  const editBtn = document.getElementById("editBtn");
  const saveBtn = document.getElementById("saveBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  const avatarPreview = document.getElementById("avatarPreview");
  const avatarInput = document.getElementById("avatarInput");
  const changeAvatarBtn = document.getElementById("changeAvatarBtn");

  // ===== LOAD USER DATA =====
  nameInput.value = user.name || "";
  emailInput.value = currentEmail;
  regionSelect.value = user.region || "Luzon";
  budgetSelect.value = user.budget || "Low";

  // Food
  foodRadios.forEach(radio => {
    radio.checked = radio.value === user.food;
  });

  // Interests
  interestCheckboxes.forEach(cb => {
    cb.checked = user.interests?.includes(cb.value);
  });

  if (user.avatar) {
    avatarPreview.src = user.avatar;
  }

  // ===== EDIT MODE =====
  editBtn.addEventListener("click", () => {
    nameInput.disabled = false;
    regionSelect.disabled = false;
    budgetSelect.disabled = false;

    foodRadios.forEach(r => r.disabled = false);
    interestCheckboxes.forEach(cb => cb.disabled = false);

    changeAvatarBtn.disabled = false;

    editBtn.style.display = "none";
    saveBtn.style.display = "inline-block";
  });

  // ===== SAVE =====
  saveBtn.addEventListener("click", () => {

    user.name = nameInput.value;
    user.region = regionSelect.value;
    user.budget = budgetSelect.value;

    user.food = document.querySelector("input[name='food']:checked")?.value || "";
    user.interests = [...interestCheckboxes]
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    users[currentEmail] = user;
    localStorage.setItem("users", JSON.stringify(users));

    nameInput.disabled = true;
    regionSelect.disabled = true;
    budgetSelect.disabled = true;

    foodRadios.forEach(r => r.disabled = true);
    interestCheckboxes.forEach(cb => cb.disabled = true);

    changeAvatarBtn.disabled = true;

    saveBtn.style.display = "none";
    editBtn.style.display = "inline-block";

    alert("Profile updated!");
  });

  // ===== AVATAR =====
  changeAvatarBtn.addEventListener("click", () => avatarInput.click());

  avatarInput.addEventListener("change", () => {
    const file = avatarInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      avatarPreview.src = reader.result;
      user.avatar = reader.result;
      users[currentEmail] = user;
      localStorage.setItem("users", JSON.stringify(users));
    };
    reader.readAsDataURL(file);
  });

  // ===== LOGOUT =====
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "../index.html";
  });

});
