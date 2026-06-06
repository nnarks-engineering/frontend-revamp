import { useCreateProjectForm, type FormMilestone } from "./CreateProjectContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info, Plus, Trash2, AlertTriangle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/shared/lib/utils";

export function Step4Budget() {
  const { state, updateState, nextStep, prevStep } = useCreateProjectForm();

  const totalMilestoneAmount = state.milestones.reduce(
    (sum, m) => sum + (m.budget_amount || 0),
    0
  );

  const isBudgetExceeded = totalMilestoneAmount > state.totalBudget && state.totalBudget > 0;
  const remainingBudget = state.totalBudget - totalMilestoneAmount;

  const isFormValid =
    state.totalBudget > 0 &&
    state.milestones.length > 0 &&
    state.milestones.every((m) => m.title.trim() !== "" && m.budget_amount > 0) &&
    !isBudgetExceeded;

  const addMilestone = () => {
    const newMilestone: FormMilestone = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      budget_amount: 0,
    };
    updateState({ milestones: [...state.milestones, newMilestone] });
  };

  const updateMilestone = (id: string, updates: Partial<FormMilestone>) => {
    updateState({
      milestones: state.milestones.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    });
  };

  const removeMilestone = (id: string) => {
    updateState({
      milestones: state.milestones.filter((m) => m.id !== id),
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="space-y-2">
        <h1 className="text-3xl font-millik font-bold text-foreground">
          Set your project budget
        </h1>
        <p className="text-muted-foreground">
          Funds are released only when milestones are approved.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-3 col-span-2">
            <label htmlFor="budget" className="text-sm font-semibold text-foreground">
              Estimated Total Budget
            </label>
            <Input
              id="budget"
              type="number"
              placeholder="e.g. 50000"
              value={state.totalBudget || ""}
              onChange={(e) => updateState({ totalBudget: Number(e.target.value) })}
              className="h-12 text-base"
              min="0"
            />
          </div>
          <div className="space-y-3 col-span-1">
            <label className="text-sm font-semibold text-foreground">
              Currency
            </label>
            <Select
              value={state.currency}
              onValueChange={(val) => updateState({ currency: val })}
            >
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GHS">GHS</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
                <SelectItem value="NGN">NGN</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {state.totalBudget > 0 && (
          <div className="pt-6 border-t border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Break the project into milestones</h3>
                <p className="text-sm text-muted-foreground">Define what needs to be done and its cost.</p>
              </div>
              <Button onClick={addMilestone} variant="outline" size="sm" className="gap-2">
                <Plus className="w-4 h-4" /> Add Milestone
              </Button>
            </div>

            {/* Budget tracker */}
            {state.milestones.length > 0 && (
              <div className={cn(
                "rounded-lg p-4 mb-6 border flex items-center justify-between",
                isBudgetExceeded
                  ? "bg-destructive/10 border-destructive/30"
                  : "bg-muted/30 border-border/50"
              )}>
                <div className="flex items-center gap-3">
                  {isBudgetExceeded ? (
                    <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
                  ) : (
                    <Info className="w-5 h-5 text-primary shrink-0" />
                  )}
                  <div>
                    <p className={cn(
                      "text-sm font-medium",
                      isBudgetExceeded ? "text-destructive" : "text-foreground"
                    )}>
                      {isBudgetExceeded
                        ? `Milestone total exceeds budget by ${state.currency} ${Math.abs(remainingBudget).toLocaleString()}`
                        : `${state.currency} ${remainingBudget.toLocaleString()} remaining`
                      }
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {state.currency} {totalMilestoneAmount.toLocaleString()} of {state.currency} {state.totalBudget.toLocaleString()} allocated
                    </p>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-300",
                      isBudgetExceeded ? "bg-destructive" : "bg-primary"
                    )}
                    style={{ width: `${Math.min((totalMilestoneAmount / state.totalBudget) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {state.milestones.length === 0 && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-6 flex items-start gap-3">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-primary-900 leading-relaxed">
                  Tip: You can create and edit milestones later with <strong>Lynn</strong>, our AI consultant, if you prefer to skip this step or need assistance breaking down your project.
                </p>
              </div>
            )}

            <div className="space-y-4">
              {state.milestones.map((milestone, index) => (
                <div
                  key={milestone.id}
                  className={cn(
                    "p-4 rounded-xl border relative group",
                    isBudgetExceeded
                      ? "border-destructive/40 bg-destructive/5"
                      : "border-border bg-muted/20"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => removeMilestone(milestone.id)}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <h4 className="font-semibold text-sm mb-4">Milestone {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Input
                        placeholder="Milestone Name (e.g. Foundation setup)"
                        value={milestone.title}
                        onChange={(e) => updateMilestone(milestone.id, { title: e.target.value })}
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-1">
                      <Input
                        type="number"
                        placeholder="Amount"
                        value={milestone.budget_amount || ""}
                        onChange={(e) => updateMilestone(milestone.id, { budget_amount: Number(e.target.value) })}
                        className={cn(
                          "bg-background",
                          isBudgetExceeded && "border-destructive focus-visible:ring-destructive/20"
                        )}
                        min="0"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-3">
                      <Textarea
                        placeholder="Description of deliverables..."
                        value={milestone.description}
                        onChange={(e) => updateMilestone(milestone.id, { description: e.target.value })}
                        className="bg-background resize-none min-h-[80px]"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {state.milestones.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-border rounded-xl">
                  <p className="text-sm text-muted-foreground mb-4">No milestones defined yet.</p>
                  <Button onClick={addMilestone} variant="secondary">
                    Add First Milestone
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 flex justify-between items-center">
        <Button variant="outline" size="lg" onClick={prevStep} className="px-6">
          Back
        </Button>
        <div className="flex gap-3">
          <Button variant="ghost" size="lg" onClick={nextStep} className="text-muted-foreground hover:text-foreground">
            Skip Milestones
          </Button>
          <Button
            size="lg"
            disabled={isBudgetExceeded || (!isFormValid && state.milestones.length > 0)}
            onClick={nextStep}
            className="px-8"
          >
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
}
