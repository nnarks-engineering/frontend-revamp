// ── Shared helpers for the project detail page ────────────────────────────

export function formatCurrency(amount: number | string, currency = "GHS"): string {
  const n = Number(amount) || 0;
  return `${currency} ${n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    approved: "bg-emerald-500",
    in_progress: "bg-primary",
    under_review: "bg-amber-500",
    failed: "bg-destructive",
    skipped: "bg-muted-foreground",
  };
  return map[status] ?? "bg-border";
}
