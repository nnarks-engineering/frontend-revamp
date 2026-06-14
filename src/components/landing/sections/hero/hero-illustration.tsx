import { useEffect, useRef, useState } from "react";

import realBuilding from "@/assets/landing/real-building.png"

// ─────────────────────────────────────────────────────────────────────────────
// ✏️  LAYOUT CONFIG — tweak Tailwind classes here to adjust positioning
//     without touching JSX. Add responsive prefixes freely, e.g.:
//       top:   "top-[8%] md:top-[10%]"
//       left:  "left-[3%] md:left-[5%]"
//       width: "w-[160px] md:w-[240px]"
// ─────────────────────────────────────────────────────────────────────────────
const CONFIG = {
  plane: {
    top:    "top-0  sm:top-1/3 lg:top-[10%] ",
    left:   "left-1/4 sm:left-1/4 md:left-[5%]",
    width:  "w-[160px] md:w-[240px]",
    // Pixel values still needed for the SVG element's own width/height attrs
    svgW:   240,
    svgH:   120,
  },
  logo: {
    top:    "top-[50%]",
    left:   "left-[50%]",
    width:  "w-[70px] md:w-[90px]",
    svgW:   90,
    svgH:   80,
  },
  building: {
    bottom: "bottom-[0%]",
    right:  "right-[0%]",
    // clamp still lives here because Tailwind can't express clamp() natively
    width:  "clamp(160px, 28vw, 420px)",
  },
  lines: {
    // Where line 1 leaves the plane  (fraction of plane's w/h)
    planeExitX:    1.2,   // 1.0 = right edge
    planeExitY:    0.5,   // 0.5 = vertical centre
    // Where line 1 arrives at the logo  (fraction of logo's w/h)
    logoEntryX:    0.1,   // 0.0 = left edge
    logoEntryY:    0.2,   // 0.5 = vertical centre
    // Where line 2 leaves the logo  (fraction of logo's w/h)
    logoExitX:     1.0,   // 1.0 = right edge
    logoExitY:     0.5,   // 0.5 = vertical centre
    // Where line 2 arrives at the building  (fraction of building's w/h)
    buildingEntryX: 0.0,  // 0.0 = left edge
    buildingEntryY: 0.5,  // 0.4 = ~40% down (upper-mid of building)

    strokeWidth1:  3,
    strokeWidth2:  4,
    dashArray1:    "6 18",
    dashArray2:    "7 20",
    dashLen:       900,   // must be >= longest possible path length
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// SVG path data
// ─────────────────────────────────────────────────────────────────────────────
const PLANE_PATH_1 =
  "m 8.684570,21.741953 a 11.223,11.223 0 0 1 3.781,-2.15 25.346,25.346 0 0 1 9.608,-1.045 43.45,43.45 0 0 1 7.062,0.984 l 108.484,30.691003 q 3.073,0.863 6.043,2.011004 c 6.993,-2.737007 26.762,-10.653007 28.929,-13.493007 l 8.5,2.486 -14.175,21.159007 v 0 a 1.942,1.942 0 0 1 -0.147,3.617 c -16.342,5.611 -41.023,-1.839 -41.023,-1.839 l -94.789,-27.081007 c 0,0 -28.607,-9.677 -22.273,-15.34 z";
const PLANE_PATH_2 =
  "m 181.08657,41.157453 -14.175,21.228007 -23.153,-10.264 c 0,0 26.2,-10.000007 28.825,-13.450007 z";
const PLANE_PATH_3 =
  "m 78.25157,44.343453 37.406,10.100007 2.21,4.42 z";

const CLOUD_PATH_1 =
  "m 120.44765,19.790059 6.9113,4.38277 -4.19619,-7.62942 a 6.83372,6.83372 0 0 1 4.17938,-1.49172 q 0.0557,0 0.11122,0.001 a 8.00891,8.00891 0 0 0 1.434,-0.106 l 2.34212,1.48524 -1.004,-1.82554 a 8.3362,8.3362 0 0 0 4.09749,-3.10967 l 4.19216,2.65846 -2.64848,-4.8151599 a 12.268,12.268 0 0 1 9.39229,-4.74728 c 4.35937,0 8.24271,2.59264 10.74964,6.6321599 a 8.03536,8.03536 0 0 0 7.10536,3.83111 q 0.11687,-0.004 0.23445,-0.004 c 4.8126,0 8.714,5.45661 8.714,12.1877 0,6.73109 -3.90139,12.18769 -8.714,12.18769 a 6.53926,6.53926 0 0 1 -3.03525,-0.7599 12.57492,12.57492 0 0 0 -10.54716,-0.2062 10.99464,10.99464 0 0 1 -8.96695,0.0208 12.584,12.584 0 0 0 -10.4538,0.20208 6.53371,6.53371 0 0 1 -3.00317,0.74326 c -4.8126,0 -8.714,-5.45662 -8.714,-12.18769 a 15.47584,15.47584 0 0 1 1.81959,-7.44933 z";
const CLOUD_PATH_2 =
  "m 20.105978,74.066195 6.9113,4.38277 -4.19619,-7.62942 a 6.83372,6.83372 0 0 1 4.17933,-1.49172 q 0.0557,0 0.11122,10e-4 a 8.00891,8.00891 0 0 0 1.434,-0.106 l 2.34212,1.48524 -1.004,-1.82554 a 8.33626,8.33626 0 0 0 4.09749,-3.10967 l 4.19216,2.65846 -2.64843,-4.81516 a 12.268,12.268 0 0 1 9.392294,-4.74728 c 4.35937,0 8.24271,2.59264 10.74964,6.63216 a 8.03536,8.03536 0 0 0 7.10536,3.83111 q 0.11686,-0.004 0.23445,-0.004 c 4.8126,0 8.714,5.45661 8.714,12.1877 0,6.73109 -3.90139,12.18769 -8.714,12.18769 a 6.53926,6.53926 0 0 1 -3.03525,-0.7599 12.57492,12.57492 0 0 0 -10.54716,-0.2062 10.99464,10.99464 0 0 1 -8.966954,0.0208 12.58394,12.58394 0 0 0 -10.4538,0.20208 6.53371,6.53371 0 0 1 -3.00317,0.74326 c -4.8126,0 -8.714,-5.45662 -8.714,-12.18769 a 15.47584,15.47584 0 0 1 1.81959,-7.44933 z";

// const BUILDING_PATH =
//   "M 393.1054,2.3409364 V 27.340936 h -90.99999 v 25 h -79 V 314.34094 h -42 v -117 h -65 v -76 h -44 v 76 h -65 v 117 h -42 v 415 h 96 v -147 h 66 v 147 h 257.99999 v -171 z" +
//   " M -0.40759,365.34094 h 38 v 30 h -38 z m 0.5,84 h 38 v 30 h -38 z m 38.5,114 h -38 v -30 h 38 z" +
//   " m 99.5,-271 h -88 v -18 h 88 z m 0,-26 h -88 v -18 h 88 z m 0,-26 h -88 v -18 h 88 z" +
//   " m 12.5,125 h 38 v 30 h -38 z m 0.5,84 h 38 v 30 h -38 z m 38.5,114 h -38 v -30 h 38 z" +
//   " m 155.5,-50 h -70 v -31 h 70 z m 0,-89 h -70 v -31 h 70 z m 0,-89 h -70 v -31 h 70 z" +
//   " m 0,-89 h -70 v -31 h 70 z m 0,-89 h -70 v -31 h 70 z";

const LOGO_PATH_LIGHT =
  "m 686.20029,48.953285 c -3.49281,3.78882 -11.95845,18.20409 -18.82568,32.02737 -9.20565,18.52968 -82.61402,154.127985 -108.95815,201.281015 -30.22177,54.07948 -87.76447,158.33121 -114.375,207.20106 -19.95051,36.64499 -43.98582,80.60122 -53.42827,97.68051 -9.44246,17.07927 -26.72893,49.07703 -38.421,71.04034 -11.69206,21.96333 -24.15373,44.78508 -27.73534,50.70505 l -6.48243,10.74488 5.86082,1.5392 c 12.60966,3.28561 87.97165,-14.3856 150.69437,-35.34257 22.02251,-7.37044 51.41548,-18.26329 65.32754,-24.21293 l 25.30813,-10.83364 28.83054,-48.84026 c 15.83609,-26.84735 33.38898,-57.48349 38.98341,-68.08035 5.59442,-10.59685 15.15528,-27.88334 21.25291,-38.48019 6.09763,-10.59686 20.12809,-35.43139 31.16896,-55.26349 11.04085,-19.8025 32.91537,-55.64829 48.60344,-79.65401 15.68809,-24.00572 35.75699,-52.89547 44.60743,-64.20273 21.04571,-26.90654 20.92731,-30.07375 -2.9304,-79.6244 C 765.23269,194.91163 754.01424,170.4915 750.72862,162.35146 744.8086,147.58097 700.43798,53.659705 696.97474,48.598075 l -4.46961,-6.57122 -6.33443,6.86722 z" +
  " M 800.30888,333.32193 c -9.70885,10.18245 -25.72253,29.83696 -35.63857,43.66023 -9.88647,13.82326 -23.68012,36.49698 -30.63616,50.32025 -20.09851,39.96022 -23.76893,81.07482 -10.68566,119.14062 17.19768,49.99465 51.11946,88.03084 100.87732,113.22057 44.96263,22.73292 173.33848,62.87069 189.05609,59.11145 5.8609,-1.42078 6.7193,-3.04879 5.3577,-9.97523 -2.4273,-12.16562 -182.78093,-379.85871 -190.71378,-388.82755 -2.51601,-2.84162 -5.80163,-5.18003 -7.28164,-5.18003 -1.48,0 -10.65605,8.31764 -20.3353,18.5001 z";
const LOGO_PATH_PRIMARY =
  "m 2.7919982,10.739475 c -1.0360058,4.08483 1.7168089,14.8297 7.0152354,27.38015 C 55.953864,147.49218 113.70377,280.90007 166.45124,399.92227 c 6.92643,15.59929 12.49126,24.42013 15.45128,24.42013 8.85045,0 66.74834,-65.77154 84.36043,-95.8453 4.14401,-7.07444 10.71525,-20.69049 14.62248,-30.31054 3.90722,-9.59046 9.17604,-27.55775 11.72165,-39.93062 3.84803,-18.61849 4.08483,-25.48573 1.30242,-39.93059 -3.10803,-16.28009 -15.51048,-53.81308 -21.93373,-66.30436 -3.7592,-7.34083 -11.92885,-19.92089 -18.14488,-28.03132 C 219.67231,79.589445 160.88642,48.361285 47.813829,14.469105 28.603331,8.6970749 10.96164,3.9906449 8.652828,3.9906449 c -2.3088114,0 -4.9728255,3.01922 -5.8904308,6.7192401 z" +
  " M 662.96418,35.396415 c -57.80909,20.83851 -120.17661,40.2266 -161.32083,50.17225 -30.13295,7.28164 -57.86829,14.20807 -61.65712,15.421685 -5.20962,1.6576 -13.49766,14.94808 -33.71457,53.99066 -28.35694,54.78989 -85.89964,157.14721 -102.06132,181.50815 -10.59684,15.98407 -27.46894,37.85858 -37.47378,48.57383 -10.00486,10.74486 -30.51775,29.33376 -45.58424,41.35141 -15.06648,12.01766 -27.38015,23.65053 -27.38015,25.90014 0,3.96642 19.68411,49.75785 56.0627,130.35907 41.44021,91.90847 65.06113,140.60074 68.10994,140.60074 1.68722,0 6.63044,-5.65367 11.04087,-12.58011 4.41041,-6.92644 17.52328,-30.57693 29.15614,-52.54025 11.63287,-21.96331 28.88975,-53.96107 38.33219,-71.04036 9.44245,-17.07927 33.47778,-61.03552 53.42828,-97.68051 26.61054,-48.86984 84.18283,-153.12158 114.37499,-207.20104 26.40333,-47.27145 100.0189,-183.254545 110.05336,-203.264245 7.45924,-14.94808 14.94808,-28.00173 16.63527,-29.03775 1.68722,-1.03601 3.04883,-3.64081 3.04883,-5.83123 0,-2.16081 -2.33841,-6.68962 -5.18003,-10.06405 l -5.18003,-6.12724 -20.72009,7.45925 z";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface Lines {
  d1: string;
  d2: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
const HeroIllustration = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRef     = useRef<HTMLDivElement>(null);
  const logoRef      = useRef<HTMLDivElement>(null);
  const buildingRef  = useRef<HTMLDivElement>(null);

  const [lines,       setLines]       = useState<Lines>({ d1: "", d2: "" });
  const [started,     setStarted]     = useState(false);
  const [linesReady,  setLinesReady]  = useState(false);

  const computeLines = () => {
    const container = containerRef.current;
    const plane     = planeRef.current;
    const logo      = logoRef.current;
    const building  = buildingRef.current;
    if (!container || !plane || !logo || !building) return;

    const base = container.getBoundingClientRect();

    // Convert a DOMRect to coordinates relative to the container
    const rel = (el: HTMLDivElement) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left - base.left,
        y: r.top  - base.top,
        w: r.width,
        h: r.height,
      };
    };

    const p = rel(plane);
    const l = rel(logo);
    const b = rel(building);

    const { lines: lc } = CONFIG;

    // Line 1: plane exit → logo entry
    const p1x = p.x + p.w * lc.planeExitX;
    const p1y = p.y + p.h * lc.planeExitY;
    const l1x = l.x + l.w * lc.logoEntryX;
    const l1y = l.y + l.h * lc.logoEntryY;

    // Line 2: logo exit → building entry
    const l2x = l.x + l.w * lc.logoExitX;
    const l2y = l.y + l.h * lc.logoExitY;
    const b2x = b.x + b.w * lc.buildingEntryX;
    const b2y = b.y + b.h * lc.buildingEntryY;

    setLines({
      d1: `M ${p1x},${p1y} H ${l1x} V ${l1y}`,
      d2: `M ${l2x},${l2y} H ${b2x} V ${b2y}`,
    });
    setLinesReady(true);
  };

  useEffect(() => {
    const t = setTimeout(() => {
      computeLines();
      setStarted(true);
    }, 120);

    const ro = new ResizeObserver(computeLines);
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, [computeLines]);

  const { dashLen } = CONFIG.lines;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
    >
      <style>{`
        /* ── Plane ── */
        .hi-plane {
          opacity: 0;
          transform: translateX(-80px) translateY(15px);
          transition:
            opacity   0.5s ease 0.4s,
            transform 1.3s cubic-bezier(0.22,1,0.36,1) 0.4s;
        }
        .hi-plane.go {
          opacity: 1;
          transform: none;
        }
        @keyframes hi-float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-5px); }
        }
        .hi-plane.go { animation: hi-float 3.5s ease-in-out 2s infinite; }

        /* ── Logo ── */
        .hi-logo {
          opacity: 0;
          transform: scale(0.65);
          transform-origin: center center;
          transition:
            opacity   0.6s ease 0.9s,
            transform 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.9s;
        }
        .hi-logo.go {
          opacity: 1;
          transform: scale(1);
        }
        @keyframes hi-pulse {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.06); }
        }
        .hi-logo.go { animation: hi-pulse 4s ease-in-out 2s infinite; }

        /* ── Building ── */
        .hi-building {
          opacity: 0;
          transform: translateY(50px);
          transition:
            opacity   0.7s ease 0.1s,
            transform 1.1s cubic-bezier(0.22,1,0.36,1) 0.1s;
        }
        .hi-building.go {
          opacity: 1;
          transform: none;
        }

        /* ── Clouds ── */
        .hi-clouds {
          opacity: 0;
          transition: opacity 0.9s ease 0.3s;
        }
        .hi-clouds.go { opacity: 1; }

        /* ── Connector lines ── */
        .hi-line1 {
          stroke-dashoffset: ${dashLen};
          transition: stroke-dashoffset 1.1s ease 1.3s;
        }
        .hi-line1.go { stroke-dashoffset: 0; }

        .hi-line2 {
          stroke-dashoffset: ${dashLen};
          transition: stroke-dashoffset 1.1s ease 1.7s;
        }
        .hi-line2.go { stroke-dashoffset: 0; }
      `}</style>

      {/* ── Connector SVG (sits behind all elements) ── */}
      <svg
        className="hidden absolute inset-0 w-full h-full overflow-visible pointer-events-none z-[1]"
      >
        {linesReady && (
          <>
            <path
              className={`hi-line1${started ? " go" : ""}`}
              d={lines.d1}
              fill="none"
              stroke="var(--color-secondary)"
              strokeWidth={CONFIG.lines.strokeWidth1}
              strokeLinecap="square"
              strokeDasharray={CONFIG.lines.dashArray1}
              strokeDashoffset={dashLen}
            />
            <path
              className={`hi-line2${started ? " go" : ""}`}
              d={lines.d2}
              fill="none"
              stroke="var(--color-secondary)"
              strokeWidth={CONFIG.lines.strokeWidth2}
              strokeLinecap="square"
              strokeDasharray={CONFIG.lines.dashArray2}
              strokeDashoffset={dashLen}
            />
          </>
        )}
      </svg>

      {/* ── PLANE — top-left ── */}
      <div
        ref={planeRef}
        className={`hi-plane${started ? " go" : ""} absolute z-[2] leading-[0] ${CONFIG.plane.top} ${CONFIG.plane.left} ${CONFIG.plane.width}`}
      >
        <svg
          viewBox="0 0 200 100"
          width={CONFIG.plane.svgW}
          height={CONFIG.plane.svgH}
          overflow="visible"
          className="w-full h-auto"
        >
          <g className={`hi-clouds${started ? " go" : ""}`}>
            <path d={CLOUD_PATH_1} fill="var(--color-secondary)" />
            <path d={CLOUD_PATH_2} fill="var(--color-secondary)" />
          </g>
          <path d={PLANE_PATH_1} fill="var(--color-primary)" />
          <path d={PLANE_PATH_2} fill="var(--color-primary)" />
          <path d={PLANE_PATH_3} fill="var(--color-background,#ffffff)" />
        </svg>
      </div>

      {/* ── LOGO — right-of-centre, between plane row and building ── */}
      <div
        ref={logoRef}
        className={`hidden hi-logo${started ? " go" : ""} absolute z-[10] leading-[0] ${CONFIG.logo.top} ${CONFIG.logo.left} ${CONFIG.logo.width}`}
      >
        <svg
          viewBox="0 0 1006 730"
          width={CONFIG.logo.svgW}
          height={CONFIG.logo.svgH}
          overflow="visible"
          className="w-full h-auto"
        >
          <path
            d={LOGO_PATH_LIGHT}
            fill="var(--color-secondary)"
            stroke="var(--color-secondary)"
            strokeLinejoin="round"
            strokeWidth="6"
          />
          <path
            d={LOGO_PATH_PRIMARY}
            fill="var(--color-primary)"
            stroke="var(--color-primary)"
            strokeLinejoin="round"
            strokeWidth="6"
          />
        </svg>
      </div>

      {/* ── BUILDING — bottom-right ── */}
      <div
        ref={buildingRef}
        className={`hi-building hidden${started ? " go" : ""} absolute z-[2] leading-[0] ${CONFIG.building.bottom} ${CONFIG.building.right}`}
      >
        {/* <svg
          viewBox="0 0 400 732"
          style={{
            width:   CONFIG.building.width,
            height:  "auto",
            display: "block",
          }}
          overflow="visible"
        >
          <path d={BUILDING_PATH} fill="var(--color-secondary)" />
        </svg> */}
        <img
          style={{
            width:   CONFIG.building.width,
            height:  "auto",
            display: "block",
          }}
          src={realBuilding}
          alt=""
        />
      </div>
    </div>
  );
};

export default HeroIllustration;