"use client";

import { useEffect, useRef, useState } from "react";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "600"] });

const MAX_TILT = 7; // degrees of 3D tilt
const PARALLAX = 14; // pixels the video shifts for perspective depth

export type ServiceCardProps = {
  title: string;
  href: string;
  video: string;
  hoverVideo?: string;
};

export default function ServiceCard({
  title,
  href,
  video,
  hoverVideo,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const baseVideoRef = useRef<HTMLVideoElement>(null);
  const hoverVideoRef = useRef<HTMLVideoElement>(null);

  const [hovered, setHovered] = useState(false);
  const [introEnded, setIntroEnded] = useState(false);
  // Pos ranges from -0.5 to 0.5 relative to card center
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // Determine hover video source (either explicit prop or auto -hover suffix)
  const hoverSrc = hoverVideo || video.replace(/(\.mp4)$/, "-hover$1");

  // Ensure intro video plays once automatically on mount / in viewport
  useEffect(() => {
    const base = baseVideoRef.current;
    if (!base) return;

    if (base.ended) {
      setIntroEnded(true);
      return;
    }

    const tryPlay = () => {
      base.play().catch(() => {
        // Autoplay may be deferred until user interaction or viewport observer
      });
    };

    tryPlay();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!base.ended) {
            tryPlay();
          }
        } else {
          base.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(base);
    return () => observer.disconnect();
  }, [video]);

  // Handle intro video completion
  const handleBaseEnded = () => {
    setIntroEnded(true);
    // If user is already hovering when intro ends, immediately trigger hover video
    if (hovered && hoverVideoRef.current) {
      hoverVideoRef.current.currentTime = 0;
      hoverVideoRef.current.play().catch(() => {});
    }
  };

  // Cursor movement over card for 3D tilt & parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  const handleMouseEnter = () => {
    setHovered(true);
    // If intro has already finished, restart & play hover video immediately
    if (introEnded && hoverVideoRef.current) {
      hoverVideoRef.current.currentTime = 0;
      hoverVideoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setPos({ x: 0, y: 0 });
    // Pause hover video smoothly
    if (hoverVideoRef.current) {
      hoverVideoRef.current.pause();
    }
  };

  // Smooth responsive transitions
  const transition = hovered
    ? "transform 0.18s cubic-bezier(0.2, 0.8, 0.4, 1)"
    : "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)";

  // The 3D view hover video is active when hovered and intro has finished
  const showHoverVideo = hovered && introEnded;

  return (
    <div className="w-full" style={{ perspective: "1100px" }}>
      <a
        ref={cardRef}
        href={href}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        className="group relative block w-full aspect-3/4 md:aspect-3/4 overflow-hidden rounded-2xl md:rounded-3xl
                   bg-linear-to-b from-[#EDEFF2] to-[#C9D9EC]
                   shadow-[0_12px_45px_-5px_rgba(4,41,64,0.18)]
                   transition-shadow duration-500
                   hover:shadow-[0_20px_60px_-4px_rgba(4,41,64,0.28)]
                   focus-visible:outline-2 focus-visible:outline-offset-4
                   focus-visible:outline-[#AAD902]"
        style={{
          transform: `rotateX(${-pos.y * MAX_TILT}deg) rotateY(${
            pos.x * MAX_TILT
          }deg) scale(${hovered ? 0.985 : 1})`,
          transition,
          willChange: "transform",
        }}
      >
        {/* Layer 1: Base / Intro Video (plays once, freezes on last frame) */}
        <div
          className="absolute inset-0 z-0 overflow-hidden"
          style={{
            transform: `translate3d(${-pos.x * PARALLAX}px, ${
              -pos.y * PARALLAX
            }px, 0) scale(${hovered ? 1.06 : 1})`,
            transition,
          }}
        >
          <video
            ref={baseVideoRef}
            src={video}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleBaseEnded}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Layer 2: 3D Orbit Hover Video (seamless continuation, plays once per hover) */}
        <div
          className={`absolute inset-0 z-10 overflow-hidden transition-opacity duration-700 ease-in-out ${
            showHoverVideo ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{
            transform: `translate3d(${-pos.x * PARALLAX}px, ${
              -pos.y * PARALLAX
            }px, 0) scale(${hovered ? 1.06 : 1})`,
            transition,
          }}
        >
          <video
            ref={hoverVideoRef}
            src={hoverSrc}
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Layer 3: Interactive Glass Sheen / Soft Ambient Cursor Light */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(circle 320px at ${(pos.x + 0.5) * 100}% ${
              (pos.y + 0.5) * 100
            }%, rgba(255,255,255,0.4), transparent 70%)`,
          }}
        />

        {/* Layer 4: Title drifts slightly for 3D depth */}
        <div
          className="absolute left-6 top-7 md:left-9 md:top-10 z-30 max-w-[80%]"
          style={{
            transform: `translate3d(${pos.x * 8}px, ${pos.y * 8}px, 0)`,
            transition,
          }}
        >
          <h3
            className={`${outfit.className} text-3xl sm:text-4xl md:text-[44px] font-medium leading-[0.96] tracking-[-0.02em] text-[#042940]`}
          >
            {title}
          </h3>
        </div>

        {/* Layer 5: SweepingCorp Translucent Action Button with Animated Arrow */}
        <div
          className="absolute bottom-6 left-6 md:bottom-9 md:left-9 z-30"
          style={{
            transform: `translate3d(${pos.x * 6}px, ${pos.y * 6}px, 0)`,
            transition,
          }}
        >
          <span
            className="relative flex h-14 w-14 md:h-18 md:w-18 items-center justify-center overflow-hidden
                       rounded-[18px] md:rounded-[24px]
                       bg-white/75 backdrop-blur-[10px]
                       border border-white/60 text-[#042940]
                       shadow-[0_4px_18px_rgba(4,41,64,0.08)]
                       transition-all duration-300
                       group-hover:bg-[#AAD902] group-hover:border-[#AAD902] group-hover:shadow-[0_6px_22px_rgba(170,217,2,0.4)]"
            aria-hidden="true"
          >
            <svg
              className="h-6 w-6 md:h-7 md:w-7 transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 18L18 6" />
              <path d="M7 6h11v11" />
            </svg>
          </span>
        </div>

        <span className="sr-only">Learn more about {title}</span>
      </a>
    </div>
  );
}