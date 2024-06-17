import { OrbitControls, useFBX } from '@react-three/drei';
import React from 'react';
import Icosahedron from './Icosahedron';

const Render = () => {
  return (
    <>
      <OrbitControls />
      <Icosahedron />
    </>
  );
};

export default Render;
