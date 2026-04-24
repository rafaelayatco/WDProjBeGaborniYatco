document.addEventListener("DOMContentLoaded", () => {

  const currentEmail = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (!currentEmail || !users[currentEmail]) {
    window.location.href = "../index.html";
    return;
  }

  const user = users[currentEmail];

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

  const currentPasswordInput = document.getElementById("currentPassword");
  const newPasswordInput = document.getElementById("newPassword");
  const resetPasswordBtn = document.getElementById("resetPasswordBtn");

  const deleteProfileBtn = document.getElementById("deleteProfileBtn");
  const message = document.getElementById("message");

  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

// Locks the password fields until user clicks Edit Profile
  if (currentPasswordInput) currentPasswordInput.disabled = true;
  if (newPasswordInput) newPasswordInput.disabled = true;
  if (resetPasswordBtn) resetPasswordBtn.disabled = true;

  nameInput.value = user.name || "";
  emailInput.value = currentEmail;
  regionSelect.value = user.region || "Luzon";
  budgetSelect.value = user.budget || "Low";

  foodRadios.forEach(r => r.checked = r.value === user.food);
  interestCheckboxes.forEach(cb => cb.checked = user.interests?.includes(cb.value));

  if (user.avatar) avatarPreview.src = user.avatar;

  editBtn.addEventListener("click", () => {

    nameInput.disabled = false;
    regionSelect.disabled = false;
    budgetSelect.disabled = false;

    foodRadios.forEach(r => r.disabled = false);
    interestCheckboxes.forEach(cb => cb.disabled = false);

    changeAvatarBtn.disabled = false;

    if (currentPasswordInput) currentPasswordInput.disabled = false;
    if (newPasswordInput) newPasswordInput.disabled = false;
    if (resetPasswordBtn) resetPasswordBtn.disabled = false;

    editBtn.style.display = "none";
    saveBtn.style.display = "inline-block";
  });

  // saves the profile changes
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

    showMessage("Profile updated!", false);

    saveBtn.style.display = "none";
    editBtn.style.display = "inline-block";

    // lock again after saving
    currentPasswordInput.disabled = true;
    newPasswordInput.disabled = true;
    resetPasswordBtn.disabled = true;
  });

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

  resetPasswordBtn.addEventListener("click", () => {

    if (currentPasswordInput.disabled) {
      return showMessage("Click Edit Profile first", true);
    }

    if (!user.password || currentPasswordInput.value !== user.password) {
      return showMessage("Wrong current password", true);
    }

    if (newPasswordInput.value.length < 6) {
      return showMessage("Password too short (min 6)", true);
    }

    user.password = newPasswordInput.value;
    users[currentEmail] = user;
    localStorage.setItem("users", JSON.stringify(users));

    currentPasswordInput.value = "";
    newPasswordInput.value = "";

    showMessage("Password updated!", false);
  });

  //Delete the entire profile, but make sure they are sure first
  if (deleteProfileBtn) {
    deleteProfileBtn.addEventListener("click", () => {

      if (!confirm("Delete your profile permanently?")) return;

      delete users[currentEmail];
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.removeItem("currentUser");

      alert("Profile deleted");
      window.location.href = "../index.html";
    });
  }

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "../index.html";
  });

  function showMessage(text, error) {
    message.textContent = text;
    message.className = error ? "error" : "success";
    setTimeout(() => message.textContent = "", 3000);
  }

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      togglePassword.textContent = isHidden ? "Hide" : "Show";
    });
  }


 // sticky notes 
    const noteDestination = document.getElementById("noteDestination");
    const noteText = document.getElementById("noteText");
    const addNoteBtn = document.getElementById("addNoteBtn");
    const notesContainer = document.getElementById("notesContainer");

    let allNotes = JSON.parse(localStorage.getItem("travelNotes")) || {};

    if (noteDestination && noteText && addNoteBtn && notesContainer) {

      addNoteBtn.addEventListener("click", () => {

        if (!noteText.value.trim()) {
          alert("Write a note first!");
          return;
        }

        const note = {
          id: Date.now(),
          destination: noteDestination.value,
          text: noteText.value,
          pinned: false,
          date: new Date().toLocaleString()
        };

        if (!allNotes[currentEmail]) {
          allNotes[currentEmail] = [];
        }

        allNotes[currentEmail].push(note);

        localStorage.setItem("travelNotes", JSON.stringify(allNotes));

        noteText.value = "";

        renderNotes();
      });

      function renderNotes() {

        notesContainer.innerHTML = "";

        const userNotes = allNotes[currentEmail] || [];

        userNotes.sort((a, b) => b.pinned - a.pinned);

        userNotes.forEach(note => {

          notesContainer.innerHTML += `
            <div class="note-card ${note.pinned ? "pinned" : ""}">

              <h4>📍 ${note.destination}</h4>
              <p>${note.text}</p>
              <small>${note.date}</small>

              <div style="margin-top:8px;">
                <button onclick="editNote(${note.id})">Edit</button>
                <button onclick="deleteNote(${note.id})">Delete</button>
                <button onclick="togglePin(${note.id})">
                  ${note.pinned ? "Unpin" : "Pin"}
                </button>
              </div>

            </div>
          `;
        });
      }

      window.editNote = function(id) {

        const note = allNotes[currentEmail]?.find(n => n.id === id);
        if (!note) return;

        const newText = prompt("Edit note:", note.text);

        if (newText !== null) {
          note.text = newText;

          localStorage.setItem("travelNotes", JSON.stringify(allNotes));
          renderNotes();
        }
      };

      window.deleteNote = function(id) {

        allNotes[currentEmail] =
          (allNotes[currentEmail] || []).filter(n => n.id !== id);

        localStorage.setItem("travelNotes", JSON.stringify(allNotes));
        renderNotes();
      };

      window.togglePin = function(id) {

        const note = allNotes[currentEmail]?.find(n => n.id === id);
        if (!note) return;

        note.pinned = !note.pinned;

        localStorage.setItem("travelNotes", JSON.stringify(allNotes));
        renderNotes();
      };

      renderNotes();
    }
});
