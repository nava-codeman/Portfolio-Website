import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../store';

const EstroSyncEnv = () => {
  const groupRef = useRef();
  const cardMeshRef = useRef();
  const ringRef = useRef();
  const labelRef = useRef();
  const setActiveProject = useStore((state) => state.setActiveProject);
  const [hovered, setHovered] = useState(false);
  const worldPos = new THREE.Vector3();

  const texture = useTexture('/Spidy%20images/SPIDERMAN9.png');
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => { document.body.style.cursor = 'auto'; };
  }, [hovered]);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    groupRef.current.getWorldPosition(worldPos);
    const dist = state.camera.position.z - worldPos.z;
    if (dist < 160 && dist > -60) {
      groupRef.current.scale.lerp(new THREE.Vector3(1.5, 1.5, 1.5), 0.05);
    } else {
      groupRef.current.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), 0.05);
    }

    const time = state.clock.getElapsedTime();

    // Animation Profile [Rapid Pulse Ring]
    if (ringRef.current) {
      const pulseScale = 1 + Math.sin(time * 8) * 0.15;
      ringRef.current.scale.set(pulseScale, pulseScale, pulseScale);
      ringRef.current.material.opacity = 0.4 + Math.sin(time * 8) * 0.4;
      ringRef.current.rotation.z = time * 0.6;
    }
    
    if (labelRef.current) {
      labelRef.current.position.y = 4.2 + Math.sin(time * 2.2) * 0.03;
    }
  });

  return (
    <group ref={groupRef} scale={[0.001, 0.001, 0.001]}>
      <mesh ref={ringRef} position={[0, -3.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.0, 0.04, 8, 48]} />
        <meshBasicMaterial color="#00f0ff" transparent={true} opacity={0.4} depthWrite={false} />
      </mesh>

      <Billboard follow={true}>
        <mesh 
          ref={cardMeshRef}
          onClick={(e) => { e.stopPropagation(); setActiveProject('estrosync'); }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
          onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
          scale={hovered ? [1.05, 1.05, 1.05] : [1, 1, 1]}
        >
          <planeGeometry args={[4.8, 6.8]} />
          <meshPhysicalMaterial 
            map={texture}
            transparent={true}
            opacity={0.95}
            roughness={0.15}
            metalness={0.2}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            side={THREE.DoubleSide}
            envMapIntensity={2.5}
          />
        </mesh>

        <group ref={labelRef} position={[0, 4.2, 0.3]}>
          <Text anchorX="center" anchorY="middle" color={hovered ? "#ff0055" : "#00f0ff"} fontSize={0.4} letterSpacing={0.08}>
            {"[ CLICK TO SYNCHRONIZE ESTROSYNC CLIENT NODE ]"}
          </Text>
        </group>
      </Billboard>
    </group>
  );
};

export default EstroSyncEnv;
