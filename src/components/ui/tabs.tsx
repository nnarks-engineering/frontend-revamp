import * as TabsPrimitive from "@radix-ui/react-tabs";
import { useEffect, useRef, useState, createContext, useContext } from "react";
import type * as React from "react";
import { cn } from "@/shared/lib/utils";

type TabsVariant = "default" | "tertiary" | "primary";
const TabsVariantContext = createContext<TabsVariant>("default");

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  variant = "default",
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & { variant?: TabsVariant }) {
  const ref = useRef<React.ComponentRef<typeof TabsPrimitive.List>>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const active = el.querySelector<HTMLElement>(
        '[data-slot="tabs-trigger"][data-state="active"]',
      );
      if (!active) return;
      const listRect = el.getBoundingClientRect();
      const tabRect = active.getBoundingClientRect();
      setIndicator({ left: tabRect.left - listRect.left, width: tabRect.width });
    };

    update();
    const el = ref.current;
    const observer = new MutationObserver(update);
    if (el) {
      observer.observe(el, { attributes: true, attributeFilter: ["data-state"], subtree: true });
    }
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsPrimitive.List
        ref={ref}
        data-slot="tabs-list"
        className={cn(
          "relative inline-flex h-9 w-fit gap-1 rounded-md p-1 text-muted-foreground",
          variant === "default" && "bg-slate-100",
          variant === "tertiary" && "bg-tertiary-50",
          variant === "primary" && "bg-primary-50",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-1 z-1 rounded-[0.35rem] transition-[left,width] duration-300 ease-in-out",
            variant === "default" && "bg-primary-300",
            variant === "tertiary" && "bg-tertiary-200",
            variant === "primary" && "bg-primary-200",
          )}
          style={{ left: indicator.left, width: indicator.width }}
        />
        {children}
      </TabsPrimitive.List>
    </TabsVariantContext.Provider>
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const variant = useContext(TabsVariantContext);
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative z-2 inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md border-transparent px-3 py-1 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        variant === "default" && "data-[state=active]:text-foreground",
        variant === "tertiary" && "data-[state=active]:text-tertiary-800",
        variant === "primary" && "data-[state=active]:text-primary-800",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };

