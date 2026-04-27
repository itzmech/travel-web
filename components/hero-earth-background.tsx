"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

function RotatingEarth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(
    THREE.TextureLoader,
    "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
  );

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group>
      <Sphere args={[1.1, 96, 96]} ref={earthRef}>
        <meshStandardMaterial
          map={texture}
          color="#0b0b0b"
          emissiveMap={texture}
          emissive="#facc15"
          emissiveIntensity={0.65}
          metalness={0.3}
          roughness={0.55}
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
      <ambientLight intensity={0.22} />
      <directionalLight position={[3, 1, 4]} intensity={1.35} color="#facc15" />
      <directionalLight position={[-3, -2, -3]} intensity={0.12} color="#111111" />
      <RotatingEarth />
    </Canvas>
  );
}
