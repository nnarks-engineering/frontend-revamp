export function getInitials(value?: string | null, maxChars = 2): string {
    if (!value) {
        return "??";
    }

    const trimmed = value.trim();
    if (!trimmed) {
        return "??";
    }

    const parts = trimmed.split(/\s+/).filter(Boolean);

    if (parts.length === 1) {
        return parts[0].slice(0, maxChars).toUpperCase();
    }

    return parts
        .map((part) => part[0] ?? "")
        .join("")
        .slice(0, maxChars)
        .toUpperCase();
}
