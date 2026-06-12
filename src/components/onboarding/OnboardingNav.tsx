import { ArrowLeft, SkipForward } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/shared/lib/utils";

import { SubmitButton } from "../auth/shared/SubmitButton";




interface OnboardingNavProps {
 readonly currentStep: number;
 readonly totalSteps: number;
 readonly isLastStep: boolean;
 readonly isSubmitting: boolean;
 readonly canGoBack: boolean;
 readonly canSkip: boolean;
 readonly onBack: () => void;
 readonly onNext: () => void;
 readonly onSkip: () => void;
 readonly className?: string;
}

export function OnboardingNav({
  currentStep: _currentStep,
  totalSteps: _totalSteps,
  isLastStep,
  isSubmitting,
  canGoBack,
  canSkip,
  onBack,
  onNext,
  onSkip,
  className,
}: OnboardingNavProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex gap-2">
        {canGoBack && (
          <Button
            type="button"
            variant="outline"
            className="flex-1 gap-1"
            disabled={isSubmitting}
            onClick={onBack}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Button>
        )}

        <SubmitButton
          loading={isSubmitting}
          disabled={isSubmitting}
          className="flex-1"
          onClick={onNext}
        >
          {isLastStep ? "Complete" : "Continue"}
        </SubmitButton>
      </div>

      {canSkip && (
        <Button
          type="button"
          variant="ghost"
          className="self-start gap-1.5 text-muted-foreground hover:text-foreground"
          disabled={isSubmitting}
          onClick={onSkip}
        >
          <SkipForward className="h-3.5 w-3.5" />
          Skip for now
        </Button>
      )}
    </div>
  );
}
