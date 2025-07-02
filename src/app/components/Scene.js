
'use client';


import 'aframe';


export default function Scene({ imageUrl }) {


  return (
    <a-scene embedded>

      <a-sky src={imageUrl}></a-sky>
    </a-scene>
  );
}
