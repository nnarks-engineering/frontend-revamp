import AboutUsImg from "@/assets/img/landing/about-us.webp";
import ContractorImg from "@/assets/img/landing/contractor.webp";
import DiasporaImg from "@/assets/img/landing/diaspora.webp";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Section } from "../../Section";


export default function VisionSection() {
  const { t } = useTranslation(["landing"]);

  return (
    <Section className="bg-background overflow-clip relative h-[calc(100dvh-80px)] min-h-fit" contentClassName=" w-full  py-10 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

      <motion.div
        className="flex-1 space-y-6 z-10 "
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-clash-display font-bold">
          {t("landing:productVision.title")}
        </h2>
        <p className="text-xl leading-relaxed text-foreground/80 font-medium">
          {t("landing:productVision.statement")}
        </p>
        <div className="space-y-4 pt-4">
          <p className="leading-relaxed text-foreground/70">
            {t("landing:productVision.valueProposition")}
          </p>
          <p className="leading-relaxed text-foreground/70 ">
            {t("landing:productVision.positioning")}
          </p>
        </div>
      </motion.div>

      <motion.div
        className="flex-1 w-full z-10 relative h-[400px] md:h-[550px]"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* 3 Images Stacked/Fanned Layout */}
        <div className="relative w-full h-full min-h-[350px]">
          <motion.div
            className="absolute top-0 right-0 w-[75%] h-[75%]  overflow-hidden border-4 !border-background z-0"
            whileHover={{ rotate: 0, scale: 1.02 }}
            style={{ rotate: 4 }}
          >
            <img src={AboutUsImg} alt="Nnarks Vision" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-0 w-[55%] h-[60%]  overflow-hidden  border-4 !border-background z-10"
            whileHover={{ rotate: 0, scale: 1.05 }}
            style={{ rotate: -6 }}
          >
            <img src={DiasporaImg} alt="Diaspora Investment" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            className="absolute bottom-0 right-[0%] w-[45%] h-[45%]  overflow-hidden border-4 !border-background z-20 shadow-primary/20"
            whileHover={{ rotate: 0, scale: 1.1, zIndex: 30 }}
            style={{ rotate: 8, translateY: "-30%" }}
          >
            <img src={ContractorImg} alt="On-ground Execution" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
