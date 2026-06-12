import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useCreateProjectForm } from "./CreateProjectContext";

export function Step1Basics() {
  const { state, updateState, nextStep } = useCreateProjectForm();

  const isFormValid = state.title.trim() !== "" && state.description.trim() !== "";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="space-y-2">
        <h1 className="text-3xl font-millik font-bold text-foreground">
          What are we building today?
        </h1>
        <p className="text-muted-foreground">
          Give your project a name and a short description so everyone stays aligned.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="title" className="text-sm font-semibold text-foreground">
            Project Name
          </Label>
          <Input
            id="title"
            placeholder="e.g. Residential Building - East Legon"
            value={state.title}
            onChange={(e) => updateState({ title: e.target.value })}
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="description" className="text-sm font-semibold text-foreground">
            Short Description
          </Label>
          <Textarea
            id="description"
            placeholder="What is this project about? (2-3 lines)"
            value={state.description}
            onChange={(e) => updateState({ description: e.target.value })}
            className="min-h-32 text-base resize-none"
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button size="lg" disabled={!isFormValid} onClick={nextStep} className="px-8">
          Next Step
        </Button>
      </div>
    </div>
  );
}
