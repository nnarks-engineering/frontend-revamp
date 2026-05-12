import { Section } from "../../Section";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import GhanaImage from "@/assets/landing/ghana.webp"
import PapaerPlaneSvg from "@/assets/paper_plane_line.svg?react"
import WhyNnarksIllustration from "@/assets/why-nnarks-illustration.svg?react"

export default function WhyNnarksSection() {
  const { t } = useTranslation(["landing"]);
  
  return (
    <Section
      id="why-nnarks"
      className="relative min-h-[400px] bg-primary-950 overflow-hidden flex flex-col border-y border-white/5"
      contentClassName="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 flex-1 py-16 h-full"
    >
      {/* Background Image Layer with Opacity */}
      <div 
        className="absolute inset-0 bg-fixed pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `url(${GhanaImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <PapaerPlaneSvg className="h-full absolute text-primary opacity-5 top-0 left-0" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 lg:w-1/2 flex justify-center"
      >
        <div className="relative">
          {/* New Pattern Illustration */}
          <WhyNnarksIllustration className="w-64 h-64 md:w-[350px] md:h-[350px] text-primary transition-all duration-700 hover:scale-105" />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="size-32 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="lg:w-1/2 text-center lg:text-left z-10"
      >
        <h2 className="text-3xl md:text-5xl font-black font-millik text-white mb-4 leading-tight uppercase">
          {t("landing:productVision.title")}
        </h2>
        
        <p className="text-slate-300 mb-8 text-lg md:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0">
          {t("landing:productVision.statement")}{" "}
          <Link to="/about" hash="mission-vision" className="text-primary font-bold hover:underline inline-flex items-center gap-1 group/link text-sm">
            Our Mission & Vision
            <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
        </p>

        <Link
          to="/about"
          className="group relative overflow-hidden inline-flex items-center justify-center whitespace-nowrap text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground h-12 px-8 py-2 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 rounded-full"
        >
          <span className="flex items-center gap-2">
            LEARN MORE
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </motion.div>
    </Section>
  );
}