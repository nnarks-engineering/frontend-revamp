import { useState, useMemo } from "react";

import { Upload } from "lucide-react";

import RoundingLine from "@/assets/svg/rounding-line2.svg?react";
import { DocumentCategoryFilter, DocumentList, DOCUMENT_CATEGORIES } from "@/components/app/documents";
import { Button } from "@/components/ui/button";
import {
  ModuleLayout,
  ModuleLayoutHeader,
  ModuleLayoutHeaderContent,
  ModuleLayoutTitle,
  ModuleLayoutDescription,

} from "@/components/ui/module-layout";
import { useDocuments } from "@/shared/hooks/project/use-documents";
import type { DocumentItem,DocumentCategory } from "@/types/document/document.types";

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

  const handleDownload = (_doc: DocumentItem) => {
    // TODO: Replace with actual download logic
    // window.open(_doc.url, "_blank");
    // console.log("Download:", _doc.name, _doc.url);
  };

  return (
    <div className="mx-auto h-full">
      <ModuleLayout className="h-full rounded-none">
        <div className="flex h-full overflow-hidden">

          {/* SIDEBAR */}
          <div className="w-full md:w-64 shrink-0 flex-col border-r border-border/60 bg-background/50 hidden md:flex">
            <ModuleLayoutHeader variant="primary" className="border-b border-border/60 p-6 pb-6 rounded-none relative overflow-hidden">
              <RoundingLine
                className="absolute -top-3 right-0 scale-x-[-1] text-primary/10 pointer-events-none"
                aria-hidden
              />
              <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
              <ModuleLayoutHeaderContent className="relative z-10">
                <ModuleLayoutTitle className="text-xl">Documents</ModuleLayoutTitle>
                <ModuleLayoutDescription>
                  Manage project files
                </ModuleLayoutDescription>
              </ModuleLayoutHeaderContent>
            </ModuleLayoutHeader>

            <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
              <DocumentCategoryFilter
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                className="flex-col"
              />
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="relative min-w-0 flex-1 flex flex-col overflow-hidden bg-background">
            <div className="px-4 md:px-6 py-4 border-b border-border/60 flex items-center justify-between bg-background z-10 shrink-0">
              <h2 className="text-lg font-bold text-foreground">{activeCategoryLabel}</h2>
              <Button variant="primary" size="sm" className="gap-2">
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Upload</span>
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {/* For mobile, show the filter here as well maybe? We can keep it simple for now and rely on desktop */}
              {/* Mobile filter (hidden on desktop) */}
              <div className="md:hidden border-b border-border/40 p-3 bg-muted/20 shrink-0">
                <DocumentCategoryFilter
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                  className="flex-row flex-wrap"
                />
              </div>

              {/* In DocumentList we don't need the internal title since we render it in the top bar */}
              <DocumentList
                documents={documents}
                isLoading={isLoading}
                onDownload={handleDownload}
                title="" // hide internal title
              />
            </div>
          </div>

        </div>
      </ModuleLayout>
    </div>
  );
}
