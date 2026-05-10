> This project is made with the help of Claude (1M context).

# AutoCareHub

India's car service marketplace — connect with 50,000+ verified workshops across 500+ cities.

## Overview

AutoCareHub solves fragmented auto-repair discovery by centralizing trust, pricing transparency, and accountability. Users compare quotes from multiple vendors, book services, track progress in real time, and rely on verified ratings — all in one place.

## Features

- **Workshop discovery** — Browse and compare verified workshops by location and service type
- **Quote comparison** — Transparent pricing from multiple vendors for the same service
- **Real-time tracking** — Live updates on service progress and completion
- **Verified vendors** — Ratings, reviews, certifications, parts guarantees
- **Service categories** — Maintenance, repairs, painting, electrical, diagnostics
- **SEO-optimized** — Structured data (JSON-LD), Open Graph, Twitter cards
- **Skeleton loaders** — Smooth UX while data fetches

## Tech Stack

- **Framework:** Next.js 16.2 (App Router), React 19.1, TypeScript 5
- **Styling:** Tailwind CSS 4 with class-variance-authority
- **Animation:** Framer Motion 12
- **Icons:** Lucide React
- **SDK:** @buildwithdarsh/sdk
- **Deploy:** Vercel

## Getting Started

```bash
npm install
cp .env.example .env.local   # populate values
npm run dev
```

Live: [autocarehub.work.withdarsh.com](https://autocarehub.work.withdarsh.com)

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — run ESLint

## Project Structure

```
src/
├── app/              # Routes + HomeContent (Hero, Features, Testimonials, FAQ)
├── components/       # Navbar and shared UI
└── lib/mock-data.ts  # Workshop fixtures
```
