import { Canvas } from '@react-three/fiber';
import React from 'react';
import Render from './Render';
import { Environment, OrbitControls } from '@react-three/drei';

const Icosahedron = () => {
  return (
    <Canvas camera={{ position: [0, 0, 30] }}>
      <color args={['#000']} attach="background" />
      <Environment files={'studio_small_09_4k.exr'} />
      <Render />
      <OrbitControls />
    </Canvas>
  );
};

export default Icosahedron;
