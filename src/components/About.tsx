import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "../data/projects";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * About: the 3D character (fixed canvas behind) occupies the left half;
 * the statement reveals word by word on the right as you scroll.
 */
export default function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();
  const words = profile.aboutStatement.split(" ");

  useEffect(() => {
    // The word-by-word reveal is scroll-scrubbed and only finishes once the
    // paragraph is well up the viewport — on phones that leaves it sitting
    // grey at the natural reading position, so below lg the text is just
    // plain white (spans keep their default opacity).
    if (reduced || !ref.current || window.innerWidth < 1024) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.querySelectorAll("span"),
        { opacity: 0.13 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="about" className="about-section relative flex min-h-[100dvh] items-center bg-gradient-to-t from-ink/90 via-ink/60 to-ink/10 lg:bg-none">
      <div className="about-me mx-auto grid w-full max-w-[1400px] gap-10 px-6 md:px-10 lg:grid-cols-2">
        {/* character sits here on desktop; single column below lg */}
        <div aria-hidden="true" className="hidden lg:block" />
        <div>
          <p className="text-sm font-medium tracking-[0.35em] text-pulse">ABOUT ME</p>
          <p ref={ref} className="mt-6 text-2xl font-medium leading-snug text-fog md:text-[2rem] md:leading-snug">
            {words.map((w, i) => (
              <span key={i}>{w} </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
