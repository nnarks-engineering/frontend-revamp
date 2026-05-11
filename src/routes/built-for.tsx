import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/landing/nav/NavBar";
import ForWhoSection from "@/components/landing/sections/built-for-details/section";
import CtaSection from "@/components/landing/sections/cta/section";
import LandingFooter from "@/components/landing/sections/footer/section";
import PersonasSection from "@/components/landing/sections/personas/section";

export const Route = createFileRoute("/built-for")({
  component: ModulesPage,
});

function ModulesPage() {
  return (
    <div className="min-h-screen font-poppins text-foreground selection:bg-primary/30">
      <Navbar />
      <div className="pt-20">
        <ForWhoSection />
      </div>
      <PersonasSection/>
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
