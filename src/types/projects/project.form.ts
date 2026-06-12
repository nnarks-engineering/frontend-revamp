import type { Currencies } from "@/shared/constants/common";

import type { DurationUnit } from "../shared.enums";

import type { Industry, ProjectType } from "./project.enums";

export interface FormPartner {
  id: string;
  email: string;
}

export interface FormMilestone {
  id: string;
  title: string;
  description: string;
  budget_amount: number;
}

export interface ProjectFormAddress {
  street_line_1: string;
  street_line_2: string;
  city: string;
  region: string;
  postal_code: string;
  country_code: string; // alpha2 lowercase e.g. "gh"
}

export interface ProjectFormCoordinates {
  lat: number | null;
  lng: number | null;
}

export const ProjectPartnerSelection = {
  verified: "verified",
  invite: "invite",
  later: "later",
} as const;

export type ProjectPartnerSelection = (typeof ProjectPartnerSelection)[keyof typeof ProjectPartnerSelection];

export interface CreateProjectState {
  // Step 1: Basics
  title: string;
  description: string;

  // Step 2: Location
  country: string;           // display name only, not sent to API
  location_address: ProjectFormAddress;
  location_coordinates: ProjectFormCoordinates;

  // Step 3: Category
  projectType: ProjectType;
  industry: Industry;
  servicesNeeded: string[];
  additionalNotes: string;
  currency: Currencies;
  // Step 4: Budget & Milestones
  totalBudget: number;
  milestones: FormMilestone[];

  // Step 5: Partners & Supervision
  partnerEmails: FormPartner[];
  partnerSelection: ProjectPartnerSelection;
  supervisionRequired: boolean;

  // Step 6: Timeline
  startDate: string;
  estimatedDuration: number | "";
  durationUnit: DurationUnit;
  agreedToPayments: boolean;
  agreedToDisputes: boolean;
  agreedToSupervision: boolean;
}

export interface CreateProjectContextValue {
  state: CreateProjectState;
  updateState: (updates: Partial<CreateProjectState>) => void;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
}
