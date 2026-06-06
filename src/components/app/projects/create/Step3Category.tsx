import { useCreateProjectForm } from "./CreateProjectContext";
import { Button } from "@/components/ui/button";
import { User, Users, Check, Info } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { type Industry } from "@/types/enums";
import { Combobox } from "@/components/ui/combobox";
import { MultiSelectCombobox } from "@/components/ui/multi-select-combobox";

const PROJECT_TYPE_OPTIONS: { value: Industry; label: string }[] = [
  { value: "OTHER", label: "Market Research" },
  { value: "CONSTRUCTION", label: "Construction & Real Estate" },
  { value: "AGRICULTURE", label: "Agriculture & Agribusiness" },
  { value: "MANUFACTURING", label: "Manufacturing & Fabrication" },
  { value: "OTHER", label: "Transport & Logistics" },
  { value: "OTHER", label: "Energy & Utilities" },
  { value: "RETAIL", label: "Fashion & Apparel" },
  { value: "EDUCATION", label: "Education & Training" },
  { value: "AGRICULTURE", label: "Food & Edibles" },
  { value: "OTHER", label: "Beauty & Wellness" },
  { value: "TECHNOLOGY", label: "ICT & Technology" },
  { value: "HEALTHCARE", label: "Healthcare & Medical" },
  { value: "OTHER", label: "Other Services" },
];

const SERVICE_OPTIONS = [
  { value: "construction", label: "Construction / Execution" },
  { value: "supply", label: "Supply of materials" },
  { value: "equipment", label: "Equipment / machinery" },
  { value: "consulting", label: "Consulting / advisory" },
];

export function Step3Category() {
  const { state, updateState, nextStep, prevStep } = useCreateProjectForm();

  const isFormValid = state.projectType !== "" && state.servicesNeeded.length > 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="space-y-2">
        <h1 className="text-3xl font-millik font-bold text-foreground">
          What is the project form?
        </h1>
        <p className="text-muted-foreground">
          Tell us about the structure and scope of this project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Solo Project Card */}
        <button
          type="button"
          onClick={() => updateState({ isPartnered: false })}
          className={cn(
            "flex flex-col items-center text-center p-6 rounded-xl border-2 transition-all",
            !state.isPartnered
              ? "border-primary bg-primary/5 shadow-sm"
              : "border-border/60 hover:border-border bg-background",
          )}
        >
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors",
            !state.isPartnered ? "bg-primary text-white" : "bg-muted text-muted-foreground"
          )}>
            <User className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">Solo Project</h3>
          <p className="text-sm text-muted-foreground">
            I am funding and managing this project independently.
          </p>
        </button>

        {/* Partnered Project Card */}
        <button
          type="button"
          onClick={() => updateState({ isPartnered: true })}
          className={cn(
            "flex flex-col items-center text-center p-6 rounded-xl border-2 transition-all",
            state.isPartnered
              ? "border-primary bg-primary/5 shadow-sm"
              : "border-border/60 hover:border-border bg-background",
          )}
        >
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors",
            state.isPartnered ? "bg-primary text-white" : "bg-muted text-muted-foreground"
          )}>
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">Partnered</h3>
          <p className="text-sm text-muted-foreground">
            This project is being co-funded or partnered with others.
          </p>
        </button>
      </div>

      {state.isPartnered && (
        <div className="bg-primary-50 text-primary-900 p-4 rounded-lg text-sm border border-primary-100 flex gap-3">
          <Info className="w-5 h-5 shrink-0 mt-0.5" />
          <p>
            You can add partner emails later in the setup process, or invite them from the project dashboard.
          </p>
        </div>
      )}

      <div className="space-y-6 pt-2 border-t border-border/50">
        <Combobox
          label="What type of project is this?"
          placeholder="Select a category"
          value={state.projectType}
          onChange={(val) => updateState({ projectType: val as Industry })}
          options={PROJECT_TYPE_OPTIONS}
          required
          sortOrder="none"
        />

        <MultiSelectCombobox
          label="What does the project involve?"
          placeholder="Select services needed"
          value={state.servicesNeeded}
          onChange={(vals) => updateState({ servicesNeeded: vals })}
          options={SERVICE_OPTIONS}
          required
        />
        <p className="text-xs text-muted-foreground -mt-4">
          NB: Services selected comes with mandatory Supervision & inspection for transparency, accountability and a successful project execution.
        </p>

        <div className="space-y-3">
          <label htmlFor="notes" className="text-sm font-semibold text-foreground flex items-center gap-2">
            Additional Notes <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <textarea
            id="notes"
            placeholder="Any extra details we should know?"
            value={state.additionalNotes}
            onChange={(e) => updateState({ additionalNotes: e.target.value })}
            className="w-full min-h-24 p-4 rounded-lg border border-border/60 bg-background text-base resize-y focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
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
