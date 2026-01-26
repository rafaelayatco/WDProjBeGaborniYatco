const touristSpots = [
  {
    name: "Banaue Rice Terraces",
    region: "Luzon",
    interest: "Mountains",
    budget: "Low",
    rating: 4.8,
    image: "../assets/touristspotpics/banauericeterraceshiking.jpg"
  },
  {
    name: "Boracay",
    region: "Visayas",
    interest: "Beaches",
    budget: "High",
    rating: 4.9,
    image: "../assets/touristspotpics/boracayaerial.webp"
  },
  {
    name: "Chocolate Hills",
    region: "Visayas",
    interest: "Mountains",
    budget: "Low",
    rating: 4.7,
    image: "../assets/touristspotpics/chocolatehillsaerial.jpg"
  },
  {
    name: "Cloud 9",
    region: "Mindanao",
    interest: "Beaches",
    budget: "Mid",
    rating: 4.6,
    image: "../assets/touristspotpics/cloud9aerial.jpg"
  },
  {
    name: "El Nido",
    region: "Luzon",
    interest: "Beaches",
    budget: "High",
    rating: 4.9,
    image: "../assets/touristspotpics/elnidoaerials.jpg"
  },
  {
    name: "Enchanted River",
    region: "Mindanao",
    interest: "Nature",
    budget: "Low",
    rating: 4.7,
    image: "../assets/touristspotpics/enchantedriveraerial.jpg"
  },
  {
    name: "Honda Bay",
    region: "Luzon",
    interest: "Beaches",
    budget: "Mid",
    rating: 4.6,
    image: "../assets/touristspotpics/hondabayaerial.webp"
  },
  {
    name: "Hundred Islands",
    region: "Luzon",
    interest: "Beaches",
    budget: "Low",
    rating: 4.6,
    image: "../assets/touristspotpics/hundredislandsaerial.jpg"
  },
  {
    name: "Magellan’s Cross",
    region: "Visayas",
    interest: "Culture",
    budget: "Low",
    rating: 4.5,
    image: "../assets/touristspotpics/magellanscrossinside.webp"
  },
  {
    name: "Mount Apo",
    region: "Mindanao",
    interest: "Mountains",
    budget: "High",
    rating: 4.8,
    image: "../assets/touristspotpics/mountapoaerial.jpg"
  },
  {
    name: "Puerto Princesa Underground River",
    region: "Luzon",
    interest: "Nature",
    budget: "Mid",
    rating: 4.8,
    image: "../assets/touristspotpics/puertoprincesainside.webp"
  },
  {
    name: "Siquijor",
    region: "Visayas",
    interest: "Beaches",
    budget: "Mid",
    rating: 4.7,
    image: "../assets/touristspotpics/siquijoraerial.webp"
  },
  {
    name: "Tubbataha Reefs",
    region: "Visayas",
    interest: "Nature",
    budget: "High",
    rating: 4.9,
    image: "../assets/touristspotpics/tubbatahaaerial.jpg"
  }
];

// ---- GET USER ----
const email = localStorage.getItem("currentUser");
const users = JSON.parse(localStorage.getItem("users"));
const user = users[email];

// ---- SCORE ----
const scored = touristSpots.map(spot => {
  let score = 0;

  if (spot.region === user.region) score += 3;
  if (user.interests.includes(spot.interest)) score += 2;
  if (spot.budget === user.budget) score += 1;

  return { ...spot, score };
});

// ---- SORT + TOP 5 ----
scored.sort((a, b) => b.score - a.score);
const topFive = scored.slice(0, 5);

// ---- RENDER ----
const container = document.getElementById("recommendations");

topFive.forEach((spot, index) => {
  container.innerHTML += `
    <div class="rec-card">
      <span class="rank-badge">#${index + 1}</span>
      <img src="${spot.image}" alt="${spot.name}">
      <div class="rec-content">
        <h3>${spot.name}</h3>
        <div class="rating">
          ${"★".repeat(Math.round(spot.rating))} (${spot.rating})
        </div>
        <p><b>Region:</b> ${spot.region}</p>
        <p><b>Best for:</b> ${spot.interest}</p>
        <span class="tag">${spot.budget} Budget</span>
      </div>
    </div>
  `;
});
