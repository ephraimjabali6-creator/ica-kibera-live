// Client-side fetch with timeout, retry on network failure and friendly errors.

export class ApiError extends Error {
  constructor(message: string, public status: number, public field?: string, public offline = false) {
    super(message);
  }
}

const OFFLINE_MSG = 'You appear to be offline. Check your connection — we’ll keep what you typed.';
const TIMEOUT_MSG = 'The connection is slow and the request timed out. Please try again.';

export async function api<T = unknown>(
  url: string,
  init: RequestInit & { json?: unknown; timeoutMs?: number; retries?: number } = {}
): Promise<T> {
  const { json, timeoutMs = 12_000, retries = init.method && init.method !== 'GET' ? 1 : 2, ...rest } = init;
  if (typeof navigator !== 'undefined' && navigator.onLine === false) throw new ApiError(OFFLINE_MSG, 0, undefined, true);

  let attempt = 0;
  for (;;) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        ...rest,
        signal: ctrl.signal,
        headers: { Accept: 'application/json', ...(json !== undefined ? { 'Content-Type': 'application/json' } : {}), ...(rest.headers || {}) },
        body: json !== undefined ? JSON.stringify(json) : rest.body,
      });
      clearTimeout(timer);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        // Retry once on server overload / gateway errors.
        if ([502, 503, 504].includes(res.status) && attempt < retries) {
          attempt++;
          await new Promise((r) => setTimeout(r, 600 * attempt));
          continue;
        }
        throw new ApiError(data.error || 'Something went wrong. Please try again.', res.status, data.field);
      }
      return data as T;
    } catch (err) {
      clearTimeout(timer);
      if (err instanceof ApiError) throw err;
      if (attempt < retries) {
        attempt++;
        await new Promise((r) => setTimeout(r, 800 * attempt));
        continue;
      }
      const aborted = (err as Error)?.name === 'AbortError';
      throw new ApiError(aborted ? TIMEOUT_MSG : OFFLINE_MSG, 0, undefined, !aborted);
    }
  }
}
