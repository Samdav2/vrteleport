
'use client';

import dynamic from 'next/dynamic';


const Scene = dynamic(() => import('./Scene'), { ssr: false });

export default function VrTeleportClient() {
  // We define two different image URLs to display in each scene.
  const leftSceneImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg';
  const rightSceneImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg';


  return (

    <div className="w-full h-screen flex">


      <div className="w-1/2 h-full">
        <Scene imageUrl={leftSceneImageUrl} />
      </div>

      <div className="w-1/2 h-full">
        <Scene imageUrl={rightSceneImageUrl} />
      </div>

    </div>
  );
}
