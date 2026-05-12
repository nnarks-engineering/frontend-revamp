import { Target, Telescope } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Section } from "../../Section";
import { MissionVisionCard } from "./MissionVisionCard";

import MissionImg from "@/assets/img/landing/mission.webp";
import VisionImg from "@/assets/img/landing/vission.webp";
import RoneOne from "@/assets/img/rope-one.webp"



export default function MissionVisionSection() {
  const { t } = useTranslation(["landing"]);

  return (
    <Section
      className=" py-20 md:py-32 "
      contentClassName="max-w-7xl mx-auto px-6"
    >
    <p className="text-4xl font-bold font-millik mb-8">{t("landing:aboutMission.title") + ' & ' + t("landing:aboutMission.visionTitle")}</p>
      <div className="grid z-10 relative grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Mission Card */}
        <MissionVisionCard
          title={t("landing:aboutMission.title")}
          description={t("landing:aboutMission.statement")}
          icon={Target}
          illustration={MissionImg}
          color="warning"
          number="01"
        />

        {/* Vision Card */}
        <MissionVisionCard
          title={t("landing:aboutMission.visionTitle")}
          description={t("landing:aboutMission.visionStatement")}
          icon={Telescope}
          illustration={VisionImg}
          color="primary"
          number="02"
        />
      </div>
      <div 
        className="relative w-full md:-mt-24 pointer-events-none overflow-hidden"
        style={{ 
          maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' 
        }}
      >
        <img 
          src={RoneOne} 
          alt="decorative-rope" 
          className="w-full h-auto object-contain opacity-100" 
        />
      </div>
    </Section>

  );
}

