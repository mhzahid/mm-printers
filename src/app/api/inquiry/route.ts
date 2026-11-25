import { NextResponse, type NextRequest } from "next/server";
import { inquirySchema } from "@/lib/inquiry-schema";
import { rateLimit } from "@/lib/server/rate-limit";
import { deliverInquiry } from "@/lib/server/deliver-inquiry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIN_FILL_MS = 2500; // humans don't complete the form faster than this

function clientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  // Same-origin check (CSRF hardening for a cookie-less endpoint)
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  if (Number(req.headers.get("content-length") || 0) > 32_000) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  }

  const limited = rateLimit(`inquiry:${clientIp(req)}`);
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited", retryAfter: limited.retryAfter },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    // Honeypot hit: respond as if accepted so bots learn nothing, but deliver nothing.
    if (fieldErrors.website) return NextResponse.json({ ok: true, reference: null }, { status: 200 });
    return NextResponse.json({ ok: false, error: "validation", fieldErrors }, { status: 422 });
  }

  const data = parsed.data;
  if (data.startedAt && Date.now() - data.startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true, reference: null }, { status: 200 });
  }

  const result = await deliverInquiry(data);
  if (!result.ok) {
    const status = result.reason === "not_configured" ? 503 : 502;
    return NextResponse.json({ ok: false, error: result.reason }, { status });
  }
  return NextResponse.json({ ok: true, reference: result.reference ?? null }, { status: 200 });
}
