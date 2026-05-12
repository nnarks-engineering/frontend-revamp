import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Section } from "../../Section";
import { FeatureCard } from "../../FeatureCard";

// Import images for the pain points / personas
import NurseImg from "@/assets/img/landing/nurse-london.png";
import EngineerImg from "@/assets/img/landing/engineer-ny.png";
import TeacherImg from "@/assets/img/landing/teacher-toronto.png";
import DiasporaImg from "@/assets/img/landing/diaspora.webp";
import AgricultureImg from "@/assets/img/landing/agriculture.webp";
import ContractorImg from "@/assets/img/landing/contractor.webp";
import DrawingCoilsSvg from "@/assets/drawing-coils.svg?react";

const PersonasSection = () => {
  const { t } = useTranslation(["landing"]);
  const items = t("landing:aboutWhoWeServe.items", { returnObjects: true }) as string[];

  const images = [
    NurseImg,
    EngineerImg,
    TeacherImg,
    DiasporaImg,
    AgricultureImg,
    ContractorImg,
  ];

  return (
    <Section id="personas" className="py-24 relative overflow-hidden bg-white dark:bg-background" maxWidth="8xl">
      <DrawingCoilsSvg
        className="absolute inset-0 w-full h-full text-secondary/30 pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 mb-24 text-center space-y-4">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary font-bold tracking-widest uppercase text-sm"
        >
          {t("landing:aboutWhoWeServe.title")}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-7xl font-bold font-clash-display text-slate-900"
        >
          {t("landing:aboutWhoWeServe.headline")}
        </motion.h2>
      </div>

      <div className="flex flex-col gap-12 max-w-[1400px] mx-auto px-4">
        {items.map((item, index) => (
          <FeatureCard
            key={index}
            id={`case-study-${index}`}
            title={`Case Study 0${index + 1}`}
            description={item}
            image={images[index % images.length]}
            index={index}
            pill={{
              customContent: (
                <div className="flex items-center gap-4 text-primary font-bold cursor-pointer group/link p-2 pr-4">
                  <span>How we solve this</span>
                  <div className="w-8 h-px bg-primary/30 group-hover/link:w-12 transition-all" />
                </div>
              )
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-32 max-w-5xl mx-auto text-center px-4"
      >
        <div className="p-12 md:p-20 bg-primary rounded-[4rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h4 className="text-2xl md:text-4xl font-bold font-clash-display leading-tight relative z-10">
            {t("landing:aboutWhoWeServe.footer")}
          </h4>
        </div>
      </motion.div>
    </Section>
  );
};

export default PersonasSection;
