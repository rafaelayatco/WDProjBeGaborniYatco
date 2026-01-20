const currentUser = localStorage.getItem("currentUser");
const users = JSON.parse(localStorage.getItem("users")) || {};
const user = users[currentUser];

document.getElementById("name").textContent = user.name;
document.getElementById("email").textContent = currentUser;
document.getElementById("region").textContent = user.region;
document.getElementById("interests").textContent = user.interests.join(", ");
document.getElementById("food").textContent = user.food;
document.getElementById("budget").textContent = user.budget;

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "signup.html";
}
