// ===== GET ELEMENTS =====
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const nameInput = document.getElementById("name");
const region = document.getElementById("region");
const budget = document.getElementById("budget");

// ===== USERS STORAGE =====
const users = JSON.parse(localStorage.getItem("users")) || {};

// ===== TOGGLE FORMS =====
function showSignup() {
  signupForm.style.display = "block";
  loginForm.style.display = "none";
}

function showLogin() {
  signupForm.style.display = "none";
  loginForm.style.display = "block";
}

// ===== SIGN UP =====
signupForm.addEventListener("submit", e => {
  e.preventDefault();

  const email = signupEmail.value;

  if (users[email]) {
    alert("Account already exists. Please log in.");
    return;
  }

  users[email] = {
    name: nameInput.value,
    password: signupPassword.value,
    region: region.value,
    interests: [...document.querySelectorAll(".checkbox-group input:checked")]
      .map(cb => cb.value),
    food: document.querySelector("input[name=food]:checked").value,
    budget: budget.value
  };

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", email);

  window.location.href = "../index.html";
});

// ===== LOG IN =====
loginForm.addEventListener("submit", e => {
  e.preventDefault();

  const email = loginEmail.value;
  const password = loginPassword.value;

  if (!users[email] || users[email].password !== password) {
    alert("Invalid email or password.");
    return;
  }

  localStorage.setItem("currentUser", email);
  window.location.href = "../index.html";
});
