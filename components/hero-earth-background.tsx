"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

function RotatingEarth({ autoRotate }: { autoRotate: boolean }) {
  const earthRef = useRef<THREE.Mesh>(null);
  const earthTexture = useLoader(
    THREE.TextureLoader,
    "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
  );

  useFrame((_, delta) => {
    if (earthRef.current && autoRotate) {
      earthRef.current.rotation.y += delta * 0.096;
    }
  });

  return (
    <group>
      <Sphere args={[1, 96, 96]} ref={earthRef}>
        <meshStandardMaterial
          map={earthTexture}
          color="#ffffff"
          metalness={0.06}
          roughness={0.88}
        />
      </Sphere>
    </group>
  );
}

export function HeroEarthBackground({
  interactive = false,
  zoomed = false,
}: {
  interactive?: boolean;
  zoomed?: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, zoomed ? 2.7 : 3.1], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.34} />
      <directionalLight position={[4, 2, 5]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-4, -2, -4]} intensity={0.26} color="#9bbcff" />
      <RotatingEarth autoRotate={!interactive} />
      {interactive && (
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          rotateSpeed={0.65}
          enableDamping
          dampingFactor={0.06}
        />
      )}
    </Canvas>
  );
}
