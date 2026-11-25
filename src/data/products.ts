import type { CategoryId, Product } from "./types";
import { categoryOrder } from "./categories";

/**
 * The single source of truth for the catalogue.
 *
 * - The 27 products below are the confirmed MM Printers inventory.
 * - Descriptions explain what each product type is and where it is used.
 *   They do NOT state materials, sizes, colours or options MM Printers has not confirmed.
 * - To add verified details, fill materials / colors / sizes / finishing / specifications.
 *   The product page renders a field only when it has a value.
 * - To add real photography, set `image` (and `gallery`) with `verified: true`.
 */
export const products: Product[] = [
  // ── Labels, printed products and tags ─────────────────────────────
  {
    id: "p01",
    slug: "photo-inlay",
    name: "Photo Inlay",
    category: "tags-cards-stickers",
    alsoIn: ["packaging"],
    shortDescription: "Printed insert card placed inside garment packaging.",
    description:
      "A printed card inserted into the pack to present the garment, its styling or brand imagery. Photo inlays are printed to the buyer's artwork and sized to the pack they go into.",
    art: "photo-inlay",
    applications: ["Folded shirt and knitwear packs", "Multipacks", "Retail presentation"],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "p02",
    slug: "photo-box",
    name: "Photo Box",
    category: "packaging",
    alsoIn: ["tags-cards-stickers"],
    shortDescription: "Printed retail box for presenting garments and accessories.",
    description:
      "A printed box used to package and present a garment or set at retail. Artwork, construction and dimensions are agreed with the buyer before production.",
    art: "photo-box",
    applications: ["Gift and premium packs", "Accessory sets", "Retail display"],
    publicationStatus: "published",
  },
  {
    id: "p03",
    slug: "hang-tag",
    name: "Hang Tag",
    category: "tags-cards-stickers",
    shortDescription: "Swing ticket that carries brand, price and product information.",
    description:
      "The printed ticket attached to a garment at the point of sale. Hang tags carry brand identity alongside the information buyers and retailers need, such as style, size and price fields.",
    art: "hang-tag",
    applications: ["Brand identity at retail", "Price and barcode information", "Product stories"],
    featured: true,
    publicationStatus: "published",
  },
  {
    id: "p04",
    slug: "sticker",
    name: "Sticker",
    category: "tags-cards-stickers",
    shortDescription: "Printed adhesive stickers for tags, packs and cartons.",
    description:
      "Adhesive stickers printed to the buyer's artwork, used on hang tags, polybags, boxes and cartons for size, branding or handling information.",
    art: "sticker",
    applications: ["Size and style marking", "Pack and carton labelling", "Brand seals"],
    publicationStatus: "published",
  },
  {
    id: "p05",
    slug: "heat-transfer-label",
    name: "Heat Transfer Label",
    category: "labels-heat-transfers",
    alsoIn: ["woven-printed-labels"],
    shortDescription: "Label applied to fabric with heat, for a tagless finish.",
    description:
      "A printed label transferred onto the garment with heat and pressure instead of being sewn in. Commonly used for neck branding, size and care information where a sewn label would be felt against the skin.",
    art: "heat-transfer",
    applications: ["Tagless neck labels", "Sportswear and activewear", "Size and care marking"],
    featured: true,
    publicationStatus: "published",
  },
  {
    id: "p06",
    slug: "photo-transfer-sticker",
    name: "Photo Transfer Sticker",
    category: "labels-heat-transfers",
    alsoIn: ["woven-printed-labels", "tags-cards-stickers"],
    shortDescription: "Image-quality transfer for graphics and branding on garments.",
    description:
      "A transfer that reproduces photographic or multi-colour artwork, applied to the garment surface. Suited to detailed graphics that would be difficult to reproduce by other decoration methods.",
    art: "photo-transfer",
    applications: ["Graphic placements", "Brand artwork", "Decorative details"],
    publicationStatus: "published",
  },
  {
    id: "p07",
    slug: "thermal-sticker",
    name: "Thermal Sticker",
    category: "tags-cards-stickers",
    shortDescription: "Thermal-printed sticker for barcodes and variable data.",
    description:
      "Sticker stock used with thermal printers to add barcodes, prices and other variable information to tags, packs and cartons.",
    art: "thermal-sticker",
    applications: ["Barcodes and SKUs", "Price stickers", "Carton marking"],
    publicationStatus: "published",
  },
  {
    id: "p08",
    slug: "back-board",
    name: "Back Board",
    category: "packaging",
    shortDescription: "Board that keeps folded garments flat and in shape.",
    description:
      "A board placed behind a folded garment, most often shirts, so the garment holds its fold and presents neatly in the pack.",
    art: "back-board",
    applications: ["Folded shirts", "Knitwear packs", "Retail-ready packing"],
    publicationStatus: "published",
  },
  {
    id: "p09",
    slug: "collar-band",
    name: "Collar Band",
    category: "packaging",
    shortDescription: "Band that holds a folded shirt collar in shape.",
    description:
      "A band fitted around the collar of a folded shirt to keep it upright and in shape through packing, shipping and display.",
    art: "collar-band",
    applications: ["Folded dress shirts", "Retail shirt packs"],
    publicationStatus: "published",
  },
  {
    id: "p10",
    slug: "care-label",
    name: "Care Label",
    category: "woven-printed-labels",
    shortDescription: "Sewn-in label carrying fibre content and care instructions.",
    description:
      "The label that tells the wearer how to wash and care for the garment and what it is made of. Content follows the buyer's approved text and symbols.",
    art: "care-label",
    applications: ["Fibre composition", "Care symbols", "Country of origin and style data"],
    featured: true,
    publicationStatus: "published",
  },
  {
    id: "p11",
    slug: "woven-label",
    name: "Woven Label",
    category: "woven-printed-labels",
    shortDescription: "Brand label woven with the design in the thread.",
    description:
      "A label where the logo and text are woven into the fabric of the label itself, giving a durable, textured brand mark for necks, hems and pockets.",
    art: "woven-label",
    applications: ["Main brand labels", "Size labels", "Hem and pocket flags"],
    featured: true,
    publicationStatus: "published",
  },
  {
    id: "p12",
    slug: "printed-taffeta-satin-label",
    name: "Printed Taffeta & Satin Label",
    originalName: "Printed Taffeta/Satin Label",
    category: "woven-printed-labels",
    shortDescription: "Printed label on taffeta or satin tape.",
    description:
      "A label printed onto taffeta or satin tape. Used for care information and for brand labels where a smooth, soft finish is preferred.",
    art: "satin-label",
    materials: ["Taffeta", "Satin"],
    applications: ["Care and content labels", "Soft brand labels", "Lingerie and nightwear"],
    publicationStatus: "published",
  },

  // ── Patches and decorative accessories ───────────────────────────
  {
    id: "p13",
    slug: "leather-patch",
    name: "Leather Patch",
    category: "patches-embellishments",
    shortDescription: "Leather badge for external branding.",
    description:
      "A leather patch carrying the brand mark, typically stitched to the waistband of denim or to bags and outerwear.",
    art: "leather-patch",
    materials: ["Leather"],
    applications: ["Denim waistbands", "Outerwear", "Bags and accessories"],
    featured: true,
    publicationStatus: "published",
  },
  {
    id: "p14",
    slug: "rubber-patch",
    name: "Rubber Patch",
    category: "patches-embellishments",
    shortDescription: "Moulded rubber badge with raised detail.",
    description:
      "A moulded rubber patch with raised logo detail, sewn or applied to garments where a durable, dimensional mark is wanted.",
    art: "rubber-patch",
    materials: ["Rubber"],
    applications: ["Sportswear", "Outerwear", "Caps and bags"],
    publicationStatus: "published",
  },
  {
    id: "p15",
    slug: "collar-traveler-butterfly",
    name: "Collar Traveler & Butterfly",
    originalName: "Collar Traveler & Butterfly",
    category: "packaging",
    alsoIn: ["other-accessories"],
    shortDescription: "Shirt-packing supports that hold the collar and fold.",
    description:
      "Supports used when packing shirts. The collar traveler keeps the collar shaped, and the butterfly holds the collar points and front placket neatly in the fold.",
    art: "butterfly",
    applications: ["Folded dress shirts", "Retail shirt packs"],
    publicationStatus: "published",
  },
  {
    id: "p16",
    slug: "string",
    name: "String",
    category: "other-accessories",
    alsoIn: ["tags-cards-stickers"],
    shortDescription: "String for attaching hang tags to garments.",
    description: "String used to attach hang tags and other tickets to the garment.",
    art: "string",
    applications: ["Hang tag attachment", "Swing ticket sets"],
    publicationStatus: "published",
  },
  {
    id: "p17",
    slug: "lace",
    name: "Lace",
    category: "lace-trims",
    shortDescription: "Decorative lace trim for edges and details.",
    description: "Lace trim used to finish hems, necklines and cuffs, or as a decorative detail on the garment.",
    art: "lace",
    applications: ["Hems and necklines", "Lingerie", "Decorative insets"],
    publicationStatus: "published",
  },

  // ── Buttons and fastening accessories ────────────────────────────
  {
    id: "p18",
    slug: "plastic-button",
    name: "Plastic Button",
    category: "buttons-fasteners",
    shortDescription: "Sew-through plastic buttons for everyday garments.",
    description: "Plastic buttons for shirts, knitwear, trousers and outerwear.",
    art: "plastic-button",
    materials: ["Plastic"],
    applications: ["Shirts", "Knitwear", "Trousers and outerwear"],
    featured: true,
    publicationStatus: "published",
  },
  {
    id: "p19",
    slug: "horn-button",
    name: "Horn Button",
    category: "buttons-fasteners",
    shortDescription: "Horn buttons with natural variation in colour and grain.",
    description: "Buttons made from horn, valued for the natural grain that makes every piece slightly different.",
    art: "horn-button",
    materials: ["Horn"],
    applications: ["Tailoring", "Coats and jackets", "Premium knitwear"],
    publicationStatus: "published",
  },
  {
    id: "p20",
    slug: "chalk-button",
    name: "Chalk Button",
    category: "buttons-fasteners",
    shortDescription: "Chalk buttons with a soft, matt finish.",
    description: "Chalk buttons, chosen for a soft, matt surface on shirts and casual garments.",
    art: "chalk-button",
    applications: ["Shirts", "Casualwear"],
    publicationStatus: "published",
  },
  {
    id: "p21",
    slug: "drawstring-draw-cord",
    name: "Drawstring & Draw Cord",
    originalName: "Drawstring & Draw Cord",
    category: "elastic-tapes-cords",
    shortDescription: "Cords for adjustable waistbands, hoods and hems.",
    description: "Drawstrings and draw cords threaded through waistbands, hoods and hems so the wearer can adjust the fit.",
    art: "drawcord",
    applications: ["Joggers and shorts", "Hoodies", "Outerwear hems"],
    featured: true,
    publicationStatus: "published",
  },
  {
    id: "p22",
    slug: "lock-pin-tag-pin",
    name: "Lock Pin & Tag Pin",
    originalName: "Lock Pin/Tag Pin",
    category: "buttons-fasteners",
    alsoIn: ["tags-cards-stickers"],
    shortDescription: "Pins for attaching tags securely to garments.",
    description: "Pins used to attach hang tags and tickets to the garment, typically applied with a tagging gun.",
    art: "tag-pin",
    applications: ["Hang tag attachment", "Ticket and label fixing"],
    publicationStatus: "published",
  },
  {
    id: "p23",
    slug: "lock-cord",
    name: "Lock Cord",
    category: "buttons-fasteners",
    alsoIn: ["tags-cards-stickers"],
    shortDescription: "Cord with a locking seal for attaching tags.",
    description: "A cord closed with a locking seal, used to attach hang tags so they stay with the garment until removed.",
    art: "lock-cord",
    applications: ["Hang tag attachment", "Tamper-evident tagging"],
    publicationStatus: "published",
  },

  // ── Elastic and other accessories ────────────────────────────────
  {
    id: "p24",
    slug: "jacquard-elastic",
    name: "Jacquard Elastic",
    category: "elastic-tapes-cords",
    shortDescription: "Elastic with a woven-in pattern or logo.",
    description: "Elastic with a pattern or logo woven into it, used for visible waistbands on underwear, sportswear and loungewear.",
    art: "jacquard-elastic",
    applications: ["Underwear waistbands", "Sportswear", "Loungewear"],
    featured: true,
    publicationStatus: "published",
  },
  {
    id: "p25",
    slug: "hole-elastic",
    name: "Hole Elastic",
    category: "elastic-tapes-cords",
    shortDescription: "Buttonhole elastic for adjustable waistbands.",
    description: "Elastic with a row of holes, fixed inside the waistband and fastened to a button to adjust the fit, often used in childrenswear and maternity wear.",
    art: "hole-elastic",
    applications: ["Adjustable waistbands", "Childrenswear", "Maternity wear"],
    publicationStatus: "published",
  },
  {
    id: "p26",
    slug: "mobilon-tape",
    name: "Mobilon Tape",
    category: "elastic-tapes-cords",
    shortDescription: "Clear elastic tape that stabilises seams.",
    description: "A clear, stretchy tape sewn into shoulder and neck seams of knitwear and jersey to stop them stretching out of shape.",
    art: "mobilon-tape",
    applications: ["Shoulder seams", "Necklines", "Knitwear and jersey"],
    publicationStatus: "published",
  },
  {
    id: "p27",
    slug: "poly-bag",
    name: "Poly Bag",
    category: "packaging",
    shortDescription: "Polythene bags for packing individual garments.",
    description: "Bags for packing garments individually, protecting them through shipping, storage and handling.",
    art: "poly-bag",
    applications: ["Individual garment packing", "Shipping protection", "Retail-ready packs"],
    featured: true,
    publicationStatus: "published",
  },

  // ── Proposed, NOT yet confirmed — never rendered ─────────────────
  ...(["Eyelets", "Interlining", "Thread", "Tissue Paper", "Boards & Paper Inserts", "Cartons", "Paper Boxes"].map(
    (name, i): Product => ({
      id: `pending-${i + 1}`,
      slug: name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      name,
      category: ["Eyelets", "Interlining", "Thread"].includes(name) ? "other-accessories" : "packaging",
      shortDescription: "",
      description: "",
      art: "generic",
      publicationStatus: "pending-confirmation",
    }),
  ) as Product[]),
];

/** Products visible on the public site. Use this everywhere — never `products` directly. */
/** Lead items within a category; anything not listed keeps its order after these. */
const leadWithinCategory = ["woven-label", "care-label", "hang-tag", "sticker", "thermal-sticker"];
const rank = (p: Product) => {
  const lead = leadWithinCategory.indexOf(p.slug);
  return (categoryOrder.get(p.category) ?? 99) * 100 + (lead === -1 ? 50 + products.indexOf(p) : lead);
};

/** Published products in catalogue order (by category, then lead items). */
export const publishedProducts = products
  .filter((p) => p.publicationStatus === "published")
  .sort((a, b) => rank(a) - rank(b));

/** Items that are ordered together in practice, shown first under "related products". */
const companions: Record<string, string[]> = {
  "hang-tag": ["string", "lock-pin-tag-pin", "sticker", "thermal-sticker"],
  "string": ["hang-tag", "lock-pin-tag-pin"],
  "lock-pin-tag-pin": ["hang-tag", "string", "lock-cord"],
  "woven-label": ["care-label", "printed-taffeta-satin-label", "heat-transfer-label"],
  "care-label": ["woven-label", "printed-taffeta-satin-label", "heat-transfer-label"],
  "printed-taffeta-satin-label": ["care-label", "woven-label", "heat-transfer-label"],
  "heat-transfer-label": ["care-label", "woven-label", "photo-transfer-sticker"],
  "poly-bag": ["back-board", "collar-band", "collar-traveler-butterfly"],
  "back-board": ["collar-band", "collar-traveler-butterfly", "poly-bag"],
  "collar-band": ["back-board", "collar-traveler-butterfly", "poly-bag"],
};

export function getProductBySlug(slug: string) {
  return publishedProducts.find((p) => p.slug === slug);
}

export function productInCategory(p: Product, category: CategoryId) {
  return p.category === category || (p.alsoIn?.includes(category) ?? false);
}

export function getRelatedProducts(p: Product, limit = 4) {
  const paired = (companions[p.slug] ?? [])
    .map((slug) => publishedProducts.find((o) => o.slug === slug))
    .filter((o): o is Product => !!o);
  const same = publishedProducts.filter((o) => o.id !== p.id && !paired.includes(o) && productInCategory(o, p.category));
  const filler = publishedProducts.filter((o) => o.id !== p.id && !paired.includes(o) && !same.includes(o) && o.featured);
  return [...paired, ...same, ...filler].slice(0, limit);
}

export function countInCategory(category: CategoryId) {
  return publishedProducts.filter((p) => productInCategory(p, category)).length;
}
