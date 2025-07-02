'use client';

import 'aframe';
import React, { useEffect, useRef, useState } from 'react';
import { VscVmActive } from 'react-icons/vsc';

export default function Scene({ mediaUrl, mediaType }) {
  const videoRef = useRef(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS for stereo fallback
    const ua = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua));
  }, []);

  // Play the video only after user interaction (needed for all mobile)
  const handleUserStart = () => {
    const video = videoRef.current;
    if (video) {
      video
        .play()
        .then(() => console.log('Video playing'))
        .catch((err) => console.warn('Play error:', err));
    }

    const scene = document.querySelector('a-scene');
    if (scene && scene.enterVR) scene.enterVR(); // For Android VR mode
  };

  return (
    <div className="w-full h-full relative bg-black">
      <button
        onClick={handleUserStart}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-cyan-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-cyan-700 transition-all flex items-center gap-2"
      >
        <VscVmActive size={20} />
        {isIOS ? 'Start Stereo View' : 'Enter VR / Play Video'}
      </button>

      <a-scene
        embedded
        vr-mode-ui={`enabled: ${!isIOS}`}
        renderer="logarithmicDepthBuffer: true; colorManagement: true"
      >
        {/* 🔥 Hidden <video> element to feed the videosphere */}
        {mediaType === 'video' && (
          <>
            <video
              id="video360"
              ref={videoRef}
              src={mediaUrl}
              playsInline
              muted
              loop
              preload="auto"
              crossOrigin="anonymous"
              style={{ display: 'none' }}
            />
            <a-videosphere src="#video360" autoplay="true" loop="true"></a-videosphere>
          </>
        )}

        {mediaType === 'image' && (
          <a-sky src={mediaUrl} crossOrigin="anonymous"></a-sky>
        )}

        {/* 🎯 Stereo fallback for iOS */}
        {isIOS ? (
          <>
            <a-entity
              camera
              look-controls
              stereo="eye:left"
              position="-0.03 1.6 0"
            />
            <a-entity
              camera
              look-controls
              stereo="eye:right"
              position="0.03 1.6 0"
            />
          </>
        ) : (
          <a-entity
            camera
            look-controls
            wasd-controls
            position="0 1.6 0"
          />
        )}
      </a-scene>
    </div>
  );
}
