'use client';

import 'aframe';
import React, { useEffect, useState } from 'react';
import { VscVmActive } from 'react-icons/vsc';

export default function Scene({ mediaUrl, mediaType }) {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(ua)) {
      setIsIOS(true);
    }
  }, []);

  return (
    <div className="w-full h-full relative bg-black">
      {!isIOS && (
        <button
          onClick={() => {
            const scene = document.querySelector('a-scene');
            if (scene && scene.enterVR) {
              scene.enterVR();
            }
          }}
          className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-800/70 text-white font-bold py-2 px-4 rounded-full z-20 backdrop-blur-sm border border-cyan-500/50 hover:bg-cyan-500/50 transition-all flex items-center gap-2"
        >
          <VscVmActive size={24} />
          Enter VR Mode
        </button>
      )}

      <a-scene
        embedded
        vr-mode-ui={`enabled: ${!isIOS}`} // Only show VR button on Android
        renderer="logarithmicDepthBuffer: true; colorManagement: true"
      >
        {/* Media display */}
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

        {/* Camera setup */}
        {isIOS ? (
          // Fallback stereo cameras for iOS
          <>
            <a-entity
              camera
              look-controls
              stereo="eye:left"
              position="-0.03 1.6 0"
            ></a-entity>
            <a-entity
              camera
              look-controls
              stereo="eye:right"
              position="0.03 1.6 0"
            ></a-entity>
          </>
        ) : (
          // Default camera for WebXR
          <a-entity
            camera
            look-controls
            wasd-controls
            position="0 1.6 0"
          ></a-entity>
        )}
      </a-scene>
    </div>
  );
}
