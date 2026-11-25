import type { MetadataRoute } from "next";
import { publishedProducts } from "@/data/products";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["/", "/products", "/manufacturing", "/quality", "/facilities", "/about", "/global-buyers", "/contact"];
  return [
    ...pages.map((p) => ({
      url: absoluteUrl(p),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "/" ? 1 : p === "/products" ? 0.9 : 0.7,
    })),
    ...publishedProducts.map((p) => ({
      url: absoluteUrl(`/products/${p.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
