import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Section } from "../../Section";
import { HelpCircle } from "lucide-react";

export default function WhoWeServeSection() {
  const { t } = useTranslation(["landing"]);
  const items = t("landing:aboutWhoWeServe.items", { returnObjects: true }) as string[];

  return (
    <Section className="bg-white py-32" contentClassName="max-w-7xl mx-auto px-4">
      <div className="flex flex-col gap-20">
        <div className="text-center space-y-6">
           <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase"
          >
            {t("landing:aboutWhoWeServe.title")}
          </motion.span>
          <h2 className="text-4xl md:text-7xl font-bold font-clash-display leading-tight">
            {t("landing:aboutWhoWeServe.headline")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-[3rem] space-y-6 group hover:bg-primary transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                <HelpCircle className="w-6 h-6 text-primary group-hover:text-white" />
              </div>
              <p className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-white transition-colors">
                {item}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center max-w-4xl mx-auto pt-10">
          <p className="text-2xl md:text-4xl font-bold leading-tight text-primary font-clash-display">
            {t("landing:aboutWhoWeServe.footer")}
          </p>
        </div>
      </div>
    </Section>
  );
}
