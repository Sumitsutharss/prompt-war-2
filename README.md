# 🇮🇳 VoteIQ India — Bharat Gaurav
### *Har Vote Ki Kahani — Every Vote's Story*

> **PromptWars Virtual Challenge 2 — Sumit Suthar**
> AI-Powered Election Education Platform · Google Gemini 1.5 Flash

[![Tests](https://img.shields.io/badge/Tests-40%20Passed-brightgreen)](tests/)
[![Python](https://img.shields.io/badge/Python-3.11+-blue)](requirements.txt)
[![Flask](https://img.shields.io/badge/Flask-3.0-black)](backend/app.py)
[![Gemini](https://img.shields.io/badge/Gemini-1.5%20Flash-4285F4)](backend/app.py)
[![License](https://img.shields.io/badge/License-MIT-orange)](LICENSE)

---

## 🎯 Project Vision

VoteIQ India transforms India's complex democratic processes into **beautiful, interactive, AI-guided experiences** that every citizen can understand. Whether you're a first-time voter, a student, a journalist, or a researcher — VoteIQ is your window into Indian democracy.

**Emotional Goal:** When someone opens this site, they should feel the same pride as watching the Republic Day parade — grand, informative, emotionally resonant, and deeply Indian.

---

## ✨ Features

### 🗺️ Interactive India Map
- D3.js + GeoJSON choropleth map of all 28 states + 8 UTs
- **3 view modes**: LS Results 2024, Ruling Party, Voter Turnout
- **Alliance filter**: NDA / INDIA / Others
- State search + click-to-expand detail panel with CM, seats, governor

### 🏛️ Parliament Seating Charts
- D3.js **semicircle seating charts** for both Lok Sabha (543) and Rajya Sabha (245)
- Live composition with party-wise color coding
- Hover tooltips, majority line, interactive tab switch
- Accordion-style fact cards with constitutional references

### 👤 National Leaders (Card Flip)
- **CSS 3D card flip** on hover — front: bio, back: detailed stats
- 3 tabs: Government · Opposition · Election Commission
- Win margin, education, constituency, alliance badge

### 🏛️ Political Parties Encyclopedia
- 25 national/regional parties with founding, ideology, seats, ruling states
- Alliance filter (NDA / INDIA / LDF / Others)
- Click-to-open **modal** with full party details

### 📊 2024 Lok Sabha Results Deep-Dive
- Big stat cards: NDA 293 · INDIA 234 · Others 16
- **Animated stacked bar** (scroll-triggered)
- Chart.js bar chart — top 10 parties
- 50-row constituency results table with margin & turnout

### 🗺️ States Dashboard
- 31 state/UT cards with CM, party, alliance color-coding, next election
- **Dual view**: card grid ↔ sortable table
- Region filter (North/South/East/West/Central/Northeast)
- **CSV export** of full state data

### ⚖️ Election Process Timeline
- **10-step interactive timeline** from Constitutional Authority to Government Formation
- Click to expand sticky detail panel with Article references and MCC rules

### ⏱️ Upcoming Elections Countdown
- **9 live countdown timers** (days / hours / minutes) for upcoming state elections
- Auto-refresh every 60 seconds

### 📊 Electoral Facts Grid
- 16 key facts — voters, seats, NOTA, VVPAT, turnout, women MPs, helpline

### 🧠 Election IQ Quiz
- **20 questions** across 4 categories: Basics · Process · History · Constitution
- **25-second countdown timer** per question (turns red at ≤8 seconds)
- Instant explanations after each answer
- Score tracking + Firestore persistence

### ✨ AI Guide — Powered by Gemini
- **Google Gemini 1.5 Flash** chatbot
- Bilingual: English + Hindi (auto-detects)
- Persistent session history via Firestore
- 8 suggested questions, typing indicator
- Rate limited: 30 messages/minute

### 📋 Voter's Guide
- 5-step voting guide with official ECI links
- **12 approved photo IDs** for voting
- Voter Helpline: 1950

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Vanilla HTML/CSS/JS | Zero-dependency SPA |
| Design System | Bharat Gaurav CSS | Cinzel/Rajdhani fonts, tricolor palette |
| Map | D3.js 7.8 + GeoJSON | Interactive electoral map |
| Charts | D3.js + Chart.js 4.4 | Parliament + results charts |
| Backend | Flask 3.0 | REST API + static serving |
| AI | Google Gemini 1.5 Flash | Bilingual election chatbot |
| Database | Google Cloud Firestore | Session + quiz persistence |
| Secrets | Google Secret Manager | API key management |
| Security | Flask-Talisman + Limiter | CSP headers + rate limiting |
| Deployment | Google Cloud Run | Serverless container |
| Tests | pytest 40 tests | API + schema + security |

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Python 3.11+
- pip

### 1. Clone & Setup
```bash
git clone https://github.com/Sumitsutharss/prompt-war-2.git
cd prompt-war-2
pip install -r requirements.txt
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

### 3. Run the Backend
```bash
python backend/app.py
# → http://localhost:8080
```

### 4. Open the Frontend
Navigate to `http://localhost:8080` — the Flask server serves `frontend/index.html` as the SPA root.

---

## 🧪 Testing

```bash
# Run all 40 tests
python -m pytest tests/ -v

# With coverage report
python -m pytest tests/ --cov=backend --cov-report=term-missing
```

**Test Coverage:**
- Health endpoint, API routing
- All 7 data endpoints with schema validation
- Chat input validation (empty, too long, XSS)
- Security headers (X-Frame, CSP, CORS)
- Data integrity (seat totals, alliance validity, sequential nodes)
- Quiz submission endpoint

---

## 🐳 Docker / Cloud Run

```bash
# Build
docker build -t voteiq-india .

# Run locally
docker run -p 8080:8080 \
  -e GEMINI_API_KEY=your_key \
  -e PORT=8080 \
  voteiq-india

# Deploy to Cloud Run
gcloud run deploy voteiq-india \
  --image gcr.io/PROJECT/voteiq-india \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=your_key
```

---

## 📁 Project Structure

```
prompt-war-2/
├── frontend/
│   ├── index.html          # Main SPA (15 sections, WCAG 2.1 AA)
│   ├── style.css           # Bharat Gaurav design system
│   ├── script.js           # Hero, nav, loading, particles
│   ├── sections.css/js     # Phase 3: Map, Leaders, Parties
│   ├── phase4.css/js       # Phase 4: Parliament, States, Results
│   └── phase5.css/js       # Phase 5: Process, Quiz, AI, Guide
├── backend/
│   ├── app.py              # Flask REST API (8 endpoints)
│   └── data/               # 7 JSON data files
│       ├── states.json         (31 states/UTs)
│       ├── parties.json        (25 parties)
│       ├── leaders.json        (23 leaders)
│       ├── results_2024.json   (50 constituencies)
│       ├── constituencies.json (82 LS seats)
│       ├── election_process.json (10 steps)
│       └── districts.json      (30 cities)
├── tests/
│   └── test_app.py         # 40 pytest tests
├── Dockerfile              # Cloud Run ready
├── requirements.txt        # Pinned dependencies
└── .env.example            # Environment template
```

---

## 🔒 Security

- **CSP Headers**: Flask-Talisman enforces strict Content Security Policy
- **Rate Limiting**: Flask-Limiter (30/min chat, 100/min data, 20/min quiz)
- **Input Sanitisation**: HTML escape + regex strip on all user inputs
- **Secret Management**: Google Secret Manager in prod, `.env` in dev
- **No API keys in source**: `.env` is `.gitignore`'d
- **Non-root Docker**: Container runs as `appuser` (non-root)
- **CORS**: Restricted to configured origin in production

---

## ♿ Accessibility (WCAG 2.1 AA)

- Semantic HTML5 landmarks (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`)
- `role`, `aria-label`, `aria-live` on all interactive components
- Skip-to-content link for keyboard users
- Focus-visible styles with saffron ring
- `aria-expanded` on accordions and tabs
- `prefers-reduced-motion` CSS media query respected
- Colour contrast ≥ 4.5:1 across all text
- `tabindex="0"` + keyboard Enter handler on all card interactions

---

## 📊 PromptWars Scoring Criteria

| Criterion | Implementation |
|---|---|
| **Code Quality** | Modular CSS/JS, semantic HTML, JSDoc comments, clean Flask blueprint structure |
| **Security** | Talisman CSP, rate limiting, input sanitisation, Secret Manager, non-root Docker |
| **Efficiency** | LRU cache on data loads, D3 reuse, lazy chart init, CDN for heavy deps |
| **Testing** | 40 pytest tests — schema, security, integrity, edge cases |
| **Accessibility** | ARIA, semantic HTML, keyboard nav, skip links, colour contrast |
| **Google Services** | Gemini 1.5 Flash · Cloud Firestore · Secret Manager · Cloud Logging · Cloud Run |

---

## 📖 Data Sources

- Election Commission of India (ECI) — eci.gov.in
- Lok Sabha Secretariat — loksabha.nic.in
- Rajya Sabha Secretariat — rajyasabha.nic.in
- Ministry of Law & Justice — legislative.gov.in
- Constitution of India — Article 324, RPA 1950/51

---

## 👨‍💻 Developer

**Sumit Suthar** — PromptWars Virtual Challenge 2, 2026

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

*Educational platform. Not affiliated with ECI or any political party. Data is for educational purposes only.*
