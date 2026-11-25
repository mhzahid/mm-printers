import type {
  BuyerRelationship,
  Certification,
  FacilityImage,
  Machine,
  SustainabilityInitiative,
  Testimonial,
} from "./types";

/** Verified company facts (source: MM Printers project brief). */
export const company = {
  name: "MM Printers",
  legalName: "MM Printers",
  established: 2020,
  description: "Factory-direct garment accessories and packaging supplier based in Dhaka, Bangladesh.",
  address: {
    line1: "58/D, 2nd Floor, Arambagh",
    line2: "Motijheel",
    city: "Dhaka",
    postalCode: "1000",
    country: "Bangladesh",
    countryCode: "BD",
  },
  phone: "+8801820837208",
  phoneDisplay: "+880 1820-837208",
  email: "Info@mmprinters.net",
  website: "https://www.mmprinters.net",
  /** Set only once confirmed by the company. */
  businessHours: undefined as string | undefined,
  /** Google Maps search link; the address resolves to Arambagh, Motijheel. */
  mapQuery: "58/D Arambagh, Motijheel, Dhaka 1000, Bangladesh",
} as const;

export const fullAddress = `${company.address.line1}, ${company.address.line2}, ${company.address.city}-${company.address.postalCode}, ${company.address.country}`;

/** The four-step factory-direct model. This is a real sequence, so it is numbered. */
export const workflow = [
  {
    title: "Design coordination",
    body: "Requirements, artwork and specifications are confirmed with you at our Motijheel office.",
  },
  {
    title: "Production communication",
    body: "Approved specifications are sent electronically to the production facility.",
  },
  {
    title: "Manufacturing supervision",
    body: "Dedicated personnel supervise production and report order status back to you.",
  },
  {
    title: "Delivery coordination",
    body: "Finished goods are arranged for delivery to the destination you specify.",
  },
];

/** Verified milestones only. Add entries once the company supplies supporting information. */
export const timeline = [{ year: 2020, title: "MM Printers established", body: "Founded in Dhaka as a garment accessories supplier." }];

/** Quality practices as described by the company. */
export const qualityPractices = [
  {
    title: "Specification confirmation",
    body: "Requirements and artwork are confirmed with you before production begins, so the facility works from an agreed brief.",
  },
  {
    title: "Production supervision",
    body: "Someone from our team supervises manufacturing, rather than leaving the order unattended until dispatch.",
  },
  {
    title: "Attention to finishing",
    body: "Accessories are seen up close on the finished garment. Finishing gets the same attention as the print or weave.",
  },
  {
    title: "Order-status communication",
    body: "Progress updates by mobile phone and email, so issues surface early instead of on delivery day.",
  },
  {
    title: "Feedback and changes",
    body: "Requested changes and feedback are taken back to production and resolved with you.",
  },
  {
    title: "Delivery coordination",
    body: "Packing and delivery are arranged with the same care as production, to the destination you need.",
  },
];

// ── Content awaiting verification ────────────────────────────────────
// Entries are only rendered when publicationStatus === "published"
// (and, for buyers/testimonials, approvedForDisplay === true).

/** No machinery has been documented yet. Add entries with photographs to publish. */
export const machines: Machine[] = [];

/** No certificates supplied. Do not add badges without a copy of the certificate. */
export const certifications: Certification[] = [];

/** No sustainability initiatives evidenced yet. */
export const sustainabilityInitiatives: SustainabilityInitiative[] = [];

/** No approved buyer relationships yet. SSL and Rapid Trims Ltd. were mentioned
 *  in the brief but the relationship is unconfirmed — do NOT add them here until it is. */
export const buyers: BuyerRelationship[] = [];

export const testimonials: Testimonial[] = [];

/**
 * Facility photography slots. These are placeholders that show the shot list
 * the gallery is designed around. Replace `image` with real photos and set
 * publicationStatus to "published" — placeholders render as clearly marked frames.
 */
export const facilityShotList: FacilityImage[] = [
  { id: "f1", title: "Production area", caption: "Wide view of where orders are made.", area: "production", publicationStatus: "draft" },
  { id: "f2", title: "Machinery", caption: "Equipment used for your products.", area: "machinery", publicationStatus: "draft" },
  { id: "f3", title: "Workstations", caption: "Production in progress.", area: "workstation", publicationStatus: "draft" },
  { id: "f4", title: "Product finishing", caption: "Finishing before packing.", area: "finishing", publicationStatus: "draft" },
  { id: "f5", title: "Packing and dispatch", caption: "Orders prepared for delivery.", area: "dispatch", publicationStatus: "draft" },
  { id: "f6", title: "Office", caption: "Order coordination at Arambagh, Motijheel.", area: "exterior", publicationStatus: "draft" },
];

export const publishedFacilityImages = facilityShotList.filter(
  (f) => f.publicationStatus === "published" && f.image?.verified,
);
export const publishedMachines = machines.filter((m) => m.publicationStatus === "published");
export const publishedCertifications = certifications.filter((c) => c.publicationStatus === "published");
export const publishedSustainability = sustainabilityInitiatives.filter((s) => s.publicationStatus === "published");
export const publishedBuyers = buyers.filter((b) => b.publicationStatus === "published" && b.approvedForDisplay);
export const publishedTestimonials = testimonials.filter((t) => t.publicationStatus === "published" && t.approvedForDisplay);

/** What helps us quote quickly. None of it is required to start a conversation. */
export const orderChecklist = [
  "Product type, or a description of what it does on the garment",
  "Artwork or a reference, if you have one",
  "Size, material and colour requirements, if known",
  "Estimated quantity",
  "Delivery destination and the date you need it",
];
