import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useLenis } from 'lenis/react';
import * as THREE from 'three';

// Global state for scroll progress 0 to 1
export const scrollState = { progress: 0 };

const CameraRig = () => {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 2, 20));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useLenis((lenis) => {
    // lenis.progress goes from 0 to 1 based on scroll
    scrollState.progress = lenis.progress;
  });

  useFrame((state, delta) => {
    const p = scrollState.progress;

    // SCENE 1 & 2: Opening Reveal -> Hero (Igloo)
    // 0.0 - 0.15
    if (p < 0.15) {
      const localP = p / 0.15;
      targetPosition.current.set(0, 2 + localP * 1, 25 - localP * 15);
      targetLookAt.current.set(0, 0, 0);
    } 
    // SCENE 3 & 4: Transformation & Skills
    // 0.15 - 0.35
    else if (p < 0.35) {
      const localP = (p - 0.15) / 0.2;
      targetPosition.current.set(Math.sin(localP * Math.PI) * 12, 3 + localP * 2, 10 - localP * 8);
      targetLookAt.current.set(0, localP * 2, 0);
    }
    // SCENE 5 & 6: Projects & Experience
    // 0.35 - 0.70
    else if (p < 0.7) {
      const localP = (p - 0.35) / 0.35;
      targetPosition.current.set(0 + localP * 40, 5, 2 + localP * 5);
      targetLookAt.current.set(0 + localP * 40, 5, -10);
    }
    // SCENE 7 & 8: Achievements & Contact
    // 0.70 - 1.0
    else {
      const localP = (p - 0.7) / 0.3;
      targetPosition.current.set(40, 5 + localP * 15, 7 + localP * 10);
      targetLookAt.current.set(40, 15, -20);
    }

    // Add subtle ambient drift
    const time = state.clock.elapsedTime;
    targetPosition.current.x += Math.sin(time * 0.2) * 0.5;
    targetPosition.current.y += Math.cos(time * 0.3) * 0.2;

    // Smoothly interpolate camera position and lookAt
    camera.position.lerp(targetPosition.current, 4 * delta);
    currentLookAt.current.lerp(targetLookAt.current, 4 * delta);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};

export default CameraRig;
