# EcoTrace 🌱

> Track the trace you leave on the planet.

**Live Demo:** https://sweet-yeot-1c1e5e.netlify.app/  
**GitHub:** https://github.com/YuvrajVikramSingh-08/EcoTrace

---

## Vertical

Sustainability / Environment — Carbon Footprint Tracking

## Problem Statement

Individuals lack a simple, personalised way to understand, track, and reduce
their daily carbon footprint. EcoTrace solves this by combining AI-powered
natural-language logging with habit tracking and gamification to make
sustainable living measurable and rewarding.

## Approach and Logic

EcoTrace is built around four integrated modules:

1. **EcoDiary** — Users describe their day in plain English. Gemini 1.5 Flash
   parses the text, identifies every carbon-emitting activity, and quantifies
   each one using India-specific emission factors (CEA 2023, IPCC AR6).

2. **EcoCoach** — A persistent AI advisor powered by Gemini with full knowledge
   of the user's profile, diary history, and habits. It answers "what if"
   questions, generates weekly plans, and provides proactive alerts when the
   user exceeds their carbon budget mid-week.

3. **Habit Hub** — A curated library of 30+ green habits, each with a measured
   daily CO₂ saving. Users check in daily, earn streaks, and join themed
   7/14/30-day challenges.

4. **Gamification Engine** — XP, 5-tier levels, 20+ badges, and a virtual tree
   that grows with cumulative CO₂ savings transform behaviour change into a
   rewarding experience.

## How the Solution Works

1. User signs up and completes a carbon profile (diet type, vehicle, etc.)
2. Every day, they type what they did — no forms, no dropdowns
3. Gemini extracts and quantifies each activity
4. The dashboard shows real-time CO₂ trends, category breakdowns, and
   comparison to India's national average (5.2 kg/day per person)
5. The EcoCoach chatbot provides personalised, context-aware advice
6. Weekly, Gemini generates a letter-graded report with 3 specific actions
7. Habit streaks and badges provide daily motivation to maintain progress

## Assumptions

- India-specific emission factors from CEA (2023) and IPCC AR6 are used
- India national average: 1.9 t CO₂/year per person (World Bank 2022)
- Default user location: Urban India; defaults skew toward Indian diet and
  transport patterns
- One diary entry per user per day is enforced
- The Gemini API free tier (15 RPM, 1M tokens/day) is sufficient for
  hackathon-scale usage

## Tech Stack

| Layer      | Technology              |
| ---------- | ----------------------- |
| Frontend   | React 18 + Vite         |
| Styling    | Tailwind CSS v3         |
| AI         | Google Gemini 2.0 Flash |
| Auth       | Firebase Authentication |
| Database   | Cloud Firestore         |
| Charts     | Recharts                |
| Deployment | Netlify                 |

## Setup Instructions

### Prerequisites

- Node.js 18 or later
- A Google account (for Firebase + Gemini)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ecotrace.git
cd ecotrace
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in your keys:

```bash
cp .env.example .env
```

Get your Gemini API key from: https://aistudio.google.com/app/apikey  
Get your Firebase config from: https://console.firebase.google.com

### 4. Run locally

```bash
npm run dev
```

### 5. Run tests

```bash
npm test
```

### 6. Build for production

```bash
npm run build
```

## Google Services Used

- **Gemini 1.5 Flash API** — Natural language diary parsing, EcoCoach chatbot,
  weekly report generation, custom habit CO₂ estimation
- **Firebase Authentication** — Email/password and Google OAuth sign-in
- **Cloud Firestore** — User profiles, diary entries, habit logs, chat history,
  achievements, weekly reports

## Troubleshooting & Deployment Fixes

### ERESOLVE dependency resolution conflict on Netlify

During the initial deployment, the build failed with an `ERESOLVE` peer dependency resolution error.

- **Root Cause**: In `package.json`, `eslint` was pinned to `9.39.4` (v9.x) while `@eslint/js` was installed at `10.0.1` (v10.x), which expects `eslint` `10.x`.
- **Resolution**:
  1. Downgraded `@eslint/js` to `^9.39.4` in `package.json` to align versions.
  2. Added a `.npmrc` file with `legacy-peer-deps=true` to instruct npm to bypass peer dependency resolution blocks during installation.
  3. Performed clean installation and ran a successful production build check.

## License

MIT
