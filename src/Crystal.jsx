import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MeshDistortMaterial, Float, PerspectiveCamera } from '@react-three/drei';

function ShardMesh() {
  const meshRef = useRef();

  // Вращение кристалла
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(t / 4) / 8;
    meshRef.current.rotation.y = t / 4;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.8}>
        {/* Форма кристалла (октаэдр) */}
        <octahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#007AFF"
          speed={4}
          distort={0.2}
          radius={1}
          roughness={0}
          metalness={1}
        />
      </mesh>
    </Float>
  );
}

export default function CrystalScene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        <ShardMesh />
      </Canvas>
    </div>
  );
}