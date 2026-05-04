import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, FilterTabs } from "@/components/app/shared";
import { Button } from "@/components/ui/button";
import { MOCK_ARTICLES } from "@/data/mock/advisory";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/_app/advisory")({
  component: AdvisoryPage,
});

function AdvisoryPage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Fintech", "Agriculture", "Infrastructure", "Energy"];

  const filteredArticles = MOCK_ARTICLES.filter((a) => {
    if (filter === "All") return true;
    return a.category === filter;
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto px-6 py-8 animate-in fade-in duration-500">
      <PageHeader
        title="Advisory"
        subtitle="African Market Intelligence · Updated today"
      />

      <FilterTabs tabs={filters} active={filter} onTabChange={setFilter} className="mb-4" />

      <section className="flex flex-col gap-8">
        {filteredArticles.map((article) => (
          <article key={article.id} className="group flex flex-col gap-3">
            <span className="text-[13px] font-medium tracking-wider uppercase text-muted-foreground">
              [{article.category}]
            </span>
            <h2 className="text-[17px] font-semibold leading-tight text-foreground">
              {article.title}
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              <strong className="font-medium text-foreground">AI summary:</strong>{" "}
              {article.aiSummary}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[13px] text-muted-foreground">
                Source: {article.source} · {article.readTime}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Ask AI
              </Button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
