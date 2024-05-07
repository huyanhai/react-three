import { useControls } from 'leva';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Screen1 = () => {
  const torusKnotRef = useRef();
  const { roughness, metalness, color } = useControls({
    roughness: {
      min: 0,
      max: 1,
      value: 0.5
    },
    metalness: { min: 0, max: 1, value: 0.5 },
    color: 'black'
  });

  useFrame(() => {
    torusKnotRef.current.rotation.y += 0.01;
  });

  return (
    <>
      <mesh ref={torusKnotRef}>
        <meshPhysicalMaterial
          metalness={metalness}
          roughness={roughness}
          color={color}
          ior={1.5}
          emissive={'black'}
        />
        <torusKnotGeometry args={[1, 0.4, 100, 100]} />
      </mesh>

      {/* <mesh rotation-x={-90} position={[0, -1, 0]}>
        <meshStandardMaterial color={'white'} />
        <planeGeometry args={[10, 10]} />
      </mesh> */}

      <pointLight position={[1.0, 0, 10.0]} color={'blue'} intensity={5000.0} />
      <pointLight position={[1.0, 0, -10.0]} color={'red'} intensity={5000.0} />
    </>
  );
};

export default Screen1;
