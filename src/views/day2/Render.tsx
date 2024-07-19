import React, { useRef } from 'react';
import Cross from './Cross';
import {
  AccumulativeShadows,
  MeshTransmissionMaterial,
  RandomizedLight,
  Text,
  useTexture
} from '@react-three/drei';
import font from '/font/MontserratAlternates-Bold.ttf';
import { Mesh } from 'three';
import { tips } from '@/constants';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

const CrossMesh = () => {
  const crossRef = useRef<Mesh>(new Mesh());

  useFrame(({ clock }, delta) => {
    crossRef.current.rotation.x += 0.05;
  });

  return (
    <mesh rotation={[0, 0, Math.PI / 4]} scale={3} ref={crossRef}>
      <Cross />
      <MeshTransmissionMaterial backside backsideThickness={5} thickness={2} />
    </mesh>
  );
};

const Octahedron = () => {
  const matcap = useTexture('/matcap/8.png');
  const octahedronRef = useRef<Mesh>(new Mesh());
  useFrame(({ clock }, delta) => {
    octahedronRef.current.rotation.y += 0.05;
  });
  return (
    <mesh
      ref={octahedronRef}
      position={[-6, 0, 0]}
      castShadow
      receiveShadow
      rotation={[Math.PI / 4, 0, 0]}
    >
      <octahedronGeometry args={[2, 0]} />
      <meshMatcapMaterial matcap={matcap} />
    </mesh>
  );
};

const Sphere = () => {
  const matcap = useTexture('/matcap/8.png');

  const sphereRef = useRef<Mesh>(new Mesh());
  useFrame(({ clock }, delta) => {
    sphereRef.current.rotation.y += 0.05;
  });
  return (
    <mesh position={[6, 0, 0]} rotation={[Math.PI / 5, 0, 0]} ref={sphereRef}>
      <torusGeometry args={[2, 0.4, 32, 64]} />
      <meshMatcapMaterial matcap={matcap} />
    </mesh>
  );
};

const TextCom = (props: {
  position?: [number, number, number];
  fontSize?: number;
}) => {
  return (
    <Text
      font={font}
      position={props.position}
      fontSize={props.fontSize || 6}
      textAlign="center"
      color={'white'}
    >
      {tips}
      <meshStandardMaterial />
    </Text>
  );
};

const Render = () => {
  return (
    <>
      <group position={[0, 2, 0]}>
        <CrossMesh />
        <Octahedron />
        <Sphere />
        {/* 投影 */}
        {/* <AccumulativeShadows
          temporal
          frames={100}
          color="purple"
          colorBlend={0.5}
          opacity={1}
          scale={1}
          alphaTest={0.9}
        >
          <RandomizedLight
            amount={8}
            radius={5}
            ambient={0.1}
            position={[0, 10, -10]}
            bias={0.001}
          />
        </AccumulativeShadows> */}
      </group>
      <TextCom position={[0, 0, -10]} />
      <points rotation={[Math.PI / 6, 0, 0]} position={[0, 0, -20]}>
        <planeGeometry args={[100, 100, 40, 40]} />
        <pointsMaterial color={'gary'} size={0.1} opacity={0.1} alphaTest={0.1}/>
      </points>
    </>
  );
};

export default Render;
