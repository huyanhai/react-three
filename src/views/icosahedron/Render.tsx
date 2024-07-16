import {
  Environment,
  Float,
  Lightformer,
  OrbitControls,
  useFBX,
  useTexture
} from '@react-three/drei';
import React from 'react';
import Box from './Box';
import Cross from './Cross';
import Tetra from './Tetra';
import Torus from './Torus';
import Octahed from './Octahed';

const Render = () => {
  return (
    <>
      {/* <pointLight
        args={[1, 1]}
        intensity={500}
        position={[0, 0, 10]}
        color={'white'}
      /> */}
      <Box />
      <Float speed={5}>
        <Cross />
      </Float>
      <Float
        speed={5}
        position={[-10, 0, 0]}
        scale={2.4}
        rotation={[0, 0, Math.PI / 4]}
      >
        <Tetra />
      </Float>
    </>
  );
};

export default Render;
