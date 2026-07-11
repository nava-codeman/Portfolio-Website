import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture, Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';

const IntroEnv = () => {
  const groupRef = useRef();
  const size = useThree((state) => state.size);
  const isMobile = size.width < 768;
  const spreadFactor = isMobile ? 0.9 : 2.5;
  
  // Load all 12 textures dynamically for the composite lineup
  const texturePaths = Array.from({ length: 12 }, (_, i) => `/Spidy%20images/SPIDERMAN${i + 1}.png`);
  const textures = useTexture(texturePaths);
  
  textures.forEach(t => {
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.magFilter = THREE.LinearFilter;
  });

  // Calculate positions for a 12-character team lineup
  // 0 is center. Odds are left, evens are right.
  const order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const positions = [];
  
  order.forEach((index, i) => {
    if (i === 0) {
      positions.push([0, 0, 0]); // Center focal point
    } else {
      const isLeft = i % 2 !== 0;
      const step = Math.ceil(i / 2); 
      const x = isLeft ? -step * spreadFactor : step * spreadFactor;
      const z = -step * 0.8; // Curve backward gently
      positions.push([x, 0, z]); 
    }
  });

  useFrame((state) => {
    if (!groupRef.current) return;
    
    groupRef.current.getWorldPosition(new THREE.Vector3());
    const dist = state.camera.position.z - groupRef.current.position.z;
    if (dist < 160 && dist > -60) {
      groupRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.05);
    } else {
      groupRef.current.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), 0.05);
    }
  });

  return (
    <group ref={groupRef} scale={[0.001, 0.001, 0.001]}>
      {/* Title */}
      <Text 
        position={[0, isMobile ? 6.5 : 5.2, 0.5]} 
        anchorX="center" 
        anchorY="middle" 
        color="#00f0ff" 
        fontSize={isMobile ? 0.35 : 0.7} 
        letterSpacing={0.1}
        maxWidth={isMobile ? 4.5 : 20}
        textAlign="center"
      >
        Welcome to Navjyoti Nath's Portfolio
      </Text>

      {/* Team Composite Lineup */}
      {order.map((texIndex, i) => (
        <Billboard key={texIndex} position={positions[i]} follow={true}>
          <mesh>
            {/* Kept size massive to match the rest of the timeline */}
            <planeGeometry args={[4.8, 6.8]} />
            <meshPhysicalMaterial 
              map={textures[texIndex]}
              transparent={true}
              opacity={0.95}
              roughness={0.15}
              metalness={0.2}
              clearcoat={1.0}
              clearcoatRoughness={0.05}
              side={THREE.DoubleSide}
              envMapIntensity={2.5}
              alphaTest={0.05} // Critical for clean overlap sorting
            />
          </mesh>
        </Billboard>
      ))}
    </group>
  );
};

export default IntroEnv;
