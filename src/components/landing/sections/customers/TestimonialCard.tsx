import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface TestimonialCardProps {
  children: ReactNode;
  quote: string;
  name: string;
  role: string;
  /**
   * Tailwind classes applied to the bubble wrapper.
   * Use this to control position, offset, width, and responsive overrides.
   *
   * The wrapper is `absolute` by default — you only need to supply
   * the placement utilities (top-*, left-*, translate-*, w-*, etc.).
   *
   * Examples:
   *   "top-full left-1/2 -translate-x-1/2 mt-4 w-60"   ← below, centred
   *   "left-full top-1/2 -translate-y-1/2 ml-4 w-56"   ← right
   *   "right-full top-1/2 -translate-y-1/2 mr-4 w-56"  ← left
   *   "bottom-full left-1/2 -translate-x-1/2 mb-4 w-60" ← above
   *
   * Responsive example (desktop right, mobile below):
   *   "top-full left-1/2 -translate-x-1/2 mt-4 w-52
   *    sm:top-1/2 sm:left-full sm:-translate-y-1/2 sm:translate-x-0 sm:mt-0 sm:ml-4 sm:w-60"
   */
  bubbleClassName?: string;
  /**
   * Which edge the triangle arrow points toward (i.e. toward the avatar).
   * Defaults to "top" (bubble is below the avatar).
   */
  arrowSide?: "top" | "bottom" | "left" | "right";
}

const ARROW_SIZE = 10;
const BUBBLE_COLOR = "rgb(15 23 42 / 0.97)";

function getArrowStyle(side: "top" | "bottom" | "left" | "right"): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 0,
    height: 0,
    pointerEvents: "none",
  };
  const S = ARROW_SIZE;
  const C = BUBBLE_COLOR;
  switch (side) {
    case "top": // bubble is below → arrow points up
      return { ...base, top: -S, left: "50%", transform: "translateX(-50%)",
        borderLeft: `${S}px solid transparent`, borderRight: `${S}px solid transparent`,
        borderBottom: `${S}px solid ${C}` };
    case "bottom": // bubble is above → arrow points down
      return { ...base, bottom: -S, left: "50%", transform: "translateX(-50%)",
        borderLeft: `${S}px solid transparent`, borderRight: `${S}px solid transparent`,
        borderTop: `${S}px solid ${C}` };
    case "left": // bubble is to the right → arrow points left
      return { ...base, left: -S, top: "50%", transform: "translateY(-50%)",
        borderTop: `${S}px solid transparent`, borderBottom: `${S}px solid transparent`,
        borderRight: `${S}px solid ${C}` };
    case "right": // bubble is to the left → arrow points right
      return { ...base, right: -S, top: "50%", transform: "translateY(-50%)",
        borderTop: `${S}px solid transparent`, borderBottom: `${S}px solid transparent`,
        borderLeft: `${S}px solid ${C}` };
  }
}

export const TestimonialCard = ({
  children,
  quote,
  name,
  role,
  bubbleClassName = "top-full left-1/2 -translate-x-1/2 mt-4 w-60",
  arrowSide = "top",
}: TestimonialCardProps) => {
  return (
    <div className="relative">
      {children}

      <div className={`absolute z-50 pointer-events-none ${bubbleClassName}`}>
        {/* Triangle */}
        <div aria-hidden="true" style={getArrowStyle(arrowSide)} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="p-5 bg-slate-900/95 backdrop-blur-xl rounded-[1.5rem] border border-white/10 shadow-2xl"
        >
          <p className="text-slate-200 text-sm italic leading-relaxed mb-4">"{quote}"</p>
          <div>
            <h4 className="text-white font-bold text-base">{name}</h4>
            <p className="text-slate-500 text-xs uppercase tracking-widest">{role}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialCard;