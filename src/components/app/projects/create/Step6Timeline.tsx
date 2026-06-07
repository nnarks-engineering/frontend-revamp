import { useCreateProjectForm } from "./CreateProjectContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/shared/lib/utils";

export function Step6Timeline() {
  const { state, updateState, nextStep, prevStep } = useCreateProjectForm();

  const isFormValid =
    state.startDate !== "" &&
    state.estimatedDuration !== "" &&
    state.agreedToPayments &&
    state.agreedToDisputes &&
    state.agreedToSupervision;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="space-y-2">
        <h1 className="text-3xl font-millik font-bold text-foreground">
          Timeline & Expectations
        </h1>
        <p className="text-muted-foreground">
          When will this happen and what are the rules of engagement?
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-3">
            <label htmlFor="startDate" className="text-sm font-semibold text-foreground">
              Expected Start Date
            </label>
            <Input
              id="startDate"
              type="date"
              value={state.startDate}
              onChange={(e) => updateState({ startDate: e.target.value })}
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="duration" className="text-sm font-semibold text-foreground">
              Estimated Duration
            </label>
            <div className="flex">
              <Input
                id="duration"
                type="number"
                placeholder="e.g. 6"
                min="1"
                value={state.estimatedDuration}
                onChange={(e) => updateState({ estimatedDuration: e.target.value ? Number(e.target.value) : "" })}
                className="h-12 rounded-r-none border-r-0 focus-visible:z-10 text-base"
              />
              <select
                value={state.durationUnit}
                onChange={(e) => updateState({ durationUnit: e.target.value as any })}
                className="h-12 px-4 rounded-r-lg border border-border/60 bg-muted/20 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-w-[120px]"
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              NB: Tighter timelines leads to increased cost of supervision (not shown on platform)
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-border/50 space-y-4">
          <h3 className="text-lg font-bold text-foreground">Expectations & Compliance</h3>

          <div className="space-y-3">
            <label className={cn(
              "flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all",
              state.agreedToPayments ? "border-primary bg-primary/5" : "border-border/60 hover:border-border bg-background"
            )}>
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  checked={state.agreedToPayments}
                  onChange={(e) => updateState({ agreedToPayments: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-foreground text-sm">I understand payments are released per milestone</span>
              </div>
            </label>

            <label className={cn(
              "flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all",
              state.agreedToDisputes ? "border-primary bg-primary/5" : "border-border/60 hover:border-border bg-background"
            )}>
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  checked={state.agreedToDisputes}
                  onChange={(e) => updateState({ agreedToDisputes: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-foreground text-sm">
                  I agree to dispute resolution via <a href="#" className="text-primary hover:underline">Nnarks Terms</a>
                </span>
              </div>
            </label>

            <label className={cn(
              "flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all",
              state.agreedToSupervision ? "border-primary bg-primary/5" : "border-border/60 hover:border-border bg-background"
            )}>
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  checked={state.agreedToSupervision}
                  onChange={(e) => updateState({ agreedToSupervision: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-foreground text-sm">I acknowledge supervision reports affect payments</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <Button variant="outline" size="lg" onClick={prevStep} className="px-6">
          Back
        </Button>
        <Button size="lg" disabled={!isFormValid} onClick={nextStep} className="px-8">
          Review Project
        </Button>
      </div>
    </div>
  );
}
