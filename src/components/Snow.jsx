import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';

const Snow = ({ count = 3000 }) => {
  const pointsRef = useRef();

  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const phase = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Spread across a volume
      pos[i * 3] = (Math.random() - 0.5) * 40; // x
      pos[i * 3 + 1] = Math.random() * 40 - 10; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40; // z
      phase[i] = Math.random() * Math.PI * 2; // Random starting phase for wind wobble
    }
    return [pos, phase];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < count; i++) {
      // Y velocity (falling)
      pos[i * 3 + 1] -= delta * (1.5 + Math.sin(phases[i]) * 0.5); 
      
      // X and Z drift (wind)
      pos[i * 3] += Math.sin(time * 0.5 + phases[i]) * delta * 0.5;
      pos[i * 3 + 2] += Math.cos(time * 0.3 + phases[i]) * delta * 0.3;

      // Loop back to top if they fall too low
      if (pos[i * 3 + 1] < -10) {
        pos[i * 3 + 1] = 20;
        pos[i * 3] = (Math.random() - 0.5) * 40;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
};

export default Snow;
