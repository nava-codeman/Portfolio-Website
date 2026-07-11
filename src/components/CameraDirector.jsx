import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useLenis } from 'lenis/react';
import * as THREE from 'three';
import { useStore } from '../store';

// Global state for scroll progress 0 to 1
export const DEBUG_MODE = false;
export const scrollState = { progress: 0 };
export const SCENE_SPACING = 150;
const TOTAL_SCENES = 12;
const MAX_Z = 20; 
const MIN_Z = -(TOTAL_SCENES - 1) * SCENE_SPACING - 30; 

const CameraDirector = () => {
  const { camera, scene } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 2, MAX_Z));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const activeProject = useStore((state) => state.activeProject);

  // Define atmospheric moods for each scene [fogColor, fogNear, fogFar, ambientIntensity]
  // Updated to match the reference video's icy pale aesthetic (dark UI requires light backgrounds)
  const moods = [
    [new THREE.Color('#cad1d9'), 5, 80, 1.2],    // 0: Intro
    [new THREE.Color('#d5dae0'), 10, 100, 1.2],  // 1: Education
    [new THREE.Color('#ced5dc'), 5, 90, 1.3],    // 2: Kamaiah
    [new THREE.Color('#e0e4e8'), 5, 60, 1.4],    // 3: ICAR
    [new THREE.Color('#c5ccd4'), 5, 90, 1.2],    // 4: EstroSync
    [new THREE.Color('#c8cfd7'), 10, 100, 1.2],  // 5: YakSync
    [new THREE.Color('#d0d6dd'), 5, 80, 1.3],    // 6: FitHub
    [new THREE.Color('#d6dce2'), 10, 120, 1.4],  // 7: FundSure
    [new THREE.Color('#c9d0d8'), 5, 90, 1.2],    // 8: Leadership
    [new THREE.Color('#cad1d9'), 5, 100, 1.2],   // 9: Skills
    [new THREE.Color('#d1d7de'), 5, 80, 1.3],    // 10: Achievements
    [new THREE.Color('#e0e4e8'), 10, 200, 1.4],  // 11: Contact
    [new THREE.Color('#e0e4e8'), 10, 200, 1.4],  // Fallback
  ];

  useLenis((lenis) => {
    // Ensure we don't grab NaN
    if (lenis && typeof lenis.progress === 'number' && !isNaN(lenis.progress)) {
      // If we detect a loop jump (e.g. from 1 to 0), snap the camera immediately to avoid flying
      if (Math.abs(lenis.progress - scrollState.progress) > 0.5) {
        const zPos = THREE.MathUtils.lerp(MAX_Z, MIN_Z, lenis.progress);
        camera.position.z = zPos;
        targetPosition.current.z = zPos;
      }
      scrollState.progress = lenis.progress;
      useStore.getState().setScrollProgress(lenis.progress);
    }
  });

  useFrame((state, delta) => {
    if (DEBUG_MODE) return;

    let safeDelta = Math.min(delta, 0.1);
    if (isNaN(safeDelta)) safeDelta = 0.016;

    let p = scrollState.progress;
    if (isNaN(p) || p === undefined) p = 0;

    // Calculate Target Camera Position along the Z timeline
    const zPos = THREE.MathUtils.lerp(MAX_Z, MIN_Z, p);
    
    // Calculate which scene we are currently in (0 to 11)
    const exactSceneIndex = p * (TOTAL_SCENES - 1);
    const currentIndex = Math.max(0, Math.min(Math.floor(exactSceneIndex), TOTAL_SCENES - 2));
    let sceneProgress = exactSceneIndex - currentIndex; 
    if (isNaN(sceneProgress)) sceneProgress = 0;

    // Complex Camera Choreography
    if (activeProject) {
      targetPosition.current.set(-5, 2, zPos + (currentIndex === 0 ? -10 : 0));
      targetLookAt.current.set(0, 2, zPos - (currentIndex === 0 ? 0 : 20));
    } else {
      targetPosition.current.z = zPos;

      if (currentIndex === 0) { // Intro -> Ed
        targetPosition.current.x = Math.sin(sceneProgress * Math.PI) * 10;
        targetPosition.current.y = 2 + sceneProgress * 5;
        targetLookAt.current.set(0, 2, zPos - 40);
      }
      else if (currentIndex === 1) { // Ed -> Kamaiah
        targetPosition.current.x = THREE.MathUtils.lerp(0, -15, sceneProgress);
        targetPosition.current.y = THREE.MathUtils.lerp(7, 2, sceneProgress);
        targetLookAt.current.set(10, 2, zPos - 40);
      }
      else if (currentIndex === 3) { // ICAR -> Estro
        targetPosition.current.x = Math.cos(sceneProgress * Math.PI) * -15;
        targetPosition.current.y = 2 + Math.sin(sceneProgress * Math.PI) * 10;
        targetLookAt.current.set(0, 5, zPos - 50);
      }
      else if (currentIndex === 9) { // Skills Orbit
        targetPosition.current.x = Math.sin(sceneProgress * Math.PI * 2) * 20;
        targetPosition.current.y = 5 + Math.sin(sceneProgress * Math.PI) * 10;
        targetLookAt.current.set(0, 0, zPos - 40 - SCENE_SPACING * sceneProgress);
      }
      else { // Default sweeping motion
        targetPosition.current.x = Math.sin(exactSceneIndex) * 5;
        targetPosition.current.y = 3 + Math.cos(exactSceneIndex) * 2;
        targetLookAt.current.set(0, 3, zPos - 40);
      }

      // Interactive mouse parallax (subtle)
      const mouseX = (state.pointer.x * 2) || 0;
      const mouseY = (state.pointer.y * 2) || 0;
      targetPosition.current.x += mouseX;
      targetPosition.current.y += mouseY;
      targetLookAt.current.x += mouseX * 2;

      // Subtle breathing
      const time = state.clock.elapsedTime || 0;
      targetPosition.current.y += Math.sin(time * 0.5) * 0.5;
    }

    // Guard against NaN
    if (isNaN(targetPosition.current.x) || isNaN(targetPosition.current.y) || isNaN(targetPosition.current.z)) {
        targetPosition.current.set(0, 2, MAX_Z);
    }
    if (isNaN(targetLookAt.current.x) || isNaN(targetLookAt.current.y) || isNaN(targetLookAt.current.z)) {
        targetLookAt.current.set(0, 2, zPos - 40);
    }

    // Smooth camera interpolation
    // If activeProject is true, we want a fast snap (or smooth fast lerp) to focus
    const lerpSpeed = activeProject ? 8 : 3;
    camera.position.lerp(targetPosition.current, lerpSpeed * safeDelta);
    currentLookAt.current.lerp(targetLookAt.current, (lerpSpeed + 1) * safeDelta);
    
    if (isNaN(currentLookAt.current.x) || isNaN(currentLookAt.current.y) || isNaN(currentLookAt.current.z)) {
        currentLookAt.current.set(0, 2, 0);
    }
    if (isNaN(camera.position.x) || isNaN(camera.position.y) || isNaN(camera.position.z)) {
        camera.position.set(0, 2, MAX_Z);
    }
    camera.lookAt(currentLookAt.current);

    // Dynamic Atmosphere Interpolation
    const currentMood = moods[currentIndex];
    const nextMood = moods[currentIndex + 1];

    if (scene.fog && currentMood && nextMood) {
      scene.fog.color.lerpColors(currentMood[0], nextMood[0], sceneProgress);
      scene.fog.near = THREE.MathUtils.lerp(currentMood[1], nextMood[1], sceneProgress);
      scene.fog.far = THREE.MathUtils.lerp(currentMood[2], nextMood[2], sceneProgress);
      // Removed scene.background assignment to maintain HTML/CSS transparency layer!
    }

    // Dynamic ambient lighting interpolation
    const ambientLight = scene.children.find(c => c.isAmbientLight);
    if (ambientLight && currentMood && nextMood) {
      ambientLight.intensity = THREE.MathUtils.lerp(currentMood[3], nextMood[3], sceneProgress);
    }
  });

  return null;
};

export default CameraDirector;
