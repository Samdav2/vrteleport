// src/components/Scene.js
'use client';

import 'aframe';
import React from 'react';

export default function Scene({ mediaUrl, mediaType }) {
  return (
    <a-scene embedded vr-mode-ui="enabled: false">

      {mediaType === 'image'

        ? <a-sky src={mediaUrl} crossOrigin="anonymous"></a-sky>
        : <a-videosphere src={mediaUrl} autoplay="true" loop="true" crossOrigin="anonymous"></a-videosphere>
      }
      <a-entity camera look-controls></a-entity>
    </a-scene>
  );
}
