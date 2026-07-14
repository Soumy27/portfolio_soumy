import { profile } from "../data/projects";

export default function Hero() {
  return (
    <section
      id="landingDiv"
      className="landing-section relative min-h-[100dvh] overflow-hidden"
    >
      {/* absolute inset-0 so it always fills the section height; h-full on a
          flex child collapsed to 0 on mobile (only absolute children) */}
      <div className="landing-container absolute inset-0">
        {/* name, left */}
        <div className="pointer-events-none absolute left-6 top-[30%] z-20 md:left-14 lg:left-24">
          <p className="text-lg text-pulse">Hello! I'm</p>
          <h1 className="mt-1 text-4xl font-semibold tracking-tight text-fog drop-shadow-[0_2px_14px_rgba(9,8,13,0.9)] md:text-6xl">
            {profile.firstName}
            <br />
            {profile.lastName}
          </h1>
        </div>

        {/* rotating role, right */}
        <div className="pointer-events-none absolute right-6 top-[52%] z-20 text-right md:right-14 lg:right-24">
          <p className="text-lg text-pulse">A</p>
          <div className="mt-1 h-[2.4em] overflow-hidden text-3xl font-bold tracking-tight text-fog drop-shadow-[0_2px_14px_rgba(9,8,13,0.9)] md:text-5xl">
            <div className="role-track">
              {[...profile.roles.slice(0, 2), profile.roles[0]].map((r, i) => (
                <div key={i} className="h-[2.4em] leading-[1.2]">
                  {r.split(" ").map((word, j) => (
                    <div key={j}>{word}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
