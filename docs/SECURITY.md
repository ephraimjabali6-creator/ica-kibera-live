# Security & privacy checklist

| Area | What the site does | Where |
|---|---|---|
| HTTPS | 308 redirect from http → https in production; HSTS (2 years, preload); CSP `upgrade-insecure-requests` | `middleware.ts`, `next.config.js` |
| Security headers | CSP (self + YouTube only), X-Frame-Options DENY, frame-ancestors none, nosniff, Referrer-Policy, Permissions-Policy, COOP, CORP | `next.config.js` |
| Admin protection | `/admin` and `/api/admin/*` need a signed session cookie; checked in middleware before any page or API runs | `middleware.ts`, `lib/session.ts` |
| Secure cookies | `__Host-ica_admin`: HttpOnly, Secure, SameSite=Strict, Path=/, host-only, 8-hour expiry, HMAC-SHA256 signed | `lib/session.ts` |
| Passwords | Compared in constant time; 5 attempts / 15 min / IP; failed attempts logged | `pages/api/admin/login.ts` |
| CSRF | Every POST/DELETE must come from this site's Origin; SameSite=Strict cookie | `lib/http.ts` |
| Abuse | Per-IP rate limits on every API, honeypot field on forms, 2–8 KB body limits | `lib/http.ts`, API routes |
| Input | Server-side validation and normalisation; HTML escaped in emails; CSV formula-injection guard | `lib/validation.ts`, `pages/api/admin/export.ts` |
| Privacy | Cookieless analytics, no IPs stored (daily-rotating hash), Do Not Track honoured, admin & checkout URLs never recorded | `lib/analytics.ts` |
| Indexing | `noindex` on admin, checkout and error pages; robots.txt disallows `/api`, `/admin`, `/register/` | `components/Layout.tsx`, `pages/robots.txt.tsx` |

Before launch: set `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` (32+ chars), `DATABASE_URL`, and check `/api/health`.
For more than one server instance, move rate limits and checkout holds to Postgres/Redis (the code paths are isolated in `lib/rateLimit.ts` and `lib/checkout.ts`).
