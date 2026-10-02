"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useRef } from "react";

export default function GsapPractice() {
  const controlTween = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    gsap.to(".green", { rotation: 360, x: 100, duration: 1 });

    gsap.to(".purple", { translateX: 200, duration: 2 });
    gsap.from(".red", { rotation: 360, y: 400, duration: 3 });

    controlTween.current = gsap.to(".control-box", {rotation: 360, x: 300, duration: 5, ease: "none", paused: true, });

    
  });

  return (
    <main className="min-h-screen p-10 bg-gray-50 flex items-center justify-center gap-10 flex-col">
      <div className=" green border h-32 w-32 bg-green-600"></div>
      <div className=" purple border h-32 w-32 bg-purple-600"></div>
      <div className="red border h-32 w-32 bg-red-600"></div>

      <section className="mt-50">
        

        <div className="control-box h-24 w-24 bg-blue-600"></div>

        <div className=" mt-7 flex flex-wrap justify-center gap-2">
          <button className="px-4 py-2 bg-black text-white rounded"
            onClick={() => controlTween.current?.play()}>
            Play</button>

          <button className="px-4 py-2 bg-black text-white rounded"
            onClick={() => controlTween.current?.pause()}>
            Pause</button>

          <button className="px-4 py-2 bg-black text-white rounded"
            onClick={() => controlTween.current?.resume()}>
            Resume</button>

          <button className="px-4 py-2 bg-black text-white rounded"
            onClick={() => controlTween.current?.reverse()}>
            Reverse</button>

          <button className="px-4 py-2 bg-black text-white rounded"
            onClick={() => controlTween.current?.restart()}>
            Restart</button>

        </div>
      </section>
    </main>
  );
}
