// Ported from https://github.com/red1-for-hek/portfolio-website
// MIT License, Copyright (c) 2025 Redoyanul Haque.
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setCharTimeline } from "./gsapScroll";

export default function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: React.RefObject<HTMLDivElement | null>,
  character: THREE.Object3D | null
) {
  if (!canvasDiv.current) return;
  const rect = canvasDiv.current.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height);
  camera.aspect = rect.width / rect.height;
  camera.updateProjectionMatrix();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  if (character) setCharTimeline(character, camera);
}
