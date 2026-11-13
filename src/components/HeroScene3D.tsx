"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, PresentationControls, Html } from "@react-three/drei";
import * as THREE from "three";

// 3D Fine Dining Cloche (Luxury Serving Dome & Golden Base)
function GourmetCloche() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Golden Base / Charger Platter */}
      <mesh position={[0, -0.65, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.5, 2.7, 0.12, 64]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.88}
          roughness={0.2}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Polished Warm Cream Center Inset */}
      <mesh position={[0, -0.58, 0]} receiveShadow>
        <cylinderGeometry args={[2.3, 2.3, 0.04, 64]} />
        <meshStandardMaterial
          color="#fdfbf7"
          metalness={0.05}
          roughness={0.3}
        />
      </mesh>

      {/* Elegant Dining Cloche Dome */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <sphereGeometry args={[1.85, 48, 28, 0, Math.PI * 2, 0, Math.PI * 0.48]} />
        <meshStandardMaterial
          color="#fefefe"
          metalness={0.85}
          roughness={0.15}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Cloche Gold Rim Accent */}
      <mesh position={[0, -0.54, 0]}>
        <torusGeometry args={[1.85, 0.05, 24, 64]} />
        <meshStandardMaterial
          color="#f59e0b"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Luxury Gold Handle Finial */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      <mesh position={[0, 1.08, 0]}>
        <cylinderGeometry args={[0.08, 0.14, 0.25, 24]} />
        <meshStandardMaterial
          color="#f59e0b"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Floating Sparkle Particles */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 2.4 + (i % 2) * 0.4;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              0.2 + (i % 3) * 0.4,
              Math.sin(angle) * radius,
            ]}
          >
            <octahedronGeometry args={[0.07, 0]} />
            <meshStandardMaterial
              color="#f59e0b"
              emissive="#ea580c"
              emissiveIntensity={0.6}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function HeroScene3D() {
  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] flex items-center justify-center select-none">
      {/* Background Subtle Radial Glow */}
      <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent pointer-events-none blur-2xl" />

      <Canvas
        camera={{ position: [0, 1.8, 6.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[6, 8, 5]} intensity={2.2} castShadow shadow-mapSize={1024} />
        <directionalLight position={[-6, 4, -4]} intensity={0.9} color="#fff4e0" />
        <pointLight position={[0, 2.5, 2]} intensity={1.5} color="#fbbf24" distance={8} />

        <PresentationControls
          global
          snap
          speed={1.5}
          zoom={0.9}
          rotation={[0.1, 0.2, 0]}
          polar={[-0.2, 0.35]}
          azimuth={[-0.6, 0.6]}
        >
          <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
            <Suspense fallback={null}>
              <GourmetCloche />
            </Suspense>
          </Float>
        </PresentationControls>

        {/* Soft Organic Drop Shadow on Floor */}
        <ContactShadows
          position={[0, -1.2, 0]}
          opacity={0.35}
          scale={7}
          blur={2.4}
          far={3}
          color="#78350f"
        />
      </Canvas>
    </div>
  );
}
