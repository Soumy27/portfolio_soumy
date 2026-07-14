import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline } from "../data/projects";
import { useReveal } from "../hooks/useReveal";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

function Entry({ item }: { item: (typeof timeline)[number] }) {
  const ref = useReveal<HTMLLIElement>();
  return (
    <li ref={ref} className="reveal relative grid gap-2 pb-14 pl-10 md:grid-cols-[8rem_1fr] md:gap-10 md:pl-14 last:pb-0">
      <span className="absolute left-0 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full bg-pulse shadow-[0_0_16px_4px_rgba(196,181,253,0.4)]" />
      <p className="font-mono text-lg text-pulse">{item.period}</p>
      <div>
        <h3 className="text-2xl font-semibold text-fog">{item.title}</h3>
        <p className="mt-1 text-sm text-fog-2">{item.org}</p>
        <p className="mt-3 max-w-[60ch] leading-relaxed text-fog-2">{item.body}</p>
      </div>
    </li>
  );
}

export default function Timeline() {
  const headRef = useReveal<HTMLHeadingElement>();
  const listRef = useRef<HTMLUListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  // glowing line fills and its orb travels down as the section scrolls
  useEffect(() => {
    if (reduced || !listRef.current || !fillRef.current || !orbRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(fillRef.current, { scaleY: 0, transformOrigin: "top" });
      ScrollTrigger.create({
        trigger: listRef.current,
        start: "top 65%",
        end: "bottom 55%",
        scrub: true,
        onUpdate: (self) => {
          const h = listRef.current!.getBoundingClientRect().height;
          gsap.set(fillRef.current, { scaleY: self.progress });
          gsap.set(orbRef.current, { y: self.progress * h });
        },
      });
    }, listRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <h2 ref={headRef} className="reveal text-center text-4xl font-semibold tracking-tighter text-fog md:text-6xl">
          My career &amp; <span className="text-pulse">experience</span>
        </h2>
        <ul ref={listRef} className="relative mt-24">
          {/* rail */}
          <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-white/10" />
          {/* glowing fill */}
          <div
            ref={fillRef}
            aria-hidden="true"
            className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-pulse-deep via-pulse to-pulse shadow-[0_0_12px_2px_rgba(139,124,246,0.6)]"
          />
          {/* traveling orb */}
          <div
            ref={orbRef}
            aria-hidden="true"
            className="absolute left-0 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-pulse shadow-[0_0_24px_8px_rgba(196,181,253,0.55)]"
          />
          {timeline.map((item) => (
            <Entry key={item.period + item.title} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}
