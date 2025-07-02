// src/components/Scene.js
'use client';

import 'aframe';
import React, { useState, useEffect } from 'react';
import { VscVmActive } from "react-icons/vsc";

export default function Scene({ mediaUrl, mediaType }) {
  const [vrModeActive, setVrModeActive] = useState(false);

  useEffect(() => {
    const scene = document.querySelector('a-scene');
    const onEnterVR = () => setVrModeActive(true);
    const onExitVR = () => setVrModeActive(false);

    scene.addEventListener('enter-vr', onEnterVR);
    scene.addEventListener('exit-vr', onExitVR);

    return () => {
      scene.removeEventListener('enter-vr', onEnterVR);
      scene.removeEventListener('exit-vr', onExitVR);
    };
  }, []);

  return (
    <div className="w-full h-full relative bg-black">
      {/* Custom VR Button (optional, could also rely on default A-Frame button) */}
      {!vrModeActive && (
        <button
          onClick={() => document.querySelector('a-scene').enterVR()}
          className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-800/70 text-white font-bold py-2 px-4 rounded-full z-20 backdrop-blur-sm border border-cyan-500/50 hover:bg-cyan-500/50 transition-all flex items-center gap-2"
        >
          <VscVmActive size={24} />
          Enter VR Mode
        </button>
      )}

      <a-scene
        embedded
        vr-mode-ui="enabled: true"
        renderer="logarithmicDepthBuffer: true; colorManagement: true"
      >
        {/* Media Display */}
        {mediaType === 'image' ? (
          <a-sky src={mediaUrl} crossOrigin="anonymous"></a-sky>
        ) : (
          <a-videosphere
            src={mediaUrl}
            autoplay
            loop
            crossOrigin="anonymous"
          ></a-videosphere>
        )}

        {/* Default camera with look controls and WebXR support */}
        <a-entity camera look-controls wasd-controls position="0 1.6 0"></a-entity>
      </a-scene>
    </div>
  );
}
