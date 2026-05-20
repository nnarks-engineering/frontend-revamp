import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface MissionVisionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  illustration: string;
  color: string; // hex or tailwind class for the wrapper
  number: string;
  isReversed?: boolean;
}

export function MissionVisionCard({
  title,
  description,
  icon: _Icon,
  illustration,
  color,
}: MissionVisionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative group w-full"
    >
      {/* Outer Wrapper / Folder Shape */}


      {/* Inner White Card */}
      <div className="relative sm:h-72  group-first:rounded-br-[6rem] group-first:pl-6 group-last:pr-6 group-last:rounded-bl-[6rem]  group-odd:bg-secondary group-last:bg-gray-100 flex flex-row group-odd:flex-row-reverse items-center gap-6 md:gap-8 min-h-[280px]">
        {/* Left: Illustration (Small/Compact) */}
        <div className="h-full max-w-1/3 w-auto">
          <img
            src={illustration}
            alt={title}
            className="w-full h-full  object-contain transition-transform duration-500"
          />
        </div>

        {/* Right: Content */}
        <div className="flex flex-col items-center sm:items-start sm:text-left space-y-4 flex-1">
          {/* <div className={cn(
            "w-12 h-12 flex items-center justify-center border-2 shrink-0 rounded-2xl",
            color === "warning" ? "border-primary-600/20 bg-primary-600/5" : "border-primary-600/20 bg-primary-600/5"
          )}>
            <Icon className="w-6 h-6 text-primary-700" strokeWidth={1.5} />
          </div> */}


          <div className="space-y-2">
            <h3 className={cn(color === "warning" ? "text-primary-950" : "text-gray-900", "text-xl md:text-2xl font-black font-clash-display tracking-wider uppercase")}>
              {title}
            </h3>
            <p className={cn(color === "warning" ? "text-primary-900" : "text-gray-600", "text-sm md:text-base leading-relaxed font-medium line-clamp-4")}>
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

