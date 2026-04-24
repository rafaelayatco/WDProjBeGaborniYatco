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
    image: "../assets/touristspotpics/elnidoaerial.jpg"
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

const email = localStorage.getItem("currentUser");
const users = JSON.parse(localStorage.getItem("users")) || {};
const user = users[email];


let reviews = JSON.parse(localStorage.getItem("reviews")) || {};


function addReview(spotName, rating, text) {
  if (!rating || !text.trim()) {
    alert("Please fill out both rating and review.");
    return;
  }

  if (!reviews[spotName]) reviews[spotName] = [];

  reviews[spotName].push({
    email,
    rating: Number(rating),
    text,
    date: new Date().toISOString()
  });

  localStorage.setItem("reviews", JSON.stringify(reviews));
  renderRecommendations();
}


function deleteReview(spotName, index) {
  reviews[spotName].splice(index, 1);
  localStorage.setItem("reviews", JSON.stringify(reviews));
  renderRecommendations();
}

function getAverageRating(spot) {
  const list = reviews[spot.name] || [];

  const preset = spot.rating;


  if (list.length === 0) return preset.toFixed(1);

  // compute user average
  const userAvg =
    list.reduce((sum, r) => sum + r.rating, 0) / list.length;

  // weighted combination
  const finalRating =
    (preset * 2 + userAvg * list.length) / (2 + list.length);

  return finalRating.toFixed(1);
}

function computeScore(spot) {
  let score = 0;

  if (spot.region === user.region) score += 3;
  if (user.interests.includes(spot.interest)) score += 2;
  if (spot.budget === user.budget) score += 1;

  score += getAverageRating(spot) * 0.5;

  return score;
}

function renderRecommendations() {
  const container = document.getElementById("recommendations");
  container.innerHTML = "";

  const ranked = touristSpots.map(spot => ({
    ...spot,
    score: computeScore(spot),
    avgRating: getAverageRating(spot)
  }));

  ranked.sort((a, b) => b.score - a.score);
  const topFive = ranked.slice(0, 5);

  topFive.forEach((spot, index) => {
    const spotReviews = reviews[spot.name] || [];

    container.innerHTML += `
      <div class="rec-card">

        <span class="rank-badge">#${index + 1}</span>

        <img src="${spot.image}" alt="${spot.name}">

        <div class="rec-content">

          <h3>${spot.name}</h3>

          <div class="rating">
            ${"★".repeat(Math.round(spot.avgRating))} (${spot.avgRating})
          </div>

          <p><b>Region:</b> ${spot.region}</p>
          <p><b>Best for:</b> ${spot.interest}</p>

          <span class="tag">${spot.budget} Budget</span>

          <hr>
          <div class="review-box">
            <h4>Add Review</h4>

            <input type="number" min="1" max="5"
              placeholder="Rating (1-5)"
              id="rating-${index}">

            <input type="text"
              placeholder="Write your review..."
              id="text-${index}">

            <button onclick="
              addReview(
                '${spot.name}',
                document.getElementById('rating-${index}').value,
                document.getElementById('text-${index}').value
              )
            ">
              Submit Review
            </button>
          </div>

          <hr>
          <div class="reviews-section">
            <h4>Reviews</h4>

            ${
              spotReviews.length === 0
                ? `<p style="font-size:12px; opacity:0.7;">No reviews yet.</p>`
                : spotReviews.map((r, i) => `
                    <div style="font-size:12px; margin-bottom:6px;">
                      ⭐ ${r.rating} - ${r.text}
                      ${r.email === email ? `
                        <button onclick="deleteReview('${spot.name}', ${i})">
                          Delete
                        </button>
                      ` : ""}
                    </div>
                  `).join("")
            }

          </div>

        </div>
      </div>
    `;
  });
}

renderRecommendations();