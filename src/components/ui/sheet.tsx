import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import RoundingLine from "@/assets/svg/rounding-line.svg?react";

import { cn } from "@/shared/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-40 bg-black/55 backdrop-blur-[1px]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

type SheetSide = "top" | "right" | "bottom" | "left";

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: SheetSide;
}

const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => {
  const sideClasses: Record<SheetSide, string> = {
    top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
    right:
      "inset-y-0 right-0 h-full w-full max-w-105 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
    bottom:
      "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
    left:
      "inset-y-0 left-0 h-full w-full max-w-105 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
  };

  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed z-50 bg-background-space shadow-2xl border-border/50",
          "transition ease-out data-[state=open]:animate-in data-[state=closed]:animate-out duration-300",
          sideClasses[side],
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </SheetPortal>
  );
});
SheetContent.displayName = DialogPrimitive.Content.displayName;

const sheetHeaderVariants = cva(
  "relative overflow-hidden shrink-0 px-6 pt-6 pb-5 border-b",
  {
    variants: {
      variant: {
        primary: "bg-primary-bg text-primary-fg border-primary-200/50",
        secondary: "bg-secondary text-secondary-foreground border-secondary/50",
        tertiary: "bg-tertiary-bg text-tertiary-fg border-tertiary-600/20",
      },
    },
    defaultVariants: {
      variant: "tertiary",
    },
  }
);

interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sheetHeaderVariants> {
  withIllustration?: boolean;
}

const SheetHeader = ({
  className,
  variant,
  withIllustration = true,
  children,
  ...props
}: SheetHeaderProps) => {
  const illustrationColors = {
    primary: "text-primary-bg-hover",
    secondary: "text-secondary-foreground",
    tertiary: "text-tertiary-bg-hover",
  };

  return (
    <div
      className={cn(sheetHeaderVariants({ variant, className }))}
      {...props}
    >
      {withIllustration && (
        <RoundingLine className={cn("absolute z-0 -top-6 left-0 opacity-50 scale-x-[-1]", variant ? illustrationColors[variant] : illustrationColors.tertiary)} aria-hidden />
      )}
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="flex flex-col gap-2">{children}</div>
        <SheetClose className="p-2 -mr-2 rounded-lg opacity-70 hover:opacity-100 hover:bg-black/10 transition-all focus:outline-none focus:ring-2 focus:ring-inherit focus:ring-offset-2">
          <X className="w-5 h-5" />
          <span className="sr-only">Close</span>
        </SheetClose>
      </div>
    </div>
  );
};
SheetHeader.displayName = "SheetHeader";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-3xl leading-none font-millik text-inherit", className)}
    {...props}
  />
));
SheetTitle.displayName = DialogPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-inherit opacity-80 text-base", className)}
    {...props}
  />
));
SheetDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
};
