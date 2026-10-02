// components/SeviceShowcaseCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string; // e.g. /services/software-development
  category?: string; // optional small badge, top-left
};

/* ---------------------------------- Card ---------------------------------- */

type ServiceCardProps = {
  service: Service;
  className?: string;
};

export default function ServiceCard({ service, className = "" }: ServiceCardProps) {
  const { title, description, image, href, category } = service;

  return (
    <article
      className={`group relative h-104 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0f1626] shadow-lg shadow-black/20 ${className}`}
    >
      {/* Image (zooms on hover) */}
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        draggable={false}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Optional category badge */}
      {category && (
        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
          {category}
        </span>
      )}

      {/* Bottom overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/95 via-black/80 to-transparent px-5 pb-5 pt-16">
        <h3 className="text-xl font-bold leading-snug text-white">{title}</h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-300">
          {description}
        </p>

        <Link
          href={href}
          draggable={false}
          aria-label={`Learn more about ${title}`}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-indigo-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          Learn more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 0 1 .75-.75h10.69l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}

/* --------------------- Scrollable row (pill control, drag) --------------------- */

type ServiceShowcaseProps = {
  services: Service[];
};

export function ServiceShowcase({ services }: ServiceShowcaseProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [dragging, setDragging] = useState(false);

  const startXRef = useRef(0);
  const startScrollRef = useRef(0);
  const movedRef = useRef(false);

  // Work out scroll position -> which dot is active, and whether we're at either end
  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const max = track.scrollWidth - track.clientWidth;

    // Everything fits, nothing to scroll
    if (max <= 1) {
      setActive(0);
      setAtStart(true);
      setAtEnd(true);
      return;
    }

    const progress = track.scrollLeft / max;
    setActive(Math.round(progress * (services.length - 1)));
    setAtStart(track.scrollLeft <= 1);
    setAtEnd(track.scrollLeft >= max - 1);
  }, [services.length]);

  // ResizeObserver calls `update` in a callback (on first measure and on every resize),
  // so no state is set synchronously in the effect body.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(() => update());
    observer.observe(track);
    Array.from(track.children).forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [update, services.length]);

  // Dots are spread evenly across the full scroll range, so every dot is reachable
  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const max = track.scrollWidth - track.clientWidth;
    const left = services.length > 1 ? (index / (services.length - 1)) * max : 0;
    track.scrollTo({ left, behavior: "smooth" });
  };

  const goPrev = () => scrollToIndex(Math.max(active - 1, 0));
  const goNext = () => scrollToIndex(Math.min(active + 1, services.length - 1));

  // Mouse drag to scroll
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;

    startXRef.current = e.clientX;
    startScrollRef.current = track.scrollLeft;
    movedRef.current = false;

    const onMouseMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startXRef.current;

      if (!movedRef.current && Math.abs(dx) > 5) {
        movedRef.current = true;
        setDragging(true);
        // Instant movement while dragging so it follows the cursor exactly
        track.style.scrollBehavior = "auto";
      }

      if (movedRef.current) {
        track.scrollLeft = startScrollRef.current - dx;
      }
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      if (movedRef.current) {
        setDragging(false);
        track.style.scrollBehavior = "";
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // After a drag, don't let the release count as a click on "Learn more"
  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (movedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      movedRef.current = false;
    }
  };

  return (
    <div>
      {/* Track */}
      <div
        ref={trackRef}
        onScroll={update}
        onMouseDown={handleMouseDown}
        onClickCapture={handleClickCapture}
        onDragStart={(e) => e.preventDefault()}
        className={`relative flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-none [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        {services.map((service) => (
          <div key={service.id} className="w-72 shrink-0 sm:w-80">
            <ServiceCard service={service} />
          </div>
        ))}
      </div>

      {/* Pill control */}
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-3 rounded-full border border-black/5 bg-neutral-200 p-1.5 shadow-md">
          <button
            type="button"
            onClick={goPrev}
            disabled={atStart}
            aria-label="Previous service"
            className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-800 transition hover:bg-white/70 disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ChevronLeft />
          </button>

          <div className="flex items-center gap-2">
            {services.map((service, i) => (
              <button
                key={service.id}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to ${service.title}`}
                aria-current={i === active}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-8 bg-neutral-800"
                    : "w-2 bg-neutral-400 hover:bg-neutral-500"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={atEnd}
            aria-label="Next service"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-800 shadow transition hover:bg-neutral-50 disabled:opacity-40"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- Icons ---------------------------------- */

function ChevronLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M12.5 4.5 7 10l5.5 5.5" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M7.5 4.5 13 10l-5.5 5.5" />
    </svg>
  );
}