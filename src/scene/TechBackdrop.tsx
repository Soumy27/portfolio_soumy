import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/**
 * Ambient 3D backdrop for the whole site: a drifting particle field,
 * kept dim so the content stays readable on top.
 */

function Drift({ reduced }: { reduced: boolean }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 1100;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame(({ clock }, delta) => {
    if (reduced) return;
    const t = clock.elapsedTime;
    if (points.current) {
      points.current.rotation.y += delta * 0.02;
      points.current.position.y = Math.sin(t * 0.18) * 0.4;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#a78bfa"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function TechBackdrop() {
  const reduced = usePrefersReducedMotion();
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <Drift reduced={reduced} />
    </Canvas>
  );
}
