"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";

const text =
  "Awaken your spirit in the heights of the Himalayas. Trek through ancient paths, discover hidden valleys, and breathe the crisp mountain air. Where every step is a story, and every peak is a triumph.";

export default function HeroScroll() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const words = text.split(" ");

  // Container expansion
  const videoWidth = useTransform(scrollYProgress, [0, 0.2], ["92%", "100%"]);
  const videoHeight = useTransform(scrollYProgress, [0, 0.2], ["80%", "100%"]);
  const videoRadius = useTransform(scrollYProgress, [0, 0.2], ["32px", "0px"]);
  
  // Parallax video scale effect (zooms out slightly as container expands)
  const videoScale = useTransform(scrollYProgress, [0, 0.2], [1.15, 1]);

  // Fade in the text block and overlay right after the video starts expanding
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);

  return (
    <section ref={container} className="relative h-[350vh] bg-neutral-50">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Animated Video Container */}
        <motion.div
          style={{
            width: videoWidth,
            height: videoHeight,
            borderRadius: videoRadius,
          }}
          className="relative overflow-hidden z-0 shadow-2xl"
        >
          {/* Background Local Video */}
          <motion.video
            src="/k2.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{ scale: videoScale }}
            className="absolute inset-0 w-full h-full object-cover transform-gpu"
          />

          {/* Elegant Dark Gradient Overlay - focused on bottom left where text is */}
          <motion.div 
            style={{ opacity: contentOpacity }}
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[5]"
          />

          {/* Text Overlay on the bottom left side */}
          <motion.div 
            style={{ opacity: contentOpacity }}
            className="absolute inset-0 z-10 flex items-end justify-start max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-20 md:pb-24 lg:pb-32"
          >
            <div className="max-w-md md:max-w-xl">
              <h1 className="text-xs text-neutral-300/80 uppercase tracking-[0.25em] mb-4 font-semibold">
                The Journey Awaits
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-[1.4] md:leading-[1.5] flex flex-wrap gap-x-1.5 md:gap-x-2 gap-y-1 text-left">
                {words.map((word, i) => {
                  const scrollRangeForText = 0.75;
                  const wordStart = 0.25 + (i / words.length) * scrollRangeForText;
                  const wordEnd = wordStart + (1 / words.length) * scrollRangeForText;
                  
                  return (
                    <Word key={i} progress={scrollYProgress} range={[wordStart, wordEnd]}>
                      {word}
                    </Word>
                  );
                })}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [10, 0]);
  return (
    <motion.span style={{ opacity, y }} className="text-white inline-block">
      {children}
    </motion.span>
  );
}
