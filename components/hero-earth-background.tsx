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
  const earthRef = useRef<THREE.Mesh>(null);
  const reducedMotion = usePrefersReducedMotion();
  const texture = useLoader(THREE.TextureLoader, "/earth-2048.jpg");

  useFrame((_, delta) => {
    if (earthRef.current && !reducedMotion) {
      earthRef.current.rotation.y += delta * 0.096;
    }
  });

  return (
    <Sphere args={[0.94, 64, 64]} ref={earthRef}>
      <meshStandardMaterial
        map={texture}
        color="#e8eef9"
        emissive="#17263a"
        emissiveIntensity={0.04}
        metalness={0.06}
        roughness={0.86}
      />
    </Sphere>
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
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 2, 5]} intensity={0.96} color="#ffffff" />
      <directionalLight position={[-4, -2, -4]} intensity={0.24} color="#9bbcff" />
      <Suspense fallback={<EarthFallback />}>
        <RotatingEarth />
      </Suspense>
    </Canvas>
  );
}
