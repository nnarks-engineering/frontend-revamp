import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/landing/nav/NavBar";
import VisionSection from "@/components/landing/sections/about/VisionSection";
import StorySection from "@/components/landing/sections/about/StorySection";
import WhatWeDoSection from "@/components/landing/sections/about/WhatWeDoSection";
// import ImpactSection from "@/components/landing/sections/about/ImpactSection";
import PillarsSection from "@/components/landing/sections/about/PillarsSection";
import WhoWeServeSection from "@/components/landing/sections/about/WhoWeServeSection";
import TeamSection from "@/components/landing/sections/about/TeamSection";
import JoinSection from "@/components/landing/sections/about/JoinSection";
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
        <VisionSection />
        <TickerSection/>
          <PillarsSection />
        <StorySection />
        <WhatWeDoSection />
        {/* <ImpactSection /> */}
      
        <WhoWeServeSection />
        {/* <TeamSection /> */}
        {/* <JoinSection /> */}
      </div>
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
