"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, PresentationControls } from "@react-three/drei";
import * as THREE from "three";

// Royal Indian Banquet Chafing Dish & Cloche Showpiece
function RoyalBanquetCloche() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.22;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.15, 0]}>
      {/* 1. Ornate Golden Carved Tier 1 (Outer Charger Rim) */}
      <mesh position={[0, -0.72, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.55, 2.75, 0.1, 64]} />
        <meshStandardMaterial
          color="#c59b27"
          metalness={0.92}
          roughness={0.18}
          envMapIntensity={1.8}
        />
      </mesh>

      {/* 2. Step Bevel Royal Gold Ring */}
      <mesh position={[0, -0.66, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.4, 2.52, 0.08, 64]} />
        <meshStandardMaterial
          color="#e5b83b"
          metalness={0.95}
          roughness={0.14}
        />
      </mesh>

      {/* 3. Luxury Warm Cream Polished Serving Surface */}
      <mesh position={[0, -0.61, 0]} receiveShadow>
        <cylinderGeometry args={[2.28, 2.28, 0.04, 64]} />
        <meshStandardMaterial
          color="#fbf9f4"
          metalness={0.1}
          roughness={0.25}
        />
      </mesh>

      {/* 4. Ornate Tripod Feet / Royal Pedestal Legs (3 curved legs) */}
      {[0, 1, 2].map((i) => {
        const angle = (i * Math.PI * 2) / 3;
        const rad = 2.1;
        return (
          <group key={i} position={[Math.cos(angle) * rad, -0.84, Math.sin(angle) * rad]}>
            <mesh castShadow>
              <sphereGeometry args={[0.13, 24, 24]} />
              <meshStandardMaterial color="#c59b27" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.08, 0]}>
              <cylinderGeometry args={[0.07, 0.11, 0.12, 16]} />
              <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        );
      })}

      {/* 5. Elegant Domed Serving Cloche */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <sphereGeometry args={[1.82, 64, 40, 0, Math.PI * 2, 0, Math.PI * 0.47]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.92}
          roughness={0.12}
          envMapIntensity={2.0}
        />
      </mesh>

      {/* 6. Gold Trim Band Around Cloche Base */}
      <mesh position={[0, -0.52, 0]} castShadow>
        <torusGeometry args={[1.82, 0.045, 24, 64]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.95}
          roughness={0.12}
        />
      </mesh>

      {/* 7. Secondary Upper Golden Crown Ring */}
      <mesh position={[0, 0.65, 0]}>
        <torusGeometry args={[1.35, 0.025, 20, 64]} />
        <meshStandardMaterial
          color="#e5b83b"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* 8. Royal Handle Crown & Finial */}
      {/* Handle Base Collar */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.32, 0.08, 32]} />
        <meshStandardMaterial color="#d4af37" metalness={0.92} roughness={0.15} />
      </mesh>
      {/* Handle Neck */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.16, 0.18, 24]} />
        <meshStandardMaterial color="#e5b83b" metalness={0.95} roughness={0.15} />
      </mesh>
      {/* Handle Regal Finial Sphere */}
      <mesh position={[0, 1.42, 0]} castShadow>
        <sphereGeometry args={[0.19, 32, 32]} />
        <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.12} />
      </mesh>

      {/* 9. Soft Ambient Floating Gold Particles */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 2.45 + (i % 2) * 0.35;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              0.1 + (i % 3) * 0.35,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial
              color="#f59e0b"
              emissive="#ea580c"
              emissiveIntensity={0.5}
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
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none blur-3xl" />

      <Canvas
        camera={{ position: [0, 2.0, 6.2], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.2} />
        {/* Warm key light */}
        <directionalLight position={[5, 8, 5]} intensity={2.4} castShadow />
        {/* Soft fill light */}
        <directionalLight position={[-5, 4, -3]} intensity={1.0} color="#fff8ee" />
        {/* Warm rim highlight */}
        <pointLight position={[0, 3, 2.5]} intensity={1.6} color="#fbbf24" distance={9} />

        <PresentationControls
          global
          snap
          speed={1.5}
          zoom={0.9}
          rotation={[0.15, 0.25, 0]}
          polar={[-0.15, 0.3]}
          azimuth={[-0.6, 0.6]}
        >
          <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.3}>
            <Suspense fallback={null}>
              <RoyalBanquetCloche />
            </Suspense>
          </Float>
        </PresentationControls>

        {/* Soft Organic Drop Shadow on Platter Floor */}
        <ContactShadows
          position={[0, -1.2, 0]}
          opacity={0.32}
          scale={7}
          blur={2.5}
          far={3}
          color="#78350f"
        />
      </Canvas>
    </div>
  );
}
