import Navbar from "@/components/landing/nav/NavBar";
import AboutHeroSection from "@/components/landing/sections/about/about/HerroSection";
import StorySection from "@/components/landing/sections/about/StorySection";
import WhatWeDoSection from "@/components/landing/sections/about/WhatWeDoSection";
import MissionVisionSection from "@/components/landing/sections/about/MissionVisionSection";
import { createFileRoute } from "@tanstack/react-router";
// import ImpactSection from "@/components/landing/sections/about/ImpactSection";
import PillarsSection from "@/components/landing/sections/about/PillarsSection";
import WhoWeServeSection from "@/components/landing/sections/about/WhoWeServeSection";
import CtaSection from "@/components/landing/sections/cta/section";
import LandingFooter from "@/components/landing/sections/footer/section";
import TickerSection from "@/components/landing/sections/ticker/section";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen font-poppins text-foreground selection:bg-primary/30 ">
      <Navbar />
      <div className="flex flex-col w-full mt-20 overflow-hidden">
        <AboutHeroSection />
        <TickerSection />
        <PillarsSection />
        <StorySection />
        <WhatWeDoSection />
        {/* <ImpactSection /> */}
        <MissionVisionSection />
        <WhoWeServeSection />
        {/* <TeamSection /> */}
        {/* <JoinSection /> */}
      </div>
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
