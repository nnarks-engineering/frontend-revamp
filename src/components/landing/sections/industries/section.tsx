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
  // Track the "real" active industry index (0–N) for the pill nav
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

  useEffect(() => {
    const container = industriesScrollRef.current;
    if (!container) return;

    let animationFrame = 0;

    const scrollSpeed = 0.8;
    const centeringDuration = 350;
    const scaleUpDuration = 400;
    const holdDuration = 200;
    const scaleDownDuration = 400;
    const maxScale = 1.15;
    const centerThreshold = 15;

    const updateCardStyles = (now: number) => {
      const bounds = container.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const maxDistance = bounds.width / 2;
      let closestIndex: number | null = null;
      let closestDistance = Number.POSITIVE_INFINITY;
      let closestCard: HTMLDivElement | null = null;
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
          closestCard = card;
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

      // Update the active nav pill based on closest card (mod industries.length)
      if (closestIndex !== null) {
        const realIndex = closestIndex % industries.length;
        setActiveNavIndex(realIndex);
      }

      if (
        phase === 'auto' &&
        !manualScrollingRef.current &&
        closestIndex !== null &&
        closestCard &&
        closestDistance < centerThreshold
      ) {
        if (closestIndex !== lastCenteredIndexRef.current) {
          industryPhaseRef.current = 'centering';
          industryPhaseStartRef.current = now;
          industryCenterIndexRef.current = closestIndex;
          setIndustryCenterIndex(closestIndex);
          lastActiveCardIndexRef.current = null;
          setLastActiveCardIndex(null);
          centeringStartScrollRef.current = container.scrollLeft;
          const cardEl = closestCard as HTMLDivElement;
          const cardCenter = cardEl.offsetLeft + cardEl.offsetWidth / 2;
          centeringTargetScrollRef.current = cardCenter - container.clientWidth / 2;
        }
      }

      if (lastCenteredIndexRef.current !== null && closestIndex !== lastCenteredIndexRef.current) {
        lastCenteredIndexRef.current = null;
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

    const step = () => {
      const now = performance.now();
      const phase = industryPhaseRef.current;
      const elapsed = now - industryPhaseStartRef.current;

      if (phase === 'auto') {
        if (!manualScrollingRef.current) container.scrollLeft += scrollSpeed;
      } else if (phase === 'centering') {
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
          lastCenteredIndexRef.current = industryCenterIndexRef.current;
          industryPhaseRef.current = 'auto';
          industryCenterIndexRef.current = null;
          setIndustryCenterIndex(null);
          setImageTransition('idle');
        }
      }

      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
        lastCenteredIndexRef.current = null;
      }

      updateCardStyles(now);
      animationFrame = requestAnimationFrame(step);
    };

    step();
    return () => {
      cancelAnimationFrame(animationFrame);
      if (imageTimerRef.current) window.clearTimeout(imageTimerRef.current);
    };
  }, []);

  const handleManualScroll = (direction: 'left' | 'right') => {
    const container = industriesScrollRef.current;
    if (!container) return;

    if (manualScrollTimeoutRef.current) window.clearTimeout(manualScrollTimeoutRef.current);
    manualScrollingRef.current = true;

    if (imageTimerRef.current) {
      window.clearTimeout(imageTimerRef.current);
      imageTimerRef.current = null;
    }
    if (industryCenterIndexRef.current !== null) {
      const idx = industryCenterIndexRef.current;
      lastActiveCardIndexRef.current = idx;
      setLastActiveCardIndex(idx);
      lastShownImageIndexRef.current = activeImageIndex;
      setLastShownImageIndex(activeImageIndex);
    }

    industryPhaseRef.current = 'auto';
    industryCenterIndexRef.current = null;
    setIndustryCenterIndex(null);
    lastCenteredIndexRef.current = null;
    setImageTransition('idle');

    const scrollAmount = 350;
    const halfWidth = container.scrollWidth / 2;

    if (direction === 'left') {
      if (container.scrollLeft < scrollAmount) {
        container.scrollTo({
          left: halfWidth + container.scrollLeft - scrollAmount,
          behavior: 'smooth',
        });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    manualScrollTimeoutRef.current = window.setTimeout(() => {
      manualScrollingRef.current = false;
      manualScrollTimeoutRef.current = null;
    }, 600);
  };

  const duplicated = [...industries, ...industries];

  return (
    <section
      id="industries"
      className="relative min-h-screen w-full bg-primary-950 overflow-hidden px-3 py-10 sm:px-4 sm:py-12 md:px-10 md:py-16 lg:px-16"
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
        <div className="text-center">
          <p className="text-4xl font-clash-display font-semibold text-white">
            {t('industriesServed.title')}
          </p>
        </div>

        {/* ── Pill nav — one pill per real industry, no duplication ── */}
        <div className="flex flex-wrap justify-center gap-2 px-2">
          {industries.map((industry, i) => (
            <span
              key={industry.id}
              className={`
                rounded-full px-3 py-1 text-xs font-medium tracking-wide transition-all duration-300
                ${
                  activeNavIndex === i
                    ? 'border-primary-500 bg-primary-500/10  text-primary scale-105'
                    : 'border-white/30 bg-white/10 text-white/70'
                }
              `}
            >
              {industry.name}
            </span>
          ))}
        </div>

        {/* ── Carousel ── */}
        {/*
          Key overflow fix:
          - The outer wrapper clips only on x (overflow-x: hidden) so left/right
            edges are hidden, but overflow-y is visible so scaled cards aren't clipped.
          - We add vertical padding inside the scroll track so the scaled card
            (maxScale 1.15) has room to breathe without touching section edges.
        */}
        <div className="relative">
          {/* Left arrow */}
          <button
            type="button"
            aria-label="Scroll industries left"
            onClick={() => handleManualScroll('left')}
            className="
              absolute left-0 top-1/2 z-20 -translate-y-1/2 -translate-x-1/2
              flex h-10 w-10 items-center justify-center
              rounded-full border border-white/60 bg-white/10 text-white shadow-xl backdrop-blur-sm
              transition-all duration-200 hover:scale-110 hover:border-white hover:bg-white/20 active:scale-95
              sm:-translate-x-4
            "
          >
            <ChevronLeft size={18} />
          </button>

          {/* Right arrow */}
          <button
            type="button"
            aria-label="Scroll industries right"
            onClick={() => handleManualScroll('right')}
            className="
              absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-1/2
              flex h-10 w-10 items-center justify-center
              rounded-full border border-white/60 bg-white/10 text-white shadow-xl backdrop-blur-sm
              transition-all duration-200 hover:scale-110 hover:border-white hover:bg-white/20 active:scale-95
              sm:translate-x-4
            "
          >
            <ChevronRight size={18} />
          </button>

          {/*
            Clip wrapper: hides the horizontal overflow from the scroll track
            while letting vertical overflow (scaled card) show through.
            overflow-x:hidden + overflow-y:visible only works on a block element
            that is NOT the scroll container itself.
          */}
          <div
            style={{ overflowX: 'hidden', overflowY: 'visible' }}
            className="mx-6 sm:mx-8"
          >
            {/*
              Scroll track: padding-y gives clearance so the scaled card
              (up to 1.15×) doesn't get cut off top/bottom.
              We do NOT set overflow-hidden here — the clip wrapper above handles that.
            */}
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
                      // transition-transform is handled by the rAF loop via inline style;
                      // keeping it here for non-animated state changes
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