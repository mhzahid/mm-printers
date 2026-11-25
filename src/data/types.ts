/**
 * Content types for MM Printers.
 *
 * Every optional field is rendered ONLY when it holds verified information.
 * Leave a field undefined rather than filling it with a guess.
 */

export type PublicationStatus =
  /** Confirmed by MM Printers and visible on the site. */
  | "published"
  /** Proposed, but the company has not confirmed it supplies this. Never rendered. */
  | "pending-confirmation"
  /** Work in progress. Never rendered. */
  | "draft";

export type CategoryId =
  | "labels-heat-transfers"
  | "tags-cards-stickers"
  | "woven-printed-labels"
  | "patches-embellishments"
  | "buttons-fasteners"
  | "elastic-tapes-cords"
  | "lace-trims"
  | "packaging"
  | "other-accessories";

export interface Category {
  id: CategoryId;
  name: string;
  /** Short line used on category tiles and filter headers. */
  summary: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** true = real MM Printers photography approved for publication. */
  verified: boolean;
  credit?: string;
}

/** Illustration used until real product photography is supplied. */
export type ArtKind =
  | "photo-inlay"
  | "photo-box"
  | "hang-tag"
  | "sticker"
  | "heat-transfer"
  | "photo-transfer"
  | "thermal-sticker"
  | "back-board"
  | "collar-band"
  | "care-label"
  | "woven-label"
  | "satin-label"
  | "leather-patch"
  | "rubber-patch"
  | "butterfly"
  | "string"
  | "lace"
  | "plastic-button"
  | "horn-button"
  | "chalk-button"
  | "drawcord"
  | "tag-pin"
  | "lock-cord"
  | "jacquard-elastic"
  | "hole-elastic"
  | "mobilon-tape"
  | "poly-bag"
  | "generic";

export interface SpecRow {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** The company's original term, if the display name was adjusted for readability. */
  originalName?: string;
  category: CategoryId;
  /** Extra filters this product should also appear under (no duplicate records). */
  alsoIn?: CategoryId[];
  shortDescription: string;
  description: string;
  art: ArtKind;
  image?: ImageAsset;
  gallery?: ImageAsset[];
  materials?: string[];
  variations?: string[];
  colors?: string[];
  sizes?: string[];
  finishing?: string[];
  applications?: string[];
  packaging?: string;
  specifications?: SpecRow[];
  featured?: boolean;
  publicationStatus: PublicationStatus;
}

export interface FacilityImage {
  id: string;
  title: string;
  caption: string;
  area: "exterior" | "production" | "machinery" | "workstation" | "finishing" | "dispatch";
  image?: ImageAsset;
  publicationStatus: PublicationStatus;
}

export interface Machine {
  id: string;
  name: string;
  function: string;
  productTypes: string[];
  capabilities?: SpecRow[];
  image?: ImageAsset;
  publicationStatus: PublicationStatus;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  validFrom?: string;
  validTo?: string;
  appliesTo: string;
  document?: ImageAsset;
  publicationStatus: PublicationStatus;
}

export interface BuyerRelationship {
  id: string;
  name: string;
  relationship: "customer" | "partner" | "buying-house";
  logo?: ImageAsset;
  /** Written permission to display name/logo has been received. */
  approvedForDisplay: boolean;
  publicationStatus: PublicationStatus;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  approvedForDisplay: boolean;
  publicationStatus: PublicationStatus;
}

export interface SustainabilityInitiative {
  id: string;
  title: string;
  description: string;
  evidence: string;
  publicationStatus: PublicationStatus;
}
