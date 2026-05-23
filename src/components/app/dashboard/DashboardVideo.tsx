import { Play } from "lucide-react";
import { useState } from "react";

interface DashboardVideoProps {
  title?: string;
  subtitle?: string;
  videoId?: string;
}

export function DashboardVideo({
  title = "Put people at the heart of your business.",
  subtitle = "From onboarding to performance reviews, our HRM software helps you manage your team with care, clarity, and efficiency.",
  videoId = "6DDbLssMJRQ", // Default to the landing page video
}: DashboardVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-sm group bg-black">
      {isPlaying ? (
        <iframe
          className="w-full h-full border-0"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          {/* Thumbnail Image */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

          {/* Play Button & Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <button
              onClick={() => setIsPlaying(true)}
              className="w-16 h-16 rounded-full bg-white/20 mt-10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white mb-6 hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 shadow-xl"
              aria-label="Play video"
            >
              <Play className="w-6 h-6 ml-1" fill="currentColor" />
            </button>

            <div className="max-w-2xl mt-auto pb-4">
              <h2 className="text-xl md:text-3xl font-millik text-white mb-2 drop-shadow-md">
                {title}
              </h2>
              <p className="text-xs md:text-sm text-white/80 font-medium drop-shadow max-w-lg mx-auto">
                {subtitle}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
