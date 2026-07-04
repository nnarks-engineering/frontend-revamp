import { Clock, Mail, Plus, ShieldCheck, Trash2, Building2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Combobox } from "@/components/ui/combobox";
import { cn } from "@/shared/lib/utils";
import type { FormPartner } from "@/types/projects";
import { SupervisionLevel } from "@/types/projects";
import { useSearchCompanies } from "@/shared/hooks/companies/use-companies";

import { useCreateProjectForm } from "./CreateProjectContext";
import { ProjectTypeButton } from "./step3category/ProjectTypeButton";

const SUPERVISION_OPTIONS = [
  { value: SupervisionLevel.unsupervised, label: "Unsupervised" },
  { value: SupervisionLevel.basic, label: "Basic Supervision" },
  { value: SupervisionLevel.enhanced, label: "Enhanced Supervision" },
  { value: SupervisionLevel.full, label: "Full Supervision" },
];

export function Step5Partners() {
  const { state, updateState, nextStep, prevStep } = useCreateProjectForm();
  
  const [searchQuery, setSearchQuery] = useState("");
  const { data: companies = [], isLoading } = useSearchCompanies(searchQuery);

  const companyOptions = companies.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const isPartnerValid =
    state.partnerSelection === "later" ||
    (state.partnerSelection === "invite" && state.partnerEmails.length > 0 && state.partnerEmails.every((p) => p.email.trim() !== "")) ||
    (state.partnerSelection === "verified" && state.partnerCompanies.length > 0);

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

  const handleCompanySelect = (companyId: string) => {
    if (companyId && !state.partnerCompanies.includes(companyId)) {
      updateState({ partnerCompanies: [...state.partnerCompanies, companyId] });
    }
  };

  const removeCompany = (id: string) => {
    updateState({
      partnerCompanies: state.partnerCompanies.filter((c) => c !== id),
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
        <div className="grid grid-cols-1 @lg:grid-cols-3 gap-4">
          <ProjectTypeButton
            className="h-20"
            onClick={() => updateState({ partnerSelection: "invite" })}
            selected={state.partnerSelection === "invite"}
            title="Invite by Email"
            iconClassName={cn(
              "w-16 p-4 items-center justify-center mb-3",
              state.partnerSelection === "invite" ? "text-primary" : "text-muted-foreground"
            )}
            icon={Mail}
          />

          <ProjectTypeButton
            className="h-20"
            onClick={() => updateState({ partnerSelection: "verified" })}
            selected={state.partnerSelection === "verified"}
            title="Nnarks Partner"
            iconClassName={cn(
              "w-16 p-4 items-center justify-center mb-3",
              state.partnerSelection === "verified" ? "text-primary" : "text-muted-foreground"
            )}
            icon={ShieldCheck}
          />

          <ProjectTypeButton
            className="h-20"
            onClick={() => updateState({ partnerSelection: "later" })}
            selected={state.partnerSelection === "later"}
            title="Decide later"
            iconClassName={cn(
              "w-16 p-4 items-center justify-center mb-3",
              state.partnerSelection === "later" ? "text-primary" : "text-muted-foreground"
            )}
            icon={Clock}
          />
        </div>

        {state.partnerSelection === "invite" && (
          <div className="p-5 rounded-xl border border-border/60 bg-muted/20 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold text-foreground">
                Partner Email Addresses
              </Label>
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
          </div>
        )}

        {state.partnerSelection === "verified" && (
          <div className="p-5 rounded-xl border border-border/60 bg-muted/20 space-y-4 animate-in fade-in">
            <div className="space-y-4">
              <Combobox
                label="Search for a Company"
                placeholder={isLoading ? "Loading..." : "Type to search companies..."}
                value=""
                onChange={handleCompanySelect}
                onSearchChange={setSearchQuery}
                options={companyOptions}
                sortOrder="none"
              />
              
              {state.partnerCompanies.length === 0 && (
                <p className="text-sm text-muted-foreground italic">Search and select a company to invite.</p>
              )}
              
              <div className="space-y-3">
                {state.partnerCompanies.map((id) => {
                  // For the mock, we can just find it in the current loaded list, 
                  // or if it's missing (because they searched something else), we just show the ID.
                  // In a real app we'd fetch the details of the selected companies.
                  const company = companies.find((c) => c.id === id);
                  return (
                    <div key={id} className="flex items-start justify-between p-3 border rounded-lg bg-background">
                      <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0 text-muted-foreground">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">{company ? company.name : 'Selected Company'}</span>
                          <span className="text-xs text-muted-foreground">{company ? company.email : id}</span>
                          {company && (
                            <div className="flex gap-1 mt-1 flex-wrap">
                              {company.services.map(s => (
                                <span key={s} className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded-full uppercase tracking-wider font-semibold">
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCompany(id)}
                        className="text-muted-foreground hover:text-destructive shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        
        <p className="text-xs text-muted-foreground">
          NB: Partners would have to agree to partnership terms and conditions.
        </p>

        <div className="pt-6 border-t border-border/50 space-y-4">
          <h3 className="text-lg font-bold text-foreground">Project supervision</h3>
          <Combobox
            label="Supervision Level"
            description="Supervision increases execution, progress and trust."
            value={state.supervisionLevel}
            onChange={(val) => updateState({ supervisionLevel: val as SupervisionLevel })}
            options={SUPERVISION_OPTIONS}
            sortOrder="none"
          />
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
