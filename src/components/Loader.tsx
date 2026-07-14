import { useEffect, useState } from "react";
import { profile } from "../data/projects";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/** Intro loader: role marquee behind a pill with a counting percentage. */
export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 2800;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // ease-out so the count slows near the end like real loading
      setProgress(Math.round((1 - Math.pow(1 - p, 2.2)) * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        setTimeout(onDone, 650);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone, reduced]);

  if (reduced) return null;

  const marqueeItems = [...profile.roles, ...profile.roles, ...profile.roles];

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#e9e6ef] transition-opacity duration-500 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Loading"
    >
      <div className="absolute inset-x-0 flex overflow-hidden whitespace-nowrap">
        <div className="marquee-track flex shrink-0 items-center">
          {[...marqueeItems, ...marqueeItems].map((role, i) => (
            <span
              key={i}
              className="px-8 text-[9vw] font-bold tracking-tighter text-[#16131c]"
            >
              {role}
              <span className="inline-block px-8 align-middle text-[3vw]">•</span>
            </span>
          ))}
        </div>
      </div>
      <div className="relative flex items-center gap-6 rounded-full bg-[#100e17] px-12 py-7 shadow-[0_0_0_2px_rgba(139,124,246,0.55),0_24px_80px_rgba(0,0,0,0.45)]">
        <span className="text-xl font-medium tracking-[0.2em] text-white">LOADING</span>
        <span className="font-mono text-xl text-fog-2 tabular-nums">{progress}%</span>
      </div>
    </div>
  );
}
