// ── Onboarding step keys ─────────────────────────────────────────────
export type OnboardingStepKey = "welcome" | "personal-info" | "company-setup";

// ── Form values ───────────────────────────────────────────────────────
export interface PersonalInfoFormValues {
  firstName: string;
  lastName: string;
  otherNames?: string;
}

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
    key: "personal-info",
    title: "About You",
    description:
      "Tell us your name so we can personalise your experience.",
    skippable: false,
  },
  {
    step: 2,
    key: "company-setup",
    title: "Set Up Your Company",
    description:
      "Tell us a bit about your company so clients know who they're working with.",
    skippable: true,
  },
];

export const VENDOR_TOTAL_STEPS = VENDOR_ONBOARDING_STEPS.filter(
  (s) => s.step > 0,
).length;
