import { lazy, Suspense, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./Hero";
import About from "./About";
import WhatIDo from "./WhatIDo";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const CharacterScene = lazy(() => import("../scene/character/CharacterScene"));

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero, about, and what-i-do sections with the ported animated cartoon
 * (a rigged GLB) behind them. The character's own GSAP scroll timelines
 * (in scene/character/gsapScroll.ts) drive its rotation, the camera
 * zoom to the desk, the monitor/screen light, and the typing pose.
 * Ported from github.com/red1-for-hek/portfolio-website (MIT).
 */
export default function Story() {
  const reduced = usePrefersReducedMotion();

  // keep scroll triggers measured correctly once fonts/layout settle
  useEffect(() => {
    const r = () => ScrollTrigger.refresh();
    const t = window.setTimeout(r, 600);
    window.addEventListener("load", r);
    return () => {
      clearTimeout(t);
      window.removeEventListener("load", r);
    };
  }, []);

  return (
    <div className="relative">
      {!reduced && (
        <Suspense fallback={null}>
          <CharacterScene />
        </Suspense>
      )}
      <Hero />
      <About />
      <WhatIDo />
    </div>
  );
}
