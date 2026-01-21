document.addEventListener("DOMContentLoaded", () => {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    console.error("No user found");
    return;
  }

  // ELEMENTS
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const regionSelect = document.getElementById("region");
  const budgetSelect = document.getElementById("budget");

  const editBtn = document.getElementById("editBtn");
  const saveBtn = document.getElementById("saveBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  const avatarPreview = document.getElementById("avatarPreview");
  const avatarInput = document.getElementById("avatarInput");
  const changeAvatarBtn = document.getElementById("changeAvatarBtn");

  // LOAD DATA (SAFE DEFAULTS)
  nameInput.value = currentUser.name || "";
  emailInput.value = currentUser.email || "";
  regionSelect.value = currentUser.region || "Luzon";
  budgetSelect.value = currentUser.budget || "Low";

  if (currentUser.avatar) {
    avatarPreview.src = currentUser.avatar;
  }

  // EDIT MODE
  editBtn.addEventListener("click", () => {
    nameInput.disabled = false;
    regionSelect.disabled = false;
    budgetSelect.disabled = false;
    changeAvatarBtn.disabled = false;

    editBtn.style.display = "none";
    saveBtn.style.display = "inline-block";
  });

  // SAVE
  saveBtn.addEventListener("click", () => {
    nameInput.disabled = true;
    regionSelect.disabled = true;
    budgetSelect.disabled = true;
    changeAvatarBtn.disabled = true;

    currentUser.name = nameInput.value;
    currentUser.region = regionSelect.value;
    currentUser.budget = budgetSelect.value;

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    saveBtn.style.display = "none";
    editBtn.style.display = "inline-block";

    alert("Profile saved!");
  });

  // AVATAR
  changeAvatarBtn.addEventListener("click", () => {
    avatarInput.click();
  });

  avatarInput.addEventListener("change", () => {
    const file = avatarInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      avatarPreview.src = reader.result;
      currentUser.avatar = reader.result;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    };
    reader.readAsDataURL(file);
  });

  // LOGOUT
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "../index.html";
  });
});
