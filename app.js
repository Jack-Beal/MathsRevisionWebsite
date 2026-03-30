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
  const idx = ['home','notes','quiz','flashcards','cheatsheet','exam','progress'].indexOf(id);
  const btns = document.querySelectorAll('.tabs button');
  if (idx >= 0 && btns[idx]) btns[idx].classList.add('active');
  if (id === 'progress') renderProgress();
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
let isKnowledgeTest = false;

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
  isKnowledgeTest = false;
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

function startKnowledgeTest() {
  isKnowledgeTest = true;
  showView('quiz');

  // 2 questions per topic, covering all 9 topics (18 questions total)
  const pool = [];
  Object.keys(TOPIC_NAMES).forEach(topic => {
    const topicQs = ALL_QUESTIONS.filter(q => q.topic === topic).sort(() => Math.random() - 0.5);
    pool.push(...topicQs.slice(0, 2));
  });

  quizQuestions = pool.sort(() => Math.random() - 0.5);
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
      <div class="qnum">${isKnowledgeTest ? 'Knowledge Test — ' : ''}Question ${currentQ + 1} of ${quizQuestions.length}</div>
      <div class="qtopic">${isKnowledgeTest ? '🎯 ' : ''}${TOPIC_NAMES[q.topic] || q.topic}</div>
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
  if (isKnowledgeTest) {
    msg = 'Knowledge Test Complete!';
    sub = pct >= 70 ? 'Great overall knowledge! Check the breakdown for any gaps.' : 'See the topic breakdown below — focus on your red areas.';
  } else if (pct >= 80) { msg = 'Excellent work!'; sub = 'You clearly know this material. Keep it up!'; }
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
  saveQuizResult(pct, isKnowledgeTest ? 'knowledge' : 'quiz');
}

function saveQuizResult(pct, type) {
  try {
    const results = JSON.parse(localStorage.getItem('cs11003_results') || '[]');
    results.push({
      date: new Date().toISOString(),
      pct,
      type: type || 'quiz',
      topicBreakdown: JSON.parse(JSON.stringify(topicScores))
    });
    if (results.length > 50) results.shift();
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
let fcTopicSession = {};

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
  fcTopicSession = {};
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
  const card = fcCards[fcIndex];
  if (!fcTopicSession[card.topic]) fcTopicSession[card.topic] = { easy: 0, medium: 0, hard: 0 };
  fcTopicSession[card.topic][rating]++;
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
  saveFcSession();
}

function saveFcSession() {
  try {
    const sessions = JSON.parse(localStorage.getItem('cs11003_fc_sessions') || '[]');
    sessions.push({
      date: new Date().toISOString(),
      topic: fcActiveTopic,
      easy: fcSession.easy,
      medium: fcSession.medium,
      hard: fcSession.hard,
      topicBreakdown: JSON.parse(JSON.stringify(fcTopicSession))
    });
    if (sessions.length > 50) sessions.shift();
    localStorage.setItem('cs11003_fc_sessions', JSON.stringify(sessions));
  } catch(e) {}
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
// PROGRESS & AI EXPORT
// ============================================================

const TOPIC_ICONS = {
  permutations: '🔢', graphs: '🕸️', bipartite: '🔗',
  operations: '🔀', connectivity: '🔌', euler: '🌉',
  probability: '🎲', bayes: '🔮', distributions: '📊'
};

function renderProgress() {
  try {
    const results = JSON.parse(localStorage.getItem('cs11003_results') || '[]');
    const fcSessions = JSON.parse(localStorage.getItem('cs11003_fc_sessions') || '[]');

    // --- Overview Stats ---
    const quizCount = results.filter(r => r.type !== 'knowledge').length;
    const ktCount = results.filter(r => r.type === 'knowledge').length;
    const avgScore = results.length > 0
      ? Math.round(results.reduce((s, r) => s + r.pct, 0) / results.length) : 0;
    const totalCards = fcSessions.reduce((s, ses) => s + ses.easy + ses.medium + ses.hard, 0);

    const overviewEl = document.getElementById('progress-overview');
    if (overviewEl) {
      overviewEl.innerHTML = `
        <div class="stat-card"><div class="stat-val">${quizCount}</div><div class="stat-label">Quizzes Done</div></div>
        <div class="stat-card"><div class="stat-val">${ktCount}</div><div class="stat-label">Knowledge Tests</div></div>
        <div class="stat-card"><div class="stat-val">${avgScore > 0 ? avgScore + '%' : '—'}</div><div class="stat-label">Avg Score</div></div>
        <div class="stat-card"><div class="stat-val">${totalCards}</div><div class="stat-label">Cards Reviewed</div></div>
      `;
    }

    // --- Build per-topic data ---
    const topicData = {};
    Object.keys(TOPIC_NAMES).forEach(t => {
      topicData[t] = { correct: 0, total: 0, easy: 0, medium: 0, hard: 0 };
    });

    results.forEach(r => {
      if (r.topicBreakdown) {
        Object.entries(r.topicBreakdown).forEach(([t, s]) => {
          if (topicData[t]) {
            topicData[t].correct += s.correct || 0;
            topicData[t].total += s.total || 0;
          }
        });
      }
    });

    fcSessions.forEach(ses => {
      if (ses.topicBreakdown) {
        Object.entries(ses.topicBreakdown).forEach(([t, s]) => {
          if (topicData[t]) {
            topicData[t].easy += s.easy || 0;
            topicData[t].medium += s.medium || 0;
            topicData[t].hard += s.hard || 0;
          }
        });
      }
    });

    // --- Topic Mastery ---
    let masteryHtml = '';
    Object.entries(topicData).forEach(([topic, data]) => {
      const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : -1;
      const barCls = pct >= 70 ? '' : pct >= 50 ? 'mid' : 'low';
      const pctCls = pct >= 70 ? 'good' : pct >= 50 ? 'mid' : 'bad';
      const fcTotal = data.easy + data.medium + data.hard;
      const fcStr = fcTotal > 0
        ? `<span style="color:var(--green)">✓${data.easy}</span> <span style="color:var(--yellow)">~${data.medium}</span> <span style="color:var(--red)">✗${data.hard}</span>`
        : '<span style="color:var(--muted)">No flashcard data</span>';

      masteryHtml += `
        <div class="mastery-row">
          <div class="mastery-label">
            <span>${TOPIC_ICONS[topic] || ''}</span>
            <span class="mastery-name">${TOPIC_NAMES[topic]}</span>
          </div>
          <div class="mastery-bar-section">
            <div class="mastery-bar"><div class="mastery-fill ${barCls}" style="width:${Math.max(pct, 0)}%"></div></div>
            <span class="mastery-pct ${pctCls}">${pct >= 0 ? pct + '%' : '—'}</span>
          </div>
          <div class="mastery-fc">${fcStr}</div>
        </div>
      `;
    });

    const masteryEl = document.getElementById('topic-mastery-list');
    if (masteryEl) {
      masteryEl.innerHTML = masteryHtml ||
        '<p style="color:var(--muted);font-size:0.85rem;">Complete a quiz or knowledge test to see topic mastery.</p>';
    }

    // --- Recent Activity ---
    const allActivity = [];
    results.forEach(r => {
      allActivity.push({
        date: r.date,
        type: r.type === 'knowledge' ? 'knowledge' : 'quiz',
        label: r.type === 'knowledge' ? '🎯 Knowledge Test' : '🧪 Practice Quiz',
        detail: r.pct + '% score',
        pct: r.pct
      });
    });
    fcSessions.forEach(ses => {
      const total = ses.easy + ses.medium + ses.hard;
      allActivity.push({
        date: ses.date,
        type: 'flashcards',
        label: '🃏 Flashcards — ' + (ses.topic === 'all' ? 'All Topics' : (TOPIC_NAMES[ses.topic] || ses.topic)),
        detail: `${total} cards · ✓${ses.easy} ~${ses.medium} ✗${ses.hard}`
      });
    });

    allActivity.sort((a, b) => new Date(b.date) - new Date(a.date));

    let activityHtml = '';
    if (allActivity.length === 0) {
      activityHtml = '<p style="color:var(--muted);font-size:0.85rem;">No activity yet. Complete a quiz or flashcard session!</p>';
    } else {
      allActivity.slice(0, 10).forEach(item => {
        const d = new Date(item.date);
        const dateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) +
          ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        const pctStyle = item.pct !== undefined
          ? `color:${item.pct >= 70 ? 'var(--green)' : item.pct >= 50 ? 'var(--yellow)' : 'var(--red)'}`
          : 'color:var(--muted)';
        activityHtml += `
          <div class="activity-item">
            <div class="activity-info">
              <span class="activity-label">${item.label}</span>
              <span class="activity-detail" style="${pctStyle}">${item.detail}</span>
            </div>
            <span class="activity-date">${dateStr}</span>
          </div>
        `;
      });
    }

    const activityEl = document.getElementById('recent-activity-list');
    if (activityEl) activityEl.innerHTML = activityHtml;

    // --- AI Export ---
    const exportEl = document.getElementById('ai-export-text');
    if (exportEl) {
      exportEl.value = generateAIExport(topicData, results, fcSessions, quizCount, ktCount, avgScore, totalCards);
    }

  } catch(e) { console.error('renderProgress error:', e); }
}

function generateAIExport(topicData, results, fcSessions, quizCount, ktCount, avgScore, totalCards) {
  if (results.length === 0 && fcSessions.length === 0) {
    return 'No data yet. Complete some quizzes and flashcard sessions first, then come back to export your progress.';
  }

  const now = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const line = '='.repeat(52);
  const dash = '-'.repeat(36);

  let text = `CS11003 Discrete Maths — Revision Progress Report\n`;
  text += `Generated: ${now}\n`;
  text += `${line}\n\n`;

  text += `OVERALL STATS\n${dash}\n`;
  text += `Practice quizzes taken:   ${quizCount}\n`;
  text += `Knowledge tests taken:    ${ktCount}\n`;
  text += `Average score:            ${avgScore > 0 ? avgScore + '%' : 'N/A'}\n`;
  if (results.length > 0) {
    text += `Best score:               ${Math.max(...results.map(r => r.pct))}%\n`;
    const last = results[results.length - 1];
    text += `Most recent score:        ${last.pct}% (${new Date(last.date).toLocaleDateString('en-GB')})\n`;
  }
  text += `Flashcard cards reviewed: ${totalCards}\n\n`;

  text += `TOPIC MASTERY (Quiz Performance)\n${dash}\n`;
  const weakTopics = [], strongTopics = [];
  Object.entries(topicData).forEach(([topic, data]) => {
    const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : null;
    const icon = pct === null ? '⬜' : pct >= 70 ? '✅' : pct >= 50 ? '🟡' : '🔴';
    const status = pct === null ? 'not yet tested' : `${pct}% (${data.correct}/${data.total} correct) [${pct >= 70 ? 'STRONG' : pct >= 50 ? 'OK' : 'WEAK'}]`;
    text += `${icon} ${TOPIC_NAMES[topic]}: ${status}\n`;
    if (pct !== null && pct < 60) weakTopics.push({ name: TOPIC_NAMES[topic], pct });
    if (pct !== null && pct >= 70) strongTopics.push({ name: TOPIC_NAMES[topic], pct });
  });
  text += `\n`;

  text += `FLASHCARD PERFORMANCE\n${dash}\n`;
  let anyFc = false;
  Object.entries(topicData).forEach(([topic, data]) => {
    const total = data.easy + data.medium + data.hard;
    if (total > 0) {
      anyFc = true;
      const pct = Math.round((data.easy / total) * 100);
      text += `${TOPIC_NAMES[topic]}: Got it:${data.easy} Unsure:${data.medium} Again:${data.hard} (${pct}% confident)\n`;
    }
  });
  if (!anyFc) text += `No flashcard sessions recorded yet.\n`;
  text += `\n`;

  if (weakTopics.length > 0) {
    text += `WEAK AREAS — FOCUS ON THESE\n${dash}\n`;
    weakTopics.sort((a, b) => a.pct - b.pct).forEach(t => {
      text += `🔴 ${t.name}: ${t.pct}% average\n`;
    });
    text += `\n`;
  }

  if (strongTopics.length > 0) {
    text += `STRONG AREAS (70%+)\n${dash}\n`;
    strongTopics.forEach(t => { text += `✅ ${t.name}: ${t.pct}%\n`; });
    text += `\n`;
  }

  text += `RECENT QUIZ HISTORY (last 5)\n${dash}\n`;
  const last5 = [...results].reverse().slice(0, 5);
  if (last5.length === 0) {
    text += `No quiz history yet.\n`;
  } else {
    last5.forEach(r => {
      const d = new Date(r.date).toLocaleDateString('en-GB');
      text += `${d}: ${r.type === 'knowledge' ? 'Knowledge Test' : 'Practice Quiz'} — ${r.pct}%\n`;
    });
  }
  text += `\n`;

  text += `${line}\n`;
  text += `PASTE TO AI — PROMPT BELOW\n`;
  text += `${line}\n\n`;
  text += `I am revising for my CS11003 Discrete Mathematics exam (target: 70% to pass). `;
  text += `The data above shows my current performance across all topics.\n\n`;

  if (weakTopics.length > 0) {
    const weakNames = weakTopics.map(t => t.name).join(', ');
    text += `My weak areas are: ${weakNames}.\n\n`;
    text += `Please help me by:\n`;
    text += `1. Explaining the key concepts I'm likely misunderstanding in each weak area\n`;
    text += `2. Giving 2-3 worked examples for each weak area\n`;
    text += `3. Pointing out common mistakes students make in these topics\n`;
    text += `4. Suggesting what to focus on most given my exam is very soon\n`;
  } else if (results.length > 0) {
    text += `Please review my progress and suggest what to focus on to push my score above 70%.\n`;
  } else {
    text += `I haven't done any quizzes yet. Please give me a study plan covering all 9 topics.\n`;
  }

  return text;
}

function copyAIExport() {
  const el = document.getElementById('ai-export-text');
  if (!el || !el.value) return;
  const showConfirm = () => {
    const c = document.getElementById('copy-confirm');
    if (c) { c.style.display = 'inline'; setTimeout(() => { c.style.display = 'none'; }, 2500); }
  };
  navigator.clipboard.writeText(el.value).then(showConfirm).catch(() => {
    el.select();
    document.execCommand('copy');
    showConfirm();
  });
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
