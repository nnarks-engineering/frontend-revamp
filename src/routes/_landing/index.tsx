import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/landing/sections/hero/section";
import Navbar from "@/components/landing/nav/NavBar";
import PartnersSection from "@/components/landing/sections/partners/section";
import IndustriesSection from "@/components/landing/sections/industries/section";
// import CustomersSection from "@/components/landing/sections/customers/section";
import TestimonialsSection from "@/components/landing/sections/testimonials/section";
import CtaSection from "@/components/landing/sections/cta/section";
import LandingFooter from "@/components/landing/sections/footer/section";
import ModulesTagSection from "@/components/landing/sections/modules/section";
import StructureSection from "@/components/landing/sections/structure/section";
// import TickerSection from "@/components/landing/sections/ticker/section";
import ForWhoSectionTag from "@/components/landing/sections/for-who/section";
// import WhyNnarksSection from "@/components/landing/sections/why-nnarks/section";

export const Route = createFileRoute("/_landing/")(
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
      <StructureSection />
      <IndustriesSection />
      {/* <WhyNnarksSection /> */}
      {/* <CustomersSection /> */}
      <ForWhoSectionTag />
      <TestimonialsSection />
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
