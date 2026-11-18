const buckets = new Map<string, { count: number; resetAt: number }>();

/** Fixed-window limiter. Returns true when the request is allowed. */
export function rateLimit(key: string, limit = 12, windowMs = 60_000): boolean {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || now > current.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (current.count >= limit) return false;

  current.count += 1;
  return true;
}

export function resetRateLimits() {
  buckets.clear();
}

export function clientIp(headers: Record<string, string | string[] | undefined>, fallback = 'unknown') {
  const fwd = headers['x-forwarded-for'];
  const raw = Array.isArray(fwd) ? fwd[0] : fwd;
  return raw?.split(',')[0]?.trim() || fallback;
}
