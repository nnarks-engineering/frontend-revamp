import { useCreateProjectForm } from "./CreateProjectContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CountryDropdown } from "@/components/ui/country-select";
import { Info } from "lucide-react";
import { Hint } from "../../shared/hint";

export function Step2Location() {
  const { state, updateState, nextStep, prevStep } = useCreateProjectForm();

  const isFormValid =
    state.country.trim() !== "" &&
    state.region.trim() !== "" &&
    state.city.trim() !== "";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="space-y-2">
        <h1 className="text-3xl font-millik font-bold text-foreground">
          Where is the project located?
        </h1>
        <Hint icon={Info} description="This helps us provide relevant insights and connect you with local partners." />
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">
              Country
            </label>
            <CountryDropdown
              value={state.country}
              onChange={(name) => updateState({ country: name })}
              placeholder="Select a country"
              className="h-12"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="region" className="text-sm font-semibold text-foreground">
              Region / State
            </label>
            <Input
              id="region"
              placeholder="e.g. Greater Accra"
              value={state.region}
              onChange={(e) => updateState({ region: e.target.value })}
              className="h-12"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label htmlFor="city" className="text-sm font-semibold text-foreground">
            City / Town
          </label>
          <Input
            id="city"
            placeholder="e.g. Accra"
            value={state.city}
            onChange={(e) => updateState({ city: e.target.value })}
            className="h-12"
          />
        </div>

        <div className="space-y-3">
          <label htmlFor="siteAddress" className="text-sm font-semibold text-foreground flex items-center gap-2">
            Site Address <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <Input
            id="siteAddress"
            placeholder="e.g. Plot 45, Boundary Road"
            value={state.siteAddress}
            onChange={(e) => updateState({ siteAddress: e.target.value })}
            className="h-12"
          />
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <Button variant="outline" size="lg" onClick={prevStep} className="px-6">
          Back
        </Button>
        <Button size="lg" disabled={!isFormValid} onClick={nextStep} className="px-8">
          Next Step
        </Button>
      </div>
    </div>
  );
}
