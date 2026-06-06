import { cn } from "@/shared/lib/utils";
import { FileText, Receipt, ScrollText, FileBarChart, FileSearch, Files } from "lucide-react";
import type { DocumentCategory } from "@/types/documents";

export interface CategoryFilterItem {
  id: DocumentCategory;
  label: string;
  icon: React.ElementType;
}

/** Default category list — extend as needed when the backend adds more. */
export const DOCUMENT_CATEGORIES: CategoryFilterItem[] = [
  { id: "ALL", label: "All Files", icon: Files },
  { id: "PAY_SLIP", label: "Pay Slips", icon: Receipt },
  { id: "CONTRACT", label: "Contracts", icon: ScrollText },
  { id: "EMPLOYMENT_LETTER", label: "Letters", icon: FileText },
  { id: "INVOICE", label: "Invoices", icon: FileBarChart },
  { id: "REPORT", label: "Reports", icon: FileSearch },
];

interface DocumentCategoryFilterProps {
  activeCategory: DocumentCategory;
  onCategoryChange: (category: DocumentCategory) => void;
  className?: string;
}

/**
 * Sidebar filter for document categories.
 * Renders vertically by default, can be styled horizontally with CSS.
 */
export function DocumentCategoryFilter({
  activeCategory,
  onCategoryChange,
  className,
}: DocumentCategoryFilterProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <h3 className="text-sm font-bold text-foreground px-3 py-2">File Type</h3>
      {DOCUMENT_CATEGORIES.map(({ id, label, icon: Icon }) => {
        const isActive = activeCategory === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onCategoryChange(id)}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            )}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
