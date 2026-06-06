import { useCreateProjectForm, type FormPartner } from "./CreateProjectContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, ShieldCheck, Mail, Clock } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { ProjectTypeButton } from "./step3category/ProjectTypeButton";

export function Step5Partners() {
  const { state, updateState, nextStep, prevStep } = useCreateProjectForm();

  // If "invite", ensure at least one email is provided
  const isPartnerValid =
    state.partnerSelection !== "invite" ||
    (state.partnerEmails.length > 0 && state.partnerEmails.every((p) => p.email.trim() !== ""));

  const isFormValid = isPartnerValid;

  const addPartner = () => {
    const newPartner: FormPartner = {
      id: crypto.randomUUID(),
      email: "",
    };
    updateState({ partnerEmails: [...state.partnerEmails, newPartner] });
  };

  const updatePartner = (id: string, email: string) => {
    updateState({
      partnerEmails: state.partnerEmails.map((p) => (p.id === id ? { ...p, email } : p)),
    });
  };

  const removePartner = (id: string) => {
    updateState({
      partnerEmails: state.partnerEmails.filter((p) => p.id !== id),
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="space-y-2">
        <h1 className="text-3xl font-millik font-bold text-foreground">
          Partner & Supervision
        </h1>
        <p className="text-muted-foreground">
          How do you want to work with partners?
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <ProjectTypeButton
            onClick={() => updateState({ partnerSelection: "invite" })}
            selected={state.partnerSelection === "invite"}
            title="Invite my own supervisor"
            iconClassName={cn(
              "w-16 p-4 items-center justify-center mb-3",
              state.partnerSelection === "invite" ? "text-primary" : "text-muted-foreground"
            )}
            icon={Mail}
          />

          <ProjectTypeButton
            onClick={() => updateState({ partnerSelection: "later" })}
            selected={state.partnerSelection === "later"}
            title="Decide later"
            iconClassName={cn(
              "w-16 p-4 items-center justify-center mb-3",
              state.partnerSelection === "later" ? "text-primary" : "text-muted-foreground"
            )}
            icon={Clock}
          />

          <ProjectTypeButton
            onClick={() => updateState({ partnerSelection: "verified" })}
            selected={state.partnerSelection === "verified"}
            title="Verified Nnarks partner"
            iconClassName={cn(
              "w-16 p-4 items-center justify-center mb-3",
              state.partnerSelection === "verified" ? "text-primary" : "text-muted-foreground"
            )}
            icon={ShieldCheck}
          />

        </div>

        {state.partnerSelection === "invite" && (
          <div className="p-5 rounded-xl border border-border/60 bg-muted/20 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-foreground">
                Partner Email Addresses
              </label>
              <Button onClick={addPartner} variant="outline" size="sm" className="gap-2">
                <Plus className="w-4 h-4" /> Add Another
              </Button>
            </div>
            {state.partnerEmails.length === 0 && (
              <p className="text-sm text-muted-foreground italic">Click "Add Another" to invite a partner.</p>
            )}
            {state.partnerEmails.map((partner, index) => (
              <div key={partner.id} className="flex gap-3">
                <Input
                  type="email"
                  placeholder={`Partner ${index + 1} Email`}
                  value={partner.email}
                  onChange={(e) => updatePartner(partner.id, e.target.value)}
                  className="bg-background"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removePartner(partner.id)}
                  className="text-muted-foreground hover:text-destructive shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <p className="text-xs text-muted-foreground">
              NB: Partner would have to agree to partnership terms and conditions.
            </p>
          </div>
        )}

        <div className="pt-6 border-t border-border/50 space-y-4">
          <h3 className="text-lg font-bold text-foreground">Project supervision</h3>

          <label className={cn(
            "flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-all",
            state.supervisionRequired ? "border-primary bg-primary/5" : "border-border/60 hover:border-border bg-background"
          )}>
            <div className="flex h-5 items-center">
              <input
                type="checkbox"
                checked={state.supervisionRequired}
                onChange={(e) => updateState({ supervisionRequired: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground text-sm">Assign Nnarks-certified supervisor</span>
              <span className="text-sm text-muted-foreground mt-0.5">
                Supervision increases execution, progress and trust.
              </span>
            </div>
          </label>
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <Button variant="outline" size="lg" onClick={prevStep} className="px-6">
          Back
        </Button>
        <Button size="lg" disabled={!isFormValid} onClick={nextStep} className="px-8">
          Next Step
        </Button>
      </div>
    </div>
  );
}
