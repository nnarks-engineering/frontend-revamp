// ── Onboarding step keys ─────────────────────────────────────────────
export type OnboardingStepKey = "welcome" | "vendor-profile";

// ── Form values ───────────────────────────────────────────────────────
export interface VendorProfileFormValues {
  companyName: string;
  description: string;
}

// ── Step config ───────────────────────────────────────────────────────
export interface OnboardingStepConfig {
  step: number;
  key: OnboardingStepKey;
  title: string;
  description: string;
  skippable: boolean;
}

export const VENDOR_ONBOARDING_STEPS: OnboardingStepConfig[] = [
  {
    step: 0,
    key: "welcome",
    title: "Welcome",
    description: "",
    skippable: false,
  },
  {
    step: 1,
    key: "vendor-profile",
    title: "Set Up Your Company",
    description:
      "Tell us a bit about your company so clients know who they're working with.",
    skippable: true,
  },
];

export const VENDOR_TOTAL_STEPS = VENDOR_ONBOARDING_STEPS.filter(
  (s) => s.step > 0,
).length;
