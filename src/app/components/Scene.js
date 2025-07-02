'use client';

import 'aframe';
import React from 'react';


export default function Scene({ mediaUrl, mediaType }) {
  return (

    <a-scene embedded vr-mode-ui="enabled: false">

      {mediaType === 'image'
        ? <a-sky src={mediaUrl}></a-sky>
        : <a-videosphere src={mediaUrl} autoplay="true" loop="true" crossOrigin="anonymous"></a-videosphere>
      }

      <a-entity look-controls>

        <a-entity camera="active: true" viewport="0 0 0.5 1" position="-0.032 0 0"></a-entity>
        <a-entity camera="active: false" viewport="0.5 0 0.5 1" position="0.032 0 0"></a-entity>

      </a-entity>
    </a-scene>
  );
}
