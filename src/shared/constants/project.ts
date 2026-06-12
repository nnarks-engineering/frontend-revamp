import type { Industry } from "@/types/projects";

 const INDUSTRY_OPTIONS: { value: Industry; label: string }[] = [
  { value: "construction", label: "Construction & Real Estate" },
  { value: "agriculture", label: "Agriculture & Agribusiness" },
  { value: "manufacturing", label: "Manufacturing & Fabrication" },
  { value: "retail", label: "Fashion & Apparel" },
  { value: "education", label: "Education & Training" },
  { value: "technology", label: "ICT & Technology" },
  { value: "healthcare", label: "Healthcare & Medical" },
  { value: "other", label: "Other Services" },
];


 const SERVICE_OPTIONS = [
  { value: "construction", label: "Construction / Execution" },
  { value: "supply", label: "Supply of materials" },
  { value: "equipment", label: "Equipment / machinery" },
  { value: "consulting", label: "Consulting / advisory" },
];

export { INDUSTRY_OPTIONS, SERVICE_OPTIONS };
