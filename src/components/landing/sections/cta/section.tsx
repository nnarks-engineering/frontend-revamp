import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";


import EngineerImage from "@/assets/landing/nnarks-engineer.webp";
import NnarksLogo from "@/assets/nnarks-logo-sm.svg?react";
import { Button } from "@/components/ui/button";
import { LinkPreview } from "@/components/ui/link-preview";

import { Section } from "../../Section";

import MarqueeSection from "./tilted-marquee";

export default function CtaSection() {
  const { t } = useTranslation(["landing"]);

  return (
    <Section
      id="contact"
      className="relative mt-20 mb-10 [perspective:2000px] overflow-hidden px-4 sm:px-6 lg:px-8"
      contentClassName="relative w-full border bg-gradient-to-br from-primary-50 to-primary-100 dark:from-secondary-900 dark:to-secondary-900 min-h-[480px] sm:pr-0 lg:pr-0 pr-0 grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden"
    >
      {/* Left Content - Text + CTA */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-20 flex flex-col justify-center px-8 lg:px-14 max-lg:items-center max-lg:text-center"
      >
        <div className="space-y-8 max-w-lg">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-clash-display font-bold leading-tight">
            <span className="block">{t("landing:cta.headline")}</span>
          </h2>

          <p className="text-base leading-relaxed text-foreground/70">
            {t("landing:cta.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <LinkPreview
              url="/register"
              isStatic
              imageSrc={EngineerImage}
              asChild
            >
              <Link to="/register">
                <Button variant="secondary">
                  {t("landing:cta.buttonPrimary")}
                </Button>
              </Link>
            </LinkPreview>
            <Link to="/">
              <Button>{t("landing:cta.buttonSecondary")}</Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Marquee */}
      <div className="relative z-20 overflow-hidden max-lg:hidden">
        <div className="absolute right-0 inset-0 flex items-center">
          <MarqueeSection />
        </div>
      </div>

      <NnarksLogo className="absolute h-78 -bottom-16 -left-16 opacity-10" />
    </Section>
  );
}
