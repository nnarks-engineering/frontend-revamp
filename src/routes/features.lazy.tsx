import { createLazyFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/landing/nav/NavBar";
import FeaturesSection from "@/components/landing/sections/features/section";
import CtaSection from "@/components/landing/sections/cta/section";
import LandingFooter from "@/components/landing/sections/footer/section";

export const Route = createLazyFileRoute("/features")({
  component: FeaturesPage,
});

function FeaturesPage() {
  return (
    <div className="min-h-screen font-poppins text-foreground selection:bg-primary/30">
      <Navbar />
      <div className="pt-20">
        <FeaturesSection />
      </div>
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
