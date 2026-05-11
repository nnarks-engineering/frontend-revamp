import { motion } from "motion/react";
import { type StructureItem } from "./locals";
import { cn } from "@/shared/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface StructureCardProps {
  item: StructureItem;
  index: number;
  layoutIdPrefix: string;
  onClick: () => void;
}

export function StructureCard({
  item,
  index,
  layoutIdPrefix,
  onClick,
}: StructureCardProps) {
  const { t } = useTranslation(["landing"]);
  const isReversed = index % 2 !== 0;

  // Type-safe access to features array from translation
  const featuresRaw = (t as any)(`landing:structure.items.${item.key}.features`, { returnObjects: true });
  const features = Array.isArray(featuresRaw) ? featuresRaw : [];

  return (
    <motion.div
      layoutId={`card-${item.id}-${layoutIdPrefix}`}
      onClick={onClick}
      className={cn(
        "group relative w-full flex flex-col md:flex-row items-stretch overflow-hidden bg-secondary/50 cursor-pointer transition-all duration-500 hover:shadow-xl",
        isReversed && "md:flex-row-reverse"
      )}
    >
      {/* Image Side */}
      <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto min-h-[300px] overflow-hidden">
        <motion.img
          layoutId={`image-${item.id}-${layoutIdPrefix}`}
          src={item.image}
          alt={t(`landing:structure.items.${item.key}.title` as any)}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Floating Pill */}
        <motion.div 
          layoutId={`pill-${item.id}-${layoutIdPrefix}`}
          className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex items-center bg-white rounded-full p-1.5 pr-6 shadow-lg border border-white/20 backdrop-blur-sm"
        >
          <div className="flex items-center justify-center size-10 rounded-full bg-primary/20 text-primary">
            <item.icon size={20} />
          </div>
          <div className="ml-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-none">
              {t(`landing:structure.items.${item.key}.pillText` as any)}
            </p>
            <p className="text-sm font-bold text-foreground">
              {t(`landing:structure.items.${item.key}.pillValue` as any)}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Content Side */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.span 
            layoutId={`subtitle-${item.id}-${layoutIdPrefix}`}
            className="inline-block text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4"
          >
            {t(`landing:structure.items.${item.key}.subtitle` as any)}
          </motion.span>
          
          <motion.h3 
            layoutId={`title-${item.id}-${layoutIdPrefix}`}
            className="text-3xl md:text-5xl font-millik leading-[1.1] text-foreground mb-6"
          >
            {t(`landing:structure.items.${item.key}.title` as any)}
          </motion.h3>
          
          <motion.p 
            layoutId={`description-${item.id}-${layoutIdPrefix}`}
            className="text-muted-foreground text-lg mb-8 max-w-md leading-relaxed"
          >
            {t(`landing:structure.items.${item.key}.description` as any)}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
