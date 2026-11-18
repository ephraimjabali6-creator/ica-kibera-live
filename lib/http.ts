import type { NextApiRequest, NextApiResponse } from 'next';
import { clientIp, rateLimit } from './rateLimit';

/** Small request guard shared by every API route. */
export function guard(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: { methods: string[]; limit?: [key: string, max: number, windowMs?: number] }
): boolean {
  res.setHeader('Cache-Control', 'no-store');
  if (!opts.methods.includes(req.method || '')) {
    res.setHeader('Allow', opts.methods);
    res.status(405).json({ error: 'Method not allowed' });
    return false;
  }
  if (req.method !== 'GET' && req.method !== 'HEAD' && !sameOrigin(req)) {
    res.status(403).json({ error: 'This request came from another site and was blocked.' });
    return false;
  }
  if (opts.limit) {
    const [key, max, windowMs = 60_000] = opts.limit;
    if (!rateLimit(`${key}:${clientIp(req.headers, req.socket?.remoteAddress || 'unknown')}`, max, windowMs)) {
      res.setHeader('Retry-After', String(Math.ceil(windowMs / 1000)));
      res.status(429).json({ error: 'Too many requests. Please wait a moment and try again.' });
      return false;
    }
  }
  return true;
}

/**
 * CSRF protection for state-changing requests: the Origin (or Referer) must match
 * this site. Browsers always send Origin on cross-site POSTs, so forged forms fail.
 */
export function sameOrigin(req: NextApiRequest): boolean {
  const origin = (req.headers.origin as string) || (req.headers.referer as string) || '';
  if (!origin) return true; // non-browser clients (curl, health checks)
  try {
    const host = (req.headers['x-forwarded-host'] as string) || req.headers.host || '';
    const allowed = new Set([host, ...(process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean)]);
    const u = new URL(origin);
    return allowed.has(u.host) || allowed.has(u.origin);
  } catch {
    return false;
  }
}

export function log(event: string, data: Record<string, unknown> = {}) {
  // Structured, single-line logs that hosting dashboards can search. Never log personal details.
  console.log(JSON.stringify({ t: new Date().toISOString(), event, ...data }));
}
