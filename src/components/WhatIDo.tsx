import { whatIDo } from "../data/projects";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import SignalTrail from "./SignalTrail";

/**
 * What I Do: the character sits at his desk on the left (fixed canvas
 * behind), so all text lives in the right column to avoid overlapping
 * it. The heading and both capability cards share one `.what-box-in`
 * wrapper, which the character's scroll timeline reveals together and
 * smoothly (see scene/character/gsapScroll.ts) once it reaches the desk.
 * A signal trail links the character's screen to the cards.
 */
export default function WhatIDo() {
  const reduced = usePrefersReducedMotion();
  return (
    <section className="whatIDO relative flex min-h-[100dvh] items-center bg-gradient-to-t from-ink/90 via-ink/60 to-ink/10 py-24 lg:bg-none">
      {/* only present when the character is (both are gated on motion) */}
      {!reduced && <SignalTrail />}
      <div className="mx-auto grid w-full max-w-[1500px] items-center gap-10 px-6 md:px-10 lg:grid-cols-[1.15fr_1fr]">
        {/* empty on desktop: the fixed 3D character occupies this space */}
        <div className="hidden lg:block" aria-hidden="true" />
        <div className="what-box-in flex flex-col gap-6">
          <h2 className="text-5xl font-bold tracking-tighter text-fog/25 md:text-7xl">
            WHAT I DO
          </h2>
          {whatIDo.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-dashed border-white/20 bg-ink/55 p-7 backdrop-blur-sm transition-colors hover:border-pulse/50"
            >
              <h3 className="text-2xl font-bold tracking-tight text-fog md:text-3xl">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-pulse">{item.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-fog-2">{item.body}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {item.skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-fog-2"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
