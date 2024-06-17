import { Canvas } from '@react-three/fiber';
import React from 'react';
import Render from './Render';
import { Environment } from '@react-three/drei';

const Icosahedron = () => {
  return (
    <Canvas>
      <Environment files={'studio_small_09_4k.exr'} />
      <Render />
    </Canvas>
  );
};

export default Icosahedron;
