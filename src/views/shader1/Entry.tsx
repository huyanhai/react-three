import { useFBO } from '@react-three/drei';
import React, { useRef } from 'react';
import Screen from './Screen';
import Plane from './Plane';
import Screen1 from './Screen1';
import Render from './Render';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';

const Entry = () => {
  const renderTarget = useFBO();
  const screenRef = useRef<any>();
  const screenRef1 = useRef<any>();

  const planeRef = useRef<any>(null);

  const { next } = useControls({
    next: {
      value: true
    }
  });

  useFrame(() => {
    screenRef.current.rotation.x += 0.1;

    if (next) {
      screenRef.current.visible = true;
      screenRef1.current.visible = false;
    } else {
      screenRef.current.visible = false;
      screenRef1.current.visible = true;
    }
  });

  return (
    <>
      <Render renderTarget={renderTarget} />

      <Plane ref={planeRef} renderTarget={renderTarget} />
      <Screen ref={screenRef} />
      <Screen1 ref={screenRef1} />
    </>
  );
};

export default Entry;
