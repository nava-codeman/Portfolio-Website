import React, { useRef, useMemo, useState, useLayoutEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const IglooModel = () => {
  // Load the user's custom igloo model
  const { scene } = useGLTF('/igloo_-_download.glb');
  const groupRef = useRef();
  
  const [hoveredPoint, setHoveredPoint] = useState(new THREE.Vector3(999, 999, 999));

  // Create a custom material
  const customMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      opacity: 0.9,
      metalness: 0.1,
      roughness: 0.7,
      emissive: '#ffaa00',
      emissiveIntensity: 0.6,
      transparent: true,
      wireframe: false,
    });

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uMousePos = { value: new THREE.Vector3(999,999,999) };
      shader.uniforms.uTime = { value: 0 };
      
      shader.vertexShader = `
        uniform vec3 uMousePos;
        uniform float uTime;
      ` + shader.vertexShader;

      shader.vertexShader = shader.vertexShader.replace(
        `#include <begin_vertex>`,
        `
        #include <begin_vertex>
        
        // Convert local position to world position to compare with mouse
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        float dist = distance(worldPos.xyz, uMousePos);
        
        // Radius of the magnetic bulge effect
        float radius = 2.0;
        
        if (dist < radius) {
          float influence = 1.0 - (dist / radius);
          influence = smoothstep(0.0, 1.0, influence);
          float pushAmount = influence * 0.4;
          transformed += normal * pushAmount;
        }
        `
      );
      mat.userData.shader = shader;
    };
    return mat;
  }, []);

  // Apply material to all meshes and center the model
  useLayoutEffect(() => {
    if (scene) {
      // Center the geometry
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.x = -center.x;
      scene.position.y = -center.y;
      scene.position.z = -center.z;

      scene.traverse((node) => {
        if (node.isMesh) {
          node.material = customMaterial;
        }
      });
    }
  }, [scene, customMaterial]);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Slowly rotate the igloo group
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;

    // Update shader uniforms smoothly
    if (customMaterial.userData.shader) {
      const currentMouse = customMaterial.userData.shader.uniforms.uMousePos.value;
      // Lerp mouse position for smooth transitions when hovering on/off
      currentMouse.lerp(hoveredPoint, 0.1);
      customMaterial.userData.shader.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  if (!scene) return null;

  return (
    <group 
      ref={groupRef}
      position={[0, -2, 0]}
      rotation={[Math.PI / 6, 0, 0]}
      scale={2.5}
      onPointerMove={(e) => {
        setHoveredPoint(e.point);
      }}
      onPointerOut={() => {
        setHoveredPoint(new THREE.Vector3(999, 999, 999));
      }}
    >
      <primitive object={scene} />
    </group>
  );
};

export default IglooModel;

useGLTF.preload('/igloo_-_download.glb');
