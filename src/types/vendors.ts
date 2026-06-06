/**
 * Vendor types — mirrors expected backend VendorRead schemas.
 * Ready for backend integration when the API is available.
 */

/** Service category a vendor can offer. */
export type VendorServiceCategory =
  | "ALL"
  | "CONSTRUCTION"
  | "ENGINEERING"
  | "ARCHITECTURE"
  | "PLUMBING"
  | "ELECTRICAL"
  | "INTERIOR_DESIGN"
  | "LANDSCAPING"
  | "PROJECT_MANAGEMENT"
  | "CONSULTING"
  | "IT_SERVICES"
  | "LOGISTICS"
  | "OTHER";

/** A single service offered by a vendor. */
export interface VendorService {
  id: string;
  name: string;
  category: VendorServiceCategory;
}

/** A vendor record from the API. */
export interface VendorItem {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  banner_url?: string;
  description: string;
  location?: string;
  rating: number;
  review_count: number;
  services: VendorService[];
  is_verified: boolean;
  joined_at: string;
}
