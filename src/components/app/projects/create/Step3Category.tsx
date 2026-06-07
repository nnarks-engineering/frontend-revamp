import { useCreateProjectForm } from "./CreateProjectContext";
import { Button } from "@/components/ui/button";
import {Info } from "lucide-react";
import type{ Industry } from "@/types/enums";
import { Combobox } from "@/components/ui/combobox";
import { MultiSelectCombobox } from "@/components/ui/multi-select-combobox";
import { ProjectTypeButton } from "./step3category/ProjectTypeButton";
import HandShake from "@/assets/svg/handshake.svg?react";
import SingleMan from "@/assets/svg/single.svg?react";
import { Hint } from "../../shared/hint";

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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
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

        <ProjectTypeButton
          icon={SingleMan}
          title="Solo Project"
          description="I am funding and managing this project independently."
          selected={!state.isPartnered}
          onClick={() => updateState({ isPartnered: false })}
        />

        <ProjectTypeButton
          icon={HandShake}
          title="Partnered Project"
          description="This project is co-managed with one or more partners."
          selected={state.isPartnered}
          onClick={() => updateState({ isPartnered: true })}
        />

      </div>

      {state.isPartnered && (
       <Hint icon={Info} description="You can add partner emails later in the setup process, or invite them from the project dashboard." className="bg-yellow-50 text-yellow-900 border-yellow-200" />
      )}

      <div className="space-y-6 border-border/50">
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
