// Ported from https://github.com/red1-for-hek/portfolio-website
// MIT License, Copyright (c) 2025 Redoyanul Haque.
// Adapted: loads the plain /models/character.glb (draco) directly
// instead of the encrypted build, and skips their career timeline.
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DRACOLoader, GLTFLoader, type GLTF } from "three-stdlib";
import { setCharTimeline } from "./gsapScroll";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>((resolve, reject) => {
      loader.load(
        "/models/character.glb",
        async (gltf) => {
          const character = gltf.scene;
          await renderer.compileAsync(character, camera, scene);
          character.traverse((child: THREE.Object3D) => {
            const mesh = child as THREE.Mesh;
            if (mesh.isMesh) {
              mesh.castShadow = false;
              mesh.receiveShadow = false;
              // The rig's rest-pose bounding volumes don't cover the posed/
              // animated character, so frustum culling wrongly drops meshes
              // and the model renders (near) empty. Only ~60 meshes, so
              // disabling culling here is free.
              mesh.frustumCulled = false;
              if (mesh.material && !Array.isArray(mesh.material)) {
                (mesh.material as THREE.ShaderMaterial).precision = "mediump";
              }
            }
          });
          resolve(gltf);
          setCharTimeline(character, camera);
          const footR = character.getObjectByName("footR");
          const footL = character.getObjectByName("footL");
          if (footR) footR.position.y = 3.36;
          if (footL) footL.position.y = 3.36;
          ScrollTrigger.refresh();
          dracoLoader.dispose();
        },
        undefined,
        (error) => {
          console.error("Error loading GLTF model:", error);
          reject(error);
        }
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
