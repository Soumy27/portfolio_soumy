// Ported from https://github.com/red1-for-hek/portfolio-website
// MIT License, Copyright (c) 2025 Redoyanul Haque.
// Adapted: self-contained (no LoadingProvider); lights + intro fire
// shortly after the model loads.
import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./character";
import setLighting from "./lighting";
import handleResize from "./resizeUtils";
import {
  handleHeadRotation,
  handleMouseMove,
  handleTouchEnd,
  handleTouchMove,
} from "./mouseUtils";
import setAnimations from "./animationUtils";

const CharacterScene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasDiv.current) return;
    // React StrictMode (and HMR) run this effect twice; clear any canvas a
    // previous run left behind so we never stack renderers on the same div.
    canvasDiv.current
      .querySelectorAll("canvas")
      .forEach((el) => el.remove());
    // async loads resolve after cleanup on the throwaway StrictMode mount;
    // this flag lets those late callbacks bail out instead of mutating a
    // scene that is about to be replaced.
    let disposed = false;
    const rect = canvasDiv.current.getBoundingClientRect();
    const container = { width: rect.width, height: rect.height };
    const aspect = container.width / container.height;
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.devicePixelRatio < 2,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvasDiv.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    // On phones/tablets the fixed vertical FOV makes the head fill the whole
    // screen. Pull the camera back and drop the zoom so the whole character
    // fits with room for the hero text. (Desktop keeps its framing + the
    // scroll choreography that only runs above 1024px.) Re-applied on resize
    // so dragging the window smaller reframes the character instead of
    // leaving a giant zoomed-in head.
    const applyFraming = () => {
      if (window.innerWidth <= 1024) {
        const narrow = window.innerWidth <= 640;
        camera.position.set(0, 12.6, narrow ? 46 : 38);
        camera.zoom = narrow ? 0.85 : 0.95;
      } else {
        camera.position.set(0, 13.1, 24.7);
        camera.zoom = 1.1;
      }
      camera.updateProjectionMatrix();
    };
    applyFraming();

    let headBone: THREE.Object3D | null = null;
    let screenLight: (THREE.Mesh & { material: THREE.MeshStandardMaterial }) | null = null;
    let mixer: THREE.AnimationMixer;
    let character: THREE.Object3D | null = null;
    const clock = new THREE.Clock();

    const light = setLighting(scene);
    const { loadCharacter } = setCharacter(renderer, scene, camera);

    loadCharacter().then((gltf) => {
      if (!gltf || disposed) return;
      const animations = setAnimations(gltf);
      if (hoverDivRef.current) animations.hover(gltf, hoverDivRef.current);
      mixer = animations.mixer;
      character = gltf.scene;
      scene.add(character);
      headBone = character.getObjectByName("spine006") || null;
      screenLight =
        (character.getObjectByName("screenlight") as
          | (THREE.Mesh & { material: THREE.MeshStandardMaterial })
          | undefined) || null;
      // turn the lights on once the HDR environment is loaded, then play
      // the intro after a further settle so it reaches its neutral pose
      setTimeout(() => light.turnOnLights(), 600);
      setTimeout(() => animations.startIntro(), 1600);
      window.addEventListener("resize", onResize);
    });

    const onResize = () => {
      applyFraming();
      handleResize(renderer, camera, canvasDiv, character);
    };

    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };

    const onMouseMove = (event: MouseEvent) =>
      handleMouseMove(event, (x, y) => (mouse = { x, y }));
    let debounce: number | undefined;
    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      debounce = window.setTimeout(() => {
        element?.addEventListener("touchmove", (e: TouchEvent) =>
          handleTouchMove(e, (x, y) => (mouse = { x, y }))
        );
      }, 200);
    };
    const onTouchEnd = () =>
      handleTouchEnd((x, y, ix, iy) => {
        mouse = { x, y };
        interpolation = { x: ix, y: iy };
      });

    document.addEventListener("mousemove", onMouseMove);
    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart);
      landingDiv.addEventListener("touchend", onTouchEnd);
    }

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
        if (screenLight) light.setPointLight(screenLight);
      }
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(debounce);
      scene.clear();
      renderer.dispose();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", onMouseMove);
      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEnd);
      }
      renderer.domElement.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default CharacterScene;
