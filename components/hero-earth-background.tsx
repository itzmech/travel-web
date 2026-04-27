"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

function RotatingEarth({ autoRotate }: { autoRotate: boolean }) {
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
      const oceanMask = Math.max(0, Math.min(1, (b - Math.max(r, g)) / 72));
      const landMask = 1 - oceanMask;

      const darkR = 10;
      const darkG = 10;
      const darkB = 10;
      const yellowR = 156;
      const yellowG = 132;
      const yellowB = 68;

      data[i] = Math.round(darkR * oceanMask + yellowR * landMask);
      data[i + 1] = Math.round(darkG * oceanMask + yellowG * landMask);
      data[i + 2] = Math.round(darkB * oceanMask + yellowB * landMask);
    }

    ctx.putImageData(imgData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, [sourceTexture]);

  useFrame((_, delta) => {
    if (earthRef.current && autoRotate) {
      earthRef.current.rotation.y += delta * 0.096;
    }
  });

  return (
    <group>
      <Sphere args={[1.16, 96, 96]} ref={earthRef}>
        <meshStandardMaterial
          map={styledTexture}
          color="#1a1a1a"
          emissiveMap={styledTexture}
          emissive="#2a2412"
          emissiveIntensity={0.38}
          metalness={0.2}
          roughness={0.68}
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
      camera={{ position: [0, 0, zoomed ? 2.35 : 2.8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.18} />
      <directionalLight position={[3, 1, 4]} intensity={0.95} color="#c5a54a" />
      <directionalLight position={[-3, -2, -3]} intensity={0.18} color="#0f0f0f" />
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
