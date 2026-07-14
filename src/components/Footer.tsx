import { profile } from "../data/projects";
import { useReveal } from "../hooks/useReveal";

export default function Footer() {
  const ctaRef = useReveal<HTMLDivElement>();
  const footRef = useReveal<HTMLElement>();
  const socials = [
    { label: "Github", href: profile.github },
    { label: "Linkedin", href: profile.linkedin },
    { label: "Twitter", href: profile.twitter },
    { label: "Instagram", href: profile.instagram },
  ].filter((s) => s.href);

  return (
    <section id="contact" className="relative pt-32 md:pt-44 pb-20 md:pb-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div ref={ctaRef} className="reveal flex flex-col items-center text-center">
          <h2 className="text-4xl font-semibold tracking-tighter text-fog md:text-6xl">
            Have a project in mind?
          </h2>
          <a
            href={`mailto:${profile.email}`}
            className="mt-10 rounded-full bg-pulse px-9 py-4 text-lg font-medium text-ink transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Hire me
          </a>
        </div>

        <footer ref={footRef} className="reveal mt-32 md:mt-40">
          <p className="text-5xl font-semibold tracking-tight text-fog md:text-7xl">
            {profile.name.toUpperCase()}
          </p>

          <div className="mt-14 flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-8 md:flex-row md:gap-24">
              <div>
                <p className="text-sm text-fog-2">Email</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-2 block text-fog transition-colors hover:text-pulse"
                >
                  {profile.email}
                </a>
              </div>
              {profile.location && (
                <div>
                  <p className="text-sm text-fog-2">Location</p>
                  <p className="mt-2 text-fog">{profile.location}</p>
                </div>
              )}
              {profile.resumeUrl && (
                <div>
                  <p className="text-sm text-fog-2">Resume</p>
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block text-fog transition-colors hover:text-pulse"
                  >
                    View resume &#8599;
                  </a>
                </div>
              )}
            </div>

            <div className="md:w-72">
              <p className="text-sm text-fog-2">Social</p>
              <ul className="mt-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex w-full items-center justify-between border-b border-white/25 py-2.5 text-xl text-fog transition-colors hover:text-pulse"
                    >
                      {s.label}
                      <span
                        aria-hidden="true"
                        className="text-base transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      >
                        &#8599;
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
