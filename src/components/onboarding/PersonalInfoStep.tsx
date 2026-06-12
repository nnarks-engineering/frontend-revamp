import * as React from "react";

import { useForm } from "@tanstack/react-form";
import { User } from "lucide-react";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/shared/lib/utils";
import type { PersonalInfoFormValues } from "@/types/onboarding";



// ── Validation ────────────────────────────────────────────────────────
const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name must be under 100 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name must be under 100 characters"),
  otherNames: z
    .string()
    .max(200, "Other names must be under 200 characters")
    .optional()
    .default(""),
});

// ── Sub-components ────────────────────────────────────────────────────
interface FieldWrapperProps {
readonly  label: string;
readonly  hint?: string;
readonly  error?: string;
readonly  children: React.ReactNode;
}

function FieldWrapper({ label, hint, error, children }: FieldWrapperProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────

export const PersonalInfoStep = React.forwardRef<
  { submit: () => void },
  { readonly onSubmit: (values: PersonalInfoFormValues) => void | Promise<void> }
>(function PersonalInfoStep({ onSubmit }, ref) {
  const form = useForm({
    defaultValues: { firstName: "", lastName: "", otherNames: "" },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validators: { onChange: personalInfoSchema as any },
    onSubmit: async ({ value }) => {
      await onSubmit({
        firstName: value.firstName,
        lastName: value.lastName,
        otherNames: value.otherNames?.trim() || undefined,
      });
    },
  });

  // Expose submit() to parent via ref
  React.useImperativeHandle(ref, () => ({
    submit: () => form.handleSubmit(),
  }));

  return (
    <form
      className="flex flex-col gap-6 animate-in fade-in-0 slide-in-from-right-4 duration-300"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      {/* First name */}
      <form.Field name="firstName">
        {(field) => (
          <FieldWrapper
            label="First Name"
            error={
              field.state.meta.errors.length > 0
                ? String(field.state.meta.errors[0])
                : undefined
            }
          >
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="first-name"
                type="text"
                placeholder="Jane"
                maxLength={100}
                autoFocus
                className={cn(
                  "pl-9",
                  field.state.meta.errors.length > 0 &&
                    "border-destructive focus-visible:ring-destructive",
                )}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          </FieldWrapper>
        )}
      </form.Field>

      {/* Last name */}
      <form.Field name="lastName">
        {(field) => (
          <FieldWrapper
            label="Last Name"
            error={
              field.state.meta.errors.length > 0
                ? String(field.state.meta.errors[0])
                : undefined
            }
          >
            <Input
              id="last-name"
              type="text"
              placeholder="Doe"
              maxLength={100}
              className={cn(
                field.state.meta.errors.length > 0 &&
                  "border-destructive focus-visible:ring-destructive",
              )}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </FieldWrapper>
        )}
      </form.Field>

      {/* Other names — optional */}
      <form.Field name="otherNames">
        {(field) => (
          <FieldWrapper
            label="Other Names"
            hint="Middle name, nickname, or any other names (optional)"
            error={
              field.state.meta.errors.length > 0
                ? String(field.state.meta.errors[0])
                : undefined
            }
          >
            <Input
              id="other-names"
              type="text"
              placeholder="e.g. Marie, Jr."
              maxLength={200}
              className={cn(
                field.state.meta.errors.length > 0 &&
                  "border-destructive focus-visible:ring-destructive",
              )}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </FieldWrapper>
        )}
      </form.Field>
    </form>
  );
});
