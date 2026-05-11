import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Section } from "../../Section";
import { CheckCircle2 } from "lucide-react";

export default function WhatWeDoSection() {
  const { t } = useTranslation(["landing"]);
  const items = t("landing:aboutWhatWeDo.items", { returnObjects: true }) as string[];

  return (
    <Section className="bg-neutral-50 py-32" contentClassName="max-w-7xl mx-auto px-4">
      <div className="flex flex-col gap-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold font-clash-display leading-tight">
            {t("landing:aboutWhatWeDo.headline")}
          </h2>
          <p className="text-xl md:text-2xl text-foreground/60 leading-relaxed">
            {t("landing:aboutWhatWeDo.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6 items-start p-8 bg-white rounded-3xl shadow-sm border border-neutral-100"
            >
              <CheckCircle2 className="w-8 h-8 text-primary shrink-0 mt-1" />
              <p className="text-xl md:text-2xl font-bold leading-tight">
                {item}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto w-full">
            <div className="relative group">
                <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-primary-950 text-white rounded-[3rem] p-12 md:p-20 text-center space-y-8">
                    <p className="text-2xl md:text-4xl font-medium leading-relaxed max-w-4xl mx-auto">
                        {t("landing:aboutWhatWeDo.footer")}
                    </p>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                </div>
            </div>
        </div>
      </div>
    </Section>
  );
}
