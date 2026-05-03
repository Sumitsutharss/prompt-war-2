# ROADMAP: VoteIQ India — "Bharat Gaurav"

**Project:** VoteIQ India — AI-powered election education platform
**Competition:** PromptWars Virtual Challenge 2 — Election Process Education
**Target:** Score maximum on all 6 criteria (Code Quality, Security, Efficiency, Testing, Accessibility, Google Services)
**Phases:** 6 | **Requirements:** 78 | **Status:** Planning

---

## Phase Overview

| # | Phase | Goal | Requirements | Status |
|---|-------|------|--------------|--------|
| 1 | Foundation & Visual Shell | Full Bharat Gaurav design system + hero/nav/loading implemented and stunning | DSYS-01–05, NAV-01–06, HERO-01–07 | Pending |
| 2 | Backend, Data & Google Services | Flask API + all 7 data JSONs + Gemini + Firestore + Secret Manager + Security headers | DATA-01–07, API-01–06, GCP-01–05, SEC-01–06 | Pending |
| 3 | Interactive Data Sections | D3.js India map + Leaders + Parties + Government cabinet | MAP-01–08, GOVT-01–04, LEAD-01–04, PARTY-01–05 | Pending |
| 4 | Parliament + States + Results | Parliament seating charts + 31-state dashboard + 2024 deep-dive | PARL-01–05, STATE-01–05, RES-01–05 | Pending |
| 5 | Content Sections & AI Features | Election process timeline + quiz engine + AI chatbot + voter guide + upcoming elections | PROC-01–05, ELEC-01–03, FACT-01–03, VOTE-01–04, QUIZ-01–07, AI-01–07 | Pending |
| 6 | Testing, Accessibility & Deployment | Full test suite (unit/integration/E2E) + WCAG 2.1 AA audit + CI/CD + README | TEST-01–06, A11Y-01–05, CICD-01–05 | Pending |

---

## Phase 1: Foundation & Visual Shell

**Goal:** Implement the complete Bharat Gaurav design system and deliver a visually stunning loading screen, fixed navbar, and cinematic hero section — the first impression that makes judges stop scrolling.

**UI hint:** yes

**Requirements covered:**
- DSYS-01: Bharat Gaurav CSS variables (tricolor palette, spacing, typography tokens)
- DSYS-02: Google Fonts loaded (all 6 families via @import)
- DSYS-03: All animation keyframes (chakra-spin, tricolor-shimmer, flag-wave, pulse-dot, curtain-open, reveal)
- DSYS-04: IntersectionObserver scroll-reveal applied to sections
- DSYS-05: Film grain overlay (CSS SVG noise, 3% opacity)
- NAV-01: Loading screen (Ashoka Chakra spinner, tricolor progress bar, 2.5s curtain-open)
- NAV-02: Fixed navbar (logo, center links, search icon, language toggle, Ask AI pill)
- NAV-03: Navbar scroll behavior (transparent → frosted glass + tricolor border)
- NAV-04: Mobile hamburger → full-screen slide-down overlay
- NAV-05: Language toggle (EN/HI class switch, Devanagari font activation)
- NAV-06: Back-to-top button (Ashoka Chakra SVG, fixed bottom-right)
- HERO-01: Hero 100vh (glows, Chakra watermark, canvas particle system)
- HERO-02: "Bharat Gaurav Edition" badge + letter-by-letter headline animation
- HERO-03: "VOTEIQ INDIA" headline with tricolor shimmer (Cinzel Decorative, responsive sizes)
- HERO-04: Hindi + English subheadlines
- HERO-05: 4 CountUp stat counters (96.88 Cr, 543, 4000+, 1950)
- HERO-06: 3 CTAs (Explore Map, Ask AI, Take Quiz) with correct behaviors
- HERO-07: Infinite-scroll ticker marquee with tricolor gradient borders

**Success criteria:**
1. Loading screen appears on page load, Chakra spins, progress bar fills, curtain opens — all within 2.5s
2. Navbar is transparent at top, transitions to frosted glass with tricolor bottom border after 80px scroll
3. Headline "VOTEIQ INDIA" renders with animated tricolor shimmer and letter-by-letter reveal
4. All 4 CountUp counters animate from 0 to their target values on viewport entry
5. Mobile hamburger opens full-screen nav overlay with all links visible

**Estimated plans:** 3
- Plan A: Design system (CSS variables, fonts, keyframes, grain overlay, scroll-reveal utility)
- Plan B: Loading screen + Navbar (full desktop + mobile responsive)
- Plan C: Hero section (background, canvas particles, headline animation, CountUp, ticker, CTAs)

---

## Phase 2: Backend, Data & Google Services

**Goal:** Build the complete Flask backend with all API endpoints, bundle all 7 static data JSONs, wire up Google Gemini/Firestore/Secret Manager/Cloud Logging, and implement all 6 security layers — ensuring the app scores full marks on Security and Google Services criteria.

**UI hint:** no

**Requirements covered:**
- DATA-01: `data/states.json` (36 entries)
- DATA-02: `data/parties.json` (25 parties)
- DATA-03: `data/leaders.json` (50 leaders)
- DATA-04: `data/results_2024.json` (543 constituency results)
- DATA-05: `data/constituencies.json` (543 constituencies)
- DATA-06: `data/election_process.json` (10 process nodes)
- DATA-07: `data/districts.json` (major districts)
- API-01: `POST /api/chat` (Gemini + Firestore session + input validation + rate limit)
- API-02: `GET /api/data/<resource>` (allowlisted static data, cached, rate limited)
- API-03: `POST /api/quiz/submit` (Firestore score save, validation)
- API-04: `GET /api/search?q=` (cross-entity search, min 2 chars)
- API-05: `GET /health` (Cloud Run health check)
- API-06: `GET /` (serve frontend/index.html)
- GCP-01: Gemini 1.5 Flash with system prompt (temperature 0.3, max 800 tokens)
- GCP-02: Firestore (sessions, quiz_scores, analytics collections)
- GCP-03: Secret Manager (`get_secret("GEMINI_API_KEY")` in production)
- GCP-04: Cloud Logging (`cloud_logging.Client().setup_logging()`)
- GCP-05: Google Fonts (already in Phase 1; verified here)
- SEC-01: Flask-Talisman CSP headers (allowlisted CDNs, no unsafe-eval)
- SEC-02: Flask-Limiter per-endpoint rate limits
- SEC-03: Input validation (html.escape, re.sub, max 1000 chars)
- SEC-04: CORS restricted to ALLOWED_ORIGIN env var
- SEC-05: Docker non-root user (adduser appuser)
- SEC-06: Secret Manager (API key never in code)

**Success criteria:**
1. `GET /health` returns `{"status":"ok"}` with HTTP 200
2. `GET /api/data/states` returns JSON array with 36 entries
3. `POST /api/chat` with `{"message":"How many Lok Sabha seats?"}` returns a Gemini response (or mocked equivalent locally)
4. `POST /api/chat` with 1001-char message returns HTTP 400
5. `GET /api/data/secrets` returns HTTP 404 (allowlist enforced)
6. Flask-Talisman headers visible in response (`Content-Security-Policy`, `X-Frame-Options`)
7. All 7 data JSON files present and parseable

**Estimated plans:** 3
- Plan A: All 7 static data JSON files (fully populated with verified data)
- Plan B: Flask app.py (all routes, Gemini integration, Firestore, Secret Manager, Cloud Logging, Gemini system prompt)
- Plan C: Security layer (Talisman, Limiter, CORS, input validation) + Dockerfile + requirements.txt

---

## Phase 3: Interactive Data Sections

**Goal:** Build the D3.js India map (centerpiece), Current Government cabinet, tabbed Leaders section, and Political Parties encyclopedia — all three are the most visually rich content sections and the primary judging showcase.

**UI hint:** yes

**Requirements covered:**
- MAP-01: D3.js SVG India map (TopoJSON)
- MAP-02: 4 view modes with color scheme changes
- MAP-03: Alliance filter pills
- MAP-04: State search filters map
- MAP-05: Hover tooltip (cursor-following)
- MAP-06: Click side panel (380px slide-in, full state data)
- MAP-07: States animate in on viewport entry
- MAP-08: Dynamic legend per view
- GOVT-01: Constitutional heads cards (President, VP, PM)
- GOVT-02: 30-minister cabinet grid (expandable)
- GOVT-03: Cabinet filters
- GOVT-04: Alliance donut chart (D3.js, interactive)
- LEAD-01: Tabbed leaders (4 tabs)
- LEAD-02: 10 leader cards per tab (glassmorphism, hover border)
- LEAD-03: Card flip animation (front/back with education, years, social)
- LEAD-04: All leaders populated with verified 2024 data
- PARTY-01: 25 party cards (glass, 300×420px)
- PARTY-02: Alliance filter pills
- PARTY-03: All party card fields populated
- PARTY-04: Party detail modal on click
- PARTY-05: All 25 parties with seat data

**Success criteria:**
1. India map renders all states correctly colored in Lok Sabha Results mode (saffron=NDA, green=INDIA)
2. Clicking any state opens side panel with CM name, LS seats breakdown bar, and next election info
3. View mode toggle smoothly transitions state fill colors (CSS transition)
4. Leader card flip animation works on hover (CSS 3D perspective transform)
5. Alliance filter on parties page correctly shows/hides cards matching NDA/INDIA/Others

**Estimated plans:** 3
- Plan A: D3.js India map (TopoJSON load, 4 view modes, hover tooltip, click side panel, filters, animation)
- Plan B: Current Government section (constitutional heads, 30-minister cabinet grid, donut chart)
- Plan C: Leaders section (card flip, 4 tabs, all 23 leaders) + Parties encyclopedia (25 cards, filter, modal)

---

## Phase 4: Parliament + States + Results

**Goal:** Build the D3.js parliament seating charts, 31-state dashboard with modals, and the full 2024 Lok Sabha results deep-dive — completing all data-rich content sections.

**UI hint:** yes

**Requirements covered:**
- PARL-01: Lok Sabha semicircular seating chart (543 dots, majority line)
- PARL-02: Rajya Sabha semicircular chart (245 seats)
- PARL-03: Party-wise sortable/searchable table
- PARL-04: "How Rajya Sabha works" accordion
- PARL-05: Side-by-side comparison view
- STATE-01: 31-entry grid (search, region filter, sort)
- STATE-02: State card content (CM photo, party dot, stats, alliance badge)
- STATE-03: Table view + Export CSV
- STATE-04: State detail modal (Governor, CM, parliament breakdown, districts)
- STATE-05: All 31 entries verified
- RES-01: Key facts pills row
- RES-02: 3 metric cards (NDA/INDIA/Others)
- RES-03: Horizontal stacked bar chart (Chart.js, all states)
- RES-04: Top 20 constituencies table (sortable, all 20 rows)
- RES-05: State-wise sweep accordion

**Success criteria:**
1. Lok Sabha seating chart shows 543 distinct colored dots arranged in semicircle arc
2. Majority line at 272 is visible as dashed line on the chart
3. State grid search filters cards in real-time (client-side, no API call)
4. State detail modal opens on click with Governor + CM + LS breakdown
5. Top-20 constituency table sorts correctly by margin column
6. Export CSV button downloads a valid CSV of the 31-state table

**Estimated plans:** 3
- Plan A: Parliament Dashboard (D3.js LS + RS seating charts, party tables, accordion, comparison)
- Plan B: States & UTs dashboard (31-entry grid, search/filter/sort, table view, CSV export, state modals)
- Plan C: 2024 Results deep-dive (metric cards, Chart.js stacked bar, top-20 table, state-wise accordion)

---

## Phase 5: Content Sections & AI Features

**Goal:** Implement the election process timeline, quiz engine, Gemini-powered chatbot, voter guide, upcoming elections, and key facts dashboard — completing 100% of the frontend feature set.

**UI hint:** yes

**Requirements covered:**
- PROC-01: 10-node horizontal timeline
- PROC-02: All 10 node detail panels
- PROC-03: 12 voter ID documents in Node 3
- PROC-04: EVM/VVPAT specs in Node 7
- PROC-05: 6 Legal Quick Cards
- ELEC-01: 6 upcoming election countdown cards
- ELEC-02: Recently concluded grey cards
- ELEC-03: Monthly calendar grid (Jan 2025–Dec 2026)
- FACT-01: 8 animated stat cards
- FACT-02: India in Numbers detail grid
- FACT-03: Facts auto-sliding carousel
- VOTE-01: Eligibility checker tool
- VOTE-02: Registration step guide
- VOTE-03: Voting day steps
- VOTE-04: Special categories card
- QUIZ-01: Quiz intro (category, difficulty, count)
- QUIZ-02: Question card (30s timer, 4 options, progress dots)
- QUIZ-03: Answer feedback (green/red glow, explanation)
- QUIZ-04: All 15 questions with answers + explanations
- QUIZ-05: Results screen (score, grade, review)
- QUIZ-06: Score submission to Firestore
- QUIZ-07: Share score button
- AI-01: Two-column chat layout
- AI-02: 12 quick-question chips
- AI-03: Typing indicator (Chakra spokes pulsing)
- AI-04: Chat message bubbles with source citations + follow-up chips
- AI-05: Language toggle (EN/HI) persisted to backend
- AI-06: Error state with 1950 helpline fallback
- AI-07: Firestore session + clear chat

**Success criteria:**
1. Election process timeline node click expands full panel with article references and EVM specs
2. Quiz timer bar depletes over 30s; correct answer shows green glow + "+10 points"; wrong shows explanation
3. Completing 15-question quiz shows results screen with grade and correct/wrong counts
4. Chatbot sends message via `/api/chat`, displays response in glass card with source citation
5. Quick-question chip click auto-populates input and sends message
6. Voter eligibility checker returns correct result for age 17 (under-18 message)

**Estimated plans:** 3
- Plan A: Election Process timeline (10 nodes, all content, 6 legal cards) + Upcoming Elections (countdowns, calendar) + Key Facts (stat cards, carousel)
- Plan B: Quiz engine (intro, question cards, timer, answer feedback, results, Firestore submission, share)
- Plan C: AI Election Guide (chat layout, quick chips, Gemini API integration, typing indicator, Firestore session) + Voter's Guide (eligibility checker, registration, voting day, special categories)

---

## Phase 6: Testing, Accessibility & Deployment

**Goal:** Achieve 80%+ test coverage with unit/integration/E2E tests, pass WCAG 2.1 AA audit, set up GitHub Actions CI/CD, and produce a complete README — ensuring the app scores full marks on Testing and Accessibility criteria.

**UI hint:** no

**Requirements covered:**
- TEST-01: `tests/unit/test_data_utils.py`
- TEST-02: `tests/integration/test_chat_api.py`
- TEST-03: `tests/integration/test_quiz_api.py`
- TEST-04: `tests/integration/test_search_api.py`
- TEST-05: `tests/e2e/test_user_flows.py` (Playwright)
- TEST-06: `pytest.ini` / `conftest.py`
- A11Y-01: Single h1, heading hierarchy
- A11Y-02: ARIA labels and unique IDs
- A11Y-03: Keyboard navigation (Tab, Enter, Escape)
- A11Y-04: Color contrast WCAG AA
- A11Y-05: `role`, `aria-live` for dynamic content
- CICD-01: Dockerfile (python:3.11-slim, non-root, EXPOSE 8080)
- CICD-02: requirements.txt (all pinned versions)
- CICD-03: `.github/workflows/test.yml`
- CICD-04: `.github/workflows/deploy.yml`
- CICD-05: `README.md` (full documentation)

**Success criteria:**
1. `pytest backend/tests/ -v` runs and all tests pass (green)
2. Test coverage report shows 80%+ across backend modules
3. Playwright E2E test `test_homepage_loads` passes against `localhost:8080`
4. `axe-core` accessibility audit on deployed app returns 0 critical violations
5. All form controls, modal close buttons, and nav links are reachable by Tab key
6. GitHub Actions `test.yml` workflow passes on a test push
7. README.md includes architecture diagram, Google services table, and `docker build` + `gcloud run deploy` commands

**Estimated plans:** 3
- Plan A: Test suite (conftest.py, unit tests, integration tests with mocked Gemini/Firestore, pytest.ini)
- Plan B: Playwright E2E tests (homepage, quiz flow, chatbot) + accessibility audit + ARIA/heading fixes
- Plan C: Dockerfile + requirements.txt + GitHub Actions workflows + README.md

---

## Requirement Coverage Verification

| Phase | Requirements | Count |
|-------|-------------|-------|
| Phase 1 | DSYS-01–05, NAV-01–06, HERO-01–07 | 18 |
| Phase 2 | DATA-01–07, API-01–06, GCP-01–05, SEC-01–06 | 24 |
| Phase 3 | MAP-01–08, GOVT-01–04, LEAD-01–04, PARTY-01–05 | 21 |
| Phase 4 | PARL-01–05, STATE-01–05, RES-01–05 | 15 |
| Phase 5 | PROC-01–05, ELEC-01–03, FACT-01–03, VOTE-01–04, QUIZ-01–07, AI-01–07 | 29 |
| Phase 6 | TEST-01–06, A11Y-01–05, CICD-01–05 | 16 |
| **Total** | | **78** ✓ |

All v1 requirements mapped. No unmapped requirements. ✓

---
*Roadmap created: 2026-05-03*
*Next: `/gsd-plan-phase 1` to begin execution*
