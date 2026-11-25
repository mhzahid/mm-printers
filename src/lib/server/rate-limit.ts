/**
 * Simple fixed-window rate limiter kept in memory.
 * Fine for a single Node process (VPS / `next start`). On serverless or multi-instance
 * hosting, replace with a shared store (Redis/Upstash) or rate-limit at the proxy (nginx).
 */
const hits = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  if (hits.size > 5000) for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
  const entry = hits.get(key);
  if (!entry || entry.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  entry.count += 1;
  if (entry.count > limit) return { ok: false, retryAfter: Math.ceil((entry.reset - now) / 1000) };
  return { ok: true, retryAfter: 0 };
}
