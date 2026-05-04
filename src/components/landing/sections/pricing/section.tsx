import { Section } from "../../Section";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import NnarksImage from "@/assets/landing/old-man.webp";
import PaperPlaneSvg from "@/assets/paper_plane_line.svg?react";
import BrickPattern from "@/assets/payment-method.svg?react";

export default function PricingTagSection() {
  const { t } = useTranslation(["landing"]);

  return (
    <Section
      id="pricing"
      className="relative min-h-[500px] bg-primary-950  overflow-hidden flex flex-col"
      contentClassName="flex flex-col-reverse lg:flex-row items-stretch justify-center gap-12 flex-1 pt-16 h-full"
    >
      {/* Background Image Layer with Opacity */}
      <div
        className="absolute inset-0 bg-fixed bg-size-cover bg-position-top pointer-events-none opacity-20"
        style={{
          backgroundImage: `url(${NnarksImage})`,
        }}
      />
      <PaperPlaneSvg className="h-full  scale-[-1] absolute text-primary top-0 left-0" />

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="group rounded-t-3xl  backdrop-blur-[1px] mx-auto h-full overflow-x-clip w-fit"
      >
        <BrickPattern className="group-hover:scale-105 relative z-10 h-full min-h-[300px] lg:min-h-[500px] transition-all duration-300" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="max-w-2xl h-full text-center md:text-left "
      >
        <h2 className="text-4xl font-bold font-clash-display text-white mb-4">
          {t("landing:pricing.title")}
        </h2>
        <p className="text-slate-300 mb-8 leading-relaxed">
          {t("landing:pricing.description")}
        </p>

        <Link
          to="/"
          className="group relative mb-10 overflow-hidden w-44 inline-flex items-center justify-center whitespace-nowrap text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground h-12 px-6 py-2 shadow-lg shadow-primary/20 hover:shadow-primary/40"
        >
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-full">
            {t("landing:pricing.cta")}
          </span>
          <ArrowRight className="absolute inset-0 m-auto transition-transform duration-300 -translate-x-30 group-hover:translate-x-0 w-5 h-5" />
        </Link>
      </motion.div>

      {/* Top glow lines */}
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-secondary-200 to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-secondary-300 to-transparent h-px w-3/4" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-secondary-200 to-transparent h-[5px] w-2/4 blur-sm" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-secondary to-transparent h-px w-1/4" />
    </Section>
  );
}