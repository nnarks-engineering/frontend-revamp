import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Section } from "../../Section";
import DiasporaImg from "@/assets/img/landing/diaspora.webp";
import ContractorImg from "@/assets/img/landing/contractor.webp";
import ContributorsImg from "@/assets/img/landing/contributors.webp";
import AgricultureImg from "@/assets/img/landing/agriculture.webp";
import DrawingCoilsSvg from "@/assets/drawing-coils.svg?react";

const PersonasSection = () => {
  const { t } = useTranslation("landing");

  const personas = [
    {
      key: "diasporaInvestor",
      image: DiasporaImg,
      color: "bg-secondary/10",
      accent: "text-primary-700",
    },
    {
      key: "localPartner",
      image: ContractorImg,
      color: "bg-secondary/10",
      accent: "text-primary-700",
    },
    {
      key: "groupContributor",
      image: ContributorsImg,
      color: "bg-secondary/10",
      accent: "text-primary-700",
    },
    {
      key: "buyerSeller",
      image: AgricultureImg,
      color: "bg-secondary/10",
      accent: "text-primary-700",
    },
  ];

  return (
 <Section id="personas" className="py-24 relative overflow-hidden bg-white dark:bg-background">
 <DrawingCoilsSvg
  className="absolute inset-0 w-full h-full text-secondary pointer-events-none"
  preserveAspectRatio="xMidYMid slice"
/>

      <div className="flex flex-col gap-32 max-w-7xl mx-auto px-4">
        {personas.map((persona, index) => (
          <motion.div
            key={persona.key}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`flex flex-col ${
              index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
            } items-center gap-8 lg:gap-24`}
          >
            {/* Image side with premium frame */}
            <div className="w-full lg:w-3/5 relative group">
              {/* Dynamic Background Glow */}
              <div className={`absolute -inset-10 ${persona.color}  blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-1000 -z-10`} />
              
              {/* Main Image Container */}
              <div className="relative aspect-video sm:aspect-video lg:aspect-video overflow-hidden  bg-secondary/5 lg:p-3 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100/50">
                <img
                  src={persona.image}
                  alt={t(`userPersonas.roles.${persona.key}.role` as any)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                />
              </div>
            </div>

            {/* Text content side */}
            <div className="w-full lg:w-2/5 space-y-6">
              <div className="space-y-2 md:space-y-4">
                <span className={`text-sm font-bold tracking-[0.2em] uppercase ${persona.accent}`}>
                  {t(`userPersonas.roles.${persona.key}.role` as any)}
                </span>
                
                <h3 className="text-2xl md:text-3xl font-medium font-clash-display text-slate-900 ">
                  {t(`userPersonas.roles.${persona.key}.profile` as any)}
                </h3>
              </div>
              
              <div className="relative">
                <p className=" text-slate-600 leading-relaxed max-w-xl">
                  {t(`userPersonas.roles.${persona.key}.coreNeed` as any)}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default PersonasSection;
