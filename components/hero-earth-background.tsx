"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

function RotatingEarth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const sourceTexture = useLoader(
    THREE.TextureLoader,
    "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
  );
  const styledTexture = useMemo(() => {
    const image = sourceTexture.image as HTMLImageElement | undefined;
    if (!image) return sourceTexture;

    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return sourceTexture;

    ctx.drawImage(image, 0, 0);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const blueMask = Math.max(0, Math.min(1, (b - Math.max(r, g)) / 80));

      const dark = 14;
      const yellowR = 170;
      const yellowG = 145;
      const yellowB = 72;

      data[i] = Math.round(dark * (1 - blueMask) + yellowR * blueMask);
      data[i + 1] = Math.round(dark * (1 - blueMask) + yellowG * blueMask);
      data[i + 2] = Math.round(dark * (1 - blueMask) + yellowB * blueMask);
    }

    ctx.putImageData(imgData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, [sourceTexture]);

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.096;
    }
  });

  return (
    <group>
      <Sphere args={[1, 96, 96]} ref={earthRef}>
        <meshStandardMaterial
          map={styledTexture}
          color="#141414"
          emissiveMap={styledTexture}
          emissive="#2a2412"
          emissiveIntensity={0.25}
          metalness={0.2}
          roughness={0.72}
        />
      </Sphere>
    </group>
  );
}

export function HeroEarthBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.18} />
      <directionalLight position={[3, 1, 4]} intensity={0.95} color="#c5a54a" />
      <directionalLight position={[-3, -2, -3]} intensity={0.18} color="#0f0f0f" />
      <RotatingEarth />
    </Canvas>
  );
}
