import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/landing/nav/NavBar";
import VisionSection from "@/components/landing/sections/about/VisionSection";
import ProblemSection from "@/components/landing/sections/about/ProblemSection";
import RegulationSection from "@/components/landing/sections/about/RegulationSection";
import CtaSection from "@/components/landing/sections/cta/section";
import LandingFooter from "@/components/landing/sections/footer/section";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen font-poppins text-foreground selection:bg-primary/30 ">
      <Navbar />
      <div className="flex flex-col w-full mt-20 overflow-hidden">
        <VisionSection />
        <ProblemSection />
        <RegulationSection />
      </div>
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
