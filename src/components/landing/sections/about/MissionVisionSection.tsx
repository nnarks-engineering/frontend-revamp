import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Section } from "../../Section";
import { Target, Telescope } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, ease: "easeOut" as const, delay },
});

export default function MissionVisionSection() {
  const { t } = useTranslation(["landing"]);

  return (
    <Section
      className="bg-background py-20 md:py-28"
      contentClassName="max-w-[90rem] mx-auto px-6"
    >
      {/* Section eyebrow */}
      <motion.p
        {...fadeUp(0)}
        className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-10"
      >
        {t("landing:navMenu.company.items.about.description")}
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Mission Card (dark) ─────────────────────────────── */}
        <motion.div
          {...fadeUp(0.1)}
          className="relative bg-primary-950 text-white rounded-tr-[3rem] rounded-bl-[3rem] p-10 md:p-14 flex flex-col justify-between gap-10 overflow-hidden min-h-[420px]"
        >
          {/* Decorative circle blob */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/5 blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            {/* Icon + label */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-200" strokeWidth={1.5} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-300">
                {t("landing:aboutMission.title")}
              </span>
            </div>

            {/* Statement */}
            <p className="text-2xl md:text-3xl lg:text-4xl font-black font-clash-display leading-[1.15] tracking-tight">
              {t("landing:aboutMission.statement")}
            </p>
          </div>

          {/* Bottom accent line */}
          <div className="relative z-10 h-px w-16 bg-primary" />
        </motion.div>

        {/* ── Vision Card (light) ─────────────────────────────── */}
        <motion.div
          {...fadeUp(0.22)}
          className="relative bg-primary-50 border border-primary/20 text-primary-950 rounded-tl-[3rem] rounded-br-[3rem] p-10 md:p-14 flex flex-col justify-between gap-10 overflow-hidden min-h-[420px]"
        >
          {/* Decorative dots grid */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, currentColor 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            {/* Icon + label */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                <Telescope className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {t("landing:aboutMission.visionTitle")}
              </span>
            </div>

            {/* Statement */}
            <p className="text-2xl md:text-3xl lg:text-4xl font-black font-clash-display leading-[1.15] tracking-tight text-primary-950">
              {t("landing:aboutMission.visionStatement")}
            </p>
          </div>

          {/* Bottom accent line */}
          <div className="relative z-10 h-px w-16 bg-primary" />
        </motion.div>
      </div>
    </Section>
  );
}
