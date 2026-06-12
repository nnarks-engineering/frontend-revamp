import { Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CountryDropdown } from "@/components/ui/country-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Hint } from "../../shared/hint";


import { useCreateProjectForm } from "./CreateProjectContext";

export function Step2Location() {
  const { state, updateState, nextStep, prevStep } = useCreateProjectForm();

  const addr = state.location_address;

  const updateAddress = (fields: Partial<typeof addr>) => {
    updateState({ location_address: { ...addr, ...fields } });
  };

  const isFormValid =
    addr.country_code.trim() !== "" &&
    addr.region.trim() !== "" &&
    addr.city.trim() !== "";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="space-y-2">
        <h1 className="text-3xl font-millik font-bold text-foreground">
          Where is the project located?
        </h1>
        <Hint
          icon={Info}
          description="This helps us provide relevant insights and connect you with local partners."
        />
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground">Country</Label>
            <CountryDropdown
              value={state.country}
              onChange={(name) => updateState({ country: name })}
              onCountryChange={(c) => {
                updateState({ country: c.name });
                updateAddress({ country_code: c.alpha2.toLowerCase() });
              }}
              placeholder="Select a country"
              className="h-12"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="region" className="text-sm font-semibold text-foreground">
              Region / State
            </Label>
            <Input
              id="region"
              placeholder="e.g. Greater Accra"
              value={addr.region}
              onChange={(e) => updateAddress({ region: e.target.value })}
              className="h-12"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="city">City / Town</Label>
          <Input
            id="city"
            placeholder="e.g. Accra"
            value={addr.city}
            onChange={(e) => updateAddress({ city: e.target.value })}
            className="h-12"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="street_line_1">
            Street Address{" "}
            <span className="text-muted-foreground font-normal">(optional)</span>
          </Label>
          <Input
            id="street_line_1"
            placeholder="e.g. Plot 45, Boundary Road"
            value={addr.street_line_1}
            onChange={(e) => updateAddress({ street_line_1: e.target.value })}
            className="h-12"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-3">
            <Label htmlFor="postal_code">
              Postal Code{" "}
              <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input
              id="postal_code"
              placeholder="e.g. GA-123"
              value={addr.postal_code}
              onChange={(e) => updateAddress({ postal_code: e.target.value })}
              className="h-12"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="street_line_2">
              Address Line 2{" "}
              <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input
              id="street_line_2"
              placeholder="e.g. Suite 4B"
              value={addr.street_line_2}
              onChange={(e) => updateAddress({ street_line_2: e.target.value })}
              className="h-12"
            />
          </div>
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
