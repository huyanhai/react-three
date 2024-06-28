import { Canvas } from '@react-three/fiber';
import React from 'react';
import Render from './Render';
import {
  Environment,
  OrbitControls,
  PerspectiveCamera
} from '@react-three/drei';

const Icosahedron = () => {
  return (
    <Canvas camera={{ position: [0, 0, 30] }}>
      <color args={['#000']} attach="background" />
      <Environment files={'studio_small_09_4k.exr'} />
      <Render />
      {/* 正交相机 */}
      <OrbitControls />

      {/* 透视相机-近大远小 */}
      {/* <PerspectiveCamera /> */}
    </Canvas>
  );
};

export default Icosahedron;
