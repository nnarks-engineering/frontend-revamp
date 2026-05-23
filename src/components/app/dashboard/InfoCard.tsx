import { cn } from "@/shared/lib/utils";
import React from "react";

interface InfoCardProps {
  title: string;
  description: string;
  titleColor?: string;
  className?: string;
}

export function InfoCard({ title, description, titleColor = "text-primary", className }: InfoCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden bg-white rounded-2xl p-5 shadow-xs border border-border/40 h-full",
      className
    )}>
      {/* Decorative gradient blur */}
      <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />

      <h3 className={cn("text-[15px] font-bold tracking-wide mb-3 relative z-10", titleColor)}>
        {title}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed relative z-10">
        <strong className="font-semibold text-foreground/80">Remember: </strong>
        {description}
      </p>
    </div>
  );
}
