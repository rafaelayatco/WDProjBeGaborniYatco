const users = JSON.parse(localStorage.getItem("users")) || {};

function showSignup() {
  signupForm.style.display = "block";
  loginForm.style.display = "none";
  signupBtn.classList.add("active");
  loginBtn.classList.remove("active");
}

function showLogin() {
  signupForm.style.display = "none";
  loginForm.style.display = "block";
  loginBtn.classList.add("active");
  signupBtn.classList.remove("active");
}

function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}

// SIGN UP
signupForm.addEventListener("submit", e => {
  e.preventDefault();

  const email = signupEmail.value;

  if (users[email]) {
    signupError.textContent = "Account already exists. Please log in.";
    return;
  }

  users[email] = {
    name: name.value,
    password: signupPassword.value,
    region: region.value,
    interests: [...document.querySelectorAll("input[type=checkbox]:checked")].map(cb => cb.value),
    food: document.querySelector("input[name=food]:checked").value,
    budget: budget.value
  };

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", email);
  window.location.href = "../index.html";
});

// LOG IN
loginForm.addEventListener("submit", e => {
  e.preventDefault();

  const email = loginEmail.value;
  const password = loginPassword.value;

  if (!users[email] || users[email].password !== password) {
    loginError.textContent = "Invalid email or password.";
    return;
  }

  localStorage.setItem("currentUser", email);
 window.location.href = "../index.html";
});
