"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/shared/lib/utils";
import { Armchair } from "lucide-react";
import LineJoinedDotSvg from "@/assets/svg/line-joined-dotes.svg?react"

interface Industry {
  id: string;
  name: string;
  desc: string;
  imgs: string[];
}

const industries: Industry[] = [
  {
    id: "real-estate",
    name: "Real Estate",
    desc: "Verified builds, escrowed releases, and audited milestones.",
    imgs: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"],
  },
  {
    id: "agriculture",
    name: "Agriculture",
    desc: "Supply assurance with on‑site validation and custody.",
    imgs: ["https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80"],
  },
  {
    id: "energy",
    name: "Energy",
    desc: "Project guardrails for capital‑intensive energy assets.",
    imgs: ["https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    desc: "Equipment procurement with verified delivery and release.",
    imgs: ["https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"],
  },
  {
    id: "education",
    name: "Education",
    desc: "Campus and infrastructure funding with milestone control.",
    imgs: ["https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80"],
  },
  {
    id: "logistics",
    name: "Logistics",
    desc: "Freight and warehousing with escrowed execution.",
    imgs: ["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"],
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    desc: "Plant upgrades with inspection‑based drawdowns.",
    imgs: ["https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80"],
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    desc: "Public works secured by third‑party audits.",
    imgs: ["https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80"],
  },
  {
    id: "fintech",
    name: "Fintech",
    desc: "Settlement integrity and compliance‑ready audit trails.",
    imgs: ["https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80"],
  },
  {
    id: "tourism",
    name: "Tourism",
    desc: "Hospitality builds backed by escrow and oversight.",
    imgs: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"],
  },
  {
    id: "mining",
    name: "Mining",
    desc: "Asset verification and controlled capital releases.",
    imgs: ["https://images.unsplash.com/photo-1578319439584-104c94d37305?w=800&q=80"],
  },
  {
    id: "retail",
    name: "Retail",
    desc: "Store rollouts validated by on‑site checkpoints.",
    imgs: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"],
  },
  {
    id: "telecom",
    name: "Telecom",
    desc: "Network deployment with phased escrow releases.",
    imgs: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"],
  },
  {
    id: "water",
    name: "Water & Sanitation",
    desc: "Critical systems verified through inspection gates.",
    imgs: ["https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&q=80"],
  },
  {
    id: "transport",
    name: "Transportation",
    desc: "Fleet and corridor projects with secure oversight.",
    imgs: ["https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80"],
  },
  {
    id: "construction",
    name: "Construction",
    desc: "Execution assurance with professional supervision.",
    imgs: ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"],
  },
];

export default function IndustriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % industries.length);
    }, 3500);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  useEffect(() => {
    if (!isHovering) startAutoPlay();
    else stopAutoPlay();
    return () => stopAutoPlay();
  }, [isHovering]);

  return (
    <section id="industries" className="relative w-full py-24 bg-white  dark:bg-neutral-950 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <LineJoinedDotSvg className="w-full h-full" />
      </div>
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex z-10 relative flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bold mb-4 font-millik text-4xl md:text-6xl"
          >
            Industries We Serve
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground "
          >
            Trusted across every sector of the African economy
          </motion.h2>
        </div>

        <div
          className="relative h-[700px] md:h-[600px] w-full flex items-center justify-center overflow-visible"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {industries.map((industry, idx) => {
              const isActive = activeIndex === idx;
              const rotationSeeds = [8, -10, 12, -8, 14, -12, 10, -14, 7, -11, 13, -9, 15, -13, 11, -15];
              const n = industries.length;
              let distance = idx - activeIndex;
              if (distance > n / 2) distance -= n;
              if (distance < -n / 2) distance += n;
              
              const rotation = isActive ? 0 : (isMobile ? distance * 15 : rotationSeeds[idx % rotationSeeds.length]);
              
              const absDistance = Math.abs(distance);
              
              // Positioning logic:
              const spacing = isMobile ? 0 : (isActive ? 0 : 180 - (absDistance * 5)); 
              const xOffset = isMobile ? (distance * 40) : distance * spacing;
              const yOffset = isMobile ? (isActive ? -180 : (absDistance * 20) + 120) : 0;

              return (
                <motion.div
                  key={industry.id}
                  layout
                  initial={false}
                  animate={{
                    x: xOffset,
                    y: yOffset,
                    rotate: rotation,
                    scale: isActive ? 1.05 : (isMobile ? 0.7 : Math.max(0.6, 0.85 - absDistance * 0.05)),
                    zIndex: isActive ? 100 : 50 - absDistance,
                    opacity: isMobile ? (absDistance > 4 ? 0 : 1) : (absDistance > 6 ? 0 : 1),
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 22,
                  }}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    " bg-white  rounded-xl dark:bg-neutral-900  min-h-fit overflow-hidden group/card",
                    isActive ? "w-[320px] md:w-[680px] md:border-x-4  !border-x-white  px-2 md:pl-0   bg-primary-50 h-[420px] md:h-[450px] min-h-fit" : "w-[180px] absolute cursor-pointer shadow-2xl p-2 md:w-[220px] h-[260px] md:h-[320px]"
                  )}
                >
                  <div className="relative h-full  w-full flex flex-col md:flex-row items-center">
                    <div className={cn(
                      "relative h-full transition-all  rounded-xl duration-500 overflow-hidden shrink-0",
                      isActive ? "w-full md:w-2/5 h-1/2 md:h-full" : "w-full h-full"
                    )}>
                    
                      <div className="relative h-full">
                         <img
                        src={industry.imgs[0]}
                        alt={industry.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                      />
                      
                        {
                        isActive && (
                            <button className="absolute bg-white w-[90%] duration-300  mx-auto rounded-full my-auto p-1  h-fit inset-0 transition-all flex gap-4 items-center ">
                       <span className="size-8 flex items-center justify-center rounded-full text-primary bg-primary p-2 ">
                        <Armchair className="h-20 w-20 text-black" />
                       </span>
                       <p className=" font-medium  text-center drop-shadow-lg font-clash-display">
                        Explore more
                       </p>
                      </button>
                        )
                      }
                    
                      </div>
                    
                      {/* <div className="absolute inset-0 bg-black/10 md:bg-transparent group-hover/card:bg-black/20 transition-all" /> */}
                      {!isActive && (
                         <div className="absolute inset-0 flex items-center justify-center p-4 bg-black/20 backdrop-blur-[1px] opacity-100 group-hover/card:bg-black/40 transition-all">
                            <h3 className="text-xl font-bold text-white text-center drop-shadow-lg font-clash-display">
                              {industry.name}
                            </h3>
                         </div>
                      )}
                    </div>

                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="flex flex-col p-2 md:p-10 flex-1 justify-center text-left"
                        >
                          <h3 className="text-2xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 font-clash-display">
                            {industry.name}
                          </h3>
                          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                            {industry.desc}
                          </p>
                       
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center  gap-3">
          {industries.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "h-2 transition-all duration-500 rounded-full",
                activeIndex === idx ? "w-10 bg-primary" : "w-2 bg-primary-200 dark:bg-neutral-800"
              )}
              aria-label={`Go to industry ${idx + 1}`}
            />
          ))}
        </div>
      </div>
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-primary-200 to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-primary-300 to-transparent h-px w-3/4" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-primary-200 to-transparent h-[5px] w-2/4 blur-sm" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-px w-1/4" />
  
    </section>
  );
}