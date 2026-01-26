let slideIndex = 1;
showSlide(slideIndex);

function changeSlide(n) {
  showSlide(slideIndex += n);
}

function goToSlide(n) {
  showSlide(slideIndex = n);
}

function showSlide(n) {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
  for (let i = 0; i < dots.length; i++) dots[i].classList.remove("active-dot");

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].classList.add("active-dot");
}
/*Note: This controls a slideshow by showing the current slide and highlighting its 
corresponding dot. It allows users to move forward, backward, or jump directly to any slide.*/

