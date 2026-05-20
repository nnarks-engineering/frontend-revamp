import NnarksLogo from "@/assets/nnarks-logo.svg?react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface WelcomeStepProps {
  userName?: string;
  onStart: () => void;
}

export function WelcomeStep({ userName, onStart }: WelcomeStepProps) {
  const firstName = userName?.split(" ")[0];

  return (
    <div className="flex flex-col gap-8 py-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <NnarksLogo className="h-10 w-auto text-primary" />
        </div>

        <h1 className="text-4xl mt-8 font-bold font-clash-display leading-tight">
          {firstName ? `${firstName}, Welcome` : "Welcome"} to{" "}
          <span className="text-primary">Nnarks</span>
        </h1>

        <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
          We&apos;ll walk you through a few quick steps to get your business
          profile set up and ready to go.
        </p>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <div className="grid grid-cols-1 gap-3">
          {[
            { label: "Company profile", description: "Add your company name & details" },
            { label: "Start working", description: "Create your first project right away" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3 rounded-xl border border-border/50 bg-muted/30 px-4 py-3"
            >
              <div className="mt-0.5 h-2 w-2 rounded-full bg-primary shrink-0" />
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <Button className="mt-4 w-full h-11 gap-2" onClick={onStart}>
          Let&apos;s Get Started
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
