import { cn } from "@/shared/lib/utils";

interface SearchHighlightProps {
  text: string;
  keyword: string;
  className?: string;
  highlightClassName?: string;
}

export function SearchHighlight({ text, keyword, className, highlightClassName }: SearchHighlightProps) {
  const tokens = keyword.trim().split(/\s+/).filter(Boolean);

  if (tokens.length === 0) {
    return <span className={className}>{text}</span>;
  }

  const escapedTokens = tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  // Match any of the tokens
  const regex = new RegExp(`(${escapedTokens.join('|')})`, "gi");
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className={cn("bg-primary/20 text-primary font-bold rounded-sm px-0.5", highlightClassName)}
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}
