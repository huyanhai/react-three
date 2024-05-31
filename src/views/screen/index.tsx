import { Canvas } from '@react-three/fiber';
import React from 'react';
import Render from './Render';

const ScreenView = () => {
  return (
    <div className="w-full h-full">
      <Canvas>
        <Render />
      </Canvas>
    </div>
  );
};

export default ScreenView;
