import { useCreateProjectForm } from "./CreateProjectContext";
import { Button } from "@/components/ui/button";
import { useCreateMilestone, useCreateProject, useInviteMember } from "@/shared/hooks/use-projects";
import { useActiveCompany } from "@/shared/contexts/active-company-context";
import { useMyCompanies } from "@/shared/hooks/use-companies";
import { useState } from "react";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export function Step7Review() {
  const { state, prevStep } = useCreateProjectForm();
  const { activeCompanyId } = useActiveCompany();
  const { data: companies } = useMyCompanies();
  const navigate = useNavigate();

  const createProject = useCreateProject();
  const createMilestone = useCreateMilestone(""); // We will pass projectId later directly to mutationFn or handle it manually
  const inviteMember = useInviteMember("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    // Ensure we have a valid company ID. If activeCompanyId is from a previous session, fallback to the user's actual company
    const validCompanyId = activeCompanyId && companies?.some(c => c.id === activeCompanyId)
      ? activeCompanyId
      : companies?.[0]?.id;

    if (!validCompanyId) {
      console.error("No valid company found for this user!");
      // Could show a toast here
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Create Project
      // Mapping the state to the API payload
      const combinedLocation = [state.siteAddress, state.city, state.region, state.country]
        .filter(Boolean)
        .join(", ");

      const combinedDescription = `${state.description}

Services Needed: ${state.servicesNeeded.join(", ")}
Additional Notes: ${state.additionalNotes}
Supervision Required: ${state.supervisionRequired ? "Yes" : "No"}
Partner Setup: ${state.partnerSelection}`;

      // Calculate end date based on duration (simplified)
      const startDateObj = new Date(state.startDate);
      let endDateObj = new Date(state.startDate);
      if (state.durationUnit === "days") endDateObj.setDate(startDateObj.getDate() + Number(state.estimatedDuration));
      else if (state.durationUnit === "weeks") endDateObj.setDate(startDateObj.getDate() + Number(state.estimatedDuration) * 7);
      else if (state.durationUnit === "months") endDateObj.setMonth(startDateObj.getMonth() + Number(state.estimatedDuration));

      const projectPayload = {
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
      };

      const newProject = await createProject.mutateAsync(projectPayload);

      // 2. Add Milestones
      if (state.milestones.length > 0) {
        // Since useCreateMilestone takes projectId at hook level, we'll manually use the api directly 
        // or just rely on the fact that we can call mutationFn if we update it.
        // Actually, we can just import the raw API function, but since we are in a component,
        // let's just use the hook and override if possible. It's better to fetch from api directly if hook is scoped.
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

      // 3. Invite Partners
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
      console.error("Failed to create project:", error);
      if (error.response) {
        console.error("Backend error data:", error.response.data);
        console.error("Backend error status:", error.response.status);
      }
      // Handle error state (e.g. toast)
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-8 animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center text-center py-10">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
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
        <div className="rounded-xl border border-border/60 bg-background overflow-hidden">
          <div className="p-4 border-b border-border/50 bg-muted/20">
            <h3 className="font-semibold text-sm">Project Name & Location</h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Project Name</p>
              <p className="font-medium">{state.title}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Location</p>
              <p className="font-medium">{state.city}, {state.country}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border/60 bg-background overflow-hidden">
          <div className="p-4 border-b border-border/50 bg-muted/20">
            <h3 className="font-semibold text-sm">Category & Scope</h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Type</p>
              <p className="font-medium">{state.projectType || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Structure</p>
              <p className="font-medium">{state.isPartnered ? "Partnered Project" : "Solo Project"}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs text-muted-foreground mb-1">Services Needed</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {state.servicesNeeded.map(s => (
                  <span key={s} className="px-2.5 py-1 rounded-md bg-muted text-xs font-medium">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border/60 bg-background overflow-hidden">
          <div className="p-4 border-b border-border/50 bg-muted/20">
            <h3 className="font-semibold text-sm">Budget & Milestones</h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Budget</p>
              <p className="font-medium">{state.currency} {state.totalBudget.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Milestones</p>
              <p className="font-medium">{state.milestones.length} Defined</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border/60 bg-background overflow-hidden">
          <div className="p-4 border-b border-border/50 bg-muted/20">
            <h3 className="font-semibold text-sm">Timeline & Supervision</h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Duration</p>
              <p className="font-medium">{state.estimatedDuration} {state.durationUnit}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Supervision</p>
              <p className="font-medium">{state.supervisionRequired ? "Nnarks Certified Supervisor" : "None"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <Button variant="outline" size="lg" onClick={prevStep} disabled={isSubmitting} className="px-6">
          Edit Details
        </Button>
        <Button size="lg" onClick={handleSubmit} disabled={isSubmitting} className="px-8 bg-primary hover:bg-primary/90 text-white">
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Creating Project...
            </>
          ) : (
            "Create Project"
          )}
        </Button>
      </div>
    </div>
  );
}
