import { Addition, Base, Geometry } from '@react-three/csg';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Mesh } from 'three';

const Cross = () => {
  const [matcap] = useTexture(['matcap/matcap.png']);
  const crossRef = useRef(Mesh);

  useFrame(() => {
    crossRef.current.rotation.y += 0.05;
    crossRef.current.rotation.z += 0.01;
  });

  return (
    <mesh
      scale={2}
      position={[10, 0, 0]}
      rotation={[0, 0, Math.PI / 4]}
      ref={crossRef}
    >
      <Geometry>
        <Base>
          <cylinderGeometry args={[0.2, 0.2, 2, 32]} />
        </Base>
        <Addition rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 2, 32]} />
        </Addition>
      </Geometry>
      <meshMatcapMaterial matcap={matcap} />
    </mesh>
  );
};

export default Cross;
