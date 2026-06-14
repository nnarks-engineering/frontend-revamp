import { motion } from "framer-motion";
import {
  BarChart3,
  Building2,
  Eye,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { Section } from "../../Section";

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="group relative overflow-hidden">
      <div className="relative flex gap-4 items-start space-y-6 p-6">
        <div className="relative">
          <div className="size-16 flex items-center justify-center bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-clash-display font-semibold text-slate-900 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function FeaturesSection() {
  const { t } = useTranslation(["landing"]);

  const features = [
    {
      icon: <Eye className="size-7" />,
      title: t("landing:features.items.milestoneEngine.title"),
      description: t("landing:features.items.milestoneEngine.description"),
    },
    {
      icon: <ShieldCheck className="size-7" />,
      title: t("landing:features.items.smartEscrow.title"),
      description: t("landing:features.items.smartEscrow.description"),
    },
    {
      icon: <Building2 className="size-7" />,
      title: t("landing:features.items.onGroundSupervision.title"),
      description: t("landing:features.items.onGroundSupervision.description"),
    },
    {
      icon: <Users className="size-7" />,
      title: t("landing:features.items.kycIdentity.title"),
      description: t("landing:features.items.kycIdentity.description"),
    },
    {
      icon: <BarChart3 className="size-7" />,
      title: t("landing:features.items.evidenceSystem.title"),
      description: t("landing:features.items.evidenceSystem.description"),
    },
    {
      icon: <Wallet className="size-7" />,
      title: t("landing:features.items.messagingNotifications.title"),
      description: t(
        "landing:features.items.messagingNotifications.description"
      ),
    },
  ];

  return (
    <Section
      id="features"
      className="relative w-full py-10 md:py-20 overflow-hidden"
    >
      {/* Top glow lines */}
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-primary-200 to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-primary-200 to-transparent h-px w-3/4" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-[5px] w-1/4 blur-sm" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-px w-1/4" />

      <div className="flex flex-col items-center justify-center space-y-12 text-center">
        <div className="space-y-6 max-w-4xl">
          {/* Section badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2  bg-white border border-slate-200"
          >
            <span className="text-sm font-medium text-slate-700 font-clash-display">
              {t("landing:features.title")}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Features grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 pt-10 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="md:grid grid-cols-[auto_1px] group items-stretch"
          >
            <FeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
            {/* Vertical divider line */}
            <div
              className="w-px h-full block group-last:hidden md:group-nth-3:hidden"
              style={{
                background: `linear-gradient(
                  to bottom,
                  transparent 0%,
                  rgba(23, 204, 236, 0.15) 20%,
                  rgba(23, 204, 236, 0.4) 50%,
                  rgba(23, 204, 236, 0.15) 80%,
                  transparent 100%
                )`,
              }}
            />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
