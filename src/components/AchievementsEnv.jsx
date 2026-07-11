import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../store';

const AchievementsEnv = () => {
  const groupRef = useRef();
  const pendulumPivotRef = useRef();
  const zoomContainerRef = useRef();
  const [hovered, setHovered] = useState(false);
  const worldPos = new THREE.Vector3();
  const setActiveProject = useStore((state) => state.setActiveProject);

  const texture = useTexture('/Spidy%20images/SPIDERMAN8.png');
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => { document.body.style.cursor = 'auto'; };
  }, [hovered]);

  useFrame((state) => {
    if (!groupRef.current || !zoomContainerRef.current || !pendulumPivotRef.current) return;

    groupRef.current.getWorldPosition(worldPos);
    const dist = state.camera.position.z - worldPos.z;
    const time = state.clock.getElapsedTime();

    // 1. DYNAMIC FAR-TO-NEAR HANGING TRACKER ENGINE (Z-Axis Zoom Logic)
    if (dist < 180 && dist > -40) {
      groupRef.current.scale.lerp(new THREE.Vector3(1.6, 1.6, 1.6), 0.05);
      
      // Calculate interpolation step mapping timeline scroll directly into depth transition
      // Maps far background (z = -90) forward smoothly to immediate proximity viewport view (z = 0)
      const targetZ = THREE.MathUtils.mapLinear(dist, 180, 0, -90, 0);
      zoomContainerRef.current.position.z = THREE.MathUtils.lerp(zoomContainerRef.current.position.z, targetZ, 0.08);
    } else {
      groupRef.current.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), 0.05);
    }

    // 2. THE PENDULUM OSCILLATION LAYER
    // Forces clean harmonic motion calculations down onto the rotation system matrix
    pendulumPivotRef.current.rotation.z = Math.sin(time * 2.2) * 0.28;
  });

  return (
    <group ref={groupRef} scale={[0.001, 0.001, 0.001]}>
      {/* Structural Z-Axis Dynamic Zoom Module */}
      <group ref={zoomContainerRef} position={[0, 0, -90]}>
        
        {/* Overhead Ceiling Anchor Frame (Positions card cleanly at the header block) */}
        <group position={[0, 6.5, 0]}>
          <group ref={pendulumPivotRef}>
            
            {/* White Web Cable Truss Component */}
            <mesh position={[0, -2.5, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 5.0, 8]} />
              <meshBasicMaterial color="#ffffff" transparent={true} opacity={0.75} />
            </mesh>

            {/* Display Cluster: Camera-Facing Hanging Holographic Plane Card */}
            <Billboard follow={true} position={[0, -5.5, 0]}>
              <mesh 
                onClick={(e) => { e.stopPropagation(); setActiveProject('achievements'); }}
                onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
                onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
                scale={hovered ? [1.05, 1.05, 1.05] : [1, 1, 1]}
              >
                <planeGeometry args={[5.0, 7.0]} />
                <meshPhysicalMaterial 
                  map={texture}
                  transparent={true}
                  opacity={0.96}
                  roughness={0.12}
                  metalness={0.2}
                  clearcoat={1.0}
                  clearcoatRoughness={0.04}
                  side={THREE.DoubleSide}
                  envMapIntensity={2.5}
                />
              </mesh>

              {/* Sub-Card Label UI Alignment */}
              <group position={[0, -4.5, 0.3]}>
                <Text anchorX="center" anchorY="middle" color={hovered ? "#ff0055" : "#00f0ff"} fontSize={0.4} letterSpacing={0.08}>
                  {"[ CLICK TO REVIEW POWERLIFTING & ART COMPETITION AWARDS ]"}
                </Text>
              </group>
            </Billboard>

          </group>
        </group>

      </group>
    </group>
  );
};

export default AchievementsEnv;
