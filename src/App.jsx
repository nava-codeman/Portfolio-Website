import React, { Suspense, useState, useEffect } from 'react';
import Scene from './components/Scene';
import Overlay from './components/Overlay';
import ProjectOverlay from './components/ProjectOverlay';
import CustomLoader from './components/CustomLoader';
import { ReactLenis } from 'lenis/react';

function App() {
  const [started, setStarted] = useState(false);

  // We can unlock the overlay or scroll when loader finishes
  useEffect(() => {
    // Just a placeholder for when we want to trigger entry animations
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true, infinite: true }}>
      <CustomLoader />
      
      {/* Cinematic Web-Slinger Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -2,
          pointerEvents: 'none',
          background: 'transparent !important'
        }}
      >
        <source src="/web-slinger-hero-live-wallpaper-wallsflow-com.mp4" type="video/mp4" />
      </video>

      <div className="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, background: 'transparent' }}>
        <Scene />
      </div>

      <Overlay />
      <ProjectOverlay />
      
      <div style={{ height: '1200vh', pointerEvents: 'none' }}></div>
    </ReactLenis>
  );
}

export default App;
