import { useRef } from "react";

import { ArrowRight } from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useTranslation } from "react-i18next";

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
  { name: "Canada", code: "ca" },
  { name: "Australia", code: "au" },
  { name: "China", code: "cn" },
  { name: "Singapore", code: "sg" },
];

export default function TickerSection() {
  const { t } = useTranslation(["landing"]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to horizontal movement with a smooth spring
  const xRaw = useTransform(scrollYProgress, [0, 1], [200, -1200]);
  const x = useSpring(xRaw, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <section
      ref={containerRef}
      className="relative py-10 md:py-20 bg-secondary overflow-hidden select-none"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="relative z-10 w-full flow-hidden">
        <motion.div
          style={{ x }}
          className="flex items-center gap-6 whitespace-nowrap"
        >
          {/* THE "PUSHER" - The Lead Item */}
          <div className="flex-shrink-0 h-20 md:h-24 px-8 md:px-10 rounded-full bg-primary w-[30rem] flex justify-end  items-center gap-4 md:gap-6 group cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20">
            <span className="font-normal text-primary-950 text-xl md:text-2xl">{t("landing:ticker.forAll")}</span>
            <div className="size-12 md:size-14 rounded-full bg-primary-950 flex items-center justify-center text-primary">
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* THE FLAGS - Being "pushed" */}
          {flags.map((flag, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="flex-shrink-0 flex items-center gap-4 px-6 py-4 rounded-3xl bg-neutral-50 border border-neutral-100 hover:border-primary/20 hover:bg-white transition-colors cursor-pointer group"
            >
              <div className="size-12 md:size-14 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img
                  src={`https://flagcdn.com/w160/${flag.code}.png`}
                  alt={flag.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-medium text-lg text-neutral-600 group-hover:text-primary transition-colors uppercase tracking-wider">
                {flag.name}
              </span>
            </motion.div>
          ))}

          {/* Duplicate some for extra length if needed */}
          {flags.slice(0, 5).map((flag, i) => (
            <div
              key={`dup-${i}`}
              className="flex-shrink-0 flex items-center gap-4 px-6 py-4 rounded-3xl bg-neutral-50 border border-neutral-100"
            >
              <div className="size-12 md:size-14 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img
                  src={`https://flagcdn.com/w160/${flag.code}.png`}
                  alt={flag.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-medium text-lg text-neutral-600 uppercase tracking-wider">
                {flag.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
