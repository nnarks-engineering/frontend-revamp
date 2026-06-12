import { useRef, useState } from "react";

import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";

interface TooltipItem {
  id: number | string;
  name: string;
  role: string;
  company: string;
  logo?: string | null;
}

function TooltipAvatar({
  item,
  children,
}: {
  item: TooltipItem;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-6, 6]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-20, 20]),
    springConfig
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(() => {
      const target = event.currentTarget as HTMLElement | null;
      if (!target) return;
      const halfWidth = target.offsetWidth / 2;
      x.set(event.nativeEvent.offsetX - halfWidth);
    });
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        x.set(0);
      }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 18,
              },
            }}
            exit={{ opacity: 0, y: 8, scale: 0.92 }}
            style={{
              translateX,
              rotate,
              whiteSpace: "nowrap",
            }}
            className="absolute -top-[4.5rem] left-1/2 z-50 -translate-x-1/2"
          >
            {/* Tooltip card */}
            <div className="flex flex-col gap-0.5 rounded-lg bg-background border border-slate-100 shadow-slate-200/60 px-3.5 py-2.5 min-w-[140px]">
              <span className="text-[13px] font-semibold text-foreground/80 leading-tight">
                {item.name}
              </span>
              <span className="text-[11px] text-foreground/60 leading-tight">
                {item.role}
              </span>
              <span className="text-[11px] font-medium text-primary-600 leading-tight mt-0.5">
                {item.company}
              </span>
            </div>
            {/* Arrow */}
            <div className="absolute left-1/2 -bottom-[5px] -translate-x-1/2 w-2.5 h-2.5 bg-background border-r border-b border-slate-100 rotate-45 shadow-[2px_2px_2px_-1px_rgba(0,0,0,0.04)]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div onMouseMove={handleMouseMove} className="cursor-pointer">
        {children}
      </div>
    </div>
  );
}

export function AnimatedTooltip({
  item,
  children,
}: {
  item: TooltipItem;
  children: React.ReactNode;
}) {
  return <TooltipAvatar item={item}>{children}</TooltipAvatar>;
}
