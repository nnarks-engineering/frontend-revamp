import { Link } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

// Import images from personas
import AgricultureImg from "@/assets/img/landing/agriculture.webp";
import ContractorImg from "@/assets/img/landing/contractor.webp";
import ContributorsImg from "@/assets/img/landing/contributors.webp";
import DiasporaImg from "@/assets/img/landing/diaspora.webp";


interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
  scrollProgress: any;
}

function ParallaxText({ children, baseVelocity = 100, scrollProgress }: ParallaxProps) {
  const baseOffset = -33.33;
  const moveRange = 3;
  
  const xRaw = useTransform(
    scrollProgress,
    [0, 1],
    [
      `${baseOffset + (baseVelocity > 0 ? -moveRange : moveRange)}%`, 
      `${baseOffset + (baseVelocity > 0 ? moveRange : -moveRange)}%`
    ]
  );
  
  const x = useSpring(xRaw, {
    stiffness: 400,
    damping: 90,
    mass: 1
  });

  return (
    <div className="flex overflow-hidden whitespace-nowrap flex-nowrap m-0 py-6">
      <motion.div 
        className="flex whitespace-nowrap flex-nowrap gap-12" 
        style={{ x }}
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex gap-12 items-center">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const flags = [
  { name: "Euro", code: "eu" },
  { name: "Pound", code: "gb" },
  { name: "Dollar", code: "us" },
  { name: "Rupee", code: "in" },
  { name: "Pound", code: "eg" },
  { name: "Dirham", code: "ma" },
  { name: "Yen", code: "jp" },
  { name: "Naira", code: "ng" },
  { name: "Cedi", code: "gh" },
  { name: "Kenya", code: "ke" },
  { name: "South Africa", code: "za" },
  { name: "Brazil", code: "br" },
];

const personas = [
  { key: "diasporaInvestor", image: DiasporaImg },
  { key: "localPartner", image: ContractorImg },
  { key: "groupContributor", image: ContributorsImg },
  { key: "buyerSeller", image: AgricultureImg },
];

export default function WhoWeServeSection() {
  const { t } = useTranslation(["landing"]);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const combinedItems = [];
  for (let i = 0; i < flags.length; i++) {
    combinedItems.push({ type: 'flag', data: flags[i] });
    combinedItems.push({ type: 'persona', data: personas[i % personas.length] });
  }

  const renderItem = (item: any, index: number) => {
    if (item.type === 'flag') {
      return (
        <div
          key={`flag-${index}`}
          className="size-24 md:size-32 rounded-full overflow-hidden border-4 !border-primary-500 shrink-0 group hover:border-primary/30 transition-all duration-300 bg-white"
        >
          <img
            src={`https://flagcdn.com/w160/${item.data.code}.png`}
            alt={item.data.name}
            className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
          />
        </div>
      );
    } else {
      return (
        <div
          key={`persona-${index}`}
          className="h-24 md:h-32 p-5 rounded-full overflow-hidden bg-primary shrink-0 group flex items-center gap-5"
        >
          <div className="aspect-square h-full rounded-full overflow-hidden">
            <img
              src={item.data.image}
              alt={item.data.key}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm font-clash-display text-primary-900 mb-1">
               {t(`userPersonas.roles.${item.data.key}.role` as any)}
            </span>
            <span className="font-medium text-[10px] md:text-sm text-primary-900 leading-tight">
               {t(`userPersonas.roles.${item.data.key}.profile` as any).split(' ').slice(0, 2).join(' ')}
            </span>
          </div>
        </div>
      );
    }
  };

  return (
    <section 
      id="who-we-serve"
      ref={sectionRef}
      className="relative py-24 bg-primary-50 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 mb-20 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center md:text-left space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block px-4 py-1.5 rounded-tr-full bg-primary/10 text-primary text-sm font-medium uppercase"
          >
            {t("landing:aboutWhoWeServe.title")}
          </motion.span>
          <h2 className="text-4xl md:text-7xl font-bold font-millik text-primary-950">
            {t("userPersonas.title")}
          </h2>
          <p className="text-primary-800 text-base md:text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed">
            {t("userPersonas.description")}
          </p>
        </div>

        <div className="flex items-center">
          <Link to="/built-for" className="h-16 md:h-20 px-8 md:px-10 rounded-full bg-primary flex items-center gap-4 md:gap-6 group cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary-500/20">
            <div className="size-10 md:size-12 rounded-full bg-secondary flex items-center justify-center text-primary">
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </div>
            <span className="font-bold text-foreground text-lg md:text-xl whitespace-nowrap">
               {t("landing:aboutWhoWeServe.exploreDetails")}
            </span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-6 relative z-10">
        <ParallaxText baseVelocity={-50} scrollProgress={scrollYProgress}>
          {combinedItems.map((item, i) => renderItem(item, i))}
        </ParallaxText>

        <ParallaxText baseVelocity={50} scrollProgress={scrollYProgress}>
          {[...combinedItems].reverse().map((item, i) => renderItem(item, i))}
        </ParallaxText>
      </div>
    </section>
  );
}
