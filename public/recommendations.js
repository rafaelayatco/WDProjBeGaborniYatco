// ===== GET USER =====
const users = JSON.parse(localStorage.getItem("users")) || {};
const currentEmail = localStorage.getItem("currentUser");

if (!currentEmail || !users[currentEmail]) {
  window.location.href = "../public/signup.html";
}

const user = users[currentEmail];

// ===== SAMPLE ATTRACTIONS DATABASE =====
const attractions = [
  { name: "Banaue Rice Terraces", region: "Luzon", interests: ["Culture", "Mountains"], budget: "Low", stars: 5 },
  { name: "Boracay Beach", region: "Visayas", interests: ["Beaches"], budget: "High", stars: 5 },
  { name: "Chocolate Hills", region: "Visayas", interests: ["Mountains"], budget: "Mid", stars: 4 },
  { name: "Siargao", region: "Mindanao", interests: ["Beaches"], budget: "Mid", stars: 5 },
  { name: "Vigan", region: "Luzon", interests: ["Culture"], budget: "Low", stars: 4 }
];

// ===== FILTER BASED ON USER =====
const filtered = attractions.filter(spot =>
  spot.region === user.region &&
  spot.interests.some(i => user.interests.includes(i)) &&
  (spot.budget === user.budget || user.budget === "High")
);

// ===== RENDER =====
const container = document.getElementById("recommendations");

container.innerHTML = `
  <section class="region-section">
    <h3>RECOMMENDED ATTRACTIONS IN ${user.region.toUpperCase()} FOR YOU</h3>
    <div class="card-row">
      ${filtered.map(spot => `
        <div class="spot-card">
          <div class="spot-img">
            <span class="heart">♥</span>
          </div>
          <div class="stars">${"★".repeat(spot.stars)}${"☆".repeat(5 - spot.stars)}</div>
          <p class="spot-name">${spot.name}</p>
        </div>
      `).join("")}
    </div>
  </section>
`;

// ===== HEART TOGGLE =====
document.querySelectorAll(".heart").forEach(heart => {
  heart.addEventListener("click", () => {
    heart.classList.toggle("active");
  });
});
