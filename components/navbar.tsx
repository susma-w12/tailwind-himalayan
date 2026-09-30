"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/home" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

const CONTACT_LEFT = ["reception@example.com", "facebook@example.com"];
const CONTACT_RIGHT = ["insta@example.com", "linkedin@example.com"];

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

// Contact text size: 16px on phones, scales with screen height on larger screens
const CONTACT_TEXT = "text-base md:text-[clamp(1.25rem,4.5vh,2rem)]";

type RevealProps = {
  isOpen: boolean;
  delay?: number;
  children: ReactNode;
};

type LineProps = {
  isOpen: boolean;
  origin: "left" | "right";
  delay?: number;
};

// Masked slide-up: text lives in an overflow-hidden box and slides up into view
function Reveal({ isOpen, delay = 0, children }: RevealProps) {
  return (
    <span className="block overflow-hidden">
      <span
        className="block"
        style={{
          transform: isOpen ? "translateY(0)" : "translateY(110%)",
          transitionProperty: "transform",
          transitionTimingFunction: EASE,
          transitionDuration: isOpen ? "700ms" : "400ms",
          transitionDelay: isOpen ? `${delay}ms` : "0ms",
        }}
      >
        {children}
      </span>
    </span>
  );
}

// Thin line that draws from one edge. origin = "left" or "right"
function Line({ isOpen, origin, delay = 0 }: LineProps) {
  return (
    <div
      className="h-px w-full bg-[#290406]"
      style={{
        transformOrigin: origin,
        transform: isOpen ? "scaleX(1)" : "scaleX(0)",
        transitionProperty: "transform",
        transitionTimingFunction: EASE,
        transitionDuration: isOpen ? "900ms" : "400ms",
        transitionDelay: isOpen ? `${delay}ms` : "0ms",
      }}
    />
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock page scroll while the overlay is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const close = () => setIsOpen(false);

  // Icon lines: on open they move together first, then rotate.
  // On close they rotate back first, then move apart.
  const barStyle = {
    transitionProperty: "top, transform",
    transitionDuration: "300ms",
    transitionTimingFunction: "ease",
    transitionDelay: isOpen ? "0ms, 300ms" : "300ms, 0ms",
  };

  return (
    <>
      {/* Fixed header: stays above the overlay so the toggle is always clickable */}
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-6 py-6 font-sans text-[#290406] md:px-9">
        {/* Menu toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="site-menu"
          className="flex items-center gap-3 text-sm font-medium uppercase"
        >
          <span>Menu</span>
          <span aria-hidden="true" className="relative block h-3 w-6">
            <span
              className="absolute left-0 block h-px w-full bg-current"
              style={{
                ...barStyle,
                top: isOpen ? "5px" : "0px",
                transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
              }}
            />
            <span
              className="absolute left-0 block h-px w-full bg-current"
              style={{
                ...barStyle,
                top: isOpen ? "5px" : "11px",
                transform: isOpen ? "rotate(-45deg)" : "rotate(0deg)",
              }}
            />
          </span>
        </button>
      </header>

      {/* Full-screen overlay: wipes down on open, wipes back up on close */}
      <div
        id="site-menu"
        className={`fixed inset-0 z-40 flex h-dvh flex-col justify-between overflow-hidden bg-[#dbc9f9] font-sans text-[#290406] transition-[clip-path,visibility] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isOpen
            ? "visible [clip-path:inset(0_0_0_0)]"
            : "invisible [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <div className="flex flex-1 flex-col items-center justify-center px-6 pt-[12vh] text-center">
          {/* Big title */}
          <h2 className="whitespace-nowrap font-medium leading-[1.1] tracking-tight text-[clamp(1.5rem,min(7.3vw,13vh),9rem)]">
            <Reveal isOpen={isOpen} delay={250}>
              SERVICE PLUS AQUATICS
            </Reveal>
          </h2>

          {/* Links: each slides up from behind its own mask, staggered */}
          <ul className="mt-[5vh]">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="block text-[clamp(1.25rem,4.5vh,2.5rem)] font-light uppercase leading-tight transition-opacity hover:opacity-60"
                >
                  <Reveal isOpen={isOpen} delay={350 + i * 60}>
                    {link.label}
                  </Reveal>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info pinned to the bottom corners */}
        <div className="flex items-end justify-between gap-6 px-4 pb-[3vh]">
          {/* Left: line grows from the left edge toward the center */}
          <div className={`w-full max-w-sm text-left ${CONTACT_TEXT}`}>
            <Line isOpen={isOpen} origin="left" delay={400} />
            <div className="pt-2">
              {CONTACT_LEFT.map((item, i) => (
                <Reveal key={item} isOpen={isOpen} delay={700 + i * 60}>
                  {item}
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: line grows from the right edge toward the center */}
          <div className={`w-full max-w-sm text-right ${CONTACT_TEXT}`}>
            <Line isOpen={isOpen} origin="right" delay={400} />
            <div className="pt-2">
              {CONTACT_RIGHT.map((item, i) => (
                <Reveal key={item} isOpen={isOpen} delay={700 + i * 60}>
                  {item}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}