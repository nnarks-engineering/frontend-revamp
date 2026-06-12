import { createLazyFileRoute } from "@tanstack/react-router";

import Navbar from "@/components/landing/nav/NavBar";
import CtaSection from "@/components/landing/sections/cta/section";
import LandingFooter from "@/components/landing/sections/footer/section";
import ModulesTagSection from "@/components/landing/sections/modules/section";
import PersonasSection from "@/components/landing/sections/personas/section";

export const Route = createLazyFileRoute("/_landing/modules")({
  component: ModulesPage,
});

function ModulesPage() {
  return (
    <div className="min-h-screen font-poppins text-foreground selection:bg-primary/30">
      <Navbar />
      <div className="pt-20">
        <ModulesTagSection />
      </div>
      <PersonasSection/>
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
