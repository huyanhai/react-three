import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Mesh } from 'three';

const Dode = (props: {
  args?: [radius?: number | undefined, detail?: number | undefined];
}) => {
  const [gold] = useTexture(['matcap/gold.png']);
  const crossRef = useRef(Mesh);

  useFrame(() => {
    crossRef.current.rotation.y += 0.05;
  });

  return (
    <mesh ref={crossRef}>
      <tetrahedronGeometry args={props.args} />
      <meshMatcapMaterial matcap={gold} />
    </mesh>
  );
};

export default Dode;
