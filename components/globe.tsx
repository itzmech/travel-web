"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { DESTINATIONS, latLngToVector3, type Destination } from "@/lib/destinations";

// Pulsing marker component for destinations
function DestinationMarker({
  destination,
  onSelect,
  isSelected,
}: {
  destination: Destination;
  onSelect: (dest: Destination) => void;
  isSelected: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const position = useMemo(
    () => latLngToVector3(destination.lat, destination.lng, 1.01),
    [destination.lat, destination.lng]
  );

  useFrame((state) => {
    if (meshRef.current && glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 3 + destination.lat) * 0.3 + 1;
      const scale = (hovered || isSelected ? 1.5 : 1) * pulse;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={position}>
      {/* Core dot */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(destination);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshBasicMaterial color={isSelected ? "#FFD166" : "#4F8EF7"} />
      </mesh>
      
      {/* Glow ring */}
      <mesh ref={glowRef}>
        <ringGeometry args={[0.02, 0.035, 32]} />
        <meshBasicMaterial
          color={isSelected ? "#FFD166" : "#4F8EF7"}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Atmospheric glow effect
function Atmosphere() {
  const atmosphereRef = useRef<THREE.Mesh>(null);

  return (
    <Sphere args={[1.03, 64, 64]} ref={atmosphereRef}>
      <shaderMaterial
        transparent
        side={THREE.BackSide}
        uniforms={{
          glowColor: { value: new THREE.Color("#4F8EF7") },
        }}
        vertexShader={`
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 glowColor;
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            gl_FragColor = vec4(glowColor, intensity * 0.4);
          }
        `}
      />
    </Sphere>
  );
}

// Main Earth globe
function Earth({
  onSelectDestination,
  selectedDestination,
}: {
  onSelectDestination: (dest: Destination | null) => void;
  selectedDestination: Destination | null;
}) {
  const earthRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(
    THREE.TextureLoader,
    "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
  );

  return (
    <group>
      {/* Earth sphere */}
      <Sphere args={[1, 64, 64]} ref={earthRef}>
        <meshStandardMaterial map={texture} metalness={0.1} roughness={0.7} />
      </Sphere>

      {/* Atmosphere glow */}
      <Atmosphere />

      {/* Destination markers */}
      {DESTINATIONS.map((dest) => (
        <DestinationMarker
          key={dest.id}
          destination={dest}
          onSelect={onSelectDestination}
          isSelected={selectedDestination?.id === dest.id}
        />
      ))}
    </group>
  );
}

// Camera controller for smooth transitions
function CameraController({
  targetDestination,
}: {
  targetDestination: Destination | null;
}) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  useFrame(() => {
    if (targetDestination && controlsRef.current) {
      const [x, y, z] = latLngToVector3(
        targetDestination.lat,
        targetDestination.lng,
        2.5
      );
      
      // Smooth camera transition
      camera.position.lerp(new THREE.Vector3(x, y, z), 0.02);
      controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.02);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={1.5}
      maxDistance={4}
      rotateSpeed={0.5}
      zoomSpeed={0.5}
      enableDamping
      dampingFactor={0.05}
    />
  );
}

// Main Globe component
export function Globe({
  onSelectDestination,
  selectedDestination,
}: {
  onSelectDestination: (dest: Destination | null) => void;
  selectedDestination: Destination | null;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.5], fov: 45 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 3, 5]} intensity={1} />
      <Earth
        onSelectDestination={onSelectDestination}
        selectedDestination={selectedDestination}
      />
      <CameraController targetDestination={selectedDestination} />
    </Canvas>
  );
}
