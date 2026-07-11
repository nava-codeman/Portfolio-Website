import React, { Suspense, useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import IntroEnv from './IntroEnv';
import Igloo from './Igloo';
import CameraDirector, { DEBUG_MODE, SCENE_SPACING } from './CameraDirector';
import EducationEnv from './EducationEnv';
import KamaiahEnv from './KamaiahEnv';
import FitHubEnv from './FitHubEnv';
import FundSureEnv from './FundSureEnv';
import ICAREnv from './ICAREnv';
import AchievementsEnv from './AchievementsEnv';
import EstroSyncEnv from './EstroSyncEnv';
import SkillsEnv from './SkillsEnv';
import LeadershipEnv from './LeadershipEnv';
import ContactEnv from './ContactEnv';

const scenesList = [
  { Component: IntroEnv, index: 0 },
  { Component: Igloo, index: 1 },
  { Component: EducationEnv, index: 2 },
  { Component: KamaiahEnv, index: 3 },
  { Component: FitHubEnv, index: 4 },
  { Component: FundSureEnv, index: 5 },
  { Component: ICAREnv, index: 6 },
  { Component: AchievementsEnv, index: 7 },
  { Component: EstroSyncEnv, index: 8 },
  { Component: SkillsEnv, index: 9 },
  { Component: LeadershipEnv, index: 10 },
  { Component: ContactEnv, index: 11 },
];

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', zIndex: 9999, position: 'relative', background: 'black', padding: '2rem' }}>
          <h2>3D Scene Crashed:</h2>
          <pre>{this.state.error.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}



const WebTrails = () => {
  const count = 100;
  const meshRef = useRef();
  
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 40,
        z: Math.random() * -2000,
        speed: Math.random() * 2 + 1,
      });
    }
    return data;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    particles.forEach((p, i) => {
      p.z += p.speed * 50 * safeDelta;
      if (p.z > 50) p.z -= 2050; // wrap around
      
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(0.1, 0.1, 4); // elongated for trail effect
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#ff003c" transparent opacity={0.8} />
    </instancedMesh>
  );
};

import { useThree } from '@react-three/fiber';

const CameraFovUpdater = () => {
  const { camera, size } = useThree();
  useEffect(() => {
    if (size.width < 480) {
      camera.fov = 70;
    } else if (size.width < 768) {
      camera.fov = 60;
    } else if (size.width < 1024) {
      camera.fov = 50;
    } else {
      camera.fov = 45;
    }
    camera.updateProjectionMatrix();
  }, [size, camera]);
  return null;
};

const Scene = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
      <ErrorBoundary>
        <Canvas shadows gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} dpr={[1, 1.5]} camera={{ position: DEBUG_MODE ? [0, 0, 15] : [0, 0, 5], fov: 45 }}>
          <fog attach="fog" args={['#000000', 30, 150]} />
          <Environment preset="city" environmentIntensity={0.4} />
          
          <CameraFovUpdater />
          
          {DEBUG_MODE ? (
            <>
              <OrbitControls target={[0, 0, 0]} />
              <ambientLight intensity={0.2} color="#0a1128" />
              <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" castShadow />
            </>
          ) : (
            <>
              <ambientLight intensity={0.2} color="#0a1128" />
              <pointLight position={[10, 20, -10]} intensity={3} color="#ff003c" distance={100} />
              <pointLight position={[-5, 5, -5]} intensity={2} color="#ffaa00" distance={50} />
              <pointLight position={[5, 5, -25]} intensity={2} color="#ffaa00" distance={50} />
              <pointLight position={[0, 2, -15]} intensity={4} color="#00f0ff" distance={80} />
              <directionalLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
            </>
          )}
          
          <CameraDirector />
          
          <WebTrails />
          
          <Suspense fallback={null}>
            {scenesList.map(({ Component, index }) => (
              <group key={index} position={[0, 0, -index * SCENE_SPACING]}>
                <Component />
              </group>
            ))}
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default Scene;
