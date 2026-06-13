import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/shared/lib/utils";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: React.ReactNode;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const hasInitialized = useRef(false);
  const [start, setStart] = useState(false);

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse",
      );
    }
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  }, [speed]);

  useEffect(() => {
    if (
      hasInitialized.current ||
      !containerRef.current ||
      !scrollerRef.current
    )
      return;

    const scrollerContent = Array.from(scrollerRef.current.children);
    for (const item of scrollerContent) {
      const duplicatedItem = item.cloneNode(true);
      scrollerRef.current.appendChild(duplicatedItem);
    }

    hasInitialized.current = true;
    setStart(true);
  }, []);

  useEffect(() => {
    getDirection();
    getSpeed();
  }, [getDirection, getSpeed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            className="flex items-center justify-center w-auto h-20 px-8"
            key={typeof item.name === 'string' ? item.name + '-' + idx : idx}
          >
            {item.quote}
          </li>
        ))}
      </ul>
    </div>
  );
};
