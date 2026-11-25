# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally:

- **Local merchandisers** at Bangladeshi garment factories and buying houses. They know the trade, place the accessory orders, and need a trims supplier who matches the approved specification, answers quickly, and delivers before the production line needs the goods.
- **Overseas sourcing and brand teams** who nominate or approve suppliers for their garment programmes. They are checking whether MM Printers is credible enough to be listed, and whether brand-critical items like labels and tags will be reproduced exactly as approved.

Both arrive with a concrete job: find out what is supplied, judge whether the supplier is trustworthy, and start an inquiry or quotation.

## Product Purpose

The website for MM Printers, a garment accessories and packaging supplier in Dhaka, Bangladesh, established 2020. It presents the 27-product catalogue, explains how orders are coordinated from specification to delivery, and turns qualified visitors into inquiries and quotation requests.

Success means a merchandiser or sourcing team sends a well-formed inquiry (product, quantity, delivery date) and trusts what the site told them.

## Positioning

Factory-direct supply. MM Printers owns its production facility. Design and specification are coordinated at the Motijheel office, specifications go electronically to the company's own facility, dedicated personnel supervise manufacturing, and delivery is arranged to the buyer's destination. One team carries the order from the first conversation to the delivered carton, with no intermediary between the buyer's specification and the people making it.

## Operating Context

- Garment production runs to fixed schedules. A late or wrong accessory holds up a whole shipment, so predictability is what buyers value most.
- Orders are worked through as specifications, artwork, samples, changes and status updates. Communication happens by mobile phone and email.
- Typical inquiry inputs: product type, artwork or reference, size/material/colour if known, estimated quantity, destination, and required date.
- Office: 58/D, 2nd Floor, Arambagh, Motijheel, Dhaka-1000, Bangladesh. Phone +880 1820-837208, Info@mmprinters.net, mmprinters.net.

## Capabilities and Constraints

- **Catalogue:** 27 published products across nine categories (labels and heat transfers; hang tags, photo cards and stickers; woven and printed labels; packaging; and others; see `src/data/categories.ts`). Seven more items (eyelets, interlining, thread, tissue paper, boards and paper inserts, cartons, paper boxes) are `pending-confirmation` and must not be shown.
- **Inquiry flow:** the contact form supports deep links (`?type=quotation&product=<slug>`) and delivers through Laravel, SMTP or a dev log driver. Success is shown only after the backend accepts the inquiry.
- **Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, GSAP. Hosted on a VPS (Hostinger/Ubuntu, pm2 + nginx).
- **Verification gating:** machinery, certifications, sustainability initiatives, buyers, testimonials and facility images render only when published (and, for buyers and testimonials, approved for display).
- **Open decisions:** what may be published about the facility beyond ownership (location, processes); exact wording of the "24/7 delivery team" statement; business hours; privacy notice wording; the inquiry delivery driver for production.

## Brand Commitments

- **Name:** MM Printers.
- **Honesty is a hard rule:** no capacity figures, certifications, client names or logos, testimonials, specifications or sustainability claims unless MM Printers has confirmed them with evidence. Unconfirmed sections stay hidden or show an honest placeholder.
- **Voice (observed in current copy):** plain, specific, trade-literate British English. It explains what a product does on the garment and how an order moves, without hype or superlatives.
- **Logo:** the current "MM" woven-label wordmark and the ivory/charcoal/orange palette are proposals awaiting an approved logo; neither is binding yet.

## Evidence on Hand

- Verified company facts, the four-step workflow, values, quality practices and a 2020 founding milestone (`src/data/company.ts`).
- Product names, categories, descriptions and typical uses for 27 products (`src/data/products.ts`).
- **Photography:** none yet. A shoot is planned before launch, so product, facility and machinery slots should be designed for real photographs. The studio illustrations (`src/components/product/ProductArt.tsx`) are temporary.
- **Absent, so never fabricate:** machinery list, certificates, sustainability evidence, buyer names or logos, testimonials, post-2020 milestones. SSL and Rapid Trims Ltd. were mentioned in the original brief, but neither may be named until the relationship and written permission are confirmed.
- The outstanding list is in `docs/CONTENT-REQUIRED.md`.

## Product Principles

1. **Predictability over promises.** Show how an order stays on schedule and on spec. That is what both audiences are buying.
2. **Proof is earned.** Every claim must be backed by something MM Printers can show. An honest gap is better than an impressive invention.
3. **Serve the expert and the evaluator.** Local merchandisers want speed to the product and the inquiry; overseas teams want credibility and process. Neither should have to wade through content written for the other.
4. **Factory-direct is the story.** Owning the facility and supervising production in-house is the real difference, so it should be clear wherever it is relevant.
5. **Every path ends in a good inquiry.** Product pages, process pages and the contact form should lead to a specific, well-formed request.

## Accessibility & Inclusion

WCAG 2.1 AA as the working standard: contrast already measured (body 15.9:1, muted 7.7:1 on ivory), keyboard and focus handling in navigation, menus and lightbox, and full support for `prefers-reduced-motion`. English is the site language. Many visitors read it as a second language, so copy stays direct and avoids idiom.
