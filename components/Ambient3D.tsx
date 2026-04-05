'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleCloud() {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random positions for the "sonic dust"
  const [positions] = useMemo(() => {
    const count = 1000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread particles in a wide, shallow cylinder
      const r = Math.random() * 15;
      const theta = Math.random() * 2 * Math.PI;
      pos[i * 3] = r * Math.cos(theta); // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
      pos[i * 3 + 2] = r * Math.sin(theta); // z
    }
    return [pos];
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.05;
      ref.current.rotation.x -= delta * 0.02;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#5eead4"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function Ambient3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ParticleCloud />
      </Canvas>
    </div>
  );
}