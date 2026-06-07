import NnarksLogo from "@/assets/nnarks-logo.svg?react";
import RoundingLine from "@/assets/svg/rounding-line.svg?react";
import { CreateProjectProvider, useCreateProjectForm } from "@/components/app/projects/create/CreateProjectContext";
import { Step1Basics } from "@/components/app/projects/create/Step1Basics";
import { Step2Location } from "@/components/app/projects/create/Step2Location";
import { Step3Category } from "@/components/app/projects/create/Step3Category";
import { Step4Budget } from "@/components/app/projects/create/Step4Budget";
import { Step5Partners } from "@/components/app/projects/create/Step5Partners";
import { Step6Timeline } from "@/components/app/projects/create/Step6Timeline";
import { Step7Review } from "@/components/app/projects/create/Step7Review";
import { requireAuth } from "@/shared/middleware";
import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";

export const Route = createFileRoute('/projects/create')({
  beforeLoad: ({ context }) => requireAuth({ context }),
  component: CreateProjectLayoutWrapper,
});

import realBuilding from "@/assets/landing/real-building.png";

function CreateProjectLayoutWrapper() {
  return (
    <CreateProjectProvider>
      <div className="h-dvh w-full flex bg-background font-poppins overflow-hidden">
        {/* Left Form Area */}
        <div className="relative flex-1 flex flex-col overflow-hidden">
          {/* Subtle brand decoration — fixed behind header */}
          <div className="absolute opacity-20 -top-10 -right-2 w-fit pointer-events-none z-0 lg:hidden" aria-hidden>
            <RoundingLine className="w-full text-secondary" />
          </div>

          {/* Top bar — sticky */}
          <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-5 border-b border-border/50 bg-background/80 backdrop-blur-md shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <NnarksLogo className="h-8 w-auto text-primary group-hover:scale-105 transition-transform" />
            </Link>
            <Link search={{tab:'active'}} to="/projects" className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted/50">
              <X className="w-5 h-5" />
            </Link>
          </header>

          {/* Scrollable content area */}
          <main className="relative z-10 flex-1 overflow-y-auto flex items-start justify-center p-6 sm:p-10">
            <div className="w-full max-w-2xl pb-10">
              <CreateProjectWizard />
            </div>
          </main>
        </div>

        {/* Right side: Visual Panel (lg+ only, max-w-1/3) */}
        <div
          style={{ backgroundImage: `url(${realBuilding})`, backgroundSize: "cover", backgroundPosition: "center" }}
          className="hidden lg:flex lg:w-1/3 bg-secondary relative overflow-hidden items-center justify-center"
        >
          <RoundingLine className="w-full h-full text-background absolute inset-0" />
        </div>
      </div>
    </CreateProjectProvider>
  );
}

function CreateProjectWizard() {
  const { currentStep } = useCreateProjectForm();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stepper Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-primary">STEP {currentStep} OF 7</p>
          <div className="flex gap-1.5 mt-2">
            {[1, 2, 3, 4, 5, 6, 7].map((step) => (
              <div
                key={step}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step === currentStep
                    ? "w-8 bg-primary"
                    : step < currentStep
                      ? "w-4 bg-primary/40"
                      : "w-4 bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Step Components placeholder */}
      {currentStep === 1 && <Step1Basics />}
      {currentStep === 2 && <Step2Location />}
      {currentStep === 3 && <Step3Category />}
      {currentStep === 4 && <Step4Budget />}
      {currentStep === 5 && <Step5Partners />}
      {currentStep === 6 && <Step6Timeline />}
      {currentStep === 7 && <Step7Review />}
    </div>
  );
}
