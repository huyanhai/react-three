import {
  Environment,
  Float,
  Lightformer,
  OrbitControls,
  useFBX,
  useTexture
} from '@react-three/drei';
import React, { useCallback, useMemo, useRef } from 'react';
import Box from './Box';
import Cross from './Cross';
import Tetra from './Tetra';
import Torus from './Torus';
import Octahed from './Octahed';
import { useFrame, useThree } from '@react-three/fiber';
import { easing } from 'maath';
import TextCom from './Text';
import { DoubleSide, BackSide, Mesh } from 'three';
import Cap from './Cap';
const Render = () => {
  const sphereRef = useRef<Mesh>(new Mesh());
  useFrame(({ pointer, camera, gl, scene }, delta) => {
    easing.damp3(camera.position, [-pointer.x, -pointer.y, 10], 0.2, delta);
    camera.lookAt(0, 0, 0);

    sphereRef.current.rotation.y = +0.1;
    sphereRef.current.rotation.x = +0.1;
    sphereRef.current.rotation.z = +0.1;
  });
  const matcap = useTexture('/matcap/11.png');

  return (
    <>
      {/* <pointLight
        args={[1, 1]}
        intensity={500}
        position={[0, 0, 10]}
        color={'white'}
      /> */}
      <Box />
      {/* <Float speed={5}>
        <Cross />
      </Float>
      <Float speed={5}>
        <Tetra />
      </Float> */}
      <TextCom />
      <mesh position={[0, 0, 0]} ref={sphereRef}>
        <sphereGeometry args={[14, 32, 32]} />
        <meshMatcapMaterial matcap={matcap} side={BackSide} />
      </mesh>
    </>
  );
};

export default Render;
