import { Suspense, memo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';
import ShardSphere from './ShardSphere';

const MovingContent = ({ isLoading, onCrystalClick, isProfileOpen, isHubOpen, compact }) => {
  const groupRef = useRef();
  const scrollY = useRef(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const handleScroll = () => { scrollY.current = window.scrollY; };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const baseZ = compact ? -0.4 : -0.5;
    const homeY = compact ? 0.15 : 0.22;

    let targetY;
    if (isHubOpen) {
      targetY = 0;
    } else if (isProfileOpen) {
      targetY = 0.5;
    } else if (isLoading && !compact) {
      targetY = -0.5;
    } else {
      targetY = homeY;
    }

    const targetZ = isHubOpen ? -2.2 : (isProfileOpen ? -0.8 : baseZ);

    if (isFirstRender.current) {
      groupRef.current.position.y = targetY;
      groupRef.current.position.z = targetZ;
      isFirstRender.current = false;
      return;
    }

    // Тот самый LERP для "масляной" анимации
    const t = 0.05;
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, t);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, t);
  });

  const hitScale = compact ? [0.74, 1.55, 0.74] : [1.3, 3, 1.3];
  const sphereScale = compact ? 2.0 : 4.8;

  return (
    <group ref={groupRef}>
      <Float speed={compact ? 1.2 : 1.5} rotationIntensity={compact ? 0.25 : 0.4} floatIntensity={compact ? 0.28 : 0.4}>
        <mesh
          scale={hitScale}
          onPointerDown={(e) => {
            if (isHubOpen || (isLoading && !compact)) return;
            e.stopPropagation();
            onCrystalClick();
          }}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>

        <ShardSphere position={[0, 0, 0]} scale={sphereScale} />
      </Float>
    </group>
  );
};

const Scene = memo(({ isLoading, onCrystalClick, isProfileOpen, isHubOpen, compact }) => {
  const cam = compact
    ? { position: [0, 0.08, 3.72], fov: 41 }
    : { position: [0, 0.42, 6.25], fov: 40 };

  return (
    <div className="w-full h-full pointer-events-auto overflow-visible touch-none">
      <Canvas
        shadows={false}
        dpr={compact ? [1, 1.5] : [1, 2]}
        camera={{ position: cam.position, fov: cam.fov }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        style={{ overflow: 'visible' }}
      >
        <AdaptiveDpr />
        <AdaptiveEvents />
        <ambientLight intensity={compact ? 0.55 : 0.6} />
        <pointLight position={[5, 5, 5]} intensity={compact ? 1.35 : 1.5} />
        <Suspense fallback={null}>
          <Environment preset="night" />
          <MovingContent
            isLoading={isLoading}
            onCrystalClick={onCrystalClick}
            isProfileOpen={isProfileOpen}
            isHubOpen={isHubOpen}
            compact={compact}
          />
        </Suspense>
      </Canvas>
    </div>
  );
});

export default Scene;