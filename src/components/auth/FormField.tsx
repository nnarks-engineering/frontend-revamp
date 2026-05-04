import * as React from "react"
import { type AnyFieldApi } from "@tanstack/react-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/shared/lib/utils"

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  field: AnyFieldApi
}

export function FormField({ label, field, className, ...props }: FormFieldProps) {
  return (
    <div className={cn("space-y-2.5", className)}>
      <Label htmlFor={field.name}>{label}</Label>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className={cn(
          field.state.meta.errors.length > 0 && "border-destructive focus-visible:ring-destructive"
        )}
        {...props}
      />
      {field.state.meta.errors.length > 0 && (
        <p className="text-[0.8rem]  -mt-1 text-destructive">
          {field.state.meta.errors[0]?.message}
        </p>
      )}
    </div>
  )
}
