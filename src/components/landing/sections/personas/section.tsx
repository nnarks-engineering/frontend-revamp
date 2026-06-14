import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import DrawingCoilsSvg from "@/assets/drawing-coils.svg?react";
import AgricultureImg from "@/assets/img/landing/agriculture.webp";
import ContractorImg from "@/assets/img/landing/contractor.webp";
import DiasporaImg from "@/assets/img/landing/diaspora.webp";
import EngineerImg from "@/assets/img/landing/engineer-ny.png";
import NurseImg from "@/assets/img/landing/nurse-london.png";
import TeacherImg from "@/assets/img/landing/teacher-toronto.png";

import { FeatureCard } from "../../FeatureCard";
import { Section } from "../../Section";

// Import images for the pain points / personas

const PersonasSection = () => {
  const { t } = useTranslation(["landing", "common"]);
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

        <div className="relative z-10 px-4 mb-10 text-left space-y-4">
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
      </Section>
  );
};

export default PersonasSection;
