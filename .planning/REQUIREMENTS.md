# Requirements: VoteIQ India — "Bharat Gaurav"

**Defined:** 2026-05-03
**Core Value:** A citizen who opens VoteIQ India must be able to understand India's election process, explore live political data, and get reliable AI-guided answers — all in one place, in Hindi or English.

---

## v1 Requirements

### Design System

- [ ] **DSYS-01**: Bharat Gaurav CSS design system implemented (CSS variables: tricolor palette, spacing, typography, radius, transitions)
- [ ] **DSYS-02**: Google Fonts loaded (Cinzel Decorative, Tiro Devanagari Hindi, Playfair Display, Rajdhani, Nunito, JetBrains Mono)
- [ ] **DSYS-03**: Animation keyframes implemented (chakra-spin, tricolor-shimmer, flag-wave, pulse-dot, curtain-open, reveal)
- [ ] **DSYS-04**: IntersectionObserver scroll-reveal applied to all major sections
- [ ] **DSYS-05**: Film grain overlay applied globally (CSS SVG noise, ~3% opacity)

### Loading & Navigation

- [ ] **NAV-01**: Full-screen loading screen with Ashoka Chakra SVG spinner, tricolor progress bar, auto-dismisses after 2.5s with curtain-open animation
- [ ] **NAV-02**: Fixed navbar (64px) with logo, center nav links, search icon, language toggle (EN/HI), "Ask AI" pill button
- [ ] **NAV-03**: Navbar scroll behavior: transparent at 0px → frosted glass + tricolor bottom border at 80px+
- [ ] **NAV-04**: Mobile hamburger menu: full-screen slide-down overlay with all nav links
- [ ] **NAV-05**: Language toggle switches UI language class (EN/HI) — Hindi text renders in Tiro Devanagari Hindi font
- [ ] **NAV-06**: Back-to-top button (Ashoka Chakra SVG, fixed bottom-right, rotates on hover)

### Hero Section

- [ ] **HERO-01**: Hero section (100vh) with radial saffron/green glows, Ashoka Chakra watermark (slow spin 60s), canvas particle system (24 spoke-shaped gold particles)
- [ ] **HERO-02**: "Bharat Gaurav Edition" badge (pill, pulsing dot), animated headline letter-by-letter reveal
- [ ] **HERO-03**: Headline "VOTEIQ INDIA" with tricolor shimmer gradient animation (Cinzel Decorative, 68px desktop / 38px mobile)
- [ ] **HERO-04**: Hindi subheadline + English subtitle below
- [ ] **HERO-05**: 4 animated CountUp stat counters (96.88 Cr voters, 543 seats, 4000+ assembly seats, 1950)
- [ ] **HERO-06**: 3 CTAs (Explore Map, Ask AI Guide, Take Quiz) with correct scroll/open behaviors
- [ ] **HERO-07**: Infinite-scroll ticker marquee at bottom with tricolor gradient borders

### India Map

- [ ] **MAP-01**: D3.js SVG India map loaded from India TopoJSON (all 28 states + 8 UTs)
- [ ] **MAP-02**: 4 view modes: Lok Sabha Results / State Ruling Party / CM Overview / Voter Turnout — color scheme changes per mode
- [ ] **MAP-03**: Alliance filter pills (All / NDA / INDIA / Others) — highlights matching states
- [ ] **MAP-04**: State search input filters/highlights states on map
- [ ] **MAP-05**: Hover tooltip (follows cursor): state name, CM, LS seats breakdown, ruling party, next election year
- [ ] **MAP-06**: Click opens side panel (380px slide-in): full state data, assembly breakdown, 2024 LS results bar, next election countdown, close button
- [ ] **MAP-07**: States animate in one-by-one on page load (IntersectionObserver)
- [ ] **MAP-08**: Map legend updates dynamically per active view

### Current Government

- [ ] **GOVT-01**: Constitutional heads row: President (Droupadi Murmu), VP (C. P. Radhakrishnan), PM (Narendra Modi) — 3 large cards with all details
- [ ] **GOVT-02**: Full cabinet grid: 30 minister cards (4-col desktop, 2 mobile), expandable "show all" toggle
- [ ] **GOVT-03**: Cabinet filter by party / state / ministry type
- [ ] **GOVT-04**: NDA alliance composition donut chart (D3.js) with interactive hover — BJP 240, TDP 16, JDU 12, others

### Leaders Section

- [ ] **LEAD-01**: Tabbed leaders section (Government / Opposition / ECI / President+VP)
- [ ] **LEAD-02**: 10 leader cards per tab (glassmorphism, saffron border on hover, circular photo with gradient border)
- [ ] **LEAD-03**: Card flip animation: front shows current role/party/constituency/margin; back shows born, education, years in politics, social links
- [ ] **LEAD-04**: All 10 Govt + 10 Opposition + 3 ECI leaders populated with verified 2024 data

### Political Parties

- [ ] **PARTY-01**: Parties encyclopedia with 25 party cards (300×420px glass cards)
- [ ] **PARTY-02**: Alliance filter pills (All / NDA / INDIA / Left / Others) filters visible cards
- [ ] **PARTY-03**: Each card: party flag/logo, name, founded year, ideology badge, president, LS seats, RS seats, ruling states, alliance badge
- [ ] **PARTY-04**: Party detail modal on click: full data including election history
- [ ] **PARTY-05**: All 25 parties (10 NDA + 10 INDIA + 5 Others) populated with verified seat data

### Parliament Dashboard

- [ ] **PARL-01**: Lok Sabha tab: D3.js semicircular seating chart (543 dots, party-colored), majority line at 272
- [ ] **PARL-02**: Rajya Sabha tab: D3.js semicircular chart (245 seats), composition breakdown
- [ ] **PARL-03**: Party-wise table below each chart (sortable by seat count, searchable)
- [ ] **PARL-04**: "How Rajya Sabha works" accordion (election process, Articles 249/312, no dissolution)
- [ ] **PARL-05**: Side-by-side comparison view for both houses

### States Dashboard

- [ ] **STATE-01**: 31-entry state/UT grid (4-col desktop → 1 mobile) with search, region filter, sort controls
- [ ] **STATE-02**: Each card: ruling party color stripe, CM photo + name, party dot, LS seats, assembly count, next election year, alliance badge
- [ ] **STATE-03**: Full table view toggle (all 31 rows, sortable, Export CSV button)
- [ ] **STATE-04**: State detail modal: Governor, CM full data, parliament breakdown, assembly breakdown, 2024 LS results, 5-6 major districts, political history paragraph
- [ ] **STATE-05**: All 31 entries (28 states + Delhi + J&K + Puducherry) with verified 2025/2026 data

### 2024 Results

- [ ] **RES-01**: Key facts pills row (7 phases, 96.88 Cr voters, 66.3% turnout, 543 seats)
- [ ] **RES-02**: 3 big metric cards (NDA 293 saffron, INDIA 234 green, Others 16 grey)
- [ ] **RES-03**: Horizontal stacked bar chart (Chart.js, all states, NDA/INDIA/Others per state, searchable/sortable)
- [ ] **RES-04**: Top 20 key constituencies table (all 20 rows with verified margin data, sortable)
- [ ] **RES-05**: State-wise sweep accordion (expandable per state, NDA vs INDIA vs Others seats)

### Election Process

- [ ] **PROC-01**: Interactive 10-node horizontal timeline (scrollable on mobile) with animated gold connecting line
- [ ] **PROC-02**: Each node click expands full panel: Constitution & Authority, MCC, Electoral Roll, Nomination, Scrutiny, Campaign, Voting Day & EVM, Counting, Anti-Defection Law, Government Formation
- [ ] **PROC-03**: All 12 approved voter ID documents listed in Node 3
- [ ] **PROC-04**: EVM/VVPAT technical specs in Node 7 (standalone, non-networked, 7s slip visible, 2000 max votes)
- [ ] **PROC-05**: 6 Legal Quick Cards below timeline (RPA 1950, RPA 1951, Delimitation Act, ECI Act, etc.)

### Upcoming Elections

- [ ] **ELEC-01**: Countdown cards for 6 upcoming elections (Bihar 2025, WB/TN/Kerala/Assam/Puducherry 2026) with live Days:Hours:Mins:Secs timers where date is known
- [ ] **ELEC-02**: "Recently Concluded" grey cards (Delhi Feb 2025, by-elections)
- [ ] **ELEC-03**: Monthly calendar grid view (Jan 2025 – Dec 2026) with election date markers

### Key Facts Dashboard

- [ ] **FACT-01**: 8 animated stat cards (voters, polling stations, EVMs, LS seats, RS seats, assembly seats, districts, 1950)
- [ ] **FACT-02**: India in Numbers detail grid (SC/ST reserved seats, largest/smallest constituency, highest turnout, NOTA votes)
- [ ] **FACT-03**: Interesting facts auto-sliding carousel (6 facts, 6s interval)

### Quiz Engine

- [ ] **QUIZ-01**: Quiz intro card: category selector (Basics/Constitution/History/Parties/Mixed), difficulty (Easy/Medium/Hard), question count (5/10/15)
- [ ] **QUIZ-02**: Question card with 30s countdown timer bar, 4 options (A/B/C/D), progress dots
- [ ] **QUIZ-03**: Answer feedback: correct → green glow + "+10 points"; wrong → red on chosen + green on correct + explanation shown
- [ ] **QUIZ-04**: All 15 questions with answers and explanations fully implemented
- [ ] **QUIZ-05**: Results screen: score, grade (Expert/Good Citizen/Needs Learning), correct/wrong/skipped, explanation review
- [ ] **QUIZ-06**: Quiz score submitted to Firestore via `/api/quiz/submit`
- [ ] **QUIZ-07**: Share score button (generates shareable result)

### AI Election Guide

- [ ] **AI-01**: Two-column chat layout (40% info panel with quick chips + 60% chat interface)
- [ ] **AI-02**: 12 quick-question chips (voter registration, EVM, ECI powers, MCC, parties, etc.) — click auto-sends
- [ ] **AI-03**: Typing indicator: 3 animated Ashoka Chakra spokes pulsing
- [ ] **AI-04**: Chat messages: user (right, saffron bg) / AI (left, glass card) with source citation and follow-up chips
- [ ] **AI-05**: Language toggle (EN/HI) persists to backend — Gemini responds in same language
- [ ] **AI-06**: Error state shown on Gemini failure with helpline 1950 fallback
- [ ] **AI-07**: Session stored in Firestore (anonymous UUID), clear chat button available

### Voter's Guide

- [ ] **VOTE-01**: Eligibility checker tool: age + citizenship inputs → instant result (eligible / NRI Form 6A / under-18 countdown)
- [ ] **VOTE-02**: Registration step-by-step guide (5 steps, NVSP link, BLO option)
- [ ] **VOTE-03**: Voting day illustrated steps (ID → booth → ink → BU → VVPAT)
- [ ] **VOTE-04**: Special voter categories card (85+ postal ballot, PwD, NRI, service voters, 11 alternate IDs)

### Flask Backend

- [ ] **API-01**: `POST /api/chat` — Gemini 1.5 Flash chat with session history from Firestore, input validation, rate limit 30/min
- [ ] **API-02**: `GET /api/data/<resource>` — serve states/parties/leaders/results_2024/constituencies/election_process/districts JSON, allowlisted, rate limit 100/min
- [ ] **API-03**: `POST /api/quiz/submit` — save score to Firestore, validate score range, rate limit 20/min
- [ ] **API-04**: `GET /api/search?q=` — search across states/parties/constituencies, min 2 chars, returns top 20 results
- [ ] **API-05**: `GET /health` — returns `{"status":"ok","timestamp":"..."}` for Cloud Run health checks
- [ ] **API-06**: `GET /` — serves `frontend/index.html` (Flask static folder)

### Google Services Integration

- [ ] **GCP-01**: Google Gemini 1.5 Flash: `genai.GenerativeModel` with system prompt, temperature 0.3, max_output_tokens 800
- [ ] **GCP-02**: Google Firestore: sessions collection (chat history, last 10 turns), quiz_scores collection, analytics collection
- [ ] **GCP-03**: Google Secret Manager: `get_secret("GEMINI_API_KEY")` in production, env var fallback for local dev
- [ ] **GCP-04**: Google Cloud Logging: `cloud_logging.Client().setup_logging()` + structured logger
- [ ] **GCP-05**: Google Fonts: all 6 font families loaded via `@import` in CSS

### Security

- [ ] **SEC-01**: Flask-Talisman CSP headers (allowlisted CDNs for D3/Chart.js/fonts, no unsafe-eval)
- [ ] **SEC-02**: Flask-Limiter per-endpoint rate limits (30/min chat, 100/min data, 60/min search, 20/min quiz)
- [ ] **SEC-03**: Input validation: `html.escape()` + `re.sub(r'<[^>]+>', '', ...)` on all user-supplied strings, max length 1000 chars
- [ ] **SEC-04**: CORS restricted to `ALLOWED_ORIGIN` env var (own domain)
- [ ] **SEC-05**: Docker non-root user (`adduser appuser`, `USER appuser`)
- [ ] **SEC-06**: Secret Manager usage (API key never in code, never in env in production)

### Testing

- [ ] **TEST-01**: `tests/unit/test_data_utils.py` — states count (36), constituencies count (543), party required fields
- [ ] **TEST-02**: `tests/integration/test_chat_api.py` — valid message, empty rejected, too-long rejected, HTML sanitised
- [ ] **TEST-03**: `tests/integration/test_quiz_api.py` — valid score saved, invalid score rejected
- [ ] **TEST-04**: `tests/integration/test_search_api.py` — results returned, short query returns empty, invalid resource 404
- [ ] **TEST-05**: `tests/e2e/test_user_flows.py` (Playwright) — homepage loads, quiz flow, chatbot interaction
- [ ] **TEST-06**: `pytest.ini` / `conftest.py` — Flask test client fixture, mock setup for Gemini + Firestore

### Deployment & CI

- [ ] **CICD-01**: `Dockerfile` — python:3.11-slim, non-root user, EXPOSE 8080, CMD gunicorn
- [ ] **CICD-02**: `requirements.txt` — all pinned versions (flask, flask-limiter, flask-talisman, flask-cors, google-generativeai, firestore, secret-manager, cloud-logging, pytest, playwright, gunicorn)
- [ ] **CICD-03**: `.github/workflows/test.yml` — run pytest on every push
- [ ] **CICD-04**: `.github/workflows/deploy.yml` — deploy to Cloud Run `asia-south1` on main merge
- [ ] **CICD-05**: `README.md` — architecture diagram, Google services table, security section, accessibility notes, local setup guide, Cloud Run URL

### Accessibility

- [ ] **A11Y-01**: Single `<h1>` per page, proper heading hierarchy (h2 sections, h3 subsections)
- [ ] **A11Y-02**: All interactive elements have ARIA labels and unique IDs
- [ ] **A11Y-03**: Full keyboard navigation (Tab order, Enter/Space for buttons, Escape for modals)
- [ ] **A11Y-04**: Color contrast meets WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large)
- [ ] **A11Y-05**: Screen-reader-compatible: `role`, `aria-live` for dynamic content (quiz answers, chat messages)

### Static Data Files

- [ ] **DATA-01**: `data/states.json` — all 36 state/UT entries (28 + 8 UTs) with CM, party, alliance, LS seats, assembly seats, next election, governor
- [ ] **DATA-02**: `data/parties.json` — all 25 parties with name, founded, ideology, leader, LS seats, RS seats, ruling states, alliance, color
- [ ] **DATA-03**: `data/leaders.json` — 50 leaders (20 govt + 20 opposition + 10 others) with full details
- [ ] **DATA-04**: `data/results_2024.json` — 543 constituency results with winner, party, alliance, margin, reservation
- [ ] **DATA-05**: `data/constituencies.json` — all 543 LS constituencies with state mapping
- [ ] **DATA-06**: `data/election_process.json` — 10 process nodes with full content
- [ ] **DATA-07**: `data/districts.json` — major districts with state mapping

---

## v2 Requirements

### Advanced Features (post-competition)

- **V2-01**: Real-time ECI result feed integration (when API becomes available)
- **V2-02**: Candidate comparison tool (side-by-side two candidates)
- **V2-03**: Constituency deep-dive pages (all 543 with historical results)
- **V2-04**: Hindi full UI translation (all labels, not just AI responses)
- **V2-05**: PWA (Progressive Web App) with offline capability
- **V2-06**: Social sharing with OG image generation (dynamic Satori/Canvas renders)
- **V2-07**: User accounts with saved states and quiz history across devices
- **V2-08**: Notification system for upcoming election reminders
- **V2-09**: Video explainer embeds for election process nodes

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| Google Maps API | Using D3.js + TopoJSON — free, fully customisable, no billing required |
| OAuth/user accounts | Anonymous UUID sessions sufficient; reduces auth complexity for competition |
| Real-time WebSocket | Static JSON + Firestore polling sufficient; avoids infrastructure complexity |
| Mobile native app | Responsive web covers mobile; native is post-competition scope |
| Live ECI data API | No public ECI API available; static JSON is reliable and zero-latency |
| Video content | Scope too large for competition timeline |
| Paid news API | Political news feed adds compliance risk and cost |
| Multi-language beyond EN/HI | Additional languages deferred; EN+HI covers primary target audience |

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DSYS-01 to DSYS-05 | Phase 1 | Pending |
| NAV-01 to NAV-06 | Phase 1 | Pending |
| HERO-01 to HERO-07 | Phase 1 | Pending |
| DATA-01 to DATA-07 | Phase 2 | Pending |
| API-01 to API-06 | Phase 2 | Pending |
| GCP-01 to GCP-05 | Phase 2 | Pending |
| SEC-01 to SEC-06 | Phase 2 | Pending |
| MAP-01 to MAP-08 | Phase 3 | Pending |
| GOVT-01 to GOVT-04 | Phase 3 | Pending |
| LEAD-01 to LEAD-04 | Phase 3 | Pending |
| PARTY-01 to PARTY-05 | Phase 3 | Pending |
| PARL-01 to PARL-05 | Phase 4 | Pending |
| STATE-01 to STATE-05 | Phase 4 | Pending |
| RES-01 to RES-05 | Phase 4 | Pending |
| PROC-01 to PROC-05 | Phase 5 | Pending |
| ELEC-01 to ELEC-03 | Phase 5 | Pending |
| FACT-01 to FACT-03 | Phase 5 | Pending |
| VOTE-01 to VOTE-04 | Phase 5 | Pending |
| QUIZ-01 to QUIZ-07 | Phase 5 | Pending |
| AI-01 to AI-07 | Phase 5 | Pending |
| TEST-01 to TEST-06 | Phase 6 | Pending |
| A11Y-01 to A11Y-05 | Phase 6 | Pending |
| CICD-01 to CICD-05 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 78 total
- Mapped to phases: 78
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-03*
*Last updated: 2026-05-03 after initial definition*
