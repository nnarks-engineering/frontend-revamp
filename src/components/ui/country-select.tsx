"use client";

// shadcn
import { countries } from "country-data-list";
import { CheckIcon, ChevronDown, Globe } from "lucide-react";
import { forwardRef, useCallback, useState } from "react";
import { CircleFlag } from "react-circle-flags";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/shared/lib/utils";

// assets

// data

// Country interface
export interface Country {
  alpha2: string;
  alpha3: string;
  countryCallingCodes: string[];
  currencies: string[];
  emoji?: string;
  ioc: string;
  languages: string[];
  name: string;
  status: string;
}

// Dropdown props
interface CountryDropdownProps {
  options?: Country[];
  onChange?: (countryName: string) => void;
  onCountryChange?: (country: Country) => void;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  slim?: boolean;
  className?: string;
}

const CountryDropdownComponent = (
  {
    options = countries.all.filter(
      (country: Country) =>
        country.emoji && country.status !== "deleted" && country.ioc !== "PRK"
    ),
    onChange,
    onCountryChange,
    value,
    disabled = false,
    placeholder = "Select a country",
    slim = false,
    className,
    ...props
  }: CountryDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
    undefined
  );

  // Derive selected country from value and options
  const derivedCountry = value
    ? options.find((c) => c.name.toLowerCase() === value.toLowerCase() || c.alpha2.toLowerCase() === value.toLowerCase())
    : undefined;
  
  const activeCountry = selectedCountry !== undefined ? selectedCountry : derivedCountry;

  const handleSelect = useCallback(
    (country: Country) => {
      setSelectedCountry(country);
      onChange?.(country.name);
      onCountryChange?.(country);
      setOpen(false);
    },
    [onChange, onCountryChange]
  );

  const triggerClasses = cn(
    "flex h-10 w-full items-center justify-between whitespace-nowrap rounded-md border border-input! bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
    slim === true && "w-20",
    className
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        ref={ref}
        className={triggerClasses}
        disabled={disabled}
        {...props}
      >
        {activeCountry ? (
          <div className="flex items-center flex-grow w-0 gap-2 overflow-hidden">
            <div className="inline-flex items-center justify-center w-5 h-5 shrink-0 overflow-hidden rounded-full border border-border/50">
              <CircleFlag
              
                countryCode={activeCountry.alpha2.toLowerCase()}
                height={20}
              />
            </div>
            {slim === false && (
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {activeCountry.name}
              </span>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Globe size={18} className="shrink-0" />
            {slim === false && <span>{placeholder}</span>}
          </div>
        )}
        <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
      </PopoverTrigger>
      <PopoverContent
        collisionPadding={10}
        side="bottom"
        className="w-[var(--radix-popover-trigger-width)] p-0"
      >
        <Command
          className="w-full"
          loop={false}
        >
          <CommandInput placeholder="Search country..." className="h-9" />
          <CommandList className="max-h-[300px]">
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {options
                .filter((x) => x.name)
                .map((option, key: number) => (
                  <CommandItem
                    className="flex items-center w-full gap-2 cursor-pointer"
                    key={`${option.alpha2}-${key}`}
                    onSelect={() => handleSelect(option)}
                  >
                    <div className="inline-flex items-center justify-center w-5 h-5 shrink-0 overflow-hidden rounded-full border border-border/50">
                      <CircleFlag
                        countryCode={option.alpha2.toLowerCase()}
                        height={20}
                      />
                    </div>
                    <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                      {option.name}
                    </span>
                    <CheckIcon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        option.name === activeCountry?.name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

CountryDropdownComponent.displayName = "CountryDropdown";

export const CountryDropdown = forwardRef(CountryDropdownComponent);
