/**
 * PAWBRIDGE A1 EXHIBITION POSTER CONTROLLER
 * Author: Rachel Mishra (B.Des UI/UX) • UEDP-5 Design Studio
 */

document.addEventListener('DOMContentLoaded', () => {
  const artboard = document.getElementById('poster-artboard');
  const btnFit = document.getElementById('btn-zoom-fit');
  const btn50 = document.getElementById('btn-zoom-50');
  const btn75 = document.getElementById('btn-zoom-75');
  const btn100 = document.getElementById('btn-zoom-100');
  const btnPrint = document.getElementById('btn-print-poster');

  let currentZoomMode = 'fit';

  function applyZoom(scale, mode) {
    currentZoomMode = mode;
    if (!artboard) return;

    if (mode === 'fit') {
      // Calculate responsive scale based on available window width and height
      const availableWidth = window.innerWidth - 60;
      const artboardWidth = 1400;
      const fitScale = Math.min(availableWidth / artboardWidth, 0.95);
      artboard.style.transform = `scale(${fitScale})`;
      artboard.style.marginBottom = `${-(1982 * (1 - fitScale))}px`;
    } else {
      artboard.style.transform = `scale(${scale})`;
      artboard.style.marginBottom = `${-(1982 * (1 - scale))}px`;
    }

    // Update active button
    [btnFit, btn50, btn75, btn100].forEach(btn => {
      if (btn) btn.classList.remove('active');
    });

    if (mode === 'fit' && btnFit) btnFit.classList.add('active');
    else if (scale === 0.5 && btn50) btn50.classList.add('active');
    else if (scale === 0.75 && btn75) btn75.classList.add('active');
    else if (scale === 1.0 && btn100) btn100.classList.add('active');
  }

  // Event Listeners for Zoom
  if (btnFit) btnFit.onclick = () => applyZoom(1, 'fit');
  if (btn50) btn50.onclick = () => applyZoom(0.5, '50');
  if (btn75) btn75.onclick = () => applyZoom(0.75, '75');
  if (btn100) btn100.onclick = () => applyZoom(1.0, '100');

  // Print / Export A1 PDF
  if (btnPrint) {
    btnPrint.onclick = () => {
      // Reset transform before print for true 1:1 print dimension
      const prevTransform = artboard.style.transform;
      const prevMargin = artboard.style.marginBottom;
      artboard.style.transform = 'none';
      artboard.style.marginBottom = '0';

      window.print();

      // Restore zoom after print dialog
      setTimeout(() => {
        applyZoom(1, currentZoomMode);
      }, 500);
    };
  }

  // Handle Window Resize for Fit Mode
  window.addEventListener('resize', () => {
    if (currentZoomMode === 'fit') {
      applyZoom(1, 'fit');
    }
  });

  // Initial Auto-Fit
  applyZoom(1, 'fit');

  // Optional: Copy address interaction inside mockup
  document.querySelectorAll('.btn-copy-address').forEach(btn => {
    btn.onclick = () => {
      const text = "Save Speechless Organisation, Bhandewadi / Wathoda, Nagpur, Maharashtra - 440008";
      navigator.clipboard.writeText(text).then(() => {
        const original = btn.textContent;
        btn.textContent = "✓ Address Copied!";
        btn.style.backgroundColor = "#2E7D32";
        btn.style.color = "#FFFFFF";
        setTimeout(() => {
          btn.textContent = original;
          btn.style.backgroundColor = "";
          btn.style.color = "";
        }, 2000);
      });
    };
  });
});
