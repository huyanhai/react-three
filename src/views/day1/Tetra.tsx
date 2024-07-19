import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Mesh } from 'three';

const Dode = (props: {
  args?: [radius?: number | undefined, detail?: number | undefined];
}) => {
  const [gold] = useTexture(['matcap/matcap.png']);
  const crossRef = useRef<Mesh>(new Mesh());

  useFrame(() => {
    crossRef.current.rotation.y += 0.05;
  });

  return (
    <mesh
      ref={crossRef}
      position={[-6, 4, 0]}
      scale={1.5}
      rotation={[0, 0, Math.PI / 4]}
    >
      <tetrahedronGeometry args={props.args} />
      <meshMatcapMaterial matcap={gold} />
    </mesh>
  );
};
useTexture.preload(['matcap/matcap.png'])
export default Dode;
