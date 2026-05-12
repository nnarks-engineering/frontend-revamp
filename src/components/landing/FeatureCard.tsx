import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { ArrowRight, type LucideIcon } from "lucide-react";
import {type ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
  pill?: {
    icon?: LucideIcon;
    label?: string;
    value?: string;
    customContent?: ReactNode;
  };
  onClick?: () => void;
  className?: string;
  layoutIdPrefix?: string;
  id: string | number;
}

export function FeatureCard({
  title,
  description,
  image,
  index,
  pill,
  onClick,
  className,
  layoutIdPrefix = "shared",
  id,
}: FeatureCardProps) {
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      layoutId={layoutIdPrefix ? `card-${id}-${layoutIdPrefix}` : undefined}
      onClick={onClick}
      className={cn(
        "group relative w-full flex flex-col md:flex-row items-stretch overflow-hidden bg-secondary/50 cursor-pointer transition-all duration-500",
        isReversed && "md:flex-row-reverse",
        className
      )}
    >
      {/* Image Side */}
      <div className={cn(
        "relative w-full md:w-1/2 md:aspect-auto min-h-[300px] md:min-h-[450px] overflow-hidden rounded-b-3xl md:rounded-none",
        isReversed ? "md:rounded-bl-3xl" : "md:rounded-br-3xl"
      )}>
        <motion.img
          layoutId={layoutIdPrefix ? `image-${id}-${layoutIdPrefix}` : undefined}
          src={image}
          alt={title}
          className="h-full w-full max-h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Floating Pill */}
        {pill && (
          <motion.div 
            layoutId={layoutIdPrefix ? `pill-${id}-${layoutIdPrefix}` : undefined}
            className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex items-center bg-white rounded-full p-1.5 pr-6 border border-white/20 backdrop-blur-sm overflow-hidden z-20"
          >
            {pill.customContent ? (
              pill.customContent
            ) : (
              <>
                {/* Normal State: Icon + Text */}
                <div className="flex items-center transition duration-500 group-hover:translate-x-40">
                  {pill.icon && (
                    <div className="flex items-center justify-center size-10 rounded-full bg-primary/20 text-primary shrink-0">
                      <pill.icon size={20} />
                    </div>
                  )}
                  <div className="ml-3 whitespace-nowrap">
                    {pill.label && (
                      <p className="text-sm font-semibold text-foreground leading-none">
                        {pill.label}
                      </p>
                    )}
                    {pill.value && (
                      <p className="text-xs font-medium text-muted-foreground mt-1">
                        {pill.value}
                      </p>
                    )}
                  </div>
                </div>

                {/* Hover State: "More" + Arrow */}
                <div className="absolute inset-0 flex items-center px-1.5 transition duration-500 -translate-x-40 group-hover:translate-x-0">
                  <div className="flex items-center justify-center size-10 rounded-full bg-primary text-white shrink-0">
                    <ArrowRight size={20} />
                  </div>
                  <span className="ml-3 font-bold text-foreground">More</span>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>

      {/* Content Side */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.h3 
            layoutId={layoutIdPrefix ? `title-${id}-${layoutIdPrefix}` : undefined}
            className="text-3xl md:text-5xl font-millik leading-[1.1] text-foreground"
          >
            {title}
          </motion.h3>
          
          <motion.p 
            layoutId={layoutIdPrefix ? `description-${id}-${layoutIdPrefix}` : undefined}
            className="text-muted-foreground text-lg mb-8 max-w-md leading-relaxed"
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
