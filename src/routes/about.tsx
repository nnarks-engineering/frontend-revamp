import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/landing/nav/NavBar";
import CustomersSection from "@/components/landing/sections/customers/section";
import PersonasSection from "@/components/landing/sections/personas/section";
import CtaSection from "@/components/landing/sections/cta/section";
import LandingFooter from "@/components/landing/sections/footer/section";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen font-poppins text-foreground selection:bg-primary/30">
      <Navbar />
      <div className="pt-20">
        <PersonasSection />
        <CustomersSection />
      </div>
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
