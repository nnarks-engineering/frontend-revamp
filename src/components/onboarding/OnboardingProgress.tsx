import { cn } from "@/shared/lib/utils";
import * as ProgressPrimitive from "@radix-ui/react-progress";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function OnboardingProgress({
  currentStep,
  totalSteps,
  className,
}: OnboardingProgressProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className={cn("space-y-2", className)}>
      <ProgressPrimitive.Root
        value={percentage}
        className="relative h-1.5 w-full overflow-hidden rounded-full bg-primary/15"
      >
        <ProgressPrimitive.Indicator
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </ProgressPrimitive.Root>
      <p className="text-xs font-medium uppercase tracking-wide text-primary">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}
