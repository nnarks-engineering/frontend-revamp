import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/landing/sections/hero/section";
import Navbar from "@/components/landing/nav/NavBar";
import PartnersSection from "@/components/landing/sections/partners/section";
import IndustriesSection from "@/components/landing/sections/industries/section";
import CustomersSection from "@/components/landing/sections/customers/section";
import TestimonialsSection from "@/components/landing/sections/testimonials/section";
import CtaSection from "@/components/landing/sections/cta/section";
import LandingFooter from "@/components/landing/sections/footer/section";
import ModulesTagSection from "@/components/landing/sections/modules/section";

export const Route = createFileRoute("/")(
  {
    component: LandingPage,
  }
);

function LandingPage() {
  return (
    <div className="min-h-screen font-poppins text-foreground selection:bg-primary/30">
      <Navbar />
      <HeroSection />    
      <PartnersSection />
      <ModulesTagSection hideModuleButton={false} />
  
      <IndustriesSection />
      <CustomersSection />

      <TestimonialsSection />
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
