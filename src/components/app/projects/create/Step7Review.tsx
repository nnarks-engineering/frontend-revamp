import { useCreateProjectForm } from "./CreateProjectContext";
import { Button } from "@/components/ui/button";
import { useCreateProject } from "@/shared/hooks/use-projects";
import { useActiveCompany } from "@/shared/contexts/active-company-context";
import { useMyCompanies } from "@/shared/hooks/use-companies";
import { useState } from "react";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { DetailField } from "@/components/common/DetailField";

export function Step7Review() {
  const { state, prevStep } = useCreateProjectForm();
  const { activeCompanyId } = useActiveCompany();
  const { data: companies } = useMyCompanies();
  const navigate = useNavigate();

  const createProject = useCreateProject();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    const validCompanyId = activeCompanyId && companies?.some(c => c.id === activeCompanyId)
      ? activeCompanyId
      : companies?.[0]?.id;

    if (!validCompanyId) return;

    setIsSubmitting(true);

    try {
      const combinedLocation = [state.siteAddress, state.city, state.region, state.country]
        .filter(Boolean)
        .join(", ");

      const combinedDescription = `${state.description}

Services Needed: ${state.servicesNeeded.join(", ")}
Additional Notes: ${state.additionalNotes}
Supervision Required: ${state.supervisionRequired ? "Yes" : "No"}
Partner Setup: ${state.partnerSelection}`;

      const startDateObj = new Date(state.startDate);
      const endDateObj = new Date(state.startDate);
      if (state.durationUnit === "days") endDateObj.setDate(startDateObj.getDate() + Number(state.estimatedDuration));
      else if (state.durationUnit === "weeks") endDateObj.setDate(startDateObj.getDate() + Number(state.estimatedDuration) * 7);
      else if (state.durationUnit === "months") endDateObj.setMonth(startDateObj.getMonth() + Number(state.estimatedDuration));

      const newProject = await createProject.mutateAsync({
        owner_company_id: validCompanyId,
        title: state.title,
        description: combinedDescription,
        industry: state.projectType.toLowerCase() as any,
        project_type: state.isPartnered ? "partnered" : "individual",
        location_address: combinedLocation,
        start_date: startDateObj.toISOString().split("T")[0],
        end_date: endDateObj.toISOString().split("T")[0],
        total_budget: state.totalBudget,
        currency: state.currency,
      });

      if (state.milestones.length > 0) {
        const { createMilestone: rawCreateMilestone } = await import("@/shared/api/projects");
        for (let i = 0; i < state.milestones.length; i++) {
          const m = state.milestones[i];
          await rawCreateMilestone(newProject.id, {
            company_id: validCompanyId,
            title: m.title,
            description: m.description,
            position: i + 1,
            budget_amount: m.budget_amount,
            start_date: startDateObj.toISOString().split("T")[0],
            end_date: endDateObj.toISOString().split("T")[0],
          });
        }
      }

      if (state.partnerSelection === "invite" && state.partnerEmails.length > 0) {
        const { inviteMember: rawInviteMember } = await import("@/shared/api/projects");
        for (const p of state.partnerEmails) {
          if (p.email.trim()) {
            await rawInviteMember(newProject.id, { email: p.email });
          }
        }
      }

      setIsSuccess(true);
    } catch (error: any) {
      console.error("Failed to create project:", error?.response?.data ?? error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-8 animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center text-center py-10">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-millik font-bold text-foreground">
          Your project has been created!
        </h1>
        <p className="text-lg text-muted-foreground max-w-md">
          You can now invite partners and fund milestones from your dashboard.
        </p>
        <div className="pt-8 flex flex-col gap-4 w-full max-w-sm">
          <Button size="lg" onClick={() => navigate({ to: "/projects" })} className="w-full text-base h-14">
            Go to Project Dashboard <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <button className="hover:text-foreground transition-colors">Invite Partner</button>
            <span>|</span>
            <button className="hover:text-foreground transition-colors">Add Funds</button>
            <span>|</span>
            <button className="hover:text-foreground transition-colors">Create Milestones</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="space-y-2">
        <h1 className="text-3xl font-millik font-bold text-foreground">
          Review & Create Project
        </h1>
        <p className="text-muted-foreground">
          Check your project details before we finalize setup.
        </p>
      </div>

      <div className="space-y-6">

        {/* ── Project Name & Location ── */}
        <ReviewSection title="Project Name & Location">
          <DetailField label="Project Title" value={state.title} />
          <DetailField label="Site Address" value={state.siteAddress} />
          <DetailField label="City" value={state.city} />
          <DetailField label="Region" value={state.region} />
          <DetailField label="Country" value={state.country} />
        </ReviewSection>

        {/* ── Category & Scope ── */}
        <ReviewSection title="Category & Scope">
          <DetailField label="Project Type" value={state.projectType} />
          <DetailField
            label="Structure"
            value={state.isPartnered ? "Partnered Project" : "Solo Project"}
          />
          <DetailField label="Description" value={state.description} className="md:col-span-2" />
          <DetailField label="Additional Notes" value={state.additionalNotes} className="md:col-span-2" />
          <DetailField
            label="Services Needed"
            className="md:col-span-2"
            value={
              state.servicesNeeded.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {state.servicesNeeded.map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-md bg-muted text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              ) : undefined
            }
          />
        </ReviewSection>

        {/* ── Budget & Milestones ── */}
        <ReviewSection title="Budget & Milestones">
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
        <ReviewSection title="Timeline & Supervision">
          <DetailField
            label="Start Date"
            value={state.startDate}
          />
          <DetailField
            label="Duration"
            value={`${state.estimatedDuration} ${state.durationUnit}`}
          />
          <DetailField
            label="Supervision"
            value={state.supervisionRequired ? "Nnarks Certified Supervisor" : "None"}
          />
        </ReviewSection>

        {/* ── Partners ── */}
        {state.isPartnered && (
          <ReviewSection title="Partners">
            <DetailField
              label="Partner Setup"
              value={state.partnerSelection}
            />
            {state.partnerEmails.length > 0 && (
              <DetailField
                label="Invited Emails"
                className="md:col-span-2"
                value={
                  <div className="flex flex-wrap gap-2 mt-1">
                    {state.partnerEmails.map(p => (
                      <span key={p.email} className="px-2.5 py-1 rounded-md bg-muted text-xs font-medium">
                        {p.email}
                      </span>
                    ))}
                  </div>
                }
              />
            )}
          </ReviewSection>
        )}

      </div>

      <div className="pt-4 flex justify-between">
        <Button variant="outline" size="lg" onClick={prevStep} disabled={isSubmitting} className="px-6">
          Edit Details
        </Button>
        <Button size="lg" onClick={handleSubmit} disabled={isSubmitting} className="px-8">
          {isSubmitting ? (
            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Creating Project...</>
          ) : (
            "Create Project"
          )}
        </Button>
      </div>
    </div>
  );
}

// ── Local layout helper ──────────────────────────────────────────────────────

function ReviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-background overflow-hidden">
      <div className="p-4 border-b border-border/50 bg-muted/20">
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}
