# Information required before public launch

The site is built so each item below can be added in `src/data/` without redesigning
anything. Until supplied, the related section is either hidden or shows an honest
placeholder. Run with `NEXT_PUBLIC_SHOW_CONTENT_GAPS=true` on staging to see each gap in place.

## Brand
- [ ] Approved logo (SVG). Replace `src/components/ui/Wordmark.tsx` and `src/app/icon.svg`.
      The current "MM" woven-label mark is a proposal only.
- [ ] Confirm the palette (ivory / charcoal / orange) works with the approved logo.

## Products (`src/data/products.ts`)
- [ ] Photography for all 27 products (see Asset guide in README). Set `image` with `verified: true`.
- [ ] Per product, only where confirmed: materials, variations, colours, sizes, printing/finishing
      options, packaging details, technical specifications.
- [ ] Review the short descriptions and "typical uses" for accuracy.
- [ ] Confirm whether these proposed items are supplied (currently `pending-confirmation`, not shown):
      Eyelets, Interlining, Thread, Tissue Paper, Boards & Paper Inserts, Cartons, Paper Boxes.

## Manufacturing & facilities (`src/data/company.ts`)
- [ ] Machinery list: name, photo, function, product types, documented capabilities (`machines`).
- [ ] Facility photographs with title, caption, alt text and usage permission (`facilityShotList`).
- [ ] What may be published about the production facility (ownership, location, processes).
- [ ] Confirm the quality steps actually performed (who inspects, at what stage).
- [ ] Confirm wording of the "24/7 delivery team" statement.

## Quality, certification, sustainability
- [ ] Copies of any certificates / audits approved for publication (`certifications`).
- [ ] Evidence for any sustainability initiative before it is described (`sustainabilityInitiatives`).

## Buyers & relationships
- [ ] Nature of the relationship with **SSL** and **Rapid Trims Ltd.** and written permission
      before either is named. Nothing is displayed until confirmed.
- [ ] Approved buyer names/logos (`buyers`, with `approvedForDisplay: true`).
- [ ] Genuine testimonials with attribution and permission (`testimonials`).

## Company & contact
- [ ] Office business hours (`company.businessHours`).
- [ ] Verified map pin for the office (a Google Maps search link is used for now; no embed).
- [ ] Any milestones after 2020 for the About timeline (`timeline`).
- [ ] Choose and configure inquiry delivery (`INQUIRY_DRIVER`).
- [ ] Privacy notice wording for the inquiry form, if required.
