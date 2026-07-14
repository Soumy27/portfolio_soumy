import { techBranches, type TechItem } from "../data/projects";
import { useReveal } from "../hooks/useReveal";

/**
 * Tech tree: a glowing trunk down the center with category branches
 * alternating left and right. Hovering a skill tints it with the
 * tool's brand color (icon, text, border, and glow).
 */

/**
 * OpenAI's mark was removed from the simpleicons CDN, so it's the one
 * icon embedded inline (official Simple Icons path). It follows
 * currentColor, which the pill tints on hover.
 */
function OpenAIGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  );
}

function SkillPill({ item }: { item: TechItem }) {
  return (
    <li>
      <span
        style={{ "--brand": item.color } as React.CSSProperties}
        className="group inline-flex cursor-default items-center gap-2.5 rounded-full border border-white/12 bg-ink/70 px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--brand)] hover:shadow-[0_0_26px_-6px_var(--brand)]"
      >
        {item.slug === "openai" ? (
          <span className="text-fog-2 transition-colors duration-300 group-hover:text-[var(--brand)]">
            <OpenAIGlyph />
          </span>
        ) : (
          <span className="relative h-5 w-5">
            <img
              src={`https://cdn.simpleicons.org/${item.slug}/96909f`}
              alt=""
              width="20"
              height="20"
              loading="lazy"
              className="absolute inset-0 h-5 w-5 opacity-80 transition-opacity duration-300 group-hover:opacity-0"
            />
            <img
              src={`https://cdn.simpleicons.org/${item.slug}/${item.color.slice(1)}`}
              alt=""
              width="20"
              height="20"
              loading="lazy"
              className="absolute inset-0 h-5 w-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </span>
        )}
        <span className="text-sm text-fog-2 transition-colors duration-300 group-hover:text-[var(--brand)]">
          {item.name}
        </span>
      </span>
    </li>
  );
}

function Branch({ name, items, side }: { name: string; items: TechItem[]; side: "left" | "right" }) {
  const ref = useReveal<HTMLDivElement>();
  const isLeft = side === "left";
  return (
    <div
      ref={ref}
      className={`reveal relative py-10 pl-10 md:w-1/2 md:pl-0 ${
        isLeft ? "md:mr-auto md:pr-16" : "md:ml-auto md:pl-16"
      }`}
    >
      {/* node on the trunk */}
      <span
        className={`absolute top-[3.2rem] h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-pulse shadow-[0_0_14px_4px_rgba(196,181,253,0.45)] left-0 -translate-x-1/2 ${
          isLeft ? "md:left-auto md:right-0 md:translate-x-1/2" : "md:left-0 md:-translate-x-1/2"
        }`}
      />
      {/* twig from trunk to branch content */}
      <span
        className={`absolute top-[3.2rem] h-px w-8 -translate-y-1/2 bg-gradient-to-r from-pulse/60 to-transparent left-0 md:w-12 ${
          isLeft ? "md:left-auto md:right-0 md:bg-gradient-to-l" : "md:left-0"
        }`}
      />
      <div className={isLeft ? "md:text-right" : ""}>
        <h3 className="font-mono text-sm tracking-[0.25em] text-pulse uppercase">{name}</h3>
        <ul className={`mt-4 flex flex-wrap gap-2.5 ${isLeft ? "md:justify-end" : ""}`}>
          {items.map((item) => (
            <SkillPill key={item.slug} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function TechStack() {
  const headRef = useReveal<HTMLHeadingElement>();
  return (
    <section className="relative py-32 md:py-44">
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10">
        <h2 ref={headRef} className="reveal text-center text-4xl font-semibold tracking-tighter text-fog md:text-6xl">
          Tech <span className="text-pulse">tree</span>
        </h2>

        <div className="relative mt-20">
          {/* trunk */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 top-0 left-0 w-px bg-gradient-to-b from-transparent via-pulse/40 to-transparent md:left-1/2"
          />
          {techBranches.map((branch, i) => (
            <Branch
              key={branch.name}
              name={branch.name}
              items={branch.items}
              side={i % 2 === 0 ? "right" : "left"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
