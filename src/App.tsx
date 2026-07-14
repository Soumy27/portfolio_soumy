import { lazy, Suspense, useEffect, useState } from "react";
import Loader from "./components/Loader";
import CursorGlow from "./components/CursorGlow";
import FixedRail from "./components/FixedRail";
import Nav from "./components/Nav";
import Story from "./components/Story";
import Timeline from "./components/Timeline";
import WorkHorizontal from "./components/WorkHorizontal";
import TechStack from "./components/TechStack";
import Footer from "./components/Footer";

const TechBackdrop = lazy(() => import("./scene/TechBackdrop"));

export default function App() {
  const [loaded, setLoaded] = useState(false);

  // hard fallback: the 3D character's heavy decode can starve the
  // loader's animation timer, so dismiss it after a max wait regardless
  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 4200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="grain glow-field">
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      {/* site-wide drifting particle field, behind everything */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <Suspense fallback={null}>
          <TechBackdrop />
        </Suspense>
      </div>
      <CursorGlow />
      <FixedRail />
      <Nav />
      <main className="relative">
        <Story />
        {/* transparent so the fixed particle backdrop (z-0) shows through
            the whole page; the dark base color lives on <body>. The fixed
            character (z-11) has already scrolled out (translateY -100%) by
            the time these sections are in view, so nothing overlaps. */}
        <div className="relative z-30">
          <Timeline />
          <WorkHorizontal />
          <TechStack />
          <Footer />
        </div>
      </main>
    </div>
  );
}
