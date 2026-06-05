import type { HomeStat } from "@/types/home";

export const CLIENT_STATS: readonly HomeStat[] = [
    { id: "active", label: "Active Projects", value: "12" },
    { id: "pending", label: "Pending Verifications", value: "4" },
    { id: "messages", label: "Unread Messages", value: "18" },
    { id: "escrow", label: "Escrow Protected", value: "GHS 54k" },
] as const;

export const UPCOMING_DATES = [
    new Date(new Date().getFullYear(), new Date().getMonth(), 26).toISOString(),
    new Date(new Date().getFullYear(), new Date().getMonth(), 28).toISOString(),
] as const;
