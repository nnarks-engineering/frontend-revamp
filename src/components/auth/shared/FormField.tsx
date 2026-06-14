import type { AnyFieldApi } from "@tanstack/react-form"
import { Eye, EyeOff } from "lucide-react"
import * as React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/shared/lib/utils"

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
 readonly label: string
 readonly field: AnyFieldApi
}

export function FormField({ label, field, className, type, ...props }: FormFieldProps) {
  const isPassword = type === "password"
  const [showPassword, setShowPassword] = React.useState(false)
  const passwordInputType = showPassword ? "text" : "password"



  return (
    <div className={cn("space-y-2.5", className)}>
      <Label htmlFor={field.name}>{label}</Label>
      <div className={cn("relative", isPassword && "flex items-center")}>
        <Input
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          type={isPassword ? passwordInputType : type}
          className={cn(
            field.state.meta.errors.length > 0 && "border-destructive focus-visible:ring-destructive",
            isPassword && "pr-10"
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {field.state.meta.errors.length > 0 && (
        <p className="text-[0.8rem] -mt-1 text-destructive">
          {field.state.meta.errors[0]?.message}
        </p>
      )}
    </div>
  )
}
