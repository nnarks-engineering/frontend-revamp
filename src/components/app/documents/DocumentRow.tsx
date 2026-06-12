import { Download } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import type { DocumentItem } from "@/types/document/document.types";

import { DocumentFileIcon } from "./DocumentFileIcon";


/**
 * Formats bytes into a human-readable size string (KB, MB, GB).
 */
function formatFileSize(bytes: number): string {
  if (bytes >= 1_073_741_824) return `${(bytes / 1_073_741_824).toFixed(1)} GB`;
  if (bytes >= 1_048_576) return `${(bytes / 1_048_576).toFixed(0)} MB`;
  if (bytes >= 1_024) return `${(bytes / 1_024).toFixed(0)} KB`;
  return `${bytes} B`;
}

interface DocumentRowProps {
  document: DocumentItem;
  onDownload?: (doc: DocumentItem) => void;
  className?: string;
}

/**
 * A single document row — displays the file icon, name, meta info, and a download action.
 * Fully reusable and backend-ready; accepts a `DocumentItem` object.
 */
export function DocumentRow({ document: doc, onDownload, className }: DocumentRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 md:px-6 py-3 transition-colors hover:bg-muted/30 border-b border-border/40 last:border-0",
        className,
      )}
    >
      {/* File icon */}
      <DocumentFileIcon fileType={doc.file_type} />

      {/* Name + meta */}
      <div className="min-w-0 flex-1">
        <p className="text-sm text-foreground truncate">{doc.name}</p>
        <p className="text-xs text-muted-foreground ">
          {formatFileSize(doc.size_bytes)} • {doc.file_type}
        </p>
      </div>

      {/* Download action */}
      <button
        type="button"
        onClick={() => onDownload?.(doc)}
        className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-foreground rounded-lg bg-muted/40 hover:bg-muted transition-colors"
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Download</span>
      </button>
    </div>
  );
}
