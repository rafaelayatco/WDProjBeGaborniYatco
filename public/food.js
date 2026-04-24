const foodItems = document.querySelectorAll('.food-item');
const infoTitle = document.getElementById('food-title');
const infoDesc = document.getElementById('food-desc');

const reviewContainer = document.getElementById('reviews-container');
const submitBtn = document.getElementById('submit-review');
const reviewText = document.getElementById('review-text');
const avgRating = document.getElementById('average-rating');

const stars = document.querySelectorAll('#star-input i');

let selectedRating = 0;
let currentFood = null;
let editIndex = null;

foodItems.forEach(item => {
  item.addEventListener('click', () => {

    foodItems.forEach(i => i.classList.remove('selected'));
    item.classList.add('selected');

    infoTitle.textContent = item.dataset.title;
    infoDesc.textContent = item.dataset.desc;

    currentFood = item.dataset.title;
    loadReviews();
  });
});

stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = star.dataset.value;

    stars.forEach(s => s.classList.remove('active'));

    for (let i = 0; i < selectedRating; i++) {
      stars[i].classList.add('active');
    }
  });
});

function loadReviews() {
  reviewContainer.innerHTML = "";

  const reviews = JSON.parse(localStorage.getItem(currentFood)) || [];

  // Average rating
  if (reviews.length > 0) {
    let total = reviews.reduce((sum, r) => sum + Number(r.rating), 0);
    let avg = (total / reviews.length).toFixed(1);
    avgRating.textContent = `⭐ ${avg} / 5 (${reviews.length} reviews)`;
  } else {
    avgRating.textContent = "No ratings yet";
  }

  reviews.forEach((rev, index) => {
    const div = document.createElement('div');

    div.innerHTML = `
      <div class="review-card">
        <div class="review-stars">${"★".repeat(rev.rating)}</div>
        <div class="review-text">${rev.text}</div>
        <div class="review-actions">
          <button onclick="editReview(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteReview(${index})">Delete</button>
        </div>
      </div>
    `;

    reviewContainer.appendChild(div);
  });
}

// Submit review 
submitBtn.addEventListener('click', () => {
  if (!currentFood) return alert("Select food first");
  if (!reviewText.value.trim()) return alert("Write review");
  if (selectedRating == 0) return alert("Select rating");

  let reviews = JSON.parse(localStorage.getItem(currentFood)) || [];

  if (editIndex !== null) {
    reviews[editIndex] = {
      text: reviewText.value,
      rating: selectedRating
    };
    editIndex = null;
  } else {
    reviews.push({
      text: reviewText.value,
      rating: selectedRating
    });
  }

  localStorage.setItem(currentFood, JSON.stringify(reviews));

  reviewText.value = "";
  selectedRating = 0;
  stars.forEach(s => s.classList.remove('active'));

  loadReviews();
});

// Edit review
function editReview(index) {
  const reviews = JSON.parse(localStorage.getItem(currentFood));
  const rev = reviews[index];

  reviewText.value = rev.text;
  selectedRating = rev.rating;

  stars.forEach(s => s.classList.remove('active'));
  for (let i = 0; i < selectedRating; i++) {
    stars[i].classList.add('active');
  }

  editIndex = index;
}

// Delete review
function deleteReview(index) {
  let reviews = JSON.parse(localStorage.getItem(currentFood));
  reviews.splice(index, 1);
  localStorage.setItem(currentFood, JSON.stringify(reviews));
  loadReviews();
}

stars.forEach((star, index) => {

  // Hover
  star.addEventListener('mouseover', () => {
    stars.forEach(s => s.style.color = '#ccc');

    for (let i = 0; i <= index; i++) {
      stars[i].style.color = '#f7b733';
    }
  });

  // Remove Hover
  star.addEventListener('mouseout', () => {
    stars.forEach(s => s.style.color = '#ccc');

    for (let i = 0; i < selectedRating; i++) {
      stars[i].style.color = '#f7b733';
    }
  });

});

stars[i].classList.add('fa-solid');
stars[i].classList.remove('fa-regular');