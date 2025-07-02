// src/components/Scene.js
'use client';

import 'aframe';
import { Entity, Scene as AFrameScene } from 'aframe-react';
import React from 'react';



const Scene = ({ imageUrl, mediaType }) => {

  return (
    <AFrameScene embedded>
      {mediaType === 'image' ? (
        // Use <a-sky> for 360-degree images
        <Entity primitive="a-sky" src={imageUrl} />
      ) : (

        <Entity primitive="a-videosphere" src={imageUrl} play-on-click />
      )}


      <Entity primitive="a-camera">
        <Entity primitive="a-cursor" />
      </Entity>
    </AFrameScene>
  );
};


const PlayOnClick = {
  schema: {},
  init: function () {
    this.el.sceneEl.addEventListener('click', () => {
      if (this.el.components.material && this.el.components.material.material.map) {
        const videoEl = this.el.components.material.material.map.image;
        if (videoEl.paused) {
          videoEl.play();
        } else {
          videoEl.pause();
        }
      }
    });
  }
};


if (typeof window !== 'undefined' && window.AFRAME) {
  if (!window.AFRAME.components['play-on-click']) {
    window.AFRAME.registerComponent('play-on-click', PlayOnClick);
  }
}


export default Scene;
