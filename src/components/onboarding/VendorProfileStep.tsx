import * as React from "react";

import { useForm } from "@tanstack/react-form";
import { Building2 } from "lucide-react";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/shared/lib/utils";
import type { VendorProfileFormValues } from "@/types";



// ── Validation ────────────────────────────────────────────────────────
const vendorProfileSchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be under 100 characters"),
  description: z
    .string()
    .max(500, "Description must be under 500 characters")
    .optional()
    .default(""),
});

// ── Sub-components ────────────────────────────────────────────────────
interface FieldWrapperProps {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
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

export const VendorProfileStep = React.forwardRef<
  { submit: () => void },
  { onSubmit: (values: VendorProfileFormValues) => void | Promise<void> }
>(function VendorProfileStep({ onSubmit }, ref) {
  const form = useForm({
    defaultValues: { companyName: "", description: "" },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validators: { onChange: vendorProfileSchema as any },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  // Expose submit to parent via ref
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
      {/* Company name */}
      <form.Field name="companyName">
        {(field) => (
          <FieldWrapper
            label="Company Name"
            error={
              field.state.meta.errors.length > 0
                ? String(field.state.meta.errors[0])
                : undefined
            }
          >
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="company-name"
                type="text"
                placeholder="Acme Corp"
                maxLength={100}
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

      {/* Description */}
      <form.Field name="description">
        {(field) => (
          <FieldWrapper
            label="Short Description"
            hint={`${field.state.value.length}/500 — optional`}
            error={
              field.state.meta.errors.length > 0
                ? String(field.state.meta.errors[0])
                : undefined
            }
          >
            <textarea
              id="company-description"
              rows={4}
              placeholder="Tell clients what makes your company special…"
              maxLength={500}
              className={cn(
                "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                "ring-offset-background placeholder:text-muted-foreground",
                "focus-visible:outline-none focus-visible:ring focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50 resize-none",
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
