import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { Section } from "../../Section";

export default function TeamSection() {
  const { t } = useTranslation(["landing"]);
  const partners = t("landing:aboutTeam.backedBy.partners", { returnObjects: true }) as string[];

  return (
    <Section className="bg-white py-32" contentClassName="max-w-7xl mx-auto px-4 space-y-32">
      <div className="flex flex-col items-center text-center space-y-16">
        <div className="space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase"
          >
            {t("landing:aboutTeam.title")}
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold font-clash-display">
            The people behind the mission
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square md:aspect-[16/9] bg-neutral-100 rounded-[4rem] overflow-hidden border border-neutral-200 relative group"
          >
            {/* Placeholder for Founder Photo */}
            <div className="w-full h-full flex items-center justify-center text-neutral-300 font-bold text-4xl">
              [Founder Photo]
            </div>
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors" />
          </motion.div>

          <div className="space-y-6">
            <h3 className="text-3xl md:text-5xl font-bold font-clash-display">
              {t("landing:aboutTeam.founder.name")}
            </h3>
            <p className="text-xl md:text-2xl font-bold text-primary">
              {t("landing:aboutTeam.founder.role")}
            </p>
            <p className="text-xl md:text-3xl text-foreground/70 leading-relaxed font-medium max-w-3xl mx-auto">
              {t("landing:aboutTeam.founder.bio")}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-neutral-50 rounded-[4rem] p-12 md:p-24 text-center space-y-16">
        <h3 className="text-3xl md:text-5xl font-bold font-clash-display">
          {t("landing:aboutTeam.backedBy.title")}
        </h3>
        
        <div className="flex flex-wrap justify-center gap-16 items-center">
          {partners.map((partner, index) => (
            <div key={index} className="text-3xl md:text-5xl font-bold font-clash-display tracking-tighter opacity-40 hover:opacity-100 transition-opacity">
              {partner}
            </div>
          ))}
          <div className="text-lg md:text-xl font-medium text-foreground/40 italic max-w-lg">
            "Supported by world-class organizations believing in a transparent Africa."
          </div>
        </div>
      </div>
    </Section>
  );
}
