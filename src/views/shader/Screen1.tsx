import { useControls } from 'leva';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const Screen1 = () => {
  const torusKnotRef = useRef();
  const { scene } = useGLTF('test1.glb');

  console.log('scene');

  const { roughness, metalness, color } = useControls({
    roughness: {
      min: 0,
      max: 1,
      value: 0.5
    },
    metalness: { min: 0, max: 1, value: 0.0 },
    color: 'black'
  });

  useFrame(() => {
    torusKnotRef.current.rotation.y += 0.01;
  });

  return (
    <>
      <primitive object={scene} ref={torusKnotRef} />
      {/* <mesh ref={torusKnotRef}>
        <meshPhysicalMaterial
          metalness={metalness}
          roughness={roughness}
          color={color}
          ior={1.45}
          emissive={'black'}
        />
        <torusKnotGeometry args={[1, 0.4, 100, 100]} />
      </mesh> */}

      {/* <mesh rotation-x={-90} position={[0, -1, 0]}>
        <meshStandardMaterial color={'white'} />
        <planeGeometry args={[10, 10]} />
      </mesh> */}

      <pointLight position={[-10.0, 5.0, 0.0]} color={'green'} intensity={5000.0} />
      <pointLight position={[0.0, 5.0, -10.0]} color={'blue'} intensity={6000.0} />
      <pointLight position={[10.0, 5.0, 0.0]} color={'red'} intensity={7000.0} />
    </>
  );
};

export default Screen1;
