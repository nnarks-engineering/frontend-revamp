import type { VendorServiceCategory } from "./vendor.enums";


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

export interface ServiceCategoryFilterItem {
  id: VendorServiceCategory;
  label: string;
  icon: React.ElementType;
}
