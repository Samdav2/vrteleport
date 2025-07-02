// src/components/Scene.js
'use client';

import 'aframe';
import React, { useEffect, useRef } from 'react';

// This is a more robust implementation that directly interacts with A-Frame's core library
// to ensure the VR button and scene are always correctly initialized.
export default function Scene({ mediaUrl, mediaType }) {
  const sceneRef = useRef(null);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    if (!sceneEl) return;

    // Create the media element (sky or videosphere) using vanilla JavaScript
    const mediaEl = document.createElement(mediaType === 'image' ? 'a-sky' : 'a-videosphere');

    // Set the source attribute for the media
    mediaEl.setAttribute('src', mediaUrl);

    // For videos, add autoplay and loop attributes
    if (mediaType === 'video') {
      mediaEl.setAttribute('autoplay', 'true');
      mediaEl.setAttribute('loop', 'true');
    }


    const existingMedia = sceneEl.querySelector('a-sky, a-videosphere');
    if (existingMedia) {
      sceneEl.removeChild(existingMedia);
    }


    sceneEl.appendChild(mediaEl);

    sceneEl.setAttribute('vr-mode-ui', { enabled: true });

  }, [mediaUrl, mediaType]);

  return (

    <a-scene ref={sceneRef} embedded>
     
      <a-camera>
        <a-cursor></a-cursor>
      </a-camera>
    </a-scene>
  );
}
