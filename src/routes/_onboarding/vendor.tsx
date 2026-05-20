import { createFileRoute, redirect } from "@tanstack/react-router";
import * as React from "react";
import { toast } from "sonner";

import { useCurrentUser } from "@/shared/hooks/use-auth";
import {
    useSkipOnboarding,
    useSubmitVendorProfile,
} from "@/shared/hooks/use-onboarding";
import { isAuthenticated } from "@/shared/lib/auth";
import { STORAGE_KEYS } from "@/shared/lib/constants";
import type { VendorProfileFormValues } from "@/types/onboarding";
import { VENDOR_ONBOARDING_STEPS, VENDOR_TOTAL_STEPS } from "@/types/onboarding";

import { OnboardingNav } from "@/components/onboarding/OnboardingNav";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { VendorProfileStep } from "@/components/onboarding/VendorProfileStep";
import { WelcomeStep } from "@/components/onboarding/WelcomeStep";

// ── Route definition ──────────────────────────────────────────────────
export const Route = createFileRoute("/_onboarding/vendor")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
    // If onboarding already completed, skip straight to the app
    if (localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE) === "true") {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: VendorOnboardingPage,
});

// ── Page ──────────────────────────────────────────────────────────────
function VendorOnboardingPage() {
  const [currentStep, setCurrentStep] = React.useState(0);

  const { data: user } = useCurrentUser();
  const submitProfile = useSubmitVendorProfile();
  const skipOnboarding = useSkipOnboarding();

  // Ref to imperatively trigger form submission from the nav button
  const stepFormRef = React.useRef<{ submit: () => void }>(null);

  const isSubmitting = submitProfile.isPending || skipOnboarding.isPending;

  const currentStepConfig = VENDOR_ONBOARDING_STEPS.find(
    (s) => s.step === currentStep,
  )!;

  // ── Handlers ────────────────────────────────────────────────────────
  function handleStart() {
    setCurrentStep(1);
  }

  function handleBack() {
    setCurrentStep((s) => Math.max(0, s - 1));
  }

  async function handleNext() {
    if (currentStep === 0) {
      handleStart();
      return;
    }
    // Delegate to the active step form's imperative submit
    stepFormRef.current?.submit();
  }

  async function handleVendorProfileSubmit(values: VendorProfileFormValues) {
    if (!values.companyName.trim()) {
      toast.error("Company name is required");
      return;
    }
    await submitProfile.mutateAsync({
      companyName: values.companyName.trim(),
      description: values.description.trim() || undefined,
    });
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, "true");
  }

  function handleSkip() {
    const emailPrefix = user?.email.split("@")[0] ?? "user";
    skipOnboarding.mutate(emailPrefix);
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, "true");
  }

  // ── Render ───────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-lg mx-auto px-4 py-8 space-y-8">
      {/* Progress — hidden on welcome screen */}
      {currentStep > 0 && (
        <OnboardingProgress
          currentStep={currentStep}
          totalSteps={VENDOR_TOTAL_STEPS}
        />
      )}

      {/* Step header — hidden on welcome screen */}
      {currentStep > 0 && (
        <div className="space-y-1">
          <h2 className="text-3xl font-bold font-clash-display">
            {currentStepConfig.title}
          </h2>
          <p className="text-muted-foreground">{currentStepConfig.description}</p>
        </div>
      )}

      {/* Step content */}
      {currentStep === 0 && (
        <WelcomeStep
          userName={
            user?.username ??
            user?.email.split("@")[0]
          }
          onStart={handleStart}
        />
      )}

      {currentStep === 1 && (
        <VendorProfileStep
          ref={stepFormRef}
          onSubmit={handleVendorProfileSubmit}
        />
      )}

      {/* Navigation — hidden on welcome (it has its own CTA) */}
      {currentStep > 0 && (
        <OnboardingNav
          currentStep={currentStep}
          totalSteps={VENDOR_TOTAL_STEPS}
          isLastStep={currentStep === VENDOR_TOTAL_STEPS}
          isSubmitting={isSubmitting}
          canGoBack={false}
          canSkip={currentStepConfig.skippable}
          onBack={handleBack}
          onNext={handleNext}
          onSkip={handleSkip}
        />
      )}
    </div>
  );
}
