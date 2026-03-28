/* ============================================================
   CS11003 Revision — App Logic
   ============================================================ */

// ============================================================
// NAVIGATION
// ============================================================

function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
  document.getElementById('view-' + id).classList.add('active');
  const idx = ['home','notes','quiz','flashcards','cheatsheet','exam'].indexOf(id);
  const btns = document.querySelectorAll('.tabs button');
  if (idx >= 0 && btns[idx]) btns[idx].classList.add('active');
  window.scrollTo(0, 0);
}

// ============================================================
// NOTES
// ============================================================

function openTopic(key) {
  showView('notes');
  const topic = TOPICS[key];
  if (!topic) return;

  document.getElementById('notes-list').style.display = 'none';
  const detail = document.getElementById('topic-detail');
  detail.style.display = 'block';

  let html = `
    <button class="back-btn" onclick="backToNotesList()">← Back to Topics</button>
    <div class="topic-content">
      <h2><span>${topic.icon}</span> ${topic.name}</h2>
  `;

  topic.sections.forEach(sec => {
    html += `
      <div class="section-block">
        <h3>${sec.title}</h3>
        ${sec.content}
      </div>
    `;
  });

  html += `</div>`;
  detail.innerHTML = html;
}

function backToNotesList() {
  document.getElementById('notes-list').style.display = 'block';
  document.getElementById('topic-detail').style.display = 'none';
}

// ============================================================
// QUIZ
// ============================================================

let quizQuestions = [];
let currentQ = 0;
let score = 0;
let answered = false;
let topicScores = {};

const TOPIC_NAMES = {
  permutations: 'Permutations',
  graphs: 'Graph Basics',
  bipartite: 'Bipartite & Matching',
  operations: 'Graph Operations',
  connectivity: 'Connectivity',
  euler: 'Euler & Hamiltonian',
  probability: 'Probability',
  bayes: "Bayes' Theorem",
  distributions: 'Distributions'
};

function startQuiz() {
  const filter = document.getElementById('quiz-topic-filter').value;
  const sizeEl = document.getElementById('quiz-size');
  const size = sizeEl ? parseInt(sizeEl.value) || 15 : 15;

  let pool = filter === 'all' ? [...ALL_QUESTIONS] : ALL_QUESTIONS.filter(q => q.topic === filter);

  // Shuffle
  pool = pool.sort(() => Math.random() - 0.5);
  quizQuestions = pool.slice(0, Math.min(size, pool.length));

  currentQ = 0;
  score = 0;
  topicScores = {};
  answered = false;

  document.getElementById('result-screen').classList.remove('show');
  renderQuestion();
}

function renderQuestion() {
  if (currentQ >= quizQuestions.length) {
    showResults();
    return;
  }

  answered = false;
  const q = quizQuestions[currentQ];
  const progress = ((currentQ) / quizQuestions.length) * 100;
  document.getElementById('quiz-progress').style.width = progress + '%';

  const letters = ['A', 'B', 'C', 'D'];
  document.getElementById('q-container').innerHTML = `
    <div class="question-card">
      <div class="qnum">Question ${currentQ + 1} of ${quizQuestions.length}</div>
      <div class="qtopic">${TOPIC_NAMES[q.topic] || q.topic}</div>
      <h3>${q.q}</h3>
      <div class="options">
        ${q.opts.map((opt, i) => `
          <button class="option" onclick="selectAnswer(${i})">
            <span class="opt-letter">${letters[i]}</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>
      <div class="explanation" id="explanation">${q.exp}</div>
    </div>
    <div class="quiz-nav">
      <div class="score-badge">Score: <span>${score}/${currentQ}</span></div>
      <button class="btn btn-primary" id="next-btn" onclick="nextQuestion()" style="display:none;">
        ${currentQ + 1 === quizQuestions.length ? 'See Results →' : 'Next Question →'}
      </button>
    </div>
  `;
}

function selectAnswer(chosen) {
  if (answered) return;
  answered = true;

  const q = quizQuestions[currentQ];
  const opts = document.querySelectorAll('.option');
  opts.forEach(o => o.disabled = true);

  if (!topicScores[q.topic]) topicScores[q.topic] = { correct: 0, total: 0 };
  topicScores[q.topic].total++;

  if (chosen === q.ans) {
    opts[chosen].classList.add('correct');
    score++;
    topicScores[q.topic].correct++;
  } else {
    opts[chosen].classList.add('wrong');
    opts[q.ans].classList.add('correct');
  }

  const expEl = document.getElementById('explanation');
  expEl.classList.add('show');
  if (chosen !== q.ans) expEl.classList.add('wrong-exp');
  document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
  currentQ++;
  renderQuestion();
}

function showResults() {
  document.getElementById('q-container').innerHTML = '';
  document.getElementById('quiz-progress').style.width = '100%';

  const pct = Math.round((score / quizQuestions.length) * 100);
  const screen = document.getElementById('result-screen');
  screen.classList.add('show');
  document.getElementById('result-pct').textContent = pct + '%';

  const circle = document.getElementById('result-circle');
  circle.className = 'result-circle';
  if (pct >= 70) { /* green is default */ }
  else if (pct >= 50) circle.classList.add('close');
  else circle.classList.add('fail');

  let msg, sub;
  if (pct >= 80) { msg = 'Excellent work!'; sub = 'You clearly know this material. Keep it up!'; }
  else if (pct >= 70) { msg = 'Above pass threshold!'; sub = 'You\'re on track for 70%. Review missed topics.'; }
  else if (pct >= 50) { msg = 'Getting there!'; sub = 'Focus on the weak topics below to get to 70%.'; }
  else { msg = 'Time to review the notes!'; sub = 'Go through the revision notes, then try again.'; }

  document.getElementById('result-msg').textContent = msg;
  document.getElementById('result-sub').textContent = sub;

  // Topic breakdown
  let breakdown = '<h4>Performance by Topic</h4>';
  for (const [topic, s] of Object.entries(topicScores)) {
    const tp = Math.round((s.correct / s.total) * 100);
    const cls = tp >= 70 ? 'good' : tp >= 50 ? 'mid' : 'bad';
    const barCls = tp >= 70 ? '' : tp >= 50 ? 'mid' : 'low';
    breakdown += `
      <div class="breakdown-item">
        <span>${TOPIC_NAMES[topic] || topic}</span>
        <div class="breakdown-bar"><div class="breakdown-fill ${barCls}" style="width:${tp}%"></div></div>
        <span class="breakdown-pct ${cls}">${s.correct}/${s.total}</span>
      </div>`;
  }
  document.getElementById('results-breakdown').innerHTML = breakdown;

  // Save to localStorage
  saveQuizResult(pct);
}

function saveQuizResult(pct) {
  try {
    const results = JSON.parse(localStorage.getItem('cs11003_results') || '[]');
    results.push({ date: new Date().toISOString(), pct });
    if (results.length > 20) results.shift();
    localStorage.setItem('cs11003_results', JSON.stringify(results));
    updateHomepageStats();
  } catch(e) {}
}

// ============================================================
// FLASHCARDS with spaced repetition
// ============================================================

let fcCards = [];
let fcIndex = 0;
let fcFlipped = false;
let fcActiveTopic = 'all';
let fcSession = { easy: 0, hard: 0, medium: 0 };
let fcHardCards = [];

function initFlashcards() {
  const topicBtns = document.getElementById('fc-topic-btns');
  const topicList = [
    ['all', 'All Topics'],
    ['permutations', 'Permutations'],
    ['graphs', 'Graph Basics'],
    ['bipartite', 'Bipartite'],
    ['operations', 'Isomorphism'],
    ['connectivity', 'Connectivity'],
    ['euler', 'Euler/Hamilton'],
    ['probability', 'Probability'],
    ['bayes', "Bayes'"],
    ['distributions', 'Distributions']
  ];

  topicBtns.innerHTML = topicList.map(([k, v]) =>
    `<button class="fc-topic-btn ${k === fcActiveTopic ? 'active' : ''}" onclick="setFcTopic('${k}')">${v}</button>`
  ).join('');

  loadFcCards();
}

function setFcTopic(topic) {
  fcActiveTopic = topic;
  document.querySelectorAll('.fc-topic-btn').forEach(b => {
    const label = b.textContent.trim();
    b.classList.toggle('active',
      (topic === 'all' && label === 'All Topics') ||
      (topic !== 'all' && b.getAttribute('onclick').includes(`'${topic}'`))
    );
  });
  loadFcCards();
}

function loadFcCards() {
  let cards = fcActiveTopic === 'all'
    ? [...ALL_FLASHCARDS]
    : ALL_FLASHCARDS.filter(c => c.topic === fcActiveTopic);

  // Shuffle
  fcCards = cards.sort(() => Math.random() - 0.5);
  fcIndex = 0;
  fcFlipped = false;
  fcSession = { easy: 0, hard: 0, medium: 0 };
  showCard();
}

function showCard() {
  if (fcCards.length === 0) {
    document.getElementById('fc-body').textContent = 'No cards for this topic.';
    return;
  }

  const card = fcCards[fcIndex];
  fcFlipped = false;

  const flashcardEl = document.getElementById('flashcard');
  flashcardEl.classList.remove('flipped');

  document.getElementById('fc-side').textContent = 'Question';
  document.getElementById('fc-topic-badge').textContent = TOPIC_NAMES[card.topic] || card.topic;
  document.getElementById('fc-body').textContent = card.q;
  document.getElementById('fc-hint').textContent = 'Tap to reveal answer';
  document.getElementById('fc-rating').style.display = 'none';
  document.getElementById('fc-counter').textContent = `Card ${fcIndex + 1} of ${fcCards.length}`;
  updateFcProgress();
}

function flipCard() {
  const card = fcCards[fcIndex];
  if (!fcFlipped) {
    fcFlipped = true;
    document.getElementById('flashcard').classList.add('flipped');
    document.getElementById('fc-side').textContent = 'Answer';
    document.getElementById('fc-body').textContent = card.a;
    document.getElementById('fc-hint').textContent = '';
    document.getElementById('fc-rating').style.display = 'flex';
  }
}

function rateCard(rating) {
  fcSession[rating]++;
  if (rating === 'hard') {
    // Put hard cards at the end to review again
    fcHardCards.push(fcCards[fcIndex]);
  }
  fcNext();
}

function fcNext() {
  fcIndex++;
  // If we've gone through all cards and have hard ones to review
  if (fcIndex >= fcCards.length && fcHardCards.length > 0) {
    const hard = [...fcHardCards];
    fcHardCards = [];
    fcCards = [...fcCards, ...hard];
  }
  if (fcIndex >= fcCards.length) {
    showFcComplete();
    return;
  }
  showCard();
}

function fcPrev() {
  fcIndex = Math.max(0, fcIndex - 1);
  showCard();
}

function shuffleCards() {
  fcCards = fcCards.sort(() => Math.random() - 0.5);
  fcIndex = 0;
  showCard();
}

function showFcComplete() {
  document.getElementById('fc-body').textContent =
    `Session complete! Easy: ${fcSession.easy} | Unsure: ${fcSession.medium} | Again: ${fcSession.hard}`;
  document.getElementById('fc-side').textContent = 'Done!';
  document.getElementById('fc-hint').textContent = 'Click Shuffle to restart';
  document.getElementById('fc-rating').style.display = 'none';
  document.getElementById('fc-counter').textContent = `Reviewed all ${fcCards.length} cards`;
}

function updateFcProgress() {
  const progressEl = document.getElementById('fc-session-stats');
  if (!progressEl) return;
  progressEl.innerHTML = `
    <span style="color:var(--green)">✓ ${fcSession.easy}</span>
    <span style="color:var(--yellow)">~ ${fcSession.medium}</span>
    <span style="color:var(--red)">✗ ${fcSession.hard}</span>
  `;
}

// ============================================================
// EXAM PRACTICE (worked solutions)
// ============================================================

let examPartVisible = {};

function renderExamPractice() {
  const container = document.getElementById('exam-practice-container');
  if (!container) return;

  let html = '';
  EXAM_QUESTIONS.forEach((q, qi) => {
    html += `
      <div class="section-block" style="margin-bottom:20px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
          <h3 style="flex:1;">Question ${qi + 1} — ${q.topic}</h3>
          <span style="background:rgba(99,102,241,0.15);color:var(--accent2);padding:2px 10px;border-radius:20px;font-size:0.78rem;">${q.marks} marks</span>
        </div>
        <p style="font-size:0.9rem;margin-bottom:16px;color:var(--muted);">${q.question}</p>
    `;

    q.parts.forEach((part, pi) => {
      const id = `exam_${qi}_${pi}`;
      html += `
        <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:14px;margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
            <p style="font-size:0.9rem;line-height:1.6;flex:1;">${part.label ? '<strong>' + part.label + '</strong> ' : ''}${part.question}</p>
            <span style="font-size:0.75rem;color:var(--muted);flex-shrink:0;margin-left:8px;">[${part.marks} mark${part.marks>1?'s':''}]</span>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="btn btn-sm btn-secondary" onclick="toggleHint('${id}')">Hint</button>
            <button class="btn btn-sm btn-primary" onclick="toggleSolution('${id}')">Show Solution</button>
          </div>
          <div id="hint_${id}" style="display:none;margin-top:10px;" class="tip-box">
            <div class="label">Hint</div><p>${part.hint}</p>
          </div>
          <div id="sol_${id}" style="display:none;margin-top:10px;" class="ex-box">
            <div class="label">Worked Solution</div>
            <p style="white-space:pre-wrap;">${part.answer}</p>
          </div>
        </div>
      `;
    });

    html += `</div>`;
  });

  container.innerHTML = html;
}

function toggleHint(id) {
  const el = document.getElementById('hint_' + id);
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function toggleSolution(id) {
  const el = document.getElementById('sol_' + id);
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

// ============================================================
// HOMEPAGE STATS
// ============================================================

function updateHomepageStats() {
  try {
    const results = JSON.parse(localStorage.getItem('cs11003_results') || '[]');
    if (results.length === 0) return;

    const best = Math.max(...results.map(r => r.pct));
    const latest = results[results.length - 1].pct;
    const avg = Math.round(results.reduce((s, r) => s + r.pct, 0) / results.length);

    const el = document.getElementById('quiz-stats');
    if (el) {
      el.innerHTML = `
        <div class="stat-card"><div class="stat-val">${best}%</div><div class="stat-label">Best Score</div></div>
        <div class="stat-card"><div class="stat-val">${latest}%</div><div class="stat-label">Last Score</div></div>
        <div class="stat-card"><div class="stat-val">${avg}%</div><div class="stat-label">Average</div></div>
        <div class="stat-card"><div class="stat-val">${results.length}</div><div class="stat-label">Quizzes Done</div></div>
      `;
    }
  } catch(e) {}
}

// ============================================================
// COUNTDOWN
// ============================================================

function updateCountdown() {
  const testDate = new Date('2026-04-02T09:00:00');
  const now = new Date();
  const diff = testDate - now;

  if (diff <= 0) {
    document.getElementById('daysLeft').textContent = '0';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  document.getElementById('daysLeft').textContent = days;
  const labelEl = document.getElementById('countdown-label');
  if (labelEl) labelEl.textContent = days === 1 ? 'day to test' : 'days to test';

  if (document.getElementById('testDateStr')) {
    document.getElementById('testDateStr').textContent = 'Thursday 2nd April';
  }
}

// ============================================================
// INIT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  updateCountdown();
  setInterval(updateCountdown, 60000);

  initFlashcards();
  startQuiz();
  renderExamPractice();
  updateHomepageStats();
});
