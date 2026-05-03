'use strict';
/* ═══════════════════════════════════════════════════
   VoteIQ India — Phase 5 JS
   Process · Upcoming · Facts · Quiz · AI · Voter Guide
   ═══════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════
   ELECTION PROCESS TIMELINE
   ═══════════════════════════════════════════════════ */
(async function initElectionProcess() {
  const timeline = document.getElementById('process-timeline');
  const detail   = document.getElementById('process-detail');
  if (!timeline || !detail) return;

  const nodes = await fetch('/api/data/election_process').then(r => r.json()).catch(() => []);
  if (!nodes.length) return;

  timeline.innerHTML = nodes.map((n, i) => `
    <div class="process-node reveal" data-id="${n.id}" tabindex="0" role="button" aria-label="Election step: ${n.title}" aria-expanded="false">
      <div class="process-node-icon" aria-hidden="true">${n.icon}</div>
      <div class="process-node-body">
        <div class="process-node-step">Step ${i + 1}</div>
        <div class="process-node-title">${n.title}</div>
        <div class="process-node-article">${n.article}</div>
      </div>
    </div>
  `).join('');

  function showDetail(n, i) {
    detail.innerHTML = `
      <div class="detail-step-badge">Step ${i + 1} of ${nodes.length}</div>
      <div class="detail-title">${n.icon} ${n.title}</div>
      <div class="detail-article">${n.article}</div>
      <div class="detail-desc">${n.description}</div>
      <div class="detail-more">${n.details}</div>
    `;
    document.querySelectorAll('.process-node').forEach(el => el.classList.remove('active'));
    document.querySelector(`.process-node[data-id="${n.id}"]`)?.classList.add('active');
  }

  document.querySelectorAll('.process-node').forEach((el, i) => {
    el.addEventListener('click', () => showDetail(nodes[i], i));
    el.addEventListener('keypress', e => { if (e.key === 'Enter') showDetail(nodes[i], i); });
  });

  // Show first node by default
  if (nodes.length) showDetail(nodes[0], 0);
})();

/* ═══════════════════════════════════════════════════
   UPCOMING ELECTIONS COUNTDOWN
   ═══════════════════════════════════════════════════ */
(function initUpcoming() {
  const grid = document.getElementById('upcoming-grid');
  if (!grid) return;

  const upcoming = [
    { state: 'Bihar',          seats: 243, year: 2025, month: 9,  day: 1, party: 'JDU/BJP (NDA)' },
    { state: 'West Bengal',    seats: 294, year: 2026, month: 4,  day: 1, party: 'TMC vs BJP' },
    { state: 'Kerala',         seats: 140, year: 2026, month: 4,  day: 1, party: 'LDF vs UDF' },
    { state: 'Tamil Nadu',     seats: 234, year: 2026, month: 4,  day: 1, party: 'DMK vs AIADMK' },
    { state: 'Assam',          seats: 126, year: 2026, month: 3,  day: 1, party: 'BJP vs INC' },
    { state: 'Puducherry',     seats: 30,  year: 2026, month: 3,  day: 1, party: 'AINRC vs INC' },
    { state: 'Uttar Pradesh',  seats: 403, year: 2027, month: 2,  day: 1, party: 'BJP vs SP' },
    { state: 'Punjab',         seats: 117, year: 2027, month: 2,  day: 1, party: 'AAP vs BJP/INC' },
    { state: 'Maharashtra',    seats: 288, year: 2029, month: 10, day: 1, party: 'NDA vs MVA' },
  ];

  const timers = [];

  grid.innerHTML = upcoming.map((u, i) => `
    <div class="upcoming-card reveal">
      <div class="upcoming-state-name">${u.state}</div>
      <div class="upcoming-seats">${u.seats} Assembly Seats</div>
      <div class="countdown-wrap" id="cd-${i}">
        <div class="countdown-unit"><div class="countdown-num" id="cd-d-${i}">—</div><div class="countdown-label">Days</div></div>
        <div class="countdown-unit"><div class="countdown-num" id="cd-h-${i}">—</div><div class="countdown-label">Hours</div></div>
        <div class="countdown-unit"><div class="countdown-num" id="cd-m-${i}">—</div><div class="countdown-label">Min</div></div>
      </div>
      <div class="upcoming-year">Expected: ${u.year}</div>
      <span class="upcoming-party">${u.party}</span>
    </div>
  `).join('');

  function updateCountdowns() {
    const now = Date.now();
    upcoming.forEach((u, i) => {
      const target = new Date(u.year, u.month - 1, u.day).getTime();
      const diff   = target - now;
      if (diff <= 0) {
        document.getElementById(`cd-d-${i}`)?.textContent && (document.getElementById(`cd-d-${i}`).textContent = '0');
        return;
      }
      const days  = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins  = Math.floor((diff % 3600000) / 60000);
      const d = document.getElementById(`cd-d-${i}`); if (d) d.textContent = String(days).padStart(3, '0');
      const h = document.getElementById(`cd-h-${i}`); if (h) h.textContent = String(hours).padStart(2, '0');
      const m = document.getElementById(`cd-m-${i}`); if (m) m.textContent = String(mins).padStart(2, '0');
    });
  }
  updateCountdowns();
  timers.push(setInterval(updateCountdowns, 60000));
})();

/* ═══════════════════════════════════════════════════
   KEY FACTS GRID
   ═══════════════════════════════════════════════════ */
(function initKeyFacts() {
  const grid = document.getElementById('facts-grid');
  if (!grid) return;

  const facts = [
    { icon: '🗳️', value: '96.88 Cr', label: 'Registered Voters', desc: 'As per Jan 2024 electoral roll — world\'s largest' },
    { icon: '🏛️', value: '543',      label: 'Lok Sabha Seats',   desc: '530 from states + 13 from UTs' },
    { icon: '⚖️', value: '245',      label: 'Rajya Sabha Seats', desc: '233 elected + 12 Presidential nominees' },
    { icon: '🗺️', value: '28+8',     label: 'States + UTs',      desc: '28 States and 8 Union Territories' },
    { icon: '📅', value: '1950',     label: 'Constitution Year', desc: 'India\'s Constitution in force since 26 Jan 1950' },
    { icon: '✅', value: '18+',      label: 'Voting Age',        desc: 'Lowered from 21 to 18 in 1989 (61st Amendment)' },
    { icon: '📢', value: '1950',     label: 'Voter Helpline',    desc: 'National toll-free election helpline number' },
    { icon: '🔒', value: '272',      label: 'LS Majority Mark',  desc: 'Seats needed to form majority government' },
    { icon: '💰', value: '₹95L',     label: 'Expenditure Limit', desc: 'Per LS candidate election spending cap (2024)' },
    { icon: '📱', value: 'NOTA',     label: 'Right to Reject',  desc: '\'None of the Above\' option since 2013 SC order' },
    { icon: '🖋️', value: '8,360',    label: '2024 Candidates',  desc: 'Total candidates in 18th Lok Sabha election' },
    { icon: '🌐', value: '7',        label: 'Phases in 2024',   desc: '19 April – 1 June 2024, result: 4 June 2024' },
    { icon: '👩', value: '74',       label: 'Women MPs (2024)',  desc: '13.6% of Lok Sabha — highest in Indian history' },
    { icon: '📋', value: '324',      label: 'ECI Article',      desc: 'Constitutional basis for Election Commission' },
    { icon: '⏱️', value: '5 years',  label: 'LS Term',          desc: 'Lok Sabha dissolved if 5 years lapse (Article 83)' },
    { icon: '🔢', value: '65.79%',   label: '2024 Turnout',     desc: 'National voter turnout in 2024 Lok Sabha elections' },
  ];

  grid.innerHTML = facts.map(f => `
    <div class="fact-card reveal">
      <div class="fact-icon" aria-hidden="true">${f.icon}</div>
      <div class="fact-value">${f.value}</div>
      <div class="fact-label">${f.label}</div>
      <div class="fact-desc">${f.desc}</div>
    </div>
  `).join('');
})();

/* ═══════════════════════════════════════════════════
   QUIZ ENGINE — 15 Questions, Timer, Score
   ═══════════════════════════════════════════════════ */
(function initQuiz() {
  const startScreen   = document.getElementById('quiz-start');
  const activeScreen  = document.getElementById('quiz-active');
  const resultsScreen = document.getElementById('quiz-results');
  if (!startScreen) return;

  const QUESTIONS = {
    basics: [
      { q: 'How many seats are there in the Lok Sabha?', opts: ['540','543','545','547'], ans: 1, exp: 'Lok Sabha has 543 elected seats. 530 from states + 13 from UTs. Originally 552 included 2 Anglo-Indian nominees (abolished 2020).' },
      { q: 'What is the minimum age to vote in India?', opts: ['16 years','18 years','21 years','25 years'], ans: 1, exp: 'The 61st Constitutional Amendment (1989) lowered voting age from 21 to 18 years.' },
      { q: 'Which article establishes the Election Commission of India?', opts: ['Article 312','Article 319','Article 324','Article 356'], ans: 2, exp: 'Article 324 of the Constitution vests the ECI with superintendence, direction, and control of elections.' },
      { q: 'How many phases were there in the 2024 Lok Sabha election?', opts: ['5','6','7','8'], ans: 2, exp: '2024 Lok Sabha election was conducted in 7 phases from 19 April to 1 June 2024. Result was declared on 4 June 2024.' },
      { q: 'What is the maximum strength of the Rajya Sabha?', opts: ['233','245','250','252'], ans: 2, exp: 'Rajya Sabha has a maximum of 250 members — 238 elected + 12 nominated by the President.' },
    ],
    process: [
      { q: 'What is the "Model Code of Conduct"?', opts: ['Election results format','Campaign guidelines by ECI','Candidate nomination form','Voter ID application'], ans: 1, exp: 'The MCC is a set of guidelines issued by ECI for parties and candidates. It activates from election announcement to counting day.' },
      { q: 'What does EVM stand for?', opts: ['Electronic Voting Machine','Electoral Verification Method','Electronic Vote Monitor','Electoral Voting Mechanism'], ans: 0, exp: 'EVM stands for Electronic Voting Machine. India started using EVMs in 1982 and fully adopted them by 2004 elections.' },
      { q: 'What is NOTA in Indian elections?', opts: ['National Office for Tally Audits','None of the Above','National Online Tallying Algorithm','None of These Aspirants'], ans: 1, exp: 'NOTA (None of the Above) allows voters to reject all candidates. Introduced by Supreme Court order in 2013.' },
      { q: 'What is the security deposit for a Lok Sabha candidate?', opts: ['₹5,000','₹10,000','₹25,000','₹50,000'], ans: 2, exp: '₹25,000 for general category candidates (₹12,500 for SC/ST). Forfeited if candidate gets less than 1/6th of votes.' },
      { q: 'VVPAT shows a paper slip for how many seconds?', opts: ['3 seconds','5 seconds','7 seconds','10 seconds'], ans: 2, exp: 'VVPAT (Voter Verifiable Paper Audit Trail) displays the voter slip for 7 seconds before it falls into a sealed compartment.' },
    ],
    history: [
      { q: 'In which year was India\'s first general election held?', opts: ['1947','1950','1951-52','1955'], ans: 2, exp: 'India\'s first general election was held from 25 Oct 1951 to 21 Feb 1952. Jawaharlal Nehru led Congress to victory.' },
      { q: 'Who was India\'s first Chief Election Commissioner?', opts: ['T.N. Seshan','S.P. Sen Verma','Sukumar Sen','V.S. Ramadevi'], ans: 2, exp: 'Sukumar Sen was India\'s first CEC (1950-1958). He conducted the first two general elections and is considered a legend in election management.' },
      { q: 'What is the "Emergency" period in Indian democracy?', opts: ['1962-65','1971-72','1975-77','1984-85'], ans: 2, exp: 'The Emergency (Article 352) was declared by PM Indira Gandhi from 25 June 1975 to 21 March 1977. Elections were suspended.' },
      { q: 'T.N. Seshan is associated with which electoral reform?', opts: ['Introduction of EVMs','Strict enforcement of MCC','Introducing VVPAT','Lowering voting age'], ans: 1, exp: 'T.N. Seshan (CEC 1990-96) is credited with strict enforcement of the Model Code of Conduct, transforming Indian electoral integrity.' },
      { q: 'The 17th Lok Sabha result (2019) saw which alliance win?', opts: ['UPA','NDA with 353 seats','INDIA Alliance','BJP alone majority'], ans: 1, exp: 'In 2019, NDA won 353 seats (BJP alone 303) — the second consecutive absolute majority. PM Modi was sworn in for his second term.' },
    ],
    constitution: [
      { q: 'Under which article can President\'s Rule be imposed on a state?', opts: ['Article 324','Article 352','Article 356','Article 370'], ans: 2, exp: 'Article 356 allows the President to assume state functions when constitutional governance fails — also called "President\'s Rule" or "Direct Rule".' },
      { q: 'The Anti-Defection Law is in which Schedule of the Constitution?', opts: ['Eighth Schedule','Ninth Schedule','Tenth Schedule','Eleventh Schedule'], ans: 2, exp: 'The Tenth Schedule (added by 52nd Amendment, 1985) contains the Anti-Defection Law preventing elected members from switching parties.' },
      { q: 'Which article provides for joint sessions of Parliament?', opts: ['Article 100','Article 105','Article 108','Article 112'], ans: 2, exp: 'Article 108 provides for joint sitting of both Houses when they disagree on a bill. Chaired by the Lok Sabha Speaker.' },
      { q: 'Delimitation of constituencies is governed by which act?', opts: ['RPA 1950','Delimitation Act 2002','RPA 1951','Constitution 73rd Amendment'], ans: 1, exp: 'The Delimitation Act 2002 governs boundary redrawing. The Delimitation Commission redraws constituency boundaries based on census data.' },
      { q: 'What is the qualifying date for voter registration?', opts: ['1 January of election year','26 January of election year','1 April of election year','Date of notification'], ans: 0, exp: 'The qualifying date for voter registration is 1 January of the year of revision of electoral rolls. Citizens who are 18+ on that date are eligible.' },
    ],
  };

  let currentCat = 'basics';
  let questions  = [];
  let currentQ   = 0;
  let score      = 0;
  let timer      = null;
  let timeLeft   = 0;
  let answered   = false;
  let sessionId  = 'quiz-' + Date.now();

  // Category select
  document.querySelectorAll('.quiz-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.quiz-cat-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      currentCat = btn.dataset.cat;
    });
  });

  document.getElementById('quiz-start-btn')?.addEventListener('click', startQuiz);
  document.getElementById('quiz-next-btn')?.addEventListener('click', nextQuestion);
  document.getElementById('quiz-restart-btn')?.addEventListener('click', () => {
    resultsScreen.classList.remove('show');
    startScreen.classList.remove('hidden');
    activeScreen.classList.remove('show');
  });

  function startQuiz() {
    const pool = currentCat === 'mixed'
      ? Object.values(QUESTIONS).flat().sort(() => Math.random() - 0.5).slice(0, 15)
      : (QUESTIONS[currentCat] || QUESTIONS.basics);
    questions  = pool;
    currentQ   = 0;
    score      = 0;
    answered   = false;
    startScreen.classList.add('hidden');
    activeScreen.classList.add('show');
    resultsScreen.classList.remove('show');
    renderQuestion();
  }

  function renderQuestion() {
    if (currentQ >= questions.length) { endQuiz(); return; }
    answered = false;
    const q  = questions[currentQ];
    const pct = ((currentQ) / questions.length) * 100;
    document.getElementById('quiz-progress-fill').style.width = pct + '%';
    document.getElementById('quiz-q-num').textContent = `Q${currentQ + 1} / ${questions.length}`;
    document.getElementById('quiz-score-inline').textContent = `Score: ${score}`;
    document.getElementById('quiz-question-text').textContent = q.q;
    document.getElementById('quiz-explanation').classList.remove('show');
    document.getElementById('quiz-explanation').textContent = '';
    document.getElementById('quiz-next-btn').disabled = true;
    const optContainer = document.getElementById('quiz-options');
    optContainer.innerHTML = q.opts.map((opt, i) => `
      <button class="quiz-option" data-idx="${i}" onclick="window.VIQ_quizAnswer(${i})">${opt}</button>
    `).join('');
    startTimer(25);
  }

  window.VIQ_quizAnswer = function(chosen) {
    if (answered) return;
    answered = true;
    clearInterval(timer);
    const q = questions[currentQ];
    const opts = document.querySelectorAll('.quiz-option');
    opts.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.ans) btn.classList.add('correct');
      else if (i === parseInt(chosen) && chosen !== q.ans) btn.classList.add('wrong');
    });
    if (parseInt(chosen) === q.ans) score++;
    const exp = document.getElementById('quiz-explanation');
    exp.textContent = q.exp;
    exp.classList.add('show');
    document.getElementById('quiz-next-btn').disabled = false;
  };

  function nextQuestion() {
    currentQ++;
    renderQuestion();
  }

  function startTimer(secs) {
    clearInterval(timer);
    timeLeft = secs;
    const timerEl = document.getElementById('quiz-timer');
    const update = () => {
      if (timerEl) { timerEl.textContent = `⏱ ${timeLeft}s`; timerEl.classList.toggle('urgent', timeLeft <= 8); }
      if (timeLeft <= 0) { clearInterval(timer); if (!answered) window.VIQ_quizAnswer(-1); }
      timeLeft--;
    };
    update();
    timer = setInterval(update, 1000);
  }

  function endQuiz() {
    clearInterval(timer);
    activeScreen.classList.remove('show');
    resultsScreen.classList.add('show');
    const pct = Math.round((score / questions.length) * 100);
    document.getElementById('quiz-result-score').textContent = `${score}/${questions.length}`;
    const msgs = [
      [0,  40,  '📚 Keep Learning!',    'Review the election process section and try again.'],
      [40, 70,  '👍 Good Effort!',      'You know the basics. Explore our data sections for more.'],
      [70, 90,  '🎓 Election Scholar!', 'Excellent! You have strong knowledge of Indian democracy.'],
      [90, 101, '🏆 Democracy Expert!', 'Perfect score! You are a true champion of democratic knowledge.'],
    ];
    const [, , title, sub] = msgs.find(([min, max]) => pct >= min && pct < max) || msgs[0];
    document.getElementById('quiz-result-msg').textContent = title;
    document.getElementById('quiz-result-sub').textContent = sub;
    // Submit score to backend
    fetch('/api/quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: score * 10, total: questions.length * 10, category: currentCat, session_id: sessionId }),
    }).catch(() => {});
  }
})();

/* ═══════════════════════════════════════════════════
   GEMINI AI CHAT
   ═══════════════════════════════════════════════════ */
(function initAIChat() {
  const input    = document.getElementById('chat-input');
  const sendBtn  = document.getElementById('chat-send');
  const messages = document.getElementById('chat-messages');
  const typing   = document.getElementById('typing-indicator');
  if (!input || !sendBtn || !messages) return;

  let sessionId = localStorage.getItem('voteiq-session') || ('s-' + Date.now());
  localStorage.setItem('voteiq-session', sessionId);
  let lang = localStorage.getItem('voteiq-lang') || 'en';
  let msgCount = 0;

  function addBubble(text, who) {
    const div = document.createElement('div');
    div.className = `chat-bubble ${who}`;
    div.innerHTML = who === 'bot' ? text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>') : text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    msgCount++;
    const el = document.getElementById('chat-msg-count');
    if (el) el.textContent = msgCount;
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text || sendBtn.disabled) return;
    input.value = '';
    input.style.height = '44px';
    addBubble(text, 'user');
    sendBtn.disabled = true;
    if (typing) { typing.classList.add('show'); messages.scrollTop = messages.scrollHeight; }

    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, session_id: sessionId, language: lang }),
      });
      const data = await r.json();
      if (typing) typing.classList.remove('show');
      if (data.reply) { addBubble(data.reply, 'bot'); if (data.session_id) sessionId = data.session_id; }
      else addBubble('Sorry, I couldn\'t get a response. Please try again.', 'bot');
    } catch (e) {
      if (typing) typing.classList.remove('show');
      addBubble('Network error — check your connection or try again shortly.', 'bot');
    }
    sendBtn.disabled = false;
    input.focus();
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });
  input.addEventListener('input', () => { input.style.height = '44px'; input.style.height = Math.min(input.scrollHeight, 120) + 'px'; });

  // Suggested questions
  document.querySelectorAll('.suggested-q').forEach(btn => {
    btn.addEventListener('click', () => { input.value = btn.textContent; sendMessage(); });
  });

  // Language sync
  document.addEventListener('click', e => {
    if (e.target.id === 'lang-toggle' || e.target.id === 'lang-toggle-mobile') {
      lang = localStorage.getItem('voteiq-lang') || 'en';
    }
  });

  // Welcome message
  setTimeout(() => {
    addBubble('Namaste! 🙏 I\'m VoteIQ, your AI guide to Indian democracy.<br><br>Ask me anything about elections, parties, voting process, Constitution, or current political data. I\'m powered by <strong>Google Gemini 1.5 Flash</strong> and always factual and neutral.', 'bot');
  }, 300);
})();
