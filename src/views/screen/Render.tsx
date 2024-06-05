import { useFrame } from '@react-three/fiber';
import React, { useState } from 'react';
import { Vector2 } from 'three';

const Render = () => {
  const [size, setSize] = useState(new Vector2());
  const [time, setTime] = useState(0);

  useFrame((state) => {
    setSize(new Vector2(state.size.width, state.size.height));
    setTime(state.clock.getElapsedTime());
  });
  return (
    <>
      <mesh>
        <screenShader uTime={time} />
        <planeGeometry args={[10,10,30]} />
      </mesh>
    </>
  );
};

export default Render;
