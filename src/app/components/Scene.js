// src/components/Scene.js
'use client';

import 'aframe';
import React, { useState } from 'react';
import { VscVmActive } from "react-icons/vsc"; // Import a VR icon

// This is a small, reusable component for rendering a single A-Frame instance.
// Its only job is to display the 360 media.
const SingleAFrameView = ({ mediaUrl, mediaType }) => {
  return (
    <a-scene embedded vr-mode-ui="enabled: false" renderer="logarithmicDepthBuffer: true; colorManagement: true;">
      {mediaType === 'image'
        ? <a-sky src={mediaUrl} crossOrigin="anonymous"></a-sky>
        : <a-videosphere src={mediaUrl} autoplay="true" loop="true" crossOrigin="anonymous"></a-videosphere>
      }
      <a-entity camera look-controls="magicWindowTrackingEnabled: false"></a-entity>
    </a-scene>
  );
};

// This is the main, intelligent component that manages the view mode.
export default function Scene({ mediaUrl, mediaType }) {
  // This state controls whether we show one view or two (L&R).
  const [stereoEnabled, setStereoEnabled] = useState(false);

  return (
    <div className="w-full h-full relative bg-black">
      {/* VR Toggle Button - Always visible at the top of the scene */}
      <button
        onClick={() => setStereoEnabled(!stereoEnabled)}
        className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-800/70 text-white font-bold py-2 px-4 rounded-full z-20 backdrop-blur-sm border border-cyan-500/50 hover:bg-cyan-500/50 transition-all flex items-center gap-2"
      >
        <VscVmActive size={24} />
        {stereoEnabled ? 'Exit Stereo' : 'Enter VR Mode'}
      </button>

      {/* Conditional rendering based on the stereoEnabled state */}
      {stereoEnabled ? (
        // STEREO (L&R) VIEW: Two views side-by-side.
        <div className="w-full h-full flex">
          <div className="w-1/2 h-full border-r border-slate-600">
            <SingleAFrameView mediaUrl={mediaUrl} mediaType={mediaType} />
          </div>
          <div className="w-1/2 h-full">
            <SingleAFrameView mediaUrl={mediaUrl} mediaType={mediaType} />
          </div>
        </div>
      ) : (
        // SINGLE VIEW: One view taking up the full container.
        <div className="w-full h-full">
          <SingleAFrameView mediaUrl={mediaUrl} mediaType={mediaType} />
        </div>
      )}
    </div>
  );
}
