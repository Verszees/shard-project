import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function ShardSphere({ position, scale, speedFactor = 1 }) {
  const { scene } = useGLTF('/shard.glb');
  const meshRef = useRef();
  const ringRef = useRef();
  const materialsRef = useRef([]);
  const gyro = useRef({ y: 0 });
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => { scrollYRef.current = window.scrollY; };
    window.addEventListener('scroll', handleScroll, { passive: true });
    const handleOrientation = (e) => {
      if (e.gamma !== null) gyro.current.y = THREE.MathUtils.clamp(e.gamma, -15, 15) / 15;
    };
    window.addEventListener('deviceorientation', handleOrientation);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  const ringParticles = useMemo(() => {
    const count = 80;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.5 + Math.random() * 0.4;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.15;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: '#050505',
          emissive: new THREE.Color('#3366ff'),
          emissiveIntensity: 1.5,
          roughness: 0.1,
          metalness: 0.8,
          transparent: true,
          opacity: 0.8,
        });
        materialsRef.current.push(child.material);
      }
    });
    return clone;
  }, [scene]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const scrollFactor = Math.min(scrollYRef.current / 800, 1);

    if (meshRef.current) {
      meshRef.current.rotation.y += (0.006 + scrollFactor * 0.04) * speedFactor;
      // Более плавное затухание поворотов (0.02 вместо 0.05)
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, Math.sin(t * 0.4) * 0.05, 0.02);
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, -gyro.current.y * 0.1, 0.02);
      meshRef.current.scale.set(scale, scale, scale);
    }

    if (ringRef.current) {
      const ringScale = 1 + (scrollFactor * 2.5);
      // Сглаживание масштаба и позиции кольца
      ringRef.current.scale.x = THREE.MathUtils.lerp(ringRef.current.scale.x, ringScale, 0.05);
      ringRef.current.scale.y = THREE.MathUtils.lerp(ringRef.current.scale.y, ringScale, 0.05);
      ringRef.current.scale.z = THREE.MathUtils.lerp(ringRef.current.scale.z, ringScale, 0.05);

      ringRef.current.position.y = THREE.MathUtils.lerp(ringRef.current.position.y, scrollFactor * 2.0, 0.05);
      ringRef.current.rotation.y -= (0.003 + (scrollFactor * 0.03));
    }

    const pulse = (1.0 + Math.sin(t * 2) * 0.4) + (scrollFactor * 2);
    materialsRef.current.forEach((mat) => {
      // Плавное пульсирование свечения
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, pulse, delta * 1.5);
    });
  });

  return (
    <group position={position}>
      <primitive ref={meshRef} object={clonedScene} />
      <points ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={ringParticles.length / 3} array={ringParticles} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#4488ff" transparent opacity={0.3} sizeAttenuation blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
}