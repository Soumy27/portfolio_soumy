/**
 * Signal trail: a thin, dim dashed path that leaves the character's
 * monitor (to the left) and forks toward the two capability cards on the
 * right. A continuous stream of soft light dots flows out from the screen
 * and splits at the fork — "this is where the work comes from".
 *
 * The flow is a moving dash pattern (seamless: it advances exactly one
 * dash period per cycle, so it loops with no pop). Both branches share the
 * trunk and are equal length, so the stream stays in sync until the fork.
 * Kept restrained for a creative portfolio: low opacity, the site's
 * purple, thin. Only rendered when motion is allowed / the character
 * exists (gated in WhatIDo), and it fades in with the cards.
 */

// shared trunk from the monitor, forking to the upper and lower card
const PATH_UP = "M4 160 L118 160 C168 160 202 92 296 56";
const PATH_DOWN = "M4 160 L118 160 C168 160 202 228 296 264";

const DOT = 2.5; // length of each bright dot
const GAP = 24; // space between dots
const PERIOD = DOT + GAP;
const FLOW = 0.7; // seconds to advance one dot-to-dot step (lower = faster)

function Flow({ path }: { path: string }) {
  const dash = `${DOT} ${GAP}`;
  // advance by exactly one period each cycle → seamless, continuous loop.
  // negative offset moves the dots along the path, out toward the cards.
  const anim = (
    <animate
      attributeName="stroke-dashoffset"
      values={`0;-${PERIOD}`}
      dur={`${FLOW}s`}
      repeatCount="indefinite"
      calcMode="linear"
    />
  );
  return (
    <g fill="none" strokeLinecap="round" strokeDasharray={dash}>
      {/* soft glow */}
      <path d={path} stroke="#c4b5fd" strokeWidth="3.6" strokeOpacity="0.4" filter="url(#sig-glow)">
        {anim}
      </path>
      {/* bright core */}
      <path d={path} stroke="#efeaff" strokeWidth="1.6" strokeOpacity="0.9">
        {anim}
      </path>
    </g>
  );
}

export default function SignalTrail() {
  return (
    <svg
      className="signal-trail pointer-events-none absolute left-[34%] top-[25%] hidden h-[48%] w-[22%] lg:block"
      viewBox="0 0 300 320"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="sig-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>
      {/* static faint conductor the dots ride along */}
      <g stroke="#c4b5fd" strokeWidth="1.2" strokeLinecap="round" fill="none" strokeOpacity="0.16">
        <path d={PATH_UP} strokeDasharray="1 9" />
        <path d={PATH_DOWN} strokeDasharray="1 9" />
      </g>
      {/* the continuous flow, one stream per branch (synced on the trunk) */}
      <Flow path={PATH_UP} />
      <Flow path={PATH_DOWN} />
    </svg>
  );
}
