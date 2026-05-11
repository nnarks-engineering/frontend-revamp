import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Section } from "../../Section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function JoinSection() {
  const { t } = useTranslation(["landing"]);

  return (
    <Section className="bg-primary-950 text-white pt-48 pb-32 rounded-t-[4rem] md:rounded-t-[8rem] mt-20" contentClassName="max-w-6xl mx-auto px-4 text-center">
      <div className="space-y-24">
        <div className="space-y-8">
          <h2 className="text-5xl md:text-8xl font-bold font-clash-display leading-tight tracking-tight">
            {t("landing:aboutJoin.title")}
          </h2>
          <p className="text-xl md:text-3xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            {t("landing:aboutJoin.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-12 bg-white/5 backdrop-blur-sm rounded-[3rem] border border-white/10 space-y-6 text-left flex flex-col justify-between"
          >
            <div className="space-y-4">
               <h3 className="text-2xl font-bold font-clash-display">For Contractors</h3>
               <p className="text-lg text-white/60">{t("landing:aboutJoin.roles.contractors")}</p>
            </div>
            <Button variant="outline" className="w-full h-14 rounded-full border-white/20 text-white hover:bg-white hover:text-primary-950 text-lg font-bold">Apply</Button>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="p-12 bg-white/5 backdrop-blur-sm rounded-[3rem] border border-white/10 space-y-6 text-left flex flex-col justify-between"
          >
            <div className="space-y-4">
               <h3 className="text-2xl font-bold font-clash-display">For Partners</h3>
               <p className="text-lg text-white/60">{t("landing:aboutJoin.roles.partners")}</p>
            </div>
            <Button variant="outline" className="w-full h-14 rounded-full border-white/20 text-white hover:bg-white hover:text-primary-950 text-lg font-bold">Contact</Button>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="p-12 bg-white/5 backdrop-blur-sm rounded-[3rem] border border-white/10 space-y-6 text-left flex flex-col justify-between"
          >
            <div className="space-y-4">
               <h3 className="text-2xl font-bold font-clash-display">For Investors</h3>
               <p className="text-lg text-white/60">{t("landing:aboutJoin.roles.investors")}</p>
            </div>
            <Button variant="outline" className="w-full h-14 rounded-full border-white/20 text-white hover:bg-white hover:text-primary-950 text-lg font-bold">Learn More</Button>
          </motion.div>
        </div>

        <div className="pt-12 space-y-12">
          <p className="text-3xl md:text-5xl font-clash-display font-bold text-primary max-w-4xl mx-auto">
            {t("landing:aboutJoin.footer")}
          </p>
          <Button size="lg" className="rounded-full px-16 py-10 text-2xl font-bold group bg-primary text-primary-950 hover:bg-white transition-colors">
            {t("landing:aboutJoin.cta")}
            <ArrowRight className="ml-3 w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>
      </div>
    </Section>
  );
}
