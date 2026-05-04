/**
 * Mock project data using backend-aligned types.
 * Replace these with API calls when integrating the backend.
 */
import type { ProjectDashboard } from "@/types/projects";

export const MOCK_PROJECTS: ProjectDashboard[] = [
  {
    id: "p-001",
    owner_id: "u-001",
    title: "Lagos Logistics",
    description:
      "Complete overhaul of the routing API and driver-facing mobile application assets. Phased deliverables over 2 months.",
    industry: "TECHNOLOGY",
    project_type: "PARTNERED",
    status: "ACTIVE",
    location_address: "Victoria Island, Lagos",
    location_lat: 6.4281,
    location_lng: 3.4219,
    start_date: "2026-02-10",
    end_date: "2026-04-10",
    total_budget: 4200,
    currency: "USD",
    wallet_id: "w-001",
    chat_session_id: "cs-001",
    members: [
      { id: "m-001", project_id: "p-001", user_id: "u-001", email: "john@nnarks.com", role: "OWNER", status: "ACTIVE" },
      { id: "m-002", project_id: "p-001", user_id: "u-002", email: "sola@design.co", role: "PARTNER", status: "ACTIVE" },
    ],
    milestones: [
      {
        id: "ms-001", project_id: "p-001", title: "Discovery", description: "Initial research and requirements gathering",
        order: 1, status: "APPROVED", budget_amount: 420, start_date: "2026-02-10", end_date: "2026-02-20",
        estimated_duration: 10, required_evidence_types: ["DOCUMENT"], created_by: "USER",
      },
      {
        id: "ms-002", project_id: "p-001", title: "Logo Design", description: "Brand identity and logo creation",
        order: 2, status: "UNDER_REVIEW", budget_amount: 840, start_date: "2026-02-21", end_date: "2026-03-06",
        estimated_duration: 14, required_evidence_types: ["IMAGE", "DOCUMENT"], created_by: "USER",
      },
      {
        id: "ms-003", project_id: "p-001", title: "App Assets", description: "All mobile application UI assets and icons",
        order: 3, status: "IN_PROGRESS", budget_amount: 1500, start_date: "2026-03-07", end_date: "2026-03-28",
        estimated_duration: 21, required_evidence_types: ["IMAGE"], created_by: "USER",
      },
      {
        id: "ms-004", project_id: "p-001", title: "Final Handoff", description: "Final delivery and asset transfer",
        order: 4, status: "PENDING", budget_amount: 1440, start_date: "2026-03-29", end_date: "2026-04-10",
        estimated_duration: 12, required_evidence_types: ["DOCUMENT"], created_by: "USER",
      },
    ],
    wallet: { id: "w-001", owner_id: "p-001", owner_type: "PROJECT", currency: "USD", available_balance: 840, locked_balance: 840 },
  },
  {
    id: "p-002",
    owner_id: "u-003",
    title: "API Integration",
    description: "RESTful API integration with third-party payment systems and automated reconciliation.",
    industry: "TECHNOLOGY",
    project_type: "PARTNERED",
    status: "ACTIVE",
    location_address: "East Legon, Accra",
    location_lat: 5.6354,
    location_lng: -0.1527,
    start_date: "2026-02-15",
    end_date: "2026-04-15",
    total_budget: 1800,
    currency: "USD",
    wallet_id: "w-002",
    chat_session_id: "cs-002",
    members: [
      { id: "m-003", project_id: "p-002", user_id: "u-003", email: "kwame@asante.dev", role: "OWNER", status: "ACTIVE" },
      { id: "m-004", project_id: "p-002", user_id: "u-001", email: "john@nnarks.com", role: "PARTNER", status: "ACTIVE" },
    ],
    milestones: [
      {
        id: "ms-005", project_id: "p-002", title: "Requirements", description: "API specification and documentation",
        order: 1, status: "APPROVED", budget_amount: 360, start_date: "2026-02-15", end_date: "2026-02-22",
        estimated_duration: 7, required_evidence_types: ["DOCUMENT"], created_by: "USER",
      },
      {
        id: "ms-006", project_id: "p-002", title: "Implementation", description: "Core API development and integration",
        order: 2, status: "IN_PROGRESS", budget_amount: 900, start_date: "2026-02-23", end_date: "2026-03-23",
        estimated_duration: 28, required_evidence_types: ["DOCUMENT"], created_by: "USER",
      },
      {
        id: "ms-007", project_id: "p-002", title: "Testing & Handoff", description: "QA testing and client handoff",
        order: 3, status: "PENDING", budget_amount: 540, start_date: "2026-03-24", end_date: "2026-04-15",
        estimated_duration: 22, required_evidence_types: ["DOCUMENT"], created_by: "USER",
      },
    ],
    wallet: { id: "w-002", owner_id: "p-002", owner_type: "PROJECT", currency: "USD", available_balance: 1800, locked_balance: 900 },
  },
  {
    id: "p-003",
    owner_id: "u-001",
    title: "Mobile App MVP",
    description: "Cross-platform mobile application for customer-facing escrow management and notifications.",
    industry: "TECHNOLOGY",
    project_type: "PARTNERED",
    status: "ACTIVE",
    location_address: "Osu, Accra",
    location_lat: 5.5560,
    location_lng: -0.1870,
    start_date: "2026-01-28",
    end_date: "2026-05-28",
    total_budget: 9500,
    currency: "USD",
    wallet_id: "w-003",
    chat_session_id: "cs-003",
    members: [
      { id: "m-005", project_id: "p-003", user_id: "u-001", email: "john@nnarks.com", role: "OWNER", status: "ACTIVE" },
      { id: "m-006", project_id: "p-003", user_id: "u-004", email: "ama@mensah.io", role: "PARTNER", status: "ACTIVE" },
      { id: "m-007", project_id: "p-003", user_id: "u-005", email: "team@devcraft.studio", role: "PARTNER", status: "ACTIVE" },
    ],
    milestones: [
      {
        id: "ms-008", project_id: "p-003", title: "Wireframes", description: "UX wireframes and user flow design",
        order: 1, status: "APPROVED", budget_amount: 1500, start_date: "2026-01-28", end_date: "2026-02-10",
        estimated_duration: 13, required_evidence_types: ["IMAGE", "DOCUMENT"], created_by: "USER",
      },
      {
        id: "ms-009", project_id: "p-003", title: "UI Development", description: "Frontend component development",
        order: 2, status: "IN_PROGRESS", budget_amount: 3000, start_date: "2026-02-11", end_date: "2026-03-25",
        estimated_duration: 42, required_evidence_types: ["IMAGE"], created_by: "USER",
      },
      {
        id: "ms-010", project_id: "p-003", title: "Backend Integration", description: "API integration and data flow",
        order: 3, status: "PENDING", budget_amount: 2500, start_date: "2026-03-26", end_date: "2026-04-28",
        estimated_duration: 33, required_evidence_types: ["DOCUMENT"], created_by: "USER",
      },
      {
        id: "ms-011", project_id: "p-003", title: "QA & Launch", description: "Quality assurance and production deployment",
        order: 4, status: "PENDING", budget_amount: 2500, start_date: "2026-04-29", end_date: "2026-05-28",
        estimated_duration: 29, required_evidence_types: ["DOCUMENT"], created_by: "AI",
      },
    ],
    wallet: { id: "w-003", owner_id: "p-003", owner_type: "PROJECT", currency: "USD", available_balance: 3000, locked_balance: 3000 },
  },
];
