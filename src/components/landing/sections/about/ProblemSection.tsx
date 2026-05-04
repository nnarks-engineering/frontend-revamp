import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import IllustrationImg from "@/assets/img/landing/illustration.png";
import { Section } from "../../Section";
import BottomDrawing from "@/assets/svg/bottom-drawing.svg?react";
import TopDrawing from "@/assets/drawing-coils.svg?react";

export default function ProblemSection() {
  const { t } = useTranslation(["landing"]);

  return (
    <Section className="bg-primary/20 overflow-clip relative h-[calc(100dvh-80px)]" contentClassName="  w-full  py-10 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
         <BottomDrawing 
        className="absolute left-0 bottom-0 w-full z-2 text-background" 
        style={{ '--svg-stroke': 'var(--background)' } as any}
      />
      <TopDrawing
      className="absolute right-0 top-0 w-full z-1 scale-x-[-1] text-white"
      style={{ '--svg-stroke': 'var(--background)' } as any}
      />
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-primary-200 to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-primary-300 to-transparent h-px w-3/4" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-primary-200 to-transparent h-[5px] w-2/4 blur-sm" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-px w-1/4" />
  

      <motion.div 
        className="flex-1 w-full z-10 bg-background overflow-clip"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative p-6 pt-0 pr-0 w-full">
          <img src={IllustrationImg} alt="Illustration" className="w-full  h-auto object-contain hover:scale-105 transition-transform duration-500" />
        </div>
      </motion.div>
      <motion.div 
        className="flex-1 space-y-8 z-10"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl md:text-4xl  font-clash-display font-semibold text-foreground">
          {t("landing:problemStatement.title")}
        </h2>
        <div className="space-y-6">
          <div className="flex gap-4 group">
          
            <div>
              <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors">{t("landing:problemStatement.items.remoteOversightGap.title", "Remote Oversight Gap")}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{t("landing:problemStatement.items.remoteOversightGap.description", "Investors funding projects in countries where they are not physically present have no reliable way to verify that work is being done.")}</p>
            </div>
          </div>
          <div className="flex gap-4 group">
        
            <div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{t("landing:problemStatement.items.trustDeficitInTransactions.title", "Trust Deficit in Transactions")}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{t("landing:problemStatement.items.trustDeficitInTransactions.description", "High-value transactions between parties who do not know each other carry significant risk.")}</p>
            </div>
          </div>
          <div className="flex gap-4 group">
       
            <div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{t("landing:problemStatement.items.informalFinancialCoordination.title", "Informal Financial Coordination")}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{t("landing:problemStatement.items.informalFinancialCoordination.description", "Group contribution models remain largely informal with no dispute resolution.")}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
