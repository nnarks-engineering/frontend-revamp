import {Info } from "lucide-react";

import HandShake from "@/assets/svg/handshake.svg?react";
import SingleMan from "@/assets/svg/single.svg?react";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { MultiSelectCombobox } from "@/components/ui/multi-select-combobox";
import { Textarea } from "@/components/ui/textarea";
import { INDUSTRY_OPTIONS, SERVICE_OPTIONS } from "@/shared/constants/project";
import { useCreateProjectForm } from "./CreateProjectContext";




export function Step3Category() {
  const { state, updateState, nextStep, prevStep } = useCreateProjectForm();

  const isFormValid = state.servicesNeeded.length > 0;

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

      <div className="space-y-6 border-border/50">
        <Combobox
          label="What type of project is this?"
          placeholder="Select a category"
          value={state.industry}
          onChange={(val) => updateState({ industry: val as Industry })}
          options={INDUSTRY_OPTIONS}
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
          <Label htmlFor="notes">
            Additional Notes <span className="text-muted-foreground font-normal">(optional)</span>
          </Label>
          <Textarea
            id="notes"
            placeholder="Any extra details we should know?"
            value={state.additionalNotes}
            onChange={(e) => updateState({ additionalNotes: e.target.value })}
            className=""
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
