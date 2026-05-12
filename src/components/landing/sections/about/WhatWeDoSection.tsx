import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Section } from "../../Section";
import { ShieldCheck, Eye, CheckCircle2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import illustration from "@/assets/img/landing/illustration.webp";

export default function WhatWeDoSection() {
  const { t } = useTranslation(["landing"]);
  const items = t("landing:aboutWhatWeDo.items", { returnObjects: true }) as string[];
  const footerText = t("landing:aboutWhatWeDo.footer");

  const icons = [ShieldCheck, Eye, CheckCircle2, Smartphone];

  return (
    <Section className="bg-white py-24 md:py-32" contentClassName="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 md:mb-32">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-10"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.1] font-clash-display">
            {t("landing:aboutWhatWeDo.headline")}
          </h2>
          <p className="text-sm md:text-base text-neutral-500 max-w-xl leading-relaxed font-medium">
            {t("landing:aboutWhatWeDo.description")}
          </p>
          <Button className="rounded-full px-8 text-primary-50 py-7 text-lg font-bold transition-all hover:scale-105 active:scale-95 border-none shadow-none">
            {t("landing:aboutJoin.cta")}
          </Button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="flex justify-center lg:justify-end"
        >
          <img 
            src={illustration} 
            alt="Accountability Illustration" 
            className="w-full max-w-[500px] h-auto object-contain"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x !divide-primary divide-dashed lg:grid-cols-4 mb-20">
        {items.map((item, index) => {
          const Icon = icons[index] || ShieldCheck;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="space-y-6 p-6 md:py-0 flex md:block gap-4  transition-colors"
            >
              <div className="w-14 h-14 aspect-square bg-primary-50 flex items-center justify-center text-primary-600">
                <Icon className="w-7 h-7 stroke-[1.5]" />
              </div>
              <p className="text-sm md:text-base font-normal text-foreground">
                {item}
              </p>
            </motion.div>
          );
        })}
      </div>

      {footerText && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="p-8 md:p-12 bg-primary-950 text-white rounded-[2.5rem] shadow-xl">
            <p className="text-xl md:text-2xl font-medium leading-relaxed opacity-90">
              {footerText}
            </p>
          </div>
        </motion.div>
      )}
    </Section>
  );
}
