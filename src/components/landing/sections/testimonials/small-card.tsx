import { Quote } from "lucide-react";
import { AnimatedTooltip } from "../../animated-tooltip";
import { useState } from "react";

interface LandingSmallTrustedBusinessCardProps {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating?: number;
  logo?: string;
  gradientClass?: string;
  featureImage?: string;
  videoUrl?: string;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

const LandingSmallTrustedBusinessCard = ({
  name,
  role,
  company,
  quote,
  rating = 5,
  logo,
  gradientClass = "bg-gradient-to-br from-primary-50/50 to-primary-100 dark:from-primary-950 dark:to-secondary-900/50",
  featureImage,
  videoUrl,
}: LandingSmallTrustedBusinessCardProps) => {
  const isWide = !!featureImage;
  const videoId = videoUrl ? getYouTubeId(videoUrl) : null;
  const [playing, setPlaying] = useState(false);

  // ── Video card variant ──────────────────────────────────────────────────────
  if (videoId) {
    const [thumbError, setThumbError] = useState(false);
const thumbnail = thumbError
  ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
      <div  className={`${gradientClass}  relative  overflow-hidden flex flex-col border group
      ${
        isWide
          ? "col-span-2"
          : "flex-col  @max-lg:col-span-2"
      }`}>
        {/* Thumbnail / iframe */}
        <div className="relative w-full aspect-video">
          {playing ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={`${company} testimonial`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              {/* Thumbnail */}
             <img
  src={thumbnail}
  alt={`${company} video testimonial`}
  onError={() => setThumbError(true)}
  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
/>
              {/* Dark scrim */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

              {/* Play button — YouTube red */}
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play video"
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="flex items-center justify-center w-14 h-10 rounded-md bg-[#FF0000] shadow-lg shadow-red-700/40 transition-transform duration-200 group-hover:scale-110">
                  {/* Triangle */}
                  <svg viewBox="0 0 68 48" className="w-8 h-auto fill-white">
                    <path d="M11 10 L11 38 L40 24 Z" />
                  </svg>
                </span>
              </button>

              {/* Bottom bar: logo + title */}
              <div className="absolute bottom-0 inset-x-0 flex items-center gap-2.5 px-3 py-2 bg-gradient-to-t from-black/80 to-transparent">
                {logo && (
                  <img
                    src={logo}
                    alt={company}
                    className="h-6 w-auto object-contain brightness-0 invert"
                  />
                )}
                <p className="text-white text-xs font-medium leading-tight line-clamp-1">
                  {quote}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Caption strip */}
        <div className="flex items-center gap-2 px-3 py-2 bg-secondary-900 backdrop-blur-sm  h-full">
          {logo && (
            <img
              src={logo}
              alt={company}
              className="h-5 w-auto object-contain opacity-70"
            />
          )}
          <p className="text-xs text-foreground/80 line-clamp-1">
            {quote}
          </p>
        </div>
      </div>
    );
  }

  // ── Default card variant ────────────────────────────────────────────────────
  return (
    <div
      className={`relative overflow-hidden p-5 flex gap-4 bg-gradient-to-br from-primary-50/50 to-primary-100 dark:from-secondary-900 dark:to-secondary-900/50 ${
        isWide
          ? "col-span-2"
          : "flex-col  @max-lg:col-span-2"
      }`}
    >
      <Quote
        strokeWidth={0}
        fill="currentColor"
        className="absolute translate-x-1/2 bottom-3 size-40 text-black/5 scale-x-[-1]"
      />

      {isWide && featureImage && (
        <div className="w-2/5 shrink-0 rounded-lg overflow-hidden -m-5 mr-0">
          <img
            src={featureImage}
            alt={`${company} feature`}
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col justify-between flex-1 gap-3 z-10">
        <p className="text-sm text-foreground/80 leading-relaxed flex-1">{quote}</p>

        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-3.5 w-3.5 ${
                i < rating
                  ? "text-amber-400 fill-amber-400"
                  : "text-slate-300 fill-slate-300 dark:text-foreground/50 dark:fill-foreground/50"
              }`}
              viewBox="0 0 20 20"
            >
              <title>rating</title>
              <polygon points="9.9,1.1 7.6,6.6 1.6,7.6 6,11.7 4.9,17.6 9.9,14.6 14.9,17.6 13.8,11.7 18.2,7.6 12.2,6.6" />
            </svg>
          ))}
        </div>

        <AnimatedTooltip item={{ id: company, name, role, company, logo }}>
          <div className="w-fit rounded-t-lg rounded-b-none -mb-5 mx-auto bg-background p-1.5">
            {logo ? (
              <img
                alt={`${company} logo`}
                width={80}
                height={40}
                className="h-8 w-auto object-contain"
                src={logo}
              />
            ) : (
              <div className="h-8 w-8 rounded flex items-center justify-center text-base font-bold text-slate-500">
                {name.charAt(0)}
              </div>
            )}
          </div>
        </AnimatedTooltip>
      </div>
    </div>
  );
};

export default LandingSmallTrustedBusinessCard;
