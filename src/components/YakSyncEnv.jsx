import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store';

const YakSyncEnv = () => {
  const groupRef = useRef();
  const setActiveProject = useStore((state) => state.setActiveProject);
  const [hovered, setHovered] = useState(false);

  // Generate a structured data matrix
  const matrixSize = 4;
  const spacing = 2;
  const nodes = useMemo(() => {
    const data = [];
    for (let x = -matrixSize; x <= matrixSize; x += spacing) {
      for (let y = -matrixSize; y <= matrixSize; y += spacing) {
        for (let z = -matrixSize; z <= matrixSize; z += spacing) {
          // Keep it spherical
          if (x*x + y*y + z*z <= matrixSize * matrixSize * 1.5) {
            data.push(new THREE.Vector3(x, y, z));
          }
        }
      }
    }
    return data;
  }, []);

  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.x = time * (hovered ? 0.15 : 0.05);
      groupRef.current.rotation.y = time * (hovered ? 0.15 : 0.05);
    }
    
    if (meshRef.current) {
      const dummy = new THREE.Object3D();
      nodes.forEach((pos, i) => {
        dummy.position.copy(pos);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group 
      onClick={() => setActiveProject('yaksync')}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      <group ref={groupRef}>
        {/* Nodes */}
        <instancedMesh ref={meshRef} args={[null, null, nodes.length]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial 
            color="#00ffaa" 
            emissive="#00cc88" 
            emissiveIntensity={hovered ? 1.5 : 0.5} 
            metalness={0.8}
            roughness={0.2}
          />
        </instancedMesh>
        
        {/* Central highly organized core */}
        <mesh>
          <octahedronGeometry args={[2, 2]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#00ffaa"
            emissiveIntensity={hovered ? 0.8 : 0.2}
            wireframe
          />
        </mesh>
      </group>

      {/* Outer bounding rings */}
      <mesh rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[10, 0.02, 16, 64]} />
        <meshBasicMaterial color="#00ffaa" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[0, Math.PI/2, 0]}>
        <torusGeometry args={[10, 0.02, 16, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

export default YakSyncEnv;
