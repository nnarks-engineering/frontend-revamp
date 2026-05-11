import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../../Section";
import { Shield, Target, Zap, Cpu, Map } from "lucide-react";

const icons = [Shield, Target, Zap, Cpu, Map];

export default function PillarsSection() {
  const { t } = useTranslation(["landing"]);
  const items = t("landing:aboutPillars.items", { returnObjects: true }) as { title: string; description: string }[];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Section className="bg-white py-32" contentClassName="max-w-7xl mx-auto px-4">
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold font-clash-display">
            {t("landing:aboutPillars.title")}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length];
            const isActive = activeTab === index;
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`
                  flex items-center gap-2 px-6 py-4 rounded-full transition-all duration-300 font-bold text-lg
                  ${isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105" 
                    : "bg-neutral-50 text-neutral-400 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-primary-foreground" : "text-neutral-400"}`} />
                {item.title}
              </button>
            );
          })}
        </div>

        <div className="relative min-h-[400px] bg-neutral-50 dark:bg-neutral-900/50 rounded-[3rem] p-8 md:p-16 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <div className="space-y-8">
                <h3 className="text-4xl md:text-6xl font-bold font-clash-display leading-tight">
                  {items[activeTab].title}
                </h3>
                <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed font-medium">
                  {items[activeTab].description}
                </p>
                <div className="pt-4">
                   <div className="w-20 h-2 bg-primary rounded-full" />
                </div>
              </div>

              <div className="aspect-video bg-white dark:bg-neutral-800 rounded-3xl shadow-inner flex items-center justify-center p-8 relative">
                 {/* Visual placeholder for the pillar's concept */}
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl" />
                 {(() => {
                    const Icon = icons[activeTab % icons.length];
                    return <Icon className="w-32 h-32 text-primary opacity-20" />;
                 })()}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
