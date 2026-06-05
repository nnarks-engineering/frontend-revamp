import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/shared/lib/utils"

const ModuleLayout = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex-1 min-w-0 bg-background rounded-2xl overflow-clip min-h-100", className)}
      {...props}
    />
  )
)
ModuleLayout.displayName = "ModuleLayout"

const ModuleLayoutHeaderVariants = cva(
  "relative overflow-hidden flex items-start justify-between gap-4 p-6",
  {
    variants: {
      variant: {
        primary: "bg-primary-50",
        tertiary: "bg-tertiary-100",
      },
    },
    defaultVariants: {
      variant: "tertiary",
    },
  }
)

const ModuleLayoutHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof ModuleLayoutHeaderVariants>
>(({ className, variant, children, ...props }, ref) => (
  <div ref={ref} className={cn(ModuleLayoutHeaderVariants({ variant, className }))} {...props}>
    {children}
  </div>
))
ModuleLayoutHeader.displayName = "ModuleLayoutHeader"

const ModuleLayoutHeaderDecorations = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("absolute inset-0 pointer-events-none", className)} {...props} />
  )
)
ModuleLayoutHeaderDecorations.displayName = "ModuleLayoutHeaderDecorations"

const ModuleLayoutHeaderContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("relative z-10 flex-1", className)} {...props} />
  )
)
ModuleLayoutHeaderContent.displayName = "ModuleLayoutHeaderContent"

const ModuleLayoutTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h1 ref={ref} className={cn("text-2xl font-bold text-foreground font-millik", className)} {...props} />
  )
)
ModuleLayoutTitle.displayName = "ModuleLayoutTitle"

const ModuleLayoutDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-muted-foreground mt-1 text-sm", className)} {...props} />
  )
)
ModuleLayoutDescription.displayName = "ModuleLayoutDescription"

const ModuleLayoutHeaderActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("relative z-10 shrink-0 flex items-center gap-2", className)} {...props} />
  )
)
ModuleLayoutHeaderActions.displayName = "ModuleLayoutHeaderActions"

const ModuleLayoutTabsContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-6", className)} {...props} />
  )
)
ModuleLayoutTabsContainer.displayName = "ModuleLayoutTabsContainer"

const ModuleLayoutToolbar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-3 border rounded-t-lg p-4 border-border", className)}
      {...props}
    />
  )
)
ModuleLayoutToolbar.displayName = "ModuleLayoutToolbar"

const ModuleLayoutToolbarCenter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 flex justify-center", className)} {...props} />
  )
)
ModuleLayoutToolbarCenter.displayName = "ModuleLayoutToolbarCenter"

const ModuleLayoutToolbarRight = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("shrink-0 flex items-center gap-2", className)} {...props} />
  )
)
ModuleLayoutToolbarRight.displayName = "ModuleLayoutToolbarRight"

export {
  ModuleLayout,
  ModuleLayoutHeader,
  ModuleLayoutHeaderDecorations,
  ModuleLayoutHeaderContent,
  ModuleLayoutTitle,
  ModuleLayoutDescription,
  ModuleLayoutHeaderActions,
  ModuleLayoutTabsContainer,
  ModuleLayoutToolbar,
  ModuleLayoutToolbarCenter,
  ModuleLayoutToolbarRight,
}

