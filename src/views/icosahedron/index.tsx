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
    <Canvas>
      {/* <color args={['blue']} attach="background" /> */}
      <Environment
        files={[
          'cube/px.jpg',
          'cube/nx.jpg',
          'cube/py.jpg',
          'cube/ny.jpg',
          'cube/pz.jpg',
          'cube/nz.jpg'
        ]}
        background // 将环境作为背景显示
      />
      <Render />
      {/* 正交相机 */}
      <OrbitControls
        // autoRotateSpeed={0.85}
        // zoomSpeed={0.75}
        // minPolarAngle={Math.PI / 2.5}
        // maxPolarAngle={Math.PI / 2.55}
      />

      {/* 透视相机-近大远小 */}
      {/* <PerspectiveCamera /> */}
    </Canvas>
  );
};

export default Icosahedron;
