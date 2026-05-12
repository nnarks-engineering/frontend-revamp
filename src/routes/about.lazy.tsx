import { createLazyFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/landing/nav/NavBar";
import AboutHeroSection from "@/components/landing/sections/about/about/HerroSection";
import StorySection from "@/components/landing/sections/about/StorySection";
import WhatWeDoSection from "@/components/landing/sections/about/WhatWeDoSection";
import MissionVisionSection from "@/components/landing/sections/about/MissionVisionSection";
import PillarsSection from "@/components/landing/sections/about/PillarsSection";
import WhoWeServeSection from "@/components/landing/sections/about/WhoWeServeSection";
import { CallToAction } from "@/components/landing/CallToAction";
import { useTranslation } from "react-i18next";
import CtaBg from "@/assets/img/landing/vibrant_abstract_cta_bg.png";
import LandingFooter from "@/components/landing/sections/footer/section";
import TickerSection from "@/components/landing/sections/ticker/section";

export const Route = createLazyFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  const { t } = useTranslation(["landing", "common"]);
  return (
    <div className="min-h-screen font-poppins text-foreground selection:bg-primary/30 ">
      <Navbar />
      <div className="flex flex-col w-full mt-20 overflow-hidden">
        <AboutHeroSection />
        <TickerSection />
        <StorySection />
        <PillarsSection />
        <WhoWeServeSection /> 
        <CallToAction
          title={t("landing:aboutWhatWeDo.ctaTitle")}
          description={t("landing:aboutWhatWeDo.ctaDescription")}
          className="mt-20"
          background={{
            type: "image",
            src: CtaBg  
          }}

          primaryCta={{
            text: t("landing:aboutJoin.cta"),
            href: "/r",
          }}
        />
        <MissionVisionSection />
        <WhatWeDoSection />
        {/* <ImpactSection /> */}
        {/* <TeamSection /> */}
      </div>
      <LandingFooter />
    </div>
  );
}
