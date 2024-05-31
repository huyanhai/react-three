import { Canvas } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import Human from './Human';
import { Environment, OrbitControls } from '@react-three/drei';

const Render = () => {
  return (
    <Canvas camera={{ position: [0, 0, 100], fov: 16 }} shadows>
      <Environment files={'studio_small_09_4k.exr'} />
      <Human />
      <OrbitControls />
      <color attach="background" args={['#15151a']} />
    </Canvas>
  );
};

export default Render;
