const mapObject = document.getElementById('ph-map');
const infoPanel = document.getElementById('info-panel');
const infoTitle = document.getElementById('info-title');
const infoDesc = document.getElementById('info-desc');
const exploreBtn = document.getElementById('explore-btn');
const closeBtn = document.getElementById('close-panel');

// Wait for SVG to fully load
mapObject.addEventListener('load', () => {
  const svgDoc = mapObject.contentDocument;
  const dots = svgDoc.querySelectorAll('.region-dot');
  const svg = svgDoc.documentElement;

  const originalViewBox = svg.getAttribute('viewBox'); // store original

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      // Show info panel
      infoPanel.style.display = 'block';
      infoTitle.textContent = dot.getAttribute('data-title');
      infoDesc.textContent = dot.getAttribute('data-desc');
      exploreBtn.onclick = () => {
        window.location.href = dot.getAttribute('data-link');
      };

      // Zoom into the clicked dot
      const bbox = dot.getBBox();
      const padding = 50; // adjust padding
      const viewBox = `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding*2} ${bbox.height + padding*2}`;
      svg.setAttribute('viewBox', viewBox);
    });
  });

  // Close button resets map
  closeBtn.addEventListener('click', () => {
    infoPanel.style.display = 'none';
    svg.setAttribute('viewBox', originalViewBox);
  });
});
