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
import Cap from './Cap';

const Render = () => {
  const [matcap] = useTexture(['matcap.png']);
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
        <mesh scale={0.5} position={[6, 4, 0]} rotation={[0, 0, Math.PI / 4]}>
          <Cross />
          <meshMatcapMaterial matcap={matcap} />
        </mesh>
      </Float>
      {/* <Float speed={5} position={[-6, 4, 0]} scale={0.2}>
        <Cap />
      </Float> */}

      {/* 灯光 */}
      {/* <Environment resolution={256}>
        <Lightformer
          intensity={2}
          rotation-y={-Math.PI / 2}
          position={[10, 1, 0]}
          scale={[50, 2, 1]}
          color={"red"}
        />
      </Environment> */}
    </>
  );
};

export default Render;
