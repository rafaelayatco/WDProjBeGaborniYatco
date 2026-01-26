document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");
  const label = musicBtn.querySelector("span");

  bgMusic.volume = 1.0;

  musicBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play()
        .then(() => {
          musicBtn.classList.add("playing");
          label.textContent = "Pause Music";
        })
        .catch(err => console.error("Audio error:", err));
    } else {
      bgMusic.pause();
      musicBtn.classList.remove("playing");
      label.textContent = "Play Music";
    }
  });
});
