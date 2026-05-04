import * as React from "react"
import { cn } from "@/shared/lib/utils"

interface AuthHeaderProps {
  title: string
  description?: React.ReactNode
  className?: string
}

export function AuthHeader({ title, description, className }: AuthHeaderProps) {
  return (
    <div className={cn("space-y-2.5 text-center lg:text-left", className)}>
      <h1 className="text-3xl font-semibold font-clash-display tracking-tight text-foreground">
        {title}
      </h1>
      {description && (
        <div className="text-muted-foreground leading-relaxed text-sm sm:text-base">
          {description}
        </div>
      )}
    </div>
  )
}
