import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { memo, useRef } from 'react';
import { BoxGeometry } from 'three';

const AirPlane = memo((props: { delta: number }) => {
  const { nodes } = useGLTF('/modules/airplane.glb');
  const circleRef = useRef<any>(new BoxGeometry());

  useFrame((_, delta) => {
    circleRef.current.rotation.x += delta * 10 * (1 + props.delta);
  });
  return (
    <group scale={0.2} rotation={[0, -Math.PI / 2, 0]}>
      <primitive object={nodes.PUSHILIN_Plane_Circle000}></primitive>
      <primitive
        object={nodes.PUSHILIN_Plane_Helix}
        ref={circleRef}
      ></primitive>
    </group>
  );
});

export default AirPlane;

useGLTF.preload('/modules/airplane.glb');
