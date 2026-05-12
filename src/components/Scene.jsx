import { Suspense, memo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';
import ShardSphere from './ShardSphere';

const MovingContent = ({ isLoading, onCrystalClick, isProfileOpen, isHubOpen }) => {
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

    // Твои базовые параметры
    const baseZ = -1.2;
    const homeY = 0.38 + (scrollY.current * 0.001);

    // Определяем цель по Y (фиксим обрезку и центрируем в хабе)
    let targetY;
    if (isHubOpen) {
      targetY = 0;
    } else if (isProfileOpen) {
      targetY = 0.5;
    } else if (isLoading) {
      targetY = -0.5; // Твой фикс, чтобы сферы и низ не резало
    } else {
      targetY = homeY;
    }

    // Твой плавный переход по Z (в хабе чуть дальше, чтобы всё влезло)
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

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
        {/* Твой настроенный меш для клика */}
        <mesh
          scale={[1.3, 3, 1.3]}
          onPointerDown={(e) => {
            if (isHubOpen || isLoading) return;
            e.stopPropagation();
            onCrystalClick();
          }}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>

        {/* ТВОИ СФЕРЫ С РОДНЫМ СКЕЙЛОМ */}
        <ShardSphere position={[0, 0, 0]} scale={3.05} />
      </Float>
    </group>
  );
};

const Scene = memo(({ isLoading, onCrystalClick, isProfileOpen, isHubOpen }) => {
  return (
    <div className="w-full h-full pointer-events-auto overflow-visible">
      <Canvas
        shadows={false}
        dpr={[1, 2]}
        camera={{ position: [0, 0.42, 6.25], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        style={{ overflow: 'visible' }}
      >
        <AdaptiveDpr />
        <AdaptiveEvents />
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <Environment preset="night" />
          <MovingContent
            isLoading={isLoading}
            onCrystalClick={onCrystalClick}
            isProfileOpen={isProfileOpen}
            isHubOpen={isHubOpen}
          />
        </Suspense>
      </Canvas>
    </div>
  );
});

export default Scene;