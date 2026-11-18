# ICA — International Christian Assemblies website

Website for **International Christian Assemblies (ICA) Kibera**, Nairobi — senior leaders Bishop Andrew & Dr. Ruth Ouma.
Next.js 14 (pages router) · Tailwind CSS · TypeScript. White + purple design in the style of modern church sites.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # validation, storage, rate-limit tests
npm run build
```

Nothing needs configuring to run. Copy `.env.example` to `.env.local` when you're ready for email and a database.

## Pages
Home · About (story, values, leadership, beliefs) · Visit (service times, what to expect, "plan a visit" form, FAQ) ·
Messages (YouTube sermons with filter + in-page player) · Ministries · Events · Register (event checkout) · Prayer · Contact · Admin dashboard (`/admin`) · branded 404/500 pages.

## Edit content without touching code
- `content/church.ts` — name, phone, email, service times, sermons (YouTube IDs), ministries, events, beliefs, FAQ, gallery.
  Lines marked **CONFIRM** came from an earlier draft (phone, email, service times, language) — please check them.
- `content/nav.ts` — menu.
- `public/images/` — photos (from the ICA Kibera Facebook page and YouTube channel) and the globe-and-dove logo.
- `HERO_SLIDES` in `content/church.ts` — the homepage slideshow.
- Hero video: drop a file in `public/videos/` and swap the hero `<img>` in `pages/index.tsx` for a `<video autoPlay muted loop playsInline poster=...>`.

## Event registration (checkout sessions)
1. `/register` → choose a service/conference and seats → `POST /api/checkout/sessions` holds seats for 15 minutes.
2. `/register/[session]` → details (draft saved if the connection drops) → `POST /api/checkout/sessions/:id/confirm` (idempotent; retries never double-book).
3. Confirmation with reference (e.g. `ICA-7KQ2MX`), add-to-calendar, WhatsApp invite, email confirmation.
Sunday services are generated automatically for the next two Sundays; add conferences in `content/registrations.ts`.

## Admin
`/admin` (password from `ADMIN_PASSWORD`): visitors chart, top pages, sources, seat counts, registrations, prayer requests, planned visits, messages, CSV export.
In local development the password is `ica-admin-dev`.

See `docs/SECURITY.md`, `docs/UX-RULES.md` and `docs/EXPERIENCE.md` (design + motion).

## Backend
- `POST /api/visit`, `/api/prayer`, `/api/contact` — validated (Kenyan phone normalisation), rate-limited, honeypot spam trap.
- Saved to PostgreSQL when `DATABASE_URL` is set (tables auto-create; see `sql/schema.sql`), otherwise kept in memory for development.
- Email notifications through Resend (`RESEND_API_KEY`, `NOTIFY_EMAIL`, `PRAYER_TEAM_EMAIL`). Private prayer requests are flagged "pastors only".
- `GET /api/health` (checks the database), `/robots.txt`, `/sitemap.xml`, Church JSON-LD, Open Graph link preview (`public/og-image.jpg`), web manifest and favicons.
- Cookieless analytics: `POST /api/collect` (sendBeacon on each page view).

## Deploy
Vercel (recommended): import the repo, add the env vars, deploy. Any Node 18+ host works with `npm run build && npm start`.
