# VoteIQ India — "Bharat Gaurav"

## What This Is

VoteIQ India is an AI-powered, visually immersive election education platform for Indian democracy. Built for the PromptWars Virtual Challenge 2, it transforms complex electoral processes into beautiful, interactive experiences — featuring a D3.js India map, live parliament seating charts, 2024 election data deep-dives, an adaptive quiz engine, and a bilingual Gemini-powered AI guide. Target users are first-time voters, students, journalists, researchers, NRIs, and civic educators.

## Core Value

A citizen who opens VoteIQ India must be able to understand India's election process, explore live political data, and get reliable AI-guided answers — all in one place, in Hindi or English.

## Requirements

### Validated

<!-- None yet — ship to validate -->
(None yet — ship to validate)

### Active

- [ ] Full-screen cinematic loading screen with Ashoka Chakra animation
- [ ] Sticky navbar with tricolor scroll border, language toggle (EN/HI), and "Ask AI" CTA
- [ ] Hero section: animated headline, 4 CountUp stat counters, scrolling ticker, particle canvas
- [ ] Interactive D3.js India map: 4 view modes (LS results, ruling party, CM overview, turnout)
- [ ] State hover tooltips and click-to-open detail side panel (all 28 states + 8 UTs)
- [ ] Current Government section: President, VP, PM cards + full 30-minister cabinet grid
- [ ] National Leaders section: tabbed (Govt / Opposition / ECI) with card flip animations
- [ ] Political Parties encyclopedia: 25 parties with alliance filter, party detail modals
- [ ] Parliament Dashboard: D3.js semicircular seating charts for Lok Sabha + Rajya Sabha
- [ ] States & UTs dashboard: 31 entries, searchable/filterable grid + full table + state modals
- [ ] 2024 Lok Sabha results deep-dive: stacked bar chart, top-20 constituency table, state-wise accordions
- [ ] Election Process: interactive 10-node horizontal timeline with expandable panels
- [ ] Upcoming Elections: countdown cards + election calendar (Jan 2025 – Dec 2026)
- [ ] Key Facts dashboard: 8 animated stat cards + facts carousel
- [ ] 15-question adaptive election quiz with timer, scoring, explanations, Firestore score storage
- [ ] AI Election Guide: Gemini 1.5 Flash chatbot, bilingual, quick-question chips, session history
- [ ] Voter's Guide: eligibility checker tool + registration steps + voting day guide + special categories
- [ ] Flask backend: `/api/chat`, `/api/data/<resource>`, `/api/quiz/submit`, `/api/search`, `/health`
- [ ] Google Gemini 1.5 Flash integration with curated system prompt (neutral, factual, bilingual)
- [ ] Google Firestore: chat session history, quiz scores, anonymised analytics
- [ ] Google Secret Manager: GEMINI_API_KEY fetched at runtime, never hardcoded
- [ ] Google Cloud Logging: structured request and error logs
- [ ] Flask-Talisman: CSP, HSTS, X-Frame-Options, XSS protection headers
- [ ] Flask-Limiter: rate limiting (30 req/min chat, 100 req/min data)
- [ ] Input validation: HTML escape, length limits, allowlist for data resources
- [ ] Pytest unit + integration test suite (87%+ coverage target)
- [ ] Playwright E2E tests: homepage load, quiz flow, chatbot interaction
- [ ] GitHub Actions CI/CD: test on push, deploy to Cloud Run on main merge
- [ ] Dockerfile: non-root user, python:3.11-slim, Cloud Run compatible
- [ ] WCAG 2.1 AA accessibility: ARIA labels, keyboard navigation, screen-reader headings
- [ ] Full "Bharat Gaurav" design system: CSS variables, Google Fonts, tricolor palette, animations
- [ ] README.md with architecture diagram, Google services table, security notes, setup guide

### Out of Scope

- Google Maps API — using D3.js + TopoJSON instead (free, no billing required)
- OAuth/user accounts — anonymous sessions via UUID (reduces complexity)
- Real-time WebSocket updates — static data + Firestore polling is sufficient
- Mobile native app — web-first, responsive design covers mobile
- Paid news API — all data is static JSON bundled with the app
- Video content — out of scope for competition timeline

## Context

- **Competition:** PromptWars Virtual Challenge 2 by Hack2Skill/Google — scored on 6 criteria: Code Quality, Security, Efficiency, Testing, Accessibility, Google Services
- **Stack locked by spec:** Vanilla HTML/CSS/JS frontend + Python Flask backend + Google Cloud suite
- **Developer:** Sumit Suthar — has prior VoteIQ India codebase in `d:\prompt war\voteiq-india\` (partial implementation exists; this GSD project targets a complete, competition-ready rebuild in `d:\final prompt war sub\`)
- **Data:** All election data (states, parties, leaders, 2024 results, constituencies) is bundled as static JSON — no live API calls to ECI
- **Deployment target:** Google Cloud Run, region `asia-south1`, public URL
- **Emotional goal:** Opening the site should feel like watching the Republic Day parade — grand, informative, emotionally resonant

## Constraints

- **Tech Stack:** Vanilla HTML/CSS/JS (single-page) + Flask backend — no React, no Vue, no Tailwind
- **Google Services:** Must use Gemini, Cloud Run, Firestore, Secret Manager, Cloud Logging to score on that criterion
- **Timeline:** Competition deadline — phases must ship in priority order; visual polish before v2 features
- **Security:** All 6 security measures must be visible and documented (Secret Manager, Talisman, Limiter, validation, non-root Docker, CORS)
- **Testing:** Must achieve 80%+ coverage with unit + integration + E2E tests
- **Accessibility:** WCAG 2.1 AA minimum — keyboard navigation, ARIA labels, heading hierarchy

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| D3.js + TopoJSON for India map | Avoids Google Maps billing, fully customisable SVG, free | — Pending |
| Vanilla HTML/CSS/JS frontend | Single-file simplicity, easier to review, no build step for judges | — Pending |
| Flask serves frontend + API | Avoids CORS complexity, single Cloud Run container, simpler deploy | — Pending |
| Anonymous sessions (UUID) | No auth complexity, still enables Firestore history and quiz scores | — Pending |
| Static JSON data bundle | Zero latency for data endpoints, no ECI API dependency or rate limits | — Pending |
| Gemini 1.5 Flash (not Pro) | Lower latency, lower cost, sufficient quality for Q&A education use case | — Pending |
| Non-root Docker user | Security best practice, required for Cloud Run hardening score | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-03 after initialization*
