"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

function RotatingEarth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const earthTexture = useLoader(
    THREE.TextureLoader,
    "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
  );

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.096;
    }
  });

  return (
    <group position={[0, 0.08, 0]}>
      <Sphere args={[0.94, 96, 96]} ref={earthRef}>
        <meshStandardMaterial
          map={earthTexture}
          color="#e8eef9"
          emissive="#17263a"
          emissiveIntensity={0.04}
          metalness={0.06}
          roughness={0.86}
        />
      </Sphere>
    </group>
  );
}

export function HeroEarthBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.75], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 2, 5]} intensity={0.96} color="#ffffff" />
      <directionalLight position={[-4, -2, -4]} intensity={0.24} color="#9bbcff" />
      <RotatingEarth />
    </Canvas>
  );
}
