// components/SeviceShowcaseCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import GlowButton from "@/components/glow-button";

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string; // e.g. /services/software-development
  category?: string; // optional small badge, top-left
};

/* ----------------------------- Shared classes ----------------------------- */

// Fade + rise into place when the card is hovered / focused.
// On touch devices (no hover) everything is always visible.
const REVEAL =
  "translate-y-3 opacity-0 transition-[opacity,transform] duration-500 ease-out " +
  "group-hover:translate-y-0 group-hover:opacity-100 " +
  "group-focus-within:translate-y-0 group-focus-within:opacity-100 " +
  "[@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100";

// Stagger: each item waits a little longer than the one before it.
const DELAY_1 = "group-hover:delay-100 group-focus-within:delay-100";
const DELAY_2 = "group-hover:delay-200 group-focus-within:delay-200";

// Glow ring: hidden and paused at rest, visible and spinning on hover/focus/touch.
const GLOW_ON =
  "opacity-0 [animation-play-state:paused] transition-opacity duration-500 " +
  "group-hover:opacity-100 group-hover:[animation-play-state:running] " +
  "group-focus-within:opacity-100 group-focus-within:[animation-play-state:running] " +
  "[@media(hover:none)]:opacity-100 [@media(hover:none)]:[animation-play-state:running]";

/* ---------------------------------- Card ---------------------------------- */

type ServiceCardProps = {
  service: Service;
  className?: string;
};

export default function ServiceCard({ service, className = "" }: ServiceCardProps) {
  const { title, description, image, href, category } = service;

  return (
    // Outer wrapper never moves, so the hover area stays stable while the card lifts
    <div className={`group relative h-104 w-full ${className}`}>
      <article className="absolute inset-0 isolate overflow-hidden rounded-2xl bg-[#0f1626] shadow-lg shadow-black/20 transition-[transform,box-shadow] duration-500 ease-out group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:shadow-black/50 group-focus-within:-translate-y-3 group-focus-within:shadow-2xl group-focus-within:shadow-black/50">
        {/* Image (slow zoom on hover) */}
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          draggable={false}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-focus-within:scale-110"
        />

        {/* Gradient overlay: light at rest, stronger on hover so the text is readable */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent transition-all duration-500 group-hover:from-black/95 group-hover:via-black/60 group-focus-within:from-black/95 group-focus-within:via-black/60 [@media(hover:none)]:from-black/95 [@media(hover:none)]:via-black/60"
        />

        {/* Moving border: orange and white arcs on opposite sides */}
        <span
          aria-hidden="true"
          className={`glow-border animate-glow-spin z-20 ${GLOW_ON}`}
        />

        {/* Category badge */}
        {category && (
          <span className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
            {category}
          </span>
        )}

        {/* Bottom content, directly on the image.
            No z-index here on purpose: the glow button inside needs to sit
            above the full-card link, and a z-index would trap it underneath.
            pointer-events-none so the full-card link gets the clicks. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-white">
          {/* Title + accent line. w-fit makes the line exactly as wide as the title. */}
          <div className="w-fit max-w-full">
            <h3 className="text-xl font-bold leading-snug text-white drop-shadow-md">
              {title}
            </h3>

            <span
              aria-hidden="true"
              className="mt-2 block h-0.5 w-0 rounded-full bg-orange-500 transition-all duration-500 ease-out group-hover:w-full group-focus-within:w-full [@media(hover:none)]:w-full"
            />
          </div>

          {/* Description area: height animates from 0 to auto using grid rows */}
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
            {/* overflow-hidden is needed for the height animation but clips the button
                glow, so padding gives it room and negative margins cancel it out. */}
            <div className="-mx-4 -mb-5 overflow-hidden px-4 pb-5">
              <p
                className={`mt-3 line-clamp-3 text-sm leading-relaxed text-white/90 drop-shadow ${REVEAL} ${DELAY_1}`}
              >
                {description}
              </p>

              {/* Simple orange button. The wrapper carries the reveal animation and the z-40
    (it has a transform, so it creates its own stacking context and needs the
    z-index itself to sit above the full-card link). */}
              <div
                className={`pointer-events-auto relative z-40 mt-4 w-fit ${REVEAL} ${DELAY_2}`}
              >
                <Link
                  href={href}
                  draggable={false}
                  aria-hidden="true"
                  tabIndex={-1}
                  className="group/btn inline-flex items-center gap-2 rounded-[10px] bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-900/30 transition-colors duration-200 hover:bg-orange-600 active:bg-orange-700"
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
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
            </div>
          </div>
        </div>

        {/* One real link covering the whole card */}
        <Link
          href={href}
          draggable={false}
          aria-label={`Learn more about ${title}`}
          className="absolute inset-0 z-30 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
        />
      </article>
    </div>
  );
}

/* --------------------- Scrollable row (arrows, drag) --------------------- */

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

  // Work out scroll position -> which card is "current", and whether we're at either end
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

  // Positions are spread evenly across the full scroll range, so every card is reachable
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

  // After a drag, don't let the release count as a click on the card link
  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (movedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      movedRef.current = false;
    }
  };

  return (
    <div>
      {/* Track. Extra top/bottom padding gives the lifted card and its shadow room,
          because overflow-x-auto would otherwise clip them. */}
      <div
        ref={trackRef}
        onScroll={update}
        onMouseDown={handleMouseDown}
        onClickCapture={handleClickCapture}
        onDragStart={(e) => e.preventDefault()}
        className={`relative flex gap-6 overflow-x-auto scroll-smooth px-2 pb-8 pt-5 scrollbar-none [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        {services.map((service) => (
          <div key={service.id} className="w-72 shrink-0 sm:w-80">
            <ServiceCard service={service} />
          </div>
        ))}
      </div>

      {/* Pill control: arrows only */}
      <div className="mt-4 flex justify-center">
        <div className="flex items-center gap-2 rounded-full border border-black/5 bg-neutral-200 p-1.5 shadow-md">
          <button
            type="button"
            onClick={goPrev}
            disabled={atStart}
            aria-label="Previous service"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-800 shadow transition hover:bg-neutral-50 disabled:opacity-40"
          >
            <ChevronLeft />
          </button>

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