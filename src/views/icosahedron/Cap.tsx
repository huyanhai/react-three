import { MeshTransmissionMaterial } from '@react-three/drei';
import React from 'react';

const Cap = () => {
  return (
    <mesh receiveShadow castShadow>
      <torusKnotGeometry args={[3, 1, 256, 32]} />
      <MeshTransmissionMaterial backside backsideThickness={5} thickness={2} />
    </mesh>
  );
};

export default Cap;
