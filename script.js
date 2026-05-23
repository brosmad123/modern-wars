/* ============================================
   NORWAY ENERGY — Main JavaScript
   Interactions, animations, games
   ============================================ */

// ==========================================
// NAVBAR SCROLL BEHAVIOR
// ==========================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));

// Close on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ==========================================
// PARTICLE SYSTEM (hero)
// ==========================================
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 55; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 2.5 + 0.5;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dur = Math.random() * 12 + 8;
    const delay = Math.random() * 10;
    const opacity = Math.random() * 0.5 + 0.1;
    Object.assign(p.style, {
      position: 'absolute',
      left: x + '%',
      top: y + '%',
      width: size + 'px',
      height: size + 'px',
      background: Math.random() > 0.5 ? '#00e5ff' : '#00c87a',
      borderRadius: '50%',
      opacity: opacity,
      animation: `particle-float ${dur}s ${delay}s ease-in-out infinite`,
    });
    container.appendChild(p);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes particle-float {
      0%, 100% { transform: translateY(0px) translateX(0px); opacity: var(--op, 0.2); }
      25% { transform: translateY(-20px) translateX(8px); }
      50% { transform: translateY(-8px) translateX(-12px); opacity: calc(var(--op, 0.2) * 2.5); }
      75% { transform: translateY(-30px) translateX(5px); }
    }
  `;
  document.head.appendChild(style);
})();

// ==========================================
// INTERSECTION OBSERVER — animated entries
// ==========================================
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -60px 0px' };

// Fade-up cards
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
    }
  });
}, observerOptions);
document.querySelectorAll('.ov-card').forEach(el => cardObserver.observe(el));

// ==========================================
// HERO STAT COUNTERS
// ==========================================
function animateCounter(el, target, suffix = '', duration = 1800) {
  let start = null;
  const startVal = 0;
  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * (target - startVal) + startVal);
    el.textContent = current.toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(step);
}

// Hero stats observer
const heroStatsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.hs-num').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
      });
      heroStatsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroStatsObserver.observe(heroStats);

// ==========================================
// ENERGY BAR ANIMATION
// ==========================================
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.bar-fill').forEach(bar => {
        const w = bar.dataset.width;
        setTimeout(() => { bar.style.width = w + '%'; }, 300);
      });
      barObserver.disconnect();
    }
  });
}, { threshold: 0.4 });
const breakdown = document.querySelector('.energy-breakdown');
if (breakdown) barObserver.observe(breakdown);

// ==========================================
// FACT COUNTERS
// ==========================================
const factObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.fact-counter').forEach(el => {
        const target = parseInt(el.dataset.target);
        animateCounter(el, target, '', 2200);
      });
      factObserver.disconnect();
    }
  });
}, { threshold: 0.3 });
const factsGrid = document.querySelector('.facts-grid');
if (factsGrid) factObserver.observe(factsGrid);

// ==========================================
// GAMES TABS
// ==========================================
const gameTabs = document.querySelectorAll('.game-tab');
const gamePanels = document.querySelectorAll('.game-panel');
gameTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    gameTabs.forEach(t => t.classList.remove('active'));
    gamePanels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('tab-' + tab.dataset.tab);
    if (panel) panel.classList.add('active');
  });
});

// ==========================================
// QUIZ GAME
// ==========================================
const quizQuestions = [
  {
    q: "What percentage of Norway's electricity comes from renewable sources?",
    options: ['Around 60%', 'Around 75%', 'Around 85%', 'Over 98%'],
    answer: 3,
    explanation: 'Norway gets over 98% of its electricity from renewables, primarily hydropower.'
  },
  {
    q: "What is the primary source of electricity in Norway?",
    options: ['Wind power', 'Solar panels', 'Hydroelectric power', 'Nuclear energy'],
    answer: 2,
    explanation: 'Hydropower accounts for roughly 92% of all electricity production in Norway.'
  },
  {
    q: "Approximately how many hydropower plants does Norway operate?",
    options: ['Around 200', 'Around 500', 'Over 1,700', 'Around 3,000'],
    answer: 2,
    explanation: 'Norway has over 1,700 hydropower plants ranging from massive dams to small mountain turbines.'
  },
  {
    q: "What percentage of new car sales in Norway were electric vehicles in 2023?",
    options: ['Around 30%', 'Around 55%', 'Over 80%', 'Around 95%'],
    answer: 2,
    explanation: 'Over 80% of new car sales in Norway in 2023 were fully electric — the highest rate in the world.'
  },
  {
    q: "Which Norwegian energy company built the world's first floating offshore wind farm?",
    options: ['Statkraft', 'Equinor', 'Hydro', 'Yara'],
    answer: 1,
    explanation: 'Equinor (formerly Statoil) built Hywind Scotland in 2017 — the world\'s first floating offshore wind farm.'
  },
  {
    q: "What natural feature of Norway makes it ideal for hydroelectric power?",
    options: ['Flat plains', 'Desert regions', 'Mountain terrain and glacial rivers', 'Tropical rainforests'],
    answer: 2,
    explanation: 'Norway\'s steep mountain terrain and thousands of glacial rivers create perfect conditions for hydropower.'
  },
  {
    q: "Norway is one of the world's largest exporters of what fuel, yet uses almost none for its own electricity?",
    options: ['Coal', 'Petroleum (oil and gas)', 'Uranium', 'Wood biomass'],
    answer: 1,
    explanation: 'Despite being the 3rd largest petroleum exporter globally, Norway uses virtually no oil for its own electricity generation.'
  },
  {
    q: "What is Norway's target year for achieving carbon neutrality?",
    options: ['2025', '2030', '2040', '2050'],
    answer: 1,
    explanation: 'Norway has pledged to achieve carbon neutrality by 2030 — twenty years ahead of most nations.'
  }
];

let currentQ = 0;
let score = 0;
let answered = false;

function loadQuestion() {
  if (currentQ >= quizQuestions.length) {
    showQuizResult();
    return;
  }
  const q = quizQuestions[currentQ];
  document.getElementById('quizQuestion').textContent = q.q;
  document.getElementById('quizQ').textContent = currentQ + 1;
  const opts = document.getElementById('quizOptions');
  opts.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = opt;
    btn.addEventListener('click', () => selectAnswer(i));
    opts.appendChild(btn);
  });
  answered = false;
}

function selectAnswer(idx) {
  if (answered) return;
  answered = true;
  const q = quizQuestions[currentQ];
  const opts = document.querySelectorAll('.quiz-opt');
  opts[q.answer].classList.add('correct');
  if (idx !== q.answer) {
    opts[idx].classList.add('wrong');
  } else {
    score++;
    document.getElementById('quizScore').textContent = score;
  }
  // Show explanation
  const expl = document.createElement('div');
  expl.style.cssText = 'margin-top:1rem;padding:0.8rem 1.2rem;background:rgba(0,229,255,0.06);border:1px solid rgba(0,229,255,0.2);border-radius:6px;font-size:0.85rem;color:#6a8fa8;line-height:1.6;';
  expl.textContent = '💡 ' + q.explanation;
  document.getElementById('quizOptions').appendChild(expl);

  setTimeout(() => {
    currentQ++;
    loadQuestion();
  }, 2200);
}

function showQuizResult() {
  document.getElementById('quizCard').style.display = 'none';
  const result = document.getElementById('quizResult');
  result.style.display = 'block';
  const pct = Math.round((score / quizQuestions.length) * 100);
  let msg = pct >= 80 ? '🌟 Excellent! You\'re a Norway energy expert!' :
            pct >= 60 ? '✅ Good work! You know your Norwegian energy.' :
            '📚 Keep learning — Norway\'s energy story is fascinating!';
  document.getElementById('finalScore').textContent = score + '/' + quizQuestions.length + ' — ' + pct + '%';
  result.querySelector('h3').textContent = msg;
}

function resetQuiz() {
  currentQ = 0; score = 0;
  document.getElementById('quizScore').textContent = '0';
  document.getElementById('quizCard').style.display = 'block';
  document.getElementById('quizResult').style.display = 'none';
  loadQuestion();
}

loadQuestion();

// ==========================================
// COST / ENERGY BUILDER GAME
// ==========================================
let budget = 500;
let powerGen = 0;
let co2Score = 0;
const maxBudget = 500;
const GOAL = 140;
const energyTypes = {
  hydro:   { cost: 50, output: 20, emission: 0,  label: '💧 Hydro Dam', coal: false },
  wind:    { cost: 30, output: 8,  emission: 0,  label: '💨 Wind Farm', coal: false },
  solar:   { cost: 20, output: 3,  emission: 0,  label: '☀️ Solar Farm', coal: false },
  coal:    { cost: 15, output: 10, emission: 40, label: '⚫ Coal Plant', coal: true },
  nuclear: { cost: 120,output: 35, emission: 2,  label: '☢️ Nuclear Plant', coal: false },
  gas:     { cost: 25, output: 12, emission: 15, label: '🔥 Gas Plant', coal: false },
};
const purchases = [];

function buyEnergy(type) {
  const e = energyTypes[type];
  if (budget < e.cost) {
    showToast('❌ Not enough budget!');
    return;
  }
  budget -= e.cost;
  powerGen += e.output;
  co2Score += e.emission;
  purchases.push({ type, label: e.label, coal: e.coal });
  updateGridStatus();
  renderPurchases();
  checkWin();
}

function updateGridStatus() {
  const powerPct = Math.min((powerGen / GOAL) * 100, 100);
  const budgetPct = (budget / maxBudget) * 100;
  const co2Pct = Math.min((co2Score / 100) * 100, 100);
  document.getElementById('powerFill').style.width = powerPct + '%';
  document.getElementById('budgetFill').style.width = budgetPct + '%';
  document.getElementById('co2Fill').style.width = co2Pct + '%';
  document.getElementById('powerGen').textContent = powerGen;
  document.getElementById('budgetLeft').textContent = budget;
  document.getElementById('budget').textContent = budget;
  const co2Label = document.getElementById('co2Label');
  if (co2Score === 0) co2Label.textContent = 'Clean ✅';
  else if (co2Score < 20) co2Label.textContent = 'Low Emissions 🟡';
  else if (co2Score < 60) co2Label.textContent = 'Moderate Emissions ⚠️';
  else co2Label.textContent = 'High Pollution ❌';
  // Update co2 fill color based on value
  const fill = document.getElementById('co2Fill');
  if (co2Score === 0) fill.style.background = 'linear-gradient(90deg, #00c87a, #00fff7)';
  else if (co2Score < 20) fill.style.background = 'linear-gradient(90deg, #fbbf24, #f59e0b)';
  else fill.style.background = 'linear-gradient(90deg, #ef4444, #dc2626)';
}

function renderPurchases() {
  const container = document.getElementById('purchases');
  container.innerHTML = purchases.map(p =>
    `<span class="purchase-tag ${p.coal ? 'coal' : ''}">${p.label}</span>`
  ).join('');
}

function checkWin() {
  if (powerGen >= GOAL) {
    const isClean = co2Score === 0;
    const budgetUsed = maxBudget - budget;
    setTimeout(() => {
      showToast(`🎉 Norway is powered! ${isClean ? '🌱 100% Clean!' : '⚠️ Some emissions. Try again with only renewables!'} Budget used: ${budgetUsed}B NOK`);
    }, 300);
  }
}

function resetCostGame() {
  budget = 500;
  powerGen = 0;
  co2Score = 0;
  purchases.length = 0;
  document.getElementById('purchases').innerHTML = '';
  document.getElementById('budget').textContent = budget;
  updateGridStatus();
}

// Toast notification
function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  Object.assign(toast.style, {
    position: 'fixed', bottom: '2rem', right: '2rem', zIndex: '9999',
    background: 'rgba(13,40,64,0.97)', border: '1px solid rgba(0,229,255,0.4)',
    color: '#e8f4f8', padding: '1rem 1.5rem', borderRadius: '8px',
    fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.9rem',
    maxWidth: '380px', boxShadow: '0 0 30px rgba(0,229,255,0.2)',
    animation: 'toast-in 0.3s ease', lineHeight: '1.5',
    backdropFilter: 'blur(12px)',
  });
  document.body.appendChild(toast);
  const style = document.createElement('style');
  style.textContent = '@keyframes toast-in { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }';
  document.head.appendChild(style);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

// ==========================================
// FJORD EXPLORER GAME
// ==========================================
const regionData = {
  'exp-north': {
    name: 'Northern Norway',
    type: 'ARCTIC REGION',
    desc: 'Home to Tromsø and vast Arctic fjords, Northern Norway harnesses powerful hydropower from snow-fed mountain rivers. The Hammerfest area hosts Norway\'s northernmost wind farms, while the midnight sun and polar night define this region\'s unique energy patterns. The region also has untapped offshore wind potential in the Barents Sea.',
    items: ['💧 Arctic Hydropower', '💨 Onshore Wind', '🌊 Tidal Potential', '🌌 Aurora Research']
  },
  'exp-west': {
    name: 'Western Norway',
    type: 'FJORD HEARTLAND',
    desc: 'Bergen and the fjord heartland is Norway\'s hydropower capital. The dramatic Hardanger and Sognefjord regions contain hundreds of glacial rivers and reservoirs. Statkraft and Hydro operate some of their largest facilities here. The deep fjords also make this region a test bed for offshore floating wind technology.',
    items: ['💧 Major Hydro Dams', '🏔️ Glacial Reservoirs', '⛴️ Electric Ferries', '💨 Coastal Wind']
  },
  'exp-central': {
    name: 'Central Norway',
    type: 'WIND FRONTIER',
    desc: 'The Trøndelag region is home to the massive Fosen Vind wind project — one of Europe\'s largest onshore wind farms with 1,057 MW of capacity. Rolling mountains and consistent winds make this Norway\'s fastest-growing wind energy region. Hydropower from the Gaula and Orkla river systems adds to the energy mix.',
    items: ['💨 Fosen Wind Farm', '💧 River Hydropower', '⚡ Grid Interconnect', '🏭 Industry Power']
  },
  'exp-south': {
    name: 'Southern Norway',
    type: 'CAPITAL & COAST',
    desc: 'Oslo and the southern coast drive Norway\'s EV revolution and smart grid innovation. The Numedal and Telemark hydropower systems supply the capital. Oslo has become a model for electric buses, trams, and ferries. The Sørlige Nordsjø II offshore wind zone off the southern coast will become Norway\'s largest wind project.',
    items: ['🚗 EV Capital', '💧 Telemark Hydro', '🌊 Offshore Wind Zone', '🚌 Electric Transit']
  }
};

const explorerRegions = document.querySelectorAll('.exp-region');
const explorerInfo = document.getElementById('explorerInfo');

explorerRegions.forEach(region => {
  region.addEventListener('click', () => {
    // Reset all
    explorerRegions.forEach(r => r.classList.remove('active-region'));
    region.classList.add('active-region');
    const data = regionData[region.id];
    if (!data) return;
    explorerInfo.innerHTML = `
      <div style="animation: fade-in-up 0.4s ease">
        <div class="ei-region-type">${data.type}</div>
        <div class="ei-region-name">${data.name}</div>
        <div class="ei-region-desc">${data.desc}</div>
        <div class="ei-energy-items">
          ${data.items.map(i => `<span class="ei-item">${i}</span>`).join('')}
        </div>
      </div>
    `;
    const s = document.createElement('style');
    s.textContent = '@keyframes fade-in-up { from{opacity:0;transform:translateY(15px)} to{opacity:1;transform:translateY(0)} }';
    document.head.appendChild(s);
  });
});

// ==========================================
// SMOOTH SCROLL ACTIVE NAV
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
  navLinksAll.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--cyan)';
    }
  });
});

// ==========================================
// REVEAL ANIMATIONS ON SCROLL
// ==========================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.wf-card, .info-card, .ev-stat, .source-card, .market-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(25px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// ==========================================
// SECTION TITLE REVEAL
// ==========================================
const titleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.section-title, .section-intro, .section-label').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  titleObserver.observe(el);
});

// ==========================================
// INIT
// ==========================================
console.log('%c⚡ Norway Energy Website Loaded', 'color:#00e5ff;font-size:14px;font-family:monospace;');
console.log('%cData sourced from NVE, IEA, SSB, and Equinor.', 'color:#6a8fa8;font-size:11px;');
