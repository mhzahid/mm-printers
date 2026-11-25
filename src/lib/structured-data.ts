import { company } from "@/data/company";
import { absoluteUrl, siteUrl } from "./site";

/** Organization data uses only verified company facts. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: company.name,
    url: siteUrl,
    email: company.email,
    telephone: company.phone,
    foundingDate: String(company.established),
    description: company.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${company.address.line1}, ${company.address.line2}`,
      addressLocality: company.address.city,
      postalCode: company.address.postalCode,
      addressCountry: company.address.countryCode,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.href),
    })),
  };
}

/*
 * Product structured data is intentionally NOT emitted.
 * Google requires offers, review or aggregateRating for Product rich results,
 * and MM Printers publishes none of these. Emitting placeholders would be untruthful.
 * Pages use BreadcrumbList + Organization instead.
 */
