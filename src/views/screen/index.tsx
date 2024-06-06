import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import React from 'react';
import Render from './Render';

const ScreenView = () => {
  return (
    <div className="w-full h-full">
      <Canvas>
        {/* <Environment files={'studio_small_09_4k.exr'} /> */}
        <Render />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ScreenView;
