import { Canvas } from '@react-three/fiber';
import {OrbitControls} from "@react-three/drei"
import React from 'react';
import Render from './Render';

const ScreenView = () => {
  return (
    <div className="w-full h-full">
      <Canvas>
        <Render />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ScreenView;
