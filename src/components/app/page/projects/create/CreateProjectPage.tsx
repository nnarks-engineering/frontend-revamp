import { PageHeader } from "@/components/app/shared";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export function CreateProjectPage() {
  const navigate = useNavigate({ from: "/projects/create" });

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <PageHeader
        title="Create Project"
        subtitle="Project creation will live on this dedicated page and will use the backend creation payload."
      />

      <div className="rounded-xl border border-border/40 bg-background p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Creation form wiring is next. The projects list is already connected to backend payloads and the create action now routes here.
        </p>

        <Button
          variant="outline"
          className="mt-6"
          onClick={() => navigate({ to: "/projects", search: { tab: "active" } }).catch(() => {})}
        >
          Back to Projects
        </Button>
      </div>
    </div>
  );
}
