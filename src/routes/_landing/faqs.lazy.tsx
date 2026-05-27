import { createLazyFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/landing/nav/NavBar";
import LandingFooter from "@/components/landing/sections/footer/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FaqImage from "@/assets/landing/faq.webp";
import GhanaImage from "@/assets/landing/ghana.webp"
import DrawingCoilsSvg from "@/assets/drawing-coils.svg?react";
import { useTranslation } from "react-i18next";

export const Route = createLazyFileRoute("/_landing/faqs")({
  component: FAQsPage,
});

function FAQsPage() {
  const { t } = useTranslation(['landing']);
  const faqsItems = t('landing:faqsSection.items', { returnObjects: true }) as Array<{ question: string, answer: string }>;

  return (
    <div className="min-h-screen font-poppins text-foreground bg-white selection:bg-primary/30">
      <Navbar />
      <div className="text-center mt-20 h-80  bg-primary-950 relative">
        <div style={{ backgroundImage: `url(${GhanaImage})` }} className="h-full opacity-30 w-full absolute inset-0 bg-fixed bg-cover bg-center bg-no-repeat" />
        <div className="relative z-10 h-full text-white px-4 md:px-6 max-w-6xl mx-auto flex items-center justify-center flex-col">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-clash-display">{t('landing:faqsSection.title')}</h1>
          <p className="text-lg max-w-2xl mx-auto">{t('landing:faqsSection.subtitle')}</p>
        </div>

        <div className="top-72 p-4 size-28 right-8 aspect-square absolute border-4 bg-primary-950 rotate-12 border-white! text-primary text-9xl">?</div>
      </div>
       <DrawingCoilsSvg
  className="absolute inset-0 w-full z-  h-full text-primary-200 pointer-events-none"
  preserveAspectRatio="xMidYMid slice"
/>
      <div className="pt-20 pb-20 px-4 md:px-6 max-w-6xl mx-auto min-h-[70vh]">


        <div className="flex flex-col md:flex-row items-start">
          <div className="w-full md:w-1/2 shrink-0">

            <div className=" overflow-hidden bg-primary-200  border-r border-primary-200/0!">
              <img
                src={FaqImage}
                alt="Nnarks FAQ"
                className="w-full h-75 md:h-125 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
              {Array.isArray(faqsItems) && faqsItems.map((faq, i) => (
                <AccordionItem value={`item-${i}`} key={faq.question} className="mb-4 border-0 border-l-4 border-primary-200! px-6  data-[state=open]:bg-primary-50 transition-colors">
                  <AccordionTrigger className="text-left font-clash-display font-semibold text-lg hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/70 text-base pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
}
