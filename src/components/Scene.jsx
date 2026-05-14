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

    const baseZ = compact ? -0.38 : -1.2;
    const homeY = compact ? 0.1 : 0.38 + (scrollY.current * 0.001);

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

  const hitScale = compact ? [0.82, 1.72, 0.82] : [1.3, 3, 1.3];
  const sphereScale = compact ? 1.72 : 3.05;

  return (
    <group ref={groupRef}>
      <Float speed={compact ? 1.15 : 1.5} rotationIntensity={compact ? 0.22 : 0.4} floatIntensity={compact ? 0.2 : 0.4}>
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
  const defaultCam = { position: [0, 0.42, 6.25], fov: 40 };

  return (
    <div className="w-full h-full pointer-events-auto overflow-visible touch-none">
      <Canvas
        shadows={false}
        dpr={compact ? [1, 2] : [1, 2]}
        camera={compact ? { fov: 42, near: 0.1, far: 100 } : defaultCam}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ camera }) => {
          if (compact) {
            camera.position.set(0, 0.08, 3.38);
            camera.lookAt(0, -0.22, 0);
          } else {
            camera.position.set(0, 0.42, 6.25);
            camera.lookAt(0, 0, 0);
          }
          camera.updateProjectionMatrix?.();
        }}
        style={{ overflow: 'visible', width: '100%', height: '100%' }}
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