import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import BrickPattern from "@/assets/brick-pattern.svg?react"
import GhanaImage from "@/assets/landing/ghana.webp"
import PapaerPlaneSvg from "@/assets/paper_plane_line.svg?react"

import { Section } from "../../Section";

export default function ModulesTagSection(props: { hideModuleButton?: boolean }) {
  const { t } = useTranslation(["landing", "common"]);
  const { hideModuleButton = true } = props;

  return (
    <Section
      id="modules"
      className="relative min-h-[500px] bg-primary-950 overflow-hidden flex flex-col"
      contentClassName="flex flex-col-reverse lg:flex-row-reverse items-stretch justify-center gap-12 flex-1 pt-16 h-full"
    >
      {/* ── Layer 0: background image ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url(${GhanaImage})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* ── Layer 1: decorative SVG (behind content, above bg) ── */}
      <PapaerPlaneSvg className="absolute inset-y-0 right-0 h-full text-primary md:scale-x-[-1] pointer-events-none z-[1]" />

      {/* ── Layer 2: glow lines (top edge) ── */}
      <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-secondary-200 to-transparent blur-sm z-[2]" />
      <div className="absolute inset-x-20 top-0 h-px     w-3/4 bg-gradient-to-r from-transparent via-secondary-300 to-transparent z-[2]" />
      <div className="absolute inset-x-60 top-0 h-[5px] w-2/4 bg-gradient-to-r from-transparent via-secondary-200 to-transparent blur-sm z-[2]" />
      <div className="absolute inset-x-60 top-0 h-px     w-1/4 bg-gradient-to-r from-transparent via-secondary     to-transparent z-[2]" />

      {/* ── Layer 3: brick pattern illustration ── */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="group relative z-[3] rounded-t-3xl backdrop-blur-[1px] mx-auto h-full overflow-x-clip w-fit"
      >
        <BrickPattern className="group-hover:scale-105 relative h-full min-h-[300px] lg:min-h-[500px] transition-all duration-300" />
      </motion.div>

      {/* ── Layer 3: text content ── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative z-[3] max-w-2xl h-full text-center md:text-left"
      >
        <h2 className="text-4xl font-bold font-clash-display text-primary-600 mb-4">
          {t("landing:modules.title")}
        </h2>
        <p className="text-primary-100/80 mb-8 text-lg leading-relaxed">
          {t("landing:modules.description")}
        </p>

        {!hideModuleButton && (
          <Link
            to="/modules"
            className="group relative mb-10 overflow-hidden w-44 inline-flex items-center justify-center whitespace-nowrap text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-2 !border-primary text-primary h-12 px-6 py-2 shadow-lg shadow-primary/10 hover:bg-primary/5 hover:shadow-primary/20"
          >
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-full uppercase tracking-wider">
              {t("landing:modules.cta")}
            </span>
            <ArrowRight className="absolute inset-0 m-auto transition-transform duration-300 -translate-x-30 group-hover:translate-x-0 w-5 h-5" />
          </Link>
        )}

        {!hideModuleButton && (
          <Link
            to="/about"
            className="group relative mb-10 ml-4 overflow-hidden w-56 inline-flex items-center justify-center whitespace-nowrap text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground h-12 px-6 py-2 shadow-lg shadow-primary/20 hover:shadow-primary/40"
          >
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-full uppercase tracking-wider">
              {t("landing:aboutJoin.learnMore")}
            </span>
            <ArrowRight className="absolute inset-0 m-auto transition-transform duration-300 -translate-x-30 group-hover:translate-x-0 w-5 h-5" />
          </Link>
        )}
      </motion.div>
    </Section>
  );
}
