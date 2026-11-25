export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.mmprinters.net").replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
