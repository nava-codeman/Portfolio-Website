import React, { useEffect, useRef } from 'react';
import { useStore } from '../store';

const Overlay = () => {
  const { soundEnabled, toggleSound } = useStore();
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/Portfolio Music.mp3');
      audioRef.current.loop = true;
    }
    
    if (soundEnabled) {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    } else {
      audioRef.current.pause();
    }
  }, [soundEnabled]);

  return (
    <>
      <div className="ui-overlay">
        <div className="ui-header">
          <div className="ui-branding">
            <h1 className="ui-title">NAVA</h1>
            <p className="ui-copyright">
              // Copyright © 2026<br />
              Navjyoti Nath.<br />
              All Rights Reserved.
            </p>
          </div>
          
          <div className="ui-manifesto">
            <h3 className="ui-manifesto-title">////// Identity</h3>
            <p className="ui-manifesto-text">
              Building immersive<br/>
              digital experiences<br/>
              at the edge of<br/>
              web technology.
            </p>
          </div>
        </div>

        <div className="ui-footer">
          <div className="ui-controls">
            <p className="ui-scroll-hint">
              Scroll down to<br/>
              discover.
            </p>
            <p className="ui-sound" onClick={toggleSound}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                {soundEnabled ? (
                  <>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                  </>
                ) : (
                  <>
                    <line x1="23" y1="9" x2="17" y2="15"></line>
                    <line x1="17" y1="9" x2="23" y2="15"></line>
                  </>
                )}
              </svg>
              Sound: {soundEnabled ? 'On' : 'Off'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overlay;
