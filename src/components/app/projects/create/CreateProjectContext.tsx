import { createContext, type ReactNode, useContext, useState } from "react";
import type { CreateProjectContextValue, CreateProjectState } from "@/types/projects";
import { Industry, ProjectPreset, SupervisionLevel } from "@/types/projects";

const initialState: CreateProjectState = {
  title: "",
  description: "",
  country: "",
  location_address: {
    street_line_1: "",
    street_line_2: "",
    city: "",
    region: "",
    postal_code: "",
    country_code: "",
  },
  location_coordinates: {
    lat: null,
    lng: null,
  },
  industry: Industry.agriculture,
  preset: ProjectPreset.start_a_project,
  servicesNeeded: [],
  additionalNotes: "",
  totalBudget: 0,
  currency: "ghs",
  milestones: [],
  partnerEmails: [],
  partnerCompanies: [],
  partnerSelection: "later",
  supervisionRequired: true,
  supervisionLevel: SupervisionLevel.basic,
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
  if (!ctx) throw new Error("useCreateProjectForm must be used within CreateProjectProvider");
  return ctx;
}
