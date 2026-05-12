import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Section } from "../../Section";
import StoryWorld from "@/assets/img/story-world.webp";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";

// Story Images
import NurseLondon from "@/assets/img/landing/nurse-london.png";
import EngineerNY from "@/assets/img/landing/engineer-ny.png";
import TeacherToronto from "@/assets/img/landing/teacher-toronto.png";

const images = [NurseLondon, EngineerNY, TeacherToronto];

export default function StorySection() {
  const { t } = useTranslation(["landing"]);
  const stories = t("landing:aboutStory.stories", { returnObjects: true }) as { role: string; description: string }[];

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start', 
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="flex flex-col ">
      {/* 1. Hero Container: Constrained Section with Globe Card */}
      <Section className="py-10 md:py-20 overflow-visible" contentClassName="max-w-7xl mx-auto px-4">
        <div className="relative pt-48 md:pt-40">
          {/* Globe asset overlapping */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2  w-52 sm:w-64 md:w-80 z-30 pointer-events-none">
            <motion.img
              initial={{ y: 40, opacity: 0, scale: 0.8 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              src={StoryWorld}
              alt="Nnarks World Story"
              className="w-full h-auto"
            />
          </div>
          <div className="absolute top-0 z-1 left-1/2 -translate-x-1/2 size-52 rounded-full md:size-68 bg-white pointer-events-none" />

          {/* The Hero Card */}
          <div className="bg-secondary rounded-tr-[3rem] md:rounded-tr-[5rem] pt-10 md:pt-44 text-center relative overflow-hidden">
            <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-full h-full bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-primary-900 font-medium text-lg md:text-xl"
              >
                {t("landing:aboutStory.subtitle")}
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl lg:text-8xl font-black text-primary-900 leading-[0.85] font-millik max-w-5xl"
              >
                {t("landing:aboutStory.title")}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="font-poppins text-base md:text-lg text-primary-950 max-w-3xl mx-auto leading-relaxed mt-6"
              >
                {t("landing:aboutStory.context")}
              </motion.p>

            {/* Authentic Message Bubble moved inside */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative w-full max-w-4xl mx-auto mt-6"
            >
              <div className="relative bg-primary-900 text-primary-50 p-8 md:p-14 rounded-tr-[3rem] shadow-2xl">
                <p className="text-base md:text-xl font-normal italic leading-tight text-left">
                  "{t("landing:aboutStory.conclusion")}"
                </p>
                
                {/* Authentic Curved Tail */}
                <div className="absolute bottom-0 -left-6 w-8 h-8 pointer-events-none">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary-900 transform -scale-x-100">
                    <path d="M0 32C10 32 16 26 16 16V0H0V32Z" fill="currentColor"/>
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      </Section>

      {/* 2. Slider Container: Full Window Width with Background */}
      <div className="bg-primary-950 pt-14 md:pt-20 relative overflow-hidden w-full">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        
        {/* Constrained Content Wrapper */}
        <div className="max-w-[90rem] mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 relative z-10">
            {/* Left Side: Headline and Buttons */}
            <div className="lg:w-1/3 space-y-10 lg:sticky lg:top-40">
              <motion.h3 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-3xl md:text-5xl font-black text-white font-millik leading-tight"
              >
                {t("landing:aboutStory.resolution")}
              </motion.h3>
              
              <div className="flex gap-4">
                <button 
                  onClick={scrollPrev}
                  className="group size-14 md:size-16 rounded-full bg-primary flex items-center justify-center text-primary-950 hover:bg-white transition-all active:scale-95 shadow-xl"
                >
                  <ChevronLeft size={32} strokeWidth={2.5} />
                </button>
                <button 
                  onClick={scrollNext}
                  className="group size-14 md:size-16 rounded-full bg-primary flex items-center justify-center text-primary-950 hover:bg-white transition-all active:scale-95 shadow-xl"
                >
                  <ChevronRight size={32} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Right Side: Slider */}
            <div className="lg:w-2/3 w-full overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {stories.map((story, i) => (
                  <div key={i} className="flex-[0_0_100%] md:flex-[0_0_60%] lg:flex-[0_0_50%] min-w-0">
                    <motion.div
                      className="bg-white/5 backdrop-blur-sm rounded-tr-3xl p-4 md:p-6 h-full flex flex-col gap-8 group transition-all duration-500"
                    >
                      <div className="aspect-[4/3] w-full rounded-tr-2xl overflow-hidden bg-primary-950/50 shadow-2xl">
                        <img 
                          src={images[i]} 
                          alt={story.role} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                        />
                      </div>
                      <div className="space-y-4 text-left">
                        <h4 className="text-2xl md:text-3xl font-bold text-primary font-millik ">
                          {story.role}
                        </h4>
                        <p className="font-poppins text-primary-50/80 text-base md:text-lg leading-relaxed line-clamp-4">
                          {story.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
