import { useQuery } from "@tanstack/react-query";

// Mock data for companies
const MOCK_COMPANIES = [
  { id: "1", name: "Acme Corp", email: "contact@acmecorp.com", services: ["technology", "construction"] },
  { id: "2", name: "Global Build", email: "hello@globalbuild.com", services: ["construction", "manufacturing"] },
  { id: "3", name: "Tech Solutions", email: "info@techsolutions.com", services: ["technology"] },
  { id: "4", name: "Health Partners", email: "support@healthpartners.com", services: ["healthcare"] },
];

// Mock API call
async function searchCompanies(query: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  if (!query) return MOCK_COMPANIES;
  
  const lowerQuery = query.toLowerCase();
  return MOCK_COMPANIES.filter(
    (c) => c.name.toLowerCase().includes(lowerQuery) || c.email.toLowerCase().includes(lowerQuery)
  );
}

export function useSearchCompanies(query: string) {
  return useQuery({
    queryKey: ["companies", "search", query],
    queryFn: () => searchCompanies(query),
    staleTime: 1000 * 60, // 1 minute
  });
}
