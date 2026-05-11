import { useState, useId, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/shared/hooks/use-outside-click";
import { structureData, type StructureItem } from "./locals";
import { StructureCard } from "./card";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import { Section } from "../../Section";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/ui/section-header";

export default function StructureSection() {
  const { t } = useTranslation(["landing"]);
  const [active, setActive] = useState<StructureItem | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setActive(null));

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [active]);

  return (
    <Section id="structure" className="relative py-24 bg-white overflow-hidden" maxWidth="8xl">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header */}
        <SectionHeader
          eyebrow={t("landing:structure.badge")}
          title={t("landing:structure.title")}
          description={t("landing:structure.description")}
          titleSize="lg"
          className="mb-20 text-left backdrop-blur-3xl"
          align='left'
        />

        {/* Cards Grid */}
        <div className="flex flex-col gap-12">
          {structureData.map((item, index) => (
            <StructureCard
              key={item.id}
              item={item}
              index={index}
              layoutIdPrefix={id}
              onClick={() => setActive(item)}
            />
          ))}
        </div>

        {/* Expanded View */}
        <AnimatePresence>
          {active && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-[1px] z-[100]"
              />
              <div className="fixed inset-0 grid place-items-center z-[101] p-4">
                <motion.div
                  layoutId={`card-${active.id}-${id}`}
                  ref={ref}
                  className="relative w-full max-w-[900px] max-h-[90vh] overflow-hidden bg-white flex flex-col md:flex-row shadow-2xl"
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setActive(null)}
                    className="absolute top-6 right-6 z-10 size-12 flex items-center justify-center bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all border border-white/20"
                  >
                    <X size={24} />
                  </button>

                  {/* Left: Image */}
                  <div className="w-full md:w-5/12 h-64 md:h-auto relative overflow-hidden">
                    <motion.img
                      layoutId={`image-${active.id}-${id}`}
                      src={active.image}
                      alt={t(`landing:structure.items.${active.key}.title` as any)}
                      className="h-full w-full object-cover"
                    />
                    
                    {/* Expanded Pill */}
                    <motion.div 
                      layoutId={`pill-${active.id}-${id}`}
                      className="absolute bottom-6 left-6 flex items-center bg-white/90 backdrop-blur-md rounded-full p-2 pr-6 shadow-xl"
                    >
                      <div className="flex items-center justify-center size-10 rounded-full bg-primary text-white">
                        <active.icon size={20} />
                      </div>
                      <div className="ml-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-none">
                          {t(`landing:structure.items.${active.key}.pillText` as any)}
                        </p>
                        <p className="text-sm font-bold text-foreground">
                          {t(`landing:structure.items.${active.key}.pillValue` as any)}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right: Content */}
                  <div className="w-full md:w-7/12 p-8 md:p-12 overflow-y-auto">
                    <motion.span 
                      layoutId={`subtitle-${active.id}-${id}`}
                      className="inline-block text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4"
                    >
                      {t(`landing:structure.items.${active.key}.subtitle` as any)}
                    </motion.span>
                    
                    <motion.h3 
                      layoutId={`title-${active.id}-${id}`}
                      className="text-3xl md:text-5xl font-millik leading-tight text-foreground mb-6"
                    >
                      {t(`landing:structure.items.${active.key}.title` as any)}
                    </motion.h3>
                    
                    <motion.p 
                      layoutId={`description-${active.id}-${id}`}
                      className="text-muted-foreground text-lg mb-8 leading-relaxed"
                    >
                      {t(`landing:structure.items.${active.key}.description` as any)}
                    </motion.p>

                    <div className="space-y-6 mb-10">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/40">Core Capabilities</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(() => {
                          const features = (t as any)(`landing:structure.items.${active.key}.features`, { returnObjects: true });
                          return Array.isArray(features) ? features.map((feature, i) => (
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                              key={i} 
                              className="flex items-start gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/10"
                            >
                              <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
                              <span className="text-[15px] font-medium text-foreground leading-tight">{feature}</span>
                            </motion.div>
                          )) : null;
                        })()}
                      </div>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="p-6 rounded-3xl bg-foreground text-white"
                    >
                      <p className="text-white/70 text-sm mb-4 leading-relaxed italic">
                        "{t(`landing:structure.items.${active.key}.details` as any)}"
                      </p>
                      <button className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest hover:gap-3 transition-all">
                        {t("landing:structure.cta")} <ArrowRight size={16} />
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Line (similar to industries section) */}
      <div className="absolute inset-x-20 bottom-0 bg-gradient-to-r from-transparent via-primary-200 to-transparent h-[2px] w-3/4 blur-sm opacity-50" />
    </Section>
  );
}
