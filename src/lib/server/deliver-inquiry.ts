import "server-only";
import type { Inquiry } from "@/lib/inquiry-schema";
import { inquiryTypes } from "@/data/navigation";
import { categoryById } from "@/data/categories";
import { getProductBySlug } from "@/data/products";
import type { CategoryId } from "@/data/types";

export type DeliveryResult = { ok: true; reference?: string } | { ok: false; reason: "not_configured" | "delivery_failed" };

type Payload = Omit<Inquiry, "website" | "startedAt"> & { productName?: string; submittedAt: string; source: string };

function toPayload(data: Inquiry): Payload {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { website, startedAt, ...rest } = data;
  const productName = rest.product ? getProductBySlug(rest.product)?.name ?? rest.product : undefined;
  return { ...rest, productName, submittedAt: new Date().toISOString(), source: "mmprinters.net/contact" };
}

function plainText(p: Payload) {
  const type = inquiryTypes.find((t) => t.value === p.inquiryType)?.label ?? p.inquiryType;
  const rows: [string, string | undefined][] = [
    ["Inquiry type", type],
    ["Name", p.name],
    ["Email", p.email],
    ["Company", p.company],
    ["Phone", p.phone],
    ["Country / region", p.country],
    ["Product category", p.productCategory ? categoryById[p.productCategory as CategoryId]?.name : undefined],
    ["Product", p.productName],
    ["Estimated quantity", p.quantity],
    ["Desired delivery date", p.deliveryDate],
    ["Submitted", p.submittedAt],
  ];
  return `${rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${p.message}\n`;
}

/**
 * Delivers an inquiry using the driver set in INQUIRY_DRIVER:
 *   laravel — POST JSON to LARAVEL_INQUIRY_URL (recommended; see docs/laravel-inquiry-endpoint.md)
 *   smtp    — send an email through SMTP_* to INQUIRY_TO_EMAIL
 *   log     — print to the server console (development only; refused in production)
 * With no driver configured, the inquiry is NOT accepted and the visitor is told to email/call instead.
 */
export async function deliverInquiry(data: Inquiry): Promise<DeliveryResult> {
  const driver = process.env.INQUIRY_DRIVER?.trim().toLowerCase();
  const payload = toPayload(data);

  try {
    if (driver === "laravel") {
      const url = process.env.LARAVEL_INQUIRY_URL;
      if (!url) return { ok: false, reason: "not_configured" };
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(process.env.LARAVEL_INQUIRY_TOKEN ? { Authorization: `Bearer ${process.env.LARAVEL_INQUIRY_TOKEN}` } : {}),
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
        cache: "no-store",
      });
      if (!res.ok) {
        console.error("[inquiry] Laravel endpoint responded", res.status);
        return { ok: false, reason: "delivery_failed" };
      }
      const json = (await res.json().catch(() => ({}))) as { reference?: string; id?: string | number };
      return { ok: true, reference: json.reference ?? (json.id != null ? String(json.id) : undefined) };
    }

    if (driver === "smtp") {
      const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, INQUIRY_TO_EMAIL, INQUIRY_FROM_EMAIL } = process.env;
      if (!SMTP_HOST || !INQUIRY_TO_EMAIL || !INQUIRY_FROM_EMAIL) return { ok: false, reason: "not_configured" };
      const nodemailer = await import("nodemailer");
      const transport = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT || 587),
        secure: SMTP_SECURE === "true",
        auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
      });
      const type = inquiryTypes.find((t) => t.value === payload.inquiryType)?.label ?? "Inquiry";
      const info = await transport.sendMail({
        from: INQUIRY_FROM_EMAIL,
        to: INQUIRY_TO_EMAIL,
        replyTo: `"${payload.name.replace(/"/g, "")}" <${payload.email}>`,
        subject: `[Website] ${type}${payload.productName ? `: ${payload.productName}` : ""} — ${payload.name}`,
        text: plainText(payload),
      });
      return { ok: true, reference: info.messageId };
    }

    if (driver === "log") {
      if (process.env.NODE_ENV === "production") return { ok: false, reason: "not_configured" };
      console.info("[inquiry:log driver — development only]\n" + plainText(payload));
      return { ok: true, reference: `dev-${Date.now()}` };
    }

    return { ok: false, reason: "not_configured" };
  } catch (err) {
    console.error("[inquiry] delivery error", err instanceof Error ? err.message : err);
    return { ok: false, reason: "delivery_failed" };
  }
}
