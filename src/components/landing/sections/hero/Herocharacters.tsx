import { motion } from "framer-motion";
import OldManImage from "@/assets/landing/old-man.webp";
import NnarksEngineerImage from "@/assets/landing/nnarks-engineer.webp";
import ClockImage from "@/assets/landing/clock-it-man.webp";

const CARDS = [
  {
    id: "pm",
    name: "Project Manager",
    img: OldManImage,
    // Full Tailwind class strings — no dynamic interpolation so Tailwind keeps them.
    // Add responsive variants here directly, e.g. "translate-y-2 md:translate-y-10"
    translate: "-translate-y-10 md:translate-y-0",
    rotate: "-rotate-[16deg]",
    color: "secondary",
    zIndex: "z-10",
    imgScale: "scale-x-[-1]",
  },
  {
    id: "engineer",
    name: "Engineer",
    img: NnarksEngineerImage,
    translate: "-translate-y-32 sm:-translate-y-36 md:-translate-y-6",
    rotate: "rotate-0",
    color: "primary",
    zIndex: "z-30",
    imgScale: "",
  },
  {
    id: "partner",
    name: "Diaspora Partner",
    img: ClockImage,
    translate: "translate-y-5 md:translate-y-0",
    rotate: "rotate-[16deg]",
    color: "secondary",
    zIndex: "z-20",
    imgScale: "",
  },
];

const BORDER_RADIUS = "0rem";

export function HeroCharacters() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-12">
      {/*
        Tailwind safelist shim — keeps the dynamic bg-* colours from being
        purged. Remove once you add them to your tailwind.config safelist.
      */}
      <div className="hidden bg-red-500 bg-yellow-500 bg-green-500" aria-hidden />

      {/* ── 3-card fan ── */}
      <div className="grid grid-cols-3 relative z-10">
        {CARDS.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 100, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.3,
              delay: 0.15 + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            /*
              Position entirely via Tailwind — edit `translate` and `rotate`
              in the CARDS array, add responsive prefixes there as needed:
                translate: "translate-y-2 md:translate-y-10"
                rotate:    "-rotate-[8deg] md:-rotate-[16deg]"
            */
            className={`group relative flex flex-col justify-end ${card.translate} ${card.rotate} ${card.zIndex}`}
            style={{ transformOrigin: "bottom center" }}
          >
            <div
              className="relative w-full overflow-hidden h-[200%] place-content-end"
              style={{ borderRadius: BORDER_RADIUS }}
            >
              {/* Coloured card backing */}
              <div
                className={`
                  absolute bottom-0 left-0 right-0
                  bg-${card.color}
                  transition-shadow duration-500
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_20px_60px_rgba(23,204,236,0.4)]
                  group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_20px_60px_rgba(23,204,236,0.6)]
                `}
                style={{ top: "22%", borderRadius: BORDER_RADIUS }}
              />

              {/* Image — scale anchors at bottom, grows upward into pt-[8%] */}
              <motion.div
                whileHover={{ scale: 1.05, filter: "brightness(1.08) hue-rotate(5deg)" }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="cursor-pointer relative z-10 flex justify-center items-end pt-[8%]"
                style={{ transformOrigin: "bottom center" }}
              >
                <img
                  src={card.img}
                  alt={card.name}
                  className={`w-full h-auto object-contain object-bottom ${card.imgScale}`}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default HeroCharacters;