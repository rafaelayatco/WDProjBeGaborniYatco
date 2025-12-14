const svgObject = document.getElementById("ph-map");

svgObject.addEventListener("load", () => {
  // Access the actual SVG inside the object
  const svgDoc = svgObject.contentDocument;
  if (!svgDoc) return;

  const svg = svgDoc.querySelector("svg");
  const dots = svg.querySelectorAll(".region-dot");

  const infoPanel = document.getElementById("info-panel");
  const infoTitle = document.getElementById("info-title");
  const infoDesc = document.getElementById("info-desc");
  const exploreBtn = document.getElementById("explore-btn");

  // Save original viewBox
  const originalViewBox = svg.getAttribute("viewBox").split(" ").map(Number);
  const [vbX, vbY, vbW, vbH] = originalViewBox;
  const zoomScale = 3;

  // Function to zoom to a point
  function zoomTo(cx, cy) {
    const newW = vbW / zoomScale;
    const newH = vbH / zoomScale;
    const newX = cx - newW / 2;
    const newY = cy - newH / 2;
    svg.setAttribute("viewBox", `${newX} ${newY} ${newW} ${newH}`);
  }

  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      e.stopPropagation();

      const cx = parseFloat(dot.getAttribute("cx"));
      const cy = parseFloat(dot.getAttribute("cy"));

      // Zoom into the clicked dot
      zoomTo(cx, cy);

      // Position info panel near dot
      const svgRect = svgObject.getBoundingClientRect();
      const dotScreenX = svgRect.left + (cx / vbW) * svgRect.width;
      const dotScreenY = svgRect.top + (cy / vbH) * svgRect.height;

      infoPanel.style.display = "block";
      infoPanel.style.left = `${Math.min(dotScreenX + 20, window.innerWidth - 260)}px`;
      infoPanel.style.top = `${Math.min(dotScreenY, window.innerHeight - 180)}px`;

      // Fill info panel
      infoTitle.textContent = dot.dataset.title;
      infoDesc.textContent = dot.dataset.desc;
      exploreBtn.onclick = () => {
        window.location.href = dot.dataset.link;
      };
    });
  });

  // Clicking outside dots: reset zoom & hide panel
  svgObject.addEventListener("click", (e) => {
    svg.setAttribute("viewBox", originalViewBox.join(" "));
    infoPanel.style.display = "none";
  });
});
