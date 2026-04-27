"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

function RotatingEarth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(
    THREE.TextureLoader,
    "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
  );

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.12;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * 0.06;
    }
  });

  return (
    <group>
      <Sphere args={[1, 64, 64]} ref={earthRef}>
        <meshStandardMaterial
          map={texture}
          color="#facc15"
          emissive="#161616"
          emissiveIntensity={0.28}
          metalness={0.12}
          roughness={0.78}
        />
      </Sphere>

      <Sphere args={[1.06, 48, 48]} ref={atmosphereRef}>
        <meshBasicMaterial
          color="#facc15"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

export function HeroEarthBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.45], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.32} />
      <directionalLight position={[3, 1, 4]} intensity={1.1} color="#facc15" />
      <directionalLight position={[-3, -2, -3]} intensity={0.22} color="#111111" />
      <RotatingEarth />
    </Canvas>
  );
}
