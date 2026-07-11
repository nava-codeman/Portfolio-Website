import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Sparkles } from '@react-three/drei';

const Shape = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 0]} />
        <meshPhysicalMaterial 
          color="#ff6b35"
          emissive="#00f0ff"
          emissiveIntensity={0.2}
          wireframe
          thickness={2}
          roughness={0.1}
        />
      </mesh>
      <mesh scale={0.8}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <MeshDistortMaterial 
          color="#00f0ff" 
          emissive="#0f172a"
          distort={0.4} 
          speed={2} 
          roughness={0.2} 
        />
      </mesh>
    </Float>
  );
};

const FloatingModel = () => {
  return (
    <div style={{ width: '100%', height: '400px', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <Environment preset="city" />
        <Sparkles count={50} scale={5} size={2} speed={0.4} color="#ff6b35" />
        <Shape />
      </Canvas>
    </div>
  );
};

export default FloatingModel;
