# Soumy Dhiran · 3D Portfolio

An interactive 3D portfolio built with React Three Fiber, Three.js, Tailwind v4, and Vite.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

## Make it yours

Almost everything you need to change lives in **one file**:

`src/data/projects.ts`
- `profile` - your name, headline, intro, email, GitHub/LinkedIn links
- `projects` - replace the four sample projects with your real work.
  Each project picks its 3D preview via `shape`: `"knot" | "crystal" | "orb" | "rings"`
- `skills` - your skill groups

Other places you may want to touch:
- `index.html` - page title and meta description
- `src/index.css` - the accent color (`--color-pulse`) and theme tokens
- `src/scene/BackgroundScene.tsx` - the hero 3D object and starfield
- `src/scene/ProjectShape.tsx` - the per-project 3D preview shapes

## How it's built

- **Loader**: percentage counter in a pill over a marquee of your roles.
- **Animated cartoon character** (`src/scene/character/`): a rigged GLB with
  baked animations (intro, idle, typing, blink). Its head follows the cursor,
  and GSAP scroll timelines rotate it, pull the camera back to a desk, fade in
  a glowing monitor, and start the typing pose as you scroll through the hero,
  About, and What I Do sections. Shown on desktop only (>1024px).
  Ported from [red1-for-hek/portfolio-website](https://github.com/red1-for-hek/portfolio-website)
  (MIT License, © 2025 Redoyanul Haque) — see the notice atop each file in
  `src/scene/character/`. The model lives at `public/models/character.glb`.
- **Career timeline**: vertical, with a glowing progress line and a
  traveling orb driven by scroll. Content in `src/data/projects.ts`.
- **My Work**: GSAP ScrollTrigger pins the section and pans horizontally
  through numbered project panels, each with its own live 3D preview.
  Falls back to a vertical stack on mobile and reduced motion.
- **Tech stack**: logo wall served from the simpleicons.org CDN.
- A violet glow orb lags behind the cursor (decorative; native cursor
  stays, disabled for touch and reduced motion).
- All continuous motion runs inside render loops (no scroll listeners,
  no React state per frame), and everything respects `prefers-reduced-motion`.
