import {
  Environment,
  Float,
  Lightformer,
  OrbitControls,
  useFBX,
  useTexture
} from '@react-three/drei';
import React, { useCallback, useMemo } from 'react';
import Box from './Box';
import Cross from './Cross';
import Tetra from './Tetra';
import Torus from './Torus';
import Octahed from './Octahed';
import { useFrame, useThree } from '@react-three/fiber';
import { easing } from 'maath';
import TextCom from './Text';

const Render = () => {
  const { camera } = useThree();
  useFrame(({ pointer, camera }, delta) => {
    easing.damp3(camera.position, [-pointer.x, -pointer.y, 10], 0.2, delta);
    camera.lookAt(0, 0, 0);
  });

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
      <TextCom />
    </>
  );
};

export default Render;
