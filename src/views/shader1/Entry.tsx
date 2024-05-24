import { useFBO } from '@react-three/drei';
import React, { useRef } from 'react';
import Screen from './Screen';
import Plane from './Plane';
import Screen1 from './Screen1';
import Render from './Render';
import { useFrame } from '@react-three/fiber';

const Entry = () => {
  const renderTarget = useFBO();
  const renderTarget1 = useFBO();
  const screenRef = useRef<any>();
  const screenRef1 = useRef<any>();

  const planeRef = useRef<any>(null);

  useFrame(() => {
    screenRef.current.rotation.x += 0.1;

    screenRef.current.visible = true;
    screenRef1.current.visible = false;
  });

  return (
    <>
      <Render renderTarget={renderTarget} />

      <Plane
        ref={planeRef}
        renderTarget={renderTarget}
        renderTarget1={renderTarget1}
      />
      <Screen ref={screenRef} />
      <Screen1 ref={screenRef1} />
    </>
  );
};

export default Entry;
