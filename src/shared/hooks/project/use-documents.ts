/**
 * Documents hook — ready for backend integration.
 * Currently returns mock data; swap `queryFn` once the API is wired up.
 */

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { DocumentItem,DocumentCategory } from "@/types/document/document.types";

// ── Query keys ──────────────────────────────────────────────────────

const DOCUMENT_KEYS = {
  all: ["documents"] as const,
  list: (category?: DocumentCategory) =>
    ["documents", "list", category ?? "ALL"] as const,
};

// ── Mock data (remove when API is ready) ────────────────────────────

const MOCK_DOCUMENTS: DocumentItem[] = [
  {
    id: "doc-1",
    name: "Employment Letter",
    file_type: "PDF",
    category: "EMPLOYMENT_LETTER",
    size_bytes: 20_971_520,
    url: "#",
    uploaded_by: "admin@nnarks.com",
    uploaded_at: "2026-01-09T10:00:00Z",
  },
  {
    id: "doc-2",
    name: "AUP",
    file_type: "PDF",
    category: "OTHER",
    size_bytes: 20_971_520,
    url: "#",
    uploaded_by: "admin@nnarks.com",
    uploaded_at: "2026-01-10T10:00:00Z",
  },
  {
    id: "doc-3",
    name: "Personal Commitment",
    file_type: "PDF",
    category: "CONTRACT",
    size_bytes: 20_971_520,
    url: "#",
    uploaded_by: "admin@nnarks.com",
    uploaded_at: "2026-01-11T10:00:00Z",
  },
  {
    id: "doc-4",
    name: "Salary Review",
    file_type: "PDF",
    category: "PAY_SLIP",
    size_bytes: 20_971_520,
    url: "#",
    uploaded_by: "admin@nnarks.com",
    uploaded_at: "2026-01-12T10:00:00Z",
  },
  {
    id: "doc-5",
    name: "Contract",
    file_type: "PDF",
    category: "CONTRACT",
    size_bytes: 20_971_520,
    url: "#",
    uploaded_by: "admin@nnarks.com",
    uploaded_at: "2026-01-13T10:00:00Z",
  },
  {
    id: "doc-6",
    name: "Employment Letter",
    file_type: "PDF",
    category: "EMPLOYMENT_LETTER",
    size_bytes: 20_971_520,
    url: "#",
    uploaded_by: "admin@nnarks.com",
    uploaded_at: "2026-01-14T10:00:00Z",
  },
  {
    id: "doc-7",
    name: "Salary Review",
    file_type: "PDF",
    category: "PAY_SLIP",
    size_bytes: 20_971_520,
    url: "#",
    uploaded_by: "admin@nnarks.com",
    uploaded_at: "2026-01-15T10:00:00Z",
  },
  {
    id: "doc-8",
    name: "Personal Commitment",
    file_type: "PDF",
    category: "CONTRACT",
    size_bytes: 20_971_520,
    url: "#",
    uploaded_by: "admin@nnarks.com",
    uploaded_at: "2026-01-16T10:00:00Z",
  },
  {
    id: "doc-9",
    name: "Contract",
    file_type: "PDF",
    category: "CONTRACT",
    size_bytes: 20_971_520,
    url: "#",
    uploaded_by: "admin@nnarks.com",
    uploaded_at: "2026-01-17T10:00:00Z",
  },
  {
    id: "doc-10",
    name: "Monthly Invoice",
    file_type: "PDF",
    category: "INVOICE",
    size_bytes: 15_728_640,
    url: "#",
    uploaded_by: "admin@nnarks.com",
    uploaded_at: "2026-01-18T10:00:00Z",
  },
];

// ── Hook ─────────────────────────────────────────────────────────────

/**
 * Fetches documents, optionally filtered by category.
 * Replace the `queryFn` body with your actual API call:
 *   queryFn: () => apiClient.get<DocumentItem[]>(`/documents?category=${category}`)
 */
export function useDocuments(
  category: DocumentCategory = "ALL",
  options?: Omit<UseQueryOptions<DocumentItem[]>, "queryKey" | "queryFn">,
) {
  return useQuery<DocumentItem[]>({
    queryKey: DOCUMENT_KEYS.list(category),
    queryFn: async () => {
      // TODO: Replace with real API call
      // return apiClient.get<DocumentItem[]>(`/documents`, { params: { category } });
      await new Promise((r) => setTimeout(r, 400)); // simulate network delay
      if (category === "ALL") return MOCK_DOCUMENTS;
      return MOCK_DOCUMENTS.filter((d) => d.category === category);
    },
    ...options,
  });
}
