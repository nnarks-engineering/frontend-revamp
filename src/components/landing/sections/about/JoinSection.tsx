import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

// Existing high-quality images
import ContractorImg from "@/assets/img/landing/contractor.webp";
import ContributorsImg from "@/assets/img/landing/contributors.webp";
import DiasporaImg from "@/assets/img/landing/diaspora.webp";

import { Section } from "../../Section";

export default function JoinSection() {
  const { t } = useTranslation(["landing"]);

  const roles = [
    {
      title: "For Contractors",
      description: t("landing:aboutJoin.roles.contractors"),
      image: ContractorImg,
      href: "/register",
      linkText: "Learn more"
    },
    {
      title: "For Partners",
      description: t("landing:aboutJoin.roles.partners"),
      image: DiasporaImg,
      href: "/contact",
      linkText: "Learn more"
    },
    {
      title: "For Investors",
      description: t("landing:aboutJoin.roles.investors"),
      image: ContributorsImg,
      href: "/register",
      linkText: "Learn more"
    }
  ];

  return (
    <Section className="bg-white py-24 md:py-32" contentClassName="max-w-7xl mx-auto px-4">
      <div className="mb-10 md:mb-20 space-y-4">
        <h2 className="text-4xl md:text-6xl font-bold font-millik text-foreground">
          {t("landing:aboutJoin.title")}
        </h2>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl">
          {t("landing:aboutJoin.description")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
        {roles.map((role, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col bg-slate-100 rounded-tr-3xl overflow-hidden p-3 h-full group"
          >
            {/* Image Container */}
            <div className="aspect-[16/10] w-full overflow-hidden rounded-tr-2xl relative mb-8">
              <img
                src={role.image}
                alt={role.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Content Container */}
            <div className="px-6 pb-8 flex flex-col items-center text-center flex-1">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 font-clash-display">
                {role.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-8 text-base">
                {role.description}
              </p>
              
              <div className="mt-auto">
                <Link
                  to={role.href as any}
                  className="inline-flex items-center gap-2 text-primary-700 font-bold hover:underline transition-all group/link"
                >
                  {role.linkText}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
