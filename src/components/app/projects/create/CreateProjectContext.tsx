import { createContext, useContext, useState, type ReactNode } from "react";
import  { Industry,ProjectType } from "@/types/enums";


export interface FormMilestone {
  id: string; // temporary ID for UI mapping
  title: string;
  description: string;
  budget_amount: number;
}

export interface FormPartner {
  id: string; // temporary ID
  email: string;
}

export interface CreateProjectState {
  // Step 1: Basics
  title: string;
  description: string;

  // Step 2: Location
  country: string;
  countryCode: string;  
  region: string;
  city: string;
  siteAddress: string;
projectType: ProjectType;
  // Step 3: Category 
  industry: Industry;
  servicesNeeded: string[];
  additionalNotes: string;

  // Step 4: Budget & Milestones
  totalBudget: number;
  currency: string;
  milestones: FormMilestone[];

  // Step 5: Partners & Supervision
  partnerEmails: FormPartner[];
  partnerSelection: "verified" | "invite" | "later";
  supervisionRequired: boolean;

  // Step 6: Timeline & Expectations
  startDate: string;
  estimatedDuration: number | "";
  durationUnit: "days" | "weeks" | "months";
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

const initialState: CreateProjectState = {
  title: "",
  description: "",
  country: "",
  countryCode: "",
  region: "",
  city: "",
  siteAddress: "",
  industry: Industry.Agriculture,
  projectType: ProjectType.Solo,
  servicesNeeded: [],
  additionalNotes: "",
  totalBudget: 0,
  currency: "GHS", // Defaulting to GHS or USD
  milestones: [],
  partnerEmails: [],
  partnerSelection: "later",
  supervisionRequired: true,
  startDate: "",
  estimatedDuration: "",
  durationUnit: "months",
  agreedToPayments: false,
  agreedToDisputes: false,
  agreedToSupervision: false,
};

const CreateProjectContext = createContext<CreateProjectContextValue | null>(null);

export function CreateProjectProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CreateProjectState>(initialState);
  const [currentStep, setCurrentStep] = useState(1);

  const updateState = (updates: Partial<CreateProjectState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 7));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 1));
  const goToStep = (step: number) => setCurrentStep(step);

  return (
    <CreateProjectContext.Provider
      value={{ state, updateState, currentStep, nextStep, prevStep, goToStep }}
    >
      {children}
    </CreateProjectContext.Provider>
  );
}

export function useCreateProjectForm() {
  const ctx = useContext(CreateProjectContext);
  if (!ctx) {
    throw new Error("useCreateProjectForm must be used within CreateProjectProvider");
  }
  return ctx;
}
