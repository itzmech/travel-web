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
    <group>
      <Sphere args={[1.3, 96, 96]} ref={earthRef}>
        <meshStandardMaterial
          map={earthTexture}
          color="#ffffff"
          emissive="#4f6ea8"
          emissiveIntensity={0.16}
          metalness={0.06}
          roughness={0.8}
        />
      </Sphere>
    </group>
  );
}

export function HeroEarthBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.42} />
      <directionalLight position={[4, 2, 5]} intensity={1.08} color="#ffffff" />
      <directionalLight position={[-4, -2, -4]} intensity={0.34} color="#b5ccff" />
      <RotatingEarth />
    </Canvas>
  );
}
