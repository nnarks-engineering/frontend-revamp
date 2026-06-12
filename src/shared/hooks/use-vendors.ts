/**
 * Vendors hook — ready for backend integration.
 * Currently returns mock data; swap `queryFn` once the API is wired up.
 */

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { VendorItem, VendorServiceCategory } from "@/types/vendors";

// ── Query keys ──────────────────────────────────────────────────────

const VENDOR_KEYS = {
  all: ["vendors"] as const,
  list: (category?: VendorServiceCategory) =>
    ["vendors", "list", category ?? "ALL"] as const,
};

// ── Mock data (remove when API is ready) ────────────────────────────

const MOCK_VENDORS: VendorItem[] = [
  {
    id: "v-1",
    name: "BuildRight Construction",
    slug: "buildright-construction",
    logo_url: undefined,
    banner_url: undefined,
    description: "Premium construction services for residential and commercial projects. Specializing in sustainable building practices.",
    location: "Accra, Ghana",
    rating: 4.8,
    review_count: 124,
    services: [
      { id: "s-1", name: "General Construction", category: "CONSTRUCTION" },
      { id: "s-2", name: "Project Management", category: "PROJECT_MANAGEMENT" },
    ],
    is_verified: true,
    joined_at: "2025-03-15T10:00:00Z",
  },
  {
    id: "v-2",
    name: "ArcDesign Studios",
    slug: "arcdesign-studios",
    logo_url: undefined,
    banner_url: undefined,
    description: "Award-winning architecture firm delivering innovative designs for modern living and commercial spaces.",
    location: "Lagos, Nigeria",
    rating: 4.9,
    review_count: 89,
    services: [
      { id: "s-3", name: "Architectural Design", category: "ARCHITECTURE" },
      { id: "s-4", name: "Interior Design", category: "INTERIOR_DESIGN" },
    ],
    is_verified: true,
    joined_at: "2025-01-20T10:00:00Z",
  },
  {
    id: "v-3",
    name: "PowerGrid Electrical",
    slug: "powergrid-electrical",
    description: "Professional electrical installations, maintenance, and renewable energy solutions.",
    location: "Kumasi, Ghana",
    rating: 4.6,
    review_count: 67,
    services: [
      { id: "s-5", name: "Electrical Installation", category: "ELECTRICAL" },
      { id: "s-6", name: "Solar Panel Setup", category: "ELECTRICAL" },
    ],
    is_verified: false,
    joined_at: "2025-06-10T10:00:00Z",
  },
  {
    id: "v-4",
    name: "AquaFlow Plumbing",
    slug: "aquaflow-plumbing",
    description: "Expert plumbing services for new builds and renovations. 24/7 emergency support available.",
    location: "Nairobi, Kenya",
    rating: 4.5,
    review_count: 43,
    services: [
      { id: "s-7", name: "Commercial Plumbing", category: "PLUMBING" },
      { id: "s-8", name: "Residential Plumbing", category: "PLUMBING" },
    ],
    is_verified: true,
    joined_at: "2025-04-05T10:00:00Z",
  },
  {
    id: "v-5",
    name: "GreenScape Landscapes",
    slug: "greenscape-landscapes",
    description: "Transform your outdoor spaces with professional landscaping, garden design, and maintenance services.",
    location: "Cape Town, South Africa",
    rating: 4.7,
    review_count: 56,
    services: [
      { id: "s-9", name: "Landscape Design", category: "LANDSCAPING" },
      { id: "s-10", name: "Garden Maintenance", category: "LANDSCAPING" },
    ],
    is_verified: true,
    joined_at: "2025-02-28T10:00:00Z",
  },
  {
    id: "v-6",
    name: "TechForge Solutions",
    slug: "techforge-solutions",
    description: "Full-stack IT consulting, cloud infrastructure, and digital transformation services for enterprises.",
    location: "Accra, Ghana",
    rating: 4.9,
    review_count: 102,
    services: [
      { id: "s-11", name: "Cloud Infrastructure", category: "IT_SERVICES" },
      { id: "s-12", name: "Consulting", category: "CONSULTING" },
    ],
    is_verified: true,
    joined_at: "2025-05-01T10:00:00Z",
  },
  {
    id: "v-7",
    name: "Stellar Engineering",
    slug: "stellar-engineering",
    description: "Structural and civil engineering services with a focus on innovative, cost-effective designs.",
    location: "Abuja, Nigeria",
    rating: 4.4,
    review_count: 38,
    services: [
      { id: "s-13", name: "Civil Engineering", category: "ENGINEERING" },
      { id: "s-14", name: "Structural Analysis", category: "ENGINEERING" },
    ],
    is_verified: false,
    joined_at: "2025-07-12T10:00:00Z",
  },
  {
    id: "v-8",
    name: "SwiftLogix Transport",
    slug: "swiftlogix-transport",
    description: "Reliable logistics and transport solutions for construction materials and heavy equipment.",
    location: "Tema, Ghana",
    rating: 4.3,
    review_count: 29,
    services: [
      { id: "s-15", name: "Material Transport", category: "LOGISTICS" },
      { id: "s-16", name: "Equipment Rental", category: "LOGISTICS" },
    ],
    is_verified: true,
    joined_at: "2025-08-20T10:00:00Z",
  },
];

// ── Hook ─────────────────────────────────────────────────────────────

/**
 * Fetches vendors, optionally filtered by service category.
 * Replace the `queryFn` body with your actual API call.
 */
export function useVendors(
  category: VendorServiceCategory = "ALL",
  options?: Omit<UseQueryOptions<VendorItem[]>, "queryKey" | "queryFn">,
) {
  return useQuery<VendorItem[]>({
    queryKey: VENDOR_KEYS.list(category),
    queryFn: async () => {
      // TODO: Replace with real API call
      // return apiClient.get<VendorItem[]>(`/vendors`, { params: { category } });
      await new Promise((r) => setTimeout(r, 400)); // simulate network delay
      if (category === "ALL") return MOCK_VENDORS;
      return MOCK_VENDORS.filter((v) =>
        v.services.some((s) => s.category === category),
      );
    },
    ...options,
  });
}
