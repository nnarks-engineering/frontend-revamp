import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import NnarksRibbonSvg from "@/assets/next_ribbon_text.svg?react"

import { Section } from "../../Section";

import LandingUserGallery from "./galary";



const CustomersSection = () => {
  const { t } = useTranslation("landing");

  return (
    <Section id="customers" className="pt-24 relative overflow-hidden bg-white dark:bg-background">
      <div className="container mx-auto px-4">
        <div className="relative z-30 max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-4xl font-black  mb-6 font-clash-display leading-none">
              {t("customers.title")}
            </h2>
            <p className=" max-w-2xl mx-auto leading-relaxed opacity-90">
              {t("customers.description")}
            </p>
          </motion.div>
        </div>
          <NnarksRibbonSvg className=" absolute scale-y-[-1] rotate-45 z-20 top-0 -left-40 w-[140svw]  cursor-none pointer-events-none"/>

        <div className="flex flex-col items-center relative z-30">


          {/* Gallery Component */}
          <div className="flex-1 w-full relative">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <LandingUserGallery />
            </motion.div>
            
            {/* Background Glow */}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CustomersSection;
