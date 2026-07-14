// Ported from https://github.com/red1-for-hek/portfolio-website
// MIT License, Copyright (c) 2025 Redoyanul Haque.
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  let intensity = 0;
  setInterval(() => {
    intensity = Math.random();
  }, 200);
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  let screenLight!: THREE.Mesh & { material: THREE.MeshStandardMaterial };
  let monitor!: THREE.Mesh & { material: THREE.MeshStandardMaterial };
  character?.children.forEach((object: THREE.Object3D) => {
    if (object.name === "Plane004") {
      object.children.forEach((child: THREE.Object3D) => {
        const c = child as THREE.Mesh & { material: THREE.MeshStandardMaterial };
        c.material.transparent = true;
        c.material.opacity = 0;
        if (c.material.name === "Material.027") {
          monitor = c;
          c.material.color.set("#FFFFFF");
        }
      });
    }
    if (object.name === "screenlight") {
      const o = object as THREE.Mesh & { material: THREE.MeshStandardMaterial };
      o.material.transparent = true;
      o.material.opacity = 0;
      o.material.emissive.set("#C8BFFF");
      gsap.timeline({ repeat: -1, repeatRefresh: true }).to(o.material, {
        emissiveIntensity: () => intensity * 8,
        duration: () => Math.random() * 0.6,
        delay: () => Math.random() * 0.1,
      });
      screenLight = o;
    }
  });
  const neckBone = character?.getObjectByName("spine005");
  if (window.innerWidth > 1024) {
    if (character) {
      tl1
        .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
        .to(camera.position, { z: 22 }, 0)
        .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
        .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);

      tl2
        .to(camera.position, { z: 75, y: 8.4, duration: 6, delay: 2, ease: "power3.inOut" }, 0)
        .to(".about-section", { y: "30%", duration: 6 }, 0)
        .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
        .fromTo(
          ".character-model",
          { pointerEvents: "inherit" },
          { pointerEvents: "none", x: "-40%", delay: 2, duration: 5 },
          0
        )
        .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0)
        .to(neckBone!.rotation, { x: 0.6, delay: 2, duration: 3 }, 0)
        .to(monitor.material, { opacity: 1, duration: 0.8, delay: 3.2 }, 0)
        .to(screenLight.material, { opacity: 1, duration: 0.8, delay: 4.5 }, 0)
        .fromTo(
          ".what-box-in",
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0, duration: 2.5, delay: 4.5, ease: "power2.out" },
          0
        )
        // the signal trail draws in just after the cards land
        .fromTo(
          ".signal-trail",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 2.5, delay: 5.5, ease: "power2.out" },
          0
        )
        .fromTo(monitor.position, { y: -10, z: 2 }, { y: 0, z: 0, delay: 1.5, duration: 3 }, 0)
        .fromTo(
          ".character-rim",
          { opacity: 1, scaleX: 1.4 },
          { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
          0.3
        );

      tl3
        .fromTo(
          ".character-model",
          { y: "0%" },
          { y: "-100%", duration: 4, ease: "none", delay: 1 },
          0
        )
        .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0)
        .to(character.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);
    }
  } else {
    if (character) {
      // Desktop reveals the monitor + screen glow during the desk zoom and
      // turns the character to a 3/4 angle so the screen reads as a screen.
      // Small screens have no zoom, so switch the monitor + glow on and give
      // the character a gentle turn instead of a dead-on view.
      if (monitor) monitor.material.opacity = 1;
      if (screenLight) screenLight.material.opacity = 1;
      character.rotation.y = 0.5;

      // small screens: the character lives behind the hero only. Fade it
      // out as the hero scrolls away so it never overlaps About / Work / etc.
      gsap.timeline({
        scrollTrigger: {
          trigger: ".landing-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      }).to(".character-model", { autoAlpha: 0, ease: "none" });

      const tM2 = gsap.timeline({
        scrollTrigger: { trigger: ".what-box-in", start: "top 75%" },
      });
      tM2.fromTo(
        ".what-box-in",
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" },
        0
      );
    }
  }
}
