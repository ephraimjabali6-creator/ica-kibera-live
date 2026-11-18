// Signed admin session tokens. Uses Web Crypto so it runs in both middleware (Edge) and API routes (Node).

const enc = new TextEncoder();
export const SESSION_HOURS = 8;

export function cookieName() {
  // __Host- cookies must be Secure, Path=/ and host-only: the strongest cookie scoping browsers offer.
  return process.env.NODE_ENV === 'production' ? '__Host-ica_admin' : 'ica_admin';
}

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) {
    if (process.env.NODE_ENV === 'production') throw new Error('ADMIN_SESSION_SECRET must be at least 32 characters');
    return 'dev-only-secret-change-me-dev-only-secret';
  }
  return s;
}

function b64url(buf: ArrayBuffer | Uint8Array) {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let bin = '';
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmac(data: string) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret()), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return b64url(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(user = 'admin', now = Date.now()) {
  const payload = b64url(enc.encode(JSON.stringify({ u: user, exp: now + SESSION_HOURS * 3600_000 })));
  return `${payload}.${await hmac(payload)}`;
}

export async function verifySessionToken(token: string | undefined, now = Date.now()) {
  if (!token || !token.includes('.')) return null;
  const [payload, sig] = token.split('.');
  if (!safeEqual(sig, await hmac(payload))) return null;
  try {
    const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return typeof json.exp === 'number' && json.exp > now ? (json as { u: string; exp: number }) : null;
  } catch {
    return null;
  }
}

/** Serialises a cookie with secure defaults: HttpOnly, Secure (in production), SameSite=Strict. */
export function serializeCookie(name: string, value: string, maxAgeSeconds: number) {
  const parts = [`${name}=${value}`, 'Path=/', 'HttpOnly', 'SameSite=Strict', `Max-Age=${maxAgeSeconds}`];
  if (process.env.NODE_ENV === 'production') parts.push('Secure');
  return parts.join('; ');
}

export async function passwordMatches(input: string) {
  const expected = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === 'production' ? '' : 'ica-admin-dev');
  if (!expected) return false;
  // Compare HMACs so timing does not leak the password length or content.
  return safeEqual(await hmac(`pw:${input}`), await hmac(`pw:${expected}`));
}
