import { Loader2 } from "lucide-react";

import { EmptyState } from "@/components/app/shared";
import type { DocumentItem } from "@/types/documents";

import { DocumentRow } from "./DocumentRow";

interface DocumentListProps {
  documents: DocumentItem[];
  isLoading?: boolean;
  onDownload?: (doc: DocumentItem) => void;
  title?: string;
}

/**
 * Renders a titled list of document rows with loading and empty states.
 * Fully reusable — pass any array of `DocumentItem[]`.
 */
export function DocumentList({ documents, isLoading, onDownload, title = "All Files" }: DocumentListProps) {
  return (
    <div className="flex-1 min-w-0">
      {/* Section title */}
      {title && (
        <div className="px-4 md:px-6 py-4 border-b border-border/40">
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : documents.length === 0 ? (
        <EmptyState
          title="No documents found"
          description="There are no files in this category yet."
          className="py-20"
        />
      ) : (
        <div className="flex flex-col">
          {documents.map((doc) => (
            <DocumentRow key={doc.id} document={doc} onDownload={onDownload} />
          ))}
        </div>
      )}
    </div>
  );
}
