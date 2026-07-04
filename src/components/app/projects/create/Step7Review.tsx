import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ClipboardList, Edit, Loader2 } from "lucide-react";
import { useState } from "react";
import { CircleFlag } from "react-circle-flags";
import { toast } from "sonner";

import RoundingLine from "@/assets/svg/rounding-line2.svg?react";
import { DetailField } from "@/components/common/DetailField";
import { Button } from "@/components/ui/button";
import {
  ModuleLayout,
  ModuleLayoutDescription,
  ModuleLayoutHeader,
  ModuleLayoutHeaderActions,
  ModuleLayoutHeaderContent,
  ModuleLayoutTitle,
} from "@/components/ui/module-layout";
import { useCurrentCompany } from "@/shared/hooks/company/use-current-company";
import { useCreateProject } from "@/shared/hooks/project/use-projects";
import { cn } from "@/shared/lib/utils";


import { useCreateProjectForm } from "./CreateProjectContext";

export function Step7Review() {
  const { state, prevStep } = useCreateProjectForm();
  const { activeCompany, companies } = useCurrentCompany();
  const navigate = useNavigate();

  const createProject = useCreateProject();


  const [isSubmitting, setIsSubmitting] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);

const handleSubmit = async () => {
const validCompanyId = activeCompany?.id;

if (!validCompanyId) return toast.error("you are not a member of this organization");

  const startDateObj = new Date(state.startDate);
  const endDateObj = new Date(state.startDate);
  if (state.durationUnit === "days")
    endDateObj.setDate(startDateObj.getDate() + Number(state.estimatedDuration));
  else if (state.durationUnit === "weeks")
    endDateObj.setDate(startDateObj.getDate() + Number(state.estimatedDuration) * 7);
  else if (state.durationUnit === "months")
    endDateObj.setMonth(startDateObj.getMonth() + Number(state.estimatedDuration));

  const combinedDescription = [
    state.description,
    `Services Needed: ${state.servicesNeeded.join(", ")}`,
    `Additional Notes: ${state.additionalNotes}`,
    `Supervision Level: ${state.supervisionLevel}`,
    `Partner Setup: ${state.partnerSelection}`,
  ].join("\n");

const payload = {
  owner_company_id: validCompanyId,
  title: state.title,
  description: combinedDescription,
  industry: state.industry,
  preset: state.preset,
  supervision_level: state.supervisionLevel,
  location_address: state.location_address,           // ← object now
  location_coordinates: {                             // ← new field
    lat: state.location_coordinates.lat ?? 0,
    lng: state.location_coordinates.lng ?? 0,
  },
  start_date: startDateObj.toISOString().split("T")[0],
  end_date: endDateObj.toISOString().split("T")[0],
  total_budget: Number(state.totalBudget),
  // biome-ignore lint/suspicious/noExplicitAny: bypass router
  currency: (state.currency.toLowerCase() || "ghs") as any, // Cast to avoid TS error
};

  setIsSubmitting(true);

  try {
   await createProject.mutateAsync(payload);

setIsSuccess(true);
    // ... milestones, invites, setIsSuccess
  }
  catch {
  }
  finally {
    setIsSubmitting(false);
  }
};

  // ── Success screen ───────────────────────────────────────────────────────
  if (isSuccess) {
    return (
      <ModuleLayout className="w-full rounded-none">
        <ModuleLayoutHeader variant="primary" className="rounded-none">
          <RoundingLine
            className="absolute -top-3 right-0  scale-x-[-1] text-primary/10 pointer-events-none"
            aria-hidden
          />
          <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />

          <ModuleLayoutHeaderContent>
            <ModuleLayoutTitle>Project Created</ModuleLayoutTitle>
            <ModuleLayoutDescription>
              Your project is live — invite partners and fund milestones from
              your dashboard.
            </ModuleLayoutDescription>
          </ModuleLayoutHeaderContent>

          <ModuleLayoutHeaderActions>
            <Button
              variant="default"
              size="sm"
              className="gap-2"
              onClick={() => navigate({ to: "/projects", search: { tab: "active" } })}
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Button>
          </ModuleLayoutHeaderActions>
        </ModuleLayoutHeader>

        <div className="@sm:p-4 @md:p-6">
          <div className="flex flex-col items-center justify-center text-center py-12 gap-6 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-millik font-bold text-foreground">
                Your project has been created!
              </h2>
              <p className="text-muted-foreground max-w-sm text-sm">
                You can now invite partners and fund milestones from your
                dashboard.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button
                size="default"
                onClick={() =>
                  navigate({ to: "/projects", search: { tab: "active" } })
                }
                className="gap-2"
              >
                Go to Project Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="default" className="gap-2">
                <ClipboardList className="w-4 h-4" />
                Create Milestones
              </Button>
            </div>
          </div>
        </div>
      </ModuleLayout>
    );
  }

  // ── Review screen ────────────────────────────────────────────────────────
  return (
    <ModuleLayout className="w-full rounded-none @container">
      <ModuleLayoutHeader variant="primary" className="rounded-none">
        <RoundingLine
          className="absolute -top-3 right-0 scale-x-[-1] text-primary/10 pointer-events-none"
          aria-hidden
        />
        <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />

        <ModuleLayoutHeaderContent>
          <ModuleLayoutTitle>Review & Create Project</ModuleLayoutTitle>
          <ModuleLayoutDescription>
            Check your project details before we finalise setup.
          </ModuleLayoutDescription>
        </ModuleLayoutHeaderContent>

        <ModuleLayoutHeaderActions>
          <Button
            variant="outline"
            size="sm"
            onClick={prevStep}
            disabled={isSubmitting}
          >
            Edit Details
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating…
              </>
            ) : (
              "Create Project"
            )}
          </Button>
        </ModuleLayoutHeaderActions>
      </ModuleLayoutHeader>

      <div className=" pb-6  animate-in fade-in slide-in-from-bottom-2 duration-300">
        {/* ── Project Name & Location ── */}
        <ReviewSection title="Project Name & Location" goto={1}>
          <DetailField label="Project Title" value={state.title} />
          <DetailField label="Description" value={state.description} containerClassName="@md:col-span-2" />
        </ReviewSection>

        <ReviewSection title="Project Name & Location" goto={2}>
  <DetailField label="Project Title" value={state.title} />
  <DetailField label="Street" value={state.location_address.street_line_1} />
  <DetailField label="City" value={state.location_address.city} />
  <DetailField label="Region" value={state.location_address.region} />
  <DetailField label="Postal Code" value={state.location_address.postal_code} />
  <DetailField
    label="Country"
    value={
      state.country ? (
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center justify-center w-5 h-5 shrink-0 overflow-hidden rounded-full border border-border/50">
            <CircleFlag countryCode={state.location_address.country_code} height={20} />
          </div>
          <span>{state.country}</span>
        </div>
      ) : undefined
    }
  />
  <DetailField label="Description" value={state.description} containerClassName="md:col-span-2" />
</ReviewSection>

        {/* ── Category & Scope ── */}
        <ReviewSection title="Category & Scope"  goto={3}>
          <DetailField label="Project Preset" value={state.preset.replace(/_/g, " ")} className="capitalize" />
          <DetailField
            label="Additional Notes"
            value={state.additionalNotes}
            containerClassName="@md:col-span-2"
          />

         <DetailField
  label="Services Needed"
  containerClassName="@md:col-span-2"
  value={
    state.servicesNeeded.length > 0 ? (
      <div className="flex flex-wrap gap-2 mt-1">
        {state.servicesNeeded.map((s) => (
          <span
            key={s}
            style={{ filter: `hue-rotate(${s.length * 15}deg)` }}
            className="px-2.5 py-1 rounded-xs border border-primary! text-primary-fg-hover text-xs font-medium"
          >
            {s}
          </span>
        ))}
      </div>
    ) : undefined
  }
/>
        </ReviewSection>

        {/* ── Budget & Milestones ── */}
        <ReviewSection title="Budget & Milestones" goto={4}>
          <DetailField
            label="Total Budget"
            value={`${state.currency} ${state.totalBudget.toLocaleString()}`}
          />
          <DetailField
            label="Milestones"
            value={`${state.milestones.length} Defined`}
          />
        </ReviewSection>

        {/* ── Timeline & Supervision ── */}
        <ReviewSection title="Timeline & Supervision" goto={5}>
          <DetailField label="Start Date" value={state.startDate} />
          <DetailField
            label="Duration"
            value={`${state.estimatedDuration} ${state.durationUnit}`}
          />
          <DetailField
            label="Supervision"
            value={state.supervisionLevel.replace(/_/g, " ")}
            className="capitalize"
          />
        </ReviewSection>

        {/* ── Partners ── */}
        {state.partnerSelection !== "later" && (
          <ReviewSection title="Partners" goto={6}>
            <DetailField label="Partner Setup" value={state.partnerSelection} />
            
            {state.partnerSelection === "invite" && state.partnerEmails.length > 0 && (
              <DetailField
                label="Invited Emails"
                containerClassName="md:col-span-2"
                value={
                  <div className="flex flex-wrap gap-2 mt-1">
                    {state.partnerEmails.map((p) => (
                      <span
                        key={p.email}
                        className="px-2.5 py-1 rounded-md bg-muted text-xs font-medium"
                      >
                        {p.email}
                      </span>
                    ))}
                  </div>
                }
              />
            )}
            
            {state.partnerSelection === "verified" && state.partnerCompanies.length > 0 && (
              <DetailField
                label="Selected Companies"
                containerClassName="md:col-span-2"
                value={
                  <div className="flex flex-wrap gap-2 mt-1">
                    {state.partnerCompanies.map((c) => (
                      <span
                        key={c}
                        className="px-2.5 py-1 rounded-md bg-muted text-xs font-medium"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                }
              />
            )}
          </ReviewSection>
        )}

        {/* ── Bottom actions (mobile-friendly duplicate) ── */}
        <div className="p-2 flex justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={prevStep}
            disabled={isSubmitting}
            className="px-6"
          >
            Edit Details
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={isSubmitting|| !companies?.length}
            className="px-8 gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating Project…
              </>
            ) : (
              "Create Project"
            )}
          </Button>
          {companies?.length === 0 && (
            <p className="text-sm text-muted mt-2">You need to have at least one company to create a project.</p>
          )}
        </div>
      </div>
    </ModuleLayout>
  );
}

// ── Local layout helper ──────────────────────────────────────────────────────

function ReviewSection({
  className,
  title,
  children,
  goto,
}: {
readonly  className?: string;
readonly  title: string;
readonly  children: React.ReactNode;
readonly  goto?: number;
}) {

const { goToStep } = useCreateProjectForm();
  return (
    <div className={cn(" border first:border-t-0 border-border/60 bg-background overflow-hidden group relative", className)}>
      <div className="p-4 border-b border-border/50! bg-primary/5">
        <h3 className="text-primary-fg text-base font-millik">{title}</h3>
      </div>
      <div className="p-5 grid grid-cols-1  @md:grid-cols-2 @xl:grid-cols-3 gap-4 ">{children}</div>
      {goto !== undefined && (
          <button type="button" className="absolute top-6 right-2 flex items-center gap-1 text-xs group-hover:opacity-100 opacity-0 transition-opacity hover:text-primary-fg-hover" onClick={() => goToStep(goto)}>
            <Edit className="size-4" />
            Edit Section
          </button>
      )}
    </div>
  );
}
