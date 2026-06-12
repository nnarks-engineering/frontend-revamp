import * as React from "react";

import { Check, ChevronsUpDown, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
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

export function LanguageSwitcher() {
  const [open, setOpen] = React.useState(false);
  const { i18n, t } = useTranslation("common");

  // Get supported languages from i18n resources or fallback to defaults
  const supportedLanguages = (t("languages.supported", { returnObjects: true }) as Array<{ code: string; name: string; nativeName: string }>) || [
    { code: "en", name: "English", nativeName: "English" },
    { code: "fr", name: "French", nativeName: "Français" },
    { code: "es", name: "Spanish", nativeName: "Español" },
  ];

  const currentLanguage = i18n.language.split("-")[0]; // Handle cases like en-US
  const selectedLang = supportedLanguages.find((l) => l.code === currentLanguage) || supportedLanguages[0];

  const handleLanguageChange = (newCode: string) => {
    i18n.changeLanguage(newCode);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[180px] justify-between h-10 px-3 bg-card border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-primary" />
            <span className="truncate">{selectedLang.nativeName}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0 bg-card border-border rounded-none shadow-2xl">
        <Command className="bg-transparent">
          <CommandInput placeholder={t("actions.search") || "Search language..."} className="h-9 border-none focus:ring-0" />
          <CommandList>
            <CommandEmpty>{t("feedback.noResults") || "No language found."}</CommandEmpty>
            <CommandGroup>
              {supportedLanguages.map((language) => (
                <CommandItem
                  key={language.code}
                  value={language.nativeName}
                  onSelect={() => handleLanguageChange(language.code)}
                  className="flex items-center justify-between cursor-pointer hover:bg-accent hover:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground uppercase w-5 text-center">{language.code}</span>
                    <span>{language.nativeName}</span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4 text-primary",
                      currentLanguage === language.code ? "opacity-100" : "opacity-0"
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
}
