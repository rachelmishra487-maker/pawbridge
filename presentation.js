/**
 * PAWBRIDGE BRAND IDENTITY & TYPOGRAPHY PRESENTATION
 * Interactive Slide Deck Engine & Shortcuts
 */

const DeckState = {
  currentIndex: 0,
  totalSlides: 6,
  isGridOpen: false,
  slides: [
    { num: '01', title: 'Brand Introduction', desc: 'Logo construction, tagline, purpose & core identity keywords' },
    { num: '02', title: 'Brand Personality', desc: 'Trustworthy, compassionate, transparent & community-led pillars' },
    { num: '03', title: 'Colour Palette', desc: 'Olive Green, Warm Cream, Dark Green, Terracotta & Soft Gold' },
    { num: '04', title: 'Typography System', desc: 'DM Sans & Inter pairing, hierarchy scales, and line heights' },
    { num: '05', title: 'Visual Identity in Use', desc: 'Mobile UI components for registration, vault, rescues, and appeals' },
    { num: '06', title: 'Design Guidelines', desc: '8pt grid, button hierarchy, status badges, accessibility tokens' },
  ]
};

function goToSlide(index) {
  if (index < 0) index = 0;
  if (index >= DeckState.totalSlides) index = DeckState.totalSlides - 1;

  DeckState.currentIndex = index;

  // 1. Hide all slides, show active slide
  const allSlides = document.querySelectorAll('.slide-card');
  allSlides.forEach((slide, idx) => {
    if (idx === index) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  // 2. Update Top Slide Pills
  const pills = document.querySelectorAll('.slide-pill');
  pills.forEach((pill, idx) => {
    if (idx === index) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  // 3. Update Progress Bar
  const progressBar = document.getElementById('deck-progress-bar');
  if (progressBar) {
    const pct = ((index + 1) / DeckState.totalSlides) * 100;
    progressBar.style.width = `${pct}%`;
  }

  // 4. Update Bottom Counter
  const counter = document.getElementById('deck-counter');
  if (counter) {
    counter.textContent = `Slide ${index + 1} of ${DeckState.totalSlides}`;
  }

  // 5. Scroll stage into view smoothly if needed
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextSlide() {
  if (DeckState.currentIndex < DeckState.totalSlides - 1) {
    goToSlide(DeckState.currentIndex + 1);
  }
}

function prevSlide() {
  if (DeckState.currentIndex > 0) {
    goToSlide(DeckState.currentIndex - 1);
  }
}

function toggleGridModal() {
  const modal = document.getElementById('deck-grid-modal');
  if (!modal) return;

  DeckState.isGridOpen = !DeckState.isGridOpen;
  modal.style.display = DeckState.isGridOpen ? 'flex' : 'none';

  if (DeckState.isGridOpen) {
    renderGridThumbnails();
  }
}

function renderGridThumbnails() {
  const container = document.getElementById('grid-thumbnails-container');
  if (!container) return;

  container.innerHTML = DeckState.slides.map((s, idx) => `
    <div class="grid-thumb-card ${idx === DeckState.currentIndex ? 'active' : ''}" data-index="${idx}">
      <span class="thumb-num">SLIDE ${s.num}</span>
      <h4 class="thumb-title">${s.title}</h4>
      <p class="thumb-desc">${s.desc}</p>
    </div>
  `).join('');

  container.querySelectorAll('.grid-thumb-card').forEach(card => {
    card.onclick = () => {
      const targetIdx = parseInt(card.getAttribute('data-index'), 10);
      goToSlide(targetIdx);
      toggleGridModal();
    };
  });
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.warn('Error attempting to enable fullscreen:', err);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

function copyTokensToClipboard() {
  const cssTokens = `/* PawBridge Brand Palette Tokens */
--color-olive: #536747;
--color-cream: #F7F3E9;
--color-dark-green: #29352B;
--color-terracotta: #D98B70;
--color-soft-gold: #E5B95C;
--color-pale-green: #E8EDE3;
--color-white: #FFFFFF;

/* Typography */
--font-headings: 'DM Sans', sans-serif;
--font-body: 'Inter', sans-serif;`;

  navigator.clipboard.writeText(cssTokens).then(() => {
    showToast('✓ Figma CSS tokens copied to clipboard!');
  }).catch(() => {
    showToast('✓ Selected tokens ready for Figma copy.');
  });
}

function showToast(message) {
  const container = document.getElementById('deck-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'deck-toast';
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 250);
  }, 2600);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Arrow Navigation buttons
  const btnNext = document.getElementById('btn-next-slide');
  const btnPrev = document.getElementById('btn-prev-slide');
  if (btnNext) btnNext.onclick = nextSlide;
  if (btnPrev) btnPrev.onclick = prevSlide;

  // Top Slide Pills
  document.querySelectorAll('.slide-pill').forEach(pill => {
    pill.onclick = () => {
      const idx = parseInt(pill.getAttribute('data-slide'), 10);
      goToSlide(idx);
    };
  });

  // Action icons
  const btnGrid = document.getElementById('btn-toggle-grid');
  const btnCloseGrid = document.getElementById('btn-close-grid');
  if (btnGrid) btnGrid.onclick = toggleGridModal;
  if (btnCloseGrid) btnCloseGrid.onclick = toggleGridModal;

  const btnFullscreen = document.getElementById('btn-toggle-fullscreen');
  if (btnFullscreen) btnFullscreen.onclick = toggleFullscreen;

  const btnCopyTokens = document.getElementById('btn-copy-tokens');
  if (btnCopyTokens) btnCopyTokens.onclick = copyTokensToClipboard;

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === 'Space') {
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      prevSlide();
    } else if (e.key.toLowerCase() === 'g') {
      toggleGridModal();
    } else if (e.key.toLowerCase() === 'f') {
      toggleFullscreen();
    } else if (e.key >= '1' && e.key <= '6') {
      const num = parseInt(e.key, 10) - 1;
      goToSlide(num);
    }
  });

  // Initialize on first slide
  goToSlide(0);
});
