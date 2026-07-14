import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile, projects } from "../data/projects";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * "My Work": vertical scroll drives a horizontal pan across numbered
 * project panels, pinned while it plays. Falls back to a plain
 * horizontal scroll area under reduced motion.
 */
export default function WorkHorizontal() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !wrap.current || !track.current) return;
    const mm = window.matchMedia("(min-width: 768px)");
    if (!mm.matches) return; // vertical stack on mobile
    const ctx = gsap.context(() => {
      const distance = () => track.current!.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, wrap);
    return () => ctx.revert();
  }, [reduced]);

  const pinned = !reduced;

  return (
    <section id="work" ref={wrap} className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-6 top-20 z-20 md:left-14">
        <h2 className="text-4xl font-semibold tracking-tighter text-fog md:text-6xl">
          My <span className="text-pulse">Work</span>
        </h2>
      </div>
      <div
        ref={track}
        className={
          pinned
            ? "flex flex-col md:h-[100dvh] md:w-max md:flex-row md:items-stretch"
            : "flex flex-col md:flex-row md:overflow-x-auto"
        }
      >
        {projects.map((p, i) => (
          <article
            key={p.title}
            className="flex min-h-[100dvh] w-screen shrink-0 flex-col justify-center gap-8 border-r border-white/5 px-6 pt-28 pb-16 md:w-[62vw] md:px-16 md:pt-36"
          >
            <header className="flex items-start justify-between gap-6">
              <span className="text-6xl font-bold tracking-tight text-fog md:text-7xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="text-right">
                <h3 className="text-3xl font-semibold text-fog md:text-4xl">{p.title}</h3>
                <p className="mt-1 font-mono text-sm text-fog-2">{p.category}</p>
              </div>
            </header>

            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="group block aspect-[8/5] max-h-[56vh] w-full overflow-hidden rounded-2xl border border-white/8 bg-ink-2/70"
            >
              {/* object-cover fills the full width (no side gaps); the 8/5
                 box matches the 1440×900 shots, so any crop is minimal */}
              <img
                src={p.image}
                alt={`${p.title} screenshot`}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </a>

            <div>
              <p className="max-w-[52ch] leading-relaxed text-fog-2">{p.description}</p>
              <p className="mt-5 text-sm font-medium text-fog">Tools and features</p>
              <p className="mt-1 font-mono text-sm text-fog-2">{p.stack.join(", ")}</p>
              <a href={p.link} className="mt-5 inline-block text-pulse underline-offset-4 hover:underline">
                Open project
              </a>
            </div>
          </article>
        ))}

        {/* closing panel */}
        <div className="flex min-h-[50vh] w-screen shrink-0 flex-col items-center justify-center gap-6 px-6 md:min-h-[100dvh] md:w-[38vw]">
          <p className="text-2xl font-semibold text-fog">Want to see more?</p>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-pulse/40 px-6 py-3 text-pulse transition-colors hover:bg-pulse hover:text-ink active:scale-[0.98]"
          >
            See all works
          </a>
        </div>
      </div>
    </section>
  );
}
