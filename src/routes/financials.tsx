import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/landing/nav/NavBar";
import PricingTagSection from "@/components/landing/sections/pricing/section";
import CtaSection from "@/components/landing/sections/cta/section";
import LandingFooter from "@/components/landing/sections/footer/section";

export const Route = createFileRoute("/financials")({
  component: FinancialsPage,
});

function FinancialsPage() {
  return (
    <div className="min-h-screen font-poppins text-foreground selection:bg-primary/30">
      <Navbar />
      <div className="pt-20">
        <PricingTagSection />
      </div>
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
