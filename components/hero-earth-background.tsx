"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

function usePrefersReducedMotion(): boolean {
  return useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
}

function RotatingEarth() {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = usePrefersReducedMotion();
  const texture = useLoader(THREE.TextureLoader, "/earth-2048.jpg");

  useFrame((_, delta) => {
    if (groupRef.current && !reducedMotion) {
      groupRef.current.rotation.y += delta * 0.096;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Soft outer halo */}
      <Sphere args={[1.06, 32, 32]}>
        <meshBasicMaterial
          color="#4da6ff"
          transparent
          opacity={0.07}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      {/* Rim atmosphere */}
      <Sphere args={[0.98, 64, 64]}>
        <meshBasicMaterial
          color="#6ec4ff"
          transparent
          opacity={0.22}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      <Sphere args={[0.94, 64, 64]}>
        <meshStandardMaterial
          map={texture}
          color="#e8eef9"
          emissive="#1e4a7a"
          emissiveIntensity={0.14}
          metalness={0.08}
          roughness={0.82}
        />
      </Sphere>
    </group>
  );
}

function EarthFallback() {
  return (
    <Sphere args={[0.94, 32, 32]}>
      <meshStandardMaterial color="#12305c" roughness={0.9} />
    </Sphere>
  );
}

export function HeroEarthBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.75], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.42} />
      <directionalLight position={[4, 2, 5]} intensity={1.05} color="#ffffff" />
      <directionalLight position={[-4, -2, -4]} intensity={0.32} color="#9bbcff" />
      <pointLight position={[2.5, 1, 3]} intensity={0.35} color="#5eb8ff" distance={6} />
      <Suspense fallback={<EarthFallback />}>
        <RotatingEarth />
      </Suspense>
    </Canvas>
  );
}
