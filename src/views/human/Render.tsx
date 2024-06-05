import { Canvas } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import Human from './Human';
import { Environment, OrbitControls, Sky } from '@react-three/drei';
import Light from './Light';

const Render = () => {
  return (
    <Canvas camera={{ position: [0, 30, 100], fov: 4 }} shadows>
      <Environment files={'studio_small_09_4k.exr'} />
      <Human />
      <OrbitControls />
      {/* <Light /> */}
      <color attach="background" args={['#14141c']} />
    </Canvas>
  );
};

export default Render;
