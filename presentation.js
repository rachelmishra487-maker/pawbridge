/**
 * PAWBRIDGE & UEDP-5 RESEARCH PRESENTATION DECK
 * Interactive Presentation Engine with Section Grouping & LocalStorage Persistence
 * Author: Rachel Mishra (B.Des UI/UX)
 */

const DeckState = {
  currentIndex: 0,
  totalSlides: 42,
  isGridOpen: false,
  slides: [
    // SECTION 01: COVER
    { num: '01', title: 'Cover Page', section: 'SECTION 01: COVER', desc: 'Understanding People Who Support Animal Shelters Online • Rachel Mishra, B.Des UI/UX' },
    
    // SECTION 02: OVERVIEW
    { num: '02', title: 'Project Overview & Problem Statement', section: 'SECTION 02: OVERVIEW', desc: 'Good intent stalls at uncertainty • Verbatim problem statement, context & target users' },
    { num: '03', title: 'Research Objectives, Scope & Journey', section: 'SECTION 02: OVERVIEW', desc: 'Research goal, in-scope touchpoints & 5-stage supporter journey framework' },
    
    // SECTION 03: RESEARCH SUMMARY
    { num: '04', title: 'User Interview Profiles & Themes', section: 'SECTION 03: RESEARCH', desc: 'Kanchan, Khushi, Dishank, Asha, and unnamed perspectives + key research themes' },
    { num: '05', title: 'Four Key Insights', section: 'SECTION 03: RESEARCH', desc: 'Trust before transaction, clarity over volume, specific needs, and familiarity differences' },
    { num: '06', title: 'Observation & Design Matrix', section: 'SECTION 03: RESEARCH', desc: 'Direct verbatim mapping: User observations translated into concrete design implications' },
    { num: '07', title: 'User Persona: Aarohi, 22', section: 'SECTION 03: RESEARCH', desc: 'Goals, frustrations, behaviours, and design needs of digitally active animal supporters' },
    { num: '08', title: 'Supporter Empathy Map', section: 'SECTION 03: RESEARCH', desc: 'Says, Thinks, Does, Feels, Pains, and Needs for potential shelter supporters' },
    { num: '09', title: 'Supporter Journey Deep Dive', section: 'SECTION 03: RESEARCH', desc: '5 progressive phases: Discover → Verify → Understand → Act → Follow Up' },
    { num: '10', title: 'NGO Field Research & Case Studies', section: 'SECTION 03: RESEARCH', desc: 'Nagpur fieldwork (SSO, Rise for Tails, NSD) & Pan-India benchmarks (PFA, Blue Cross, RESQ)' },
    { num: '11', title: 'NGO Pain Points & Funding Ecosystem', section: 'SECTION 03: RESEARCH', desc: 'Operational reality, ₹5–6 lakh funding range, support channels, and core pain points' },
    { num: '12', title: 'Strategic Solutions & How Might We', section: 'SECTION 03: RESEARCH', desc: 'How Might We framing, 4 action levers, and 3 platform solution concepts' },

    // SECTION 04: INFORMATION ARCHITECTURE & EXPERIENCE STRUCTURE
    { num: '13', title: 'Information Architecture & Sitemap', section: 'SECTION 04: IA & STRUCTURE', desc: 'Platform hierarchical sitemap: Public Supporter Hub & NGO Operations Console' },
    { num: '14', title: 'Navigation Structure & User Flow', section: 'SECTION 04: IA & STRUCTURE', desc: 'Desktop navigation blueprint & end-to-end supporter decision user flow' },
    { num: '15', title: 'Task Flow & 6 Core Features', section: 'SECTION 04: IA & STRUCTURE', desc: 'Step-by-step urgent need fulfillment task flow & feature matrix addressing the 6 user goals' },

    // SECTION 05: CONCEPT EXPLORATION & LOW-FIDELITY DESIGN
    { num: '16', title: 'Three Research Concepts (A, B & C)', section: 'SECTION 05: CONCEPTS & WIREFRAMES', desc: 'Concept A (Directory), Concept B (Donation Platform), Concept C (Community Platform)' },
    { num: '17', title: 'Concept Comparison & Trade-offs', section: 'SECTION 05: CONCEPTS & WIREFRAMES', desc: 'Evaluation matrix across 6 parameters + advantages and limitations of each model' },
    { num: '18', title: 'Selection Criteria & Hybrid Rationale', section: 'SECTION 05: CONCEPTS & WIREFRAMES', desc: 'Evidence-based selection criteria & why the PawBridge Integrated Model was chosen' },
    { num: '19', title: 'Initial Sketches & Ideation', section: 'SECTION 05: CONCEPTS & WIREFRAMES', desc: 'Handwritten layout ideation, visual hierarchy notes, and distinction of tested vs proposed ideas' },
    { num: '20', title: 'Wireframes: Discovery & Profile', section: 'SECTION 05: CONCEPTS & WIREFRAMES', desc: 'Greyscale low-fidelity wireframes for Directory Search & Public Verified NGO Profile' },
    { num: '21', title: 'Wireframes: Need, Rescue & Console', section: 'SECTION 05: CONCEPTS & WIREFRAMES', desc: 'Greyscale low-fidelity wireframes for Support Requests, Animal Health Logs & NGO Portal' },

    // SECTION 06: USER TESTING: ROUND 1 (LOW-FIDELITY PROTOTYPE)
    { num: '22', title: 'Testing Introduction & Objectives', section: 'SECTION 06: USABILITY TESTING', desc: 'Testing purpose, scope & 6 core evaluation goals for the low-fidelity wireframes' },
    { num: '23', title: 'Testing Methodology & Protocol', section: 'SECTION 06: USABILITY TESTING', desc: 'Think-aloud protocol, 3–5 recommended participants, screening criteria & collected metrics' },
    { num: '24', title: 'Participant Profile Template', section: 'SECTION 06: USABILITY TESTING', desc: 'Standardized profile logs (P1–P5) with editable placeholders awaiting session deployment' },
    { num: '25', title: 'Testing Task Scenarios (Tasks 1–5)', section: 'SECTION 06: USABILITY TESTING', desc: 'Scenarios for NGO discovery, credibility check, urgent needs, support options & recovery updates' },
    { num: '26', title: 'Observation & Note-Taking Table', section: 'SECTION 06: USABILITY TESTING', desc: 'Structured task observation template logging actions, hesitation, confusion & completion' },
    { num: '27', title: 'Designer-Led Heuristic Walkthrough', section: 'SECTION 06: USABILITY TESTING', desc: 'Nielsen Norman heuristic evaluation identifying wireframe friction and cognitive gaps' },
    { num: '28', title: 'Findings & Design Recommendations', section: 'SECTION 06: USABILITY TESTING', desc: 'Strategic recommendations across navigation, trust verification, need clarity & continuity' },
    { num: '29', title: 'Changes to Make Before Hi-Fi Design', section: 'SECTION 06: USABILITY TESTING', desc: 'Prioritized design revision backlog (High, Med, Low) before visual styling commits' },

    // SECTION 07: VISUAL IDENTITY & UI DESIGN SYSTEM
    { num: '30', title: 'Brand Foundation & Editable Project Identity', section: 'SECTION 07: DESIGN SYSTEM', desc: 'Brand concept, bridge arc logo, and live editable project name & tagline with persistent sync' },
    { num: '31', title: 'Harmonious Colour Palette & HEX Codes', section: 'SECTION 07: DESIGN SYSTEM', desc: '7 brand color tokens (#536747, #29352B, #F7F3E9, etc.), contrast ratios & copyable CSS tokens' },
    { num: '32', title: 'Typography Hierarchy & Modular Scale', section: 'SECTION 07: DESIGN SYSTEM', desc: 'DM Sans (headings) & Inter (body/UI) scale specifications, weights & line heights' },
    { num: '33', title: 'Buttons, Inputs & 6 Component States', section: 'SECTION 07: DESIGN SYSTEM', desc: 'Primary/secondary buttons, input fields, and 6 states: default, hover, active, disabled, error, success' },
    { num: '34', title: 'Navigation Components, Cards & Statuses', section: 'SECTION 07: DESIGN SYSTEM', desc: 'Desktop topbar, tabs, breadcrumbs, filter chips, 3 card types & status badges' },
    { num: '35', title: 'Icon Style, 8pt Grid & System Guidelines', section: 'SECTION 07: DESIGN SYSTEM', desc: '24px monoline rounded icons, 8pt spatial grid ruler & accessibility/vault privacy guidelines' },

    // SECTION 08: FINAL SOLUTION & HIGH-FIDELITY PROTOTYPE
    { num: '36', title: 'Platform Introduction & Research Mapping', section: 'SECTION 08: FINAL SOLUTION', desc: 'PawBridge platform architecture, research-to-design rationale & interactive prototype launcher' },
    { num: '37', title: 'Final Supporter Journey & Key Interactions', section: 'SECTION 08: FINAL SOLUTION', desc: '5-phase supporter journey, 64px desktop topbar, micro-unit selection & address auto-copy' },
    { num: '38', title: 'Hi-Fi: NGO Discovery & Credibility Vault', section: 'SECTION 08: FINAL SOLUTION', desc: 'Regional search filters, verified badges, physical shelter profile & private document vault' },
    { num: '39', title: 'Hi-Fi: Support Needs & Contribution Gateway', section: 'SECTION 08: FINAL SOLUTION', desc: 'Itemized supply appeals, puppy kibble targets, micro-donation modal & non-contact support' },
    { num: '40', title: 'Hi-Fi: Rescue Timelines & Impact Reports', section: 'SECTION 08: FINAL SOLUTION', desc: 'Sheru #PB-408 medical healing stepper, post-op updates & organization-reported impact reports' },
    { num: '41', title: 'Hi-Fi: NGO Operations Console', section: 'SECTION 08: FINAL SOLUTION', desc: 'Shelter document verification hub, 5 status badges, rescue records & request management' },
    { num: '42', title: 'Research Synthesis Matrix & Live Prototype Handoff', section: 'SECTION 08: FINAL SOLUTION', desc: 'Direct empirical mapping, tested findings vs proposed hypotheses & desktop prototype launch' },
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
      pill.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
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

  // 5. Update Section Quick Links active status
  updateSectionQuickLinks(index);

  // 6. Scroll stage into view smoothly if needed
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

function updateSectionQuickLinks(index) {
  const sectionBtns = document.querySelectorAll('.btn-section-tab');
  let currentSection = '01';
  if (index === 0) currentSection = '01';
  else if (index >= 1 && index <= 2) currentSection = '02';
  else if (index >= 3 && index <= 11) currentSection = '03';
  else if (index >= 12 && index <= 14) currentSection = '04';
  else if (index >= 15 && index <= 20) currentSection = '05';
  else if (index >= 21 && index <= 28) currentSection = '06';
  else if (index >= 29 && index <= 34) currentSection = '07';
  else currentSection = '08';

  sectionBtns.forEach(btn => {
    if (btn.getAttribute('data-sec') === currentSection) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
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

  let html = '';
  let currentSection = '';

  DeckState.slides.forEach((s, idx) => {
    if (s.section !== currentSection) {
      currentSection = s.section;
      html += `<div class="grid-section-heading">${currentSection}</div>`;
    }
    html += `
      <div class="grid-thumb-card ${idx === DeckState.currentIndex ? 'active' : ''}" data-index="${idx}">
        <span class="thumb-num">SLIDE ${s.num}</span>
        <h4 class="thumb-title">${s.title}</h4>
        <p class="thumb-desc">${s.desc}</p>
      </div>
    `;
  });

  container.innerHTML = html;

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

// Initialize editable fields with LocalStorage persistence
function initEditableFields() {
  // 1. Cover Page Academic Details
  const facultyInput = document.getElementById('faculty-name-input');
  const dateInput = document.getElementById('submission-date-input');

  const savedFaculty = localStorage.getItem('uedp5_faculty_name');
  const savedDate = localStorage.getItem('uedp5_submission_date');

  if (savedFaculty && facultyInput) {
    facultyInput.value = savedFaculty;
  }
  if (savedDate && dateInput) {
    dateInput.value = savedDate;
  }

  if (facultyInput) {
    facultyInput.addEventListener('input', (e) => {
      localStorage.setItem('uedp5_faculty_name', e.target.value);
    });
    facultyInput.addEventListener('change', () => {
      showToast('✓ Faculty name auto-saved');
    });
  }

  if (dateInput) {
    dateInput.addEventListener('input', (e) => {
      localStorage.setItem('uedp5_submission_date', e.target.value);
    });
    dateInput.addEventListener('change', () => {
      showToast('✓ Submission date auto-saved');
    });
  }

  // 2. Section 07 Brand Project Name & Tagline
  const projectNameInput = document.getElementById('brand-project-name');
  const projectTaglineInput = document.getElementById('brand-project-tagline');

  const savedProjectName = localStorage.getItem('uedp5_project_name');
  const savedProjectTagline = localStorage.getItem('uedp5_project_tagline');

  if (savedProjectName && projectNameInput) {
    projectNameInput.value = savedProjectName;
    updateProjectNameAcrossDeck(savedProjectName);
  }
  if (savedProjectTagline && projectTaglineInput) {
    projectTaglineInput.value = savedProjectTagline;
    updateProjectTaglineAcrossDeck(savedProjectTagline);
  }

  if (projectNameInput) {
    projectNameInput.addEventListener('input', (e) => {
      localStorage.setItem('uedp5_project_name', e.target.value);
      updateProjectNameAcrossDeck(e.target.value);
    });
    projectNameInput.addEventListener('change', () => {
      showToast('✓ Project name auto-saved');
    });
  }

  if (projectTaglineInput) {
    projectTaglineInput.addEventListener('input', (e) => {
      localStorage.setItem('uedp5_project_tagline', e.target.value);
      updateProjectTaglineAcrossDeck(e.target.value);
    });
    projectTaglineInput.addEventListener('change', () => {
      showToast('✓ Project tagline auto-saved');
    });
  }

  // 3. Section 08 Prototype Link & Button Label
  const protoUrlInput = document.getElementById('prototype-url-input');
  const protoLabelInput = document.getElementById('prototype-label-input');

  const savedProtoUrl = localStorage.getItem('uedp5_prototype_url');
  const savedProtoLabel = localStorage.getItem('uedp5_prototype_label');

  if (savedProtoUrl && protoUrlInput) {
    protoUrlInput.value = savedProtoUrl;
    updatePrototypeLinkAcrossDeck(savedProtoUrl);
  }
  if (savedProtoLabel && protoLabelInput) {
    protoLabelInput.value = savedProtoLabel;
    updatePrototypeLabelAcrossDeck(savedProtoLabel);
  }

  if (protoUrlInput) {
    protoUrlInput.addEventListener('input', (e) => {
      localStorage.setItem('uedp5_prototype_url', e.target.value);
      updatePrototypeLinkAcrossDeck(e.target.value);
    });
    protoUrlInput.addEventListener('change', () => {
      showToast('✓ Prototype URL auto-saved');
    });
  }

  if (protoLabelInput) {
    protoLabelInput.addEventListener('input', (e) => {
      localStorage.setItem('uedp5_prototype_label', e.target.value);
      updatePrototypeLabelAcrossDeck(e.target.value);
    });
    protoLabelInput.addEventListener('change', () => {
      showToast('✓ Prototype button label auto-saved');
    });
  }
}

function updatePrototypeLinkAcrossDeck(url) {
  if (!url) return;
  document.querySelectorAll('.btn-prototype-launch').forEach(el => {
    el.setAttribute('href', url);
  });
  document.querySelectorAll('.btn-action-outline').forEach(el => {
    el.setAttribute('href', url);
  });
}

function updatePrototypeLabelAcrossDeck(label) {
  if (!label) return;
  document.querySelectorAll('.btn-prototype-launch').forEach(el => {
    el.textContent = label;
  });
}

function updateProjectNameAcrossDeck(name) {
  if (!name) return;
  document.querySelectorAll('.brand-logo-name').forEach(el => {
    el.textContent = name;
  });
  document.querySelectorAll('.brand-title').forEach(el => {
    el.textContent = `${name} • UEDP-5 Deck`;
  });
}

function updateProjectTaglineAcrossDeck(tagline) {
  if (!tagline) return;
  const cleanTagline = tagline.replace(/^“|”$/g, '').trim();
  document.querySelectorAll('.brand-tagline').forEach(el => {
    el.textContent = `“${cleanTagline}”`;
  });
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

  // Section Tab Buttons
  document.querySelectorAll('.btn-section-tab').forEach(btn => {
    btn.onclick = () => {
      const targetSlide = parseInt(btn.getAttribute('data-target-slide'), 10);
      goToSlide(targetSlide);
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

  // Cover Page "Start Presentation" CTA
  const btnStartCover = document.getElementById('btn-start-presentation');
  if (btnStartCover) {
    btnStartCover.onclick = (e) => {
      e.preventDefault();
      goToSlide(1);
    };
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prevSlide();
    } else if (e.key.toLowerCase() === 'g') {
      toggleGridModal();
    } else if (e.key.toLowerCase() === 'f') {
      toggleFullscreen();
    }
  });

  // Initialize editable fields
  initEditableFields();

  // Initialize on first slide
  goToSlide(0);
});
