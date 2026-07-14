import { profile } from "../data/projects";

export default function Nav() {
  const initials = profile.firstName[0] + profile.lastName[0];
  return (
    /* mobile gets a scrim so content scrolling underneath doesn't collide
       with the links; desktop keeps the clean transparent nav */
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-ink/85 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none">
      <nav className="mx-auto flex h-full max-w-[1500px] items-center justify-between px-6 md:px-10">
        <a href="#top" className="text-base font-bold tracking-wide text-fog">
          {initials}
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="hidden font-mono text-sm tracking-wider text-fog-2 transition-colors hover:text-fog md:block"
        >
          {profile.email}
        </a>
        <div className="flex items-center gap-8 text-sm font-medium tracking-[0.15em] text-fog-2">
          <a href="#about" className="transition-colors hover:text-pulse">ABOUT</a>
          <a href="#work" className="transition-colors hover:text-pulse">WORK</a>
          <a href="#contact" className="transition-colors hover:text-pulse">CONTACT</a>
        </div>
      </nav>
    </header>
  );
}
