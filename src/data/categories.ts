import type { Category, CategoryId } from "./types";

export const categories: Category[] = [
  {
    id: "woven-printed-labels",
    name: "Woven Labels & Printed Labels",
    summary: "Brand, size and care labels sewn into the garment.",
  },
  {
    id: "labels-heat-transfers",
    name: "Labels & Heat Transfers",
    summary: "Transfers applied directly to fabric, for tagless branding and garment information.",
  },
  {
    id: "tags-cards-stickers",
    name: "Hang Tags, Photo Cards & Stickers",
    summary: "Printed swing tickets, inserts and stickers that carry the brand to the shelf.",
  },
  {
    id: "patches-embellishments",
    name: "Patches & Embellishments",
    summary: "Leather and rubber patches for branding on the outside of the garment.",
  },
  {
    id: "buttons-fasteners",
    name: "Buttons & Fasteners",
    summary: "Buttons, tag pins and lock cords for closing and tagging garments.",
  },
  {
    id: "elastic-tapes-cords",
    name: "Elastic, Tapes & Drawcords",
    summary: "Elastics, stabilising tape and drawcords for waistbands, hoods and seams.",
  },
  {
    id: "lace-trims",
    name: "Lace & Decorative Trims",
    summary: "Lace and decorative trims for finishing edges and details.",
  },
  {
    id: "packaging",
    name: "Packaging Products",
    summary: "Boards, collar bands, boxes and bags for folding, presenting and shipping.",
  },
  {
    id: "other-accessories",
    name: "Other Garment Accessories",
    summary: "Supporting accessories used across finishing and tagging.",
  },
];

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<
  CategoryId,
  Category
>;

export function isCategoryId(value: string | null | undefined): value is CategoryId {
  return !!value && value in categoryById;
}

/**
 * Six groupings featured on the home page, each linked to a catalogue filter. Names and counts
 * come from the canonical categories so the tile and the filter it opens always agree.
 */
const homeTileArt: [CategoryId, import("./types").ArtKind][] = [
  ["woven-printed-labels", "satin-label"],
  ["tags-cards-stickers", "hang-tag"],
  ["patches-embellishments", "leather-patch"],
  ["buttons-fasteners", "horn-button"],
  ["elastic-tapes-cords", "jacquard-elastic"],
  ["packaging", "poly-bag"],
];
export const homeCategoryTiles = homeTileArt.map(([category, art]) => ({
  label: categoryById[category].name,
  category,
  art,
}));

/** Catalogue order of categories: labels and tags first, the core of a trims range. */
export const categoryOrder = new Map(categories.map((c, i) => [c.id, i]));
