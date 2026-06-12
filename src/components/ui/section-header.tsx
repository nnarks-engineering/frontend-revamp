import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

/* ── Eyebrow (small label above the title) ── */
const eyebrowVariants = cva(
  "inline-block font-semibold tracking-widest uppercase text-xs mb-3",
  {
    variants: {
      variant: {
        default: "text-primary",
        muted: "text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface EyebrowProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof eyebrowVariants> {}

const Eyebrow = React.forwardRef<HTMLParagraphElement, EyebrowProps>(
  ({ className, variant, ...props }, ref) => (
    <p ref={ref} className={cn(eyebrowVariants({ variant }), className)} {...props} />
  )
)
Eyebrow.displayName = "Eyebrow"

/* ── SectionTitle ── */
const sectionTitleVariants = cva(
  "font-millik leading-[1.1] tracking-tight text-foreground",
  {
    variants: {
      size: {
        sm: "text-2xl sm:text-3xl",
        md: "text-3xl sm:text-4xl",
        lg: "text-4xl sm:text-5xl lg:text-6xl",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      size: "md",
      align: "center",
    },
  }
)

export interface SectionTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof sectionTitleVariants> {
  as?: "h1" | "h2" | "h3"
}

const SectionTitle = React.forwardRef<HTMLHeadingElement, SectionTitleProps>(
  ({ className, size, align, as: Tag = "h2", ...props }, ref) => (
    <Tag ref={ref} className={cn(sectionTitleVariants({ size, align }), className)} {...props} />
  )
)
SectionTitle.displayName = "SectionTitle"

/* ── SectionDescription ── */
const sectionDescriptionVariants = cva(
  "text-muted-foreground leading-relaxed",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base sm:text-lg",
        lg: "text-lg sm:text-xl",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      size: "md",
      align: "center",
    },
  }
)

export interface SectionDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof sectionDescriptionVariants> {}

const SectionDescription = React.forwardRef<HTMLParagraphElement, SectionDescriptionProps>(
  ({ className, size, align, ...props }, ref) => (
    <p ref={ref} className={cn(sectionDescriptionVariants({ size, align }), className)} {...props} />
  )
)
SectionDescription.displayName = "SectionDescription"

/* ── SectionHeader (wrapper that composes all three) ── */
export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: string
  eyebrowVariant?: VariantProps<typeof eyebrowVariants>["variant"]
  title: React.ReactNode
  description?: React.ReactNode
  titleSize?: VariantProps<typeof sectionTitleVariants>["size"]
  align?: VariantProps<typeof sectionTitleVariants>["align"]
  as?: SectionTitleProps["as"]
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      className,
      eyebrow,
      eyebrowVariant,
      title,
      description,
      titleSize,
      align = "center",
      as,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col",
        align === "center" && "items-center",
        align === "right" && "items-end",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <Eyebrow variant={eyebrowVariant} className={cn(align === "center" && "text-center", align === "right" && "text-right")}>
          {eyebrow}
        </Eyebrow>
      )}
      <SectionTitle size={titleSize} align={align} as={as}>
        {title}
      </SectionTitle>
      {description && (
        <SectionDescription align={align} className="mt-3 max-w-2xl">
          {description}
        </SectionDescription>
      )}
    </div>
  )
)
SectionHeader.displayName = "SectionHeader"

export { Eyebrow, SectionDescription, SectionHeader, SectionTitle }

