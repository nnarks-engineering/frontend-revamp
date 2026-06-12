import { createLazyFileRoute } from "@tanstack/react-router";

import Navbar from "@/components/landing/nav/NavBar";
import CtaSection from "@/components/landing/sections/cta/section";
import LandingFooter from "@/components/landing/sections/footer/section";
import PricingTagSection from "@/components/landing/sections/pricing/section";

export const Route = createLazyFileRoute("/_landing/financials")({
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
