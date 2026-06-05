import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/shared/lib/utils"

const PageLayout = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex-1 min-w-0 bg-background rounded-2xl overflow-clip min-h-100", className)}
      {...props}
    />
  )
)
PageLayout.displayName = "PageLayout"

const pageLayoutHeaderVariants = cva(
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

const PageLayoutHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof pageLayoutHeaderVariants>
>(({ className, variant, children, ...props }, ref) => (
  <div ref={ref} className={cn(pageLayoutHeaderVariants({ variant, className }))} {...props}>
    {children}
  </div>
))
PageLayoutHeader.displayName = "PageLayoutHeader"

const PageLayoutHeaderDecorations = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("absolute inset-0 pointer-events-none", className)} {...props} />
  )
)
PageLayoutHeaderDecorations.displayName = "PageLayoutHeaderDecorations"

const PageLayoutHeaderContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("relative z-10 flex-1", className)} {...props} />
  )
)
PageLayoutHeaderContent.displayName = "PageLayoutHeaderContent"

const PageLayoutTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h1 ref={ref} className={cn("text-2xl font-bold text-foreground font-millik", className)} {...props} />
  )
)
PageLayoutTitle.displayName = "PageLayoutTitle"

const PageLayoutDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-muted-foreground mt-1 text-sm", className)} {...props} />
  )
)
PageLayoutDescription.displayName = "PageLayoutDescription"

const PageLayoutHeaderActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("relative z-10 shrink-0 flex items-center gap-2", className)} {...props} />
  )
)
PageLayoutHeaderActions.displayName = "PageLayoutHeaderActions"

const PageLayoutTabsContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-6", className)} {...props} />
  )
)
PageLayoutTabsContainer.displayName = "PageLayoutTabsContainer"

const PageLayoutToolbar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-3 border rounded-t-lg p-4 border-border", className)}
      {...props}
    />
  )
)
PageLayoutToolbar.displayName = "PageLayoutToolbar"

const PageLayoutToolbarCenter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 flex justify-center", className)} {...props} />
  )
)
PageLayoutToolbarCenter.displayName = "PageLayoutToolbarCenter"

const PageLayoutToolbarRight = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("shrink-0 flex items-center gap-2", className)} {...props} />
  )
)
PageLayoutToolbarRight.displayName = "PageLayoutToolbarRight"

export {
  PageLayout,
  PageLayoutHeader,
  PageLayoutHeaderDecorations,
  PageLayoutHeaderContent,
  PageLayoutTitle,
  PageLayoutDescription,
  PageLayoutHeaderActions,
  PageLayoutTabsContainer,
  PageLayoutToolbar,
  PageLayoutToolbarCenter,
  PageLayoutToolbarRight,
}
