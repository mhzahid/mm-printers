# MM Printers — website

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger ·
React Hook Form + Zod · Lucide icons.

Nine pages plus a reusable product template, built from a typed content layer:

| Route | Page |
|---|---|
| `/` | Home |
| `/products` | Catalogue with category filters and search (`?category=…&q=…`) |
| `/products/[slug]` | Product detail template (27 static pages) |
| `/manufacturing` | Manufacturing & capabilities |
| `/quality` | Quality & sustainability |
| `/facilities` | Facilities (gallery + lightbox) |
| `/about` | About us |
| `/global-buyers` | Global buyers & industry relationships |
| `/contact` | Contact & inquiries (`?type=quotation&product=hang-tag` pre-fills the form) |

Also: `/api/inquiry`, `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, custom 404.

## Setup

Requires Node.js 20.9+ (22 LTS recommended).

```bash
npm install
cp .env.example .env.local     # then edit
npm run dev                    # http://localhost:3000
```

To test the form locally without a backend, set `INQUIRY_DRIVER=log` in `.env.local`
(submissions are printed to the terminal; this driver is refused in production).

```bash
npm run lint && npm run typecheck
npm run build && npm start     # production build on :3000
```

## Environment variables

See `.env.example`. Summary:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL (sitemap, OG, canonical tags) |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `false` on staging → robots disallow all |
| `NEXT_PUBLIC_SHOW_CONTENT_GAPS` | `true` on staging → shows "content needed" notes in place |
| `INQUIRY_DRIVER` | `laravel`, `smtp` or `log` (dev). Unset = form refuses honestly with 503 |
| `LARAVEL_INQUIRY_URL`, `LARAVEL_INQUIRY_TOKEN` | Laravel endpoint + bearer token (server-side only) |
| `SMTP_*`, `INQUIRY_FROM_EMAIL`, `INQUIRY_TO_EMAIL` | SMTP delivery |

No secret is ever exposed to the browser — only `NEXT_PUBLIC_*` values are.

## Inquiry form

- Same Zod schema on client and server (`src/lib/inquiry-schema.ts`).
- Spam protection: hidden honeypot field, minimum fill time, same-origin check, 32 KB body cap,
  per-IP rate limit (5 per 10 minutes, in memory — fine for a single VPS process; use Redis or
  nginx `limit_req` if you run several instances).
- Success is shown **only** after the backend accepts the inquiry. Failures keep the visitor's
  input and offer retry plus email/phone alternatives.
- Laravel integration: `docs/laravel-inquiry-endpoint.md` (payload, controller, validation).

## Editing content

All content lives in `src/data/`:

- `products.ts` — the 27 products. Optional fields (`materials`, `colors`, `sizes`, `finishing`,
  `specifications`, `packaging`, `gallery`…) render only when filled. `publicationStatus` other than
  `"published"` hides a product everywhere (catalogue, sitemap, static pages).
- `categories.ts` — the nine catalogue categories and the six home tiles.
- `company.ts` — company facts, strengths, values, workflow, quality practices, plus the
  verification-gated lists: `machines`, `certifications`, `sustainabilityInitiatives`, `buyers`,
  `testimonials`, `facilityShotList`. Sections for these stay hidden (or show an honest placeholder)
  until entries are published — and buyers/testimonials additionally need `approvedForDisplay: true`.

**Do not add** capacity figures, certifications, client names/logos, testimonials or specifications
that MM Printers has not confirmed. See `docs/CONTENT-REQUIRED.md` for the outstanding list.

## Asset guide

Product and facility images currently use studio **illustrations** (`ProductArt.tsx`) and marked
placeholder frames. No stock photography is used. To replace:

1. Put files in `public/images/products/<slug>/` and `public/images/facilities/`.
2. Recommended: product main image **1600×1600 (1:1)** on a plain light ground, gallery images same
   ratio; facility images **2400×1800 (4:3)** minimum. JPG/WebP, sRGB. Next.js serves AVIF/WebP
   at responsive sizes automatically.
3. Reference them in `src/data/*.ts`:

```ts
image: { src: "/images/products/woven-label/main.jpg", alt: "Black woven neck label with white logo", width: 1600, height: 1600, verified: true },
```

`verified: true` means real MM Printers photography approved for publication — only then is the image
shown and used in Open Graph tags. The illustration fallback disappears automatically.

Logo: replace `src/components/ui/Wordmark.tsx` and `src/app/icon.svg`.

## Motion

- One orchestrated hero sequence (`HeroMotion.tsx`); everything else opts in with attributes handled
  by `MotionProvider.tsx`: `data-reveal="up|mask|line|stagger"`, `data-reveal-item`, `data-timeline`.
- GSAP loads lazily after first paint; all triggers are created in a `gsap.context` and reverted on
  route change (no leaks or duplicate ScrollTriggers).
- `prefers-reduced-motion: reduce` → no hiding, no scroll-linked effects, no smooth scrolling.
  If scripts fail to load, a 3-second safety net reveals everything.
- Lenis smooth scrolling was deliberately **not** added: native scrolling is faster, accessible and
  the motion doesn't depend on it.
- Custom scrollbar: `scrollbar-color` / `scrollbar-width` with a `::-webkit-scrollbar` fallback
  (`globals.css`). A separate 3px reading-progress bar sits at the top of the viewport.

## Testing done

- `next build` (Next 16.4), ESLint (`npm run lint` → `eslint .`) and `tsc` clean. `npm audit`: 0 vulnerabilities.
- Playwright run against the production build: every route 200, unknown product 404, 35 URLs in
  sitemap, filters/search/empty state/deep links, product → form pre-fill, client & server
  validation, honeypot, cross-origin rejection, rate limiting, 503 "not configured" path (no false
  success), Laravel-driver success path against a mock endpoint, mobile menu (focus trap, Escape,
  focus return), mega-menu, lightbox (keyboard + Escape), no horizontal overflow at
  360/390/768/1024/1440/1920px, reduced-motion visibility, all reveals complete after scroll.
- Colour contrast: body text 15.9:1, muted text 7.7:1 on ivory / 6.8:1 on stone, 7.3:1 on charcoal.

`npm audit` reports 0 vulnerabilities. Linting deliberately doesn't use `eslint-config-next`: its
`@next/eslint-plugin-next` depends on `fast-glob → micromatch → braces`, which has an advisory with no
patched release. `eslint.config.mjs` uses the same underlying plugins (React, React Hooks, jsx-a11y,
typescript-eslint) and re-creates the two Next rules that matter here (use `next/image`, use `next/link`
for internal links). If you later re-add `eslint-config-next`, that advisory returns.

Run Lighthouse against your deployed URL to confirm scores under real hosting conditions.

## Deployment (Hostinger / any Ubuntu VPS)

```bash
# on the server
git clone <repo> /var/www/mm-printers && cd /var/www/mm-printers
npm ci && cp .env.example .env.production   # fill in values
npm run build
pm2 start npm --name mm-printers -- start -- -p 3000
pm2 save
```

nginx reverse proxy (with TLS via certbot):

```nginx
server {
  server_name mmprinters.net www.mmprinters.net;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
  location = /api/inquiry { limit_req zone=inquiry burst=3 nodelay; proxy_pass http://127.0.0.1:3000; proxy_set_header Host $host; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; }
}
# in http {}: limit_req_zone $binary_remote_addr zone=inquiry:10m rate=6r/m;
```

`X-Forwarded-For` must be set so per-IP rate limiting sees the real visitor address.
Vercel also works out of the box (use a shared store for rate limiting there).

## Project structure

```
src/
  app/            routes, sitemap, robots, OG image, API route
  components/
    layout/       SiteHeader, DesktopNavigation, MobileNavigation, SiteFooter
    sections/     HeroSection, WorkflowSteps, ManufacturingTimeline, MachineryGrid, BuyerRelationshipGrid, InquiryBand, SpecSheet
    product/      ProductCard, ProductCatalogue (filters + search), ProductGallery, ProductSpecifications, ProductArt
    gallery/      FacilityGallery (lightbox)
    contact/      ContactForm
    motion/       MotionProvider, ScrollChrome (progress bar + back to top)
    ui/           Wordmark, PageHero, SectionHeading, Breadcrumbs, ContentGap
    seo/          JsonLd
  data/           typed content (products, categories, company, navigation)
  lib/            schema, metadata, structured data, server-only delivery & rate limit
  fonts/          self-hosted Archivo (variable width) and Instrument Sans
```

Structured data: Organization (verified facts) and BreadcrumbList. Product schema is intentionally
omitted — rich results require price/offers or reviews, which aren't published.
