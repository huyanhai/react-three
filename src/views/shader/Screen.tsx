import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';

import { useControls } from 'leva';
import {
  Environment,
  Float,
  Lightformer,
  PivotControls,
  useGLTF
} from '@react-three/drei';

import { DoubleSide } from 'three';

useGLTF.preload(['cybertruck.gltf', 'test.glb']);

const Screen = () => {
  const { nodes, materials } = useGLTF('cybertruck.gltf');

  const torusKnotRef = useRef();
  const [time, setTime] = useState(0);

  const { alpha, color } = useControls({
    alpha: {
      min: 0,
      max: 1,
      value: 1
    },
    color: 'red'
  });

  useFrame((state) => {
    setTime(state.clock.getElapsedTime());
  });

  useFrame(() => {
    torusKnotRef.current.rotation.y += 0.1;
  });

  useEffect(() => {
    console.log('torusKnotRef.current', torusKnotRef.current);
    console.log(
      'torusKnotRef.current.material.color',
      torusKnotRef.current.material.color
    );

    torusKnotRef.current.material.color.multiplyScalar(0.1);
  }, []);
  return (
    <>
      <mesh ref={torusKnotRef} position={[5, 5, 5]}>
        <meshBasicMaterial side={DoubleSide} color={color} />
        <planeGeometry />
      </mesh>
      <Environment>
        <Lightformer form={'ring'} intensity={1000} position={[5, 5, 5]} />
      </Environment>
      <mesh>
        <meshPhysicalMaterial color={color} roughness={0} metalness={1} />
        <sphereGeometry />
      </mesh>
    </>
  );
};

export default Screen;
