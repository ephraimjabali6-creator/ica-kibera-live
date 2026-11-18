import { createHash } from 'crypto';
import { persist } from './db';

// Privacy-first, cookieless page analytics. No IP addresses or personal data are stored:
// a visitor is counted with a hash of (daily salt + IP + browser) that changes every day.

export interface PageView {
  path: string;
  referrer: string;
  utmSource: string;
  device: 'mobile' | 'tablet' | 'desktop';
  visitor: string;
  at: string;
}

const g = global as unknown as { pageViews?: PageView[] };
function views() {
  if (!g.pageViews) g.pageViews = [];
  return g.pageViews;
}
export function resetAnalytics() {
  g.pageViews = [];
}

const BOT = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|preview|headless|lighthouse/i;

export function deviceFrom(ua: string): PageView['device'] {
  if (/ipad|tablet/i.test(ua)) return 'tablet';
  if (/mobi|android|iphone/i.test(ua)) return 'mobile';
  return 'desktop';
}

export function cleanPath(raw: unknown) {
  if (typeof raw !== 'string' || !raw.startsWith('/')) return null;
  const path = raw.split('#')[0].split('?')[0].slice(0, 200);
  // Never record personal pages (checkout sessions) or admin pages.
  if (path.startsWith('/admin')) return null;
  return path.startsWith('/register/') ? '/register/[session]' : path;
}

export function recordPageView(input: { path: unknown; referrer?: unknown; search?: unknown; ua: string; ip: string; dnt?: boolean }) {
  const path = cleanPath(input.path);
  if (!path || input.dnt || BOT.test(input.ua)) return null;
  let referrer = '';
  try {
    if (typeof input.referrer === 'string' && input.referrer) referrer = new URL(input.referrer).hostname.slice(0, 100);
  } catch {}
  const utmSource = typeof input.search === 'string' ? new URLSearchParams(input.search).get('utm_source')?.slice(0, 60) || '' : '';
  const day = new Date().toISOString().slice(0, 10);
  const salt = process.env.ANALYTICS_SALT || 'ica';
  const visitor = createHash('sha256').update(`${salt}|${day}|${input.ip}|${input.ua}`).digest('hex').slice(0, 16);
  const v: PageView = { path, referrer, utmSource, device: deviceFrom(input.ua), visitor, at: new Date().toISOString() };
  const list = views();
  list.push(v);
  if (list.length > 50_000) list.splice(0, list.length - 50_000);
  persist(`INSERT INTO page_views (path, referrer, utm_source, device, visitor) VALUES ($1,$2,$3,$4,$5)`, [path, referrer || null, utmSource || null, v.device, visitor]);
  return v;
}

function top(map: Map<string, number>, n = 8) {
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([key, count]) => ({ key, count }));
}

export function summary(days = 30, now = new Date()) {
  const since = now.getTime() - days * 86_400_000;
  const list = views().filter((v) => new Date(v.at).getTime() >= since);
  const pages = new Map<string, number>();
  const refs = new Map<string, number>();
  const devices = new Map<string, number>();
  const daily = new Map<string, Set<string>>();
  const visitors = new Set<string>();
  for (const v of list) {
    pages.set(v.path, (pages.get(v.path) || 0) + 1);
    const src = v.utmSource || v.referrer || 'Direct';
    refs.set(src, (refs.get(src) || 0) + 1);
    devices.set(v.device, (devices.get(v.device) || 0) + 1);
    const d = v.at.slice(0, 10);
    if (!daily.has(d)) daily.set(d, new Set());
    daily.get(d)!.add(v.visitor);
    visitors.add(`${d}:${v.visitor}`);
  }
  const series: { day: string; visitors: number }[] = [];
  for (let i = Math.min(days, 14) - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 86_400_000).toISOString().slice(0, 10);
    series.push({ day: d, visitors: daily.get(d)?.size || 0 });
  }
  return { days, pageViews: list.length, visitors: visitors.size, topPages: top(pages), sources: top(refs, 6), devices: top(devices, 3), series };
}
