import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GhanaImage from "@/assets/landing/ghana.webp"


interface Industry {
  id: string;
  name: string;
  desc: string;
  imgs: string[];
}

const IndustriesSection = () => {
  const { t } = useTranslation('landing');
  const industriesScrollRef = useRef<HTMLDivElement | null>(null);
  const industryCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageTransition, setImageTransition] = useState<'idle' | 'out' | 'in'>('idle');
  const [industryCenterIndex, setIndustryCenterIndex] = useState<number | null>(null);
  const [lastActiveCardIndex, setLastActiveCardIndex] = useState<number | null>(null);
  const [lastShownImageIndex, setLastShownImageIndex] = useState(0);
  const [activeNavIndex, setActiveNavIndex] = useState(0);

  const industryPhaseRef = useRef<'auto' | 'centering' | 'scale_up' | 'holding' | 'scale_down'>(
    'auto',
  );
  const industryPhaseStartRef = useRef(0);
  const industryCenterIndexRef = useRef<number | null>(null);
  const lastCenteredIndexRef = useRef<number | null>(null);
  const centeringStartScrollRef = useRef(0);
  const centeringTargetScrollRef = useRef(0);
  const imageTimerRef = useRef<number | null>(null);
  const lastActiveCardIndexRef = useRef<number | null>(null);
  const lastShownImageIndexRef = useRef(0);
  const manualScrollingRef = useRef(false);
  const manualScrollTimeoutRef = useRef<number | null>(null);
  // Tracks whether the initial snap has been committed
  const initializedRef = useRef(false);
  // Expose centering trigger to external events (like pill clicks)
  const triggerCenteringRef = useRef<(idx: number) => void>(null);

  const industries: Industry[] = [
    {
      id: 'real-estate',
      name: t('industriesServed.sectors.realEstate.industry'),
      desc: t('industriesServed.sectors.realEstate.useCase'),
      imgs: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
      ],
    },
    {
      id: 'agriculture',
      name: t('industriesServed.sectors.agriculture.industry'),
      desc: t('industriesServed.sectors.agriculture.useCase'),
      imgs: [
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop',
      ],
    },
    {
      id: 'energy',
      name: t('industriesServed.sectors.energy.industry'),
      desc: t('industriesServed.sectors.energy.useCase'),
      imgs: [
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=400&fit=crop',
      ],
    },
    {
      id: 'healthcare',
      name: t('industriesServed.sectors.healthcare.industry'),
      desc: t('industriesServed.sectors.healthcare.useCase'),
      imgs: [
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop',
      ],
    },
    {
      id: 'logistics',
      name: t('industriesServed.sectors.logistics.industry'),
      desc: t('industriesServed.sectors.logistics.useCase'),
      imgs: [
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=400&fit=crop',
      ],
    },
    {
      id: 'fintech',
      name: t('industriesServed.sectors.fintech.industry'),
      desc: t('industriesServed.sectors.fintech.useCase'),
      imgs: [
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      ],
    },
    {
      id: 'tourism',
      name: t('industriesServed.sectors.tourism.industry'),
      desc: t('industriesServed.sectors.tourism.useCase'),
      imgs: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop',
      ],
    },
    {
      id: 'mining',
      name: t('industriesServed.sectors.mining.industry'),
      desc: t('industriesServed.sectors.mining.useCase'),
      imgs: [
        'https://images.unsplash.com/photo-1578319439584-104c94d37305?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&h=400&fit=crop',
      ],
    },
    {
      id: 'telecom',
      name: t('industriesServed.sectors.telecom.industry'),
      desc: t('industriesServed.sectors.telecom.useCase'),
      imgs: [
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop',
      ],
    },
    {
      id: 'water',
      name: t('industriesServed.sectors.water.industry'),
      desc: t('industriesServed.sectors.water.useCase'),
      imgs: [
        'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=600&h=400&fit=crop',
      ],
    },
  ];

  const duplicated = [...industries, ...industries];

  useEffect(() => {
    const container = industriesScrollRef.current;
    if (!container) return;

    let animationFrame = 0;

    const centeringDuration = 350;
    const scaleUpDuration = 400;
    const holdDuration = 200;
    const scaleDownDuration = 400;
    const maxScale = 1.15;
    const centerThreshold = 15;

    // ── Instantly jump scroll position (used only for initial load) ──
    const jumpToCard = (idx: number) => {
      const card = industryCardRefs.current[idx];
      if (!card) return;
      const target = card.offsetLeft + card.offsetWidth / 2 - container.clientWidth / 2;
      container.scrollLeft = target;
    };

    // ── Kick off the centering phase for a given card index ──
    // fromCurrent: if true, always start from container.scrollLeft (smooth advance)
    //              if false (init), also jump instantly first so the card is visible
    const beginCentering = (idx: number, now: number, fromCurrent = false) => {
      if (!fromCurrent && idx === lastCenteredIndexRef.current) return;
      const card = industryCardRefs.current[idx];
      if (!card) return;

      industryPhaseRef.current = 'centering';
      industryPhaseStartRef.current = now;
      industryCenterIndexRef.current = idx;
      setIndustryCenterIndex(idx);
      lastActiveCardIndexRef.current = null;
      setLastActiveCardIndex(null);
      centeringStartScrollRef.current = container.scrollLeft;
      centeringTargetScrollRef.current =
        card.offsetLeft + card.offsetWidth / 2 - container.clientWidth / 2;
    };

    // ── External trigger for pill clicks ──
    triggerCenteringRef.current = (targetIndustryIndex: number) => {
      // Clear any pending timers
      if (imageTimerRef.current) {
        window.clearTimeout(imageTimerRef.current);
        imageTimerRef.current = null;
      }

      const currentScroll = container.scrollLeft;
      const L = industries.length;

      // Find which of the duplicated cards is closest to current scroll
      const options = [targetIndustryIndex, targetIndustryIndex + L];
      let bestIdx = options[0];
      let minDelta = Number.POSITIVE_INFINITY;

      for (const idx of options) {
        const card = industryCardRefs.current[idx];
        if (card) {
          const target =
            card.offsetLeft + card.offsetWidth / 2 - container.clientWidth / 2;
          const delta = Math.abs(target - currentScroll);
          if (delta < minDelta) {
            minDelta = delta;
            bestIdx = idx;
          }
        }
      }

      beginCentering(bestIdx, performance.now(), /* fromCurrent */ true);
    };

    const updateCardStyles = (now: number) => {
      const bounds = container.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const maxDistance = bounds.width / 2;
      let closestIndex: number | null = null;
      let closestDistance = Number.POSITIVE_INFINITY;
      const phase = industryPhaseRef.current;
      const centeredIndex = industryCenterIndexRef.current;

      industryCardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(cardCenter - centerX);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }

        const normalized = Math.min(distance / maxDistance, 1);
        card.style.filter = `blur(${normalized * 3}px)`;
        card.style.opacity = `${1 - normalized * 0.4}`;

        let scale = 1;
        if (centeredIndex !== null && index === centeredIndex) {
          const elapsed = now - industryPhaseStartRef.current;
          if (phase === 'scale_up') {
            const progress = Math.min(elapsed / scaleUpDuration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            scale = 1 + (maxScale - 1) * eased;
          } else if (phase === 'holding') {
            scale = maxScale;
          } else if (phase === 'scale_down') {
            const progress = Math.min(elapsed / scaleDownDuration, 1);
            const eased = progress * progress * progress;
            scale = maxScale - (maxScale - 1) * eased;
          }
        }
        card.style.transform = `scale(${scale})`;
      });

      if (closestIndex !== null) {
        const realIndex = closestIndex % industries.length;
        setActiveNavIndex(realIndex);
      }

      // In 'auto' phase: detect when a card is close enough to center and begin centering
      if (
        phase === 'auto' &&
        !manualScrollingRef.current &&
        closestIndex !== null &&
        closestDistance < centerThreshold &&
        closestIndex !== lastCenteredIndexRef.current
      ) {
        beginCentering(closestIndex, now, /* fromCurrent */ false);
      }
    };

    const startImageSlideshow = () => {
      const centeredIdx = industryCenterIndexRef.current;
      if (centeredIdx === null) return;
      const industryIdx = centeredIdx % industries.length;
      const numImages = industries[industryIdx].imgs.length;

      setActiveImageIndex(0);
      setImageTransition('idle');

      if (numImages <= 1) {
        imageTimerRef.current = window.setTimeout(() => {
          const idx = industryCenterIndexRef.current;
          lastActiveCardIndexRef.current = idx;
          setLastActiveCardIndex(idx);
          lastShownImageIndexRef.current = 0;
          setLastShownImageIndex(0);
          industryPhaseRef.current = 'scale_down';
          industryPhaseStartRef.current = performance.now();
        }, holdDuration);
        return;
      }

      const scheduleNextImage = (currentIdx: number) => {
        imageTimerRef.current = window.setTimeout(() => {
          const nextIdx = currentIdx + 1;
          setImageTransition('out');
          window.setTimeout(() => {
            setActiveImageIndex(nextIdx);
            setImageTransition('in');
            window.setTimeout(() => {
              setImageTransition('idle');
              if (nextIdx + 1 < numImages) {
                scheduleNextImage(nextIdx);
              } else {
                const idx = industryCenterIndexRef.current;
                lastActiveCardIndexRef.current = idx;
                setLastActiveCardIndex(idx);
                lastShownImageIndexRef.current = nextIdx;
                setLastShownImageIndex(nextIdx);
                imageTimerRef.current = window.setTimeout(() => {
                  industryPhaseRef.current = 'scale_down';
                  industryPhaseStartRef.current = performance.now();
                }, holdDuration);
              }
            }, 300);
          }, 300);
        }, holdDuration);
      };

      scheduleNextImage(0);
    };

    const advanceToNextCard = () => {
      const finished = industryCenterIndexRef.current;
      const nextIdx =
        finished !== null ? (finished + 1) % duplicated.length : 0;

      // Record the finished card so the proximity guard doesn't re-trigger it
      lastCenteredIndexRef.current = finished;

      // Smooth-scroll to the next card via the centering animation —
      // no jump, so the eased scroll gives the natural snap feel
      const now = performance.now();
      beginCentering(nextIdx, now, /* fromCurrent */ true);
    };

    const step = () => {
      const now = performance.now();
      const phase = industryPhaseRef.current;
      const elapsed = now - industryPhaseStartRef.current;

      if (phase === 'centering') {
        const progress = Math.min(elapsed / centeringDuration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        container.scrollLeft =
          centeringStartScrollRef.current +
          (centeringTargetScrollRef.current - centeringStartScrollRef.current) * eased;
        if (progress >= 1) {
          industryPhaseRef.current = 'scale_up';
          industryPhaseStartRef.current = now;
          setActiveImageIndex(0);
          setImageTransition('idle');
        }
      } else if (phase === 'scale_up') {
        if (elapsed >= scaleUpDuration) {
          industryPhaseRef.current = 'holding';
          industryPhaseStartRef.current = now;
          startImageSlideshow();
        }
      } else if (phase === 'scale_down') {
        if (elapsed >= scaleDownDuration) {
          advanceToNextCard();
        }
      }

      updateCardStyles(now);
      animationFrame = requestAnimationFrame(step);
    };

    const onScroll = () => {
      // If the user scrolls manually, pause the auto-animation briefly
      if (industryPhaseRef.current !== "centering") {
        manualScrollingRef.current = true;
        if (manualScrollTimeoutRef.current)
          window.clearTimeout(manualScrollTimeoutRef.current);
        manualScrollTimeoutRef.current = window.setTimeout(() => {
          manualScrollingRef.current = false;
          manualScrollTimeoutRef.current = null;
        }, 1500);
      }
    };
    container.addEventListener("scroll", onScroll, { passive: true });

    // ── Init: wait one rAF so the DOM has laid out, then jump+begin ──
    animationFrame = requestAnimationFrame(() => {
      if (!initializedRef.current) {
        initializedRef.current = true;
        jumpToCard(0);
        // Give the scroll a single frame to settle, then start centering
        animationFrame = requestAnimationFrame(() => {
          beginCentering(0, performance.now(), /* fromCurrent */ false);
          animationFrame = requestAnimationFrame(step);
        });
      }
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      if (imageTimerRef.current) window.clearTimeout(imageTimerRef.current);
      container.removeEventListener("scroll", onScroll);
    };
  }, []);


  return (
    <section
      id="industries"
      className="relative min-h-screen w-full bg-primary-950 overflow-hidden px-0 py-12 sm:px-4 md:px-10 lg:px-16"
    >
      <div
        className="absolute inset-0 bg-fixed pointer-events-none opacity-20"
        style={{
          backgroundImage: `url(${GhanaImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col gap-8">

        {/* ── Header ── */}
        <div className="text-center px-4">
          <p className="text-3xl sm:text-4xl font-clash-display font-semibold text-white">
            {t('industriesServed.title')}
          </p>
        </div>

        {/* ── Pill nav ── */}
        <div className="flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-2 px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {industries.map((industry, i) => (
            <button
              key={industry.id}
              type="button"
              onClick={() => triggerCenteringRef.current?.(i)}
              className={`
                rounded-full px-3 py-1 text-xs font-medium tracking-wide transition-all duration-300
                cursor-pointer hover:scale-105 active:scale-95
                ${
                  activeNavIndex === i
                    ? "border-primary-500 bg-primary-500/10 text-primary scale-105"
                    : "border-white/30 bg-white/10 text-white/70 hover:bg-white/20"
                }
              `}
            >
              {industry.name}
            </button>
          ))}
        </div>

        {/* ── Carousel ── */}
        <div className="relative">
          <div
            style={{ overflowX: "hidden", overflowY: "visible" }}
            className="mx-0 sm:mx-8"
          >
            <div
              ref={industriesScrollRef}
              className="w-full overflow-x-auto py-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ overflowY: 'visible' }}
            >
              <div className="flex w-max gap-8 sm:gap-10 md:gap-12">
                {duplicated.map((industry, index) => {
                  const isActive = industryCenterIndex === index;
                  const wasLastActive = lastActiveCardIndex === index;
                  const currentImg = isActive
                    ? activeImageIndex
                    : wasLastActive
                      ? lastShownImageIndex
                      : 0;

                  return (
                    <div
                      key={`${industry.id}-${index}`}
                      ref={(el) => {
                        industryCardRefs.current[index] = el;
                      }}
                      className="
                        w-44 overflow-hidden border border-white/60 bg-white/90 shadow-xl
                        sm:w-52 md:w-60 lg:w-72
                      "
                      style={{ willChange: 'transform, filter, opacity' }}
                    >
                      {/* Image area */}
                      <div className="relative h-56 w-full overflow-hidden bg-white sm:h-64 md:h-72">
                        <img
                          src={industry.imgs[currentImg] || industry.imgs[0]}
                          alt={`${industry.name} industry`}
                          className={`absolute inset-0 h-full w-full object-cover ${
                            isActive && imageTransition === 'out'
                              ? 'animate-slide-out-left'
                              : isActive && imageTransition === 'in'
                                ? 'animate-slide-in-right'
                                : ''
                          }`}
                        />
                        {industry.imgs.length > 1 && (
                          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                            {industry.imgs.map((_, imgIdx) => (
                              <div
                                key={imgIdx}
                                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                                  imgIdx === currentImg ? 'scale-125 bg-white' : 'bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Text area */}
                      <div className="px-4 py-3 sm:px-5 sm:py-4">
                        <h3 className="mb-1 text-sm font-black tracking-widest text-[#0f172a] uppercase sm:text-base">
                          {industry.name}
                        </h3>
                        <p className="text-[11px] leading-relaxed font-medium text-slate-600 sm:text-[13px]">
                          {industry.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default IndustriesSection;