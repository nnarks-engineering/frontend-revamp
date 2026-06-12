import { createContext, useContext, useState, type ReactNode } from "react";

import { Industry, ProjectType } from "@/types/projects";
import type { CreateProjectState, CreateProjectContextValue } from "@/types/projects";

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
  projectType: ProjectType.individual,
  servicesNeeded: [],
  additionalNotes: "",
  totalBudget: 0,
  currency: "ghs",
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
  if (!ctx) throw new Error("useCreateProjectForm must be used within CreateProjectProvider");
  return ctx;
}
