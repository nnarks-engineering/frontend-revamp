export interface AdvisoryArticle {
  id: string;
  category: string;
  title: string;
  aiSummary: string;
  source: string;
  readTime: string;
  date: string;
}

export const MOCK_ARTICLES: AdvisoryArticle[] = [
  {
    id: "a1",
    category: "Fintech",
    title: "Ghana mobile money volumes rise 34% in Q4 2025",
    aiSummary:
      "Interoperability mandates between MoMo providers drove cross-network transactions to record highs. Key operators benefiting include MTN MoMo and Vodafone Cash, with combined throughput exceeding ₵48bn.",
    source: "Business & Financial Times",
    readTime: "3 min read",
    date: "Today",
  },
  {
    id: "a2",
    category: "Energy",
    title: "Nigeria approves 6 new solar micro-grid licenses",
    aiSummary:
      "The Rural Electrification Agency issued approvals covering an estimated 400,000 households across 3 states. Licensed operators include SolarAfrica and GreenGrid, targeting Q3 2026 deployment.",
    source: "Nairametrics",
    readTime: "4 min read",
    date: "Today",
  },
  {
    id: "a3",
    category: "Agriculture",
    title: "Kenya's agri-fintech sector secures $120M in Series B rounds",
    aiSummary:
      "Three Nairobi-based startups raised combined Series B funding for digital supply chain financing. The investment signals growing investor confidence in Africa's agricultural technology corridor.",
    source: "TechCabal",
    readTime: "5 min read",
    date: "Yesterday",
  },
  {
    id: "a4",
    category: "Infrastructure",
    title: "AfDB commits $2.3B to West African transport corridors",
    aiSummary:
      "The African Development Bank's latest infrastructure commitment targets rail and road connectivity between Lagos, Accra, and Abidjan. Construction phases begin mid-2026 with local contractor participation mandates.",
    source: "African Business",
    readTime: "6 min read",
    date: "Yesterday",
  },
];
