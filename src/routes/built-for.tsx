import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/landing/nav/NavBar";
import ForWhoSection from "@/components/landing/sections/built-for-details/section";
import LandingFooter from "@/components/landing/sections/footer/section";
import PersonasSection from "@/components/landing/sections/personas/section";
import { CallToAction } from "@/components/landing/CallToAction";
import { useTranslation } from "react-i18next";
import CtaBg from "@/assets/img/vibrant_abstract_cta_bg-primary.jpg"; // Assuming the user will move the generated image here


export const Route = createFileRoute("/built-for")({
  component: ModulesPage,
});

function ModulesPage() {
    const { t } = useTranslation(["landing", "common"]);
  return (
    <div className="min-h-screen font-poppins text-foreground selection:bg-primary/30">
      <Navbar />
      <div className="pt-20">
        <ForWhoSection />
      </div>
      <PersonasSection/>  
       <CallToAction 
        title={t("landing:aboutStory.resolution")}
        description={t("landing:aboutWhoWeServe.footer")}
        primaryCta={{
          text: t("common:auth.getStarted"),
          href: "/register"
        }}
        secondaryCta={{
          text: t("landing:navMenu.company.items.contact.label"),
          href: "/contact"
        }}
        background={{
          type: "image",
          src: CtaBg
        }}
      />
      <LandingFooter />

    
    </div>
  );
}
