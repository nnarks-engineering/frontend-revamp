import type { HomeStat } from "@/types/home";

export const CLIENT_STATS: readonly HomeStat[] = [
    { id: "active_projects", label: "Active Projects", value: "8" },
    { id: "pending_approvals", label: "Pending Approvals", value: "3" },
    { id: "escrow_balance", label: "Escrow Balance", value: "GHS 42,500" },
    { id: "disbursed_funds", label: "Funds Disbursed", value: "GHS 15,200" },
    { id: "active_disputes", label: "Active Disputes", value: "1" },
    { id: "completed_projects", label: "Completed Projects", value: "24" },
] as const;

export const UPCOMING_DATES = [
    new Date(new Date().getFullYear(), new Date().getMonth(), 26).toISOString(),
    new Date(new Date().getFullYear(), new Date().getMonth(), 28).toISOString(),
] as const;
