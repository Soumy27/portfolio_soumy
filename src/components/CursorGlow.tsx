import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/**
 * Soft violet orb that lags behind the pointer. Decorative only:
 * the native cursor stays, pointer events pass through, and it
 * disappears for touch input and reduced motion.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;

    let x = -100;
    let y = -100;
    let cx = -100;
    let cy = -100;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const loop = () => {
      cx += (x - cx) * 0.08;
      cy += (y - cy) * 0.08;
      el.style.transform = `translate3d(${cx - 24}px, ${cy - 24}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] h-12 w-12 rounded-full bg-pulse opacity-80 blur-[2px] shadow-[0_0_40px_18px_rgba(196,181,253,0.35)] will-change-transform"
    />
  );
}
