import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";

import { useCurrentUser } from "@/shared/hooks/use-auth";
import {
    useSkipOnboarding,
    useSubmitPersonalInfo,
    useSubmitVendorProfile,
} from "@/shared/hooks/use-onboarding";
import type {
    PersonalInfoFormValues,
    VendorProfileFormValues,
} from "@/types/onboarding";
import { VENDOR_ONBOARDING_STEPS, VENDOR_TOTAL_STEPS } from "@/types/onboarding";

import { OnboardingNav } from "@/components/onboarding/OnboardingNav";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { PersonalInfoStep } from "@/components/onboarding/PersonalInfoStep";
import { VendorProfileStep } from "@/components/onboarding/VendorProfileStep";
import { WelcomeStep } from "@/components/onboarding/WelcomeStep";

// ── Route definition ──────────────────────────────────────────────────
// Auth + onboarding guards are handled by the parent _onboarding layout.
export const Route = createFileRoute("/_onboarding/vendor")({
  component: VendorOnboardingPage,
});

// ── Page ──────────────────────────────────────────────────────────────
function VendorOnboardingPage() {
  const [currentStep, setCurrentStep] = React.useState(0);

  const { data: user } = useCurrentUser();
  const submitPersonalInfo = useSubmitPersonalInfo();
  const submitProfile = useSubmitVendorProfile();
  const skipOnboarding = useSkipOnboarding();

  // Ref to imperatively trigger form submission from the nav button
  const stepFormRef = React.useRef<{ submit: () => void }>(null);

  const isSubmitting =
    submitPersonalInfo.isPending ||
    submitProfile.isPending ||
    skipOnboarding.isPending;

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

  async function handlePersonalInfoSubmit(values: PersonalInfoFormValues) {
    await submitPersonalInfo.mutateAsync({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
    });
    setCurrentStep(2);
  }

  async function handleVendorProfileSubmit(values: VendorProfileFormValues) {
    await submitProfile.mutateAsync({
      companyName: values.companyName.trim(),
      description: values.description.trim() || undefined,
    });
    // Navigation to /dashboard is handled inside useSubmitVendorProfile
  }

  function handleSkip() {
    // Skip is only available on the company-setup step (step 2)
    const emailPrefix = user?.email.split("@")[0] ?? "user";
    skipOnboarding.mutate(emailPrefix);
    // Navigation to /dashboard + ONBOARDING_COMPLETE flag handled inside hook
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
          userName={user?.username ?? user?.email.split("@")[0]}
          onStart={handleStart}
        />
      )}

      {currentStep === 1 && (
        <PersonalInfoStep
          ref={stepFormRef}
          onSubmit={handlePersonalInfoSubmit}
        />
      )}

      {currentStep === 2 && (
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
          canGoBack={currentStep > 1}
          canSkip={currentStepConfig.skippable}
          onBack={handleBack}
          onNext={handleNext}
          onSkip={handleSkip}
        />
      )}
    </div>
  );
}
