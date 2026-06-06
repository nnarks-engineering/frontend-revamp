import { useState, useMemo } from "react";
import { cn } from "@/shared/lib/utils";
import { useDocuments } from "@/shared/hooks/use-documents";
import { DocumentCategoryFilter, DocumentList, DOCUMENT_CATEGORIES } from "@/components/app/documents";
import {
  ModuleLayout,
  ModuleLayoutHeader,
  ModuleLayoutHeaderContent,
  ModuleLayoutTitle,
  ModuleLayoutDescription,
  ModuleLayoutHeaderActions,
} from "@/components/ui/module-layout";
import { Button } from "@/components/ui/button";
import RoundingLine from "@/assets/svg/rounding-line2.svg?react";
import { Upload } from "lucide-react";
import type { DocumentCategory, DocumentItem } from "@/types/documents";

/**
 * Documents page client — two-panel layout (sidebar filter + file list).
 * Fully responsive using container queries:
 *   - Small: filter pills on top, list below
 *   - Large: sidebar + list side-by-side
 */
export function DocumentsPageClient() {
  const [activeCategory, setActiveCategory] = useState<DocumentCategory>("ALL");
  const { data: documents = [], isLoading } = useDocuments(activeCategory);

  const activeCategoryLabel = useMemo(
    () => DOCUMENT_CATEGORIES.find((c) => c.id === activeCategory)?.label ?? "All Files",
    [activeCategory],
  );

  const handleDownload = (doc: DocumentItem) => {
    // TODO: Replace with actual download logic
    // window.open(doc.url, "_blank");
    console.log("Download:", doc.name, doc.url);
  };

  return (
    <div className="mx-auto p-4 @md:p-6 space-y-6 @container max-w-350">
      <ModuleLayout>
        <ModuleLayoutHeader variant="primary">
          <RoundingLine
            className="absolute -top-3 right-0 scale-x-[-1] text-primary/10 pointer-events-none"
            aria-hidden
          />
          <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
          <ModuleLayoutHeaderContent>
            <ModuleLayoutTitle>Documents</ModuleLayoutTitle>
            <ModuleLayoutDescription>
              View and manage all project documents, contracts, and files.
            </ModuleLayoutDescription>
          </ModuleLayoutHeaderContent>
          <ModuleLayoutHeaderActions>
            <Button variant="primary" size="sm" className="gap-2">
              <Upload className="w-4 h-4" />
              Upload File
            </Button>
          </ModuleLayoutHeaderActions>
        </ModuleLayoutHeader>

        <div className="flex flex-col @2xl:flex-row min-h-[400px]">
          {/* Category sidebar */}
          <aside className="shrink-0 @2xl:w-52 @2xl:border-r border-b @2xl:border-b-0 border-border/40 p-3 @2xl:py-4">
            <DocumentCategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              className="@2xl:flex-col flex-row flex-wrap @2xl:flex-nowrap"
            />
          </aside>

          {/* Document list */}
          <DocumentList
            documents={documents}
            isLoading={isLoading}
            onDownload={handleDownload}
            title={activeCategoryLabel}
          />
        </div>
      </ModuleLayout>
    </div>
  );
}
