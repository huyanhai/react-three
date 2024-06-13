import { Canvas } from '@react-three/fiber';
import React from 'react';
import Render from './Render';

const Icosahedron = () => {
  return (
    <Canvas>
      <Render />
    </Canvas>
  );
};

export default Icosahedron;
